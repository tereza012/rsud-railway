<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shared\SingleFileRequest;
use App\Models\Files;
use App\Models\SurveyResponse;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $search = $request->input('search', '');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $trainings = Training::whereHas('trainingOrganizer', function ($query) use ($userId) {
            $query->where('users_id', $userId);
        })
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%")
                    ->orWhere('purpose', 'like', "%{$search}%");
            })
            ->when($startDate, function ($query) use ($startDate) {
                $query->where('training_start', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                $query->where('training_end', '<=', $endDate);
            })
            ->paginate(10);

        return Inertia::render('App/Shared/Training', [
            'trainings' => $trainings->items(),
            'currentPage' => $trainings->currentPage(),
            'lastPage' => $trainings->lastPage(),
            'total' => $trainings->total(),
            'search' => $search,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }

    public function show(string $id)
    {
        $userId = Auth::id();

        $survey = SurveyResponse::where('training_id', $id)
            ->where('users_id', $userId)
            ->first();

        $training = Training::whereHas('trainingOrganizer', function ($query) use ($userId) {
            $query->where('users_id', $userId);
        })
            ->with(['files' => function ($query) use ($userId) {
                $query->where('users_id', $userId)
                    ->select('id', 'training_id', 'users_id', 'files', 'file_type');
            }])
            ->select('id', 'name', 'type', 'purpose', 'capacity', 'training_start', 'training_end')
            ->find($id);

        return Inertia::render('App/Shared/TrainingDetail', [
            'training' => $training,
            'survey' => $survey,
        ]);
    }

    public function store(SingleFileRequest $request)
    {
        try {
            $files = $request->getFiles();
            Files::where('training_id', $files['training_id'])
                ->where('users_id', $files['users_id'])
                ->where('file_type', $files['file_type'])
                ->delete();

            Files::insert($files);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to upload file');
        }
    }
}
