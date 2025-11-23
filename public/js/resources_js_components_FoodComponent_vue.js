"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_FoodComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'HalalFoodLocator',
  data() {
    return {
      searchQuery: '',
      loading: false,
      error: '',
      shops: [],
      searchHistory: [],
      currentLocation: null,
      searchRadius: 5000,
      maxRadius: 10000
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.safeFocusInput();
    });
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/opening_hours@3.7.0/opening_hours.min.js';
    script.async = true;
    document.head.appendChild(script);
  },
  computed: {
    filteredShops() {
      return this.shops;
    }
  },
  methods: {
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
    safeFocusInput() {
      this.$nextTick(() => {
        const input = this.$refs.searchInput;
        if (input !== null && input !== void 0 && input.focus) input.focus();
      });
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
      this.error = '';
      this.shops = [];
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`, {
          headers: {
            'User-Agent': 'IslamicConnect/1.0 (your.email@example.com)',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        });
        if (!response.ok) throw new Error('Location search service unavailable');
        const data = await response.json();
        if (!data.length) throw new Error('Location not found');
        const location = data[0];
        this.currentLocation = {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          display_name: location.display_name,
          address: location.address
        };
        this.searchHistory.unshift({
          query,
          location: this.currentLocation,
          timestamp: new Date()
        });
        if (this.searchHistory.length > 5) this.searchHistory.pop();
        await this.fetchNearbyShops();
      } catch (err) {
        this.error = err.message || 'Could not find location';
        console.error('Search error:', err);
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
      const query = `
        [out:json][timeout:30];
        (
          node["amenity"~"restaurant|fast_food"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["amenity"~"restaurant|fast_food"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          node["shop"="supermarket"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["shop"="supermarket"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          node["shop"="supermarket"]["name"~"[Hh]alal"](around:${radius},${lat},${lon});
          way["shop"="supermarket"]["name"~"[Hh]alal"](around:${radius},${lat},${lon});
        );
        out center;
        >;
        out skel qt;
      `;
      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch halal places');
        const json = await response.json();
        this.processShopData(json.elements || []);
      } catch (err) {
        this.error = err.message.includes('Too Many Requests') ? 'Rate limit hit. Please wait and try again.' : 'Could not load halal places';
        console.error('Fetch error:', err);
        this.shops = [];
      }
    },
    processShopData(elements) {
      const seen = new Set();
      const shops = [];
      elements.forEach(element => {
        try {
          if (!element.tags || seen.has(element.id)) return;
          const coords = element.lat ? element : element.center || {};
          if (!coords.lat || !coords.lon) return;
          const tags = element.tags;
          const name = tags.name || (tags.amenity ? 'Halal Restaurant' : 'Halal Supermarket');
          const type = tags.amenity ? 'restaurant' : 'supermarket';
          const addressParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:city'], tags['addr:postcode'], tags['addr:country']].filter(Boolean);
          const address = addressParts.length ? addressParts.join(', ') : tags['addr:full'] || this.currentLocation.display_name || 'Address not available';
          const distance = this.calculateDistance(this.currentLocation.lat, this.currentLocation.lon, coords.lat, coords.lon);
          let opening_hours_formatted = tags.opening_hours || 'Not specified';
          let isOpen = null;
          if (tags.opening_hours && typeof opening_hours === 'function') {
            try {
              const oh = new opening_hours(tags.opening_hours, {
                lat: coords.lat,
                lon: coords.lon
              });
              isOpen = oh.getState();
              opening_hours_formatted = tags.opening_hours.replace(/;/g, ', ').replace(/Mo/g, 'Mon').replace(/Tu/g, 'Tue').replace(/We/g, 'Wed').replace(/Th/g, 'Thu').replace(/Fr/g, 'Fri').replace(/Sa/g, 'Sat').replace(/Su/g, 'Sun');
            } catch (e) {
              console.warn('Opening hours parsing error:', e);
            }
          }
          const rating = tags.rating ? parseFloat(tags.rating) : this.generatePlaceholderRating();
          shops.push({
            id: element.id,
            name,
            type,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distance: (distance / 1000).toFixed(1),
            phone: tags.phone,
            website: tags.website,
            cuisine: tags.cuisine || (type === 'restaurant' ? 'Halal' : null),
            opening_hours: tags.opening_hours,
            opening_hours_formatted,
            isOpen,
            rating,
            tags
          });
          seen.add(element.id);
        } catch (e) {
          console.warn('Error processing shop:', element.id, e);
        }
      });
      this.shops = shops.sort((a, b) => a.distance - b.distance);
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
    openGoogleMaps(lat, lon, name = '') {
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
    resetSearch() {
      this.searchQuery = '';
      this.searchRadius = 5000;
      this.currentLocation = null;
      this.shops = [];
      this.error = '';
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "shadow",
  style: {
    "border-radius": "8px",
    "padding": "10px"
  }
};
const _hoisted_5 = {
  class: "card-body",
  style: {
    "padding": "5px"
  }
};
const _hoisted_6 = {
  class: "flex-wrap align-items-center justify-content-center gap-3 mb-4"
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
  class: "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
};
const _hoisted_15 = {
  class: "card h-100 d-flex flex-column"
};
const _hoisted_16 = {
  style: {
    "padding": "15px 15px 0 15px"
  }
};
const _hoisted_17 = {
  class: "card-title fw-bold text-dark mb-3",
  style: {
    "font-size": "1.5rem"
  }
};
const _hoisted_18 = {
  class: "card-body pt-0 flex-grow-1"
};
const _hoisted_19 = {
  class: "mb-2"
};
const _hoisted_20 = {
  class: "d-flex align-items-start"
};
const _hoisted_21 = {
  class: "text-truncate",
  style: {
    "display": "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical"
  }
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
  class: "card-footer mt-auto border-top-0 d-flex justify-content-between align-items-center gap-2"
};
const _hoisted_32 = ["onClick"];
const _hoisted_33 = ["onClick", "disabled"];
const _hoisted_34 = {
  key: 0,
  class: "d-flex justify-content-between align-items-center",
  style: {
    "padding": "10px"
  }
};
const _hoisted_35 = {
  class: "text-muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold text-center"
  }, "Halal Restaurants & Supermarkets Finder", -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center container mb-4 lead"
  }, " Discover the best halal restaurants and supermarkets near you with ease! Our platform connects you to trusted, local halal establishments. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search form "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex align-items-center mb-3",
    role: "search",
    onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.searchLocation && $options.searchLocation(...args), ["prevent"])),
    style: {
      "gap": "0.5rem"
    }
  }, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
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
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    autocomplete: "off",
    style: {
      "max-width": "300px"
    },
    ref: "searchInput"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn align-items-center justify-content-center",
    style: {
      "background": "#0b5d4b",
      "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      "color": "white",
      "height": "38px"
    },
    type: "submit",
    disabled: $data.loading
  }, [!$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, "Search")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_9))], 8 /* PROPS */, _hoisted_7)], 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    style: {
      "width": "3rem",
      "height": "3rem"
    },
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, "Searching for halal restaurants and supermarkets in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.searchQuery) + "...", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results "), !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No Search State "), !$data.searchQuery || $data.shops.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [...(_cache[4] || (_cache[4] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-shop display-4 text-muted mb-3"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "Search for halal restaurants & supermarkets", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Enter a city or address to find nearby halal establishments", -1 /* CACHED */)]))])) : $data.searchQuery && $data.shops.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No Results State "), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "text-center py-5"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-binoculars display-4 text-muted mb-3"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "No halal restaurants or supermarkets found")], -1 /* CACHED */))], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 2
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredShops, shop => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: shop.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-geo-alt-fill me-2 flex-shrink-0"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.address || 'Address not specified'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(5, n => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        key: n,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.getStarClass(shop.rating, n), "bi"])
      }, null, 2 /* CLASS */);
    }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.rating) + "/5 ", 1 /* TEXT */)]), shop.cuisine ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_26, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Cuisine:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shop.cuisine), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <strong>Opening Times:</strong> {{ shop.opening_hours_formatted || 'Not specified' }} "), shop.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_29, "Open Now")) : shop.isOpen === false ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_30, "Closed")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn d-flex align-items-center justify-content-center flex-grow-1",
      onClick: $event => $options.openGoogleMaps(shop.lat, shop.lon, shop.name),
      style: {
        "background": "#0b5d4b",
        "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "color": "white",
        "height": "38px"
      }
    }, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-center w-100"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Get Direction")], -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn d-flex align-items-center justify-content-center flex-grow-1",
      onClick: $event => $options.callShop(shop.phone),
      disabled: !shop.phone,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        background: shop.phone ? '#1881b9' : '#6c757d',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        color: 'white',
        height: '38px',
        cursor: shop.phone ? 'pointer' : 'not-allowed'
      })
    }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Call Shop", -1 /* CACHED */)]))], 12 /* STYLE, PROPS */, _hoisted_33)])])]);
  }), 128 /* KEYED_FRAGMENT */))])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), !$data.loading && $data.shops.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_35, " Showing " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredShops.length) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.shops.length) + " places ", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card-footer[data-v-ae99c338] {\n  padding: 0.5rem 0.75rem;\n  background-color: white !important;\n  border-top: 0;\n  position: sticky;\n  bottom: 0;\n}\n.card[data-v-ae99c338]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n.badge.bg-success[data-v-ae99c338] {\n  background-color: #28a745 !important;\n}\n.text-warning i[data-v-ae99c338] {\n  margin-right: 4px; /* Add spacing between stars */\n}\n@media (max-width: 768px) {\n.d-flex.align-items-center[data-v-ae99c338] {\n    flex-direction: column;\n    gap: 0.5rem;\n}\n.btn[data-v-ae99c338] {\n    width: 100%;\n}\n.card-footer[data-v-ae99c338] {\n    padding: 0.5rem 0.75rem;\n    background-color: white !important;\n    border-top: 0;\n    position: sticky;\n    bottom: 0;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_style_index_0_id_ae99c338_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_style_index_0_id_ae99c338_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_style_index_0_id_ae99c338_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/FoodComponent.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/FoodComponent.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FoodComponent_vue_vue_type_template_id_ae99c338_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true */ "./resources/js/components/FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true");
/* harmony import */ var _FoodComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FoodComponent.vue?vue&type=script&lang=js */ "./resources/js/components/FoodComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _FoodComponent_vue_vue_type_style_index_0_id_ae99c338_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css */ "./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_FoodComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FoodComponent_vue_vue_type_template_id_ae99c338_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-ae99c338"],['__file',"resources/js/components/FoodComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/FoodComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/FoodComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FoodComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_style_index_0_id_ae99c338_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=style&index=0&id=ae99c338&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_template_id_ae99c338_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FoodComponent_vue_vue_type_template_id_ae99c338_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FoodComponent.vue?vue&type=template&id=ae99c338&scoped=true");


/***/ })

}]);