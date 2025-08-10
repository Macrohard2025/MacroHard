const formContainer = document.getElementById("formContainer");
const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");

document.querySelector(".boton-index-login").addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.style.display = "flex";
    formLogin.style.display = "block";
});

document.querySelector(".boton-index-registro").addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.style.display = "flex";
    formRegistro.style.display = "block";
});

document.querySelectorAll(".botonEntrar").forEach(function (boton) {
    boton.addEventListener("click", function () {
        formContainer.style.display = "none";
        formRegistro.style.display = "none";
        formLogin.style.display = "none";
    });
});

document.querySelectorAll(".botonSalir").forEach(function (boton) {
    boton.addEventListener("click", function () {
        formContainer.style.display = "none";
        formRegistro.style.display = "none";
        formLogin.style.display = "none";
    });
});