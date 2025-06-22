<template>
  <div class="container py-5" ref="qiblaFinder">
    <!-- Header -->
    <header class="text-center mb-5">
      <h1 class="display-3 fw-bold mb-2">Qibla Compass</h1>
      <p class="lead text-muted">Your guide to prayer direction and times.</p>
    </header>

    

    <!-- Search & Location -->
    <div class="card shadow-sm mb-4">
      <div class="container-fluid card-body p-4">
        <h5 class="h4 card-title text-primary fw-bold mb-3">Find Your Location</h5>
        <div class="input-group mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Enter a city or address"
            v-model="searchLocation"
            @keyup.enter="searchQibla"
            ref="searchInput"
          />
          <button class="btn btn-primary" @click="searchQibla" :disabled="loading" title="Search">
            <i class="bi bi-search"></i>
          </button>
          <button class="btn btn-outline-secondary" @click="getLocation" :disabled="loading" title="Use My Location">
            <i class="bi bi-geo-alt"></i> <span class="d-none d-sm-inline">Use My Location</span>
          </button>
        </div>
        <p v-if="error" class="text-danger mt-3 mb-0">{{ error }}</p>
      </div>
    </div>

    <div v-if="hasData" class="row g-4">
      <div class="col-lg-6">
        <!-- Qibla & Compass -->
        <div class="card shadow-sm h-100">
          <div class="container-fluid card-body text-center d-flex flex-column justify-content-center p-4">
            <h5 class="h4 card-title text-primary fw-bold mb-3">Qibla Direction</h5>
            <div class="d-flex justify-content-center align-items-center mb-3">
              <div class="qibla-compass-wrapper position-relative mx-auto">
                <div class="compass-dial position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-2 border-secondary bg-light" :style="{ transform: `rotate(-${compassRotation}deg)` }">
                  <div class="compass-label position-absolute top-0 start-50 translate-middle-x">N</div>
                  <div class="compass-label position-absolute bottom-0 start-50 translate-middle-x">S</div>
                  <div class="compass-label position-absolute top-50 end-0 translate-middle-y">E</div>
                  <div class="compass-label position-absolute top-50 start-0 translate-middle-y">W</div>
                </div>
                <!-- Arrow: Responsive, always points outward from center -->
                <div class="qibla-arrow position-absolute top-50 start-50" :style="{ transform: `translate(-50%, -60%) rotate(${qiblaDirection - compassRotation}deg)` }"></div>
              </div>
            </div>
            <ul class="list-group list-group-flush text-start mx-auto mb-3 w-100 w-md-75 w-lg-50">
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Direction</span>
                <span class="text-muted d-flex align-items-center gap-2">
                  <i :class="['bi', directionIconClass]"></i>
                  {{ qiblaDirection?.toFixed(1) }}° ({{ qiblaCardinalDirection }})
                </span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Bearing from North</span>
                <span class="text-muted">{{ qiblaBearing }}° clockwise</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Relative Direction</span>
                <span class="text-muted">{{ relativeDirection }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Distance</span>
                <span class="text-muted">{{ distanceToKaaba?.toFixed(0) }} km / {{ distanceToKaabaMiles?.toFixed(0) }} mi</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Your Coordinates</span>
                <span class="text-muted">{{ userLatitude?.toFixed(4) }}°, {{ userLongitude?.toFixed(4) }}°</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Kaaba Coordinates</span>
                <span class="text-muted">21.4225°, 39.8262°</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted fw-bold">Last Updated</span>
                <span class="text-muted">{{ lastUpdated }}</span>
              </li>
            </ul>
            <!-- Qibla Info Card (Modern Layout) -->          
            <div class="alert alert-info small mb-0" style="background:rgba(13,182,145,0.08);border-color:rgba(13,182,145,0.2);color:rgb(13,182,145);">
              <i class="bi bi-info-circle"></i> Compass uses true north, not magnetic north. For best accuracy, calibrate your device.
            </div>
          </div>
        </div>

        
      </div>
      <div class="col-lg-6">
        <!-- Prayer Times -->
        <div class="card shadow-sm h-100">
          <div class="container-fluid card-body p-4">
            <h5 class="h4 card-title text-primary fw-bold mb-3">Today's Prayer Times</h5>
            <div class="mb-3">
              <select class="form-select" v-model="calculationMethod" @change="getPrayerTimes" aria-label="Prayer time calculation method">
                <option v-for="(name, id) in calculationMethods" :key="id" :value="id">{{ name }}</option>
              </select>
            </div>
            <ul v-if="prayerTimes" class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3" v-for="(time, name) in prayerTimes" :key="name">
                <span class="text-muted fw-bold">{{ name }}</span>
                <strong class="text-muted">{{ time }}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="card shadow-sm mt-4" v-if="hasData">        
      <h5 class="h4 card-title text-primary fw-bold mb-3 mt-4 ml-5">Actions & Settings</h5>
      <div class="container-fluid card-body">      
        <div class="row g-2">
          <div class="col-6 col-md-4">
            <button class="btn w-100 btn-outline-secondary" @click="speakQiblaDirection" :disabled="!qiblaDirection">
              <i class="bi bi-volume-up"></i> Speak Direction
            </button>
          </div>
          <div class="col-6 col-md-4">
            <button class="btn w-100 btn-outline-secondary" @click="shareLocation" :disabled="!hasData">
              <i class="bi bi-share"></i> Share
            </button>
          </div>
          <!-- <div class="col-6 col-md-3">
            <button class="btn w-100 btn-outline-secondary" @click="toggleFullscreen">
              <i class="bi" :class="isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'"></i>
              {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
            </button>
          </div> -->
          <div class="col-6 col-md-4">
            <button class="btn w-100 btn-success" @click="showTtsSettings = !showTtsSettings" :aria-expanded="showTtsSettings">
              <i class="bi bi-gear"></i> Speech Settings
            </button>
          </div>
        </div>
      </div>
      <div class="card-footer" v-show="showTtsSettings">
        <div class="row align-items-center">
          <div class="col-lg-5 mb-3 mb-lg-0">
            <label for="tts-voice" class="form-label small">Voice</label>
            <select id="tts-voice" class="form-select" v-model="selectedVoiceUri">
              <option v-for="voice in availableVoices" :key="voice.voiceURI" :value="voice.voiceURI">{{ voice.name }} ({{ voice.lang }})</option>
            </select>
          </div>
          <div class="col-lg-3 col-6">
            <label for="tts-rate" class="form-label small">Rate: {{ speechRate }}</label>
            <input id="tts-rate" type="range" class="form-range" min="0.5" max="2" step="0.1" v-model="speechRate" />
          </div>
          <div class="col-lg-4 col-6">
            <label for="tts-pitch" class="form-label small">Pitch: {{ speechPitch }}</label>
            <input id="tts-pitch" type="range" class="form-range" min="0" max="2" step="0.1" v-model="speechPitch" />
          </div>
        </div>
      </div>
    </div>
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
      distanceToKaabaMiles: null,
      qiblaCardinalDirection: null,
      compassRotation: 0,
      loading: false,
      error: '',
      isCalibrated: false,
      sensorSupported: false,
      accuracy: null,
      prayerTimes: null,
      calculationMethod: '2',
      calculationMethods: {
        '1': 'Muslim World League',
        '2': 'ISNA (North America)',
        '3': 'Egyptian General Authority',
        '4': 'Umm Al-Qura, Makkah',
        '5': 'University of Karachi',
      },
      isFullscreen: false,
      showTtsSettings: false,
      availableVoices: [],
      selectedVoiceUri: null,
      speechRate: 1,
      speechPitch: 1,
      lastUpdated: null,
      magneticDeclination: 0.5, // Placeholder, replace with real value if available
    };
  },
  computed: {
    hasData() {
      return this.userLatitude !== null;
    },
    qiblaBearing() {
      // Always positive, clockwise from North
      if (this.qiblaDirection == null) return '';
      let deg = this.qiblaDirection % 360;
      if (deg < 0) deg += 360;
      return deg.toFixed(1);
    },
    relativeDirection() {
      if (this.qiblaDirection == null) return '';
      let deg = this.qiblaDirection % 360;
      if (deg < 0) deg += 360;
      if (deg === 0) return 'Face North';
      if (deg < 180) return `Turn ${deg.toFixed(1)}° right from North`;
      if (deg > 180) return `Turn ${(360 - deg).toFixed(1)}° left from North`;
      return 'Face South';
    },
    directionIconClass() {
      // Map cardinal direction to Bootstrap icon
      const map = {
        N: 'bi-arrow-up',
        NNE: 'bi-arrow-up-right',
        NE: 'bi-arrow-up-right',
        ENE: 'bi-arrow-up-right',
        E: 'bi-arrow-right',
        ESE: 'bi-arrow-down-right',
        SE: 'bi-arrow-down-right',
        SSE: 'bi-arrow-down-right',
        S: 'bi-arrow-down',
        SSW: 'bi-arrow-down-left',
        SW: 'bi-arrow-down-left',
        WSW: 'bi-arrow-down-left',
        W: 'bi-arrow-left',
        WNW: 'bi-arrow-up-left',
        NW: 'bi-arrow-up-left',
        NNW: 'bi-arrow-up-left',
      };
      return map[this.qiblaCardinalDirection] || 'bi-arrow-up';
    },
    qiblaCardinalDirectionText() {
      // For display: 'East', 'North-East', etc.
      const map = {
        N: 'North',
        NNE: 'North-East',
        NE: 'North-East',
        ENE: 'East-North-East',
        E: 'East',
        ESE: 'East-South-East',
        SE: 'South-East',
        SSE: 'South-South-East',
        S: 'South',
        SSW: 'South-South-West',
        SW: 'South-West',
        WSW: 'West-South-West',
        W: 'West',
        WNW: 'West-North-West',
        NW: 'North-West',
        NNW: 'North-North-West',
      };
      return map[this.qiblaCardinalDirection] || this.qiblaCardinalDirection;
    },
  },
  methods: {
    async searchQibla() {
      if (!this.searchLocation.trim()) {
        this.error = 'Please enter a location.';
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
          this.getPrayerTimes();
          this.lastUpdated = new Date().toLocaleString();
        } else {
          this.error = 'Location not found. Please try another search.';
        }
      } catch (error) {
        this.error = 'Failed to fetch location data. Please check your connection.';
      } finally {
        this.loading = false;
      }
    },
    getLocation() {
      this.loading = true;
      this.error = '';
      if (!navigator.geolocation) {
        this.error = 'Geolocation is not supported by your browser.';
        this.loading = false;
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
          this.calculateQibla();
          this.getPrayerTimes();
          this.lastUpdated = new Date().toLocaleString();
        },
        (error) => {
          this.error = `Could not get location: ${error.message}`;
          this.loading = false;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    },
    calculateQibla() {
      const kaabaLat = 21.4225, kaabaLon = 39.8262;
      const lat1 = (this.userLatitude * Math.PI) / 180;
      const lon1 = (this.userLongitude * Math.PI) / 180;
      const lat2 = (kaabaLat * Math.PI) / 180;
      const lon2 = (kaabaLon * Math.PI) / 180;
      const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      const degrees = (Math.atan2(y, x) * 180) / Math.PI;
      this.qiblaDirection = degrees;
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      const normalizedDegrees = (degrees < 0) ? degrees + 360 : degrees;
      const index = Math.round((normalizedDegrees % 360) / 22.5);
      this.qiblaCardinalDirection = directions[index % 16];
      const R = 6371; // Earth radius in km
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      const distanceInKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distanceToKaaba = distanceInKm;
      this.distanceToKaabaMiles = distanceInKm * 0.621371;
    },
    handleOrientation(event) {
      const alpha = event.alpha;
      if (alpha === null) {
          this.compassRotation = event.webkitCompassHeading || 360 - event.alpha;
      } else {
          this.compassRotation = 360 - alpha;
      }
      this.isCalibrated = (event.webkitCompassAccuracy && event.webkitCompassAccuracy < 30) || this.accuracy < 30;
    },
    speakQiblaDirection() {
      if (!window.speechSynthesis || !this.qiblaDirection) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `The Qibla is at ${this.qiblaDirection.toFixed(1)} degrees from North.`
      );
      if (this.selectedVoiceUri) {
        utterance.voice = this.availableVoices.find(v => v.voiceURI === this.selectedVoiceUri);
      }
      utterance.rate = this.speechRate;
      utterance.pitch = this.speechPitch;
      window.speechSynthesis.speak(utterance);
    },
    async shareLocation() {
      const shareText = `My Qibla: ${this.qiblaDirection?.toFixed(1)}° from North. Distance: ${this.distanceToKaaba?.toFixed(0)} km.`;
      const shareData = {
        title: 'My Qibla Direction',
        text: shareText,
        url: window.location.href,
      };
      if (navigator.share) {
        await navigator.share(shareData).catch(err => console.error('Share failed:', err));
      } else {
        try {
          await navigator.clipboard.writeText(`${shareText} - Find yours at ${window.location.href}`);
          alert('Qibla details copied to clipboard!');
        } catch (err) {
          alert('Sharing failed.');
        }
      }
    },
    async getPrayerTimes() {
      if (!this.userLatitude) return;
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=${this.calculationMethod}`
        );
        const data = await response.json();
        if (data.code === 200) {
          const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
          this.prayerTimes = { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha };
        } else {
          this.error = 'Could not fetch prayer times.';
        }
      } catch (e) {
        this.error = 'Failed to fetch prayer times.';
      }
    },
    toggleFullscreen() {
      const el = this.$refs.qiblaFinder;
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(err => alert(`Fullscreen failed: ${err.message}`));
        this.isFullscreen = true;
      } else {
        document.exitFullscreen();
        this.isFullscreen = false;
      }
    },
    populateVoiceList() {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        this.availableVoices = voices.sort((a,b) => a.lang.localeCompare(b.lang));
        if (!this.selectedVoiceUri) {
          const defaultVoice = voices.find(voice => voice.default) || voices.find(v => v.lang.startsWith('en'));
          this.selectedVoiceUri = defaultVoice ? defaultVoice.voiceURI : voices[0]?.voiceURI;
        }
      }
    },
  },
  mounted() {
    if (typeof DeviceOrientationEvent !== 'undefined' && 'ondeviceorientationabsolute' in window) {
      this.sensorSupported = true;
      window.addEventListener('deviceorientationabsolute', this.handleOrientation, true);
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
      this.sensorSupported = true;
      window.addEventListener('deviceorientation', this.handleOrientation, true);
    }
    this.populateVoiceList();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.populateVoiceList;
    }
  },
  beforeDestroy() {
    if (this.sensorSupported) {
        window.removeEventListener('deviceorientationabsolute', this.handleOrientation, true);
        window.removeEventListener('deviceorientation', this.handleOrientation, true);
    }
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.onvoiceschanged = null;
    }
  },
};
</script>

<style scoped>
:root {
  --primary-color: rgb(13, 182, 145);
  --primary-hover-color: rgb(11, 158, 127);
  --primary-focus-color: rgba(13, 182, 145, 0.25);
  --tertiary-bg-color: rgba(13, 182, 145, 0.1);
  --tertiary-hover-bg-color: rgba(13, 182, 145, 0.2);
}
.btn-primary,
.text-primary {
  --bs-btn-bg: rgb(13, 182, 145);
  --bs-btn-border-color: rgb(13, 182, 145);
  --bs-btn-hover-bg: rgb(11, 158, 127);
  --bs-btn-hover-border-color: rgb(11, 158, 127);
  --bs-btn-active-bg: rgb(11, 158, 127);
  --bs-btn-active-border-color: rgb(11, 158, 127);
  color: rgb(13, 182, 145) !important;
}
.btn-primary {
  color: #fff !important;
}
.btn-tertiary {
  background-color: var(--tertiary-bg-color) !important;
  color: var(--primary-color) !important;
  border: 1px solid var(--primary-color) !important;
}
.btn-tertiary:hover, .btn-tertiary:focus {
  background-color: var(--tertiary-hover-bg-color) !important;
  color: var(--primary-hover-color) !important;
}
.qibla-compass-wrapper {
  width: 90vw;
  max-width: 220px;
  height: 90vw;
  max-height: 220px;
}
.compass-dial {
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.compass-label {
  font-weight: 600;
  font-size: 1rem;
  color: #6c757d;
}
.qibla-arrow {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 70px solid var(--primary-color);
  transform-origin: center bottom;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
}
@media (max-width: 767.98px) {
  .qibla-compass-wrapper {
    max-width: 160px;
    max-height: 160px;
  }
  .compass-label {
    font-size: 0.9rem;
  }
}
@media (max-width: 575.98px) {
  .qibla-compass-wrapper {
    max-width: 120px;
    max-height: 120px;
  }
  .compass-label {
    font-size: 0.8rem;
  }
  .list-group-item {
    font-size: 0.97rem;
    padding-left: 0.7rem !important;
    padding-right: 0.7rem !important;
    padding-top: 0.6rem !important;
    padding-bottom: 0.6rem !important;
  }
}
.qibla-info-modern-card {
  background: linear-gradient(135deg, #23405a 0%, #2b7a78 100%);
  border-radius: 2rem;
  color: #fff;
  max-width: 700px;
  box-shadow: 0 4px 32px rgba(44,62,80,0.10);
  margin-bottom: 2rem;
}
.qibla-info-modern-card .display-5 {
  color: #fff;
}
.qibla-info-modern-card .text-muted {
  color: #cfd8dc !important;
}
.qibla-info-modern-card .border-md-start {
  border-left: 1px solid rgba(255,255,255,0.15) !important;
}
@media (max-width: 767.98px) {
  .qibla-info-modern-card {
    border-radius: 1.2rem;
    padding: 0.5rem;
  }
  .qibla-info-modern-card .border-md-start {
    border-left: none !important;
    border-top: 1px solid rgba(255,255,255,0.15) !important;
  }
}
</style>