/* Variable para seguir la posición actual del enfoque (índice en la lista de elementos enfocables) */
let indiceActual = 0;

/* Función para obtener todos los elementos del documento que tienen un atributo `tabindex`
solo se incluyen los que tienen un tabindex mayor que 0 (evita tabindex="-1")
luego los ordena según el valor del tabindex (orden de navegación) */
function obtenerElementosEnfocables() {
    /* Selecciona todos los que tengan tabindex*/
    const elementos = Array.from(document.querySelectorAll('[tabindex]')) 
        .filter(el => el.tabIndex > 0)              /* Filtra solo los con tabindex positivo */
        .sort((a, b) => a.tabIndex - b.tabIndex);   /* Ordena ascendentemente por tabindex */
    return elementos;
}

/*Función para mover el enfoque al siguiente elemento*/
function irSiguiente() {
    const elementos = obtenerElementosEnfocables(); /* Obtiene la lista actualizada */

    /* Si no hay elementos con tabindex, no hace nada */
    if (elementos.length === 0) return;

    /* Avanza al siguiente índice, ciclando al principio si se pasa del último */
    indiceActual = (indiceActual + 1) % elementos.length;

    /*Enfoca el elemento actual */
    const elementoActual = elementos[indiceActual];
    elementoActual.focus();

    /* Hace scroll hacia el elemento enfocado, centrado verticalmente, con animación suave */
    elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function irAnterior() {
    const elementos = obtenerElementosEnfocables(); /* Obtiene la lista actualizada */

    /* Si no hay elementos con tabindex, no hace nada */
    if (elementos.length === 0) return;

    /* retocede al santerior índice, ciclando al principio si se pasa del último */
    indiceActual = (indiceActual - 1) % elementos.length;

    /*Enfoca el elemento actual */
    const elementoActual = elementos[indiceActual];
    elementoActual.focus();

    /* Hace scroll hacia el elemento enfocado, centrado verticalmente, con animación suave */
    elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function irEmergencia() {
    const elementos = obtenerElementosEnfocables(); /* Obtiene la lista actualizada */

    /* Si no hay elementos con tabindex, no hace nada */
    if (elementos.length === 0) return;

    /* retocede al santerior índice, ciclando al principio si se pasa del último */
    indiceActual = 13 % elementos.length;

    /*Enfoca el elemento actual */
    const elementoActual = elementos[indiceActual];
    elementoActual.focus();

    /* Hace scroll hacia el elemento enfocado, centrado verticalmente, con animación suave */
    elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* Función que se ejecuta cuando se carga la página
pcionalmente, enfoca el primer elemento con tabindex */
window.onload = function() {
    const elementos = obtenerElementosEnfocables();
    if (elementos.length > 0) {
        elementos[0].focus();                       /*Enfoca el primero al cargar */
    }
};
