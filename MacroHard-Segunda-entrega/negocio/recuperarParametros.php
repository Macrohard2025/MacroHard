<?php

include_once '../datos/solicitudes.php';

$valores = obtenerElementos();

echo json_encode($valores);

?>