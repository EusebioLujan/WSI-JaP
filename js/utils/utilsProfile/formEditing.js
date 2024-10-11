export function enableFormEditing() {
  document.querySelectorAll("input").forEach((input) => {
    input.disabled = false;
  });
  document.getElementById("saveButton").disabled = false;
  document.getElementById("editButton").classList.add("active");
}
