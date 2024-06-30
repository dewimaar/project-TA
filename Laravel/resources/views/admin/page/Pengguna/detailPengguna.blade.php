@extends('Admin.Layout.index')

@section('content')
<style>
    .profile-card {
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .profile-card:hover {
        transform: translateY(-5px);
    }

    .profile-header {
        background-color: #17461b;
        color: #fff;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .profile-header i {
        font-size: 24px;
        cursor: pointer;
    }

    .profile-body {
        padding: 20px;
    }

    .profile-body table {
        width: 100%;
    }

    .profile-body th {
        background-color: #f8f9fa;
        width: 35%;
    }

    .profile-body td {
        background-color: #fff;
        color: #333;
    }

    .profile-body td,
    .profile-body th {
        padding: 15px;
        border: 1px solid #dee2e6;
    }
</style>

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="profile-card">
                <div class="profile-header d-flex justify-content-between">
                    <h5 class="mb-0">Profil Pengguna</h5>
                    <i class="bi bi-arrow-left-circle-fill" onclick="window.location='{{ route('pengguna') }}';"></i>
                </div>
                <div class="profile-body">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Id</th>
                                <td id="idPengguna">1</td>
                            </tr>
                            <tr>
                                <th scope="row">Nama</th>
                                <td id="namaPengguna">John Doe</td>
                            </tr>
                            <tr>
                                <th scope="row">No Telp</th>
                                <td id="noTelpPengguna">1234567890</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td id="emailPengguna">johndoe@example.com</td>
                            </tr>
                            <tr>
                                <th scope="row">Jenis Usaha</th>
                                <td id="jenisUsahaPengguna">Retail</td>
                            </tr>
                            <tr>
                                <th scope="row">Nama Usaha</th>
                                <td id="namaUsahaPengguna">Doe Mart</td>
                            </tr>
                            <tr>
                                <th scope="row">Alamat Usaha</th>
                                <td id="alamatUsahaPengguna">123 Main St, Springfield</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
