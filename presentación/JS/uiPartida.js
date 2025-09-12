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

const recinto7 = document.querySelector(".recinto-7");
const recinto8 = document.querySelector(".recinto-8");
const recinto9 = document.querySelector(".recinto-9");
const recinto10 = document.querySelector(".recinto-10");
const recinto11 = document.querySelector(".recinto-11");
const recinto12 = document.querySelector(".recinto-12");

addEventListener("DOMContentLoaded", () => {

    fetch(`../../../negocio/recuperarPartida.php?idPartida=${encodeURIComponent(localStorage.getItem('idPartida'))}`)
        .then(res => res.json())
        .then(data => {

            let {fecha, modoJuego, tablero, numJugadores, idUsuario} = data;

            localStorage.setItem('modoJuego', modoJuego);

            if (tablero === 'Invierno') {
                tableroElemento.style.backgroundImage = "url('../../../recursos/img/tableroInvierno.png')";
                document.body.style.backgroundColor = "#9bceffff";
                recinto7.style.display = "none";
                recinto8.style.display = "none";
                recinto9.style.display = "none";
                recinto10.style.display = "none";
                recinto11.style.display = "none";
                recinto12.style.display = "none";                
            }

            if (tablero === "Verano") {
                recinto1.style.display = "none";
                recinto2.style.display = "none";
                recinto3.style.display = "none";
                recinto4.style.display = "none";
                recinto5.style.display = "none";
                recinto6.style.display = "none";
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
    "PuenteIzq": "El-puente-de-los-enamorados-izquierda",
    "PuenteDer": "El-puente-de-los-enamorados-derecha",
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