
loadCarDetailById(getCarIdFromURL());

// function to get car id from url
function getCarIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const carId = urlParams.get('carid')
    return carId;
}

// function to get data from json file and loading it base on the car id
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

// function the load the star elements
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

// function to subtract the car quantity
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

// function to add the car quantity
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

// function to load the message in the message section
function updateQuantityMessage(message){
    const messageElement = document.getElementById("quantity-message");
    messageElement.textContent = message
}

// creating a click event listener to element with id of addToCart to the a functionality 
document.getElementById('addToCart').addEventListener('click', (event) => {    
    let carId = event.target.value;
    event.preventDefault();
    // geting the current car number in the stock
    const currentQuantity = parseInt(document.getElementById('currentCarQuantity').textContent);
    // checking if the user is logged in or not
    const logData = checkIfLogged()
    if (Object.keys(logData).length === 0){
        document.getElementById('quantity-message').textContent = "You are not logged, sign-in or register."
        return
    }
    // unquie name for cart element in local storage
    const cartName = 'cartList-'+logData['email']
    // checking if zero item is selected
    if (currentQuantity === 0){
        document.getElementById('quantity-message').textContent = "No item was quantity added."
        return
    }
    // fetching data from json
    fetch('../data/cars.json')
      .then((response) => response.json())
      .then((data) => {
        // matching the data with given id
        const product = data.find((product) => product.id === parseInt(carId));
        
        if (product) {
            // if found storing it in the local storages
            const existingItems = localStorage.getItem(cartName) ? JSON.parse(localStorage.getItem(cartName)) : {}; 
            const carsQualityList = localStorage.getItem('carsList') ? JSON.parse(localStorage.getItem('carsList')) : {};            
            const availableQuantity = carsQualityList[carId] ? carsQualityList[carId] : 0;
           // adding the item 
            if (!existingItems[carId]) {
                existingItems[carId] = {
                    imageSrc: product.imageSrc,
                    title: product.title,
                    price: product.price ,
                    color: product.color,
                    quantity: currentQuantity
                };
            } else {
                // updating the quantity
                existingItems[carId].quantity += currentQuantity;
            }
            // checking if the number doesn't exceed the stock amount
            if (availableQuantity < existingItems[carId].quantity) {
                document.getElementById('quantity-message').textContent = `Exceeded available quantity from stock. Max: ${availableQuantity}`;
                return;
            }
            // storing the result in local storage
            localStorage.setItem(cartName, JSON.stringify(existingItems));
            console.log('Item added to cart:', existingItems);
            loadCartItems();
            cartItemNum();
            
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

// function to check and return the logged data
function checkIfLogged(){
    const logData = localStorage.getItem('logged data') ? JSON.parse(localStorage.getItem('logged data')): {}
    return logData
}
