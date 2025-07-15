<template>
  <div class="container my-4">
    <!-- Header -->
    <header class="text-center mb-4">
      
      <h1 class="header-title display-4 fw-bold">Islamic Guides</h1>
      <p class="header-description">
        Discover insights into the core beliefs, practices, and morals of Islam.
      </p>
    </header>

    <!-- Controls Section -->
    <section class="controls-section mb-4" style="border: 1px solid #009688;">
      <div class="row g-3 align-items-center" >
        <!-- Category Filter -->
        <!-- <div class="col-12 mb-3">
          <label class="form-label">
            <i class="bi bi-funnel me-2"></i>Filter by Category
          </label>
          <div class="category-filters">
            <button 
              v-for="category in availableCategories" 
              :key="category"
              @click="filterByCategory(category)"
              class="btn btn-sm me-2 mb-2"
              :class="selectedCategoryFilter === category ? 'btn-primary' : 'btn-outline-primary'"
            >
              <span class="badge me-1" :class="getBadgeClasses(category)">
                {{ category }}
              </span>
              {{ category }}
            </button>
            <button 
              @click="filterByCategory('All')"
              class="btn btn-sm me-2 mb-2"
              :class="selectedCategoryFilter === 'All' ? 'btn-primary' : 'btn-outline-primary'"
            >
              <i class="bi bi-collection me-1"></i>
              All Categories
            </button>
          </div>
        </div> -->

        <!-- Category Dropdown -->
        <div class="col-md-6">
          <label for="category-select" class="form-label">
            <i class="bi bi-journal-bookmark me-2"></i>Select a Guide
          </label>
          <div class="dropdown">
            <button 
              class="form-select dropdown-toggle" 
              type="button" 
              id="category-select"
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {{ selectedCategory !== '' ? guide.sections[selectedCategory].title : 'Choose a topic...' }}
            </button>
            <transition name="fade-slide">
              <ul class="dropdown-menu w-100" aria-labelledby="category-select" v-if="filteredSections.length">
                <li v-for="(section, index) in filteredSections" :key="index">
                  <a 
                    class="dropdown-item d-flex align-items-center justify-content-between" 
                    href="#"
                    @click.prevent="selectedCategory = guide.sections.indexOf(section)"
                  >
                    <span class="guide-title">{{ section.title }}</span>
                    <span class="badge ms-2" :class="getBadgeClasses(section.title)">
                      {{ getCategoryName(section.title) }}
                    </span>
                  </a>
                </li>
              </ul>
            </transition>
          </div>
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
    <transition name="fade-slide">
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
                <div class="badge" :class="getBadgeClasses(guide.sections[selectedCategory].title)">
                  {{ getCategoryName(guide.sections[selectedCategory].title) }}
                </div>
                <div v-if="selectedCategory !== '' && guide.sections[selectedCategory]" class="guide-meta mt-2 text-muted small">
                  <span title="Total number of words in this guide section.">Word count: {{ wordCount }}</span> |
                  <span title="Estimated time to read this section at 200 words per minute.">Read time: {{ readTime }} min</span> |
                  <span title="Estimated time to listen to this section at 150 words per minute.">Listen time: {{ listenTime }} min</span>
                </div>
              </div>
              
              <transition name="fade-scale">
                <div class="d-flex gap-2" key="button-group">
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
                    :disabled="!isAuthenticated"
                    :title="!isAuthenticated ? 'Please login to bookmark' : ''"
                  >
                    <i :class="isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
                    {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}
                  </button>
                  
                  <button
                    class="btn btn-sm btn-outline-success"
                    @click="shareOnWhatsApp"
                  >
                    <i class="bi bi-share"></i> Share
                  </button>
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="printGuide"
                  >
                    <i class="bi bi-printer"></i> Print
                  </button>
                </div>
              </transition>
            </div>

            <!-- Content -->
            <div class="selected-content">
              <template v-if="Array.isArray(guide.sections[selectedCategory].content)">
                <transition-group name="stagger-fade" tag="ul" class="list-unstyled mb-0">
                  <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index" class="mb-3 pb-3 border-bottom">
                    <div class="d-flex align-items-start">
                      <span class="badge bg-primary bg-opacity-10 text-primary me-3 mt-1">{{ index + 1 }}</span>
                      <span v-html="getHighlightedText(item)" class="content-text"></span>
                    </div>
                  </li>
                </transition-group>
              </template>
              <template v-else>
                <div class="content-text" v-html="highlightText(guide.sections[selectedCategory].content)"></div>
              </template>
            </div>
          </div>
        </div>
      </section>
    </transition>

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

    <!-- Alert Messages -->
    <transition name="fade-slide">
      <div v-if="showAlert" class="alert alert-success alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;" role="alert">
        {{ alertMessage }}
        <button type="button" class="btn-close" @click="showAlert = false"></button>
      </div>
    </transition>
    <transition name="fade-slide">
      <div v-if="showErrorAlert" class="alert alert-danger alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" @click="showErrorAlert = false"></button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import guide from '../guides.json';
import axios from 'axios';

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
    const isAuthenticated = ref(false);
    const userId = ref(null);
    const showAlert = ref(false);
    const showErrorAlert = ref(false);
    const alertMessage = ref('');
    const errorMessage = ref('');
    const selectedCategoryFilter = ref('All');
    const availableCategories = ref([]);

    // Word count, read time, listen time
    const wordCount = computed(() => {
      if (selectedCategory.value === '' || !guide.sections[selectedCategory.value]) return 0;
      const section = guide.sections[selectedCategory.value];
      let text = '';
      if (Array.isArray(section.content)) {
        text = section.content.join(' ');
      } else {
        text = section.content || '';
      }
      return text.trim().split(/\s+/).filter(Boolean).length;
    });
    const readTime = computed(() => {
      // 200 words per minute
      return Math.max(1, Math.ceil(wordCount.value / 200));
    });
    const listenTime = computed(() => {
      // 150 words per minute
      return Math.max(1, Math.ceil(wordCount.value / 150));
    });

    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/userId');
        if (response.ok) {
          const data = await response.json();
          if (data.userId) {
            isAuthenticated.value = true;
            userId.value = data.userId;
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    onMounted(() => {
      if (typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          // Voice setup if needed
        };
      }
      
      // Check authentication status
      checkAuthentication();
      
      // Initialize available categories
      initializeCategories();
    });

    const initializeCategories = () => {
      const categories = new Set();
      guide.sections.forEach(section => {
        const category = getCategoryName(section.title);
        categories.add(category);
      });
      availableCategories.value = Array.from(categories).sort();
    };

    const getCategoryName = (title) => {
      const categoryMap = {
        // Theology & Beliefs
        'The Concept of Tawhid': 'Theology',
        'The Concept of Tawheed': 'Theology',
        'The Role of the Quran': 'Theology',
        'The Concept of Prophethood': 'Theology',
        'The Role of Prophets and Messengers': 'Theology',
        'Angels in Islam': 'Theology',
        'The Islamic Concept of Afterlife': 'Theology',
        'The Islamic Concept of the Afterlife': 'Theology',
        'The Significance of the Night of Ascension': 'Theology',
        'Islamic Philosophy and Theology': 'Theology',
        
        // Five Pillars & Worship
        'The Five Pillars of Islam': 'Worship',
        'The Importance of Fasting': 'Worship',
        'The Significance of Hajj': 'Worship',
        'The Importance of Dua': 'Worship',
        'The Importance of Dhikr': 'Worship',
        'Islamic Calendar and Festivals': 'Worship',
        
        // Ethics & Character
        'Islamic Ethics and Morality': 'Ethics',
        'The Importance of Good Character': 'Ethics',
        'The Concept of Righteousness': 'Ethics',
        'The Concept of Forgiveness': 'Ethics',
        'The Concept of Mercy': 'Ethics',
        'The Importance of Gratitude': 'Ethics',
        'The Concept of Gratitude': 'Ethics',
        
        // Social Justice & Community
        'Social Justice in Islam': 'Social Justice',
        'The Concept of Justice': 'Social Justice',
        'The Islamic Concept of Justice': 'Social Justice',
        'Islam and the Concept of Community': 'Community',
        'Islamic Teachings on Tolerance': 'Community',
        'Islamic Views on Peace': 'Community',
        
        // Family & Relationships
        'Islamic Family Law': 'Family',
        'Islamic Views on Marriage': 'Family',
        'The Role of Women in Islam': 'Family',
        
        // Finance & Economics
        'Islamic Perspective on Wealth': 'Finance',
        'The Role of Islamic Charity': 'Finance',
        'Islamic Views on Financial Transactions': 'Finance',
        
        // Health & Well-being
        'Islamic Views on Health': 'Health',
        
        // Education & Knowledge
        'Islamic Education and Knowledge': 'Education',
        'The Importance of Knowledge': 'Education',
        'The Importance of Seeking Knowledge': 'Education',
        
        // Law & Halal/Haram
        'Halal and Haram in Islam': 'Law',
        
        // Environment
        'Islam and Environmental Stewardship': 'Environment',
        
        // Daily Life
        'The Importance of the Quran in Daily Life': 'Daily Life'
      };
      
      return categoryMap[title] || 'General';
    };

    const getBadgeClasses = (title) => {
      const category = getCategoryName(title);
      const badgeClasses = {
        'Theology': 'bg-primary',
        'Worship': 'bg-success',
        'Ethics': 'bg-info',
        'Social Justice': 'bg-warning',
        'Community': 'bg-secondary',
        'Family': 'bg-danger',
        'Finance': 'bg-dark',
        'Health': 'bg-success',
        'Education': 'bg-primary',
        'Law': 'bg-warning',
        'Environment': 'bg-success',
        'Daily Life': 'bg-info',
        'General': 'bg-primary'
      };
      
      return badgeClasses[category] || badgeClasses['General'];
    };

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
      isAuthenticated,
      userId,
      showAlert,
      showErrorAlert,
      alertMessage,
      errorMessage,
      selectedCategoryFilter,
      availableCategories,
      guide,
      checkAuthentication,
      initializeCategories,
      getCategoryName,
      getBadgeClasses,
      wordCount,
      readTime,
      listenTime,
    };
  },
  computed: {
    filteredSections() {
      if (this.selectedCategoryFilter === 'All') {
        return this.guide.sections;
      }
      return this.guide.sections.filter(section => 
        this.getCategoryName(section.title) === this.selectedCategoryFilter
      );
    }
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategoryFilter = category;
      this.selectedCategory = ''; // Reset selected category when filtering
    },

    async bookmarkGuide() {
      if (!this.isAuthenticated) {
        this.showErrorAlert = true;
        this.errorMessage = 'Please login to bookmark guides';
        this.hideAlertAfterDelay();
        return;
      }

      if (this.selectedCategory === '') {
        this.showErrorAlert = true;
        this.errorMessage = 'Please select a guide first';
        this.hideAlertAfterDelay();
        return;
      }

      const selectedSection = this.guide.sections[this.selectedCategory];
      const content = Array.isArray(selectedSection.content) 
        ? selectedSection.content.join('\n\n') 
        : selectedSection.content;

      const formData = {
        title: selectedSection.title,
        content: content,
        category: selectedSection.category || 'Islamic Guide'
      };

      try {
        const response = await axios.post('/bookmarks', formData);
        this.isBookmarked = true;
        this.showAlert = true;
        this.alertMessage = response.data.message || 'Guide bookmarked successfully!';
        this.hideAlertAfterDelay();
      } catch (error) {
        console.error('Error bookmarking guide:', error);
        this.showErrorAlert = true;
        this.errorMessage = error.response?.data?.message || 'Failed to bookmark guide. Please try again.';
        this.hideAlertAfterDelay();
      }
    },

    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000);
    },

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
    },

    printGuide() {
      const selectedSection = this.guide.sections[this.selectedCategory];
      if (!selectedSection) return;

      const title = selectedSection.title;
      const badge = `<span class="badge ${this.getBadgeClasses(selectedSection.title)}" style="font-size:1rem;padding:0.5rem 1rem;">${this.getCategoryName(selectedSection.title)}</span>`;
      const content = Array.isArray(selectedSection.content)
        ? `<ul style="padding-left:1.5rem;">${selectedSection.content.map((item, i) => `<li style="margin-bottom:1rem;">${item}</li>`).join('')}</ul>`
        : `<div>${selectedSection.content}</div>`;

      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Guide - ${title}</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; padding: 2rem; color: #222; background: #fff; }
              .print-title { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; color: #00bfa6; }
              .print-badge { margin-bottom: 1.5rem; display: inline-block; }
              .print-content { font-size: 1.1rem; line-height: 1.7; margin-top: 1.5rem; }
              ul { margin: 0; padding-left: 1.5rem; }
              li { margin-bottom: 1rem; }
            </style>
          </head>
          <body>
            <div class="print-title">${title}</div>
            <div class="print-badge">${badge}</div>
            <div class="print-content">${content}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  },
  watch: {
    selectedCategory(newVal) {
      this.stopPlayback();
      this.searchText = '';
      this.isBookmarked = false; // Reset bookmark status when changing guides
    }
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

/* .header-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
} */

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
  gap: 0.8rem;
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
  min-width: 180px;
  flex: 1 1 0;
  justify-content: flex-end;
}
.volume-icon {
  font-size: 1.3rem;
  color: #bdbdbd;
}
.audio-volume-slider {
  width: 120px;
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
    padding: 1.2rem;
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
    
    flex-wrap: nowrap;
    /* Prevent overlap */
  }
  .audio-player-row.bottom > * {
    min-width: 0;
  }
  .audio-progress-wrap {
    order: 3;
    margin: 0 1.2rem;
    flex: 3 1 0;
    min-width: 120px;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .audio-right {
    order: 4;
    
    min-width: 140px;
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .audio-progress-bar {
    overflow: hidden;
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
    
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .audio-player-row.bottom > * {
    min-width: 0;
  }
  .audio-controls {
    order: 1;
    
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
    
    min-width: 0;
    flex: 0 0 auto;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .audio-volume-slider {
    width: 60px;
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

/* Badge Styles */
.badge {
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Custom Badge Color Schemes */
.badge.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border-color: #667eea;
}

.badge.bg-success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
  color: white !important;
  border-color: #11998e;
}

.badge.bg-info {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
  color: white !important;
  border-color: #4facfe;
}

.badge.bg-warning {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%) !important;
  color: white !important;
  border-color: #fa709a;
}

.badge.bg-secondary {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%) !important;
  color: #333 !important;
  border-color: #a8edea;
}

.badge.bg-danger {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%) !important;
  color: white !important;
  border-color: #ff9a9e;
}

.badge.bg-dark {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
  color: white !important;
  border-color: #2c3e50;
}

/* Responsive Badge Adjustments */
@media (max-width: 768px) {
  .badge {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}

@media (max-width: 576px) {
  .badge {
    font-size: 0.7rem;
    padding: 0.35rem 0.5rem;
  }
}

/* Dropdown Styles */
.dropdown-menu {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f8f9fa;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  transform: translateX(2px);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.guide-title {
  font-weight: 500;
  color: #333;
  flex: 1;
  margin-right: 0.5rem;
}

.dropdown-item .badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  flex-shrink: 0;
}

/* Custom Scrollbar for Dropdown */
.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Category Filter Styles */
.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-filters .btn {
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-filters .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.category-filters .btn-primary {
  background: linear-gradient(135deg, #00bfa6 0%, #008f7a 100%);
  border-color: #00bfa6;
  color: white;
}

.category-filters .btn-outline-primary {
  color: #00bfa6;
  border-color: #00bfa6;
  background: transparent;
}

.category-filters .btn-outline-primary:hover {
  background: linear-gradient(135deg, #00bfa6 0%, #008f7a 100%);
  color: white;
  border-color: #00bfa6;
}

.category-filters .badge {
  font-size: 0.6rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
}

/* Responsive adjustments for category filters */
@media (max-width: 768px) {
  .category-filters {
    gap: 0.3rem;
  }
  
  .category-filters .btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
  
  .category-filters .badge {
    font-size: 0.5rem;
    padding: 0.15rem 0.3rem;
  }
}

/* Animations */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.stagger-fade-enter-active {
  transition: all 0.5s;
  transition-delay: var(--stagger-delay, 0ms);
}
.stagger-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.stagger-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.stagger-fade-leave-active {
  transition: opacity 0.3s;
}
.stagger-fade-leave-to {
  opacity: 0;
}
</style>