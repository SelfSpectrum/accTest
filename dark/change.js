// Crear el HTML dinámicamente
document.body.innerHTML = `
    <div class="container text-center mt-5">
        <h1 class="mb-4">Texto</h1>
        <button id="themeButton" class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;"><i id="iconTheme" class="bi bi-moon"></i></button>
        <p class = "p1">
        Hamana
        </p>
    </div>
`;

// Crear y agregar la hoja de estilos
let themeLink = document.createElement("link");
themeLink.id = "theme";
themeLink.rel = "stylesheet";
themeLink.href = "light.css"; // Tema por defecto
document.head.appendChild(themeLink);

// Agregar funcionalidad al botón
document.getElementById("themeButton").addEventListener("click", function() {
    let icon = document.getElementById("iconTheme");

    if (themeLink.href.includes("light.css")) {
        themeLink.href = "dark.css";
        this.classList.replace("btn-dark", "btn-light"); // Cambia el color del botón
        icon.classList.replace("bi-moon", "bi-brightness-high"); // Cambia ícono a luna
    } else {
        themeLink.href = "light.css";
        this.classList.replace("btn-light", "btn-dark");
        icon.classList.replace("bi-brightness-high", "bi-moon"); // Cambia ícono a sol
    }
});
