<?php
  session_start();
 
  if(!isset($_SESSION['id_usuario'])){
    header("Location: ../index.php");
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
  <link rel="stylesheet" href="../estilos/estilos.css">
  <link rel="stylesheet" href="../estilos/anuncios.css">

</head>

<body>
  <div class="cuerpo">
    <div class="container cabecera py-1 text-center">
      <div class="row">
        <div class="col-sm-4 order-2 order-sm-4 pt-3">
          <img class="logo-empresa" src="../img/bus1.png">
        </div>
        <div class="col-sm-4 order-1 order-sm-4 pt-3">
          <h5><a class="cabecera-tittle" href="#">Transport</a></h5>
          <h5><a class="cabecera-tittle" href="../inicio.php">Administración</a></h5>
        </div>
        <div class="col-sm-4 order-3 order-sm-4 pt-3">
          <div class="row">
            <div class="col-sm-6">
              <h6><img src="../icons/person.svg">&nbsp;&nbsp;Bienvenido</h6>
              <h6><?php echo $variable;?></h6>
            </div>
            <div class="col-sm-6">
            <a class="btn btn-sm btn-danger cerrar" href="../salir.php">Cerrar Sesion</a>
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
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="../inicio.php">Inicio</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="empleados.php">Empleados</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="cooperativas.php">Cooperativas</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu active" role="tab"
            href="rutas.php">Viajes-Cooperativas</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="anuncios.php">Anuncios</a>
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
                <a class="nav-link" target="_blank" href="../../">Ver sitio</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">Opciones</a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#acercaDe">Acerca de</a>

                </div>
              </li>
            </ul>
          </div>
        </nav>
        <!-- Contenido -->
        <div class="container-fluid">
          <div class="tab-content pt-4">
            <div class="tab-pane active pagina" role="tabpanel" id="tabDestinos">
              <h3>Viajes de las cooperativas</h3>
              <p>Asignar viajes a las cooperativas de transporte.</p>

              <!-- Nav tabs -->
              <div class="justify-content-center">
                <ul class="nav nav-tabs border-primary text-center justify-content-center border-bottom border-primary">
                  <!--nav-tabs nav-pills-->
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#coop"> Viajes </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#destinos"> Destinos </a>
                  </li>
                </ul>
              </div>

              <!-- Tab panes -->
              <div class="tab-content pt-3">
                <!--Agencias-->
                <div class="tab-pane active" id="coop">
                  <!-- CRUD -->
                  <div class="row">
                    <!--Datos-->
                    <div class="col-sm-3">
                      <div class="card entrada_datos_ruta">
                        <div class="card-header">
                          <h4>Añadir Viaje</h4>
                        </div>
                        <form id="entrada_ruta" class="card-body">
                          <!--div class="form-group">
                            <div class="form-horizontal">
                              <select class="form-control" id="menu_agencias">
                              </select>
                            </div>
                          </div-->
                          <div class="form-group">
                            <input type="text" id="origen" placeholder="Origen" class="form-control" value="">
                          </div>
                          <div class="form-group">
                            <div class="form-horizontal">
                              <select class="form-control" id="menu_destinos">
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <input type="text" id="ruta_a" placeholder="Ruta" class="form-control" value="">
                          </div>
                          <input type="submit" id="guardar_ruta" value="Ingresar nuevo"
                            class="btn btn-success btn-block">
                          <div class="form-group alerta" id="alerta_ruta"></div>
                        </form>
                      </div>
                    </div>
                    <!--Tabla-->
                    <div class="col-sm-9 miscroll">
                      <table class="table table-hover table-bordered tabla_content" id="tablaRutas">
                        <thead class="thead-dark">
                          <tr>
                            <th>Id</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Ruta</th>
                            <th>--</th>
                            <th>--</th>
                          </tr>
                        </thead>
                        <tbody id="BodyTableRutas">
                          <!--contenteditable="true"-->
                          <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Cuenca</td>
                            <td>2</td>
                            <td>Avenida</td>
                            <td>
                              <button class="ruta-editar btn btn-secondary">
                                Editar
                              </button>
                            </td>
                            <td>
                              <button class="ruta-delete btn btn-danger">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>Cuenca</td>
                            <td>2</td>
                            <td>Camino viejo</td>
                            <td>
                              <button class="ruta-editar btn btn-secondary">
                                Editar
                              </button>
                            </td>
                            <td>
                              <button class="ruta-delete btn btn-danger">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!--Destinos-->
                <div class="tab-pane fade" id="destinos">
                  <!-- CRUD -->
                  <div class="row">
                    <div class="col-sm-3">
                      <div class="card entrada_datos_destino">
                        <div class="card-header">
                          <h4>Añadir Destino</h4>
                        </div>
                        <form id="entrada_destino" class="card-body">
                          <div class="form-group">
                            <input type="text" id="nombre" placeholder="Nombre" class="form-control" value="">
                          </div>
                          <div class="form-group">
                            <input type="number" id="latitud" placeholder="Latitud" class="form-control" value="">
                          </div>
                          <div class="form-group">
                            <input type="number" id="longitud" placeholder="Longitud" class="form-control" value="">
                          </div>
                          <input type="submit" id="guardar_destino" value="Ingresar nuevo"
                            class="btn btn-success btn-block">
                          <div class="form-group alerta" id="alerta_destino"></div>
                        </form>
                      </div>
                    </div>
                    <div class="col-sm-9 miscroll">
                      <!--div class="col-3"-->
                      <table class="table table-hover table-bordered tabla_content" id="tablaDestinos">
                        <thead class="thead-dark">
                          <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>--</th>
                            <th>--</th>
                          </tr>
                        </thead>
                        <tbody id="BodyTableDestino">
                          <!--contenteditable="true"-->
                          <tr>
                            <td>1</td>
                            <td>Azogues</td>
                            <td>-132.564</td>
                            <td>123.4564</td>
                            <td>
                              <button class="destino-editar btn btn-secondary">
                                Editar
                              </button>
                            </td>
                            <td>
                              <button class="destino-delete btn btn-danger">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Quito</td>
                            <td>-3.5656</td>
                            <td>-45.6787</td>
                            <td>
                              <button class="destino-editar btn btn-secondary">
                                Editar
                              </button>
                            </td>
                            <td>
                              <button class="destino-delete btn btn-danger">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!--Fin contenidos de Tabs-->
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
              <p class="centrado">SUPER V UDEC</p>
              <p class="centrado"><strong>Subsistema de Gestion de Clientes</strong></p>
              <strong>Integrantes:</strong>
              <p>Juan Dumaguala</p>
              <p>Henry Quinde</p>
              <strong>Docente:</strong>
              <p>ING.CARLOS VILLIE MOROCHO ZURITA</p>
              <div></div>
              <p> "Este módulo fue desarrollado como parte de la materia Base de Datos II , periodo marzo-julio 2020".
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
  <script src="../javasc/java.js"></script>
</body>

</html>