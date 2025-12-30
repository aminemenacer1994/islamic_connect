"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_MissionComponent_vue-_e1d31"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var _prophet_events_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prophet_events.json */ "./resources/js/components/prophet_events.json");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

// JSON modules default-export the entire object; access its events property.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SeerahTimeline',
  data() {
    return {
      isOffcanvasOpen: true,
      fontSettings: {
        backgroundColor: '#ffffff',
        color: '#000000',
        fontStyle: 'normal',
        textShadow: 'none',
        textDecoration: '',
        fontFamily: "'Source Sans 3', sans-serif"
      },
      events: [],
      originalEvents: [],
      showSuccess: false,
      currentIndex: 0,
      selectedVoice: null,
      ttsState: 'stopped',
      // 'playing' | 'paused' | 'stopped'
      utterance: null,
      pausedWordIndex: 0,
      currentTtsText: '',
      synth: window.speechSynthesis,
      copySuccess: false,
      searchTerm: '',
      showAudioPlayer: false,
      isAudioPlaying: {},
      currentlyPlayingIndex: null,
      progress: {},
      currentTime: 0,
      totalTime: 0,
      volume: 1,
      showVolumeBar: false,
      fontSize: 18,
      tempFontSize: 18,
      scrollDirection: 'up',
      searchQuery: '',
      summaryText: '',
      summaryLoading: false,
      summaryError: '',
      showSummary: true,
      showSummaryBox: true,
      summaryCache: {},
      // Next step banner visibility
      showNextStep: true,
      nextStepMinimized: false,
      // Performance caches
      highlightedDescription: '',
      wordCount: 0,
      readTime: 0,
      listenTime: 0,
      _filterTimer: null,
      _rafScheduled: false,
      _pendingProgress: null
    };
  },
  computed: {
    offcanvasStyle() {
      return {
        backgroundColor: '#10584f',
        width: window.innerWidth < 576 ? '100%' : '400px'
      };
    },
    contentVars() {
      // Map user font settings to CSS variables for the content card
      const size = Math.max(14, this.fontSize) + 'px';
      return {
        '--content-bg': this.fontSettings.backgroundColor || '#ffffff',
        '--content-fg': this.fontSettings.color || '#0f172a',
        '--content-font-style': this.fontSettings.fontStyle || 'normal',
        '--content-text-shadow': this.fontSettings.textShadow || 'none',
        '--content-text-decoration': this.fontSettings.textDecoration || 'none',
        '--content-font-family': this.fontSettings.fontFamily || "'Source Sans 3', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif",
        '--content-font-size': size
      };
    }
    // heavy computeds removed; we now update cached values in updateCurrentMetrics
  },
  mounted() {
    const saved = localStorage.getItem('userFontSettings');
    if (saved) {
      this.fontSettings = JSON.parse(saved);
    }
    window.addEventListener('resize', this.updateOffcanvasWidth);
    // Track scroll to update tab title at top
    try {
      this._originalTitle = document.title;
    } catch (_) {
      this._originalTitle = 'Islamic Connect';
    }
    window.addEventListener('scroll', this.handleScrollForTitle, {
      passive: true
    });
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.synth.onvoiceschanged = this.loadVoices;
    this.loadVoices();
    // Restore dismissal/minimized state for Next Step banner
    try {
      if (localStorage.getItem('missionNextStepDismissed') === '1') this.showNextStep = false;
      this.nextStepMinimized = localStorage.getItem('missionNextStepMinimized') === '1';
    } catch (_) {}
    // Preprocess events once for performance
    const preprocess = e => {
      const div = document.createElement('div');
      div.innerHTML = e.description || '';
      const plain = (div.textContent || div.innerText || '').trim();
      const wc = plain ? plain.split(/\s+/).length : 0;
      return _objectSpread(_objectSpread({}, e), {}, {
        _plainText: plain,
        _wordCount: wc,
        _readTime: Math.ceil(wc / 200),
        _listenTime: Math.ceil(wc / 150)
      });
    };
    this.events = (_prophet_events_json__WEBPACK_IMPORTED_MODULE_1__ && _prophet_events_json__WEBPACK_IMPORTED_MODULE_1__.events || []).map(preprocess);
    this.originalEvents = this.events.slice();
    this.initializeAudioStates();
    this.initializeTooltips();
    this.updateCurrentMetrics();
    this.updateDocumentTitle();
    // Ensure document has bottom padding when audio player is visible
    if (this.showAudioPlayer) {
      try {
        document.body.classList.add('with-audio-player');
      } catch (_) {}
    }
    // Observe visibility (e.g., when inside hidden tabs/pills)
    this.$nextTick(() => {
      try {
        this._io = new IntersectionObserver(entries => {
          var _this$synth, _this$synth2;
          if (!entries || !entries.length) return;
          const vis = !!entries[0].isIntersecting;
          this.isVisible = vis;
          if (!vis && ((_this$synth = this.synth) !== null && _this$synth !== void 0 && _this$synth.speaking || (_this$synth2 = this.synth) !== null && _this$synth2 !== void 0 && _this$synth2.paused)) {
            this.stopAudio(this.currentlyPlayingIndex);
          }
          if (vis) {
            // Defer heavy updates to next frame to avoid tab-switch jank
            requestAnimationFrame(() => this.updateCurrentMetrics());
            this.initializeTooltips();
          }
        }, {
          root: null,
          threshold: 0
        });
        if (this.$el) this._io.observe(this.$el);
      } catch (e) {
        // ignore if not supported
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateOffcanvasWidth);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('scroll', this.handleScrollForTitle);
    this.synth.onvoiceschanged = null;
    if (this.utterance) {
      this.synth.cancel();
    }
    if (this._filterTimer) {
      clearTimeout(this._filterTimer);
      this._filterTimer = null;
    }
    if (this._io) {
      try {
        this._io.disconnect();
      } catch (_) {}
      this._io = null;
    }
    try {
      document.body.classList.remove('with-audio-player');
    } catch (_) {}
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
      try {
        localStorage.setItem('missionNextStepMinimized', this.nextStepMinimized ? '1' : '0');
      } catch (_) {}
    },
    dismissNextStep() {
      this.showNextStep = false;
      try {
        localStorage.setItem('missionNextStepDismissed', '1');
      } catch (_) {}
    },
    handleScrollForTitle() {
      this.updateDocumentTitle();
    },
    updateDocumentTitle() {
      const base = this._originalTitle || 'Islamic Connect';
      const atTop = typeof window !== 'undefined' ? window.scrollY <= 0 : true;
      const currentTitle = this.events && this.events[this.currentIndex] ? this.events[this.currentIndex].title : '';
      try {
        document.title = atTop && currentTitle ? `${base}   ${currentTitle}` : base;
      } catch (_) {}
    },
    updateCurrentMetrics() {
      const ev = this.events[this.currentIndex] || {};
      const baseHtml = ev.description || '';
      if (this.searchTerm) {
        const escaped = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const rx = new RegExp(`(${escaped})`, 'gi');
        this.highlightedDescription = baseHtml.replace(rx, '<mark style="background-color: var(--mission-accent); color: white; border-radius: 4px; padding: 0 4px;">$1</mark>');
      } else {
        this.highlightedDescription = baseHtml;
      }
      this.wordCount = ev._wordCount || 0;
      this.readTime = ev._readTime || 0;
      this.listenTime = ev._listenTime || 0;
      this.updateTotalTime();
    },
    onTimelineKeydown(e) {
      if (!this.events.length) return;
      const key = e.key;
      if (key === 'ArrowRight' || key === 'Right') {
        e.preventDefault();
        if (this.currentIndex < this.events.length - 1) {
          this.selectEvent(this.currentIndex + 1);
          this.focusCurrentTimelineButton();
        }
      } else if (key === 'ArrowLeft' || key === 'Left') {
        e.preventDefault();
        if (this.currentIndex > 0) {
          this.selectEvent(this.currentIndex - 1);
          this.focusCurrentTimelineButton();
        }
      } else if (key === 'Home') {
        e.preventDefault();
        this.selectEvent(0);
        this.focusCurrentTimelineButton();
      } else if (key === 'End') {
        e.preventDefault();
        this.selectEvent(this.events.length - 1);
        this.focusCurrentTimelineButton();
      } else if (key === 'Enter' || key === ' ') {
        // already activated by click via selectEvent on button
        e.preventDefault();
        this.selectEvent(this.currentIndex);
      }
    },
    focusCurrentTimelineButton() {
      this.$nextTick(() => {
        const refs = this.$refs.eventRefs;
        const el = refs && refs[this.currentIndex] ? refs[this.currentIndex].querySelector('button') : null;
        if (el) el.focus();
      });
    },
    keyboardSeek(deltaPercent) {
      const idx = this.currentlyPlayingIndex;
      if (idx == null || !this.utterance || !this.isAudioPlaying[idx]) return;
      const current = this.progress[idx] || 0;
      const next = Math.min(100, Math.max(0, current + deltaPercent));
      // Simulate by canceling and restarting at target percent
      const wordCount = this.countWords(this.currentTtsText);
      const newWordIndex = Math.round(next / 100 * wordCount);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.synth.cancel();
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[idx] = false;
        this.ttsState = 'stopped';
        this.progress[idx] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = event => this.updateProgress(event, idx, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[idx] = true;
      this.ttsState = 'playing';
      this.progress[idx] = next;
      const wordsPerSecond = 150 / 60;
      this.currentTime = newWordIndex / wordsPerSecond;
      this.pausedWordIndex = newWordIndex;
    },
    initializeAudioStates() {
      this.events.forEach((_, index) => {
        this.isAudioPlaying[index] = false;
        this.progress[index] = 0;
      });
    },
    initializeTooltips() {
      if (!this.isVisible) return;
      if (!(window && window.bootstrap)) return;
      this.$nextTick(() => {
        const root = this.$el || document;
        const tooltipTriggerList = root.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
          const existing = window.bootstrap.Tooltip.getInstance(el);
          if (!existing) new window.bootstrap.Tooltip(el);
        });
      });
    },
    loadVoices() {
      const voices = this.synth.getVoices();
      if (voices.length) {
        this.selectedVoice = voices.find(voice => voice.lang === 'en-US' && (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Jenny') || voice.name.includes('Samantha'))) || voices.find(voice => voice.lang === 'en-US') || voices[0];
      }
    },
    toggleAudioPlayer(index) {
      if (!this.selectedVoice) {
        this.loadVoices();
        return;
      }
      this.currentlyPlayingIndex = index;
      this.showAudioPlayer = true;
      if (this.isAudioPlaying[index]) {
        this.synth.cancel();
        const wordCount = this.countWords(this.currentTtsText);
        const wordsPerSecond = 150 / 60;
        const currentProgress = this.progress[index] / 100;
        this.currentTime = currentProgress * (wordCount / wordsPerSecond);
        this.pausedWordIndex = Math.round(currentProgress * wordCount);
        this.isAudioPlaying[index] = false;
        this.ttsState = 'paused';
      } else {
        this.playAudio(index, this.pausedWordIndex);
      }
    },
    playAudio(index, startWordIndex = 0) {
      if (this.utterance && this.synth.speaking) {
        this.synth.cancel();
      }
      const ev = this.events[index] || {};
      const description = ev._plainText || this.stripHtml(ev.description || '');
      const title = ev.title || '';
      const ttsText = `${title}. Read time ${this.readTime} minutes. Listen time ${this.listenTime} minutes. Word count ${this.wordCount}. ${description}`;
      this.currentTtsText = ttsText;
      const words = ttsText.split(/\s+/).filter(Boolean);
      const newText = startWordIndex > 0 ? words.slice(startWordIndex).join(' ') : ttsText;
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = event => this.updateProgress(event, index, startWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.updateTotalTime();
      if (startWordIndex > 0) {
        const wordCount = this.countWords(ttsText);
        this.progress[index] = startWordIndex / wordCount * 100;
        this.currentTime = startWordIndex / wordCount * this.totalTime;
      }
      try {
        document.body.classList.add('with-audio-player');
      } catch (_) {}
    },
    stopAudio(index) {
      if (this.synth.speaking || this.synth.paused) {
        this.synth.cancel();
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      }
      try {
        document.body.classList.remove('with-audio-player');
      } catch (_) {}
    },
    rewindAudio(index) {
      if (!this.utterance || !this.isAudioPlaying[index]) return;
      this.synth.cancel();
      const wordCount = this.countWords(this.currentTtsText);
      const wordsPerSecond = 150 / 60;
      const currentProgress = this.progress[index] / 100;
      const currentSecond = currentProgress * (wordCount / wordsPerSecond);
      const newSecond = Math.max(0, currentSecond - 10);
      const newWordIndex = Math.round(newSecond * wordsPerSecond);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = event => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = newWordIndex / wordCount * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    fastForwardAudio(index) {
      if (!this.utterance || !this.isAudioPlaying[index]) return;
      this.synth.cancel();
      const wordCount = this.countWords(this.currentTtsText);
      const wordsPerSecond = 150 / 60;
      const currentProgress = this.progress[index] / 100;
      const currentSecond = currentProgress * (wordCount / wordsPerSecond);
      const newSecond = Math.min(this.totalTime, currentSecond + 10);
      const newWordIndex = Math.round(newSecond * wordsPerSecond);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = event => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = newWordIndex / wordCount * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    seekAudio(event, index) {
      if (!this.utterance || !this.isAudioPlaying[index]) return;
      this.synth.cancel();
      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const barWidth = rect.width;
      const clickRatio = clickX / barWidth;
      const wordCount = this.countWords(this.currentTtsText);
      const wordsPerSecond = 150 / 60;
      const newSecond = clickRatio * this.totalTime;
      const newWordIndex = Math.round(newSecond * wordsPerSecond);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = event => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = newWordIndex / wordCount * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    updateProgress(event, index, startWordIndex = 0) {
      if (event.name !== 'word' || !this.utterance) return;
      if (document.hidden || !this.isVisible) return;
      const text = this.currentTtsText || '';
      const words = text.split(/\s+/).filter(Boolean);
      const currentWordIndex = startWordIndex + Math.round(event.charIndex / this.utterance.text.length * (words.length - startWordIndex));
      const pct = currentWordIndex / words.length * 100;
      const time = currentWordIndex / words.length * this.totalTime;
      this._pendingProgress = {
        index,
        pct,
        time
      };
      if (this._rafScheduled) return;
      this._rafScheduled = true;
      requestAnimationFrame(() => {
        const p = this._pendingProgress;
        if (p && p.index != null) {
          this.progress[p.index] = p.pct;
          this.currentTime = p.time;
        }
        this._rafScheduled = false;
      });
    },
    toggleVolume() {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume() {
      if (this.utterance) {
        this.utterance.volume = this.volume;
      }
    },
    updateTotalTime() {
      const wordsPerSecond = 150 / 60;
      this.totalTime = Math.ceil((this.wordCount || 0) / wordsPerSecond);
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },
    closeAudioPlayer() {
      this.stopAudio(this.currentlyPlayingIndex);
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = null;
    },
    selectEvent(index) {
      if (this.synth.speaking || this.synth.paused) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.currentIndex = index;
      this.scrollToEvent(index);
      this.updateCurrentMetrics();
      this.updateDocumentTitle();
    },
    scrollToEvent(index) {
      const refs = this.$refs.eventRefs;
      if (refs && refs[index]) {
        const el = refs[index];
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < 0 || rect.bottom > vh) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    },
    scrollEventContentToTop() {
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      if (typeof document !== 'undefined') {
        const docEl = document.documentElement || document.body;
        if (docEl && typeof docEl.scrollTo === 'function') {
          docEl.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.stopAudio(this.currentlyPlayingIndex);
        this.currentIndex--;
        this.scrollEventContentToTop();
        this.updateCurrentMetrics();
        this.updateDocumentTitle();
      }
    },
    next() {
      if (this.currentIndex < this.events.length - 1) {
        this.stopAudio(this.currentlyPlayingIndex);
        this.currentIndex++;
        this.scrollEventContentToTop();
        this.updateCurrentMetrics();
        this.updateDocumentTitle();
      }
    },
    saveSettings() {
      localStorage.setItem('userFontSettings', JSON.stringify(this.fontSettings));
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('settingsOffcanvas'));
        if (offcanvas) {
          offcanvas.hide();
        }
      }, 3000);
    },
    updateOffcanvasWidth() {
      this.$forceUpdate();
    },
    handleVisibilityChange() {
      if (document.hidden && this.synth.speaking) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
    },
    countWords(text) {
      if (!text) return 0;
      return text.split(/\s+/).filter(Boolean).length;
    },
    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },
    increaseFontSize() {
      this.tempFontSize += 1;
    },
    decreaseFontSize() {
      if (this.tempFontSize > 1) this.tempFontSize -= 1;
    },
    // Quick action font size controls (kept in sync with offcanvas values)
    incFont() {
      const next = (this.fontSize || 16) + 1;
      this.fontSize = next;
      this.tempFontSize = next;
    },
    decFont() {
      const next = Math.max(1, (this.fontSize || 16) - 1);
      this.fontSize = next;
      this.tempFontSize = next;
    },
    submitFontSize() {
      this.fontSize = this.tempFontSize;
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
    buildPrintHtml(title, html) {
      const styles = `
        <style>
          html, body { height: 100%; }
          body { margin: 24px; background: #fff; font-family: ${this.fontSettings.fontFamily}; }
          h1 { margin: 0 0 16px; font-size: 22px; }
          .content {
            line-height: 1.7em;
            background-color: ${this.fontSettings.backgroundColor};
            color: ${this.fontSettings.color};
            font-style: ${this.fontSettings.fontStyle};
            text-shadow: ${this.fontSettings.textShadow};
            text-decoration: ${this.fontSettings.textDecoration};
            padding: 12px;
            font-size: ${Math.max(14, this.fontSize)}px;
            border: 1px solid #eee;
            border-radius: 8px;
          }
          @media print { body { margin: 0; } }
        </style>
      `;
      const safeTitle = title || 'Event';
      // Exclude title/header for print/PDF per request
      return `<!doctype html><html><head><meta charset="utf-8"><title>${safeTitle}</title>${styles}</head><body><div class="content">${html || ''}</div></body></html>`;
    },
    printEvent() {
      try {
        const ev = this.events[this.currentIndex] || {};
        const title = (ev.title || '').trim();
        const html = ev.description || '';
        const docHtml = this.buildPrintHtml(title, html);

        // Use hidden iframe so no blob: URL is shown
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
        const idoc = iframe.contentWindow || iframe.contentDocument;
        const doc = idoc.document || idoc;
        doc.open();
        doc.write(docHtml);
        doc.close();
        setTimeout(() => {
          try {
            idoc.focus();
            idoc.print();
          } catch (_) {}
          setTimeout(() => {
            try {
              document.body.removeChild(iframe);
            } catch (_) {}
          }, 1000);
        }, 400);
      } catch (_) {/* no-op */}
    },
    async downloadPdf() {
      try {
        const ev = this.events[this.currentIndex] || {};
        const title = (ev.title || '').trim() || 'Event';
        const rawHtml = ev.description || '';
        const blocks = this.buildPdfBlocks(rawHtml);

        // Create a plain-text PDF (more reliable across browsers)
        const doc = new jspdf__WEBPACK_IMPORTED_MODULE_0__.jsPDF({
          unit: 'pt',
          format: 'a4'
        });
        // Attempt to embed Unicode-friendly fonts if available in /public/fonts
        const fonts = await this.embedPdfFonts(doc);
        const fontBody = (fonts === null || fonts === void 0 ? void 0 : fonts.body) || {
          family: 'Times',
          style: 'normal'
        };
        const fontHeading = (fonts === null || fonts === void 0 ? void 0 : fonts.heading) || {
          family: fontBody.family,
          style: 'bold'
        };
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 56; // pt, wider margins for readability
        // Header (site name left, date right)
        // Remove header and title in PDF as requested
        let y = margin;

        // Exclude document title from PDF export

        // Meta line removed programmatically

        // Body with basic formatting (headings, bullets, paragraphs)
        const px = Math.max(16, this.fontSize);
        const bodyPt = Math.max(12, Math.round(px * 0.75)); // px → pt
        const paraLH = Math.round(bodyPt * 1.7);
        const bulletIndent = 18; // indent for bullets
        const firstLineIndent = 12; // indent first line of paragraph
        blocks.forEach(blk => {
          if (!blk.text) {
            y += 8;
            return;
          }
          let font = fontBody.family;
          let style = 'normal';
          let size = bodyPt;
          let prefix = '';
          let x = margin;
          if (blk.type === 'heading') {
            style = 'bold';
            size = Math.max(bodyPt + 3, 13);
          } else if (blk.type === 'bullet') {
            prefix = blk.num ? `${blk.num}. ` : '• ';
            x = margin + bulletIndent;
          }
          doc.setFont(font, style);
          doc.setFontSize(size);
          const maxWidth = pageWidth - margin * 2 - (x - margin);
          const text = prefix + this.sanitizeForPdf(blk.text);
          const lines = doc.splitTextToSize(text, maxWidth);
          const lh = blk.type === 'heading' ? Math.round(size * 1.6) : paraLH;
          if (blk.type === 'paragraph') {
            // justified paragraph with first-line indent
            const indentX = x + firstLineIndent;
            const result = this.drawJustifiedParagraph(doc, lines, indentX, x, y, maxWidth, lh, pageHeight, margin);
            y = result.y;
          } else {
            lines.forEach(ln => {
              if (y + lh > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text(ln, x, y);
              y += lh;
            });
          }
          y += blk.type === 'heading' ? 8 : 10; // block spacing
        });
        // Add page numbers footer
        this.addPdfPageNumbers(doc, margin);
        doc.save(`${title}.pdf`);
      } catch (e) {
        console.error(e);
        this.printEvent();
      }
    },
    buildPdfBlocks(rawHtml) {
      // Very light HTML → blocks: headings, bullets, paragraphs
      const container = document.createElement('div');
      container.innerHTML = rawHtml || '';
      const blocks = [];
      const pushParagraph = text => {
        const t = (text || '').replace(/\s+/g, ' ').trim();
        if (t) blocks.push({
          type: 'paragraph',
          text: t
        });
      };
      const walk = node => {
        if (!node) return;
        const nodeName = (node.nodeName || '').toLowerCase();
        // Ignore stray text nodes at root level to avoid fragmentation
        if (nodeName.match(/^h[1-6]$/)) {
          blocks.push({
            type: 'heading',
            text: (node.textContent || '').trim()
          });
          return;
        }
        if (nodeName === 'ul' || nodeName === 'ol') {
          let num = 1;
          Array.from(node.children || []).forEach(li => {
            if (li.nodeName.toLowerCase() === 'li') {
              const t = (li.textContent || '').replace(/\s+/g, ' ').trim();
              if (t) blocks.push({
                type: 'bullet',
                text: t,
                num: nodeName === 'ol' ? num++ : null
              });
            }
          });
          return;
        }
        if (nodeName === 'br') {
          blocks.push({
            type: 'paragraph',
            text: ''
          });
          return;
        }
        if (nodeName === 'p' || nodeName === 'div' || nodeName === 'section' || nodeName === 'article') {
          let t = (node.textContent || '').replace(/\s+/g, ' ').replace(/\s*\n\s*/g, ' ').trim();
          if (t) {
            // If paragraph contains multiple hyphen-led items, convert to bullets
            const hyphenItems = t.match(/(?:^|\s)[-– ]\s+[^-– ].+?(?=(?:\s[-– ]\s)|$)/g);
            const numberedItems = t.match(/(?:^|\s)(\d+)\.\s+.+?(?=(?:\s\d+\.)|$)/g);
            if (hyphenItems && hyphenItems.length >= 3) {
              hyphenItems.forEach(item => {
                const txt = item.replace(/^\s*[-– ]\s+/, '').trim();
                if (txt) blocks.push({
                  type: 'bullet',
                  text: txt
                });
              });
            } else if (numberedItems && numberedItems.length >= 3) {
              let n = 1;
              numberedItems.forEach(item => {
                const txt = item.replace(/^\s*\d+\.\s+/, '').trim();
                if (txt) blocks.push({
                  type: 'bullet',
                  text: txt,
                  num: n++
                });
              });
            } else {
              blocks.push({
                type: 'paragraph',
                text: t
              });
            }
          }
          return;
        }
        Array.from(node.childNodes || []).forEach(walk);
      };
      Array.from(container.childNodes || []).forEach(walk);
      const plain = (this.stripHtml(rawHtml || '') || '').replace(/\s+/g, ' ').trim();
      const pushNumberedFromPlain = txt => {
        // Build numbered items from inline "1. ... 2. ..." pattern
        const re = /(\d+)\.\s+/g;
        const items = [];
        let lastIndex = 0;
        let m;
        let order = [];
        while ((m = re.exec(txt)) !== null) {
          order.push({
            n: parseInt(m[1], 10),
            i: m.index
          });
        }
        if (order.length >= 2) {
          for (let k = 0; k < order.length; k++) {
            const start = order[k].i + (order[k].n.toString().length + 2); // skip "N. "
            const end = k + 1 < order.length ? order[k + 1].i : txt.length;
            const slice = txt.slice(start, end).trim();
            if (slice) items.push({
              type: 'bullet',
              num: k + 1,
              text: slice
            });
          }
        }
        return items;
      };
      const pushBulletsFromPlain = txt => {
        // Build bullets from repeated hyphen markers
        const parts = txt.split(/(?:^|\s)[\-– ]\s+/).map(s => s.trim()).filter(Boolean);
        if (parts.length >= 2) {
          return parts.map(t => ({
            type: 'bullet',
            text: t
          }));
        }
        return [];
      };
      const chunkSentences = txt => {
        const sents = txt.split(/(?<=[.!?])\s+(?=[A-Z0-9"“'])/).map(s => s.trim()).filter(Boolean);
        if (!sents.length) return [];
        const out = [];
        const group = 3; // 2-3 sentences per paragraph
        for (let i = 0; i < sents.length; i += group) {
          out.push({
            type: 'paragraph',
            text: sents.slice(i, i + group).join(' ')
          });
        }
        return out;
      };
      if (!blocks.length && plain) {
        // Try numbered items first
        let built = pushNumberedFromPlain(plain);
        if (built.length >= 2) return built;
        // Try bullet items
        built = pushBulletsFromPlain(plain);
        if (built.length >= 2) return built;
        // Otherwise chunk by sentences into paragraphs
        built = chunkSentences(plain);
        if (built.length) return built;
        return [{
          type: 'paragraph',
          text: plain
        }];
      } else {
        // If extracted content is far shorter than plain, regenerate using sentence chunking
        const extracted = blocks.map(b => b.text).join(' ').length;
        if (plain && extracted < plain.length * 0.5) {
          let built = pushNumberedFromPlain(plain);
          if (built.length >= 2) return built;
          built = pushBulletsFromPlain(plain);
          if (built.length >= 2) return built;
          built = chunkSentences(plain);
          if (built.length) return built;
          return [{
            type: 'paragraph',
            text: plain
          }];
        }
      }
      return blocks;
    },
    drawJustifiedParagraph(doc, lines, indentX, baseX, startY, maxWidth, lineHeight, pageHeight, margin) {
      let y = startY;
      const spaceWidth = doc.getTextWidth(' ');
      lines.forEach((line, idx) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          // No header; continue content at top margin
          y = margin;
        }
        // Last line or very short line: left align
        if (idx === lines.length - 1 || line.length < 20) {
          doc.text(line, idx === 0 ? indentX : baseX, y);
          y += lineHeight;
          return;
        }
        const words = line.split(/\s+/).filter(Boolean);
        if (words.length <= 2) {
          doc.text(line, idx === 0 ? indentX : baseX, y);
          y += lineHeight;
          return;
        }
        const textWidth = words.reduce((acc, w, i) => acc + doc.getTextWidth(w) + (i ? spaceWidth : 0), 0);
        const extra = (maxWidth - textWidth) / (words.length - 1);
        let x = idx === 0 ? indentX : baseX;
        words.forEach((w, i) => {
          doc.text(w, x, y);
          if (i < words.length - 1) x += doc.getTextWidth(w) + spaceWidth + Math.max(0, extra);
        });
        y += lineHeight;
      });
      return {
        y
      };
    },
    async embedPdfFonts(doc) {
      const tryAdd = async (url, vfsName, family, style) => {
        try {
          const res = await fetch(url, {
            cache: 'no-cache'
          });
          if (!res.ok) return false;
          const buf = await res.arrayBuffer();
          const b64 = this._arrayBufferToBase64(buf);
          doc.addFileToVFS(vfsName, b64);
          doc.addFont(vfsName, family, style);
          return true;
        } catch (_) {
          return false;
        }
      };
      const okRegular = await tryAdd('/fonts/NotoSans-Regular.ttf', 'NotoSans-Regular.ttf', 'NotoSans', 'normal');
      const okBold = await tryAdd('/fonts/NotoSans-Bold.ttf', 'NotoSans-Bold.ttf', 'NotoSans', 'bold');
      if (okRegular) {
        const body = {
          family: 'NotoSans',
          style: 'normal'
        };
        const heading = {
          family: 'NotoSans',
          style: okBold ? 'bold' : 'normal'
        };
        return {
          body,
          heading
        };
      }
      return null;
    },
    _arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
      }
      return btoa(binary);
    },
    addPdfPageNumbers(doc, margin = 40) {
      const pageCount = doc.getNumberOfPages();
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      doc.setFontSize(9);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const label = `${i} / ${pageCount}`;
        doc.text(label, width - margin, height - Math.max(18, Math.round(9 * 1.4)), {
          align: 'right'
        });
      }
    },
    sanitizeForPdf(text) {
      if (!text) return '';
      let t = String(text).replace(/\u00A0/g, ' ') // nbsp
      .replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[‐‑– ]/g, '-') // hyphen, non-breaking hyphen, en/em dash
      .replace(/…/g, '...').replace(/\u200B|\u200E|\u200F/g, ''); // zero-width/RTL marks
      // Replace common Islamic marks with ASCII form
      t = t.replace(/[ﷺؐﷻ]+/g, '(PBUH)');
      // Strip combining diacritics
      try {
        t = t.normalize('NFD').replace(/(?:[\^`\xA8\xAF\xB4\xB7\xB8\u02B0-\u034E\u0350-\u0357\u035D-\u0362\u0374\u0375\u037A\u0384\u0385\u0483-\u0487\u0559\u0591-\u05A1\u05A3-\u05BD\u05BF\u05C1\u05C2\u05C4\u064B-\u0652\u0657\u0658\u06DF\u06E0\u06E5\u06E6\u06EA-\u06EC\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F5\u0818\u0819\u0898-\u089F\u08C9-\u08D2\u08E3-\u08FE\u093C\u094D\u0951-\u0954\u0971\u09BC\u09CD\u0A3C\u0A4D\u0ABC\u0ACD\u0AFD-\u0AFF\u0B3C\u0B4D\u0B55\u0BCD\u0C3C\u0C4D\u0CBC\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E3A\u0E47-\u0E4C\u0E4E\u0EBA\u0EC8-\u0ECC\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F82-\u0F84\u0F86\u0F87\u0FC6\u1037\u1039\u103A\u1063\u1064\u1069-\u106D\u1087-\u108D\u108F\u109A\u109B\u135D-\u135F\u1714\u1715\u1734\u17C9-\u17D3\u17DD\u1939-\u193B\u1A60\u1A75-\u1A7C\u1A7F\u1AB0-\u1ABE\u1AC1-\u1ACB\u1B34\u1B44\u1B6B-\u1B73\u1BAA\u1BAB\u1BE6\u1BF2\u1BF3\u1C36\u1C37\u1C78-\u1C7D\u1CD0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1D2C-\u1D6A\u1DC4-\u1DCF\u1DF5-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2CEF-\u2CF1\u2E2F\u302A-\u302F\u3099-\u309C\u30FC\uA66F\uA67C\uA67D\uA67F\uA69C\uA69D\uA6F0\uA6F1\uA700-\uA721\uA788-\uA78A\uA7F8\uA7F9\uA806\uA82C\uA8C4\uA8E0-\uA8F1\uA92B-\uA92E\uA953\uA9B3\uA9C0\uA9E5\uAA7B-\uAA7D\uAABF-\uAAC2\uAAF6\uAB5B-\uAB5F\uAB69-\uAB6B\uABEC\uABED\uFB1E\uFE20-\uFE2F\uFF3E\uFF40\uFF70\uFF9E\uFF9F\uFFE3]|\uD800\uDEE0|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD22-\uDD27\uDD4E\uDD69-\uDD6D\uDEFD-\uDEFF\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC46\uDC70\uDCB9\uDCBA\uDD33\uDD34\uDD73\uDDC0\uDDCA-\uDDCC\uDE35\uDE36\uDEE9\uDEEA\uDF3B\uDF3C\uDF4D\uDF66-\uDF6C\uDF70-\uDF74\uDFCE-\uDFD0\uDFD2\uDFD3\uDFE1\uDFE2]|\uD805[\uDC42\uDC46\uDCC2\uDCC3\uDDBF\uDDC0\uDE3F\uDEB6\uDEB7\uDF2B]|\uD806[\uDC39\uDC3A\uDD3D\uDD3E\uDD43\uDDE0\uDE34\uDE47\uDE99]|\uD807[\uDC3F\uDD42\uDD44\uDD45\uDD97\uDF41\uDF42\uDF5A]|\uD80D[\uDC47-\uDC55]|\uD818\uDD2F|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDD6B\uDD6C\uDF8F-\uDF9F\uDFF0\uDFF1]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD67-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uD838[\uDC30-\uDC6D\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD839[\uDDEE\uDDEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD46\uDD48-\uDD4A])+/g, '');
      } catch (_) {}
      // Collapse spaces
      return t.replace(/\s{2,}/g, ' ').trim();
    },
    filterEvents() {
      if (this._filterTimer) clearTimeout(this._filterTimer);
      this._filterTimer = setTimeout(() => {
        const query = this.searchQuery.trim().toLowerCase();
        if (!query) {
          this.events = this.originalEvents.slice();
          this.currentIndex = 0;
          this.updateCurrentMetrics();
          return;
        }
        const filtered = this.originalEvents.filter(e => (e.title || '').toLowerCase().includes(query) || (e._plainText || '').toLowerCase().includes(query) || (e.year || '').toLowerCase().includes(query));
        this.events = filtered;
        this.currentIndex = 0;
        this.updateCurrentMetrics();
      }, 200);
    },
    copyToClipboard() {
      var _this$events$this$cur;
      const rawHtml = ((_this$events$this$cur = this.events[this.currentIndex]) === null || _this$events$this$cur === void 0 ? void 0 : _this$events$this$cur.description) || '';
      const plainText = this.stripHtml(rawHtml);
      navigator.clipboard.writeText(plainText).then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      });
    },
    shareOnWhatsApp() {
      const message = encodeURIComponent(this.stripHtml(this.events[this.currentIndex].description));
      const url = `https://wa.me/?text=${message}`;
      window.open(url, '_blank');
    },
    async summarizeEvent() {
      const cacheKey = `${this.currentIndex}`;
      if (this.summaryCache[cacheKey]) {
        this.summaryText = this.summaryCache[cacheKey];
        this.showSummary = true;
        this.showSummaryBox = true;
        return;
      }
      this.summaryLoading = true;
      this.summaryText = '';
      this.summaryError = '';
      try {
        const ev = this.events[this.currentIndex] || {};
        const title = (ev.title || '').trim();
        const description = (this.stripHtml(ev.description || '') || '').replace(/\s+/g, ' ').trim();
        if (!description) {
          this.summaryText = '<em>No summary available for this event.</em>';
          this.summaryLoading = false;
          return;
        }

        // Helpers
        const tokenize = s => s.toLowerCase().match(/[a-zA-Z'’]+|\d{1,4}/g) || [];
        const unique = arr => Array.from(new Set(arr));
        const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

        // Sentence segmentation
        const sentences = description.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(s => s.trim()).filter(s => s.length > 0);
        const titleTokens = unique(tokenize(title));

        // Build term frequency from whole doc
        const allTokens = tokenize(description);
        const tf = {};
        allTokens.forEach(t => tf[t] = (tf[t] || 0) + 1);

        // Domain keywords and verbs
        const domain = ['prophet', 'muhammad', 'mecca', 'medina', 'revelation', 'migration', 'battle', 'companions', 'islam', 'qur\'an', 'allah', 'hijrah', 'badr', 'uhud', 'hudaybiyyah', 'isra', 'mi\'raj', 'ansar', 'muhajirun', 'sahabah', 'quraish', 'kaaba', 'yathrib', 'treaty', 'sermon', 'expedition', 'persecution', 'miracle', 'conquest'];
        const verbs = ['revealed', 'migrated', 'migrate', 'fled', 'arrived', 'established', 'sent', 'commanded', 'prohibited', 'fought', 'won', 'defeated', 'signed', 'pledged', 'preached', 'built', 'led', 'appointed', 'announced'];

        // Skipping entity/year extraction; chips removed from summary output

        // Score sentences
        const scored = sentences.map((s, idx) => {
          const toks = tokenize(s);
          if (!toks.length) return {
            s,
            idx,
            score: -Infinity
          };
          let score = 0;
          // term frequency weight
          toks.forEach(t => {
            score += tf[t] || 0;
          });
          // domain keyword boost
          domain.forEach(k => {
            if (s.toLowerCase().includes(k)) score += 2.5;
          });
          // verbs boost (action)
          verbs.forEach(v => {
            if (s.toLowerCase().includes(v)) score += 1.5;
          });
          // numbers/years boost
          if (/\b\d{3,4}\b/.test(s)) score += 1.2;
          // title overlap
          const overlap = toks.filter(t => titleTokens.includes(t)).length;
          score += overlap * 1.2;
          // position bias
          if (idx === 0) score += 1.4;
          if (idx === sentences.length - 1) score += 0.8;
          // length normalization
          const len = s.length;
          if (len < 40) score -= 1.0;
          if (len > 300) score -= 0.8;
          return {
            s,
            idx,
            score
          };
        }).filter(x => x.score > -Infinity);
        scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
        const topK = clamp(Math.ceil(Math.min(5, Math.max(3, description.length / 350))), 3, 5);
        const picked = unique(scored.slice(0, 10).map(x => x)).sort((a, b) => a.idx - b.idx).slice(0, topK);
        const pickedSentences = picked.map(p => p.s.trim());

        // Build output HTML
        const bullets = pickedSentences.slice(0, topK).map(s => `<li>${s}</li>`).join('');
        // Chips removed

        const html = `
          <div class="summary-card">
            <ul class="mb-2 ps-3">${bullets}</ul>
            
          </div>
        `;
        this.summaryText = html;
        this.showSummaryBox = true;
        this.summaryCache[cacheKey] = html;
        this.$nextTick(() => {
          if (this.$refs.summarySection) {
            this.$refs.summarySection.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        });
      } catch (err) {
        this.summaryError = err && err.message ? err.message : 'Error generating summary.';
      } finally {
        this.summaryLoading = false;
      }
    },
    toggleSummary() {
      this.showSummary = !this.showSummary;
    },
    closeSummaryBox() {
      this.showSummaryBox = false;
    }
  },
  watch: {
    fontSettings: {
      handler(newVal) {
        localStorage.setItem('fontSettings', JSON.stringify(newVal));
      },
      deep: true
    },
    currentIndex() {
      this.summaryText = '';
      this.summaryError = '';
      this.showSummary = true;
      this.showSummaryBox = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=template&id=39610a88&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=template&id=39610a88&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container px-2"
};
const _hoisted_2 = {
  class: "mx-auto mb-4 next-step-card animate-rise"
};
const _hoisted_3 = {
  class: "next-step-actions",
  role: "group",
  "aria-label": "Next step actions"
};
const _hoisted_4 = ["title", "aria-label"];
const _hoisted_5 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_6 = {
  class: "flex-grow-1"
};
const _hoisted_7 = {
  class: "mb-2 next-step-teaser"
};
const _hoisted_8 = {
  class: "mb-3 next-step-text"
};
const _hoisted_9 = {
  href: "/dua",
  class: "btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta"
};
const _hoisted_10 = {
  class: "timeline-wrapper container",
  "aria-label": "Seerah timeline"
};
const _hoisted_11 = ["aria-current", "aria-label", "tabindex", "onClick"];
const _hoisted_12 = ["aria-labelledby"];
const _hoisted_13 = {
  key: 0,
  class: "alert alert-success",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_14 = ["id"];
const _hoisted_15 = {
  class: "d-flex justify-content-center align-items-center gap-2 gap-sm-4 mb-3 mb-md-4 flex-wrap"
};
const _hoisted_16 = {
  class: "action-row shadow-sm bg-white",
  role: "toolbar",
  "aria-label": "Event actions toolbar"
};
const _hoisted_17 = {
  class: "action-group",
  role: "group",
  "aria-label": "AI tools"
};
const _hoisted_18 = ["disabled", "aria-busy"];
const _hoisted_19 = {
  class: "label d-none d-sm-inline"
};
const _hoisted_20 = {
  class: "action-group",
  role: "group",
  "aria-label": "Font size"
};
const _hoisted_21 = {
  class: "action-group",
  role: "group",
  "aria-label": "Share and copy"
};
const _hoisted_22 = {
  class: "action-group",
  role: "group",
  "aria-label": "Export"
};
const _hoisted_23 = ["aria-label", "aria-pressed", "title"];
const _hoisted_24 = {
  class: "container d-flex align-items-center flex-wrap gap-3 mb-3 mb-md-4"
};
const _hoisted_25 = {
  class: "d-flex container align-items-center flex-wrap text-center gap-2 gap-sm-3",
  role: "group",
  "aria-label": "Time estimates"
};
const _hoisted_26 = {
  class: "stat-chip"
};
const _hoisted_27 = {
  class: "stat-chip"
};
const _hoisted_28 = {
  class: "stat-chip"
};
const _hoisted_29 = {
  key: 0,
  class: "ai-summary-inline card-teal premium-surface mt-3 mt-md-4 p-2 p-md-3 rounded-20 animate-rise",
  ref: "summarySection"
};
const _hoisted_30 = {
  class: "d-flex align-items-center justify-content-between mb-2"
};
const _hoisted_31 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_32 = ["title", "aria-expanded"];
const _hoisted_33 = {
  id: "ai-summary-panel",
  role: "region",
  "aria-live": "polite"
};
const _hoisted_34 = ["innerHTML"];
const _hoisted_35 = {
  key: 1,
  class: "alert alert-danger mt-2"
};
const _hoisted_36 = ["innerHTML"];
const _hoisted_37 = {
  key: 2,
  class: "mt-2 small text-muted"
};
const _hoisted_38 = {
  class: "d-flex flex-column"
};
const _hoisted_39 = {
  class: "d-flex flex-column gap-3"
};
const _hoisted_40 = {
  key: 0,
  class: "alert alert-success"
};
const _hoisted_41 = {
  class: "d-flex align-items-center gap-3"
};
const _hoisted_42 = {
  class: "fw-bold fs-5"
};
const _hoisted_43 = ["disabled"];
const _hoisted_44 = ["disabled"];
const _hoisted_45 = {
  key: 0,
  class: "audio-player-container",
  role: "region",
  "aria-label": "Audio player"
};
const _hoisted_46 = {
  class: "custom-audio-player"
};
const _hoisted_47 = {
  class: "controls audio-controls"
};
const _hoisted_48 = ["title", "aria-label"];
const _hoisted_49 = {
  key: 0,
  class: "volume-bar-container"
};
const _hoisted_50 = {
  class: "time",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_51 = ["aria-valuenow", "aria-valuetext"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["p-3 mission-shell", {
      'pb-audio-gap': $data.showAudioPlayer
    }])
  }, [_cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row py-3 justify-content-center text-center mb-3 mission-hero"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold mission-hero__title"
  }, "Seerah Timeline"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead mission-hero__lead"
  }, " The Seerah Timeline offers an insightful journey through the life of Prophet Muhammad (PBUH). ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Step: From Qur'an History to Seerah Timeline "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "icon-btn",
    title: $data.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": $data.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args), ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_4)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-praying-hands"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/dua",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " Explore Du‘a collection ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-1 text-brand"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Learning the Prophet’s blessed journey is a beautiful beginning. When you feel ready, take a gentle step into heartfelt supplications, explore a simple, welcoming the ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/dua",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " Du‘a collection ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" for daily moments of connection. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_9, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Explore Du‘a ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-2"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", {
    class: "timeline mb-3",
    role: "list",
    onKeydown: _cache[1] || (_cache[1] = (...args) => $options.onTimelineKeydown && $options.onTimelineKeydown(...args)),
    ref: "timelineNav",
    tabindex: "0"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.events, (event, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: event.id || event.year || index,
      class: "timeline-point",
      role: "listitem",
      ref_for: true,
      ref: "eventRefs"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge fs-6 timeline-badge", {
        active: index === $data.currentIndex
      }]),
      type: "button",
      "aria-current": index === $data.currentIndex ? 'step' : null,
      "aria-label": `Year ${event.year}. ${index === $data.currentIndex ? 'Current event' : 'Activate to view details'}`,
      tabindex: index === $data.currentIndex ? 0 : -1,
      onClick: $event => $options.selectEvent(index)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.year), 11 /* TEXT, CLASS, PROPS */, _hoisted_11)]);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade",
    mode: "out-in",
    class: "container"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.events.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: $data.currentIndex,
      class: "event-box event-details",
      role: "region",
      "aria-labelledby": `event-title-${$data.currentIndex}`
    }, [$data.copySuccess ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, " Text copied to clipboard! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "fw-bold display-6 text-center mb-3",
      id: `event-title-${$data.currentIndex}`
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.events[$data.currentIndex].title), 9 /* TEXT, PROPS */, _hoisted_14), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Combined Controls and Info Row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Actions Toolbar (evenly spaced row) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Summary "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.summarizeEvent && $options.summarizeEvent(...args)),
      disabled: $data.summaryLoading,
      "aria-busy": $data.summaryLoading ? 'true' : 'false',
      title: "AI Summary",
      "aria-label": "AI Summary"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.summaryLoading ? 'bi-hourglass-split' : 'bi-robot'])
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summaryLoading ? 'Generating...' : 'AI Summary'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_18)]), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row-sep d-none d-sm-inline",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Font size controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item",
      onClick: _cache[3] || (_cache[3] = (...args) => $options.decFont && $options.decFont(...args)),
      title: "Decrease font size",
      "aria-label": "Decrease font size"
    }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "fw-semibold"
    }, "A−", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "label d-none d-md-inline ms-1"
    }, "Smaller", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item",
      onClick: _cache[4] || (_cache[4] = (...args) => $options.incFont && $options.incFont(...args)),
      title: "Increase font size",
      "aria-label": "Increase font size"
    }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "fw-semibold"
    }, "A+", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "label d-none d-md-inline ms-1"
    }, "Larger", -1 /* CACHED */)]))])]), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row-sep d-none d-sm-inline",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Share and copy "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item action-success",
      onClick: _cache[5] || (_cache[5] = (...args) => $options.shareOnWhatsApp && $options.shareOnWhatsApp(...args)),
      title: "Share on WhatsApp",
      "aria-label": "Share on WhatsApp"
    }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "label d-none d-md-inline ms-1"
    }, "WhatsApp", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item",
      onClick: _cache[6] || (_cache[6] = (...args) => $options.copyToClipboard && $options.copyToClipboard(...args)),
      title: "Copy text",
      "aria-label": "Copy text"
    }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "label d-none d-md-inline ms-1"
    }, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item action-primary",
      onClick: _cache[7] || (_cache[7] = (...args) => $options.printEvent && $options.printEvent(...args)),
      title: "Print",
      "aria-label": "Print"
    }, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-printer"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "label d-none d-md-inline ms-1"
    }, "Print", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-item action-danger",
      onClick: _cache[8] || (_cache[8] = (...args) => $options.downloadPdf && $options.downloadPdf(...args)),
      title: "Download PDF",
      "aria-label": "Download PDF"
    }, [...(_cache[49] || (_cache[49] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-file-earmark-pdf"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "label d-none d-md-inline ms-1"
    }, "PDF", -1 /* CACHED */)]))])]), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row-sep d-none d-sm-inline",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Export "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Play Button aligned to the end "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["play-toggle play-btn-circle", {
        playing: $data.isAudioPlaying[$data.currentIndex]
      }]),
      "aria-label": $data.isAudioPlaying[$data.currentIndex] ? 'Pause audio' : 'Play audio',
      "aria-pressed": $data.isAudioPlaying[$data.currentIndex] ? 'true' : 'false',
      onClick: _cache[9] || (_cache[9] = $event => $options.toggleAudioPlayer($data.currentIndex)),
      onKeydown: [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer($data.currentIndex), ["prevent"]), ["enter"])), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleAudioPlayer($data.currentIndex), ["prevent"]), ["space"]))],
      title: $data.isAudioPlaying[$data.currentIndex] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi play-icon", $data.isAudioPlaying[$data.currentIndex] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'])
    }, null, 2 /* CLASS */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_23)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Summary and Play Button Row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Time Estimates "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-book me-1"
    }, null, -1 /* CACHED */)), _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
      class: "me-1"
    }, "Read:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.readTime) + "m", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-headphones me-1"
    }, null, -1 /* CACHED */)), _cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
      class: "me-1"
    }, "Listen:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.listenTime) + "m", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-file-earmark-word me-1"
    }, null, -1 /* CACHED */)), _cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
      class: "me-1"
    }, "Words:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.wordCount), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Summary Section (Premium) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "fade-slide",
      class: "card-teal"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.summaryText && _ctx.isVisible && $data.showSummaryBox ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
        class: "mb-0 text-dark small"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-robot me-1 me-sm-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" AI Summary ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary subtle-btn",
        onClick: _cache[12] || (_cache[12] = (...args) => $options.toggleSummary && $options.toggleSummary(...args)),
        title: $data.showSummary ? 'Hide Summary' : 'Show Summary',
        "aria-expanded": $data.showSummary ? 'true' : 'false',
        "aria-controls": "ai-summary-panel"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.showSummary ? 'bi-chevron-up' : 'bi-chevron-down'])
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary subtle-btn",
        onClick: _cache[13] || (_cache[13] = (...args) => $options.closeSummaryBox && $options.closeSummaryBox(...args)),
        title: "Close summary",
        "aria-label": "Close summary"
      }, [...(_cache[59] || (_cache[59] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-x"
      }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
        name: "fade-slide",
        persisted: ""
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          class: "summary-text small",
          innerHTML: $data.summaryText
        }, null, 8 /* PROPS */, _hoisted_34), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          class: "summary-footer mt-2 pt-2 border-top"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
          class: "text-muted"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          class: "bi bi-info-circle me-1"
        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" AI-generated summary of key points from this event. ")])], -1 /* CACHED */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.showSummary]])]),
        _: 1 /* STABLE */
      })], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 1 /* STABLE */
    }), $data.summaryError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summaryError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium Content Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "content-card rounded-20 animate-rise",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.contentVars)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      class: "content-body",
      innerHTML: $data.highlightedDescription
    }, null, 8 /* PROPS */, _hoisted_36)], 4 /* STYLE */), $data.events[$data.currentIndex].references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_37, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "References:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.events[$data.currentIndex].references), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Offcanvas Settings Panel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "offcanvas offcanvas-end custom-offcanvas",
      tabindex: "-1",
      id: "settingsOffcanvas",
      "aria-labelledby": "settingsOffcanvasLabel",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.offcanvasStyle)
    }, [_cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "offcanvas-header"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "offcanvas-title fs-3",
      id: "settingsOffcanvasLabel"
    }, "Font Settings"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn-close btn-close-white",
      "data-bs-dismiss": "offcanvas",
      "aria-label": "Close"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
      onSubmit: _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.saveSettings && $options.saveSettings(...args), ["prevent"])),
      class: "text-white"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [$data.showSuccess ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, " Changes saved successfully! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Background Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.fontSettings.backgroundColor = $event),
      class: "form-control form-control-color"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.fontSettings.backgroundColor]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Text Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "color",
      "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.fontSettings.color = $event),
      class: "form-control form-control-color"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.fontSettings.color]])]), _cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Font Size:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "btn btn-outline-light px-2 py-0",
      onClick: _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["stop"]))
    }, "−"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.fontSize) + "px", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "btn btn-outline-light px-2 py-1",
      onClick: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["stop"]))
    }, "+")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Font Style", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.fontSettings.fontStyle = $event),
      class: "form-select"
    }, [...(_cache[65] || (_cache[65] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "normal"
    }, "Normal", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "italic"
    }, "Italic", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.fontSettings.fontStyle]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Text Shadow", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => $data.fontSettings.textShadow = $event),
      class: "form-select"
    }, [...(_cache[67] || (_cache[67] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "none"
    }, "None", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "1px 1px 2px gray"
    }, "Small Shadow", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "2px 2px 4px black"
    }, "Medium Shadow", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "1px 1px 2px red"
    }, "Red Shadow", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "1px 1px 2px blue"
    }, "Blue Shadow", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.fontSettings.textShadow]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Underline", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => $data.fontSettings.textDecoration = $event),
      class: "form-select"
    }, [...(_cache[69] || (_cache[69] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "none"
    }, "None", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "underline"
    }, "Underline", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.fontSettings.textDecoration]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-label fw-bold fs-4"
    }, "Font Family", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => $data.fontSettings.fontFamily = $event),
      class: "form-select"
    }, [...(_cache[71] || (_cache[71] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Source Sans 3', sans-serif"
    }, "Source Sans 3", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "Arial, sans-serif"
    }, "Arial", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Times New Roman', serif"
    }, "Times New Roman", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Courier New', monospace"
    }, "Courier New", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "Tahoma, sans-serif"
    }, "Tahoma", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Segoe UI', sans-serif"
    }, "Segoe UI", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Open Sans', sans-serif"
    }, "Open Sans", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Roboto', sans-serif"
    }, "Roboto", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Lato', sans-serif"
    }, "Lato", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Merriweather', serif"
    }, "Merriweather", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Noto Sans', sans-serif"
    }, "Noto Sans", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "'Poppins', sans-serif"
    }, "Poppins", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.fontSettings.fontFamily]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-success mt-3",
      onClick: _cache[22] || (_cache[22] = (...args) => $options.submitFontSize && $options.submitFontSize(...args))
    }, " Submit Changes ")], 32 /* NEED_HYDRATION */)])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"fab btn btn-light rounded-circle shadow\"\n          style=\"position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: pointer;\"\n          data-bs-toggle=\"offcanvas\" data-bs-target=\"#settingsOffcanvas\" aria-controls=\"settingsOffcanvas\">\n          <i class=\"bi bi-gear-fill fs-4\"></i>\n        </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["controls text-center mt-3 mt-md-4", {
        'mb-audio-gap': $data.showAudioPlayer
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: _cache[24] || (_cache[24] = (...args) => $options.prev && $options.prev(...args)),
      disabled: $data.currentIndex === 0,
      class: "btn nav-btn me-2 btn-sm",
      "aria-label": "Previous event"
    }, "Previous", 8 /* PROPS */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: _cache[25] || (_cache[25] = (...args) => $options.next && $options.next(...args)),
      disabled: $data.currentIndex === $data.events.length - 1,
      class: "btn nav-btn btn-sm",
      "aria-label": "Next event"
    }, "Next", 8 /* PROPS */, _hoisted_44)], 2 /* CLASS */)], 8 /* PROPS */, _hoisted_12)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Custom Audio Player "), $data.showAudioPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "control-icon btn btn-link p-0",
    onClick: _cache[26] || (_cache[26] = $event => $options.rewindAudio($data.currentlyPlayingIndex)),
    title: "Rewind 10s",
    "aria-label": "Rewind 10 seconds"
  }, [...(_cache[75] || (_cache[75] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "control-icon btn btn-link p-0",
    onClick: _cache[27] || (_cache[27] = $event => $options.toggleAudioPlayer($data.currentlyPlayingIndex)),
    title: $data.isAudioPlaying[$data.currentlyPlayingIndex] ? 'Pause' : 'Play',
    "aria-label": $data.isAudioPlaying[$data.currentlyPlayingIndex] ? 'Pause' : 'Play'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.isAudioPlaying[$data.currentlyPlayingIndex] ? 'bi-pause-fill' : 'bi-play-fill'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "control-icon btn btn-link p-0",
    onClick: _cache[28] || (_cache[28] = $event => $options.fastForwardAudio($data.currentlyPlayingIndex)),
    title: "Fast Forward 10s",
    "aria-label": "Fast forward 10 seconds"
  }, [...(_cache[76] || (_cache[76] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "control-icon btn btn-link p-0",
    onClick: _cache[29] || (_cache[29] = $event => $options.stopAudio($data.currentlyPlayingIndex)),
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[77] || (_cache[77] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "control-icon btn btn-link p-0",
    onClick: _cache[30] || (_cache[30] = (...args) => $options.toggleVolume && $options.toggleVolume(...args)),
    title: "Volume",
    "aria-label": "Adjust volume"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${$data.volume > 0.5 ? 'up' : $data.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)]), $data.showVolumeBar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    "onUpdate:modelValue": _cache[31] || (_cache[31] = $event => $data.volume = $event),
    min: "0",
    max: "1",
    step: "0.1",
    onInput: _cache[32] || (_cache[32] = (...args) => $options.updateVolume && $options.updateVolume(...args)),
    class: "volume-slider",
    "aria-label": "Volume control",
    "aria-live": "polite"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.volume]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime($data.currentTime)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime($data.totalTime)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "control-icon btn btn-link p-0 close-icon",
    onClick: _cache[33] || (_cache[33] = (...args) => $options.closeAudioPlayer && $options.closeAudioPlayer(...args)),
    title: "Close",
    "aria-label": "Close audio player"
  }, [...(_cache[78] || (_cache[78] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round($data.progress[$data.currentlyPlayingIndex] || 0),
    "aria-valuetext": `Progress ${Math.round($data.progress[$data.currentlyPlayingIndex] || 0)} percent`,
    tabindex: "0",
    onKeydown: [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.keyboardSeek(-5), ["prevent"]), ["left"])), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.keyboardSeek(5), ["prevent"]), ["right"])), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.keyboardSeek(-10), ["prevent"]), ["pageDown"])), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.keyboardSeek(10), ["prevent"]), ["pageUp"]))],
    onClick: _cache[38] || (_cache[38] = $event => $options.seekAudio($event, $data.currentlyPlayingIndex)),
    "aria-label": "Seek audio"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $data.progress[$data.currentlyPlayingIndex] + '%'
    })
  }, null, 4 /* STYLE */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_51)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/MissionComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/MissionComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MissionComponent_vue_vue_type_template_id_39610a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MissionComponent.vue?vue&type=template&id=39610a88&scoped=true */ "./resources/js/components/MissionComponent.vue?vue&type=template&id=39610a88&scoped=true");
/* harmony import */ var _MissionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissionComponent.vue?vue&type=script&lang=js */ "./resources/js/components/MissionComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _MissionComponent_vue_vue_type_style_index_0_id_39610a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css */ "./resources/js/components/MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css");
/* harmony import */ var _MissionComponent_vue_vue_type_style_index_1_id_39610a88_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css */ "./resources/js/components/MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_MissionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MissionComponent_vue_vue_type_template_id_39610a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-39610a88"],['__file',"resources/js/components/MissionComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/MissionComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/MissionComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MissionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MissionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MissionComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MissionComponent_vue_vue_type_style_index_0_id_39610a88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=style&index=0&id=39610a88&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MissionComponent_vue_vue_type_style_index_1_id_39610a88_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=style&index=1&id=39610a88&lang=css");


/***/ }),

/***/ "./resources/js/components/MissionComponent.vue?vue&type=template&id=39610a88&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/MissionComponent.vue?vue&type=template&id=39610a88&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MissionComponent_vue_vue_type_template_id_39610a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MissionComponent_vue_vue_type_template_id_39610a88_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MissionComponent.vue?vue&type=template&id=39610a88&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MissionComponent.vue?vue&type=template&id=39610a88&scoped=true");


/***/ }),

/***/ "./resources/js/components/prophet_events.json":
/*!*****************************************************!*\
  !*** ./resources/js/components/prophet_events.json ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"events":[{"year":"Birth of the Prophet ﷺ (570 CE)","title":"Birth of the Prophet ﷺ","references":"Al‑Fil 105:1–5; seerah narrations (Ibn Ishaq/Ibn Hisham)","description":"The birth of Prophet Muhammad (PBUH) is a significant event in Islamic history, and there are many details surrounding his birth that hold great spiritual and historical importance for Muslims. Here’s a deeper look at his birth and the events surrounding it: \\n</br>\\n</br>1. Historical Context\\n  Prophet Muhammad (ﷺ) was born in Makkah (modern-day Mecca, Saudi Arabia) in the Year of the Elephant   approximately 570 CE. This year is named after an attempted invasion of Makkah by the Abyssinian (Ethiopian) Christian ruler Abraha, who came with an army that included elephants. According to Islamic tradition, Allah miraculously protected the Kaaba from destruction through a flock of birds (mentioned in Surah Al-Fil, Quran 105:1–5).\\n</br>\\n</br>2. Lineage and Family\\n  Muhammad (ﷺ) was born into the noble tribe of Quraysh, specifically the respected Hashimite clan.\\n  - His father, Abdullah ibn Abd al-Muttalib, died before his birth while on a trade journey.\\n  - His mother, Amina bint Wahb, belonged to the Banu Zuhra clan of Quraysh.\\n  - His grandfather, Abdul Muttalib, was the custodian of the Kaaba and a leader of the Quraysh.\\n</br>\\n</br>3. The Birth\\n  The Prophet was born on a Monday.\\n  The exact date is debated, but the widely accepted date among Sunni scholars is 12th Rabi’ al-Awwal in the Islamic calendar.\\n  Shi’a traditions sometimes mention the 17th of Rabi’ al-Awwal.\\n  Many Muslims celebrate this event as Mawlid an-Nabi (The Prophet’s Birthday), although views on its religious status vary across Islamic schools of thought.\\n</br>\\n</br>4. Miraculous Signs at Birth (According to Islamic Tradition)\\n  Islamic historical sources and narrations (like those of Ibn Ishaq, Ibn Hisham, and Al-Bayhaqi) describe several miraculous events:\\n  - A radiant light from Amina that illuminated the palaces of Busra in Syria.\\n  - Idols in the Kaaba reportedly fell down.\\n  - The Zoroastrian fire temple\'s eternal flame was extinguished.\\n  - The Sawa Lake in Persia dried up.\\n</br>\\n</br>5. Naming and Early Care\\n  He was named Muhammad, meaning “the praised one”.\\n  Amina reported she was told in a dream to name him Muhammad.\\n  On the seventh day, his head was shaved, and a sacrifice was performed (Aqiqah).\\n  He was nursed by Halima Sa\'diyyah of Banu Sa’ad, in keeping with noble Arab custom.\\n</br>\\n</br>6. Orphanhood and Early Childhood\\n  His mother Amina died when he was six years old.\\n  His grandfather Abdul Muttalib then took care of him, but died two years later.\\n  His uncle Abu Talib then raised him with great care and affection."},{"year":"Mother Passes Away (576 CE)","title":"Mother Passes Away","references":"Al‑Baqarah 2:155–157; Ar‑Ra\'d 13:28","description":"The passing away of a mother is an incredibly emotional and life-changing experience for most individuals. The event of a mother’s death typically brings a profound sense of loss, grief, and mourning, as mothers often hold a central and irreplaceable role in one’s life.\\n</br>\\n</br> Here’s a more detailed description of what happens both emotionally and physically when a mother passes away, as well as the potential reactions and coping mechanisms of the surviving family members:\\n</br>\\n</br>1. The Emotional Impact of Losing a Mother\\nInitial Shock: When a mother passes away, there is often a sense of disbelief or numbness at first. This shock can make it difficult to process the loss immediately.\\n</br>\\n</br> It may feel as though time has stopped or that it’s a bad dream.\\n\\nProfound Grief: The death of a mother creates an overwhelming grief that can vary in intensity. Some may experience uncontrollable crying, while others may retreat inwardly, struggling to process the overwhelming sadness. This grief is often not just for the mother herself but for the lost moments, dreams, and shared experiences..\\n</br>\\n</br>Anger and Resentment: Some individuals may experience anger, not just at the death itself but at the unfairness of the situation or feelings of helplessness.\\n</br>\\n</br>There may also be frustration at the inability to say goodbye or resolve unfinished conversations or conflicts.\\n\\nGuilt: In many cases, survivors may feel guilty, even if they had no control over the circumstances. Feelings like, \\"Could I have done more?\\" or \\"Did I make her proud?\\" can become overwhelming..\\n</br>\\n</br>Fear and Anxiety: Losing a mother may bring up fears of the future, such as how to navigate life without her, especially if she was a primary caregiver or emotional anchor. There can also be anxiety related to whether the family will stay together and how others in the family, especially children, will cope with the loss.\\n</br>\\n</br>2. Physical and Psychological Reactions to Grief\\nPhysical Symptoms: The emotional distress of losing a mother can manifest physically. People may experience sleep disturbances, loss of appetite, headaches, or fatigue. The body often reacts to grief as a form of stress, and many"},{"year":"Foster Care with Halima (570–575 CE)","title":"Nursed by Halima Sa\'diyyah","references":"Seerah narrations (Ibn Ishaq/Ibn Hisham)","description":"The Prophet ﷺ spent formative years under the care of Halima Sa\'diyyah from Banu Sa\'d, reflecting a noble Arab tradition that sent children to the open desert to grow in health, eloquence, and moral fiber. This period, preserved through authentic reports and well‑known seerah narrations, is remembered for the unmistakable barakah that accompanied the young Muhammad ﷺ and those around him.\\n</br>\\n</br>1. Cultural Practice and Wisdom\\n  Quraysh families commonly entrusted infants to Bedouin wet nurses so the children would learn pure Arabic, develop resilience, and avoid the ailments and social ills of congested urban life. In this setting, character was formed through simplicity, self‑reliance, and close contact with nature.\\n</br>\\n</br>2. Halima’s Selection\\n  Historical accounts relate that Halima initially found no infant to nurse due to poverty and a weak mount. When she accepted the orphan Muhammad ﷺ, blessings began immediately: her mount quickened, milk increased, and their animals thrived. These signs of divine favor not only sustained the family but also endeared the child to them.\\n</br>\\n</br>3. Growth in the Desert\\n  The young Prophet ﷺ grew in strength, clarity of speech, and composure. The desert rhythm tending animals, walking long distances, and living simply nurtured patience and observation. His remarkable manners and serenity impressed all who encountered him, and Halima’s household developed a deep, protective love for him.\\n</br>\\n</br>4. Return and Continued Care\\n  After a period in the desert, he was returned to his mother Amina in Makkah. Some narrations mention that Halima requested additional time due to her attachment and the evident barakah. Eventually, he was brought back to his family, carrying with him the fruits of a wholesome upbringing.\\n</br>\\n</br>5. Lasting Significance\\n  These early years underline Islam’s emphasis on cultivating fitrah sound natural disposition through healthy environments and virtuous caregivers. The companionship of righteous people, even in youth, leaves indelible marks on character.\\n</br>\\n</br>6. Lessons\\n  Parents and communities shape future leaders by prioritizing language, ethics, and well‑being over luxury; Allah places increase where sincerity and care prevail."},{"year":"Chest Opening (Shaqq al-Sadr)","title":"Opening of the Chest","references":"Ash‑Sharh 94:1–3; seerah narrations","description":"Among the remarkable signs granted to the Prophet ﷺ is the opening of his chest (shaqq al‑sadr), reported in authentic traditions with multiple occurrences across his life. One such instance took place in childhood while he was with Banu Sa\'d. The event emphasized inner purification, spiritual readiness, and divine preparation for a mission that would transform humanity.\\n</br>\\n</br>1. The Event as Reported\\n  Angel Jibril عليه السلام descended, opened the Prophet’s chest, removed a portion described as the ‘part of shaytan’, washed the heart with Zamzam, and returned it filled with wisdom, mercy, and faith. Children playing nearby witnessed the aftermath and ran to Halima in fear, saying that Muhammad had been taken and laid down by two men who opened his chest.\\n</br>\\n</br>2. Immediate Aftermath\\n  When the family reached him, he was calm but bore a faint mark on his chest a sign remembered later by companions. The household was understandably shaken, and reports mention Halima’s concern for his safety thereafter. Despite the awe of the moment, the child displayed composure that would foreshadow prophetic equilibrium under trial.\\n</br>\\n</br>3. Spiritual Meaning\\n  The shaqq al‑sadr symbolizes the primacy of the inner heart as the seat of faith, intention, and guidance. A purified heart perceives truth clearly, endures hardship with patience, and radiates compassion. In this light, the miracle serves as a tangible preface to the lifelong revelation that would soon commence.\\n</br>\\n</br>4. Later Parallels\\n  Reports indicate a similar opening at the start of Revelation and again before the Night Journey, each underscoring preparation for momentous stages. The repeated motif teaches that growth involves renewed purification and readiness.\\n</br>\\n</br>5. Relevance for Believers\\n  The believer’s journey mirrors this priority: sincere repentance, remembrance, and seeking knowledge polish the heart. Ethical conduct, lawful sustenance, and humility protect it from rust.\\n</br>\\n</br>6. Lessons\\n  Purification precedes mission; Allah equips His servants inwardly before outward success. A sound heart is the fountain of wisdom, courage, and mercy."},{"year":"Shepherding Years","title":"Shepherd in Makkah (Youth)","description":"The Prophet ﷺ tended flocks in and around Makkah during his youth, a vocation shared by many prophets. This humble work cultivated patience, attentiveness, mercy toward living creatures, and responsibility traits later reflected at the highest levels of leadership.\\n</br>\\n</br>1. A School of Character\\n  Shepherding demanded early mornings, long days, and careful stewardship of every animal. Weather, predators, and terrain required vigilance and calm decision‑making. In solitude, hearts soften to remembrance of Allah; in responsibility, habits of trustworthiness take root.\\n</br>\\n</br>2. Mercy and Stewardship\\n  Islam teaches compassion toward all creation. Protecting the weak, guiding the straying, and ensuring fair pasture mirror the ethics of governance. The Prophet ﷺ later taught that a woman was forgiven for quenching a dog’s thirst signals that ordinary acts of mercy elevate the soul.\\n</br>\\n</br>3. Training for Leadership\\n  The flock is a living parable for society: diverse needs, differing pace, and the necessity of firm gentleness. A shepherd leads from presence, not distance; he understands terrain before commanding movement. Such habits became hallmarks of Prophetic leadership.\\n</br>\\n</br>4. Honest Livelihood\\n  Earning by one’s own hands dignifies the soul. This period preceded his trading career and established a record of diligence and integrity recognized by Makkans, contributing to his title Al‑Amin (the Trustworthy).\\n</br>\\n</br>5. Reflection and Remembrance\\n  Vast skies, quiet valleys, and measured routines nurtured contemplation. The heart trained on dhikr finds balance, and the eye trained on creation reads signs that later inform wise judgment.\\n</br>\\n</br>6. Lessons\\n  Great leadership grows from humble service and mindful stewardship. The disciplines of patience, mercy, responsibility, and reflection formed in youth prepared the Prophet ﷺ to shepherd hearts with wisdom and care.\\n</br>\\n</br>References: Prophetic reports on shepherding (Bukhari), virtues of mercy (various ahadith)"},{"year":"Trade Journeys (Young Adulthood)","title":"Honest Trader (Pre‑610 CE)","description":"Before Prophethood, the Prophet ﷺ engaged in regional trade to Syria and beyond, building a sterling reputation as Al‑Amin (the Trustworthy). His commercial life exemplified the Qur’anic ethic later revealed: honesty, fairness, fulfillment of contracts, and compassion toward the vulnerable.\\n</br>\\n</br>1. Reputation and Trust\\n  Makkans entrusted him with deposits and business arrangements because he never betrayed trust or shaded the truth. Partners and clients noted accuracy in weights and measures, transparent pricing, and refusal to exploit need.\\n</br>\\n</br>2. Methods and Manners\\n  He prioritized quality, honored deadlines, and resolved disputes with calm equity. He was gentle with debtors and generous in accommodation. Mercy in commerce is worship; the Prophet ﷺ later praised the one who is lenient when selling, buying, and asking repayment.\\n</br>\\n</br>3. Da\'wah by Conduct\\n  Long before public preaching, his character invited hearts. People who transacted with him encountered dignity and justice. This quiet witness prepared fertile ground for later acceptance of the message.\\n</br>\\n</br>4. Lessons for Today\\n  Commerce shapes society’s ethics. When business is anchored in truth, communities flourish; when greed reigns, trust decays. The Sunnah urges contracts, clarity, and conscience, reminding traders that rizq is from Allah and that barakah follows integrity.\\n</br>\\n</br>5. From Markets to Mission\\n  His ethics in trade foreshadowed later prohibitions on fraud, riba, and exploitation. Fair dealing cultivated social trust that became an early asset for da\'wah.\\n</br>\\n</br>6. Lessons\\n  Integrity in commerce is essential worship and effective da\'wah wealth is a trust to be earned lawfully and used for good.\\n</br>\\n</br>References: Al‑Mutaffifin 83:1–3 (honesty in measures), Al‑Baqarah 2:275–281 (riba), prophetic ahadith on fair dealing"},{"year":"Marriage to Khadijah (595 CE)","title":"Marriage to Khadijah رضي الله عنها","description":"The blessed union between the Prophet ﷺ and Khadijah bint Khuwaylid رضي الله عنها stands among history’s most luminous marriages rooted in integrity, mutual respect, and unwavering support for revelation. Their home became the cradle of early Islam, a sanctuary of trust from which the light of guidance spread.\\n</br>\\n</br>1. Character and Courtship\\n  Before marriage, Muhammad ﷺ had earned the title Al‑Amin (the Trustworthy) for flawless honesty in trade. Khadijah, a noble, accomplished businesswoman, observed his fairness and excellence on journeys she commissioned. Reports indicate she was impressed by his truthfulness, compassion for the vulnerable, and refusal to exploit others.\\n</br>\\n</br>2. Proposal and Ceremony\\n  Khadijah proposed through her family, and the marriage was conducted with dignity and simplicity hallmarks of Prophetic practice. The union defied prevailing norms by elevating character above status or wealth, modeling criteria for believers across ages.\\n</br>\\n</br>3. Domestic Life and Children\\n  Their home radiated tranquility (sakinah). They were blessed with children, including Fatimah رضي الله عنها, from whom the Prophet’s noble lineage continued. The couple shared responsibilities with tenderness, building a haven of mercy that nurtured future leaders in faith.\\n</br>\\n</br>4. First Supporter of Revelation\\n  When Revelation began, the Prophet ﷺ returned from Hira trembling; Khadijah covered him, calmed his heart, and testified to his truth: “By Allah, He will never disgrace you; you uphold ties, honor guests, and aid the distressed.” She took him to Waraqah ibn Nawfal, who affirmed the signs of Prophethood. Her wealth and wisdom shielded the nascent da\'wah at its most fragile hour.\\n</br>\\n</br>5. Loyalty and Lasting Honor\\n  Even after her passing, the Prophet ﷺ remembered Khadijah’s virtues, maintaining ties with her friends and praising her uniquely. A special greeting of peace for her descended from Allah via Jibril an honor highlighting her status.\\n</br>\\n</br>6. Lessons\\n  A righteous marriage multiplies good beyond the home: it anchors faith during tests, elevates communal ethics, and models partnership grounded in devotion to Allah."},{"year":"Rebuilding the Kaaba (605 CE)","title":"Arbitration of the Black Stone (605 CE)","description":"During the Kaaba’s reconstruction after flood damage, a dispute erupted among Quraysh over who would place Al‑Hajar al‑Aswad the Black Stone back into its corner. With honor and precedence at stake, tensions quickly escalated and violence seemed imminent. The Prophet ﷺ, known already as Al‑Amin, proposed a solution that preserved dignity and unity for all.\\n</br>\\n</br>1. Context and Crisis\\n  The Kaaba, central to Arabian life, required rebuilding. Each clan coveted the privilege of restoring the Stone. Arguments intensified; weapons were contemplated. A respected elder suggested accepting the judgment of the next person to enter the sanctuary Muhammad ﷺ.\\n</br>\\n</br>2. An Inclusive Proposal\\n  He asked for a wide cloth, placed the Stone upon it, and invited a representative of each clan to take a corner. Together they lifted it toward its place; then he himself set it firmly in the wall. Honor was shared, and no tribe felt humiliated.\\n</br>\\n</br>3. Outcomes and Memory\\n  Bloodshed was averted; the solution became a model of just arbitration. The community recognized his wisdom, impartiality, and capacity to think beyond zero‑sum pride. The memory of this event strengthened trust in his leadership when Revelation later began.\\n</br>\\n</br>4. Lessons\\n  Conflicts that seem insoluble often yield to inclusive designs that preserve face while upholding justice. Leadership is the craft of turning rivalry into cooperation.\\n</br>\\n</br>5. Notes\\n  This episode years before Prophethood helped establish Muhammad’s public credibility as the trustworthy arbiter.\\n</br>\\n</br>References: Seerah narrations on Kaaba rebuild (Ibn Ishaq/Ibn Hisham)"},{"year":"First Revelation (610 CE)","title":"Iqra\' in Cave Hira (Ramadan, 610 CE)","description":"The first revelation in Cave Hira heralded the dawn of Prophethood and the revival of pure monotheism. It transformed a solitary retreat into the birthplace of a civilization anchored in mercy, justice, and knowledge.\\n</br>\\n</br>1. Solitude and Search\\n  For years, Muhammad ﷺ withdrew to Hira, contemplating the fractured moral state of society and the signs of the Creator in the heavens and earth. The cave’s silence cultivated sincerity, focus, and readiness to receive truth without distraction.\\n</br>\\n</br>2. The Command to Read\\n  In Ramadan, Angel Jibril عليه السلام appeared and embraced him, commanding, ‘Iqra’ (Read). The opening verses of Surah Al‑Alaq (96:1–5) descended: “Read in the name of your Lord who created…” Revelation began with knowledge tethered to the Divine Name an enduring paradigm that elevates seeking knowledge as worship and responsibility.\\n</br>\\n</br>3. Comfort and Confirmation\\n  Shaken by the weight of the encounter, he returned home. Khadijah رضي الله عنها embraced and reassured him, citing his virtues as proofs of Allah’s care. She brought him to Waraqah ibn Nawfal, learned in scripture, who recognized the angel of Revelation and foretold the trials ahead.\\n</br>\\n</br>4. Early Rhythm of Revelation\\n  Revelation initially came with intervals (fatrat al‑wahy), providing space for reflection and fortification. Each descent knitted scripture to lived reality, shaping a community grounded in prayer, truthfulness, and compassion.\\n</br>\\n</br>5. Meaning for Humanity\\n  The first word Read signals that guidance illuminates both heart and intellect. Knowledge divorced from ethics corrupts; knowledge guided by Revelation uplifts. The Qur\'an invites critical reflection, social reform, and spiritual excellence under the sovereignty of Allah.\\n</br>\\n</br>6. Lessons\\n  Seek knowledge in Allah’s name; rely on righteous companionship; and let revelation reform the self before calling others to the good."},{"year":"Early Secret Da\'wah (610–613 CE)","title":"Call Begins Privately (610–613 CE)","description":"After the first revelation, the Prophet ﷺ began inviting those closest to him to Islam with care and discretion. This early phase, conducted largely in private, laid deep spiritual roots, built trust, and formed a resilient nucleus for the public call to come.\\n</br>\\n</br>1. First Circles of Faith\\n  Khadijah رضي الله عنها believed without hesitation. Abu Bakr, a respected merchant, embraced quickly and became a key advocate. Ali ibn Abi Talib, raised in the Prophet’s home, and Zayd ibn Harithah, his freed companion, also accepted each bringing distinct networks and strengths.\\n</br>\\n</br>2. Methods and Places\\n  Teaching emphasized tawhid, prayer, moral renewal, and service. Personal meetings protected believers from harassment while focusing on sincere understanding. The House of Al‑Arqam near Safa became a sanctuary for learning Qur’an, building fraternity, and cultivating courage.\\n</br>\\n</br>3. Character as Proof\\n  The Prophet’s impeccable honesty and compassion validated the message. Converts testified that his conduct embodied the values he preached: mercy, justice, and trustworthiness. In an environment saturated with idolatry and social injustice, this contrast was persuasive.\\n</br>\\n</br>4. Growth and Discretion\\n  Numbers grew steadily across clans and backgrounds young and old, wealthy and poor, enslaved and free. Careful discretion allowed faith to mature without needless confrontation while believers strengthened ties through prayer and charity.\\n</br>\\n</br>5. Early Companionship\\n  Small circles nurtured lifelong bonds of trust and mutual aid. The ethic of sincerity (ikhlas) and steadfastness (thabat) matured away from spectacle.\\n</br>\\n</br>6. Lessons\\n  Grassroots transformation begins with hearts aligned to Allah, consistent teaching, and small circles of trust. Lasting movements are built quietly before they are announced publicly.\\n</br>\\n</br>References: Al‑Mudaththir 74:1–7; Al‑Muzzammil 73:1–10 (early spiritual training)"},{"year":"Public Call (613 CE)","title":"Open Invitation to Islam (613 CE)","description":"After several years of quiet invitation among trusted circles, the Prophet ﷺ was commanded to proclaim the message openly. The shift from private cultivation to public proclamation transformed the moral landscape of Makkah and modeled principles for truth‑telling in hostile climates.\\n</br>\\n</br>1. The Call from Mount Safa\\n  He gathered Quraysh atop Safa and used a powerful analogy: if he warned of an approaching army, would they trust him? Upon their affirmation, he called them to worship Allah alone, abandon idols, and prepare for the Hereafter. The clarity, brevity, and moral weight of that moment established the tone of Prophetic communication truthful, direct, and compassionate.\\n</br>\\n</br>2. Early Reactions\\n  Some listeners were shaken; others resisted fiercely. Abu Lahab responded with scorn, leading to the revelation of Surah Al‑Masad, exposing the fate of stubborn arrogance. Ridicule, propaganda, and pressure mounted as the elites sought to preserve social hierarchies and economic interests bound to idol worship.\\n</br>\\n</br>3. Methods of Opposition\\n  Persecution targeted vulnerable believers such as Bilal رضي الله عنه and the family of Yasir. Social boycotts, misinformation, and attempts at negotiation or compromise (asking the Prophet ﷺ to alternate worship) were deployed. Each tactic failed against the resilience of revelation and the community’s patience.\\n</br>\\n</br>4. Prophetic Character in Public\\n  The Prophet ﷺ remained truthful, forbearing, and consistent neither provoked into harshness nor seduced into moral concessions. He recited the Qur’an publicly, cared for neighbors, and upheld covenants, disarming slander through exemplary conduct.\\n</br>\\n</br>5. Formation of a Moral Minority\\n  As opposition hardened, the believers formed a principled minority defined by tawhid, prayer, charity, and mutual support. The House of Al‑Arqam became a haven of learning and transformation, producing confident, ethical personalities.\\n</br>\\n</br>6. Lessons\\n  Public da\'wah requires courage with clarity, steadfast ethics, and service. Truth neither flatters power nor seeks needless provocation; it appeals to hearts with reasoned argument, moral beauty, and trust in Allah.\\n</br>\\n</br>References: Ash‑Shu\'ara 26:214; Al‑Hijr 15:94; Al‑Masad 111:1–5"},{"year":"Boycott of Banu Hashim (616–619 CE)","title":"Social and Economic Boycott (616–619 CE)","description":"When persuasion and ridicule failed to halt Islam’s growth, Quraysh escalated to collective punishment. They drafted a pact to isolate the Prophet ﷺ, Banu Hashim, and supporters cutting trade, marriage, and social ties forcing them into the valley of Shi\'b Abi Talib. The boycott was a test of endurance, fraternity, and trust in Allah.\\n</br>\\n</br>1. Terms and Enforcement\\n  The document, reportedly hung in the Kaaba, prohibited any dealings with the Prophet ﷺ’s clan unless he was surrendered. Merchants inflated prices; allies were threatened; even basic supplies were obstructed. Yet protection afforded by tribal custom led by Abu Talib prevented direct assassination.\\n</br>\\n</br>2. Hardship and Solidarity\\n  Food grew scarce. Narrations describe believers surviving on leaves and leather; the cries of hungry children pained the valley. Despite deprivation, faith deepened. Families shared whatever they had, and nightly attempts were made by compassionate Meccans to smuggle provisions past enforcers.\\n</br>\\n</br>3. Moral Stance of Fair‑Minded Meccans\\n  Conscience stirred among some Quraysh who opposed the injustice. Individuals like Hisham ibn Amr and others conspired to end the pact, appealing to honor and kinship. The Prophet ﷺ stood firm without inciting chaos, letting moral pressure and divine decree unwind oppression.\\n</br>\\n</br>4. End of the Boycott\\n  Reports state that insects consumed the pact except the Name of Allah, symbolically invalidating its terms. In the Haram, opponents challenged the boycott’s legitimacy, and the pact was torn down. The community emerged physically weakened but spiritually tempered.\\n</br>\\n</br>5. Long‑Term Impact\\n  The ordeal forged a resilient, empathetic community ready to shoulder future responsibilities. It exposed the cruelty of idolatrous politics while showcasing justice, patience, and unity as superior social bonds.\\n</br>\\n</br>6. Lessons\\n  Oppression withers before steadfast faith, principled alliances, and appeals to conscience. Communities survive hardship through solidarity, honest advocacy, and reliance upon Allah.\\n</br>\\n</br>References: Al‑Ankabut 29:2–3; Al‑Balad 90:12–17"},{"year":"Year of Sorrow (619 CE)","title":"Khadijah and Abu Talib Pass (619 CE)","description":"The ninth or tenth year after Revelation is remembered as \'Aam al‑Huzn the Year of Sorrow because two pillars of support departed: Khadijah رضي الله عنها, the Prophet’s beloved wife and first believer, and Abu Talib, his uncle and protector by tribal custom. The losses intensified persecution yet unveiled the Prophetic model of patience, gratitude, and continued service.\\n</br>\\n</br>1. Farewell to Khadijah\\n  Khadijah’s faith, generosity, and wisdom sheltered the message at its most vulnerable stage. Her home was the first sanctuary of Islam. With her passing, the Prophet ﷺ lost a confidant who soothed his fears and championed his mission. His enduring loyalty remembering her gifts, honoring her friends illustrates love rooted in faith and gratitude.\\n</br>\\n</br>2. Passing of Abu Talib\\n  Abu Talib’s protection, though he did not embrace Islam, deterred Quraysh from direct harm. His death emboldened enemies to escalate abuse, knowing tribal deterrence had weakened. The Prophet ﷺ responded without bitterness, entrusting the outcomes to Allah while pressing on with the call.\\n</br>\\n</br>3. Increased Hardship, Expanded Vision\\n  With local support diminished, the Prophet ﷺ broadened outreach beyond Makkah, seeking receptive hearts elsewhere. The Year of Sorrow thus catalyzed strategic reorientation, including efforts that led to later pledges from Yathrib.\\n</br>\\n</br>4. Emotional Honesty and Spiritual Resilience\\n  The seerah preserves the Prophet’s tears and grief, showing that deep emotion complements not contradicts trust in Allah. He mourned with dignity, prayed with presence, and continued acts of mercy despite personal pain.\\n</br>\\n</br>5. Consolations from Revelation\\n  Verses reminding of divine care, patience, and the Hereafter soothed hearts during this time. The Prophet ﷺ taught believers to respond to loss with sabr, dua, and renewed service turning grief into a wellspring of empathy and resolve.\\n</br>\\n</br>6. Lessons\\n  Loss can widen horizons when anchored in tawakkul. Communities must support their leaders and one another through bereavement, translating grief into renewed purpose, compassion, and strategic action for the common good.\\n</br>\\n</br>References: Al‑Baqarah 2:155–157; Az‑Zumar 39:10"},{"year":"Ta\'if Journey (619 CE)","title":"Call to Ta\'if (619 CE)","description":"In the wake of the Year of Sorrow, the Prophet ﷺ traveled to Ta\'if seeking hearts open to guidance and protection for the believers. The journey became a timeless lesson in perseverance, dignity under abuse, and mercy for opponents.\\n</br>\\n</br>1. Purpose and Approach\\n  Ta\'if, a significant city, held potential allies. The Prophet ﷺ presented the message to its leaders with clarity and goodwill, inviting them to support truth and benefit their people with justice and worship of Allah alone.\\n</br>\\n</br>2. Painful Rejection\\n  The leaders mocked the call and incited youths to chase and stone him. His sandals filled with blood; Zayd ibn Harithah shielded him and suffered wounds. The humiliation was severe, yet the Prophet ﷺ neither retaliated nor cursed embodying patience and restraint.\\n</br>\\n</br>3. The Famous Supplication\\n  Taking refuge in an orchard, he raised a moving dua, confessing his weakness, affirming Allah’s mercy, and asking only that Allah not be displeased with him declaring that divine pleasure suffices over all worldly relief. This prayer distills Prophetic resilience: honest vulnerability joined to unwavering trust.\\n</br>\\n</br>4. Glimpses of Mercy\\n  The owners of the orchard sent a servant with grapes; he was Addas, a Christian from Nineveh. A brief conversation about Yunus عليه السلام led Addas to recognize the Prophet’s truth and kiss his head and hands a sign that sincere hearts respond even amid general rejection.\\n</br>\\n</br>5. Aftermath and Hope\\n  As he left, Angel Jibril offered to crush the town between mountains; the Prophet ﷺ refused, hoping their descendants would believe. Events soon confirmed that seeds were planted elsewhere: pilgrims from Yathrib later embraced the call, paving the path to Hijrah.\\n</br>\\n</br>6. Lessons\\n  True leadership absorbs injury without vengeance, prays through pain, and keeps laboring with hope. Dignity in defeat today can become the foundation of victory tomorrow by Allah’s leave."},{"year":"Isra and Mi\'raj (620/621 CE)","title":"Night Journey and Ascension (620/621 CE)","description":"The Isra and Mi\'raj an extraordinary night journey and ascension consoled the Prophet ﷺ after intense trials, honored him among prophets, and gifted the Ummah with the five daily prayers. It binds the sanctities of Makkah, Jerusalem, and the heavens in a single thread of worship.\\n</br>\\n</br>1. The Night Journey (Isra)\\n  By Allah’s will, the Prophet ﷺ traveled from Masjid al‑Haram in Makkah to Masjid al‑Aqsa in Jerusalem. The journey affirmed the sanctity of Al‑Aqsa and the continuity of the Abrahamic mission. He led previous prophets in prayer, symbolizing the finality and universality of his message.\\n</br>\\n</br>2. The Ascension (Mi\'raj)\\n  From Jerusalem, he ascended through the heavens, meeting Adam, Isa, Yahya, Yusuf, Idris, Harun, Musa, and Ibrahim عليهم السلام, each greeting him. He beheld signs beyond ordinary perception and reached Sidrat al‑Muntaha, a boundary of divine mysteries.\\n</br>\\n</br>3. Gift of Salah\\n  Initially obligated at fifty, Salah was mercifully reduced to five with reward of fifty. Prayer became a daily ascent for every believer structured remembrance that purifies the heart, orders the day, and anchors community life.\\n</br>\\n</br>4. Trials of Belief\\n  The event tested faith in unseen realities. Some wavered; Abu Bakr رضي الله عنه affirmed instantly, earning the title As‑Siddiq. The Prophet’s precise description of a caravan and of Al‑Aqsa further silenced detractors.\\n</br>\\n</br>5. Consolation and Resolve\\n  After the Year of Sorrow and Ta’if, this honor fortified hearts. The linkage of sacred sites announced a global horizon and reminded believers that patience and prayer open doors.\\n</br>\\n</br>6. Lessons\\n  Salah is the lifeline of faith, connecting earth to heaven. The journey unites sacred spaces and peoples under tawhid, teaching that dignity and liberation flow from worship, patience, and trust in Allah.\\n</br>\\n</br>References: Al‑Isra 17:1; An‑Najm 53:13–18; Al‑Baqarah 2:238"},{"year":"Pledges of Aqabah (621–622 CE)","title":"Ansar Pledge Support (621–622 CE)","description":"The Pledges of Aqabah, made during Hajj seasons just outside Makkah, were decisive covenants that transformed a persecuted mission into a protected movement. Delegations from Yathrib (later Madinah) met the Prophet ﷺ at night near Aqabah, embracing Islam and pledging support in terms that would birth a new community.\\n</br>\\n</br>1. First Pledge (al‑\'Aqabah al‑Ula)\\n  A small group from Yathrib already primed by Jewish monotheistic presence and their own longing for peace accepted Islam and pledged to avoid major sins, uphold moral duties, and refrain from infanticide and falsehood. The pledge focused on personal reform and basic communal ethics, laying a foundation of sincerity before strategy.\\n</br>\\n</br>2. Teaching and Momentum\\n  The Prophet ﷺ sent Mus\'ab ibn \'Umayr رضي الله عنه to Yathrib to teach Qur’an and establish prayer. Mus\'ab’s wisdom, gentleness, and recitation endeared the message to diverse households. Islam spread rapidly across clans that had long been divided, revealing that truthful character and consistent teaching are the most persuasive da\'wah.\\n</br>\\n</br>3. Second Pledge (al‑\'Aqabah al‑Thaniyah)\\n  A much larger group returned the following year, offering not only belief but protection. They pledged to defend the Prophet ﷺ as they defend their own families, to obey in ease and hardship, and to speak the truth. This covenant introduced a clear political dimension: willing guardianship, law‑abiding commitment, and readiness to bear consequences for justice.\\n</br>\\n</br>4. Strategic Turning Point\\n  With guardianship assured, the door opened for Hijrah. The pledge was not a quest for dominance but a framework for peace, equity, and worship without persecution. It prefigured the Constitution of Madinah and the brotherhood that would bind migrants and hosts.\\n</br>\\n</br>5. Lessons\\n  Sustainable change begins with character formation, competent teachers, and clear covenants. Communities flourish when loyalty to truth transcends tribal rivalry, and when protection is offered not for privilege but for the common good under Allah."},{"year":"Hijrah to Madinah (622 CE)","title":"Migration and New Beginning (Rabi’ al‑Awwal, 1 AH / 622 CE)","description":"The Hijrah from Makkah to Madinah reshaped history, turning a persecuted minority into a principled community rooted in worship, justice, and mutual support. It remains a paradigm of strategic foresight, reliance upon Allah, and institution‑building.\\n</br>\\n</br>1. Causes and Intention\\n  Years of persecution in Makkah intensified after the death of Khadijah and Abu Talib. Pledges at al‑Aqabah opened a door: people in Yathrib invited the Prophet ﷺ to lead and reconcile their factions. Migration was undertaken purely for Allah, seeking a place to worship and live by revelation.\\n</br>\\n</br>2. Planning and Secrecy\\n  The Prophet ﷺ prepared meticulously. With Abu Bakr رضي الله عنه, he left by night, hid in the Cave of Thawr, and relied on trusted allies Asma’ bint Abi Bakr, Abdullah ibn Abi Bakr, and a skilled guide. Pursuers reached the cave’s mouth, yet Allah protected them; even the most determined enemies could not breach divine care.\\n</br>\\n</br>3. Journey and Trust\\n  The path northward tested resolve. Incidents like Suraqah ibn Malik’s pursuit thwarted as his horse sank show Allah’s promise at work and the Prophet’s calm assurance of future victories. Travel embodied tawakkul (trust) paired with prudent means.\\n</br>\\n</br>4. Arrival and Foundations\\n  The Ansar welcomed him with joy; the city became Al‑Madinah al‑Munawwarah. Masjid an‑Nabawi was established as the heart of worship, education, and governance. Brotherhood joined Muhajirun and Ansar in mutual support, while the Constitution of Madinah set a just framework among communities.\\n</br>\\n</br>5. Calendar and Meaning\\n  The Islamic calendar begins from Hijrah, centering our sense of time on sacrifice and renewal. It reminds believers that principled migration leaving what Allah forbids toward what He loves is a perennial act of faith.\\n</br>\\n</br>6. Lessons\\n  Success requires sincere intention, careful planning, righteous allies, and institutions that anchor faith and serve society."},{"year":"Masjid an‑Nabawi Built (622 CE)","title":"Founding the Mosque (622 CE)","description":"Upon arriving in Yathrib, the Prophet ﷺ established Masjid an‑Nabawi a simple structure that became the beating heart of faith and society. More than a prayer space, it was a house of knowledge, justice, charity, consultation, and brotherhood, modeling how institutions anchor thriving communities.\\n</br>\\n</br>1. Site and Construction\\n  The land was owned by orphan boys; it was purchased and honored. The Prophet ﷺ participated personally in construction, carrying bricks and chanting with the companions. The structure had palm trunks for pillars, a roof of fronds, and a shaded suffah area for learners and the poor. Simplicity conveyed accessibility and sincerity.\\n</br>\\n</br>2. Core Functions\\n  The mosque gathered believers five times daily, cultivated Qur’anic literacy, hosted delegations, and adjudicated disputes. It served as a treasury point for charity, a coordination hub for welfare, and a place of counseling and reconciliation. The suffah community students devoted to learning signaled a continuous pipeline for knowledge and service.\\n</br>\\n</br>3. Leadership and Consultation\\n  Decisions were discussed openly; revelation guided principles while shura refined application. The mosque nurtured qualities of humility, courage, patience, and cooperation virtues later reflected in governance and foreign relations.\\n</br>\\n</br>4. Social Inclusion\\n  The poor, travelers, new Muslims, and delegations found welcome. Women participated in learning; converts were integrated without stigma. The adhan, resonating from this center, structured time around remembrance and responsibility.\\n</br>\\n</br>5. Civic Life and Economy\\n  From this hub, welfare was coordinated, markets were regulated for fairness, and disputes were mediated with mercy. The mosque thus knit spiritual life to public ethics, ensuring religion uplifted daily transactions.\\n</br>\\n</br>6. Lessons\\n  Institutions built on worship, knowledge, justice, and compassion unify diverse people and outlast hardship. Masjid an‑Nabawi remains the archetype: a house of Allah that elevates individuals and binds society to a common moral horizon.\\n</br>\\n</br>References: Al‑Nur 24:36–37 (masajid and remembrance)"},{"year":"Brotherhood and Constitution (622 CE)","title":"Ummah Cohesion (622 CE)","description":"With the Hijrah complete, the Prophet ﷺ rapidly wove the social fabric of a new city through two masterstrokes: establishing brotherhood between migrants (Muhajirun) and helpers (Ansar), and drafting the Constitution of Madinah. Together they transformed diverse tribes and religious communities into a rule‑governed society under Allah.\\n</br>\\n</br>1. Brotherhood (Mu’akhah)\\n  Pairs were formed between Muhajirun who left wealth behind and Ansar who volunteered support. The Ansar offered homes, trade partnerships, and land; the migrants brought skills, resilience, and unwavering commitment. The bond was spiritual and practical, affirming dignity through mutual assistance rather than charity alone.\\n</br>\\n</br>2. Constitution of Madinah\\n  The charter recognized Muslims as one Ummah and outlined relations with Jewish tribes and other residents. It guaranteed security, justice, and freedom of worship; forbade treachery; and instituted collective defense. Disputes were referred to Allah and His Messenger for final judgment embedding rule of law over personal whims.\\n</br>\\n</br>3. Civic Ethos\\n  The social order privileged truthfulness, contracts, and compassion. Zakat and voluntary charity circulated resources. Consultation informed decisions; mercy tempered power. This ethos diffused tensions that had long plagued Yathrib’s clans, especially Aws and Khazraj.\\n</br>\\n</br>4. Inclusion and Plurality\\n  Non‑Muslim residents retained religious practice and communal identity within the legal framework, proving that security and dignity can coexist with difference.\\n</br>\\n</br>5. Long‑Term Impact\\n  The model scaled: diverse groups could live securely under a moral constitution. The framework later guided treaties, markets, and adjudication beyond Madinah.\\n</br>\\n</br>6. Lessons\\n  Cohesion arises where spiritual brotherhood meets just law. Societies prosper when rights and duties are clear, assistance is dignified, and final reference is revelation rather than factional interest.\\n</br>\\n</br>References: Al‑Hashr 59:9–10 (brotherhood, Ansar virtues)"},{"year":"Battle of Badr (624 CE)","title":"Decisive Victory (Ramadan, 2 AH / 624 CE)","description":"Badr was the first major armed encounter after the Hijrah, where a small Muslim force outnumbered and under‑equipped faced the marching might of Quraysh. It became a landmark of faith, strategy, and divine support that reshaped regional power and believer morale.\\n</br>\\n</br>1. Lead‑Up and Intent\\n  Muslims set out to intercept a trade caravan financing persecution. Quraysh mobilized a large army to protect economic interests and crush the nascent community. The confrontation near the wells of Badr was not sought for glory but to secure justice and survival.\\n</br>\\n</br>2. Positioning and Preparation\\n  On the counsel of companions, the Prophet ﷺ advanced to control the wells, denying the enemy easy water. Lines were drawn with discipline; youthful zeal was tempered by measured leadership. The night before, sleep settled upon believers as a mercy; rain firmed their ground and slicked the enemy’s.\\n</br>\\n</br>3. Supplication and Assurance\\n  The Prophet ﷺ stretched his arms in earnest dua until his cloak fell, pleading for victory lest the earth be devoid of worshippers of Allah. Revelation promised support; angels reinforced hearts divine aid aligned with human effort.\\n</br>\\n</br>4. Outcome and Aftermath\\n  Quraysh suffered decisive losses; key leaders were felled. Prisoners were treated with unexpected mercy and educated, signaling a civilization that values knowledge even in conflict. The victory validated the community’s path and deterred aggression.\\n</br>\\n</br>5. Ethics and Restraint\\n  Orders discouraged excess; captives were fed, and ransoms were balanced with public welfare and education. War conduct was subordinated to conscience.\\n</br>\\n</br>6. Lessons\\n  Victory requires taqwa, unity, competent strategy, and reliance on Allah. Ethical conduct in war mercy, justice, and honoring covenants distinguishes Islamic civilization from vengeance‑driven tribalism.\\n</br>\\n</br>References: Al‑Anfal 8:9–12, 8:17, 8:61"},{"year":"Battle of Uhud (625 CE)","title":"Trials and Lessons (Shawwal, 3 AH / 625 CE)","description":"One year after Badr, Quraysh sought to restore honor with a major campaign against Madinah. The confrontation at Uhud delivered painful losses for Muslims and timeless guidance for communities learning from setbacks.\\n</br>\\n</br>1. Pre‑Battle Deliberation\\n  Inside Madinah, counsel weighed defense within the city versus meeting the enemy outside. The Prophet ﷺ accepted the opinion of many youths to face them at Uhud, modeling consultation even when outcomes are unknown to the consulted.\\n</br>\\n</br>2. Initial Advantage\\n  Archers were posted on a strategic hill with explicit orders not to leave their positions. The early phase favored Muslims; Quraysh lines wavered and retreat began.\\n</br>\\n</br>3. Turn of the Tide\\n  Seeing spoils, a number of archers abandoned posts contrary to instructions. Khalid ibn al‑Walid then fighting against the Muslims exploited the gap with cavalry, striking the flank and causing disarray. Many were wounded; rumors spread that the Prophet ﷺ was killed.\\n</br>\\n</br>4. Courage and Protection\\n  The Prophet ﷺ was injured, yet companions like Talhah and Umm \'Ammarah defended him bravely. The community regrouped on high ground, avoiding annihilation by resolve and divine mercy.\\n</br>\\n</br>5. Revelation and Reform\\n  Quranic verses in Al‑Imran reframed the loss: victory and defeat are tests; obedience matters more than outcomes; and steadfastness after error earns forgiveness. The lesson was not humiliation but maturation.\\n</br>\\n</br>6. Lessons\\n  Leadership requires clear commands and disciplined execution. Setbacks, when met with repentance and learning, become steps toward greater resilience, unity, and trust in Allah."},{"year":"Battle of the Trench (627 CE)","title":"Confederates Repelled (Shawwal–Dhul‑Qa‘dah, 5 AH / 627 CE)","description":"The Battle of the Trench (al‑Khandaq), also called the Battle of the Confederates (al‑Ahzab), was a defining defensive campaign in which Madinah, outnumbered and encircled by allied tribes, survived through strategic innovation, communal perseverance, and divine aid.\\n</br>\\n</br>1. Strategic Innovation\\n  On Salman al‑Farisi’s suggestion drawing on Persian experience a trench was dug along vulnerable northern approaches to Madinah, turning cavalry advantage into stalemate. The community labored side by side, including the Prophet ﷺ, whose participation lifted morale amid cold and hunger.\\n</br>\\n</br>2. Siege Conditions\\n  A vast confederation led by Quraysh and allied tribes sought to crush the Muslims. Supplies were strained; nights were frigid; fear and fatigue weighed heavily. The Qur’an records believers’ hearts reaching their throats, yet also praises their steadfastness and trust in Allah.\\n</br>\\n</br>3. Internal Threats Managed\\n  While external forces camped outside, internal hypocrisy and wavering tested cohesion. The Prophet ﷺ maintained vigilance, organized patrols, and relied on trustworthy companions to prevent panic. Diplomacy, intelligence, and prayer worked in concert.\\n</br>\\n</br>4. Turning of the Tide\\n  Allah sent piercing winds and confusion among the confederates; tents were uprooted and unity frayed. Skirmishes near the trench failed to breach lines. The siege dissolved without a full open battle an outcome that reversed the momentum of aggression and signaled that Madinah was not easily broken.\\n</br>\\n</br>5. Aftermath and Meaning\\n  The confederates withdrew in frustration; Quraysh prestige waned. From this point, initiative shifted to the Muslims. The event taught that patient preparation, communal labor, and reliance upon Allah can neutralize overwhelming force.\\n</br>\\n</br>6. Lessons\\n  Strategic defense is not passivity: it is intelligent restraint that buys time, preserves life, and exposes unjust aggression. Communities prevail by combining planning, unity, and sincere tawakkul.\\n</br>\\n</br>References: Al‑Ahzab 33:9–27"},{"year":"Treaty of Hudaybiyyah (628 CE)","title":"Peace Opens Doors (Dhul‑Qa‘dah, 6 AH / 628 CE)","description":"Hudaybiyyah was a watershed of prophetic statecraft. Intending \'umrah, the Prophet ﷺ and companions donned ihram and journeyed peacefully toward Makkah. Quraysh blocked entry, leading to negotiations at al‑Hudaybiyyah that produced a truce whose terms seemed lopsided but proved profoundly beneficial.\\n</br>\\n</br>1. The Oath Under the Tree\\n  When rumors spread that \'Uthman sent as an envoy had been harmed, the believers pledged under a tree to stand firm (Bay\'at al‑Ridwan). Revelation praised them, cementing unity before talks concluded.\\n</br>\\n</br>2. Terms that Tested Hearts\\n  The treaty deferred \'umrah to the following year, required returning certain individuals, and omitted prophetic titles from the document. Some companions struggled emotionally; the Prophet ﷺ modeled obedience to the agreement and trust in Allah’s wisdom, performing sacrificial rites despite sorrow.\\n</br>\\n</br>3. Strategic Gains\\n  The truce opened safe routes and cooled hostilities, allowing da\'wah to spread through travel and correspondence. Many embraced Islam during this calm including notable figures previously hostile. The time secured by patience achieved more than force would have at that moment.\\n</br>\\n</br>4. Legal and Ethical Precedent\\n  The treaty illustrated honoring covenants even when painful, distinguishing Islamic diplomacy by integrity. It affirmed that justice and long‑term welfare can require restraint over immediate vindication.\\n</br>\\n</br>5. Lessons\\n  Peace, when principled and purposeful, multiplies guidance. Leadership means reading the horizon, accepting temporary concessions for enduring gains, and healing hearts through example.\\n</br>\\n</br>References: Al‑Fath 48:1–3, 48:18"},{"year":"Khaybar (628 CE)","title":"Fortresses Opened (Muharram–Safar, 7 AH / 628 CE)","description":"The campaign of Khaybar addressed persistent hostilities emanating from a cluster of well‑fortified oases north of Madinah. It combined patience in siege tactics with courage in close combat, culminating in agreements that stabilized the frontier and showcased Islamic ethics in victory.\\n</br>\\n</br>1. Strategic Context\\n  Khaybar’s forts commanded fertile land and trade nodes. Some inhabitants had supported prior aggression against Madinah. Neutralizing threats here would secure the community and its livelihoods.\\n</br>\\n</br>2. Siege and Scarcity\\n  The Muslims advanced methodically, facing stone strongholds, limited water, and the strain of lengthy operations. The Prophet ﷺ organized lines, encouraged patience, and prohibited excess war was restrained by law and conscience.\\n</br>\\n</br>3. Valor and Leadership\\n  The banner was promised to one whom Allah and His Messenger love. It was given to Ali ibn Abi Talib رضي الله عنه, who advanced with unwavering trust. His courage, coupled with discipline across the ranks, broke key defenses and inspired the army.\\n</br>\\n</br>4. Ethical Settlements\\n  After openings, agreements preserved life and allowed cultivation under fair terms, channeling resources into a just order while preventing cycles of revenge. Mercy in victory signaled that the aim was security and guidance, not plunder.\\n</br>\\n</br>5. Legacy and Stability\\n  Agricultural productivity and regional security improved under fair arrangements, integrating Khaybar’s economy into a broader ethic of justice.\\n</br>\\n</br>6. Lessons\\n  Strength must be principled: courage with restraint, victory with justice, and governance with clarity. Sustainable peace flows from fairness more than force.\\n</br>\\n</br>References: Al‑Hashr 59:7 (distribution), general seerah reports"},{"year":"Letters to Rulers (628–629 CE)","title":"Global Invitation (7–8 AH / 628–629 CE)","description":"With internal security rising after Hudaybiyyah, the Prophet ﷺ extended Islam’s invitation beyond Arabia through letters and envoys. The correspondence was dignified, Qur’anic in tone, and universal in scope, affirming that the message addresses all peoples and rulers without compulsion.\\n</br>\\n</br>1. Recipients and Messengers\\n  Letters went to Heraclius (Byzantium), Kisra (Persia), the Negus (Abyssinia), and leaders in Egypt, Bahrain, and elsewhere. Trusted companions served as envoys, modeling courtesy, clarity, and personal integrity essential messengers of a moral civilization.\\n</br>\\n</br>2. Content and Style\\n  The letters invoked the name of Allah, honored recipients, and called to Tawhid, justice, and salvation. They cited Qur’anic verses, inviting without insult, and appealed to shared Abrahamic heritage where relevant.\\n</br>\\n</br>3. Varied Responses\\n  Reactions ranged from respect to hostility. Heraclius reportedly recognized signs of Prophethood; Kisra tore the letter a gesture met by a prophecy of his downfall. The Negus responded favorably, consistent with earlier protection of refugees from Makkah.\\n</br>\\n</br>4. Global Vision\\n  These letters declared Islam’s universal horizon: a faith for all nations, concerned with hearts and ethics rather than conquest for its own sake. Diplomacy, trade, and scholarship would become conduits of guidance far beyond the peninsula.\\n</br>\\n</br>5. Lessons\\n  Convey truth with dignity, contextual wisdom, and courage. Not every heart will accept, but principled outreach plants seeds that flourish across time and borders.\\n</br>\\n</br>References: Saba’ 34:28 (universal message), Al‑Imran 3:64 (common word)"},{"year":"Conquest of Makkah (630 CE)","title":"Makkah Embraces Islam (Ramadan, 8 AH / 630 CE)","description":"The opening of Makkah was the culmination of years of patient endurance, principled treaties, and steady outreach. It unfolded with minimal bloodshed and maximal mercy, transforming the religious heart of Arabia.\\n</br>\\n</br>1. Cause for March\\n  A violation of the Hudaybiyyah truce by Quraysh’s allies created just cause. The Prophet ﷺ advanced with a disciplined army, forbidding harm to non‑combatants and property. Lanterns illuminated the valleys as multiple contingents encamped, signaling strength without cruelty.\\n</br>\\n</br>2. Entry in Humility\\n  The Prophet ﷺ entered with head bowed upon his mount, magnifying Allah. No triumphal arrogance marked the moment; gratitude defined it. Commanders were instructed to avoid fighting unless attacked; pockets of resistance quickly subsided.\\n</br>\\n</br>3. General Amnesty and Justice\\n  He declared a wide amnesty “Go, for you are free” while addressing a handful of individuals accountable for severe crimes. Mercy was the rule, justice the exception, demonstrating that the aim was reconciliation and reform, not revenge.\\n</br>\\n</br>4. Purifying the Sanctuary\\n  Idols were removed from the Kaaba as the Prophet ﷺ recited verses of truth. The sanctuary returned to the worship of Allah alone, restoring Abrahamic monotheism at its source. Keys were returned to rightful custodians, and rights around the Haram were reaffirmed.\\n</br>\\n</br>5. Social Healing and Guidance\\n  He addressed the people, abolishing claims of superiority based on lineage and confirming the sanctity of life and property. Former enemies felt secure under a just order. Many embraced Islam upon witnessing magnanimity and integrity.\\n</br>\\n</br>6. Lessons\\n  Real power is moral: humility in victory, mercy toward foes, and firmness in justice produce lasting change. Reform flows from sanctifying worship, securing rights, and modeling character that wins hearts."},{"year":"Hunayn and Ta\'if (630 CE)","title":"After Makkah’s Opening","description":"Soon after the peaceful opening of Makkah, the community faced new trials at Hunayn and during the subsequent campaign to Ta\'if. These episodes taught that victory can be followed by testing, and that reliance on Allah not numbers secures success.\\n</br>\\n</br>1. The Valley of Hunayn\\n  A large Muslim force advanced against Hawazin and Thaqif. At dawn in the narrow valley, an ambush caused initial panic; some scattered as arrows rained. The moment exposed the danger of depending on numerical strength. The Prophet ﷺ remained firm upon his mule, calling out, “I am the Prophet without lie, I am the son of \'Abd al‑Muttalib,” rallying companions back into organized ranks.\\n</br>\\n</br>2. Recovery and Victory\\n  Steadfastness, re‑formed lines, and divine aid turned the tide. Enemy forces broke; captives and spoils were taken in great number. The lesson settled deeply: triumph follows patience, discipline, and reliance on Allah never pride in resources.\\n</br>\\n</br>3. Distribution and Hearts\\n  The Prophet ﷺ distributed spoils with wisdom to reconcile hearts, granting to new Muslims among Quraysh and tribal leaders. Some Ansar felt overlooked, but his tender address reminded them that they had the Prophet ﷺ returning with them to Madinah greater than any worldly gain. Their tears and renewed love healed the moment.\\n</br>\\n</br>4. Siege of Ta\'if\\n  The campaign moved to Ta\'if’s fortified city. Defenders used arrows and hot metal; siege engines and tactics were employed by the Muslims, yet the city held. The Prophet ﷺ chose patience and withdrawal rather than prolonged bloodshed, leaving room for guidance to ripen over time. Many from those tribes later embraced Islam willingly.\\n</br>\\n</br>5. Lessons\\n  After major victories, tests often follow to purify intentions. Leadership must heal hearts, prioritize unity, and prefer guidance over destruction. Prudence in siege ending it when costs outweigh benefit reflects prophetic mercy and foresight."},{"year":"Tabuk (631 CE)","title":"Northern Expedition (Rajab, 9 AH / 631 CE)","description":"The expedition to Tabuk was undertaken amid scorching heat, scarce provisions, and a distant frontier testing sincerity and discipline more than combat itself. It showcased readiness that deterred conflict and refined the community’s moral order.\\n</br>\\n</br>1. Call to a Difficult March\\n  The Prophet ﷺ announced openly a northern expedition, giving time to prepare. Some lagged with excuses; others gave generously, including \'Uthman’s notable contribution. Those without mounts wept when they could not join, revealing hearts eager for sacrifice.\\n</br>\\n</br>2. Hardship and Organization\\n  The army traversed barren stretches with limited water and provisions. Rationing, rotating mounts, and mutual care sustained morale. The Prophet ﷺ nurtured resolve through dua, counsel, and practical measures, forbidding waste and maintaining justice.\\n</br>\\n</br>3. Deterrence without Battle\\n  Reaching Tabuk, confrontation with the great powers did not materialize. Nevertheless, treaties with local chiefs were concluded, security improved, and the region recognized the Muslims’ growing stature. Sometimes the very appearance of principled strength averts war.\\n</br>\\n</br>4. Hypocrisy Exposed, Repentance Accepted\\n  The expedition unmasked hypocrites and refined believers. Three sincere companions Ka\'b ibn Malik, Murarah, and Hilal stayed behind without valid excuse; their truthful repentance was accepted after a period of social discipline, immortalized in Qur’an, modeling accountability and mercy.\\n</br>\\n</br>5. Lessons\\n  Readiness, transparency, and shared sacrifice knit communities together. Strategic presence can secure peace; sincere repentance restores trust and dignity under divine guidance."},{"year":"Delegations Year (631 CE)","title":"\'Aam al‑Wufud (10 AH / 631 CE)","description":"Following the stabilization of the Peninsula, tribes arrived in succession to Madinah in what became known as \'Aam al‑Wufud the Year of Delegations. It was a season of education, diplomacy, and integration, where hearts were won through clarity, justice, and hospitality.\\n</br>\\n</br>1. Reception and Protocol\\n  Delegations were welcomed with dignity and seated in the mosque, reflecting openness and equal access. Questions were invited; doubts were addressed without ridicule. The Prophet ﷺ listened attentively and responded with concise wisdom.\\n</br>\\n</br>2. Teaching the Essentials\\n  Core matters tawhid, salah, zakah, and moral conduct were taught first. Emissaries learned how to call their people with gentleness, establish prayer, and adjudicate fairly. Letters and envoys sometimes accompanied them to guide local implementation.\\n</br>\\n</br>3. Local Leadership and Custom\\n  Rather than impose uniformity, wise allowance was made for harmless customs. Justice, not cultural erasure, was the goal. Chiefs who embraced Islam were encouraged to lead with humility, turning influence toward service and equity.\\n</br>\\n</br>4. Social Bonds and Welfare\\n  Hospitality, gifts, and fair agreements deepened trust. The needy were supported; grievances were heard. The Year of Delegations thus spread not only creed but a lived ethic of compassion and order.\\n</br>\\n</br>5. Lessons\\n  Long‑term guidance travels best through educated local leaders and institutions. Respectful dialogue, fair treatment, and practical instruction root faith deeply across diverse peoples."},{"year":"Farewell Pilgrimage (632 CE)","title":"Hajj al‑Wada\' (Dhul‑Hijjah, 10 AH / 632 CE)","description":"The Farewell Pilgrimage gathered a vast multitude as the Prophet ﷺ modeled the rites of Hajj and delivered a comprehensive sermon that distilled Islam’s ethics. It was a moment of culmination, gratitude, and clear guidance for the Ummah’s future.\\n</br>\\n</br>1. Teaching the Rites\\n  The Prophet ﷺ performed Hajj with meticulous care, saying, “Take your rites from me.” From ihram to tawaf, sa\'i, standing at Arafah, Muzdalifah, and Mina, he demonstrated a balanced path free of superstition and excess, anchoring the pilgrimage in remembrance, supplication, and mercy.\\n</br>\\n</br>2. The Farewell Sermon\\n  In \'Arafah and on the Days of Tashriq, he emphasized the sanctity of life, property, and honor; abolished usury and blood feuds; urged kindness to women; and upheld the brotherhood of believers: “No Arab is superior to a non‑Arab, nor a non‑Arab to an Arab, except by taqwa.” He reminded the Ummah to hold fast to the Qur’an and Sunnah.\\n</br>\\n</br>3. Completion and Gratitude\\n  Many reports connect the revelation, “Today I have perfected your religion for you…” (Quran 5:3), to this period, signaling the completion of the divine favor. The Prophet ﷺ expressed deep gratitude and humility, modeling worship at the height of success.\\n</br>\\n</br>4. Universal Vision\\n  The gathering prefigured Islam’s global community diverse peoples united in worship and ethics. The Hajj embodied equality before Allah and disciplined movement toward shared good.\\n</br>\\n</br>5. Lessons\\n  Leadership means demonstrating practice, safeguarding justice, and uniting people around enduring principles. The Farewell Pilgrimage remains a living syllabus of faith, law, and character."},{"year":"Passing of the Prophet ﷺ (632 CE)","title":"Return to the Highest Companion (Rabi’ al‑Awwal, 11 AH / 632 CE)","description":"The Prophet ﷺ returned to his Lord after completing the mission and establishing a community guided by revelation. His final illness and passing are narrated with intimate detail, offering lessons in leadership, patience, and continuity.\\n</br>\\n</br>1. Final Days\\n  He suffered fever and weakness, yet continued advising the Ummah: prayer, care for the weak, and expelling injustices. He asked, “Have I conveyed?” and received the companions’ affirmation. He sought permission to remain in Aisha’s رضي الله عنها apartment during illness.\\n</br>\\n</br>2. Moments of Guidance\\n  He reminded: “Prayer, prayer and what your right hands possess,” underscoring worship and justice. He cautioned against grave‑worship and upheld monotheism. His humility and reliance on Allah were evident to the end.\\n</br>\\n</br>3. The Passing\\n  Resting with his head upon Aisha’s chest, he departed as the miswak moistened his mouth a scene of tenderness and dignity. The Ummah was shaken; grief swept Madinah.\\n</br>\\n</br>4. Abu Bakr’s Steadfast Address\\n  Abu Bakr رضي الله عنه entered, kissed the Prophet ﷺ, and addressed the people reciting, “Muhammad is no more than a messenger…” (Quran 3:144). Hearts steadied; the principle was clear: devotion is to Allah, and leadership proceeds upon revelation.\\n</br>\\n</br>5. Burial and Continuity\\n  He was buried in Aisha’s room. The companions convened to secure succession; Abu Bakr was chosen as Khalifah. The community moved from shock to service preserving Quran, implementing justice, and carrying the message forward.\\n</br>\\n</br>6. Lessons\\n  The Sunnah guides beyond the life of its bearer. Stability comes from institutions, consultation, and unwavering adherence to the Book of Allah and the Prophetic model."}]}');

/***/ })

}]);