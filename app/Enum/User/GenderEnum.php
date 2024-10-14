<?php

namespace App\Enum\User;

use App\Enum\EnumAction;

enum GenderEnum: string
{
    use EnumAction;

    case MALE = 'Laki-laki';
    case FEMALE = 'Perempuan';
}
