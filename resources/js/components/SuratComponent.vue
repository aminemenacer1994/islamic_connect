<template>
  <div class="container py-4">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-10">
        <h2 class="display-5 fw-bold">The Holy Quran</h2>
        <p class="lead">Explore the Quran in Arabic with translations and recitations from world-renowned Qaris.
          Search for specific words, Ayahs, or Surahs, and listen to beautiful recitations to enhance your
          understanding.
          Select a Surah, Juz, or specific verse, and immerse yourself in the wisdom of the Quran.
        </p>
      </div>
    </div>
    <!-- Sticky Dropdowns -->
    <div class="sticky-dropdown row mb-4">
      <!-- Dropdown to select Surah -->
      <div class="col-md-4 mb-3">
        <label for="surah-select" class="form-label">Select Surah:</label>
        <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah" @change="fetchSurahDetails">
          <option value="" disabled selected> Select a Surah </option> <!-- Placeholder Option -->
          <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
            {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
          </option>
        </select>
      </div>

      <!-- Dropdown to select Reciter -->
      <div class="col-md-4 mb-3">
        <label for="reciter-select" class="form-label">Select Reciter:</label>
        <select id="reciter-select" class="form-select shadow-sm" v-model="selectedReciter" @change="fetchSurahDetails">
          <option value="" disabled>Select a reciter</option>
          <option v-for="reciter in reciters" :key="reciter.identifier" :value="reciter.identifier">
            {{ reciter.englishName }}
          </option>
        </select>
      </div>


      <!-- Dropdown to select Translation Language -->
      <div class="col-md-4 mb-3">
        <label for="translation-select" class="form-label">Select Translation:</label>
        <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation"
          @change="fetchSurahDetails">
          <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
            {{ translation.englishName }}
          </option>
        </select>
      </div>



    </div>
    <!-- Bootstrap Alert -->
    <div v-if="toastVisible" class="alert container text-center alert-success alert-dismissible fade show mx-3"
      role="alert">
      {{ toastMessage }}
      <button type="button" class="btn-close" @click="toastVisible = false" aria-label="Close"></button>
    </div>



    <!-- Ayahs in Two Columns -->
    <div class="row" dir="rtl">

      <div v-if="surahDetails" class="col-12">
        <p class="text-center fw-bold display-5 mb-4">
          {{ surahDetails.englishName }} ({{ surahDetails.name }})
        </p>

        <!-- Search Bar -->
        <div class="row mb-4">
          <div class="col-md-6">
            <input type="text" class="form-control shadow-sm ltr-text" v-model="searchQuery"
              placeholder="Search for a keyword..." />
          </div>
        </div>

        <div class="row">
          <div v-for="(ayah, index) in filteredAyahs" :key="ayah.number" class="col-md-6 mb-4">
            <div class="card shadow-sm h-100 d-flex flex-column" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                border-top-left-radius: 10px; 
                border-top-right-radius: 10px; 
                border-bottom-left-radius: 0px; 
                border-bottom-right-radius: 0px;
                display: flex;
                flex-direction: column;
                height: 100%;">

              <!-- Surah and Ayah Number -->
              <div class="d-flex justify-content-between p-3 text-muted ltr-text">
                <h4><img src="images/art.png" width="35px" /> {{ surahDetails.surahNumber }} : {{ ayah.ayahNumber }}
                </h4>
              </div>

              <!-- Arabic Text (RTL) -->
              <p class="arabic-text p-3 fw-bold text-end mb-3" v-html="highlightText(ayah.text)"
                :style="{ fontSize: arabicFontSize + 'px' }">
              </p>

              <!-- Translation (LTR) -->
              <p class="mb-3 fw-regular p-3 ltr-text flex-grow-1" v-html="highlightText(ayah.translation)"
                :style="{ fontSize: translationFontSize + 'px' }">
              </p>

              <!-- Stick to bottom container -->
              <div class="mt-auto">
                <!-- Button Section -->
                <div class="container pb-3 text-center">
                  <div class="row">
                    <div class="col">
                      <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;"
                        @click="shareOnWhatsApp(ayah)"></i>
                    </div>
                    <div class="col">
                      <i class="bi bi-clipboard copy-icon" @click="copyAyah(ayah)"></i>
                    </div>
                    <div class="col">
                      <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-dash-circle mx-2"
                        @click="decreaseFontSize"></i>
                    </div>
                    <div class="col">
                      <i style="cursor: pointer; font-size: 1.5rem;" @click="increaseFontSize"
                        class="bi bi-plus-circle mx-2"></i>
                    </div>
                    <div class="col">
                      <i class="bi bi-download" style="cursor: pointer; font-size: 1.5rem;"
                        @click="downloadAudio(ayah.audio, `Surah${surahDetails.surahNumber}_Ayah${ayah.number}`)">
                      </i>
                    </div>
                  </div>
                </div>

                <!-- Audio Player Stuck to Bottom -->
                <div class="pt-2">
                  <audio controls class="audio-player w-100">
                    <source :src="ayah.audio" type="audio/mpeg" />
                  </audio>
                </div>
              </div>

            </div>
          </div>
        </div>



      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      surahs: [], // List of all Surahs
      reciters: [], // List of all Reciters
      translations: [], // List of all Translations
      selectedSurah: null, // Selected Surah number
      selectedReciter: 'ar.alafasy', // Default reciter
      selectedTranslation: 'en.asad', // Default translation
      selectedJuz: null, // Selected Juz number
      surahDetails: null, // Details of the selected Surah or Juz
      searchQuery: "",
      arabicFontSize: 20, // Default font size for Arabic text
      translationFontSize: 16,
      toastMessage: "",
      toastVisible: false
    };
  },
  created() {
    this.fetchSurahs();
    this.fetchReciters();
    this.fetchTranslations();
  },
  computed: {
    // Filter ayahs based on search query
    filteredAyahs() {
      if (!this.surahDetails) return [];  // If no Surah is selected, return empty
      if (!this.searchQuery) return this.surahDetails.ayahs;  // If search is empty, return all ayahs

      const query = this.searchQuery.toLowerCase(); // Convert search query to lowercase
      return this.surahDetails.ayahs.filter(ayah =>
        ayah.text.toLowerCase().includes(query) || ayah.translation.toLowerCase().includes(query)
      );
    },
  },
  methods: {
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
      if (this.arabicFontSize < 40) this.arabicFontSize += 2; // Limit max size
      if (this.translationFontSize < 30) this.translationFontSize += 2;
    },
    decreaseFontSize() {
      if (this.arabicFontSize > 16) this.arabicFontSize -= 2; // Limit min size
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
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) throw new Error('Failed to fetch Surahs');
        const data = await response.json();
        this.surahs = data.data;
      } catch (error) {
        console.error('Error fetching Surahs:', error);
      }
    },

    async fetchReciters() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/edition/format/audio');
        if (!response.ok) throw new Error('Failed to fetch Reciters');

        const data = await response.json();

        // Ensure data structure is correct
        this.reciters = data.data
          .filter(reciter => reciter.identifier && reciter.englishName) // Filter valid reciters
          .map(reciter => ({
            identifier: reciter.identifier,
            englishName: reciter.englishName || "Unknown Reciter"
          }));

      } catch (error) {
        console.error('Error fetching Reciters:', error);
      }
    },

    // Fetch all Translations
    async fetchTranslations() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/edition/type/translation');
        if (!response.ok) throw new Error('Failed to fetch Translations');
        const data = await response.json();
        this.translations = data.data;
      } catch (error) {
        console.error('Error fetching Translations:', error);
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
        console.log("API Response:", data);

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

        console.log("Processed Surah Details:", this.surahDetails);
      } catch (error) {
        console.error("Error fetching Surah details:", error);
      }
    },

    highlightText(text) {
      if (!this.searchQuery) return text;  // No highlighting if search is empty
      const regex = new RegExp(`(${this.searchQuery})`, "gi"); // Case-insensitive match
      return text.replace(regex, `<span class="highlight">$1</span>`); // Wrap matches in <span>
    },

    // Fetch details of the selected Juz
    async fetchJuzDetails() {
      if (!this.selectedJuz || this.selectedJuz < 1 || this.selectedJuz > 30) return;

      try {
        const response = await fetch(`https://api.alquran.cloud/v1/juz/${this.selectedJuz}/ar.alafasy`);
        if (!response.ok) throw new Error('Failed to fetch Juz details');

        const data = await response.json();

        this.surahDetails = {
          englishName: `Juz ${this.selectedJuz}`,
          name: `Juz ${this.selectedJuz}`,
          englishNameTranslation: `Juz ${this.selectedJuz}`,
          ayahs: data.data.ayahs.map((ayah) => ({
            number: ayah.number,
            text: ayah.text, // Arabic text
            translation: "Translation not available for Juz",
            audio: ayah.audio || "",
          })),
        };
      } catch (error) {
        console.error('Error fetching Juz details:', error);
      }
    },
  },
};
</script>
<style scoped>
.copy-icon {
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 10px;
  color: #000;
  transition: color 0.3s ease-in-out;
}

/* Hover Effect */
.copy-icon:hover {
  color: #0a7e64;
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
  color: #0db691;
  /* Green hover effect */
}

/* Sticky Dropdown Styling */
.sticky-dropdown {
  position: sticky;
  top: 0;
  z-index: 1000;
  /* Ensures it stays above other elements */
  background-color: rgba(255, 255, 255, 1.76);
  /* Matches background */
  padding: 7px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* Adds a shadow effect */
  border-bottom: 2px solid #ddd;
  border: 2px solid #0db691;
  border-radius: 5px;
  /* Subtle separator */
}

/* Smooth transition when scrolling */
.sticky-dropdown select {
  transition: all 0.3s ease-in-out;
}

/* Container for the audio player */
.audio-container {
  width: 100%;
  background-color: rgb(13, 182, 145);
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
  /* Top rounded, bottom flat */
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
  background: rgb(13, 182, 145);
}

.audio-player {
  width: 100%;
  background: rgb(13, 182, 145);
  border-radius: 0;
  display: block;
}
</style>
