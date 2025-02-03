<template>
  <div class="container py-4">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-8">
        <h2 class="display-5 fw-bold">The Holy Quran</h2>
        <p class="lead">Welcome to the Islamic Connect FAQ section! Here, we address common questions to help you
          navigate our platform and understand our mission better.</p>
      </div>
    </div>
    <!-- Dropdowns in a Single Row -->
    <div class="row mb-4">
      <!-- Dropdown to select Surah -->
      <div class="col-md-3 mb-3">
        <label for="surah-select" class="form-label">Select a Surah:</label>
        <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah" @change="fetchSurahDetails">
          <option disabled value="">Select a Surah</option> <!-- Placeholder Option -->
          <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
            {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
          </option>
        </select>
      </div>


      <!-- Dropdown to select Reciter -->
      <div class="col-md-3 mb-3">
        <label for="reciter-select" class="form-label">Select Reciter:</label>
        <select id="reciter-select" class="form-select shadow-sm" v-model="selectedReciter" @change="fetchSurahDetails">
          <option v-for="reciter in reciters" :key="reciter.identifier" :value="reciter.identifier">
            {{ reciter.englishName }}
          </option>
        </select>
      </div>

      <!-- Dropdown to select Translation Language -->
      <div class="col-md-3 mb-3">
        <label for="translation-select" class="form-label">Select Translation:</label>
        <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation"
          @change="fetchSurahDetails">
          <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
            {{ translation.englishName }}
          </option>
        </select>
      </div>

      <!-- Dropdown or Input to select Juz -->
      <div class="col-md-3 mb-3">
        <label for="juz-select" class="form-label">Select Juz:</label>
        <input id="juz-select" type="number" class="form-control shadow-sm" v-model="selectedJuz" min="1" max="30"
          placeholder="Enter Juz number (1-30)" @change="fetchJuzDetails" />
      </div>
      <hr />
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
          <div v-for="ayah in surahDetails.ayahs" :key="ayah.number" class="col-md-6 mb-4">
            <div class="card shadow-sm p-3 h-100 d-flex flex-column" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; 
                border-top-left-radius: 10px; 
                border-top-right-radius: 10px; 
                border-bottom-left-radius: 0px; 
                border-bottom-right-radius: 0px;">

              <!-- Surah and Ayah Number -->
              <div class="d-flex justify-content-between text-muted ltr-text">
                <h4>{{ surahDetails.surahNumber }} : {{ ayah.number }}</h4>
              </div>

              <!-- Arabic Text (RTL) -->
              <p class="arabic-text fw-bold text-end mb-3" v-html="highlightText(ayah.text)"></p>

              <!-- Translation (LTR) -->
              <p class="mb-3 fw-regular ltr-text" v-html="highlightText(ayah.translation)"></p>

              <!-- Audio Player Stuck to Bottom -->
              <div class="audio-container">
                <audio controls class="audio-player">
                  <source :src="ayah.audio" type="audio/mpeg" />
                </audio>
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
      searchQuery: ""
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

    // Fetch all Reciters
    async fetchReciters() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/edition/format/audio');
        if (!response.ok) throw new Error('Failed to fetch Reciters');
        const data = await response.json();
        this.reciters = data.data;
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
  border-radius: 10px 10px 0 0;
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
