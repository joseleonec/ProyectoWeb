// CERRAR SESION
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    console.log("Saliendo");
    e.preventDefault();
    emailAuth.signOut().then(() => {
        console.log("user signed out");
        location.reload();
        //window.location.href ="index.html";
    });
});
