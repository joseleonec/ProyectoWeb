// codigo propio
class Ruta {
    constructor(origen, destino, descripcion, fechaUltimaSalida) {
        this.origen = origen;
        this.destino = destino;
        this.descripcion = descripcion;
        this.fechaUltimaSalida = fechaUltimaSalida;
    }
}

class UI {
    addRuta(ruta) {
        const registrosRutas = document.getElementById('registrosRutas');
        const element = document.createElement('tr');
        element.innerHTML = `
                <td>${ruta.origen}</td>
                <td>${ruta.destino}</td>
                <td>${ruta.descripcion}</td>
                <td>${ruta.fechaUltimaSalida}</td>
                <td>
                    <span class="table-remove">
                        <button name='delete' type="submit" class="btn btn-danger btn-rounded btn-sm my-0">
                            Eliminar
                        </button>
                    </span>
                </td>
        `;
        registrosRutas.appendChild(element);
        this.mostrarMensaje('Ruta regisrada con exito', 'success');
        // this.resetForm();

    }

    resetForm() {
        document.getElementById("formulario").reset();
    }
    eliminarRuta(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            registrosRutas
            this.mostrarMensaje('Ruta eliminada ', 'info');
            // $('#registrosRutas').trigger('update');
        }
    }

    mostrarMensaje(mensaje, cssClass) {
        // console.log("Mostrando mensaje");
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.container-fluid');
        const grupobotones = document.querySelector('#grupobotones');
        // container.insertBefore(div, grupobotones);
        container.appendChild(div);
        setTimeout(function() {
            div.remove();
        }, 100);
    }
}
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// ---------------------- CAPTURA DE EVENTOS -----------------------

// EVENTO INGRESO DE RUTAS
$(document).ready(function() {
    $("#btnguardar").click(function() {
        console.log("Evento capturado");
        const origen = document.getElementById("labelorigen").value;
        const destino = document.getElementById("labeldestino").value;
        const descripcion = document.getElementById("labeldescripcion").value;
        const fechaUltimaSalida = document.getElementById("labelfecha").value;
        const ruta = new Ruta(origen, destino, descripcion, fechaUltimaSalida);
        const ui = new UI();

        // Eliminamos el registro que indica que la tabla esta vacia

        // const ultimohijo = document.getElementById('registrosRutas')
        // if (ultimohijo.className === 'odd') {
        //     ultimohijo.removeChild(ultimohijo.lastElementChild);
        // }

        // Input User Validation
        if (origen === '' || destino === '' || descripcion === '') {
            ui.mostrarMensaje('Please Insert data in all fields', 'danger');
        } else {
            ui.addRuta(ruta);
            $('#exampleModal').modal('hide');
            // e.preventDefault();
        }

    });
    $('#exampleModal').on('hidden.bs.modal', function() {
        $(this).find('form')[0].reset();
    });
});

// document.getElementById("registrosRutas").addEventListener("click", function(e) {
//     // alert("Esta a punto de eliminar una ruta");
//     // alert(e.target);
//     console.log(e.target);
//     const ui = new UI();
//     ui.eliminarRuta(e.target);
// });