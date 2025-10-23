<?php

include_once "../datos/solicitudes.php";

$instalado = verificarInstalacion();

echo json_encode([
    "instalado" => $instalado
]);
