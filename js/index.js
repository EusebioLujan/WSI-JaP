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
    document.getElementById("cerrar").addEventListener("click", function(){
        localStorage.setItem("logeado", false)
        window.location = "index.html"
    })
    
});

function Login_Check(){

    if(!localStorage.getItem("logeado")---"false"){
        alert("No estas logeado redireccionado")
        window.location = "login.html"

    }
    }


