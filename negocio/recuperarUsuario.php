<?php

include_once "Usuario.php";

if (!isset($_GET['nombre'])) {
    echo "<script>alert('Ocurrió un error inesperado'); window.location.href = '../index.html';</script>";
    return;
} else {

    $nombre = $_GET['nombre'];

    // Aquí se simula la recuperación de un usuario de la base de datos.
    $usuario = new Usuario(
        "Mario",
        'ejemplo@ejemplo.com',
        new DateTime('2000-01-01'),
        'contraseña123',
        'es',
        'claro'
    );

    $data = [
        'nombre' => $usuario->getNombre(),
        'email' => $usuario->getEmail(),
        'edad' => $usuario->getEdad()->format('Y-m-d'),
        'contraseña' => $usuario->getContraseña(),
        'tema' => $usuario->getPreferenciasTema(),
        'idioma' => $usuario->getPreferenciasIdioma()
    ];

    echo json_encode($data);
    return;
}
