var IdUser = "";
var email = "";

emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    console.log(user);
    if (user) {
        console.log("Si esta logueado");
        email = user.email;
        let name = user.displayName;
        if (user.displayName == null) {
            name = email;
        }
        document.getElementById("cuentaR").innerHTML = `<img src="../icons/person.svg">&nbsp;&nbsp;${name}`;
        cargarId();
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

$(document).ready(function () {
    console.log("ready!");
    cargar();
});

function cargar() {
    setTimeout(function () {
        console.log("Cargando..");
        Cargar_Destinos();
        cargarCooperativas();
        console.log("Carga lista");
    }, 2000);
}

var precioAsientos = "";
var ItinerarioID = "";
var fecha = "";

$(document).on('click', '.agregarCarrito', function (e) {
    e.preventDefault();
    //let element = $(this)[0].parentElement;
    precioAsientos = $(this).parent().attr('value');
    console.log("Precio: " + precioAsientos);
    ItinerarioID = $(this).parent().attr('data-Itinerario');
    console.log("Itinerario: " + ItinerarioID);
    fecha = new Date().toJSON();
    //fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

    if (IdUser == "") {
        swal("Ups! no puede comprar", "Debe iniciar session", "warning");
    } else {
        comprobarCarrito();
    }
});

var USER = "";

function comprobarCarrito() {
    if (IdUser != "") {
        let url = url_back + "carrito/idusuario=" + IdUser + "/estado=PENDIENTE";
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            let idC = "";
            let Carrito = "";
            Carrito = data[0];
            data.forEach(task => {
                idC = task.idCarrito;
            });
            console.log("Carrito verificado");
            if (idC != "") {
                console.log("Agregando boleto");
                agregarBoleto(Carrito);
            } else {
                console.log("No tiene carrito. Add carrito");
                addCarrito();
            }
        }).catch(err => {
            console.log("Error al obtener el carrito");
        });
    }
}

function cargarId() {
    let url = url_back + "usuario/email=" + email;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (response) {
        IdUser = response.idUsuario;
        if (IdUser != "") {
            USER = response;
            console.log("User cargado..");
        }
    }).catch(function () {
        console.log("Error al encontrar usuario");
    });
}

//metodo POST
function agregarBoleto(Carrito) {
    let Itinerario;
    TodosItinerarios.forEach(task => {
        if (task.idItinerario == ItinerarioID) {
            Itinerario = task;
        }
    });
    let data = {
        cantidadDeAsientos: nAcientos,
        codigoQr: "nada",
        costo: precioAsientos,
        estado: "DISPONIBLE",
        itinerario: Itinerario,
        carrito: Carrito
    };
    let url = url_back + "boleto";
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data_res) {
        //console.log("Respuesta: " + data_res);
        swal("Agregado al carrito", "", "success");
    }).catch(function (error) {
        //console.log("Error al agregar");
        swal("No se pudo agregar", "", "error");
    });
}

//Post Carrito
function addCarrito() {
    if (USER != "") {
        let url = url_back + "carrito";
        let data = {
            "usuario": USER,
            "estado": "PENDIENTE",
            "fechaCreacion": fecha
        };
        console.log("Enviando:");
        console.log(data);
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data_res) {
            console.log("Respuesta: ");
            console.log(data_res);
            swal("Intente nuevamente", "Ocurrio algo", "warning");
        }).catch(function (error) {
            console.log("Error al crear el carrito");
        });
    } else {
        console.log("No se obtuvo al cliente");
    }
}

var nAcientos = "";
$(document).on('click', '#btnBuscarViaje', function (e) {
    e.preventDefault();
    let origen = document.getElementById("origen").value;
    let destino = document.getElementById("destino").value;
    let empresa = document.getElementById("empresa").value;
    let fecha = document.getElementById("Fecha").value;
    nAcientos = document.getElementById("menu_acientos").value;
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

var TodosItinerarios = "";
function cargarResultados(origen, destino, empresa, fecha, nAcientos) {
    let Bandera = false;
    //console.log("Inicio..: " + origen + destino + empresa + fecha + nAcientos);
    let url = url_back + "itinerario/fecha=" + fecha;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        TodosItinerarios = data;
        let template = ``;
        if (empresa == "Todas") {
            data.forEach(task => {
                if (destino == task.viaje.destino.nombre) {
                    template += agregar(task.idItinerario, task.agencia.nombre, task.horaSalida, task.asientosDisponibles, task.precioAsiento);
                    Bandera = true;
                }
            });
        } else {
            data.forEach(task => {
                if (empresa == task.agencia.nombre && destino == task.viaje.destino.nombre) {
                    template += agregar(task.idItinerario, task.agencia.nombre, task.horaSalida, task.asientosDisponibles, task.precioAsiento);
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

function agregar(Itinerario, Nombre, Hora, Asientos, Precio) {
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
                            <p class="pAsiento card-text">Precio unitario: ${Precio}</p>
                        </div>
                        <div class="col-sm-6" value="${Precio}" data-Itinerario="${Itinerario}">
                            <img class="align-right" src="img/boleto.jpg" width="150" height="90">
                            <a class="agregarCarrito btn btn-warning disabled">Agregar al carrito</a>
                            <!--a href="../pago/" class="agregarCarrito btn btn-warning disabled">Agregar al carrito</a-->
                        </div>
                    </div>`;
    } else {
        result += ` 
                            <p class="card-text">Asientos disponibles: ${Asientos}</p>
                            <p class="pAsiento card-text">Precio unitario: ${Precio}</p>
                        </div>
                        <div class="col-sm-6" value="${Precio}" data-Itinerario="${Itinerario}">
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