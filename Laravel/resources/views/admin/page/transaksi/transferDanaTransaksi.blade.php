@extends('Admin.Layout.index')

@section('content')
<div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Detail Bank untuk Toko: {{ $transfer->name }}</h1>
        <i class="bi bi-arrow-left-circle-fill" style="font-size: 24px; cursor: pointer;" onclick="window.location='{{ route('detailTransaksi', ['id' => $transactions->id]) }}';"></i>
    </div>
    <div class="card shadow-sm p-4">
        <div class="form-group">
            <label for="bank_name" class="font-weight-bold">Pilih Nama Bank:</label>
            <select id="bank_name" class="form-control">
                <option value="">-- Pilih Bank --</option>
                @foreach($transfer->banks as $bank)
                    <option value="{{ $bank->id }}">{{ $bank->bank_name }}</option>
                @endforeach
            </select>
        </div>

        <div id="bank_details" style="display: none;" class="mt-4">
            <h5 class="mb-3">Detail Bank:</h5>
            <form action="{{ route('transferSeller') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="transaction_id" value="{{ $transactions->id }}">
                <input type="hidden" name="store_id" value="{{ $transfer->id }}">
                <input type="hidden" name="payment_seller" value="{{ $payment_seller }}">
                <input type="hidden" name="product_name" value="{{ $product_name }}">
                <div class="form-group">
                    <label for="bank_names" class="font-weight-bold">Nama Bank:</label>
                    <input type="text" id="bank_names" name="bank_name" class="form-control" readonly>
                </div>
                <div class="form-group">
                    <label for="bank_username" class="font-weight-bold">Nama Pemilik Rekening:</label>
                    <input type="text" id="bank_username" name="bank_username" class="form-control" readonly>
                </div>
                <div class="form-group">
                    <label for="bank_account_number" class="font-weight-bold">Nomor Rekening:</label>
                    <input type="text" id="bank_account_number" name="bank_account_number" class="form-control" readonly>
                </div>
                <div class="form-group">
                    <label for="payment_image" class="font-weight-bold">Unggah Bukti Pembayaran</label>
                    <input type="file" accept="image/*" id="payment_image" name="payment_image" class="form-control">
                </div>
                <div class="form-group">
                    <label for="payment_seller_display" class="font-weight-bold">Jumlah Pembayaran:</label>
                    <input type="text" id="payment_seller_display" class="form-control" value="{{ $payment_seller }}" readonly>
                </div>
                <div class="form-group">
                    <label for="product_name_display" class="font-weight-bold">Nama Produk:</label>
                    <input type="text" id="product_name_display" class="form-control" value="{{ $product_name }}" readonly>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Simpan</button>
            </form>
        </div>
    </div>
</div>

<script>
    document.getElementById('bank_name').addEventListener('change', function() {
        var bankId = this.value;
        if (bankId) {
            var banks = @json($transfer->banks);
            var selectedBank = banks.find(bank => bank.id == bankId);
            if (selectedBank) {
                document.getElementById('bank_username').value = selectedBank.bank_username;
                document.getElementById('bank_names').value = selectedBank.bank_name;
                document.getElementById('bank_account_number').value = selectedBank.bank_account_number;
                document.getElementById('bank_details').style.display = 'block';
            } else {
                document.getElementById('bank_details').style.display = 'none';
            }
        } else {
            document.getElementById('bank_details').style.display = 'none';
        }
    });
</script>

<style>
    .container {
        max-width: 700px;
    }

    .card {
        border-radius: 15px;
    }

    .form-group label {
        font-weight: 500;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        transition: background-color 0.3s, border-color 0.3s;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #004085;
    }

    .bi-arrow-left-circle-fill {
        color: #00796B;
    }

    .bi-arrow-left-circle-fill:hover {
        color: #034f46;
    }
</style>
@endsection
