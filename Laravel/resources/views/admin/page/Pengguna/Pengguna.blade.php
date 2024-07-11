@extends('Admin.Layout.index')

@section('content')
<style>
    .card-custom {
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .card-header-custom {
        background-color: #f8f9fa;
        padding: 15px;
    }

    .card-body-custom {
        padding: 20px;
    }

    .table-custom {
        width: 100%;
        border-collapse: collapse;
    }

    .table-custom th,
    .table-custom td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #dee2e6;
    }

    .table-custom th {
        background-color: #f8f9fa;
    }

    .table-custom tbody tr:hover {
        background-color: #f1f1f1;
    }

    .input-group-custom {
        max-width: 300px;
    }

    .pagination-custom {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .form-select-custom {
        border-radius: 20px;
        padding: 10px 20px;
        background-color: darkgreen;
        color: white;
        border: none;
    }

    .form-select-custom:focus {
        outline: none;
    }

    .btn-custom {
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-detail {
        background-color: #007bff;
        color: white;
    }

    .btn-detail:hover {
        background-color: #0056b3;
    }

    .btn-delete {
        background-color: #dc3545;
        color: white;
    }

    .btn-delete:hover {
        background-color: #a71d2a;
    }
</style>

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card card-custom">
                <div class="card-header d-flex justify-content-between align-items-center card-header-custom">
                    <div class="halaman">
                        <select class="form-select form-select-custom" id="showPerPage">
                            <option selected>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                    <div class="input-group input-group-custom">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="bi bi-search" style="cursor:pointer;"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Cari..." aria-label="Cari" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="card-body card-body-custom">
                    <div class="table-responsive">
                        <table class="table table-bordered table-custom">
                            <thead>
                                <tr>
                                    <th scope="col" class="col-1">ID</th>
                                    <th scope="col" class="col-4">Nama</th>
                                    <th scope="col" class="col-3">No Telp</th>
                                    <th scope="col" class="col-4">Email</th>
                                    <th scope="col" class="col-1">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($users as $user)
                                <tr>
                                    <td>{{ $user->id }}</td>
                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->noTelp }}</td> <!-- Asumsikan ada kolom no telp di tabel user -->
                                    <td>{{ $user->email }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center align-items-center gap-2">
                                            {{-- <button class="btn-custom btn-detail" onclick="window.location='{{ route('detailPengguna', ['id' => $user->id]) }}';">Detail</button> --}}
                                            <a href="{{ route('detailPengguna', ['id' => $user->id]) }}" class="btn-custom btn-detail">Detail</a>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation example" class="pagination-custom">
                        <!-- Pagination links here -->
                    </nav>
                </div>
                <div class="card-footer card-footer-custom">
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
