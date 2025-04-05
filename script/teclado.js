 // Variable para seguir la posición actual
 let indiceActual = 0;
        
 // Obtener todos los elementos con tabindex y ordenarlos
 function obtenerElementosEnfocables() {
     const elementos = Array.from(document.querySelectorAll('[tabindex]'))
         .filter(el => el.tabIndex > 0)
         .sort((a, b) => a.tabIndex - b.tabIndex);
     return elementos;
 }
 
 // Función para ir al siguiente elemento
 function irSiguiente() {
     const elementos = obtenerElementosEnfocables();
     
     // Si no hay elementos, salir
     if (elementos.length === 0) return;
     
     // Avanzar al siguiente elemento
     indiceActual = (indiceActual + 1) % elementos.length;
     
     // Enfocar y hacer scroll
     const elementoActual = elementos[indiceActual];
     elementoActual.focus();
     elementoActual.scrollIntoView({ behavior: 'smooth', block: 'center' });
 }
 
 // Inicializar (opcional: enfocar el primer elemento al cargar)
 window.onload = function() {
     const elementos = obtenerElementosEnfocables();
     if (elementos.length > 0) {
         elementos[0].focus();
     }
 };