// function to load cart from local storage
function loadCartItems() {
    // getting element cartItems
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = ""; // Clear the cartContainer
    // getting the logged data from local storage
    const logData = localStorage.getItem('logged data') ? JSON.parse(localStorage.getItem('logged data')): {}
    // creating a unquie name base on user email for storing cart elements
    const cartName = 'cartList-'+logData['email']

    // checking if we have cart store in local storage 
    const cartList = localStorage.getItem(cartName) ? JSON.parse(localStorage.getItem(cartName)) : {};
    let totalCarRentPrice = 0
    // rendering the cart items
    for (const carId in cartList) {
        const carData = cartList[carId];
        const cartItem = document.createElement("div");
        // calculating the prices
        let carRentPrice = removeDollar(carData.price) * carData.quantity
        
        cartItem.className = "d-flex align-items-center mb-5";
        cartItem.innerHTML = `
            <div class="">
                <img src="${carData.imageSrc}" class="img-fluid" style="width: 150px;" alt="Product">
            </div>
            <div class="flex-grow-1 ms-3">
                <a href="#!" class="float-end text-black"><i class="fas fa-times" onclick="deleteCartItem('${carId}')"></i></a>
                <h5 class="text-primary title">${carData.title}</h5>
                <h6 style="color: #9e9e9e;">Color: ${carData.color}</h6>
                <div class="d-flex align-items-center">
                    <p class="fw-bold mb-0 me-5 pe-3" >$${carRentPrice}</p>
                    <div class="def-number-input number-input safari_only">
                        <button></button>
                        <input class="quantity fw-bold text-black" min="0" name="quantity" value="${carData.quantity}" type="number">
                        <button></button>
                    </div>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem)
        totalCarRentPrice += carRentPrice
    }
    // placeing the price (tax and total rent)
    let tax =(totalCarRentPrice*0.13)
    let rentWithTax = totalCarRentPrice+tax 
    document.getElementById('taxRentAmount').textContent = '$'+ tax.toFixed(2)
    document.getElementById('totalRentAmount').textContent = '$'+(rentWithTax).toFixed(2)
}

// function to delete the cart item
function deleteCartItem(carId) {
    const logData = localStorage.getItem('logged data') ? JSON.parse(localStorage.getItem('logged data')): {}
    const cartName = 'cartList-'+logData['email']
    const cartList = localStorage.getItem(cartName) ? JSON.parse(localStorage.getItem(cartName)) : {};
    
    if (cartList.hasOwnProperty(carId)) {
        delete cartList[carId];
        localStorage.setItem(cartName, JSON.stringify(cartList));
        // Reload the cart items
        loadCartItems();
        cartItemNum();
    }
}

// function to change the number in cart icon base on items in cart
function cartItemNum(){
    const logData = localStorage.getItem('logged data') ? JSON.parse(localStorage.getItem('logged data')): {}
    const cartName = 'cartList-'+logData['email']
    const cartList = localStorage.getItem(cartName) ? JSON.parse(localStorage.getItem(cartName)) : {};
    const numberOfItems = Object.keys(cartList).length;
    document.getElementById('cartNumItem').textContent = numberOfItems
    // Update cart icon badge
    document.getElementById('cartNumItem').textContent = numberOfItems;

    // Toggle empty cart message visibility
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartListDisplay = document.getElementById('cart_item_list')
    if (numberOfItems === 0) {
        emptyCartMessage.classList.remove('d-none'); // Completely remove the element from the DOM
        cartListDisplay.classList.add('d-none')
    } else {
        emptyCartMessage.classList.add('d-none'); // Add the "d-none" class to hide the message
        cartListDisplay.classList.remove('d-none')
    }
}

// calling all the required function when the domcontentloaded
document.addEventListener("DOMContentLoaded", function () {
    // Call the function to load cart items
    loadCartItems();
    cartItemNum();
});

// function to remove $ and parseInt a price amount
function removeDollar(price){
    return parseInt(price.replace('$', ''));
}
