<aside id="sidebar">

    <div class="d-flex">
        <button class="toggle-btn" type="button">
            <i class="lni lni-cart-full"></i>
        </button>
        <div class="sidebar-logo">
            <a href="#">Marketplace</a>
        </div>
    </div>
    <ul class="sidebar-nav">
        <li class="sidebar-item {{ Request::path() == 'admin/dashboard' ? 'active' : '' }}">
            <a href="/admin/dashboard" class="sidebar-link">
                <i class="lni lni-grid-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="sidebar-item {{ Request::path() == 'admin/pengguna' ? 'active' : '' }}">
            <a href="/admin/pengguna" class="sidebar-link">
                <i class="bi bi-person"></i>
                <span>Pengguna</span>
            </a>
        </li>
        <li class="sidebar-item {{ Request::path() == 'admin/mitraUsaha' ? 'active' : '' }}">
            <a href="/admin/mitraUsaha" class="sidebar-link">
                <i class="bi bi-building"></i>
                <span>Mitra Usaha</span>
            </a>
        </li>
        <li class="sidebar-item {{ Request::path() == 'admin/riwayatTransaksi' ? 'active' : '' }}">
            <a href="/admin/riwayatTransaksi" class="sidebar-link">
                <i class="bi bi-clock-history"></i>
                <span>Riwayat Transaksi</span>
            </a>
        </li>
        <li class="sidebar-item {{ Request::path() == 'admin/rekapPenghasilan' ? 'active' : '' }}">
            <a href="/admin/rekapPenghasilan" class="sidebar-link">
                <i class="bi bi-file-earmark-bar-graph"></i>
                <span>Rekap Penghasilan</span>
            </a>
        </li>
    </ul>
    <div class="sidebar-footer">
        <form id="logoutForm" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
        <a href="#" id="logoutButton" class="sidebar-link">
            <i class="lni lni-exit"></i>
            <span>Logout</span>
        </a>
    </div>
</aside>
