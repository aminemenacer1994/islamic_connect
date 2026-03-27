"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_DigitalLibraryComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  data() {
    return {
      activeCategoryKey: "all",
      searchQuery: "",
      categoryDefinitions: [{
        key: "seasonal",
        title: "Seasonal",
        subtitle: "Ramadan and other time-based collections.",
        icon: "bi-calendar-heart"
      }, {
        key: "special-events",
        title: "Special Events",
        subtitle: "Event hubs, programmes, and one-off experiences.",
        icon: "bi-stars"
      }, {
        key: "social",
        title: "Social",
        subtitle: "Community-first tracks for connection and growth.",
        icon: "bi-people"
      }, {
        key: "learning",
        title: "Learning",
        subtitle: "Structured learning paths and essentials.",
        icon: "bi-journal-bookmark"
      }],
      guides: [{
        id: "revert-essentials",
        title: "Reverts Corner",
        description: "A practical starting point for new Muslims covering prayer, daily worship routines, and foundational learning.",
        audience: "revert",
        category: "learning",
        level: "Beginner",
        href: "/revert",
        cta: "Open Revert Guide",
        tags: ["Shahada", "Prayer", "Daily Practice"]
      }, {
        id: "youth-faith-lab",
        title: "Youth Faith Lab",
        description: "Guidance for students and young professionals navigating identity, studies, and faith-centered habits.",
        audience: "youth",
        category: "social",
        level: "Intermediate",
        href: "/guide",
        cta: "Start Youth Track",
        tags: ["Campus Life", "Identity", "Habits"]
      }, {
        id: "ramadan-guide",
        title: "Ramadan Guide",
        description: "A dedicated Ramadan experience with practical daily planning, worship focus, and reflection resources.",
        audience: "seasonal",
        category: "seasonal",
        level: "All Levels",
        href: "/ramadan-2026",
        cta: "Open Ramadan Guide",
        tags: ["Ramadan", "Fasting", "Daily Plan"]
      }]
    };
  },
  computed: {
    resolvedGuides() {
      return (this.guides || []).map(guide => {
        const category = String((guide === null || guide === void 0 ? void 0 : guide.category) || "").trim();
        if (category) return guide;
        const audience = String((guide === null || guide === void 0 ? void 0 : guide.audience) || "").trim();
        if (audience === "seasonal") return _objectSpread(_objectSpread({}, guide), {}, {
          category: "seasonal"
        });
        return _objectSpread(_objectSpread({}, guide), {}, {
          category: "learning"
        });
      });
    },
    normalizedSearchQuery() {
      return String(this.searchQuery || "").trim().toLowerCase();
    },
    filteredGuides() {
      const q = this.normalizedSearchQuery;
      const list = this.resolvedGuides || [];
      if (!q) return list;
      return list.filter(guide => {
        const title = String((guide === null || guide === void 0 ? void 0 : guide.title) || "").toLowerCase();
        const description = String((guide === null || guide === void 0 ? void 0 : guide.description) || "").toLowerCase();
        const tags = Array.isArray(guide === null || guide === void 0 ? void 0 : guide.tags) ? guide.tags.join(" ").toLowerCase() : "";
        const audience = String((guide === null || guide === void 0 ? void 0 : guide.audience) || "").toLowerCase();
        return title.includes(q) || description.includes(q) || tags.includes(q) || audience.includes(q);
      });
    },
    categoryIndex() {
      const defs = Array.isArray(this.categoryDefinitions) ? this.categoryDefinitions : [];
      const index = new Map();
      defs.forEach(def => {
        if (!def || !def.key) return;
        index.set(String(def.key), def);
      });
      return index;
    },
    sections() {
      const groups = new Map();
      (this.filteredGuides || []).forEach(guide => {
        const key = String((guide === null || guide === void 0 ? void 0 : guide.category) || "other").trim() || "other";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(guide);
      });
      const ordered = [];
      (this.categoryDefinitions || []).forEach(def => {
        const key = String((def === null || def === void 0 ? void 0 : def.key) || "").trim();
        if (!key) return;
        const items = groups.get(key) || [];
        if (!items.length) return;
        ordered.push(_objectSpread(_objectSpread({}, def), {}, {
          key,
          guides: items
        }));
        groups.delete(key);
      });
      const remaining = Array.from(groups.entries()).map(([key, items]) => ({
        key,
        items
      })).filter(entry => (entry.items || []).length);
      remaining.forEach(({
        key,
        items
      }) => {
        const def = this.categoryIndex.get(String(key));
        ordered.push({
          key,
          title: (def === null || def === void 0 ? void 0 : def.title) || "Other",
          subtitle: (def === null || def === void 0 ? void 0 : def.subtitle) || "",
          icon: (def === null || def === void 0 ? void 0 : def.icon) || "bi-folder2-open",
          guides: items
        });
      });
      return ordered;
    },
    categoryPills() {
      return (this.sections || []).map(section => ({
        key: section.key,
        title: section.title,
        icon: section.icon,
        count: (section.guides || []).length
      }));
    },
    visibleSections() {
      if (this.activeCategoryKey === "all") return this.sections || [];
      return (this.sections || []).filter(section => String(section.key) === String(this.activeCategoryKey));
    },
    totalVisibleCount() {
      return (this.visibleSections || []).reduce((sum, section) => sum + ((section.guides || []).length || 0), 0);
    }
  },
  methods: {
    formatAudience(audience) {
      const audienceMap = {
        revert: "Reverts",
        youth: "Youth",
        seasonal: "Seasonal"
      };
      return audienceMap[audience] || "Guide";
    },
    resetFilters() {
      this.activeCategoryKey = "all";
      this.searchQuery = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DigitalLibraryComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DigitalLibraryComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_DigitalLibraryComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_DigitalLibraryComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/DigitalLibraryComponent.vue */ "./resources/components/vue/DigitalLibraryComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-4 digital-library-page"
};
const _hoisted_2 = {
  class: "library-toolbar d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-3 mb-3"
};
const _hoisted_3 = {
  class: "small text-muted mb-0 library-count",
  "aria-live": "polite"
};
const _hoisted_4 = {
  class: "me-1"
};
const _hoisted_5 = {
  class: "library-search"
};
const _hoisted_6 = {
  class: "library-search-inner"
};
const _hoisted_7 = {
  key: 0,
  class: "library-category-pills",
  role: "group",
  "aria-label": "Filter guides by category"
};
const _hoisted_8 = {
  class: "pill-count"
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  class: "pill-count"
};
const _hoisted_11 = {
  key: 0,
  class: "library-sections"
};
const _hoisted_12 = ["aria-label"];
const _hoisted_13 = {
  class: "library-section-header"
};
const _hoisted_14 = {
  class: "library-section-title-row"
};
const _hoisted_15 = {
  class: "section-icon",
  "aria-hidden": "true"
};
const _hoisted_16 = {
  class: "h4 mb-0 fw-bold section-title"
};
const _hoisted_17 = {
  key: 0,
  class: "mb-0 section-subtitle text-muted"
};
const _hoisted_18 = {
  class: "section-count",
  "aria-label": "Number of guides in this category"
};
const _hoisted_19 = {
  class: "row g-4"
};
const _hoisted_20 = ["href", "aria-label"];
const _hoisted_21 = {
  class: "card custom-card rounded-4 overflow-hidden h-100"
};
const _hoisted_22 = {
  class: "card-body d-flex flex-column p-3"
};
const _hoisted_23 = {
  class: "guide-meta-row mb-2"
};
const _hoisted_24 = {
  class: "audience-chip"
};
const _hoisted_25 = {
  class: "guide-level"
};
const _hoisted_26 = {
  class: "h5 fw-bold text-dark mb-2 guide-title"
};
const _hoisted_27 = {
  class: "card-text text-muted mb-3 card-description"
};
const _hoisted_28 = {
  class: "mb-4 guide-topics",
  "aria-label": "Guide topics"
};
const _hoisted_29 = {
  class: "guide-cta-btn mt-auto"
};
const _hoisted_30 = {
  key: 1,
  class: "empty-state text-center"
};
const _hoisted_31 = {
  key: 2,
  class: "empty-state text-center"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "text-center fw-bold display-5 mb-3"
  }, "Digital Content Library", -1 /* CACHED */)), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center mb-4 lead"
  }, " Browse structured Islamic guides for reverts, youth, and anyone looking to learn with clarity and confidence. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_3, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalVisibleCount), 1 /* TEXT */), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" guides available ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    type: "search",
    class: "form-control library-search-input",
    placeholder: "Search guides…",
    "aria-label": "Search guides"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery, void 0, {
    trim: true
  }]]), $data.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link library-search-clear",
    onClick: _cache[1] || (_cache[1] = $event => $data.searchQuery = ''),
    "aria-label": "Clear search"
  }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), $options.categoryPills.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn category-pill", {
      'is-active': $data.activeCategoryKey === 'all'
    }]),
    onClick: _cache[2] || (_cache[2] = $event => $data.activeCategoryKey = 'all')
  }, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-grid-3x3-gap me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" All ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.guides.length), 1 /* TEXT */)], 2 /* CLASS */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.categoryPills, pill => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: pill.key,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn category-pill", {
        'is-active': $data.activeCategoryKey === pill.key
      }]),
      onClick: $event => $data.activeCategoryKey = pill.key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi me-1", pill.icon]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pill.title) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pill.count), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_9);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.guides.length && $options.totalVisibleCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visibleSections, section => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", {
      key: section.key,
      class: "library-section",
      "aria-label": `${section.title} guides`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", section.icon])
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), section.subtitle ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.subtitle), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.guides.length), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.guides, guide => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: guide.id,
        class: "col-12 col-md-6 col-lg-4"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "guide-card-link text-decoration-none d-block h-100",
        href: guide.href,
        "aria-label": guide.cta,
        target: "_blank",
        rel: "noopener noreferrer"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-person-badge-fill me-1",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatAudience(guide.audience)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.level), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(guide.tags, tag => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: `${guide.id}-${tag}`,
          class: "topic-chip"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.cta), 1 /* TEXT */), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-arrow-up-right"
      }, null, -1 /* CACHED */))])])])], 8 /* PROPS */, _hoisted_20)]);
    }), 128 /* KEYED_FRAGMENT */))])], 8 /* PROPS */, _hoisted_12);
  }), 128 /* KEYED_FRAGMENT */))])) : $data.guides.length && !$options.totalVisibleCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-1 fw-semibold"
  }, "No matches found.", -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-3 text-muted"
  }, "Try a different search or reset filters.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-secondary",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.resetFilters && $options.resetFilters(...args))
  }, " Reset filters ")])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-x",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "No guides available right now.", -1 /* CACHED */)]))]))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/DigitalLibraryComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/components/vue/DigitalLibraryComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DigitalLibraryComponent_vue_vue_type_template_id_3f783d50_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true */ "./resources/components/vue/DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true");
/* harmony import */ var _DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DigitalLibraryComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/DigitalLibraryComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _DigitalLibraryComponent_vue_vue_type_style_index_0_id_3f783d50_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css */ "./resources/components/vue/DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DigitalLibraryComponent_vue_vue_type_template_id_3f783d50_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3f783d50"],['__file',"resources/components/vue/DigitalLibraryComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/DigitalLibraryComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/components/vue/DigitalLibraryComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalLibraryComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/components/vue/DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_style_index_0_id_3f783d50_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=style&index=0&id=3f783d50&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/components/vue/DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_template_id_3f783d50_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_template_id_3f783d50_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DigitalLibraryComponent.vue?vue&type=template&id=3f783d50&scoped=true");


/***/ }),

/***/ "./resources/js/components/DigitalLibraryComponent.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/DigitalLibraryComponent.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DigitalLibraryComponent.vue?vue&type=script&lang=js */ "./resources/js/components/DigitalLibraryComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/DigitalLibraryComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/DigitalLibraryComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/DigitalLibraryComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DigitalLibraryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DigitalLibraryComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DigitalLibraryComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);