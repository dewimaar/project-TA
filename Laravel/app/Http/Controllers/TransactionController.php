<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function store(Request $request)
{
    try {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.variation_id' => 'required',
            'items.*.variation_name' => 'required',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
            'full_address' => 'nullable|string',
            'google_maps_link' => 'nullable|string',
            'payment_method' => 'nullable|string',
            'payment_proof.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'username_pengguna' => 'nullable|string', 
            'no_rekening' => 'nullable|string',
        ]);

        $productImagePaths = '';
        if ($request->hasFile('payment_proof')) {
            foreach ($request->file('payment_proof') as $image) {
                $path = $image->store('images/payments', 'public');
                $productImagePaths = $path;
            }
        }

        foreach ($request->items as $item) {
            Transaction::create([
                'user_id' => $request->user_id,
                'variation_id' => $item['variation_id'],
                'variation_name' => $item['variation_name'],
                'variation_image' => $item['variation_image'] ?? null,
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total_price' => $item['total_price'],
                'full_address' => $request->full_address,
                'google_maps_link' => $request->google_maps_link,
                'payment_method' => $request->payment_method,
                'payment_proof' => $productImagePaths,
                'username_pengguna' => $request->username_pengguna,
                'no_rekening' => $request->no_rekening,
            ]);
        }
        

        return response()->json(['message' => 'Transactions saved successfully'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}
}
