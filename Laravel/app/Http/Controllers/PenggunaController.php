<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PenggunaController extends Controller
{
    public function pengguna()
    {
        // Mengambil data pengguna dari model User
        $users = User::all(); // Anda bisa menggunakan paginate() jika ingin menampilkan dengan pagination

        // Mengirim data pengguna ke view 'admin.page.Pengguna.Pengguna'
        return view('admin.page.Pengguna.Pengguna', [
            'name' => 'Pengguna',
            'title' => 'Pengguna',
            'users' => $users, // Mengirimkan data pengguna ke view
        ]);
    }
}
