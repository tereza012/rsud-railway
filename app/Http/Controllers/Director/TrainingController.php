<?php

namespace App\Http\Controllers\Director;

use App\Http\Controllers\Controller;
use App\Http\Requests\Director\TrainingRequest;
use App\Models\Training;
use App\Models\TrainingOrganizer;
use App\Notifications\TrainingAssignedNotification;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = Training::with(['files', 'trainee', 'trainingOrganizer', 'traineeTargets', 'trainingSchedule', 'competences', 'trainingEvalVar'])->get();

        return Inertia::render('Director/Training/Index', [
            'data' => $data,
        ]);
    }

    /**
     * Show the form for show the specified resource.
     */
    public function show(string $id): Response
    {
        $data = Training::with(['files', 'trainee', 'trainingOrganizer', 'traineeTargets', 'trainingSchedule', 'competences', 'trainingEvalVar'])->findOrFail($id);

        return Inertia::render('Director/Training/Show', [
            'data' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Director can accept or reject the training request.
     *
     * @param TrainingRequest $request
     * @param string $id
     * @return RedirectResponse
     */
    public function update(TrainingRequest $request, string $id): RedirectResponse
    {
        try {
            $data = Training::with("trainingOrganizer")->findOrFail($id);
            $data->update($request->validated());

            foreach ($data->trainingOrganizer as $organizer) {
                $organizer->notify(new TrainingAssignedNotification($data->id));
            }

            return redirect('director/training/' . $id);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     * Director can delete some training organizer
     *
     * @param string $id
     * @return RedirectResponse
     */
    public function destroy(string $id): RedirectResponse
    {
        try {
            TrainingOrganizer::findOrFail($id)->delete();

            return redirect('director/training/' . $id);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
