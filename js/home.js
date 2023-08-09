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