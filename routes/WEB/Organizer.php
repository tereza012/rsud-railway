<?php

use App\Http\Controllers\Shared\ProfilController;
use App\Http\Controllers\Shared\SurveyController;
use App\Http\Controllers\Shared\TrainingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'access:organizer'])->prefix('organizer')->group(function () {
    Route::resource('profile', ProfilController::class)->except(['show', 'create', 'store']);
    Route::resource('training', TrainingController::class)->except(['edit', 'create', 'destroy']);
    Route::get('/training/survey/{id}', [SurveyController::class, 'index'])->name('survey.leadership');
    Route::post('/training/survey', [SurveyController::class, 'store'])->name('survey.store');
});
