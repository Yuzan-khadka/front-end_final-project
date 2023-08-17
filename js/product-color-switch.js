const productImages = document.querySelectorAll('.carousel-item div img');
const imgContainer = document.querySelector('.img-container');

// calling the function when domConted is completely loaded
window.addEventListener('DOMContentLoaded', () => {
    productImages[0].parentElement.classList.add('active');
});

// changing the image to switch the color
productImages.forEach((image) => {
    image.addEventListener('click', () =>{
        imgContainer.querySelector('img').src = image.src;
        resetActiveImg();
        image.parentElement.classList.add('active');
    });
});
// reseting the img
function resetActiveImg(){
    productImages.forEach((img) => {
        img.parentElement.classList.remove('active');
    });
}