<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Trainee\StoreTraineeRequest;
use App\Http\Requests\Admin\Trainee\UpdateTraineeRequest;
use App\Models\Trainee;
use App\Models\Training;
use App\Providers\Services\Admin\TraineeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TraineeController extends Controller
{
    private TraineeService $traineeService;

    public function __construct(TraineeService $traineeService)
    {
        $this->traineeService = $traineeService;
    }

    /**
     * Display a listing of the resource.
     * Show Trainee List each Training
     */
    public function index(): Response
    {
        $data = Training::with('trainee')->get();

        return Inertia::render('App/Admin/Trainee', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $data = Training::with('trainee')->findOrFail($id);

        return Inertia::render('App/Admin/Trainee/Show', $data);
    }

    /**
     * Update the specified resource in storage.
     * Digunakan untuk melakukan persetujuan untuk mengikuti training atau tidak
     * yang dilempar ke function id trainee bukan id training
     */
    public function update(UpdateTraineeRequest $request, string $id): RedirectResponse
    {
        $isSuccess = $this->traineeService->update($request, $id);

        return $isSuccess
            ? redirect()->route('trainee.index')->with('success', 'Trainee updated successfully')
            : back()->with('error', 'Something went wrong');
    }
}
