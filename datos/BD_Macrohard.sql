CREATE DATABASE BD_Macrohard;
USE BD_Macrohard;

CREATE TABLE Usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    preferencias_idioma VARCHAR(50) DEFAULT 'es',
    preferencias_tema VARCHAR(50) DEFAULT 'claro'
);

CREATE TABLE Partida (
    partida_id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    cantidad_jugadores INT NOT NULL,
    modo_juego varchar(50) NOT NULL, 
    tablero varchar(50) NOT NULL,
    fk_ganador_id INT,
 	FOREIGN KEY (fk_ganador_id) REFERENCES Usuario(usuario_id)
);

CREATE TABLE Jugadores(
    fk_partida_id INT,
    fk_usuario_id INT,
    PRIMARY KEY (fk_partida_id, fk_usuario_id),
    puntos_totales INT,
    FOREIGN KEY (fk_partida_id) REFERENCES Partida(partida_id),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(usuario_id)
);

CREATE TABLE Recinto (
    nombre VARCHAR(50) PRIMARY KEY NOT NULL,
    puntos INT NOT NULL
);

CREATE TABLE Dinosaurio (
    nombre VARCHAR(50) PRIMARY KEY NOT NULL,
    puntos INT NOT NULL
);

CREATE TABLE Jugadas (
    fk_partida_id INT NOT NULL,
    fk_usuario_id INT NOT NULL,
    fk_recinto_nombre VARCHAR(50) NOT NULL,
    fk_dino_nombre VARCHAR(50) NOT NULL,
    FOREIGN KEY (fk_partida_id) REFERENCES Partida(partida_id),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuario(usuario_id),
    FOREIGN KEY (fk_recinto_nombre) REFERENCES Recinto(nombre),
    FOREIGN KEY (fk_dino_nombre) REFERENCES Dinosaurio(nombre)
);

INSERT INTO Dinosaurio (nombre, puntos) VALUES
('Plesio', 0),
('T-Rex', 1),
('Trike', 0),
('Ptera', 0),
('Bronto', 0),
('Estego', 0);

INSERT INTO Recinto (nombre, puntos) VALUES
('Bosque', 2),
('Prado', 2),
('Amor', 5),
('Trio', 7),
('Rey', 7),
('Isla', 7),
('Rio', 1),
('BosqueInv', 2),
('PuenteIzq', 6),
('PuenteDer', 6),
('Puesto', 2),
('Piramide', 2),
('Cuarentena', 0);

INSERT INTO Usuario (nombre, contrasena, email, fecha_nacimiento) VALUES
('admin', 'admin123', 'admin@macrohard.com', '1990-01-01');