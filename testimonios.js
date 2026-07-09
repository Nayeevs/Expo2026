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

    // ==========================================
    // 2. DYNAMIC INTERACTIVE TESTIMONIAL SYSTEM
    // ==========================================
    const listaTestimonios = [
        {
            nombre: "Maria Gonzalez",
            texto: "\"The care support my mother received exceeded all family expectations. Finding certified professionals with real empathy brought back our peace of mind instantly.\""
        },
        {
            nombre: "Carlos Rodriguez",
            texto: "\"Excellent monitoring and professional medication reminder routines. The staff remains highly punctual, kind, and completely respectful toward my grandfather.\""
        },
        {
            nombre: "Laura Perez",
            texto: "\"Thanks to ConnectCare, our grandmother safely preserves her home independence under dependable supervision. The customization profile plan process was fast.\""
        },
        {
            nombre: "Ana Martinez",
            texto: "\"Their reliable overnight care has been an exceptional blessing for us. Knowing a trained professional is guarding dad allows our family to rest peacefully.\""
        },
        {
            nombre: "Jose Lopez",
            texto: "\"Medical appointments and transportation routines are no longer an issue. Their logistics are completely safe, comfortable, and highly coordinated.\""
        }
    ];

    const pasosLinea = document.querySelectorAll('.path-step');
    const tarjetaDestino = document.getElementById('testimonial-card-target');
    const barraProgreso = document.getElementById('progress-line');
    
    let activeIndex = 0;
    let autoPlayTimer = null;

    function cambiarTestimonio(nuevoIndex) {
        if (nuevoIndex === activeIndex && tarjetaDestino.classList.contains('showing')) return;

        // A) Outbound animation trigger
        tarjetaDestino.classList.remove('showing');
        tarjetaDestino.classList.add('fade-out');

        // B) Update active states on profile buttons
        pasosLinea.forEach((paso, idx) => {
            if (idx === parseInt(nuevoIndex)) {
                paso.classList.add('active');
            } else {
                paso.classList.remove('active');
            }
        });

        // C) Update blue progress bar width proportionally
        const porcentajeProgreso = (nuevoIndex / (pasosLinea.length - 1)) * 100;
        if(barraProgreso) {
            barraProgreso.style.width = `${porcentajeProgreso}%`;
        }

        // D) Wait for card slide-out animation to swap content smoothly
        setTimeout(() => {
            const datos = listaTestimonios[nuevoIndex];
            tarjetaDestino.innerHTML = `
                <p>${datos.texto}</p>
                <h4>— ${datos.nombre}</h4>
            `;

            tarjetaDestino.classList.remove('fade-out');
            tarjetaDestino.classList.add('showing');
            
            activeIndex = parseInt(nuevoIndex);
        }, 300);
    }

    function iniciarAutoplay() {
        autoPlayTimer = setInterval(() => {
            let siguienteIndex = (activeIndex + 1) % listaTestimonios.length;
            cambiarTestimonio(siguienteIndex);
        }, 5000);
    }

    function detenerAutoplay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    // Initialize default states
    cambiarTestimonio(0);
    iniciarAutoplay();

    pasosLinea.forEach(paso => {
        paso.addEventListener('click', () => {
            detenerAutoplay(); // Stop auto-rotation once user interacts
            const indexSeleccionado = paso.getAttribute('data-index');
            cambiarTestimonio(indexSeleccionado);
        });
    });

    // ==========================================
    // 3. NEW: INTERACTIVE FAQ ACCORDION LOGIC
    // ==========================================
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            const isOpen = currentItem.classList.contains('open');

            // Close all other items to look modern and orderly
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('open');
            });

            // Toggle current item state
            if (!isOpen) {
                currentItem.classList.add('open');
            }
        });
    });
});