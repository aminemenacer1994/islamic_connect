<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>
        <h1>Thank You for Your Donation!</h1>
        <p>Your donation has been successfully processed.</p>
        <p>We appreciate your support!</p>
    </div>

    <script defer>
        // Redirect to the desired page after a 3-second delay
        setTimeout(function() {
            window.location.href = "{{ url('/support') }}"; // Change to your desired redirect URL
        }, 3000); // 3000ms = 3 seconds
    </script>
</body>
</html>
