'use strict';

app.georeferencia = kendo.observable({

});

function cargarMapa() {
    $("#map").kendoMap({
        layers: [{
            type: "tile",
            urlTemplate: "http://a.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            attribution: "&copy; OpenStreetMap"
                    }]
    });

    var map = $("#map").data("kendoMap");
    $("#map").click(function (e) {
        $(".k-marker.k-marker-pin-target").hide();;
        var loc = map.eventToLocation(e);
        map.markers.add({
            location: loc,
            tooltip: {
                content: "Foo"
            }
        });
        console.log(loc);
        // $(".k-marker.k-marker-pin-target").css("border", "13px solid red");
    });
}