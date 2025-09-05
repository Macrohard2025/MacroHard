<?php

include_once "conexión.php";
include_once "Usuario.php";
include_once "Partida.php";

function obtenerElementos(): array
{
    global $conn;

    $sql = "
        SELECT nombre, puntos, 'dinosaurio' AS tipo FROM Dinosaurio
        UNION ALL
        SELECT nombre, puntos, 'recinto' AS tipo FROM Recinto
    ";

    $resultado = mysqli_query($conn, $sql);

    $elementos = [];
    if ($resultado && mysqli_num_rows($resultado) > 0) {
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $elementos[] = $fila;
        }
    }

    return $elementos;
}

function eliminarPartida(int $idPartida): bool
{
    global $conn;

    $queryJugadores = "DELETE FROM Jugadores WHERE fk_partida_id = $idPartida";
    mysqli_query($conn, $queryJugadores);

    $queryPartida = "DELETE FROM Partida WHERE partida_id = $idPartida";
    return mysqli_query($conn, $queryPartida);
}

function recuperarPartida(int $idPartida): Partida
{
    global $conn;

    $query = "SELECT * FROM Partida WHERE partida_id = $idPartida";
    $result = mysqli_query($conn, $query);

    $row = mysqli_fetch_assoc($result);

    $queryJugadores = "SELECT fk_usuario_id FROM Jugadores WHERE fk_partida_id = $idPartida";
    $resultJugadores = mysqli_query($conn, $queryJugadores);

    $jugadores = [];
    while ($jugador = mysqli_fetch_assoc($resultJugadores)) {
        $jugadores[] = (int)$jugador['fk_usuario_id'];
    }

    return new Partida(
        new DateTime($row['fecha']),
        $row['modo_juego'],
        $row['tablero'],
        (int)$row['cantidad_jugadores'],
        $jugadores
    );
}

function guardarPartida(object $partida): int
{
    global $conn;

    $modoJuego = $partida->getModoJuego();
    $tablero = $partida->getTablero();
    $numJugadores = $partida->getNumJugadores();
    $jugadores = $partida->getJugadores();
    $fechaInicio = $partida->getFecha()->format('Y-m-d H:i:s');

    $queryPartida = "
        INSERT INTO Partida (fecha, cantidad_jugadores, modo_juego, tablero)
        VALUES ('$fechaInicio', $numJugadores, '$modoJuego', '$tablero')
    ";

    mysqli_query($conn, $queryPartida);

    $partidaId = mysqli_insert_id($conn);

    foreach ($jugadores as $jugadorId) {
        if ($jugadorId != null && $jugadorId != 0) {
            $queryJugador = "
                INSERT INTO Jugadores (fk_partida_id, fk_usuario_id, puntos_totales)
                VALUES ($partidaId, $jugadorId, 0)
            ";
            mysqli_query($conn, $queryJugador);
        }
    }

    return $partidaId;
}

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

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return (int)$row['usuario_id'];
    }

    return 0;
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

function partidaExiste(int $idPartida): bool
{
    global $conn;

    $idPartida = (int)$idPartida;
    $query = "SELECT COUNT(*) FROM Partida WHERE partida_id = $idPartida";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_row($result);
        return $row[0] > 0;
    }

    return false;
}

function usuarioExiste(int $idUsuario): bool
{
    global $conn;

    $idUsuario = (int)$idUsuario;
    $query = "SELECT COUNT(*) FROM usuario WHERE usuario_id = $idUsuario";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_row($result);
        return $row[0] > 0;
    }

    return false;
}
