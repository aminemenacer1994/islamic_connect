(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_DuaComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  createDuaMetadata
} = __webpack_require__(/*! ../utils/duaSlugs */ "./resources/js/utils/duaSlugs.js");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      duaCollection: [],
      searchQuery: '',
      selectedCategory: '',
      selectedReference: '',
      currentPage: {},
      duasPerPage: 20,
      showCopyMessage: false,
      fontSize: 18,
      likedDuas: [],
      viewMode: 'all',
      searchTags: ['All', 'Forgiveness', 'Protection', 'Gratitude', 'Healing', 'Guidance', 'Patience', 'Success', 'Mercy', 'Peace', 'Provision', 'Strength', 'Repentance'],
      selectedTag: '',
      tagSynonyms: {
        Forgiveness: ['pardon', 'mercy', 'forgive'],
        Protection: ['safety', 'guard', 'shield'],
        Gratitude: ['thanks', 'appreciation', 'thankful'],
        Healing: ['cure', 'recovery', 'health'],
        Guidance: ['direction', 'path', 'lead'],
        Patience: ['endurance', 'perseverance', 'calm'],
        Success: ['achievement', 'victory', 'prosperity'],
        Mercy: ['compassion', 'kindness', 'forgiveness'],
        Peace: ['tranquility', 'calm', 'serenity'],
        Provision: ['sustenance', 'wealth', 'blessings'],
        Strength: ['power', 'resilience', 'fortitude'],
        Repentance: ['regret', 'atonement', 'penitence'],
        Faith: ['belief', 'trust', 'devotion'],
        Knowledge: ['wisdom', 'understanding', 'learning'],
        Family: ['kin', 'household', 'relatives'],
        Justice: ['fairness', 'equity', 'righteousness'],
        Hope: ['optimism', 'aspiration', 'expectation'],
        Charity: ['generosity', 'almsgiving', 'benevolence']
      },
      showScrollToTop: false,
      actionFeedback: {},
      errorMessage: null,
      isLoading: true,
      nextStepMinimized: false,
      staticDuaSlug: typeof window !== 'undefined' ? window.__duaSlug || '' : '',
      staticDuaMatch: null,
      currentlyPlayingAudioId: null,
      audioElement: null,
      speechUtterance: null,
      speechSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      speechVoices: []
    };
  },
  computed: {
    uniqueReferences() {
      const references = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (dua.reference) {
            references.add(dua.reference);
          }
        });
      });
      return [...references].map(ref => ({
        full: ref,
        display: ref.split(',')[0].trim()
      })).sort((a, b) => a.display.localeCompare(b.display));
    },
    likedDuasCount() {
      const validIds = this.likedDuas.filter(id => {
        const [categoryId, duaId] = id.split('-');
        const category = this.duaCollection.find(c => c.id === parseInt(categoryId));
        return category && category.duas.some(dua => dua.id === id);
      });
      return validIds.length;
    },
    filteredCategories() {
      if (this.staticDuaSlug) {
        if (!this.staticDuaMatch) {
          return [];
        }
        const target = this.staticDuaMatch;
        return this.duaCollection.map(category => {
          if (category.id !== target.categoryId) {
            return _objectSpread(_objectSpread({}, category), {}, {
              duas: []
            });
          }
          return _objectSpread(_objectSpread({}, category), {}, {
            duas: category.duas.filter(dua => dua.slug === target.slug)
          });
        }).filter(category => category.duas.length > 0);
      }
      let filteredCollection = this.duaCollection;
      if (this.viewMode === 'liked') {
        filteredCollection = filteredCollection.map(category => _objectSpread(_objectSpread({}, category), {}, {
          duas: category.duas.filter(dua => this.likedDuas.includes(dua.id))
        })).filter(category => category.duas.length > 0);
        return filteredCollection;
      }
      if (this.selectedCategory) {
        filteredCollection = filteredCollection.filter(category => category.id === parseInt(this.selectedCategory));
      }
      if (this.selectedReference) {
        filteredCollection = filteredCollection.map(category => _objectSpread(_objectSpread({}, category), {}, {
          duas: category.duas.filter(dua => dua.reference === this.selectedReference)
        })).filter(category => category.duas.length > 0);
      }
      if (!this.searchQuery.trim() && !this.selectedTag) {
        return filteredCollection;
      }
      return filteredCollection.map(category => {
        const filteredDuas = category.duas.filter(dua => {
          const searchQueryLower = this.searchQuery.trim().toLowerCase();
          const tagLower = this.selectedTag.toLowerCase();
          const synonyms = this.tagSynonyms[this.selectedTag] || [];
          const synonymLower = synonyms.map(s => s.toLowerCase());
          const queryMatch = this.searchQuery.trim() ? (dua.title || '').toLowerCase().includes(searchQueryLower) || (dua.arabic || '').toLowerCase().includes(searchQueryLower) || (dua.transliteration || '').toLowerCase().includes(searchQueryLower) || (dua.translation || '').toLowerCase().includes(searchQueryLower) || (dua.reference || '').toLowerCase().includes(searchQueryLower) : true;
          const tagMatch = this.selectedTag ? (dua.title || '').toLowerCase().includes(tagLower) || (dua.arabic || '').toLowerCase().includes(tagLower) || (dua.transliteration || '').toLowerCase().includes(tagLower) || (dua.translation || '').toLowerCase().includes(tagLower) || (dua.reference || '').toLowerCase().includes(tagLower) || synonymLower.some(syn => (dua.title || '').toLowerCase().includes(syn) || (dua.arabic || '').toLowerCase().includes(syn) || (dua.transliteration || '').toLowerCase().includes(syn) || (dua.translation || '').toLowerCase().includes(syn) || (dua.reference || '').toLowerCase().includes(syn)) : true;
          return queryMatch && tagMatch;
        });
        return _objectSpread(_objectSpread({}, category), {}, {
          duas: filteredDuas
        });
      }).filter(category => category.duas.length > 0);
    },
    filteredDuas() {
      return this.filteredCategories;
    },
    hasActiveFilters() {
      return Boolean(this.searchQuery || this.selectedTag || this.selectedReference);
    },
    allDuasLikedInCategory() {
      return categoryId => {
        const category = this.duaCollection.find(c => c.id === categoryId);
        if (!category || !category.duas.length) return false;
        return category.duas.every(dua => this.likedDuas.includes(dua.id));
      };
    }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    getTagIcon(tag) {
      const icons = {
        'All': 'bi-grid-fill',
        'Forgiveness': 'bi-heart-fill',
        'Protection': 'bi-shield-fill',
        'Gratitude': 'bi-emoji-smile-fill',
        'Healing': 'bi-heart-pulse-fill',
        'Guidance': 'bi-signpost-fill',
        'Patience': 'bi-hourglass-split',
        'Success': 'bi-trophy-fill',
        'Mercy': 'bi-hand-thumbs-up-fill',
        'Peace': 'bi-peace-fill',
        'Provision': 'bi-basket-fill',
        'Strength': 'bi-lightning-charge-fill',
        'Repentance': 'bi-arrow-counterclockwise'
      };
      return `bi ${icons[tag] || 'bi-tag-fill'}`;
    },
    highlightText(text) {
      if (!text) return '';
      const raw = text.toString();

      // If no search or tag filters, return escaped text
      if (!this.searchQuery.trim() && !this.selectedTag) {
        return raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      // Escape first to avoid injecting existing markup, then re-inject highlights
      let escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Highlight search terms
      const searchTerms = this.searchQuery.trim() ? [this.searchQuery] : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-search">$1</mark>');
      });

      // Highlight selected tag and its synonyms
      const tagTerms = this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [];
      tagTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-tag">$1</mark>');
      });
      return escaped;
    },
    toggleTag(tag) {
      this.selectedTag = tag === 'All' || this.selectedTag === tag ? '' : tag;
      this.resetPagination();
    },
    clearSearch() {
      this.searchQuery = '';
      this.selectedTag = '';
      this.selectedReference = '';
      this.resetPagination();
    },
    changeFontSize(action) {
      if (action === 'increase') {
        this.fontSize = Math.min(this.fontSize + 2, 28);
      } else if (action === 'decrease' && this.fontSize > 14) {
        this.fontSize -= 2;
      }
    },
    copyContent(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\nReference: ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;
        setTimeout(() => {
          this.showCopyMessage = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy content: ', err);
      });
    },
    shareOnWhatsApp(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;
      window.open(url, '_blank');
    },
    hasRecordedAudio(dua) {
      return Boolean(dua && dua.audio);
    },
    getAudioButtonClasses(dua) {
      const base = ['btn', 'btn-sm', 'rounded-circle', 'p-0', 'd-flex', 'align-items-center', 'justify-content-center', 'action-btn'];
      if (this.hasRecordedAudio(dua)) {
        base.push('btn-outline-secondary');
      } else {
        base.push('audio-action-btn', 'speech');
      }
      return base;
    },
    initializeSpeechVoices() {
      if (!this.speechSupported || typeof window === 'undefined') return;
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length) {
          this.speechVoices = voices;
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    },
    selectArabicVoice() {
      if (!this.speechVoices.length) return null;
      const arabicVoice = this.speechVoices.find(voice => {
        var _voice$lang;
        return (_voice$lang = voice.lang) === null || _voice$lang === void 0 ? void 0 : _voice$lang.startsWith('ar');
      });
      return arabicVoice || this.speechVoices[0];
    },
    canPlayAudio(dua) {
      return Boolean(dua && (dua.audio || this.speechSupported));
    },
    isAudioPlaying(dua) {
      return !!dua && this.currentlyPlayingAudioId === dua.id;
    },
    handleAudioPlayback(dua) {
      if (!dua) return;
      if (!this.canPlayAudio(dua)) return;
      if (this.currentlyPlayingAudioId === dua.id) {
        this.stopAudioPlayback();
        return;
      }
      this.stopAudioPlayback();
      if (dua.audio) {
        const audio = new Audio(dua.audio);
        audio.preload = 'auto';
        audio.addEventListener('ended', () => {
          if (this.currentlyPlayingAudioId === dua.id) {
            this.stopAudioPlayback();
          }
        });
        audio.addEventListener('error', () => this.stopAudioPlayback());
        this.audioElement = audio;
        this.currentlyPlayingAudioId = dua.id;
        audio.play().catch(() => this.stopAudioPlayback());
        return;
      }
      if (this.speechSupported) {
        this.playSpeechForDua(dua);
      }
    },
    playSpeechForDua(dua) {
      if (!dua) return;
      const text = dua.arabic || dua.transliteration || dua.translation || dua.title;
      if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      const preferredVoice = this.selectArabicVoice();
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang || 'ar-SA';
      } else {
        utterance.lang = 'ar-SA';
      }
      utterance.rate = 0.88;
      utterance.pitch = 1.15;
      utterance.volume = 0.95;
      utterance.addEventListener('end', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      utterance.addEventListener('error', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      this.speechUtterance = utterance;
      this.currentlyPlayingAudioId = dua.id;
      window.speechSynthesis.speak(utterance);
    },
    stopAudioPlayback() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = null;
      }
      if (this.speechUtterance && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        this.speechUtterance = null;
      }
      this.currentlyPlayingAudioId = null;
    },
    toggleLike(duaId) {
      if (!duaId) return;
      const updatedLikedDuas = [...this.likedDuas];
      if (updatedLikedDuas.includes(duaId)) {
        updatedLikedDuas.splice(updatedLikedDuas.indexOf(duaId), 1);
      } else {
        updatedLikedDuas.push(duaId);
      }
      this.likedDuas = updatedLikedDuas;
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
    },
    toggleAllInCategory(categoryId) {
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (!category) return;
      this.actionFeedback[categoryId] = true;
      const allLiked = this.allDuasLikedInCategory(categoryId);
      let updatedLikedDuas = [...this.likedDuas];
      if (allLiked) {
        updatedLikedDuas = updatedLikedDuas.filter(id => !category.duas.some(dua => dua.id === id));
      } else {
        updatedLikedDuas = [...new Set([...updatedLikedDuas, ...category.duas.map(dua => dua.id)])];
      }
      this.likedDuas = updatedLikedDuas;
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
      setTimeout(() => {
        this.actionFeedback[categoryId] = false;
      }, 1000);
    },
    clearAllLikedDuas() {
      this.actionFeedback['clearAll'] = true;
      this.likedDuas = [];
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
      setTimeout(() => {
        this.actionFeedback['clearAll'] = false;
      }, 1000);
    },
    toggleCategoryCollapse(categoryId) {
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (category) {
        category.collapsed = !category.collapsed;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollThreshold = windowHeight * 0.05;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },
    getPaginatedDuas(duas) {
      if (!duas || !duas.length) return [];
      const start = ((this.currentPage[duas[0].id.split('-')[0]] || 1) - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      var _this$duaCollection$f;
      const totalPages = this.totalPages(((_this$duaCollection$f = this.duaCollection.find(c => c.id === categoryId)) === null || _this$duaCollection$f === void 0 ? void 0 : _this$duaCollection$f.duas) || []);
      if (direction === 'next' && this.currentPage[categoryId] < totalPages) {
        this.currentPage[categoryId]++;
      } else if (direction === 'prev' && this.currentPage[categoryId] > 1) {
        this.currentPage[categoryId]--;
      }
    },
    totalPages(duas) {
      return Math.ceil(duas.length / this.duasPerPage);
    },
    resetPagination() {
      this.currentPage = {};
      this.duaCollection.forEach(category => {
        this.currentPage[category.id] = 1;
      });
    },
    applyStaticDuaSlug() {
      if (!this.staticDuaSlug || !this.duaCollection.length) {
        return;
      }
      const metadata = createDuaMetadata({
        categories: this.duaCollection
      }, {
        assignSlugToDua: true
      });
      const match = metadata.find(entry => entry.slug === this.staticDuaSlug);
      if (!match) {
        this.staticDuaMatch = null;
        this.errorMessage = 'The Dua you requested could not be found.';
        return;
      }
      this.errorMessage = null;
      this.staticDuaMatch = match;
      this.selectedCategory = match.categoryId ? match.categoryId.toString() : '';
    }
  },
  created() {
    try {
      console.debug('[DuaComponent] created()');
    } catch (e) {}
    const storedLikedDuas = localStorage.getItem('likedDuas');
    if (storedLikedDuas) {
      this.likedDuas = JSON.parse(storedLikedDuas);
    }

    // Robust path for JSON under public/
    fetch(`${window.location.origin}/duaCollection.json`).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      if (!data.categories || !Array.isArray(data.categories)) {
        throw new Error('Invalid JSON structure: categories not found or not an array');
      }
      try {
        console.debug('[DuaComponent] loaded categories:', data.categories.length);
      } catch (e) {}
      this.duaCollection = data.categories.map(category => _objectSpread(_objectSpread({}, category), {}, {
        collapsed: false,
        duas: category.duas.map((dua, index) => {
          const originalId = dua.id || index + 1;
          return _objectSpread(_objectSpread({}, dua), {}, {
            id: `${category.id}-${originalId}`,
            originalId
          });
        })
      }));
      const ids = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (ids.has(dua.id)) {
            console.warn(`Duplicate dua ID found: ${dua.id}`);
          }
          ids.add(dua.id);
        });
      });
      this.resetPagination();
      this.applyStaticDuaSlug();
    }).catch(error => {
      console.error('Error loading dua collection:', error);
      this.errorMessage = 'Failed to load dua collection. Please try again later.';
    }).finally(() => {
      this.isLoading = false;
    });
    window.addEventListener('scroll', this.handleScroll, {
      passive: true
    });
    this.initializeSpeechVoices();
  },
  beforeDestroy() {
    this.stopAudioPlayback();
    window.removeEventListener('scroll', this.handleScroll);
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid py-4",
  role: "main",
  "aria-labelledby": "dua-title"
};
const _hoisted_2 = {
  class: "container",
  style: {
    "padding": "10px"
  }
};
const _hoisted_3 = {
  class: "mx-auto mb-4",
  style: {
    "position": "relative",
    "background": "#eaf3f1",
    "border": "1px solid rgba(11, 128, 111, 0.20)",
    "border-radius": "24px",
    "box-shadow": "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09)",
    "padding": "1.25rem 1.75rem"
  }
};
const _hoisted_4 = ["title", "aria-label"];
const _hoisted_5 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_6 = {
  style: {
    "flex": "1"
  }
};
const _hoisted_7 = {
  class: "mb-2 d-inline-flex align-items-center gap-1",
  style: {
    "color": "#1f2933"
  }
};
const _hoisted_8 = {
  class: "mb-3",
  style: {
    "color": "#1f2933",
    "line-height": "1.8",
    "font-size": "1.05rem"
  }
};
const _hoisted_9 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_10 = {
  key: 0,
  class: "alert alert-danger text-center",
  role: "alert"
};
const _hoisted_11 = {
  key: 0,
  class: "text-center my-5"
};
const _hoisted_12 = {
  class: "container mb-4"
};
const _hoisted_13 = {
  class: "row g-2 align-items-stretch justify-content-center",
  role: "search"
};
const _hoisted_14 = {
  class: "col-10 col-sm-10 col-md-11"
};
const _hoisted_15 = {
  class: "input-group shadow-sm rounded-4 overflow-hidden h-100"
};
const _hoisted_16 = {
  class: "col-2 col-sm-2 col-md-1"
};
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  class: "container mb-4"
};
const _hoisted_19 = {
  class: "nav nav-tabs justify-content-center"
};
const _hoisted_20 = {
  class: "nav-item"
};
const _hoisted_21 = {
  class: "nav-item"
};
const _hoisted_22 = {
  key: 0,
  class: "badge bg-danger ms-1"
};
const _hoisted_23 = {
  key: 0,
  class: "text-center mt-3"
};
const _hoisted_24 = {
  key: 1,
  class: "container premium-action-button--outline mb-4",
  style: {
    "position": "relative",
    "background": "#eaf3f1",
    "border": "1px solid rgba(11, 128, 111, 0.20)",
    "border-radius": "24px",
    "box-shadow": "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09)",
    "padding": "1.25rem 1.75rem"
  }
};
const _hoisted_25 = {
  class: "row g-3"
};
const _hoisted_26 = {
  class: "col-md-6"
};
const _hoisted_27 = {
  class: "dropdown-card"
};
const _hoisted_28 = ["value"];
const _hoisted_29 = {
  class: "col-md-6"
};
const _hoisted_30 = {
  class: "dropdown-card"
};
const _hoisted_31 = ["value"];
const _hoisted_32 = {
  key: 0,
  class: "alert alert-success alert-dismissible fade show mx-auto copy-message",
  role: "alert"
};
const _hoisted_33 = {
  class: "container"
};
const _hoisted_34 = {
  key: 0,
  class: "text-center py-5 rounded-4",
  style: {
    "background": "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
    "border": "1px solid #99f6e4",
    "margin": "2rem 1rem",
    "box-shadow": "0 10px 30px rgba(20, 184, 166, 0.1)"
  },
  role: "status",
  "aria-live": "polite"
};
const _hoisted_35 = {
  class: "py-4"
};
const _hoisted_36 = {
  class: "mb-4 fw-medium fs-5",
  style: {
    "color": "#0f766e",
    "font-family": "'Inter', system-ui, sans-serif"
  }
};
const _hoisted_37 = ["aria-labelledby"];
const _hoisted_38 = {
  class: "d-flex align-items-center justify-content-between category-header mb-3"
};
const _hoisted_39 = ["id"];
const _hoisted_40 = {
  class: "d-flex align-items-center gap-3"
};
const _hoisted_41 = ["onClick", "title", "aria-label"];
const _hoisted_42 = {
  key: 0,
  class: "row g-3",
  role: "list"
};
const _hoisted_43 = ["aria-labelledby"];
const _hoisted_44 = {
  key: 0,
  class: "position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-2",
  style: {
    "width": "32px",
    "height": "32px",
    "box-shadow": "0 2px 4px rgba(0,0,0,0.1)",
    "z-index": "1"
  }
};
const _hoisted_45 = {
  class: "card-body d-flex flex-column p-3 p-md-4 text-black"
};
const _hoisted_46 = ["id"];
const _hoisted_47 = ["innerHTML"];
const _hoisted_48 = {
  class: "rounded-3 p-3 mb-3 text-center shadow-md bg-light"
};
const _hoisted_49 = ["innerHTML"];
const _hoisted_50 = ["innerHTML"];
const _hoisted_51 = ["innerHTML"];
const _hoisted_52 = {
  class: "card-footer bg-light p-2 p-md-3"
};
const _hoisted_53 = {
  class: "d-flex justify-content-between align-items-center w-100"
};
const _hoisted_54 = {
  class: "d-flex align-items-center bg-white rounded-pill px-2 shadow-sm"
};
const _hoisted_55 = ["disabled"];
const _hoisted_56 = ["disabled"];
const _hoisted_57 = {
  class: "d-flex gap-2"
};
const _hoisted_58 = ["onClick", "aria-label"];
const _hoisted_59 = {
  class: "action-tooltip"
};
const _hoisted_60 = ["onClick"];
const _hoisted_61 = ["onClick"];
const _hoisted_62 = {
  key: 1,
  class: "d-flex justify-content-center mt-4"
};
const _hoisted_63 = {
  "aria-label": "Dua pagination"
};
const _hoisted_64 = {
  class: "pagination"
};
const _hoisted_65 = ["onClick"];
const _hoisted_66 = ["onClick"];
const _hoisted_67 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Section "), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", {
    class: "hero-section mb-5"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    id: "dua-title",
    class: "fw-bold text-center mb-3"
  }, "Dua Collection"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center container lead text-muted mb-4"
  }, " Explore a curated selection of authentic Islamic supplications, organized into categories like forgiveness, protection, and gratitude. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: $data.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": $data.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    style: {
      "position": "absolute",
      "right": "44px",
      "top": "14px",
      "opacity": "0.9",
      "background": "transparent",
      "border": "0",
      "color": "#6b8b91",
      "z-index": "3",
      "cursor": "pointer"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle",
    role: "img",
    "aria-label": "Gentle audio guide for new Muslims",
    style: {
      "width": "52px",
      "height": "52px",
      "border-radius": "50%",
      "background": "linear-gradient(145deg, rgba(11, 128, 111, 0.22), rgba(26, 95, 122, 0.18))",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "color": "#0b806f",
      "font-size": "1.4rem",
      "box-shadow": "inset 0 0 0 1px rgba(11, 128, 111, 0.24), 0 8px 18px rgba(26,95,122,0.12)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-assistive-listening-systems",
    "aria-hidden": "true"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase",
    style: {
      "letter-spacing": "0.1em",
      "color": "#1a5f7a",
      "font-size": "0.78rem"
    }
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/name",
    class: "fw-semibold text-decoration-none d-inline-flex align-items-center gap-1",
    style: {
      "color": "#0b806f"
    },
    "aria-label": "Open the 99 Names of Allah journey"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Continue to the 99 Names of Allah "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square",
    "aria-hidden": "true",
    style: {
      "color": "#0b806f",
      "font-size": "0.85rem",
      "opacity": "0.85"
    }
  })], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Ready for your next gentle step? Explore the ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/name",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "#0b806f"
    }
  }, " 99 Names of Allah ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" with Arabic and English names, meanings, descriptions, quick search, and favorites. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/name",
    class: "btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center",
    style: {
      "background": "linear-gradient(135deg, #0b806f, #1a5f7a)",
      "border": "none",
      "border-radius": "999px",
      "box-shadow": "0 10px 20px rgba(26, 95, 122, 0.25)",
      "transition": "transform 0.2s ease, box-shadow 0.2s ease"
    },
    onmouseover: "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 28px rgba(26, 95, 122, 0.28)';",
    onmouseout: "this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.25)';"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Explore 99 Names of Allah"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-praying-hands ms-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Opens the accessible 99 Names of Allah experience")], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Error Message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading/Empty States "), $data.isLoading && !$data.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status",
    "aria-label": "Loading"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mt-2 text-muted"
  }, "Loading duas…", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text text-white border-0",
    style: {
      "background-color": "#0db691"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.searchQuery = $event),
    type: "text",
    class: "form-control border-0 py-3 h-100",
    placeholder: "Search duas by title, Arabic words, translation, or reference",
    "aria-label": "Search duas",
    onInput: _cache[2] || (_cache[2] = (...args) => $options.resetPagination && $options.resetPagination(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn w-100 h-100 d-flex align-items-center justify-content-center shadow-sm rounded-4", $options.hasActiveFilters ? 'btn-secondary text-white border-0' : 'btn-outline-secondary']),
    disabled: !$options.hasActiveFilters,
    onClick: _cache[3] || (_cache[3] = (...args) => $options.clearSearch && $options.clearSearch(...args)),
    "aria-label": "Clear search and filters"
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg fs-4"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Clear filters", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_17)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tabs for All Duas and Liked Duas "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link", {
      active: $data.viewMode === 'all'
    }]),
    href: "#",
    onClick: _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      $data.viewMode = 'all';
      $options.resetPagination();
    }, ["prevent"])),
    "aria-current": "page"
  }, " All Duas ", 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link", {
      active: $data.viewMode === 'liked'
    }]),
    href: "#",
    onClick: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      $data.viewMode = 'liked';
      $options.resetPagination();
    }, ["prevent"]))
  }, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Liked Duas ", -1 /* CACHED */)), $options.likedDuasCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.likedDuasCount), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Clear All Liked Duas Button "), $data.viewMode === 'liked' && $options.likedDuasCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-danger", {
      disabled: $options.likedDuasCount === 0
    }]),
    onClick: _cache[6] || (_cache[6] = (...args) => $options.clearAllLikedDuas && $options.clearAllLikedDuas(...args)),
    "aria-label": "Clear all liked duas"
  }, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash-fill me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.actionFeedback['clearAll'] ? 'Cleared!' : 'Clear All Liked Duas'), 1 /* TEXT */)], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Category and Reference Dropdowns "), $data.viewMode === 'all' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "dropdown-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "fw-bold"
  }, "Select a Category:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.selectedCategory = $event),
    class: "form-select",
    onChange: _cache[8] || (_cache[8] = (...args) => $options.resetPagination && $options.resetPagination(...args))
  }, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All Categories", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.duaCollection, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: category.id,
      value: category.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.duas.length) + ") ", 9 /* TEXT, PROPS */, _hoisted_28);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedCategory]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "dropdown-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "fw-bold"
  }, "Select a Reference:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.selectedReference = $event),
    class: "form-select",
    onChange: _cache[10] || (_cache[10] = (...args) => $options.resetPagination && $options.resetPagination(...args))
  }, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All References", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.uniqueReferences, reference => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reference.full,
      value: reference.full
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.display), 9 /* TEXT, PROPS */, _hoisted_31);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedReference]])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Copy Success Message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "slide-fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.showCopyMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill me-2"
    }, null, -1 /* CACHED */)), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Copied to clipboard ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn-close",
      onClick: _cache[11] || (_cache[11] = $event => $data.showCopyMessage = false),
      "aria-label": "Close"
    })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Duas Display "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [$options.filteredDuas.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert no-duas-message text-center position-relative", _ctx.alertClass]),
    role: "status",
    "aria-live": "polite"
  }, [$options.filteredDuas.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Icon "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi fs-1 mb-4 d-block", $data.viewMode === 'liked' ? 'bi-heart-fill' : 'bi-search']),
    style: {
      "color": "#0d9488",
      "text-shadow": "0 4px 12px rgba(13, 148, 136, 0.3)"
    }
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.viewMode === 'liked' ? 'No liked duas yet. Start liking duas to see them here' : 'No duas found for your search'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Explore Button (only in liked mode) "), $data.viewMode === 'liked' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[12] || (_cache[12] = $event => {
      $data.viewMode = 'all';
      $options.resetPagination();
    }),
    class: "btn border-0 fw-semibold px-5 py-3 rounded-pill shadow-lg text-white",
    style: {
      "background": "linear-gradient(90deg, #0d9488, #14b8a6)",
      "transition": "all 0.3s ease",
      "font-size": "1.05rem"
    },
    onmouseover: "this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(13,148,136,0.4)'",
    onmouseout: "this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(13,148,136,0.25)'"
  }, " Explore All Duas ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredDuas, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: category.id,
      class: "mb-5",
      role: "region",
      "aria-labelledby": `category-title-${category.id}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "fw-semibold text-start mb-3 category-title",
      id: `category-title-${category.id}`
    }, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "images/art.png",
      width: "30px",
      class: "me-2",
      alt: "Category icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_39), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(category.collapsed ? 'bi bi-chevron-down action-icon' : 'bi bi-chevron-up action-icon'),
      onClick: $event => $options.toggleCategoryCollapse(category.id),
      "data-bs-toggle": "tooltip",
      "data-bs-placement": "top",
      title: category.collapsed ? 'Expand Category' : 'Collapse Category',
      "aria-label": category.collapsed ? 'Expand Category' : 'Collapse Category',
      role: "button"
    }, null, 10 /* CLASS, PROPS */, _hoisted_41)])]), !category.collapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.getPaginatedDuas(category.duas), dua => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: dua.id,
        class: "col-12 col-md-6"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card dua-card h-100 border-0 shadow-sm position-relative", {
          'border-start border-danger border-3': $data.viewMode === 'liked'
        }]),
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          '--font-size-base': $data.fontSize + 'px'
        }),
        role: "listitem",
        "aria-labelledby": `dua-title-${dua.id}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Liked Badge "), $data.viewMode === 'liked' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-heart-fill text-danger"
      }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card Body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Title "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
        class: "card-title fw-semibold mb-3 position-relative pb-2",
        id: `dua-title-${dua.id}`,
        style: {
          fontSize: 'calc(var(--font-size-base) * 1)'
        }
      }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
        src: "images/art.png",
        width: "20px",
        class: "me-2",
        alt: "Category icon"
      }, null, -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        innerHTML: $options.highlightText(dua.title)
      }, null, 8 /* PROPS */, _hoisted_47)], 8 /* PROPS */, _hoisted_46), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Arabic Text "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        class: "mb-0 font-arabic",
        lang: "ar",
        dir: "rtl",
        style: {
          fontSize: 'calc(var(--font-size-base) * 1.5)',
          lineHeight: '2.5'
        },
        innerHTML: $options.highlightText(dua.arabic),
        "aria-label": "Dua in Arabic"
      }, null, 8 /* PROPS */, _hoisted_49)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Translation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        class: "mb-3 translation-text text-muted",
        style: {
          fontSize: 'calc(var(--font-size-base))',
          lineHeight: '1.6'
        },
        innerHTML: $options.highlightText(dua.translation),
        "aria-label": "Dua translation"
      }, null, 8 /* PROPS */, _hoisted_50), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Reference "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        class: "text-muted mb-0 reference-text",
        style: {
          fontSize: 'calc(var(--font-size-base) * 0.9)'
        },
        innerHTML: $options.highlightText('- ' + dua.reference),
        "aria-label": "Dua reference"
      }, null, 8 /* PROPS */, _hoisted_51)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card Footer with Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Font Controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-link p-1",
        style: {
          "color": "#00897b"
        },
        onClick: _cache[13] || (_cache[13] = $event => $options.changeFontSize('decrease')),
        disabled: $data.fontSize <= 14,
        "aria-label": "Decrease Font Size"
      }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-dash-circle-fill fs-5"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_55), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "mx-1 bg-light",
        style: {
          "width": "1px",
          "height": "20px"
        }
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-link p-1",
        style: {
          "color": "#00897b"
        },
        onClick: _cache[14] || (_cache[14] = $event => $options.changeFontSize('increase')),
        disabled: $data.fontSize >= 28,
        "aria-label": "Increase Font Size"
      }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-plus-circle-fill fs-5"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_56)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Action Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                      :class=\"getAudioButtonClasses(dua)\"\n                      style=\"width: 36px; height: 36px;\" @click=\"handleAudioPlayback(dua)\"\n                      :aria-label=\"isAudioPlaying(dua) ? 'Stop Dua audio' : 'Play Dua audio'\">\n                      <i :class=\"isAudioPlaying(dua) ? 'bi bi-stop-fill' : 'bi bi-volume-up-fill'\"></i>\n                      <span class=\"action-tooltip\">\n                        {{ isAudioPlaying(dua) ? 'Stop audio' : hasRecordedAudio(dua) ? 'Play recorded dua' : 'Play spoken dua' }}\n                      </span>\n                    </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn",
        style: {
          "width": "36px",
          "height": "36px"
        },
        onClick: $event => $options.toggleLike(dua.id),
        "aria-label": $data.likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.likedDuas.includes(dua.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart')
      }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.likedDuas.includes(dua.id) ? 'Unlike' : 'Like'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_58), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn",
        style: {
          "width": "36px",
          "height": "36px"
        },
        onClick: $event => $options.shareOnWhatsApp(dua),
        "aria-label": "Share on WhatsApp"
      }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-share-fill"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "action-tooltip"
      }, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_60), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn",
        style: {
          "width": "36px",
          "height": "36px"
        },
        onClick: $event => $options.copyContent(dua),
        "aria-label": "Copy Content"
      }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-clipboard-fill"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "action-tooltip"
      }, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_61)])])])], 14 /* CLASS, STYLE, PROPS */, _hoisted_43)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pagination Controls "), !category.collapsed && category.duas.length > $data.duasPerPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        disabled: $data.currentPage[category.id] === 1
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "page-link",
      onClick: $event => $options.changePage('prev', category.id),
      "aria-label": "Previous page"
    }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      "aria-hidden": "true"
    }, "« Previous", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_65)], 2 /* CLASS */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.totalPages(category.duas), page => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: page,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
          active: $data.currentPage[category.id] === page
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "page-link",
        onClick: $event => $data.currentPage[category.id] = page
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(page), 9 /* TEXT, PROPS */, _hoisted_66)], 2 /* CLASS */);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        disabled: $data.currentPage[category.id] === $options.totalPages(category.duas)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "page-link",
      onClick: $event => $options.changePage('next', category.id),
      "aria-label": "Next page"
    }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      "aria-hidden": "true"
    }, "Next »", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_67)], 2 /* CLASS */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_37);
  }), 128 /* KEYED_FRAGMENT */))])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/DuaComponent.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/DuaComponent.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DuaComponent_vue_vue_type_template_id_7926cb50_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true */ "./resources/js/components/DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true");
/* harmony import */ var _DuaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DuaComponent.vue?vue&type=script&lang=js */ "./resources/js/components/DuaComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _DuaComponent_vue_vue_type_style_index_0_id_7926cb50_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css */ "./resources/js/components/DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_DuaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DuaComponent_vue_vue_type_template_id_7926cb50_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-7926cb50"],['__file',"resources/js/components/DuaComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/DuaComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/DuaComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DuaComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_style_index_0_id_7926cb50_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=style&index=0&id=7926cb50&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_template_id_7926cb50_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_template_id_7926cb50_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DuaComponent.vue?vue&type=template&id=7926cb50&scoped=true");


/***/ }),

/***/ "./resources/js/utils/duaSlugs.js":
/*!****************************************!*\
  !*** ./resources/js/utils/duaSlugs.js ***!
  \****************************************/
/***/ ((module) => {

const MAX_META_DESCRIPTION_LENGTH = 155;
const DEFAULT_META_TITLE_SUFFIX = ' · Islamic Connect Dua';
const slugify = value => {
  if (!value) return '';
  return value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};
const normalizeDescription = (value = '', fallback = '') => {
  const normalized = (value || fallback).toString().replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return fallback;
  }
  if (normalized.length <= MAX_META_DESCRIPTION_LENGTH) {
    return normalized;
  }
  return `${normalized.slice(0, MAX_META_DESCRIPTION_LENGTH - 3)}...`;
};
const escapeAttribute = value => (value || '').toString().replace(/"/g, '&quot;');
const createDuaMetadata = (collection = {}, options = {}) => {
  const {
    metaTitleSuffix = DEFAULT_META_TITLE_SUFFIX,
    metaDescriptionFallback = 'Discover Islamic duas with Arabic, transliteration, and translation.',
    assignSlugToDua = false,
    defaultOgImage = 'https://islamicconnect.com/images/banner-photo-1200.webp'
  } = options;
  const categories = Array.isArray(collection.categories) ? collection.categories : [];
  const usedSlugs = new Set();
  const metadata = [];
  categories.forEach(category => {
    const categoryId = category.id;
    const categoryName = category.name || 'Islamic Dua';
    (Array.isArray(category.duas) ? category.duas : []).forEach((dua, index) => {
      var _ref, _dua$originalId;
      const rawId = (_ref = (_dua$originalId = dua.originalId) !== null && _dua$originalId !== void 0 ? _dua$originalId : dua.id) !== null && _ref !== void 0 ? _ref : index + 1;
      const base = dua.title || dua.translation || dua.arabic || categoryName;
      const candidate = slugify(base) || `dua-${categoryId}-${rawId}`;
      let slug = candidate;
      let suffix = 1;
      while (usedSlugs.has(slug)) {
        suffix += 1;
        slug = `${candidate}-${suffix}`;
      }
      usedSlugs.add(slug);
      const reference = dua.reference || categoryName;
      const descriptionParts = [dua.translation, dua.arabic, reference].filter(Boolean);
      let metaDescription = normalizeDescription(descriptionParts.join(' · '), metaDescriptionFallback);
      if (!metaDescription) {
        metaDescription = metaDescriptionFallback;
      }
      const metaTitle = escapeAttribute(`${base}${metaTitleSuffix}`);
      if (assignSlugToDua && typeof dua === 'object') {
        dua.slug = slug;
      }
      const ogImage = dua.ogImage || defaultOgImage;
      metadata.push({
        slug,
        title: base,
        metaTitle,
        metaDescription: escapeAttribute(metaDescription),
        categoryId,
        categoryName,
        duaId: rawId,
        reference,
        ogImage,
        ogImageAlt: dua.ogImageAlt || `${base} Dua`
      });
    });
  });
  return metadata;
};
module.exports = {
  slugify,
  createDuaMetadata
};

/***/ })

}]);