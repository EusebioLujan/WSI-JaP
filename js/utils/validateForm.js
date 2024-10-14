export function validateForm({ nombre, apellido, email, telefono }) {
  if (!nombre.trim() || !apellido.trim() || !email.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, completa todos los campos obligatorios (*).",
    });
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, introduce una dirección de correo electrónico válida.",
    });
    return false;
  }

  const phoneRegex = /^[0-9]+$/;
  if (telefono && !phoneRegex.test(telefono)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El número de teléfono solo debe contener números.",
    });
    return false;
  }
  return true;
}
