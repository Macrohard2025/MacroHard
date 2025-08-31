document.addEventListener("DOMContentLoaded", () => {
    const dinos = document.querySelectorAll(".grid-dinos img");
    const recintos = document.querySelectorAll(".recinto, .rio");

    dinos.forEach(dino => {
        dino.setAttribute("draggable", true);

        dino.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("idDino", dino.id);
        });
    });

    recintos.forEach(recinto => {
        recinto.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        recinto.addEventListener("drop", (e) => {
            e.preventDefault();
            const idDino = e.dataTransfer.getData("idDino");
            const dino = document.getElementById(idDino);
            const recintoSeleccionado = recinto.classList[1] || "rio";
            if (dino && confirm(`Estás colocando ${dino.alt} en ${recintoSeleccionado}. ¿Confirmar?`)) {
                recinto.appendChild(dino);

                const jugador = localStorage.getItem("jugadorActual");
                registrarJugada(dino, recinto, jugador);
            }
        });
    });
});
