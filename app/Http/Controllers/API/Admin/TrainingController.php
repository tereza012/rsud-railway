<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Training\Api\StoreEvalVarRequest;
use App\Http\Requests\Admin\Training\Api\StoreOrganizerRequest;
use App\Http\Requests\Admin\Training\Api\StoreScheduleRequest;
use App\Http\Requests\Admin\Training\Api\StoreTrainingRequest;
use App\Http\Requests\Shared\StoreFileRequest;
use App\Trait\HandleCookieResponse;
use App\Trait\HandleFileTrait;
use Illuminate\Http\Response;

class TrainingController extends Controller
{
    use HandleCookieResponse, HandleFileTrait;

    /**
     * @param StoreTrainingRequest $request
     * @return Response
     */
    public function phase1(StoreTrainingRequest $request): Response
    {
        $data = [
            'training' => $request->getTraining(),
            'competences' => $request->getCompetences(),
            'trainee_targets' => $request->getTraineeTargets(),
        ];

        return $this->handlePhase($data, 'Data Training berhasil disimpan', 'admin-training-phase-1');
    }

    /**
     * @param StoreScheduleRequest $request
     * @return Response
     */
    public function phase2(StoreScheduleRequest $request): Response
    {
        $data = [
            'schedule' => $request->getSchedule(),
        ];

        return $this->handlePhase($data, 'Data Jadwal berhasil disimpan', 'admin-training-phase-2');
    }

    /**
     * @param StoreFileRequest $request
     * @return Response
     */
    public function phase3(StoreFileRequest $request): Response
    {
        $data = [
            'file' => $request->getFiles(),
        ];

        foreach ($data['file']['files'] as $key => $file) {
            $data['url'][$key] = $this->getFileUrl($data['file']['file_type'][$key], $file);
        }

        return $this->handlePhase($data, 'Data File berhasil disimpan', 'admin-training-phase-3');
    }

    /**
     * @param StoreOrganizerRequest $request
     * @return Response
     */
    public function phase4(StoreOrganizerRequest $request): Response
    {
        $rootKey = 'organizer_data';
        $data = [
            $rootKey => $request->getStaffContent(),
        ];

        $data = $this->getRealPath($data, $rootKey);
        /*dd($data);*/

        return $this->handlePhase($data, 'Data Organizer berhasil disimpan', 'admin-training-phase-4');
    }

    /**
     * @param StoreOrganizerRequest $request
     * @return Response
     */
    public function phase5(StoreOrganizerRequest $request): Response
    {
        $rootKey = 'facilitator';
        $data = [
            $rootKey => $request->getStaffContent(),
        ];

        $data = $this->getRealPath($data, $rootKey);

        return $this->handlePhase($data, 'Data Facilitator berhasil disimpan', 'admin-training-phase-5');
    }

    /**
     * @param StoreOrganizerRequest $request
     * @return Response
     */
    public function phase6(StoreOrganizerRequest $request): Response
    {
        $rootKey = 'controller';
        $data = [
            $rootKey => $request->getStaffContent(),
        ];
        $data = $this->getRealPath($data, $rootKey);

        return $this->handlePhase($data, 'Data Controller berhasil disimpan', 'admin-training-phase-6');
    }

    //    public function phase7(StoreEvalVarRequest $request): Response
    //    {
    //        $data = [
    //            'eval_var' => $request->getVar()
    //        ];
    //
    //        return $this->handlePhase($data, 'Phase 7 data stored in cookie', 'admin-training-phase-7');
    //    }
}
