<?php

use App\Http\Controllers\Shared\ProfilController;
use App\Http\Controllers\User\TrainingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'access:user'])->prefix('user')->group(function () {
    Route::resource('profile', ProfilController::class)->except(['show', 'create', 'store']);
    Route::resource('training', TrainingController::class);
});
