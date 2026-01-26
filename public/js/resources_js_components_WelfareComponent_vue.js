"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_WelfareComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'IslamicCharitiesLocator',
  data() {
    return {
      searchQuery: '',
      loading: false,
      charities: [],
      currentLocation: null,
      searchRadius: 5000,
      // 5km
      maxRadius: 10000,
      // 10km
      error: null,
      retryAttempts: 0,
      maxRetries: 2
    };
  },
  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.searchInput;
      if (input !== null && input !== void 0 && input.focus) input.focus();
    });
  },
  methods: {
    async searchLocation() {
      const query = this.searchQuery.trim();
      if (!query) {
        this.error = 'Please enter a city';
        return;
      }
      this.loading = true;
      this.error = null;
      this.charities = [];
      try {
        // Try Nominatim first
        let response = await this.fetchNominatim(query);
        if (!response.ok && this.retryAttempts < this.maxRetries) {
          console.warn(`Nominatim failed (HTTP ${response.status}), retrying (${this.retryAttempts + 1}/${this.maxRetries})...`);
          this.retryAttempts++;
          await new Promise(resolve => setTimeout(resolve, 2000 * this.retryAttempts));
          response = await this.fetchNominatim(query);
        }
        if (!response.ok) {
          if (response.status === 403) {
            this.error = 'Nominatim denied access. Use a valid User-Agent email (e.g., yourname@gmail.com) or try later.';
            console.error('403 Forbidden:', await response.text());
          } else if (response.status === 429) {
            this.error = 'Too many requests to Nominatim. Wait a few seconds and try again.';
            console.error('429 Too Many Requests');
          } else {
            this.error = `Nominatim error (HTTP ${response.status}). Try again later.`;
            console.error(`HTTP ${response.status}:`, await response.text());
          }
          return;
        }
        if (!response.headers.get('Access-Control-Allow-Origin')) {
          this.error = 'CORS error: Nominatim blocked the request. Try again or use a different network.';
          console.error('Missing Access-Control-Allow-Origin header');
          return;
        }
        const data = await response.json();
        console.debug('Nominatim response:', data);
        if (!data.length) {
          this.error = `No location found for "${query}". Try another city.`;
          return;
        }
        this.currentLocation = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          display_name: data[0].display_name
        };
        this.retryAttempts = 0;
        await this.fetchNearbyCharities();
      } catch (err) {
        console.error('Search error:', err);
        if (err.message.includes('CORS') || err.message.includes('Access-Control-Allow-Origin')) {
          this.error = 'CORS error: Unable to access Nominatim. Ensure a valid User-Agent or try a different network.';
        } else {
          this.error = 'Failed to geocode city. Try again or use another city.';
        }
        if (this.retryAttempts < this.maxRetries) {
          this.retryAttempts++;
          console.warn(`Retrying search (${this.retryAttempts}/${this.maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 2000 * this.retryAttempts));
          await this.searchLocation();
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchNominatim(query) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=0`;
      console.debug('Nominatim request:', url);
      return await fetch(url, {
        headers: {
          'User-Agent': 'IslamicConnect/1.0 (your.email@example.com)',
          // REPLACE WITH YOUR EMAIL
          'Accept-Language': 'en'
        }
      });
    },
    async fetchNearbyCharities() {
      if (!this.currentLocation) return;
      const {
        lat,
        lon
      } = this.currentLocation;
      const radius = this.searchRadius;
      const query = `
        [out:json][timeout:30];
        (
          node["amenity"="social_facility"]["destination"="islamic"](around:${radius},${lat},${lon});
          way["amenity"="social_facility"]["destination"="islamic"](around:${radius},${lat},${lon});
          relation["amenity"="social_facility"]["destination"="islamic"](around:${radius},${lat},${lon});
          node["office"="ngo"]["name"~"[Ii]slamic|[Mm]uslim"](around:${radius},${lat},${lon});
          way["office"="ngo"]["name"~"[Ii]slamic|[Mm]uslim"](around:${radius},${lat},${lon});
          relation["office"="ngo"]["name"~"[Ii]slamic|[Mm]uslim"](around:${radius},${lat},${lon});
        );
        out center;
        >;
        out skel qt;
      `;
      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        console.debug('Overpass request:', query);
        if (!response.ok) {
          this.error = `Overpass error (HTTP ${response.status}). Try again later.`;
          console.error(`Overpass HTTP ${response.status}:`, await response.text());
          return;
        }
        const json = await response.json();
        console.debug('Overpass response:', json.elements);
        this.processCharityData(json.elements || []);
      } catch (err) {
        console.error('Overpass error:', err);
        this.error = err.message.includes('Too Many Requests') ? 'Overpass rate limit hit. Please try again.' : 'Could not load charities';
        this.charities = [];
      }
    },
    processCharityData(elements) {
      const charities = [];
      const seen = new Set();
      elements.forEach(element => {
        try {
          var _this$currentLocation;
          if (!element.tags || seen.has(element.id)) return;
          const coords = element.lat ? element : element.center || {};
          if (!coords.lat || !coords.lon) return;
          const tags = element.tags;
          const name = tags.name || 'Islamic Charity';
          const addressParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:city'], tags['addr:postcode'], tags['addr:country']].filter(Boolean);
          const address = addressParts.length ? addressParts.join(', ') : tags['addr:full'] || ((_this$currentLocation = this.currentLocation) === null || _this$currentLocation === void 0 ? void 0 : _this$currentLocation.display_name) || 'Address not available';
          const distance = this.calculateDistance(this.currentLocation.lat, this.currentLocation.lon, coords.lat, coords.lon);
          charities.push({
            id: element.id,
            name,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distance,
            phone: tags.phone,
            description: tags.description || (tags.amenity === 'social_facility' ? 'Islamic social facility' : 'Islamic NGO'),
            tags
          });
          seen.add(element.id);
        } catch (e) {
          console.warn('Error processing charity:', element.id, e);
        }
      });
      this.charities = charities.sort((a, b) => a.distance - b.distance);
      console.debug('Processed charities:', this.charities);
    },
    async expandSearchRadius() {
      const increment = 2000;
      if (this.searchRadius + increment > this.maxRadius) {
        this.error = `Maximum search radius of ${this.maxRadius / 1000}km reached`;
        return;
      }
      this.searchRadius += increment;
      await this.fetchNearbyCharities();
    },
    openGoogleMaps(lat, lon, name = '') {
      if (!lat || !lon) return;
      const baseUrl = 'https://www.google.com/maps';
      const params = new URLSearchParams({
        q: name ? `${encodeURIComponent(name)}@${lat},${lon}` : `${lat},${lon}`,
        layer: 'c',
        cbll: `${lat},${lon}`,
        cbp: '11'
      });
      window.open(`${baseUrl}?${params.toString()}`, '_blank');
    },
    callCharity(phone) {
      if (!phone) return;
      if (confirm(`Call ${phone}?`)) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        window.location.href = `tel:${cleanPhone}`;
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Earth radius in meters
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    resetSearch() {
      this.searchQuery = '';
      this.searchRadius = 5000;
      this.currentLocation = null;
      this.charities = [];
      this.error = null;
      this.retryAttempts = 0;
      this.$nextTick(() => {
        const input = this.$refs.searchInput;
        if (input !== null && input !== void 0 && input.focus) input.focus();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WelfareComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WelfareComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_WelfareComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_WelfareComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/WelfareComponent.vue */ "./resources/components/vue/WelfareComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid my-5"
};
const _hoisted_2 = {
  class: "row justify-content-center"
};
const _hoisted_3 = {
  class: "col-lg-10"
};
const _hoisted_4 = {
  key: 0,
  class: "alert alert-danger text-center",
  role: "alert"
};
const _hoisted_5 = {
  class: "shadow",
  style: {
    "border-radius": "20px",
    "padding": "10px",
    "border": "1px solid grey"
  }
};
const _hoisted_6 = {
  class: "card-body",
  style: {
    "padding": "5px"
  }
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
  class: "text-center py-5"
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
  key: 1,
  class: "text-center py-5"
};
const _hoisted_15 = {
  class: "text-muted"
};
const _hoisted_16 = {
  key: 2,
  class: "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
};
const _hoisted_17 = {
  class: "card h-100"
};
const _hoisted_18 = {
  style: {
    "padding": "15px 15px 0 15px"
  }
};
const _hoisted_19 = {
  class: "card-title fw-bold text-dark mb-3",
  style: {
    "font-size": "25px"
  }
};
const _hoisted_20 = {
  class: "card-body pt-0"
};
const _hoisted_21 = {
  class: "mb-2 d-flex align-items-start"
};
const _hoisted_22 = {
  style: {
    "display": "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical"
  }
};
const _hoisted_23 = {
  class: "mb-2 d-flex align-items-center"
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
  key: 1,
  class: "mb-2"
};
const _hoisted_28 = {
  class: "text-muted"
};
const _hoisted_29 = {
  class: "d-flex justify-content-between gap-2"
};
const _hoisted_30 = ["onClick"];
const _hoisted_31 = ["onClick", "disabled"];
const _hoisted_32 = {
  key: 0,
  class: "d-flex justify-content-between align-items-center",
  style: {
    "padding": "10px"
  }
};
const _hoisted_33 = {
  class: "text-muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold text-center"
  }, "Islamic Charities Finder", -1 /* CACHED */)), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center container mb-4 lead"
  }, " Discover trusted Islamic charities and welfare organizations near you! ", -1 /* CACHED */)), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-link p-0",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.resetSearch && $options.resetSearch(...args))
  }, "Try again")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex align-items-center mb-3",
    role: "search",
    onSubmit: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.searchLocation && $options.searchLocation(...args), ["prevent"])),
    style: {
      "gap": "0.5rem"
    }
  }, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "card-title pr-2 fw-bold",
    style: {
      "font-size": "25px"
    }
  }, "Search location:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "searchInput",
    type: "search",
    class: "form-control",
    placeholder: "Enter city...",
    "aria-label": "Search",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.searchQuery = $event),
    autocomplete: "off",
    style: {
      "max-width": "300px"
    },
    ref: "searchInput"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    style: {
      "background": "#0b5d4b",
      "color": "white",
      "height": "38px"
    },
    type: "submit",
    disabled: $data.loading
  }, [!$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, "Search")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_9))], 8 /* PROPS */, _hoisted_7)], 32 /* NEED_HYDRATION */), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    style: {
      "width": "3rem",
      "height": "3rem"
    },
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, "Searching for Islamic charities in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.searchQuery) + "...", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [!$data.searchQuery || $data.charities.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-heart-fill display-4 text-muted mb-3"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "Search for Islamic Charities", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Enter a city to find nearby Islamic charities", -1 /* CACHED */)]))])) : $data.searchQuery && $data.charities.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-binoculars display-4 text-muted mb-3"
  }, null, -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "No Islamic charities found", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" No charities found in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.searchQuery) + ". Try another city or expand the search radius.", 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-link",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.expandSearchRadius && $options.expandSearchRadius(...args))
  }, "Expand to " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(($data.searchRadius + 2000) / 1000) + "km", 1 /* TEXT */), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "For live Islamic events, use a proxy with the Eventbrite API (CORS blocked).", -1 /* CACHED */))])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.charities, charity => {
    var _charity$tags;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: charity.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(charity.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-geo-alt-fill me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(charity.address || 'Address not specified'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<span class=\"text-warning me-2\" data-v-bb9f82aa><i class=\"bi bi-star-fill\" data-v-bb9f82aa></i><i class=\"bi bi-star-fill\" data-v-bb9f82aa></i><i class=\"bi bi-star-fill\" data-v-bb9f82aa></i><i class=\"bi bi-star\" data-v-bb9f82aa></i><i class=\"bi bi-star\" data-v-bb9f82aa></i></span>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((charity.distance / 1000).toFixed(1)) + " km away", 1 /* TEXT */)]), charity.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_26, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Description:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(charity.description), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (_charity$tags = charity.tags) !== null && _charity$tags !== void 0 && _charity$tags.opening_hours ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_28, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Opening Times:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(charity.tags.opening_hours), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn flex-grow-1",
      style: {
        "background": "#0b5d4b",
        "color": "white",
        "height": "38px"
      },
      onClick: $event => $options.openGoogleMaps(charity.lat, charity.lon, charity.name)
    }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Get Direction", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_30), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn flex-grow-1",
      style: {
        "background": "#0e6aa3",
        "color": "white",
        "height": "38px"
      },
      onClick: $event => $options.callCharity(charity.phone),
      disabled: !charity.phone
    }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Call Charity", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_31)])])])]);
  }), 128 /* KEYED_FRAGMENT */))]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), !$data.loading && $data.charities.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_33, "Showing " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.charities.length) + " charities", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/WelfareComponent.vue":
/*!*******************************************************!*\
  !*** ./resources/components/vue/WelfareComponent.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WelfareComponent_vue_vue_type_template_id_bb9f82aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true */ "./resources/components/vue/WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true");
/* harmony import */ var _WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WelfareComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/WelfareComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _WelfareComponent_vue_vue_type_style_index_0_id_bb9f82aa_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css */ "./resources/components/vue/WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_WelfareComponent_vue_vue_type_template_id_bb9f82aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-bb9f82aa"],['__file',"resources/components/vue/WelfareComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/WelfareComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/components/vue/WelfareComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WelfareComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/components/vue/WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_style_index_0_id_bb9f82aa_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=style&index=0&id=bb9f82aa&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/components/vue/WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_template_id_bb9f82aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_template_id_bb9f82aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/WelfareComponent.vue?vue&type=template&id=bb9f82aa&scoped=true");


/***/ }),

/***/ "./resources/js/components/WelfareComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/WelfareComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WelfareComponent.vue?vue&type=script&lang=js */ "./resources/js/components/WelfareComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/WelfareComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/WelfareComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/WelfareComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WelfareComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WelfareComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WelfareComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);