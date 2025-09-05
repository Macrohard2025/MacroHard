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
            puenteInput.value = elementos["Puente"];
            puestoInput.value = elementos["Puesto"];
            piramideInput.value = elementos["Piramide"];
            cuarentenaInput.value = elementos["Cuarentena"];

        })
});