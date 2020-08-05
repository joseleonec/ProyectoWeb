const url = 'https://terminal25backend.herokuapp.com/factura/';
const urlCounter = 'https://terminal25backend.herokuapp.com/boleto/count/'
var idUsuario;

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

    // var datatable = $('#tablaCompras').DataTable({
    //     "sDom": 'lrtip',
    //     "searching": false,
    //     "paging": false,
    //     "info": false,
    //     "columnDefs": [{
    //         "targets": -1,
    //         "data": null,
    //         "defaultContent": `
    //                 <button name="delete" class="btn btn-sm btn-danger">
    //                     <i class="fa fa-trash"></i>
    //                 </button>
    //             `
    //     }]
    // });
    var datatable = $('#tablaCompras').DataTable({
        "info": false,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": `
                    <button name="pdf" class="btn btn-sm btn-danger">
                        Descargar PDF
                    </button>
                <button name="qr" class="btn btn-sm btn-secondary">
                    Descargar QR
                </button>
            `
        }]
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

    // POST
    $("#btn-guardar-parroquia").click(function () {
        ``
        // console.log("Evento capturado");
        const id = document.getElementById("labelid").value.toUpperCase();
        const nombreParroquia = document.getElementById("labelnombreParroquia").value.toUpperCase();
        // Eliminamos el registro que indica que la tabla esta vacia
        // Input User Validation
        if (id === '' || nombreParroquia === '') {
            mostrarMensaje('Asegurese de llenar todos los campos', 'danger');
        } else {
            const data = {
                "idEmpresa": id,
                "nombreParroquia": nombreParroquia
            }
            if (document.getElementById("labelid").readOnly) {
                PUT(url, data);
                vaciarTabla(datatable);
                llenarTabla(datatable);
            } else {
                POST(url, data);
                vaciarTabla(datatable)
                llenarTabla(datatable);
                addRow(datatable, data);
            }
            $('#exampleModal').modal('hide');
            mostrarMensaje('Elemento regisrado con exito', 'success');
        }
    });
    $('#exampleModal').on('hidden.bs.modal', function () {
        $(this).find('form')[0].reset();
    });
    // DELETE
    datatable.on('click', 'tbody tr', function (e) {
        const botonname = e.target.name;
        const columns = e.target.parentElement.parentElement.getElementsByTagName('td');
        const ID = columns[0].innerText;
        if (botonname === 'pdf') {
            console.log(this);
            mostrarMensaje('Elemento eliminado ', 'info');
        } else if (botonname === 'qr') {
            let urlQr = "https://prebaflaskqr589.herokuapp.com/boleto/";
            // fetch(urlQr + ID + ".png").then(function (response) {
            //     return response.text();
            // }).then(function (data) {
            //     console.log("Codigo obtenido: " + data);
            // }).catch(err => {
            //     console.log("Error al obtener: " + err);
            // });
            fetch(urlQr + "1" + ".png")
            .then(function (resp) {
                return resp.blob();
            }).then(function (blob) {
                download(blob);
            });
            console.log(urlQr + "1" + ".png");


            console.log(this);
            // console.log(datos[1]);
            document.getElementById("labelid").readOnly = true;
            document.getElementById("labelid").value = columns[0].innerText;
            document.getElementById("labelnombreParroquia").value = columns[1].innerText;
            // Eliminamos el registro que indica que la tabla esta vacia
        }
    });
});