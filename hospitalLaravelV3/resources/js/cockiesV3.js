/**
 * SISTEMA DE COOKIES MEJORADO - HOSPITAL REGIONAL DE COPIAPÓ
 * =========================================================
 * Versión que garantiza que todas las preferencias funcionen simultáneamente
 */

// Variables para rastrear el estado de carga
let isLoadingPreferences = false;
let preferencesLoaded = false;

// Función para establecer una cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

// Función para obtener el valor de una cookie
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Función para borrar una cookie
function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
}

// Función para guardar todas las preferencias actuales
function saveAccessibilityPreferences() {
  // Si estamos en proceso de cargar preferencias, no guardamos para evitar ciclos
  if (isLoadingPreferences) return;
  
  // Guardar esquema de contraste
  setCookie('contrastScheme', ultimoEsquemaSeleccionado, 30);
  
  // Guardar tamaño de fuente
  setCookie('fontSize', fontSize, 30);
  
  // Guardar estados de resaltado
  setCookie('highlightActive', highlightActive ? '1' : '0', 30);
  setCookie('paragraphHighlightActive', paragraphHighlightActive ? '1' : '0', 30);
  
  // Guardar estado de recuadro de enfoque
  setCookie('isFocusActive', isFocusActive ? '1' : '0', 30);
  
  // Guardar estado de escala de grises
  setCookie('isGrayscale', isGrayscale ? '1' : '0', 30);
  
  console.log("Preferencias guardadas:", {
    esquema: ultimoEsquemaSeleccionado,
    fontSize: fontSize,
    highlight: highlightActive,
    paragraphHighlight: paragraphHighlightActive,
    focus: isFocusActive,
    grayscale: isGrayscale
  });
}

// Función para cargar y aplicar las preferencias guardadas
function loadAccessibilityPreferences() {
  console.log("Cargando preferencias...");
  
  // Marcar que estamos cargando preferencias para evitar guardar durante este proceso
  isLoadingPreferences = true;
  
  try {
    // Cargar tamaño de fuente
    const savedFontSize = getCookie('fontSize');
    if (savedFontSize) {
      fontSize = parseFloat(savedFontSize);
      document.body.style.fontSize = fontSize + "em";
      console.log("Tamaño de fuente cargado:", fontSize);
    }
    
    // Cargar estado de escala de grises
    const savedGrayscale = getCookie('isGrayscale');
    if (savedGrayscale === '1') {
      // Aplicar directamente en lugar de toggle para evitar cambiar el estado
      isGrayscale = true;
      applyGrayscale();
      console.log("Escala de grises activada");
    }
    
    // Cargar estados de resaltado
    const savedHighlightActive = getCookie('highlightActive');
    if (savedHighlightActive === '1') {
      // Aplicar directamente en lugar de toggle
      highlightActive = true;
      document.body.classList.add("text-highlighted");
      console.log("Resaltado de texto activado");
    }
    
    const savedParagraphHighlight = getCookie('paragraphHighlightActive');
    if (savedParagraphHighlight === '1') {
      // Aplicar directamente en lugar de toggle
      paragraphHighlightActive = true;
      document.body.classList.add("paragraphs-highlighted");
      console.log("Resaltado de párrafos activado");
    }
    
    // Cargar estado de recuadro de enfoque
    const savedFocusActive = getCookie('isFocusActive');
    if (savedFocusActive === '1' && overlay) {
      // Aplicar directamente en lugar de toggle
      isFocusActive = true;
      overlay.classList.add("focus-active");
      console.log("Recuadro de enfoque activado");
    }
    
    // Cargar esquema de contraste AL FINAL
    const savedContrastScheme = getCookie('contrastScheme');
    if (savedContrastScheme) {
      console.log("Aplicando esquema de contraste:", savedContrastScheme);
      // Guardar el valor antes de aplicar
      ultimoEsquemaSeleccionado = savedContrastScheme;
      // Aplicar el contraste sin guardar preferencias de nuevo
      aplicarContrasteDirectamente(savedContrastScheme);
    }
    
    // Marcar que las preferencias se han cargado correctamente
    preferencesLoaded = true;
  } catch (error) {
    console.error("Error al cargar preferencias:", error);
  } finally {
    // Siempre desmarcar que estamos cargando, incluso si hay error
    setTimeout(() => {
      isLoadingPreferences = false;
    }, 500);
  }
}

// Función para aplicar grayscale directamente
function applyGrayscale() {
  let styleElement = document.getElementById("grayscale-style");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "grayscale-style";
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = `
    body > *:not(.accessibility-menu) {
      filter: grayscale(100%) !important;
    }
  `;
}

// Función para aplicar contraste directamente sin guardar preferencias
function aplicarContrasteDirectamente(nuevoEsquema) {
  // Buscar todas las hojas de estilo principales
  const hojasDeEstilo = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  );
  
  // Buscar específicamente la hoja de estilo principal/contraste
  const hojaDeEstiloActual = hojasDeEstilo.find((link) => {
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

  // Construir la ruta completa
  const rutaCompleta = "../style/" + nuevoEsquema;
  console.log("Aplicando estilo directamente:", rutaCompleta);

  // Aplicar el estilo
  if (hojaDeEstiloActual) {
    console.log("Encontrada hoja de estilo para actualizar:", hojaDeEstiloActual.href);
    hojaDeEstiloActual.href = rutaCompleta;
  } else {
    console.log("No se encontró hoja de estilo principal. Creando nueva...");
    const nuevaHojaDeEstilo = document.createElement("link");
    nuevaHojaDeEstilo.rel = "stylesheet";
    nuevaHojaDeEstilo.href = rutaCompleta;
    document.head.appendChild(nuevaHojaDeEstilo);
  }

  // Actualizar el botón de contraste
  actualizarBotonContraste(nuevoEsquema);
}

// Modificar la función original de cambiar contraste
function cambiarContraste(nuevoEsquema) {
  // No hacer nada si estamos cargando preferencias
  if (isLoadingPreferences) return;
  
  // Actualizar la variable global
  ultimoEsquemaSeleccionado = nuevoEsquema;
  
  // Aplicar el contraste
  aplicarContrasteDirectamente(nuevoEsquema);
  
  // Guardar preferencia
  saveAccessibilityPreferences();
}

// Sobrescribir las funciones originales para integrar el guardado de cookies
// Aumento de tamaño de fuente
function increaseFontSize() {
  if (isLoadingPreferences) return;
  
  fontSize += 0.1;
  document.body.style.fontSize = fontSize + "em";
  
  saveAccessibilityPreferences();
}

// Disminución de tamaño de fuente
function decreaseFontSize() {
  if (isLoadingPreferences) return;
  
  fontSize = Math.max(0.5, fontSize - 0.1);
  document.body.style.fontSize = fontSize + "em";
  
  saveAccessibilityPreferences();
}

// Toggle de resaltado de texto
function toggleTextHighlighter() {
  if (isLoadingPreferences) return;
  
  highlightActive = !highlightActive;
  document.body.classList.toggle("text-highlighted", highlightActive);
  
  saveAccessibilityPreferences();
}

// Toggle de resaltado de párrafos
function toggleParagraphHighlighter() {
  if (isLoadingPreferences) return;
  
  paragraphHighlightActive = !paragraphHighlightActive;
  document.body.classList.toggle("paragraphs-highlighted", paragraphHighlightActive);
  
  saveAccessibilityPreferences();
}

// Toggle de recuadro de enfoque
function toggleFocusFeature() {
  if (isLoadingPreferences) return;
  
  if (!overlay) {
    console.warn("Overlay no listo aún.");
    return;
  }

  isFocusActive = !isFocusActive;
  overlay.classList.toggle("focus-active", isFocusActive);
  
  saveAccessibilityPreferences();
}

// Toggle de escala de grises
function toggleGrayscale() {
  if (isLoadingPreferences) return;
  
  isGrayscale = !isGrayscale;

  let styleElement = document.getElementById("grayscale-style");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "grayscale-style";
    document.head.appendChild(styleElement);
  }

  if (isGrayscale) {
    styleElement.textContent = `
      body > *:not(.accessibility-menu) {
        filter: grayscale(100%) !important;
      }
    `;
  } else {
    styleElement.textContent = "";
  }
  
  saveAccessibilityPreferences();
}

// Banner de consentimiento de cookies
function showCookieConsent() {
  // Verificar si ya se dio consentimiento
  if (getCookie('cookieConsent')) return;
  
  const consentBanner = document.createElement('div');
  consentBanner.style.position = 'fixed';
  consentBanner.style.bottom = '0';
  consentBanner.style.left = '0';
  consentBanner.style.width = '100%';
  consentBanner.style.padding = '10px 20px';
  consentBanner.style.backgroundColor = '#f8f9fa';
  consentBanner.style.borderTop = '1px solid #dee2e6';
  consentBanner.style.zIndex = '1000';
  consentBanner.style.display = 'flex';
  consentBanner.style.justifyContent = 'space-between';
  consentBanner.style.alignItems = 'center';
  
  consentBanner.innerHTML = `
    <p style="margin: 0">Este sitio utiliza cookies para guardar sus preferencias de accesibilidad.</p>
    <div>
      <button id="accept-cookies" class="btn btn-primary" style="margin-right: 10px;">Aceptar</button>
      <button id="decline-cookies" class="btn btn-secondary">Rechazar</button>
    </div>
  `;
  
  document.body.appendChild(consentBanner);
  
  // Evento para aceptar cookies
  document.getElementById('accept-cookies').addEventListener('click', function() {
    setCookie('cookieConsent', 'accepted', 365);
    consentBanner.remove();
  });
  
  // Evento para rechazar cookies
  document.getElementById('decline-cookies').addEventListener('click', function() {
    setCookie('cookieConsent', 'declined', 365);
    consentBanner.remove();
  });
}

// Agregar botón para restablecer preferencias
function addResetButton() {
  // Esperar a que el DOM esté completamente cargado
  setTimeout(() => {
    const accessibilityContainer = document.querySelector('.accessibility-menu');
    if (!accessibilityContainer) {
      console.error("No se encontró el contenedor de accesibilidad");
      return;
    }
    
    // Verificar si el botón ya existe para evitar duplicados
    if (document.getElementById('reset-preferences')) return;
    
    const resetButton = document.createElement('div');
    resetButton.className = 'btn-group dropup';
    resetButton.innerHTML = `
      <button id="reset-preferences" type="button" class="btn btn-warning dropdown-btn elemento-enfocable" tabindex="4">
        Restablecer Preferencias
      </button>
    `;
    
    accessibilityContainer.appendChild(resetButton);
    
    // Añadir el evento de clic
    document.getElementById('reset-preferences').addEventListener('click', function() {
      // Eliminar todas las cookies de preferencias
      deleteCookie('contrastScheme');
      deleteCookie('fontSize');
      deleteCookie('highlightActive');
      deleteCookie('paragraphHighlightActive');
      deleteCookie('isFocusActive');
      deleteCookie('isGrayscale');
      
      console.log("Preferencias restablecidas");
      
      // Recargar la página para aplicar los valores predeterminados
      window.location.reload();
    });
  }, 500); // Pequeño retraso para asegurar que el DOM esté listo
}

// Inicialización cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM cargado - Inicializando sistema de cookies");
  
  // Agregar botón de restablecer preferencias
  addResetButton();
  
  // Mostrar banner de consentimiento
  showCookieConsent();
  
  // Pequeño retraso para cargar preferencias
  setTimeout(() => {
    // Cargar preferencias guardadas
    if (getCookie('cookieConsent') === 'accepted') {
      loadAccessibilityPreferences();
    }
  }, 500);
});

// Asegurarse de que las preferencias se cargan incluso si el evento DOMContentLoaded ya ha pasado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    console.log("Documento ya cargado, iniciando sistema de cookies");
    addResetButton();
    showCookieConsent();
    
    if (getCookie('cookieConsent') === 'accepted') {
      loadAccessibilityPreferences();
    }
  }, 500);
}