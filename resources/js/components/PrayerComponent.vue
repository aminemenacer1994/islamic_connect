<template>
  <h3 class="text-center fw-bold display-4 py-2 mt-4 mb-2">Prayer Times Calendar</h3>
  <p class="text-center mb-4 lead container">
    Never miss a prayer. Get accurate Salah times for your city, wherever you are. Our system auto-detects your location
    or lets you manually choose.
  </p>

  <div class="container-fluid my-3 d-flex justify-content-center">
    <div class="card shadow p-4 w-100" style="max-width: 1500px;">
      <!-- Input Form -->
      <form @submit.prevent="useCurrentLocation = false; getPrayerTimes()"
        class="container d-flex flex-wrap gap-3 align-items-end justify-content-center mb-4">

        <!-- City Input -->
        <div class="flex-grow-1">
          <label for="city" class="form-label fw-bold">City</label>
          <input id="city" v-model="city" class="form-control" required />
        </div>

        <!-- Country Input -->
        <div class="flex-grow-1">
          <label for="country" class="form-label fw-bold">Country Code</label>
          <input id="country" v-model="country" class="form-control" required maxlength="2" />
        </div>

        <!-- Method Selector -->
        <div class="flex-grow-1">
          <label for="method" class="form-label fw-bold">Method</label>
          <select id="method" v-model="method" class="form-select" required>
            <option v-for="(name, id) in methods" :key="id" :value="id">{{ name }}</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary px-4">
            <i class="bi bi-search me-2"></i> Search
          </button>
          <button type="button" class="btn btn-outline-secondary px-4" @click="resetFields">
            <i class="bi bi-geo-alt me-2"></i> My Location
          </button>
        </div>
      </form>


      <div v-if="prayerData.length" class="alert alert-light text-center py-2 shadow-sm border-lg">
        <h5 class="text-center fw-semibold stick-top mb-3">
          📅 Timings for {{ monthName }} {{ year }} – {{ city }}
        </h5>
        <!-- Results Table -->
        <div class="table-responsive table-scroll mt-3">
          <table class="table table-hover table-bordered text-center align-middle">
            <thead class="table-secondary sticky-top">
              <tr>
                <th>Date</th>
                <th>Fajr</th>
                <th>Sunrise</th>
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
                <td>{{ formatTime(day.timings.Sunrise) }}</td>
                <td>{{ formatTime(day.timings.Dhuhr) }}</td>
                <td>{{ formatTime(day.timings.Asr) }}</td>
                <td>{{ formatTime(day.timings.Maghrib) }}</td>
                <td>{{ formatTime(day.timings.Isha) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="loading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Fetching prayer times for your location...</p>
        </div>

        <!-- Error State -->
        <div v-if="prayerData.length === 0 && submitted && !loading" class="alert alert-warning text-center mt-4">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          No prayer times found. Please check your city/country or try another method.
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
      loading: false,
      useCurrentLocation: true, // New flag to track location source
      geolocationAttempted: false
    };
  },
  mounted() {
    this.fetchMethods().then(() => {
      if (this.useCurrentLocation) {
        this.getCurrentLocation();
      }
    });
  },
  methods: {
    async fetchMethods() {
      try {
        const res = await fetch('https://api.aladhan.com/v1/methods');
        const data = await res.json();
        if (data.code === 200) {
          this.methods = Object.fromEntries(
            Object.entries(data.data).map(([key, value]) => [key, value.name])
          );
          this.method = Object.keys(this.methods)[0] || '';
        }
      } catch (error) {
        console.error('Failed to load methods:', error);
        this.methods = { 2: 'Islamic Society of North America (ISNA)' };
        this.method = '2';
      }
    },

    async getCurrentLocation() {
      if (!navigator.geolocation) {
        this.setDefaultLocation();
        return;
      }

      this.geolocationAttempted = true;
      this.loading = true;

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000
          });
        });

        const { latitude, longitude } = position.coords;
        const location = await this.reverseGeocode(latitude, longitude);
        this.city = location.city;
        this.country = location.country;
        this.useCurrentLocation = true;
        this.getPrayerTimes();
      } catch (error) {
        console.error('Location error:', error);
        this.setDefaultLocation();
      }
    },

    async reverseGeocode(lat, lon) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      return {
        city: data.address.city || data.address.town || data.address.village || 'Unknown',
        country: (data.address.country_code || 'us').toUpperCase()
      };
    },

    setDefaultLocation() {
      this.city = '';
      this.country = '';
      this.useCurrentLocation = false;
      this.getPrayerTimes();
    },

    async getPrayerTimes() {
      if (!this.city || !this.country || !this.method) return;

      this.submitted = true;
      this.loading = true;
      this.prayerData = [];

      try {
        const today = new Date();
        const month = today.getMonth() + 1;
        this.monthName = today.toLocaleString('default', { month: 'long' });
        this.year = today.getFullYear();

        const url = `https://api.aladhan.com/v1/calendarByCity/${this.year}/${month}?city=${encodeURIComponent(this.city)}&country=${encodeURIComponent(this.country)}&method=${this.method}`;

        const res = await fetch(url);
        const data = await res.json();

        this.prayerData = data.code === 200 ? data.data : [];
      } catch (error) {
        console.error('Error:', error);
        this.prayerData = [];
      } finally {
        this.loading = false;
      }
    },

    resetFields() {
      this.useCurrentLocation = true;
      this.getCurrentLocation();
    },

    formatTime(time) {
      return time ? time.split(' ')[0] : '--:--';
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
