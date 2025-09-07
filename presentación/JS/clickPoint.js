document.addEventListener("DOMContentLoaded", () => {
    const dinos = document.querySelectorAll(".grid-dinos img");
    const recintos = document.querySelectorAll(".recinto, .rio");

    let dinoSeleccionado = null;

    dinos.forEach(dino => {
        dino.addEventListener("click", () => {
            dinoSeleccionado = dino;
            dinos.forEach(d => d.classList.remove("seleccionado"));
            dino.classList.add("seleccionado");
        });
    });

    recintos.forEach(recinto => {
        recinto.addEventListener("click", () => {
            const recintoSeleccionado = recinto.classList[2] || "rio";
            if (dinoSeleccionado && confirm(`Estás colocando ${dinoSeleccionado.alt} en ${recintoSeleccionado}. ¿Confirmar?`)) {
                if (localStorage.getItem("dado") != null || localStorage.getItem("modoJuego") == "Control") {
                    recinto.appendChild(dinoSeleccionado);
                    const jugador = localStorage.getItem("jugadorActual");
                    registrarJugada(dinoSeleccionado.alt, recinto);
                    dinoSeleccionado.classList.remove("seleccionado");
                    dinoSeleccionado = null;
                } else {
                    alert("Debe tirar el dado primero");
                }
            }
        });
    });
});
