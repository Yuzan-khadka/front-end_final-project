const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    updateDots(index);
}

function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function startSlider() {
    setInterval(nextSlide, 3000); // Auto slide every 3 seconds
}

startSlider();
showSlide(currentSlide);
