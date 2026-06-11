const testimonials = [

    {
        name: "María González",
        stars: "★★★★★",
        text: "Gracias a su equipo, mi madre recibe atención profesional, cercana y humana. Saber que está acompañada por personas comprometidas nos brinda una tranquilidad invaluable."
    },

    {
        name: "Carlos Rodríguez",
        stars: "★★★★★",
        text: "El personal siempre estuvo disponible cuando más lo necesitábamos. Nos sentimos respaldados en todo momento."
    },

    {
        name: "Laura Pérez",
        stars: "★★★★★",
        text: "Gran tranquilidad para nuestra familia. La calidad humana y profesional del equipo es excepcional."
    },

    {
        name: "Ana Martínez",
        stars: "★★★★★",
        text: "La atención recibida superó nuestras expectativas. Siempre atentos y dispuestos a ayudar."
    },

    {
        name: "José López",
        stars: "★★★★★",
        text: "Un acompañamiento constante que marcó una diferencia enorme en la calidad de vida de nuestro familiar."
    }

];

const steps = document.querySelectorAll(".path-step");
const card = document.querySelector(".testimonial-card");

let currentIndex = 0;
let autoSlider;

function showTestimonial(index) {

    card.classList.add("fade");

    setTimeout(() => {

        const activeStep = document.querySelector(".path-step.active");

        if (activeStep) {
            activeStep.classList.remove("active");
        }

        steps[index].classList.add("active");

        card.innerHTML = `
            <div class="quote-icon">❝</div>

            <h3>${testimonials[index].name}</h3>

            <div class="stars">
                ${testimonials[index].stars}
            </div>

            <p>
                ${testimonials[index].text}
            </p>
        `;

        card.classList.remove("fade");

    }, 250);

    currentIndex = index;
}

function startSlider() {

    autoSlider = setInterval(() => {

        currentIndex++;

        if (currentIndex >= testimonials.length) {
            currentIndex = 0;
        }

        showTestimonial(currentIndex);

    }, 4000);

}

function restartSlider() {

    clearInterval(autoSlider);
    startSlider();

}

steps.forEach((step, index) => {

    step.addEventListener("click", () => {

        showTestimonial(index);
        restartSlider();

    });

});

showTestimonial(0);
startSlider();
