<?php

include_once "Usuario.php";
include_once "../datos/solicitudes.php";

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "<script>alert('Método no permitido.'); window.location.href = '../index.html';</script>";
    exit;
}

if (!isset($_POST["usuario"]) || trim($_POST["usuario"]) === "") {
    echo "<script>alert('Ingrese un nombre válido.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (!isset($_POST["correo"]) || !filter_var($_POST["correo"], FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Ingrese un email válido.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (!isset($_POST["edad"]) || (new DateTime($_POST["edad"]) > new DateTime('-7 years'))) {
    echo "<script>alert('Ingrese una edad válida.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (!isset($_POST["contraseña"]) || $_POST["contraseña"] !== $_POST["confirmarContraseña"]) {
    echo "<script>alert('Las contraseñas no coinciden.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (verificarInstalacion()) {
    echo "<script>alert('El administrador ya fue configurado previamente.'); window.location.href = '../index.html';</script>";
    exit;
}

$exito = actualizarAdmin(
    1,
    trim($_POST["usuario"]),
    trim($_POST["correo"]),
    new DateTime($_POST["edad"]),
    $_POST["contraseña"]
);

if ($exito) {
    echo "<script>
        window.location.href = '../index.html';
    </script>";
} else {
    echo "<script>alert('Error al configurar el administrador. Intente nuevamente.'); window.location.href = '../presentación/HTML/installer.html';</script>";
}
