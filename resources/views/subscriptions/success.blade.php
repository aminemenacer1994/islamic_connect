<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Successful</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h1>Subscription Successful</h1>
                    </div>
                    <div class="card-body text-center">
                        <div class="alert alert-success">
                            <h4>Congratulations!</h4>
                            <p>Your subscription ID: {{ $subscription_id }}</p>
                            <p>You now have access to all premium features.</p>
                        </div>
                        <a href="{{ route('home') }}" class="btn btn-primary">Continue to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
