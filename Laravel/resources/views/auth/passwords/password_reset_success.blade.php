<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f0f0f0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin-top: 50px;
        }
        h2 {
            color: #333;
        }
        p {
            color: #666;
        }
        /* Add responsive styles */
        @media only screen and (max-width: 600px) {
            .container {
                margin-top: 20px;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Reset Password</h2>
        <p>Selamat, password Anda berhasil direset. Silahkan login kembali di aplikasi Tokoku dengan password yang baru.</p>
        {{-- <a href="{{ url('/') }}" class="btn btn-primary">Go to Home</a> --}}
    </div>
</body>
</html>
