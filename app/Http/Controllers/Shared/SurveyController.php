<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shared\StoreSurveyRequest;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index(string $id)
    {
        $trainingId = $id;
        return Inertia::render('App/Shared/Survey', compact('trainingId'));
    }

    public function store(StoreSurveyRequest $request)
    {
        try {
            SurveyResponse::insert($request->getResponse());
            SurveyResponse::insert($request->getComment());

            return redirect()->back()->with('success', 'Survey has been saved');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
