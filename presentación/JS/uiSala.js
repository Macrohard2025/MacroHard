const botonControlPartidas = document.getElementById('controlPartidas');
const botonVolverFinal = document.getElementById('botonVolverFinal');
const botonFinalizarPartida = document.getElementById('botonFinalizarPartida');
const botonVolverHistorial = document.getElementById('botonVolverHistorial');
const historialMostrar = document.getElementById('historialMostrar');
const botonHistorial = document.getElementById('botonHistorial');
const dadoImagen = document.getElementById("dado-imagen");
const bolsaBoton = document.getElementById("boton-cancelar-bolsa");
const bolsaDinosaurios = document.getElementById('bolsa-dinosaurios');
const turnoJugador = document.getElementById('turno-jugador');
const comienzoPartida = document.getElementById('comienzo-partida');
const imagenTablero = document.getElementById('imagen-tablero');
const cantidadJugadoresTexto = document.getElementById('cantidad-jugadores');
const containerCantidadJugadores = document.getElementById('container-cantidad-jugadores');
const sala = document.getElementById('sala');
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
const bolsaDinosauriosContainer = document.getElementById('bolsa-dinosaurios-container');
const imagenTableroMostrar = document.getElementById('tablero-imagen-mostrar');
const tableroMostrar = document.getElementById('tablero-mostrar');
const formularioJugador = document.getElementById('formulario-jugador');
const cancelarForm = document.getElementById('cancelar-form');
const inputNombreJugador = document.getElementById('nombre-jugador');
const inputContrasenaJugador = document.getElementById('contrasena-jugador');
const eleccionModo = document.getElementById('eleccionModoDeJuego');
const botonSolitario = document.getElementById('boton-solitario');
const botonMultijugador = document.getElementById('boton-multijugador');
const jugadoresControlTableros = document.getElementById('jugadores-control-tableros');
const botonJugadorControl = document.querySelectorAll('.boton-jugador-control');
let modoSeleccionado = 0;
let tablero = 0;
let cantidadJugadores = 0;
let randomNumber = 0;
let cantidadJugadoresSeleccionados = 0;
let controlPartidas = false;

botonSolitario.addEventListener("click", function (e) {
    e.preventDefault();
    controlPartidas = true;
    modoSeleccionado = 1;
    articlePartida.style.display = "flex";
    eleccionModo.style.display = "none";
});

botonMultijugador.addEventListener("click", function (e) {
    e.preventDefault();
    controlPartidas = true;
    modoSeleccionado = 2;
    articlePartida2.style.display = "flex";
    eleccionModo.style.display = "none";
});

botonControlPartidas.addEventListener("click", function (e) {
    e.preventDefault();
    eleccionModo.style.display = "flex";
});

botonVolverFinal.addEventListener("click", function (e) {
    e.preventDefault();
    finalMostrar.style.display = "none";
    articlePartida.style.display = "none";
    sala.style.display = "flex";
    if (window.innerWidth > 576) {
        document.body.style.backgroundImage = "url('../../recursos/img/fondoSala.png')";
    }
    document.body.style.backgroundColor = "#f0f0f0";
    location.reload();
});

botonFinalizarPartida.addEventListener("click", function (e) {
    e.preventDefault();
    if (window.innerWidth > 576) {
        document.body.style.backgroundImage = "url('../../recursos/img/fondoFinal.png')";
    }
    comienzoPartida.style.display = "none";
    containerCantidadJugadores.style.display = "none";
    finalMostrar.style.display = "flex";
});

botonVolverHistorial.addEventListener("click", function (e) {
    e.preventDefault();
    historialMostrar.style.display = "none";
    sala.style.display = "flex";
});

botonHistorial.addEventListener("click", function (e) {
    e.preventDefault();
    sala.style.display = "none";
    mostrarHistorial();
});

function mostrarHistorial() {
    historialMostrar.style.display = "flex";
}

cancelarForm.addEventListener("click", function (e) {
    e.preventDefault();
    formularioJugador.style.display = "none";
});

dadoImagen.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 6 + 1);
    dadoImagen.src = "../../recursos/img/dado/lado" + randomNumber + ".png";
});

bolsaBoton.addEventListener("click", function () {
    bolsaDinosauriosContainer.style.display = "none";
});

bolsaDinosaurios.addEventListener("click", function () {
    bolsaDinosauriosContainer.style.display = "flex";
});

formularioJugador.addEventListener("submit", function (e) {
    e.preventDefault();
    cantidadJugadoresSeleccionados--;
    if (cantidadJugadoresSeleccionados > 1) {
        inputContrasenaJugador.value = "";
        inputNombreJugador.value = "";
    } else {
        articlePartida.style.display = "flex";
        formularioJugador.style.display = "none";
        inputContrasenaJugador.value = "";
        inputNombreJugador.value = "";
    }
});

botonListo.addEventListener("click", function (e) {
    e.preventDefault();
    if (selectJugadores.value == 0) {
        alert("Por favor, seleccione la cantidad de jugadores.");
    } else {
        articlePartida2.style.display = "none";
        cantidadJugadores = selectJugadores.value;
        cantidadJugadoresSeleccionados = cantidadJugadores;
        selectJugadores.value = "";
        formularioJugador.style.display = "flex";
    }
});

botonInvierno.addEventListener("click", function (e) {
    e.preventDefault();
    tablero = 1;
    if (controlPartidas) {
        comenzarControlPartidas();
    } else {
        comenzarpartida();
    }
});

botonVerano.addEventListener("click", function (e) {
    e.preventDefault();
    tablero = 2;
    if (controlPartidas) {
        comenzarControlPartidas();
    } else {
        comenzarpartida();
    }
});

botonCancelar.forEach(boton => {
    boton.addEventListener("click", function (e) {
        e.preventDefault();
        articlePartida.style.display = "none";
        articlePartida2.style.display = "none";
        eleccionModo.style.display = "none";
    });
});

botonSolo.addEventListener("click", function (e) {
    e.preventDefault();
    cantidadJugadores = 1;
    articlePartida.style.display = "flex";
});

botonMulti.addEventListener("click", function (e) {
    e.preventDefault();
    articlePartida2.style.display = "flex";
});

imagenTablero.addEventListener("click", function () {
    tableroMostrar.style.display = "flex";
    if (window.innerWidth <= 576) {
        document.body.style.overflow = "hidden";
    }
    if (tablero == 1) {
        imagenTableroMostrar.src = "../../recursos/img/tableroInvierno.png";
    } else if (tablero == 2) {
        imagenTableroMostrar.src = "../../recursos/img/tableroVerano.png";
    }
});

imagenTableroMostrar.addEventListener("click", function () {
    tableroMostrar.style.display = "none";
    if (window.innerWidth <= 576) {
        document.body.style.overflow = "auto";
    }
});

function comenzarpartida() {
    sala.style.display = "none";
    botonVolver.innerText = "Abandonar";
    botonVolver.href = "sala.html";
    if (cantidadJugadores != 1) {
        containerCantidadJugadores.style.display = "flex";
        cantidadJugadoresTexto.innerText = "Cantidad de jugadores: " + cantidadJugadores;
        turnoJugador.style.display = "flex";
    }
    if (tablero == 1) {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#defafa";
        imagenTablero.src = "../../recursos/img/tableroInvierno.png";
    } else if (tablero == 2) {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#dffade";
        imagenTablero.src = "../../recursos/img/tableroVerano.png";
    }
    comienzoPartida.style.display = "flex";
}

botonVolver.addEventListener("click", function () {
    location.reload();
});

function comenzarControlPartidas() {
    controlPartidas = false;
    sala.style.display = "none";
    botonVolver.innerText = "Abandonar";
    botonVolver.href = "sala.html";
    if (cantidadJugadores >= 1) {
        jugadoresControlTableros.style.display = "flex";
        for (let i = 0; i < cantidadJugadores; i++) {
            botonJugadorControl[i].style.display = "flex";
            botonJugadorControl[i].addEventListener("click", function (e) {
                e.preventDefault();
                botonJugadorControl[i].style.backgroundColor = "#03920f";
                botonJugadorControl[i].style.color = "white";
                for (let j = 0; j < botonJugadorControl.length; j++) {
                    if (j != i) {
                        botonJugadorControl[j].style.backgroundColor = "white";
                        botonJugadorControl[j].style.color = "#03920f";
                    }
                }
            });
            botonJugadorControl[0].style.backgroundColor = "#03920f";
            botonJugadorControl[0].style.color = "white";
        }
    }
    if (tablero == 1) {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#defafa";
        imagenTablero.src = "../../recursos/img/tableroInvierno.png";
    } else if (tablero == 2) {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#dffade";
        imagenTablero.src = "../../recursos/img/tableroVerano.png";
    }
    comienzoPartida.style.display = "flex";
    dadoImagen.style.display = "none";
}