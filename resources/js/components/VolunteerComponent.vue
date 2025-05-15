<template>
  <h3 class="text-center fw-bold display-4 py-3 mb-4">🕌 Prayer Times Calendar</h3>
  <p class="text-center mb-4 lead container">
    Never miss a prayer. Get accurate Salah times for your city, wherever you are. Our system auto-detects your location or lets you manually choose.
  </p>

  <div class="container-fluid my-5 d-flex justify-content-center">
    <div class="card shadow p-4 w-100" style="max-width: 1500px;">
      <!-- Input Form -->
      <form @submit.prevent="getPrayerTimes" class="container d-flex flex-wrap gap-3 align-items-end justify-content-center mb-4">
        <!-- City Input -->
        <div class="flex-grow-1">
          <label for="city" class="form-label fw-bold">City</label>
          <input
            id="city"
            v-model="city"
            class="form-control"
            placeholder="Enter city"
            required
            aria-label="City"
            autofocus
          />
        </div>

        <!-- Method Selector -->
        <div class="flex-grow-1">
          <label for="method" class="form-label fw-bold">Calculation Method</label>
          <select id="method" v-model="method" class="form-select" required>
            <option disabled value="">Select a method</option>
            <option v-for="(name, id) in methods" :key="id" :value="id">{{ name }}</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-success px-4 shadow" :disabled="loading">
            <i class="bi bi-search me-2"></i>
            <span v-if="!loading">Get Times</span>
            <span v-else class="spinner-border spinner-border-sm"></span>
          </button>
          <button type="button" class="btn btn-outline-secondary px-4" @click="resetFields" v-if="submitted">
            Clear All
          </button>
        </div>
      </form>

      <!-- Success Toast -->
      <div v-if="prayerData.length && submitted" class="alert alert-light text-center py-2">
        ✅ Timings for {{ city }} ({{ monthName }} {{ year }})

      <!-- Results Table -->
      <div v-if="prayerData.length" class="table-responsive table-scroll mt-3">
        <h5 class="text-center fw-semibold mb-3">
          📅 {{ monthName }} {{ year }} – {{ city }}
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
            <tr v-for="day in prayerData" :key="day.date.gregorian.date">
              <td class="fw-semibold">{{ day.date.gregorian.date }}</td>
              <td>{{ formatTime(day.timings.Fajr) }}</td>
              <td>{{ formatTime(day.timings.Dhuhr) }}</td>
              <td>{{ formatTime(day.timings.Asr) }}</td>
              <td>{{ formatTime(day.timings.Maghrib) }}</td>
              <td>{{ formatTime(day.timings.Isha) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-if="prayerData.length === 0 && submitted && !loading" class="alert alert-warning text-center mt-4">
        ⚠️ No prayer times found. Please double-check your city or try another method.
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PrayerTimes',
  data() {
    return {
      city: '',
      country: '',
      method: '',
      methods: {},
      prayerData: [],
      monthName: '',
      year: '',
      submitted: false,
      loading: false
    };
  },
  mounted() {
    fetch('https://api.aladhan.com/v1/methods')
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          for (const key in data.data) {
            this.methods[key] = data.data[key].name;
          }
          this.method = Object.keys(this.methods)[0] || '';
        }
      });

    this.getCityFromGeolocation();
  },
  methods: {
    getCityFromGeolocation() {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(data => {
              this.city = data.address.city || data.address.town || data.address.village || 'Nottingham';
              this.country = data.address.country_code?.toUpperCase() || 'UK';
              this.getPrayerTimes();
            });
        },
        () => {
          this.city = 'Nottingham';
          this.country = 'UK';
          this.getPrayerTimes();
        }
      );
    },

    getPrayerTimes() {
      this.submitted = true;
      this.loading = true;
      this.prayerData = [];

      const today = new Date();
      const month = today.getMonth() + 1;
      this.monthName = today.toLocaleString('default', { month: 'long' });
      this.year = today.getFullYear();

      const url = `https://api.aladhan.com/v1/calendarByCity/${this.year}/${month}?city=${encodeURIComponent(this.city)}&country=${encodeURIComponent(this.country)}&method=${this.method}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.prayerData = data.code === 200 ? data.data : [];
        })
        .catch(() => {
          this.prayerData = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    formatTime(time) {
      return time.split(' ')[0];
    },

    resetFields() {
      this.city = '';
      this.country = '';
      this.method = '';
      this.prayerData = [];
      this.submitted = false;
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
