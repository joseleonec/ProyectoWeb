function setName() {
	var agencia =  document.getElementById("agencia");
	agencia.innerHTML = localStorage.getItem('user'); 
}

document.addEventListener("DOMContentLoaded", () => {
    /*
    if(!localStorage.getItem('user')){
    	window.location.replace('../index.html')
    } else {
    	setName()
    }
    */
});