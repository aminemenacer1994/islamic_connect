<template>
  <div class="zakat-calculator">
    <!-- Hero Section -->
    <h2 class="mb-2 text-center py-4 fw-bold display-5 ">Zakat Calculator</h2>
    <p class="text-center container text-dark mb-4 hero-subtitle">
      Easily calculate your Zakat obligation with our comprehensive tool. Determine if your wealth meets the Nisab
      threshold and calculate the 2.5% Zakat due on your eligible assets. Learn about Zakat and ensure accurate
      calculations.
    </p>
    <div class="container-fluid">
      <div class="row g-4 justify-content-center">
        <div :class="zakatCalculated ? 'col-lg-7' : 'col-lg-9'" class="calculator-column">
          <div class="card shadow-md rounded-20">
            <div class="card-body p-lg-5">
              <!-- Currency and Nisab Selection -->
              <h4 class="mb-4 fw-bold text-dark text-left">Zakat Calculator</h4>

              <div class="row g-3">
                <div class="col-md-6">
                  <label for="currency" class="form-label fw-bold">Currency</label>
                  <select id="currency" class="form-select" v-model="selectedCurrency" aria-describedby="currencyHelp">
                    <option v-for="(symbol, currency) in currencySymbols" :key="currency" :value="currency">
                      {{ currency }} ({{ symbol }})
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-2">
                  <label for="nisab" class="form-label fw-bold">Nisab Standard</label>
                  <select id="nisab" class="form-select" v-model="nisabType" aria-describedby="nisabHelp">
                    <option value="gold">Gold (85g)</option>
                    <option value="silver">Silver (595g)</option>
                  </select>
                </div>
              </div>

              <!-- Asset Inputs -->
              <h5 class="mt-5 fw-bold text-dark border-bottom pb-2 mb-4">
                <i class="bi bi-coin me-2"></i>Your Assets
              </h5>

              <!-- Gold Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-gem fw-bold text-warning me-2"></i>Gold
                </label>
                <div class="col-md-4">
                  <input type="number" class="form-control" v-model.number="goldGrams" placeholder="Grams" min="0"
                    required :class="{ 'is-invalid': errors.goldGrams }" aria-describedby="goldGramsError">
                </div>
                <div class="col-md-5">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="goldPrice" placeholder="Price per gram"
                      min="0" :class="{ 'is-invalid': errors.goldPrice }" aria-describedby="goldPriceError">
                  </div>
                </div>
              </div>

              <!-- Silver Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-gem text-secondary me-2"></i>Silver
                </label>
                <div class="col-md-4">
                  <input type="number" class="form-control" v-model.number="silverGrams" placeholder="Grams" min="0"
                    :class="{ 'is-invalid': errors.silverGrams }" aria-describedby="silverGramsError">
                </div>
                <div class="col-md-5">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="silverPrice" placeholder="Price per gram"
                      min="0" :class="{ 'is-invalid': errors.silverPrice }" aria-describedby="silverPriceError">
                  </div>
                </div>
              </div>

              <!-- Cash Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-cash-coin text-success me-2"></i>Cash
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="cash" placeholder="Amount in hand & bank"
                      min="0" :class="{ 'is-invalid': errors.cash }" aria-describedby="cashError">
                  </div>
                </div>
              </div>

              <!-- Investments Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-graph-up text-info me-2"></i>Investments
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="investments"
                      placeholder="Stocks, shares, etc." min="0" :class="{ 'is-invalid': errors.investments }"
                      aria-describedby="investmentsError">
                  </div>
                </div>
              </div>

              <!-- Business Assets Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-briefcase text-dark me-2"></i>Business Assets
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="businessAssets"
                      placeholder="Value of inventory" min="0" :class="{ 'is-invalid': errors.businessAssets }"
                      aria-describedby="businessAssetsError">
                  </div>
                </div>
              </div>

              <!-- Real Estate Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-house text-warning me-2"></i>Real Estate
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="realEstate"
                      placeholder="Investment properties only" min="0" :class="{ 'is-invalid': errors.realEstate }"
                      aria-describedby="realEstateError">
                  </div>
                </div>
              </div>

              <!-- Other Assets Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">
                  <i class="bi bi-plus-circle-dotted text-primary me-2"></i>Other Assets
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="otherAssets"
                      placeholder="Receivables, etc." min="0" :class="{ 'is-invalid': errors.otherAssets }"
                      aria-describedby="otherAssetsError">
                  </div>
                </div>
              </div>

              <!-- Agricultural Produce Input -->
              <h5 class="mt-5 fw-bold text-dark border-bottom pb-2 mb-4">
                <i class="bi bi-wheat text-success me-2"></i>Agricultural Produce
              </h5>
              <div class="row mb-3 align-items-center">
                <div class="col-md-6">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="agriculturalProduce"
                      placeholder="Value of Produce" min="0" :class="{ 'is-invalid': errors.agriculturalProduce }"
                      aria-describedby="agriculturalProduceError">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="irrigated" value="irrigated"
                      v-model="agriculturalProduceType">
                    <label class="form-check-label" for="irrigated">Irrigated (5% Zakat)</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="rain-fed" value="rain-fed"
                      v-model="agriculturalProduceType">
                    <label class="form-check-label" for="rain-fed">Rain-fed (10% Zakat)</label>
                  </div>
                </div>
              </div>

              <!-- Liabilities Input -->
              <h5 class="mt-5 fw-bold text-dark border-bottom pb-2 mb-4">
                <i class="bi bi-credit-card text-danger me-2"></i>Liabilities
              </h5>
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">Short-term Debts</label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="liabilities"
                      placeholder="Due within a year" min="0" :class="{ 'is-invalid': errors.liabilities }"
                      aria-describedby="liabilitiesError">
                  </div>
                </div>
              </div>

              <div class="row mb-4 align-items-center">
                <label class="col-md-3 col-form-label fw-bold">Other Liabilities</label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text bg-light">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="otherLiabilities"
                      placeholder="Taxes, rents, etc." min="0" :class="{ 'is-invalid': errors.otherLiabilities }"
                      aria-describedby="otherLiabilitiesError">
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-row action-row--spaced flex-wrap mt-5" role="group"
                aria-label="Zakat calculator actions">
                <button type="button" class="premium-action-button premium-action-button--primary"
                  @click="calculateZakat" :disabled="!isFormValid" aria-label="Calculate my Zakat">
                  <span class="action-row__icon"><i class="bi bi-calculator" aria-hidden="true"></i></span>
                  <span class="action-row__label">Calculate Zakat</span>
                </button>
                <button type="button" class="premium-action-button premium-action-button--outline"
                  @click="resetCalculator" aria-label="Reset values">
                  <span class="action-row__icon"><i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i></span>
                  <span class="action-row__label">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Results Panel -->
        <transition name="fade">
          <div class="col-lg-5" ref="zakatSummary" v-if="zakatCalculated">
            <div class="card shadow-md rounded-20 sticky-top">
              <div class="card-body p-4" style="padding: 10px;">
                <h1 class="fw-bold text-dark">Zakat Summary</h1>

                <!-- Asset Breakdown -->
                <div class="summary-item mb-4">
                  <h6 class="mb-3 fw-bold">Asset Breakdown</h6>
                  <div v-for="(value, key) in assetBreakdown" :key="key" class="summary-metric mb-2">
                    <span class="summary-metric__icon"><i class="bi bi-piggy-bank" aria-hidden="true"></i></span>
                    <div class="d-flex w-100 justify-content-between align-items-center">
                      <span class="text-muted">{{ key }}:</span>
                      <strong>{{ currencySymbol }}{{ value.toLocaleString() }}</strong>
                    </div>
                  </div>
                  <div class="progress mb-3 custom-progress">
                    <div class="progress-bar bg-success progress-bar-full" role="progressbar"></div>
                  </div>
                </div>

                <!-- Liabilities -->
                <div class="summary-item mb-4">
                  <div class="summary-metric mb-2">
                    <span class="summary-metric__icon"><i class="bi bi-card-list" aria-hidden="true"></i></span>
                    <div class="d-flex w-100 justify-content-between align-items-center">
                      <span class="text-muted">Liabilities:</span>
                      <strong class="text-danger">{{ currencySymbol }}{{ totalLiabilities.toLocaleString() }}</strong>
                    </div>
                  </div>
                  <div class="progress mb-3 custom-progress">
                    <div class="progress-bar bg-danger progress-bar-full" role="progressbar"></div>
                  </div>
                </div>

                <!-- Zakatable Amount -->
                <div class="summary-item mb-4">
                  <div class="summary-metric mb-2">
                    <span class="summary-metric__icon"><i class="bi bi-calculator" aria-hidden="true"></i></span>
                    <div class="d-flex w-100 justify-content-between align-items-center">
                      <span class="text-muted">Zakatable Amount:</span>
                      <strong class="text-dark">{{ currencySymbol }}{{ zakatableAmount.toLocaleString() }}</strong>
                    </div>
                  </div>
                  <div class="progress mb-3 custom-progress">
                    <div class="progress-bar bg-dark progress-bar-full" role="progressbar"></div>
                  </div>
                </div>

                <!-- Zakat Due Breakdown -->
                <div v-if="isEligible" class="summary-item mb-4">
                  <h6 class="mb-3 fw-bold">Zakat Breakdown</h6>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">On General Assets (2.5%):</span>
                    <strong>{{ currencySymbol }}{{ wealthZakat.toLocaleString() }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">On Agricultural Produce:</span>
                    <strong>{{ currencySymbol }}{{ agriculturalZakat.toLocaleString() }}</strong>
                  </div>
                </div>

                <!-- Zakat Due -->
                <div class="summary-item bg-success-light p-3 rounded mb-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1 text-dark fw-bold">Total Zakat Due</h6>
                      <h3 class="text-success fw-bold mb-0">{{ currencySymbol }}{{ zakatDue.toLocaleString(undefined, {
                        minimumFractionDigits: 2, maximumFractionDigits: 2
                      }) }}</h3>
                    </div>
                    <i class="bi bi-check-circle-fill text-success summary-icon"></i>
                  </div>
                </div>

                <!-- Charts Toggle + Canvas -->
                <!-- <div class="summary-item mb-3">
                  <div class="form-check form-switch">
                    <input class="form-check-input ml-1" type="checkbox" id="showChartsSwitch" v-model="showCharts">
                    <label class="form-check-label " for="showChartsSwitch">
                      Show asset breakdown chart
                      <span v-if="isChartLibLoading" class="ms-2 align-middle">
                        <span class="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>
                        <span class="visually-hidden">Loading…</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div v-if="showCharts" class="chart-container mb-4">
                  <canvas ref="zakatChart" id="zakatChart"></canvas>
                </div> -->

                <!-- Nisab Threshold -->
                <div class="summary-item mb-4">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Nisab Threshold ({{ nisabTypeLabel }}):</span>
                    <strong>{{ currencySymbol }}{{ nisabThreshold.toLocaleString() }}</strong>
                  </div>
                </div>

                <!-- Eligibility -->
                <div class="eligibility-badge text-center p-3 rounded mt-4"
                  :class="isEligible ? 'bg-success-light' : 'bg-light'">
                  <h5 :class="isEligible ? 'text-success' : 'text-muted'" class="fw-bold">
                    <i :class="isEligible ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'" class="me-2"></i>
                    {{ isEligible ? 'Zakat is Obligatory' : 'Below Nisab' }}
                  </h5>
                  <p class="small mb-0" v-if="isEligible">Your assets exceed the Nisab threshold.</p>
                  <p class="small mb-0" v-else>Your assets are below the Nisab threshold.</p>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex flex-column gap-2 mt-4">
                  <button class="btn btn-dark w-100" @click="printSummary">
                    <i class="bi bi-download me-2"></i><b class="text-center">Download Summary</b>
                  </button>
                  <button class="btn text-center btn-outline-dark w-100" @click="shareSummary">
                    <i class="bi bi-share me-2"></i><b class="text-center">Share Summary</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- FAQ Section -->
      <div class="row g-4 justify-content-center mt-4">
        <div class="col-lg-9">
          <div class="card shadow-md rounded-4">
            <div class="card-body p-lg-5">
              <h2 class="mb-4 fw-bold text-dark text-left">Zakat FAQs</h2>
              <div class="accordion" id="zakatFaqAccordion">
                <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
                  <h2 class="accordion-header" :id="'faq-heading-' + index">
                    <button class="accordion-button" :class="{ collapsed: !faq.isOpen }" type="button"
                      @click="toggleFaq(index)" :aria-expanded="faq.isOpen" :aria-controls="'faq-collapse-' + index">
                      <span class="material-icons me-2"></span>
                      {{ faq.question }}
                    </button>
                  </h2>
                  <div :id="'faq-collapse-' + index" class="accordion-collapse collapse" :class="{ show: faq.isOpen }"
                    :aria-labelledby="'faq-heading-' + index" data-bs-parent="#zakatFaqAccordion">
                    <div class="accordion-body">
                      {{ faq.answer }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ZakatCalculator',
  directives: {
    tooltip: {
      mounted(el, binding) {
        el.setAttribute('title', binding.value);
        el.classList.add('has-tooltip');
      },
    },
  },
  data() {
    return {
      chartInstance: null,
      ChartCtor: null,
      showCharts: false,
      isChartLibLoading: false,
      zakatCalculated: false,
      isLoadingPrices: false,
      hawlMet: true,
      goldGrams: 0,
      goldPrice: 0,
      silverGrams: 0,
      silverPrice: 0,
      cash: 0,
      investments: 0,
      businessAssets: 0,
      realEstate: 0,
      otherAssets: 0,
      agriculturalProduce: 0,
      agriculturalProduceType: 'irrigated',
      liabilities: 0,
      otherLiabilities: 0,
      selectedCurrency: 'GBP',
      nisabType: 'gold',
      errors: {},
      currencySymbols: {
        USD: '$',
        GBP: '£',
        EUR: '€',
        SAR: '﷼',
        AED: 'د.إ',
        PKR: '₨',
        INR: '₹',
        BDT: '৳',
        MYR: 'RM',
        IDR: 'Rp',
      },
      faqs: [
        {
          question: 'What is Zakat?',
          answer: 'Zakat is one of the Five Pillars of Islam, an obligatory form of charity where eligible Muslims give 2.5% of their wealth annually to purify their wealth and support the needy. It promotes social justice and spiritual growth.',
          isOpen: false,
        },
        {
          question: 'Who is eligible to pay Zakat?',
          answer: 'Every sane, adult Muslim whose net wealth exceeds the Nisab threshold (e.g., 85g of gold or 595g of silver) for one lunar year (Hawl) is required to pay Zakat.',
          isOpen: false,
        },
        {
          question: 'What types of assets are zakatable?',
          answer: 'Zakatable assets include cash, savings, gold, silver, investments (stocks, shares), business inventory, and investment properties held for a lunar year. Personal items like your primary home or car are exempt.',
          isOpen: false,
        },
        {
          question: 'How is Zakat calculated?',
          answer: 'Sum your zakatable assets, subtract deductible liabilities (e.g., short-term debts), and if the net wealth exceeds the Nisab, pay 2.5% as Zakat. For agricultural produce, pay 5% (irrigated) or 10% (rain-fed).',
          isOpen: false,
        },
        {
          question: 'When should Zakat be paid?',
          answer: 'Zakat is due after one lunar year (Hawl) of possessing wealth above the Nisab. Many Muslims choose to pay during Ramadan for increased spiritual rewards, but it can be paid anytime during the year.',
          isOpen: false,
        },
        {
          question: 'Who can receive Zakat?',
          answer: 'Zakat can be given to eight categories outlined in the Quran (Surah At-Tawbah, 9:60): the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, those in bondage, debtors, those in the cause of Allah, and stranded travelers.',
          isOpen: false,
        },
      ],
    };
  },
  computed: {
    currencySymbol() {
      return this.currencySymbols[this.selectedCurrency] || '$';
    },
    totalAssets() {
      if (!this.hawlMet) return 0;
      return (
        this.goldGrams * this.goldPrice +
        this.silverGrams * this.silverPrice +
        this.cash +
        this.investments +
        this.businessAssets +
        this.realEstate +
        this.otherAssets
      );
    },
    totalLiabilities() {
      return this.liabilities + this.otherLiabilities;
    },
    zakatableAmount() {
      const amount = this.totalAssets - this.totalLiabilities;
      return amount > 0 ? amount : 0;
    },
    wealthZakat() {
      return this.zakatableAmount * 0.025;
    },
    agriculturalZakat() {
      if (this.agriculturalProduce <= 0) return 0;
      const rate = this.agriculturalProduceType === 'rain-fed' ? 0.10 : 0.05;
      return this.agriculturalProduce * rate;
    },
    zakatDue() {
      return this.wealthZakat + this.agriculturalZakat;
    },
    nisabThreshold() {
      if (this.nisabType === 'gold' && this.goldPrice > 0) {
        return 85 * this.goldPrice;
      } else if (this.nisabType === 'silver' && this.silverPrice > 0) {
        return 595 * this.silverPrice;
      }
      return 0;
    },
    nisabTypeLabel() {
      return this.nisabType === 'gold' ? 'Based on Gold (85g)' : 'Based on Silver (595g)';
    },
    isEligible() {
      return this.zakatableAmount >= this.nisabThreshold || this.agriculturalZakat > 0;
    },
    isFormValid() {
      const values = [
        this.goldGrams,
        this.goldPrice,
        this.silverGrams,
        this.silverPrice,
        this.cash,
        this.investments,
        this.businessAssets,
        this.realEstate,
        this.otherAssets,
        this.agriculturalProduce,
        this.liabilities,
        this.otherLiabilities,
      ];
      return values.every(v => typeof v === 'number' && v >= 0);
    },
    assetBreakdown() {
      return {
        'Gold': this.goldGrams * this.goldPrice,
        'Silver': this.silverGrams * this.silverPrice,
        'Cash': this.cash,
        'Investments': this.investments,
        'Business Assets': this.businessAssets,
        'Real Estate': this.realEstate,
        'Agricultural Produce': this.agriculturalProduce,
        'Other Assets': this.otherAssets,
      };
    },
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;

      if (this.goldGrams < 0) {
        this.errors.goldGrams = 'Grams cannot be negative';
        isValid = false;
      }
      if (this.goldPrice < 0) {
        this.errors.goldPrice = 'Price cannot be negative';
        isValid = false;
      }
      if (this.silverGrams < 0) {
        this.errors.silverGrams = 'Grams cannot be negative';
        isValid = false;
      }
      if (this.silverPrice < 0) {
        this.errors.silverPrice = 'Price cannot be negative';
        isValid = false;
      }
      if (this.cash < 0) {
        this.errors.cash = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.investments < 0) {
        this.errors.investments = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.businessAssets < 0) {
        this.errors.businessAssets = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.realEstate < 0) {
        this.errors.realEstate = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.otherAssets < 0) {
        this.errors.otherAssets = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.agriculturalProduce < 0) {
        this.errors.agriculturalProduce = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.liabilities < 0) {
        this.errors.liabilities = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.otherLiabilities < 0) {
        this.errors.otherLiabilities = 'Amount cannot be negative';
        isValid = false;
      }

      return isValid;
    },
    calculateZakat() {
      if (!this.validateForm()) return;

      this.zakatCalculated = true;

      this.$nextTick(() => {
        if (window.innerWidth <= 768 && this.$refs.zakatSummary) {
          this.$refs.zakatSummary.scrollIntoView({ behavior: 'smooth' });
        }
        this.renderChartIfReady();
      });
    },
    async ensureChartLoaded() {
      if (this.ChartCtor) return;
      this.isChartLibLoading = true;
      try {
        const mod = await import('chart.js/auto');
        this.ChartCtor = mod.default || mod;
      } catch (e) {
        console.error('Failed to load chart library', e);
        this.showCharts = false;
      } finally {
        this.isChartLibLoading = false;
      }
    },
    async renderChartIfReady() {
      if (!this.showCharts) return this.destroyChart();
      await this.ensureChartLoaded();
      const canvas = this.$refs.zakatChart;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const assetValues = Object.values(this.assetBreakdown).filter(v => v > 0);
      const assetLabels = Object.keys(this.assetBreakdown).filter(k => this.assetBreakdown[k] > 0);
      if (this.chartInstance) this.chartInstance.destroy();
      this.chartInstance = new this.ChartCtor(ctx, {
        type: 'doughnut',
        data: {
          labels: assetLabels,
          datasets: [{
            data: assetValues,
            backgroundColor: [
              '#f1c40f', '#7f8c8d', '#2ecc71', '#3498db',
              '#9b59b6', '#e74c3c', '#27ae60', '#e67e22', '#1abc9c',
            ],
            borderColor: '#fff',
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 15 } },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${this.currencySymbol}${Number(value).toLocaleString()}`;
                },
              },
            },
          },
          cutout: '60%',
        },
      });
    },
    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    printSummary() {
      const content = this.$refs.zakatSummary.innerHTML;
      const generatedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const printWindow = window.open('', '', 'width=900,height=800');

      printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Zakat Summary - ${generatedDate}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #fff;
          color: #1f2937;
          line-height: 1.7;
          padding: 60px 20px;
        }
        .container {
          max-width: 820px;
          margin: 0 auto;
          background: white;
          padding: 50px 60px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.07);
        }
        .header {
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 30px;
          border-bottom: 4px solid #f1f5f9;
        }
        .header h1 {
          font-size: 36px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .header p {
          font-size: 18px;
          color: #64748b;
          font-weight: 500;
        }

        /* Hide buttons completely */
        .btn, .el-button, button, .no-print {
          display: none !important;
        }

        /* Asset Grid – Spacious & Clean */
        .assets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin: 50px 0;
          padding: 32px;
          background: #f8fafc;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
        }
        .asset-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.2s;
        }
        .asset-label {
          font-size: 15px;
          color: #64748b;
          margin-bottom: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .asset-value {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
        }

        /* Liabilities & Zakatables */
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
          font-size: 18px;
          border-bottom: 1px dashed #e2e8f0;
        }
        .info-row:last-child { border-bottom: none; }
        .info-label { color: #475569; font-weight: 500; }
        .info-value { font-weight: 700; color: #111827; }

        /* Total Zakat Due – Hero Section */
        .zakat-due {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
          padding: 48px 32px;
          border-radius: 18px;
          text-align: center;
          margin: 60px 0;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.25);
        }
        .zakat-due h3 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
          opacity: 0.95;
        }
        .zakat-due .amount {
          font-size: 64px;
          font-weight: 800;
          letter-spacing: -2px;
        }
        .zakat-due .currency {
          font-size: 32px;
          vertical-align: top;
          margin-right: 8px;
        }

        /* Nisab & Obligation */
        .nisab-info {
          text-align: center;
          padding: 32px;
          background: #fffbeb;
          border: 2px solid #fbbf24;
          border-radius: 14px;
          margin: 50px 0;
        }
        .nisab-info h4 {
          color: #92400e;
          font-size: 20px;
          margin-bottom: 8px;
        }
        .nisab-info p {
          color: #78350f;
          font-size: 16px;
        }

        .obligation {
          text-align: center;
          padding: 40px;
          background: #fef2f2;
          border: 3px solid #fca5a5;
          border-radius: 18px;
          margin: 60px 0;
        }
        .obligation h2 {
          font-size: 32px;
          color: #991b1b;
          margin-bottom: 16px;
          font-weight: 700;
        }
        .obligation p {
          font-size: 19px;
          color: #7f1d1d;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Print Optimizations */
        @media print {
          body { padding: 0; background: white; }
          .container {
            box-shadow: none;
            padding: 40px;
            border-radius: 0;
          }
          @page { margin: 1.8cm; }
          .zakat-due, .obligation, .nisab-info {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      </style>
    </head>
    <body onload="window.print(); window.close()">
      <div class="container">
        <div class="header">
          <h1>Zakat Summary</h1>
          <p>Generated on ${generatedDate}</p>
        </div>

        <!-- This is your original content from zakatSummary ref -->
        ${content}

      </div>
    </body>
    </html>
  `);
    printWindow.document.close();
    },
    shareSummary() {
      const summaryText = `
        Zakat Summary
        Currency: ${this.selectedCurrency} (${this.currencySymbol})
        Total Assets: ${this.currencySymbol}${this.totalAssets.toLocaleString()}
        Liabilities: ${this.currencySymbol}${this.totalLiabilities.toLocaleString()}
        Zakatable Amount: ${this.currencySymbol}${this.zakatableAmount.toLocaleString()}
        Zakat Due: ${this.currencySymbol}${this.zakatDue.toLocaleString()}
        Nisab Threshold: ${this.currencySymbol}${this.nisabThreshold.toLocaleString()} (${this.nisabTypeLabel})
        Status: ${this.isEligible ? 'Zakat is Obligatory' : 'Below Nisab'}
      `;

      if (navigator.share) {
        navigator.share({
          title: 'Zakat Calculation Summary',
          text: summaryText,
        }).catch((error) => {
          console.error('Error sharing summary:', error);
        });
      } else {
        navigator.clipboard.writeText(summaryText).then(() => {
          alert('Summary copied to clipboard!');
        }).catch((error) => {
          console.error('Error copying to clipboard:', error);
        });
      }
    },
    resetCalculator() {
      this.destroyChart();
      this.showCharts = false;
      this.hawlMet = true;
      this.goldGrams = 0;
      this.goldPrice = 0;
      this.silverGrams = 0;
      this.silverPrice = 0;
      this.cash = 0;
      this.investments = 0;
      this.businessAssets = 0;
      this.realEstate = 0;
      this.otherAssets = 0;
      this.agriculturalProduce = 0;
      this.agriculturalProduceType = 'irrigated';
      this.liabilities = 0;
      this.otherLiabilities = 0;
      this.selectedCurrency = 'GBP';
      this.nisabType = 'gold';
      this.zakatCalculated = false;
      this.errors = {};
    },
    async fetchLivePrices() {
      this.isLoadingPrices = true;
      try {
        const response = await fetch(`https://api.nbp.pl/api/cenyzlota/today/?format=json`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.length > 0 && data[0].cena) {
          this.goldPrice = data[0].cena;
        }

        this.silverPrice = this.goldPrice / 75;

        alert('Live prices fetched successfully! Please verify them before calculating.');
      } catch (error) {
        console.error('Failed to fetch live prices:', error);
        alert('Could not fetch live prices. Please enter them manually.');
      } finally {
        this.isLoadingPrices = false;
      }
    },
    toggleFaq(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
  },
  watch: {
    showCharts() {
      this.$nextTick(() => this.renderChartIfReady());
      try {
        localStorage.setItem('zakat_show_charts', String(this.showCharts));
      } catch (_) { }
    },
    assetBreakdown: {
      deep: true,
      handler() {
        if (this.zakatCalculated) this.renderChartIfReady();
      },
    },
  },
  mounted() {
    // Restore charts preference
    try {
      const saved = localStorage.getItem('zakat_show_charts');
      if (saved === 'true') this.showCharts = true;
    } catch (_) { }
    this.$refs.zakatCalculator?.focus();
  },
  mounted() {
    this.$refs.zakatCalculator?.focus();
  },
};
</script>

<style scoped>
.card-teal {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 165, 0);
  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.card-teal:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(2, 44, 34, 0.12);
}

.zakat-calculator {
  min-height: 100vh;
  padding-bottom: 4rem;
  background: #f7f9fc;
}

.premium-panel {
  border-radius: 20px;
  padding: 12px;
  background: linear-gradient(145deg, rgba(15, 140, 124, 0.15), rgba(11, 99, 88, 0.12));
  border: 1px solid rgba(15, 140, 124, 0.35);
  box-shadow: 0 25px 45px rgba(11, 73, 67, 0.2);
}


.card-teal:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(2, 44, 34, 0.12);
}

.card.card-teal {
  background: linear-gradient(145deg, #e2faf5, #c6f2ec);
  border-color: rgba(15, 140, 124, 0.25);
  color: #0b4d44;
}

.card.card-teal .card-body {
  background: transparent;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: stretch;
}

.action-row--spaced>button {
  flex: 1 1 170px;
  min-width: 150px;
  max-width: 230px;
}

.premium-action-button {
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  animation: premiumEntry 0.8s ease both;
}

.premium-action-button--primary {
  color: #fff;
  box-shadow: 0 8px 25px rgba(15, 140, 124, 0.35);
}

.premium-action-button--outline {
  background: rgba(15, 140, 124, 0.08);
  border-color: rgba(15, 140, 124, 0.55);
  color: #0c7867;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08), 0 10px 24px rgba(15, 23, 42, 0.12);
}

.premium-action-button:focus-visible,
.premium-action-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.25);
}

.premium-action-button:focus-visible {
  outline: 3px solid rgba(15, 140, 124, 0.45);
  outline-offset: 2px;
}

.premium-action-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.action-row__icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.action-row__label {
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.calculator-column {
  transition: all 0.5s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.accordion-button:not(.collapsed) {
  color: #198754;
  background-color: #e6f4ea;
}

.summary-item {
  animation: premiumPulse 0.7s ease forwards;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}

.bg-success-light {
  background-color: rgba(25, 135, 84, 0.1);
}

.summary-pillars {
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
  padding: 1rem;
}

.summary-pill {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 1 1 220px;
  min-width: 220px;
  padding: 0.35rem 0.65rem;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.01);
  transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
}

.summary-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
  background: rgba(0, 191, 166, 0.05);
}

.summary-pill small {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.summary-pill .fw-semibold {
  font-size: 0.95rem;
}

.summary-pillars .action-row__icon {
  background: rgba(0, 191, 166, 0.15);
  color: #0d8271;
}

.summary-pillars .action-row__label {
  font-size: 0.9rem;
  font-weight: 600;
}

.summary-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-metric {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 0.65rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.06);
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.summary-metric:hover {
  background: rgba(0, 191, 166, 0.08);
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
}

.summary-metric__icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 122, 102, 0.18);
  color: #0c7867;
}

.summary-metric strong {
  font-size: 1rem;
}

.form-control,
.form-select {
  border-radius: 14px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #00bfa6;
  box-shadow: 0 0 0 0.25rem rgba(0, 191, 166, 0.25);
}

.animate-entry {
  animation: fadeIn 0.7s ease both;
}

.custom-progress {
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.08);
  box-shadow: inset 0 1px 4px rgba(15, 23, 42, 0.12);
}

.custom-progress .progress-bar {
  border-radius: 10px;
}

.progress-bar-full {
  width: 100%;
}

.summary-icon {
  font-size: 2rem;
}

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

@keyframes premiumPulse {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }

  65% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.15);
  }
}

@keyframes premiumEntry {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.accordion-item {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.accordion-button {
  font-weight: bold;
  color: #212529;
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
}

.accordion-button:hover {
  color: #198754;
  background-color: #f1f8f4;
}

.accordion-button:focus {
  border-color: rgba(25, 135, 84, 0.4);
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.accordion-body {
  background-color: #f8f9fa;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1.5rem;
}

@media (min-width: 992px) {
  .results-card {
    position: static !important;
    margin-top: 3rem;
  }
}
</style>
