const campos = ["admin_autobus.html","admin_conductor.html","admin_frecuencia.html","venta_boletos.html","buscar_freq.html"];

const buscarPor = {"admin_autobus.html":["placa", "marca"],"admin_conductor.html": ["nombre","cedula"],"admin_frecuencia.html":["Hora","Destino"],"venta_boletos.html":["Destino","Hora"],"buscar_freq.html":["Destino","Fecha","Placa","Chofer"]}

export const currentDate = () =>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy+'-'+ mm + '-' + dd;

  return today;
} 

var linkCurrentDay =  'https://terminal25backend.herokuapp.com/itinerario/fecha='+currentDate()+'/agencia=';

var links = {
				"admin_autobus.html":"https://terminal25backend.herokuapp.com/bus/idagencia=",
                "admin_conductor.html":"https://terminal25backend.herokuapp.com/chofer/idagencia=",
                "admin_frecuencia.html":linkCurrentDay,
                "venta_boletos.html":linkCurrentDay,                
                "buscar_freq.html":linkCurrentDay,
              }

export const linkEmpleadoAgencia = "https://terminal25backend.herokuapp.com/empleado/email=";

var path = window.location.href;

export const getURL = () =>{
    var url = ""; 

    campos.forEach(function(key) {
        if(path.includes(key)){
          url += links[key] + JSON.parse(localStorage.getItem('agencia')).idAgencia; 
      }
    });

    return url;
}

export const getKeySearch = () =>{
	let claves;
	Object.keys(buscarPor).forEach(function(key){
		if(path.includes(key)){
			claves = buscarPor[key]
		}
	})
	return claves;
}