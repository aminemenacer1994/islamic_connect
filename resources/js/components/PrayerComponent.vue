<template>
  <h3 class="text-center fw-bold display-4 py-2 mt-4 mb-2">Prayer Times Calendar</h3>
  <p class="text-center mb-4 lead container">
    Get accurate Salah times for any city worldwide. Enter a specific city and country for best results. Times are in the city's local timezone.
  </p>

  <div class="container-fluid my-3 d-flex justify-content-center">
    <div class="card shadow p-4 w-100" style="max-width: 1500px;">
      <form @submit.prevent="getPrayerTimes" class="container d-flex flex-wrap gap-3 align-items-end justify-content-center mb-4" aria-label="Prayer Times Search">
        <div class="flex-grow-1">
          <label for="city" class="form-label fw-bold">City</label>
          <input
            id="city"
            v-model="city"
            class="form-control"
            placeholder="Enter city (e.g., London)"
            required
            aria-label="City name"
            autofocus
          />
        </div>

        <div class="flex-grow-1">
          <label for="country" class="form-label fw-bold">Country</label>
          <input
            id="country"
            v-model="country"
            class="form-control"
            placeholder="Enter country (e.g., UK)"
            required
            aria-label="Country code or name"
          />
        </div>

        <div class="flex-grow-1">
          <label for="method" class="form-label fw-bold">Calculation Method</label>
          <select id="method" v-model="method" class="form-select" required aria-label="Calculation method">
            <option disabled value="">Select a method</option>
            <option value="5">Muslim World League</option>
            <option value="3">ISNA</option>
            <option value="1">Egyptian</option>
            <option value="7">Umm al-Qura</option>
            <option value="4">Karachi</option>
          </select>
        </div>

        <div class="flex-grow-1">
          <label for="school" class="form-label fw-bold">School of Thought</label>
          <select id="school" v-model="school" class="form-select" required aria-label="School of thought">
            <option value="0">Shafi/Maliki/Hambali</option>
            <option value="1">Hanafi</option>
          </select>
        </div>

        <div class="d-flex gap-2 align-items-end">
          <button type="submit" style="background-color: rgb(13, 182, 145); color: white;" class="btn px-4 shadow" :disabled="loading">
            <i class="bi bi-search me-2"></i>
            <span v-if="!loading">Get Times</span>
            <span v-else class="spinner-border spinner-border-sm" role="status" aria-label="Loading"></span>
          </button>
          <button type="button" class="btn btn-outline-secondary px-4" @click="resetFields" v-if="submitted">
            Clear All
          </button>
          <button type="button" class="btn btn-outline-info px-4" @click="showAdjustments = !showAdjustments">
            {{ showAdjustments ? 'Hide' : 'Show' }} Adjustments
          </button>
        </div>
      </form>

      <div v-if="showAdjustments" class="container mb-4">
        <h6 class="fw-bold">Time Adjustments (minutes)</h6>
        <div class="d-flex flex-wrap gap-3">
          <div v-for="prayer in ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']" :key="prayer" class="flex-grow-1">
            <label :for="prayer" class="form-label">{{ prayer }}</label>
            <input
              :id="prayer"
              v-model.number="adjustments[prayer]"
              type="number"
              class="form-control"
              placeholder="0"
              :aria-label="`${prayer} adjustment in minutes`"
            />
          </div>
        </div>
      </div>

      <div v-if="prayerData.length && submitted && !errorMessage" class="alert alert-light text-center py-2 shadow-sm border-lg" role="alert">
        📅 Timings for {{ city }} ({{ monthName }} {{ year }})
      </div>

      <div v-if="errorMessage" class="alert alert-warning text-center mt-4" role="alert">
        ⚠️ {{ errorMessage }}
      </div>

      <div v-if="prayerData.length && !errorMessage" class="table-responsive table-scroll mt-3" aria-live="polite">
        <h5 class="text-center fw-semibold mb-3">
          📅 Timings for {{ monthName }} {{ year }} – {{ city }}
        </h5>
        <table class="table table-hover table-bordered text-center align-middle">
          <thead class="table-secondary sticky-top">
            <tr>
              <th>Date</th>
              <th>Fajr</th>
              <th>Dhuhr</th>
              <th>Asr</th>
              <th>Maghrib</th>
              <th>Isha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in prayerData" :key="day.date" :class="{ 'table-primary': isToday(day.date) }">
              <td class="fw-semibold">{{ formatDate(day.date) }}</td>
              <td>{{ day.fajr }}</td>
              <td>{{ day.dhuhr }}</td>
              <td>{{ day.asr }}</td>
              <td>{{ day.maghrib }}</td>
              <td>{{ day.isha }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrayerTimes',
  data() {
    return {
      city: 'Nottingham',
      country: 'UK',
      method: '5', // Muslim World League
      methods: {
        '5': 'Muslim World League',
        '3': 'ISNA',
        '1': 'Egyptian',
        '7': 'Umm al-Qura',
        '4': 'Karachi'
      },
      school: '0', // 0: Shafi/Maliki/Hambali, 1: Hanafi
      adjustments: {
        Fajr: 0,
        Dhuhr: 0,
        Asr: 0,
        Maghrib: 0,
        Isha: 0
      },
      prayerData: [],
      monthName: '',
      year: '',
      submitted: false,
      loading: false,
      errorMessage: '',
      showAdjustments: false
    };
  },
  mounted() {
    this.getPrayerTimes();
    setInterval(() => {
      const today = new Date();
      const newMonth = today.toLocaleString('default', { month: 'long' });
      const newYear = today.getFullYear();
      if (this.submitted && (newMonth !== this.monthName || newYear !== this.year)) {
        this.getPrayerTimes();
      }
    }, 24 * 60 * 60 * 1000);
  },
  methods: {
    async getPrayerTimes() {
      if (!this.city || !this.country) {
        this.errorMessage = 'Please enter both city and country.';
        this.loading = false;
        this.submitted = true;
        return;
      }

      this.submitted = true;
      this.loading = true;
      this.errorMessage = '';
      this.prayerData = [];

      const today = new Date();
      const month = today.getMonth() + 1;
      this.monthName = today.toLocaleString('default', { month: 'long' });
      this.year = today.getFullYear();

      // Check cache
      const cacheKey = `${this.city}-${this.country}-${this.method}-${this.school}-${this.year}-${this.monthName}`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        this.prayerData = JSON.parse(cachedData);
        this.loading = false;
        return;
      }

      try {
        // Fetch prayer times for each day of the month
        const daysInMonth = new Date(this.year, month, 0).getDate();
        const prayerTimes = [];
        for (let day = 1; day <= daysInMonth; day++) {
          const date = `${this.year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const url = `https://dailyprayer.abdulrcs.repl.co/api/${encodeURIComponent(this.city)}?date=${date}&method=${this.method}&school=${this.school}`;
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          if (data.prayerTimes) {
            prayerTimes.push({
              date,
              fajr: this.applyAdjustment(data.prayerTimes.Fajr, this.adjustments.Fajr),
              dhuhr: this.applyAdjustment(data.prayerTimes.Dhuhr, this.adjustments.Dhuhr),
              asr: this.applyAdjustment(data.prayerTimes.Asr, this.adjustments.Asr),
              maghrib: this.applyAdjustment(data.prayerTimes.Maghrib, this.adjustments.Maghrib),
              isha: this.applyAdjustment(data.prayerTimes.Isha, this.adjustments.Isha)
            });
          }
        }

        if (prayerTimes.length) {
          this.prayerData = prayerTimes;
          localStorage.setItem(cacheKey, JSON.stringify(this.prayerData));
        } else {
          this.errorMessage = 'No prayer times found. Please check your city, country, or try another method.';
        }
      } catch (error) {
        this.errorMessage = `Failed to fetch prayer times: ${error.message}. Please check your connection or city input.`;
        console.error('Fetch error:', error);
      } finally {
        this.loading = false;
      }
    },

    applyAdjustment(time, adjustment) {
      if (!time || !adjustment || typeof time !== 'string') return time || '--:--';
      const [hours, minutes] = time.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) return time;
      const date = new Date(0, 0, 0, hours, minutes + adjustment);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    },

    isToday(dateStr) {
      const today = new Date().toISOString().split('T')[0];
      return dateStr === today;
    },

    resetFields() {
      this.city = 'Nottingham';
      this.country = 'UK';
      this.method = '5';
      this.school = '0';
      this.adjustments = { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
      this.prayerData = [];
      this.submitted = false;
      this.errorMessage = '';
      this.showAdjustments = false;
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.97);
}

.table-scroll {
  max-height: 500px;
  overflow-y: auto;
}

.table-scroll::-webkit-scrollbar {
  width: 6px;
}

.table-scroll::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 10px;
}

thead.sticky-top {
  top: 0;
  z-index: 10;
}

tbody tr:hover {
  background-color: #e8f4ff;
}

@media (max-width: 576px) {
  table thead th,
  table tbody td {
    font-size: 0.85rem;
    padding: 0.4rem;
  }

  .btn {
    font-size: 0.9rem;
  }
}
</style>