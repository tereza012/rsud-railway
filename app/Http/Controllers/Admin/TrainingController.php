<?php

namespace App\Http\Controllers\Admin;

use App\Enum\File\FileTypeEnum;
use App\Enum\Training\TrainingTypeEnum;
use App\Enum\User\NakesEnum;
use App\Enum\User\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Training\StoreTrainingRequest;
use App\Models\Training;
use App\Pipelines\QueryFilter\Helper\UserPipeline;
use App\Pipelines\QueryFilter\User\ByRole;
use App\Providers\Services\Admin\TrainingService;
use App\Trait\HandleCookieResponse;
use App\Trait\HandleFileTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TrainingController extends Controller
{
    use HandleFileTrait, HandleCookieResponse;

    private TrainingService $trainingService;

    public function __construct(TrainingService $trainingService)
    {
        $this->trainingService = $trainingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $phaseData = [];
        for ($i = 1; $i <= 6; $i++) {
            $cookieName = "admin-training-phase-$i";
            $cookieValue = request()->cookie($cookieName);

            if (!$cookieValue) {
                $phaseData["phase_$i"] = null;
                continue;
            }

            $data = json_decode($cookieValue, true);

            if (in_array($i, [3, 4, 5, 6])) {
                $isValid = true;

                if ($i == 3) {
                    if (isset($data['file']['files']) && isset($data['file']['file_type'])) {
                        foreach ($data['file']['files'] as $index => $fileName) {
                            $fileType = $data['file']['file_type'][$index];
                            if (!Storage::exists("public/uploads/$fileType/$fileName")) {
                                $isValid = false;
                                break;
                            }
                        }
                    } else {
                        $isValid = false;
                    }
                } else { // for phases 4, 5, 6
                    foreach ($data as $value) {
                        foreach ($value as $item) {
                            if (!isset($item['files']) || !isset($item['file_type'])) {
                                $isValid = false;
                                break 2;
                            }

                            foreach ($item['files'] as $index => $file) {
                                $fileType = $item['file_type'][$index];
                                if (!Storage::exists("public/uploads/$fileType/$file")) {
                                    $isValid = false;
                                    break 3;
                                }
                            }
                        }
                    }
                }

                if (!$isValid) {
                    $this->handleRemoval($cookieName);
                    $phaseData["phase_$i"] = null;
                    continue;
                }
            }

            $phaseData["phase_$i"] = $data;
        }

        $data = [
            'title' => 'Dashboard',
            'trainings' => Training::all(),
            'facilitator' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::FACILITATOR->value])->with('files')->get(),
            'normal_user' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::USER->value])->with('files')->get(),
            'organizer' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::ORGANIZER->value])->with('files')->get(),
            'controller' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::CONTROLLER->value])->with('files')->get(),
            'training_types' => TrainingTypeEnum::getValues(),
            'targets' => NakesEnum::getValues(),
            'file_types' => FileTypeEnum::getValues(),
            'phase_data' => $phaseData
        ];

        foreach (['facilitator', 'normal_user', 'organizer', 'controller'] as $role) {
            foreach ($data[$role] as $user) {
                if ($user->files) {
                    foreach ($user->files as $file) {
                        $file->url = $this->getFileUrl($file->file_type, $file->files);
                    }
                }
            }
        }

        return Inertia::render('App/Admin/Training', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('App/Admin/TrainingCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainingRequest $trainingRequest): RedirectResponse
    {
        $bool = $this->trainingService->store($trainingRequest);

        $response = $bool
            ? redirect('/admin/training')->with('success', 'Training created successfully')
            : redirect()->back()->withErrors('Something went wrong');

        if ($bool) {
            for ($i = 1; $i <= 6; $i++) {
                $cookieName = "admin-training-phase-$i";
                $response->withoutCookie($cookieName);
            }
        }

        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $data = [
            'title' => 'Training Details',
            'training' => Training::with([
                'competences',
                'files',
                'traineeTargets',
                'trainingOrganizer.user',
                'trainee',
                'trainingSchedule',
            ])->findOrFail($id),
            'facilitator' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::FACILITATOR->value])->with('files')->get(),
            'normal_user' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::USER->value])->with('files')->get(),
            'organizer' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::ORGANIZER->value])->with('files')->get(),
            'controller' => UserPipeline::thenReturnStatic([ByRole::class . ":" . RoleEnum::CONTROLLER->value])->with('files')->get(),
            'training_types' => TrainingTypeEnum::getValues(),
            'targets' => NakesEnum::getValues(),
            'file_types' => FileTypeEnum::getValues(),
        ];

        foreach (['facilitator', 'normal_user', 'organizer', 'controller', 'training'] as $role) {
            if ($role === 'training') {
                if ($data[$role]['files']) {
                    foreach ($data[$role]['files'] as $file) {
                        $file->url = $this->getFileUrl($file->file_type, $file->files);
                    }
                }
            } else {
                foreach ($data[$role] as $user) {
                    if ($user->files) {
                        foreach ($user->files as $file) {
                            $file->url = $this->getFileUrl($file->file_type, $file->files);
                        }
                    }
                }
            }
        }

        return Inertia::render('App/Admin/Training/Detail', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $bool = $this->trainingService->destroy($id);

        return $bool
            ? redirect()->route('training.index')->with('error', 'Something went wrong')
            : redirect()->route('training.index')->with('success', 'Training deleted successfully');
    }
}
