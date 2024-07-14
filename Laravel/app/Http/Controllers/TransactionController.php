<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\variations;

class TransactionController extends Controller
{
    public function store(Request $request)
{
    try {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.variation_id' => 'required',
            'items.*.store_id' => 'required',
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
            $variation = variations::findOrFail($item['variation_id']);
            $newStock = $variation->stock - $item['quantity'];
            $variation->update(['stock' => $newStock]);
            Transaction::create([
                'user_id' => $request->user_id,
                'store_id' => $item['store_id'],
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
public function index(Request $request)
{
    try {
        $userId = $request->user()->id;
        $transactions = Transaction::where('user_id', $userId)->get();

        return response()->json($transactions, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}
public function indexUser($id)
{
    try {
        
        $transactions = Transaction::where('store_id', $id)->get();

        return response()->json($transactions, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}

public function show($id)
{
    try {
        $transaction = Transaction::with('user')->find($id);
        return response()->json($transaction, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Transaction not found'], 404);
    }
}
public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|string|in:Pending,Diproses,Dikirim,Selesai,Dibatalkan',
    ]);

    $transaction = Transaction::findOrFail($id);
    $transaction->status = $request->status;
    $transaction->save();

    return response()->json([
        'message' => 'Status updated successfully.',
        'transaction' => $transaction,
    ]);
}
}
