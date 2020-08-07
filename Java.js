jQuery(document).ready(function () {
    //jQuery("#identificador").show();
    console.log("Ready");
    var f = new Date();
    var fecha_salida = document.getElementById("fecha_salida");
    fecha_salida.innerHTML = `<strong>Salida: </strong>` + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    //var fecha = new Date().toJSON().slice(0, 10);
    //console.log(fecha.toString());
    //cargarSalidas(fecha.toString());
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    cargarSalidas(today);
    cargarCategoria();
    // Dentro y fuera de esta función, el simbolo $() NO es un alias de jQuery()
    // y está disponible para otras bibliotecas
});

/*
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'es,sp,ca,eu,gl,en,fr,it,pt,de', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true }, 'google_translate_element');
}
*/

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );
}

var url_back = "https://terminal25backend.herokuapp.com/";

//Metodo GET
function cargarCategoria() {
    let url = url_back + "servicio/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        var i = 1;
        data.forEach(task => {
            switch (i) {
                case 1: cargarAnun("T", task.nombreSitio, task.descripcion, task.url);
                    break;
                case 2: cargarAnun("H", task.nombreSitio, task.descripcion, task.url);
                    break;
                case 3: cargarAnun("R", task.nombreSitio, task.descripcion, task.url);
                    break;
                default:
                    break;
            }
            i++;
        });
        //console.log("Categoria cargada");
    }).catch(err => {
        //console.log(err);
    });
}

function cargarAnun(categoria, nombreSitio, descripcion, url) {
    document.getElementById("nombreSitio" + categoria).innerHTML = `${nombreSitio}`;
    document.getElementById("descripcionStito" + categoria).innerHTML = `${descripcion}`;
    document.getElementById("urlSitio" + categoria).setAttribute("href", `${url}`);
}

//Metodo GET
function cargarSalidas(fecha) {
    let url = url_back + "itinerario/fecha=" + fecha;
    //let url = url_back + "itinerario/listar";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let template = ``;
        data.forEach(task => {
            template +=
                `<tr>
            <td>Cuenca</td>
            <td>${task.viaje.destino.nombre}</td>
            <td>${task.agencia.nombre}</td>
            <td>${task.bus.placa}</td>
            <td>${task.horaSalida}</td>
            </tr>`
        });
        document.getElementById("bodyTablaInicio").innerHTML = template;
        //$('#bodyTablaInicio').html(template);
        //console.log("Categoria cargada");
    }).catch(err => {
        //console.log(err);
    });
}