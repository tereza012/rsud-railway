<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;

Route::apiResource('/user', UserController::class);
