<?php

include_once "Usuario.php";

function validarNombreUsuario(string $nombre): bool
{

    // Verifica en la base de datos si el nombre de usuario ya existe.

    return true;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Método no permitido.'); </script>";
    return;
} else if (!isset($_POST["nombre"]) || !validarNombreUsuario($_POST["nombre"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre válido.'); </script>";
    return;
} else if (!isset($_POST["correo"]) || !filter_var($_POST["correo"], FILTER_VALIDATE_EMAIL)) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un email válido.'); </script>";
    return;
} else if (!isset($_POST["edad"]) || (new DateTime($_POST["edad"]) > new DateTime('-7 years'))) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una edad válida.'); </script>";
    return;
} else if (!isset($_POST["contraseña"]) || $_POST["contraseña"] != $_POST["confirmarContraseña"]) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contraseña válida.'); </script>";
    return;
} else {

    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $edad = new DateTime($_POST["edad"]);
    $contraseña = $_POST["contraseña"];
    $preferenciasIdioma = $_POST["preferenciasIdioma"];
    $preferenciasTema = $_POST["preferenciasTema"];

    $usuario = new Usuario($nombre, $correo, $edad, $contraseña, $preferenciasIdioma, $preferenciasTema);
    // Aquí se guardaría el usuario en la base de datos.

    $registrado = true;
    echo "<script> localStorage.setItem('nombre', " . json_encode($usuario->getNombre()) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '../index.html'; </script>";
    return;
}
