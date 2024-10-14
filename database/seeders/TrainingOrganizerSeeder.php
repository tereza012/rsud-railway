<?php

namespace Database\Seeders;

use App\Models\TrainingOrganizer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrainingOrganizerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TrainingOrganizer::factory()->count(300)->create();
    }
}
