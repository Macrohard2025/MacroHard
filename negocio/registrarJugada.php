<?php
include_once "../datos/solicitudes.php";

$jugador = (int)$_POST['jugador'];
$partida = (int)$_POST['partida'];
$dino = trim($_POST['dino']);
$recinto = trim($_POST['recinto']);
$destino = $_POST["destino"];

registrarJugada($jugador, $partida, $dino, $recinto);

echo "<script> window.location.href='../presentación/HTML/Sala/$destino.html';</script>";
exit;
