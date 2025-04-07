function initImageStack(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.addEventListener("click", function () {
        let images = Array.from(container.querySelectorAll(".image"));

        if (images.length < 3) return; // Ensure we have 3 images

        // Move the back image (last in array) to the front
        let lastImage = images.pop(); // Remove last image from array
        container.prepend(lastImage); // Move it to the front of the stack

        // Update class assignments
        lastImage.className = "image front";  // Now the top image
        images[0].className = "image middle"; // Becomes the second image
        images[1].className = "image back";   // Moves to the back
    });
}

// Initialize for this section
initImageStack(".image-stack");




document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000, // Auto-swipe every 3 seconds
            disableOnInteraction: false, // Continues auto-swiping after manual swipe
        },
        effect: "slide",
        grabCursor: true,
    });
});


// reverse swipe

document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.reverse-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: "slide",
        grabCursor: true,
        speed: 600, 
        allowTouchMove: true, 
        rtl: false, 
        navigation: false, 
        pagination: false, 
        on: {
            slideChangeTransitionStart: function () {
                this.$wrapperEl.css("transform", "translate3d(0,0,0)"); 
            }
        }
    });
});



// table of content



document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll(".toc-row2");

    // Function to highlight the row in view
    function updateActiveRow() {
        let scrollPosition = window.scrollY + window.innerHeight / 2;

        rows.forEach(row => {
            const rect = row.getBoundingClientRect();
            const rowTop = rect.top + window.scrollY;
            const rowBottom = rowTop + rect.height;

            if (scrollPosition >= rowTop && scrollPosition < rowBottom) {
                row.classList.add("active");
            } else {
                row.classList.remove("active");
            }
        });
    }

    // Run on scroll
    window.addEventListener("scroll", updateActiveRow);
    updateActiveRow(); // Initialize on page load

    // Click event to navigate to linked page
    rows.forEach(row => {
        row.addEventListener("click", function() {
            const url = row.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });

});



window.addEventListener("scroll", function () {
    let line = document.querySelector(".toc-line");
    let scrollPosition = window.scrollY; // Current scroll position
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = scrollPosition / maxScroll; // Scroll progress (0 to 1)

    // Define color transitions
    if (scrollPercent < 0.33) {
    line.style.background = "#03712E"; // Top color
    } else if (scrollPercent < 0.66) {
    line.style.background = "#0466D6"; // Middle color
    } else {
    line.style.background = "#C38C01"; // Bottom color
    }
});




