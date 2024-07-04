@extends('Admin.Layout.index')

@section('content')
<style>
    .notification-container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .notification {
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .notification-icon {
        font-size: 24px;
        margin-right: 15px;
    }

    .notification-content {
        flex: 1;
    }

    .notification-title {
        font-size: 18px;
        font-weight: bold;
    }

    .notification-time {
        font-size: 14px;
        color: #999;
    }

    .notification-message {
        font-size: 16px;
        margin-top: 5px;
    }

    .notification-success {
        border-left: 5px solid #4CAF50;
    }

    .notification-info {
        border-left: 5px solid #2196F3;
    }

    .notification-warning {
        border-left: 5px solid #FFC107;
    }

    .notification-danger {
        border-left: 5px solid #F44336;
    }
</style>

<div class="container">
    <div class="notification-container">
        <div class="notification notification-success">
            <div class="notification-icon">
                <i class="bi bi-check-circle-fill" style="color: #4CAF50;"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">Success Notification</div>
                <div class="notification-time">2 hours ago</div>
                <div class="notification-message">Your operation was completed successfully.</div>
            </div>
        </div>

        <div class="notification notification-info">
            <div class="notification-icon">
                <i class="bi bi-info-circle-fill" style="color: #2196F3;"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">Info Notification</div>
                <div class="notification-time">1 day ago</div>
                <div class="notification-message">Here is some information you might find useful.</div>
            </div>
        </div>

        <div class="notification notification-warning">
            <div class="notification-icon">
                <i class="bi bi-exclamation-triangle-fill" style="color: #FFC107;"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">Warning Notification</div>
                <div class="notification-time">3 days ago</div>
                <div class="notification-message">Please be aware of this important warning.</div>
            </div>
        </div>

        <div class="notification notification-danger">
            <div class="notification-icon">
                <i class="bi bi-x-circle-fill" style="color: #F44336;"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">Danger Notification</div>
                <div class="notification-time">1 week ago</div>
                <div class="notification-message">There was an error with your operation.</div>
            </div>
        </div>
    </div>
</div>

@endsection
