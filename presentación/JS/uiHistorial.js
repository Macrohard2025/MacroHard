const botonVolver = document.getElementById('botonVolverHistorial');
const tbody = document.getElementById('tbody');

botonVolver.addEventListener('click', () => {
    window.location.href = 'menuSala.html';
});

addEventListener('DOMContentLoaded', () => {
    fetch(`../../../negocio/recuperarHistorial.php?idUsuario=${encodeURIComponent(localStorage.getItem('idUsuario'))}`)
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = ""; // Limpiar por si acaso

            if (data.length === 0) {
                const fila = document.createElement("tr");
                fila.innerHTML = `<td colspan="6">No has jugado ninguna partida aún.</td>`;
                tbody.appendChild(fila);
            } else {
                data.forEach(partida => {
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