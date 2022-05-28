$(document).ready(function() {

    //скрывать окно выбора региона после клика по ссылке
    $(document).on('click', "#changeRegion .change-region__link", function() {
        $('#changeRegion').modal('hide');
    });

    /*---------------------------------------------------------------------------------*/
    //Поиск по региону
    //$(".change-region__input").keyup(function(){
    $(document).on("keyup", ".change-region__input", function() {
        let searchString = $(this).val().toUpperCase();

        if (searchString.length > 0) {
            //очистить контейнер с результатами, если не пустой
            clearSearchResultsContainer();
            //поиск региона
            searchRegion(searchString);
        } else {
            clearSearchResultsContainer();
        }
    });
    //очистить контейнер с результатами, если не пустой
    function clearSearchResultsContainer() {
        if ($(".change-region__search-results").html().length > 0) {
            $(".change-region__search-results").html("");
        }
    }
    //поиск региона
    function searchRegion(searchString) {
        $(".change-region__link").each(function() {
            let regionLink = $(this).html().toUpperCase();
            if (regionLink.indexOf(searchString) != -1) {
                $(this).clone().addClass("change-region__link_result").appendTo(".change-region__search-results");
            }
        });
    }

    /*---------------------------------------------------------------------------------*/
    //затемнение фона при наведении на пункт меню
    //10.10.2017
    webSettings.set_handler(function() {
        $(".backdrop-required").on("mouseenter", function() {
            $(".backdrop").clearQueue();
            $(".backdrop").fadeIn("fast");
        });
        $(".backdrop-required").on("mouseleave", function() {
            $(".backdrop").clearQueue();
            $(".backdrop").fadeOut("fast");
        });
    });

    //если при обовлении содержимого контрола корзины в шапке возникла ошибка
    webSettings.set_handler(function(controls) {
        let controlId = controls.attr("cp_instanceid");
        if (controlId == "header-cart") {
            if ($("div").is("#header-cart div[delaybeforehide]")) {
                $("#header-cart").addClass("header__menu-item_hover");
                $(".backdrop").fadeIn("fast");
            }
        }
    });

    //при уходе из мини корзины при ошибке заказа
    $(document).on("mouseleave", "#header-cart ", function() {
        $(this).removeClass("header__menu-item_hover");
        $(".backdrop").fadeOut("fast");
    });

    //При клике на любом месте кроме мини корзины закрывать мини корзину
    $(document).click(function(event) {
        if ($(event.target).closest("#header-cart").length)
            return;
        $("#header-cart").removeClass("header__menu-item_hover");
        event.stopPropagation();
    });

    /*---------------------------------------------------------------------------------*/
    //14.09.2017
    //количество элементов на странице
    //при клике показать ссылки выбора количества элементов на странице
    $(document).on("click", ".element-count__current", function() {
        $('.element-count__container').toggle();
    });

    //при клике по любому месту на странице скрыть список количества элементов на странице
    $(document).click(function(event) {
        if ($(event.target).closest(".element-count__current").length)
            return;
        $(".element-count__container").hide();
        event.stopPropagation();
    });

    webSettings.set_handler(function() {
        //найти span, т.е. выбранное кол-во и значение записать в div
        $(".element-count__current").html($(".element-count__container").find('span').html());
    });

    /*---------------------------------------------------------------------------------*/
    //14.09.2017
    //сортировать по...
    //при клике показать способы сортировки
    $(document).on("click", ".sort__current", function() {
        $('.sort__container').toggle();
    });

    //при клике по любому месту на странице скрыть список вариантов сортировки на странице
    $(document).click(function(event) {
        if ($(event.target).closest(".sort__current").length)
            return;
        $(".sort__container").hide();
        event.stopPropagation();
    });

    function checkSortBy() {
        let pageUrl = window.location.toString();

        //параметры сортировки
        let sortProductName = 'productname';
        let sortProductNameDesc = 'productname_desc';
        let sortProductPrice = 'storeproductprice';
        let sortProductPriceDesc = 'storeproductprice_desc';
        let sortProductQuantity = 'productquantity';
        let sortProductQuantityDesc = 'productquantity_desc';
        let sortProductDeliveryTime = 'storeproductdeliverytime';
        let sortProductDeliveryTimeDesc = 'storeproductdeliverytime_desc';
        let sortSearchHistoryDate = 'searchhistory_sort=searchdate';
        let sortSearchHistoryDateDesc = 'searchhistory_sort=searchdate_desc';
        let sortSearchHistorySearchString = 'searchhistory_sort=searchstring';
        let sortSearchHistorySearchStringDesc = 'searchhistory_sort=searchstring_desc';

        if (pageUrl.indexOf(sortProductName) != -1 || pageUrl.indexOf(sortProductNameDesc) != -1) {
            $(".sort__current").html('Наименованию');
        } else if (pageUrl.indexOf(sortProductPrice) != -1 || pageUrl.indexOf(sortProductPriceDesc) != -1) {
            $(".sort__current").html('Цене');
        } else if (pageUrl.indexOf(sortProductQuantity) != -1 || pageUrl.indexOf(sortProductQuantityDesc) != -1) {
            $(".sort__current").html('Количеству');
        } else if (pageUrl.indexOf(sortProductDeliveryTime) != -1 || pageUrl.indexOf(sortProductDeliveryTimeDesc) != -1) {
            $(".sort__current").html('Сроку доставки');
        } else if (pageUrl.indexOf(sortSearchHistoryDate) != -1 || pageUrl.indexOf(sortSearchHistoryDateDesc) != -1) {
            $(".sort__current").html('Дате поиска');
        } else if (pageUrl.indexOf(sortSearchHistorySearchString) != -1 || pageUrl.indexOf(sortSearchHistorySearchStringDesc) != -1) {
            $(".sort__current").html('Строке поиска');
        } else {
            //если рисайз окна, проверить ширину экрана
            $(window).resize(function() {
                if ($(window).width() < 768) {
                    $(".sort__current").html('Сортировать по');
                } else {
                    $(".sort__current").html('Выберите...');
                }
            });
            //проверить ширину экрана, для xs писать Сортировать, для sm Выберите
            if ($(window).width() < 768) {
                $(".sort__current").html('Сортировать по');
            } else {
                $(".sort__current").html('Выберите...');
            }

        };
    };

    webSettings.set_handler(function() {
        checkSortBy();
    });

    /*---------------------------------------------------------------------------------*/

    //результаты поиска, боковая панель, варианты поиска
    $('#aside-hidden-search-variants-toggle').click(function() {
        $('#aside-hidden-search-variants .aside-hidden-info').fadeToggle('fast');
    });
    //при клике по любому месту на странице скрыть список вариантов сортировки на странице
    $(document).click(function(event) {
        if ($(event.target).closest("#aside-hidden-search-variants-toggle").length)
            return;
        $("#aside-hidden-search-variants .aside-hidden-info").hide();
        event.stopPropagation();
    });

    /*---------------------------------------------------------------------------------*/

    //05.10.2017
    //фиксированная шапка
    $(window).scroll(function() {
        if (($(window).width() >= 992) && ($(window).scrollTop() > 0)) {
            $('.header__container.affix .header__search').clearQueue();
            $('.header__container.affix .header__phone-region-container').clearQueue();
            $('.header__container.affix .header__phone-region-container').hide();
            $('.header__container.affix .header__search').fadeIn('fast').show();
        } else {
            $('.header__container.affix .header__search').clearQueue();
            $('.header__container.affix .header__phone-region-container').clearQueue();
            $('.header__container.affix .header__phone-region-container').fadeIn('fast').show();
            $('.header__container.affix .header__search').hide();
        }
    });

    //В случае фиксированной шапки, при вызове и закрытии модального окна bootstrap
    //изменять position шапки для отображения окна над затемнением	
    $(document).on('show.bs.modal', function(e) {
        $('.header__container.affix').css('position', 'relative');
        $('.header__container.affix').css('z-index', 'auto');
        $('#content-wrapper').css('padding-top', '30px');
    });

    $(document).on('hide.bs.modal', function(e) {
        $('.header__container.affix').css('position', 'fixed');
        $('.header__container.affix').css('z-index', '1500');
        $('#content-wrapper').css('padding-top', '30px');
    });

    /*---------------------------------------------------------------------------------*/

    //кнопка наверх
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('#button-to-top').fadeIn();
        } else {
            $('#button-to-top').fadeOut();
        }
    });

    $('#button-to-top').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);

    });

    /*---------------------------------------------------------------------------------*/

    //каталог, результаты поиска, отображение таблицей, обрезать описание товара + "..."
    //01.09.2017
    webSettings.set_handler(function() {
        let catalogDescriptionArray = document.querySelectorAll(".catalog-products-table__product-short-desc");
        for (let i = 0; i < catalogDescriptionArray.length; i++) {
            let fullDesc = catalogDescriptionArray[i].textContent;

            if (fullDesc && (fullDesc.length > 65)) {
                fullDesc = fullDesc.slice(0, 65) + "..."
                catalogDescriptionArray[i].innerHTML = fullDesc;
            }
        }
    });

    /*---------------------------------------------------------------------------------*/

    //детальный просмотр товара, скрывать блок применимость, если нет данных
    if ($("div").is(".details-use")) {
        if ($(".details-use-select select")[0].length == 1) {
            $(".details-use").hide();
        }
    }

    //детальный просмотр товара, карусель маленьких изображений 
    $('#details-small-images').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#details-small-images-prev',
        nextArrow: '#details-small-images-next',
        centerMode: true,
        mobileFirst: true,
        responsive: [{
            breakpoint: 390,
            settings: {
                vertical: true
            }
        }]
    });

    //Страница детального просмотра товара, форма обратной связи с менеджером. Формирование сообщения.
    $("a[data-target='#send-message']").click(function() {
        let detailBrand = $("#details-brand").html();
        let detailArticul = $("#details-articul").html();
        let detailGoodsName = $("#zw_productdetails h1").html();
        let autoMessage = "Здравствуйте! Возник вопрос по товару:";


        if (detailBrand != undefined) {
            autoMessage += "\n" + detailBrand;
        }
        if (detailArticul != undefined) {
            autoMessage += "\n" + detailArticul;
        }
        if (detailGoodsName != undefined) {
            autoMessage += "\nНаименование товара: " + detailGoodsName;
        }

        $("textarea[name='message']").val(autoMessage);

        $("input[name='add_usermessage']").click(function() {
            let messageVin = $("#vin_for_message").val();
            let resultMessage = $("textarea[name='message']").val();
            if (messageVin != undefined) {
                resultMessage += "\nНомер VIN:" + messageVin;
            }

            $("textarea[name='message']").val(resultMessage);
        });
    });

    /*---------------------------------------------------------------------------------*/
    //Табы поиск по артикулу, наименованию, по VIN
    //19.09.2017 
    // 05.02.2018
    //проверить тип поиска
    function checkSearchType() {
        let pageUrl = window.location.toString();
        //типы поиска
        let searchByArticles = "search_searchtype=1",
            searchByBeginArticles = "search_searchtype=2",
            searchByName = "search_searchtype=3",
            searchByVIN = "laximosearch_vin";

        let isSearch = "search_searchtype"; //подстрока поиска
        let isSearchByVin = "laximosearch_vin"; //поиск по vin
        //если поиск производился
        if (pageUrl.indexOf(isSearch) !== -1 || pageUrl.indexOf(isSearchByVin) !== -1) {

            if (pageUrl.indexOf(searchByArticles) !== -1) {
                //поиск по артикулу
                return 1;
            } else if (pageUrl.indexOf(searchByBeginArticles) !== -1) {
                //поиск с начала номера

                return 2;
            } else if (pageUrl.indexOf(searchByName) !== -1) {
                //поиск по тексту

                return 3;
            } else if (pageUrl.indexOf(searchByVIN) !== -1) {
                //поиск по vin

                return 4;
            }
        } else {
            return 0;
        }
    }

    //установить доступность полей ввода в контенте таба 
    function setSearchFieldsAvailable(searchType) {
        if (searchType === 1) {
            $("div[data-zw-tab-page='search-by-articles'] input[name='search_searchtype']").prop("disabled", false);
            $("div[data-zw-tab-page='search-by-name'] input[name='search_searchtype']").prop("disabled", true);
            $("div[data-zw-tab-page='search-by-begin-articles'] input[name='search_searchtype']").prop("disabled", true);

            $(".header__search #inputsearch_searchstring").attr("placeholder", "Введите артикул");
            $(".header__search input[name='search_searchtype']").attr("value", "1");
        } else if (searchType === 2) {
            $("div[data-zw-tab-page='search-by-begin-articles'] input[name='search_searchtype']").prop("disabled", false);
            $("div[data-zw-tab-page='search-by-name'] input[name='search_searchtype']").prop("disabled", true);
            $("div[data-zw-tab-page='search-by-articles'] input[name='search_searchtype']").prop("disabled", true);

            $(".header__search #inputsearch_searchstring").attr("placeholder", "Введите артикул");
            $(".header__search input[name='search_searchtype']").attr("value", "2");
        } else if (searchType === 3) {
            $("div[data-zw-tab-page='search-by-name'] input[name='search_searchtype']").prop("disabled", false);
            $("div[data-zw-tab-page='search-by-articles'] input[name='search_searchtype']").prop("disabled", true);
            $("div[data-zw-tab-page='search-by-begin-articles'] input[name='search_searchtype']").prop("disabled", true);

            $(".header__search #inputsearch_searchstring").attr("placeholder", "Введите наименование");
            $(".header__search input[name='search_searchtype']").attr("value", "3");
        } else if (searchType === 4) {
            $("div[data-zw-tab-page='search-by-articles'] input[name='search_searchtype']").prop("disabled", true);
            $("div[data-zw-tab-page='search-by-begin-articles'] input[name='search_searchtype']").prop("disabled", true);
            $("div[data-zw-tab-page='search-by-name'] input[name='search_searchtype']").prop("disabled", true);
        }
    }

    //установить активным таб соответсвенно типу поиска
    function setActiveTab() {
        var parameters = {},
            currentSearchType = checkSearchType();
        if (currentSearchType === 1) {
            parameters["tab-search-line"] = "search-by-articles";
            ZetaHistory.setParameters(parameters, false);
            setSearchFieldsAvailable(1);
        } else if (currentSearchType === 2) {
            parameters["tab-search-line"] = "search-by-begin-articles";
            ZetaHistory.setParameters(parameters, false);
            setSearchFieldsAvailable(2);
        } else if (currentSearchType === 3) {
            parameters["tab-search-line"] = "search-by-name";
            ZetaHistory.setParameters(parameters, false);
            setSearchFieldsAvailable(3);
        } else if (currentSearchType === 4) {
            parameters["tab-search-line"] = "search-by-vin";
            ZetaHistory.setParameters(parameters, false);
            setSearchFieldsAvailable(4);
        }
    }

    setActiveTab();

    webSettings.set_handler(function(controls) {
        let controlId = controls.attr("id");

        if (controlId === 'zw_searchoptions') {
            setActiveTab();
        }
    });

    $("a[data-zw-tab-header='search-by-articles'], div[data-zw-tab-page='search-by-begin-articles'] #inputsearch_searchstring").click(function() {
        setSearchFieldsAvailable(1);
    });
    $("a[data-zw-tab-header='search-by-begin-articles'], div[data-zw-tab-page='search-by-begin-articles'] #inputsearch_searchstring").click(function() {
        setSearchFieldsAvailable(2);
    });
    $("a[data-zw-tab-header='search-by-name'], div[data-zw-tab-page='search-by-name'] #inputsearch_searchstring").click(function() {
        setSearchFieldsAvailable(3);
    });
    $("a[data-zw-tab-header='search-by-vin'], div[data-zw-tab-page='search-by-vin'] input[name='vin']").click(function() {
        setSearchFieldsAvailable(4);
    });


    //скрытый поиск по наименованию
    $(document).on('click', '.header__search, .header__search #productsearch_submitbutton', function() {
        $(".header__search input[name='search_searchtype']").prop("disabled", false);
    });

    // 05.02.2018
    // история поиска
    var fillSearchHistory = function(container) {
        var searchHistoryResults = document.getElementsByClassName('search-history__item');

        for (let i = 0; i < searchHistoryResults.length; i++) {
            let searchHistoryItem = document.createElement('div');

            if (i + 1 < searchHistoryResults.length) {
                searchHistoryItem.classList.add('clearfix');
                searchHistoryItem.classList.add('search-history__item-insert');
                searchHistoryItem.innerHTML = searchHistoryResults[i].innerHTML;
                container.appendChild(searchHistoryItem);
            } else {
                searchHistoryItem.classList.add('clearfix');
                searchHistoryItem.classList.add('search-history__item-insert');
                searchHistoryItem.classList.add('search-history__item_history');
                searchHistoryItem.innerHTML = searchHistoryResults[i].innerHTML;
                container.appendChild(searchHistoryItem);
            }
        }
    }

    var searchHistoryContainer = document.getElementsByClassName('search-history');
    for (let i = 0; i < searchHistoryContainer.length; i++) {
        fillSearchHistory(searchHistoryContainer[i]);
    }

    //21.03.2018 заполнение истории при обновлении контролов
    webSettings.set_handler(function(controls) {
        let controlId = controls.attr("id");

        if (controlId === 'zw_productsearchbycodeortext' || controlId === 'zw_productoffers' || controlId === 'zw_catalog') {
            var searchHistoryContainer = document.getElementsByClassName('search-history');

            for (let i = 0; i < searchHistoryContainer.length; i++) {
                if (searchHistoryContainer[i].childElementCount === 0) {
                    fillSearchHistory(searchHistoryContainer[i]);
                }
            }
        }
    });

    document.addEventListener('click', function(event) {
        let target = event.target;

        if (target.id === 'inputsearch_searchstring') {
            let targetParent = target.parentNode,
                searchHistory = targetParent.getElementsByClassName('search-history');

            if (searchHistory.length !== 0) {
                searchHistory[0].classList.add('search-history_active');
            }
        } else {
            let searchHistory = document.getElementsByClassName('search-history_active');

            if (searchHistory.length !== 0) {
                searchHistory[0].classList.remove('search-history_active');
            }
        }
    });

    /*---------------------------------------------------------------------------------*/

    /* 25.10.2018 */
    /* В новом поиске для поиска используются 2 отдельные страницы для Уточнения и Предложений */
    let checkCatalogPageContent = (function() {
        let catalogTabControlLink = $("a[aria-controls='aside-catalog-tab']"),
            catalogTabControlParent = catalogTabControlLink.parent("li"),
            catalogTabContent = $("#aside-catalog-tab.tab-pane"),

            filterTabControlLink = $("a[aria-controls='aside-filter-tab']"),
            filterTabControlParent = filterTabControlLink.parent("li"),
            filterTabContent = $("#aside-filter-tab.tab-pane");

        let checkPage = function() {
            //если страница с категориями товара(папки), то скрывать фильтр
            if ($(".catalog-groups").length > 0) {
                //таб каталога
                catalogTabControlLink.html("Каталог товаров");
                catalogTabControlParent.addClass("active");
                catalogTabControlParent.css("width", "100%");
                catalogTabContent.addClass("active");
                catalogTabControlLink.attr("href", "/catalog/");
                catalogTabControlLink.removeAttr("data-toggle");
                catalogTabControlLink.css("border-top-right-radius", "5px");

                //таб фильтра
                filterTabControlParent.removeClass("active");
                filterTabControlParent.css("width", "0");
                filterTabContent.removeClass("active")
            }

            //если страница с товарами
            if ($(".catalog-products").length > 0) {
                //таб каталога
                catalogTabControlLink.html("Каталог");
                catalogTabControlParent.css("width", "50%");
                catalogTabControlLink.attr("href", "#aside-catalog-tab");
                catalogTabControlLink.attr("data-toggle", "tab");
                catalogTabControlLink.css("border-top-right-radius", "0px");

                //таб фильтра
                filterTabControlParent.css("width", "50%");
            }

            //если результаты поиска по авто
            if ($(".aside-avto").length > 0) {
                catalogTabControlLink.html("Узлы");
                catalogTabControlParent.css("width", "50%");
                catalogTabControlLink.attr("href", "#aside-catalog-tab");
                catalogTabControlLink.attr("data-toggle", "tab");
                catalogTabControlLink.css("border-top-right-radius", "0px");

                //таб фильтра
                filterTabControlParent.css("width", "50%");
            }
        };

        // let init = () => {
        let init = function(){
            checkPage();

            webSettings.set_handler(function() {
                checkPage();
            });
        }

        init();
        return {};

    })(jQuery);



    /*---------------------------------------------------------------------------------*/

    //контакты, фото магазина
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        centerMode: true,
        focusOnSelect: true
    });

    /*---------------------------------------------------------------------------------*/

    //Поиск по авто
    //переключение табов
    //клик на легковые авто
    $("#cars-button").click(function() {
        sessionStorage.setItem('searchCarState', 'cars');
        checkSavedStateSearchCarButtons();
    });

    //клик на грузовые авто
    $("#truck-button").click(function() {
        sessionStorage.setItem('searchCarState', 'trucks');
        checkSavedStateSearchCarButtons();
    });

    //проверить сохраненное состояние выбранной групы авто
    function checkSavedStateSearchCarButtons() {
        let searchCarButtonState = sessionStorage.getItem('searchCarState');

        let carsButton = $("#cars-button");
        let truckButton = $("#truck-button");
        //если в sessionStorage есть запись
        if (searchCarButtonState != undefined) {
            //если кнопки на странице
            if (carsButton || truckButton) {
                //если состояние cars
                if (searchCarButtonState == 'cars') {
                    $("#cars-button").addClass("active");
                    $("#truck-button").removeClass("active");
                    $(".cars-list-select").show();
                    $(".trucks-list-select").hide();

                    if ($("#cars") || $("#truck")) {
                        $("#cars").addClass("active");
                        $("#truck").removeClass("active");
                    }
                }

                //если состояние trucks
                else if (searchCarButtonState == 'trucks') {
                    $("#truck-button").addClass("active");
                    $("#cars-button").removeClass("active");
                    $(".trucks-list-select").show();
                    $(".cars-list-select").hide();

                    if ($("#cars") || $("#truck")) {
                        $("#cars").removeClass("active");
                        $("#truck").addClass("active");
                    }
                };
            };
        } else {
            //если записи нет, установить по умолчанию список легковых авто
            $(".cars-list-select").show();
            $(".trucks-list-select").hide();
        };
    };


    function showHiddenSearchCarOptionsSelects() {
        let currentUrl = window.location.toString();

        //поиск по авто
        let models = "ec_manufacturer";
        let modification = "ec_modelid";
        //let treeNodes = "ec_typeid";

        //поиск по ТО
        let maintenanceplans = "/maintenanceplans/";

        //группы авто: легковые, грузовые
        let carsGroup = "ec_type=1";
        let truckGroup = "ec_type=2";

        //на странице с марками активный селект с марками, остальные не доступны
        checkSavedStateSearchCarButtons();
        $(".avto-models div select").prop('disabled', true);
        $(".avto-models div").css("opacity", "0.4");

        $(".avto-modification div select").prop('disabled', true);
        $(".avto-modification div").css("opacity", "0.4");

        //если ссылка содержит марку (страница с моделями), то активировать селект с марками
        if (currentUrl.indexOf(models) != -1) {
            checkSavedStateSearchCarButtons();

            $(".avto-models div select").prop('disabled', false);
            $(".avto-models div").css("opacity", "1");
        }

        //если ссылка содержит модель (страница с модификациями), то активировать селект с выбором модификации
        if (currentUrl.indexOf(modification) != -1) {
            checkSavedStateSearchCarButtons();

            $(".avto-modification div select").prop('disabled', false);
            $(".avto-modification div").css("opacity", "1");
        }

        //еси это сраница с ланами обслуживания, активировать все селекты
        if (currentUrl.indexOf(maintenanceplans) != -1) {
            checkSavedStateSearchCarButtons();

            $(".avto-models div select").prop('disabled', false);
            $(".avto-models div").css("opacity", "1");

            $(".avto-modification div select").prop('disabled', false);
            $(".avto-modification div").css("opacity", "1");
        }
    };

    showHiddenSearchCarOptionsSelects();

    webSettings.set_handler(function() {
        showHiddenSearchCarOptionsSelects();
    });

    //поиск по авто, быстрый поиск по первым буквам марок, отображение таблицей
    $("#avto-makes-search input[name='firstLetters']").keyup(function() {
        let firstLetter = $(this).val().toUpperCase();

        if (firstLetter.length > 0) {
            $(".avto-makes-list table tbody tr td").each(function() {
                let selfTd = $(this);
                let selfLetterString = selfTd.find("a").html();
                let selfLetter = selfLetterString.slice(0, firstLetter.length).toUpperCase();

                selfTd.filter(function(index) {
                    return firstLetter !== selfLetter;
                }).css("display", "none");
            });
        } else {
            $(".avto-makes-list table tbody tr td").each(function() {
                $(this).css("display", "");
            });
        };
    });

    //поиск по авто, быстрый поиск по первым буквам модели отображение таблицей
    $("#avto-makes-search input[name='firstLetters']").keyup(function() {
        let firstLetter = $(this).val().toUpperCase();

        if (firstLetter.length > 0) {
            $(".avto-models table tbody tr td:nth-child(2)").each(function() {
                let selfTd = $(this);
                let selfLetterString = selfTd.find("a").html();
                let selfLetter = selfLetterString.slice(0, firstLetter.length).toUpperCase();

                selfTd.filter(function(index) {
                    return firstLetter !== selfLetter;
                }).parent("tr").css("display", "none");

            });
        } else {
            $(".avto-models table tbody tr").each(function() {
                $(this).css("display", "");
            });
        };

    });

    //поиск по авто, быстрый поиск по первым буквам модели плитка
    $("#avto-makes-search input[name='firstLetters']").keyup(function() {
        let firstLetter = $(this).val().toUpperCase();

        if (firstLetter.length > 0) {
            $(".avto-model-name").each(function() {
                let selfTd = $(this);
                let selfLetterString = selfTd.html();
                let selfLetter = selfLetterString.slice(0, firstLetter.length).toUpperCase();

                selfTd.filter(function(index) {
                    return firstLetter !== selfLetter;
                }).parent("div").parent("a").parent("td").css("display", "none");

            });
        } else {
            $(".avto-models-plate table tbody tr td").each(function() {
                $(this).css("display", "");
            });
        };

    });

    //поиск по авто, быстрый поиск по двигателю
    $("#avto-makes-search input[name='firstLetters']").keyup(function() {
        let firstLetter = $(this).val().toUpperCase();

        if (firstLetter.length > 0) {
            $(".avto-engine table tbody tr td:nth-child(4)").each(function() {
                let selfTd = $(this);
                let selfLetterString = selfTd.find("a").html();
                let selfLetter = selfLetterString.slice(0, firstLetter.length).toUpperCase();

                selfTd.filter(function(index) {
                    return firstLetter !== selfLetter;
                }).parent("tr").css("display", "none");

            });
        } else {
            $(".avto-engine table tbody tr").each(function() {
                $(this).css("display", "");
            });
        };

    });

    //поиск по авто, переход по клику на строку
    //модели
    $(document).on('click', '#zw_externalcatalogmodels .avto-models table tbody tr', function() {
        let targetLink = $(this).find("a").attr("href");
        if (targetLink != undefined) { window.location = targetLink; }
    });

    //поиск по авто, переход по клику на строку
    //модификации/двигатели
    $(document).on('click', '#zw_externalcatalogtypes table tbody tr', function() {
        let targetLink = $(this).find("a").attr("href");
        if (targetLink != undefined) { window.location = targetLink; }
    });

    //поиск по двигателю, переход по клику на строку
    //результаты поиска по двигателю 
    $(document).on('click', '#zw_externalcatalogenginessearch table tbody tr', function() {
        let targetLink = $(this).find("a").attr("href");
        if (targetLink != undefined) { window.location = targetLink; }
    });

    //уточнение поиска, переход по клику по строке
    $(document).on('click', '#zw_productssearch_v2 #search-result-clarify tbody tr', function() {
        let targetLink = $(this).find("a").attr("href");
        if (targetLink != undefined) { window.location = targetLink; }
    });


    /*---------------------------------------------------------------------------------*/

    //журнал заказов по заказам, смена иконки раскрытия детальной информации (svg шрифт)
    webSettings.set_handler(function() {
        let orderJournalArray = $("#zw_ordersjournalbyorders tr");
        for (let i = 1; i < orderJournalArray.length - 1; i++) {

            if ((orderJournalArray[i + 1].classList.length) && (orderJournalArray[i + 1].classList.contains("order-detail-info"))) {
                let orderIcon = orderJournalArray[i].children[0].children[0].children[0];
                orderIcon.classList.remove("icon-09");
                orderIcon.classList.add("icon-08");
            }

        };
    });

    //календарь, кнопка-иконка
    webSettings.set_handler(function() {
        (function() {
            $("input[cltype='datepicker']").datepicker("option", "showOn", "both");
            $(".ui-datepicker-trigger").addClass("icon-037");
            $(".ui-datepicker-trigger").addClass("journal-calendar__icon"); //19.09.2017
            $(".ui-datepicker-trigger").html("");
        })();
    });

    /*---------------------------------------------------------------------------------*/

    //Корзина подтверждение заказа. Если на странице есть input и/или select с классом error
    //который добавляется автоматически, прокрутить страницу до первого такого элемента
    $(document).on("click", "input[name='data-cart-purchase-button']", function() {
        let pageUrl = window.location.toString();
        let cartConfirmPage = "/cart/confirm/";
        if (pageUrl.indexOf(cartConfirmPage) != -1) {
            let errorInputsArray = $("input.error, select.error");

            if (errorInputsArray.length > 0) {
                let coordTop = errorInputsArray[0].getBoundingClientRect().top + pageYOffset - 20;
                $("body, html").animate({ scrollTop: coordTop }, 800);
            }
        }
    });

    /*---------------------------------------------------------------------------------*/
    //01.09.2017
    function showClientPrice() {
        //продукты в таблице
        //если не корзина
        if (!$(".offer__product-price").hasClass("cart__product-price")) {
            $(".offer__product-price").hide();
            $(".offer__product-price_client").show();
        }

        //продукты плиткой
        findMinClientPrice();
        $(".catalog-products-plate__product-min-price").hide();
        $(".catalog-products-plate__product-min-price_client").show();

        localStorage.setItem("client_price", "true");
        $(".client-price-toggle").addClass("active");
    };


    function hideClientPrice() {
        //продукты в таблице
        //если не корзина
        if (!$(".offer__product-price").hasClass("cart__product-price")) {
            $(".offer__product-price").show();
            $(".offer__product-price_client").hide();
        }

        //продукты плиткой
        $(".catalog-products-plate__product-min-price").show();
        $(".catalog-products-plate__product-min-price_client").hide();

        localStorage.removeItem("client_price");
        $(".client-price-toggle").removeClass("active");
    };
    /*---------------------------------------------------------------------------------*/

    //05.09.2017
    //поиск минимальной цены с клиентской наценкой
    function findMinClientPrice() {
        let clinetPriceMargin = $("input[name='clientpricemargin']").val();

        $(".catalog-products-plate__product-min-price_client").each(function() {
            let minPrice = $(this).html();
            //если минимальная цена товара установлена
            if (minPrice != undefined) {
                minPrice = parseFloat(minPrice);
                //значение процента от минимальной цены. Процент целым числом.
                let minPricePercent = Math.round(minPrice * clinetPriceMargin) / 100;
                //минимальная цена товара с наценкой.
                let minClientPrice = Math.round((minPricePercent + minPrice) * 100) / 100;
                $(this).html(minClientPrice);
            }
        });
    };


    //проверить записан ли статус цены клиента в localStorage
    function checkClientPriceVisibility() {
        let localStorageClientPrice = localStorage.getItem("client_price");
        if (localStorageClientPrice == "true") {
            showClientPrice();
        } else {
            hideClientPrice();
        }
    };

    //при загрузке страницы проверить localStorage на запись цены клиента
    webSettings.set_handler(function() {
        checkClientPriceVisibility();
        //если пользователь не авторизован
        if ($("div").is(".header-user-not-auth")) {
            hideClientPrice();
        };

        //если % наценки 0
        // if ($("input[name='extrachargepercent']").val() == "0,00") {
        if ($("input[data-hidden]").val()=="0") {
            hideClientPrice();
            $(".client-price-toggle").hide();
        }
    });

    //обработка клика переключателя %. Переключатель не активный	
    $(document).on("click", ".client-price-toggle", function() {
        showClientPrice();
    });

    //обработка клика переключателя %. Переключатеь активный
    $(document).on("click", ".client-price-toggle.active", function() {
        hideClientPrice();
    });



    /*---------------------------------------------------------------------------------*/
    // 26.12.2017
    // Фильтр. Кнопка быстрого примнения свойства
    var hideQuickApplyButton = function() {
        $(".filter__quick-apply").fadeOut("fast");
        $(".filter__quick-apply").clearQueue();
    };
    $(document).on("click", ".filter__property-checkbox-label", function() {
        $(".filter__quick-apply").hide();
        $(this).find(".filter__quick-apply").fadeIn("middle");
    });

    $(document).on("click", ".filter__property-radio-label", function() {
        $(".filter__quick-apply").hide();
        $(this).find(".filter__quick-apply").fadeIn("middle");
    });

    $(".filter__property-select>select").on("change", function() {
        $(".filter__quick-apply").hide();
        $(this).parent().parent().find(".filter__quick-apply").fadeIn("middle");
    });

    //27.12.2017
    //развернуть свойства товара в фильтре
    
    var filterCollapse = document.addEventListener('click', function(event) {
        let target = event.target;
        if (target.classList.contains('filter__expand-collapse')) {
            let targetID = target.dataset.filterCollapseTarget,
                properties = document.getElementById(targetID),
                propertiesValue = properties.children[0],
                propertiesHeight;

            if (propertiesValue !== undefined) {
                propertiesHeight = propertiesValue.clientHeight;

                
                if (properties.classList.contains('in')) {
                    target.classList.remove('filter__expand-collapse_expanded');
                    properties.classList.remove("in");
                    properties.style.height = '0px';
                    properties.style.overflow = 'hidden';
                } else { 
                    target.classList.add('filter__expand-collapse_expanded');
                    properties.classList.add("in");
                    properties.style.height = propertiesHeight + 'px';
                    setTimeout(function() { properties.style.overflow = 'visible'; }, 300);
                }
            }
        }
    });   


    //29.12.2017
    // Фильтр. Установить класс, если в группе есть выбранные свойства.
    //
    // проверка есть ли в контейнере выбранные свойства
    var checkInputState = function(container) {
        // проверка чекбоксов
        if (container.classList.contains('filter__property-checkbox')) {
            let checkboxes = container.querySelectorAll("input[type='checkbox']");

            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {

                    return true;
                }
            }
        }

        // проврека радио кнопок
        if (container.classList.contains('filter__property-radio')) {
            let radiobuttons = container.querySelectorAll("input[type='radio']");

            for (let i = 0; i < radiobuttons.length; i++) {
                if (radiobuttons[i].checked) {

                    return true;
                }
            }
        }

        // проверка селектов
        if (container.classList.contains('filter__property-select')) {
            let selects = container.querySelectorAll("select");

            for (let i = 0; i < selects.length; i++) {
                if (selects[i].value !== '') {

                    return true;
                }
            }
        }

        return false;
    }

    // расставить классы, если в группе есть выбранные свойства 
    var setApplyClass = function() {
        var propertiesCollapseContainers = document.getElementsByClassName('filter__collapse');

        if (propertiesCollapseContainers !== null) {
            for (var i = 0; i < propertiesCollapseContainers.length; i++) {
                let propertyContainer = propertiesCollapseContainers[i];

                if (propertiesCollapseContainers[i].childElementCount !== 0) {
                    propertyContainer = propertiesCollapseContainers[i].children[0];

                    if (checkInputState(propertyContainer)) {
                        let propertyParent = propertyContainer.parentNode.parentNode;
                        propertyParent.classList.add("filter__property_apply");
                    }
                }
            }
        }

    };

    var scrollAfterPropertyApply = document.addEventListener('click', function(event) {
        let target = event.target;
        if (target.name === 'applypropertyfilter_submit' || target.classList.contains('link-reset-filter')) {
            let sortWaysTopCoord = document.getElementsByClassName('sort-ways-container')[0];

            if (sortWaysTopCoord !== undefined) {
                let sortWaysTopCoordOffset = sortWaysTopCoord.offsetTop,
                    headerHeight = document.getElementById('ccphupper').clientHeight,
                    scrollToCoord = sortWaysTopCoord - headerHeight - 10;

                $("body, html").animate({ scrollTop: scrollToCoord }, 800);
            }

        }
    });

    var scrollAfterCatalogTreeClick = document.addEventListener('click', function(event) {
        let target = event.target;

        if (target.classList.contains('catalog-tree__link')) {
            let sortWaysTopCoord = document.getElementsByClassName('sort-ways-container')[0];
            let zwCatalog = document.getElementById('zw_catalog');

            if (sortWaysTopCoord !== undefined) {
                let sortWaysTopCoordOffset = sortWaysTopCoord.offsetTop,
                    headerHeight = document.getElementById('ccphupper').clientHeight,
                    scrollToCoord = sortWaysTopCoordOffset - headerHeight - 10;

                $("body, html").animate({ scrollTop: scrollToCoord }, 800);
            } else if (zwCatalog !== null) {
                let headerHeight = document.getElementById('ccphupper').clientHeight,
                    zwCatalogOffsetTop = zwCatalog.offsetTop,
                    scrollToCoord = zwCatalogOffsetTop - headerHeight - 10;

                $("body, html").animate({ scrollTop: scrollToCoord }, 800);
            }
        }

    });

    var scrollAfterCatalogTreeClickLaximo = document.addEventListener('click', function(event) {
        let target = event.target;

        if (target.classList.contains('catalog-tree__link')) {
            let zwLaximoQuickUnits = document.getElementById('zw_laximovehiclesquickunits'),
                zwLaximoUnits = document.getElementById('zw_laximovehiclesunits');

            if (zwLaximoQuickUnits !== null) {
                let zwLaximoQuickUnitsOffsetTop = zwLaximoQuickUnits.offsetTop;

                $("body, html").animate({ scrollTop: zwLaximoQuickUnitsOffsetTop }, 800);

            } else if (zwLaximoUnits !== null) {
                let zwLaximoUnitsOffsetTop = zwLaximoUnits.offsetTop;

                $("body, html").animate({ scrollTop: zwLaximoUnitsOffsetTop }, 800);
            }
        }
    });

    //----------------------------------

    //подсчитать количество выбранных свойств
    var countApplyProperties = function() {
        var applyCountProperty = 0,
            applyContainers = document.getElementsByClassName('filter__property_apply'),
            applyContainersLength = applyContainers.length;

        if (applyContainersLength !== null) {
            for (let i = 0; i < applyContainersLength; i++) {
                let propertyContainer = applyContainers[i].getElementsByClassName('filter__collapse')[0].children[0];
                applyCountProperty += checkApplyProperty(propertyContainer)
            }

            if (applyCountProperty !== 0) {
                let applySpan = document.getElementsByClassName('catalog__count-apply-properties')[0];

                applySpan.innerText = '( ' + applyCountProperty + ' )';
            }

        }
    }

    //проверка выбрано ли свойство
    var checkApplyProperty = function(container) {
        var counter = 0;
        // проверка чекбоксов
        if (container.classList.contains('filter__property-checkbox')) {
            let checkboxes = container.querySelectorAll("input[type='checkbox']");

            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {

                    counter++;
                }
            }
        }

        // проверка радио кнопок
        if (container.classList.contains('filter__property-radio')) {
            let radiobuttons = container.querySelectorAll("input[type='radio']");

            for (let i = 0; i < radiobuttons.length; i++) {
                if (radiobuttons[i].checked) {

                    counter++;
                }
            }
        }

        // проверка селектов
        if (container.classList.contains('filter__property-select')) {
            let selects = container.querySelectorAll("select");

            for (let i = 0; i < selects.length; i++) {
                if (selects[i].value !== '') {

                    counter++;
                }
            }
        }

        return counter;
    }

    setApplyClass();
    countApplyProperties();
    webSettings.set_handler(function(controls) {
        let controlId = controls.attr("id");
        if (controlId === 'zw_searchpropertyfilter_v2') {
            setApplyClass();
            countApplyProperties();
        } else if (controlId === 'zw_catalog') {
            countApplyProperties();
        }
    });





    /*---------------------------------------------------------------------------------*/
    //LAXIMO
    //Лаксимо. По клику на пример номера заполнить поле
    //поиск по vin
    $(document).on("click", ".laximo-search-by-vin-example span", function() {
        $(".laximo-search-by-vin-wrapper input[name='vin']").val($(this).html());
    });

    //поиск по frame
    $(document).on("click", ".laximo-search-by-frame-example span", function() {

        var frame_example = $(this).html();
        var frame, frameno;

        var defis_position = frame_example.indexOf("-");
        if (defis_position != -1) {
            frame = frame_example.substring(0, defis_position);
            frameno = frame_example.substring(defis_position + 1);
            $(".laximo-search-by-frame-wrapper input[name='frame']").val(frame);
            $(".laximo-search-by-frame-wrapper input[name='frameno']").val(frameno);
        } else {
            $("input[name='frame']").val(frame_example);
        }

    });

    //Лаксимо. связать табы деревьев узлов с узлами в контентной части
    $("a[href='#aside-laximo-tree-general-tab']").on("shown.bs.tab", function(e) {
        $("#laximo-general-nodes").show();
        $("#laximo-manufacturer-nodes").hide();
    });

    $("a[href='#aside-laximo-tree-manufacturer-tab']").on("shown.bs.tab", function(e) {
        $("#laximo-general-nodes").hide();
        $("#laximo-manufacturer-nodes").show();
    });

    //Лаксимо. выровнять название узла по центру блока
    function setTopNodeNamePosition() {
        $(".laximo-node-name").each(function() {
            let nameHeight = $(this).height();
            let parentHeight = $(this).parent().height();
            let nameTopPosition = (parentHeight / 2 - nameHeight / 2) + "px";
            $(this).css("top", nameTopPosition);
        });
    };

    setTopNodeNamePosition();
    webSettings.set_handler(function() {
        setTopNodeNamePosition();
    });

    // 07.02.2018
    // Laximo. добавить пробел после запятой, если его нет в дереве узлов
    var laximoNodeTree = document.querySelectorAll('.aside-laximo-tree .catalog-tree__link'),
        laximoNodeTreeLength = laximoNodeTree.length;

    if (laximoNodeTree !== undefined || laximoNodeTreeLength !== 0) {
        for (let i = 0; i < laximoNodeTreeLength; i++) {
            let re = /,(?! )/g; // /запятая(если не пробел)/
            let nodeText = laximoNodeTree[i].innerText;
            nodeText = nodeText.replace(re, ', ');
            laximoNodeTree[i].innerText = nodeText;
        }
    }


    //Лаксимо. увеличить изображение схемы
    $(document).on("click", ".full-width-scheme", function() {
        $(this).addClass("active");
        $(".laximo-scheme-wrapper").addClass("active");

        let schemeHeight = $(".laximo-scheme-img").height() + 5 + "px";
        $(".laximo-scheme-wrapper").parent().css("position", "relative");
        $(".laximo-scheme-wrapper").parent().css("height", schemeHeight);

        //пересчитать координаты на схеме
        zw_LaximoCatalog.reposition();
        //выключить прокрутку по узлу
        zw_LaximoCatalog.autoScroll(undefined, false);

        $(this).html("Уменьшить изображение");
    });

    $(document).on("click", ".full-width-scheme.active", function() {
        $(".laximo-scheme-wrapper").removeClass("active");
        $(this).removeClass("active");

        $(".laximo-scheme-wrapper").parent().css("height", "auto");
        //пересчитать координаты на схеме
        zw_LaximoCatalog.reposition();
        //включить прокрутку по узлу
        zw_LaximoCatalog.autoScroll(undefined, true);

        $(this).html("Увеличить изображение");
    });

    /*---------------------------------------------------------------------------------*/
    //стилизация input[type="file"]
    document.addEventListener('change', function(event) {
        var target = event.target;

        if (target.classList.contains('file-button')) {
            var parentLabel = target.parentNode,
                labelText = parentLabel.getElementsByClassName('button-link'),
                labelTextSpan,
                fileName = target.value.replace("C:\\fakepath\\", '');

            if (labelText !== undefined) {
                labelTextSpan = labelText[0].children[0];
                labelTextSpan.textContent = fileName;
            }
        }
    });


    /*---------------------------------------------------------------------------------*/
    // Прокрутка каталога при клике по пагинации
    webSettings.set_handler(function() {
        $("a[paging_link]").on('click', function() {
            $('body,html').animate({ scrollTop: 0 }, 800);
        })
    });


    /*---------------------------------------------------------------------------------*/
    function showMobileMenu(elem) {
        let leftMenu = "header__nav-aside-left";
        let rightMenu = "header__nav-aside-right";


        if (elem.hasClass(leftMenu)) {
            let headerHeight = $("header").height() - 1;
            $('.backdrop').css("top", 0 + 'px');
            elem.addClass("header__nav-aside-left_active");
            $("#ccphleft").addClass("aside__left_active");
            $('.backdrop').fadeIn('fast');
        } else if (elem.hasClass(rightMenu)) {
            let headerHeight = $("header").height() - 1;
            $('.backdrop').css("top", 0 + 'px');
            elem.addClass("header__nav-aside-right_active");
            $("#ccphright").addClass("aside__right_active");
            $('.backdrop').fadeIn('fast');
        }
    };

    //если боковой области нет или пуста не выводить кнопку открыть меню
    if ($("aside").is("#ccphleft")) {
        $(".aside__left-button").show();
    } else {
        $(".aside__left-button").hide();
    }

    if ($("aside").is("#ccphright")) {
        $(".header__nav-aside-right").show();
    } else {
        $(".header__nav-aside-right").hide();
    }

    /*---------------------------------------------------------------------------------*/
    //02.10.2017
    //Управление закрытием меню и боковой области в мобильной версии.
    function closeMobileMenu(elem) {

        let darkSide = "backdrop";
        let closeBtn = "close-panel";
        let leftMenu = "header__nav-aside-left";
        let rightMenu = "header__nav-aside-right";

        //если клик по затемнению
        if (elem.hasClass(darkSide) || elem.hasClass(closeBtn)) {
            //Правое меню. Снять активность с кнопки меню и контейнера меню. 
            $(".header__nav-aside-right").removeClass("header__nav-aside-right_active");
            $("#ccphright").removeClass("aside__right_active");

            //Левое меню. снять активность с кнопки меню и контейнера меню.
            $(".header__nav-aside-left").removeClass("header__nav-aside-left_active");
            $("#ccphleft").removeClass("aside__left_active");

            //быстро с анимацией скрыть блок
            $('.backdrop').fadeOut('fast');
        }

        //если клик по тому же меню
        else if (elem.hasClass(leftMenu)) {
            $('.backdrop').fadeOut('fast');
            $(".header__nav-aside-left").removeClass("header__nav-aside-left_active");
            $("#ccphleft").removeClass("aside__left_active");

        } else if (elem.hasClass(rightMenu)) {
            $('.backdrop').fadeOut('fast');
            $(".header__nav-aside-right").removeClass("header__nav-aside-right_active");
            $("#ccphright").removeClass("aside__right_active");
        }

    };

    //Переключение меню, если одно из них активно
    function switchMobileMenu(elem) {

        let leftMenu = "header__nav-aside-left";
        let rightMenu = "header__nav-aside-right";

        if (elem.hasClass(leftMenu)) {
            $(".header__nav-aside-right").removeClass("header__nav-aside-right_active");
            $("#ccphright").removeClass("aside__right_active");

            elem.addClass("header__nav-aside-left_active");
            $("#ccphleft").addClass("aside__left_active");
        } else if (elem.hasClass(rightMenu)) {
            $(".header__nav-aside-left").removeClass("header__nav-aside-left_active");
            $("#ccphleft").removeClass("aside__left_active");

            elem.addClass("header__nav-aside-right_active");
            $("#ccphright").addClass("aside__right_active");
        }

    };


    $(".header__nav-aside-right").click(function() {
        if ($(this).hasClass("header__nav-aside-right_active")) {
            closeMobileMenu($(".header__nav-aside-right"));
        } else if ($(".header__nav-aside-left").hasClass("header__nav-aside-left_active")) {
            switchMobileMenu($(".header__nav-aside-right"));
        } else {
            showMobileMenu($(".header__nav-aside-right"));
        }

    });
    $(".header__nav-aside-left").click(function() {
        if ($(this).hasClass("header__nav-aside-left_active")) {
            closeMobileMenu($(".header__nav-aside-left"));
        } else if ($(".header__nav-aside-right").hasClass("header__nav-aside-right_active")) {
            switchMobileMenu($(".header__nav-aside-left"));
        } else {
            showMobileMenu($(".header__nav-aside-left"));
        }
    });

    $('.backdrop').click(function() {
        closeMobileMenu($('.backdrop'));
    });

    $('.close-panel').click(function() {
        closeMobileMenu($('.close-panel'));
    });

    //если клик по кнопке Применить в фильтре, прятать боковую область
    $(document).on("click", "input[name='applypropertyfilter_submit']", function() {
        //Левое меню. снять активность с кнопки меню и контейнера меню.
        $(".aside__left-button").removeClass("aside__left-button_active");
        $("#ccphleft").removeClass("aside__left_active");

        //быстро с анимацией скрыть блок
        $('.backdrop').fadeOut('fast');
    }) 

    //если клик по пункту дерева закрывать боковую область
    $(document).on("click", ".catalog-tree__link", function() {
        //Левое меню. снять активность с кнопки меню и контейнера меню.
        $(".aside__left-button").removeClass("aside__left-button_active");
        $("#ccphleft").removeClass("aside__left_active");

        //быстро с анимацией скрыть блок
        $('.backdrop').fadeOut('fast');
    })

    //11.10.2017
    //если клик по ссылке Выбор договора закрывать меню и показывать всплывающее окно выбора договора
    $(".aside__user-menu-link[data-target='#change-user-contract']").click(function() {
        closeMobileMenu($(".header__nav-aside-left"));

    });
    //31.10.2017
    //если клик по ссылке Склад отгрузки закрывать меню и показывать всплывающее окно выбора склада
    $("a[data-target='#change-shipping-warehouse']").click(function() {
        closeMobileMenu($(".header__nav-aside-left"));
    });

    // 10.01.2018
    // закрыть левое меню свайпом
    document.addEventListener('touchmove', function(event) {
        if (event.target.classList.contains('aside__left_active')) {
            closeMobileMenu($(".header__nav-aside-left"));
        }
    });
    // закрыть правое меню свайпом
    document.addEventListener('touchmove', function(event) {
        if (event.target.classList.contains('aside__right_active')) {
            closeMobileMenu($(".header__nav-aside-right"));
        }
    });

    // показать фильтр по клику по кнопке Фильтр в каталоге
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('catalog__controls_show-filter')) {
            let filterCoord = document.getElementsByClassName('aside-catalog')[0].offsetTop,
                scrollToFilter = filterCoord - 10;

            $("a[aria-controls='aside-filter-tab']").tab('show');

            if ($(".header__nav-aside-right").hasClass("header__nav-aside-right_active")) {
                switchMobileMenu($(".header__nav-aside-left"));
            } else {
                showMobileMenu($(".header__nav-aside-left"));
            }

            $(".aside__left_active").animate({ scrollTop: scrollToFilter }, 0);
        }
    });

    /*---------------------------------------------------------------------------------*/
    //маска для полей ввода тел.номера
    $("input[name='phone']").mask("+7(999) 999-99-99");
    webSettings.set_handler(function() {
        $("input[name='phone']").mask("+7(999) 999-99-99");
    });
    $("input[name='userphone']").mask("+7(999) 999-99-99");


    /*---------------------------------------------------------------------------------*/
    //флажок выбрать все строки в корзине шаг 1
    $(".select-all-checkbox-js").click(function() {
        var cartNumber = $(this).attr("data-select-all"),
            targetTable = $(".cart-products-table[data-select-all='" + cartNumber + "']");

        if ($(this).is(":checked")) {
            targetTable.find("input[type='checkbox']").each(function() {
                if ($(this).prop("checked") === false) {
                    $(this).click();
                }
            });

        } else {
            targetTable.find("input[type='checkbox']").each(function() {
                if ($(this).prop("checked") === true) {
                    $(this).click();
                }
            });
        }
    });

    webSettings.set_handler(function() {
        $(".select-all-checkbox-js").click(function() {
            var cartNumber = $(this).attr("data-select-all"),
                targetTable = $(".cart-products-table[data-select-all='" + cartNumber + "']");

            if ($(this).is(":checked")) {
                targetTable.find("input[type='checkbox']").each(function() {
                    if ($(this).prop("checked") === false) {
                        $(this).click();
                    }
                });

            } else {
                targetTable.find("input[type='checkbox']").each(function() {
                    if ($(this).prop("checked") === true) {
                        $(this).click();
                    }
                });
            }
        });
    });

    /*---------------------------------------------------------------------------------*/
    // установка класса active для пункта дерева каталога
    // 31.01.2018
    var removeActiveFromItems = function(tree) {
        if (tree) {
            var catalogTreeItems = tree.getElementsByClassName('catalog-tree__item');
            for (let i = 0; i < catalogTreeItems.length; i++) {
                catalogTreeItems[i].classList.remove('active');
            }
        }
    }

    var catalogTree = document.getElementsByClassName('catalog-tree');

    for (let i = 0; i < catalogTree.length; i++) {
        catalogTree[i].addEventListener('click', function(event) {
            let targetLink = event.target,
                parentTargetLink = targetLink.parentNode;

            removeActiveFromItems.call(this, this);
            parentTargetLink.classList.add('active');
        });
    }

    /*---------------------------------------------------------------------------------*/
    //вывод количества новых сообщений в пункт меню личного кабинета

    (function() {
        try {
            var userChatControl = document.querySelector("#zw_userchat[cp_uniquekey='messagecount_userchat']"), // контейнер контрола zw_userchat
                menuContainer = document.getElementsByClassName('aside-private-menu')[0];

            if (userChatControl !== null && menuContainer !== undefined) {
                userChatNewMessageInput = userChatControl.querySelector("input[name='usernewmessagecount']"), // input[type='hidden']
                    userChatNewMessageCount = userChatNewMessageInput.value || 0, // количество новых сообщений или 0
                    menuItem = menuContainer.getElementsByClassName('message-count')[0]; //span в меню для добавления кол-ва сообщений 

                if (userChatNewMessageCount !== '0') {
                    menuItem.innerText = ' (' + userChatNewMessageCount + ')';
                    menuItem.parentNode.classList.add('active_new-message');
                }

            }

        } catch (e) {
            console.log(e.message + ' ' + e.stack);
        }
    }());

}); //ready();

/*---------------------------------------------------------------------------------*/
// анимация процеса добавления в корзину
// вся анимация в css
var addOfferToCartStart = function(elem) {
    elem[0].classList.add('icon-013');
};

var addOfferToCartEnd = function(elem) {
    elem[0].classList.remove('icon-013');
}

var offerAnimation = function() {
    var addPlateOfferToCartStart = function addPlateOfferToCartStart(elem) {
        elem[0].classList.add('icon-013');
    };

    var addPlateOfferToCartEnd = function addPlateOfferToCartEnd(elem) {
        elem[0].classList.remove('icon-013');
        var modal = elem.closest('.modal');
        $(modal).modal('hide');
    };

    return {
        addPlateOfferToCartStart: addPlateOfferToCartStart,
        addPlateOfferToCartEnd: addPlateOfferToCartEnd
    };
}();


/*---------------------------------------------------------------------------------*/
// всплывающее окно с запросом цены
var getPlateOfferPrice = function() {
    var init = function init() {
        $(document).on('click', "*[data-target='#offer-plate-get-price']", function() {
            var productName = $(this).data('product-name'),
                productArticle = $(this).data('product-article'),
                productBrand = $(this).data('product-brand'),
                message = '';

            message = "Здравствуйте! Интересует цена товара " + productName + " " + productArticle + " " + productBrand;

            var modal = $("#offer-plate-get-price textarea[name='message']");

            if (modal !== null) {
                modal.val(message);
            };
        });
    };

    init();
    return {};
}(jQuery);

/*---------------------------------------------------------------------------------*/
// анкета
var findInput = (function() {
     function findMessage() {
         console.log('lalala');
         var message = '';
         var inputRow = document.querySelectorAll(".questionary__row");
         for (var rowI = 0; rowI < inputRow.length; rowI++) {
             var inputLabel = inputRow[rowI].querySelector(".questionary__label");
             var inputField = inputRow[rowI].querySelector(".questionary__input");
             if (inputLabel !== null && inputField !== null) {

                 if (inputField.value.length > 0) {
                     message += inputLabel.innerText + ": " + inputField.value + "\n";
                 }
             }
         }
         var inputMessage = document.querySelector("input[name='message']");
         if (inputMessage !== null) {
             inputMessage.value = message;
         }
     }


    //  var init = () => {
    var init = function() {
         var allInputs = document.querySelectorAll(".questionary__input");

         for (var j = 0; j < allInputs.length; j++) {
             allInputs[j].addEventListener("change", findMessage);
         }

         webSettings.set_handler(function(controlOrFunction) {
             if (typeof controlOrFunction == 'object' && controlOrFunction.is(Constants.zw_UserMessage.ID)) {
                 allInputs = document.querySelectorAll(".questionary__input");

                 for (var j = 0; j < allInputs.length; j++) {
                     allInputs[j].addEventListener("change", findMessage);
                 }
             }
         });
     }

     init();
     return {};
 })();



 // если дерево контрола "общее" пустое - скрыть! соседнее - активность и 100% ширины

var hideEmptyLaximoTree = (function () {

    var showTreeLaximo = function () {
        var asideLaximoTree = $("[data-total-tab]");

        if (asideLaximoTree.length === 0) {
            var overalTabLaximo = $("[data-overall-tab]");
            var makerTabLaximo = $("[data-maker-tab]");

            if (overalTabLaximo.length !== 0 && makerTabLaximo !== 0) {
                $("[data-overall-tab]").css({ 'display': 'none' });
                $("[data-maker-tab]").css({ 'width': '100%' });
                $('[data-maker-tab] a').tab("show");
            }
        }
    };
    function init() {
        showTreeLaximo();
    }
    init();
})();

/* --- Если в результатах поиска ничего не найдено, фильтр по брендам не отображать --- */
$(document).ready(function () {

    var tabFilter = $("[data-tab='filter']");
    var filterBrandName = $("[data-vendor-name-filter]");
    var tabCatalog = $("[data-tab='catalog']");
    var contentFilter = $("[data-content='filter']");
    var contentCatalog = $("[data-content='catalog']");

    function hideTabFilter() {
            tabFilter.hide();
            tabCatalog.css("width","100%");
            tabFilter.removeClass("active");
            tabCatalog.addClass("active");
            contentFilter.removeClass("active");
            contentCatalog.addClass("active");
    };

    if(filterBrandName.length === 0 || filterBrandName == undefined) {
        hideTabFilter()
    };
    
});
/* --- Если в результатах поиска ничего не найдено, фильтр по брендам не отображать --- */

// /* --- слайдер на главной странице --- */
$(document).ready(function () {

    var carouselItem = document.getElementsByClassName('carousel__item')[0];
    var carouselContainer = document.getElementsByClassName('carousel__container')[0];
    var carouselCounter = 1;
    if (carouselItem) {
        var carouselItemWidth = carouselItem.clientWidth;
        var carouselLength = document.getElementsByClassName('carousel__item').length;
        var carouselBtnLeft = document.getElementsByClassName('carousel__btn_left')[0];
        var carouselBtnRight = document.getElementsByClassName('carousel__btn_right')[0];
    
    
        var carouselLeftMove = setInterval(itemLeftMove, 3000);
    
        function itemLeftMove() {
            if (carouselCounter >= carouselLength) {
            carouselCounter = 0;
            } else if (carouselCounter < 0) {
            carouselCounter = carouselLength - 1;
            }
            var marginItemLeft = carouselItemWidth * carouselCounter;
            carouselContainer.style.marginLeft = -marginItemLeft + 'px';
            carouselCounter++;
        };
        carouselBtnRight.addEventListener("click", function() {
            clearInterval(carouselLeftMove);
            itemLeftMove();
            setTimeout(function(){
            clearInterval(carouselLeftMove);
            carouselLeftMove = setInterval(itemLeftMove, 3000);
            }, 2000);
        });
    
        carouselBtnLeft.addEventListener("click", function() {
            clearInterval(carouselLeftMove);
            carouselCounter-=2; 
            itemLeftMove();
            setTimeout(function(){
            clearInterval(carouselLeftMove);
            carouselLeftMove = setInterval(itemLeftMove, 3000);
            }, 2000);
        });
    
        
        /* --- Свайп для мобильной версии ---*/
        var startPoint;
        var endPoint;
        document.addEventListener('touchstart', function(e) { 
            startPoint = e.changedTouches[0]; 
        }, false);
        
        document.addEventListener('touchend', function(e) { 
            endPoint = e.changedTouches[0]; 
            
            var xAbs = Math.abs(startPoint.pageX - endPoint.pageX); 
            var yAbs = Math.abs(startPoint.pageY - endPoint.pageY); 
            
            if (xAbs > 20 || yAbs > 20) { 
                if (xAbs > yAbs) {
                    if (endPoint.pageX < startPoint.pageX) { 
                        $('.carousel__btn_right').trigger('click');
                    } else { 
                        $('.carousel__btn_left').trigger('click');
                    }
                }
            }
        }, false);
        /* --- Свайп для мобильной версии ---*/
    }
});
//   /* --- слайдер на главной странице --- */


/* модальное окно, просмотр изображения в детальной карточке. Корректное отображение иконки закрытия окна при смене ориентации телефона */
$(document).ready(function(){   
	var detilsClickImage = document.getElementsByClassName('details-total-image')[0];

	function showIconCrossForImgDetails() {
		var modalIconCross = document.getElementsByClassName('modal-header-img-details')[0];
		if (document.documentElement.clientHeight < 600 && document.documentElement.clientWidth < 900) {
			if (modalIconCross) {
				modalIconCross.classList.add('modal-header-cross');
			}
		}
	};

	function orientationCangeModal() {
		var modalCloseIcon = document.getElementsByClassName('popup-close-default')[0];
		modalCloseIcon.click();
		setTimeout(function(){
			detilsClickImage.click();
		}, 300);
	}

	function handlePrevNext() {
		var modalPrevButton = document.getElementById("full-img-prev");
		var modalNextButton = document.getElementById("full-img-next");
		var modalPrevSpan = modalPrevButton.getElementsByTagName('span')[0];
		var modalNextSpan = modalNextButton.getElementsByTagName('span')[0];

		if (modalNextSpan) {
			modalNextSpan.addEventListener('click', function() {
				setTimeout(function(){
					showIconCrossForImgDetails();
					handlePrevNext();
				}, 400)
			})
		}

		if (modalPrevSpan) {
			modalPrevSpan.addEventListener('click', function() {
				setTimeout(function(){
					showIconCrossForImgDetails();
					handlePrevNext();
				}, 400)
			})
		}
	}

	detilsClickImage.addEventListener ("click", function() {
		setTimeout(showIconCrossForImgDetails, 300);
		setTimeout(handlePrevNext, 300);
	});
	window.addEventListener("orientationchange", function() { 
		orientationCangeModal();
		setTimeout(showIconCrossForImgDetails, 600);
	}, false);
});





/* --- корзина - кнопка "перенести" --- */
$(document).ready(function () {
    webSettings.set_handler(function() {
      var checkboxesChecked = [];
      var carryButton = document.getElementsByClassName("carry__button")[0];
    
      function findCheckboxesChecked() {
        checkboxesChecked = [];
        var checkboxes = document.getElementsByClassName('type-stored-checked');
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
          }
        }
        
        if (carryButton) {
          if (checkboxesChecked.length > 0) {
              carryButton.disabled = false;
            } else {
              carryButton.disabled = true;
            }
        }
      }
    
      var checkboxes = document.getElementsByClassName('type-stored-checked');
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', findCheckboxesChecked);
      }
    });
  });
/* --- корзина - кнопка "перенести" --- */


/* --- Избранные списки, сворачивание-разворачивание --- */
$(document).ready(function () {
    webSettings.set_handler(function() {
    
        var linkExpand = document.getElementsByClassName("link-expand")[0];
        var linkExpand1 = document.getElementsByClassName("link-expand-1")[0];
        var blockExpand = document.getElementsByClassName("block-expand")[0];
        var linkCollapse = document.getElementsByClassName("link-collapse")[0];

        function toggleNewList() {
            blockExpand.classList.toggle("favorite-list__expanded");
        }
        
        if (linkExpand) {
            linkExpand.addEventListener("click", toggleNewList);
        }
        if (linkExpand1) {
            linkExpand1.addEventListener("click", toggleNewList);
        }
        if (linkCollapse) {
            linkCollapse.addEventListener("click", toggleNewList);
        }
        
        var changeLinkExpand = document.getElementsByClassName("change__link-expand")[0];
        var changeBlockExpand = document.getElementsByClassName("change__block-expand")[0];
        var changeLinkBtn = document.getElementsByClassName("change__link_btn")[0];

        var changeRowExpand = document.getElementsByClassName("change__row-expand")[0];
        // var changeRowBlockExpand = document.getElementsByClassName("change__row-block-expand")[0];
        var changeRowBtn = document.getElementsByClassName("change__row_btn")[0];

        function removeCarryList() {
            // changeRowBlockExpand.classList.remove("favorite-list__expanded");
        }

        function toggleChangeList() {
            changeBlockExpand.classList.toggle("favorite-list__expanded");
            removeCarryList();
        }
        
        if (changeLinkExpand) {
            changeLinkExpand.addEventListener("click", toggleChangeList);
        }
        if (changeLinkBtn) {
            changeLinkBtn.addEventListener("click", toggleChangeList);
        }

        function removeChangeList() {
            changeBlockExpand.classList.remove("favorite-list__expanded");
        }
        
        function toggleCarryList() {
            removeChangeList();
            // changeRowBlockExpand.classList.toggle("favorite-list__expanded")
        }
        
        if (changeRowExpand) {
            changeRowExpand.addEventListener("click", toggleCarryList);
        }
        if (changeRowBtn) {
            changeRowBtn.addEventListener("click", toggleCarryList);
        }

    }); 
}); 


/* избранные списки, свертка описания */

// // $(document).ready(function(){
// 	var favoriteShowMoreButon = document.getElementsByClassName('details-description-show-more')[0];
// 	var favoritePropAndDesc = document.getElementsByClassName('favorite-list__cell_description')[0];
// 	// detailsDescrition = document.getElementsByClassName('details-description'),

//     if (favoritePropAndDesc) {
//         if (favoritePropAndDesc.clientHeight > 40) {
//             favoriteShowMoreButon.style.display = 'block';
//             favoritePropAndDesc.style.height = '40px';
//         } 
    
//         function Namename() {
//             if (this.classList.contains('active')) {
//                 this.classList.remove('active');
//                 this.innerText = 'Посмотреть полное описание';
//                 favoritePropAndDesc.style.height = '179px';
    
//             } else {
//                 this.classList.add('active');
//                 this.innerText = 'Свернуть описание';
//                 favoritePropAndDesc.style.height = 'inherit';
//             }
//         }

//         favoriteShowMoreButon.addEventListener('click', Namename )         
//     }

// // });



$(document).ready(function () {
    webSettings.set_handler(function() {
      var checkboxesCheckedFavorites = [];
      var carryButtonFavorites = document.getElementsByClassName("favorite-list__button-carry")[0];
    
      function findCheckboxesChecked() {
        checkboxesCheckedFavorites = [];
        var checkboxesFavorites = document.getElementsByClassName('type-stored-checked');
        for (var i = 0; i < checkboxesFavorites.length; i++) {
          if (checkboxesFavorites[i].checked) {
            checkboxesCheckedFavorites.push(checkboxesFavorites[i]);
          }
        }
        
        if (carryButtonFavorites) {
          if (checkboxesCheckedFavorites.length > 0) {
                carryButtonFavorites.style.display="flex";
            } else {
                carryButtonFavorites.style.display="none";
            }
        }
      }
    
      var checkboxesFavorites = document.getElementsByClassName('type-stored-checked');
      for (let i = 0; i < checkboxesFavorites.length; i++) {
        checkboxesFavorites[i].addEventListener('click', findCheckboxesChecked);
      }
    });
  });