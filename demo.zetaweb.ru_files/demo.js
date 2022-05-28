var demo = (function () {

    var apiClient = (function () {

        var client = undefined;

        var loadLibrary = function () {
            jsLoader.load("https://unpkg.com/swagger-client@3.10.0/browser/index.js", initClient);
        };

        var initClient = function () {
            client = new SwaggerClient({
                url: '/core/docs/v2/api.json',
                requestInterceptor: req => {
                    req.headers["Content-Type"] = "application/json";
                    req.headers["X-WebUser-Anonymous-ID"] = "598BC40B-C0FB-451B-A979-FC6B783D58B0";
                },
                responseInterceptor: res => {
                    console.log(res.headers["x-response-time-ms"]);
                }
            });
        };

        loadLibrary();

        return {
            instance: function () { return client; }
        };
    })();

    var apiError = function (error) {
        console.error("failed to load the spec" + error);
    };

    var methodError = function (error) {
        if (error.status != 404)
            console.error("failed on API call " + error);
        else
            alert('Nothing found');
    };

    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[key(x)] = rv[key(x)] || []).push(x);
            return rv;
        }, {});
    };

    var replace = function (str, oldValue, newValue) {
        return str.split(oldValue).join(newValue);
    };

    var getValue = function (item, properties, defaultValue) {
        defaultValue = defaultValue || "";
        var value = item || null;
        if (value === null)
            return defaultValue;
        properties = properties || [];
        for (let i = 0; i < properties.length; i++) {
            value = value[properties[i]] || null;
            if (value === null)
                return defaultValue;
        }
        return value;
    };

    var loadVendor = function (vendorName, callback) {
        apiClient.instance()
            .then(swaggerClient => {
                var vendorResponseTask = swaggerClient.apis.Product.GetVendors({}, { requestBody: [vendorName] });
                vendorResponseTask.then(vendorsResponse => {
                    if (callback) {
                        callback(vendorsResponse.obj[0]);
                    }
                }, methodError);
            }, apiError);
    }

    var offers = (function () {
        var OFFERS = undefined;
        var OFFERS_PERPAGE = 12;
        var OFFERS_CONTAINER_SELECTOR = "[data-container=api-search-by-text]";
        var OFFERS_SEARCH_BUTTON_SELECTOR = "[data-api-text-search-button]";
        var OFFERS_SEARCH_PREDICATE_SELECTOR = "[data-api-text-search-predicate]";
        var OFFERS_PRODUCT_ROW_TEMPLATE_SELECTOR = "#product-row-template";
        var OFFERS_PRODUCT_ROW_OFFER_TEMPLATE_SELECTOR = "#product-row-offer-template";

        var claerOffers = function () {
            $(OFFERS_CONTAINER_SELECTOR).empty();
            $("[data-paging-container]").empty();
        };

        var loadProductsByText = function (predicate) {
            OFFERS = [];
            claerOffers();
            $(".search-result__string").html("Вы искали:&nbsp;" + predicate + "&nbsp;")
            apiClient.instance()
                .then(swaggerClient => {
                    var t0 = performance.now();
                    swaggerClient.apis.Search.GetProductsByText({ text: predicate })
                        .then(pairsResponse => {
                            OFFERS = pairsResponse.obj;
                            var t1 = performance.now();
                            $(".search-result__count").html("Найдено результатов:&nbsp;" + OFFERS.length + "&nbsp;за&nbsp;" + Math.round((t1 - t0) / 10) / 100 + "&nbsp;с.");
                            loadOffersOnPage(1);
                        }, methodError)
                });
        };

        var loadOffersOnPage = function (page) {
            apiClient.instance()
                .then(swaggerClient => {
                    var skip = (page - 1) * OFFERS_PERPAGE;
                    renderPaging(page);
                    var pagedPairs = OFFERS.slice(skip, skip + OFFERS_PERPAGE);
                    var convertedPairs = pagedPairs.map(e => {
                        return {
                            vendorCode: e.vendorCode,
                            vendorName: e.vendorName
                        };
                    });
                    swaggerClient.apis.Search.GetProductsOffersByProductKeys({}, { requestBody: convertedPairs })
                        .then(offersResponse => {
                            renderOffers(offersResponse.obj);
                        }, methodError);
                });
        };

        var renderOffers = function (offers) {
            var groupedOffers = groupBy(offers,
                offer => JSON.stringify({ vendorPurifiedCode: offer.product.vendorPurifiedCode, vendorName: offer.product.vendorName }));

            var productRowTemplate = $(OFFERS_PRODUCT_ROW_TEMPLATE_SELECTOR).html(),
                productOfferRowTemplate = $(OFFERS_PRODUCT_ROW_OFFER_TEMPLATE_SELECTOR).html(),
                container = $(OFFERS_CONTAINER_SELECTOR);

            for (var key in groupedOffers) {
                var productRowHtml = productRowTemplate;
                var productOffers = groupedOffers[key];
                var firstOffer = productOffers[0];
                productRowHtml = replace(productRowHtml, "{data.product.name}", firstOffer.product.name);
                productRowHtml = replace(productRowHtml, "{data.product.vendorCode}", firstOffer.product.vendorCode);
                productRowHtml = replace(productRowHtml, "{data.product.vendorName}", firstOffer.product.vendorName);
                productRowHtml = replace(productRowHtml, "{product.image.link}",
                    getValue(firstOffer, ["product", "defaultImage", "url"], "/i/2faf97e8-7fda-11e6-94f0-00155d15e314.jpg?imgh=95"));
                var productRow = $(productRowHtml);
                productOffers.forEach(offer => {
                    var offersContainer = productRow.find(".offers");
                    var offerHtml = productOfferRowTemplate;
                    offerHtml = replace(offerHtml, "{data.product.restProductUnit.name}", getValue(offer, ["product", "restProductUnit", "name"]));
                    offerHtml = replace(offerHtml, "{data.repositoryDescription.description}", getValue(offer, ["repositoryDescription", "description"]));
                    offerHtml = replace(offerHtml, "{data.repositoryDescription.abbreviation}", getValue(offer, ["repositoryDescription", "abbreviation"]));
                    offerHtml = replace(offerHtml, "{data.repositoryDescription.webColor}", getValue(offer, ["repositoryDescription", "webColor"]));
                    offerHtml = replace(offerHtml, "{data.stockAvailability.quantity}", getValue(offer, ["stockAvailability", "quantity"]));
                    offerHtml = replace(offerHtml, "{data.price}", getValue(offer, ["price"]));
                    offerHtml = replace(offerHtml, "{data.repositoryDeliveryTime.sourceStockDeliveryTime.deliveryTime}",
                        getValue(offer, ["repositoryDeliveryTime", "sourceStockDeliveryTime", "deliveryTime"], "Не дост."));

                    offersContainer.append($(offerHtml));
                });
                container.append(productRow);
            }
        };

        var renderPaging = function (page) {
            var pagingContainer = $("[data-paging-container]");
            var pagingTemplate = $("#paging-template").html();
            var pagesCount = Math.ceil(OFFERS.length / OFFERS_PERPAGE);
            var max = (page + 5) > pagesCount ? pagesCount : (page + 5);
            var min = (page - 5) <= 0 ? 1 : (page - 5);
            for (var i = min; i <= max; i++) {
                var pagingHtml = replace(pagingTemplate, "{paging.pageNumber}", i);
                var p = $(pagingHtml);
                if (i == page) {
                    p.addClass("active");
                }
                pagingContainer.append(p);
            }
        };

        $(document).on("click", OFFERS_SEARCH_BUTTON_SELECTOR, function () {
            if (!'content' in document.createElement('template')) {
                alert("Your browser does not support '<template>' tag");
                return false;
            }
            var searchString = $(OFFERS_SEARCH_PREDICATE_SELECTOR).val();
            loadProductsByText(searchString);
            return false;
        });

        $(document).on("click", "[data-paging]", function () {
            claerOffers();
            var page = $(this).data("paging");
            loadOffersOnPage(page);
            return false;
        });
    })();

    $(document).on("click", "[data-vendor]", function () {
        var vendorName = $(this).data("vendor");
        var vendorInfoContainer = $('#vendorDescription');
        var vendorNameContainer = vendorInfoContainer.find("[data-vendor-name]");
        var vendorDescriptionContainer = vendorInfoContainer.find("[data-vendor-description]");
        var vendorDescriptionContainerContainer = vendorInfoContainer.find("[data-vendor-description-continer]");
        var vendorNoDescriptionContainer = vendorInfoContainer.find("[data-vendor-no-description-continer]");
        var vendorImage = vendorInfoContainer.find("[data-vendor-image]");
        var vendorImageContainer = vendorInfoContainer.find("[data-vendor-image-continer]");
        vendorNameContainer.html(vendorName);
        vendorNoDescriptionContainer.show();
        vendorDescriptionContainer.html("");
        vendorDescriptionContainerContainer.hide();
        vendorImage.attr("src", "");
        vendorImageContainer.hide();
        loadVendor(vendorName, function (vendor) {
            if (vendorInfoContainer.length) {
                vendorNameContainer.html(vendor.name);
                if (vendor.description) {
                    vendorDescriptionContainer.html(vendor.description);
                    vendorDescriptionContainerContainer.show();
                    vendorNoDescriptionContainer.hide();
                }
                if (vendor.image) {
                    vendorImage.attr("src", vendor.image.url);
                    vendorImageContainer.show();
                }
            }
        });
        vendorInfoContainer.modal('show');
        return false;
    })
    return {
        loadVendor
    };
})();