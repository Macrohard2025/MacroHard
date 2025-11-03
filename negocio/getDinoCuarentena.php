<?php
include_once "../datos/solicitudes.php";

if (!isset($_GET['idPartida']) || !isset($_GET['idUsuario'])) {
    echo json_encode(['error' => 'Falta idPartida o idUsuario']);
    exit;
}

$idPartida = (int)$_GET['idPartida'];
$idUsuario = (int)$_GET['idUsuario'];

$dino = traerDinoCuarentena($idPartida, $idUsuario);

echo json_encode(['dinoCuarentena' => $dino]);
