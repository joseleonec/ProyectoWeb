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
});
*/