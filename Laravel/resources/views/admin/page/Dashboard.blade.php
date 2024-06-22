@extends('Admin.Layout.index')

@section('content')
<style>
    .card {
        width: 240px;
        margin-right: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .card-body {
        padding: 20px;
        text-align: center;
    }

    .card-title {
        font-size: 18px;
        font-weight: bold;
    }

    .card-text {
        font-size: 16px;
    }

    .icon {
        font-size: 24px;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    .number {
        font-size: 24px;
        font-weight: bold;
    }
</style>
<div class="container">
    <div class="row justify-content-between">
        <div class="col-md-3">
            <div class="card" style="background-color: cadetblue; color: #fff;">
                <i class="bi bi-person icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Pengguna</h5>
                    <p class="number">1000</p>
                    <p class="card-text">Data Total Pengguna</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" style="background-color: darkred; color: #fff;">
                <i class="bi bi-shop icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Mitra Usaha</h5>
                    <p class="number">500</p>
                    <p class="card-text">Data Total Mitra Usaha</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" style="background-color: green; color: #fff;">
                <i class="bi bi-cash icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Pendapatan</h5>
                    <p class="number">$5000</p>
                    <p class="card-text">Data Total Pendapatan</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" style="background-color: indigo; color: #fff;">
                <i class="bi bi-currency-dollar icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Transaksi</h5>
                    <p class="number">100</p>
                    <p class="card-text">Data Total Transaksi</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
