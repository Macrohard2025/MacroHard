<?php

include_once "../datos/solicitudes.php";

if (isset($_POST['nombre'], $_POST['puntos'])) {
    $nombre = $_POST['nombre'];
    $puntos = (int)$_POST['puntos'];

    $tabla = '';
    $result = mysqli_query($conn, "SELECT 1 FROM Dinosaurio WHERE nombre='$nombre'");
    if (mysqli_num_rows($result) > 0) {
        $tabla = "Dinosaurio";
    } else {
        $result = mysqli_query($conn, "SELECT 1 FROM Recinto WHERE nombre='$nombre'");
        if (mysqli_num_rows($result) > 0) {
            $tabla = "Recinto";
        }
    }

    $update = "UPDATE $tabla SET puntos=$puntos WHERE nombre='$nombre'";
    mysqli_query($conn, $update);
}
