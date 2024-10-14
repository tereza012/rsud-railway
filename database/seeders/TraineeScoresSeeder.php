<?php

namespace Database\Seeders;

use App\Models\TraineeScores;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TraineeScoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TraineeScores::factory()->count(10)->create();
    }
}
