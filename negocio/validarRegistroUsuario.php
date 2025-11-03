<?php

include_once "Usuario.php";
include_once "../datos/solicitudes.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Metodo no permitido.'); </script>";
    return;
} else if (!isset($_POST["nombre"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre valido.'); </script>";
    return;
} else if (!isset($_POST["correo"]) || !filter_var($_POST["correo"], FILTER_VALIDATE_EMAIL)) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un email valido.'); </script>";
    return;
} else if (!isset($_POST["edad"]) || (new DateTime($_POST["edad"]) > new DateTime('-7 years'))) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una edad valida.'); </script>";
    return;
} else if (!isset($_POST["contrasenia"]) || $_POST["contrasenia"] != $_POST["confirmarcontrasenia"]) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contrasenia valida.'); </script>";
    return;
} else if (!validarUsuario($_POST["correo"])) {

    echo "<script> window.location.href = '../index.html'; alert('El usuario no esta disponible.'); </script>";
    return;
} else {

    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $edad = new DateTime($_POST["edad"]);
    $contrasenia = $_POST["contrasenia"];
    $preferenciasIdioma = $_POST["preferenciasIdioma"];
    $preferenciasTema = $_POST["preferenciasTema"];

    $usuario = new Usuario($nombre, $correo, $edad, $contrasenia, $preferenciasIdioma, $preferenciasTema);

    $registrado = guardarUsuario($usuario);
    echo "<script> localStorage.setItem('idUsuario', " . json_encode(traerIdUsuario($usuario->getEmail())) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
}
