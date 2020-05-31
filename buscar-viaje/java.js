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
    console.log(valor_a_buscar);
    if (valor_a_buscar != "") {
        //document.getElementById("demo").innerHTML = "Buscando..."; //colocar valores en una etiqueta
        buscar_campo.innerHTML = `<p class="temporal">Buscando...</p>`;
        document.getElementById("demo").style.color = "blue";
        setTimeout(function () { document.querySelector('.temporal').remove(); }, 2000);
    } else {
        alerta_campo.innerHTML = `<div class="alert alert-info" role="alert">
        <strong>Ingresa el nombre de una coopertativa</strong></div>`;
        setTimeout(function () { document.querySelector('.alert').remove(); }, 3000);
    }
})



