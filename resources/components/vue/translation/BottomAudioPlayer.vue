<template>
  <!-- <div class="bottom-audio-player" v-if="information">
    <div class="player-header">
      <div class="player-label">{{ statusMessage }}</div>
    </div>

      <audio
        v-if="currentAudioSrc"
        ref="audioPlayer"
        :src="currentAudioSrc"
        class="w-100 custom-audio"
        preload="auto"
        controls
        :aria-label="audioLabel"
      ></audio>

    <div v-else class="player-placeholder">
      <span>{{ statusMessage }}</span>
    </div>
  </div> -->
</template>

<script>
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
      isLoading: false,
      error: null,
    };
  },
  computed: {
    currentAyah() {
      return this.information?.ayah || null;
    },
    currentAudioSrc() {
      const raw = this.currentAyah?.audio_links;
      if (!raw) {
        return null;
      }
      return this.resolveAudioUrl(raw);
    },
    statusMessage() {
      if (this.isLoading) {
        return "Preparing the ayah audio…";
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
  methods: {
    resolveAudioUrl(url) {
      try {
        if (/^https?:\/\//i.test(url)) {
          return url;
        }
        return `${window.location.origin}${url}`;
      } catch (err) {
        console.warn("Unable to resolve audio URL", err);
        return url;
      }
    },
  },
};
</script>

<style scoped>
.bottom-audio-player {
  border: 1px solid rgba(148, 163, 184, 0.6);
  border-radius: 20px;
  padding: 1.25rem;
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
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
  color: #0f172a;
}

.custom-audio {
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.8);
  background: #f8fafc;
}

.player-placeholder {
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 12px;
  text-align: center;
  color: #475569;
  font-weight: 500;
}
</style>
