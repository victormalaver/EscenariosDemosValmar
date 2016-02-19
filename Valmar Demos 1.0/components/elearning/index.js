'use strict';

app.elearning = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});


var url='http://54.213.238.161/app/';

function clase(num,tit){
	var iframe='<iframe class="anima" src="'+url+num+'"> </iframe>';
	//var iframe='hola';
    $('#memo').val(iframe);
    $('#titulo').html(tit);
    $('#animacion').html(iframe);
    //var nu = $('#memo').val();
    //console.log(nu);
    
    window.location.href = "#drawer-starred";
}

function limpiar(){
	$('#titulo').html('nada');
	$('#animacion').html('nada');
	window.location.href = "#drawer-home";
}