<?php

include_once "../datos/solicitudes.php";

echo json_encode(recuperarResultados($_GET["idPartida"]));
