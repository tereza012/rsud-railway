<?php

namespace App\Enum;

trait EnumAction
{
    public static function getValues(): array
    {
        return array_map(fn($case) => $case->value, static::cases());
    }

    public static function getValuesWithout(...$excepts): array
    {
        return array_diff(static::getValues(), $excepts);
    }
}
