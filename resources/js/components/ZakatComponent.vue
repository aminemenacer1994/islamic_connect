<template>
  <div>
    <div class="text-center py-4">
      <h1 class="display-4 fw-bold mb-4">Zakat Calculator</h1>
      <p class="lead text-muted mx-auto">
        Calculate your annual Zakat obligation with our simple, accurate tool. Determine if you meet the Nisab threshold
        and how much Zakat (2.5%) you owe on your assets.
      </p>
    </div>

    <div class="container-fluid">
      <div class="row g-4">
        <!-- Main Calculator Form -->
        <div class="col-lg-8">
          <div class="calculator-card card shadow-md" style="border: 2px solid lightgray; border-radius: 20px;">
            <div class="card-body p-4">
              <!-- Currency and Nisab Selection -->
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="currency" class="form-label fw-semibold"><b>Currency</b></label>
                  <select id="currency" class="form-select" v-model="selectedCurrency">
                    <option v-for="(symbol, currency) in currencySymbols" :key="currency" :value="currency">
                      {{ currency }} ({{ symbol }})
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="nisab" class="form-label fw-semibold"><b>Nisab Standard</b></label>
                  <select id="nisab" class="form-select" v-model="nisabType">
                    <option value="gold">Gold (85g)</option>
                    <option value="silver">Silver (595g)</option>
                  </select>
                </div>
              </div>

              <!-- Asset Inputs -->
              <h5 class="mb-3 fw-semibold text-primary">
                <i class="bi bi-coin me-2"></i>Your Assets
              </h5>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-gem text-warning me-2"></i>Gold
                </label>
                <div class="col-md-4">
                  <input type="number" class="form-control" v-model.number="goldGrams" placeholder="Grams">
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="goldPrice" placeholder="Price per gram">
                  </div>
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-gem text-secondary me-2"></i>Silver
                </label>
                <div class="col-md-4">
                  <input type="number" class="form-control" v-model.number="silverGrams" placeholder="Grams">
                </div>
                <div class="col-md-4">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="silverPrice" placeholder="Price per gram">
                  </div>
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-cash-coin text-success me-2"></i>Cash
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="cash" placeholder="Amount">
                  </div>
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-graph-up text-info me-2"></i>Investments
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="investments" placeholder="Amount">
                  </div>
                </div>
              </div>

              <div class="row mb-3 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-briefcase text-primary me-2"></i>Business Assets
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="businessAssets" placeholder="Amount">
                  </div>
                </div>
              </div>

              <div class="row mb-4 align-items-center">
                <label class="col-md-3 col-form-label">
                  <i class="bi bi-credit-card text-danger me-2"></i>Liabilities
                </label>
                <div class="col-md-9">
                  <div class="input-group">
                    <span class="input-group-text">{{ currencySymbol }}</span>
                    <input type="number" class="form-control" v-model.number="liabilities" placeholder="Amount">
                  </div>
                </div>
              </div>

              <div class="d-flex flex-column flex-md-row gap-3">
                <button class="btn flex-fill" :disabled="isFormEmpty"
                  :style="{ opacity: isFormEmpty ? 0.5 : 1, cursor: isFormEmpty ? 'not-allowed' : 'pointer' }"
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
          <div class="results-card card shadow-md sticky-top container"
            style="border: 2px solid lightgray; border-radius: 20px;">
            <h3 style="font-weight: bold;" class="pt-3 pl-3">Zakat Summary</h3>
            <div class="card-body">
              <div class="summary-item">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Total Assets:</span>
                  <strong class="text-success">{{ currencySymbol }}{{ totalAssets.toLocaleString() }}</strong>
                </div>
                <div class="progress mb-3" style="height: 6px;">
                  <div class="progress-bar bg-success" role="progressbar" :style="{ width: '100%' }"></div>
                </div>
              </div>

              <div class="summary-item">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Liabilities:</span>
                  <strong class="text-danger">{{ currencySymbol }}{{ liabilities.toLocaleString() }}</strong>
                </div>
                <div class="progress mb-3" style="height: 6px;">
                  <div class="progress-bar bg-danger" role="progressbar" :style="{ width: '100%' }"></div>
                </div>
              </div>

              <div class="summary-item">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Zakatable Amount:</span>
                  <strong class="text-primary">{{ currencySymbol }}{{ zakatableAmount.toLocaleString() }}</strong>
                </div>
                <div class="progress mb-3" style="height: 6px;">
                  <div class="progress-bar bg-primary" role="progressbar" :style="{ width: '100%' }"></div>
                </div>
              </div>

              <div class="summary-item bg-light p-3 rounded mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <b class="mb-1">Zakat Due (2.5%)</b><br />
                    <small class="text-muted">Your annual obligation</small>
                    <h4 class="text-success mb-0">{{ currencySymbol }}{{ zakatDue.toLocaleString() }}</h4>
                  </div>
                </div>
              </div>

              <canvas id="zakatChart" width="100%" height="100"></canvas>

              <div class="summary-item">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Nisab Threshold:</span>
                  <strong>{{ currencySymbol }}{{ nisabThreshold.toLocaleString() }}</strong>
                </div>
              </div>

              <div class="eligibility-badge text-center p-3 rounded mt-4"
                :class="isEligible ? 'bg-success-light' : 'bg-light'">
                <h5 :class="isEligible ? 'text-success' : 'text-muted'">
                  <i :class="isEligible ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'" class="me-2"></i>
                  {{ isEligible ? 'Zakat is Obligatory' : 'Below Nisab' }}
                </h5>
                <p class="small mb-0" v-if="isEligible">Your assets meet the Nisab threshold</p>
                <p class="small mb-0" v-else>Your assets don't meet the Nisab threshold</p>
              </div>


              <button class="btn w-100 mt-4" style="background: rgb(13, 182, 145); color: #fff;" @click="printSummary">
                <i class="bi bi-download me-2"></i><b>Download Summary</b>
              </button>
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

  name: "ZakatCalculator",
  data() {
    return {
      chartInstance: null,
      zakatCalculated: false,
      goldGrams: 0,
      goldPrice: 0,
      silverGrams: 0,
      silverPrice: 1,
      cash: 0,
      investments: 0,
      businessAssets: 0,
      liabilities: 0,
      selectedCurrency: "GBP",
      nisabType: "gold",
      currencySymbols: {
        USD: "$",
        GBP: "£",
        EUR: "€",
        SAR: "﷼",
        AED: "د.إ",
        PKR: "₨",
      },
    };
  },
  computed: {
    currencySymbol() {
      return this.currencySymbols[this.selectedCurrency] || "$";
    },
    totalAssets() {
      return (
        this.goldGrams * this.goldPrice +
        this.silverGrams * this.silverPrice +
        this.cash +
        this.investments +
        this.businessAssets
      );
    },
    isFormEmpty() {
      const isEmpty = (val) =>
        val === null || val === undefined || val === '' || parseFloat(val) === 0;
      return (
        this.goldGrams === 0 &&
      this.goldPrice === 0 &&
      this.silverGrams === 0 &&
      this.silverPrice === 0 &&
      this.cash === 0 &&
      this.investments === 0 &&
      this.businessAssets === 0 &&
      this.liabilities === 0
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
      return this.nisabType === "gold"
        ? 85 * this.goldPrice
        : 595 * this.silverPrice;
    },
    nisabTypeLabel() {
      return this.nisabType === "gold" ? "Based on Gold (85g)" : "Based on Silver (595g)";
    },
    isEligible() {
      return this.zakatableAmount >= this.nisabThreshold;
    },
  },
  methods: {
    calculateZakat() {
      // your existing logic...
      this.totalAssets = this.goldGrams * this.goldPrice +
        this.silverGrams * this.silverPrice +
        this.cash + this.investments + this.businessAssets;

      this.zakatableAmount = this.totalAssets - this.liabilities;
      this.zakatDue = this.zakatableAmount * 0.025;

      this.isEligible = this.zakatableAmount >= this.nisabThreshold;
      this.zakatCalculated = true;

      this.$nextTick(() => {
        if (window.innerWidth <= 768 && this.$refs.zakatSummary) {
          this.$refs.zakatSummary.scrollIntoView({ behavior: 'smooth' });
        }
        this.renderChart(); // draw the chart
      });
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy(); // cleanup old chart if it exists
      }

      const ctx = document.getElementById('zakatChart').getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Zakat Due', 'Remaining Wealth'],
          datasets: [{
            data: [this.zakatDue, this.zakatableAmount - this.zakatDue],
            backgroundColor: ['#f6b93b', '#4a69bd'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || '';
                  let value = context.parsed || 0;
                  return `${label}: ${value.toFixed(2)}`;
                }
              }
            }
          }
        }
      });
    },
    printSummary() {
      const content = document.querySelector(".results-card").innerHTML;
      const printWindow = window.open("", "", "");

      printWindow.document.write(`
    <html>
      <head>
        <title>Zakat Summary</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #ffffff;
            color: #333;
            line-height: 1.6;
          }
          .results-card {
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .results-card h1, .results-card h2, .results-card h3, .results-card h4 {
            margin-bottom: 10px;
            font-weight: 600;
          }
          .results-card p, .results-card .content-row {
            margin-bottom: 15px;
          }
          .content-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
          }
          .label {
            font-weight: 500;
            color: #555;
          }
          .value {
            text-align: right;
            color: #000;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table th, table td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          @media print {
            body {
              padding: 0;
              background: white;
            }
            .results-card {
              border: none;
              box-shadow: none !important;
              background-color: white;
            }
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
    resetCalculator() {
      // Your reset logic
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
      this.liabilities = 0;
      this.totalAssets = 0;
      this.zakatableAmount = 0;
      this.zakatDue = 0;
      this.zakatCalculated = false;
    }
  },
  watch: {
    goldGrams: "saveToLocalStorage",
    goldPrice: "saveToLocalStorage",
    silverGrams: "saveToLocalStorage",
    silverPrice: "saveToLocalStorage",
    cash: "saveToLocalStorage",
    investments: "saveToLocalStorage",
    businessAssets: "saveToLocalStorage",
    liabilities: "saveToLocalStorage",
    selectedCurrency: "saveToLocalStorage",
    nisabType: "saveToLocalStorage",
  },
  mounted() {
  },
};
</script>

<style scoped>
.zakat-calculator {
  background-color: #f8fafc;
  min-height: 100vh;
  padding-bottom: 3rem;
}

.hero-section {
  background: linear-gradient(135deg, #f0f7ff 0%, #e1f0ff 100%);
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.calculator-card,
.results-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.calculator-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.section-title {
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: rgb(13, 182, 145);
  border-radius: 3px;
}

.input-group-text {
  min-width: 120px;
  justify-content: flex-start;
  font-weight: 500;
}

.summary-item {
  margin-bottom: 1.5rem;
}

.eligibility-badge {
  transition: all 0.3s ease;
}

.bg-success-light {
  background-color: rgba(25, 135, 84, 0.1);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .results-card {
    position: static !important;
    margin-top: 2rem;
  }

  .input-group-text {
    min-width: 100px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .input-group-text {
    min-width: 90px;
    font-size: 0.9rem;
  }

  .form-control,
  .form-select {
    font-size: 0.9rem;
  }
}

/* Animation for results */
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

.summary-item {
  animation: fadeIn 0.5s ease forwards;
}

.summary-item:nth-child(1) {
  animation-delay: 0.1s;
}

.summary-item:nth-child(2) {
  animation-delay: 0.2s;
}

.summary-item:nth-child(3) {
  animation-delay: 0.3s;
}

.summary-item:nth-child(4) {
  animation-delay: 0.4s;
}

.summary-item:nth-child(5) {
  animation-delay: 0.5s;
}
</style>