<?php

namespace App\Http\Middleware;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userInfo = null;
        if ($request->user())
            $userInfo = UserInfo::where('users_id', $request->user()->id)->first();


        return array_merge(parent::share($request), [
            'current_page' => $request->route()->uri(),
            'csrf_token' => csrf_token(),
            'user' => fn() => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'role' => $request->user()->role,
                'avatar' => fn() => $request->user() && $userInfo ? $userInfo->profile_picture : null,
            ] : null,
        ]);
    }
}
