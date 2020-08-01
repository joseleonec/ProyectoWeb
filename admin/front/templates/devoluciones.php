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
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab" href="../inicio.php"
            onclick="openInicio()">Inicio</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab" href="facturas.php"
            onclick="openCooperativa()">Facturas</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab" href="editar.php"
            onclick="openRuta()">Editar perfil</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu active" role="tab" href="devoluciones.php"
            onclick="openEmpleado()">Devoluciones</a>
          <a class="list-group-item list-group-item-action bg-dark barra-menu " role="tab" href="comentarios.php"
            onclick="openAnuncios()">Sugerencias</a>
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
            <div class="tab-pane active" role="tabpanel" id="pg_devoluciones">
              <h3>Solicitud de devolucion</h3>
              <p>Envia una forma solicitando la devolucion de tus productos</p>

              <!-- Nav tabs -->
              <div class="justify-content-center">
                <ul class="nav nav-tabs border-primary text-center justify-content-center border-bottom border-primary">
                  <!--nav-tabs nav-pills-->
                  <!--li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#nueva"> Nueva</a>
                  </li-->
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#solicitudes"> Solicitudes </a>
                  </li>
                </ul>
              </div>

              <div class="tab-content">
                <!--Taxis-->
                <!--div class="tab-pane container fade active" id="nueva">
                  <div class="row">
                    <div class="col-sm-7 py-3">
                      <div class="form-group">
                        <strong>Motivo:</strong>
                        <input type="text" placeholder="" class="form-control" value="">
                        <strong>Descripcion:</strong>
                        <textarea class="form-control" rows="5" id="comment"></textarea>
                        <strong>Identificador de la factura:</strong>
                        <input type="number" placeholder="ID Factura" class="form-control" value="">
                        <strong>Identificador del producto/s:</strong>
                        <input type="text" placeholder="ID Producto" class="form-control" value="">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6 pt-3">
                      <button class="btn btn-success" id="menu-toggle">Enviar</button>
                    </div>
                  </div>
                </div-->
                <!--Hoteles-->
                <div class="tab-pane container active" id="solicitudes">
                  <div class="row">
                    <div class="col-sm-12 miscroll py-3">
                      <!--div class="col-3"i d="tablaCoop"-->
                      <table class="table table-hover table-bordered tabla_content" id="tabla_devolcion">
                        <thead class="thead-dark">
                          <tr>
                            <th>Codigo</th>
                            <th>Fecha</th>
                            <th>Id_Factura</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                          </tr>
                        </thead>
                        <tbody id="tabla_devolcion_body">
                          <!--contenteditable="true"-->
                          <!-- <tr>
                            <td>1</td>
                            <td>12/11/18</td>
                            <td>342</td>
                            <td>Productos caducado</td>
                            <td>
                              <button class="btn btn-danger" disabled>
                                Rechazada
                              </button>
                            </td>
                            <td>
                              <button class="btn btn-secondary" data-toggle="modal" data-target="#modalDevoluciones"
                                onclick="verProductosDevolucion()">
                                Ver
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>05/11/19</td>
                            <td>123</td>
                            <td>Articulo roto</td>
                            <td>
                              <button class="btn btn-warning" disabled>
                                En curso
                              </button>
                            </td>
                            <td>
                              <button class="btn btn-secondary" data-toggle="modal" data-target="#modalDevoluciones"
                                onclick="verProductosDevolucion()">
                                Ver
                              </button>
                            </td>
                          </tr> 
                          <tr class='noSearch hide'>
                            <td colspan="5"></td>
                          </tr>-->
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="" id="contenedor_modal-d">
                <div class="modal fade" id="modalDevoluciones" tabindex="-1" role="dialog"
                  aria-labelledby="exampleModalLabel" aria-hidden="true">
                  
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