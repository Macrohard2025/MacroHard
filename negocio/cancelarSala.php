<?php
session_start();
session_destroy();
header("Location: ../presentación/HTML/Sala/menuSala.html");
exit;
?>