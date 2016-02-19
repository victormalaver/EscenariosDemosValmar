'use strict';

app.nfc = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_nfc
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nfc

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    var isListening = false;

    DemoViewModel = kendo.data.ObservableObject.extend({

        appendOutput: function (what) {
            var outputDiv = document.querySelector('#output');
            outputDiv.innerHTML = what;
        },

        nfcHandler: function (nfcEvent) {
            var tag = nfcEvent.tag;
            var ndefMessage = tag.ndefMessage;
            var nfcResult = "";
            for (var i = 0; i < ndefMessage.length; i++) {
                if (i > 0) {
                    nfcResult += "<br/>";
                }
                var payload = nfc.bytesToString(ndefMessage[i].payload);
                if (ndefMessage[i].type == 84) {
                    // for messages, strip the language prefix
                    payload = payload.substring(3);
                }
                nfcResult += payload;
            }
            app.demoService.viewModel.appendOutput("Scanned: " + nfcResult);
        },

        startListening: function () {
            if (!this.checkSimulator()) {
                if (isListening) {
                    alert("Already listening");
                } else {
                    isListening = true;
                    // in production you probably want to wire up this listener when Cordova's deviceready event fires
                    nfc.addNdefListener(
                        app.demoService.viewModel.nfcHandler,
                        function () { // success callback
                            app.demoService.viewModel.appendOutput("You can now scan a tag.");
                        },
                        function (error) { // error callback
                            app.demoService.viewModel.appendOutput("Error: " + JSON.stringify(error));
                        }
                    );
                }
            }
        },

        stopListening: function () {
            if (!this.checkSimulator()) {
                if (!isListening) {
                    alert("Wasn't listening");
                } else {
                    isListening = false;
                    nfc.removeNdefListener(
                        app.demoService.viewModel.nfcHandler,
                        function () { // success callback
                            app.demoService.viewModel.appendOutput("Stopped listening.");
                        },
                        function (error) { // error callback
                            app.demoService.viewModel.appendOutput("Error: " + +JSON.stringify(error));
                        }
                    );
                }
            }
        },

        write: function () {
            var texto = document.getElementById("TextoIngresado").value;
            if (!this.checkSimulator()) {
                var records = [
                    ndef.textRecord("Hi there!"),
                    ndef.textRecord(new Date()),
                    ndef.uriRecord(texto)
                ];
                nfc.write(
                    records,
                    this.onSuccess,
                    this.onError
                );
            }
        },

        startSharing: function () {
            if (!this.checkSimulator()) {
                var records = [
                    ndef.textRecord("I've been beamed via NFC :)")
                ];
                nfc.share(
                    records,
                    this.onSuccess,
                    this.onError
                );
            }
        },

        stopSharing: function () {
            if (!this.checkSimulator()) {
                nfc.unshare(
                    this.onSuccess,
                    this.onError
                );
            }
        },

        checkNfcEnabled: function () {
            if (!this.checkSimulator()) {
                nfc.enabled(
                    function () {
                        alert('yes!')
                    },
                    function (msg) {
                        alert(msg)
                    }
                );
            }
        },

        checkSimulator: function () {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.nfc === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function (msg) {
            alert('NFC function success: ' + msg);
        },

        onError: function (msg) {
            alert('NFC function error: ' + msg);
        }
    });
    app.nfc = {
        viewModel: new DemoViewModel()
    };
})(window);