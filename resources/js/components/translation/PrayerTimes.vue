<template>
  <div class="container-fluid mt-3">
    <div class="text-center container">
      <div class="row mb-3" style="align-items: center; text-align: center">
        <div class="col-md-4">
          <p class="display-6 mt-3 fw-bold ">Prayer times</p>
        </div>
        
        <div class="col-md-4">
          <!-- City Name -->
          <h4 v-if="cityName" class="text-center fw-bold ">
            Prayer times in: <b class="text-warning">{{ cityName }}</b>
          </h4>
        </div>

        <div class="col-md-4">
          <!-- Search Form -->
          <form class="d-flex pb-" @submit.prevent="fetchPrayerTimesByCity">
            <input
              v-model="city"
              class="form-control me-2"
              type="search"
              placeholder="Enter a city"
              aria-label="Search"
              @keyup.enter="fetchPrayerTimesByCity"
            />
            <button class="btn btn-success" type="submit">Search</button>
          </form>
        </div>

        <!-- Loading Spinner with Transition -->
        <transition name="fade">
          <div v-if="loading" class="text-center mb-4">
            <div class="spinner"></div>
            <p>Loading prayer times...</p>
          </div>
        </transition>

        <hr />
      </div>
      
      <!-- Prayer Times -->
      <div v-if="prayerTimes && !loading" class="row">
        <ul
          class="list-group col-md-2 mb-3"
          v-for="(time, prayer) in filteredPrayerTimes"
          :key="prayer"
        >
          <li
            class="list-group-item list-group-item-success active"
            style="border: 2px solid rgb(0, 191, 166); border-radius: 5px"
            aria-current="true"
            :class="{ 'border-warning': prayer === nextPrayer }"
          >
            <div class="text-center">
              <h5 class="card-title">{{ prayer }}</h5>
              <p class="card-text text-white">{{ time }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSectionOpen: true, // Toggle section visibility
      city: "", // User-input city
      cityName: null, // Resolved city name from user input
      prayerTimes: null, // Prayer times data
      nextPrayer: null, // Next prayer name
      loading: false, // Loading state
      error: null, // Error message
      lat: null, // Latitude from geolocation
      lon: null, // Longitude from geolocation
      gregorianDate: "", // Current Gregorian date
      hijriDate: "", // Current Hijri date
    };
  },
  computed: {
    filteredPrayerTimes() {
      // Filter out unwanted prayer times
      if (!this.prayerTimes) return {};
      const unwantedKeys = ["Sunset", "Imsak", "Firstthird", "Lastthird", "Midnight"];
      return Object.fromEntries(
        Object.entries(this.prayerTimes).filter(([key]) => !unwantedKeys.includes(key))
      );
    },
  },
  mounted() {
    this.getCurrentLocation(); // Automatically fetch prayer times on page load
    this.setCurrentDate(); // Set the current date
  },
  methods: {
    // Set current Gregorian and Hijri dates
    setCurrentDate() {
      const currentGregorianDate = new Date();
      this.gregorianDate = currentGregorianDate.toLocaleDateString(); // Display current Gregorian date

      // Use moment-hijri to get the current Hijri date
      this.hijriDate = moment().format("iYYYY/iM/iD"); // Hijri Date format: iYYYY/iM/iD
    },

    // Toggle section open/close
    toggleSection() {
      this.isSectionOpen = !this.isSectionOpen;
    },

    // Get the current location of the user
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            this.fetchPrayerTimesByLocation();
          },
          (error) => {
            this.error = "Unable to retrieve your location.";
            console.error(error);
          }
        );
      } else {
        this.error = "Geolocation is not supported by this browser.";
      }
    },

    // Fetch prayer times based on the current location (latitude and longitude)
    async fetchPrayerTimesByLocation() {
      if (!this.lat || !this.lon) return;

      this.loading = true;
      this.error = null;

      try {
        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${this.lat}&longitude=${this.lon}&method=2`
        );
        const prayerData = await prayerResponse.json();

        if (prayerData.code === 200) {
          this.prayerTimes = prayerData.data.timings;
          this.cityName = prayerData.data.location.city; // City name based on location
          this.calculateNextPrayer();
        } else {
          this.error = "Unable to fetch prayer times for your location.";
        }
      } catch (error) {
        this.error = "An error occurred while fetching prayer times.";
        console.error("Error:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Fetch prayer times for a user-input city
    async fetchPrayerTimesByCity() {
      if (!this.city) {
        this.error = "Please enter a city name.";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${this.city}&country=auto&method=2`
        );
        const prayerData = await prayerResponse.json();

        if (prayerData.code === 200) {
          this.prayerTimes = prayerData.data.timings;
          this.cityName = this.city; // Update city name (country auto-detected)
          this.calculateNextPrayer();
        } else {
          this.error = "Unable to fetch prayer times for the specified city.";
        }
      } catch (error) {
        this.error = "An error occurred while fetching prayer times.";
        console.error("Error:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Calculate the next prayer time
    calculateNextPrayer() {
      const currentTime = new Date();
      const prayerKeys = Object.keys(this.filteredPrayerTimes);

      for (const prayer of prayerKeys) {
        const prayerTime = this.filteredPrayerTimes[prayer];
        const [hours, minutes] = prayerTime.split(":").map(Number);

        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);

        if (currentTime < prayerDate) {
          this.nextPrayer = prayer;
          break;
        }
      }

      if (!this.nextPrayer) {
        this.nextPrayer = "Fajr"; // Default to the first prayer
      }
    },
  },
};
</script>

<style scoped>
.border-warning {
  border-width: 3px !important;
}

.card-title {
  font-weight: bold;
}

.card-text {
  font-size: 1.2rem;
}

/* CSS Spinner */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgb(12, 208, 149);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>