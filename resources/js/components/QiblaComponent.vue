<template>
  <div class="container py-4" :class="{ 'dark-mode': darkMode }">
    <!-- Header Section -->
    <header class="text-center mb-5">
      <h1 class="fw-bold display-5 mb-3">Qibla Finder</h1>
      <p class="lead container-fluid mb-0 px-3">
        Effortlessly find the direction of the Kaaba in Mecca with precision using GPS and a digital compass. Enjoy
        real-time orientation, voice-guided directions, and offline support for prayer alignment anywhere in the world.
        Optimized for all modern devices, ensuring a seamless experience.
      </p>
    </header>

    <!-- Search and Voice Settings Row -->
    <section class="mb-4">
      <div class="d-flex flex-column flex-md-row gap-3 align-items-center">
        <!-- Search Bar with Clear Button -->
        <div class="input-group flex-grow-1 position-relative">
          <input type="text" class="form-control form-control-lg pe-5" placeholder="Enter country, city, or town"
            v-model="searchLocation" @keyup.enter="searchQibla" aria-label="Search for a location to find Qibla"
            title="Enter a location to find Qibla direction" ref="searchInput" />
          <button v-if="searchLocation" class="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
            @click="clearSearch" title="Clear search" aria-label="Clear search input" style="z-index: 10;">
            <i class="bi bi-x-lg"></i>
          </button>
          <button class="btn btn-lg btn-teal" @click="searchQibla" :disabled="loading" title="Search Qibla direction">
            {{ loading ? 'Searching...' : 'Search' }}
          </button>
          <button class="btn btn-lg btn-outline-teal" @click="resetData" :disabled="!hasData"
            title="Reset location and Qibla data">
            Reset
          </button>
        </div>

      </div>
    </section>



    <!-- Location and Qibla Info -->
    <section class="card shadow-sm mb-4" v-if="userLatitude !== null || error">
      <div class="card-title ml-4 mt-3">
        <h3><b>Qibla Direction:</b></h3>
      </div>
      <div class="card-body">
        <p v-if="error" class="text-danger  text-center">{{ error }}</p>
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <p v-if="userLatitude !== null && userLongitude !== null" class="mb-2">
            <h5><b>Coordinates:</b></h5> {{ userLatitude?.toFixed(4) }}° N, {{ userLongitude?.toFixed(4) }}° E
            </p>
            <p v-if="qiblaDirection !== null" class="mb-2">
            <h5><b>Qibla Direction:</b></h5> {{ formattedQiblaDirection }} from North
            </p>
          </div>
          <div class="col-12 col-md-6">
            <p v-if="distanceToKaaba !== null" class="mb-2">
            <h5><b>Distance to Kaaba:</b></h5> {{ distanceToKaaba?.toFixed(1) }} km
            </p>
            <p v-if="isCalibrated !== null" class="mb-2">
            <h5><b>Compass Calibration:</b></h5> {{ isCalibrated ? 'Calibrated' : 'Not Calibrated' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Compass and Controls -->
    <section class="card shadow-sm">
      <div class="card-body text-center">
        <!-- Compass UI -->
        <div class="compass-wrapper border border-3 rounded-circle shadow bg-white p-4 mx-auto" role="img"
          :aria-label="`Compass showing Qibla at ${qiblaDirection ? qiblaDirection.toFixed(2) : 0} degrees from North`"
          tabindex="0" :data-latitude="userLatitude" :data-longitude="userLongitude" :data-qibla-angle="qiblaDirection"
          :data-distance-to-kaaba="distanceToKaaba" :data-compass-rotation="compassRotation"
          :data-is-calibrated="isCalibrated" :data-sensor-supported="sensorSupported" :data-accuracy="accuracy"
          :data-last-updated="lastUpdated" :data-device-type="deviceType" :data-user-agent="userAgent">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Compass_Rose_English_North.svg/240px-Compass_Rose_English_North.svg.png"
            alt="Compass Background" class="position-absolute top-50 start-50 opacity-25"
            style="width: 100%; height: 100%; transform: translate(-50%, -50%); pointer-events: none;" />
          <!-- Compass Labels -->
          <div class="compass-label north fw-bold display-5">N</div>
          <div class="compass-label south fw-bold display-5">S</div>
          <div class="compass-label east fw-bold display-5">E</div>
          <div class="compass-label west fw-bold display-5">W</div>
          <!-- Qibla Needle -->
          <div class="arrow bg-teal position-absolute top-50 start-50" :style="{
            transform: `translate(-50%, -100%) rotate(${((qiblaDirection - compassRotation + 360) % 360)}deg)`
          }" aria-hidden="true"></div>
        </div>
        <!-- Controls -->
        <div class="row row-cols-2 row-cols-sm-4 g-2 mt-2 mb-3 justify-content-center">
          <div class="col">
            <button
              class="btn btn-outline-teal btn-control"
              :class="{ 'btn-icon-only': compactMode }"
              @click="getLocation"
              :disabled="loading"
              title="Use current location"
              aria-label="Use current location"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <i class="bi bi-geo-alt me-1"></i>
              <span v-if="!compactMode">Use My Location</span>
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-outline-teal btn-control"
              :class="{ 'btn-icon-only': compactMode }"
              @click="speakQiblaDirection"
              :disabled="!qiblaDirection"
              title="Hear Qibla direction"
              aria-label="Hear Qibla direction"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <i class="bi bi-volume-up me-1"></i>
              <span v-if="!compactMode">Speak Direction</span>
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-outline-teal btn-control"
              :class="{ 'btn-icon-only': compactMode }"
              @click="shareLocation"
              :disabled="!hasData"
              title="Share location and Qibla details"
              aria-label="Share location and Qibla details"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <i class="bi bi-share me-1"></i>
              <span v-if="!compactMode">Share Location</span>
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-outline-teal btn-control"
              :class="{ 'btn-icon-only': compactMode }"
              @click="showOptions = !showOptions"
              :disabled="!hasData || voices.length === 0"
              title="Toggle voice settings"
              aria-label="Toggle voice settings"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <i class="bi bi-gear me-1"></i>
              <span v-if="!compactMode">Voice Settings</span>
            </button>
          </div>
        </div>

        <!-- Voice Settings Dropdowns -->
        <transition name="fade">
          <section v-if="showOptions" class="voice-settings p-3 p-sm-4 rounded shadow-sm mt-2 mb-4"
            style="background-color: #f8f9fa;">
            <div class="d-flex flex-column flex-md-row gap-3 gap-sm-4 ">
              <div class="d-flex flex-column flex-grow-1">
                <label for="speech-rate" class="form-label fw-bold mb-1">Rate</label>
                <select id="speech-rate" v-model="speechRate" class="form-select" aria-label="Select speech rate"
                  title="Adjust speech speed">
                  <option v-for="rate in rates" :key="rate" :value="rate">{{ rate }}x</option>
                </select>
              </div>
              <div class="d-flex flex-column flex-grow-1">
                <label for="speech-pitch" class="form-label fw-bold mb-1">Pitch</label>
                <select id="speech-pitch" v-model="speechPitch" class="form-select" aria-label="Select speech pitch"
                  title="Adjust speech tone">
                  <option v-for="pitch in pitches" :key="pitch" :value="pitch">{{ pitch }}x</option>
                </select>
              </div>
              <div class="d-flex flex-column flex-grow-1">
                <label for="speech-voice" class="form-label fw-bold mb-1">Voice</label>
                <select id="speech-voice" v-model="selectedVoice" class="form-select" aria-label="Select voice"
                  title="Choose voice for speech">
                  <option v-for="voice in voices.filter(v => !v.name.includes('Google'))" :key="voice.name"
                    :value="voice.name">
                    {{ voice.name }}
                  </option>
                </select>
              </div>
            </div>
          </section>
        </transition>
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
      lastUpdated: null,
      deviceType: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
      userAgent: navigator.userAgent,
      darkMode: false,
      showOptions: false,
      speechRate: 0.9,
      speechPitch: 1.1,
      selectedVoice: '',
      rates: [0.5, 0.75, 0.9, 1, 1.1, 1.25, 1.5],
      pitches: [0.5, 0.75, 1, 1.1, 1.25, 1.5],
      voices: []
    };
  },
  mounted() {
    // Check device orientation support
    if (typeof DeviceOrientationEvent !== 'undefined') {
      this.sensorSupported = true;
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', this.handleOrientation, true);
            }
          })
          .catch(err => {
            this.error = 'Device orientation permission denied';
            console.error(err);
          });
      } else {
        window.addEventListener('deviceorientation', this.handleOrientation, true);
      }
    } else {
      this.error = 'Device orientation not supported';
    }
    // Populate voices for speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        if (this.voices.length > 0) {
          const naturalVoice = this.voices.find(v => v.name.includes('Natural') || v.name.includes('Samantha') || v.lang.includes('en'));
          this.selectedVoice = naturalVoice ? naturalVoice.name : this.voices[0].name;
        }
      };
    }
  },
  computed: {
    hasData() {
      return this.qiblaDirection !== null || this.userLatitude !== null;
    },
    formattedQiblaDirection() {
      return this.qiblaDirection !== null ? `${this.qiblaDirection.toFixed(2)}°` : 'N/A';
    }
  },
  methods: {
    async searchQibla() {
      if (!this.searchLocation.trim()) {
        this.error = 'Please enter a valid location';
        return;
      }
      this.loading = true;
      this.error = '';
      try {
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
        this.error = `Could not find location: ${error.message}`;
        console.error('Geocoding error:', error);
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
        this.error = 'Geolocation is not supported by your browser';
        this.loading = false;
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
          this.calculateQibla();
          this.loading = false;
        },
        error => {
          this.error = `Error getting location: ${error.message}`;
          this.loading = false;
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    },
    calculateQibla() {
      if (this.userLatitude === null || this.userLongitude === null) return;
      const kaabaLat = 21.4225;
      const kaabaLon = 39.8262;
      const lat1 = this.toRadians(this.userLatitude);
      const lon1 = this.toRadians(this.userLongitude);
      const lat2 = this.toRadians(kaabaLat);
      const lon2 = this.toRadians(kaabaLon);
      const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      this.qiblaDirection = (this.toDegrees(Math.atan2(y, x)) + 360) % 360;
      const R = 6371;
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distanceToKaaba = R * c;
      this.lastUpdated = new Date().toISOString();
      this.isCalibrated = this.accuracy !== null && this.accuracy <= 30;
    },
    handleOrientation(event) {
      if (event.webkitCompassHeading !== undefined) {
        this.compassRotation = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        this.compassRotation = 360 - event.alpha;
      }
      this.accuracy = event.webkitCompassAccuracy || event.accuracy || null;
      this.isCalibrated = this.accuracy !== null && this.accuracy <= 30;
    },
    speakQiblaDirection() {
      if (!window.speechSynthesis || !this.qiblaDirection) return;
      const utterance = new SpeechSynthesisUtterance(
        `The Qibla direction is ${this.formattedQiblaDirection} from North.`
      );
      utterance.rate = this.speechRate;
      utterance.pitch = this.speechPitch;
      utterance.volume = 0.9;
      const voice = this.voices.find(v => v.name === this.selectedVoice);
      if (voice) utterance.voice = voice;
      utterance.onboundary = event => {
        if (event.name === 'sentence') {
          window.speechSynthesis.pause();
          setTimeout(() => window.speechSynthesis.resume(), 200);
        }
      };
      window.speechSynthesis.speak(utterance);
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    toRadians(deg) {
      return (deg * Math.PI) / 180;
    },
    toDegrees(rad) {
      return (rad * 180) / Math.PI;
    }
  }
};
</script>

<style scoped>
/* Dark Mode */
.dark-mode {
  background-color: #212529;
  color: #f8f9fa;
}

.dark-mode .card,
.dark-mode .voice-settings {
  background-color: #343a40;
  color: #f8f9fa;
  border-color: #495057;
}

.dark-mode .compass-wrapper {
  background-color: #343a40;
}

.dark-mode .compass-label {
  color: #f8f9fa;
}

.dark-mode .form-control {
  background-color: #495057;
  color: #f8f9fa;
  border-color: #6c757d;
}

.dark-mode .form-control::placeholder {
  color: #adb5bd;
}

.dark-mode .btn-teal {
  background-color: #00d4b6;
  border-color: #00d4b6;
}

.dark-mode .btn-teal:hover {
  background-color: #00a88f;
  border-color: #00a88f;
}

.dark-mode .btn-outline-teal {
  color: #00d4b6;
  border-color: #00d4b6;
}

.dark-mode .btn-outline-teal:hover {
  background-color: #00d4b6;
  color: #fff;
}

/* Animation for voice settings */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Button Styling */
.btn-teal {
  background-color: #00bfa6;
  border-color: #00bfa6;
  color: #fff;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.btn-teal:hover {
  background-color: #009688;
  border-color: #009688;
}

.btn-teal:disabled {
  background-color: #66d9c9;
  border-color: #66d9c9;
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline-teal {
  color: #00bfa6;
  border-color: #00bfa6;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.btn-outline-teal:hover {
  background-color: #00bfa6;
  color: #fff;
}

.btn-outline-teal:disabled {
  color: #66d9c9;
  border-color: #66d9c9;
  opacity: 0.6;
  cursor: not-allowed;
}

.bg-teal {
  background-color: #00bfa6;
}

/* Compass Styling */
.compass-wrapper {
  width: 80vw;
  max-width: 320px;
  aspect-ratio: 1 / 1;
  position: relative;
  transition: transform 0.5s ease-in-out;
}

.arrow {
  width: 12px;
  height: 42%;
  transform-origin: bottom center;
  border-radius: 8px;
  transition: transform 0.5s ease-in-out;
}

.compass-label {
  position: absolute;
  font-weight: bold;
  color: #343a40;
  font-size: 1.8rem;
  user-select: none;
}

.compass-label.north {
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.compass-label.south {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.compass-label.east {
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}

.compass-label.west {
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}

/* Voice Settings */
.voice-settings {
  max-width: 100%;
  border: 1px solid #dee2e6;
}

.form-select {
  padding: 0.6rem 2rem 0.6rem 0.8rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-position: right 0.8rem center;
  background-size: 16px 12px;
}

.form-label {
  font-size: 0.85rem;
  color: #333;
}

.btn i {
  font-size: 1.3rem;
}

/* Search Bar */
.form-control-lg {
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  border-radius: 0.4rem;
}

.btn-link {
  color: #6c757d;
}

.btn-link:hover {
  color: #495057;
}

/* General Layout */
section {
  transition: opacity 0.3s ease;
}

.card {
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-body {
  padding: 1.5rem;
}

.btn-lg {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 0.4rem;
}

/* Two-Column Location Details */
.row {
  align-items: stretch;
}

.col-12 p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
}

.text-danger {
  font-size: 1rem;
  font-weight: 500;
}

/* Responsive Adjustments */
@media (max-width: 576px) {
  .compass-wrapper {
    width: 90vw;
    max-width: 280px;
  }

  .form-control-lg {
    font-size: 1rem;
    padding: 0.6rem 0.8rem;
  }

  .form-select {
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem 0.5rem 0.7rem;
  }

  .form-label {
    font-size: 0.8rem;
  }

  .btn-lg {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  .card-body {
    padding: 1.2rem;
  }

  .compass-label {
    font-size: 1.5rem;
  }

  .col-12 p {
    font-size: 0.9rem;
  }
}
</style>
