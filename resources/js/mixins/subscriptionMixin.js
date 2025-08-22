import { loadStripe } from '@stripe/stripe-js';

export default {
    data() {
        return {
            isSubscribed: false,
            lockedPaths: ['/content', '/streaming'],
            intended: '',
            stripe: null,
            showSuccessMessage: false,
        };
    },
    async mounted() {
        this.fetchCsrfToken();
        this.stripe = await loadStripe(document.querySelector('meta[name="stripe-key"]').content);
        await this.fetchStatus(); // Ensure async call
        window.addEventListener('focus', this.fetchStatus);
    },
    destroyed() {
        window.removeEventListener('focus', this.fetchStatus);
    },
    methods: {
        fetchCsrfToken() {
            return axios.get('/sanctum/csrf-cookie');
        },
        async fetchStatus() {
            try {
                const response = await axios.get('/subscription-status', { // Changed from '/api/subscription-status'
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('sanctum_token') || ''}`,
                        'Accept': 'application/json',
                    },
                });
                this.isSubscribed = response.data.subscribed;
                this.showSuccessMessage = false;
            } catch (error) {
                console.error('Error fetching subscription status:', error);
            }
        },
        isLocked(path) {
            return this.lockedPaths.includes(path) && !this.isSubscribed;
        },
        goTo(path) {
            window.location.href = path;
        },
        subscribe(path) {
            this.intended = path;
            new bootstrap.Modal(document.getElementById('subscribeModal')).show();
        },
        async checkout() {
            if (!this.stripe) {
                console.error('Stripe not loaded');
                return;
            }
            try {
                const response = await axios.post('/create-checkout-session', 
                    { intended: this.intended }, 
                    { 
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('sanctum_token') || ''}`,
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    }
                );
                await this.stripe.redirectToCheckout({ sessionId: response.data.id });
            } catch (error) {
                console.error('Checkout error:', error);
                alert('Failed to initiate checkout. Please try again.');
            }
        },
        handleCheckoutSuccess() {
            this.showSuccessMessage = true;
            setTimeout(() => {
                this.showSuccessMessage = false;
                window.location.href = '/';
            }, 5000);
        },
    },
    watch: {
        '$route': 'fetchStatus',
    },
};