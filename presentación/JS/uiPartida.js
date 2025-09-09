const formCancelarPartida = document.getElementById('formCancelarPartida');
const botonVolver = document.getElementById('boton-volver');
const idPartidaInput = document.getElementById('idPartidaInput');
const dado = document.getElementById('dado');
const tableroElemento = document.getElementById('tablero');
const turnoJugador = document.getElementById('turnoJugador');
const nombreJugadorElemento = document.getElementById('nombreJugador');
const nombresString = localStorage.getItem('nombresUsuarios');
const nombresArray = JSON.parse(nombresString);
const idsString = localStorage.getItem('idsUsuarios');
const idsArray = JSON.parse(idsString);
const botonFinalizarControl = document.getElementById("botonFinalizarControl");

if (botonFinalizarControl) {
    botonFinalizarControl.addEventListener("click", (e) => {
        e.preventDefault();
        finalizarPartida();
    });
}

botonVolver.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cancelar la partida?')) {
        const idPartida = localStorage.getItem('idPartida');
        idPartidaInput.value = idPartida;
        registroUsuario = localStorage.getItem('registroUsuario');
        idUsuarioLocal = localStorage.getItem('idUsuario');
        idioma = localStorage.getItem('idioma');
        tema = localStorage.getItem('tema');
        localStorage.clear();
        localStorage.setItem('registroUsuario', registroUsuario);
        localStorage.setItem('idUsuario', idUsuarioLocal);
        localStorage.setItem('idioma', idioma);
        localStorage.setItem('tema', tema);
        formCancelarPartida.submit();
    }
});

const recinto1 = document.querySelector(".recinto-1");
const recinto2 = document.querySelector(".recinto-2");
const recinto3 = document.querySelector(".recinto-3");
const recinto4 = document.querySelector(".recinto-4");
const recinto5 = document.querySelector(".recinto-5");
const recinto6 = document.querySelector(".recinto-6");

addEventListener("DOMContentLoaded", () => {
    fetch(`../../../negocio/recuperarPartida.php?idPartida=${encodeURIComponent(localStorage.getItem('idPartida'))}`)
        .then(res => res.json())
        .then(data => {
            let fecha = data.fecha;
            let modoJuego = data.modoJuego;
            let tablero = data.tablero;
            let numJugadores = data.numJugadores;
            let idUsuario = data.jugadores;

            localStorage.setItem('modoJuego', modoJuego);

            if (tablero === 'Invierno') {
                tableroElemento.style.backgroundImage = "url('../../../recursos/img/tableroInvierno.png')";
                document.body.style.backgroundColor = "#9bceffff";
                recinto6.style.display = "none";
                recinto1.classList.add("El-Bosque-Ordenado");
                recinto2.classList.add("El-puente-de-los-enamorados");
                recinto3.classList.add("El-puesto-de-observación");
                recinto4.classList.add("La-pirámide");
                recinto5.classList.add("Zona-de-cuarentena");
            }

            if (tablero === "Verano") {
                recinto1.classList.add("El-bosque-de-la-semejanza");
                recinto2.classList.add("El-trío-frondoso");
                recinto3.classList.add("La-pradera-del-amor");
                recinto4.classList.add("El-rey-de-la-selva");
                recinto5.classList.add("El-prado-de-la-diferencia");
                recinto6.classList.add("La-isla-solitaria");
            }

            if (modoJuego === 'Solo') {
                turnoJugador.style.display = 'none';
            } else if (modoJuego === 'Control') {

                const colDerecha = document.querySelector('.col-derechaDiv');
                colDerecha.innerHTML = '';

                colDerecha.style.display = 'grid';
                colDerecha.style.gridTemplateColumns = 'repeat(2, 1fr)';
                colDerecha.style.gridAutoRows = 'auto';
                colDerecha.style.gap = '10px';
                colDerecha.style.justifyItems = 'center';
                nombreJugadorElemento.textContent = localStorage.jugadorActual;

                nombresArray.forEach((nombre, index) => {
                    const btn = document.createElement('button');
                    btn.classList.add('btn', 'btn-success', 'boton');
                    btn.textContent = nombre;

                    btn.addEventListener('click', () => {
                        nombreJugadorElemento.textContent = nombre;
                        localStorage.jugadorActual = nombre;
                        localStorage.idJugadorActual = idsArray[index];
                        recuperarTablero();
                    });

                    colDerecha.appendChild(btn);
                });
            } else {
                nombreJugadorElemento.textContent = localStorage.jugadorActual;
            }

            let dadoTirar = true;
            if (modoJuego === 'Solo' || modoJuego === 'Multi') {
                dado.addEventListener('click', () => {
                    if (dadoTirar && localStorage.getItem("dado") == null) {
                        const lado = Math.floor(Math.random() * 6) + 1;
                        dadoTirar = false;
                        localStorage.setItem("dado", lado);
                        dado.src = `../../../recursos/img/dado/lado${lado}.png`;
                    }
                });
                if (localStorage.getItem("dado") != null) {
                    dado.src = `../../../recursos/img/dado/lado${localStorage.getItem("dado")}.png`;
                }
            }

        })
    recuperarTablero();
});

function recuperarTablero() {
    fetch(`../../../negocio/recuperarTablero.php?jugador=${encodeURIComponent(localStorage.idJugadorActual)}&partida=${encodeURIComponent(localStorage.idPartida)}`)
        .then(res => res.json())
        .then(jugadas => {

            document.querySelectorAll("[class*='recinto-']").forEach(r => r.innerHTML = "");

            jugadas.forEach(jugada => {

                const dinoImg = document.createElement("img");
                dinoImg.src = `../../../recursos/img/dinos/${mapaDinos[jugada.dinosaurio]}`;
                dinoImg.alt = jugada.dinosaurio;
                dinoImg.classList.add("dino-tablero");

                const recintoClase = mapaRecintos[jugada.recinto];
                const recintoElemento = document.querySelector(`.${CSS.escape(recintoClase)}`);


                if (recintoElemento) {
                    recintoElemento.appendChild(dinoImg);
                } else {
                    window.location.reload();
                }
            });
        })
        .catch(err => console.error("Error recuperando tablero:", err));
}

const mapaDinos = {
    "T-Rex": "tiranosaurioRex.png",
    "Trike": "triceratops.png",
    "Ptera": "pteranodon.png",
    "Bronto": "brontosaurio.png",
    "Estego": "estegosaurio.png",
    "Plesio": "plesiosaurio.png"
};

const mapaRecintos = {
    "BosqueInv": "El-Bosque-Ordenado",
    "Puente": "El-puente-de-los-enamorados",
    "Puesto": "El-puesto-de-observación",
    "Piramide": "La-pirámide",
    "Cuarentena": "Zona-de-cuarentena",
    "Bosque": "El-bosque-de-la-semejanza",
    "Trio": "El-trío-frondoso",
    "Amor": "La-pradera-del-amor",
    "Rey": "El-rey-de-la-selva",
    "Prado": "El-prado-de-la-diferencia",
    "Isla": "La-isla-solitaria",
    "Rio": "Rio"
};