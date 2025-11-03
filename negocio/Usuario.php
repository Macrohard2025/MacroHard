<?php

class Usuario
{

    private string $nombre;
    private string $email;
    private DateTime $edad;
    private string $contrasenia;
    private string $preferenciasIdioma;
    private string $preferenciasTema;

    public function __construct(string $nombre, string $email, DateTime $edad, string $contrasenia, string $preferenciasIdioma, string $preferenciasTema)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->edad = $edad;
        $this->contrasenia = $contrasenia;
        $this->preferenciasIdioma = $preferenciasIdioma;
        $this->preferenciasTema = $preferenciasTema;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): void
    {
        $this->nombre = $nombre;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getEdad(): DateTime
    {
        return $this->edad;
    }

    public function setEdad(DateTime $edad): void
    {
        $this->edad = $edad;
    }

    public function getcontrasenia(): string
    {
        return $this->contrasenia;
    }

    public function setcontrasenia(string $contrasenia): void
    {
        $this->contrasenia = $contrasenia;
    }

    public function getPreferenciasIdioma(): string
    {
        return $this->preferenciasIdioma;
    }

    public function setPreferenciasIdioma(string $preferenciasIdioma): void
    {
        $this->preferenciasIdioma = $preferenciasIdioma;
    }

    public function getPreferenciasTema(): string
    {
        return $this->preferenciasTema;
    }

    public function setPreferenciasTema(string $preferenciasTema): void
    {
        $this->preferenciasTema = $preferenciasTema;
    }
}

