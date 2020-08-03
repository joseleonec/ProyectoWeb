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
    if (password === password2) {
        const data = {
            "nombre": nombre,
            "apellido": apellido,
            "cedula": cedula,
            "nickname": nickname,
            "password": password,
            "email": email,
            "saldo": 0.0
        };
        //sign up on the user
        emailAuth.createUserWithEmailAndPassword(email, password).then(
            cred => {
                // console.log(cred.user.email);
                POST(url, data);
            }
        );
    } else {
        alert("Las contraseñas deben coincidir");
    }
});
emailAuth.onAuthStateChanged(user => {
    // USUARIO_AUTH = user;
    if (user) {
        // email = user.email;
        window.location.href = "../perfil.html";
        // window.location.href = "../salidas.html";
    } else {
        console.log("no existe un sesion");
    }
});
