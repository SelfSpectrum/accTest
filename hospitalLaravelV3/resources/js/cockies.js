/**
 * SISTEMA DE COOKIES - HOSPITAL REGIONAL DE COPIAPÓ
 * =================================================
 *
 * Este módulo implementa un sistema de cookies para guardar las preferencias de accesibilidad:
 * - Esquema de contraste seleccionado
 * - Tamaño de fuente
 * - Estado de resaltado de texto y párrafos
 * - Estado del recuadro de enfoque
 * - Estado del modo escala de grises
 */

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
  }
  
  // Función para cargar y aplicar las preferencias guardadas
  function loadAccessibilityPreferences() {
    // Cargar esquema de contraste
    const savedContrastScheme = getCookie('contrastScheme');
    if (savedContrastScheme) {
      cambiarContraste(savedContrastScheme);
    }
    
    // Cargar tamaño de fuente
    const savedFontSize = getCookie('fontSize');
    if (savedFontSize) {
      fontSize = parseFloat(savedFontSize);
      document.body.style.fontSize = fontSize + "em";
    }
    
    // Cargar estados de resaltado
    const savedHighlightActive = getCookie('highlightActive');
    if (savedHighlightActive === '1' && !highlightActive) {
      toggleTextHighlighter();
    }
    
    const savedParagraphHighlight = getCookie('paragraphHighlightActive');
    if (savedParagraphHighlight === '1' && !paragraphHighlightActive) {
      toggleParagraphHighlighter();
    }
    
    // Cargar estado de recuadro de enfoque
    const savedFocusActive = getCookie('isFocusActive');
    if (savedFocusActive === '1' && !isFocusActive) {
      toggleFocusFeature();
    }
    
    // Cargar estado de escala de grises
    const savedGrayscale = getCookie('isGrayscale');
    if (savedGrayscale === '1' && !isGrayscale) {
      toggleGrayscale();
    }
  }
  
  // Modificar las funciones existentes para guardar preferencias al cambiar
  
  // Función modificada para aumentar tamaño de fuente
  function increaseFontSize() {
    fontSize += 0.1;
    document.body.style.fontSize = fontSize + "em";
    saveAccessibilityPreferences();
  }
  
  // Función modificada para disminuir tamaño de fuente
  function decreaseFontSize() {
    fontSize = Math.max(0.5, fontSize - 0.1);
    document.body.style.fontSize = fontSize + "em";
    saveAccessibilityPreferences();
  }
  
  // Función modificada para toggle de resaltado de texto
  function toggleTextHighlighter() {
    highlightActive = !highlightActive;
    document.body.classList.toggle("text-highlighted", highlightActive);
    saveAccessibilityPreferences();
  }
  
  // Función modificada para toggle de resaltado de párrafos
  function toggleParagraphHighlighter() {
    paragraphHighlightActive = !paragraphHighlightActive;
    document.body.classList.toggle("paragraphs-highlighted", paragraphHighlightActive);
    saveAccessibilityPreferences();
  }
  
  // Función modificada para cambiar contraste
  function cambiarContraste(nuevoEsquema) {
    // Código existente para cambiar el contraste
    const hojaDeEstiloActual = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
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
  
    const rutaCompleta = "../css/" + nuevoEsquema;
  
    if (hojaDeEstiloActual) {
      hojaDeEstiloActual.href = rutaCompleta;
    } else {
      const nuevaHojaDeEstilo = document.createElement("link");
      nuevaHojaDeEstilo.rel = "stylesheet";
      nuevaHojaDeEstilo.href = rutaCompleta;
      document.head.appendChild(nuevaHojaDeEstilo);
    }
  
    ultimoEsquemaSeleccionado = nuevoEsquema;
    actualizarBotonContraste(nuevoEsquema);
    
    // Guardar preferencia
    saveAccessibilityPreferences();
  }
  
  // Función modificada para toggle de enfoque
  function toggleFocusFeature() {
    if (!overlay) {
      console.warn("Overlay no listo aún.");
      return;
    }
  
    isFocusActive = !isFocusActive;
    overlay.classList.toggle("focus-active", isFocusActive);
    
    // Guardar preferencia
    saveAccessibilityPreferences();
  }
  
  // Función modificada para toggle de escala de grises
  function toggleGrayscale() {
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
    
    // Guardar preferencia
    saveAccessibilityPreferences();
  }
  
  // Añadir cargar preferencias cuando DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    // Código existente de DOMContentLoaded
    overlay = document.getElementById("focus-overlay");
  
    if (!overlay) {
      console.error("Error Crítico: No se encontró el elemento #focus-overlay.");
      return;
    }
  
    // Cargar preferencias guardadas
    loadAccessibilityPreferences();
    
    // Resto del código existente...
  });
  
  // Agregar botón para restablecer preferencias (opcional)
  function addResetButton() {
    const accessibilityContainer = document.querySelector('.accessibility-container');
    if (!accessibilityContainer) return;
    
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Restablecer Preferencias';
    resetButton.className = 'btn btn-warning elemento-enfocable';
    resetButton.tabIndex = 4;
    resetButton.onclick = function() {
      // Eliminar todas las cookies de preferencias
      deleteCookie('contrastScheme');
      deleteCookie('fontSize');
      deleteCookie('highlightActive');
      deleteCookie('paragraphHighlightActive');
      deleteCookie('isFocusActive');
      deleteCookie('isGrayscale');
      
      // Recargar la página para aplicar los valores predeterminados
      window.location.reload();
    };
    
    accessibilityContainer.appendChild(resetButton);
  }
  
  // Llamar a la función para agregar el botón de restablecimiento
  document.addEventListener("DOMContentLoaded", addResetButton);
  
  // Banner de consentimiento de cookies (cumplimiento GDPR)
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
  
  // Mostrar banner de consentimiento al cargar la página
  document.addEventListener("DOMContentLoaded", showCookieConsent);