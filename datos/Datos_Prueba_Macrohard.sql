USE BD-Macrohard;

INSERT INTO Usuario (usuario_id, nombre, contrasena, email, fecha_nacimiento) VALUES
(2, 'Mateo', 'mateo123', 'mateo@test.com', '2005-03-15'),
(3, 'Luna', 'luna123', 'luna@test.com', '2004-07-22'),
(4, 'Flor', 'flor123', 'flor@test.com', '2005-11-10'),
(5, 'Santi', 'santi123', 'santi@test.com', '2005-06-05');

INSERT INTO Partida (cantidad_jugadores, modo_juego, tablero, fk_ganador_id) VALUES
(2, 'Multi', 'Verano', 2),
(3, 'Control', 'Verano', 3),
(3, 'Multi', 'Invierno', 4);

INSERT INTO Jugadores (fk_partida_id, fk_usuario_id, puntos_totales) VALUES
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
