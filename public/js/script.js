let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick =() => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
// home section
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelector(".wrapper");
    let index = 0;

    function nextSlide() {
        index++;
        if (index >= slides.children.length) {
            index = 0;
        }
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(nextSlide, 3000); // Change slide every 3 seconds
});
