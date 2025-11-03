<?php

$host = "localhost";
$user = "root";
$pass = "";
$nombreBD = "bd-macrohard"; 

try {
    $conn = mysqli_connect($host, $user, $pass);

    if (!$conn) {
        throw new Exception("No se pudo conectar al servidor MySQL.");
    }

    $sql = "SHOW DATABASES LIKE '$nombreBD'";
    $result = mysqli_query($conn, $sql);

    $instalado = $result && mysqli_num_rows($result) > 0;

    echo json_encode(["instalado" => $instalado]);
} catch (Throwable $e) {
    echo json_encode([
        "instalado" => false,
        "error" => $e->getMessage()
    ]);
} finally {
    if (isset($conn) && $conn) {
        mysqli_close($conn);
    }
}
