const url = 'https://terminal25backend.herokuapp.com/boleto/';

var idUsuario;
var USUARIO;
function addRow(datatable, boleto) {
    const span = document.createElement('span');
    datatable.row.add([boleto.idSolicitud, boleto.idProducto, boleto.idFactura,
    boleto.idCliente, boleto.fechaDeRegistro,
    boleto.motivoDevolucion, boleto.estadoAprobacion, span
    ]).draw();
}


function llenarTabla(datatable) {
    fetch(url + "idusuario=" + idUsuario).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data.status);
        data.forEach(boleto => {
            console.log(boleto.costo);
            datatable.row.add(
                [
                    boleto.itinerario.viaje.origen,
                    boleto.itinerario.viaje.destino.nombre,
                    boleto.itinerario.agencia.nombre,
                    boleto.itinerario.fechaSalida,
                ]
            ).draw();

        });
    });
}


$(document).ready(function () {

    var datatable = $('#tablaSolicitud').DataTable();

    emailAuth.onAuthStateChanged(user => {
        // USUARIO_AUTH = user;
        if (user) {
            var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
            console.log("Viajes sc: " + user.email);
            fetch(userURL + user.email.toString()).then(function (response) {
                return response.json();
            }).then(function (data) {
                idUsuario = data.idUsuario;
                USUARIO = data;
                console.log("Viajes usuario: " + idUsuario);
                llenarTabla(datatable);
                document.getElementById("logedas").innerText = data.nickname;
                // iniciar();
            }).catch(function () {
                console.log("Error al hallar el ID de usuario");
            });
        } else {
            window.location.href = "login.html";
            console.log("compras no hay usuario");
        }
    });

});