<template>
  <div class="donation-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center text-white">
            <h1 class="mb-4 text-white">Support Islamic Education Technology</h1>
            <p class="lead mb-5">Your contribution helps make authentic Islamic knowledge accessible to a global audience</p>

            <!-- Impact Metrics -->
            <div class="row">
              <div class="col-md-3 mb-4">
                <div class="metric-item">
                  <h3>1,600+</h3>
                  <p>Active Users</p>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="metric-item">
                  <h3>30+</h3>
                  <p>Countries</p>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="metric-item">
                  <h3>200+</h3>
                  <p>Cities</p>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="metric-item">
                  <h3>370%</h3>
                  <p>User Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Combined Value Proposition and Donation Section -->
    <section class="combined-section">
      <div class="container-fluid">
        <div class="row align-items-stretch">
          <!-- Value Proposition Column -->
          <div class="col-lg-1 mb-4">
          </div>
          <div class="col-lg-5 mb-4">
            <div class="value-proposition-wrapper">
              
              <div class="form-header text-center mb-4">
                <h2 class="mb-3">Strategic Impact Areas</h2>
              </div>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">📚</div>
                    <h4>Educational Content</h4>
                    <p>Developing comprehensive Quranic explanations, Hadith collections, and scholarly resources</p>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">♿</div>
                    <h4>Accessibility Features</h4>
                    <p>Implementing screen reader support and voice interfaces for inclusive access</p>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">⚙️</div>
                    <h4>Platform Infrastructure</h4>
                    <p>Maintaining robust servers and scalable architecture for global user base</p>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">🌍</div>
                    <h4>Global Outreach</h4>
                    <p>Expanding to underserved Muslim communities worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Donation Section Column -->
          <div class="col-lg-5 mb-4">
            <div class="donation-form">
              <div class="form-header text-center mb-4">
                <h3 class="mb-3">Make a Difference</h3>
                <p class="text-muted">Your support enables us to continue our mission</p>
              </div>

              <!-- Trust Indicators -->
              <div class="trust-indicators mb-4">
                <div class="trust-item">
                  <i class="fas fa-lock"></i>
                  <span>Secure Payment</span>
                </div>
                <div class="trust-item">
                  <i class="fas fa-shield-alt"></i>
                  <span>SSL Encrypted</span>
                </div>
                <div class="trust-item">
                  <i class="fas fa-certificate"></i>
                  <span>Stripe Verified</span>
                </div>
              </div>

              <!-- Summary -->
              <div v-if="isValidAmount" class="summary-section mb-4">
                <div class="summary-header">
                  <h6>Ready to Contribute</h6>
                </div>
                <div class="summary-item">
                  <span>Amount:</span>
                  <strong>£{{ finalAmount }}</strong>
                </div>
                <div class="summary-item">
                  <span>Your Impact:</span>
                  <strong>{{ impactMessage }}</strong>
                </div>
              </div>

              <!-- Submit Button -->
              <button class="btn btn-primary w-100" @click="processDonation" :disabled="!isValidAmount">
                <i class="fas fa-lock me-2"></i>
                Proceed to Secure Payment
              </button>

              <div class="security-guarantee text-center mt-3">
                <p class="small text-muted">
                  <i class="fas fa-shield-alt me-1"></i>
                  Your contribution is securely processed by Stripe. We never store your payment details.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-1 mb-4">
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section class="testimonial-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="testimonial-card">
              <blockquote>
                <p>"Islamic Connect represents the future of Islamic education technology. Their commitment to accessibility sets a new standard for digital religious platforms."</p>
                <footer>Technology Advisor, Islamic Education Sector</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 10
    }
  },
  computed: {
    finalAmount() {
      return this.amount;
    },
    isValidAmount() {
      return this.finalAmount > 0;
    },
    impactMessage() {
      if (this.amount >= 100) return 'Major platform enhancement';
      if (this.amount >= 50) return 'Content development for many users';
      if (this.amount >= 25) return 'Supports multiple users monthly';
      return 'Helps maintain basic access';
    },
    stripeUrl() {
      const amountInCents = this.finalAmount * 100;
      return `https://donate.stripe.com/6oE5kY84oc3q7fy145?amount=${amountInCents}`;
    }
  },
  methods: {
    processDonation() {
      if (!this.isValidAmount) {
        alert('Please select a contribution amount.');
        return;
      }
      
      window.location.href = this.stripeUrl;
    }
  }
}
</script>

<style scoped>
.donation-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a5f7a 0%, #2c3e50 100%);
  padding: 100px 0 80px 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
}

.hero-section h1 {
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
}

.hero-section .lead {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  position: relative;
}

.metric-item {
  text-align: center;
  padding: 0 1rem;
  position: relative;
}

.metric-item h3 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
}

.metric-item p {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  opacity: 0.9;
}

/* Combined Section */
.combined-section {
  padding: 80px 0;
  background: #f8f9fa;
}


/* Value Cards */
.value-card {
  background: #fafbfc;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #1a5f7a;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.value-card:hover::before {
  transform: scaleY(1);
}

.value-icon {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.value-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a5f7a;
  margin-bottom: 1rem;
}

.value-card p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

/* Donation Section */
.donation-form {
  background: #fff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  position: relative;
  height: 100%;
}

.donation-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1a5f7a, #2c3e50);
  border-radius: 16px 16px 0 0;
}

.form-header h3 {
  font-size: 1.75rem;
  padding-top: 5px;
  font-weight: 800;
  color: #2c3e50;
}
.form-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #2c3e50;
}

.form-header p {
  font-size: 1.1rem;
  color: #6c757d;
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #495057;
  font-weight: 500;
}

.trust-item i {
  color: #1a5f7a;
}

/* Enhanced Summary */
.summary-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #1a5f7a;
}

.summary-header {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.summary-header h6 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.summary-item:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}

/* Enhanced Primary Button */
.btn-primary {
  background: #1a5f7a;
  border: none;
  color: white;
  padding: 1.25rem 2rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover:not(:disabled) {
  background: #144a5f;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.security-guarantee {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

/* Testimonial Section */
.testimonial-section {
  padding: 40px 0;
}

.testimonial-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  border-left: 4px solid #1a5f7a;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 5rem;
  color: #e9ecef;
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-card blockquote {
  margin: 0;
  position: relative;
  z-index: 1;
}

.testimonial-card blockquote p {
  font-size: 1.3rem;
  font-style: italic;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.testimonial-card blockquote footer {
  font-weight: 600;
  color: #1a5f7a;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .combined-section {
    padding: 60px 0;
  }
  
  .value-proposition-wrapper,
  .donation-form {
    padding: 2rem;
  }
  
  .value-proposition-wrapper h2 {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0 40px 0;
  }

  .hero-section h1 {
    font-size: 2.25rem;
  }

  .combined-section,
  .testimonial-section {
    padding: 40px 0;
  }

  .trust-indicators {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .value-card {
    padding: 1.5rem;
  }
}
</style>