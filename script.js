function initScrollImageStack(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let currentIndex = 0;
    const images = Array.from(container.querySelectorAll(".image"));
    const maxIndex = images.length - 1;
    let autoSwitchInterval = null;

    // Initial order
    reorderImages(currentIndex, images);

    function reorderImages(index, images) {
        const ordered = [...images];
        while (container.firstChild) container.removeChild(container.firstChild);

        const rotated = ordered.slice(index).concat(ordered.slice(0, index));
        rotated.forEach(img => container.appendChild(img));

        rotated[0].className = "image front";
        if (rotated[1]) rotated[1].className = "image middle";
        if (rotated[2]) rotated[2].className = "image back";
    }

    function startAutoSwitch(intervalTime = 1500) {
        if (autoSwitchInterval) return; // avoid duplicate intervals
        autoSwitchInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            reorderImages(currentIndex, images);
        }, intervalTime);
    }

    function stopAutoSwitch() {
        if (autoSwitchInterval) {
            clearInterval(autoSwitchInterval);
            autoSwitchInterval = null;
        }
    }

    if (window.innerWidth < 768) {
        // Auto cycle on small screens
        startAutoSwitch();

        // Optional: Stop on touch
        container.addEventListener("touchstart", () => {
            stopAutoSwitch();
        }, { once: true });
    } else {
        // Hover-based cycle on larger screens
        container.addEventListener("mouseenter", () => {
            startAutoSwitch(1800); // slightly faster on hover
        });

        container.addEventListener("mouseleave", () => {
            stopAutoSwitch();
        });
    }
}
initScrollImageStack(".image-stack");








 



document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 7000, // Auto-swipe every 3 seconds
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
            delay: 7000,
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




//   navigation

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('show');
});



document.addEventListener("DOMContentLoaded", (event) => {
    
    
    
    gsap.timeline({
        scrollTrigger: {
            trigger: ".container",
            start: "top top",
            ease: "power1.inOut"
        }
    })
        .from(".animation_section", {
            y: 120,
            opacity: 0,
            duration: 1,
            stagger: 0.5
        })

  

});








const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.6
  });

  document.querySelectorAll('.row').forEach(row => observer.observe(row));




  
   