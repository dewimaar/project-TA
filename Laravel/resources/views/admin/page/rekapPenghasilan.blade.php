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

    .total-pendapatan {
        font-size: 1.25rem;
        font-weight: bold;
    }
</style>

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card card-custom">
                <div class="card-header card-header-custom">
                    <h1>{{ $title }}</h1>
                </div>
                <div class="card-body card-body-custom">
                    <div class="table-responsive">
                        <table class="table table-bordered table-custom">
                            <thead>
                                <tr>
                                    <th>Nama Toko</th>
                                    <th>Nama Produk</th>
                                    <th>Total Harga</th>
                                    <th>Pembayaran ke Seller</th>
                                    <th>Pendapatan</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($transactions as $transaction)
                                    <tr>
                                        <td>{{ $transaction->store->name }}</td>
                                        <td>{{ optional($transaction->bankTransfer)->product_name ?? 'N/A' }}</td>
                                        <td>Rp {{ number_format($transaction->total_price, 0, ',', '.') }}</td>
                                        <td>{{ optional($transaction->bankTransfer)->payment_seller ? 'Rp ' . number_format($transaction->bankTransfer->payment_seller, 0, ',', '.') : 'N/A' }}</td>
                                        <td>
                                            @if ($transaction->bankTransfer)
                                                Rp {{ number_format($transaction->total_price - $transaction->bankTransfer->payment_seller, 0, ',', '.') }}
                                            @else
                                                N/A
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 text-right total-pendapatan">
                        <strong>Total Pendapatan: </strong>Rp {{ number_format($totalPendapatan, 0, ',', '.') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
