document.addEventListener('DOMContentLoaded', () => {

    const btnTogglePanel = document.getElementById('accessibility-toggle');
    const panel = document.getElementById('accessibility-panel');
    const btnClosePanel = document.getElementById('acc-close');

    if (btnTogglePanel && panel) {
        btnTogglePanel.addEventListener('click', () => {
            const isExpanded = btnTogglePanel.getAttribute('aria-expanded') === 'true';
            btnTogglePanel.setAttribute('aria-expanded', !isExpanded);
            panel.setAttribute('aria-hidden', isExpanded);
            panel.classList.toggle('open');
        });
    }

    if (btnClosePanel && panel) {
        btnClosePanel.addEventListener('click', () => {
            panel.classList.remove('open');
            if (btnTogglePanel) {
                btnTogglePanel.setAttribute('aria-expanded', 'false');
            }
            panel.setAttribute('aria-hidden', 'true');
        });
    }

    const carouselTrack = document.getElementById('services-carousel');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');

    if (carouselTrack && btnPrev && btnNext) {
        const cardWidth = 340; 

        btnNext.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    const btnDarkMode = document.getElementById('btn-dark-mode');
    const darkStatus = document.getElementById('dark-status');

    btnDarkMode?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        if (darkStatus) {
            darkStatus.textContent = isDark ? 'ON' : 'OFF';
            darkStatus.className = isDark ? 'acc-status active-blue' : 'acc-status';
        }
    });

    const btnContrast = document.getElementById('btn-high-contrast');
    const contrastStatus = document.getElementById('contrast-status');

    btnContrast?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isContrast = document.body.classList.contains('high-contrast');
        if (contrastStatus) {
            contrastStatus.textContent = isContrast ? 'ON' : 'OFF';
            contrastStatus.className = isContrast ? 'acc-status active-blue' : 'acc-status';
        }
    });

    const btnToggleFont = document.getElementById('btn-toggle-font');
    const fontIndicator = document.getElementById('font-size-indicator');
    const fontSizes = [16, 18, 20];
    let fontIndex = 0;

    btnToggleFont?.addEventListener('click', () => {
        fontIndex = (fontIndex + 1) % fontSizes.length;
        const newSize = fontSizes[fontIndex];
        document.documentElement.style.fontSize = `${newSize}px`;
        if (fontIndicator) {
            fontIndicator.textContent = `${newSize}px`;
        }
    });

    const btnScreenReader = document.getElementById('btn-screen-reader');
    const readerStatus = document.getElementById('reader-status');
    let screenReaderActive = false;

    btnScreenReader?.addEventListener('click', () => {
        screenReaderActive = !screenReaderActive;
        if (readerStatus) {
            readerStatus.textContent = screenReaderActive ? 'ON' : 'OFF';
            readerStatus.className = screenReaderActive ? 'acc-status active-blue' : 'acc-status';
        }

        if (screenReaderActive) {
            const isEs = document.documentElement.lang === 'es';
            const msg = isEs ? "Lector de pantalla activado." : "Screen reader activated.";
            const utterance = new SpeechSynthesisUtterance(msg);
            utterance.lang = isEs ? 'es-ES' : 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            window.speechSynthesis.cancel();
        }
    });

    document.addEventListener('mouseover', (e) => {
        if (!screenReaderActive) return;

        const target = e.target.closest('h1, h2, h3, p, a, button, img');
        
        if (target) {
            let textToRead = '';
            const currentLang = document.documentElement.lang || 'es';

            if (target.tagName === 'IMG') {
                textToRead = target.getAttribute(`data-${currentLang}`) || target.getAttribute('alt') || '';
            } else {
                textToRead = target.getAttribute(`data-${currentLang}`) || target.innerText;
            }

            if (textToRead.trim() !== '') {
                window.speechSynthesis.cancel(); 
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = currentLang === 'es' ? 'es-ES' : 'en-US';
                window.speechSynthesis.speak(utterance);
            }
        }
    });

    const btnLang = document.getElementById('btn-language');
    const langIndicator = document.getElementById('lang-indicator');

    btnLang?.addEventListener('click', () => {
        const isES = (document.documentElement.lang || 'es') === 'es';
        const targetLang = isES ? 'en' : 'es';
        
        document.documentElement.lang = targetLang;
        if (langIndicator) {
            langIndicator.textContent = targetLang.toUpperCase();
        }

        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            if (el.tagName === 'IMG') {
                const altText = el.getAttribute(`data-${targetLang}`);
                if (altText) {
                    el.setAttribute('alt', altText);
                }
            } else {
                const text = el.getAttribute(`data-${targetLang}`);
                if (text) {
                    el.textContent = text;
                }
            }
        });
    });

    const btnVoice = document.getElementById('btn-voice-commands');
    const voiceStatus = document.getElementById('voice-status');

    btnVoice?.addEventListener('click', () => {
        const isActive = voiceStatus.textContent === 'ON';
        voiceStatus.textContent = isActive ? 'OFF' : 'ON';
        voiceStatus.className = !isActive ? 'acc-status active-blue' : 'acc-status';
    });

    const btnHead = document.getElementById('btn-head-control');
    const headStatus = document.getElementById('head-status');
    const headVideo = document.getElementById('head-video');

    let cameraInstance = null;
    let faceMeshInstance = null;
    let isHeadControlActive = false;

    if (window.FaceMesh) {
        faceMeshInstance = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        faceMeshInstance.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        faceMeshInstance.onResults((results) => {
            if (!isHeadControlActive || !results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

            const landmarks = results.multiFaceLandmarks[0];

            const nose = landmarks[1];
            const topHead = landmarks[10];
            const chin = landmarks[152];

            const faceCenterY = (topHead.y + chin.y) / 2;

            const scrollSpeed = 18;
            const threshold = 0.035; 

            if (nose.y < faceCenterY - threshold) {
                window.scrollBy({ top: -scrollSpeed, behavior: 'smooth' });
            } else if (nose.y > faceCenterY + threshold) {
                window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
            }
        });
    }

    btnHead?.addEventListener('click', async () => {
        isHeadControlActive = !isHeadControlActive;

        if (isHeadControlActive) {
            try {
                if (headVideo) headVideo.style.display = 'block';

                if (window.Camera && headVideo) {
                    cameraInstance = new Camera(headVideo, {
                        onFrame: async () => {
                            if (isHeadControlActive && faceMeshInstance) {
                                await faceMeshInstance.send({ image: headVideo });
                            }
                        },
                        width: 640,
                        height: 480
                    });

                    await cameraInstance.start();
                    if (headStatus) {
                        headStatus.textContent = 'ON';
                        headStatus.className = 'acc-status active-blue';
                    }
                }
            } catch (err) {
                console.error("Error al iniciar la cámara:", err);
                isHeadControlActive = false;
                if (headVideo) headVideo.style.display = 'none';
                if (headStatus) {
                    headStatus.textContent = 'OFF';
                    headStatus.className = 'acc-status';
                }
            }
        } else {
            if (cameraInstance) {
                cameraInstance.stop();
            }
            if (headVideo) headVideo.style.display = 'none';

            if (headStatus) {
                headStatus.textContent = 'OFF';
                headStatus.className = 'acc-status';
            }
        }
    });
 });

const track = document.getElementById('testimonials-track');
const btnPrevTestimonial = document.getElementById('testimonial-prev');
const btnNextTestimonial = document.getElementById('testimonial-next');

if (track && btnPrevTestimonial && btnNextTestimonial) {
    const scrollAmount = 340;

    btnNextTestimonial.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    btnPrevTestimonial.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    let autoScroll = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoScroll));
}¡