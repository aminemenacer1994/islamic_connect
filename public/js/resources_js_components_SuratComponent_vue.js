"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_SuratComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookmarks/BookmarkModal.vue */ "./resources/js/components/bookmarks/BookmarkModal.vue");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SuratComponent',
  components: {
    BookmarkModal: _bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function () {
    return {
      // responsive a11y
      isMobile: false,
      // a11y
      selectedCardIndex: 0,
      screenReaderMessage: '',
      isComponentAlive: true,
      isInitialLoad: true,
      selectedSurah: "1",
      selectedReciter: "ar.alafasy",
      selectedTranslation: "en.ahmedali",
      isAudioPlaying: [],
      isAudioLoading: [],
      currentlyPlaying: null,
      currentlyPlayingIndex: 0,
      isVisible: true,
      surahs: [],
      reciters: [],
      translations: [],
      surahDetails: null,
      searchQuery: "",
      debouncedQuery: "",
      debounceTimer: null,
      arabicFontSize: 28,
      translationFontSize: 20,
      highlightedWordIndex: -1,
      progress: [],
      audioElements: [],
      playbackSpeed: 1.0,
      volume: 1.0,
      showVolumeBar: false,
      showAudioPlayer: false,
      isHighlighted: false,
      // scrubbing state
      isScrubbing: false,
      _boundMove: null,
      _boundUp: null,
      wordTimings: [],
      isLoading: false,
      continuousPlayback: true,
      // New data property for playback mode
      visualizerBars: Array(20).fill(10),
      playbackSpeeds: [0.5, 0.75, 1, 1.25, 1.5, 2],
      currentSpeedIndex: 2,
      repeatCurrent: JSON.parse(localStorage.getItem('repeatCurrent') || 'false'),
      favoriteReciters: ['ar.alafasy', 'ar.abdulbasitmurattal'],
      favoriteTranslations: ['en.ahmedali', 'en.sahih'],
      lastAutoScrollAt: 0,
      isManualScrolling: false,
      manualScrollTimer: null,
      // perf throttles
      lastProgressAt: 0,
      lastVizAt: 0,
      // request control
      _surahAborter: null,
      // delayed spinner timers per index
      loadingTimers: [],
      // virtualization
      itemHeight: 280,
      windowSize: 22,
      buffer: 6,
      visibleStart: 0,
      visibleEnd: 0,
      listTop: 0,
      // Next-step card visibility
      showNextStep: true,
      nextStepMinimized: false,
      activeAyah: null,
      savedAyahKeys: {},
      savedAyahsLoaded: false,
      savedAyahClearTimer: null,
      bookmarkToast: '',
      bookmarkToastTimer: null,
      authAlert: '',
      authAlertTimer: null,
      deepLinkTarget: null,
      deepLinkHandled: false
    };
  },
  computed: {
    filteredAyahs: function () {
      if (!this.surahDetails) return [];
      if (!this.debouncedQuery) return this.surahDetails.ayahs;
      const query = this.debouncedQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(ayah => ayah.lowerText && ayah.lowerText.includes(query) || ayah.lowerTranslation && ayah.lowerTranslation.includes(query));
    },
    recitersSorted() {
      if (!Array.isArray(this.reciters)) return [];
      const fav = new Set(this.favoriteReciters);
      return [...this.reciters].sort((a, b) => {
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        return (a.englishName || '').localeCompare(b.englishName || '');
      });
    },
    translationsSorted() {
      if (!Array.isArray(this.translations)) return [];
      const fav = new Set(this.favoriteTranslations);
      return [...this.translations].sort((a, b) => {
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        if ((a.flag || '') !== (b.flag || '')) return (a.flag || '').localeCompare(b.flag || '');
        return (a.englishName || '').localeCompare(b.englishName || '');
      });
    },
    totalItems() {
      return Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0;
    },
    visibleWindow() {
      const start = Math.max(0, Math.min(this.visibleStart, this.totalItems));
      const end = Math.max(start, Math.min(this.visibleEnd, this.totalItems));
      const out = [];
      if (!this.surahDetails || !Array.isArray(this.filteredAyahs)) return out;
      for (let i = start; i < end; i++) out.push({
        index: i,
        ayah: this.filteredAyahs[i]
      });
      return out;
    },
    topSpacerHeight() {
      return Math.max(0, this.visibleStart * this.itemHeight);
    },
    bottomSpacerHeight() {
      const end = Math.max(this.visibleEnd, this.visibleStart);
      const remaining = Math.max(0, this.totalItems - end);
      return remaining * this.itemHeight;
    }
  },
  watch: {
    savedAyahKeys: {
      deep: true,
      handler(next) {
        this.persistSavedAyahs(next);
      }
    },
    searchQuery: function (val) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.debouncedQuery = val;
      }, 300);
    },
    selectedReciter: function (newVal) {
      if (newVal && !this.isLoading) {
        this.isLoading = true;
        this.savePreference("selectedReciter", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.syncVirtualWindowAfterSelection();
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    selectedTranslation: function (newVal) {
      if (newVal && !this.isLoading) {
        this.isLoading = true;
        this.savePreference("selectedTranslation", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.isLoading = false;
          this.resetAllAudioPlayers();
          this.syncVirtualWindowAfterSelection();
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    selectedSurah: function (newVal) {
      if (newVal && !this.isLoading) {
        this.isLoading = true;
        this.savePreference("selectedSurah", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.syncVirtualWindowAfterSelection();
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    filteredAyahs: function (newAyahs) {
      const n = newAyahs.length;
      // Reuse arrays to reduce reactive churn
      this.isAudioPlaying.length = n;
      this.isAudioPlaying.fill(false);
      this.isAudioLoading.length = n;
      this.isAudioLoading.fill(false);
      this.progress.length = n;
      this.progress.fill(0);
      this.audioElements.length = n;
      for (let i = 0; i < n; i++) if (this.audioElements[i] === undefined) this.audioElements[i] = null;
      // Do not pre-create audio elements; create on-demand for faster starts
      // Reset virtualization window to top
      this.visibleStart = 0;
      this.visibleEnd = Math.min(this.windowSize + this.buffer * 2, n);
      this.$nextTick(this.updateVirtualWindow);
    }
  },
  created() {
    this.loadSavedAyahs();
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
    this.updateIsMobile();
    window.addEventListener('resize', this.updateIsMobile);
    // Restore dismissal state for next-step card
    try {
      if (localStorage.getItem('suratNextStepDismissed') === '1') this.showNextStep = false;
    } catch (_) {}
    this.syncSavedAyahsFromApi();
    // Virtualization hooks
    this.$nextTick(() => {
      this.computeListTop();
      this.updateVirtualWindow();
      this.$nextTick(this.calibrateItemHeight);
      window.addEventListener('scroll', this.onScrollVirtual, {
        passive: true
      });
      window.addEventListener('resize', this.computeListTop, {
        passive: true
      });
      window.addEventListener('resize', this.calibrateItemHeight, {
        passive: true
      });
    });
    // Restore next-step minimized state
    try {
      this.nextStepMinimized = localStorage.getItem('suratNextStepMinimized') === '1';
    } catch (_) {}
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('resize', this.updateIsMobile);
    window.removeEventListener('scroll', this.onScrollVirtual);
    window.removeEventListener('resize', this.computeListTop);
    window.removeEventListener('resize', this.calibrateItemHeight);
    clearTimeout(this.savedAyahClearTimer);
    clearTimeout(this.bookmarkToastTimer);
    clearTimeout(this.authAlertTimer);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('resize', this.updateIsMobile);
    window.removeEventListener('scroll', this.onScrollVirtual);
    window.removeEventListener('resize', this.computeListTop);
    window.removeEventListener('resize', this.calibrateItemHeight);
    clearTimeout(this.savedAyahClearTimer);
    clearTimeout(this.bookmarkToastTimer);
    clearTimeout(this.authAlertTimer);
  },
  methods: {
    showToast(message, timeout = 3500) {
      this.bookmarkToast = message;
      clearTimeout(this.bookmarkToastTimer);
      this.bookmarkToastTimer = setTimeout(() => {
        this.bookmarkToast = '';
      }, timeout);
    },
    announce(message, timeout = 5000) {
      this.screenReaderMessage = message;
      clearTimeout(this.savedAyahClearTimer);
      this.savedAyahClearTimer = setTimeout(() => {
        this.screenReaderMessage = '';
      }, timeout);
    },
    loadSavedAyahs() {
      if (this.savedAyahsLoaded) return;
      try {
        const sessionStored = sessionStorage.getItem('ic_saved_ayahs_session');
        if (sessionStored) {
          this.savedAyahKeys = JSON.parse(sessionStored) || {};
        } else {
          const legacyStored = localStorage.getItem('ic_saved_ayahs');
          this.savedAyahKeys = legacyStored ? JSON.parse(legacyStored) : {};
          if (legacyStored) {
            sessionStorage.setItem('ic_saved_ayahs_session', legacyStored);
          }
        }
      } catch (_) {
        this.savedAyahKeys = {};
      }
      this.savedAyahsLoaded = true;
    },
    buildAyahMessage(ayah, options = {}) {
      var _this$surahDetails, _this$surahDetails2, _this$surahDetails3;
      if (!ayah) return '';
      const includeAudio = options.includeAudio !== false;
      const surahNumber = (_this$surahDetails = this.surahDetails) === null || _this$surahDetails === void 0 ? void 0 : _this$surahDetails.surahNumber;
      const surahName = ((_this$surahDetails2 = this.surahDetails) === null || _this$surahDetails2 === void 0 ? void 0 : _this$surahDetails2.englishName) || ((_this$surahDetails3 = this.surahDetails) === null || _this$surahDetails3 === void 0 ? void 0 : _this$surahDetails3.name);
      const ayahNumber = ayah.numberInSurah || ayah.number;
      let header = 'Surah';
      if (surahNumber) header += ` ${surahNumber}`;
      if (surahName) header += ` - ${surahName}`;
      if (ayahNumber) header += ` (Ayah ${ayahNumber})`;
      const lines = [header];
      if (ayah.text) lines.push(`Arabic: ${ayah.text}`);
      if (ayah.translation) lines.push(`Translation: ${ayah.translation}`);
      if (includeAudio && ayah.audio) lines.push(`Listen here: ${ayah.audio}`);
      return lines.filter(Boolean).join('\n\n');
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
    async copyAyah(ayah) {
      const message = this.buildAyahMessage(ayah, {
        includeAudio: true
      });
      if (!message) return;
      const ok = await this.copyText(message);
      if (ok) {
        this.showToast('Ayah copied to clipboard.');
        this.announce('Ayah copied to clipboard.');
      } else {
        var _this$$toast;
        (_this$$toast = this.$toast) === null || _this$$toast === void 0 || _this$$toast.error('Unable to copy ayah.');
        this.announce('Unable to copy ayah.');
      }
    },
    async syncSavedAyahsFromApi() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks');
        const bookmarks = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || [];
        if (!Array.isArray(bookmarks)) return;
        const next = {};
        bookmarks.forEach(bookmark => {
          var _bookmark$ayah, _bookmark$ayah2;
          const surahNumber = Number(bookmark.surah_number || ((_bookmark$ayah = bookmark.ayah) === null || _bookmark$ayah === void 0 ? void 0 : _bookmark$ayah.surah_id));
          const ayahNumber = Number(bookmark.ayah_number || bookmark.ayah_num);
          const ayahInSurah = Number((_bookmark$ayah2 = bookmark.ayah) === null || _bookmark$ayah2 === void 0 ? void 0 : _bookmark$ayah2.ayah_id);
          if (surahNumber && ayahNumber) {
            next[this.buildAyahKey(surahNumber, ayahNumber)] = true;
          }
          if (surahNumber && ayahInSurah) {
            next[this.buildAyahKey(surahNumber, ayahInSurah)] = true;
          }
        });
        this.savedAyahKeys = next;
      } catch (_) {
        // Ignore sync failures; local state still works.
      }
    },
    buildAyahKey(surahNumber, ayahNumber) {
      return `${surahNumber}:${ayahNumber}`;
    },
    isAyahSaved(ayah) {
      if (!ayah || !this.surahDetails) return false;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      return !!this.savedAyahKeys[this.buildAyahKey(surahNumber, ayahNumber)];
    },
    async openBookmarkModal(ayah) {
      if (!this.surahDetails || !ayah) return;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      this.activeAyah = {
        surah_number: Number(this.surahDetails.surahNumber),
        surah_name: this.surahDetails.englishName || this.surahDetails.name || 'Surah',
        ayah_number: ayahNumber,
        ayah_verse_ar: ayah.text || '',
        ayah_verse_en: ayah.translation || ''
      };
    },
    onBookmarkSaved(payload) {
      this.announce('Ayah saved to bookmarks.');
      this.showToast('Bookmark saved successfully.', 4000);
      if (!payload) return;
      const source = payload.bookmark || payload;
      const surahNumber = Number(source.surah_number);
      const ayahNumber = Number(source.ayah_number || source.ayah_num);
      if (!surahNumber || !ayahNumber) return;
      const next = _objectSpread({}, this.savedAyahKeys);
      next[this.buildAyahKey(surahNumber, ayahNumber)] = true;
      this.savedAyahKeys = next;
    },
    async onBookmarksLinkClick() {
      const isAuthed = await this.ensureAuthenticated();
      if (isAuthed) {
        window.location.href = '/bookmarks';
      }
    },
    async ensureAuthenticated() {
      try {
        var _response$data2;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
        if ((_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.userId) {
          return true;
        }
      } catch (_) {
        // fall through
      }
      this.showAuthAlert();
      return false;
    },
    showAuthAlert() {
      this.authAlert = 'Please log in to use bookmarks.';
      clearTimeout(this.authAlertTimer);
      this.authAlertTimer = setTimeout(() => {
        this.authAlert = '';
      }, 6000);
    },
    persistSavedAyahs(next) {
      try {
        sessionStorage.setItem('ic_saved_ayahs_session', JSON.stringify(next));
        localStorage.setItem('ic_saved_ayahs', JSON.stringify(next));
      } catch (_) {
        // no-op
      }
    },
    onAyahDragStart(ayah, event) {
      if (!event || !this.surahDetails || !ayah) return;
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const payload = {
        surah_number: Number(this.surahDetails.surahNumber),
        surah_name: this.surahDetails.englishName || this.surahDetails.name || 'Surah',
        ayah_number: ayahNumber,
        ayah_verse_ar: ayah.text || '',
        ayah_verse_en: ayah.translation || ''
      };
      event.dataTransfer.setData('text/plain', JSON.stringify(payload));
      event.dataTransfer.effectAllowed = 'copyMove';
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
      try {
        localStorage.setItem('suratNextStepMinimized', this.nextStepMinimized ? '1' : '0');
      } catch (_) {}
    },
    dismissNextStep() {
      this.showNextStep = false;
      try {
        localStorage.setItem('suratNextStepDismissed', '1');
      } catch (_) {}
    },
    calibrateItemHeight() {
      try {
        const el = this.$el.querySelector('.ayah-card-container');
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect && rect.height > 0) {
          this.itemHeight = Math.round(rect.height + 24); // include margins/padding buffer
          this.updateVirtualWindow();
        }
      } catch (_) {}
    },
    computeListTop() {
      try {
        const el = this.$refs.listContainer;
        if (!el) {
          this.listTop = 0;
          return;
        }
        const rect = el.getBoundingClientRect();
        this.listTop = rect.top + window.scrollY;
      } catch (_) {
        this.listTop = 0;
      }
    },
    onScrollVirtual() {
      this.updateVirtualWindow();
    },
    updateVirtualWindow() {
      const n = this.filteredAyahs ? this.filteredAyahs.length : 0;
      if (n === 0) {
        this.visibleStart = 0;
        this.visibleEnd = 0;
        return;
      }
      const y = window.scrollY - this.listTop;
      // If we are at or above the list top, pin to start
      if (window.scrollY <= this.listTop + 5) {
        this.visibleStart = 0;
        this.visibleEnd = Math.min(n, this.windowSize + this.buffer * 2);
        return;
      }
      const approxIndex = Math.max(0, Math.floor(y / Math.max(1, this.itemHeight)));
      const start = Math.max(0, approxIndex - this.buffer);
      const end = Math.min(n, start + this.windowSize + this.buffer * 2);
      if (start !== this.visibleStart || end !== this.visibleEnd) {
        this.visibleStart = start;
        this.visibleEnd = end;
      }
    },
    syncVirtualWindowAfterSelection() {
      const total = this.filteredAyahs ? this.filteredAyahs.length : 0;
      this.visibleStart = 0;
      this.visibleEnd = Math.min(total, this.windowSize + this.buffer * 2);
      this.$nextTick(() => {
        this.computeListTop();
        this.updateVirtualWindow();
      });
    },
    readDeepLinkTarget() {
      if (typeof window === 'undefined') return null;
      const params = new URLSearchParams(window.location.search || '');
      const surah = Number(params.get('surah'));
      const ayah = Number(params.get('ayah'));
      if (!surah) return null;
      return {
        surah,
        ayah: ayah || null
      };
    },
    maybeScrollToDeepLink() {
      if (this.deepLinkHandled || !this.deepLinkTarget || !this.surahDetails) return;
      const surahNumber = Number(this.deepLinkTarget.surah);
      if (!surahNumber || Number(this.surahDetails.surahNumber) !== surahNumber) return;
      const ayahNumber = Number(this.deepLinkTarget.ayah);
      if (!ayahNumber) {
        this.deepLinkHandled = true;
        return;
      }
      const index = ayahNumber - 1;
      if (!Array.isArray(this.surahDetails.ayahs) || index < 0 || index >= this.surahDetails.ayahs.length) {
        this.deepLinkHandled = true;
        return;
      }
      this.deepLinkHandled = true;
      this.scrollToAyahIndex(index);
    },
    scrollToAyahIndex(index) {
      const total = Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0;
      if (!total || index < 0 || index >= total) return;
      const start = Math.max(0, index - this.buffer);
      const end = Math.min(total, start + this.windowSize + this.buffer * 2);
      this.visibleStart = start;
      this.visibleEnd = end;
      this.$nextTick(() => {
        this.computeListTop();
        this.calibrateItemHeight();
        this.$nextTick(() => {
          const offset = this.isVisible ? 140 : 100;
          const targetTop = this.listTop + index * this.itemHeight - offset;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });
          this.selectCard(index);
        });
      });
    },
    // simple localStorage cache with TTL and SWR
    async cachedFetchJSON(url, cacheKey, ttlMs = 24 * 60 * 60 * 1000) {
      try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          const {
            ts,
            data
          } = JSON.parse(raw);
          if (Date.now() - ts < ttlMs) {
            // return cached immediately
            return {
              data,
              fromCache: true
            };
          }
        }
      } catch (_) {}
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          ts: Date.now(),
          data: json
        }));
      } catch (_) {}
      return {
        data: json,
        fromCache: false
      };
    },
    onKeydown(e) {
      var _e$target;
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      if ((_e$target = e.target) !== null && _e$target !== void 0 && _e$target.isContentEditable || ['input', 'textarea', 'select'].includes(tag)) return;
      if (!Array.isArray(this.filteredAyahs) || this.filteredAyahs.length === 0) return;
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          this.goToNextCard();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          this.goToPreviousCard();
          break;
        case 'Home':
          e.preventDefault();
          this.goToFirstCard();
          break;
        case 'End':
          e.preventDefault();
          this.goToLastCard();
          break;
      }
    },
    selectCard(index) {
      this.selectedCardIndex = index;
      // ensure card is visible
      // removed programmatic scrolling
      const verseNum = index + 1;
      this.screenReaderMessage = `Selected verse ${verseNum}.`;
    },
    goToNextCard() {
      const next = (this.selectedCardIndex + 1) % this.filteredAyahs.length;
      this.selectCard(next);
    },
    goToPreviousCard() {
      const prev = (this.selectedCardIndex - 1 + this.filteredAyahs.length) % this.filteredAyahs.length;
      this.selectCard(prev);
    },
    goToFirstCard() {
      this.selectCard(0);
    },
    goToLastCard() {
      this.selectCard(this.filteredAyahs.length - 1);
    },
    updateIsMobile() {
      try {
        this.isMobile = window.matchMedia('(max-width: 767px)').matches;
      } catch (e) {
        this.isMobile = window.innerWidth <= 767;
      }
    },
    // removed ensureCardPositionsCached and fallbackCardPositions (scrollbar-related)

    isElementVisible: function (element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Check if element has valid dimensions
      if (rect.height <= 0 || rect.width <= 0) return false;

      // Check if element is within viewport bounds
      const isInViewport = rect.top < windowHeight && rect.bottom > 0 && rect.left < windowWidth && rect.right > 0;
      return isInViewport;
    },
    isElementValid: function (element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();

      // Check if element has valid dimensions
      if (rect.height <= 0 || rect.width <= 0) return false;

      // Check if element exists in the DOM (basic check)
      if (!element.offsetParent && element !== document.body) return false;
      return true;
    },
    getElementPosition: function (element) {
      if (!element || !this.isElementValid(element)) {
        return null;
      }
      try {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;

        // Basic sanity check
        if (isNaN(elementTop) || elementTop < 0) {
          return null;
        }

        // Additional check for unreasonably high positions (might indicate loading issue)
        const documentHeight = document.documentElement.scrollHeight;
        if (elementTop > documentHeight * 0.9) {
          console.warn(`Element position seems too high: ${elementTop}, document height: ${documentHeight}`);
          return null;
        }
        return elementTop;
      } catch (error) {
        console.error('Error getting element position:', error);
        return null;
      }
    },
    // removed scrollToElement and smoothScrollToAyah
    highlightedText: function (ayah) {
      if (!ayah || !ayah.text && !ayah.words) return "";
      const words = ayah.words || (ayah.text ? ayah.text.split(" ") : []);
      return words.map((word, index) => {
        const isHighlighted = index === this.highlightedWordIndex ? "highlighted-word" : "";
        return `<span class="${isHighlighted}">${word}</span>`;
      }).join(" ");
    },
    // removed bulk initialization and preloading for performance
    playAudio: function (index) {
      console.log('Attempting to play audio for index:', index);
      if (index < 0 || index >= this.filteredAyahs.length) return;

      // Defer showing loading spinner to avoid flicker; only show if slow (>200ms)
      clearTimeout(this.loadingTimers[index]);
      this.loadingTimers[index] = setTimeout(() => {
        this.$set ? this.$set(this.isAudioLoading, index, true) : this.isAudioLoading[index] = true;
      }, 200);

      // Stop any currently playing audio and ensure exclusivity
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        console.log('Pausing currently playing audio');
        try {
          this.currentlyPlaying.pause();
        } catch (_) {}
        try {
          this.currentlyPlaying.currentTime = 0;
        } catch (_) {}
      }
      // Pause any stray audios just in case
      if (Array.isArray(this.audioElements)) {
        this.audioElements.forEach((a, i) => {
          if (a && i !== index) {
            try {
              a.pause();
            } catch (_) {}
          }
        });
      }

      // Build or update audio element on-demand
      const ayah = this.filteredAyahs[index];
      let audio = this.audioElements[index];
      if (!audio) {
        audio = new Audio();
        // use auto for current, metadata for preloaded next
        audio.preload = 'auto';
        audio.addEventListener("timeupdate", () => this.updateProgress(index));
        audio.addEventListener("ended", () => this.handleAyahEnd(index));
        audio.addEventListener("error", e => {
          var _this$$toast2;
          console.error(`Audio error for ayah ${index + 1}:`, e);
          clearTimeout(this.loadingTimers[index]);
          this.isAudioLoading[index] = false;
          this.isAudioPlaying[index] = false;
          (_this$$toast2 = this.$toast) === null || _this$$toast2 === void 0 || _this$$toast2.error(`Failed to load audio for ayah ${index + 1}`);
        });
        this.audioElements[index] = audio;
      }
      if (audio.src !== ayah.audio) {
        try {
          audio.pause();
        } catch (_) {}
        audio.src = ayah.audio || '';
      }
      audio.playbackRate = this.playbackSpeed;
      audio.volume = this.volume;

      // Update playing states
      this.isAudioPlaying = this.isAudioPlaying.map((_, i) => i === index);
      this.currentlyPlaying = audio;
      this.currentlyPlayingIndex = index;
      this.isHighlighted = true;

      // Setup metadata and word timing
      audio.onloadedmetadata = () => {
        console.log(`Metadata loaded for ayah ${index + 1}, duration: ${this.currentlyPlaying.duration}`);
        const duration = this.currentlyPlaying.duration;
        const wordCount = (ayah.words || (ayah.text ? ayah.text.split(' ') : [])).length;
        if (wordCount > 0 && duration > 0) {
          const step = duration / wordCount;
          this.wordTimings = Array.from({
            length: wordCount
          }, (_, i) => i * step);
        } else {
          this.wordTimings = [];
        }
      };
      this.highlightedWordIndex = -1;
      audio.ontimeupdate = () => {
        this.syncHighlight();
        const now = window.performance ? performance.now() : Date.now();
        if (now - this.lastProgressAt > 100) {
          // ~10fps progress updates
          this.lastProgressAt = now;
          this.updateProgress(index);
        }
        // Removed continuous auto-scroll here to prevent jumpiness.
      };

      // Optimistic immediate play, fallback to 'canplay' (faster than 'canplaythrough')
      const markPlaying = () => {
        clearTimeout(this.loadingTimers[index]);
        this.isAudioPlaying[index] = true;
        this.isAudioLoading[index] = false;
        this.isHighlighted = true;
        this.showAudioPlayer = true;
        this.animateVisualizer();
        // Opportunistically warm next ayah
        this.prepareNextAudio(index + 1);
      };
      const tryPlay = () => {
        const p = audio.play();
        if (p && typeof p.then === 'function') {
          p.then(() => {
            markPlaying();
          }).catch(err => {
            // If playback fails (e.g., not enough data), wait for 'canplay' and retry once
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay);
              const p2 = audio.play();
              if (p2 && typeof p2.then === 'function') {
                p2.then(() => markPlaying()).catch(() => {});
              } else {
                markPlaying();
              }
            };
            audio.addEventListener('canplay', onCanPlay, {
              once: true
            });
          });
        } else {
          markPlaying();
        }
      };
      tryPlay();
    },
    pauseAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Pausing audio for ayah ${index + 1}`);
        this.audioElements[index].pause();
        clearTimeout(this.loadingTimers[index]);
        this.isAudioPlaying[index] = false;
        this.isAudioLoading[index] = false;
      }
    },
    toggleAudioPlayer: function (index) {
      console.log('Toggling audio player for index:', index);
      if (!this.isAudioPlaying[index]) {
        this.playAudio(index);
      } else {
        this.pauseAudio(index);
      }
    },
    stopAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Stopping audio for ayah ${index + 1}`);
        this.audioElements[index].pause();
        this.audioElements[index].currentTime = 0;
        clearTimeout(this.loadingTimers[index]);
        this.isAudioPlaying[index] = false;
        this.isAudioLoading[index] = false;
        this.progress[index] = 0;
        this.isHighlighted = false;
      }
    },
    rewindAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Rewinding audio for ayah ${index + 1}`);
        this.audioElements[index].currentTime = Math.max(0, this.audioElements[index].currentTime - 15);
        // removed auto-scroll on rewind
      }
    },
    fastForwardAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Fast forwarding audio for ayah ${index + 1}`);
        this.audioElements[index].currentTime = Math.min(this.audioElements[index].duration, this.audioElements[index].currentTime + 20);
        // removed auto-scroll on fast-forward
      }
    },
    // Prepare next audio element to reduce start latency on next ayah
    prepareNextAudio(nextIndex) {
      if (nextIndex == null || nextIndex >= this.filteredAyahs.length) return;
      const nextAyah = this.filteredAyahs[nextIndex];
      if (!nextAyah || !nextAyah.audio) return;
      let a = this.audioElements[nextIndex];
      if (!a) {
        a = new Audio();
        a.preload = 'metadata';
        this.audioElements[nextIndex] = a;
      }
      if (a.src !== nextAyah.audio) {
        try {
          a.pause();
        } catch (_) {}
        a.src = nextAyah.audio;
        try {
          a.load();
        } catch (_) {}
      }
      a.volume = this.volume;
      a.playbackRate = this.playbackSpeed;
    },
    updateProgress: function (index) {
      if (this.audioElements[index] && this.audioElements[index].duration) {
        const progress = this.audioElements[index].currentTime / this.audioElements[index].duration * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime: function (seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return (minutes < 10 ? '0' : '') + minutes + ':' + (secs < 10 ? '0' : '') + secs;
    },
    highlightText(text) {
      if (!this.debouncedQuery.trim()) return text;
      let highlightedText = text;
      const escapeRegExp = string => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };
      const searchTerms = this.debouncedQuery.trim() ? this.debouncedQuery.trim().split(/\s+/) : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight-search">$1</span>');
      });
      return highlightedText;
    },
    toggleVisibility: function () {
      this.isVisible = !this.isVisible;
    },
    increaseFontSize: function () {
      if (this.arabicFontSize < 40) this.arabicFontSize += 2;
      if (this.translationFontSize < 30) this.translationFontSize += 2;
    },
    decreaseFontSize: function () {
      if (this.arabicFontSize > 16) this.arabicFontSize -= 2;
      if (this.translationFontSize > 12) this.translationFontSize -= 2;
    },
    shareOnWhatsApp: function (ayah) {
      const message = this.buildAyahMessage(ayah, {
        includeAudio: true
      });
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = 'https://api.whatsapp.com/send?text=' + encodedMessage;
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    },
    getFlagFromLanguage: function (lang) {
      const languageFlags = {
        'en': '🇬🇧',
        'ar': '🇸🇦',
        'fr': '🇫🇷',
        'es': '🇪🇸',
        'ur': '🇵🇰',
        'tr': '🇹🇷',
        'id': '🇮🇩',
        'bn': '🇧🇩',
        'fa': '🇮🇷',
        'ru': '🇷🇺',
        'de': '🇩🇪',
        'it': '🇮🇹',
        'sw': '🇹🇿',
        'zh': '🇨🇳',
        'hi': '🇮🇳'
      };
      return languageFlags[lang.toLowerCase()] || '🌐';
    },
    fetchSurahs: async function () {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", 'cache:surahs');
        if (!this._isDestroyed) this.surahs = data.data || [];
        this.isLoading = false;
        // Revalidate in background if served from cache
        if (fromCache) setTimeout(() => this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", 'cache:surahs').then(({
          data
        }) => {
          if (!this._isDestroyed) this.surahs = data.data || [];
        }), 0);
      } catch (error) {
        console.error("Error fetching Surahs:", error);
        this.isLoading = false;
      }
    },
    async fetchReciters() {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", 'cache:reciters');
        if (!this._isDestroyed) {
          this.reciters = data.data.filter(reciter => reciter.identifier && reciter.englishName).map(reciter => ({
            identifier: reciter.identifier,
            englishName: reciter.englishName || "Unknown Reciter"
          })).filter(reciter => !['elmir kuliev 2 by 1muslimapp', 'elmir kuliev by 1muslimapp', 'elmir kuliev elevatemuslim', 'elmir kuliev 1muslim', 'elmir kuliev 2muslim', 'chinese', 'ibrahim walk', 'fooladvand - hedayatfar', 'shamshad ali khan', 'youssouf leclerc'].includes(reciter.englishName.toLowerCase()));
        }
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try {
            const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", 'cache:reciters');
            if (!this._isDestroyed) this.reciters = fresh.data.data.filter(r => r.identifier && r.englishName).map(r => ({
              identifier: r.identifier,
              englishName: r.englishName || "Unknown Reciter"
            })).filter(r => !['elmir kuliev 2 by 1muslimapp', 'elmir kuliev by 1muslimapp', 'elmir kuliev elevatemuslim', 'elmir kuliev 1muslim', 'elmir kuliev 2muslim', 'chinese', 'ibrahim walk', 'fooladvand - hedayatfar', 'shamshad ali khan', 'youssouf leclerc'].includes(r.englishName.toLowerCase()));
          } catch (_) {}
        }, 0);
      } catch (error) {
        console.error("Error fetching Reciters:", error);
        this.isLoading = false;
      }
    },
    async fetchTranslations() {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", 'cache:translations');
        if (this._isDestroyed) return;
        if (!data.data) {
          console.error("No translation data received from API");
          this.translations = [];
          this.isLoading = false;
          return;
        }
        const translations = data.data.map(translation => ({
          identifier: translation.identifier,
          englishName: translation.englishName || "Unknown Translation",
          language: translation.language || "Unknown",
          flag: this.getFlagFromLanguage(translation.language || "Unknown")
        })).filter(translation => translation.flag !== '🌐');
        translations.sort((a, b) => {
          if (a.flag < b.flag) return -1;
          if (a.flag > b.flag) return 1;
          if (a.englishName < b.englishName) return -1;
          if (a.englishName > b.englishName) return 1;
          return 0;
        });
        this.translations = translations;
        console.log('Translations fetched:', translations);
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try {
            const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", 'cache:translations');
            if (this._isDestroyed) return;
            const trs = fresh.data.data.map(t => ({
              identifier: t.identifier,
              englishName: t.englishName || "Unknown Translation",
              language: t.language || "Unknown",
              flag: this.getFlagFromLanguage(t.language || "Unknown")
            })).filter(t => t.flag !== '🌐');
            trs.sort((a, b) => a.flag < b.flag ? -1 : a.flag > b.flag ? 1 : a.englishName < b.englishName ? -1 : a.englishName > b.englishName ? 1 : 0);
            this.translations = trs;
          } catch (_) {}
        }, 0);
      } catch (error) {
        var _this$$toast3;
        console.error("Error fetching Translations:", error);
        this.translations = [];
        (_this$$toast3 = this.$toast) === null || _this$$toast3 === void 0 || _this$$toast3.error("Failed to load translations");
        this.isLoading = false;
      }
    },
    fetchSurahDetails: function () {
      if (!this.selectedSurah || !this.selectedReciter || !this.selectedTranslation) return Promise.resolve();
      this.isLoading = true;
      const cacheKey = `cache:surah:${this.selectedSurah}:${this.selectedReciter}:${this.selectedTranslation}`;

      // Serve from cache immediately if available
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const obj = JSON.parse(cached);
          if (obj && obj.ts) {
            const data = obj.data;
            const arabicText = data.data[0];
            const translation = data.data[1];
            this.surahDetails = {
              surahNumber: this.selectedSurah,
              englishName: arabicText.englishName,
              name: arabicText.name,
              ayahs: arabicText.ayahs.map((ayah, index) => {
                const text = ayah.text || '';
                const transText = translation.ayahs[index] && translation.ayahs[index].text ? translation.ayahs[index].text : "Translation not available";
                const words = text ? text.split(' ') : [];
                return {
                  number: ayah.numberInSurah || ayah.number,
                  numberInSurah: ayah.numberInSurah,
                  globalNumber: ayah.number,
                  text,
                  lowerText: text.toLowerCase(),
                  translation: transText,
                  lowerTranslation: transText.toLowerCase(),
                  audio: ayah.audio || "",
                  words
                };
              })
            };
            this.isLoading = false;
            // Pre-warm current and next from cache path as well
            this.$nextTick(() => {
              this.prepareNextAudio(0);
              this.prepareNextAudio(1);
            });
          }
        }
      } catch (_) {}

      // Abort any in-flight request
      try {
        if (this._surahAborter) this._surahAborter.abort();
      } catch (_) {}
      this._surahAborter = new AbortController();
      const {
        signal
      } = this._surahAborter;
      return fetch(`https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`, {
        signal
      }).then(response => {
        if (!response.ok) throw new Error(`Failed to fetch Surah details: ${response.status}`);
        return response.json();
      }).then(data => {
        if (this._isDestroyed) return;
        // persist cache
        try {
          localStorage.setItem(cacheKey, JSON.stringify({
            ts: Date.now(),
            data
          }));
        } catch (_) {}
        const arabicText = data.data[0];
        const translation = data.data[1];
        this.surahDetails = {
          surahNumber: this.selectedSurah,
          englishName: arabicText.englishName,
          name: arabicText.name,
          ayahs: arabicText.ayahs.map((ayah, index) => {
            const text = ayah.text || '';
            const transText = translation.ayahs[index] && translation.ayahs[index].text ? translation.ayahs[index].text : "Translation not available";
            const words = text ? text.split(' ') : [];
            return {
              number: ayah.numberInSurah || ayah.number,
              numberInSurah: ayah.numberInSurah,
              globalNumber: ayah.number,
              text,
              lowerText: text.toLowerCase(),
              translation: transText,
              lowerTranslation: transText.toLowerCase(),
              audio: ayah.audio || "",
              words
            };
          })
        };
        console.log('Surah details fetched:', this.surahDetails);
        this.isLoading = false;
        // Pre-warm the first and next ayah for instant playback
        this.$nextTick(() => {
          this.prepareNextAudio(0);
          this.prepareNextAudio(1);
        });
      }).catch(error => {
        if ((error === null || error === void 0 ? void 0 : error.name) === 'AbortError') return; // expected on change
        console.error("Error fetching Surah details:", error);
        this.isLoading = false;
      });
    },
    resetAllAudioPlayers: function () {
      this.$nextTick(() => {
        if (this.currentlyPlaying) {
          this.currentlyPlaying.pause();
          this.currentlyPlaying = null;
          this.currentlyPlayingIndex = 0;
        }
        // Clear references; recreate on-demand for speed
        if (this.audioElements && this.audioElements.forEach) {
          this.audioElements.forEach(audio => {
            try {
              if (audio && audio.pause) audio.pause();
            } catch (_) {}
          });
        }
        this.audioElements = new Array(this.filteredAyahs.length).fill(null);
        this.isAudioPlaying = new Array(this.filteredAyahs.length).fill(false);
        this.isAudioLoading = new Array(this.filteredAyahs.length).fill(false);
        this.progress = new Array(this.filteredAyahs.length).fill(0);
      });
    },
    savePreference: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    handleAyahEnd: function (index) {
      if (this.isAudioPlaying[index]) {
        this.stopAudio(index);
        if (this.repeatCurrent) {
          this.toggleAudioPlayer(index);
        } else if (this.continuousPlayback) {
          this.playNextAyah(index);
        } else {
          console.log(`Continuous playback disabled, stopping after ayah ${index + 1}`);
        }
      }
    },
    // playNextAyah: function () {
    //   if (this.filteredAyahs.length > 0) {
    //     const nextIndex = (this.currentlyPlayingIndex + 1) % this.filteredAyahs.length;
    //     if (nextIndex < this.filteredAyahs.length && this.audioElements[nextIndex]) {
    //       console.log(`Playing next ayah: ${nextIndex + 1}`);

    //       // Stop current auto-scroll before starting new one
    //       this.stopAutoScroll();

    //       // Small delay to ensure smooth transition
    //       setTimeout(() => {
    //         this.playAudio(nextIndex);
    //       }, 100);
    //     } else {
    //       console.warn(`Cannot play next ayah: index ${nextIndex} invalid or no audio element`);
    //     }
    //   }
    // },
    playNextAyah(currentIndex) {
      if (currentIndex + 1 < this.filteredAyahs.length) {
        this.stopAudio(currentIndex);
        this.toggleAudioPlayer(currentIndex + 1); // Play next ayah
      } else {
        // End of surah: do not auto-stop if continuousPlaybackLoop is desired.
        // Default: stop at the end of the surah.
        this.stopAudio(currentIndex);
        this.showAudioPlayer = false;
        this.currentlyPlayingIndex = -1;
      }
    },
    playPrevAyah(currentIndex) {
      const prev = Math.max(0, currentIndex - 1);
      if (this.filteredAyahs.length > 0 && this.audioElements[prev]) {
        if (currentIndex !== prev) this.stopAudio(currentIndex);
        this.toggleAudioPlayer(prev);
      }
    },
    toggleVolume: function () {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume: function () {
      if (this.currentlyPlaying) {
        this.currentlyPlaying.volume = this.volume;
      }
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach(audio => {
          if (audio) audio.volume = this.volume;
        });
      }
    },
    closeAudioPlayer: function () {
      if (this.currentlyPlayingIndex !== null) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = 0;
      this.currentlyPlaying = null;
      this.isHighlighted = false;
    },
    syncHighlight: function () {
      const audio = this.currentlyPlaying;
      if (!audio || !this.wordTimings.length) return;
      const currentTime = audio.currentTime;
      const index = this.wordTimings.findIndex((t, i, arr) => {
        return currentTime >= t && (i === arr.length - 1 || currentTime < arr[i + 1]);
      });
      this.highlightedWordIndex = index;
    },
    seekToPosition: function (event) {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (!audio || !audio.duration) return;
      const progressBar = this.$refs.progressBar;
      if (!progressBar) return;
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * audio.duration;
      audio.currentTime = Math.max(0, Math.min(newTime, audio.duration));

      // Update progress immediately
      this.updateProgress(this.currentlyPlayingIndex);
      console.log(`Seeking to ${newTime.toFixed(2)}s (${(percentage * 100).toFixed(1)}%)`);
    },
    onProgressDown(e) {
      var _e$touches$;
      if (!this.$refs.progressBar) return;
      const isTouch = e.type === 'touchstart';
      const clientX = isTouch ? e.touches && ((_e$touches$ = e.touches[0]) === null || _e$touches$ === void 0 ? void 0 : _e$touches$.clientX) : e.clientX;
      this.isScrubbing = true;
      // bind listeners once
      this._boundMove = this.onProgressMove;
      this._boundUp = this.onProgressUp;
      window.addEventListener('mousemove', this._boundMove, {
        passive: false
      });
      window.addEventListener('touchmove', this._boundMove, {
        passive: false
      });
      window.addEventListener('mouseup', this._boundUp, {
        passive: true
      });
      window.addEventListener('touchend', this._boundUp, {
        passive: true
      });
      this._updateScrubAt(clientX);
    },
    onProgressMove(e) {
      var _e$touches$2, _e$preventDefault;
      if (!this.isScrubbing) return;
      const isTouch = e.type === 'touchmove';
      const clientX = isTouch ? e.touches && ((_e$touches$2 = e.touches[0]) === null || _e$touches$2 === void 0 ? void 0 : _e$touches$2.clientX) : e.clientX;
      if (clientX == null) return;
      (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 || _e$preventDefault.call(e);
      this._updateScrubAt(clientX);
    },
    onProgressUp() {
      this.isScrubbing = false;
      window.removeEventListener('mousemove', this._boundMove);
      window.removeEventListener('touchmove', this._boundMove);
      window.removeEventListener('mouseup', this._boundUp);
      window.removeEventListener('touchend', this._boundUp);
      this._boundMove = null;
      this._boundUp = null;
    },
    _updateScrubAt(clientX) {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (!audio || !audio.duration) return;
      const bar = this.$refs.progressBar;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = rect.width > 0 ? x / rect.width : 0;
      const newTime = pct * audio.duration;
      audio.currentTime = Math.max(0, Math.min(newTime, audio.duration));
      this.updateProgress(this.currentlyPlayingIndex);
    },
    cyclePlaybackSpeed: function () {
      this.currentSpeedIndex = (this.currentSpeedIndex + 1) % this.playbackSpeeds.length;
      this.playbackSpeed = this.playbackSpeeds[this.currentSpeedIndex];

      // Update all audio elements
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach(audio => {
          if (audio) audio.playbackRate = this.playbackSpeed;
        });
      }
      this.savePreference('playbackSpeed', this.playbackSpeed);
      console.log(`Playback speed set to ${this.playbackSpeed}x`);
    },
    animateVisualizer: function () {
      if (!this.isAudioPlaying[this.currentlyPlayingIndex]) return;
      const now = window.performance ? performance.now() : Date.now();
      if (now - this.lastVizAt < 33) {
        // ~30fps cap
        return requestAnimationFrame(() => this.animateVisualizer());
      }
      this.lastVizAt = now;

      // Create animated bars based on audio volume (simulated)
      const audio = this.audioElements[this.currentlyPlayingIndex];
      const volume = audio ? Math.min(audio.volume * 2, 1) : 0.3;
      this.visualizerBars = this.visualizerBars.map(() => Math.random() * 80 * volume + 10);
      requestAnimationFrame(() => this.animateVisualizer());
    },
    toggleRepeat() {
      this.repeatCurrent = !this.repeatCurrent;
      localStorage.setItem('repeatCurrent', JSON.stringify(this.repeatCurrent));
    }
  },
  mounted: function () {
    var _JSON$parse, _JSON$parse2;
    // Keyboard shortcuts for better UX
    this._keydownHandler = e => {
      if (!this.showAudioPlayer) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target || {}).tagName)) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          this.toggleAudioPlayer(this.currentlyPlayingIndex);
          break;
        case 'ArrowRight':
          this.fastForwardAudio(this.currentlyPlayingIndex);
          break;
        case 'ArrowLeft':
          this.rewindAudio(this.currentlyPlayingIndex);
          break;
        case 'ArrowDown':
          this.playNextAyah(this.currentlyPlayingIndex);
          break;
        case 'ArrowUp':
          this.playPrevAyah(this.currentlyPlayingIndex);
          break;
      }
    };
    window.addEventListener('keydown', this._keydownHandler);
    // removed scroll listeners and auto-scroll locking

    this.selectedSurah = "1";
    this.selectedReciter = "ar.alafasy";
    this.selectedTranslation = "en.ahmedali";
    this.currentlyPlayingIndex = 0;
    this.isHighlighted = false;
    this.continuousPlayback = (_JSON$parse = JSON.parse(localStorage.getItem('continuousPlayback'))) !== null && _JSON$parse !== void 0 ? _JSON$parse : true; // Load preference
    this.playbackSpeed = (_JSON$parse2 = JSON.parse(localStorage.getItem('playbackSpeed'))) !== null && _JSON$parse2 !== void 0 ? _JSON$parse2 : 1; // Load playback speed preference

    // removed programmatic scroll to top

    Promise.all([this.fetchReciters(), this.fetchSurahs(), this.fetchTranslations(), this.fetchSurahDetails()]).then(() => {
      this.isInitialLoad = false;
      this.$nextTick(() => {
        // removed scroll-to-top after initial load
      });
    });
  },
  beforeUnmount: function () {
    this.isComponentAlive = false;
    window.removeEventListener('keydown', this._keydownHandler);
    // clean up scrub listeners
    if (this._boundMove) {
      window.removeEventListener('mousemove', this._boundMove);
      window.removeEventListener('touchmove', this._boundMove);
    }
    if (this._boundUp) {
      window.removeEventListener('mouseup', this._boundUp);
      window.removeEventListener('touchend', this._boundUp);
    }
    // removed scroll-related event listeners
    if (this.audioElements && this.audioElements.forEach) {
      this.audioElements.forEach(audio => {
        if (audio && audio.pause) audio.pause();
        if (audio && audio.remove) audio.remove();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BookmarkModal',
  props: {
    ayah: {
      type: Object,
      default: null
    },
    showFolderContents: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      folders: [],
      selectedFolderIds: [],
      currentBookmark: null,
      newFolder: {
        name: '',
        icon: 'fas fa-bookmark',
        color: 'primary'
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: '',
      feedbackVariant: 'success',
      feedbackTimer: null,
      feedbackDurationMs: 4000,
      closeTimer: null,
      authRedirectTimer: null,
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        folders: true,
        create: false,
        contents: false
      },
      selectedFoldersForDelete: [],
      folderSearch: '',
      pendingDelete: null,
      iconPresets: [{
        icon: 'fas fa-bookmark'
      }, {
        icon: 'fas fa-star'
      }, {
        icon: 'fas fa-heart'
      }, {
        icon: 'fas fa-book'
      }, {
        icon: 'fas fa-book-open'
      }, {
        icon: 'fas fa-leaf'
      }, {
        icon: 'fas fa-mosque'
      }, {
        icon: 'fas fa-kaaba'
      }]
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === 'danger' ? 'alert-danger' : 'alert-success';
    },
    selectedCount() {
      return this.selectedFolderIds.length;
    },
    folderCount() {
      return this.folders.length;
    },
    filteredFolders() {
      const query = this.folderSearch.trim().toLowerCase();
      if (!query) return this.folders;
      return this.folders.filter(folder => folder.name.toLowerCase().includes(query));
    },
    pendingDeleteTitle() {
      if (!this.pendingDelete) return '';
      if (this.pendingDelete.type === 'bulk') {
        return `Delete ${this.pendingDelete.count} folder(s)?`;
      }
      return `Delete the "${this.pendingDelete.name}" folder?`;
    },
    feedbackIcon() {
      return this.feedbackVariant === 'danger' ? 'fas fa-triangle-exclamation' : 'fas fa-circle-check';
    }
  },
  mounted() {
    const modalEl = document.getElementById('bookmarkModal');
    if (modalEl) {
      this.cleanupModalState();
      modalEl.addEventListener('show.bs.modal', this.onShow);
      modalEl.addEventListener('hidden.bs.modal', this.onHidden);
    }
  },
  beforeUnmount() {
    const modalEl = document.getElementById('bookmarkModal');
    if (modalEl) {
      modalEl.removeEventListener('show.bs.modal', this.onShow);
      modalEl.removeEventListener('hidden.bs.modal', this.onHidden);
      const instance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl);
      if (instance) instance.dispose();
    }
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.closeTimer);
    clearTimeout(this.authRedirectTimer);
    this.cleanupModalState();
  },
  methods: {
    async onShow() {
      this.cleanupModalState();
      this.feedback = '';
      this.selectedFolderIds = [];
      this.currentBookmark = null;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      Promise.all([this.fetchFolders(), this.fetchCurrentBookmark()]);
    },
    onHidden() {
      this.cleanupModalState();
      clearTimeout(this.feedbackTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this.authRedirectTimer);
    },
    async ensureAuthenticated() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
        if ((_response$data = response.data) !== null && _response$data !== void 0 && _response$data.userId) {
          return true;
        }
      } catch (_) {
        // fall through to redirect
      }
      this.setFeedback('Please log in to save bookmarks. Redirecting…', 'danger');
      clearTimeout(this.authRedirectTimer);
      this.authRedirectTimer = setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return false;
    },
    cleanupModalState() {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => {
        var _backdrop$parentNode, _backdrop$parentNode$;
        return (_backdrop$parentNode = backdrop.parentNode) === null || _backdrop$parentNode === void 0 || (_backdrop$parentNode$ = _backdrop$parentNode.removeChild) === null || _backdrop$parentNode$ === void 0 ? void 0 : _backdrop$parentNode$.call(_backdrop$parentNode, backdrop);
      });
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    },
    async fetchFolders() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/folders');
        this.folders = response.data.data || [];
        this.normalizeSelectedFolders();
      } catch (error) {
        this.setFeedback('Unable to load folders right now.', 'danger');
      }
    },
    async fetchCurrentBookmark() {
      var _this$ayah, _this$ayah2, _this$ayah3, _this$ayah4;
      const surahNumber = Number(((_this$ayah = this.ayah) === null || _this$ayah === void 0 ? void 0 : _this$ayah.surah_number) || ((_this$ayah2 = this.ayah) === null || _this$ayah2 === void 0 ? void 0 : _this$ayah2.surah_id));
      const ayahNumber = Number(((_this$ayah3 = this.ayah) === null || _this$ayah3 === void 0 ? void 0 : _this$ayah3.ayah_number) || ((_this$ayah4 = this.ayah) === null || _this$ayah4 === void 0 ? void 0 : _this$ayah4.ayah_num));
      if (!this.ayah || !surahNumber || !ayahNumber) {
        return;
      }
      try {
        var _response$data2;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            surah_number: surahNumber,
            ayah_number: ayahNumber
          }
        });
        const bookmark = Array.isArray((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) ? response.data.data[0] : null;
        this.currentBookmark = bookmark || null;
        if (bookmark !== null && bookmark !== void 0 && bookmark.folders) {
          this.selectedFolderIds = bookmark.folders.map(folder => folder.id);
        }
        this.normalizeSelectedFolders();
      } catch (error) {
        this.currentBookmark = null;
      }
    },
    normalizeSelectedFolders() {
      if (!this.folders.length) {
        return;
      }
      const allowedIds = new Set(this.folders.filter(folder => !folder.is_smart).map(folder => folder.id));
      this.selectedFolderIds = this.selectedFolderIds.filter(id => allowedIds.has(id));
    },
    isSmartFolder(folderId) {
      const folder = this.folders.find(item => item.id === folderId);
      return !!(folder !== null && folder !== void 0 && folder.is_smart);
    },
    async createFolder() {
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      if (!this.newFolder.name) {
        this.setFeedback('Folder name is required.', 'danger');
        return;
      }
      const name = this.newFolder.name.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some(folder => (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setFeedback('Folder name already exists. Choose another.', 'danger');
        return;
      }
      this.isCreatingFolder = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/folders', {
          name,
          icon: this.newFolder.icon || null,
          color: this.newFolder.color || null
        });
        const folder = response.data.folder;
        if (folder) {
          this.folders.unshift(_objectSpread(_objectSpread({}, folder), {}, {
            ayah_count: 0
          }));
          this.selectedFolderIds.push(folder.id);
          this.folderExpanded[folder.id] = true;
          this.folderContents[folder.id] = {
            loading: false,
            items: []
          };
          this.newFolder.name = '';
          this.newFolder.icon = 'fas fa-bookmark';
          this.newFolder.color = 'primary';
          this.setFeedback('Folder created.', 'success');
        }
      } catch (error) {
        var _error$response, _error$response2;
        const apiMessage = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.errors) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.name) === null || _error$response2 === void 0 ? void 0 : _error$response2[0]);
        this.setFeedback(apiMessage || 'Failed to create folder.', 'danger');
      } finally {
        this.isCreatingFolder = false;
      }
    },
    async saveBookmark() {
      var _this$ayah5, _this$ayah6, _this$ayah7, _this$ayah8;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      const surahNumber = Number(((_this$ayah5 = this.ayah) === null || _this$ayah5 === void 0 ? void 0 : _this$ayah5.surah_number) || ((_this$ayah6 = this.ayah) === null || _this$ayah6 === void 0 ? void 0 : _this$ayah6.surah_id));
      const ayahNumber = Number(((_this$ayah7 = this.ayah) === null || _this$ayah7 === void 0 ? void 0 : _this$ayah7.ayah_number) || ((_this$ayah8 = this.ayah) === null || _this$ayah8 === void 0 ? void 0 : _this$ayah8.ayah_num));
      if (!this.ayah || !surahNumber || !ayahNumber) {
        this.setFeedback('Select an ayah first.', 'danger');
        return;
      }
      this.isSaving = true;
      try {
        var _this$currentBookmark, _this$ayah$surah, _this$ayah$ayah, _response$data3, _this$currentBookmark2;
        this.normalizeSelectedFolders();
        const selectedIds = Array.from(new Set(this.selectedFolderIds));
        const existingIds = ((_this$currentBookmark = this.currentBookmark) === null || _this$currentBookmark === void 0 || (_this$currentBookmark = _this$currentBookmark.folders) === null || _this$currentBookmark === void 0 ? void 0 : _this$currentBookmark.map(folder => folder.id)) || [];
        const removeIds = existingIds.filter(id => !selectedIds.includes(id));
        const removableIds = removeIds.filter(id => !this.isSmartFolder(id));
        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.ayah.surah_name || ((_this$ayah$surah = this.ayah.surah) === null || _this$ayah$surah === void 0 ? void 0 : _this$ayah$surah.name_en) || 'Surah',
          ayah_verse_ar: this.ayah.ayah_verse_ar || ((_this$ayah$ayah = this.ayah.ayah) === null || _this$ayah$ayah === void 0 ? void 0 : _this$ayah$ayah.ayah_text) || '',
          ayah_verse_en: this.ayah.ayah_verse_en || '',
          folder_ids: selectedIds
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/ayah-bookmarks', payload);
        const bookmark = ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.bookmark) || null;
        if (bookmark) {
          this.currentBookmark = bookmark;
        }
        let detachFailed = false;
        if (removableIds.length && (_this$currentBookmark2 = this.currentBookmark) !== null && _this$currentBookmark2 !== void 0 && _this$currentBookmark2.id) {
          try {
            await Promise.all(removableIds.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${this.currentBookmark.id}/folders/${id}`)));
          } catch (error) {
            detachFailed = true;
          }
        }
        await this.fetchCurrentBookmark();
        this.setFeedback(detachFailed ? 'Bookmark saved, but some folders could not be removed.' : 'Ayah saved to your bookmarks.', detachFailed ? 'danger' : 'success', {
          autoClose: !detachFailed
        });
        this.$emit('saved', _objectSpread(_objectSpread({}, payload), {}, {
          bookmark: this.currentBookmark
        }));
      } catch (error) {
        this.setFeedback('Failed to save the bookmark.', 'danger');
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant, options = {}) {
      this.feedback = message;
      this.feedbackVariant = variant;
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => {
        this.feedback = '';
      }, this.feedbackDurationMs);
      if (options.autoClose) {
        clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => {
          this.hideModal();
        }, this.feedbackDurationMs);
      }
    },
    clearSelection() {
      this.selectedFolderIds = [];
    },
    toggleSection(section) {
      this.sectionOpen = _objectSpread(_objectSpread({}, this.sectionOpen), {}, {
        [section]: !this.sectionOpen[section]
      });
    },
    requestDeleteFolder(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback('Smart folders cannot be deleted.', 'danger');
        return;
      }
      this.pendingDelete = {
        type: 'single',
        ids: [folder.id],
        name: folder.name
      };
    },
    requestDeleteSelectedFolders() {
      const ids = this.selectedFoldersForDelete.filter(id => {
        const folder = this.folders.find(item => item.id === id);
        return folder && !folder.is_smart;
      });
      if (!ids.length) {
        this.setFeedback('Select folders to delete.', 'danger');
        return;
      }
      this.pendingDelete = {
        type: 'bulk',
        ids,
        count: ids.length
      };
    },
    async confirmDelete() {
      var _this$pendingDelete;
      const ids = ((_this$pendingDelete = this.pendingDelete) === null || _this$pendingDelete === void 0 ? void 0 : _this$pendingDelete.ids) || [];
      if (!ids.length) {
        this.pendingDelete = null;
        return;
      }
      try {
        await Promise.all(ids.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${id}`)));
        this.folders = this.folders.filter(folder => !ids.includes(folder.id));
        this.selectedFolderIds = this.selectedFolderIds.filter(id => !ids.includes(id));
        this.selectedFoldersForDelete = [];
        ids.forEach(id => {
          const _this$folderExpanded = this.folderExpanded,
            {
              [id]: removedExpanded
            } = _this$folderExpanded,
            expanded = _objectWithoutProperties(_this$folderExpanded, [id].map(_toPropertyKey));
          this.folderExpanded = expanded;
          const _this$folderContents = this.folderContents,
            {
              [id]: removedContents
            } = _this$folderContents,
            contents = _objectWithoutProperties(_this$folderContents, [id].map(_toPropertyKey));
          this.folderContents = contents;
        });
        this.pendingDelete = null;
        this.setFeedback(ids.length === 1 ? 'Folder deleted.' : 'Folders deleted.', 'success');
      } catch (error) {
        this.setFeedback('Unable to delete selected folders.', 'danger');
      }
    },
    cancelDelete() {
      this.pendingDelete = null;
    },
    hideModal() {
      this.$nextTick(() => {
        const modalEl = document.getElementById('bookmarkModal');
        if (!modalEl) return;
        const instance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
        instance.hide();
      });
    },
    async toggleFolderContents(folder) {
      var _this$folderContents$;
      const isOpen = this.folderExpanded[folder.id];
      this.folderExpanded = _objectSpread(_objectSpread({}, this.folderExpanded), {}, {
        [folder.id]: !isOpen
      });
      if (isOpen) {
        return;
      }
      if ((_this$folderContents$ = this.folderContents[folder.id]) !== null && _this$folderContents$ !== void 0 && _this$folderContents$.items) {
        return;
      }
      this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
        [folder.id]: {
          loading: true,
          items: []
        }
      });
      try {
        var _response$data4;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const items = Array.isArray((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.data) ? response.data.data : [];
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items
          }
        });
      } catch (error) {
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items: []
          }
        });
      }
    },
    async removeAyahFromFolder(bookmark, folder) {
      if (!(bookmark !== null && bookmark !== void 0 && bookmark.id)) return;
      if (folder !== null && folder !== void 0 && folder.is_smart) {
        this.setFeedback('Smart folders cannot be edited.', 'danger');
        return;
      }
      try {
        var _this$folderContents$2, _this$currentBookmark3;
        if (!confirm('Remove this ayah from the folder?')) {
          return;
        }
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${folder.id}`);
        const items = ((_this$folderContents$2 = this.folderContents[folder.id]) === null || _this$folderContents$2 === void 0 ? void 0 : _this$folderContents$2.items) || [];
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items: items.filter(item => item.id !== bookmark.id)
          }
        });
        if (folder.ayah_count > 0) {
          folder.ayah_count -= 1;
        }
        if (((_this$currentBookmark3 = this.currentBookmark) === null || _this$currentBookmark3 === void 0 ? void 0 : _this$currentBookmark3.id) === bookmark.id) {
          this.selectedFolderIds = this.selectedFolderIds.filter(id => id !== folder.id);
        }
      } catch (error) {
        this.setFeedback('Unable to remove this ayah.', 'danger');
      }
    },
    moveTargetFolders(folder) {
      return this.folders.filter(target => !target.is_smart && target.id !== folder.id);
    },
    setIcon(icon) {
      this.newFolder.icon = icon;
    },
    setColor(color) {
      this.newFolder.color = color;
    },
    async moveAyahToFolder(bookmark, fromFolder, event) {
      var _event$target;
      const targetId = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
      if (!(bookmark !== null && bookmark !== void 0 && bookmark.id) || !targetId) return;
      if (fromFolder !== null && fromFolder !== void 0 && fromFolder.is_smart) {
        this.setFeedback('Smart folders cannot be edited.', 'danger');
        return;
      }
      try {
        var _this$folderContents$3;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/ayah-bookmarks/${bookmark.id}/folders`, {
          folder_ids: [targetId]
        });
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${fromFolder.id}`);
        const fromItems = ((_this$folderContents$3 = this.folderContents[fromFolder.id]) === null || _this$folderContents$3 === void 0 ? void 0 : _this$folderContents$3.items) || [];
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [fromFolder.id]: {
            loading: false,
            items: fromItems.filter(item => item.id !== bookmark.id)
          }
        });
        const targetFolder = this.folders.find(folder => folder.id === targetId);
        if (targetFolder) {
          var _this$folderContents$4;
          targetFolder.ayah_count = (targetFolder.ayah_count || 0) + 1;
          if (fromFolder.ayah_count > 0) fromFolder.ayah_count -= 1;
          if ((_this$folderContents$4 = this.folderContents[targetId]) !== null && _this$folderContents$4 !== void 0 && _this$folderContents$4.items) {
            this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
              [targetId]: {
                loading: false,
                items: [bookmark, ...this.folderContents[targetId].items]
              }
            });
          }
        }
        this.setFeedback('Ayah moved to another folder.', 'success');
        if (event !== null && event !== void 0 && event.target) {
          event.target.value = '';
        }
      } catch (error) {
        this.setFeedback('Unable to move this ayah.', 'danger');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=template&id=828f3036&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=template&id=828f3036&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  class: "alert alert-success bookmark-toast",
  role: "status"
};
const _hoisted_2 = {
  class: "filter-header"
};
const _hoisted_3 = {
  class: "filter-actions"
};
const _hoisted_4 = ["aria-expanded", "aria-label"];
const _hoisted_5 = {
  key: 0,
  class: "bi bi-chevron-up",
  "aria-hidden": "true"
};
const _hoisted_6 = {
  key: 1,
  class: "bi bi-chevron-down",
  "aria-hidden": "true"
};
const _hoisted_7 = {
  key: 0,
  class: "alert alert-warning auth-alert",
  role: "status"
};
const _hoisted_8 = {
  id: "surat-filters",
  class: "row g-3"
};
const _hoisted_9 = {
  class: "col-12 col-md-4 filter-item"
};
const _hoisted_10 = ["value"];
const _hoisted_11 = {
  class: "col-12 col-md-4 filter-item"
};
const _hoisted_12 = ["value"];
const _hoisted_13 = {
  class: "col-12 col-md-4 filter-item"
};
const _hoisted_14 = ["value"];
const _hoisted_15 = {
  class: "next-step-wrapper"
};
const _hoisted_16 = {
  class: "mx-auto mb-4 next-step-card"
};
const _hoisted_17 = ["title", "aria-label"];
const _hoisted_18 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_19 = {
  class: "flex-grow-1"
};
const _hoisted_20 = {
  class: "mb-2 next-step-teaser"
};
const _hoisted_21 = {
  class: "mb-3 next-step-text"
};
const _hoisted_22 = {
  href: "/history",
  class: "btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta"
};
const _hoisted_23 = {
  key: 1,
  class: "loading-placeholder"
};
const _hoisted_24 = {
  class: "row rtl-text",
  ref: "listContainer",
  role: "list",
  "aria-label": "Ayah cards list"
};
const _hoisted_25 = ["id", "onClick", "onKeydown", "onDragstart"];
const _hoisted_26 = {
  class: "ayah-surface h-100 rtl-text d-flex flex-column"
};
const _hoisted_27 = {
  class: "d-flex justify-content-between text-muted ltr-text"
};
const _hoisted_28 = {
  key: 0,
  class: "saved-pill"
};
const _hoisted_29 = ["onClick", "aria-label", "title"];
const _hoisted_30 = ["aria-hidden"];
const _hoisted_31 = {
  class: "col-md-11"
};
const _hoisted_32 = {
  style: {
    "padding": "4px"
  }
};
const _hoisted_33 = ["innerHTML"];
const _hoisted_34 = ["innerHTML"];
const _hoisted_35 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["onClick"];
const _hoisted_38 = {
  class: "col-md-1 text-center"
};
const _hoisted_39 = {
  class: "d-flex flex-column align-items-center"
};
const _hoisted_40 = ["onClick", "aria-label", "title"];
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["aria-hidden"];
const _hoisted_43 = ["innerHTML"];
const _hoisted_44 = ["innerHTML"];
const _hoisted_45 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_46 = ["onClick"];
const _hoisted_47 = ["onClick"];
const _hoisted_48 = {
  class: "row card-teal mb-3",
  style: {
    "display": "flex",
    "justify-content": "center",
    "margin": "0 -5px"
  }
};
const _hoisted_49 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_50 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_51 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_52 = ["onClick"];
const _hoisted_53 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_54 = ["onClick", "aria-label", "title"];
const _hoisted_55 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_56 = ["onClick"];
const _hoisted_57 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_58 = ["onClick"];
const _hoisted_59 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_60 = {
  key: 2,
  class: "empty-state text-center text-muted py-4"
};
const _hoisted_61 = {
  key: 0,
  class: "audio-player-container"
};
const _hoisted_62 = {
  class: "custom-audio-player"
};
const _hoisted_63 = {
  class: "controls"
};
const _hoisted_64 = ["title"];
const _hoisted_65 = {
  class: "speed-indicator"
};
const _hoisted_66 = ["title", "aria-pressed"];
const _hoisted_67 = {
  key: 0,
  class: "volume-bar-container"
};
const _hoisted_68 = {
  class: "time",
  "aria-live": "polite"
};
const _hoisted_69 = ["aria-valuenow", "aria-valuetext"];
const _hoisted_70 = {
  class: "audio-visualizer",
  ref: "visualizer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$audioElements$_c, _ctx$audioElements$_c2;
  const _component_bookmark_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("bookmark-modal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["container py-4 surat-premium", {
      'has-audio-player': _ctx.showAudioPlayer
    }]),
    role: "main",
    "aria-label": "Quran Explorer"
  }, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold"
  }, "The Holy Quran"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead"
  }, " Explore the Quran in Arabic, accompanied by translations and recitations from world-renowned Qaris. Listen to beautiful recitations to deepen your understanding. ")])], -1 /* CACHED */)), _ctx.bookmarkToast ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.bookmarkToast), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sticky Dropdowns Container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sticky-dropdown", {
      collapsed: !_ctx.isVisible
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      top: _ctx.isVisible ? '80px' : '60px'
    }),
    ref: "stickyDropdown"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"filter-title\" data-v-828f3036><span class=\"filter-icon\" data-v-828f3036><i class=\"fas fa-sliders-h\" aria-hidden=\"true\" data-v-828f3036></i></span><div data-v-828f3036><div class=\"filter-eyebrow\" data-v-828f3036>Filters</div><div class=\"filter-subtitle\" data-v-828f3036>Surah, reciter, and translation</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "bookmark-cta-link",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onBookmarksLinkClick && $options.onBookmarksLinkClick(...args), ["prevent"]))
  }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-heart-fill me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View saved bookmarks ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "filter-toggle",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleVisibility && $options.toggleVisibility(...args)),
    "aria-expanded": _ctx.isVisible,
    "aria-controls": "surat-filters",
    "aria-label": _ctx.isVisible ? 'Hide filters' : 'Show filters'
  }, [_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_5)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_6))], 8 /* PROPS */, _hoisted_4)])]), _ctx.authAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-exclamation-circle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.authAlert), 1 /* TEXT */), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/login",
    class: "btn btn-sm btn-light auth-alert-link"
  }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "surah-select",
    class: "form-label mt-2"
  }, "Select Surah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "surah-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[3] || (_cache[3] = (...args) => $options.fetchSurahDetails && $options.fetchSurahDetails(...args))
  }, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a Surah", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.surahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: surah.number
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.name) + ") ", 9 /* TEXT, PROPS */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "reciter-select",
    class: "form-label mt-2"
  }, "Select Reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "reciter-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => _ctx.selectedReciter = $event)
  }, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_12);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "translation-select",
    class: "form-label mt-2"
  }, "Select Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "translation-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.selectedTranslation = $event)
  }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(`${translation.flag} ${translation.englishName} (${translation.language})`), 9 /* TEXT, PROPS */, _hoisted_14);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isVisible]])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: _ctx.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": _ctx.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[6] || (_cache[6] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    class: "next-step-toggle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", _ctx.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_17), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/history",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " Explore Qur’an history ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_21, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" If you feel ready to move from listening to learning? Explore key milestones, preservation efforts, and scholars in ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/history",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " the history of the Qur’an ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" to deepen your understanding. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_22, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Explore History ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-2"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]])])])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showNextStep]]), _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, "Loading Surah...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.topSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visibleWindow, item => {
    var _ctx$surahDetails;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      style: {
        "padding": "12px",
        "border-radius": "8px"
      },
      ref_for: true,
      ref: "audioCard",
      key: item.ayah.number,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-md-12 mb-2 mt-2 ayah-card-container shadow-md", {
        'highlighted': _ctx.isHighlighted && _ctx.currentlyPlayingIndex === item.index,
        'currently-playing': _ctx.isAudioPlaying[item.index]
      }]),
      role: "listitem",
      id: `ayah-card-${item.index}`,
      onClick: $event => $options.selectCard(item.index),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer(item.index), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer(item.index), ["prevent"]), ["space"])],
      draggable: "true",
      onDragstart: $event => $options.onAyahDragStart(item.ayah, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah and Ayah Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "/images/art.png",
      width: "35px",
      alt: "Art Icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$surahDetails = _ctx.surahDetails) === null || _ctx$surahDetails === void 0 ? void 0 : _ctx$surahDetails.surahNumber) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.index + 1) + " ", 1 /* TEXT */), $options.isAyahSaved(item.ayah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_28, "Saved")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn bookmark-btn", {
        'is-saved': $options.isAyahSaved(item.ayah)
      }]),
      "data-bs-toggle": "modal",
      "data-bs-target": "#bookmarkModal",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openBookmarkModal(item.ayah), ["stop"]),
      "aria-label": $options.isAyahSaved(item.ayah) ? 'Ayah has been saved' : 'Save ayah',
      title: $options.isAyahSaved(item.ayah) ? 'Ayah has been saved' : 'Save ayah'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $options.isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_29)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Desktop Layout: Icons on Left "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row d-none d-md-flex",
      role: "group",
      "aria-label": "Ayah controls (desktop)",
      "aria-hidden": _ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "arabic-text rtl-text fw-bold text-end mb-3",
      innerHTML: $options.highlightedText(item.ayah),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.arabicFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_33), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "pt-2 ltr-text hide-on-mobile-tablet ml-2"
    }, "Translation:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "fw-regular ltr-text flex-grow-1",
      innerHTML: $options.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_36), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah on WhatsApp",
      title: "Share via WhatsApp"
    }, [...(_cache[42] || (_cache[42] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_37)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: $event => $options.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_40), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: _cache[7] || (_cache[7] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: _cache[8] || (_cache[8] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: $event => $options.shareOnWhatsApp(item.ayah),
      "aria-label": "Share on WhatsApp",
      title: "Share on WhatsApp"
    }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_41)])])], 8 /* PROPS */, _hoisted_30), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet Layout: Text then Icons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      style: {},
      class: "d-block d-md-none",
      role: "group",
      "aria-label": "Ayah controls (mobile)",
      "aria-hidden": !_ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "arabic-text rtl-text fw-bold text-end mb-3",
      innerHTML: $options.highlightedText(item.ayah),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.arabicFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_43), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2"
    }, "Translation:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "fw-regular ltr-text flex-grow-1",
      innerHTML: $options.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_44), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_46), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah on WhatsApp",
      title: "Share via WhatsApp"
    }, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_47)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[9] || (_cache[9] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[50] || (_cache[50] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[10] || (_cache[10] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.rewindAudio(item.index),
      "aria-label": "Rewind 15 seconds",
      title: "Rewind"
    }, [...(_cache[52] || (_cache[52] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-backward-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_52)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_54)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.fastForwardAudio(item.index),
      "aria-label": "Fast forward 20 seconds",
      title: "Fast Forward"
    }, [...(_cache[53] || (_cache[53] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-forward-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_56)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.shareOnWhatsApp(item.ayah),
      "aria-label": "Share on WhatsApp",
      title: "Share on WhatsApp"
    }, [...(_cache[54] || (_cache[54] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share-fill",
      style: {
        "font-size": "1.5rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_58)])])], 8 /* PROPS */, _hoisted_42)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_25);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.bottomSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */)], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.screenReaderMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), !_ctx.isLoading && _ctx.surahDetails && $options.filteredAyahs.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, " No verses match your current search or filters. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: _ctx.activeAyah,
    onSaved: $options.onBookmarkSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Custom Audio Player "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showAudioPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[11] || (_cache[11] = $event => $options.rewindAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Rewind",
    "aria-label": "Rewind 15 seconds"
  }, [...(_cache[55] || (_cache[55] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[12] || (_cache[12] = $event => $options.toggleAudioPlayer(_ctx.currentlyPlayingIndex)),
    class: "control-btn play-pause",
    title: "Play/Pause",
    "aria-label": "Play or Pause"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isAudioPlaying[_ctx.currentlyPlayingIndex] ? 'bi bi-pause-fill' : 'bi bi-play-fill')
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[13] || (_cache[13] = $event => $options.fastForwardAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Fast Forward",
    "aria-label": "Fast forward 20 seconds"
  }, [...(_cache[56] || (_cache[56] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[14] || (_cache[14] = $event => $options.stopAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[57] || (_cache[57] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[15] || (_cache[15] = (...args) => $options.toggleVolume && $options.toggleVolume(...args)),
    class: "control-btn",
    title: "Volume",
    "aria-label": "Toggle volume slider"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${_ctx.volume > 0.5 ? 'up' : _ctx.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[16] || (_cache[16] = (...args) => $options.cyclePlaybackSpeed && $options.cyclePlaybackSpeed(...args)),
    class: "control-btn",
    title: 'Speed: ' + _ctx.playbackSpeed + 'x'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-speedometer2",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.playbackSpeed !== 1 ? '#ff6b6b' : '#ccc'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playbackSpeed) + "x", 1 /* TEXT */)], 8 /* PROPS */, _hoisted_64), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[17] || (_cache[17] = (...args) => $options.toggleRepeat && $options.toggleRepeat(...args)),
    class: "control-btn",
    title: _ctx.repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off',
    "aria-pressed": _ctx.repeatCurrent,
    "aria-label": "Toggle repeat current ayah"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.repeatCurrent ? '#00bfa6' : '#ccc'
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_66), _ctx.showVolumeBar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => _ctx.volume = $event),
    min: "0",
    max: "1",
    step: "0.1",
    onInput: _cache[19] || (_cache[19] = (...args) => $options.updateVolume && $options.updateVolume(...args)),
    class: "volume-slider"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.volume]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_ctx$audioElements$_c = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c === void 0 ? void 0 : _ctx$audioElements$_c.currentTime) || 0)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_ctx$audioElements$_c2 = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c2 === void 0 ? void 0 : _ctx$audioElements$_c2.duration) || 0)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[20] || (_cache[20] = (...args) => $options.closeAudioPlayer && $options.closeAudioPlayer(...args)),
    class: "control-btn",
    title: "Close",
    "aria-label": "Close player",
    style: {
      "margin-left": "auto"
    }
  }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg mb-2"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    role: "progressbar",
    "aria-label": "Audio playback progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": _ctx.progress[_ctx.currentlyPlayingIndex] || 0,
    "aria-valuetext": `Progress ${Math.round(_ctx.progress[_ctx.currentlyPlayingIndex] || 0)} percent`,
    onClick: _cache[21] || (_cache[21] = (...args) => $options.seekToPosition && $options.seekToPosition(...args)),
    onMousedown: _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onProgressDown && $options.onProgressDown(...args), ["prevent"])),
    onTouchstartPassive: _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onProgressDown && $options.onProgressDown(...args), ["prevent"])),
    ref: "progressBar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progress[_ctx.currentlyPlayingIndex] + '%'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visualizerBars, (bar, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "visualizer-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        height: bar + '%',
        animationDelay: index * 0.1 + 's'
      })
    }, null, 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_69)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]))], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "bookmarkModal",
  tabindex: "-1",
  "aria-labelledby": "bookmarkModalLabel",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  class: "modal-dialog modal-dialog-centered modal-xl"
};
const _hoisted_3 = {
  class: "modal-content bookmark-modal"
};
const _hoisted_4 = {
  class: "modal-header"
};
const _hoisted_5 = {
  class: "header-title"
};
const _hoisted_6 = {
  class: "header-meta"
};
const _hoisted_7 = {
  class: "meta-item"
};
const _hoisted_8 = {
  class: "meta-value"
};
const _hoisted_9 = {
  class: "meta-item"
};
const _hoisted_10 = {
  class: "meta-value"
};
const _hoisted_11 = {
  class: "modal-body"
};
const _hoisted_12 = {
  class: "alert-icon"
};
const _hoisted_13 = {
  class: "alert-text"
};
const _hoisted_14 = {
  class: "row g-3"
};
const _hoisted_15 = {
  class: "col-12 col-md-6"
};
const _hoisted_16 = {
  class: "section-card h-100"
};
const _hoisted_17 = {
  class: "section-header"
};
const _hoisted_18 = {
  class: "section-actions"
};
const _hoisted_19 = {
  class: "section-hint"
};
const _hoisted_20 = ["aria-expanded"];
const _hoisted_21 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_22 = {
  key: 2,
  class: "folder-grid"
};
const _hoisted_23 = ["value", "disabled"];
const _hoisted_24 = {
  class: "pill-icon"
};
const _hoisted_25 = {
  key: 1,
  class: "fas fa-folder"
};
const _hoisted_26 = {
  class: "pill-meta"
};
const _hoisted_27 = {
  class: "pill-title"
};
const _hoisted_28 = {
  class: "pill-count"
};
const _hoisted_29 = {
  class: "col-12 col-md-6"
};
const _hoisted_30 = {
  class: "section-card h-100"
};
const _hoisted_31 = {
  class: "section-header"
};
const _hoisted_32 = {
  class: "section-actions"
};
const _hoisted_33 = ["aria-expanded"];
const _hoisted_34 = {
  class: "row g-2 align-items-end"
};
const _hoisted_35 = {
  class: "col-12"
};
const _hoisted_36 = {
  class: "col-12"
};
const _hoisted_37 = {
  class: "icon-presets"
};
const _hoisted_38 = ["onClick"];
const _hoisted_39 = {
  class: "col-12"
};
const _hoisted_40 = {
  class: "color-swatches"
};
const _hoisted_41 = ["onClick"];
const _hoisted_42 = {
  class: "col-12"
};
const _hoisted_43 = ["disabled"];
const _hoisted_44 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_45 = {
  key: 1,
  class: "section-card mt-3"
};
const _hoisted_46 = {
  class: "section-header"
};
const _hoisted_47 = {
  class: "section-actions"
};
const _hoisted_48 = ["aria-expanded"];
const _hoisted_49 = {
  key: 0,
  class: "delete-confirm"
};
const _hoisted_50 = {
  class: "delete-title"
};
const _hoisted_51 = {
  class: "delete-actions"
};
const _hoisted_52 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_53 = {
  key: 2,
  class: "folder-contents"
};
const _hoisted_54 = {
  class: "folder-toggle"
};
const _hoisted_55 = ["onClick"];
const _hoisted_56 = {
  class: "folder-toggle-title"
};
const _hoisted_57 = {
  key: 0,
  class: "folder-badge"
};
const _hoisted_58 = {
  class: "folder-toggle-actions"
};
const _hoisted_59 = {
  class: "folder-toggle-meta"
};
const _hoisted_60 = ["disabled", "onClick"];
const _hoisted_61 = ["onClick"];
const _hoisted_62 = {
  key: 0,
  class: "folder-items"
};
const _hoisted_63 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_64 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_65 = {
  class: "folder-item-header"
};
const _hoisted_66 = {
  class: "folder-item-actions"
};
const _hoisted_67 = {
  class: "input-group input-group-sm move-group"
};
const _hoisted_68 = ["onChange", "disabled"];
const _hoisted_69 = ["value"];
const _hoisted_70 = ["disabled", "onClick"];
const _hoisted_71 = ["innerHTML"];
const _hoisted_72 = {
  key: 0,
  class: "folder-item-en"
};
const _hoisted_73 = {
  class: "modal-footer"
};
const _hoisted_74 = ["disabled"];
const _hoisted_75 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-bookmark"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "bookmarkModalLabel"
  }, "Save ayah", -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "modal-subtitle"
  }, "Pick a folder or create a new one.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-label"
  }, "Folders", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.folderCount), 1 /* TEXT */)]), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-divider"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-label"
  }, "Selected", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount), 1 /* TEXT */)])])])]), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [$data.feedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert bookmark-alert", $options.feedbackClass]),
    role: "alert"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.feedbackIcon)
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedback), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-folder-open"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Choose folders"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Select where this ayah will be saved.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount) + " selected", 1 /* TEXT */), $options.selectedCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link btn-clear",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.clearSelection && $options.clearSelection(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[1] || (_cache[1] = $event => $options.toggleSection('folders')),
    "aria-expanded": $data.sectionOpen.folders
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.folders ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_20)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.folders.length ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
    key: 0,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.folderSearch = $event),
    type: "search",
    class: "form-control form-control-sm folder-search",
    placeholder: "Search folders"
  }, null, 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.folderSearch, void 0, {
    trim: true
  }]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.filteredFolders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, "No folders yet. Create one below.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-pill', folder.color ? `pill-${folder.color}` : 'pill-neutral', {
        'is-selected': $data.selectedFolderIds.includes(folder.id),
        'is-disabled': folder.is_smart
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      value: folder.id,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.selectedFolderIds = $event),
      disabled: folder.is_smart
    }, null, 8 /* PROPS */, _hoisted_23), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.selectedFolderIds]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_25))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */)]), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "pill-check"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check"
    })], -1 /* CACHED */))], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.folders]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Create new folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Start a fresh collection for your reflections.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Add a custom collection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[4] || (_cache[4] = $event => $options.toggleSection('create')),
    "aria-expanded": $data.sectionOpen.create
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.create ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_33)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection gems"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-preset-btn", {
        active: $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $options.setIcon(preset.icon)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_38);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: `swatch-${color}`,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["color-swatch-btn", {
        active: $data.newFolder.color === color
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        background: `var(--bs-${color})`
      }),
      onClick: $event => $options.setColor(color)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_41);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-create",
    disabled: $data.isCreatingFolder,
    onClick: _cache[6] || (_cache[6] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreatingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_44)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create folder ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_43)])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.create]])])])]), $props.showFolderContents ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-list-check"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Folder contents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Preview what is inside each folder.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Review or remove saved ayat", -1 /* CACHED */)), $data.selectedFoldersForDelete.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-outline-danger btn-sm",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.requestDeleteSelectedFolders && $options.requestDeleteSelectedFolders(...args))
  }, " Delete selected (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFoldersForDelete.length) + ") ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[8] || (_cache[8] = $event => $options.toggleSection('contents')),
    "aria-expanded": $data.sectionOpen.contents
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.contents ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_48)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.pendingDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteTitle), 1 /* TEXT */), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "delete-note"
  }, "Ayat in this folder will also be deleted.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger btn-sm",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.confirmDelete && $options.confirmDelete(...args))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, "No folders to show yet.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    var _$data$folderContents, _$data$folderContents2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `contents-${folder.id}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-content', {
        open: $data.folderExpanded[folder.id]
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "folder-toggle-main",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_56, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "folder-toggle-icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-folder"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)]), folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_57, "Smart")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_55), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <label class=\"folder-select\">\n                        <input\n                          type=\"checkbox\"\n                          :value=\"folder.id\"\n                          v-model=\"selectedFoldersForDelete\"\n                          :disabled=\"folder.is_smart\"\n                        />\n                        <span>Select</span>\n                      </label> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-danger",
      disabled: folder.is_smart,
      onClick: $event => $options.requestDeleteFolder(folder)
    }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-trash me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_60), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn folder-toggle-button",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.folderExpanded[folder.id] ? 'fa-chevron-up' : 'fa-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_61)])]), $data.folderExpanded[folder.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_62, [(_$data$folderContents = $data.folderContents[folder.id]) !== null && _$data$folderContents !== void 0 && _$data$folderContents.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, "Loading...")) : !((_$data$folderContents2 = $data.folderContents[folder.id]) !== null && _$data$folderContents2 !== void 0 && (_$data$folderContents2 = _$data$folderContents2.items) !== null && _$data$folderContents2 !== void 0 && _$data$folderContents2.length) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, " No ayat saved in this folder. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folderContents[folder.id].items, item => {
      var _item$ayah;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "folder-item",
        key: item.id
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name || 'Surah') + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_number || item.ayah_num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        class: "form-select",
        onChange: $event => $options.moveAyahToFolder(item, folder, $event),
        disabled: folder.is_smart
      }, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "",
        disabled: ""
      }, "Move to...", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargetFolders(folder), target => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: target.id,
          value: target.id
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(target.name), 9 /* TEXT, PROPS */, _hoisted_69);
      }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_68)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-danger",
        disabled: folder.is_smart,
        onClick: $event => $options.removeAyahFromFolder(item, folder)
      }, " Remove ", 8 /* PROPS */, _hoisted_70)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "folder-item-ar",
        innerHTML: item.ayah_verse_ar || ((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.ayah_text)
      }, null, 8 /* PROPS */, _hoisted_71), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_72, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.contents]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "btn btn-manage"
  }, "Open bookmarks", -1 /* CACHED */)), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    "data-bs-dismiss": "modal"
  }, "Cancel", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-save",
    disabled: $data.isSaving,
    onClick: _cache[11] || (_cache[11] = (...args) => $options.saveBookmark && $options.saveBookmark(...args))
  }, [$data.isSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_75)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save bookmark ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_74)])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/SuratComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/SuratComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SuratComponent_vue_vue_type_template_id_828f3036_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuratComponent.vue?vue&type=template&id=828f3036&scoped=true */ "./resources/js/components/SuratComponent.vue?vue&type=template&id=828f3036&scoped=true");
/* harmony import */ var _SuratComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SuratComponent.vue?vue&type=script&lang=js */ "./resources/js/components/SuratComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _SuratComponent_vue_vue_type_style_index_0_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css */ "./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SuratComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SuratComponent_vue_vue_type_template_id_828f3036_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-828f3036"],['__file',"resources/js/components/SuratComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/SuratComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/SuratComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_style_index_0_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/SuratComponent.vue?vue&type=template&id=828f3036&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/SuratComponent.vue?vue&type=template&id=828f3036&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_template_id_828f3036_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_template_id_828f3036_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=template&id=828f3036&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=template&id=828f3036&scoped=true");


/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true */ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true");
/* harmony import */ var _BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js");
/* harmony import */ var _BookmarkModal_vue_vue_type_style_index_0_id_9402092c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css */ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-9402092c"],['__file',"resources/js/components/bookmarks/BookmarkModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_style_index_0_id_9402092c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true");


/***/ })

}]);