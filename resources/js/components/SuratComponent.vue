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
        <i v-else class="bi bi-plus-lg h5"></i>
      </span>
      <div v-show="isVisible" class="row g-3" style="padding: 6px;">
        <div class="col-md-4">
          <label for="surah-select" class="form-label text-white">Select Surah:</label>
          <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah" @change="fetchSurahDetails">
            <option value="" disabled selected>Select a Surah</option>
            <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
              {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="reciter-select" class="form-label text-white">Select Reciter:</label>
          <select id="reciter-select" class="form-select shadow-sm" v-model="selectedReciter">
            <option value="" disabled>Select a reciter</option>
            <option v-for="reciter in reciters" :key="reciter.identifier" :value="reciter.identifier">
              {{ reciter.englishName }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="translation-select" class="form-label text-white">Select Translation:</label>
          <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation" @change="fetchSurahDetails">
            <option value="" disabled selected>Select Translation</option>
            <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
              {{ translation.englishName }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row rtl-text">
      <div style="padding: 12px;" ref="audioCard" v-for="(ayah, index) in filteredAyahs" :key="ayah.number" class="col-md-12 mb-2 mt-2">
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
            <div class="dropdown">
              <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical h2 mt-3"></i>
              </div>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="javascript:void(0)" @click="shareOnWhatsApp(ayah)">
                    <div class="col text-center">
                      <div class="d-flex flex-column align-items-center">
                        <span class="mt-1 ml-2" style="font-size: 1.2rem">Share Ayah</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)" @click="copyAyah(ayah)">
                    <div class="col text-center">
                      <div class="d-flex flex-column align-items-center">
                        <span class="mt-1 ml-2 text-left" style="font-size: 1.2rem">Copy Ayah</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
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
              <div class="d-flex flex-column align-items-center">
                <div class="mb-3" @click="toggleAudioPlayer(index)">
                  <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle' : 'bi-play-circle'" style="cursor: pointer; font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="right" :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
                <div class="mb-3" @click="rewindAudio(index)">
                  <i class="bi bi-skip-backward-circle" style="cursor: pointer; font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="right" title="Rewind"></i>
                </div>
                <div class="mb-3" @click="decreaseFontSize">
                  <i style="cursor: pointer; font-size: 1.3rem;" class="bi bi-dash-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Decrease Font Size"></i>
                </div>
                <div class="mb-3" @click="increaseFontSize">
                  <i style="cursor: pointer; font-size: 1.3rem;" class="bi bi-plus-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Increase Font Size"></i>
                </div>
                <div class="mb-3" @click="fastForwardAudio(index)">
                  <i class="bi bi-skip-forward-circle" style="cursor: pointer; font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="right" title="Fast Forward"></i>
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
                <div @click="toggleAudioPlayer(index)" style="cursor: pointer;">
                  <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle' : 'bi-play-circle'" style="font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="top" :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div @click="rewindAudio(index)" style="cursor: pointer;">
                  <i class="bi bi-skip-backward-circle" style="font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Rewind"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div @click="decreaseFontSize" style="cursor: pointer;">
                  <i class="bi bi-dash-circle" style="font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Decrease Font Size"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div @click="increaseFontSize" style="cursor: pointer;">
                  <i class="bi bi-plus-circle" style="font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Increase Font Size"></i>
                </div>
              </div>
              <div class="col-2 text-center" style="padding: 5px;">
                <div @click="fastForwardAudio(index)" style="cursor: pointer;">
                  <i class="bi bi-skip-forward-circle" style="font-size: 1.3rem;" data-bs-toggle="tooltip" data-bs-placement="top" title="Fast Forward"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top FAB -->
    <button v-show="showScrollButton" @click="scrollToTop" class="fab" title="Scroll to top">
      <i class="bi bi-chevron-double-up pt-1 h2"></i>
    </button>

    <button v-if="isAudioPlaying.some(state => state)" class="fab_audio" @click="scrollToCurrentAudio">
      <i class="bi bi-reply h2"></i>
    </button>

    <!-- Global Custom Audio Player -->
    <div v-if="isAudioPlaying.some(state => state)" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
        </div>
        <div class="controls">
          <span class="time">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{ formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause">
            <i v-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill"></i>
            <i v-else class="bi bi-play-fill"></i>
          </button>
          <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
          <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn">
            <i class="bi bi-x-circle-fill"></i>
          </button>
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
      selectedSurah: "",
      selectedReciter: "ar.alafasy",
      selectedTranslation: "en.asad",
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
    };
  },
  mounted() {
    this.audioElement = new Audio();
    this.prepareAyahText();
    window.addEventListener("scroll", this.handleScroll);
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
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
        });
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
        return words
          .map((word, index) => {
            const isHighlighted = index === this.highlightedWordIndex ? "highlighted-word" : "";
            return `<span class="${isHighlighted}">${word}</span>`;
          })
          .join(" ");
      };
    },
  },
  methods: {
    initializeAudioElements() {
      if (!this.$refs.audioCard || !this.$refs.audioCard.length) return;
      this.audioElements = this.$refs.audioCard.map((card, index) => {
        const audio = new Audio(this.filteredAyahs[index]?.audio || "");
        audio.addEventListener("timeupdate", () => this.updateProgress(index));
        audio.addEventListener("loadedmetadata", () => {
          this.progress[index] = 0;
        });
        audio.addEventListener("ended", () => this.pauseAudio(index));
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
    playAudio(index) {
      if (!this.audioElements[index]) return;
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        this.currentlyPlaying.pause();
        this.currentlyPlaying.currentTime = 0;
      }
      this.isAudioPlaying = this.isAudioPlaying.map((state, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.currentlyPlaying.play().catch(err => console.error("Play error:", err));
      this.isAudioPlaying[index] = true;
      const audioCards = this.$refs.audioCard;
      audioCards.forEach(card => card.classList.remove('highlighted'));
      if (audioCards[index]) audioCards[index].classList.add('highlighted');
      this.scrollToCard(index);
    },
    pauseAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.isAudioPlaying[index] = false;
        this.currentlyPlaying = null;
      }
    },
    stopAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.audioElements[index].currentTime = 0;
        this.isAudioPlaying[index] = false;
        this.currentlyPlaying = null;
        this.progress[index] = 0;
      }
    },
    rewindAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].currentTime = Math.max(0, this.audioElements[index].currentTime - 15);
      }
    },
    fastForwardAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].currentTime = Math.min(this.audioElements[index].duration, this.audioElements[index].currentTime + 20);
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
      const audioCards = this.$refs.audioCard;
      if (!audioCards || !audioCards[index]) return;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        audioCards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    },
    resetAudioPlayer() {
      if (this.currentlyPlaying) {
        this.currentlyPlaying.pause();
        this.currentlyPlaying.src = this.currentAudioUrl;
        this.currentlyPlaying.load();
        this.currentlyPlaying.play();
      }
    },
    checkIfAnyAudioPlaying() {
      this.isAudioPlaying = this.audioElements.map(audio => audio && !audio.paused);
    },
    scrollToCurrentAudio() {
      const index = this.isAudioPlaying.findIndex(state => state);
      if (index !== -1 && this.$refs.audioCard[index]) {
        window.scrollTo({
          top: this.$refs.audioCard[index].offsetTop - 200,
          behavior: "smooth",
        });
      }
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
        return currentTime >= this.timestamps[index]
          ? `<span class="highlight">${word}</span>`
          : word;
      });
      this.highlightedAyah = highlightedWords.join(" ");
    },
    async copyAyah(ayah) {
      const ayahText = `Surah number: ${this.surahDetails.surahNumber}\n\nSurah name: ${this.surahDetails.englishName}\n\nAyah text: ${ayah.text}\n\nTranslation: ${ayah.translation}`;
      try {
        await navigator.clipboard.writeText(ayahText);
        window.alert("Ayah & Translation copied to clipboard");
      } catch (error) {
        console.error("Error copying text:", error);
        window.alert("Failed to copy Ayah. Please try again.");
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
    async downloadAudio(audioUrl, filename) {
      if (!audioUrl) {
        alert("Audio not available for this Ayah.");
        return;
      }
      try {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading audio:", error);
        alert("Failed to download audio.");
      }
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
          }));
      } catch (error) {
        console.error("Error fetching Reciters:", error);
      }
    },
    async fetchTranslations() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/edition/type/translation");
        if (!response.ok) throw new Error("Failed to fetch Translations");
        const data = await response.json();
        this.translations = data.data;
      } catch (error) {
        console.error("Error fetching Translations:", error);
      }
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

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001; /* Above audio player */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fab_audio {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1001; /* Above audio player */
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.highlighted {
  transform: scale(1.02);
  box-shadow: 2px solid black;
}

.highlighted-word,
.highlight {
  background-color: #ffd700;
}

.audio-player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Below FABs but above other content */
  background-color: rgba(33, 33, 33, 0.7); /* Transparent background */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5); /* Subtle upward shadow */
  border-radius: 10px 10px 0 0; /* Rounded top corners */
  padding: 5px 10px;
}

.custom-audio-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 1rem;
  padding: 5px 15px;
}

.progress-bar {
  flex-grow: 1;
  height: 5px;
  background-color: #666;
  margin: 0 10px;
}

.progress {
  height: 100%;
  background-color: #1ed760;
  transition: width 0.1s linear;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.control-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;
}

.control-btn:hover {
  color: #1ed760;
}

.time {
  font-size: 0.9rem;
  margin-right: 10px;
}
</style>