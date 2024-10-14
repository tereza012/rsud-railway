<?php

namespace App\Providers;

use App\Providers\Services\Admin\AccountService;
use App\Providers\Services\Admin\TraineeService;
use App\Providers\Services\Admin\TrainingService;
use App\Providers\Services\Admin\UpdateTrainingService;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class AdminServiceProvider extends ServiceProvider implements DeferrableProvider
{
    protected array $serviceProviders = [
        TrainingService::class,
        AccountService::class,
        TraineeService::class,
        UpdateTrainingService::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        foreach ($this->serviceProviders as $provider) {
            $this->app->singleton($provider);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    public function provides(): array
    {
        return $this->serviceProviders;
    }
}
