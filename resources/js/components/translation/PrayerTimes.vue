<template>
  <section class="container-fluid mt-3" aria-labelledby="prayer-times-heading">
    <div class="text-center container">
      <div class="row mb-3" style="align-items: center; text-align: center">
        
        <!-- Loading State with Accessibility -->
        <div v-if="loading" class="text-center mb-4" role="status" aria-live="polite">
          <div class="spinner" aria-hidden="true"></div>
          <p class="mt-2 text-muted">Loading prayer times...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="alert alert-warning text-center" role="alert" aria-live="assertive">
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
              style="background: #00bfa6 !important; color: white !important;"
              aria-label="Next prayer"
            >
              Next
            </span>
          </div>
        </div>
      </div>

      <!-- Fallback when no data -->
      <div v-if="!prayerTimes && !loading && !error" class="text-center text-muted">
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
      error: null,
      lat: null,
      lon: null,
      gregorianDate: "",
      hijriDate: "",
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
    
    // Update prayer times every minute to keep next prayer accurate
    this.updateInterval = setInterval(() => {
      if (this.prayerTimes) {
        this.calculateNextPrayer();
      }
    }, 60000);
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
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
      
      // Use Intl for Hijri date if available, fallback to moment
      if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
        const hijriFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        this.hijriDate = hijriFormatter.format(now);
      } else if (typeof moment !== 'undefined') {
        this.hijriDate = moment().format('iMMMM iYYYY');
      }
    },

    getCurrentLocation() {
      if (!navigator.geolocation) {
        this.error = "Geolocation is not supported by your browser.";
        return;
      }

      this.loading = true;
      
      // Add timeout for geolocation
      const geoTimeout = setTimeout(() => {
        this.error = "Location request timed out. Using default location.";
        this.loading = false;
        this.fetchPrayerTimesByCity('London'); // Fallback city
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(geoTimeout);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.fetchPrayerTimesByLocation();
        },
        (error) => {
          clearTimeout(geoTimeout);
          this.error = "Unable to retrieve your location. Using default location.";
          this.fetchPrayerTimesByCity('London'); // Fallback city
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    },

    async fetchPrayerTimesByLocation() {
      if (!this.lat || !this.lon) return;

      try {
        // Cache key for localStorage
        const cacheKey = `prayer-${this.lat}-${this.lon}-${new Date().toDateString()}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = data.location.city;
          this.calculateNextPrayer();
          this.loading = false;
          return;
        }

        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${this.lat}&longitude=${this.lon}&method=2`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        if (data.code === 200) {
          this.prayerTimes = data.data.timings;
          this.cityName = data.data.meta.timezone; // More reliable than city name
          
          // Cache the response
          localStorage.setItem(cacheKey, JSON.stringify({
            timings: data.data.timings,
            location: data.data.meta
          }));
          
          this.calculateNextPrayer();
        } else {
          throw new Error('Invalid response from prayer times API');
        }
      } catch (error) {
        this.error = "Unable to fetch prayer times. Please try again later.";
        console.error("Prayer times error:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPrayerTimesByCity(city = 'London') {
      try {
        const cacheKey = `prayer-${city}-${new Date().toDateString()}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = city;
          this.calculateNextPrayer();
          return;
        }

        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=GB&method=2`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        if (data.code === 200) {
          this.prayerTimes = data.data.timings;
          this.cityName = city;
          
          localStorage.setItem(cacheKey, JSON.stringify({
            timings: data.data.timings
          }));
          
          this.calculateNextPrayer();
        }
      } catch (error) {
        this.error = "Unable to fetch prayer times for the specified city.";
        console.error("City prayer times error:", error);
      }
    },

    calculateNextPrayer() {
      if (!this.prayerTimes) return;

      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      let nextPrayerTime = Infinity;
      let nextPrayerName = null;

      Object.entries(this.filteredPrayerTimes).forEach(([prayer, time]) => {
        const [hours, minutes] = time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        // If prayer time is later today and earlier than current next prayer
        if (prayerTime > currentTime && prayerTime < nextPrayerTime) {
          nextPrayerTime = prayerTime;
          nextPrayerName = prayer;
        }
      });

      // If no prayer found for today, use Fajr tomorrow
      this.nextPrayer = nextPrayerName || 'Fajr';
    },

    getPrayerDisplayName(prayer) {
      const names = {
        'Fajr': 'Fajr',
        'Dhuhr': 'Dhuhr',
        'Asr': 'Asr',
        'Maghrib': 'Maghrib',
        'Isha': 'Isha',
        'Sunrise': 'Sunrise'
      };
      return names[prayer] || prayer;
    },

    formatTime(time) {
      // Convert to 12-hour format
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const twelveHour = hours % 12 || 12;
      return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.date-badge {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1a5f7a !important;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .prayer-card {
    transition: none;
  }
  
  .spinner {
    animation: none;
    border-top-color: transparent;
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .prayer-card {
    border: 2px solid #000;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .prayer-card {
    padding: 1rem 0.5rem !important;
  }
  
  .date-badge {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>