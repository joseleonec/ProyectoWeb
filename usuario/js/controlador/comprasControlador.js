const url = 'https://terminal25backend.herokuapp.com/factura/';
const urlCounter = 'https://terminal25backend.herokuapp.com/boleto/count/'
const urlCarritos = 'https://terminal25backend.herokuapp.com/carrito/idusuario=';
const urlBoletos = 'https://terminal25backend.herokuapp.com/boleto/';
const urlItinerario = 'https://terminal25backend.herokuapp.com/itinerario/';
var idUsuario;
var USUARIO;
function addRow(datatable, factura) {
    var fecha = factura.fecha.slice(0, 16).replace(/T/g, ' ');
    fecha = new Date(fecha).toString().split("G")[0];
    var token = "idcarrito=" + factura.carrito.idCarrito;
    fetch(urlCounter + token).then(function (response) {
        return response.json();
    }).then(function (data) {
        const boletos = data;
        datatable.row.add([factura.idFactura, fecha, factura.carrito.idCarrito, boletos, "$ " + factura.total]).draw();
    }).catch(function () {
        console.log("Error al Llenar la tabla");
    });
}

function llenarTabla(datatable) {
    var token = "idusuario=" + idUsuario;
    fetch(url + token).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("Data facturas");
        console.log(data);
        data.forEach(i => {
            addRow(datatable, i);
            // console.log(i.nombre);
        });
    }).catch(function () {
        console.log("Error al Llenar la tabla");
    });
}

$(document).ready(function () {

    var datatable = $('#tablaCompras').DataTable({
        "info": false,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": `
            <button name="edit" type="submit" class="btn btn-info btn-rounded btn-sm my-0" 
            data-toggle="modal" data-target="#exampleModal">
                Detalle
            </button>
                <button name="qr" class="btn btn-sm btn-secondary qr">
                    Descargar QR
                </button>
            `
        }]
    });
    var datatableBoletos = $('#tablaBoletos').DataTable({
        "sDom": 'lrtip',
        "bSort": false,
        "searching": false,
        "paging": false,
        "info": false
    });
    // LLENAR TABLA
    emailAuth.onAuthStateChanged(user => {
        // USUARIO_AUTH = user;
        if (user) {
            var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
            console.log("Compras sc: " + user.email);
            fetch(userURL + user.email.toString()).then(function (response) {
                return response.json();
            }).then(function (data) {
                idUsuario = data.idUsuario;
                USUARIO = data;
                console.log("compras usuario: " + idUsuario);
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

    // Reset modal form after close
    $('#exampleModal').on('hidden.bs.modal', function () {
        //  $(this).find('form')[0].reset();
        datatableBoletos.clear().draw();

        document.querySelector('#nombre-cliente').innerHTML = `<span>CLIENTE: </span>`;
        document.querySelector('#email-cliente').innerHTML = `<span>EMAIL: </span>`;
        document.querySelector('#fecha-factura').innerHTML = `<span>DATE: </span> `;
    });

    //modal show
    $('#exampleModal').on('show.bs.modal', function (event) {
        const datos = event.relatedTarget.parentElement.parentElement.getElementsByTagName('td');
        // console.log(datos[0]);
        const idCarrito = datos[2].innerText;
        const fechaCompraa = datos[1].innerText;
        var modal = $(this)
        modal.find('.modal-title').text('Carrito');
        var title = document.querySelector("#exampleModalLabel");
        title.name = idCarrito;
        title.innerText += " " + title.name;
        var total = 0;
        var subtotal = 0;
        fetch(urlBoletos + "idcarrito=" + idCarrito).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data.status);
            data.forEach(boleto => {
                console.log(boleto.costo);
                datatableBoletos.row.add(
                    [
                        boleto.idBoleto,
                        boleto.itinerario.viaje.origen,
                        boleto.itinerario.viaje.destino.nombre,
                        parseInt((boleto.costo / boleto.cantidadDeAsientos) * 100) / 100,
                        boleto.cantidadDeAsientos,
                        boleto.costo
                    ]
                ).draw();
                subtotal += boleto.costo;
                subtotal = parseInt(subtotal * 100) / 100;
            });
            total = subtotal * 1.12;
            total = parseInt(total * 100) / 100;
            // var date = (new Date()).toString().split(" ");
            var date = datos[1].innerText.split(" ");
            // var fecha = new Date();
            // var options = { year: 'numeric', month: 'long', day: 'numeric' };

            // console.log(
            //     fecha.toLocaleDateString("es-ES", options)
            // );
            document.querySelector('#nombre-cliente').innerText += "\t" + USUARIO.nombre + " " + USUARIO.apellido;
            document.querySelector('#email-cliente').innerText += "\t" + USUARIO.email;
            document.querySelector('#fecha-factura').innerText += "\t" + date[0] + " " + date[1] + " " + date[2] + " " + date[3];

            document.querySelector('#pago-subtotal').innerText = subtotal;
            document.querySelector('#iva').innerText = parseInt((subtotal * 0.12) * 100) / 100;
            document.querySelector('#pago-total').innerText = total;

        });
    });
    // DESCARGA DE DOCUMENTOS
    datatable.on('click', 'tbody tr', function (e) {
        const botonname = e.target.name;
        const columns = e.target.parentElement.parentElement.getElementsByTagName('td');
        const ID = columns[2].innerText;
        if (botonname === 'pdf') {
            console.log(this);
            // mostrarMensaje('Elemento eliminado ', 'info');
            var form = $('.div'),
                cache_width = form.width(),
                a4 = [595.28, 841.89]; // for a4 size paper width and height  

            console.log(this);
            console.log(this);
            $('body').scrollTop(0);
            console.log("sssssssss");
            createPDF();
            mostrarMensaje('Elemento eliminado ', 'info');

        } else if (botonname === 'qr') {
            let urlQr = "https://prebaflaskqr589.herokuapp.com/boleto/";
            fetch(urlQr + ID + ".png")
                .then(res => res.blob())
                .then(blob => {
                    var file = window.URL.createObjectURL(blob);
                    // window.location.assign(file);
                    // document.execCommand('SaveAs','true',file);
                    window.open(file);
                    // window.open("https://prebaflaskqr589.herokuapp.com/boleto/1.png",'_blank');
                });
            console.log(this);
            // console.log(datos[1]);
        }
    });
    var botonGetPDF = document.querySelector('#getPDF');
    botonGetPDF.addEventListener('click', () => {
        console.log(this);
        const element = document.getElementById("detalleFactura");
        // Choose the element and save the PDF for our user.
        html2pdf()
            .set({ html2canvas: { scale: 4 } })
            .from(element)
            .save();

        console.log(this);
        console.log(this);
        $('body').scrollTop(0);
        console.log("sssssssss");
        createPDF();
        mostrarMensaje('Elemento eliminado ', 'info');
    });
});

// var
//     form = $('#tablaBoletos'),
//     cache_width = form.width(),
//     a4 = [595.28, 841.89]; // for a4 size paper width and height  

function createPDF() {
    getCanvas().then(function (canvas) {
        var
            img = canvas.toDataURL("image/png"),
            doc = new jsPDF({
                unit: 'px',
                format: 'a4'
            });
        doc.addImage(img, 'JPEG', 50, 50);
        // doc.save('Bhavdip-html-to-pdf.pdf');
        form.width(cache_width);
    });
}

// create canvas object  
function getCanvas() {
    form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
    return html2canvas(form, {
        imageTimeout: 2000,
        removeContainer: true
    });
}

/* 
* jQuery helper plugin for examples and tests 
*/
(function ($) {
    $.fn.html2canvas = function (options) {
        var date = new Date(),
            $message = null,
            timeoutTimer = false,
            timer = date.getTime();
        html2canvas.logging = options && options.logging;
        html2canvas.Preload(this[0], $.extend({
            complete: function (images) {
                var queue = html2canvas.Parse(this[0], images, options),
                    $canvas = $(html2canvas.Renderer(queue, options)),
                    finishTime = new Date();

                $canvas.css({ position: 'absolute', left: 0, top: 0 }).appendTo(document.body);
                $canvas.siblings().toggle();

                $(window).click(function () {
                    if (!$canvas.is(':visible')) {
                        $canvas.toggle().siblings().toggle();
                        throwMessage("Canvas Render visible");
                    } else {
                        $canvas.siblings().toggle();
                        $canvas.toggle();
                        throwMessage("Canvas Render hidden");
                    }
                });
                throwMessage('Screenshot created in ' + ((finishTime.getTime() - timer) / 1000) + " seconds<br />", 4000);
            }
        }, options));

        function throwMessage(msg, duration) {
            window.clearTimeout(timeoutTimer);
            timeoutTimer = window.setTimeout(function () {
                $message.fadeOut(function () {
                    $message.remove();
                });
            }, duration || 2000);
            if ($message)
                $message.remove();
            $message = $('<div ></div>').html(msg).css({
                margin: 0,
                padding: 10,
                background: "#000",
                opacity: 0.7,
                position: "fixed",
                top: 10,
                right: 10,
                fontFamily: 'Tahoma',
                color: '#fff',
                fontSize: 12,
                borderRadius: 12,
                width: 'auto',
                height: 'auto',
                textAlign: 'center',
                textDecoration: 'none'
            }).hide().fadeIn().appendTo('body');
        }
    };
})(jQuery);
