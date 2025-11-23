"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_PrayerComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Debounce utility
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Static constants (non-reactive)
const COUNTRY_LIST = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
const METHOD_OPTIONS = {
  0: 'Shia Ithna-Ashari (Jafari)',
  1: 'University of Islamic Sciences, Karachi',
  2: 'Islamic Society of North America (ISNA)',
  3: 'Muslim World League (MWL)',
  4: 'Umm Al-Qura University, Makkah',
  5: 'Egyptian General Authority of Survey',
  7: 'Institute of Geophysics, University of Tehran',
  8: 'Gulf Region',
  9: 'Kuwait',
  10: 'Qatar',
  11: 'Majlis Ugama Islam Singapura, Singapore',
  12: 'Union Organization Islamic de France',
  13: 'Diyanet İşleri Başkanlığı, Turkey',
  14: 'Spiritual Administration of Muslims of Russia'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PrayerTimes',
  data() {
    return {
      city: '',
      country: '',
      countryList: COUNTRY_LIST,
      citySuggestions: [],
      showCitySuggestions: false,
      latitude: null,
      longitude: null,
      debugInfo: '',
      method: '2',
      methodOptions: METHOD_OPTIONS,
      // Raw API data (kept minimal usage)
      prayerData: [],
      // Preformatted rows for rendering
      prayerRows: [],
      loading: false,
      submitted: false,
      useCurrentLocation: true,
      monthName: '',
      year: '',
      errorMessage: '',
      nextStepMinimized: false,
      // Asr juristic method (0: Shafi et al., 1: Hanafi)
      school: 0,
      // High latitude adjustment method (0 none, 1 middle, 2 one-seventh, 3 angle-based)
      latitudeAdjustmentMethod: 3,
      // Timezone reported by API for accurate display
      apiTimezone: '',
      // Internal caches/non-reactive helpers
      _geoCache: new Map(),
      _abortCity: null
    };
  },
  mounted() {
    // Load user preferences from localStorage if available
    const savedCity = localStorage.getItem('prayer_city');
    const savedCountry = localStorage.getItem('prayer_country');
    const savedMethod = localStorage.getItem('prayer_method');
    const savedSchool = localStorage.getItem('prayer_school');
    const savedLatAdj = localStorage.getItem('prayer_latAdj');
    const savedLat = localStorage.getItem('prayer_lat');
    const savedLon = localStorage.getItem('prayer_lon');
    const savedTZ = localStorage.getItem('prayer_tz');
    if (savedCity && savedCountry && savedMethod) {
      this.city = savedCity;
      this.country = savedCountry;
      this.method = savedMethod;
      if (savedSchool !== null) this.school = Number(savedSchool);
      if (savedLatAdj !== null) this.latitudeAdjustmentMethod = Number(savedLatAdj);
      this.useCurrentLocation = false;
      // Reuse saved coordinates if present to skip geocoding
      if (savedLat && savedLon) {
        this.latitude = Number(savedLat);
        this.longitude = Number(savedLon);
        if (savedTZ) this.apiTimezone = savedTZ;
        this.fetchPrayerTimes();
      } else {
        // Try to geocode and fetch prayer times for saved location
        this.submitSearch();
      }
    } else {
      this.getCurrentLocation();
    }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    formatTime(time) {
      if (!time) return '--:--';
      // If API returns ISO8601, format reliably using locale
      if (typeof time === 'string' && time.includes('T')) {
        const d = new Date(time);
        if (isNaN(d)) return '--:--';
        const opts = {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        };
        try {
          // Format using the target city's timezone from API
          return new Intl.DateTimeFormat([], _objectSpread(_objectSpread({}, opts), {}, {
            timeZone: this.apiTimezone || undefined
          })).format(d);
        } catch (_) {
          return d.toLocaleTimeString([], opts);
        }
      }
      // Fallback for older string format like "05:30 (+01)"
      const clean = String(time).split(' ')[0];
      const [hourStr, minuteStr] = clean.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      if (Number.isNaN(hour) || Number.isNaN(minute)) return '--:--';
      const period = hour >= 12 ? 'PM' : 'AM';
      if (hour === 0) hour = 12;else if (hour > 12) hour -= 12;
      return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    },
    async getCurrentLocation() {
      if (!navigator.geolocation) {
        this.setDefaultLocation();
        return;
      }
      this.loading = true;
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const {
          latitude,
          longitude
        } = position.coords;
        const location = await this.reverseGeocode(latitude, longitude);
        this.city = location.city;
        this.country = location.country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.useCurrentLocation = true;
        // persist coordinates and timezone when available
        localStorage.setItem('prayer_lat', String(latitude));
        localStorage.setItem('prayer_lon', String(longitude));
        await this.fetchPrayerTimes();
      } catch (err) {
        console.error('Geolocation failed:', err);
        this.setDefaultLocation();
      }
    },
    async reverseGeocode(lat, lon) {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      return {
        city: data.address.city || data.address.town || data.address.village || 'Unknown',
        country: data.address.country || 'United Kingdom'
      };
    },
    async fetchPrayerTimes() {
      this.loading = true;
      this.errorMessage = '';
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // Let Aladhan detect timezone from coordinates to avoid forcing browser TZ
      const url = `https://api.aladhan.com/v1/calendar?latitude=${this.latitude}&longitude=${this.longitude}&method=${Number(this.method)}&month=${month}&year=${year}&school=${this.school}&latitudeAdjustmentMethod=${this.latitudeAdjustmentMethod}&iso8601=true`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 200 && data.data) {
          this.prayerData = data.data;
          if (data.data.length > 0) {
            const gregorian = data.data[0].date.gregorian;
            this.monthName = gregorian.month.en;
            this.year = gregorian.year;
            // Capture API timezone for proper display formatting
            if (data.data[0].meta && data.data[0].meta.timezone) {
              this.apiTimezone = data.data[0].meta.timezone;
            } else if (data.meta && data.meta.timezone) {
              this.apiTimezone = data.meta.timezone;
            }
            // Persist timezone for reuse
            if (this.apiTimezone) localStorage.setItem('prayer_tz', this.apiTimezone);
            // Preformat rows for faster rendering
            const fmt = t => this.formatTime(t);
            this.prayerRows = data.data.map(d => ({
              date: d.date.gregorian.date,
              fajr: fmt(d.timings.Fajr),
              sunrise: fmt(d.timings.Sunrise),
              dhuhr: fmt(d.timings.Dhuhr),
              asr: fmt(d.timings.Asr),
              maghrib: fmt(d.timings.Maghrib),
              isha: fmt(d.timings.Isha)
            }));
          }
        } else {
          this.prayerData = [];
          this.prayerRows = [];
        }
      } catch (err) {
        this.errorMessage = 'Failed to fetch prayer times. Please try again.';
        this.prayerData = [];
        this.prayerRows = [];
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },
    async submitSearch() {
      this.errorMessage = '';
      if (!this.city || !this.country) {
        this.errorMessage = 'Please enter both city and country.';
        return;
      }
      // Save user preferences to localStorage
      localStorage.setItem('prayer_city', this.city);
      localStorage.setItem('prayer_country', this.country);
      localStorage.setItem('prayer_method', String(this.method));
      localStorage.setItem('prayer_school', String(this.school));
      localStorage.setItem('prayer_latAdj', String(this.latitudeAdjustmentMethod));
      try {
        this.useCurrentLocation = false;
        const geo = await this.geocodeCity(this.city, this.country);
        this.latitude = geo.lat;
        this.longitude = geo.lon;
        if (geo.country) {
          this.country = geo.country;
        }
        // persist coordinates for future sessions
        localStorage.setItem('prayer_lat', String(this.latitude));
        localStorage.setItem('prayer_lon', String(this.longitude));
        await this.fetchPrayerTimes();
      } catch (err) {
        this.errorMessage = 'Could not find the specified city/country. Please try again.';
        this.prayerData = [];
        this.prayerRows = [];
        this.submitted = true;
      }
    },
    async geocodeCity(city, country = '') {
      let query = city;
      if (country) query += ', ' + country;
      const cacheKey = `${city}|${country}`.toLowerCase();
      if (this._geoCache.has(cacheKey)) return this._geoCache.get(cacheKey);
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.length) throw new Error('Invalid location');
      // Auto-fill country if available
      let detectedCountry = '';
      if (data[0].address && data[0].address.country) {
        detectedCountry = data[0].address.country;
      }
      const result = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        country: detectedCountry
      };
      this._geoCache.set(cacheKey, result);
      return result;
    },
    resetFields() {
      this.useCurrentLocation = true;
      // Remove saved preferences if user chooses current location
      localStorage.removeItem('prayer_city');
      localStorage.removeItem('prayer_country');
      localStorage.removeItem('prayer_method');
      localStorage.removeItem('prayer_lat');
      localStorage.removeItem('prayer_lon');
      localStorage.removeItem('prayer_tz');
      this.getCurrentLocation();
    },
    setDefaultLocation() {
      this.city = 'Nottingham';
      this.country = 'United Kingdom';
      this.latitude = 52.9548;
      this.longitude = -1.1581;
      this.useCurrentLocation = false;
      this.fetchPrayerTimes();
    },
    // --- City autocomplete logic ---
    onCityInput: debounce(async function () {
      this.showCitySuggestions = true;
      if (!this.city) {
        this.citySuggestions = [];
        return;
      }
      const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(this.city)}&country=${encodeURIComponent(this.country)}&format=json&addressdetails=1&limit=5`;
      try {
        // Abort previous request if any
        if (this._abortCity) this._abortCity.abort();
        this._abortCity = new AbortController();
        const res = await fetch(url, {
          signal: this._abortCity.signal
        });
        const data = await res.json();
        this.citySuggestions = data;
      } catch (e) {
        this.citySuggestions = [];
      }
    }, 400),
    selectCitySuggestion(suggestion) {
      this.city = suggestion.address.city || suggestion.address.town || suggestion.address.village || suggestion.display_name.split(',')[0];
      if (suggestion.address && suggestion.address.country) {
        this.country = suggestion.address.country;
      }
      // Save user preferences to localStorage
      localStorage.setItem('prayer_city', this.city);
      localStorage.setItem('prayer_country', this.country);
      this.citySuggestions = [];
      this.showCitySuggestions = false;
    },
    hideCitySuggestions() {
      setTimeout(() => {
        this.showCitySuggestions = false;
      }, 200);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container",
  style: {
    "padding": "10px"
  }
};
const _hoisted_2 = {
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
const _hoisted_3 = ["title", "aria-label"];
const _hoisted_4 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_5 = {
  style: {
    "flex": "1"
  }
};
const _hoisted_6 = {
  class: "mb-2 d-inline-flex align-items-center gap-1",
  style: {
    "color": "#1f2933"
  }
};
const _hoisted_7 = {
  class: "mb-3",
  style: {
    "color": "#1f2933",
    "line-height": "1.7",
    "font-size": "1.02rem"
  }
};
const _hoisted_8 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_9 = {
  class: "container d-flex justify-content-center"
};
const _hoisted_10 = {
  class: "card shadow p-4 w-100"
};
const _hoisted_11 = {
  class: "flex-grow-1 position-relative"
};
const _hoisted_12 = {
  key: 0,
  class: "list-group position-absolute w-100 z-3 suggestions-dropdown"
};
const _hoisted_13 = ["onMousedown"];
const _hoisted_14 = {
  class: "flex-grow-1"
};
const _hoisted_15 = ["value"];
const _hoisted_16 = {
  class: "flex-grow-1"
};
const _hoisted_17 = ["value"];
const _hoisted_18 = {
  class: "flex-grow-1"
};
const _hoisted_19 = {
  class: "flex-grow-1"
};
const _hoisted_20 = {
  class: "action-row mt-3 w-100 flex-wrap"
};
const _hoisted_21 = {
  key: 0,
  class: "alert alert-danger text-center my-2"
};
const _hoisted_22 = {
  key: 1,
  class: "text-center my-5"
};
const _hoisted_23 = {
  key: 2,
  class: "alert alert-light text-center py-2 shadow-sm border-lg"
};
const _hoisted_24 = {
  class: "table-responsive table-scroll mt-3"
};
const _hoisted_25 = {
  class: "table table-hover table-bordered text-center align-middle prayer-times-table"
};
const _hoisted_26 = {
  class: "fw-semibold"
};
const _hoisted_27 = {
  key: 3,
  class: "alert alert-warning text-center mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: "text-center py-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold display-5 display-md-4 mb-2"
  }, "Prayer Times Calendar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-subtitle mx-auto mb-4 px-3 px-md-0"
  }, " Never miss a prayer. Get accurate Salah times for your city, wherever you are. Our system auto-detects your location or lets you manually choose. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
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
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_3), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase",
    style: {
      "letter-spacing": "0.1em",
      "color": "#1a5f7a",
      "font-size": "0.78rem"
    }
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/qibla",
    class: "fw-semibold text-decoration-none d-inline-flex align-items-center gap-1",
    style: {
      "color": "rgb(0, 121, 107)"
    },
    "aria-label": "Open the Prayer Times companion"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Search for Qibla "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square",
    "aria-hidden": "true",
    style: {
      "color": "rgb(0, 121, 107)",
      "font-size": "0.82rem",
      "opacity": "0.85"
    }
  })], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New to Islam and relying on these Salah schedules? Take the next gentle step by visiting our Qibla finder. Visit Qibla Finder whenever you’re ready to align your heart and compass. ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/qibla",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "rgb(0, 121, 107)"
    }
  }, " Compass Guidance ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" whenever you’re ready to plan the day. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/qibla",
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
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Compass Guidance"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-globe ms-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Open the accessible Prayer Times experience")], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Input Form "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.submitSearch && $options.submitSearch(...args), ["prevent"])),
    class: "container d-flex flex-wrap gap-3 align-items-end justify-content-center mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "city",
    class: "form-label fw-bold"
  }, "City", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "city",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.city = $event),
    class: "form-control",
    required: "",
    autocomplete: "off",
    onInput: _cache[2] || (_cache[2] = (...args) => $options.onCityInput && $options.onCityInput(...args)),
    onFocus: _cache[3] || (_cache[3] = $event => $data.showCitySuggestions = true),
    onBlur: _cache[4] || (_cache[4] = (...args) => $options.hideCitySuggestions && $options.hideCitySuggestions(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.city]]), $data.showCitySuggestions && $data.citySuggestions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.citySuggestions, suggestion => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: suggestion.display_name,
      class: "list-group-item list-group-item-action",
      onMousedown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.selectCitySuggestion(suggestion), ["prevent"])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.display_name), 41 /* TEXT, PROPS, NEED_HYDRATION */, _hoisted_13);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "country",
    class: "form-label fw-bold"
  }, "Country", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "country",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.country = $event),
    class: "form-select",
    required: ""
  }, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Country", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.countryList, c => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: c,
      value: c
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(c), 9 /* TEXT, PROPS */, _hoisted_15);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.country]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "methodSelect"
  }, "Select Calculation Method:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "methodSelect",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.method = $event),
    class: "form-select"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.methodOptions, (name, id) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: id,
      value: id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name), 9 /* TEXT, PROPS */, _hoisted_17);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.method]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "schoolSelect"
  }, "Asr Juristic Method:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "schoolSelect",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.school = $event),
    class: "form-select"
  }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 0
  }, "Shafi, Maliki, Hanbali (Standard)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 1
  }, "Hanafi (Later Asr)", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.school, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "latAdjSelect"
  }, "High Latitude Adjustment:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "latAdjSelect",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $data.latitudeAdjustmentMethod = $event),
    class: "form-select"
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 0
  }, "None", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 1
  }, "Middle of the Night", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 2
  }, "One Seventh of the Night", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 3
  }, "Angle Based", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.latitudeAdjustmentMethod, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "premium-action-button premium-action-button--primary",
    "aria-label": "Search for prayer times"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search text-white",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__label"
  }, "Search")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "premium-action-button premium-action-button--outline",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.resetFields && $options.resetFields(...args)),
    "aria-label": "Use my current location"
  }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-geo-alt",
    "aria-hidden": "true"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__label"
  }, "My Location", -1 /* CACHED */)]))])])], 32 /* NEED_HYDRATION */), $data.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [...(_cache[27] || (_cache[27] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mt-2"
  }, "Fetching prayer times for your location...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.prayerData.length && !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 📅 Timings for " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.monthName) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.year) + " – " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.city) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.useCurrentLocation ? ' (Current Location)' : ' (Search Results)') + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_25, [_cache[11] || ((0,vue__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking)(-1, true), (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", {
    class: "table-secondary sticky-top"
  }, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Date"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Fajr"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Sunrise"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Dhuhr"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Asr"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Maghrib"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Isha")], -1 /* CACHED */))])).cacheIndex = 11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking)(1), _cache[11]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.prayerRows, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: day.date
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.fajr), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.sunrise), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dhuhr), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.asr), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.maghrib), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.isha), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.prayerRows.length === 0 && $data.submitted && !$data.loading && !$data.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-exclamation-triangle-fill me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" No prayer times found. Please check your city/country or try another method. ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card[data-v-02228b8a] {\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.96);\n  border: none;\n  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.12);\n}\n.next-step-card[data-v-02228b8a] {\n  position: relative;\n}\n.next-step-card__toggle[data-v-02228b8a] {\n  position: absolute;\n  top: 1.1rem;\n  right: 1.1rem;\n  background: transparent;\n  border: none;\n  color: rgba(59, 76, 97, 0.9);\n  font-size: 1rem;\n  padding: 0.3rem 0.5rem;\n  border-radius: 999px;\n  transition: color 0.2s ease, transform 0.2s ease;\n}\n.next-step-card__toggle[data-v-02228b8a]:hover,\n.next-step-card__toggle[data-v-02228b8a]:focus-visible {\n  color: #0d8271;\n  transform: translateY(-1px);\n}\n.table-scroll[data-v-02228b8a] {\n  max-height: 500px;\n  overflow-y: auto;\n}\n.table-scroll[data-v-02228b8a]::-webkit-scrollbar {\n  width: 6px;\n}\n.table-scroll[data-v-02228b8a]::-webkit-scrollbar-thumb {\n  background-color: rgba(59, 76, 97, 0.4);\n  border-radius: 10px;\n}\nthead.sticky-top[data-v-02228b8a] {\n  top: 0;\n  z-index: 10;\n}\ntbody tr[data-v-02228b8a]:hover {\n  background-color: #f1fbff;\n}\n.position-relative[data-v-02228b8a] {\n  position: relative;\n}\n.z-3[data-v-02228b8a] {\n  z-index: 3;\n}\n@media (max-width: 576px) {\ntable thead th[data-v-02228b8a],\n  table tbody td[data-v-02228b8a] {\n    font-size: 0.85rem;\n    padding: 0.4rem;\n}\n.premium-action-button[data-v-02228b8a] {\n    flex: 1 1 100%;\n    justify-content: center;\n}\n}\n@media (max-width: 992px) {\n.prayer-times-table th[data-v-02228b8a],\n  .prayer-times-table td[data-v-02228b8a] {\n    white-space: nowrap;\n    padding-left: 0.45rem;\n    padding-right: 0.45rem;\n}\n.prayer-times-table td[data-v-02228b8a]:first-of-type,\n  .prayer-times-table th[data-v-02228b8a]:first-of-type {\n    padding-left: 0;\n    padding-right: 0.15rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_style_index_0_id_02228b8a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_style_index_0_id_02228b8a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_style_index_0_id_02228b8a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/PrayerComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/PrayerComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrayerComponent_vue_vue_type_template_id_02228b8a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true */ "./resources/js/components/PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true");
/* harmony import */ var _PrayerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrayerComponent.vue?vue&type=script&lang=js */ "./resources/js/components/PrayerComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PrayerComponent_vue_vue_type_style_index_0_id_02228b8a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css */ "./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PrayerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PrayerComponent_vue_vue_type_template_id_02228b8a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-02228b8a"],['__file',"resources/js/components/PrayerComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/PrayerComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/PrayerComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_style_index_0_id_02228b8a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=style&index=0&id=02228b8a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_template_id_02228b8a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerComponent_vue_vue_type_template_id_02228b8a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PrayerComponent.vue?vue&type=template&id=02228b8a&scoped=true");


/***/ })

}]);