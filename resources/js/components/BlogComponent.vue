<template>
  <div class="container my-5">
    <div class="zakat-header text-center mb-5">
      <h2 class="fw-bold">🧮 Zakat Calculator</h2>
      <p class="text-muted">Calculate your annual zakat with precision and ease</p>
    </div>

    <!-- Nisab Section -->
    <div class="card zakat-card mb-4 shadow-sm animate-fade">
      <div class="card-body">
        <h5 class="card-title mb-3">💰 Nisab Threshold</h5>
        <div class="d-flex flex-wrap gap-3 align-items-center mb-3">
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="nisabType" value="gold" id="nisabGold" />
            <label class="form-check-label" for="nisabGold">Gold (87.48g)</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="nisabType" value="silver" id="nisabSilver" />
            <label class="form-check-label" for="nisabSilver">Silver (612.36g)</label>
          </div>
          <div class="input-group w-auto">
            <span class="input-group-text">Price/g</span>
            <input type="number" v-model.number="pricePerGram" class="form-control" />
            <button class="btn btn-outline-primary" @click="fetchMockPrice">Auto Update</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Assets -->
    <div class="card zakat-card mb-4 shadow-sm animate-fade">
      <div class="card-body">
        <h5 class="card-title mb-3">📈 Zakatable Assets</h5>
        <div v-for="(value, key) in assets" :key="key" class="mb-3">
          <label class="form-label">{{ formatLabel(key) }}</label>
          <input type="number" v-model.number="assets[key]" class="form-control" />
        </div>
      </div>
    </div>

    <!-- Liabilities -->
    <div class="card zakat-card mb-4 shadow-sm animate-fade">
      <div class="card-body">
        <h5 class="card-title mb-3">📉 Liabilities</h5>
        <div v-for="(value, key) in liabilities" :key="key" class="mb-3">
          <label class="form-label">{{ formatLabel(key) }}</label>
          <input type="number" v-model.number="liabilities[key]" class="form-control" />
        </div>
      </div>
    </div>

    <!-- Result Summary -->
    <div class="card zakat-card bg-light border-0 shadow-lg p-4 animate-fade" id="summary">
      <div class="card-body">
        <h5 class="card-title mb-4">📝 Summary</h5>
        <ul class="list-group list-group-flush mb-3">
          <li class="list-group-item d-flex justify-content-between">
            <span>Total Assets:</span>
            <strong>{{ totalAssets }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total Liabilities:</span>
            <strong>{{ totalLiabilities }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Net Assets:</span>
            <strong>{{ netAssets }}</strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Nisab Threshold:</span>
            <strong>{{ nisabThreshold }}</strong>
          </li>
        </ul>
        <div class="alert" :class="zakatDue > 0 ? 'alert-success' : 'alert-warning'">
          <strong v-if="zakatDue > 0">Zakat Due (2.5%):</strong>
          <strong v-else>No Zakat Due:</strong>
          <span class="ms-2">{{ zakatDue }}</span>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button @click="resetForm" class="btn btn-outline-secondary">Reset</button>
          <button @click="saveToLocal" class="btn btn-outline-success">💾 Save</button>
          <button @click="loadFromLocal" class="btn btn-outline-info">📂 Load</button>
          <button @click="printPDF" class="btn btn-outline-primary">🖨️ Export PDF</button>
          <button @click="exportExcel" class="btn btn-outline-warning">📊 Export Excel</button>
          <button @click="emailReport" class="btn btn-outline-danger">📧 Email Report</button>
        </div>
      </div>
    </div>

    <!-- Growth Chart Section -->
    <div class="card zakat-card mb-4 shadow-sm animate-fade">
      <div class="card-body">
        <h5 class="card-title mb-3">📈 Asset Growth</h5>
        <canvas id="growthChart" width="400" height="200"></canvas>
      </div>
    </div>

    <!-- Language Switch Section -->
    <div class="card zakat-card mb-4 shadow-sm animate-fade">
      <div class="card-body">
        <h5 class="card-title mb-3">🌍 Language Switch</h5>
        <select v-model="language" class="form-select">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto'; // For growth chart

export default {
  name: "ZakatCalculator",
  data() {
    return {
      nisabType: "gold",
      pricePerGram: 90,
      assets: {
        cash: 0,
        gold: 0,
        silver: 0,
        businessAssets: 0,
        investments: 0,
        rentalIncome: 0,
        receivables: 0
      },
      liabilities: {
        debts: 0,
        bills: 0,
        loans: 0
      },
      language: 'en'
    };
  },
  computed: {
    nisabThreshold() {
      const weight = this.nisabType === "gold" ? 87.48 : 612.36;
      return (weight * this.pricePerGram).toFixed(2);
    },
    totalAssets() {
      return Object.values(this.assets).reduce((a, b) => a + b, 0).toFixed(2);
    },
    totalLiabilities() {
      return Object.values(this.liabilities).reduce((a, b) => a + b, 0).toFixed(2);
    },
    netAssets() {
      return (this.totalAssets - this.totalLiabilities).toFixed(2);
    },
    zakatDue() {
      const net = this.totalAssets - this.totalLiabilities;
      return net >= this.nisabThreshold ? (net * 0.025).toFixed(2) : 0;
    }
  },
  methods: {
    formatLabel(key) {
      return key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
    },
    resetForm() {
      for (let key in this.assets) this.assets[key] = 0;
      for (let key in this.liabilities) this.liabilities[key] = 0;
      this.pricePerGram = 90;
      this.nisabType = "gold";
      localStorage.removeItem("zakatData");
    },
    saveToLocal() {
      const data = {
        nisabType: this.nisabType,
        pricePerGram: this.pricePerGram,
        assets: this.assets,
        liabilities: this.liabilities
      };
      localStorage.setItem("zakatData", JSON.stringify(data));
      alert("Zakat data saved successfully!");
    },
    loadFromLocal() {
      const saved = localStorage.getItem("zakatData");
      if (saved) {
        const data = JSON.parse(saved);
        this.nisabType = data.nisabType;
        this.pricePerGram = data.pricePerGram;
        this.assets = data.assets;
        this.liabilities = data.liabilities;
        alert("Zakat data loaded!");
      } else {
        alert("No saved data found.");
      }
    },
    printPDF() {
      const doc = new jsPDF();
      doc.text("Zakat Summary", 10, 10);
      doc.text(`Total Assets: ${this.totalAssets}`, 10, 20);
      doc.text(`Total Liabilities: ${this.totalLiabilities}`, 10, 30);
      doc.text(`Net Assets: ${this.netAssets}`, 10, 40);
      doc.text(`Nisab Threshold: ${this.nisabThreshold}`, 10, 50);
      doc.text(`Zakat Due: ${this.zakatDue}`, 10, 60);
      doc.save("Zakat_Calculator_Report.pdf");
    },
    exportExcel() {
      const zakatData = [
        ["Item", "Amount"],
        ["Total Assets", this.totalAssets],
        ["Total Liabilities", this.totalLiabilities],
        ["Net Assets", this.netAssets],
        ["Nisab Threshold", this.nisabThreshold],
        ["Zakat Due", this.zakatDue]
      ];
      const ws = XLSX.utils.aoa_to_sheet(zakatData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Zakat Report");
      XLSX.writeFile(wb, "Zakat_Report.xlsx");
    },
    emailReport() {
      alert("Email functionality coming soon!");
    },
    fetchMockPrice() {
      this.pricePerGram = 80; // Mock price update
    }
  },
  mounted() {
    // Chart.js Setup for Growth Chart
    const ctx = document.getElementById('growthChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Assets Over Time',
          data: [10000, 12000, 13000, 15000, 17000],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
};
</script>

<style scoped>
.zakat-card {
  border-radius: 10px;
}

.animate-fade {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
}

.container {
  max-width: 1200px;
}

.shadow-sm {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="number"] {
  padding: 10px;
  font-size: 1rem;
}
</style>
