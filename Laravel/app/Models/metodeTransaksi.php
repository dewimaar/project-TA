<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class metodeTransaksi extends Model
{
    use HasFactory;
    protected $fillable = [
        'bank_name',
        'username_pengguna',
        'no_rekening'
    ];
}
