<?php

include_once "Usuario.php";
include_once "../datos/solicitudes.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Metodo no permitido.'); </script>";
    return;
} else if (!isset($_POST["usuarioEditar"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre valido.'); </script>";
    return;
} else if (!isset($_POST["correoEditar"]) || !filter_var($_POST["correoEditar"], FILTER_VALIDATE_EMAIL)) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un email valido.'); </script>";
    return;
} else if (!isset($_POST["edadEditar"]) || (new DateTime($_POST["edadEditar"]) > new DateTime('-7 years'))) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una edad valida.'); </script>";
    return;
} else if ($_POST["contraseniaEditar"] != $_POST["confirmarcontraseniaEditar"]) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contrasenia valida.'); </script>";
    return;
} else if (!validarNuevoUsuario($_POST["correoEditar"], (int) $_POST['idUsuario'])) {

    echo "<script> window.location.href = '../index.html'; alert('El usuario no esta disponible.'); </script>";
    return;    
} else {

    $nombre = $_POST["usuarioEditar"];
    $correo = $_POST["correoEditar"];
    $edad = new DateTime($_POST["edadEditar"]);
    $contrasenia = $_POST["contraseniaEditar"];
    $preferenciasTema = $_POST["temaUsuario"];
    $preferenciasIdioma = $_POST["idiomaUsuario"];

    actualizarUsuario($_POST['idUsuario'], $nombre, $correo, $edad, $contrasenia, $preferenciasIdioma, $preferenciasTema);


    if ($_POST["destino"] == "config") {
        $destino = "../presentacion/HTML/configuracion.html";
    } else {
        $destino = "../index.html";
    }

    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode($_POST["idUsuario"]) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '$destino'; </script>";
    return;
}
