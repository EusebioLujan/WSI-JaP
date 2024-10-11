let tempImageSrc = null;

function updateUserProfileImage() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (tempImageSrc) {
            user.image = tempImageSrc;
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Imagen de perfil actualizada correctamente.');
            tempImageSrc = null;
        } else {
            console.error('El source de la imagen está vacío.');
        }
    } else {
        console.error('No se encontró el usuario en el localStorage.');
    }
}

function handleFileSelect(fileInput) {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            tempImageSrc = e.target.result;
            console.log('Imagen seleccionada. Haz clic en "Guardar cambios" para actualizar.');
        };
        reader.readAsDataURL(file);
    } else {
        console.error('No se seleccionó ningún archivo.');
    }
}

function saveProfileImage() {
    updateUserProfileImage();
}

function initializeProfileImageUpdater({ fileInputId, confirmButtonId, profileImageId, successMessage }) {
    const fileInputElement = document.getElementById(fileInputId);
    const confirmButtonElement = document.getElementById(confirmButtonId);
    const profileImageElement = document.getElementById(profileImageId);

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.image) {
        profileImageElement.src = user.image;
    }

    fileInputElement.addEventListener('change', () => {
        handleFileSelect(fileInputElement);
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImageElement.src = e.target.result;
        };
        reader.readAsDataURL(fileInputElement.files[0]);
    });

    confirmButtonElement.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: successMessage,
            timer: 3000
        });

        saveProfileImage();
        fileInputElement.value = "";
    });
}

export { initializeProfileImageUpdater };


/*initializeProfileImageUpdater({
        fileInputId: 'fileInput',
        confirmButtonId: 'confirmButton',
        profileImageId: 'profileImage',
        successMessage: '¡Datos Registrados actualizados con éxito!'
    });*/ 