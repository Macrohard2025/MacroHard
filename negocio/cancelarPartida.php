<?php 

include_once "../datos/solicitudes.php";

if (isset($_POST['idPartida'])) {
    $idPartida = $_POST['idPartida'];
    eliminarPartida($idPartida);
    header("Location: ../presentación/HTML/Sala/menuSala.html");
} else {
    echo "<script>alert('Ha ocurrido un error inesperado.'); window.location.href = '../presentación/HTML/Sala/menuSala.html';</script>";
}

?>