<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisterController::class, 'store']);

    Route::get('login', [AuthController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('logout', [AuthController::class, 'destroy'])
        ->name('logout');
});

// buat ngetest foto bisa ditampilin atau kaga di fe
Route::get('test', function () {
    $user = \App\Models\UserInfo::find(1);
    dd($user->toArray());

    $fileUrl = \Illuminate\Support\Facades\Storage::url('uploads/' . 'profile_picture/' . $user->profile_picture);

    return \Inertia\Inertia::render('Auth/testFoto', [
        'fileUrl' => $fileUrl
    ]);
});
