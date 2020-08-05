const urlCarritos = 'https://terminal25backend.herokuapp.com/carrito/idusuario=';
const urlBoletos = 'https://terminal25backend.herokuapp.com/boleto/';
const urlItinerario = 'https://terminal25backend.herokuapp.com/itinerario/';

var idUsuario;

function addRow(datatable, carrito) {
    datatable.row.add([carrito.idCarrito, carrito.fechaCreacion, carrito.estado]).draw();
}

function llenarTabla(datatable) {
    fetch(urlCarrito + idUsuario).then(function (response) {
        return response.json();
    }).then(function (data) {
        data.forEach(i => {
            addRow(datatable, i);
        });
    }).catch(function () {
        console.log("Error al Llenar la tabla");
    });
}

$(document).ready(function () {

    var datatableGeneral = $('#tablaReservas').DataTable({
        "info": false,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": `
                    <button name="edit" type="submit"
                        class="btn btn-info btn-rounded btn-sm my-0" data-toggle="modal" data-target="#exampleModal">
                        Ver
                    </button>
                    <button name='delete' class="btn btn-danger btn-rounded btn-sm my-0" >
                        Eliminar
                    </button>`
        }]
    });
    var datatableBoletos = $('#tablaBoletos').DataTable({
        "sDom": 'lrtip',
        "searching": false,
        "paging": false,
        "info": false,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": `
                    <button name="delete" class="btn btn-sm btn-danger">
                        <i class="fa fa-trash"></i>
                    </button>
                `
        }]
    });

    // DELETE BOLETO
    datatableBoletos.on('click', 'tbody tr', function (e) {
        const botonname = e.target.name;
        if (botonname === 'delete') {
            const columns = e.target.parentElement.parentElement.getElementsByTagName('td');
            const idBoleto = columns[0].innerText;
            datatableBoletos.row(this).remove().draw();
            DELETE(urlBoletos, idBoleto);
        }
    });

    emailAuth.onAuthStateChanged(user => {
        // USUARIO_AUTH = user;
        if (user) {
            var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
            console.log("Reservas sc: " + user.email);
            fetch(userURL + user.email.toString()).then(function (response) {
                return response.json();
            }).then(function (data) {
                idUsuario = data.idUsuario;
                console.log(idUsuario);
                llenarTabla(datatableGeneral);
                document.getElementById("logedas").innerText = data.nombre;
                // iniciar();
            }).catch(function () {
                console.log("Error al hallar el ID de usuario");
            });

        } else {
            window.location.href = "login.html";
            console.log("reservas no hay usuario");
        }
    });

    // POST
    // $("#btn-guardar-sustitucion").click(function () {
    //     // console.log("Evento capturado");
    //     const id = document.getElementById("labelid").value.toUpperCase();
    //     const idSolicitud = document.getElementById("labelidSolicitud").value.toUpperCase();
    //     const idProductoSustituto = document.getElementById("labelidProductoSustituto").value.toUpperCase();
    //     const monto = document.getElementById("labelmonto").value.toUpperCase();

    //     var solicitudDevolucion;
    //     fetch('https://springtest999.herokuapp.com/api/solicituddevolucion/' + idSolicitud).then(function (response) {
    //         return response.json();
    //     }).then(function (data) {
    //         solicitudDevolucion = data;
    //     }).catch(function () {
    //         console.log("Error al recuperar registro compuesto");
    //     });

    //     // Eliminamos el registro que indica que la tabla esta vacia
    //     // Input User Validation
    //     if (id === '' || idSolicitud === '' || idProductoSustituto === '' || monto === '' || solicitudDevolucion == null) {

    //         mostrarMensaje('Please Insert data in all fields', 'danger');
    //     } else {
    //         const data = {
    //             "idSustitucion": id,
    //             "solicitudDevolucion": solicitudDevolucion,
    //             "monto": monto,
    //             "autorizacionSRI": idProductoSustituto
    //         };
    //         if (document.getElementById("labelid").readOnly) {

    //             PUT(urlCarritos, data);
    //             vaciarTabla(datatableGeneral);
    //             llenarTabla(datatableGeneral);

    //         } else {

    //             POST(urlCarritos, data);
    //             addRow(datatableGeneral, data);
    //         }
    //         $('#exampleModal').modal('hide');
    //         mostrarMensaje('Elemento regisrado con exito', 'success');
    //     }
    // });
    // Reset modal form after close
    $('#exampleModal').on('hidden.bs.modal', function () {
        //  $(this).find('form')[0].reset();
        datatableBoletos.clear().draw();
    });

    //modal show
    $('#exampleModal').on('show.bs.modal', function (event) {
        const datos = event.relatedTarget.parentElement.parentElement.getElementsByTagName('td');
        // console.log(datos[0]);
        const idCarrito = datos[0].innerText;
        const estado = datos[2].innerText;
        var modal = $(this)
        modal.find('.modal-title').text('Carrito');
        var title = document.querySelector("#exampleModalLabel");
        title.name = idCarrito;
        title.innerText += " " + title.name;
        if (estado === "CADUCADO" || estado === "FINALIZADO") {
            document.querySelector("#finalizar").disabled = true;
            document.querySelector("#agregar-boletos").disabled = true;
        }
        var total = 0;
        var subtotal = 0;
        fetch(urlBoletos + "idcarrito=" + idCarrito).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data.status);
            data.forEach(boleto => {
                console.log(boleto);
                datatableBoletos.row.add(
                    [
                        boleto.idBoleto,
                        boleto.itinerario.idItinerario,
                        boleto.itinerario.viaje.origen,
                        boleto.itinerario.viaje.destino.nombre,
                        boleto.itinerario.agencia.nombre,
                        boleto.itinerario.viaje.nombreRuta,
                        boleto.cantidadDeAsientos,
                        boleto.costo
                    ]
                ).draw();
                subtotal += boleto.costo;
                subtotal = parseInt(subtotal * 100) / 100;
            });
            total = subtotal * 1.12;
            total = parseInt(total * 100) / 100;
            document.querySelector('#pago-subtotal').innerText = subtotal;
            document.querySelector('#pago-total').innerText = total;
        });
    });

    // DELETE
    datatableGeneral.on('click', 'tbody tr', function (e) {
        const botonname = e.target.name;
        const columns = e.target.parentElement.parentElement.getElementsByTagName('td');
        const ID = columns[0].innerText;
        if (botonname === 'delete') {
            DELETE(urlCarrito, ID);
            console.log(this);
            datatableGeneral.row(this).remove().draw();
            mostrarMensaje('Elemento eliminado ', 'info');
        }
    });

});