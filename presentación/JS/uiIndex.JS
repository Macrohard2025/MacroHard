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
const botonSalirLogin = document.getElementById("botonSalirLogin");
const botonCerrar = document.getElementById("botonCerrar");

botonSalir.addEventListener("click", function (e) {
    e.preventDefault();
});

botonSalirLogin.addEventListener("click", function (e) {
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

                localStorage.setItem("nombre", usuario);
                localStorage.setItem("tema", preferenciasTema);
                localStorage.setItem("idioma", preferenciasIdioma);

                if (preferenciasTema === "oscuro") {
                    aplicarTemaOscuro();
                }

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

                botonConfirmar.innerHTML = "Confirmar";

                botonLogin.style.backgroundColor = "white";
                botonLogin.style.color = "#03920f";
                botonLogin.style.border = "1px solid #03920f";
                botonLogin.innerHTML = usuario;
                botonLogin.disabled = true;
                if (preferenciasIdioma === "en") {
                    aplicarIdiomaIngles();
                }
            })
    }

});

function aplicarTemaOscuro() {
    document.querySelectorAll("button").forEach(btn => {
        btn.style.backgroundColor = "black";
        btn.style.color = "white";
        btn.style.border = "none";
    });
}

const statsTexto = document.getElementById("statsTexto");
const salaTexto = document.getElementById("salaTexto");
const configTexto = document.getElementById("configTexto");
const creditosTexto = document.getElementById("creditosTexto");
const botonConfirmar = document.getElementById("botonConfirmar");
const labelUser = document.getElementById("labelUser");
const labelCorreo = document.getElementById("labelCorreo");
const labelEdad = document.getElementById("labelEdad");
const labelPsw = document.getElementById("labelPsw");
const labelConfirmarPsw = document.getElementById("labelConfirmarPsw");
function aplicarIdiomaIngles() {
    botonRegistro.innerHTML = "Edit profile";
    statsTexto.innerHTML = "Stats";
    salaTexto.innerHTML = "PlayRoom";
    configTexto.innerHTML = "Settings";
    creditosTexto.innerHTML = "Credits";
    labelUser.innerHTML = "Username";
    labelCorreo.innerHTML = "Email";
    labelEdad.innerHTML = "Age";
    labelPsw.innerHTML = "Password";
    labelConfirmarPsw.innerHTML = "Confirm Password";
    botonSalir.innerHTML = "Exit";
    botonConfirmar.innerHTML = "Confirm";
    inputNombre.placeholder = "Username";
    inputEmail.placeholder = "Email";
    inputEdad.placeholder = "Age";
    inputContraseña.placeholder = "Password";
    inputConfirmarContraseña.placeholder = "Confirm Password";
    botonCerrar.innerHTML = "Close session";

}

botonCerrar.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});