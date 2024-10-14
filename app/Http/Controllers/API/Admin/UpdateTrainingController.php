<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Training\Api\UpdateScheduleRequest;
use App\Http\Requests\Admin\Training\Api\UpdateTrainingRequest;
use App\Http\Resources\APIResources;
use App\Providers\Services\Admin\UpdateTrainingService;

class UpdateTrainingController extends Controller
{
    public UpdateTrainingService $trainingService;

    public function __construct(UpdateTrainingService $trainingService)
    {
        $this->trainingService = $trainingService;
    }

    public function phase1(UpdateTrainingRequest $request, string $id): APIResources
    {
        return new APIResources(true, "Training updated successfully", $request->toArray());
        $isUpdate = $this->trainingService->phase1($request, $id);

        return $isUpdate
            ? new APIResources(true, "Training updated successfully", null)
            : new APIResources(false, "Training not Updated", null);
    }

    public function phase2(UpdateScheduleRequest $request, string $id): APIResources
    {
        $isUpdate = $this->trainingService->phase2($request, $id);

        return $isUpdate
            ? new APIResources(true, "Schedule updated successfully", null)
            : new APIResources(false, "Schedule not Updated", null);
    }

    public function phase3(Request $request, string $id)
    {

    }

    public function phase4(Request $request, string $id)
    {

    }

    public function phase5(Request $request, string $id)
    {

    }

    public function phase6(Request $request, string $id)
    {

    }
}
