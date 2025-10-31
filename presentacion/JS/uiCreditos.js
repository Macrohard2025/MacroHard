const introTexto = document.getElementById('intro-credits');
const botonVolver = document.getElementById('botonVolver');
const creditosText = document.getElementById('creditosText');
const creditosParagraph = document.getElementById('creditos-paragraph');

if(localStorage.idioma === 'en') {
    document.title = "Credits";
    introTexto.innerHTML = "This website has been developed by the <strong>Macrohard</strong> team, made up of:";
    botonVolver.textContent = "Back to home";
    creditosText.textContent = "Credits";
    creditosParagraph.innerHTML = "We deeply appreciate the support provided by the <strong>teachers</strong>, <strong>administrative staff</strong>, <strong>colleagues</strong>, and all those who, in one way or another, collaborated and accompanied us throughout this project. Their guidance, encouragement, and constructive feedback have been invaluable in shaping this website. We are grateful for their contributions and for being part of this journey with us.";
}