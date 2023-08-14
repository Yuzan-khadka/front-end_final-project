window.addEventListener('load', function() {
    // This event listener will run when the entire page, including stylesheets, images, and other resources, has finished loading.
  
    // Find the loader wrapper element
    var loaderWrapper = document.querySelector('.loader-wrapper');
  
    // Hide the loader after at least 2 seconds
    if (loaderWrapper) {
      setTimeout(function() {
        loaderWrapper.style.display = 'none'; // Set display to 'none' to hide the loader
        loaderWrapper.style.zIndex = '-1';   // Set z-index to -1 to place it behind other content
      }, 4000); // 4000 milliseconds = 4 seconds
    }
  });
  