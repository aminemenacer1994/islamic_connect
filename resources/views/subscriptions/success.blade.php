<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Success - Islamic Connect</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .success-card {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 90%;
            position: relative;
            overflow: hidden;
        }
        
        .success-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(45deg, #00bfa6, #20b2aa);
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #00bfa6, #20b2aa);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            animation: checkmark 0.6s ease-in-out;
        }
        
        .success-icon i {
            font-size: 2rem;
            color: white;
        }
        
        @keyframes checkmark {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .btn-custom {
            background: linear-gradient(45deg, #00bfa6, #20b2aa);
            border: none;
            border-radius: 25px;
            padding: 12px 30px;
            font-weight: bold;
            color: white;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            margin: 10px;
        }
        
        .btn-custom:hover {
            background: linear-gradient(45deg, #009688, #1a9999);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            color: white;
        }
        
        .features {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 1.5rem 0;
            text-align: left;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .feature-item:last-child {
            margin-bottom: 0;
        }
        
        .feature-item i {
            color: #00bfa6;
            margin-right: 10px;
        }
        
        .countdown {
            font-size: 0.9rem;
            color: #666;
            margin-top: 1rem;
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #00bfa6;
            animation: confetti-fall 3s linear infinite;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    </style>
</head>
<body>
    <div class="success-card">
        <!-- Confetti Animation -->
        <div class="confetti" style="left: 10%; animation-delay: 0s; background: #00bfa6;"></div>
        <div class="confetti" style="left: 20%; animation-delay: 0.5s; background: #20b2aa;"></div>
        <div class="confetti" style="left: 30%; animation-delay: 1s; background: #ffc107;"></div>
        <div class="confetti" style="left: 40%; animation-delay: 0.3s; background: #28a745;"></div>
        <div class="confetti" style="left: 50%; animation-delay: 1.2s; background: #007bff;"></div>
        <div class="confetti" style="left: 60%; animation-delay: 0.8s; background: #dc3545;"></div>
        <div class="confetti" style="left: 70%; animation-delay: 0.2s; background: #6f42c1;"></div>
        <div class="confetti" style="left: 80%; animation-delay: 1.5s; background: #fd7e14;"></div>
        <div class="confetti" style="left: 90%; animation-delay: 0.7s; background: #e83e8c;"></div>
        
        <div class="success-icon">
            <i class="fas fa-check"></i>
        </div>
        
        <h2 class="text-success mb-3">🎉 Subscription Successful!</h2>
        <p class="lead mb-4">Welcome to Islamic Connect Premium!</p>
        <p class="text-muted">Your payment has been processed successfully and your subscription is now active.</p>
        
        <div class="features">
            <h5 class="mb-3"><i class="fas fa-crown text-warning me-2"></i>You now have access to:</h5>
            <div class="feature-item">
                <i class="fas fa-podcast"></i>
                <span>Premium Islamic Podcasts</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-video"></i>
                <span>Live Streaming Content</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-ad"></i>
                <span>Ad-free Experience</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-star"></i>
                <span>Exclusive Premium Content</span>
            </div>
        </div>
        
        <div class="d-flex flex-wrap justify-content-center">
            @if(isset($intended) && $intended !== '/media')
                <a href="{{ $intended }}" class="btn-custom">
                    <i class="fas fa-play-circle me-2"></i>Start Listening
                </a>
            @endif
            <a href="/media" class="btn-custom">
                <i class="fas fa-home me-2"></i>Back to Media Center
            </a>
        </div>
        
        <div class="countdown" id="countdown">
            <!-- Countdown will be inserted here by JavaScript -->
        </div>
    </div>

    <script>
        // Auto redirect after 10 seconds
        let countdown = 10;
        const countdownElement = document.getElementById('countdown');
        
        function updateCountdown() {
            if (countdown > 0) {
                countdownElement.innerHTML = `<i class="fas fa-clock me-1"></i>Auto-redirecting in ${countdown} seconds...`;
                countdown--;
                setTimeout(updateCountdown, 1000);
            } else {
                // Redirect to intended path or media center
                const intended = '{{ $intended ?? "/media" }}';
                window.location.href = intended;
            }
        }
        
        // Start countdown when page loads
        document.addEventListener('DOMContentLoaded', function() {
            updateCountdown();
            
            // Add click handlers to stop countdown when user clicks a button
            document.querySelectorAll('.btn-custom').forEach(button => {
                button.addEventListener('click', function() {
                    countdown = 0;
                    countdownElement.innerHTML = '<i class="fas fa-check me-1"></i>Redirecting...';
                });
            });
        });
        
        // Add some interactive confetti on click
        document.addEventListener('click', function(e) {
            createConfetti(e.clientX, e.clientY);
        });
        
        function createConfetti(x, y) {
            const colors = ['#00bfa6', '#20b2aa', '#ffc107', '#28a745', '#007bff', '#dc3545'];
            
            for (let i = 0; i < 6; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = x + 'px';
                confetti.style.top = y + 'px';
                confetti.style.width = '6px';
                confetti.style.height = '6px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.pointerEvents = 'none';
                confetti.style.borderRadius = '50%';
                confetti.style.zIndex = '10000';
                
                const angle = (Math.PI * 2 * i) / 6;
                const velocity = 100 + Math.random() * 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                document.body.appendChild(confetti);
                
                let posX = x;
                let posY = y;
                let opacity = 1;
                
                const animate = () => {
                    posX += vx * 0.02;
                    posY += vy * 0.02 + 2;
                    opacity -= 0.02;
                    
                    confetti.style.left = posX + 'px';
                    confetti.style.top = posY + 'px';
                    confetti.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        document.body.removeChild(confetti);
                    }
                };
                
                requestAnimationFrame(animate);
            }
        }
    </script>
</body>
</html>