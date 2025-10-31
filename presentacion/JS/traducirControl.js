const elegirDino = document.getElementById('elegirDino');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("idioma") === "en") {
        document.title = "Ongoing game";
        botonVolver.textContent = "Cancel game";
        elegirDino.textContent = "Choose a dinosaur";
        botonFinalizarControl.textContent = "Finish game";
    }
});