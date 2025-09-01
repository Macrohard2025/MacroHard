<?php

include_once "conexión.php";
include_once "Usuario.php";

function validarUsuario(string $email): bool
{
    global $conn;

    $query = "SELECT * FROM Usuario WHERE email='$email'";
    $result = mysqli_query($conn, $query);

    return mysqli_num_rows($result) == 0;
}

function validarNuevoUsuario(string $email, int $idUsuario): bool
{
    global $conn;

    $query = "SELECT * FROM Usuario WHERE email='$email' AND usuario_id != $idUsuario";
    $result = mysqli_query($conn, $query);

    return mysqli_num_rows($result) == 0;
}

function traerIdUsuario(string $email): int
{
    global $conn;

    $query = "SELECT usuario_id FROM Usuario WHERE email='$email'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);

    return (int)$row['usuario_id'];
}

function guardarUsuario(Usuario $usuario): bool
{
    global $conn;

    $nombre = $usuario->getNombre();
    $email = $usuario->getEmail();
    $edad = $usuario->getEdad()->format('Y-m-d');
    $contraseña = password_hash($usuario->getContraseña(), PASSWORD_DEFAULT);
    $idioma = $usuario->getPreferenciasIdioma();
    $tema = $usuario->getPreferenciasTema();

    $query = "INSERT INTO Usuario (nombre, contrasena, email, fecha_nacimiento, preferencias_idioma, preferencias_tema)
              VALUES ('$nombre', '$contraseña', '$email', '$edad', '$idioma', '$tema')";

    return mysqli_query($conn, $query);
}

function buscarContraseñaUsuario(int $idUsuario, string $contraseña): bool
{
    global $conn;

    $query = "SELECT contrasena FROM Usuario WHERE usuario_id = $idUsuario";
    $result = mysqli_query($conn, $query);

    if (!$result || mysqli_num_rows($result) === 0) {
        return false;
    }

    $row = mysqli_fetch_assoc($result);
    $hash = $row['contrasena'];

    return password_verify($contraseña, $hash);
}

function recuperarUsuarioPorId(int $idUsuario): ?Usuario
{
    global $conn;
    $query = "SELECT * FROM Usuario WHERE usuario_id=$idUsuario";
    $result = mysqli_query($conn, $query);

    $row = mysqli_fetch_assoc($result);

    return new Usuario(
        $row['nombre'],
        $row['email'],
        new DateTime($row['fecha_nacimiento']),
        $row['contrasena'],
        $row['preferencias_idioma'],
        $row['preferencias_tema']
    );
}

function actualizarUsuario(int $idUsuario, string $nombre, string $email, DateTime $edad, ?string $contraseña, string $idioma, string $tema): bool
{
    global $conn;

    $fechaNacimiento = $edad->format('Y-m-d');

    $query = "UPDATE Usuario SET nombre='$nombre', email='$email', fecha_nacimiento='$fechaNacimiento', preferencias_idioma='$idioma', preferencias_tema='$tema'";

    if (!is_null($contraseña)) {
        $hash = password_hash($contraseña, PASSWORD_DEFAULT);
        $query .= ", contrasena='$hash'";
    }

    $query .= " WHERE usuario_id=$idUsuario";

    return mysqli_query($conn, $query);
}

function eliminarUsuario(int $idUsuario): void
{
    global $conn;

    $query = "DELETE FROM Usuario WHERE usuario_id = $idUsuario";
    mysqli_query($conn, $query);
}

?>