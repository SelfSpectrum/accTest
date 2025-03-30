// floating-buttons.js

document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor principal
    const container = document.createElement('div');
    container.className = 'floating-menu-container';
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
    const mainButton = document.createElement('button');
    mainButton.className = 'floating-main-button';
    mainButton.innerHTML = '<span>+</span>';
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
    const darkModeButton = document.createElement('button');
    darkModeButton.className = 'floating-option-button dark-mode-button';
    darkModeButton.innerHTML = '🌙';
    darkModeButton.title = 'Modo Oscuro';
    darkModeButton.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #343a40;
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
    const grayscaleButton = document.createElement('button');
    grayscaleButton.className = 'floating-option-button grayscale-button';
    grayscaleButton.innerHTML = '◐';
    grayscaleButton.title = 'Escala de Grises';
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
    
    // Función para abrir/cerrar el menú
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        mainButton.innerHTML = '<span>×</span>';
        mainButton.style.transform = 'rotate(45deg)';
        darkModeButton.style.display = 'flex';
        grayscaleButton.style.display = 'flex';
      } else {
        mainButton.innerHTML = '<span>+</span>';
        mainButton.style.transform = 'rotate(0deg)';
        darkModeButton.style.display = 'none';
        grayscaleButton.style.display = 'none';
      }
    }
    
    // Función para activar/desactivar el modo oscuro
    function toggleDarkMode() {
      isDarkMode = !isDarkMode;
      
      if (isDarkMode) {
        document.documentElement.style.setProperty('--background-color', '#121212');
        document.documentElement.style.setProperty('--text-color', '#f5f5f5');
        document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
        document.documentElement.style.backgroundColor = '#121212';
        
        // Excepciones para imágenes y videos
        const media = document.querySelectorAll('img, video');
        media.forEach(item => {
          item.style.filter = 'invert(1) hue-rotate(180deg)';
        });
        
        darkModeButton.style.backgroundColor = '#f8f9fa';
        darkModeButton.style.color = '#343a40';
      } else {
        document.documentElement.style.filter = '';
        document.documentElement.style.backgroundColor = '';
        
        // Restaurar imágenes y videos
        const media = document.querySelectorAll('img, video');
        media.forEach(item => {
          item.style.filter = '';
        });
        
        darkModeButton.style.backgroundColor = '#343a40';
        darkModeButton.style.color = 'white';
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
        document.documentElement.style.filter = 'grayscale(100%)';
        grayscaleButton.style.backgroundColor = '#f8f9fa';
        grayscaleButton.style.color = '#6c757d';
        
        // Si estaba en modo oscuro, desactivarlo
        if (isDarkMode) {
          isDarkMode = false;
          darkModeButton.style.backgroundColor = '#343a40';
          darkModeButton.style.color = 'white';
        }
      } else {
        document.documentElement.style.filter = '';
        grayscaleButton.style.backgroundColor = '#6c757d';
        grayscaleButton.style.color = 'white';
      }
    }
    
    // Agregar event listeners
    mainButton.addEventListener('click', toggleMenu);
    darkModeButton.addEventListener('click', toggleDarkMode);
    grayscaleButton.addEventListener('click', toggleGrayscale);
    
    // Agregar CSS de variables por defecto si no existen
    if (!document.documentElement.style.getPropertyValue('--background-color')) {
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#212529');
    }
  });