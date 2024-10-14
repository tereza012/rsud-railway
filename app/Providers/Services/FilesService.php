<?php

namespace App\Providers\Services;

use App\Models\Files;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FilesService
{
    public function generateUniqueFileName(UploadedFile $file, string $fileType, string $username): string
    {
        $timestamp = Carbon::now()->timestamp;
        $fileHashName = $file->hashName();

        return $timestamp . '_' . $fileType . '_' . $username . '_' . $fileHashName;
    }

    public function upload(UploadedFile $file, string $directory, string $uniqueFileName): string
    {
        return $file->storeAs($directory, $uniqueFileName, 'public');
    }

    public function deleteFile(string $filePath): bool
    {
        return Storage::disk('public')->delete($filePath);
    }
}
