<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;
use App\Models\variations;
use Illuminate\Support\Facades\Auth;


class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'variation_id' => 'required|exists:variations,id',
            'variation_name' => 'required', // Validasi untuk nama variasi
            'variation_image' => 'nullable', // Validasi untuk gambar variasi (opsional)
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
        ]);

        $cartItem = Cart::create([
            'user_id' => $request->user_id,
            'variation_id' => $request->variation_id,
            'variation_name' => $request->variation_name, // Menyimpan nama variasi
            'variation_image' => $request->variation_image, // Menyimpan gambar variasi
            'quantity' => $request->quantity,
            'unit_price' => $request->unit_price,
            'total_price' => $request->total_price,
        ]);

        return response()->json($cartItem, 201);
    }
    public function index(Request $request)
    {
        // Mengambil user_id dari pengguna yang terautentikasi
        $user_id = Auth::id();

        // Mengambil data cart berdasarkan user_id
        $cartItems = Cart::where('user_id', $user_id)->get();

        return response()->json($cartItems);
    }
}