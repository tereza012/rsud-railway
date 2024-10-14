<?php

namespace App\Http\Controllers\API\Shared;

use App\Http\Controllers\Controller;
use App\Http\Resources\APIResources;
use Illuminate\Http\Request;

class NotifController extends Controller
{
    public function index(): APIResources
    {
        return new APIResources(true, 'Success', auth()->user()->unreadNotifications);
    }

    public function markAsRead(): APIResources
    {
        auth()->user()->unreadNotifications->markAsRead();
        return new APIResources(true, 'Success', auth()->user()->unreadNotifications);
    }
}
