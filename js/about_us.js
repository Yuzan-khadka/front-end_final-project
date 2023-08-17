// const slides = document.querySelectorAll('.slide');
// const dotsContainer = document.querySelector('.dots');
// let currentSlide = 0;

// function showSlide(index) {
//     slides.forEach(slide => slide.classList.remove('active'));
//     slides[index].classList.add('active');
//     updateDots(index);
// }

// function updateDots(index) {
//     const dots = document.querySelectorAll('.dot');
//     dots.forEach(dot => dot.classList.remove('active'));
//     dots[index].classList.add('active');
// }

// function nextSlide() {
//     currentSlide++;
//     if (currentSlide >= slides.length) {
//         currentSlide = 0;
//     }
//     showSlide(currentSlide);
// }

// function startSlider() {
//     setInterval(nextSlide, 3000); // Auto slide every 3 seconds
// }

// startSlider();
// showSlide(currentSlide);

// Get slider and slide elements
const slider = document.querySelector('.slider');
const slides = Array.from(document.querySelectorAll('.slide'));

// Get dots container and create dot elements
const dotsContainer = document.querySelector('.dots');
slides.forEach(() => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

// Initialize current slide index
let currentSlideIndex = 0;

// Function to update slide classes and dot indicators
function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        dots[index].classList.remove('active');
    });

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Function to handle slide navigation
function navigateToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
    slider.style.transform = `translateX(-${index * 100}%)`;
}

// Initialize slider
updateSlider();

// Handle dot click events
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        navigateToSlide(index);
    });
});

// Automatic slide transition
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlider();
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

// Set interval for automatic slide transition
setInterval(autoSlide, 3000); // Change slide every 3 seconds
