@extends('Admin.Layout.index')

@section('content')

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <div class="halaman">
            <select class="form-select" id="showPerPage">
                <option selected>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
        <div>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="bi bi-search" style="cursor:pointer;"></i>
                </span>
                <input type="text" class="form-control" placeholder="Cari..." aria-label="Cari" aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
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
                            <div class="d-flex justify-content-center align-items-center gap-1">
                                <i class=" text-primary bi bi-info-circle-fill" style="font-size: 20px; cursor: pointer;" onclick="window.location='{{ route('detailPengguna', ['id' => $user->id]) }}';"></i>
                                <i class=" text-danger bi bi-trash-fill" style="font-size: 20px; cursor: pointer;"></i>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <nav aria-label="Page navigation example">
            <!-- Pagination links here -->
        </nav>
    </div>
    <div class="card-footer">
    </div>
</div>
@endsection
