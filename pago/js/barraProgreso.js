// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

// //--------TAB MENU-------
// // Current tab is set to be the first tab (0)
// // Display the current tab
// var currentTab = 1;
// showTab(currentTab);

// function nextPrev(n) {
//     // This function will figure out which tab to display
//     var x = document.getElementsByClassName("tab");
//     // Exit the function if any field in the current tab is invalid:

//     // Hide the current tab:
//     x[currentTab].style.display = "none";
//     // Increase or decrease the current tab by 1:
//     currentTab = currentTab + n;
//     // if you have reached the end of the form...
//     if (currentTab >= x.length) {
//         // ... the form gets submitted:
//         return false;
//     }
//     // Otherwise, display the correct tab:
//     showTab(currentTab);
//     setProgreso(currentTab);
// }

// function showTab(n) {
//     // This function will display the specified tab of the form...
//     var x = document.getElementsByClassName("tab");
//     x[n].style.display = "block";
//     //... and fix the Previous/Next buttons:
//     if (n == 1) {
//         document.getElementById("prevBtn").style.display = "none"; //oculta el boton antterior
//     } else {
//         document.getElementById("prevBtn").style.display = "inline"; //muestra el boton antterior
//     }

//     if (n == (x.length - 1)) { //llega al final de los tabs
//         document.getElementById("nextBtn").style.display = "none";
//         document.getElementById("prevBtn").style.display = "none";
//         generarCodigo();
//     } else {
//         document.getElementById("nextBtn").innerHTML = "Next";
//     }
// }

// function generarCodigo() {

// }
// function setProgreso(actual) {
//     var i, vectorCirculos = document.getElementsByClassName("barr");
//     $("#Barra>ul>li.actual").removeClass("actual");
//     $("#Barra>ul>li.active").removeClass("active");
//     for (i = 0; i < actual; i++) {
//         vectorCirculos[i].classList.add("active");
//     }
//     vectorCirculos[actual].classList.add("actual");
// }