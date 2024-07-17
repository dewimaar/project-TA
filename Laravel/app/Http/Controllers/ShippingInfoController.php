<?php

namespace App\Http\Controllers;

use App\Models\ShippingInfo;
use Illuminate\Http\Request;

class ShippingInfoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'store_id' => 'required|exists:stores,id',
            'user_id' => 'required|exists:users,id',
            'shipping_name' => 'required|string',
            'shipping_cost' => 'required|numeric',
            'shipping_contact' => 'required|string',
        ]);

        $shippingInfo = ShippingInfo::create($request->all());

        return response()->json($shippingInfo, 201);
    }

    public function getByStoreAndUser($store_id, $user_id)
    {
        $shippingInfo = ShippingInfo::where('store_id', $store_id)
            ->where('user_id', $user_id)
            ->get();

        return response()->json($shippingInfo);
    }

    public function getShippingInfos($store_id)
    {
        $shippingInfos = ShippingInfo::where('store_id', $store_id)->get();
        return response()->json($shippingInfos);
    }
}
