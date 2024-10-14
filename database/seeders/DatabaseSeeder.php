<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersSeeder::class,
            UserInfoSeeder::class,
            TrainingSeeder::class,
            TraineeTargetsSeeder::class,
            TrainingOrganizerSeeder::class,
            CompetencesSeeder::class,
            TrainingScheduleSeeder::class,
            TraineeSeeder::class,
            TraineeScoresSeeder::class,
            TrainingEvalVarSeeder::class,
            EvaluationValueSeeder::class,
        ]);
    }
}
