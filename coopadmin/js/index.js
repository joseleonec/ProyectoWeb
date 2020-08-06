function pageRedirect(direccion) {
    window.location.replace(direccion);
}  

document.addEventListener("DOMContentLoaded", () => {
    //setTimeout(pageRedirect("./templates/admin_frecuencia.html"), 3000);
    
    if(localStorage.getItem('agencia')){
    	setTimeout(pageRedirect("./templates/admin_frecuencia.html"), 500);
    
    } else {
    	setTimeout(pageRedirect("./templates/login.html"), 500);
    
    }
    
});