(function () {
    emailjs.init({
        publicKey: "Xt5kvG1KQ0QbFg03l",
    });
})();

// let pathParticlesConfif = `./assets/js/particlesjs-config.json`;

window.onload = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const bsTheme = localStorage.getItem("bsTheme");
    const bsThemeCurrent = document.documentElement.dataset.bsTheme;
    if (bsTheme && (bsThemeCurrent != bsTheme)) myFunction();

    /*
        if (document.documentElement.lang === "fr") pathParticlesConfif = '.' + pathParticlesConfif;
        particlesJS.load('particles-js', pathParticlesConfif);
    */

    let contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        emailjs.sendForm('default_service', 'template_ptculdh', this)
            .then(() => {
                contactForm.reset();
                new bootstrap.Modal(document.querySelector(`#contactModal`), {}).show();
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}

const myFunction = () => {
    let element = document.documentElement;
    element.dataset.bsTheme =
        element.dataset.bsTheme == "light" ? "dark" : "light";
    document.querySelector("[name=icon--darkMode]").className = element.dataset.bsTheme == "light" ? "bi bi-moon-stars fs-5" : "bi bi-brightness-high fs-5";
    localStorage.setItem("bsTheme", element.dataset.bsTheme);

    document.querySelector("[name=theme-color]").content = element.dataset.bsTheme == "light" ? "#ffffff" : "#212529";

    /*
        pJSDom[0].pJS.particles.color.value = (element.dataset.bsTheme == "light") ? '#c62828' : '#fff';
        pJSDom[0].pJS.fn.particlesRefresh();
    */
}