<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = $path;
        }

        $store = Store::create($validated);

        return response()->json($store, 201);
    }

    public function show($id)
    {
        $store = Store::where('user_id', $id)->firstOrFail();

        return response()->json($store);
    }
    public function getAllStores()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $stores = Store::where('user_id', '!=', $user->id)->get();
            return response()->json($stores, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch stores'], 500);
        }
    }

}
