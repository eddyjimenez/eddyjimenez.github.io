// GSAP animation for the main logo
document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for dark mode preference on page load
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateImagesForDarkMode(true);
    }

    gsap.fromTo('.main-logo', 
        { opacity: 0, scale: 0.3 }, // Initial state (faded out and scaled down)
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" } // Final state (fully visible and normal size)
    );

    // GSAP animation for the persona image
    gsap.fromTo('.persona-image', 
        { opacity: 0, scale: 0.1 }, // Initial state (faded out and scaled down)
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" } // Final state (fully visible and normal size)
    );

    gsap.fromTo('.flowchart-image', 
        { opacity: 0, scale: 0.1 }, // Initial state (faded out and scaled down)
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" } // Final state (fully visible and normal size)
    );

    gsap.fromTo('.full-page-image', 
        { opacity: 0, rotateY: 90 }, // Initial state (flipped horizontally)
        { opacity: 1, rotateY: 0, duration: 1.5, ease: "power3.out" } // Final state (normal orientation)
    );

    // Load the carousel HTML content
    loadCarousel();
});

// Function to load the carousel HTML content into a target element
function loadCarousel() {
    fetch('carousel.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.carousel-placeholder').innerHTML = data;
            initializeCarousel(); // Call the function to initialize the carousel events after loading
        })
        .catch(error => console.error('Error loading carousel:', error));
}

// Function to update images for dark mode
const updateImagesForDarkMode = (isDarkMode) => {
    const images = document.querySelectorAll('img[data-light][data-dark]');
    images.forEach(img => {
        const lightSrc = img.getAttribute('data-light');
        const darkSrc = img.getAttribute('data-dark');
        img.src = isDarkMode ? darkSrc : lightSrc;
    });
};

// Dark mode toggle functionality
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateImagesForDarkMode(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    console.log('Dark mode enabled:', isDarkMode); // Log the current state for debugging
});

// Function to initialize carousel functionality
function initializeCarousel() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Automatically move to the next slide every 3 seconds
    setInterval(nextSlide, 3000);
}
