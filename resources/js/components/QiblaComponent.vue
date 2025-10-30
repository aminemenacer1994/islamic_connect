<template>
  <main class="container py-5" ref="qiblaFinder" role="main" aria-labelledby="qibla-title">
    <!-- Header -->
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Qibla Compass</h2>
    <p class="text-center text-dark mb-4" style="font-size: 18px;">
      Your essential companion for locating the precise direction of the Kaaba in Mecca for Islamic prayers, ensuring accurate alignment from anywhere in the world. This tool also provides reliable prayer times tailored to your location
    </p>

    <!-- Search & Location -->
    <section class="card shadow-sm mb-4" role="region" aria-labelledby="find-location-title">
      <div class="container-fluid card-body p-4">
        <h5 id="find-location-title" class="h4 card-title text-primary fw-bold mb-3">Find Your Location</h5>
        <div class="input-group mb-2">
          <input
            type="text"
            class="form-control"
            placeholder="Enter a city or address"
            v-model="searchLocation"
            @keyup.enter="searchQibla"
            ref="searchInput"
            aria-label="Enter a city or address"
          />
          <button
            class="btn btn-success"
            @click="searchQibla"
            :disabled="loading"
            title="Search"
            aria-label="Search location"
          >
            <i class="bi bi-search"></i>
          </button>
          <button
            class="btn btn-outline-secondary"
            @click="getLocation"
            :disabled="loading"
            title="Use My Location"
            aria-label="Use my location"
          >
            <i class="bi bi-geo-alt"></i>
            <span class="d-none d-sm-inline">Use My Location</span>
          </button>
        </div>
        <p v-if="error" class="text-danger mt-3 mb-0" role="alert">{{ error }}</p>
      </div>
    </section>

    <!-- Welcome / Initial Content -->
    <div v-if="!hasData" class="card card-custom mb-4">
      <div class="card-body p-lg-4">
        <div class="row g-4">
          <div class="col-lg-6">
            <p class="lead mb-4">
              This tool helps you find the Qibla direction and local prayer times
              accurately.
            </p>
            <h5 class="text-primary fw-bold mb-3">How to Use:</h5>
            <ol class="ps-3 mb-0">
              <li class="mb-2">Enter a city or address in the search bar above.</li>
              <li class="mb-2">
                Or, click
                <i class="bi bi-geo-alt"></i>
                <strong>Use My Location</strong> for automatic detection.
              </li>
              <li class="mb-2">
                Calibrate your device by moving it in a figure-eight motion for the
                most accurate compass reading.
              </li>
            </ol>
          </div>
          <div class="col-lg-6">
            <h5 class="h4 card-title text-primary fw-bold mb-3">
              The Significance of the Qibla
            </h5>
            <br /><br />
            <p class="text-muted mb-3">
              The Qibla is the fixed direction towards the Kaaba in the Grand
              Mosque in Mecca, Saudi Arabia. It is the direction that Muslims face
              when performing Salah (prayer).
            </p>
            <p class="text-muted mb-0">
              Facing the Qibla is a crucial condition for the validity of prayer,
              and it symbolizes the unity of all Muslims worldwide, as they all
              turn towards the same sacred point to worship Allah.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasData" class="row g-4" role="region" aria-label="Results section">
      <div class="col-lg-6">
        <!-- Qibla & Compass -->
        <section class="card shadow-sm h-100" role="region" aria-labelledby="qibla-direction-title">
          <div class="card-header">
            <h5 id="qibla-direction-title" class="h4 card-title text-primary fw-bold mb-0" style="padding: 10px;">
              Qibla Direction
            </h5>
          </div>
          <div
            class="container-fluid card-body text-center d-flex flex-column justify-content-center p-4"
          >
            <div class="d-flex justify-content-center align-items-center mb-3">
              <div class="qibla-compass-wrapper position-relative mx-auto">
                <div
                  class="compass-dial position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-2 border-secondary bg-light"
                  :style="{ transform: `rotate(-${compassRotation}deg)` }"
                >
                  <div
                    class="compass-label position-absolute top-0 start-50 translate-middle-x"
                  >
                    N
                  </div>
                  <div
                    class="compass-label position-absolute bottom-0 start-50 translate-middle-x"
                  >
                    S
                  </div>
                  <div
                    class="compass-label position-absolute top-50 end-0 translate-middle-y"
                  >
                    E
                  </div>
                  <div
                    class="compass-label position-absolute top-50 start-0 translate-middle-y"
                  >
                    W
                  </div>
                  <div
                    v-for="degree in [45, 90, 135, 180, 225, 270, 315]"
                    :key="degree"
                    class="degree-marker position-absolute w-100 h-100"
                    :style="{ transform: `rotate(${degree}deg)` }"
                  >
                    <div class="marker-line position-absolute top-0 start-50"></div>
                  </div>
                </div>
                <svg
                  class="qibla-arrow position-absolute top-50 start-50"
                  :style="{
                    transform: `translate(-50%, -50%) rotate(${qiblaDirection - compassRotation}deg)`,
                    'transform-origin': '25 75'
                  }"
                  width="50"
                  height="150"
                  viewBox="0 0 50 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color: var(--primary-color); stop-opacity: 1" />
                      <stop offset="100%" style="stop-color: var(--primary-hover-color); stop-opacity: 1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M25 150 L40 100 L30 30 L25 0 L20 30 L10 100 Z"
                    fill="url(#arrowGradient)"
                    stroke="var(--primary-hover-color)"
                    stroke-width="3"
                  />
                  <path
                    d="M25 150 L40 100 L25 90 L10 100 Z"
                    fill="var(--primary-color)"
                    stroke="var(--primary-hover-color)"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <ul
              class="list-group list-group-flush text-start mx-auto mb-3 w-100 w-md-75 w-lg-50"
              role="list"
            >
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Direction</span>
                <span class="fw-bold d-flex align-items-center gap-2">
                  <i :class="['bi', directionIconClass]"></i>
                  {{ computedBearing }}° ({{ qiblaCardinalDirection }})
                </span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Bearing from North</span>
                <span class="fw-bold">{{ qiblaBearing }}° clockwise</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Relative Dir</span>
                <span class="fw-bold">{{ relativeDirection }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Distance</span>
                <span class="fw-bold">{{ distanceKmRounded }} km / {{ distanceMiRounded }} mi</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Your Coordinates</span>
                <span class="fw-bold">{{ userLatFmt }}°, {{ userLonFmt }}°</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Kaaba Coordinates</span>
                <span class="fw-bold">21.4225°, 39.8262°</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
                role="listitem"
              >
                <span class="text-muted">Last Updated</span>
                <span class="fw-bold" role="status" aria-live="polite">{{ lastUpdated }}</span>
              </li>
            </ul>
            <div
              class="alert alert-info small mb-0"
              style="
                background: rgba(13, 182, 145, 0.08);
                border-color: rgba(13, 182, 145, 0.2);
                color: rgb(13, 182, 145);
              "
            >
              <i class="bi bi-info-circle"></i> Compass uses true north, not
              magnetic north. For best accuracy, calibrate your device.
            </div>
            <div class="container-fluid card-body">
              <div class="row g-2">
                <div class="col-6 col-md-6">
                  <button
                    class="btn w-100 btn-primary text-white d-flex align-items-center justify-content-center gap-2"
                    @click="speakQiblaDirection"
                    :disabled="!qiblaDirection"
                    title="Speak Qibla Direction"
                  >
                    <i class="bi bi-volume-up-fill fs-5"></i>
                    <span>Speak</span>
                  </button>
                </div>
                <div class="col-6 col-md-6">
                  <button
                    class="btn w-100 btn-primary text-white d-flex align-items-center justify-content-center gap-2"
                    @click="shareLocation"
                    :disabled="!hasData"
                    title="Share Location"
                  >
                    <i class="bi bi-share-fill fs-5"></i>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-lg-6 d-flex">
        <section class="card card-custom h-100 w-100" role="region" aria-labelledby="prayer-times-title">
          <div class="card-header">
            <h5 id="prayer-times-title" class="h4 card-title text-primary fw-bold mb-0" style="padding: 10px;">
              Prayer Times
            </h5>
          </div>
          <div class="card-body d-flex flex-column p-lg-4">
            <div class="mb-3">
              <h6 class="text-primary fw-bold mb-2">Hijri Date</h6>
              <p v-if="hijriDate" class="text-muted mb-3">{{ hijriDate }}</p>
            </div>
            <div class="mb-3">
              <h6 class="text-primary fw-bold mb-2">Calculation Method</h6>
              <select
                class="form-select"
                v-model="calculationMethod"
                @change="getPrayerTimes"
                aria-label="Prayer time calculation method"
              >
                <option
                  v-for="(name, id) in calculationMethods"
                  :key="id"
                  :value="id"
                >
                  {{ name }}
                </option>
              </select>
            </div>
            <ul
              v-if="prayerTimes"
              class="list-group list-group-flush flex-grow-1"
              role="list"
            >
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="(time, name) in prayerTimes"
                :key="name"
                role="listitem"
              >
                <span class="text-muted fw-bold">{{ name }}</span>
                <strong class="text-muted">{{ time }}</strong>
              </li>
            </ul>
            <div
              v-else
              class="flex-grow-1 d-flex align-items-center justify-content-center"
              >
              <p class="text-muted">Prayer times will appear here.</p>
            </div>
            <p
              v-if="timezone"
              class="text-muted small mt-3 mb-0 text-center" role="status" aria-live="polite"
            >
              Timezone: {{ timezone }}
            </p>
          </div>
        </section>
      </div>
    </div>

    <div v-if="hasData" class="card card-custom mt-4">
      <div class="card-header">
        <h5 class="h4 card-title text-primary fw-bold mb-0" style="padding: 10px;">
          About Prayer Time Methods
        </h5>
      </div>
      <div class="card-body p-lg-4">
        <p class="text-muted mb-4">
          Different organizations use various conventions for calculating prayer
          times. Here are the methods available in this tool. Select the one most
          commonly used in your region.
        </p>
        <div class="row g-3">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="method-card p-3 border rounded">
              <h6 class="text-primary fw-bold mb-2">Muslim World League</h6>
              <p class="text-muted small mb-0">
                Uses Fajr angle of 18° and Isha angle of 17°. Widely used in
                Europe, the Far East, and parts of the US.
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="method-card p-3 border rounded">
              <h6 class="text-primary fw-bold mb-2">ISNA (North America)</h6>
              <p class="text-muted small mb-0">
                Sets both Fajr and Isha angles to 15°. The standard method for
                North America.
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="method-card p-3 border rounded">
              <h6 class="text-primary fw-bold mb-2">
                Egyptian General Authority
              </h6>
              <p class="text-muted small mb-0">
                Uses Fajr angle of 19.5° and Isha angle of 17.5°. Used in Africa,
                Syria, and parts of the US.
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="method-card p-3 border rounded">
              <h6 class="text-primary fw-bold mb-2">Umm Al-Qura, Makkah</h6>
              <p class="text-muted small mb-0">
                Uses a Fajr angle of 18.5°. Isha is 90 minutes after Maghrib. Used
                in the Arabian Peninsula.
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="method-card p-3 border rounded">
              <h6 class="text-primary fw-bold mb-2">University of Karachi</h6>
              <p class="text-muted small mb-0">
                Sets Fajr and Isha angles to 18°. Common in Pakistan, Bangladesh,
                India, and Afghanistan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// Hoisted constants to avoid reallocation on renders
const DIRS_16 = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];
const DIR_TO_ICON = {
  N: "bi-arrow-up",
  NNE: "bi-arrow-up-right",
  NE: "bi-arrow-up-right",
  ENE: "bi-arrow-up-right",
  E: "bi-arrow-right",
  ESE: "bi-arrow-down-right",
  SE: "bi-arrow-down-right",
  SSE: "bi-arrow-down-right",
  S: "bi-arrow-down",
  SSW: "bi-arrow-down-left",
  SW: "bi-arrow-down-left",
  WSW: "bi-arrow-down-left",
  W: "bi-arrow-left",
  WNW: "bi-arrow-up-left",
  NW: "bi-arrow-up-left",
  NNW: "bi-arrow-up-left",
};
let rafId = null;
const DEGREE_EPS = 0.5;

export default {
  name: "QiblaFinder",
  data() {
    return {
      location: null,
      isFullscreen: false,
      error: "",
      searchLocation: "",
      userLatitude: null,
      userLongitude: null,
      qiblaDirection: null,
      distanceToKaaba: null,
      distanceToKaabaMiles: null,
      qiblaCardinalDirection: null,
      compassRotation: 0,
      loading: false,
      isCalibrated: false,
      sensorSupported: false,
      accuracy: null,
      prayerTimes: null,
      hijriDate: null,
      timezone: null,
      calculationMethod: "2",
      calculationMethods: {
        "1": "Muslim World League",
        "2": "ISNA (North America)",
        "3": "Egyptian General Authority",
        "4": "Umm Al-Qura, Makkah",
        "5": "University of Karachi",
      },
      showTtsSettings: false,
      availableVoices: [],
      selectedVoiceUri: null,
      speechRate: 1,
      speechPitch: 1,
      lastUpdated: null,
      magneticDeclination: 0.5,
      copySuccess: false,
    };
  },
  computed: {
    hasData() {
      return !!this.qiblaDirection && !!this.location;
    },
    qiblaBearing() {
      if (this.qiblaDirection == null) return "";
      let deg = this.qiblaDirection % 360;
      if (deg < 0) deg += 360;
      return deg.toFixed(1);
    },
    // Pre-format frequently shown values to reduce template work
    computedBearing() {
      return this.qiblaDirection == null ? "" : this.qiblaDirection.toFixed(1);
    },
    distanceKmRounded() {
      return this.distanceToKaaba == null ? "" : this.distanceToKaaba.toFixed(0);
    },
    distanceMiRounded() {
      return this.distanceToKaabaMiles == null ? "" : this.distanceToKaabaMiles.toFixed(0);
    },
    userLatFmt() {
      return this.userLatitude == null ? "" : this.userLatitude.toFixed(4);
    },
    userLonFmt() {
      return this.userLongitude == null ? "" : this.userLongitude.toFixed(4);
    },
    relativeDirection() {
      if (this.qiblaDirection == null) return "";
      let deg = this.qiblaDirection % 360;
      if (deg < 0) deg += 360;
      if (deg === 0) return "Face North";
      if (deg < 180) return `Turn ${deg.toFixed(1)}° right from North`;
      if (deg > 180) return `Turn ${(360 - deg).toFixed(1)}° left from North`;
      return "Face South";
    },
    directionIconClass() {
      return DIR_TO_ICON[this.qiblaCardinalDirection] || "bi-arrow-up";
    },
    qiblaCardinalDirectionText() {
      const map = {
        N: "North",
        NNE: "North-East",
        NE: "North-East",
        ENE: "East-North-East",
        E: "East",
        ESE: "East-South-East",
        SE: "South-East",
        SSE: "South-South-East",
        S: "South",
        SSW: "South-South-West",
        SW: "South-West",
        WSW: "West-South-West",
        W: "West",
        WNW: "West-North-West",
        NW: "North-West",
        NNW: "North-North-West",
      };
      return map[this.qiblaCardinalDirection] || this.qiblaCardinalDirection;
    },
  },
  methods: {
    async loadVoices() {
      try {
        this.availableVoices = window.speechSynthesis.getVoices();
        if (this.availableVoices.length > 0 && !this.selectedVoiceUri) {
          this.selectedVoiceUri = this.availableVoices[0].voiceURI;
        }
      } catch (err) {
        this.error = "Failed to load text-to-speech voices.";
        console.error("Error loading voices:", err);
      }
    },
    async fetchQiblaDirection() {
      try {
        this.location = { lat: 51.5074, lon: -0.1278 };
        this.userLatitude = 51.5074;
        this.userLongitude = -0.1278;
        this.calculateQibla();
        this.getPrayerTimes();
        this.lastUpdated = new Date().toLocaleString();
      } catch (err) {
        this.error = "Failed to fetch Qibla direction. Please try again.";
        console.error("Error fetching Qibla direction:", err);
      }
    },
    async searchQibla() {
      if (!this.searchLocation.trim()) {
        this.error = "Please enter a location.";
        return;
      }
      this.loading = true;
      this.error = "";
      try {
        const key = this.cacheKeyGeo(this.searchLocation);
        const cached = sessionStorage.getItem(key);
        if (cached) {
          const { lat, lon } = JSON.parse(cached);
          this.userLatitude = lat;
          this.userLongitude = lon;
          this.location = { lat, lon };
          this.calculateQibla();
          this.getPrayerTimes();
          this.lastUpdated = new Date().toLocaleString();
        } else {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              this.searchLocation
            )}&format=json&limit=1`
          );
          const data = await response.json();
          if (data.length) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            sessionStorage.setItem(key, JSON.stringify({ lat, lon }));
            this.userLatitude = lat;
            this.userLongitude = lon;
            this.location = { lat, lon };
            this.calculateQibla();
            this.getPrayerTimes();
            this.lastUpdated = new Date().toLocaleString();
          } else {
            this.error = "Location not found. Please try another search.";
          }
        }
      } catch (error) {
        this.error = "Failed to fetch location data. Please check your connection.";
      } finally {
        this.loading = false;
      }
    },
    getLocation() {
      this.loading = true;
      this.error = "";
      if (!navigator.geolocation) {
        this.error = "Geolocation is not supported by your browser.";
        this.loading = false;
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
          this.location = {
            lat: this.userLatitude,
            lon: this.userLongitude,
          };
          this.calculateQibla();
          this.getPrayerTimes();
          this.lastUpdated = new Date().toLocaleString();
          this.loading = false;
        },
        (error) => {
          // Retry once with high accuracy if permitted and not a permission issue
          if (error.code !== error.PERMISSION_DENIED) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                this.userLatitude = pos.coords.latitude;
                this.userLongitude = pos.coords.longitude;
                this.accuracy = pos.coords.accuracy;
                this.location = { lat: this.userLatitude, lon: this.userLongitude };
                this.calculateQibla();
                this.getPrayerTimes();
                this.lastUpdated = new Date().toLocaleString();
              },
              (e2) => {
                this.error = `Could not get location: ${e2.message}`;
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          } else {
            this.error = `Could not get location: ${error.message}`;
          }
          this.loading = false;
        },
        { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 }
      );
    },
    calculateQibla() {
      const kaabaLat = 21.4225,
        kaabaLon = 39.8262;
      const lat1 = (this.userLatitude * Math.PI) / 180;
      const lon1 = (this.userLongitude * Math.PI) / 180;
      const lat2 = (kaabaLat * Math.PI) / 180;
      const lon2 = (kaabaLon * Math.PI) / 180;
      const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      const deg = (((Math.atan2(y, x) * 180) / Math.PI) + 360) % 360;
      this.qiblaDirection = deg;
      const index = Math.round(deg / 22.5) % 16;
      this.qiblaCardinalDirection = DIRS_16[index];
      const R = 6371;
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      const distanceInKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distanceToKaaba = distanceInKm;
      this.distanceToKaabaMiles = distanceInKm * 0.621371;
    },
    handleOrientation(event) {
      const alpha = event.alpha;
      let newRotation;
      if (alpha == null) {
        newRotation = event.webkitCompassHeading ?? 0;
      } else {
        newRotation = 360 - alpha;
      }
      if (Math.abs(newRotation - this.compassRotation) < DEGREE_EPS) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        this.compassRotation = newRotation;
        rafId = null;
      });
      this.isCalibrated =
        (event.webkitCompassAccuracy && event.webkitCompassAccuracy < 30) ||
        (this.accuracy != null && this.accuracy < 30);
    },
    speakQiblaDirection() {
      if (!this.qiblaDirection) {
        this.error = "No Qibla direction available to speak.";
        return;
      }
      try {
        const utterance = new SpeechSynthesisUtterance(
          `The Qibla direction is ${this.qiblaDirection.toFixed(1)} degrees.`
        );
        const selectedVoice = this.availableVoices.find(
          (voice) => voice.voiceURI === this.selectedVoiceUri
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        utterance.rate = Number(this.speechRate) || 1;
        utterance.pitch = Number(this.speechPitch) || 1;
        utterance.lang = selectedVoice?.lang || "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        utterance.onerror = (event) => {
          this.error = "Error during speech synthesis. Please try again.";
          console.error("Speech synthesis error:", event);
        };
      } catch (err) {
        this.error = "Failed to initialize speech synthesis.";
        console.error("Error in speakQiblaDirection:", err);
      }
    },
    async shareLocation() {
      if (!this.hasData) {
        this.error = "No location or Qibla direction available to share.";
        return;
      }
      try {
        const mapsUrl = `https://www.google.com/maps?q=${this.location.lat},${this.location.lon}`;
        const shareText = `Qibla Direction: ${this.qiblaDirection.toFixed(1)}°\nLocation: ${this.location.lat}, ${this.location.lon}\n${mapsUrl}`;
        if (window.innerWidth > 768 && !navigator.share) {
          const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, '_blank');
          return;
        }
        if (navigator.share) {
          await navigator.share({
            title: "Qibla Direction",
            text: shareText,
            url: mapsUrl,
          });
        } else {
          await navigator.clipboard.writeText(shareText);
          this.error = "Location copied to clipboard! Paste it in WhatsApp Web.";
        }
      } catch (err) {
        this.error = "Failed to share location. Please try again.";
        console.error("Error in shareLocation:", err);
      }
    },
    async copyToClipboard() {
      if (!this.hasData) {
        this.error = "No location or Qibla direction available to copy.";
        return;
      }
      try {
        const textToCopy = `Qibla Direction: ${this.qiblaDirection.toFixed(1)}°\nLocation: ${this.location.lat}, ${this.location.lon}\nhttps://www.google.com/maps?q=${this.location.lat},${this.location.lon}`;
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
          } catch (err) {
            this.error = "Failed to copy to clipboard. Please try again.";
            console.error("Clipboard fallback error:", err);
            return;
          }
          document.body.removeChild(textArea);
        }
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 3000);
      } catch (err) {
        this.error = "Failed to copy to clipboard. Please try again.";
        console.error("Error in copyToClipboard:", err);
      }
    },
    async getPrayerTimes() {
      if (!this.userLatitude) return;
      this.error = "";
      try {
        const key = this.cacheKeyPrayer();
        const cached = key ? sessionStorage.getItem(key) : null;
        if (cached) {
          const parsed = JSON.parse(cached);
          this.prayerTimes = parsed.prayerTimes;
          this.hijriDate = parsed.hijriDate;
          this.timezone = parsed.timezone;
          return;
        }
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${this.userLatitude}&longitude=${this.userLongitude}&method=${this.calculationMethod}`
        );
        const data = await response.json();
        if (data.code === 200) {
          const { Imsak, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Midnight } = data.data.timings;
          this.prayerTimes = { Imsak, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Midnight };
          this.hijriDate = data.data.date.hijri.date;
          this.timezone = data.data.meta.timezone;
          if (key) {
            sessionStorage.setItem(
              key,
              JSON.stringify({
                prayerTimes: this.prayerTimes,
                hijriDate: this.hijriDate,
                timezone: this.timezone,
              })
            );
          }
        } else {
          this.error = "Could not fetch prayer times.";
          this.prayerTimes = null;
        }
      } catch (e) {
        this.error = "Failed to fetch prayer times.";
        this.prayerTimes = null;
      }
    },
    cacheKeyPrayer() {
      if (!this.userLatitude || !this.userLongitude) return null;
      const lat = this.userLatitude.toFixed(4);
      const lon = this.userLongitude.toFixed(4);
      return `pt:${lat},${lon},m:${this.calculationMethod}`;
    },
    cacheKeyGeo(q) {
      return `geo:${q.trim().toLowerCase()}`;
    },
    toggleFullscreen() {
      const el = this.$refs.qiblaFinder;
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch((err) => alert(`Fullscreen failed: ${err.message}`));
        this.isFullscreen = true;
      } else {
        document.exitFullscreen();
        this.isFullscreen = false;
      }
    },
    populateVoiceList() {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        this.availableVoices = voices.sort((a, b) => a.lang.localeCompare(b.lang));
        if (!this.selectedVoiceUri) {
          const defaultVoice =
            voices.find((voice) => voice.default) ||
            voices.find((v) => v.lang.startsWith("en"));
          this.selectedVoiceUri = defaultVoice
            ? defaultVoice.voiceURI
            : voices[0]?.voiceURI;
        }
      }
    },
  },
  mounted() {
    this.loadVoices();
    if (typeof window.speechSynthesis !== "undefined") {
      window.speechSynthesis.onvoiceschanged = this.loadVoices;
    }
    this.fetchQiblaDirection();
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      "ondeviceorientationabsolute" in window
    ) {
      this.sensorSupported = true;
      window.addEventListener("deviceorientationabsolute", this.handleOrientation, { capture: true, passive: true });
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      this.sensorSupported = true;
      window.addEventListener("deviceorientation", this.handleOrientation, { capture: true, passive: true });
    }
  },
  beforeDestroy() {
    if (this.sensorSupported) {
      window.removeEventListener(
        "deviceorientationabsolute",
        this.handleOrientation,
        true
      );
      window.removeEventListener("deviceorientation", this.handleOrientation, true);
    }
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.onvoiceschanged = null;
    }
    if (rafId) cancelAnimationFrame(rafId);
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

.btn-tertiary:hover,
.btn-tertiary:focus {
  background-color: var(--tertiary-hover-bg-color) !important;
  color: var(--primary-hover-color) !important;
}

.qibla-compass-wrapper {
  width: 40vw;
  max-width: 300px;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
}

.compass-dial {
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.compass-label {
  font-weight: 600;
  font-size: 1rem;
  color: #6c757d;
  pointer-events: none;
}

.degree-marker {
  pointer-events: none;
}

.marker-line {
  width: 2px;
  height: 8px;
  background: #6c757d;
  transform: translateX(-50%);
}

.qibla-arrow {
  width: 20%;
  max-width: 60px;
  height: 50%;
  max-height: 150px;
  transform-origin: 25px 75px;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) brightness(1.1);
}

@media (max-width: 767.98px) {
  .qibla-compass-wrapper {
    width: 50vw;
    max-width: 200px;
  }

  .compass-label {
    font-size: 0.9rem;
  }

  .marker-line {
    height: 6px;
  }

  .qibla-arrow {
    width: 25%;
    max-width: 50px;
    height: 50%;
    max-height: 100px;
    transform-origin: 25px 50px;
  }
}

@media (max-width: 575.98px) {
  .qibla-compass-wrapper {
    width: 60vw;
    max-width: 150px;
  }

  .compass-label {
    font-size: 0.8rem;
  }

  .marker-line {
    height: 5px;
  }

  .qibla-arrow {
    width: 30%;
    max-width: 45px;
    height: 50%;
    max-height: 75px;
    transform-origin: 22.5px 37.5px;
  }
}

.list-group-item {
  font-size: 0.97rem;
  padding-left: 0.7rem !important;
  padding-right: 0.7rem !important;
  padding-top: 0.6rem !important;
  padding-bottom: 0.6rem !important;
}

.qibla-info-modern-card {
  background: linear-gradient(135deg, #23405a 0%, #2b7a78 100%);
  border-radius: 2rem;
  color: #fff;
  max-width: 700px;
  box-shadow: 0 4px 32px rgba(44, 62, 80, 0.1);
  margin-bottom: 2rem;
}

.qibla-info-modern-card .display-5 {
  color: #fff;
}

.qibla-info-modern-card .text-muted {
  color: #cfd8dc !important;
}

.qibla-info-modern-card .border-md-start {
  border-left: 1px solid rgba(255, 255, 255, 0.15) !important;
}

/* Accessibility: ensure sufficient contrast for lead muted text */
/* Broaden selector and darken further to guarantee >= 4.5:1 on #f5f5f5 */
header .lead.text-muted,
.lead.text-muted {
  color: #343a40 !important;
}

@media (max-width: 767.98px) {
  .qibla-info-modern-card {
    border-radius: 1.2rem;
    padding: 0.5rem;
  }

  .qibla-info-modern-card .border-md-start {
    border-left: none !important;
    border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
  }
}
</style>
