// subscriptionMixin.js
import mitt from 'mitt';

const emitter = mitt();

export default {
    data() {
        return {
            subscribed: false,
            subscriptionInfo: null,
            user: null,
            loading: false,
            error: null
        }
    },

    methods: {
        async fetchStatus(force = false) {
            if (force) {
                this.subscribed = false;
            }

            try {
                const token = localStorage.getItem('sanctum_token') ||
                    document.querySelector('meta[name="api-token"]')?.content;

                const headers = {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch('/subscription/status', { headers });  // Updated to web route

                if (response.ok) {
                    const data = await response.json();
                    this.subscribed = data.subscribed;
                    this.subscriptionInfo = data.subscription_info;
                    this.user = data.user;

                    console.log('Subscription status fetched:', data);
                    emitter.emit('subscription-updated', this.subscribed);
                } else if (response.status === 401) {
                    console.log('User not authenticated');
                    this.subscribed = false;
                    this.subscriptionInfo = null;
                    this.user = null;
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }

            } catch (error) {
                console.error('Error fetching subscription status:', error);
                this.subscribed = false;
                this.subscriptionInfo = null;
                this.user = null;
            }
        },

        hasActiveSubscription() {
            return this.subscribed && this.subscriptionInfo?.active;
        },

        isLocked(path) {
            const premiumPaths = ['/content', '/streaming'];
            if (!premiumPaths.includes(path)) {
                return false;
            }
            return !this.hasActiveSubscription();
        },

        goTo(path) {
            if (this.isLocked(path)) {
                console.log('Access denied for path:', path);
                return;
            }
            window.location.href = path;
        }
    },

    created() {
        // Check authentication and fetch status
        const token = localStorage.getItem('sanctum_token');
        if (token) {
            this.fetchStatus(true);
        } else {
            this.subscribed = false;
        }

        // Listen for subscription updates
        emitter.on('subscription-updated', (subscribed) => {
            this.subscribed = subscribed;
        });
    },

    beforeUnmount() {
        emitter.off('subscription-updated');
    }
}