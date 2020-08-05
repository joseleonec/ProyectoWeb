import { linkEmpleadoAgencia } from './modules/links.js';

const form = document.getElementById('form-button');

form.addEventListener('click', () => {
	var email = document.getElementById("inputEmail");
	var password = document.getElementById('inputPassword');

	var api = linkEmpleadoAgencia+email.value+"/password="+password.value;

	$.ajax({
		url: api,success: function(response){
			
			localStorage.setItem('agencia',JSON.stringify(response.agencia))
			window.location.replace('../index.html')

		},
		error: function(error){
			console.log(error);
		}
	});	
});