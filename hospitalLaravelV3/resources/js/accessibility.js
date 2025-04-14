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
let isFocusActive = false; // Comienza en 'false' (desactivado por defecto).
let overlay = null; // Variable para mantener la referencia al elemento overlay. Se asignará cuando el DOM esté listo.
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
  const rutaCompleta = "../css/" + nuevoEsquema;

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

// --- Función para Activar/Desactivar el Enfoque (Llamada desde onclick) ---
// Esta función DEBE ser accesible globalmente para que 'onclick' funcione.
function toggleFocusFeature() {
  // Comprobación: Si el overlay aún no ha sido encontrado por DOMContentLoaded, no hace nada.
  if (!overlay) {
    console.warn("Overlay no listo aún.");
    return;
  }

  // 1. Invierte el estado activo/inactivo.
  isFocusActive = !isFocusActive;

  // 2. Añade o quita la clase 'focus-active' del overlay.
  // El CSS asociado a esta clase lo mostrará u ocultará (`display: block/none`).
  overlay.classList.toggle("focus-active", isFocusActive);

  // 3. Opcional: Actualizar estilo/texto del botón (no implementado aquí).
  // const focusToggleButton = document.getElementById('focus-frame-toggle'); // Habría que obtenerlo aquí
  // if (focusToggleButton) { ... }
}

// --- Espera a que el HTML esté completamente cargado ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Asignar la referencia al overlay ahora que el DOM está listo ---
  overlay = document.getElementById("focus-overlay");

  // --- Verificación de Seguridad ---
  // Comprueba solo el overlay aquí, ya que el botón se maneja con onclick.
  if (!overlay) {
    console.error("Error Crítico: No se encontró el elemento #focus-overlay.");
    return;
  }

  // --- Configuración del Recuadro de Enfoque ---
  const focusHeight = 75; // Altura en píxeles

  // --- Función Principal: Actualizar la Posición del Enfoque ---
  // (Esta función puede permanecer dentro de DOMContentLoaded o estar fuera,
  // siempre que tenga acceso a 'isFocusActive' y 'overlay')
  function updateFocus(event) {
    // Si el efecto NO está activo (variable global 'isFocusActive'), no hace nada.
    if (!isFocusActive || !overlay) {
      return;
    }

    // Obtiene la posición Y del cursor.
    const mouseY = event.clientY;

    // Calcula las coordenadas verticales (Y) del agujero.
    const rectY = mouseY - focusHeight / 2;
    const y1 = rectY;
    const y2 = rectY + focusHeight;

    // Calcula las coordenadas horizontales (X) del agujero (ancho completo).
    const x1 = 0;
    const x2 = window.innerWidth;

    // Construye la cadena de texto para la propiedad CSS 'clip-path'.
    const clipPathValue = `polygon(
            evenodd,
            0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
            ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px ${y1}px
        )`;

    // Aplica el estilo al overlay.
    requestAnimationFrame(() => {
      if (isFocusActive && overlay) {
        // Doble chequeo
        overlay.style.clipPath = clipPathValue;
      }
    });
  }

  // --- Escuchadores de Eventos del Ratón (Configurados después de DOM ready) ---

  // Escucha el movimiento del ratón.
  document.addEventListener("mousemove", updateFocus);

  // Escucha cuando el cursor SALE de la ventana.
  document.addEventListener("mouseleave", () => {
    if (!isFocusActive || !overlay) return;
    requestAnimationFrame(() => {
      if (!overlay) return; // Check overlay again inside async operation
      const y1_off = -focusHeight - 10;
      const y2_off = -10;
      const x1 = 0;
      const x2 = window.innerWidth;
      overlay.style.clipPath = `polygon(
                evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
                ${x1}px ${y1_off}px, ${x2}px ${y1_off}px, ${x2}px ${y2_off}px, ${x1}px ${y2_off}px, ${x1}px ${y1_off}px
            )`;
    });
  });

  // Escucha cuando el cursor VUELVE A ENTRAR en la ventana.
  document.addEventListener("mouseenter", (e) => {
    if (!isFocusActive) return;
    updateFocus(e);
  });
}); // Fin del 'DOMContentLoaded'

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


///////////////////////////////////////////////////////////////////
// PROBANDO COSAS
///////////////////////////////////////////////////////////////////
document.addEventListener("keydown",deteccion )

  function deteccion(event) {
    const teclaPrecionada= event.key;
    console.log(teclaPrecionada)
    /*Función para mover el enfoque al siguiente elemento*/
    if( teclaPrecionada == "s") {
      const elementos = obtenerElementosEnfocables(); 
      if (elementos.length === 0) return;
      indiceActual = (indiceActual + 1) % elementos.length;
      const elementoActual = elementos[indiceActual];
      elementoActual.focus();
      elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    /* Funcion para mover al enfoque al anterior elemento */
    else if( teclaPrecionada == "a"){
      const elementos = obtenerElementosEnfocables(); 
      if (elementos.length === 0) return;
      indiceActual = (indiceActual - 1) % elementos.length;
      const elementoActual = elementos[indiceActual];
      elementoActual.focus();
      elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    /* Funcion para ir llamda de emergencia */
    else if( teclaPrecionada == "e"){
      const elementos = obtenerElementosEnfocables();
      if (elementos.length === 0) return;
      indiceActual = 12 % elementos.length;
      const elementoActual = elementos[indiceActual];
      elementoActual.focus();
      elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

/* Variable para seguir la posición actual del enfoque (índice en la lista de elementos enfocables) */
let indiceActual = 0;
function obtenerElementosEnfocables() {
    const elementos = Array.from(document.querySelectorAll('[tabindex]')) 
        .filter(el => el.tabIndex > 0)              
        .sort((a, b) => a.tabIndex - b.tabIndex);   
    return elementos;
}

/* Función que se ejecuta cuando se carga la página
pcionalmente, enfoca el primer elemento con tabindex */
window.onload = function() {
    const elementos = obtenerElementosEnfocables();
    if (elementos.length > 0) {
        elementos[0].focus();                       /*Enfoca el primero al cargar */
    }
};

//////////////////////////////////////////////////
//FIN DE PROBANDO COSAS
//////////////////////////////////////////////////