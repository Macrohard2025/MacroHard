document.addEventListener("DOMContentLoaded", () => {
    const idPartida = localStorage.getItem("idPartida");
    const tbody = document.querySelector("table tbody");
    const ganadorElemento = document.getElementById("ganador");
    const menuVolverBoton = document.getElementById("menuVolver");

    menuVolverBoton.addEventListener("click", (e) => {
        e.preventDefault();
        registroUsuario = localStorage.getItem('registroUsuario');
        idUsuarioLocal = localStorage.getItem('idUsuario');
        idioma = localStorage.getItem('idioma');
        tema = localStorage.getItem('tema');
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

    fetch(`../../../negocio/recuperarResultados.php?idPartida=${encodeURIComponent(idPartida)}`)
        .then(res => res.json())
        .then(data => {
            if (!data || !Array.isArray(data)) {
                console.error("Datos inválidos del backend:", data);
                return;
            }

            data.sort((a, b) => b.puntos - a.puntos);

            tbody.innerHTML = "";

            ganadorElemento.innerHTML = data[0].nombre;

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
        .catch(err => console.error("Error cargando resultados:", err));
});

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("cargado")) {
        localStorage.setItem("cargado", "true");
        contarPuntos(localStorage.getItem("idPartida"));
        window.location.reload();
    }
});

function contarPuntos(idPartida) {
    fetch(`../../../negocio/contarPuntos.php?idPartida=${idPartida}`)
        .catch(err => console.error("Error contando puntos:", err));
}
