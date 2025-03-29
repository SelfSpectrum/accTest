// Crear el HTML dinámicamente
document.body.innerHTML += `
    <div>
        
        <button id="themeButton" class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;"><i id="iconTheme" class="bi bi-moon"></i></button>
       
    </div>

    div>
        <button id="contrastButton" class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;">
            <i id="iconContrast" class="bi bi-circle-half"></i>
        </button>
    </div>
`;

// Crear y agregar la hoja de estilos
let themeLink = document.createElement("link");
themeLink.id = "theme";
themeLink.rel = "stylesheet";
themeLink.href = "styles.css"; // Tema por defecto
document.head.appendChild(themeLink);

// Agregar funcionalidad al botón
document.getElementById("themeButton").addEventListener("click", function() {
    let icon = document.getElementById("iconTheme");

    if (themeLink.href.includes("styles.css")) {
        themeLink.href = "stylesDark.css";
        this.classList.replace("btn-dark", "btn-light"); // Cambia el color del botón
        icon.classList.replace("bi-moon", "bi-brightness-high"); // Cambia ícono a luna
    } else {
        themeLink.href = "styles.css";
        this.classList.replace("btn-light", "btn-dark");
        icon.classList.replace("bi-brightness-high", "bi-moon"); // Cambia ícono a sol
    }
});

let estadoContraste = 0; // 0: Normal, 1: Bajo, 2: Alto

document.getElementById("contrastButton").addEventListener("click", function() {
    let icon = document.getElementById("iconContrast");
    let body = document.body;

    // Eliminar clases previas de contraste
    body.classList.remove("bajo-contraste", "alto-contraste");

    if (estadoContraste === 0) {
        body.classList.add("bajo-contraste");
        this.classList.replace("btn-dark", "btn-secondary"); // Cambia el color del botón
        icon.classList.replace("bi-circle-half", "bi-eye"); // Cambia icono a "ojo"
        estadoContraste = 1;
    } else if (estadoContraste === 1) {
        body.classList.add("alto-contraste");
        this.classList.replace("btn-secondary", "btn-light");
        icon.classList.replace("bi-eye", "bi-eye-fill"); // Cambia icono a "ojo lleno"
        estadoContraste = 2;
    } else {
        this.classList.replace("btn-light", "btn-dark");
        icon.classList.replace("bi-eye-fill", "bi-circle-half"); // Icono original
        estadoContraste = 0;
    }
});
