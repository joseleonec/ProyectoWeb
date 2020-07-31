$(document).ready(function () {
    console.log("ready!");
    $("#wrapper").toggleClass("toggled");
    var pagina_actual = document.getElementsByClassName('pagina');
    if (pagina_actual[0] !== undefined) {
        switch (pagina_actual[0].getAttribute('id')) {
            case "tabEmpleado":
                cargarEmpleado();
                break;
            case "cooperativa":
                cargarCooperativa();
                break;
            case "Restaurantes":
                alert("restaurante");
                break;
            default:
                break;
        }
    }
    /* var pg_coop = document.getElementById("cooperativa");
    if (pg_coop != null) {
        cargarCooperativa();
    }
    var pg_empleados = document.getElementById("tabEmpleado");
    if (pg_empleados != null) {
        cargarEmpleado();
    } */
});

//Oculta el menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var ID_cliente_editando = 0;
var ID_coop_editando = 0;
var ID_ruta_editando = 0;
var alerta = document.getElementById("alerta_employ");
var alerta_coop = document.getElementById("alerta_coop");
var alerta_ruta = document.getElementById("alerta_ruta");
var alerta_destino = document.getElementById("alerta_destino");
var alerta_anuncio = document.getElementById("alerta_anuncio");
var btn_guardar = document.getElementById("guardar_empleado");
var btn_guardar_coop = document.getElementById("guardar_cooperativa");
var btn_guardar_ruta = document.getElementById("guardar_ruta");
var editando = false;
var editando_coop = false;
var editando_ruta = false;

var url_clientes = "https://cryptic-beach-67438.herokuapp.com/";
var url_clientes_ip = "http://cryptic-beach-67438.herokuapp.com/api/listar";
var url_carrito = "https://cryptic-beach-67438.herokuapp.com/interfaz";
var url_facturas = "https://facturacionapp9.herokuapp.com/api/";
var url_solicitudes = "https://springtest999.herokuapp.com/api/solicituddevolucion/";
var url_cooperativas = "https://terminal25backend.herokuapp.com/";

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
$(document).on('click', '#tab_clientes', cargarEmpleado);//carga los datos de clientes

$("#guardar_empleado").click(function (e) {
    e.preventDefault();
    let empresa = document.getElementById('agencias').value;
    let nickname = document.getElementById('nickname').value;
    let contra = document.getElementById('password').value;
    let nombre = document.getElementById('nombre_empl').value;
    let apellido = document.getElementById('apellido').value;
    let cedula = document.getElementById('cedula').value;
    let correo = document.getElementById('correo').value;

    // Validacion de campos vacios
    if (empresa === "Agencias" || nickname === '' || contra === '' || nombre === '' || apellido === '' || cedula === '' || correo === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    }
    if (cedula.length > 10) {
        return mostrar_mensaje('Cedula erronea', alerta, 'danger');
    }
    var id_empresa = empresa.split(" ");
    id_empresa = parseInt(id_empresa[0], 10);//10 base decimal
    //Si se esta editando
    if (editando == true) {
        editarEmpleado(id_empresa, nickname, contra, nombre, apellido, cedula, correo);
        return;
    }
    nuevoEmpleado(id_empresa, nickname, contra, nombre, apellido, cedula, correo);
});

$(document).on('click', '.task-delete', eliminarEmpleado);

$(document).on('click', '.task-ver', (e) => {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    const idPersona = datos[0].innerText;
    console.log(idPersona);
    ID_cliente_editando = idPersona;
    $('#nickname').val(datos[2].innerText);
    $('#password').val(datos[3].innerText);
    $('#nombre_empl').val(datos[4].innerText);
    $('#apellido').val(datos[5].innerText);
    $('#cedula').val(datos[6].innerText);
    $('#correo').val(datos[7].innerText);
    editando = true;
    cambiar_texto(true, btn_guardar);
    e.preventDefault();
});

/*--------------- Cooperativas----*/

$("#guardar_cooperativa").click(function (e) {
    e.preventDefault();
    let name = document.getElementById('nombre_coop');
    let buses = document.getElementById('email_coop');
    let estado = document.getElementById('ruc_coop');
    // Validacion de campos vacios
    if (name.value === '' || buses.value === '' || estado.value === '') {
        return mostrar_mensaje('Campos vacios', alerta_coop, 'danger');
    }
    if (editando_coop == true) { //se esta editando
        editarCooperativa(name.value, buses.value, estado.value);
        return;
    }
    nuevoCooperativa(name.value, buses.value, estado.value);
});

$(document).on('click', '.coop-editar', function (e) {
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_cliente_editando = datos[0].innerText;
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
    let url = url_cooperativas + "comentario/idagencia=" + idCooperativa;
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
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = $(this).parent().attr('value');
        console.log(id_fila);
        element.remove();
        /* let url = url_clientes + "/cliente?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        }); */
    }
}

//metodo GET
function cargarCooperativa() {
    let url = url_cooperativas + "agencia/listar";
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
        console.log(err);
    });
}

//metodo POST
function nuevoCooperativa(nombre, buses, estado) {
    var data = { name: nombre, buses: buses, state: estado };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_coop);
        limpiar("entrada_coop");
        mostrar_mensaje('Exito', alerta_coop, 'success');
        cargarCooperativa();
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo agregar', alerta_coop, 'danger');
    });
}

//metodo PUT
function editarCooperativa(nombre, buses, estado) {
    var data = { id: ID_coop_editando, name: nombre, buses: buses, state: estado };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_coop);
        limpiar("entrada_coop");
        editando_coop = false;
        mostrar_mensaje('Se ha modificado', alerta_coop, 'success');
        cargarCooperativa();
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta_coop, 'danger');
    });
}

//metodo DELETE
function eliminarCooperativa() {
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = element.cells[0].innerText;
        element.remove();
        /* let url = url_clientes + "/cliente?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        }); */
    }
}

/*----------------Empleados--------*/
//metodo POST
function nuevoEmpleado(nombre, apellido, cedula, correo, contra, empresa) {
    var data = { name: usuario, email: correo, password: contraseña, phone: telefono, saldo: saldo, state: estado, id_carrito: idCarrito };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar);
        limpiar("entrada_empleado");
        mostrar_mensaje('Exito', alerta, 'success');
        cargarEmpleado();
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo agregar', alerta, 'danger');
    });
}

//metodo PUT
function editarEmpleado(nombre, apellido, cedula, correo, contra, empresa) {
    var data = { id: ID_cliente_editando, name: usuario, email: correo, password: contraseña, phone: telefono, state: estado };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar);
        limpiar("entrada_empleado");
        editando = false;
        mostrar_mensaje('Se ha modificado', alerta, 'success');
        cargarEmpleado();
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta, 'danger');
    });
}

//metodo GET
function cargarEmpleado() {
    let url = url_cooperativas + "empleado/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
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
        </tr> `
        $('#BodyTablaEmpleado').html(template);
        console.log("Empleados cargados");
    }).catch(err => {
        console.log(err);
    });
}

//metodo DELETE
function eliminarEmpleado() {
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = element.cells[0].innerText;
        let url = url_clientes + "/cliente?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        });
    }
}

/*----------------RUTAS---------*/
function Cargar_Agencias() {
    let url = url_parroquias;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        Parroquias_json = data;
        let template = '<option selected ="" disabled>Agencias</option>';
        data.forEach(task => {
            template +=
                `< option > ${task.idParroquia} ${task.nombreParroquia}</option > `;
        });
        $('#menu_parroquias').html(template);
    }).catch(err => {
        console.log(err);
    });
}

function Cargar_Destinos() {
    let url = url_parroquias;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        Parroquias_json = data;
        let template = '<option selected ="" disabled>Destino</option>';
        data.forEach(task => {
            template +=
                `< option > ${task.idParroquia} ${task.nombreParroquia}</option > `;
        });
        $('#menu_parroquias').html(template);
    }).catch(err => {
        console.log(err);
    });
}

$("#guardar_ruta").click(function (e) {
    e.preventDefault();
    let agencia = document.getElementById('menu_agencias').value;
    let origen = document.getElementById('origen');
    let destino = document.getElementById('menu_destinos').value;
    let ruta = document.getElementById('ruta_a');
    // Validacion de campos vacios
    if (agencia === "Agencias" || origen.value === '' || destino === "Destinos" || ruta.value === '') {
        return mostrar_mensaje('Campos vacios', alerta_ruta, 'danger');
    }
    var id_agencia = agencia.split(" ");
    id_agencia = parseInt(id_agencia[0], 10);//10 base decimal
    var id_destino = destino.split(" ");
    id_destino = parseInt(id_destino[0], 10);
    if (editando_ruta == true) { //se esta editando
        editarRuta(id_agencia, origen.value, id_destino, ruta.value);
        return;
    }
    nuevoRuta(id_agencia, origen.value, id_destino, ruta.value);
});


$(".ruta-editar").click(function (e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_ruta_editando = datos[0].innerText;
    $('#origen').val(datos[2].innerText);
    $('#ruta_a').val(datos[4].innerText);
    editando_ruta = true;
    cambiar_texto(true, btn_guardar_ruta);
    e.preventDefault();
});

$(document).on('click', '.ruta-delete', eliminarRuta);

//metodo POST
function nuevoRuta(id_agencia, orige, id_destino, ruta) {
    var data = { origen: origen, destino: destino, empresa: empresa };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_ruta);
        limpiar("entrada_ruta");
        mostrar_mensaje('Exito', alerta_ruta, 'success');
        cargarRuta();
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo agregar', alerta_ruta, 'danger');
    });
}

//metodo PUT
function editarRuta(id_agencia, origen, id_destino, ruta) {
    var data = { id: ID_coop_editando, name: nombre, buses: buses, state: estado };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_ruta);
        limpiar("entrada_ruta");
        editando_ruta = false;
        mostrar_mensaje('Se ha modificado', alerta_ruta, 'success');
        cargarRuta();
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta_ruta, 'danger');
    });
}

//metodo GET
function cargarRuta() {
    let url = url_clientes + "cliente/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `< tr >
            <td>${task.id}</td>
            <td>${task.origen}</td>
            <td>${task.destino}</td>
            <td>${task.empresa}</td>
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
            </tr > `
        });
        template += `
            < tr class='noSearch hide' >
                <td colspan="5"></td>
        </tr > `
        console.log("listo");
        $('#BodyTableRutas').html(template);
    }).catch(err => {
        console.log(err);
    });
}

//metodo DELETE
function eliminarRuta() {
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = element.cells[0].innerText;
        element.remove();
        /* let url = url_clientes + "/cliente?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        }); */
    }
}


/*------------------Destinos---------------------*/

$("#guardar_destino").click(function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre');
    let latitud = document.getElementById('latitud');
    let longitud = document.getElementById('longitud');
    // Validacion de campos vacios
    if (nombre.value === '' || latitud.value === '' || longitud.value === '') {
        return mostrar_mensaje('Campos vacios', alerta_destino, 'danger');
    }
    if (editando_ruta == true) { //se esta editando
        editarRuta(nombre.value, latitud.value, longitud.value);
        return;
    }
    nuevoRuta(nombre.value, latitud.value, longitud.value);
});


$(".destino-editar").click(function (e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_cliente_editando = datos[0].innerText;
    $('#nombre').val(datos[1].innerText);
    $('#latitud').val(datos[2].innerText);
    $('#longitud').val(datos[3].innerText);
    editando_ruta = true;
    cambiar_texto(true, btn_guardar_ruta);
    e.preventDefault();
});

$(document).on('click', '.destino-delete', eliminarRuta);

//metodo POST
function nuevoRuta(origen, destino, empresa) {
    var data = { origen: origen, destino: destino, empresa: empresa };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_ruta);
        limpiar("entrada_ruta");
        mostrar_mensaje('Exito', alerta_ruta, 'success');
        cargarRuta();
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo agregar', alerta_ruta, 'danger');
    });
}

//metodo PUT
function editarRuta(nombre, buses, estado) {
    var data = { id: ID_coop_editando, name: nombre, buses: buses, state: estado };
    let url = url_clientes + "/cliente";
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        cambiar_texto(false, btn_guardar_ruta);
        limpiar("entrada_ruta");
        editando_ruta = false;
        mostrar_mensaje('Se ha modificado', alerta_ruta, 'success');
        cargarRuta();
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
        mostrar_mensaje('No se pudo editar', alerta_ruta, 'danger');
    });
}

//metodo GET
function cargarRuta() {
    let url = url_clientes + "cliente/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `< tr >
            <td>${task.id}</td>
            <td>${task.origen}</td>
            <td>${task.destino}</td>
            <td>${task.empresa}</td>
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
            </tr > `
        });
        template += `
            < tr class='noSearch hide' >
                <td colspan="5"></td>
        </tr > `
        console.log("listo");
        $('#BodyTableRutas').html(template);
    }).catch(err => {
        console.log(err);
    });
}

//metodo DELETE
function eliminarRuta() {
    if (confirm('Seguro que desea eliminar?')) {
        //$(this).parent().parent().remove();
        let element = $(this)[0].parentElement.parentElement;
        let id_fila = element.cells[0].innerText;
        element.remove();
        /* let url = url_clientes + "/cliente?id=" + id_fila;
        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            element.remove();
        }).catch(err => {
            console.error(err)
        }); */
    }
}


/*----------------Anuncios-----------------------*/

$("#guardar_anuncio").click(function (e) {
    e.preventDefault();
    let categoria = document.getElementById('menu_categorias').value;
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let url = document.getElementById('url').value;
    // Validacion de campos vacios
    if (categoria === '' || titulo === '' || descripcion === '' || url === '') {
        return mostrar_mensaje('Campos vacios', alerta_anuncio, 'danger');
    }
    switch (categoria) {
        case "Taxis":
            alert("taxi");
            break;
        case "Hoteles":
            alert("hotel");
            break;
        case "Restaurantes":
            alert("restaurante");
            break;
        default:
            break;
    }
});


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
/*---Busquedas de las tablas */
/*La busqueda se realizan al ingresar texto en el input*/

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
