<?php

include_once "Usuario.php";

function buscarNombreUsuario(string $nombre): bool {
    // Aquí se simula la búsqueda del nombre de usuario en la base de datos.
    return true; 
}

function buscarContraseñaUsuario(string $nombre, string $contraseña): bool {
    // Aquí se simula la verificación de la contraseña del usuario en la base de datos.
    return true; 
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Método no permitido.'); </script>";
    return;
} else if (!isset($_POST["nombreLogin"]) || !buscarNombreUsuario($_POST["nombreLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre válido.'); </script>";
    return;

} else if (!isset($_POST["contraseñaLogin"]) || !buscarContraseñaUsuario($_POST["nombreLogin"], $_POST["contraseñaLogin"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contraseña válida.'); </script>";
    return;

} else {

    $nombre = $_POST["nombreLogin"];

    $registrado = true;
    echo "<script> localStorage.setItem('nombre', " . json_encode($nombre) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
}
