<?php

namespace App\Console\Commands;

use App\Jobs\CleanStorageFilesJob;
use Illuminate\Console\Command;

class CleanStorageFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clean-files';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        CleanStorageFilesJob::dispatch();
        $this->info('All unused files have been deleted');
    }
}
