import { getURL } from '../modules/links.js';
import { reloadTable } from './table.js';

const urlBus = 'https://terminal25backend.herokuapp.com/bus/idagencia=';
const inputs = ['inputMarca','inputModelo','inputPlaca','inputAnio','inputCapacidad'];

const limpiarModal = () =>{
	inputs.forEach(function(i){
		document.getElementById(i).value = ""
	})
	 document.querySelector('#botonclose').click();
}

const submitContactForm = () =>{
	var marc = $('#inputMarca').val(); 
	var mod = $('#inputModelo').val(); 
	var pl = $('#inputPlaca').val(); 
	var an = $('#inputAnio').val(); 
	var cap = $('#inputCapacidad').val();

    if(marc.trim() == '' ){
        $('#inputMarca').focus();
        return false;
    }else if(mod.trim() == '' ){
        $('#inputModelo').focus();
        return false;
    }else if(pl.trim() == ''){
        $('#inputPlaca').focus();
        return false;
    }else if(an.trim() == '' ){
        $('#inputAnio').focus();
        return false;
    }else if(cap.trim() == '' ){
        $('#inputCapacidad').focus();
        return false;
    }else{
    	let data = { placa: pl, capacidad: cap, marca:marc, modelo:mod, anio:an}

        fetch(urlBus+JSON.parse(localStorage.getItem('agencia')).idAgencia , 
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

class ModalBus extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<h5 class="modal-title" id="exampleModalLabel">Nuevo autobus</h5>
        		<button type="button" id="botonclose" class="close" data-dismiss="modal" aria-label="Close">
         			 <span aria-hidden="true">&times;</span>
       			</button>
     		 </div>
			<div class="modal-body">
				
				  <div class="form-row">
				    <div class="col-md-6 mb-3">
				      <label for="inputMarca">Marca</label>
				      <input type="text" class="form-control" id="inputMarca" placeholder="Volvo" required>
				    </div>
				    <div class="col-md-6 mb-3">
				      <label for="inputModelo">Modelo</label>
				      <input type="text" class="form-control" id="inputModelo" placeholder="Vol-7"  required>
				    </div>
				  </div>
				  <div class="form-row">
				    <div class="col-md-4 mb-3">
				      <label for="inputPlaca">Placa</label>
				      <input type="text" class="form-control" id="inputPlaca" placeholder="ABC-0123" required>
				    </div>
				    <div class="col-md-4 mb-3">
				      <label for="inputAnio">Anio</label>
				      <input type="text" class="form-control" id="inputAnio" placeholder="2020" required>
				    </div>
				    				    <div class="col-md-4 mb-3">
				      <label for="inputCapacidad">Capacidad</label>
				      <input type="text" class="form-control" id="inputCapacidad" placeholder="40" required>
				    </div>
				  </div>
				  <button id="modalboton" type="submit" class="btn btn-primary">Aceptar</button>
				 			
	      	</div>
	    </div>
  	</div>
</div>`;
		
  }
}

customElements.define('modal-bus', ModalBus);


$("#modalboton").click(function (e) {
    e.preventDefault();
    submitContactForm()
});