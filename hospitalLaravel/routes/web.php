<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PreferenceController;

// Página principal
Route::get('/', function () {
    return view('welcome');
});

// Rutas para las preferencias
Route::get('/user-preferences', [PreferenceController::class, 'getUserPreferences']);
Route::post('/save-preferences', [PreferenceController::class, 'savePreferences']);