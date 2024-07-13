<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\BankDetail;
use App\Models\Store;
use App\Models\BankTransfer;
use Illuminate\Support\Facades\Validator;


class transaksiAdminController extends Controller
{
    public function transaksi ()
    {
        $transactions = Transaction::with('store','user')->get();
        return view('admin.page.transaksi.Transaksi',[
            'name' => 'Transaksi',
            'title' => 'Transaksi',
            'transactions' => $transactions,
        ]);
    }
    public function detailTransaksi($id)
    {
        $transactions = Transaction::with('store','user')->findOrFail($id);
        return view('admin.page.transaksi.detailTransaksi',[
            'name' => 'Detail Transaksi',
            'title' => 'Detail Transaksi',
            'transactions' => $transactions,
        ]);
    }
    public function transferDanaTransaksi($id)
    {
        $transactions = Transaction::with('store','user')->findOrFail($id);
        $transfer = Store::with('banks')->find($transactions->store->id);
        return view('admin.page.transaksi.transferDanaTransaksi',[
            'name' => 'Transfer Transaksi',
            'title' => 'Transfer Transaksi',
            'transfer' => $transfer,
            'transactions' => $transactions,
        ]);
    }

    public function riwayatTransaksi ()
    {
        return view('admin.page.riwayatTransaksi.riwayatTransaksi',[
            'name' => 'Riwayat Transaksi',
            'title' => 'Riwayat Transaksi',
        ]);
    }
    public function transferSeller(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                'store_id' => 'required|exists:stores,id',
                'transaction_id' => 'required|exists:transactions,id',
                'bank_name' => 'required|string|max:255',
                'bank_username' => 'required|string|max:255',
                'bank_account_number' => 'required|string|max:255',
                'payment_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $path ='';
            if ($request->hasFile('payment_image')) {
                $path = $request->file('payment_image')->store('images/AdminTransfer', 'public');
            }

            BankTransfer::create([
                'store_id' => $request->store_id,
                'transaction_id' => $request->transaction_id,
                'bank_name' => $request->bank_name,
                'bank_username' => $request->bank_username,
                'bank_account_number' => $request->bank_account_number,
                'payment_image' => $path,
            ]);

            return redirect()->back()->with('success', 'Bank details saved successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e);
        }
    }
}
