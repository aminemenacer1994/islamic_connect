<template>
  <div id="app" class="subscription-container">
    <!-- Header Section -->
    <header class="subscription-header">
      <div class="container">
        <div class="header-content">
          <h1>Subscription Management</h1>
          <p>Manage your Islamic Connect subscription. Unlock premium features and support our mission.</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="subscription-main">
      <div class="container">
        <!-- Notifications -->
        <div v-if="success" class="notification success">
          <i class="fas fa-check-circle"></i>
          <span>{{ success }}</span>
          <button @click="success = ''" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-if="error" class="notification error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>{{ error }}</span>
          <button @click="error = ''" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading subscription details...</p>
        </div>

        <!-- Successful Subscription Image -->
        <div v-if="showSuccessImage" class="success-image-container">
          <img src="/images/subscription-success.jpg" alt="Subscription Success" class="success-image">
          <p class="success-message">Thank you for subscribing! Enjoy your premium features.</p>
          <button @click="showSuccessImage = false" class="btn btn-primary">Continue</button>
        </div>

        <!-- Active Subscription View -->
        <div v-if="isSubscribed && !showSuccessImage" class="active-subscription">
          <div class="subscription-card">
            <div class="card-badge">
              <i class="fas fa-crown"></i>
              Active Subscription
            </div>

            <div class="card-header">
              <div class="status-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h2>{{ planDisplayName }}</h2>
              <p class="subtitle">You're currently subscribed</p>

              <div class="status-item">
                <span class="label">Status</span>
                <span class="value" :style="{ color: canCancel ? '#35a38b' : '#9ca3af' }">
                  {{ subscriptionStatus }}
                </span>
              </div>
            </div>

            <div class="card-body">
              <h3>Premium Benefits</h3>
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
                :class="{ 'disabled': !canCancel || isCancelled, 'cancelled': isCancelled }">
                <i class="fas fa-times-circle"></i>
                {{ cancelling ? 'Cancelling...' : isCancelled ? 'Subscription Cancelled' : 'Cancel Subscription' }}
              </button>
            </div>
          </div>
        </div>


        <!-- Subscription Plans View -->
        <div v-if="showPlans && !showSuccessImage" class="plans-view">
          <div v-if="subscription?.ends_at" class="notification" style="background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1; margin-bottom: 32px;">
            <i class="fas fa-info-circle"></i>
            <span>Your subscription ends on {{ formatDate(subscription.ends_at) }}. Subscribe again to continue enjoying premium features after this date.</span>
            <button @click="subscription = null" class="close-btn" style="color: #0369a1;">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="plans-header">
            <h2>Choose Your Plan</h2>
            <p>Select the plan that works best for you</p>
          </div>

          <form method="POST" action="/subscribe" @submit.prevent="handleSubmit">
            <div class="plans-grid">
              <div v-for="plan in plans" :key="plan.value" class="plan-card" :class="{
                'featured': plan.featured,
                'selected': plan.value === selectedPlan
              }" @click="selectedPlan = plan.value">
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
                </div>

                <div class="plan-features">
                  <div v-for="feature in plan.features" :key="feature" class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>{{ feature }}</span>
                  </div>
                </div>

                <div class="plan-selector">
                  <input type="radio" :id="plan.value" :value="plan.value" v-model="selectedPlan" class="radio-input">
                  <label :for="plan.value" class="radio-label">
                    {{ plan.value === selectedPlan ? 'Selected' : 'Select Plan' }}
                  </label>
                </div>
              </div>
            </div>

            <div class="payment-section">
              <input type="hidden" name="_token" :value="csrfToken">
              <input type="hidden" name="price_lookup_key" :value="selectedPlan">

              <button type="submit" class="btn btn-primary" :disabled="submitting">
                <i class="fas fa-credit-card"></i>
                {{ submitting ? 'Processing...' : 'Continue to Payment' }}
              </button>

              <div class="security-note">
                <i class="fas fa-lock"></i>
                Secure payment powered by Stripe
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
  </div>
</template>
<script>
import axios from 'axios';

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
      isAuthenticated: true, // Forced to true for testing
      isSubscribed: false, // Will be set by fetch
      subscription: null,
      showSuccessImage: false,
      isCancelled: false,
      debugInfo: true, // Enable debug info for troubleshooting
      faqs: [
        { question: 'Can I cancel my subscription anytime?', answer: 'Yes, you can cancel at any time. You’ll keep access until the end of your current billing period.', open: false },
        { question: 'What payment methods do you accept?', answer: 'We accept major credit and debit cards through Stripe.', open: false },
        { question: 'Is there a free trial available?', answer: 'There’s no free trial, but a free tier is available. Upgrade anytime.', open: false }
      ],
      plans: [
        { value: 'price_1SDrmPGsDD2PdzHqTgawcJZd', name: 'Monthly', price: '£1.99', period: 'per month', icon: 'fas fa-calendar-alt', badge: 'Flexible', featured: false, features: ['Ad-free experience', 'Offline content', 'Advanced prayer settings', '24/7 support'] },
        { value: 'price_1SDrmPGsDD2PdzHqDOScwoI2', name: 'Yearly', price: '£18', period: 'per year', savings: 'Save £5.88 annually', icon: 'fas fa-star', badge: 'Most Popular', featured: true, features: ['Ad-free experience', 'Offline content', 'Advanced prayer settings', 'Priority support'] },
        { value: 'price_1SDrmPGsDD2PdzHqvk1SOoT3', name: 'Lifetime', price: '£25', period: 'one-time', savings: 'Never pay again', icon: 'fas fa-infinity', badge: 'Best Value', featured: false, features: ['Ad-free experience', 'Offline content', 'Advanced prayer settings', 'VIP support'] }
      ],
      planDetails: {
        'price_1SDrmPGsDD2PdzHqTgawcJZd': 'Premium Monthly',
        'price_1SDrmPGsDD2PdzHqDOScwoI2': 'Premium Yearly',
        'price_1SDrmPGsDD2PdzHqvk1SOoT3': 'Premium Lifetime'
      }
    };
  },
  computed: {
    planDisplayName() {
      return this.subscription?.stripe_price ? this.planDetails[this.subscription.stripe_price] || 'Premium' : 'Free';
    },
    canCancel() {
      const currentDate = new Date();
      const endsAtDate = this.subscription?.ends_at ? new Date(this.subscription.ends_at) : null;
      const canCancelValue = endsAtDate ? endsAtDate > currentDate : true;
      console.log('canCancel check - ends_at:', endsAtDate?.toISOString(), 'currentDate:', currentDate.toISOString(), 'canCancel:', canCancelValue, 'isCancelled:', this.isCancelled);
      return canCancelValue && !this.isCancelled;
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
    this.checkAuthentication();

    if (window.flashError) {
      this.error = window.flashError;
      delete window.flashError;
    }
    if (window.flashSuccess) {
      this.success = window.flashSuccess;
      delete window.flashSuccess;
    }
  },
  mounted() {
    this.checkSubscriptionStatus();
    this.checkUrlParams();
    this.checkAuthentication();
    if (window.flashError) {
      this.error = window.flashError;
      delete window.flashError;
    }
    if (window.flashSuccess) {
      this.success = window.flashSuccess;
      delete window.flashSuccess;
    }
    fetch('/subscription-status', {
      headers: { 'Accept': 'application/json' }
    })
      .then(r => r.json())
      .then(data => {
        console.log('Fetched subscription status (raw):', JSON.stringify(data, null, 2));
        if (data.is_subscribed !== undefined) {
          this.isSubscribed = data.is_subscribed;
          this.subscription = data.is_subscribed ? { stripe_price: data.plan, ends_at: data.ends_at } : null;
          this.isCancelled = data.is_subscribed && data.ends_at && new Date(data.ends_at) > new Date();
          console.log('Updated state - isSubscribed:', this.isSubscribed, 'subscription:', this.subscription, 'isCancelled:', this.isCancelled);
        } else {
          console.error('Invalid subscription data:', JSON.stringify(data, null, 2));
        }
      })
      .catch(e => console.error('Error fetching subscription status:', e));
  },
  methods: {
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Never';
    },
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    async checkAuthentication() {
      try {
        const response = await axios.get('/user', { headers: { 'X-CSRF-TOKEN': this.csrfToken, 'Accept': 'application/json' } });
        console.log('User authentication response (raw):', response.status, JSON.stringify(response.data, null, 2));
        this.isAuthenticated = !!response.data;
      } catch (error) {
        this.isAuthenticated = false;
        console.error('Authentication error:', error);
      }
    },
    async fetchSubscriptionStatus() {
      try {
        const response = await fetch('/subscription-status', { headers: { 'X-CSRF-TOKEN': this.csrfToken, 'Accept': 'application/json' } });
        if (response.status === 401) {
          this.isAuthenticated = false;
          this.isSubscribed = false;
          this.subscription = null;
          this.isCancelled = false;
          console.log('Unauthorized access - Resetting subscription');
          return false;
        }
        if (!response.ok) throw new Error('Failed to load subscription details');
        const data = await response.json();
        console.log('Fetched subscription status (parsed):', JSON.stringify(data, null, 2));
        if (data.is_subscribed !== undefined && data.plan !== undefined) {
          this.isSubscribed = data.is_subscribed;
          this.subscription = data.is_subscribed ? { stripe_price: data.plan, ends_at: data.ends_at } : null;
          this.isCancelled = data.is_subscribed && data.ends_at && new Date(data.ends_at) > new Date();
          console.log('Updated state after fetch - isSubscribed:', this.isSubscribed, 'subscription:', this.subscription, 'isCancelled:', this.isCancelled);
        } else {
          console.error('Invalid subscription data structure:', JSON.stringify(data, null, 2));
          this.isSubscribed = false;
          this.subscription = null;
          this.isCancelled = false;
        }
        return data.is_subscribed;
      } catch (err) {
        console.error('Error loading subscription:', err);
        this.isSubscribed = false;
        this.subscription = null;
        this.isCancelled = false;
        return false;
      }
    },
    async checkSubscriptionStatus() {
      this.loading = true;
      this.error = '';
      await this.fetchSubscriptionStatus();
      this.loading = false;
    },
    async checkUrlParams() {
      const urlParams = new URLSearchParams(window.location.search);
      console.log('checkUrlParams - URL params:', Array.from(urlParams.entries()));
      if (urlParams.has('success')) {
        await this.waitForSubscription();
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.has('cancelled')) {
        this.error = 'Your subscription has been canceled. Subscribe again to continue.';
        await this.fetchSubscriptionStatus();
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        await this.fetchSubscriptionStatus();
      }
    },
    async waitForSubscription() {
      this.success = 'Subscription successful! Activating your premium access...';
      let attempts = 0;
      const maxAttempts = 15;
      while (attempts < maxAttempts) {
        attempts++;
        const subscribed = await this.fetchSubscriptionStatus();
        console.log(`waitForSubscription - Attempt ${attempts}: isSubscribed = ${subscribed}, subscription =`, this.subscription);
        if (subscribed) {
          this.showSuccessImage = true;
          this.success = 'Premium access activated! Enjoy your benefits.';
          setTimeout(() => this.success = '', 5000);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      this.error = 'Activation is taking longer than expected. Please refresh or contact support.';
      this.success = '';
    },
    clearNotification() {
      this.error = '';
      this.success = '';
    },
    getPlanBenefits() {
      const plan = this.plans.find(p => p.value === this.subscription?.stripe_price);
      return plan ? plan.features : ['Basic access only'];
    },
    async handleCancelSubscription() {
      if (!confirm('Are you sure you want to cancel your subscription? You’ll keep access until your current period ends.')) return;
      this.cancelling = true;
      try {
        const response = await fetch('/cancel', {
          method: 'POST',
          headers: { 'X-CSRF-TOKEN': this.csrfToken, 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log('handleCancelSubscription - Cancellation response:', JSON.stringify(data, null, 2));
        if (response.ok && data.success) {
          if (this.subscription) {
            this.subscription.ends_at = data.ends_at || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          } else {
            this.subscription = { stripe_price: this.selectedPlan, ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() };
            this.isSubscribed = true;
          }
          this.isCancelled = true;
          await this.fetchSubscriptionStatus();
          this.success = `Subscription canceled. You’ll have access until ${this.formatDate(this.subscription.ends_at)}.`;
          setTimeout(() => this.success = '', 8000);
        } else if (data.message && data.message.includes('canceled subscription')) {
          this.subscription = this.subscription || { stripe_price: this.selectedPlan, ends_at: new Date().toISOString() };
          this.isCancelled = true;
          await this.fetchSubscriptionStatus();
          this.success = 'Your subscription is already canceled. Access ends now.';
          setTimeout(() => this.success = '', 8000);
        } else {
          throw new Error(data.message || 'Failed to cancel your subscription.');
        }
      } catch (err) {
        this.error = err.message || 'An error occurred while canceling. Please try again.';
        console.error('handleCancelSubscription - Error:', err);
      } finally {
        this.cancelling = false;
      }
    },
    async waitForCancellationUpdate() {
      let attempts = 0;
      const maxAttempts = 10;
      while (attempts < maxAttempts) {
        await this.fetchSubscriptionStatus();
        const endsAtDate = this.subscription?.ends_at ? new Date(this.subscription.ends_at) : null;
        const currentDate = new Date();
        if (!endsAtDate || endsAtDate <= currentDate) {
          console.log('waitForCancellationUpdate - Cancellation state confirmed - ends_at:', endsAtDate?.toISOString());
          return;
        }
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      console.warn('waitForCancellationUpdate - Failed to confirm cancellation state after max attempts');
    },
    async handleSubmit() {
      this.submitting = true;
      this.error = '';
      this.success = '';
      try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) throw new Error('Please refresh the page to continue.');

        const response = await fetch('/subscribe', {
          method: 'POST',
          headers: { 'X-CSRF-TOKEN': csrfToken, 'Accept': 'application/json', 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ price_lookup_key: this.selectedPlan })
        });

        const data = await response.json();
        console.log('handleSubmit - Subscription response:', response.status, JSON.stringify(data, null, 2));

        if (response.ok && data.redirect) {
          window.location.href = data.redirect;
          // After redirect, wait for success callback to update state
          this.waitForSubscription();
        } else {
          if (data.errors) {
            console.error('handleSubmit - Validation errors:', data.errors);
            this.error = Object.values(data.errors).flat().join(' ');
          } else {
            this.error = data.message || 'An error occurred. Please try again.';
          }
        }
      } catch (error) {
        console.error('handleSubmit - Subscription error:', error);
        this.error = error.message || 'A network error occurred. Please try again.';
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
  },
};
</script>
<style scoped>
/* Base Styles */
.subscription-container {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn-cancel {
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
  background-color: #dc2626; /* Red background for cancel button */
}

.btn-cancel:hover:not(.disabled):not(.cancelled) {
  background-color: #b91c1c; /* Darker red on hover */
}

.btn-cancel.disabled {
  background-color: #d1d5db73;
  color: #000;
  border: 2px solid #000;
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}

.btn-cancel.cancelled {
  background-color: #9ca3af; /* Grey for cancelled state */
  color: white;
  border: none;
  cursor: default;
}

.btn-cancel.cancelled:hover {
  background-color: #9ca3af; /* No hover effect when cancelled */
}

/* Success Image Container */
.success-image-container {
  text-align: center;
  padding: 40px 0;
  max-width: 600px;
  margin: 0 auto;
}

.success-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

.success-message {
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 20px;
}

/* Header */
.subscription-header {
  background: white;
  padding: 60px 0 40px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.header-content p {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.subscription-main {
  padding: 40px 0;
}

/* Notifications */
.notification {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  gap: 12px;
}

.notification.success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.notification.error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.notification i {
  flex-shrink: 0;
}

.close-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: auto;
  padding: 4px;
  font-size: 1.25rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 80px 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #35a38b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-state p {
  color: #64748b;
  font-size: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Subscription Card */
.active-subscription {
  max-width: 600px;
  margin: 0 auto;
}

.subscription-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-badge {
  background: #35a38b;
  color: white;
  padding: 12px 20px;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.card-badge.cancelled {
  background: #9ca3af; /* Grey for cancelled state */
}

.card-header {
  padding: 40px 32px 24px;
  text-align: center;
}

.status-icon {
  width: 80px;
  height: 80px;
  background: #e0f7f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #35a38b;
  font-size: 2rem;
}

.status-icon.cancelled {
  background: #fef2f2;
  color: #dc2626;
}

.card-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  margin-bottom: 24px;
}

.status-info {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.label {
  font-size: 0.875rem;
  color: #64748b;
}

.value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #35a38b;
}

.card-body {
  padding: 0 32px 32px;
}

.card-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  text-align: center;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-item i {
  color: #35a38b;
  flex-shrink: 0;
}

.benefit-item span {
  color: #475569;
}

.cancellation-notice {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Buttons */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #35a38b;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2d8c77;
}

/* Plans View */
.plans-view {
  max-width: 1000px;
  margin: 0 auto;
}

.plans-header {
  text-align: center;
  margin-bottom: 48px;
}

.plans-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
}

.plans-header p {
  color: #64748b;
  font-size: 1.125rem;
}

/* Plans Grid */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.plan-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px 24px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.plan-card:hover {
  border-color: #35a38b;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.plan-card.selected {
  border-color: #35a38b;
  background: #f0fdfa;
}

.plan-card.featured {
  border-color: #35a38b;
  transform: scale(1.05);
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #35a38b;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.plan-header {
  text-align: center;
  margin-bottom: 24px;
}

.plan-icon {
  width: 64px;
  height: 64px;
  background: #e0f7f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #35a38b;
  font-size: 1.5rem;
}

.plan-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.plan-price {
  margin-bottom: 8px;
}

.amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
}

.period {
  color: #64748b;
  font-size: 1rem;
}

.savings {
  color: #059669;
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0;
}

.plan-features {
  margin-bottom: 24px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-item i {
  color: #35a38b;
  flex-shrink: 0;
  font-size: 0.875rem;
}

.feature-item span {
  color: #475569;
  font-size: 0.875rem;
}

.plan-selector {
  margin-top: auto;
}

.radio-input {
  display: none;
}

.radio-label {
  display: block;
  text-align: center;
  padding: 12px 16px;
  background: #35a38b;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.radio-label:hover {
  background: #2d8c77;
}

.plan-card.selected .radio-label {
  background: #2d8c77;
}

/* Payment Section */
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
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 16px;
}

/* FAQ Section */
.faq-section {
  background: white;
  padding: 80px 0;
  border-top: 1px solid #e2e8f0;
}

.faq-header {
  text-align: center;
  margin-bottom: 48px;
}

.faq-header h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e2e8f0;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  cursor: pointer;
  gap: 16px;
}

.faq-question h4 {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.faq-question i {
  color: #64748b;
  transition: transform 0.2s;
}

.faq-question i.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding-bottom: 24px;
}

.faq-answer p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2rem;
  }

  .plans-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .plan-card.featured {
    transform: scale(1);
  }

  .card-header,
  .card-body {
    padding: 24px 20px;
  }
}
</style>