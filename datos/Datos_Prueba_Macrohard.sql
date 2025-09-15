USE BD_Macrohard;

INSERT INTO Usuario (nombre, contrasena, email, fecha_nacimiento, preferencias_idioma, preferencias_tema) VALUES
('juan', 'juancito123', 'juan@gmail.com', '2013-05-15', 'es', 'claro'),
('maria', 'papapipo', 'mari420@gmail.com', '2008-10-30', 'es', 'oscuro'),
('pedro', 'pedrito456', 'drope@gmail.com', '2010-07-22', 'en', 'claro'),
('laura', 'lau1234', 'laux11@gmail.com', '2012-03-18', 'es', 'oscuro'),
('carlos', 'mimamamemima', 'carlitox@gmail.com', '2009-11-05', 'en', 'claro');

INSERT INTO Partida (fecha, cantidad_jugadores, modo_juego, tablero) VALUES
(2025-08-14 13:57:44, 1, 'Solo', 'Invierno'),
(2025-08-14 14:10:22, 4, 'Multi', 'Verano'),
(2025-08-14 15:05:10, 3, 'Multi', 'Verano'),
(2025-08-14 16:20:30, 2, 'Multi', 'Invierno'),
(2025-08-14 17:45:55, 1, 'Control', 'Verano');

INSERT INTO Jugadores (fk_partida_id, fk_usuario_id) VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 5),
(3, 4),
(4, 2),
(4, 3),
(5, 6);