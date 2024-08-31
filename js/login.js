import hashPassword from "./hashpwd.js";
document.getElementById("registrar").addEventListener("click",()=>{
    window.location="register.html"
})

document.getElementById("ingresar").addEventListener("click", async function(e) {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    usernameError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    if (!email) {
        usernameError.textContent = "El correo electrónico es obligatorio.";
        valid = false;
    } else if (!password) {
        passwordError.textContent = "La contraseña es obligatoria.";
        valid = false;
    } else if (password.length < 6) {
        passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        valid = false;
    }

    if (valid) {
        const hashedPassword = await hashPassword(password);

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === email && user.password === hashedPassword);

        if (user) {
            localStorage.setItem("logeado", true);
            localStorage.setItem("user", user.firstName);
            window.location.href = "index.html";
        } else {
            usernameError.textContent = "";
            passwordError.textContent = "";
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Correo electrónico o contraseña incorrectos.',
                confirmButtonText: 'Aceptar'
            });
        }
    }
});
