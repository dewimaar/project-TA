<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
        }

        header {
            position: fixed; /* Fix the header at the top */
            top: 0;
            width: 100%;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #dcd9cd9d; /* Optional: Add a semi-transparent background */
            z-index: 1000; /* Ensure the header stays on top */
        }

        section {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
            text-align: left; /* Center align default */
        }

        .main-section {
            background: url('{{ asset('img/lp.png') }}') no-repeat;
            background-size: cover;
            background-position: center;
            padding-top: 80px; /* Add padding to account for the fixed header */
            text-align: left;
        }

        .section-content {
            background-color: white;
            color: rgb(255, 255, 255);
            font-size: 3em;
            font-weight: bold;
            padding: 100px 20px;
            text-align: left; /* Align center for default sections */
        }

        #home .section-content {
            text-align: left; /* Align left for Home section */
        }

        

        .logo-img {
            width: 50px; /* Sesuaikan lebar logo */
            height: auto; /* Menjaga rasio aspek gambar */
        }


        header .navigation a {
            color: #3c6a3f;
            text-decoration: none;
            font-weight: 500;
            letter-spacing: 1px;
            padding: 2px 15px;
            border-radius: 20px;
            transition: 0.3s;
            transition-property: background;
        }

        header .navigation a:not(:last-child) {
            margin-right: 30px;
        }

        header .navigation a:hover {
            background: #000000;
        }

        .content {
            max-width: 650px;
            margin: 160px 100px; /* Increase the top margin to move the content down */
        }

        .content .info h2 {
            font-size: 55px;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 2px;
            line-height: 60px;
        }

        .content .info h2 span {
                font-size: 55px;
                font-weight: 800;
                background: linear-gradient(to right, rgb(188, 0, 31), purple);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

        .content .info p {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 40px;
        }

        .content .info-btn {
            color: #b0ffb0;
            background: #3c6a3f;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 2px;
            padding: 10px 20px;
            border-radius: 5px;
            transition: 0.3;
            transition-property: background;
            display: inline-block; /* Ensure button is inline */
            margin-top: 20px; /* Add margin to separate from paragraph */
        }

        .content .info-btn:hover {
            background: #ffffff;
        }

        .media-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
        }

        .media-icons a {
            position: relative;
            color: #3c6a3f;
            font-size: 25px;
            transition: 0.3s;
            transition-property: transform;
            top: -80px; 
        }

        .media-icons a:not(:last-child) {
            margin-right: 60px;
        }

        .media-icons a:hover {
            transform: scale(1.5);
        }

        label {
            display: none;
        }

        #check {
            z-index: 3;
            display: none;
        }

        @media (max-width: 960px) {
            header {
                padding: 30px 20px; /* Adjust padding for smaller screens */
            }

            header .navigation {
                display: none;
            }
            label {
                display: block;
                font-size: 25px;
                cursor: pointer;
                transition: 0.3s;
                transition-property: color;
            }
            label:hover {
                color: #ffffff;
            }
            label .close-btn {
                display: none;
            }
            #check:checked ~ header .navigation {
                z-index: 2;
                position: fixed;
                background: #ffffff;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            #check:checked ~ header .navigation a {
                font-weight: 700;
                margin-right: 0;
                margin-bottom: 50px;
                letter-spacing: 2px;
            }
            #check:checked ~ header label .menu-btn {
                display: none;
            }
            #check:checked ~ header label .close-btn {
                z-index: 2;
                display: block;
                position: fixed;
            }
            label .menu-btn {
                position: absolute;
            }
            header .logo {
                position: absolute;
                bottom: -6px;
            }
            .content .info h2 {
                font-size: 45px;
                line-height: 50px;
            }
            .content .info h2 span {
                font-size: 55px;
                font-weight: 800;
                background: linear-gradient(to right, rgb(255, 57, 90), purple);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .content .info p {
                font-size: 14px;
            }
            .content .info-btn {
                font-size: 14px; /* Adjust font size for smaller screens */
            }
        }

        @media (max-width: 560px) {
            .content .info h2 {
                font-size: 35px;
                line-height: 40px;
            }
            .content .info h2 span {
                font-size: 55px;
                font-weight: 800;
                background: linear-gradient(to right, rgb(255, 57, 90), purple);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .content .info p {
                font-size: 14px;
            }
        }
        .navigation .gradient-link {
            background: linear-gradient(to right, red, purple);
            text-decoration: none;
            font-weight: 500;
            letter-spacing: 1px;
            padding: 2px 15px;
            border-radius: 20px;
            transition: 0.3s;
            transition-property: background;
        }

        .feature-img {
            width: 150px;
            height: 150px;
            transition: transform 0.3s ease;
        }

        .feature-img:hover {
            transform: scale(1.2);
        }
    </style>
</head>
<body>
    <section id="home" class="main-section">
        <input type="checkbox" id="check">
        <header>
            <h2><a href="#" class="logo"><img src="/img/logos.png" alt="Logo" class="logo-img"></a></h2>
            <div class="navigation">
                <a href="#">Home</a>
                <a href="#about">About</a>
                <a href="#info">Fitur</a>
                <a href="#contact" class="gradient-link">DOWNLOAD</a>
            </div>
            <label for="check">
                <i class="fas fa-bars menu-btn"></i>
                <i class="fas fa-times close-btn"></i>
            </label>
        </header>
        <div class="content">
            <div class="info">
                <h2>MARKETPLACE<br><span>TOKOKU</span></h2>
                <p>TOKOKU adalah sebuah platform marketplace yang hanya difokuskan di daerah Semarang. Anda bisa berbelanja dan membuka toko online melalui aplikasi ini. Selain kegiatan jual beli Tokoku juga membantu anda dalam mengatur stok barang di toko anda.</p>
                <a href="{{ url('login/admin') }}" class="info-btn">Get Started</a>
            </div>
        </div>
        <div class="media-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
    </section>

    <section id="about" style="padding: 40px 0; background-image: url('/img/bg1.png'); background-size: cover; background-position: center;">
        <div style="max-width: 800px; margin-left: 0; text-align: left; color: rgb(0, 0, 0); padding-left: 150px;">
            <h2 style="font-size: 4em;">About Us</h2>
            <p style="font-size: 1.2em;">Selamat datang di Tokoku, destinasi utama Anda untuk belanja dan jualan online yang mudah. Di Tokoku, kami berkomitmen untuk menjembatani kesenjangan antara pembeli dan penjual dengan menyediakan pengalaman marketplace yang mulus, aman, dan menyenangkan.</p>
        </div>
    </section>    

    <section id="info" style="display: flex; justify-content: center; align-items: center; padding: 40px 0; background-image: url('/img/bg2.png'); background-size: cover; background-position: center;">
        <div style="max-width: 800px; text-align: center; color: rgb(0, 0, 0);">
            <h2 style="font-size: 4em;">Fitur</h2>
            <p style="font-size: 1.2em;">TOKOKU memiliki beberapa fitur utama yang memudahkan anda berbelanja atau mengelola toko anda secara online.</p>
            <div style="display: flex; justify-content: center; margin-top: 40px;">
                <div style="text-align: center; margin: 0 20px;">
                    <img class="feature-img" src="/img/store.png" alt="Store">
                    <p>Toko</p>
                </div>
                <div style="text-align: center; margin: 0 20px;">
                    <img class="feature-img" src="/img/cart.png" alt="Cart">
                    <p>Belanja</p>
                </div>
                <div style="text-align: center; margin: 0 20px;">
                    <img class="feature-img" src="/img/list.png" alt="List">
                    <p>Inventory</p>
                </div>
                <div style="text-align: center; margin: 0 20px;">
                    <img class="feature-img" src="/img/notif.png" alt="Notif">
                    <p>Notifikasi</p>
                </div>
            </div>
        </div>
    </section>
     

    <section id="contact" style="padding: 40px 0; background-image: url('/img/bg3.png'); background-size: cover; background-position: center;">
        <div style="max-width: 800px; margin-left: auto; text-align: right; color: rgb(0, 0, 0); padding-right: 150px;">
            <h2 style="font-size: 4em;">DOWNLOAD</h2>
        </div>
    </section>      
    
</body>
</html>
