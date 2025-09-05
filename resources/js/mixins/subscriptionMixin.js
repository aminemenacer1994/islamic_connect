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
    async fetchSubscriptionStatus() {
      try {
        const response = await fetch('/subscription/status', {
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Authorization': 'Bearer ' + localStorage.getItem('sanctum_token')
          }
        });

        if (response.ok) {
          const data = await response.json();
          this.subscribed = data.subscribed;
          this.subscriptionInfo = data.subscription_info || null;
          this.user = data.user || null;
          emitter.emit('subscription-updated', this.subscribed);
        } else if (response.status === 401) {
          this.subscribed = false;
          this.subscriptionInfo = null;
          this.user = null;
        }
      } catch (error) {
        console.error('Failed to fetch subscription status:', error);
        this.subscribed = false;
        this.subscriptionInfo = null;
        this.user = null;
      }
    },

    hasActiveSubscription() {
      return this.subscribed && (!this.subscriptionInfo || this.subscriptionInfo.active !== false);
    },

    isLocked(path) {
      const premiumPaths = ['/content', '/streaming'];
      if (!premiumPaths.includes(path)) return false;
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
