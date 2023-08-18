// contactForm.js

function handleSubmit(event) {
    event.preventDefault();
  
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const mobile = document.querySelector("#mobile").value;
    const message = document.querySelector("#message").value;
  
    // Get error message container
    const errorContainer = document.querySelector("#errorContainer");
    errorContainer.innerHTML = ""; // Clear previous error messages
  
    // Perform validation
    if (firstName === "") {
      showError("Please enter your first name.", errorContainer);
      return; // Prevent further execution
    }
    if (lastName === "") {
      showError("Please enter your last name.", errorContainer);
      return;
    }
    if (email === "") {
      showError("Please enter your email.", errorContainer);
      return;
    }
    if (mobile === "") {
      showError("Please enter your mobile number.", errorContainer);
      return;
    }
    if (message === "") {
      showError("Please enter your message.", errorContainer);
      return;
    }
  
    // If all fields are filled, proceed with form submission
    // You can also perform AJAX request or other actions here
    alert("Form submitted successfully!");
  }
  
  function showError(message, container) {
    const errorElement = document.createElement("p");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    container.appendChild(errorElement);
  }
  
  const submitButton = document.querySelector("#submitButton");
  submitButton.addEventListener("click", handleSubmit);
  