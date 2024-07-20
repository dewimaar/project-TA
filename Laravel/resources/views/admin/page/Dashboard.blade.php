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

    .chart-container {
        width: 100%;
        margin-top: 20px;
    }

    .chart {
        width: 100%;
        height: 400px !important;
    }
</style>
<div class="container">
    <div class="row justify-content-between">
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
    <div class="row chart-container">
        <div class="col-md-6">
            <canvas id="salesChart" class="chart"></canvas>
        </div>
        <div class="col-md-6">
            <canvas id="registrationChart" class="chart"></canvas>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    var salesChart, registrationChart;

    // Sample data for 2024
    var salesData = {
        2024: [250, 350, 300, 450, 350, 550, 400, 650, 450, 500, 550, 600]
    };

    var registrationData = {
        pengguna: [60, 70, 65, 80, 75, 90, 85, 100, 95, 110, 105, 120],
        mitra: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90]
    };

    function mergeData(data) {
        var mergedData = {};
        Object.keys(data).forEach(year => {
            data[year].forEach((value, index) => {
                mergedData[index] = (mergedData[index] || 0) + value;
            });
        });
        return Object.values(mergedData);
    }

    function updateCharts() {
        var salesCtx = document.getElementById('salesChart').getContext('2d');
        var registrationCtx = document.getElementById('registrationChart').getContext('2d');

        if (salesChart) salesChart.destroy();
        if (registrationChart) registrationChart.destroy();

        salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Penjualan',
                    data: mergeData(salesData),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        registrationChart = new Chart(registrationCtx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Pengguna Baru',
                        data: registrationData.pengguna,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Mitra Baru',
                        data: registrationData.mitra,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        updateCharts();
    });
</script>
@endsection
