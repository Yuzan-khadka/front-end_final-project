const productImages = document.querySelectorAll('.carousel-item div img');
const imgContainer = document.querySelector('.img-container');

window.addEventListener('DOMContentLoaded', () => {
    productImages[0].parentElement.classList.add('active');
});

productImages.forEach((image) => {
    image.addEventListener('click', () =>{
        imgContainer.querySelector('img').src = image.src;
        resetActiveImg();
        image.parentElement.classList.add('active');
    });
});

function resetActiveImg(){
    productImages.forEach((img) => {
        img.parentElement.classList.remove('active');
    });
}