<?php

namespace Database\Seeders;

use App\Models\Training;
use App\Models\TrainingSchedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrainingScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $training = Training::all('id');

        foreach ($training as $t) {
            TrainingSchedule::factory()->count(3)->create([
                'training_id' => $t->id,
            ]);
        }
    }
}
