document.addEventListener("DOMContentLoaded", () => {
  Login_Check();
  
  const userName = JSON.parse(localStorage.getItem("user"));
  if (userName) {
      const userLi = document.createElement("div");
    //   const userBtn = document.createElement("p");
    //   const logoutBtn = document.createElement("button");
      const navbarNav = document.querySelector(".navbar-nav");

      userLi.innerHTML = ` 
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Bienvenid@, ${userName.firstName}
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
            <li><button class="btn btn-danger btn-outline-light ms-2" id="logout">Cerrar sesión</button></li>
        </ul>
      `;

      userLi.className = "nav-item d-flex align-items-center dropdown";

      navbarNav.appendChild(userLi);
  }

  document.getElementById("logout").addEventListener("click", function() {
    localStorage.setItem("logeado", "false"); // Guardar como cadena
    localStorage.removeItem("user");
    Login_Check();
  });
});

function Login_Check() {
  const logeado = localStorage.getItem("logeado");
  
  // Asegúrate de que la verificación sea con cadena de texto
  if (!logeado || logeado === "false") {
      Swal.fire({
          icon: 'warning',
          text: 'No estás logeado, redireccionando al login...',
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
          location.href = "login.html";
      });
  }
}


