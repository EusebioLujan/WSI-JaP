import { initializeProfileImageUpdater } from "./imageUpdater.js";
import { renderProfileForm } from "../js/utils/utilsProfile/profileForm.js";
import { initializeUserProfile } from "../js/utils/utilsProfile/userProfile.js";
import { enableFormEditing } from "../js/utils/utilsProfile/formEditing.js";
import { saveProfileChanges } from "../js/utils/utilsProfile/saveProfile.js";
import { setupFileInputListener } from "../js/utils/utilsProfile/fileInput.js";

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
