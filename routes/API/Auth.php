<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\CaptchaController;

Route::post('captcha', [CaptchaController::class, 'captcha']);
