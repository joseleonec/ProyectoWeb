const url = 'https://terminal25backend.herokuapp.com/usuario/';

function addRow(datatable, solicitud) {
    const span = document.createElement('span');
    span.className = 'table-remove';
    span.innerHTML = `
        <span class="table-remove">
            <button name="delete" type="submit"
                class="btn btn-danger btn-rounded btn-sm my-0">
                Eliminar
            </button>
            <button name="edit" type="submit"
            class="btn btn-warning btn-rounded btn-sm my-0">
                Editar
            </button>
        </span>
            `;
    datatable.row.add([solicitud.idSolicitud, solicitud.idProducto, solicitud.idFactura,
        solicitud.idCliente, solicitud.fechaDeRegistro,
        solicitud.motivoDevolucion, solicitud.estadoAprobacion, span
    ]).draw();
}

function cargarCampos(idUsuario) {
    fetch(url + idUsuario).then(function(response) {
        return response.json();
    }).then(function(data) {
        // console.log(data);
        document.getElementById("idUsuario").value = data.idUsuario;
        document.getElementById("nombreusuario").value = data.nombre;
        document.getElementById("apellidousuario").value = data.apellido;
        document.getElementById("cedulausuario").value = data.cedula;
        document.getElementById("emailusuario").value = data.email;
        document.getElementById("nicknameusuario").value = data.nickname;

        document.getElementById("usuariosaldo").innerText = data.saldo;
        document.getElementById("logedas").innerText = data.nickname;
    }).catch(function() {
        console.log("Error en el metodo GET");
    });
}

$(document).ready(function() {

    idUsuario = 2;
    cargarCampos(idUsuario);


    // POST
    // $("#btn-guardar-solicitud").click(function() {
    //     // console.log("Evento capturado");
    //     const id = document.getElementById("labelid").value.toUpperCase();
    //     const idProducto = document.getElementById("labelidProducto").value.toUpperCase();
    //     const idFactura = document.getElementById("labelidFactura").value.toUpperCase();
    //     const idCliente = document.getElementById("labeliidCliente").value.toUpperCase();
    //     var fechaDeRegistro = document.getElementById("labelfechaDeRegistro").value.toUpperCase();
    //     fechaDeRegistro = fechaDeRegistro.split("T")[0] + " " + fechaDeRegistro.split("T")[1];
    //     const motivoDevolucion = document.getElementById("labelmotivoDevolucion").value.toUpperCase();
    //     const estadoAprobacion = document.getElementById("labelestadoAprobacion").value.toUpperCase();
    //     // Eliminamos el registro que indica que la tabla esta vacia
    //     // Input User Validation
    //     if (id === '' || idProducto === '' || idFactura === '' || idCliente === '' || fechaDeRegistro === '' || motivoDevolucion === '') {
    //         mostrarMensaje('Please Insert data in all fields', 'danger');
    //     } else {
    //         const data = {
    //             "idSolicitud": id,
    //             "idProducto": idProducto,
    //             "idFactura": idFactura,
    //             "idCliente": idCliente,
    //             "fechaDeRegistro": fechaDeRegistro,
    //             "motivoDevolucion": motivoDevolucion,
    //             "estadoAprobacion": estadoAprobacion
    //         }
    //         if (document.getElementById("labelid").readOnly) {

    //             PUT(url, data);
    //             vaciarTabla(datatable);
    //             llenarTabla(datatable);

    //         } else {

    //             POST(url, data);
    //             addRow(datatable, data);
    //         }
    //         $('#exampleModal').modal('hide');
    //         mostrarMensaje('Elemento regisrado con exito', 'success');
    //     }
    // });
    // $('#exampleModal').on('hidden.bs.modal', function() {
    //     $(this).find('form')[0].reset();
    // });

    // // DELETE
    // datatable.on('click', 'tbody tr', function(e) {
    //     const botonname = e.target.name;
    //     const columns = e.target.parentElement.parentElement.getElementsByTagName('td');
    //     const ID = columns[0].innerText;
    //     if (botonname === 'delete') {

    //         DELETE(url, ID);
    //         console.log(this);
    //         datatable.row(this).remove().draw();
    //         mostrarMensaje('Elemento eliminado ', 'info');

    //     } else if (botonname === 'edit') {
    //         document.getElementById("labelid").readOnly = true;
    //         document.getElementById("labelid").value = columns[0].innerText;

    //         document.getElementById("labelidUbicacion").value = columns[1].innerText;
    //         document.getElementById("labelidDespachador").value = columns[2].innerText;
    //         document.getElementById("labelidFactura").value = columns[3].innerText;

    //         document.getElementById("labelprioridad").value = columns[4].innerText;
    //         document.getElementById("labelestado").value = columns[5].innerText;
    //         document.getElementById("labelpesoKg").value = columns[6].innerText;
    //     }
    // });
});