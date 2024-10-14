<?php

use App\Http\Controllers\API\Admin\TrainingController;
use App\Http\Controllers\API\Admin\UpdateTrainingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'access:admin'])->prefix('training')->controller(TrainingController::class)->group(function () {
    for ($i = 1; $i <= 6; $i++) {
        Route::post("phase$i", "phase$i");
    }
});

Route::middleware(['web', 'auth', 'access:admin'])->prefix('training')->controller(UpdateTrainingController::class)->group(function () {
    Route::put('phase1/{id}', 'phase1')->name('training.phase1');
    Route::put('phase2/{id}', 'phase2')->name('training.phase2');
    Route::put('phase3/{id}', 'phase3')->name('training.phase3');
    Route::put('phase4/{id}', 'phase4')->name('training.phase4');
    Route::put('phase5/{id}', 'phase5')->name('training.phase5');
    Route::put('phase6/{id}', 'phase6')->name('training.phase6');
});



