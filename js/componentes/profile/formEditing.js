export function enableFormEditing() {
  const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='tel']");

  inputs.forEach((input) => {
    input.disabled = false;        
    input.classList.add("editable"); 
  });
  document.getElementById("saveButton").disabled = false;
  document.getElementById("editButton").classList.add("active");
}
