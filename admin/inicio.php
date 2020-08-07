<?php
  session_start();
 
  if(!isset($_SESSION['id_usuario'])){
    header("Location: index.php");
  }else{
    //Obterner las variable
    $variable=$_SESSION['id_usuario'];
    $id_user=$_SESSION['id_identificador'];
    $url_back=$_SESSION['URLback'];
  }
  
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Administrador</title>

  <!-- Bootstrap barra-->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="estilos/estilos.css">
  <link rel="stylesheet" href="estilos/anuncios.css">

</head>

<body>
  <div class="cuerpo">
    <div class="container cabecera py-1 text-center">
      <div class="row">
        <div class="col-sm-4 order-2 order-sm-4 pt-3">
          <img class="logo-empresa" src="img/bus1.png">
        </div>
        <div class="col-sm-4 order-1 order-sm-4 pt-3">
          <h5><a class="cabecera-tittle" href="#">Transport</a></h5>
          <h5><a class="cabecera-tittle" href="inicio.php">Administración</a></h5>
        </div>
        <div class="col-sm-4 order-3 order-sm-4 pt-3">
          <div class="row">
            <div class="col-sm-6">
              <h6 id="saludo"><img src="icons/person.svg">&nbsp;&nbsp;Bienvenido</h6>
              <h6><?php echo $variable;?></h6>
            </div>
            <div class="col-sm-6">
              <a class="btn btn-sm btn-danger cerrar" href="salir.php">Cerrar Sesion</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenedor-->
    <div class="d-flex Fondo" id="wrapper">
      <!-- Menu deslizante -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading bg-dark barra-menu">--</div>
        <div class="list-group list-group-flush" role="tablist" id="mitab">
          <a class="list-group-item list-group-item-action bg-dark barra-menu active" role="tab" href="#"
            onclick="openInicio()">Inicio</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="templates/empleados.php">Empleados</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="templates/cooperativas.php">Cooperativas</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="templates/rutas.php">Viajes-Cooperativas</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="templates/anuncios.php">Anuncios</a>
        </div>
      </div>

      <!-- Barra secundaria -->
      <div id="page-content-wrapper">
        <!-- Botones -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom bar_secundaria">
          <button class="btn btn-primary" title="Mas opciones" id="menu-toggle"> Menu </button>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" target="_blank" href="../index.html">Ver sitio</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">Opciones</a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#acercaDe">Acerca de</a>
                  <!--a class="dropdown-item" href="#">Action2</a-->
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <!-- Contenido -->
        <div class="container-fluid">
          <div class="tab-content pt-4" id="mitab_contenido">
            <div class="tab-pane active" role="tabpanel" id="inicio">
              <h3>Tu cuenta</h3>
              <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                  <div class="list-group list-group-flush" role="tablist" id="mitab2">
                    <div class="card ">
                      <div class="card-body text-center">
                        <div class="row">
                          <div class="col-lg-4">
                            <img class="rounded-circle" src="img/editar.jpg" alt="Conductores" width="140" height="140">
                            <h2>Empleados</h2>
                            <p>Ingresar y editar empleados</p>
                            <p><a class="btn btn-secondary" href="templates/empleados.php" role="button">Editar</a></p>
                            </p>
                          </div>
                          <div class="col-lg-4">
                            <img class="rounded-circle" src="img/empresas2.png" alt="Rutas" width="140" height="140">
                            <h2>Cooperativas</h2>
                            <p>Coop de transporte</p>
                            <p><a class="btn btn-secondary" href="templates/cooperativas.php" role="button">Editar</a>
                            </p>
                          </div>
                          <div class="col-lg-4">
                            <img class="rounded-circle" src="img/rutas.png" alt="Boletos" width="140" height="140">
                            <h2>Viajes-Cooperativas</h2>
                            <p>Rutas de las cooperatativas</p>
                            <p><a class="btn btn-secondary" href="templates/rutas.php" role="button">Editar</a></p>
                            </p>
                          </div>
                          <div class="col-lg-4">
                            <img class="rounded-circle" src="img/anuncios.png" alt="Ventas" width="140" height="140">
                            <h2>Anuncios</h2>
                            <p>Publicidad de las paginas invitadas</p>
                            <p><a class="btn btn-secondary" href="templates/anuncios.php" role="button">Editar</a></p>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
      <!--Fin Contenedor-->
    </div>
    <!-- Fin Contenido -->

    <!--Acerca de -->
    <div class="" id="contenedor_modal">
      <div class="modal fade" id="acercaDe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog " role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="sd">Acerca de</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div></div>
            <div class="modal-body">
              <div class="logo"></div>
              <div></div>
              <p class="centrado">Terminal Terrestre</p>
              <p class="centrado"><strong>Administración</strong></p>
              <strong>Integrantes:</strong>
              <p>Juan Dumaguala</p>
              <p>Henry Quinde</p>
              <p>José León</p>
              <strong>Docente:</strong>
              <p>ING.PRISCILA CEDILLO</p>
              <div></div>
              <p> "Este página fue desarrollado como parte de la materia Programacion Web, periodo marzo-julio 2020".
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div id="img-fondo">
      <footer class="pie">
        <h5 class="text-uppercase font-weight-bold">ADMINISTRACION TERMINAL TERRESTRE</h5>
        <p>Nunca cerramos</p>
        <p class="text-center">&nbsp;&nbsp;© 2020 Copyright:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Derechos Reservados</p>
      </footer>
    </div>

  </div>
  <!-- Importaciones -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous"></script>
  <!------->
  <script type="text/JavaScript"> 
    function user_data() {
      return "<?php echo $id_user ?>";
    };
    function get_url() {
      return "<?php echo $url_back ?>";
    };
  </script> 
  <script src="javasc/java.js"></script>
</body>

</html>