<?php
include_once "../datos/solicitudes.php";

$jugador = (int)$_POST['jugador'];
$partida = (int)$_POST['partida'];
$dino = trim($_POST['dino']);
$recinto = trim($_POST['recinto']);

registrarJugada($jugador, $partida, $dino, $recinto);

echo "<script> window.location.href='../presentación/HTML/Sala/partida.html';</script>";
exit;
