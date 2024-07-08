<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        // 'store_id',
        'variation_id',
        'variation_name',
        'variation_image',
        'quantity',
        'unit_price',
        'total_price',
        'full_address',
        'google_maps_link',
        'payment_method',
        'payment_proof',
    ];
}
