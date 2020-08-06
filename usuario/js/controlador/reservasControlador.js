const urlCarritos = 'https://terminal25backend.herokuapp.com/carrito/idusuario=';
const urlBoletos = 'https://terminal25backend.herokuapp.com/boleto/';
const urlItinerario = 'https://terminal25backend.herokuapp.com/itinerario/';

var idUsuario;

function addRow(datatable, carrito) {
    datatable.row.add([carrito.idCarrito, carrito.fechaCreacion, carrito.estado]).draw();
}

function llenarTabla(datatable) {
    fetch(urlCarritos + idUsuario).then(function (response) {
        return response.json();
    }).then(function (data) {
        data.forEach(i => {
            addRow(datatable, i);
        });
    }).catch(function () {
        console.log("Error al Llenar la tabla");
    });
}
function llenarTablaBoletos(datatableBoletos, idCarrito) {
    fetch(urlBoletos + "idcarrito=" + idCarrito).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data.status);
        var total = 0;
        var subtotal = 0;
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
            console.log(urlBoletos + idBoleto);
            const costoBoletoEliminado = columns[7].innerText;
            var subtotal = parseFloat(document.querySelector('#pago-subtotal').innerText);
            subtotal -= costoBoletoEliminado;
            var total = subtotal * 1.12;
            total = parseInt(total * 100) / 100;
            subtotal = parseInt(subtotal * 100) / 100;
            console.log(urlBoletos + idBoleto);
            // DELETE(urlBoletos, idBoleto);
            datatableBoletos.row(this).remove().draw();
            document.querySelector('#pago-subtotal').innerText = subtotal;
            document.querySelector('#pago-total').innerText = total;
        }
    });

    // CARGAR DATOS DE USUARIO LOGEADO
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
        if (estado != "PENDIENTE") {
            document.querySelector("#finalizar").disabled = true;
            document.querySelector("#agregar-boletos").disabled = true;
        }
        llenarTablaBoletos(datatableBoletos, idCarrito);
    });

    // DELETE CARRITO
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
    // FINALIZAR CARRITO
    var botonfinalizar = document.querySelector('#finalizar');
    botonfinalizar.addEventListener('click', () => {
        window.location.href = "../pago/index.html";
    });

    // SEGUIR COMPRANDO
    var botonfinalizar = document.querySelector('#agregar-boletos');
    botonfinalizar.addEventListener('click', () => {
        window.location.href = "../buscar-viaje/index.html";
    });
});

