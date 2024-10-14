<?php

namespace App\Http\Requests\Director;

use Illuminate\Foundation\Http\FormRequest;

class TrainingRequest extends FormRequest
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
            'is_accept' => [
                'bail',
                'required',
                'boolean'
            ]
        ];
    }

    protected function passedValidation()
    {
        return $this->only(['is_accept']);
    }
}
