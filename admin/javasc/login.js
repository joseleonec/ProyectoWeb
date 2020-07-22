var USER = "admin";
var PASSWORD = "1234";
var alerta;

$(document).ready(function () {
    alerta = document.getElementById("alerta");
});

function ir_a_inicio() {
    // alert("Gracias por visitar nuestra pagina")
    location.href = "./inicio.html"
}

//Click en el boton iniciar
$("#iniciar").click(function (e) {
    e.preventDefault();
    let user = document.getElementById("user-inicio").value;
    let pass = document.getElementById("pass-inicio").value;

    if (user != "" && pass != "") {
        if (USER == user && PASSWORD == pass) {
            //document.getElementById("demo").innerHTML = "Buscando..."; //colocar valores en una etiqueta
            mostrarMensaje("Ingresando", "sucess");
            ir_a_inicio();
        } else {
            mostrarMensaje("Usuario no registrado", "danger");
        }
    } else {
        mostrarMensaje("Llene los campos", "danger");
    }
});

function mostrarMensaje(mensaje, tipo_alerta) {
    alerta.innerHTML = `<div class="alert alert-${tipo_alerta}" role="alert">
        <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}
