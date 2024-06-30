<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\Storage;

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
}
