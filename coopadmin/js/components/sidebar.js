const referencia = {"Frecuencias":"admin_frecuencia.html", "Boletos":"venta_boletos.html",
					"Ventas":"admin_ventas.html", "Conductores":"admin_conductor.html",
					"Autobuses":"admin_autobus.html"
				};

class SideBarMenu extends HTMLElement {
	connectedCallback() {
		var path = window.location.href; 
		var childs = [];
		
		Object.keys(referencia).forEach(function(key) {
			var link = document.createElement('a');
			    link.innerText = key;
    			link.href = referencia[key];
    			link.className = 'nav-link';
    			
			if(path.includes(referencia[key])){
				link.classList.add("active");
			}

			childs.push(link);
		});

		var menu = document.createElement('div');
		menu.className = 'nav';

		childs.forEach(item => menu.appendChild(item));

    	this.innerHTML = `${menu.outerHTML}`;
  }
}

class SideBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `	   
    <div id="layoutSidenav_nav">
			<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
		    	<div class="sb-sidenav-menu">     
				    <sidebar-menu></sidebar-menu>
			    </div>
		    </nav>
		</div>
    `;
  }
}

customElements.define('sidebar-menu', SideBarMenu);
customElements.define('main-sidebar', SideBar);