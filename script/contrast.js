document.body.innerHTML += `
    
    <div>
        <button id="contrastButton" class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;">
            <i id="iconContrast" class="bi bi-circle-half"></i>
        </button>
    </div>
`;

let contador = 0; // Contador cíclico: 0 (Normal), 1 (Bajo), 2 (Alto)

document.getElementById("contrastButton").addEventListener("click", function() {
    let icon = document.getElementById("iconContrast");
    let body = document.body;

    // Eliminar clases previas de contraste
    body.classList.remove("bajo-contraste", "alto-contraste");

    if (contador === 0) {
        body.classList.add("bajo-contraste");
        this.classList.replace("btn-dark", "btn-secondary"); // Cambia el color del botón
        icon.classList.replace("bi-circle-half", "bi-eye"); // Cambia icono a "ojo"
    } else if (contador === 1) {
        body.classList.add("alto-contraste");
        this.classList.replace("btn-secondary", "btn-light");
        icon.classList.replace("bi-eye", "bi-eye-fill"); // Cambia icono a "ojo lleno"
    } else {
        this.classList.replace("btn-light", "btn-dark");
        icon.classList.replace("bi-eye-fill", "bi-circle-half"); // Icono original
    }

    // Aumentar el contador y reiniciar si llega a 3
    contador = (contador + 1) % 3;
});