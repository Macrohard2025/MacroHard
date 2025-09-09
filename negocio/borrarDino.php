<?php
session_start();

$jugadorId = (int)$_POST['jugadorId'];
$dino = $_POST['dino'];
$idPartida = (int)$_POST['idPartida'];

$dinos = ["T-Rex", "Trike", "Ptera", "Bronto", "Estego", "Plesio"];

if (!isset($_SESSION['manos'][$idPartida][$jugadorId])) {
    $_SESSION['manos'][$idPartida][$jugadorId] = [];
}

$mano = &$_SESSION['manos'][$idPartida][$jugadorId];

$index = array_search($dino, $mano);
if ($index !== false) {
    array_splice($mano, $index, 1);
}

if (count($mano) === 0) {
    for ($i = 0; $i < 6; $i++) {
        $mano[] = $dinos[array_rand($dinos)];
    }
}

exit;