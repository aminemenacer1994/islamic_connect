"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_BooksComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _islamic_terms_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./islamic_terms.json */ "./resources/js/components/islamic_terms.json");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      terms: Array.isArray(_islamic_terms_json__WEBPACK_IMPORTED_MODULE_0__ === null || _islamic_terms_json__WEBPACK_IMPORTED_MODULE_0__ === void 0 ? void 0 : _islamic_terms_json__WEBPACK_IMPORTED_MODULE_0__.terms) ? _islamic_terms_json__WEBPACK_IMPORTED_MODULE_0__.terms : [],
      indexedTerms: [],
      searchQuery: '',
      selectedSubject: '',
      sortBy: 'relevance',
      showAdvancedSearch: false,
      showSuggestions: false,
      highlightedIndex: -1,
      suggestions: [],
      favorites: [],
      currentPage: 1,
      itemsPerLoad: 12,
      loadedCount: 0,
      isLoading: false,
      observer: null,
      termFontSizes: {},
      baseFontSize: 1,
      minFontSize: 0.8,
      maxFontSize: 2.0,
      isSpeechSupported: false,
      isSpeechSynthesisSupported: false,
      isListening: false,
      voiceSearchActive: false,
      skipToContentId: 'mainContent',
      quickFilters: [],
      nextStepMinimized: false
    };
  },
  computed: {
    filteredTerms() {
      const q = this.searchQuery.trim().toLowerCase();
      const subjectFilter = this.selectedSubject && this.selectedSubject !== 'all' ? this.selectedSubject : null;
      const seen = new Set();
      // Filter using prebuilt lowercase index, then map back to original term objects.
      let filtered = this.terms.filter((term, idx) => {
        if (!term) return false;
        if (subjectFilter && term.subject !== subjectFilter) return false;
        if (!q) {
          // Deduplicate by term text even when no query
          const _key = (term.term || '').toLowerCase();
          if (seen.has(_key)) return false;
          seen.add(_key);
          return true;
        }
        const it = this.indexedTerms[idx];
        if (!it) return false;
        const match = it.termL && it.termL.includes(q) || it.meaningL && it.meaningL.includes(q) || it.phraseL && it.phraseL.includes(q) || it.referenceL && it.referenceL.includes(q);
        if (!match) return false;
        const key = it.termL || '';
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Sort on a cloned array to avoid mutating reactive source
      const out = filtered.slice();
      if (this.sortBy === 'term') {
        out.sort((a, b) => a.term.localeCompare(b.term));
      } else if (this.sortBy === 'term-desc') {
        out.sort((a, b) => b.term.localeCompare(a.term));
      } else if (this.sortBy === 'subject') {
        out.sort((a, b) => a.subject.localeCompare(b.subject));
      } else if (this.sortBy === 'recent') {
        out.sort((a, b) => new Date(b.lastViewed || 0) - new Date(a.lastViewed || 0));
      } else if (this.sortBy === 'favorites') {
        const favs = new Set(this.favorites);
        out.sort((a, b) => {
          const aFav = favs.has(a.id);
          const bFav = favs.has(b.id);
          if (aFav && !bFav) return -1;
          if (!aFav && bFav) return 1;
          return 0;
        });
      }
      return out;
    },
    filteredSuggestions() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return [];
      const seen = new Set();
      const results = [];
      for (let i = 0; i < this.terms.length && results.length < 5; i++) {
        const term = this.terms[i];
        const it = this.indexedTerms[i];
        if (!term || !it) continue;
        if (it.termL && it.termL.includes(q) || it.meaningL && it.meaningL.includes(q) || it.referenceL && it.referenceL.includes(q)) {
          const key = it.termL || '';
          if (!seen.has(key)) {
            seen.add(key);
            results.push(term);
          }
        }
      }
      return results;
    },
    displayedTerms() {
      // Infinite scroll: filteredTerms already deduped
      return this.filteredTerms.slice(0, this.loadedCount || this.itemsPerLoad);
    },
    totalTerms() {
      return this.filteredTerms.length;
    },
    hasMore() {
      return this.loadedCount < this.totalTerms;
    },
    subjects() {
      const validSubjects = this.terms.filter(t => t && typeof t.subject === 'string' && t.subject.trim() !== '').map(t => t.subject);
      return ['all', ...Array.from(new Set(validSubjects))];
    }
  },
  watch: {
    searchQuery: {
      handler: debounce(function (val) {
        this.showSuggestions = !!val && val.length >= 2 && this.filteredSuggestions.length > 0;
        this.highlightedIndex = -1;
        this.currentPage = 1;
        this.resetInfiniteScroll();
      }, 250),
      immediate: false
    },
    selectedSubject() {
      this.currentPage = 1;
      this.resetInfiniteScroll();
    },
    sortBy() {
      this.currentPage = 1;
      this.resetInfiniteScroll();
    }
  },
  mounted() {
    this.initialize();
    this.loadFavorites();
    this.loadRecentTerms();
    this.isSpeechSupported = 'SpeechRecognition' in window;
    this.isSpeechSynthesisSupported = 'SpeechSynthesisUtterance' in window;
    this.buildIndex();
    if (this.subjects.length > 1) {
      this.quickFilters = this.subjects.map(s => ({
        key: s,
        label: typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : s
      }));
    } else {
      console.warn('No valid subjects found for quickFilters');
      this.quickFilters = [];
    }
    // Initialize infinite scroll
    this.loadedCount = this.itemsPerLoad;
    this.$nextTick(() => {
      this.setupInfiniteScroll();
    });
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    buildIndex() {
      // Build a lowercase index aligned with this.terms for fast matching
      this.indexedTerms = (this.terms || []).map(t => {
        if (!t) return null;
        return {
          id: t.id,
          termL: (t.term || '').toLowerCase(),
          phraseL: (t.phrase || '').toLowerCase(),
          meaningL: (t.meaning || '').toLowerCase(),
          referenceL: (t.reference || '').toLowerCase()
        };
      });
    },
    loadSuggestions() {
      this.suggestions = this.terms.slice(0, 5);
      this.updateSuggestions();
    },
    shareViaWhatsApp(term) {
      const text = encodeURIComponent(`Word: "${term.term}\n\n` + `Phrase: "${term.phrase}"\n` + `Meaning: ${term.meaning}\n` + `Example: ${term.example}\n` + `Reference: ${term.reference}`);
      const whatsappUrl = `https://wa.me/?text=${text}`;
      window.open(whatsappUrl, '_blank');
    },
    adjustFontSize(termId, change) {
      const currentSize = this.termFontSizes[termId] || 1;
      const newSize = currentSize + change * 0.1;
      const bounded = Math.max(this.minFontSize, Math.min(this.maxFontSize, newSize));
      // Clone to keep Vue 3 reactivity happy when adding new keys
      this.termFontSizes = _objectSpread(_objectSpread({}, this.termFontSizes), {}, {
        [termId]: Number(bounded.toFixed(2))
      });
    },
    initialize() {
      this.baseFontSize = parseFloat(localStorage.getItem('fontSize') || '1');
      this.loadFavorites();
      this.loadRecentTerms();
      this.loadSuggestions();
    },
    showToast(message, type = 'success') {
      let toastContainer = document.getElementById('toastContainer');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = 1090;
        document.body.appendChild(toastContainer);
      }
      const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
      const toastEl = document.createElement('div');
      toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
      toastEl.setAttribute('role', 'alert');
      toastEl.setAttribute('aria-live', 'assertive');
      toastEl.setAttribute('aria-atomic', 'true');
      toastEl.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
            ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        `;
      toastContainer.appendChild(toastEl);
      const toast = new bootstrap.Toast(toastEl, {
        delay: 3000
      });
      toast.show();
      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
    },
    performSearch() {
      this.currentPage = 1;
      this.resetInfiniteScroll();
      this.loadSuggestions();
    },
    // Debounce helper removed: use the top-level debounce already used in watchers
    clearSearch() {
      this.searchQuery = '';
      this.selectedSubject = '';
      this.showAdvancedSearch = false;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.resetInfiniteScroll();
      this.performSearch();
    },
    toggleAdvancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
    },
    applyQuickFilter(filterKey) {
      this.selectedSubject = filterKey;
      this.showAdvancedSearch = false;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.performSearch();
    },
    setupInfiniteScroll() {
      const sentinel = this.$refs.infiniteScrollSentinel;
      if (!sentinel || typeof IntersectionObserver === 'undefined') return;
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && this.hasMore && !this.isLoading) {
          this.isLoading = true;
          const remaining = this.totalTerms - this.loadedCount;
          const toAdd = Math.min(this.itemsPerLoad, remaining);
          if (toAdd > 0) this.loadedCount += toAdd;
          this.isLoading = false;
        }
      }, {
        root: null,
        rootMargin: '0px 0px 200px 0px',
        threshold: 0
      });
      this.observer.observe(sentinel);
    },
    teardownInfiniteScroll() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
    resetInfiniteScroll() {
      this.loadedCount = Math.min(this.itemsPerLoad, this.totalTerms || this.itemsPerLoad);
      this.isLoading = false;
      this.$nextTick(() => {
        this.setupInfiniteScroll();
      });
    },
    getMatchType(term) {
      if (term.matchType === 'exact') return 'Exact match';
      if (term.matchType === 'partial') return 'Partial match';
      if (term.matchType === 'wildcard') return 'Wildcard match';
      return 'No match';
    },
    navigateSuggestions(direction) {
      if (this.suggestions.length === 0) return;
      this.highlightedIndex = (this.highlightedIndex + direction + this.suggestions.length) % this.suggestions.length;
    },
    selectSuggestion(index) {
      if (this.filteredSuggestions.length === 0) return;
      const suggestion = this.filteredSuggestions[index];
      this.searchQuery = suggestion.term;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.performSearch();
    },
    delayHideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
        this.highlightedIndex = -1;
      }, 100);
    },
    handleCardClick(termId) {
      const term = this.terms.find(t => t && t.id === termId);
      if (term) {
        this.handleTermClick(term);
      }
    },
    handleTermClick(term) {
      this.searchQuery = term.term;
      this.selectedSubject = term.subject;
      this.showAdvancedSearch = false;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.performSearch();
    },
    toggleFavorite(termId) {
      const idx = this.favorites.indexOf(termId);
      if (idx === -1) {
        this.favorites.push(termId);
      } else {
        this.favorites.splice(idx, 1);
      }
      this.saveFavorites();
      this.$forceUpdate();
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    loadFavorites() {
      const favs = localStorage.getItem('favorites');
      this.favorites = favs ? JSON.parse(favs) : [];
    },
    loadRecentTerms() {
      const recentTerms = JSON.parse(localStorage.getItem('recentTerms') || '[]');
      this.terms.forEach(term => {
        if (term && recentTerms.includes(term.id)) {
          term.lastViewed = new Date().toISOString();
        }
      });
    },
    speakTerm(term) {
      if (!this.isSpeechSynthesisSupported) return;
      const utterance = new SpeechSynthesisUtterance(term.meaning);
      utterance.lang = 'ar-SA';
      utterance.pitch = 1;
      utterance.rate = 0.9;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    },
    copyToClipboard(term) {
      const textToCopy = `Word: ${term.term}\n\nMeaning: ${term.meaning}\nExample: ${term.example}\nReference: ${term.reference}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast('Term copied to clipboard!');
      }).catch(() => {
        this.showToast('Failed to copy term to clipboard.', 'danger');
      });
    },
    exportToCSV() {
      const csvContent = this.filteredTerms.map(term => [term.term, term.subject, term.meaning, term.example, term.reference, term.phrase, term.id].map(field => `"${field || ''}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'islamic_dictionary.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    exportToJSON() {
      const jsonContent = JSON.stringify(this.filteredTerms, null, 2);
      const blob = new Blob([jsonContent], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'islamic_dictionary.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    skipToContent() {
      document.getElementById(this.skipToContentId).focus();
    },
    toggleVoiceSearch() {
      if (this.voiceSearchActive) {
        this.stopVoiceSearch();
      } else {
        this.startVoiceSearch();
      }
    },
    startVoiceSearch() {
      if (!this.isSpeechSupported) return;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        this.searchQuery = transcript;
        this.currentPage = 1;
        this.performSearch();
        this.isListening = false;
        this.voiceSearchActive = false;
      };
      recognition.onerror = event => {
        this.isListening = false;
        this.voiceSearchActive = false;
        this.showToast('Voice search error: ' + event.error, 'danger');
      };
      recognition.onend = () => {
        this.isListening = false;
        this.voiceSearchActive = false;
      };
      recognition.start();
      this.isListening = true;
      this.voiceSearchActive = true;
    },
    stopVoiceSearch() {
      if (this.voiceSearchActive) {
        this.isListening = false;
        this.voiceSearchActive = false;
        if (window.SpeechRecognition) {
          window.SpeechRecognition.stop();
        }
      }
    },
    updateSuggestions() {
      this.showSuggestions = this.searchQuery.length >= 2 && this.filteredSuggestions.length > 0;
    }
  },
  beforeDestroy() {
    if (this.debouncedSearch && typeof this.debouncedSearch.cancel === 'function') {
      this.debouncedSearch.cancel();
    }
    this.teardownInfiniteScroll();
    this.stopVoiceSearch();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "py-4 border-bottom mb-4 px-2 px-md-4"
};
const _hoisted_2 = {
  class: "container-fluid px-3 px-md-4"
};
const _hoisted_3 = {
  class: "row justify-content-center mx-0"
};
const _hoisted_4 = {
  class: "col-12 col-lg-10 col-xl-8 px-0"
};
const _hoisted_5 = {
  class: "container",
  style: {
    "padding": "10px"
  }
};
const _hoisted_6 = {
  class: "mx-auto mb-4 elevated-card premium-radius next-step"
};
const _hoisted_7 = ["title", "aria-label"];
const _hoisted_8 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_9 = {
  style: {
    "flex": "1"
  }
};
const _hoisted_10 = {
  class: "mb-2 d-inline-flex align-items-center gap-1 text-body"
};
const _hoisted_11 = {
  class: "mb-3 next-step-text text-body"
};
const _hoisted_12 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_13 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_14 = {
  class: "d-flex flex-wrap align-items-center gap-3 px-1",
  "aria-live": "polite"
};
const _hoisted_15 = {
  class: "chip"
};
const _hoisted_16 = {
  key: 0,
  class: "chip"
};
const _hoisted_17 = {
  class: "mb-3"
};
const _hoisted_18 = {
  class: "row g-2 align-items-center flex-nowrap"
};
const _hoisted_19 = {
  class: "col-12 col-md-12"
};
const _hoisted_20 = {
  class: "input-group shadow-sm search-shell premium-radius",
  style: {
    "--spacing": "0.5rem"
  }
};
const _hoisted_21 = {
  class: "input-group-text bg-white border-0 pe-3 ps-2 d-flex align-items-center"
};
const _hoisted_22 = {
  key: 0,
  class: "input-group-text bg-white border-0 px-2"
};
const _hoisted_23 = ["aria-activedescendant"];
const _hoisted_24 = {
  class: "list-group list-group-flush"
};
const _hoisted_25 = ["onMousedown", "onMouseover", "id", "aria-selected"];
const _hoisted_26 = {
  class: "d-flex flex-column"
};
const _hoisted_27 = {
  class: "fw-bold"
};
const _hoisted_28 = {
  class: "text-muted"
};
const _hoisted_29 = {
  class: "d-flex flex-column align-items-end"
};
const _hoisted_30 = {
  class: "chip chip--sm"
};
const _hoisted_31 = {
  class: "text-muted"
};
const _hoisted_32 = ["id"];
const _hoisted_33 = {
  class: "row justify-content-center"
};
const _hoisted_34 = {
  class: "col-12 col-lg-10 col-xl-8"
};
const _hoisted_35 = {
  key: 0
};
const _hoisted_36 = ["aria-busy"];
const _hoisted_37 = ["onClick", "aria-labelledby", "onKeydown"];
const _hoisted_38 = {
  class: "card-body d-flex flex-column p-4 gap-2"
};
const _hoisted_39 = {
  class: "chip chip--sm mb-3"
};
const _hoisted_40 = ["id"];
const _hoisted_41 = {
  class: "card-text mb-3 text-brand-ink"
};
const _hoisted_42 = {
  class: "mb-3"
};
const _hoisted_43 = {
  class: "mb-0"
};
const _hoisted_44 = {
  class: "mb-3"
};
const _hoisted_45 = {
  class: "mb-0"
};
const _hoisted_46 = {
  class: "mb-3"
};
const _hoisted_47 = {
  class: "mb-0"
};
const _hoisted_48 = {
  style: {
    "display": "flex",
    "gap": "12px",
    "justify-content": "center",
    "background": "#f0fdfa",
    "border-radius": "16px",
    "box-shadow": "0 4px 20px rgba(13,148,136,0.12)",
    "overflow-x": "auto",
    "-webkit-overflow-scrolling": "touch"
  }
};
const _hoisted_49 = ["onClick"];
const _hoisted_50 = ["onClick", "disabled"];
const _hoisted_51 = ["onClick", "disabled"];
const _hoisted_52 = ["onClick"];
const _hoisted_53 = {
  key: 1,
  class: "d-flex justify-content-center my-3"
};
const _hoisted_54 = {
  key: 2,
  class: "text-center text-muted my-3",
  "aria-live": "polite"
};
const _hoisted_55 = {
  ref: "infiniteScrollSentinel",
  "aria-hidden": "true",
  style: {
    "height": "1px"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$options$filteredTer;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "min-vh-100 bg-light p-0 m-0 premium-root",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${$data.baseFontSize}rem`
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Accessibility: Skip to main content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#mainContent",
    class: "visually-hidden-focusable position-absolute top-0 start-50 translate-middle-x bg-primary text-white text-decoration-none rounded p-2 opacity-0",
    style: {
      "z-index": "1000"
    },
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.skipToContent && $options.skipToContent(...args), ["prevent"]))
  }, "Skip to main content"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center fw-bold display-5 display-md-4"
  }, "Islamic Dictionary", -1 /* CACHED */)), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-dark mb-4",
    style: {
      "font-size": "18px"
    }
  }, " A comprehensive resource for exploring Islamic terms and their meanings ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: $data.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": $data.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    class: "next-step-toggle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_7), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle",
    role: "img",
    "aria-label": "Calm Islamic finance guide"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-scale-balanced",
    "aria-hidden": "true"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/finance",
    class: "fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 link-accent",
    "aria-label": "Open the Islamic finance guide"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Move from definitions to Islamic finance "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square small opacity-75",
    "aria-hidden": "true"
  })], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Want to turn today’s definitions into calmer, halal money choices? The Islamic Finance guide pairs larger text and gentle explanations so new Muslims can explore in English with confidence. ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/finance",
    class: "fw-semibold text-decoration-none link-accent"
  }, " Visit Islamic Finance ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" whenever you feel ready. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/finance",
    class: "btn btn-sm fw-semibold px-3 py-2 d-inline-flex align-items-center cta-primary"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Explore Islamic Finance"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-coins ms-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Open the accessible Islamic finance guide for new Muslims")], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Stats "), $data.searchQuery || $data.selectedSubject ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    class: "me-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    "stroke-width": "1.5"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M20 20l-4-4",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_$options$filteredTer = $options.filteredTerms) === null || _$options$filteredTer === void 0 ? void 0 : _$options$filteredTer.length) || 0) + " results ", 1 /* TEXT */)]), $data.selectedSubject ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_16, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    class: "me-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 10l8-6l8 6v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8z",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linejoin": "round"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedSubject), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary btn-sm rounded-pill px-3 py-2",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearSearch && $options.clearSearch(...args)),
    title: "Clear all filters",
    "aria-label": "Clear all filters"
  }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    class: "me-1",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    "stroke-width": "1.5"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M9 9l6 6M15 9l-6 6",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear ", -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Cleaned Up Search Controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "searchQuery",
    type: "text",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.searchQuery = $event),
    class: "form-control border-0 ps-4 pe-0 py-3",
    placeholder: "Search terms, meanings, references...",
    "aria-label": "Search Islamic Dictionary",
    "aria-controls": 'results-region',
    onInput: _cache[4] || (_cache[4] = (...args) => $options.updateSuggestions && $options.updateSuggestions(...args)),
    onFocus: _cache[5] || (_cache[5] = (...args) => $options.updateSuggestions && $options.updateSuggestions(...args)),
    onBlur: _cache[6] || (_cache[6] = (...args) => $options.delayHideSuggestions && $options.delayHideSuggestions(...args)),
    onKeydown: [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.navigateSuggestions(1), ["prevent"]), ["down"])), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.navigateSuggestions(-1), ["prevent"]), ["up"])), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.selectSuggestion($data.highlightedIndex), ["prevent"]), ["enter"])), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $data.showSuggestions = false, ["escape"]))],
    autocomplete: "off",
    spellcheck: "false",
    style: {
      "box-shadow": "none"
    }
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-search fs-5",
    style: {
      "color": "var(--brand)",
      "transition": "color 0.2s"
    },
    onMouseover: _cache[11] || (_cache[11] = $event => {
      this.style.color = 'var(--brand-hover)';
    }),
    onMouseout: _cache[12] || (_cache[12] = $event => {
      this.style.color = 'var(--brand)';
    })
  }, null, 32 /* NEED_HYDRATION */)]), $data.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-link p-0",
    style: {
      "color": "var(--brand)",
      "transition": "color 0.2s"
    },
    onClick: _cache[13] || (_cache[13] = (...args) => $options.clearSearch && $options.clearSearch(...args)),
    "aria-label": "Clear search",
    title: "Clear search",
    onMouseover: _cache[14] || (_cache[14] = $event => {
      this.style.color = 'var(--brand-hover)';
    }),
    onMouseout: _cache[15] || (_cache[15] = $event => {
      this.style.color = 'var(--brand)';
    })
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times fs-5"
  }, null, -1 /* CACHED */)]))], 32 /* NEED_HYDRATION */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Suggestions Dropdown "), $data.showSuggestions && $options.filteredSuggestions.length && $data.searchQuery.length >= 2 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "position-absolute w-100 shadow-lg rounded-bottom premium-radius bg-white border mt-1",
    role: "listbox",
    "aria-activedescendant": $data.highlightedIndex >= 0 ? 'suggestion-' + $data.highlightedIndex : null,
    style: {
      "z-index": "1050",
      "max-height": "40vh",
      "overflow-y": "auto",
      "border-top": "none"
    }
  }, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"p-2 border-bottom bg-light\" data-v-6de819c4><small class=\"text-muted d-inline-flex align-items-center gap-1\" data-v-6de819c4><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" class=\"me-1\" data-v-6de819c4><path d=\"M8 14a4 4 0 1 1 8 0c0 2-2 3-2 4v1H10v-1c0-1-2-2-2-4z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\" data-v-6de819c4></path><path d=\"M11 20h2\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" data-v-6de819c4></path></svg> Search tips: Use quotes for exact phrases, + for required words </small></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredSuggestions, (suggestion, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: index,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 px-3 py-2", {
        'active': index === $data.highlightedIndex
      }]),
      onMousedown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.selectSuggestion(index), ["prevent"]),
      onMouseover: $event => $data.highlightedIndex = index,
      id: 'suggestion-' + index,
      role: "option",
      "aria-selected": index === $data.highlightedIndex ? 'true' : 'false'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.term), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.meaning.substring(0, 60)) + "...", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.subject), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getMatchType(suggestion)), 1 /* TEXT */)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_25);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"p-2 border-top bg-light\" data-v-6de819c4><small class=\"text-muted d-inline-flex align-items-center gap-2\" data-v-6de819c4><span class=\"d-inline-flex align-items-center gap-1\" data-v-6de819c4><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" data-v-6de819c4><path d=\"M12 6l6 6H6l6-6Z\" fill=\"currentColor\" data-v-6de819c4></path></svg><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" data-v-6de819c4><path d=\"M12 18l-6-6h12l-6 6Z\" fill=\"currentColor\" data-v-6de819c4></path></svg></span> Navigate • Enter to select • Esc to clear </small></div>", 1))], 8 /* PROPS */, _hoisted_23)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Advanced Search Panel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <transition name=\"fade\">\n                <div v-if=\"showAdvancedSearch\" class=\"mt-3 p-3 bg-light rounded border\">\n                  <h6 class=\"fw-bold mb-3\">\n                    <i class=\"bi bi-gear me-1\"></i>Advanced Search Options\n                  </h6>\n                  <div class=\"row g-3\">\n                    <div class=\"col-12 col-md-6\">\n                      <label class=\"form-label\">Search Syntax</label>\n                      <div class=\"small\">\n                        <div class=\"mb-2\">\n                          <code class=\"bg-light px-2 py-1 rounded\">\"exact phrase\"</code> - Exact match\n                        </div>\n                        <div class=\"mb-2\">\n                          <code class=\"bg-light px-2 py-1 rounded\">+required</code> - Must include\n                        </div>\n                        <div class=\"mb-2\">\n                          <code class=\"bg-light px-2 py-1 rounded\">-excluded</code> - Must not include\n                        </div>\n                        <div class=\"mb-2\">\n                          <code class=\"bg-light px-2 py-1 rounded\">term*</code> - Wildcard search\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"col-12 col-md-6\">\n                      <label class=\"form-label\">Quick Filters</label>\n                      <div class=\"d-flex flex-wrap gap-2\">\n                        <button\n                          v-for=\"filter in quickFilters\"\n                          :key=\"filter.key\"\n                          class=\"btn btn-sm btn-outline-secondary px-3 py-2\"\n                          @click=\"applyQuickFilter(filter.key)\"\n                        >\n                          {{ filter.label }}\n                        </button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </transition> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation toggles "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"d-flex justify-content-center mt-4 mb-3\">\n              <div class=\"nav nav-pills gap-2\">\n                <button class=\"nav-link px-4 py-2\" :class=\"{ 'active': currentPage === 1 }\" @click=\"currentPage = 1\"\n                  title=\"Show all terms\" aria-label=\"Show all terms\"\n                  :style=\"currentPage === 1 ? 'background-color: #00bfa6; color: #fff;' : 'color: #00bfa6; border: 1px solid #00bfa6;'\">\n                  <i class=\"bi bi-book me-2\"></i>All Terms\n                </button>\n                <button class=\"nav-link px-4 py-2\" :class=\"{ 'active': currentPage === 'favorites' }\"\n                  @click=\"currentPage = 'favorites'\" title=\"Show favorites\" aria-label=\"Show favorites\"\n                  :style=\"currentPage === 'favorites' ? 'background-color: #00bfa6; color: #fff;' : 'color: #00bfa6; border: 1px solid #00bfa6;'\">\n                  <i class=\"bi bi-heart-fill me-2\"></i>Favorites\n                </button>\n                <button class=\"nav-link px-4 py-2\" \n                   :class=\"{ 'active': currentPage === 'recent' }\" \n                   @click=\"currentPage = 'recent'\" \n                   title=\"Show recently viewed\" \n                   aria-label=\"Show recently viewed\"\n                   :style=\"currentPage === 'recent' ? 'background-color: #00bfa6; color: #fff;' : 'color: #00bfa6; border: 1px solid #00bfa6;'\">\n                  <i class=\"bi bi-clock-history me-2\"></i>Recent\n                </button>\n              </div>\n            </div> ")])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", {
    class: "container-fluid py-4 px-3 px-md-4",
    id: $data.skipToContentId,
    tabindex: "-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), $options.displayedTerms.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search-heart display-1",
    style: {
      "color": "#00796b",
      "opacity": "0.75"
    }
  })], -1 /* CACHED */)), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-3 fs-4 text-dark"
  }, "No terms found", -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-4 fs-5"
  }, "Try adjusting your search criteria or browse all terms", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-lg rounded-pill px-4 py-3 mb-2 btn-accent",
    onClick: _cache[16] || (_cache[16] = (...args) => $options.clearSearch && $options.clearSearch(...args))
  }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-counterclockwise me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Reset Search ", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Terms grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4",
    role: "region",
    id: "results-region",
    "aria-label": "Dictionary results",
    "aria-busy": $data.isLoading ? 'true' : 'false'
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.displayedTerms, term => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: term.id,
      class: "col mb-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card card-teal h-100 shadow-sm border-3 border shadow-md elevated-card premium-radius fade-in-up", {
        'border-primary border-3': $data.favorites.includes(term.id)
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${$data.termFontSizes[term.id]}rem`
      }),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.handleCardClick(term.id), ["self"]),
      tabindex: "0",
      role: "article",
      "aria-labelledby": 'term-title-' + term.id,
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $options.handleCardClick(term.id), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.handleCardClick(term.id), ["prevent"]), ["space"])]
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.subject), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "card-title fw-bold mb-3 fs-4 text-brand",
      id: 'term-title-' + term.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.term), 9 /* TEXT, PROPS */, _hoisted_40), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "\"" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.phrase) + "\"", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "fw-bold mb-2 text-brand"
    }, "Meaning", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.meaning), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "fw-bold mb-2 text-brand"
    }, "Example", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.example), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "fw-bold mb-2 text-brand"
    }, "Reference", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "premium-radius-bottom",
      onClick: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" WhatsApp "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.shareViaWhatsApp(term),
      style: {
        "all": "unset",
        "cursor": "pointer",
        "display": "flex",
        "flex-direction": "column",
        "align-items": "center",
        "gap": "4px",
        "min-width": "58px",
        "padding": "8px 6px",
        "border-radius": "12px",
        "color": "#0d9488",
        "font-size": "11px",
        "font-weight": "600",
        "transition": "background .2s, transform .2s"
      },
      onmouseover: "this.style.background='rgba(13,148,136,0.15)'; this.style.transform='scale(1.08)'",
      onmouseout: "this.style.background=''; this.style.transform=''"
    }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp",
      style: {
        "font-size": "21px"
      }
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_49), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Smaller "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.adjustFontSize(term.id, -1),
      disabled: $data.termFontSizes[term.id] <= $data.minFontSize,
      style: {
        "all": "unset",
        "cursor": "pointer",
        "display": "flex",
        "flex-direction": "column",
        "align-items": "center",
        "gap": "4px",
        "min-width": "58px",
        "padding": "8px 6px",
        "border-radius": "12px",
        "color": "#0d9488",
        "font-size": "11px",
        "font-weight": "600",
        "opacity": "v-bind(termFontSizes[term.id]<=minFontSize?'0.3':'1')",
        "transition": "all .2s"
      },
      onmouseover: "if(!this.disabled)this.style.background='rgba(13,148,136,0.15)'; if(!this.disabled)this.style.transform='scale(1.08)'",
      onmouseout: "if(!this.disabled)this.style.background=''; if(!this.disabled)this.style.transform=''"
    }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      style: {
        "font-size": "20px"
      }
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" A- ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_50), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Larger "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.adjustFontSize(term.id, 1),
      disabled: $data.termFontSizes[term.id] >= $data.maxFontSize,
      style: {
        "all": "unset",
        "cursor": "pointer",
        "display": "flex",
        "flex-direction": "column",
        "align-items": "center",
        "gap": "4px",
        "min-width": "58px",
        "padding": "8px 6px",
        "border-radius": "12px",
        "color": "#0d9488",
        "font-size": "11px",
        "font-weight": "600",
        "opacity": "v-bind(termFontSizes[term.id]>=maxFontSize?'0.3':'1')",
        "transition": "all .2s"
      },
      onmouseover: "if(!this.disabled)this.style.background='rgba(13,148,136,0.15)'; if(!this.disabled)this.style.transform='scale(1.08)'",
      onmouseout: "if(!this.disabled)this.style.background=''; if(!this.disabled)this.style.transform=''"
    }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      style: {
        "font-size": "23px"
      }
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" A+ ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_51), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Copy "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.copyToClipboard(term),
      style: {
        "all": "unset",
        "cursor": "pointer",
        "display": "flex",
        "flex-direction": "column",
        "align-items": "center",
        "gap": "4px",
        "min-width": "58px",
        "padding": "8px 6px",
        "border-radius": "12px",
        "color": "#0d9488",
        "font-size": "11px",
        "font-weight": "600",
        "transition": "background .2s, transform .2s"
      },
      onmouseover: "this.style.background='rgba(13,148,136,0.15)'; this.style.transform='scale(1.08)'",
      onmouseout: "this.style.background=''; this.style.transform=''"
    }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      style: {
        "font-size": "20px"
      }
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_52)])])], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_37)]);
  }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_36), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Infinite Scroll Sentinel and Indicators "), $data.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [...(_cache[42] || (_cache[42] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status",
    "aria-live": "polite",
    "aria-label": "Loading more"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.isLoading && !$options.hasMore && $options.totalTerms > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, " No more results ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, null, 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Back to Top Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button v-if=\"displayedTerms.length > 0\" class=\"btn btn-lg rounded-circle position-fixed shadow-lg\"\n            @click=\"scrollToTop\" title=\"Back to top\" aria-label=\"Back to top\"\n            style=\"background-color: #00bfa6; color: #fff; bottom: 30px; right: 30px; z-index: 100; width: 60px; height: 60px;\">\n            <i class=\"bi bi-arrow-up fs-5\"></i>\n          </button> ")])])], 8 /* PROPS */, _hoisted_32)], 4 /* STYLE */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card-teal[data-v-6de819c4] {\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 166, 0.22);\n  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);\n  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card-teal[data-v-6de819c4]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 18px 40px rgba(2, 44, 34, 0.12);\n}\n.premium-root[data-v-6de819c4] {\n  --radius: 20px;\n  --radius-sm: 12px;\n  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.06);\n  --shadow-md: 0 10px 24px rgba(0, 0, 0, 0.08);\n  --brand: #0b806f;\n  --brand-ink: #1a5f7a;\n  --brand-accent: #00bfa6;\n  --brand-hover: #00a68f;\n  --brand-soft: #e0fff8;\n}\n.text-brand[data-v-6de819c4] {\n  color: var(--brand) !important;\n}\n.text-brand-ink[data-v-6de819c4] {\n  color: var(--brand-ink) !important;\n}\n.premium-radius[data-v-6de819c4] {\n  border-radius: var(--radius) !important;\n}\n.premium-radius-bottom[data-v-6de819c4] {\n  border-bottom-left-radius: var(--radius) !important;\n  border-bottom-right-radius: var(--radius) !important;\n}\n.elevated-card[data-v-6de819c4] {\n  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;\n  border-radius: var(--radius) !important;\n  box-shadow: var(--shadow-sm);\n  border: 2px solid #d1e0e7;\n}\n.elevated-card[data-v-6de819c4]:hover,\n.elevated-card[data-v-6de819c4]:focus-within {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-md);\n}\n@keyframes fadeInUp-6de819c4 {\nfrom {\n    opacity: 0;\n    transform: translateY(8px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.fade-in-up[data-v-6de819c4] {\n  animation: fadeInUp-6de819c4 320ms ease both;\n}\n.action-row[data-v-6de819c4] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n  align-items: center;\n}\n.action-btn[data-v-6de819c4] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  padding: 10px 8px;\n  border: 1px solid rgba(11, 128, 111, 0.15);\n  background: #ffffff;\n  color: #1f2933;\n  border-radius: var(--radius-sm);\n  transition: background-color 160ms ease, box-shadow 200ms ease, transform 160ms ease, color 160ms ease, border-color 160ms ease;\n}\n.action-btn .label[data-v-6de819c4] {\n  font-size: 0.8rem;\n  line-height: 1;\n}\n.action-btn .icon[data-v-6de819c4] {\n  display: block;\n  color: var(--brand);\n  transition: color 160ms ease, transform 160ms ease;\n}\n.action-btn[data-v-6de819c4]:hover {\n  background: linear-gradient(180deg, #ffffff, #f7fbfa);\n  box-shadow: 0 6px 16px rgba(26, 95, 122, 0.12);\n  transform: translateY(-1px);\n  border-color: rgba(11, 128, 111, 0.25);\n}\n.action-btn:hover i[data-v-6de819c4] {\n  color: var(--brand-ink);\n}\n.action-btn:hover .icon[data-v-6de819c4] {\n  color: var(--brand-ink);\n}\n.action-btn[data-v-6de819c4]:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(11, 128, 111, 0.18), 0 6px 16px rgba(26, 95, 122, 0.12);\n}\n.action-btn[data-v-6de819c4]:active {\n  transform: translateY(0);\n}\n.action-btn[data-v-6de819c4]:disabled,\n.action-btn[disabled][data-v-6de819c4] {\n  cursor: not-allowed;\n  opacity: 0.55;\n  box-shadow: none;\n  transform: none;\n}\n@media (max-width: 480px) {\n.action-row[data-v-6de819c4] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n}\n.input-group[data-v-6de819c4] {\n  border-radius: 0.5rem;\n  overflow: hidden;\n}\n.input-group-text[data-v-6de819c4] {\n  transition: background-color 0.2s;\n}\n.input-group-text[data-v-6de819c4]:hover {\n  background-color: #f8f9fa;\n}\n.input-group .bi-search[data-v-6de819c4],\n.input-group .bi-x-lg[data-v-6de819c4] {\n  cursor: pointer;\n}\n.skip-link[data-v-6de819c4]:focus {\n  top: 20px !important;\n  opacity: 1 !important;\n}\n.search-shell[data-v-6de819c4] {\n  border: 1px solid rgba(11, 128, 111, 0.15);\n  background: #fff;\n  box-shadow: var(--shadow-sm);\n}\n.search-shell[data-v-6de819c4]:focus-within {\n  box-shadow: 0 0 0 3px rgba(11, 128, 111, 0.18), var(--shadow-sm);\n  border-color: rgba(11, 128, 111, 0.25);\n}\n.next-step[data-v-6de819c4] {\n  position: relative;\n  background: #eaf3f1;\n  border: 1px solid rgba(11, 128, 111, 0.20);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.03), 0 10px 28px rgba(26, 95, 122, 0.09);\n  padding: 1.25rem 1.75rem;\n}\n.next-step-toggle[data-v-6de819c4] {\n  position: absolute;\n  right: 44px;\n  top: 14px;\n  opacity: 0.9;\n  background: transparent;\n  border: 0;\n  color: #6b8b91;\n  z-index: 3;\n  cursor: pointer;\n}\n.next-step-icon-circle[data-v-6de819c4] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: linear-gradient(145deg, rgba(11, 128, 111, 0.22), rgba(26, 95, 122, 0.14));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #0b806f;\n  font-size: 1.25rem;\n  box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.22), 0 6px 16px rgba(26, 95, 122, 0.12);\n}\n.next-step-eyebrow[data-v-6de819c4] {\n  letter-spacing: 0.1em;\n  color: #1a5f7a;\n  font-size: 0.78rem;\n}\n.next-step-text[data-v-6de819c4] {\n  line-height: 1.7;\n  font-size: 1.02rem;\n}\n.link-accent[data-v-6de819c4] {\n  color: #0b806f;\n}\n.link-accent[data-v-6de819c4]:hover {\n  color: #0a7565;\n}\n.cta-primary[data-v-6de819c4] {\n  color: #fff !important;\n  background: linear-gradient(135deg, #0b806f, #1a5f7a);\n  border: none;\n  border-radius: 999px;\n  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.22);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.cta-primary[data-v-6de819c4]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 14px 26px rgba(26, 95, 122, 0.26);\n}\n.cta-primary[data-v-6de819c4]:active {\n  transform: translateY(0);\n  box-shadow: 0 8px 16px rgba(26, 95, 122, 0.20);\n}\n.chip[data-v-6de819c4] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  border-radius: var(--radius);\n  background: linear-gradient(180deg, #f7fbfa, #ffffff);\n  color: var(--brand);\n  border: 1px solid rgba(11, 128, 111, 0.20);\n  box-shadow: 0 1px 3px rgba(26, 95, 122, 0.08) inset;\n  font-size: 1rem;\n}\n.chip--sm[data-v-6de819c4] {\n  padding: 0.2rem 0.6rem;\n  font-size: 0.9rem;\n}\n.chip[data-v-6de819c4]:hover {\n  box-shadow: 0 0 0 3px rgba(11, 128, 111, 0.10);\n}\n.empty-state-icon[data-v-6de819c4] {\n  color: var(--brand);\n  opacity: 0.85;\n}\n.btn-accent[data-v-6de819c4] {\n  background-color: var(--brand-accent);\n  color: #fff;\n}\n.btn-accent[data-v-6de819c4]:hover {\n  background-color: var(--brand-hover);\n  color: #fff;\n}\n.btn-accent[data-v-6de819c4]:active {\n  filter: brightness(0.95);\n}\n@media (prefers-reduced-motion: reduce) {\n.elevated-card[data-v-6de819c4],\n  .fade-in-up[data-v-6de819c4],\n  .action-btn[data-v-6de819c4] {\n    transition: none !important;\n}\n.fade-in-up[data-v-6de819c4] {\n    animation: none !important;\n}\n}\n@keyframes pulse-6de819c4 {\n0% {\n    transform: scale(1);\n}\n50% {\n    transform: scale(1.1);\n}\n100% {\n    transform: scale(1);\n}\n}\n.pulse[data-v-6de819c4] {\n  animation: pulse-6de819c4 1.5s infinite;\n}\n.list-group-item.active[data-v-6de819c4],\n.list-group-item[data-v-6de819c4]:active {\n  background-color: #0b5d4b !important;\n  color: #fff !important;\n  border-color: #094c3f !important;\n}\n@media (max-width: 768px) {\n.nav-pills .nav-link[data-v-6de819c4] {\n    padding: 0.5rem 0.75rem;\n    font-size: 0.9rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_style_index_0_id_6de819c4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_style_index_0_id_6de819c4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_style_index_0_id_6de819c4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/BooksComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/BooksComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BooksComponent_vue_vue_type_template_id_6de819c4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true */ "./resources/js/components/BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true");
/* harmony import */ var _BooksComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BooksComponent.vue?vue&type=script&lang=js */ "./resources/js/components/BooksComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _BooksComponent_vue_vue_type_style_index_0_id_6de819c4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css */ "./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BooksComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BooksComponent_vue_vue_type_template_id_6de819c4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-6de819c4"],['__file',"resources/js/components/BooksComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/BooksComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/BooksComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BooksComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_style_index_0_id_6de819c4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=style&index=0&id=6de819c4&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_template_id_6de819c4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BooksComponent_vue_vue_type_template_id_6de819c4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BooksComponent.vue?vue&type=template&id=6de819c4&scoped=true");


/***/ }),

/***/ "./resources/js/components/islamic_terms.json":
/*!****************************************************!*\
  !*** ./resources/js/components/islamic_terms.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"terms":[{"id":401,"term":"Adl","phrase":"Justice","meaning":"The concept of fairness and justice in all actions, a key principle in Islam.","example":"He ensured Adl in distributing the charity funds.","reference":"Qur\'an 4:135"},{"id":402,"term":"Ihsan","phrase":"Excellence","meaning":"Performing actions with sincerity and perfection, as if seeing Allah.","example":"She practiced Ihsan by praying with full devotion.","reference":"Hadith: Sahih Muslim 1.1"},{"id":403,"term":"Taqwah","phrase":"God-Consciousness","meaning":"Being mindful of Allah in all actions to avoid sin and seek His pleasure.","example":"His Taqwah kept him from dishonest dealings.","reference":"Qur\'an 2:197"},{"id":404,"term":"Jihad","phrase":"Striving","meaning":"The effort to uphold Islam, including internal struggle against sin or external defense of faith.","example":"She practiced Jihad by resisting temptation.","reference":"Qur\'an 29:6"},{"id":405,"term":"Jihad an-Nafs","phrase":"Struggle of the Self","meaning":"The internal struggle to purify one\'s soul and resist sinful desires.","example":"His Jihad an-Nafs involved controlling his anger.","reference":"Qur\'an 29:69"},{"id":406,"term":"Mujahid","phrase":"One Who Strives","meaning":"A person who engages in Jihad, striving in the path of Allah.","example":"The Mujahid dedicated his life to serving Islam.","reference":"Qur\'an 4:95"},{"id":407,"term":"Riba","phrase":"Usury","meaning":"The prohibition of interest-based transactions in Islamic law.","example":"He avoided Riba by choosing an Islamic bank.","reference":"Qur\'an 2:275"},{"id":408,"term":"Gharar","phrase":"Uncertainty","meaning":"Prohibited excessive risk or ambiguity in contracts, such as speculative transactions.","example":"The contract was void due to Gharar in its terms.","reference":"Hadith: Sahih Muslim 10.1513"},{"id":409,"term":"Mudarabah","phrase":"Profit-Sharing Partnership","meaning":"An Islamic financial contract where one party provides capital and another provides expertise, sharing profits.","example":"They entered a Mudarabah agreement for their business.","reference":"Qur\'an 4:12"},{"id":410,"term":"Musharakah","phrase":"Joint Partnership","meaning":"A partnership where all parties contribute capital and share profits and losses.","example":"The Musharakah venture funded a community project.","reference":"Qur\'an 4:12"},{"id":411,"term":"Murabahah","phrase":"Cost-Plus Financing","meaning":"A sale where the seller discloses the cost and adds a fixed profit margin.","example":"The bank offered a Murabahah contract for the car purchase.","reference":"Qur\'an 2:282"},{"id":412,"term":"Ijarah","phrase":"Leasing","meaning":"An Islamic financial contract for leasing assets or services.","example":"She signed an Ijarah agreement to rent the property.","reference":"Qur\'an 28:26"},{"id":413,"term":"Wadiah","phrase":"Safekeeping","meaning":"A contract where one party entrusts property to another for safekeeping.","example":"The bank offered Wadiah services for her valuables.","reference":"Qur\'an 2:283"},{"id":414,"term":"Hibah","phrase":"Gift","meaning":"A voluntary transfer of property or wealth without expecting anything in return.","example":"He gave a Hibah of land to the mosque.","reference":"Qur\'an 4:4"},{"id":415,"term":"Qard Hasan","phrase":"Benevolent Loan","meaning":"An interest-free loan given for charity or assistance, repayable without profit.","example":"She offered a Qard Hasan to help her struggling neighbor.","reference":"Qur\'an 2:245"},{"id":416,"term":"Zakat al-Mal","phrase":"Wealth Tax","meaning":"The obligatory charity tax on accumulated wealth, paid annually by eligible Muslims.","example":"He calculated Zakat al-Mal based on his savings.","reference":"Qur\'an 9:60"},{"id":417,"term":"Tijarah","phrase":"Trade","meaning":"Commercial transactions conducted in accordance with Islamic principles.","example":"His Tijarah business adhered to Shari\'ah guidelines.","reference":"Qur\'an 2:282"},{"id":418,"term":"Bay al-Salam","phrase":"Forward Sale","meaning":"A contract where payment is made upfront for goods delivered later.","example":"The farmer agreed to a Bay al-Salam for his crops.","reference":"Hadith: Sahih al-Bukhari 3.35.441"},{"id":419,"term":"Bay al-Istisna","phrase":"Manufacturing Contract","meaning":"A contract for the manufacture and delivery of custom-made goods.","example":"The artisan signed a Bay al-Istisna for custom furniture.","reference":"Qur\'an 2:282"},{"id":420,"term":"Sukuk","phrase":"Islamic Bonds","meaning":"Financial certificates compliant with Shari\'ah, representing ownership in an asset.","example":"The company issued Sukuk to raise funds for expansion.","reference":"Qur\'an 2:282"},{"id":421,"term":"Takaful","phrase":"Islamic Insurance","meaning":"A cooperative system of mutual insurance based on shared responsibility.","example":"She joined a Takaful plan for her family\'s health coverage.","reference":"Qur\'an 5:2"},{"id":422,"term":"Haram","phrase":"Forbidden","meaning":"Actions or items explicitly prohibited in Islam, such as consuming pork.","example":"He avoided Haram foods to maintain his faith.","reference":"Qur\'an 2:173"},{"id":427,"term":"Fard","phrase":"Mandatory","meaning":"Actions that are obligatory for Muslims, such as the five daily prayers.","example":"Fasting during Ramadan is a Fard obligation.","reference":"Qur\'an 2:183"},{"id":429,"term":"Bid\'ah","phrase":"Innovation","meaning":"Innovations in religion that lack evidence from the Qur\'an or Sunnah, often discouraged.","example":"Some scholars warned against Bid\'ah in worship practices.","reference":"Hadith: Sahih Muslim 4.867"},{"id":430,"term":"Fitnah","phrase":"Trial or Temptation","meaning":"A test or tribulation that challenges one\'s faith or morality.","example":"He prayed for protection from the Fitnah of wealth.","reference":"Qur\'an 8:28"},{"id":431,"term":"Dunya","phrase":"Worldly Life","meaning":"The temporary, material world, often contrasted with the Hereafter.","example":"She prioritized the Akhirah over the Dunya.","reference":"Qur\'an 57:20"},{"id":432,"term":"Akhirah","phrase":"Hereafter","meaning":"The eternal life after death, including Judgment Day and Paradise or Hell.","example":"He worked for the Akhirah by performing good deeds.","reference":"Qur\'an 2:201"},{"id":435,"term":"Sirat","phrase":"The Bridge","meaning":"The narrow bridge over Hell that all must cross on Judgment Day.","example":"Muslims pray to cross the Sirat safely.","reference":"Hadith: Sahih Muslim 1.183"},{"id":436,"term":"Mizan","phrase":"The Balance","meaning":"The scale used to weigh deeds on the Day of Judgment.","example":"Her good deeds tipped the Mizan in her favor.","reference":"Qur\'an 21:47"},{"id":437,"term":"Hawd","phrase":"The Basin","meaning":"The Prophet\'s basin in the Hereafter, from which believers will drink.","example":"He hoped to drink from the Hawd of the Prophet.","reference":"Hadith: Sahih al-Bukhari 9.88.602"},{"id":438,"term":"Shafa\'ah","phrase":"Intercession","meaning":"The act of the Prophet or righteous individuals interceding for others on Judgment Day.","example":"She sought the Prophet\'s Shafa\'ah through her devotion.","reference":"Hadith: Sahih al-Bukhari 6.60.3"},{"id":439,"term":"A\'raf","phrase":"The Heights","meaning":"A place between Paradise and Hell where some souls await their fate on Judgment Day.","example":"The A\'raf is described as a barrier in the Qur\'an.","reference":"Qur\'an 7:46"},{"id":440,"term":"Laylat al-Qadr","phrase":"Night of Decree","meaning":"A blessed night in Ramadan when the Qur\'an was first revealed, worth more than a thousand months.","example":"She spent Laylat al-Qadr in worship and prayer.","reference":"Qur\'an 97:1"},{"id":441,"term":"Tafsir","phrase":"Qur\'anic Exegesis","meaning":"The scholarly interpretation and explanation of the Qur\'an\'s meanings.","example":"He studied Tafsir to understand the Qur\'an deeply.","reference":"Qur\'an 3:7"},{"id":442,"term":"Asbab an-Nuzul","phrase":"Causes of Revelation","meaning":"The historical context or reasons behind the revelation of specific Qur\'anic verses.","example":"The scholar explained the Asbab an-Nuzul for Surah Al-Kawthar.","reference":"Qur\'an 3:7"},{"id":443,"term":"Nasikh wa Mansukh","phrase":"Abrogation","meaning":"The concept of certain Qur\'anic verses or rulings superseding others.","example":"Scholars studied Nasikh wa Mansukh to understand legal changes.","reference":"Qur\'an 2:106"},{"id":446,"term":"Madhhab","phrase":"School of Thought","meaning":"A recognized school of Islamic jurisprudence, such as Hanafi or Maliki.","example":"She followed the Shafi\'i Madhhab in her worship.","reference":"Qur\'an 4:59"},{"id":447,"term":"Fiqh","phrase":"Islamic Jurisprudence","meaning":"The understanding and application of Islamic law derived from the Qur\'an and Sunnah.","example":"He studied Fiqh to learn the rules of worship.","reference":"Qur\'an 4:59"},{"id":448,"term":"Usul al-Fiqh","phrase":"Principles of Jurisprudence","meaning":"The methodology used to derive Islamic legal rulings from primary sources.","example":"Usul al-Fiqh guided the scholar\'s legal analysis.","reference":"Qur\'an 4:59"},{"id":449,"term":"Fatwa","phrase":"Religious Ruling","meaning":"A non-binding legal opinion issued by a qualified scholar on an Islamic matter.","example":"The Fatwa clarified the permissibility of a new technology.","reference":"Qur\'an 4:127"},{"id":450,"term":"Ijma","phrase":"Consensus","meaning":"The agreement of Islamic scholars on a legal ruling, considered a source of law.","example":"The Ijma supported the prohibition of alcohol.","reference":"Qur\'an 4:59"},{"id":451,"term":"Khilaf","phrase":"Difference of Opinion","meaning":"Disagreement among scholars on a legal issue, respected in Islamic tradition.","example":"The Khilaf on certain rulings allows flexibility in practice.","reference":"Qur\'an 4:59"},{"id":452,"term":"Sahabah","phrase":"Companions","meaning":"The contemporaries of Prophet Muhammad who saw or met him and believed in him.","example":"The Sahabah transmitted the Prophet\'s teachings accurately.","reference":"Qur\'an 9:100"},{"id":453,"term":"Tabi\'in","phrase":"Successors","meaning":"The generation after the Sahabah who learned from them.","example":"The Tabi\'in preserved the Hadith for future generations.","reference":"Qur\'an 9:100"},{"id":454,"term":"Tabi\' Tabi\'in","phrase":"Successors of the Successors","meaning":"The generation after the Tabi\'in, continuing the transmission of Islamic knowledge.","example":"The Tabi\' Tabi\'in contributed to early Islamic scholarship.","reference":"Qur\'an 9:100"},{"id":455,"term":"Isnad","phrase":"Chain of Narration","meaning":"The chain of narrators transmitting a Hadith, ensuring its authenticity.","example":"The Hadith\'s Isnad was verified by scholars.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":456,"term":"Matn","phrase":"Text of Hadith","meaning":"The actual content or wording of a Hadith, distinct from its chain of narration.","example":"The Matn of the Hadith emphasized kindness to neighbors.","reference":"Hadith: Sahih Muslim 1.74"},{"id":457,"term":"Sahih","phrase":"Authentic Hadith","meaning":"A Hadith with a reliable chain of narration and no defects.","example":"The Sahih Hadith was used as evidence in the ruling.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":458,"term":"Hasan","phrase":"Good Hadith","meaning":"A Hadith with a good chain of narration but slightly less reliable than Sahih.","example":"The Hasan Hadith supported the recommended practice.","reference":"Hadith: Sunan at-Tirmidhi 1.1.1"},{"id":459,"term":"Da\'if","phrase":"Weak Hadith","meaning":"A Hadith with a flawed or unreliable chain of narration.","example":"Scholars avoided the Da\'if Hadith in legal rulings.","reference":"Hadith: Sunan at-Tirmidhi 1.1.1"},{"id":460,"term":"Mawdu","phrase":"Fabricated Hadith","meaning":"A Hadith that is falsely attributed to the Prophet, considered invalid.","example":"The Mawdu Hadith was rejected by the scholars.","reference":"Hadith: Sahih al-Bukhari 1.3.108"},{"id":461,"term":"Athar","phrase":"Narration","meaning":"Sayings or actions attributed to the Companions or Successors, not the Prophet.","example":"The Athar of Umar provided guidance on governance.","reference":"Hadith: Sahih Muslim 1.1"},{"id":462,"term":"Riwayah","phrase":"Transmission","meaning":"The process of narrating or transmitting Hadith or Islamic knowledge.","example":"The Riwayah of Hadith preserved the Prophet\'s legacy.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":463,"term":"Sanad","phrase":"Chain of Authority","meaning":"Another term for Isnad, the chain of narrators for a Hadith.","example":"The Sanad was checked to confirm the Hadith\'s authenticity.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":464,"term":"Rawi","phrase":"Narrator","meaning":"A person who narrates a Hadith, part of the chain of transmission.","example":"The Rawi was known for his reliability in Hadith narration.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":465,"term":"Hadith Mutawatir","phrase":"Mass-Transmitted Hadith","meaning":"A Hadith reported by so many narrators that its authenticity is certain.","example":"The Hadith Mutawatir about Salah is undeniable.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":466,"term":"Hadith Ahad","phrase":"Solitary Hadith","meaning":"A Hadith narrated by fewer people, less certain than Mutawatir but still valid.","example":"The Hadith Ahad provided guidance on charity.","reference":"Hadith: Sahih Muslim 1.1"},{"id":467,"term":"Hadith Qudsi","phrase":"Divine Hadith","meaning":"A Hadith where the Prophet conveys Allah\'s words, distinct from the Qur\'an.","example":"The Hadith Qudsi emphasized Allah\'s mercy.","reference":"Hadith: Sahih al-Bukhari 9.93.601"},{"id":468,"term":"Tajwid","phrase":"Qur\'anic Recitation Rules","meaning":"The science of pronouncing and reciting the Qur\'an correctly.","example":"She studied Tajwid to perfect her Qur\'an recitation.","reference":"Qur\'an 73:4"},{"id":469,"term":"Qira\'at","phrase":"Recitation Variants","meaning":"The different accepted modes of reciting the Qur\'an, each with slight variations.","example":"He mastered the Qira\'at of Hafs for his recitation.","reference":"Qur\'an 73:4"},{"id":470,"term":"Harakat","phrase":"Vowel Marks","meaning":"Diacritical marks in the Qur\'an indicating vowel sounds for correct pronunciation.","example":"The Harakat helped her read the Qur\'an accurately.","reference":"Qur\'an 73:4"},{"id":471,"term":"Madd","phrase":"Elongation","meaning":"The rule in Tajwid for prolonging certain vowel sounds in Qur\'anic recitation.","example":"She applied Madd to elongate the vowel in her recitation.","reference":"Qur\'an 73:4"},{"id":472,"term":"Ghunna","phrase":"Nasalization","meaning":"A Tajwid rule for pronouncing certain letters with a nasal sound.","example":"He practiced Ghunna for the correct recitation of noon letters.","reference":"Qur\'an 73:4"},{"id":473,"term":"Idgham","phrase":"Merging","meaning":"A Tajwid rule where certain letters are merged with others during recitation.","example":"She applied Idgham to blend the letters smoothly.","reference":"Qur\'an 73:4"},{"id":474,"term":"Iqlab","phrase":"Conversion","meaning":"A Tajwid rule where a noon saakin or tanween is converted to a meem sound.","example":"The Iqlab rule changed the sound in her recitation.","reference":"Qur\'an 73:4"},{"id":475,"term":"Ikhfa","phrase":"Concealment","meaning":"A Tajwid rule where a noon saakin or tanween is pronounced with a light nasal sound.","example":"She mastered Ikhfa for a refined Qur\'an recitation.","reference":"Qur\'an 73:4"},{"id":476,"term":"Izhar","phrase":"Clear Pronunciation","meaning":"A Tajwid rule where a noon saakin or tanween is pronounced clearly without nasalization.","example":"He used Izhar to pronounce the letters distinctly.","reference":"Qur\'an 73:4"},{"id":478,"term":"Ibtida","phrase":"Starting","meaning":"Rules for beginning Qur\'anic recitation after a pause or stop.","example":"He followed Ibtida rules to start his recitation properly.","reference":"Qur\'an 73:4"},{"id":479,"term":"Sajdah Tilawah","phrase":"Prostration of Recitation","meaning":"A prostration performed when reciting or hearing specific Qur\'anic verses.","example":"She performed Sajdah Tilawah after reciting Surah As-Sajdah.","reference":"Qur\'an 32:15"},{"id":480,"term":"Ayat al-Kursi","phrase":"Verse of the Throne","meaning":"A highly revered verse (Qur\'an 2:255) recited for protection and blessings.","example":"He recited Ayat al-Kursi before sleeping for protection.","reference":"Qur\'an 2:255"},{"id":481,"term":"Surah","phrase":"Chapter","meaning":"A chapter of the Qur\'an, of which there are 114 in total.","example":"She memorized Surah Al-Fatihah as her first chapter.","reference":"Qur\'an 2:1"},{"id":482,"term":"Ayah","phrase":"Verse","meaning":"A verse or sign in the Qur\'an, the smallest unit of revelation.","example":"Each Ayah of the Qur\'an carries deep meaning.","reference":"Qur\'an 2:1"},{"id":483,"term":"Mushrikun","phrase":"Polytheists","meaning":"Those who associate partners with Allah, committing Shirk.","example":"The Qur\'an calls the Mushrikun to monotheism.","reference":"Qur\'an 6:106"},{"id":484,"term":"Kafir","phrase":"Disbeliever","meaning":"A person who rejects faith in Allah or His messengers.","example":"The Qur\'an warns the Kafir of consequences in the Hereafter.","reference":"Qur\'an 2:6"},{"id":485,"term":"Munafiq","phrase":"Hypocrite","meaning":"A person who outwardly professes Islam but inwardly disbelieves.","example":"The Munafiq was warned of a severe punishment in the Qur\'an.","reference":"Qur\'an 63:1"},{"id":486,"term":"Mu\'min","phrase":"Believer","meaning":"A person who has true faith in Allah and His messengers.","example":"The Mu\'min strives to follow the Qur\'an and Sunnah.","reference":"Qur\'an 2:285"},{"id":487,"term":"Muslim","phrase":"One Who Submits","meaning":"A person who submits to Allah\'s will and follows Islam.","example":"As a Muslim, she prayed five times daily.","reference":"Qur\'an 3:64"},{"id":488,"term":"Ummah","phrase":"Community","meaning":"The global community of Muslims united by faith.","example":"The Ummah came together to support the needy.","reference":"Qur\'an 2:143"},{"id":489,"term":"Ahl al-Kitab","phrase":"People of the Book","meaning":"Jews and Christians who received divine scriptures before Islam.","example":"The Qur\'an calls for dialogue with Ahl al-Kitab.","reference":"Qur\'an 3:64"},{"id":490,"term":"Dhimmi","phrase":"Protected Person","meaning":"A non-Muslim living under Islamic governance with protected rights.","example":"The Dhimmi paid Jizyah for protection in the Islamic state.","reference":"Qur\'an 9:29"},{"id":491,"term":"Jizyah","phrase":"Protection Tax","meaning":"A tax levied on non-Muslims under Islamic rule in exchange for protection.","example":"The Dhimmi paid Jizyah to live safely in the state.","reference":"Qur\'an 9:29"},{"id":492,"term":"Ahl al-Dhimmah","phrase":"People of the Covenant","meaning":"Another term for Dhimmi, non-Muslims under the protection of an Islamic state.","example":"The Ahl al-Dhimmah enjoyed religious freedom in the state.","reference":"Qur\'an 9:29"},{"id":493,"term":"Sirah","phrase":"Biography","meaning":"The biography of Prophet Muhammad, detailing his life and teachings.","example":"She studied the Sirah to learn about the Prophet\'s character.","reference":"Qur\'an 33:21"},{"id":494,"term":"Maghazi","phrase":"Military Campaigns","meaning":"The military expeditions led by or during the time of Prophet Muhammad.","example":"The Maghazi provided lessons in strategy and ethics.","reference":"Qur\'an 8:7"},{"id":495,"term":"Hijrah","phrase":"Migration","meaning":"The migration of Prophet Muhammad from Mecca to Medina, marking the Islamic calendar\'s start.","example":"The Hijrah was a turning point in Islamic history.","reference":"Qur\'an 9:40"},{"id":496,"term":"Ansar","phrase":"Helpers","meaning":"The Muslims of Medina who supported the Prophet and the Muhajirun after the Hijrah.","example":"The Ansar welcomed the Muhajirun with open hearts.","reference":"Qur\'an 9:100"},{"id":497,"term":"Muhajirun","phrase":"Emigrants","meaning":"The Muslims who migrated from Mecca to Medina during the Hijrah.","example":"The Muhajirun faced hardships for the sake of their faith.","reference":"Qur\'an 9:100"},{"id":499,"term":"Adhan","phrase":"Call to Prayer","meaning":"The call to announce the time for the five daily prayers.","example":"The Adhan echoed through the village before Fajr.","reference":"Hadith: Sahih al-Bukhari 1.11.580"},{"id":500,"term":"Iqamah","phrase":"Second Call to Prayer","meaning":"The call made just before the start of congregational prayer, signaling readiness.","example":"The Iqamah was called, and the congregation stood for Salah.","reference":"Hadith: Sahih al-Bukhari 1.11.589"},{"id":501,"term":"Imam","phrase":"Leader","meaning":"A person who leads the congregational prayer or a religious leader in the community.","example":"The Imam led the Friday prayer with a heartfelt sermon.","reference":"Qur\'an 2:124"},{"id":502,"term":"Mu\'adhdhin","phrase":"Caller to Prayer","meaning":"The person who recites the Adhan to call Muslims to prayer.","example":"The Mu\'adhdhin\'s voice was heard across the town before Dhuhr.","reference":"Hadith: Sahih al-Bukhari 1.11.580"},{"id":503,"term":"Salah","phrase":"Ritual Prayer","meaning":"The five daily obligatory prayers performed by Muslims facing the Ka\'bah.","example":"She performed Salah at the prescribed times every day.","reference":"Qur\'an 2:3"},{"id":504,"term":"Rak\'ah","phrase":"Prayer Cycle","meaning":"A unit of prayer consisting of specific movements and recitations.","example":"Fajr prayer consists of two Rak\'ah.","reference":"Hadith: Sahih al-Bukhari 1.8.345"},{"id":505,"term":"Sujud","phrase":"Prostration","meaning":"The act of placing the forehead on the ground in submission during prayer.","example":"She performed Sujud with humility during Salah.","reference":"Qur\'an 32:15"},{"id":506,"term":"Ruku","phrase":"Bowing","meaning":"The act of bowing during Salah, a key component of each Rak\'ah.","example":"He recited a supplication during Ruku in his prayer.","reference":"Hadith: Sahih Muslim 4.881"},{"id":507,"term":"Qiyam","phrase":"Standing","meaning":"The standing position in Salah where Qur\'anic verses are recited.","example":"During Qiyam, she recited Surah Al-Fatihah.","reference":"Qur\'an 2:238"},{"id":508,"term":"Tashahhud","phrase":"Testimony","meaning":"A recitation during Salah affirming faith in Allah and the Prophet.","example":"He recited the Tashahhud in the final sitting of Salah.","reference":"Hadith: Sahih Muslim 4.893"},{"id":509,"term":"Taslim","phrase":"Salutation","meaning":"The concluding act of Salah, turning the head to say \'Assalamu Alaikum.\'","example":"She completed her prayer with Taslim on both sides.","reference":"Hadith: Sahih al-Bukhari 1.12.802"},{"id":510,"term":"Du\'a","phrase":"Supplication","meaning":"A personal prayer or invocation to Allah for blessings or forgiveness.","example":"He made Du\'a for his family\'s health after Salah.","reference":"Qur\'an 2:186"},{"id":511,"term":"Dhikr","phrase":"Remembrance","meaning":"The act of remembering and praising Allah through specific phrases or prayers.","example":"She recited Dhikr after every Salah to stay connected to Allah.","reference":"Qur\'an 33:41"},{"id":512,"term":"Tasbih","phrase":"Glorification","meaning":"The act of saying \'SubhanAllah\' to glorify Allah, often using prayer beads.","example":"He used a Tasbih to count his glorifications after prayer.","reference":"Qur\'an 87:1"},{"id":513,"term":"Tahmid","phrase":"Praising Allah","meaning":"Saying \'Alhamdulillah\' to express gratitude to Allah.","example":"She recited Tahmid upon receiving good news.","reference":"Qur\'an 1:2"},{"id":514,"term":"Takbir","phrase":"Magnification","meaning":"Saying \'Allahu Akbar\' to proclaim Allah\'s greatness, used in Salah and other occasions.","example":"He began his prayer with the Takbir.","reference":"Hadith: Sahih al-Bukhari 1.12.749"},{"id":515,"term":"Tahlil","phrase":"Declaration of Faith","meaning":"Saying \'La ilaha illa Allah\' to affirm there is no deity but Allah.","example":"She recited Tahlil during her morning Dhikr.","reference":"Qur\'an 37:35"},{"id":516,"term":"Istighfar","phrase":"Seeking Forgiveness","meaning":"The act of asking Allah for forgiveness, often by saying \'Astaghfirullah.\'","example":"He made Istighfar to seek forgiveness for his mistakes.","reference":"Qur\'an 3:135"},{"id":517,"term":"Wudu","phrase":"Ablution","meaning":"The ritual washing performed before Salah to attain ritual purity.","example":"She performed Wudu before offering her Maghrib prayer.","reference":"Qur\'an 5:6"},{"id":518,"term":"Ghusl","phrase":"Full Ritual Bath","meaning":"A complete body wash required to remove major ritual impurity.","example":"He performed Ghusl after waking from a state of Janabah.","reference":"Qur\'an 5:6"},{"id":519,"term":"Niyyah","phrase":"Intention","meaning":"The conscious intention to perform an act of worship for Allah\'s sake.","example":"She made Niyyah in her heart before starting Salah.","reference":"Hadith: Sahih al-Bukhari 1.1.1"},{"id":520,"term":"Iqamat as-Salah","phrase":"Establishing Prayer","meaning":"The act of performing the obligatory prayers regularly and correctly.","example":"He was diligent in Iqamat as-Salah five times a day.","reference":"Qur\'an 2:3"},{"id":521,"term":"Zakat","phrase":"Obligatory Charity","meaning":"The mandatory giving of a portion of one\'s wealth to the poor and needy.","example":"She paid Zakat annually to support the community.","reference":"Qur\'an 9:60"},{"id":522,"term":"Sadaqah","phrase":"Voluntary Charity","meaning":"Voluntary giving of wealth or good deeds to seek Allah\'s pleasure.","example":"He gave Sadaqah to help a struggling family.","reference":"Qur\'an 2:263"},{"id":523,"term":"Sawm","phrase":"Fasting","meaning":"Abstaining from food, drink, and certain activities from dawn to sunset, especially during Ramadan.","example":"She observed Sawm during the entire month of Ramadan.","reference":"Qur\'an 2:183"},{"id":524,"term":"Iftar","phrase":"Breaking the Fast","meaning":"The meal or act of breaking the fast at sunset during Ramadan.","example":"They gathered for Iftar with dates and water.","reference":"Hadith: Sahih al-Bukhari 3.31.128"},{"id":525,"term":"Suhoor","phrase":"Pre-Dawn Meal","meaning":"The meal eaten before dawn to prepare for fasting during Ramadan.","example":"He ate Suhoor to gain strength for the day\'s fast.","reference":"Hadith: Sahih al-Bukhari 3.31.140"},{"id":526,"term":"Hajj","phrase":"Pilgrimage","meaning":"The obligatory pilgrimage to Mecca, one of the five pillars of Islam.","example":"She saved for years to perform Hajj.","reference":"Qur\'an 2:197"},{"id":527,"term":"Umrah","phrase":"Lesser Pilgrimage","meaning":"A non-obligatory pilgrimage to Mecca performed at any time of the year.","example":"He performed Umrah during his visit to Mecca.","reference":"Qur\'an 2:196"},{"id":528,"term":"Ihram","phrase":"State of Ritual Purity","meaning":"The sacred state a pilgrim enters for Hajj or Umrah, marked by specific garments and intentions.","example":"She entered Ihram before starting her pilgrimage rituals.","reference":"Qur\'an 2:197"},{"id":529,"term":"Tawaf","phrase":"Circumambulation","meaning":"Walking seven times around the Ka\'bah during Hajj or Umrah.","example":"He performed Tawaf around the Ka\'bah with devotion.","reference":"Qur\'an 22:29"},{"id":530,"term":"Ka\'bah","phrase":"Sacred House","meaning":"The cube-shaped structure in Mecca, the focal point of Muslim prayer and pilgrimage.","example":"Pilgrims gathered around the Ka\'bah for Tawaf.","reference":"Qur\'an 5:97"},{"id":531,"term":"Maqam Ibrahim","phrase":"Station of Abraham","meaning":"The stone in Mecca bearing the footprint of Prophet Ibrahim, near the Ka\'bah.","example":"He prayed near Maqam Ibrahim after completing Tawaf.","reference":"Qur\'an 2:125"},{"id":532,"term":"Hajar al-Aswad","phrase":"Black Stone","meaning":"The sacred stone set in the Ka\'bah, kissed or touched during Tawaf.","example":"She touched the Hajar al-Aswad during her pilgrimage.","reference":"Hadith: Sahih al-Bukhari 2.26.667"},{"id":533,"term":"Zamzam","phrase":"Sacred Water","meaning":"The blessed water from the Zamzam well in Mecca, believed to have healing properties.","example":"He drank Zamzam water during his Hajj.","reference":"Hadith: Sahih al-Bukhari 2.26.665"},{"id":534,"term":"Arafat","phrase":"Plain of Arafat","meaning":"The plain near Mecca where pilgrims stand in prayer during Hajj on the 9th of Dhul-Hijjah.","example":"Standing at Arafat is the pinnacle of Hajj.","reference":"Hadith: Sahih Muslim 4.1218"},{"id":535,"term":"Muzdalifah","phrase":"Sacred Site","meaning":"The place where pilgrims spend the night after Arafat, collecting pebbles for Ramy al-Jamarat.","example":"They gathered pebbles at Muzdalifah for the stoning ritual.","reference":"Hadith: Sahih al-Bukhari 2.26.717"},{"id":536,"term":"Mina","phrase":"Pilgrimage Site","meaning":"A valley near Mecca where pilgrims perform the Ramy al-Jamarat during Hajj.","example":"He stayed in Mina during the days of Tashriq.","reference":"Hadith: Sahih al-Bukhari 2.26.717"},{"id":537,"term":"Days of Tashriq","phrase":"Days of Drying Meat","meaning":"The 11th, 12th, and 13th of Dhul-Hijjah, when pilgrims perform certain Hajj rituals.","example":"They stayed in Mina during the Days of Tashriq.","reference":"Hadith: Sahih Muslim 4.1211"},{"id":538,"term":"Eid al-Adha","phrase":"Festival of Sacrifice","meaning":"The Islamic festival commemorating Prophet Ibrahim\'s willingness to sacrifice his son.","example":"They celebrated Eid al-Adha with prayers and Qurbani.","reference":"Qur\'an 37:107"},{"id":539,"term":"Eid al-Fitr","phrase":"Festival of Breaking the Fast","meaning":"The Islamic festival marking the end of Ramadan with prayers and celebrations.","example":"She attended the Eid al-Fitr prayer with her family.","reference":"Hadith: Sahih al-Bukhari 2.15.73"},{"id":540,"term":"Qurbani","phrase":"Sacrifice","meaning":"The ritual animal sacrifice performed during Eid al-Adha.","example":"He performed Qurbani to honor Prophet Ibrahim\'s sacrifice.","reference":"Qur\'an 22:34"},{"id":541,"term":"Takbirat al-Eid","phrase":"Eid Magnifications","meaning":"The repeated saying of \'Allahu Akbar\' during Eid prayers and celebrations.","example":"The congregation recited Takbirat al-Eid joyfully.","reference":"Hadith: Sahih al-Bukhari 2.15.78"},{"id":542,"term":"Khutbah al-Eid","phrase":"Eid Sermon","meaning":"The sermon delivered after the Eid prayer, offering guidance and reminders.","example":"The Khutbah al-Eid emphasized unity and charity.","reference":"Hadith: Sahih al-Bukhari 2.15.76"},{"id":543,"term":"Salat al-Eid","phrase":"Eid Prayer","meaning":"The special congregational prayer performed on Eid al-Fitr and Eid al-Adha.","example":"They gathered at the mosque for Salat al-Eid.","reference":"Hadith: Sahih al-Bukhari 2.15.73"},{"id":544,"term":"Nikah","phrase":"Marriage Contract","meaning":"The formal Islamic marriage agreement between a bride and groom.","example":"Their Nikah was conducted with witnesses and a dowry.","reference":"Qur\'an 4:21"},{"id":547,"term":"Iddah","phrase":"Waiting Period","meaning":"The period a woman observes after divorce or her husband\'s death before remarrying.","example":"She observed Iddah for three menstrual cycles.","reference":"Qur\'an 2:228"},{"id":548,"term":"Khul","phrase":"Divorce Initiated by Wife","meaning":"A divorce initiated by the wife, often involving returning the dowry.","example":"She sought Khul to end her marriage amicably.","reference":"Qur\'an 2:229"},{"id":549,"term":"Mahr","phrase":"Dowry","meaning":"The mandatory gift given by the groom to the bride at the time of marriage.","example":"Her Mahr was a sum of money agreed upon by both families.","reference":"Qur\'an 4:4"},{"id":550,"term":"Shirk","phrase":"Polytheism","meaning":"The sin of associating partners with Allah, considered the gravest sin in Islam.","example":"He avoided Shirk by worshipping Allah alone.","reference":"Qur\'an 4:48"},{"id":551,"term":"Kufr","phrase":"Disbelief","meaning":"The rejection or denial of Allah or His messengers.","example":"Kufr is warned against in the Qur\'an as a path to misguidance.","reference":"Qur\'an 2:6"},{"id":552,"term":"Nifaq","phrase":"Hypocrisy","meaning":"Pretending to have faith while concealing disbelief.","example":"The Qur\'an warns against Nifaq as a dangerous trait.","reference":"Qur\'an 63:1"},{"id":553,"term":"Iman","phrase":"Faith","meaning":"Belief in the core tenets of Islam, including Allah, His prophets, and the Hereafter.","example":"Her Iman grew stronger through regular worship.","reference":"Qur\'an 2:177"},{"id":554,"term":"Taqdir","phrase":"Divine Decree","meaning":"Allah\'s foreordainment of all events, part of belief in Qada wa Qadar.","example":"She accepted her trials with faith in Taqdir.","reference":"Qur\'an 54:49"},{"id":555,"term":"Qadar","phrase":"Destiny","meaning":"The divine destiny or predetermination of all things by Allah.","example":"He trusted in Allah\'s Qadar during difficult times.","reference":"Qur\'an 54:49"},{"id":556,"term":"Tawakkul","phrase":"Reliance on Allah","meaning":"Complete trust and dependence on Allah while taking necessary actions.","example":"She practiced Tawakkul by working hard and trusting Allah\'s plan.","reference":"Qur\'an 3:159"},{"id":557,"term":"Barzakh","phrase":"Intermediate Realm","meaning":"The state between death and the Day of Resurrection where souls reside.","example":"Souls await in Barzakh until the Day of Judgment.","reference":"Qur\'an 23:100"},{"id":558,"term":"Yaqeen","phrase":"Certainty","meaning":"Absolute conviction in the truth of Islam and its teachings.","example":"His Yaqeen in Allah\'s mercy gave him peace.","reference":"Qur\'an 49:15"},{"id":559,"term":"Rahmah","phrase":"Mercy","meaning":"The divine compassion and mercy of Allah toward His creation.","example":"She prayed for Allah\'s Rahmah during her trials.","reference":"Qur\'an 7:56"},{"id":561,"term":"Tawfiq","phrase":"Divine Success","meaning":"Success granted by Allah to perform righteous deeds.","example":"He attributed his achievements to Allah\'s Tawfiq.","reference":"Qur\'an 11:88"},{"id":562,"term":"Hidayah","phrase":"Guidance","meaning":"Divine guidance from Allah to the straight path.","example":"She sought Hidayah through constant prayer.","reference":"Qur\'an 1:6"},{"id":563,"term":"Israf","phrase":"Extravagance","meaning":"Excessive spending or wastefulness, discouraged in Islam.","example":"He avoided Israf by living a modest lifestyle.","reference":"Qur\'an 7:31"},{"id":564,"term":"Bughd","phrase":"Hatred for Allah\'s Sake","meaning":"Disliking or rejecting what is displeasing to Allah, such as sin or disbelief.","example":"She practiced Bughd by avoiding sinful gatherings.","reference":"Qur\'an 9:23"},{"id":565,"term":"Wala\'","phrase":"Loyalty","meaning":"Loyalty and allegiance to Allah, His Prophet, and the believers.","example":"His Wala\' to the Ummah inspired his charitable work.","reference":"Qur\'an 5:55"},{"id":566,"term":"Bara\'","phrase":"Disavowal","meaning":"Disassociating from disbelief and those who oppose Allah\'s commands.","example":"He practiced Bara\' by avoiding those who mocked the faith.","reference":"Qur\'an 9:1"},{"id":567,"term":"Amanah","phrase":"Trust","meaning":"The responsibility to fulfill trusts and obligations, a key Islamic value.","example":"She upheld Amanah by returning borrowed items promptly.","reference":"Qur\'an 4:58"},{"id":568,"term":"Khiyanah","phrase":"Betrayal","meaning":"Breaking a trust or acting dishonestly, condemned in Islam.","example":"He avoided Khiyanah by being truthful in his dealings.","reference":"Qur\'an 8:27"},{"id":569,"term":"Silat ar-Rahm","phrase":"Maintaining Family Ties","meaning":"The Islamic obligation to maintain good relations with relatives.","example":"She practiced Silat ar-Rahm by visiting her extended family.","reference":"Qur\'an 4:1"},{"id":570,"term":"Qat\' ar-Rahm","phrase":"Cutting Family Ties","meaning":"The act of severing ties with relatives, strongly discouraged in Islam.","example":"He was warned against Qat\' ar-Rahm due to its consequences.","reference":"Qur\'an 47:22"},{"id":571,"term":"Birr","phrase":"Righteousness","meaning":"Goodness and piety, especially toward parents and relatives.","example":"Her Birr toward her parents earned her blessings.","reference":"Qur\'an 2:177"},{"id":572,"term":"Uquq","phrase":"Disobedience to Parents","meaning":"Mistreating or disobeying parents, considered a major sin in Islam.","example":"He repented for Uquq after neglecting his parents.","reference":"Qur\'an 17:23"},{"id":573,"term":"Adab","phrase":"Etiquette","meaning":"The Islamic concept of good manners and proper behavior.","example":"She showed Adab by speaking politely to elders.","reference":"Qur\'an 49:11"},{"id":574,"term":"Ikhlas","phrase":"Sincerity","meaning":"Performing actions purely for Allah\'s sake, free from hypocrisy.","example":"His Ikhlas in worship made his deeds meaningful.","reference":"Qur\'an 98:5"},{"id":575,"term":"Riya","phrase":"Showing Off","meaning":"Performing acts of worship to gain praise from others, which nullifies sincerity.","example":"She avoided Riya by keeping her charity private.","reference":"Qur\'an 4:38"},{"id":576,"term":"Tawadhu","phrase":"Humility","meaning":"The quality of being humble and modest in character.","example":"His Tawadhu made him beloved in the community.","reference":"Qur\'an 25:63"},{"id":577,"term":"Kibr","phrase":"Arrogance","meaning":"Pride or arrogance, condemned as a destructive trait in Islam.","example":"He worked to overcome Kibr to purify his heart.","reference":"Qur\'an 31:18"},{"id":578,"term":"Hasad","phrase":"Envy","meaning":"Jealousy or wishing harm upon others for their blessings, a sin in Islam.","example":"She sought refuge from Hasad to cleanse her heart.","reference":"Qur\'an 113:5"},{"id":579,"term":"Ghibah","phrase":"Backbiting","meaning":"Speaking ill of someone in their absence, considered a major sin.","example":"He avoided Ghibah to maintain good character.","reference":"Qur\'an 49:12"},{"id":580,"term":"Namimah","phrase":"Tale-Bearing","meaning":"Spreading gossip or tales to create discord between people.","example":"She refrained from Namimah to preserve peace.","reference":"Qur\'an 68:11"},{"id":581,"term":"Buhtan","phrase":"Slander","meaning":"Making false accusations against someone, a grave sin in Islam.","example":"He was warned against Buhtan to protect reputations.","reference":"Qur\'an 24:16"},{"id":582,"term":"Tazkiyah","phrase":"Purification","meaning":"The spiritual process of purifying the soul from sins and bad traits.","example":"She pursued Tazkiyah through constant worship.","reference":"Qur\'an 91:9"},{"id":583,"term":"Zina","phrase":"Adultery","meaning":"Unlawful sexual relations, considered a major sin in Islam.","example":"The Qur\'an warns against Zina to maintain chastity.","reference":"Qur\'an 17:32"},{"id":584,"term":"Haya","phrase":"Modesty","meaning":"The quality of shyness and modesty, a key trait in Islamic character.","example":"Her Haya was evident in her modest dress and behavior.","reference":"Hadith: Sahih al-Bukhari 1.1.8"},{"id":585,"term":"Ghayrah","phrase":"Protective Jealousy","meaning":"A sense of honor and protectiveness over one\'s family or faith.","example":"His Ghayrah led him to defend his family\'s dignity.","reference":"Hadith: Sahih Muslim 4.1498"},{"id":586,"term":"Iffah","phrase":"Chastity","meaning":"Maintaining purity and abstaining from unlawful desires.","example":"She upheld Iffah by avoiding inappropriate interactions.","reference":"Qur\'an 24:30"},{"id":587,"term":"Satr","phrase":"Covering","meaning":"The act of covering one\'s faults or others\' faults to preserve dignity.","example":"He practiced Satr by not exposing his friend\'s mistake.","reference":"Qur\'an 49:12"},{"id":589,"term":"Inabah","phrase":"Returning to Allah","meaning":"A deeper form of repentance, returning to Allah with devotion.","example":"His Inabah brought him closer to Allah after years of neglect.","reference":"Qur\'an 39:54"},{"id":590,"term":"Istislam","phrase":"Submission","meaning":"Complete surrender to Allah\'s will, a core aspect of being a Muslim.","example":"Her Istislam was evident in her acceptance of Allah\'s decrees.","reference":"Qur\'an 3:19"},{"id":591,"term":"Tawheed","phrase":"Oneness of Allah","meaning":"The belief in the absolute oneness of Allah, the foundation of Islam.","example":"Tawheed is the core of Islamic belief.","reference":"Qur\'an 112:1"},{"id":592,"term":"Risalah","phrase":"Prophethood","meaning":"The belief in the prophethood of Muhammad and previous prophets sent by Allah.","example":"Risalah affirms the role of prophets as Allah\'s messengers.","reference":"Qur\'an 2:285"},{"id":593,"term":"Malaikah","phrase":"Angels","meaning":"Spiritual beings created by Allah to carry out His commands.","example":"Belief in Malaikah is a pillar of Islamic faith.","reference":"Qur\'an 2:285"},{"id":594,"term":"Kutub","phrase":"Divine Books","meaning":"The belief in the divine scriptures revealed by Allah, including the Qur\'an.","example":"The Kutub include the Torah, Gospel, and Qur\'an.","reference":"Qur\'an 2:285"},{"id":595,"term":"Yawm al-Qiyamah","phrase":"Day of Resurrection","meaning":"The Day of Judgment when all will be resurrected and judged by Allah.","example":"Muslims prepare for Yawm al-Qiyamah through good deeds.","reference":"Qur\'an 75:1"},{"id":597,"term":"Jannah","phrase":"Paradise","meaning":"The eternal abode of reward for the righteous in the Hereafter.","example":"He prayed for Jannah in every supplication.","reference":"Qur\'an 3:133"},{"id":598,"term":"Jahannam","phrase":"Hellfire","meaning":"The place of punishment for the wicked in the Hereafter.","example":"She sought refuge from Jahannam through repentance.","reference":"Qur\'an 4:121"},{"id":607,"term":"Qiyamah","phrase":"Resurrection","meaning":"The event of the resurrection of all beings for judgment.","example":"Belief in Qiyamah is a core tenet of Islam.","reference":"Qur\'an 75:1"},{"id":608,"term":"Mahdi","phrase":"Guided One","meaning":"A prophesied figure in Islam expected to appear before the Day of Judgment.","example":"Some Muslims await the arrival of the Mahdi.","reference":"Hadith: Sunan Abu Dawood 14.4282"},{"id":609,"term":"Dajjal","phrase":"False Messiah","meaning":"A deceptive figure prophesied to appear before the Day of Judgment, causing trials.","example":"Muslims seek protection from the Dajjal\'s trials.","reference":"Hadith: Sahih Muslim 4.2937"},{"id":610,"term":"Isa ibn Maryam","phrase":"Jesus, Son of Mary","meaning":"Prophet Jesus, revered in Islam, expected to return before the Day of Judgment.","example":"Muslims believe in the return of Isa ibn Maryam.","reference":"Qur\'an 43:61"},{"id":611,"term":"Yajuj wa Majuj","phrase":"Gog and Magog","meaning":"Two tribes or forces mentioned in the Qur\'an, associated with end-time events.","example":"Yajuj wa Majuj are mentioned as a sign of the Last Days.","reference":"Qur\'an 18:94"},{"id":612,"term":"Ashrat as-Sa\'ah","phrase":"Signs of the Hour","meaning":"The major and minor signs indicating the approach of the Day of Judgment.","example":"The Ashrat as-Sa\'ah include moral decline and natural upheavals.","reference":"Hadith: Sahih Muslim 4.2940"},{"id":613,"term":"Nuzul al-Qur\'an","phrase":"Revelation of the Qur\'an","meaning":"The process by which the Qur\'an was revealed to Prophet Muhammad over 23 years.","example":"Nuzul al-Qur\'an began on Laylat al-Qadr.","reference":"Qur\'an 97:1"},{"id":614,"term":"Wahy","phrase":"Divine Revelation","meaning":"The divine inspiration or revelation sent by Allah to His prophets.","example":"The Prophet received Wahy through the angel Jibril.","reference":"Qur\'an 42:52"},{"id":615,"term":"Jibril","phrase":"Angel Gabriel","meaning":"The angel who delivered Allah\'s revelations to Prophet Muhammad.","example":"Jibril brought the Qur\'an to the Prophet in the cave of Hira.","reference":"Qur\'an 2:97"},{"id":616,"term":"Mikail","phrase":"Angel Michael","meaning":"The angel responsible for providing sustenance and blessings, as per Islamic tradition.","example":"Mikail is mentioned as an angel of mercy in Islam.","reference":"Qur\'an 2:98"},{"id":617,"term":"Israfil","phrase":"Angel Raphael","meaning":"The angel who will blow the trumpet to signal the Day of Judgment.","example":"Israfil\'s trumpet will announce the resurrection.","reference":"Hadith: Sahih Muslim 4.2940"},{"id":618,"term":"Azrail","phrase":"Angel of Death","meaning":"The angel tasked with taking souls at the time of death.","example":"Azrail is responsible for collecting souls by Allah\'s command.","reference":"Qur\'an 32:11"},{"id":619,"term":"Munkar wa Nakir","phrase":"Angels of the Grave","meaning":"The angels who question the deceased in the grave about their faith.","example":"Munkar wa Nakir test souls in the Barzakh.","reference":"Hadith: Sunan at-Tirmidhi 3.1071"},{"id":620,"term":"Hafazah","phrase":"Guardian Angels","meaning":"Angels assigned to protect and record the deeds of individuals.","example":"The Hafazah record every action for the Day of Judgment.","reference":"Qur\'an 82:10-11"},{"id":621,"term":"Kiraman Katibin","phrase":"Honorable Scribes","meaning":"The angels who record a person\'s good and bad deeds.","example":"The Kiraman Katibin note every deed for accountability.","reference":"Qur\'an 82:11"},{"id":622,"term":"Arsh","phrase":"Throne of Allah","meaning":"The divine throne, symbolizing Allah\'s supreme authority.","example":"The Qur\'an describes Allah\'s Arsh as above the heavens.","reference":"Qur\'an 20:5"},{"id":623,"term":"Kursi","phrase":"Footstool of Allah","meaning":"A symbol of Allah\'s dominion, often mentioned in relation to His throne.","example":"Ayat al-Kursi describes the vastness of Allah\'s Kursi.","reference":"Qur\'an 2:255"},{"id":624,"term":"Lawh al-Mahfuz","phrase":"Preserved Tablet","meaning":"The divine record where all events and destinies are written by Allah.","example":"The Qur\'an was sent down from the Lawh al-Mahfuz.","reference":"Qur\'an 85:22"},{"id":625,"term":"Qalam","phrase":"Pen","meaning":"The divine pen used to write the destinies in the Preserved Tablet.","example":"The Qalam recorded all events by Allah\'s command.","reference":"Qur\'an 68:1"},{"id":626,"term":"Sidrat al-Muntaha","phrase":"Lote Tree of the Utmost Boundary","meaning":"A tree in the heavens marking the boundary of divine knowledge, seen during the Mi\'raj.","example":"The Prophet saw Sidrat al-Muntaha during his ascension.","reference":"Qur\'an 53:14"},{"id":627,"term":"Bait al-Ma\'mur","phrase":"Frequented House","meaning":"A celestial house of worship in the heavens, parallel to the Ka\'bah.","example":"The Bait al-Ma\'mur is visited by angels for worship.","reference":"Qur\'an 52:4"},{"id":628,"term":"Jinn","phrase":"Spiritual Beings","meaning":"Beings created from smokeless fire, capable of free will like humans.","example":"The Qur\'an addresses both humans and Jinn.","reference":"Qur\'an 55:15"},{"id":629,"term":"Shaytan","phrase":"Satan","meaning":"A rebellious Jinn who seeks to mislead humans, also known as Iblis.","example":"She sought refuge from Shaytan before reciting the Qur\'an.","reference":"Qur\'an 7:11"},{"id":630,"term":"Iblis","phrase":"Devil","meaning":"The name of the chief Shaytan who refused to bow to Adam.","example":"Iblis was cursed for his arrogance against Allah\'s command.","reference":"Qur\'an 7:11"},{"id":631,"term":"Sihr","phrase":"Magic","meaning":"The forbidden practice of using supernatural forces to harm or deceive.","example":"The Qur\'an warns against Sihr as a harmful practice.","reference":"Qur\'an 2:102"},{"id":632,"term":"Ruqyah","phrase":"Spiritual Healing","meaning":"Reciting Qur\'anic verses or supplications for protection or healing.","example":"She performed Ruqyah to seek protection from evil.","reference":"Hadith: Sahih Muslim 4.2186"},{"id":633,"term":"Ayn","phrase":"Evil Eye","meaning":"Harm caused by envy or jealousy, countered by seeking Allah\'s protection.","example":"He recited Ruqyah to protect against the Ayn.","reference":"Hadith: Sahih Muslim 4.2188"},{"id":635,"term":"Tawassul","phrase":"Intermediation","meaning":"Seeking closeness to Allah through righteous deeds or individuals.","example":"He made Tawassul by invoking the Prophet\'s name in his Du\'a.","reference":"Qur\'an 5:35"},{"id":636,"term":"Barakah","phrase":"Divine Blessing","meaning":"A divine increase or blessing in something, such as wealth or time.","example":"Her charity brought Barakah to her business.","reference":"Qur\'an 7:96"},{"id":637,"term":"Tabarruk","phrase":"Seeking Blessings","meaning":"Seeking blessings through sacred relics, places, or righteous people.","example":"She practiced Tabarruk by drinking Zamzam water.","reference":"Hadith: Sahih al-Bukhari 2.26.665"},{"id":638,"term":"Wird","phrase":"Daily Litany","meaning":"A set of regular supplications or Qur\'anic recitations performed daily.","example":"He recited his Wird every morning for spiritual growth.","reference":"Qur\'an 33:41"},{"id":639,"term":"Hizb","phrase":"Section of Qur\'an","meaning":"A division of the Qur\'an into 60 parts for recitation purposes.","example":"She completed a Hizb of the Qur\'an each day.","reference":"Qur\'an 73:4"},{"id":640,"term":"Juz","phrase":"Part of Qur\'an","meaning":"One of the 30 equal parts of the Qur\'an for recitation purposes.","example":"He read one Juz daily during Ramadan.","reference":"Qur\'an 73:4"},{"id":641,"term":"Manzil","phrase":"Portion of Qur\'an","meaning":"A division of the Qur\'an into seven parts for recitation over a week.","example":"He recited one Manzil daily for spiritual protection.","reference":"Hadith: Sahih al-Bukhari 6.61.536"},{"id":642,"term":"Mu\'awwidhatayn","phrase":"The Two Protectors","meaning":"The last two Surahs of the Qur\'an (Al-Falaq and An-Nas), recited for protection.","example":"She recited the Mu\'awwidhatayn before sleeping.","reference":"Qur\'an 113:1, 114:1"},{"id":644,"term":"Sunnah","phrase":"Prophetic Tradition","meaning":"The practices, sayings, and approvals of Prophet Muhammad, a key source of Islamic guidance.","example":"She followed the Sunnah by breaking her fast with dates.","reference":"Qur\'an 33:21"},{"id":645,"term":"Hadith","phrase":"Prophetic Narration","meaning":"The recorded sayings, actions, or approvals of Prophet Muhammad.","example":"The Hadith guided her in performing voluntary prayers.","reference":"Hadith: Sahih al-Bukhari 1.1.1"},{"id":646,"term":"Qur\'an","phrase":"The Recitation","meaning":"The holy book of Islam, revealed to Prophet Muhammad as divine guidance.","example":"She recited the Qur\'an daily for spiritual growth.","reference":"Qur\'an 2:2"},{"id":651,"term":"Hafiz","phrase":"Qur\'an Memorizer","meaning":"A person who has memorized the entire Qur\'an.","example":"The Hafiz led the Taraweeh prayers during Ramadan.","reference":"Qur\'an 54:17"},{"id":652,"term":"Qurra","phrase":"Reciters","meaning":"Individuals skilled in the recitation of the Qur\'an, often with mastery of Tajwid.","example":"The Qurra were invited to recite at the gathering.","reference":"Qur\'an 73:4"},{"id":653,"term":"Mushaf","phrase":"Written Qur\'an","meaning":"The physical copy of the Qur\'an as a compiled book.","example":"She kept a Mushaf on her bedside for daily reading.","reference":"Qur\'an 2:2"},{"id":654,"term":"Tadabbur","phrase":"Reflection","meaning":"Deep contemplation and reflection on the meanings of the Qur\'an.","example":"He practiced Tadabbur to understand the Qur\'an\'s wisdom.","reference":"Qur\'an 4:82"},{"id":655,"term":"Tawil","phrase":"Interpretation","meaning":"The deeper or allegorical interpretation of Qur\'anic verses.","example":"Scholars used Tawil to explain complex verses.","reference":"Qur\'an 3:7"},{"id":658,"term":"Muhkam","phrase":"Clear Verse","meaning":"Qur\'anic verses with clear and unambiguous meanings.","example":"The Muhkam verses guide basic Islamic practices.","reference":"Qur\'an 3:7"},{"id":659,"term":"Mutashabih","phrase":"Ambiguous Verse","meaning":"Qur\'anic verses with allegorical or unclear meanings, requiring interpretation.","example":"Scholars debated the Mutashabih verses for deeper understanding.","reference":"Qur\'an 3:7"},{"id":665,"term":"Qiyas","phrase":"Analogical Reasoning","meaning":"A method of Islamic jurisprudence using analogy to derive rulings from existing sources.","example":"Scholars used Qiyas to rule on modern financial transactions.","reference":"Qur\'an 4:59"},{"id":666,"term":"Istihsan","phrase":"Juristic Preference","meaning":"Choosing a ruling based on what is deemed better for public interest or equity in Islamic law.","example":"The scholar applied Istihsan to permit a lenient ruling.","reference":"Hadith: Sahih Muslim 4.1718"},{"id":667,"term":"Istislah","phrase":"Public Interest","meaning":"Making rulings based on the public good when no clear text exists, also known as Maslahah.","example":"Istislah was used to regulate new technologies in Islamic law.","reference":"Qur\'an 4:59"},{"id":668,"term":"Maslahah","phrase":"Public Welfare","meaning":"The principle of promoting benefit or preventing harm in Islamic legal rulings.","example":"The ruling was based on Maslahah to protect the community.","reference":"Qur\'an 4:59"},{"id":669,"term":"Urf","phrase":"Custom","meaning":"Local customs or traditions considered in Islamic law if they do not contradict Shari\'ah.","example":"The local Urf influenced the marriage customs.","reference":"Qur\'an 7:199"},{"id":670,"term":"Sad al-Dhara\'i","phrase":"Blocking the Means","meaning":"Preventing actions that could lead to forbidden outcomes in Islamic law.","example":"Sad al-Dhara\'i was applied to prohibit certain financial practices.","reference":"Qur\'an 6:108"},{"id":671,"term":"Shari\'ah","phrase":"Islamic Law","meaning":"The divine law derived from the Qur\'an and Sunnah, guiding all aspects of life.","example":"She followed Shari\'ah in her daily practices.","reference":"Qur\'an 45:18"},{"id":676,"term":"Ahl al-Bayt","phrase":"People of the House","meaning":"The family of Prophet Muhammad, including his close relatives.","example":"Muslims honor the Ahl al-Bayt for their piety.","reference":"Qur\'an 33:33"},{"id":681,"term":"Muqallid","phrase":"Follower","meaning":"A person who follows a scholar\'s rulings without independent reasoning.","example":"As a Muqallid, he adhered to the Maliki school.","reference":"Qur\'an 4:59"},{"id":682,"term":"Taqlid","phrase":"Imitation","meaning":"Following the rulings of a qualified scholar without independent reasoning.","example":"He practiced Taqlid by following a trusted scholar\'s rulings.","reference":"Qur\'an 4:59"},{"id":683,"term":"Mawlid","phrase":"Prophet\'s Birthday","meaning":"The commemoration of the birth of Prophet Muhammad, observed by some Muslims.","example":"The community celebrated Mawlid with recitations.","reference":"Hadith: Sunan an-Nasa\'i 1.213"},{"id":684,"term":"Isra wa Mi\'raj","phrase":"Night Journey and Ascension","meaning":"The miraculous journey of Prophet Muhammad from Mecca to Jerusalem and to the heavens.","example":"The Isra wa Mi\'raj is celebrated for its spiritual significance.","reference":"Qur\'an 17:1"},{"id":690,"term":"Khilafah","phrase":"Caliphate","meaning":"The Islamic system of governance led by a Caliph after the Prophet\'s death.","example":"The Khilafah ensured the spread of Islamic teachings.","reference":"Qur\'an 24:55"},{"id":691,"term":"Khalifah","phrase":"Caliph","meaning":"The leader of the Muslim community, succeeding the Prophet in governance.","example":"The Khalifah upheld justice in the Islamic state.","reference":"Qur\'an 2:30"},{"id":695,"term":"Mubahala","phrase":"Mutual Cursing","meaning":"A form of resolving disputes by invoking Allah\'s curse on the liar, historically significant in Islam.","example":"The Prophet proposed Mubahala to settle a dispute with Christians.","reference":"Qur\'an 3:61"},{"id":696,"term":"Da\'wah","phrase":"Invitation","meaning":"The act of inviting others to Islam or calling them to righteousness.","example":"She engaged in Da\'wah by sharing Islamic teachings with her neighbors.","reference":"Qur\'an 16:125"},{"id":697,"term":"Tabligh","phrase":"Conveying","meaning":"The act of spreading the message of Islam, often associated with missionary work.","example":"He joined a Tabligh group to promote Islamic values.","reference":"Qur\'an 3:104"},{"id":698,"term":"Islah","phrase":"Reform","meaning":"The act of improving or correcting oneself or society in accordance with Islamic principles.","example":"The organization worked for Islah in the community.","reference":"Qur\'an 11:88"},{"id":699,"term":"Mujaddid","phrase":"Reformer","meaning":"A scholar or leader believed to appear every century to revive Islamic teachings.","example":"The scholar was considered a Mujaddid of his time.","reference":"Hadith: Sunan Abu Dawood 14.4291"},{"id":701,"term":"Bayt al-Mal","phrase":"Treasury","meaning":"The public treasury in an Islamic state, used for welfare and governance.","example":"Zakat funds were managed through the Bayt al-Mal.","reference":"Qur\'an 9:60"},{"id":702,"term":"Ghanimah","phrase":"War Booty","meaning":"Spoils of war distributed according to Islamic law among fighters and the community.","example":"The Ghanimah was divided as per Shari\'ah guidelines.","reference":"Qur\'an 8:41"},{"id":703,"term":"Fay","phrase":"Spoils Without Fighting","meaning":"Property acquired from non-Muslims without battle, distributed for public welfare.","example":"The Fay was used to support the needy in the community.","reference":"Qur\'an 59:7"},{"id":704,"term":"Khums","phrase":"One-Fifth Tax","meaning":"A tax of one-fifth on certain types of wealth, such as war booty, in some Islamic traditions.","example":"The Khums was allocated to the Prophet\'s family and the poor.","reference":"Qur\'an 8:41"},{"id":705,"term":"Ushr","phrase":"Tithe","meaning":"A tax of one-tenth on agricultural produce, payable as Zakat in some cases.","example":"Farmers paid Ushr on their harvested crops.","reference":"Qur\'an 2:267"},{"id":706,"term":"Zakat al-Fitr","phrase":"Charity of Breaking the Fast","meaning":"A mandatory charity given at the end of Ramadan to purify the fast and help the poor celebrate Eid.","example":"She paid Zakat al-Fitr before the Eid prayer.","reference":"Hadith: Sahih al-Bukhari 2.25.579"},{"id":707,"term":"Taraweeh","phrase":"Night Prayers","meaning":"Voluntary prayers performed at night during Ramadan, typically in congregation.","example":"He joined the Taraweeh prayers at the mosque every evening.","reference":"Hadith: Sahih al-Bukhari 2.15.73"},{"id":708,"term":"Qiyam al-Layl","phrase":"Night Vigil Prayer","meaning":"Voluntary prayers performed during the night, especially in the last third of the night.","example":"She woke up for Qiyam al-Layl to seek Allah\'s forgiveness.","reference":"Qur\'an 73:2"},{"id":709,"term":"Tahajjud","phrase":"Late Night Prayer","meaning":"A specific type of Qiyam al-Layl, a voluntary prayer performed after sleeping at night.","example":"He prayed Tahajjud to seek blessings for his family.","reference":"Qur\'an 17:79"},{"id":710,"term":"Witr","phrase":"Odd-Numbered Prayer","meaning":"A voluntary prayer performed at night, typically with an odd number of Rak\'ah.","example":"She concluded her night prayers with Witr.","reference":"Hadith: Sahih Muslim 4.751"},{"id":711,"term":"Salat al-Duha","phrase":"Forenoon Prayer","meaning":"A voluntary prayer performed in the late morning, also known as the Chastity prayer.","example":"He prayed Salat al-Duha to seek Barakah in his day.","reference":"Hadith: Sahih Muslim 4.748"},{"id":712,"term":"Salat al-Istikhara","phrase":"Prayer for Guidance","meaning":"A two-Rak\'ah prayer followed by a specific Du\'a to seek Allah\'s guidance in decision-making.","example":"She performed Salat al-Istikhara before choosing her career path.","reference":"Hadith: Sahih al-Bukhari 7.71.638"},{"id":713,"term":"Salat al-Janazah","phrase":"Funeral Prayer","meaning":"A congregational prayer performed for the deceased before burial.","example":"The community gathered for Salat al-Janazah at the mosque.","reference":"Hadith: Sahih al-Bukhari 2.23.337"},{"id":714,"term":"Ghusl al-Mayyit","phrase":"Washing the Deceased","meaning":"The ritual washing of a deceased Muslim\'s body before burial.","example":"The family performed Ghusl al-Mayyit with care and respect.","reference":"Hadith: Sahih al-Bukhari 2.23.345"},{"id":715,"term":"Kafan","phrase":"Shroud","meaning":"The cloth used to wrap a deceased Muslim\'s body for burial.","example":"They prepared a simple Kafan for the burial.","reference":"Hadith: Sahih al-Bukhari 2.23.354"},{"id":716,"term":"Jumu\'ah","phrase":"Friday Prayer","meaning":"The congregational prayer held every Friday, replacing the Dhuhr prayer.","example":"He attended the Jumu\'ah prayer at the local mosque.","reference":"Qur\'an 62:9"},{"id":717,"term":"Khutbah","phrase":"Sermon","meaning":"The sermon delivered during Jumu\'ah or Eid prayers, addressing religious and social issues.","example":"The Imam\'s Khutbah inspired the congregation to give charity.","reference":"Hadith: Sahih al-Bukhari 2.13.56"},{"id":718,"term":"Masjid","phrase":"Mosque","meaning":"A place of worship where Muslims perform prayers and community activities.","example":"The Masjid was filled with worshippers for Taraweeh.","reference":"Qur\'an 9:18"},{"id":719,"term":"Mihrab","phrase":"Prayer Niche","meaning":"A niche in a mosque indicating the direction of the Ka\'bah (Qiblah).","example":"The Imam stood in the Mihrab to lead the prayer.","reference":"Qur\'an 3:37"},{"id":720,"term":"Minbar","phrase":"Pulpit","meaning":"The raised platform in a mosque from which the Imam delivers the Khutbah.","example":"The Imam ascended the Minbar to deliver the Friday sermon.","reference":"Hadith: Sahih al-Bukhari 2.13.56"},{"id":721,"term":"Qiblah","phrase":"Direction of Prayer","meaning":"The direction toward the Ka\'bah in Mecca, faced during Salah.","example":"He adjusted his prayer mat to face the Qiblah.","reference":"Qur\'an 2:144"},{"id":722,"term":"Sutra","phrase":"Barrier","meaning":"An object placed in front of a praying person to mark their prayer space.","example":"He placed a chair as a Sutra during his prayer.","reference":"Hadith: Sahih al-Bukhari 1.9.473"},{"id":723,"term":"Tayammum","phrase":"Dry Ablution","meaning":"A ritual purification using clean earth or dust when water is unavailable.","example":"She performed Tayammum in the desert before praying.","reference":"Qur\'an 4:43"},{"id":724,"term":"Janabah","phrase":"State of Major Impurity","meaning":"A state of ritual impurity requiring Ghusl, caused by specific acts like marital relations.","example":"He performed Ghusl to purify himself from Janabah.","reference":"Qur\'an 5:6"},{"id":725,"term":"Najis","phrase":"Impure","meaning":"Something considered ritually impure in Islam, requiring cleansing.","example":"She cleaned the Najis substance from her clothes before praying.","reference":"Hadith: Sahih Muslim 2.291"},{"id":726,"term":"Taharat","phrase":"Purity","meaning":"The state of ritual and spiritual purity required for acts of worship.","example":"Taharat is essential before performing Salah.","reference":"Qur\'an 5:6"},{"id":727,"term":"Istinja","phrase":"Cleansing After Relieving Oneself","meaning":"The act of cleaning oneself with water or stones after using the bathroom.","example":"He performed Istinja to maintain cleanliness before Wudu.","reference":"Hadith: Sahih al-Bukhari 1.4.157"},{"id":728,"term":"Istihada","phrase":"Irregular Bleeding","meaning":"Non-menstrual bleeding in women, which does not prevent prayer or fasting.","example":"She continued praying during Istihada after consulting a scholar.","reference":"Hadith: Sahih al-Bukhari 1.6.303"},{"id":729,"term":"Nifas","phrase":"Postpartum Bleeding","meaning":"The bleeding experienced by a woman after childbirth, during which she is exempt from Salah.","example":"She resumed praying after her Nifas period ended.","reference":"Hadith: Sahih Muslim 1.477"},{"id":730,"term":"Haid","phrase":"Menstruation","meaning":"The monthly menstrual cycle, during which women are exempt from Salah and fasting.","example":"She paused fasting during Haid and made up the days later.","reference":"Qur\'an 2:222"},{"id":731,"term":"Sunnah Mu\'akkadah","phrase":"Emphasized Sunnah","meaning":"Voluntary acts regularly performed by the Prophet, strongly recommended for Muslims.","example":"He never missed the Sunnah Mu\'akkadah prayers before Dhuhr.","reference":"Hadith: Sahih al-Bukhari 2.13.1183"},{"id":732,"term":"Sunnah Ghair Mu\'akkadah","phrase":"Non-Emphasized Sunnah","meaning":"Voluntary acts occasionally performed by the Prophet, less emphasized than Mu\'akkadah.","example":"She performed Sunnah Ghair Mu\'akkadah prayers when she had time.","reference":"Hadith: Sahih Muslim 4.1162"},{"id":733,"term":"Nafilah","phrase":"Supererogatory Acts","meaning":"Voluntary acts of worship beyond obligatory requirements, such as extra prayers.","example":"He prayed Nafilah to gain extra rewards.","reference":"Hadith: Sahih Muslim 4.1163"},{"id":735,"term":"Fasiq","phrase":"Sinner","meaning":"A Muslim who commits major sins but does not deny faith.","example":"The Fasiq was urged to repent for his actions.","reference":"Qur\'an 49:6"},{"id":736,"term":"Murtadd","phrase":"Apostate","meaning":"A person who abandons Islam after accepting it, considered a serious offense.","example":"Scholars advised counseling for the Murtadd to return to faith.","reference":"Qur\'an 2:217"},{"id":737,"term":"Riddah","phrase":"Apostasy","meaning":"The act of renouncing or abandoning the Islamic faith.","example":"Riddah is addressed with guidance and compassion in Islam.","reference":"Qur\'an 2:217"},{"id":738,"term":"Takfir","phrase":"Declaring Disbelief","meaning":"The act of declaring someone a disbeliever, a sensitive issue requiring scholarly caution.","example":"Takfir is avoided without clear evidence due to its gravity.","reference":"Qur\'an 4:94"},{"id":739,"term":"Irtidad","phrase":"Apostasy","meaning":"Another term for Riddah, the act of leaving Islam.","example":"Irtidad is considered a serious matter in Islamic law.","reference":"Qur\'an 2:217"},{"id":740,"term":"Mushrik","phrase":"Polytheist","meaning":"A person who commits Shirk by associating partners with Allah.","example":"The Qur\'an calls the Mushrik to worship Allah alone.","reference":"Qur\'an 6:106"},{"id":747,"term":"Ahl al-Fatwa","phrase":"People of Legal Opinion","meaning":"Scholars qualified to issue religious rulings or Fatwas.","example":"The Ahl al-Fatwa provided guidance on modern issues.","reference":"Qur\'an 4:59"},{"id":748,"term":"Ahl al-Hadith","phrase":"People of Hadith","meaning":"Scholars or groups emphasizing the importance of Hadith in Islamic law and practice.","example":"The Ahl al-Hadith prioritized authentic narrations in their rulings.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":749,"term":"Ahl as-Sunnah","phrase":"People of the Sunnah","meaning":"Muslims who adhere to the Sunnah and mainstream Islamic beliefs.","example":"Ahl as-Sunnah follow the teachings of the Prophet and his companions.","reference":"Qur\'an 3:110"},{"id":750,"term":"Ittihad","phrase":"Unity","meaning":"The concept of unity among Muslims, emphasizing solidarity and cooperation.","example":"Ittihad was emphasized during the community\'s charity drive.","reference":"Qur\'an 3:103"},{"id":751,"term":"Ikhtilaf","phrase":"Difference of Opinion","meaning":"Legitimate scholarly disagreement on Islamic rulings, respected in Islamic tradition.","example":"The Ikhtilaf among scholars allowed flexibility in practice.","reference":"Qur\'an 4:59"},{"id":752,"term":"Tawatur","phrase":"Mass Transmission","meaning":"The highest level of Hadith authenticity, transmitted by many narrators at each level.","example":"The Hadith about Salah is considered Tawatur.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":766,"term":"Mursal","phrase":"Disconnected Hadith","meaning":"A Hadith where a narrator omits the name of the Companion, reducing its reliability.","example":"The Mursal Hadith was carefully evaluated by scholars.","reference":"Hadith: Sunan at-Tirmidhi 1.1.1"},{"id":767,"term":"Mu\'allaq","phrase":"Suspended Hadith","meaning":"A Hadith missing one or more narrators at the beginning of its chain.","example":"The Mu\'allaq Hadith required further verification.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":768,"term":"Musnad","phrase":"Supported Hadith","meaning":"A Hadith with a complete chain of narration traced back to the Prophet.","example":"The Musnad Hadith was used as a reliable source.","reference":"Hadith: Sahih al-Bukhari 1.1.3"},{"id":769,"term":"Marfu","phrase":"Elevated Hadith","meaning":"A Hadith directly attributed to the Prophet, regardless of the chain\'s strength.","example":"The Marfu Hadith provided clear guidance on fasting.","reference":"Hadith: Sahih Muslim 1.1"},{"id":770,"term":"Mawquf","phrase":"Stopped Hadith","meaning":"A Hadith attributed to a Companion, not the Prophet, but still valuable.","example":"The Mawquf Hadith reflected the Companion\'s understanding.","reference":"Hadith: Sahih Muslim 1.1"},{"id":771,"term":"Maqtu","phrase":"Cut-Off Hadith","meaning":"A narration attributed to a Successor (Tabi\'i), not the Prophet or a Companion.","example":"The Maqtu narration offered historical context.","reference":"Hadith: Sunan at-Tirmidhi 1.1.1"},{"id":772,"term":"Hikmah","phrase":"Wisdom","meaning":"The ability to make sound judgments and decisions based on Islamic knowledge.","example":"Her Hikmah guided her in resolving disputes peacefully.","reference":"Qur\'an 2:269"},{"id":773,"term":"Ilm","phrase":"Knowledge","meaning":"Islamic knowledge, particularly of the Qur\'an, Sunnah, and religious sciences.","example":"He sought Ilm by studying under a scholar.","reference":"Qur\'an 20:114"},{"id":774,"term":"Aql","phrase":"Intellect","meaning":"The faculty of reasoning and understanding, valued in Islamic thought.","example":"She used her Aql to interpret the Hadith correctly.","reference":"Qur\'an 2:44"},{"id":775,"term":"Tarbiyah","phrase":"Upbringing","meaning":"The process of raising and educating individuals in accordance with Islamic values.","example":"Her Tarbiyah ensured her children grew up with strong faith.","reference":"Qur\'an 17:24"},{"id":776,"term":"Akhlaq","phrase":"Moral Character","meaning":"The practice of virtuous behavior and ethics in Islam.","example":"His Akhlaq earned him respect in the community.","reference":"Qur\'an 68:4"},{"id":780,"term":"Sabr","phrase":"Patience","meaning":"Enduring trials and difficulties with steadfastness and faith in Allah.","example":"She showed Sabr during her illness, trusting Allah\'s plan.","reference":"Qur\'an 2:153"},{"id":781,"term":"Shukr","phrase":"Gratitude","meaning":"Expressing thankfulness to Allah for His blessings.","example":"He practiced Shukr by giving charity after receiving a promotion.","reference":"Qur\'an 14:7"},{"id":782,"term":"Rida","phrase":"Contentment","meaning":"Being pleased and satisfied with Allah\'s decrees, whether good or bad.","example":"Her Rida with Allah\'s will brought her peace.","reference":"Qur\'an 9:59"},{"id":783,"term":"Zuhd","phrase":"Asceticism","meaning":"Detachment from worldly pleasures in pursuit of spiritual goals.","example":"His Zuhd led him to live a simple, devout life.","reference":"Qur\'an 57:20"},{"id":784,"term":"Wara","phrase":"Scrupulousness","meaning":"Extreme caution in avoiding doubtful or sinful matters.","example":"Her Wara kept her from consuming questionable food.","reference":"Hadith: Sahih Muslim 4.1599"},{"id":798,"term":"Ijtihad","phrase":"Independent Reasoning","meaning":"Exertion by a qualified jurist to derive legal rulings from the primary sources when no clear text exists.","example":"The scholar exercised Ijtihad to address a modern financial issue.","reference":"Qur\'an 39:18"},{"id":799,"term":"Mujtahid","phrase":"Qualified Jurist","meaning":"A scholar qualified to perform Ijtihad based on mastery of Islamic legal sources and methodology.","example":"Only a Mujtahid can derive new rulings in unprecedented cases.","reference":"Usul al-Fiqh (Juristic Principle)"},{"id":801,"term":"Mufti","phrase":"Issuer of Fatwa","meaning":"A qualified scholar who issues Fatwas based on the Qur\'an, Sunnah, and juristic principles.","example":"The Mufti clarified the ruling on the new practice.","reference":"Usul al-Fiqh (Juristic Role)"},{"id":802,"term":"Qadi","phrase":"Judge","meaning":"A judge who adjudicates disputes and applies Islamic law in courts.","example":"The Qadi ruled according to evidence and Shari\'ah.","reference":"Qur\'an 38:26"},{"id":803,"term":"Hudud","phrase":"Fixed Penalties","meaning":"Punishments specified by Shari\'ah for certain crimes, intended to protect society and deter wrongdoing.","example":"Hudud are applied with strict evidentiary standards.","reference":"Qur\'an 24:2"},{"id":804,"term":"Qisas","phrase":"Law of Retaliation","meaning":"Retribution in cases of murder or bodily harm, with the option of forgiveness and compensation.","example":"The family chose forgiveness over Qisas, accepting compensation.","reference":"Qur\'an 2:178"},{"id":805,"term":"Diyah","phrase":"Blood Money","meaning":"Financial compensation paid to a victim or their family in cases of accidental or certain intentional harms.","example":"Diyah was agreed upon in the accidental injury case.","reference":"Qur\'an 4:92"},{"id":806,"term":"Ta\'zir","phrase":"Discretionary Punishment","meaning":"Punishments left to the judge\'s discretion for offenses without fixed penalties.","example":"The Qadi imposed a Ta\'zir penalty suited to the circumstances.","reference":"Fiqh (Judicial Discretion)"},{"id":807,"term":"Halal","phrase":"Permissible","meaning":"Actions and consumables that are lawful according to Islamic law.","example":"They verified the ingredients to ensure the food was Halal.","reference":"Qur\'an 2:168"},{"id":809,"term":"Makruh","phrase":"Disliked","meaning":"Acts discouraged by Islamic law; avoiding them is rewarded, but doing them is not sinful in most cases.","example":"Wasting water during ablution is Makruh.","reference":"Fiqh (Juristic Classification)"},{"id":810,"term":"Mustahabb","phrase":"Recommended","meaning":"Acts encouraged by Islamic law; performing them is rewarded but omitting them is not sinful.","example":"Smiling at others is Mustahabb.","reference":"Fiqh (Juristic Classification)"},{"id":812,"term":"Wajib","phrase":"Mandatory (Hanafi Usage)","meaning":"An obligatory act, often used in the Hanafi school for duties established by less definitive evidence than Fard.","example":"Witr prayer is considered Wajib in the Hanafi school.","reference":"Fiqh (Hanafi Terminology)"},{"id":813,"term":"Sunnah (Fiqh)","phrase":"Prophetic Practice","meaning":"A recommended practice established by the Prophet\'s teachings, actions, or approvals.","example":"Using the miswak before prayer is Sunnah.","reference":"Qur\'an 33:21"},{"id":814,"term":"Nafl","phrase":"Supererogatory Act","meaning":"Voluntary acts of worship performed in addition to obligatory duties.","example":"He prayed Nafl after the obligatory prayer.","reference":"Qur\'an 17:79"},{"id":815,"term":"Fitrah","phrase":"Natural Disposition","meaning":"The innate nature with which Allah created humankind, inclined toward truth and goodness.","example":"Islam aligns with the Fitrah of the human being.","reference":"Qur\'an 30:30"},{"id":816,"term":"Sadaqah Jariyah","phrase":"Ongoing Charity","meaning":"A continuous charity whose rewards persist after one\'s death.","example":"Building a well is Sadaqah Jariyah benefiting generations.","reference":"Hadith: Sahih Muslim 1631"},{"id":817,"term":"Waqf","phrase":"Endowment","meaning":"A perpetual charitable endowment dedicated for public benefit in accordance with Shari\'ah.","example":"They established a Waqf to fund education for the needy.","reference":"Hadith: Sahih Muslim 1632"},{"id":818,"term":"Bay\'ah","phrase":"Pledge of Allegiance","meaning":"A pledge of loyalty and obedience, historically given to a leader in accordance with Islamic principles.","example":"The companions gave Bay\'ah to the Prophet under the tree.","reference":"Qur\'an 48:10"},{"id":819,"term":"Shura","phrase":"Consultation","meaning":"Deliberation and mutual consultation in decision-making among the community.","example":"The council practiced Shura before finalizing the policy.","reference":"Qur\'an 42:38"},{"id":820,"term":"Wasatiyyah","phrase":"Moderation","meaning":"The balanced, middle path in beliefs and actions, avoiding extremes.","example":"Wasatiyyah guided them to a balanced lifestyle.","reference":"Qur\'an 2:143"},{"id":821,"term":"Maqasid al-Shari\'ah","phrase":"Objectives of the Law","meaning":"The overarching aims of Islamic law: preservation of religion, life, intellect, lineage, and property.","example":"The policy was evaluated through the lens of Maqasid al-Shari\'ah.","reference":"Fiqh (Legal Theory)"},{"id":822,"term":"Taysir","phrase":"Facilitation/Ease","meaning":"The principle of ease and removal of hardship within the bounds of Shari\'ah.","example":"Travelers may shorten prayers as part of Taysir.","reference":"Qur\'an 2:185"},{"id":823,"term":"Tasawwuf","phrase":"Islamic Spirituality","meaning":"The science of purifying the heart and drawing nearer to Allah through remembrance, sincerity, and good character.","example":"Tasawwuf emphasizes sincerity and remembrance in daily life.","reference":"Qur\'an 62:2"},{"id":824,"term":"Tawbah","phrase":"Repentance","meaning":"Turning back to Allah with remorse, abandoning sin, and resolving not to return to it.","example":"He made Tawbah and sought to rectify his mistakes.","reference":"Qur\'an 66:8"},{"id":827,"term":"Husn al-Dhann","phrase":"Good Opinion","meaning":"Having a positive assumption about Allah and fellow Muslims unless proven otherwise.","example":"She maintained Husn al-Dhann and avoided rash judgments.","reference":"Hadith: Sahih al-Bukhari 6064"},{"id":828,"term":"Birr al-Walidayn","phrase":"Kindness to Parents","meaning":"Exemplary goodness, respect, and care shown to one\'s parents.","example":"He visited his parents daily to uphold Birr al-Walidayn.","reference":"Qur\'an 17:23"},{"id":829,"term":"Silat ar-Rahim","phrase":"Maintaining Kinship Ties","meaning":"Keeping and nurturing family relations through support and communication.","example":"She practiced Silat ar-Rahim by reconciling with relatives.","reference":"Qur\'an 47:22-23"},{"id":830,"term":"Istishab","phrase":"Presumption of Continuity","meaning":"A juristic principle that a known state is presumed to continue until evidence shows otherwise.","example":"Istishab was applied where no new evidence was available.","reference":"Usul al-Fiqh (Legal Maxims)"},{"id":831,"term":"Khushu\'","phrase":"Humble Focus in Prayer","meaning":"A state of humility, presence, and attentiveness in worship, especially during Salah.","example":"He prayed with Khushu\', avoiding distractions and whisperings.","reference":"Qur\'an 23:1-2"},{"id":832,"term":"Sidq","phrase":"Truthfulness","meaning":"Being truthful in speech and actions, aligning words with reality and intention.","example":"Her Sidq earned everyone\'s trust at work.","reference":"Qur\'an 9:119"},{"id":833,"term":"Qist","phrase":"Equity/Fairness","meaning":"Upright justice and equity in dealings, judgments, and testimony.","example":"He adhered to Qist when resolving the dispute.","reference":"Qur\'an 4:135"},{"id":834,"term":"Muamalat","phrase":"Social and Financial Dealings","meaning":"The branch of Islamic law governing transactions and interpersonal dealings.","example":"Their contract complied with Muamalat principles, avoiding uncertainty and interest.","reference":"Fiqh (Transactions)"},{"id":835,"term":"Aqidah","phrase":"Creed/Belief","meaning":"Core Islamic beliefs regarding Allah, His attributes, angels, scriptures, messengers, the Last Day, and destiny.","example":"Studying Aqidah strengthened his understanding of Tawhid.","reference":"Qur\'an 2:285"},{"id":836,"term":"Qana\'ah","phrase":"Contented Sufficiency","meaning":"Inner contentment with what Allah provides, free of greed and envy.","example":"Her Qana\'ah kept her grateful despite modest means.","reference":"Hadith: Tirmidhi 2348"},{"id":837,"term":"Ubudiyyah","phrase":"Servitude to Allah","meaning":"Loving submission and worship of Allah in all aspects of life.","example":"He viewed work and family as part of his Ubudiyyah to Allah.","reference":"Qur\'an 51:56"},{"id":838,"term":"Itqan","phrase":"Proficient Excellence","meaning":"Doing work with mastery and thoroughness for Allah\'s sake.","example":"She pursued Itqan by refining her craft daily.","reference":"Hadith: al-Bayhaqi Shu\'ab al-Iman 5314"},{"id":839,"term":"Ukhuwah","phrase":"Brotherhood/Sisterhood","meaning":"The bond of faith that obligates mutual love, support, and mercy among Muslims.","example":"Ukhuwah inspired the community to aid the needy.","reference":"Qur\'an 49:10"},{"id":840,"term":"Ithar","phrase":"Altruism","meaning":"Preferring others over oneself, even when in need.","example":"They showed Ithar by donating despite limited resources.","reference":"Qur\'an 59:9"},{"id":841,"term":"Tawadu\'","phrase":"Humility","meaning":"Humbleness before Allah and people, avoiding arrogance and self-importance.","example":"His Tawadu\' made him approachable to everyone.","reference":"Qur\'an 25:63"},{"id":842,"term":"Rifq","phrase":"Gentleness","meaning":"Kindness and softness in dealing with others, avoiding harshness.","example":"She chose Rifq when advising her friend.","reference":"Hadith: Sahih Muslim 2593"},{"id":843,"term":"Hilm","phrase":"Forbearance","meaning":"Self-restraint and calmness in the face of provocation.","example":"He responded with Hilm instead of anger.","reference":"Qur\'an 16:125"},{"id":844,"term":"Ghadab","phrase":"Anger","meaning":"A strong emotion to be controlled within ethical bounds to prevent harm.","example":"He managed his Ghadab by remaining silent and seeking refuge in Allah.","reference":"Hadith: Sahih al-Bukhari 6116"},{"id":845,"term":"Su\' al-Dhann","phrase":"Bad Suspicion","meaning":"Harboring negative assumptions about others without evidence, which is prohibited.","example":"She avoided Su\' al-Dhann and verified the news first.","reference":"Qur\'an 49:12"},{"id":846,"term":"Qunut","phrase":"Supplication in Prayer","meaning":"A supplication recited in certain prayers, such as Witr or during calamities.","example":"The imam made Qunut in the Witr prayer.","reference":"Hadith: Abu Dawud 1425"},{"id":847,"term":"Istikhara","phrase":"Guidance Prayer","meaning":"A prayer seeking Allah\'s guidance when making decisions.","example":"She performed Istikhara before accepting the job offer.","reference":"Hadith: Sahih al-Bukhari 1162"},{"id":848,"term":"Muraqabah","phrase":"Spiritual Vigilance","meaning":"Conscious awareness that Allah observes one\'s actions and inner states.","example":"Practicing Muraqabah helped him avoid sin in private.","reference":"Qur\'an 50:16"},{"id":849,"term":"Muhasabah","phrase":"Self-Accountability","meaning":"Regularly evaluating one\'s deeds and intentions to improve spiritually.","example":"Her nightly Muhasabah led to sincere repentance.","reference":"Qur\'an 59:18"},{"id":850,"term":"Husn al-Khuluq","phrase":"Good Character","meaning":"Excellence in manners, kindness, and dealing with people.","example":"His Husn al-Khuluq made him beloved in the community.","reference":"Hadith: Tirmidhi 2003"},{"id":851,"term":"Husn al-Khitam","phrase":"Good Ending","meaning":"Dying upon faith and obedience, concluding life with righteousness.","example":"They prayed for Husn al-Khitam for their parents.","reference":"Hadith: Ahmad 8508"},{"id":852,"term":"Wafa\'","phrase":"Fulfilling Promises","meaning":"Keeping covenants and being true to one\'s word.","example":"His Wafa\' in business built long-term trust.","reference":"Qur\'an 16:91"},{"id":853,"term":"Ahd","phrase":"Covenant","meaning":"A solemn promise or binding agreement, especially with Allah.","example":"She honored her Ahd and delivered the work on time.","reference":"Qur\'an 17:34"},{"id":854,"term":"Fiqh al-Awlawiyyat","phrase":"Jurisprudence of Priorities","meaning":"Placing actions and rulings in their proper order of importance.","example":"Fiqh al-Awlawiyyat guided resource allocation to essential needs first.","reference":"Fiqh (Methodology)"},{"id":855,"term":"Darurah","phrase":"Necessity","meaning":"A state of necessity that can permit normally prohibited matters to preserve life or essential interests.","example":"Eating the prohibited food became permissible due to Darurah.","reference":"Qur\'an 2:173"},{"id":856,"term":"Istita\'ah","phrase":"Capability","meaning":"Ability and means required to perform an obligation, such as Hajj.","example":"Hajj is required only with Istita\'ah of health and finances.","reference":"Qur\'an 3:97"},{"id":857,"term":"Amr bil Ma\'ruf","phrase":"Enjoining Good","meaning":"Encouraging and commanding what is recognized as good in Islam.","example":"He practiced Amr bil Ma\'ruf with wisdom and patience.","reference":"Qur\'an 3:104"},{"id":858,"term":"Nahi \'an al-Munkar","phrase":"Forbidding Evil","meaning":"Discouraging and preventing wrongdoing within ethical guidelines.","example":"They performed Nahi \'an al-Munkar without harshness.","reference":"Qur\'an 3:104"},{"id":859,"term":"Jiwar","phrase":"Neighborly Rights","meaning":"The rights and good treatment owed to neighbors in Islam.","example":"She honored Jiwar by regularly checking on her elderly neighbor.","reference":"Hadith: Sahih al-Bukhari 6010"},{"id":860,"term":"Adab al-Ikhtilaf","phrase":"Etiquette of Disagreement","meaning":"Principles and manners for disagreeing respectfully while seeking truth.","example":"Adab al-Ikhtilaf kept the debate courteous and fruitful.","reference":"Fiqh (Scholarly Etiquette)"},{"id":861,"term":"Sulh","phrase":"Reconciliation","meaning":"An amicable settlement to end disputes and restore harmony.","example":"The families reached Sulh through mediation.","reference":"Qur\'an 49:10"},{"id":862,"term":"Taharah","phrase":"Purification","meaning":"Ritual and physical cleanliness required for many acts of worship.","example":"He ensured Taharah before starting the prayer.","reference":"Qur\'an 5:6"},{"id":863,"term":"Najasah","phrase":"Impurity","meaning":"Substances considered ritually impure that must be avoided or cleansed.","example":"She removed Najasah from her clothes before prayer.","reference":"Fiqh (Purification)"},{"id":864,"term":"Siwak","phrase":"Tooth-Stick","meaning":"A natural twig used to clean teeth, recommended in Sunnah.","example":"He used the Siwak before Salah.","reference":"Hadith: Sahih al-Bukhari 887"},{"id":865,"term":"Sutrah","phrase":"Prayer Barrier","meaning":"An object placed in front of a praying person to prevent interruption.","example":"He set a chair as a Sutrah during prayer in public.","reference":"Hadith: Abu Dawud 698"},{"id":866,"term":"Satr al-\'Awrah","phrase":"Covering the \'Awrah","meaning":"Obligation to cover parts of the body that must not be exposed.","example":"Modest clothing fulfills Satr al-\'Awrah in public.","reference":"Qur\'an 24:31"},{"id":867,"term":"\'Awrah","phrase":"Private Parts","meaning":"Body areas that must be covered according to Islamic law.","example":"He ensured his \'Awrah was covered before prayer.","reference":"Qur\'an 7:26"},{"id":868,"term":"Khimar","phrase":"Head Cover","meaning":"A covering worn by women that drapes over the head and chest.","example":"She wore a Khimar in accordance with her beliefs.","reference":"Qur\'an 24:31"},{"id":869,"term":"Hijab","phrase":"Modest Covering","meaning":"The general concept and practice of modest dress and behavior.","example":"Hijab encompasses character as well as clothing.","reference":"Qur\'an 33:59"},{"id":870,"term":"Jilbab","phrase":"Outer Garment","meaning":"A loose outer garment worn by women for modesty.","example":"She chose a Jilbab that was opaque and loose.","reference":"Qur\'an 33:59"},{"id":871,"term":"Niqab","phrase":"Face Veil","meaning":"A veil covering the face, worn by some Muslim women as part of modest dress.","example":"Her Niqab was part of her personal practice of modesty.","reference":"Fiqh (Dress)"},{"id":872,"term":"I\'tikaf","phrase":"Retreat in Mosque","meaning":"Seclusion in a mosque for worship, often in the last ten nights of Ramadan.","example":"He observed I\'tikaf seeking Laylat al-Qadr.","reference":"Qur\'an 2:187"},{"id":873,"term":"Suhur","phrase":"Pre-Dawn Meal","meaning":"The meal consumed before dawn during fasting days in Ramadan.","example":"They woke early for Suhur to prepare for fasting.","reference":"Hadith: Sahih al-Bukhari 1923"},{"id":874,"term":"Kaffarah","phrase":"Expiation","meaning":"Compensatory acts or payments to atone for certain violations, such as breaking an oath or fast.","example":"Feeding the poor served as Kaffarah for his broken oath.","reference":"Qur\'an 5:89"},{"id":875,"term":"Fidya","phrase":"Compensation","meaning":"A compensatory payment or feeding for those unable to fulfill certain obligations like fasting.","example":"She gave Fidya due to chronic illness in Ramadan.","reference":"Qur\'an 2:184"},{"id":876,"term":"Nadhr","phrase":"Vow","meaning":"A pledge made to perform a specific act of worship or charity if a condition occurs.","example":"He fulfilled his Nadhr by sponsoring an orphan.","reference":"Qur\'an 76:7"},{"id":877,"term":"Aqiqah","phrase":"Newborn Sacrifice","meaning":"A recommended sacrifice performed upon the birth of a child, with distribution of meat to the needy.","example":"They arranged an Aqiqah on the seventh day after birth.","reference":"Hadith: Abu Dawud 2838"},{"id":878,"term":"Udhiyah","phrase":"Ritual Sacrifice","meaning":"The Eid al-Adha sacrifice performed by those able, distributing meat to family and the poor.","example":"Their Udhiyah was shared with neighbors and the needy.","reference":"Qur\'an 22:36"},{"id":879,"term":"Hady","phrase":"Hajj Sacrificial Animal","meaning":"An animal offered in sacrifice as part of certain Hajj and Umrah rituals.","example":"Pilgrims arranged the Hady during tamattu\' Hajj.","reference":"Qur\'an 2:196"},{"id":880,"term":"Tarawih","phrase":"Ramadan Night Prayer","meaning":"Special congregational prayers performed after Isha during Ramadan.","example":"They prayed Tarawih at the mosque each night.","reference":"Hadith: Sahih al-Bukhari 2009"},{"id":881,"term":"Duha","phrase":"Forenoon Prayer","meaning":"A voluntary prayer offered after sunrise and before noon.","example":"She prayed Salat al-Duha on weekends.","reference":"Hadith: Muslim 720"},{"id":882,"term":"Istisqa","phrase":"Prayer for Rain","meaning":"A special prayer seeking rain during drought or need.","example":"The community gathered for Salat al-Istisqa in the field.","reference":"Hadith: Abu Dawud 1165"},{"id":883,"term":"Qasr","phrase":"Shortening Prayer","meaning":"Shortening the four-unit prayers to two units while traveling.","example":"He performed Qasr during his business trip.","reference":"Qur\'an 4:101"},{"id":884,"term":"Jam\'","phrase":"Combining Prayers","meaning":"Combining two prayers at one time under valid circumstances like travel or rain.","example":"They did Jam\' due to heavy rain.","reference":"Hadith: Muslim 705"},{"id":885,"term":"Takbir al-Ihram","phrase":"Opening Takbir","meaning":"The initial declaration of \'Allahu Akbar\' that begins the prayer.","example":"He raised his hands for the Takbir al-Ihram.","reference":"Hadith: Abu Dawud 724"},{"id":886,"term":"Ruku\'","phrase":"Bowing in Prayer","meaning":"The prayer posture of bowing with the back straight and hands on knees.","example":"Her Ruku\' was calm and measured.","reference":"Qur\'an 22:77"},{"id":887,"term":"Sajdat as-Sahw","phrase":"Prostration of Forgetfulness","meaning":"Two prostrations performed to compensate for minor mistakes in prayer.","example":"He made Sajdat as-Sahw after omitting a tashahhud.","reference":"Hadith: Abu Dawud 1032"},{"id":888,"term":"Qada\'","phrase":"Make-Up Worship","meaning":"Performing missed obligatory prayers or fasts at a later time.","example":"She did Qada\' for the prayer she missed during travel.","reference":"Fiqh (Acts of Worship)"},{"id":889,"term":"Imsak","phrase":"Pre-Dawn Abstention","meaning":"The time of stopping food and drink before Fajr during fasting days.","example":"They practiced Imsak a few minutes before Fajr.","reference":"Fiqh (Fasting)"},{"id":890,"term":"Nisab","phrase":"Zakat Threshold","meaning":"Minimum amount of wealth that makes Zakat obligatory.","example":"His savings reached the Nisab for Zakat.","reference":"Fiqh (Zakat)"},{"id":891,"term":"Hawl","phrase":"Lunar Year for Zakat","meaning":"Completion of a lunar year while possessing Nisab for Zakat to become due.","example":"Zakat became due after the Hawl passed.","reference":"Fiqh (Zakat)"},{"id":892,"term":"Talbiyah","phrase":"Hajj/Umrah Chant","meaning":"The proclamation recited by pilgrims after entering Ihram.","example":"The Talbiyah filled the air as pilgrims proceeded to Mina.","reference":"Hadith: Muslim 1184"},{"id":893,"term":"Miqat","phrase":"Pilgrimage Boundary","meaning":"Designated locations where pilgrims enter the state of Ihram.","example":"They entered Ihram at the Miqat before flying to Makkah.","reference":"Hadith: Sahih al-Bukhari 1524"},{"id":894,"term":"Sadd al-Dhara\'i","phrase":"Blocking the Means","meaning":"Preventing lawful means that are likely to lead to unlawful ends.","example":"The policy applied Sadd al-Dhara\'i to avoid foreseeable harm.","reference":"Usul al-Fiqh (Legal Maxims)"},{"id":895,"term":"Rukhsah","phrase":"Legal Concession","meaning":"A dispensation allowing relaxation of a ruling due to hardship or need.","example":"Travelers benefit from the Rukhsah of shortening prayers.","reference":"Qur\'an 2:185"},{"id":896,"term":"\'Azimah","phrase":"Firm Ruling","meaning":"The original strict ruling of the law, before any dispensation.","example":"He followed the \'Azimah despite the availability of a concession.","reference":"Usul al-Fiqh (Principles)"},{"id":897,"term":"Hisbah","phrase":"Public Oversight","meaning":"Institutional duty to uphold moral conduct and market fairness.","example":"The Hisbah intervened to prevent market fraud.","reference":"Qur\'an 9:71"},{"id":898,"term":"Bayyinah","phrase":"Clear Proof","meaning":"Manifest evidence or proof establishing truth or a claim.","example":"He presented Bayyinah to support his case.","reference":"Qur\'an 98:1"},{"id":899,"term":"Istiqamah","phrase":"Steadfastness","meaning":"Upright consistency in obedience and adherence to the straight path.","example":"Her Istiqamah showed in daily prayers and ethics.","reference":"Qur\'an 41:30"},{"id":900,"term":"Infaq","phrase":"Spending in Allah\'s Cause","meaning":"Charitable expenditure for the sake of Allah on family, needy, and community.","example":"They prioritized Infaq in their monthly budget.","reference":"Qur\'an 2:261"},{"id":901,"term":"Hilal","phrase":"New Crescent","meaning":"The crescent moon marking months, especially Ramadan and Shawwal.","example":"They awaited the Hilal to start fasting.","reference":"Qur\'an 2:189"},{"id":902,"term":"Mutawatir","phrase":"Mass-Transmitted","meaning":"A report transmitted by so many chains that fabrication is inconceivable.","example":"The practice is established by Mutawatir narrations.","reference":"Mustalah al-Hadith"},{"id":903,"term":"Ahad","phrase":"Solitary Report","meaning":"A hadith transmitted by fewer narrators than Mutawatir, not reaching mass-transmission.","example":"An Ahad report can be authentic and acted upon.","reference":"Mustalah al-Hadith"},{"id":904,"term":"Jarh wa Ta\'dil","phrase":"Critique and Accreditation","meaning":"The science of evaluating hadith narrators for reliability.","example":"Jarh wa Ta\'dil scholars graded the narrator trustworthy.","reference":"Hadith Sciences"},{"id":905,"term":"Salat al-Kusuf","phrase":"Solar Eclipse Prayer","meaning":"A special prayer performed during a solar eclipse.","example":"The mosque announced Salat al-Kusuf at midday.","reference":"Hadith: al-Bukhari 1040"},{"id":906,"term":"Salat al-Khusuf","phrase":"Lunar Eclipse Prayer","meaning":"A special prayer performed during a lunar eclipse.","example":"They gathered for Salat al-Khusuf after Isha.","reference":"Hadith: Muslim 901"},{"id":907,"term":"Sa\'i","phrase":"Safa–Marwah Walking","meaning":"Ritual walking between Safa and Marwah during Hajj/Umrah.","example":"They completed seven rounds of Sa\'i.","reference":"Qur\'an 2:158"},{"id":908,"term":"Rami al-Jimar","phrase":"Stoning the Pillars","meaning":"Throwing pebbles at the Jamarat in Mina during Hajj.","example":"Pilgrims performed Rami al-Jimar on the days of Tashriq.","reference":"Hadith: Muslim 1296"},{"id":909,"term":"Arafah","phrase":"Day/Plain of Arafah","meaning":"The 9th of Dhu al-Hijjah and the plain where pilgrims stand in supplication.","example":"Standing at Arafah is the heart of Hajj.","reference":"Hadith: Tirmidhi 889"},{"id":910,"term":"Halq","phrase":"Head Shaving","meaning":"Shaving the head after Hajj or Umrah.","example":"He chose Halq after completing Umrah.","reference":"Qur\'an 48:27"},{"id":911,"term":"Taqsir","phrase":"Hair Trimming","meaning":"Trimming hair as an alternative to shaving after rites.","example":"She did Taqsir instead of shaving her head.","reference":"Fiqh (Hajj/Umrah)"},{"id":912,"term":"Safa","phrase":"Mount Safa","meaning":"One of the two hills for Sa\'i in the Sacred Mosque.","example":"They began Sa\'i from Safa.","reference":"Qur\'an 2:158"},{"id":913,"term":"Marwah","phrase":"Mount Marwah","meaning":"The second hill for Sa\'i in the Sacred Mosque.","example":"They concluded Sa\'i at Marwah.","reference":"Qur\'an 2:158"},{"id":914,"term":"Hajr al-Aswad","phrase":"Black Stone","meaning":"The revered stone set in the Ka\'bah\'s eastern corner.","example":"He gestured toward the Hajr al-Aswad during Tawaf.","reference":"Hadith: Tirmidhi 961"},{"id":915,"term":"Tawarruq","phrase":"Monetization Transaction","meaning":"A finance arrangement where a commodity is bought on credit and sold for cash to obtain liquidity.","example":"The bank structured a Shari\'ah-compliant Tawarruq for the client.","reference":"Fiqh (Finance)"},{"id":916,"term":"Bay\' al-Inah","phrase":"Buy-Back Sale","meaning":"A sale with immediate buy-back; controversial in Shari\'ah compliance.","example":"Scholars differed on the permissibility of Bay\' al-Inah.","reference":"Fiqh (Finance)"},{"id":917,"term":"Kafalah","phrase":"Guarantee","meaning":"A contract where a guarantor assumes another\'s obligation.","example":"The lender accepted Kafalah from a reputable sponsor.","reference":"Fiqh (Contracts)"},{"id":918,"term":"Rahn","phrase":"Pledge/Mortgage","meaning":"A pledged asset held as security for a debt.","example":"He offered his ring as Rahn for the loan.","reference":"Qur\'an 2:283"},{"id":919,"term":"Hawalah","phrase":"Debt Transfer","meaning":"Transfer of a debt from one debtor to another.","example":"They executed Hawalah to settle the outstanding balance.","reference":"Fiqh (Contracts)"},{"id":920,"term":"Ju\'alah","phrase":"Reward Contract","meaning":"A contract promising a reward for accomplishing a specified task.","example":"He offered Ju\'alah for finding the lost property.","reference":"Fiqh (Contracts)"},{"id":921,"term":"Ibra\'","phrase":"Release of Liability","meaning":"A creditor\'s waiver of the debtor\'s obligation, fully or partially.","example":"She granted Ibra\' to ease the debtor\'s hardship.","reference":"Fiqh (Obligations)"},{"id":922,"term":"Khiyar","phrase":"Option to Rescind","meaning":"A buyer or seller\'s option to cancel a sale within certain conditions.","example":"They agreed to Khiyar al-Shart for three days.","reference":"Hadith: Abu Dawud 3456"},{"id":923,"term":"Ghabn","phrase":"Gross Mispricing","meaning":"Unfair price disparity in transactions that can justify rescission.","example":"The sale was annulled due to Ghabn al-Fahish.","reference":"Fiqh (Commercial Law)"},{"id":924,"term":"Wakala","phrase":"Agency","meaning":"Delegating authority to another to act on one\'s behalf.","example":"She appointed Wakala to manage the purchase.","reference":"Fiqh (Agency)"},{"id":925,"term":"Wasiyyah","phrase":"Bequest","meaning":"A willful transfer of up to one-third of an estate to non-heirs.","example":"His Wasiyyah endowed a scholarship fund.","reference":"Qur\'an 2:180"},{"id":926,"term":"Mirath","phrase":"Inheritance","meaning":"Distribution of a deceased person\'s estate under Islamic law.","example":"Mirath shares were calculated per Faraid rules.","reference":"Qur\'an 4:11"},{"id":927,"term":"Faraid","phrase":"Fixed Shares","meaning":"The prescribed inheritance shares for eligible heirs.","example":"They studied Faraid to apportion the estate correctly.","reference":"Qur\'an 4:11-12"},{"id":928,"term":"Asabah","phrase":"Agnatic Heirs","meaning":"Residual heirs who receive what remains after fixed shares.","example":"The Asabah inherited the remainder of the estate.","reference":"Fiqh (Inheritance)"},{"id":929,"term":"Qismah","phrase":"Division of Property","meaning":"The process of dividing jointly owned property.","example":"They requested Qismah to separate their shares.","reference":"Fiqh (Property)"},{"id":930,"term":"Hajr","phrase":"Interdiction","meaning":"Legal restriction placed on a person to protect their assets due to incapacity or misuse.","example":"The court instituted Hajr to safeguard the estate.","reference":"Fiqh (Personal Status)"},{"id":931,"term":"Wilayah","phrase":"Guardianship/Authority","meaning":"Legal authority over another in certain contexts, such as marriage.","example":"The Wali exercises Wilayah in the marriage contract.","reference":"Qur\'an 4:34"},{"id":932,"term":"Wali","phrase":"Guardian","meaning":"A lawful guardian, especially in the context of marriage.","example":"Her Wali represented her in the Nikah.","reference":"Hadith: Abu Dawud 2085"},{"id":933,"term":"Asbab al-Nuzul","phrase":"Occasions of Revelation","meaning":"Historical contexts explaining why specific verses were revealed.","example":"Asbab al-Nuzul clarified the verse\'s application.","reference":"Ulum al-Qur\'an"},{"id":934,"term":"Makki","phrase":"Meccan Revelation","meaning":"Chapters or verses revealed before the Hijrah to Madinah.","example":"Makki verses emphasize creed and patience.","reference":"Ulum al-Qur\'an"},{"id":935,"term":"Madani","phrase":"Medinan Revelation","meaning":"Chapters or verses revealed after the Hijrah to Madinah.","example":"Madani surahs detail laws and social order.","reference":"Ulum al-Qur\'an"},{"id":936,"term":"Basmalah","phrase":"In the Name of Allah","meaning":"The phrase \'Bismillah al-Rahman al-Rahim\' at the start of acts and chapters.","example":"He began with the Basmalah before eating.","reference":"Qur\'an 27:30"},{"id":937,"term":"Tasmiya","phrase":"Saying Bismillah","meaning":"Pronouncing \'Bismillah\' before actions like slaughter or eating.","example":"She practiced Tasmiya before starting tasks.","reference":"Hadith: al-Bukhari 5565"},{"id":938,"term":"Salawat","phrase":"Sending Blessings","meaning":"Invoking blessings and peace upon the Prophet Muhammad.","example":"They recited Salawat frequently on Fridays.","reference":"Qur\'an 33:56"},{"id":939,"term":"Ribat","phrase":"Spiritual/Military Watch","meaning":"Guarding the frontiers or staying steadfast in obedience awaiting prayer.","example":"Ribat includes waiting for prayer after prayer.","reference":"Hadith: Muslim 251"},{"id":940,"term":"Tayyib","phrase":"Pure and Wholesome","meaning":"Lawful and good in substance and manner of acquisition.","example":"They sought Tayyib income free of harm and injustice.","reference":"Qur\'an 2:168"},{"id":941,"term":"Hilf al-Fudul","phrase":"Alliance of Virtue","meaning":"A pre-Islamic pact upheld by the Prophet to support the oppressed.","example":"Hilf al-Fudul embodies justice and solidarity.","reference":"Sirah (Meccan Period)"},{"id":942,"term":"Ismul Jalalah","phrase":"The Divine Name \'Allah\'","meaning":"The supreme proper name of God in Islam.","example":"Ismul Jalalah appears throughout the Qur\'an.","reference":"Qur\'an 1:1"},{"id":943,"term":"Shifa","phrase":"Healing","meaning":"Cure and remedy granted by Allah, including spiritual healing through Qur\'an.","example":"They recited verses of Shifa for the sick.","reference":"Qur\'an 17:82"},{"id":944,"term":"Istiqra\'","phrase":"Inductive Analysis","meaning":"Deriving general rules from surveying many specific cases.","example":"The jurist used Istiqra\' to infer a principle.","reference":"Usul al-Fiqh (Method)"},{"id":945,"term":"Istishhad","phrase":"Citing Evidence","meaning":"Supporting a claim by quoting authoritative textual or empirical proofs.","example":"He offered Istishhad from Qur\'an and Sunnah.","reference":"Usul al-Fiqh (Evidence)"},{"id":946,"term":"Tahqiq","phrase":"Verification","meaning":"Establishing the authenticity and accuracy of texts, chains, or facts.","example":"The editor performed Tahqiq on the classical manuscript.","reference":"Hadith/Quranic Scholarship"},{"id":947,"term":"Tarteel","phrase":"Measured Recitation","meaning":"Reciting the Qur\'an slowly with clarity and proper pacing.","example":"She read with Tarteel, observing tajwid rules.","reference":"Qur\'an 73:4"},{"id":948,"term":"Asma\' al-Husna","phrase":"Beautiful Names of Allah","meaning":"The most beautiful names and attributes of Allah mentioned in revelation.","example":"He learned the Asma\' al-Husna and reflected on their meanings.","reference":"Qur\'an 7:180"},{"id":949,"term":"Rububiyyah","phrase":"Lordship of Allah","meaning":"Belief that Allah alone creates, sustains, and manages the universe.","example":"Rububiyyah affirms that provision comes solely from Allah.","reference":"Qur\'an 1:2"},{"id":950,"term":"Uluhiyyah","phrase":"Worship of Allah Alone","meaning":"Singling out Allah in all acts of worship without partners.","example":"Uluhiyyah requires directing prayer and supplication to Allah alone.","reference":"Qur\'an 1:5"},{"id":951,"term":"Asma wa Sifat","phrase":"Names and Attributes","meaning":"Affirming Allah\'s names and attributes as befit His majesty without distortion or denial.","example":"They studied Asma wa Sifat based on Qur\'an and Sunnah.","reference":"Qur\'an 59:22-24"},{"id":952,"term":"Qawa\'id Fiqhiyyah","phrase":"Legal Maxims","meaning":"General juristic rules derived from detailed evidences to guide rulings.","example":"Qawa\'id Fiqhiyyah help unify rulings across similar cases.","reference":"Fiqh (Legal Maxims)"},{"id":953,"term":"Al-Umur bi Maqasidiha","phrase":"Matters by Intentions","meaning":"Actions are judged by underlying intentions and purposes.","example":"The maxim Al-Umur bi Maqasidiha guided the ruling.","reference":"Hadith: al-Bukhari 1"},{"id":954,"term":"Al-Yaqin la Yazulu bi al-Shakk","phrase":"Certainty Not Removed by Doubt","meaning":"Established certainty remains unless clear evidence proves otherwise.","example":"He ignored baseless doubts per this maxim.","reference":"Fiqh (Legal Maxims)"},{"id":955,"term":"Al-Mashaqqah Tajlib al-Taysir","phrase":"Hardship Brings Ease","meaning":"Legal concessions are granted to alleviate undue hardship.","example":"Travelers shorten prayers under this maxim.","reference":"Fiqh (Legal Maxims)"},{"id":956,"term":"Al-Darar Yuzal","phrase":"Harm Must Be Removed","meaning":"Harm is prevented or eliminated in legal rulings and policy.","example":"The sale was voided to remove harm.","reference":"Fiqh (Legal Maxims)"},{"id":957,"term":"Al-Adah Muhakkamah","phrase":"Custom is Authoritative","meaning":"Sound local custom is considered in rulings when texts are silent.","example":"They applied local practice per Al-Adah Muhakkamah.","reference":"Fiqh (Legal Maxims)"},{"id":958,"term":"Istihalah","phrase":"Substantial Transformation","meaning":"A substance\'s ruling changes after its essence transforms into a new substance.","example":"Gelatin permissibility was assessed via Istihalah.","reference":"Fiqh (Purity/Food)"},{"id":959,"term":"Istithmar","phrase":"Investment","meaning":"Deploying capital in permissible ventures to achieve lawful profit.","example":"The fund pursued Shari\'ah-compliant Istithmar.","reference":"Fiqh (Finance)"},{"id":960,"term":"Tabarru\'","phrase":"Gratuitous Donation","meaning":"A voluntary transfer or undertaking without expectation of return.","example":"Takaful models rely on Tabarru\' among participants.","reference":"Fiqh (Contracts)"},{"id":961,"term":"Ghasb","phrase":"Usurpation","meaning":"Unlawful seizure or use of another\'s property without consent.","example":"He returned the land taken by Ghasb and compensated the owner.","reference":"Fiqh (Property)"},{"id":962,"term":"Shuf\'ah","phrase":"Preemption Right","meaning":"The right of a co-owner or neighbor to purchase property before outsiders.","example":"She exercised Shuf\'ah to acquire the adjoining plot.","reference":"Hadith: Abu Dawud 3516"},{"id":963,"term":"Fasakh","phrase":"Contract Dissolution","meaning":"Annulment of a contract due to defect, harm, or legal cause.","example":"The marriage was ended by Fasakh for valid reasons.","reference":"Fiqh (Personal Status)"},{"id":964,"term":"Talaq","phrase":"Divorce","meaning":"A husband\'s formal dissolution of the marriage contract, subject to rules and ethics.","example":"Talaq must follow prescribed procedure and waiting periods.","reference":"Qur\'an 65:1"},{"id":965,"term":"Khul\'","phrase":"Divorce by Redemption","meaning":"Marriage dissolution initiated by the wife with compensation to the husband.","example":"They agreed to Khul\' through the judge\'s approval.","reference":"Qur\'an 2:229"},{"id":966,"term":"Li\'an","phrase":"Mutual Cursing Procedure","meaning":"A process where spouses invoke curses to resolve an unproven accusation, resulting in separation.","example":"Li\'an led to permanent separation of the spouses.","reference":"Qur\'an 24:6-9"},{"id":967,"term":"Zihar","phrase":"Forbidden Likeness","meaning":"An unlawful form of divorce by likening one\'s wife to a mahram relative, requiring expiation.","example":"He performed the Kaffarah required for Zihar.","reference":"Qur\'an 58:2-4"},{"id":968,"term":"Ila\'","phrase":"Oath of Abstention","meaning":"A husband\'s oath to abstain from marital relations, with a time limit in law.","example":"Ila\' beyond four months triggers legal consequences.","reference":"Qur\'an 2:226"},{"id":969,"term":"Rida\'","phrase":"Breastfeeding Kinship","meaning":"Milk kinship created through breastfeeding that affects marriage eligibility.","example":"Rida\' established non-marriageable relations between the children.","reference":"Qur\'an 4:23"},{"id":970,"term":"Kafa\'ah","phrase":"Compatibility in Marriage","meaning":"Legal and social suitability between spouses considered in marriage.","example":"Families discussed Kafa\'ah before the Nikah.","reference":"Fiqh (Marriage)"},{"id":971,"term":"Walimah","phrase":"Wedding Feast","meaning":"A celebratory meal after marriage, encouraging sharing and gratitude.","example":"They hosted a simple Walimah for relatives and neighbors.","reference":"Hadith: al-Bukhari 5177"},{"id":972,"term":"Mahram","phrase":"Unmarriageable Kin","meaning":"A relative with whom marriage is permanently forbidden.","example":"Traveling with a Mahram is required by some schools in certain cases.","reference":"Qur\'an 24:31"},{"id":973,"term":"Hima","phrase":"Protected Reserve","meaning":"Land set aside for public benefit, such as grazing or conservation.","example":"The leader established a Hima to protect resources.","reference":"Sirah/Fiqh (Public Policy)"},{"id":974,"term":"Harim","phrase":"Sanctuary Zone","meaning":"A protected zone around wells or property to ensure shared rights and safety.","example":"A Harim was designated around the communal well.","reference":"Fiqh (Property/Public Rights)"},{"id":975,"term":"Milkiyyah","phrase":"Ownership","meaning":"The legal right to possess, use, and dispose of property within Shari\'ah limits.","example":"Milkiyyah entails both rights and responsibilities.","reference":"Fiqh (Property)"},{"id":976,"term":"Tasarruf","phrase":"Disposition of Property","meaning":"Legal acts conducted over property such as sale, gift, or lease.","example":"His Tasarruf was restricted due to interdiction (Hajr).","reference":"Fiqh (Transactions)"},{"id":977,"term":"Bay\' al-Wafa\'","phrase":"Sale with Redemption","meaning":"A sale where the seller retains the right to redeem the sold property later.","example":"Scholars debated the permissibility of Bay\' al-Wafa\'.","reference":"Fiqh (Commercial Law)"},{"id":978,"term":"Ijarah Muntahia bi Tamlik","phrase":"Lease-to-Own","meaning":"A leasing contract that ends with transfer of ownership to the lessee.","example":"They financed equipment via Ijarah Muntahia bi Tamlik.","reference":"Fiqh (Finance)"},{"id":979,"term":"Riba al-Fadl","phrase":"Usury of Excess","meaning":"Prohibited surplus in exchanges of homogeneous ribawi goods.","example":"Selling gold for more gold with delay involves Riba al-Fadl.","reference":"Hadith: Muslim 1584"},{"id":980,"term":"Riba al-Nasi\'ah","phrase":"Usury of Delay","meaning":"Prohibited increase due to deferment in ribawi transactions.","example":"Charging extra for delayed payment constitutes Riba al-Nasi\'ah.","reference":"Qur\'an 2:275-279"},{"id":981,"term":"Habs","phrase":"Endowment (Waqf) Holding","meaning":"Restricting property for perpetual charitable use, akin to Waqf.","example":"The family declared their orchard a Habs for education.","reference":"Fiqh (Endowments)"},{"id":982,"term":"Ihtikar","phrase":"Hoarding","meaning":"Unlawfully stockpiling essentials to inflate prices and harm consumers.","example":"Authorities banned Ihtikar during the shortage.","reference":"Hadith: Ibn Majah 2155"},{"id":983,"term":"Tas\'ir","phrase":"Price Regulation","meaning":"Setting prices by authority to prevent injustice or market manipulation.","example":"Tas\'ir was introduced to curb exploitation.","reference":"Fiqh (Market Regulation)"},{"id":984,"term":"Tadlees","phrase":"Misrepresentation","meaning":"Concealing defects or deceptive presentation in sales or hadith chains.","example":"The contract was voided due to Tadlees.","reference":"Fiqh/Hadith (Integrity)"},{"id":985,"term":"Ghish","phrase":"Cheating","meaning":"Deception in trade or dealings, strictly prohibited in Islam.","example":"He repented from Ghish after honest counsel.","reference":"Hadith: Muslim 102"},{"id":986,"term":"Tatfif","phrase":"Shortchanging","meaning":"Giving less in measure or weight than due.","example":"Tatfif is condemned for its injustice to buyers.","reference":"Qur\'an 83:1-3"},{"id":987,"term":"Ikrah","phrase":"Coercion","meaning":"Compulsion that vitiates consent in contracts and certain acts.","example":"A confession under Ikrah is invalid.","reference":"Fiqh (Legal Capacity)"},{"id":988,"term":"Iqrar","phrase":"Admission","meaning":"A person\'s acknowledgment of a right or fact against themselves.","example":"The Iqrar served as proof in the dispute.","reference":"Fiqh (Evidence)"},{"id":989,"term":"Yamin","phrase":"Oath","meaning":"A solemn declaration invoking Allah to affirm truthfulness.","example":"He took a Yamin to testify to his claim.","reference":"Qur\'an 5:89"},{"id":990,"term":"Qasamah","phrase":"Oath Procedure","meaning":"A collective oath procedure used historically in homicide cases when evidence is lacking.","example":"Qasamah was invoked due to absence of clear proof.","reference":"Fiqh (Judicial Process)"},{"id":991,"term":"Siyasa Shari\'yyah","phrase":"Shari\'ah-Based Governance","meaning":"Public policy and administration guided by Islamic legal principles.","example":"The ruler acted under Siyasa Shari\'yyah to prevent harm.","reference":"Fiqh (Public Law)"},{"id":992,"term":"Ma\'alat","phrase":"Considering Consequences","meaning":"Accounting for outcomes and side effects when issuing rulings.","example":"They weighed Ma\'alat before implementing the rule.","reference":"Fiqh (Methodology)"},{"id":993,"term":"Fath al-Dhara\'i","phrase":"Opening the Means","meaning":"Permitting means that lead to beneficial ends within the law.","example":"The measure was allowed per Fath al-Dhara\'i for public benefit.","reference":"Usul al-Fiqh (Principles)"},{"id":994,"term":"Tahkim","phrase":"Arbitration","meaning":"Settling disputes by appointing mutually agreed arbitrators.","example":"They opted for Tahkim instead of litigation.","reference":"Qur\'an 4:35"},{"id":995,"term":"Taharri","phrase":"Diligent Estimation","meaning":"Exerting best judgment when precise knowledge is unavailable.","example":"He used Taharri to determine the prayer direction in the desert.","reference":"Fiqh (Evidence/Practice)"},{"id":996,"term":"\'Uqubat","phrase":"Penalties","meaning":"Legal punishments and sanctions prescribed in Islamic law.","example":"\'Uqubat are applied with due process and justice.","reference":"Fiqh (Penal Law)"},{"id":997,"term":"Hifz","phrase":"Qur\'an Memorization","meaning":"Committing the Qur\'an to memory with accuracy and proper recitation.","example":"She began her Hifz journey with a local teacher.","reference":"Hadith: al-Bukhari 5037"},{"id":998,"term":"Tajdid","phrase":"Renewal","meaning":"Revival and renewal of the religion\'s understanding and practice in line with its sources.","example":"Scholars of Tajdid addressed contemporary challenges with sound methodology.","reference":"Hadith: Abu Dawud 4291"},{"id":999,"term":"Ihya\'","phrase":"Spiritual Revival","meaning":"Reviving the heart through knowledge, remembrance, and righteous action.","example":"Her nightly Qur\'an recitation was part of Ihya\' of the heart.","reference":"Qur\'an 8:24"},{"id":1000,"term":"Iqamat al-Din","phrase":"Establishing the Religion","meaning":"Upholding and implementing the teachings and ethics of Islam in personal and communal life.","example":"Community projects aimed at Iqamat al-Din through service and education.","reference":"Qur\'an 42:13"}]}');

/***/ })

}]);