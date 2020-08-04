var idUser = "si";
var email = "";

//------verificar sesion-------
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    console.log(user);
    if (user) {
        idUser = "si";
        email = user.email;
        console.log("Si esta logueado Estado: " + idUser);
        document.getElementById("cuenta").innerHTML = `<img src="../icons/person.svg">&nbsp;&nbsp;${user.displayName}`;
    } else {
        console.log("No existe una sesion ..");
    }
});

$(document).ready(function () {
    console.log("ready!");
    pedirDatos();
    //idUser = dataUser(); //pedir al php
    //idUser = 1; //logueado
    //idUser = "";  //No logueado
});

function volver_a_inicio() {
    location.href = "../index.html"
}

var alerta_campo = document.getElementById("alerta_busqueda");
var url_back = "https://terminal25backend.herokuapp.com/";

async function pedirDatos() {
    const coop = cargarCooperativa();
    const comentarios = cargarComentarios();
    let data2 = await Promise.all([coop, comentarios]);
    console.log("Fin Carga");
    try {
        promedios();
        cargarDatos();
    } catch (error) {
        console.error("Error al cargar");
    }
}

//metodo GET
var Cooperativas = "";
function cargarCooperativa() {
    let url = url_back + "agencia/listar";
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        Cooperativas = data;
        console.log("Cooperativas cargadas public");
    }).catch(err => {
        //console.log("Cooperativas:" + err);
    });
}

var Comentarios = "";
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
                <img class="align-right" src="img/${task.nombre}.png" onerror="this.src='img/nofound.jpg';" width="120" height="70">
            </td>
            <td class="col-sm-3" value="${task.idAgencia}">
                ${task.nombre}
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
                <td class="col-sm-3">`;
        if (idUser != "") { //logueado
            template += `
            <button type="button" class="btn btn-primary task-comentar" data-toggle="modal" data-target="#exampleModal1">
                Dejar opinión
            </button>`;
        } else { // No logueado
            template += `
            <button type="button" class="btn btn-primary task-comentar" >
                Dejar opinión
            </button>`;
        }
        template += `
                </td>
                </tr>`;
    });
    //document.getElementById("bodyTableCoop").innerHTML = template;
    $('#BodyTablaCoopInicio').html(template);
}

var idAgenciaCOM;
$(document).on('click', '.task-comentar', function (e) {
    if (idUser != "") {
        let datos = e.target.parentElement.parentElement.getElementsByTagName('td');
        idAgenciaCOM = datos[1].getAttribute('value');
        let name = datos[1].innerHTML;
        document.getElementById("exampleModalLabel").innerHTML = `${name} <br> Valoramos tu opinión`;
    } else {
        //$("#exampleModal1").removeClass('show');
        swal("No puede comentar", "Debe iniciar session", "warning");
    }
    e.preventDefault();
});

$("#exampleModal1").on("hidden.bs.modal", function () {
    document.getElementById("text_comentario").value = "";
});

var currentValue = 1;
function handleClick(myRadio) {
    currentValue = myRadio.value;
}

/* $(document).on('click', '.task-delete', actionFunction);

function actionFunction() {
} */

$(document).on('click', '.guardar_comentario', function (e) {
    e.preventDefault();
    let comentario = document.getElementById("text_comentario").value;
    let agenciaLocal = "";
    Cooperativas.forEach(coop => {
        if (coop.idAgencia == idAgenciaCOM) {
            agenciaLocal = coop;
        }
    });

    if (bandera == false) {
        console.log("Obteniendo user...");
        cargarId();
        console.log("Fin obtencion");
    }

    if (email != "") {
        if (userCliente != "" && agenciaLocal != "") {
            swal("Comentario enviado", "Gracias por tu contribución", "success");
            /* let data = { agencia: agenciaLocal, calificacion: currentValue, comentario: comentario, usuario: userCliente };
            let url = url_back + "comentario";
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data_res) {
                //console.log("Respuesta: " + data_res);
                pedirDatos();
                swal("Comentario enviado", "Gracias por tu contribución", "success");
            }).catch(function (error) {
                swal("Fallo", "No se pudo enviar", "error");
                //console.log('Error post: ' + error);
            }); */
        } else {
            swal("Fallo", "--", "warning");
        }
    } else {
        swal("No puede comentar", "Debe iniciar session", "warning");
    }
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

//------Obtencion user-------
var userCliente = "";
var bandera = false;
function cargarId() {
    let url = url_back + "usuario/email=" + email;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (response) {
        let id = response.idUsuario;
        if (id != "") {
            bandera = true;
            userCliente = response;
            console.log("Listo");
        }
    }).catch(function () {
        console.log("Error al encontrar usuario");
    });
}


function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'es,sp,ca,eu,gl,en,fr,it,pt,de', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true }, 'google_translate_element');
}

/*
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );
}
*/
/* var bandera = false;
function cargarAtributos() {
    $('.task-comentar').each(function (i, obj) {
        $(obj).attr("data-toggle", "modal");
        $(obj).attr("data-target", "#exampleModal1");
        //$('.task-comentar').removeAttr(attribute);
        bandera = true;
    });
} */

//var obj = document.getElementById("btnCancelar");
//obj.click();
//$("#exampleModal1").removeAttr("class");
//var targetElement = document.getElementById("exampleModal1");
//addClass(targetElement, "someClass");
//targetElement.removeClass("shows");
//Funcion al cerrar el modal de comentarios