import { listForCard } from '../modules/frecuencia.js';
import { getURL , getKeySearch , currentDate } from '../modules/links.js';

const urlItinerario = 'https://terminal25backend.herokuapp.com/itinerario/';

var requestDate = currentDate();

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

async function getItems(url){
    let respuesta = await fetch(url)
    .then(function(response) {
      return response.json();
    })

    return respuesta;
}

async function seleccionarFreq  (e){
    var freq = e.target.parentNode.parentNode.id;
    let enlace = urlItinerario + freq;
    let resp = await getItems(enlace)

    console.log(resp)
}

const createDiv = () => {
  return document.createElement("div");
}

const createCard = (i) =>{

          var precio = document.createElement("p");
          precio.className = "mb-0";
          precio.innerText = " $"+i.Precio;

          var disp = document.createElement("p");
          disp.className = "mb-0";
          disp.innerText = "Disponible:  "+i.Disponible

        var content = createDiv()
        content.className = "d-flex justify-content-between";
        content.appendChild(precio)
        content.appendChild(disp)

        var hora = document.createElement("p");
        hora.className = "mb-0 h3"
        hora.innerText = i.Hora;

      var cardBody1 = createDiv();
      cardBody1.className = ("card-body pb-0")
      cardBody1.appendChild(hora)
      cardBody1.appendChild(content)
      

      var hr = document.createElement("hr")
      hr.className = "hr-light"

        var h6 = document.createElement('h6')
        h6.className = "font-weight-bold mb-1";
        h6.innerText = i.Destino;

        var button = document.createElement("button")
        button.type="button"
        button.className = "btn btn-primary btn-sm btn-block";
        button.innerText = "Seleccionar";
        button.onclick = seleccionarFreq

      var cardBody2 = createDiv();
      cardBody2.className = ("card-body")
      cardBody2.appendChild(h6);
      cardBody2.appendChild(button);

    var indigo = createDiv();
    indigo.id = i.idItinerario;
    indigo.className = "card mt-2";
    indigo.appendChild(cardBody1);
    indigo.appendChild(hr);
    indigo.appendChild(cardBody2);

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