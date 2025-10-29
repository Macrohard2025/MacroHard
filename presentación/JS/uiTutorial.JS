const textoPizarron = document.getElementById('texto-pizarron');
const botonAnterior = document.getElementById('boton-anterior');
const botonSiguiente = document.getElementById('boton-siguiente');
const botonVolver = document.getElementById('botonVolver');

const mensajes = [
    "¡Hola! Soy el profesor <strong>Cuernitos</strong> y hoy te estaré enseñando cómo jugar <strong>Draftosaurus</strong>. <br> Acomodate en tu silla, sacá el snack y preparate para explorar el maravilloso mundo de los <strong>dinosaurios</strong>.",

    "<strong>Partida:</strong><br>Cada partida se divide en <strong>2 rondas</strong> de <strong>6 turnos</strong> cada una. Al inicio de cada ronda, todos agarran 6 dinosaurios al azar y los mantienen ocultos.",

    "<strong>Ronda 1:</strong><br>El jugador más joven lanza el dado al inicio de todos los turnos.<br>Todos eligen 1 dinosaurio y lo colocan en su parque respetando las restricciones del dado.<br>Luego, pasan sus dinosaurios restantes a la izquierda y vuelven a repetir el proceso hasta tener 6 dinosaurios cada uno en su tablero.",

    "<strong>Ronda 2:</strong><br>Empieza cuando todos tienen 6 dinos en su parque.<br>Se juega igual que la ronda 1.<br><br><strong>Final de la partida:</strong><br>Se suman los puntos. Gana quien tenga más.",

    "<strong>Recintos:</strong><br>Tu parque tiene <strong>6 recintos</strong>, cada uno con reglas distintas para colocar dinosaurios y obtener puntos.<br>Además, existe el <strong>río</strong>, que no es un recinto, pero también sirve para ubicar dinosaurios.",

    "<strong>El Bosque de la Semejanza:</strong><br>Solo acepta dinosaurios de <strong>la misma especie</strong>.<br>Se llena de izquierda a derecha sin dejar espacios.",

    "<strong>El Prado de la Diferencia:</strong><br>Solo acepta dinosaurios de <strong>especies distintas</strong>.<br>También se llena de izquierda a derecha sin espacios.",

    "<strong>La Pradera del Amor:</strong><br>Permite cualquier especie.<br><strong>5 puntos</strong> por cada <strong>pareja</strong> de la misma especie.<br>Los que no formen pareja no puntúan.",

    "<strong>El Trío Frondoso:</strong><br>Solo da puntos si tiene <strong>exactamente 3 dinosaurios</strong>.<br>Menos o más: <strong>0 puntos</strong>.",

    "<strong>El Rey de la Selva:</strong><br>Solo 1 dinosaurio.<br><strong>7 puntos</strong> si tenés más dinos de esa especie que los demás.<br>Empate: también ganás los puntos.",

    "<strong>La Isla Solitaria:</strong><br>Solo 1 dinosaurio.<br><strong>7 puntos</strong> si es el único de su especie en tu parque.<br>Si hay otro igual en tu parque: 0 puntos.",

    "<strong>El Río:</strong><br>No es un recinto.<br>Cada dinosaurio en el río vale <strong>1 punto</strong>, sin importar su especie.",

    "<strong>T-Rex:</strong><br>Cada recinto con al menos 1 T-Rex da <strong>1 punto extra</strong>.<br>No importa si hay más de uno, siempre suma solo 1 extra por recinto.",

    "<strong>El Dado:</strong><br>En cada turno, alguien lanza el dado.<br>La regla del dado se aplica a todos.",

    "<strong>Caras del Dado:</strong><br>• <strong>Bosque:</strong> Colocar en recintos del área de bosque.<br>• <strong>Llanura:</strong> Colocar en recintos del área de llanura.<br>• <strong>Baños:</strong> Solo a la derecha del río.<br>• <strong>Cafetería:</strong> Solo a la izquierda del río.<br>• <strong>Recinto vacío:</strong> Solo en recintos sin dinosaurios.<br>• <strong>¡Cuidado con el T-Rex!:</strong> No se puede colocar en un recinto que ya tenga T-Rex.",

    "<strong>Tablero de invierno:</strong><br>Además del tablero original, existe una versión llamada <strong>Tablero de Invierno</strong>, con nuevos recintos que cambian la estrategia.<br><br><strong>El Bosque Ordenado:</strong> Solo puede tener dos especies distintas, alternadas de izquierda a derecha. No se pueden dejar huecos entre dinos ni repetir especie en posiciones separadas.",

    "<strong>El Puente de los Enamorados:</strong><br>Dos zonas separadas por el río. Gana <strong>6 puntos</strong> por cada pareja de dinos iguales que estén uno a cada lado.<br><br><strong>El Puesto de Observación:</strong><br>Solo puede tener un dinosaurio. Da <strong>2 puntos</strong> por cada dino de la misma especie que tenga el jugador a tu derecha.",

    "<strong>La Pirámide:</strong><br>Hasta 6 dinos en tres niveles. No pueden estar dos del mismo tipo juntos ni en diagonal. Cada nivel otorga puntos diferentes.<br><br><strong>Zona de Cuarentena:</strong><br>Solo un dinosaurio. Al final, podés moverlo al <strong>Río</strong> o a otro recinto válido según sus reglas."
];

let indiceMensaje = 0;

function actualizarTexto() {
    textoPizarron.innerHTML = mensajes[indiceMensaje];
    botonAnterior.style.display = (indiceMensaje === 0) ? 'none' : 'flex';
    botonSiguiente.style.display = (indiceMensaje === mensajes.length - 1) ? 'none' : 'flex';
}

function mostrarSiguienteMensaje() {
    if (indiceMensaje < mensajes.length - 1) {
        indiceMensaje++;
        actualizarTexto();
    }
}

function mostrarMensajeAnterior() {
    if (indiceMensaje > 0) {
        indiceMensaje--;
        actualizarTexto();
    }
}

botonSiguiente.addEventListener('click', mostrarSiguienteMensaje);
botonAnterior.addEventListener('click', mostrarMensajeAnterior);

actualizarTexto();

if (localStorage.idioma === 'en') {
    document.title = "Tutorial";
    botonVolver.textContent = "Back to home";
    botonAnterior.textContent = "Previous";
    botonSiguiente.textContent = "Next";

    mensajes[0] = "Hi! I'm Professor <strong>Horns</strong> and today I'll be teaching you how to play <strong>Draftosaurus</strong>.<br>Get comfortable, grab a snack, and get ready to explore the wonderful world of <strong>dinosaurs</strong>.";
    mensajes[1] = "<strong>Game setup:</strong><br>Each game is divided into <strong>2 rounds</strong> of <strong>6 turns</strong> each. At the start of each round, players draw 6 random dinosaurs and keep them hidden.";
    mensajes[2] = "<strong>Round 1:</strong><br>The youngest player rolls the dice at the start of every turn.<br>Everyone chooses 1 dinosaur and places it in their park following the dice restriction.<br>Then they pass the remaining dinosaurs to the left and repeat the process until everyone has placed 6 dinos.";
    mensajes[3] = "<strong>Round 2:</strong><br>Begins when all players have 6 dinos in their park.<br>It’s played the same way as Round 1.<br><br><strong>End of the game:</strong><br>Players add up their points. The player with the most points wins.";
    mensajes[4] = "<strong>Enclosures:</strong><br>Your park has <strong>6 enclosures</strong>, each with different placement and scoring rules.<br>There’s also the <strong>river</strong>, which isn’t an enclosure but can hold dinosaurs.";
    mensajes[5] = "<strong>Forest of Similarity:</strong><br>Only accepts dinosaurs of <strong>the same species</strong>.<br>Filled from left to right with no gaps.";
    mensajes[6] = "<strong>Meadow of Difference:</strong><br>Only accepts dinosaurs of <strong>different species</strong>.<br>Also filled from left to right without gaps.";
    mensajes[7] = "<strong>Love Meadow:</strong><br>Any species allowed.<br><strong>5 points</strong> per <strong>pair</strong> of the same species.<br>Singles don’t score.";
    mensajes[8] = "<strong>Leafy Trio:</strong><br>Scores points only if it has <strong>exactly 3 dinosaurs</strong>.<br>Less or more: <strong>0 points</strong>.";
    mensajes[9] = "<strong>King of the Jungle:</strong><br>Only 1 dinosaur.<br><strong>7 points</strong> if you have more dinos of that species than any other player.<br>Ties still earn points.";
    mensajes[10] = "<strong>Lonely Island:</strong><br>Only 1 dinosaur.<br><strong>7 points</strong> if it’s the only one of its species in your park.<br>If there’s another of the same kind, it scores 0.";
    mensajes[11] = "<strong>The River:</strong><br>Not an enclosure.<br>Each dinosaur in the river is worth <strong>1 point</strong>, regardless of species.";
    mensajes[12] = "<strong>T-Rex:</strong><br>Each enclosure with at least one T-Rex gives <strong>1 extra point</strong>.<br>Multiple T-Rex in the same enclosure don’t stack.";
    mensajes[13] = "<strong>The Dice:</strong><br>Each turn, a player rolls the dice.<br>The rule on the dice applies to everyone.";
    mensajes[14] = "<strong>Dice Faces:</strong><br>• <strong>Forest:</strong> Place in a forest area.<br>• <strong>Plain:</strong> Place in a plains area.<br>• <strong>Restrooms:</strong> Only to the right of the river.<br>• <strong>Cafeteria:</strong> Only to the left of the river.<br>• <strong>Empty enclosure:</strong> Only in enclosures with no dinosaurs.<br>• <strong>Beware of the T-Rex!:</strong> Can’t be placed in an enclosure that already has a T-Rex.";
    mensajes[15] = "<strong>Winter Board:</strong><br>Besides the original park, there’s a special <strong>Winter Board</strong> with new enclosures that change your strategy.<br><br><strong>Ordered Forest:</strong> Can only hold two species, alternating left to right, no gaps or repeated species separated.";
    mensajes[16] = "<strong>Lovers’ Bridge:</strong><br>Two zones divided by the river. Gain <strong>6 points</strong> for each matching pair with one dino on each side.<br><br><strong>Observation Post:</strong> Holds one dino. Gain <strong>2 points</strong> per dino of the same species in the park of the player to your right.";
    mensajes[17] = "<strong>The Pyramid:</strong><br>Holds up to 6 dinos in 3 levels. No two of the same species can touch, not even diagonally. Each level grants a different point value.<br><br><strong>Quarantine Zone:</strong><br>Holds one dino. At the end of the game, before scoring, you may move it to the River or another valid enclosure.";

    actualizarTexto();
}
