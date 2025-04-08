/**
 * SISTEMA DE ACCESIBILIDAD - HOSPITAL REGIONAL DE COPIAPÓ
 * ======================================================
 *
 * Este archivo JavaScript implementa múltiples características de accesibilidad:
 * 1. Modos de alto contraste con varias combinaciones de colores (WCAG 2.1)
 * 2. Ajuste de tamaño de texto
 * 3. Resaltado de texto para mejorar visibilidad
 * 4. Recuadro de enfoque horizontal para ayudar en la lectura
 * 5. Resaltado de párrafos con múltiples señales visuales
 *
 * Todas las funciones están diseñadas para trabajar de forma independiente
 * o en combinación, adaptándose a las necesidades específicas de cada usuario.
 * ====================================
 * VARIABLES DE ESTADO
 * ====================================
 * Variables que guardan el estado actual de cada funcionalidad
 */
let fontSize = 1;
let highlightActive = false; // Estado del resaltado de texto
let paragraphHighlightActive = false; // Estado del resaltado de párrafos
let ultimoEsquemaSeleccionado = "styles.css"; // Variable para mantener referencia al último esquema seleccionado
let focusFrameToggle = false; // Variable global para el botón de recuadro de enfoque
let isGrayscale = false; // Determina si se debe o no activar el modo escala de grises

// Aumentar y Disminuir texto
function increaseFontSize() {
  fontSize += 0.1;
  document.body.style.fontSize = fontSize + "em";
}

function decreaseFontSize() {
  fontSize = Math.max(0.5, fontSize - 0.1);
  document.body.style.fontSize = fontSize + "em";
}

// Resaltar texto general
function toggleTextHighlighter() {
  highlightActive = !highlightActive;
  document.body.classList.toggle("text-highlighted", highlightActive);
}

// Resaltar párrafos
function toggleParagraphHighlighter() {
  paragraphHighlightActive = !paragraphHighlightActive;
  document.body.classList.toggle(
    "paragraphs-highlighted",
    paragraphHighlightActive,
  );
}

/**
 * SISTEMA DE CONTRASTE - HOSPITAL REGIONAL DE COPIAPÓ
 * ===================================================
 *
 * Sistema de contraste basado en intercambio completo de hojas de estilo
 * Implementa esquemas de alto contraste según estándares WCAG
 */

/**
 * Cambia entre diferentes esquemas de contraste
 * @param {string} nuevoEsquema - Nombre del archivo CSS a aplicar
 */
function cambiarContraste(nuevoEsquema) {
  // Buscar la hoja de estilos de contraste actual
  const hojaDeEstiloActual = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]'),
  ).find((link) => {
    const href = link.getAttribute("href");
    return (
      href &&
      (href.includes("styles.css") ||
        href.includes("contrast-red.css") ||
        href.includes("contrast-green.css") ||
        href.includes("contrast-blue.css") ||
        href.includes("contrast-yellow.css") ||
        href.includes("contrast-dark.css") ||
        href.includes("stylesDark.css"))
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
  const botonContraste = document.getElementById("contrast-toggle");
  if (!botonContraste) return;

  let textoBoton = "Modo de Alto Contraste";

  if (nombreArchivo.includes("contrast-red")) {
    textoBoton = "Contraste: Blanco sobre Rojo";
  } else if (nombreArchivo.includes("contrast-green")) {
    textoBoton = "Contraste: Blanco sobre Verde";
  } else if (nombreArchivo.includes("contrast-blue")) {
    textoBoton = "Contraste: Blanco sobre Azul";
  } else if (nombreArchivo.includes("contrast-yellow")) {
    textoBoton = "Contraste: Negro sobre Amarillo";
  } else if (nombreArchivo.includes("contrast-dark")) {
    textoBoton = "Contraste: Negro sobre Blanco";
  } else if (nombreArchivo.includes("stylesDark")) {
    textoBoton = "Modo Oscuro";
  }

  botonContraste.textContent = textoBoton;
}

/**
 * Guarda la preferencia de contraste en localStorage
 */
function guardarContrasteActual() {
  localStorage.setItem("esquemaContraste", ultimoEsquemaSeleccionado);
}

/**
 * Carga el esquema de contraste guardado
 */
function cargarContrasteGuardado() {
  const contrasteGuardado = localStorage.getItem("esquemaContraste");
  if (contrasteGuardado) {
    cambiarContraste(contrasteGuardado);
  }
}

/*
 * ===
 * Sistema de filtros
 * ===
 */

function toggleGrayscale() {
  isGrayscale = !isGrayscale;

  // Create a style element once if it doesn't exist
  let styleElement = document.getElementById("grayscale-style");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "grayscale-style";
    document.head.appendChild(styleElement);
  }

  // Toggle the stylesheet content
  if (isGrayscale) {
    styleElement.textContent = `
      body > *:not(.accessibility-menu) {
        filter: grayscale(100%) !important;
      }
    `;
  } else {
    styleElement.textContent = "";
  }
}
