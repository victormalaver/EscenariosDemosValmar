'use strict';

app.localizacion = kendo.observable({
    onShow: function () {
        var model = this.model; //here, 'this' is the view instance
        // scanButton = document.getElementById("scanButton");
        
        // model.resultsField = document.getElementById("resultScan");
        
        // scanButton.addEventListener("click", model.scan);
    },
    afterShow: function() {}, 
    scan: function () {

        if (window.navigator.simulator === true) {
            alert("Not Supported in Simulator.");
        }
        else {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        app.scanner.addMessageToLog(result.format + " | " + result.text);
                    }
                }, 
                function(error) {
                    console.log("Scanning failed: " + error);
                });
        }
    },
    addMessageToLog: function(message) {
        var resultScan = document.getElementById("resultScan");
        resultScan.innerHTML += '<li>Captura tomada! Su ruta es: ' + message + '</li>'
        // that.resultsField.innerHTML = '</li>'+currentMessage + message + '</li>'; 
        // $("#resultScan").text(message);
    }
});

// START_CUSTOM_CODE_scanner
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_scanner

