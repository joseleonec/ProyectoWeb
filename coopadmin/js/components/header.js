const logOut = () => {
    localStorage.clear()
    window.location.replace('../index.html')
}

const changeWindow = () => {
	$("body").toggleClass("sb-sidenav-toggled");
}

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    	<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          	<button class="btn btn-link btn-sm order-1 order-lg-0" onclick=changeWindow() id="sidebarToggle" href="#"><i
                    class="fas fa-bars"></i></button>
      		<a class="navbar-brand text-light" onclick=changeWindow id="agencia"></a>
    	  	<form class=" d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    <div class="input-group-append">
                        <ul class="navbar-nav ml-auto ml-md-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                                        class="fas fa-user fa-fw"></i></a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="#">Settings</a><a class="dropdown-item" href="#">Activity
                                        Log</a>
                                    <div class="dropdown-divider"></div>
                                    <a href="#" class="btn btn-danger dropdown-item" role="button" onclick=logOut()>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
    	</nav>
    `;
  }
}

customElements.define('main-header', Header);