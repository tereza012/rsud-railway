<?php

namespace App\Providers\Services\Admin;

use App\Models\Training;
use App\Trait\HandleMultipleTrait;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TrainingService
{
    use HandleMultipleTrait;

    /**
     * Store a new training
     *
     * @param $request
     * @return bool
     */
    public function store($request): bool
    {
        try {
            date_default_timezone_set('Asia/Jakarta');

            $training = Training::create($request->getTraining());

            $relationships = [
                'competences' => 'getCompetences',
                'traineeTargets' => 'getTraineeTargets',
                'trainingOrganizer' => 'getOrganizer',
                'trainingSchedule' => 'getSchedule',
                'files' => 'getFiles',
                'filesOrganizer' => 'getFilesOrganizer',
                'filesFacilitator' => 'getFilesFacilitator',
                'filesController' => 'getFilesController',
            ];

            foreach ($relationships as $relation => $method) {
                $items = $this->prepareRelationshipData($request->$method(), $training->id, $relation);

                if (in_array($relation, ['files', 'filesOrganizer', 'filesFacilitator', 'filesController'])) {
                    $training->files()->insert($items);

                } else {
                    $training->$relation()->createMany($items);
                }
            }

            return true;
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return false;
        }
    }

    /**
     * @param $data
     * @param $trainingId
     * @param $relation
     * @return array
     */
    private function prepareRelationshipData($data, $trainingId, $relation): array
    {
        return match ($relation) {
            'competences' => array_map(fn($item) => [
                'training_id' => $trainingId,
                'name_competences' => $item
            ], $data),

            'traineeTargets' => array_map(fn($item) => [
                'training_id' => $trainingId,
                'target_type' => $item
            ], $data),

            'trainingOrganizer' => array_map(fn($id) => [
                'users_id' => $id,
                'training_id' => $trainingId,
            ], $data),

            'trainingSchedule' => array_map(fn($item) => [
                'training_id' => $trainingId,
                'materi_name' => $item['materi_name'],
                'desc_schedule' => $item['desc_schedule'],
                'start_at' => strtotime($item['start_at']) * 1000,
                'end_at' => strtotime($item['end_at']) * 1000,
            ], $data),

            'files' => array_map(fn($index) => [
                'files' => $data[$index]['files'],
                'file_type' => $data[$index]['file_type'],
                'training_id' => $trainingId,
            ], array_keys($data)),

            'filesOrganizer' => array_map(fn($index) => [
                'files' => $data[$index]['files'],
                'file_type' => $data[$index]['file_type'],
                'training_id' => $trainingId,
                'users_id' => $data[$index]['users_id'],
            ], array_keys($data)),

            'filesFacilitator' => array_map(fn($index) => [
                'files' => $data[$index]['files'],
                'file_type' => $data[$index]['file_type'],
                'training_id' => $trainingId,
                'users_id' => $data[$index]['users_id'],
            ], array_keys($data)),

            'filesController' => array_map(fn($index) => [
                'files' => $data[$index]['files'],
                'file_type' => $data[$index]['file_type'],
                'training_id' => $trainingId,
                'users_id' => $data[$index]['users_id'],
            ], array_keys($data)),

            default => [],
        };
    }

    /**
     * Delete a training
     *
     * @param $id
     * @return bool
     */
    public function destroy($id): bool
    {
        try {
            DB::beginTransaction();

            $training = Training::findOrFail($id);

            $training->delete();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
            return false;
        }
    }
}
