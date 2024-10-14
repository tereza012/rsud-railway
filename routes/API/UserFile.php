<?php

use App\Http\Controllers\API\Shared\UserFileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::post('user/docs', [UserFileController::class, 'store']);
});
