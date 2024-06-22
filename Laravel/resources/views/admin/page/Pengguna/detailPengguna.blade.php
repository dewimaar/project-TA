@extends('Admin.Layout.index')

@section('content')
<div class="card">
  <div class="card-header d-flex justify-content-start mb-3">
        <div class="text-primary" onclick="window.location='{{ route('pengguna') }}';">
            <i class="bi bi-arrow-left-circle-fill" style="font-size:20px; cursor:pointer;"></i>
        </div>
  </div>
  <div class="card-body">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th scope="row" class="col-4">Id</th>
          <td id="idPengguna">1</td>
        </tr>
        <tr>
          <th scope="row" class="col-4">Nama</th>
          <td id="namaPengguna">John Doe</td>
        </tr>
        <tr>
          <th scope="row" class="col-4">No Telp</th>
          <td id="noTelpPengguna">1234567890</td>
        </tr>
        <tr>
          <th scope="row" class="col-4">Email</th>
          <td id="emailPengguna">johndoe@example.com</td>
        </tr>
        <tr>
          <th scope="row" class="col-4">Foto</th>
          <td id="fotoPengguna">
            <img src="path/to/image.jpg" alt="Foto Pengguna" class="img-fluid" style="max-width: 150px;">
          </td>
        </tr>
        <tr>
          <th scope="row" class="col-4">Jenis Usaha</th>
          <td id="jenisUsahaPengguna">Retail</td>
        </tr>
        <tr>
          <th scope="row" class="col-4">Nama Usaha</th>
          <td id="namaUsahaPengguna">Doe Mart</td>
        </tr>
        <tr>
          <th scope="row" class="col-4">Alamat Usaha</th>
          <td id="alamatUsahaPengguna">123 Main St, Springfield</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
@endsection
