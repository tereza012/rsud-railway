<?php

use App\Http\Controllers\API\Shared\NotifController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/notif', [NotifController::class, 'index']);
    Route::get('/notif/mark-as-read', [NotifController::class, 'markAsRead']);
});
