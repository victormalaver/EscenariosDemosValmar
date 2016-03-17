'use strict';

(function () {
    var app = {
        data: {}
    };
    var bootstrap = function () {
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                // initial: 'components/home/view.html'
            });
        });
        
        $(".selector li").click(function (e) {
            var link = e.currentTarget.dataset.href;
            app.mobileApp.navigate(link);
        }); 
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
                app.changeSkin = function (e) {
                    console.log(e.sender.element.text());
                    var mobileSkin = "";

                    switch (e.sender.element.text()) {
                        case "Nova":
                            e.sender.element.text("Native");
                            mobileSkin = "";
                            break;
                        case "Native":
                            e.sender.element.text("Flat");
                            mobileSkin = "flat";
                            break;
                        default: //case "Flat":
                            e.sender.element.text("Nova");
                            mobileSkin = "nova";
                            break;
                    }
                    app.mobileApp.skin(mobileSkin);
                    if (app.mobileApp.view().title === "Internet") {
                        setTimeout(function () {
                            // $("input[type='checkbox']").  
                            app.mobileApp.view().element.find("input").data("kendoMobileSwitch").refresh();
                        }, 200);
                    }
                };
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_kendoUiMobileApp