<?php

use App\Http\Controllers\Landing\LandingController;
use Illuminate\Support\Facades\Route;

Route::controller(LandingController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/trainings', 'trainings');
    Route::get('/profile', 'profile');
});
