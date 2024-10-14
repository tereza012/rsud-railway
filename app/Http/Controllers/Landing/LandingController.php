<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $data = [
            'trainings' => Training::with('files')->latest()->get(),
        ];

        return Inertia::render('Landing/Landing', $data);
    }

    public function trainings()
    {
        $data = [
            'trainings' => Training::with('files')->latest()->paginate(6),
        ];

        return Inertia::render('Landing/Training', $data);
    }

    public function profile()
    {
        $data = [
            'data' => 'tbd',
        ];

        return Inertia::render('Landing/Profile', $data);
    }
}
