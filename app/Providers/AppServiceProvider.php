<?php

namespace App\Providers;

use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('access', function ($user, ...$roles) {
            return in_array($user->role, $roles) ? Response::allow() : Response::deny();
        });

        Gate::define('can-update', function ($user, $model) {
            return $user->users_id === $model->users_id;
        });

        Gate::define('is_verified', function ($user) {
            return $user->is_verified;
        });

        if (env('APP_ENV') == 'production') {
            URL::forceScheme('https');
        }
    }
}
