
$(".btn_add").on("click", function() {
    var column1 = $(this).closest('tr').children()[0].textContent;
    var column2 = $(this).closest('tr').children()[1].textContent;
    var column3 = $(this).closest('tr').children()[2].textContent;
    var column4 = $(this).closest('tr').children()[3].textContent;
    
    $("#columna1").val(column1);
    $("#columna2").val(column2);
    $("#columna3").val(column3);
    $("#columna4").val(column4);
    
});