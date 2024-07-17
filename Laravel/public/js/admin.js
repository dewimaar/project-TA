const sidebar = document.querySelector("#sidebar");
const main = document.querySelector(".main");
document.querySelector("#sidebar").classList.add("expand");

document.getElementById("logoutButton").addEventListener("click", function(event) {
    event.preventDefault();

    Swal.fire({
        title: 'Apakah Anda yakin ingin keluar?',
        text: "Anda akan keluar dari sesi saat ini.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Submit the logout form
            document.getElementById('logoutForm').submit();
        }
    });
});