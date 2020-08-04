$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//--------TAB MENU-------
// Current tab is set to be the first tab (0)
// Display the current tab
var currentTab = 1;
showTab(currentTab);

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:

    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
    setProgreso(currentTab);
}

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 1) {
        document.getElementById("prevBtn").style.display = "none"; //oculta el boton antterior
    } else {
        document.getElementById("prevBtn").style.display = "inline"; //muestra el boton antterior
    }
    if (n == (x.length - 1)) { //llega al final de los tabs
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function setProgreso(actual) {
    var i, vectorCirculos = document.getElementsByClassName("barr");
    $("#Barra>ul>li.actual").removeClass("actual");
    $("#Barra>ul>li.active").removeClass("active");
    for (i = 0; i < actual; i++) {
        vectorCirculos[i].classList.add("active");
    }
    vectorCirculos[actual].classList.add("actual");
}

/*
function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}



 */