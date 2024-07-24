@extends('admin.layout.index')

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

    .welcome-card {
        background: linear-gradient(45deg, #ffffff, #089451);
        color: #000000;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin: 20px 0;
        position: relative;
    }

    .welcome-text {
        font-size: 24px;
        font-weight: bold;
    }

    .marquee-wrapper {
        overflow: hidden;
        position: relative;
    }

    .marquee-text {
        display: inline-block;
        color: #006141;
        white-space: nowrap;
        animation: marquee 10s linear infinite;
        font-size: 18px; 
    }

    @keyframes marquee {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    .stats-section {
        margin-top: 40px;
    }
</style>
<div class="container">
    <div class="welcome-card">
        <div class="welcome-text">Selamat datang Admin</div>
        <div class="marquee-wrapper">
            <div class="marquee-text">Selamat datang di Dashboard Tokoku</div>
        </div>
    </div>

    <div class="stats-section row justify-content-between">
        <div class="col-md-3">
            <div class="card" style="background-color: cadetblue; color: #fff;">
                <i class="bi bi-person icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Pengguna</h5>
                    <p class="number">{{ $totalPengguna }}</p>
                    <p class="card-text">Data Total Pengguna</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" style="background-color: darkred; color: #fff;">
                <i class="bi bi-shop icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Mitra Usaha</h5>
                    <p class="number">{{ $totalMitra }}</p>
                    <p class="card-text">Data Total Mitra Usaha</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" style="background-color: green; color: #fff;">
                <i class="bi bi-cash icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Pendapatan</h5>
                    <p class="number">Rp {{ $totalPendapatan }}</p>
                    <p class="card-text">Data Total Pendapatan</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card" style="background-color: indigo; color: #fff;">
                <i class="bi bi-currency-dollar icon"></i>
                <div class="card-body">
                    <h5 class="card-title">Total Transaksi</h5>
                    <p class="number">{{ $totalTransaksi }}</p>
                    <p class="card-text">Data Total Transaksi</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
