<?php

namespace App\Trait;

use App\Models\Files;
use App\Providers\Services\FilesService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

trait HandleFileTrait
{

    private function searchFile(): array | null
    {
        $keys = array_keys($this->input());
        $targetKeyPath = null;

        if (in_array('files', $keys)) return ['files'];
        if (in_array('profile_picture', $keys)) return ['profile_picture'];

        foreach ($keys as $key) {
            if ($key === '_token') continue;

            $pointer = $this->all()[$key];
            if (array_key_exists('files', $pointer)) {
                $targetKeyPath[] = $key;
                /*continue;*/
            }

            if (is_array($pointer)) {
                foreach ($pointer as $subkey => $value) {
                    if (array_key_exists('files', $value)) {
                        $targetKeyPath[] = $key . ".$subkey";
                        /*continue;*/
                    }
                }
            }
        }

        return $targetKeyPath;
    }

    public function handleFile(): void
    {
        $containFiles = false;
        $fileKeyPath = $this->searchFile();
        $data = $this->input();

        if (in_array('profile_picture', $fileKeyPath)) {
            $fileService = app(FilesService::class);
            $file = $this->file('profile_picture');

            $realName = $file->getClientOriginalName();

            $username = Auth::user()->username;

            if (Storage::fileExists("uploads/profile_picture/{$realName}")) {
                return;
            }

            $uniqueFileName = $fileService->generateUniqueFileName($file, 'profile', $username);
            $fileName[] = $uniqueFileName;

            $directory = 'uploads/' . 'profile_picture';
            $fileService->upload($file, $directory, $uniqueFileName);

            Arr::set($data, 'profile_picture', $fileName);

            $this->merge($data);
            return;
        }

        if (in_array('files', $fileKeyPath)) {
            $filesString = [];

            $fileService = app(FilesService::class);
            $fileName = $filesString;

            foreach ($this->file('files') as $index => $file) {
                if (!$file instanceof UploadedFile) continue;

                $fileType = $this->input('file_type')[$index] ?? '';
                $username = Auth::user()->username;

                $uniqueFileName = $fileService->generateUniqueFileName($file, $fileType, $username);
                $fileName[] = $uniqueFileName;

                $directory = 'uploads/' . $fileType;
                $fileService->upload($file, $directory, $uniqueFileName);
            }

            Arr::set($data, 'files', $fileName);

            $this->merge($data);
        }

        foreach ($fileKeyPath as $rootKeyPath => $keyPath) {
            Arr::set(
                $data,
                explode('.', $keyPath)[0],
                array_values(
                    $data[explode('.', $keyPath)[0]]
                )
            );
            $this->merge($data);
        }

        if ($fileKeyPath != null) $containFiles = true;

        $fileKeyPath = [];
        $fileKeyPath = $this->searchFile();

        foreach ($fileKeyPath as $keyPath) {
            $val = Arr::get($data, "$keyPath.file_type");

            if (!$val)
                array_splice($fileKeyPath, array_search($keyPath, $fileKeyPath), 1);
        }

        if ($containFiles) {
            $fileService = app(FilesService::class);

            foreach ($fileKeyPath as $keyPath) {
                $fileName = [];

                $keyToMerge = $keyPath ==  "files" ? "files" : "$keyPath.files";
                $keyTypePathMerge = $keyPath ==  "files" ? "file_type" : "$keyPath.file_type";

                $targetFile = Arr::get($data, $keyToMerge);
                $targetFileType = Arr::get($data, $keyTypePathMerge);

                if (count(array_keys($targetFileType)) > 0)
                    Arr::set($data, $keyTypePathMerge, array_values($targetFileType));

                if (count(array_keys($targetFile)) > 0)
                    Arr::set($data, $keyToMerge, array_values($targetFile));

                $this->merge($data);
                $iterateFile = $this->input($keyPath ==  "files" ? "files" : "$keyPath.files");

                foreach ($iterateFile as $file) {
                    if (!$file instanceof UploadedFile) continue;

                    $realName = $file->getClientOriginalName();
                    $ky = $keyPath ==  "files" ? "files" : "$keyPath.files";
                    $searchIndex = array_search($file, $this->input($ky));

                    $fileType = $this->input($keyPath ==  "files" ? "file_type" : "$keyPath.file_type")[$searchIndex] ?? '';

                    $username = Auth::user()->username;

                    if (Storage::fileExists("uploads/{$fileType}/{$realName}")) {
                        $fileName[] = $realName;
                        continue;
                    }

                    $uniqueFileName = $fileService->generateUniqueFileName($file, $fileType, $username);
                    $fileName[] = $uniqueFileName;

                    $directory = 'uploads/' . $fileType;
                    $fileService->upload($file, $directory, $uniqueFileName);
                }


                Arr::set($data, $keyToMerge, $fileName);

                $this->merge($data);
            }
        }
    }

    public function getFileUrl(string $fileType, string $fileName): string
    {
        $path = "uploads/{$fileType}/{$fileName}";
        return Storage::url($path);
    }

    public function getRealPath($data, $rootKey)
    {
        $url = [];
        $path = [];
        foreach ($data[$rootKey] as $key => $organizer) {
            $path = [];
            $url = [];

            foreach ($organizer['files'] as $subKey => $file) {
                /*if (isset($data[$rootKey][$key]['file_type'][$subKey])) {*/
                /*print_r($organizer['file_type']);*/
                $path[] = $rootKey . ".$key" . '.url';
                $url[] =
                    $this->getFileUrl($organizer['file_type'][$subKey], $file);
                /*}*/
            }

            Arr::set($data, $rootKey . ".$key" . '.url', $url);
        }

        return $data;
    }

    /**
     * Handle file relation updates and deletions for the given model.
     *
     * @param $model
     * @param $request
     * @param string $relationName
     * @param string $fileKey
     * @return null | bool
     */
    public function updateFileRelations($model, $request, string $relationName = 'files', string $fileKey = 'files'): null|bool
    {
        $isUpdate = false;
        // Check if files exist in the request
        if ($request->getFiles()[$fileKey] === null) {
            return null;
        }

        $existingRelation = $model->$relationName();
        $relation = $model->$relationName ? $model->$relationName->toArray() : [];
        $files = $request->getFiles();
        $filesUrls = $files[$fileKey];

        // Determine which files need to be deleted
        $deletedFiles = array_filter($relation, function ($file) use ($filesUrls) {
            return !in_array($file['files'], $filesUrls);
        });

        // Filter new files
        array_walk($files, function (&$item) use ($relation) {
            if (is_array($item)) {
                $item = array_filter($item, function ($value, $index) use ($relation) {
                    return !isset($relation[$index]) || ($value != $relation[$index]['files'] && $value !== $relation[$index]['file_type']);
                }, ARRAY_FILTER_USE_BOTH);
            } else {
                $item = [];
            }
        });

        $newFiles = $files;

        // Insert new files
        if (count($newFiles) > 0) {
            $this->insertNewFiles($newFiles, $fileKey);
            $isUpdate = true;
        }

        // Delete old files
        if (count($deletedFiles) > 0) {
            $this->deleteOldFiles($deletedFiles, $existingRelation);
            $isUpdate = true;
        }

        return $isUpdate;
    }

    /**
     * Insert new files into the database.
     *
     * @param array $newFiles
     * @param string $fileKey
     */
    protected function insertNewFiles(array $newFiles, string $fileKey): void
    {
        $files = [];
        foreach ($newFiles[$fileKey] as $index => $value) {
            $files[] = [
                'files' => $value,
                'file_type' => $newFiles['file_type'][$index],
                'users_id' => Auth::id()
            ];
        }
        Files::insert($files);
    }

    /**
     * Delete old files from the database and storage.
     *
     * @param array $deletedFiles
     * @param $existingRelation
     */
    protected function deleteOldFiles(array $deletedFiles, $existingRelation): void
    {
        $existingRelation->whereIn('id', array_column($deletedFiles, 'id'))->delete();
        Storage::delete(array_column($deletedFiles, 'files'));
    }
}
