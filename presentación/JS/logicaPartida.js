function registrarJugada(dino, recinto) {

    fetch("../../../negocio/borrarDino.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `jugadorId=${localStorage.idJugadorActual}&dino=${encodeURIComponent(dino)}&idPartida=${localStorage.idPartida}`
    })
        .catch(err => console.error("Error borrando dino:", err));

    const recintoId = recinto.classList[2];

    const mapaRecintos = {
        "El-Bosque-Ordenado": "BosqueInv",
        "El-puente-de-los-enamorados-izquierda": "PuenteIzq",
        "El-puente-de-los-enamorados-derecha": "PuenteDer",
        "El-puesto-de-observación": "Puesto",
        "La-pirámide": "Piramide",
        "Zona-de-cuarentena": "Cuarentena",
        "El-bosque-de-la-semejanza": "Bosque",
        "El-trío-frondoso": "Trio",
        "La-pradera-del-amor": "Amor",
        "El-rey-de-la-selva": "Rey",
        "El-prado-de-la-diferencia": "Prado",
        "La-isla-solitaria": "Isla"
    };

    let recintoNombre = mapaRecintos[recintoId] || "Rio";

    const inputJugador = document.getElementById("jugadorActualInput");
    const inputDino = document.getElementById("dinoSeleccionadoInput");
    const inputRecinto = document.getElementById("recintoSeleccionadoInput");
    const inputIdPartida = document.getElementById("idPartidaInput2");
    const formRegistrarJugada = document.getElementById("formRegistrarJugada");

    inputDino.value = dino;
    inputJugador.value = localStorage.getItem("idJugadorActual");
    inputRecinto.value = recintoNombre;
    inputIdPartida.value = localStorage.getItem("idPartida");
    formRegistrarJugada.submit();

    pasarTurno();
}

const rondaActualElemento = document.getElementById("rondaActualElemento");
const turnoActualElemento = document.getElementById("turnoActualElemento");

function pasarTurno() {
    let turnoActual = Number(localStorage.turnoActual);
    let rondaActual = Number(localStorage.rondaActual);
    let jugadorIndex = Number(localStorage.jugadorIndex);

    const totalJugadores = idsArray.length;

    if (localStorage.modoJuego === "Solo") {
        if (turnoActual < 6) {
            fetch(`../../../negocio/rotarManos.php?idPartida=${localStorage.idPartida}`);
            localStorage.turnoActual = turnoActual + 1;
            localStorage.removeItem("dado");
        } else if (rondaActual === 1) {
            localStorage.turnoActual = 1;
            localStorage.rondaActual = rondaActual + 1;
            localStorage.removeItem("dado");
        } else {
            finalizarPartida();
        }
    } else if (localStorage.modoJuego === "Multi") {
        jugadorIndex++;

        if (jugadorIndex < totalJugadores) {
            localStorage.jugadorIndex = jugadorIndex;
        } else {
            localStorage.jugadorIndex = 0;

            localStorage.turnoActual = turnoActual + 1;
            localStorage.removeItem("dado");

            fetch(`../../../negocio/rotarManos.php?idPartida=${localStorage.idPartida}`);

            if (localStorage.turnoActual > 6) {
                if (rondaActual === 1) {
                    localStorage.turnoActual = 1;
                    localStorage.rondaActual = rondaActual + 1;
                    localStorage.removeItem("dado");
                } else {
                    finalizarPartida();
                }
            }
        }
    }

    turnoActualElemento.innerHTML = "Turno " + localStorage.turnoActual;
    rondaActualElemento.innerHTML = "Ronda " + localStorage.rondaActual;

    const index = Number(localStorage.jugadorIndex);
    const jugadorNombre = nombresArray[index];
    const jugadorId = idsArray[index];
    localStorage.setItem("jugadorActual", jugadorNombre);
    localStorage.setItem("idJugadorActual", jugadorId);
}

function finalizarPartida() {
    registroUsuario = localStorage.getItem('registroUsuario');
    idUsuarioLocal = localStorage.getItem('idUsuario');
    idioma = localStorage.getItem('idioma');
    tema = localStorage.getItem('tema');
    idPartidaLocal = localStorage.getItem("idPartida");
    localStorage.clear();
    localStorage.setItem("idPartida", idPartidaLocal);
    localStorage.setItem('registroUsuario', registroUsuario);
    localStorage.setItem('idUsuario', idUsuarioLocal);
    localStorage.setItem('idioma', idioma);
    localStorage.setItem('tema', tema);
    window.location.href = "finalizarPartida.html";
}

document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("jugadorIndex") === null) {
        localStorage.setItem("jugadorIndex", 0);
    }

    if (localStorage.modoJuego != "Control") {
        turnoActualElemento.innerHTML = "Turno " + localStorage.turnoActual;
        rondaActualElemento.innerHTML = "Ronda " + localStorage.rondaActual;
    }
});