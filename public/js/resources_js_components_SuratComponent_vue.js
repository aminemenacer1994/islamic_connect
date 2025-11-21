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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SuratComponent',
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
      arabicFontSize: 32,
      translationFontSize: 23,
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
      itemHeight: 320,
      windowSize: 22,
      buffer: 6,
      visibleStart: 0,
      visibleEnd: 0,
      listTop: 0,
      // Next-step card visibility
      showNextStep: true,
      nextStepMinimized: false
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
    searchQuery: function (val) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.debouncedQuery = val;
      }, 300);
    },
    selectedReciter: function (newVal) {
      if (newVal && !this.isLoading) {
        // scroll to top immediately on change
        try {
          window.scrollTo(0, 0);
        } catch (_) {}
        this.isLoading = true;
        this.savePreference("selectedReciter", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.$nextTick(() => {
            // removed programmatic scrolling and scrollbar helpers
          });
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    selectedTranslation: function (newVal) {
      if (newVal && !this.isLoading) {
        try {
          window.scrollTo(0, 0);
        } catch (_) {}
        this.isLoading = true;
        this.savePreference("selectedTranslation", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.isLoading = false;
          this.$nextTick(() => {
            // removed programmatic scrolling and scrollbar helpers
          });
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    selectedSurah: function (newVal) {
      if (newVal && !this.isLoading) {
        try {
          window.scrollTo(0, 0);
        } catch (_) {}
        this.isLoading = true;
        this.savePreference("selectedSurah", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.$nextTick(() => {
            // removed programmatic scrolling and scrollbar helpers
          });
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
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
    this.updateIsMobile();
    window.addEventListener('resize', this.updateIsMobile);
    // Restore dismissal state for next-step card
    try {
      if (localStorage.getItem('suratNextStepDismissed') === '1') this.showNextStep = false;
    } catch (_) {}
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
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('resize', this.updateIsMobile);
    window.removeEventListener('scroll', this.onScrollVirtual);
    window.removeEventListener('resize', this.computeListTop);
    window.removeEventListener('resize', this.calibrateItemHeight);
  },
  methods: {
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
          var _this$$toast;
          console.error(`Audio error for ayah ${index + 1}:`, e);
          clearTimeout(this.loadingTimers[index]);
          this.isAudioLoading[index] = false;
          this.isAudioPlaying[index] = false;
          (_this$$toast = this.$toast) === null || _this$$toast === void 0 || _this$$toast.error(`Failed to load audio for ayah ${index + 1}`);
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
      if (!this.debouncedQuery.trim() && !this.selectedTag) return text;
      let highlightedText = text;
      const escapeRegExp = string => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };
      const searchTerms = this.debouncedQuery.trim() ? this.debouncedQuery.trim().split(/\s+/) : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight-search">$1</span>');
      });
      const tagTerms = this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [];
      tagTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight-tag">$1</span>');
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
      const message = 'Surah ' + this.surahDetails.surahNumber + ' - ' + this.surahDetails.englishName + ' (Ayah ' + ayah.number + ')\n\n' + 'Arabic: ' + ayah.text + '\n\n' + 'Translation: ' + ayah.translation + '\n\n' + 'Listen here: ' + ayah.audio;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = 'https://api.whatsapp.com/send?text=' + encodedMessage;
      window.open(whatsappLink, "_blank");
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
        var _this$$toast2;
        console.error("Error fetching Translations:", error);
        this.translations = [];
        (_this$$toast2 = this.$toast) === null || _this$$toast2 === void 0 || _this$$toast2.error("Failed to load translations");
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
                  number: ayah.number,
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
              number: ayah.number,
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
  class: "container py-4",
  role: "main",
  "aria-label": "Quran Explorer"
};
const _hoisted_2 = {
  key: 0,
  class: "bi bi-x-lg mb-3",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  key: 1,
  class: "bi bi-plus-lg",
  "aria-hidden": "true"
};
const _hoisted_4 = {
  class: "row g-3"
};
const _hoisted_5 = {
  class: "col-12 col-md-4"
};
const _hoisted_6 = ["value"];
const _hoisted_7 = {
  class: "col-12 col-md-4"
};
const _hoisted_8 = ["value"];
const _hoisted_9 = {
  class: "col-12 col-md-4"
};
const _hoisted_10 = ["value"];
const _hoisted_11 = {
  style: {
    "padding": "10px"
  }
};
const _hoisted_12 = {
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
const _hoisted_13 = ["title", "aria-label"];
const _hoisted_14 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_15 = {
  style: {
    "flex": "1"
  }
};
const _hoisted_16 = {
  class: "mb-2",
  style: {
    "color": "#1f2933"
  }
};
const _hoisted_17 = {
  class: "mb-3",
  style: {
    "color": "#1f2933",
    "line-height": "1.8",
    "font-size": "1.1rem"
  }
};
const _hoisted_18 = {
  href: "/history",
  class: "btn btn-sm fw-semibold text-white px-3 py-2",
  style: {
    "background": "linear-gradient(135deg, #0b806f, #1a5f7a)",
    "border": "none",
    "border-radius": "999px",
    "box-shadow": "0 10px 20px rgba(26, 95, 122, 0.25)",
    "transition": "transform 0.2s ease, box-shadow 0.2s ease"
  },
  onmouseover: "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 28px rgba(26, 95, 122, 0.28)';",
  onmouseout: "this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.25)';"
};
const _hoisted_19 = {
  key: 0,
  class: "loading-placeholder"
};
const _hoisted_20 = {
  class: "row rtl-text",
  ref: "listContainer",
  role: "list",
  "aria-label": "Ayah cards list"
};
const _hoisted_21 = ["id", "onClick", "onKeydown"];
const _hoisted_22 = {
  class: "shadow-xl h-100 rtl-text d-flex flex-column",
  style: {
    "border-top-left-radius": "25px",
    "border-top-right-radius": "25px",
    "border-bottom-left-radius": "20px",
    "border-bottom-right-radius": "20px",
    "display": "flex",
    "flex-direction": "column",
    "height": "100%"
  }
};
const _hoisted_23 = {
  class: "d-flex justify-content-between text-muted ltr-text"
};
const _hoisted_24 = ["aria-hidden"];
const _hoisted_25 = {
  class: "col-md-11"
};
const _hoisted_26 = {
  style: {
    "padding": "4px"
  }
};
const _hoisted_27 = ["innerHTML"];
const _hoisted_28 = ["innerHTML"];
const _hoisted_29 = {
  class: "col-md-1 text-center"
};
const _hoisted_30 = {
  class: "d-flex flex-column align-items-center"
};
const _hoisted_31 = ["onClick", "aria-label", "title"];
const _hoisted_32 = ["aria-hidden"];
const _hoisted_33 = ["innerHTML"];
const _hoisted_34 = ["innerHTML"];
const _hoisted_35 = {
  class: "row card-teal mb-3",
  style: {
    "display": "flex",
    "justify-content": "center",
    "margin": "0 -5px"
  }
};
const _hoisted_36 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_37 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_38 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_39 = ["onClick"];
const _hoisted_40 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_41 = ["onClick", "aria-label", "title"];
const _hoisted_42 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_43 = ["onClick"];
const _hoisted_44 = {
  class: "col-2 text-center",
  style: {
    "padding": "3px"
  }
};
const _hoisted_45 = ["onClick"];
const _hoisted_46 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_47 = {
  key: 1,
  class: "empty-state text-center text-muted py-4"
};
const _hoisted_48 = {
  key: 2,
  class: "audio-player-container"
};
const _hoisted_49 = {
  class: "custom-audio-player"
};
const _hoisted_50 = {
  class: "controls"
};
const _hoisted_51 = ["title"];
const _hoisted_52 = {
  class: "speed-indicator"
};
const _hoisted_53 = ["title", "aria-pressed"];
const _hoisted_54 = {
  key: 0,
  class: "volume-bar-container"
};
const _hoisted_55 = {
  class: "time",
  "aria-live": "polite"
};
const _hoisted_56 = ["aria-valuenow", "aria-valuetext"];
const _hoisted_57 = {
  class: "audio-visualizer",
  ref: "visualizer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$audioElements$_c, _ctx$audioElements$_c2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold"
  }, "Quran Explorer"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead"
  }, " Explore the Quran in Arabic, accompanied by translations and recitations from world-renowned Qaris. Listen to beautiful recitations to deepen your understanding. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sticky Dropdowns Container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sticky-dropdown card-teal", {
      collapsed: !_ctx.isVisible
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      top: _ctx.isVisible ? '80px' : '60px'
    }),
    ref: "stickyDropdown"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Existing template for surah, reciter, and translation selection "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleVisibility && $options.toggleVisibility(...args)),
    class: "text-white mb-3",
    style: {
      "cursor": "pointer"
    },
    "aria-label": "Toggle filters visibility",
    role: "button",
    tabindex: "0",
    onKeydown: [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleVisibility && $options.toggleVisibility(...args), ["prevent"]), ["enter"])), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleVisibility && $options.toggleVisibility(...args), ["prevent"]), ["space"]))]
  }, [_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_2)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_3))], 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "surah-select",
    class: "form-label text-white mt-2"
  }, "Select Surah:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "surah-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[4] || (_cache[4] = (...args) => $options.fetchSurahDetails && $options.fetchSurahDetails(...args))
  }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a Surah", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.surahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: surah.number
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.name) + ") ", 9 /* TEXT, PROPS */, _hoisted_6);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "reciter-select",
    class: "form-label text-white mt-2"
  }, "Select Reciter:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "reciter-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.selectedReciter = $event)
  }, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "translation-select",
    class: "form-label text-white mt-2"
  }, "Select Translation:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "translation-select",
    class: "form-select shadow-sm",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => _ctx.selectedTranslation = $event)
  }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(`${translation.flag} ${translation.englishName} (${translation.language})`), 9 /* TEXT, PROPS */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isVisible]])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: _ctx.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": _ctx.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
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
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", _ctx.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle",
    style: {
      "width": "46px",
      "height": "46px",
      "border-radius": "50%",
      "background": "rgba(11, 128, 111, 0.20)",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "color": "#0b806f",
      "font-size": "1.35rem",
      "box-shadow": "inset 0 0 0 1px rgba(11, 128, 111, 0.26), 0 6px 14px rgba(26,95,122,0.10)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase",
    style: {
      "letter-spacing": "0.1em",
      "color": "#1a5f7a",
      "font-size": "0.78rem"
    }
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/history",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "#0b806f"
    }
  }, " Explore Qur’an history ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-1",
    style: {
      "color": "#0b806f"
    }
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" If you feel ready to move from listening to learning? Explore key milestones, preservation efforts, and scholars in ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/history",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "#0b806f"
    }
  }, " the history of the Qur’an ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" to deepen your understanding. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_18, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Explore History ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-2"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]])])])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showNextStep]]), _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, "Loading Surah...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer(item.index), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer(item.index), ["prevent"]), ["space"])]
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah and Ayah Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "/images/art.png",
      width: "35px",
      alt: "Art Icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$surahDetails = _ctx.surahDetails) === null || _ctx$surahDetails === void 0 ? void 0 : _ctx$surahDetails.surahNumber) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.index + 1), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Desktop Layout: Icons on Left "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row d-none d-md-flex",
      role: "group",
      "aria-label": "Ayah controls (desktop)",
      "aria-hidden": _ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "arabic-text rtl-text fw-bold text-end mb-3",
      innerHTML: $options.highlightedText(item.ayah),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.arabicFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_27), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "pt-2 ltr-text hide-on-mobile-tablet ml-2"
    }, "Translation:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "fw-regular ltr-text flex-grow-1",
      innerHTML: $options.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_28)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: $event => $options.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: _cache[8] || (_cache[8] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: _cache[9] || (_cache[9] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: _cache[10] || (_cache[10] = $event => $options.shareOnWhatsApp(_ctx.ayah)),
      "aria-label": "Share on WhatsApp",
      title: "Share on WhatsApp"
    }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])])])], 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet Layout: Text then Icons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
    }, null, 12 /* STYLE, PROPS */, _hoisted_33), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2"
    }, "Translation:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "fw-regular ltr-text flex-grow-1",
      innerHTML: $options.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_34)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[11] || (_cache[11] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[43] || (_cache[43] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[12] || (_cache[12] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.rewindAudio(item.index),
      "aria-label": "Rewind 15 seconds",
      title: "Rewind"
    }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-backward-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_39)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
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
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_41)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.fastForwardAudio(item.index),
      "aria-label": "Fast forward 20 seconds",
      title: "Fast Forward"
    }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-forward-circle-fill",
      style: {
        "font-size": "1.7rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_43)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => $options.shareOnWhatsApp(item.ayah),
      "aria-label": "Share on WhatsApp",
      title: "Share on WhatsApp"
    }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share-fill",
      style: {
        "font-size": "1.5rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_45)])])], 8 /* PROPS */, _hoisted_32)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_21);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.bottomSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */)], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.screenReaderMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), !_ctx.isLoading && _ctx.surahDetails && $options.filteredAyahs.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_47, " No verses match your current search or filters. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Custom Audio Player "), _ctx.showAudioPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[13] || (_cache[13] = $event => $options.rewindAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Rewind",
    "aria-label": "Rewind 15 seconds"
  }, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[14] || (_cache[14] = $event => $options.toggleAudioPlayer(_ctx.currentlyPlayingIndex)),
    class: "control-btn play-pause",
    title: "Play/Pause",
    "aria-label": "Play or Pause"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isAudioPlaying[_ctx.currentlyPlayingIndex] ? 'bi bi-pause-fill' : 'bi bi-play-fill')
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[15] || (_cache[15] = $event => $options.fastForwardAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Fast Forward",
    "aria-label": "Fast forward 20 seconds"
  }, [...(_cache[49] || (_cache[49] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[16] || (_cache[16] = $event => $options.stopAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[50] || (_cache[50] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[17] || (_cache[17] = (...args) => $options.toggleVolume && $options.toggleVolume(...args)),
    class: "control-btn",
    title: "Volume",
    "aria-label": "Toggle volume slider"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${_ctx.volume > 0.5 ? 'up' : _ctx.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[18] || (_cache[18] = (...args) => $options.cyclePlaybackSpeed && $options.cyclePlaybackSpeed(...args)),
    class: "control-btn",
    title: 'Speed: ' + _ctx.playbackSpeed + 'x'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-speedometer2",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.playbackSpeed !== 1 ? '#ff6b6b' : '#ccc'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playbackSpeed) + "x", 1 /* TEXT */)], 8 /* PROPS */, _hoisted_51), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[19] || (_cache[19] = (...args) => $options.toggleRepeat && $options.toggleRepeat(...args)),
    class: "control-btn",
    title: _ctx.repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off',
    "aria-pressed": _ctx.repeatCurrent,
    "aria-label": "Toggle repeat current ayah"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.repeatCurrent ? '#00bfa6' : '#ccc'
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_53), _ctx.showVolumeBar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => _ctx.volume = $event),
    min: "0",
    max: "1",
    step: "0.1",
    onInput: _cache[21] || (_cache[21] = (...args) => $options.updateVolume && $options.updateVolume(...args)),
    class: "volume-slider"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.volume]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_ctx$audioElements$_c = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c === void 0 ? void 0 : _ctx$audioElements$_c.currentTime) || 0)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_ctx$audioElements$_c2 = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c2 === void 0 ? void 0 : _ctx$audioElements$_c2.duration) || 0)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[22] || (_cache[22] = (...args) => $options.closeAudioPlayer && $options.closeAudioPlayer(...args)),
    class: "control-btn",
    title: "Close",
    "aria-label": "Close player",
    style: {
      "margin-left": "auto"
    }
  }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg mb-2"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    role: "progressbar",
    "aria-label": "Audio playback progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": _ctx.progress[_ctx.currentlyPlayingIndex] || 0,
    "aria-valuetext": `Progress ${Math.round(_ctx.progress[_ctx.currentlyPlayingIndex] || 0)} percent`,
    onClick: _cache[23] || (_cache[23] = (...args) => $options.seekToPosition && $options.seekToPosition(...args)),
    onMousedown: _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onProgressDown && $options.onProgressDown(...args), ["prevent"])),
    onTouchstartPassive: _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.onProgressDown && $options.onProgressDown(...args), ["prevent"])),
    ref: "progressBar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progress[_ctx.currentlyPlayingIndex] + '%'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visualizerBars, (bar, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "visualizer-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        height: bar + '%',
        animationDelay: index * 0.1 + 's'
      })
    }, null, 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_56)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card-teal[data-v-828f3036] {\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 166, 0.22);\n  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);\n  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card-teal[data-v-828f3036]:hover { \n  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12);\n}\n/* Consolidated base rules */\n.container[data-v-828f3036] { min-height: 100vh;\n}\n.ayah-card-container[data-v-828f3036] { transition: all 0.3s ease;\n}\n.highlighted[data-v-828f3036] {\n  background-color: #b5e6db;\n  border-radius: 8px;\n  animation: pulse-828f3036 0.5s ease-in-out;\n}\n.currently-playing[data-v-828f3036] {\n  background-color: #00bfa640;\n  border: 2px solid #00bfa640;\n  border-radius: 8px;\n  box-shadow: 0 0 15px rgba(40, 167, 69, 0.3);\n  transform: scale(1.02);\n  transition: all 0.3s ease;\n}\n@keyframes pulse-828f3036 {\n0% {\n    border: 2px solid #00bfa6;\n}\n100% {\n    border: 2px solid transparent;\n}\n}\n.rtl-text[data-v-828f3036] {\n  direction: rtl;\n}\n.ltr-text[data-v-828f3036] {\n  direction: ltr;\n}\n.sticky-dropdown[data-v-828f3036] {\n  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);\n  position: sticky;\n  z-index: 1000;\n  padding: 10px 12px;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  overflow: hidden;\n  max-height: 500px; /* expanded */\n}\n.sticky-dropdown.collapsed[data-v-828f3036] {\n  padding-top: 6px;\n  padding-bottom: 6px;\n  max-height: 40px;\n  margin-bottom: 0.5rem;\n  /* fully hide any children besides the toggle icon */\n  overflow: hidden;\n}\n/* Belt-and-suspenders: force inner content hidden when collapsed */\n.sticky-dropdown.collapsed .row[data-v-828f3036],\n.sticky-dropdown.collapsed .form-label[data-v-828f3036],\n.sticky-dropdown.collapsed .form-select[data-v-828f3036] {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  height: 0 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n@media (max-width: 768px) {\n.container[data-v-828f3036] {\n    padding-bottom: calc(100px + env(safe-area-inset-bottom));\n}\n}\n.audio-player-container[data-v-828f3036] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1001;\n  background-color: rgba(25, 27, 31, 0.92);\n  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);\n  border-radius: 15px 15px 0 0;\n  padding: 10px;\n  transition: transform 0.3s ease-in-out;\n}\n.container[data-v-828f3036] {\n  padding-bottom: calc(120px + env(safe-area-inset-bottom));\n}\n.custom-audio-player[data-v-828f3036] {\n  display: flex;\n  flex-direction: column;\n  color: white;\n  padding: 6px 12px;\n}\n.controls[data-v-828f3036] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-bottom: 10px;\n}\n/* Align close button to the end on wider screens */\n.controls .control-btn[title=\"Close\"][data-v-828f3036] { margin-left: auto;\n}\n@media (max-width: 768px) {\n.controls .control-btn[title=\"Close\"][data-v-828f3036] {\n    margin-left: 0;\n    /* Remove the margin-left: auto to align with other buttons */\n}\n.time[data-v-828f3036] {\n    font-size: 0.8rem !important;\n    min-width: 100px;\n    text-align: center;\n}\n.volume-bar-container[data-v-828f3036] {\n    position: fixed;\n    bottom: 100%;\n    left: 0;\n    width: 100%;\n    background-color: rgba(33, 33, 33, 0.95);\n    padding: 10px;\n    border-radius: 15px 15px 0 0;\n}\n.volume-slider[data-v-828f3036] {\n    width: 100%;\n}\n}\n.control-btn[data-v-828f3036] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 1.75rem;\n  cursor: pointer;\n  \n  transition: color 0.2s, transform 0.18s ease, background-color 0.18s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.control-btn[data-v-828f3036]:hover {\n  color: #00bfa6;\n  background-color: rgba(255, 255, 255, 0.06);\n  transform: translateY(-1px);\n}\n.icon-btn[data-v-828f3036] {\n  background: none;\n  border: none;\n  color: inherit;\n  padding: 0;\n  cursor: pointer;\n}\n/* Increase icon sizes for per-ayah actions (desktop) */\n.ayah-card-container .icon-btn i[data-v-828f3036] {\n  font-size: 1.6rem;\n}\n/* Make sticky toggle icon a bit larger */\n.sticky-dropdown>span i[data-v-828f3036] {\n  font-size: 1.2rem;\n  padding-bottom: 5px;\n}\n.progress-bar[data-v-828f3036] {\n  width: 100%;\n  height: 8px;\n  background-color: rgba(255, 255, 255, 0.18);\n  border-radius: 4px;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative;\n  transition: background-color 0.2s ease;\n}\n.progress-bar[data-v-828f3036]:active { cursor: ew-resize;\n}\n.progress-bar[data-v-828f3036]:hover {\n  background-color: rgba(255, 255, 255, 0.3);\n}\n.progress[data-v-828f3036] {\n  height: 100%;\n  background: linear-gradient(90deg, #00bfa6, #5fd4c4);\n  transition: width 0.1s linear;\n}\n/* Progress handle (visual affordance) */\n.progress[data-v-828f3036]::after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  right: -6px;\n  width: 12px;\n  height: 12px;\n  transform: translateY(-50%);\n  background: #ffffff;\n  border-radius: 50%;\n  border: 2px solid #00bfa6;\n  box-shadow: 0 2px 6px rgba(0,0,0,0.2);\n  opacity: 0.85;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.progress-bar:hover .progress[data-v-828f3036]::after,\n.progress-bar:focus-within .progress[data-v-828f3036]::after {\n  transform: translateY(-50%) scale(1.05);\n  box-shadow: 0 3px 10px rgba(0,0,0,0.25);\n}\n.volume-slider[data-v-828f3036] {\n  width: 100px;\n  height: 4px;\n}\n/* removed scroll-margin to avoid scroll coupling */\n.ayah-card[data-v-828f3036] {\n  padding: 15px;\n  margin-bottom: 1rem;\n  border-radius: 10px;\n  background-color: var(--bs-body-bg);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  transition: box-shadow 0.18s ease, transform 0.18s ease, border-color 0.18s ease;\n  animation: fadeInUp-828f3036 0.4s ease both;\n}\n.ayah-card[data-v-828f3036]:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);\n  transform: translateY(-2px);\n  border-color: rgba(0, 0, 0, 0.06);\n}\n@media (max-width: 768px) {\n.ayah-card[data-v-828f3036] {\n    padding: 10px;\n}\n.arabic-text[data-v-828f3036] {\n    font-size: 1.7rem !important;\n    /* line-height: 5.8vh; */\n}\n.translation-text[data-v-828f3036] {\n    font-size: 0.9rem !important;\n    /* line-height: 1.6; */\n}\n.mobile-controls[data-v-828f3036] {\n    display: flex;\n    justify-content: center;\n    gap: 15px;\n    margin-top: 10px;\n}\n.mobile-controls .control-btn[data-v-828f3036] {\n    font-size: 1.3rem;\n}\n}\n@media (max-width: 576px) {\n.display-5[data-v-828f3036] {\n    font-size: 1.8rem;\n}\n.lead[data-v-828f3036] {\n    font-size: 1rem;\n}\nh4[data-v-828f3036] {\n    font-size: 1.1rem;\n}\n}\n/* Mobile compact filters: 2-row grid (more efficient than stacked) */\n@media (max-width: 576px) {\n.sticky-dropdown[data-v-828f3036] {\n    padding: 6px 8px !important;\n    border-radius: 12px;\n}\n\n  /* Grid layout: Surah full width, Reciter + Translation side by side */\n.sticky-dropdown .row.g-3[data-v-828f3036] {\n    display: grid !important;\n    grid-template-columns: 3fr 2fr; /* Reciter wider (60/40) */\n    grid-auto-rows: minmax(40px, auto);\n    gap: 6px !important;\n}\n.sticky-dropdown .row.g-3 > .col-12[data-v-828f3036],\n  .sticky-dropdown .row.g-3 > .col-12.col-md-4[data-v-828f3036] {\n    margin-top: 0 !important;\n}\n  /* First block (Surah) spans two columns */\n.sticky-dropdown .row.g-3 > .col-12.col-md-4[data-v-828f3036]:first-child {\n    grid-column: 1 / -1;\n}\n  /* Ensure 2nd (Reciter) and 3rd (Translation) sit left/right respectively */\n.sticky-dropdown .row.g-3 > .col-12.col-md-4[data-v-828f3036]:nth-child(2) { grid-column: 1;\n}\n.sticky-dropdown .row.g-3 > .col-12.col-md-4[data-v-828f3036]:nth-child(3) { grid-column: 2;\n}\n\n  /* Labels: small but visible to preserve clarity */\n.sticky-dropdown label.form-label[data-v-828f3036] {\n    font-size: 0.78rem;\n    margin-bottom: 2px;\n    opacity: 0.85;\n}\n\n  /* Compact select appearance */\n.sticky-dropdown .form-select[data-v-828f3036] {\n    font-size: 0.9rem !important;\n    padding: 8px 10px !important;\n    height: 40px !important;\n    border-radius: 10px !important;\n    background-color: rgba(255, 255, 255, 0.1);\n}\n}\n@media (prefers-color-scheme: dark) {\n.ayah-card[data-v-828f3036] {\n    background-color: rgba(255, 255, 255, 0.05);\n    border-color: rgba(255, 255, 255, 0.06);\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);\n}\n.sticky-dropdown[data-v-828f3036] {\n    background-color: rgba(34, 38, 43, 0.9);\n    backdrop-filter: saturate(120%) blur(6px);\n}\n}\n@media (hover: none) {\n.control-btn[data-v-828f3036] {\n    padding: 12px;\n    margin: 0 5px;\n}\n.control-btn[data-v-828f3036]:active {\n    transform: scale(0.95);\n}\n}\n.loading-placeholder[data-v-828f3036] {\n  text-align: center;\n  padding: 20px;\n  font-size: 1.2rem;\n  background: linear-gradient(90deg, #f7f7f7 25%, #ececec 50%, #f7f7f7 75%);\n  background-size: 200% 100%;\n  animation: loading-828f3036 1.5s infinite;\n}\n.empty-state[data-v-828f3036] {\n  border: 1px dashed rgba(0, 0, 0, 0.15);\n  border-radius: 8px;\n}\n@keyframes loading-828f3036 {\n0% {\n    background-position: 200% 0;\n}\n100% {\n    background-position: -200% 0;\n}\n}\n@media (max-width: 991px) {\n.hide-on-mobile-tablet[data-v-828f3036] {\n    display: none;\n}\n}\n/* Mobile icon sizing overrides */\n@media (max-width: 768px) {\n.control-btn[data-v-828f3036] {\n    font-size: 2rem;\n}\n.ayah-card-container .icon-btn i[data-v-828f3036] {\n    font-size: 1.8rem;\n}\n}\n.highlighted-word[data-v-828f3036] {\n  background: #0b5d4b;\n  color: #fff;\n  border-radius: 4px;\n  padding: 0 2px;\n  box-shadow: 0 1px 0 rgba(11, 93, 75, 0.2);\n  transition: background 0.2s, box-shadow 0.2s;\n}\n/* Audio Visualizer Styles */\n.audio-visualizer[data-v-828f3036] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-around;\n  padding: 0 2px;\n  opacity: 0.7;\n  pointer-events: none;\n}\n.visualizer-bar[data-v-828f3036] {\n  width: 2px;\n  background: linear-gradient(to top, #00bfa6, #87ceeb);\n  border-radius: 1px;\n  animation: pulse-visualizer-828f3036 0.6s ease-in-out infinite alternate;\n}\n@keyframes pulse-visualizer-828f3036 {\n0% {\n    opacity: 0.4;\n}\n100% {\n    opacity: 1;\n}\n}\n/* Speed Indicator */\n.speed-indicator[data-v-828f3036] {\n  font-size: 0.7rem;\n  font-weight: bold;\n  margin-left: 2px;\n  color: #ff6b6b;\n}\n/* Enhanced Control Buttons */\n.control-btn[data-v-828f3036] {\n  transition: all 0.3s ease;\n  border-radius: 8px;\n}\n.control-btn[data-v-828f3036]:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n  transform: translateY(-2px);\n}\n.control-btn[data-v-828f3036]:active {\n  transform: translateY(0);\n}\n/* Responsive Adjustments */\n@media (max-width: 768px) {\n.speed-indicator[data-v-828f3036] {\n    font-size: 0.6rem;\n}\n.visualizer-bar[data-v-828f3036] {\n    width: 1px;\n}\n.audio-visualizer[data-v-828f3036] {\n    padding: 0 1px;\n}\n}\n/* Next Step card background (gradient + blur) */\n.next-step-card[data-v-828f3036] {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid rgba(11, 128, 111, 0.25);\n  border-radius: 16px;\n  box-shadow: 0 12px 32px rgba(26, 95, 122, 0.12);\n}\n.next-step-card[data-v-828f3036]::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background: #f2fbf9;\n  background: linear-gradient(135deg, rgba(26, 95, 122, 0.22), rgba(11, 128, 111, 0.22));\n  backdrop-filter: blur(6px);\n  z-index: 0;\n}\n.next-step-card[data-v-828f3036]>* {\n  position: relative;\n  z-index: 1;\n}\n/* Theme tokens (scoped to this component container) */\n.container[data-v-828f3036] {\n  --ic-primary: #0b806f;\n  --ic-secondary: #1a5f7a;\n  --ic-accent: #00bfa6;\n  --ic-bg-elev: #ffffff;\n  --ic-text-muted: #35424c;\n  --ic-border: rgba(0, 0, 0, 0.08);\n  --ic-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);\n}\n/* Palette variants: apply alongside `.container` (CSS-only) */\n.container.theme-sand[data-v-828f3036] {\n  --ic-primary: #a06927;\n  --ic-secondary: #7a5130;\n  --ic-accent: #f0b35a;\n  --ic-bg-elev: #fffaf3;\n  --ic-text-muted: #463f3a;\n  --ic-border: rgba(160, 105, 39, 0.18);\n  --ic-shadow: 0 8px 22px rgba(160, 105, 39, 0.12);\n}\n.container.theme-rose[data-v-828f3036] {\n  --ic-primary: #b3547a;\n  --ic-secondary: #7a3a59;\n  --ic-accent: #ff80a6;\n  --ic-bg-elev: #fff6f9;\n  --ic-text-muted: #49313e;\n  --ic-border: rgba(179, 84, 122, 0.18);\n  --ic-shadow: 0 8px 22px rgba(179, 84, 122, 0.12);\n}\n.container.theme-ink[data-v-828f3036] {\n  --ic-primary: #1e293b;\n  --ic-secondary: #0f172a;\n  --ic-accent: #60a5fa;\n  --ic-bg-elev: #0b1220;\n  --ic-text-muted: #cbd5e1;\n  --ic-border: rgba(96, 165, 250, 0.2);\n  --ic-shadow: 0 10px 26px rgba(2, 6, 23, 0.45);\n}\n/* Density presets: add to `.container` */\n.container.density-compact[data-v-828f3036] {\n  --ic-space-y: 0.65rem;\n}\n.container.density-comfortable[data-v-828f3036] {\n  --ic-space-y: 1rem;\n}\n.container.density-spacious[data-v-828f3036] {\n  --ic-space-y: 1.35rem;\n}\n/* Wire density to components */\n.container.density-compact .ayah-card[data-v-828f3036] { padding: 10px; margin-bottom: var(--ic-space-y, 0.65rem);\n}\n.container.density-comfortable .ayah-card[data-v-828f3036] { padding: 14px; margin-bottom: var(--ic-space-y, 1rem);\n}\n.container.density-spacious .ayah-card[data-v-828f3036] { padding: 18px; margin-bottom: var(--ic-space-y, 1.35rem);\n}\n/* Minimal style variant: reduce shadows and borders */\n.container.style-minimal .ayah-card[data-v-828f3036] {\n  box-shadow: none;\n  border: 1px solid var(--ic-border);\n}\n.container.style-minimal .audio-player-container[data-v-828f3036] {\n  box-shadow: none;\n  background-color: rgba(25, 27, 31, 0.88);\n}\n.container.style-minimal .sticky-dropdown[data-v-828f3036] {\n  box-shadow: 0 2px 12px rgba(0,0,0,0.1);\n  border: 1px solid rgba(255,255,255,0.08);\n}\n.container.style-minimal .icon-btn[data-v-828f3036]:hover,\n.container.style-minimal .control-btn[data-v-828f3036]:hover { transform: none; box-shadow: none;\n}\n/* Typography finesse */\n.container[data-v-828f3036] {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.container[data-v-828f3036] ::-moz-selection {\n  background: rgba(0, 191, 166, 0.2);\n}\n.container[data-v-828f3036] ::selection {\n  background: rgba(0, 191, 166, 0.2);\n}\n.lead[data-v-828f3036] { color: var(--ic-text-muted);\n}\nh1.display-5[data-v-828f3036] { letter-spacing: -0.01em;\n}\n/* Arabic/translation rhythm and contrast */\n.arabic-text[data-v-828f3036] { color: #0a2e2a; line-height: 1.9;\n}\n.translation-text[data-v-828f3036] { color: #334155; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 8px;\n}\n@media (prefers-color-scheme: dark) {\n.translation-text[data-v-828f3036] { border-top-color: rgba(255,255,255,0.12);\n}\n}\n/* Focus-visible states */\n.control-btn[data-v-828f3036]:focus-visible,\n.icon-btn[data-v-828f3036]:focus-visible,\n.sticky-dropdown .form-select[data-v-828f3036]:focus-visible,\n.sticky-dropdown > span[data-v-828f3036]:focus-visible {\n  outline: 2px solid var(--ic-accent);\n  outline-offset: 2px;\n  border-radius: 10px;\n}\n/* Sticky toggle affordance */\n.sticky-dropdown > span[data-v-828f3036] {\n  padding: 6px;\n  border-radius: 10px;\n  transition: background-color 0.15s ease, box-shadow 0.15s ease;\n}\n.sticky-dropdown > span[data-v-828f3036]:hover { background-color: rgba(255,255,255,0.08);\n}\n.sticky-dropdown > span[data-v-828f3036]:focus-visible { box-shadow: 0 0 0 0.15rem rgba(0,191,166,0.25);\n}\n/* Enhanced selects without markup change */\n.sticky-dropdown .form-select[data-v-828f3036] {\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  background-color: rgba(255, 255, 255, 0.08);\n  color: #e9f2f3;\n  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;\n}\n.sticky-dropdown .form-select[data-v-828f3036]:focus {\n  border-color: #7fd6c9;\n  background-color: rgba(255, 255, 255, 0.12);\n  box-shadow: 0 0 0 0.15rem rgba(0, 191, 166, 0.25);\n}\n/* Per-ayah action icons polish */\n.ayah-card-container .icon-btn[data-v-828f3036] {\n  border-radius: 8px;\n  padding: 6px;\n  transition: background-color 0.18s ease, transform 0.18s ease;\n}\n.ayah-card-container .icon-btn[data-v-828f3036]:hover {\n  background-color: rgba(11, 128, 111, 0.08);\n  transform: translateY(-1px);\n}\n/* Entrance motion for ayah cards */\n@keyframes fadeInUp-828f3036 {\nfrom { opacity: 0; transform: translateY(6px);\n}\nto   { opacity: 1; transform: translateY(0);\n}\n}\n/* Density presets: add `density-compact` to `.container` to activate */\n.density-compact .ayah-card[data-v-828f3036] { padding: 10px; margin-bottom: 0.65rem;\n}\n.density-compact .controls[data-v-828f3036] { gap: 8px;\n}\n.density-compact .arabic-text[data-v-828f3036] { font-size: 0.95em;\n}\n.density-compact .translation-text[data-v-828f3036] { font-size: 0.95em;\n}\n.density-compact .sticky-dropdown[data-v-828f3036] {\n}\n/* Reduce motion politely */\n@media (prefers-reduced-motion: reduce) {\n[data-v-828f3036] { transition: none !important; animation: none !important;\n}\n}\n/* Subtle global typography tuning */\n.lead[data-v-828f3036] {\n  color: #35424c;\n}\nh1.display-5[data-v-828f3036] {\n  letter-spacing: -0.01em;\n}\n/* Sticky filter capsule enhancements without altering markup */\n.sticky-dropdown[data-v-828f3036] {\n  border-radius: 14px;\n  background: linear-gradient(180deg, rgba(27, 74, 89, 0.95), rgba(27, 74, 89, 0.92));\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.sticky-dropdown label.form-label[data-v-828f3036] {\n  font-weight: 600;\n  letter-spacing: 0.02em;\n}\n.sticky-dropdown .form-select[data-v-828f3036] {\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  background-color: rgba(255, 255, 255, 0.08);\n  color: #e9f2f3;\n  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;\n}\n.sticky-dropdown .form-select[data-v-828f3036]:focus {\n  border-color: #7fd6c9;\n  background-color: rgba(255, 255, 255, 0.12);\n  box-shadow: 0 0 0 0.15rem rgba(0, 191, 166, 0.25);\n}\n.sticky-dropdown option[data-v-828f3036] {\n  color: #1f2933;\n}\n/* Per-ayah action icons polish */\n.ayah-card-container .icon-btn[data-v-828f3036] {\n  border-radius: 8px;\n  padding: 6px;\n  transition: background-color 0.18s ease, transform 0.18s ease;\n}\n.ayah-card-container .icon-btn[data-v-828f3036]:hover {\n  background-color: rgba(11, 128, 111, 0.08);\n  transform: translateY(-1px);\n}\n/* Translation and Arabic text subtle contrast */\n.arabic-text[data-v-828f3036] {\n  color: #0a2e2a;\n}\n.translation-text[data-v-828f3036] {\n  color: #334155;\n}\n@media (prefers-reduced-motion: reduce) {\n[data-v-828f3036] {\n    transition: none !important;\n    animation: none !important;\n}\n}\n/* Ayah card polish: typography, layout, toolbar */\n.ayah-card-container .arabic-text[data-v-828f3036] {\n  line-height: 2.1;\n  letter-spacing: 0.2px;\n  color: #082b27;\n}\n.ayah-card-container .ltr-text[data-v-828f3036] { color: #334155;\n}\n.ayah-card-container h4.fw-bold.hide-on-mobile-tablet[data-v-828f3036] { color: #1f2a37; opacity: 0.85;\n}\n/* Constrain reading width for better legibility */\n.ayah-card-container .rtl-text[data-v-828f3036],\n.ayah-card-container .ltr-text[data-v-828f3036] {\n  /* Keep content readable and centered instead of crammed */\n  --reading-width: clamp(56ch, 86vw, 96ch);\n  max-width: var(--reading-width);\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n}\n/* Unified toolbar on all sizes: show mobile toolbar on desktop, hide desktop icon column */\n@media (min-width: 768px) {\n.ayah-card-container .d-none.d-md-flex[data-v-828f3036] { display: none !important;\n}\n.ayah-card-container .d-block.d-md-none[data-v-828f3036] { display: block !important;\n}\n}\n/* Toolbar styling */\n.ayah-card-container .d-block.d-md-none .row.mb-3[data-v-828f3036] {\n  background: rgba(11, 128, 111, 0.06);\n  border: 1px solid rgba(11, 128, 111, 0.12);\n  border-radius: 999px;\n  padding: 6px 4px;\n  gap: 0;\n  width: 100%;\n  /* Match text width and center for balance */\n  max-width: var(--reading-width);\n  margin-left: auto;\n  margin-right: auto;\n}\n/* On narrow screens, let content breathe edge-to-edge */\n@media (max-width: 576px) {\n.ayah-card-container .rtl-text[data-v-828f3036],\n  .ayah-card-container .ltr-text[data-v-828f3036],\n  .ayah-card-container .d-block.d-md-none .row.mb-3[data-v-828f3036] {\n    --reading-width: 100%;\n    max-width: 100%;\n    margin-left: 0;\n    margin-right: 0;\n}\n}\n.ayah-card-container .icon-btn[data-v-828f3036] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: #0b806f;\n}\n.ayah-card-container .icon-btn i[data-v-828f3036] { font-size: 1.25rem !important;\n}\n.ayah-card-container .icon-btn[data-v-828f3036]:hover { background: rgba(11, 128, 111, 0.1);\n}\n/* Subtle divider above toolbar */\n.ayah-card-container .d-block.d-md-none .row.mb-3[data-v-828f3036]::before {\n  content: '';\n  position: absolute;\n  left: 0; right: 0;\n  top: -10px;\n  height: 1px;\n  background: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.08), rgba(0,0,0,0));\n}\n/* Desktop spacing tightening */\n@media (min-width: 992px) {\n.ayah-card[data-v-828f3036] { padding: 16px 18px;\n}\n.ayah-card-container .arabic-text[data-v-828f3036] { font-size: 2rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_style_index_0_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_style_index_0_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_style_index_0_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_style_index_0_id_828f3036_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SuratComponent.vue?vue&type=style&index=0&id=828f3036&scoped=true&lang=css");


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


/***/ })

}]);