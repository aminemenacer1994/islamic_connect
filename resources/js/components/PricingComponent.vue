<template>
  <div id="app" class="container">

    <header class="text-center py-5">
      <h1 class="fw-bold display-5 mb-3">Pricing Plans</h1>
      <p class="lead text-muted mx-auto">
        Choose a plan that suits your Islamic Connect needs. All plans include 24/7 support and a free 14-day trial.
        Special discounts are available for mosques, Islamic schools, and community centers.
      </p>
    </header>

    <!-- Pricing Section -->
    <div id="pricing" class="container pb-5">
      <!-- Pricing Toggle -->
      <div class="d-flex justify-content-center mb-5">
        <div class="pricing-toggle bg-light rounded-3 p-1 shadow-sm" role="group" aria-label="Billing period selector">
          <button type="button" class="btn" :class="{ 'btn-teal': !isAnnual, 'btn-light': isAnnual }"
            @click="isAnnual = false" aria-pressed="!isAnnual">
            Monthly Billing
          </button>
          <button type="button" class="btn position-relative" :class="{ 'btn-teal': isAnnual, 'btn-light': !isAnnual }"
            @click="isAnnual = true" aria-pressed="isAnnual">
            Annual Billing
            <span class="badge bg-success ms-2 fw-semibold">Save 20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div v-for="(plan, index) in plans" :key="plan.id" class="col">
          <div class="card h-100 pricing-card border-0 shadow-lg"
            :class="{ 'featured-card': plan.isFeatured }">
            <div v-if="plan.isFeatured" class="featured-badge bg-teal text-white py-2 text-center">
              Most Popular
            </div>
            <div class="pricing-card-header text-center ">
              <div class="pricing-icon mt-3 mx-auto rounded-circle d-flex align-items-center justify-content-center">
                <i :class="plan.icon"></i>
              </div>
              <h5 class="card-title mt-3 fw-bold">{{ plan.name }}</h5>
              <div class="price-amount">
                <span v-if="plan.price[priceKey] !== 'Custom'">
                  {{ isAnnual ? `£${(parseFloat(plan.price.monthly.replace('£', '')) * 12 * 0.8).toFixed(2)}` : plan.price[priceKey] }}
                </span>
                <span v-else>{{ plan.price[priceKey] }}</span>
                <small class="price-period" v-if="plan.price[priceKey] !== 'Custom'">/month</small>
              </div>
              <p class="text-muted mb-0">{{ plan.description }}</p>
              <p v-if="isAnnual && plan.price[priceKey] !== 'Custom'" class="text-success small mt-1">
                Billed annually (save 20%)
              </p>
            </div>
            <div class="card-body pricing-card-body d-flex flex-column">
              <ul class="pricing-features list-unstyled mb-4">
                <li v-for="feature in plan.features" :key="feature" class="py-2">
                  <i class="fas fa-check-circle me-2 text-teal"></i>{{ feature }}
                </li>
              </ul>
              <a href="#" class="btn w-100 rounded-pill fw-semibold py-2 mt-auto"
                :class="plan.isFeatured ? 'btn-teal ' : 'btn-outline-teal'">
                {{ plan.buttonText }} <i class="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="text-center mb-5">
        <h1 class="fw-bold text-dark mb-4">Frequently Asked Questions</h1>
        <p class="lead text-muted mx-auto">
          Answers to common questions about Islamic Connect subscriptions, services, and zakat eligibility.
        </p>
      </div>
      <div class="row justify-content-center mb-5">
        <div class="col-lg-10">
          <div class="accordion accordion-flush" id="faqAccordion">
            <div v-for="(faq, index) in faqs" :key="index"
              class="accordion-item border-0 mb-3 shadow-sm">
              <h2 class="accordion-header" :id="'heading' + index">
                <button class="accordion-button collapsed rounded-3 fw-semibold" type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#collapse' + index" :aria-expanded="false" :aria-controls="'collapse' + index">
                  <i class="fas fa-question-circle text-teal me-3"></i>{{ faq.question }}
                </button>
              </h2>
              <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body pt-0">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="row align-items-center bg-dark text-white rounded-4 p-4 p-md-5 mb-5 shadow-lg">
        <div class="col-md-8">
          <h2 class="fw-bold mb-3">Enhance Your Islamic Digital Experience</h2>
          <p class="mb-0">
            Join mosques, schools, and individuals using Islamic Connect to access Quran, Hadith, Audio, Video, and
            accessibility tools.
          </p>
        </div>
        <div class="col-md-4 text-md-end mt-3 mt-md-0">
          <a href="#" class="btn btn-teal btn-lg rounded-pill px-4 fw-semibold">Get Started Today</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const isAnnual = ref(false);

    const plans = ref([
      {
        id: 'basic',
        name: 'Basic',
        description: 'For individual users & small mosques',
        price: { monthly: '£0', annual: '£0' },
        features: [
          'Access to Quran & translation',
          'Daily Ayah notifications',
          'Audio recitation streaming',
          'Community support'
        ],
        buttonText: 'Start Free',
        isFeatured: false,
        icon: 'fas fa-book-quran'
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'For Islamic schools & growing centers',
        price: { monthly: '£1.99', annual: '£1.99' },
        features: [
          'All Basic features',
          'Hadith & Seerah libraries',
          'Live radio & podcasts',
          'Multi-user access',
          'Customizable dashboard'
        ],
        buttonText: 'Start Trial',
        isFeatured: true,
        icon: 'fas fa-mosque'
      },
      {
        id: 'lifetime',
        name: 'Lifetime',
        description: 'For large institutions & organizations',
        price: { monthly: '£15.99', annual: '£15.99' },
        features: [
          'Unlimited users & devices',
          'Full content library',
          'Accessibility tools (TTS, STT, gestures)',
          'Dedicated support & training',
          'Zakat eligible subscriptions'
        ],
        buttonText: 'Contact Sales',
        isFeatured: false,
        icon: 'fas fa-star-and-crescent'
      }
    ]);

    const faqs = ref([
      {
        question: 'Can Islamic institutions use zakat funds for this platform?',
        answer: 'Yes, the Barakah plan is designed to be zakat eligible, allowing mosques and Islamic centers to use zakat funds.'
      },
      {
        question: 'Does the platform support accessibility for all users?',
        answer: 'Yes, we provide text-to-speech, speech-to-text, gesture navigation, and other accessibility features.'
      },
      {
        question: 'Are there special discounts for Islamic centers?',
        answer: 'Yes, mosques, schools, and charitable organizations can access discounted pricing upon request.'
      }
    ]);

    const priceKey = computed(() => isAnnual.value ? 'annual' : 'monthly');

    return {
      isAnnual,
      plans,
      faqs,
      priceKey
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --teal: #00bfa6;
  --teal-light: #e0f7f5;
  --teal-dark: #009688;
  --dark: #1e293b;
  --muted: #64748b;
  --light: #f8fafc;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--dark);
  background-color: #f9fafb;
  line-height: 1.7;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
  line-height: 1.3;
}

.max-w-600 {
  max-width: 600px;
}

.max-w-800 {
  max-width: 800px;
}

.text-teal {
  color: var(--teal) !important;
}

.bg-teal {
  background-color: var(--teal) !important;
}

.pricing-toggle {
  display: inline-flex;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pricing-toggle .btn {
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-teal {
  background-color: var(--teal);
  border-color: var(--teal);
  color: black;
  transition: all 0.3s ease;
}

.btn-teal:hover {
  background-color: var(--teal-dark);
  border-color: var(--teal-dark);
}

.btn-outline-teal {
  color: var(--teal);
  border-color: var(--teal);
  transition: all 0.3s ease;
}

.btn-outline-teal:hover {
  background-color: var(--teal);
  color: rgb(0, 0, 0);
}

.pricing-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.pricing-card.featured-card {
  transform: scale(1.03);
  box-shadow: 0 25px 50px rgba(0, 191, 166, 0.15);
  border: 2px solid var(--teal);
  z-index: 2;
}

.featured-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-card-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  background: #f8fafc;
}

.pricing-card-body {
  padding: 1rem 2rem 2rem;
}

.pricing-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 1rem;
  background: var(--teal-light);
  color: var(--teal);
  font-size: 2rem;
  box-shadow: 0 5px 15px rgba(0, 191, 166, 0.2);
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

.price-period {
  color: var(--muted);
  font-size: 1rem;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.pricing-features li {
  padding: 0.6rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.pricing-features li:last-child {
  border-bottom: none;
}

.accordion-button {
  font-weight: 600;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.accordion-button:not(.collapsed) {
  background-color: white;
  color: var(--dark);
  box-shadow: none;
  border-radius: 12px;
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