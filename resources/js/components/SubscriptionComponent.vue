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
  
          <!-- Active Subscription View -->
          <div v-else-if="isSubscribed" class="active-subscription">
            <div class="subscription-card">
              <div class="card-badge">
                <i class="fas fa-crown"></i>
                {{ subscription?.ends_at ? 'Subscription Ending Soon' : 'Active Subscription' }}
              </div>
              
              <div class="card-header">
                <div class="status-icon" :class="{ 'cancelled': subscription?.ends_at }">
                  <i class="fas" :class="subscription?.ends_at ? 'fa-calendar-times' : 'fa-check-circle'"></i>
                </div>
                <h2>{{ planDisplayName }}</h2>
                <p class="subtitle">{{ subscription?.ends_at ? 'Cancellation scheduled' : 'You\'re currently subscribed' }}</p>
                
                <div class="status-info">
                  <div class="status-item">
                    <span class="label">{{ subscription?.ends_at ? 'Access until' : 'Status' }}</span>
                    <span class="value">{{ subscription?.ends_at ? formatDate(subscription.ends_at) : 'Active & Unlimited' }}</span>
                  </div>
                </div>
              </div>
  
              <div class="card-body">
                <h3>Premium Benefits</h3>
                <div class="benefits-list">
                  <div class="benefit-item">
                    <i class="fas fa-check"></i>
                    <span>Ad-free experience</span>
                  </div>
                  <div class="benefit-item">
                    <i class="fas fa-check"></i>
                    <span>Offline access to content</span>
                  </div>
                  <div class="benefit-item">
                    <i class="fas fa-check"></i>
                    <span>Advanced prayer time settings</span>
                  </div>
                  <div class="benefit-item">
                    <i class="fas fa-check"></i>
                    <span>Priority support</span>
                  </div>
                  <div class="benefit-item">
                    <i class="fas fa-check"></i>
                    <span>Early access to new features</span>
                  </div>
                </div>
  
                <button 
                  v-if="!subscription?.ends_at"
                  @click="handleCancelSubscription" 
                  class="btn btn-cancel"
                  :disabled="cancelling"
                >
                  <i class="fas fa-times-circle"></i>
                  {{ cancelling ? 'Cancelling...' : 'Cancel Subscription' }}
                </button>
                
                <div v-else class="cancellation-notice">
                  <i class="fas fa-info-circle"></i>
                  Your subscription has been cancelled and will not renew.
                </div>
              </div>
            </div>
          </div>
  
          <!-- Subscription Plans View -->
          <div v-else class="plans-view">
            <div class="plans-header">
              <h2>Choose Your Plan</h2>
              <p>Select the plan that works best for you</p>
            </div>
  
            <form method="POST" action="/subscribe">
              <!-- Plans Grid -->
              <div class="plans-grid">
                <div 
                  v-for="plan in plans" 
                  :key="plan.value"
                  class="plan-card"
                  :class="{ 
                    'featured': plan.featured,
                    'selected': plan.value === selectedPlan 
                  }"
                  @click="selectedPlan = plan.value"
                >
                  <div v-if="plan.featured" class="plan-badge">
                    {{ plan.badge }}
                  </div>
  
                  <div class="plan-header">
                    <div class="plan-icon">
                      <i :class="plan.icon"></i>
                    </div>
                    <h3>{{ plan.name }}</h3>
                    <div class="plan-price">
                      <span class="amount">{{ plan.price }}</span>
                      <span class="period">{{ plan.period }}</span>
                    </div>
                    <p v-if="plan.savings" class="savings">{{ plan.savings }}</p>
                  </div>
  
                  <div class="plan-features">
                    <div 
                      v-for="feature in plan.features" 
                      :key="feature"
                      class="feature-item"
                    >
                      <i class="fas fa-check"></i>
                      <span>{{ feature }}</span>
                    </div>
                  </div>
  
                  <div class="plan-selector">
                    <input 
                      type="radio" 
                      :id="plan.value"
                      :value="plan.value"
                      v-model="selectedPlan"
                      class="radio-input"
                    >
                    <label :for="plan.value" class="radio-label">
                      {{ plan.value === selectedPlan ? 'Selected' : 'Select Plan' }}
                    </label>
                  </div>
                </div>
              </div>
  
              <!-- Payment Section -->
              <div class="payment-section">
                <input type="hidden" name="_token" :value="csrfToken">
                <input type="hidden" name="price_lookup_key" :value="selectedPlan">
                
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="submitting"
                >
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
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="faq-item"
            >
              <div 
                class="faq-question"
                @click="toggleFaq(index)"
              >
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
        faqs: [
          {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll continue to have access to premium features until the end of your current billing period.',
            open: false
          },
          {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit and debit cards through our secure payment processor, Stripe.',
            open: false
          },
          {
            question: 'Is there a free trial available?',
            answer: 'We don\'t currently offer a free trial, but we have a free tier with basic features. You can upgrade to premium anytime to unlock all features.',
            open: false
          }
        ],
        plans: [
          {
            value: 'price_1SDrmPGsDD2PdzHqTgawcJZd',
            name: 'Monthly',
            price: '£1.99',
            period: 'per month',
            icon: 'fas fa-calendar-alt',
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
      
      toggleFaq(index) {
        this.faqs[index].open = !this.faqs[index].open;
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

      async checkSubscriptionStatus() {
        try {
          const response = await axios.get('/sync-stripe-subscription');
          if (response.data.is_subscribed && response.data.subscription.stripe_status === 'active') {
            this.subscriptionStatus = 'active';
            this.loading = false;
          } else {
            setTimeout(() => this.checkSubscriptionStatus(), 5000);
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
          this.error = true;
          this.errorMessage = 'Subscription is taking longer than expected. Please refresh the page or contact support.';
          this.loading = false;
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
          
          // Check if subscription has actually ended
          if (this.isSubscribed && this.subscription?.ends_at) {
            const endsAtDate = new Date(this.subscription.ends_at);
            const now = new Date();
            
            // If the subscription end date has passed, show them as not subscribed
            if (endsAtDate < now) {
              this.isSubscribed = false;
            }
          }
          
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
    
    }
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
  
  .btn-cancel {
    background: white;
    color: #dc2626;
    border: 1px solid #dc2626;
  }
  
  .btn-cancel:hover:not(:disabled) {
    background: #fef2f2;
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
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
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
  
  .plan-header h3 {
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