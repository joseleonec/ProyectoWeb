<?php
	session_start();
	if(isset($_SESSION['id_usuario'])){
		header("Location: inicio.php");
    };

    //user-inicio;
    /*if( isset($_POST["mandar"])){
        $user=$_POST['user'];
        $id=$_POST['id'];
        $_SESSION['id_usuario']=$user;
        $_SESSION['id_identificador']=$id;
        header("Location: inicio.php");
    };*/

    if( isset($_POST["Usuario"])){
        $user=$_POST["Usuario"];
        $id=$_POST["Password"];

        $_SESSION['id_usuario']=$user;
        $_SESSION['id_identificador']=$id;
        header("Location: inicio.php");
    }
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>
        Usuario
    </title>
    <!--Ajax -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Bootstrap barra-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <link rel="stylesheet" href="estilos/login.css">
    
</head>

<body>
    <!--Facebook-->
    <script>

  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      if (response.status === 'not_authorized'){
        alert("Usuario no conectado");
      }
      document.getElementById('status').innerHTML = 'Please log ' + 'into this webpage.';
    }
  }

  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }

  function cerrarSesion2(e){
    e.preventDefault();
    FB.logout(function(response) {
        alert(" Adios vaquero");
    });
  }

  function cerrarSesion(e){
        e.preventDefault();
        alert("Adios vaquero");
        //FB.getLoginStatus(function(response) {
            //if (response.status === 'connected') {
                /* alert("Adios vaquero");
                FB.logout(function(response) {
                    // this part just clears the $_SESSION var
                    // replace with your own code
                    $.post("/logout").done(function() {
                        alert("Adios vaquero");
                    });
                });
                alert("Adios vaquero"); */
            //}else{
              //  alert("No esta iniciado");
            //}
        //});  
    }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '624975514822984',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v7.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };
 
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email'},function(response) {
      console.log('Successful login for: ' + response.id);
      console.log('Successful login for: ' + response.first_name);
      console.log('Successful login for: ' + response.last_name);
      console.log('Successful login for: ' + response.email);
     /*  var raw = JSON.stringify({
          "nombre":
      }); */
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

</script>


<!-- The JS SDK Login Button -->

<!-- Load the JS SDK asynchronously -->
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js">
</script>


    <!------------->
    <div class="container d-flex justify-content-center">
        <div class="card">
            <div class="card-header">
                <h3 class="">Iniciar sesion</h3>
            </div>
            <div class="card-body">
                <form id="form_login" action="<?php $_SERVER["PHP_SELF"];?>" method="POST">
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/person.svg">
                        </span>
                        <!--input id="user-inicio" type="text" class="form-control" placeholder="username" "lindamorrison@eventage.com" "Koffee"-->
                        <!--input id="user-inicio" name="User" type="email" class="form-control" placeholder="Correo" value="ana"-->
                        <input id="user-inicio" name="User" type="text" class="form-control" placeholder="Correo" value="loismg">
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-text login-color">
                            <img src="icons/lock.svg">
                        </span>
                        <input id="pass-inicio" name="Pass" type="password" class="form-control" placeholder="password" value="pass">
                    </div>
                    <div class="login-color">
                        Hola mundo
                    </div>
                    <div class="login-color" id="status">
                    </div>
                    <div class="d-flex justify-content-center pt-5">
                        <!--a id="iniciar" href="./inicio.html" class="btn login_btn login-color" role="button">Iniciar</a-->
                        <button id="iniciar" name="mandar2" class="btn btn-outline-success my-2 my-sm-0 login-color" type="submit">
                            Ingresar</button>
                    </div>
                    <br>
                    <!--fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                    </fb:login-button-->
                    <div class="fb-login-button" data-size="large" data-button-type="continue_with" 
                        data-layout="rounded" data-auto-logout-link="false" 
                        data-use-continue-as="false" data-width="" scope="public_profile,email" onlogin="checkLoginState();">
                    </div>
                    <br>
                    <br>

                    <button id="" name="" class="btn btn-outline-success my-2 my-sm-0 login-color" 
                        onclick="cerrarSesion();">Cerrar Sesion</button>
                    <div class="pt-3" id="alerta"></div>
                    <div class="texto_login"><a class="texto_login" href="registro.php">¿No tienes una cuenta?</a></div>
                </form>
            </div>
        </div>
    </div>
    <div id="send"></div>
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

    <script src="javasc/login.js"></script>
</body>

</html>