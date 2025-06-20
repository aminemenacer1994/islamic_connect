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
    <div class="sticky-dropdown" style="top: 80px">
      <span @click="toggleVisibility" class="text-white" style="cursor: pointer;">
        <i v-if="isVisible" class="bi bi-x-lg"></i>
        <i v-else class="bi bi-plus-lg h5"></i>
      </span>
      <div v-show="isVisible" class="row g-3" style="padding: 6px;">
        <div class="col-12 col-md-4 mt-3">
          <label for="surah-select" class="form-label text-white">Select Surah:</label>
          <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah">
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
              <span style="font-size: 1.2em; margin-right: 6px;">{{ translation.flag }}</span>{{ translation.englishName }} ({{ translation.language }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row rtl-text">
      <div style="padding: 12px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 8px;" ref="audioCard" v-for="(ayah, index) in filteredAyahs" :key="ayah.number"
        class="col-md-12 mb-2 mt-2 ayah-card-container" :class="{ highlighted: isHighlighted && currentlyPlayingIndex === index }">
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
                  <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                    style="cursor: pointer; font-size: 1.5rem;" data-bs-toggle="tooltip" data-bs-placement="right"
                    :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
                <div class="mb-3" @click="rewindAudio(index)">
                  <i class="bi bi-skip-backward-circle-fill" style="cursor: pointer; font-size: 1.5rem;"
                    data-bs-toggle="tooltip" data-bs-placement="right" title="Rewind"></i>
                </div>
                <div class="mb-3" @click="decreaseFontSize">
                  <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-dash-circle-fill" data-bs-toggle="tooltip"
                    data-bs-placement="right" title="Decrease Font Size"></i>
                </div>
                <div class="mb-3" @click="increaseFontSize">
                  <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-plus-circle-fill" data-bs-toggle="tooltip"
                    data-bs-placement="right" title="Increase Font Size"></i>
                </div>
                <div class="mb-3" @click="fastForwardAudio(index)">
                  <i class="bi bi-skip-forward-circle-fill" style="cursor: pointer; font-size: 1.5rem;"
                    data-bs-toggle="tooltip" data-bs-placement="right" title="Fast Forward"></i>
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
                  <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                    style="font-size: 1.7rem;" data-bs-toggle="tooltip" data-bs-placement="top"
                    :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 3px;">
                <div @click="rewindAudio(index)" style="cursor: pointer;">
                  <i class="bi bi-skip-backward-circle-fill" style="font-size: 1.7rem;" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Rewind"></i>
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
                    data-bs-placement="right" title="Share on WhatsApp"></i>
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
            <i v-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill"></i>
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
  data: function() {
    return {
      selectedSurah: "1",
      selectedReciter: "ar.alafasy",
      selectedTranslation: "en.ahmedali",
      isAudioPlaying: [],
      currentlyPlaying: null,
      currentlyPlayingIndex: 0,
      scrollTimeout: null,
      showScrollButton: false,
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
      wordTimings: []
    };
  },
  computed: {
    filteredAyahs: function() {
      if (!this.surahDetails) return [];
      if (!this.searchQuery) return this.surahDetails.ayahs;
      var query = this.searchQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(
        function(ayah) {
          return ayah.text.toLowerCase().includes(query) ||
            (ayah.translation && ayah.translation.toLowerCase().includes(query));
        }
      );
    }
  },
  watch: {
    selectedReciter: function(newVal) {
      if (newVal) {
        this.savePreference("selectedReciter", newVal);
        this.selectedSurah = "1"; // Reset to Surah Al-Fatiha
        this.currentlyPlayingIndex = 0; // Reset to first ayah
        this.isHighlighted = false; // Reset highlight
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
        });
      }
    },
    selectedTranslation: function(newVal) {
      if (newVal) {
        this.savePreference("selectedTranslation", newVal);
        this.selectedSurah = "1"; // Reset to Surah Al-Fatiha
        this.currentlyPlayingIndex = 0; // Reset to first ayah
        this.isHighlighted = false; // Reset highlight
        this.fetchSurahDetails().then(() => {
        });
      }
    },
    selectedSurah: function(newVal) {
      if (newVal) {
        this.savePreference("selectedSurah", newVal);
        this.currentlyPlayingIndex = 0; // Reset to first ayah
        this.isHighlighted = false; // Reset highlight
        this.fetchSurahDetails().then(() => {
        });
      }
    },
    filteredAyahs: function(newAyahs) {
      this.isAudioPlaying = new Array(newAyahs.length).fill(false);
      this.progress = new Array(newAyahs.length).fill(0);
      this.$nextTick(() => {
        this.initializeAudioElements();
        this.$nextTick(() => {
          this.scrollToCard(0);
        });
      });
    }
  },
  methods: {
    highlightedText: function(ayah) {
      if (!ayah.text) return "";
      var words = ayah.text.split(" ");
      var self = this;
      return words
        .map(function(word, index) {
          var isHighlighted = index === self.highlightedWordIndex ? "highlighted-word" : "";
          return '<span class="' + isHighlighted + '">' + word + '</span>';
        })
        .join(" ");
    },
    initializeAudioElements: function() {
      var self = this;
      if (!this.$refs.audioCard || !this.$refs.audioCard.length) return;
      this.audioElements = this.filteredAyahs.map(function(ayah, index) {
        var audio = new Audio(ayah && ayah.audio ? ayah.audio : "");
        if (audio) {
          audio.playbackRate = self.playbackSpeed;
          audio.volume = self.volume;
          audio.addEventListener("timeupdate", function() { self.updateProgress(index); });
          audio.addEventListener("loadedmetadata", function() { self.progress[index] = 0; });
          audio.addEventListener("ended", function() { self.handleAyahEnd(index); });
        }
        return audio;
      });
    },
    playAudio: function(index) {
      if (!this.audioElements[index] || index >= this.filteredAyahs.length) return;
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        this.currentlyPlaying.pause();
        this.currentlyPlaying.currentTime = 0;
      }
      this.isAudioPlaying = this.isAudioPlaying.map(function(state, i) { return i === index; });
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.isHighlighted = true;
      var ayah = this.filteredAyahs[index];
      var self = this;
      this.currentlyPlaying.onloadedmetadata = function() {
        var duration = self.currentlyPlaying.duration;
        var wordCount = ayah.text.split(' ').length;
        if (wordCount > 0 && duration > 0) {
          var step = duration / wordCount;
          self.wordTimings = Array.from({length: wordCount}, function(_, i) { return i * step; });
        } else {
          self.wordTimings = [];
        }
      };
      // If already loaded, trigger manually
      if (this.currentlyPlaying.readyState >= 1) {
        this.currentlyPlaying.onloadedmetadata();
      }
      this.highlightedWordIndex = -1;
      this.currentlyPlaying.ontimeupdate = function() { self.syncHighlight(); };
      this.currentlyPlaying.play().catch(function(err) {
        console.error("Play error:", err);
        self.handleAyahEnd(index);
      });
      this.isAudioPlaying[index] = true;
      this.scrollToCard(index);
      this.showAudioPlayer = true;
    },
    pauseAudio: function(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.isAudioPlaying[index] = false;
      }
    },
    toggleAudioPlayer: function(index) {
      if (!this.audioElements[index]) return;
      if (!this.isAudioPlaying[index]) {
        this.playAudio(index);
      } else {
        this.pauseAudio(index);
      }
    },
    stopAudio: function(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.audioElements[index].currentTime = 0;
        this.isAudioPlaying[index] = false;
        this.progress[index] = 0;
        this.isHighlighted = false; // Remove highlight when stopped
      }
    },
    rewindAudio: function(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].currentTime = Math.max(0, this.audioElements[index].currentTime - 15);
      }
    },
    fastForwardAudio: function(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].currentTime = Math.min(this.audioElements[index].duration, this.audioElements[index].currentTime + 20);
      }
    },
    updateProgress: function(index) {
      if (this.audioElements[index] && this.audioElements[index].duration) {
        var progress = (this.audioElements[index].currentTime / this.audioElements[index].duration) * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime: function(seconds) {
      var minutes = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      return (minutes < 10 ? '0' : '') + minutes + ':' + (secs < 10 ? '0' : '') + secs;
    },
    highlightText: function(text) {
      if (!this.searchQuery || !text) return text || "";
      var regex = new RegExp('(' + this.searchQuery + ')', "gi");
      return text.replace(regex, '<span class="highlight">$1</span>');
    },
    scrollToCard: function(index) {
      var audioCards = this.$refs.audioCard;
      if (!audioCards) return;
      if (!Array.isArray(audioCards)) audioCards = [audioCards];
      if (!audioCards[index]) return;
      var self = this;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(function() {
        audioCards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    },
    handleScroll: function() {
      this.showScrollButton = window.scrollY > 220;
    },
    toggleVisibility: function() {
      this.isVisible = !this.isVisible;
    },
    increaseFontSize: function() {
      if (this.arabicFontSize < 40) this.arabicFontSize += 2;
      if (this.translationFontSize < 30) this.translationFontSize += 2;
    },
    decreaseFontSize: function() {
      if (this.arabicFontSize > 16) this.arabicFontSize -= 2;
      if (this.translationFontSize > 12) this.translationFontSize -= 2;
    },
    shareOnWhatsApp: function(ayah) {
      var message =
        'Surah ' + this.surahDetails.surahNumber + ' - ' + this.surahDetails.englishName + ' (Ayah ' + ayah.number + ')\n\n' +
        'Arabic: ' + ayah.text + '\n\n' +
        'Translation: ' + ayah.translation + '\n\n' +
        'Listen here: ' + ayah.audio;
      var encodedMessage = encodeURIComponent(message);
      var whatsappLink = 'https://api.whatsapp.com/send?text=' + encodedMessage;
      window.open(whatsappLink, "_blank");
    },
    getFlagFromLanguage: function(lang) {
      var languageFlags = {
        'en': '🇬🇧', 'ar': '🇸🇦', 'fr': '🇫🇷', 'es': '🇪🇸', 'ur': '🇵🇰', 'tr': '🇹🇷',
        'id': '🇮🇩', 'bn': '🇧🇩', 'fa': '🇮🇷', 'ru': '🇷🇺', 'de': '🇩🇪', 'it': '🇮🇹',
        'sw': '🇹🇿', 'zh': '🇨🇳', 'hi': '🇮🇳'
      };
      return languageFlags[lang.toLowerCase()] || '🌐';
    },
    fetchSurahs: function() {
      var self = this;
      fetch("https://api.alquran.cloud/v1/surah")
        .then(function(response) { return response.json(); })
        .then(function(data) { self.surahs = data.data; })
        .catch(function(error) { console.error("Error fetching Surahs:", error); });
    },
    fetchReciters: function() {
      var self = this;
      fetch("https://api.alquran.cloud/v1/edition/format/audio")
        .then(function(response) { return response.json(); })
        .then(function(data) {
          self.reciters = data.data
            .filter(function(reciter) { return reciter.identifier && reciter.englishName; })
            .map(function(reciter) {
              return {
                identifier: reciter.identifier,
                englishName: reciter.englishName || "Unknown Reciter"
              };
            });
        })
        .catch(function(error) { console.error("Error fetching Reciters:", error); });
    },
    fetchTranslations: function() {
      var self = this;
      fetch("https://api.alquran.cloud/v1/edition/type/translation")
        .then(function(response) { return response.json(); })
        .then(function(data) {
          let translations = data.data.map(function(translation) {
            return {
              identifier: translation.identifier,
              englishName: translation.englishName || "Unknown Translation",
              language: translation.language || "Unknown",
              flag: self.getFlagFromLanguage(translation.language || "Unknown")
            };
          }).filter(function(translation) { return translation.flag !== '🌐'; });
          // Sort by flag, then by englishName
          translations.sort(function(a, b) {
            if (a.flag < b.flag) return -1;
            if (a.flag > b.flag) return 1;
            // If flags are equal, sort by englishName
            if (a.englishName < b.englishName) return -1;
            if (a.englishName > b.englishName) return 1;
            return 0;
          });
          self.translations = translations;
        })
        .catch(function(error) { console.error("Error fetching Translations:", error); });
    },
    fetchSurahDetails: function() {
      var self = this;
      if (!this.selectedSurah || !this.selectedReciter || !this.selectedTranslation) return Promise.resolve();
      return fetch('https://api.alquran.cloud/v1/surah/' + this.selectedSurah + '/editions/' + this.selectedReciter + ',' + this.selectedTranslation)
        .then(function(response) { return response.json(); })
        .then(function(data) {
          var arabicText = data.data[0];
          var translation = data.data[1];
          self.surahDetails = {
            surahNumber: self.selectedSurah,
            englishName: arabicText.englishName,
            name: arabicText.name,
            ayahs: arabicText.ayahs.map(function(ayah, index) {
              return {
                number: ayah.number,
                text: ayah.text,
                translation: translation.ayahs[index] && translation.ayahs[index].text ? translation.ayahs[index].text : "Translation not available",
                audio: ayah.audio || ""
              };
            })
          };
          self.resetAllAudioPlayers();
        })
        .catch(function(error) { console.error("Error fetching Surah details:", error); });
    },
    resetAllAudioPlayers: function() {
      var self = this;
      this.$nextTick(function() {
        if (self.currentlyPlaying) {
          self.currentlyPlaying.pause();
          self.currentlyPlaying = null;
          self.currentlyPlayingIndex = 0;
        }
        if (self.audioElements && self.audioElements.forEach) {
          self.audioElements.forEach(function(audio) { if (audio && audio.remove) audio.remove(); });
        }
        self.initializeAudioElements();
        self.isAudioPlaying = new Array(self.filteredAyahs.length).fill(false);
        self.progress = new Array(self.filteredAyahs.length).fill(0);
      });
    },
    savePreference: function(key, value) {
      localStorage.setItem(key, value);
    },
    handleAyahEnd: function(index) {
      if (this.isAudioPlaying[index]) {
        this.stopAudio(index);
        this.playNextAyah();
      }
    },
    playNextAyah: function() {
      if (this.filteredAyahs.length > 0) {
        var nextIndex = (this.currentlyPlayingIndex + 1) % this.filteredAyahs.length;
        this.playAudio(nextIndex);
      }
    },
    toggleVolume: function() {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume: function() {
      if (this.currentlyPlaying) {
        this.currentlyPlaying.volume = this.volume;
      }
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach(function(audio) {
          if (audio) audio.volume = this.volume;
        }.bind(this));
      }
    },
    closeAudioPlayer: function() {
      if (this.currentlyPlayingIndex !== null) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = 0;
      this.currentlyPlaying = null;
      this.isHighlighted = false;
    },
    syncHighlight: function() {
      var audio = this.currentlyPlaying;
      if (!audio || !this.wordTimings.length) return;
      var currentTime = audio.currentTime;
      var index = this.wordTimings.findIndex(function(t, i, arr) {
        return currentTime >= t && (i === arr.length - 1 || currentTime < arr[i + 1]);
      });
      this.highlightedWordIndex = index;
    }
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
    // Clear localStorage to prevent loading previous selections
    localStorage.removeItem("selectedSurah");
    localStorage.removeItem("selectedReciter");
    localStorage.removeItem("selectedTranslation");
    // Explicitly set to Surah Al-Fatiha and Ayah 1 on page load
    this.selectedSurah = "1";
    this.selectedReciter = "ar.alafasy";
    this.selectedTranslation = "en.ahmedali";
    this.currentlyPlayingIndex = 0;
    this.isHighlighted = false;
    this.fetchReciters();
    this.fetchSurahs();
    this.fetchTranslations();
    this.fetchSurahDetails();
  },
  beforeUnmount: function() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.audioElements && this.audioElements.forEach) {
      this.audioElements.forEach(function(audio) { if (audio && audio.pause) audio.pause(); });
    }
  }
};
</script>

<style scoped>
.highlighted {
  background-color: #b5e6db;
  border-radius: 8px;
}

.rtl-text {
  direction: rtl;
}

.ltr-text {
  direction: ltr;
}

.sticky-dropdown {
  position: sticky;
  top: 80px;
  z-index: 1000;
  background-color: #343a40;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: top 0.3s ease;
}

@media (max-width: 768px) {
  .sticky-dropdown {
    top: 60px; /* Adjust based on your mobile header height */
  }
  
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

/* Add padding to bottom of container when audio player is visible */
.container {
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

/* Smooth scroll container */
.row.rtl-text {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
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
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .controls {
    gap: 10px;
  }

  .control-btn {
    padding: 5px !important;
    font-size: 1.2rem !important;
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
  scroll-margin-top: 120px; /* Sticky header height + margin */
}

@media (max-width: 768px) {
  .ayah-card-container {
    scroll-margin-top: 100px;
  }
}

/* Card Styles */
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

/* Responsive Typography */
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

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .ayah-card {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .sticky-dropdown {
    background-color: rgba(52, 58, 64, 0.95);
  }
}

/* Touch-friendly Controls */
@media (hover: none) {
  .control-btn {
    padding: 12px;
    margin: 0 5px;
  }

  .control-btn:active {
    transform: scale(0.95);
  }
}

/* Improved Scrolling */
.smooth-scroll {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Loading States */
.loading-placeholder {
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

/* Hide on mobile */
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