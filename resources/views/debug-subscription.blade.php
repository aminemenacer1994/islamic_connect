<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debug Subscription Status</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .debug-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .debug-section {
            margin-bottom: 30px;
            padding: 15px;
            border-left: 4px solid #007cba;
            background: #f8f9fa;
        }
        .debug-section h3 {
            margin-top: 0;
            color: #333;
        }
        .status-item {
            margin: 10px 0;
            padding: 10px;
            border-radius: 4px;
        }
        .status-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .status-error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        .status-info {
            background: #cce7ff;
            border: 1px solid #b3d9ff;
            color: #004085;
        }
        button {
            background: #007cba;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background: #005a8b;
        }
        pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 12px;
            white-space: pre-wrap;
        }
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
        .step {
            background: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .step h4 {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="debug-container">
        <h1>🔍 Subscription Debug Page</h1>
        
        <div class="step">
            <h4>What this page does:</h4>
            <p>This page will check your subscription status from multiple angles to find out why you can't access premium content.</p>
        </div>
        
        <div class="debug-section">
            <h3>Quick Actions</h3>
            <button onclick="checkEverything()">🔍 Check Everything</button>
            <button onclick="testContentAccess()">🚪 Test Content Access</button>
            <button onclick="manualCheck()">🔄 Manual Subscription Check</button>
            <button onclick="goToContent()">➡️ Go to Content Page</button>
        </div>

        <div class="debug-section">
            <h3>1. Authentication Status</h3>
            <div id="auth-status">Checking...</div>
        </div>

        <div class="debug-section">
            <h3>2. Frontend Subscription Check</h3>
            <div id="frontend-status">Loading...</div>
            <pre id="frontend-raw"></pre>
        </div>

        <div class="debug-section">
            <h3>3. Backend Database Check</h3>
            <div id="database-status">Loading...</div>
            <pre id="database-raw"></pre>
        </div>

        <div class="debug-section">
            <h3>4. Content Access Test</h3>
            <div id="content-access">Not tested</div>
        </div>

        <div class="debug-section">
            <h3>5. Next Steps</h3>
            <div id="next-steps">Run the check first</div>
        </div>

        <div class="debug-section">
            <h3>Debug Logs</h3>
            <div id="debug-logs"></div>
        </div>
    </div>

    <script>
        let debugLogs = [];
        
        function log(message, type = 'info') {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = `[${timestamp}] ${message}`;
            debugLogs.push(logEntry);
            console.log(logEntry);
            updateLogsDisplay();
        }
        
        function updateLogsDisplay() {
            const logsDiv = document.getElementById('debug-logs');
            logsDiv.innerHTML = '<pre>' + debugLogs.join('\n') + '</pre>';
        }
        
        async function checkAuthentication() {
            const token = localStorage.getItem('sanctum_token');
            const authDiv = document.getElementById('auth-status');
            
            if (!token) {
                authDiv.innerHTML = '<div class="status-error">❌ No authentication token found in localStorage</div>';
                log('No auth token found - this could be the issue!', 'error');
                return false;
            }
            
            authDiv.innerHTML = `<div class="status-success">✅ Token found: ${token.substring(0, 20)}...</div>`;
            log('Auth token exists');
            return true;
        }
        
        async function checkFrontendAPI() {
            const statusDiv = document.getElementById('frontend-status');
            const rawDiv = document.getElementById('frontend-raw');
            
            try {
                const token = localStorage.getItem('sanctum_token');
                if (!token) {
                    throw new Error('No authentication token');
                }
                
                log('Calling /subscription/status API (frontend method)...');
                const response = await fetch('/subscription/status?debug=1&_t=' + Date.now(), {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
                
                log(`Frontend API response status: ${response.status}`);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
                
                const data = await response.json();
                log(`Frontend subscription data: subscribed=${data.subscribed}`);
                
                if (data.subscribed) {
                    statusDiv.innerHTML = '<div class="status-success">✅ Frontend API says: User is subscribed</div>';
                } else {
                    statusDiv.innerHTML = '<div class="status-error">❌ Frontend API says: User is NOT subscribed</div>';
                }
                
                rawDiv.textContent = JSON.stringify(data, null, 2);
                return data;
                
            } catch (error) {
                log(`Frontend API error: ${error.message}`, 'error');
                statusDiv.innerHTML = `<div class="status-error">❌ Frontend API Error: ${error.message}</div>`;
                rawDiv.textContent = error.toString();
                return null;
            }
        }
        
        async function checkDatabase() {
            const statusDiv = document.getElementById('database-status');
            const rawDiv = document.getElementById('database-raw');
            
            try {
                log('Checking database directly...');
                const token = localStorage.getItem('sanctum_token');
                const response = await fetch('/api/debug/subscription', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
                
                const data = await response.json();
                log(`Database check complete: ${data.subscriptions?.length || 0} subscriptions found`);
                
                if (data.subscriptions && data.subscriptions.length > 0) {
                    const activeSubscriptions = data.subscriptions.filter(sub => 
                        sub.methods.active || sub.methods.valid
                    );
                    
                    if (activeSubscriptions.length > 0) {
                        statusDiv.innerHTML = `<div class="status-success">✅ Found ${activeSubscriptions.length} active subscription(s) in database</div>`;
                    } else {
                        statusDiv.innerHTML = `<div class="status-error">❌ Found ${data.subscriptions.length} subscription(s) but none are active</div>`;
                    }
                } else {
                    statusDiv.innerHTML = '<div class="status-error">❌ No subscriptions found in database</div>';
                }
                
                rawDiv.textContent = JSON.stringify(data, null, 2);
                return data;
                
            } catch (error) {
                log(`Database check error: ${error.message}`, 'error');
                statusDiv.innerHTML = `<div class="status-error">❌ Database check failed: ${error.message}</div>`;
                rawDiv.textContent = error.toString();
                return null;
            }
        }
        
        async function testContentAccess() {
            const accessDiv = document.getElementById('content-access');
            
            try {
                log('Testing content page access...');
                const response = await fetch('/content', {
                    method: 'HEAD',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('sanctum_token')
                    }
                });
                
                log(`Content access test: ${response.status}`);
                
                if (response.status === 200) {
                    accessDiv.innerHTML = '<div class="status-success">✅ Content page accessible</div>';
                } else if (response.status === 403 || response.status === 401) {
                    accessDiv.innerHTML = '<div class="status-error">❌ Content page blocked (subscription required)</div>';
                } else {
                    accessDiv.innerHTML = `<div class="status-info">ℹ️ Content page returned ${response.status}</div>`;
                }
                
            } catch (error) {
                log(`Content access error: ${error.message}`, 'error');
                accessDiv.innerHTML = `<div class="status-error">❌ Error testing access: ${error.message}</div>`;
            }
        }
        
        async function manualCheck() {
            log('Running manual subscription check...');
            
            // Simulate what your Vue component does
            const token = localStorage.getItem('sanctum_token');
            if (!token) {
                log('❌ No token - user needs to login again', 'error');
                return;
            }
            
            try {
                const response = await fetch('/subscription/status', {
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Authorization': 'Bearer ' + token
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const subscribed = data.subscribed;
                    const hasActiveSubscription = subscribed && (!data.subscription_info || data.subscription_info.active !== false);
                    const isLocked = !hasActiveSubscription;
                    
                    log(`Manual check results:`);
                    log(`- subscribed: ${subscribed}`);
                    log(`- hasActiveSubscription: ${hasActiveSubscription}`);
                    log(`- content is locked: ${isLocked}`);
                    
                    if (isLocked) {
                        log('❌ This is why you see "Subscribe to Access"', 'error');
                    } else {
                        log('✅ You should have access to content', 'success');
                    }
                } else {
                    log(`❌ Manual check failed: ${response.status}`, 'error');
                }
            } catch (error) {
                log(`❌ Manual check error: ${error.message}`, 'error');
            }
        }
        
        function goToContent() {
            log('Navigating to content page...');
            window.location.href = '/content';
        }
        
        function generateNextSteps(frontendData, databaseData) {
            const stepsDiv = document.getElementById('next-steps');
            let steps = [];
            
            if (!localStorage.getItem('sanctum_token')) {
                steps.push('🔑 <strong>CRITICAL:</strong> No authentication token found. You need to log in again.');
            }
            
            if (!databaseData || !databaseData.subscriptions || databaseData.subscriptions.length === 0) {
                steps.push('📊 <strong>ISSUE:</strong> No subscriptions found in database. Stripe webhook likely failed.');
                steps.push('🔧 Check your webhook configuration in Stripe Dashboard.');
            } else if (databaseData.subscriptions.length > 0) {
                const activeSubscriptions = databaseData.subscriptions.filter(sub => 
                    sub.methods.active || sub.methods.valid
                );
                
                if (activeSubscriptions.length === 0) {
                    steps.push('⚠️ <strong>ISSUE:</strong> Subscriptions exist but none are active.');
                    steps.push('💳 Check the payment status in Stripe Dashboard.');
                } else {
                    steps.push('✅ Active subscriptions found in database.');
                    
                    if (frontendData && !frontendData.subscribed) {
                        steps.push('🔄 <strong>SYNC ISSUE:</strong> Database has subscription but frontend API returns not subscribed.');
                        steps.push('🛠️ Check your SubscriptionController logic.');
                    }
                }
            }
            
            if (steps.length === 0) {
                steps.push('✅ Everything looks good! If you still can\'t access content, check browser console for JavaScript errors.');
            }
            
            stepsDiv.innerHTML = '<ul><li>' + steps.join('</li><li>') + '</li></ul>';
        }
        
        async function checkEverything() {
            log('=== Starting comprehensive check ===');
            document.querySelector('.debug-container').classList.add('loading');
            
            await checkAuthentication();
            const frontendData = await checkFrontendAPI();
            const databaseData = await checkDatabase();
            await testContentAccess();
            
            generateNextSteps(frontendData, databaseData);
            
            document.querySelector('.debug-container').classList.remove('loading');
            log('=== Check complete ===');
        }
        
        // Auto-run on page load
        window.addEventListener('load', () => {
            log('Debug page loaded');
            setTimeout(checkEverything, 500);
        });
    </script>
</body>
</html>