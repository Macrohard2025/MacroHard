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
