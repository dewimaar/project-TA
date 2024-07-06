<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\BankDetailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUserData']);


// create market user
// Route::post('/stores', [StoreController::class, 'register']);
// Route::get('/stores/{id}', [StoreController::class, 'show']); // Tambahkan ini

Route::post('/stores', [StoreController::class, 'register']);
Route::get('/stores/{id}', [StoreController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{userId}', [ProductController::class, 'getProductsByUser']);
Route::get('/products/detail/{id}', [ProductController::class, 'show']);
Route::get('/products', [ProductController::class, 'getAllProducts']);

Route::post('/cart', [CartController::class, 'store']);
Route::middleware('auth:sanctum')->get('/cart', [CartController::class, 'index']);
Route::middleware('auth:sanctum')->post('/payment-methods', [BankDetailController::class, 'store']);
