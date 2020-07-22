$(document).ready(function () {
    console.log("ready!");
    $("#wrapper").toggleClass("toggled");
    var pg_clientes = document.getElementById("tabEmploy");
    if (pg_clientes != null) {
        //cargarClientes();
    }
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
var url_cliente_no = "https://cryptic-beach-67438.herokuapp.com/api";

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
    let url = url_clientes + "cliente/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.email}</td>
            <td>${task.password}</td>
            <td>${task.phone}</td>
            <td>${task.saldo}</td>
            <td>${task.state}</td>
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
        <tr class='noSearch hide'>
            <td colspan="5"></td>
        </tr>`
        console.log("listo");
        $('#BodyTablaEmpleado').html(template);
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

/*----Empleados----*/
$(document).on('click', '#tab_clientes', cargarEmpleado);//carga los datos de clientes

$("#guardar_empleado").click(function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre_empl');
    let apellido = document.getElementById('apellido');
    let cedula = document.getElementById('cedula');
    let correo = document.getElementById('correo');
    let contra = document.getElementById('password');
    let empresa = document.getElementById('empresa_empl');

    // Validacion de campos vacios
    if (nombre.value === '' || apellido.value === '' || cedula.value === '' || correo.value === '' || contra.value === '' || empresa.value === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    }
    if (cedula.value.length > 10) {
        return mostrar_mensaje('Cedula erronea', alerta, 'danger');
    }
    //Si se esta editando
    if (editando == true) {
        editarEmpleado(nombre.value, apellido.value, cedula.value, correo.value, contra.value, empresa.value);
        return;
    }
    nuevoEmpleado(nombre.value, apellido.value, cedula.value, correo.value, contra.value, empresa.value);
});

$(document).on('click', '.task-delete', eliminarEmpleado);

$(document).on('click', '.task-ver', (e) => {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    const idPersona = datos[0].innerText;
    console.log(idPersona);
    ID_cliente_editando = idPersona;
    $('#nombre_empl').val(datos[1].innerText);
    $('#apellido').val(datos[2].innerText);
    $('#cedula').val(datos[3].innerText);
    $('#correo').val(datos[4].innerText);
    $('#password').val(datos[5].innerText);
    $('#empresa_empl').val(datos[6].innerText);
    editando = true;
    cambiar_texto(true, btn_guardar);
    e.preventDefault();
});

/*---- Cooperativas----*/

$("#guardar_cooperativa").click(function (e) {
    e.preventDefault();
    let name = document.getElementById('nombre_coop');
    let buses = document.getElementById('buses_coop');
    let estado = document.getElementById('estado_coop');
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

$(".coop-editar").click(function (e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_cliente_editando = datos[0].innerText;
    $('#nombre_coop').val(datos[1].innerText);
    $('#buses_coop').val(datos[2].innerText);
    $('#estado_coop').val(datos[3].innerText);
    editando_coop = true;
    cambiar_texto(true, btn_guardar_coop);
    e.preventDefault();
});

$(document).on('click', '.coop-delete', eliminarCooperativa);

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

//metodo GET
function cargarCooperativa() {
    let url = url_clientes + "cliente/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.buses}</td>
            <td>${task.state}</td>
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
        template += `
        <tr class='noSearch hide'>
            <td colspan="5"></td>
        </tr>`
        console.log("listo");
        $('#bodyTableCoop').html(template);
    }).catch(err => {
        console.log(err);
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

/*---------RUTAS---------*/

$("#guardar_ruta").click(function (e) {
    e.preventDefault();
    let origen = document.getElementById('origen');
    let destino = document.getElementById('destino');
    let empresa = document.getElementById('empresa');
    // Validacion de campos vacios
    if (origen.value === '' || destino.value === '' || empresa.value === '') {
        return mostrar_mensaje('Campos vacios', alerta_ruta, 'danger');
    }
    if (editando_ruta == true) { //se esta editando
        editarRuta(origen.value, destino.value, empresa.value);
        return;
    }
    nuevoRuta(origen.value, destino.value, empresa.value);
});


$(".ruta-editar").click(function (e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    ID_cliente_editando = datos[0].innerText;
    $('#origen').val(datos[1].innerText);
    $('#destino').val(datos[2].innerText);
    $('#empresa').val(datos[3].innerText);
    editando_ruta = true;
    cambiar_texto(true, btn_guardar_ruta);
    e.preventDefault();
});

$(document).on('click', '.ruta-delete', eliminarRuta);

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
                `<tr>
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
            </tr>`
        });
        template += `
        <tr class='noSearch hide'>
            <td colspan="5"></td>
        </tr>`
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
