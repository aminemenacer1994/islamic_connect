<template>
  <div class="container-fluid">
    <!-- Dropdowns in a Single Row -->
    <div class="row mb-4">
      <!-- Dropdown to select Surah -->
      <div class="col-md-3 mb-3">
        <label for="surah-select" class="form-label">Select Surah:</label>
        <select id="surah-select" class="form-select shadow-sm" v-model="selectedSurah" @change="fetchSurahDetails">
          <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
            {{ surah.englishName }} ({{ surah.name }})
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
        <select id="translation-select" class="form-select shadow-sm" v-model="selectedTranslation" @change="fetchSurahDetails">
          <option v-for="translation in translations" :key="translation.identifier" :value="translation.identifier">
            {{ translation.englishName }}
          </option>
        </select>
      </div>

      <!-- Dropdown or Input to select Juz -->
      <div class="col-md-3 mb-3">
        <label for="juz-select" class="form-label">Select Juz:</label>
        <input
          id="juz-select"
          type="number"
          class="form-control shadow-sm"
          v-model="selectedJuz"
          min="1"
          max="30"
          placeholder="Enter Juz number (1-30)"
          @change="fetchJuzDetails"
        />
      </div>
    </div>

    <!-- Ayahs in Two Columns -->
    <div class="row">
      <div v-if="surahDetails" class="col-12">
        <h2 class="text-center mb-4">{{ surahDetails.englishName }} ({{ surahDetails.name }})</h2>
        <p class="text-center mb-4">{{ surahDetails.englishNameTranslation }}</p>

        <div class="row">
          <div v-for="ayah in surahDetails.ayahs" :key="ayah.number" class="col-md-6 mb-4">
            <div class="card shadow-sm p-3 h-100">
              <p class="arabic-text fw-bold text-end mb-3">{{ ayah.text }}</p>
              <p class="mb-3">{{ ayah.translation }}</p>
              <audio controls class="w-100">
                <source :src="ayah.audio" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
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
    };
  },
  created() {
    this.fetchSurahs();
    this.fetchReciters();
    this.fetchTranslations();
  },
  methods: {
    // Fetch all Surahs
    async fetchSurahs() {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
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
        const data = await response.json();
        this.translations = data.data;
      } catch (error) {
        console.error('Error fetching Translations:', error);
      }
    },
    // Fetch details of the selected Surah
    async fetchSurahDetails() {
      if (!this.selectedSurah) return;

      try {
        // Fetch Arabic text, translation, and audio in one call
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`
        );
        const data = await response.json();

        // Ensure the data is synchronized
        const arabicText = data.data[0]; // Arabic text and audio
        const translation = data.data[1]; // Translation

        this.surahDetails = {
          englishName: arabicText.englishName,
          name: arabicText.name,
          englishNameTranslation: arabicText.englishNameTranslation,
          ayahs: arabicText.ayahs.map((ayah, index) => ({
            text: ayah.text, // Arabic text
            translation: translation.ayahs[index].text, // Translation
            audio: ayah.audio, // Audio URL
          })),
        };
      } catch (error) {
        console.error('Error fetching Surah details:', error);
      }
    },
    // Fetch details of the selected Juz
    async fetchJuzDetails() {
      if (!this.selectedJuz || this.selectedJuz < 1 || this.selectedJuz > 30) return;

      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/juz/${this.selectedJuz}/ar.alafasy`
        );
        const data = await response.json();

        this.surahDetails = {
          englishName: `Juz ${this.selectedJuz}`,
          name: `Juz ${this.selectedJuz}`,
          englishNameTranslation: `Juz ${this.selectedJuz}`,
          ayahs: data.data.ayahs.map((ayah) => ({
            text: ayah.text, // Arabic text
            translation: '', // No translation for Juz
            audio: ayah.audio, // Audio URL
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
.arabic-text {
  font-size: 1.5rem;
  text-align: right;
  direction: rtl;
}

.card {
  border-radius: 15px;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
</style>