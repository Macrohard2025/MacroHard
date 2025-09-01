<?php
include_once "../datos/solicitudes.php";

if (!isset($_GET['idUsuario'])) {
    echo "Error: No se proporcionó el ID de usuario.";
    exit;
}

$idUsuario = (int) $_GET['idUsuario'];

eliminarUsuario($idUsuario);

echo "<script> alert('Usuario eliminado');</script>";
?>
