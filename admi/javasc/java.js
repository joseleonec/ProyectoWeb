//Oculta el menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

//Editar la tablas

// Product Constructor
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// UI Constructor
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            var a = element.parentElement.parentElement.innerText; //se obtiene el html
            //var b= document.getElementById("IDdeTabla").rows[i].cells[j].innerText  
            alert(a);
            //var valores = $(this).parents("tr").find("strong")[1].innerHTML;
            //console.log(valores);
            //alert(valores);
            this.showMessage('Product Deleted Succsssfully', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value,
        price = document.getElementById('price').value,
        year = document.getElementById('year').value;

    // Create a new Oject Product
    const product = new Product(name, price, year);

    // Create a new UI
    const ui = new UI();

    // Input User Validation
    if (name === '' || price === '' || year === '') {
        return ui.showMessage('Please Insert data in all fields', 'danger');
    }

    // Save Product
    ui.addProduct(product);
    ui.showMessage('Product Added Successfully', 'success');
    ui.resetForm();

    e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
    e.preventDefault();
});


///--------------------------------------------------------------

//Agregar y eliminar filas:
class Coopertativa {
    constructor(name, buses, estado) {
        this.name = name;
        this.buses = buses;
        this.estado = estado;
    }
}
var alerta_campo = document.getElementById("alerta-campo");

// Listener del boton guardar
document.getElementById('entrada').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('txt1').value;
    var buses = document.getElementById('txt2').value;
    var estado = document.getElementById('txt3').value;

    // Input User Validation
    if (name === '' || buses === '' || estado === '') {
        return mostrar_mensaje('Campos vacios', 'danger');
    }
    const coop = new Coopertativa(name, buses, estado);
    agregarFila(coop);
    mostrar_mensaje('Se ha añadido', 'success');
    limpiar();
});

//Listener del boton eliminar de la tabla
/*
document.getElementById('tablaCoop-mala').addEventListener('click', function (e) {
    const ui = new UI();
    borrar_fila(e.target);
    e.preventDefault();
});*/

function mostrar_mensaje(mensaje, tipo_alerta) {
    alerta_campo.innerHTML = `<div class="alert alert-${tipo_alerta}" role="alert">
    <strong>${mensaje}</strong></div>`;
    setTimeout(function () { document.querySelector('.alert').remove(); }, 3000);
}

function agregarFila(coopertativa) {
    var table = document.getElementById("tablaCoop");
    var rowCount = table.rows.length; //con cabecera, -1 sin cabecera

    document.getElementById("tablaCoop").insertRow(-1).innerHTML =
        //'<td></td><td></td><td></td><td></td>';
        `<tr><th scope="row">${rowCount}</th>
        <td>${coopertativa.name}</td>
        <td>${coopertativa.buses}</td>
        <td>${coopertativa.estado}</td>
        <td><div class="custom-control custom-checkbox custom-control-inline">
            <input type="checkbox" class="custom-control-input" id="defaultInline${rowCount}">
            <label class="custom-control-label" for="defaultInline${rowCount}">select</label>
            </div>
        </td>
        </tr>`;
}

// probando
$(function(){
    $('table tr td').click(function(){
        //var tabla= document.getElementById("tablaCoop");
        var columna = $(this).index();
        var fila = $(this).parent('tr').index();
        alert(fila);
        alert(columna);

        //var fila2 = $(this).parent('tr');
        //fila2.classList.add('active');
    });
})

function getData() {
   
    var b= document.getElementById("tablaCoop").rows[1].cells[1].innerText  
    alert(b);
    var nombre= document.getElementById("txt1");
    nombre.textContent = "Hola mundo";
    //value="activo";
    nombre.setAttribute('value', b);
    nombre.setAttribute('disabled','');
    //alert("Hola");
    /*
    var table = document.getElementById("tablaCoop");
    var row = "";
    for (var i = 0, row = table.rows[i]; i < table.rows.length; i++) {
        var x = row.cells[0].childNodes[0].value;
        var y = row.cells[1].childNodes[0].value;
        var z = row.cells[2].childNodes[0].value; // select option field
        console.log(x);
        console.log(y);
        console.log(z);
        //alert(x);
        //alert(y);
        //alert(x);
    }
    alert("Adios");//innerHTML obtiene el htnl
    */

    /*
    
    */


    /* 
    
    
    var valores = "";
    // Obtenemos todos los valores contenidos en los <td> de la fila
    // seleccionada
    $(this).parents("tr").find("td").each(function () {
        valores += $(this).html() + "\n";
    });
    alert(valores);
    */
    /*
    var valores = $(this).parents("tr").find("td")[1];
    console.log(valores);
    alert(valores);*/
    //var a = this.parentElement.parentElement.innerHTML; //se obtiene el html
    //alert(a);
    //var producto = "";
    //var cantidad = "";
    //producto = $(this).parents("tr").find("td").eq(1).html();
    //cantidad = $(this).parents("tr").find("td").eq(2).html();

    //confirm("Desea eliminar el usuario: " + producto + " | " + cantidad);

    /*
    $('#producto').val(producto);
    $('#cantidad').val(cantidad);
    $('#unidad').val(unidad);
    $('#nempaque').val(numemp);
    $('#empaque').val(empaque);
    */
}

/*
$(document).ready(function () {
    $("#boton").click(function () {
        alert("Hola");
        //e.preventDefault();
        //valores obtendra el dato del td por posciones [0]
        //var valores = $(this).parents("tr").find("td")[1].innerHTML;
        //console.log(valores);
        //alert(valores);
    });

}); 
*/
/*

document.getElementById("pp").addEventListener('submit', function (e) {
    e.preventDefault();
    alert("hola");
    //var table = document.getElementById("tablaCoop");
    //var rowCount = table.rows.length - 1; //con cabecera
    //var valores = $(this).parents("tr").find("td")[1].innerHTML;
    //alert(rowCount);
});

document.getElementById('pp').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('hola');
});
*/

// Fin probando

function eliminarFila() {
    var table = document.getElementById("tablaCoop");
    var rowCount = table.rows.length;
    //console.log(rowCount);
    if (rowCount <= 1)
        alert('No se puede eliminar el encabezado');
    else
        table.deleteRow(rowCount - 1);
}

function limpiar() {
    document.getElementById('entrada').reset();
}

function borrar_fila(element) {
    if (element.name === 'delete') {
        element.parentElement.parentElement.remove();
        mostrar_mensaje('Fila eliminada', 'success');
    }
}
/*function save(){
    var elegidos = $('input[type=checkbox]:checked');
    var cantidad = [];
    elegidos.each(function(){
        cantidad.push($(this).attr('cantidad'));
    })
    console.log(cantidad);

} */