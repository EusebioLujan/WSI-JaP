export function renderProfileForm() {
    document.getElementById("container").innerHTML = `
          <div class="profile-container">
              <h2>Perfil de Usuario</h2>
              <hr>
              <form id="profileForm">
                  <div class="image-upload-container">
                      <label for="fileInput" class="file-label">
                          <img id="profileImage" src="" alt="Foto de perfil" class="profile-img">
                          <div class="overlay">
                              <span>Seleccionar Archivo</span>
                          </div>
                      </label>
                      <input type="file" id="fileInput" class="file-input">
                  </div>
                  <button type="button" id="confirmButton" disabled>Actualizar Foto</button>
                  <hr>
                  <div class="sector">
                  <div>
                  <label for="nombre">Nombre*</label>
                  <input type="text" id="nombre" required disabled>
                  </div>
                  <div>
                  <label for="segundoNombre">Segundo Nombre</label>
                  <input type="text" id="segundoNombre" disabled>
                  </div>
                  </div>
                  <div class="sector">
                  <div>
                  <label for="apellido">Apellido*</label>
                  <input type="text" id="apellido" required disabled>
                  </div>
                  <div>
                  <label for="segundoApellido">Segundo Apellido</label>
                  <input type="text" id="segundoApellido" disabled>
                  </div>
                  </div>
                  <div class="sector">
                  <div>
                  <label for="email">E-mail*</label>
                  <input type="email" id="email" required disabled>
                  </div>
                  <div>
                  <label for="telefono">Teléfono de contacto</label>
                  <input type="tel" id="telefono" disabled>
                  </div>
                  </div>
                  <hr>
                  <button type="button" id="editButton">Editar</button>
                  <button type="submit" id="saveButton" disabled>Guardar cambios</button>
              </form>
          </div>
      `;
  }
  