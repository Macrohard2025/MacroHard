<?php
include_once "../datos/solicitudes.php"; 

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$idPartida = (int)$_GET['idPartida'];

if (isset($_SESSION['manos'][$idPartida])) {
    header('Content-Type: application/json');
    echo json_encode($_SESSION['manos'][$idPartida]);
    exit;
}

$dinos = ["T-Rex", "Trike", "Ptera", "Bronto", "Estego", "Plesio"];
$manos = [];

$partida = recuperarPartida($idPartida);
$jugadores = $partida->getJugadores();

foreach ($jugadores as $jugadorId) {
    $mano = [];
    for ($i = 0; $i < 6; $i++) {
        $indice = array_rand($dinos);
        $mano[] = $dinos[$indice];
    }
    $manos[$jugadorId] = $mano;
}

$_SESSION['manos'][$idPartida] = $manos;

header('Content-Type: application/json');
echo json_encode($manos);
