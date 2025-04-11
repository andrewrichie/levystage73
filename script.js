// function initImageStack(containerSelector) {
//     const container = document.querySelector(containerSelector);
//     if (!container) return;

//     container.addEventListener("click", function () {
//         let images = Array.from(container.querySelectorAll(".image"));

//         if (images.length < 3) return; // Ensure we have 3 images

//         // Move the back image (last in array) to the front
//         let lastImage = images.pop(); // Remove last image from array
//         container.prepend(lastImage); // Move it to the front of the stack

//         // Update class assignments
//         lastImage.className = "image front";  // Now the top image
//         images[0].className = "image middle"; // Becomes the second image
//         images[1].className = "image back";   // Moves to the back
//     });
// }

// // Initialize for this section
// initImageStack(".image-stack");



function initScrollImageStack(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let isScrolling = false;
    let currentIndex = 0;
    const images = Array.from(container.querySelectorAll(".image"));
    const maxIndex = images.length - 1;

    // Initial order
    reorderImages(currentIndex, images);

    container.addEventListener("wheel", function (event) {
        // Only trigger if mouse is hovering over the image stack
        if (!container.matches(':hover')) return;

        // SCROLL DOWN
        if (event.deltaY > 0) {
            if (currentIndex < maxIndex) {
                event.preventDefault(); // Block page scroll
                if (isScrolling) return;
                isScrolling = true;
                currentIndex++;
                reorderImages(currentIndex, images);
                setTimeout(() => isScrolling = false, 1000);
            }
            // else: let scroll go through (page scrolls)
        }

        // SCROLL UP
        else if (event.deltaY < 0) {
            if (currentIndex > 0) {
                event.preventDefault(); // Block page scroll
                if (isScrolling) return;
                isScrolling = true;
                currentIndex--;
                reorderImages(currentIndex, images);
                setTimeout(() => isScrolling = false, 500);
            }
            // else: let scroll go through (page scrolls)
        }
    }, { passive: false });

    function reorderImages(index, images) {
        // Move the desired image to the front
        const ordered = [...images];
        while (container.firstChild) container.removeChild(container.firstChild);

        // Rotate array so selected index is front
        const rotated = ordered.slice(index).concat(ordered.slice(0, index));
        rotated.forEach(img => container.appendChild(img));

        // Assign classes
        rotated[0].className = "image front";
        if (rotated[1]) rotated[1].className = "image middle";
        if (rotated[2]) rotated[2].className = "image back";
    }
}
initScrollImageStack(".image-stack");











 



document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 4000, // Auto-swipe every 3 seconds
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
            delay: 4000,
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



// green java



  const wrapper = document.querySelector('.rare-swiper-wrapper');
  const slides = document.querySelectorAll('.rare-swiper-slide');
  const pagination = document.querySelector('.rare-swiper-pagination');

  let currentSlide = 0;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('rare-swiper-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    pagination.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    wrapper.style.transform = `translateX(-${index * 100}%)`;

    document
      .querySelectorAll('.rare-swiper-dot')
      .forEach((dot, idx) =>
        dot.classList.toggle('active', idx === currentSlide)
      );
  }

  // Optional: autoplay
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 6000);



