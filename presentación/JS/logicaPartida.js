function registrarJugada(dino, recinto) {
    const recintoId = recinto.classList[2];
    
    const mapaRecintos = {
        "El-Bosque-Ordenado": "BosqueInv",
        "El-puente-de-los-enamorados": "Puente",
        "El-puesto-de-observación": "Puesto",
        "La-pirámide": "Piramide",
        "Zona-de-cuarentena": "Cuarentena",
        "El-bosque-de-la-semejanza": "Bosque",
        "El-trío-frondoso": "Trio",
        "La-pradera-del-amor": "Amor",
        "El-rey-de-la-selva": "Rey",
        "El-prado-de-la-diferencia": "Prado",
        "La-isla-solitaria": "Isla"
    };
    
    let recintoNombre = mapaRecintos[recintoId] || "Rio";
    
    const inputJugador = document.getElementById("jugadorActualInput");
    const inputDino = document.getElementById("dinoSeleccionadoInput");
    const inputRecinto = document.getElementById("recintoSeleccionadoInput");
    const inputIdPartida = document.getElementById("idPartidaInput2");
    const formRegistrarJugada = document.getElementById("formRegistrarJugada");

    inputDino.value = dino;
    inputJugador.value = localStorage.getItem("idJugadorActual");
    inputRecinto.value = recintoNombre;
    inputIdPartida.value = localStorage.getItem("idPartida");
    formRegistrarJugada.submit();

}