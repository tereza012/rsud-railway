<?php

namespace App\Enum\Training;

use App\Enum\EnumAction;

enum TrainingTypeEnum: string
{
    use EnumAction;

    case PELATIHAN = 'Pelatihan';
    case COACHING = 'Coaching';
    case WEBINAR = 'Webinar';
    case SEMINAR = 'Seminar';
    case IHT = 'In House Training';
    case WORKSHOP = 'Workshop';
    // case KONFERENSI = 'Konferensi';
    // case MENTORING = 'Mentoring';
    // case MOOC = 'MOOC';
}
