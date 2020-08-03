function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    console.log('Id Profile: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('Id Token ' + googleUser.getAuthResponse().id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        //una vez deslogueado
        console.log("Adios")
    });
}

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
