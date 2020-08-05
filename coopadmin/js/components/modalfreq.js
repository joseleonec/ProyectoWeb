import { getURL } from '../modules/links.js';
import { reloadTable } from './table.js';

const urlBus = 'https://terminal25backend.herokuapp.com/bus/idagencia=';
const inputs = ['inputHora','inputPrecio','inputAsientos'];

var idAg = JSON.parse(localStorage.getItem('agencia')).idAgencia;

const limpiarModal = () =>{
	inputs.forEach(function(i){
		document.getElementById(i).value = ""
	})
	 document.querySelector('#botonclose').click();
}

const submitContactForm = () =>{
	var time = $('#inputHora').val(); 
	var price = $('#inputPrecio').val(); 
	var size = $('#inputAsientos').val(); 
	var date = $('#datep').val(); 
	var autobus = $('#bus').val();
	var trip = $('#destino').val();
	var driver = $('#chofer').val();

    if(time.trim() == '' ){
        $('#inputHora').focus();
        return false;
    }else if(price.trim() == '' ){
        $('#inputPrecio').focus();
        return false;
    }else if(size.trim() == ''){
        $('#inputAsientos').focus();
        return false;
    }else if(date.trim() == '' ){
        $('#datep').focus();
        return false;
    }else{
    	let data = { fechaSalida: date, horaSalida: time, asientosDisponibles:size, precioAsiento:price }
    	console.log(data)
    	var dir = "https://terminal25backend.herokuapp.com/itinerario"+"/idviaje="+trip+"/idchofer="+driver+"/idbus="+autobus+"/idagencia="+idAg
    	console.log(dir)

        fetch(dir , 
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

async function consultar(enlace){
	let respuesta = await fetch(enlace)
  	.then(function(response) {
    	return response.json();
  	})

  	return respuesta;
}

async function getBuses(){
	var urlBuses = "https://terminal25backend.herokuapp.com/bus/idagencia="+idAg;
	var res = await consultar(urlBuses);

	var select = document.createElement("select");
	select.id = "bus";
	select.className = "custom-select";
		
	var first = document.createElement("option");
	first.selected = true;
	first.innerText = 'Seleccionar...';
	select.appendChild(first);

	res.forEach(function(item){
		var op = document.createElement("option");
		op.value = item.idBus;
		op.innerText = item.placa;
		select.appendChild(op)
	})
	document.getElementById("g3").appendChild(select);
}

async function getChoferes(){
	var urlChofer = "https://terminal25backend.herokuapp.com/chofer/idagencia="+idAg;
	var res = await consultar(urlChofer);

	var select = document.createElement("select");
	select.id = "chofer";
	select.className = "custom-select";
		
	var first = document.createElement("option");
	first.selected = true;
	first.innerText = 'Seleccionar...';
	select.appendChild(first);

	res.forEach(function(item){
		var op = document.createElement("option");
		op.value = item.idChofer;
		op.innerText = item.nombre;
		select.appendChild(op)
	})
	document.getElementById("g2").appendChild(select);
}

async function getViajes(){
	var urlViaje = 'https://terminal25backend.herokuapp.com/viaje/listar';
	var res = await consultar(urlViaje);

	var select = document.createElement("select");
	select.id = "destino";
	select.className = "custom-select";
		
	var first = document.createElement("option");
	first.selected = true;
	first.innerText = 'Seleccionar...';
	select.appendChild(first);

	res.forEach(function(item){
		var op = document.createElement("option");
		op.value = item.idViaje;
		op.innerText = item.destino.nombre;
		select.appendChild(op)
	}) 

	document.getElementById("g1").appendChild(select);
}


getViajes()
getChoferes()
getBuses()




$("#modalboton").click(function (e) {
    e.preventDefault();
    submitContactForm()
});

