<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold display-5 mb-4">Media Center</h1>
        <p class="text-center mb-4 lead"> The Media Center at Islamic Connect is a central hub for inspiring and
            educational Islamic content. It brings together voices, stories, and teachings from across the Muslim world,
            helping you stay connected, informed, and uplifted. </p>
        <div class="row g-4">
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey;">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/ap.avif" alt="Qibla finder" class="w-90 mt-1"
                        style="object-fit: contain; padding: 20px;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Audio Podcasts <span
                                v-if="isLocked('/content')">🔒</span></h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;"> Islamic podcasts
                            offer insightful discussions and teachings from speakers on various aspects of Islamic
                            faith, history, and daily life.</p>
                        
                        <button v-if="!isLocked('/content')" class="form-control" @click="goTo('/content')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Stream Podcasts</b></span>
                        </button>
                        <button v-else class="form-control" @click="showSubscribeModal('/content')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><i class="fas fa-credit-card me-2"></i><b>Subscribe to
                                    Access</b></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4" style="border: 1px solid grey; background:whitesmoke">
                    <span class="badge rounded-pill bg-black text-white position-absolute top-0 start-0 m-2">Under
                        development</span>
                    <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Channel Listing<span
                                v-if="isLocked('/streaming')">🔒</span></h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Watch Islamic TV
                            channels and live lectures—stream events, khutbahs, educational programs, and spiritual
                            content anytime.</p>
                        <button v-if="!isLocked('/streaming')" class="form-control" @click="goTo('/streaming')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Watch Live</b></span>
                        </button>
                        <button v-else class="form-control" @click="showSubscribeModal('/streaming')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><i class="fas fa-credit-card me-2"></i><b>Subscribe to
                                    Access</b></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey;">
                    <span
                        class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
                    <img src="/images/radio5.jpg" alt="Radio stations" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Reciters Stations</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;"> Tune in to live
                            Islamic radio from around the world, featuring Qur'an recitations, lectures, nasheeds, and
                            spiritual reminders—streamed 24/7 in multiple languages.</p>
                        <button class="form-control" @click="goTo('/radio')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Explore Reciters</b></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4" style="border: 1px solid grey;">
                    <img src="/images/img_g.png" alt="Image Gallery" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Image Gallery</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore a beautiful
                            collection of high-quality Islamic images capturing the essence of faith, culture, and
                            tradition.</p>
                        <button class="form-control" @click="goTo('/gallery')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>View Gallery</b></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card custom-card shadow-sm rounded-4" style="border: 1px solid grey;">
                    <img src="/images/vide_g.png" alt="Video Gallery" class="w-100" style="object-fit: contain;" />
                    <div class="p-3">
                        <h5 class="mb-2 fw-bold display-6 text-dark text-center">Video Gallery</h5>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore a curated
                            collection of short Islamic videos featuring reminders, duas, stories of the Prophets and
                            Quranic reflections</p>
                        <button class="form-control" @click="goTo('/video')"
                            style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="button">
                            <span class="text-center w-100"><b>Watch Videos</b></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Subscribe Modal -->
        <div class="modal fade" id="subscribeModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Subscribe to Access Premium Content</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-crown text-warning fa-3x mb-3"></i>
                            <h4>Unlock Premium Content</h4>
                            <p>Get access to exclusive Islamic podcasts and live streaming content.</p>
                        </div>
                        <div class="pricing-info mb-3">
                            <h5 class="text-success">£4.99/month</h5>
                            <small class="text-muted">Cancel anytime</small>
                        </div>
                        <div class="features mb-3">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Access to all Audio Podcasts</li>
                                <li><i class="fas fa-check text-success me-2"></i>Live Streaming Content</li>
                                <li><i class="fas fa-check text-success me-2"></i>Ad-free Experience</li>
                                <li><i class="fas fa-check text-success me-2"></i>New Content Weekly</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Maybe Later</button>
                        <button type="button" class="btn btn-primary" @click="initiateSubscription"
                            :disabled="isProcessing">
                            <span v-if="isProcessing">
                                <i class="fas fa-spinner fa-spin me-2"></i>Processing...
                            </span>
                            <span v-else>
                                <i class="fas fa-credit-card me-2"></i>Subscribe Now
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccessMessage" class="alert alert-success text-center"
            style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1050; width: 80%; max-width: 500px;">
            <h4>Subscription Successful!</h4>
            <p>Welcome to premium content. Redirecting in a few seconds...</p>
        </div>

        <!-- Loading Overlay -->
        <div v-if="isProcessing" class="loading-overlay">
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin fa-3x text-primary"></i>
                <p class="mt-3">Setting up your subscription...</p>
            </div>
        </div>
    </div>
</template>

<script>
import mitt from 'mitt';
import subscriptionMixin from '../mixins/subscriptionMixin.js';

const emitter = mitt();
export default {
    mixins: [subscriptionMixin],
    data() {
        return {
            intendedPath: null,
            isProcessing: false,
            showSuccessMessage: false,
            stripePrice: null,
            debugInfo: null // Add debug info
        };
    },
    methods: {
        showSubscribeModal(path) {
            console.log('Showing subscribe modal for path:', path);
            this.intendedPath = path;
            const modalElement = document.getElementById('subscribeModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        },

        async initiateSubscription() {
            if (!this.stripePrice) {
                alert('Subscription is currently unavailable. Please try again later.');
                return;
            }

            this.isProcessing = true;

            try {
                const response = await fetch('/subscription/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Authorization': 'Bearer ' + localStorage.getItem('sanctum_token'),
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        price_id: this.stripePrice,
                        success_url: window.location.origin + '/subscription/success?intended=' + encodeURIComponent(this.intendedPath || '/content'),
                        cancel_url: window.location.origin + '/subscription/cancel'
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Checkout session response:', data);

                if (data.success && data.checkout_url) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('subscribeModal'));
                    if (modal) {
                        modal.hide();
                    }
                    window.location.href = data.checkout_url;
                } else {
                    throw new Error(data.error || 'Failed to create checkout session');
                }

            } catch (error) {
                console.error('Error initiating subscription:', error);
                alert('Error: ' + error.message);
            } finally {
                this.isProcessing = false;
            }
        },

        async fetchPriceId() {
            try {
                const token = localStorage.getItem('sanctum_token') ||
                    document.querySelector('meta[name="api-token"]')?.content;

                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch('/subscription/config', {
                    headers
                });

                if (response.ok) {
                    const data = await response.json();
                    this.stripePrice = data.price_id;
                    console.log('Price ID loaded:', this.stripePrice);
                } else {
                    throw new Error('Failed to fetch price ID');
                }
            } catch (error) {
                console.error('Error fetching price ID:', error);
                alert('Unable to load subscription details. Please try again later.');
                this.stripePrice = null;
            }
        },

        // Add debug method to manually check status (kept for potential future use, but not triggered)
        async debugSubscriptionStatus() {
            console.log('=== DEBUG SUBSCRIPTION STATUS ===');
            
            const token = localStorage.getItem('sanctum_token');
            console.log('Token exists:', !!token);
            
            if (!token) {
                console.log('No token found');
                return;
            }

            try {
                const response = await fetch('/subscription/status?debug=1&_t=' + Date.now(), {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });

                console.log('Response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Subscription data:', data);
                    this.debugInfo = data;
                    
                    // Update local state
                    this.subscribed = data.subscribed;
                    this.subscriptionInfo = data.subscription_info;
                    this.user = data.user;
                    
                    console.log('Local state updated:', {
                        subscribed: this.subscribed,
                        hasActiveSubscription: this.hasActiveSubscription(),
                        isContentLocked: this.isLocked('/content')
                    });
                } else {
                    const errorText = await response.text();
                    console.log('Error response:', errorText);
                }
            } catch (error) {
                console.error('Debug fetch error:', error);
            }
        }
    },

    async created() {
        console.log('MediaCenter created, current path:', window.location.pathname);
        console.log('URL search params:', window.location.search);

        // Load price ID first
        await this.fetchPriceId();

        // Check for success from Laravel session
        if (window.Laravel && window.Laravel.success) {
            console.log('Laravel success flag found');
            this.showSuccessMessage = true;
            this.subscribed = window.Laravel.subscribed || false;
            setTimeout(() => {
                this.showSuccessMessage = false;
                this.fetchSubscriptionStatus();
                const urlParams = new URLSearchParams(window.location.search);
                const intended = urlParams.get('intended') || '/media';
                window.location.href = intended;
            }, 3000);
            return;
        }

        // Check for session_id in URL (successful Stripe checkout)
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        
        if (sessionId) {
            console.log('Session ID found:', sessionId);
            console.log('User returned from Stripe checkout');
            
            // Wait a moment for the webhook to process
            setTimeout(async () => {
                console.log('Fetching updated subscription status...');
                await this.fetchSubscriptionStatus(true);
                
                console.log('After fetch - subscribed:', this.subscribed);
                console.log('After fetch - hasActiveSubscription:', this.hasActiveSubscription());
                
                // Clean up URL
                const newUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, document.title, newUrl);
            }, 2000); // Wait 2 seconds for webhook
            return;
        }

        // Check authentication and fetch status
        const token = localStorage.getItem('sanctum_token');
        if (token) {
            console.log('Token found, fetching subscription status');
            await this.fetchSubscriptionStatus();
        } else {
            console.log('No token found, setting subscribed to false');
            this.subscribed = false;
        }
    }
};
</script>

<style scoped>
.card.custom-card .card-text {
    max-height: 4.5em;
    text-overflow: ellipsis;
}

.card.custom-card button.form-control {
    background: #00bfa6;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: white;
    height: 38px;
    padding: 0.375rem 0.75rem;
    border: none;
}

.custom-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.custom-card {
    height: 100%;
}

.custom-card img {
    height: 180px;
    object-fit: cover;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1060;
}

.loading-spinner {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
}
</style>