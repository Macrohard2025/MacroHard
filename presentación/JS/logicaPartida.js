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
            localStorage.turnoActual = turnoActual + 1;
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
                    localStorage.turnoActual = turnoActual + 1;
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

function mostrarPantallaFinal() {
    document.querySelector("header").style.display = "none";
    document.getElementById("col-izquierda").style.display = "none";
    document.getElementById("col-centro").style.display = "none";
    document.getElementById("col-derecha").style.display = "none";

    const pantallaFinal = document.getElementById("pantalla-final");
    pantallaFinal.style.display = "block";

    document.getElementById("btnFinalizar").addEventListener("click", () => {
        finalizarPartida();
    });
}

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.turnoActual > 6 && localStorage.rondaActual > 1 && localStorage.tablero !== "Invierno" || localStorage.turnoActual > 7) {
        mostrarPantallaFinal();
    } else if (localStorage.turnoActual > 6 && localStorage.rondaActual > 1 && localStorage.tablero === "Invierno") {
        localStorage.removeItem("dado");
        turnoCuarentena();
    }

});

document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("jugadorIndex") === null) {
        localStorage.setItem("jugadorIndex", 0);
    }

    if (localStorage.modoJuego != "Control") {
        let ronda;
        let turno;
        if (localStorage.getItem("idioma") === "en") {
            ronda = "Round ";
            turno = "Turn ";
        } else {
            ronda = "Ronda ";
            turno = "Turno ";
        }
        turnoActualElemento.innerHTML = turno + localStorage.turnoActual;
        rondaActualElemento.innerHTML = ronda + localStorage.rondaActual;
    }
});

function turnoCuarentena() {
    fetch(`../../../negocio/getDinoCuarentena.php?idPartida=${localStorage.idPartida}&idUsuario=${localStorage.idJugadorActual}`)
        .then(res => res.json())
        .then(data => {
            const dinoNombre = data.dinoCuarentena;

            if (!dinoNombre) {
                if (localStorage.modoJuego === "Solo") {
                    mostrarPantallaFinal();
                } else {
                    pasarTurno();
                }
                return;
            }

            document.getElementById("columnaDinos").style.display = "none";
            const colIzquierda2 = document.getElementById("col-izquierda2");
            colIzquierda2.style.display = "flex";
            const contenedor = colIzquierda2.querySelector(".grid-dinos .dinos");

            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = `../../../recursos/img/dinos/${mapaDinos[dinoNombre]}`;
            img.alt = dinoNombre;
            img.id = dinoNombre;
            img.classList.add("dino-mano");

            img.addEventListener("click", () => {
                dinoSeleccionado = img;
                document.querySelectorAll(".grid-dinos img").forEach(d => d.classList.remove("seleccionado"));
                img.classList.add("seleccionado");
            });

            img.setAttribute("draggable", true);
            img.addEventListener("dragstart", e => e.dataTransfer.setData("idDino", dinoNombre));

            div.appendChild(img);
            contenedor.appendChild(div);

            document.querySelector(".Zona-de-cuarentena").innerHTML = "";
        })
        .catch(err => console.error("Error cargando dino de cuarentena:", err));
}

