function setName() {
	var agencia =  document.getElementById("agencia");
	var localAgencia =  JSON.parse(localStorage.getItem('agencia'))
	agencia.innerHTML = localAgencia.nombre; 
}

document.addEventListener("DOMContentLoaded", () => {
    
    if(!localStorage.getItem('agencia')){
    	window.location.replace('../index.html')
    } else {
    	setName()
    }
    
});