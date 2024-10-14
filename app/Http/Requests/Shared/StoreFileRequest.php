<?php

namespace App\Http\Requests\Shared;

use App\Enum\File\FileTypeEnum;
use App\Trait\HandleFileTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFileRequest extends FormRequest
{
    use HandleFileTrait;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->request->replace($this->only([
            'files',
            'file_type',
        ]));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'files' => ['required', 'array'],
            'files.*' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:2048'],
            'file_type' => ['required', 'array'],
            'file_type.*' => ['required', Rule::in(FileTypeEnum::getValues())],
        ];
    }

    protected function passedValidation(): void
    {
        $this->handleFile();
    }

    public function getFiles(): array
    {
        return [
            'files' => $this->input('files'),
            'file_type' => $this->input('file_type'),
        ];
    }
}
