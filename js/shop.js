// Get the container element to display the cars
const carsContainer = document.getElementById("Shop-Car-container");
// Load cars based on the URL parameter
load_shopPg_car();

// Function to get car model from the URL parameter
function getCarModelFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const model = urlParams.get('model');
    return model;
}

// Function to load cars based on URL parameter or show all cars
function load_shopPg_car() {
    // Fetch the JSON data
  fetch("../data/shop_cars.json")
    .then((response) => response.json())
    .then((data) => {
        // Get the car model from the URL parameter
      let model = getCarModelFromURL();
      // List of available models
      const models = ['honda', 'subaru', 'audi', 'volvo']
        // Check if the provided model is valid
      if (models.includes(model)) {
        // Load cars for a specific model
        shopPg_model_car(data, model);
      } else {
        // Load cars for all models
        shopPg_car(data);
      }
    })
    .catch((error) => {
      console.error("Error loading cars:", error);
    });
}

// Function to display cars for a specific model
function shopPg_model_car(data, model) {
  data.forEach((carBrand) => {
    for (const brandName in carBrand) {
      if (brandName.toLowerCase() == model) {
        // Create brand name header
        const brandData = carBrand[brandName];
        const brandHeader = document.createElement("h2");
        brandHeader.textContent = brandName;
        brandHeader.className = "text-center mb-4";
        carsContainer.appendChild(brandHeader);

        // Display cars for the brand
        brandData.img.forEach((imageSrc, index) => {
          const carCard = createCarCard(brandData, index, imageSrc);
          carsContainer.appendChild(carCard);
        });
        return; // Exit loop once the correct model is found
      }
    }
  });
}

// Function to display cars for all models
function shopPg_car(data) {
  data.forEach((carBrand) => {
    for (const brandName in carBrand) {
      const brandData = carBrand[brandName];
      // Create brand name header
      const brandHeader = document.createElement("h2");
      brandHeader.textContent = brandName;
      brandHeader.className = "text-center mb-4";
      carsContainer.appendChild(brandHeader);

      
        // Display cars for the brand
      brandData.img.forEach((imageSrc, index) => {
        const carCard = createCarCard(brandData, index, imageSrc);
        carsContainer.appendChild(carCard);
      });
    }
  });
}

// Function to create a car card element
function createCarCard(brandData, index, imageSrc) {
  const carCard = document.createElement("div");
  carCard.className = "col-md-4";
  carCard.innerHTML = `
  
    <div class="card mb-4 product-wap rounded-0">
        <div class="card rounded-0">
        <a href="product-details.html">
            <img class="card-img rounded-0 img-fluid" src="${imageSrc}" style="height: 200px; object-fit: cover;">
            </a>
            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                <ul class="list-unstyled">
                    <li><a class="btn btn-success text-white" href="#"><i class="far fa-heart"></i></a></li>
                    <li><a class="btn btn-success text-white mt-2" href="#"><i class="fas fa-cart-plus"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="card-body">
            <a href="#" class="h3 text-decoration-none">${brandData.model[index]}</a>
            <ul class="list-unstyled d-flex justify-content-center mb-1">
                <li>
                    ${loadStar(brandData.star[index])} <!-- Generate star rating dynamically -->
                </li>
            </ul>
            <p class="text-center mb-0">${brandData.price[index]}</p>
        </div>
    </div>
  `;
  return carCard;
}

// Function to create a car card element
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
