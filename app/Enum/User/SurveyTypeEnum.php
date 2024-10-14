<?php

namespace App\Enum\User;

use App\Enum\EnumAction;

enum SurveyTypeEnum: string
{
    use EnumAction;

    case LEADERSHIP = 'leadership';
    case CUSTOMER_SATISFACTION = 'customer_satisfaction';
    case CRITICISM_AND_SUGGESTION = 'criticism_and_suggestion';
}
