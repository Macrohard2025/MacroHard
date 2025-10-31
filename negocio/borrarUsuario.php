<?php
include_once "../datos/solicitudes.php";

if (!isset($_GET['idUsuario'])) {
    echo "<script>alert('Debe ingresar un ID o correo.'); window.history.back();</script>";
    exit;
}

$input = trim($_GET['idUsuario']);
$idUsuario = null;

if (is_numeric($input)) {
    $idUsuario = (int) $input;
} else if (filter_var($input, FILTER_VALIDATE_EMAIL)) {

    $idUsuario = traerIdUsuario($input);
    if (!$idUsuario) {
        echo "<script>alert('No se encontro un usuario con ese correo.'); window.history.back();</script>";
        exit;
    }
} else {
    echo "<script>alert('Formato invalido. Ingrese un ID numerico o un correo valido.'); window.history.back();</script>";
    exit;
}

if ($idUsuario === 1) {
    echo "<script>alert('No se puede eliminar el usuario administrador.'); window.history.back();</script>";
    exit;
}

if (!usuarioExiste($idUsuario)) {
    echo "<script>alert('No se encontro el usuario especificado.'); window.history.back();</script>";
    exit;
}

eliminarUsuario($idUsuario);

if (isset($_GET['origen']) && $_GET['origen'] === 'dashboard') {
    echo "<script>alert('Usuario eliminado correctamente'); window.location.href='../presentacion/HTML/dashboard.html';</script>";
    exit;
} else {
    echo "<script>alert('Usuario eliminado correctamente'); localStorage.clear(); window.location.href='../presentacion/HTML/configuracion.html';</script>";
    exit;
}
