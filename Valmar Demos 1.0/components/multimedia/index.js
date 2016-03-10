'use strict';

//document.addEventListener("deviceready", onDeviceReady, false);

function id(element) {
    return document.getElementById(element);
}

//function onDeviceReady() {
//    navigator.splashscreen.hide();
//    captureApp = new captureApp();
//    captureApp.run();
//}
app.multimedia = kendo.observable({
    pictureSource: null,
    destinationType: null,

    // onShow: function () {  Esto genera doble llamda cuando no se instancio el data model 
    //     var model = this.model; //here, 'this' is the view instance
    //     id("captureVideo").addEventListener("click", function () {
    //         // debugger;
    //         model.captureVideo(arguments);
    //     });
    //     id("captureAudio").addEventListener("click", function () {
    //         model.capureAudio(arguments);
    //     });
    //     id("captureImage").addEventListener("click", function () {
    //         model.captureImage(arguments);
    //     });
    // },

    onShow: function () {
        var model = this.model; //here, 'this' is the view instance
        // alert('addEventListener');
        id("captureVideo").addEventListener("click", function () {
            model.captureVideo(arguments);
        });
        id("captureAudio").addEventListener("click", function () {
            model.capureAudio(arguments);
        });
        id("captureImage").addEventListener("click", function () {
            model.captureImage(arguments);
        });
    },
    afterShow: function () {},
    captureVideo: function () {
        var that = this;
        navigator.device.capture.captureVideo(function () {
            that.captureSuccess(arguments);
        }, function () {
            that.captureError(arguments);
        }, {
            limit: 1
        });
    },

    capureAudio: function () {
        var that = this;
        navigator.device.capture.captureAudio(function () {
            that.captureSuccess(arguments);
        }, function () {
            that.captureError(arguments);
        }, {
            limit: 1
        });
    },

    captureImage: function () {
        var that = this;
        navigator.device.capture.captureImage(function () {
            that.captureSuccess(arguments);
        }, function () {
            that.captureError(arguments);
        }, {
            limit: 1
        });
    },

    captureSuccess: function (capturedFiles) {
        debugger;
        var i,
            media = document.getElementById("media");
        // media.innerHTML = "";
        for (i = 0; i < capturedFiles.length; i += 1) {
            media.innerHTML += '<li>Captura tomada! Su ruta es: ' + capturedFiles[i][0].fullPath + '</li>'
        }
    },

    captureError: function (error) {
        if (window.navigator.simulator === true) {
            alert(error);
        } else {
            var media = document.getElementById("media");
            media.innerHTML = "An error occured! Code:" + error.code;
        }
    }

});


//window.captureApp = kendo.observable({
//    pictureSource: null,
//    destinationType: null,

//    captureVideo: function (e) {
//        alert(1);
//        navigator.device.capture.captureVideo(function () {
//            app.multimedia.captureSuccess(arguments);
//        }, function () {
//            app.multimedia.captureError(arguments);
//        }, {
//            limit: 1
//        });
//    },

//    capureAudio: function (e) {
//        alert(2);
//        navigator.device.capture.captureAudio(function () {
//            app.multimedia.captureSuccess(arguments);
//        }, function () {
//            app.multimedia.captureError(arguments);
//        }, {
//            limit: 1
//        });
//    },

//    captureImage: function (e) {
//        alert(3);
//        navigator.device.capture.captureImage(app.multimedia.captureSuccess, app.multimedia.captureError, {
//            limit: 1
//        });
//        //Codigo para eliminar el bug de la primera grabación (en la primera grabación no se guarda la ruta)
//        if (e.preventDefault) {
//            e.preventDefault();
//        }
//        e.stopPropagation();
//        //end
//    },

//    captureSuccess: function (capturedFiles) {
//        var i, media = document.getElementById("media");
//        for (i = 0; i < capturedFiles.length; i += 1) {
//            capturesMsg += capturedFiles[i].fullPath;
//            capturesMsg = capturesMsg.replace(/\%20/g, ' ');
//            media.innerHTML += '<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
//        }

//        if (e.preventDefault) {
//            e.preventDefault();
//        }
//        e.stopPropagation();
//    },

//    captureError: function (error) {
//        if (window.navigator.simulator === true) {
//            alert(error);
//        } else {
//            var media = document.getElementById("media");
//            media.innerHTML = "An error occured! Code:" + error.code;
//        }
//    },
//});


// START_CUSTOM_CODE_multimedia
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_multimedia
// function id(element) {
//     return document.getElementById(element);
// }

// (function () {
//     window.captureApp = kendo.observable({
//         pictureSource: null,
//         destinationType: null,
//         // run: function () {
//         //     alert();
//         //     var that = this;
//         //     id("captureVideo").addEventListener("click", function () {
//         //         that._captureVideo.apply(that, arguments);
//         //     });
//         //     id("captureAudio").addEventListener("click", function () {
//         //         that._capureAudio.apply(that, arguments);
//         //     });
//         //     id("captureImage").addEventListener("click", function () {
//         //         that._captureImage.apply(that, arguments);
//         //     });
//         // },

//         captureVideo: function (e) {
//             alert(1);
//             var that = this;
//             navigator.device.capture.captureVideo(function () {
//                 that._captureSuccess.apply(that, arguments);
//             }, function () {
//                 captureApp._captureError.apply(that, arguments);
//             }, {
//                 limit: 1
//             });
//         },

//         capureAudio: function (e) {
//             alert(2);
//             var that = this;
//             navigator.device.capture.captureAudio(function () {
//                 that._captureSuccess.apply(that, arguments);
//             }, function () {
//                 captureApp._captureError.apply(that, arguments);
//             }, {
//                 limit: 1
//             });
//         },

//         captureImage: function (e) {
//             alert(3);
//             var that = this;
//             navigator.device.capture.captureImage(that.captureSuccess, that.captureError, {
//                 limit: 1
//             });
//             //Codigo para eliminar el bug de la primera grabación (en la primera grabación no se guarda la ruta)
//             if (e.preventDefault) {
//                 e.preventDefault();
//             }
//             e.stopPropagation();
//             //end
//         },

//         captureSuccess: function (capturedFiles) {
//             var i, media = document.getElementById("media");
//             for (i = 0; i < capturedFiles.length; i += 1) {
//                 capturesMsg += capturedFiles[i].fullPath;
//                 capturesMsg = capturesMsg.replace(/\%20/g, ' ');
//                 media.innerHTML += '<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
//             }

//             if (e.preventDefault) {
//                 e.preventDefault();
//             }
//             e.stopPropagation();
//         },

//         captureError: function (error) {
//             if (window.navigator.simulator === true) {
//                 alert(error);
//             } else {
//                 var media = document.getElementById("media");
//                 media.innerHTML = "An error occured! Code:" + error.code;
//             }
//         },
//     });
// }());