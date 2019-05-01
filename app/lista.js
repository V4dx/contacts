$(document).ready(function () {
    $("#buton").click(clicFun);
});

var lista = new Array();
var id = 0;




function clicFun() {
    constructorUsuario();
    lista.push(usuario);
    listarTabla();
    id = id + 1;
    limpiarCampos();
}


function listarTabla() {
    $("#tablebody").html("");
    var user = user;
    var tr;
    var boton1 = document.createElement('button');
    boton1.setAttribute('class', 'btn btn-primary');
    for (var i = 0; i < lista.length; i++) {
        if (lista[i] !== undefined) {
            tr = "<tr><td>" + lista[i].nombre + "</td><td>" + lista[i].apellido + "</td><td>" + lista[i].telefono + "</td><td>" + boton1;
            $("#tablebody").append(tr);
        }
    }
}
function constructorUsuario() {
    var nombre, apellido, telefono;
    nombre = $('#nombre').val();
    apellido = $('#apellido').val();
    telefono = $('#num').val();
    usuario = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
    };
    return usuario;
}
function editar(id_contacto) {
    var usuario;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].id == id_contacto) {
            usuario = lista[i];
            nombre = this.usuario["nombre"];
            apellido = this.usuario["apellido"];
            telefono = this.usuario["telefono"];
        }
    }
    listarTabla();
}
function eliminarContacto(id_contacto) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i] !== undefined) {
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
