const form = document.getElementById('form-button');
const URL = 'http://localhost:8080/admin/agencias?email=' 

form.addEventListener('click', () => {
	var email = document.getElementById("inputEmail");

	var api = URL+email.value

	$.ajax({
		url: api,success: function(response){
			
			localStorage.setItem('user',response.nombre)
			localStorage.setItem('id',response.id)
			window.location.replace('../index.html')

		},
		error: function(error){
			console.log(error);
		}
	});	
});