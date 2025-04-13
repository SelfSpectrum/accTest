<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>@yield('title', 'Hospital Regional de Copiapó')</title>
        <link rel="stylesheet" href="{{ asset('style/styles.css') }}" />
        <link rel="stylesheet" href="{{ asset('style/accessibility.css') }}" />
        <link rel="stylesheet" href="{{ asset('style/focus-style.css') }}" />
        <link
            rel="icon"
            href="https://hospitalcopiapo.cl/wp-content/uploads/2024/04/cropped-LOGO-HRC-LETRAS-BLANCAS-236x191.png"
        />
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
        />
        @yield('additional_head')
    </head>
    <body>
        <!-- Focus -->
        <div id="focus-overlay"></div>
        
        <!-- Header -->
        <header>
            <div class="container header-content">
                <div class="logo">
                    <img
                        src="https://hospitalcopiapo.cl/wp-content/uploads/2024/04/cropped-LOGO-HRC-LETRAS-BLANCAS-236x191.png"
                        alt="Hospital Logo"
                    />
                    <div class="logo-text">
                        <h1>Hospital Regional de Copiapó</h1>
                        <p>San José del Carmen</p>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a class="elemento-enfocable" tabindex="5" href="{{ route('home') }}">Inicio</a></li>
                        <li><a class="elemento-enfocable" tabindex="6" href="#">Servicios</a></li>
                        <li><a class="elemento-enfocable" tabindex="7" href="#">Personal</a></li>
                        <li><a class="elemento-enfocable" tabindex="8" href="#">Pide tu Cita</a></li>
                        <li><a class="elemento-enfocable" tabindex="9" href="#">Contacto</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        @yield('content')

        <!-- Accessibility Navigation -->
        <nav class="navbar-bottom">
            <div class="navbar-container2">
                <div class="logo2">Accesibilidad</div>

                <div class="container accessibility-container">
                    <div class="dropdown-container accessibility-menu">
                        <!-- First Dropup -->
                        <div class="btn-group dropup">
                            <button id="contrast-toggle" type="button" class="btn btn-primary dropdown-toggle dropdown-btn elemento-enfocable" tabindex="1" data-bs-toggle="dropdown" aria-expanded="false">
                                Modo de Alto Contraste
                            </button>
                            <ul class="dropdown-menu contrast-submenu">
                                <li><button onclick="cambiarContraste('contrast-red.css')" class="dropdown-item" type="button">Blanco sobre Rojo (7:1)</button></li>
                                <li><button onclick="cambiarContraste('contrast-green.css')" class="dropdown-item" type="button">Blanco sobre Verde (7:1)</button></li>
                                <li><button onclick="cambiarContraste('contrast-blue.css')" class="dropdown-item" type="button">Blanco sobre Azul (8:1)</button></li>
                                <li><button onclick="cambiarContraste('contrast-yellow.css')" class="dropdown-item" type="button">Negro sobre Amarillo (12:1)</button></li>
                                <li><button onclick="cambiarContraste('contrast-dark.css')" class="dropdown-item" type="button">Negro sobre Blanco (21:1)</button></li>
                                <li><button onclick="cambiarContraste('stylesDark.css')" class="dropdown-item" type="button">Modo oscuro</button></li>
                                <li><button onclick="cambiarContraste('styles.css')" class="dropdown-item" type="button">Normal</button></li>
                            </ul>
                        </div>

                        <!-- Second Dropup -->
                        <div class="btn-group dropup">
                            <button type="button" class="btn btn-success dropdown-toggle dropdown-btn elemento-enfocable" tabindex="2" data-bs-toggle="dropdown" aria-expanded="false">
                                Accesibilidad Visual
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" id="increase-font" onclick="increaseFontSize()">Aumentar texto</button></li>
                                <li><button class="dropdown-item" type="button" id="decrease-font" onclick="decreaseFontSize()">Disminuir texto</button></li>
                                <li><button class="dropdown-item" type="button" onclick="toggleGrayscale()">Escala de grises</button></li>
                            </ul>
                        </div>

                        <!-- Third Dropup -->
                        <div class="btn-group dropup">
                            <button type="button" class="btn btn-danger dropdown-toggle dropdown-btn elemento-enfocable" tabindex="3" data-bs-toggle="dropdown" aria-expanded="false">
                                Accesibilidad Cognitiva
                            </button>
                            <ul class="dropdown-menu">
                                <li><button class="dropdown-item" type="button" id="highlighted-text" onclick="toggleTextHighlighter()">Resaltar texto</button></li>
                                <li><button class="dropdown-item" type="button" id="paragraph-highlight-toggle" onclick="toggleParagraphHighlighter()">Resaltar párrafos</button></li>
                                <li><button class="dropdown-item" type="button" id="focus-frame-toggle" onclick="toggleFocusFeature()">Recuadro de Enfoque</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Footer -->
        <footer>
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-column">
                        <h3 tabindex="19">Enlaces Rápidos</h3>
                        <ul>
                            <li><a tabindex="20" href="{{ route('home') }}">Inicio</a></li>
                            <li><a tabindex="21" href="#">Más Información</a></li>
                            <li><a tabindex="22" href="#">Servicios</a></li>
                            <li><a tabindex="23" href="#">Personal</a></li>
                            <li><a tabindex="24" href="#">Contacto</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 tabindex="25">Servicios</h3>
                        <ul>
                            <li><a tabindex="26" href="#">Atención de emergencia</a></li>
                            <li><a tabindex="27" href="#">Atención primaria</a></li>
                            <li><a tabindex="28" href="#">Cirugía</a></li>
                            <li><a tabindex="29" href="#">Diagnóstico</a></li>
                            <li><a tabindex="30" href="#">Rehabilitación</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 tabindex="31">Contactáctanos</h3>
                        <ul>
                            <li>Lorem Ipsum</li>
                            <li>LOL, LMAO</li>
                            <li tabindex="32">Teléfono: +569 1234 5678</li>
                            <li tabindex="33">Email: nosejajasalu2</li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 tabindex="34">Horarios</h3>
                        <ul>
                            <li tabindex="35">Emergencias: 24/7</li>
                            <li tabindex="36">Farmacia: 7am-10pm</li>
                            <li tabindex="37">Fin de Semana: 9am-5pm</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Bootstrap JS and Popper.js -->
        <script src="{{ asset('script/accessibility.js') }}"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        @yield('additional_scripts')
    </body>
</html>