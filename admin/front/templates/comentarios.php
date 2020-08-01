<?php
  session_start();
  if(!isset($_SESSION['id_usuario'])){
    header("Location: ../index.php");
  }else{
    //Obterner las variable
    $variable=$_SESSION['id_usuario'];
    $id_user=$_SESSION['id_identificador'];
    // Mostar las variables
    // echo $variable;
  } 
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Usuario</title>

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
          <!--h6><img src="icons/config.svg">&nbsp;&nbsp;Home</h6-->
          <h6><img src="../icons/config.svg">&nbsp;&nbsp;<a class="text-cabecera" href="#">Volver a la tienda</a></h6>
        </div>
        <div class="col-sm-4 order-1 order-sm-4 pt-3">
          <h5><a class="cabecera-tittle" href="#">Supermercado en linea</a></h5>
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
            href="../inicio.php" onclick="openInicio()">Inicio</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="facturas.php" onclick="openCooperativa()">Facturas</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="editar.php" onclick="openRuta()">Editar perfil</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab"
            href="devoluciones.php" onclick="openEmpleado()">Devoluciones</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu active" role="tab"
            href="comentarios.php" onclick="openAnuncios()">Sugerencias</a>
        </div>
      </div>

      <!-- Barra secundaria -->
      <div id="page-content-wrapper">
        <!-- Botones -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom bar_secundaria">
          <button class="btn btn-primary" title="Mas opciones" id="menu-toggle"> Menu </button>
          <input class="fade" type="number" id="id_user" value="<?php echo $id_user;?>">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">Opciones</a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action1</a>
                  <a class="dropdown-item" href="#">Action2</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <!-- Contenido -->
        <div class="container-fluid">
          <div class="tab-content pt-4">
            <div class="tab-pane fade" role="tabpanel" id="inicio">
              <h3>---</h3>
            </div>
            <div class="tab-pane fade" role="tabpanel" id="cooperativa">
              <h3>Facturas</h3>
              <p>Visualiza las facturas realizadas</p>

              <!-- CRUD -->
              <div calss="container stick-top">
                <div class="row">
                  <div class="col-sm-3">
                    <div class="card entrada_datos">
                      <div class="card-header">
                        <h4>Buscar factura</h4>
                      </div>
                      <form id="entrada_coop" class="card-body">
                        <div class="form-group">
                          <input type="text" id="nombre_coop" placeholder="Nombre" class="form-control" value="">
                        </div>
                        <input type="submit" id="guardar_coop" value="Ingresar nuevo" class="btn btn-success btn-block">
                      </form>
                    </div>
                  </div>
                  <div class="col-sm-9 miscroll">
                    <!--div class="col-3"-->
                    <table class="table table-hover table-bordered tabla_content" id="tablaCoop">
                      <thead class="thead-dark">
                        <tr>
                          <th>Codigo</th>
                          <th>Nombre</th>
                          <th>N° Autobuses</th>
                          <th>Estado</th>
                          <th>Editar</th>
                        </tr>
                      </thead>
                      <tbody id="tableIDcoop">
                        <!--contenteditable="true"-->
                        <tr>
                          <td>1</td>
                          <td>Turismo Oriental</td>
                          <td>12</td>
                          <td>activo</td>
                          <td>
                            <button class="task-delete btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Viajeros Internacional</td>
                          <td>8</td>
                          <td>activo</td>
                          <td>
                            <button class="task-delete btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="row pb-3">
                <div class="col-sm-3 pt-3 pb-2 campo">
                  <div class="" id="alerta_coop"></div>
                </div>
                <div class="col-sm-9 pt-3 pb-2">
                  <button type="button" id="editar_coop" class="btn btn-secondary">Editar</button>
                  <button type="button" id="eliminar_coop" class="btn btn-warning" data-toggle="tooltip"
                    data-placement="top" title="Dar de baja a los items seleccionados">Dar de baja</button>
                </div>
              </div>
              <!-- Fin Crud -->

            </div>
            <div class="tab-pane fade" role="tabpanel" id="ruta">
              <h3>Editar perfil</h3>
              <p>Agregar, editar o retirar rutas que las cooperativas de transporte realizan</p>

              <!-- CRUD -->
              <div class="row">
                <div class="col-sm-3">
                  <div class="card entrada_datos">
                    <div class="card-header">
                      <h4>Añadir Ruta</h4>
                    </div>
                    <form id="entrada_ruta" class="card-body">
                      <div class="form-group">
                        <input type="text" id="origen" placeholder="Origen" class="form-control" value="">
                      </div>
                      <div class="form-group">
                        <input type="text" id="destino" placeholder="Destino" class="form-control" value="">
                      </div>
                      <div class="form-group">
                        <input type="text" id="empresa" placeholder="Cooperativa" class="form-control" value="">
                      </div>
                      <input type="submit" id="guardar_ruta" value="Ingresar nuevo" class="btn btn-success btn-block">
                    </form>
                  </div>
                </div>
                <div class="col-sm-9 miscroll">
                  <!--div class="col-3"-->
                  <table class="table table-hover table-bordered tabla_content" id="tablaRutas">
                    <thead class="thead-dark">
                      <tr>
                        <th>Codigo</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Empresa</th>
                        <th>Editar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!--contenteditable="true"-->
                      <tr>
                        <td>1</td>
                        <td>Cuenca</td>
                        <td>Manta</td>
                        <td>Turismo Oriental</td>
                        <td>
                          <label><input type="checkbox" value=""> Select</label>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Cuenca</td>
                        <td>Azogues</td>
                        <td>Tusrimo Internacional</td>
                        <td>
                          <label><input type="checkbox" value=""> Select</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row pb-3">
                <div class="col-sm-3 pt-3 pb-2 campo">
                  <div class="" id="alerta_ruta"></div>
                </div>
                <div class="col-sm-9 pt-3 pb-2">
                  <button type="button" id="editar_ruta" class="btn btn-secondary">Editar</button>
                  <button type="button" id="eliminar_ruta" class="btn btn-warning" data-toggle="tooltip"
                    data-placement="top" title="Dar de baja a los items seleccionados">Dar de baja</button>
                </div>
              </div>
              <!-- Fin Crud -->

            </div>
            <div class="tab-pane fade" role="tabpanel" id="empleado">
              <h3>Solicitar devolucion de productos</h3>
              <p></p>
              <!-- CRUD -->
              <div class="row">
                <div class="col-sm-3">
                  <div class="card entrada_datos2">
                    <div class="card-header">
                      <h4>Añadir empleado</h4>
                    </div>
                    <form id="entrada_empleado" class="card-body">
                      <div class="form-group">
                        <input type="text" id="nombre_empl" placeholder="Nombre" class="form-control" value="">
                      </div>
                      <div class="form-group">
                        <input type="text" id="apellido" placeholder="Apellido" class="form-control" value="">
                      </div>
                      <div class="form-group">
                        <input type="number" id="cedula" min="0" placeholder="Cedula" class="form-control" value="" />
                      </div>
                      <div class="form-group">
                        <input type="email" id="correo" placeholder="Correo" class="form-control" value="">
                      </div>
                      <div class="form-group">
                        <input type="text" id="empresa_empl" placeholder="Cooperativa" class="form-control" value="">
                      </div>
                      <input type="submit" id="guardar_empleado" value="Ingresar nuevo"
                        class="btn btn-success btn-block">
                    </form>
                  </div>
                </div>
                <div class="col-sm-9 miscroll2">
                  <!--div class="col-3"-->
                  <table class="table table-hover table-bordered tabla_content" id="tablaEmpleado">
                    <thead class="thead-dark">
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cedula</th>
                        <th>Correo</th>
                        <th>Empresa</th>
                        <th>Editar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!--contenteditable="true"-->
                      <tr>
                        <td>1</td>
                        <td>Andres</td>
                        <td>Pesantez</td>
                        <td>0104739827</td>
                        <td>andy56_er@gmail.com</td>
                        <td>Viajeros Internacional</td>
                        <td>
                          <label><input type="checkbox" value=""> Select</label>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Maya</td>
                        <td>Montero</td>
                        <td>0107856123</td>
                        <td>maya34rg@hotmail.com</td>
                        <td>Turismo Oriental</td>
                        <td>
                          <label><input type="checkbox" value=""> Select</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row pb-3">
                <div class="col-sm-3 pt-3 pb-2 campo">
                  <div class="" id="alerta_empleado"></div>
                </div>
                <div class="col-sm-9 pt-3 pb-2">
                  <button type="button" id="editar_empleado" class="btn btn-secondary">Editar</button>
                  <button type="button" id="eliminar_empleado" class="btn btn-warning" data-toggle="tooltip"
                    data-placement="top" title="Dar de baja a los items seleccionados">Dar de baja</button>
                </div>
              </div>
              <!-- Fin Crud -->
            </div>
            <!--Seccion Anuncion-->
            <div class="tab-pane active" role="tabpanel" id="anuncio">
              <h3>Tus sugerencias</h3>
              <p>Envianos tus sugerencias de productos para ayudarte encontrarlos.</p>
              <!-- Nav tabs -->
              <div class="justify-content-center">
                <ul class="nav nav-tabs border-primary text-center justify-content-center border-bottom border-primary">
                  <!--nav-tabs nav-pills-->
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#sugerencia"> Nueva</a>
                  </li>
                </ul>
              </div>
              <!-- Tab panes -->
              <div class="tab-content pt-3">
                <!--Taxis-->
                <div class="tab-pane container active" id="sugerencia">
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="form-group">
                        <strong>Ingresa una sugerencia</strong>
                        <br>
                        <strong>Descripcion:</strong>
                        <textarea class="form-control" rows="5" id="sugerencia_txt"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6 pt-3">
                      <button class="btn btn-success" id="enviar_solicitud">Enviar</button>
                    </div>
                  </div>
                  <div class="row pb-3">
                      <div class="col-sm-5 pt-3 pb-2 campo">
                          <div class="" id="alerta_sugerencia"></div>
                      </div>
                      <div class="col-sm-7 pt-3 pb-2 fade">
                         <button type="button" id="" class="btn btn-secondary">Editar</button>
                         <button type="button" id="" class="btn btn-warning" data-toggle="tooltip"
                                           data-placement="top" title="Dar de baja a los items seleccionados">Dar de baja</button>
                      </div>
                </div>
                </div>
                <!--Fin contenidos de Tabs-->
              </div>
              <!--Fin Seccion Anuncios-->
            </div>
          </div>
        </div>
        <br>
      </div>
      <!--Fin Contenedor-->
    </div>
    <!-- Fin Contenido -->


    <!-- Footer -->
    <div id="img-fondo">
      <footer class="pie">
        <h5 class="text-uppercase font-weight-bold">Supermercado en linea</h5>
        <p>Nunca cerramos</p>
        <p class="text-center">&nbsp;&nbsp;© 2020 Copyright:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Derechos Reservados</p>
      </footer>
    </div>

  </div>
  <!-- Importaciones -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <!--script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script-->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous"></script>
  <script src="../javasc/clases.js"></script>
  <script src="../javasc/java.js"></script>
  <script src="../javasc/admi_anuncios.js"></script>
</body>

</html>