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
        'username_pengguna',
        'no_rekening',
        'status',
    ];

    const STATUS_PENDING = 'Pending';
    const STATUS_PROCESSED = 'Diproses';
    const STATUS_SHIPPED = 'Dikirim';
    const STATUS_COMPLETED = 'Selesai';
    const STATUS_CANCELLED = 'Dibatalkan';
}