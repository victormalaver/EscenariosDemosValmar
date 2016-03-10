'use strict';

app.marker = kendo.observable({
    onShow: function () {
        cargaPosAlmacenesDespachador();
    },
    afterShow: function () {},
});

// START_CUSTOM_CODE_scanner
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_scanner


function cargaPosAlmacenesDespachador() {
    $("#map").remove();
    var alto = 500;
    var div = $("<div id='map' style='width:100%;height:" + alto + "px;' ></div>").text("");
    $("#divMapMarker").after(div);

    //<![CDATA[

    var iconAlmacen = L.icon({
        iconUrl: 'images/almacen.png',
        // iconRetinaUrl: 'my-icon@2x.png',
        // iconSize: [38, 95], 
        iconAnchor: [15, 38], //X,Y
        popupAnchor: [0, -35],
        // // shadowUrl: 'my-icon-shadow.png',
        // shadowRetinaUrl: 'my-icon-shadow@2x.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });

    var iconDespachador = L.icon({
        iconUrl: 'images/despachador.png',
        // iconRetinaUrl: 'my-icon@2x.png',
        // iconSize: [38, 95],
        iconAnchor: [15, 38], //X,Y
        popupAnchor: [0, -35],
        // // shadowUrl: 'my-icon-shadow.png',
        // shadowRetinaUrl: 'my-icon-shadow@2x.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });

    var iconMiUbicacion = L.icon({
        iconUrl: 'Mapa/images/marker-icon.png',
        // iconRetinaUrl: 'my-icon@2x.png',
        // iconSize: [38, 95],
        iconAnchor: [15, 38], //X,Y
        popupAnchor: [0, -35],
        // // shadowUrl: 'my-icon-shadow.png',
        // shadowRetinaUrl: 'my-icon-shadow@2x.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });



    var map = new L.map('map', {
        center: [-12.11391, -77.03933],
        zoom: 10,
    });

    L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        //attribution: "Map: Tiles Courtesy of MapQuest (OpenStreetMap, CC-BY-SA)",
        subdomains: ["otile1", "otile2", "otile3", "otile4"],
        // maxZoom: 12,
        // minZoom: 2
    }).addTo(map);


    var markerDespachadores = new L.MarkerClusterGroup();
    var markerAlmacenes = new L.MarkerClusterGroup();
    //markers.addLayer(new L.Marker([1, 1]));




    // Mi ubicacion
    var miUbicacion = new L.MarkerClusterGroup();

    var options = {
        frequency: 1000, //1000 = 1 s
        enableHighAccuracy: true
    };
    var watchID = navigator.geolocation.getCurrentPosition(function () { //watchPosition //getCurrentPosition
            var miLatLong = [];
            miLatLong = [parseFloat(arguments[0].coords.latitude), parseFloat(arguments[0].coords.longitude)]; //[43.465187, -80.52237200000002]; 
            miUbicacion.addLayer(new L.Marker(miLatLong, {
                icon: iconMiUbicacion
            }).bindPopup("<b>Estoy aquí:</b></br>" + JSON.stringify(arguments[0].coords).replace(/,/g, "</br>")));
            miUbicacion.addTo(map);
            
        },
        function () {
            console.log("Error");
        }, options);

    navigator.geolocation.clearWatch(watchID); //para detener
    watchID = null; //para detener

    //end mi ubicacion 

    // console.log(miUbicacion);


    markerDespachadores.addTo(map);
    markerAlmacenes.addTo(map);




    var ubicDespachador = despachadores;




    if (ubicDespachador.length > 0) {
        for (var i = 0; i < ubicDespachador.length; i++) {
            // console.log(ubicDespachador[i].Info);
            // console.log(ubicDespachador[i].Fecha);
            // console.log(ubicDespachador[i].LatLong);
            // console.log(ubicDespachador[i].Operacion);
            markerDespachadores.addLayer(new L.Marker(ubicDespachador[i].LatLong, {
                icon: iconDespachador
            }).bindPopup(ubicDespachador[i].Info));
        }
    } else {

    }

    var ubicAlmacen = almacenes;


    if (ubicAlmacen.length > 0) {
        for (var i = 0; i < ubicAlmacen.length; i++) {
            // console.log(ubicDespachador[i].AlmDescripcion);
            // console.log(ubicDespachador[i].AlmDireccion);
            // console.log(ubicDespachador[i].AlmID);
            // console.log(ubicDespachador[i].InfoAlmacen);
            // console.log(ubicDespachador[i].LatLong);
            markerAlmacenes.addLayer(new L.Marker(ubicAlmacen[i].LatLong, {
                icon: iconAlmacen
            }).bindPopup(ubicAlmacen[i].InfoAlmacen));
        }

    } else {}

    //control
    //control
    // var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     osm = L.tileLayer(osmUrl, {
    //         maxZoom: 18,
    //         // attribution: osmAttrib

    //         icon: iconAlmacen

    //     }),
    //     osm2 = new L.TileLayer(osmUrl, {
    //         attribution: 'Hello world',
    //         icon: iconAlmacen
    //     });

    // var marker = new L.Marker(new L.LatLng(43.465187,-80.52237200000002), {
    //     color: 'red'
    // });
    // map.addLayer(marker);
    // marker.bindPopup("Aquí estoy").openPopup();

    // var marker2 = new L.Marker(new L.LatLng(43.465187,-80.52237200000002));
    // map.addLayer(marker2);
    
    var layersControl = new L.Control.Layers(
        // {
        // 'OSM': osm,
        // 'OSM2': osm2
        // }, 
        {}, //dejar esto así
        {
            'Almacenes': markerAlmacenes,
            'Despachadores': markerDespachadores,
            'Mi Ubicación': miUbicacion,
        });

    map.addControl(layersControl);
    // map.addControl(new L.Control.Scale());
    //control
    //control
    // L.DomEvent.on(L.DomUtil.get('verMarcadores'), 'click', function () {
    //     map.addLayer(markers);
    // });


}