```vue
<template>
  <div id="app" class="subscription-container">
    <!-- Header Section -->
    <header class="subscription-header">
      <div class="container">
        <div class="header-content">
          <h1>Manage Your Islamic Connect Subscription</h1>
          <p>Join a growing global community of Muslims who are deepening their connection to the Qur’an and Islam through knowledge, reflection, and technology. Your subscription helps us build innovative tools for spiritual growth and keep our resources accessible for everyone.</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="subscription-main">
      <div class="container">
        <!-- Notifications -->
        <div v-if="success" class="notification notification-success">
          <i class="fas fa-check-circle"></i>
          <span>{{ success }}</span>
          <button @click="clearNotification" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-if="error" class="notification notification-error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>{{ error }}</span>
          <button @click="clearNotification" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Alert Container -->
        <div id="alertContainer" class="alert-container"></div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Fetching your subscription details, please wait...</p>
        </div>

        <!-- Success Image -->
        <div v-if="showSuccessImage" class="success-image-container">
          <img src="/images/mark1.png" width="100" alt="Subscription Success" class="success-image">
          <p class="success-message">
            Thank you for your support! Your subscription helps sustain Islamic Connect as a free, accessible resource for Muslims worldwide. May Allahﷻ accept your contribution and bless your efforts.
          </p>
          <button @click="showSuccessImage = false" class="btn btn-primary">Start Exploring</button>
        </div>

        <!-- Active Subscription -->
        <div v-if="isSubscribed && !showSuccessImage" class="active-subscription">
          <div class="subscription-card">
            <div class="card-badge">
              <i class="fas fa-crown"></i>
              Active Premium Subscription
            </div>
            <div class="card-header">
              <div class="status-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h2>{{ planDisplayName }}</h2>
              <p class="subtitle">You're enjoying all premium features with your active subscription.</p>
              <div class="status-item">
                <span class="label">Subscription Status</span>
                <span class="value" :style="{ color: canCancel ? '#2c7c6a' : '#6b7280' }">
                  {{ subscriptionStatus }}
                </span>
              </div>
            </div>
            <div class="card-body">
              <h3>Your Premium Benefits</h3>
              <div class="benefits-list">
                <div class="benefit-item" v-for="benefit in getPlanBenefits()" :key="benefit">
                  <i class="fas fa-check"></i>
                  <span>{{ benefit }}</span>
                </div>
              </div>
              <button 
                @click="handleCancelSubscription" 
                class="btn btn-cancel"
                :disabled="cancelling || !canCancel || isCancelled"
                :class="{ 'disabled': !canCancel || isCancelled, 'cancelled': isCancelled }"
                :title="isCancelled ? 'Your subscription is already cancelled' : 'Cancel your subscription (access ends immediately)'"
              >
                <i class="fas fa-times-circle"></i>
                {{ cancelling ? 'Cancelling...' : isCancelled ? 'Subscription Cancelled' : 'Cancel Subscription' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Subscription Plans -->
        <div v-if="showPlans && !showSuccessImage" class="plans-view">
          <div v-if="subscription?.ends_at" class="notification notification-info">
            <i class="fas fa-info-circle"></i>
            <span>Your subscription will end on {{ formatDate(subscription.ends_at) }}. Subscribe to a new plan to continue enjoying premium features and uninterrupted access.</span>
            <button @click="subscription = null" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="plans-header">
            <h2>Choose Your Subscription Plan</h2>
            <p>Select the plan that best suits your needs to unlock premium features and support our mission.</p>
            <div class="billing-toggle" role="tablist" aria-label="Billing cycle">
              <button
                type="button"
                role="tab"
                :aria-selected="billingCycle === 'monthly'"
                class="toggle-option"
                :class="{ active: billingCycle === 'monthly' }"
                @click="setBillingCycle('monthly')"
              >
                Monthly
              </button>
              <button
                type="button"
                role="tab"
                :aria-selected="billingCycle === 'yearly'"
                class="toggle-option"
                :class="{ active: billingCycle === 'yearly' }"
                @click="setBillingCycle('yearly')"
              >
                Yearly
              </button>
              <span class="toggle-indicator" :class="billingCycle"></span>
            </div>
            <!-- <div v-if="billingCycle === 'yearly' && yearlySavings" class="toggle-savings" aria-live="polite">
              <i class="fas fa-tag"></i> {{ yearlySavings }}
            </div> -->
          </div>

          <form method="POST" action="/subscribe" @submit.prevent="handleSubmit">
            <div class="plans-grid">
              <div v-for="plan in filteredPlans" :key="plan.value || plan.name" class="plan-card" :class="{
                'featured': plan.featured,
                'selected': plan.value === selectedPlan
              }" @click="plan.value !== '' ? selectedPlan = plan.value : null">
                <div v-if="plan.featured" class="plan-badge">
                  {{ plan.badge }}
                </div>
                <div class="plan-header">
                  <div class="plan-icon">
                    <i :class="plan.icon"></i>
                  </div>
                  <h2>{{ plan.name }}</h2>
                  <div class="plan-price">
                    <span class="amount">{{ plan.price }}</span>
                    <span class="period">{{ plan.period }}</span>
                  </div>
                  <p v-if="plan.savings" class="savings">{{ plan.savings }}</p>
                  <p class="plan-description">{{ plan.description }}</p>
                </div>
                <div class="plan-features">
                  <div v-for="feature in plan.features" :key="feature" class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>{{ feature }}</span>
                  </div>
                </div>
                <div class="plan-selector">
                  <template v-if="plan.value === ''">
                    <a href="/" class="radio-label btn-get-started">
                      Get Started
                    </a>
                  </template>
                  <template v-else>
                    <input type="radio" :id="plan.value" :value="plan.value" v-model="selectedPlan" class="radio-input">
                    <label :for="plan.value" class="radio-label" :title="'Select the ' + plan.name + ' plan'">
                      {{ plan.value === selectedPlan ? 'Selected' : 'Select Plan' }}
                    </label>
                  </template>
                </div>
              </div>
            </div>
            <div class="payment-section">
              <input type="hidden" name="_token" :value="csrfToken">
              <input type="hidden" name="price_lookup_key" :value="selectedPlan">
              <button type="submit" class="btn btn-primary" :disabled="submitting">
                <i class="fas fa-credit-card"></i>
                {{ submitting ? 'Processing Payment...' : 'Proceed to Secure Payment' }}
              </button>
              <div class="security-note">
                <i class="fas fa-lock"></i>
                Secure payment processing powered by Stripe
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="faq-header">
          <h3>Frequently Asked Questions</h3>
          <p>Find answers to common questions about our subscription plans and features.</p>
        </div>
        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <div class="faq-question" @click="toggleFaq(index)">
              <h4>{{ faq.question }}</h4>
              <i class="fas fa-chevron-down" :class="{ 'open': faq.open }"></i>
            </div>
            <div v-if="faq.open" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Confirmation Modal -->
    <div class="modal fade" id="cancelConfirmationModal" tabindex="-1" aria-labelledby="cancelConfirmationLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cancelConfirmationLabel">Confirm Subscription Cancellation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to cancel your subscription? Your premium access will end immediately, and you will lose access to exclusive features.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="cancelDismiss">No, Keep My Subscription</button>
            <button type="button" class="btn btn-primary" id="confirmCancel">Yes, Cancel Subscription</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SubscriptionComponent',

  data() {
    return {
      csrfToken: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      selectedPlan: (window.appConfig?.stripePrices?.monthly) || 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
      billingCycle: 'monthly',
      loading: true,
      submitting: false,
      cancelling: false,
      error: '',
      success: '',
      isAuthenticated: true,
      isSubscribed: false,
      subscription: null,
      showSuccessImage: false,
      isCancelled: false,
      debugInfo: true,
      faqs: [
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time through this page. Once cancelled, your access to premium features will end immediately, and you will revert to the free tier. No further charges will be applied.',
          open: false
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit and debit cards, including Visa, MasterCard, and American Express, processed securely through Stripe. Additional payment methods may be available depending on your region.',
          open: false
        },
        {
          question: 'Is there a free trial available?',
          answer: 'While we don’t offer a free trial, our Basic plan is free forever and includes core features. You can upgrade to a premium plan at any time to access advanced features and support our mission.',
          open: false
        },
        {
          question: 'What happens if I cancel my subscription?',
          answer: 'Upon cancellation, your access to premium features will end immediately. You’ll retain access to the Basic plan’s features. If you choose to resubscribe later, you can select a new plan without any penalties.',
          open: false
        },
        {
          question: 'Can I switch between plans?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the change takes effect immediately. If you downgrade, the new plan will apply at the start of your next billing cycle.',
          open: false
        }
      ],
      plans: [
        {
          value: '',
          name: 'Basic',
          price: '£0',
          period: '',
          icon: 'fas fa-moon',
          badge: 'Free Forever',
          featured: false,
          description: 'Full access to all core Islamic resources — no payment required.',
          features: [
            'Quran with audio recitation and translation',
            'Quran history',
            'Names of Allah',
            'Image gallery',
            'Dua collection',
            'Prayer times',
          ]
        },
        {
          value: (window.appConfig?.stripePrices?.monthly) || 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
          name: 'Monthly',
          price: '£1.99',
          period: ' per month',
          icon: 'fas fa-star',
          badge: 'Most Popular',
          featured: true,
          description: 'Unlock powerful tools that help you learn, reflect, and stay inspired every day.',
          features: [
            'All of the basic features',
            'Quran with Smart Search & Accessibility',
            'Audio podcasts',
            'Reciters station',
            'Islamic directory video channels',
            'Short form video gallery',
            'Seerah timeline',
            'Islamic guides',
            'Interactive zakat calculator',
            'Qibla finder',
            'Islamic services',
          ]
        },
        {
          value: (window.appConfig?.stripePrices?.yearly) || 'price_1SKJCyGsDD2PdzHq4qsR1TRh',
          name: 'Yearly',
          price: '£17.99',
          period: 'per year',
          icon: 'fas fa-infinity',
          badge: 'Best Deal',
          savings: 'Save £5.89',
          featured: false,
          description: 'Best value for those dedicated to lifelong learning, enjoy all Monthly benefits at a discounted rate.',
          features: [
            'All of the basic features',
            'Quran with Smart Search & Accessibility',
            'Audio podcasts',
            'Reciters station',
            'Islamic directory video channels',
            'Short form video gallery',
            'Seerah timeline',
            'Islamic guides',
            'Interactive zakat calculator',
            'Qibla finder',
            'Islamic services',
          ]
        }
      ],
      planDetails: (() => {
        const ids = window.appConfig?.stripePrices || {};
        return {
          [ids.monthly || 'price_1SKJCyGsDD2PdzHqUEaWiQkG']: 'Premium Monthly',
          [ids.yearly || 'price_1SKJCyGsDD2PdzHq4qsR1TRh']: 'Premium Yearly',
        };
      })()
    };
  },

  computed: {
    filteredPlans() {
      const base = this.plans.find(p => p.value === '')
      const premium = this.plans.find(p => this.billingCycle === 'monthly' ? p.name === 'Monthly' : p.name === 'Yearly')
      return [base, premium].filter(Boolean)
    },
    yearlySavings() {
      const yearly = this.plans.find(p => p.name === 'Yearly')
      return yearly?.savings || ''
    },
    planDisplayName() {
      return this.subscription?.stripe_price && this.planDetails[this.subscription.stripe_price] 
        ? this.planDetails[this.subscription.stripe_price] 
        : 'Free';
    },

    canCancel() {
      const currentDate = new Date();
      const endsAtDate = this.subscription?.ends_at ? new Date(this.subscription.ends_at) : null;
      return endsAtDate ? endsAtDate > currentDate && !this.isCancelled : !this.isCancelled;
    },

    showPlans() {
      return !this.isSubscribed;
    },

    subscriptionStatus() {
      if (!this.isSubscribed) return 'Free';
      const endsAtDate = this.subscription?.ends_at ? new Date(this.subscription.ends_at) : null;
      const currentDate = new Date();
      return endsAtDate && endsAtDate <= currentDate ? 'Cancelled' : 'Active & Unlimited';
    },

    isCancelled() {
      return this.isCancelled || (this.subscription?.ends_at && new Date(this.subscription.ends_at) > new Date() && this.success.includes('Subscription canceled'));
    }
  },

  mounted() {
    this.checkSubscriptionStatus();
    this.checkUrlParams();

    // Initialize billing cycle to monthly (no persistence)
    this.setBillingCycle('monthly');

    if (window.flashError) {
      this.error = window.flashError;
      delete window.flashError;
    }
    if (window.flashSuccess) {
      this.success = window.flashSuccess;
      delete window.flashSuccess;
    }
  },

  methods: {
    setBillingCycle(cycle) {
      if (cycle === this.billingCycle) return;
      this.billingCycle = cycle;
      const target = this.plans.find(p => cycle === 'monthly' ? p.name === 'Monthly' : p.name === 'Yearly');
      if (this.selectedPlan !== '' && target && this.selectedPlan !== target.value) {
        this.selectedPlan = target.value;
      }
    },
    formatDate(dateString) {
      return dateString 
        ? new Date(dateString).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }) 
        : 'Never';
    },

    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },

    async checkAuthentication() {
      try {
        const response = await axios.get('/user', {
          headers: { 
            'X-CSRF-TOKEN': this.csrfToken, 
            'Accept': 'application/json' 
          }
        });
        this.isAuthenticated = !!response.data;
      } catch (error) {
        console.error('Authentication error:', error);
        // Avoid setting error on initial load
      }
    },

    async fetchSubscriptionStatus() {
      try {
        const response = await fetch('/subscription-status', {
          headers: { 
            'X-CSRF-TOKEN': this.csrfToken, 
            'Accept': 'application/json' 
          }
        });
        if (response.status === 401) {
          this.isSubscribed = false;
          this.subscription = null;
          this.isCancelled = false;
          this.loading = false;
          return false;
        }
        if (!response.ok) throw new Error('Failed to load subscription details');
        const data = await response.json();
        if (data.is_subscribed !== undefined && data.plan !== undefined) {
          this.isSubscribed = data.is_subscribed;
          this.subscription = data.is_subscribed ? { stripe_price: data.plan, ends_at: data.ends_at } : null;
          this.isCancelled = data.is_subscribed && data.ends_at && new Date(data.ends_at) > new Date();
        } else {
          this.isSubscribed = false;
          this.subscription = null;
          this.isCancelled = false;
        }
        this.loading = false;
        return data.is_subscribed;
      } catch (err) {
        console.error('Error loading subscription:', err);
        this.isSubscribed = false;
        this.subscription = null;
        this.isCancelled = false;
        this.loading = false;
        return false;
      }
    },

    async checkSubscriptionStatus() {
      this.loading = true;
      await this.fetchSubscriptionStatus();
    },

    async checkUrlParams() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('success')) {
        this.isAuthenticated = true;
        const subscribed = await this.fetchSubscriptionStatus();
        if (subscribed) {
          this.showSuccessImage = true;
          this.success = 'Your premium subscription is now active! Explore your exclusive features now.';
          setTimeout(() => this.success = '', 5000);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.has('cancelled')) {
        await this.fetchSubscriptionStatus();
        this.success = 'Your subscription has been cancelled. You can resubscribe anytime to regain premium access.';
        setTimeout(() => this.success = '', 5000);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        await this.fetchSubscriptionStatus();
      }
    },

    async waitForSubscription() {
      let attempts = 0;
      const maxAttempts = 15;
      while (attempts < maxAttempts) {
        attempts++;
        const subscribed = await this.fetchSubscriptionStatus();
        if (subscribed) {
          this.showSuccessImage = true;
          this.success = 'Premium subscription activated successfully! Start exploring your benefits.';
          setTimeout(() => this.success = '', 5000);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      this.error = 'Subscription activation is taking longer than expected. Please refresh the page or contact our support team.';
      this.success = '';
    },

    clearNotification() {
      this.error = '';
      this.success = '';
    },

    getPlanBenefits() {
      const plan = this.plans.find(p => p.value === this.subscription?.stripe_price);
      return plan ? plan.features : ['Basic access to core features'];
    },

    async handleCancelSubscription() {
      const modal = new bootstrap.Modal(document.getElementById('cancelConfirmationModal'));
      modal.show();
      document.getElementById('confirmCancel').onclick = async () => {
        modal.hide();
        this.cancelling = true;
        try {
          const response = await fetch('/cancel', {
            method: 'POST',
            headers: { 
              'X-CSRF-TOKEN': this.csrfToken, 
              'Accept': 'application/json', 
              'Content-Type': 'application/json' 
            }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            this.isCancelled = true;
            await this.fetchSubscriptionStatus();
            this.success = 'Your subscription has been successfully cancelled. Access to premium features has ended.';
            setTimeout(() => this.success = '', 5000);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (data.message && data.message.includes('canceled subscription')) {
            this.isCancelled = true;
            await this.fetchSubscriptionStatus();
            this.success = 'Your subscription is already cancelled. No further action is needed.';
            setTimeout(() => this.success = '', 5000);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            throw new Error(data.message || 'Failed to cancel your subscription.');
          }
        } catch (err) {
          this.error = err.message || 'An error occurred while cancelling your subscription. Please try again or contact support.';
        } finally {
          this.cancelling = false;
        }
      };
      document.getElementById('cancelDismiss').onclick = () => modal.hide();
    },

    showAlert(type, message) {
      const alertContainer = document.getElementById('alertContainer');
      if (!alertContainer) return;

      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.setAttribute('role', 'alert');
      alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertContainer.appendChild(alertDiv);

      setTimeout(() => {
        const alertInstance = bootstrap.Alert.getOrCreateInstance(alertDiv);
        alertInstance.close();
      }, 8000);
    },

    async waitForCancellationUpdate() {
      let attempts = 0;
      const maxAttempts = 10;
      while (attempts < maxAttempts) {
        await this.fetchSubscriptionStatus();
        const endsAtDate = this.subscription?.ends_at ? new Date(this.subscription.ends_at) : null;
        const currentDate = new Date();
        if (!endsAtDate || endsAtDate <= currentDate) {
          return;
        }
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    },

    async handleSubmit() {
      this.submitting = true;
      this.error = '';
      this.success = '';

      try {
        const csrfToken = document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute('content');

        if (!csrfToken) {
          throw new Error('Session expired. Please refresh the page to continue.');
        }

        const response = await fetch('/subscribe', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({ price_lookup_key: this.selectedPlan })
        });

        // Handle unauthorized or login redirects explicitly
        if (response.redirected || response.status === 401) {
          this.error = 'Please log in to proceed to checkout.';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Safely parse JSON only when appropriate
        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (response.ok && data?.redirect) {
          window.location.href = data.redirect;
          return;
        }

        if (data?.errors) {
          this.error = Object.values(data.errors).flat().join(' ');
        } else if (data?.message) {
          this.error = data.message;
        } else {
          this.error = 'An error occurred during payment processing. Please try again.';
        }

        // Ensure the user sees the error at the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        this.error =
          error.message || 'A network error occurred. Please check your connection and try again.';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        this.submitting = false;
      }
    }
  },

  watch: {
    error(newVal) {
      if (newVal) setTimeout(() => this.error = '', 5000);
    },

    subscription: {
      handler(newVal) {
        console.log('watch - Subscription updated:', JSON.stringify(newVal, null, 2));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.subscription-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f9fafb 0%, #f1f5f9 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1f2937;
}

.container {
  margin: 0 auto;
  padding: 0 16px;
}

.subscription-header {
  padding: 48px 0 32px;
  text-align: center;
  background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
}

.header-content h1 {
  font-size: 2.75rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 12px;
  line-height: 1.2;
}

.header-content p {
  font-size: 1.125rem;
  color: #4b5563;
  max-width: 1140px;
  margin: 0 auto;
  line-height: 1.75;
}

.subscription-main {
  padding: 48px 0;
}

/* Billing cycle segmented toggle */
.billing-toggle {
  position: relative;
  display: inline-flex;
  background: #f3f4f6;
  border-radius: 9999px;
  padding: 6px;
  gap: 8px;
  margin-top: 12px;
  box-shadow: inset 0 0 0 1px #e5e7eb;
}

.billing-toggle .toggle-option {
  position: relative;
  z-index: 1;
  border: none;
  background: transparent;
  padding: 10px 18px;
  border-radius: 9999px;
  font-weight: 600;
  /* color: #374151; */
  cursor: pointer;
  transition: color 200ms ease;
}

.billing-toggle .toggle-option.active {
  color: #ffffff;
}

.billing-toggle .toggle-indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: calc(50% - 6px);
  border-radius: 9999px;
  background: #4b5563;
  transition: transform 260ms ease, background-color 260ms ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.billing-toggle .toggle-indicator.monthly {
  transform: translateX(0);
  background: #2c7c6a;
}

.billing-toggle .toggle-indicator.yearly {
  transform: translateX(100%);
  background: #2c7c6a; /* match monthly green */
}

.toggle-savings {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-weight: 600;
  color: #2c7c6a;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 6px 10px;
  border-radius: 9999px;
}

.notification {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  gap: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.notification-success {
  background: #dcfce7;
  border: 1px solid #86efac;
  color: #166534;
}

.notification-error {
  background: #fef2f2;
  border: 1px solid #f87171;
  color: #991b1b;
}

.notification-info {
  background: #e0f2fe;
  border: 1px solid #7dd3fc;
  color: #1e40af;
}

.notification i {
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  font-size: 1.25rem;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.alert-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  width: 320px;
}

.loading-state {
  text-align: center;
  padding: 64px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2c7c6a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

.loading-state p {
  color: #4b5563;
  font-size: 1rem;
  font-weight: 500;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.active-subscription {
  max-width: 640px;
  margin: 0 auto;
}

.subscription-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.subscription-card:hover {
  transform: translateY(-4px);
}

.card-badge {
  background: linear-gradient(45deg, #2c7c6a, #34d399);
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.card-header {
  padding: 32px 24px;
  text-align: center;
  background: #f9fafb;
}

.status-icon {
  width: 72px;
  height: 72px;
  background: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #2c7c6a;
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.card-header:hover .status-icon {
  transform: scale(1.05);
}

.card-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.subtitle {
  color: #4b5563;
  font-size: 1rem;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.value {
  font-size: 1.25rem;
  font-weight: 600;
}

.card-body {
  padding: 24px;
}

.card-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
  text-align: center;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s ease;
}

.benefit-item:hover {
  background: #f9fafb;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-item i {
  color: #2c7c6a;
  font-size: 1rem;
}

.benefit-item span {
  color: #374151;
  font-size: 0.9375rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(45deg, #2c7c6a, #34d399);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(45deg, #256355, #2bb880);
  transform: translateY(-2px);
}

.btn-cancel {
  background: #dc2626;
  color: white;
}

.btn-cancel:hover:not(.disabled):not(.cancelled) {
  background: #b91c1c;
  transform: translateY(-2px);
}

.btn-cancel.disabled {
  background: #d1d5db;
  color: #374151;
  cursor: not-allowed;
}

.btn-cancel.cancelled {
  background: #6b7280;
  color: white;
  cursor: default;
}

.success-image-container {
  text-align: center;
  padding: 48px 0;
  max-width: 480px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

.success-image {
  max-width: 80px;
  height: auto;
  margin-bottom: 16px;
}

.success-message {
  color: #4b5563;
  font-size: 1.125rem;
  margin-bottom: 24px;
  line-height: 1.5;
}

.plans-view {
  max-width: 1200px;
  margin: 0 auto;
}

.plans-header {
  text-align: center;
  margin-bottom: 32px;
}

.plans-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.plans-header p {
  color: #4b5563;
  font-size: 1.125rem;
  max-width: 640px;
  margin: 0 auto;
}

.plans-grid {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

/* 🔑 KEY FIX: Make cards stop at the button */
.plan-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: auto;
 
}

.plan-card:hover {
  border-color: #2c7c6a;
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.plan-card.selected {
  border-color: #2c7c6a;
  background: #f0fdfa;
}

.plan-card.featured {
  border-color: #2c7c6a;
  background: linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%);
  transform: scale(1.03);
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #2c7c6a, #34d399);
  color: white;
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plan-header {
  text-align: center;
  margin-bottom: 24px;
}

.plan-icon {
  width: 56px;
  height: 56px;
  background: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: #2c7c6a;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.plan-card:hover .plan-icon {
  transform: scale(1.1);
}

.plan-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.plan-price {
  margin-bottom: 8px;
}

.amount {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
}

.period {
  color: #6b7280;
  font-size: 0.9375rem;
}

.savings {
  color: #059669;
  font-weight: 600;
  font-size: 0.875rem;
}

.plan-description {
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
}

.plan-features {
  margin-bottom: 12px;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-item i {
  color: #2c7c6a;
  font-size: 0.9375rem;
}

.feature-item span {
  color: #374151;
  font-size: 0.875rem;
}

/* 🔑 KEY FIX: Push selector to bottom and prevent extra space */
.plan-selector {
  margin-top: auto;
  padding-bottom: 0;
}

.plan-selector .radio-label,
.plan-selector .btn-get-started {
  margin-bottom: 0;
}

.radio-input {
  display: none;
}

.radio-label {
  display: block;
  text-align: center;
  padding: 12px 16px;
  background: linear-gradient(45deg, #2c7c6a, #34d399);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-label:hover {
  background: linear-gradient(45deg, #256355, #2bb880);
  transform: translateY(-2px);
}

.plan-card.selected .radio-label {
  background: linear-gradient(45deg, #256355, #2bb880);
}

.payment-section {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 16px;
}

.faq-section {
  background: #ffffff;
  padding: 64px 0;
  border-top: 1px solid #e5e7eb;
}

.faq-header {
  text-align: center;
  margin-bottom: 40px;
}

.faq-header h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.faq-header p {
  color: #4b5563;
  font-size: 1rem;
  max-width: 640px;
  margin: 0 auto;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s ease;
}

.faq-item:hover {
  background: #f9fafb;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  cursor: pointer;
  gap: 16px;
}

.faq-question h4 {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.faq-question i {
  color: #6b7280;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.faq-question i.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding-bottom: 20px;
  animation: slideDown 0.3s ease;
}

.faq-answer p {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

/* Animations
-------------------------------------------------- */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    height: 0;
  }

  to {
    opacity: 1;
    height: auto;
  }
}

@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2.25rem;
  }

  .header-content p {
    font-size: 1rem;
  }

  .plans-grid {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 16px;
  }

  .plan-card.featured {
    transform: scale(1);
  }

  .card-header,
  .card-body {
    padding: 20px;
  }

  .plan-card {
    padding: 20px;
  }

  .alert-container {
    width: 90%;
    right: 5%;
  }

  .plan-description {
    font-size: 0.8125rem;
  }
}
</style>
