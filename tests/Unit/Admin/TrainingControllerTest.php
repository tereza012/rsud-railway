<?php

namespace Tests\Unit\Admin;

use App\Http\Controllers\Admin\TrainingController;
use App\Http\Requests\Admin\Training\StoreTrainingRequest;
use App\Providers\Services\Admin\TrainingService;
use Illuminate\Http\RedirectResponse;
use Mockery;
use Tests\TestCase;

class TrainingControllerTest extends TestCase
{
    public function testStore()
    {
        $trainingService = Mockery::mock(TrainingService::class);
        $controller = new TrainingController($trainingService);

        $request = Mockery::mock(StoreTrainingRequest::class);
        $expectedRedirect = new RedirectResponse('/admin/training');

        $trainingService->shouldReceive('store')
            ->once()
            ->with($request)
            ->andReturn($expectedRedirect);

        // Act
        $response = $controller->store($request);


        // Assert
        $this->assertEquals('http://localhost' . $expectedRedirect->headers->get('Location'), $response->headers->get('Location'));
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
