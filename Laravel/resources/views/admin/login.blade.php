<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #224230; /* Hijau */
            font-family: 'Segoe UI', sans-serif;
        }
        .container {
            margin-top: 80px;
        }
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            background: #e6e6fa; /* Ungu pastel */
            color: #4b0082; /* Warna teks yang kontras */
        }
        .left-section {
            background: url('/img/images.jpg') no-repeat center center;
            background-size: cover;
            border-radius: 15px 0 0 15px;
            transition: transform 0.5s ease;
        }
        .left-section:hover {
            transform: scale(1.05); /* Zoom effect on hover */
        }
        .right-section {
            padding: 20px;
        }
        .card-header {
            background-color: rgba(75, 0, 130, 0.2);
            color: #4b0082;
            text-align: center;
            padding: 20px;
            border-radius: 15px 15px 0 0;
        }
        .form-control {
            border-radius: 0;
            border-bottom: 1px solid rgba(75, 0, 130, 0.5);
            box-shadow: none;
            background-color: rgba(75, 0, 130, 0.1);
            color: #4b0082;
        }
        .form-control:focus {
            border-color: rgba(75, 0, 130, 0.5);
            box-shadow: 0 0 0 0.15rem rgba(75, 0, 130, 0.25);
        }
        .btn-primary {
            background-color: rgba(75, 0, 130, 0.1);
            border: none;
            border-radius: 4px;
            width: 100%;
            color: #4b0082;
            transition: background-color 0.3s ease;
        }
        .btn-primary:hover {
            background-color: rgba(75, 0, 130, 0.3);
        }
        .form-check-input {
            margin-top: 8px;
            margin-right: 5px;
        }
        .form-check-label {
            color: rgba(75, 0, 130, 0.9);
        }
        .forgot-password {
            text-align: right;
            margin-top: 10px;
        }
        .forgot-password a {
            color: #4b0082;
            text-decoration: underline;
            transition: color 0.3s ease;
        }
        .forgot-password a:hover {
            color: #ccc;
        }
        .card-footer {
            background-color: rgba(75, 0, 130, 0.1);
            border-radius: 0 0 15px 15px;
            padding: 10px 20px;
            text-align: center;
        }
        .card-footer a {
            color: #4b0082;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .card-footer a:hover {
            text-decoration: underline;
            color: #ccc;
        }
        .input-group {
            position: relative;
        }
        .input-group .btn {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            border: none;
            background: transparent;
            z-index: 10;
            color: #4b0082;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-6 left-section"></div>
                        <div class="col-md-6 right-section">
                            <div class="card-header">
                                <h3>Login</h3>
                            </div>
                            <div class="card-body">
                                @if (session('error'))
                                    <div class="alert alert-danger" role="alert">
                                        {{ session('error') }}
                                    </div>
                                @endif
                                <form method="POST" action="{{ route('admin.login') }}">
                                    @csrf
                                    <div class="mb-3">
                                        <input type="email" class="form-control" name="email" placeholder="Email" required>
                                    </div>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
                                            <button class="btn" type="button" id="togglePassword"><i class="far fa-eye-slash"></i></button>
                                        </div>
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" name="remember" id="remember_me">
                                        <label class="form-check-label" for="remember_me">Ingatkan saya</label>
                                    </div>
                                    <div class="mb-3">
                                        <button type="submit" class="btn btn-primary">Login</button>
                                    </div>
                                    <div class="forgot-password">
                                        <a href="#">Lupa kata sandi?</a>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <p>Belum punya akun? <a href="#" class="text-decoration-none">Daftar</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var rememberCheckbox = document.getElementById('remember_me');
            var emailInput = document.querySelector('input[name="email"]');
            var passwordInput = document.querySelector('input[name="password"]');
            
            if (rememberCheckbox && emailInput && passwordInput) {
                rememberCheckbox.addEventListener('change', function() {
                    if (this.checked) {
                        localStorage.setItem('rememberEmail', emailInput.value);
                        localStorage.setItem('rememberPassword', passwordInput.value);
                    } else {
                        localStorage.removeItem('rememberEmail');
                        localStorage.removeItem('rememberPassword');
                    }
                });

                var rememberedEmail = localStorage.getItem('rememberEmail');
                var rememberedPassword = localStorage.getItem('rememberPassword');
                if (rememberedEmail && rememberedPassword) {
                    emailInput.value = rememberedEmail;
                    passwordInput.value = rememberedPassword;
                }
            }
        });

        document.addEventListener("DOMContentLoaded", function() {
            var passwordInput = document.querySelector('input[name="password"]');
            var togglePasswordButton = document.getElementById('togglePassword');
            
            if (passwordInput && togglePasswordButton) {
                togglePasswordButton.addEventListener('click', function() {
                    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    
                    if (type === 'password') {
                        this.innerHTML = '<i class="far fa-eye-slash"></i>';
                    } else {
                        this.innerHTML = '<i class="far fa-eye"></i>';
                    }
                });
            }
        });
    </script>    
</body>
</html>
