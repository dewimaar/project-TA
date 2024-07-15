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
        background-color: #00796B;
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
        width: 100%;
        height: 50vh;
        object-fit: cover;
        margin-bottom: 10px;
    }
</style>

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="profile-card">
                <div class="profile-header d-flex justify-content-between">
                    <h5 class="mb-0">Detail Store</h5>
                    <i class="bi bi-arrow-left-circle-fill" onclick="window.location='{{ route('mitraUsaha') }}';"></i>
                </div>
                <div class="profile-body">
                    @if($store->image)
                    <div class="text-center">
                        <strong>Gambar:</strong><br>
                        <img src="{{ asset('storage/' . $store->image) }}" alt="Store Image" class="profile-photo">
                    </div>
                    @endif
                    <table class="table table-bordered mt-4">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{{ $store->id }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Nama</th>
                                <td>{{ $store->name }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Nama Pemilik</th>
                                <td>{{ $store->user->name }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Kategori</th>
                                <td>{{ $store->category }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Alamat</th>
                                <td>{{ $store->address }}</td>
                            </tr>
                            <tr>
                                <th scope="row">Deskripsi</th>
                                <td>{{ $store->description }}</td>
                            </tr>
                            <!-- Tambahkan informasi lainnya yang ingin ditampilkan -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
