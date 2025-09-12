<?php 
include_once "../datos/solicitudes.php";

if (session_status() === PHP_SESSION_ACTIVE) {
    session_destroy();
}

if (!isset($_POST['idPartida']) || empty(trim($_POST['idPartida']))) {
    echo "<script>alert('Debe ingresar un ID de partida.'); window.history.back();</script>";
    exit;
}

$idPartida = trim($_POST['idPartida']);

if (!is_numeric($idPartida) || (int)$idPartida <= 0) {
    echo "<script>alert('ID de partida inválido.'); window.history.back();</script>";
    exit;
}

$idPartida = (int)$idPartida;

if (!partidaExiste($idPartida)) {
    echo "<script>alert('No se encontró la partida especificada.'); window.history.back();</script>";
    exit;
}

eliminarPartida($idPartida);

if (isset($_POST['origen']) && $_POST['origen'] === 'dashboard') {
    echo "<script>alert('Partida eliminada correctamente'); window.location.href='../presentación/HTML/dashboard.html';</script>";
    exit;
} else {
    echo "<script>window.location.href='../presentación/HTML/Sala/menuSala.html';</script>";
    exit;
}
?>
