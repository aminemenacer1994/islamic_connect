<template>
  <div class="container my-4">
    <!-- Header -->
    <header class="text-center mb-4">
      
      <h1 class="header-title">Islamic Guides</h1>
      <p class="header-description">
        Discover insights into the core beliefs, practices, and morals of Islam.
      </p>
    </header>

    <!-- Controls Section -->
    <section class="controls-section mb-4" style="border: 1px solid #009688;">
      <div class="row g-3 align-items-center" >
        <!-- Category Dropdown -->
        <div class="col-md-6">
          <label for="category-select" class="form-label">
            <i class="bi bi-journal-bookmark me-2"></i>Select a Guide
          </label>
          <select
            id="category-select"
            v-model="selectedCategory"
            class="form-select"
            aria-label="Select an Islamic guide"
          >
            <option value="">Choose a topic...</option>
            <option v-for="(section, index) in guide.sections" :key="index" :value="index">
              {{ section.title }}
            </option>
          </select>
        </div>

        <!-- Search Input -->
        <div class="col-md-6" v-if="selectedCategory !== ''">
          <label for="search-input" class="form-label">
            <i class="bi bi-search me-2"></i>Search Content
          </label>
          <div class="input-group">
          <input
            id="search-input"
            type="text"
            v-model="searchText"
            class="form-control"
              placeholder="Search keywords..."
            aria-label="Search guide content"
            >
            <button v-if="searchText" class="btn btn-outline-secondary" @click="searchText = ''">
              <i class="bi bi-x"></i>
              </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section 
      v-if="selectedCategory !== '' && guide.sections[selectedCategory]" 
      class="mb-5"
      id="content-section"
    >
      <div class="content-card card">
        <div class="card-body">
          <!-- Card Header -->
          <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h2 class="content-title mb-2">
                {{ guide.sections[selectedCategory].title }}
              </h2>
              <div class="badge bg-primary bg-opacity-10 text-primary">
                {{ guide.sections[selectedCategory].category || 'General' }}
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-outline-primary"
                @click="playCurrentContent"
                :disabled="isAudioLoading"
              >
                <i class="bi bi-play-fill"></i> Listen
              </button>
              <button
                class="btn btn-sm btn-outline-primary"
                @click="bookmarkGuide"
              >
                <i :class="isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
                Bookmark
              </button>
              
              <button
                class="btn btn-sm btn-outline-success"
                @click="shareOnWhatsApp"
              >
                <i class="bi bi-share"></i> Share
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="selected-content">
            <div v-if="Array.isArray(guide.sections[selectedCategory].content)" class="content-list">
              <ul class="list-unstyled mb-0">
                <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index" class="mb-3 pb-3 border-bottom">
                  <div class="d-flex align-items-start">
                    <span class="badge bg-primary bg-opacity-10 text-primary me-3 mt-1">{{ index + 1 }}</span>
                    <span v-html="getHighlightedText(item)" class="content-text"></span>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="content-text" v-html="highlightText(guide.sections[selectedCategory].content)"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Audio Player -->
    <transition name="global-audio-player">
      <div v-if="isPlaying || isPaused" class="modern-audio-player w-100">
        <div class="audio-player-row top">
          <div class="audio-meta text-start">
            <div class="audio-title small-title">{{ currentPlayingContent.title }}</div>
            <div class="audio-subtitle">{{ currentPlayingContent.category || 'Recitation' }}</div>
          </div>
        </div>
        <div class="audio-player-row bottom">
          <div class="audio-controls">
            <button class="audio-btn" @click="stopPlayback" aria-label="Rewind">
              <i class="bi bi-skip-backward-fill"></i>
            </button>
            <button class="audio-btn" @click="togglePlayPause" aria-label="Play/Pause">
              <i class="bi" :class="isPlaying ? 'bi-pause-fill' : 'bi-play-fill'"></i>
            </button>
            <button class="audio-btn" @click="stopPlayback" aria-label="Forward">
              <i class="bi bi-skip-forward-fill"></i>
            </button>
            <button class="audio-btn" @click="stopPlayback" aria-label="Stop">
              <i class="bi bi-stop-fill"></i>
            </button>
          </div>
          <div class="audio-progress-wrap">
            <div class="audio-progress-bar">
              <div class="audio-progress" :style="{ width: (currentTime / totalDuration * 100) + '%' }"></div>
            </div>
          </div>
          <div class="audio-right">
            <i class="bi bi-volume-up-fill volume-icon"></i>
            <input type="range" min="0" max="100" v-model.number="volume" @input="updateVolume" class="audio-volume-slider" aria-label="Volume control" />
            <button class="audio-btn close-btn" @click="stopPlayback" aria-label="Close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import guide from '../guides.json';

export default {
  setup() {
    const selectedCategory = ref('');
    const searchText = ref('');
    const isBookmarked = ref(false);
    const isPlaying = ref(false);
    const isPaused = ref(false);
    const isAudioLoading = ref(false);
    const isMuted = ref(false);
    const currentTime = ref(0);
    const totalDuration = ref(0);
    const volume = ref(70);
    const utterance = ref(null);
    const currentPlayingContent = ref({
      title: '',
      category: ''
    });
    const fullText = ref('');

    onMounted(() => {
      if (typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          // Voice setup if needed
        };
      }
    });

    return {
      selectedCategory,
      searchText,
      isBookmarked,
      isPlaying,
      isPaused,
      isAudioLoading,
      isMuted,
      currentTime,
      totalDuration,
      volume,
      utterance,
      currentPlayingContent,
      fullText,
      guide,
    };
  },
  methods: {
    playCurrentContent() {
      this.isAudioLoading = true;
      const selectedSection = this.guide.sections[this.selectedCategory];
      
      this.currentPlayingContent = {
        title: selectedSection.title,
        category: selectedSection.category || 'Islamic Guide'
      };

      let contentArray = selectedSection.content;
      if (!Array.isArray(contentArray)) {
        contentArray = typeof contentArray === 'string' ? [contentArray] : [];
      }
      
      this.fullText = contentArray.join(' ');
      this.totalDuration = this.estimateDuration();
      this.currentTime = 0;

      this.playText();
    },

    playText() {
      if (this.isPaused) {
        window.speechSynthesis.resume();
        this.isPlaying = true;
        this.isPaused = false;
        this.updateTime();
        return;
      }

      window.speechSynthesis.cancel();
      this.utterance = new SpeechSynthesisUtterance(this.fullText);
      this.utterance.volume = this.isMuted ? 0 : this.volume / 100;

      this.utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const textUpToBoundary = this.fullText.slice(0, event.charIndex);
          this.currentTime = textUpToBoundary.trim().split(/\s+/).length * this.estimateWordDuration();
        }
      };

      this.utterance.onend = () => {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentTime = 0;
      };

      window.speechSynthesis.speak(this.utterance);
      this.isPlaying = true;
      this.isAudioLoading = false;
      this.updateTime();
    },

    togglePlayPause() {
      if (this.isPlaying) {
        this.pauseText();
      } else {
        this.playText();
      }
    },

    pauseText() {
      if (this.isPlaying) {
        window.speechSynthesis.pause();
        this.isPlaying = false;
        this.isPaused = true;
      }
    },

    stopPlayback() {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentTime = 0;
    },

    seekAudio(event) {
      // This is a simplified seek implementation
      // Note: SpeechSynthesis API doesn't support true seeking
      const seekPercent = event.target.value / this.totalDuration;
      this.currentTime = this.totalDuration * seekPercent;
      
      if (this.isPlaying) {
        this.stopPlayback();
        this.playText();
      }
    },

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.utterance) {
        this.utterance.volume = this.isMuted ? 0 : this.volume / 100;
      }
    },

    updateVolume() {
      this.isMuted = this.volume === 0;
      if (this.utterance) {
        this.utterance.volume = this.volume / 100;
      }
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },

    estimateDuration() {
      return this.fullText.split(/\s+/).length * this.estimateWordDuration();
    },

    estimateWordDuration() {
      return 0.4; // Average 400ms per word at 1x speed
    },

    updateTime() {
      if (this.isPlaying) {
        this.currentTime += 0.1;
        if (this.currentTime < this.totalDuration) {
          setTimeout(() => this.updateTime(), 100);
        }
      }
    },

    getHighlightedText(item) {
      if (!this.isPlaying) return item;
      const currentWordIndex = Math.floor(this.currentTime / this.estimateWordDuration());
      return item.split(' ').map((word, index) => 
        index === currentWordIndex ? `<span class="highlight-word">${word}</span>` : word
      ).join(' ');
    },

    highlightText(text) {
      if (!this.searchText) return text;
      const regex = new RegExp(`(${this.searchText})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    bookmarkGuide() {
      this.isBookmarked = !this.isBookmarked;
    },

    shareOnWhatsApp() {
      const selectedSection = this.guide.sections[this.selectedCategory];
      if (!selectedSection) return;

      const title = selectedSection.title;
      const content = Array.isArray(selectedSection.content)
        ? selectedSection.content.join('\n\n')
        : selectedSection.content;
      const text = `*${title}*\n\n${content}\n\n— Shared via Islamic Guides`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  },
  watch: {
    selectedCategory(newVal) {
      this.stopPlayback();
      this.searchText = '';
    },
  },
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #00bfa6;
  --primary-hover: #008f7a;
  --text-color: #333;
  --text-light: #6c757d;
  --bg-color: #fff;
  --border-color: #e9ecef;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Typography */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.3;
}

/* Header */
.header-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.header-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.header-description {
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

/* Controls */
.controls-section {
  background-color: rgba(0, 191, 166, 0.05);
  border: 1px solid rgba(0, 191, 166, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.form-select, .form-control {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  font-size: 1rem;
}

.form-select:focus, .form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);
}

/* Content Card */
.content-card {
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: transform 0.3s;
}

.content-card:hover {
  transform: translateY(-3px);
}

.content-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.content-text {
  font-size: 1.1rem;
  line-height: 1.8;
}

.highlight-word {
  background-color: var(--primary-color);
  color: white;
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
}

mark {
  background-color: #fff3a3;
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
}

/* Buttons */
.btn {
  font-weight: 500;
  transition: all 0.2s;
  border-radius: 8px;
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Modern Audio Player Styles */
.modern-audio-player,
.modern-audio-player.w-100 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #232323;
  color: #fff;
  border-radius: 0;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  padding: 1rem 1.5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  transform: none;
  width: 100vw;
  max-width: 100vw;
  z-index: 2000;
}
.audio-meta {
  min-width: 160px;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.audio-title {
  font-weight: 700;
  font-size: 1.15rem;
  color: #fff;
  margin-bottom: 0.1rem;
}
.small-title {
  font-size: 1rem;
  text-align: left;
}
.audio-meta.text-start {
  text-align: left;
}
.audio-subtitle {
  font-size: 0.95rem;
  color: #bdbdbd;
  font-weight: 400;
}
.audio-controls {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex: 2 1 0;
  justify-content: center;
}
.audio-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 0.5rem 0.7rem;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s, transform 0.1s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.audio-btn:hover, .audio-btn:focus {
  background: rgba(0,191,166,0.12);
  color: #00bfa6;
  outline: none;
  transform: scale(1.08);
}
.close-btn {
  margin-left: 0.7rem;
  font-size: 1.3rem;
  background: none;
  color: #bdbdbd;
}
.close-btn:hover {
  color: #ff4d4f;
  background: rgba(255,77,79,0.08);
}
.audio-progress-wrap {
  flex: 3 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  margin: 0 1.2rem;
}
.audio-progress-bar {
  width: 100%;
  height: 4px;
  background: #444;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.audio-progress {
  height: 100%;
  background: linear-gradient(90deg, #00bfa6 0%, #008f7a 100%);
  border-radius: 2px;
  transition: width 0.2s;
}
.audio-right {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 180px;
  flex: 1 1 0;
  justify-content: flex-end;
}
.volume-icon {
  font-size: 1.3rem;
  color: #bdbdbd;
}
.audio-volume-slider {
  width: 90px;
  accent-color: #00bfa6;
  background: transparent;
  margin: 0 0.5rem;
  height: 4px;
}
.audio-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00bfa6;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,191,166,0.18);
  cursor: pointer;
}
.audio-volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00bfa6;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,191,166,0.18);
  cursor: pointer;
}
.audio-volume-slider:focus {
  outline: none;
}

/* Transitions */
.global-audio-player-enter-active,
.global-audio-player-leave-active {
  transition: all 0.3s ease;
}

.global-audio-player-enter-from,
.global-audio-player-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}

.modern-audio-player.w-100 {
  width: 100vw;
  left: 0;
  transform: none;
  border-radius: 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .header-title {
    font-size: 1.75rem;
  }
  
  .header-description {
  font-size: 1rem;
}

  .global-audio-player {
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    border-radius: 0;
    bottom: 0;
  }
  
  .player-desktop {
    display: none;
  }

  .player-mobile {
    display: flex;
  }

  .player-section {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .player-info, .player-volume {
    min-width: auto;
  }
  
  .progress-bar-container {
    max-width: 100%;
  }
  
  .volume-slider {
    width: 60px;
  }
}

@media (max-width: 576px) {
  .header-title {
    font-size: 1.5rem;
  }
  
  .content-title {
    font-size: 1.3rem;
  }
  
  .content-text {
    font-size: 1rem;
  }
  
  .controls-section {
    padding: 1rem;
  }
  
  .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 900px) {
  .modern-audio-player {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0.7rem 0.5rem;
    width: 100vw;
    left: 0;
    border-radius: 0;
  }
  .audio-meta, .audio-right {
    min-width: 120px;
  }
  .audio-progress-wrap {
    min-width: 120px;
    margin: 0 0.5rem;
  }
}
@media (min-width: 601px) {
  .audio-player-row.bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: nowrap;
  }
  .audio-controls {
    order: 2;
    gap: 1.2rem;
    flex: 2 1 0;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .audio-progress-wrap {
    order: 3;
    margin: 0 1.2rem;
    flex: 3 1 0;
    min-width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .audio-right {
    order: 4;
    gap: 0.7rem;
    min-width: 180px;
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
@media (max-width: 600px) {
  .modern-audio-player {
    flex-direction: column;
    align-items: stretch;
    border-radius: 0;
    left: 0;
    transform: none;
    width: 100vw;
    max-width: 100vw;
    padding: 0.2rem 0.05rem;
    border-radius: 0;
  }
  .audio-player-row.top, .audio-meta, .audio-title, .audio-subtitle {
    display: none !important;
  }
  .audio-player-row.bottom {
    display: flex !important;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .audio-player-row.bottom > * {
    min-width: 0;
  }
  .audio-controls {
    order: 1;
    gap: 0.3rem;
    margin: 0;
    font-size: 0.95rem;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }
  .audio-btn {
    font-size: 0.95rem;
    padding: 0.18rem 0.22rem;
  }
  .audio-progress-wrap {
    order: 2;
    margin: 0 0.1rem;
    flex: 2 1 0;
    min-width: 0;
    display: flex;
    align-items: center;
  }
  .audio-progress-bar {
    height: 3px;
  }
  .audio-right {
    order: 3;
    gap: 0.3rem;
    min-width: 0;
    flex: 0 0 auto;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .audio-volume-slider {
    width: 22px;
    height: 2.5px;
  }
  .close-btn {
    font-size: 0.95rem;
    margin-left: 0.18rem;
  }
  .volume-icon {
    font-size: 0.95rem;
  }
}
</style>