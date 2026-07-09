document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. ACCESSIBILITY TOOLS CONTROL (ZOOM)
    // ==========================================
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    let currentSize = 16; 

    btnZoomIn.addEventListener('click', () => {
        if (currentSize < 22) { 
            currentSize += 2;
            document.documentElement.style.fontSize = currentSize + 'px';
        }
    });

    btnZoomOut.addEventListener('click', () => {
        if (currentSize > 12) { 
            currentSize -= 2;
            document.documentElement.style.fontSize = currentSize + 'px';
        }
    });
});