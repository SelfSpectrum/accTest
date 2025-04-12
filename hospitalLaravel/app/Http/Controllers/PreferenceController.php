<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class PreferenceController extends Controller
{
    public function getUserPreferences(Request $request)
    {
        $preferences = [
            'fontSize' => $request->cookie('fontSize', 1),
            'highlightActive' => $request->cookie('highlightActive') === 'true',
            'paragraphHighlightActive' => $request->cookie('paragraphHighlightActive') === 'true',
            'contraste' => $request->cookie('contraste', 'styles.css'),
            'isFocusActive' => $request->cookie('isFocusActive') === 'true',
            'isGrayscale' => $request->cookie('isGrayscale') === 'true'
        ];
        
        return response()->json($preferences);
    }
    
    public function savePreferences(Request $request)
    {
        $validated = $request->validate([
            'fontSize' => 'required|numeric',
            'highlightActive' => 'required|boolean',
            'paragraphHighlightActive' => 'required|boolean',
            'contraste' => 'required|string',
            'isFocusActive' => 'required|boolean',
            'isGrayscale' => 'required|boolean'
        ]);
        
        // Tiempo de duración de la cookie: 1 año
        $minutes = 60 * 24 * 365;
        
        // Crear cookies para cada preferencia
        $cookies = [];
        foreach ($validated as $key => $value) {
            $cookieValue = is_bool($value) ? ($value ? 'true' : 'false') : $value;
            $cookies[] = cookie($key, $cookieValue, $minutes);
        }
        
        return response()->json(['message' => 'Preferencias guardadas con éxito'])
                         ->withCookies($cookies);
    }
}