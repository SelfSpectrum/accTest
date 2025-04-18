/**
 * SISTEMA DE COOKIES CORREGIDO - HOSPITAL REGIONAL DE COPIAPÓ
 * ==========================================================
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
    
    // Cargar tamaño de fuente primero (esto es menos problemático)
    const savedFontSize = getCookie('fontSize');
    if (savedFontSize) {
      fontSize = parseFloat(savedFontSize);
      document.body.style.fontSize = fontSize + "em";
      console.log("Tamaño de fuente cargado:", fontSize);
    }
    
    // Cargar estados de resaltado
    const savedHighlightActive = getCookie('highlightActive');
    if (savedHighlightActive === '1' && !highlightActive) {
      toggleTextHighlighter();
      console.log("Resaltado de texto activado");
    }
    
    const savedParagraphHighlight = getCookie('paragraphHighlightActive');
    if (savedParagraphHighlight === '1' && !paragraphHighlightActive) {
      toggleParagraphHighlighter();
      console.log("Resaltado de párrafos activado");
    }
    
    // Cargar estado de recuadro de enfoque
    const savedFocusActive = getCookie('isFocusActive');
    if (savedFocusActive === '1' && !isFocusActive && overlay) {
      toggleFocusFeature();
      console.log("Recuadro de enfoque activado");
    }
    
    // Cargar estado de escala de grises
    const savedGrayscale = getCookie('isGrayscale');
    if (savedGrayscale === '1' && !isGrayscale) {
      toggleGrayscale();
      console.log("Escala de grises activada");
    }
    
    // Cargar esquema de contraste AL FINAL para evitar conflictos
    setTimeout(() => {
      const savedContrastScheme = getCookie('contrastScheme');
      if (savedContrastScheme) {
        console.log("Aplicando esquema de contraste:", savedContrastScheme);
        cambiarContrasteDesdeGuardado(savedContrastScheme);
      }
    }, 100); // Pequeño retraso para asegurar que los otros estilos estén cargados
  }
  
  // Modificación en la función cambiarContraste para usar correctamente las rutas
  function cambiarContrasteDesdeGuardado(nuevoEsquema) {
    // Buscar la hoja de estilos de contraste actual
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
  
    // CORRECCIÓN: Construir la ruta completa al nuevo esquema
    // Usamos la ruta relativa correcta: "../style/" en lugar de "../css/"
    const rutaCompleta = "../style/" + nuevoEsquema;
    console.log("Aplicando estilo:", rutaCompleta);
  
    if (hojaDeEstiloActual) {
      // Si encontramos una hoja de estilo, reemplazar su href
      hojaDeEstiloActual.href = rutaCompleta;
      console.log("Hoja de estilo existente actualizada:", hojaDeEstiloActual);
    } else {
      // Si no, crear una nueva hoja de estilo
      console.log("No se encontró una hoja de estilo. Creando nueva...");
      const nuevaHojaDeEstilo = document.createElement("link");
      nuevaHojaDeEstilo.rel = "stylesheet";
      nuevaHojaDeEstilo.href = rutaCompleta;
      document.head.appendChild(nuevaHojaDeEstilo);
    }
  
    // Actualizar variables y UI
    ultimoEsquemaSeleccionado = nuevoEsquema;
    actualizarBotonContraste(nuevoEsquema);
  }
  
  // Modificar la función original para que use el mismo método
  function cambiarContraste(nuevoEsquema) {
    // Buscar la hoja de estilos de contraste actual
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
  
    // CORRECCIÓN: Construir la ruta completa al nuevo esquema
    // Usamos la ruta relativa correcta: "../style/" en lugar de "../css/"
    const rutaCompleta = "../style/" + nuevoEsquema;
    console.log("Aplicando estilo desde cambiarContraste:", rutaCompleta);
  
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
    
    // Guardar preferencia
    saveAccessibilityPreferences();
  }
  
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
  
  // Función para actualizar los controles de accesibilidad según las preferencias
  function updateAccessibilityControls() {
    // Actualizar estado de los botones según las preferencias cargadas
    setTimeout(() => {
      // Aquí podrías actualizar visualmente los botones de la interfaz
      // según los estados actuales de las variables
      console.log("Controles de accesibilidad actualizados");
    }, 300);
  }
  
  // Modificaciones a las funciones existentes para guardar preferencias al cambiar
  
  // Función modificada para aumentar tamaño de fuente
  const originalIncreaseFontSize = window.increaseFontSize || function() {};
  window.increaseFontSize = function() {
    originalIncreaseFontSize();
    saveAccessibilityPreferences();
  };
  
  // Función modificada para disminuir tamaño de fuente
  const originalDecreaseFontSize = window.decreaseFontSize || function() {};
  window.decreaseFontSize = function() {
    originalDecreaseFontSize();
    saveAccessibilityPreferences();
  };
  
  // Función modificada para toggle de resaltado de texto
  const originalToggleTextHighlighter = window.toggleTextHighlighter || function() {};
  window.toggleTextHighlighter = function() {
    originalToggleTextHighlighter();
    saveAccessibilityPreferences();
  };
  
  // Función modificada para toggle de resaltado de párrafos
  const originalToggleParagraphHighlighter = window.toggleParagraphHighlighter || function() {};
  window.toggleParagraphHighlighter = function() {
    originalToggleParagraphHighlighter();
    saveAccessibilityPreferences();
  };
  
  // Función modificada para toggle de enfoque
  const originalToggleFocusFeature = window.toggleFocusFeature || function() {};
  window.toggleFocusFeature = function() {
    originalToggleFocusFeature();
    saveAccessibilityPreferences();
  };
  
  // Función modificada para toggle de escala de grises
  const originalToggleGrayscale = window.toggleGrayscale || function() {};
  window.toggleGrayscale = function() {
    originalToggleGrayscale();
    saveAccessibilityPreferences();
  };
  
  // Inicialización cuando el DOM está cargado
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado - Inicializando sistema de cookies");
    
    // Agregar botón de restablecer preferencias
    addResetButton();
    
    // Mostrar banner de consentimiento
    showCookieConsent();
    
    // Pequeño retraso para asegurar que todo el DOM está listo antes de cargar preferencias
    setTimeout(() => {
      // Cargar preferencias guardadas
      if (getCookie('cookieConsent') === 'accepted') {
        loadAccessibilityPreferences();
        updateAccessibilityControls();
      }
    }, 300);
  });
  
  // Asegurarse de que las preferencias se cargan incluso si el evento DOMContentLoaded ya ha pasado
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
      console.log("Documento ya cargado, iniciando sistema de cookies");
      addResetButton();
      showCookieConsent();
      
      if (getCookie('cookieConsent') === 'accepted') {
        loadAccessibilityPreferences();
        updateAccessibilityControls();
      }
    }, 500);
  }