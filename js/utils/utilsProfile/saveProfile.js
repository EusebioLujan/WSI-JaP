import { validateForm } from "../validateForm.js";

export function saveProfileChanges(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;

  if (!validateForm({ nombre, apellido, email, telefono })) {
    return;
  }

  const updatedUser = {
    firstName: nombre,
    secondName: document.getElementById("segundoNombre").value,
    lastName: apellido,
    secondLastName: document.getElementById("segundoApellido").value,
    email: email,
    phone: telefono,
    image: document.getElementById("profileImage").src,
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));
  Swal.fire({
    icon: "success",
    title: "Cambios guardados exitosamente",
    timer: 5000,
  }).then(() => {
    location.href = "my-profile.html";
  });

  document.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
  document.getElementById("saveButton").disabled = true;
  document.getElementById("confirmButton").disabled = true;
}
