// floating-buttons.js

// IIFE para encapsular todo el código y evitar contaminación del espacio global
(function() {
  // Configuración centralizada
  const config = {
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
        activeTitle: 'Volver a Colores',
        inactiveTitle: 'Cambiar a Escala de grises',
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
  const state = {
    isDarkMode: false,
    isGrayscale: false
  };

  // Funciones auxiliares
  const helpers = {
    applyStyles: function(element, styles) {
      Object.assign(element.style, styles);
    },
    
    createButton: function(options) {
      const button = document.createElement('button');
      button.className = `floating-option-button ${options.className}`;
      button.innerHTML = options.icon;
      button.title = options.title;
      
      this.applyStyles(button, {
        ...config.buttonBase,
        backgroundColor: options.bgColor,
        color: options.textColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      });
      
      return button;
    },
    
    findCurrentStylesheet: function() {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute('href');
        if (href && (href.includes(config.stylesheets.light) || href.includes(config.stylesheets.dark))) {
          return links[i];
        }
      }
      return null;
    }
  };

  // Controladores para cada característica
  const features = {
    darkMode: {
      button: null,
      
      toggle: function() {
        state.isDarkMode = !state.isDarkMode;
        this.update();
      },
      
      update: function() {
        const currentStylesheet = helpers.findCurrentStylesheet();
        const btnConfig = config.buttons.darkMode;
        
        if (!state.isDarkMode) {
          // Cambiar a modo oscuro
          if (currentStylesheet) {
            currentStylesheet.href = currentStylesheet.href.replace(
              config.stylesheets.light, 
              config.stylesheets.dark
            );
          } else {
            const newStylesheet = document.createElement('link');
            newStylesheet.rel = 'stylesheet';
            newStylesheet.href = config.stylesheets.dark;
            document.head.appendChild(newStylesheet);
          }
          
          helpers.applyStyles(this.button, {
            backgroundColor: btnConfig.activeColor,
            color: btnConfig.activeTextColor
          });
          this.button.title = btnConfig.activeTitle;
        } else {
          // Cambiar a modo claro
          if (currentStylesheet) {
            currentStylesheet.href = currentStylesheet.href.replace(
              config.stylesheets.dark, 
              config.stylesheets.light
            );
          } else {
            const newStylesheet = document.createElement('link');
            newStylesheet.rel = 'stylesheet';
            newStylesheet.href = config.stylesheets.light;
            document.head.appendChild(newStylesheet);
          }
          
          helpers.applyStyles(this.button, {
            backgroundColor: btnConfig.inactiveColor,
            color: btnConfig.inactiveTextColor
          });
          this.button.title = btnConfig.inactiveTitle;
        }
      },
      
      init: function() {
        const btnConfig = config.buttons.darkMode;
        this.button = helpers.createButton({
          className: 'dark-mode-button',
          icon: btnConfig.icon,
          title: btnConfig.inactiveTitle,
          bgColor: btnConfig.inactiveColor,
          textColor: btnConfig.inactiveTextColor
        });
        
        this.button.addEventListener('click', () => this.toggle());
        return this.button;
      }
    },
    
    grayscale: {
      button: null,
      
      toggle: function() {
        state.isGrayscale = !state.isGrayscale;
        this.update();
      },
      
      update: function() {
        const btnConfig = config.buttons.grayscale;
        
        if (state.isGrayscale) {
          document.documentElement.style.filter = 'grayscale(100%)';
          helpers.applyStyles(this.button, {
            backgroundColor: btnConfig.activeColor,
            color: btnConfig.activeTextColor
          });
          this.button.title = btnConfig.activeTitle;
        } else {
          document.documentElement.style.filter = '';
          helpers.applyStyles(this.button, {
            backgroundColor: btnConfig.inactiveColor,
            color: btnConfig.inactiveTextColor
          });
          this.button.title = btnConfig.inactiveTitle;
        }
      },
      
      init: function() {
        const btnConfig = config.buttons.grayscale;
        this.button = helpers.createButton({
          className: 'grayscale-button',
          icon: btnConfig.icon,
          title: btnConfig.inactiveTitle,
          bgColor: btnConfig.inactiveColor,
          textColor: btnConfig.inactiveTextColor
        });
        
        this.button.addEventListener('click', () => this.toggle());
        return this.button;
      }
    }
  };

  // Inicialización de la aplicación
  function initApp() {
    // Crear el contenedor principal
    const container = document.createElement('div');
    container.className = 'floating-menu-container';
    helpers.applyStyles(container, {
      ...config.container,
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center'
    });
    
    // Inicializar los botones
    container.appendChild(features.grayscale.init());
    container.appendChild(features.darkMode.init());
    
    // Agregar el contenedor al body
    document.body.appendChild(container);
    
    // Verificar preferencia de modo oscuro del sistema
    const prefersDarkMode = window.matchMedia && 
                            window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      features.darkMode.toggle();
    }
    
    // Agregar CSS de variables por defecto si no existen
    if (!document.documentElement.style.getPropertyValue('--background-color')) {
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#212529');
    }
  }

  // Esperamos a que el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', initApp);
})();