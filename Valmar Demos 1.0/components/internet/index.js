'use strict';

app.internet = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});
//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
var downloadSize = 4995374; //bytes
var estadoTest;

function getSpeedInternet(e) {
    $("#progressHeader").text("Started");
    $("#progressResult").css("display", "block");
    $("#testRespuesta").css("display", "block");
    // kendo.ui.progress($("#testRespuesta"), true);
    var counter = 0;
    estadoTest = e.checked;
    // console.log(estadoTest);
    var interval = setInterval(function () {
        counter++;
        // Display 'counter' wherever you want to display it.

        if (estadoTest) {


            // console.log(counter + "  " + estadoTest);
            var oProgress = document.getElementById("progress");
            // oProgress.innerHTML = "Testeando, espere un momento...";
            // window.setTimeout(MeasureConnectionSpeed, 1);
            MeasureConnectionSpeed(estadoTest);

        } else {
            estadoTest = false;
            $("#progressResult").css("display", "none");
            $("#progressHeader").text("Stopped");
            $("#testRespuesta").css("display", "none");
            return;
        }

    }, 1000);
};

function MeasureConnectionSpeed(estadoTest) {
    $("#testRespuesta").css("display", "block");
    var oProgress = document.getElementById("progressResult");
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }

    download.onerror = function (err, msg) {
        oProgress.innerHTML = "Invalid image, or error downloading";
    }

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        oProgress.innerHTML = "Su velocidad es de: <br />" +
            speedBps + " bps<br />" +
            speedKbps + " kbps<br />" +
            speedMbps + " Mbps<br />";
    }

}