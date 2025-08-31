<?php

include_once "Partida.php";

if (!isset($_GET['idPartida'])) {
    echo "<script>alert('Ocurrió un error inesperado'); window.location.href = '../presentación/HTML/Sala/menuSala.html';</script>";
    return;
} else {

    $idPartida = $_GET['idPartida'];

    // Aquí se simula la recuperación de una partida de la base de datos.
    $partida = new Partida(
        new DateTime('2000-01-01'),
        "Multi",
        'invierno',
        '3',
        ['Ana', 'Luis', 'María']
    );

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
