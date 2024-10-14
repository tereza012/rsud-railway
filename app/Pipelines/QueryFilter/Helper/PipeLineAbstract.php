<?php

namespace App\Pipelines\QueryFilter\Helper;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pipeline\Pipeline;

abstract class PipeLineAbstract
{
    public function __construct(
        protected Pipeline $pipeline,
    )
    {
    }

    abstract public function thenReturn(array $filters, Builder $query = null): Builder;

    public static function thenReturnStatic(array $filter, Builder $query = null): Builder
    {
        return app(static::class)->thenReturn($filter, $query);
    }
}
