<?php

include_once "Partida.php";
include_once "../datos/solicitudes.php";

if (!isset($_GET['idPartida'])) {
    echo "<script>alert('Ocurrió un error inesperado'); window.location.href = '../presentación/HTML/Sala/menuSala.html';</script>";
    return;
} else {

    $idPartida = $_GET['idPartida'];

    $partida = recuperarPartida($idPartida);

    $data = [
        'fecha' => $partida->getFecha()->format('Y-m-d'),
        'modoJuego' => $partida->getModoJuego(),
        'tablero' => $partida->getTablero(),
        'numJugadores' => $partida->getNumJugadores(),
        'jugadores' => $partida->getJugadores()
    ];

    echo json_encode($data);
    return;
}
