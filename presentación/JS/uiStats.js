document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");

  fetch("../../negocio/recuperarRanking.php")
    .then((res) => res.json())
    .then((data) => {
      tbody.innerHTML = "";

      if (!data || data.length === 0) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td colspan="6" class="text-center">
            ${localStorage.idioma === "en"
            ? "No players in the ranking yet."
            : "Aún no hay jugadores en el ranking."}
          </td>`;
        tbody.appendChild(fila);
        return;
      }

      data.forEach((jugador, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${jugador.nombre}</td>
          <td>${jugador.partidas_jugadas}</td>
          <td>${jugador.puntos_totales}</td>
          <td>${jugador.promedio_puntos.toFixed(1)}</td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch((err) => {
      console.error(err);
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-danger">
            Error al cargar el ranking.
          </td>
        </tr>`;
    });
});

const botonVolver = document.getElementById("botonVolver");
const rankTitulo = document.getElementById("rankTitulo");
const tablaNombre = document.getElementById("tablaNombre");
const tablaJugadas = document.getElementById("tablaJugadas");
const tablaPuntos = document.getElementById("tablaPuntos");
const tablaPPP = document.getElementById("tablaPPP");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("idioma") === "en") {
    botonVolver.textContent = "Back to Home";
    rankTitulo.textContent = "Player Ranking";
    tablaNombre.textContent = "Name";
    tablaJugadas.textContent = "Games Played";
    tablaPuntos.textContent = "Total Points";
    tablaPPP.textContent = "Points per Game";
    document.title = "Statistics";
  }
});