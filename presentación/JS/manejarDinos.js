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

    fetch(`../../../negocio/repartirDinos.php?idPartida=${encodeURIComponent(localStorage.idPartida)}`)
        .then(res => res.json())
        .then(data => {
            manoActual = data[jugadorActual] || [];
            mostrarMano();

            const recintos = document.querySelectorAll(".recinto, .Rio");

            recintos.forEach(recinto => {
                recinto.addEventListener("click", () => {
                    const recintoSeleccionado = recinto.classList[2] || "Rio";
                    if (dinoSeleccionado && confirm(`Estás colocando ${dinoSeleccionado.alt} en ${recintoSeleccionado}. ¿Confirmar?`)) {
                        if (localStorage.getItem("dado") != null || localStorage.getItem("modoJuego") == "Control") {
                            if (validarRecinto(recinto)) {
                                if (validarDado(recinto, dinoSeleccionado)) {
                                    recinto.appendChild(dinoSeleccionado);
                                    registrarJugada(dinoSeleccionado.alt, recinto);
                                    dinoSeleccionado.classList.remove("seleccionado");
                                    dinoSeleccionado = null;

                                    const index = manoActual.indexOf(dinoSeleccionado.alt);
                                    if (index > -1) {
                                        manoActual.splice(index, 1);
                                        mostrarMano();
                                    }
                                } else {
                                    alert("El dado no te permite colocar ese dinosaurio en ese recinto")
                                }
                            } else {
                                alert("No puedes colocar más dinosaurios en este recinto")
                            }
                        } else {
                            alert("Debe tirar el dado primero");
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
                    const recintoSeleccionado = recinto.classList[2] || "Rio";

                    if (dino && confirm(`Estás colocando ${dino.alt} en ${recintoSeleccionado}. ¿Confirmar?`)) {
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
                                    alert("El dado no te permite colocar ese dinosaurio en ese recinto")
                                }
                            } else {
                                alert("No puedes colocar más dinosaurios en ese recinto")
                            }
                        } else {
                            alert("Debe tirar el dado primero");
                        }
                    }
                });
            });
        })
        .catch(err => console.error("Error cargando manos:", err));
});
