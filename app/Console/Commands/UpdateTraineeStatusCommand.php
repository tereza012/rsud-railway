<?php

namespace App\Console\Commands;

use App\Jobs\UpdateTraineeStatus;
use Illuminate\Console\Command;

class UpdateTraineeStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trainee:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update trainee status based on training dates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        UpdateTraineeStatus::dispatch();
        $this->info('Trainee status update job dispatched.');
    }
}
