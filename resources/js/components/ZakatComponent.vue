<template>
  <div class="zakat-calculator">
    <!-- Hero Section -->
    <div class="hero-section text-center py-4">
      <h1 class="display-4 fw-bold mb-4">Zakat Calculator</h1>
      <p class="lead text-muted mx-auto col-md-8">
        Easily calculate your Zakat obligation with our comprehensive tool. Determine if your wealth meets the Nisab threshold
        and calculate the 2.5% Zakat due on your eligible assets. Learn about Zakat and ensure accurate calculations.
      </p>
    </div>


    <div class="container-fluid">
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="calculator-card card shadow-md">
            <div class="card-body ">
              <!-- Currency and Nisab Selection -->
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="currency" class="form-label fw-semibold">Currency</label>
                  <select id="currency" class="form-select" v-model="selectedCurrency" aria-describedby="currencyHelp">
                    <option v-for="(symbol, currency) in currencySymbols" :key="currency" :value="currency">
                      {{ currency }} ({{ symbol }})
                    </option>
                  </select>
                  <small id="currencyHelp" class="form-text text-muted">Select your preferred currency for calculations.</small>
                </div>
                <div class="col-md-6">
                  <label for="nisab" class="form-label fw-semibold">Nisab Standard</label>
                  <select id="nisab" class="form-select" v-model="nisabType" aria-describedby="nisabHelp">
                    <option value="gold">Gold (85g)</option>
                    <option value="silver">Silver (595g)</option>
                  </select>
                  <small id="nisabHelp" class="form-text text-muted">Choose gold or silver standard for Nisab threshold.</small>
                </div>
              </div>

              <!-- Asset Inputs -->
              <h5 class="mb-3 fw-semibold text-dark section-title">
                <i class="bi bi-coin me-2"></i>Your Assets
              </h5>

              <!-- Gold Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-gem text-warning me-2"></i>Gold
                </label>
                <div class="col-md-4">
                  <input type="number" class="form-control" v-model.number="goldGrams" placeholder="Grams" min="0" required
                    :class="{ 'is-invalid': errors.goldGrams }" aria-describedby="goldGramsError">
                  <div v-if="errors.goldGrams" class="invalid-feedback" id="goldGramsError">{{ errors.goldGrams }}</div>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="goldPrice" placeholder="Price per gram" min="0"
                      :class="{ 'is-invalid': errors.goldPrice }" aria-describedby="goldPriceError">
                    <div v-if="errors.goldPrice" class="invalid-feedback" id="goldPriceError">{{ errors.goldPrice }}</div>
                  </div>
                </div>
              </div>

              <!-- Silver Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-gem text-secondary me-2"></i>Silver
                </label>
                <div class="col-md-4">
                  <input type="number" class="form-control" v-model.number="silverGrams" placeholder="Grams" min="0"
                    :class="{ 'is-invalid': errors.silverGrams }" aria-describedby="silverGramsError">
                  <div v-if="errors.silverGrams" class="invalid-feedback" id="silverGramsError">{{ errors.silverGrams }}</div>
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="silverPrice" placeholder="Price per gram" min="0"
                      :class="{ 'is-invalid': errors.silverPrice }" aria-describedby="silverPriceError">
                    <div v-if="errors.silverPrice" class="invalid-feedback" id="silverPriceError">{{ errors.silverPrice }}</div>
                  </div>
                </div>
              </div>

              <!-- Cash Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-cash-coin text-success me-2"></i>Cash
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="cash" placeholder="Amount" min="0"
                      :class="{ 'is-invalid': errors.cash }" aria-describedby="cashError">
                    <div v-if="errors.cash" class="invalid-feedback" id="cashError">{{ errors.cash }}</div>
                  </div>
                </div>
              </div>

              <!-- Investments Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-graph-up text-info me-2"></i>Investments
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="investments" placeholder="Amount" min="0"
                      :class="{ 'is-invalid': errors.investments }" aria-describedby="investmentsError">
                    <div v-if="errors.investments" class="invalid-feedback" id="investmentsError">{{ errors.investments }}</div>
                  </div>
                </div>
              </div>

              <!-- Business Assets Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-briefcase text-dark me-2"></i>Business Assets
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="businessAssets" placeholder="Amount" min="0"
                      :class="{ 'is-invalid': errors.businessAssets }" aria-describedby="businessAssetsError">
                    <div v-if="errors.businessAssets" class="invalid-feedback" id="businessAssetsError">{{ errors.businessAssets }}</div>
                  </div>
                </div>
              </div>

              <!-- Real Estate Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-house text-warning me-2"></i>Real Estate
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="realEstate" placeholder="Amount" min="0"
                      :class="{ 'is-invalid': errors.realEstate }" aria-describedby="realEstateError">
                    <div v-if="errors.realEstate" class="invalid-feedback" id="realEstateError">{{ errors.realEstate }}</div>
                  </div>
                </div>
              </div>

              <!-- Agricultural Produce Input -->
              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-wheat text-success me-2"></i>Agricultural Produce
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="agriculturalProduce" placeholder="Amount" min="0"
                      :class="{ 'is-invalid': errors.agriculturalProduce }" aria-describedby="agriculturalProduceError">
                    <div v-if="errors.agriculturalProduce" class="invalid-feedback" id="agriculturalProduceError">{{ errors.agriculturalProduce }}</div>
                  </div>
                </div>
              </div>

              <!-- Liabilities Input -->
              <div class="row mb-4 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-credit-card text-danger me-2"></i>Liabilities
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="liabilities" placeholder="Amount" min="0"
                      :class="{ 'is-invalid': errors.liabilities }" aria-describedby="liabilitiesError">
                    <div v-if="errors.liabilities" class="invalid-feedback" id="liabilitiesError">{{ errors.liabilities }}</div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex flex-column flex-md-row gap-3">
                <button class="btn flex-fill" :disabled="!isFormValid"
                  :style="{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }"
                  style="background: rgb(13, 182, 145); color: #fff;" @click="calculateZakat">
                  <i class="bi bi-calculator me-2"></i><strong>Calculate Zakat</strong>
                </button>
                <button class="btn btn-outline-secondary flex-fill" @click="resetCalculator">
                  <i class="bi bi-arrow-counterclockwise me-2"></i>Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="col-lg-4" ref="zakatSummary" v-if="zakatCalculated">
          <div class="results-card card shadow-md sticky-top">
            <div class="card-body p-4">
              <h4 class="mb-4 fw-bold text-dark">Zakat Summary</h4>

              <!-- Asset Breakdown -->
              <div class="summary-item mb-4">
                <h6 class="mb-3">Asset Breakdown</h6>
                <div v-for="(value, key) in assetBreakdown" :key="key" class="d-flex justify-content-between mb-2">
                  <span class="text-muted">{{ key }}:</span>
                  <strong>{{ currencySymbol }}{{ value.toLocaleString() }}</strong>
                </div>
                <div class="progress mb-3" style="height: 8px;">
                  <div class="progress-bar bg-success" role="progressbar" :style="{ width: '100%' }"></div>
                </div>
              </div>

              <!-- Liabilities -->
              <div class="summary-item mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Liabilities:</span>
                  <strong class="text-danger">{{ currencySymbol }}{{ liabilities.toLocaleString() }}</strong>
                </div>
                <div class="progress mb-3" style="height: 8px;">
                  <div class="progress-bar bg-danger" role="progressbar" :style="{ width: '100%' }"></div>
                </div>
              </div>

              <!-- Zakatable Amount -->
              <div class="summary-item mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Zakatable Amount:</span>
                  <strong class="text-dark">{{ currencySymbol }}{{ zakatableAmount.toLocaleString() }}</strong>
                </div>
                <div class="progress mb-3" style="height: 8px;">
                  <div class="progress-bar bg-dark" role="progressbar" :style="{ width: '100%' }"></div>
                </div>
              </div>

              <!-- Zakat Due -->
              <div class="summary-item bg-light p-3 rounded mb-4">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="mb-1">Zakat Due (2.5%)</h6>
                    <small class="text-muted">Your annual obligation</small>
                    <h4 class="text-success mb-0">{{ currencySymbol }}{{ zakatDue.toLocaleString() }}</h4>
                  </div>
                </div>
              </div>

              <!-- Chart -->
              <canvas ref="zakatChart" id="zakatChart" class="mb-4"></canvas>

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
                <h5 :class="isEligible ? 'text-success' : 'text-muted'">
                  <i :class="isEligible ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'" class="me-2"></i>
                  {{ isEligible ? 'Zakat is Obligatory' : 'Below Nisab' }}
                </h5>
                <p class="small mb-0" v-if="isEligible">Your assets exceed the Nisab threshold.</p>
                <p class="small mb-0" v-else>Your assets are below the Nisab threshold.</p>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex flex-column gap-2 mt-4">
                <button class="btn w-100" style="background: rgb(13, 182, 145); color: #fff;" @click="printSummary">
                  <i class="bi bi-download me-2"></i><b>Download Summary</b>
                </button>
                <button class="btn btn-outline-dark w-100" @click="shareSummary">
                  <i class="bi bi-share me-2"></i><b>Share Summary</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
      zakatCalculated: false,
      showAboutZakat: false,
      goldGrams: 0,
      goldPrice: 0,
      silverGrams: 0,
      silverPrice: 0,
      cash: 0,
      investments: 0,
      businessAssets: 0,
      realEstate: 0,
      agriculturalProduce: 0,
      liabilities: 0,
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
    };
  },
  computed: {
    currencySymbol() {
      return this.currencySymbols[this.selectedCurrency] || '$';
    },
    totalAssets() {
      return (
        this.goldGrams * this.goldPrice +
        this.silverGrams * this.silverPrice +
        this.cash +
        this.investments +
        this.businessAssets +
        this.realEstate +
        this.agriculturalProduce
      );
    },
    zakatableAmount() {
      const amount = this.totalAssets - this.liabilities;
      return amount > 0 ? amount : 0;
    },
    zakatDue() {
      return this.zakatableAmount * 0.025;
    },
    nisabThreshold() {
      return this.nisabType === 'gold' ? 85 * this.goldPrice : 595 * this.silverPrice;
    },
    nisabTypeLabel() {
      return this.nisabType === 'gold' ? 'Based on Gold (85g)' : 'Based on Silver (595g)';
    },
    isEligible() {
      return this.zakatableAmount >= this.nisabThreshold;
    },
    isFormValid() {
      return this.validateForm();
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
      if (this.agriculturalProduce < 0) {
        this.errors.agriculturalProduce = 'Amount cannot be negative';
        isValid = false;
      }
      if (this.liabilities < 0) {
        this.errors.liabilities = 'Amount cannot be negative';
        isValid = false;
      }

      return isValid;
    },
    calculateZakat() {
      if (!this.validateForm()) return;

      this.zakatCalculated = true;
      this.saveToLocalStorage();

      this.$nextTick(() => {
        if (window.innerWidth <= 768 && this.$refs.zakatSummary) {
          this.$refs.zakatSummary.scrollIntoView({ behavior: 'smooth' });
        }
        this.renderChart();
      });
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.zakatChart?.getContext('2d');
      if (!ctx) return;

      const assetValues = Object.values(this.assetBreakdown);
      const assetLabels = Object.keys(this.assetBreakdown);

      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [...assetLabels, 'Zakat Due'],
          datasets: [{
            data: [...assetValues, this.zakatDue],
            backgroundColor: [
              '#f1c40f', '#7f8c8d', '#2ecc71', '#3498db',
              '#9b59b6', '#e74c3c', '#27ae60', '#e67e22',
            ],
            borderColor: '#fff',
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${this.currencySymbol}${value.toLocaleString()}`;
                },
              },
            },
          },
          cutout: '60%',
        },
      });
    },
    printSummary() {
      const content = this.$refs.zakatSummary.innerHTML;
      const printWindow = window.open('', '', '');

      printWindow.document.write(`
        <html>
          <head>
            <title>Zakat Summary</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
            <style>
              body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
              .results-card { max-width: 800px; margin: 0 auto; }
              .summary-item { margin-bottom: 20px; }
              .progress { height: 8px; }
              @media print {
                .results-card { border: none; box-shadow: none; }
                .btn { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="results-card">${content}</div>
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
    shareSummary() {
      const summaryText = `
        Zakat Summary
        Currency: ${this.selectedCurrency} (${this.currencySymbol})
        Total Assets: ${this.currencySymbol}${this.totalAssets.toLocaleString()}
        Liabilities: ${this.currencySymbol}${this.liabilities.toLocaleString()}
        Zakatable Amount: ${this.currencySymbol}${this.zakatableAmount.toLocaleString()}
        Zakat Due: ${this.currencySymbol}${this.zakatDue.toLocaleString()}
        Nisab Threshold: ${this.currencySymbol}${this.nisabThreshold.toLocaleString()} (${this.nisabTypeLabel})
        Status: ${this.isEligible ? 'Zakat is Obligatory' : 'Below Nisab'}
      `;

      if (navigator.share) {
        navigator.share({
          title: 'Zakat Calculation Summary',
          text: summaryText,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(summaryText);
        alert('Summary copied to clipboard!');
      }
    },
    resetCalculator() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }

      this.goldGrams = 0;
      this.goldPrice = 0;
      this.silverGrams = 0;
      this.silverPrice = 0;
      this.cash = 0;
      this.investments = 0;
      this.businessAssets = 0;
      this.realEstate = 0;
      this.agriculturalProduce = 0;
      this.liabilities = 0;
      this.zakatCalculated = false;
      this.errors = {};

      localStorage.removeItem('zakatCalculatorData');
    },
    saveToLocalStorage() {
      const data = {
        goldGrams: this.goldGrams,
        goldPrice: this.goldPrice,
        silverGrams: this.silverGrams,
        silverPrice: this.silverPrice,
        cash: this.cash,
        investments: this.investments,
        businessAssets: this.businessAssets,
        realEstate: this.realEstate,
        agriculturalProduce: this.agriculturalProduce,
        liabilities: this.liabilities,
        selectedCurrency: this.selectedCurrency,
        nisabType: this.nisabType,
      };
      localStorage.setItem('zakatData', JSON.stringify(data));
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem('zakatData');
      if (savedData) {
        const data = JSON.parse(savedData);
        Object.assign(this, data);
      }
    },
  },
  watch: {
    goldGrams: 'saveToLocalStorage',
    goldPrice: 'saveToLocalStorage',
    silverGrams: 'saveToLocalStorage',
    silverPrice: 'saveToLocalStorage',
    cash: 'saveToLocalStorage',
    investments: 'saveToLocalStorage',
    businessAssets: 'saveToLocalStorage',
    realEstate: 'saveToLocalStorage',
    agriculturalProduce: 'saveToLocalStorage',
    liabilities: 'saveToLocalStorage',
    selectedCurrency: 'saveToLocalStorage',
    nisabType: 'saveToLocalStorage',
  },
  mounted() {
    this.loadFromLocalStorage();
    this.$refs.zakatCalculator?.focus();
  },
};
</script>

<style scoped>
.zakat-calculator {
  min-height: 100vh;
  padding-bottom: 4rem;
}

.hero-section {
  margin-bottom: 2.5rem;
}

.calculator-card,
.results-card {
  border-radius: 8px;
  overflow: hidden;
}



.section-title::after {
  content: '';
  position: 4px;
  width: 60px;
  height: 4px;
  background: rgb(13, 182, 145);
  border-radius: 8px;
}

.input-group-text {
  min-width: 60px;
  font-weight: 500;
  background-color: #f1f3f5;
}

.summary-item {
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease forwards;
}

/* Responsive Design */
@media (max-width: 992px) {
  .results-card {
    position: static !important;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .input-group-text {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .form-control,
  .form-select {
    font-size: 0.95rem;
  }
}

</style>