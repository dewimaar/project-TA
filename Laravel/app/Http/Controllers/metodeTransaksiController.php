<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\metodeTransaksi;

class metodeTransaksiController extends Controller
{
    public function index()
    {
        $metodeTransaksis = metodeTransaksi::all();

        return view('admin.page.metodeTransaksi', [
            'name' => 'Metode Transaksi',
            'title' => 'Metode Transaksi',
            'metodeTransaksis' => $metodeTransaksis
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bank_name' => 'required|string|max:255',
            'username_pengguna' => 'required|string|max:255',
            'no_rekening' => 'required|string|max:255',
        ]);

        metodeTransaksi::create([
            'bank_name' => $request->bank_name,
            'username_pengguna' => $request->username_pengguna,
            'no_rekening' => $request->no_rekening,
        ]);

        return redirect()->route('metodeTransaksi')->with('success', 'Metode Transaksi berhasil ditambahkan');
    }
}
