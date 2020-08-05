const url = 'https://terminal25backend.herokuapp.com/usuario/';

function addRow(datatable, solicitud) {
    const span = document.createElement('span');
    span.className = 'table-remove';
    span.innerHTML = `
        <span class="table-remove">
            <button name="delete" type="submit"
                class="btn btn-danger btn-rounded btn-sm my-0">
                Eliminar
            </button>
            <button name="edit" type="submit"
            class="btn btn-warning btn-rounded btn-sm my-0">
                Editar
            </button>
        </span>
            `;
    datatable.row.add([solicitud.idSolicitud, solicitud.idProducto, solicitud.idFactura,
    solicitud.idCliente, solicitud.fechaDeRegistro,
    solicitud.motivoDevolucion, solicitud.estadoAprobacion, span
    ]).draw();
}

function cargarCampos(idUsuario) {
    fetch(url + idUsuario).then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("idUsuario").value = data.idUsuario;
        document.getElementById("nombreusuario").value = data.nombre;
        document.getElementById("apellidousuario").value = data.apellido;
        document.getElementById("cedulausuario").value = data.cedula;
        document.getElementById("emailusuario").value = data.email;
        document.getElementById("nicknameusuario").value = data.nickname;
        document.getElementById("usuariosaldo").innerText = data.saldo;
        document.getElementById("logedas").innerText = data.nickname;

    }).catch(function () {
        console.log("Error en el metodo GET");
    });
}

function desactvarCampos() {
    cambiarEstado(true);
}

function cambiarEstado(boolean) {
    document.getElementById("nombreusuario").readOnly = boolean;
    document.getElementById("apellidousuario").readOnly = boolean;
    document.getElementById("cedulausuario").readOnly = boolean;
    document.getElementById("emailusuario").readOnly = boolean;
    document.getElementById("nicknameusuario").readOnly = boolean;
    // document.getElementById("passwordusuario").readOnly = boolean;
    // document.getElementById("confirmpasswordusuario").readOnly = boolean;
}

function actvarCampos() {
    cambiarEstado(false);
}
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    if (user) {
        const imgsrc = user.photoURL;
        document.getElementById("perfil-img").src = imgsrc;
        var userURL = 'https://terminal25backend.herokuapp.com/usuario/email=';
        console.log("Compras sc: " + user.email);
        fetch(userURL + user.email.toString()).then(function (response) {
            return response.json();
        }).then(function (data) {
            idUsuario = data.idUsuario;
            console.log("compras usuario: " + idUsuario);
            cargarCampos(idUsuario);
            // iniciar();
        }).catch(function () {
            console.log("Error al hallar el ID de usuario");
        });

    } else {
        window.location.href = "login.html";
        console.log("compras no hay usuario");
    }
});
$(document).ready(function () {
    $("#guardarusuario").click(function (e) {

        var valor = document.getElementById("guardarusuario").value;
        if (valor === "Guardar Cambios") {
            // console.log("hola");
            const id = document.getElementById("idUsuario").value;
            const nombre = document.getElementById("nombreusuario").value;
            const apellido = document.getElementById("apellidousuario").value;
            const cedula = document.getElementById("cedulausuario").value;
            const email = document.getElementById("emailusuario").value;
            const nickname = document.getElementById("nicknameusuario").value;
            const saldo = document.getElementById("usuariosaldo").value;
            // const password = document.getElementById("passwordusuario").value;
            // const passwordConfirm = document.getElementById("confirmpasswordusuario").value;

            // Input User Validation
            if (id === '' || nombre === '' || apellido === '' || cedula === '' || email === '' || nickname === '') {
                // mostrarMensaje('Please Insert data in all fields', 'danger');
                alert('Please Insert data in all fields');
            } /* else if (password != passwordConfirm) {
                alert('Las contraseñas no coinciden');
                // mostrarMensaje('Las contraseñas no coinciden', 'danger');
            } */ else {
                fetch(url + id).then(function (response) {
                    return response.json();
                }).then(function (obj) {
                    // const psw = obj.password;
                    const data = {
                        "idUsuario": id,
                        "nombre": nombre,
                        "apellido": apellido,
                        "cedula": cedula,
                        "email": email,
                        "nickname": nickname,
                        "saldo": saldo,
                        "password": "***********"
                    };
                    // console.log("Error")
                    PUT(url, data);
                    // console.log("Error despues put")
                    document.getElementById("cancelar").disabled = true;
                    document.getElementById("guardarusuario").value = "Editar";
                    desactvarCampos();
                    // document.getElementById("passwordusuario").value = ""
                    // document.getElementById("confirmpasswordusuario").value = "";
                    cargarCampos(id);
                    alert("Cambios registrados")
                    mostrarMensaje('Cambios regisrados con exito', 'success');

                }).catch(function () {
                    console.log("Error en el metodo GET");
                });
                // alert("Cambios registrados")

            }
        } else if (valor === "Editar") {
            // console.log("hola");
            actvarCampos();
            document.getElementById("cancelar").disabled = false;
            document.getElementById("guardarusuario").value = "Guardar Cambios";
        }
        // console.log("hola");
        // console.log(valor)
    });

    $("#cancelar").click(function () {
        desactvarCampos();
        document.getElementById("cancelar").disabled = true;
        document.getElementById("guardarusuario").value = "Editar";
        cargarCampos(idUsuario);
    });
});