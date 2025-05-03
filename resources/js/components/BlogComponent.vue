<template>
  <div class="container mt-3 p-3">
    <div class="fw-bold display-5 text-center mb-2">Zakat Calculator</div>
    <p class="text-center container mb-4 lead ">
      Easily calculate your annual Zakat with our simple, accurate tool based on your assets and liabilities. This
      calculator helps you determine if you meet the Nisab threshold and how much Zakat (2.5%) you owe on savings, gold,
      silver, business assets, and more.
    </p>
    <hr />

    <!-- Currency and Nisab Selection -->
    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="col-lg-8">
          <div>
            <label class="form-label fw-regular">Currency</label>
            <select class="form-select" v-model="selectedCurrency">
              <option v-for="(symbol, currency) in currencySymbols" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>
          <div>
            <label class="form-label fw-bold">Nisab Standard</label>
            <select class="form-select" v-model="nisabType">
              <option value="gold">Gold (85g)</option>
              <option value="silver">Silver (595g)</option>
            </select>
          </div>


          <form @submit.prevent class="pt-2 g-4">
            <!-- Gold Grams -->
            <div class="col-12 col-md-12">
              <label class="form-label pt-2 fw-bold">Gold (grams)</label>
              <input type="number" class="form-control mb-3" v-model.number="goldGrams"
                placeholder="Enter gold in grams" />
            </div>

            <!-- Gold Price -->
            <div class="col-12 col-md-12">
              <label class="form-label pt-2 fw-bold">Gold Price (per gram)</label>
              <div class="input-group mb-3">
                <span class="input-group-text">£</span>
                <input type="number" class="form-control" v-model.number="goldPrice" placeholder="Price per gram" />
                <span class="input-group-text">.00</span>
              </div>
            </div>

            <!-- Silver Grams -->
            <div class="col-12 col-md-12">
              <label class="form-label fw-bold">Silver (grams)</label>
              <input type="number" class="form-control mb-3" v-model.number="silverGrams"
                placeholder="Enter silver in grams" />
            </div>

            <!-- Silver Price -->
            <div class="col-12 col-md-12">
              <label class="form-label fw-bold">Silver Price (per gram)</label>
              <div class="input-group mb-3">
                <span class="input-group-text">£</span>
                <input type="number" class="form-control" v-model.number="silverPrice" placeholder="Price per gram" />
                <span class="input-group-text">.00</span>
              </div>
            </div>

            <!-- Cash -->
            <div class="col-12 col-md-12">
              <label class="form-label fw-bold">Cash</label>
              <div class="input-group mb-3">
                <span class="input-group-text">£</span>
                <input type="number" class="form-control" v-model.number="cash" placeholder="Enter your cash" />
                <span class="input-group-text">.00</span>
              </div>
            </div>

            <!-- Investments -->
            <div class="col-12 col-md-12">
              <label class="form-label fw-bold">Investments</label>
              <div class="input-group mb-3">
                <span class="input-group-text">£</span>
                <input type="number" class="form-control" v-model.number="investments"
                  placeholder="Investment amount" />
                <span class="input-group-text">.00</span>
              </div>
            </div>

            <!-- Business Assets -->
            <div class="col-12 col-md-12">
              <label class="form-label fw-bold">Business Assets</label>
              <div class="input-group mb-3">
                <span class="input-group-text">£</span>
                <input type="number" class="form-control" v-model.number="businessAssets"
                  placeholder="Business assets value" />
                <span class="input-group-text">.00</span>
              </div>
            </div>

            <!-- Liabilities -->
            <div class="col-12 col-md-12">
              <label class="form-label fw-bold text-danger">Liabilities</label>
              <div class="input-group mb-3">
                <span class="input-group-text">£</span>
                <input type="number" class="form-control" v-model.number="liabilities"
                  placeholder="Enter liabilities" />
                <span class="input-group-text">.00</span>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-primary w-100 w-md-50">Calculate Zakat</button>
            </div>
          </form>




          <!--
          <div class="container pt-3 text-center">
            <div class="row">
              <div class="col">
                <div class="mt-3 text-center">
                  <button class="btn btn-outline-danger" @click="resetCalculator">
                    Reset Calculator
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="mt-3 text-center">
                  <button class="btn btn-outline-primary" @click="printSummary">
                    Download Summary (PDF)
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="mt-3 col-12 text-center">
                  <button type="submit" class="btn btn-outline-success w-50">Calculate Zakat</button>
                </div>
              </div>
            </div>
          </div> 
          -->

        </div>
      </div>



      <!-- Zakat Summary -->
      <div class="col-4 col-lg-4">
        <div id="zakat-summary" class="mt-5 p-4 bg-light rounded shadow-sm">
          <h4 class="text-success mb-4">Zakat Summary</h4>

          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
              <span>Total Assets</span>
              <strong class="text-success">{{ currencySymbol }}{{ totalAssets.toFixed(2) }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
              <span>Liabilities</span>
              <strong class="text-danger">-{{ currencySymbol }}{{ liabilities.toFixed(2) }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
              <span>Zakatable Amount</span>
              <strong class="text-info">{{ currencySymbol }}{{ zakatableAmount.toFixed(2) }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
              <span>Zakat Due (2.5%)</span>
              <strong class="text-primary">{{ currencySymbol }}{{ zakatDue.toFixed(2) }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
              <span>Nisab Threshold ({{ nisabTypeLabel }})</span>
              <strong>{{ currencySymbol }}{{ nisabThreshold.toFixed(2) }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center border-0">
              <span>Obligatory?</span>
              <strong :class="isEligible ? 'text-success' : 'text-muted'">
                <i :class="isEligible ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
                {{ isEligible ? 'Yes, Zakat is due' : 'No, below Nisab' }}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZakatCalculator",
  data() {
    return {
      goldGrams: 0,
      goldPrice: 80,
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
      return this.nisabType === "gold" ? "Gold (85g)" : "Silver (595g)";
    },
    isEligible() {
      return this.zakatableAmount >= this.nisabThreshold;
    },
  },
  methods: {
    printSummary() {
      const content = document.getElementById("zakat-summary").innerHTML;
      const printWindow = window.open("", "", "width=800,height=700");
      printWindow.document.write(`
    <html>
      <head>
        <title>Zakat Summary</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { padding: 20px; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
    resetCalculator() {
      this.goldGrams = 0;
      this.goldPrice = 80;
      this.silverGrams = 0;
      this.silverPrice = 1;
      this.cash = 0;
      this.investments = 0;
      this.businessAssets = 0;
      this.liabilities = 0;
      this.selectedCurrency = "USD";
      this.nisabType = "gold";
      localStorage.removeItem("zakatData");
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
        liabilities: this.liabilities,
        selectedCurrency: this.selectedCurrency,
        nisabType: this.nisabType,
      };
      localStorage.setItem("zakatData", JSON.stringify(data));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("zakatData");
      if (data) {
        const parsed = JSON.parse(data);
        Object.assign(this, parsed);
      }
    },
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
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
#zakat-summary {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#zakat-summary .list-group-item {
  border: none;
  padding: 15px;
  font-size: 1.1rem;
}

#zakat-summary .list-group-item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

#zakat-summary .list-group-item span {
  font-weight: 500;
}

#zakat-summary .list-group-item strong {
  font-weight: 600;
}

#zakat-summary .text-success {
  color: #28a745;
}

#zakat-summary .text-info {
  color: #17a2b8;
}

#zakat-summary .text-primary {
  color: #007bff;
}

#zakat-summary .text-danger {
  color: #dc3545;
}

#zakat-summary .text-muted {
  color: #6c757d;
}

#zakat-summary .bi {
  margin-right: 8px;
}

h4.text-success {
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #28a745;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

input,
select {
  border-radius: 0.375rem;
}
</style>
