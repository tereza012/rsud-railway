<?php

namespace App\Http\Controllers\API\Shared;

use App\Http\Controllers\Controller;
use App\Trait\HandleCookieResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CookiesController extends Controller
{
    use HandleCookieResponse;
    public function destroy(Request $request, string $cookieName): Response
    {
        return $this->handleRemoval($cookieName);
    }
}
