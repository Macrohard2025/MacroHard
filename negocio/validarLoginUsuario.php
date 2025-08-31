<?php

include_once "Usuario.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Método no permitido.'); </script>";
    return;
} else if (!isset($_POST["nombreLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre válido.'); </script>";
    return;

} else if (!isset($_POST["contraseñaLogin"]) || !buscarContraseñaUsuario(traerIdUsuario($_POST["nombreLogin"], $_POST["contraseñaLogin"]), $_POST["contraseñaLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contraseña válida.'); </script>";
    return;

} else if(!isset($_POST["numJugador"])) {

    $nombre = $_POST["nombreLogin"];
    $contraseña = $_POST["contraseñaLogin"];

    $registrado = true;
    echo "<script> localStorage.setItem('idUsuario', " . json_encode(traerIdUsuario($nombre, $contraseña)) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
}
