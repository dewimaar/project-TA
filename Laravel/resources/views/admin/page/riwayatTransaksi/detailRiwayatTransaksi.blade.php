@extends('Admin.Layout.index')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center my-4">
        <h1>Detail Transaksi</h1>
        <i class="bi bi-arrow-left-circle-fill" style="font-size: 24px; cursor: pointer;" onclick="window.location='{{ route('riwayatTransaksi') }}';"></i>
    </div>
    
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if (session('error'))
        <div class="alert alert-danger">
            {{ session('error') }}
        </div>
    @endif

    <div class="card mb-4">
        <div class="card-header">
            <h2>{{ $transactions->variation_name }}</h2>
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <tr>
                    <th>Gambar Produk</th>
                    <td><img src="{{ asset('storage/'.$transactions->variation_image) }}" alt="Image" width="100"></td>
                </tr>
                <tr>
                    <th>Jumlah Produk</th>
                    <td>{{ $transactions->quantity }}</td>
                </tr>
                <tr>
                    <th>Harga Satuan</th>
                    <td>Rp {{ number_format($transactions->unit_price, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <th>Total Harga</th>
                    <td>Rp {{ number_format($transactions->total_price, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <th>Nama Toko</th>
                    <td>{{ $transactions->store->name }}</td>
                </tr>
                <tr>
                    <th>Nama Pembeli</th>
                    <td>{{ $transactions->user->name }}</td>
                </tr>
                <tr>
                    <th>Metode Pembayaran</th>
                    <td>{{ $transactions->payment_method }}</td>
                </tr>
                <tr>
                    <th>Bukti Pembayaran</th>
                    <td><a href="{{ asset('storage/'.$transactions->payment_proof) }}" target="_blank">Lihat Bukti Pembayaran</a></td>
                </tr>
                <tr>
                    <th>Username Pengguna Bank</th>
                    <td>{{ $transactions->username_pengguna }}</td>
                </tr>
                <tr>
                    <th>Nomor Rekening</th>
                    <td>{{ $transactions->no_rekening }}</td>
                </tr>
                <tr>
                    <th>Status Admin</th>
                    <td>{{ $transactions->statusAdmin }}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="d-flex justify-content-between">
        {{-- <a href="{{ route('transferDanaTransaksi', ['id' => $transactions->id]) }}" class="btn btn-success">Keuangan Seller</a> --}}
        <!-- Button Kembali Tidak Digunakan Lagi Karena Sudah Dipindahkan -->
    </div>
</div>

<style>
    .container {
        max-width: 800px;
    }

    .card {
        border-radius: 15px;
    }

    .form-group label {
        font-weight: 500;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        transition: background-color 0.3s, border-color 0.3s;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #004085;
    }

    .bi-arrow-left-circle-fill {
        color: #00796B;
    }

    .bi-arrow-left-circle-fill:hover {
        color: #034f46;
    }
</style>
@endsection
