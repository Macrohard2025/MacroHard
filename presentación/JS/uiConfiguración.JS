const formEditar = document.getElementById('formEditar');
const botonEditar = document.getElementById('botonEditar');
const botonCerrar = document.getElementById('botonCerrar');
const inputTema = document.getElementById('inputTema');
const inputDestino = document.getElementById('inputDestino');

const checkbox = document.getElementById('darkMode');
checkbox.addEventListener("change", function () {
    if (localStorage.registroUsuario) {
        if (checkbox.checked) {
            localStorage.setItem("tema", "oscuro");
        } else {
            localStorage.setItem("tema", "claro");
        }

        inputTema.value = localStorage.getItem("tema");
        inputDestino.value = "config";

        formEditar.submit();
    } else {
        alert("Debe iniciar sesión para cambiar el tema.");
        checkbox.checked = !checkbox.checked;
    }
});

const botonSalir = document.getElementById("botonSalir");
botonSalir.addEventListener("click", function (e) {
    e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
    const tema = localStorage.getItem("tema");
    if (tema === "oscuro") {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }

    const idioma = localStorage.getItem("idioma");
    if (idioma === "en") {
        enButton.style.color = 'white';
        enButton.style.backgroundColor = '#03920f';
        esButton.style.color = '#03920f';
        esButton.style.backgroundColor = 'white';
    } else {
        esButton.style.color = 'white';
        esButton.style.backgroundColor = '#03920f';
        enButton.style.color = '#03920f';
        enButton.style.backgroundColor = 'white';
    }
});

const esButton = document.getElementById('es');
const enButton = document.getElementById('en');
const inputIdioma = document.getElementById('inputIdioma');
enButton.addEventListener('click', function () {
    if (localStorage.registroUsuario) {
        esButton.style.color = '#03920f';
        esButton.style.backgroundColor = 'white';
        enButton.style.color = 'white';
        enButton.style.backgroundColor = '#03920f';

        localStorage.setItem("idioma", "en");
        inputIdioma.value = "en";
        inputDestino.value = "config";
        formEditar.submit();
    } else {
        alert("Debe iniciar sesión para cambiar el idioma.");
    }
});
esButton.addEventListener('click', function () {
    if (localStorage.registroUsuario) {
        enButton.style.color = '#03920f';
        enButton.style.backgroundColor = 'white';
        esButton.style.color = 'white';
        esButton.style.backgroundColor = '#03920f';

        localStorage.setItem("idioma", "es");
        inputIdioma.value = "es";
        inputDestino.value = "config";
        formEditar.submit();
    } else {
        alert("Debe iniciar sesión para cambiar el idioma.");
    }
});

const nombreUsuarioContainer = document.getElementById('nombre-usuario');
const mailUsuarioContainer = document.getElementById('mail-usuario');

const botonesForm = document.querySelectorAll('.botones-formulario button');

const inputNom = document.getElementById('inputNom');
const inputMail = document.getElementById('inputMail');
const inputEdad = document.getElementById('inputEdad');
const inputContraseña = document.getElementById('inputContraseña');
const inputConfirmarContraseña = document.getElementById('inputConfirmarContraseña');

const formContainer = document.getElementById('formContainer');

botonCerrar.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload();
});

if (localStorage.registroUsuario) {
    const divCerrarSesion = document.getElementById("divCerrarSesion");
    divCerrarSesion.style.display = "flex";

    let nombre = localStorage.nombre;
    fetch(`../../negocio/recuperarUsuario.php?nombre=${encodeURIComponent(nombre)}`)
        .then(res => res.json())
        .then(data => {
            usuario = data.nombre;
            email = data.email;
            edad = data.edad;
            contraseña = data.contraseña;
            preferenciasTema = data.tema;
            preferenciasIdioma = data.idioma;

            nombreUsuarioContainer.innerText = nombre;
            mailUsuarioContainer.innerText = email;

            botonEditar.addEventListener('click', function () {
                formContainer.style.display = "flex";
            });

            botonesForm.forEach(function (boton) {
                boton.addEventListener('click', function () {
                    formContainer.style.display = "none";
                    location.reload();
                });
            });

            formEditar.action = "../../negocio/editarUsuario.php";

            inputNom.value = usuario;
            inputMail.value = email;
            inputEdad.value = edad;
            inputContraseña.value = contraseña;
            inputConfirmarContraseña.value = contraseña;
        })
} else {
    botonEditar.innerText = "Volver al inicio";
    botonEditar.addEventListener('click', function () {
        window.location.href = '../../index.html';
    });
}