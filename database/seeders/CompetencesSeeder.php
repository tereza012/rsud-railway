<?php

namespace Database\Seeders;

use App\Models\Competences;
use App\Models\Training;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompetencesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $training = Training::all();

        foreach ($training as $t) {
            Competences::factory()->count(3)->create([
                'training_id' => $t->id,
            ]);
        }
    }
}
