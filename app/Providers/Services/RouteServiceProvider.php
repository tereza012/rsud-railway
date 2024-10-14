<?php

namespace App\Providers\Services;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapWebRoutes();
        $this->mapApiRoutes();
        $this->mapApiDirectoryRoutes();
        $this->mapWebDirectoryRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }

    /**
     * Load routes from the "routes/API" directory.
     *
     * @return void
     */
    protected function mapApiDirectoryRoutes()
    {
        $apiRouteFiles = File::glob(base_path('routes/API/*.php'));

        foreach ($apiRouteFiles as $routeFile) {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group($routeFile);
        }

        $apiRouteFiles = File::glob(base_path('routes/API/**/*.php'));
        $dirs = array_filter(glob(base_path('routes/API/**')), 'is_dir');

        $splittedRoutes = [];
        $filterDir = [];

        foreach ($dirs as $dir) {
            array_push($splittedRoutes, (explode('routes/API/', $dir))[1]);
        }

        foreach ($apiRouteFiles as $routeFile) {
            foreach ($splittedRoutes as $dir) {
                if (str_contains($routeFile, $dir)) {
                    array_push($filterDir, $dir);
                }
            }
        }


        foreach ($apiRouteFiles as $routeFile) {
            foreach ($filterDir as $dir) {
                // dd($dir);
                if (str_contains($routeFile, $dir)) {
                    Route::prefix(strtolower('api/' . $dir))
                        ->middleware('api')
                        ->namespace($this->namespace)
                        ->group($routeFile);
                }
            }
        }
    }

    /**
     * Load routes from the "routes/WEB" directory.
     *
     * @return void
     */
    protected function mapWebDirectoryRoutes()
    {
        $apiRouteFiles = File::glob(base_path('routes/WEB/*.php'));

        foreach ($apiRouteFiles as $routeFile) {
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group($routeFile);
        }

        $apiRouteFiles = File::glob(base_path('routes/WEB/**/*.php'));

        foreach ($apiRouteFiles as $routeFile) {
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group($routeFile);
        }
    }
}
