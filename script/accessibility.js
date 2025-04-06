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
let fontSize = 16; // Tamaño de fuente base en píxeles
let highlightActive = false; // Estado del resaltado de texto
let paragraphHighlightActive = false; // Estado del resaltado de párrafos
let currentContrast = "default"; // Modo de contraste actual
let focusFrameToggle; // Variable global para el botón de recuadro de enfoque
let isGrayscale = false; // Determina si se debe o no activar el modo escala de grises

document.addEventListener("DOMContentLoaded", function () {
  /**
   * SELECCIÓN DE ELEMENTOS DOM
   * =============================
   * Seleccionamos todos los elementos necesarios para las funcionalidades
   * y declaramos variables de estado
   */

  // Elementos del menú de accesibilidad
  const menu = document.querySelector(".accessibility-menu");

  // Elementos para modos de contraste
  const contrastToggle = document.getElementById("contrast-toggle");
  const contrastSubmenu = document.querySelector(".contrast-submenu");
  const contrastOptions = document.querySelectorAll(".contrast-submenu button");

  // Elementos para ajuste de tamaño de texto
  const increaseFont = document.getElementById("increase-font");
  const decreaseFont = document.getElementById("decrease-font");

  // Elementos para funciones de resaltado y enfoque
  const highlightedText = document.getElementById("highlighted-text");
  focusFrameToggle = document.getElementById("focus-frame-toggle");
  const paragraphHighlightToggle = document.getElementById(
    "paragraph-highlight-toggle",
  );

  /**
   * MODOS DE ALTO CONTRASTE
   * =====================
   * Múltiples opciones de contraste que cumplen con estándares de accesibilidad WCAG
   */

  // Mostrar/ocultar submenú de opciones de contraste
  contrastToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // Evitar que el clic se propague al documento
    contrastSubmenu.style.display =
      contrastSubmenu.style.display === "block" ? "none" : "block";
  });

  // Cerrar submenú de contraste al hacer clic fuera
  document.addEventListener("click", function (e) {
    if (
      !contrastToggle.contains(e.target) &&
      !contrastSubmenu.contains(e.target)
    ) {
      contrastSubmenu.style.display = "none";
    }
  });

  // Manejar selección de opciones de contraste
  contrastOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedContrast = this.getAttribute("data-contrast");

      // Eliminar clases de contraste anteriores
      document.body.classList.remove(
        "contrast-dark",
        "contrast-yellow",
        "contrast-blue",
        "contrast-green",
        "contrast-red",
      );

      // Forzar actualización de estilos (resuelve problemas de caché de estilo)
      void document.body.offsetWidth;

      // Actualizar estado actual
      if (selectedContrast !== "default") {
        // Aplicar nuevo modo de contraste
        document.body.classList.add("contrast-" + selectedContrast);
        currentContrast = selectedContrast;

        // Forzar aplicación de estilos en elementos problemáticos
        document
          .querySelectorAll(
            "a, button, input, h1, h2, h3, h4, h5, h6, p, li, span",
          )
          .forEach((el) =>
            el.setAttribute("data-contrast-applied", selectedContrast),
          );
      } else {
        // Volver al modo normal
        currentContrast = "default";

        // Limpiar atributos de contraste
        document
          .querySelectorAll("[data-contrast-applied]")
          .forEach((el) => el.removeAttribute("data-contrast-applied"));

        // Restaurar colores originales donde sea necesario
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
      }

      // Cerrar submenú
      contrastSubmenu.style.display = "none";

      // Actualizar texto del botón para mostrar la opción seleccionada
      if (selectedContrast === "default") {
        contrastToggle.textContent = "Modo de Alto Contraste";
      } else {
        contrastToggle.textContent =
          "Contraste: " + this.textContent.split(" (")[0];
      }

      // Actualizar otras funcionalidades activas para mantener compatibilidad
      updateActiveFeatures();
    });
  });

  /**
   * AJUSTE DE TAMAÑO DE TEXTO
   * =======================
   * Aumentar o disminuir el tamaño de todo el texto del sitio
   */

  // Aumentar tamaño de texto
  increaseFont.addEventListener("click", function () {
    fontSize += 2; // Incremento de 2px por clic
    document.body.style.fontSize = fontSize + "px";
  });

  // Disminuir tamaño de texto
  decreaseFont.addEventListener("click", function () {
    if (fontSize > 12) {
      // Límite inferior para evitar texto demasiado pequeño
      fontSize -= 2;
      document.body.style.fontSize = fontSize + "px";
    }
  });

  /**
   * RESALTADO DE TEXTO
   * ================
   * Resalta todo el texto de la página para mejorar su visibilidad
   * Guarda los estilos originales para restaurarlos después
   */

  // Activar/Desactivar resaltado de texto - VERSIÓN MEJORADA
  highlightedText.addEventListener("click", function () {
    if (!highlightActive) {
      // Seleccionar todos los elementos de texto relevantes
      const textElements = document.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6, li, a",
      );

      textElements.forEach((el) => {
        // Guardar estilos originales
        if (!el.dataset.originalStyles) {
          // Guardar estilos completos
          const styles = window.getComputedStyle(el);
          el.dataset.originalColor = styles.color;
          el.dataset.originalBg = styles.backgroundColor;
          el.dataset.originalBorder = styles.border;
        }

        // Añadir clase de resaltado con máxima prioridad
        el.classList.add("highlighted-text");

        // Forzar aplicación del resaltado incluso con modos de contraste
        if (currentContrast !== "default") {
          // Determinar qué colores usar según el modo de contraste
          let bgColor, textColor;

          switch (currentContrast) {
            case "dark":
            case "yellow":
              bgColor = currentContrast === "dark" ? "#FFFF00" : "#FF9900";
              textColor = "#000000";
              break;
            case "blue":
            case "green":
            case "red":
              bgColor = "#FFFFFF";
              textColor = "#000000";
              break;
          }

          // Aplicar estilos directamente
          el.style.setProperty("background-color", bgColor, "important");
          el.style.setProperty("color", textColor, "important");
        }
      });

      // Actualizar texto del botón
      highlightedText.textContent = "Desactivar Resaltado";
    } else {
      // Quitar resaltado
      const textElements = document.querySelectorAll(".highlighted-text");

      textElements.forEach((el) => {
        el.classList.remove("highlighted-text");

        // Eliminar estilos inline forzados
        el.style.removeProperty("background-color");
        el.style.removeProperty("color");
        el.style.removeProperty("border");

        // Restaurar estilos originales solo si no hay modo de contraste activo
        if (currentContrast === "default" && el.dataset.originalColor) {
          el.style.color = el.dataset.originalColor;
          el.style.backgroundColor = el.dataset.originalBg;
        }
      });

      // Restaurar texto del botón
      highlightedText.textContent = "Resaltar texto";
    }

    // Cambiar estado
    highlightActive = !highlightActive;
  });

  /**
   * RESALTADO DE PÁRRAFOS
   * ===================
   * Aplica múltiples señales visuales a párrafos para mejor distinción
   * Utiliza bordes, sombras y líneas decorativas
   */

  // Activar/Desactivar resaltado de párrafos
  paragraphHighlightToggle.addEventListener("click", function () {
    if (!paragraphHighlightActive) {
      // Seleccionar todos los párrafos
      const paragraphs = document.querySelectorAll("p");

      paragraphs.forEach((paragraph) => {
        // Guardar estilos originales para restaurarlos después
        paragraph.dataset.originalPadding = paragraph.style.padding;
        paragraph.dataset.originalMargin = paragraph.style.margin;
        paragraph.dataset.originalBorder = paragraph.style.border;

        // Añadir clase de resaltado
        paragraph.classList.add("paragraph-highlighted");

        // Asegurar buen contraste entre texto y fondo
        const computedStyle = window.getComputedStyle(paragraph);
        const backgroundColor = computedStyle.backgroundColor;

        // No necesitamos ajustar si el fondo es claro
        // Si fuera oscuro, podríamos ajustar el color del texto
      });

      // Informar al usuario que la función está activa
      paragraphHighlightToggle.textContent = "Desactivar Resaltado de Párrafos";
    } else {
      // Quitar resaltado de párrafos
      const highlightedParagraphs = document.querySelectorAll(
        ".paragraph-highlighted",
      );
      highlightedParagraphs.forEach((paragraph) => {
        paragraph.classList.remove("paragraph-highlighted");

        // Restaurar estilos originales si existían
        if (paragraph.dataset.originalPadding)
          paragraph.style.padding = paragraph.dataset.originalPadding;

        if (paragraph.dataset.originalMargin)
          paragraph.style.margin = paragraph.dataset.originalMargin;

        if (paragraph.dataset.originalBorder)
          paragraph.style.border = paragraph.dataset.originalBorder;
      });

      // Restaurar texto del botón
      paragraphHighlightToggle.textContent = "Resaltar Párrafos";
    }

    // Cambiar estado
    paragraphHighlightActive = !paragraphHighlightActive;
  });

  /**
   * COMPATIBILIDAD ENTRE FUNCIONALIDADES
   * =================================
   * Funciones que aseguran que todas las características de accesibilidad
   * funcionen correctamente cuando se utilizan juntas
   */

  // Actualizar funcionalidades activas cuando cambia el modo de contraste
  function updateActiveFeatures() {
    // Si el resaltado de texto está activo, volver a aplicar con colores correctos
    if (highlightActive) {
      const textElements = document.querySelectorAll(".highlighted-text");

      textElements.forEach((el) => {
        // Determinar colores según el modo de contraste
        let bgColor, textColor;

        switch (currentContrast) {
          case "default":
            bgColor = "yellow";
            textColor = "black";
            break;
          case "dark":
          case "yellow":
            bgColor = currentContrast === "dark" ? "#FFFF00" : "#FF9900";
            textColor = "#000000";
            break;
          case "blue":
          case "green":
          case "red":
            bgColor = "#FFFFFF";
            textColor = "#000000";
            break;
        }

        // Aplicar estilos directamente con máxima prioridad
        el.style.setProperty("background-color", bgColor, "important");
        el.style.setProperty("color", textColor, "important");
      });
    }

    // Si el recuadro de enfoque está activo, recrearlo para asegurar compatibilidad
    if (uniqueFocusActive) {
      // Recrear el recuadro de enfoque
      createUniqueFocusElements();
      showUniqueFocus();
    }
  }

  /**
   * AJUSTES RESPONSIVOS
   * =================
   * Manejar cambios de tamaño de ventana y otros eventos globales
   */

  // Actualizar recuadro de enfoque al cambiar tamaño de ventana
  window.addEventListener("resize", function () {
    if (uniqueFocusActive && uniqueFocusContainer) {
      // Actualizar posición del recuadro cuando cambia el tamaño de la ventana
      updateUniqueFocusPosition({
        clientY: window.innerHeight / 2,
      });
    }
  });

  /**
   * IMPLEMENTACIÓN DEFINITIVA DEL RECUADRO DE ENFOQUE - VERSIÓN COMPATIBLE CON CONTRASTE
   * =================================================================================
   * Esta implementación garantiza que el recuadro de enfoque funcione correctamente
   * incluso cuando se utilizan los diferentes modos de contraste.
   */

  // Variables globales para el recuadro de enfoque
  let uniqueFocusActive = false;
  let uniqueFocusContainer = null;
  let uniqueFocusTop = null;
  let uniqueFocusArea = null;
  let uniqueFocusBottom = null;
  let uniqueFocusHeight = 120;

  // Función para crear el recuadro de enfoque - VERSIÓN MEJORADA
  function createUniqueFocusElements() {
    console.log("Creando elementos del recuadro de enfoque definitivo");

    // Eliminar elementos existentes para evitar duplicados
    removeUniqueFocusElements();

    // Crear el contenedor principal
    uniqueFocusContainer = document.createElement("div");
    uniqueFocusContainer.id = "unique-focus-container";

    // Forzar estilos base directamente en el elemento
    Object.assign(uniqueFocusContainer.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9999",
      backgroundColor: "transparent",
    });

    // Crear overlay superior
    uniqueFocusTop = document.createElement("div");
    uniqueFocusTop.id = "unique-focus-top";

    // Forzar estilos en el overlay superior
    Object.assign(uniqueFocusTop.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      opacity: "1",
      mixBlendMode: "normal",
    });

    // Crear área de enfoque
    uniqueFocusArea = document.createElement("div");
    uniqueFocusArea.id = "unique-focus-area";

    // Forzar estilos en el área de enfoque
    Object.assign(uniqueFocusArea.style, {
      position: "absolute",
      left: "0",
      width: "100%",
      height: uniqueFocusHeight + "px",
      backgroundColor: "transparent",
      borderTop: "2px dashed rgba(255, 255, 255, 0.7)",
      borderBottom: "2px dashed rgba(255, 255, 255, 0.7)",
    });

    // Crear overlay inferior
    uniqueFocusBottom = document.createElement("div");
    uniqueFocusBottom.id = "unique-focus-bottom";

    // Forzar estilos en el overlay inferior
    Object.assign(uniqueFocusBottom.style, {
      position: "absolute",
      left: "0",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      opacity: "1",
      mixBlendMode: "normal",
    });

    // Estructurar los elementos
    uniqueFocusContainer.appendChild(uniqueFocusTop);
    uniqueFocusContainer.appendChild(uniqueFocusArea);
    uniqueFocusContainer.appendChild(uniqueFocusBottom);

    // Importante: Añadir al body al final para que aparezca por encima de todo
    document.body.appendChild(uniqueFocusContainer);

    console.log("Elementos del recuadro creados satisfactoriamente");
  }

  // Función para eliminar los elementos del recuadro
  function removeUniqueFocusElements() {
    const existingContainer = document.getElementById("unique-focus-container");
    if (existingContainer) {
      existingContainer.remove();
    }

    uniqueFocusContainer = null;
    uniqueFocusTop = null;
    uniqueFocusArea = null;
    uniqueFocusBottom = null;
  }

  // Función para actualizar la posición del recuadro - VERSIÓN MEJORADA
  function updateUniqueFocusPosition(e) {
    if (
      !uniqueFocusContainer ||
      !uniqueFocusTop ||
      !uniqueFocusArea ||
      !uniqueFocusBottom
    ) {
      console.error("Error: Elementos del recuadro no encontrados");
      return;
    }

    // Obtener la posición del cursor
    const mouseY = e.clientY;

    // Calcular posiciones
    const windowHeight = window.innerHeight;
    const halfAreaHeight = uniqueFocusHeight / 2;

    // Posicionar el área de enfoque centrada en el cursor
    let areaTop = mouseY - halfAreaHeight;

    // Asegurar que el área de enfoque no se salga de la pantalla
    if (areaTop < 0) areaTop = 0;
    if (areaTop + uniqueFocusHeight > windowHeight)
      areaTop = windowHeight - uniqueFocusHeight;

    // Posicionar y dimensionar todos los elementos con setProperty para máxima prioridad
    uniqueFocusArea.style.setProperty("top", areaTop + "px", "important");
    uniqueFocusArea.style.setProperty(
      "height",
      uniqueFocusHeight + "px",
      "important",
    );

    uniqueFocusTop.style.setProperty("height", areaTop + "px", "important");

    uniqueFocusBottom.style.setProperty(
      "top",
      areaTop + uniqueFocusHeight + "px",
      "important",
    );
    uniqueFocusBottom.style.setProperty(
      "height",
      windowHeight - areaTop - uniqueFocusHeight + "px",
      "important",
    );
  }

  // Función para mostrar el recuadro de enfoque - VERSIÓN MEJORADA
  function showUniqueFocus() {
    if (uniqueFocusContainer) {
      // Usar setProperty para garantizar que se aplica
      uniqueFocusContainer.style.setProperty("display", "block", "important");

      // Posicionar inicialmente en el centro de la pantalla
      updateUniqueFocusPosition({
        clientY: window.innerHeight / 2,
      });

      // Agregar evento de movimiento del ratón
      document.addEventListener("mousemove", updateUniqueFocusPosition);

      // Forzar que los overlays siempre tengan el color correcto
      uniqueFocusTop.style.setProperty(
        "background-color",
        "rgba(0, 0, 0, 0.7)",
        "important",
      );
      uniqueFocusBottom.style.setProperty(
        "background-color",
        "rgba(0, 0, 0, 0.7)",
        "important",
      );
    }
  }

  // Función para ocultar el recuadro de enfoque - VERSIÓN MEJORADA
  function hideUniqueFocus() {
    if (uniqueFocusContainer) {
      uniqueFocusContainer.style.setProperty("display", "none", "important");

      // Quitar el listener de movimiento del ratón
      document.removeEventListener("mousemove", updateUniqueFocusPosition);
    }
  }

  // Función principal para activar/desactivar el recuadro de enfoque
  function toggleUniqueFocus() {
    console.log(
      "Ejecutando toggleUniqueFocus, estado actual:",
      uniqueFocusActive,
    );

    if (!uniqueFocusActive) {
      // Activar el recuadro de enfoque
      createUniqueFocusElements();
      showUniqueFocus();
      uniqueFocusActive = true;

      // Actualizar texto del botón
      if (focusFrameToggle) {
        focusFrameToggle.textContent = "Desactivar Recuadro de Enfoque";
      }

      console.log("Recuadro de enfoque activado correctamente");
    } else {
      // Desactivar el recuadro de enfoque
      hideUniqueFocus();
      removeUniqueFocusElements();
      uniqueFocusActive = false;

      // Actualizar texto del botón
      if (focusFrameToggle) {
        focusFrameToggle.textContent = "Recuadro de Enfoque";
      }

      console.log("Recuadro de enfoque desactivado correctamente");
    }
  }

  // Asociar la nueva función al botón existente
  if (focusFrameToggle) {
    // Eliminar todos los event listeners anteriores
    const newButton = focusFrameToggle.cloneNode(true);
    focusFrameToggle.parentNode.replaceChild(newButton, focusFrameToggle);

    // Reasignar la referencia al nuevo botón
    focusFrameToggle = newButton;

    // Añadir el nuevo event listener
    focusFrameToggle.addEventListener("click", toggleUniqueFocus);
    console.log(
      "Event listener del recuadro de enfoque actualizado correctamente",
    );
  }
});

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
