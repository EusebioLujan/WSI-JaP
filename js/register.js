import hashPassword from "./utils/hashpwd.js";

document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const firstName = document.getElementById("nombre").value.trim();
        const lastName = document.getElementById("apellido").value.trim();
        const email = document.getElementById("correo").value.trim();
        const password = document.getElementById("contraseña").value.trim();
        if (!firstName || !lastName || !email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios y no pueden estar vacíos.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Obtener usuarios almacenados
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Verificar si el correo ya está en uso
        const emailExists = users.some(user => user.email === email);

        if (emailExists) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El correo electrónico ya se encuentra en uso.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Si el correo no está en uso, proceder con el registro
        const hashedPassword = await hashPassword(password);

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            image:null,
            phone:null
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        console.log(localStorage.getItem("users"));

        Swal.fire({
            icon: 'success',
            title: '¡Datos Registrados con Éxito!',
            text: 'Aguarde Mientras Re-direccionamos.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              }
        }).then(() => {
            location.href = 'login.html';
        });
    });
});
