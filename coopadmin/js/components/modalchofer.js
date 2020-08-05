import { getURL } from '../modules/links.js';
import { reloadTable } from './table.js';

const urlChofer = 'https://terminal25backend.herokuapp.com/chofer/idagencia=';
const inputs = ['inputNombre','inputCelular','inputCedula','inputCorreo','inputLicencia'];

const limpiarModal = () =>{
	inputs.forEach(function(i){
		document.getElementById(i).value = ""
	})
	 document.querySelector('#botonclose').click();
}

const submitContactForm = () =>{
	var name = $('#inputNombre').val(); 
	var phone = $('#inputCelular').val(); 
	var ident = $('#inputCedula').val(); 
	var email = $('#inputCorreo').val(); 
	var lic = $('#inputLicencia').val();

    if(name.trim() == '' ){
        $('#inputNombre').focus();
        return false;
    }else if(phone.trim() == '' ){
        $('#inputCelular').focus();
        return false;
    }else if(ident.trim() == ''){
        $('#inputCedula').focus();
        return false;
    }else if(email.trim() == '' ){
        $('#inputCorreo').focus();
        return false;
    }else if(lic.trim() == '' ){
        $('#inputLicencia').focus();
        return false;
    }else{

    	let data = { nombre:name, tipoLicencia: lic, cedula: ident, correo:email, celular:phone}
        
        fetch(urlChofer+JSON.parse(localStorage.getItem('agencia')).idAgencia , 
        	{
            method: 'POST', 
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
        	data => {
        		console.log(data)
				reloadTable()
				limpiarModal()
    		}
        ).catch(error =>
            console.log('Error: ' + error)
        );
	}
}

class ModalChofer extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<h5 class="modal-title" id="exampleModalLabel">Nuevo conductor</h5>
        		<button type="button" id="botonclose" class="close" data-dismiss="modal" aria-label="Close">
         			 <span aria-hidden="true">&times;</span>
       			</button>
     		 </div>
			<div class="modal-body">
				  <div class="form-row">
				    <div class="col-md-4 mb-3">
				      <label for="inputNombre">Nombre</label>
				      <input type="text" class="form-control" id="inputNombre" placeholder="Marco Lopez" required>
				    </div>
				    <div class="col-md-4 mb-3">
				      <label for="inputLicencia">Tipo de licencia</label>
				      <input type="text" class="form-control" id="inputLicencia" placeholder="D" required>
				    </div>
				    <div class="col-md-4 mb-3">
				      <label for="inputCedula">Cédula</label>
				      <input type="text" class="form-control" id="inputCedula" placeholder="0123456789" required>
				    </div>
				  </div>
				  <div class="form-row">
				    <div class="col-md-6 mb-3">
				      
				      <label for="inputCorreo">Correo</label>
				      <div class="input-group">
				        <div class="input-group-prepend">
				          <span class="input-group-text" id="inputGroupPrepend2">@</span>
				        </div>
				        <input type="text" class="form-control" id="inputCorreo" placeholder="you@example.com" aria-describedby="inputGroupPrepend2" required>
				      </div>
				    </div>
				    <div class="col-md-6 mb-3">
				      <label for="inputCelular">Celular</label>
				      <input type="text" class="form-control" id="inputCelular" placeholder="0999548369"  required>
				    </div>
				  </div>
				  
				  <button id="modalboton" class="btn btn-primary" type="submit">Aceptar</button>
	      	</div>
	    </div>
  	</div>
</div>`;
		
  }
}

customElements.define('modal-chofer', ModalChofer);


$("#modalboton").click(function (e) {
    e.preventDefault();
    submitContactForm()
});