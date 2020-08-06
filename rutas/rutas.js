var url_back = "https://terminal25backend.herokuapp.com/";

emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    console.log(user);
    if (user) {
        console.log("Si esta logueado");
        document.getElementById("cuentaMapa").innerHTML = `<img src="../icons/person.svg">&nbsp;&nbsp;${user.displayName}`;
    } else {
        console.log("No existe una sesion ..");
    }
});

$(document).ready(function () {
    console.log("ready!");
    //pedirDatos();
    //idUser = dataUser(); //pedir al php
    Cargar_Destinos();
});

var destinos = "";
function Cargar_Destinos() {
    let url = url_back + "ubicacion/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        destinos = data;
        let template = '<option selected ="" disabled>Elegir...</option>';
        data.forEach(task => {
            if (task.nombre !== "CUENCA") {
                template +=
                    `<option>${task.nombre}</option>`;
            }
        });
        $('#ComboDestino').html(template);
    }).catch(err => {
        //console.log(err);
    });
}

$(document).on('click', '#btnBuscarRuta', function (e) {
    e.preventDefault();
    let origen = document.getElementById("ComboOrigen").value;
    let destino = document.getElementById("ComboDestino").value;
    if (origen == "Elegir..." || destino == "Elegir...") {
        swal("Nada que buscar", "Ingrese valores de busqueda", "warning");
        return;
    }
    cargarTabla(destino);
});

function cargarTabla(destino) {
    let template = ``;
    let origenLatitud = "";
    let origenLongitud = "";
    destinos.forEach(task => {
        if (task.nombre == "CUENCA") {
            origenLatitud = task.latitud;
            origenLongitud = task.longitud;
        }
        if (task.nombre == destino) {
            template += `
            <tr>
            <td value="${origenLatitud} ${origenLongitud}">Cuenca</td>
            <td value="${task.latitud} ${task.longitud}">${task.nombre}</td>
            <td>--</td>
            <td><a href="#home" class="btn btn-success verMapa">Ver en el mapa</a>
            </td>
            </tr>`;
        }
    });
    //document.getElementById("BodyTablaMapa").innerHTML = template;
    $('#BodyTablaMapa').html(template);
}

$(document).on('click', '.verMapa', function (e) {
    //e.preventDefault();
    let datos = e.target.parentElement.parentElement.getElementsByTagName('td');
    let origen = datos[0].getAttribute('value');
    let destino = datos[1].getAttribute('value');
    let coor_origen = origen.split(" ");
    let coor_destino = destino.split(" ");

    let latitudeOrigen = parseFloat(coor_origen[0]);
    let longitudeOrigen = parseFloat(coor_origen[1]);
    let latitudeDestino = parseFloat(coor_destino[0]);
    let longitudeDestino = parseFloat(coor_destino[1]);
    //swal("No puede comentar", "Debe iniciar session", "warning");
    graficarMapa(latitudeOrigen, longitudeOrigen, latitudeDestino, longitudeDestino);
});

var counter = 0;
var mymap = null;
var id, target, option;

function success(pos) {
    var crd = pos.coords;

    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        console.log('Congratulation, you reach the target');
        navigator.geolocation.clearWatch(id);
    }
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

target = {
    latitude: 0,
    longitude: 0,
}

options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};

function updateMapa() {
    $("#mapa").load(window.location.href + " #mapa");
}
var control;
function graficarMapa(latitudeOrigen, longitudeOrigen, latitudeDestino, longitudeDestino) {

    if (navigator.geolocation) {
        console.log("Graficando");
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(mymap);
            if (counter != 0) {
                // var rlayer = L.Routing.control({
                //     waypoints: [
                //         L.latLng(s[0], s[1]),
                //         L.latLng(e[0], e[1])
                //     ]
                // });
                // routesLayer.clearLayers();
                // routesLayer.addLayer(rlayer);
                control.getPlan().setWaypoints([]);
                control.hide();

            }
            control = L.Routing.control({
                waypoints: [
                    L.latLng(latitudeDestino, longitudeDestino),
                    L.latLng(latitudeOrigen, longitudeOrigen)
                ],
                language: 'es'
            }).addTo(mymap);
            counter += 1;

            // control.removeControl(mymap);
            // control.hide();


            //  control.show();
        });
    }
}
iniciarMapa();

function iniciarMapa() {
    if (navigator.geolocation) {
        console.log("Mapa inicializado");
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            mymap = L.map('mapa', {
                center: [latitude, longitude],
                zoom: 8
            });

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 15,
                attribution: 'Datos del mapa de &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imágenes © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11'
            }).addTo(mymap);

        });
    } else {
        mymap = L.map('mapa', {
            center: [-2.7397435, -78.86261],
            zoom: 17
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 15,
            attribution: 'Datos del mapa de &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imágenes © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11'
        }).addTo(mymap);

    }
}


function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'es,sp,ca,eu,gl,en,fr,it,pt,de', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true }, 'google_translate_element');
}