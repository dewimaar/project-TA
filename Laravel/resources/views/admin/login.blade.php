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
            background-color: #ffffff; 
            font-family: 'Segoe UI', sans-serif;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        .container {
            display: flex;
            width: 100%;
            max-width: 1920px;
            height: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .left-section {
            background: url('/img/imagelogin.png') no-repeat center center;
            background-size: cover;
            flex: 1;
            background-position: left center;
        }
        .right-section {
            flex: 1;
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            text-align: center; 
            align-items: center; 
        }
        .right-section h3 {
            color: #333333;
            margin-bottom: 10px;
            text-align: center; 
        }
        .right-section p {
            color: #666666;
            margin-bottom: 30px;
            text-align: center; 
        }
        .form-control {
            border-radius: 4px; 
            border: 1px solid #cccccc;
            box-shadow: none;
            background-color: #f9f9f9;
            color: #000000;
            width: 100%; 
            max-width: 600px; 
            padding: 10px; 
            padding-right: 200px;
            margin-bottom: 15px; 
            height: 40px; 
        }
        .form-control::placeholder {
            color: #9e9e9e;
            border: 2px solid transparent;
        }
        .form-control:focus {
            border-color: #999999;
            box-shadow: 0 0 0 0.15rem rgba(23, 123, 105, 0.25);
        }
        .btn-primary {
            background-color: #307743;
            border: none;
            border-radius: 4px;
            width: 100%;
            max-width: 600px; 
            color: #ffffff;
            transition: background-color 0.3s ease;
            height: 40px; 
            font-size: 16px; 
        }
        .btn-primary:hover {
            background-color: #193e22;
        }
        .btn-secondary {
            background-color: #b0b9b2fe;
            color: #000000;
            border: none;
            border-radius: 4px;
            width: 100%;
            max-width: 600px; 
            height: 40px; 
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .btn-secondary:hover {
            background-color: #8c938efe;
        }
        .input-group {
            position: relative;
            width: 100%;
            max-width: 600px; 
        }
        .input-group .btn {
            position: absolute;
            right: 10px;
            top: 35%;
            transform: translateY(-50%);
            border: none;
            background: transparent;
            z-index: 10;
            color: #666666;
            padding: 0;
            margin: 0;
            cursor: pointer;
            font-size: 14px;
        }
        .input-group input {
            width: 100%;
            padding-right: 40px; 
            height: 40px; 
        }
        label {
            display: block;
            width: 100%;
            max-width: 600px;
            margin-bottom: 5px;
            color: #333333;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left-section"></div>
        <div class="right-section">
            <h3>Welcome, Admin!</h3>
            <p>Please sign in to get access.</p>
            @if (session('error'))
                <div class="alert alert-danger" role="alert">
                    {{ session('error') }}
                </div>
            @endif
            <form method="POST" action="{{ route('admin.login') }}">
                @csrf
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Enter email" required>
                </div>
                <div class="mb-3">
                    <label for="password">Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" name="password" id="password" placeholder="Enter password" required>
                        <button class="btn" type="button" id="togglePassword"><i class="far fa-eye-slash"></i></button>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember" name="remember">
                    <label class="form-check-label" for="remember">Remember Me</label>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
                <div class="mb-3">
                    <a href="/" class="btn btn-secondary">Back</a>
                </div>
            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
    <script>
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
