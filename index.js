// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Selección de botones de accesibilidad
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");

    // Tamaño de fuente inicial basado en porcentaje (100% = 16px por defecto)
    let currentFontSize = 100;

    // Función para actualizar el tamaño de fuente en el elemento raíz (html)
    const updateFontSize = (size) => {
        document.documentElement.style.fontSize = `${size}%`;
    };

    // Evento para Aumentar Texto (Máximo 140% para no romper el diseño)
    btnZoomIn.addEventListener("click", () => {
        if (currentFontSize < 140) {
            currentFontSize += 10;
            updateFontSize(currentFontSize);
        }
    });

    // Evento para Disminuir Texto (Mínimo 90%)
    btnZoomOut.addEventListener("click", () => {
        if (currentFontSize > 90) {
            currentFontSize -= 10;
            updateFontSize(currentFontSize);
        }
    });

    // Accesibilidad extra: Permitir activar botones con la tecla Enter o Espacio
    const accessibilityButtons = [btnZoomIn, btnZoomOut];
    accessibilityButtons.forEach(button => {
        button.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                button.click();
            }
        });
    });
});