/**
 * app.js
 * Código COMPLETO y CORREGIDO del lado del cliente para:
 * 1. Autenticación por token (JWT).
 * 2. Feedback del estado de la sesión.
 * 3. Gestión de preferencias visuales combinables (localStorage).
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Selección de Elementos del DOM ---
    const sessionStatus = document.getElementById('sessionStatus');
    const logoutButton = document.getElementById('logoutButton');
    const loginSection = document.getElementById('loginSection');
    const protectedSection = document.getElementById('protectedSection');
    const bodyElement = document.body;
    // Elementos para preferencias visuales (checkboxes)
    const prefCheckboxes = {
        highContrast: document.getElementById('prefHighContrast'),
        largeFont: document.getElementById('prefLargeFont'),
        dyslexiaFont: document.getElementById('prefDyslexiaFont')
    };
    // Elementos de login y datos
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const fetchDataButton = document.getElementById('fetchDataButton');
    const protectedDataDiv = document.getElementById('protectedData');
    const dataMessage = document.getElementById('dataMessage');

    // --- Estado de las Preferencias Visuales ---
    const defaultPreferences = {
        highContrast: false,
        largeFont: false,
        dyslexiaFont: false
    };
    let currentPreferences = { ...defaultPreferences }; // Copia inicial

    // --- Función Auxiliar para Decodificar Payload de JWT (Simple) ---
    // ¡ADVERTENCIA! Implementación básica. Usar librería robusta en producción.
    function decodeJwtPayload(token) {
        try {
            const base64Url = token.split('.')[1];
            if (!base64Url) return null;
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error decodificando payload del JWT:", e);
            return null;
        }
    }

    // --- Función para Actualizar el Estado de la Sesión en la UI ---
    function updateSessionStatus() {
        const token = localStorage.getItem('authToken');
        let username = null;
        let isTokenValid = false;

        if (token) {
            const payload = decodeJwtPayload(token);
            if (payload) {
                username = payload.username;
                const expirationTime = payload.exp;
                if (expirationTime) {
                    const nowInSeconds = Date.now() / 1000;
                    if (expirationTime > nowInSeconds) {
                        isTokenValid = true;
                    } else {
                        console.log("Token encontrado pero está expirado.");
                        localStorage.removeItem('authToken');
                    }
                } else {
                    console.warn("Token encontrado sin fecha de expiración ('exp' claim). Se considera válido.");
                    isTokenValid = true;
                }
            } else {
                console.log("Token encontrado pero no se pudo decodificar.");
                localStorage.removeItem('authToken');
            }
        }

        if (isTokenValid && username) {
            sessionStatus.textContent = `Conectado (${username})`;
            logoutButton.style.display = 'inline-block';
            loginSection.style.display = 'none';
            protectedSection.style.display = 'block';
        } else {
            sessionStatus.textContent = 'Desconectado';
            logoutButton.style.display = 'none';
            loginSection.style.display = 'block';
            protectedSection.style.display = 'block';
            // Limpiamos datos/mensajes si estamos desconectados
            protectedDataDiv.innerHTML = '';
            dataMessage.textContent = '';
        }
    }

    // --- Lógica de Preferencias Visuales Combinables ---
    function applyAllPreferences() {
        console.log("Aplicando preferencias:", currentPreferences);
        Object.keys(currentPreferences).forEach(key => {
            const cssClass = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
            if (currentPreferences[key]) { bodyElement.classList.add(cssClass); }
            else { bodyElement.classList.remove(cssClass); }
            if (prefCheckboxes[key]) { prefCheckboxes[key].checked = currentPreferences[key]; }
        });
    }

    function savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(currentPreferences));
            console.log("Preferencias guardadas en localStorage.");
        } catch (e) { console.error("Error al guardar preferencias en localStorage:", e); }
    }

    function loadPreferences() {
        const savedPrefsString = localStorage.getItem('userPreferences');
        if (savedPrefsString) {
            try {
                const savedPrefs = JSON.parse(savedPrefsString);
                currentPreferences = { ...defaultPreferences, ...savedPrefs };
                console.log("Preferencias cargadas desde localStorage:", currentPreferences);
            } catch (e) {
                console.error("Error al parsear preferencias guardadas, usando defaults.", e);
                currentPreferences = { ...defaultPreferences };
            }
        } else {
            console.log("No hay preferencias guardadas, usando defaults.");
            currentPreferences = { ...defaultPreferences };
        }
        applyAllPreferences();
    }

    Object.keys(prefCheckboxes).forEach(key => {
        const checkbox = prefCheckboxes[key];
        if (checkbox) {
            checkbox.addEventListener('change', (event) => {
                currentPreferences[key] = event.target.checked;
                applyAllPreferences();
                savePreferences();
            });
        }
    });

    // ---- Lógica de Autenticación y Acceso a Datos ----

    // **Manejo del Formulario de Login:**
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío tradicional del formulario
        loginMessage.textContent = 'Procesando...';
        protectedDataDiv.innerHTML = ''; // Limpia área de datos previos
        dataMessage.textContent = '';    // Limpia mensajes de datos previos

        // --- LEER VALORES DE LOS INPUTS ---
        // !!! ESTAS LÍNEAS SON ESENCIALES !!!
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Log para verificar qué se leyó (diagnóstico útil)
        console.log(`Valores leídos DIRECTAMENTE: Usuario='${username}', Contraseña='${password}'`);

        // Intenta enviar los datos al backend
        try {
            // Define las opciones para la petición fetch
            const loginOptions = {
                method: 'POST', // Método POST
                headers: {
                    'Content-Type': 'application/json', // Indica que enviamos JSON
                },
                // Convierte los datos a JSON para el cuerpo de la petición
                body: JSON.stringify({ username, password }),
            };

            // Log para verificar qué se enviará (diagnóstico útil)
            console.log('Enviando a /login con opciones:', loginOptions);

            // Realiza la petición al endpoint /login
            const response = await fetch('/login', loginOptions);

            // Verifica si la respuesta del servidor NO fue exitosa (ej: 401, 500)
            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;
                try {
                    // Intenta obtener un mensaje más específico del cuerpo de la respuesta
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) { /* Ignora error si el cuerpo no es JSON válido */ }
                // Lanza un error para ser capturado por el bloque catch
                throw new Error(errorMessage);
            }

            // Si la respuesta fue exitosa (ej: 200 OK)
            const data = await response.json(); // Parsea la respuesta JSON

            // Verifica si la respuesta contiene el token esperado
            if (data.token) {
                localStorage.setItem('authToken', data.token); // Guarda el token
                loginMessage.textContent = '¡Inicio de sesión exitoso!';
                console.log('Token de autenticación guardado.');
                updateSessionStatus(); // Actualiza la UI para mostrar estado "Conectado"
            } else {
                // Si la respuesta fue OK pero no vino el token (inesperado)
                throw new Error("Respuesta exitosa del servidor pero no incluyó un token.");
            }

        } catch (error) {
            // Manejo de errores (fallo en fetch, respuesta no-ok, etc.)
            console.error("Error en el proceso de login:", error);
            loginMessage.textContent = `Error: ${error.message}`; // Muestra el error al usuario
            localStorage.removeItem('authToken'); // Asegura limpiar cualquier token viejo
            updateSessionStatus(); // Actualiza la UI (debería mostrar "Desconectado")
        }
    });

    // **Manejo del Botón para Obtener Datos Protegidos:**
    fetchDataButton.addEventListener('click', async () => {
        protectedDataDiv.innerHTML = '';
        dataMessage.textContent = 'Obteniendo datos...';
        const token = localStorage.getItem('authToken');

        if (!token) {
            dataMessage.textContent = 'Error: Necesitas iniciar sesión primero.';
            // No es necesario llamar a updateSessionStatus aquí si ya está desconectado
            return;
        }

        try {
            const response = await fetch('/api/data', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                 localStorage.removeItem('authToken'); // Token inválido/expirado, lo quitamos
                 updateSessionStatus(); // Actualizamos la UI para reflejarlo
                 throw new Error('No autorizado o la sesión ha expirado. Por favor, inicia sesión de nuevo.');
            }
            if (!response.ok) {
                 let errorMessage = `Error del servidor: ${response.status}`;
                 try { const errorData = await response.json(); errorMessage = errorData.message || errorMessage; }
                 catch(e) { /* Ignora */ }
                 throw new Error(errorMessage);
            }

            const data = await response.json();
            protectedDataDiv.textContent = `Mensaje Secreto: ${data.message}`;
            dataMessage.textContent = 'Datos obtenidos con éxito.';

        } catch (error) {
            console.error("Error obteniendo datos protegidos:", error);
            dataMessage.textContent = `Error: ${error.message}`;
        }
    });

    // **Manejo del Botón de Cerrar Sesión:**
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        loginMessage.textContent = 'Has cerrado sesión.'; // Mensaje opcional
        console.log("Sesión cerrada por el usuario.");
        updateSessionStatus(); // Actualiza la UI a "Desconectado"
    });

    // --- Inicialización al Cargar la Página ---
    loadPreferences();    // Carga y aplica preferencias visuales primero
    updateSessionStatus(); // Luego establece el estado inicial de la sesión

}); // Fin del addEventListener('DOMContentLoaded')