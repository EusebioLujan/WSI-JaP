document.addEventListener("DOMContentLoaded",()=>{
    Login_Check()
    const userName = localStorage.getItem("user");
    if (userName) {
        const userLi = document.createElement("li");
        const userP = document.createElement("p");
        const logoutBtn = document.createElement("button");
        const navbarNav = document.querySelector(".navbar-nav");

        userP.textContent = `Bienvenid@, ${userName}`;
        logoutBtn.textContent = "Cerrar sesión";

        userLi.className = "nav-item d-flex align-items-center";
        userP.className = "nav-link m-0";
        logoutBtn.className = "btn btn-danger btn-outline-light ms-2";
       
        logoutBtn.addEventListener("click", function() {
            localStorage.setItem("logeado",false);
            localStorage.removeItem("user");
            Login_Check();
        });

        userLi.appendChild(userP);
        userLi.appendChild(logoutBtn);
        navbarNav.appendChild(userLi);
    } 
});
function Login_Check(){
    if(localStorage.getItem("logeado")==="false"){
        alert("No estas logeado redireccionado")
        window.location = "login.html"
}}