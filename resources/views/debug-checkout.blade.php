<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Stripe Debug</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .success { background-color: #d4edda; border-color: #c3e6cb; }
        .error { background-color: #f8d7da; border-color: #f5c6cb; }
        .info { background-color: #d1ecf1; border-color: #bee5eb; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; }
        button { background: #006b5f; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #00564c; }
        button:focus { outline: 3px solid #00564c; outline-offset: 2px; }
    </style>
</head>
<body>
    <h1>Stripe Integration Debug</h1>
    
    <div class="section">
        <h2>Step 1: Check Configuration</h2>
        <button onclick="checkConfig()">Test Stripe Config</button>
        <div id="config-result"></div>
    </div>

    <div class="section">
        <h2>Step 2: Test Checkout Session Creation</h2>
        <button onclick="testCheckout()">Create Debug Checkout Session</button>
        <div id="checkout-result"></div>
    </div>

    <div class="section">
        <h2>Step 3: User & Auth Info</h2>
        <button onclick="checkUser()">Check User Info</button>
        <div id="user-result"></div>
    </div>

    <script>
        async function checkConfig() {
            try {
                const response = await fetch('/debug/stripe-config', {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
                const data = await response.json();
                document.getElementById('config-result').innerHTML = 
                    '<div class="info"><h3>Configuration:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre></div>';
            } catch (error) {
                document.getElementById('config-result').innerHTML = 
                    '<div class="error">Error: ' + error.message + '</div>';
            }
        }

        async function testCheckout() {
            try {
                const response = await fetch('/debug/checkout-debug', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
                const data = await response.json();
                
                const resultClass = data.success ? 'success' : 'error';
                const resultHtml = `
                    <div class="${resultClass}">
                        <h3>${data.success ? 'Success!' : 'Error:'}</h3>
                        ${data.success ? 
                            '<p>Checkout URL: <a href="' + data.checkout_url + '" target="_blank">' + data.checkout_url + '</a></p>' : 
                            '<p>Error: ' + (data.error || 'Unknown error') + '</p>'
                        }
                        <h4>Debug Info:</h4>
                        <pre>${JSON.stringify(data.debug, null, 2)}</pre>
                    </div>
                `;
                document.getElementById('checkout-result').innerHTML = resultHtml;
            } catch (error) {
                document.getElementById('checkout-result').innerHTML = 
                    '<div class="error">Network Error: ' + error.message + '</div>';
            }
        }

        async function checkUser() {
            try {
                const response = await fetch('/debug/user-info', {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
                const data = await response.json();
                document.getElementById('user-result').innerHTML = 
                    '<div class="info"><h3>User Info:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre></div>';
            } catch (error) {
                document.getElementById('user-result').innerHTML = 
                    '<div class="error">Error: ' + error.message + '</div>';
            }
        }
    </script>
</body>
</html>
