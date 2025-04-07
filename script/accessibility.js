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
 */

/**
 * VARIABLES DE ESTADO
 * =================
 * Variables que guardan el estado actual de cada funcionalidad
 */
let fontSize = 1;
let highlightActive = false; // Estado del resaltado de texto
let paragraphHighlightActive = false; // Estado del resaltado de párrafos
let currentContrast = "default"; // Modo de contraste actual
let focusFrameToggle; // Variable global para el botón de recuadro de enfoque
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
export function setupTextHighlighter(buttonId = "highlighted-text") {
  const highlightBtn = document.getElementById(buttonId);
  let active = false;

  if (highlightBtn) {
    highlightBtn.addEventListener("click", () => {
      const elements = document.querySelectorAll(
        "p, li, h1, h2, h3, h4, h5, h6",
      );
      active = !active;
      elements.forEach((el) => {
        el.style.backgroundColor = active ? "#ffff99" : "";
      });
    });
  }
}

// Resaltar párrafos
export function setupParagraphHighlighter(
  buttonId = "paragraph-highlight-toggle",
) {
  const paragraphBtn = document.getElementById(buttonId);
  let enabled = false;

  if (paragraphBtn) {
    paragraphBtn.addEventListener("click", () => {
      const paragraphs = document.querySelectorAll("p");
      enabled = !enabled;
      paragraphs.forEach((p) => {
        p.style.border = enabled ? "2px solid orange" : "";
        p.style.padding = enabled ? "4px" : "";
        p.style.borderRadius = enabled ? "6px" : "";
        p.style.backgroundColor = enabled ? "#fff5e6" : "";
      });
    });
  }
}

function toggleDarkMode() {
  // Encuentra la hoja de estilos utilizada, en caso de existir
  const currentStylesheet = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]'),
  ).find((link) => {
    const href = link.getAttribute("href");
    return (
      href && (href.includes("styles.css") || href.includes("stylesDark.css"))
    );
  });

  if (currentStylesheet) {
    // Intercambio las hojas de estilos reemplazando el nombre de las mismas
    if (currentStylesheet.href.includes("styles.css"))
      currentStylesheet.href = currentStylesheet.href.replace(
        "styles.css",
        "stylesDark.css",
      );
    else
      currentStylesheet.href = currentStylesheet.href.replace(
        "stylesDark.css",
        "styles.css",
      );
  } else {
    // Si no hay hoja de estilos, creo una
    const newStylesheet = document.createElement("link");
    newStylesheet.rel = "stylesheet";
    newStylesheet.href = "stylesDark.css";
    document.head.appendChild(newStylesheet);
  }
}

function toggleGrayscale() {
  isGrayscale = !isGrayscale;

  // Crea un elemento para estilos siempre y cuando no exista de base
  let styleElement = document.getElementById("grayscale-style");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "grayscale-style";
    document.head.appendChild(styleElement);
  }

  // Modifica los elementos de estilos
  if (isGrayscale) {
    styleElement.textContent = `
      body > *:not(.accessibility-menu) {
        filter: grayscale(100%) !important;
      }
    `;
  } else styleElement.textContent = "";
}
