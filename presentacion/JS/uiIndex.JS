document.addEventListener("DOMContentLoaded", function () {

    fetch("datos/verificarInstalacion.php")
        .then(res => res.json())
        .then(data => {
            if (!data.instalado) {
                window.location.href = "presentacion/HTML/installer.html";
            }
        })
        .catch(err => {
            console.error("Error verificando instalacion:", err);
        });
});

const formContainer = document.getElementById("formContainer");
const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("formRegistro");
const botonLogin = document.querySelector(".boton-index-login");
const botonRegistro = document.querySelector(".boton-index-registro");
const botonSalaEntrar = document.getElementById("botonSalaEntrar");

const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("correo");
const inputEdad = document.getElementById("edad");
const inputcontrasenia = document.getElementById("contrasenia");
const inputConfirmarcontrasenia = document.getElementById("confirmarcontrasenia");
const inputPreferenciasTema = document.getElementById("preferenciasTema");
const inputPreferenciasIdioma = document.getElementById("preferenciasIdioma");

const botonSalir = document.getElementById("botonSalir");
const botonSalirLogin = document.getElementById("botonSalirLogin");
const botonCerrar = document.getElementById("botonCerrar");

const botonDashboard = document.getElementById("dashboard");

botonSalaEntrar.addEventListener("click", function (e) {
    e.preventDefault();
    if (localStorage.registroUsuario) {
        window.location.href = "presentacion/HTML/Sala/menuSala.html";
    } else {
        alert("Debes iniciar sesión o registrarte para acceder a la sala.");
    }
});

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
let contrasenia = "";
let preferenciasTema = "";
let preferenciasIdioma = "";

addEventListener("DOMContentLoaded", function () {

    if (localStorage.idUsuario == 1) {
        botonDashboard.style.display = "flex";
    }

    if (localStorage.registroUsuario) {
        const divCerrarSesion = document.getElementById("divCerrarSesion");
        divCerrarSesion.style.display = "flex";

        let idUsuario = localStorage.idUsuario;
        fetch(`negocio/recuperarUsuario.php?idUsuario=${encodeURIComponent(idUsuario)}`)
            .then(res => res.json())
            .then(data => {
                usuario = data.nombre;
                email = data.email;
                edad = data.edad;
                preferenciasTema = data.tema;
                preferenciasIdioma = data.idioma;

                localStorage.setItem("tema", preferenciasTema);
                localStorage.setItem("idioma", preferenciasIdioma);

                if (preferenciasTema === "oscuro") {
                    aplicarTemaOscuro();
                }

                formRegistro.action = "negocio/editarUsuario.php";

                inputNombre.name = "usuarioEditar";
                inputEmail.name = "correoEditar";
                inputEdad.name = "edadEditar";
                inputcontrasenia.name = "contraseniaEditar";
                inputConfirmarcontrasenia.name = "confirmarcontraseniaEditar";
                inputPreferenciasTema.name = "temaUsuario";
                inputPreferenciasIdioma.name = "idiomaUsuario";
                inputPreferenciasIdioma.value = preferenciasIdioma;
                inputPreferenciasTema.value = preferenciasTema;

                botonRegistro.innerHTML = "Editar perfil";
                inputNombre.value = usuario;
                inputEmail.value = email;
                inputEdad.value = edad;

                labelPsw.innerHTML = "Nueva contraseña";
                labelConfirmarPsw.innerHTML = "Confirmar nueva contraseña";
                inputcontrasenia.placeholder = "Nueva contraseña";
                inputConfirmarcontrasenia.placeholder = "Confirmar nueva contraseña";

                document.getElementById("idUsuario").value = idUsuario;

                inputcontrasenia.required = false;
                inputConfirmarcontrasenia.required = false;

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
    
    const logoMacrohard = document.getElementById("logo-macrohard");
    
    function aplicarTemaOscuro() {
        document.body.style.backgroundImage = "url('recursos/img/fondoInicio2.png')";
        logoMacrohard.src = "recursos/img/LogoMH.png";
        botonLogin.style.setProperty("--bs-btn-disabled-opacity", "1");
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
    labelEdad.innerHTML = "Birthdate";
    labelPsw.innerHTML = "Password";
    labelConfirmarPsw.innerHTML = "Confirm Password";
    botonSalir.innerHTML = "Exit";
    botonConfirmar.innerHTML = "Confirm";
    inputNombre.placeholder = "Username";
    inputEmail.placeholder = "Email";
    inputEdad.placeholder = "Birthdate";
    inputcontrasenia.placeholder = "Password";
    inputConfirmarcontrasenia.placeholder = "Confirm Password";
    botonCerrar.innerHTML = "Close session";

}

botonCerrar.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});