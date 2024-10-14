<?php

namespace App\Pipelines\QueryFilter\User;

use Illuminate\Database\Eloquent\Builder;

class ByRole
{
    public function handle(Builder $query, \Closure $next, $role, int ...$id): Builder
    {
        return $next($query->where('role', $role));
    }
}
