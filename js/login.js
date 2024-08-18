document.getElementById("ingresar").addEventListener("click",function(){
    const user = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    if(!user || !password){
        alert ("Campos vacios")
    }
    else{
        localStorage.setItem("logeado", true)
        window.location.href = "index.html"
    }
})