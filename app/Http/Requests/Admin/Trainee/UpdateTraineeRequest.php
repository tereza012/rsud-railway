<?php

namespace App\Http\Requests\Admin\Trainee;

use App\Enum\Training\RejectTypeEnum;
use App\Enum\Training\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTraineeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->request->replace($this->only([
            'status',
            'reject_category',
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
            'status' => [
                'bail',
                'required',
                Rule::in(StatusEnum::getValues())
            ],
            'reject_category' => [
                'bail',
                'nullable',
                Rule::in(RejectTypeEnum::getValues())
            ]
        ];
    }
}
