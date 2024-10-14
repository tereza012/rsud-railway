<?php

namespace App\Http\Requests\Admin\Training\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvalVarRequest extends FormRequest
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
            'variable' => [
                'bail',
                'required',
                'array'
            ],
            'variable.*' => [
                'bail',
                'required',
                'string',
                'max:255'
            ]
        ];
    }

    public function getVar()
    {
        return [
            'variable' => $this->input('variable')
        ];
    }
}
