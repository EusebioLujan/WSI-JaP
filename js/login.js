document.getElementById("ingresar").addEventListener("click", function(){
    const user = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    if(!user || !password)
        alert ("Campos vacíos")
    else window.location.href = "index.html"
})