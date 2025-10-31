<?php
include_once "../negocio/Usuario.php";
include_once "solicitudes.php";

$host = "localhost";
$user = "root";
$pass = "";
$nombreBD = "bd-macrohard";

$conn = mysqli_connect($host, $user, $pass);
if (!$conn) {
    die("<script>alert('Error al conectar al servidor MySQL.'); window.location.href = '../index.html';</script>");
}

$sqlCrearBD = "CREATE DATABASE IF NOT EXISTS `$nombreBD` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;";
if (!mysqli_query($conn, $sqlCrearBD)) {
    die("<script>alert('Error al crear la base de datos.'); window.location.href = '../index.html';</script>");
}

if (!mysqli_select_db($conn, $nombreBD)) {
    die("<script>alert('Error al seleccionar la base de datos.'); window.location.href = '../index.html';</script>");
}

$sqlTablas = <<<SQL
CREATE TABLE IF NOT EXISTS Usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    contrasena VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    fecha_nacimiento DATE,
    preferencias_idioma VARCHAR(50) DEFAULT 'es',
    preferencias_tema VARCHAR(50) DEFAULT 'claro',
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Partida (
    partida_id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    cantidad_jugadores INT NOT NULL,
    modo_juego VARCHAR(50) NOT NULL, 
    tablero VARCHAR(50) NOT NULL,
    fk_ganador_id INT NULL,
    FOREIGN KEY (fk_ganador_id) REFERENCES Usuario(usuario_id)
);

CREATE TABLE IF NOT EXISTS Jugadores (
    fk_partida_id INT,
    fk_usuario_id INT,
    puntos_totales INT,
    PRIMARY KEY (fk_partida_id, fk_usuario_id),
    FOREIGN KEY (fk_partida_id) REFERENCES Partida(partida_id),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(usuario_id)
);

CREATE TABLE IF NOT EXISTS Recinto (
    nombre VARCHAR(50) PRIMARY KEY NOT NULL,
    puntos INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Dinosaurio (
    nombre VARCHAR(50) PRIMARY KEY NOT NULL,
    puntos INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Jugadas (
    jugada_id INT PRIMARY KEY AUTO_INCREMENT,
    fk_partida_id INT NOT NULL,
    fk_usuario_id INT,
    fk_recinto_nombre VARCHAR(50) NOT NULL,
    fk_dino_nombre VARCHAR(50) NOT NULL,
    FOREIGN KEY (fk_partida_id) REFERENCES Partida(partida_id),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(usuario_id),
    FOREIGN KEY (fk_recinto_nombre) REFERENCES Recinto(nombre),
    FOREIGN KEY (fk_dino_nombre) REFERENCES Dinosaurio(nombre)
);
SQL;

if (!mysqli_multi_query($conn, $sqlTablas)) {
    die("<script>alert('Error al crear las tablas.'); window.location.href = '../index.html';</script>");
}
while (mysqli_more_results($conn) && mysqli_next_result($conn)) {}

$sqlDatosBase = <<<SQL
INSERT IGNORE INTO Dinosaurio (nombre, puntos) VALUES
('Plesio', 0),
('T-Rex', 1),
('Trike', 0),
('Ptera', 0),
('Bronto', 0),
('Estego', 0);

INSERT IGNORE INTO Recinto (nombre, puntos) VALUES
('Bosque', 2),
('Prado', 3),
('Amor', 5),
('Trio', 7),
('Rey', 7),
('Isla', 7),
('Rio', 1),
('BosqueInv', 4),
('PuenteIzq', 6),
('PuenteDer', 6),
('Puesto', 2),
('Piramide', 2),
('Cuarentena', 0);

INSERT IGNORE INTO Usuario (usuario_id) VALUES (1);
SQL;

if (!mysqli_multi_query($conn, $sqlDatosBase)) {
    die("<script>alert('Error al insertar datos base.'); window.location.href = '../index.html';</script>");
}
while (mysqli_more_results($conn) && mysqli_next_result($conn)) {}

$sqlDatosPrueba = <<<SQL
INSERT IGNORE INTO Usuario (usuario_id, nombre, contrasena, email, fecha_nacimiento, activo) VALUES
(2, 'Mateo', 'mateo123', 'mateo@test.com', '2005-03-15', TRUE),
(3, 'Luna', 'luna123', 'luna@test.com', '2004-07-22', TRUE),
(4, 'Flor', 'flor123', 'flor@test.com', '2005-11-10', TRUE),
(5, 'Santi', 'santi123', 'santi@test.com', '2005-06-05', TRUE);

INSERT IGNORE INTO Partida (cantidad_jugadores, modo_juego, tablero, fk_ganador_id) VALUES
(2, 'Multi', 'Verano', 2),
(3, 'Control', 'Verano', 3),
(3, 'Multi', 'Invierno', 4);

INSERT IGNORE INTO Jugadores (fk_partida_id, fk_usuario_id, puntos_totales) VALUES
(1, 2, 10),
(1, 3, 5),
(2, 2, 8),
(2, 3, 12),
(2, 4, 7),
(2, 5, 9),
(3, 2, 10),
(3, 3, 8),
(3, 4, 12),
(3, 5, 7);
SQL;

if (!mysqli_multi_query($conn, $sqlDatosPrueba)) {
    die("<script>alert('Error al insertar datos de prueba.'); window.location.href = '../index.html';</script>");
}
while (mysqli_more_results($conn) && mysqli_next_result($conn)) {}

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "<script>alert('Método no permitido.'); window.location.href = '../index.html';</script>";
    exit;
}

if (!isset($_POST["usuario"]) || trim($_POST["usuario"]) === "") {
    echo "<script>alert('Ingrese un nombre válido.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (!isset($_POST["correo"]) || !filter_var($_POST["correo"], FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Ingrese un email válido.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (!isset($_POST["edad"]) || (new DateTime($_POST["edad"]) > new DateTime('-7 years'))) {
    echo "<script>alert('Ingrese una edad válida.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

if (!isset($_POST["contraseña"]) || $_POST["contraseña"] !== $_POST["confirmarContraseña"]) {
    echo "<script>alert('Las contraseñas no coinciden.'); window.location.href = '../presentación/HTML/installer.html';</script>";
    exit;
}

$exito = actualizarAdmin(
    1,
    trim($_POST["usuario"]),
    trim($_POST["correo"]),
    new DateTime($_POST["edad"]),
    $_POST["contraseña"]
);

if ($exito) {
    echo "<script>
        alert('Instalación completa. Administrador creado correctamente.');
        window.location.href = '../index.html';
    </script>";
} else {
    echo "<script>
        alert('Error al configurar el administrador. Intente nuevamente.');
        window.location.href = '../presentación/HTML/installer.html';
    </script>";
}

mysqli_close($conn);
?>
