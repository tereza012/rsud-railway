<?php

namespace App\Pipelines\QueryFilter\Helper;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserPipeline extends PipeLineAbstract
{

    public function thenReturn(array $filters, Builder $query = null): Builder
    {
        $query = $query ?? User::query();
        return $this->pipeline
            ->send($query)
            ->through($filters)
            ->thenReturn();
    }
}
