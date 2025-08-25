// resources/js/mixins/subscriptionMixin.js
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Configure axios defaults for CSRF and Sanctum
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default {
    data() {
        return {
            isSubscribed: false,
            lockedPaths: ['/content', '/streaming'],
            intended: '',
            stripe: null,
            showSuccessMessage: false,
            loading: true,
            checkoutLoading: false,
        };
    },
    
    async mounted() {
        await this.initializeAuth();
    },
    
    methods: {
        async initializeAuth() {
            try {
                // First get CSRF token
                await this.fetchCsrfToken();
                // Then fetch subscription status
                await this.fetchStatus();
            } catch (error) {
                console.error('Error initializing auth:', error);
                this.loading = false;
            }
        },

        async fetchCsrfToken() {
            try {
                await axios.get('/sanctum/csrf-cookie');
                console.log('CSRF token fetched successfully');
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                throw error;
            }
        },
        
        async fetchStatus() {
            try {
                const response = await axios.get('/subscription-status');
                this.isSubscribed = response.data.subscribed;
                console.log('Subscription status:', response.data);
            } catch (error) {
                console.error('Error fetching subscription status:', error);
                if (error.response?.status === 401) {
                    this.isSubscribed = false;
                    console.log('User not authenticated - treating as not subscribed');
                }
            } finally {
                this.loading = false;
            }
        },
        
        isLocked(path) {
            return this.lockedPaths.includes(path) && !this.isSubscribed;
        },
        
        goTo(route) {
            if (this.isLocked(route)) {
                this.subscribe(route);
            } else {
                window.location.href = route;
            }
        },
        
        subscribe(intendedRoute = '/content') {
            this.intended = intendedRoute;
            const modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
            modal.show();
        },
        
        async checkout() {
            if (this.checkoutLoading) return; // Prevent double clicks
            
            this.checkoutLoading = true;
            
            try {
                console.log('Starting checkout process...');
                
                // Ensure we have fresh CSRF token
                await this.fetchCsrfToken();
                
                // Close the modal first
                const modal = bootstrap.Modal.getInstance(document.getElementById('subscribeModal'));
                if (modal) {
                    modal.hide();
                }
                
                console.log('Creating checkout session with intended route:', this.intended);
                
                const response = await axios.post('/create-checkout-session', {
                    intended: this.intended || '/content'
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
                
                console.log('Checkout session response:', response.data);
                
                if (response.data.id) {
                    const stripeKey = process.env.MIX_STRIPE_KEY || 'pk_test_51QIJkjIol4Q5wn4OOOwjUCTuVO7k49YHuLHsnMGjcOAiKesa3CbihaIRvdsXmXrKCUOxbslT1kWyHhbxFEW4TVzf00Kpk3PNUf';
                    const stripe = await loadStripe(stripeKey);
                    
                    if (!stripe) {
                        throw new Error('Failed to load Stripe');
                    }
                    
                    const { error } = await stripe.redirectToCheckout({
                        sessionId: response.data.id
                    });
                    
                    if (error) {
                        console.error('Stripe redirect error:', error);
                        throw error;
                    }
                } else {
                    throw new Error('No session ID returned from server');
                }
            } catch (error) {
                console.error('Checkout error:', error);
                
                // Re-show the modal if there was an error
                setTimeout(() => {
                    const modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
                    modal.show();
                }, 100);
                
                let errorMessage = 'Error creating checkout session. Please try again.';
                
                if (error.response?.status === 401) {
                    errorMessage = 'Please log in to subscribe.';
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                } else if (error.response?.status === 405) {
                    errorMessage = 'Configuration error. Please contact support.';
                } else if (error.response?.status === 500) {
                    errorMessage = 'Server error. Please try again in a few moments.';
                } else if (error.response?.data?.error) {
                    errorMessage = error.response.data.error;
                }
                
                alert(errorMessage);
            } finally {
                this.checkoutLoading = false;
            }
        }
    }
};