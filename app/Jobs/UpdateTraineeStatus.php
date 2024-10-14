<?php

namespace App\Jobs;

use App\Models\Training;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateTraineeStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $today = now()->toDateString();

        Training::with('trainee')->chunk(100, function ($trainings) use ($today) {
            foreach ($trainings as $training) {
                if ($today >= $training->training_start && $today < $training->training_end) {
                    $training->trainee()->update(['status' => 'Berlangsung']);

                } elseif ($today >= $training->training_end) {
                    $training->trainee()->update(['status' => 'Selesai']);
                }
            }
        });
    }
}
