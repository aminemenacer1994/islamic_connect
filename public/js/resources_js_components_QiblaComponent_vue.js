"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_QiblaComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Hoisted constants to avoid reallocation on renders
const DIRS_16 = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
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
  NNW: "bi-arrow-up-left"
};
let rafId = null;
const DEGREE_EPS = 0.5;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
        "5": "University of Karachi"
      },
      showTtsSettings: false,
      availableVoices: [],
      selectedVoiceUri: null,
      speechRate: 1,
      speechPitch: 1,
      lastUpdated: null,
      magneticDeclination: 0.5,
      copySuccess: false,
      nextStepMinimized: false
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
        NNW: "North-North-West"
      };
      return map[this.qiblaCardinalDirection] || this.qiblaCardinalDirection;
    }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
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
        this.location = {
          lat: 51.5074,
          lon: -0.1278
        };
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
          const {
            lat,
            lon
          } = JSON.parse(cached);
          this.userLatitude = lat;
          this.userLongitude = lon;
          this.location = {
            lat,
            lon
          };
          this.calculateQibla();
          this.getPrayerTimes();
          this.lastUpdated = new Date().toLocaleString();
        } else {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchLocation)}&format=json&limit=1`);
          const data = await response.json();
          if (data.length) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            sessionStorage.setItem(key, JSON.stringify({
              lat,
              lon
            }));
            this.userLatitude = lat;
            this.userLongitude = lon;
            this.location = {
              lat,
              lon
            };
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
      navigator.geolocation.getCurrentPosition(position => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        this.location = {
          lat: this.userLatitude,
          lon: this.userLongitude
        };
        this.calculateQibla();
        this.getPrayerTimes();
        this.lastUpdated = new Date().toLocaleString();
        this.loading = false;
      }, error => {
        // Retry once with high accuracy if permitted and not a permission issue
        if (error.code !== error.PERMISSION_DENIED) {
          navigator.geolocation.getCurrentPosition(pos => {
            this.userLatitude = pos.coords.latitude;
            this.userLongitude = pos.coords.longitude;
            this.accuracy = pos.coords.accuracy;
            this.location = {
              lat: this.userLatitude,
              lon: this.userLongitude
            };
            this.calculateQibla();
            this.getPrayerTimes();
            this.lastUpdated = new Date().toLocaleString();
          }, e2 => {
            this.error = `Could not get location: ${e2.message}`;
          }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        } else {
          this.error = `Could not get location: ${error.message}`;
        }
        this.loading = false;
      }, {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 300000
      });
    },
    calculateQibla() {
      const kaabaLat = 21.4225,
        kaabaLon = 39.8262;
      const lat1 = this.userLatitude * Math.PI / 180;
      const lon1 = this.userLongitude * Math.PI / 180;
      const lat2 = kaabaLat * Math.PI / 180;
      const lon2 = kaabaLon * Math.PI / 180;
      const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      const deg = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
      this.qiblaDirection = deg;
      const index = Math.round(deg / 22.5) % 16;
      this.qiblaCardinalDirection = DIRS_16[index];
      const R = 6371;
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      const distanceInKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distanceToKaaba = distanceInKm;
      this.distanceToKaabaMiles = distanceInKm * 0.621371;
    },
    handleOrientation(event) {
      const alpha = event.alpha;
      let newRotation;
      if (alpha == null) {
        var _event$webkitCompassH;
        newRotation = (_event$webkitCompassH = event.webkitCompassHeading) !== null && _event$webkitCompassH !== void 0 ? _event$webkitCompassH : 0;
      } else {
        newRotation = 360 - alpha;
      }
      if (Math.abs(newRotation - this.compassRotation) < DEGREE_EPS) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        this.compassRotation = newRotation;
        rafId = null;
      });
      this.isCalibrated = event.webkitCompassAccuracy && event.webkitCompassAccuracy < 30 || this.accuracy != null && this.accuracy < 30;
    },
    speakQiblaDirection() {
      if (!this.qiblaDirection) {
        this.error = "No Qibla direction available to speak.";
        return;
      }
      try {
        const utterance = new SpeechSynthesisUtterance(`The Qibla direction is ${this.qiblaDirection.toFixed(1)} degrees.`);
        const selectedVoice = this.availableVoices.find(voice => voice.voiceURI === this.selectedVoiceUri);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        utterance.rate = Number(this.speechRate) || 1;
        utterance.pitch = Number(this.speechPitch) || 1;
        utterance.lang = (selectedVoice === null || selectedVoice === void 0 ? void 0 : selectedVoice.lang) || "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        utterance.onerror = event => {
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
            url: mapsUrl
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
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${this.userLatitude}&longitude=${this.userLongitude}&method=${this.calculationMethod}`);
        const data = await response.json();
        if (data.code === 200) {
          const {
            Imsak,
            Fajr,
            Sunrise,
            Dhuhr,
            Asr,
            Maghrib,
            Isha,
            Midnight
          } = data.data.timings;
          this.prayerTimes = {
            Imsak,
            Fajr,
            Sunrise,
            Dhuhr,
            Asr,
            Maghrib,
            Isha,
            Midnight
          };
          this.hijriDate = data.data.date.hijri.date;
          this.timezone = data.data.meta.timezone;
          if (key) {
            sessionStorage.setItem(key, JSON.stringify({
              prayerTimes: this.prayerTimes,
              hijriDate: this.hijriDate,
              timezone: this.timezone
            }));
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
        this.availableVoices = voices.sort((a, b) => a.lang.localeCompare(b.lang));
        if (!this.selectedVoiceUri) {
          var _voices$;
          const defaultVoice = voices.find(voice => voice.default) || voices.find(v => v.lang.startsWith("en"));
          this.selectedVoiceUri = defaultVoice ? defaultVoice.voiceURI : (_voices$ = voices[0]) === null || _voices$ === void 0 ? void 0 : _voices$.voiceURI;
        }
      }
    }
  },
  mounted() {
    this.loadVoices();
    if (typeof window.speechSynthesis !== "undefined") {
      window.speechSynthesis.onvoiceschanged = this.loadVoices;
    }
    this.fetchQiblaDirection();
    if (typeof DeviceOrientationEvent !== "undefined" && "ondeviceorientationabsolute" in window) {
      this.sensorSupported = true;
      window.addEventListener("deviceorientationabsolute", this.handleOrientation, {
        capture: true,
        passive: true
      });
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      this.sensorSupported = true;
      window.addEventListener("deviceorientation", this.handleOrientation, {
        capture: true,
        passive: true
      });
    }
  },
  beforeDestroy() {
    if (this.sensorSupported) {
      window.removeEventListener("deviceorientationabsolute", this.handleOrientation, true);
      window.removeEventListener("deviceorientation", this.handleOrientation, true);
    }
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.onvoiceschanged = null;
    }
    if (rafId) cancelAnimationFrame(rafId);
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-5",
  ref: "qiblaFinder",
  role: "main",
  "aria-labelledby": "qibla-title"
};
const _hoisted_2 = {
  class: "container",
  style: {
    "padding": "10px"
  }
};
const _hoisted_3 = {
  class: "mx-auto mb-4",
  style: {
    "position": "relative",
    "background": "#eaf3f1",
    "border": "1px solid rgba(11, 128, 111, 0.20)",
    "border-radius": "24px",
    "box-shadow": "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09)",
    "padding": "1.25rem 1.75rem"
  }
};
const _hoisted_4 = ["title", "aria-label"];
const _hoisted_5 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_6 = {
  style: {
    "flex": "1"
  }
};
const _hoisted_7 = {
  class: "mb-2 d-inline-flex align-items-center gap-1",
  style: {
    "color": "#1f2933"
  }
};
const _hoisted_8 = {
  class: "mb-3",
  style: {
    "color": "#1f2933",
    "line-height": "1.7",
    "font-size": "1.02rem"
  }
};
const _hoisted_9 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_10 = {
  class: "card shadow-sm mb-4",
  role: "region",
  "aria-labelledby": "find-location-title"
};
const _hoisted_11 = {
  class: "container-fluid card-body p-4"
};
const _hoisted_12 = {
  class: "row g-0 align-items-stretch mb-2 w-100"
};
const _hoisted_13 = {
  class: "col-10 col-md-10"
};
const _hoisted_14 = {
  class: "col-1 col-md-1"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  class: "col-1 col-md-1"
};
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  key: 0,
  class: "text-danger mt-3 mb-0",
  role: "alert"
};
const _hoisted_19 = {
  key: 0,
  class: "card card-teal card-custom mb-4"
};
const _hoisted_20 = {
  key: 1,
  class: "row g-4",
  role: "region",
  "aria-label": "Results section"
};
const _hoisted_21 = {
  class: "col-lg-6"
};
const _hoisted_22 = {
  class: "card shadow-sm h-100",
  role: "region",
  "aria-labelledby": "qibla-direction-title"
};
const _hoisted_23 = {
  class: "container-fluid card-teal card-body text-center d-flex flex-column justify-content-center p-4"
};
const _hoisted_24 = {
  class: "d-flex justify-content-center align-items-center mb-3"
};
const _hoisted_25 = {
  class: "qibla-compass-wrapper position-relative mx-auto"
};
const _hoisted_26 = {
  class: "list-group list-group-flush text-start mx-auto mb-3 w-100 w-md-75 w-lg-50",
  role: "list"
};
const _hoisted_27 = {
  class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
  role: "listitem"
};
const _hoisted_28 = {
  class: "fw-bold d-flex align-items-center gap-2"
};
const _hoisted_29 = {
  class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
  role: "listitem"
};
const _hoisted_30 = {
  class: "fw-bold"
};
const _hoisted_31 = {
  class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
  role: "listitem"
};
const _hoisted_32 = {
  class: "fw-bold"
};
const _hoisted_33 = {
  class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
  role: "listitem"
};
const _hoisted_34 = {
  class: "fw-bold"
};
const _hoisted_35 = {
  class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
  role: "listitem"
};
const _hoisted_36 = {
  class: "fw-bold"
};
const _hoisted_37 = {
  class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
  role: "listitem"
};
const _hoisted_38 = {
  class: "fw-bold",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_39 = {
  class: "container-fluid card-body"
};
const _hoisted_40 = {
  class: "row g-2"
};
const _hoisted_41 = {
  class: "col-6 col-md-6"
};
const _hoisted_42 = ["disabled"];
const _hoisted_43 = {
  class: "col-6 col-md-6"
};
const _hoisted_44 = ["disabled"];
const _hoisted_45 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_46 = {
  class: "card card-custom h-100 w-100",
  role: "region",
  "aria-labelledby": "prayer-times-title"
};
const _hoisted_47 = {
  class: "card-body card-teal d-flex flex-column p-lg-4"
};
const _hoisted_48 = {
  class: "mb-3"
};
const _hoisted_49 = {
  key: 0,
  class: "text-muted mb-3"
};
const _hoisted_50 = {
  class: "mb-3"
};
const _hoisted_51 = ["value"];
const _hoisted_52 = {
  key: 0,
  class: "list-group list-group-flush flex-grow-1",
  role: "list"
};
const _hoisted_53 = {
  class: "text-muted fw-bold"
};
const _hoisted_54 = {
  class: "text-muted"
};
const _hoisted_55 = {
  key: 1,
  class: "flex-grow-1 d-flex align-items-center justify-content-center"
};
const _hoisted_56 = {
  key: 2,
  class: "text-muted small mt-3 mb-0 text-center",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_57 = {
  key: 2,
  class: "card card-custom mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header "), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center fw-bold display-5 display-md-4"
  }, "Qibla Compass", -1 /* CACHED */)), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-dark mb-4",
    style: {
      "font-size": "18px"
    }
  }, " Your essential companion for locating the precise direction of the Kaaba in Mecca for Islamic prayers, ensuring accurate alignment from anywhere in the world. This tool also provides reliable prayer times tailored to your location ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: $data.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": $data.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    style: {
      "position": "absolute",
      "right": "44px",
      "top": "14px",
      "opacity": "0.9",
      "background": "transparent",
      "border": "0",
      "color": "#6b8b91",
      "z-index": "3",
      "cursor": "pointer"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle",
    role: "img",
    "aria-label": "Gentle prayer time guide",
    style: {
      "width": "48px",
      "height": "48px",
      "border-radius": "50%",
      "background": "linear-gradient(145deg, rgba(11, 128, 111, 0.24), rgba(26, 95, 122, 0.12))",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "color": "rgb(0, 121, 107)",
      "font-size": "1.25rem",
      "box-shadow": "inset 0 0 0 1px rgba(11, 128, 111, 0.24), 0 6px 16px rgba(26,95,122,0.12)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-clock",
    "aria-hidden": "true"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase",
    style: {
      "letter-spacing": "0.1em",
      "color": "#1a5f7a",
      "font-size": "0.78rem"
    }
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/prayer",
    class: "fw-semibold text-decoration-none d-inline-flex align-items-center gap-1",
    style: {
      "color": "rgb(0, 121, 107)"
    },
    "aria-label": "Open the Prayer Times companion"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Check Prayer Times "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square",
    "aria-hidden": "true",
    style: {
      "color": "rgb(0, 121, 107)",
      "font-size": "0.82rem",
      "opacity": "0.85"
    }
  })], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Found your Qibla and need the schedule next? Our Prayer Times guide can flow from alignment to Salah with confidence. ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/prayer",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "rgb(0, 121, 107)"
    }
  }, " Visit Prayer Times ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" whenever you’re ready to plan the day. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/prayer",
    class: "btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center",
    style: {
      "background": "linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a)",
      "border": "none",
      "border-radius": "999px",
      "box-shadow": "0 10px 20px rgba(26, 95, 122, 0.22)",
      "transition": "transform 0.2s ease, box-shadow 0.2s ease"
    },
    onmouseover: "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 26px rgba(26, 95, 122, 0.26)';",
    onmouseout: "this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.22)';"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Open Prayer Times"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-praying-hands ms-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Open the accessible Prayer Times experience")], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search & Location "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    id: "find-location-title",
    class: "h4 card-title text-primary fw-bold mb-3 d-block w-100"
  }, " Find Your Location ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control h-100",
    placeholder: "Enter a city or address",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.searchLocation = $event),
    onKeyup: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.searchQibla && $options.searchQibla(...args), ["enter"])),
    ref: "searchInput",
    "aria-label": "Enter a city or address"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchLocation]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-success w-100 h-100 d-flex justify-content-center align-items-center",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.searchQibla && $options.searchQibla(...args)),
    disabled: $data.loading,
    title: "Search",
    "aria-label": "Search location"
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary w-100 h-100 d-flex justify-content-center align-items-center gap-1",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.getLocation && $options.getLocation(...args)),
    disabled: $data.loading,
    title: "Use My Location",
    "aria-label": "Use my location"
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-geo-alt"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "d-none d-sm-inline"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)])]), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Welcome / Initial Content "), !$options.hasData ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-body p-lg-4\" data-v-6d77f7a9><div class=\"row g-4\" data-v-6d77f7a9><div class=\"col-lg-6\" data-v-6d77f7a9><p class=\"lead mb-4\" data-v-6d77f7a9> This tool helps you find the Qibla direction and local prayer times accurately. </p><h5 class=\"text-primary fw-bold mb-3\" data-v-6d77f7a9>How to Use:</h5><ol class=\"ps-3 mb-0\" data-v-6d77f7a9><li class=\"mb-2\" data-v-6d77f7a9>Enter a city or address in the search bar above.</li><li class=\"mb-2\" data-v-6d77f7a9> Or, click <i class=\"bi bi-geo-alt\" data-v-6d77f7a9></i><strong data-v-6d77f7a9>Use My Location</strong> for automatic detection. </li><li class=\"mb-2\" data-v-6d77f7a9> Calibrate your device by moving it in a figure-eight motion for the most accurate compass reading. </li></ol></div><div class=\"col-lg-6\" data-v-6d77f7a9><h5 class=\"h4 card-title text-primary fw-bold mb-3\" data-v-6d77f7a9> The Significance of the Qibla </h5><br data-v-6d77f7a9><br data-v-6d77f7a9><p class=\"text-muted mb-3\" data-v-6d77f7a9> The Qibla is the fixed direction towards the Kaaba in the Grand Mosque in Mecca, Saudi Arabia. It is the direction that Muslims face when performing Salah (prayer). </p><p class=\"text-muted mb-0\" data-v-6d77f7a9> Facing the Qibla is a crucial condition for the validity of prayer, and it symbolizes the unity of all Muslims worldwide, as they all turn towards the same sacred point to worship Allah. </p></div></div></div>", 1)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.hasData ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Qibla & Compass "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_22, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    id: "qibla-direction-title",
    class: "h4 card-title text-primary fw-bold mb-0",
    style: {
      "padding": "10px"
    }
  }, " Qibla Direction ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "compass-dial position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-2 border-secondary bg-light",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      transform: `rotate(-${$data.compassRotation}deg)`
    })
  }, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "compass-label position-absolute top-0 start-50 translate-middle-x"
  }, " N ", -1 /* CACHED */)), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "compass-label position-absolute bottom-0 start-50 translate-middle-x"
  }, " S ", -1 /* CACHED */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "compass-label position-absolute top-50 end-0 translate-middle-y"
  }, " E ", -1 /* CACHED */)), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "compass-label position-absolute top-50 start-0 translate-middle-y"
  }, " W ", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)([45, 90, 135, 180, 225, 270, 315], degree => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: degree,
      class: "degree-marker position-absolute w-100 h-100",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        transform: `rotate(${degree}deg)`
      })
    }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "marker-line position-absolute top-0 start-50"
    }, null, -1 /* CACHED */)]))], 4 /* STYLE */);
  }), 64 /* STABLE_FRAGMENT */))], 4 /* STYLE */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", {
    class: "qibla-arrow position-absolute top-50 start-50",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      transform: `translate(-50%, -50%) rotate(${$data.qiblaDirection - $data.compassRotation}deg)`,
      'transform-origin': '25 75'
    }),
    width: "50",
    height: "150",
    viewBox: "0 0 50 150",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<defs data-v-6d77f7a9><linearGradient id=\"arrowGradient\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\" data-v-6d77f7a9><stop offset=\"0%\" style=\"stop-color:var(--primary-color);stop-opacity:1;\" data-v-6d77f7a9></stop><stop offset=\"100%\" style=\"stop-color:var(--primary-hover-color);stop-opacity:1;\" data-v-6d77f7a9></stop></linearGradient></defs><path d=\"M25 150 L40 100 L30 30 L25 0 L20 30 L10 100 Z\" fill=\"url(#arrowGradient)\" stroke=\"var(--primary-hover-color)\" stroke-width=\"3\" data-v-6d77f7a9></path><path d=\"M25 150 L40 100 L25 90 L10 100 Z\" fill=\"var(--primary-color)\" stroke=\"var(--primary-hover-color)\" stroke-width=\"2\" data-v-6d77f7a9></path>", 3)]))], 4 /* STYLE */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_27, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Direction", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['bi', $options.directionIconClass])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.computedBearing) + "° (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.qiblaCardinalDirection) + ") ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_29, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Bearing from North", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.qiblaBearing) + "° clockwise", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_31, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Relative Dir", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.relativeDirection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_33, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Distance", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.distanceKmRounded) + " km / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.distanceMiRounded) + " mi", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_35, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Your Coordinates", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.userLatFmt) + "°, " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.userLonFmt) + "°", 1 /* TEXT */)]), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "list-group-item d-flex justify-content-between align-items-center py-3 px-3",
    role: "listitem"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Kaaba Coordinates"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-bold"
  }, "21.4225°, 39.8262°")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_37, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted"
  }, "Last Updated", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lastUpdated), 1 /* TEXT */)])]), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "alert alert-info small mb-0",
    style: {
      "background": "rgba(13, 182, 145, 0.08)",
      "border-color": "rgba(13, 182, 145, 0.2)",
      "color": "rgb(13, 182, 145)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Compass uses true north, not magnetic north. For best accuracy, calibrate your device. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn w-100 btn-primary text-white d-flex align-items-center justify-content-center gap-2",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.speakQiblaDirection && $options.speakQiblaDirection(...args)),
    disabled: !$data.qiblaDirection,
    title: "Speak Qibla Direction"
  }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-volume-up-fill fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Speak", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_42)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn w-100 btn-primary text-white d-flex align-items-center justify-content-center gap-2",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.shareLocation && $options.shareLocation(...args)),
    disabled: !$options.hasData,
    title: "Share Location"
  }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-share-fill fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44)])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_46, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    id: "prayer-times-title",
    class: "h4 card-title text-primary fw-bold mb-0",
    style: {
      "padding": "10px"
    }
  }, " Prayer Times ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "text-primary fw-bold mb-2"
  }, "Hijri Date", -1 /* CACHED */)), $data.hijriDate ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.hijriDate), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "text-primary fw-bold mb-2"
  }, "Calculation Method", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.calculationMethod = $event),
    onChange: _cache[8] || (_cache[8] = (...args) => $options.getPrayerTimes && $options.getPrayerTimes(...args)),
    "aria-label": "Prayer time calculation method"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.calculationMethods, (name, id) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: id,
      value: id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name), 9 /* TEXT, PROPS */, _hoisted_51);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.calculationMethod]])]), $data.prayerTimes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_52, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.prayerTimes, (time, name) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      class: "list-group-item d-flex justify-content-between align-items-center",
      key: name,
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(time), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Prayer times will appear here.", -1 /* CACHED */)]))])), $data.timezone ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_56, " Timezone: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.timezone), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.hasData ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-header\" data-v-6d77f7a9><h5 class=\"h4 card-title text-primary fw-bold mb-0\" style=\"padding:10px;\" data-v-6d77f7a9> About Prayer Time Methods </h5></div><div class=\"card-body card-teal p-lg-4\" data-v-6d77f7a9><p class=\"text-muted mb-4\" data-v-6d77f7a9> Different organizations use various conventions for calculating prayer times. Here are the methods available in this tool. Select the one most commonly used in your region. </p><div class=\"row g-3\" data-v-6d77f7a9><div class=\"col-12 col-md-6 col-lg-4\" data-v-6d77f7a9><div class=\"method-card p-3 border rounded\" data-v-6d77f7a9><h6 class=\"text-primary fw-bold mb-2\" data-v-6d77f7a9>Muslim World League</h6><p class=\"text-muted small mb-0\" data-v-6d77f7a9> Uses Fajr angle of 18° and Isha angle of 17°. Widely used in Europe, the Far East, and parts of the US. </p></div></div><div class=\"col-12 col-md-6 col-lg-4\" data-v-6d77f7a9><div class=\"method-card p-3 border rounded\" data-v-6d77f7a9><h6 class=\"text-primary fw-bold mb-2\" data-v-6d77f7a9>ISNA (North America)</h6><p class=\"text-muted small mb-0\" data-v-6d77f7a9> Sets both Fajr and Isha angles to 15°. The standard method for North America. </p></div></div><div class=\"col-12 col-md-6 col-lg-4\" data-v-6d77f7a9><div class=\"method-card p-3 border rounded\" data-v-6d77f7a9><h6 class=\"text-primary fw-bold mb-2\" data-v-6d77f7a9> Egyptian General Authority </h6><p class=\"text-muted small mb-0\" data-v-6d77f7a9> Uses Fajr angle of 19.5° and Isha angle of 17.5°. Used in Africa, Syria, and parts of the US. </p></div></div><div class=\"col-12 col-md-6 col-lg-4\" data-v-6d77f7a9><div class=\"method-card p-3 border rounded\" data-v-6d77f7a9><h6 class=\"text-primary fw-bold mb-2\" data-v-6d77f7a9>Umm Al-Qura, Makkah</h6><p class=\"text-muted small mb-0\" data-v-6d77f7a9> Uses a Fajr angle of 18.5°. Isha is 90 minutes after Maghrib. Used in the Arabian Peninsula. </p></div></div><div class=\"col-12 col-md-6 col-lg-4\" data-v-6d77f7a9><div class=\"method-card p-3 border rounded\" data-v-6d77f7a9><h6 class=\"text-primary fw-bold mb-2\" data-v-6d77f7a9>University of Karachi</h6><p class=\"text-muted small mb-0\" data-v-6d77f7a9> Sets Fajr and Isha angles to 18°. Common in Pakistan, Bangladesh, India, and Afghanistan. </p></div></div></div></div>", 2)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.card-teal[data-v-6d77f7a9] {\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 165, 0);\n  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);\n  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card-teal[data-v-6d77f7a9]:hover { \n  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12);\n}\n[data-v-6d77f7a9]:root {\n  --primary-color: rgb(13, 182, 145);\n  --primary-hover-color: rgb(11, 158, 127);\n  --primary-focus-color: rgba(13, 182, 145, 0.25);\n  --tertiary-bg-color: rgba(13, 182, 145, 0.1);\n  --tertiary-hover-bg-color: rgba(13, 182, 145, 0.2);\n}\n.btn-primary[data-v-6d77f7a9],\n.text-primary[data-v-6d77f7a9] {\n  --bs-btn-bg: rgb(13, 182, 145);\n  --bs-btn-border-color: rgb(13, 182, 145);\n  --bs-btn-hover-bg: rgb(11, 158, 127);\n  --bs-btn-hover-border-color: rgb(11, 158, 127);\n  --bs-btn-active-bg: rgb(11, 158, 127);\n  --bs-btn-active-border-color: rgb(11, 158, 127);\n  color: rgb(13, 182, 145) !important;\n}\n.btn-primary[data-v-6d77f7a9] {\n  color: #fff !important;\n}\n.btn-tertiary[data-v-6d77f7a9] {\n  background-color: var(--tertiary-bg-color) !important;\n  color: var(--primary-color) !important;\n  border: 1px solid var(--primary-color) !important;\n}\n.btn-tertiary[data-v-6d77f7a9]:hover,\n.btn-tertiary[data-v-6d77f7a9]:focus {\n  background-color: var(--tertiary-hover-bg-color) !important;\n  color: var(--primary-hover-color) !important;\n}\n.qibla-compass-wrapper[data-v-6d77f7a9] {\n  width: 40vw;\n  max-width: 300px;\n  aspect-ratio: 1/1;\n  position: relative;\n  overflow: hidden;\n}\n.compass-dial[data-v-6d77f7a9] {\n  background: linear-gradient(145deg, #ffffff, #e6e6e6);\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);\n}\n.compass-label[data-v-6d77f7a9] {\n  font-weight: 600;\n  font-size: 1rem;\n  color: #6c757d;\n  pointer-events: none;\n}\n.degree-marker[data-v-6d77f7a9] {\n  pointer-events: none;\n}\n.marker-line[data-v-6d77f7a9] {\n  width: 2px;\n  height: 8px;\n  background: #6c757d;\n  transform: translateX(-50%);\n}\n.qibla-arrow[data-v-6d77f7a9] {\n  width: 20%;\n  max-width: 60px;\n  height: 50%;\n  max-height: 150px;\n  transform-origin: 25px 75px;\n  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) brightness(1.1);\n}\n@media (max-width: 767.98px) {\n.qibla-compass-wrapper[data-v-6d77f7a9] {\n    width: 50vw;\n    max-width: 200px;\n}\n.compass-label[data-v-6d77f7a9] {\n    font-size: 0.9rem;\n}\n.marker-line[data-v-6d77f7a9] {\n    height: 6px;\n}\n.qibla-arrow[data-v-6d77f7a9] {\n    width: 25%;\n    max-width: 50px;\n    height: 50%;\n    max-height: 100px;\n    transform-origin: 25px 50px;\n}\n}\n@media (max-width: 575.98px) {\n.qibla-compass-wrapper[data-v-6d77f7a9] {\n    width: 60vw;\n    max-width: 150px;\n}\n.compass-label[data-v-6d77f7a9] {\n    font-size: 0.8rem;\n}\n.marker-line[data-v-6d77f7a9] {\n    height: 5px;\n}\n.qibla-arrow[data-v-6d77f7a9] {\n    width: 30%;\n    max-width: 45px;\n    height: 50%;\n    max-height: 75px;\n    transform-origin: 22.5px 37.5px;\n}\n}\n.list-group-item[data-v-6d77f7a9] {\n  font-size: 0.97rem;\n  padding-left: 0.7rem !important;\n  padding-right: 0.7rem !important;\n  padding-top: 0.6rem !important;\n  padding-bottom: 0.6rem !important;\n}\n.qibla-info-modern-card[data-v-6d77f7a9] {\n  background: linear-gradient(135deg, #23405a 0%, #2b7a78 100%);\n  border-radius: 2rem;\n  color: #fff;\n  max-width: 700px;\n  box-shadow: 0 4px 32px rgba(44, 62, 80, 0.1);\n  margin-bottom: 2rem;\n}\n.qibla-info-modern-card .display-5[data-v-6d77f7a9] {\n  color: #fff;\n}\n.qibla-info-modern-card .text-muted[data-v-6d77f7a9] {\n  color: #cfd8dc !important;\n}\n.qibla-info-modern-card .border-md-start[data-v-6d77f7a9] {\n  border-left: 1px solid rgba(255, 255, 255, 0.15) !important;\n}\n/* Accessibility: ensure sufficient contrast for lead muted text */\n/* Broaden selector and darken further to guarantee >= 4.5:1 on #f5f5f5 */\nheader .lead.text-muted[data-v-6d77f7a9],\n.lead.text-muted[data-v-6d77f7a9] {\n  color: #343a40 !important;\n}\n@media (max-width: 767.98px) {\n.qibla-info-modern-card[data-v-6d77f7a9] {\n    border-radius: 1.2rem;\n    padding: 0.5rem;\n}\n.qibla-info-modern-card .border-md-start[data-v-6d77f7a9] {\n    border-left: none !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.15) !important;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_style_index_0_id_6d77f7a9_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_style_index_0_id_6d77f7a9_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_style_index_0_id_6d77f7a9_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/QiblaComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/QiblaComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QiblaComponent_vue_vue_type_template_id_6d77f7a9_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true */ "./resources/js/components/QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true");
/* harmony import */ var _QiblaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QiblaComponent.vue?vue&type=script&lang=js */ "./resources/js/components/QiblaComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _QiblaComponent_vue_vue_type_style_index_0_id_6d77f7a9_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css */ "./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_QiblaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_QiblaComponent_vue_vue_type_template_id_6d77f7a9_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-6d77f7a9"],['__file',"resources/js/components/QiblaComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/QiblaComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/QiblaComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QiblaComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_style_index_0_id_6d77f7a9_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=style&index=0&id=6d77f7a9&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_template_id_6d77f7a9_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QiblaComponent_vue_vue_type_template_id_6d77f7a9_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QiblaComponent.vue?vue&type=template&id=6d77f7a9&scoped=true");


/***/ })

}]);