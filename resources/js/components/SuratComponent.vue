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
      <span @click="toggleVisibility" class="text-white" style="cursor: pointer;" aria-label="Toggle filters visibility" role="button" tabindex="0" @keydown.enter.prevent="toggleVisibility" @keydown.space.prevent="toggleVisibility">
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
            <option v-for="translation in translationsSorted" :key="translation.identifier" :value="translation.identifier">
              <span style="font-size: 1.2em; margin-right: 6px;">{{ translation.flag }}</span>{{ translation.englishName
              }} ({{ translation.language }})
            </option>
          </select>
        </div>
        <!-- <div class="col-12 col-md-6 mt-2">
          <label for="search-input" class="form-label text-white">Search</label>
          <input id="search-input" class="form-control shadow-sm" type="text" v-model="searchQuery" placeholder="Search Arabic or translation..." aria-label="Search in current surah" />
        </div> -->
      </div>
    </div>

    <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

    <div class="row rtl-text" role="listbox" :aria-activedescendant="selectedCardIndex >= 0 ? `ayah-card-${selectedCardIndex}` : null" aria-label="Ayah cards list">

      <div style="padding: 12px;  border-radius: 8px;" ref="audioCard" v-for="(ayah, index) in filteredAyahs"
        :key="ayah.number" class="col-md-12 mb-2 mt-2 ayah-card-container shadow-md" role="option"
        :id="`ayah-card-${index}`" :aria-selected="selectedCardIndex === index" :tabindex="selectedCardIndex === index ? 0 : -1"
        @click="selectCard(index)" @keydown.enter.prevent="toggleAudioPlayer(index)" @keydown.space.prevent="toggleAudioPlayer(index)"
        :class="{
          'highlighted': isHighlighted && currentlyPlayingIndex === index,
          'currently-playing': isAudioPlaying[index]
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
              {{ surahDetails?.surahNumber }} : {{ index + 1 }}
            </h4>
          </div>

          <!-- Desktop Layout: Icons on Left -->
          <div class="row d-none d-md-flex" role="group" aria-label="Ayah controls (desktop)" :aria-hidden="isMobile">
            <div class="col-md-11">
              <div style="padding: 4px;">
                <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(ayah)"
                  :style="{ fontSize: arabicFontSize + 'px' }"></p>
                <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">Translation:</h4>
                <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)"
                  :style="{ fontSize: translationFontSize + 'px' }"></p>
              </div>
            </div>
            <div class="col-md-1 text-center">
              <div class="d-flex flex-column align-items-center">
                <button class="icon-btn mb-3" @click="toggleAudioPlayer(index)"
                        :aria-label="isAudioPlaying[index] ? 'Pause ayah ' + (index + 1) : 'Play ayah ' + (index + 1)"
                        :title="isAudioPlaying[index] ? 'Pause' : 'Play'">
                  <i v-if="isAudioLoading[index]" class="bi bi-hourglass-split" aria-hidden="true"></i>
                  <i v-else class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'" aria-hidden="true"></i>
                </button>
                <button class="icon-btn mb-3" @click="decreaseFontSize" aria-label="Decrease font size" title="Decrease Font Size">
                  <i class="bi bi-dash-circle-fill" aria-hidden="true"></i>
                </button>
                <button class="icon-btn mb-3" @click="increaseFontSize" aria-label="Increase font size" title="Increase Font Size">
                  <i class="bi bi-plus-circle-fill" aria-hidden="true"></i>
                </button>
                <button class="icon-btn mb-3" @click="shareOnWhatsApp(ayah)" aria-label="Share on WhatsApp" title="Share on WhatsApp">
                  <i class="bi bi-share-fill" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <hr>

          <!-- Mobile/Tablet Layout: Text then Icons -->

          <div style="padding: 8px;" class="d-block d-md-none" role="group" aria-label="Ayah controls (mobile)" :aria-hidden="!isMobile">
            <div>
              <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(ayah)"
                :style="{ fontSize: arabicFontSize + 'px' }"></p>
              <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">Translation:</h4>
              <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)"
                :style="{ fontSize: translationFontSize + 'px' }"></p>
            </div>
            <div class="row mb-3" style="display: flex; justify-content: center; margin: 0 -5px;">

              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="decreaseFontSize" aria-label="Decrease font size" title="Decrease Font Size">
                  <i class="bi bi-dash-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="increaseFontSize" aria-label="Increase font size" title="Increase Font Size">
                  <i class="bi bi-plus-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="toggleAudioPlayer(index)"
                        :aria-label="isAudioPlaying[index] ? 'Pause ayah ' + (index + 1) : 'Play ayah ' + (index + 1)"
                        :title="isAudioPlaying[index] ? 'Pause' : 'Play'">
                  <i v-if="isAudioLoading[index]" class="bi bi-hourglass-split" style="font-size: 1.7rem;" aria-hidden="true"></i>
                  <i v-else class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="rewindAudio(index)" aria-label="Rewind 15 seconds" title="Rewind">
                  <i class="bi bi-skip-backward-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="fastForwardAudio(index)" aria-label="Fast forward 20 seconds" title="Fast Forward">
                  <i class="bi bi-skip-forward-circle-fill" style="font-size: 1.7rem;" aria-hidden="true"></i>
                </button>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <button class="icon-btn" @click="shareOnWhatsApp(ayah)" aria-label="Share on WhatsApp" title="Share on WhatsApp">
                  <i class="bi bi-whatsapp" style="font-size: 1.5rem;" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Screen reader live region -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ screenReaderMessage }}</div>
    <!-- Empty state -->
    <div v-if="!isLoading && surahDetails && filteredAyahs.length === 0" class="empty-state text-center text-muted py-4">
      No verses match your current search or filters.
    </div>

    
    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="controls">
          <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind" aria-label="Rewind 15 seconds">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause" title="Play/Pause" aria-label="Play or Pause">
            <i v-if="isAudioLoading[currentlyPlayingIndex]" class="bi bi-hourglass-split"></i>
            <i v-else-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill"></i>
            <i v-else class="bi bi-play-fill"></i>
          </button>
          <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn" title="Fast Forward" aria-label="Fast forward 20 seconds">
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
          <button @click="toggleRepeat" class="control-btn" :title="repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off'" :aria-pressed="repeatCurrent" aria-label="Toggle repeat current ayah">
            <i class="bi bi-arrow-repeat" :style="{ color: repeatCurrent ? '#00bfa6' : '#ccc' }"></i>
          </button>
          <div v-if="showVolumeBar" class="volume-bar-container">
            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume"
              class="volume-slider" />
          </div>
          <span class="time" aria-live="polite">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{
            formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          <button @click="closeAudioPlayer" class="control-btn" title="Close" aria-label="Close player" style="margin-left: auto;">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="progress-bar" role="progressbar" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="progress[currentlyPlayingIndex] || 0" @click="seekToPosition" ref="progressBar">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
          <div class="audio-visualizer" ref="visualizer">
            <div v-for="(bar, index) in visualizerBars" :key="index" 
                 class="visualizer-bar" 
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
      favoriteReciters: ['ar.alafasy','ar.abdulbasitmurattal'],
      favoriteTranslations: ['en.ahmedali','en.sahih'],
      lastAutoScrollAt: 0,
      isManualScrolling: false,
      manualScrollTimer: null,
    };
  },
  computed: {
    filteredAyahs: function () {
      if (!this.surahDetails) return [];
      if (!this.debouncedQuery) return this.surahDetails.ayahs;
      const query = this.debouncedQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(
        ayah => ayah.text.toLowerCase().includes(query) ||
          (ayah.translation && ayah.translation.toLowerCase().includes(query))
      );
    },
    recitersSorted() {
      if (!Array.isArray(this.reciters)) return [];
      const fav = new Set(this.favoriteReciters);
      return [...this.reciters].sort((a,b)=>{
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        return (a.englishName || '').localeCompare(b.englishName || '');
      });
    },
    translationsSorted() {
      if (!Array.isArray(this.translations)) return [];
      const fav = new Set(this.favoriteTranslations);
      return [...this.translations].sort((a,b)=>{
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        if ((a.flag || '') !== (b.flag || '')) return (a.flag || '').localeCompare(b.flag || '');
        return (a.englishName || '').localeCompare(b.englishName || '');
      });
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
      this.isAudioPlaying = new Array(newAyahs.length).fill(false);
      this.isAudioLoading = new Array(newAyahs.length).fill(false);
      this.progress = new Array(newAyahs.length).fill(0);
      this.audioElements = new Array(newAyahs.length).fill(null);
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.audioCard) {
            this.initializeAudioElements();
          } else {
            console.warn('Audio cards not yet rendered, retrying...');
            setTimeout(() => {
              this.initializeAudioElements();
            }, 1000);
          }
        }, 200);
      });
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
    this.updateIsMobile();
    window.addEventListener('resize', this.updateIsMobile);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('resize', this.updateIsMobile);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('resize', this.updateIsMobile);
  },
  methods: {
    onKeydown(e) {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      if (e.target?.isContentEditable || ['input','textarea','select'].includes(tag)) return;
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
      if (!ayah.text) return "";
      const words = ayah.text.split(" ");
      return words
        .map((word, index) => {
          const isHighlighted = index === this.highlightedWordIndex ? "highlighted-word" : "";
          return `<span class="${isHighlighted}">${word}</span>`;
        })
        .join(" ");
    },
    initializeAudioElements: function () {
      console.log('Initializing audio elements for', this.filteredAyahs.length, 'ayahs');
      if (!this.$refs.audioCard || !this.$refs.audioCard.length) {
        console.warn('No audio cards available for initialization');
        return;
      }
      if (this.audioElements.length) {
        this.audioElements.forEach(audio => {
          if (audio && audio.pause) audio.pause();
          if (audio && audio.remove) audio.remove();
        });
      }
      this.audioElements = this.filteredAyahs.map((ayah, index) => {
        if (!ayah.audio) {
          console.warn(`No audio URL for ayah ${index + 1}`);
          return null;
        }
        try {
          const audio = new Audio(ayah.audio);
          audio.preload = 'metadata';
          audio.load();
          audio.playbackRate = this.playbackSpeed;
          audio.volume = this.volume;
          audio.addEventListener("timeupdate", () => this.updateProgress(index));
          audio.addEventListener("loadedmetadata", () => {
            console.log(`Metadata loaded for ayah ${index + 1}, duration: ${audio.duration}`);
            this.progress[index] = 0;
            this.isAudioLoading[index] = false;
          });
          // Keep lightweight; don't auto-play on canplay to avoid double-starts
          audio.addEventListener("canplay", () => {
            this.isAudioLoading[index] = false;
          });
          audio.addEventListener("ended", () => this.handleAyahEnd(index));
          audio.addEventListener("error", e => {
            console.error(`Audio error for ayah ${index + 1}:`, e);
            this.isAudioLoading[index] = false;
            this.$toast?.error(`Failed to load audio for ayah ${index + 1}`);
          });
          return audio;
        } catch (e) {
          console.error(`Failed to create audio for ayah ${index + 1}:`, e);
          this.$toast?.error(`Failed to create audio for ayah ${index + 1}`);
          return null;
        }
      });
      console.log('Audio elements initialized:', this.audioElements.length, 'elements');
    },
    preloadNextAyahs: function (startIndex) {
      const maxPreload = 5;
      this.filteredAyahs.slice(startIndex, startIndex + maxPreload).forEach((ayah, index) => {
        const realIndex = startIndex + index;
        if (realIndex >= this.audioElements.length || this.audioElements[realIndex]) return;
        if (!ayah.audio) {
          console.warn(`No audio URL for ayah ${realIndex + 1}`);
          return;
        }
        try {
          const audio = new Audio(ayah.audio);
          audio.preload = 'metadata';
          audio.load();
          audio.playbackRate = this.playbackSpeed;
          audio.volume = this.volume;
          audio.addEventListener("timeupdate", () => this.updateProgress(realIndex));
          audio.addEventListener("loadedmetadata", () => {
            console.log(`Metadata loaded for ayah ${realIndex + 1}, duration: ${audio.duration}`);
            this.progress[realIndex] = 0;
            this.isAudioLoading[realIndex] = false;
          });
          audio.addEventListener("canplay", () => {
            console.log(`Audio can play for ayah ${realIndex + 1}`);
            this.isAudioLoading[realIndex] = false;
          });
          audio.addEventListener("ended", () => this.handleAyahEnd(realIndex));
          audio.addEventListener("error", e => {
            console.error(`Audio error for ayah ${realIndex + 1}:`, e);
            this.isAudioLoading[realIndex] = false;
            this.$toast?.error(`Failed to load audio for ayah ${realIndex + 1}`);
          });
          this.audioElements[realIndex] = audio;
        } catch (e) {
          console.error(`Failed to create audio for ayah ${realIndex + 1}:`, e);
          this.$toast?.error(`Failed to create audio for ayah ${realIndex + 1}`);
        }
      });
      console.log(`Preloaded audio elements for ayahs ${startIndex + 1} to ${Math.min(startIndex + maxPreload, this.filteredAyahs.length)}`);
    },
    playAudio: function (index) {
      console.log('Attempting to play audio for index:', index);
      if (index < 0 || index >= this.filteredAyahs.length || !this.audioElements[index]) {
        console.error(`Cannot play audio: Invalid audio element or index ${index}`);
        this.$toast?.error(`Cannot play audio for ayah ${index + 1}`);
        return;
      }

      this.isAudioLoading[index] = true;

      // Stop any currently playing audio and ensure exclusivity
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        console.log('Pausing currently playing audio');
        try { this.currentlyPlaying.pause(); } catch (_) {}
        try { this.currentlyPlaying.currentTime = 0; } catch (_) {}
      }
      // Pause any stray audios just in case
      if (Array.isArray(this.audioElements)) {
        this.audioElements.forEach((a, i) => {
          if (a && i !== index) {
            try { a.pause(); } catch (_) {}
          }
        });
      }

      // Update playing states
      this.isAudioPlaying = this.isAudioPlaying.map((state, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.isHighlighted = true;

      const ayah = this.filteredAyahs[index];

      // Setup metadata and word timing
      this.currentlyPlaying.onloadedmetadata = () => {
        console.log(`Metadata loaded for ayah ${index + 1}, duration: ${this.currentlyPlaying.duration}`);
        const duration = this.currentlyPlaying.duration;
        const wordCount = ayah.text.split(' ').length;
        if (wordCount > 0 && duration > 0) {
          const step = duration / wordCount;
          this.wordTimings = Array.from({ length: wordCount }, (_, i) => i * step);
        } else {
          this.wordTimings = [];
        }
      };

      if (this.currentlyPlaying.readyState >= 1) {
        this.currentlyPlaying.onloadedmetadata();
      }

      this.highlightedWordIndex = -1;
      this.currentlyPlaying.ontimeupdate = () => {
        this.syncHighlight();
        this.updateProgress(index);
        // Removed continuous auto-scroll here to prevent jumpiness.
      };

      const attemptPlay = (attempts = 0, maxAttempts = 10) => {
        if (attempts >= maxAttempts) {
          console.error(`Failed to play audio for ayah ${index + 1} after ${maxAttempts} attempts`);
          this.isAudioPlaying[index] = false;
          this.isAudioLoading[index] = false;
          this.isHighlighted = false;
          this.$toast?.error(`Failed to play audio for ayah ${index + 1}`);
          return;
        }

        this.currentlyPlaying.play().then(() => {
          console.log(`Playing audio for ayah ${index + 1}`);
          this.isAudioPlaying[index] = true;
          this.isAudioLoading[index] = false;
          this.isHighlighted = true;
          this.showAudioPlayer = true;
          this.preloadWindow(index, 3);
          
          // Start visualizer animation
          this.animateVisualizer();

          // removed auto-scroll when playback starts
        }).catch(err => {
          console.error(`Play error for ayah ${index + 1}:`, err);
          if (this.currentlyPlaying.readyState < 2) {
            console.log(`Audio not ready, retrying in 50ms for ayah ${index + 1} (attempt ${attempts + 1})`);
            setTimeout(() => attemptPlay(attempts + 1, maxAttempts), 50);
          } else {
            console.error(`Unrecoverable play error for ayah ${index + 1}:`, err);
            this.isAudioPlaying[index] = false;
            this.isAudioLoading[index] = false;
            this.isHighlighted = false;
            this.$toast?.error(`Failed to play audio for ayah ${index + 1}`);
            this.handleAyahEnd(index);
          }
        });
      };

      // Try to play immediately; let the browser buffer as needed
      attemptPlay();
    },
    preloadWindow(centerIndex, radius = 3) {
      const start = Math.max(0, centerIndex - radius);
      const end = Math.min(this.filteredAyahs.length - 1, centerIndex + radius);
      for (let i = start; i <= end; i++) {
        if (!this.audioElements[i]) {
          const ayah = this.filteredAyahs[i];
          if (!ayah?.audio) continue;
          try {
            const audio = new Audio(ayah.audio);
            audio.preload = 'metadata';
            audio.load();
            audio.playbackRate = this.playbackSpeed;
            audio.volume = this.volume;
            audio.addEventListener("timeupdate", () => this.updateProgress(i));
            audio.addEventListener("loadedmetadata", () => {
              this.progress[i] = 0;
              this.isAudioLoading[i] = false;
            });
            audio.addEventListener("ended", () => this.handleAyahEnd(i));
            this.audioElements[i] = audio;
          } catch (e) {
            console.error(`Failed to create audio for ayah ${i + 1}:`, e);
          }
        }
      }
    },
    pauseAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Pausing audio for ayah ${index + 1}`);
        this.audioElements[index].pause();
        this.isAudioPlaying[index] = false;
        this.isAudioLoading[index] = false;
      }
    },
    toggleAudioPlayer: function (index) {
      console.log('Toggling audio player for index:', index);
      if (!this.audioElements[index]) {
        console.error(`No audio element for index ${index}`);
        this.$toast?.error(`No audio available for ayah ${index + 1}`);
        return;
      }
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
    fetchSurahs: function () {
      this.isLoading = true;
      fetch("https://api.alquran.cloud/v1/surah")
        .then(response => {
          if (!response.ok) throw new Error(`Failed to fetch Surahs: ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (!this._isDestroyed) {
            this.surahs = data.data || [];
          }
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching Surahs:", error);
          this.isLoading = false;
        });
    },
    async fetchReciters() {
      this.isLoading = true;
      try {
        const response = await fetch("https://api.alquran.cloud/v1/edition/format/audio");
        if (!response.ok) throw new Error(`Failed to fetch Reciters: ${response.status}`);
        const data = await response.json();
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
      } catch (error) {
        console.error("Error fetching Reciters:", error);
        this.isLoading = false;
      }
    },
    async fetchTranslations() {
      this.isLoading = true;
      try {
        const response = await fetch("https://api.alquran.cloud/v1/edition/type/translation");
        if (!response.ok) throw new Error(`Failed to fetch Translations: ${response.status}`);
        const data = await response.json();
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
      return fetch(`https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to fetch Surah details: ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (this._isDestroyed) return;
          const arabicText = data.data[0];
          const translation = data.data[1];
          this.surahDetails = {
            surahNumber: this.selectedSurah,
            englishName: arabicText.englishName,
            name: arabicText.name,
            ayahs: arabicText.ayahs.map((ayah, index) => ({
              number: ayah.number,
              text: ayah.text,
              translation: translation.ayahs[index] && translation.ayahs[index].text ? translation.ayahs[index].text : "Translation not available",
              audio: ayah.audio || ""
            }))
          };
          console.log('Surah details fetched:', this.surahDetails);
          this.isLoading = false;
        })
        .catch(error => {
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
        if (this.audioElements && this.audioElements.forEach) {
          this.audioElements.forEach(audio => {
            if (audio && audio.remove) audio.remove();
          });
        }
        this.initializeAudioElements();
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
      if (['INPUT','TEXTAREA'].includes((e.target || {}).tagName)) return;
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
.sticky-dropdown > span i {
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
  border: 1px dashed rgba(0,0,0,0.15);
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
  background: #00bfa6;
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
  0% { opacity: 0.4; }
  100% { opacity: 1; }
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
</style>
```
