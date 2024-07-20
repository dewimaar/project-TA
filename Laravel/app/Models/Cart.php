<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'store_id',
        'variation_id',
        'variation_name',
        'variation_image',
        'quantity',
        'unit_price',
        'total_price',
    ];

    public function product()
    {
        return $this->belongsTo(product::class);
    }

    public function variation()
    {
        return $this->belongsTo(Variations::class);
    }
    public function store()
    {
        return $this->belongsTo(Store::class);
    }
    public function shipping()
    {
        return $this->hasMany(ShippingInfo::class);
    }
    public static function getProductsGroupedByStore($userId)
    {
        return self::where('user_id', $userId)
            ->with(['product', 'store'])
            ->get()
            ->groupBy('store_id');
    }
}
