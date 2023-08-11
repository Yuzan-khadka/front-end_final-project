 // Check if "logged data" exists in local storage
 const loggedData = JSON.parse(localStorage.getItem("logged data"));

user_nav();

function user_nav(){
    if(loggedData){
        const user_logged_nav = document.getElementById('user-logged-nav')
        const user_unLogged_nav = document.getElementById('user-unlogged-nav')
        user_logged_nav.classList.remove('d-none')
        user_unLogged_nav.classList.add('d-none')
    
    }
} 

function logoutAction(){
    localStorage.removeItem("logged data")
    user_nav()
    location.reload()
}


function loadCars() {
    const productContainer = document.getElementById("carsContainer");
  
    fetch("../data/cars.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "col-12 col-md-4 mb-4";
          productCard.innerHTML = `
            <div class="card h-100">
              <a href="./product-details.html">
                <img src="${product.imageSrc}" class="card-img-top" alt="..." />
              </a>
              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li>${"⭐".repeat(product.rating)}</li>
                  <li class="text-muted text-right">${product.price}</li>
                </ul>
                <a href="./product-details.html" class="h2 text-decoration-none text-dark">${product.title}</a>
                <p class="card-text">${product.description}</p>
              </div>
            </div>
          `;
          productContainer.appendChild(productCard);
        });
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }
  
  // Call the function to load products
  loadCars();

  
  
  
  