const botonEditar = document.getElementById('botonEditar');

const checkbox = document.getElementById('darkMode');
checkbox.addEventListener("change", function () {
    alert('Modo oscuro aún no implementado.');
    checkbox.checked = false;
});

const idiomaButtons = document.querySelectorAll('.idioma button');
idiomaButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        alert(`Funcionalidad de cambio de idioma aún no implementada. Solo se hará el cambio visual.`);
    });
});

const esButton = document.getElementById('es');
const enButton = document.getElementById('en');
enButton.addEventListener('click', function () {
    esButton.style.color = '#03920f';
    esButton.style.backgroundColor = 'white';
    enButton.style.color = 'white';
    enButton.style.backgroundColor = '#03920f';
});
esButton.addEventListener('click', function () {
    enButton.style.color = '#03920f';
    enButton.style.backgroundColor = 'white';
    esButton.style.color = 'white';
    esButton.style.backgroundColor = '#03920f';
});

const usuarioRegistrado = true;

const nombreUsuarioContainer = document.getElementById('nombre-usuario');
const mailUsuarioContainer = document.getElementById('mail-usuario');

const botonesForm = document.querySelectorAll('.botones-formulario button');

const inputNom = document.getElementById('inputNom');
const inputMail = document.getElementById('inputMail');
const inputEdad = document.getElementById('inputEdad');

if (usuarioRegistrado) {
    const nombreUsuario = "Juan Torres";
    const mailUsuario = "juancitogamer@gmail.com";
    const edadUsuario = new Date(2005, 7, 14);

    const formEditar = document.getElementById('formContainer');

    nombreUsuarioContainer.innerText = nombreUsuario;
    mailUsuarioContainer.innerText = mailUsuario;

    inputNom.value = nombreUsuario;
    inputMail.value = mailUsuario;
    inputEdad.value = edadUsuario.toISOString().split('T')[0];

    botonEditar.addEventListener('click', function () {
        formEditar.style.display = "flex";
    });

    botonesForm.forEach(function (boton) {
        boton.addEventListener('click', function () {
            formEditar.style.display = "none";
            location.reload();
        });
    });
} else {
    botonEditar.innerText = "Volver al inicio";
    botonEditar.addEventListener('click', function () {
        window.location.href = '../../index.html';
    });
}