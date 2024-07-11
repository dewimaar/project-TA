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

    .profile-photo {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 10px;
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
                    <div class="text-center">
                        <img src="{{ asset('storage/' . $user->profile_photo) }}" alt="Profile Photo" class="profile-photo">
                    </div>
                    <table class="table table-bordered mt-4">
                        <tbody>
                            <tr>
                                <th scope="row">Id</th>
                                <td>{{ $user->id }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Nama</th>
                                <td>{{ $user->name }}</td>
                            </tr>
                            <tr>
                                <th scope="row">No Telp</th>
                                <td>{{ $user->noTelp }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{{ $user->email }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Alamat</th>
                                <td>{{ $user->address }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Google Maps Link</th>
                                <td>{{ $user->google_maps_link }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Tanggal Lahir</th>
                                <td>{{ $user->birthdate }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Jenis Kelamin</th>
                                <td>{{ $user->gender }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
