function pageRedirect(direccion) {
    window.location.replace(direccion);
}  

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(pageRedirect("./templates/admin_frecuencia.html"), 3000);
    /*
    if(localStorage.getItem('user')){
    	setTimeout(pageRedirect("./templates/admin_frecuencia.html"), 3000);
    
    } else {
    	setTimeout(pageRedirect("./templates/login.html"), 3000);
    
    }
    */
});