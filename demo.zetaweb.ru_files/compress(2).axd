var zw_virtualPath="";var webSettings={loadingTimeout:0,liveInitialized:false,attributesNames:{threeStateButtonCollapseID:"tsb_cid",threeStateButtonExpandeID:"tsb_eid",threeStateButtonUnexpandedID:"tsb_uid"},set_threeStateButtonState:function(a){a=$(a);var b;if(a.is("a")){b=a.children()}else{b=a}var f=b.attr("state");if(f=="unexpandable"){return}if(!f){f="collapsed"}var c=(f=="collapsed"?b.attr(webSettings.attributesNames.threeStateButtonCollapseID):b.attr(webSettings.attributesNames.threeStateButtonExpandeID));var e=b.attr("src");var d=e.split("?").pop().split("&").shift().split("=").pop();b.attr("src",e.replace(d,c));b.attr("state",(f=="collapsed"?"expanded":"collapsed"))},set_mousePoint:function(){$(document).mousemove(function(a){$.coorX=a.pageX;$.coorY=a.pageY})},set_showLoadScreen:function(){},set_hideLoadScreen:function(){$("#waitDiv").center().css({visibility:"hidden"});$("#waitImg").center().css({visibility:"hidden"})},_handlers:[],runHandlers:function(a){for(var c=0;c<webSettings._handlers.length;c++){var b=webSettings._handlers[c];b(a)}},set_handler:function(a){webSettings._handlers.push(a);$(document).ready(a)},addHandler:function(a){webSettings._handlers.push(a)},_subscribeToDocumentReadyHandlers:[],subscribeToDocumentReady:function(a){webSettings._subscribeToDocumentReadyHandlers.push(a)},getControls:function(c,b){if(webSettings.isFunction(c)){if(b){return $(b)}return $(undefined)}var a=$(c);if(!b){return a}return a.filter(b)},isFunction:function(a){if(typeof a==="function"){return true}return false},isReadyOrControl:function(b,a){if(webSettings.isFunction(b)){return true}if(webSettings.isControl(b,a)){return true}return false},isControl:function(a,b){if(webSettings.isFunction(a)){return false}if($(a).isControl()&&(b&&$(a).is(b)||!b)){return true}return false},init:function(){$.ajaxSetup({cache:false});$.map(webSettings._subscribeToDocumentReadyHandlers,function(a){webSettings.set_handler(a)});webSettings.set_handler(function(){$("input[placeholder], textarea[placeholder]").placeholder()});webSettings.loadingTimeout=window.setTimeout(webSettings.set_showLoadScreen,600);if(!webSettings.liveInitialized){webSettings.liveInitialized=true}}};var ZwUri=function(e,a,c,b,d){this.raw=e;this.host=a;this.port=c;this.path=b;this.query=d;this.page="";if(b){if(b[0]==="/"){b=b.slice(1)}this.page=b.split("/")[0]}};var WebSetting2=(function(){var f=function(m){if(m==undefined){return undefined}var l=m;if(typeof m=="string"){l=document.createElement("a");l.href=m}l=$(l);if(!l.is("a")){return undefined}return new ZwUri(l[0].href,l[0].host,l[0].port,l[0].pathname,l[0].search)};var d=function(l){if(l==undefined){return undefined}if(!(l instanceof ZwUri)){l=f(l)}if(l!=undefined){return l.page}return undefined};var e=function(l){if(l==undefined){return undefined}if(!(l instanceof ZwUri)){l=f(l)}if(l!=undefined){return l.path}return undefined};var b=function(){return d(document.location.href)};var c=function(){return e(document.location.href)};var i=function(l){return !(d(l)===b())};var j=function(l){return !(e(l)===c())};var a=function(){var l=$("#ccphbottom").css("overflow","hidden");var o=l.prev();var n=l.outerHeight(true);var m=l.outerHeight(false);l.css("position","absolute").css("width","100%").css("height",m).css("bottom",0).css("left",0).css("min-width",o.innerWidth(true)).parent().css("position","relative");o.css("padding-bottom",n);$("#zw_mp_content").css("min-height","100%").parents().css("height","100%")};var h=function(){var l={monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthNamesShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],dayNames:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],dayNamesShort:["вск","пнд","втр","срд","чтв","птн","сбт"],dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],weekHeader:"Нед",dateFormat:"dd.mm.yy",firstDay:1,closeText:"Закрыть",prevText:"&#x3C;Пред",nextText:"След&#x3E;",currentText:"Сегодня",isRTL:false,showMonthAfterYear:false,yearSuffix:"",changeYear:false};$("input[cltype='datepicker']").each(function(n,m){if($(m).attr("settings")){var o=jQuery.extend({},l);$(m).datepicker($.extend(o,$.parseJSON($(m).attr("settings"))))}else{$(m).datepicker(l)}})};var k=function(m,l){$(document).ready(function(){ZetaHistory.registerHandler(m,l)})};var g=function(){webSettings.set_handler(a);webSettings.set_handler(h)};g();jQuery.uaMatch=function(m){m=m.toLowerCase();var l=/(chrome)[ /]([w.]+)/.exec(m)||/(webkit)[ /]([w.]+)/.exec(m)||/(opera)(?:.*version|)[ /]([w.]+)/.exec(m)||/(msie) ([w.]+)/.exec(m)||m.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([w.]+)|)/.exec(m)||[];return{browser:l[1]||"",version:l[2]||"0"}};if(!jQuery.browser){matched=jQuery.uaMatch(navigator.userAgent);browser={};if(matched.browser){browser[matched.browser]=true;browser.version=matched.version}if(browser.chrome){browser.webkit=true}else{if(browser.webkit){browser.safari=true}}jQuery.browser=browser}return{getUri:f,isLinkToAnotherPage:i,isLinkToAnotherPath:j,getCurrentPageName:b,getUrlPageName:d,getUrlPath:e,FooterReposition:a,registerUrlHandler:k}}(jQuery));

