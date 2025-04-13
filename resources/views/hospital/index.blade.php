@extends('layouts.app')

@section('title', 'Hospital Regional de Copiapó')

@section('content')
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content container">
            <h2>Tu salud es nuestra prioridad</h2>
            <p>
                Brindamos servicios de atención médica excepcionales con
                instalaciones de última generación y profesionales
                compasivos dedicados a su bienestar.
            </p>
            <a href="#" class="btn elemento-enfocable" tabindex="10">Pide una Cita</a>
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
                        <p>
                            Servicios de emergencia 24 horas al día, 7 días
                            a la semana, con equipos de respuesta rápida y
                            centros de trauma completamente equipados,
                            listos para manejar cualquier crisis médica.
                        </p>
                        <a class="elemento-enfocable" tabindex="11" href="#">Aprende Más →</a>
                    </div>
                </div>

                <div class="service-card">
                    <div class="service-img">💊</div>
                    <div class="service-content">
                        <h3>Farmacia</h3>
                        <p>
                            Farmacia de servicio completo que ofrece
                            medicamentos, consultas y gestión de terapias
                            farmacológicas por parte de farmacéuticos
                            autorizados.
                        </p>
                        <a class="elemento-enfocable" tabindex="12" href="#">Aprende Más →</a>
                    </div>
                </div>

                <div class="service-card">
                    <div class="service-img">🩺</div>
                    <div class="service-content">
                        <h3>Cuidados Primarios</h3>
                        <p>
                            Servicios integrales de atención primaria que
                            incluyen atención preventiva, tratamiento de
                            enfermedades crónicas y promoción de la salud.
                        </p>
                        <a class="elemento-enfocable" tabindex="13" href="#">Aprende Más →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Emergency Section -->
    <section class="emergency">
        <div class="container">
            <h2>Servicios de Emergencias Disponible 24/7</h2>
            <p>
                Si tiene una emergencia médica, llame inmediatamente o
                visite nuestro departamento de emergencias.
            </p>
            <a href="tel:911" class="btn elemento-enfocable" tabindex="14">Llamado de Emergencia: 911</a>
        </div>
    </section>

    <!-- Personal Section -->
    <section class="doctors">
        <div class="container">
            <h2 class="section-title">Meet Our Specialists</h2>
            <div class="doctors-grid elemento-enfocable" tabindex="15">
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
                <p>
                    La atención que recibí en el Hospital fue... Mediocre.
                    Pero hey, no perdí el brazo. Y sólo tuve que esperar 3
                    horas, lo cual es un nuevo récord, ¡Jamás había tenido
                    que esperar tan poco!"
                </p>
                <p class="testimonial-author">— Juan Ávalos</p>
            </div>
        </div>
    </section>
@endsection