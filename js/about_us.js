// Get references to slider, slides, and dot elements
const slider = document.querySelector('.slider');
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));

// Initialize variables
let currentSlideIndex = 0;
let intervalId;

// Function to update slider display
function updateSlider() {
    // Loop through slides and adjust their position and opacity
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        slide.style.opacity = index === currentSlideIndex ? 1 : 0;
        dots[index].classList.toggle('active', index === currentSlideIndex);
    });
}

// Function to navigate to a specific slide
function navigateToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
}

// Function for automatic slide transition
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlider();
}

// Start automatic slide show
function startAutoSlide() {
    intervalId = setInterval(autoSlide, 3000);
}

// Pause automatic slide show
function pauseAutoSlide() {
    clearInterval(intervalId);
    intervalId = null;
}

// Add click event listeners to dot indicators
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        navigateToSlide(index);
        pauseAutoSlide();
    });
});

// Initial setup: update slider and start auto slide
updateSlider();
startAutoSlide();

// Adjust behavior on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 767) {
        pauseAutoSlide();
    } else {
        startAutoSlide();
    }
});
