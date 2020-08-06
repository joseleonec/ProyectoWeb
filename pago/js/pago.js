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

document.getElementById("descripcion1").style.display = "none";
document.getElementById("descripcion2").style.display = "none";
document.getElementById("descripcion3").style.display = "none";

emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    // console.log("Verificando sesion");
    //if (user) {
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
    /*     } else {
            console.log("compras no hay usuario");
            window.location.href = "login.html";
        } */
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
        "bSort": true,
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
                        POST(urlFactura, factura);
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
            window.location.href = "../usuario/login.html";
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
        generarCodigo(1);
        document.getElementById("descripcion1").style.display = "inline";
        document.getElementById("descripcion2").style.display = "inline";
        document.getElementById("descripcion3").style.display = "inline";
        console.log("Fin tabs");
        //console.log(factura);
        //POST(urlFactura, factura);

    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
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

function generarCodigo(idFactura) {
    ///metodo POST
    let url = "https://prebaflaskqr589.herokuapp.com/" + idFactura;
    fetch(url, {
        method: 'POST',
        redirect: 'follow'
    }).then(function (response) {
        return response.text();
    }).then(function (urlB) {
        console.log("Codigo obtenido: " + urlB);
        ///Obtener codigo qr------
        let urlBoleto = urlB;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(urlBoleto, requestOptions).then(function (response) {
            return response.blob();
        }).then(function (data) {
            console.log("Codigo obtenido: " + data);
            //--------Enviar al correo
            //Se agrega el link al contenedor para mostrar en la pagina final
            var linkEn = document.getElementById("descripcion2");
            linkEn.setAttribute('href', `${urlBoleto}`);
            //Se agrega la imagen al contenedor para mostrar en la pagina final
            var container = document.getElementById('descripcion4');
            var imgElem = document.createElement('img');
            container.appendChild(imgElem);
            var imgUrl = URL.createObjectURL(data);
            imgElem.src = imgUrl;//esta es la imagen
            imgElem.width = "250";
            imgElem.height = "250";
            //container.innerHTML = imgElem; //container.appendChild(imgElem);
            //---------------------------------------------------------------
            //Se agrega el link a la tabla que se enviara al correo.
            var link = document.getElementById("urlBoletoQR");
            link.setAttribute('href', `${urlBoleto}`);
            //link.innerHTML = `Descargue el codigo QR desde aqui: ${urlBoleto}`;
            //Contenedor que se enviara al correo
            var Cont = document.getElementById("resumenM"); //esta se va al correo
            var Conti = document.getElementById("resumen");
            console.log(Conti,innerWidth);
            //var element = document.getElementById("description");
            //element.setAttribute('value', Cont.innerText);
            //element.innerHTML = `${Cont.innerHTML}`;

            document.getElementById("inputEmail").setAttribute('value', email);
            document.getElementById("inputHtml").innerHTML = `${Cont.innerHTML}`;

            //setAttribute('value', `${Cont.innerHTML}`);
            var parametros = {
                "btnEnviar": "envia",
                "EmailDestino": email,
                "html": `${Cont.innerHTML}`
            };
            console.log("Aqui se envia");
            //console.log(`${Cont.innerHTML}`);
            /*$.ajax({
                data: parametros,
                //url: 'correo/correo.php',
                url: 'index.php',
                type: 'post',
                beforeSend: function () {
                    console.log("Enviando correo ...");
                }, success: function (response) {
                    console.log("Correo enviado");
                    swal("Gracias por tu compra", "La factura y el codigo QR se lo enviamos al correo", "success");
                }
            }); 
            */
            //------------------
        }).catch(err => {
            console.log("Error al obtener el codigo");
        });
        //---------------------
    }).catch(err => {
        console.log("Error al generar fact");
    });
}

function stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
