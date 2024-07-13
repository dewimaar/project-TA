@extends('Admin.Layout.index')

@section('content')
<div class="container">
    <h1>Halaman Transaksi</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>User Name</th>
                <th>Store Name</th>
                <th>Variation Name</th>
                <th>Variation Image</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $transaction)
            <tr>
                <td>{{ $transaction->user->name }}</td> <!-- User Name -->
                <td>{{ $transaction->store->name }}</td> <!-- Store Name -->
                <td>{{ $transaction->variation_name }}</td>
                <td><img src="{{ asset('storage/'.$transaction->variation_image) }}" alt="Image" width="50"></td>
                <td>{{ $transaction->quantity }}</td>
                <td>{{ $transaction->unit_price }}</td>
                <td>{{ $transaction->total_price }}</td>
                <td>
                    <a href="{{ route('detailTransaksi', $transaction->id) }}" class="btn btn-info btn-sm">Detail</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
