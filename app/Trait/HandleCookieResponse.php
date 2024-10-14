<?php

namespace App\Trait;

use App\Http\Resources\APIResources;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;

trait HandleCookieResponse
{
    /**
     * Handle the phase data and return a response with a cookie.
     *
     * @param array $data
     * @param string $message
     * @param string $cookieName
     * @return ResponseFactory|Application|Response
     */
    protected function handlePhase(array $data, string $message, string $cookieName): ResponseFactory|Application|Response
    {
        $cookieData = json_encode($data);

        $response = new APIResources(true, $message, $data);

        return response($response)
            ->withCookie(cookie($cookieName, $cookieData, (60 * 24) * 7));
    }

    protected function handleRemoval(string $cookieName): Response
    {
        $cookieData = Cookie::forget($cookieName);
        $response = new APIResources(true, "Cookie removed", null);

        if ($cookieName == '*') {
            for ($i = 1; $i <= 6; $i++) {
                $cookieData[] = Cookie::forget("admin-training-phase-$i");
            }

            $response = new APIResources(true, "All cookies removed", null);

            return response($response)
                ->withCookie($cookieData);
        }

        return response($response)
            ->withCookie($cookieData);
    }
}
