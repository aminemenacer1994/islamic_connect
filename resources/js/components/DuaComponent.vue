<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">📖 Quranic Duas</h2>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <!-- List of Duas -->
    <ul class="list-group" v-if="duas.length > 0">
      <li v-for="dua in duas" :key="dua.id" class="list-group-item">
        <strong>{{ dua.surah }} (Ayah {{ dua.ayah }})</strong>
        <p class="text-end fs-5">{{ dua.arabic }}</p>
        <p class="text-muted"><em>{{ dua.translation }}</em></p>
        <button class="btn btn-success btn-sm mt-2" @click="playAudio(dua.audio)">
          🔊 Play Audio
        </button>
      </li>
    </ul>

    <!-- Audio Player -->
    <audio ref="audioPlayer" controls class="mt-3 d-none"></audio>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      duas: [],
      loading: true,
      error: null
    };
  },
  methods: {
    async fetchDuas() {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/taimurasad/quranic_duas/main/duas.json");

        if (!response.data || response.data.length === 0) {
          throw new Error("No Duas found. Please try again later.");
        }

        this.duas = response.data.map((dua) => ({
          id: dua.id,
          surah: dua.surah,
          ayah: dua.ayah,
          arabic: dua.arabic,
          translation: dua.translation,
          audio: dua.audio
        }));
      } catch (err) {
        this.error = "Failed to fetch Duas. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    playAudio(audioUrl) {
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.src = audioUrl;
      audioPlayer.classList.remove("d-none");
      audioPlayer.play();
    }
  },
  mounted() {
    this.fetchDuas();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.list-group-item {
  transition: 0.3s ease-in-out;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
