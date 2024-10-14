<?php

namespace App\Enum\User;

use App\Enum\EnumAction;

enum NakesEnum: string
{
    use EnumAction;

    case TYPE_1 = 'Tenaga Medis';
    case TYPE_2 = 'Tenaga Psikologi Klinis';
    case TYPE_3 = 'Tenaga Keperawatan';
    case TYPE_4 = 'Tenaga Kebidanan';
    case TYPE_5 = 'Tenaga Kefarmasian';
    case TYPE_6 = 'Tenaga Kesehatan Masyarakat';
    case TYPE_7 = 'Tenaga Kesehatan Lingkungan';
    case TYPE_8 = 'Tenaga Gizi';
    case TYPE_9 = 'Tenaga Keterapian Fisik';
    case TYPE_10 = 'Tenaga Keteknisian Medis';
    case TYPE_11 = 'Tenaga Teknologi Biomedika';
    case TYPE_12 = 'Tenaga Kesehatan Tradisional';
}
