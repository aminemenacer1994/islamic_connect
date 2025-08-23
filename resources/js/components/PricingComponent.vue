<template>
  <div id="app" class="py-5">

    <!-- Pricing Section -->
    <div id="pricing" class="container py-5">
      <div class="text-center mb-5">
        <h1 class="fw-800 text-dark section-title mb-4">Pricing Plans</h1>
        <p class="text-muted mx-auto fs-5">
          Choose a plan that suits your Islamic Connect needs. All plans include 24/7 support and free trial for 14
          days.
          Special discounts are available for mosques, Islamic schools, and community centers.
        </p>
      </div>

      <!-- Pricing Toggle -->
      <div class="d-flex justify-content-center mb-5">
        <div class="pricing-toggle bg-light rounded-3 p-1 shadow-sm" role="group">
          <button type="button" class="btn" :class="{ 'btn-teal': !isAnnual, 'btn-light': isAnnual }"
            @click="isAnnual = false">
            Monthly Billing
          </button>
          <button type="button" class="btn position-relative" :class="{ 'btn-teal': isAnnual, 'btn-light': !isAnnual }"
            @click="isAnnual = true">
            Annual Billing
            <span class="badge bg-success ms-2 fw-600">Save 20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div v-for="(plan, index) in plans" :key="plan.id" class="col">
          <div class="card h-100 pricing-card border-0 shadow-lg animate-slide-up"
            :class="{ 'featured-card': plan.isFeatured }" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="pricing-card-header text-center">
              <span v-if="plan.isFeatured" class="badge bg-teal rounded-pill px-3 fw-600">Most Popular</span>
              <div class="pricing-icon mt-3">
                <i :class="plan.icon"></i>
              </div>
              <h5 class="card-title mt-3 fw-700">{{ plan.name }}</h5>
              <div class="price-amount">
                {{ plan.price[priceKey] }}
                <small class="price-period" v-if="plan.price[priceKey] !== 'Custom'">/month</small>
              </div>
              <p class="text-muted">{{ plan.description }}</p>
            </div>
            <div class="card-body pricing-card-body">
              <ul class="pricing-features">
                <li v-for="feature in plan.features" :key="feature">
                  <i class="fas fa-check-circle me-2 text-teal"></i>{{ feature }}
                </li>
              </ul>
              <a href="#" class="btn w-100 rounded-pill fw-600 py-2 mt-4 btn-hover-scale"
                :class="plan.isFeatured ? 'btn-teal text-white' : 'btn-outline-teal'">
                {{ plan.buttonText }} <i class="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="card border-0 shadow-lg mb-5 animate-fade-in">
        <div class="card-header bg-light py-4 text-center">
          <h3 class="mb-0 text-dark fw-700">Plan Comparison</h3>
          <p class="text-muted mb-0">Select the right plan for your Islamic institution or personal use</p>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-compare mb-0">
              <thead>
                <tr>
                  <th scope="col" class="feature-column ps-4">Features</th>
                  <th v-for="plan in plans" :key="plan.id" scope="col" class="text-center">
                    {{ plan.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index" class="hover-lift">
                  <th scope="row" class="feature-column ps-4 fw-600">{{ row.feature }}</th>
                  <td v-for="(plan, planIndex) in plans" :key="planIndex" class="text-center">
                    <span v-if="typeof row.data[plan.id] === 'boolean'">
                      <i v-if="row.data[plan.id]" class="fas fa-check-circle text-teal"></i>
                      <i v-else class="fas fa-times-circle text-muted"></i>
                    </span>
                    <span v-else class="fw-600">{{ row.data[plan.id] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="text-center mb-5">
        <h2 class="fw-800 text-dark section-title mb-4">Frequently Asked Questions</h2>
        <p class="text-muted max-w-600 mx-auto fs-5">
          Answers to common questions about Islamic Connect subscriptions, services, and zakat eligibility.
        </p>
      </div>
      <div class="row justify-content-center mb-5">
        <div class="col-lg-10">
          <div class="accordion accordion-flush" id="faqAccordion">
            <div v-for="(faq, index) in faqs" :key="index"
              class="accordion-item border-0 mb-3 shadow-sm animate-fade-in"
              :style="{ animationDelay: `${index * 0.1}s` }">
              <h2 class="accordion-header" :id="'heading' + index">
                <button class="accordion-button collapsed rounded-3 fw-600" type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#collapse' + index" :aria-expanded="false" :aria-controls="'collapse' + index">
                  <i class="fas fa-question-circle text-teal me-3"></i>{{ faq.question }}
                </button>
              </h2>
              <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index"
                data-bs-parent="#faqAccordion">
                <div class="accordion-body pt-0 fs-5">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="row align-items-center bg-dark text-white rounded-4 p-4 p-md-5 mb-5 shadow-lg animate-pulse">
        <div class="col-md-8">
          <h2 class="fw-800 mb-3">Enhance Your Islamic Digital Experience</h2>
          <p class="fs-5 mb-0">
            Join mosques, schools, and individuals using Islamic Connect to access Quran, Hadith, Audio, Video, and
            accessibility tools.
          </p>
        </div>
        <div class="col-md-4 text-md-end mt-3 mt-md-0">
          <a href="#" class="btn btn-teal btn-lg rounded-pill px-4 fw-600 btn-hover-scale">Get Started Today</a>
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
        price: { monthly: '$9', annual: '$7' },
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
        id: 'professional',
        name: 'Professional',
        description: 'For Islamic schools & growing centers',
        price: { monthly: '$29', annual: '$23' },
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
        id: 'barakah',
        name: 'Barakah',
        description: 'For large institutions & organizations',
        price: { monthly: 'Custom', annual: 'Custom' },
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

    const tableData = ref([
      { feature: 'Quran Access', data: { basic: true, professional: true, barakah: true } },
      { feature: 'Hadith & Seerah', data: { basic: false, professional: true, barakah: true } },
      { feature: 'Audio Streaming', data: { basic: true, professional: true, barakah: true } },
      { feature: 'Live TV/Radio', data: { basic: false, professional: true, barakah: true } },
      { feature: 'Multi-user Support', data: { basic: false, professional: true, barakah: true } },
      { feature: 'Accessibility Tools', data: { basic: false, professional: false, barakah: true } },
      { feature: 'Custom Dashboard', data: { basic: false, professional: true, barakah: true } },
      { feature: 'Zakat Eligibility', data: { basic: false, professional: false, barakah: true } }
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
      tableData,
      faqs,
      priceKey
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --teal: #0d9488;
  --teal-light: #ccfbf1;
  --teal-dark: #0f766e;
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

.fw-600 {
  font-weight: 600 !important;
}

.fw-700 {
  font-weight: 700 !important;
}

.fw-800 {
  font-weight: 800 !important;
}

.fs-5 {
  font-size: 1.1rem !important;
}

.section-title {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--teal);
  border-radius: 2px;
}

.text-teal {
  color: var(--teal) !important;
}

.text-dark {
  color: var(--dark) !important;
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
  color: white;
  transition: all 0.3s ease;
}

.btn-teal:hover {
  background-color: var(--teal-dark);
}

.btn-outline-teal {
  color: var(--teal);
  border-color: var(--teal);
  transition: all 0.3s ease;
}

.btn-outline-teal:hover {
  background-color: var(--teal);
  color: white;
}

.pricing-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.pricing-card.featured-card {
  transform: scale(1.03);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--teal);
  z-index: 2;
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
  box-shadow: 0 5px 15px rgba(13, 148, 136, 0.2);
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

.table-compare {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.table-compare th {
  background: #f8fafc;
  padding: 1rem;
  font-weight: 700;
  border-bottom: 2px solid var(--teal);
}

.table-compare td {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.feature-column {
  width: 30%;
  font-weight: 600;
}

.accordion-button {
  font-weight: 600;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.accordion-button:not(.collapsed) {
  background-color: white;
  color: var(--dark);
  box-shadow: none;
  border-radius: 12px;
}

.animate-slide-up {
  animation: slideUp 0.6s forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.6s forwards;
  opacity: 0;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }
}
</style>
