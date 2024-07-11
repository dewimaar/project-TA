<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'category',
        'address',
        'description',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function bankDetails(): HasMany
    {
        return $this->hasMany(BankDetail::class);
    }
}
