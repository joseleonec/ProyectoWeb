function vaciarTabla(datatable) {
    datatable.clear().draw();
}

function mostrarMensaje(mensaje, cssClass) {
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(mensaje));
    const container = document.querySelector('.container-fluid');
    container.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 200);
}

function POST(url, data) {
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('POST Error:', error))
        .then(response => console.log('POST Success:', response));
}

function PUT(url, data) {
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('PUT Error:', error))
        .then(response => console.log('PUT Success:', response));
    // document.getElementById("labelid").readOnly = false;
}

function DELETE(url, id) {
    fetch(url + id, {
        method: "DELETE"
    }).then(res => res.json())
        .catch(error => console.error('DELETE Error:', error))
        .then(response => console.log('DELETE Success:', response));
}