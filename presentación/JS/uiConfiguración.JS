const formEditar = document.getElementById('formEditar');
const botonEditar = document.getElementById('botonEditar');
const botonCerrar = document.getElementById('botonCerrar');
const inputTema = document.getElementById('inputTema');
const inputDestino = document.getElementById('inputDestino');
const botonBorrar = document.getElementById('botonBorrar');

botonBorrar.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("¿Está seguro de que desea borrar su perfil? Esta acción no se puede deshacer.")) {
    let idUsuario = localStorage.idUsuario;    
    localStorage.clear();
    fetch(`../../negocio/borrarUsuario.php?idUsuario=${encodeURIComponent(idUsuario)}`)
        .then(res => res.text())
        .then(data => {
            window.location.reload();
        });
    }
});

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
    if (idioma == "en") {
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

const botonesForm = document.querySelectorAll('#divCerrarSesion button');

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

    let idUsuario = localStorage.idUsuario;
    fetch(`../../negocio/recuperarUsuario.php?idUsuario=${encodeURIComponent(idUsuario)}`)
        .then(res => res.json())
        .then(data => {
            usuario = data.nombre;
            email = data.email;
            edad = data.edad;
            contraseña = data.contraseña;
            preferenciasTema = data.tema;
            preferenciasIdioma = data.idioma;

            localStorage.setItem("tema", preferenciasTema);
            localStorage.setItem("idioma", preferenciasIdioma);

            if (preferenciasTema === "oscuro") {
                checkbox.checked = true;
                aplicarTemaOscuro();
            }

            if (preferenciasIdioma === "en") {
                aplicarIdiomaIngles();
            }

            nombreUsuarioContainer.innerText = usuario;
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

            botonSalir.addEventListener('click', function () {
                    formContainer.style.display = "none";
                    location.reload();
                });

            formEditar.action = "../../negocio/editarUsuario.php";

            inputNom.value = usuario;
            inputMail.value = email;
            inputEdad.value = edad;
            document.getElementById("idUsuario").value = idUsuario;
        })
} else {
    botonEditar.innerText = "Volver al inicio";
    botonEditar.addEventListener('click', function () {
        window.location.href = '../../index.html';
    });
}

function aplicarTemaOscuro() {
    document.querySelectorAll("button").forEach(btn => {
        btn.style.backgroundColor = "black";
        btn.style.color = "white";
        btn.style.border = "none";
    });
}

const botonVolver = document.getElementById("botonVolver");
const textoOsc = document.getElementById("textoOsc");
const botonConfirmar = document.getElementById("botonConfirmar");
const labelUser = document.getElementById("labelUser");
const labelCorreo = document.getElementById("labelCorreo");
const labelEdad = document.getElementById("labelEdad");
const labelPsw = document.getElementById("labelPsw");
const labelConfirmarPsw = document.getElementById("labelConfirmarPsw");
const titulo = document.getElementById("titulo");
function aplicarIdiomaIngles() {
    botonEditar.innerHTML = "Edit profile";
    labelUser.innerHTML = "Username";
    labelCorreo.innerHTML = "Email";
    labelEdad.innerHTML = "Age";
    labelPsw.innerHTML = "Password";
    labelConfirmarPsw.innerHTML = "Confirm Password";
    botonSalir.innerHTML = "Exit";
    botonConfirmar.innerHTML = "Confirm";
    inputNom.placeholder = "Username";
    inputMail.placeholder = "Email";
    inputEdad.placeholder = "Age";
    inputContraseña.placeholder = "Password";
    inputConfirmarContraseña.placeholder = "Confirm Password";
    botonCerrar.innerHTML = "Close session";
    titulo.innerHTML = "Settings";
    textoOsc.innerHTML = "Dark Mode";
    botonVolver.innerHTML = "Back to home";
    esButton.innerHTML = "Spanish";
    enButton.innerHTML = "English";
}