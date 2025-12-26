<template>
  <div class="p-3 mission-shell" :class="{ 'pb-audio-gap': showAudioPlayer }">

    <div class="row py-3 justify-content-center text-center mb-3 mission-hero">
      <div class="col-lg-10 col-xl-10">
        <h1 class="display-5 fw-bold mission-hero__title">Seerah Timeline</h1>
        <p class="lead mission-hero__lead">
          The Seerah Timeline offers an insightful journey through the life of Prophet Muhammad (PBUH).
        </p>
      </div>
    </div>

    <!-- Next Step: From Qur'an History to Seerah Timeline -->
    <div class="container px-2">
      <div class="mx-auto mb-4 next-step-card animate-rise">
        <div class="next-step-actions" role="group" aria-label="Next step actions">
          <button
            type="button"
            class="icon-btn"
            :title="nextStepMinimized ? 'Restore' : 'Minimize'"
            :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
            @click.stop="toggleNextStepMinimized">
            <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
          </button>
        </div>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="next-step-icon"><i class="fas fa-praying-hands"></i></div>
          </div>
          <div class="flex-grow-1">
            <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
              NEXT STEP
            </p>
            <!-- Minimized teaser -->
            <div v-show="nextStepMinimized" class="mb-2 next-step-teaser">
              <a href="/dua" class="fw-semibold text-decoration-none next-step-link">
                Explore Du‘a collection
              </a>
              <i class="fas fa-arrow-up-right-from-square ms-1 text-brand"></i>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
              Learning the Prophet’s blessed journey is a beautiful beginning. When you feel ready, take a gentle step into
              heartfelt supplications, explore a simple, welcoming the
              <a href="/dua" class="fw-semibold text-decoration-none next-step-link">
                Du‘a collection
              </a>
              for daily moments of connection.
            </p>
            <a v-show="!nextStepMinimized" href="/dua"
               class="btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta">
              Explore Du‘a
              <i class="fas fa-arrow-up-right-from-square ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <nav class="timeline-wrapper container" aria-label="Seerah timeline">
      <ol class="timeline mb-3" role="list" @keydown="onTimelineKeydown" ref="timelineNav" tabindex="0">
        <li v-for="(event, index) in events" :key="event.id || event.year || index" class="timeline-point"
          role="listitem" ref="eventRefs">
          <button class="badge fs-6 timeline-badge" type="button" :class="{ active: index === currentIndex }"
            :aria-current="index === currentIndex ? 'step' : null"
            :aria-label="`Year ${event.year}. ${index === currentIndex ? 'Current event' : 'Activate to view details'}`"
            :tabindex="index === currentIndex ? 0 : -1" @click="selectEvent(index)">
            {{ event.year }}
          </button>
        </li>
      </ol>
    </nav>

    <transition name="fade" mode="out-in" class="container">
      <div v-if="events.length" :key="currentIndex" class="event-box event-details" role="region"
        :aria-labelledby="`event-title-${currentIndex}`">
        <div v-if="copySuccess" class="alert alert-success" role="status" aria-live="polite">
          Text copied to clipboard!
        </div>

        <div class="fw-bold display-6 text-center mb-3" :id="`event-title-${currentIndex}`">{{
          events[currentIndex].title }}</div>

        <!-- Combined Controls and Info Row -->
        <div class="d-flex justify-content-center align-items-center gap-2 gap-sm-4 mb-3 mb-md-4 flex-wrap">
          <!-- Actions Toolbar (evenly spaced row) -->
          <div class="action-row shadow-sm bg-white" role="toolbar" aria-label="Event actions toolbar">
            <!-- AI Summary -->
            <div class="action-group" role="group" aria-label="AI tools">
              <button class="action-item" @click="summarizeEvent" :disabled="summaryLoading"
                :aria-busy="summaryLoading ? 'true' : 'false'" title="AI Summary" aria-label="AI Summary">
                <i class="bi" :class="summaryLoading ? 'bi-hourglass-split' : 'bi-robot'"></i>
                <span class="label d-none d-sm-inline">{{ summaryLoading ? 'Generating...' : 'AI Summary'
                  }}</span>
              </button>
            </div>

            <div class="row-sep d-none d-sm-inline" aria-hidden="true"></div>

            <!-- Font size controls -->
            <div class="action-group" role="group" aria-label="Font size">
              <button class="action-item" @click="decFont" title="Decrease font size"
                aria-label="Decrease font size">
                <span class="fw-semibold">A−</span>
                <span class="label d-none d-md-inline ms-1">Smaller</span>
              </button>
              <button class="action-item" @click="incFont" title="Increase font size"
                aria-label="Increase font size">
                <span class="fw-semibold">A+</span>
                <span class="label d-none d-md-inline ms-1">Larger</span>
              </button>
            </div>

            <div class="row-sep d-none d-sm-inline" aria-hidden="true"></div>

            <!-- Share and copy -->
            <div class="action-group" role="group" aria-label="Share and copy">
              <button class="action-item action-success" @click="shareOnWhatsApp" title="Share on WhatsApp"
                aria-label="Share on WhatsApp">
                <i class="bi bi-whatsapp"></i>
                <span class="label d-none d-md-inline ms-1">WhatsApp</span>
              </button>
              <button class="action-item" @click="copyToClipboard" title="Copy text"
                aria-label="Copy text">
                <i class="bi bi-clipboard"></i>
                <span class="label d-none d-md-inline ms-1">Copy</span>
              </button>
              <button class="action-item action-primary" @click="printEvent" title="Print" aria-label="Print">
                <i class="bi bi-printer"></i>
                <span class="label d-none d-md-inline ms-1">Print</span>
              </button>
              <button class="action-item action-danger" @click="downloadPdf" title="Download PDF"
                aria-label="Download PDF">
                <i class="bi bi-file-earmark-pdf"></i>
                <span class="label d-none d-md-inline ms-1">PDF</span>
              </button>
            </div>

            <div class="row-sep d-none d-sm-inline" aria-hidden="true"></div>

            <!-- Export -->
            <div class="action-group" role="group" aria-label="Export">
              
              <!-- Play Button aligned to the end -->
              <button class="play-toggle play-btn-circle" :class="{ playing: isAudioPlaying[currentIndex] }"
                :aria-label="isAudioPlaying[currentIndex] ? 'Pause audio' : 'Play audio'"
                :aria-pressed="isAudioPlaying[currentIndex] ? 'true' : 'false'" @click="toggleAudioPlayer(currentIndex)"
                @keydown.enter.prevent="toggleAudioPlayer(currentIndex)"
                @keydown.space.prevent="toggleAudioPlayer(currentIndex)"
                :title="isAudioPlaying[currentIndex] ? 'Pause' : 'Play'">
                <i class="bi play-icon" :class="isAudioPlaying[currentIndex] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- AI Summary and Play Button Row -->
        <div class="container d-flex align-items-center flex-wrap gap-3 mb-3 mb-md-4">
          <!-- Time Estimates -->
          <div class="d-flex container align-items-center flex-wrap text-center gap-2 gap-sm-3" role="group"
            aria-label="Time estimates">
            <span class="stat-chip"><i class="bi bi-book me-1"></i><strong class="me-1">Read:</strong> {{ readTime }}m</span>
            <span class="stat-chip"><i class="bi bi-headphones me-1"></i><strong class="me-1">Listen:</strong> {{ listenTime }}m</span>
            <span class="stat-chip"><i class="bi bi-file-earmark-word me-1"></i><strong class="me-1">Words:</strong> {{ wordCount }}</span>
          </div>
        </div>

        <!-- AI Summary Section (Premium) -->
        <transition name="fade-slide" class="card-teal">
          <div v-if="summaryText && isVisible && showSummaryBox"
            class="ai-summary-inline card-teal premium-surface mt-3 mt-md-4 p-2 p-md-3 rounded-20 animate-rise" ref="summarySection">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="mb-0 text-dark small">
                <i class="bi bi-robot me-1 me-sm-2"></i>
                AI Summary
              </h6>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary subtle-btn" @click="toggleSummary"
                  :title="showSummary ? 'Hide Summary' : 'Show Summary'" :aria-expanded="showSummary ? 'true' : 'false'"
                  aria-controls="ai-summary-panel">
                  <i class="bi" :class="showSummary ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary subtle-btn" @click="closeSummaryBox" title="Close summary"
                  aria-label="Close summary">
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>

            <transition name="fade-slide">
              <div v-show="showSummary" id="ai-summary-panel" role="region" aria-live="polite">
                <div class="summary-text small" v-html="summaryText"></div>
                <div class="summary-footer mt-2 pt-2 border-top">
                  <small class="text-muted">
                    <i class="bi bi-info-circle me-1"></i>
                    AI-generated summary of key points from this event.
                  </small>
                </div>
              </div>
            </transition>
          </div>
        </transition>
        <div v-if="summaryError" class="alert alert-danger mt-2">
          {{ summaryError }}
        </div>

        <!-- Premium Content Card -->
        <div class="content-card rounded-20 animate-rise" :style="contentVars">
          <article class="content-body" v-html="highlightedDescription"></article>
        </div>
        <div v-if="events[currentIndex].references" class="mt-2 small text-muted">
          <strong>References:</strong>
          <span>{{ events[currentIndex].references }}</span>
        </div>



        <!-- Offcanvas Settings Panel -->
        <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="settingsOffcanvas"
          aria-labelledby="settingsOffcanvasLabel" :style="offcanvasStyle">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fs-3" id="settingsOffcanvasLabel">Font Settings</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div class="d-flex flex-column">
            <form @submit.prevent="saveSettings" class="text-white">
              <div class="d-flex flex-column gap-3">
                <div v-if="showSuccess" class="alert alert-success">
                  Changes saved successfully!
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Background Color</label>
                  <input type="color" v-model="fontSettings.backgroundColor" class="form-control form-control-color" />
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Text Color</label>
                  <input type="color" v-model="fontSettings.color" class="form-control form-control-color" />
                </div>
                <label class="form-label fw-bold fs-4">Font Size:</label>
                <div class="d-flex align-items-center gap-3">
                  <div class="btn btn-outline-light px-2 py-0" @click.stop="decreaseFontSize">−</div>
                  <div class="fw-bold fs-5">{{ fontSize }}px</div>
                  <div class="btn btn-outline-light px-2 py-1" @click.stop="increaseFontSize">+</div>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Font Style</label>
                  <select v-model="fontSettings.fontStyle" class="form-select">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Text Shadow</label>
                  <select v-model="fontSettings.textShadow" class="form-select">
                    <option value="none">None</option>
                    <option value="1px 1px 2px gray">Small Shadow</option>
                    <option value="2px 2px 4px black">Medium Shadow</option>
                    <option value="1px 1px 2px red">Red Shadow</option>
                    <option value="1px 1px 2px blue">Blue Shadow</option>
                  </select>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Underline</label>
                  <select v-model="fontSettings.textDecoration" class="form-select">
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                  </select>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Font Family</label>
                  <select v-model="fontSettings.fontFamily" class="form-select">
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="Tahoma, sans-serif">Tahoma</option>
                    <option value="'Segoe UI', sans-serif">Segoe UI</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lato', sans-serif">Lato</option>
                    <option value="'Merriweather', serif">Merriweather</option>
                    <option value="'Noto Sans', sans-serif">Noto Sans</option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                  </select>
                </div>
              </div>
              <button class="btn btn-success mt-3" @click="submitFontSize">
                Submit Changes
              </button>
            </form>
          </div>
        </div>

        <!-- <div class="fab btn btn-light rounded-circle shadow"
          style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: pointer;"
          data-bs-toggle="offcanvas" data-bs-target="#settingsOffcanvas" aria-controls="settingsOffcanvas">
          <i class="bi bi-gear-fill fs-4"></i>
        </div> -->

        <div class="controls text-center mt-3 mt-md-4" :class="{ 'mb-audio-gap': showAudioPlayer }">
          <button @click="prev" :disabled="currentIndex === 0" class="btn nav-btn me-2 btn-sm"
            aria-label="Previous event">Previous</button>
          <button @click="next" :disabled="currentIndex === events.length - 1" class="btn nav-btn btn-sm"
            aria-label="Next event">Next</button>
        </div>
      </div>
    </transition>

    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container" role="region" aria-label="Audio player">
      <div class="custom-audio-player">
        <div class="controls audio-controls">
          <button class="control-icon btn btn-link p-0" @click="rewindAudio(currentlyPlayingIndex)" title="Rewind 10s"
            aria-label="Rewind 10 seconds">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button class="control-icon btn btn-link p-0" @click="toggleAudioPlayer(currentlyPlayingIndex)"
            :title="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'"
            :aria-label="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'">
            <i class="bi" :class="isAudioPlaying[currentlyPlayingIndex] ? 'bi-pause-fill' : 'bi-play-fill'"></i>
          </button>
          <button class="control-icon btn btn-link p-0" @click="fastForwardAudio(currentlyPlayingIndex)"
            title="Fast Forward 10s" aria-label="Fast forward 10 seconds">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
          <button class="control-icon btn btn-link p-0" @click="stopAudio(currentlyPlayingIndex)" title="Stop"
            aria-label="Stop">
            <i class="bi bi-stop-fill"></i>
          </button>
          <button class="control-icon btn btn-link p-0" @click="toggleVolume" title="Volume" aria-label="Adjust volume">
            <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
          </button>
          <div v-if="showVolumeBar" class="volume-bar-container">
            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume" class="volume-slider"
              aria-label="Volume control" aria-live="polite" />
          </div>
          <span class="time" role="status" aria-live="polite">{{ formatTime(currentTime) }} / {{ formatTime(totalTime)
            }}</span>
          <button class="control-icon btn btn-link p-0 close-icon" @click="closeAudioPlayer" title="Close"
            aria-label="Close audio player">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="progress-bar" role="progressbar" :aria-valuemin="0" :aria-valuemax="100"
          :aria-valuenow="Math.round(progress[currentlyPlayingIndex] || 0)"
          :aria-valuetext="`Progress ${Math.round(progress[currentlyPlayingIndex] || 0)} percent`" tabindex="0"
          @keydown.left.prevent="keyboardSeek(-5)" @keydown.right.prevent="keyboardSeek(5)"
          @keydown.pageDown.prevent="keyboardSeek(-10)" @keydown.pageUp.prevent="keyboardSeek(10)"
          @click="seekAudio($event, currentlyPlayingIndex)" aria-label="Seek audio">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';
// JSON modules default-export the entire object; access its events property.
import eventsData from './prophet_events.json';

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
        fontFamily: 'Arial, sans-serif',
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
        '--content-font-family': this.fontSettings.fontFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Helvetica Neue', Arial, sans-serif",
        '--content-font-size': size,
      };
    },
    // heavy computeds removed; we now update cached values in updateCurrentMetrics
  },
  mounted() {
    const saved = localStorage.getItem('userFontSettings');
    if (saved) {
      this.fontSettings = JSON.parse(saved);
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
      try { localStorage.setItem('missionNextStepMinimized', this.nextStepMinimized ? '1' : '0'); } catch (_) {}
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
        document.title = atTop && currentTitle ? `${base} — ${currentTitle}` : base;
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
          el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }
    },
    scrollEventContentToTop() {
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
            const hyphenItems = t.match(/(?:^|\s)[-–—]\s+[^-–—].+?(?=(?:\s[-–—]\s)|$)/g);
            const numberedItems = t.match(/(?:^|\s)(\d+)\.\s+.+?(?=(?:\s\d+\.)|$)/g);
            if (hyphenItems && hyphenItems.length >= 3) {
              hyphenItems.forEach(item => {
                const txt = item.replace(/^\s*[-–—]\s+/, '').trim();
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
        const parts = txt.split(/(?:^|\s)[\-–—]\s+/).map(s => s.trim()).filter(Boolean);
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
        .replace(/[‐‑–—]/g, '-') // hyphen, non-breaking hyphen, en/em dash
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
</script>

<style scoped>
.mission-shell {
  --mission-accent: #0b806f;
  --mission-accent-2: #1a5f7a;
  --mission-ink: #0f172a;
  --mission-muted: #5b6470;
  --mission-surface: #ffffff;
  --mission-surface-soft: #f7f5f0;
  --mission-border: #e5e0d6;
  background: transparent;
  border: 0;
  border-radius: 26px;
  position: relative;
}

.mission-hero__title {
  color: var(--mission-ink);
  letter-spacing: -0.02em;
}

.mission-hero__lead {
  color: var(--mission-muted);
  max-width: 760px;
  margin: 0 auto;
}

.mission-hero .col-lg-10,
.mission-hero .col-xl-10 {
  background: var(--mission-surface);
  border: 1px solid var(--mission-border);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  box-shadow: 0 14px 30px rgba(15, 41, 32, 0.08);
}

.card-teal {
  border-radius: 22px;
  border: 1px solid var(--mission-border);
  box-shadow: 0 12px 28px rgba(15, 41, 32, 0.08);
  background: var(--mission-surface);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}
.card-teal:hover { 
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(15,41,32,0.12);
  border-color: rgba(11, 128, 111, 0.3);
}
/* Next-step controls */
.next-step-actions {
  position: absolute;
  right: 12px;
  top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  z-index: 5;
}
.icon-btn {
  background: transparent;
  border: 0;
  color: #6b8b91;
  opacity: 0.95;
  cursor: pointer;
  padding: 6px;
  line-height: 1;
}
.icon-btn i { font-size: 1rem; }
.icon-btn:hover { opacity: 1; }
.icon-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(11,128,111,0.25);
  border-radius: 6px;
}
/* Subtle button variant */
.subtle-btn { border-radius: 12px; }
.subtle-btn:hover { filter: brightness(1.03); }
.subtle-btn:focus-visible { box-shadow: 0 0 0 3px rgba(108,117,125,0.35); }
/* Removed animate.css to reduce animation overhead */

.play-btn-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(11,128,111,0.25);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.08);
  transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.05s ease, border-color 0.2s ease;
  position: relative;
}

.play-btn-circle:hover {
  background: #fdfdfb;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 14px rgba(0, 0, 0, 0.12);
}

.play-btn-circle:active {
  transform: scale(0.98);
}

.play-btn-circle.playing {
  border-color: rgba(13,182,145,0.5);
  background: #f4fbf7;
}

@media (min-width: 768px) {
  .play-btn-circle {
    width: 52px;
    height: 52px;
  }
}

/* Icon sizing and feedback */
.play-icon {
  font-size: clamp(1.9rem, 2.6vw, 2.8rem);
  color: #0f766e;
  filter: drop-shadow(0 1px 0 rgba(255,255,255,0.6));
  transition: color 0.18s ease, transform 0.12s ease, text-shadow 0.3s ease;
}
.play-toggle:hover .play-icon { color: var(--mission-accent); }
.play-toggle.playing .play-icon {
  animation: playPulse 1.8s ease-in-out infinite;
  color: var(--mission-accent);
}

/* Pulsing ring when playing */
.play-btn-circle.playing::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  border: 2px solid rgba(13,182,145,0.35);
  animation: ringPulse 1.8s ease-out infinite;
}

@keyframes ringPulse {
  0% { transform: scale(0.9); opacity: 0.6; }
  60% { transform: scale(1.1); opacity: 0.12; }
  100% { transform: scale(1.2); opacity: 0; }
}

.audio-player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  background-color: rgba(33, 33, 33, 0.98);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 12px 12px 0 0;
  transition: transform 0.3s ease-in-out;
}

/* Reduce motion for users and improve tab switch performance */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

/* Defer heavy layout/paint when off-screen or hidden */
.event-details {
  content-visibility: auto;
  contain-intrinsic-size: 800px 600px;
}

.custom-audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.control-icon {
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s ease-in-out;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
}

.control-icon:hover,
.control-icon:active,
.control-icon:focus {
  color: var(--mission-accent);
  transform: scale(1.1);
  outline: none;
}

.close-icon {
  margin-left: auto;
  margin-right: 8px;
}

.volume-bar-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  width: 100px;
}

.volume-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: #666;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  border-radius: 12px;
}

.volume-slider:hover {
  opacity: 1;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--mission-accent);
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--mission-accent);
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.time {
  color: #e0e0e0;
  font-size: 0.9rem;
  margin-left: 12px;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #555;
  border-radius: 12px;
  margin-top: 12px;
  overflow: hidden;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: var(--mission-accent);
  transition: width 0.3s ease;
}

/* Interactive play button */
.play-toggle {
  transition: transform 120ms ease, filter 160ms ease;
  outline: none;
}

.play-toggle:hover {
  transform: scale(1.06);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.play-toggle:active {
  transform: scale(0.98);
}

.play-toggle:focus-visible {
  box-shadow: 0 0 0 0.2rem rgba(13, 182, 145, 0.35);
  border-radius: 999px;
}

.play-toggle.playing i {
  animation: playPulse 1.8s ease-in-out infinite;
  color: var(--mission-accent);
}

@keyframes playPulse {
  0% {
    text-shadow: 0 0 0 rgba(13, 182, 145, 0.0);
  }

  50% {
    text-shadow: 0 0 12px rgba(13, 182, 145, 0.6);
  }

  100% {
    text-shadow: 0 0 0 rgba(13, 182, 145, 0.0);
  }
}

.event-box {
  background: var(--mission-surface);
  border-radius: 22px; /* consistent rounded aesthetic */
  box-shadow: 0 14px 30px rgba(15, 41, 32, 0.1);
  padding: 20px;
  margin: 0 auto;
  border: 1px solid var(--mission-border);
  position: relative;
}

.content-card {
  background: var(--content-bg, var(--mission-surface));
  color: var(--content-fg, var(--mission-ink));
  border-radius: 22px;
  border: 1px solid var(--mission-border);
  padding: 1.5rem;
  box-shadow: 0 16px 32px rgba(15, 41, 32, 0.1);
  position: relative;
  overflow: hidden;
}

.content-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--mission-accent);
  opacity: 0.55;
}

.content-body {
  font-family: var(--content-font-family, inherit);
  font-size: var(--content-font-size, 1rem);
  font-style: var(--content-font-style, normal);
  text-shadow: var(--content-text-shadow, none);
  text-decoration: var(--content-text-decoration, none);
  line-height: 1.85;
  color: var(--content-fg, var(--mission-ink));
  position: relative;
  z-index: 1;
}

.time-estimates {
  font-size: 0.9rem;
  color: #333;
}

.time-estimates span {
  display: flex;
  align-items: center;
}

.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: var(--mission-surface);
  border: 1px solid var(--mission-border);
  color: var(--mission-ink);
  font-weight: 600;
  box-shadow: 0 8px 16px rgba(15, 41, 32, 0.08);
}

/* Extra Small Screens (<400px) */
@media (max-width: 399px) {
  .controls {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .audio-controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(56px, 1fr));
    gap: 8px 6px;
    justify-items: center;
    width: 100%;
  }

  .audio-controls .control-icon {
    font-size: 1.35rem;
    padding: 6px;
    width: 100%;
  }

  .audio-controls .close-icon {
    margin-left: 0;
    margin-right: 0;
  }

  .audio-controls .volume-bar-container {
    grid-column: span 4;
    margin: 0;
    width: 100%;
  }

  .audio-controls .volume-slider {
    width: 100%;
  }

  .audio-controls .time {
    grid-column: span 2;
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
  }

  .audio-player-container {
    padding: 8px;
  }

  .custom-audio-player {
    padding: 8px;
  }

  .progress-bar {
    height: 6px;
    margin-top: 8px;
  }

  .event-box {
    padding: 12px;
  }

  .time-estimates {
    flex-direction: column;
    gap: 8px;
    font-size: 0.85rem;
  }
}

/* Small Screens (400px–575px) */
@media (min-width: 400px) and (max-width: 575px) {
  .controls {
    gap: 12px;
    flex-wrap: wrap;
  }

  .audio-controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(60px, 1fr));
    gap: 12px 10px;
    justify-items: center;
    width: 100%;
  }

  .audio-controls .control-icon {
    font-size: 1.35rem;
    padding: 8px;
    width: 100%;
  }

  .audio-controls .close-icon {
    margin-left: 0;
    margin-right: 0;
  }

  .audio-controls .volume-bar-container {
    grid-column: span 4;
    margin: 0;
    width: 100%;
  }

  .audio-controls .volume-slider {
    width: 100%;
  }

  .audio-controls .time {
    grid-column: span 2;
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
  }

  .audio-player-container {
    padding: 10px;
  }

  .custom-audio-player {
    padding: 10px;
  }

  .progress-bar {
    height: 6px;
    margin-top: 10px;
  }

  .event-box {
    padding: 16px;
  }

  .time-estimates {
    font-size: 0.85rem;
  }
}

/* Medium Screens (576px–767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .controls {
    gap: 14px;
    flex-wrap: wrap;
  }

  .control-icon {
    font-size: 1.3rem;
    padding: 8px;
  }

  .close-icon {
    margin-left: auto;
    margin-right: 6px;
  }

  .volume-bar-container {
    margin-left: 10px;
    width: 90px;
  }

  .volume-slider {
    width: 100%;
  }

  .time {
    margin-left: 10px;
    font-size: 0.85rem;
  }

  .audio-player-container {
    padding: 10px 14px;
  }

  .custom-audio-player {
    padding: 10px 14px;
  }

  .progress-bar {
    margin-top: 10px;
  }

  .event-box {
    padding: 18px;
  }
}

/* Large Screens (≥768px) */
@media (min-width: 768px) {
  .controls {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 16px;
  }

  .control-icon {
    font-size: 1.3rem;
    padding: 8px;
  }

  .close-icon {
    margin-left: auto;
    margin-right: 8px;
  }

  .volume-bar-container {
    margin-left: 12px;
    width: 100px;
  }

  .volume-slider {
    width: 100%;
  }

  .time {
    margin-left: 12px;
    font-size: 0.9rem;
  }

  .progress-bar {
    margin-top: 12px;
  }
}

@media (max-width: 767px) {
  #settingsOffcanvas {
    width: 100% !important;
  }
}

@media (min-width: 768px) {
  #settingsOffcanvas {
    width: 400px !important;
  }
}

.custom-offcanvas {
  background-color: #10584f;
  color: white;
  min-width: 300px;
}

.fab {
  transition: background-color 0.3s ease, transform 0.2s;
}

.fab:hover {}

.action-button {
  transition: all 0.3s ease;
  cursor: pointer;
  color: #333;
}

.action-button:hover {
  color: var(--mission-accent);
}

mark {
  background-color: var(--mission-accent);
  color: white;
  padding: 0 4px;
  border-radius: 4px;
}

.timeline-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  /* Make scrollbar visible and usable */
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: var(--mission-accent) var(--mission-border);
  /* Firefox */
  scroll-snap-type: x proximity;
}

/* WebKit scrollbar styling */
.timeline-wrapper::-webkit-scrollbar {
  height: 8px;
}

.timeline-wrapper::-webkit-scrollbar-track {
  background: var(--mission-border);
  border-radius: 8px;
}

.timeline-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--mission-accent);
  border-radius: 8px;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  min-width: max-content;
}

/* Remove the vertical white line rendered via a ::before pseudo-element */
.timeline::before {
  content: none !important;
  display: none !important;
}

.timeline-point {
  flex-shrink: 0;
  scroll-snap-align: start;
}

.timeline-badge {
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid var(--mission-border);
  border-radius: 999px;
  padding: 0.7rem 1.25rem;
  background-color: var(--mission-surface);
  color: var(--mission-ink);
  transition: background-color 0.12s ease, color 0.12s ease, border-color 0.12s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(15, 41, 32, 0.08);
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}

.timeline-badge:hover {
  background-color: var(--mission-accent);
  color: #ffffff;
  cursor: pointer;
}

.timeline-badge.active {
  background-color: var(--mission-accent);
  color: #ffffff;
  border: 2px solid rgba(11, 128, 111, 0.35);
  box-shadow: 0 8px 18px rgba(11, 128, 111, 0.22);
}

.controls button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.12s ease, color 0.12s ease;
}

.controls button:disabled {
  cursor: not-allowed;
}


.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #20c997;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.fab:hover {
  background-color: #17a085;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.summary-card {
  background: var(--mission-surface-soft);
  border: 1px solid var(--mission-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 20px rgba(15, 41, 32, 0.08);
}

.ai-summary-inline {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 22px rgba(15, 41, 32, 0.08);
  border: 1px solid rgba(11, 128, 111, 0.3);
  background: var(--mission-surface-soft);
}

.ai-summary-inline .summary-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0.75rem;
}

.ai-summary-inline .summary-footer {
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
  font-size: 0.8rem;
  color: #6c757d;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .mission-shell {
    border-radius: 22px;
  }

  .mission-hero .col-lg-10,
  .mission-hero .col-xl-10 {
    padding: 1.6rem 1.2rem;
  }

  .timeline-badge {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .display-6 {
    font-size: 1.5rem;
  }

  .display-5 {
    font-size: 1.75rem;
  }

  .event-box {
    padding: 15px;
  }

  .ai-summary-inline {
    padding: 0.75rem;
    margin-top: 1rem;
  }

  .ai-summary-inline .summary-text {
    font-size: 0.9rem;
  }

  .controls button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .mission-shell {
    border-radius: 18px;
  }

  .timeline-badge {
    padding: 0.8rem 1.2rem;
    /* increase size on small screens */
    font-size: 1rem;
    border-radius: 1.25rem;
  }

  .display-6 {
    font-size: 1.25rem;
  }


  .event-box {
    padding: 12px;
  }

  .ai-summary-inline {
    padding: 0.5rem;
  }

  .ai-summary-inline .summary-text {
    font-size: 0.85rem;
  }

  .controls button {
    padding: 0.6rem 1.1rem;
    /* larger next/prev on small screens */
    font-size: 1rem;
    border-radius: 0.6rem;
  }

  .time-estimates span {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .timeline-badge {
    padding: 0.75rem 1rem;
    /* increase size further on very small screens */
    font-size: 0.95rem;
  }

  .display-6 {
    font-size: 1.1rem;
  }


  .event-box {
    padding: 10px;
  }

  .ai-summary-inline {
    padding: 0.4rem;
  }

  .ai-summary-inline .summary-text {
    font-size: 0.8rem;
  }

  .controls button {
    padding: 0.55rem 1rem;
    font-size: 0.95rem;
  }
}

/* Spacing between controls and audio player when visible */
.mb-audio-gap {
  margin-bottom: 24px;
  /* ensure clear separation on all sizes */
}

/* Prevent overlap of fixed audio player with page content */
.pb-audio-gap {
  padding-bottom: 120px;
  /* reserve space for fixed player height */
}

/* Next Step card (minimal inline styles, 20px rounded) */
.next-step-card {
  position: relative;
  background: var(--mission-surface);
  border: 1px solid var(--mission-border);
  border-radius: 22px;
  box-shadow: 0 12px 28px rgba(15, 41, 32, 0.08);
  padding: 1.25rem 1.75rem;
  overflow: hidden;
}
.next-step-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: var(--mission-accent);
  opacity: 0.6;
}
.next-step-icon {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: rgba(11, 128, 111, 0.16);
  display: flex; align-items: center; justify-content: center;
  color: var(--mission-accent); font-size: 1.35rem;
  box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.22), 0 6px 14px rgba(26,95,122,0.10);
}
.next-step-eyebrow { letter-spacing: 0.1em; color: var(--mission-accent-2); font-size: 0.78rem; }
.next-step-text { color: var(--mission-ink); line-height: 1.8; font-size: 1.05rem; }
.next-step-link { color: var(--mission-accent); }
.next-step-link:hover { text-decoration: underline; }
.text-brand { color: var(--mission-accent); }
.next-step-cta {
  background: var(--mission-accent);
  border: none; border-radius: 999px;
  box-shadow: 0 10px 20px rgba(11, 128, 111, 0.25);
  transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
}
.next-step-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(11, 128, 111, 0.28);
}
.next-step-cta:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(11,128,111,0.35);
}

/* Evenly spaced action row */
.action-row {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--mission-border);
  border-radius: 999px;
  padding: 6px 10px;
  background: var(--mission-surface);
  box-shadow: 0 8px 18px rgba(15, 41, 32, 0.08);
}
.action-group { display: flex; align-items: center; gap: 6px; }
.row-sep { width: 1px; height: 20px; background: var(--mission-border); border-radius: 1px; margin: 0 4px; display: inline-block; }
.action-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 14px;
  border: 1px solid var(--mission-border);
  background: var(--mission-surface);
  color: var(--mission-ink);
  font-size: 0.9rem;
  transition: background-color 0.18s ease, box-shadow 0.18s ease, transform 0.08s ease, color 0.18s ease, border-color 0.18s ease;
}
.action-item .label { margin-left: 2px; }
.action-item:hover {
  background-color: #fdfbf7;
  box-shadow: 0 6px 12px rgba(15, 41, 32, 0.12);
}
.action-item:active { transform: scale(0.98); }
.action-item:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(13,110,253,0.25); }
.action-item i { font-size: 1rem; }
.action-item.action-success { color: #0f5132; border-color: rgba(21,128,61,0.3); background-color: rgba(21,128,61,0.12); }
.action-item.action-primary { color: #0c4a6e; border-color: rgba(2,132,199,0.3); background-color: rgba(2,132,199,0.12); }
.action-item.action-danger { color: #842029; border-color: rgba(220,38,38,0.3); background-color: rgba(220,38,38,0.12); }

/* Navigation buttons (consistent brand color + focus) */
.nav-btn {
  background: var(--mission-accent);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  transition: transform 0.12s ease, box-shadow 0.18s ease, filter 0.18s ease;
}
.nav-btn:hover { filter: brightness(1.05); box-shadow: 0 4px 10px rgba(11,128,111,0.25); }
.nav-btn:active { transform: translateY(1px); }
.nav-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(11,128,111,0.35); }

/* Subtle keyframe animations */
@keyframes riseIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-rise { animation: riseIn 300ms ease-out both; }
  /* content surfaces and chips now provided globally via resources/css/app.css */
</style>

<!-- Global (unscoped) spacing to ensure content is never overlapped by the fixed audio bar -->
<style>
body.with-audio-player {
  padding-bottom: 140px;
  /* reserve space for the fixed audio bar */
}
</style>
