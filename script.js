const sliders = {
    "annadhanam-slider": {
        current: 0,
        dots: "annadhanam-dots"
    },

    "nimarjanam-slider": {
        current: 0,
        dots: "nimarjanam-dots"
    },

    "video-slider": {
        current: 0,
        dots: "video-dots"
    }
};

function getVisibleSlides() {

    if (window.innerWidth <= 600) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;
}

function updateSlider(id) {

    const track = document.getElementById(id);

    if (!track) return;

    const slides = track.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const visible = getVisibleSlides();

    const maxIndex = Math.max(
        0,
        totalSlides - visible
    );

    if (sliders[id].current > maxIndex) {
        sliders[id].current = maxIndex;
    }

    if (sliders[id].current < 0) {
        sliders[id].current = 0;
    }

    const percentage =
        (100 / visible) *
        sliders[id].current;

    track.style.transform =
        `translateX(-${percentage}%)`;

    createDots(id, maxIndex);
}

function moveSlider(id, direction) {

    sliders[id].current += direction;

    updateSlider(id);
}

function createDots(id, maxIndex) {

    const dotsContainer =
        document.getElementById(
            sliders[id].dots
        );

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    for (let i = 0; i <= maxIndex; i++) {

        const dot =
            document.createElement("span");

        dot.className = "dot";

        if (i === sliders[id].current) {
            dot.classList.add("active");
        }

        dot.onclick = function () {

            sliders[id].current = i;

            updateSlider(id);
        };

        dotsContainer.appendChild(dot);
    }
}

function initializeSliders() {

    Object.keys(sliders).forEach(function(id) {
        updateSlider(id);
    });
}

function autoSlide(id) {

    const track =
        document.getElementById(id);

    if (!track) return;

    const slides =
        track.querySelectorAll(".slide");

    const visible =
        getVisibleSlides();

    const maxIndex =
        Math.max(
            0,
            slides.length - visible
        );

    sliders[id].current++;

    if (sliders[id].current > maxIndex) {
        sliders[id].current = 0;
    }

    updateSlider(id);
}

setInterval(function() {
    autoSlide("annadhanam-slider");
}, 4500);

setInterval(function() {
    autoSlide("nimarjanam-slider");
}, 5000);

setInterval(function() {
    autoSlide("video-slider");
}, 6000);

window.addEventListener(
    "resize",
    initializeSliders
);

document.addEventListener(
    "DOMContentLoaded",
    initializeSliders
);