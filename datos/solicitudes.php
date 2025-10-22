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

    $queryJugadas = "DELETE FROM Jugadas WHERE fk_partida_id = $idPartida";
    mysqli_query($conn, $queryJugadas);

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

function registrarJugada(int $jugador, int $partida, string $dino, string $recinto): void
{
    global $conn;

    $sql = "INSERT INTO Jugadas (fk_partida_id, fk_usuario_id, fk_recinto_nombre, fk_dino_nombre)
            VALUES ($partida, $jugador, '$recinto', '$dino')";

    mysqli_query($conn, $sql);
}

function traerJugadas(int $idJugador, int $idPartida): array
{
    global $conn;

    $jugadas = [];

    $sql = "
        SELECT fk_recinto_nombre AS recinto, 
               fk_dino_nombre AS dinosaurio
        FROM Jugadas
        WHERE fk_usuario_id = $idJugador
          AND fk_partida_id = $idPartida
    ";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        while ($fila = mysqli_fetch_assoc($result)) {
            $jugadas[] = $fila;
        }
    }

    return $jugadas;
}

function recuperarResultados(int $idPartida): array
{
    global $conn;

    $resultados = [];

    $sql = "
        SELECT u.nombre, j.puntos_totales AS puntos
        FROM Jugadores j
        JOIN Usuario u ON j.fk_usuario_id = u.usuario_id
        WHERE j.fk_partida_id = $idPartida
        ORDER BY j.puntos_totales DESC
    ";

    $query = mysqli_query($conn, $sql);

    if ($query && mysqli_num_rows($query) > 0) {
        while ($fila = mysqli_fetch_assoc($query)) {
            $resultados[] = [
                "nombre" => $fila['nombre'],
                "puntos" => (int)$fila['puntos']
            ];
        }
    }

    return $resultados;
}

function traerUltimasPartidasPorUsuario(int $idUsuario): array
{
    global $conn;

    $partidas = [];

    $sql = "
        SELECT 
            p.partida_id AS id,
            DATE_FORMAT(p.fecha, '%d/%m/%Y') AS fecha,
            CONCAT(p.modo_juego, ' - ', p.tablero) AS modo,
            u.nombre AS ganador,
            j.puntos_totales AS puntos,
            (
                SELECT COUNT(*) + 1
                FROM Jugadores j2
                WHERE j2.fk_partida_id = j.fk_partida_id
                AND j2.puntos_totales > j.puntos_totales
            ) AS posicion
        FROM Jugadores j
        JOIN Partida p ON j.fk_partida_id = p.partida_id
        LEFT JOIN Usuario u ON p.fk_ganador_id = u.usuario_id
        WHERE j.fk_usuario_id = $idUsuario
        ORDER BY p.fecha DESC
        LIMIT 10
    ";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        while ($fila = mysqli_fetch_assoc($result)) {
            $partidas[] = [
                "id" => (int)$fila['id'],
                "fecha" => $fila['fecha'],
                "modo" => $fila['modo'],
                "ganador" => $fila['ganador'] ?? 'No',
                "puntos" => (int)$fila['puntos'],
                "posicion" => (int)$fila['posicion']
            ];
        }
    }

    return $partidas;
}

function recuperarJugadoresPorPartida(int $idPartida): array
{
    global $conn;

    $jugadores = [];

    $sql = "
        SELECT fk_usuario_id AS jugador
        FROM Jugadores
        WHERE fk_partida_id = $idPartida
    ";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        while ($fila = mysqli_fetch_assoc($result)) {
            $jugadores[] = $fila;
        }
    }

    return $jugadores;
}

function revisarModo(int $idPartida): string
{
    global $conn;

    $sql = "
        SELECT tablero
        FROM Partida
        WHERE partida_id = $idPartida
    ";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $fila = mysqli_fetch_assoc($result);
        return $fila['tablero'];
    }

    return "";
}

function revisarSumaPuntos(string $recinto): int
{
    global $conn;

    $sql = "
        SELECT puntos
        FROM Recinto
        WHERE nombre = '$recinto'
    ";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $fila = mysqli_fetch_assoc($result);
        return (int)$fila['puntos'];
    }

    return 0;
}

function chequearRey(string $dino, string $idJugador): bool
{
    global $conn;

    $sqlJugador = "
        SELECT COUNT(*) AS total
        FROM Jugadas
        WHERE fk_usuario_id = '$idJugador' 
          AND fk_dino_nombre = '$dino'
    ";
    $resJugador = mysqli_query($conn, $sqlJugador);
    $rowJugador = mysqli_fetch_assoc($resJugador);
    $cantidadJugador = (int)$rowJugador['total'];

    $sqlMax = "
        SELECT MAX(cant) AS maximo
        FROM (
            SELECT COUNT(*) AS cant
            FROM Jugadas
            WHERE fk_dino_nombre = '$dino'
            GROUP BY fk_usuario_id
        ) AS sub
    ";
    $resMax = mysqli_query($conn, $sqlMax);
    $rowMax = mysqli_fetch_assoc($resMax);
    $maximo = (int)$rowMax['maximo'];

    return $cantidadJugador === $maximo;
}

function actualizarPuntosJugador(string $idJugador, int $idPartida, int $puntos): void
{
    global $conn;

    $sql = "
        UPDATE Jugadores
        SET puntos_totales = $puntos
        WHERE fk_usuario_id = '$idJugador' 
          AND fk_partida_id = $idPartida
    ";

    mysqli_query($conn, $sql);
}

function determinarGanador(int $idPartida): void
{
    global $conn;

    $sql = "
        SELECT fk_usuario_id
        FROM Jugadores
        WHERE fk_partida_id = $idPartida
        ORDER BY puntos_totales DESC
        LIMIT 1
    ";

    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $fila = mysqli_fetch_assoc($result);
        $ganadorId = $fila['fk_usuario_id'];

        $updateSql = "
            UPDATE Partida
            SET fk_ganador_id = $ganadorId
            WHERE partida_id = $idPartida
        ";

        mysqli_query($conn, $updateSql);
    }
}