function volver_a_inicio() {
    // alert("Gracias por visitar nuestra pagina, nos vamos a el mirador de la serrania")
    location.href = "../index.html"
}
var busqueda = document.getElementById("busqueda");
var alerta_campo = document.getElementById("alerta-campo");
var buscar_campo = document.getElementById("demo");

busqueda.addEventListener('submit', function (e) {
    e.preventDefault();

    var valor_a_buscar = document.getElementById("txt_buscar").value;
    if (valor_a_buscar != "") {
        //document.getElementById("demo").innerHTML = "Buscando..."; //colocar valores en una etiqueta
        buscar_campo.innerHTML = `<p class="temporal alerta_busqueda">Buscando...</p>`;
        document.getElementById("demo").style.color = "blue";
        setTimeout(function () { document.querySelector('.temporal').remove(); }, 2000);
    } else {
        alerta_campo.innerHTML = `<div class="alert alert-info" role="alert">
        <strong>Ingresa el nombre de una cooperativa</strong></div>`;
        setTimeout(function () { document.querySelector('.alert').remove(); }, 3000);
    }
})

/*
$(document).ready(function () {
    $('#txt_buscar').keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        //let tabla = document.getElementById("tabla_coop_public");
        $.each($('#tabla_coop_public tbody tr'), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
});*/


function doSearch() {
    const tableReg = document.getElementById('tabla_coop_public');
    const searchText = document.getElementById('txt_buscar').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        td.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "");
    } else {
        lastTR.classList.add("red");
        td.innerHTML = "No se han encontrado coincidencias";
    }
}
