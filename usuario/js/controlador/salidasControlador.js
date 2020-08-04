const url = 'https://terminal25backend.herokuapp.com/itinerario/';

function addRow(datatable, itinerario) {
    datatable.row.add([itinerario.viaje.origen,
    itinerario.viaje.destino.nombre,
    itinerario.agencia.nombre, itinerario.bus.placa, itinerario.horaSalida
    ]).draw();
}

function llenarTabla(datatable) {
    // OBTENER FECHA ACTUAL
    // 2020-07-30
    // var fecha = new Date(2020, 06, 30).toJSON().slice(0, 10);
    var fecha = new Date().toJSON().slice(0, 10);
    console.log(fecha)
    const token = "fecha=" + fecha.toString();;
    console.log(token);
    fetch(url + token).then(function (response) {
        return response.json();
    }).then(function (data) {
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

    var datatable = $('#tableSalidas').DataTable({
        // "columnDefs": [{
        //     "targets": -1,
        //     "data": null
        // }]
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
                // LLENAR TABLA
                llenarTabla(datatable);
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
    $("#btn-guardar-empresa").click(function () {
        // console.log("Evento capturado");
        const id = document.getElementById("labelid").value.toUpperCase();
        const razonSocial = document.getElementById("labelRazonSocial").value.toUpperCase();
        const CostoKgExtra = document.getElementById("labelCostoKgExtra").value.toUpperCase();
        const PesoMaximo = document.getElementById("labelPesoMaximo").value.toUpperCase();
        // Eliminamos el registro que indica que la tabla esta vacia
        // Input User Validation
        if (id === '' || razonSocial === '' || CostoKgExtra === '' || PesoMaximo === '') {
            mostrarMensaje('Please Insert data in all fields', 'danger');
        } else {
            const data = {
                "idEmpresa": id,
                "razonSocial": razonSocial,
                "costoKgExtra": CostoKgExtra,
                "pesoMaximoDelPaquete": PesoMaximo
            }
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
    $('#exampleModal').on('hidden.bs.modal', function () {
        $(this).find('form')[0].reset();
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
        } else if (botonname === 'edit') {
            // console.log(datos[1]);
            document.getElementById("labelid").readOnly = true;
            document.getElementById("labelid").value = columns[0].innerText;
            document.getElementById("labelRazonSocial").value = columns[1].innerText;
            document.getElementById("labelCostoKgExtra").value = columns[2].innerText;
            document.getElementById("labelPesoMaximo").value = columns[3].innerText;
            // Eliminamos el registro que indica que la tabla esta vacia
        }
    });
});