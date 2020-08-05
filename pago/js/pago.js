const urlCarrito = 'https://terminal25backend.herokuapp.com/carrito/';
const urlBoletos = 'https://terminal25backend.herokuapp.com/boleto/';
const urlItinerario = 'https://terminal25backend.herokuapp.com/itinerario/';
const urlUsuario = 'https://terminal25backend.herokuapp.com/usuario/';
const urlFactura = 'https://terminal25backend.herokuapp.com/factura/';
var idUsuario;
var idCarrito;
var email;
var usuario;
var factura;
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    // console.log("Verificando sesion");
    // if (user) {
    //     var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
    //     email = user.email;
    //     console.log(email.toString());
    //     fetch(userURL + user.email.toString()).then(function (response) {
    //         return response.json();
    //     }).then(function (x) {
    //         usuario = x;
    //     }).catch(function () {
    //         console.log("Error al hallar el usuario");
    //     });
    //     fetch('https://terminal25backend.herokuapp.com/carrito/idusuario=' + usuario.idUsuario + '/estado=PENDIENTE').then(function (response) {
    //         return response.json();
    //     }).then(function (cart) {
    //         idCarrito = cart.idCarrito;
    //     }).catch(function () {
    //         console.log("Error al hallar el ID de usuario");
    //     });
    // } else {
    //     window.location.href = "login.html";
    //     console.log("compras no hay usuario");
    // }
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
var tablaDetalleHTMNL;
$(document).ready(function () {
    datatableDetalle = $('#tabla-detalle').DataTable({
        "sDom": 'lrtip',
        "searching": false,
        "paging": false,
        "info": false
    });
    cargarDetalle(datatableDetalle);
});

function cargarDetalle(datatableDetalle) {
    var subtotal = 0;
    var total = 0;
    emailAuth.onAuthStateChanged(user => {
        // USUARIO_AUTH = user;
        console.log("Verificando sesion");
        if (user) {
            var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
            email = user.email;
            console.log(email.toString());
            fetch(userURL + user.email.toString()).then(function (response) {
                return response.json();
            }).then(function (x) {
                console.log(x);
                usuario = x;
                idUsuario = x.idUsuario;
                console.log(usuario);
                fetch('https://terminal25backend.herokuapp.com/carrito/idusuario=' + usuario.idUsuario + '/estado=PENDIENTE').then(function (response) {
                    return response.json();
                }).then(function (cart) {
                    idCarrito = cart[0].idCarrito;
                    console.log(cart);
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
                        tablaDetalleHTMNL = $('#resumen');
                        total = subtotal * 1.12;
                        total = parseInt(total * 100) / 100;
                        // total = total.toString(); //If it's not already a String
                        // total = total.slice(0, (total.indexOf(".")) + 3); //With 3 exposing the hundredths place
                        // Number(total); //If you need it back as a Number
                        document.querySelector('#pago-subtotal').innerText = subtotal;
                        document.querySelector('#pago-total').innerText = total;
                        var fecha = new Date().toJSON();
                        factura = {
                            // "idFactura": 1,
                            "fecha": fecha,
                            "total": total,
                            "usuario": usuario,
                            "carrito": cart[0]
                        }
                        POST(urlFactura,factura);
                        tablaDetalleHTMNL = $('#resumen');
                        console.log(tablaDetalleHTMNL);
                        console.log(factura);
                    });
                }).catch(function () {
                    console.log("Error al hallar el CARRITO");
                });
            }).catch(function () {
                console.log("Error al hallar boleto");
            });
        } else {
            window.location.href = "login.html";
            console.log("compras no hay usuario");
        }
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
        // generarCodigo();
        console.log(factura);
        POST(urlFactura, factura);
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

// function generarCodigo() {

//     emailAuth.onAuthStateChanged(user => {
//         // USUARIO_AUTH = user;
//         if (user) {
//             var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
//             console.log("pago sc: " + user.email);
//             fetch(userURL + user.email.toString()).then(function (response) {
//                 return response.json();
//             }).then(function (usuario) {
//                 idUsuario = usuario.idUsuario;
//                 console.log(idUsuario);
//                 fetch(urlCarrito + idCarrito).then(function (response) {
//                     return response.json();
//                 }).then(function (carrito) {
//                     var fecha = new Date().toJSON();
//                     console.log(fecha)
//                     var total = document.querySelector('#pago-total').innerText;
//                     var factura = {
//                         // "idFactura": 1,
//                         "fecha": fecha,
//                         "total": total,
//                         "usuario": usuario,
//                         "carrito": carrito
//                     }
//                     POST(urlFactura, factura);
//                 }).catch(function () {
//                     console.log("Error al Llenar la tabla");
//                 });
//             }).catch(function () {
//                 console.log("Error al hallar el ID de usuario");
//             });
//         }
//     });
// }

function setProgreso(actual) {
    var i, vectorCirculos = document.getElementsByClassName("barr");
    $("#Barra>ul>li.actual").removeClass("actual");
    $("#Barra>ul>li.active").removeClass("active");
    for (i = 0; i < actual; i++) {
        vectorCirculos[i].classList.add("active");
    }
    vectorCirculos[actual].classList.add("actual");
}