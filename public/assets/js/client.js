function filterMenu(category) {
    let items = document.querySelectorAll(".menu-card");

    items.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
