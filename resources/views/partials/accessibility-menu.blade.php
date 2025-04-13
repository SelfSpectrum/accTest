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