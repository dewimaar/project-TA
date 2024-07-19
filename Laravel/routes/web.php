<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\metodeTransaksiController;
use App\Http\Controllers\mitraController;
use App\Http\Controllers\rekapPenghasilanController;
use App\Http\Controllers\transaksiAdminController;
use App\Http\Controllers\transactionController;
use App\Http\Controllers\PasswordResetController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/reset-password-success', function () {return view('auth.passwords.password_reset_success');})->name('password.reset.success');

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'reset'])->name('password.update');

Route::prefix('login')->group(function() {
    Route::get('admin', [AdminController::class, 'login'])->name('admin.login');
    Route::post('admin', [AdminController::class, 'login']);
    
});

Route::middleware('admin.auth')->prefix('admin')->group(function() {
    Route::get('/dashboard', [Controller::class, 'dashboard'])->name('dashboard');
    Route::get('/pengguna', [PenggunaController::class, 'pengguna'])->name('pengguna');
    Route::get('/pengguna/detail/{id}', [PenggunaController::class, 'detailPengguna'])->name('detailPengguna');
    Route::get('/mitraUsaha', [mitraController::class, 'mitraUsaha'])->name('mitraUsaha');
    Route::get('/detailMitra/{id}', [mitraController::class, 'detailMitra'])->name('detailMitra');
    Route::get('/rekapPenghasilan', [rekapPenghasilanController::class, 'rekapPenghasilan'])->name('rekapPenghasilan');
    Route::get('/notifikasi', [Controller::class, 'notifikasi'])->name('notifikasi');
    Route::get('/riwayatTransaksi', [transaksiAdminController::class, 'riwayatTransaksi'])->name('riwayatTransaksi');
    Route::get('/detailRiwayatTransaksi/{id}', [transaksiAdminController::class, 'detailRiwayatTransaksi'])->name('detailRiwayatTransaksi');
    Route::get('/transaksi', [transaksiAdminController::class, 'transaksi'])->name('transaksi');
    Route::get('/detailTransaksi/{id}', [transaksiAdminController::class, 'detailTransaksi'])->name('detailTransaksi');
    Route::get('/transferDanaTransaksi/{id}', [transaksiAdminController::class, 'transferDanaTransaksi'])->name('transferDanaTransaksi');
    Route::post('/transferSeller', [transaksiAdminController::class, 'transferSeller'])->name('transferSeller');
    Route::get('/metodeTransaksi', [metodeTransaksiController::class, 'index'])->name('metodeTransaksi');
    Route::post('/metodeTransaksi', [metodeTransaksiController::class, 'store']);    
    Route::post('logout', [AdminController::class, 'logout'])->name('admin.logout');
    Route::put('/transactions/{id}/admin-status', [transaksiAdminController::class, 'updateAdminStatus'])->name('updateAdminStatus');
});