"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_TravelComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "IslamicTravelAgencyFinder",
  data() {
    return {
      searchQuery: "",
      agencies: [],
      loading: false,
      lastSearchLocation: null,
      currentPage: 1,
      itemsPerPage: 6,
      apiConfig: {
        endpoint: "https://api.yelp.com/v3/businesses/search",
        apiKey: "eYbvtuOVRssBqdLhZn3WUmSfKDBGmRg7P5kZtO2NP1CK9D0m1GmWCndMJ1YdYX8YsB7w_1eqBb_5AGZFpA6LWljtcPK-yCxDvkXN3vUfCZtFUo9QzDyIKThcKlI0aHYx",
        fallbackToMock: false
      }
    };
  },
  computed: {
    hasResults() {
      return this.agencies.length > 0;
    },
    totalPages() {
      return Math.ceil(this.agencies.length / this.itemsPerPage);
    },
    paginatedAgencies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.agencies.slice(start, end);
    }
  },
  methods: {
    shareViaWhatsApp(agency) {
      const message = `Travel Agency: *${agency.name}*\n` + `Address: ${agency.address}\n` + `Coordinates: ${agency.lat.toFixed(4)}, ${agency.lon.toFixed(4)}\n` + `Rating: ${'★'.repeat(Math.round(agency.rating))}${'☆'.repeat(5 - Math.round(agency.rating))}\n` + `Packages: ${agency.packageCount}\n` + (agency.opening_hours ? `Opening Hours: ${agency.opening_hours}\n` : '') + (agency.website && this.isValidUrl(agency.website) ? `Website: ${agency.website}\n` : '') + `Google Maps: https://www.google.com/maps?q=${agency.lat},${agency.lon}`;
      const encodedMessage = encodeURIComponent(message);
      try {
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
      } catch (error) {
        console.error("Error opening WhatsApp:", error);
        alert("Unable to open WhatsApp. Please allow pop-ups or try again.");
      }
    },
    isValidUrl(url) {
      if (!url) return false;
      try {
        const parsedUrl = new URL(url);
        return ['http:', 'https:'].includes(parsedUrl.protocol);
      } catch (_unused) {
        return false;
      }
    },
    openWebsite(url) {
      if (this.isValidUrl(url)) {
        try {
          window.open(url, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error("Error opening website:", error);
          alert("Unable to open website. Please allow pop-ups or try again.");
        }
      } else {
        alert("No valid website available for this agency.");
      }
    },
    openGoogleMaps(lat, lon) {
      if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
        try {
          window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error("Error opening Google Maps:", error);
          alert("Unable to open Google Maps. Please allow pop-ups or try again.");
        }
      } else {
        alert("Invalid coordinates for this agency.");
      }
    },
    debounceSearch: lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(function () {
      this.searchAgencies();
    }, 500),
    async searchAgencies() {
      if (!this.searchQuery.trim()) return;
      this.loading = true;
      this.agencies = [];
      this.currentPage = 1;
      try {
        var _data$businesses;
        const response = await fetch(`${this.apiConfig.endpoint}?` + `term=islamic+travel+hajj+umrah&` + `location=${encodeURIComponent(this.searchQuery)}&` + `categories=travelservices&limit=50`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiConfig.apiKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          var _errorData$error;
          const errorData = await response.json();
          console.error('Yelp API error:', errorData);
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${((_errorData$error = errorData.error) === null || _errorData$error === void 0 ? void 0 : _errorData$error.description) || 'Unknown error'}`);
        }
        const data = await response.json();
        this.agencies = ((_data$businesses = data.businesses) === null || _data$businesses === void 0 ? void 0 : _data$businesses.map(business => {
          var _business$location, _business$location2, _business$coordinates, _business$coordinates2, _business$categories, _business$hours;
          return {
            id: business.id,
            name: business.name,
            address: ((_business$location = business.location) === null || _business$location === void 0 ? void 0 : _business$location.address1) || ((_business$location2 = business.location) === null || _business$location2 === void 0 || (_business$location2 = _business$location2.display_address) === null || _business$location2 === void 0 ? void 0 : _business$location2.join(', ')) || 'No address available',
            lat: ((_business$coordinates = business.coordinates) === null || _business$coordinates === void 0 ? void 0 : _business$coordinates.latitude) || 0,
            lon: ((_business$coordinates2 = business.coordinates) === null || _business$coordinates2 === void 0 ? void 0 : _business$coordinates2.longitude) || 0,
            packageCount: business.review_count || 0,
            services: ((_business$categories = business.categories) === null || _business$categories === void 0 ? void 0 : _business$categories.map(cat => cat.title)) || ['Travel Services'],
            rating: business.rating || 0,
            website: business.url || '',
            opening_hours: ((_business$hours = business.hours) === null || _business$hours === void 0 || (_business$hours = _business$hours[0]) === null || _business$hours === void 0 || (_business$hours = _business$hours.open) === null || _business$hours === void 0 ? void 0 : _business$hours.map(h => `${this.getDayName(h.day)}: ${this.formatTime(h.start)}-${this.formatTime(h.end)}`).join('; ')) || ''
          };
        })) || [];
        this.lastSearchLocation = this.searchQuery;
        if (this.agencies.length === 0) {
          alert("No agencies found for this location. Try another city.");
        }
      } catch (error) {
        console.error("Search error:", error);
        alert(`Unable to load agency data: ${error.message}. Please try again later.`);
      } finally {
        this.loading = false;
      }
    },
    getDayName(day) {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days[day] || 'Unknown';
    },
    formatTime(time) {
      if (!time || time.length !== 4) return time;
      const hour = parseInt(time.slice(0, 2));
      const minute = time.slice(2);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;
      return `${adjustedHour}:${minute} ${period}`;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=template&id=45afede8&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=template&id=45afede8&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid py-4"
};
const _hoisted_2 = {
  class: "row justify-content-center"
};
const _hoisted_3 = {
  class: "col-lg-10"
};
const _hoisted_4 = {
  class: "search-container shadow",
  style: {
    "border-radius": "20px",
    "padding": "15px",
    "border": "1px solid #ddd"
  }
};
const _hoisted_5 = {
  class: "search-filter-container d-flex align-items-center flex-wrap gap-3"
};
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 0
};
const _hoisted_8 = {
  key: 1,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_9 = {
  key: 0,
  class: "text-center py-5"
};
const _hoisted_10 = {
  class: "mt-3"
};
const _hoisted_11 = {
  key: 1
};
const _hoisted_12 = {
  key: 0,
  class: "text-center py-5"
};
const _hoisted_13 = {
  class: "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3"
};
const _hoisted_14 = {
  class: "card h-100"
};
const _hoisted_15 = {
  class: "card-header"
};
const _hoisted_16 = {
  class: "card-title fw-bold text-dark mb-0"
};
const _hoisted_17 = {
  class: "card-body"
};
const _hoisted_18 = {
  class: "mb-2 d-flex align-items-start"
};
const _hoisted_19 = {
  class: "text-truncate"
};
const _hoisted_20 = {
  class: "mb-2 text-muted"
};
const _hoisted_21 = {
  class: "mb-2 d-flex align-items-center"
};
const _hoisted_22 = {
  class: "text-warning me-2"
};
const _hoisted_23 = {
  class: "mb-2 services d-flex flex-wrap gap-2"
};
const _hoisted_24 = {
  key: 0,
  class: "mb-2 text-muted"
};
const _hoisted_25 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_26 = ["onClick", "disabled"];
const _hoisted_27 = ["onClick"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  key: 3,
  class: "d-flex justify-content-center mt-4"
};
const _hoisted_30 = {
  class: "pagination"
};
const _hoisted_31 = ["disabled"];
const _hoisted_32 = ["onClick"];
const _hoisted_33 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-4 fw-bold text-center"
  }, "Islamic Travel Agency Finder", -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center container mb-4 lead"
  }, " Discover trusted Islamic travel agencies worldwide for Hajj, Umrah, and halal travel packages. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex align-items-center flex-grow-1",
    role: "search",
    onSubmit: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.searchAgencies && $options.searchAgencies(...args), ["prevent"]))
  }, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "searchInput",
    class: "form-label me-2 fw-bold"
  }, "Search Location:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "searchInput",
    type: "search",
    class: "form-control",
    placeholder: "Enter city...",
    "aria-label": "Search location",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    onInput: _cache[1] || (_cache[1] = (...args) => $options.debounceSearch && $options.debounceSearch(...args)),
    autocomplete: "off"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary ms-2",
    type: "submit",
    disabled: $data.loading
  }, [!$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_7, "Search")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8))], 8 /* PROPS */, _hoisted_6)], 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    style: {
      "width": "3rem",
      "height": "3rem"
    },
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, "Searching for agencies in " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.searchQuery) + "...", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results "), !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No Search State "), !$data.searchQuery && $data.agencies.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-compass display-4 text-muted mb-3"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "Search for Islamic travel agencies worldwide", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Enter a city to begin", -1 /* CACHED */)]))])) : $data.searchQuery && $data.agencies.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No Results State "), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "text-center py-5"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-binoculars display-4 text-muted mb-3"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 text-muted"
  }, "No agencies found"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Try another city")], -1 /* CACHED */))], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 2
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.paginatedAgencies, agency => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: agency.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(agency.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-geo-alt-fill me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(agency.address), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-geo me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(agency.lat.toFixed(4)) + ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(agency.lon.toFixed(4)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(Math.round(agency.rating), n => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
        class: "bi bi-star-fill",
        key: 'star-' + n
      });
    }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(5 - Math.round(agency.rating), n => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
        class: "bi bi-star",
        key: 'empty-' + n
      });
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Packages: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(agency.packageCount), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(agency.services, service => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        class: "badge rounded-pill bg-success text-white",
        key: service
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(service), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))]), agency.opening_hours ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Opening Times:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(agency.opening_hours), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-visit",
      onClick: $event => $options.openWebsite(agency.website),
      disabled: !$options.isValidUrl(agency.website)
    }, " Visit Website ", 8 /* PROPS */, _hoisted_26), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-directions",
      onClick: $event => $options.openGoogleMaps(agency.lat, agency.lon)
    }, " Get Directions ", 8 /* PROPS */, _hoisted_27), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-share",
      onClick: $event => $options.shareViaWhatsApp(agency)
    }, " Share Details ", 8 /* PROPS */, _hoisted_28)])])])]);
  }), 128 /* KEYED_FRAGMENT */))])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pagination "), $options.hasResults ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
      disabled: $data.currentPage === 1
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "page-link",
    onClick: _cache[3] || (_cache[3] = $event => $data.currentPage--),
    disabled: $data.currentPage === 1
  }, "Previous", 8 /* PROPS */, _hoisted_31)], 2 /* CLASS */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.totalPages, page => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        active: $data.currentPage === page
      }]),
      key: page
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "page-link",
      onClick: $event => $data.currentPage = page
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(page), 9 /* TEXT, PROPS */, _hoisted_32)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
      disabled: $data.currentPage === $options.totalPages
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "page-link",
    onClick: _cache[4] || (_cache[4] = $event => $data.currentPage++),
    disabled: $data.currentPage === $options.totalPages
  }, "Next", 8 /* PROPS */, _hoisted_33)], 2 /* CLASS */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Bootstrap Icons are provided globally via /css/app.css; avoid CDN import */\nbody[data-v-45afede8] {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  font-size: 16px;\n}\n.btn-visit[data-v-45afede8] {\n  background-color: #228B22;\n  color: white;\n}\n.btn-directions[data-v-45afede8] {\n  background-color: #28a745;\n  color: white;\n}\n.btn-share[data-v-45afede8] {\n  background-color: #228B22;\n  color: white;\n}\n.btn-visit[data-v-45afede8]:hover, .btn-directions[data-v-45afede8]:hover, .btn-share[data-v-45afede8]:hover {\n  opacity: 0.9;\n}\n.search-container[data-v-45afede8] {\n  background: #fff;\n  transition: box-shadow 0.3s ease;\n}\n.search-container[data-v-45afede8]:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.search-filter-container[data-v-45afede8] {\n  gap: 12px !important;\n}\n.form-control[data-v-45afede8] {\n  border-radius: 6px;\n  padding: 10px 14px;\n  font-size: 16px;\n  max-width: 100%;\n  transition: all 0.2s ease;\n}\n.form-control[data-v-45afede8]:focus {\n  border-color: #228B22;\n  box-shadow: 0 0 0 4px rgba(34, 139, 34, 0.1);\n}\n.form-label[data-v-45afede8] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 4px;\n}\n.form-range[data-v-45afede8] {\n  width: 100px;\n  height: 5px;\n  background: #e9ecef;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.form-range[data-v-45afede8]::-webkit-slider-thumb {\n  width: 14px;\n  height: 14px;\n  background: #228B22;\n  border-radius: 50%;\n  -webkit-transition: background 0.2s ease;\n  transition: background 0.2s ease;\n}\n.form-range[data-v-45afede8]::-webkit-slider-thumb:hover {\n  background: #0056b3;\n}\n.radius-value[data-v-45afede8] {\n  font-size: 12px;\n  color: #666;\n  margin-top: 4px;\n  display: block;\n}\n.form-check-input[data-v-45afede8] {\n  width: 18px;\n  height: 18px;\n  margin-right: 6px;\n  cursor: pointer;\n}\n.form-check-label[data-v-45afede8] {\n  font-size: 14px;\n  cursor: pointer;\n}\n.btn[data-v-45afede8] {\n  border-radius: 6px;\n  padding: 10px 16px;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.btn[data-v-45afede8]:hover {\n  transform: translateY(-1px);\n}\n.btn-primary[data-v-45afede8] {\n  background: #228B22;\n  border: none;\n}\n.btn-primary[data-v-45afede8]:hover {\n  background: #0056b3;\n}\n.btn-visit[data-v-45afede8] {\n  background: #0b5d4b;\n  color: white;\n  flex: 1;\n}\n.btn-directions[data-v-45afede8] {\n  background: #34c759;\n  color: white;\n  flex: 1;\n}\n.btn-share[data-v-45afede8] {\n  background: #1881b9;\n  color: white;\n  flex: 1;\n}\n.card[data-v-45afede8] {\n  border-radius: 8px;\n  border: none;\n  transition: all 0.2s ease;\n}\n.card[data-v-45afede8]:hover {\n  transform: scale(1.02);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-45afede8] {\n  background: #f8f9fa;\n  border-bottom: 1px solid #ddd;\n  padding: 12px 16px;\n}\n.card-title[data-v-45afede8] {\n  font-size: 20px;\n}\n.services[data-v-45afede8] {\n  gap: 6px;\n}\n.badge[data-v-45afede8] {\n  font-size: 12px;\n  padding: 6px 12px;\n  border-radius: 16px;\n}\n.spinner-border[data-v-45afede8] {\n  width: 24px;\n  height: 24px;\n}\n.pagination .page-link[data-v-45afede8] {\n  font-size: 14px;\n  padding: 8px 12px;\n  cursor: pointer;\n}\n@media (max-width: 767px) {\n.search-filter-container[data-v-45afede8] {\n    flex-direction: column !important;\n    align-items: stretch;\n    gap: 8px !important;\n}\n.form-control[data-v-45afede8],\n  .btn[data-v-45afede8] {\n    font-size: 14px;\n    padding: 8px 12px;\n}\n.form-range[data-v-45afede8] {\n    width: 100%;\n}\n.radius-filter[data-v-45afede8],\n  .service-filter[data-v-45afede8] {\n    width: 100%;\n}\n.form-check-label[data-v-45afede8] {\n    font-size: 13px;\n}\n.btn-visit[data-v-45afede8],\n  .btn-directions[data-v-45afede8],\n  .btn-share[data-v-45afede8] {\n    width: 100%;\n}\n}\n@media (min-width: 768px) {\n.search-filter-container[data-v-45afede8] {\n    flex-direction: row;\n    justify-content: space-between;\n}\n.radius-filter[data-v-45afede8],\n  .service-filter[data-v-45afede8] {\n    flex: 0 0 auto;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_style_index_0_id_45afede8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_style_index_0_id_45afede8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_style_index_0_id_45afede8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/TravelComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/TravelComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TravelComponent_vue_vue_type_template_id_45afede8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TravelComponent.vue?vue&type=template&id=45afede8&scoped=true */ "./resources/js/components/TravelComponent.vue?vue&type=template&id=45afede8&scoped=true");
/* harmony import */ var _TravelComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TravelComponent.vue?vue&type=script&lang=js */ "./resources/js/components/TravelComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _TravelComponent_vue_vue_type_style_index_0_id_45afede8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css */ "./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TravelComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TravelComponent_vue_vue_type_template_id_45afede8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-45afede8"],['__file',"resources/js/components/TravelComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/TravelComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/TravelComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TravelComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_style_index_0_id_45afede8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=style&index=0&id=45afede8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/TravelComponent.vue?vue&type=template&id=45afede8&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/TravelComponent.vue?vue&type=template&id=45afede8&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_template_id_45afede8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TravelComponent_vue_vue_type_template_id_45afede8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TravelComponent.vue?vue&type=template&id=45afede8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TravelComponent.vue?vue&type=template&id=45afede8&scoped=true");


/***/ })

}]);