<?php

namespace Database\Seeders;

use App\Models\SurveyResponse;
use App\Models\Training;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SurveyResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $training = Training::all();

        $training->each(function ($train) {
            $userId = User::inRandomOrder()->first()->id;
            SurveyResponse::factory()->count(10)->create([
                'training_id' => $train->id,
                'users_id' => $userId,
            ]);
        });
    }
}
