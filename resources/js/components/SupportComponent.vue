<template>
  <div class="donation-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center text-white">
            <h1 class="mb-4">Support Islamic Connect's Mission</h1>
            <p class="lead mb-5">Making Islamic knowledge accessible through innovative technology</p>

            <!-- Impact Metrics -->
            <div class="row">
              <div class="col-md-4 mb-4">
                <div class="metric-item">
                  <h3>1,600+</h3>
                  <p>Users Served</p>
                  <span>12 months</span>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="metric-item">
                  <h3>2.3 min</h3>
                  <p>Avg Engagement</p>
                  <span>Per session</span>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="metric-item">
                  <h3>30+</h3>
                  <p>Countries</p>
                  <span>Global reach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="impact-stats-section">
      <div class="container">

        <!-- Stats Section -->
        <div class="row justify-content-center mb-5">
          <div class="col-lg-10 text-center">
            <h2 class="section-title">Our Impact in Numbers</h2>
            <p class="section-lead">Measurable results showing how we're making Islamic knowledge accessible to all</p>

            <div class="row stats-grid">
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>30+</h3>
                  <p>Countries</p>
                  <small>Global reach</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>2.3 min</h3>
                  <p>Avg. Engagement</p>
                  <small>Per session</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>100%</h3>
                  <p>Accessibility</p>
                  <small>Score</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>370%</h3>
                  <p>Growth</p>
                  <small>Returning users</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Strategic Impact Areas -->
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="text-center mb-5">How Your Support Makes a Difference</h2>
            <div class="row">
              <div class="col-md-6 mb-4">
                <div class="value-card">
                  <h4>Content Development</h4>
                  <p>Expanding Quranic explanations, Hadith collections, and educational resources</p>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="value-card">
                  <h4>Accessibility Technology</h4>
                  <p>Screen reader compatibility and voice interface development</p>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="value-card">
                  <h4>Platform Infrastructure</h4>
                  <p>Server maintenance and scalability for global user base</p>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="value-card">
                  <h4>Global Expansion</h4>
                  <p>Reaching underserved communities in 30+ countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Donation Form -->
    <section class="donation-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="donation-form">
              <div class="form-header text-center mb-4">
                <h3 class="mb-3">Make a Contribution</h3>
                <p class="text-muted">Select your donation amount and frequency</p>
              </div>

              <!-- Amount Selection -->
              <div class="amount-section mb-4">
                <label class="form-label">Donation Amount</label>
                <div class="row g-3 mb-3">
                  <div class="col-6">
                    <button class="btn btn-amount w-100" :class="{ 'active': amount === 10 }" @click="setAmount(10)">
                      £10
                    </button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-amount w-100" :class="{ 'active': amount === 25 }" @click="setAmount(25)">
                      £25
                    </button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-amount w-100" :class="{ 'active': amount === 50 }" @click="setAmount(50)">
                      £50
                    </button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-amount w-100" :class="{ 'active': amount === 100 }" @click="setAmount(100)">
                      £100
                    </button>
                  </div>
                </div>

                <div class="custom-amount">
                  <label class="form-label">Custom Amount</label>
                  <div class="input-group">
                    <span class="input-group-text">£</span>
                    <input type="number" class="form-control" v-model="customAmount" placeholder="Enter amount" min="1"
                      @input="handleCustomAmount">
                  </div>
                </div>
              </div>

              <!-- Donation Type -->
              <div class="frequency-section mb-4">
                <label class="form-label">Donation Frequency</label>
                <div class="btn-group w-100" role="group">
                  <button type="button" class="btn btn-frequency" :class="{ 'active': donationType === 'one-time' }"
                    @click="donationType = 'one-time'">
                    One-time
                  </button>
                  <button type="button" class="btn btn-frequency" :class="{ 'active': donationType === 'monthly' }"
                    @click="donationType = 'monthly'">
                    Monthly
                  </button>
                </div>
              </div>

              <!-- Zakat Option -->
              <div class="zakat-section mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="isZakat" id="zakat-eligibility">
                  <label class="form-check-label" for="zakat-eligibility">
                    This contribution qualifies as Zakat
                  </label>
                </div>
              </div>

              <!-- Summary -->
              <div v-if="isValidAmount" class="summary-section mb-4">
                <div class="summary-item">
                  <span>Amount:</span>
                  <strong>£{{ finalAmount }}</strong>
                </div>
                <div class="summary-item">
                  <span>Frequency:</span>
                  <strong>{{ donationType === 'monthly' ? 'Monthly' : 'One-time' }}</strong>
                </div>
                <div v-if="isZakat" class="summary-item">
                  <span>Type:</span>
                  <strong>Zakat-eligible</strong>
                </div>
              </div>

              <!-- Submit Button -->
              <button class="btn btn-primary w-100" @click="processDonation" :disabled="!isValidAmount">
                <span v-if="donationType === 'monthly'">Setup Monthly Contribution</span>
                <span v-else>Proceed to Secure Payment</span>
              </button>

              <div class="security-notice text-center mt-3">
                <small class="text-muted">Secured by Stripe Payments</small>
              </div>
            </div>
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
                <p>"Islamic Connect represents the future of Islamic education technology. Their commitment to
                  accessibility sets a new standard for digital religious platforms."</p>
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
      amount: 0,
      customAmount: '',
      donationType: 'one-time',
      isZakat: false
    }
  },
  computed: {
    finalAmount() {
      return this.customAmount ? parseInt(this.customAmount) : this.amount;
    },
    isValidAmount() {
      return this.finalAmount > 0;
    }
  },
  methods: {
    setAmount(amount) {
      this.amount = amount;
      this.customAmount = '';
    },
    handleCustomAmount() {
      if (this.customAmount) {
        this.amount = 0;
      }
    },
    processDonation() {
      if (!this.isValidAmount) {
        alert('Please enter a valid donation amount.');
        return;
      }
      window.location.href = 'https://donate.stripe.com/6oE5kY84oc3q7fy145';
    }
  }
}
</script>

<style scoped>

.donation-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a5f7a 0%, #2c3e50 100%);
  padding: 80px 0 60px 0;
  color: white;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-section .lead {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.metric-item {
  text-align: center;
  padding: 0 1rem;
}

.metric-item h3 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
}

.metric-item p {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.9;
}

.metric-item span {
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Value Section */
.value-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.value-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  height: 100%;
  transition: transform 0.2s ease;
}

.value-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.value-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a5f7a;
  margin-bottom: 1rem;
}

.value-card p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* Donation Section */
.donation-section {
  padding: 80px 0;
  background: white;
}

.donation-form {
  background: #fff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.form-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
}

.form-header p {
  font-size: 1.1rem;
  color: #6c757d;
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  display: block;
}

/* Amount Buttons */
.btn-amount {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #495057;
  padding: 12px 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.btn-amount:hover,
.btn-amount.active {
  background: #1a5f7a;
  border-color: #1a5f7a;
  color: white;
  transform: translateY(-1px);
}

/* Frequency Buttons */
.btn-frequency {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 10px 16px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-frequency.active {
  background: #1a5f7a;
  border-color: #1a5f7a;
  color: white;
}

/* Primary Button */
.btn-primary {
  background: #1a5f7a;
  border: none;
  color: white;
  padding: 14px 20px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background: #144a5f;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

/* Summary Section */
.summary-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #1a5f7a;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.summary-item:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}

/* Testimonial Section */
.testimonial-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.testimonial-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  border-left: 4px solid #1a5f7a;
}

.testimonial-card blockquote p {
  font-size: 1.2rem;
  font-style: italic;
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.testimonial-card blockquote footer {
  font-weight: 600;
  color: #1a5f7a;
}

/* Form Elements */
.form-check-input:checked {
  background-color: #1a5f7a;
  border-color: #1a5f7a;
}

.input-group-text {
  background: #f8f9fa;
  border-color: #ced4da;
}

.form-control {
  border-color: #ced4da;
}

.form-control:focus {
  border-color: #1a5f7a;
  box-shadow: 0 0 0 0.2rem rgba(26, 95, 122, 0.25);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0 40px 0;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .value-section,
  .donation-section,
  .testimonial-section {
    padding: 60px 0;
  }

  .donation-form {
    padding: 2rem;
  }
}
</style>