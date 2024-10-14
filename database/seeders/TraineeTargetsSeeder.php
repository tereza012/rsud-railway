<?php

namespace Database\Seeders;

use App\Models\TraineeTargets;
use App\Models\Training;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TraineeTargetsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainings = Training::all();

        foreach ($trainings as $training) {
            TraineeTargets::factory()->create([
                'training_id' => $training->id,
            ]);
        }
    }
}
