
loadCarDetailById(getCarIdFromURL());

function getCarIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const carId = urlParams.get('carid')
    return carId;
}


function loadCarDetailById(carId) {
    fetch("../data/cars.json")
        .then((response) => response.json())
        .then((data) => {        
            const product = data.find((product) => product.id === parseInt(carId));
            if (product) {               
                document.getElementById("main-car-img").src = product.imageSrc;
                document.getElementById("car-rent-price").textContent = product.price;
                document.getElementById("car-rating").innerHTML = loadStar(product.rating);
                document.getElementById("car-model").textContent = product.model;
                document.getElementById("car-description").textContent = product.description;
                document.getElementById("car-quantity").textContent = product.quantity;
                document.getElementById("car-title").textContent = product.title;
            }
        })
        .catch((error) => {
            console.error("Error loading product details:", error);
        });
}

function loadStar(rating) {
    let remainingRating = 5 - rating;
    let result = '';

    while (rating > 0) {
        result += '<i class="text-warning fa fa-star"></i>';
        rating--;
    }

    while (remainingRating > 0) {
        result += ' <i class="text-muted fa fa-star"></i>';
        remainingRating--;
    }

    return result;
}
