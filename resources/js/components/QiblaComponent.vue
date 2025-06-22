<template>
  <div class="container py-4" :class="{ 'dark-mode': darkMode }">
    <!-- Header -->
    <header class="text-center mb-4">
      <h1 class="fw-bold display-5">Qibla Finder</h1>
      <p class="lead">Find the Qibla direction easily.</p>
    </header>

    <!-- Search Bar -->
    <section class="mb-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter city or town"
          v-model="searchLocation"
          @keyup.enter="searchQibla"
          aria-label="Search for Qibla"
          ref="searchInput"
        />
        <button v-if="searchLocation" class="btn btn-link" @click="clearSearch" aria-label="Clear search">
          <i class="bi bi-x-lg"></i>
        </button>
        <button class="btn btn-primary" @click="searchQibla" :disabled="loading">
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
        <button class="btn btn-outline-secondary" @click="resetData" :disabled="!hasData">
          Reset
        </button>
      </div>
    </section>

    <!-- Qibla Details -->
    <section class="card mb-4" v-if="userLatitude || error">
      <div class="card-body">
        <h5 class="fw-bold">Qibla Details</h5>
        <p v-if="error" class="text-danger">{{ error }}</p>
        <dl v-else class="row mb-0">
          <dt class="col-5">Coordinates</dt>
          <dd class="col-7">{{ userLatitude?.toFixed(2) }}° N, {{ userLongitude?.toFixed(2) }}° E</dd>
          <dt class="col-5">Qibla Direction</dt>
          <dd class="col-7">{{ qiblaDirection?.toFixed(2) }}° from North</dd>
          <dt class="col-5">Distance to Kaaba</dt>
          <dd class="col-7">{{ distanceToKaaba?.toFixed(0) }} km</dd>
          <dt class="col-5">Compass</dt>
          <dd class="col-7">{{ isCalibrated ? 'Calibrated' : 'Needs Calibration' }}</dd>
        </dl>
      </div>
    </section>

    <!-- Compass -->
    <section class="card">
      <div class="card-body text-center">
        <div
          class="compass-wrapper rounded-circle shadow bg-white p-3 mx-auto"
          :aria-label="`Compass showing Qibla at ${qiblaDirection?.toFixed(2) || 0} degrees`"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Compass_Rose_English_North.svg/240px-Compass_Rose_English_North.svg.png"
            alt="Compass Background"
            class="compass-bg"
          />
          <div class="compass-label north">N</div>
          <div class="compass-label south">S</div>
          <div class="compass-label east">E</div>
          <div class="compass-label west">W</div>
          <div
            class="arrow bg-primary"
            :style="{ transform: `translate(-50%, -100%) rotate(${((qiblaDirection - compassRotation + 360) % 360)}deg)` }"
          ></div>
        </div>
        <!-- Controls -->
        <div class="d-flex gap-2 mt-3 justify-content-center">
          <button class="btn btn-outline-primary" @click="getLocation" :disabled="loading" aria-label="Use current location">
            <i class="bi bi-geo-alt"></i> Location
          </button>
          <button class="btn btn-outline-primary" @click="speakQiblaDirection" :disabled="!qiblaDirection" aria-label="Speak Qibla direction">
            <i class="bi bi-volume-up"></i> Speak
          </button>
          <button class="btn btn-outline-primary" @click="shareLocation" :disabled="!hasData" aria-label="Share Qibla details">
            <i class="bi bi-share"></i> Share
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'QiblaFinder',
  data() {
    return {
      searchLocation: '',
      userLatitude: null,
      userLongitude: null,
      qiblaDirection: null,
      distanceToKaaba: null,
      compassRotation: 0,
      loading: false,
      error: '',
      isCalibrated: false,
      sensorSupported: false,
      accuracy: null,
      darkMode: false,
    };
  },
  mounted() {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      this.sensorSupported = true;
      window.addEventListener('deviceorientation', this.handleOrientation, true);
    }
  },
  computed: {
    hasData() {
      return this.userLatitude !== null || this.qiblaDirection !== null;
    },
  },
  methods: {
    async searchQibla() {
      if (!this.searchLocation.trim()) {
        this.error = 'Enter a valid location';
        return;
      }
      this.loading = true;
      this.error = '';
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchLocation)}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length) {
          this.userLatitude = parseFloat(data[0].lat);
          this.userLongitude = parseFloat(data[0].lon);
          this.calculateQibla();
        } else {
          this.error = 'Location not found';
        }
      } catch (error) {
        this.error = 'Failed to find location';
      } finally {
        this.loading = false;
      }
    },
    clearSearch() {
      this.searchLocation = '';
      this.$refs.searchInput.focus();
    },
    getLocation() {
      this.loading = true;
      this.error = '';
      if (!navigator.geolocation) {
        this.error = 'Geolocation not supported';
        this.loading = false;
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
          this.calculateQibla();
          this.loading = false;
        },
        (error) => {
          this.error = `Location error: ${error.message}`;
          this.loading = false;
        },
        { enableHighAccuracy: true }
      );
    },
    calculateQibla() {
      if (!this.userLatitude || !this.userLongitude) return;
      const kaabaLat = 21.4225, kaabaLon = 39.8262;
      const lat1 = (this.userLatitude * Math.PI) / 180;
      const lon1 = (this.userLongitude * Math.PI) / 180;
      const lat2 = (kaabaLat * Math.PI) / 180;
      const lon2 = (kaabaLon * Math.PI) / 180;
      const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      this.qiblaDirection = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
      const R = 6371;
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      this.distanceToKaaba = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.isCalibrated = this.accuracy && this.accuracy <= 30;
    },
    handleOrientation(event) {
      this.compassRotation = event.webkitCompassHeading || (360 - event.alpha) || 0;
      this.accuracy = event.webkitCompassAccuracy || event.accuracy || null;
      this.isCalibrated = this.accuracy && this.accuracy <= 30;
    },
    speakQiblaDirection() {
      if (!window.speechSynthesis || !this.qiblaDirection) return;
      const utterance = new SpeechSynthesisUtterance(
        `Qibla is ${this.qiblaDirection.toFixed(2)} degrees from North.`
      );
      window.speechSynthesis.speak(utterance);
    },
    shareLocation() {
      const shareData = {
        title: 'Qibla Direction',
        text: `Qibla at ${this.userLatitude?.toFixed(2)}° N, ${this.userLongitude?.toFixed(2)}° E is ${this.qiblaDirection?.toFixed(2)}° from North.`,
        url: window.location.href,
      };
      navigator.share?.(shareData).catch(() => alert('Sharing not supported'));
    },
    resetData() {
      this.searchLocation = '';
      this.userLatitude = null;
      this.userLongitude = null;
      this.qiblaDirection = null;
      this.distanceToKaaba = null;
      this.error = '';
      this.isCalibrated = false;
      this.accuracy = null;
    },
  },
  beforeDestroy() {
    window.removeEventListener('deviceorientation', this.handleOrientation);
  },
};
</script>

<style scoped>
.dark-mode {
  background: #1a1a1a;
  color: #fff;
}
.dark-mode .card { background: #333; border-color: #555; }
.dark-mode .form-control { background: #444; color: #fff; border-color: #666; }
.dark-mode .form-control::placeholder { color: #aaa; }
.dark-mode .btn-primary { background: #007bff; border-color: #007bff; }
.dark-mode .btn-outline-secondary { color: #007bff; border-color: #007bff; }

.btn-primary { background: #007bff; border-color: #007bff; }
.btn-primary:disabled { opacity: 0.6; }
.btn-outline-secondary { border-color: #6c757d; color: #6c757d; }
.btn-outline-secondary:disabled { opacity: 0.6; }
.btn-link { color: #6c757d; }

.compass-wrapper {
  width: 250px;
  aspect-ratio: 1/1;
  position: relative;
}
.compass-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  opacity: 0.2;
}
.compass-label {
  position: absolute;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}
.north { top: 5%; left: 50%; transform: translateX(-50%); }
.south { bottom: 5%; left: 50%; transform: translateX(-50%); }
.east { top: 50%; right: 5%; transform: translateY(-50%); }
.west { top: 50%; left: 5%; transform: translateY(-50%); }
.arrow {
  width: 10px;
  height: 40%;
  background: #007bff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom;
  border-radius: 5px;
}
.card { border-radius: 8px; }
.form-control { padding: 0.5rem; }
.text-danger { font-weight: 500; }

@media (max-width: 576px) {
  .compass-wrapper { width: 200px; }
  .form-control { font-size: 0.9rem; }
  .btn { font-size: 0.9rem; }
  .compass-label { font-size: 1.2rem; }
}
</style>