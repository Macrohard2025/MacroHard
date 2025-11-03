<?php
session_start();
include_once "../datos/solicitudes.php";

$idPartida = (int)($_GET['idPartida'] ?? 0);
$partida = recuperarPartida($idPartida);
$jugadores = $partida->getJugadores();
$modoJuego = $partida->getModoJuego();

$dinos = ["T-Rex", "Trike", "Ptera", "Bronto", "Estego", "Plesio"];

if (!isset($_SESSION['manos'][$idPartida])) exit;

if ($modoJuego === "Solo") {
    $jugadorId = $jugadores[0];
    $manoActual = $_SESSION['manos'][$idPartida][$jugadorId] ?? [];
    $cantidad = count($manoActual); 
    $nuevaMano = [];
    for ($i = 0; $i < $cantidad; $i++) {
        $nuevaMano[] = $dinos[array_rand($dinos)];
    }
    $_SESSION['manos'][$idPartida][$jugadorId] = $nuevaMano;
} else {
    $manosActuales = [];
    foreach ($jugadores as $jugadorId) {
        $manosActuales[] = $_SESSION['manos'][$idPartida][$jugadorId] ?? [];
    }

    $total = count($jugadores);
    for ($i = 0; $i < $total; $i++) {
        $_SESSION['manos'][$idPartida][$jugadores[$i]] = $manosActuales[($i - 1 + $total) % $total];
    }
}

exit;
