@extends('Admin.Layout.index')

@section('content')
<div class="container">
    <h1>Bank Details for Store: {{ $transfer->name }}</h1>
    <div class="form-group">
        <label for="bank_name">Select Bank Name:</label>
        <select id="bank_name" class="form-control">
            <option value="">-- Select Bank --</option>
            @foreach($transfer->banks as $bank)
                <option value="{{ $bank->id }}">{{ $bank->bank_name }}</option>
            @endforeach
        </select>
    </div>
    <div id="bank_details" style="display: none;">
        <h3>Bank Details:</h3>
        <form action="{{ route('transferSeller') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="transaction_id" value="{{ $transactions->id }}">
            <input type="hidden" name="store_id" value="{{ $transfer->id }}">
            <div class="form-group">
                <label for="bank_names">Bank Name:</label>
                <input type="text" id="bank_names" name="bank_name" class="form-control" readonly>
            </div>
            <div class="form-group">
                <label for="bank_username">Bank Username:</label>
                <input type="text" id="bank_username" name="bank_username" class="form-control" readonly>
            </div>
            <div class="form-group">
                <label for="bank_account_number">Bank Account Number:</label>
                <input type="text" id="bank_account_number" name="bank_account_number" class="form-control" readonly>
            </div>
            <div class="form-group">
                <label for="payment_image">Upload Payment Image:</label>
                <input type="file" accept="image/*" id="payment_image" name="payment_image" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</div>

<script>
    document.getElementById('bank_name').addEventListener('change', function() {
        var bankId = this.value;
        if (bankId) {
            var banks = @json($transfer->banks);
            var selectedBank = banks.find(bank => bank.id == bankId);
            console.log(selectedBank)
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
@endsection
