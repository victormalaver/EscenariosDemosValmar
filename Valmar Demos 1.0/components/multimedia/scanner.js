'use strict';

app.scanner = kendo.observable({
    onShow: function () {
        // debugger
        var model = this.model, //here, 'this' is the view instance
        scanButton = document.getElementById("scanButton");
        
        model.resultsField = document.getElementById("result");
        
        scanButton.addEventListener("click", model._scan);
    },
    afterShow: function() {}, 
    _scan: function() {
        var that = this;
        if (window.navigator.simulator === true) {
            alert("Not Supported in Simulator.");
        }
        else {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        that._addMessageToLog(result.format + " | " + result.text);    
                    }
                }, 
                function(error) {
                    console.log("Scanning failed: " + error);
                });
        }
    },

    _addMessageToLog: function(message) {
        alert(message);
        var that = this,
        currentMessage = that.resultsField.innerHTML;
        
        that.resultsField.innerHTML = currentMessage + message + '<br />'; 
    }
});

// START_CUSTOM_CODE_scanner
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_scanner

