/**
 * Sistema de Accesibilidad Web
 * Provee botones flotantes para modo oscuro y escala de grises
 */

// Clase principal que gestiona toda la aplicación de accesibilidad
class AccessibilityManager {
  constructor() {
    // Configuración centralizada
    this.config = {
      container: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        gap: '10px'
      },
      buttonBase: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
      },
      buttons: {
        darkMode: {
          icon: '🌙',
          activeTitle: 'Volver a Modo Claro',
          inactiveTitle: 'Cambiar a Modo Oscuro',
          activeColor: '#ffffff',
          activeTextColor: '#000000',
          inactiveColor: '#000000',
          inactiveTextColor: 'white'
        },
        grayscale: {
          icon: '◐',
          activeTitle: 'Volver a Modo Color',
          inactiveTitle: 'Modo Escala de Grises',
          activeColor: '#f8f9fa',
          activeTextColor: '#6c757d',
          inactiveColor: '#6c757d',
          inactiveTextColor: 'white'
        }
      },
      stylesheets: {
        light: 'styles.css',
        dark: 'stylesDark.css'
      }
    };

    // Estado de la aplicación
    this.state = {
      isDarkMode: false,
      isGrayscale: false
    };

    // Contenedor principal y botones
    this.container = null;
    this.darkModeButton = null;
    this.grayscaleButton = null;
  }

  /**
   * Inicializa toda la aplicación de accesibilidad
   */
  initialize() {
    this.createContainer();
    this.createDarkModeButton();
    this.createGrayscaleButton();
    this.mountComponentsToDOM();
    this.checkSystemPreferences();
    this.setupDefaultCSSVariables();
  }

  /**
   * Crea el contenedor principal para los botones
   */
  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'floating-menu-container';
    this.applyStyles(this.container, {
      ...this.config.container,
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center'
    });
  }

  /**
   * Crea el botón para el modo oscuro
   */
  createDarkModeButton() {
    const btnConfig = this.config.buttons.darkMode;
    this.darkModeButton = this.createButton({
      className: 'dark-mode-button',
      icon: btnConfig.icon,
      title: btnConfig.inactiveTitle,
      bgColor: btnConfig.inactiveColor,
      textColor: btnConfig.inactiveTextColor
    });
    this.darkModeButton.onclick = () => this.toggleDarkMode();
  }

  /**
   * Crea el botón para escala de grises
   */
  createGrayscaleButton() {
    const btnConfig = this.config.buttons.grayscale;
    this.grayscaleButton = this.createButton({
      className: 'grayscale-button',
      icon: btnConfig.icon,
      title: btnConfig.inactiveTitle,
      bgColor: btnConfig.inactiveColor,
      textColor: btnConfig.inactiveTextColor
    });
    this.grayscaleButton.onclick = () => this.toggleGrayscale();
  }

  /**
   * Agrega los componentes creados al DOM
   */
  mountComponentsToDOM() {
    this.container.appendChild(this.grayscaleButton);
    this.container.appendChild(this.darkModeButton);
    document.body.appendChild(this.container);
  }

  /**
   * Verifica y aplica las preferencias del sistema
   */
  checkSystemPreferences() {
    const prefersDarkMode = window.matchMedia && 
                            window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      this.toggleDarkMode();
    }
  }

  /**
   * Configura variables CSS por defecto si no existen
   */
  setupDefaultCSSVariables() {
    if (!document.documentElement.style.getPropertyValue('--background-color')) {
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#212529');
    }
  }

  /**
   * Activa/desactiva el modo oscuro
   */
  toggleDarkMode() {
    this.state.isDarkMode = !this.state.isDarkMode;
    this.updateDarkMode();
  }

  /**
   * Actualiza la interfaz según el estado del modo oscuro
   */
  updateDarkMode() {
    const currentStylesheet = this.findCurrentStylesheet();
    const btnConfig = this.config.buttons.darkMode;
    
    if (!this.state.isDarkMode) {
      // Activar modo oscuro
      if (currentStylesheet) {
        currentStylesheet.href = currentStylesheet.href.replace(
          this.config.stylesheets.light, 
          this.config.stylesheets.dark
        );
      } else {
        this.createNewStylesheet(this.config.stylesheets.dark);
      }
      
      this.applyStyles(this.darkModeButton, {
        backgroundColor: btnConfig.activeColor,
        color: btnConfig.activeTextColor
      });
      
      this.darkModeButton.title = btnConfig.activeTitle;
    } else {
      // Desactivar modo oscuro
      if (currentStylesheet) {
        currentStylesheet.href = currentStylesheet.href.replace(
          this.config.stylesheets.dark, 
          this.config.stylesheets.light
        );
      } else {
        this.createNewStylesheet(this.config.stylesheets.light);
      }
      
      this.applyStyles(this.darkModeButton, {
        backgroundColor: btnConfig.inactiveColor,
        color: btnConfig.inactiveTextColor
      });
      
      this.darkModeButton.title = btnConfig.inactiveTitle;
    }
  }

  /**
   * Activa/desactiva el modo escala de grises
   */
  toggleGrayscale() {
    this.state.isGrayscale = !this.state.isGrayscale;
    this.updateGrayscale();
  }

  /**
   * Actualiza la interfaz según el estado de escala de grises
   */
  updateGrayscale() {
    const btnConfig = this.config.buttons.grayscale;
    
    if (this.state.isGrayscale) {
      document.documentElement.style.filter = 'grayscale(100%)';
      this.applyStyles(this.grayscaleButton, {
        backgroundColor: btnConfig.activeColor,
        color: btnConfig.activeTextColor
      });
      
      this.grayscaleButton.title = btnConfig.activeTitle;
    } else {
      document.documentElement.style.filter = '';
      this.applyStyles(this.grayscaleButton, {
        backgroundColor: btnConfig.inactiveColor,
        color: btnConfig.inactiveTextColor
      });
      
      this.grayscaleButton.title = btnConfig.inactiveTitle;
    }
  }

  // MÉTODOS AUXILIARES

  /**
   * Aplica estilos CSS a un elemento
   */
  applyStyles(element, styles) {
    Object.assign(element.style, styles);
  }
  
  /**
   * Crea un botón con las opciones especificadas
   */
  createButton(options) {
    const button = document.createElement('button');
    button.className = `floating-option-button ${options.className}`;
    button.innerHTML = options.icon;
    button.title = options.title;
    
    this.applyStyles(button, {
      ...this.config.buttonBase,
      backgroundColor: options.bgColor,
      color: options.textColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
    
    return button;
  }
  
  /**
   * Encuentra la hoja de estilo actual
   */
  findCurrentStylesheet() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    for (let i = 0; i < links.length; i++) {
      const href = links[i].getAttribute('href');
      if (href && (href.includes(this.config.stylesheets.light) || href.includes(this.config.stylesheets.dark))) {
        return links[i];
      }
    }
    return null;
  }

  /**
   * Crea una nueva hoja de estilo
   */
  createNewStylesheet(href) {
    const newStylesheet = document.createElement('link');
    newStylesheet.rel = 'stylesheet';
    newStylesheet.href = href;
    document.head.appendChild(newStylesheet);
  }
}

// Función principal para iniciar el sistema de accesibilidad
function initializeAccessibilityFeatures() {
  const accessibilityManager = new AccessibilityManager();
  accessibilityManager.initialize();
}

// Ejecutar la inicialización cuando el documento esté listo
if (document.readyState === 'loading') {
  document.onreadystatechange = function() {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      initializeAccessibilityFeatures();
      document.onreadystatechange = null;
    }
  };
} else {
  initializeAccessibilityFeatures();
}