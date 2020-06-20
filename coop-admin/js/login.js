function ir_a_inicio() {
    // alert("Gracias por visitar nuestra pagina")
    location.href = "./inicio.html"
}

//Click en el boton iniciar
$("#iniciar").click(function (e) {
    e.preventDefault();
    var user = document.getElementById("user-admin").value;
    var pass = document.getElementById("pass-admin").value;
    var alerta = document.getElementById("alerta");
   
    if (user != "" && pass != "") {
        //document.getElementById("demo").innerHTML = "Buscando..."; //colocar valores en una etiqueta
        alerta.innerHTML = `<p class="temporal">Ingresando...</p>`;
        document.getElementById("alerta").style.color = "green";
        setTimeout(function () { document.querySelector('.temporal').remove(); }, 2000);
        ir_a_inicio();
    } else {
        alerta.innerHTML = `<div class="alert alert-danger" role="alert">
        <strong>Llene los campos</strong></div>`;
        setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
    }
});