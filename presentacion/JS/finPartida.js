document.addEventListener("DOMContentLoaded", () => {
    const idPartida = localStorage.getItem("idPartida");
    const tbody = document.querySelector("table tbody");
    const ganadorElemento = document.getElementById("ganador");
    const menuVolverBoton = document.getElementById("menuVolver");
    
    menuVolverBoton.addEventListener("click", (e) => {
        e.preventDefault();
        const registroUsuario = localStorage.getItem('registroUsuario');
        const idUsuarioLocal = localStorage.getItem('idUsuario');
        const idioma = localStorage.getItem('idioma');
        const tema = localStorage.getItem('tema');
        
        localStorage.clear();
        localStorage.setItem('registroUsuario', registroUsuario);
        localStorage.setItem('idUsuario', idUsuarioLocal);
        localStorage.setItem('idioma', idioma);
        localStorage.setItem('tema', tema);
        
        window.location.href = "menuSala.html";
    });
    
    if (!idPartida) {
        console.error("No hay idPartida en localStorage");
        return;
    }
    
    contarPuntos(idPartida)
    .then(status => {
        if (status === "ok") {
            console.log("Puntos contados correctamente, cargando resultados...");
            
            return fetch(`../../../negocio/recuperarResultados.php?idPartida=${encodeURIComponent(idPartida)}`);
        } else {
            throw new Error("Error al contar puntos");
        }
    })
    .then(res => res.json())
    .then(data => {
        if (!data || !Array.isArray(data)) {
            console.error("Datos inválidos del backend:", data);
            return;
        }
        
        data.sort((a, b) => b.puntos - a.puntos);
        
        tbody.innerHTML = "";
        ganadorElemento.innerHTML = "";
        if (localStorage.idioma === "en") {
            ganadorElemento.textContent = `Congratulations ${data[0].nombre}!`;
        } else {
            ganadorElemento.textContent = `¡Felicidades ${data[0].nombre}!`;
        }
        
        data.forEach((jugador, index) => {
            const tr = document.createElement("tr");
            const puestoTd = document.createElement("td");
            const nombreTd = document.createElement("td");
            const puntosTd = document.createElement("td");
            
            puestoTd.textContent = `#${index + 1}`;
            nombreTd.textContent = jugador.nombre;
            puntosTd.textContent = jugador.puntos;
            
            tr.appendChild(puestoTd);
            tr.appendChild(nombreTd);
            tr.appendChild(puntosTd);
            
            tbody.appendChild(tr);
        });
    })
    .catch(err => console.error("Error general:", err));
    if (localStorage.idioma === "en") {
        traducirPagina();
    }
});

function contarPuntos(idPartida) {
    return fetch(`../../../negocio/contarPuntos.php?idPartida=${idPartida}`)
    .then(res => res.json())
    .then(data => {
        if (data && data.status === "ok") {
            return "ok";
            } else {
                console.error("Respuesta inesperada al contar puntos:", data);
                return "error";
            }
        })
        .catch(err => {
            console.error("Error contando puntos:", err);
            return "error";
        });
}

const textocongrats = document.getElementById("textoCongrats");
const columnaPuesto = document.getElementById("columnaPuesto");
const columnaNombre = document.getElementById("columnaNombre");
const columnaPuntos = document.getElementById("columnaPuntos");

function traducirPagina() {
    document.title = "Game Over";
    const menuVolverBoton = document.getElementById("menuVolver");
    menuVolverBoton.textContent = "Back to Menu";
    textocongrats.textContent = "Game Over!";
    columnaPuesto.textContent = "Position";
    columnaNombre.textContent = "Name";
    columnaPuntos.textContent = "Points";
}