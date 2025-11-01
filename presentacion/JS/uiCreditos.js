const introTexto = document.getElementById('intro-credits');
const botonVolver = document.getElementById('botonVolver');
const creditosText = document.getElementById('creditosText');
const creditosParagraph = document.getElementById('creditos-paragraph');

if (localStorage.idioma === 'en') {
    document.title = "Credits";
    introTexto.innerHTML = "This website has been developed by the <strong>Macrohard</strong> team, made up of:";
    botonVolver.textContent = "Back to home";
    creditosText.textContent = "Credits";
    creditosParagraph.innerHTML = "We deeply appreciate the support provided by the <strong>teachers</strong>, <strong>administrative staff</strong>, <strong>colleagues</strong>, and all those who, in one way or another, collaborated and accompanied us throughout this project. Their guidance, encouragement, and constructive feedback have been invaluable in shaping this website. We are grateful for their contributions and for being part of this journey with us.";
}

const cartaCreditos = document.querySelector(".card.carta-creditos");
const logoMacrohard = document.getElementById("logo-macrohard");
const nombresDesarrolladores = document.querySelectorAll("li");

if (localStorage.tema === 'oscuro') {
    document.body.style.backgroundImage = "url('../../recursos/img/fondoCreditos2.png')";
    logoMacrohard.src = "../../recursos/img/LogoMH.png";
    cartaCreditos.classList.add("bg-dark", "text-light");
    cartaCreditos.classList.remove("bg-light");
    creditosParagraph.classList.add("text-light");
    creditosText.classList.add("text-light");
    introTexto.classList.add("text-light");
    nombresDesarrolladores.forEach(nombre => {
        nombre.classList.add("text-light");
    });
}