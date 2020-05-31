// Call the dataTables jQuery plugin
$(document).ready(function() {
    // $('#dataTable').DataTable();
    var myTable = $('#dataTable').DataTable();
    $('#dataTable').on('click', 'tbody tr', function(e) {
        const a = e.target.name;
        if (a === 'delete') {
            myTable.row(this).remove().draw();
            const ui = new UI();
            // myTable.row(this).remove().draw();
            ui.mostrarMensaje('Ruta eliminada ', 'info');
        }
    });
});