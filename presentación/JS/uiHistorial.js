const botonVolver = document.getElementById('botonVolverHistorial');
const tbody = document.getElementById('tbody');

botonVolver.addEventListener('click', () => {
    window.location.href = 'menuSala.html';
});

addEventListener('DOMContentLoaded', () => {
    fetch(`../../../negocio/recuperarHistorial.php?idUsuario=${encodeURIComponent(localStorage.getItem('idUsuario'))}`)
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";

            if (data.length === 0) {
                const fila = document.createElement("tr");
                if (localStorage.idioma === "en") {
                    fila.innerHTML = `<td colspan="6">You haven't played any games yet.</td>`;
                } else {
                    fila.innerHTML = `<td colspan="6">No has jugado ninguna partida aún.</td>`;
                }
                tbody.appendChild(fila);
            } else {
                data.forEach(partida => {

                    if (localStorage.idioma === "en") {
                        partida.modo = traducciones[partida.modo] || partida.modo;
                    }

                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                    <td>${partida.id}</td>
                    <td>${partida.fecha}</td>
                    <td>${partida.modo}</td>
                    <td>${partida.ganador}</td>
                    <td>${partida.puntos}</td>
                    <td>#${partida.posicion}</td>
                `;
                    tbody.appendChild(fila);
                })
            }
        });
});

const traducciones = {
    "Control - Invierno": "Control - Winter",
    "Control - Verano": "Control - Summer",
    "Solo - Invierno": "Solo - Winter",
    "Solo - Verano": "Solo - Summer",
    "Multi - Invierno": "Multi - Winter",
    "Multi - Verano": "Multi - Summer"
};


const textoPrincipal = document.getElementById('textoPrincipal');
const fechaTexto = document.getElementById('fechaTexto');
const modoTexto = document.getElementById('modoTexto');
const ganadorTexto = document.getElementById('ganadorTexto');
const puntosTexto = document.getElementById('puntosTexto');
const posicionTexto = document.getElementById('posicionTexto');
addEventListener("DOMContentLoaded", function () {
    if (localStorage.idioma === "en") {
        botonVolver.textContent = "Back";
        textoPrincipal.textContent = "Game History";
        fechaTexto.textContent = "Date";
        modoTexto.textContent = "Mode";
        ganadorTexto.textContent = "Winner";
        puntosTexto.textContent = "Winner's Points";
        posicionTexto.textContent = "Your Position";
        document.title = "Game History";
    }
});