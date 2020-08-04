emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    console.log(user);
    if (user) {
        console.log("Si esta logueado");
        document.getElementById("cuentaR").innerHTML = `<img src="../icons/person.svg">&nbsp;&nbsp;${user.displayName}`;
    } else {
        console.log("No existe una sesion ..");
    }
});

$(function () {
    $('#datetimepicker4').datetimepicker({
        format: 'L'
    });
});

var url_back = "https://terminal25backend.herokuapp.com/";
var idUser = "";

$(document).ready(function () {
    console.log("ready!");
    //idUser = dataUser(); //pedir al php
    //idUser = 1; //logueado
    idUser = "";  //No logueado
    Cargar_Destinos();
    cargarCooperativas();
});

$(document).on('click', '.agregarCarrito', function (e) {
    e.preventDefault();
    if (idUser == "") {
        swal("Ups! no puede comprar", "Debe iniciar session", "warning");
    } else {
        redireccionar();
    }
});

function redireccionar() {
    location.href = "../pago/";
}

$(document).on('click', '#btnBuscarViaje', function (e) {
    e.preventDefault();
    let origen = document.getElementById("origen").value;
    let destino = document.getElementById("destino").value;
    let empresa = document.getElementById("empresa").value;
    let fecha = document.getElementById("Fecha").value;
    let nAcientos = document.getElementById("menu_acientos").value;
    if (origen == "" || destino == "Elegir.." || destino == "" || empresa == "" || fecha == "" || nAcientos == "") {
        swal("Elija un viaje",
            "Debe seleccionar las opciones:\n - Destino \n - Fecha \n - Cantidad de asientos"
            , "warning");
        return
    }
    //console.log(fecha);
    let aux = fecha.split("/");
    let Fecha = aux[2] + "-" + aux[0] + "-" + aux[1];
    //swal("Buscando", origen + ":" + destino + ":" + empresa + ":" + Fecha + nAcientos, "success");
    cargarResultados(origen, destino, empresa, Fecha, nAcientos);
});

function cargarResultados(origen, destino, empresa, fecha, nAcientos) {
    let Bandera = false;
    //console.log("Inicio..: " + origen + destino + empresa + fecha + nAcientos);
    let url = url_back + "itinerario/fecha=" + fecha;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = ``;
        if (empresa == "Todas") {
            data.forEach(task => {
                if (destino == task.viaje.destino.nombre) {
                    template += agregar(task.agencia.nombre, task.horaSalida, task.asientosDisponibles, task.precioAsiento);
                    Bandera = true;
                }
            });
        } else {
            data.forEach(task => {
                if (empresa == task.agencia.nombre && destino == task.viaje.destino.nombre) {
                    template += agregar(task.agencia.nombre, task.horaSalida, task.asientosDisponibles, task.precioAsiento);
                    Bandera = true;
                }
            });
        }
        $('#resultadosBusqueda').html(template);
        if (Bandera == false) {
            swal("Ningun resultado", "", "warning");
        }
    }).catch(err => {
        //console.log(err);
    });
}

function agregar(Nombre, Hora, Asientos, Precio) {
    let result = `
    <div class="card mb-4 ">
        <div class="card-body">
            <div class="row etq">
                <div class="col-md-4">
                    <img src="../coopertativas/img/${Nombre}.png" onerror="this.src='../coopertativas/img/nofound.jpg';" class="card-img" alt="..." width="120" height="70">
                </div>
                <div class="col-md-8">
                    <div class="card-body text-center">
                        <h5 class="card-title">${Nombre}</h5>
                    </div>
                    <div class="row card-body text-left">
                        <div class="col-sm-6">
                            <p class="card-text">Hora de salida: ${Hora}</p>`;
    if (Asientos == 0) {
        result += ` 
                            <p class="card-text" style="color:red;">Asientos disponibles: ${Asientos}</p>
                            <p class="card-text">Precio unitario: ${Precio}</p>
                        </div>
                        <div class="col-sm-6">
                            <img class="align-right" src="img/boleto.jpg" width="150" height="90">
                            <a class="agregarCarrito btn btn-warning disabled">Agregar al carrito</a>
                            <!--a href="../pago/" class="agregarCarrito btn btn-warning disabled">Agregar al carrito</a-->
                        </div>
                    </div>`;
    } else {
        result += ` 
                            <p class="card-text">Asientos disponibles: ${Asientos}</p>
                            <p class="card-text">Precio unitario: ${Precio}</p>
                        </div>
                        <div class="col-sm-6">
                            <img class="align-right" src="img/boleto.jpg" width="150" height="90">
                            <a class="agregarCarrito btn btn-warning">Agregar al carrito</a>
                            <!--a href="../pago/" class="agregarCarrito btn btn-warning">Agregar al carrito</a-->
                        </div>
                    </div>`;
    }
    result += `                    
                </div>
            </div>
        </div>
    </div>`;
    return result;
}

function Cargar_Destinos() {
    let url = url_back + "ubicacion/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '<option selected disabled>Elegir..</option>';
        data.forEach(task => {
            if (task.nombre !== "CUENCA") {
                template +=
                    `<option>${task.nombre}</option>`;
            }
        });
        $('#destino').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

function cargarCooperativas() {
    let url = url_back + "agencia/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = '<option selected>Todas</option>';
        data.forEach(task => {
            template += `<option>${task.nombre}</option>`;
        });
        $('#empresa').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'es,sp,ca,eu,gl,en,fr,it,pt,de', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true }, 'google_translate_element');
}