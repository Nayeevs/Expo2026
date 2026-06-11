const darkModeBtn = document.getElementById("darkModeBtn");

window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark-mode");
        darkModeBtn.querySelector(".material-symbols-outlined").textContent = "light_mode";
    }

});

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = darkModeBtn.querySelector(".material-symbols-outlined");

    if(document.body.classList.contains("dark-mode")){
        icon.textContent = "light_mode";
        localStorage.setItem("theme","dark");
    }else{
        icon.textContent = "dark_mode";
        localStorage.setItem("theme","light");
    }

});