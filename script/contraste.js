/**
 * SISTEMA DE CONTRASTE - HOSPITAL REGIONAL DE COPIAPÓ
 * ===================================================
 * 
 * Sistema de contraste basado en intercambio completo de hojas de estilo
 * Implementa esquemas de alto contraste según estándares WCAG
 */

// Variable para mantener referencia al último esquema seleccionado
let ultimoEsquemaSeleccionado = "styles.css";

/**
 * Inicializa el sistema de contraste al cargar la página
 */
document.addEventListener("DOMContentLoaded", function() {
    // Configurar cierre del menú al hacer clic fuera
    document.addEventListener("click", function(e) {
        const contrastToggle = document.getElementById("contrast-toggle");
        const contrastSubmenu = document.querySelector(".contrast-submenu");
        
        if (contrastToggle && contrastSubmenu) {
            if (!contrastToggle.contains(e.target) && !contrastSubmenu.contains(e.target)) {
                contrastSubmenu.style.display = "none";
            }
        }
    });
    
    // Intentar cargar un esquema guardado
    cargarContrasteGuardado();
});

/**
 * Cambia entre diferentes esquemas de contraste
 * @param {string} nuevoEsquema - Nombre del archivo CSS a aplicar
 */
function cambiarContraste(nuevoEsquema) {
    // Buscar la hoja de estilos de contraste actual
    const hojaDeEstiloActual = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]')
    ).find(link => {
        const href = link.getAttribute("href");
        return href && (
            href.includes("styles.css") || 
            href.includes("contrast-red.css") ||
            href.includes("contrast-green.css") ||
            href.includes("contrast-blue.css") ||
            href.includes("contrast-yellow.css") ||
            href.includes("contrast-dark.css") ||
            href.includes("stylesDark.css")
        );
    });
    
    // Construir la ruta completa al nuevo esquema
    const rutaCompleta = "./style/" + nuevoEsquema;
    
    if (hojaDeEstiloActual) {
        // Si encontramos una hoja de estilo, reemplazar su href
        hojaDeEstiloActual.href = rutaCompleta;
    } else {
        // Si no, crear una nueva hoja de estilo
        const nuevaHojaDeEstilo = document.createElement("link");
        nuevaHojaDeEstilo.rel = "stylesheet";
        nuevaHojaDeEstilo.href = rutaCompleta;
        document.head.appendChild(nuevaHojaDeEstilo);
    }
    
    // Actualizar variables y UI
    ultimoEsquemaSeleccionado = nuevoEsquema;
    actualizarBotonContraste(nuevoEsquema);
    
    // Guardar preferencia del usuario
    guardarContrasteActual();
}

/**
 * Actualiza el texto del botón según el esquema seleccionado
 */
function actualizarBotonContraste(nombreArchivo) {
    const botonContraste = document.getElementById('contrast-toggle');
    if (!botonContraste) return;
    
    let textoBoton = "Modo de Alto Contraste";
    
    if (nombreArchivo.includes('contrast-red')) {
        textoBoton = "Contraste: Blanco sobre Rojo";
    } else if (nombreArchivo.includes('contrast-green')) {
        textoBoton = "Contraste: Blanco sobre Verde";
    } else if (nombreArchivo.includes('contrast-blue')) {
        textoBoton = "Contraste: Blanco sobre Azul";
    } else if (nombreArchivo.includes('contrast-yellow')) {
        textoBoton = "Contraste: Negro sobre Amarillo";
    } else if (nombreArchivo.includes('contrast-dark')) {
        textoBoton = "Contraste: Negro sobre Blanco";
    } else if (nombreArchivo.includes('stylesDark')) {
        textoBoton = "Modo Oscuro";
    }
    
    botonContraste.textContent = textoBoton;
}

/**
 * Guarda la preferencia de contraste en localStorage
 */
function guardarContrasteActual() {
    localStorage.setItem('esquemaContraste', ultimoEsquemaSeleccionado);
}

/**
 * Carga el esquema de contraste guardado
 */
function cargarContrasteGuardado() {
    const contrasteGuardado = localStorage.getItem('esquemaContraste');
    if (contrasteGuardado) {
        cambiarContraste(contrasteGuardado);
    }
}