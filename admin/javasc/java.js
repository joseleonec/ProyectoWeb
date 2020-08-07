var id_admin = "";
var url_back = "";

$(document).ready(function () {
    console.log("ready!");
    id_admin = user_data();
    url_back = get_url();
    $("#wrapper").toggleClass("toggled");
    var pagina_actual = document.getElementsByClassName('pagina');
    if (pagina_actual[0] !== undefined) {
        switch (pagina_actual[0].getAttribute('id')) {
            case "tabEmpleado":
                CargarMenuAgencias();
                cargarEmpleado();
                break;
            case "cooperativa":
                cargarCooperativa();
                break;
            case "tabDestinos":
                Cargar_Destinos();
                cargarRuta();
                cargarDestino();
                break;
            default:
                break;
        }
    }
});

//Oculta el menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var ID_empleado_editando = 0;
var ID_coop_editando = 0;
var ID_ruta_editando = 0;
var ID_destino_editando = 0;
var alerta_employ = document.getElementById("alerta_employ");
var alerta_coop = document.getElementById("alerta_coop");
var alerta_ruta = document.getElementById("alerta_ruta");
var alerta_destino = document.getElementById("alerta_destino");
var alerta_anuncio = document.getElementById("alerta_anuncio");
var editando_employ = false;
var editando_coop = false;
var editando_ruta = false;
var editando_destino = false;
var btn_guardar_employ = document.getElementById("guardar_empleado");
var btn_guardar_coop = document.getElementById("guardar_cooperativa");
var btn_guardar_ruta = document.getElementById("guardar_ruta");
var btn_guardar_destino = document.getElementById("guardar_destino");

function openInicio() {
    $("#wrapper").toggleClass("toggled");
}

function mostrar_mensaje(mensaje, elemento, tipo_alerta) {
    elemento.innerHTML = `<div class="alert alert-${tipo_alerta} campo" role="alert">
    <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}

function cambiar_texto(band, element) {
    if (band == true) {
        element.setAttribute('value', "Guardar cambios");
    } else {
        element.setAttribute('value', "Ingresar nuevo");
    }
}

function limpiar(card) {
    document.getElementById(card).reset();
}

/*----------------Empleados--------*/

$(document).on('click', '#tab_employ', cargarEmpleado);

$("#guardar_empleado").click(function (e) {
    e.preventDefault();
    let empresa = document.getElementById('menu_agencias').value;
    let nickname = document.getElementById('nickname').value;
    let contra = document.getElementById('password').value;
    let nombre = document.getElementById('nombre_empl').value;
    let apellido = document.getElementById('apellido').value;
    let cedula = document.getElementById('cedula').value;
    let correo = document.getElementById('correo').value;

    // Validacion de campos vacios
    if (empresa === "Agencias" || empresa === "" || nickname === '' || contra === '' || nombre === '' || apellido === '' || cedula === '' || correo === '') {
        return mostrar_mensaje('Campos vacios', alerta_employ, 'danger');
    }
    if (cedula.length > 10) {
        return mostrar_mensaje('Cedula erronea', alerta_employ, 'danger');
    }
    let id_empresa = empresa.split(" ");
    id_empresa = parseInt(id_empresa[0], 10);//10 base decimal
    //Si se esta editando
    if (editando_employ == true) {
        editarEmpleado(id_empresa, nickname, contra, nombre, apellido, cedula, correo);
        return;
    }
    nuevoEmpleado(id_empresa, nickname, contra, nombre, apellido, cedula, correo);
});

$(document).on('click', '.task-delete', eliminarEmpleado);

$(document).on('click', '.task-ver', (e) => {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    let datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    let idPersona = datos[0].innerText;
    //console.log(idPersona);
    ID_empleado_editando = idPersona;
    $('#nickname').val(datos[2].innerText);
    $('#password').val(datos[3].innerText);
    $('#nombre_empl').val(datos[4].innerText);
    $('#apellido').val(datos[5].innerText);
    $('#cedula').val(datos[6].innerText);
    $('#correo').val(datos[7].innerText);
    editando_employ = true;
    cambiar_texto(true, btn_guardar_employ);
    e.preventDefault();
});

//metodo POST
function nuevoEmpleado(id_empresa, nickname, contra, nombre, apellido, cedula, correo) {
    getAgencia(id_empresa);
    if (agencia != "") {
        let data = {
            agencia: agencia, apellido: apellido, cedula: cedula, email: correo,
            nickname: nickname, nombre: nombre, password: contra
        };
        let url = url_back + "empleado";
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data_res) {
            console.log("Respuesta: " + data_res);
            cambiar_texto(false, btn_guardar_employ);
            limpiar("entrada_empleado");
            mostrar_mensaje('Exito', alerta_employ, 'success');
            cargarEmpleado();
        }).catch(function (error) {
            //console.log('Error post: ' + error);
            mostrar_mensaje('No se pudo agregar', alerta_employ, 'danger');
        });
        agencia = "";
    }

}

//metodo PUT
function editarEmpleado(id_empresa, nickname, contra, nombre, apellido, cedula, correo) {
    getAgencia(id_empresa);
    if (agencia != "") {
        let data = {
            agencia: agencia, apellido: apellido, cedula: cedula, email: correo, idEmpleado: ID_empleado_editando,
            nickname: nickname, nombre: nombre, password: contra
        };
        let url = url_back + "empleado";
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data_res) {
            //console.log("Respuesta: " + data_res);
            cambiar_texto(false, btn_guardar_employ);
            limpiar("entrada_empleado");
            editando_employ = false;
            mostrar_mensaje('Se ha modificado', alerta_employ, 'success');
            cargarEmpleado();
        }).catch(function (error) {
            //console.log('Error: ' + error);
            mostrar_mensaje('No se pudo editar', alerta_employ, 'danger');
        });
        agencia = "";
    }
}

//metodo GET
function cargarEmpleado() {
    let url = url_back + "empleado/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = ``;
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.idEmpleado}</td>
            <td>${task.agencia.idAgencia}</td>
            <td>${task.nickname}</td>
            <td>${task.password}</td>
            <td>${task.nombre}</td>
            <td>${task.apellido}</td>
            <td>${task.cedula}</td>
            <td>${task.email}</td>
            <td>
                <button class="task-ver btn btn-secondary">
                    Editar
            </button>
            </td>
            <td>
                <button class="task-delete btn btn-danger">
                    Delete
                </button>
            </td>
            </tr>`
        });
        template += `
            < tr class='noSearch hide' >
                <td colspan="5"></td>
        </tr> `;
        $('#menu-agencias').html(template);
        $('#BodyTablaEmpleado').html(template);
        console.log("Empleados cargados");
    }).catch(err => {
        //console.log(err);
    });
}

function CargarMenuAgencias() {
    let url = url_back + "agencia/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = `<option selected ="" disabled>Agencias</option>`;
        data.forEach(task => {
            template += `<option> ${task.idAgencia} ${task.nombre}</option>`;
        });
        $('#menu_agencias').html(template);
        console.log("Agencias listas");
    }).catch(err => {
        //console.log(err);
    });
}

//metodo DELETE
function eliminarEmpleado() {
    swal({
        title: "¿Seguro que desea eliminar?",
        text: "Este empleado se eliminará",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            //$(this).parent().parent().remove();
            let element = $(this)[0].parentElement.parentElement;
            let id_fila = element.cells[0].innerText;
            let url = url_back + "empleado/" + id_fila;
            fetch(url, {
                method: 'DELETE'
            }).then(() => {
                //console.log('removed');
                element.remove();
                swal("Empleado eliminado", {
                    icon: "success",
                });
            }).catch(err => {
                //console.error(err);
                swal("NO se pudo eliminar", {
                    icon: "error",
                });
            });
        } /*else {
          swal("Your imaginary file is safe!");
        }*/
    });
}

var agencia = "";
function getAgencia(idAgencia) {
    let url = url_back + "agencia/" + idAgencia;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        agencia = data;
    }).catch(err => {
        //console.log(err);
    });
}

/*--------------- Cooperativas----*/

$("#guardar_cooperativa").click(function (e) {
    e.preventDefault();
    let name_coop = document.getElementById('nombre_coop').value;
    let email_coop = document.getElementById('email_coop').value;
    let ruc_coop = document.getElementById('ruc_coop').value;
    // Validacion de campos vacios
    if (name_coop === '' || email_coop === '' || ruc_coop === '') {
        return mostrar_mensaje('Campos vacios', alerta_coop, 'danger');
    }
    if (editando_coop == true) { //se esta editando
        editarCooperativa(name_coop, email_coop, ruc_coop);
        return;
    }
    nuevoCooperativa(name_coop, email_coop, ruc_coop);
});

$(document).on('click', '.coop-editar', function (e) {
    let datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_coop_editando = datos[0].innerText;
    $('#nombre_coop').val(datos[1].innerText);
    $('#email_coop').val(datos[2].innerText);
    $('#ruc_coop').val(datos[3].innerText);
    editando_coop = true;
    cambiar_texto(true, btn_guardar_coop);
});

$(document).on('click', '.coop-delete', eliminarCooperativa);

$(document).on('click', '#coop-buscar', function (e) {
    let valor = document.getElementById("txt_buscar_comentarios").value;
    if (valor != "") {
        buscarComentarios(valor);
    }
});

$(document).on('click', '.comentario-delete', eliminarComentario);

function buscarComentarios(idCooperativa) {
    let url = url_back + "comentario/idagencia=" + idCooperativa;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        let nombre;
        data.forEach(task => {
            nombre = task.agencia.nombre;
            template += `<div class="card">
            <div class="card-body" value="${task.idComentario}">
                <h5 class="card-title">${task.usuario.nombre}</h5>
                <p><strong>Email: </strong>${task.usuario.email}</p>
                <p><strong>Calificacion: </strong>${task.calificacion}/5</p>
                <p class="card-text">${task.comentario}</p>
                <button type="button" class="comentario-delete btn btn-danger">Eliminar</button>
            </div >
            </div > `;
        });
        let aux = `<div class="card"><div class="card-body"><h5 class="card-title">${nombre}</h5>
            </div></div>`;
        template = aux + template;
        console.log("Comentarios cargados");
        $('#contenedor_comentarios').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

function eliminarComentario() {
    swal({
        title: "¿Seguro que desea eliminar?",
        text: "Este comentario se eliminará",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            //$(this).parent().parent().remove();
            let element = $(this)[0].parentElement.parentElement;
            let idComentario = $(this).parent().attr('value');
            //console.log(idComentario);
            let url = url_back + "comentario/" + idComentario;
            fetch(url, {
                method: 'DELETE'
            }).then(() => {
                //console.log('removed');
                element.remove();
                swal("Comentario eliminado", {
                    icon: "success",
                });
            }).catch(err => {
                //console.log(err);
                swal("NO se pudo eliminar", {
                    icon: "error",
                });
            });
        } /*else {
          swal("Your imaginary file is safe!");
        }*/
    });
}

//metodo GET
function cargarCooperativa() {
    let url = url_back + "agencia/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.idAgencia}</td>
            <td>${task.nombre}</td>
            <td>${task.email}</td>
            <td>${task.ruc}</td>
            <td>
                <button class="coop-editar btn btn-secondary">
                    Editar
                </button>
            </td>
            <td>
                <button class="coop-delete btn btn-danger">
                    Delete
                </button>
            </td>
            </tr>`
        });
        //document.getElementById("bodyTableCoop").innerHTML = template;
        $('#bodyTableCoop').html(template);
        console.log("Cooperativas cargadas");
    }).catch(err => {
        //console.log(err);
    });
}

//metodo POST
function nuevoCooperativa(name_coop, email_coop, ruc_coop) {
    let data = { email: email_coop, nombre: name_coop, ruc: ruc_coop };
    let url = url_back + "agencia";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        //console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_coop);
        limpiar("entrada_coop");
        mostrar_mensaje('Exito', alerta_coop, 'success');
        cargarCooperativa();
    }).catch(function (error) {
        //console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo agregar', alerta_coop, 'danger');
    });
}

//metodo PUT
function editarCooperativa(name_coop, email_coop, ruc_coop) {
    let data = { email: email_coop, idAgencia: ID_coop_editando, nombre: name_coop, ruc: ruc_coop };
    let url = url_back + "agencia";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        //console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_coop);
        limpiar("entrada_coop");
        editando_coop = false;
        mostrar_mensaje('Se ha modificado', alerta_coop, 'success');
        cargarCooperativa();
    }).catch(function (error) {
        //console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta_coop, 'danger');
    });
}

//metodo DELETE
function eliminarCooperativa() {
    swal({
        title: "¿Seguro que desea eliminar?",
        text: "Esta cooperativa se eliminará",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            //$(this).parent().parent().remove();
            let element = $(this)[0].parentElement.parentElement;
            let id_fila = element.cells[0].innerText;
            let url = url_back + "agencia/" + id_fila;
            fetch(url, {
                method: 'DELETE'
            }).then(() => {
                //console.log('removed');
                element.remove();
                swal("Cooperativa eliminada", {
                    icon: "success",
                });
            }).catch(err => {
                //console.error(err);
                swal("NO se pudo eliminar", {
                    icon: "error",
                });
            });
        } /*else {
          swal("Your imaginary file is safe!");
        }*/
    });
}

/*----------------Viajes---------*/

function Cargar_Destinos() {
    let url = url_back + "ubicacion/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '<option selected ="" disabled>Destinos</option>';
        data.forEach(task => {
            template +=
                `<option>${task.idUbicacion} ${task.nombre}</option>`;
        });
        $('#menu_destinos').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

$("#guardar_ruta").click(function (e) {
    e.preventDefault();
    //let agencia = document.getElementById('menu_agencias').value;
    let origen = document.getElementById('origen').value;
    let destino = document.getElementById('menu_destinos').value;
    let ruta = document.getElementById('ruta_a').value;
    // Validacion de campos vacios
    if (origen === '' || ruta === '' || destino === "Destinos" || destino === "") {
        return mostrar_mensaje('Campos vacios', alerta_ruta, 'danger');
    }
    let id_destino = destino.split(" ");
    id_destino = parseInt(id_destino[0], 10);//10 base decimal
    if (id_destino == 1) {
        return mostrar_mensaje('Cambie el destino', alerta_ruta, 'danger');
    }
    if (editando_ruta == true) { //se esta editando
        editarRuta(origen, id_destino, ruta);
        return;
    }
    nuevoRuta(origen, id_destino, ruta);
});

$(document).on('click', '.ruta-editar', function (e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_ruta_editando = datos[0].innerText;
    $('#origen').val(datos[2].innerText);
    $('#ruta_a').val(datos[3].innerText);
    editando_ruta = true;
    cambiar_texto(true, btn_guardar_ruta);
    e.preventDefault();
});

$(document).on('click', '.ruta-delete', eliminarRuta);

//metodo GET
function cargarRuta() {
    let url = url_back + "viaje/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.idViaje}</td>
            <td>${task.origen}</td>
            <td>${task.destino.nombre}</td>
            <td>${task.nombreRuta}</td>
            <td>
                <button class="ruta-editar btn btn-secondary">
                    Editar
            </button>
            </td>
            <td>
                <button class="ruta-delete btn btn-danger">
                    Delete
                </button>
            </td>
            </tr>`
        });
        console.log("listo");
        $('#BodyTableRutas').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

//metodo POST
function nuevoRuta(origen, id_destino, ruta) {
    getDestino(id_destino);
    if (destino != "") {
        let data = { destino: destino, nombreRuta: ruta, origen: "Cuenca" };
        let url = url_back + "viaje";
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data_res) {
            //console.log("Respuesta: " + data_res);
            cambiar_texto(false, btn_guardar_ruta);
            limpiar("entrada_ruta");
            mostrar_mensaje('Exito', alerta_ruta, 'success');
            cargarRuta();
        }).catch(function (error) {
            //console.log('Error post: ' + error);
            mostrar_mensaje('No se pudo agregar', alerta_ruta, 'danger');
        });
        destino = "";
    }

}

//metodo PUT
function editarRuta(origen, id_destino, ruta) {
    getDestino(id_destino);
    if (destino != "") {
        let data = { destino: destino, idViaje: ID_ruta_editando, nombreRuta: ruta, origen: "Cuenca" };
        let url = url_back + "viaje";
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data_res) {
            //console.log("Respuesta: " + data_res);
            cambiar_texto(false, btn_guardar_ruta);
            limpiar("entrada_ruta");
            editando_ruta = false;
            mostrar_mensaje('Se ha modificado', alerta_ruta, 'success');
            cargarRuta();
        }).catch(function (error) {
            //console.log('Error Id carrito: ' + error);
            mostrar_mensaje('No se pudo editar', alerta_ruta, 'danger');
        });
        destino = "";
    }
}

//metodo DELETE
function eliminarRuta() {
    swal({
        title: "¿Seguro que desea eliminar?",
        text: "Este viaje se eliminará",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            //$(this).parent().parent().remove();
            let element = $(this)[0].parentElement.parentElement;
            let id_fila = element.cells[0].innerText;
            let url = url_back + "viaje/" + id_fila;
            fetch(url, {
                method: 'DELETE'
            }).then(() => {
                //console.log('removed');
                element.remove();
                swal("Viaje eliminado", {
                    icon: "success",
                });
            }).catch(err => {
                //console.error(err);
                swal("NO se pudo eliminar", {
                    icon: "error",
                });
            });
        } /*else {
          swal("Your imaginary file is safe!");
        }*/
    });
}

var destino = "";
function getDestino(idDestino) {
    let url = url_back + "ubicacion/" + idDestino;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        destino = data;
    }).catch(err => {
        //console.log(err);
    });
}

/*------------------Destinos---------------------*/

$("#guardar_destino").click(function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let latitud = document.getElementById('latitud').value;
    let longitud = document.getElementById('longitud').value;
    // Validacion de campos vacios
    if (nombre === '' || latitud === '' || longitud === '') {
        return mostrar_mensaje('Campos vacios', alerta_destino, 'danger');
    }
    if (editando_destino == true) { //se esta editando
        editarDestino(nombre, latitud, longitud);
        return;
    }
    nuevoDestino(nombre, latitud, longitud);
});

$(document).on('click', '.destino-editar', function (e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_destino_editando = datos[0].innerText;
    $('#nombre').val(datos[1].innerText);
    $('#latitud').val(datos[2].innerText);
    $('#longitud').val(datos[3].innerText);
    editando_destino = true;
    cambiar_texto(true, btn_guardar_destino);
    e.preventDefault();
});

$(document).on('click', '.destino-delete', eliminarDestino);

//metodo GET
function cargarDestino() {
    let url = url_back + "ubicacion/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.idUbicacion}</td>
            <td>${task.nombre}</td>
            <td>${task.latitud}</td>
            <td>${task.longitud}</td>
            <td>
                <button class="destino-editar btn btn-secondary">
                    Editar
            </button>
            </td>
            <td>
                <button class="destino-delete btn btn-danger">
                    Delete
                </button>
            </td>
            </tr>`
        });
        console.log("Destinos cargados");
        $('#BodyTableDestino').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

//metodo POST
function nuevoDestino(nombre, latitud, longitud) {
    let data = {
        latitud: latitud, longitud: longitud,
        nombre: nombre
    };
    let url = url_back + "ubicacion";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        //console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_destino);
        limpiar("entrada_destino");
        mostrar_mensaje('Exito', alerta_destino, 'success');
        cargarDestino();
    }).catch(function (error) {
        //console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo agregar', alerta_destino, 'danger');
    });
}

//metodo PUT
function editarDestino(nombre, latitud, longitud) {
    let data = {
        idUbicacion: ID_destino_editando, latitud: latitud, longitud: longitud,
        nombre: nombre
    };
    let url = url_back + "ubicacion";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        //console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_destino);
        limpiar("entrada_destino");
        editando_destino = false;
        mostrar_mensaje('Se ha modificado', alerta_destino, 'success');
        cargarDestino();
    }).catch(function (error) {
        //console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta_destino, 'danger');
    });
}

//metodo DELETE
function eliminarDestino() {
    swal({
        title: "¿Seguro que desea eliminar?",
        text: "Este destino se eliminará",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            //$(this).parent().parent().remove();
            let element = $(this)[0].parentElement.parentElement;
            let id_fila = element.cells[0].innerText;
            let url = url_back + "ubicacion/" + id_fila;
            fetch(url, {
                method: 'DELETE'
            }).then(() => {
                //console.log('removed');
                element.remove();
                swal("Destino eliminado", {
                    icon: "success",
                });
            }).catch(err => {
                //console.error(err);
                swal("NO se pudo eliminar", {
                    icon: "error",
                });
            });
        } /*else {
          swal("Your imaginary file is safe!");
        }*/
    });
}

/*----------------Anuncios-----------------------*/

$("#guardar_anuncio").click(function (e) {
    e.preventDefault();
    let categoria = document.getElementById('menu_categorias').value;
    let nombreSitio = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let link = document.getElementById('url').value;
    // Validacion de campos vacios
    if (categoria === '' || nombreSitio === '' || descripcion === '' || link === '') {
        return mostrar_mensaje('Campos vacios', alerta_anuncio, 'danger');
    }
    switch (categoria) {
        case "Taxis": guardarAnuncio(1, "Taxis", nombreSitio, descripcion, link);
            break;
        case "Hoteles": guardarAnuncio(2, "Hoteles", nombreSitio, descripcion, link);
            break;
        case "Restaurantes": guardarAnuncio(3, "Restaurantes", nombreSitio, descripcion, link);
            break;
        default:
            break;
    }
});

//Metodo action al cambiar el combox
function cambioCategoria() {
    let categoria = document.getElementById('menu_categorias').value;
    switch (categoria) {
        case "Taxis":
            cargarCategoria("1");
            break;
        case "Hoteles":
            cargarCategoria("2");
            break;
        case "Restaurantes":
            cargarCategoria("3");
            break;
        default:
            break;
    }
}

//Metodo GET
function cargarCategoria(idServicio) {
    let url = url_back + "servicio/" + idServicio;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let datos = [data];
        datos.forEach(task => {
            document.getElementById("titulo").setAttribute("value", `${task.nombreSitio}`);
            document.getElementById("descripcion").innerHTML = `${task.descripcion}`;
            document.getElementById("url").setAttribute("value", `${task.url}`);
        });
        //console.log("Categoria cargada");
    }).catch(err => {
        //console.log(err);
    });
}

//metodo PUT
function guardarAnuncio(id, categoria, nombreSitio, descripcion, link) {
    let data = {
        idServicio: id, nombreSitio: nombreSitio, descripcion: descripcion, url: link
        , categoria: { idCategoria: id, nombre: categoria }
    };
    let url = url_back + "servicio";
    fetch(url, {
        method: 'PUT', // 'POST' or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        //console.log("Respuesta: " + data_res);
        mostrar_mensaje(' Exito ', alerta_anuncio, 'success');
    }).catch(function (error) {
        //console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo guardar', alerta_anuncio, 'danger');
    });
}

function processFiles(files) {
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        // Cuando éste evento se dispara, los datos están ya disponibles.
        // Se trata de copiarlos a una área <div> en la página.
        let output = document.getElementById("fileOutput");
        output.style.backgroundImage = "url('" + e.target.result + "')";
    };
    reader.readAsDataURL(file);
}

/*---------------------------------------*/

/* Busquedas de las tablas */
/* La busqueda se realizan al ingresar texto en el input*/

function doSearch() {
    const tableReg = document.getElementById('tablaEmpleado');
    const searchText = document.getElementById('txt_buscar').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}
