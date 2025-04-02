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
          activeColor: 'white',
          activeTextColor: '#000000',
          inactiveColor: 'black',
          inactiveTextColor: 'white'
        },
        grayscale: {
          icon: '◐',
          activeTitle: 'Desactivar Escala de Grises',
          inactiveTitle: 'Activar Escala de Grises',
          activeColor: '#f8f9fa',
          activeTextColor: '#6c757d',
          inactiveColor: '#6c757d',
          inactiveTextColor: 'white'
        }
      },
      stylesheets: {
        light: 'styles.css',
        dark: 'stylesDark.css'
      },
      // Para la nueva función de guardado de preferencias
      storage: {
        darkModeKey: 'site_darkmode_enabled',
        grayscaleKey: 'site_grayscale_enabled'
      }
    };
  
    // Estado de la aplicación - inicializado desde localStorage
    const state = {
      isDarkMode: localStorage.getItem(config.storage.darkModeKey) === 'true',
      isGrayscale: localStorage.getItem(config.storage.grayscaleKey) === 'true'
    };
  
    // Funciones auxiliares
    const helpers = {
      applyStyles: function(element, styles) {
        Object.assign(element.style, styles);
      },
      
      createButton: function(options, clickHandler) {
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
        
        button.onclick = clickHandler;
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
      },
      
      // Nueva función para guardar en localStorage
      saveToStorage: function(key, value) {
        try {
          localStorage.setItem(key, value);
          return true;
        } catch (error) {
          console.error('Error al guardar en localStorage:', error);
          return false;
        }
      }
    };
  
    // Controladores para cada característica
    const features = {
      darkMode: {
        button: null,
        
        toggle: function() {
          state.isDarkMode = !state.isDarkMode;
          
          // Guardar estado en localStorage
          helpers.saveToStorage(config.storage.darkModeKey, state.isDarkMode);
          
          this.update();
        },
        
        update: function() {
          const currentStylesheet = helpers.findCurrentStylesheet();
          const btnConfig = config.buttons.darkMode;
          
          if (state.isDarkMode) {
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
          const self = this;
          
          // Determinar el estado inicial basado en localStorage
          const initialState = state.isDarkMode;
          
          this.button = helpers.createButton({
            className: 'dark-mode-button',
            icon: btnConfig.icon,
            title: initialState ? btnConfig.activeTitle : btnConfig.inactiveTitle,
            bgColor: initialState ? btnConfig.activeColor : btnConfig.inactiveColor,
            textColor: initialState ? btnConfig.activeTextColor : btnConfig.inactiveTextColor
          }, function() {
            self.toggle();
          });
          
          return this.button;
        },
        
        // Aplicar el estado guardado al cargar la página
        applyInitialState: function() {
          if (state.isDarkMode) {
            // Aplicar estilo sin cambiar el estado
            const currentStylesheet = helpers.findCurrentStylesheet();
            
            if (currentStylesheet) {
              if (!currentStylesheet.href.includes(config.stylesheets.dark)) {
                currentStylesheet.href = currentStylesheet.href.replace(
                  config.stylesheets.light, 
                  config.stylesheets.dark
                );
              }
            } else {
              const newStylesheet = document.createElement('link');
              newStylesheet.rel = 'stylesheet';
              newStylesheet.href = config.stylesheets.dark;
              document.head.appendChild(newStylesheet);
            }
            
            // Solo actualizamos el botón si ya existe
            if (this.button) {
              const btnConfig = config.buttons.darkMode;
              helpers.applyStyles(this.button, {
                backgroundColor: btnConfig.activeColor,
                color: btnConfig.activeTextColor
              });
              this.button.title = btnConfig.activeTitle;
            }
          }
        }
      },
      
      grayscale: {
        button: null,
        
        toggle: function() {
          state.isGrayscale = !state.isGrayscale;
          
          // Guardar estado en localStorage
          helpers.saveToStorage(config.storage.grayscaleKey, state.isGrayscale);
          
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
          const self = this;
          
          // Determinar el estado inicial basado en localStorage
          const initialState = state.isGrayscale;
          
          this.button = helpers.createButton({
            className: 'grayscale-button',
            icon: btnConfig.icon,
            title: initialState ? btnConfig.activeTitle : btnConfig.inactiveTitle,
            bgColor: initialState ? btnConfig.activeColor : btnConfig.inactiveColor,
            textColor: initialState ? btnConfig.activeTextColor : btnConfig.inactiveTextColor
          }, function() {
            self.toggle();
          });
          
          return this.button;
        },
        
        // Aplicar el estado guardado al cargar la página
        applyInitialState: function() {
          if (state.isGrayscale) {
            document.documentElement.style.filter = 'grayscale(100%)';
            
            // Solo actualizamos el botón si ya existe
            if (this.button) {
              const btnConfig = config.buttons.grayscale;
              helpers.applyStyles(this.button, {
                backgroundColor: btnConfig.activeColor,
                color: btnConfig.activeTextColor
              });
              this.button.title = btnConfig.activeTitle;
            }
          }
        }
      }
    };
  
    // Inicialización de la aplicación
    function initApp() {
      // Aplicar estados iniciales antes de crear los botones
      features.darkMode.applyInitialState();
      features.grayscale.applyInitialState();
      
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
      
      // Si no hay preferencias guardadas, verificar preferencia del sistema para modo oscuro
      if (localStorage.getItem(config.storage.darkModeKey) === null) {
        const prefersDarkMode = window.matchMedia && 
                                window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
          features.darkMode.toggle();
        }
      }
      
      // Agregar CSS de variables por defecto si no existen
      if (!document.documentElement.style.getPropertyValue('--background-color')) {
        document.documentElement.style.setProperty('--background-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#212529');
      }
    }
  
    // Ejecutar la inicialización inmediatamente
    if (document.readyState === 'loading') {
      document.onreadystatechange = function() {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
          initApp();
          document.onreadystatechange = null;
        }
      };
    } else {
      initApp();
    }
  })();