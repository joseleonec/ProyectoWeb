const url = 'https://terminal25backend.herokuapp.com/carrito/idusuario=';
var idUsuario;


function addRow(datatable, carrito) {
    datatable.row.add([carrito.idCarrito, carrito.fechaCreacion, carrito.estado]).draw();
}

function llenarTabla(datatable) {
    fetch(url + idUsuario).then(function (response) {
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
    var datatable = $('#tablaReservas').DataTable({
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

    var datatableCart = $('#tablaCarrito').DataTable({
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
                llenarTabla(datatable);
                document.getElementById("logedas").innerText = data.nombre;
                // iniciar();
            }).catch(function () {
                console.log("Error al hallar el ID de usuario");
            });

        } else {
            window.location.href = "../login.html";
            console.log("reservas no hay usuario");
        }
    });

    // POST
    $("#btn-guardar-sustitucion").click(function () {
        // console.log("Evento capturado");
        const id = document.getElementById("labelid").value.toUpperCase();
        const idSolicitud = document.getElementById("labelidSolicitud").value.toUpperCase();
        const idProductoSustituto = document.getElementById("labelidProductoSustituto").value.toUpperCase();
        const monto = document.getElementById("labelmonto").value.toUpperCase();

        var solicitudDevolucion;
        fetch('https://springtest999.herokuapp.com/api/solicituddevolucion/' + idSolicitud).then(function (response) {
            return response.json();
        }).then(function (data) {
            solicitudDevolucion = data;
        }).catch(function () {
            console.log("Error al recuperar registro compuesto");
        });

        // Eliminamos el registro que indica que la tabla esta vacia
        // Input User Validation
        if (id === '' || idSolicitud === '' || idProductoSustituto === '' || monto === '' || solicitudDevolucion == null) {

            mostrarMensaje('Please Insert data in all fields', 'danger');
        } else {
            const data = {
                "idSustitucion": id,
                "solicitudDevolucion": solicitudDevolucion,
                "monto": monto,
                "autorizacionSRI": idProductoSustituto
            };
            if (document.getElementById("labelid").readOnly) {

                PUT(url, data);
                vaciarTabla(datatable);
                llenarTabla(datatable);

            } else {

                POST(url, data);
                addRow(datatable, data);
            }
            $('#exampleModal').modal('hide');
            mostrarMensaje('Elemento regisrado con exito', 'success');
        }
    });
    // Reset modal form after close
    $('#exampleModal').on('hidden.bs.modal', function () {
        // $(this).find('form')[0].reset();
    });

    //modal show
    $('#exampleModal').on('show.bs.modal', function (event) {

        const datos = event.relatedTarget.parentElement.parentElement.getElementsByTagName('td');
        // console.log(datos[0]);
        const id = datos[0].innerText;
        // console.log("ID: ");
        // console.log(id);
        var modal = $(this)
        modal.find('.modal-title').text('Carrito');
        var title = document.querySelector("#exampleModalLabel");
        title.name = id;
        title.innerText += " " + title.name;
    });

    // DELETE
    datatable.on('click', 'tbody tr', function (e) {
        const botonname = e.target.name;
        const columns = e.target.parentElement.parentElement.getElementsByTagName('td');
        const ID = columns[0].innerText;
        if (botonname === 'delete') {
            DELETE(url, ID);
            console.log(this);
            datatable.row(this).remove().draw();
            mostrarMensaje('Elemento eliminado ', 'info');
        }
    });
});


