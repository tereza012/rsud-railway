<?php

namespace App\Enum\User;

use App\Enum\EnumAction;

enum EducationEnum: string
{
    use EnumAction;

        // case SD = 'SD';
        // case SMP = 'SMP';
        // case SMA = 'SMA';
    case D1 = 'D1';
    case D2 = 'D2';
    case D3 = 'D3';
    case S1 = 'S1';
    case S2 = 'S2';
    case S3 = 'S3';
}
