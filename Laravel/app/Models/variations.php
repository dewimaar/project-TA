<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class variations extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'name', 'price', 'stock', 'image'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
