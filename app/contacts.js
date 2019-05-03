$(document).ready(function () {
    $("#buton").click(clicFun);
});

var lista = new Array();
var id = 0;
var listaJson;




function listarTabla() {
    $("#tablebody").html("");
    var tr;
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
         tr =   "<tr><td>" + lista[i].nombre 
                + "</td><td>" + lista[i].apellido 
                + "</td><td>" + lista[i].telefono 
                + "</td><td>" + "<button type='button' onclick='eliminarContacto("+ lista[i].id  +")' class='btn btn-danger'>Borrar</button>" 
                + "  " +"<button type='button'  onclick='editar("+ lista[i].id  +")' class='btn btn-info' data-toggle='modal' data-target='#exampleModalCenter'>Editar</button>";
         $("#tablebody").append(tr);
        }
    }    
}

function constructorUsuario(_id , nombre, apellido, telefono){
    //esta es la forma que me doy cuenta si creo un objetos usuario nuevo o vamos a editar uno existen;
    if(_id == '') {
        _id = id; 
    }
    var usuario = {
        id: _id,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
    }
    return usuario;
}

function clicFun() {
    var nom =   $('#nombre').val();
    var ape =   $('#apellido').val();
    var num =   $('#num').val();
    var usu = constructorUsuario("" , nom , ape , num);
    lista.push(usu);
    listarTabla();
    id = id + 1;
    limpiarCampos();
}

function editar(id){
    limpiarCampos();
    var contacto = buscarContacto(id);
    //console.log(contacto);
    $('#id_editar').val(contacto.id);
    $('#nombreE').val(contacto.nombre);
    $('#apellidoE').val(contacto.apellido);
    $('#numE').val(contacto.telefono);
    
}

function buscarContacto(idContacto){
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == idContacto){
                return lista[i]
            } 
        }
    }
    return "";
}

function guardarEdicion(){    
    var id =   $('#id_editar').val();
    var nom =   $('#nombreE').val();
    var ape =   $('#apellidoE').val();
    var num =   $('#numE').val();
    var usu = constructorUsuario(id , nom , ape , num);
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == usu.id){
                lista[i] = usu;
            } 
        }
    }
    limpiarCampos();
    this.close();
    listarTabla();
}

function eliminarContacto(obj){
    console.log(obj);
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == obj){
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
    $('#nombreE').val("");
    $('#apellidoE').val("");
    $('#numE').val("");
    $('#id_editar').val("");
}


