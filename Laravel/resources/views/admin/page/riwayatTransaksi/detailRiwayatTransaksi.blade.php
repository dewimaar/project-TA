@extends('Admin.Layout.index')

@section('content')
<div class="container">
    <h1 class="my-4">Detail Transaksi</h1>
    
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
                    <th>Gambar</th>
                    <td><img src="{{ asset('storage/'.$transactions->variation_image) }}" alt="Image" width="100"></td>
                </tr>
                <tr>
                    <th>Quantity</th>
                    <td>{{ $transactions->quantity }}</td>
                </tr>
                <tr>
                    <th>Unit Price</th>
                    <td>{{ $transactions->unit_price }}</td>
                </tr>
                <tr>
                    <th>Total Price</th>
                    <td>{{ $transactions->total_price }}</td>
                </tr>
                <tr>
                    <th>Store Name</th>
                    <td>{{ $transactions->store->name }}</td>
                </tr>
                <tr>
                    <th>User Pembeli</th>
                    <td>{{ $transactions->user->name }}</td>
                </tr>
                <tr>
                    <th>Payment Method</th>
                    <td>{{ $transactions->payment_method }}</td>
                </tr>
                <tr>
                    <th>Payment Proof</th>
                    <td><a href="{{ asset('storage/'.$transactions->payment_proof) }}" target="_blank">View Proof</a></td>
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
        <a href="{{ route('riwayatTransaksi') }}" class="btn btn-danger">Kembali</a>
    </div>
</div>
@endsection
