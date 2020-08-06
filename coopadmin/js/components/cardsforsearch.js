import { listForCard } from '../modules/frecuencia.js';
import { getURL , getKeySearch , currentDate } from '../modules/links.js';

const urlBoletoByItinerario = 'https://terminal25backend.herokuapp.com/boleto/iditinerario=';

var requestDate = currentDate();

var tot = 0;
let factura;
let boleto;
let car;
let itiner;
let lista;
let results;

var options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: getKeySearch()
};

const setInformacion = (info) =>{
  
  var ul =  document.getElementById("listresult");
  ul.innerHTML = "";


  info.forEach(function(item){
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = item.carrito.usuario.nombre + " "+item.carrito.usuario.apellido

    ul.appendChild(li);
  })

}

async function getItems(url){
    let respuesta = await fetch(url)
    .then(function(response) {
      return response.json();
    })

    return respuesta;
}

async function seleccionarFreq  (e){
    var freq = e.target.parentNode.parentNode.parentNode.id;
    console.log(freq)
    
    let enlace = urlBoletoByItinerario + freq;
    let resp = await getItems(enlace)
    setInformacion(resp)
    
}

const createDiv = () => {
  return document.createElement("div");
}

const createCard = (i) =>{

  var bus = document.createElement("p");
  bus.className = "mb-0";
  bus.innerHTML = `<strong>Bus: </strong>${i.Placa}`;

  var chofer= document.createElement("p");
  chofer.className = "mb-0";
  chofer.innerHTML = `<strong>Chofer: </strong>${i.Chofer}`;

  var content = createDiv()
  content.className = "d-flex justify-content-between";
  content.appendChild(bus)
  content.appendChild(chofer)

  var hora = document.createElement("p");
  hora.className = "mb-0"
  hora.innerHTML = `<strong>Hora: </strong>${i.Hora}`;

  var fecha = document.createElement("p");
  fecha.className = "mb-0"
  fecha.innerHTML = `<strong>Fecha: </strong>${i.Fecha}`;

  var content1 = createDiv()
  content1.className = "d-flex justify-content-between";
  content1.appendChild(fecha)
  content1.appendChild(hora)

  var h6 = document.createElement('h6')
  h6.className = "font-weight-bold mb-1";
  h6.innerText = i.Destino;

  var button = document.createElement("button")
  button.type="button"
  button.className = "btn btn-primary btn-sm btn-block";
  button.innerText = "Seleccionar";
  button.onclick = seleccionarFreq

  var content2 = createDiv()
  content2.appendChild(h6)
  content2.appendChild(button)

  var cardBody1 = createDiv();
  cardBody1.className = ("card-body pb-3")
  cardBody1.appendChild(content1)
  cardBody1.appendChild(content)  
  cardBody1.appendChild(content2)
      
  var indigo = createDiv();
  indigo.id = i.idItinerario;
  indigo.className = "card mt-2";
  indigo.appendChild(cardBody1);


  return indigo;
}

const insertCard = () =>{
  var card = document.getElementById("cardsearchfreq");
  card.innerHTML="";
  var cards = [];
  Object.values(results).forEach(item => cards.push(createCard(item)))

  cards.forEach(item => card.appendChild(item))
}

const agregarListener = () =>{
  var fuse = new Fuse(lista, options);
  var input = document.getElementById('insearch');

  input.addEventListener('input', function(e) {
    var characters = []
    fuse.search(e.target.value).forEach(objeto => characters.push(objeto.item))

    if (e.target.value){
        results = characters;  
    }else {
      results= lista
    }

    insertCard()
  });

}

const consultar = () =>{
  var linkForCard = 'https://terminal25backend.herokuapp.com/itinerario/fecha='+requestDate+"/agencia="+JSON.parse(localStorage.getItem('agencia')).idAgencia;

  fetch(linkForCard)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {

    lista = listForCard(myJson)
    results = lista;
    insertCard()
    agregarListener()
    
  });
}

consultar()

$("#botonconsultar").click(function (e) {
    e.preventDefault();
    var date = $('#datep').val();

    if(date.trim() == ''){
      return false;

    }else{
      requestDate = date;
      consultar();
    }
    
});
