@extends('Admin.Layout.index')

@section('content')
    <h1>{{ $title }}</h1>

    <table>
        <thead>
            <tr>
                <th>Store Name</th>
                <th>Product Name</th>
                <th>Total Price</th>
                <th>Payment Seller</th>
                <th>Pendapatan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->store->name }}</td>
                    <td>{{ optional($transaction->bankTransfer)->product_name ?? 'N/A' }}</td>
                    <td>{{ $transaction->total_price }}</td>
                    <td>{{ optional($transaction->bankTransfer)->payment_seller ?? 'N/A' }}</td>
                    <td>
                        @if ($transaction->bankTransfer)
                            {{ $transaction->total_price - $transaction->bankTransfer->payment_seller }}
                        @else
                            N/A
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div>
        <strong>Total Pendapatan: </strong>{{ $totalPendapatan }}
    </div>
@endsection
