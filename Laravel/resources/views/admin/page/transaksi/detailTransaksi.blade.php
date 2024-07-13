@extends('Admin.Layout.index')

@section('content')
<div class="container">
    <h1>Detail Transaksi</h1>
    <div>
        <h2>{{ $transactions->variation_name }}</h2>
        <img src="{{ asset('storage/'.$transactions->variation_image) }}" alt="Image" width="100">
        <p>Quantity: {{ $transactions->quantity }}</p>
        <p>Unit Price: {{ $transactions->unit_price }}</p>
        <p>Total Price: {{ $transactions->total_price }}</p>
        <p>Store Name: {{ $transactions->store->name }}</p>
        <p>User Pembeli: {{ $transactions->user->name }}</p>
        <p>Payment Method: {{ $transactions->payment_method }}</p>
        <p>Payment Proof: <a href="{{ asset('storage/'.$transactions->payment_proof) }}" target="_blank">View Proof</a></p>
        <p>Username Pengguna Bank: {{ $transactions->username_pengguna }}</p>
        <p>Nomor Rekening: {{ $transactions->no_rekening }}</p>
    </div>
    <a href="{{ route('transferDanaTransaksi', ['id' => $transactions->id]) }}" class="btn btn-primary">Keuangan Seller</a>
    <a href="{{ route('transaksi') }}" class="btn btn-primary">Back to Transactions</a>
</div>
@endsection
