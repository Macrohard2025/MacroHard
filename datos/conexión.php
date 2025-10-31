<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "bd-macrohard";

$conn = mysqli_connect($host, $user, $pass);

if (!$conn) {
    die("Error al conectar con MySQL: " . mysqli_connect_error());
}

$result = mysqli_query($conn, "SHOW DATABASES LIKE '$dbname'");
$existeBD = $result && mysqli_num_rows($result) > 0;

if ($existeBD) {
    mysqli_select_db($conn, $dbname);
}
?>
