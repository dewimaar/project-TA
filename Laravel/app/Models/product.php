<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'description', 'image', 'store_id'];
    public function variations()
    {
        return $this->hasMany(variations::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'user_id', 'user_id'); // Assuming user_id in Product maps to user_id in Store
    }
}
