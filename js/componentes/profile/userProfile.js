export function initializeUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("nombre").value = user.firstName || "";
    document.getElementById("segundoNombre").value = user.secondName || "";
    document.getElementById("apellido").value = user.lastName || "";
    document.getElementById("segundoApellido").value =
      user.secondLastName || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("telefono").value = user.phone || "";
    document.getElementById("profileImage").src =
      user.image || "img/img_perfil.png";
  }
}
