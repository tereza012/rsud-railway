<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Coderflex\LaravelTurnstile\LaravelTurnstile;
use Illuminate\Http\Request;

class CaptchaController extends Controller
{
    public function captcha(Request $request)
    {
        $captcha = $request->input('token');
        $turnstile = new LaravelTurnstile();

        if ($turnstile->validate($captcha)) {
            return response()->json(['status' => true], 200);
        } else {
            return response()->json(['status' => false], 400);
        }
    }
}
