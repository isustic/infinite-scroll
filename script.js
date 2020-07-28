const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
const apiKey = 'mLIlf0ftelMAQOYs3ICqsmHArjUV0uM976yM6vqx2Ew';
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function checkImageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Create elements for Links & Photos, ADD to DOM

function displayPhotos() {
  // Run function for each object in photosArray

  photosArray.forEach((photo) => {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Create <a></a> to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    // Create img for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    // Create <img> inside <a></a>, then put both insinde imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);

    // Event listener, check when each is finished loading

    img.addEventListener('load', checkImageLoaded);


  });
}

// Get photos from Unsplash API

async function getPhotosFromUnsplashApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }

    catch(error) {

    }

    // Catch the erros here
}


// Check to see if scrolling near bottom of the page and load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       getPhotosFromUnsplashApi();
       ready = false;
    }
});

// On loading the page;

getPhotosFromUnsplashApi();
