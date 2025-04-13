<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hospital Regional de Copiapó - @yield('title', 'Inicio')</title>
    
    <!-- Estilos CSS -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/accessibility.css') }}">
    <link rel="stylesheet" href="{{ asset('css/focus-style.css') }}">
    <link rel="icon" href="https://hospitalcopiapo.cl/wp-content/uploads/2024/04/cropped-LOGO-HRC-LETRAS-BLANCAS-236x191.png">
    
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    
    @stack('styles')
</head>
<body>
    <!-- Focus Overlay -->
    <div id="focus-overlay"></div>
    
    <!-- Header -->
    @include('partials.header')
    
    <!-- Contenido principal -->
    <main>
        @yield('content')
    </main>
    
    <!-- Menú de accesibilidad -->
    @include('partials.accessibility-menu')
    
    <!-- Footer -->
    @include('partials.footer')
    
    <!-- Scripts -->
    <script src="{{ asset('js/accessibility.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    @stack('scripts')
</body>
</html>