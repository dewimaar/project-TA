<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankTransfer extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'store_id',
        'bank_name',
        'bank_username',
        'bank_account_number',
        'payment_image',
        'payment_seller',
        'product_name',
    ];

    // Relationships

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
