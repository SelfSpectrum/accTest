// floating-buttons.js

document.addEventListener("DOMContentLoaded", function () {
  // Crear el contenedor principal
  const container = document.createElement("div");
  container.className = "floating-menu-container";
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 10px;
    z-index: 9999;
  `;

  // Crear el botón principal
  const mainButton = document.createElement("button");
  mainButton.className = "floating-main-button";
  mainButton.innerHTML = "<span>+</span>";
  mainButton.style.cssText = `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  `;

  // Botón para modo oscuro
  const darkModeButton = document.createElement("button");
  darkModeButton.className = "floating-option-button dark-mode-button";
  darkModeButton.innerHTML = "🌙";
  darkModeButton.title = "Modo Oscuro";
  darkModeButton.style.cssText = `
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #000000;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  `;

  // Botón para escala de grises
  const grayscaleButton = document.createElement("button");
  grayscaleButton.className = "floating-option-button grayscale-button";
  grayscaleButton.innerHTML = "◐";
  grayscaleButton.title = "Escala de Grises";
  grayscaleButton.style.cssText = `
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #6c757d;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  `;

  // Agregar los botones al contenedor
  container.appendChild(grayscaleButton);
  container.appendChild(darkModeButton);
  container.appendChild(mainButton);

  // Agregar el contenedor al body
  document.body.appendChild(container);

  // Variables para controlar estados
  let isMenuOpen = false;
  let isDarkMode = false;
  let isGrayscale = false;

  // Función para encontrar el elemento link de estilos actuales
  function findCurrentStylesheet() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    for (let i = 0; i < links.length; i++) {
      const href = links[i].getAttribute("href");
      if (
        href &&
        (href.includes("./style/styles.css") ||
          href.includes("./style/stylesDark.css"))
      ) {
        return links[i];
      }
    }
    return null;
  }

  // Función para abrir/cerrar el menú
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mainButton.innerHTML = "<span>×</span>";
      mainButton.style.transform = "rotate(45deg)";
      darkModeButton.style.display = "flex";
      grayscaleButton.style.display = "flex";
    } else {
      mainButton.innerHTML = "<span>+</span>";
      mainButton.style.transform = "rotate(0deg)";
      darkModeButton.style.display = "none";
      grayscaleButton.style.display = "none";
    }
  }

  // Función para activar/desactivar el modo oscuro
  function toggleDarkMode() {
    isDarkMode = !isDarkMode;

    // Buscar el elemento link actual para los estilos
    const currentStylesheet = findCurrentStylesheet();

    if (isDarkMode) {
      // Cambiar a modo claro
      if (currentStylesheet) {
        // Si encontramos el stylesheet actual, cambiamos su href
        currentStylesheet.href = currentStylesheet.href.replace(
          "./style/stylesDark.css",
          "./style/styles.css",
        );
      } else {
        // Si no encontramos ningún stylesheet, creamos uno nuevo
        const newStylesheet = document.createElement("link");
        newStylesheet.rel = "stylesheet";
        newStylesheet.href = "./style/styles.css";
        document.head.appendChild(newStylesheet);
      }

      // Cambiar color del botón a negro en modo claro
      darkModeButton.style.backgroundColor = "#000000";
      darkModeButton.style.color = "white";
    } else {
      // Cambiar a modo oscuro
      if (currentStylesheet) {
        // Si encontramos el stylesheet actual, cambiamos su href
        currentStylesheet.href = currentStylesheet.href.replace(
          "./style/styles.css",
          "./style/stylesDark.css",
        );
      } else {
        // Si no encontramos ningún stylesheet, creamos uno nuevo
        const newStylesheet = document.createElement("link");
        newStylesheet.rel = "stylesheet";
        newStylesheet.href = "./style/stylesDark.css";
        document.head.appendChild(newStylesheet);
      }

      // Cambiar color del botón a blanco en modo oscuro
      darkModeButton.style.backgroundColor = "#ffffff";
      darkModeButton.style.color = "#000000";
    }

    // Si estaba en escala de grises, desactivarlo
    if (isGrayscale && isDarkMode) {
      toggleGrayscale();
    }
  }

  // Función para activar/desactivar escala de grises
  function toggleGrayscale() {
    isGrayscale = !isGrayscale;

    if (isGrayscale) {
      document.documentElement.style.filter = "grayscale(100%)";
      grayscaleButton.style.backgroundColor = "#f8f9fa";
      grayscaleButton.style.color = "#6c757d";

      // Si estaba en modo oscuro, desactivarlo
      if (isDarkMode) {
        isDarkMode = false;

        // Cambiar de vuelta al stylesheet claro
        const currentStylesheet = findCurrentStylesheet();
        if (currentStylesheet) {
          currentStylesheet.href = currentStylesheet.href.replace(
            "./style/stylesDark.css",
            "./style/styles.css",
          );
        }

        // Restaurar color del botón de modo oscuro
        darkModeButton.style.backgroundColor = "#000000";
        darkModeButton.style.color = "white";
      }
    } else {
      document.documentElement.style.filter = "";
      grayscaleButton.style.backgroundColor = "#6c757d";
      grayscaleButton.style.color = "white";
    }
  }

  // Agregar event listeners
  mainButton.addEventListener("click", toggleMenu);
  darkModeButton.addEventListener("click", toggleDarkMode);
  grayscaleButton.addEventListener("click", toggleGrayscale);

  // Verificar preferencia de modo oscuro del sistema
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDarkMode) {
    toggleDarkMode();
  }

  // Agregar CSS de variables por defecto si no existen
  if (!document.documentElement.style.getPropertyValue("--background-color")) {
    document.documentElement.style.setProperty("--background-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#212529");
  }
});
