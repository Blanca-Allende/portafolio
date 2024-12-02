function menuOnClick() {
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
    var hamburger = document.querySelector(".hamburger");

    if (hamburger.style.display === "none" || hamburger.style.display === "") {
        hamburger.style.display = "block";
        document.getElementById("menu-bar").innerHTML = '<i class="fas fa-times"></i>';
    } else {
        hamburger.style.display = "none";
        document.getElementById("menu-bar").innerHTML = '<i class="fas fa-bars"></i>';
    }
}