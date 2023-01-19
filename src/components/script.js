
    var hamburger = this.document.querySelector(".hamburger");
    var navmenu = this.document.querySelector(".navmenu");

    hamburger.addEventListener("click", function(){
        hamburger.classList.toggle("active");
        navmenu.classList.toggle("active");

    })