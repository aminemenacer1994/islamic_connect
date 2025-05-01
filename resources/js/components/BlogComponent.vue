<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center text-primary">Zakat Calculator</h2>

    <!-- Currency and Nisab Selection -->
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label class="form-label fw-bold">Currency</label>
        <select class="form-select" v-model="selectedCurrency">
          <option v-for="(symbol, currency) in currencySymbols" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold">Nisab Standard</label>
        <select class="form-select" v-model="nisabType">
          <option value="gold">Gold (85g)</option>
          <option value="silver">Silver (595g)</option>
        </select>
      </div>
    </div>

    <!-- Zakat Inputs -->
    <form @submit.prevent class="row g-4">
      <div class="col-md-6">
        <label class="form-label fw-bold">Gold (grams)</label>
        <input type="number" class="form-control" v-model.number="goldGrams" />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold">Gold Price (per gram)</label>
        <input type="number" class="form-control" v-model.number="goldPrice" />
      </div>

      <div class="col-md-6">
        <label class="form-label fw-bold">Silver (grams)</label>
        <input type="number" class="form-control" v-model.number="silverGrams" />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold">Silver Price (per gram)</label>
        <input type="number" class="form-control" v-model.number="silverPrice" />
      </div>

      <div class="col-md-6">
        <label class="form-label fw-bold">Cash</label>
        <input type="number" class="form-control" v-model.number="cash" />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold">Investments</label>
        <input type="number" class="form-control" v-model.number="investments" />
      </div>

      <div class="col-md-6">
        <label class="form-label fw-bold">Business Assets</label>
        <input type="number" class="form-control" v-model.number="businessAssets" />
      </div>

      <div class="col-md-6">
        <label class="form-label fw-bold text-danger">Liabilities</label>
        <input type="number" class="form-control" v-model.number="liabilities" />
      </div>
    </form>

    <!-- Results -->
    <div class="mt-5 p-4 bg-light rounded shadow-sm">
      <h4 class="text-success mb-3">Zakat Summary</h4>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between">
          <span>Total Assets</span>
          <strong>{{ currencySymbol }}{{ totalAssets.toFixed(2) }}</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Liabilities</span>
          <strong class="text-danger">-{{ currencySymbol }}{{ liabilities.toFixed(2) }}</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Zakatable Amount</span>
          <strong>{{ currencySymbol }}{{ zakatableAmount.toFixed(2) }}</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Zakat Due (2.5%)</span>
          <strong class="text-primary">{{ currencySymbol }}{{ zakatDue.toFixed(2) }}</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Nisab Threshold ({{ nisabTypeLabel }})</span>
          <strong>{{ currencySymbol }}{{ nisabThreshold.toFixed(2) }}</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Obligatory?</span>
          <strong :class="isEligible ? 'text-success' : 'text-muted'">
            {{ isEligible ? 'Yes, Zakat is due' : 'No, below Nisab' }}
          </strong>
        </li>
      </ul>
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
      selectedCurrency: "USD",
      nisabType: "gold",
      currencySymbols: {
        USD: "$",
        GBP: "£",
        EUR: "€",
        PKR: "Rs",
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
};
</script>

<style scoped>
input,
select {
  border-radius: 0.375rem;
}
</style>
