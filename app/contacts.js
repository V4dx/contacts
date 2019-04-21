$(document).ready(function () {
    $("#buton").click(clicFun);

});

var lista = new Array();
var id = 0;

function clicFun() {

    var nombre, apellido, telefono;

    nombre = $('#nombre').val();
    apellido = $('#apellido').val();
    telefono = $('#num').val();

    usuario = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
    }

    lista.push(usuario);
    crearTabla(lista, usuario);
    id = id + 1;
    
    console.log(id);
    console.log(lista);
    //Falta Limpiar Campos despues de Guardado
}

function crearTabla(array, user) {

    var data = array;
    var user = user

    for (var i = 0; i < data.length; i++) {
        var tr = $("<tr><td>" + user.nombre + "</td><td>" + user.apellido + "</td><td>" + user.telefono + "</td><td>");
    }

    $("#tablebody").append(tr);
}

/*function limpiarCampos() {
    document.getElementById("form").reset();
}*/

// Debes crear un arreglo donde meterlos todos para asi poder identificar cada objeto por individual,
// y que cada uno de estos tenga su propia ID, cosa que ya fue hecha arriba, luego de meter todos los usuarios
// en un arreglo debemos hacer que siempre que ocucra algo se vuelva a recargar el arreglo con los cambios
// y ya, eso hace todo, cuando borren, editen y/o agreguen. 




