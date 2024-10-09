import { initializeProfileImageUpdater } from "./imageUpdater.js";


document.addEventListener('DOMContentLoaded', () => {
    
    
    initializeProfileImageUpdater({
        fileInputId: 'fileInput',
        confirmButtonId: 'confirmButton',
        profileImageId: 'profileImage',
        successMessage: '¡Datos Registrados actualizados con éxito!'
    });
});
