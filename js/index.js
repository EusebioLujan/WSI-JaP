document.addEventListener("DOMContentLoaded", function(){
    Login_Check();
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function Login_Check(){
console.log("get item logeado:",localStorage.getItem("logeado"));

    if(localStorage.getItem("logeado")===false){
        console.log("entre al if");
        
        alert("No estas logeado redireccionando")
        window.location = "login.html"
    }
}