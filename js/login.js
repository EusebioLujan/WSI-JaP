document.getElementById("ingresar").addEventListener("click", function(e){
    e.preventDefault()
    const user = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    usernameError.textContent = "";
    passwordError.textContent = "";
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    let valid = true;

    if (!user) {
        usernameError.textContent = "El nombre de usuario es obligatorio.";
        valid = false;
    }
    else if (!password) {
        passwordError.textContent = "La contraseña es obligatoria.";
        valid = false;
    }
    else if (user && !usernameRegex.test(user)) {
        usernameError.textContent = "El nombre de usuario no debe contener signos especiales.";
        valid = false;
    }
    else if (password && password.length < 6) {
        passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        valid = false;
    }
    else if (!user || !password){
        alert("Los Campos no deben venir vacios")
    }
    else if (valid) {
        localStorage.setItem("logeado", true);
        localStorage.setItem("user", user);
        window.location= "index.html";
    }
    
})