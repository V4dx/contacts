$(document).ready(function () {
    $("#buton").click(clicFun);
});

var lista = new Array();
var id = 0;
var listaJson;

function clicFun() {
    constructorUsuario();
    lista.push(usuario);
    listarTabla();
    id = id + 1;
    limpiarCampos();
}


function listarTabla() {
    $("#tablebody").html("");
    var button2 = "<button type='button' class='btn btn-info' data-toggle='modal' data-target='#exampleModalCenter'>Editar</button>"
    var tr;
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
         tr =   "<tr><td>" + lista[i].nombre 
                + "</td><td>" + lista[i].apellido 
                + "</td><td>" + lista[i].telefono 
                + "</td><td>" + "<button type='button' onclick='eliminarContacto("+ this.id  +")' class='btn btn-danger'>Borrar</button>"; 
                + "  " + button2;
         $("#tablebody").append(tr);
        }
    }    
}

function constructorUsuario(){
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
    return usuario;
}

function editar(id_contacto){
    listaJson = JSON.stringify(lista);
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

function eliminarContacto(obj){
    console.log(obj);
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == obj);{
                lista.splice(i, 1);
            } 
        }
    }
    console.log(obj);
    listarTabla();
}

function limpiarCampos() {
    $('#nombre').val("");
    $('#apellido').val("");
    $('#num').val("");
}

