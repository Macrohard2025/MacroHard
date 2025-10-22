<?php

include_once "../datos/solicitudes.php";

$jugadores = recuperarJugadoresPorPartida($_GET["idPartida"]);

foreach ($jugadores as $jugador) {
    $jugadas = traerJugadas($jugador["jugador"], $_GET["idPartida"]);
    if (revisarModo($_GET["idPartida"]) === "Verano") {
        $puntos = contarPuntosVerano($jugadas, $jugador["jugador"]);
        actualizarPuntosJugador($jugador["jugador"], $_GET["idPartida"], $puntos);
    } else {
        $puntos = contarPuntosInvierno($jugadas);
        actualizarPuntosJugador($jugador["jugador"], $_GET["idPartida"], $puntos);
    }
}
determinarGanador($_GET["idPartida"]);

function contarPuntosInvierno(array $jugadas): int
{
    $puntos = 10;
    return $puntos;
}

function contarPuntosVerano(array $jugadas, string $idJugador): int
{
    $puntos = 0;
    $recintos = [];

    foreach ($jugadas as $jugada) {
        $recinto = $jugada['recinto'];
        $dino = $jugada['dinosaurio'];
        $recintos[$recinto][] = $dino;
    }

    foreach ($recintos as $recinto => $dinos) {
        $cantidad = count($dinos);
        $tipos = array_count_values($dinos);
        $rexCount = 0;

        foreach ($dinos as $d) {
            if ($d === 'T-Rex') {
                $rexCount++;
            }
        }

        switch ($recinto) {
            case 'Bosque':
                if (count($tipos) === 1) {
                    if ($cantidad === 1) {
                        $puntos += revisarSumaPuntos("Bosque");
                    } else if ($cantidad > 1) {
                        $puntos += ($cantidad - 1) * (revisarSumaPuntos("Bosque") * 2) + 2;
                    }
                }
                break;

            case 'Prado':
                if (count($dinos) === count(array_unique($dinos))) {
                    $puntos += (count($dinos) - 1) * revisarSumaPuntos("Prado") + 1;
                }
                break;

            case 'Amor':
                foreach ($tipos as $cant) {
                    $puntos += intdiv($cant, 2) * revisarSumaPuntos("Amor");
                }
                break;

            case 'Trio':
                if ($cantidad === 3) {
                    $puntos += revisarSumaPuntos("Trio");
                }
                break;

            case 'Rey':
                if (chequearRey($dinos[0], $idJugador)) {
                    $puntos += revisarSumaPuntos("Rey");
                }
                break;

            case 'Isla':
                if ($cantidad === 1) {
                    $nombreDino = $dinos[0];
                    $apariciones = 0;
                    foreach ($recintos as $r2 => $ds2) {
                        $apariciones += count(array_keys($ds2, $nombreDino));
                    }
                    if ($apariciones === 1) {
                        $puntos += revisarSumaPuntos("Isla");
                    }
                }
                break;

            case 'Rio':
                $puntos += $cantidad * 1;
                break;
        }

        $puntos += $rexCount;
    }


    return $puntos;
}

echo json_encode(["status" => "ok"]);
