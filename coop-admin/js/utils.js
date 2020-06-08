//menu toggle
$("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
});

//date picker
$(function () {
    $('#datetimepicker4').datetimepicker({
        format: 'L'
    });
});
