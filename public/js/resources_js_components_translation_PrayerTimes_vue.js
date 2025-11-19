"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_translation_PrayerTimes_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PrayerTimes',
  data() {
    return {
      city: "",
      cityName: null,
      prayerTimes: null,
      nextPrayer: null,
      loading: false,
      error: null,
      // Only for real errors (API down, network, etc.)
      lat: null,
      lon: null,
      gregorianDate: "",
      hijriDate: "",
      updateInterval: null
    };
  },
  computed: {
    filteredPrayerTimes() {
      if (!this.prayerTimes) return {};
      const unwantedKeys = ["Sunset", "Imsak", "Firstthird", "Lastthird", "Midnight"];
      return Object.fromEntries(Object.entries(this.prayerTimes).filter(([key]) => !unwantedKeys.includes(key)));
    }
  },
  mounted() {
    this.setCurrentDate();
    this.getCurrentLocation();

    // Update "Next Prayer" every minute
    this.updateInterval = setInterval(() => {
      if (this.prayerTimes) {
        this.calculateNextPrayer();
      }
    }, 60000);
  },
  beforeUnmount() {
    if (this.updateInterval) clearInterval(this.updateInterval);
  },
  methods: {
    setCurrentDate() {
      const now = new Date();
      this.gregorianDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Hijri date (modern browsers support Intl)
      try {
        const hijri = new Intl.DateTimeFormat('en-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(now);
        this.hijriDate = hijri;
      } catch (e) {
        this.hijriDate = "";
      }
    },
    getCurrentLocation() {
      if (!navigator.geolocation) {
        this.fetchPrayerTimesByCity('London');
        return;
      }
      this.loading = true;
      const geoTimeout = setTimeout(() => {
        this.loading = false;
        this.fetchPrayerTimesByCity('London');
      }, 10000);
      navigator.geolocation.getCurrentPosition(position => {
        clearTimeout(geoTimeout);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.fetchPrayerTimesByLocation();
      }, () => {
        clearTimeout(geoTimeout);
        this.loading = false;
        this.fetchPrayerTimesByCity('London'); // Silent fallback
      }, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      });
    },
    async fetchPrayerTimesByLocation() {
      if (!this.lat || !this.lon) return;
      try {
        const today = new Date().toDateString();
        const cacheKey = `prayer-${this.lat.toFixed(4)}-${this.lon.toFixed(4)}-${today}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = data.city || "Your Location";
          this.calculateNextPrayer();
          this.loading = false;
          return;
        }
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${this.lat}&longitude=${this.lon}&method=2`);
        if (!response.ok) throw new Error("Network error");
        const json = await response.json();
        if (json.code !== 200) throw new Error("Invalid API response");
        this.prayerTimes = json.data.timings;
        this.cityName = json.data.meta.timezone;
        localStorage.setItem(cacheKey, JSON.stringify({
          timings: json.data.timings,
          city: json.data.meta.timezone
        }));
        this.calculateNextPrayer();
      } catch (err) {
        this.error = "Failed to load prayer times. Please try again later.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async fetchPrayerTimesByCity(city = 'London') {
      try {
        const today = new Date().toDateString();
        const cacheKey = `prayer-${city}-${today}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = city;
          this.calculateNextPrayer();
          return;
        }
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=GB&method=2`);
        if (!response.ok) throw new Error("Network error");
        const json = await response.json();
        if (json.code !== 200) throw new Error("API error");
        this.prayerTimes = json.data.timings;
        this.cityName = city;
        localStorage.setItem(cacheKey, JSON.stringify({
          timings: json.data.timings
        }));
        this.calculateNextPrayer();
      } catch (err) {
        this.error = "Failed to load prayer times for " + city;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    calculateNextPrayer() {
      if (!this.prayerTimes) return;
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let closest = Infinity;
      let next = null;
      for (const [name, time] of Object.entries(this.filteredPrayerTimes)) {
        const [h, m] = time.split(':').map(Number);
        const minutes = h * 60 + m;
        if (minutes > currentMinutes && minutes < closest) {
          closest = minutes;
          next = name;
        }
      }
      this.nextPrayer = next || 'Fajr'; // rollover to Fajr if all passed
    },
    getPrayerDisplayName(prayer) {
      const map = {
        Fajr: 'Fajr',
        Sunrise: 'Sunrise',
        Dhuhr: 'Dhuhr',
        Asr: 'Asr',
        Maghrib: 'Maghrib',
        Isha: 'Isha'
      };
      return map[prayer] || prayer;
    },
    formatTime(time) {
      const [h, m] = time.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid mt-3",
  "aria-labelledby": "prayer-times-heading"
};
const _hoisted_2 = {
  class: "text-center container"
};
const _hoisted_3 = {
  class: "row mb-3",
  style: {
    "align-items": "center",
    "text-align": "center"
  }
};
const _hoisted_4 = {
  key: 0,
  class: "text-center mb-4",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_5 = {
  key: 1,
  class: "alert alert-danger text-center",
  role: "alert",
  "aria-live": "assertive"
};
const _hoisted_6 = {
  key: 0,
  class: "row justify-content-center g-3",
  role: "list",
  "aria-label": "Prayer times"
};
const _hoisted_7 = ["aria-current"];
const _hoisted_8 = {
  key: 0,
  class: "badge mt-2 small",
  style: {
    "background": "#0b806f !important",
    "color": "#ffffff !important"
  },
  "aria-label": "Next prayer"
};
const _hoisted_9 = {
  key: 1,
  class: "text-center text-muted mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mt-2 text-muted"
  }, "Loading prayer times...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Only show real errors (critical) errors — not location fallback "), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Prayer Times Grid "), $data.prayerTimes && !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredPrayerTimes, (time, prayer) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-6 col-sm-4 col-md-3 col-lg-2",
      key: prayer,
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["p-3 text-center rounded shadow-sm h-100 prayer-card", {
        'text-white': prayer === $data.nextPrayer,
        'bg-light': prayer !== $data.nextPrayer
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(prayer === $data.nextPrayer ? 'background: #1a5f7a !important;' : ''),
      "aria-current": prayer === $data.nextPrayer ? 'true' : 'false'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["h6 fw-bold mb-2", prayer === $data.nextPrayer ? 'text-white' : 'text-dark'])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getPrayerDisplayName(prayer)), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "mb-0 fs-5 fw-bold",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(prayer === $data.nextPrayer ? 'color: white !important;' : 'color: #1a5f7a !important;')
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(time)), 5 /* TEXT, STYLE */), prayer === $data.nextPrayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, " Next ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 14 /* CLASS, STYLE, PROPS */, _hoisted_7)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Fallback when no data at all "), !$data.prayerTimes && !$data.loading && !$data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [...(_cache[2] || (_cache[2] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Unable to load prayer times. Please check your connection.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.prayer-card[data-v-5ae7cc26] {\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n.prayer-card[data-v-5ae7cc26]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;\n}\n.spinner[data-v-5ae7cc26] {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #1a5f7a;\n  border-radius: 50%;\n  width: 42px;\n  height: 42px;\n  animation: spin-5ae7cc26 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes spin-5ae7cc26 {\nto { transform: rotate(360deg);\n}\n}\n@media (prefers-reduced-motion: reduce) {\n.prayer-card[data-v-5ae7cc26] { transition: none;\n}\n.spinner[data-v-5ae7cc26] { animation: none;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true */ "./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true");
/* harmony import */ var _PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrayerTimes.vue?vue&type=script&lang=js */ "./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js");
/* harmony import */ var _PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css */ "./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-5ae7cc26"],['__file',"resources/js/components/translation/PrayerTimes.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true");


/***/ })

}]);