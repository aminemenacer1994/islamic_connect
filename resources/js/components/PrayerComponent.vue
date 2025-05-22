<template>
  <h3 class="text-center fw-bold display-4 py-2 mt-4 mb-2">Prayer Times Calendar</h3>
  <p class="text-center mb-4 lead container">
    Never miss a prayer. Get accurate Salah times for your city, wherever you are. Our system auto-detects your location
    or lets you manually choose.
  </p>

  <div class="container-fluid my-3 d-flex justify-content-center">
    <div class="card shadow p-4 w-100" style="max-width: 1500px;">
      <!-- Input Form -->
      <form @submit.prevent="submitSearch"
        class="container d-flex flex-wrap gap-3 align-items-end justify-content-center mb-4">
        <div class="flex-grow-1">
          <label for="city" class="form-label fw-bold">City</label>
          <input id="city" v-model="city" class="form-control" required />
        </div>

        <div class="flex-grow-1">
          <label for="country" class="form-label fw-bold">Country Code</label>
          <input id="country" v-model="country" class="form-control" required maxlength="2" />
        </div>

        <div class="flex-grow-1">
          <label for="methodSelect">Select Calculation Method:</label>
          <select id="methodSelect" v-model="method" class="form-select">
            <option v-for="(name, id) in methodOptions" :key="id" :value="id">
              {{ name }}
            </option>
          </select>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary px-4">
            <i class="bi bi-search me-2"></i> Search
          </button>
          <button type="button" class="btn btn-outline-secondary px-4" @click="resetFields">
            <i class="bi bi-geo-alt me-2"></i> My Location
          </button>
        </div>
      </form>

      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Fetching prayer times for your location...</p>
      </div>

      <div v-if="prayerData.length && !loading" class="alert alert-light text-center py-2 shadow-sm border-lg">
        <h5 class="text-center fw-semibold stick-top mb-3">
          📅 Timings for {{ monthName }} {{ year }} – {{ city }}, {{ country }}
          {{ useCurrentLocation ? ' (Current Location)' : ' (Search Results)' }}:
        </h5>
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
      </div>

      <div v-if="prayerData.length === 0 && submitted && !loading" class="alert alert-warning text-center mt-4">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        No prayer times found. Please check your city/country or try another method.
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
      latitude: null,
      longitude: null,
      method: '2',
      methodOptions: {
        '0': 'Shia Ithna-Ashari (Jafari)',
        '1': 'University of Islamic Sciences, Karachi',
        '2': 'Islamic Society of North America (ISNA)',
        '3': 'Muslim World League (MWL)',
        '4': 'Umm Al-Qura University, Makkah',
        '5': 'Egyptian General Authority of Survey',
        '7': 'Institute of Geophysics, University of Tehran',
        '8': 'Gulf Region',
        '9': 'Kuwait',
        '10': 'Qatar',
        '11': 'Majlis Ugama Islam Singapura, Singapore',
        '12': 'Union Organization Islamic de France',
        '13': 'Diyanet İşleri Başkanlığı, Turkey',
        '14': 'Spiritual Administration of Muslims of Russia'
      },
      prayerData: [],
      loading: false,
      submitted: false,
      useCurrentLocation: true,
      monthName: '',
      year: ''
    };
  },
  mounted() {
    this.getCurrentLocation();
  },
  methods: {
    formatTime(time) {
      return time ? time.split(' ')[0] : '--:--';
    },
    async getCurrentLocation() {
      if (!navigator.geolocation) {
        this.setDefaultLocation();
        return;
      }
      this.loading = true;
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const location = await this.reverseGeocode(latitude, longitude);
        this.city = location.city;
        this.country = location.country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.useCurrentLocation = true;
        await this.fetchPrayerTimes();
      } catch (err) {
        console.error('Geolocation failed:', err);
        this.setDefaultLocation();
      }
    },
    async reverseGeocode(lat, lon) {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      return {
        city: data.address.city || data.address.town || data.address.village || 'Unknown',
        country: (data.address.country_code || 'us').toUpperCase()
      };
    },
    async fetchPrayerTimes() {
      this.loading = true;
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      this.monthName = date.toLocaleString('default', { month: 'long' });
      this.year = year;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const url = `https://api.aladhan.com/v1/calendar?latitude=${this.latitude}&longitude=${this.longitude}&method=${this.method}&month=${month}&year=${year}&timezonestring=${encodeURIComponent(timezone)}&school=0`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 200 && data.data) {
          this.prayerData = data.data;
        } else {
          this.prayerData = [];
        }
      } catch (err) {
        console.error('Failed to fetch prayer times:', err);
        this.prayerData = [];
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },
    async submitSearch() {
      try {
        this.useCurrentLocation = false;
        const geo = await this.geocodeCityCountry(this.city, this.country);
        this.latitude = geo.lat;
        this.longitude = geo.lon;
        await this.fetchPrayerTimes();
      } catch (err) {
        console.error('Geocoding error:', err);
        this.prayerData = [];
        this.submitted = true;
      }
    },
    async geocodeCityCountry(city, country) {
      const query = `${city}, ${country}`;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.length) throw new Error('Invalid location');
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    },
    formatTime(time) {
      if (!time) return '--:--';
      return time.split(' ')[0].trim(); 
    },
    resetFields() {
      this.useCurrentLocation = true;
      this.getCurrentLocation();
    },
    setDefaultLocation() {
      this.city = 'Nottingham';
      this.country = 'UK';
      this.latitude = 52.9548;
      this.longitude = -1.1581;
      this.useCurrentLocation = false;
      this.fetchPrayerTimes();
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
