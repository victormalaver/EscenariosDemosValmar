'use strict';

app.multimedia = kendo.observable({
    onShow: function () {},
    afterShow: function () {} 
});

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