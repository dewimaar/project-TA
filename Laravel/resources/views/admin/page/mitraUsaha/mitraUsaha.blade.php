@extends('Admin.Layout.index')

@section('content')

<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <div class="halaman">
            <select class="form-select" id="showPerPage">
                <option selected>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
        <div>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="bi bi-search" style="cursor:pointer;"></i>
                </span>
                <input type="text" class="form-control" placeholder="Cari..." aria-label="Cari" aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col" class="col-3">Nama</th>
                        <th scope="col" class="col-2">No Telp</th>
                        <th scope="col" class="col-4">Email</th>
                        <th scope="col" class="col-1">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>08123456789</td>
                        <td>Jl. Pahlawan No. 123</td>
                        <td>
                            <div class="d-flex justify-content-center align-items-center gap-1">
                                <i class=" text-primary bi bi-info-circle-fill" style="font-size: 20px; cursor: pointer;" onclick="window.location='{{ route('detailMitra') }}';"></i>
                                <i class=" text-danger bi bi-trash-fill" style="font-size: 20px; cursor: pointer;"></i>
                            </div>
                        </td>
                    </tr>
                    <!-- Tambahkan baris data lainnya sesuai kebutuhan -->
                </tbody>
            </table>
        </div>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="card-footer">
    </div>
</div>
@endsection
