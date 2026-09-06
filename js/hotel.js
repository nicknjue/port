/* =========================================================
   GOLDEN PARTICLES
========================================================= */

const particleContainer = document.querySelector(".particles");

for (let i = 0; i < 12; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.top =
        30 + Math.random() * 65 + "%";

    particle.style.animationDuration =
        4 + Math.random() * 6 + "s";

    particle.style.animationDelay =
        Math.random() * 6 + "s";

    particle.style.transform =
        `scale(${0.5 + Math.random()})`;

    particleContainer.appendChild(particle);
}



/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenu =
    document.querySelector(".mobile-menu");

const navLinks =
    document.querySelector(".nav-links");


mobileMenu.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });



/* =========================================================
   RESERVATION FORM
========================================================= */

const reservationForm =
    document.getElementById("reservationForm");

const reservationMessage =
    document.getElementById("reservationMessage");


reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const guests =
        document.getElementById("guests").value;

    const time =
        document.getElementById("time").value;

    const date =
        document.getElementById("date").value;


    if (!guests || !time || !date) {

        reservationMessage.textContent =
            "Please complete all reservation fields.";

        return;

    }


    reservationMessage.textContent =
        `Your reservation request for ${guests} guest(s) on ${date} at ${time} has been received. We will confirm your table shortly.`;


    reservationForm.reset();

});



/* =========================================================
   SET MINIMUM RESERVATION DATE TO TODAY
========================================================= */

const dateInput =
    document.getElementById("date");


const today =
    new Date().toISOString().split("T")[0];


dateInput.min = today;



/* =========================================================
   FOOD CARD EFFECT
========================================================= */

const foodCards =
    document.querySelectorAll(".food-card");


foodCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const rotateX =
            ((y / rect.height) - 0.5) * -3;

        const rotateY =
            ((x / rect.width) - 0.5) * 3;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});