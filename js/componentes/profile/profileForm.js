export function renderProfileForm() {
  document.getElementById("container").innerHTML = `
        <div class="profile-container">
            <h2>Perfil de Usuario</h2>
            <hr>
            <form id="profileForm">
                <label for="fileInput">Foto de perfil</label>
                <img id="profileImage" src="" alt="Foto de perfil">
                <input type="file" id="fileInput">
                <button type="button" id="confirmButton" disabled>Actualizar Foto</button>
                <hr>
                <label for="nombre">Nombre*</label>
                <input type="text" id="nombre" required disabled>
                <label for="segundoNombre">Segundo Nombre</label>
                <input type="text" id="segundoNombre" disabled>
                <label for="apellido">Apellido*</label>
                <input type="text" id="apellido" required disabled>
                <label for="segundoApellido">Segundo Apellido</label>
                <input type="text" id="segundoApellido" disabled>
                <label for="email">E-mail*</label>
                <input type="email" id="email" required disabled>
                <label for="telefono">Teléfono de contacto</label>
                <input type="tel" id="telefono" disabled>
                <hr>
                <button type="button" id="editButton">Editar</button>
                <button type="submit" id="saveButton" disabled>Guardar cambios</button>
            </form>
        </div>
    `;
}
