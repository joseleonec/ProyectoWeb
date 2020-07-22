class Coopertativa {
    constructor(nombre, buses, estado) {
        this.name = document.getElementById(nombre);
        this.buses = document.getElementById(buses);
        this.estado = document.getElementById(estado);
    }

    agregarFila(tabla_id, id, valor1, valor2, valor3) {
        var table = document.getElementById(tabla_id);
        //var rowCount = table.rows.length; //con cabecera, -1 sin cabecera
        var rowCount = id;
        document.getElementById(tabla_id).insertRow(-1).innerHTML =
            //'<td></td><td></td><td></td><td></td>';
            `<tr>
            <td>${rowCount}</td>
            <td>${valor1}</td>
            <td>${valor2}</td>
            <td>${valor3}</td>
            <td><button class="task-delete btn btn-danger">Delete</button></td>
            </tr>`;
    }

    getData(fila, tabla) {
        let a = document.getElementById(tabla).rows[fila].cells[1].innerText;
        let b = document.getElementById(tabla).rows[fila].cells[2].innerText;
        let c = document.getElementById(tabla).rows[fila].cells[3].innerText;
        this.name.setAttribute('value', a);
        this.buses.setAttribute('value', b);
        this.estado.setAttribute('value', c);
    }

    borrarCampos() {
        this.name.setAttribute('value', "");
        this.buses.setAttribute('value', "");
        this.estado.setAttribute('value', "");
    }
}
class Ruta {
    constructor(origen, destino, empresa) {
        this.origen = document.getElementById(origen);
        this.destino = document.getElementById(destino);
        this.empresa = document.getElementById(empresa);
    }

    agregarFila(tabla_id, valor1, valor2, valor3) {
        var table = document.getElementById(tabla_id);
        var rowCount = table.rows.length; //con cabecera, -1 sin cabecera
        document.getElementById(tabla_id).insertRow(-1).innerHTML =
            //'<td></td><td></td><td></td><td></td>';
            `<tr>
            <td>${rowCount}</td>
            <td>${valor1}</td>
            <td>${valor2}</td>
            <td>${valor3}</td>
            <td><label><input type="checkbox" value=""> Select</label></td>
            </tr>`;
    }

    getData(fila, tabla) {
        let a = document.getElementById(tabla).rows[fila].cells[1].innerText;
        let b = document.getElementById(tabla).rows[fila].cells[2].innerText;
        let c = document.getElementById(tabla).rows[fila].cells[3].innerText;
        this.origen.setAttribute('value', a);
        this.destino.setAttribute('value', b);
        this.empresa.setAttribute('value', c);
    }

    borrarCampos() {
        this.origen.setAttribute('value', "");
        this.destino.setAttribute('value', "");
        this.empresa.setAttribute('value', "");
    }
}
class Empleado {
    constructor(nombre, apellido, cedula, correo, empresa) {
        this.nombre = document.getElementById(nombre);
        this.apellido = document.getElementById(apellido);
        this.cedula = document.getElementById(cedula);
        this.correo = document.getElementById(correo);
        this.empresa = document.getElementById(empresa);
    }

    agregarFila(tabla_id, valor1, valor2, valor3, valor4, valor5) {
        var table = document.getElementById(tabla_id);
        var rowCount = table.rows.length; //con cabecera, -1 sin cabecera
        document.getElementById(tabla_id).insertRow(-1).innerHTML =
            //'<td></td><td></td><td></td><td></td>';
            `<tr>
            <td>${rowCount}</td>
            <td>${valor1}</td>
            <td>${valor2}</td>
            <td>${valor3}</td>
            <td>${valor4}</td>
            <td>${valor5}</td>
            <td><label><input type="checkbox" value=""> Select</label></td>
            </tr>`;
    }

    getData(fila, tabla) {
        let a = document.getElementById(tabla).rows[fila].cells[1].innerText;
        let b = document.getElementById(tabla).rows[fila].cells[2].innerText;
        let c = document.getElementById(tabla).rows[fila].cells[3].innerText;
        let d = document.getElementById(tabla).rows[fila].cells[4].innerText;
        let e = document.getElementById(tabla).rows[fila].cells[5].innerText;
        this.nombre.setAttribute('value', a);
        this.apellido.setAttribute('value', b);
        this.cedula.setAttribute('value', c);
        this.correo.setAttribute('value', d);
        this.empresa.setAttribute('value', e);
    }

    borrarCampos() {
        this.nombre.setAttribute('value', "");
        this.apellido.setAttribute('value', "");
        this.cedula.setAttribute('value', "");
        this.correo.setAttribute('value', "");
        this.empresa.setAttribute('value', "");
    }
}


/*

function getData(fila, tabla) {
    switch (tabla) {
        case "tablaCoop":
            objeto_coop.getData(fila, tabla);
            break;
        case "tablaRutas":
            objeto_ruta.getData(fila, tabla);
            break;
        case "tablaEmpleado":
            objeto_empleado.getData(fila, tabla);
            break;
        default:
            break;
    }
}

 */

/*function save(){
    var elegidos = $('input[type=checkbox]:checked');
    var cantidad = [];
    elegidos.each(function(){
        cantidad.push($(this).attr('cantidad'));
    })
    console.log(cantidad);

} */

/*
// Añadir eventos de click
const btn_editar = document.getElementById ("editar");
btn_editar.addEventListener ("click", editar_fila);
function editar_fila (e) {
    //alert ("Primer controlador");
    alert(e.type);
}
*/

/*
document.getElementById('pp').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('hola');
});
*/

/*
function borrar_fila(element) {
    if (element.name === 'delete') {
        element.parentElement.parentElement.remove();
        mostrar_mensaje('Fila eliminada', 'success');
    }
}
*/

/*

function getData(fila) {
    //alert("Se selecciono "+fila);
    var a = document.getElementById("tablaCoop").rows[fila].cells[1].innerText;
    var b = document.getElementById("tablaCoop").rows[fila].cells[2].innerText;
    var c = document.getElementById("tablaCoop").rows[fila].cells[3].innerText;
    nombre.setAttribute('value', a);
    buses.setAttribute('value', b);
    estado.setAttribute('value', c);
    //nombre.setAttribute('disabled', '');
}
 */