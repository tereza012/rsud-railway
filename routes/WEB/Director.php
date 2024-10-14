<?php

use App\Http\Controllers\Director\TrainingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'access:director'])->prefix('director')->controller(TrainingController::class)->group(function () {
    Route::get('training', 'index')->name('director.training.index');
    Route::get('training/{id}', 'show')->name('director.training.show');
    Route::put('training/{id}', 'update')->name('director.training.update');
    Route::delete('training/{id}', 'destroy')->name('director.training.destroy');
});
