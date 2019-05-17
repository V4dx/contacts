$(document).ready(function () {
    $("#buton").click(botonGuardar);
});

var listaContacto = new Array();
var id = 0;
var _id;

function botonGuardar() {
    
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono = $('#num').val();

    constructorContacto(nombre, apellido, telefono);
    listaContacto.push(contacto);
    listarTabla();
    limpiarCampos();
    id++;
}

function constructorContacto(nombre, apellido, telefono){ //update
    contacto = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
    }
    return contacto;
}

function listarTabla() {
    $("#tablebody").html("");
    var tr;
    for (var i = 0; i < listaContacto.length; i++) {
        if(listaContacto[i]!== undefined){
         tr =   "<tr><td>" + listaContacto[i].nombre 
                + "</td><td>" + listaContacto[i].apellido 
                + "</td><td>" + listaContacto[i].telefono 
                + "</td><td>" + "<button type='button' onclick='eliminarContacto("+ listaContacto[i].id  +")' class='btn btn-danger'><i class='fa fa-trash-o'></i></button>"   
                + "  " + "<button type='button' onclick='editarContacto("+ listaContacto[i].id  +")' class='btn btn-info' data-toggle='modal' data-target='#modalEditar'>Editar</button>";
         $("#tablebody").append(tr);
        }
    }    
}

function editarContacto(obj){
    var contactoTemp =  buscarContacto(obj);
    _id = contactoTemp.id;
    $('#modalNombre').val(contactoTemp.nombre);
    $('#modalApellido').val(contactoTemp.apellido);
    $('#modalNum').val(contactoTemp.telefono);  
}

function eliminarContacto(obj){
    console.log(obj);
    for (var i = 0; i < listaContacto.length; i++) {
        if(listaContacto[i]!== undefined){
            if (listaContacto[i].id == obj){
                listaContacto.splice(i, 1);
            } 
        }
    }
    listarTabla();
}

function guardarEditado(){
    var nombre = $('#modalNombre').val();
    var apellido = $('#modalApellido').val();
    var telefono = $('#modalNum').val();
    contactoEditado = constructorContacto(nombre, apellido, telefono);
    
    for (var i = 0; i < listaContacto.length; i++) {
        if(listaContacto[i]!== undefined){
            if (listaContacto[i].id == _id){
                listaContacto[i] = contactoEditado;
            } 
        }
    }
    listarTabla();
}

function buscarContacto(obj){
    for (var i = 0; i < listaContacto.length; i++) {
        if(listaContacto[i]!== undefined){
            if (listaContacto[i].id == obj){
                contactoTemp = listaContacto[i];
            } 
        }
    }
    return contactoTemp;
}

function limpiarCampos() {
    $('#nombre').val("");
    $('#apellido').val("");
    $('#num').val("");
}

