"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ShopComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'HalalButcherFinder',
  data() {
    return {
      searchQuery: '',
      activeType: 'all',
      loading: false,
      shops: [],
      focusedIndex: -1,
      searchHistory: [],
      currentLocation: null,
      searchRadius: 5000,
      maxRadius: 10000,
      error: null,
      // Networking controllers for aborting in-flight requests
      geocodeController: null,
      overpassController: null,
      // Simple in-memory cache
      cache: {
        geocode: new Map(),
        shops: new Map()
      },
      // Rendering limits
      resultLimit: 60,
      loadMoreStep: 60,
      _openStatusIntervalId: null,
      filters: {
        verifiedOnly: false,
        minRating: 0,
        openNow: false,
        paymentMethods: []
      },
      foodTypes: [{
        value: 'all',
        label: 'All',
        icon: 'bi bi-shop'
      }, {
        value: 'food',
        label: 'Restaurants',
        icon: 'bi bi-egg-fried'
      }, {
        value: 'supermarket',
        label: 'Grocery',
        icon: 'bi bi-basket'
      }, {
        value: 'butcher',
        label: 'Butchers',
        icon: 'bi bi-droplet'
      }]
    };
  },
  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.searchInput;
      if (input !== null && input !== void 0 && input.focus) input.focus();
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/opening_hours@3.7.0/opening_hours.min.js';
      script.async = true;
      document.head.appendChild(script);
      // Refresh open status every minute
      this._openStatusIntervalId = setInterval(this.refreshOpenStatus, 60000);
    });
  },
  beforeUnmount() {
    if (this._openStatusIntervalId) clearInterval(this._openStatusIntervalId);
    if (this.geocodeController) this.geocodeController.abort();
    if (this.overpassController) this.overpassController.abort();
  },
  // For Vue 2 backward compatibility
  beforeDestroy() {
    if (this._openStatusIntervalId) clearInterval(this._openStatusIntervalId);
    if (this.geocodeController) this.geocodeController.abort();
    if (this.overpassController) this.overpassController.abort();
  },
  computed: {
    filteredShops() {
      let results = this.shops;
      if (this.activeType !== 'all') {
        results = results.filter(shop => shop.type === this.activeType);
      }
      return results;
    },
    displayedShops() {
      return this.filteredShops.slice(0, this.resultLimit);
    }
  },
  methods: {
    handleCardKeydown(index, event) {
      const key = event.key;
      const last = this.filteredShops.length - 1;
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        const next = Math.min(last, index + 1);
        this.focusedIndex = next;
        this.$nextTick(() => {
          var _cards$next;
          const cards = event.currentTarget.parentElement.parentElement.querySelectorAll('.card.h-100');
          (_cards$next = cards[next]) === null || _cards$next === void 0 || _cards$next.focus();
        });
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        const prev = Math.max(0, index - 1);
        this.focusedIndex = prev;
        this.$nextTick(() => {
          var _cards$prev;
          const cards = event.currentTarget.parentElement.parentElement.querySelectorAll('.card.h-100');
          (_cards$prev = cards[prev]) === null || _cards$prev === void 0 || _cards$prev.focus();
        });
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        const actionable = event.currentTarget.querySelector('button:not([disabled]), a[href]:not(.disabled)');
        actionable === null || actionable === void 0 || actionable.click();
      }
    },
    refreshOpenStatus() {
      this.shops = this.shops.map(shop => {
        if (shop.opening_hours && typeof opening_hours === 'function') {
          try {
            const oh = new opening_hours(shop.opening_hours, {
              lat: shop.lat,
              lon: shop.lon
            });
            return _objectSpread(_objectSpread({}, shop), {}, {
              isOpen: oh.getState()
            });
          } catch (e) {
            console.warn('Error refreshing open status:', e);
          }
        }
        return shop;
      });
    },
    generatePlaceholderRating() {
      const min = 3.0;
      const max = 5.0;
      const bias = 4.2;
      const variation = (Math.random() - 0.5) * 0.8;
      let rating = bias + variation;
      rating = Math.max(min, Math.min(max, rating));
      return Number(rating.toFixed(1));
    },
    getStarClass(rating, starIndex) {
      if (!rating) return 'bi-star';
      const fullStarThreshold = starIndex;
      const halfStarThreshold = starIndex - 0.5;
      if (rating >= fullStarThreshold) return 'bi-star-fill';
      if (rating >= halfStarThreshold) return 'bi-star-half';
      return 'bi-star';
    },
    validateSearchQuery() {
      if (!this.searchQuery || typeof this.searchQuery !== 'string') {
        throw new Error('Invalid search query');
      }
      return this.searchQuery.trim();
    },
    async searchLocation() {
      const query = this.validateSearchQuery();
      if (!query) {
        this.error = 'Please enter a location';
        return;
      }
      const cachedSearch = this.searchHistory.find(s => s.query.toLowerCase() === query.toLowerCase());
      if (cachedSearch) {
        this.currentLocation = cachedSearch.location;
        await this.fetchNearbyShops();
        return;
      }
      this.loading = true;
      this.error = null;
      this.shops = [];
      try {
        const headers = new Headers({
          'User-Agent': 'HalalButcherFinder/1.0',
          'Accept-Language': 'en-US,en;q=0.9'
        });

        // Abort any in-flight geocode
        if (this.geocodeController) this.geocodeController.abort();
        this.geocodeController = new AbortController();
        const signal = this.geocodeController.signal;

        // Geocode cache check
        if (this.cache.geocode.has(query.toLowerCase())) {
          const _location = this.cache.geocode.get(query.toLowerCase());
          this.currentLocation = _location;
          this.searchHistory.unshift({
            query,
            location: this.currentLocation,
            timestamp: new Date()
          });
          if (this.searchHistory.length > 5) this.searchHistory.pop();
          await this.fetchNearbyShops();
          return;
        }
        let geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`, {
          headers,
          signal
        });
        if (!geocodeRes.ok) throw new Error('Location search service unavailable');
        let data = await geocodeRes.json();
        if (!data.length) {
          // Note: Mapbox fallback is commented out as MAPBOX_TOKEN is not defined
          throw new Error('Location not found');
        }
        const location = data[0];
        this.currentLocation = {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          display_name: location.display_name,
          address: location.address
        };

        // Cache geocode result
        this.cache.geocode.set(query.toLowerCase(), this.currentLocation);
        this.searchHistory.unshift({
          query,
          location: this.currentLocation,
          timestamp: new Date()
        });
        if (this.searchHistory.length > 5) this.searchHistory.pop();
        await this.fetchNearbyShops();
      } catch (err) {
        console.error('Search error:', err);
        if (err.name === 'AbortError') return;
        this.error = err.message || 'Could not find location';
        this.shops = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchNearbyShops() {
      if (!this.currentLocation) return;
      const {
        lat,
        lon
      } = this.currentLocation;
      const radius = this.searchRadius;
      const cacheKey = `${lat.toFixed(3)},${lon.toFixed(3)}:${radius}`;
      if (this.cache.shops.has(cacheKey)) {
        this.shops = this.cache.shops.get(cacheKey);
        return;
      }
      const query = `
        [out:json][timeout:30];
        (
          node["shop"="butcher"][~"^(diet:halal|halal|certified:halal)$"~"yes"](around:${radius},${lat},${lon});
          way["shop"="butcher"][~"^(diet:halal|halal|certified:halal)$"~"yes"](around:${radius},${lat},${lon});
          relation["shop"="butcher"][~"^(diet:halal|halal|certified:halal)$"~"yes"](around:${radius},${lat},${lon});
        );
        out center;
        >;
        out skel qt;
      `;

      // List of Overpass mirrors to improve reliability
      const endpoints = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass.nchc.org.tw/api/interpreter', 'https://overpass.osm.ch/api/interpreter'];

      // Helper to try a single endpoint with timeout and abort support
      const tryEndpoint = async (baseUrl, timeoutMs = 15000) => {
        // Abort any in-flight overpass
        if (this.overpassController) this.overpassController.abort();
        this.overpassController = new AbortController();
        const ac = this.overpassController;
        const timer = setTimeout(() => {
          try {
            ac.abort();
          } catch (_) {}
        }, timeoutMs);
        try {
          const res = await fetch(`${baseUrl}?data=${encodeURIComponent(query)}`, {
            signal: ac.signal
          });
          if (!res.ok) {
            // Treat 429/504 specially to allow fallback
            const status = res.status;
            throw new Error(status === 429 ? 'Too Many Requests' : `HTTP ${status}`);
          }
          const json = await res.json();
          return json;
        } finally {
          clearTimeout(timer);
        }
      };
      try {
        let lastError = null;
        for (let i = 0; i < endpoints.length; i++) {
          try {
            const json = await tryEndpoint(endpoints[i]);
            this.processShopData(json && json.elements || [], cacheKey);
            lastError = null;
            break;
          } catch (e) {
            lastError = e;
            // If aborted manually, stop looping
            if (e && e.name === 'AbortError') throw e;
            // Otherwise, try next mirror after a short backoff
            await new Promise(r => setTimeout(r, 500));
          }
        }
        if (lastError) {
          throw lastError;
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.name === 'AbortError') return;
        const msg = typeof err.message === 'string' ? err.message : '';
        if (msg.includes('Too Many Requests')) {
          this.error = 'Rate limit hit. Please wait and try again.';
        } else if (msg.includes('HTTP 504') || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
          this.error = 'Overpass service timed out. Please try again or change the location.';
        } else {
          this.error = 'Could not load halal butchers';
        }
        this.shops = [];
      }
    },
    processShopData(elements, cacheKey = null) {
      const seen = new Set();
      const shops = [];
      elements.forEach(element => {
        try {
          if (!element.tags || seen.has(element.id)) return;
          const coords = element.lat ? element : element.center || {};
          if (!coords.lat || !coords.lon) return;
          const tags = element.tags;
          const name = tags.name || 'Halal Butcher';
          let type = 'butcher';
          if (tags.shop === 'meat') type = 'meat_shop';
          if (tags['butcher:type']) type = tags['butcher:type'];
          const addressParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:city'], tags['addr:postcode'], tags['addr:country']].filter(Boolean);
          const address = addressParts.length ? addressParts.join(', ') : tags['addr:full'] || this.currentLocation.display_name || 'Address not available';
          const distance = this.calculateDistance(this.currentLocation.lat, this.currentLocation.lon, coords.lat, coords.lon);
          let opening_hours_formatted = tags.opening_hours || 'Not specified';
          let isOpen = null;
          if (tags.opening_hours && typeof window !== 'undefined' && typeof window.opening_hours === 'function') {
            try {
              const oh = new window.opening_hours(tags.opening_hours, {
                lat: coords.lat,
                lon: coords.lon
              });
              isOpen = oh.getState();
              opening_hours_formatted = this.parseOpeningHours(tags.opening_hours);
            } catch (e) {
              // Non-fatal
            }
          }
          shops.push({
            id: element.id,
            name,
            type,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distanceKm: Number((distance / 1000).toFixed(2)),
            phone: tags.phone,
            website: tags.website,
            cuisine: tags.cuisine || null,
            opening_hours: tags.opening_hours,
            opening_hours_formatted,
            isOpen,
            rating: parseFloat(tags['review:score']) || this.generatePlaceholderRating(),
            certification: tags['certified:halal'] ? 'Certified Halal' : 'Self-reported Halal',
            payment_methods: tags.payment ? tags.payment.split(';') : [],
            features: [tags.delivery === 'yes' ? 'delivery' : null, tags.takeaway === 'yes' ? 'takeaway' : null, tags['wheelchair'] === 'yes' ? 'wheelchair_accessible' : null].filter(Boolean),
            tags
          });
          seen.add(element.id);
        } catch (e) {
          console.warn('Error processing shop:', element.id, e);
        }
      });
      let filteredShops = shops;
      if (this.filters.verifiedOnly) {
        filteredShops = filteredShops.filter(shop => shop.certification === 'Certified Halal');
      }
      if (this.filters.openNow) {
        filteredShops = filteredShops.filter(shop => shop.isOpen === true);
      }
      if (this.filters.minRating > 0) {
        filteredShops = filteredShops.filter(shop => shop.rating >= this.filters.minRating);
      }
      if (this.filters.paymentMethods.length > 0) {
        filteredShops = filteredShops.filter(shop => this.filters.paymentMethods.some(method => shop.payment_methods.includes(method)));
      }
      this.shops = filteredShops.sort((a, b) => a.distanceKm - b.distanceKm);
      if (cacheKey) this.cache.shops.set(cacheKey, this.shops);
    },
    async expandSearchRadius() {
      const increment = 2000;
      if (this.searchRadius + increment > this.maxRadius) {
        this.error = `Maximum search radius of ${this.maxRadius / 1000}km reached`;
        return;
      }
      this.searchRadius += increment;
      this.error = `Expanding search to ${this.searchRadius / 1000}km radius...`;
      await this.fetchNearbyShops();
    },
    openMaps(lat, lon, name = '') {
      if (!lat || !lon) return;
      const baseUrl = 'https://www.google.com/maps';
      const params = new URLSearchParams({
        q: name ? `${name}@${lat},${lon}` : `${lat},${lon}`,
        layer: 'c',
        cbll: `${lat},${lon}`,
        cbp: '11'
      });
      window.open(`${baseUrl}?${params.toString()}`, '_blank');
    },
    callShop(phone) {
      if (!phone) return;
      if (confirm(`Call ${phone}?`)) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        window.location.href = `tel:${cleanPhone}`;
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3;
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    parseOpeningHours(hoursString) {
      if (!hoursString) return 'Not specified';
      try {
        return hoursString.replace(/;/g, ', ').replace(/Mo/g, 'Mon').replace(/Tu/g, 'Tue').replace(/We/g, 'Wed').replace(/Th/g, 'Thu').replace(/Fr/g, 'Fri').replace(/Sa/g, 'Sat').replace(/Su/g, 'Sun');
      } catch (e) {
        console.warn('Error formatting opening hours:', e);
        return hoursString;
      }
    },
    checkIfOpen(openingHours) {
      if (!openingHours || typeof window === 'undefined' || typeof window.opening_hours !== 'function') return null;
      try {
        const oh = new window.opening_hours(openingHours);
        return oh.getState();
      } catch (e) {
        console.warn('Error checking open status:', e);
        return null;
      }
    },
    resetSearch() {
      this.searchQuery = '';
      this.searchRadius = 5000;
      this.currentLocation = null;
      this.shops = [];
      this.error = null;
      this.activeType = 'all';
      this.filters = {
        verifiedOnly: false,
        minRating: 0,
        openNow: false,
        paymentMethods: []
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid my-5",
  role: "main",
  "aria-labelledby": "shop-finder-heading"
};
const _hoisted_2 = {
  class: "row justify-content-center"
};
const _hoisted_3 = {
  class: "col-lg-10"
};
const _hoisted_4 = {
  class: "premium-panel shadow"
};
const _hoisted_5 = {
  class: "card-body container-fluid px-2 py-1"
};
const _hoisted_6 = {
  class: "row mb-4 justify-content-center"
};
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 0
};
const _hoisted_9 = {
  key: 1,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_10 = {
  key: 0,
  class: "text-center py-5",
  "aria-live": "polite",
  "aria-busy": "true"
};
const _hoisted_11 = {
  class: "mt-3"
};
const _hoisted_12 = {
  key: 1
};
const _hoisted_13 = {
  key: 0,
  class: "text-center py-5"
};
const _hoisted_14 = {
  class: "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4",
  role: "list",
  "aria-label": "Search results"
};
const _hoisted_15 = ["aria-label", "onKeydown"];
const _hoisted_16 = {
  class: "px-3 pt-3"
};
const _hoisted_17 = {
  class: "card-title fw-bold text-dark mb-3 title-lg"
};
const _hoisted_18 = {
  class: "card-body pt-0"
};
const _hoisted_19 = {
  class: "mb-2"
};
const _hoisted_20 = {
  class: "d-flex align-items-start"
};
const _hoisted_21 = {
  class: "text-truncate line-clamp-2"
};
const _hoisted_22 = {
  class: "mb-2 d-flex align-items-center"
};
const _hoisted_23 = {
  class: "text-warning me-2"
};
const _hoisted_24 = {
  class: "mb-0"
};
const _hoisted_25 = {
  key: 0,
  class: "mb-2"
};
const _hoisted_26 = {
  class: "text-muted"
};
const _hoisted_27 = {
  class: "opening-hours mb-2 mt-2"
};
const _hoisted_28 = {
  class: "text-muted"
};
const _hoisted_29 = {
  key: 0,
  class: "badge bg-success ms-2"
};
const _hoisted_30 = {
  key: 1,
  class: "badge bg-danger ms-2"
};
const _hoisted_31 = {
  class: "action-row d-flex justify-content-between align-items-center gap-2"
};
const _hoisted_32 = ["onClick", "aria-label"];
const _hoisted_33 = ["onClick", "disabled", "aria-disabled", "aria-label"];
const _hoisted_34 = {
  key: 0,
  class: "d-flex justify-content-between align-items-center flex-wrap gap-2 px-3 py-2"
};
const _hoisted_35 = {
  class: "text-muted",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    id: "shop-finder-heading",
    class: "display-5 fw-bold text-center"
  }, "Halal Butcher Finder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search form "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex align-items-center mb-3 search-row",
    role: "search",
    "aria-label": "Search for halal butchers by city",
    onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.searchLocation && $options.searchLocation(...args), ["prevent"]))
  }, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "shop-search-input",
    class: "card-title pr-2 fw-bold label-lg"
  }, "Search location:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "mosque-search-input",
    type: "search",
    class: "form-control",
    placeholder: "Enter city or country...",
    "aria-label": "Search city",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    autocomplete: "off",
    ref: "searchInput"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-action btn-primary-brand align-items-center justify-content-center",
    type: "submit",
    disabled: $data.loading
  }, [!$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, "Search")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_9))], 8 /* PROPS */, _hoisted_7)], 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary spinner-lg",
    role: "status",
    "aria-label": "Loading results"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, "Searching for halal butchers in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.searchQuery) + "...", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results "), !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No Search State "), !$data.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-shop display-4 text-muted mb-3"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "Search for halal butchers", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Enter a city or address to find nearby halal butchers", -1 /* CACHED */)]))])) : $data.searchQuery && $data.shops.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No Results State "), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "text-center py-5"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-binoculars display-4 text-muted mb-3"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "No halal butchers found")], -1 /* CACHED */))], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 2
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.displayedShops, (shop, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: shop.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "card h-100 premium-card animate-in",
      role: "article",
      "aria-label": `${shop.name}, ${shop.address || 'address not specified'}`,
      tabindex: "0",
      onKeydown: $event => $options.handleCardKeydown(index, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-geo-alt-fill me-2 flex-shrink-0"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.address || 'Address not specified'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(5, n => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        key: n,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.getStarClass(shop.rating, n), "bi"])
      }, null, 2 /* CLASS */);
    }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.rating) + "/5", 1 /* TEXT */)]), shop.cuisine ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_26, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Cuisine:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.cuisine), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_28, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Opening Times:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.opening_hours_formatted || 'Not specified') + " ", 1 /* TEXT */), shop.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_29, "Open Now")) : shop.isOpen === false ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_30, "Closed")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Get Directions Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-action btn-primary-brand d-flex align-items-center justify-content-center flex-grow-1",
      onClick: $event => $options.openMaps(shop.lat, shop.lon, shop.name),
      "aria-label": `Get directions to ${shop.name}`
    }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-geo-alt me-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Get Direction", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Call Shop Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-action btn-secondary-brand d-flex align-items-center justify-content-center flex-grow-1", ['btn-call', {
        'btn-call--disabled': !shop.phone
      }]]),
      onClick: $event => $options.callShop(shop.phone),
      disabled: !shop.phone,
      "aria-disabled": !shop.phone,
      "aria-label": shop.phone ? `Call ${shop.name}` : `Phone number not available for ${shop.name}`
    }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-telephone me-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Call Shop", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_33)])])], 40 /* PROPS, NEED_HYDRATION */, _hoisted_15)]);
  }), 128 /* KEYED_FRAGMENT */))])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), !$data.loading && $options.filteredShops.length > 0 && $data.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_35, " Showing " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displayedShops.length) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredShops.length) + " places ", 1 /* TEXT */), $options.filteredShops.length > $data.resultLimit ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn btn-sm btn-outline-secondary",
    onClick: _cache[2] || (_cache[2] = $event => $data.resultLimit += $data.loadMoreStep)
  }, " Load more ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/ShopComponent.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/ShopComponent.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ShopComponent_vue_vue_type_template_id_2cbbc6cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true */ "./resources/js/components/ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true");
/* harmony import */ var _ShopComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShopComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ShopComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ShopComponent_vue_vue_type_style_index_0_id_2cbbc6cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css */ "./resources/js/components/ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ShopComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ShopComponent_vue_vue_type_template_id_2cbbc6cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2cbbc6cc"],['__file',"resources/js/components/ShopComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ShopComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/ShopComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ShopComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ShopComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ShopComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ShopComponent_vue_vue_type_style_index_0_id_2cbbc6cc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=style&index=0&id=2cbbc6cc&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ShopComponent_vue_vue_type_template_id_2cbbc6cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ShopComponent_vue_vue_type_template_id_2cbbc6cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ShopComponent.vue?vue&type=template&id=2cbbc6cc&scoped=true");


/***/ })

}]);