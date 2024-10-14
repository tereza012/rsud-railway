<?php

use App\Http\Controllers\Shared\ProfilController;
use App\Http\Controllers\Shared\TrainingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'access:controller'])->prefix('controller')->group(function () {
    Route::resource('profile', ProfilController::class)->except(['show', 'create', 'store']);
    Route::resource('training', TrainingController::class)->except(['edit', 'create', 'destroy']);
});
