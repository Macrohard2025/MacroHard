<?php

include_once "../datos/solicitudes.php";

$idJugador = (int)$_GET["jugador"];
$idPartida = (int)$_GET["partida"];

$jugadas = traerJugadas($idJugador, $idPartida);

echo json_encode($jugadas);
