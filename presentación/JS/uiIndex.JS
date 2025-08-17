const formContainer = document.getElementById("formContainer");
const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");
const botonLogin = document.querySelector(".boton-index-login");
const botonRegistro = document.querySelector(".boton-index-registro");

const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("correo");
const inputEdad = document.getElementById("edad");
const inputContraseña = document.getElementById("contraseña");
const inputConfirmarContraseña = document.getElementById("confirmarContraseña");
const inputPreferenciasTema = document.getElementById("preferenciasTema");
const inputPreferenciasIdioma = document.getElementById("preferenciasIdioma");

const botonSalir = document.getElementById("botonSalir");
const botonCerrar = document.getElementById("botonCerrar");

botonSalir.addEventListener("click", function (e) {
    e.preventDefault();
});

botonLogin.addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.style.display = "flex";
    formLogin.style.display = "block";
});

botonRegistro.addEventListener("click", function (e) {
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

let usuario = "";
let email = "";
let edad = null;
let contraseña = "";
let preferenciasTema = "";
let preferenciasIdioma = "";

addEventListener("DOMContentLoaded", function () {


    if (localStorage.registroUsuario) {
        const divCerrarSesion = document.getElementById("divCerrarSesion");
        divCerrarSesion.style.display = "flex";

        let nombre = localStorage.nombre;
        fetch(`negocio/recuperarUsuario.php?nombre=${encodeURIComponent(nombre)}`)
            .then(res => res.json())
            .then(data => {
                usuario = data.nombre;
                email = data.email;
                edad = data.edad;
                contraseña = data.contraseña;
                preferenciasTema = data.tema;
                preferenciasIdioma = data.idioma;

                formRegistro.action = "negocio/editarUsuario.php";

                inputNombre.name = "usuarioEditar";
                inputEmail.name = "correoEditar";
                inputEdad.name = "edadEditar";
                inputContraseña.name = "contraseñaEditar";
                inputConfirmarContraseña.name = "confirmarContraseñaEditar";
                inputPreferenciasTema.name = "temaUsuario";
                inputPreferenciasIdioma.name = "idiomaUsuario";

                botonRegistro.innerHTML = "Editar perfil";
                inputNombre.value = usuario;
                inputEmail.value = email;
                inputEdad.value = edad;
                inputContraseña.value = contraseña;
                inputConfirmarContraseña.value = contraseña;

                botonLogin.style.backgroundColor = "white";
                botonLogin.style.color = "#03920f";
                botonLogin.style.border = "1px solid #03920f";
                botonLogin.innerHTML = usuario;
                botonLogin.disabled = true;
            })
    }

});

botonCerrar.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});