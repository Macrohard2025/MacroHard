<?php 

function eliminarPartida($idPartida) {
    // Aquí iría la lógica para eliminar la partida de la base de datos.
}

if (isset($_POST['idPartida'])) {
    $idPartida = $_POST['idPartida'];
    eliminarPartida($idPartida);
    header("Location: ../presentación/HTML/Sala/menuSala.html");
} else {
    echo "<script>alert('Ha ocurrido un error inesperado.'); window.location.href = '../presentación/HTML/Sala/menuSala.html';</script>";
}

?>