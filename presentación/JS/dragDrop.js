document.addEventListener("DOMContentLoaded", () => {
    const dinos = document.querySelectorAll(".grid-dinos img");
    const recintos = document.querySelectorAll(".recinto, .Rio");

    const idioma = localStorage.getItem("idioma") || "es";

    const traduccionesRecintos = {
        "El-Bosque-Ordenado": idioma === "en" ? "Ordered Forest" : "El Bosque Ordenado",
        "El-puente-de-los-enamorados-izquierda": idioma === "en" ? "Lovers' Bridge (left)" : "Puente de los Enamorados (izq.)",
        "El-puente-de-los-enamorados-derecha": idioma === "en" ? "Lovers' Bridge (right)" : "Puente de los Enamorados (der.)",
        "El-puesto-de-observación": idioma === "en" ? "Observation Post" : "Puesto de Observación",
        "La-pirámide": idioma === "en" ? "The Pyramid" : "La Pirámide",
        "Zona-de-cuarentena": idioma === "en" ? "Quarantine Zone" : "Zona de Cuarentena",
        "El-bosque-de-la-semejanza": idioma === "en" ? "Forest of Similarity" : "Bosque de la Semejanza",
        "El-trío-frondoso": idioma === "en" ? "Leafy Trio" : "Trío Frondoso",
        "La-pradera-del-amor": idioma === "en" ? "Love Meadow" : "Pradera del Amor",
        "El-rey-de-la-selva": idioma === "en" ? "King of the Jungle" : "Rey de la Selva",
        "El-prado-de-la-diferencia": idioma === "en" ? "Meadow of Difference" : "Prado de la Diferencia",
        "La-isla-solitaria": idioma === "en" ? "Lonely Island" : "Isla Solitaria",
        "Rio": idioma === "en" ? "River" : "Río"
    };

    const textos = {
        confirmarColocar: idioma === "en"
            ? (dino, recinto) => `You are placing ${dino} in ${recinto}. Confirm?`
            : (dino, recinto) => `Estás colocando ${dino} en ${recinto}. ¿Confirmar?`,

        recintoLleno: idioma === "en"
            ? "You can’t place more dinosaurs in that enclosure."
            : "No puedes colocar más dinosaurios en ese recinto."
    };

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
            const claseRecinto = recinto.classList[2] || "Rio";
            const nombreRecinto = traduccionesRecintos[claseRecinto] || claseRecinto;

            if (dino && confirm(textos.confirmarColocar(dino.alt, nombreRecinto))) {
                if (validarRecinto(recinto)) {
                    recinto.appendChild(dino);
                    const dinoRegistrar = dino.alt;
                    registrarJugada(dinoRegistrar, recinto);
                } else {
                    alert(textos.recintoLleno);
                }
            }
        });
    });
});
