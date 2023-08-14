window.addEventListener('load', function() {
    // This event listener will run when the entire page, including stylesheets, images, and other resources, has finished loading.
  
    // Find the loader wrapper element
    var loaderWrapper = document.querySelector('.loader-wrapper');
  
    // Hide the loader after at least 2 seconds and remove it after the page is fully loaded
    if (loaderWrapper) {
      setTimeout(function() {
        loaderWrapper.style.display = 'none';
      }, 2000); // 2000 milliseconds = 2 seconds
  
      document.body.style.overflow = 'auto'; // Enable scrolling once the page is fully loaded
    }
  });
  