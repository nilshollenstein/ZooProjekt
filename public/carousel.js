let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel img');

function changeImage(direction) {
    images[currentImageIndex].classList.remove('active');
    images[currentImageIndex].style.opacity = 0;
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    images[currentImageIndex].classList.add('active');
    setTimeout(() => {
        images[currentImageIndex].style.opacity = 1;
    }, 10); // Minimale Verzögerung für sanften Übergang
}
