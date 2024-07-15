@extends('Admin.Layout.index')

@section('content')
<div class="container mt-5">
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    <form action="{{ route('metodeTransaksi') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="bank_name">Nama Bank</label>
            <input type="text" class="form-control" id="bank_name" name="bank_name" required>
        </div>
        <div class="form-group">
            <label for="username_pengguna">Username Pengguna</label>
            <input type="text" class="form-control" id="username_pengguna" name="username_pengguna" required>
        </div>
        <div class="form-group">
            <label for="no_rekening">Nomor Rekening</label>
            <input type="text" class="form-control" id="no_rekening" name="no_rekening" required>
        </div>
        <button type="submit" class="btn btn-success mt-3">Kirim</button>
    </form>

    <div class="mt-5">
        <h5>Daftar Metode Transaksi Admin</h5>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Bank</th>
                    <th>Username Pengguna</th>
                    <th>Nomor Rekening</th>
                    <th>Tanggal Dibuat</th>
                </tr>
            </thead>
            <tbody>
                @foreach($metodeTransaksis as $metodeTransaksi)
                    <tr>
                        <td>{{ $metodeTransaksi->id }}</td>
                        <td>{{ $metodeTransaksi->bank_name }}</td>
                        <td>{{ $metodeTransaksi->username_pengguna }}</td>
                        <td>{{ $metodeTransaksi->no_rekening }}</td>
                        <td>{{ $metodeTransaksi->created_at->format('d-m-Y') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
