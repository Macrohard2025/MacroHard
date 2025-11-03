<?php

include_once "Usuario.php";
include_once "../datos/solicitudes.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Metodo no permitido.'); </script>";
    return;
} else if ($_POST["correoLogin"] == "admin@macrohard.com" && $_POST["contraseniaLogin"] == "admin123") {

    $correo = $_POST["correoLogin"];

    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode(traerIdUsuario($correo)) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
} else if (!isset($_POST["correoLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un correo valido.'); </script>";
    return;
} else if (!isset($_POST["contraseniaLogin"]) || !buscarcontraseniaUsuario(traerIdUsuario($_POST["correoLogin"]), $_POST["contraseniaLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contrasenia o correo valido.'); </script>";
    return;
} else if (!revisarJugadorActivo(traerIdUsuario($_POST["correoLogin"]))) {

    echo "<script> window.location.href = '../index.html'; alert('El usuario no esta activo.'); </script>";
    return;
} else if (!isset($_POST["numJugador"])) {

    $correo = $_POST["correoLogin"];
    $contrasenia = $_POST["contraseniaLogin"];

    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode(traerIdUsuario($correo)) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
}
