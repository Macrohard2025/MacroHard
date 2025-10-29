const botonSolo = document.getElementById('botonSolo');
const botonMulti = document.getElementById('botonMulti');
const articlePartida = document.getElementById('article-partida');
const botonCancelar = document.querySelectorAll('#cancelar');
const botonInvierno = document.getElementById('tablero-invierno');
const botonVerano = document.getElementById('tablero-verano');
const articlePartida2 = document.getElementById('article-partida2');
const selectJugadores = document.getElementById('select-jugadores');
const botonListo = document.getElementById('boton-listo');
const botonVolver = document.getElementById('boton-volver');
const inputModoJuego = document.getElementById('inputModoJuego');
const inputNumJugadores = document.getElementById('inputNumJugadores');
const inputTablero = document.getElementById('inputTablero');
const inputJugador1 = document.getElementById('inputJugador1');
const inputJugador2 = document.getElementById('inputJugador2');
const inputJugador3 = document.getElementById('inputJugador3');
const inputJugador4 = document.getElementById('inputJugador4');
const inputJugador5 = document.getElementById('inputJugador5');
const formComenzarPartida = document.getElementById('formComenzarPartida');
const formularioJugador = document.getElementById('formulario-jugador');
const cancelarForm = document.getElementById('cancelar-form');
const inputNombreJugador = document.getElementById('nombre-jugador');
const inputContrasenaJugador = document.getElementById('contrasena-jugador');
const inputNumJugadorPartida = document.getElementById('num-jugador');
const cantidadCredenciales = document.getElementById('cantidadCredenciales');
const botonControl = document.getElementById('botonControl');
const optionSelect = document.getElementById('optionSelect');
botonSolo.addEventListener("click", function (e) {
    e.preventDefault();
    articlePartida.style.display = "flex";
    inputModoJuego.value = "Solo";
    inputNumJugadores.value = "1";
    inputJugador1.value = localStorage.getItem("idUsuario");
});
botonMulti.addEventListener("click", function (e) {
    e.preventDefault();
    articlePartida.style.display = "flex";
    inputModoJuego.value = "Multi";
    inputJugador1.value = localStorage.getItem("idUsuario");
});
botonControl.addEventListener("click", function (e) {
    e.preventDefault();
    articlePartida.style.display = "flex";
    inputModoJuego.value = "Control";
    inputJugador1.value = localStorage.getItem("idUsuario");
});
botonCancelar.forEach(boton => {
    boton.addEventListener("click", function (e) {
        e.preventDefault();
        articlePartida.style.display = "none";
        articlePartida2.style.display = "none";
    });
});
botonInvierno.addEventListener("click", function (e) {
    e.preventDefault();
    articlePartida.style.display = "none";
    inputTablero.value = "Invierno";
    if (inputModoJuego.value == "Solo") {
        formComenzarPartida.submit();
    } else if (inputModoJuego.value == "Multi") {
        articlePartida2.style.display = "flex";
    } else if (inputModoJuego.value == "Control") {
        articlePartida2.style.display = "flex";
        optionSelect.style.display = "flex";
    }
});
botonVerano.addEventListener("click", function (e) {
    e.preventDefault();
    articlePartida.style.display = "none";
    inputTablero.value = "Verano";
    if (inputModoJuego.value == "Solo") {
        formComenzarPartida.submit();
    } else if (inputModoJuego.value == "Multi") {
        articlePartida2.style.display = "flex";
    } else if (inputModoJuego.value == "Control") {
        articlePartida2.style.display = "flex";
        optionSelect.style.display = "flex";
    }
});
botonListo.addEventListener("click", function (e) {
    e.preventDefault();
    if (selectJugadores.value == 0) {
        alert("Por favor, seleccione la cantidad de jugadores.");
    } else {
        articlePartida2.style.display = "none";
        inputNumJugadores.value = selectJugadores.value;
        selectJugadores.value = "";
        formComenzarPartida.submit();
    }
});

const botonHistorial = document.getElementById('botonHistorial');
const preguntaTablero = document.getElementById('preguntaTablero');
const aclararTablero = document.getElementById('aclararTablero');
const preguntaCantidad = document.getElementById('preguntaCantidad');
const preguntaOpcion = document.getElementById('preguntaOpcion');
const jugadorDos = document.getElementById('jugadorDos');
const jugadorTres = document.getElementById('jugadorTres');
const jugadorCuatro = document.getElementById('jugadorCuatro');
const jugadorCinco = document.getElementById('jugadorCinco');

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.idioma == "en") {
        document.title = "Game Menu";
        botonSolo.textContent = "Single Player";
        botonHistorial.textContent = "Game History";
        botonMulti.textContent = "Multiplayer";
        botonControl.textContent = "Control Mode";
        botonVolver.textContent = "Back to home";
        preguntaTablero.textContent = "Which board do you want to use?";
        aclararTablero.textContent = "(Each board has its own rules)";
        botonInvierno.textContent = "Winter";
        botonVerano.textContent = "Summer";
        botonCancelar.forEach(boton => {
            boton.textContent = "Cancel";
        });
        preguntaCantidad.textContent = "How many players will there be?";
        preguntaOpcion.textContent = "Choose an option";
        optionSelect.textContent = "1 player";
        jugadorDos.textContent = "2 players";
        jugadorTres.textContent = "3 players";
        jugadorCuatro.textContent = "4 players";
        jugadorCinco.textContent = "5 players";
        botonListo.textContent = "Ready";
    }
});