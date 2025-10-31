const brontoInput = document.getElementById("brontoInput");
const estegoInput = document.getElementById("estegoInput");
const plesioInput = document.getElementById("plesioInput");
const pteraInput = document.getElementById("pteraInput");
const rexInput = document.getElementById("rexInput");
const trikeInput = document.getElementById("trikeInput");

const bosqueInvInput = document.getElementById("BosqueInv");
const puenteInput = document.getElementById("Puente");
const puestoInput = document.getElementById("Puesto");
const piramideInput = document.getElementById("Piramide");
const cuarentenaInput = document.getElementById("Cuarentena");
const trioInput = document.getElementById("Trio");
const reyInput = document.getElementById("Rey");
const islaInput = document.getElementById("Isla");
const bosqueInput = document.getElementById("Bosque");
const pradoInput = document.getElementById("Prado");
const amorInput = document.getElementById("Amor");
const rioInput = document.getElementById("Rio");

const botones = document.querySelectorAll(".botonEnviar");

botones.forEach(boton => {
    boton.addEventListener("click", function (e) {
        e.preventDefault();

        const fila = boton.closest("tr");
        const input = fila.querySelector("input");
        const nombre = fila.querySelector("td:nth-child(2)").textContent.trim();
        const puntos = input.value;

        fetch("../../negocio/actualizarParametro.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `nombre=${encodeURIComponent(nombre)}&puntos=${encodeURIComponent(puntos)}`
        })
            .then(res => res.text())
            .then(resp => {
                console.log(resp);
                window.location.reload();
            })
    });
});

const botonesRecintos = document.querySelectorAll(".botonEnviar2");

botonesRecintos.forEach(boton => {
    boton.addEventListener("click", function (e) {
        e.preventDefault();
        const fila = boton.closest("tr");
        const input = fila.querySelector("input");
        const puntos = input.value;
        const nombre = input.id;

        fetch("../../negocio/actualizarParametro.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `nombre=${encodeURIComponent(nombre)}&puntos=${encodeURIComponent(puntos)}`
        })
            .then(res => res.text())
            .then(resp => {
                console.log(resp);
                window.location.reload();
            });
    });
});

addEventListener("DOMContentLoaded", function () {

    fetch(`../../negocio/recuperarParametros.php`)
        .then(res => res.json())
        .then(data => {

            const elementos = {};
            data.forEach(item => {
                elementos[item.nombre] = item.puntos;
            });

            brontoInput.value = elementos["Bronto"];
            estegoInput.value = elementos["Estego"];
            plesioInput.value = elementos["Plesio"];
            pteraInput.value = elementos["Ptera"];
            rexInput.value = elementos["T-Rex"];
            trikeInput.value = elementos["Trike"];

            bosqueInput.value = elementos["Bosque"];
            pradoInput.value = elementos["Prado"];
            amorInput.value = elementos["Amor"];
            trioInput.value = elementos["Trio"];
            reyInput.value = elementos["Rey"];
            islaInput.value = elementos["Isla"];
            rioInput.value = elementos["Rio"];
            bosqueInvInput.value = elementos["BosqueInv"];
            puenteInput.value = elementos["PuenteIzq"];
            puestoInput.value = elementos["Puesto"];
            piramideInput.value = elementos["Piramide"];
            cuarentenaInput.value = elementos["Cuarentena"];

        })

    const idPartida = document.getElementById("idPartida");
    const idUsuario = document.getElementById("idUsuario");
    if (localStorage.idioma === "en") {
        idPartida.placeholder = "ID of the game to delete";
        idUsuario.placeholder = "ID or email of the user to delete";
        const traducciones = {
            tituloPagina: "Dashboard",
            volverInicio: "Go back to home",
            panelTitulo: "Administration Panel",
            eliminarPartidaTitulo: "Delete Game",
            labelIdPartida: "ID of the game to delete",
            botonEliminarPartida: "Delete Game",
            eliminarUsuarioTitulo: "Delete User",
            labelIdUsuario: "ID or email of the user to delete",
            botonEliminarUsuario: "Delete User",
            tituloDinos: "Modify Dinosaur Values",
            columnaImagen: "Image",
            columnaNombre: "Name",
            columnaValor: "Value",
            columnaBotones: "Buttons",
            btnBronto: "Send",
            btnEstego: "Send",
            btnPlesio: "Send",
            btnPtera: "Send",
            btnRex: "Send",
            btnTrike: "Send",
            tituloVerano: "Modify Summer Board Values",
            columnaNombreVerano: "Name",
            columnaValorVerano: "Value",
            columnaBotonesVerano: "Buttons",
            btnBosque: "Send",
            btnPrado: "Send",
            btnAmor: "Send",
            btnTrio: "Send",
            btnRey: "Send",
            btnIsla: "Send",
            btnRio: "Send",
            tituloInvierno: "Modify Winter Board Values",
            columnaNombreInvierno: "Name",
            columnaValorInvierno: "Value",
            columnaBotonesInvierno: "Buttons",
            btnBosqueInv: "Send",
            btnPuente: "Send",
            btnPuesto: "Send",
            btnPiramide: "Send",
            btnCuarentena: "Send",
            bosqueTexto: "The Forest of Likeness",
            pradoTexto: "The Meadow of Difference",
            praderaTexto: "The Meadow of Love",
            trioTexto: "The Leafy Trio",
            reyTexto: "The King of the Jungle",
            islaTexto: "The Lonely Island",
            rioTexto: "River",
            bosqueInvTexto: "The Ordered Forest",
            puenteTexto: "The Lovers' Bridge",
            puestoTexto: "The Observation Post",
            piramideTexto: "The Pyramid",
            zonaTexto: "Quarantine Zone"
        };

        for (const id in traducciones) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = traducciones[id];
            }
        }
    }

});