<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'description', 'image'];
    public function variations()
    {
        return $this->hasMany(variations::class);
    }
}