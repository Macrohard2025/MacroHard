<?php

include_once "Partida.php";
include_once "../datos/solicitudes.php";
include_once "Usuario.php";
date_default_timezone_set('America/Montevideo');
session_start();

function traerNombreUsuario(int $id): string
{
    $datosUsuario = recuperarUsuarioPorId($id);
    $nombreUsuario = $datosUsuario->getNombre(); 
    return "$nombreUsuario";
}

function validarLoginUsuario(string $correo, string $contraseña): bool
{
    return buscarContraseñaUsuario(traerIdUsuario($correo), $contraseña);
}

function traerEdadUsuario(int $id): DateTime
{
    $datosUsuario = recuperarUsuarioPorId($id);
    $edadUsuario = $datosUsuario->getEdad(); 
    return new DateTime($edadUsuario->format('Y-m-d'));
}

function ordenarJugadoresPorEdad(array $jugadores): array
{
    $jugadoresConInfo = [];

    foreach ($jugadores as $jugadorId) {
        if ($jugadorId != 0) {
            $jugadoresConInfo[] = [
                "id" => $jugadorId,
                "nombre" => traerNombreUsuario($jugadorId),
                "edad" => traerEdadUsuario($jugadorId)
            ];
        }
    }

    usort($jugadoresConInfo, function ($a, $b) {
        return $b["edad"]->getTimestamp() <=> $a["edad"]->getTimestamp();
    });

    return array_column($jugadoresConInfo, "nombre");
}


function comenzarPartida($datos)
{
    $modoJuego = $datos["modoJuego"];
    $tablero = $datos["tablero"];
    $numJugadores = (int) $datos["numJugadores"];

    $jugadores = [
        (int) $datos["jugador1"],
        (int) $datos["jugador2"],
        (int) $datos["jugador3"],
        (int) $datos["jugador4"],
        (int) $datos["jugador5"]
    ];

    $partida = new Partida(new DateTime(), $modoJuego, $tablero, $numJugadores, $jugadores);

    $nombresUsuarios = ordenarJugadoresPorEdad($jugadores);
    
    session_destroy();
    echo "<script> localStorage.setItem('idPartida', " . guardarPartida($partida) . "); localStorage.setItem('jugadorActual', '" . $nombresUsuarios[0] . "'); localStorage.setItem('nombresUsuarios', '" . json_encode($nombresUsuarios) . "'); window.location.href = '../presentación/HTML/Sala/partida.html'; </script>";
    return;
}

function comenzarControl($datos)
{
    $modoJuego = $datos["modoJuego"];
    $tablero = $datos["tablero"];
    $numJugadores = (int) $datos["numJugadores"];

    $jugadores = [
        (int) $datos["jugador1"],
        (int) $datos["jugador2"],
        (int) $datos["jugador3"],
        (int) $datos["jugador4"],
        (int) $datos["jugador5"]
    ];

    $partida = new Partida(new DateTime(), $modoJuego, $tablero, $numJugadores, $jugadores);

    $nombresUsuarios = ordenarJugadoresPorEdad($jugadores);

    session_destroy();
    echo "<script> localStorage.setItem('idPartida', " . guardarPartida($partida) . "); localStorage.setItem('jugadorActual', '" . $nombresUsuarios[0] . "'); localStorage.setItem('nombresUsuarios', '" . json_encode($nombresUsuarios) . "'); window.location.href = '../presentación/HTML/Sala/controlPartidas.html'; </script>";
    return;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    echo "<script> window.location.href = '../presentación/HTML/Sala/menuSala.html'; alert('Método no permitido.'); </script>";
    return;
} else if (isset($_POST["jugador1"]) && !isset($_SESSION["form_data"])) {

    $_SESSION["form_data"] = $_POST;
    $datos = $_SESSION["form_data"];

    if ($_POST["numJugadores"] != "1") {
        pedirCredenciales(2);
    } else {
        $datos["jugador2"] = null;
        $datos["jugador3"] = null;
        $datos["jugador4"] = null;
        $datos["jugador5"] = null;
        if ($datos["modoJuego"] != "Control") {
            comenzarPartida($datos);
        } else {
            comenzarControl($datos);
        }
    }
} else if (isset($_POST["correoLogin2"]) && !isset($_SESSION["form_data"]["jugador2"])) {

    if (!validarLoginUsuario($_POST["correoLogin2"], $_POST["contraseñaLogin2"])) {
        echo "<script> alert('Credenciales inválidas. Ingrese de nuevo.'); </script>";
        pedirCredenciales(2);
        return;
    } else {
        $datos = $_SESSION["form_data"];
        $datos["jugador2"] = traerIdUsuario($_POST["correoLogin2"]);

        if ($datos["numJugadores"] != "2") {
            $_SESSION["form_data"] = $datos;
            pedirCredenciales(3);
        } else {
            $datos["jugador3"] = null;
            $datos["jugador4"] = null;
            $datos["jugador5"] = null;
            if ($datos["modoJuego"] != "Control") {
                comenzarPartida($datos);
            } else {
                comenzarControl($datos);
            }
        }
    }
} else if (isset($_POST["correoLogin3"]) && !isset($_SESSION["form_data"]["jugador3"])) {

    if (!validarLoginUsuario($_POST["correoLogin3"], $_POST["contraseñaLogin3"])) {
        echo "<script> alert('Credenciales inválidas. Ingrese de nuevo.'); </script>";
        pedirCredenciales(3);
        return;
    } else {
        $datos = $_SESSION["form_data"];
        $datos["jugador3"] = traerIdUsuario($_POST["correoLogin3"]);

        if ($datos["numJugadores"] != "3") {
            $_SESSION["form_data"] = $datos;
            pedirCredenciales(4);
        } else {
            $datos["jugador4"] = null;
            $datos["jugador5"] = null;
            if ($datos["modoJuego"] != "Control") {
                comenzarPartida($datos);
            } else {
                comenzarControl($datos);
            }
        }
    }
} else if (isset($_POST["correoLogin4"]) && !isset($_SESSION["form_data"]["jugador4"])) {

    if (!validarLoginUsuario($_POST["correoLogin4"], $_POST["contraseñaLogin4"])) {
        echo "<script> alert('Credenciales inválidas. Ingrese de nuevo.'); </script>";
        pedirCredenciales(4);
        return;
    } else {
        $datos = $_SESSION["form_data"];
        $datos["jugador4"] = traerIdUsuario($_POST["correoLogin4"]);

        if ($datos["numJugadores"] != "4") {
            $_SESSION["form_data"] = $datos;
            pedirCredenciales(5);
        } else {
            $datos["jugador5"] = null;
            if ($datos["modoJuego"] != "Control") {
                comenzarPartida($datos);
            } else {
                comenzarControl($datos);
            }
        }
    }
} else if (isset($_POST["correoLogin5"]) && !isset($_SESSION["form_data"]["jugador5"])) {

    if (!validarLoginUsuario($_POST["correoLogin5"], $_POST["contraseñaLogin5"])) {
        echo "<script> alert('Credenciales inválidas. Ingrese de nuevo.'); </script>";
        pedirCredenciales(5);
        return;
    } else {
        $datos = $_SESSION["form_data"];
        $datos["jugador5"] = traerIdUsuario($_POST["correoLogin5"]);
        if ($datos["modoJuego"] != "Control") {
            comenzarPartida($datos);
        } else {
            comenzarControl($datos);
        }
    }
} else {

    session_destroy();
    echo "<script> window.location.href = '../presentación/HTML/Sala/menuSala.html'; alert('Acción no permitida.'); </script>";
    return;
}

?>

<?php function pedirCredenciales($necesidad)
{ ?>

    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pedido de credenciales</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
        <link rel="icon" href="../recursos/img/draftosaurus-logo.png" type="image/png">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="../presentación/CSS/estilosSala.css">
    </head>

    <body>

        <section class="container-formulario-jugador" id="formulario-jugador">
            <form action="" method="post" class="formulario-jugador">
                <p>Ingrese los datos del jugador <?php echo $necesidad; ?></p>
                <input type="email" name="correoLogin<?php echo $necesidad; ?>" id="nombre-jugador" placeholder="Correo electrónico" required>
                <input type="password" name="contraseñaLogin<?php echo $necesidad; ?>" id="contrasena-jugador" placeholder="Contraseña" required>
                <button type="submit" class="btn btn-primary">Unirse a la sala</button>
                <button id="cancelar-form" type="button" onclick="window.location.href='cancelarSala.php'" class="btn btn-secondary">Cancelar</button>
            </form>
        </section>

    </body>

    </html>

<?php } ?>