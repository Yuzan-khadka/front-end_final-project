// geting searchcars element
const searchInput = document.getElementById('searchCars')
// calling function performSearch on event input
searchInput.addEventListener('input', performSearch)

// function to perform search
function performSearch(){
  const query = searchInput.value.toLowerCase();
  // recalling the loadcars function when the input is empty
  if (query == ''){
    return;
  }
  // fetching the cars.json data
  fetch("../data/cars.json")
    .then((response)=> response.json())
    .then((data)=>{
      // filtering the data
      const filteredCars = data.filter((car)=>{
        return(
          car.title.toLowerCase().includes(query) ||
          car.price.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.color.toLowerCase().includes(query)
        );
      });
      // Clear the current productContainer
      const productContainer = document.getElementById("carsContainer");
      productContainer.innerHTML = "";

      // render the filterd cars
    filteredCars.forEach((car) => {
          const carCard = document.createElement('div');
          carCard.className = "col-12 col-md-4 mb-4";
          carCard.innerHTML = `
          <div class="card h-100">
            <a href="./product-details.html?carid=${car.id}">
              <img src="${car.imageSrc}" class="card-img-top" alt="..." />
            </a>
            <div class="card-body">
              <ul class="list-unstyled d-flex justify-content-between">
                <li>${loadStar(car.rating)}</li>
                <li class="text-muted text-right">${car.price}</li>
              </ul>
              <a href="./product-details.html?carid=${car.id}" class="h2 text-decoration-none text-dark">${car.title}</a>
              <p class="card-text">${car.description}</p>
            </div>
          </div>
          `;
          productContainer.appendChild(carCard);
        });
      }).catch((error)=>{
        console.error("Error loading products:", error);
    });
}



function loadCars() {
    // getting the cars container element
    const productContainer = document.getElementById("carsContainer");
  // fetching the cars.json data
    fetch("../data/cars.json")
      .then((response) => response.json())
      .then((data) => {
        // storing the the fetch data in local storage
        const existingItems = localStorage.getItem('carsList') ? JSON.parse(localStorage.getItem('carsList')) : {};
        // render the cars
        data.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "col-12 col-md-4 mb-4";
          productCard.innerHTML = `
            <div class="card h-100">
              <a href="./product-details.html?carid=${product.id}">
                <img src="${product.imageSrc}" class="card-img-top" alt="..." />
              </a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li>${loadStar(product.rating)}</li>
                  <li class="text-muted text-right">${product.price}</li>
                </ul>
                <a href="./product-details.html?carid=${product.id}" class="h2 text-decoration-none text-dark">${product.title}</a>
                <p class="card-text">${product.description}</p>
              </div>
            </div>
          `;
          productContainer.appendChild(productCard);
          // updating product number
          if (!existingItems[product.id]) {
            existingItems[product.id] = product.quantity;
        }
        });
      localStorage.setItem('carsList', JSON.stringify(existingItems));
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }

  // function to create star element
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
  
  // Call the function to load products
  loadCars();

  
  
  
  