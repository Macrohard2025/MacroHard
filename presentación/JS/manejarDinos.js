let manoActual = [];
let dinoSeleccionado = null;

function generarDino(nombre) {
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src = `../../../recursos/img/dinos/${mapaDinos[nombre]}`;
    img.alt = nombre;
    img.id = nombre;
    img.classList.add("dino-mano");

    img.addEventListener("click", () => {
        dinoSeleccionado = img;
        document.querySelectorAll(".grid-dinos img").forEach(d => d.classList.remove("seleccionado"));
        img.classList.add("seleccionado");
    });

    img.setAttribute("draggable", true);
    img.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("idDino", nombre);
    });

    div.appendChild(img);
    return div;
}

function mostrarMano() {
    const contenedor = document.querySelector(".grid-dinos .dinos");
    contenedor.innerHTML = "";

    manoActual.forEach(nombre => {
        const dino = generarDino(nombre);
        contenedor.appendChild(dino);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const jugadorActual = localStorage.idJugadorActual;
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

        dadoInvalido: idioma === "en"
            ? "The dice doesn’t allow you to place that dinosaur in that enclosure."
            : "El dado no te permite colocar ese dinosaurio en ese recinto.",

        recintoLleno: idioma === "en"
            ? "You can’t place more dinosaurs in that enclosure."
            : "No puedes colocar más dinosaurios en ese recinto.",

        tirarDadoPrimero: idioma === "en"
            ? "You must roll the dice first."
            : "Debe tirar el dado primero."
    };

    fetch(`../../../negocio/repartirDinos.php?idPartida=${encodeURIComponent(localStorage.idPartida)}`)
        .then(res => res.json())
        .then(data => {
            manoActual = data[jugadorActual] || [];
            mostrarMano();

            const recintos = document.querySelectorAll(".recinto, .Rio");

            recintos.forEach(recinto => {
                recinto.addEventListener("click", () => {
                    const claseRecinto = [...recinto.classList].find(c => traduccionesRecintos[c]) || "Rio";
                    const nombreRecinto = traduccionesRecintos[claseRecinto];

                    if (dinoSeleccionado && confirm(textos.confirmarColocar(dinoSeleccionado.alt, nombreRecinto))) {
                        if (localStorage.getItem("dado") != null || localStorage.getItem("modoJuego") == "Control") {
                            if (validarRecinto(recinto)) {
                                if (validarDado(recinto, dinoSeleccionado)) {
                                    recinto.appendChild(dinoSeleccionado);
                                    registrarJugada(dinoSeleccionado.alt, recinto);
                                    dinoSeleccionado.classList.remove("seleccionado");

                                    const index = manoActual.indexOf(dinoSeleccionado.alt);
                                    if (index > -1) {
                                        manoActual.splice(index, 1);
                                        mostrarMano();
                                    }

                                    dinoSeleccionado = null;
                                } else {
                                    alert(textos.dadoInvalido);
                                }
                            } else {
                                alert(textos.recintoLleno);
                            }
                        } else {
                            alert(textos.tirarDadoPrimero);
                        }
                    }
                });
            });

            recintos.forEach(recinto => {
                recinto.addEventListener("dragover", (e) => e.preventDefault());
                recinto.addEventListener("drop", (e) => {
                    e.preventDefault();
                    const idDino = e.dataTransfer.getData("idDino");
                    const dino = document.getElementById(idDino);
                    const claseRecinto = [...recinto.classList].find(c => traduccionesRecintos[c]) || "Rio";
                    const nombreRecinto = traduccionesRecintos[claseRecinto];

                    if (dino && confirm(textos.confirmarColocar(dino.alt, nombreRecinto))) {
                        if (localStorage.getItem("dado") != null || localStorage.getItem("modoJuego") == "Control") {
                            if (validarRecinto(recinto)) {
                                if (validarDado(recinto, dino)) {
                                    recinto.appendChild(dino);
                                    registrarJugada(dino.alt, recinto);

                                    const index = manoActual.indexOf(dino.alt);
                                    if (index > -1) {
                                        manoActual.splice(index, 1);
                                        mostrarMano();
                                    }
                                } else {
                                    alert(textos.dadoInvalido);
                                }
                            } else {
                                alert(textos.recintoLleno);
                            }
                        } else {
                            alert(textos.tirarDadoPrimero);
                        }
                    }
                });
            });
        })
        .catch(err => console.error("Error cargando manos:", err));
});
