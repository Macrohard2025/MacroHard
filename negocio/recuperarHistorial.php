<?php

include_once '../datos/solicitudes.php';

if (!isset($_GET['idUsuario'])) {
    echo "<script>alert('Ocurrió un error inesperado'); window.location.href = '../presentación/HTML/Sala/menuSala.html';</script>";
    return;
} else {
    $idUsuario = (int)$_GET['idUsuario'];
    $partidas = traerUltimasPartidasPorUsuario($idUsuario);
    echo json_encode($partidas);
    return;
}
