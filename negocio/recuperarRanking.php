<?php
include_once '../datos/solicitudes.php';

$ranking = traerRankingGlobal();
echo json_encode($ranking);
return;