import { listForTable } from '../modules/frecuencia.js';
import { getURL , getKeySearch } from '../modules/links.js';

var lista = [];
var results = [];

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

const insertTable = () =>{
  var card = document.getElementById("cardtable");
  card.innerHTML=`<div class="table-responsive">
                    <main-table></main-table>
                  </div>`;
}

const insertHeader = (cabeceras)=>{
    var tblHead = document.createElement("thead");
    tblHead.className= "thead-dark";
        
    var tr = document.createElement("tr");
        
    cabeceras.forEach(function (item){
      var th = document.createElement("th");
        th.innerText = item;
        tr.appendChild(th);
      })

    tblHead.appendChild(tr);
    return tblHead
}

const inserRow = () => {
  var rows = []
  results.forEach(function(item){
      var tr = document.createElement("tr");
      Object.values(item).forEach(function(i){
        var th = document.createElement("th");
        th.innerText = i;
        tr.appendChild(th);
      })
      rows.push(tr)
  })
  return rows;
}

const insertBody = () => {
  var tblBody = document.createElement("tbody");
  tblBody.id = "tablebody";

  inserRow().forEach(item => tblBody.appendChild(item))

  return tblBody;
}

const setRowResult = () =>{
  var tablaBody = document.getElementById("tablebody");
  tablebody.innerHTML = "";

  inserRow().forEach(item => tablaBody.appendChild(item))
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

    setRowResult()
  });

}

class MainTable extends HTMLElement {
	connectedCallback() {
		
		var tabla   = document.createElement("table");
  		tabla.id = "dataTable"; 
  		tabla.className = "table table-bordered"; 
  		tabla.cellSpacing = "0";
  		tabla.width="100%";

			tabla.appendChild(insertHeader(Object.keys(results[0])));
			tabla.appendChild(insertBody());
			this.innerHTML = `${tabla.outerHTML}`;
		
  }
}

customElements.define('main-table', MainTable);


fetch(getURL())
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    lista = listForTable(myJson)
    results = lista;
    insertTable()
    agregarListener()
});


export const reloadTable = () =>{
  console.log("recargando")
  fetch(getURL())
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    lista = listForTable(myJson)
    results = lista;
    insertTable()
    agregarListener()
});

}