"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ReviewQueueComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/reviewQueueStorage */ "./resources/components/scripts/reviewQueueStorage.js");
/* harmony import */ var _scripts_memorisationTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/memorisationTracking */ "./resources/components/scripts/memorisationTracking.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ReviewQueueComponent",
  data() {
    return {
      isLoading: true,
      currentUserId: 0,
      reviewQueueMap: {},
      reviewQueueStorageHandler: null,
      reviewQueueSyncHandler: null,
      removingKeys: {}
    };
  },
  computed: {
    queueCount() {
      return Object.keys(this.reviewQueueMap || {}).length;
    },
    queueList() {
      return (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.getReviewQueueList)(this.reviewQueueMap);
    }
  },
  mounted() {
    var _window;
    this.currentUserId = Number(((_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.userId) || 0) || 0;
    this.loadReviewQueue();
    (0,_scripts_memorisationTracking__WEBPACK_IMPORTED_MODULE_1__.trackEventOnce)("review_queue_opened", {
      userId: this.currentUserId,
      count: this.queueCount,
      flowStep: "review"
    }, {
      dedupeKey: `review_queue_opened:${this.currentUserId}`
    });
    this.reviewQueueStorageHandler = event => {
      if ((event === null || event === void 0 ? void 0 : event.key) !== this.getStorageKey()) return;
      this.loadReviewQueue();
    };
    this.reviewQueueSyncHandler = event => {
      var _event$detail;
      if (event !== null && event !== void 0 && (_event$detail = event.detail) !== null && _event$detail !== void 0 && _event$detail.key && event.detail.key !== this.getStorageKey()) {
        return;
      }
      this.loadReviewQueue();
    };
    window.addEventListener("storage", this.reviewQueueStorageHandler);
    window.addEventListener(_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.REVIEW_QUEUE_SYNC_EVENT, this.reviewQueueSyncHandler);
  },
  beforeUnmount() {
    if (this.reviewQueueStorageHandler) {
      window.removeEventListener("storage", this.reviewQueueStorageHandler);
      this.reviewQueueStorageHandler = null;
    }
    if (this.reviewQueueSyncHandler) {
      window.removeEventListener(_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.REVIEW_QUEUE_SYNC_EVENT, this.reviewQueueSyncHandler);
      this.reviewQueueSyncHandler = null;
    }
  },
  methods: {
    getScopeOptions() {
      return {
        userId: this.currentUserId
      };
    },
    getStorageKey() {
      return (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.getReviewQueueStorageKey)(this.getScopeOptions());
    },
    loadReviewQueue() {
      const queue = (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.readReviewQueue)(this.getScopeOptions());
      this.reviewQueueMap = (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.normalizeReviewQueueMap)(queue);
      this.isLoading = false;
    },
    persistReviewQueue(nextQueue = this.reviewQueueMap) {
      const normalized = (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.normalizeReviewQueueMap)(nextQueue);
      this.reviewQueueMap = normalized;
      (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.writeReviewQueue)(normalized, this.getScopeOptions());
      (0,_scripts_reviewQueueStorage__WEBPACK_IMPORTED_MODULE_0__.dispatchReviewQueueSync)({
        source: "review-queue-page",
        key: this.getStorageKey(),
        count: Object.keys(normalized).length
      });
    },
    isRemoving(item) {
      const key = String((item === null || item === void 0 ? void 0 : item.key) || "").trim();
      return !!(key && this.removingKeys[key]);
    },
    removeFromQueue(item) {
      const key = String((item === null || item === void 0 ? void 0 : item.key) || "").trim();
      if (!key || this.removingKeys[key]) return;
      // Final hardening: keep queue removal idempotent under rapid taps.
      this.removingKeys = _objectSpread(_objectSpread({}, this.removingKeys), {}, {
        [key]: true
      });
      const next = _objectSpread({}, this.reviewQueueMap);
      delete next[key];
      try {
        this.persistReviewQueue(next);
      } finally {
        const pending = _objectSpread({}, this.removingKeys);
        delete pending[key];
        this.removingKeys = pending;
      }
    },
    getSurahLabel(item) {
      const explicitName = String((item === null || item === void 0 ? void 0 : item.surahEnglishName) || "").trim();
      if (explicitName) {
        return `Surah ${item.surahNumber} (${explicitName})`;
      }
      return `Surah ${(item === null || item === void 0 ? void 0 : item.surahNumber) || "?"}`;
    },
    formatMarkedAt(timestamp) {
      const safeTimestamp = Number(timestamp || 0);
      if (!safeTimestamp) return "Unknown";
      try {
        return new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short"
        }).format(new Date(safeTimestamp));
      } catch (_) {
        return new Date(safeTimestamp).toLocaleString();
      }
    },
    practiceNowUrl(item) {
      const surahNumber = Number((item === null || item === void 0 ? void 0 : item.surahNumber) || 0);
      const ayahNumber = Number((item === null || item === void 0 ? void 0 : item.ayahNumber) || 0);
      if (!surahNumber || !ayahNumber) return "/surat";
      return `/surat?surah=${surahNumber}&ayah=${ayahNumber}`;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ReviewQueueComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ReviewQueueComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_ReviewQueueComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_ReviewQueueComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/ReviewQueueComponent.vue */ "./resources/components/vue/ReviewQueueComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "review-queue-page container py-4",
  "aria-label": "My review queue"
};
const _hoisted_2 = {
  class: "review-queue-header"
};
const _hoisted_3 = {
  class: "review-queue-count-badge",
  "aria-live": "polite"
};
const _hoisted_4 = {
  key: 0,
  class: "review-queue-loading",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_5 = {
  key: 1,
  class: "review-queue-empty"
};
const _hoisted_6 = {
  key: 2,
  class: "review-queue-list",
  role: "list"
};
const _hoisted_7 = {
  class: "review-queue-item-main"
};
const _hoisted_8 = {
  class: "review-queue-item-title mb-1"
};
const _hoisted_9 = {
  class: "review-queue-item-date mb-0"
};
const _hoisted_10 = {
  class: "review-queue-item-actions"
};
const _hoisted_11 = ["href"];
const _hoisted_12 = ["disabled", "aria-busy", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_2, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "review-queue-eyebrow mb-1"
  }, "Memorisation"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "review-queue-title mb-1"
  }, "My Review Queue"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "review-queue-subtitle mb-0"
  }, " Bismillah. Practice the ayahs that need another pass, then return to your next session. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.queueCount) + " to practise ", 1 /* TEXT */)]), $data.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, " Loading your review queue... ")) : !$options.queueList.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [...(_cache[1] || (_cache[1] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2"
  }, "No review needed yet", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-3"
  }, " Finish a short memorisation session and quiz. Any ayahs that need more work will appear here. ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/surat",
    class: "btn btn-success"
  }, "Start learning", -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_6, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.queueList, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.key,
      class: "review-queue-item",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getSurahLabel(item)) + " · Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayahNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, "Date marked: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatMarkedAt(item.markedAt)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: $options.practiceNowUrl(item),
      class: "btn btn-success review-queue-action-primary"
    }, "Practice", 8 /* PROPS */, _hoisted_11), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-outline-danger review-queue-action-secondary",
      disabled: $options.isRemoving(item),
      "aria-busy": $options.isRemoving(item) ? 'true' : 'false',
      onClick: $event => $options.removeFromQueue(item)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.isRemoving(item) ? "Removing..." : "Remove"), 9 /* TEXT, PROPS */, _hoisted_12)])]);
  }), 128 /* KEYED_FRAGMENT */))]))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/scripts/memorisationTracking.js":
/*!**************************************************************!*\
  !*** ./resources/components/scripts/memorisationTracking.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackEventOnce: () => (/* binding */ trackEventOnce)
/* harmony export */ });
// Lightweight local tracking for memorisation flows.
// Goals:
// - No external dependencies.
// - Very small runtime cost (sync localStorage write only when an event is new).
// - Dedupe: fire only once per action (per tab + persisted key).
//
// Storage format:
//   localStorage["ic_memorisation_events_v1"] = JSON.stringify([{...event}])
//
// This is intentionally "best effort": failures never break UX.

const STORE_KEY = "ic_memorisation_events_v1";
const MAX_EVENTS = 300;
const RECENT_EVENT_WINDOW_MS = 4000;
const firedInTab = new Set();
const recentFingerprints = new Map();
function nowIso() {
  try {
    return new Date().toISOString();
  } catch (_) {
    return String(Date.now());
  }
}
function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch (_) {
    return fallback;
  }
}
function readStore() {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const raw = window.localStorage.getItem(STORE_KEY);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}
function writeStore(events) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(events));
  } catch (_) {}
}
function hasPersistedKey(dedupeKey) {
  if (!dedupeKey) return false;
  const events = readStore();
  return events.some(evt => evt && evt.dedupeKey === dedupeKey);
}
function stablePayloadString(payload) {
  if (!payload || typeof payload !== "object") return "";
  const keys = Object.keys(payload).sort();
  const normalized = {};
  keys.forEach(key => {
    normalized[key] = payload[key];
  });
  try {
    return JSON.stringify(normalized);
  } catch (_) {
    return "";
  }
}
function isRecentDuplicate(eventName, payload) {
  const now = Date.now();
  const fingerprint = `${eventName}:${stablePayloadString(payload)}`;
  const seenAt = Number(recentFingerprints.get(fingerprint) || 0);
  if (seenAt && now - seenAt < RECENT_EVENT_WINDOW_MS) {
    return true;
  }
  recentFingerprints.set(fingerprint, now);
  if (recentFingerprints.size > 800) {
    // Keep memory bounded in long-lived tabs.
    recentFingerprints.clear();
  }
  return false;
}
function trackEventOnce(name, payload = {}, options = {}) {
  const eventName = String(name || "").trim();
  if (!eventName) return false;
  if (isRecentDuplicate(eventName, payload)) return false;
  const dedupeKey = String((options === null || options === void 0 ? void 0 : options.dedupeKey) || `${eventName}:${(options === null || options === void 0 ? void 0 : options.id) || ""}`).trim();
  if (!dedupeKey) return false;
  if (firedInTab.has(dedupeKey)) return false;
  if (hasPersistedKey(dedupeKey)) {
    firedInTab.add(dedupeKey);
    return false;
  }
  firedInTab.add(dedupeKey);
  const event = {
    name: eventName,
    at: nowIso(),
    dedupeKey,
    payload: payload && typeof payload === "object" ? payload : {
      value: payload
    }
  };
  const next = readStore();
  next.push(event);
  if (next.length > MAX_EVENTS) {
    next.splice(0, next.length - MAX_EVENTS);
  }
  writeStore(next);
  return true;
}

/***/ }),

/***/ "./resources/components/scripts/reviewQueueStorage.js":
/*!************************************************************!*\
  !*** ./resources/components/scripts/reviewQueueStorage.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REVIEW_QUEUE_STORAGE_BASE_KEY: () => (/* binding */ REVIEW_QUEUE_STORAGE_BASE_KEY),
/* harmony export */   REVIEW_QUEUE_SYNC_EVENT: () => (/* binding */ REVIEW_QUEUE_SYNC_EVENT),
/* harmony export */   REVIEW_QUEUE_TOOL_PREFERENCE_BASE_KEY: () => (/* binding */ REVIEW_QUEUE_TOOL_PREFERENCE_BASE_KEY),
/* harmony export */   buildScopedReviewQueueKey: () => (/* binding */ buildScopedReviewQueueKey),
/* harmony export */   dispatchReviewQueueSync: () => (/* binding */ dispatchReviewQueueSync),
/* harmony export */   getOrCreateReviewQueueAnonId: () => (/* binding */ getOrCreateReviewQueueAnonId),
/* harmony export */   getReviewQueueList: () => (/* binding */ getReviewQueueList),
/* harmony export */   getReviewQueueScopeUserId: () => (/* binding */ getReviewQueueScopeUserId),
/* harmony export */   getReviewQueueStorageKey: () => (/* binding */ getReviewQueueStorageKey),
/* harmony export */   getReviewQueueToolPreferenceKey: () => (/* binding */ getReviewQueueToolPreferenceKey),
/* harmony export */   normalizeReviewQueueEntry: () => (/* binding */ normalizeReviewQueueEntry),
/* harmony export */   normalizeReviewQueueMap: () => (/* binding */ normalizeReviewQueueMap),
/* harmony export */   readReviewQueue: () => (/* binding */ readReviewQueue),
/* harmony export */   readReviewQueueToolPreference: () => (/* binding */ readReviewQueueToolPreference),
/* harmony export */   writeReviewQueue: () => (/* binding */ writeReviewQueue),
/* harmony export */   writeReviewQueueToolPreference: () => (/* binding */ writeReviewQueueToolPreference)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const REVIEW_QUEUE_STORAGE_BASE_KEY = "ic_difficult_review_queue_v1";
const REVIEW_QUEUE_TOOL_PREFERENCE_BASE_KEY = "ic_difficult_review_tool_v1";
const REVIEW_QUEUE_SYNC_EVENT = "ic-review-queue-updated";
const REVIEW_QUEUE_ANON_ID_STORAGE_KEY = "ic_surat_pref_anon_id";
function toPositiveInt(value) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized) || normalized <= 0) {
    return 0;
  }
  return Math.trunc(normalized);
}
function hasWindow() {
  return typeof window !== "undefined";
}
function getReviewQueueScopeUserId(options = {}) {
  return toPositiveInt((options === null || options === void 0 ? void 0 : options.userId) || 0);
}
function getOrCreateReviewQueueAnonId() {
  if (!hasWindow()) return "local";
  try {
    let anonId = localStorage.getItem(REVIEW_QUEUE_ANON_ID_STORAGE_KEY);
    if (!anonId) {
      anonId = `anon-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(REVIEW_QUEUE_ANON_ID_STORAGE_KEY, anonId);
    }
    return String(anonId || "local").trim() || "local";
  } catch (_) {
    return "local";
  }
}
function buildScopedReviewQueueKey(baseKey, options = {}) {
  const cleanBase = String(baseKey || "").trim();
  if (!cleanBase) return "";
  const userId = getReviewQueueScopeUserId(options);
  if (userId) {
    return `${cleanBase}_user_${userId}`;
  }
  return `${cleanBase}_anon_${getOrCreateReviewQueueAnonId()}`;
}
function getReviewQueueStorageKey(options = {}) {
  return buildScopedReviewQueueKey(REVIEW_QUEUE_STORAGE_BASE_KEY, options);
}
function getReviewQueueToolPreferenceKey(options = {}) {
  return buildScopedReviewQueueKey(REVIEW_QUEUE_TOOL_PREFERENCE_BASE_KEY, options);
}
function normalizeReviewQueueEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  const surahNumber = toPositiveInt(entry.surahNumber || entry.surah_number);
  const ayahNumber = toPositiveInt(entry.ayahNumber || entry.ayah_number);
  if (!surahNumber || !ayahNumber) return null;
  const key = `${surahNumber}:${ayahNumber}`;
  return {
    key,
    surahNumber,
    ayahNumber,
    surahEnglishName: String(entry.surahEnglishName || entry.surah_name || "").trim(),
    surahArabicName: String(entry.surahArabicName || "").trim(),
    translation: String(entry.translation || "").replace(/\s+/g, " ").trim(),
    text: String(entry.text || "").replace(/\s+/g, " ").trim(),
    markedAt: Number(entry.markedAt || entry.marked_at || entry.createdAt || 0) || Date.now()
  };
}
function normalizeReviewQueueMap(raw) {
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : Array.isArray(raw) ? raw.reduce((acc, item) => {
    const normalized = normalizeReviewQueueEntry(item);
    if (normalized !== null && normalized !== void 0 && normalized.key) {
      acc[normalized.key] = normalized;
    }
    return acc;
  }, {}) : {};
  const normalizedMap = {};
  Object.entries(source).forEach(([rawKey, value]) => {
    const normalized = normalizeReviewQueueEntry(_objectSpread(_objectSpread({}, value), {}, {
      key: rawKey
    }));
    if (!(normalized !== null && normalized !== void 0 && normalized.key)) return;
    normalizedMap[normalized.key] = normalized;
  });
  return normalizedMap;
}
function readReviewQueue(options = {}) {
  if (!hasWindow()) return {};
  try {
    const key = getReviewQueueStorageKey(options);
    if (!key) return {};
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    return normalizeReviewQueueMap(JSON.parse(raw));
  } catch (_) {
    return {};
  }
}
function writeReviewQueue(queueMap, options = {}) {
  if (!hasWindow()) return false;
  try {
    const key = getReviewQueueStorageKey(options);
    if (!key) return false;
    const payload = JSON.stringify(normalizeReviewQueueMap(queueMap));
    localStorage.setItem(key, payload);
    return true;
  } catch (_) {
    return false;
  }
}
function readReviewQueueToolPreference(options = {}) {
  if (!hasWindow()) return false;
  try {
    const key = getReviewQueueToolPreferenceKey(options);
    if (!key) return false;
    const raw = String(localStorage.getItem(key) || "").trim().toLowerCase();
    return raw === "1" || raw === "true" || raw === "yes";
  } catch (_) {
    return false;
  }
}
function writeReviewQueueToolPreference(enabled, options = {}) {
  if (!hasWindow()) return false;
  try {
    const key = getReviewQueueToolPreferenceKey(options);
    if (!key) return false;
    localStorage.setItem(key, enabled ? "1" : "0");
    return true;
  } catch (_) {
    return false;
  }
}
function dispatchReviewQueueSync(detail = {}) {
  if (!hasWindow()) return;
  try {
    window.dispatchEvent(new CustomEvent(REVIEW_QUEUE_SYNC_EVENT, {
      detail: _objectSpread(_objectSpread({}, detail), {}, {
        timestamp: Date.now()
      })
    }));
  } catch (_) {
    // ignore dispatch errors
  }
}
function getReviewQueueList(queueMap) {
  const normalized = normalizeReviewQueueMap(queueMap);
  return Object.values(normalized).sort((left, right) => Number(right.markedAt || 0) - Number(left.markedAt || 0));
}

/***/ }),

/***/ "./resources/components/vue/ReviewQueueComponent.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/ReviewQueueComponent.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReviewQueueComponent_vue_vue_type_template_id_691386be_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true */ "./resources/components/vue/ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true");
/* harmony import */ var _ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReviewQueueComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/ReviewQueueComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ReviewQueueComponent_vue_vue_type_style_index_0_id_691386be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css */ "./resources/components/vue/ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ReviewQueueComponent_vue_vue_type_template_id_691386be_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-691386be"],['__file',"resources/components/vue/ReviewQueueComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/ReviewQueueComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/ReviewQueueComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ReviewQueueComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_style_index_0_id_691386be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=style&index=0&id=691386be&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_template_id_691386be_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_template_id_691386be_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ReviewQueueComponent.vue?vue&type=template&id=691386be&scoped=true");


/***/ }),

/***/ "./resources/js/components/ReviewQueueComponent.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/ReviewQueueComponent.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewQueueComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ReviewQueueComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/ReviewQueueComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ReviewQueueComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/ReviewQueueComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ReviewQueueComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ReviewQueueComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ReviewQueueComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);