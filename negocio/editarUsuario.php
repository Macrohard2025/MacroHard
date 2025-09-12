<?php

include_once "Usuario.php";
include_once "../datos/solicitudes.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Método no permitido.'); </script>";
    return;
} else if (!isset($_POST["usuarioEditar"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre válido.'); </script>";
    return;
} else if (!isset($_POST["correoEditar"]) || !filter_var($_POST["correoEditar"], FILTER_VALIDATE_EMAIL)) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un email válido.'); </script>";
    return;
} else if (!isset($_POST["edadEditar"]) || (new DateTime($_POST["edadEditar"]) > new DateTime('-7 years'))) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una edad válida.'); </script>";
    return;
} else if ($_POST["contraseñaEditar"] != $_POST["confirmarContraseñaEditar"]) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contraseña válida.'); </script>";
    return;
} else if (!validarNuevoUsuario($_POST["correoEditar"], (int) $_POST['idUsuario'])) {

    echo "<script> window.location.href = '../index.html'; alert('El usuario no está disponible.'); </script>";
    return;    
} else {

    $nombre = $_POST["usuarioEditar"];
    $correo = $_POST["correoEditar"];
    $edad = new DateTime($_POST["edadEditar"]);
    $contraseña = $_POST["contraseñaEditar"];
    $preferenciasTema = $_POST["temaUsuario"];
    $preferenciasIdioma = $_POST["idiomaUsuario"];

    actualizarUsuario($_POST['idUsuario'], $nombre, $correo, $edad, $contraseña, $preferenciasIdioma, $preferenciasTema);


    if ($_POST["destino"] == "config") {
        $destino = "../presentación/HTML/configuracion.html";
    } else {
        $destino = "../index.html";
    }

    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode($_POST["idUsuario"]) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '$destino'; </script>";
    return;
}
