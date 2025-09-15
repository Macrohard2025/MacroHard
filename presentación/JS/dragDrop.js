document.addEventListener("DOMContentLoaded", () => {
    const dinos = document.querySelectorAll(".grid-dinos img");
    const recintos = document.querySelectorAll(".recinto, .Rio");

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
            const recintoSeleccionado = recinto.classList[2] || "Rio";
            if (dino && confirm(`Estás colocando ${dino.alt} en ${recintoSeleccionado}. ¿Confirmar?`)) {
                if (validarRecinto(recinto)) {
                    recinto.appendChild(dino);
                    dinoRegistrar = dino.alt;
                    registrarJugada(dinoRegistrar, recinto);
                } else {
                    alert("No puedes colocar más dinosaurios en ese recinto")
                }
            }
        });
    });
});
