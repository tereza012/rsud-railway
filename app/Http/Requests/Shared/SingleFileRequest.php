<?php

namespace App\Http\Requests\Shared;

use App\Enum\File\FileTypeEnum;
use App\Providers\Services\FilesService;
use App\Trait\HandleFileTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SingleFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'training_id' => [
                'required',
                'bail',
            ],
            'users_id' => [
                'required',
                'bail',
            ],
            'files' => [
                'required',
                'bail',
                'file',
                'mimes:pdf,,xls,xlsx',
                'max:2048',
            ],
            'file_type' => [
                'required',
                'bail',
                Rule::in(FileTypeEnum::getValues()),
            ],
        ];
    }

    protected function passedValidation()
    {
        $fileService = app(FilesService::class);
        $file = $this->file('files');
        $fileType = $this->input('file_type');
        $username = Auth::user()->username;
        $uniqueFileName = $fileService->generateUniqueFileName($file, $fileType, $username);
        $directory = 'uploads/' . $fileType;
        $fileService->upload($file, $directory, $uniqueFileName);

        $this->merge([
            'files' => $uniqueFileName,
        ]);
    }

    public function getFiles()
    {
        return [
            'training_id' => $this->input('training_id'),
            'users_id' => $this->input('users_id'),
            'files' => $this->input('files'),
            'file_type' => $this->input('file_type'),
        ];
    }
}
