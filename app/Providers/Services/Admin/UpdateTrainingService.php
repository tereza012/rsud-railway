<?php

namespace App\Providers\Services\Admin;

use App\Models\Training;
use App\Trait\HandleMultipleTrait;
use Illuminate\Support\Facades\DB;

class UpdateTrainingService
{
    use HandleMultipleTrait;

    /**
     * Update training
     *
     * @param $request
     * @param $id
     * @return bool
     */
    public function phase1($request, $id): bool
    {
        try {
            DB::beginTransaction();
            $isUpdated = false;

            $training = Training::findOrfail($id);

            $training->fill($request->getTraining());
            if ($training->isDirty()) {
                $isUpdated = true;
                $training->save();
            }

            $competences = $request->getCompetences();
            $traineeTargets = $request->getTraineeTargets();

            $isUpdated = $this->handleUpdate($training, $competences, 'competencesId', 'competences') || $isUpdated;
            $isUpdated = $this->handleUpdate($training, $traineeTargets, 'traineeTargetsId', 'traineeTargets') || $isUpdated;

            DB::commit();
            return $isUpdated;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    /**
     * Update training
     *
     * @param $request
     * @param $id
     * @return bool
     */
    public function phase2($request, $id): bool
    {
        try {
            DB::beginTransaction();
            $isUpdated = false;

            $training = Training::findOrfail($id);

            $schedule = $request->getSchedule();

            $isUpdated = $this->handleUpdate($training, $schedule, 'scheduleId', 'schedule');

            DB::commit();
            return $isUpdated;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

//    TODO PHASE 3, 6
}
