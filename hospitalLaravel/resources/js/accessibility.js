// --- Variables de Estado ---
let fontSize = 1;
let highlightActive = false;
let paragraphHighlightActive = false;
let ultimoEsquemaSeleccionado = "styles.css";
let isFocusActive = false;
let overlay = null;
let isGrayscale = false;

// Función para cargar las preferencias guardadas
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el overlay para el enfoque
    overlay = document.getElementById('focus-overlay');
    
    // Cargar preferencias del usuario desde el servidor
    fetch('/user-preferences')
        .then(response => response.json())
        .then(preferences => {
            // Aplicar las preferencias cargadas
            if (preferences.fontSize) {
                fontSize = parseFloat(preferences.fontSize);
                document.body.style.fontSize = fontSize + "em";
            }
            
            if (preferences.highlightActive === true) {
                highlightActive = true;
                document.body.classList.add("text-highlighted");
            }
            
            if (preferences.paragraphHighlightActive === true) {
                paragraphHighlightActive = true;
                document.body.classList.add("paragraphs-highlighted");
            }
            
            if (preferences.contraste) {
                cambiarContraste(preferences.contraste, false); // El segundo parámetro evita guardar para evitar recursión
            }
            
            if (preferences.isFocusActive === true) {
                isFocusActive = true;
                if (overlay) overlay.classList.add("focus-active");
            }
            
            if (preferences.isGrayscale === true) {
                toggleGrayscale(false); // Sin guardar para evitar recursión
            }
        })
        .catch(error => {
            console.error('Error al cargar preferencias:', error);
        });
        
    // Configurar el comportamiento del enfoque
    configureMouseFocus();
    
    // Configurar navegación por teclado
    document.addEventListener("keydown", deteccion);
});

// Función para guardar preferencias
function savePreferences() {
    const preferences = {
        fontSize,
        highlightActive,
        paragraphHighlightActive,
        contraste: ultimoEsquemaSeleccionado,
        isFocusActive,
        isGrayscale
    };
    
    // Enviar al servidor usando fetch API
    fetch('/save-preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(preferences)
    })
    .then(response => response.json())
    .then(data => console.log('Preferencias guardadas'))
    .catch(error => console.error('Error guardando preferencias:', error));
}

// Aumentar y Disminuir texto
function increaseFontSize() {
    fontSize += 0.1;
    document.body.style.fontSize = fontSize + "em";
    savePreferences();
}

function decreaseFontSize() {
    fontSize = Math.max(0.5, fontSize - 0.1);
    document.body.style.fontSize = fontSize + "em";
    savePreferences();
}

// Resaltar texto general
function toggleTextHighlighter() {
    highlightActive = !highlightActive;
    document.body.classList.toggle("text-highlighted", highlightActive);
    savePreferences();
}

// Resaltar párrafos
function toggleParagraphHighlighter() {
    paragraphHighlightActive = !paragraphHighlightActive;
    document.body.classList.toggle("paragraphs-highlighted", paragraphHighlightActive);
    savePreferences();
}

// Cambiar contraste
function cambiarContraste(nuevoEsquema, save = true) {
    // Buscar la hoja de estilos de contraste actual
    const hojaDeEstiloActual = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .find((link) => {
        const href = link.getAttribute("href");
        return href && (
            href.includes("styles.css") ||
            href.includes("contrast-red.css") ||
            href.includes("contrast-green.css") ||
            href.includes("contrast-blue.css") ||
            href.includes("contrast-yellow.css") ||
            href.includes("contrast-dark.css") ||
            href.includes("stylesDark.css")
        );
    });

    // Construir la ruta completa al nuevo esquema
    // Notar que en Laravel la ruta puede ser diferente, ajustar según la configuración de assets
    const rutaCompleta = nuevoEsquema.includes('/') ? nuevoEsquema : `/css/${nuevoEsquema}`;

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
    
    if (save) savePreferences();
}

// El resto de las funciones: actualizarBotonContraste, toggleFocusFeature, toggleGrayscale, etc.
// Modificar cada función para que llame a savePreferences() al final

// Configuración del foco
function configureMouseFocus() {
    // Obtenemos la altura para el enfoque
    const focusHeight = 75;
    
    // Función para actualizar el enfoque
    function updateFocus(event) {
        if (!isFocusActive || !overlay) return;
        
        const mouseY = event.clientY;
        const rectY = mouseY - focusHeight / 2;
        const y1 = rectY;
        const y2 = rectY + focusHeight;
        const x1 = 0;
        const x2 = window.innerWidth;
        
        const clipPathValue = `polygon(
            evenodd,
            0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
            ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px ${y1}px
        )`;
        
        requestAnimationFrame(() => {
            if (isFocusActive && overlay) overlay.style.clipPath = clipPathValue;
        });
    }
    
    // Eventos de ratón
    document.addEventListener('mousemove', updateFocus);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseReturn);
    
    function handleMouseLeave() {
        // Implementación...
    }
    
    function handleMouseReturn(e) {
        if (!isFocusActive) return;
        updateFocus(e);
    }
}

// Toggle de enfoque
function toggleFocusFeature() {
    if (!overlay) {
        console.warn("Overlay no listo aún.");
        return;
    }

    isFocusActive = !isFocusActive;
    overlay.classList.toggle('focus-active', isFocusActive);
    savePreferences();
}

// Toggle escala de grises
function toggleGrayscale(save = true) {
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
    
    if (save) savePreferences();
}

// Variables y funciones para la navegación por teclado
let indiceActual = 0;

function deteccion(event) {
    const teclaPrecionada = event.key;
    
    // Navegación hacia adelante
    if (teclaPrecionada == "s") {
        const elementos = obtenerElementosEnfocables();
        if (elementos.length === 0) return;
        indiceActual = (indiceActual + 1) % elementos.length;
        const elementoActual = elementos[indiceActual];
        elementoActual.focus();
        elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Navegación hacia atrás
    else if (teclaPrecionada == "a") {
        const elementos = obtenerElementosEnfocables();
        if (elementos.length === 0) return;
        indiceActual = (indiceActual - 1 + elementos.length) % elementos.length;
        const elementoActual = elementos[indiceActual];
        elementoActual.focus();
        elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Ir a emergencia
    else if (teclaPrecionada == "e") {
        const elementos = obtenerElementosEnfocables();
        if (elementos.length === 0) return;
        // Buscar el elemento de emergencia por ID o atributo específico en lugar de un índice fijo
        const emergencyLink = document.querySelector('a[href="tel:911"]');
        if (emergencyLink) {
            emergencyLink.focus();
            emergencyLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Actualizar el índice actual
            const elementos = obtenerElementosEnfocables();
            indiceActual = elementos.indexOf(emergencyLink);
        }
    }
}

function obtenerElementosEnfocables() {
    return Array.from(document.querySelectorAll('[tabindex]'))
        .filter(el => el.tabIndex > 0)
        .sort((a, b) => a.tabIndex - b.tabIndex);
}

// Inicializar el primer elemento enfocable cuando se carga la página
window.onload = function() {
    const elementos = obtenerElementosEnfocables();
    if (elementos.length > 0) {
        elementos[0].focus();
    }
};