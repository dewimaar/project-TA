<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PenggunaController;


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

Route::prefix('login')->group(function() {
    Route::get('admin', [AdminController::class, 'login'])->name('admin.login');
    Route::post('admin', [AdminController::class, 'login']);
});

Route::middleware('admin.auth')->prefix('admin')->group(function() {
    Route::get('/dashboard', [Controller::class, 'dashboard'])->name('dashboard');
    Route::get('/pengguna', [PenggunaController::class, 'pengguna'])->name('pengguna');
    Route::get('/detailPengguna', [Controller::class, 'detailPengguna'])->name('detailPengguna');
    Route::get('/mitraUsaha', [Controller::class, 'mitraUsaha'])->name('mitraUsaha');
    Route::get('/detailMitra', [Controller::class, 'detailMitra'])->name('detailMitra');
    Route::get('/rekapPenghasilan', [Controller::class, 'rekapPenghasilan'])->name('rekapPenghasilan');
    Route::get('/notifikasi', [Controller::class, 'notifikasi'])->name('notifikasi');
    Route::get('/riwayatTransaksi', [Controller::class, 'riwayatTransaksi'])->name('riwayatTransaksi');
    Route::get('/pengaturan', [Controller::class, 'pengaturan'])->name('pengaturan');
    Route::post('logout', [AdminController::class, 'logout'])->name('admin.logout');
});