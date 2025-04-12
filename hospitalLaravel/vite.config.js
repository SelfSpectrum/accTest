import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/styles.css',
                'resources/css/dark.css',
                'resources/css/accessibility.css',
                'resources/css/focus-style.css',
                'resources/js/accessibility.js',
                'resources/js/focus-script.js',
            ],
            refresh: true,
        }),
    ],
});