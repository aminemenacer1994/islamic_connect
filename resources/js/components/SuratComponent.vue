<template>
  <div class="container py-4">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-10">
        <h1 class="display-5 fw-bold">Quran Explorer</h1>
        <p class="lead">
          Explore the Quran in Arabic, accompanied by translations and recitations from world-renowned Qaris.
          Listen to beautiful recitations to deepen your understanding. Select a Surah, choose an audio reciter, or view
          the translation of a specific verse, and immerse yourself in the wisdom of the Quran.
        </p>
      </div>
    </div>

    <!-- Sticky Dropdowns Container -->
    <div class="sticky-dropdown" style="top: 50px">
      <span @click="toggleVisibility" class="text-white" style="cursor: pointer;">
        <i v-if="isVisible" class="bi bi-x-lg"></i>
        <i v-else class="bi bi-plus-lg"></i>
      </span>
      <div v-show="isVisible" class="row g-3" style="padding: 6px;">
        <div class="col-12 col-md-4">
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
          <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation" @change="fetchSurahDetails">
            <option value="" disabled>Select Translation</option>
            <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
              {{ translation.flag }} {{ translation.englishName }} ({{ translation.language }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row rtl-text">
      <div style="padding: 12px;" ref="audioCard" v-for="(ayah, index) in filteredAyahs" :key="ayah.number" :ref="'audioCard_' + index" class="col-md-12 mb-2 mt-2">
        <div class="shadow-xl h-100 rtl-text d-flex flex-column" style="
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            display: flex;
            flex-direction: column;
            height: 100%;
          ">
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
                <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(ayah)" :style="{ fontSize: arabicFontSize + 'px' }"></p>
                <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">Translation:</h4>
                <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)" :style="{ fontSize: translationFontSize + 'px' }"></p>
              </div>
            </div>
            <div class="col-md-1 text-center">
              <div class="d-flex flex-column align-items-center gap-3 pb-4">
                <div class="icon-hover" @click="toggleAudioPlayer(index)">
                  <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle' : 'bi-play-circle'" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="right" :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
                <div class="icon-hover" @click="decreaseFontSize">
                  <i class="bi bi-dash-circle" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="right" title="Decrease Font Size"></i>
                </div>
                <div class="icon-hover" @click="increaseFontSize">
                  <i class="bi bi-plus-circle" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="right" title="Increase Font Size"></i>
                </div>
                <div class="icon-hover" @click="shareOnWhatsApp(ayah)">
                  <i class="bi bi-share" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="right" title="Share Ayah"></i>
                </div>
                <div class="icon-hover" @click="copyAyah(ayah)">
                  <i class="bi bi-clipboard" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="right" title="Copy Ayah"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile/Tablet Layout: Text then Icons -->
          <div class="d-block d-md-none">
            <div style="padding: 2px;">
              <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(ayah)" :style="{ fontSize: arabicFontSize + 'px' }"></p>
              <h4 class="fw-bold pt-2 hide-on-mobile-tablet ml-2">Translation:</h4>
              <p class="fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)" :style="{ fontSize: translationFontSize + 'px' }"></p>
            </div>
            <div class="row mb-3" style="display: flex; justify-content: center; margin: 0 -5px;">
              <div class="col-2 text-center" style="padding: 5px;">
                <div class="icon-hover" @click="toggleAudioPlayer(index)" style="cursor: pointer;">
                  <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle' : 'bi-play-circle'" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="top" :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div class="icon-hover" @click="decreaseFontSize" style="cursor: pointer;">
                  <i class="bi bi-dash-circle" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Decrease Font Size"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div class="icon-hover" @click="increaseFontSize" style="cursor: pointer;">
                  <i class="bi bi-plus-circle" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Increase Font Size"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div class="icon-hover" @click="shareOnWhatsApp(ayah)" style="cursor: pointer;">
                  <i class="bi bi-share" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Share Ayah"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div class="icon-hover" @click="copyAyah(ayah)" style="cursor: pointer;">
                  <i class="bi bi-clipboard" style="font-size: 1.2rem; width: 1.2rem; height: 1.2rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Copy Ayah"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Global Custom Audio Player -->
    <div v-if="isAudioPlaying.some(state => state)" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="controls">
          <span class="time-display">-{{"-" + formatTime(audioElements[currentlyPlayingIndex]?.duration - (audioElements[currentlyPlayingIndex]?.currentTime || 0) || 0)}}</span>
          <div class="progress-bar-container" @click="seekAudio($event)">
            <div class="progress-bar">
              <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
            </div>
          </div>
          <div class="playback-controls">
            <button @click="rewindAudio" class="control-btn rewind" title="Rewind 15s">
              <i class="bi bi-rewind"></i>
            </button>
            <button @click="togglePlayPause" class="control-btn play-pause" :title="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'">
              <i :class="isAudioPlaying[currentlyPlayingIndex] ? 'bi-pause-fill' : 'bi-play-fill'"></i>
            </button>
            <button @click="fastForwardAudio" class="control-btn fast-forward" title="Fast Forward 15s">
              <i class="bi bi-fast-forward"></i>
            </button>
            <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn stop" title="Stop">
              <i class="bi bi-x-circle-fill"></i>
            </button>
          </div>
          <span class="time-display">{{ formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ayah", "arabicFontSize"],
  data() {
    return {
      isAudioPlaying: [],
      currentlyPlaying: null,
      currentlyPlayingIndex: null,
      scrollTimeout: null,
      showScrollButton: false,
      isVisible: true,
      loading: true,
      displayedAyahs: [],
      ayahBatchSize: 9,
      surahs: [],
      reciters: [],
      translations: [],
      selectedSurah: localStorage.getItem("selectedSurah") || "1",
      selectedReciter: "ar.alafasy",
      selectedTranslation: localStorage.getItem("selectedTranslation") || "en.ahmedali",
      selectedJuz: null,
      surahDetails: null,
      searchQuery: "",
      arabicFontSize: 23,
      translationFontSize: 19,
      words: [],
      timestamps: [],
      highlightedAyah: "",
      wordTimings: [],
      highlightedWordIndex: -1,
      currentAyahIndex: 0,
      progress: [],
      audioElements: [],
      playbackSpeed: 1.0,
    };
  },
  mounted() {
    this.audioElement = new Audio();
    this.prepareAyahText();
    window.addEventListener("scroll", this.handleScroll);
    this.resetToDefault();
    this.loadPreferences();
    this.fetchReciters().then(() => {
      if (!this.reciters.some(r => r.identifier === this.selectedReciter)) {
        this.selectedReciter = this.reciters.length > 0 ? this.reciters[0].identifier : "ar.alafasy";
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.audioElements.forEach(audio => audio && audio.pause());
  },
  created() {
    this.fetchSurahs();
    this.fetchReciters();
    this.fetchTranslations();
  },
  watch: {
    selectedReciter(newVal) {
      if (newVal) {
        this.savePreference("selectedReciter", newVal);
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          if (this.currentlyPlayingIndex !== null) {
            this.playAudio(this.currentlyPlayingIndex);
          }
        });
      }
    },
    selectedTranslation(newVal) {
      if (newVal) {
        this.savePreference("selectedTranslation", newVal);
        this.fetchSurahDetails();
      }
    },
    selectedSurah(newVal) {
      if (newVal) {
        this.savePreference("selectedSurah", newVal);
        this.fetchSurahDetails();
      }
    },
    ayah: {
      handler(newAyah) {
        if (newAyah && newAyah.text) {
          this.prepareAyahText();
        }
      },
      immediate: true,
    },
    filteredAyahs(newAyahs) {
      this.isAudioPlaying = new Array(newAyahs.length).fill(false);
      this.progress = new Array(newAyahs.length).fill(0);
      this.audioElements = new Array(newAyahs.length);
      this.$nextTick(() => {
        this.initializeAudioElements();
      });
    },
  },
  computed: {
    filteredAyahs() {
      if (!this.surahDetails) return [];
      if (!this.searchQuery) return this.surahDetails.ayahs;
      const query = this.searchQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(
        (ayah) =>
          ayah.text.toLowerCase().includes(query) ||
          ayah.translation.toLowerCase().includes(query)
      );
    },
    highlightedText() {
      return (ayah) => {
        if (!ayah.text) return "";
        const words = ayah.text.split(" ");
        return words.join(" ");
      };
    },
  },
  methods: {
    initializeAudioElements() {
      if (!this.$refs.audioCard || !this.$refs.audioCard.length) return;
      this.audioElements = this.$refs.audioCard.map((card, index) => {
        const audio = new Audio(this.filteredAyahs[index]?.audio || "");
        if (audio) {
          audio.playbackRate = this.playbackSpeed;
          audio.addEventListener("timeupdate", () => this.updateProgress(index));
          audio.addEventListener("loadedmetadata", () => {
            this.progress[index] = 0;
          });
          audio.addEventListener("ended", () => this.handleAyahEnd(index));
        }
        return audio;
      });
    },
    toggleAudioPlayer(index) {
      if (!this.audioElements[index]) return;
      if (!this.isAudioPlaying[index]) {
        this.playAudio(index);
      } else {
        this.pauseAudio(index);
      }
    },
    togglePlayPause() {
      if (this.currentlyPlayingIndex !== null) {
        this.toggleAudioPlayer(this.currentlyPlayingIndex);
      }
    },
    playAudio(index) {
      if (!this.audioElements[index] || index >= this.filteredAyahs.length) return;
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        this.currentlyPlaying.pause();
        this.currentlyPlaying.currentTime = 0;
      }
      this.isAudioPlaying = this.isAudioPlaying.map((state, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.currentlyPlaying.play().catch(err => {
        console.error("Play error:", err);
        this.handleAyahEnd(index);
      });
      this.isAudioPlaying[index] = true;
      const audioCards = this.$refs[`audioCard_${index}`];
      if (audioCards) audioCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
      this.scrollToCard(index);
    },
    pauseAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.isAudioPlaying[index] = false;
      }
    },
    stopAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.audioElements[index].currentTime = 0;
        this.isAudioPlaying[index] = false;
        this.progress[index] = 0;
      }
    },
    rewindAudio() {
      if (this.currentlyPlayingIndex !== null && this.audioElements[this.currentlyPlayingIndex]) {
        const audio = this.audioElements[this.currentlyPlayingIndex];
        audio.currentTime = Math.max(0, audio.currentTime - 15);
        this.updateProgress(this.currentlyPlayingIndex);
      }
    },
    fastForwardAudio() {
      if (this.currentlyPlayingIndex !== null && this.audioElements[this.currentlyPlayingIndex]) {
        const audio = this.audioElements[this.currentlyPlayingIndex];
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
        this.updateProgress(this.currentlyPlayingIndex);
      }
    },
    updateProgress(index) {
      if (this.audioElements[index] && this.audioElements[index].duration) {
        const progress = (this.audioElements[index].currentTime / this.audioElements[index].duration) * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    highlightText(text) {
      if (!this.searchQuery || !text) return text || "";
      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return text.replace(regex, `<span class="highlight">$1</span>`);
    },
    scrollToCard(index) {
      const audioCards = this.$refs[`audioCard_${index}`];
      if (!audioCards || !audioCards.length) return;
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        audioCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    prepareAyahText() {
      if (!this.ayah || !this.ayah.text) return;
      this.words = this.ayah.text.split(" ");
      this.timestamps = this.words.map((_, index) => index * 0.5);
      this.highlightedAyah = this.words.join(" ");
    },
    syncHighlight() {
      const audio = this.currentlyPlaying;
      if (!audio) return;
      let currentTime = audio.currentTime;
      let highlightedWords = this.words.map((word, index) => {
        return currentTime >= this.timestamps[index] ? `<span class="highlight">${word}</span>` : word;
      });
      this.highlightedAyah = highlightedWords.join(" ");
    },
    async copyAyah(ayah) {
      const ayahText = `Surah number: ${this.surahDetails.surahNumber}\n\nSurah name: ${this.surahDetails.englishName}\n\nAyah text: ${ayah.text}\n\nTranslation: ${ayah.translation}`;
      try {
        await navigator.clipboard.writeText(ayahText);
        this.showAlert("success", "Ayah & Translation copied to clipboard!");
      } catch (error) {
        console.error("Error copying text:", error);
        this.showAlert("danger", "Failed to copy Ayah. Please try again.");
      }
    },
    increaseFontSize() {
      if (this.arabicFontSize < 40) this.arabicFontSize += 2;
      if (this.translationFontSize < 30) this.translationFontSize += 2;
    },
    decreaseFontSize() {
      if (this.arabicFontSize > 16) this.arabicFontSize -= 2;
      if (this.translationFontSize > 12) this.translationFontSize -= 2;
    },
    shareOnWhatsApp(ayah) {
      const message =
        `Surah ${this.surahDetails.surahNumber} - ${this.surahDetails.englishName} (Ayah ${ayah.number})\n\n` +
        `Arabic: ${ayah.text}\n\n` +
        `Translation: ${ayah.translation}\n\n` +
        `Listen here: ${ayah.audio}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    },
    async fetchSurahs() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) throw new Error("Failed to fetch Surahs");
        const data = await response.json();
        this.surahs = data.data;
      } catch (error) {
        console.error("Error fetching Surahs:", error);
      }
    },
    async fetchReciters() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/edition/format/audio");
        if (!response.ok) throw new Error("Failed to fetch Reciters");
        const data = await response.json();
        this.reciters = data.data
          .filter((reciter) => reciter.identifier && reciter.englishName)
          .map((reciter) => ({
            identifier: reciter.identifier,
            englishName: reciter.englishName || "Unknown Reciter",
          }))
          .filter(reciter => ![
            'elmir kuliev by 1muslimapp',
            'elmir kuliev 2 by 1muslimapp',
            'elmir kuliev 1muslim',
            'elmir kuliev 2muslim',
            'chinese',
            'ibrahim walk',
            'fooladvand - hedayatfar',
            'shamshad ali khan',
            'youssouf leclerc'
          ].includes(reciter.englishName.toLowerCase()));
        if (this.reciters.length === 0) {
          this.reciters.push({ identifier: "ar.alafasy", englishName: "Mishary Rashid Alafasy" });
        }
      } catch (error) {
        console.error("Error fetching Reciters:", error);
        this.reciters = [{ identifier: "ar.alafasy", englishName: "Mishary Rashid Alafasy" }];
      }
    },
    async fetchTranslations() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/edition/type/translation");
        if (!response.ok) throw new Error("Failed to fetch Translations");
        const data = await response.json();
        this.translations = data.data.map(translation => ({
          identifier: translation.identifier,
          englishName: translation.englishName || "Unknown Translation",
          language: translation.language || "Unknown",
          flag: this.getFlagFromLanguage(translation.language || "Unknown")
        })).filter(translation => translation.flag !== '🌐');
      } catch (error) {
        console.error("Error fetching Translations:", error);
      }
    },
    getFlagFromLanguage(lang) {
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
    async fetchSurahDetails() {
      if (!this.selectedSurah || !this.selectedReciter || !this.selectedTranslation) return;
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`
        );
        if (!response.ok) throw new Error("Failed to fetch Surah details");
        const data = await response.json();
        const arabicText = data.data[0];
        const translation = data.data[1];
        this.surahDetails = {
          surahNumber: this.selectedSurah,
          englishName: arabicText.englishName,
          name: arabicText.name,
          ayahs: arabicText.ayahs.map((ayah, index) => ({
            number: ayah.number,
            text: ayah.text,
            translation: translation.ayahs[index]?.text || "Translation not available",
            audio: ayah.audio || "",
          })),
        };
        if (this.surahDetails.ayahs.length > 0) {
          this.currentAudioUrl = this.surahDetails.ayahs[0].audio;
        }
        this.resetAllAudioPlayers();
      } catch (error) {
        console.error("Error fetching Surah details:", error);
      }
    },
    resetAllAudioPlayers() {
      this.$nextTick(() => {
        this.audioElements.forEach((audio, index) => {
          if (audio) {
            audio.pause();
            audio.src = this.filteredAyahs[index]?.audio || "";
            audio.load();
            audio.currentTime = 0;
            audio.playbackRate = this.playbackSpeed;
          }
        });
      });
    },
    async fetchJuzDetails() {
      if (!this.selectedJuz || this.selectedJuz < 1 || this.selectedJuz > 30) return;
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/juz/${this.selectedJuz}/editions/${this.selectedReciter},${this.selectedTranslation}`
        );
        if (!response.ok) throw new Error("Failed to fetch Juz details");
        const data = await response.json();
        const arabicText = data.data[0];
        const translation = data.data[1];
        this.surahDetails = {
          englishName: `Juz ${this.selectedJuz}`,
          name: `Juz ${this.selectedJuz}`,
          ayahs: arabicText.ayahs.map((ayah, index) => ({
            number: ayah.number,
            text: ayah.text,
            translation: translation.ayahs[index]?.text || "Translation not available",
            audio: ayah.audio || "",
          })),
        };
      } catch (error) {
        console.error("Error fetching Juz details:", error);
      }
    },
    handleAyahEnd(index) {
      if (this.isAudioPlaying[index]) {
        this.stopAudio(index);
        this.playNextAyah();
      }
    },
    playNextAyah() {
      if (this.filteredAyahs.length > 0) {
        const nextIndex = (this.currentlyPlayingIndex + 1) % this.filteredAyahs.length;
        this.playAudio(nextIndex);
      }
    },
    stopAllAudio() {
      this.audioElements.forEach((audio, index) => {
        if (audio) {
          audio.pause();
          this.isAudioPlaying[index] = false;
          this.progress[index] = 0;
        }
      });
      this.currentlyPlaying = null;
      this.currentlyPlayingIndex = null;
    },
    setSpeed(speed) {
      this.playbackSpeed = speed;
      this.updatePlaybackSpeed();
    },
    updatePlaybackSpeed() {
      if (this.currentlyPlaying) {
        this.currentlyPlaying.playbackRate = this.playbackSpeed;
      }
      this.audioElements.forEach(audio => {
        if (audio) audio.playbackRate = this.playbackSpeed;
      });
    },
    selectReciter(reciterId) {
      this.selectedReciter = reciterId;
      this.savePreference("selectedReciter", reciterId);
      this.fetchSurahDetails().then(() => {
        if (this.currentlyPlayingIndex !== null) {
          this.playAudio(this.currentlyPlayingIndex);
        }
      });
    },
    seekAudio(event) {
      if (this.audioElements[this.currentlyPlayingIndex] && this.audioElements[this.currentlyPlayingIndex].duration) {
        const progressBar = event.currentTarget.querySelector(".progress-bar");
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const clickPercentage = (clickX / width) * 100;
        const newTime = (clickPercentage / 100) * this.audioElements[this.currentlyPlayingIndex].duration;
        this.audioElements[this.currentlyPlayingIndex].currentTime = newTime;
        this.updateProgress(this.currentlyPlayingIndex);
      }
    },
    showAlert(variant, message) {
      this.$nextTick(() => {
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${variant} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertDiv.style.zIndex = 1050;
        alertDiv.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
      });
    },
    savePreference(key, value) {
      localStorage.setItem(key, value);
    },
    loadPreferences() {
      const savedReciter = localStorage.getItem("selectedReciter");
      const savedTranslation = localStorage.getItem("selectedTranslation");
      if (savedReciter) this.selectedReciter = savedReciter;
      if (savedTranslation) this.selectedTranslation = savedTranslation;
    },
    resetToDefault() {
      this.selectedSurah = "1";
      this.savePreference("selectedSurah", "1");
      this.fetchSurahDetails();
      window.scrollTo({ top: 0, behavior: "auto" });
    },
  },
};
</script>

<style scoped>
.rtl-text {
  direction: rtl;
}

.ltr-text {
  direction: ltr;
}

.hide-on-mobile-tablet {
  display: block;
}

@media (max-width: 991px) {
  .hide-on-mobile-tablet {
    display: none;
  }
}

.sticky-dropdown {
  position: sticky;
  top: 50px;
  z-index: 1000;
  background-color: #343a40;
  padding: 10px;
  border-radius: 8px;
}

.sticky-dropdown .row {
  margin-left: 0;
  margin-right: 0;
}

@media (max-width: 768px) {
  .sticky-dropdown {
    padding: 5px;
  }
  .sticky-dropdown .col-12 {
    margin-bottom: 10px;
  }
  .sticky-dropdown .form-select {
    font-size: 0.9rem;
  }
  .sticky-dropdown .form-label {
    font-size: 0.9rem;
  }
}

@media (min-width: 769px) and (max-width: 991px) {
  .sticky-dropdown {
    padding: 8px;
  }
  .sticky-dropdown .col-md-4 {
    margin-bottom: 10px;
  }
  .sticky-dropdown .form-select {
    font-size: 1rem;
  }
  .sticky-dropdown .form-label {
    font-size: 1rem;
  }
}

@media (min-width: 992px) {
  .sticky-dropdown {
    padding: 10px;
  }
  .sticky-dropdown .col-md-4 {
    margin-bottom: 0;
  }
  .sticky-dropdown .form-select {
    font-size: 1.1rem;
  }
  .sticky-dropdown .form-label {
    font-size: 1.1rem;
  }
}

.icon-hover {
  transition: all 0.3s ease;
}

.icon-hover:hover {
  color: #00bfa6;
  transform: scale(1.1);
}

.audio-player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  background-color: #1a1a1a;
  padding: 10px 20px;
  border-top: 1px solid #333;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.5s ease-out;
}

.custom-audio-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  height: 60px;
  background: transparent;
}

.controls {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.time-display {
  font-size: 0.9rem;
  color: #bbb;
  min-width: 40px;
  text-align: center;
}

.progress-bar-container {
  flex-grow: 1;
  margin: 0 15px;
  height: 4px;
  background-color: #333;
  position: relative;
  cursor: pointer;
}

.progress-bar {
  height: 100%;
  background-color: #00bfa6;
  position: absolute;
  top: 0;
  left: 0;
}

.progress {
  height: 100%;
  background-color: #00bfa6;
  transition: width 0.1s linear;
  animation: progressPulse 1s infinite alternate;
}

.playback-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.control-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.control-btn:hover {
  color: #00bfa6;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes progressPulse {
  from {
    background-color: #00bfa6;
  }
  to {
    background-color: #009e8a;
  }
}
</style>