<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class RekapPenghasilanController extends Controller
{
    public function rekapPenghasilan()
    {
        $transactions = Transaction::with('store', 'bankTransfer')->get();

        $totalPendapatan = $transactions->sum(function ($transaction) {
            return $transaction->bankTransfer 
                ? $transaction->total_price - $transaction->bankTransfer->payment_seller 
                : 0;
        });

        return view('admin.page.rekapPenghasilan', [
            'name' => 'Rekap Penghasilan Mitra Usaha',
            'title' => 'Rekap Penghasilan',
            'transactions' => $transactions,
            'totalPendapatan' => $totalPendapatan
        ]);
    }
}


