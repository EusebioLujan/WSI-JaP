function applyDarkMode(isDarkMode) {
  if (isDarkMode) {
      document.body.classList.add("dark");
      document.getElementById("switch").classList.add("active");
      document.querySelector("i.fa-sun").style.display = "none";
      document.querySelector("i.fa-moon").style.display = "inline";
      
      const elementsToDarkMode = document.querySelectorAll("label");
      elementsToDarkMode.forEach(el => {
          el.classList.add("dark-mode");
      });
  } else {
      document.body.classList.remove("dark");
      document.getElementById("switch").classList.remove("active");
      document.querySelector("i.fa-sun").style.display = "inline";
      document.querySelector("i.fa-moon").style.display = "none";
      
      const elementsToDarkMode = document.querySelectorAll("label");
      elementsToDarkMode.forEach(el => {
          el.classList.remove("dark-mode");
      });
  }
}

const savedMode = localStorage.getItem("mode");
const isDarkMode = savedMode === "dark";
applyDarkMode(isDarkMode);

document.getElementById("switch").addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  this.classList.toggle("active");
  document.querySelector("i.fa-sun").style.display = isDark ? "none" : "inline";
  document.querySelector("i.fa-moon").style.display = isDark ? "inline" : "none";
  localStorage.setItem("mode", isDark ? "dark" : "light");
  const elementsToDarkMode = document.querySelectorAll("label");
  elementsToDarkMode.forEach(el => {
      el.classList.toggle("dark-mode");
  });
});
