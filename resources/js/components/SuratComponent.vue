```vue
<template>
  <div class="container py-4">
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
      <span @click="toggleVisibility" class="text-white" style="cursor: pointer;">
        <i v-if="isVisible" class="bi bi-x-lg"></i>
        <i v-else class="bi bi-plus-lg h5"></i>
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
            <option v-for="reciter in reciters" :key="reciter.identifier" :value="reciter.identifier">
              {{ reciter.englishName }}
            </option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label for="translation-select" class="form-label text-white">Select Translation:</label>
          <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation">
            <option value="" disabled>Select Translation</option>
            <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
              <span style="font-size: 1.2em; margin-right: 6px;">{{ translation.flag }}</span>{{ translation.englishName
              }} ({{ translation.language }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

    <div class="row rtl-text">
      <div style="padding: 12px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 8px;"
        ref="audioCard" v-for="(ayah, index) in filteredAyahs" :key="ayah.number"
        class="col-md-12 mb-2 mt-2 ayah-card-container"
        :class="{ highlighted: isHighlighted && currentlyPlayingIndex === index }">
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
          <div class="row d-none d-md-flex">
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
                <div class="mb-3" @click="toggleAudioPlayer(index)">
                  <i v-if="isAudioLoading[index]" class="bi bi-hourglass-split"
                    style="cursor: pointer; font-size: 1.5rem;" data-bs-toggle="tooltip" data-bs-placement="right"
                    title="Loading"></i>
                  <i v-else class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                    style="cursor: pointer; font-size: 1.5rem;" data-bs-toggle="tooltip" data-bs-placement="right"
                    :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
                <div class="mb-3" @click="decreaseFontSize">
                  <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-dash-circle-fill" data-bs-toggle="tooltip"
                    data-bs-placement="right" title="Decrease Font Size"></i>
                </div>
                <div class="mb-3" @click="increaseFontSize">
                  <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-plus-circle-fill" data-bs-toggle="tooltip"
                    data-bs-placement="right" title="Increase Font Size"></i>
                </div>
                <div class="mb-3" @click="shareOnWhatsApp(ayah)">
                  <i class="bi bi-share-fill" style="cursor: pointer; font-size: 1.3rem;" data-bs-toggle="tooltip"
                    data-bs-placement="right" title="Share on WhatsApp"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile/Tablet Layout: Text then Icons -->
          <div class="d-block d-md-none">
            <div style="padding: 2px;">
              <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(ayah)"
                :style="{ fontSize: arabicFontSize + 'px' }"></p>
              <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">Translation:</h4>
              <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)"
                :style="{ fontSize: translationFontSize + 'px' }"></p>
            </div>
            <div class="row mb-3" style="display: flex; justify-content: center; margin: 0 -5px;">
              <div class="col-2 text-center" style="padding: 3px;">
                <div @click="toggleAudioPlayer(index)" style="cursor: pointer;">
                  <i v-if="isAudioLoading[index]" class="bi bi-hourglass-split" style="font-size: 1.7rem;"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Loading"></i>
                  <i v-else class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                    style="font-size: 1.7rem;" data-bs-toggle="tooltip" data-bs-placement="top"
                    :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <div @click="decreaseFontSize" style="cursor: pointer;">
                  <i class="bi bi-dash-circle-fill" style="font-size: 1.7rem;" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Decrease Font Size"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <div @click="increaseFontSize" style="cursor: pointer;">
                  <i class="bi bi-plus-circle-fill" style="font-size: 1.7rem;" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Increase Font Size"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <div @click="fastForwardAudio(index)" style="cursor: pointer;">
                  <i class="bi bi-skip-forward-circle-fill" style="font-size: 1.7rem;" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Fast Forward"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <div class="mb-3" @click="shareOnWhatsApp(ayah)">
                  <i class="bi bi-whatsapp" style="cursor: pointer; font-size: 1.5rem;" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Share on WhatsApp"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="controls">
          <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause" title="Play/Pause">
            <i v-if="isAudioLoading[currentlyPlayingIndex]" class="bi bi-hourglass-split"></i>
            <i v-else-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill"></i>
            <i v-else class="bi bi-play-fill"></i>
          </button>
          <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn" title="Fast Forward">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
          <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn" title="Stop">
            <i class="bi bi-stop-fill"></i>
          </button>
          <button @click="toggleVolume" class="control-btn" title="Volume">
            <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
          </button>
          <div v-if="showVolumeBar" class="volume-bar-container">
            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume"
              class="volume-slider" />
          </div>
          <span class="time">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{
            formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          <button @click="closeAudioPlayer" class="control-btn" title="Close" style="margin-left: auto;">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
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
      arabicFontSize: 23,
      translationFontSize: 19,
      highlightedWordIndex: -1,
      progress: [],
      audioElements: [],
      playbackSpeed: 1.0,
      volume: 1.0,
      showVolumeBar: false,
      showAudioPlayer: false,
      isHighlighted: false,
      wordTimings: [],
      autoScrollFrame: null,
      cardPositions: [],
      isLoading: false
    };
  },
  computed: {
    filteredAyahs: function () {
      if (!this.surahDetails) return [];
      if (!this.searchQuery) return this.surahDetails.ayahs;
      const query = this.searchQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(
        ayah => ayah.text.toLowerCase().includes(query) ||
          (ayah.translation && ayah.translation.toLowerCase().includes(query))
      );
    }
  },
  watch: {
    selectedReciter: function (newVal) {
      if (newVal && !this.isLoading) {
        this.isLoading = true;
        this.savePreference("selectedReciter", newVal);
        this.selectedSurah = "1";
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.stopAutoScroll();
        this.cardPositions = [];
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.$nextTick(() => {
            this.cacheCardPositions();
            this.isLoading = false;
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
        this.selectedSurah = "1";
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.stopAutoScroll();
        this.cardPositions = [];
        this.fetchSurahDetails().then(() => {
          this.$nextTick(() => {
            this.cacheCardPositions();
            this.isLoading = false;
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
        this.stopAutoScroll();
        this.cardPositions = [];
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.$nextTick(() => {
            this.cacheCardPositions();
            this.isLoading = false;
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
      this.cardPositions = [];
      this.$nextTick(() => {
        if (this.$refs.audioCard) {
          this.initializeAudioElements();
          this.cacheCardPositions();
        } else {
          console.warn('Audio cards not yet rendered, retrying...');
          setTimeout(() => {
            this.initializeAudioElements();
            this.cacheCardPositions();
          }, 100);
        }
      });
    }
  },
  methods: {
    cacheCardPositions: function () {
      const audioCards = Array.isArray(this.$refs.audioCard) ? this.$refs.audioCard : [];
      this.cardPositions = audioCards.map(card => card.getBoundingClientRect().top + window.scrollY);
      console.log('Cached card positions:', this.cardPositions);
    },
    smoothScrollToAyah: function (index) {
      if (index < 0 || index >= this.filteredAyahs.length || !this.$refs.audioCard?.[index]) {
        console.warn(`Invalid index for scroll: ${index}`);
        return;
      }
      const card = Array.isArray(this.$refs.audioCard) ? this.$refs.audioCard[index] : this.$refs.audioCard;
      const stickyDropdown = this.$refs.stickyDropdown;
      const audioPlayer = document.querySelector('.audio-player-container');
      const stickyHeight = stickyDropdown ? stickyDropdown.getBoundingClientRect().height : (this.isVisible ? 80 : 60);
      const audioPlayerHeight = audioPlayer && this.showAudioPlayer ? audioPlayer.getBoundingClientRect().height : 0;
      const buffer = Math.max(20, window.innerHeight * 0.05);
      const cardTop = this.cardPositions[index] || (card.getBoundingClientRect().top + window.scrollY);
      const targetY = cardTop - stickyHeight - buffer;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      console.log(`Smooth scrolling to ayah ${index + 1} at targetY=${targetY}`);
    },
    startAutoScroll: function () {
      if (this.autoScrollFrame) return;
      console.log('Starting auto-scroll for ayah', this.currentlyPlayingIndex + 1);
      const scrollStep = () => {
        if (!this.isAudioPlaying[this.currentlyPlayingIndex] || !this.currentlyPlaying || this.isLoading) {
          console.log('Auto-scroll stopped: isPlaying=', this.isAudioPlaying[this.currentlyPlayingIndex], 'currentlyPlaying=', !!this.currentlyPlaying, 'isLoading=', this.isLoading);
          this.stopAutoScroll();
          return;
        }
        this.smoothScrollToAyah(this.currentlyPlayingIndex);
        this.autoScrollFrame = requestAnimationFrame(scrollStep);
      };
      this.autoScrollFrame = requestAnimationFrame(scrollStep);
    },
    stopAutoScroll: function () {
      if (this.autoScrollFrame) {
        console.log('Stopping auto-scroll');
        cancelAnimationFrame(this.autoScrollFrame);
        this.autoScrollFrame = null;
      }
    },
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
          audio.preload = index < 5 ? 'auto' : 'metadata';
          audio.load();
          audio.playbackRate = this.playbackSpeed;
          audio.volume = this.volume;
          audio.addEventListener("timeupdate", () => this.updateProgress(index));
          audio.addEventListener("loadedmetadata", () => {
            console.log(`Metadata loaded for ayah ${index + 1}, duration: ${audio.duration}`);
            this.progress[index] = 0;
            this.isAudioLoading[index] = false;
          });
          audio.addEventListener("canplay", () => {
            console.log(`Audio can play for ayah ${index + 1}`);
            this.isAudioLoading[index] = false;
            if (index === this.currentlyPlayingIndex && this.isAudioPlaying[index]) {
              this.playAudio(index);
            }
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
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        console.log('Pausing currently playing audio');
        this.currentlyPlaying.pause();
        this.currentlyPlaying.currentTime = 0;
      }
      this.isAudioPlaying = this.isAudioPlaying.map((state, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.isHighlighted = true;
      const ayah = this.filteredAyahs[index];
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
        console.log('Audio already loaded, triggering metadata');
        this.currentlyPlaying.onloadedmetadata();
      }
      this.highlightedWordIndex = -1;
      this.currentlyPlaying.ontimeupdate = () => {
        this.syncHighlight();
        this.updateProgress(index);
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
          this.preloadNextAyahs(index + 1);
          this.$nextTick(() => {
            this.cacheCardPositions();
            this.smoothScrollToAyah(index);
            this.startAutoScroll();
          });
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
      if (this.currentlyPlaying.readyState >= 2) {
        attemptPlay();
      } else {
        this.currentlyPlaying.addEventListener("canplay", () => attemptPlay(), { once: true });
        this.currentlyPlaying.load();
      }
    },
    pauseAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Pausing audio for ayah ${index + 1}`);
        this.audioElements[index].pause();
        this.isAudioPlaying[index] = false;
        this.isAudioLoading[index] = false;
        this.stopAutoScroll();
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
        this.stopAutoScroll();
      }
    },
    rewindAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Rewinding audio for ayah ${index + 1}`);
        this.audioElements[index].currentTime = Math.max(0, this.audioElements[index].currentTime - 15);
        this.$nextTick(() => {
          this.cacheCardPositions();
          this.smoothScrollToAyah(index);
        });
      }
    },
    fastForwardAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Fast forwarding audio for ayah ${index + 1}`);
        this.audioElements[index].currentTime = Math.min(this.audioElements[index].duration, this.audioElements[index].currentTime + 20);
        this.$nextTick(() => {
          this.cacheCardPositions();
          this.smoothScrollToAyah(index);
        });
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
    highlightText: function (text) {
      if (!this.searchQuery || !text) return text || "";
      const regex = new RegExp('(' + this.searchQuery + ')', "gi");
      return text.replace(regex, '<span class="highlight">$1</span>');
    },
    toggleVisibility: function () {
      this.isVisible = !this.isVisible;
      this.cardPositions = [];
      this.$nextTick(() => {
        this.cacheCardPositions();
        if (this.isAudioPlaying[this.currentlyPlayingIndex]) {
          this.smoothScrollToAyah(this.currentlyPlayingIndex);
        }
      });
    },
    increaseFontSize: function () {
      if (this.arabicFontSize < 40) this.arabicFontSize += 2;
      if (this.translationFontSize < 30) this.translationFontSize += 2;
      this.cardPositions = [];
      this.$nextTick(() => {
        this.cacheCardPositions();
        if (this.isAudioPlaying[this.currentlyPlayingIndex]) {
          this.smoothScrollToAyah(this.currentlyPlayingIndex);
        }
      });
    },
    decreaseFontSize: function () {
      if (this.arabicFontSize > 16) this.arabicFontSize -= 2;
      if (this.translationFontSize > 12) this.translationFontSize -= 2;
      this.cardPositions = [];
      this.$nextTick(() => {
        this.cacheCardPositions();
        if (this.isAudioPlaying[this.currentlyPlayingIndex]) {
          this.smoothScrollToAyah(this.currentlyPlayingIndex);
        }
      });
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
      localStorage.setItem(key, value);
    },
    handleAyahEnd: function (index) {
      if (this.isAudioPlaying[index]) {
        this.stopAudio(index);
        this.playNextAyah();
      }
    },
    playNextAyah: function () {
      if (this.filteredAyahs.length > 0) {
        const nextIndex = (this.currentlyPlayingIndex + 1) % this.filteredAyahs.length;
        if (nextIndex < this.filteredAyahs.length && this.audioElements[nextIndex]) {
          console.log(`Playing next ayah: ${nextIndex + 1}`);
          this.playAudio(nextIndex);
        } else {
          console.warn(`Cannot play next ayah: index ${nextIndex} invalid or no audio element`);
          this.stopAutoScroll();
        }
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
      this.stopAutoScroll();
    },
    syncHighlight: function () {
      const audio = this.currentlyPlaying;
      if (!audio || !this.wordTimings.length) return;
      const currentTime = audio.currentTime;
      const index = this.wordTimings.findIndex((t, i, arr) => {
        return currentTime >= t && (i === arr.length - 1 || currentTime < arr[i + 1]);
      });
      this.highlightedWordIndex = index;
    }
  },
  mounted: function () {
    this.selectedSurah = "1";
    this.selectedReciter = "ar.alafasy";
    this.selectedTranslation = "en.ahmedali";
    this.currentlyPlayingIndex = 0;
    this.isHighlighted = false;
    this.fetchReciters();
    this.fetchSurahs();
    this.fetchTranslations();
    this.fetchSurahDetails().then(() => {
      this.isInitialLoad = false;
      this.$nextTick(() => {
        this.cacheCardPositions();
      });
    });
  },
  beforeUnmount: function () {
    this.stopAutoScroll();
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
html {
  scroll-behavior: smooth;
}

.highlighted {
  background-color: #b5e6db;
  border-radius: 8px;
  animation: pulse 0.5s ease-in-out;
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
  .controls {
    flex-wrap: nowrap; /* Prevent wrapping to keep all items in one line */
    justify-content: space-between; /* Distribute space evenly */
  }

  .controls .control-btn[title="Close"] {
    margin-left: 0; /* Remove the margin-left: auto to align with other buttons */
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
  font-size: 1.5rem;
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

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
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

.ayah-card-container {
  scroll-margin-top: 100px;
}

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
    font-size: 1.2rem !important;
    line-height: 2;
  }

  .translation-text {
    font-size: 0.9rem !important;
    line-height: 1.6;
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

.highlighted-word {
  background: #00bfa6;
  color: #fff;
  border-radius: 4px;
  padding: 0 2px;
  transition: background 0.2s;
}
</style>
```