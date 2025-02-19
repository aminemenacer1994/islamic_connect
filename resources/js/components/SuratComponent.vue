<template>
  <div class="container py-4">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-10">
        <h2 class="display-5 fw-bold">Quran Explorer</h2>
        <p class="lead">Explore the Quran in Arabic with translations and recitations from world-renowned Qaris.
          Listen to beautiful recitations to enhance your understanding. Select a Surah, Juz, or specific verse, and
          immerse yourself in the wisdom of the Quran.
        </p>
      </div>
    </div>

    <!-- Sticky Dropdowns Container -->
    <div class="sticky-dropdown container-fluid">
      <!-- Show/Hide icon for the entire container -->
      <span @click="toggleVisibility" class="text-white" style="cursor: pointer;">
        <i v-if="isVisible" class="bi bi-x-lg"></i> <!-- X icon to hide -->
        <i v-else class="bi bi-plus-lg"></i> <!-- + icon to show -->
      </span>

      <!-- The entire content of the dropdowns -->
      <div v-show="isVisible" class="row g-3" style="padding: 6px;">

        <!-- Dropdown to select Surah -->
        <div class="col-md-4">
          <label for="surah-select" class="form-label text-white">Select Surah:</label>
          <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah" @change="fetchSurahDetails">
            <option value="" disabled selected>Select a Surah</option> <!-- Placeholder Option -->
            <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
              {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
            </option>
          </select>
        </div>

        <!-- Dropdown to select Reciter -->
        <div class="col-md-4">
          <label for="reciter-select" class="form-label text-white">Select Reciter:</label>
          <select id="reciter-select" class="form-select shadow-sm" v-model="selectedReciter"
            @change="fetchSurahDetails">
            <option value="" disabled selected>Select a reciter</option>
            <option v-for="reciter in reciters" :key="reciter.identifier" :value="reciter.identifier">
              {{ reciter.englishName }}
            </option>
          </select>
        </div>

        <!-- Dropdown to select Translation Language -->
        <div class="col-md-4">
          <label for="translation-select" class="form-label text-white">Select Translation:</label>
          <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation"
            @change="fetchSurahDetails">
            <option value="" disabled selected>Select Translation</option>
            <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
              {{ translation.englishName }}
            </option>
          </select>
        </div>

      </div>
    </div>

    <!-- Bootstrap Alert -->
    <div v-if="toastVisible" class="alert container text-center alert-success alert-dismissible fade show mx-3"
      role="alert">
      {{ toastMessage }}
      <button type="button" class="btn-close" @click="toastVisible = false" aria-label="Close"></button>
    </div>




    <div class="row rtl-text">
      <!-- Reading Progress Bar -->

      <div ref="audioCard" v-for="(ayah, index) in filteredAyahs" :key="ayah.number" class="col-md-12 mb-2 mt-2">
        <div class="shadow-xl h-100 rtl-text d-flex flex-column" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          border-top-left-radius: 25px; 
          border-top-right-radius: 25px; 
          border-bottom-left-radius: 20px; 
          border-bottom-right-radius: 20px;
          display: flex;
          flex-direction: column;
          height: 100%;">

          <!-- Surah and Ayah Number -->
          <div class="d-flex justify-content-between p-3 text-muted ltr-text">
            <h4><img src="images/art.png" width="35px" /> {{ surahDetails?.surahNumber }} : {{ index + 1 }}</h4>
          </div>

          <!-- Arabic Text (RTL) -->
          <p class="arabic-text p-2 rtl-text fw-bold text-end mb-3" v-html="highlightedText(ayah)"
            :style="{ fontSize: arabicFontSize + 'px' }">
          </p>

          <!-- Translation (LTR) -->
          <p class="mb-3 fw-regular p-2 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)"
            :style="{ fontSize: translationFontSize + 'px' }"></p>

          <!-- Stick to bottom container -->
          <div class="mt-auto">
            <!-- Button Section -->
            <div class="container pb-3 text-center">
              <div class="row">
                <div class="col">
                  <i class="bi bi-skip-backward-circle" style="cursor: pointer; font-size: 1.5rem;"
                    @click="rewindAudio(index)" data-bs-toggle="tooltip" data-bs-placement="top" title="Rewind"></i>
                </div>
                <div class="col">
                  <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;" @click="shareOnWhatsApp(ayah)"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Share on WhatsApp"></i>
                </div>
                <div class="col">
                  <i class="bi bi-clipboard copy-icon" @click="copyAyah(ayah)" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Copy Ayah"></i>
                </div>
                <div class="col">
                  <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-dash-circle mx-2"
                    @click="decreaseFontSize" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Decrease Font Size"></i>
                </div>
                <div class="col">
                  <i style="cursor: pointer; font-size: 1.5rem;" @click="increaseFontSize"
                    class="bi bi-plus-circle mx-2" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Increase Font Size"></i>
                </div>
                <div class="col">
                  <i class="bi bi-download" style="cursor: pointer; font-size: 1.5rem;"
                    @click="downloadAudio(ayah.audio, `Surah${surahDetails.surahNumber}_Ayah${ayah.number}`)"
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Download Audio"></i>
                </div>
                <div class="col">
                  <i class="bi bi-skip-forward-circle" style="cursor: pointer; font-size: 1.5rem;"
                    @click="fastForwardAudio(index)" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Fast Forward"></i>
                </div>
              </div>
            </div>

            <!-- Audio Player Stuck to Bottom -->
            <div class="pt-2">
              <audio ref="audioPlayer" controls class="audio-player w-100" @play="playAudio(index)">
                <source v-if="ayah && ayah.audio" :src="ayah.audio" type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top FAB -->
    <button v-show="showScrollButton" @click="scrollToTop" class="fab">
      <i class="bi bi-arrow-up"></i>
    </button>


  </div>
</template>

<script>
export default {
  props: ["ayah", "arabicFontSize"],
  data() {
    return {
      currentlyPlaying: null,
      currentlyPlayingIndex: null,
      scrollTimeout: null,
      showScrollButton: false,
      isVisible: true,
      loading: true,
      displayedAyahs: [], // Holds only the ayahs currently loaded
      ayahBatchSize: 9, // Number of ayahs to load per batch
      surahs: [], // List of all Surahs
      reciters: [], // List of all Reciters
      translations: [], // List of all Translations
      selectedSurah: "", // Selected Surah number
      selectedReciter: "ar.alafasy", // Default reciter
      selectedTranslation: "en.asad", // Default translation
      selectedJuz: null, // Selected Juz number
      surahDetails: null, // Details of the selected Surah or Juz
      searchQuery: "",
      arabicFontSize: 23, // Default font size for Arabic text
      translationFontSize: 19,
      toastMessage: "",
      toastVisible: false,
      words: [],
      timestamps: [],
      highlightedAyah: "",
      wordTimings: [], // Stores timestamps for words
      highlightedWordIndex: -1, // Tracks which word is currently highlighted
      currentAyahIndex: 0,
    };
  },
  mounted() {
    this.prepareAyahText();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.fetchSurahs();
    this.fetchReciters();
    this.fetchTranslations();
  },
  watch: {
    ayah: {
      handler(newAyah) {
        console.log("Ayah received:", newAyah); // Debugging log
        if (newAyah && newAyah.text) {
          this.prepareAyahText();
        }
      },
      immediate: true,
    },
  },
  computed: {

    // Filter ayahs based on search query
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
        if (!ayah.text) return ""; // Ensure the text exists

        const words = ayah.text.split(" "); // Split ayah text into words

        return words.map((word, index) => {
          const isHighlighted = index === this.highlightedWordIndex ? 'highlighted-word' : '';
          return `<span class="${isHighlighted}">${word}</span>`;
        }).join(" ");
      };
    }
  },
  methods: {
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;  // Toggle the visibility state
    },
    // Rewind 15 seconds
    rewindAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 15); // Ensure it doesn't go below 0
      }
    },
    // Fast forward 15 seconds
    fastForwardAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); // Ensure it doesn't exceed duration
      }
    },
    prepareAyahText() {
      if (!this.ayah || !this.ayah.text) {
        console.error("prepareAyahText: ayah.text is missing!", this.ayah);
        return;
      }

      this.words = this.ayah.text.split(" ");
      this.timestamps = this.words.map((_, index) => index * 0.5);
      this.highlightedAyah = this.words.join(" ");

      console.log("Highlighted Ayah Text:", this.highlightedAyah); // Debugging log
    },
    syncHighlight() {
      const audio = this.$refs.audioPlayer;
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
      const ayahText = `${ayah.text}\n\n${ayah.translation}`;

      try {
        await navigator.clipboard.writeText(ayahText);
        this.showToast("Ayah & Translation copied to clipboard");
      } catch (error) {
        console.error("Error copying text:", error);
      }
    },

    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 3000); // Hide after 3 seconds
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
      const message = `Surah ${this.surahDetails.surahNumber} - ${this.surahDetails.englishName} (Ayah ${ayah.number})\n\n` +
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

    // Fetch all Surahs
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

    // Fetch all Translations
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
      if (!this.selectedSurah) return;

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
      } catch (error) {
        console.error("Error fetching Surah details:", error);
      }
    },

    async stopAudio(audioElement) {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset to the beginning
      }
    },

    async playAudio(index) {
      const audioPlayers = this.$refs.audioPlayer;
      const audioCards = this.$refs.audioCard;

      if (!audioPlayers || !audioPlayers[index]) return;

      // Stop any previously playing audio
      if (this.currentlyPlaying && this.currentlyPlaying !== audioPlayers[index]) {
        console.log("Pausing previous audio");
        this.currentlyPlaying.pause();
        this.currentlyPlaying.currentTime = 0; // Reset time
      }

      // Set the new audio
      this.currentlyPlaying = audioPlayers[index];
      this.currentlyPlayingIndex = index;

      // Remove any previous 'onended' event listeners
      this.currentlyPlaying.onended = null;

      // Play new selection
      this.currentlyPlaying.play()
        .then(() => {
          console.log(`Now playing Ayah ${index}`);
        })
        .catch((err) => {
          console.error("Play error:", err);
          this.currentlyPlaying = null;
        });

      this.currentlyPlaying.onended = () => {
        console.log("Audio ended. No auto-play to next.");
        this.currentlyPlaying = null;
      };

      // Remove previous highlight and highlight current Ayah
      audioCards.forEach(card => card.classList.remove('highlighted'));
      if (audioCards[index]) {
        audioCards[index].classList.add('highlighted');
      }

      // Scroll to active Ayah
      this.scrollToCard(index);
    },
    startAudio(index) {
      const audioPlayers = this.$refs.audioPlayer;
      const audioCards = this.$refs.audioCard;

      if (!audioPlayers || !audioPlayers[index]) return;

      audioPlayers[index].play().catch((err) => console.error("Play error:", err));
      this.currentlyPlaying = audioPlayers[index];
      this.currentlyPlayingIndex = index;

      // Ensure ontimeupdate updates the highlights
      audioPlayers[index].ontimeupdate = () => {
        requestAnimationFrame(() => {
          if (typeof this.updateHighlight === "function") {
            this.updateHighlight(audioPlayers[index]);
          }
        });
      };

      // Highlight the playing card
      if (audioCards[index]) {
        audioCards[index].classList.add('highlighted');
      }

      // Smooth scroll to the playing ayah
      this.scrollToCard(index);

      // Automatically play the next Ayah when current one ends
      audioPlayers[index].onended = () => {
        this.playNextAyah();
      };
    },

    playNextAyah() {
      const nextIndex = this.currentlyPlayingIndex + 1;
      if (this.$refs.audioPlayer[nextIndex]) {
        this.playAudio(nextIndex); // Manually call playAudio with the next index
      }
    },

    scrollToCard(index) {
      const audioCards = this.$refs.audioCard;
      if (!audioCards || !audioCards[index]) return;

      // Debounce the scroll
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        audioCards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Avoid excessive scrolling
        });
      }, 100); // Adjust the delay as needed
    },

    updateHighlight(audioElement) {
      if (!audioElement) return;

      // Perform lightweight operations only
      const currentTime = audioElement.currentTime;
      console.log("Updating highlight at", currentTime);
    },

    rewindAudio(index) {
      const audioPlayers = this.$refs.audioPlayer;
      if (audioPlayers && audioPlayers[index]) {
        audioPlayers[index].currentTime = Math.max(0, audioPlayers[index].currentTime - 5);
      }
    },

    fastForwardAudio(index) {
      const audioPlayers = this.$refs.audioPlayer;
      if (audioPlayers && audioPlayers[index]) {
        audioPlayers[index].currentTime = Math.min(
          audioPlayers[index].duration,
          audioPlayers[index].currentTime + 5
        );
      }
    },

    highlightText(text) {
      if (!this.searchQuery) return text;
      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return text.replace(regex, `<span class="highlight">$1</span>`);
    },

    // Fetch details of the selected Juz
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
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #0db691;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  /* transition: background 0.3s ease-in-out; */
}

.fab:hover {
  background-color: #0a8a72;
}

.ayah-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  will-change: transform, box-shadow;
  /* Optimize for GPU rendering */
}

.highlighted {
  transform: scale(1.02);
}

.audio-player {
  background: rgb(13, 182, 145);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  will-change: transform;
  /* Optimize for GPU rendering */
}

/* Apply color changes on hover for each icon */
.bi-skip-backward-circle:hover {
  color: rgb(13, 182, 145);
  /* Change to your desired color */
}

.bi-share:hover {
  color: rgb(13, 182, 145);
  /* Green color for sharing */
}

.bi-clipboard:hover {
  color: rgb(13, 182, 145);
  /* Yellow color for clipboard */
}

.bi-dash-circle:hover {
  color: rgb(13, 182, 145);
  /* Red color for decreasing font size */
}

.bi-plus-circle:hover {
  color: rgb(13, 182, 145);
  /* Blue color for increasing font size */
}

.bi-download:hover {
  color: rgb(13, 182, 145);
  /* Yellow color for download */
}

.bi-skip-forward-circle:hover {
  color: rgb(13, 182, 145);
  /* Purple color for fast forward */
}

.highlighted-word {
  background-color: rgb(255, 0, 0);
  transition: background-color 0.3s ease-in-out;
}


.sticky-dropdown {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgb(13, 182, 145);
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.copy-icon {
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 10px;
  color: #000;
  transition: color 0.3s ease-in-out;
}

/* Hover Effect */
.copy-icon:hover {
  color: rgb(13, 182, 145);
  transform: scale(1.1);
}

.action-container {
  width: 100%;
  background-color: white;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-icon {
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s ease-in-out;
}

.action-icon:hover {
  color: rgb(13, 182, 145)
    /* Green hover effect */
}

/* Sticky Dropdown Styling */
.sticky-dropdown {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 7px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #ddd;
  border-radius: 5px;
}

/* Smooth transition when scrolling */
.sticky-dropdown select {
  transition: all 0.3s ease-in-out;
}

/* Container for the audio player */
.audio-container {
  width: 100%;
  background-color: rgba(89, 167, 150, 0.798);
  /* Full background color */
  display: flex;
  bottom: 0px;
  justify-content: center;
  align-items: center;
}

/* Customizing the audio player */
.audio-player {
  width: 100%;
  background: rgb(13, 182, 145);
  /* Forces background color */
  filter: invert(1) hue-rotate(180deg);
  /* Changes button & progress bar color */
}

/* Hide default styling (Optional) */
.audio-player::-webkit-media-controls-panel {
  background: rgb(13, 182, 145) !important;
}

.audio-player::-webkit-media-controls-play-button {
  filter: invert(1);
}

.audio-player::-webkit-media-controls-volume-slider {
  filter: invert(1);
}

/* Arabic Text */
.arabic-text {
  font-size: 1.5rem;
  text-align: right;
  direction: rtl;
  font-family: 'Amiri', serif;
}

/* LTR Text (Translation) */
.ltr-text {
  text-align: left !important;
  direction: ltr !important;
  font-family: 'Arial', sans-serif;
}

/* Card Styling */
.card {
  text-align: right;
  direction: rtl;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Audio Player Stuck to Bottom */
.audio-container {
  margin-top: auto;
  /* Pushes audio player to the bottom */
  width: 100%;
  background: rgb(13, 182, 145)
}

.audio-player {
  width: 100%;
  background: rgb(13, 182, 145);
  border-radius: 0;
  display: block;
}
</style>
