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
      error: null,
      stripe: null
    };
  },

  mounted() {
    // Initialize Stripe
    this.stripe = Stripe(
      process.env.VUE_APP_STRIPE_KEY ||
      'pk_test_51QIJkjIol4Q5wn4OOOwjUCTuVO7k49YHuLHsnMGjcOAiKesa3CbihaIRvdsXmXrKCUOxbslT1kWyHhbxFEW4TVzf00Kpk3PNUf'
    );
  },

  methods: {
    async fetchSubscriptionStatus(forceRefresh = false) {
      try {
        console.log('Fetching subscription status...', forceRefresh ? '(forced)' : '');
        
        const token = localStorage.getItem('sanctum_token');
        if (!token) {
          console.log('No token found, setting subscribed to false');
          this.subscribed = false;
          this.subscriptionInfo = null;
          this.user = null;
          return;
        }

        // Add cache busting parameter if forcing refresh
        const url = forceRefresh 
          ? `/subscription/status?_t=${Date.now()}`
          : '/subscription/status';

        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Authorization': 'Bearer ' + token
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Subscription status response:', data);
          
          this.subscribed = data.subscribed;
          this.subscriptionInfo = data.subscription_info || null;
          this.user = data.user || null;
          
          emitter.emit('subscription-updated', this.subscribed);
          
          console.log('Updated subscription status:', {
            subscribed: this.subscribed,
            hasActiveSubscription: this.hasActiveSubscription()
          });
        } else if (response.status === 401) {
          console.log('Unauthorized, clearing subscription data');
          this.subscribed = false;
          this.subscriptionInfo = null;
          this.user = null;
        } else {
          console.error('Failed to fetch subscription status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch subscription status:', error);
        this.subscribed = false;
        this.subscriptionInfo = null;
        this.user = null;
      }
    },

    // Alias for backward compatibility
    async fetchStatus(forceRefresh = false) {
      return this.fetchSubscriptionStatus(forceRefresh);
    },

    hasActiveSubscription() {
      return this.subscribed && (!this.subscriptionInfo || this.subscriptionInfo.active !== false);
    },

    isLocked(path) {
      const premiumPaths = ['/content', '/streaming'];
      if (!premiumPaths.includes(path)) return false;
      
      const locked = !this.hasActiveSubscription();
      console.log(`Path ${path} locked:`, locked, 'hasActiveSubscription:', this.hasActiveSubscription());
      return locked;
    },

    goTo(path) {
      if (this.isLocked(path)) {
        console.log('Access denied for path:', path);
        return;
      }
      console.log('Navigating to:', path);
      window.location.href = path;
    }
  },

  async created() {
    // Fetch subscription status immediately
    await this.fetchSubscriptionStatus();

    // Listen for updates
    emitter.on('subscription-updated', (subscribed) => {
      this.subscribed = subscribed;
    });
  },

  beforeUnmount() {
    emitter.off('subscription-updated');
  }
};