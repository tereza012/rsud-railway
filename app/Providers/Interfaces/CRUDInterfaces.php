<?php

namespace App\Providers\Interfaces;

interface CRUDInterfaces
{
    public function store($request): bool;

    public function update($request, $id): bool;

    public function destroy($id): bool;
}
