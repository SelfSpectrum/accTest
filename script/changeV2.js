// Crear el HTML dinámicamente
document.body.innerHTML += `
    <div>

        <button id="themeButton" class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;"><i id="iconTheme" class="bi bi-moon"></i>
        </button>

        <button id="grayscaleButton" class="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;"><i class="bi bi-palette"></i></button>
    </div>

`;

// Crear y agregar la hoja de estilos
let themeLink = document.createElement("link");
themeLink.id = "theme";
themeLink.rel = "stylesheet";
themeLink.href = "./style/styles.css"; // Tema por defecto
document.head.appendChild(themeLink);

// Agregar funcionalidad al botón
document.getElementById("themeButton").addEventListener("click", function () {
  let icon = document.getElementById("iconTheme");

  if (themeLink.href.includes("styles.css")) {
    themeLink.href = "./style/stylesDark.css";
    this.classList.replace("btn-dark", "btn-light"); // Cambia el color del botón
    icon.classList.replace("bi-moon", "bi-brightness-high"); // Cambia ícono a luna
  } else {
    themeLink.href = "./style/styles.css";
    this.classList.replace("btn-light", "btn-dark");
    icon.classList.replace("bi-brightness-high", "bi-moon"); // Cambia ícono a sol
  }
});

// Agregar funcionalidad al botón de escala de grises
document
  .getElementById("grayscaleButton")
  .addEventListener("click", function () {
    document.body.classList.toggle("grayscale");

    // Cambiar el estilo del botón según el estado
    if (document.body.classList.contains("grayscale")) {
      this.classList.replace("btn-secondary", "btn-info");
    } else {
      this.classList.replace("btn-info", "btn-secondary");
    }
  });
