/* =========================================================
   NICHOLAS NJUE — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            // Change menu icon
            const icon = menuToggle.querySelector("span");

            if (navLinks.classList.contains("active")) {
                if (icon) icon.textContent = "✕";
            } else {
                if (icon) icon.textContent = "☰";
            }
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("span");
                if (icon) icon.textContent = "☰";
            });
        });
    }


    /* =====================================================
       NAVBAR — CHANGE WHEN SCROLLING
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });
    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    if (sections.length && navigationLinks.length) {

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }

            });

            navigationLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") === `#${currentSection}`
                ) {
                    link.classList.add("active");
                }

            });

        });
    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       PROJECT FILTER
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length && projectCards.length) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                // Remove active state
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                // Activate clicked button
                button.classList.add("active");

                const filter = button.dataset.filter;

                projectCards.forEach(card => {

                    const category = card.dataset.category;

                    if (filter === "all" || category === filter) {

                        card.style.display = "block";

                        setTimeout(() => {
                            card.classList.add("show");
                        }, 10);

                    } else {

                        card.classList.remove("show");
                        card.style.display = "none";

                    }

                });

            });

        });

    }


    /* =====================================================
       PROJECT CARD HOVER EFFECT
       ===================================================== */

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-card, .experience-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Software Developer",
            "Web Developer",
            "UI/UX Designer",
            "Problem Solver",
            "BBIT Student"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1800);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 60 : 100
            );
        }

        typeEffect();
    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document.querySelector("#name")?.value.trim();
            const email = document.querySelector("#email")?.value.trim();
            const message = document.querySelector("#message")?.value.trim();

            if (!name || !email || !message) {

                showNotification(
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }

            if (!validateEmail(email)) {

                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }

            showNotification(
                "Thank you! Your message has been prepared.",
                "success"
            );

            // If you later connect a backend/email service,
            // this is where the form submission can be handled.

        });

    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function validateEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       NOTIFICATION
       ===================================================== */

    function showNotification(message, type) {

        // Remove existing notification
        const existing =
            document.querySelector(".portfolio-notification");

        if (existing) {
            existing.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            `portfolio-notification ${type}`;

        notification.textContent = message;

        document.body.appendChild(notification);

        // Show
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);

        // Remove after 4 seconds
        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 4000);

    }


    /* =====================================================
       PROJECT LINK TRACKING
       ===================================================== */

    const projectLinks =
        document.querySelectorAll(".project-link");

    projectLinks.forEach(link => {

        link.addEventListener("click", () => {

            const projectName =
                link.dataset.project || "Unknown Project";

            console.log(
                `Opening project: ${projectName}`
            );

        });

    });


    /* =====================================================
       CV DOWNLOAD / VIEW BUTTON
       ===================================================== */

    const cvButton =
        document.querySelector(".cv-button");

    if (cvButton) {

        cvButton.addEventListener("click", () => {

            console.log("CV button clicked");

        });

    }


    /* =====================================================
       DYNAMIC SKILL BARS
       ===================================================== */

    const skillBars =
        document.querySelectorAll(".skill-progress");

    if ("IntersectionObserver" in window) {

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const percentage =
                                entry.target.dataset.progress;

                            entry.target.style.width =
                                `${percentage}%`;

                            skillObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });

    }


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%cNicholas Njue — Portfolio",
        "font-size: 18px; font-weight: bold;"
    );

    console.log(
        "Building practical digital solutions through creativity, technology and problem solving."
    );

});