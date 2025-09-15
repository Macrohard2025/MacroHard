document.addEventListener("DOMContentLoaded", () => {
    const dinos = document.querySelectorAll(".grid-dinos img");
    const recintos = document.querySelectorAll(".recinto, .Rio");

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
            const recintoSeleccionado = recinto.classList[2] || "Rio";
            if (dinoSeleccionado && confirm(`Estás colocando ${dinoSeleccionado.alt} en ${recintoSeleccionado}. ¿Confirmar?`)) {
                if (validarRecinto(recinto)) {
                    recinto.appendChild(dinoSeleccionado);
                    const jugador = localStorage.getItem("jugadorActual");
                    registrarJugada(dinoSeleccionado.alt, recinto);
                    dinoSeleccionado.classList.remove("seleccionado");
                    dinoSeleccionado = null;
                } else {
                    alert("No puedes colocar más dinosaurios en ese recinto")
                }
            }
        });
    });
});
