document.addEventListener("DOMContentLoaded", function() {
  const registrationForm = document.getElementById("registrationForm");
  
  registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const firstName = document.getElementById("nombre").value.trim();
      const lastName = document.getElementById("apellido").value.trim();
      const email = document.getElementById("correo").value.trim();
      const password = document.getElementById("contraseña").value.trim();

      // Validación para asegurarse de que no guarde ningun campo vacio
      if (!firstName || !lastName || !email || !password) {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Todos los campos son obligatorios y no pueden estar vacíos.',
              confirmButtonText: 'Aceptar'
          });
          return;
      }

      const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
console.log(users);

      Swal.fire({
          icon: 'success',
          title: '¡Datos Registrados con Éxito!',
          text: 'Aguarde Mientras Re-direccionamos.',
          timer: 3000,
          confirmButtonText: 'Aceptar'
      }).then(() => {
          location.href = 'login.html';
      });
  });
});
