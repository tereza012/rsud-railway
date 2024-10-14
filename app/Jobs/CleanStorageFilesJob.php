<?php

namespace App\Jobs;

use App\Enum\File\FileTypeEnum;
use App\Models\Files;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class CleanStorageFilesJob implements ShouldQueue
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
    public function handle(): void
    {
        $fileType = FileTypeEnum::getValues();

        foreach ($fileType as $directory) {
            $files = Storage::files("public/uploads/$directory");

            foreach ($files as $file) {
                $filename = basename($file);
                $fileExist = Files::where('files', $filename)->exists();

                if (!$fileExist) {
                    Storage::delete($file);
                    echo "File $filename has been deleted\n";
                }
            }
        }

        echo "All unused files have been deleted\n";
    }
}
