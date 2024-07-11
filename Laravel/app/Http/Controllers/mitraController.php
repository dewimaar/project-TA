<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\BankDetail;

class mitraController extends Controller
{
    public function mitraUsaha()
    {
        // Mengambil data pengguna dari model User
        $stores = Store::all();

        // Mengirim data pengguna ke view 'admin.page.Pengguna.Pengguna'
        return view('admin.page.mitraUsaha.mitraUsaha', [
            'name' => 'Mitra Usaha',
            'title' => 'Mitra Usaha',
            'stores' => $stores,
        ]);
    }
    public function detailMitra($id)
    {
        $store = Store::with('user')->findOrFail($id);

        return view('admin.page.mitraUsaha.detailMitra', [
            'store' => $store,
            'name' => 'Detail Mitra Usaha',
            'title' => 'Detail Mitra Usaha',
        ]);
    }
}
