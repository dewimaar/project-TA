<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BankDetail;

class BankDetailController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'store_id' => 'required|integer',
            'bank_name' => 'required|string|max:255',
            'bank_username' => 'required|string|max:255',
            'bank_account_number' => 'required|string|max:255',
        ]);

        $BankDetail = BankDetail::create($validated);

        return response()->json($BankDetail, 201);
    }
    public function getPaymentMethodsByStore($storeId)
    {
        $paymentMethods = BankDetail::where('store_id', $storeId)->get();
        
        if ($paymentMethods->isEmpty()) {
            return response()->json(['message' => 'No payment methods found for this store.'], 404);
        }

        return response()->json($paymentMethods);
    }
}