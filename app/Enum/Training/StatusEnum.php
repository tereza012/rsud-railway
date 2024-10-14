<?php

namespace App\Enum\Training;

use App\Enum\EnumAction;

enum StatusEnum: string
{
    use EnumAction;

    case TYPE_1 = 'Menunggu';
    case TYPE_2 = 'Belum Dimulai';
    case TYPE_3 = 'Berlangsung';
    case TYPE_4 = 'Selesai';
    case TYPE_5 = 'Ditolak';
}
