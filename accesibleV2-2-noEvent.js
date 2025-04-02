// floating-buttons.js sin eventos

// IIFE para encapsular todo el código
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
          title: 'Modo Oscuro (no funcional)',
          color: '#000000',
          textColor: 'white'
        },
        grayscale: {
          icon: '◐',
          title: 'Escala de Grises (no funcional)',
          color: '#6c757d',
          textColor: 'white'
        }
      }
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
          backgroundColor: options.color,
          color: options.textColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        });
        
        return button;
      }
    };
  
    // Crear elementos visuales
    function createStaticUI() {
      // Crear el contenedor principal
      const container = document.createElement('div');
      container.className = 'floating-menu-container';
      helpers.applyStyles(container, {
        ...config.container,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center'
      });
      
      // Crear botón de escala de grises (estático)
      const grayscaleButton = helpers.createButton({
        className: 'grayscale-button',
        icon: config.buttons.grayscale.icon,
        title: config.buttons.grayscale.title,
        color: config.buttons.grayscale.color,
        textColor: config.buttons.grayscale.textColor
      });
      
      // Crear botón de modo oscuro (estático)
      const darkModeButton = helpers.createButton({
        className: 'dark-mode-button',
        icon: config.buttons.darkMode.icon,
        title: config.buttons.darkMode.title,
        color: config.buttons.darkMode.color,
        textColor: config.buttons.darkMode.textColor
      });
      
      // Agregar los botones al contenedor
      container.appendChild(grayscaleButton);
      container.appendChild(darkModeButton);
      
      // Agregar el contenedor al body directamente
      document.body.appendChild(container);
      
      // Agregar CSS de variables por defecto
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#212529');
    }
  
    // Ejecutar inmediatamente, sin esperar a DOMContentLoaded
    // Nota: En un caso real, esto podría causar problemas si el DOM no está listo
    createStaticUI();
  })();