const $ = function(id){
    return document.getElementById(id)
}
// to prevent reload
function validateForm(event){
    event.preventDefault()
}

// to check if the input field is null
function checkNull(event){
    const field  = event.target
    const error = field.nextElementSibling
    const label = field.previousElementSibling.textContent.trim()
    if (field.value === ""){
        error.textContent = `${label} is required`
    }else{
        error.textContent = ''
    } 
}

// function to check email
function checkEmail(event){
    const emailField = event.target
    const emailValue = emailField.value.trim()
    const error = emailField.nextElementSibling

    if(!isValidEmail(emailValue)){
        error.textContent = "Invalid email format."
    }else{
        error.textContent = ""
    }
}

// function to check password
function checkPassword(event) {
    const passwordField = event.target;
    const passwordValue = passwordField.value;
    const error = passwordField.nextElementSibling;

   if (!isValidPassword(passwordValue)) {
        error.textContent = "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number";
    } else {
        error.textContent = "";
    }
}

// checking if the password and confirm password match
function checkConfirmPassword(event){
    const confirmPasswordField = event.target;
    const confirmPasswordValue = confirmPasswordField.value;
    const error = confirmPasswordField.nextElementSibling;
    const password = $('password')

    if (password.value === ""){
        const error = password.nextElementSibling
        error.textContent = "Password is require before you can type confirm Password."
        confirmPasswordField.value = ""
    }else if (confirmPasswordValue !== password.value){
        error.textContent = "Password and Confirm Password should be same."
    }else{
        error.textContent = ''
    }
}
// to valid the email by using regex.
function isValidEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}