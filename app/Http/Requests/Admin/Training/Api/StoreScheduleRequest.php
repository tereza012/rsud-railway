<?php

namespace App\Http\Requests\Admin\Training\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
{
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
            'schedule_content',
            '_token',
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
            'schedule_content' => [
                'bail',
                'required',
                'array',
            ],
            'schedule_content.*.materi_name' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'schedule_content.*.desc_schedule' => [
                'bail',
                'required',
                'string',
                'max:1000',
            ],
            'schedule_content.*.start_at' => [
                'bail',
                'required',
                'date_format:Y-m-d H:i:s',
                'before_or_equal:end_at',
            ],
            'schedule_content.*.end_at' => [
                'bail',
                'required',
                'date_format:Y-m-d H:i:s',
                'after_or_equal:start_at',
            ],
        ];
    }

    public function getSchedule()
    {
        return $this->only([
            'schedule_content',
        ]);
    }
}
