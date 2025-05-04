<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <h3 class="text-center fw-bold display-4 mb-4">
        Qibla Finder
      </h3>
      <p class="text-center container mb-3 lead">The Advanced Qibla Finder is a high-precision tool that uses GPS, digital compass, maps, and optional AR to accurately determine the direction of the Kaaba from any location. It features real-time orientation, offline support, visual and voice guidance.</p>
    </div>

    <div class="text-center">
      <!-- Action Button -->
      <button class="btn btn-lg btn-success mb-3" @click="getLocation" :disabled="loading">
        {{ loading ? 'Locating...' : 'Find My Qibla' }}
      </button>

      

      <!-- Qibla Info -->
      <div v-if="qiblaDirection !== null" class="text-dark mb-3">
        <p class="text-center container mb-3 lead">
          <b class="fw-bold">Qibla Direction: </b>
          <strong>{{ qiblaDirection.toFixed(2) }}°</strong> from North
        </p>
        <p class="text-center container mb-3 lead">
          <b class="fw-bold">Distance to Kaaba: </b>
          <strong>{{ distanceToKaaba.toFixed(1) }} km</strong>
        </p>
      </div>
    </div>

    <!-- Compass UI with Metadata -->
    <div class="d-flex justify-content-center my-4">
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
          transform: 'translate(-50%, -100%) rotate(' + (compassRotation + qiblaDirection) + 'deg)'
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
