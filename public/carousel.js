let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel img');

function changeImage(direction) {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length; 
    images[currentImageIndex].classList.add('active'); 
}
