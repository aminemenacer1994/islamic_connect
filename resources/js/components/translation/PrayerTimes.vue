<template>
  <section class="container-fluid mt-3" aria-labelledby="prayer-times-heading">
    <div class="text-center container">
      <div class="row mb-3" style="align-items: center; text-align: center">
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center mb-4" role="status" aria-live="polite">
          <div class="spinner" aria-hidden="true"></div>
          <p class="mt-2 text-muted">Loading prayer times...</p>
        </div>

        <!-- Only show real errors (critical) errors — not location fallback -->
        <div v-if="error" class="alert alert-danger text-center" role="alert" aria-live="assertive">
          <i class="fas fa-exclamation-triangle me-2" aria-hidden="true"></i>
          {{ error }}
        </div>
      </div>
      
      <!-- Prayer Times Grid -->
      <div v-if="prayerTimes && !loading" class="row justify-content-center g-3" role="list" aria-label="Prayer times">
        <div 
          class="col-6 col-sm-4 col-md-3 col-lg-2" 
          v-for="(time, prayer) in filteredPrayerTimes" 
          :key="prayer"
          role="listitem"
        >
          <div 
            class="p-3 text-center rounded shadow-sm h-100 prayer-card"
            :class="{
              'text-white': prayer === nextPrayer,
              'bg-light': prayer !== nextPrayer
            }"
            :style="prayer === nextPrayer ? 'background: #1a5f7a !important;' : ''"
            :aria-current="prayer === nextPrayer ? 'true' : 'false'"
          >
            <h3 class="h6 fw-bold mb-2" :class="prayer === nextPrayer ? 'text-white' : 'text-dark'">
              {{ getPrayerDisplayName(prayer) }}
            </h3>
            <p 
              class="mb-0 fs-5 fw-bold" 
              :style="prayer === nextPrayer ? 'color: white !important;' : 'color: #1a5f7a !important;'"
            >
              {{ formatTime(time) }}
            </p>
            <span 
              v-if="prayer === nextPrayer" 
              class="badge mt-2 small"
              style="background: #0b806f !important; color: #ffffff !important;"
              aria-label="Next prayer"
            >
              Next
            </span>
          </div>
        </div>
      </div>

      <!-- Fallback when no data at all -->
      <div v-if="!prayerTimes && !loading && !error" class="text-center text-muted mt-4">
        <p>Unable to load prayer times. Please check your connection.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PrayerTimes',
  data() {
    return {
      city: "",
      cityName: null,
      prayerTimes: null,
      nextPrayer: null,
      loading: false,
      error: null,         // Only for real errors (API down, network, etc.)
      lat: null,
      lon: null,
      gregorianDate: "",
      hijriDate: "",
      updateInterval: null
    };
  },
  computed: {
    filteredPrayerTimes() {
      if (!this.prayerTimes) return {};
      const unwantedKeys = ["Sunset", "Imsak", "Firstthird", "Lastthird", "Midnight"];
      return Object.fromEntries(
        Object.entries(this.prayerTimes).filter(([key]) => !unwantedKeys.includes(key))
      );
    },
  },
  mounted() {
    this.setCurrentDate();
    this.getCurrentLocation();

    // Update "Next Prayer" every minute
    this.updateInterval = setInterval(() => {
      if (this.prayerTimes) {
        this.calculateNextPrayer();
      }
    }, 60000);
  },
  beforeUnmount() {
    if (this.updateInterval) clearInterval(this.updateInterval);
  },
  methods: {
    setCurrentDate() {
      const now = new Date();
      this.gregorianDate = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Hijri date (modern browsers support Intl)
      try {
        const hijri = new Intl.DateTimeFormat('en-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(now);
        this.hijriDate = hijri;
      } catch (e) {
        this.hijriDate = "";
      }
    },

    getCurrentLocation() {
      if (!navigator.geolocation) {
        this.fetchPrayerTimesByCity('London');
        return;
      }

      this.loading = true;

      const geoTimeout = setTimeout(() => {
        this.loading = false;
        this.fetchPrayerTimesByCity('London');
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(geoTimeout);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.fetchPrayerTimesByLocation();
        },
        () => {
          clearTimeout(geoTimeout);
          this.loading = false;
          this.fetchPrayerTimesByCity('London'); // Silent fallback
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    },

    async fetchPrayerTimesByLocation() {
      if (!this.lat || !this.lon) return;

      try {
        const today = new Date().toDateString();
        const cacheKey = `prayer-${this.lat.toFixed(4)}-${this.lon.toFixed(4)}-${today}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = data.city || "Your Location";
          this.calculateNextPrayer();
          this.loading = false;
          return;
        }

        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${this.lat}&longitude=${this.lon}&method=2`
        );

        if (!response.ok) throw new Error("Network error");

        const json = await response.json();
        if (json.code !== 200) throw new Error("Invalid API response");

        this.prayerTimes = json.data.timings;
        this.cityName = json.data.meta.timezone;

        localStorage.setItem(cacheKey, JSON.stringify({
          timings: json.data.timings,
          city: json.data.meta.timezone
        }));

        this.calculateNextPrayer();
      } catch (err) {
        this.error = "Failed to load prayer times. Please try again later.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchPrayerTimesByCity(city = 'London') {
      try {
        const today = new Date().toDateString();
        const cacheKey = `prayer-${city}-${today}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = city;
          this.calculateNextPrayer();
          return;
        }

        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=GB&method=2`
        );

        if (!response.ok) throw new Error("Network error");

        const json = await response.json();
        if (json.code !== 200) throw new Error("API error");

        this.prayerTimes = json.data.timings;
        this.cityName = city;

        localStorage.setItem(cacheKey, JSON.stringify({ timings: json.data.timings }));
        this.calculateNextPrayer();
      } catch (err) {
        this.error = "Failed to load prayer times for " + city;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    calculateNextPrayer() {
      if (!this.prayerTimes) return;

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let closest = Infinity;
      let next = null;

      for (const [name, time] of Object.entries(this.filteredPrayerTimes)) {
        const [h, m] = time.split(':').map(Number);
        const minutes = h * 60 + m;

        if (minutes > currentMinutes && minutes < closest) {
          closest = minutes;
          next = name;
        }
      }

      this.nextPrayer = next || 'Fajr'; // rollover to Fajr if all passed
    },

    getPrayerDisplayName(prayer) {
      const map = {
        Fajr: 'Fajr',
        Sunrise: 'Sunrise',
        Dhuhr: 'Dhuhr',
        Asr: 'Asr',
        Maghrib: 'Maghrib',
        Isha: 'Isha'
      };
      return map[prayer] || prayer;
    },

    formatTime(time) {
      const [h, m] = time.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
    }
  }
};
</script>

<style scoped>
.prayer-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.prayer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a5f7a;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .prayer-card { transition: none; }
  .spinner { animation: none; }
}
</style>