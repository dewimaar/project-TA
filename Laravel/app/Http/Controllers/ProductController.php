<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\variations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'store_id' => 'required|exists:stores,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'variations' => 'required|array',
            'variations.*.name' => 'required|string|max:255',
            'variations.*.price' => 'required|numeric',
            'variations.*.stock' => 'required|integer',
            'variations.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $productImagePaths = '';
        foreach ($request->file('images') as $image) {
            $path = $image->store('images/products', 'public');
            $productImagePaths = $path;
        }

        $product = Product::create([
            'user_id' => $request->user_id,
            'store_id' => $request->store_id,
            'name' => $request->name,
            'description' => $request->description,
            'image' => $productImagePaths,
        ]);

        foreach ($request->variations as $variationData) {
            $variationImage = $variationData['image'];
            $variationImagePath = $variationImage->store('images/variations', 'public');

            $variationData['image'] = $variationImagePath;
            $variationData['product_id'] = $product->id;

            $product->variations()->create($variationData);
        }

        return response()->json(['message' => 'Product created successfully'], 201);
    }

    public function getProductsByUser($userId)
    {
        $products = Product::where('user_id', $userId)->get();

        if ($products->isEmpty()) {
            return response()->json([], 200); // Return empty array with 200 status
        }

        return response()->json($products, 200);
    }

    // Tambahkan fungsi show untuk menampilkan detail produk berdasarkan ID
    public function show($id)
    {
        $product = Product::with('variations', 'store')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function getAllProducts($userId)
    {
        $products = Product::with('variations', 'store')->where('user_id','!=', $userId)->get();
        return response()->json($products, 200);
    }

    public function updateVariation(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $variation = variations::find($id);

        if (!$variation) {
            return response()->json(['message' => 'Variation not found'], 404);
        }

        $variation->update([
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        return response()->json(['message' => 'Variation updated successfully'], 200);
    }
}
