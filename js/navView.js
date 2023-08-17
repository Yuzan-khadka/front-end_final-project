
// function to load the html component of nav section
function loadNavBar(){
    const navElement = document.createElement('div')
    navElement.innerHTML=`
    <nav class="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="nav_top">
    <div class="container text-light">
        <div class="w-100 d-flex justify-content-between">
            <div>
                <i class="fa fa-envelope mx-2"></i>
                <a class="navbar-sm-brand text-light text-decoration-none" id="user-email"
                    href="#">info@motors.com</a>
                <i class="fa fa-phone mx-2"></i>
                <a class="navbar-sm-brand text-light text-decoration-none" href="#">437-299-1234</a>
            </div>
            <div>
                <a class="text-light" href="https://fb.com/" target="_blank"><i
                        class="fab fa-facebook-f fa-sm fa-fw me-2"></i></a>
                <a class="text-light" href="https://www.instagram.com/" target="_blank"><i
                        class="fab fa-instagram fa-sm fa-fw me-2"></i></a>
                <a class="text-light" href="https://twitter.com/" target="_blank"><i
                        class="fab fa-twitter fa-sm fa-fw me-2"></i></a>
                <a class="text-light" href="https://www.linkedin.com/" target="_blank"><i
                        class="fab fa-linkedin fa-sm fa-fw"></i></a>
            </div>
        </div>
    </div>
</nav>
<!-- End of  Top Navbar -->


<!-- Start of Main Navbar -->
<nav class="navbar navbar-expand-lg navbar-light shadow">
    <div class="container d-flex justify-content-between align-items-center">

        <a class="navbar-brand logo h1 mb-0 align-self-center" href="home.html">
            MoToRS
        </a>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="align-self-center collapse navbar-collapse d-lg-flex justify-content-lg-between" id="main_nav">
            <div class="flex-fill">
                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="./home.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./about_us.html">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="shop.html">Shop</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
            <div class="navbar align-self-center d-flex gap-3">
                <div id="user-unlogged-nav">
                    <a type="button" class="btn btn-success text-white" href="../html/login.html">Login</a>
                    <a type="button" class="btn register-btn text-white"
                        href="../html/registration.html">Register</a>
                </div>
                <div class="d-none d-flex" id="user-logged-nav">
                    <div class="dropdown">
                        <a class="nav-icon position-relative text-decoration-none dropdown-toggle"
                            data-bs-auto-close="outside" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                            <span
                                class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark" id="cartNumItem">0</span>
                        </a>
                        <!-- uncomment and display this block if cart has no item -->
                         <!--<ul class="dropdown-menu d-none" id="emptyCartMessage" aria-labelledby="dropdownMenuButton1">
                               <li><a class="dropdown-item" href="#">You have zero cars in cart!</a></li>
                           </ul> --> 
                        <!-- cart drop down -->
                        <div class="dropdown-menu cart" aria-labelledby="dropdownMenuButton1">
                        
                            <div class="row d-flex justify-content-center align-items-center h-100">
                                <div class="col">
                                    <div class="card shopping-cart" style="border-radius: 15px;">
                                        <div class="card-body text-black">

                                            <div class="row" id="cart_item_list">
                                                <div class="col px-2 py-2 px-md-5 py-md-4">

                                                    <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Items
                                                        you rented</h3>
                                                        <!-- Load cart items here -->
                                                         <div id="cartItems"></div>
                                                 
                                                    <hr class="mb-4"
                                                        style="height: 2px; background-color: #1266f1; opacity: 1;">

                                                    <div class="d-flex justify-content-between px-x">
                                                        <p class="fw-bold">Tax:</p>
                                                        <p class="fw-bold" id="taxRentAmount">$ 0</p>
                                                    </div>
                                                    <div class="d-flex justify-content-between p-2 mb-2"
                                                        style="background-color: #e1f5fe;">
                                                        <h5 class="fw-bold mb-0">Total:</h5>
                                                        <h5 class="fw-bold mb-0"  id="totalRentAmount">$ 0</h5>
                                                    </div>

                                                </div>

                                                <a type="button" href="checkout-form.html"
                                                    class="btn btn-primary btn-block checkout-btn text-white">
                                                    Go to checkout
                                                </a>
                                            </div>
                                            <div  id="emptyCartMessage" class=" row d-none">
                                                <div class="col px-2 py-2 px-md-5 py-md-4">
                                                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">You have zero cars in cart!</h3>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <!-- cart dropdown close -->
                    <div class="dropdown">
                        <a class="nav-icon position-relative text-decoration-none dropdown-toggle"
                            data-bs-auto-close="outside" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa fa-fw fa-user text-dark mr-3"></i>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <li><a class="dropdown-item" href="../html/profile.html">Profile</a></li>
                            <li><a class="dropdown-item" onclick="logoutAction()" href="#">Logout</a></li>
                            <!-- <li><a class="dropdown-item" href="#"></a></li> -->
                        </ul>
                    </div>
                </div>

            </div>
        </div>

    </div>
</nav>`

const navSection = document.getElementById('navSection')
navSection.appendChild(navElement)

}


loadNavBar()