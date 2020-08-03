// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();

//     console.log('Id Profile: ' + profile.getId());
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());
//     console.log('Id Token ' + googleUser.getAuthResponse().id_token);
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         //una vez deslogueado
//         console.log("Adios")
//     });
// }

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
    console.log("click google");
    var provider = new firebase.auth.GoogleAuthProvider();
    emailAuth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        botonLoginGoogle.valuee="Error" + error;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    // emailAuth.signInWithPopup(provider)
    //     .then(
    //         result => {
    //             console.log("Google signed in" + result);
    //         }

    //     ).catch(
    //         err => {
    //             console.log("Error:" + err);
    //         }

    //     );
});
// Login with Facebook
const botonLoginFacebook = document.querySelector("#login-facebook");
botonLoginFacebook.addEventListener('click', e => {
    console.log("click Facebook");
    const provider = new firebase.auth.FacebookAuthProvider();
    emailAuth.signInWithPopup(provider)
        .then(
            result => {
                console.log("Facebook signed in" + result);
            }

        ).catch(
            err => {
                console.log("Error:" + err);
            }

        );
});