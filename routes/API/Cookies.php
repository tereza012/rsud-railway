<?php

use App\Http\Controllers\API\Shared\CookiesController;
use Illuminate\Support\Facades\Route;

/*Route::middleware(['web', 'auth'])->group(function () {*/
    Route::delete('/cookie/{cookieName}', [CookiesController::class, 'destroy']);
/*});*/
