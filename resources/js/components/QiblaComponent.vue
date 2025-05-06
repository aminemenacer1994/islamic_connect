<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <h3 class="text-center fw-bold display-4 mb-4">
        Qibla Finder
      </h3>
      <p class="text-center container-fluid mb-3 lead">The Advanced Qibla Finder is a high-precision tool that uses GPS,
        digital compass, maps, and optional AR to accurately determine the direction of the Kaaba from any location. It
        features real-time orientation, offline support, visual and voice guidance.</p>
    </div>

    <div class="text-center">
      <!-- Search Bar -->
      <div class="mb-3">
        <input type="text" class="form-control form-control-lg" placeholder="Enter country, city or town"
          v-model="searchLocation" @keyup.enter="searchQibla">
        <div class="d-flex justify-content-center gap-2 mt-2">
          <button class="btn btn-lg" style="background: #00bfa6;color: white;" @click="searchQibla" :disabled="loading">
            {{ loading ? 'Searching...' : 'Search Qibla' }}
          </button>
          <button class="btn btn-lg btn-outline-secondary" @click="resetData" :disabled="!hasData">
            Reset
          </button>
        </div>
      </div>

     
      <!-- Location Info -->
      <div v-if="userLatitude !== null && userLongitude !== null" class="text-dark mb-3">
        <p class="text-center container mb-3 lead">
          <b class="fw-bold">Your Coordinates: </b>
          <strong>{{ userLatitude?.toFixed(4) }}° N, {{ userLongitude?.toFixed(4) }}° E</strong>
        </p>
      </div>

      <!-- Qibla Info -->
      <div v-if="qiblaDirection !== null" class="text-dark mb-3">
        <p class="text-center container mb-3 lead">
          <b class="fw-bold">Qibla Direction: </b>
          <strong>{{ qiblaDirection?.toFixed(2) }}°</strong> from North
        </p>
        <p class="text-center container mb-3 lead">
          <b class="fw-bold">Distance to Kaaba: </b>
          <strong>{{ distanceToKaaba?.toFixed(1) }} km</strong>
        </p>
      </div>
    </div>

    <!-- Compass UI with Metadata -->
    <div class="d-flex justify-content-center my-4" >
      <div class="position-relative compass-wrapper border border-3 rounded-circle shadow bg-white p-3" role="img"
        aria-label="Compass showing Qibla at {{ qiblaDirection ? qiblaDirection.toFixed(2) : 0 }} degrees from North"
        tabindex="0" :data-latitude="userLatitude" :data-longitude="userLongitude" :data-qibla-angle="qiblaDirection"
        :data-distance-to-kaaba="distanceToKaaba" :data-compass-rotation="compassRotation"
        :data-is-calibrated="isCalibrated" :data-sensor-supported="sensorSupported" :data-accuracy="accuracy"
        :data-last-updated="lastUpdated" :data-device-type="deviceType" :data-user-agent="userAgent">
        <!-- Compass Image -->
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Compass_Rose_English_North.svg/240px-Compass_Rose_English_North.svg.png"
          alt="Compass Background" class="position-absolute top-50 start-50 opacity-25"
          style="width: 100%; height: 100%; transform: translate(-50%, -50%); pointer-events: none;" />

        <!-- Compass Labels -->
        <div class="compass-label north fw-bold display-4">N</div>
        <div class="compass-label south fw-bold display-4">S</div>
        <div class="compass-label east fw-bold display-4">E</div>
        <div class="compass-label west fw-bold display-4">W</div>

        <!-- Qibla Needle -->
        <div class="arrow bg-danger position-absolute top-50 start-50" :style="{
          transform: 'translate(-50%, -100%) rotate(' + (compassRotation + (qiblaDirection || 0)) + 'deg)'
        }" style="
            width: 8px;
            height: 36%;
            transition: transform 0.5s ease-in-out;
            transform-origin: bottom center;
            border-radius: 8px;
          " aria-hidden="true"></div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "AdvancedQiblaFinder",
  data() {
    return {
      compassRotation: 0,
      error: "",
      loading: false,
      isOnline: true,
      darkMode: false,
      searchLocation: '',
      userLatitude: null,
      userLongitude: null,
      qiblaDirection: null,
      distanceToKaaba: null,
      compassRotation: 0,
      loading: false,
      isCalibrated: false,
      sensorSupported: false,
      accuracy: null,
      lastUpdated: null,
      deviceType: null,
      userAgent: null
    };
  },
  mounted() {
    if (typeof navigator !== "undefined") {
      this.isOnline = navigator.onLine;
      window.addEventListener("online", () => (this.isOnline = true));
      window.addEventListener("offline", () => (this.isOnline = false));
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientationabsolute", this.handleOrientation, true);
      window.addEventListener("deviceorientation", this.handleOrientation, true);
    }

    this.sensorSupported = !!window.DeviceOrientationEvent;
    this.deviceType = /Mobile|Android|iP(hone|od|ad)/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    this.userAgent = navigator.userAgent;
  },
  computed: {
    hasData() {
      return this.qiblaDirection !== null || this.userLatitude !== null;
    }
  },
  methods: {
    resetData() {
      this.searchLocation = '';
      this.userLatitude = null;
      this.userLongitude = null;
      this.qiblaDirection = null;
      this.distanceToKaaba = null;
      this.compassRotation = 0;
      this.lastUpdated = null;
    },
    async searchQibla() {
      if (!this.searchLocation.trim()) return;

      this.loading = true;
      try {
        // Using Nominatim (OpenStreetMap) geocoding service
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchLocation)}&format=json&limit=1`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.length > 0) {
          this.userLatitude = parseFloat(data[0].lat);
          this.userLongitude = parseFloat(data[0].lon);
          this.calculateQibla();
        } else {
          throw new Error('Location not found');
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        alert("Could not find the location. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    getLocation() {
      this.loading = true;

      if (!navigator.geolocation) {
        this.loading = false;
        alert("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;
          this.calculateQibla();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error("Geolocation error:", error);
          alert(`Error getting location: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    },
    calculateQibla() {
      if (this.userLatitude === null || this.userLongitude === null) return;

      // Kaaba coordinates (21.4225° N, 39.8262° E)
      const kaabaLat = 21.4225;
      const kaabaLon = 39.8262;

      // Convert degrees to radians
      const lat1 = this.userLatitude * Math.PI / 180;
      const lon1 = this.userLongitude * Math.PI / 180;
      const lat2 = kaabaLat * Math.PI / 180;
      const lon2 = kaabaLon * Math.PI / 180;

      // Calculate Qibla direction
      const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      this.qiblaDirection = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

      // Calculate distance to Kaaba
      const R = 6371; // Earth's radius in km
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distanceToKaaba = R * c;

      this.lastUpdated = new Date().toISOString();
    },
    handleOrientation(event) {
      if (event.alpha !== null) {
        this.compassRotation = 360 - event.alpha;
      }
    },
    toRadians(deg) {
      return (deg * Math.PI) / 180;
    },
    toDegrees(rad) {
      return (rad * 180) / Math.PI;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style scoped>
.arrow {
  transform-origin: bottom center;
  border-radius: 6px;
}

.compass-wrapper {
  width: 90vw;
  max-width: 400px;
  aspect-ratio: 1 / 1;
  margin: auto;
  position: relative;
}

.compass-label {
  position: absolute;
  font-weight: bold;
  color: #343a40;
  font-size: 1.25rem;
  user-select: none;
}

.compass-label.north {
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
}

.compass-label.south {
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
}

.compass-label.east {
  top: 50%;
  right: 4%;
  transform: translateY(-50%);
}

.compass-label.west {
  top: 50%;
  left: 4%;
  transform: translateY(-50%);
}
</style>
