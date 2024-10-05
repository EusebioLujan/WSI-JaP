document.addEventListener("DOMContentLoaded", () => {
  Login_Check();
  
  const userName = localStorage.getItem("user");
  if (userName) {
      const userLi = document.createElement("li");
      const userP = document.createElement("p");
      const logoutBtn = document.createElement("button");
      const navbarNav = document.querySelector(".navbar-nav");

      userP.innerHTML = ` <a href="my-profile.html">Bienvenid@, ${userName} </a>`;

      logoutBtn.textContent = "Cerrar sesión";

      userLi.className = "nav-item d-flex align-items-center";
      userP.className = "nav-link m-0";
      logoutBtn.className = "btn btn-danger btn-outline-light ms-2";

      logoutBtn.addEventListener("click", function() {
          localStorage.setItem("logeado", "false"); // Guardar como cadena
          localStorage.removeItem("user");
          Login_Check();
      });

      userLi.appendChild(userP);
      userLi.appendChild(logoutBtn);
      navbarNav.appendChild(userLi);
  }
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
