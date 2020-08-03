var firebaseConfig = {
    apiKey: " AIzaSyDkPxP35KxmCaFiF12ikKMpJiqiKlJmR-4",
    authDomain: "terminalcuenca.firebaseapp.com",
    databaseURL: "https://terminalcuenca.firebaseio.com",
    projectId: "terminalcuenca",
    storageBucket: "terminalcuenca.appspot.com",
    messagingSenderId: "963023183685",
    appId: "1:963023183685:web:ddfff1fb0efbbbd683282c"
}; // Initialize Firebase firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const emailAuth = firebase.auth();

// emailAuth.onAuthStateChanged(user => {
//     if (user) {
//         // email = user.email;
//         console.log(user.email);
//         USUARIO_EMAIL = user.email;
//         // window.location.href = "../salidas.html";
//     } else {
//         // window.location.href = "../login.html";
//         console.log("reservas no hay usuario");
//     }
// });

// auth.onAuthStateChanged(user => {
//     USUARIO_AUTH = user;
//     if (user) {
//         // email = user.email;
//         console.log(USUARIO_AUTH.email);
//         window.location.href = "../salidas.html";
//     } else {
//         console.log("no existe un sesion");
//     }
// });
// REGISTRARSE
// const signupform = document.querySelector("#signup-form");
// signupform.addEventListener('submit', (e) => {
//     e.preventDefault();
//     //get user info
//     const email = signupform['signup-email'].value;
//     const password = signupform['signup-password'].value;
//     //sign up on the user
//     auth.createUserWithEmailAndPassword(email, password).then(
//         cred => {
//             // console.log(cred.user.email);
//         }
//     );

// });

// CERRAR SESION
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//     console.log("Saliendo");
//     e.preventDefault();
//     auth.signOut().then(() => {
//         console.log("user signed out");
//     });
// });

