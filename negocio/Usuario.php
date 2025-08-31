<?php

class Usuario
{

    private string $nombre;
    private string $email;
    private DateTime $edad;
    private string $contraseña;
    private string $preferenciasIdioma;
    private string $preferenciasTema;

    public function __construct(string $nombre, string $email, DateTime $edad, string $contraseña, string $preferenciasIdioma, string $preferenciasTema)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->edad = $edad;
        $this->contraseña = $contraseña;
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

    public function getContraseña(): string
    {
        return $this->contraseña;
    }

    public function setContraseña(string $contraseña): void
    {
        $this->contraseña = $contraseña;
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

function buscarContraseñaUsuario(string $id, string $contraseña): bool
{
    // Aquí se simula la verificación de la contraseña del usuario en la base de datos.
    return true;
}

function traerIdUsuario(string $nombre, string $contraseña): int
{
    // Aquí se simula la obtención del ID del usuario en la base de datos.
    return 1;
}
