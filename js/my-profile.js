import { initializeProfileImageUpdater } from "./imageUpdater.js";
import { renderProfileForm } from "./componentes/profile/profileForm.js";
import { initializeUserProfile } from "./componentes/profile/userProfile.js";
import { enableFormEditing } from "./componentes/profile/formEditing.js";
import { saveProfileChanges } from "./componentes/profile/saveProfile.js";
import { setupFileInputListener } from "./componentes/profile/fileInput.js";

document.addEventListener("DOMContentLoaded", () => {
  renderProfileForm();
  initializeUserProfile();

  document
    .getElementById("editButton")
    .addEventListener("click", enableFormEditing);
  document
    .getElementById("profileForm")
    .addEventListener("submit", saveProfileChanges);
  setupFileInputListener();

  initializeProfileImageUpdater({
    fileInputId: "fileInput",
    confirmButtonId: "confirmButton",
    profileImageId: "profileImage",
    successMessage: "¡Imagen de Perfil Actualizada!",
  });
});
