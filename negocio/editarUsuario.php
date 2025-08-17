<?php

include_once "Usuario.php";

function validarNuevoNombreUsuario(string $nombre): bool
{

    // Verifica en la base de datos si el nombre de usuario ya existe.
    // Obviamente, quitando el que ya está registrado.

    return true;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../index.html'; alert('Método no permitido.'); </script>";
    return;
} else if (!isset($_POST["usuarioEditar"]) || !validarNuevoNombreUsuario($_POST["usuarioEditar"])) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un nombre válido.'); </script>";
    return;
} else if (!isset($_POST["correoEditar"]) || !filter_var($_POST["correoEditar"], FILTER_VALIDATE_EMAIL)) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese un email válido.'); </script>";
    return;
} else if (!isset($_POST["edadEditar"]) || (new DateTime($_POST["edadEditar"]) > new DateTime('-7 years'))) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una edad válida.'); </script>";
    return;
} else if (!isset($_POST["contraseñaEditar"]) || $_POST["contraseñaEditar"] != $_POST["confirmarContraseñaEditar"]) {

    echo "<script> window.location.href = '../index.html'; alert('Ingrese una contraseña válida.'); </script>";
    return;
} else {

    $nombre = $_POST["usuarioEditar"];
    $correo = $_POST["correoEditar"];
    $edad = new DateTime($_POST["edadEditar"]);
    $contraseña = $_POST["contraseñaEditar"];
    $confirmarContraseña = $_POST["confirmarContraseñaEditar"];
    $preferenciasTema = $_POST["temaUsuario"];
    $preferenciasIdioma = $_POST["idiomaUsuario"];

    $usuario = new Usuario($nombre, $correo, $edad, $contraseña, $preferenciasIdioma, $preferenciasTema);
    // Aquí se actualizaría el usuario en la base de datos.

    if ($_POST["destino"] == "config") {
        $destino = "../presentación/HTML/configuracion.html";
    } else {
        $destino = "../index.html";
    }

    $registrado = true;
    echo "<script> localStorage.setItem('nombre', " . json_encode($usuario->getNombre()) . "); localStorage.setItem('registroUsuario', " . json_encode($registrado) . "); window.location.href = '$destino'; </script>";
    return;
}
