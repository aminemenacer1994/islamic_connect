"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_PinsComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



const PINNED_AYAH_STORAGE_KEY_BASE = "ic_surat_pinned_ayahs";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PinsComponent",
  data() {
    return {
      pins: [],
      userId: null,
      query: "",
      sortBy: "newest",
      surahFilter: "all",
      scopeFilter: "all",
      loading: false,
      error: "",
      busy: {},
      selectedPin: null,
      bookmarkEventHandler: null,
      bookmarkStorageHandler: null
    };
  },
  computed: {
    surahFilterOptions() {
      const set = new Set();
      this.pins.forEach(pin => {
        const name = this.displaySurahName(pin.surah_name);
        if (name) set.add(name);
      });
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    },
    filteredPins() {
      const query = String(this.query || "").trim().toLowerCase();
      let rows = [...this.pins];
      if (this.scopeFilter === "pinned") {
        rows = rows.filter(pin => pin.isPinned);
      } else if (this.scopeFilter === "saved") {
        rows = rows.filter(pin => pin.isSaved);
      }
      if (this.surahFilter !== "all") {
        const selected = this.surahFilter.toLowerCase();
        rows = rows.filter(pin => this.displaySurahName(pin.surah_name).toLowerCase() === selected);
      }
      if (query) {
        rows = rows.filter(pin => {
          const haystack = [pin.referenceLabel, pin.surah_name, pin.ayah_verse_ar, pin.ayah_verse_en, pin.preview].map(value => String(value || "").toLowerCase()).join(" ");
          return haystack.includes(query);
        });
      }
      rows.sort((a, b) => {
        const da = new Date(a.sortDate || 0).getTime();
        const db = new Date(b.sortDate || 0).getTime();
        return this.sortBy === "newest" ? db - da : da - db;
      });
      return rows;
    }
  },
  async mounted() {
    await this.initializeUser();
    this.bookmarkEventHandler = () => this.fetchPins();
    this.bookmarkStorageHandler = event => this.handleStorageUpdate(event);
    window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
    window.addEventListener("storage", this.bookmarkStorageHandler);
  },
  beforeUnmount() {
    if (this.bookmarkEventHandler) {
      window.removeEventListener("bookmarks-updated", this.bookmarkEventHandler);
    }
    if (this.bookmarkStorageHandler) {
      window.removeEventListener("storage", this.bookmarkStorageHandler);
    }
  },
  methods: {
    async initializeUser() {
      try {
        this.userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      } catch (_) {
        this.userId = null;
      }
      await this.fetchPins();
    },
    handleStorageUpdate(event) {
      const scopedKey = this.getPinnedStorageKey();
      if (event.key === "bookmarkRefresh" || scopedKey && event.key === scopedKey) {
        this.fetchPins();
      }
    },
    buildAyahKey(surahNumber, ayahNumber) {
      const surah = Number(surahNumber || 0);
      const ayah = Number(ayahNumber || 0);
      return surah && ayah ? `${surah}:${ayah}` : "";
    },
    getPinnedStorageKey() {
      if (!this.userId) return "";
      return `${PINNED_AYAH_STORAGE_KEY_BASE}_user_${this.userId}`;
    },
    normalizePinnedEntries(raw) {
      if (!raw || typeof raw !== "object") return [];
      const source = Array.isArray(raw) ? raw.reduce((acc, item) => {
        if (!item || typeof item !== "object") return acc;
        const key = this.buildAyahKey(item.surahNumber, item.ayahNumber);
        if (key) acc[key] = item;
        return acc;
      }, {}) : raw;
      return Object.entries(source).map(([rawKey, value]) => {
        if (!value || typeof value !== "object") return null;
        const keyParts = String(rawKey || "").split(":");
        const surahNumber = Number(value.surahNumber || keyParts[0] || 0);
        const ayahNumber = Number(value.ayahNumber || keyParts[1] || 0);
        if (!surahNumber || !ayahNumber) return null;
        const localKey = this.buildAyahKey(surahNumber, ayahNumber);
        const translation = String(value.translation || "").trim();
        const text = String(value.text || "").trim();
        const preview = String(value.preview || translation || text || "").trim();
        const surahName = String(value.surahEnglishName || value.surahName || "").trim();
        return {
          localKey,
          key: localKey,
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: surahName || `Surah ${surahNumber}`,
          ayah_verse_ar: text,
          ayah_verse_en: translation,
          preview: preview || `Surah ${surahNumber}, Ayah ${ayahNumber}`,
          pinned_at: Number(value.pinnedAt || value.createdAt || 0) || null,
          isPinned: true,
          isSaved: false,
          id: null,
          created_at: null
        };
      }).filter(Boolean);
    },
    loadPinnedEntriesFromStorage() {
      if (typeof window === "undefined") return [];
      const scopedKey = this.getPinnedStorageKey();
      if (!scopedKey) return [];
      try {
        const raw = localStorage.getItem(scopedKey);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return this.normalizePinnedEntries(parsed);
      } catch (_) {
        return [];
      }
    },
    normalizeSavedAyahs(rows) {
      return (rows || []).map(row => {
        var _row$ayah, _row$ayah2, _row$ayah3, _row$ayah4;
        const surahNumber = Number((row === null || row === void 0 ? void 0 : row.surah_number) || (row === null || row === void 0 ? void 0 : row.surahNumber) || (row === null || row === void 0 || (_row$ayah = row.ayah) === null || _row$ayah === void 0 ? void 0 : _row$ayah.surah_id) || 0);
        const ayahNumber = Number((row === null || row === void 0 ? void 0 : row.ayah_number) || (row === null || row === void 0 ? void 0 : row.ayah_num) || (row === null || row === void 0 || (_row$ayah2 = row.ayah) === null || _row$ayah2 === void 0 ? void 0 : _row$ayah2.ayah_id) || 0);
        if (!surahNumber || !ayahNumber) return null;
        const key = this.buildAyahKey(surahNumber, ayahNumber);
        return {
          key,
          localKey: key,
          id: (row === null || row === void 0 ? void 0 : row.id) || null,
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: String((row === null || row === void 0 ? void 0 : row.surah_name) || (row === null || row === void 0 ? void 0 : row.surahName) || `Surah ${surahNumber}`),
          ayah_verse_ar: String((row === null || row === void 0 ? void 0 : row.ayah_verse_ar) || (row === null || row === void 0 || (_row$ayah3 = row.ayah) === null || _row$ayah3 === void 0 ? void 0 : _row$ayah3.text) || ""),
          ayah_verse_en: String((row === null || row === void 0 ? void 0 : row.ayah_verse_en) || (row === null || row === void 0 || (_row$ayah4 = row.ayah) === null || _row$ayah4 === void 0 ? void 0 : _row$ayah4.translation) || ""),
          preview: this.pickPreview(row),
          created_at: (row === null || row === void 0 ? void 0 : row.created_at) || (row === null || row === void 0 ? void 0 : row.createdAt) || null,
          pinned_at: null,
          isPinned: false,
          isSaved: true
        };
      }).filter(Boolean);
    },
    mergePinnedAndSaved(pinnedEntries, savedEntries) {
      const merged = new Map();
      savedEntries.forEach(entry => {
        merged.set(entry.key, _objectSpread(_objectSpread({}, entry), {}, {
          referenceLabel: `${entry.surah_number}:${entry.ayah_number} \u2022 ${this.displaySurahName(entry.surah_name)}`,
          sortDate: entry.created_at
        }));
      });
      pinnedEntries.forEach(entry => {
        const existing = merged.get(entry.key);
        if (existing) {
          merged.set(entry.key, _objectSpread(_objectSpread({}, existing), {}, {
            isPinned: true,
            pinned_at: entry.pinned_at,
            preview: entry.preview || existing.preview,
            ayah_verse_ar: entry.ayah_verse_ar || existing.ayah_verse_ar,
            ayah_verse_en: entry.ayah_verse_en || existing.ayah_verse_en,
            surah_name: entry.surah_name || existing.surah_name,
            sortDate: entry.pinned_at || existing.sortDate,
            referenceLabel: `${existing.surah_number}:${existing.ayah_number} \u2022 ${this.displaySurahName(entry.surah_name || existing.surah_name)}`
          }));
          return;
        }
        merged.set(entry.key, _objectSpread(_objectSpread({}, entry), {}, {
          referenceLabel: `${entry.surah_number}:${entry.ayah_number} \u2022 ${this.displaySurahName(entry.surah_name)}`,
          sortDate: entry.pinned_at
        }));
      });
      return Array.from(merged.values());
    },
    async fetchPins() {
      this.loading = true;
      this.error = "";
      try {
        const {
          data
        } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks");
        const savedRows = Array.isArray(data === null || data === void 0 ? void 0 : data.data) ? data.data : Array.isArray(data) ? data : [];
        const savedEntries = this.normalizeSavedAyahs(savedRows);
        const pinnedEntries = this.loadPinnedEntriesFromStorage();
        this.pins = this.mergePinnedAndSaved(pinnedEntries, savedEntries);
        if (!this.pins.some(item => item.isPinned) && this.scopeFilter === "pinned") {
          this.scopeFilter = "all";
        }
      } catch (error) {
        var _error$response;
        this.error = (error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Could not load pins right now.";
        this.pins = this.mergePinnedAndSaved(this.loadPinnedEntriesFromStorage(), []);
      } finally {
        this.loading = false;
      }
    },
    pickPreview(row) {
      var _row$ayah5, _row$ayah6;
      const en = String((row === null || row === void 0 ? void 0 : row.ayah_verse_en) || (row === null || row === void 0 || (_row$ayah5 = row.ayah) === null || _row$ayah5 === void 0 ? void 0 : _row$ayah5.translation) || "").replace(/\s+/g, " ").trim();
      const ar = String((row === null || row === void 0 ? void 0 : row.ayah_verse_ar) || (row === null || row === void 0 || (_row$ayah6 = row.ayah) === null || _row$ayah6 === void 0 ? void 0 : _row$ayah6.text) || "").replace(/\s+/g, " ").trim();
      const source = en || ar;
      return source.length > 220 ? `${source.slice(0, 217).trimEnd()}...` : source;
    },
    stripHtmlTags(text) {
      if (!text) return "";
      const div = document.createElement("div");
      div.innerHTML = text;
      return div.textContent || div.innerText || "";
    },
    displaySurahName(name) {
      const cleaned = String(name || "").replace(/^\s*\d+\s*[-\u2013\u2014]\s*/, "").trim();
      return cleaned || String(name || "Surah");
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return "";
      try {
        const d = new Date(dateTimeString);
        if (!Number.isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        }
      } catch (_) {
        // fallback
      }
      return String(dateTimeString).split("T")[0];
    },
    openInReader(pin) {
      const surah = Number((pin === null || pin === void 0 ? void 0 : pin.surah_number) || 0);
      const ayah = Number((pin === null || pin === void 0 ? void 0 : pin.ayah_number) || 0);
      if (!surah || !ayah) return;
      window.location.href = `/surat?surah=${surah}&ayah=${ayah}`;
    },
    viewModal(pin) {
      this.selectedPin = pin;
      this.$nextTick(() => {
        try {
          var _window$bootstrap;
          const modalEl = document.getElementById("viewPin");
          if (modalEl && (_window$bootstrap = window.bootstrap) !== null && _window$bootstrap !== void 0 && _window$bootstrap.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        } catch (_) {
          // ignore bootstrap modal errors
        }
      });
    },
    composePinText(pin) {
      const surah = this.displaySurahName(pin === null || pin === void 0 ? void 0 : pin.surah_name);
      const ayahNumber = pin !== null && pin !== void 0 && pin.ayah_number ? `Ayah ${pin.ayah_number}` : "";
      const reference = [surah, ayahNumber].filter(Boolean).join(" • ");
      const arabic = this.stripHtmlTags((pin === null || pin === void 0 ? void 0 : pin.ayah_verse_ar) || "");
      const translation = this.stripHtmlTags((pin === null || pin === void 0 ? void 0 : pin.ayah_verse_en) || "");
      const preview = this.stripHtmlTags((pin === null || pin === void 0 ? void 0 : pin.preview) || "");
      return [reference, arabic, translation, preview].filter((part, idx, arr) => part && (idx < 2 || part !== arr[idx - 1])).join("\n\n");
    },
    async copyPinToClipboard(pin) {
      const text = this.composePinText(pin);
      if (!text) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "success",
          title: "Copied to clipboard",
          timer: 1200,
          showConfirmButton: false
        });
      } catch (_) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: "Unable to copy",
          timer: 1200,
          showConfirmButton: false
        });
      }
    },
    sharePinOnWhatsApp(pin) {
      const text = this.composePinText(pin);
      if (!text) return;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    },
    removeActionTitle(pin) {
      if (pin !== null && pin !== void 0 && pin.isPinned) return "Remove pin";
      return "Delete saved ayah";
    },
    isBusy(key) {
      return !!this.busy[key];
    },
    async removePin(pin) {
      if (!pin) return;
      const key = pin.key || `${pin.surah_number}:${pin.ayah_number}`;
      this.busy[key] = true;
      try {
        if (pin.isPinned) {
          await this.removeFromPinnedStorage(pin);
          await this.fetchPins();
          sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
            icon: "success",
            title: "Pin removed",
            timer: 1200,
            showConfirmButton: false
          });
          return;
        }
        if (pin.id) {
          const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
            title: "Delete saved ayah?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b00020",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Delete"
          });
          if (!result.isConfirmed) return;
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${pin.id}`);
          await this.fetchPins();
          sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
            icon: "success",
            title: "Saved ayah deleted",
            timer: 1200,
            showConfirmButton: false
          });
        }
      } catch (error) {
        var _error$response2;
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: (error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || "Unable to remove item",
          timer: 1400,
          showConfirmButton: false
        });
      } finally {
        this.busy[key] = false;
      }
    },
    async removeFromPinnedStorage(pin) {
      if (typeof window === "undefined") return;
      const scopedKey = this.getPinnedStorageKey();
      if (!scopedKey) return;
      const targetKey = String((pin === null || pin === void 0 ? void 0 : pin.localKey) || (pin === null || pin === void 0 ? void 0 : pin.key) || "");
      if (!targetKey) return;
      try {
        const raw = localStorage.getItem(scopedKey);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const next = parsed.filter(item => {
            const surahNumber = Number((item === null || item === void 0 ? void 0 : item.surahNumber) || 0);
            const ayahNumber = Number((item === null || item === void 0 ? void 0 : item.ayahNumber) || 0);
            return this.buildAyahKey(surahNumber, ayahNumber) !== targetKey;
          });
          localStorage.setItem(scopedKey, JSON.stringify(next));
          return;
        }
        if (parsed && typeof parsed === "object") {
          const next = _objectSpread({}, parsed);
          delete next[targetKey];
          localStorage.setItem(scopedKey, JSON.stringify(next));
        }
      } catch (_) {
        // ignore local storage parsing issues
      }
    },
    escapeHtml(value = "") {
      return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },
    escapeRegExp(value = "") {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    highlightMatches(text = "") {
      const escaped = this.escapeHtml(text);
      const query = String(this.query || "").trim();
      if (!query) {
        return escaped;
      }
      const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
      return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PinsComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PinsComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_PinsComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_PinsComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/PinsComponent.vue */ "./resources/components/vue/admin_panels/PinsComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=template&id=36025809&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=template&id=36025809&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "pt-4"
};
const _hoisted_3 = {
  class: "search-toolbar-panel mb-3"
};
const _hoisted_4 = {
  class: "toolbar-row"
};
const _hoisted_5 = {
  class: "admin-search-wrapper"
};
const _hoisted_6 = {
  class: "input-group admin-search"
};
const _hoisted_7 = {
  class: "filters d-flex align-items-center gap-2"
};
const _hoisted_8 = ["value"];
const _hoisted_9 = {
  class: "pb-3 text-center admin-count"
};
const _hoisted_10 = {
  class: "count-pill"
};
const _hoisted_11 = {
  class: "notes-grid-wrapper"
};
const _hoisted_12 = {
  key: 0,
  class: "py-5 text-center text-muted"
};
const _hoisted_13 = {
  key: 1,
  class: "alert alert-warning mb-0"
};
const _hoisted_14 = {
  key: 2,
  class: "py-5 text-center text-muted"
};
const _hoisted_15 = {
  key: 3,
  class: "row"
};
const _hoisted_16 = {
  key: 0,
  class: "col-12 mb-3"
};
const _hoisted_17 = {
  class: "alert alert-warning mb-0"
};
const _hoisted_18 = {
  class: "note-card"
};
const _hoisted_19 = {
  class: "note-chip"
};
const _hoisted_20 = ["innerHTML"];
const _hoisted_21 = {
  class: "note-reference"
};
const _hoisted_22 = {
  key: 0
};
const _hoisted_23 = {
  class: "pin-source ms-auto"
};
const _hoisted_24 = ["innerHTML"];
const _hoisted_25 = {
  class: "note-meta"
};
const _hoisted_26 = {
  class: "date"
};
const _hoisted_27 = {
  class: "note-actions",
  role: "group",
  "aria-label": "Pin actions"
};
const _hoisted_28 = ["onClick"];
const _hoisted_29 = ["onClick"];
const _hoisted_30 = ["onClick"];
const _hoisted_31 = ["onClick"];
const _hoisted_32 = ["disabled", "onClick", "title", "aria-label"];
const _hoisted_33 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_34 = {
  class: "modal fade",
  id: "viewPin",
  tabindex: "-1",
  "aria-labelledby": "viewPinLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_35 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_36 = {
  class: "modal-content"
};
const _hoisted_37 = {
  class: "modal-body"
};
const _hoisted_38 = {
  key: 0,
  class: "container"
};
const _hoisted_39 = {
  class: "mb-3"
};
const _hoisted_40 = {
  class: "mt-2 text-dark text-left mb-1"
};
const _hoisted_41 = {
  class: "text-muted"
};
const _hoisted_42 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_43 = {
  class: "mt-2 text-dark text-end quran-text"
};
const _hoisted_44 = {
  key: 1,
  class: "mb-3"
};
const _hoisted_45 = {
  class: "mt-2 text-dark text-left"
};
const _hoisted_46 = {
  key: 2,
  class: "mb-3"
};
const _hoisted_47 = {
  class: "mt-2 text-dark text-left"
};
const _hoisted_48 = {
  class: "mb-3"
};
const _hoisted_49 = {
  class: "mt-2 text-dark text-left"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search pinned/saved ayat..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.surahFilter = $event),
    class: "form-select"
  }, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All surahs", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.surahFilterOptions, (surah, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: `surah-${surah}-${idx}`,
      value: surah
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah), 9 /* TEXT, PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.surahFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.sortBy = $event),
    class: "form-select"
  }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest first", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest first", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortBy]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.scopeFilter = $event),
    class: "form-select"
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "Pinned + Saved", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pinned"
  }, "Pinned only", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "saved"
  }, "Saved only", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.scopeFilter]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_9, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "count-label"
  }, "Pins", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredPins.length), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "spinner-border spinner-border-sm me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Loading saved ayat and pins... ", -1 /* CACHED */)]))])) : $data.error && !$options.filteredPins.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)) : !$options.filteredPins.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, " No pinned or saved ayat found. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [$data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredPins, pin => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4 mb-4",
      key: pin.key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([pin.isPinned ? 'bi bi-pin-angle-fill' : 'bi bi-bookmark-star-fill', "me-1"])
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pin.isPinned ? "Pinned Ayah" : "Saved Ayah"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-title",
      innerHTML: $options.highlightMatches(pin.referenceLabel)
    }, null, 8 /* PROPS */, _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displaySurahName(pin.surah_name)), 1 /* TEXT */), pin.ayah_number ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_22, " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pin.ayah_number), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pin.isPinned ? "Pinned" : "Saved"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-body",
      innerHTML: $options.highlightMatches(pin.preview)
    }, null, 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calendar3 me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate(pin.sortDate)), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.viewModal(pin),
      title: "View",
      "aria-label": "View pin"
    }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_28), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-success outline",
      onClick: $event => $options.openInReader(pin),
      title: "Open in Reader",
      "aria-label": "Open ayah in reader"
    }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-box-arrow-up-right"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.copyPinToClipboard(pin),
      title: "Copy ayah",
      "aria-label": "Copy ayah"
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_30), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.sharePinOnWhatsApp(pin),
      title: "Share on WhatsApp",
      "aria-label": "Share on WhatsApp"
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-danger outline",
      disabled: $options.isBusy(pin.key),
      onClick: $event => $options.removePin(pin),
      title: $options.removeActionTitle(pin),
      "aria-label": $options.removeActionTitle(pin)
    }, [$options.isBusy(pin.key) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_33)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 1,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(pin.isPinned ? 'bi bi-pin-angle' : 'bi bi-trash')
    }, null, 2 /* CLASS */))], 8 /* PROPS */, _hoisted_32)])])]);
  }), 128 /* KEYED_FRAGMENT */))]))])]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "viewPinLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View Pin")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [$data.selectedPin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Reference:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPin.referenceLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displaySurahName($data.selectedPin.surah_name)) + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPin.ayah_number), 1 /* TEXT */)]), $data.selectedPin.ayah_verse_ar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Arabic:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPin.ayah_verse_ar), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.selectedPin.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Translation:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPin.ayah_verse_en), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.selectedPin.ayah_verse_ar && !$data.selectedPin.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Preview:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPin.preview), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Saved/Pinned Date:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate($data.selectedPin.sortDate)), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer flex-wrap gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/PinsComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PinsComponent.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PinsComponent_vue_vue_type_template_id_36025809_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PinsComponent.vue?vue&type=template&id=36025809&scoped=true */ "./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=template&id=36025809&scoped=true");
/* harmony import */ var _PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PinsComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PinsComponent_vue_vue_type_style_index_0_id_36025809_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css */ "./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PinsComponent_vue_vue_type_template_id_36025809_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-36025809"],['__file',"resources/components/vue/admin_panels/PinsComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PinsComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_style_index_0_id_36025809_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=style&index=0&id=36025809&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=template&id=36025809&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=template&id=36025809&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_template_id_36025809_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_template_id_36025809_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PinsComponent.vue?vue&type=template&id=36025809&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PinsComponent.vue?vue&type=template&id=36025809&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/PinsComponent.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/admin_panels/PinsComponent.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PinsComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/PinsComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/PinsComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/PinsComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/PinsComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PinsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PinsComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PinsComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/utils/bookmarkAuth.js":
/*!********************************************!*\
  !*** ./resources/js/utils/bookmarkAuth.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUserIdFromApi: () => (/* binding */ fetchUserIdFromApi),
/* harmony export */   resolveClientUserId: () => (/* binding */ resolveClientUserId)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

const USER_META_SELECTOR = 'meta[name="user"]';
function parseId(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : normalized;
}
function resolveClientUserId() {
  var _window, _document$body, _document$body2;
  if (typeof window === 'undefined') {
    return null;
  }
  if ((_window = window) !== null && _window !== void 0 && (_window = _window.Laravel) !== null && _window !== void 0 && _window.userId) {
    return parseId(window.Laravel.userId);
  }
  const meta = document.querySelector(USER_META_SELECTOR);
  const metaValue = parseId(meta === null || meta === void 0 ? void 0 : meta.getAttribute('content'));
  if (metaValue) {
    return metaValue;
  }
  const datasetValue = parseId(((_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.dataset) === null || _document$body === void 0 ? void 0 : _document$body.userId) || ((_document$body2 = document.body) === null || _document$body2 === void 0 || (_document$body2 = _document$body2.dataset) === null || _document$body2 === void 0 ? void 0 : _document$body2.user));
  if (datasetValue) {
    return datasetValue;
  }
  return null;
}
async function fetchUserIdFromApi() {
  const localId = resolveClientUserId();
  if (localId) {
    return localId;
  }
  try {
    var _response$data;
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
    const apiValue = parseId((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.userId);
    if (apiValue) {
      return apiValue;
    }
  } catch (error) {
    // swallow; helper should not break callers
  }
  return null;
}

/***/ })

}]);