<template>
  <div class="container py-5" :class="{ 'bg-dark text-white': darkMode }">
    <div class="text-center mb-4">
      <h1 class="fw-bold mb-2">
        🧭 Advanced Qibla Finder
      </h1>
      <p class="text-muted">Find your Qibla direction with live compass and distance to the Kaaba.</p>
    </div>

    <div class="text-center">
      <button class="btn btn-lg btn-success mb-3" @click="getLocation" :disabled="loading">
        {{ loading ? 'Locating...' : 'Find My Qibla' }}
      </button>
      <!-- <button class="btn btn-outline-secondary btn-sm mb-3 ms-2" @click="toggleDarkMode">
        {{ darkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button> -->
      <div v-if="!isOnline" class="alert alert-warning mt-2">⚠️ You are offline. Some features may not work.</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="qiblaDirection !== null" class="text-dark mb-3">
        <p>🧭 Qibla Direction: <strong>{{ qiblaDirection.toFixed(2) }}°</strong> from North</p>
        <p>📏 Distance to Kaaba: <strong>{{ distanceToKaaba.toFixed(1) }} km</strong></p>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div class="position-relative" style="width: 250px; height: 250px;">
        <div class="rounded-circle border border-3 border-secondary bg-light position-relative w-100 h-100" :class="{ 'bg-dark text-white border-light': darkMode }">
          <div class="position-absolute top-0 start-50 translate-middle-x fw-bold">N</div>
          <div class="position-absolute bottom-0 start-50 translate-middle-x fw-bold">S</div>
          <div class="position-absolute start-0 top-50 translate-middle-y fw-bold">W</div>
          <div class="position-absolute end-0 top-50 translate-middle-y fw-bold">E</div>

          <!-- Rotating Needle -->
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Compass_Rose_English_North.svg/240px-Compass_Rose_English_North.svg.png"
            alt="Compass"
            class="position-absolute top-50 start-50"
            style="width: 100px; height: 100px; transform: translate(-50%, -50%) rotate(0deg); opacity: 0.2;"
          />
          <div
            class="arrow bg-danger position-absolute top-50 start-50"
            :style="{ transform: 'rotate(' + (compassRotation + qiblaDirection) + 'deg) translate(-50%, -90%)' }"
            style="width: 12px; height: 100px; transition: transform 0.5s ease-in-out;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedQiblaFinder",
  data() {
    return {
      userLat: null,
      userLng: null,
      qiblaDirection: null,
      distanceToKaaba: null,
      compassRotation: 0,
      error: "",
      loading: false,
      isOnline: true,
      darkMode: false,
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
  },
  methods: {
    getLocation() {
      this.error = "";
      this.loading = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLat = position.coords.latitude;
            this.userLng = position.coords.longitude;
            this.calculateQibla();
            this.loading = false;
          },
          () => {
            this.error = "Failed to retrieve your location.";
            this.loading = false;
          }
        );
      } else {
        this.error = "Geolocation is not supported by your browser.";
        this.loading = false;
      }
    },
    calculateQibla() {
      const kaabaLat = 21.4225;
      const kaabaLng = 39.8262;

      const lat1 = this.toRadians(this.userLat);
      const lat2 = this.toRadians(kaabaLat);
      const deltaLng = this.toRadians(kaabaLng - this.userLng);

      const x = Math.sin(deltaLng);
      const y = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLng);
      const angle = Math.atan2(x, y);
      const bearing = (this.toDegrees(angle) + 360) % 360;

      this.qiblaDirection = bearing;

      // Haversine formula
      const R = 6371;
      const dLat = this.toRadians(kaabaLat - this.userLat);
      const dLng = this.toRadians(kaabaLng - this.userLng);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      this.distanceToKaaba = distance;
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
</style>
