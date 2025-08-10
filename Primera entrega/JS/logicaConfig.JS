const botonEditar = document.getElementById('botonEditar');
botonEditar.addEventListener('click', function () {
    alert('Funcionalidad de edición de perfil aún no implementada.');
});

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