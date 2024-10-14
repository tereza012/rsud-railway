<?php

namespace App\Enum\Training;

use App\Enum\EnumAction;

enum RejectTypeEnum: string
{
    use EnumAction;

    case TYPE_1 = 'Tidak Sesuai Profesi';
    case TYPE_2 = 'File Tidak Valid';
    case TYPE_3 = 'Tidak Sesuai Kriteria';
}
