<?php

if (!isset($_GET['idUsuario'])) {
    echo "<script>alert('Ocurrió un error inesperado'); window.location.href = '../presentación/HTML/Sala/menuSala.html';</script>";
    return;
} else {

    $idUsuario = $_GET['idUsuario'];

    function recuperarUltimasPartidas($idUsuario)
    {

        // Datos de ejemplo para simular partidas
        // En un caso real, estos datos se recuperarían de una base de datos

        $partidas = [
            [
                "id" => 1,
                "fecha" => "22/10/2024",
                "modo" => "Multijugador - Invierno",
                "ganador" => "Juan Torres",
                "puntos" => 300,
                "posicion" => 3
            ],
            [
                "id" => 2,
                "fecha" => "15/11/2024",
                "modo" => "Un jugador - Verano",
                "ganador" => "Mateo Más",
                "puntos" => 240,
                "posicion" => 1
            ],
            [
                "id" => 3,
                "fecha" => "30/11/2024",
                "modo" => "Multijugador - Invierno",
                "ganador" => "Andrés López",
                "puntos" => 330,
                "posicion" => 2
            ],
            [
                "id" => 4,
                "fecha" => "02/12/2024",
                "modo" => "Multijugador - Verano",
                "ganador" => "María Rodríguez",
                "puntos" => 230,
                "posicion" => 4
            ],
            [
                "id" => 5,
                "fecha" => "10/12/2024",
                "modo" => "Multijugador - Verano",
                "ganador" => "Facundo Silva",
                "puntos" => 260,
                "posicion" => 5
            ],
            [
                "id" => 6,
                "fecha" => "18/12/2024",
                "modo" => "Un jugador - Invierno",
                "ganador" => "Mateo Más",
                "puntos" => 175,
                "posicion" => 1
            ],
            [
                "id" => 7,
                "fecha" => "22/12/2024",
                "modo" => "Multijugador - Invierno",
                "ganador" => "Martín Ferreira",
                "puntos" => 250,
                "posicion" => 3
            ],
            [
                "id" => 8,
                "fecha" => "04/01/2025",
                "modo" => "Un jugador - Verano",
                "ganador" => "Mateo Más",
                "puntos" => 140,
                "posicion" => 1
            ],
            [
                "id" => 9,
                "fecha" => "10/01/2025",
                "modo" => "Multijugador - Invierno",
                "ganador" => "Diego Castro",
                "puntos" => 120,
                "posicion" => 4
            ],
            [
                "id" => 10,
                "fecha" => "15/01/2025",
                "modo" => "Multijugador - Verano",
                "ganador" => "Florencia Díaz",
                "puntos" => 165,
                "posicion" => 2
            ]
        ];

        return $partidas;
    }

    echo json_encode(recuperarUltimasPartidas($idUsuario));
    return;
}
