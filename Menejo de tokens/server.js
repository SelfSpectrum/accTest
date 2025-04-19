const express = require('express');
const jwt = require('jsonwebtoken'); // Librería para crear y verificar JWTs
const path = require('path'); // Para servir el archivo HTML

const app = express();
const PORT = 3000; // Puerto donde correrá el servidor

// Clave secreta para firmar los tokens. ¡¡NUNCA la pongas directamente en el código en producción!!
// Debería estar en una variable de entorno segura.
const JWT_SECRET = 'esta-es-mi-clave-super-secreta-cambiar-en-prod';

// Middleware para parsear JSON en las peticiones POST
app.use(express.json());
// Middleware para servir archivos estáticos (HTML, CSS, JS del cliente)
app.use(express.static(path.join(__dirname))); // Sirve archivos desde la carpeta actual

// ---- Endpoint de Login (Público) ----
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // --- Validación de Usuario (Simulada) ---
    // En una aplicación real, aquí buscarías en la base de datos
    // y verificarías la contraseña (usando hashing seguro como bcrypt).
    if (username === 'usuario' && password === 'contraseña123') {
        // Usuario válido. Creamos el payload del token.
        const payload = {
            userId: 1, // ID del usuario desde la BD
            username: username,
            // Puedes añadir otros datos relevantes pero no sensibles (ej: roles)
        };

        // Generamos el token JWT
        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' } // El token expirará en 1 hora
            // { expiresIn: '10s' } // El token expirará en 10 segundos
        );

        // Enviamos el token al cliente
        console.log(`Usuario '${username}' logueado, token generado.`);
        res.json({ token: token });

    } else {
        // Credenciales inválidas
        console.log(`Intento de login fallido para '${username}'`);
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

// ---- Middleware de Autenticación (Para Rutas Protegidas) ----
function authenticateToken(req, res, next) {
    // Buscamos el token en la cabecera Authorization
    const authHeader = req.headers['authorization'];
    // El formato es "Bearer TOKEN". Separamos "Bearer" del token.
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log('Acceso denegado: No se proporcionó token.');
        return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' }); // Si no hay token
    }

    // Verificamos el token
    jwt.verify(token, JWT_SECRET, (err, userPayload) => {
        if (err) {
            // Si hay un error (token inválido, expirado, etc.)
            console.log('Acceso denegado: Token inválido o expirado.', err.message);
            return res.status(403).json({ message: 'Acceso denegado: Token inválido o expirado' }); // Token no válido
        }
        // Si el token es válido, guardamos el payload decodificado
        // en el objeto `req` para que la siguiente función (el controlador de la ruta)
        // pueda usarlo si lo necesita (ej: saber qué usuario hizo la petición).
        req.user = userPayload;
        console.log(`Token verificado para usuario: ${userPayload.username}`);
        next(); // Pasa al siguiente middleware o al controlador de la ruta
    });
}

// ---- Endpoint Protegido ----
// Usamos el middleware `authenticateToken` ANTES del controlador de esta ruta.
// Solo se ejecutará el código dentro de app.get(...) si authenticateToken llama a next().
app.get('/api/data', authenticateToken, (req, res) => {
    // Si llegamos aquí, el token era válido.
    // Podemos acceder a la información del usuario desde req.user si es necesario.
    console.log(`Acceso concedido a /api/data para usuario: ${req.user.username}`);
    res.json({
        message: `¡Hola ${req.user.username}! Este es tu dato secreto obtenido a las ${new Date().toLocaleTimeString()}`,
        usuario: req.user // Opcional: devolver información del usuario
    });
});

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Ubicación actual (contexto): Copiapó, Atacama, Chile.`); // Contexto solicitado
    console.log(`Fecha y hora actual (contexto): ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}`); // Contexto solicitado
});