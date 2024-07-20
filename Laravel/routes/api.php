<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\BankDetailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\metodeTransaksiController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\transaksiAdminController;
use App\Http\Controllers\ShippingInfoController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\NotificationController;

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
Route::middleware('auth:sanctum')->post('/user/update', [ProfileController::class, 'updateUserData']);


// create market user
// Route::post('/stores', [StoreController::class, 'register']);
// Route::get('/stores/{id}', [StoreController::class, 'show']); // Tambahkan ini

Route::post('/stores', [StoreController::class, 'register']);
Route::get('/stores/{id}', [StoreController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{userId}', [ProductController::class, 'getProductsByUser']);
Route::get('/products/detail/{id}', [ProductController::class, 'show']);
Route::get('/product/{userId}', [ProductController::class, 'getAllProducts']);

Route::post('/cart', [CartController::class, 'store']);
// Route::middleware('auth:sanctum')->get('/cart', [CartController::class, 'index']);
Route::middleware('auth:sanctum')->get('/cart/products-by-store', [CartController::class, 'getProductsGroupedByStore']);
Route::middleware('auth:sanctum')->post('/payment-methods', [BankDetailController::class, 'store']);
Route::get('/payment-methods/{storeId}', [BankDetailController::class, 'getPaymentMethodsByStore']);
Route::get('/metodeTransaksi', [metodeTransaksiController::class, 'metodeTransaksi']);
Route::middleware('auth:sanctum')->post('/transactions', [TransactionController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/cart/{id}', [CartController::class, 'deleteCartItem']);
Route::middleware('auth:sanctum')->get('/transactions', [TransactionController::class, 'index']);
Route::middleware('auth:sanctum')->get('/transactions/{id}', [TransactionController::class, 'show']);
Route::get('/transaction/{id}', [TransactionController::class, 'indexUser']);
Route::put('/transactions/{id}/status', [TransactionController::class, 'updateStatus']);
Route::get('/bank-transfers/{storeId}', [transaksiAdminController::class, 'getBankTransferByStore']);
Route::post('/shipping-infos', [ShippingInfoController::class, 'store']);
Route::get('/shipping-infos/{store_id}/{user_id}', [ShippingInfoController::class, 'getByStoreAndUser']);
Route::get('shipping-infos/{store_id}', [ShippingInfoController::class, 'getShippingInfos']);
Route::middleware('auth:sanctum')->put('/variations/{id}', [ProductController::class, 'updateVariation']);
Route::middleware('auth:sanctum')->get('/stores', [StoreController::class, 'getAllStores']);
Route::middleware('auth:sanctum')->get('products', [ProductController::class, 'getProductsByStore']);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);
Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
Route::middleware('auth:sanctum')->put('/transactions/{id}/shipping-confirm', [TransactionController::class, 'updateShippingConfirm']);
Route::middleware('auth:sanctum')->get('notifications', [NotificationController::class, 'index']);
Route::post('notifications', [NotificationController::class, 'store']);
Route::get('notifications/{id}', [NotificationController::class, 'show']);
Route::put('notifications/{id}', [NotificationController::class, 'update']);
Route::delete('notifications/{id}', [NotificationController::class, 'destroy']);
