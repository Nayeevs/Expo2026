document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. HERRAMIENTAS DE ACCESIBILIDAD (ZOOM)
    // ==========================================
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");

    // Cargar preferencia previa de tamaño de texto o usar 100% por defecto
    let currentFontSize = parseInt(localStorage.getItem("connectcare_font_size")) || 100;

    const updateFontSize = (size) => {
        document.documentElement.style.fontSize = `${size}%`;
        localStorage.setItem("connectcare_font_size", size);
    };

    // Aplicar el tamaño guardado al iniciar la página
    updateFontSize(currentFontSize);

    // Incrementar tamaño del texto (Máximo 140%)
    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
            if (currentFontSize < 140) {
                currentFontSize += 10;
                updateFontSize(currentFontSize);
            }
        });
    }

    // Reducir tamaño del texto (Mínimo 90%)
    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
            if (currentFontSize > 90) {
                currentFontSize -= 10;
                updateFontSize(currentFontSize);
            }
        });
    }

    // Accesibilidad por teclado (Enter o Espacio)
    [btnZoomIn, btnZoomOut].forEach(button => {
        if (button) {
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    button.click();
                }
            });
        }
    });

    // ==========================================
    // 2. NAVEGACIÓN ACTIVA AUTOMÁTICA
    // ==========================================
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links li a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        const parentLi = link.parentElement;

        if (linkPage === currentPage) {
            parentLi.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            parentLi.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // ==========================================
    // 3. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('section, article, .trust-item, .stat-item, .hero-text, .hero-cta, .hero-stats, .final-cta-section');

    revealElements.forEach((element, index) => {
        if (element.closest('.accessibility-bar') || element.closest('.main-header')) {
            return;
        }

        element.classList.add('reveal-on-scroll');
        element.style.transitionDelay = `${Math.min(index * 90, 350)}ms`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((element) => {
        if (element.classList.contains('reveal-on-scroll')) {
            revealObserver.observe(element);
        }
    });

    // ==========================================
    // 4. TESTIMONIALS CAROUSEL
    // ==========================================
    const dots = document.querySelectorAll('.quote-dot');
    const quotes = document.querySelectorAll('.quote-item');
    let currentQuote = 0;

    if (dots.length > 0 && quotes.length > 0) {
        // Show first quote
        if (quotes[0]) quotes[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');

        // Add click listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showQuote(index);
            });
        });

        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        }, 5000);

        function showQuote(index) {
            quotes.forEach(quote => quote.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (quotes[index]) quotes[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentQuote = index;
        }
    }

    // ==========================================
    // 5. ANIMATED COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    if (counters.length > 0) {
        const animateCounters = () => {
            if (hasAnimated) return;

            // Check if any counter is visible in viewport
            let isVisible = false;
            counters.forEach(counter => {
                const rect = counter.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    isVisible = true;
                }
            });

            if (isVisible) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let current = 0;
                    const increment = target / 30; // Animate over ~30 frames

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + suffix;
                            counter.classList.add('animated');
                        }
                    };

                    updateCounter();
                });
            }
        };

        window.addEventListener('scroll', animateCounters);
        window.addEventListener('load', animateCounters);
        // Check on page load in case counters are already visible
        setTimeout(animateCounters, 100);
    }

    // ==========================================
    // 6. TESTIMONIALS PAGE - AVATAR SELECTION
    // ==========================================
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    if (avatarBtns.length > 0 && testimonialItems.length > 0) {
        avatarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const testimonialId = btn.getAttribute('data-testimonial');
                
                // Remove active class from all buttons and items
                avatarBtns.forEach(b => b.classList.remove('active'));
                testimonialItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked button and corresponding item
                btn.classList.add('active');
                document.querySelector(`.testimonial-item[data-id="${testimonialId}"]`).classList.add('active');
            });
        });
    }
});