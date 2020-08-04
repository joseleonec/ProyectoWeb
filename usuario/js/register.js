// REGISTRARSE
const signupform = document.querySelector("#signup-form");
const url = "https://terminal25backend.herokuapp.com/usuario/";
signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const nombre = signupform['inputUserame'].value;
    const apellido = signupform['inputLastname'].value;
    const cedula = signupform['inputCedula'].value;
    const nickname = signupform['inputNickname'].value;
    const email = signupform['inputEmail'].value;
    const password = signupform['inputPassword'].value;
    const password2 = signupform['inputConfirmPassword'].value;
    var bandera = true;
    if (password === password2) {
        fetch(url + "email=" + email).then(function (response) {
            return response.json();
        }).then(function (x) {
            if (x.email === email) {
                bandera = false;
                console.log(x);
                alert("El email ya esta registrado");
            } else if (bandera) {
                const data = {
                    "nombre": nombre,
                    "apellido": apellido,
                    "cedula": cedula,
                    "nickname": nickname,
                    "password": password,
                    "email": email,
                    "saldo": 0.0
                };
                console.log(data);
                POST(url, data);
                //sign up on the user
                emailAuth.createUserWithEmailAndPassword(email, password).then(
                    cred => {
                        // console.log(cred.user.email);
                        // console.log("datos"+data);
                    }
                ).catch(err => {
                    alert("Error:" + err.message);
                });
            }
        }).catch(function () {
            console.log("Error al autenticar usuario");
        });
    } else {
        alert("Las contraseñas deben coincidir");
    }
});
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    if (user) {
        // email = user.email;
        window.location.href = "perfil.html";
        // window.location.href = "salidas.html";
    } else {
        console.log("no existe un sesion");
    }
});

{/* <script>
document.querySelector("#inputPassword").on("focusout", function () {
    if (document.querySelector(this).val() != document.querySelector("#inputConfirmPassword").val()) {
        document.querySelector("#inputConfirmPassword").removeClass("valid").addClass("invalid");
    } else {
        document.querySelector("#inputConfirmPassword").removeClass("invalid").addClass("valid");
    }
});

document.querySelector("#inputConfirmPassword").on("keyup", function () {
    if (document.querySelector("#inputPassword").val() != document.querySelector(this).val()) {
        document.querySelector(this).removeClass("valid").addClass("invalid");
    } else {
        document.querySelector(this).removeClass("invalid").addClass("valid");
    }
});
</script> */}