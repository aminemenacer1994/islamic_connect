<template>
  <div id="app" class="container">
    <header class="text-center py-5">
      <h1 class="fw-bold display-5 mb-3">Subscription Management</h1>
      <p class="lead text-muted mx-auto max-w-600">
        Manage your Islamic Connect subscription. Unlock premium features and support our mission.
      </p>
    </header>

    <div class="container pb-5">
      <!-- Success Alert -->
      <div v-if="success" class="alert alert-success alert-dismissible fade show shadow-sm mb-4" role="status">
        <i class="fas fa-check-circle me-2"></i>{{ success }}
        <button type="button" class="btn-close" @click="success = ''" aria-label="Close"></button>
      </div>
      
      <!-- Error Alert -->
      <div v-if="error" class="alert alert-danger alert-dismissible fade show shadow-sm mb-4" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
        <button type="button" class="btn-close" @click="error = ''" aria-label="Close"></button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center my-5 py-5">
        <div class="spinner-border text-teal" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading subscription details...</p>
      </div>

      <!-- Active Subscription View -->
      <div v-else-if="isSubscribed" class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card pricing-card border-0 shadow-lg">
            <div class="featured-badge bg-teal text-white py-2 text-center">
              Active Subscription
            </div>
            <div class="pricing-card-header text-center">
              <div class="pricing-icon mt-3 mx-auto rounded-circle d-flex align-items-center justify-content-center bg-teal">
                <i class="fas fa-check-circle text-white"></i>
              </div>
              <h5 class="card-title mt-3 fw-bold">{{ planDisplayName }}</h5>
              <p class="text-muted mb-2">You're currently subscribed</p>
              <div class="mt-3 p-3 bg-light rounded">
                <p class="mb-0">
                  <strong>{{ subscription?.ends_at ? 'Access until:' : 'Status:' }}</strong>
                </p>
                <p class="text-teal fw-bold fs-5 mb-0">
                  {{ subscription?.ends_at ? formatDate(subscription.ends_at) : 'Active & Unlimited' }}
                </p>
              </div>
            </div>
            <div class="card-body pricing-card-body">
              <ul class="pricing-features list-unstyled mb-4">
                <li class="py-2">
                  <i class="fas fa-check-circle me-2 text-teal"></i>Ad-free experience
                </li>
                <li class="py-2">
                  <i class="fas fa-check-circle me-2 text-teal"></i>Offline access to content
                </li>
                <li class="py-2">
                  <i class="fas fa-check-circle me-2 text-teal"></i>Advanced prayer time settings
                </li>
                <li class="py-2">
                  <i class="fas fa-check-circle me-2 text-teal"></i>Priority support
                </li>
                <li class="py-2">
                  <i class="fas fa-check-circle me-2 text-teal"></i>Early access to new features
                </li>
              </ul>
              <button @click="handleCancelSubscription" 
                class="btn btn-outline-danger w-100 rounded-pill fw-semibold py-2" 
                :disabled="cancelling">
                <i class="fas fa-times-circle me-2"></i>
                {{ cancelling ? 'Cancelling...' : 'Cancel Subscription' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription Plans View -->
      <div v-else>
        <div class="text-center mb-4">
          <h2 class="fw-bold mb-3">Choose Your Plan</h2>
          <p class="text-muted">Select the plan that works best for you</p>
        </div>

        <form method="POST" action="/subscribe" @submit="submitting = true">
          <div class="row row-cols-1 row-cols-md-3 g-4 mb-4">
            <div v-for="plan in plans" :key="plan.value" class="col">
              <div class="card h-100 pricing-card border-0 shadow-lg plan-selector"
                :class="{ 'featured-card': plan.value === selectedPlan }"
                @click="selectedPlan = plan.value">
                <div v-if="plan.featured" class="featured-badge bg-teal text-white py-2 text-center">
                  {{ plan.badge }}
                </div>
                <div class="pricing-card-header text-center">
                  <div class="pricing-icon mt-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                    :class="plan.value === selectedPlan ? 'bg-teal' : ''">
                    <i :class="[plan.icon, plan.value === selectedPlan ? 'text-white' : 'text-teal']"></i>
                  </div>
                  <h5 class="card-title mt-3 fw-bold">{{ plan.name }}</h5>
                  <div class="price-amount">{{ plan.price }}</div>
                  <p class="text-muted mb-0">{{ plan.period }}</p>
                  <p v-if="plan.savings" class="text-success small mt-1 fw-semibold">{{ plan.savings }}</p>
                </div>
                <div class="card-body pricing-card-body d-flex flex-column">
                  <ul class="pricing-features list-unstyled mb-4">
                    <li v-for="feature in plan.features" :key="feature" class="py-2">
                      <i class="fas fa-check-circle me-2 text-teal"></i>{{ feature }}
                    </li>
                  </ul>
                  <div class="form-check mt-auto">
                    <input class="form-check-input" type="radio" 
                      :id="plan.value" 
                      :value="plan.value" 
                      v-model="selectedPlan">
                    <label class="form-check-label fw-semibold" :for="plan.value">
                      Select this plan
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-lg-6">
              <input type="hidden" name="_token" :value="csrfToken">
              <input type="hidden" name="price_lookup_key" :value="selectedPlan">
              <button type="submit" class="btn btn-teal btn-lg w-100 rounded-pill fw-semibold py-3" :disabled="submitting">
                <i class="fas fa-credit-card me-2"></i>
                {{ submitting ? 'Processing...' : 'Continue to Payment' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionComponent',
  data() {
    return {
      csrfToken: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      selectedPlan: 'price_1SDrmPGsDD2PdzHqDOScwoI2',
      loading: true,
      submitting: false,
      cancelling: false,
      error: '',
      success: '',
      isSubscribed: false,
      subscription: null,
      plans: [
        {
          value: 'price_1SDrmPGsDD2PdzHqTgawcJZd',
          name: 'Monthly',
          price: '£1.99',
          period: 'per month',
          icon: 'fas fa-calendar',
          badge: 'Flexible',
          featured: false,
          features: [
            'All premium features',
            'Cancel anytime',
            'Monthly billing',
            '24/7 support'
          ]
        },
        {
          value: 'price_1SDrmPGsDD2PdzHqDOScwoI2',
          name: 'Yearly',
          price: '£18',
          period: 'per year',
          savings: 'Save £5.88 per year',
          icon: 'fas fa-star',
          badge: 'Most Popular',
          featured: true,
          features: [
            'All premium features',
            'Best value',
            'Annual billing',
            'Priority support'
          ]
        },
        {
          value: 'price_1SDrmPGsDD2PdzHqvk1SOoT3',
          name: 'Lifetime',
          price: '£25',
          period: 'one-time payment',
          savings: 'Never pay again',
          icon: 'fas fa-infinity',
          badge: 'Best Deal',
          featured: false,
          features: [
            'All premium features',
            'Lifetime access',
            'One-time payment',
            'VIP support'
          ]
        }
      ],
      planDetails: {
        'price_1SDrmPGsDD2PdzHqTgawcJZd': 'Premium Monthly',
        'price_1SDrmPGsDD2PdzHqDOScwoI2': 'Premium Yearly',
        'price_1SDrmPGsDD2PdzHqvk1SOoT3': 'Premium Lifetime',
      }
    };
  },
  computed: {
    planDisplayName() {
      if (!this.subscription?.stripe_price) return 'Free';
      return this.planDetails[this.subscription.stripe_price] || 'Premium';
    }
  },
  mounted() {
    this.checkUrlParams();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Never';
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },
    
    async fetchSubscriptionStatus() {
      try {
        const response = await fetch('/subscription-status', {
          headers: { 
            'X-CSRF-TOKEN': this.csrfToken,
            'Accept': 'application/json'
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch subscription status');
        
        const data = await response.json();
        this.isSubscribed = data.is_subscribed;
        this.subscription = {
          stripe_price: data.plan !== 'free' ? data.plan : null,
          ends_at: data.ends_at
        };
        
        return data.is_subscribed;
      } catch (err) {
        console.error('Error fetching subscription:', err);
        this.error = 'Error loading subscription status. Please refresh the page.';
        return false;
      }
    },
    
    async waitForSubscription() {
      this.success = 'Subscription successful! Activating your subscription...';
      let attempts = 0;
      const maxAttempts = 15;
      
      const checkStatus = async () => {
        attempts++;
        const subscribed = await this.fetchSubscriptionStatus();
        
        if (subscribed) {
          this.success = 'Subscription activated successfully! Welcome to Premium.';
          this.loading = false;
          setTimeout(() => {
            this.success = '';
          }, 5000);
          return true;
        }
        
        if (attempts >= maxAttempts) {
          this.error = 'Subscription is taking longer than expected. Please refresh the page or contact support.';
          this.success = '';
          this.loading = false;
          return false;
        }
        
        setTimeout(checkStatus, 2000);
        return false;
      };
      
      await checkStatus();
    },
    
    async checkUrlParams() {
      const urlParams = new URLSearchParams(window.location.search);
      
      if (urlParams.has('success')) {
        await this.waitForSubscription();
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.has('cancelled')) {
        this.error = 'Subscription cancelled. You can try again when ready.';
        await this.fetchSubscriptionStatus();
        this.loading = false;
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        await this.fetchSubscriptionStatus();
        this.loading = false;
      }
    },
    
    async handleCancelSubscription() {
      if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
        return;
      }
      
      this.cancelling = true;
      this.error = '';
      
      try {
        const response = await fetch('/cancel', {
          method: 'POST',
          headers: { 
            'X-CSRF-TOKEN': this.csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          await this.fetchSubscriptionStatus();
          this.success = `Subscription cancelled. You'll have access until ${this.formatDate(data.ends_at)}.`;
          setTimeout(() => {
            this.success = '';
          }, 8000);
        } else {
          throw new Error(data.message || 'Failed to cancel subscription');
        }
      } catch (err) {
        console.error('Error cancelling subscription:', err);
        this.error = err.message || 'Error cancelling subscription. Please try again.';
      } finally {
        this.cancelling = false;
      }
    },
    
    handleSubmit(e) {
      this.submitting = true;
      e.target.submit();
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --teal: #35a38b;
  --teal-light: #e0f7f5;
  --teal-dark: #2d8c77;
  --dark: #1e293b;
  --muted: #64748b;
}

.max-w-600 {
  max-width: 600px;
}

.text-teal {
  color: var(--teal) !important;
}

.bg-teal {
  background-color: var(--teal) !important;
  color: white !important;
}

.btn-teal {
  background-color: var(--teal);
  border-color: var(--teal);
  color: white;
  transition: all 0.3s ease;
}

.btn-teal:hover {
  background-color: var(--teal-dark);
  border-color: var(--teal-dark);
  color: white;
}

.pricing-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  background: white;
  position: relative;
  cursor: pointer;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.pricing-card.featured-card {
  transform: scale(1.05);
  box-shadow: 0 25px 50px rgba(53, 163, 139, 0.2) !important;
  border: 2px solid var(--teal) !important;
  z-index: 2;
}

.plan-selector {
  cursor: pointer;
}

.featured-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 1;
}

.pricing-card-header {
  padding: 2rem 2rem 1rem;
  background: #f8fafc;
}

.pricing-card-body {
  padding: 1rem 2rem 2rem;
}

.pricing-icon {
  width: 80px;
  height: 80px;
  background: var(--teal-light);
  color: var(--teal);
  font-size: 2rem;
  transition: all 0.3s ease;
}

.featured-card .pricing-icon {
  background: var(--teal);
  color: white;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 1rem 0 0.5rem;
  color: var(--dark);
}

.pricing-features li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.pricing-features li:last-child {
  border-bottom: none;
}

.spinner-border.text-teal {
  color: var(--teal) !important;
}

@media (max-width: 768px) {
  .pricing-card.featured-card {
    transform: scale(1);
  }
  
  .price-amount {
    font-size: 2rem;
  }
}
</style>