<?php

namespace App\Http\Requests\Admin\Training\Api;

use App\Enum\File\FileTypeEnum;
use App\Trait\HandleFileTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrganizerRequest extends FormRequest
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
            '_token',
            'content',
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
            'content' => [
                'bail',
                'required',
                'array',
            ],
            'content.*.users_id' => [
                'bail',
                'required',
                'exists:users,id',
            ],
            'content.*.files' => [
                'required',
                'array'
            ],
            'content.*.files.*' => [
                'required',
                'file',
                'mimes:pdf,doc,docx',
                'max:2048'
            ],
            'content.*.file_type' => ['required', 'array'],
            'content.*.file_type.*' => ['required', Rule::in(FileTypeEnum::getValues())],
        ];
    }

    protected function passedValidation()
    {
        $this->handleFile();
    }

    public function getStaffContent()
    {
        return $this->input([
            'content',
        ]);
    }
}
