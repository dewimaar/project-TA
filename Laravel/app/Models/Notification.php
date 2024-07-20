<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'variation_id',
        'transaction_id',
        'pesan',
        'sub_pesan',
        'customer',
    ];

    // public function product()
    // {
    //     return $this->belongsTo(product::class);
    // }
    public function variation()
    {
        return $this->belongsTo(variations::class);
    }
}
