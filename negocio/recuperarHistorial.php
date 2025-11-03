<?php

include_once '../datos/solicitudes.php';

if (!isset($_GET['idUsuario'])) {
    echo "<script>alert('Ocurrio un error inesperado'); window.location.href = '../presentacion/HTML/Sala/menuSala.html';</script>";
    return;
} else {
    $idUsuario = (int)$_GET['idUsuario'];
    $partidas = traerUltimasPartidasPorUsuario($idUsuario);
    echo json_encode($partidas);
    return;
}
