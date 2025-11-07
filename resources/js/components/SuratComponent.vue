<template>
  <div class="container py-4" role="main" aria-label="Quran Explorer">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-10">
        <h1 class="display-5 fw-bold">Quran Explorer</h1>
        <p class="lead">
          Explore the Quran in Arabic, accompanied by translations and recitations from world-renowned Qaris.
          Listen to beautiful recitations to deepen your understanding.
        </p>
      </div>
    </div>

    <!-- Sticky Dropdowns Container -->
    <div class="sticky-dropdown" :style="{ top: isVisible ? '80px' : '60px' }" ref="stickyDropdown">
      <!-- Existing template for surah, reciter, and translation selection -->
      <span @click="toggleVisibility" class="text-white" style="cursor: pointer;" aria-label="Toggle filters visibility"
        role="button" tabindex="0" @keydown.enter.prevent="toggleVisibility" @keydown.space.prevent="toggleVisibility">
        <i v-if="isVisible" class="bi bi-x-lg" aria-hidden="true"></i>
        <i v-else class="bi bi-plus-lg" aria-hidden="true"></i>
      </span>
      <div class="row g-3" style="padding: 6px;" v-show="isVisible">
        <div class="col-12 col-md-4 mt-3">
          <label for="surah-select" class="form-label text-white">Select Surah:</label>
          <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah" @change="fetchSurahDetails">
            <option value="" disabled>Select a Surah</option>
            <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
              {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
            </option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label for="reciter-select" class="form-label text-white">Select Reciter:</label>
          <select id="reciter-select" class="form-select shadow-sm" v-model="selectedReciter">
            <option value="" disabled>Select a reciter</option>
            <option v-for="reciter in recitersSorted" :key="reciter.identifier" :value="reciter.identifier">
              {{ reciter.englishName }}
            </option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label for="translation-select" class="form-label text-white">Select Translation:</label>
          <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation">
            <option value="" disabled>Select Translation</option>
            <option v-for="translation in translationsSorted" :key="translation.identifier"
              :value="translation.identifier">
              <span style="font-size: 1.2em; margin-right: 6px;">{{ translation.flag }}</span>{{ translation.englishName
              }} ({{ translation.language }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-show="showNextStep" style="padding: 10px;">
      <div class="mx-auto mb-4" style="
          position: relative;
          background: #eaf3f1;
          border: 1px solid rgba(11, 128, 111, 0.20);
          border-radius: 24px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09);
          padding: 1.25rem 1.75rem;
        ">
        <button
          type="button"
          class="btn-close next-step-close"
          aria-label="Dismiss next step"
          @click="dismissNextStep"
          style="position: absolute; right: 14px; top: 14px; opacity: 0.8; filter: none; color: #6b8b91; z-index: 2;">
        </button>
        <!-- Minimize / Restore toggle -->
        <button
          type="button"
          :title="nextStepMinimized ? 'Restore' : 'Minimize'"
          :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
          @click="toggleNextStepMinimized"
          style="position: absolute; right: 44px; top: 14px; opacity: 0.9; background: transparent; border: 0; color: #6b8b91; z-index: 3; cursor: pointer;">
          <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
        </button>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="next-step-icon-circle" style="
                width: 46px; height: 46px;
                border-radius: 50%;
                background: rgba(11, 128, 111, 0.20);
                display: flex; align-items: center; justify-content: center;
                color: #0b806f; font-size: 1.35rem;
                box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.26), 0 6px 14px rgba(26,95,122,0.10);
              ">
              <i class="fas fa-quran"></i>
            </div>
          </div>
          <div style="flex:1;">
            <p class="mb-2 fw-semibold text-uppercase" style="letter-spacing: 0.1em; color: #1a5f7a; font-size: 0.78rem;">
              NEXT STEP
            </p>
            <!-- Minimized teaser -->
            <div v-show="nextStepMinimized" class="mb-2" style="color: #1f2933;">
              <a href="/history" class="fw-semibold text-decoration-none" style="color:#0b806f;">
                Explore Qur’an history
              </a>
              <i class="fas fa-arrow-up-right-from-square ms-1" style="color:#0b806f;"></i>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3" style="color: #1f2933; line-height: 1.8; font-size: 1.1rem;">
              If you feel ready to move from listening to learning? Explore key milestones, preservation efforts, and scholars in
              <a href="/history" class="fw-semibold text-decoration-none" style="color:#0b806f;">
                the history of the Qur’an
              </a>
              to deepen your understanding.
            </p>
            <a v-show="!nextStepMinimized" href="/history"
               class="btn btn-sm fw-semibold text-white px-3 py-2"
               style="
                  background: linear-gradient(135deg, #0b806f, #1a5f7a);
                  border: none; border-radius: 999px;
                  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.25);
                  transition: transform 0.2s ease, box-shadow 0.2s ease;
               "
               onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 28px rgba(26, 95, 122, 0.28)';"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.25)';">
              Explore History
              <i class="fas fa-arrow-up-right-from-square ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

    <div class="row rtl-text" ref="listContainer" role="list" aria-label="Ayah cards list">

      <div :style="{ height: topSpacerHeight + 'px' }"></div>

      <div style="padding: 12px;  border-radius: 8px;" ref="audioCard" v-for="item in visibleWindow"
        :key="item.ayah.number" class="col-md-12 mb-2 mt-2 ayah-card-container shadow-md" role="listitem"
        :id="`ayah-card-${item.index}`" @click="selectCard(item.index)"
        @keydown.enter.prevent="toggleAudioPlayer(item.index)" @keydown.space.prevent="toggleAudioPlayer(item.index)"
        :class="{
          'highlighted': isHighlighted && currentlyPlayingIndex === item.index,
          'currently-playing': isAudioPlaying[item.index]
        }">
        <div class="shadow-xl h-100 rtl-text d-flex flex-column" style="
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            display: flex;
            flex-direction: column;
            height: 100%;">
          <!-- Surah and Ayah Number -->
          <div class="d-flex justify-content-between p-3 text-muted ltr-text">
            <h4>
              <img src="/images/art.png" width="35px" alt="Art Icon" />
              {{ surahDetails?.surahNumber }} : {{ item.index + 1 }}
            </h4>
          </div>

          <!-- Desktop Layout: Icons on Left -->
          <div class="row d-none d-md-flex" role="group" aria-label="Ayah controls (desktop)" :aria-hidden="isMobile">
            <div class="col-md-11">
              <div style="padding: 4px;">
                <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(item.ayah)"
                  :style="{ fontSize: arabicFontSize + 'px' }"></p>
                <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">Translation:</h4>
                <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(item.ayah.translation)"
                  :style="{ fontSize: translationFontSize + 'px' }"></p>
              </div>
            </div>
            <div class="col-md-1 text-center">
              <div class="d-flex flex-column align-items-center">
                <button class="icon-btn mb-3" @click="toggleAudioPlayer(item.index)"
                  :aria-label="isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1)"
                  :title="isAudioPlaying[item.index] ? 'Pause' : 'Play'">
                  <i class="bi" :class="isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                    aria-hidden="true"></i>
                </button>
                <button class="icon-btn mb-3" @click="decreaseFontSize" aria-label="Decrease font size"
                  title="Decrease Font Size">
                  <i class="bi bi-dash-circle-fill" aria-hidden="true"></i>
                </button>
                <button class="icon-btn mb-3" @click="increaseFontSize" aria-label="Increase font size"
                  title="Increase Font Size">
                  <i class="bi bi-plus-circle-fill" aria-hidden="true"></i>
                </button>
                <button class="icon-btn mb-3" @click="shareOnWhatsApp(ayah)" aria-label="Share on WhatsApp"
                  title="Share on WhatsApp">
                  <i class="bi bi-share-fill" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <hr>

          <!-- Mobile/Tablet Layout: Text then Icons -->

          <div style="padding: 8px;" class="d-block d-md-none" role="group" aria-label="Ayah controls (mobile)"
            :aria-hidden="!isMobile">
            <div>
              <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(item.ayah)"
                :style="{ fontSize: arabicFontSize + 'px' }"></p>
              <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">Translation:</h4>
              <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(item.ayah.translation)"
                :style="{ fontSize: translationFontSize + 'px' }"></p>
            </div>
            <div class="row mb-3" style="display: flex; justify-content: center; margin: 0 -5px;">

              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="decreaseFontSize" aria-label="Decrease font size"
                  title="Decrease Font Size">
                  <i class="bi bi-dash-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="increaseFontSize" aria-label="Increase font size"
                  title="Increase Font Size">
                  <i class="bi bi-plus-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="rewindAudio(item.index)" aria-label="Rewind 15 seconds" title="Rewind">
                  <i class="bi bi-skip-backward-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="toggleAudioPlayer(item.index)"
                  :aria-label="isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1)"
                  :title="isAudioPlaying[item.index] ? 'Pause' : 'Play'">
                  <i class="bi" :class="isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                    style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="fastForwardAudio(item.index)" aria-label="Fast forward 20 seconds"
                  title="Fast Forward">
                  <i class="bi bi-skip-forward-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="shareOnWhatsApp(item.ayah)" aria-label="Share on WhatsApp"
                  title="Share on WhatsApp">
                  <i class="bi bi-share-fill" style="font-size: 1.5rem;" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :style="{ height: bottomSpacerHeight + 'px' }"></div>
    </div>

    <!-- Screen reader live region -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ screenReaderMessage }}</div>
    <!-- Empty state -->
    <div v-if="!isLoading && surahDetails && filteredAyahs.length === 0"
      class="empty-state text-center text-muted py-4">
      No verses match your current search or filters.
    </div>


    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="controls">
          <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind"
            aria-label="Rewind 15 seconds">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause" title="Play/Pause"
            aria-label="Play or Pause">
            <i :class="isAudioPlaying[currentlyPlayingIndex] ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
          </button>
          <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn" title="Fast Forward"
            aria-label="Fast forward 20 seconds">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
          <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn" title="Stop" aria-label="Stop">
            <i class="bi bi-stop-fill"></i>
          </button>
          <button @click="toggleVolume" class="control-btn" title="Volume" aria-label="Toggle volume slider">
            <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
          </button>
          <button @click="cyclePlaybackSpeed" class="control-btn" :title="'Speed: ' + playbackSpeed + 'x'">
            <i class="bi bi-speedometer2" :style="{ color: playbackSpeed !== 1 ? '#ff6b6b' : '#ccc' }"></i>
            <span class="speed-indicator">{{ playbackSpeed }}x</span>
          </button>
          <button @click="toggleRepeat" class="control-btn"
            :title="repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off'"
            :aria-pressed="repeatCurrent" aria-label="Toggle repeat current ayah">
            <i class="bi bi-arrow-repeat" :style="{ color: repeatCurrent ? '#00bfa6' : '#ccc' }"></i>
          </button>
          <div v-if="showVolumeBar" class="volume-bar-container">
            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume"
              class="volume-slider" />
          </div>
          <span class="time" aria-live="polite">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }}
            / {{
              formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          <button @click="closeAudioPlayer" class="control-btn" title="Close" aria-label="Close player"
            style="margin-left: auto;">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="progress-bar" role="progressbar" aria-label="Audio playback progress" :aria-valuemin="0"
          :aria-valuemax="100" :aria-valuenow="progress[currentlyPlayingIndex] || 0"
          :aria-valuetext="`Progress ${Math.round(progress[currentlyPlayingIndex] || 0)} percent`"
          @click="seekToPosition" ref="progressBar">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
          <div class="audio-visualizer" ref="visualizer">
            <div v-for="(bar, index) in visualizerBars" :key="index" class="visualizer-bar"
              :style="{ height: bar + '%', animationDelay: (index * 0.1) + 's' }">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      wordTimings: [],
      isLoading: false,
      continuousPlayback: true, // New data property for playback mode
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
      nextStepMinimized: false,
    };
  },
  computed: {
    filteredAyahs: function () {
      if (!this.surahDetails) return [];
      if (!this.debouncedQuery) return this.surahDetails.ayahs;
      const query = this.debouncedQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(
        ayah => (ayah.lowerText && ayah.lowerText.includes(query)) ||
          (ayah.lowerTranslation && ayah.lowerTranslation.includes(query))
      );
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
      return (Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0);
    },
    visibleWindow() {
      const start = Math.max(0, Math.min(this.visibleStart, this.totalItems));
      const end = Math.max(start, Math.min(this.visibleEnd, this.totalItems));
      const out = [];
      if (!this.surahDetails || !Array.isArray(this.filteredAyahs)) return out;
      for (let i = start; i < end; i++) out.push({ index: i, ayah: this.filteredAyahs[i] });
      return out;
    },
    topSpacerHeight() {
      return Math.max(0, this.visibleStart * this.itemHeight);
    },
    bottomSpacerHeight() {
      const end = Math.max(this.visibleEnd, this.visibleStart);
      const remaining = Math.max(0, (this.totalItems - end));
      return remaining * this.itemHeight;
    },
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
        try { window.scrollTo(0, 0); } catch (_) { }
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
        try { window.scrollTo(0, 0); } catch (_) { }
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
        try { window.scrollTo(0, 0); } catch (_) { }
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
      this.isAudioPlaying.length = n; this.isAudioPlaying.fill(false);
      this.isAudioLoading.length = n; this.isAudioLoading.fill(false);
      this.progress.length = n; this.progress.fill(0);
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
    try { if (localStorage.getItem('suratNextStepDismissed') === '1') this.showNextStep = false; } catch (_) {}
    // Virtualization hooks
    this.$nextTick(() => {
      this.computeListTop();
      this.updateVirtualWindow();
      this.$nextTick(this.calibrateItemHeight);
      window.addEventListener('scroll', this.onScrollVirtual, { passive: true });
      window.addEventListener('resize', this.computeListTop, { passive: true });
      window.addEventListener('resize', this.calibrateItemHeight, { passive: true });
    });
    // Restore next-step minimized state
    try { this.nextStepMinimized = localStorage.getItem('suratNextStepMinimized') === '1'; } catch (_) {}
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
      try { localStorage.setItem('suratNextStepMinimized', this.nextStepMinimized ? '1' : '0'); } catch (_) {}
    },
    dismissNextStep() {
      this.showNextStep = false;
      try { localStorage.setItem('suratNextStepDismissed', '1'); } catch (_) {}
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
      } catch (_) { }
    },
    computeListTop() {
      try {
        const el = this.$refs.listContainer;
        if (!el) { this.listTop = 0; return; }
        const rect = el.getBoundingClientRect();
        this.listTop = rect.top + window.scrollY;
      } catch (_) { this.listTop = 0; }
    },
    onScrollVirtual() {
      this.updateVirtualWindow();
    },
    updateVirtualWindow() {
      const n = this.filteredAyahs ? this.filteredAyahs.length : 0;
      if (n === 0) { this.visibleStart = 0; this.visibleEnd = 0; return; }
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
          const { ts, data } = JSON.parse(raw);
          if (Date.now() - ts < ttlMs) {
            // return cached immediately
            return { data, fromCache: true };
          }
        }
      } catch (_) { }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      try { localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: json })); } catch (_) { }
      return { data: json, fromCache: false };
    },
    onKeydown(e) {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      if (e.target?.isContentEditable || ['input', 'textarea', 'select'].includes(tag)) return;
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
      const isInViewport = (
        rect.top < windowHeight &&
        rect.bottom > 0 &&
        rect.left < windowWidth &&
        rect.right > 0
      );

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
      if (!ayah || (!ayah.text && !ayah.words)) return "";
      const words = ayah.words || (ayah.text ? ayah.text.split(" ") : []);
      return words
        .map((word, index) => {
          const isHighlighted = index === this.highlightedWordIndex ? "highlighted-word" : "";
          return `<span class="${isHighlighted}">${word}</span>`;
        })
        .join(" ");
    },
    // removed bulk initialization and preloading for performance
    playAudio: function (index) {
      console.log('Attempting to play audio for index:', index);
      if (index < 0 || index >= this.filteredAyahs.length) return;

      // Defer showing loading spinner to avoid flicker; only show if slow (>200ms)
      clearTimeout(this.loadingTimers[index]);
      this.loadingTimers[index] = setTimeout(() => {
        this.$set ? this.$set(this.isAudioLoading, index, true) : (this.isAudioLoading[index] = true);
      }, 200);

      // Stop any currently playing audio and ensure exclusivity
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        console.log('Pausing currently playing audio');
        try { this.currentlyPlaying.pause(); } catch (_) { }
        try { this.currentlyPlaying.currentTime = 0; } catch (_) { }
      }
      // Pause any stray audios just in case
      if (Array.isArray(this.audioElements)) {
        this.audioElements.forEach((a, i) => {
          if (a && i !== index) {
            try { a.pause(); } catch (_) { }
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
        audio.addEventListener("error", (e) => {
          console.error(`Audio error for ayah ${index + 1}:`, e);
          clearTimeout(this.loadingTimers[index]);
          this.isAudioLoading[index] = false;
          this.isAudioPlaying[index] = false;
          this.$toast?.error(`Failed to load audio for ayah ${index + 1}`);
        });
        this.audioElements[index] = audio;
      }
      if (audio.src !== ayah.audio) {
        try { audio.pause(); } catch (_) { }
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
          this.wordTimings = Array.from({ length: wordCount }, (_, i) => i * step);
        } else {
          this.wordTimings = [];
        }
      };

      this.highlightedWordIndex = -1;
      audio.ontimeupdate = () => {
        this.syncHighlight();
        const now = (window.performance ? performance.now() : Date.now());
        if (now - this.lastProgressAt > 100) { // ~10fps progress updates
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
          }).catch((err) => {
            // If playback fails (e.g., not enough data), wait for 'canplay' and retry once
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay);
              const p2 = audio.play();
              if (p2 && typeof p2.then === 'function') {
                p2.then(() => markPlaying()).catch(() => { });
              } else {
                markPlaying();
              }
            };
            audio.addEventListener('canplay', onCanPlay, { once: true });
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
        try { a.pause(); } catch (_) { }
        a.src = nextAyah.audio;
        try { a.load(); } catch (_) { }
      }
      a.volume = this.volume;
      a.playbackRate = this.playbackSpeed;
    },
    updateProgress: function (index) {
      if (this.audioElements[index] && this.audioElements[index].duration) {
        const progress = (this.audioElements[index].currentTime / this.audioElements[index].duration) * 100;
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

      const escapeRegExp = (string) => {
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
      const message =
        'Surah ' + this.surahDetails.surahNumber + ' - ' + this.surahDetails.englishName + ' (Ayah ' + ayah.number + ')\n\n' +
        'Arabic: ' + ayah.text + '\n\n' +
        'Translation: ' + ayah.translation + '\n\n' +
        'Listen here: ' + ayah.audio;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = 'https://api.whatsapp.com/send?text=' + encodedMessage;
      window.open(whatsappLink, "_blank");
    },
    getFlagFromLanguage: function (lang) {
      const languageFlags = {
        'en': '🇬🇧', 'ar': '🇸🇦', 'fr': '🇫🇷', 'es': '🇪🇸', 'ur': '🇵🇰', 'tr': '🇹🇷',
        'id': '🇮🇩', 'bn': '🇧🇩', 'fa': '🇮🇷', 'ru': '🇷🇺', 'de': '🇩🇪', 'it': '🇮🇹',
        'sw': '🇹🇿', 'zh': '🇨🇳', 'hi': '🇮🇳'
      };
      return languageFlags[lang.toLowerCase()] || '🌐';
    },
    fetchSurahs: async function () {
      this.isLoading = true;
      try {
        const { data, fromCache } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", 'cache:surahs');
        if (!this._isDestroyed) this.surahs = data.data || [];
        this.isLoading = false;
        // Revalidate in background if served from cache
        if (fromCache) setTimeout(() => this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", 'cache:surahs').then(({ data }) => { if (!this._isDestroyed) this.surahs = data.data || []; }), 0);
      } catch (error) {
        console.error("Error fetching Surahs:", error);
        this.isLoading = false;
      }
    },
    async fetchReciters() {
      this.isLoading = true;
      try {
        const { data, fromCache } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", 'cache:reciters');
        if (!this._isDestroyed) {
          this.reciters = data.data
            .filter(reciter => reciter.identifier && reciter.englishName)
            .map(reciter => ({
              identifier: reciter.identifier,
              englishName: reciter.englishName || "Unknown Reciter",
            }))
            .filter(reciter => ![
              'elmir kuliev 2 by 1muslimapp',
              'elmir kuliev by 1muslimapp',
              'elmir kuliev elevatemuslim',
              'elmir kuliev 1muslim',
              'elmir kuliev 2muslim',
              'chinese',
              'ibrahim walk',
              'fooladvand - hedayatfar',
              'shamshad ali khan',
              'youssouf leclerc'
            ].includes(reciter.englishName.toLowerCase()));
        }
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try { const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", 'cache:reciters'); if (!this._isDestroyed) this.reciters = fresh.data.data.filter(r => r.identifier && r.englishName).map(r => ({ identifier: r.identifier, englishName: r.englishName || "Unknown Reciter" })).filter(r => !['elmir kuliev 2 by 1muslimapp', 'elmir kuliev by 1muslimapp', 'elmir kuliev elevatemuslim', 'elmir kuliev 1muslim', 'elmir kuliev 2muslim', 'chinese', 'ibrahim walk', 'fooladvand - hedayatfar', 'shamshad ali khan', 'youssouf leclerc'].includes(r.englishName.toLowerCase())); } catch (_) { }
        }, 0);
      } catch (error) {
        console.error("Error fetching Reciters:", error);
        this.isLoading = false;
      }
    },
    async fetchTranslations() {
      this.isLoading = true;
      try {
        const { data, fromCache } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", 'cache:translations');
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
        if (fromCache) setTimeout(async () => { try { const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", 'cache:translations'); if (this._isDestroyed) return; const trs = fresh.data.data.map(t => ({ identifier: t.identifier, englishName: t.englishName || "Unknown Translation", language: t.language || "Unknown", flag: this.getFlagFromLanguage(t.language || "Unknown") })).filter(t => t.flag !== '🌐'); trs.sort((a, b) => a.flag < b.flag ? -1 : a.flag > b.flag ? 1 : a.englishName < b.englishName ? -1 : a.englishName > b.englishName ? 1 : 0); this.translations = trs; } catch (_) { } }, 0);
      } catch (error) {
        console.error("Error fetching Translations:", error);
        this.translations = [];
        this.$toast?.error("Failed to load translations");
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
                  words,
                };
              })
            };
            this.isLoading = false;
            // Pre-warm current and next from cache path as well
            this.$nextTick(() => { this.prepareNextAudio(0); this.prepareNextAudio(1); });
          }
        }
      } catch (_) { }

      // Abort any in-flight request
      try { if (this._surahAborter) this._surahAborter.abort(); } catch (_) { }
      this._surahAborter = new AbortController();
      const { signal } = this._surahAborter;
      return fetch(`https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`, { signal })
        .then(response => {
          if (!response.ok) throw new Error(`Failed to fetch Surah details: ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (this._isDestroyed) return;
          // persist cache
          try { localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data })); } catch (_) { }
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
                words,
              };
            })
          };
          console.log('Surah details fetched:', this.surahDetails);
          this.isLoading = false;
          // Pre-warm the first and next ayah for instant playback
          this.$nextTick(() => { this.prepareNextAudio(0); this.prepareNextAudio(1); });
        })
        .catch(error => {
          if (error?.name === 'AbortError') return; // expected on change
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
            try { if (audio && audio.pause) audio.pause(); } catch (_) { }
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

      const now = (window.performance ? performance.now() : Date.now());
      if (now - this.lastVizAt < 33) { // ~30fps cap
        return requestAnimationFrame(() => this.animateVisualizer());
      }
      this.lastVizAt = now;

      // Create animated bars based on audio volume (simulated)
      const audio = this.audioElements[this.currentlyPlayingIndex];
      const volume = audio ? Math.min(audio.volume * 2, 1) : 0.3;

      this.visualizerBars = this.visualizerBars.map(() =>
        Math.random() * 80 * volume + 10
      );

      requestAnimationFrame(() => this.animateVisualizer());
    },
    toggleRepeat() {
      this.repeatCurrent = !this.repeatCurrent;
      localStorage.setItem('repeatCurrent', JSON.stringify(this.repeatCurrent));
    }
  },
  mounted: function () {
    // Keyboard shortcuts for better UX
    this._keydownHandler = (e) => {
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
    this.continuousPlayback = JSON.parse(localStorage.getItem('continuousPlayback')) ?? true; // Load preference
    this.playbackSpeed = JSON.parse(localStorage.getItem('playbackSpeed')) ?? 1; // Load playback speed preference

    // removed programmatic scroll to top

    Promise.all([
      this.fetchReciters(),
      this.fetchSurahs(),
      this.fetchTranslations(),
      this.fetchSurahDetails()
    ]).then(() => {
      this.isInitialLoad = false;
      this.$nextTick(() => {
        // removed scroll-to-top after initial load
      });
    });

  },
  beforeUnmount: function () {
    this.isComponentAlive = false;
    window.removeEventListener('keydown', this._keydownHandler);
    // removed scroll-related event listeners
    if (this.audioElements && this.audioElements.forEach) {
      this.audioElements.forEach(audio => {
        if (audio && audio.pause) audio.pause();
        if (audio && audio.remove) audio.remove();
      });
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.ayah-card-container {
  transition: all 0.3s ease;
}
</style>

<style scoped>
.highlighted {
  background-color: #b5e6db;
  border-radius: 8px;
  animation: pulse 0.5s ease-in-out;
}

.currently-playing {
  background-color: #00bfa640;
  border: 2px solid #00bfa640;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(40, 167, 69, 0.3);
  transform: scale(1.02);
  transition: all 0.3s ease;
}

@keyframes pulse {
  0% {
    border: 2px solid #00bfa6;
  }

  100% {
    border: 2px solid transparent;
  }
}

.rtl-text {
  direction: rtl;
}

.ltr-text {
  direction: ltr;
}

.sticky-dropdown {
  position: sticky;
  z-index: 1000;
  background-color: #343a40;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: top 0.3s ease, height 0.3s ease;
}

@media (max-width: 768px) {
  .container {
    padding-bottom: calc(100px + env(safe-area-inset-bottom));
  }
}

.audio-player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  background-color: rgba(33, 33, 33, 0.95);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px 15px 0 0;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.container {
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

.custom-audio-player {
  display: flex;
  flex-direction: column;
  color: white;
  padding: 5px 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

@media (max-width: 768px) {

  .controls .control-btn[title="Close"] {
    margin-left: 0;
    /* Remove the margin-left: auto to align with other buttons */
  }


  .time {
    font-size: 0.8rem !important;
    min-width: 100px;
    text-align: center;
  }

  .volume-bar-container {
    position: fixed;
    bottom: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(33, 33, 33, 0.95);
    padding: 10px;
    border-radius: 15px 15px 0 0;
  }

  .volume-slider {
    width: 100%;
  }
}

.control-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.75rem;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  color: #00bfa6;
}

.icon-btn {
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  cursor: pointer;
}

/* Increase icon sizes for per-ayah actions (desktop) */
.ayah-card-container .icon-btn i {
  font-size: 1.6rem;
}

/* Make sticky toggle icon a bit larger */
.sticky-dropdown>span i {
  font-size: 1.4rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
}

.progress-bar:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.progress {
  height: 100%;
  background-color: #00bfa6;
  transition: width 0.1s linear;
}

.volume-slider {
  width: 100px;
  height: 4px;
}

/* removed scroll-margin to avoid scroll coupling */

.ayah-card {
  padding: 15px;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: var(--bs-body-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .ayah-card {
    padding: 10px;
  }

  .arabic-text {
    font-size: 1.7rem !important;
    /* line-height: 5.8vh; */
  }

  .translation-text {
    font-size: 0.9rem !important;
    /* line-height: 1.6; */
  }

  .mobile-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }

  .mobile-controls .control-btn {
    font-size: 1.3rem;
  }
}

@media (max-width: 576px) {
  .display-5 {
    font-size: 1.8rem;
  }

  .lead {
    font-size: 1rem;
  }

  h4 {
    font-size: 1.1rem;
  }
}

@media (prefers-color-scheme: dark) {
  .ayah-card {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .sticky-dropdown {
    background-color: rgba(52, 58, 64, 0.95);
  }
}

@media (hover: none) {
  .control-btn {
    padding: 12px;
    margin: 0 5px;
  }

  .control-btn:active {
    transform: scale(0.95);
  }
}

.loading-placeholder {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.empty-state {
  border: 1px dashed rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 991px) {
  .hide-on-mobile-tablet {
    display: none;
  }
}

/* Mobile icon sizing overrides */
@media (max-width: 768px) {
  .control-btn {
    font-size: 2rem;
  }

  .ayah-card-container .icon-btn i {
    font-size: 1.8rem;
  }
}

.highlighted-word {
  background: #0b5d4b;
  color: #fff;
  border-radius: 4px;
  padding: 0 2px;
  transition: background 0.2s;
}

/* Audio Visualizer Styles */
.audio-visualizer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 2px;
  opacity: 0.7;
  pointer-events: none;
}

.visualizer-bar {
  width: 2px;
  background: linear-gradient(to top, #00bfa6, #87ceeb);
  border-radius: 1px;
  animation: pulse-visualizer 0.6s ease-in-out infinite alternate;
}

@keyframes pulse-visualizer {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}


/* Speed Indicator */
.speed-indicator {
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 2px;
  color: #ff6b6b;
}


/* Enhanced Control Buttons */
.control-btn {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.control-btn:active {
  transform: translateY(0);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .speed-indicator {
    font-size: 0.6rem;
  }

  .visualizer-bar {
    width: 1px;
  }

  .audio-visualizer {
    padding: 0 1px;
  }
}

/* Next Step card background (gradient + blur) */
.next-step-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(11, 128, 111, 0.25);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(26, 95, 122, 0.12);
}

.next-step-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #f2fbf9;
  background: linear-gradient(135deg, rgba(26, 95, 122, 0.22), rgba(11, 128, 111, 0.22));
  backdrop-filter: blur(6px);
  z-index: 0;
}

.next-step-card>* {
  position: relative;
  z-index: 1;
}
</style>
```
