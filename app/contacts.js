$(document).ready(function () {
    $("#buton").click(clicFun);
    $("#butonUpload").click(descargarContactosCsv);
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

function descargarContactosCsv(){
    arrayObjToCsv(lista);
}


function arrayObjToCsv(ar) {
	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "",
			d = new Date(),
			blob,
			reader,
			save,
			clicEvent;
		//creamos contenido del archivo
		for (var i = 0; i < ar.length; i++) {
			//construimos cabecera del csv
			if (i == 0)
				contenido += Object.keys(ar[i]).join(";") + "\n";
			//resto del contenido
			contenido += Object.keys(ar[i]).map(function(key){
							return ar[i][key];
						}).join(";") + "\n";
		}
		//creamos el blob
		blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
		//creamos el reader
		var reader = new FileReader();
		reader.onload = function (event) {
			//escuchamos su evento load y creamos un enlace en dom
			save = document.createElement('a');
			save.href = event.target.result;
			save.target = '_blank';
			//aquí le damos nombre al archivo
			save.download = "log_"+ d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear() +".csv";
			try {
				//creamos un evento click
				clicEvent = new MouseEvent('click', {
					'view': window,
					'bubbles': true,
					'cancelable': true
				});
			} catch (e) {
				//si llega aquí es que probablemente implemente la forma antigua de crear un enlace
				clicEvent = document.createEvent("MouseEvent");
				clicEvent.initEvent('click', true, true);
			}
			//disparamos el evento
			save.dispatchEvent(clicEvent);
			//liberamos el objeto window.URL
			(window.URL || window.webkitURL).revokeObjectURL(save.href);
		}
		//leemos como url
		reader.readAsDataURL(blob);
	}else {
		//el navegador no admite esta opción
		alert("Su navegador no permite esta acción");
	}
};

