<?php

namespace Database\Migrations\Utils;

class Loader
{
    private $UUID_GEN_PATH = "/database/migrations/Utils/uuid-generator.txt";

    public static $UUID_GENERATOR = file_get_contents(base_path($this->UUID_GEN_PATH));
}
