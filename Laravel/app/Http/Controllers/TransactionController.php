<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\variations;
use App\Models\Notification;
use App\Models\Store;

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
            // 'items.*.variation_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
            'items.*.ekspedisi_name' => 'required|string',
            'items.*.ekspedisi_cost' => 'required|numeric|min:1',
            'total_cost' => 'required|numeric|min:0',
            'full_address' => 'nullable|string',
            'google_maps_link' => 'nullable|string',
            'payment_method' => 'nullable|string',
            'payment_proof' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'username_pengguna' => 'nullable|string', 
            'no_rekening' => 'nullable|string',
        ]);

        $productImagePaths = '';
        if ($request->hasFile('payment_proof')) {
                $path = $request->file('payment_proof')->store('images/payments', 'public');
                $productImagePaths = $path;
        }


        foreach ($request->items as $item) {
            $variation = variations::findOrFail($item['variation_id']);
            $newStock = $variation->stock - $item['quantity'];
            $variation->update(['stock' => $newStock]);
            $transaction = Transaction::create([
                'user_id' => $request->user_id,
                'store_id' => $item['store_id'],
                'variation_id' =>  $variation->id,
                'variation_name' =>  $variation->name,
                'variation_image' =>  $variation->image ?? null,
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total_price' => $item['total_price'],
                'ekspedisi_name' => $item['ekspedisi_name'],
                'ekspedisi_cost' => $item['ekspedisi_cost'],
                'full_address' => $request->full_address,
                'google_maps_link' => $request->google_maps_link,
                'payment_method' => $request->payment_method,
                'payment_proof' => $productImagePaths,
                'username_pengguna' => $request->username_pengguna,
                'no_rekening' => $request->no_rekening,
                'total_cost' => $request->total_cost,
            ]);
            $store = Store::where('id',  $item['store_id'])->first();
            Notification::create([
                'user_id' => $store->user_id,
                'variation_id' => $item['variation_id'],
                'transaction_id' => $transaction->id,
                'pesan' => 'Transaksi baru untuk produk ' . $variation->name,
                'sub_pesan' => 'Jumlah: ' . $item['quantity'] . ', Total Harga: ' . $item['total_price'],
            ]);
            if ($newStock < 5 && $newStock > 0) {
                    Notification::create([
                        'user_id' => $store->user_id,
                        'variation_id' => $item['variation_id'],
                        'pesan' => 'Stok hampir habis untuk produk ' . $variation->name,
                        'sub_pesan' => 'Sisa stok: ' . $newStock,
                    ]);
                } elseif ($newStock <= 0) {
                    Notification::create([
                        'user_id' => $store->user_id,
                        'variation_id' => $item['variation_id'],
                        'pesan' => 'Stok habis untuk produk ' . $variation->name,
                        'sub_pesan' => 'Stok saat ini: 0',
                    ]);
                }
        }
        return response()->json(['message' => 'Transaction Success'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e], 500);
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
            Notification::create([
                'user_id' => $transaction->user_id,
                'variation_id' => $transaction->variation_id,
                'transaction_id' => $transaction->id,
                'pesan' => 'Transaksi baru untuk produk ' . $transaction->variation_name,
                'sub_pesan' => 'Status transaksi telah diperbarui menjadi: ' . $request->status,
                'customer' => 1,
            ]);

    return response()->json([
        'message' => 'Status updated successfully.',
        'transaction' => $transaction,
    ]);
}
public function updateShippingConfirm(Request $request, $id)
{
    $request->validate([
        'shipping_confirm' => 'required|string|in:Pesanan Belum Diterima,Pesanan Diterima',
    ]);

    $transaction = Transaction::findOrFail($id);
    $transaction->shipping_confirm = $request->shipping_confirm;
    $transaction->save();

    return response()->json([
        'message' => 'Shipping confirmation updated successfully.',
        'transaction' => $transaction,
    ], 200);
}
}
