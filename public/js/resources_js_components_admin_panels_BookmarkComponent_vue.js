"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_BookmarkComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BookmarksApp',
  async mounted() {
    var _window$bootstrap;
    try {
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      console.log("UserId:", userId);
      if (userId) {
        this.userId = userId;
        this.fetchBookmarks(this.userId);
      } else {
        console.error("User ID not found");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
    this.bookmarkEventHandler = event => this.handleBookmarksUpdated(event);
    this.bookmarkStorageHandler = event => this.handleStorageBookmarksUpdated(event);
    this.visibilityHandler = () => this.handleVisibilityChange();
    window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
    window.addEventListener("storage", this.bookmarkStorageHandler);
    window.addEventListener("visibilitychange", this.visibilityHandler);
    // Bootstrap modal cleanup to avoid stuck backdrops
    const modalElement = this.$refs.viewBookmarkModal;
    if (modalElement && (_window$bootstrap = window.bootstrap) !== null && _window$bootstrap !== void 0 && _window$bootstrap.Modal) {
      modalElement.addEventListener('hidden.bs.modal', this.onModalHidden);
    }
  },
  beforeUnmount() {
    const modalElement = this.$refs.viewBookmarkModal;
    if (modalElement) {
      var _window$bootstrap2;
      modalElement.removeEventListener('hidden.bs.modal', this.onModalHidden);
      const instance = (_window$bootstrap2 = window.bootstrap) === null || _window$bootstrap2 === void 0 || (_window$bootstrap2 = _window$bootstrap2.Modal) === null || _window$bootstrap2 === void 0 ? void 0 : _window$bootstrap2.getInstance(modalElement);
      if (instance) instance.dispose();
    }
    if (this.bookmarkEventHandler) window.removeEventListener("bookmarks-updated", this.bookmarkEventHandler);
    if (this.bookmarkStorageHandler) window.removeEventListener("storage", this.bookmarkStorageHandler);
    if (this.visibilityHandler) window.removeEventListener("visibilitychange", this.visibilityHandler);
  },
  data() {
    return {
      loading: false,
      query: '',
      sortBy: 'newest',
      busy: {},
      bookmarks: [],
      userId: null,
      form: {
        id: "",
        ayah_num: "",
        ayah_text: "",
        surah_name: "",
        ayah_verse_ar: "",
        ayah_verse_en: "",
        ayah_notes: "",
        created_at: ""
      },
      maxLength: 70,
      bookmarkInstanceId: `admin-${Math.random().toString(36).slice(2)}`,
      bookmarkEventHandler: null,
      bookmarkStorageHandler: null,
      visibilityHandler: null
    };
  },
  methods: {
    redirectToBookmark(url) {
      window.location.href = url;
    },
    clearSearch() {
      this.query = '';
    },
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    },
    getBookmarkSurahLabel(bookmark) {
      if (!bookmark) return 'Surah';
      if (bookmark.surah_name) return `Surah ${this.stripHtmlTags(bookmark.surah_name)}`;
      if (bookmark.surah_number) return `Surah ${bookmark.surah_number}`;
      if (bookmark.surah_id) return `Surah ${bookmark.surah_id}`;
      return 'Surah';
    },
    getBookmarkAyahNumber(bookmark) {
      return (bookmark === null || bookmark === void 0 ? void 0 : bookmark.ayah_num) || (bookmark === null || bookmark === void 0 ? void 0 : bookmark.ayah_number) || (bookmark === null || bookmark === void 0 ? void 0 : bookmark.ayah_id) || '';
    },
    buildBookmarkMessage(bookmark) {
      if (!bookmark) return '';
      const surahLabel = this.getBookmarkSurahLabel(bookmark);
      const ayahNumber = this.getBookmarkAyahNumber(bookmark);
      const header = ayahNumber ? `${surahLabel} (Ayah ${ayahNumber})` : surahLabel;
      const arabic = this.stripHtmlTags(bookmark.ayah_verse_ar || '');
      const translation = this.stripHtmlTags(bookmark.ayah_verse_en || '');
      const lines = [header];
      if (arabic) lines.push(`Arabic: ${arabic}`);
      if (translation) lines.push(`Translation: ${translation}`);
      return lines.join('\n\n');
    },
    async copyText(text) {
      var _navigator$clipboard;
      if (!text) return false;
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && (_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (_) {
          // fall back
        }
      }
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      } catch (_) {
        return false;
      }
    },
    async copyBookmark(bookmark) {
      const message = this.buildBookmarkMessage(bookmark);
      if (!message) return;
      const ok = await this.copyText(message);
      if (ok) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: 'top-end',
          icon: 'success',
          title: 'Copied',
          timer: 1200,
          showConfirmButton: false
        });
      } else {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'error',
          title: 'Copy failed',
          timer: 1400,
          showConfirmButton: false
        });
      }
    },
    shareBookmarkOnWhatsApp(bookmark) {
      const message = this.buildBookmarkMessage(bookmark);
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      return dateTimeString.split('T')[0];
    },
    async fetchBookmarks(userId) {
      try {
        var _res$data$data, _res$data;
        this.loading = true;
        const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/api/fetch-bookmarks/${userId}`);
        // support either array or { data: [...] }
        const payload = Array.isArray(res.data) ? res.data : (_res$data$data = (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data) !== null && _res$data$data !== void 0 ? _res$data$data : [];
        this.bookmarks = payload;
        console.log('Loaded bookmarks:', this.bookmarks.length);
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      } finally {
        this.loading = false;
      }
    },
    truncatedText(text) {
      if (!text) return '';
      const clean = this.stripHtmlTags(text);
      return clean.length > this.maxLength ? clean.substring(0, this.maxLength) + '...' : clean;
    },
    escapeHtml(text) {
      return (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    parseQuery(query) {
      const tokens = [];
      if (!query) return tokens;
      const regex = /(-)?(?:(\w+):)?(?:"([^"]+)"|(\S+))/g;
      let match;
      while ((match = regex.exec(query)) !== null) {
        const exclude = !!match[1];
        const field = match[2] ? match[2].toLowerCase() : null;
        const term = (match[3] || match[4] || '').trim();
        if (!term) continue;
        tokens.push({
          exclude,
          field,
          term
        });
      }
      return tokens;
    },
    mapFieldAlias(field) {
      const key = (field || '').toLowerCase();
      if (!key) return [];
      if (['surah', 's'].includes(key)) return ['surah'];
      if (['ayah', 'a', 'num', 'number'].includes(key)) return ['ayah'];
      if (['ar', 'arabic'].includes(key)) return ['arabic'];
      if (['en', 'english'].includes(key)) return ['english'];
      if (['text', 'verse'].includes(key)) return ['arabic', 'english'];
      if (['date', 'created'].includes(key)) return ['date'];
      return [];
    },
    getFieldValue(bookmark, fieldKey) {
      var _bookmark$ayah;
      switch (fieldKey) {
        case 'surah':
          return bookmark.surah_name || '';
        case 'ayah':
          return ((_bookmark$ayah = bookmark.ayah) === null || _bookmark$ayah === void 0 ? void 0 : _bookmark$ayah.ayah_id) || bookmark.ayah_num || '';
        case 'arabic':
          return bookmark.ayah_verse_ar || '';
        case 'english':
          return bookmark.ayah_verse_en || '';
        case 'date':
          return this.extractDate(bookmark.created_at) || '';
        default:
          return '';
      }
    },
    tokenMatchesBookmark(bookmark, token, fieldKeys) {
      const term = token.term.toLowerCase();
      let fields = token.field ? this.mapFieldAlias(token.field) : fieldKeys;
      if (!fields.length) {
        fields = fieldKeys;
      }
      if (!fields.length) return false;
      return fields.some(fieldKey => {
        const value = this.stripHtmlTags(this.getFieldValue(bookmark, fieldKey)).toLowerCase();
        return value.includes(term);
      });
    },
    matchesBookmark(bookmark, tokens, fieldKeys) {
      if (!tokens.length) return true;
      for (const token of tokens) {
        const matched = this.tokenMatchesBookmark(bookmark, token, fieldKeys);
        if (token.exclude) {
          if (matched) return false;
        } else {
          if (!matched) return false;
        }
      }
      return true;
    },
    highlightText(text, fieldKey) {
      const clean = this.stripHtmlTags(text || '');
      const safe = this.escapeHtml(clean);
      const terms = this.highlightMap[fieldKey] || [];
      if (!terms.length) return safe;
      return terms.reduce((acc, term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        return acc.replace(regex, '<mark class="search-hit">$1</mark>');
      }, safe);
    },
    formatMeta(bookmark) {
      var _bookmark$ayah2;
      const surah = this.highlightText(bookmark.surah_name || '', 'surah');
      const ayahNum = ((_bookmark$ayah2 = bookmark.ayah) === null || _bookmark$ayah2 === void 0 ? void 0 : _bookmark$ayah2.ayah_id) || bookmark.ayah_num || '';
      const ayah = this.highlightText(String(ayahNum), 'ayah');
      return `${surah} • Ayah ${ayah}`;
    },
    primaryTextField(bookmark) {
      return bookmark.ayah_verse_en ? 'english' : 'arabic';
    },
    viewModal(bookmark) {
      var _window$bootstrap3;
      this.form = bookmark;
      const el = this.$refs.viewBookmarkModal || document.getElementById('viewBookmark');
      const instance = (_window$bootstrap3 = window.bootstrap) !== null && _window$bootstrap3 !== void 0 && (_window$bootstrap3 = _window$bootstrap3.Modal) !== null && _window$bootstrap3 !== void 0 && _window$bootstrap3.getOrCreateInstance ? window.bootstrap.Modal.getOrCreateInstance(el, {
        backdrop: true
      }) : new bootstrap.Modal(el, {
        backdrop: true
      });
      instance.show();
    },
    async deleteBookmark(id) {
      const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Delete bookmark?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete"
      });
      if (!result.isConfirmed) return;
      try {
        this.$set ? this.$set(this.busy, id, true) : this.busy[id] = true;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/delete-bookmarks/${id}`);
        await this.fetchBookmarks(this.userId);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bookmark deleted',
          timer: 1200,
          showConfirmButton: false
        });
        this.notifyBookmarkChange();
      } catch (e) {
        console.error('Delete error:', e);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'error',
          title: 'Delete failed',
          timer: 1400,
          showConfirmButton: false
        });
      } finally {
        this.busy[id] = false;
      }
    },
    notifyBookmarkChange(source = this.bookmarkInstanceId) {
      const token = `${Date.now()}-${source}`;
      try {
        localStorage.setItem('bookmarkRefresh', token);
      } catch (_) {
        // ignore
      }
      window.dispatchEvent(new CustomEvent('bookmarks-updated', {
        detail: {
          token,
          instance: source
        }
      }));
    },
    handleBookmarksUpdated(event) {
      var _event$detail;
      if ((event === null || event === void 0 || (_event$detail = event.detail) === null || _event$detail === void 0 ? void 0 : _event$detail.instance) === this.bookmarkInstanceId) return;
      this.refreshAfterExternalUpdate();
    },
    handleStorageBookmarksUpdated(event) {
      if (event.key !== 'bookmarkRefresh') return;
      this.refreshAfterExternalUpdate();
    },
    handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        this.refreshAfterExternalUpdate();
      }
    },
    refreshAfterExternalUpdate() {
      if (!this.userId) return;
      this.fetchBookmarks(this.userId);
    },
    closeModal() {
      var _window$bootstrap4;
      const el = this.$refs.viewBookmarkModal || document.getElementById('viewBookmark');
      const instance = ((_window$bootstrap4 = window.bootstrap) === null || _window$bootstrap4 === void 0 || (_window$bootstrap4 = _window$bootstrap4.Modal) === null || _window$bootstrap4 === void 0 ? void 0 : _window$bootstrap4.getInstance(el)) || (window.bootstrap ? null : bootstrap.Modal.getInstance(el));
      if (instance) instance.hide();
      // Fallback cleanup in case instance isn't available
      this.cleanupBackdrops();
    },
    onModalHidden() {
      this.cleanupBackdrops();
    },
    cleanupBackdrops() {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    },
    isBusy(id) {
      return !!this.busy[id];
    }
  },
  computed: {
    parsedQuery() {
      return this.parseQuery(this.query);
    },
    activeFieldKeys() {
      return ['surah', 'ayah', 'arabic', 'english'];
    },
    bootstrapColors() {
      return ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark'];
    },
    addedTodayCount() {
      const today = new Date().toISOString().split('T')[0];
      return this.bookmarks.filter(bm => bm.created_at && bm.created_at.startsWith(today)).length;
    },
    lastSavedSurah() {
      if (!this.bookmarks.length) return 'N/A';
      const sorted = [...this.bookmarks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return sorted[0].surah_name || 'N/A';
    },
    highlightMap() {
      const map = {
        surah: [],
        ayah: [],
        arabic: [],
        english: [],
        date: []
      };
      const tokens = this.parsedQuery.filter(token => !token.exclude);
      tokens.forEach(token => {
        let targets = token.field ? this.mapFieldAlias(token.field) : this.activeFieldKeys;
        if (!targets.length) {
          targets = this.activeFieldKeys;
        }
        targets.forEach(fieldKey => {
          if (!map[fieldKey]) return;
          map[fieldKey].push(token.term);
        });
      });
      Object.keys(map).forEach(key => {
        const unique = Array.from(new Set(map[key].filter(Boolean)));
        map[key] = unique.sort((a, b) => b.length - a.length);
      });
      return map;
    },
    filteredBookmarks() {
      const tokens = this.parsedQuery;
      const fieldKeys = this.activeFieldKeys;
      const list = (this.bookmarks || []).filter(bm => this.matchesBookmark(bm, tokens, fieldKeys));
      return list.sort((a, b) => {
        const da = new Date(a.created_at || 0).getTime();
        const db = new Date(b.created_at || 0).getTime();
        return this.sortBy === 'newest' ? db - da : da - db;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_BookmarkComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_BookmarkComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/BookmarkComponent.vue */ "./resources/components/vue/admin_panels/BookmarkComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "admin-page"
};
const _hoisted_2 = {
  class: "dashboard-header pt-4"
};
const _hoisted_3 = {
  class: "row g-4 mb-4"
};
const _hoisted_4 = {
  class: "col-md-4"
};
const _hoisted_5 = {
  class: "stat-card"
};
const _hoisted_6 = {
  class: "stat-info"
};
const _hoisted_7 = {
  class: "stat-value"
};
const _hoisted_8 = {
  class: "col-md-4"
};
const _hoisted_9 = {
  class: "stat-card"
};
const _hoisted_10 = {
  class: "stat-info"
};
const _hoisted_11 = {
  class: "stat-value"
};
const _hoisted_12 = {
  class: "col-md-4"
};
const _hoisted_13 = {
  class: "stat-card"
};
const _hoisted_14 = {
  class: "stat-info"
};
const _hoisted_15 = {
  class: "stat-value text-truncate",
  style: {
    "font-size": "1rem",
    "max-width": "150px"
  }
};
const _hoisted_16 = {
  class: "control-bar mb-4"
};
const _hoisted_17 = {
  class: "row align-items-center g-3"
};
const _hoisted_18 = {
  class: "col-lg-6"
};
const _hoisted_19 = {
  class: "input-group search-group"
};
const _hoisted_20 = {
  class: "col-lg-6"
};
const _hoisted_21 = {
  class: "d-flex justify-content-lg-end gap-3"
};
const _hoisted_22 = {
  class: "sort-group d-flex align-items-center gap-2"
};
const _hoisted_23 = {
  class: "view-status d-flex align-items-center gap-2"
};
const _hoisted_24 = {
  class: "badge bg-soft-dark shadow-none px-3 py-2"
};
const _hoisted_25 = {
  class: "row g-4 mb-5"
};
const _hoisted_26 = {
  class: "note-card"
};
const _hoisted_27 = {
  class: "note-header"
};
const _hoisted_28 = {
  class: "note-date"
};
const _hoisted_29 = {
  class: "note-body"
};
const _hoisted_30 = ["innerHTML"];
const _hoisted_31 = ["innerHTML"];
const _hoisted_32 = {
  class: "note-footer"
};
const _hoisted_33 = {
  class: "action-group"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = ["onClick"];
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["onClick", "disabled", "title"];
const _hoisted_38 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_39 = {
  key: 1,
  class: "bi bi-trash"
};
const _hoisted_40 = {
  key: 0,
  class: "empty-state text-center py-5"
};
const _hoisted_41 = {
  class: "modal fade",
  id: "viewBookmark",
  ref: "viewBookmarkModal",
  tabindex: "-1",
  "aria-labelledby": "viewBookmarkLabel",
  "aria-hidden": "true"
};
const _hoisted_42 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_43 = {
  class: "modal-content"
};
const _hoisted_44 = {
  class: "modal-body p-4"
};
const _hoisted_45 = {
  class: "detail-grid"
};
const _hoisted_46 = {
  class: "detail-item full-width"
};
const _hoisted_47 = {
  class: "quran-text text-end"
};
const _hoisted_48 = {
  class: "detail-item full-width"
};
const _hoisted_49 = {
  class: "detail-item"
};
const _hoisted_50 = {
  class: "fw-bold"
};
const _hoisted_51 = {
  class: "detail-item"
};
const _hoisted_52 = {
  class: "fw-bold"
};
const _hoisted_53 = {
  class: "detail-item"
};
const _hoisted_54 = {
  class: "modal-footer border-0"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium Dashboard Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Total Bookmarks Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-primary-soft"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmarks-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "stat-label"
  }, "Total Bookmarks", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.bookmarks.length), 1 /* TEXT */)]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-trend positive"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-up-short"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 12% ")], -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" New Today Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-success-soft"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-calendar-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "stat-label"
  }, "Added Today", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.addedTodayCount), 1 /* TEXT */)]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-trend"
  }, "Fresh", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Latest Activity "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-warning-soft"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clock-history"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "stat-label"
  }, "Last Saved", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.lastSavedSurah), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Control Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search by surah name, ayah, or content..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]]), $data.query ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn btn-clear",
    type: "button",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.clearSearch && $options.clearSearch(...args))
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted small fw-semibold"
  }, "Sort:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.sortBy = $event),
    class: "form-select sort-select shadow-none"
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest First", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest First", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortBy]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-funnel me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredBookmarks.length) + " results ", 1 /* TEXT */)])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Grid cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Skeleton Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(6, i => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "col-md-4",
      key: 'skel-' + i
    }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"note-card skeleton-card\" data-v-0102735e><div class=\"skeleton-chip\" data-v-0102735e></div><div class=\"skeleton-line full\" data-v-0102735e></div><div class=\"skeleton-line half\" data-v-0102735e></div><div class=\"skeleton-meta mt-4\" data-v-0102735e></div></div>", 1)]))]);
  }), 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results Grid "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredBookmarks, bm => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4",
      key: bm.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-chip glass-chip"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-bookmark-star-fill me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Ayah Reference ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calendar3 me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate(bm.created_at)), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ayah-meta mb-2",
      innerHTML: $options.formatMeta(bm)
    }, null, 8 /* PROPS */, _hoisted_30), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "ayah-preview",
      innerHTML: $options.highlightText($options.truncatedText(bm.ayah_verse_en || bm.ayah_verse_ar), $options.primaryTextField(bm))
    }, null, 8 /* PROPS */, _hoisted_31)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-premium-action",
      onClick: $event => $options.viewModal(bm),
      title: "View Details"
    }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-premium-action",
      onClick: $event => $options.copyBookmark(bm),
      title: "Copy Verses"
    }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_35), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-premium-action",
      onClick: $event => $options.shareBookmarkOnWhatsApp(bm),
      title: "Share"
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_36)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-delete-ghost",
      onClick: $event => $options.deleteBookmark(bm.id),
      disabled: $options.isBusy(bm.id),
      title: $options.isBusy(bm.id) ? 'Deleting…' : 'Delete'
    }, [$options.isBusy(bm.id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_38)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_39))], 8 /* PROPS */, _hoisted_37)])])]);
  }), 128 /* KEYED_FRAGMENT */))], 64 /* STABLE_FRAGMENT */))]), !$data.loading && $options.filteredBookmarks.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3"
  }, "No bookmarks found", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Try adjusting your filters or search terms.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View Bookmark Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "viewBookmarkLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Bookmark Details")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Arabic Verse", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.ayah_verse_ar), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "English Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.ayah_verse_en), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Surah Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.surah_name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Ayah Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.ayah_num), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Date Saved", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate($data.form.created_at)), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-light px-4",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.closeModal && $options.closeModal(...args)),
    "data-bs-dismiss": "modal"
  }, "Close")])])])], 512 /* NEED_PATCH */)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/BookmarkComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/BookmarkComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkComponent_vue_vue_type_template_id_0102735e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true */ "./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true");
/* harmony import */ var _BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _BookmarkComponent_vue_vue_type_style_index_0_id_0102735e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css */ "./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookmarkComponent_vue_vue_type_template_id_0102735e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0102735e"],['__file',"resources/components/vue/admin_panels/BookmarkComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_style_index_0_id_0102735e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=style&index=0&id=0102735e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_template_id_0102735e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_template_id_0102735e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/BookmarkComponent.vue?vue&type=template&id=0102735e&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/BookmarkComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin_panels/BookmarkComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/BookmarkComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/BookmarkComponent.vue?vue&type=script&lang=js");
 

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