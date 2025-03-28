// Crear el HTML dinámicamente
document.body.innerHTML = `
    <div class="container text-center mt-5">
        
        <button id="themeButton" class="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            style="width: 60px; height: 60px;"><i id="iconTheme" class="bi bi-moon"></i></button>
        
    </div>

    <!-- Header -->
    <header>
        <div class="container header-content">
            <div class="logo">
                <img src="https://hospitalcopiapo.cl/wp-content/uploads/2024/04/cropped-LOGO-HRC-LETRAS-BLANCAS-236x191.png" alt="Hospital Logo">
                <div class="logo-text">
                    <h1>Hospital Regional de Copiapó</h1>
                    <p>San José del Carmen</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Personal</a></li>
                    <li><a href="#">Pide tu Cita</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content container">
            <h2>Tu salud es nuestra prioridad</h2>
            <p>Brindamos servicios de atención médica excepcionales con instalaciones de última generación y profesionales compasivos dedicados a su bienestar.</p>
            <a href="#" class="btn">Pide una Cita</a>
        </div>
    </section>
    
    <!-- Servicios Section -->
    <section class="services">
        <div class="container">
            <h2 class="section-title">Nuestros Servicios</h2>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-img">🏥</div>
                    <div class="service-content">
                        <h3>Cuidados Intensivos</h3>
                        <p>Servicios de emergencia 24 horas al día, 7 días a la semana, con equipos de respuesta rápida y centros de trauma completamente equipados, listos para manejar cualquier crisis médica.</p>
                        <a href="#">Aprende Más →</a>
                    </div>
                </div>
                
                <div class="service-card">
                    <div class="service-img">💊</div>
                    <div class="service-content">
                        <h3>Farmacia</h3>
                        <p>Farmacia de servicio completo que ofrece medicamentos, consultas y gestión de terapias farmacológicas por parte de farmacéuticos autorizados.</p>
                        <a href="#">Aprende Más →</a>
                    </div>
                </div>
                
                <div class="service-card">
                    <div class="service-img">🩺</div>
                    <div class="service-content">
                        <h3>Cuidados Primarios</h3>
                        <p>Servicios integrales de atención primaria que incluyen atención preventiva, tratamiento de enfermedades crónicas y promoción de la salud.</p>
                        <a href="#">Aprende Más →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Emergency Section -->
    <section class="emergency">
        <div class="container">
            <h2>Servicios de Emergencias Disponible 24/7</h2>
            <p>Si tiene una emergencia médica, llame inmediatamente o visite nuestro departamento de emergencias.</p>
            <a href="tel:911" class="btn">Llamado de Emergencia: 911</a>
        </div>
    </section>
    
    <!-- Personal Section -->
    <section class="doctors">
        <div class="container">
            <h2 class="section-title">Meet Our Specialists</h2>
            <div class="doctors-grid">
                <div class="doctor-card">
                    <div class="doctor-img">👨‍⚕️</div>
                    <div class="doctor-info">
                        <h3>Dra. Sara Johnson</h3>
                        <p>Cardióloga</p>
                        <p>15 años de experiencia</p>
                    </div>
                </div>
                
                <div class="doctor-card">
                    <div class="doctor-img">👩‍⚕️</div>
                    <div class="doctor-info">
                        <h3>Dr. Michael Chen</h3>
                        <p>Neurólogo</p>
                        <p>12 años de experiencia</p>
                    </div>
                </div>
                
                <div class="doctor-card">
                    <div class="doctor-img">👨‍⚕️</div>
                    <div class="doctor-info">
                        <h3>Dra. Emilia Rodríguez</h3>
                        <p>Pediatra</p>
                        <p>120 años de experiencia</p>
                    </div>
                </div>
                
                <div class="doctor-card">
                    <div class="doctor-img">👩‍⚕️</div>
                    <div class="doctor-info">
                        <h3>Dr. David Wilson</h3>
                        <p>Cirujano ortopédico</p>
                        <p>18 años de experiencia</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Testimonials -->
    <section class="testimonials">
        <div class="container">
            <h2 class="section-title">Testimonios de pacientes</h2>
            <div class="testimonial-card">
                <p>La atención que recibí en el Hospital fue... Mediocre. Pero hey, no perdí el brazo. Y sólo tuve que esperar 3 horas, lo cual es un nuevo récord, ¡Jamás había tenido que esperar tan poco!"</p>
                <p class="testimonial-author">— Juan Ávalos</p>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-column">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Más Información</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="#">Personal</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Servicios</h3>
                    <ul>
                        <li><a href="#">Atención de emergencia</a></li>
                        <li><a href="#">Atención primaria</a></li>
                        <li><a href="#">Cirugía</a></li>
                        <li><a href="#">Diagnóstico</a></li>
                        <li><a href="#">Rehabilitación</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Contactáctanos</h3>
                    <ul>
                        <li>Lorem Ipsum</li>
                        <li>LOL, LMAO</li>
                        <li>Teléfono: +569 1234 5678</li>
                        <li>Email: nosejajasalu2</li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Horarios</h3>
                    <ul>
                        <li>Emergencias: 24/7</li>
                        <li>Farmacia: 7am-10pm</li>
                        <li>Fin de Semana: 9am-5pm</li>
                    </ul>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; sos.</p>
            </div>
        </div>
    </footer>
`;

// Crear y agregar la hoja de estilos
let themeLink = document.createElement("link");
themeLink.id = "theme";
themeLink.rel = "stylesheet";
themeLink.href = "styles.css"; // Tema por defecto
document.head.appendChild(themeLink);

// Agregar funcionalidad al botón
document.getElementById("themeButton").addEventListener("click", function() {
    let icon = document.getElementById("iconTheme");

    if (themeLink.href.includes("styles.css")) {
        themeLink.href = "stylesDark.css";
        this.classList.replace("btn-dark", "btn-light"); // Cambia el color del botón
        icon.classList.replace("bi-moon", "bi-brightness-high"); // Cambia ícono a luna
    } else {
        themeLink.href = "styles.css";
        this.classList.replace("btn-light", "btn-dark");
        icon.classList.replace("bi-brightness-high", "bi-moon"); // Cambia ícono a sol
    }
});
