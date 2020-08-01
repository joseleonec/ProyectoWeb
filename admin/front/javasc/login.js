
function ir_a_inicio() {
    // alert("Gracias por visitar nuestra pagina")
    location.href = "inicio.php";
}

let alerta_registro = document.getElementById("alerta-regis");
var alerta_login = document.getElementById("alerta");
var url = 'https://cryptic-beach-67438.herokuapp.com/cliente';
var url_carrito = "https://cryptic-beach-67438.herokuapp.com/interfaz";
var urlp = 'http://localhost:8181/api/persona';
var url_usuario = 'https://terminal25backend.herokuapp.com/usuario/1';

var id = "";
var user = "";

function enviar(e) {
    e.preventDefault();
    let correo = document.getElementById("user-inicio").value;
    let pass = document.getElementById("pass-inicio").value;
    if (correo != "" && pass != "") {
        obtenerDatos(correo, pass);
    } else {
        mostrar_mensaje(alerta_login, "Llene los campos", "danger");
    }
}

//metodo GET
function obtenerDatos(correo, pass) {
    //var aux;
    //aux = url + "/login?email=" + correo + "&password=" + pass;
    //aux = urlp + "/login?nombre=" + correo + "&cedula=" + pass;
    var aux = url_usuario;
    fetch(aux).then(function (response) {
        return response.json();
    }).then(function (data) {
        var vector = [data];
        vector.forEach(task => {
            user = task.nickname;
            id = task.password;
        });
        if (correo == user && pass == id) {
            /* mostrar_mensaje(alerta_login, "Ingresando...", "success");
            var form_aux = document.getElementById("send");
            form_aux.innerHTML = `
                <form action="index.php" method="POST" class="fade">
                    <input type="password" id="caja_valor" name="user" value="${correo}">
                    <input type="password" id="caja_valor2" name="id" value="${pass}">
                    <button type="hidden" id="iniciar2" name="mandar" type="submit"></button>
                </form>`;
            var obj = document.getElementById("iniciar2");
            obj.click(); */
            //------------------------
            var parametros = { "Usuario": correo, "Password": pass };
            $.ajax({
                data: parametros,
                url: 'index.php',
                type: 'post',
                beforeSend: function () {
                    mostrar_mensaje(alerta_login, "Procesando, espere por favor", "success");
                },
                success: function (response) {
                    location.href = "index.php";
                    //$("#resultado").html(response);
                }
            });
        } else {
            mostrar_mensaje(alerta_login, "Usuario no registrado", "danger");
        }
    }).catch(function (error) {
        if (error.message == "Failed to fetch") {
            console.log('Hubo un problema con la petición fetch:' + error);
            mostrar_mensaje(alerta_login, "Acceso no disponible", "danger");
        } else {
            console.log('Error user' + error);
            mostrar_mensaje(alerta_login, "Usuario no registrado", "danger");
        }
    });
}

$(document).on('click', '#iniciar', enviar);

function mostrar_mensaje(elemento, mensaje, tipo) {
    elemento.innerHTML = `<div class="alert alert-${tipo}" role="alert">
        <strong>${mensaje}</strong></div>`;
    setTimeout(function () {
        var a = document.querySelector('.alert');
        if (a != null) {
            a.remove();
        }
    }, 2000);
}

//Click en el boton Registros

$("#iniciar_registro").click(function (e) {
    e.preventDefault();
    let user = document.getElementById("user-regis").value;
    let correo = document.getElementById("correo-regis").value;
    let pass = document.getElementById("pass-regis").value;
    let telefono = document.getElementById("telefono-regis").value;
    let codepostal = document.getElementById("codepostal-regis").value;

    if (user != "" && correo != "" && pass != "" && telefono != "") {
        //consultarDatos(user, correo, pass, telefono, codepostal);
        ingresarDatos(user, correo, pass, telefono, codepostal);
    } else {
        mostrar_mensaje(alerta_registro, "Llene los campos", "danger");
    }
});

//metodo POST
function ingresarDatos(user, correo, pass, telefono, codepostal) {
    //location.href = "index.php";
    obtenerID_carrito();
    if (idCarrito != "") {
        var data = { name: user, email: correo, password: pass, phone: telefono, postalCode: codepostal, id_carrito: idCarrito };
        var aux = url;
        fetch(aux, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data_res) {
            var vector = [data_res];
            var nuevo_id;
            vector.forEach(task => {
                nuevo_id = task.id;
            });
            if (nuevo_id != null) {
                console.log("Respuesta: " + data_res);
                limpiar("form_registro");
                mostrar_mensaje(alerta_registro, " Exito ", "success");
                location.href = "index.php";
            } else {
                mostrar_mensaje(alerta_registro, "No se puede crear", "danger");
            }
        }).catch(function (error) {
            console.log('Error id cliente registro: ' + error);
            mostrar_mensaje(alerta_registro, "No se puede crear", "danger");
        });
    }
}

function limpiar(card) {
    document.getElementById(card).reset();
}

var idCarrito = "";
var ip_user = "";

//metodo GET
function obtenerID_carrito() {
    var aux = url_carrito;
    fetch(aux).then(function (response) {
        return response.json();
    }).then(function (data) {
        var vector = [data];
        vector.forEach(task => {
            idCarrito = task.idCarrito;
            //ip_user = task.ip;
        });
    }).catch(function (error) {
        console.log('Error Id carrito: ' + error);
        mostrar_mensaje(alerta_login, "Usuario no registrado", "danger");
    });
}

var url_clientes = "https://cryptic-beach-67438.herokuapp.com/";
//metodo GET clientes
function consultarDatos(user, correo, pass, telefono, codepostal) {
    let url = url_clientes + "cliente/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        var bien = true;
        data.forEach(task => {
            if (task.name == user || task.email == correo) {
                console.log(task.name + " " + task.email);
                bien = false;
            }
        });
        if (bien) {
            //mostrar_mensaje(alerta_registro, "Listo para añadir", "sucess");
            //ingresarDatos(user, correo, pass, telefono, codepostal);
            var aux = url_carrito;
            fetch(aux).then(function (response) {
                return response.json();
            }).then(function (data) {
                var vector = [data];
                vector.forEach(task => {
                    idCarrito = task.idCarrito;
                    //ip_user = task.ip;
                });
                console.log("no espera");
                if (idCarrito != "") {
                    var data = { name: user, email: correo, password: pass, phone: telefono, postalCode: codepostal, id_carrito: idCarrito };
                    var aux = url;
                    fetch(aux, {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data_res) {
                        var vector = [data_res];
                        var nuevo_id;
                        vector.forEach(task => {
                            nuevo_id = task.id;
                        });
                        if (nuevo_id != null) {
                            console.log("Respuesta: " + data_res);
                            limpiar("form_registro");
                            mostrar_mensaje(alerta_registro, " Exito ", "success");
                            location.href = "index.php";
                        } else {
                            mostrar_mensaje(alerta_registro, "No se puede crear", "danger");
                        }
                    }).catch(function (error) {
                        console.log('Error id cliente registro: ' + error);
                        mostrar_mensaje(alerta_registro, "No se puede crear", "danger");
                    });
                }
            }).catch(function (error) {
                console.log('Error Id carrito: ' + error);
                mostrar_mensaje(alerta_login, "Usuario no registrado", "danger");
            });

        } else {
            mostrar_mensaje(alerta_registro, "Usuario/Correo ya existe", "danger");
        }
    }).catch(err => {
        console.log(err);
    });
}

//---------Facebook----------------------
