import axios from 'axios';
import mitt from 'mitt';

// Create a global event bus
const emitter = mitt();

export default {
    data() {
        return {
            subscribed: false,
            subscriptionInfo: null,
        };
    },
    methods: {
        async fetchStatus(force = false) {
            if (force) {
                this.subscribed = false; // Reset state
            }
            try {
                const response = await axios.get('/subscription-status', {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                });
                this.subscribed = response.data.subscribed;
                this.subscriptionInfo = response.data.subscription_info;
                console.log('Subscription status fetched:', response.data);
                emitter.emit('subscription-updated', this.subscribed); // Emit event using mitt
            } catch (error) {
                console.error('Error fetching subscription status:', error);
                this.subscribed = false;
                this.subscriptionInfo = null;
            }
        },
        isLocked(path) {
            const premiumPaths = ['/content', '/streaming'];
            if (!premiumPaths.includes(path)) {
                return false;
            }
            return !this.subscribed || (this.subscriptionInfo && !this.subscriptionInfo.active);
        },
        goTo(path) {
            window.location.href = path;
        },
        async subscribe(path) {
            try {
                const response = await axios.post('/create-checkout-session', {
                    intended: path,
                }, {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                });
                window.location.href = response.data.checkout_url;
            } catch (error) {
                console.error('Error initiating subscription:', error);
                throw error;
            }
        },
    },
};