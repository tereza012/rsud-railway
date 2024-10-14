<?php

namespace App\Http\Requests\Shared;

use App\Enum\User\SurveyTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSurveyRequest extends FormRequest
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
            'responses.*.training_id' => [
                'required'
            ],
            'responses.*.users_id' => [
                'required'
            ],
            'responses.*.question' => [
                'required',
                'string'
            ],
            'responses.*.score' => [
                'required',
            ],
            'responses.*.survey_type' => [
                'required',
                Rule::in(SurveyTypeEnum::getValues())
            ],
        ];
    }

    public function getResponse()
    {
        return $this->input('responses');
    }

    public function getComment()
    {
        return $this->input('comment');
    }
}
