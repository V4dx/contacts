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
    
    listarTabla();
    id = id + 1;
    
    //Falta Limpiar Campos despues de Guardado
    limpiarCampos();
}

function listarTabla() {

    $("#tablebody").html("");
    var user = user
    var tr;
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
         tr = "<tr><td>" + lista[i].nombre + "</td><td>" + lista[i].apellido + "</td><td>" + lista[i].telefono + "</td><td>";
         $("#tablebody").append(tr);
        }
    }    
}

function eliminarContacto(id_contacto){
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == id_contacto) {
                delete lista[i];
            } 
        }
    }
    listarTabla();
}

function limpiarCampos() {
    $('#nombre').val("");
    $('#apellido').val("");
    $('#num').val("");
}

// Debes crear un arreglo donde meterlos todos para asi poder identificar cada objeto por individual,
// y que cada uno de estos tenga su propia ID, cosa que ya fue hecha arriba, luego de meter todos los usuarios
// en un arreglo debemos hacer que siempre que ocucra algo se vuelva a recargar el arreglo con los cambios
// y ya, eso hace todo, cuando borren, editen y/o agreguen. 