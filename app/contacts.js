$(document).ready(function () {
    $("#buton").click(clicFun);
});

var lista = new Array();
var id = 0;

function listarTabla() {
    $("#tablebody").html("");
    var tr;
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
         tr =   "<tr><td>" + lista[i].nombre 
                + "</td><td>" + lista[i].apellido 
                + "</td><td>" + lista[i].telefono 
                + "</td><td align='right'>" + "<button type='button'  onclick='editar("+ lista[i].id  +")' class='btn btn-info' data-toggle='modal' data-target='#modalEditar'><i class='fa fa-pencil'></i></button>" 
                + " " 
                + "<button type='button' onclick='eliminarContacto("+ lista[i].id  +")' class='btn btn-danger'><i class='fa fa-trash-o'></i></button></td>";
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
    var domID = 'modalAgregar' ;
    var nom =   $('#nombre').val();
    var ape =   $('#apellido').val();
    var num =   $('#num').val();
    var usu = constructorUsuario("" , nom , ape , num);
    lista.push(usu);
    listarTabla();
    id = id + 1;
    limpiarCampos();
    closeModal(domID);
}

function editar(id){
    limpiarCampos();
    var contacto = buscarContacto(id);
    //console.log(contacto);
    $('#id_editar').val(contacto.id);
    $('#modalNombre').val(contacto.nombre);
    $('#modalApellido').val(contacto.apellido);
    $('#modalNum').val(contacto.telefono);
    
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
    var domID = 'modalEditar' ;
    var id =   $('#id_editar').val();
    var nom =   $('#modalNombre').val();
    var ape =   $('#modalApellido').val();
    var num =   $('#modalNum').val();
    var usu = constructorUsuario(id , nom , ape , num);
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == usu.id){
                lista[i] = usu;
            } 
        }
    }
    limpiarCampos();
    listarTabla();
    closeModal(domID);
}

function closeModal(id) {
    switch (id) {
        case 'modalAgregar': 
            $('#modalAgregar').modal('toggle');
        break;
        
        case 'modalEditar':
            $('#modalEditar').modal('toggle');
        break; 
    }
}

function eliminarContacto(obj){
    for (var i = 0; i < lista.length; i++) {
        if(lista[i]!== undefined){
            if (lista[i].id == obj){
                lista.splice(i, 1);
            } 
        }
    }
    listarTabla();
}

function limpiarCampos() {
    $('#nombre').val("");
    $('#apellido').val("");
    $('#num').val("");
    $('#modalNombre').val("");
    $('#modalApellido').val("");
    $('#modalNum').val("");
    $('#id_editar').val("");
}


