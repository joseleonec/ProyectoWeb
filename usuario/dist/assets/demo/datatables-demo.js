// Call the dataTables jQuery plugin
$(document).ready(function() {

    var myTable = $('#dataTable').DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": `<button name='delete' class="btn btn-danger btn-rounded btn-sm my-0">
                Eliminar
            </button>`
        }]
    });


    myTable.on('click', 'tbody tr', function(e) {
        const a = e.target.name;
        if (a === 'delete') {
            // myTable.row(this).remove();
            myTable.row(this).remove().draw();
            const ui = new UI();
            ui.mostrarMensaje('Ruta eliminada ', 'info');
        }

    });
    var dataTableCompras = $('#dataTableCompras').DataTable();
    var dataTableViajes = $('#dataTableViajes').DataTable();
    var dataTableSalidas = $('#dataTableSalidas').DataTable();
    var dataTableReservas = $('#dataTableReservas').DataTable();
});