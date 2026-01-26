
import { jsPDF } from 'jspdf';
// JSON modules default-export the entire object; access its events property.
import eventsData from '../vue/prophet_events.json';

export default {
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
        fontFamily: "'Nunito', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      },
      events: [],
      originalEvents: [],
      showSuccess: false,
      currentIndex: 0,
      selectedVoice: null,
      ttsState: 'stopped', // 'playing' | 'paused' | 'stopped'
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
      lastVolumeBeforeMute: 1,
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
      _pendingProgress: null,
    };
  },
  computed: {
    offcanvasStyle() {
      return {
        backgroundColor: '#10584f',
        width: window.innerWidth < 576 ? '100%' : '400px',
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
        '--content-font-family': this.fontSettings.fontFamily || "'Nunito', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        '--content-font-size': size,
      };
    },
    currentEvent() {
      return this.events[this.currentIndex] || {};
    },
    timelineProgress() {
      if (!this.events.length) return 0;
      return Math.round(((this.currentIndex + 1) / this.events.length) * 100);
    },
    displayIndex() {
      return this.events.length ? this.currentIndex + 1 : 0;
    },
    // heavy computeds removed; we now update cached values in updateCurrentMetrics
  },
  mounted() {
    const saved = localStorage.getItem('userFontSettings');
    if (saved) {
      this.fontSettings = JSON.parse(saved);
      if (this.fontSettings.fontFamily && this.fontSettings.fontFamily.includes('Source Sans')) {
        this.fontSettings.fontFamily = "'Nunito', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
      }
    }
    window.addEventListener('resize', this.updateOffcanvasWidth);
    // Track scroll to update tab title at top
    try { this._originalTitle = document.title; } catch (_) { this._originalTitle = 'Islamic Connect'; }
    window.addEventListener('scroll', this.handleScrollForTitle, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.synth.onvoiceschanged = this.loadVoices;
    this.loadVoices();
    // Restore dismissal/minimized state for Next Step banner
    try {
      if (localStorage.getItem('missionNextStepDismissed') === '1') this.showNextStep = false;
      this.nextStepMinimized = localStorage.getItem('missionNextStepMinimized') === '1';
    } catch (_) { }
    // Preprocess events once for performance
    const preprocess = (e) => {
      const div = document.createElement('div');
      div.innerHTML = e.description || '';
      const plain = (div.textContent || div.innerText || '').trim();
      const wc = plain ? plain.split(/\s+/).length : 0;
      return { ...e, _plainText: plain, _wordCount: wc, _readTime: Math.ceil(wc / 200), _listenTime: Math.ceil(wc / 150) };
    };
    this.events = ((eventsData && eventsData.events) || []).map(preprocess);
    this.originalEvents = this.events.slice();
    this.initializeAudioStates();
    this.initializeTooltips();
    this.updateCurrentMetrics();
    this.updateDocumentTitle();
    // Ensure document has bottom padding when audio player is visible
    if (this.showAudioPlayer) {
      try { document.body.classList.add('with-audio-player'); } catch (_) { }
    }
    // Observe visibility (e.g., when inside hidden tabs/pills)
    this.$nextTick(() => {
      try {
        this._io = new IntersectionObserver((entries) => {
          if (!entries || !entries.length) return;
          const vis = !!entries[0].isIntersecting;
          this.isVisible = vis;
          if (!vis && (this.synth?.speaking || this.synth?.paused)) {
            this.stopAudio(this.currentlyPlayingIndex);
          }
          if (vis) {
            // Defer heavy updates to next frame to avoid tab-switch jank
            requestAnimationFrame(() => this.updateCurrentMetrics());
            this.initializeTooltips();
          }
        }, { root: null, threshold: 0 });
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
      try { this._io.disconnect(); } catch (_) { }
      this._io = null;
    }
    try { document.body.classList.remove('with-audio-player'); } catch (_) { }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
      try { localStorage.setItem('missionNextStepMinimized', this.nextStepMinimized ? '1' : '0'); } catch (_) { }
    },
    dismissNextStep() {
      this.showNextStep = false;
      try { localStorage.setItem('missionNextStepDismissed', '1'); } catch (_) { }
    },
    handleScrollForTitle() {
      this.updateDocumentTitle();
    },
    updateDocumentTitle() {
      const base = this._originalTitle || 'Islamic Connect';
      const atTop = (typeof window !== 'undefined') ? (window.scrollY <= 0) : true;
      const currentTitle = this.events && this.events[this.currentIndex] ? this.events[this.currentIndex].title : '';
      try {
        document.title = atTop && currentTitle ? `${base}   ${currentTitle}` : base;
      } catch (_) { }
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
    focusSearchInput() {
      const el = this.$refs.searchInput;
      if (el && el.focus) el.focus();
    },
    keyboardSeek(deltaPercent) {
      const idx = this.currentlyPlayingIndex;
      if (idx == null || !this.utterance || !this.isAudioPlaying[idx]) return;
      const current = this.progress[idx] || 0;
      const next = Math.min(100, Math.max(0, current + deltaPercent));
      // Simulate by canceling and restarting at target percent
      const wordCount = this.countWords(this.currentTtsText);
      const newWordIndex = Math.round((next / 100) * wordCount);
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
      this.utterance.onboundary = (event) => this.updateProgress(event, idx, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[idx] = true;
      this.ttsState = 'playing';
      this.progress[idx] = next;
      const wordsPerSecond = 150 / 60;
      this.currentTime = (newWordIndex / wordsPerSecond);
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
        this.selectedVoice = voices.find(voice =>
          voice.lang === 'en-US' &&
          (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Jenny') || voice.name.includes('Samantha'))
        ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
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
      this.utterance.onboundary = (event) => this.updateProgress(event, index, startWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.updateTotalTime();
      if (startWordIndex > 0) {
        const wordCount = this.countWords(ttsText);
        this.progress[index] = (startWordIndex / wordCount) * 100;
        this.currentTime = (startWordIndex / wordCount) * this.totalTime;
      }
      try { document.body.classList.add('with-audio-player'); } catch (_) { }
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
      try { document.body.classList.remove('with-audio-player'); } catch (_) { }
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
      this.utterance.onboundary = (event) => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = (newWordIndex / wordCount) * 100;
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
      this.utterance.onboundary = (event) => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = (newWordIndex / wordCount) * 100;
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
      this.utterance.onboundary = (event) => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = (newWordIndex / wordCount) * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    updateProgress(event, index, startWordIndex = 0) {
      if (event.name !== 'word' || !this.utterance) return;
      if (document.hidden || !this.isVisible) return;
      const text = this.currentTtsText || '';
      const words = text.split(/\s+/).filter(Boolean);
      const currentWordIndex = startWordIndex + Math.round((event.charIndex / this.utterance.text.length) * (words.length - startWordIndex));
      const pct = (currentWordIndex / words.length) * 100;
      const time = (currentWordIndex / words.length) * this.totalTime;
      this._pendingProgress = { index, pct, time };
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
    toggleMute() {
      if (this.volume > 0) {
        this.lastVolumeBeforeMute = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.lastVolumeBeforeMute || 1;
      }
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
      this.scrollEventContentToTop();
    },
    scrollToEvent(index) {
      const refs = this.$refs.eventRefs;
      if (refs && refs[index]) {
        const el = refs[index];
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < 0 || rect.bottom > vh) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }
    },
    scrollEventContentToTop() {
      this.$nextTick(() => {
        const target = this.$refs.eventDetails;
        if (target && typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (typeof document !== 'undefined') {
          const docEl = document.documentElement || document.body;
          if (docEl && typeof docEl.scrollTo === 'function') {
            docEl.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
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
        const offcanvas = bootstrap.Offcanvas.getInstance(
          document.getElementById('settingsOffcanvas')
        );
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
          try { idoc.focus(); idoc.print(); } catch (_) { }
          setTimeout(() => { try { document.body.removeChild(iframe); } catch (_) { } }, 1000);
        }, 400);
      } catch (_) { /* no-op */ }
    },
    async downloadPdf() {
      try {
        const ev = this.events[this.currentIndex] || {};
        const title = (ev.title || '').trim() || 'Event';
        const rawHtml = ev.description || '';
        const blocks = this.buildPdfBlocks(rawHtml);

        // Create a plain-text PDF (more reliable across browsers)
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        // Attempt to embed Unicode-friendly fonts if available in /public/fonts
        const fonts = await this.embedPdfFonts(doc);
        const fontBody = fonts?.body || { family: 'Times', style: 'normal' };
        const fontHeading = fonts?.heading || { family: fontBody.family, style: 'bold' };
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
        blocks.forEach((blk) => {
          if (!blk.text) { y += 8; return; }
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
            lines.forEach((ln) => {
              if (y + lh > pageHeight - margin) { doc.addPage(); y = margin; }
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
      const pushParagraph = (text) => {
        const t = (text || '').replace(/\s+/g, ' ').trim();
        if (t) blocks.push({ type: 'paragraph', text: t });
      };
      const walk = (node) => {
        if (!node) return;
        const nodeName = (node.nodeName || '').toLowerCase();
        // Ignore stray text nodes at root level to avoid fragmentation
        if (nodeName.match(/^h[1-6]$/)) {
          blocks.push({ type: 'heading', text: (node.textContent || '').trim() });
          return;
        }
        if (nodeName === 'ul' || nodeName === 'ol') {
          let num = 1;
          Array.from(node.children || []).forEach((li) => {
            if (li.nodeName.toLowerCase() === 'li') {
              const t = (li.textContent || '').replace(/\s+/g, ' ').trim();
              if (t) blocks.push({ type: 'bullet', text: t, num: nodeName === 'ol' ? num++ : null });
            }
          });
          return;
        }
        if (nodeName === 'br') {
          blocks.push({ type: 'paragraph', text: '' });
          return;
        }
        if (nodeName === 'p' || nodeName === 'div' || nodeName === 'section' || nodeName === 'article') {
          let t = (node.textContent || '')
            .replace(/\s+/g, ' ')
            .replace(/\s*\n\s*/g, ' ')
            .trim();
          if (t) {
            // If paragraph contains multiple hyphen-led items, convert to bullets
            const hyphenItems = t.match(/(?:^|\s)[-– ]\s+[^-– ].+?(?=(?:\s[-– ]\s)|$)/g);
            const numberedItems = t.match(/(?:^|\s)(\d+)\.\s+.+?(?=(?:\s\d+\.)|$)/g);
            if (hyphenItems && hyphenItems.length >= 3) {
              hyphenItems.forEach(item => {
                const txt = item.replace(/^\s*[-– ]\s+/, '').trim();
                if (txt) blocks.push({ type: 'bullet', text: txt });
              });
            } else if (numberedItems && numberedItems.length >= 3) {
              let n = 1;
              numberedItems.forEach(item => {
                const txt = item.replace(/^\s*\d+\.\s+/, '').trim();
                if (txt) blocks.push({ type: 'bullet', text: txt, num: n++ });
              });
            } else {
              blocks.push({ type: 'paragraph', text: t });
            }
          }
          return;
        }
        Array.from(node.childNodes || []).forEach(walk);
      };
      Array.from(container.childNodes || []).forEach(walk);
      const plain = (this.stripHtml(rawHtml || '') || '').replace(/\s+/g, ' ').trim();
      const pushNumberedFromPlain = (txt) => {
        // Build numbered items from inline "1. ... 2. ..." pattern
        const re = /(\d+)\.\s+/g;
        const items = [];
        let lastIndex = 0; let m; let order = [];
        while ((m = re.exec(txt)) !== null) { order.push({ n: parseInt(m[1], 10), i: m.index }); }
        if (order.length >= 2) {
          for (let k = 0; k < order.length; k++) {
            const start = order[k].i + (order[k].n.toString().length + 2); // skip "N. "
            const end = k + 1 < order.length ? order[k + 1].i : txt.length;
            const slice = txt.slice(start, end).trim();
            if (slice) items.push({ type: 'bullet', num: k + 1, text: slice });
          }
        }
        return items;
      };
      const pushBulletsFromPlain = (txt) => {
        // Build bullets from repeated hyphen markers
        const parts = txt.split(/(?:^|\s)[\-– ]\s+/).map(s => s.trim()).filter(Boolean);
        if (parts.length >= 2) {
          return parts.map(t => ({ type: 'bullet', text: t }));
        }
        return [];
      };
      const chunkSentences = (txt) => {
        const sents = txt.split(/(?<=[.!?])\s+(?=[A-Z0-9"“'])/).map(s => s.trim()).filter(Boolean);
        if (!sents.length) return [];
        const out = [];
        const group = 3; // 2-3 sentences per paragraph
        for (let i = 0; i < sents.length; i += group) {
          out.push({ type: 'paragraph', text: sents.slice(i, i + group).join(' ') });
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
        return [{ type: 'paragraph', text: plain }];
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
          return [{ type: 'paragraph', text: plain }];
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
      return { y };
    },
    async embedPdfFonts(doc) {
      const tryAdd = async (url, vfsName, family, style) => {
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) return false;
          const buf = await res.arrayBuffer();
          const b64 = this._arrayBufferToBase64(buf);
          doc.addFileToVFS(vfsName, b64);
          doc.addFont(vfsName, family, style);
          return true;
        } catch (_) { return false; }
      };
      const okRegular = await tryAdd('/fonts/NotoSans-Regular.ttf', 'NotoSans-Regular.ttf', 'NotoSans', 'normal');
      const okBold = await tryAdd('/fonts/NotoSans-Bold.ttf', 'NotoSans-Bold.ttf', 'NotoSans', 'bold');
      if (okRegular) {
        const body = { family: 'NotoSans', style: 'normal' };
        const heading = { family: 'NotoSans', style: okBold ? 'bold' : 'normal' };
        return { body, heading };
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
        doc.text(label, width - margin, height - Math.max(18, Math.round(9 * 1.4)), { align: 'right' });
      }
    },
    sanitizeForPdf(text) {
      if (!text) return '';
      let t = String(text)
        .replace(/\u00A0/g, ' ') // nbsp
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/[‐‑– ]/g, '-') // hyphen, non-breaking hyphen, en/em dash
        .replace(/…/g, '...')
        .replace(/\u200B|\u200E|\u200F/g, ''); // zero-width/RTL marks
      // Replace common Islamic marks with ASCII form
      t = t.replace(/[ﷺؐﷻ]+/g, '(PBUH)');
      // Strip combining diacritics
      try { t = t.normalize('NFD').replace(/\p{Diacritic}+/gu, ''); } catch (_) { }
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
        const filtered = this.originalEvents.filter(e =>
          (e.title || '').toLowerCase().includes(query) ||
          (e._plainText || '').toLowerCase().includes(query) ||
          (e.year || '').toLowerCase().includes(query)
        );
        this.events = filtered;
        this.currentIndex = 0;
        this.updateCurrentMetrics();
      }, 200);
    },
    clearSearch() {
      if (!this.searchQuery) return;
      this.searchQuery = '';
      this.filterEvents();
    },
    copyToClipboard() {
      const rawHtml = this.events[this.currentIndex]?.description || '';
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
        const tokenize = (s) => (s.toLowerCase().match(/[a-zA-Z'’]+|\d{1,4}/g) || []);
        const unique = (arr) => Array.from(new Set(arr));
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
          if (!toks.length) return { s, idx, score: -Infinity };
          let score = 0;
          // term frequency weight
          toks.forEach(t => { score += (tf[t] || 0); });
          // domain keyword boost
          domain.forEach(k => { if (s.toLowerCase().includes(k)) score += 2.5; });
          // verbs boost (action)
          verbs.forEach(v => { if (s.toLowerCase().includes(v)) score += 1.5; });
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
          return { s, idx, score };
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
            this.$refs.summarySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    },
  },
  watch: {
    fontSettings: {
      handler(newVal) {
        localStorage.setItem('fontSettings', JSON.stringify(newVal));
      },
      deep: true,
    },
    currentIndex() {
      this.summaryText = '';
      this.summaryError = '';
      this.showSummary = true;
      this.showSummaryBox = true;
    },
  },
};
