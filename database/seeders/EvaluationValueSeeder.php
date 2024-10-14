<?php

namespace Database\Seeders;

use App\Models\EvaluationValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EvaluationValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EvaluationValue::factory()->count(20)->create();
    }
}
