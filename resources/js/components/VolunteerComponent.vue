<template>
  <div class=" my-5 d-flex justify-content-center">
    <div class="card shadow p-4 w-100" style="max-width: 900px; border-radius: 1rem; background: #ffffffdd;">
      <h2 class="text-center mb-4 fw-bold" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        🕌 Prayer Times Calendar
      </h2>

      <!-- Input Form -->
      <form @submit.prevent="getPrayerTimes" class="row g-3 align-items-center mb-4">
        <!-- City Input -->
        <div class="col-md-6 mx-auto">
          <label for="city" class="form-label fw-semibold">City</label>
          <div class="input-group">
            <span class="input-group-text bg-primary text-white"><i class="bi bi-geo-alt-fill"></i></span>
            <input
              type="text"
              id="city"
              v-model="city"
              class="form-control"
              placeholder="Enter city"
              required
              aria-label="City"
            />
          </div>
        </div>

        <!-- Method Selector -->
        <div class="col-md-6 mx-auto">
          <label for="method" class="form-label fw-semibold">Calculation Method</label>
          <select
            id="method"
            v-model="method"
            class="form-select"
            required
            aria-label="Calculation Method"
          >
            <option disabled value="">Select a method</option>
            <option v-for="(name, id) in methods" :key="id" :value="id">{{ name }}</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="col-12 d-flex justify-content-center mt-3">
          <button
            type="submit"
            class="btn btn-primary btn-lg px-5 shadow"
            :disabled="loading"
            aria-label="Get Prayer Times"
          >
            <span v-if="!loading">Get Prayer Times</span>
            <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </div>
      </form>

      <!-- Result Table -->
      <div v-if="prayerData.length" class="table-responsive" style="max-height: 500px; overflow-y: auto;">
        <h5 class="text-center mb-3 fw-semibold" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          📅 {{ monthName }} {{ year }} – {{ city }}, {{ country }}
        </h5>

        <table class="table table-striped table-hover table-bordered align-middle text-center">
          <thead class="table-primary sticky-top">
            <tr>
              <th scope="col" style="min-width: 100px;">Date</th>
              <th scope="col" style="min-width: 80px;">Fajr</th>
              <th scope="col" style="min-width: 80px;">Dhuhr</th>
              <th scope="col" style="min-width: 80px;">Asr</th>
              <th scope="col" style="min-width: 80px;">Maghrib</th>
              <th scope="col" style="min-width: 80px;">Isha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in prayerData" :key="day.date.gregorian.date" class="align-middle">
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

      <!-- No Results / Error Message -->
      <div v-if="prayerData.length === 0 && submitted && !loading" class="alert alert-warning text-center mt-4">
        ⚠️ No prayer times found. Please double-check your city and method.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrayerTimes',
  data() {
    return {
      city: '',        // City input
      country: 'UK',   // Default country fallback
      method: '',      // Calculation method
      methods: {},     // Available methods from API
      prayerData: [],
      monthName: '',
      year: '',
      submitted: false,
      loading: false
    };
  },
  mounted() {
    // Load methods from API
    fetch('https://api.aladhan.com/v1/methods')
      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          this.methods = {};
          for (const key in data.data) {
            this.methods[key] = data.data[key].name;
          }
          // Set default method to the first one
          this.method = Object.keys(this.methods)[0] || '';
        }
      })
      .catch(() => {
        this.methods = {};
      });

    // Try to get location city and country on load
    this.getCityFromGeolocation();
  },
  methods: {
    getCityFromGeolocation() {
      if (!navigator.geolocation) {
        // Geolocation unsupported fallback
        this.city = 'Nottingham';
        this.country = 'UK';
        this.getPrayerTimes();
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(data => {
              if (data.address) {
                this.city = data.address.city || data.address.town || data.address.village || 'Nottingham';
                this.country = data.address.country_code ? data.address.country_code.toUpperCase() : 'UK';
              } else {
                this.city = 'Nottingham';
                this.country = 'UK';
              }
              this.getPrayerTimes();
            })
            .catch(() => {
              this.city = 'Nottingham';
              this.country = 'UK';
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

      const city = encodeURIComponent(this.city.trim());
      const country = encodeURIComponent(this.country.trim());
      const method = this.method;

      const url = `https://api.aladhan.com/v1/calendarByCity/${this.year}/${month}?city=${city}&country=${country}&method=${method}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            this.prayerData = data.data;
          } else {
            this.prayerData = [];
          }
        })
        .catch(() => {
          this.prayerData = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    formatTime(time) {
      // Remove timezone info e.g. "05:00 (BST)" → "05:00"
      return time.split(' ')[0];
    }
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

thead.sticky-top {
  top: 0;
  z-index: 10;
}

tbody tr:hover {
  background-color: #d1e7fd;
  cursor: default;
}

.input-group-text i {
  font-size: 1.25rem;
}

.btn-primary:hover {
  background-color: #004085;
  border-color: #004085;
}

@media (max-width: 575.98px) {
  table thead th,
  table tbody td {
    font-size: 0.8rem;
    padding: 0.3rem 0.4rem;
  }
}
</style>
