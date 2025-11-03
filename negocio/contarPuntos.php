<?php

include_once "../datos/solicitudes.php";

$jugadores = recuperarJugadoresPorPartida($_GET["idPartida"]);
$orden = ordenarJugadores($jugadores);

foreach ($jugadores as $jugador) {
    $jugadas = traerJugadas($jugador["jugador"], $_GET["idPartida"]);
    if (revisarModo($_GET["idPartida"]) === "Verano") {
        $puntos = contarPuntosVerano($jugadas, $jugador["jugador"]);
        actualizarPuntosJugador($jugador["jugador"], $_GET["idPartida"], $puntos);
    } else {
        $puntos = contarPuntosInvierno($jugadas, $orden, $jugador["jugador"], $_GET["idPartida"]);
        actualizarPuntosJugador($jugador["jugador"], $_GET["idPartida"], $puntos);
    }
}
determinarGanador($_GET["idPartida"]);

function contarPuntosInvierno(array $jugadas, array $orden, int $idJugador, int $idPartida): int
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
                if ($cantidad === 1) {
                    $puntos += 2;
                    break;
                }

                $especiesUnicas = array_values(array_unique($dinos));

                if (count($especiesUnicas) > 2) {
                    break;
                }

                if (count($especiesUnicas) === 2) {
                    $a = $especiesUnicas[0];
                    $b = $especiesUnicas[1];

                    $patronAValido = true;
                    $patronBValido = true;

                    for ($i = 0; $i < $cantidad; $i++) {
                        $esperadoA = ($i % 2 === 0) ? $a : $b;
                        $esperadoB = ($i % 2 === 0) ? $b : $a;

                        if ($dinos[$i] !== $esperadoA) $patronAValido = false;
                        if ($dinos[$i] !== $esperadoB) $patronBValido = false;

                        if (! $patronAValido && ! $patronBValido) break;
                    }

                    if ($patronAValido || $patronBValido) {
                        $puntos += ($cantidad - 1) * revisarSumaPuntos("BosqueInv") + 2;
                    }
                }

                break;
            case 'PuenteIzq':
            case 'PuenteDer':
                if ($recinto === 'PuenteIzq') {
                    $izq = $recintos['PuenteIzq'] ?? [];
                    $der = $recintos['PuenteDer'] ?? [];

                    $parejas = 0;
                    $derTemp = $der;

                    foreach ($izq as $dinoIzq) {
                        $pos = array_search($dinoIzq, $derTemp);
                        if ($pos !== false) {
                            $parejas++;
                            unset($derTemp[$pos]);
                        }
                    }

                    $puntos += $parejas * revisarSumaPuntos("PuenteIzq");
                }
                break;

            case 'Puesto':

                if ($cantidad === 1) {
                    $dino = $dinos[0];
                    $posActual = array_search($idJugador, $orden, true);
                    if ($posActual !== false) {
                        $idDerecha = ($posActual === count($orden) - 1) ? $orden[0] : $orden[$posActual + 1];
                        $jugadasDerecha = traerJugadas($idDerecha, $idPartida);
                        $mismoDino = 0;
                        foreach ($jugadasDerecha as $j) {
                            if ($j['dinosaurio'] === $dino) $mismoDino++;
                        }
                        $puntos += $mismoDino * revisarSumaPuntos("Puesto");
                    }
                }

                break;

            case 'Piramide':

                $piramideOrden = armarPiramide($jugadas);

                if ($cantidad === 0) break;

                if (($piramideOrden[0] ?? null) !== ($piramideOrden[1] ?? null) && ($piramideOrden[0] ?? null) !== ($piramideOrden[3] ?? null) && $cantidad >= 1) {
                    $puntos += revisarSumaPuntos("Piramide");
                }

                if (($piramideOrden[1] ?? null) !== ($piramideOrden[0] ?? null) && ($piramideOrden[1] ?? null) !== ($piramideOrden[2] ?? null) && ($piramideOrden[1] ?? null) !== ($piramideOrden[3] ?? null) && ($piramideOrden[1] ?? null) !== ($piramideOrden[4] ?? null) && $cantidad >= 2) {
                    $puntos += revisarSumaPuntos("Piramide");
                }

                if (($piramideOrden[2] ?? null) !== ($piramideOrden[1] ?? null) && ($piramideOrden[2] ?? null) !== ($piramideOrden[4] ?? null) && $cantidad >= 3) {
                    $puntos += revisarSumaPuntos("Piramide");
                }

                if (($piramideOrden[3] ?? null) !== ($piramideOrden[0] ?? null) && ($piramideOrden[3] ?? null) !== ($piramideOrden[1] ?? null) && ($piramideOrden[3] ?? null) !== ($piramideOrden[4] ?? null) && ($piramideOrden[3] ?? null) !== ($piramideOrden[5] ?? null) && $cantidad >= 4) {
                    $puntos += revisarSumaPuntos("Piramide") * 2;
                }

                if (($piramideOrden[4] ?? null) !== ($piramideOrden[1] ?? null) && ($piramideOrden[4] ?? null) !== ($piramideOrden[2] ?? null) && ($piramideOrden[4] ?? null) !== ($piramideOrden[3] ?? null) && ($piramideOrden[4] ?? null) !== ($piramideOrden[5] ?? null) && $cantidad >= 5) {
                    $puntos += revisarSumaPuntos("Piramide") * 2;
                }

                if (($piramideOrden[5] ?? null) !== ($piramideOrden[3] ?? null) && ($piramideOrden[5] ?? null) !== ($piramideOrden[4] ?? null) && $cantidad === 6) {
                    $puntos += revisarSumaPuntos("Piramide") * 3 + 1;
                }

                break;

            case 'Rio':
                $puntos += $cantidad * revisarSumaPuntos("Rio");
                break;
        }

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

function armarPiramide(array $jugadas): array
{
    $piramide = [];

    foreach ($jugadas as $jugada) {
        if ($jugada['recinto'] === 'Piramide') {
            $piramide[] = $jugada['dinosaurio'];
        }
    }

    return $piramide;
}


echo json_encode(["status" => "ok"]);
