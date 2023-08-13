
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
                document.getElementById('addToCart').value = product.id;
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


function minusQuantity(){
    const carid = getCarIdFromURL()
    let element = document.getElementById('currentCarQuantity')
    let stock =  parseInt(document.getElementById("car-quantity").textContent)
    let currentQuantity = parseInt(element.textContent)
    if (currentQuantity == 0){
        updateQuantityMessage("The quantity can't be below zero");
    }else{    
            element.textContent = --currentQuantity;
            updateQuantityMessage("")
    }
}

function addQuantity(){
    const carid = getCarIdFromURL()
    let element = document.getElementById('currentCarQuantity')
    let stock =  parseInt(document.getElementById("car-quantity").textContent)
    let currentQuantity = parseInt(element.textContent)
    if(currentQuantity == stock){
        updateQuantityMessage("The quantity can't be over stock");
    }else{
        element.textContent = ++currentQuantity;
        updateQuantityMessage("")
    }
}

function updateQuantityMessage(message){
    const messageElement = document.getElementById("quantity-message");
    messageElement.textContent = message
}


document.getElementById('addToCart').addEventListener('click', (event) => {    
    let carId = event.target.value;
    event.preventDefault();
    const currentQuantity = parseInt(document.getElementById('currentCarQuantity').textContent);
    if (currentQuantity === 0){
        console.log('asdf')
        document.getElementById('quantity-message').textContent = "No item was quantity added."
        return
    }
    
    fetch('../data/cars.json')
      .then((response) => response.json())
      .then((data) => {
        const product = data.find((product) => product.id === parseInt(carId));
        
        if (product) {
            const existingItems = localStorage.getItem('cartList') ? JSON.parse(localStorage.getItem('cartList')) : {}; 
            const carsQualityList = localStorage.getItem('carsList') ? JSON.parse(localStorage.getItem('carsList')) : {};            
            const availableQuantity = carsQualityList[carId] ? carsQualityList[carId] : 0;
           

            if (!existingItems[carId]) {
                existingItems[carId] = {
                    imageSrc: product.imageSrc,
                    title: product.title,
                    price: product.price ,
                    color: product.color,
                    quantity: currentQuantity
                };
            } else {
                existingItems[carId].quantity += currentQuantity;
            }

            if (availableQuantity < existingItems[carId].quantity) {
                document.getElementById('quantity-message').textContent = `Exceeded available quantity from stock. Max: ${availableQuantity}`;
                return;
            }
            
            localStorage.setItem('cartList', JSON.stringify(existingItems));
            console.log('Item added to cart:', existingItems);
            loadCartItems();
            cartItem();
            
            // Reset the current quantity display
            document.getElementById('currentCarQuantity').textContent = "0";
            
            // Display a message or perform other actions as needed
            document.getElementById('quantity-message').textContent = `Added ${currentQuantity} items to cart.`;
        } else {
            console.log('Product not found');
        }
    })
    .catch((error) => {
        console.error("Error adding to cart:", error);
    });
});

