const url = 'https://terminal25backend.herokuapp.com/usuario/';
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    var bandera = true;
    console.log(user);
    if (user) {
        var email = user.email;
        fetch(url + "email=" + email).then(function (response) {
            return response.json();
        }).then(function (x) {
            console.log("x:");
            console.log(x);
            if (x.email === email || user.displayName === x.nickname) {
                bandera = false;
                // console.log(x);
                window.location.href = "perfil.html";
                // alert("El email ya esta registrado");
            } else if (bandera) {
                const data = {
                    "nombre": user.displayName,
                    "apellido": "apellido",
                    "cedula": "cedula",
                    "nickname": user.displayName,
                    "password": "password",
                    "email": user.email,
                    "saldo": 0.0
                };
                console.log("var");
                console.log(data);
                POST(url, data);
                window.location.href = "perfil.html";
            }
        }).catch(function () {
            console.log("Error al autenticar usuario");
        });
    } else {
        console.log("no existe un sesion");
    }
});

const loginForm = document.querySelector("#form-signin-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    //sign up on the user
    emailAuth.signInWithEmailAndPassword(email, password)
        .then(
            cred => {
                // console.log(cred.user.email);var USUARIO_AUTH;
                // window.location.href = "../perfil.html";
            }).catch(error => alert('Error:', error))
        .then(response => console.log('Success:', response));
});

// Login with Google
const botonLoginGoogle = document.querySelector("#login-google");
botonLoginGoogle.addEventListener('click', e => {
    e.preventDefault();
    console.log("click google");
    var provider = new firebase.auth.GoogleAuthProvider();
    //POPUP
    emailAuth.signInWithRedirect(provider).then(function (result) {
        console.log("Google signed in" + result);
    }).catch(
        err => {
            console.log("Error:" + err);
        }
    );
    console.log("fin");
});

// Login with Facebook
const botonLoginFacebook = document.querySelector('#login-facebook');
botonLoginFacebook.addEventListener('click', e => {
    e.preventDefault();
    // loginForm.reset();
    const provider = new firebase.auth.FacebookAuthProvider();
    emailAuth.signInWithRedirect(provider).then((result) => {
        console.log(result);
        console.log("facebook sign in");
    }).catch(
        err => {
            console.log(err);
        }
    );

});

