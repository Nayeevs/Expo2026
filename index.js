// Manejo de la navegación activa del Menú Lateral
document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
});

// Respuestas a los botones de acción
function handleNavigation(profileType) {
    if (profileType === 'cliente') {
        alert("Redireccionando al área de Familias / Solicitar cuidado...");
    } else if (profileType === 'trabajador') {
        alert("Redireccionando al área de Empleo / Aplicar como cuidador...");
    } else if (profileType === 'servicios') {
        alert("Desplazando hacia la sección de servicios...");
    }
}