$(document).ready(function () {
    console.log("ready!");
    pedirDatos();
});

function volver_a_inicio() {
    // alert("Gracias por visitar nuestra pagina, nos vamos a el mirador de la serrania")
    location.href = "../index.html"
}

var alerta_campo = document.getElementById("alerta_busqueda");
var url_back = "https://terminal25backend.herokuapp.com/";

async function pedirDatos() {
    const coop = cargarCooperativa();
    const comentarios = cargarComentarios();
    let data = await Promise.all([coop, comentarios])
    try {
        promedios();
        cargarDatos();
    } catch (error) {
        console.error("Error al cargar");
    }
}

//metodo GET
var Cooperativas;
function cargarCooperativa() {
    let url = url_back + "agencia/listar";
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        Cooperativas = data;
        console.log("Cooperativas cargadas public");
    }).catch(err => {
        console.log("Cooperativas:" + err);
    });
}

var Comentarios;
function cargarComentarios() {
    let url = url_back + "comentario/listar";
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        Comentarios = data;
        console.log("Comentarios cargadas");
    }).catch(err => {
        //console.log(err);
    });
}

var calificaciones;
function promedios() {
    calificaciones = [];
    Cooperativas.forEach(coop => {
        let promedio = 0;
        let suma = 0;
        let i = 0;
        Comentarios.forEach(task => {
            if (coop.idAgencia == task.agencia.idAgencia) {
                suma += task.calificacion;
                i++;
            }
        });
        if (i != 0) {
            promedio = Math.round(suma / i);
        }
        calificaciones.push(promedio);
    });
}

function cargarDatos() {
    let template = ``;
    let i = 1;
    let k = 0;
    Cooperativas.forEach(task => {
        template +=
            `
            <tr class="row">
            <td class="col-sm-3">
                <img class="align-right" onerror="this.src='img/nofound.jpg';" src="img/${task.nombre}.png" width="120" height="70">
            </td>
            <td class="col-sm-3" value="${task.idAgencia}">
                <p class="align-right">&nbsp;&nbsp;&nbsp;${task.nombre}</p>
            </td>
            <td class="col-sm-3">
                <form class="align-right">
                    <p class="clasificacion">`;
        switch (calificaciones[k++]) {
            case 0:
                template += `
                    <input id="radio${i}" type="radio" name="estrella" value="5" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="4" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="3"  disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="2"  disabled>
                    <label for="radio${i++} ">★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="1"  disabled>
                    <label for="radio${i++} ">★</label>`;
                break;
            case 1:
                template += `
                    <input id="radio${i}" type="radio" name="estrella" value="5" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="4" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="3" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="2" disabled>
                    <label for="radio${i++} ">★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="1" checked disabled>
                    <label for="radio${i++} ">★</label>`;
                break;
            case 2:
                template += `
                    <input id="radio${i}" type="radio" name="estrella" value="5" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="4" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="3" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="2" checked disabled>
                    <label for="radio${i++} ">★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="1"  disabled>
                    <label for="radio${i++} ">★</label>`;
                break;
            case 3:
                template += `
                    <input id="radio${i}" type="radio" name="estrella" value="5" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="4" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="3" checked disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="2"  disabled>
                    <label for="radio${i++} ">★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="1"  disabled>
                    <label for="radio${i++} ">★</label>`;
                break;
            case 4:
                template += `
                    <input id="radio${i}" type="radio" name="estrella" value="5" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="4" checked disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="3"  disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="2"  disabled>
                    <label for="radio${i++} ">★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="1"  disabled>
                    <label for="radio${i++} ">★</label>`;
                break;
            case 5:
                template += `
                    <input id="radio${i}" type="radio" name="estrella" value="5" checked disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="4" disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="3"  disabled>
                    <label for="radio${i++}" >★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="2"  disabled>
                    <label for="radio${i++} ">★</label>
                    <input id="radio${i}" type="radio" name="estrella" value="1"  disabled>
                    <label for="radio${i++} ">★</label>`;
                break;
            default:
                break;
        }
        template += `
                        </p>
                    </form>
                </td>
                <td class="col-sm-3">
                    <button type="button" class="btn btn-primary task-comentar" data-toggle="modal" data-target="#exampleModal1">
                        Dejar opinión
                    </button>
                </td>
                </tr>`;
    });
    //document.getElementById("bodyTableCoop").innerHTML = template;
    $('#BodyTablaCoopInicio').html(template);
}

var idAgenciaCOM;
$(document).on('click', '.task-comentar', function (e) {
    const datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    var idAgencia = datos[1].getAttribute('value');
    let template = '';
    Cooperativas.forEach(task => {
        if (task.idAgencia == idAgencia) {
            idAgenciaCOM = idAgencia;
            document.getElementById("exampleModalLabel").innerHTML = `${task.nombre} <br> Valoramos tu opinión`;
            document.getElementById("bodyModal").innerHTML = `
            <form>
            <div class="form-group">
                <strong>Deja tu comentario:</strong>
                <textarea id="text_comentario" class="form-control" rows="5" id="comment"></textarea>
            </div>
            <div class="form-group">
                <strong>Calificar</strong>
                <form class="align-right">
                    <p id="calificador" name="Mis" class="clasificacion">
                        <input id="r1" type="radio" name="estrellas" onclick="handleClick(this);"value="5">
                        <label for="r1">★</label>
                        <input id="r2" type="radio" name="estrellas" onclick="handleClick(this);"value="4">
                        <label for="r2">★</label>
                        <input id="r3" type="radio" name="estrellas" onclick="handleClick(this);"value="3">
                        <label for="r3">★</label>
                        <input id="r4" type="radio" name="estrellas" onclick="handleClick(this);"value="2">
                        <label for="r4">★</label>
                        <input id="r5" type="radio" name="estrellas" onclick="handleClick(this);" value="1" checked>
                        <label for="r5">★</label>
                    </p>
                </form>
            </div>
            </form>`;
        }
    });
    e.preventDefault();
});

var currentValue = 0;
function handleClick(myRadio) {
    currentValue = myRadio.value;
}

$(document).on('click', '.guardar_comentario', function (e) {
    let comentario = document.getElementById("text_comentario").value;
    alert("Agenicia:" + idAgenciaCOM + " Comentario: " + comentario + " Puntaje: " + currentValue);
    e.preventDefault();
});

//-------------
function doSearch() {
    const tableReg = document.getElementById('tabla_coop_public');
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
        mostrar_mensaje("Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : ""), alerta_campo, "success");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
        mostrar_mensaje("No se han encontrado coincidencias", alerta_campo, "danger");
    }
}

function mostrar_mensaje(mensaje, elemento, tipo_alerta) {
    elemento.innerHTML = `<div class="alert alert-${tipo_alerta} campo" role="alert">
    <strong>${mensaje}</strong></div>`;
    //setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}
