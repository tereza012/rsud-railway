<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\TraineeController;
use App\Http\Controllers\Admin\TrainingController;
use App\Http\Controllers\API\Admin\UpdateTrainingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'access:admin'])->prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('App/Admin/Dashboard');
    })->name('dashboard.admin');
    Route::resource('training', TrainingController::class)->except('edit', 'update');
    Route::resource('accounts', AccountController::class);
    Route::resource('trainee', TraineeController::class)->except(['show', 'create', 'store', 'destroy']);
});
