<template>
  <div class="bottom-audio-player" v-if="information">
    <div class="player-header">
      <div class="player-label">{{ statusMessage }}</div>
      <div class="player-controls">
        <button
          type="button"
          class="btn control-btn"
          @click="playPrevious"
          :disabled="!canPlayPrev"
          aria-label="Play previous ayah"
        >
          <i class="bi bi-skip-start-fill"></i>
        </button>
        <button
          type="button"
          class="btn control-btn"
          @click="playNext"
          :disabled="!canPlayNext"
          aria-label="Play next ayah"
        >
          <i class="bi bi-skip-end-fill"></i>
        </button>
      </div>
    </div>

    <audio
      v-if="currentAudioSrc"
      ref="audioPlayer"
      :src="currentAudioSrc"
      class="w-100 custom-audio"
      preload="auto"
      controls
      @ended="handleAyahEnded"
      :aria-label="audioLabel"
    ></audio>

    <div v-else class="player-placeholder">
      <span>{{ statusMessage }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BottomAudioPlayer",
  props: {
    information: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      surahAyahs: [],
      currentAyahIndex: -1,
      lastRequestId: 0,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    currentAyah() {
      if (this.currentAyahIndex >= 0 && this.currentAyahIndex < this.surahAyahs.length) {
        return this.surahAyahs[this.currentAyahIndex];
      }
      return this.information?.ayah || null;
    },
    currentAudioSrc() {
      return this.currentAyah?.audio_links || null;
    },
    canPlayNext() {
      return this.currentAyahIndex + 1 < this.surahAyahs.length;
    },
    canPlayPrev() {
      return this.currentAyahIndex > 0;
    },
    statusMessage() {
      if (this.isLoading) {
        return "Loading surah audio…";
      }
      if (this.error) {
        return this.error;
      }
      if (this.currentAyah) {
        const surahId = this.currentAyah.surah_id || this.currentAyah.surah?.id;
        const ayahNumber = this.currentAyah.ayah_id ?? this.currentAyah.ayah?.ayah_id;
        return `Surah ${surahId || "?"} · Ayah ${ayahNumber || "?"}`;
      }
      return "Select an ayah to hear its recitation.";
    },
    audioLabel() {
      const ayah = this.currentAyah;
      if (!ayah) {
        return "Quran audio player";
      }
      const surahId = ayah.surah_id || ayah.surah?.id;
      return `Audio for Surah ${surahId || "?"} Ayah ${ayah.ayah_id || "?"}`;
    },
  },
  watch: {
    information: {
      immediate: true,
      handler(newInfo) {
        this.loadSurahAyahs(newInfo);
      },
    },
    currentAyahIndex(newIndex, oldIndex) {
      if (newIndex === oldIndex) return;
      if (!this.currentAudioSrc) return;
      this.playAudio();
    },
    currentAudioSrc(newSrc, oldSrc) {
      if (!newSrc || newSrc === oldSrc) return;
      this.playAudio();
    },
  },
  methods: {
    async loadSurahAyahs(info) {
      this.error = null;
      this.surahAyahs = [];
      this.currentAyahIndex = -1;
      if (!info?.ayah) {
        return;
      }
      const surahId = info.ayah.surah?.id || info.ayah.surah_id;
      if (!surahId) {
        this.surahAyahs = [info.ayah];
        this.currentAyahIndex = 0;
        return;
      }
      this.isLoading = true;
      const requestId = ++this.lastRequestId;
      try {
        const { data } = await axios.get(`/surahs/${surahId}/ayahs`);
        if (this.lastRequestId !== requestId) {
          return;
        }
        this.surahAyahs = Array.isArray(data) ? data.sort((a, b) => a.ayah_id - b.ayah_id) : [];
        this.setCurrentIndex(info.ayah);
      } catch (err) {
        if (this.lastRequestId === requestId) {
          this.error = "Unable to load surah audio.";
        }
        console.error("Failed to load ayahs:", err);
      } finally {
        if (this.lastRequestId === requestId) {
          this.isLoading = false;
        }
      }
    },
    setCurrentIndex(selectedAyah) {
      if (!this.surahAyahs.length) {
        this.currentAyahIndex = -1;
        return;
      }
      const targetAyahId = selectedAyah.id ?? null;
      const targetNumber = selectedAyah.ayah_id ?? null;
      let index = -1;
      if (targetAyahId) {
        index = this.surahAyahs.findIndex((ayah) => ayah.id === targetAyahId);
      }
      if (index === -1 && targetNumber) {
        index = this.surahAyahs.findIndex((ayah) => ayah.ayah_id === targetNumber);
      }
      this.currentAyahIndex = index === -1 ? 0 : index;
    },
    playAudio() {
      this.$nextTick(() => {
        const audio = this.$refs.audioPlayer;
        if (!audio || !this.currentAudioSrc) {
          return;
        }
        audio.volume = 0.95;
        audio.load();
        audio.play().catch(() => {});
      });
    },
    playNext() {
      if (this.canPlayNext) {
        this.currentAyahIndex += 1;
      }
    },
    playPrevious() {
      if (this.canPlayPrev) {
        this.currentAyahIndex -= 1;
      }
    },
    handleAyahEnded() {
      if (this.canPlayNext) {
        this.playNext();
      }
    },
  },
};
</script>

<style scoped>
.bottom-audio-player {
  border: 1px solid rgba(11, 128, 111, 0.35);
  border-radius: 20px;
  padding: 1rem;
  background: #0d1718;
  color: #fff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.player-label {
  font-size: 0.95rem;
  font-weight: 600;
}

.player-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #06b6ac;
  border: none;
  color: #fff;
}

.control-btn:disabled {
  background-color: rgba(255, 255, 255, 0.35);
  cursor: not-allowed;
}

.custom-audio {
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(15, 23, 42, 0.9);
}

.player-placeholder {
  padding: 1rem;
  text-align: center;
  color: #cbd5f5;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
}
</style>
