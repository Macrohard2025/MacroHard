<?php
session_start();
session_destroy();
header("Location: ../presentacion/HTML/Sala/menuSala.html");
exit;
?>