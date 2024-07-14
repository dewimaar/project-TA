@extends('Admin.Layout.index')

@section('content')
<div class="container">
    <h1>Halaman Transaksi</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Username Pembeli</th>
                <th>Nama Toko</th>
                <th>Variation Name</th>
                <th>Variation Image</th>
                <th>Jumlah</th>
                <th>Harga Satuan</th>
                <th>Total Harga</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $transaction)
            <tr>
                <td>{{ $transaction->user->name }}</td> 
                <td>{{ $transaction->store->name }}</td> 
                <td>{{ $transaction->variation_name }}</td>
                <td><img src="{{ asset('storage/'.$transaction->variation_image) }}" alt="Image" width="50"></td>
                <td>{{ $transaction->quantity }}</td>
                <td>{{ $transaction->unit_price }}</td>
                <td>{{ $transaction->total_price }}</td>
                <td>
                    <a href="{{ route('detailTransaksi', $transaction->id) }}" class="btn btn-success btn-sm">Detail</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
