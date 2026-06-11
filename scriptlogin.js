// Comportamiento del menú lateral activo
document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
});

// Captura del Formulario de Connect Care
function handleLogin(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('reg-name').value;
    const departamento = document.getElementById('reg-dept').value;
    const docNum = document.getElementById('reg-doc-num').value;
    
    alert(`¡Bienvenido a Connect Care!\n\nDatos procesados exitosamente:\nUsuario: ${nombre}\nDepartamento: ${departamento}\nDocumento: ${docNum}`);
}

// --- HERRAMIENTAS DE ACCESIBILIDAD ---

// Alternar Modo Oscuro
const btnDarkMode = document.getElementById('btn-darkmode');

if (localStorage.getItem('connectcare-theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

btnDarkMode.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('connectcare-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('connectcare-theme', 'dark');
    }
});

// Cambiar tamaño de la fuente
let currentFontSize = 16; 
const htmlElement = document.documentElement;

document.getElementById('btn-font-increase').addEventListener('click', () => {
    if (currentFontSize < 26) { 
        currentFontSize += 2;
        htmlElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
    }
});

document.getElementById('btn-font-decrease').addEventListener('click', () => {
    if (currentFontSize > 14) { 
        currentFontSize -= 2;
        htmlElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
    }
});