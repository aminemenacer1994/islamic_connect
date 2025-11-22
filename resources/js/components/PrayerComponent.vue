<template>
  <section class="text-center py-4">
    <h2 class="fw-bold display-5 display-md-4 mb-2">Prayer Times Calendar</h2>
    <p class="hero-subtitle mx-auto mb-4 px-3 px-md-0">
      Never miss a prayer. Get accurate Salah times for your city, wherever you are. Our system auto-detects your
      location
      or lets you manually choose.
    </p>
  </section>

  <div class="container" style="padding: 10px;">
    <div class="mx-auto mb-4" style="
          position: relative;
          background: #eaf3f1;
          border: 1px solid rgba(11, 128, 111, 0.20);
          border-radius: 24px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09);
          padding: 1.25rem 1.75rem;
        ">
      <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
        :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'" @click="toggleNextStepMinimized"
        style="position: absolute; right: 44px; top: 14px; opacity: 0.9; background: transparent; border: 0; color: #6b8b91; z-index: 3; cursor: pointer;">
        <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
      </button>
      <div class="d-flex align-items-start gap-3 text-start">
        <div class="flex-shrink-0 mt-1">
          <div class="next-step-icon-circle" role="img" aria-label="Gentle prayer time guide" style="
              width: 48px; height: 48px;
              border-radius: 50%;
              background: linear-gradient(145deg, rgba(11, 128, 111, 0.24), rgba(26, 95, 122, 0.12));
              display: flex; align-items: center; justify-content: center;
              color: rgb(0, 121, 107); font-size: 1.25rem;
              box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.24), 0 6px 16px rgba(26,95,122,0.12);
            ">
            <i class="fas fa-clock" aria-hidden="true"></i>
          </div>
        </div>
        <div style="flex:1;">
          <p class="mb-2 fw-semibold text-uppercase" style="letter-spacing: 0.1em; color: #1a5f7a; font-size: 0.78rem;">
            NEXT STEP
          </p>
          <!-- Minimized teaser -->
          <div v-show="nextStepMinimized" class="mb-2 d-inline-flex align-items-center gap-1" style="color: #1f2933;">
            <a href="/qibla" class="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
              style="color:rgb(0, 121, 107);" aria-label="Open the Prayer Times companion">
              Search for Qibla
              <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"
                style="color:rgb(0, 121, 107); font-size: 0.82rem; opacity: 0.85;"></i>
            </a>
          </div>
          <p v-show="!nextStepMinimized" class="mb-3" style="color: #1f2933; line-height: 1.7; font-size: 1.02rem;">
            New to Islam and relying on these Salah schedules? Take the next gentle step by visiting our Qibla finder.
            Visit Qibla Finder whenever you’re ready to align your heart and compass.
            <a href="/qibla" class="fw-semibold text-decoration-none" style="color:rgb(0, 121, 107);">
              Compass Guidance
            </a>
            whenever you’re ready to plan the day.
          </p>
          <div v-show="!nextStepMinimized" class="d-flex flex-wrap gap-2">
            <a href="/qibla" class="btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center" style="
                background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);
                border: none; border-radius: 999px;
                box-shadow: 0 10px 20px rgba(26, 95, 122, 0.22);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                "
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 26px rgba(26, 95, 122, 0.26)';"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.22)';">
              <span>Compass Guidance</span>
              <i class="fas fa-globe ms-2" aria-hidden="true"></i>
              <span class="visually-hidden">Open the accessible Prayer Times experience</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container d-flex justify-content-center">
    <div class="card shadow p-4 w-100">
      <!-- Input Form -->
      <form @submit.prevent="submitSearch"
        class="container d-flex flex-wrap gap-3 align-items-end justify-content-center mb-4">
        <div class="flex-grow-1 position-relative">
          <label for="city" class="form-label fw-bold">City</label>
          <input id="city" v-model="city" class="form-control" required autocomplete="off" @input="onCityInput"
            @focus="showCitySuggestions = true" @blur="hideCitySuggestions" />
          <ul v-if="showCitySuggestions && citySuggestions.length"
            class="list-group position-absolute w-100 z-3 suggestions-dropdown">
            <li v-for="suggestion in citySuggestions" :key="suggestion.display_name"
              class="list-group-item list-group-item-action" @mousedown.prevent="selectCitySuggestion(suggestion)">
              {{ suggestion.display_name }}
            </li>
          </ul>
        </div>

        <div class="flex-grow-1">
          <label for="country" class="form-label fw-bold">Country</label>
          <select id="country" v-model="country" class="form-select" required>
            <option value="" disabled>Select Country</option>
            <option v-for="c in countryList" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="flex-grow-1">
          <label for="methodSelect">Select Calculation Method:</label>
          <select id="methodSelect" v-model="method" class="form-select">
            <option v-for="(name, id) in methodOptions" :key="id" :value="id">
              {{ name }}
            </option>
          </select>
        </div>

        <div class="flex-grow-1">
          <label for="schoolSelect">Asr Juristic Method:</label>
          <select id="schoolSelect" v-model.number="school" class="form-select">
            <option :value="0">Shafi, Maliki, Hanbali (Standard)</option>
            <option :value="1">Hanafi (Later Asr)</option>
          </select>
        </div>

        <div class="flex-grow-1">
          <label for="latAdjSelect">High Latitude Adjustment:</label>
          <select id="latAdjSelect" v-model.number="latitudeAdjustmentMethod" class="form-select">
            <option :value="0">None</option>
            <option :value="1">Middle of the Night</option>
            <option :value="2">One Seventh of the Night</option>
            <option :value="3">Angle Based</option>
          </select>
        </div>

        <div class="action-row mt-3 w-100 flex-wrap">
          <button type="submit" class="premium-action-button premium-action-button--primary"
            aria-label="Search for prayer times">
            <span class="action-row__icon"><i class="bi bi-search text-white" aria-hidden="true"></i></span>
            <span class="action-row__label">Search</span>
          </button>
          <button type="button" class="premium-action-button premium-action-button--outline" @click="resetFields"
            aria-label="Use my current location">
            <span class="action-row__icon"><i class="bi bi-geo-alt" aria-hidden="true"></i></span>
            <span class="action-row__label">My Location</span>
          </button>
        </div>
      </form>

      <div v-if="errorMessage" class="alert alert-danger text-center my-2">{{ errorMessage }}</div>

      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Fetching prayer times for your location...</p>
      </div>

      <div v-if="prayerData.length && !loading" class="alert alert-light text-center py-2 shadow-sm border-lg">
        📅 Timings for {{ monthName }} {{ year }} – {{ city }}
        {{ useCurrentLocation ? ' (Current Location)' : ' (Search Results)' }}
        <div class="table-responsive table-scroll mt-3">
          <table class="table table-hover table-bordered text-center align-middle prayer-times-table">
            <thead class="table-secondary sticky-top" v-once>
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
              <tr v-for="day in prayerRows" :key="day.date">
                <td class="fw-semibold">{{ day.date }}</td>
                <td>{{ day.fajr }}</td>
                <td>{{ day.sunrise }}</td>
                <td>{{ day.dhuhr }}</td>
                <td>{{ day.asr }}</td>
                <td>{{ day.maghrib }}</td>
                <td>{{ day.isha }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="prayerRows.length === 0 && submitted && !loading && !errorMessage"
        class="alert alert-warning text-center mt-4">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        No prayer times found. Please check your city/country or try another method.
      </div>
    </div>
  </div>
</template>

<script>
// Debounce utility
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Static constants (non-reactive)
const COUNTRY_LIST = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
  'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
  'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const METHOD_OPTIONS = {
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
};

export default {
  name: 'PrayerTimes',
  data() {
    return {
      city: '',
      country: '',
      countryList: COUNTRY_LIST,
      citySuggestions: [],
      showCitySuggestions: false,
      latitude: null,
      longitude: null,
      debugInfo: '',
      method: '2',
      methodOptions: METHOD_OPTIONS,
      // Raw API data (kept minimal usage)
      prayerData: [],
      // Preformatted rows for rendering
      prayerRows: [],
      loading: false,
      submitted: false,
      useCurrentLocation: true,
      monthName: '',
      year: '',
      errorMessage: '',
      nextStepMinimized: false,
      // Asr juristic method (0: Shafi et al., 1: Hanafi)
      school: 0,
      // High latitude adjustment method (0 none, 1 middle, 2 one-seventh, 3 angle-based)
      latitudeAdjustmentMethod: 3,
      // Timezone reported by API for accurate display
      apiTimezone: '',
      // Internal caches/non-reactive helpers
      _geoCache: new Map(),
      _abortCity: null
    };
  },
  mounted() {
    // Load user preferences from localStorage if available
    const savedCity = localStorage.getItem('prayer_city');
    const savedCountry = localStorage.getItem('prayer_country');
    const savedMethod = localStorage.getItem('prayer_method');
    const savedSchool = localStorage.getItem('prayer_school');
    const savedLatAdj = localStorage.getItem('prayer_latAdj');
    const savedLat = localStorage.getItem('prayer_lat');
    const savedLon = localStorage.getItem('prayer_lon');
    const savedTZ = localStorage.getItem('prayer_tz');
    if (savedCity && savedCountry && savedMethod) {
      this.city = savedCity;
      this.country = savedCountry;
      this.method = savedMethod;
      if (savedSchool !== null) this.school = Number(savedSchool);
      if (savedLatAdj !== null) this.latitudeAdjustmentMethod = Number(savedLatAdj);
      this.useCurrentLocation = false;
      // Reuse saved coordinates if present to skip geocoding
      if (savedLat && savedLon) {
        this.latitude = Number(savedLat);
        this.longitude = Number(savedLon);
        if (savedTZ) this.apiTimezone = savedTZ;
        this.fetchPrayerTimes();
      } else {
        // Try to geocode and fetch prayer times for saved location
        this.submitSearch();
      }
    } else {
      this.getCurrentLocation();
    }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    formatTime(time) {
      if (!time) return '--:--';
      // If API returns ISO8601, format reliably using locale
      if (typeof time === 'string' && time.includes('T')) {
        const d = new Date(time);
        if (isNaN(d)) return '--:--';
        const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
        try {
          // Format using the target city's timezone from API
          return new Intl.DateTimeFormat([], { ...opts, timeZone: this.apiTimezone || undefined }).format(d);
        } catch (_) {
          return d.toLocaleTimeString([], opts);
        }
      }
      // Fallback for older string format like "05:30 (+01)"
      const clean = String(time).split(' ')[0];
      const [hourStr, minuteStr] = clean.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      if (Number.isNaN(hour) || Number.isNaN(minute)) return '--:--';
      const period = hour >= 12 ? 'PM' : 'AM';
      if (hour === 0) hour = 12;
      else if (hour > 12) hour -= 12;
      return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
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
        // persist coordinates and timezone when available
        localStorage.setItem('prayer_lat', String(latitude));
        localStorage.setItem('prayer_lon', String(longitude));
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
        country: (data.address.country || 'United Kingdom')
      };
    },
    async fetchPrayerTimes() {
      this.loading = true;
      this.errorMessage = '';
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // Let Aladhan detect timezone from coordinates to avoid forcing browser TZ
      const url = `https://api.aladhan.com/v1/calendar?latitude=${this.latitude}&longitude=${this.longitude}&method=${Number(this.method)}&month=${month}&year=${year}&school=${this.school}&latitudeAdjustmentMethod=${this.latitudeAdjustmentMethod}&iso8601=true`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 200 && data.data) {
          this.prayerData = data.data;
          if (data.data.length > 0) {
            const gregorian = data.data[0].date.gregorian;
            this.monthName = gregorian.month.en;
            this.year = gregorian.year;
            // Capture API timezone for proper display formatting
            if (data.data[0].meta && data.data[0].meta.timezone) {
              this.apiTimezone = data.data[0].meta.timezone;
            } else if (data.meta && data.meta.timezone) {
              this.apiTimezone = data.meta.timezone;
            }
            // Persist timezone for reuse
            if (this.apiTimezone) localStorage.setItem('prayer_tz', this.apiTimezone);
            // Preformat rows for faster rendering
            const fmt = (t) => this.formatTime(t);
            this.prayerRows = data.data.map((d) => ({
              date: d.date.gregorian.date,
              fajr: fmt(d.timings.Fajr),
              sunrise: fmt(d.timings.Sunrise),
              dhuhr: fmt(d.timings.Dhuhr),
              asr: fmt(d.timings.Asr),
              maghrib: fmt(d.timings.Maghrib),
              isha: fmt(d.timings.Isha)
            }));
          }
        } else {
          this.prayerData = [];
          this.prayerRows = [];
        }
      } catch (err) {
        this.errorMessage = 'Failed to fetch prayer times. Please try again.';
        this.prayerData = [];
        this.prayerRows = [];
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },
    async submitSearch() {
      this.errorMessage = '';
      if (!this.city || !this.country) {
        this.errorMessage = 'Please enter both city and country.';
        return;
      }
      // Save user preferences to localStorage
      localStorage.setItem('prayer_city', this.city);
      localStorage.setItem('prayer_country', this.country);
      localStorage.setItem('prayer_method', String(this.method));
      localStorage.setItem('prayer_school', String(this.school));
      localStorage.setItem('prayer_latAdj', String(this.latitudeAdjustmentMethod));
      try {
        this.useCurrentLocation = false;
        const geo = await this.geocodeCity(this.city, this.country);
        this.latitude = geo.lat;
        this.longitude = geo.lon;
        if (geo.country) {
          this.country = geo.country;
        }
        // persist coordinates for future sessions
        localStorage.setItem('prayer_lat', String(this.latitude));
        localStorage.setItem('prayer_lon', String(this.longitude));
        await this.fetchPrayerTimes();
      } catch (err) {
        this.errorMessage = 'Could not find the specified city/country. Please try again.';
        this.prayerData = [];
        this.prayerRows = [];
        this.submitted = true;
      }
    },
    async geocodeCity(city, country = '') {
      let query = city;
      if (country) query += ', ' + country;
      const cacheKey = `${city}|${country}`.toLowerCase();
      if (this._geoCache.has(cacheKey)) return this._geoCache.get(cacheKey);
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.length) throw new Error('Invalid location');
      // Auto-fill country if available
      let detectedCountry = '';
      if (data[0].address && data[0].address.country) {
        detectedCountry = data[0].address.country;
      }
      const result = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        country: detectedCountry
      };
      this._geoCache.set(cacheKey, result);
      return result;
    },
    resetFields() {
      this.useCurrentLocation = true;
      // Remove saved preferences if user chooses current location
      localStorage.removeItem('prayer_city');
      localStorage.removeItem('prayer_country');
      localStorage.removeItem('prayer_method');
      localStorage.removeItem('prayer_lat');
      localStorage.removeItem('prayer_lon');
      localStorage.removeItem('prayer_tz');
      this.getCurrentLocation();
    },
    setDefaultLocation() {
      this.city = 'Nottingham';
      this.country = 'United Kingdom';
      this.latitude = 52.9548;
      this.longitude = -1.1581;
      this.useCurrentLocation = false;
      this.fetchPrayerTimes();
    },
    // --- City autocomplete logic ---
    onCityInput: debounce(async function () {
      this.showCitySuggestions = true;
      if (!this.city) {
        this.citySuggestions = [];
        return;
      }
      const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(this.city)}&country=${encodeURIComponent(this.country)}&format=json&addressdetails=1&limit=5`;
      try {
        // Abort previous request if any
        if (this._abortCity) this._abortCity.abort();
        this._abortCity = new AbortController();
        const res = await fetch(url, { signal: this._abortCity.signal });
        const data = await res.json();
        this.citySuggestions = data;
      } catch (e) {
        this.citySuggestions = [];
      }
    }, 400),
    selectCitySuggestion(suggestion) {
      this.city = suggestion.address.city || suggestion.address.town || suggestion.address.village || suggestion.display_name.split(',')[0];
      if (suggestion.address && suggestion.address.country) {
        this.country = suggestion.address.country;
      }
      // Save user preferences to localStorage
      localStorage.setItem('prayer_city', this.city);
      localStorage.setItem('prayer_country', this.country);
      this.citySuggestions = [];
      this.showCitySuggestions = false;
    },
    hideCitySuggestions() {
      setTimeout(() => {
        this.showCitySuggestions = false;
      }, 200);
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.96);
  border: none;
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.12);
}

.next-step-card {
  position: relative;
}

.next-step-card__toggle {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  background: transparent;
  border: none;
  color: rgba(59, 76, 97, 0.9);
  font-size: 1rem;
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.next-step-card__toggle:hover,
.next-step-card__toggle:focus-visible {
  color: #0d8271;
  transform: translateY(-1px);
}

.table-scroll {
  max-height: 500px;
  overflow-y: auto;
}

.table-scroll::-webkit-scrollbar {
  width: 6px;
}

.table-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(59, 76, 97, 0.4);
  border-radius: 10px;
}

thead.sticky-top {
  top: 0;
  z-index: 10;
}

tbody tr:hover {
  background-color: #f1fbff;
}

.position-relative {
  position: relative;
}

.z-3 {
  z-index: 3;
}

@media (max-width: 576px) {

  table thead th,
  table tbody td {
    font-size: 0.85rem;
    padding: 0.4rem;
  }

  .premium-action-button {
    flex: 1 1 100%;
    justify-content: center;
  }
}

@media (max-width: 992px) {
  .prayer-times-table th,
  .prayer-times-table td {
    white-space: nowrap;
    padding-left: 0.45rem;
    padding-right: 0.45rem;
  }

  .prayer-times-table td:first-of-type,
  .prayer-times-table th:first-of-type {
    padding-left: 0;
    padding-right: 0.15rem;
  }
}
</style>
