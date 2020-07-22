function processFiles(files) {
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        // Cuando éste evento se dispara, los datos están ya disponibles.
        // Se trata de copiarlos a una área <div> en la página.
        let output = document.getElementById("fileOutput");
        output.style.backgroundImage = "url('" + e.target.result + "')";
    };
    reader.readAsDataURL(file);
}

function processFiles2(files) {
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        // Cuando éste evento se dispara, los datos están ya disponibles.
        // Se trata de copiarlos a una área <div> en la página.
        let output = document.getElementById("fileOutput2");
        output.style.backgroundImage = "url('" + e.target.result + "')";
    };
    reader.readAsDataURL(file);
}

function processFiles3(files) {
    let file = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        // Cuando éste evento se dispara, los datos están ya disponibles.
        // Se trata de copiarlos a una área <div> en la página.
        let output = document.getElementById("fileOutput3");
        output.style.backgroundImage = "url('" + e.target.result + "')";
    };
    reader.readAsDataURL(file);
}