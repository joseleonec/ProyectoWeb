//Oculta el menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#wrapper").toggleClass("toggled");

var url_cliente = 'https://cryptic-beach-67438.herokuapp.com/cliente';
var url_direccion = "https://cryptic-beach-67438.herokuapp.com/ubicacion/cliente";
var url_parroquias = "https://springtest999.herokuapp.com/api/parroquia";
var url_solicitudes = "https://springtest999.herokuapp.com/api/solicituddevolucion/";
var url_facturas = "https://facturacionapp9.herokuapp.com/api/";
var url_cliente_ubicacion = "https://cryptic-beach-67438.herokuapp.com/ubicacion?";
var ulr_sugerencias = "https://intereses2.herokuapp.com/sug/";

var id_client = "";

$(document).ready(function () {
    console.log("ready!");
    id_client = user_data();
    //id_client = document.getElementById("id_user").value;
    var pg_perfil = document.getElementById("perfil_usuario");
    var pg_devolucion = document.getElementById("pg_devoluciones");
    var pg_factura = document.getElementById("pg_facturas");
    if (pg_perfil != null) {
        Cargar_Datos_Perfil(id_client);
        Cargar_Parroquias();
        Cargar_Direcciones_Perfil(id_client);
    }
    if (pg_devolucion != null) {
        Cargar_Solicitudes(id_client);
    }
    if (pg_factura != null) {
        Cargar_Facturas(id_client);
    }
});

//var menu=document.getElementById("perfil_usuario");

var tablaID = "";
var alerta = document.getElementById("alerta_direccion");
var menu_parroquias = document.getElementById("menu_parroquias");
var alerta_sugerencia = document.getElementById("alerta_sugerencia");
var alerta_datos = document.getElementById("alerta_datos");
var guardar_direccion = document.getElementById("guardar_direccion");

function Cargar_Solicitudes(id_client) {
    let url = url_solicitudes;
    url = url + "idcliente=" + id_client;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.idSolicitud}</td>
            <td>${task.fechaDeRegistro}</td>
            <td>${task.idFactura}</td>
            <td>${task.motivoDevolucion}</td>
            <td>${task.estadoAprobacion}</td>
            </tr>`
        });
        $('#tabla_devolcion_body').html(template);
    }).catch(err => {
        console.log(err);
    });
}

var facturas;

function Cargar_Facturas(id_cliente) {
    let url = url_facturas + "cliente?id=" + id_cliente;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        facturas = data;
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.idCliente}</td>
            <td>${task.fecha}</td>
            <td>${task.hora}</td>
            <td>${task.total}</td>
            <td>${task.estado}</td>
            <td>
            <button class="btn btn-secondary task-ver-factura" data-toggle="modal" data-target="#exampleModal1">
            Ver
            </button>
            </td>
            </tr>`;
        });
        template += `
        <tr class='noSearch hide'>
            <td colspan="5"></td>
        </tr>`;
        console.log("factura-lista");
        $('#bodyTablaFacturas').html(template);
    }).catch(err => {
        console.log(err);
    });
}

$(document).on('click', '.task-ver-factura', (e) => {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    const idFactura = datos[0].innerText;
    let template = '';
    facturas.forEach(task => {
        if (task.id === idFactura) {
            task.items.forEach(lista => {
                template +=
                    `<tr>
                <td>${lista.id}</td>
                <td>${lista.nombre}</td>
                <td>${lista.unidades}</td>
                <td>${lista.precioUnitario}</td>
                <td>
                    <button class="btn btn-success agregar_a_carrito">
                        Agregar al carrito
                    </button>
                </td>
                </tr>`;
            });
        }
    });
    $('#body_tabla_modal').html(template);
    e.preventDefault();
});

function verProductos() {
    let modal = document.getElementById("exampleModal1");
    modal.innerHTML = `<div class="modal-dialog " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Productos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div></div>
      <div class="modal-body">
        <form>
        <table class="table table-hover table-bordered tabla_content" id="tablaDetalle">
        <thead class="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>--</th>
          </tr>
        </thead>
        <tbody id="tableIDcoop">
          <!--contenteditable="true"-->
          <tr>
            <td>Tv</td>
            <td>1</td>
            <td>$25,67</td>
            <td>
              <button class="btn btn-success">
                Agregar al carrito
              </button>
            </td>
          </tr>
          <tr>
            <td>Laptop MSI</td>
            <td>1</td>
            <td>$1200,69</td>
            <td>
                <button class="btn btn-success">
                  Agregar al carrito
                </button>
            </td>
          </tr>
          <tr class='noSearch hide'>
            <td colspan="5"></td>
          </tr>
        </tbody>
      </table>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
    `;
    //alert("click");
    console.log("sad");
}

//--------Sistema de envio y devolucion---------------//

var Parroquias_json;

function Cargar_Parroquias() {
    let url = url_parroquias;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        Parroquias_json = data;
        let template = '<option selected ="" disabled>Parroquia</option>';
        data.forEach(task => {
            template +=
                `<option>${task.idParroquia} ${task.nombreParroquia}</option>`;
        });
        $('#menu_parroquias').html(template);
    }).catch(err => {
        console.log(err);
    });
}

//--------Cargar datos del cliente---------------//

function Cargar_Datos_Perfil(id_client) {
    let url = url_cliente + "?id=" + id_client;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        var vector = [data];
        vector.forEach(task => {
            document.getElementById('name').value = task.name;
            document.getElementById('correo').value = task.email;
            document.getElementById('password').value = task.password;
            document.getElementById('telefono').value = task.phone;
            document.getElementById('codepostal').value = task.postalCode;
            document.getElementById('saldo').value = task.saldo;
        });
    }).catch(err => {
        console.log(err);
    });
}

function Cargar_Direcciones_Perfil(id_client) {
    let url = url_direccion + "?id=" + id_client;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        let template = '';
        data.forEach(task => {
            template +=
                `<tr>
            <td>${task.id}</td>
            <td>${task.idParroquia}</td>
            <td>${task.callePrincipal}</td>
            <td>${task.calleSecundaria}</td>
            <td>${task.referencia}</td>
            <td>${task.numeroDomicilio}</td>
            <td><button class="task-direccion btn btn-secondary">Editar</button></td>
            <td><button class="task-delete btn btn-danger">Eliminar</button></td>
            </tr>`
        });
        $('#tabla_direcciones_body').html(template);
    }).catch(err => {
        console.log(err);
    });
}

//--------Direccion del cliente---------------//

var editando_direccion = false;
var id_ubicacion_editando;

function editarDireccion(e) {
    //const element = $(this)[0].activeElement.parentElement.parentElement;
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    id_ubicacion_editando = datos[0].innerText;
    $('#callep').val(datos[2].innerText);
    $('#calles').val(datos[3].innerText);
    $('#referencia').val(datos[4].innerText);
    $('#domicilio').val(datos[5].innerText);
    editando_direccion = true;
    cambiar_texto(true, guardar_direccion);
    e.preventDefault();
}

function guardarDireccion(e) {
    e.preventDefault();
    let parroquia = document.getElementById('menu_parroquias').value;
    let callep = document.getElementById('callep').value;
    let calles = document.getElementById('calles').value;
    let referencia = document.getElementById('referencia').value;
    let domicilio = document.getElementById('domicilio').value;
    var id_parroquia = parroquia.split(" ");
    id_parroquia = parseInt(id_parroquia[0], 10);
    // Validacion de campos vacios
    if (parroquia === "Parroquia" || callep === '' || calles === '' || referencia === '' || domicilio === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    } else {
        if (editando_direccion) { //si se esta editando
            editar_Direccion(id_parroquia, callep, calles, referencia, domicilio);
        } else { //nueva direccion
            ingresar_Direccion(id_parroquia, callep, calles, referencia, domicilio);
        }
    }
}

//metodo POST
function ingresar_Direccion(id_parroquia, callep, calles, referencia, domicilio) {
    var data = { callePrincipal: callep, calleSecundaria: calles, referencia: referencia, numeroDomicilio: domicilio, idParroquia: id_parroquia };
    var aux = url_cliente_ubicacion + "cliente=" + id_client;
    alert("post");
    fetch(aux, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data_res) {
        mostrar_mensaje('Exito', alerta, 'success');
        limpiar("entrada_ruta");
        Cargar_Direcciones_Perfil(id_client);
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo añadir', alerta, 'danger');
    });
}

//metodo PUT
function editar_Direccion(id_parroquia, callep, calles, referencia, domicilio) {
    var data = { id: id_ubicacion_editando, callePrincipal: callep, calleSecundaria: calles, referencia: referencia, numeroDomicilio: domicilio, idParroquia: id_parroquia };
    var aux = url_cliente_ubicacion + "cliente=" + id_client;
    fetch(aux, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        mostrar_mensaje('Exito', alerta, 'success');
        editando_direccion = false;
        cambiar_texto(false, guardar_direccion);
        limpiar("entrada_ruta");
        Cargar_Direcciones_Perfil(id_client);
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo editar', alerta, 'danger');
    });
}

//metodo DELETE
function eliminarDireccion() {
    if (confirm('Seguro que desea eliminar?')) {
        let element = $(this)[0].parentElement.parentElement;
        var idUbicacion = element.cells[0].innerText;
        let url = url_cliente_ubicacion + "id=" + idUbicacion;
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

$(document).on('click', '.task-delete', eliminarDireccion);

//-----Datos del usuario-------------//

function guardarPerfil(e) {
    e.preventDefault();
    let user = document.getElementById('name').value;
    let correo = document.getElementById('correo').value;
    let contra = document.getElementById('password').value;
    let telefono = document.getElementById('telefono').value;
    let code_postal = document.getElementById('codepostal').value;
    // Validacion de campos vacios
    if (user === '' || correo === '' || contra === '' || telefono === '' || code_postal === '') {
        return mostrar_mensaje('Campos vacios', alerta_datos, 'danger');
    } else {
        editar_datos_user(user, correo, contra, telefono, code_postal);
    }
}

//metodo PUT
function editar_datos_user(user, correo, contra, telefono, code_postal) {
    var data = { id: id_client, name: user, email: correo, password: contra, phone: telefono, postalCode: code_postal };
    var aux = url_cliente;
    fetch(aux, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        mostrar_mensaje('Cambios guardados', alerta_datos, 'success');
        Cargar_Datos_Perfil(id_client);
    }).catch(function (error) {
        console.log('Error post: ' + error);
        mostrar_mensaje('No se pudo editar', alerta_datos, 'danger');
    });
}


//-----Sistema de Gestion de intereses ----------//

//Envio de una sugerencia desde desde este cliente

/*POST*/
function ingresar_Sugerencia(sugerencia) {
    var data = { id_cliente: id_client, descripcion: sugerencia.value };
    var aux = ulr_sugerencias;
    fetch(aux, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data_res) {
        console.log("Respuesta: " + data_res);
        sugerencia.value = "";
        mostrar_mensaje('Sugerencia enviada', alerta_sugerencia, 'success');
        //ir_a_inicio();
    }).catch(error => console.error('Error:', error));
}

var sugerencia = document.getElementById("sugerencia_txt");

function enviarSugerencia(e) {
    e.preventDefault();
    var sugerencia = document.getElementById("sugerencia_txt");
    if (sugerencia.value === '') {
        return mostrar_mensaje('Ingrese una sugerencia', alerta_sugerencia, 'danger');
    } else {
        ingresar_Sugerencia(sugerencia);
    }
}

$(document).on('click', '#guardar_perfil', guardarPerfil);

$(document).on('click', '#guardar_direccion', guardarDireccion);

$(document).on('click', '.task-direccion', editarDireccion);

$(document).on('click', '#enviar_solicitud', enviarSugerencia);

function limpiarTabla() {
    //alert("limpiando");
    var elemento = document.getElementById("tableIDcoop");
    elemento.innerHTML = ``;
    //setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
    //$('#tablaCoopID').html(``);
    //document.getElementById('tablaCoopID').innerHTML = ``;
}

/*----- Generico ------- */
function limpiar(card) {
    document.getElementById(card).reset();
}

//selecion
//color

//Obtener indice de la fila y columna seleccionada 
function seleccionar_filas(tabla) {
    $(function () { //$(document).ready(function() { ... });
        let table = "#" + tabla;
        $('table tr td').click(function () {
            //var columna = $(this).index();
            fila_seleccionda = $(this).parent('tr').index();
        });
    })
}

//Para dar color ala fila seleccionada
function color_seleccion(tabla) {
    let table = "#" + tabla;
    $('table tr').click(function (e) {
        //e.preventDefault();
        $('table tr').removeClass('highlighted');
        $(this).addClass('highlighted');
        fila_seleccionda = $(this).index();// modifique
        //var data = $(this).innerText;
        //datos_fila.innerHTML = `${data}`;
        //datos_fila.innerHTML = data;
    });
}

function mostrar_mensaje(mensaje, elemento, tipo_alerta) {
    elemento.innerHTML = `<div class="alert alert-${tipo_alerta} campo" role="alert">
    <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}

function quitar_seleccion(tabla) {
    let table = "#" + tabla;
    $('table tr').removeClass('highlighted');
}

function cambiar_texto(band, element) {
    if (band == true) {
        element.setAttribute('value', "Guardar cambios");
    } else {
        element.setAttribute('value', "Ingresar nuevo");
    }
}

var array = new Array();
var cont = 0;

function eliminarFila(tabla) {
    var table = document.getElementById(tabla);
    var rowCount = table.rows.length;
    if (rowCount <= 1) {
        alert('Tabla vacia');
    } else {
        //alert(rowCount);
        //table.deleteRow(rowCount - 1);
        //console.log("Dimension " + array.length);
        array = array.sort((a, b) => a - b);
        for (let i = array.length - 1; i = 0; i++) {
            table.deleteRow(array[i]);
        }
        array = new Array();
    }
}

/*---Checkbox de las tablas */
function checkSelected(checkboxElem) {
    if (fila_seleccionda > -1) {
        if (checkboxElem.checked) {
            array.push(fila_seleccionda + 1);
        } else {
            let index = array.indexOf(fila_seleccionda + 1);
            array.splice(index, 1);
        }
    } else {
        //let aux="#"+checkboxElem.id;
        //$("aux").prop('checked', false); 
    }
}


function doSearch() {
    const tableReg = document.getElementById('tablaFactura');
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
