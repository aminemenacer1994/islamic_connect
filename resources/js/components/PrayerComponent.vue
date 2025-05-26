<template>
  <div class="prayer-times-app">
    <div class="hero-section">
      <h1 class="main-title">🕌 Prayer Times Calendar</h1>
      <p class="subtitle">
        Never miss a prayer. Get accurate Salah times for your city, wherever you are.
      </p>
    </div>

    <div class="container-fluid my-4 d-flex justify-content-center">
      <div class="main-card shadow-lg p-4 w-100" style="max-width: 1500px;">
        
        <!-- Search Form -->
        <form @submit.prevent="submitSearch" class="search-form mb-4">
          <div class="search-inputs">
            <div class="input-group">
              <label for="city" class="form-label">🏙️ City</label>
              <input 
                id="city" 
                v-model="city" 
                class="form-control city-input" 
                placeholder="Enter your city..."
                required 
              />
            </div>

            <div class="input-group">
              <label for="methodSelect">📖 Calculation Method</label>
              <select id="methodSelect" v-model="method" class="form-select method-select">
                <option v-for="(name, id) in methodOptions" :key="id" :value="id">
                  {{ name }}
                </option>
              </select>
            </div>
          </div>

          <div class="action-buttons">
            <button type="submit" class="btn btn-primary search-btn" :disabled="loading">
              <span v-if="!loading">🔍 Search</span>
              <span v-else>⏳ Searching...</span>
            </button>
            <button 
              type="button" 
              class="btn btn-outline-success location-btn" 
              @click="resetFields"
              :disabled="loading"
            >
              📍 Use My Location
            </button>
          </div>
        </form>

        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p class="loading-text">
            🔄 Fetching prayer times for {{ city || 'your location' }}...
          </p>
        </div>

        <!-- Prayer Times Table -->
        <div v-if="prayerData.length && !loading" class="prayer-times-section">
          <div class="times-header">
            <h3 class="times-title">
              📅 Prayer Times for {{ monthName }} {{ year }}
            </h3>
            <div class="location-info">
              📍 {{ city }}
              <span class="location-badge" :class="useCurrentLocation ? 'current-location' : 'search-location'">
                {{ useCurrentLocation ? 'Current Location' : 'Search Results' }}
              </span>
            </div>
          </div>

          <div class="table-container">
            <table class="prayer-table">
              <thead>
                <tr>
                  <th>📅 Date</th>
                  <th>🌅 Fajr</th>
                  <th>☀️ Sunrise</th>
                  <th>🌞 Dhuhr</th>
                  <th>🌤️ Asr</th>
                  <th>🌅 Maghrib</th>
                  <th>🌙 Isha</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(day, index) in prayerData" 
                  :key="day.date.gregorian.date"
                  :class="{ 'today-row': isToday(day.date.gregorian.date) }"
                >
                  <td class="date-cell">
                    <div class="date-main">{{ formatDate(day.date.gregorian.date) }}</div>
                    <div class="date-hijri">{{ day.date.hijri.day }} {{ day.date.hijri.month.en }}</div>
                  </td>
                  <td class="time-cell">{{ formatTime(day.timings.Fajr) }}</td>
                  <td class="time-cell sunrise">{{ formatTime(day.timings.Sunrise) }}</td>
                  <td class="time-cell">{{ formatTime(day.timings.Dhuhr) }}</td>
                  <td class="time-cell">{{ formatTime(day.timings.Asr) }}</td>
                  <td class="time-cell">{{ formatTime(day.timings.Maghrib) }}</td>
                  <td class="time-cell">{{ formatTime(day.timings.Isha) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="prayerData.length === 0 && submitted && !loading && !error" class="alert alert-warning text-center">
          <div class="alert-icon">⚠️</div>
          <p>No prayer times found. Please check your city or try another calculation method.</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="alert alert-danger text-center">
          <div class="alert-icon">❌</div>
          <p>{{ error }}</p>
          <button class="btn btn-sm btn-outline-danger mt-2" @click="retryLastAction">
            🔄 Try Again
          </button>
        </div>

        <!-- Quick Info -->
        <div class="quick-info mt-4">
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">🕐</div>
              <div class="info-text">
                <h4>Next Prayer</h4>
                <p>{{ getNextPrayer() }}</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-icon">🌍</div>
              <div class="info-text">
                <h4>Method Used</h4>
                <p>{{ methodOptions[method] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrayerTimesCalendar',
  data() {
    return {
      city: '',
      country: '',
      latitude: null,
      longitude: null,
      method: '2', // Default to ISNA
      methodOptions: {
        0: 'Shia Ithna-Ashari (Jafari)',
        1: 'University of Islamic Sciences, Karachi',
        2: 'Islamic Society of North America (ISNA)',
        3: 'Muslim World League (MWL)',
        4: 'Umm Al-Qura University, Makkah',
        5: 'Egyptian General Authority of Survey',
        7: 'Institute of Geophysics, University of Tehran',
        8: 'Gulf Region',
        9: 'Kuwait',
        10: 'Qatar',
        11: 'Majlis Ugama Islam Singapura, Singapore',
        12: 'Union Organization Islamic de France',
        13: 'Diyanet İşleri Başkanlığı, Turkey',
        14: 'Spiritual Administration of Muslims of Russia'
      },
      prayerData: [],
      loading: false,
      submitted: false,
      useCurrentLocation: true,
      monthName: '',
      year: '',
      error: null,
      lastAction: null, // Track last action for retry functionality
    };
  },
  mounted() {
    this.getCurrentLocation();
  },
  methods: {
    formatTime(time) {
      if (!time) return '--:--';
      const timePart = time.split(' ')[0];
      const [hourStr, minuteStr] = timePart.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      const period = hour >= 12 ? 'PM' : 'AM';
      if (hour === 0) {
        hour = 12;
      } else if (hour > 12) {
        hour -= 12;
      }

      return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    },

    isToday(dateStr) {
      const date = new Date(dateStr);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },

    getNextPrayer() {
      if (!this.prayerData.length) return 'Loading...';
      
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      const todayPrayers = this.prayerData.find(day => 
        day.date.gregorian.date === todayStr
      );
      
      if (!todayPrayers) return 'No data for today';

      const prayers = [
        { name: 'Fajr', time: todayPrayers.timings.Fajr },
        { name: 'Dhuhr', time: todayPrayers.timings.Dhuhr },
        { name: 'Asr', time: todayPrayers.timings.Asr },
        { name: 'Maghrib', time: todayPrayers.timings.Maghrib },
        { name: 'Isha', time: todayPrayers.timings.Isha }
      ];

      const now = today.getHours() * 60 + today.getMinutes();
      
      for (const prayer of prayers) {
        const [hours, minutes] = prayer.time.split(' ')[0].split(':');
        const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
        
        if (prayerTime > now) {
          return `${prayer.name} at ${this.formatTime(prayer.time)}`;
        }
      }
      
      return 'All prayers completed for today';
    },

    async getCurrentLocation() {
      this.loading = true;
      this.error = null;
      this.submitted = false;
      this.lastAction = 'getCurrentLocation';

      if (!navigator.geolocation) {
        this.error = 'Geolocation is not supported by your browser. Please enter your city manually.';
        this.setDefaultLocation();
        return;
      }

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
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
        this.error = 'Could not get your current location. Please enter your city manually.';
        this.setDefaultLocation();
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },

    async reverseGeocode(lat, lon) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return {
          city: data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown City',
          country: data.address.country || 'Unknown Country'
        };
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
        throw new Error('Failed to determine city/country from coordinates.');
      }
    },

    async fetchPrayerTimes() {
      this.loading = true;
      this.error = null;
      this.prayerData = [];

      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (!this.latitude || !this.longitude) {
        this.error = 'Latitude and longitude are required to fetch prayer times.';
        this.loading = false;
        this.submitted = true;
        return;
      }

      const url = `https://api.aladhan.com/v1/calendar?latitude=${this.latitude}&longitude=${this.longitude}&method=${this.method}&month=${month}&year=${year}&timezonestring=${encodeURIComponent(userTimezone)}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.code === 200 && data.data && data.data.length > 0) {
          this.prayerData = data.data;
          this.monthName = new Date(this.prayerData[0].date.gregorian.date).toLocaleString('en-US', { month: 'long' });
          this.year = this.prayerData[0].date.gregorian.year;
        } else {
          this.prayerData = [];
          this.error = data.status === 'fail' ? data.data : 'No prayer times found for this location/method.';
        }
      } catch (err) {
        console.error('Failed to fetch prayer times:', err);
        this.prayerData = [];
        this.error = `Failed to fetch prayer times: ${err.message}. Please check your internet connection or try again.`;
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },

    async submitSearch() {
      this.loading = true;
      this.error = null;
      this.prayerData = [];
      this.useCurrentLocation = false;
      this.lastAction = 'submitSearch';

      try {
        if (!this.city) {
          throw new Error('Please enter a city name.');
        }
        const geo = await this.geocodeCity(this.city);
        this.latitude = geo.lat;
        this.longitude = geo.lon;
        await this.fetchPrayerTimes();
      } catch (err) {
        console.error('Geocoding error:', err);
        this.prayerData = [];
        this.error = `Could not find prayer times for "${this.city}". ${err.message}`;
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },

    async geocodeCity(city) {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (!data.length) throw new Error('City not found. Please try a different name or be more specific (e.g., "London, UK").');
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      } catch (error) {
        console.error('Geocoding city failed:', error);
        throw new Error(`Failed to find coordinates for "${city}". ${error.message}`);
      }
    },

    resetFields() {
      this.city = '';
      this.latitude = null;
      this.longitude = null;
      this.prayerData = [];
      this.submitted = false;
      this.error = null;
      this.useCurrentLocation = true;
      this.getCurrentLocation();
    },

    setDefaultLocation() {
      this.city = 'London';
      this.country = 'United Kingdom';
      this.latitude = 51.5074;
      this.longitude = -0.1278;
      this.useCurrentLocation = false;
      this.fetchPrayerTimes();
    },

    retryLastAction() {
      if (this.lastAction === 'getCurrentLocation') {
        this.getCurrentLocation();
      } else if (this.lastAction === 'submitSearch') {
        this.submitSearch();
      }
    }
  }
};
</script>

<style scoped>
.prayer-times-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.hero-section {
  text-align: center;
  padding: 2rem 1rem;
  color: white;
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.main-card {
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-form {
  background: linear-gradient(145deg, #f8f9ff, #e8f0ff);
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.search-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-group label {
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
}

.city-input, .method-select {
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.city-input:focus, .method-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.search-btn, .location-btn {
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}

.search-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.location-btn {
  background: transparent;
  border: 2px solid #48bb78;
  color: #48bb78;
}

.location-btn:hover:not(:disabled) {
  background: #48bb78;
  color: white;
  transform: translateY(-2px);
}

.loading-container {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #667;
  font-size: 1.1rem;
}

.prayer-times-section {
  margin-top: 2rem;
}

.times-header {
  text-align: center;
  margin-bottom: 2rem;
}

.times-title {
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.location-info {
  color: #4a5568;
  font-size: 1.1rem;
}

.location-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: 0.5rem;
}

.current-location {
  background: #c6f6d5;
  color: #22543d;
}

.search-location {
  background: #bee3f8;
  color: #2a4365;
}

.table-container {
  overflow-x: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prayer-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-size: 0.95rem;
}

.prayer-table th {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

.prayer-table td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.prayer-table tr:hover {
  background-color: #f7fafc;
}

.today-row {
  background-color: #fff5f5 !important;
  border-left: 4px solid #f56565;
}

.today-row:hover {
  background-color: #fed7d7 !important;
}

.date-cell {
  text-align: left !important;
}

.date-main {
  font-weight: 600;
  color: #2d3748;
}

.date-hijri {
  font-size: 0.8rem;
  color: #718096;
  margin-top: 0.25rem;
}

.time-cell {
  font-weight: 500;
  font-family: 'Courier New', monospace;
}

.time-cell.sunrise {
  color: #d69e2e;
  font-weight: 600;
}

.alert {
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem 0;
}

.alert-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.quick-info {
  background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  border-radius: 1rem;
  padding: 1.5rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.info-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.info-text h4 {
  margin: 0 0 0.25rem 0;
  color: #2d3748;
  font-size: 1rem;
}

.info-text p {
  margin: 0;
  color: #4a5568;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .search-inputs {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .search-btn, .location-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .prayer-table th,
  .prayer-table td {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .search-form {
    padding: 1rem;
  }
}
</style>