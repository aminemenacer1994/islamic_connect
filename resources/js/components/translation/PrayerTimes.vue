<template>
  <div class="prayer-times-wrapper">
    <button @click="toggleSection" class="toggle-btn">
      {{ isSectionOpen ? "Close" : "Open" }} Prayer Times
    </button>

    <div v-if="isSectionOpen" class="prayer-times">
      <!-- City Name -->
      <p v-if="cityName" class="city-name">Prayer times for {{ cityName }}</p>

      <!-- Search Bar -->
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter a city"
          @keyup.enter="fetchPrayerTimesByCity"
        />
        <button @click="fetchPrayerTimesByCity">Search</button>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading-spinner">
        <p>Loading prayer times...</p>
      </div>

      <!-- Prayer Times -->
      <div v-if="prayerTimes && !loading">
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ 'next-prayer': prayer === nextPrayer }"
            v-for="(time, prayer) in prayerTimes"
            :key="prayer"
          >
            <b>{{ prayer }}</b
            >: {{ time }}
          </li>
        </ul>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error">
        <p>{{ error }}</p>
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
    };
  },
  methods: {
    // Toggle section open/close
    toggleSection() {
      this.isSectionOpen = !this.isSectionOpen;
    },

    // Automatically fetch prayer times for the user's location
    async fetchPrayerTimesByLocation() {
      this.loading = true;
      this.error = null;

      try {
        // Get user's geolocation
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const { latitude, longitude } = position.coords;

        // Fetch prayer times directly without resolving city name
        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const prayerData = await prayerResponse.json();

        if (prayerData.code === 200) {
          this.prayerTimes = prayerData.data.timings;
          this.cityName = "Your Location"; // Use a generic placeholder
          this.calculateNextPrayer();
        } else {
          this.error = "Unable to fetch prayer times for your location.";
        }
      } catch (error) {
        this.error = "An error occurred while fetching your location.";
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
          `https://api.aladhan.com/v1/timingsByCity?city=${this.city}&method=2`
        );
        const prayerData = await prayerResponse.json();

        if (prayerData.code === 200) {
          this.prayerTimes = prayerData.data.timings;
          this.cityName = this.city; // Update city name
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
      const prayerKeys = Object.keys(this.prayerTimes);

      for (const prayer of prayerKeys) {
        const prayerTime = this.prayerTimes[prayer];
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
  mounted() {
    this.fetchPrayerTimesByLocation(); // Fetch prayer times on load
  },
};
</script>
  <style scoped>
.prayer-times-wrapper {
  font-family: Arial, sans-serif;
  margin: 20px;
  text-align: center;
}

.toggle-btn {
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #63be8c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn:hover {
  background-color: #4fa373;
}

.prayer-times h2 {
  color: #2c3e50;
}

.city-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  width: 250px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 13px;
  color: #fff;
  background-color: #63be8c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #4fa373;
}

.loading-spinner p {
  font-size: 1.2em;
  color: #2c3e50;
}

.prayer-times ul {
  list-style-type: none;
  padding: 0;
  font-size: 1.2em;
}

.prayer-times li {
  padding: 10px;
  color: #34495e;
}

.prayer-times .next-prayer {
  background-color: #f1c40f;
  color: white;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
  