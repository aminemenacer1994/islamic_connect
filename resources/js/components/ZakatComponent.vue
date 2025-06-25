<template>
  <div class="zakat-calculator">
    <!-- Hero Section -->
    <div class="hero-section text-center py-4">
      <h1 class="display-4 fw-bold">Zakat Calculator</h1>
      <p class="lead text-muted mx-auto col-md-8">
        Easily calculate your Zakat obligation with our comprehensive tool. Determine if your wealth meets the Nisab
        threshold and calculate the 2.5% Zakat due on your eligible assets. Learn about Zakat and ensure accurate calculations.
      </p>
    </div>
    <div class="container-fluid">
      <div class="row g-4 justify-content-center">
        <div :class="zakatCalculated ? 'col-lg-7' : 'col-lg-9'" class="calculator-column">
          <div class="card shadow-md rounded-4">
            <div class="card-body p-lg-5">
              <!-- Currency and Nisab Selection -->
              <h2 class="mb-4 fw-bold text-dark text-left">Zakat Calculator</h2>

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
              <div class="d-flex flex-column flex-md-row gap-3 mt-5">
                <button class="btn btn-dark flex-fill" :disabled="!isFormValid"
                  :style="{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }"
                  @click="calculateZakat">
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
        <transition name="fade">
          <div class="col-lg-5" ref="zakatSummary" v-if="zakatCalculated">
            <div class="card shadow-md rounded-4 sticky-top">
              <div class="card-body p-4">
                <h2 class="fw-bold text-dark">Zakat Summary</h2>

                <!-- Asset Breakdown -->
                <div class="summary-item mb-4">
                  <h6 class="mb-3 fw-bold">Asset Breakdown</h6>
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
                    <strong class="text-danger">{{ currencySymbol }}{{ totalLiabilities.toLocaleString() }}</strong>
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

                <!-- Zakat Due Breakdown -->
                <div v-if="isEligible" class="summary-item mb-4">
                  <h6 class="mb-3 fw-bold">Zakat Breakdown</h6>
                  <div class="d-flex justify-content-between">
                    <span class="text-muted">On General Assets (2.5%):</span>
                    <strong>{{ currencySymbol }}{{ wealthZakat.toLocaleString() }}</strong>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-muted">On Agricultural Produce:</span>
                    <strong>{{ currencySymbol }}{{ agriculturalZakat.toLocaleString() }}</strong>
                  </div>
                </div>

                <!-- Zakat Due -->
                <div class="summary-item bg-success-light p-3 rounded mb-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1 text-success fw-bold">Total Zakat Due</h6>
                      <h3 class="text-success fw-bold mb-0">{{ currencySymbol }}{{ zakatDue.toLocaleString(undefined, {
                        minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h3>
                    </div>
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 2rem;"></i>
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
                    <i class="bi bi-download me-2"></i><b>Download Summary</b>
                  </button>
                  <button class="btn btn-outline-dark w-100" @click="shareSummary">
                    <i class="bi bi-share me-2"></i><b>Share Summary</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
        this.renderChart();
      });
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.zakatChart?.getContext('2d');
      if (!ctx) return;

      const assetValues = Object.values(this.assetBreakdown).filter(v => v > 0);
      const assetLabels = Object.keys(this.assetBreakdown).filter(k => this.assetBreakdown[k] > 0);

      this.chartInstance = new Chart(ctx, {
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
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const printWindow = window.open('', '', '');

      printWindow.document.write(`
        <html>
          <head>
            <title>Zakat Summary</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 2.5rem;
                color: #333;
                background-color: #fff;
              }
              .print-container {
                max-width: 900px;
                margin: 0 auto;
                padding: 2rem;
                background-color: #fff;
              }
              .header {
                text-align: center;
                margin-bottom: 2.5rem;
                padding-bottom: 1.5rem;
                border-bottom: 2px solid #dee2e6;
              }
              .header h1 {
                font-size: 2.25rem;
                font-weight: 700;
                margin: 0 0 0.5rem 0;
                color: #212529;
              }
              .header p {
                font-size: 1rem;
                color: #6c757d;
                margin: 0;
              }
              .summary-section {
                margin-bottom: 2rem;
                padding: 1.5rem;
                border: 1px solid #e9ecef;
                border-radius: 0.75rem;
                background-color: #f8f9fa;
              }
              .summary-section h6 {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                color: #343a40;
              }
              .summary-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                font-size: 1rem;
                line-height: 1.6;
              }
              .summary-item span:first-child {
                color: #6c757d;
                flex: 0 0 60%;
                padding-right: 1rem;
              }
              .summary-item strong {
                color: #212529;
                flex: 0 0 40%;
                text-align: right;
              }
              .progress {
                height: 8px;
                margin: 1rem 0 1.5rem 0;
                background-color: #e9ecef;
                border-radius: 4px;
              }
              .bg-success-light {
                background-color: #e6f4ea !important;
                border-color: #d4edda !important;
                padding: 1.5rem !important;
              }
              .eligibility-badge {
                text-align: center;
                padding: 1.5rem;
                border-radius: 0.75rem;
                margin: 2rem 0;
                background-color: #f8f9fa;
              }
              .eligibility-badge h5 {
                font-size: 1.3rem;
                margin-bottom: 0.75rem;
                font-weight: 600;
              }
              .eligibility-badge p {
                font-size: 0.9rem;
                margin: 0;
              }
              .chart-container {
                margin: 2.5rem 0;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
              }
              canvas {
                max-width: 100%;
                height: auto;
                display: block;
              }
              @media print {
                body {
                  padding: 1.5cm;
                }
                .print-container {
                  border: none;
                  box-shadow: none;
                  padding: 0;
                }
                .btn, .btn-outline-dark {
                  display: none;
                }
                .header {
                  border-bottom: 1px solid #000;
                  margin-bottom: 2rem;
                }
                .summary-section {
                  border: none;
                  background-color: transparent;
                  page-break-inside: avoid;
                  margin-bottom: 1.5rem;
                  padding: 1rem;
                }
                .chart-container {
                  page-break-inside: avoid;
                  max-width: 350px;
                }
                .progress {
                  background-color: #f0f0f0;
                }
                @page {
                  margin: 1.5cm;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              <div class="header">
                <h1>Zakat Summary</h1>
                <p>Generated on ${currentDate}</p>
              </div>
              ${content}
            </div>
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
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }

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
  },
  watch: {},
  mounted() {
    this.$refs.zakatCalculator?.focus();
  },
};
</script>

<style scoped>
.zakat-calculator {
  min-height: 100vh;
  padding-bottom: 4rem;
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
  color: #0c63e4;
  background-color: #e7f1ff;
}

.summary-item {
  animation: fadeIn 0.5s ease forwards;
}

.bg-success-light {
  background-color: rgba(25, 135, 84, 0.1);
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

@media (min-width: 992px) {
  .results-card {
    position: static !important;
    margin-top: 3rem;
  }
}
</style>