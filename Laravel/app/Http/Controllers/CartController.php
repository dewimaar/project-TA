<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;
use App\Models\Store;
use App\Models\variations;
use Illuminate\Support\Facades\Auth;
use App\Models\ShippingInfo;


class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'store_id' => 'required|exists:stores,id',
            'variation_id' => 'required|exists:variations,id',
            'variation_name' => 'required', // Validasi untuk nama variasi
            'variation_image' => 'nullable', // Validasi untuk gambar variasi (opsional)
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
        ]);

        $cartItem = Cart::create([
            'user_id' => $request->user_id,
            'store_id' => $request->store_id,
            'variation_id' => $request->variation_id,
            'variation_name' => $request->variation_name, // Menyimpan nama variasi
            'variation_image' => $request->variation_image, // Menyimpan gambar variasi
            'quantity' => $request->quantity,
            'unit_price' => $request->unit_price,
            'total_price' => $request->total_price,
        ]);

        return response()->json($cartItem, 201);
    }
    // public function index(Request $request)
    // {
    //     // Mengambil user_id dari pengguna yang terautentikasi
    //     $user_id = Auth::id();

    //     // Mengambil data cart berdasarkan user_id
    //     $cartItems = Cart::with('store')->where('user_id', $user_id)->get();

    //     return response()->json($cartItems);
    // }
    public function getProductsGroupedByStore(Request $request)
    {
        // Ambil user_id dari request atau session (tergantung bagaimana Anda mengelola user)
        $userId = $request->user()->id;

        // Panggil fungsi dari model untuk mendapatkan produk yang dikelompokkan berdasarkan store
        $productsGroupedByStore = Cart::getProductsGroupedByStore($userId);

        // Loop melalui setiap store_id untuk mendapatkan informasi pengiriman dan nama toko
        $productsWithShippingInfo = $productsGroupedByStore->map(function ($products, $storeId) {
            $store = Store::find($storeId);
            $shippingInfo = ShippingInfo::getShippingInfoByStore($storeId);

            return [
                'idToko' => $store->id,
                'nama' => $store->name,
                'produk' => $products,
                'shipping_info' => $shippingInfo
            ];
        })->values(); // Menggunakan values() untuk menghilangkan key store_id dari hasil

        return response()->json($productsWithShippingInfo);
    }
    public function deleteCartItem($id)
{
    $cartItem = Cart::find($id);

    if (!$cartItem) {
        return response()->json(['message' => 'Cart item not found'], 404);
    }

    $cartItem->delete();

    return response()->json(['message' => 'Cart item deleted successfully']);
}
    
}
