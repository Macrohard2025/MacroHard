const datosJugador = document.getElementById('datosJugador');
const inputNombreJugador = document.getElementById('nombre-jugador');
const inputContrasenaJugador = document.getElementById('contrasena-jugador');
const unirseBoton = document.getElementById('unirseBoton');
const cancelarForm = document.getElementById('cancelar-form');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("idioma") === "en") {
        document.title = "Login request";
        datosJugador.textContent = "Enter the data of one player";
        inputNombreJugador.placeholder = "Email";
        inputContrasenaJugador.placeholder = "Password";
        unirseBoton.textContent = "Join the room";
        cancelarForm.textContent = "Cancel";
    }
});