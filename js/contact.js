// contact.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const submitButton = document.getElementById("submitButton");
    const errorContainer = document.getElementById("errorContainer");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Clear previous error messages
      errorContainer.innerHTML = "";
  
      // Validate each input field
      const inputs = form.querySelectorAll("input, textarea");
      let isValid = true;
  
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          const fieldName = input.getAttribute("placeholder");
          const errorMessage = `${fieldName} is required.`;
          const errorElement = document.createElement("div");
          errorElement.className = "error-message";
          errorElement.textContent = errorMessage;
          errorContainer.appendChild(errorElement);
        }
      });
  
      if (isValid) {
        // Submit the form if validation passes
        form.submit();
      }
    });
  });
  