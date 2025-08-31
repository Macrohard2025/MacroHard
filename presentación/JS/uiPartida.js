const formCancelarPartida = document.getElementById('formCancelarPartida');
const botonVolver = document.getElementById('boton-volver');
const idPartidaInput = document.getElementById('idPartidaInput');
const dado = document.getElementById('dado');
const tableroElemento = document.getElementById('tablero');
const turnoJugador = document.getElementById('turnoJugador');
const nombreJugadorElemento = document.getElementById('nombreJugador');

botonVolver.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cancelar la partida?')) {
        const idPartida = localStorage.getItem('idPartida');
        idPartidaInput.value = idPartida;
        formCancelarPartida.submit();
    }
});


addEventListener("DOMContentLoaded", () => {
    fetch(`../../../negocio/recuperarPartida.php?idPartida=${encodeURIComponent(localStorage.getItem('idPartida'))}`)
        .then(res => res.json())
        .then(data => {
            let fecha = data.fecha;
            let modoJuego = data.modoJuego;
            let tablero = data.tablero;
            let numJugadores = data.numJugadores;
            let jugadores = data.jugadores;

            if (tablero === 'invierno') {
                tableroElemento.style.backgroundImage = "url('../../../recursos/img/tableroInvierno.png')";
                document.body.style.backgroundColor = "#9bceffff";
            }

            if (modoJuego === 'Solo') {
                turnoJugador.style.display = 'none';
            } else if (modoJuego === 'Control') {
                const nombresString = localStorage.getItem('nombresUsuarios');
                const nombresArray = JSON.parse(nombresString);

                const colDerecha = document.querySelector('.col-derecha');
                colDerecha.innerHTML = '';

                colDerecha.style.display = 'grid';
                colDerecha.style.gridTemplateColumns = 'repeat(2, 1fr)'; 
                colDerecha.style.gridAutoRows = 'auto';
                colDerecha.style.gap = '10px'; 
                colDerecha.style.justifyItems = 'center';

                nombreJugadorElemento.textContent = nombresArray[0];

                nombresArray.forEach((nombre, index) => {
                    const btn = document.createElement('button');
                    btn.classList.add('btn', 'btn-success', 'boton'); 
                    btn.textContent = nombre;

                    btn.addEventListener('click', () => {
                        nombreJugadorElemento.textContent = nombre;
                    });

                    colDerecha.appendChild(btn);
                });
            } else {
                nombreJugadorElemento.textContent = jugadores[0];
            }

            let dadoTirar = true;
            if (modoJuego === 'Solo' || modoJuego === 'Multi') {
                dado.addEventListener('click', () => {
                    if (dadoTirar) {
                        const lado = Math.floor(Math.random() * 6) + 1;
                        dado.src = `../../../recursos/img/dado/lado${lado}.png`;
                        dadoTirar = false;
                    }
                });
            }

        })
});