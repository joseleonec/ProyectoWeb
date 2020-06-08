$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text(recipient)
  var input = modal.find('.modal-body input');
  var mensage = '';

  if(recipient === 'Autobus'){
  	mensage += 'Ingrese la placa'
  	input.attr('placeholder','ABC-1234');
  } else {
  	mensage += 'Ingrese la identificacion'
  	input.attr('placeholder','0123456789');
  }
  modal.find('.modal-body label').text(mensage)
})