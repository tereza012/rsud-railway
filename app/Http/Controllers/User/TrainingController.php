<?php

namespace App\Http\Controllers\User;

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

        $trainings = Training::when($search, function ($query) use ($search) {
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

        $historyTraining = Training::whereHas('trainee', function ($query) use ($userId) {
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



        return Inertia::render('App/Trainee/Training/Index', [
            'trainings' => $trainings->items(),
            'history_training' => [
                'trainings' => $historyTraining->items(),
                'currentPage' => $historyTraining->currentPage(),
                'lastPage' => $historyTraining->lastPage(),
                'total' => $historyTraining->total(),
            ],
            'currentPage' => $trainings->currentPage(),
            'lastPage' => $trainings->lastPage(),
            'total' => $trainings->total(),
            'search' => $search,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'page_title' => 'Daftar Pelatihan',
        ]);
    }
}
