<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HospitalController;

Route::get('/', [HospitalController::class, 'index'])->name('home');