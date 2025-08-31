<?php

class Partida
{

    private DateTime $fecha;
    private string $modoJuego;
    private string $tablero;
    private int $numJugadores;
    private array $jugadores; 

    public function __construct(DateTime $fecha, string $modoJuego, string $tablero, int $numJugadores, array $jugadores)
    {
        $this->fecha = $fecha;
        $this->modoJuego = $modoJuego;
        $this->tablero = $tablero;
        $this->numJugadores = $numJugadores;
        $this->jugadores = $jugadores;
    }

    public function getFecha(): DateTime
    {
        return $this->fecha;
    }

    public function setFecha(DateTime $fecha): void
    {
        $this->fecha = $fecha;
    }

    public function getModoJuego(): string
    {
        return $this->modoJuego;
    }

    public function setModoJuego(string $modoJuego): void
    {
        $this->modoJuego = $modoJuego;
    }

    public function getTablero(): string
    {
        return $this->tablero;
    }

    public function setTablero(string $tablero): void
    {
        $this->tablero = $tablero;
    }

    public function getNumJugadores(): int
    {
        return $this->numJugadores;
    }

    public function setNumJugadores(int $numJugadores): void
    {
        $this->numJugadores = $numJugadores;
    }

    public function getJugadores(): array
    {
        return $this->jugadores;
    }

    public function setJugadores(array $jugadores): void
    {
        $this->jugadores = $jugadores;
    }
}
