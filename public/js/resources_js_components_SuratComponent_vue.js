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
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookmarks/BookmarkModal.vue */ "./resources/js/components/bookmarks/BookmarkModal.vue");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SuratComponent",
  components: {
    BookmarkModal: _bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function () {
    return {
      // responsive a11y
      isMobile: false,
      // a11y
      selectedCardIndex: 0,
      screenReaderMessage: "",
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
      repeatCurrent: JSON.parse(localStorage.getItem("repeatCurrent") || "false"),
      favoriteReciters: ["ar.alafasy", "ar.abdulbasitmurattal"],
      favoriteTranslations: ["en.ahmedali", "en.sahih"],
      lastAutoScrollAt: 0,
      isManualScrolling: false,
      manualScrollTimer: null,
      ayahScrubValue: 1,
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
      bookmarkStorageUserId: null,
      bookmarkAnonId: null,
      savedAyahStorageKey: "ic_saved_ayahs_session",
      feedbackMessages: {},
      // Keyed by ayahID, value: { text, class }
      bookmarkToast: "",
      bookmarkToastAction: null,
      bookmarkToastTimer: null,
      bookmarkInstanceId: `surat-${Math.random().toString(36).slice(2)}`,
      bookmarkEventHandler: null,
      bookmarkStorageHandler: null,
      visibilityHandler: null,
      authAlert: "",
      authAlertTimer: null,
      deepLinkTarget: null,
      deepLinkHandled: false,
      bookmarkAuthenticated: false,
      ayahReflections: {},
      // key -> array of reflection entries
      reflectionModalId: "ayahReflectionModal",
      reflectionModalInstance: null,
      reflectionModalHiddenHandler: null,
      selectedAyahForReflection: null,
      selectedReflectionKey: "",
      reflectionForm: {
        subject: "",
        message: ""
      },
      reflectionSubjectSuggestions: ["Gratitude for divine guidance", "How this verse comforts me", "Commitment to the lesson"],
      reflectionMessagePrompts: [{
        icon: "✨",
        text: "This reminded me to pause and thank Allah for His mercy."
      }, {
        icon: "🌿",
        text: "I can implement this by showing patience with my family today."
      }, {
        icon: "🕊️",
        text: "I feel my trust in Allah growing every time I read this."
      }, {
        icon: "🔥",
        text: "Let this verse guide the way I handle challenges."
      }, {
        icon: "💭",
        text: "I promise to keep this verse in mind during moments of doubt."
      }, {
        icon: "🌙",
        text: "It gave me strength to keep my prayers steady tonight."
      }, {
        icon: "🧭",
        text: "The advice feels like a compass when I need direction."
      }, {
        icon: "🌟",
        text: "I am taking this lesson with me into today’s actions."
      }, {
        icon: "🤲",
        text: "This verse inspires me to make dua for others."
      }],
      reflectionMessageMinLength: 10,
      reflectionErrorMessage: "",
      reflectionSuccessMessage: "",
      reflectionSuccessTimeout: null,
      ayahReflectionKeys: {},
      editingReflectionId: null,
      editingReflectionIndex: null,
      reflectionCacheKey: "",
      reflectionGeneralStorageKey: "ic_reflection_keys",
      isSavingReflection: false,
      showReflectionHighlight: true,
      carouselCollapsed: false,
      promptRowCount: 3
    };
  },
  computed: {
    reflectionMessagePromptRows() {
      const prompts = this.reflectionMessagePrompts || [];
      const perRow = 5;
      const rows = [];
      if (!prompts.length) return rows;
      for (let rowIndex = 0; rowIndex < this.promptRowCount; rowIndex++) {
        const start = rowIndex * perRow % prompts.length;
        const rowPrompts = [];
        for (let offset = 0; offset < perRow; offset++) {
          const prompt = prompts[(start + offset) % prompts.length];
          if (!rowPrompts.some(p => p.text === prompt.text)) {
            rowPrompts.push(prompt);
          }
          if (rowPrompts.length >= perRow) break;
        }
        rows.push(rowPrompts);
      }
      return rows;
    },
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
        return (a.englishName || "").localeCompare(b.englishName || "");
      });
    },
    translationsSorted() {
      if (!Array.isArray(this.translations)) return [];
      const fav = new Set(this.favoriteTranslations);
      return [...this.translations].sort((a, b) => {
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        if ((a.flag || "") !== (b.flag || "")) return (a.flag || "").localeCompare(b.flag || "");
        return (a.englishName || "").localeCompare(b.englishName || "");
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
    },
    currentAyahReflections() {
      if (!this.selectedReflectionKey) return [];
      const reflections = this.ayahReflections[this.selectedReflectionKey];
      return Array.isArray(reflections) ? reflections : [];
    },
    canPlaySurah() {
      return !this.isLoading && Array.isArray(this.filteredAyahs) && this.filteredAyahs.length > 0;
    },
    canSubmitReflection() {
      const subject = (this.reflectionForm.subject || "").trim();
      const message = (this.reflectionForm.message || "").trim();
      return subject.length > 0 && message.length >= this.reflectionMessageMinLength;
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
      this.ayahScrubValue = Math.min(Math.max(1, this.ayahScrubValue), Math.max(n, 1));
      this.$nextTick(this.updateVirtualWindow);
    },
    currentlyPlayingIndex(next) {
      if (typeof next !== "number" || next < 0) return;
      this.ayahScrubValue = next + 1;
      this.syncPlaybackScroll(next);
    }
  },
  created() {
    // postpone loading until we know the authentication status
  },
  async mounted() {
    var _JSON$parse, _JSON$parse2;
    window.addEventListener("keydown", this.onKeydown);
    this._keydownHandler = e => {
      if (!this.showAudioPlayer) return;
      if (["INPUT", "TEXTAREA"].includes((e.target || {}).tagName)) return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          this.toggleAudioPlayer(this.currentlyPlayingIndex);
          break;
        case "ArrowRight":
          this.fastForwardAudio(this.currentlyPlayingIndex);
          break;
        case "ArrowLeft":
          this.rewindAudio(this.currentlyPlayingIndex);
          break;
        case "ArrowDown":
          this.playNextAyah(this.currentlyPlayingIndex);
          break;
        case "ArrowUp":
          this.playPrevAyah(this.currentlyPlayingIndex);
          break;
      }
    };
    window.addEventListener("keydown", this._keydownHandler);
    this.updateIsMobile();
    window.addEventListener("resize", this.updateIsMobile);
    // Restore dismissal state for next-step card
    try {
      if (localStorage.getItem("suratNextStepDismissed") === "1") this.showNextStep = false;
    } catch (_) {}
    await this.initializeBookmarkAuth();
    this.bookmarkEventHandler = event => this.handleBookmarksUpdated(event);
    this.bookmarkStorageHandler = event => this.handleStorageBookmarksUpdated(event);
    this.visibilityHandler = () => this.handleVisibilityChange();
    window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
    window.addEventListener("storage", this.bookmarkStorageHandler);
    window.addEventListener("visibilitychange", this.visibilityHandler);
    // Virtualization hooks
    this.$nextTick(() => {
      this.computeListTop();
      this.updateVirtualWindow();
      this.$nextTick(this.calibrateItemHeight);
      window.addEventListener("scroll", this.onScrollVirtual, {
        passive: true
      });
      window.addEventListener("resize", this.computeListTop, {
        passive: true
      });
      window.addEventListener("resize", this.calibrateItemHeight, {
        passive: true
      });
    });
    // Restore next-step minimized state
    try {
      this.nextStepMinimized = localStorage.getItem("suratNextStepMinimized") === "1";
    } catch (_) {}
    this.selectedSurah = "1";
    this.selectedReciter = "ar.alafasy";
    this.selectedTranslation = "en.ahmedali";
    this.currentlyPlayingIndex = 0;
    this.isHighlighted = false;
    this.continuousPlayback = (_JSON$parse = JSON.parse(localStorage.getItem("continuousPlayback"))) !== null && _JSON$parse !== void 0 ? _JSON$parse : true;
    this.playbackSpeed = (_JSON$parse2 = JSON.parse(localStorage.getItem("playbackSpeed"))) !== null && _JSON$parse2 !== void 0 ? _JSON$parse2 : 1;
    Promise.all([this.fetchReciters(), this.fetchSurahs(), this.fetchTranslations(), this.fetchSurahDetails()]).then(() => {
      this.isInitialLoad = false;
    });
  },
  beforeUnmount() {
    this.isComponentAlive = false;
    window.removeEventListener("keydown", this.onKeydown);
    if (this._keydownHandler) window.removeEventListener("keydown", this._keydownHandler);
    window.removeEventListener("resize", this.updateIsMobile);
    window.removeEventListener("scroll", this.onScrollVirtual);
    window.removeEventListener("resize", this.computeListTop);
    window.removeEventListener("resize", this.calibrateItemHeight);
    if (this._boundMove) {
      window.removeEventListener("mousemove", this._boundMove);
      window.removeEventListener("touchmove", this._boundMove);
    }
    if (this._boundUp) {
      window.removeEventListener("mouseup", this._boundUp);
      window.removeEventListener("touchend", this._boundUp);
    }
    if (this.bookmarkEventHandler) window.removeEventListener("bookmarks-updated", this.bookmarkEventHandler);
    if (this.bookmarkStorageHandler) window.removeEventListener("storage", this.bookmarkStorageHandler);
    if (this.visibilityHandler) window.removeEventListener("visibilitychange", this.visibilityHandler);
    if (this.audioElements && this.audioElements.forEach) {
      this.audioElements.forEach(audio => {
        if (audio && audio.pause) audio.pause();
        if (audio && audio.remove) audio.remove();
      });
    }
    clearTimeout(this.savedAyahClearTimer);
    clearTimeout(this.bookmarkToastTimer);
    this.bookmarkToastAction = null;
    clearTimeout(this.authAlertTimer);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeydown);
    if (this._keydownHandler) window.removeEventListener("keydown", this._keydownHandler);
    window.removeEventListener("resize", this.updateIsMobile);
    window.removeEventListener("scroll", this.onScrollVirtual);
    window.removeEventListener("resize", this.computeListTop);
    window.removeEventListener("resize", this.calibrateItemHeight);
    clearTimeout(this.savedAyahClearTimer);
    clearTimeout(this.bookmarkToastTimer);
    this.bookmarkToastAction = null;
    clearTimeout(this.authAlertTimer);
    if (this.reflectionModalHiddenHandler) {
      const modalEl = document.getElementById(this.reflectionModalId);
      if (modalEl) {
        modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
      }
      this.reflectionModalHiddenHandler = null;
    }
  },
  methods: {
    showToast(message, timeout = 3500, action = null) {
      this.bookmarkToast = message;
      this.bookmarkToastAction = action;
      clearTimeout(this.bookmarkToastTimer);
      this.bookmarkToastTimer = setTimeout(() => {
        this.bookmarkToast = "";
        this.bookmarkToastAction = null;
      }, timeout);
    },
    announce(message, timeout = 5000) {
      this.screenReaderMessage = message;
      clearTimeout(this.savedAyahClearTimer);
      this.savedAyahClearTimer = setTimeout(() => {
        this.screenReaderMessage = "";
      }, timeout);
    },
    async loadSavedAyahs() {
      if (this.savedAyahsLoaded) return;
      await this.initializeSavedAyahStorageKey();
      try {
        const stored = sessionStorage.getItem(this.savedAyahStorageKey) || localStorage.getItem(this.savedAyahStorageKey);
        if (stored) {
          this.savedAyahKeys = JSON.parse(stored) || {};
        } else {
          const legacySession = sessionStorage.getItem("ic_saved_ayahs_session");
          const legacyGlobal = localStorage.getItem("ic_saved_ayahs");
          const fallback = legacySession || legacyGlobal;
          this.savedAyahKeys = fallback ? JSON.parse(fallback) : {};
          if (fallback) {
            sessionStorage.setItem(this.savedAyahStorageKey, fallback);
            localStorage.setItem(this.savedAyahStorageKey, fallback);
          }
        }
      } catch (_) {
        this.savedAyahKeys = {};
      }
      this.savedAyahsLoaded = true;
    },
    buildAyahMessage(ayah, options = {}) {
      var _this$surahDetails, _this$surahDetails2, _this$surahDetails3;
      if (!ayah) return "";
      const includeAudio = options.includeAudio !== false;
      const surahNumber = (_this$surahDetails = this.surahDetails) === null || _this$surahDetails === void 0 ? void 0 : _this$surahDetails.surahNumber;
      const surahName = ((_this$surahDetails2 = this.surahDetails) === null || _this$surahDetails2 === void 0 ? void 0 : _this$surahDetails2.englishName) || ((_this$surahDetails3 = this.surahDetails) === null || _this$surahDetails3 === void 0 ? void 0 : _this$surahDetails3.name);
      const ayahNumber = ayah.numberInSurah || ayah.number;
      let header = "Surah";
      if (surahNumber) header += ` ${surahNumber}`;
      if (surahName) header += ` - ${surahName}`;
      if (ayahNumber) header += ` (Ayah ${ayahNumber})`;
      const lines = [header];
      if (ayah.text) lines.push(`Arabic: ${ayah.text}`);
      if (ayah.translation) lines.push(`Translation: ${ayah.translation}`);
      if (includeAudio && ayah.audio) lines.push(`Listen here: ${ayah.audio}`);
      return lines.filter(Boolean).join("\n\n");
    },
    async copyText(text) {
      var _navigator$clipboard;
      if (!text) return false;
      if (typeof window !== "undefined" && typeof navigator !== "undefined" && (_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (_) {
          // fall back
        }
      }
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand("copy");
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
        this.showToast("Ayah copied to clipboard.");
        this.announce("Ayah copied to clipboard.");
      } else {
        var _this$$toast;
        (_this$$toast = this.$toast) === null || _this$$toast === void 0 || _this$$toast.error("Unable to copy ayah.");
        this.announce("Unable to copy ayah.");
      }
    },
    async syncSavedAyahsFromApi() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks");
        const bookmarks = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || [];
        if (!Array.isArray(bookmarks)) return;
        const next = {};
        bookmarks.forEach(bookmark => {
          var _bookmark$ayah, _bookmark$ayah2;
          const surahNumber = Number(bookmark.surah_number || ((_bookmark$ayah = bookmark.ayah) === null || _bookmark$ayah === void 0 ? void 0 : _bookmark$ayah.surah_id));
          const ayahNumber = Number(bookmark.ayah_number || bookmark.ayah_num);
          const ayahInSurah = Number((_bookmark$ayah2 = bookmark.ayah) === null || _bookmark$ayah2 === void 0 ? void 0 : _bookmark$ayah2.ayah_id);
          if (surahNumber && ayahNumber) {
            next[this.buildAyahKey(surahNumber, ayahNumber)] = bookmark.id || true;
          }
          if (surahNumber && ayahInSurah) {
            next[this.buildAyahKey(surahNumber, ayahInSurah)] = bookmark.id || true;
          }
        });
        this.savedAyahKeys = next;
      } catch (_) {
        // Ignore sync failures; local state still works.
      }
    },
    notifyBookmarkChange(source = this.bookmarkInstanceId) {
      if (typeof window === "undefined") return;
      const token = `${Date.now()}-${source}`;
      try {
        localStorage.setItem("bookmarkRefresh", token);
      } catch (_) {
        // ignore private mode errors
      }
      window.dispatchEvent(new CustomEvent("bookmarks-updated", {
        detail: {
          token,
          instance: source
        }
      }));
    },
    handleBookmarksUpdated(event) {
      var _event$detail;
      if ((event === null || event === void 0 || (_event$detail = event.detail) === null || _event$detail === void 0 ? void 0 : _event$detail.instance) === this.bookmarkInstanceId) return;
      this.syncSavedAyahsFromApi();
    },
    handleStorageBookmarksUpdated(event) {
      if (event.key !== "bookmarkRefresh") return;
      this.syncSavedAyahsFromApi();
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.syncSavedAyahsFromApi();
      }
    },
    async initializeBookmarkAuth() {
      await this.evaluateBookmarkAuth();
      await this.loadSavedAyahs();
      await this.initializeReflectionCacheKey();
      await this.syncSavedAyahsFromApi();
      if (this.bookmarkAuthenticated) {
        await this.loadAyahReflections();
      }
    },
    async evaluateBookmarkAuth() {
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.fetchUserIdFromApi)();
      this.bookmarkAuthenticated = !!userId;
      return this.bookmarkAuthenticated;
    },
    clearSavedBookmarks() {
      this.savedAyahKeys = {};
      try {
        const key = this.savedAyahStorageKey || "ic_saved_ayahs_session";
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      } catch (_) {
        // ignore
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
    getBookmarkId(ayah) {
      if (!ayah || !this.surahDetails) return null;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const val = this.savedAyahKeys[this.buildAyahKey(surahNumber, ayahNumber)];
      return val === true ? null : val; // handle historic boolean values
    },
    async toggleBookmark(ayah) {
      if (this.isAyahSaved(ayah)) {
        this.removeBookmark(ayah);
      } else {
        this.quickSaveBookmark(ayah);
      }
    },
    triggerAyahFeedback(key, text, cssClass, icon) {
      // Use reactive assignment
      this.feedbackMessages = _objectSpread(_objectSpread({}, this.feedbackMessages), {}, {
        [key]: {
          text,
          class: cssClass,
          icon
        }
      });
      setTimeout(() => {
        const next = _objectSpread({}, this.feedbackMessages);
        delete next[key];
        this.feedbackMessages = next;
      }, 6000);
    },
    async quickSaveBookmark(ayah) {
      if (!this.surahDetails || !ayah) return;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const key = this.buildAyahKey(surahNumber, ayahNumber);

      // Optimistic update
      const prevKeys = _objectSpread({}, this.savedAyahKeys);
      this.savedAyahKeys = _objectSpread(_objectSpread({}, this.savedAyahKeys), {}, {
        [key]: true
      });

      // Local feedback
      this.triggerAyahFeedback(key, "Bookmark saved successfully", "bg-dark text-white", "check");
      try {
        var _response$data2;
        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.surahDetails.englishName || this.surahDetails.name || "Surah",
          ayah_verse_ar: ayah.text || "",
          ayah_verse_en: ayah.translation || "",
          folder_ids: []
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/ayah-bookmarks", payload);
        const bookmark = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.bookmark;
        if (bookmark && bookmark.id) {
          this.savedAyahKeys = _objectSpread(_objectSpread({}, this.savedAyahKeys), {}, {
            [key]: bookmark.id
          });
          this.showToast("Bookmark saved.", 4000, {
            text: "Edit",
            handler: () => {
              this.openBookmarkModal(ayah);
              const modalEl = document.getElementById("bookmarkModal");
              if (modalEl) {
                const modal = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
                modal.show();
              }
            }
          });
          this.announce("Ayah saved to bookmarks.");
          this.notifyBookmarkChange();
        }
      } catch (error) {
        // Revert
        this.savedAyahKeys = prevKeys;
        this.triggerAyahFeedback(key, "Error saving", "bg-danger text-white", "trash");
        this.showToast("Failed to save bookmark.", 3000);
      }
    },
    async removeBookmark(ayah) {
      if (!this.surahDetails || !ayah) return;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      const bookmarkId = this.getBookmarkId(ayah);
      if (!bookmarkId) {
        // fallback handling
        const _next = _objectSpread({}, this.savedAyahKeys);
        delete _next[key];
        this.savedAyahKeys = _next;
        this.triggerAyahFeedback(key, "Bookmark removed", "bg-dark text-white", "trash");
        return;
      }

      // Optimistic update
      const prevKeys = _objectSpread({}, this.savedAyahKeys);
      const next = _objectSpread({}, this.savedAyahKeys);
      delete next[key];
      this.savedAyahKeys = next;

      // Local feedback
      this.triggerAyahFeedback(key, "Bookmark removed", "bg-dark text-white", "trash");
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}`);
        this.showToast("Bookmark removed.", 2000);
        this.announce("Bookmark removed.");
        this.notifyBookmarkChange();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Already deleted on server, so this is a success state for us.
          this.showToast("Bookmark removed.", 2000);
          this.announce("Bookmark removed.");
          this.notifyBookmarkChange();
        } else {
          // Revert
          this.savedAyahKeys = prevKeys;
          this.triggerAyahFeedback(key, "Error removing", "bg-danger text-white", "trash");
          this.showToast("Failed to remove bookmark.", 3000);
        }
      }
    },
    async openBookmarkModal(ayah) {
      if (!this.surahDetails || !ayah) return;
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      this.activeAyah = {
        surah_number: Number(this.surahDetails.surahNumber),
        surah_name: this.surahDetails.englishName || this.surahDetails.name || "Surah",
        ayah_number: ayahNumber,
        ayah_verse_ar: ayah.text || "",
        ayah_verse_en: ayah.translation || ""
      };
      this.$nextTick(() => {
        const modalEl = document.getElementById("bookmarkModal");
        if (modalEl) {
          const modal = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
          modal.show();
        }
      });
    },
    onBookmarkSaved(payload) {
      if (!payload) return;
      const source = payload.bookmark || payload;
      const surahNumber = Number(source.surah_number);
      const ayahNumber = Number(source.ayah_number || source.ayah_num);
      if (!surahNumber || !ayahNumber) return;
      this.announce("Ayah saved to bookmarks.");
      this.showToast("Bookmark saved successfully.", 4000);
      const next = _objectSpread({}, this.savedAyahKeys);
      next[this.buildAyahKey(surahNumber, ayahNumber)] = source.id || true;
      this.savedAyahKeys = next;
    },
    async onBookmarksLinkClick() {
      const isAuthed = await this.ensureAuthenticated();
      if (isAuthed) {
        window.location.href = "/bookmarks";
      }
    },
    async onNotesLinkClick() {
      const isAuthed = await this.ensureAuthenticated("Please log in to save and view reflections.");
      if (isAuthed) {
        window.location.href = "/notes";
      }
    },
    hasReflection(ayah) {
      var _this$surahDetails4;
      if (!ayah) return false;
      const surahNumber = Number(((_this$surahDetails4 = this.surahDetails) === null || _this$surahDetails4 === void 0 ? void 0 : _this$surahDetails4.surahNumber) || this.selectedSurah);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      if (!surahNumber || !ayahNumber) return false;
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      const stored = this.ayahReflections[key];
      if (Array.isArray(stored)) {
        return stored.length > 0;
      }
      if (stored && typeof stored === "object" && Object.keys(stored).length) {
        return true;
      }
      return false;
    },
    async openReflectionModal(ayah) {
      var _this$surahDetails5, _this$surahDetails6, _this$surahDetails7;
      if (!ayah) return;
      const surahNumber = Number(((_this$surahDetails5 = this.surahDetails) === null || _this$surahDetails5 === void 0 ? void 0 : _this$surahDetails5.surahNumber) || this.selectedSurah);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      if (!surahNumber || !ayahNumber) return;
      const isAuthed = await this.ensureAuthenticated("Please log in to save reflections.");
      if (!isAuthed) return;
      if (this.bookmarkAuthenticated && !Object.keys(this.ayahReflections).length) {
        await this.loadAyahReflections();
      }
      const surahLabel = ((_this$surahDetails6 = this.surahDetails) === null || _this$surahDetails6 === void 0 ? void 0 : _this$surahDetails6.englishName) || ((_this$surahDetails7 = this.surahDetails) === null || _this$surahDetails7 === void 0 ? void 0 : _this$surahDetails7.name) || "Surah";
      const surahName = `${surahNumber} - ${surahLabel}`;
      this.selectedAyahForReflection = {
        surahNumber,
        ayahNumber,
        surahName,
        ayahArabic: ayah.text || "",
        ayahTranslation: ayah.translation || ""
      };
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      this.selectedReflectionKey = key;
      this.clearReflectionForm();
      this.reflectionErrorMessage = "";
      this.isSavingReflection = false;
      this.$nextTick(() => {
        const modalEl = document.getElementById(this.reflectionModalId);
        if (!modalEl) return;
        this.reflectionModalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
        if (this.reflectionModalHiddenHandler) {
          modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
        }
        const handler = () => this.onReflectionModalHidden();
        modalEl.addEventListener("hidden.bs.modal", handler);
        this.reflectionModalHiddenHandler = handler;
        this.reflectionModalInstance.show();
      });
    },
    hideReflectionModal() {
      const modalEl = document.getElementById(this.reflectionModalId);
      const modal = this.reflectionModalInstance || (modalEl ? bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) : null);
      if (modal) {
        modal.hide();
      }
      this.cancelReflectionEdit();
    },
    onReflectionModalHidden() {
      const modalEl = document.getElementById(this.reflectionModalId);
      if (modalEl && this.reflectionModalHiddenHandler) {
        modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
      }
      this.reflectionModalHiddenHandler = null;
      this.reflectionModalInstance = null;
      this.selectedAyahForReflection = null;
      this.selectedReflectionKey = "";
      this.clearReflectionForm();
      this.reflectionErrorMessage = "";
      this.reflectionSuccessMessage = "";
      if (this.reflectionSuccessTimeout) {
        clearTimeout(this.reflectionSuccessTimeout);
        this.reflectionSuccessTimeout = null;
      }
    },
    clearReflectionForm() {
      this.reflectionForm.subject = "";
      this.reflectionForm.message = "";
    },
    applySubjectSuggestion(text) {
      this.reflectionForm.subject = text;
    },
    applyMessageSuggestion(text) {
      this.reflectionForm.message = text;
    },
    startEditingReflection(note, index) {
      if (!note) return;
      this.editingReflectionId = note.id || null;
      this.editingReflectionIndex = typeof index === "number" ? index : null;
      this.reflectionForm.subject = note.subject || "";
      this.reflectionForm.message = note.message || "";
      this.reflectionErrorMessage = "";
      this.reflectionSuccessMessage = "";
    },
    cancelReflectionEdit() {
      this.editingReflectionId = null;
      this.editingReflectionIndex = null;
      this.clearReflectionForm();
    },
    async deleteReflection(note, index) {
      if (!note) return;
      const proceed = confirm("Delete this reflection?");
      if (!proceed) return;
      if (note.id) {
        try {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/delete-notes/${note.id}`);
        } catch (error) {
          console.error("Delete reflection failed", error);
          this.showToast("Unable to delete reflection.", 3000);
          return;
        }
      }
      const key = this.selectedReflectionKey;
      if (!key) return;
      const current = Array.isArray(this.ayahReflections[key]) ? [...this.ayahReflections[key]] : [];
      current.splice(index, 1);
      this.ayahReflections = _objectSpread(_objectSpread({}, this.ayahReflections), {}, {
        [key]: current
      });
      if (this.editingReflectionIndex === index) {
        this.cancelReflectionEdit();
      }
      this.showToast("Reflection deleted.", 2000);
    },
    toggleReflectionHelp() {
      this.showReflectionHighlight = false;
    },
    suggestionTrackStyle(rowIndex) {
      const base = 32 + (rowIndex - 1) * 5;
      return {
        animationDuration: `${base}s`,
        animationDirection: rowIndex % 2 === 0 ? "reverse" : "normal"
      };
    },
    async submitReflectionForm() {
      const subject = (this.reflectionForm.subject || "").trim();
      const message = (this.reflectionForm.message || "").trim();
      if (!subject) {
        this.reflectionErrorMessage = "Please enter a subject for your reflection.";
        return;
      }
      if (!message) {
        this.reflectionErrorMessage = "Add a reflection message to continue.";
        return;
      }
      if (message.length < this.reflectionMessageMinLength) {
        this.reflectionErrorMessage = `Reflection must be at least ${this.reflectionMessageMinLength} characters.`;
        return;
      }
      if (!this.selectedAyahForReflection) return;
      this.reflectionErrorMessage = "";
      this.isSavingReflection = true;
      const {
        surahNumber,
        ayahNumber,
        surahName,
        ayahArabic,
        ayahTranslation
      } = this.selectedAyahForReflection;
      const payload = {
        surah_name: surahName,
        ayah_num: String(ayahNumber),
        ayah_verse_ar: ayahArabic,
        ayah_verse_en: ayahTranslation,
        ayah_info: subject,
        ayah_notes: message,
        is_speech_to_text: false
      };
      const isEditing = !!this.editingReflectionId;
      try {
        var _response$data3;
        const response = isEditing ? await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/update-notes/${this.editingReflectionId}`, payload) : await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/submit-note", payload);
        const note = ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.note) || null;
        const key = this.buildAyahKey(surahNumber, ayahNumber);
        const entryPayload = {
          id: (note === null || note === void 0 ? void 0 : note.id) || this.editingReflectionId || null,
          subject,
          message,
          surah_name: payload.surah_name,
          ayah_verse_ar: ayahArabic,
          ayah_verse_en: ayahTranslation
        };
        const existing = Array.isArray(this.ayahReflections[key]) ? [...this.ayahReflections[key]] : [];
        if (!isEditing) {
          this.ayahReflections = _objectSpread(_objectSpread({}, this.ayahReflections), {}, {
            [key]: [...existing, entryPayload]
          });
        } else {
          const targetIndex = typeof this.editingReflectionIndex === "number" ? this.editingReflectionIndex : existing.findIndex(item => item.id === this.editingReflectionId);
          if (targetIndex >= 0) {
            existing[targetIndex] = _objectSpread(_objectSpread({}, existing[targetIndex]), entryPayload);
          }
          this.ayahReflections = _objectSpread(_objectSpread({}, this.ayahReflections), {}, {
            [key]: existing
          });
          this.cancelReflectionEdit();
          this.reflectionSuccessMessage = "Reflection updated.";
        }
        if (!isEditing) {
          this.flagReflectionKey(key);
          this.showToast("Reflection saved.", 4000);
          this.announce("Reflection saved.");
          this.reflectionSuccessMessage = "Your reflection has been saved.";
          if (this.reflectionSuccessTimeout) {
            clearTimeout(this.reflectionSuccessTimeout);
          }
          this.reflectionSuccessTimeout = setTimeout(() => {
            this.hideReflectionModal();
            this.reflectionSuccessTimeout = null;
          }, 1200);
        }
      } catch (error) {
        var _error$response;
        console.error("Error saving reflection", error);
        this.reflectionErrorMessage = (error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Unable to save reflection right now.";
        this.showToast("Unable to save reflection. Please try again.", 3000);
      } finally {
        this.isSavingReflection = false;
      }
    },
    async loadAyahReflections() {
      if (!this.bookmarkAuthenticated) return;
      try {
        var _response$data4;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/fetch-notes");
        const notes = Array.isArray(response.data) ? response.data : ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.notes) || [];
        const next = {};
        notes.forEach(note => {
          const surahNumber = this.extractSurahNumberFromNoteName(note.surah_name);
          const ayahNumber = Number(note.ayah_num);
          if (!surahNumber || !ayahNumber) return;
          const key = this.buildAyahKey(surahNumber, ayahNumber);
          const entry = {
            id: note.id,
            subject: (note.ayah_info || "").trim(),
            message: this.stripHtmlTags(note.ayah_notes),
            surah_name: note.surah_name,
            ayah_verse_ar: note.ayah_verse_ar,
            ayah_verse_en: note.ayah_verse_en
          };
          const existingEntries = next[key];
          next[key] = Array.isArray(existingEntries) ? [...existingEntries, entry] : [entry];
        });
        const cachedKeys = {};
        Object.keys(next).forEach(key => {
          cachedKeys[key] = true;
        });
        this.ayahReflectionKeys = _objectSpread(_objectSpread({}, this.ayahReflectionKeys || {}), cachedKeys);
        this.persistReflectionKeys(this.ayahReflectionKeys);
        this.persistGeneralReflectionKeys(this.ayahReflectionKeys);
        this.ayahReflections = next;
      } catch (error) {
        console.error("Error loading reflections", error);
      }
    },
    extractSurahNumberFromNoteName(name) {
      if (!name) return null;
      const trimmed = name.trim();
      const match = /^(\d+)/.exec(trimmed);
      if (match) {
        return Number(match[1]);
      }
      const fallback = trimmed.split(/\D+/);
      for (const part of fallback) {
        const num = Number(part);
        if (!Number.isNaN(num)) return num;
      }
      return null;
    },
    stripHtmlTags(value) {
      if (!value) return "";
      const div = document.createElement("div");
      div.innerHTML = value;
      return (div.textContent || div.innerText || "").trim();
    },
    async ensureAuthenticated(message = "Please log in to access bookmarks & reflections.") {
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.fetchUserIdFromApi)();
      const isAuthed = !!userId;
      if (isAuthed) {
        this.bookmarkAuthenticated = true;
        this.bookmarkStorageUserId = userId;
        await this.initializeReflectionCacheKey();
        return true;
      }
      this.bookmarkAuthenticated = false;
      this.showAuthAlert(message);
      return false;
    },
    showAuthAlert(message = "Please log in to access bookmarks & reflections.") {
      this.authAlert = message;
      clearTimeout(this.authAlertTimer);
      this.authAlertTimer = setTimeout(() => {
        this.authAlert = "";
      }, 6000);
    },
    async persistSavedAyahs(next) {
      if (!this.bookmarkAuthenticated) return;
      try {
        await this.initializeSavedAyahStorageKey();
        const key = this.savedAyahStorageKey || "ic_saved_ayahs_session";
        const payload = JSON.stringify(next);
        sessionStorage.setItem(key, payload);
        localStorage.setItem(key, payload);
      } catch (_) {
        // no-op
      }
    },
    async initializeSavedAyahStorageKey() {
      if (this.savedAyahStorageKey && this.savedAyahStorageKey.startsWith("ic_saved_ayahs_user_") && this.bookmarkStorageUserId) {
        return;
      }
      await this.fetchBookmarkStorageUserId();
      this.savedAyahStorageKey = this.buildSavedAyahStorageKey();
    },
    buildReflectionCacheKey() {
      if (this.bookmarkStorageUserId) {
        return `ic_reflection_keys_user_${this.bookmarkStorageUserId}`;
      }
      if (!this.bookmarkAnonId) {
        return "";
      }
      return `ic_reflection_keys_anon_${this.bookmarkAnonId}`;
    },
    async initializeReflectionCacheKey() {
      await this.fetchBookmarkStorageUserId();
      const nextKey = this.buildReflectionCacheKey();
      if (nextKey && this.reflectionCacheKey === nextKey) {
        this.loadReflectionKeyCache();
        return;
      }
      this.reflectionCacheKey = nextKey;
      this.loadReflectionKeyCache();
    },
    loadReflectionKeyCache() {
      const generalKeys = this.loadGeneralReflectionKeyCache();
      let combined = _objectSpread({}, generalKeys || {});
      if (this.reflectionCacheKey) {
        try {
          const stored = localStorage.getItem(this.reflectionCacheKey);
          if (stored) {
            const parsed = JSON.parse(stored || "{}");
            combined = _objectSpread(_objectSpread({}, combined), parsed);
          }
        } catch (_) {
          // ignore JSON errors
        }
      }
      this.ayahReflectionKeys = combined;
    },
    loadGeneralReflectionKeyCache() {
      if (!this.reflectionGeneralStorageKey) return {};
      try {
        const stored = localStorage.getItem(this.reflectionGeneralStorageKey);
        return stored ? JSON.parse(stored) : {};
      } catch (_) {
        return {};
      }
    },
    persistReflectionKeys(keys = this.ayahReflectionKeys) {
      if (!this.reflectionCacheKey) return;
      try {
        const payload = JSON.stringify(keys || {});
        localStorage.setItem(this.reflectionCacheKey, payload);
      } catch (_) {
        // no-op
      }
    },
    persistGeneralReflectionKeys(keys = this.ayahReflectionKeys) {
      if (!this.reflectionGeneralStorageKey) return;
      try {
        const payload = JSON.stringify(keys || {});
        localStorage.setItem(this.reflectionGeneralStorageKey, payload);
      } catch (_) {
        // no-op
      }
    },
    flagReflectionKey(key) {
      if (!key) return;
      const next = _objectSpread(_objectSpread({}, this.ayahReflectionKeys || {}), {}, {
        [key]: true
      });
      this.ayahReflectionKeys = next;
      this.persistReflectionKeys(next);
      this.persistGeneralReflectionKeys(next);
    },
    buildSavedAyahStorageKey() {
      const base = "ic_saved_ayahs";
      if (this.bookmarkStorageUserId) {
        return `${base}_user_${this.bookmarkStorageUserId}`;
      }
      if (!this.bookmarkAnonId) {
        let anon = sessionStorage.getItem("ic_saved_ayahs_anon_id");
        if (!anon) {
          anon = `anon-${Math.random().toString(36).slice(2)}`;
          sessionStorage.setItem("ic_saved_ayahs_anon_id", anon);
        }
        this.bookmarkAnonId = anon;
      }
      return `${base}_anon_${this.bookmarkAnonId}`;
    },
    async fetchBookmarkStorageUserId() {
      if (this.bookmarkStorageUserId) {
        return this.bookmarkStorageUserId;
      }
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.fetchUserIdFromApi)();
      if (userId) {
        this.bookmarkStorageUserId = userId;
      }
      return this.bookmarkStorageUserId;
    },
    onAyahDragStart(ayah, event) {
      if (!event || !this.surahDetails || !ayah) return;
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const payload = {
        surah_number: Number(this.surahDetails.surahNumber),
        surah_name: this.surahDetails.englishName || this.surahDetails.name || "Surah",
        ayah_number: ayahNumber,
        ayah_verse_ar: ayah.text || "",
        ayah_verse_en: ayah.translation || ""
      };
      event.dataTransfer.setData("text/plain", JSON.stringify(payload));
      event.dataTransfer.effectAllowed = "copyMove";
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
      try {
        localStorage.setItem("suratNextStepMinimized", this.nextStepMinimized ? "1" : "0");
      } catch (_) {}
    },
    dismissNextStep() {
      this.showNextStep = false;
      try {
        localStorage.setItem("suratNextStepDismissed", "1");
      } catch (_) {}
    },
    calibrateItemHeight() {
      try {
        const el = this.$el.querySelector(".ayah-card-container");
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
      if (typeof window === "undefined") return null;
      const params = new URLSearchParams(window.location.search || "");
      const surah = Number(params.get("surah"));
      const ayah = Number(params.get("ayah"));
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
            behavior: "smooth"
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
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      if ((_e$target = e.target) !== null && _e$target !== void 0 && _e$target.isContentEditable || ["input", "textarea", "select"].includes(tag)) return;
      if (!Array.isArray(this.filteredAyahs) || this.filteredAyahs.length === 0) return;
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          this.goToNextCard();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          this.goToPreviousCard();
          break;
        case "Home":
          e.preventDefault();
          this.goToFirstCard();
          break;
        case "End":
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
        this.isMobile = window.matchMedia("(max-width: 767px)").matches;
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
        console.error("Error getting element position:", error);
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
      console.log("Attempting to play audio for index:", index);
      if (index < 0 || index >= this.filteredAyahs.length) return;

      // Defer showing loading spinner to avoid flicker; only show if slow (>200ms)
      clearTimeout(this.loadingTimers[index]);
      this.loadingTimers[index] = setTimeout(() => {
        this.$set ? this.$set(this.isAudioLoading, index, true) : this.isAudioLoading[index] = true;
      }, 200);

      // Stop any currently playing audio and ensure exclusivity
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        console.log("Pausing currently playing audio");
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
        audio.preload = "auto";
        this.audioElements[index] = audio;
      }
      audio.onended = () => this.handleAyahEnd(index);
      audio.onerror = e => {
        var _this$$toast2;
        console.error(`Audio error for ayah ${index + 1}:`, e);
        clearTimeout(this.loadingTimers[index]);
        this.isAudioLoading[index] = false;
        this.isAudioPlaying[index] = false;
        (_this$$toast2 = this.$toast) === null || _this$$toast2 === void 0 || _this$$toast2.error(`Failed to load audio for ayah ${index + 1}`);
      };
      if (audio.src !== ayah.audio) {
        try {
          audio.pause();
        } catch (_) {}
        audio.src = ayah.audio || "";
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
        const wordCount = (ayah.words || (ayah.text ? ayah.text.split(" ") : [])).length;
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
        if (p && typeof p.then === "function") {
          p.then(() => {
            markPlaying();
          }).catch(err => {
            // If playback fails (e.g., not enough data), wait for 'canplay' and retry once
            const onCanPlay = () => {
              audio.removeEventListener("canplay", onCanPlay);
              const p2 = audio.play();
              if (p2 && typeof p2.then === "function") {
                p2.then(() => markPlaying()).catch(() => {});
              } else {
                markPlaying();
              }
            };
            audio.addEventListener("canplay", onCanPlay, {
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
      console.log("Toggling audio player for index:", index);
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
        a.preload = "metadata";
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
      return (minutes < 10 ? "0" : "") + minutes + ":" + (secs < 10 ? "0" : "") + secs;
    },
    highlightText(text) {
      if (!this.debouncedQuery.trim()) return text;
      let highlightedText = text;
      const escapeRegExp = string => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      };
      const searchTerms = this.debouncedQuery.trim() ? this.debouncedQuery.trim().split(/\s+/) : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
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
      const whatsappLink = "https://api.whatsapp.com/send?text=" + encodedMessage;
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    },
    getFlagFromLanguage: function (lang) {
      const languageFlags = {
        en: "🇬🇧",
        ar: "🇸🇦",
        fr: "🇫🇷",
        es: "🇪🇸",
        ur: "🇵🇰",
        tr: "🇹🇷",
        id: "🇮🇩",
        bn: "🇧🇩",
        fa: "🇮🇷",
        ru: "🇷🇺",
        de: "🇩🇪",
        it: "🇮🇹",
        sw: "🇹🇿",
        zh: "🇨🇳",
        hi: "🇮🇳"
      };
      return languageFlags[lang.toLowerCase()] || "🌐";
    },
    fetchSurahs: async function () {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", "cache:surahs");
        if (!this._isDestroyed) this.surahs = data.data || [];
        this.isLoading = false;
        // Revalidate in background if served from cache
        if (fromCache) setTimeout(() => this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", "cache:surahs").then(({
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
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", "cache:reciters");
        if (!this._isDestroyed) {
          this.reciters = data.data.filter(reciter => reciter.identifier && reciter.englishName).map(reciter => ({
            identifier: reciter.identifier,
            englishName: reciter.englishName || "Unknown Reciter"
          })).filter(reciter => !["elmir kuliev 2 by 1muslimapp", "elmir kuliev by 1muslimapp", "elmir kuliev elevatemuslim", "elmir kuliev 1muslim", "elmir kuliev 2muslim", "chinese", "ibrahim walk", "fooladvand - hedayatfar", "shamshad ali khan", "youssouf leclerc"].includes(reciter.englishName.toLowerCase()));
        }
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try {
            const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", "cache:reciters");
            if (!this._isDestroyed) this.reciters = fresh.data.data.filter(r => r.identifier && r.englishName).map(r => ({
              identifier: r.identifier,
              englishName: r.englishName || "Unknown Reciter"
            })).filter(r => !["elmir kuliev 2 by 1muslimapp", "elmir kuliev by 1muslimapp", "elmir kuliev elevatemuslim", "elmir kuliev 1muslim", "elmir kuliev 2muslim", "chinese", "ibrahim walk", "fooladvand - hedayatfar", "shamshad ali khan", "youssouf leclerc"].includes(r.englishName.toLowerCase()));
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
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", "cache:translations");
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
        })).filter(translation => translation.flag !== "🌐");
        translations.sort((a, b) => {
          if (a.flag < b.flag) return -1;
          if (a.flag > b.flag) return 1;
          if (a.englishName < b.englishName) return -1;
          if (a.englishName > b.englishName) return 1;
          return 0;
        });
        this.translations = translations;
        console.log("Translations fetched:", translations);
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try {
            const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", "cache:translations");
            if (this._isDestroyed) return;
            const trs = fresh.data.data.map(t => ({
              identifier: t.identifier,
              englishName: t.englishName || "Unknown Translation",
              language: t.language || "Unknown",
              flag: this.getFlagFromLanguage(t.language || "Unknown")
            })).filter(t => t.flag !== "🌐");
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
                const text = ayah.text || "";
                const transText = translation.ayahs[index] && translation.ayahs[index].text ? translation.ayahs[index].text : "Translation not available";
                const words = text ? text.split(" ") : [];
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
            const text = ayah.text || "";
            const transText = translation.ayahs[index] && translation.ayahs[index].text ? translation.ayahs[index].text : "Translation not available";
            const words = text ? text.split(" ") : [];
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
        console.log("Surah details fetched:", this.surahDetails);
        this.isLoading = false;
        // Pre-warm the first and next ayah for instant playback
        this.$nextTick(() => {
          this.prepareNextAudio(0);
          this.prepareNextAudio(1);
        });
      }).catch(error => {
        if ((error === null || error === void 0 ? void 0 : error.name) === "AbortError") return; // expected on change
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
      this.stopAudio(index);
      if (this.repeatCurrent) {
        this.toggleAudioPlayer(index);
        return;
      }
      if (this.continuousPlayback) {
        const nextIndex = index + 1;
        if (nextIndex < this.filteredAyahs.length) {
          setTimeout(() => this.playAudio(nextIndex), 50);
          return;
        }
      }
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = -1;
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
    playSurahContinuously() {
      if (!this.canPlaySurah) return;
      this.continuousPlayback = true;
      this.savePreference("continuousPlayback", true);
      this.repeatCurrent = false;
      localStorage.setItem("repeatCurrent", JSON.stringify(this.repeatCurrent));
      const startIndex = 0;
      if (typeof this.currentlyPlayingIndex === "number" && this.currentlyPlayingIndex >= 0 && this.currentlyPlayingIndex < this.filteredAyahs.length) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.currentlyPlayingIndex = startIndex;
      this.selectCard(startIndex);
      this.playAudio(startIndex);
    },
    syncPlaybackScroll(index) {
      const now = window.performance ? performance.now() : Date.now();
      if (now - this.lastAutoScrollAt < 400) return;
      this.lastAutoScrollAt = now;
      this.scrollToAyahIndex(index);
    },
    onAyahScrubInput(event) {
      var _event$target;
      const raw = Number(((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value) || 1);
      this.ayahScrubValue = Math.min(Math.max(1, raw), Math.max(this.totalItems, 1));
    },
    onAyahScrubChange(event) {
      var _event$target2;
      const raw = Number(((_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.value) || 1);
      const targetIndex = Math.min(Math.max(0, raw - 1), Math.max(this.totalItems - 1, 0));
      this.ayahScrubValue = targetIndex + 1;
      this.selectCard(targetIndex);
      this.scrollToAyahIndex(targetIndex);
      this.playAudio(targetIndex);
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
      const isTouch = e.type === "touchstart";
      const clientX = isTouch ? e.touches && ((_e$touches$ = e.touches[0]) === null || _e$touches$ === void 0 ? void 0 : _e$touches$.clientX) : e.clientX;
      this.isScrubbing = true;
      // bind listeners once
      this._boundMove = this.onProgressMove;
      this._boundUp = this.onProgressUp;
      window.addEventListener("mousemove", this._boundMove, {
        passive: false
      });
      window.addEventListener("touchmove", this._boundMove, {
        passive: false
      });
      window.addEventListener("mouseup", this._boundUp, {
        passive: true
      });
      window.addEventListener("touchend", this._boundUp, {
        passive: true
      });
      this._updateScrubAt(clientX);
    },
    onProgressMove(e) {
      var _e$touches$2, _e$preventDefault;
      if (!this.isScrubbing) return;
      const isTouch = e.type === "touchmove";
      const clientX = isTouch ? e.touches && ((_e$touches$2 = e.touches[0]) === null || _e$touches$2 === void 0 ? void 0 : _e$touches$2.clientX) : e.clientX;
      if (clientX == null) return;
      (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 || _e$preventDefault.call(e);
      this._updateScrubAt(clientX);
    },
    onProgressUp() {
      this.isScrubbing = false;
      window.removeEventListener("mousemove", this._boundMove);
      window.removeEventListener("touchmove", this._boundMove);
      window.removeEventListener("mouseup", this._boundUp);
      window.removeEventListener("touchend", this._boundUp);
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
      this.savePreference("playbackSpeed", this.playbackSpeed);
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
      localStorage.setItem("repeatCurrent", JSON.stringify(this.repeatCurrent));
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
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
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
        create: true,
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
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      if (userId) {
        return true;
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
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            surah_number: surahNumber,
            ayah_number: ayahNumber
          }
        });
        const bookmark = Array.isArray((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) ? response.data.data[0] : null;
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
        var _this$currentBookmark, _this$ayah$surah, _this$ayah$ayah, _response$data2, _this$currentBookmark2;
        this.normalizeSelectedFolders();
        const selectedIds = Array.from(new Set(this.selectedFolderIds));
        const existingIds = ((_this$currentBookmark = this.currentBookmark) === null || _this$currentBookmark === void 0 || (_this$currentBookmark = _this$currentBookmark.folders) === null || _this$currentBookmark === void 0 ? void 0 : _this$currentBookmark.map(folder => folder.id)) || [];
        const removeIds = existingIds.filter(id => !selectedIds.includes(id));
        const removableIds = removeIds.filter(id => !this.isSmartFolder(id));
        const addIds = selectedIds.filter(id => !existingIds.includes(id));
        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.ayah.surah_name || ((_this$ayah$surah = this.ayah.surah) === null || _this$ayah$surah === void 0 ? void 0 : _this$ayah$surah.name_en) || 'Surah',
          ayah_verse_ar: this.ayah.ayah_verse_ar || ((_this$ayah$ayah = this.ayah.ayah) === null || _this$ayah$ayah === void 0 ? void 0 : _this$ayah$ayah.ayah_text) || '',
          ayah_verse_en: this.ayah.ayah_verse_en || '',
          folder_ids: selectedIds
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/ayah-bookmarks', payload);
        const bookmark = ((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.bookmark) || null;
        if (bookmark) {
          this.currentBookmark = bookmark;
        }
        let detachFailed = false;
        if (removableIds.length && (_this$currentBookmark2 = this.currentBookmark) !== null && _this$currentBookmark2 !== void 0 && _this$currentBookmark2.id) {
          try {
            await Promise.all(removableIds.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${this.currentBookmark.id}/folders/${id}`)));
            // Decrement count for removed folders
            removableIds.forEach(id => {
              const folder = this.folders.find(f => f.id === id);
              if (folder && folder.ayah_count > 0) {
                folder.ayah_count -= 1;
              }
            });
          } catch (error) {
            detachFailed = true;
          }
        }

        // Increment count for newly added folders
        addIds.forEach(id => {
          const folder = this.folders.find(f => f.id === id);
          if (folder) {
            folder.ayah_count = (folder.ayah_count || 0) + 1;
          }
        });
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
        await this.fetchCurrentBookmark();
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
        var _response$data3;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const items = Array.isArray((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.data) ? response.data.data : [];
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
  class: "filter-header"
};
const _hoisted_2 = {
  class: "filter-actions"
};
const _hoisted_3 = ["aria-expanded", "aria-label"];
const _hoisted_4 = {
  key: 0,
  class: "bi bi-chevron-up",
  "aria-hidden": "true"
};
const _hoisted_5 = {
  key: 1,
  class: "bi bi-chevron-down",
  "aria-hidden": "true"
};
const _hoisted_6 = {
  key: 0,
  class: "alert alert-warning auth-alert",
  role: "status"
};
const _hoisted_7 = {
  id: "surat-filters",
  class: "row g-3"
};
const _hoisted_8 = {
  class: "col-12 col-md-4 filter-item"
};
const _hoisted_9 = ["value"];
const _hoisted_10 = {
  class: "col-12 col-md-4 filter-item"
};
const _hoisted_11 = ["value"];
const _hoisted_12 = {
  class: "col-12 col-md-4 filter-item"
};
const _hoisted_13 = ["value"];
const _hoisted_14 = {
  key: 0,
  class: "surah-playback-bar d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"
};
const _hoisted_15 = {
  class: "d-flex flex-column flex-sm-row gap-2 align-items-sm-center"
};
const _hoisted_16 = {
  class: "fs-5 fw-bold text-dark lh-1"
};
const _hoisted_17 = {
  class: "text-muted small"
};
const _hoisted_18 = ["disabled"];
const _hoisted_19 = {
  class: "next-step-wrapper"
};
const _hoisted_20 = {
  class: "mx-auto mb-4 next-step-card"
};
const _hoisted_21 = ["title", "aria-label"];
const _hoisted_22 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_23 = {
  class: "flex-grow-1"
};
const _hoisted_24 = {
  class: "mb-2 next-step-teaser"
};
const _hoisted_25 = {
  class: "mb-3 next-step-text"
};
const _hoisted_26 = {
  href: "/mission",
  class: "btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta"
};
const _hoisted_27 = {
  key: 1,
  class: "loading-placeholder"
};
const _hoisted_28 = {
  class: "row rtl-text",
  ref: "listContainer",
  role: "list",
  "aria-label": "Ayah cards list"
};
const _hoisted_29 = ["id", "onClick", "onKeydown", "onDragstart"];
const _hoisted_30 = {
  class: "ayah-surface h-100 rtl-text d-flex flex-column"
};
const _hoisted_31 = {
  class: "d-flex justify-content-between text-muted ltr-text"
};
const _hoisted_32 = {
  key: 0,
  class: "saved-pill"
};
const _hoisted_33 = {
  class: "d-flex align-items-center"
};
const _hoisted_34 = {
  key: 0,
  class: "bi bi-check-circle-fill me-2 fs-5"
};
const _hoisted_35 = {
  key: 1,
  class: "bi bi-trash-fill me-2 fs-5"
};
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["aria-hidden"];
const _hoisted_38 = {
  class: "col-md-11"
};
const _hoisted_39 = {
  style: {
    "padding": "4px"
  }
};
const _hoisted_40 = ["innerHTML"];
const _hoisted_41 = ["innerHTML"];
const _hoisted_42 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_43 = ["onClick"];
const _hoisted_44 = ["onClick"];
const _hoisted_45 = {
  class: "col-md-1 text-center"
};
const _hoisted_46 = {
  class: "d-flex flex-column align-items-center"
};
const _hoisted_47 = ["onClick", "aria-label", "title"];
const _hoisted_48 = ["onClick", "title"];
const _hoisted_49 = ["aria-hidden"];
const _hoisted_50 = ["innerHTML"];
const _hoisted_51 = ["innerHTML"];
const _hoisted_52 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_53 = ["onClick"];
const _hoisted_54 = ["onClick"];
const _hoisted_55 = ["onClick", "aria-label", "title"];
const _hoisted_56 = {
  class: "row card-teal mb-3 py-2",
  style: {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "margin": "0 -5px"
  }
};
const _hoisted_57 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_58 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_59 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_60 = ["onClick"];
const _hoisted_61 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_62 = ["onClick", "aria-label", "title"];
const _hoisted_63 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_64 = ["onClick"];
const _hoisted_65 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_66 = ["onClick", "title"];
const _hoisted_67 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_68 = {
  key: 2,
  class: "empty-state text-center text-muted py-4"
};
const _hoisted_69 = {
  class: "modal fade",
  id: "ayahReflectionModal",
  tabindex: "-1",
  "aria-labelledby": "reflectionModalLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_70 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_71 = {
  class: "modal-content reflection-modal"
};
const _hoisted_72 = {
  class: "modal-header"
};
const _hoisted_73 = {
  class: "modal-body pt-0"
};
const _hoisted_74 = {
  key: 0,
  class: "reflection-success-banner reflection-success-top"
};
const _hoisted_75 = ["minlength"];
const _hoisted_76 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_77 = {
  class: "text-muted"
};
const _hoisted_78 = {
  class: "text-muted small"
};
const _hoisted_79 = {
  key: 1,
  class: "alert alert-info d-flex justify-content-between align-items-center small"
};
const _hoisted_80 = {
  class: "note-suggestions-header d-flex justify-content-between align-items-center mb-3"
};
const _hoisted_81 = {
  class: "suggestion-marquee-stack"
};
const _hoisted_82 = {
  class: "suggestion-marquee"
};
const _hoisted_83 = {
  class: "suggestion-track-group",
  "aria-hidden": false
};
const _hoisted_84 = ["onClick"];
const _hoisted_85 = {
  class: "lead"
};
const _hoisted_86 = {
  key: 2,
  class: "note-suggestions-collapsed d-flex justify-content-between align-items-center"
};
const _hoisted_87 = {
  key: 3,
  class: "alert alert-danger py-2 small"
};
const _hoisted_88 = {
  key: 4,
  class: "reflection-history reflection-history-card mt-4"
};
const _hoisted_89 = {
  class: "reflection-history-header"
};
const _hoisted_90 = {
  class: "reflection-history-count"
};
const _hoisted_91 = {
  class: "reflection-history-list"
};
const _hoisted_92 = {
  class: "reflection-history-subject"
};
const _hoisted_93 = {
  class: "reflection-history-message"
};
const _hoisted_94 = {
  class: "reflection-history-entry-actions"
};
const _hoisted_95 = ["onClick"];
const _hoisted_96 = ["onClick"];
const _hoisted_97 = {
  class: "modal-footer justify-content-end border-0 p-0 mt-2 gap-2 small-actions"
};
const _hoisted_98 = ["disabled"];
const _hoisted_99 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_100 = {
  key: 0,
  class: "audio-player-container"
};
const _hoisted_101 = {
  class: "custom-audio-player"
};
const _hoisted_102 = {
  class: "controls"
};
const _hoisted_103 = ["title"];
const _hoisted_104 = {
  class: "speed-indicator"
};
const _hoisted_105 = ["title", "aria-pressed"];
const _hoisted_106 = {
  key: 0,
  class: "volume-bar-container"
};
const _hoisted_107 = {
  class: "time",
  "aria-live": "polite"
};
const _hoisted_108 = ["aria-valuenow", "aria-valuetext"];
const _hoisted_109 = {
  class: "audio-visualizer",
  ref: "visualizer"
};
const _hoisted_110 = {
  class: "ayah-scrollbar",
  role: "group",
  "aria-label": "Surah verse navigator"
};
const _hoisted_111 = ["max", "value", "aria-valuemax", "aria-valuenow", "aria-valuetext"];
const _hoisted_112 = {
  class: "ayah-scrollbar-count"
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
  }, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold"
  }, "Quran Explorer"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead"
  }, " Explore the Quran in Arabic, accompanied by translations and recitations from world-renowned Qaris. Listen to beautiful recitations to deepen your understanding. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sticky-dropdown", {
      collapsed: !_ctx.isVisible
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      top: _ctx.isVisible ? '80px' : '60px'
    }),
    ref: "stickyDropdown"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"filter-title\" data-v-828f3036><span class=\"filter-icon\" data-v-828f3036><i class=\"fas fa-sliders-h\" aria-hidden=\"true\" data-v-828f3036></i></span><div data-v-828f3036><div class=\"filter-eyebrow\" data-v-828f3036>Filters</div><div class=\"filter-subtitle\" data-v-828f3036> Surah, reciter, and translation </div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "bookmark-cta-link",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onBookmarksLinkClick && $options.onBookmarksLinkClick(...args), ["prevent"]))
  }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-heart-fill me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View saved bookmarks ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/notes",
    class: "bookmark-cta-link notes-cta-link ms-3",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onNotesLinkClick && $options.onNotesLinkClick(...args), ["prevent"]))
  }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View notes & reflections ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "filter-toggle",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleVisibility && $options.toggleVisibility(...args)),
    "aria-expanded": _ctx.isVisible,
    "aria-controls": "surat-filters",
    "aria-label": _ctx.isVisible ? 'Hide filters' : 'Show filters'
  }, [_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_4)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_5))], 8 /* PROPS */, _hoisted_3)])]), _ctx.authAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-exclamation-circle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.authAlert), 1 /* TEXT */), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/login",
    class: "btn btn-sm btn-light auth-alert-link"
  }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "surah-select",
    class: "form-label mt-2"
  }, "Select Surah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "surah-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[4] || (_cache[4] = (...args) => $options.fetchSurahDetails && $options.fetchSurahDetails(...args))
  }, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a Surah", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.surahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: surah.number
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.name) + ") ", 9 /* TEXT, PROPS */, _hoisted_9);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "reciter-select",
    class: "form-label mt-2"
  }, "Select Reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "reciter-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.selectedReciter = $event)
  }, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_11);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "translation-select",
    class: "form-label mt-2"
  }, "Select Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "translation-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => _ctx.selectedTranslation = $event)
  }, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(`${translation.flag} ${translation.englishName} (${translation.language})`), 9 /* TEXT, PROPS */, _hoisted_13);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isVisible]])], 6 /* CLASS, STYLE */), _ctx.surahDetails ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-1 fw-semibold text-uppercase text-muted"
  }, "Now viewing", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, " Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahDetails.surahNumber) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahDetails.englishName || _ctx.surahDetails.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahDetails.ayahs ? _ctx.surahDetails.ayahs.length : $options.filteredAyahs.length) + " verses ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-primary btn-lg",
    disabled: !$options.canPlaySurah,
    onClick: _cache[7] || (_cache[7] = (...args) => $options.playSurahContinuously && $options.playSurahContinuously(...args)),
    "aria-label": "Play every ayah in this surah"
  }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-fill me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Play full surah ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: _ctx.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": _ctx.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[8] || (_cache[8] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    class: "next-step-toggle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", _ctx.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_21), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/history",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " Explore the Seerah timeline ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_25, [...(_cache[49] || (_cache[49] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently continue with the life of the Messenger who lived its message. Walk through a simple, welcoming ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/mission",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " Seerah timeline ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" to see the journey unfold. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_26, [...(_cache[50] || (_cache[50] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Explore Seerah ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-2"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]])])])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showNextStep]]), _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, "Loading Surah...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
        highlighted: _ctx.isHighlighted && _ctx.currentlyPlayingIndex === item.index,
        'currently-playing': _ctx.isAudioPlaying[item.index]
      }]),
      role: "listitem",
      id: `ayah-card-${item.index}`,
      onClick: $event => $options.selectCard(item.index),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer(item.index), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer(item.index), ["prevent"]), ["space"])],
      draggable: "true",
      onDragstart: $event => $options.onAyahDragStart(item.ayah, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah and Ayah Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "/images/art.png",
      width: "35px",
      alt: "Art Icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$surahDetails = _ctx.surahDetails) === null || _ctx$surahDetails === void 0 ? void 0 : _ctx$surahDetails.surahNumber) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.index + 1) + " ", 1 /* TEXT */), $options.isAyahSaved(item.ayah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_32, "Saved")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "feedback-fade"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => {
        var _ctx$surahDetails2, _ctx$surahDetails3, _ctx$surahDetails4, _ctx$surahDetails5, _ctx$surahDetails6;
        return [_ctx.feedbackMessages[$options.buildAyahKey((_ctx$surahDetails2 = _ctx.surahDetails) === null || _ctx$surahDetails2 === void 0 ? void 0 : _ctx$surahDetails2.surahNumber, item.ayah.numberInSurah || item.ayah.number)] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: 0,
          class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["me-3 badge rounded-pill shadow-lg border-0 px-4 py-2 fs-6 fw-bold feedback-badge", _ctx.feedbackMessages[$options.buildAyahKey((_ctx$surahDetails3 = _ctx.surahDetails) === null || _ctx$surahDetails3 === void 0 ? void 0 : _ctx$surahDetails3.surahNumber, item.ayah.numberInSurah || item.ayah.number)].class])
        }, [_ctx.feedbackMessages[$options.buildAyahKey((_ctx$surahDetails4 = _ctx.surahDetails) === null || _ctx$surahDetails4 === void 0 ? void 0 : _ctx$surahDetails4.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'check' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_34)) : _ctx.feedbackMessages[$options.buildAyahKey((_ctx$surahDetails5 = _ctx.surahDetails) === null || _ctx$surahDetails5 === void 0 ? void 0 : _ctx$surahDetails5.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'trash' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_35)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.feedbackMessages[$options.buildAyahKey((_ctx$surahDetails6 = _ctx.surahDetails) === null || _ctx$surahDetails6 === void 0 ? void 0 : _ctx$surahDetails6.surahNumber, item.ayah.numberInSurah || item.ayah.number)].text), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
      }),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "icon-btn ms-2",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openBookmarkModal(item.ayah), ["stop"]),
      title: "Save to folder / Organize",
      "aria-label": "Save to folder or organize bookmark"
    }, [...(_cache[54] || (_cache[54] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-folder-plus",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_36)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Desktop Layout: Icons on Left "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row d-none d-md-flex",
      role: "group",
      "aria-label": "Ayah controls (desktop)",
      "aria-hidden": _ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "arabic-text rtl-text fw-bold text-end mb-3",
      innerHTML: $options.highlightedText(item.ayah),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.arabicFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_40), _cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "pt-2 ltr-text hide-on-mobile-tablet ml-2"
    }, " Translation: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "fw-regular ltr-text flex-grow-1",
      innerHTML: $options.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_41), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[55] || (_cache[55] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah",
      title: "Share ayah"
    }, [...(_cache[56] || (_cache[56] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-send",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: $event => $options.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_47), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: _cache[9] || (_cache[9] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn mb-3", {
        'is-saved': $options.isAyahSaved(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleBookmark(item.ayah), ["stop"]),
      title: $options.isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Quick save bookmark'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $options.isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_48)])])], 8 /* PROPS */, _hoisted_37), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet Layout: Text then Icons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
    }, null, 12 /* STYLE, PROPS */, _hoisted_50), _cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2"
    }, " Translation: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "fw-regular ltr-text flex-grow-1",
      innerHTML: $options.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_51), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[59] || (_cache[59] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_53), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah",
      title: "Share ayah"
    }, [...(_cache[60] || (_cache[60] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-send",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_54), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["action-pill reflection-pill-fill", {
        'has-reflection': $options.hasReflection(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openReflectionModal(item.ayah), ["stop"]),
      "aria-label": $options.hasReflection(item.ayah) ? 'Edit reflection' : 'Add reflection',
      title: $options.hasReflection(item.ayah) ? 'Edit reflection' : 'Add reflection'
    }, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-text",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.hasReflection(item.ayah) ? 'Reflected' : 'Reflect'), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_55)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[10] || (_cache[10] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[63] || (_cache[63] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[11] || (_cache[11] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[64] || (_cache[64] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.rewindAudio(item.index),
      "aria-label": "Rewind 15 seconds",
      title: "Rewind"
    }, [...(_cache[65] || (_cache[65] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-backward-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_60)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      style: {
        "font-size": "1.8rem"
      },
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_62)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.fastForwardAudio(item.index),
      "aria-label": "Fast forward 20 seconds",
      title: "Fast Forward"
    }, [...(_cache[66] || (_cache[66] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-forward-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_64)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col text-center\" style=\"padding: 2px\">\n                                <button class=\"icon-btn reflection-btn\"\n                                    :class=\"{ 'has-reflection': hasReflection(item.ayah) }\"\n                                    @click.stop=\"openReflectionModal(item.ayah)\"\n                                    :aria-label=\"hasReflection(item.ayah)\n                                        ? 'Edit reflection'\n                                        : 'Add reflection'\"\n                                    :title=\"hasReflection(item.ayah)\n                                        ? 'Edit reflection'\n                                        : 'Add reflection'\">\n                                    <i class=\"bi bi-journal-text\" style=\"font-size: 1.6rem\" aria-hidden=\"true\"></i>\n                                </button>\n                            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn", {
        'is-saved': $options.isAyahSaved(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleBookmark(item.ayah), ["stop"]),
      title: $options.isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Quick save bookmark'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $options.isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill']),
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_66)])])], 8 /* PROPS */, _hoisted_49)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_29);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.bottomSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */)], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.screenReaderMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), !_ctx.isLoading && _ctx.surahDetails && $options.filteredAyahs.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_68, " No verses match your current search or filters. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: _ctx.activeAyah,
    onSaved: $options.onBookmarkSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notes & Reflections Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title",
    id: "reflectionModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Reflect and Save a Thought")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[12] || (_cache[12] = (...args) => $options.hideReflectionModal && $options.hideReflectionModal(...args)),
    "aria-label": "Close reflection modal"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reflection-intro"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reflection-intro-title"
  }, "Why reflections matter"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reflection-intro-copy"
  }, " Capturing what moves you about this verse keeps its guidance fresh, anchors your spiritual growth, and helps the community spot inspirations worth sharing. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex flex-column gap-3 mt-3",
    onSubmit: _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.submitReflectionForm && $options.submitReflectionForm(...args), ["prevent"])),
    novalidate: ""
  }, [_ctx.reflectionSuccessMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_74, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionSuccessMessage), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label fw-bold mb-1 medium-label"
  }, "Title", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => _ctx.reflectionForm.subject = $event),
    placeholder: "Give this reflection a guiding intention",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.reflectionForm.subject]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label fw-bold mb-1 medium-label"
  }, "Message", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => _ctx.reflectionForm.message = $event),
    rows: "5",
    minlength: _ctx.reflectionMessageMinLength,
    placeholder: "Type how this verse moved you today...",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_75), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.reflectionForm.message]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_77, "Message must be at least " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionMessageMinLength) + " characters.", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx.reflectionForm.message || '').trim().length) + " characters", 1 /* TEXT */)])]), _ctx.editingReflectionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_79, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Editing saved reflection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-link btn-sm text-decoration-underline p-0 small",
    onClick: _cache[15] || (_cache[15] = (...args) => $options.cancelReflectionEdit && $options.cancelReflectionEdit(...args))
  }, "Cancel edit")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["note-suggestions", {
      collapsed: _ctx.carouselCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-semibold text-dark me-2"
  }, "Message prompts"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "Tap to adapt")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-ghost p-0 small",
    onClick: _cache[16] || (_cache[16] = $event => _ctx.carouselCollapsed = !_ctx.carouselCollapsed)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.carouselCollapsed ? 'bi-chevron-up' : 'bi-chevron-down'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.carouselCollapsed ? 'show prompts' : 'collapse'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.reflectionMessagePromptRows, (rowPrompts, rowIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `row-${rowIndex}`,
      class: "suggestion-marquee-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["suggestion-track", {
        'is-paused': _ctx.carouselCollapsed
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.suggestionTrackStyle(rowIndex + 1))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(rowPrompts, (prompt, idx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        type: "button",
        class: "suggestion-pill light",
        key: `msg-${rowIndex}-${idx}`,
        onClick: $event => $options.applyMessageSuggestion(prompt.text)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_85, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.text), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_84);
    }), 128 /* KEYED_FRAGMENT */))])], 6 /* CLASS, STYLE */)])]);
  }), 128 /* KEYED_FRAGMENT */))])], 2 /* CLASS */), _ctx.carouselCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_86, [_cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted small"
  }, "Message prompts are hidden", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn note-suggestions-toggle p-0",
    onClick: _cache[17] || (_cache[17] = $event => _ctx.carouselCollapsed = false)
  }, [...(_cache[73] || (_cache[73] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-down me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Show prompts ", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.reflectionErrorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_87, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionErrorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.currentAyahReflections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reflection-history-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text me-1 reflection-title-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Saved reflections ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currentAyahReflections.length) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currentAyahReflections.length === 1 ? 'reflection' : 'reflections'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.currentAyahReflections, (note, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: note.id || index,
      class: "reflection-history-entry"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.subject || 'Untitled reflection'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_93, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.message), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn reflection-action edit-action",
      onClick: $event => $options.startEditingReflection(note, index)
    }, [...(_cache[76] || (_cache[76] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Edit", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_95), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn reflection-action delete-action",
      onClick: $event => $options.deleteReflection(note, index)
    }, [...(_cache[77] || (_cache[77] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_96)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-lg",
    onClick: _cache[18] || (_cache[18] = (...args) => $options.hideReflectionModal && $options.hideReflectionModal(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-lg btn-primary ms-2",
    disabled: !$options.canSubmitReflection || _ctx.isSavingReflection
  }, [_ctx.isSavingReflection ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_99)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save reflection ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_98)])], 32 /* NEED_HYDRATION */)])])])])])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Custom Audio Player "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showAudioPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[20] || (_cache[20] = $event => $options.rewindAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Rewind",
    "aria-label": "Rewind 15 seconds"
  }, [...(_cache[80] || (_cache[80] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[21] || (_cache[21] = $event => $options.toggleAudioPlayer(_ctx.currentlyPlayingIndex)),
    class: "control-btn play-pause",
    title: "Play/Pause",
    "aria-label": "Play or Pause"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isAudioPlaying[_ctx.currentlyPlayingIndex] ? 'bi bi-pause-fill' : 'bi bi-play-fill')
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[22] || (_cache[22] = $event => $options.fastForwardAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Fast Forward",
    "aria-label": "Fast forward 20 seconds"
  }, [...(_cache[81] || (_cache[81] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[23] || (_cache[23] = $event => $options.stopAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[82] || (_cache[82] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[24] || (_cache[24] = (...args) => $options.toggleVolume && $options.toggleVolume(...args)),
    class: "control-btn",
    title: "Volume",
    "aria-label": "Toggle volume slider"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${_ctx.volume > 0.5 ? 'up' : _ctx.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[25] || (_cache[25] = (...args) => $options.cyclePlaybackSpeed && $options.cyclePlaybackSpeed(...args)),
    class: "control-btn",
    title: 'Speed: ' + _ctx.playbackSpeed + 'x'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-speedometer2",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.playbackSpeed !== 1 ? '#ff6b6b' : '#ccc'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_104, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playbackSpeed) + "x", 1 /* TEXT */)], 8 /* PROPS */, _hoisted_103), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[26] || (_cache[26] = (...args) => $options.toggleRepeat && $options.toggleRepeat(...args)),
    class: "control-btn",
    title: _ctx.repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off',
    "aria-pressed": _ctx.repeatCurrent,
    "aria-label": "Toggle repeat current ayah"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.repeatCurrent ? '#00bfa6' : '#ccc'
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_105), _ctx.showVolumeBar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => _ctx.volume = $event),
    min: "0",
    max: "1",
    step: "0.1",
    onInput: _cache[28] || (_cache[28] = (...args) => $options.updateVolume && $options.updateVolume(...args)),
    class: "volume-slider"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.volume]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_ctx$audioElements$_c = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c === void 0 ? void 0 : _ctx$audioElements$_c.currentTime) || 0)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_ctx$audioElements$_c2 = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c2 === void 0 ? void 0 : _ctx$audioElements$_c2.duration) || 0)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[29] || (_cache[29] = (...args) => $options.closeAudioPlayer && $options.closeAudioPlayer(...args)),
    class: "control-btn",
    title: "Close",
    "aria-label": "Close player",
    style: {
      "margin-left": "auto"
    }
  }, [...(_cache[83] || (_cache[83] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg mb-2"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    role: "progressbar",
    "aria-label": "Audio playback progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": _ctx.progress[_ctx.currentlyPlayingIndex] || 0,
    "aria-valuetext": `Progress ${Math.round(_ctx.progress[_ctx.currentlyPlayingIndex] || 0)} percent`,
    onClick: _cache[30] || (_cache[30] = (...args) => $options.seekToPosition && $options.seekToPosition(...args)),
    onMousedown: _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onProgressDown && $options.onProgressDown(...args), ["prevent"])),
    onTouchstartPassive: _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onProgressDown && $options.onProgressDown(...args), ["prevent"])),
    ref: "progressBar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progress[_ctx.currentlyPlayingIndex] + '%'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visualizerBars, (bar, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "visualizer-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        height: bar + '%',
        animationDelay: index * 0.1 + 's'
      })
    }, null, 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_108), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [_cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ayah-scrollbar-label"
  }, "Ayah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "ayah-scrollbar-input",
    type: "range",
    min: "1",
    max: Math.max($options.totalItems, 1),
    value: _ctx.ayahScrubValue,
    onInput: _cache[33] || (_cache[33] = (...args) => $options.onAyahScrubInput && $options.onAyahScrubInput(...args)),
    onChange: _cache[34] || (_cache[34] = (...args) => $options.onAyahScrubChange && $options.onAyahScrubChange(...args)),
    "aria-valuemin": 1,
    "aria-valuemax": Math.max($options.totalItems, 1),
    "aria-valuenow": _ctx.ayahScrubValue,
    "aria-valuetext": `Ayah ${_ctx.ayahScrubValue} of ${Math.max($options.totalItems, 1)}`
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_111), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_112, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.ayahScrubValue) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.max($options.totalItems, 1)), 1 /* TEXT */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]))], 2 /* CLASS */);
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
  key: 1,
  class: "delete-confirm mb-3"
};
const _hoisted_15 = {
  class: "delete-title"
};
const _hoisted_16 = {
  class: "delete-actions"
};
const _hoisted_17 = {
  class: "row g-3"
};
const _hoisted_18 = {
  class: "col-12 col-md-6"
};
const _hoisted_19 = {
  class: "section-card h-100"
};
const _hoisted_20 = {
  class: "section-header"
};
const _hoisted_21 = {
  class: "section-actions"
};
const _hoisted_22 = {
  class: "section-hint"
};
const _hoisted_23 = ["aria-expanded"];
const _hoisted_24 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_25 = {
  key: 2,
  class: "folder-grid"
};
const _hoisted_26 = ["value", "disabled"];
const _hoisted_27 = {
  class: "pill-icon"
};
const _hoisted_28 = {
  key: 1,
  class: "fas fa-folder"
};
const _hoisted_29 = {
  class: "pill-meta"
};
const _hoisted_30 = {
  class: "pill-title"
};
const _hoisted_31 = {
  class: "pill-count"
};
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  class: "col-12 col-md-6"
};
const _hoisted_34 = {
  class: "section-card h-100"
};
const _hoisted_35 = {
  class: "section-header"
};
const _hoisted_36 = {
  class: "section-actions"
};
const _hoisted_37 = ["aria-expanded"];
const _hoisted_38 = {
  class: "row g-2 align-items-end"
};
const _hoisted_39 = {
  class: "col-12"
};
const _hoisted_40 = {
  class: "col-12"
};
const _hoisted_41 = {
  class: "icon-presets"
};
const _hoisted_42 = ["onClick"];
const _hoisted_43 = {
  class: "col-12"
};
const _hoisted_44 = {
  class: "color-swatches"
};
const _hoisted_45 = ["onClick"];
const _hoisted_46 = {
  class: "col-12"
};
const _hoisted_47 = ["disabled"];
const _hoisted_48 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_49 = {
  key: 2,
  class: "section-card mt-3"
};
const _hoisted_50 = {
  class: "section-header"
};
const _hoisted_51 = {
  class: "section-actions"
};
const _hoisted_52 = ["aria-expanded"];
const _hoisted_53 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_54 = {
  key: 1,
  class: "folder-contents"
};
const _hoisted_55 = {
  class: "folder-toggle"
};
const _hoisted_56 = ["onClick"];
const _hoisted_57 = {
  class: "folder-toggle-title"
};
const _hoisted_58 = {
  key: 0,
  class: "folder-badge"
};
const _hoisted_59 = {
  class: "folder-toggle-actions"
};
const _hoisted_60 = {
  class: "folder-toggle-meta"
};
const _hoisted_61 = ["disabled", "onClick"];
const _hoisted_62 = ["onClick"];
const _hoisted_63 = {
  key: 0,
  class: "folder-items"
};
const _hoisted_64 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_65 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_66 = {
  class: "folder-item-header"
};
const _hoisted_67 = {
  class: "folder-item-actions"
};
const _hoisted_68 = {
  class: "input-group input-group-sm move-group"
};
const _hoisted_69 = ["onChange", "disabled"];
const _hoisted_70 = ["value"];
const _hoisted_71 = ["disabled", "onClick"];
const _hoisted_72 = ["innerHTML"];
const _hoisted_73 = {
  key: 0,
  class: "folder-item-en"
};
const _hoisted_74 = {
  class: "modal-footer"
};
const _hoisted_75 = ["disabled"];
const _hoisted_76 = {
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
  }, "Save Ayah", -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
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
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedback), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pendingDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteTitle), 1 /* TEXT */), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "delete-note"
  }, "Ayat in this folder will also be deleted.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger btn-sm",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.confirmDelete && $options.confirmDelete(...args))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-folder-open"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Choose folders"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Select where this ayah will be saved.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount) + " selected", 1 /* TEXT */), $options.selectedCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link btn-clear",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearSelection && $options.clearSelection(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[3] || (_cache[3] = $event => $options.toggleSection('folders')),
    "aria-expanded": $data.sectionOpen.folders
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.folders ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_23)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.folders.length ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
    key: 0,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.folderSearch = $event),
    type: "search",
    class: "form-control form-control-sm folder-search",
    placeholder: "Search folders"
  }, null, 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.folderSearch, void 0, {
    trim: true
  }]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.filteredFolders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, "No folders yet. Create one below.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-pill', folder.color ? `pill-${folder.color}` : 'pill-neutral', {
        'is-selected': $data.selectedFolderIds.includes(folder.id),
        'is-disabled': folder.is_smart
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      value: folder.id,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.selectedFolderIds = $event),
      disabled: folder.is_smart
    }, null, 8 /* PROPS */, _hoisted_26), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.selectedFolderIds]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_28))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */)]), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "pill-check"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check"
    })], -1 /* CACHED */)), !folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "pill-delete",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.requestDeleteFolder(folder), ["stop", "prevent"]),
      title: "Delete folder"
    }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_32)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.folders]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Create new folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Start a fresh collection for your reflections.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Add a custom collection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[6] || (_cache[6] = $event => $options.toggleSection('create')),
    "aria-expanded": $data.sectionOpen.create
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.create ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_37)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection gems"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-preset-btn", {
        active: $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $options.setIcon(preset.icon)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_42);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
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
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_45);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-create",
    disabled: $data.isCreatingFolder,
    onClick: _cache[8] || (_cache[8] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreatingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_48)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create folder ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_47)])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.create]])])])]), $props.showFolderContents ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-list-check"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Folder contents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Preview what is inside each folder.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Review or remove saved ayat", -1 /* CACHED */)), $data.selectedFoldersForDelete.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-outline-danger btn-sm",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.requestDeleteSelectedFolders && $options.requestDeleteSelectedFolders(...args))
  }, " Delete selected (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFoldersForDelete.length) + ") ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[10] || (_cache[10] = $event => $options.toggleSection('contents')),
    "aria-expanded": $data.sectionOpen.contents
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.contents ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_52)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, "No folders to show yet.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    var _$data$folderContents, _$data$folderContents2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `contents-${folder.id}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-content', {
        open: $data.folderExpanded[folder.id]
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "folder-toggle-main",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_57, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "folder-toggle-icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-folder"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)]), folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_58, "Smart")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_56), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-danger",
      disabled: folder.is_smart,
      onClick: $event => $options.requestDeleteFolder(folder)
    }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-trash me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_61), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn folder-toggle-button",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.folderExpanded[folder.id] ? 'fa-chevron-up' : 'fa-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_62)])]), $data.folderExpanded[folder.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, [(_$data$folderContents = $data.folderContents[folder.id]) !== null && _$data$folderContents !== void 0 && _$data$folderContents.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, "Loading...")) : !((_$data$folderContents2 = $data.folderContents[folder.id]) !== null && _$data$folderContents2 !== void 0 && (_$data$folderContents2 = _$data$folderContents2.items) !== null && _$data$folderContents2 !== void 0 && _$data$folderContents2.length) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, " No ayat saved in this folder. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folderContents[folder.id].items, item => {
      var _item$ayah, _item$ayah2;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "folder-item",
        key: item.id
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name || 'Surah') + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.ayah_id) || item.ayah_number || item.ayah_num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        class: "form-select",
        onChange: $event => $options.moveAyahToFolder(item, folder, $event),
        disabled: folder.is_smart
      }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "",
        disabled: ""
      }, "Move to...", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargetFolders(folder), target => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: target.id,
          value: target.id
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(target.name), 9 /* TEXT, PROPS */, _hoisted_70);
      }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_69)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-danger",
        disabled: folder.is_smart,
        onClick: $event => $options.removeAyahFromFolder(item, folder)
      }, " Remove ", 8 /* PROPS */, _hoisted_71)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "folder-item-ar",
        innerHTML: item.ayah_verse_ar || ((_item$ayah2 = item.ayah) === null || _item$ayah2 === void 0 ? void 0 : _item$ayah2.ayah_text)
      }, null, 8 /* PROPS */, _hoisted_72), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.contents]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "btn btn-manage"
  }, "Open bookmarks", -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    "data-bs-dismiss": "modal"
  }, "Cancel", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-save",
    disabled: $data.isSaving,
    onClick: _cache[11] || (_cache[11] = (...args) => $options.saveBookmark && $options.saveBookmark(...args))
  }, [$data.isSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_76)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save bookmark ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_75)])])])])]);
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

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css ***!
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
/* harmony import */ var _SuratComponent_vue_vue_type_style_index_1_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css */ "./resources/js/components/SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_SuratComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SuratComponent_vue_vue_type_template_id_828f3036_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-828f3036"],['__file',"resources/js/components/SuratComponent.vue"]])
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

/***/ "./resources/js/components/SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_style_index_1_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=1&id=828f3036&scoped=true&lang=css");


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