export function setupFileInputListener() {
  document.getElementById("fileInput").addEventListener("change", function () {
    const confirmButton = document.getElementById("confirmButton");
    confirmButton.disabled = !(this.files && this.files.length > 0);
  });
}
