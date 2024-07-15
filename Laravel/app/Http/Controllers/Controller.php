<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function dashboard ()
    {
        return view('admin.page.Dashboard',[
            'name' => 'Dashboard',
            'title' => 'Dashboard',
        ]);
    }
    // public function pengguna ()
    // {
    //     return view('admin.page.Pengguna.Pengguna',[
    //         'name' => 'Pengguna',
    //         'title' => 'Pengguna',
    //     ]);
    // }
    // public function detailPengguna ()
    // {
    //     return view('admin.page.Pengguna.detailPengguna',[
    //         'name' => 'Detail Pengguna',
    //         'title' => 'Detail Pengguna',
    //     ]);
    // }
    // public function mitraUsaha ()
    // {
    //     $users = User::all(); // Contoh pengambilan data pengguna (pastikan model dan querynya disesuaikan)
        
    //     return view('admin.page.mitraUsaha.mitraUsaha',[
    //         'name' => 'Mitra Usaha',
    //         'title' => 'Mitra Usaha',
    //         'users' => $users,
    //     ]);
    // }
    // public function detailMitra ()
    // {
    //     return view('admin.page.mitraUsaha.detailMitra',[
    //         'name' => 'Detail Mitra',
    //         'title' => 'Detail Mitra',
    //     ]);
    // }
    // public function rekapPenghasilan ()
    // {
    //     return view('admin.page.rekapPenghasilan',[
    //         'name' => 'Rekap Penghasilan Mitra Usaha',
    //         'title' => 'Rekap Penghasilan',
    //     ]);
    // }
    public function notifikasi ()
    {
        return view('admin.page.Notifikasi',[
            'name' => 'Notifikasi',
            'title' => 'Notifikasi',
        ]);
    }
    // public function riwayatTransaksi ()
    // {
    //     return view('admin.page.riwayatTransaksi.riwayatTransaksi',[
    //         'name' => 'Riwayat Transaksi',
    //         'title' => 'Riwayat Transaksi',
    //     ]);
    // }
    public function deleteUser($id)
{
    $user = User::find($id);
    if (!$user) {
        abort(404); 
    }
    $user->delete();
    return redirect()->route('mitraUsaha')->with('success', 'Pengguna berhasil dihapus');
}
}
