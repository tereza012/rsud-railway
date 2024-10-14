<?php

namespace App\Http\Controllers\API\Shared;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shared\StoreUserFileRequest;
use App\Http\Resources\APIResources;
use App\Models\Files;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserFileController extends Controller
{
    public function store(StoreUserFileRequest $request)
    {
        try {
            Log::info('File: ', $request->all());

            $filesData = [];
            $files = $request->input('files');
            $fileTypes = $request->input('file_type');

            foreach ($files as $index => $file) {
                $filesData[] = [
                    'files' => $file,
                    'file_type' => $fileTypes[$index],
                    'users_id' => Auth::id(),
                ];
            }

            Files::insert($filesData);

            return new APIResources(true, 'Data posted successfully.', null);
        } catch (\Exception $e) {
            Log::error('Error posting data: ' . $e->getMessage(), ['exception' => $e]);
            return new APIResources(false, 'Error posting data.', null);
        }
    }
}
