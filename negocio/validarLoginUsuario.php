<?php

include_once "Usuario.php";
include_once "../datos/solicitudes.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Método no permitido.'); </script>";
    return;
} else if ($_POST["correoLogin"] == "admin@macrohard.com" && $_POST["contraseñaLogin"] == "admin123") {

    $correo = $_POST["correoLogin"];
    
    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode(traerIdUsuario($correo)) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
} else if (!isset($_POST["correoLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un correo válido.'); </script>";
    return;

} else if (!isset($_POST["contraseñaLogin"]) || !buscarContraseñaUsuario(traerIdUsuario($_POST["correoLogin"]), $_POST["contraseñaLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contraseña o correo válido.'); </script>";
    return;

} else if(!isset($_POST["numJugador"])) {

    $correo = $_POST["correoLogin"];
    $contraseña = $_POST["contraseñaLogin"];

    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode(traerIdUsuario($correo)) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
}
