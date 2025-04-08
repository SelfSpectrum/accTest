// --- Variables accesibles globalmente dentro de este script ---
// Guarda si el efecto de enfoque está actualmente activo o no.
// Comienza en 'false' (desactivado por defecto).
let isFocusActive = false;
// Variable para mantener la referencia al elemento overlay. Se asignará cuando el DOM esté listo.
let overlay = null;

// --- Función para Activar/Desactivar el Enfoque (Llamada desde onclick) ---
// Esta función DEBE ser accesible globalmente para que 'onclick' funcione.
function toggleFocusFeature() {
    // Comprobación: Si el overlay aún no ha sido encontrado por DOMContentLoaded, no hace nada.
    if (!overlay) {
        console.warn("Overlay no listo aún.");
        return;
    }

    // 1. Invierte el estado activo/inactivo.
    isFocusActive = !isFocusActive;

    // 2. Añade o quita la clase 'focus-active' del overlay.
    // El CSS asociado a esta clase lo mostrará u ocultará (`display: block/none`).
    overlay.classList.toggle('focus-active', isFocusActive);

    // 3. Opcional: Actualizar estilo/texto del botón (no implementado aquí).
    // const focusToggleButton = document.getElementById('focus-frame-toggle'); // Habría que obtenerlo aquí
    // if (focusToggleButton) { ... }
}

// --- Espera a que el HTML esté completamente cargado ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Asignar la referencia al overlay ahora que el DOM está listo ---
    overlay = document.getElementById('focus-overlay');

    // --- Verificación de Seguridad ---
    // Comprueba solo el overlay aquí, ya que el botón se maneja con onclick.
    if (!overlay) {
        console.error("Error Crítico: No se encontró el elemento #focus-overlay.");
        return;
    }

    // --- Configuración del Recuadro de Enfoque ---
    const focusHeight = 75; // Altura en píxeles

    // --- Función Principal: Actualizar la Posición del Enfoque ---
    // (Esta función puede permanecer dentro de DOMContentLoaded o estar fuera,
    // siempre que tenga acceso a 'isFocusActive' y 'overlay')
    function updateFocus(event) {
        // Si el efecto NO está activo (variable global 'isFocusActive'), no hace nada.
        if (!isFocusActive || !overlay) {
            return;
        }

        // Obtiene la posición Y del cursor.
        const mouseY = event.clientY;

        // Calcula las coordenadas verticales (Y) del agujero.
        const rectY = mouseY - focusHeight / 2;
        const y1 = rectY;
        const y2 = rectY + focusHeight;

        // Calcula las coordenadas horizontales (X) del agujero (ancho completo).
        const x1 = 0;
        const x2 = window.innerWidth;

        // Construye la cadena de texto para la propiedad CSS 'clip-path'.
        const clipPathValue = `polygon(
            evenodd,
            0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
            ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px ${y1}px
        )`;

        // Aplica el estilo al overlay.
        requestAnimationFrame(() => {
            if (isFocusActive && overlay) { // Doble chequeo
                overlay.style.clipPath = clipPathValue;
            }
        });
    }

    // --- Escuchadores de Eventos del Ratón (Configurados después de DOM ready) ---

    // Escucha el movimiento del ratón.
    document.addEventListener('mousemove', updateFocus);

    // Escucha cuando el cursor SALE de la ventana.
    document.addEventListener('mouseleave', () => {
        if (!isFocusActive || !overlay) return;
        requestAnimationFrame(() => {
            if (!overlay) return; // Check overlay again inside async operation
            const y1_off = -focusHeight - 10;
            const y2_off = -10;
            const x1 = 0;
            const x2 = window.innerWidth;
            overlay.style.clipPath = `polygon(
                evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
                ${x1}px ${y1_off}px, ${x2}px ${y1_off}px, ${x2}px ${y2_off}px, ${x1}px ${y2_off}px, ${x1}px ${y1_off}px
            )`;
        });
    });

     // Escucha cuando el cursor VUELVE A ENTRAR en la ventana.
     document.addEventListener('mouseenter', (e) => {
        if (!isFocusActive) return;
        updateFocus(e);
     });

}); // Fin del 'DOMContentLoaded'