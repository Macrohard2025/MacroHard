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

function contarPuntosInvierno(array $jugadas, string $idJugador, array $jugadoresEnOrden): int
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
            if ($d === 'T-Rex') $rexCount++;
        }

        switch ($recinto) {
            case 'BosqueInv':
                // Dos especies alternadas, 1 punto por dinosaurio
                if (count($tipos) <= 2) {
                    $puntos += $cantidad * revisarSumaPuntos("BosqueInv");
                }
                break;

            case 'Puente':
                // 6 puntos por cada pareja con un miembro en cada orilla
                // Asumimos que $dinos[0..n/2] es la orilla izquierda, $dinos[n/2..] derecha
                $mitad = intdiv($cantidad, 2);
                $izq = array_slice($dinos, 0, $mitad);
                $der = array_slice($dinos, $mitad);
                $parejas = 0;
                foreach ($izq as $dinoIzq) {
                    if (in_array($dinoIzq, $der)) $parejas++;
                }
                $puntos += $parejas * revisarSumaPuntos("Puente");
                break;

            case 'Puesto':
                // 2 puntos por cada dinosaurio de la misma especie que el jugador a la derecha
                $idxJugador = array_search($idJugador, $jugadoresEnOrden);
                $jugadorDerecha = $jugadoresEnOrden[($idxJugador + 1) % count($jugadoresEnOrden)];
                $jugadasDerecha = traerJugadas($jugadorDerecha, $_GET["idPartida"]);
                $dinosDerecha = array_map(fn($j) => $j['dinosaurio'], $jugadasDerecha);
                foreach ($dinos as $dino) {
                    if (in_array($dino, $dinosDerecha)) $puntos += revisarSumaPuntos("Puesto");
                }
                break;

            case 'Piramide':
                // Cada dinosaurio suma puntos según escalón
                $escalon = [1, 1, 1, 2, 2, 3]; // fila inferior=1, intermedia=2, superior=3
                for ($i = 0; $i < $cantidad && $i < 6; $i++) {
                    $puntos += $escalon[$i] * revisarSumaPuntos("Piramide");
                }
                break;

            case 'Cuarentena':
                // Mover dinosaurio a otro recinto: puntaje depende del nuevo recinto
                // Para simplificar, lo sumamos al Río
                $puntos += $cantidad * revisarSumaPuntos("Rio");
                break;

            case 'Rio':
                $puntos += $cantidad * revisarSumaPuntos("Rio");
                break;
        }

        // Bonus por cada T-Rex
        $puntos += $rexCount;
    }

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
