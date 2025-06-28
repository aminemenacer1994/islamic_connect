```vue
<template>
  <div class="container py-5" ref="qiblaFinder">
    <!-- Header -->
    <header class="text-center mb-5">
      <h1 class="display-3 fw-bold mb-2">Qibla Compass</h1>
      <p class="lead text-muted">Your guide to prayer direction and times.</p>
    </header>

    <!-- Search & Location -->
    <div class="card shadow-md mb-4">
      <div class="container-fluid card-body p-4">
        <h5 class="h4 card-title text-primary fw-bold mb-3">Find Your Location</h5>
        <div class="input-group mb-2">
          <input type="text" class="form-control" placeholder="Enter a city or address" v-model="searchLocation"
            @keyup.enter="searchQibla" ref="searchInput" />
          <button class="btn btn-primary" @click="searchQibla" :disabled="loading" title="Search">
            <i class="bi bi-search"></i>
          </button>
          <button class="btn btn-outline-secondary" @click="getLocation" :disabled="loading" title="Use My Location">
            <i class="bi bi-geo-alt"></i>
            <span class="d-none d-sm-inline">Use My Location</span>
          </button>
        </div>
        <p v-if="error" class="text-danger mt-3 mb-0">{{ error }}</p>
      </div>
    </div>

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

    <div v-if="hasData" class="row g-4">
      <div class="col-lg-6">
        <!-- Qibla & Compass -->
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="h4 card-title text-primary fw-bold mb-0" style="padding: 10px;">
              Qibla Direction
            </h5>
          </div>
          <div class="container-fluid card-body text-center d-flex flex-column justify-content-center p-4">
            <div class="d-flex justify-content-center align-items-center mb-3">
              <div class="qibla-compass-wrapper position-relative mx-auto">
                <div
                  class="compass-dial position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-2 border-secondary bg-light"
                  :style="{ transform: `rotate(-${compassRotation}deg)` }">
                  <div class="compass-label position-absolute top-0 start-50 translate-middle-x">
                    N
                  </div>
                  <div class="compass-label position-absolute bottom-0 start-50 translate-middle-x">
                    S
                  </div>
                  <div class="compass-label position-absolute top-50 end-0 translate-middle-y">
                    E
                  </div>
                  <div class="compass-label position-absolute top-50 start-0 translate-middle-y">
                    W
                  </div>
                </div>
                <!-- Arrow: Responsive, always points outward from center -->
                <div class="qibla-arrow position-absolute top-50 start-50" :style="{
                  transform: `translate(-50%, -60%) rotate(${qiblaDirection - compassRotation
                    }deg)`,
                }"></div>
              </div>
            </div>
            <ul class="list-group list-group-flush text-start mx-auto mb-3 w-100 w-md-75 w-lg-50">
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Direction</span>
                <span class="fw-bold d-flex align-items-center gap-2">
                  <i :class="['bi', directionIconClass]"></i>
                  {{ qiblaDirection?.toFixed(1) }}° ({{ qiblaCardinalDirection }})
                </span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Bearing from North</span>
                <span class="fw-bold">{{ qiblaBearing }}° clockwise</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Relative Dir</span>
                <span class="fw-bold">{{ relativeDirection }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Distance</span>
                <span class="fw-bold">{{ distanceToKaaba?.toFixed(0) }} km /
                  {{ distanceToKaabaMiles?.toFixed(0) }} mi</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Your Coordinates</span>
                <span class="fw-bold">{{ userLatitude?.toFixed(4) }}°, {{ userLongitude?.toFixed(4) }}°</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Kaaba Coordinates</span>
                <span class="fw-bold">21.4225°, 39.8262°</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
                <span class="text-muted">Last Updated</span>
                <span class="fw-bold">{{ lastUpdated }}</span>
              </li>
            </ul>
            <!-- Qibla Info Card (Modern Layout) -->
            <div class="alert alert-info small mb-0" style="
                background: rgba(13, 182, 145, 0.08);
                border-color: rgba(13, 182, 145, 0.2);
                color: rgb(13, 182, 145);
              ">
              <i class="bi bi-info-circle"></i> Compass uses true north, not
              magnetic north. For best accuracy, calibrate your device.
            </div>

            <div class="container-fluid card-body">
              <div class="row g-2">
                <div class="col-6 col-md-6">
                  <button class="btn w-100 btn-outline-secondary" @click="speakQiblaDirection"
                    :disabled="!qiblaDirection">
                    <i class="bi bi-volume-up"></i> Speak
                  </button>
                </div>
                <div class="col-6 col-md-6">
                  <button class="btn w-100 btn-outline-secondary" @click="shareLocation" :disabled="!hasData">
                    <i class="bi bi-share"></i> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-lg-6 d-flex">
        <!-- Prayer Times -->
        <div class="card w-100 ">
          <div class="card-header" style="padding: 10px;">
            <h5 class="h4 card-title text-primary fw-bold mb-0" style="padding: 10px;">
              Prayer Times
            </h5>
          </div>
          <div class=" mt-2 d-flex flex-column" style="padding: 10px;">
            <div class="mb-3 mt-3">
              <select class="form-select" style="padding: 10px;" v-model="calculationMethod" @change="getPrayerTimes"
                aria-label="Prayer time calculation method">
                <option v-for="(name, id) in calculationMethods" :key="id" :value="id">
                  {{ name }}
                </option>
              </select>
            </div>
            <ul v-if="prayerTimes" class="list-group list-group-flush flex-grow-1">
              <li class="list-group-item d-flex justify-content-between align-items-center"
                v-for="(time, name) in prayerTimes" :key="name">
                <span class="text-muted fw-bold">{{ name }}</span>
                <strong class="text-muted">{{ time }}</strong>
              </li>
            </ul>
            <div v-else class="flex-grow-1 d-flex align-items-center justify-content-center">
              <p class="text-muted">Prayer times will appear here.</p>
            </div>
            <p v-if="timezone" class="text-muted small mt-3 mb-0 text-center">
              Timezone: {{ timezone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Calculation Method Explanations -->
    <div v-if="hasData" class="card card-custom mt-4">
      <div class="card-header" style="padding: 10px;">
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
  </div>
</template>

<script>
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
      magneticDeclination: 0.5, // Placeholder, replace with real value if available
      copySuccess: false, // Tracks copy success message
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
      const map = {
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
      return map[this.qiblaCardinalDirection] || "bi-arrow-up";
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
        this.location = { lat: 51.5074, lon: -0.1278 }; // Example: London
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            this.searchLocation
          )}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length) {
          this.userLatitude = parseFloat(data[0].lat);
          this.userLongitude = parseFloat(data[0].lon);
          this.location = { lat: this.userLatitude, lon: this.userLongitude };
          this.calculateQibla();
          this.getPrayerTimes();
          this.lastUpdated = new Date().toLocaleString();
        } else {
          this.error = "Location not found. Please try another search.";
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
          this.error = `Could not get location: ${error.message}`;
          this.loading = false;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
      const degrees = (Math.atan2(y, x) * 180) / Math.PI;
      this.qiblaDirection = degrees;
      const directions = [
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
      const normalizedDegrees = degrees < 0 ? degrees + 360 : degrees;
      const index = Math.round((normalizedDegrees % 360) / 22.5);
      this.qiblaCardinalDirection = directions[index % 16];
      const R = 6371; // Earth radius in km
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
      if (alpha === null) {
        this.compassRotation = event.webkitCompassHeading || 360 - event.alpha;
      } else {
        this.compassRotation = 360 - alpha;
      }
      this.isCalibrated =
        (event.webkitCompassAccuracy && event.webkitCompassAccuracy < 30) ||
        this.accuracy < 30;
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
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${this.userLatitude
          }&longitude=${this.userLongitude}&method=${this.calculationMethod}`
        );
        const data = await response.json();
        if (data.code === 200) {
          const { Imsak, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Midnight } =
            data.data.timings;
          this.prayerTimes = {
            Imsak,
            Fajr,
            Sunrise,
            Dhuhr,
            Asr,
            Maghrib,
            Isha,
            Midnight,
          };
          this.hijriDate = data.data.date.hijri.date;
          this.timezone = data.data.meta.timezone;
        } else {
          this.error = "Could not fetch prayer times.";
          this.prayerTimes = null;
        }
      } catch (e) {
        this.error = "Failed to fetch prayer times.";
        this.prayerTimes = null;
      }
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
    window.speechSynthesis.onvoiceschanged = this.loadVoices;
    this.fetchQiblaDirection();
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      "ondeviceorientationabsolute" in window
    ) {
      this.sensorSupported = true;
      window.addEventListener(
        "deviceorientationabsolute",
        this.handleOrientation,
        true
      );
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      this.sensorSupported = true;
      window.addEventListener("deviceorientation", this.handleOrientation, true);
    }
    this.populateVoiceList();
    if (
      typeof speechSynthesis !== "undefined" &&
      speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = this.populateVoiceList;
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
  width: 90vw;
  max-width: 220px;
  height: 90vw;
  max-height: 220px;
}

.compass-dial {
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
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
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
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
```