var alerta;
var url_back = "https://terminal25backend.herokuapp.com/";

$(document).ready(function () {
    alerta = document.getElementById("alerta_login");
});

function mostrarMensaje(elemento, mensaje, tipo_alerta) {
    elemento.innerHTML = `<div class="alert alert-${tipo_alerta} campo" role="alert">
    <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 2000);
}

//Click en el boton iniciar
$(document).on('click', '#iniciar', function (e) {
    e.preventDefault();
    let user = document.getElementById("user-inicio").value;
    let pass = document.getElementById("pass-inicio").value;
    if (user != "" && pass != "") {
        obtenerDatos(user, pass);
    } else {
        mostrarMensaje(alerta, "Llene los campos", "danger");
    }
});

//metodo GET
function obtenerDatos(correo, pass) {
    var aux = url_back + "administrador/1";
    fetch(aux).then(function (response) {
        return response.json();
    }).then(function (data) {
        let USER;
        let PASSWORD;
        let vector = [data];
        vector.forEach(task => {
            USER = task.nickname;
            PASSWORD = task.password;
        });
        if (correo == USER && pass == PASSWORD) {
            var parametros = { "Usuario": correo, "Password": pass };
            console.log("Usuario: " + USER + " Password:" + PASSWORD);
            $.ajax({
                data: parametros,
                url: 'index.php',
                type: 'post',
                beforeSend: function () {
                    mostrarMensaje(alerta_login, "Ingresando ...", "success");
                },
                success: function (response) {
                    //mostrarMensaje(alerta, "Ingresando", "sucess");
                    location.href = "index.php";
                    //$("#resultado").html(response);
                }
            });
        } else {
            mostrarMensaje(alerta, "Usuario no registrado", "danger");
        }
    }).catch(function (error) {
        if (error.message == "Failed to fetch") {
            console.log('Hubo un problema con la petición fetch:' + error);
            mostrarMensaje(alerta, "Acceso no disponible", "danger");
        } else {
            console.log('Error user' + error);
            mostrarMensaje(alerta, "Error", "danger");
        }
    });
}

