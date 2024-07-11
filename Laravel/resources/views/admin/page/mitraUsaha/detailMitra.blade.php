@extends('Admin.Layout.index')

@section('content')
<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-custom">
                <div class="card-header card-header-custom">
                    Detail Store
                </div>
                <div class="card-body card-body-custom">
                    @if($store->image)
                    <div class="mt-3">
                        <strong>Gambar:</strong><br>
                        <img src="{{ asset('storage/' . $store->image) }}" alt="Store Image" style="max-width: 100%; height: 50vh;">
                    </div>
                    @endif
                    <p><strong>ID:</strong> {{ $store->id }}</p>
                    <p><strong>Nama:</strong> {{ $store->name }}</p>
                    <p><strong>Nama Pemilik:</strong> {{ $store->user->name }}</p>
                    <p><strong>Kategori:</strong> {{ $store->category }}</p>
                    <p><strong>Alamat:</strong> {{ $store->address }}</p>
                    <p><strong>Deskripsi:</strong> {{ $store->description }}</p>
                    <!-- Tambahkan informasi lainnya yang ingin ditampilkan -->
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
