<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $notif = Notification::with('variation')->where('user_id',  $user->id)->get();
        return response()->json($notif, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'variation_id' => 'nullable|exists:variations,id',
            'transaction_id' => 'nullable|exists:transactions,id',
            'pesan' => 'required|string',
            'sub_pesan' => 'nullable|string'
        ]);

        $notification = Notification::create($request->all());

        return response()->json($notification, 201);
    }

    public function show($id)
    {
        return Notification::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'transaction_id' => 'required|exists:transactions,id',
            'pesan' => 'required|string',
            'sub_pesan' => 'nullable|string',
            'customer' => 'nullable|integer',
        ]);

        $notification = Notification::findOrFail($id);
        $notification->update($request->all());

        return response()->json($notification, 200);
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(null, 204);
    }
}
