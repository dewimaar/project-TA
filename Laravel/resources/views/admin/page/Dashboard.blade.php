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

    .filter-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
    }

    .filter-container select {
        padding: 10px 20px;
        font-size: 18px;
        background-color: darkgreen;
        color: white;
        border: none;
        border-radius: 20px;
        margin-top: 10px;
    }

    .filter-container select:focus {
        outline: none;
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
    <div class="filter-container">
        <select id="yearFilter" onchange="updateCharts()">
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
        </select>
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

    // Sample data for different years
    var salesData = {
        2020: [100, 200, 150, 300, 200, 400, 250, 500, 300, 350, 400, 450],
        2021: [150, 250, 200, 350, 250, 450, 300, 550, 350, 400, 450, 500],
        2022: [200, 300, 250, 400, 300, 500, 350, 600, 400, 450, 500, 550],
        2023: [250, 350, 300, 450, 350, 550, 400, 650, 450, 500, 550, 600]
    };

    var registrationData = {
        2020: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90],
        2021: [40, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 100],
        2022: [50, 60, 55, 70, 65, 80, 75, 90, 85, 100, 95, 110],
        2023: [60, 70, 65, 80, 75, 90, 85, 100, 95, 110, 105, 120]
    };

    function updateCharts() {
        var selectedYear = document.getElementById('yearFilter').value;
        var salesCtx = document.getElementById('salesChart').getContext('2d');
        var registrationCtx = document.getElementById('registrationChart').getContext('2d');

        if (salesChart) salesChart.destroy();
        if (registrationChart) registrationChart.destroy();

        salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Sales',
                    data: salesData[selectedYear],
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
                datasets: [{
                    label: 'New Registrations',
                    data: registrationData[selectedYear],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
    }

    document.addEventListener('DOMContentLoaded', function() {
        updateCharts();
    });
</script>
@endsection
