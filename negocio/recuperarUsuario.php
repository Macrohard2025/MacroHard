<?php
include_once "../datos/solicitudes.php";

if (!isset($_GET['idUsuario'])) {
    echo "<script>alert('Ocurrió un error inesperado'); window.location.href = '../index.html';</script>";
    return;
}

$idUsuario = (int) $_GET['idUsuario'];

$usuario = recuperarUsuarioPorId($idUsuario);

if (!$usuario) {
    echo "<script>alert('Usuario no encontrado'); window.location.href = '../index.html';</script>";
    return;
}

$data = [
    'nombre' => $usuario->getNombre(),
    'email' => $usuario->getEmail(),
    'edad' => $usuario->getEdad()->format('Y-m-d'),
    'idioma' => $usuario->getPreferenciasIdioma(),
    'tema' => $usuario->getPreferenciasTema()
];

echo json_encode($data);
?>