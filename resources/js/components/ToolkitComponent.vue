<template>
  <div>
    <!-- Dropdown to select a Surah -->
    <select v-model="surahId" @change="fetchSurahData" class="form-select">
      <option value="" disabled>Select a Surah</option>
      <option v-for="surah in surahList" :key="surah.id" :value="surah.id">
        {{ surah.name }}
      </option>
    </select>

    <!-- Show Surah name and its Tajweed text -->
    <h1 v-if="surah">{{ surahName }}</h1>
    <p v-if="surah" v-html="surah.textWithTajweed" class="surah-text"></p>

    <!-- Audio Player for Surah -->
    <audio v-if="surah" :src="surah.audioLink" controls class="audio-player"></audio>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-center text-danger">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      surahId: "", // Selected Surah ID
      surahName: "", // Name of the Surah
      surahList: [], // List of Surahs
      surah: null, // Surah data (with Tajweed)
      loading: false, // Loading flag
      error: null, // Error message
    };
  },
  mounted() {
    this.fetchSurahList(); // Fetch Surah list on component mount
  },
  methods: {
    // Fetch list of all Surahs from Al-Quran Cloud API
    async fetchSurahList() {
      this.loading = true;
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/chapters");
        this.surahList = response.data.data; // Populate Surah list
        this.loading = false;
      } catch (error) {
        this.error = "Failed to load Surahs";
        this.loading = false;
      }
    },

    // Fetch selected Surah details, including Tajweed text and audio
    async fetchSurahData() {
      if (!this.surahId) return; // Skip if no Surah is selected
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`https://api.alquran.cloud/v1/chapters/${this.surahId}`);
        const surahData = response.data.data;

        // Set Surah name and details
        this.surahName = surahData.name;
        this.surah = {
          textWithTajweed: surahData.text, // Tajweed text (adjust per API)
          audioLink: surahData.audio_url, // Audio link (adjust per API)
        };
        this.loading = false;
      } catch (error) {
        this.error = "Failed to load Surah details";
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Styling for Surah text and audio player */
.surah-text {
  font-size: 18px;
  line-height: 1.6;
  margin-top: 20px;
}

.audio-player {
  margin-top: 20px;
  width: 100%;
}

/* Styling for the dropdown */
.form-select {
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

/* Loading and error message styling */
.text-center {
  text-align: center;
}

.text-danger {
  color: red;
}
</style>
