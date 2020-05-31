//Oculta el menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


var tablaID = "";
var alerta = document.getElementById("alerta_coop");
var fila_seleccionda = -1;
var btn_guardar;
var card_datos_ID = "";
var objeto_coop = new Coopertativa("nombre_coop", "buses_coop", "estado_coop");
var objeto_ruta = new Ruta("origen", "destino", "empresa");
var objeto_empleado = new Empleado("nombre_empl", "apellido", "cedula", "correo", "empresa_empl");

function openInicio(e) {
    //e.preventDefault();
}
function openCoopertativa(e) {
    fila_seleccionda = -1;
    tablaID = "tablaCoop";
    card_datos_ID = "entrada_coop";
    alerta = document.getElementById("alerta_coop");
    btn_guardar = document.getElementById("guardar_coop");
}
function openRuta(e) {
    fila_seleccionda = -1;
    tablaID = "tablaRutas";
    card_datos_ID = "entrada_ruta";
    alerta = document.getElementById("alerta_ruta");
    btn_guardar = document.getElementById("guardar_ruta");
}
function openEmpleado(e) {
    fila_seleccionda = -1;
    tablaID = "tablaEmpleado";
    card_datos_ID = "entrada_empleado";
    alerta = document.getElementById("alerta_empleado");
    btn_guardar = document.getElementById("guardar_empleado");
}
function openAnuncios(e) {
    //e.preventDefault();
}

/*----Tabla Cooperativas -------*/

document.getElementById("entrada_coop").addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('nombre_coop');
    let buses = document.getElementById('buses_coop');
    let estado = document.getElementById('estado_coop');
    // Validacion de campos vacios
    if (name.value === '' || buses.value === '' || estado.value === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    }

    objeto_coop.agregarFila(tablaID, name.value, buses.value, estado.value);
    //fila_seleccionda = -1;
    //quitar_seleccion();
    color_seleccion(tablaID);
    seleccionar_filas(tablaID);
    mostrar_mensaje('Se ha añadido', alerta, 'success');
    cambiar_texto(false, btn_guardar);
    limpiar("entrada_coop", objeto_coop);
});

//Click en el boton editar
$("#editar_coop").click(function (e) {
    if (fila_seleccionda != -1) {
        objeto_coop.getData(fila_seleccionda + 1, tablaID);
        cambiar_texto(true, btn_guardar);
    }
});

//Click en el boton Eliminar
$("#eliminar_coop").click(function (e) {
    eliminarFila(tablaID);
});


/*----Tabla Rutas -------*/

document.getElementById("entrada_ruta").addEventListener('submit', function (e) {
    e.preventDefault();
    let origen = document.getElementById('origen');
    let destino = document.getElementById('destino');
    let empresa = document.getElementById('empresa');
    // Validacion de campos vacios
    if (origen.value === '' || destino.value === '' || empresa.value === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    }

    objeto_ruta.agregarFila(tablaID, origen.value, destino.value, empresa.value);
    //fila_seleccionda = -1;
    //quitar_seleccion();
    color_seleccion(tablaID);
    seleccionar_filas(tablaID);
    mostrar_mensaje('Se ha añadido', alerta, 'success');
    cambiar_texto(false, btn_guardar);
    limpiar("entrada_ruta", objeto_ruta);
});

//Click en el boton editar
$("#editar_ruta").click(function (e) {
    if (fila_seleccionda != -1) {
        objeto_ruta.getData(fila_seleccionda + 1, tablaID);
        cambiar_texto(true, btn_guardar);
    }
});

//Click en el boton Eliminar
$("#eliminar_ruta").click(function (e) {
    eliminarFila(tablaID);
});



/*----Tabla Empleados -------*/

document.getElementById("entrada_empleado").addEventListener('submit', function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre_empl');
    let apellido = document.getElementById('apellido');
    let cedula = document.getElementById('cedula');
    let correo = document.getElementById('correo');
    let empresa = document.getElementById('empresa_empl');

    // Validacion de campos vacios
    if (nombre.value === '' || apellido.value === '' || cedula.value === '' || correo.value === '' || empresa.value === '') {
        return mostrar_mensaje('Campos vacios', alerta, 'danger');
    }
    if (cedula.value.length > 10) {
        return mostrar_mensaje('Cedula erronea', alerta, 'danger');
    }

    objeto_empleado.agregarFila(tablaID, nombre.value, apellido.value, cedula.value, correo.value, empresa.value);
    //fila_seleccionda = -1;
    //quitar_seleccion();
    color_seleccion(tablaID);
    seleccionar_filas(tablaID);
    mostrar_mensaje('Se ha añadido', alerta, 'success');
    cambiar_texto(false, btn_guardar);
    limpiar("entrada_empleado", objeto_empleado);
});

//Click en el boton editar
$("#editar_empleado").click(function (e) {
    if (fila_seleccionda != -1) {
        objeto_empleado.getData(fila_seleccionda + 1, tablaID);
        cambiar_texto(true, btn_guardar);
    }
});

//Click en el boton Eliminar
$("#eliminar_empleado").click(function (e) {
    eliminarFila(tablaID);
});




/*----- Generico ------- */
function limpiar(card, objeto) {
    document.getElementById(card).reset();
    objeto.borrarCampos();
}

color_seleccion(tablaID);
seleccionar_filas(tablaID);

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

function eliminarFila(tabla) {
    var table = document.getElementById(tabla);
    var rowCount = table.rows.length;
    if (rowCount <= 1)
        alert('Tabla vacia');
    else
        table.deleteRow(rowCount - 1);
}
