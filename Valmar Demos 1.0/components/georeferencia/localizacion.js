'use strict';

app.localizacion = kendo.observable({
    onShow: function () {

    },
    afterShow: function () {},
});

// START_CUSTOM_CODE_scanner
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_scanner


function cargarMapa() {
    $("#mapLocalizacion").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
                    }]
    });

    var map = $("#mapLocalizacion").data("kendoMap");
    $("#mapLocalizacion").click(function (e) {
        $(".k-marker.k-marker-pin-target").hide();;
        var loc = map.eventToLocation(e);
        map.markers.add({
            location: loc,
            tooltip: {
                content: "Mi Ubicación"
            }
        });
        $("#miUbicacion").text(loc);
        // console.log(loc);
        // $(".k-marker.k-marker-pin-target").css("border", "13px solid red");
    });
}





function handleRefresh() {
    var options = {
            enableHighAccuracy: true
        },
        that = this;

    setResults("Waiting for geolocation information...");

    navigator.geolocation.getCurrentPosition(function () {
        onSuccess(arguments);
    }, function () {
        onError(arguments);
    }, options);
}


function handleWatch(watchID) {
    
    var that = this,
        // If watch is running, clear it now. Otherwise, start it.
        button = document.getElementById("watchButton");

    if (watchID != null) {
        setResults();
        navigator.geolocation.clearWatch(watchID);
        watchID = null;

        button.innerHTML = "Start Geolocation Watch";
    } else {
        setResults("Waiting for geolocation information...");
        // Update the watch every second.
        var options = {
            frequency: 1000,
            enableHighAccuracy: true
        };
        watchID = navigator.geolocation.watchPosition(function () {
            onSuccess.apply(that, arguments);
        }, function () {
            onError.apply(that, arguments);
        }, options);
        button.innerHTML = "Clear Geolocation Watch";

    }
} 
 
function onSuccess(position) {
    // Successfully retrieved the geolocation information. Display it all.

    setResults('Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
        'Heading: ' + position.coords.heading + '<br />' +
        'Speed: ' + position.coords.speed + '<br />' +
        'Timestamp: ' + new Date(position.timestamp).toLocaleTimeString().split(" ")[0] + '<br />');
}

function onError(error) {
    setResults('code: ' + error.code + '<br/>' +
        'message: ' + error.message + '<br/>');
}

function setResults(value) {
    if (!value) {
        document.getElementById("results").innerHTML = "";
    } else {
        document.getElementById("results").innerHTML = value;
    }
}