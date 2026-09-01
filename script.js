/* =========================================================
   SIDEBAR
========================================================= */

const sidebar =
    document.getElementById("sidebar");

const menuToggle =
    document.getElementById("menuToggle");

const sidebarClose =
    document.getElementById("sidebarClose");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("open");

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("show");
    }

    document.body.style.overflow = "hidden";
}


function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("open");

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("show");
    }

    document.body.style.overflow = "";
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        openSidebar
    );
}


if (sidebarClose) {

    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );
}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );
}


/* =========================================================
   CLOSE SIDEBAR AFTER NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(".nav-item");

navLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            if (window.innerWidth <= 768) {
                closeSidebar();
            }

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";

navLinks.forEach(function(link) {

    const href =
        link.getAttribute("href");

    if (
        href &&
        href !== "#" &&
        href === currentPage
    ) {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    }

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeSidebar();
        }

    }
);


/* =========================================================
   SIDEBAR RESPONSIVE RESET
========================================================= */

window.addEventListener(
    "resize",
    function() {

        if (window.innerWidth > 768) {
            closeSidebar();
        }

        initializeSliders();

    }
);


/* =========================================================
   SLIDERS
========================================================= */

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


/* =========================================================
   VISIBLE SLIDES
========================================================= */

function getVisibleSlides() {

    if (window.innerWidth <= 600) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;
}


/* =========================================================
   UPDATE SLIDER
========================================================= */

function updateSlider(id) {

    const track =
        document.getElementById(id);

    if (!track) return;

    if (!sliders[id]) return;

    const slides =
        track.querySelectorAll(".slide");

    const totalSlides =
        slides.length;

    const visible =
        getVisibleSlides();

    const maxIndex =
        Math.max(
            0,
            totalSlides - visible
        );


    if (
        sliders[id].current >
        maxIndex
    ) {

        sliders[id].current =
            maxIndex;
    }


    if (
        sliders[id].current < 0
    ) {

        sliders[id].current = 0;
    }


    const percentage =
        (100 / visible) *
        sliders[id].current;


    track.style.transform =
        `translateX(-${percentage}%)`;


    createDots(
        id,
        maxIndex
    );
}


/* =========================================================
   MOVE SLIDER
========================================================= */

function moveSlider(
    id,
    direction
) {

    if (!sliders[id]) return;

    sliders[id].current +=
        direction;

    updateSlider(id);
}


/* =========================================================
   CREATE DOTS
========================================================= */

function createDots(
    id,
    maxIndex
) {

    const dotsContainer =
        document.getElementById(
            sliders[id].dots
        );

    if (!dotsContainer) {
        return;
    }


    dotsContainer.innerHTML = "";


    for (
        let i = 0;
        i <= maxIndex;
        i++
    ) {

        const dot =
            document.createElement(
                "span"
            );


        dot.className =
            "dot";


        if (
            i ===
            sliders[id].current
        ) {

            dot.classList.add(
                "active"
            );
        }


        dot.onclick =
            function() {

                sliders[id].current =
                    i;

                updateSlider(id);

            };


        dotsContainer.appendChild(
            dot
        );

    }

}


/* =========================================================
   INITIALIZE SLIDERS
========================================================= */

function initializeSliders() {

    Object.keys(sliders)
        .forEach(function(id) {

            updateSlider(id);

        });

}


/* =========================================================
   AUTO SLIDE
========================================================= */

function autoSlide(id) {

    const track =
        document.getElementById(id);

    if (!track) return;

    if (!sliders[id]) return;


    const slides =
        track.querySelectorAll(
            ".slide"
        );


    const visible =
        getVisibleSlides();


    const maxIndex =
        Math.max(
            0,
            slides.length - visible
        );


    sliders[id].current++;


    if (
        sliders[id].current >
        maxIndex
    ) {

        sliders[id].current = 0;

    }


    updateSlider(id);

}


/* =========================================================
   AUTO SLIDE TIMERS
========================================================= */

setInterval(
    function() {

        autoSlide(
            "annadhanam-slider"
        );

    },
    4500
);


setInterval(
    function() {

        autoSlide(
            "nimarjanam-slider"
        );

    },
    5000
);


setInterval(
    function() {

        autoSlide(
            "video-slider"
        );

    },
    6000
);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeSliders();

    }
);