const botonFinalizar = document.getElementById("btnFinalizar");
const finalTextoPop = document.getElementById("finalTextoPop");
const finalTextoMsg = document.getElementById("finalTextoMsg");

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("idioma") === "en") {
        document.title = "Game Room";
        botonVolver.textContent = "Back to Lobby";
        textoBolsa.textContent = "Open the bag";
        finalTextoPop.textContent = "The game has ended!";
        finalTextoMsg.textContent = "You can see the results here.";
        botonFinalizar.textContent = "End Game";
    }
});