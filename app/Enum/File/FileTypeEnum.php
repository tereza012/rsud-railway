<?php

namespace App\Enum\File;

use App\Enum\EnumAction;

enum FileTypeEnum: string
{
    use EnumAction;

    case CV = 'cv';
    case IJAZAH = 'ijazah';
    case SK = 'sk';
    case SERTIFIKAT = 'sertifikat';
    case SPT = 'spt';
    case REKENING = 'rekening';
    case NPWP = 'npwp';
    case TPK = 'tpk';
    case TOT = 'tot';
    case STR = 'st'; // surat tugas
    case REPORT = 'laporan';
    case SCORE = 'score';
}
