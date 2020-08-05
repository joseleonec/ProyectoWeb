//date picker
$(function () {
    $('#datetimepicker4').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

//date picker
$(function () {
    var child = $('#layoutSidenav_nav').lastElementChild;
});

class DatePicker extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `	   
		<div class="input-group date" id="datetimepicker4" data-target-input="nearest">
		    <div class="input-group-prepend">
						<span class="input-group-text">Fecha</span>
			</div>
			<input type="text" id="datep" class="form-control datetimepicker-input" data-target="#datetimepicker4"/>
			<div class="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
    			<div class="input-group-text">
    				<i class="fa fa-calendar"></i>
    			</div>
			</div>
		</div>
    `;
  }
}


customElements.define('main-date', DatePicker);