// Configuración global del sistema
const AccesibilidadConfig = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      gap: '10px',
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center'
    },
    buttonBase: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
  
  // Estado global de la aplicación
  const EstadoAccesibilidad = {
    isDarkMode: false,
    isGrayscale: false
  };
  
  // Utilidades generales
  const Utilidades = {
    /**
     * Aplica estilos CSS a un elemento del DOM
     * @param {HTMLElement} elemento - Elemento al que aplicar los estilos
     * @param {Object} estilos - Objeto con pares propiedad-valor de CSS
     */
    aplicarEstilos: function(elemento, estilos) {
      Object.assign(elemento.style, estilos);
    },
    
    /**
     * Busca la hoja de estilos actualmente usada para temas
     * @returns {HTMLLinkElement|null} - El elemento link o null si no se encuentra
     */
    buscarHojaEstilosActual: function() {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute('href');
        if (href && (href.includes(AccesibilidadConfig.stylesheets.light) || 
                     href.includes(AccesibilidadConfig.stylesheets.dark))) {
          return links[i];
        }
      }
      return null;
    },
    
    /**
     * Crea un botón flotante con estilos y comportamiento definidos
     * @param {Object} opciones - Configuración visual del botón
     * @param {Function} funcionClick - Función a ejecutar al hacer clic
     * @returns {HTMLButtonElement} - El botón creado
     */
    crearBoton: function(opciones, funcionClick) {
      const boton = document.createElement('button');
      boton.className = `floating-option-button ${opciones.className}`;
      boton.innerHTML = opciones.icon;
      boton.title = opciones.title;
      
      this.aplicarEstilos(boton, {
        ...AccesibilidadConfig.buttonBase,
        backgroundColor: opciones.bgColor,
        color: opciones.textColor
      });
      
      boton.onclick = funcionClick;
      return boton;
    }
  };
  
  // Gestor de Modo Oscuro
  const GestorModoOscuro = {
    boton: null,
    
    /**
     * Cambia entre modo claro y oscuro
     */
    cambiarModo: function() {
      EstadoAccesibilidad.isDarkMode = !EstadoAccesibilidad.isDarkMode;
      this.actualizarInterfaz();
    },
    
    /**
     * Actualiza la interfaz según el estado actual del modo oscuro
     */
    actualizarInterfaz: function() {
      const hojaEstiloActual = Utilidades.buscarHojaEstilosActual();
      const configBoton = AccesibilidadConfig.buttons.darkMode;
      
      if (!EstadoAccesibilidad.isDarkMode) {
        // Activar modo oscuro
        this.aplicarModoOscuro(hojaEstiloActual);
        
        Utilidades.aplicarEstilos(this.boton, {
          backgroundColor: configBoton.activeColor,
          color: configBoton.activeTextColor
        });
        
        this.boton.title = configBoton.activeTitle;
      } else {
        // Activar modo claro
        this.aplicarModoClaro(hojaEstiloActual);
        
        Utilidades.aplicarEstilos(this.boton, {
          backgroundColor: configBoton.inactiveColor,
          color: configBoton.inactiveTextColor
        });
        
        this.boton.title = configBoton.inactiveTitle;
      }
    },
    
    /**
     * Aplica el modo oscuro cambiando la hoja de estilos
     * @param {HTMLLinkElement|null} hojaEstilo - Hoja de estilos actual (si existe)
     */
    aplicarModoOscuro: function(hojaEstilo) {
      if (hojaEstilo) {
        hojaEstilo.href = hojaEstilo.href.replace(
          AccesibilidadConfig.stylesheets.light, 
          AccesibilidadConfig.stylesheets.dark
        );
      } else {
        const nuevaHoja = document.createElement('link');
        nuevaHoja.rel = 'stylesheet';
        nuevaHoja.href = AccesibilidadConfig.stylesheets.dark;
        document.head.appendChild(nuevaHoja);
      }
    },
    
    /**
     * Aplica el modo claro cambiando la hoja de estilos
     * @param {HTMLLinkElement|null} hojaEstilo - Hoja de estilos actual (si existe)
     */
    aplicarModoClaro: function(hojaEstilo) {
      if (hojaEstilo) {
        hojaEstilo.href = hojaEstilo.href.replace(
          AccesibilidadConfig.stylesheets.dark, 
          AccesibilidadConfig.stylesheets.light
        );
      } else {
        const nuevaHoja = document.createElement('link');
        nuevaHoja.rel = 'stylesheet';
        nuevaHoja.href = AccesibilidadConfig.stylesheets.light;
        document.head.appendChild(nuevaHoja);
      }
    },
    
    /**
     * Inicializa el botón de modo oscuro
     * @returns {HTMLButtonElement} - El botón creado
     */
    inicializar: function() {
      const configBoton = AccesibilidadConfig.buttons.darkMode;
      const self = this;
      
      this.boton = Utilidades.crearBoton({
        className: 'dark-mode-button',
        icon: configBoton.icon,
        title: configBoton.inactiveTitle,
        bgColor: configBoton.inactiveColor,
        textColor: configBoton.inactiveTextColor
      }, function() {
        self.cambiarModo();
      });
      
      return this.boton;
    }
  };
  
  // Gestor de Escala de Grises
  const GestorEscalaGrises = {
    boton: null,
    
    /**
     * Cambia entre modo color y escala de grises
     */
    cambiarModo: function() {
      EstadoAccesibilidad.isGrayscale = !EstadoAccesibilidad.isGrayscale;
      this.actualizarInterfaz();
    },
    
    /**
     * Actualiza la interfaz según el estado actual de escala de grises
     */
    actualizarInterfaz: function() {
      const configBoton = AccesibilidadConfig.buttons.grayscale;
      
      if (EstadoAccesibilidad.isGrayscale) {
        this.aplicarEscalaGrises();
        
        Utilidades.aplicarEstilos(this.boton, {
          backgroundColor: configBoton.activeColor,
          color: configBoton.activeTextColor
        });
        
        this.boton.title = configBoton.activeTitle;
      } else {
        this.quitarEscalaGrises();
        
        Utilidades.aplicarEstilos(this.boton, {
          backgroundColor: configBoton.inactiveColor,
          color: configBoton.inactiveTextColor
        });
        
        this.boton.title = configBoton.inactiveTitle;
      }
    },
    
    /**
     * Aplica el filtro de escala de grises a la página
     */
    aplicarEscalaGrises: function() {
      document.documentElement.style.filter = 'grayscale(100%)';
    },
    
    /**
     * Quita el filtro de escala de grises de la página
     */
    quitarEscalaGrises: function() {
      document.documentElement.style.filter = '';
    },
    
    /**
     * Inicializa el botón de escala de grises
     * @returns {HTMLButtonElement} - El botón creado
     */
    inicializar: function() {
      const configBoton = AccesibilidadConfig.buttons.grayscale;
      const self = this;
      
      this.boton = Utilidades.crearBoton({
        className: 'grayscale-button',
        icon: configBoton.icon,
        title: configBoton.inactiveTitle,
        bgColor: configBoton.inactiveColor,
        textColor: configBoton.inactiveTextColor
      }, function() {
        self.cambiarModo();
      });
      
      return this.boton;
    }
  };
  
  /**
   * Sistema principal de accesibilidad
   */
  const SistemaAccesibilidad = {
    contenedor: null,
    
    /**
     * Crea el contenedor principal para los botones
     */
    crearContenedor: function() {
      this.contenedor = document.createElement('div');
      this.contenedor.className = 'floating-menu-container';
      Utilidades.aplicarEstilos(this.contenedor, AccesibilidadConfig.container);
      document.body.appendChild(this.contenedor);
    },
    
    /**
     * Inicializa y añade todos los componentes al contenedor
     */
    inicializarComponentes: function() {
      // Añadir botones al contenedor
      this.contenedor.appendChild(GestorEscalaGrises.inicializar());
      this.contenedor.appendChild(GestorModoOscuro.inicializar());
    },
    
    /**
     * Verifica y aplica preferencias del sistema (como modo oscuro)
     */
    aplicarPreferenciasUsuario: function() {
      // Verificar preferencia de modo oscuro del sistema
      const prefersModoOscuro = window.matchMedia && 
                               window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersModoOscuro) {
        GestorModoOscuro.cambiarModo();
      }
      
      // Configurar variables CSS predeterminadas si no existen
      if (!document.documentElement.style.getPropertyValue('--background-color')) {
        document.documentElement.style.setProperty('--background-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#212529');
      }
    },
    
    /**
     * Inicializa todo el sistema de accesibilidad
     */
    inicializar: function() {
      this.crearContenedor();
      this.inicializarComponentes();
      this.aplicarPreferenciasUsuario();
      console.log('Sistema de accesibilidad inicializado correctamente');
    }
  };
  
  // Punto de entrada para inicializar el sistema
  function iniciarSistemaAccesibilidad() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        SistemaAccesibilidad.inicializar();
      });
    } else {
      SistemaAccesibilidad.inicializar();
    }
  }
  
  // Ejecutar la inicialización
  iniciarSistemaAccesibilidad();