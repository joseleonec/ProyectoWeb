const urlCarrito = 'https://terminal25backend.herokuapp.com/carrito/';
const urlBoletos = 'https://terminal25backend.herokuapp.com/boleto/';
const urlItinerario = 'https://terminal25backend.herokuapp.com/itinerario/';
const urlUsuario = 'https://terminal25backend.herokuapp.com/usuario/';
const urlFactura = 'https://terminal25backend.herokuapp.com/factura/';
var idUsuario;
var idCarrito;
var email;
var usuario;
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    if (user) {
        email = user.email;
        fetch(userURL + user.email.toString()).then(function (response) {
            return response.json();
        }).then(function (x) {
            usuario = x;
        }).catch(function () {
            console.log("Error al hallar el ID de usuario");
        });
    } else {
        window.location.href = "login.html";
        console.log("compras no hay usuario");
    }
});

function addRow(datatable, carrito) {
    datatable.row.add([carrito.idCarrito, carrito.fechaCreacion, carrito.estado]).draw();
}
// LLENAR TABLA


function llenarTabla(datatable) {
    fetch(urlCarrito + "idusuario=" + idUsuario).then(function (response) {
        return response.json();
    }).then(function (data) {
        data.forEach(i => {
            addRow(datatable, i);
        });
    }).catch(function () {
        console.log("Error al Llenar la tabla");
    });
}
var datatableDetalle;
$(document).ready(function () {
    datatableDetalle = $('#tabla-detalle').DataTable({
        "sDom": 'lrtip',
        "searching": false,
        "paging": false,
        "info": false
    });
    cargarDetalle(datatableDetalle);
    // generarCodigo(datatableDetalle);
});

function cargarDetalle(datatableDetalle) {
    var subtotal = 0;
    var total = 0;
    fetch(urlBoletos + "idcarrito=" + idCarrito).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        data.forEach(boleto => {
            console.log(boleto);
            idCarrito = boleto.carrito.idCarrito;
            datatableDetalle.row.add(
                [
                    boleto.itinerario.viaje.origen,
                    boleto.itinerario.viaje.destino.nombre,
                    boleto.cantidadDeAsientos,
                    boleto.costo
                ]
            ).draw();
            subtotal += boleto.costo;
            subtotal = parseInt(subtotal * 100) / 100;
        });

        total = subtotal * 1.12;
        total = parseInt(total * 100) / 100;
        // total = total.toString(); //If it's not already a String
        // total = total.slice(0, (total.indexOf(".")) + 3); //With 3 exposing the hundredths place
        // Number(total); //If you need it back as a Number
        document.querySelector('#pago-subtotal').innerText = subtotal;
        document.querySelector('#pago-total').innerText = total;
    });
}

// BARRA DE PROGRESO
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//--------TAB MENU-------
// Current tab is set to be the first tab (0)
// Display the current tab
var currentTab = 1;
showTab(currentTab);

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:

    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
    setProgreso(currentTab);
}

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 1) {
        document.getElementById("prevBtn").style.display = "none"; //oculta el boton antterior
    } else {
        document.getElementById("prevBtn").style.display = "inline"; //muestra el boton antterior
    }

    if (n == (x.length - 1)) { //llega al final de los tabs
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";
        generarCodigo();
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function generarCodigo() {

    emailAuth.onAuthStateChanged(user => {
        // USUARIO_AUTH = user;
        if (user) {
            var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
            console.log("pago sc: " + user.email);
            fetch(userURL + user.email.toString()).then(function (response) {
                return response.json();
            }).then(function (usuario) {
                idUsuario = usuario.idUsuario;
                console.log(idUsuario);
                fetch(urlCarrito + idCarrito).then(function (response) {
                    return response.json();
                }).then(function (carrito) {
                    var fecha = new Date().toJSON();
                    console.log(fecha)
                    var total = document.querySelector('#pago-total').innerText;
                    var factura = {
                        // "idFactura": 1,
                        "fecha": fecha,
                        "total": total,
                        "usuario": usuario,
                        "carrito": carrito
                    }
                    POST(urlFactura, factura);
                }).catch(function () {
                    console.log("Error al Llenar la tabla");
                });
            }).catch(function () {
                console.log("Error al hallar el ID de usuario");
            });
        }
    });

    var factura = {
        // "idFactura": 1,
        "fecha": "2017-10-17T05:53:55.000+00:00",
        "total": 65.92,
        "usuario": {
            "idUsuario": 4,
            "nickname": "eastwoold",
            "password": "futuro",
            "saldo": 0.0,
            "nombre": "Marty",
            "apellido": "McFly",
            "cedula": "0112347673",
            "email": "martydoc@gmail.com",
            "hibernateLazyInitializer": {}
        },
        "carrito": {
            "idCarrito": 1,
            "estado": "PENDIENTE",
            "fechaCreacion": "2019-03-01T10:13:00.000+00:00"
        }
    }
}

function setProgreso(actual) {
    var i, vectorCirculos = document.getElementsByClassName("barr");
    $("#Barra>ul>li.actual").removeClass("actual");
    $("#Barra>ul>li.active").removeClass("active");
    for (i = 0; i < actual; i++) {
        vectorCirculos[i].classList.add("active");
    }
    vectorCirculos[actual].classList.add("actual");
}