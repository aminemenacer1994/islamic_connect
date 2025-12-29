<template>
  <div  :class="['container my-4', { 'pad-for-audio': isPlaying || isPaused }]" role="main">

    <header class="guide-hero text-center mb-4">
      <span class="guide-eyebrow">Guided learning library</span>
      <h2 class="mb-2 fw-bold display-5 display-md-4">Islamic Guides</h2>
      <p class="header-description">
        Discover insights into the core beliefs, practices, and morals of Islam.
      </p>
    </header>

    <!-- Controls Section -->
    <section class="card-teal controls-section mb-4 round-20 soft-shadow animate-in">
      <div class="row g-3 align-items-center">
        <!-- Category Dropdown -->
        <div class="col-md-6">
          <label for="category-select" class="form-label">
            <i class="bi bi-journal-bookmark me-2"></i>Select a Guide
          </label>
          <div class="dropdown">
            <button class="form-select dropdown-toggle" type="button" id="category-select" data-bs-toggle="dropdown"
              aria-expanded="false" @keydown.down.prevent="focusFirstMenuItem">
              {{ selectedCategory !== '' ? guide.sections[selectedCategory].title : 'Choose a topic...' }}
            </button>
            <transition name="fade-slide">
              <ul class="dropdown-menu w-100" aria-labelledby="category-select" v-if="filteredSections.length"
                role="menu" ref="categoryMenu" @keydown.down.prevent="moveMenuFocus(1)"
                @keydown.up.prevent="moveMenuFocus(-1)">
                <li v-for="(section, index) in filteredSections" :key="section.title" role="none">
                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" role="menuitem"
                    :aria-current="guide.sections.indexOf(section) === selectedCategory ? 'true' : null"
                    @click.prevent="selectedCategory = guide.sections.indexOf(section); showSuccessMessage('Guide selected successfully!')"
                    :tabindex="-1">
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
        <div class="col-md-6 search-column" v-if="selectedCategory !== ''">
          <label for="search-input" class="form-label">
            <i class="bi bi-search me-2"></i>Search Content
            <button class="btn btn-sm btn-link text-decoration-none ms-1" @click="showHelpModal = true"
              title="Search Help" aria-label="Search help">
              <i class="bi bi-question-circle"></i>
            </button>
          </label>
          <div class="input-group search-pill">
            <input id="search-input" type="text" v-model="searchText" class="form-control search-input"
              placeholder="Search keywords..." aria-label="Search guide content" @focus="showSuggestions = true"
              @input="showSuggestions = true; highlightedIndex = -1;"
              @keydown.down.prevent="highlightedIndex = Math.min(highlightedIndex + 1, suggestions.length - 1)"
              @keydown.up.prevent="highlightedIndex = Math.max(highlightedIndex - 1, 0)"
              @keydown.enter.prevent="suggestions[highlightedIndex] && selectSuggestion(suggestions[highlightedIndex])"
              @blur="setTimeout(() => showSuggestions = false, 100)">
            <button v-if="searchText" class="btn btn-outline-secondary btn-clear"
              @click="searchText = ''; showSuccessMessage('Search cleared!')">
              <i class="bi bi-x"></i>
            </button>
          </div>
          <!-- Autocomplete Suggestions Dropdown -->
          <ul v-if="showSuggestions && suggestions.length" class="autocomplete-suggestions">
            <li v-for="(suggestion, idx) in suggestions" :key="idx" :class="{ highlighted: idx === highlightedIndex }"
              @mousedown.prevent="selectSuggestion(suggestion); showSuccessMessage('Suggestion selected!')"
              @mouseover="highlightedIndex = idx">
              <span v-html="highlightSuggestion(suggestion.value)"></span>
              <span v-if="suggestion.type === 'title'" class="suggestion-type">Title</span>
              <span v-else class="suggestion-type">Content</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <transition name="fade-slide">
      <section v-if="selectedCategory !== '' && guide.sections[selectedCategory]" class="mb-5" id="content-section"
        ref="contentSectionRef">
        <!-- Progress Tracker -->
        <div class="progress-tracker-container" v-if="selectedCategory !== '' && guide.sections[selectedCategory]">
          <div class="progress-bar reading-progress" :style="{ width: readingProgress + '%' }" role="progressbar"
            :aria-valuenow="readingProgress" aria-valuemin="0" aria-valuemax="100" aria-label="Reading progress"></div>
          <div v-if="isPlaying || isPaused" class="progress-bar audio-progress" :style="{ width: audioProgress + '%' }"
            role="progressbar" :aria-valuenow="audioProgress" aria-valuemin="0" aria-valuemax="100"
            aria-label="Audio progress"></div>
          <div class="progress-labels d-flex justify-content-between small mt-1">
            <span v-if="isPlaying || isPaused">Listen: {{ Math.round(audioProgress) }}%</span>
          </div>
        </div>
        <div class="content-card card round-20 soft-shadow animate-in">
          <div class="card-body">
            <!-- Card Header -->
            <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
              <div>
                <h2 class="content-title mb-2" :style="{ fontSize: fontSize + 'rem' }">
                  {{ guide.sections[selectedCategory].title }}
                </h2>
                <div class="badge badge-glass" :class="getBadgeClasses(guide.sections[selectedCategory].title)">
                  {{ getCategoryName(guide.sections[selectedCategory].title) }}
                </div>
                <div v-if="selectedCategory !== '' && guide.sections[selectedCategory]"
                  class="guide-meta mt-2 text-muted small">
                  <span title="Total number of words in this guide section.">Word count: {{ wordCount }}</span>
                </div>
              </div>

              <transition name="fade-scale">
                <div class="action-row controls-actions toolbar toolbar-premium toolbar-segmented d-flex gap-2 round-20"
                  key="button-group">
                  <button class="btn btn-sm btn-premium-outline focus-ring" @click="playCurrentContent"
                    :disabled="isAudioLoading">
                    <i class="bi bi-play-fill toolbar-icon"></i>
                    <span class="toolbar-label">Listen</span>
                  </button>
                  <!-- <button
                    class="btn btn-sm btn-outline-primary"
                    @click="bookmarkGuide"
                    :disabled="!isAuthenticated"
                    :title="!isAuthenticated ? 'Please login to bookmark' : ''"
                    :aria-pressed="isBookmarked"
                  >
                    <i :class="isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
                    {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}
                  </button> -->

                  <button class="btn btn-sm btn-premium focus-ring" @click="shareOnWhatsApp">
                    <i class="bi bi-share toolbar-icon"></i>
                    <span class="toolbar-label">Share</span>
                  </button>
                  <button class="btn btn-sm btn-premium-outline focus-ring" @click="printGuide">
                    <i class="bi bi-printer toolbar-icon"></i>
                    <span class="toolbar-label">Print</span>
                  </button>
                  <button class="btn btn-sm btn-premium-outline focus-ring" @click="generateSummary"
                    :disabled="isSummaryLoading"
                    :title="isSummaryLoading ? 'Generating summary...' : 'Generate AI Summary'">
                    <i class="bi toolbar-icon" :class="isSummaryLoading ? 'bi-hourglass-split' : 'bi-robot'"></i>
                    <span class="toolbar-label">{{ isSummaryLoading ? 'Generating' : 'AI Summary' }}</span>
                  </button>
                  <button class="btn btn-sm btn-premium-outline focus-ring" @click="decreaseFontSize"
                    :disabled="fontSize <= minFontSize" title="Decrease font size" aria-label="Decrease font size">
                    <i class="bi bi-dash toolbar-icon"></i>
                    <span class="toolbar-label">A-</span>
                  </button>
                  <button class="btn btn-sm btn-premium-outline focus-ring" @click="increaseFontSize"
                    :disabled="fontSize >= maxFontSize" title="Increase font size" aria-label="Increase font size">
                    <i class="bi bi-plus toolbar-icon"></i>
                    <span class="toolbar-label">A+</span>
                  </button>
                </div>
              </transition>
            </div>

            <!-- Content -->
            <div class="selected-content">
              <template v-if="Array.isArray(guide.sections[selectedCategory].content)">
                <transition-group name="stagger-fade" tag="ul" class="list-unstyled mb-0">
                  <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index"
                    class="mb-3 pb-3 border-bottom">
                    <div class="d-flex align-items-start">
                      <span class="badge bg-primary bg-opacity-10 text-primary me-3 mt-1">{{ index + 1 }}</span>
                      <span v-html="getHighlightedText(item)" class="content-text"
                        :style="{ fontSize: fontSize - 0.2 + 'rem' }"></span>
                    </div>
                  </li>
                </transition-group>
              </template>
              <template v-else>
                <div class="content-text" v-html="highlightText(guide.sections[selectedCategory].content)"
                  :style="{ fontSize: fontSize - 0.2 + 'rem' }"></div>
              </template>
            </div>

            <!-- AI Summary Section -->
            <transition name="fade-slide" @after-enter="scrollToSummary">
              <div v-if="summaryText" class="ai-summary-section mt-4" ref="summarySectionRef">
                <div class="summary-header d-flex align-items-center justify-content-between mb-3">
                  <h4 class="summary-title mb-0">
                    <i class="bi bi-robot me-2 text-info"></i>
                    AI Summary
                  </h4>
                  <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary" @click="toggleSummary"
                      :title="showSummary ? 'Hide Summary' : 'Show Summary'" aria-label="Toggle AI summary visibility">
                      <i class="bi" :class="showSummary ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                      {{ showSummary ? 'Hide' : 'Show' }}
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" @click="closeSummary" title="Close AI Summary"
                      aria-label="Close AI summary">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>

                <transition name="fade-slide">
                  <div v-if="showSummary" class="summary-content">
                    <div class="summary-card">
                      <div class="summary-text" v-html="summaryText"></div>
                      <div class="summary-footer mt-3 pt-3 border-top">
                        <small class="text-muted">
                          <i class="bi bi-info-circle me-1"></i>
                          This summary was generated by AI to help you understand the key points of this guide.
                        </small>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </transition>
          </div>
        </div>
      </section>
    </transition>

    <!-- Global Audio Player -->
    <transition name="global-audio-player">
      <div v-if="isPlaying || isPaused" class="modern-audio-player card-teal w-100">
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
            <input type="range" min="0" max="100" v-model.number="volume" @input="updateVolume"
              class="audio-volume-slider" aria-label="Volume control" />
            <button class="audio-btn close-btn" @click="stopPlayback" aria-label="Close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Alert Messages (Top-right premium toast stack) -->
    <!-- <div class="toast-stack" aria-live="polite" aria-atomic="true">
      <transition name="fade-slide">
        <div v-if="showAlert" class="alert alert-success alert-dismissible fade show toast-alert" role="alert">
          {{ alertMessage }}
          <button type="button" class="btn-close" aria-label="Close alert" @click="closeAlert"></button>
        </div>
      </transition>
      <transition name="fade-slide">
        <div v-if="showErrorAlert" class="alert alert-danger alert-dismissible fade show toast-alert" role="alert">
          {{ errorMessage }}
          <button type="button" class="btn-close" aria-label="Close error alert" @click="closeErrorAlert"></button>
        </div>
      </transition>
    </div> -->

    <!-- Search Help Modal -->
    <div v-if="showHelpModal" class="modal-overlay" @click="showHelpModal = false">
      <div class="help-modal" @click.stop>
        <div class="help-modal-header">
          <h3 class="help-modal-title">
            <i class="bi bi-search me-2"></i>
            Search Suggestions Guide
          </h3>
          <button class="help-modal-close" @click="showHelpModal = false" aria-label="Close help">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="help-modal-body">
          <div class="help-section">
            <h4 class="help-section-title">
              <i class="bi bi-lightbulb me-2"></i>
              How It Works
            </h4>
            <p class="help-text">
              The search feature provides intelligent suggestions as you type, helping you quickly find relevant content
              in
              Islamic guides.
            </p>
          </div>

          <div class="help-section">
            <h4 class="help-section-title">
              <i class="bi bi-keyboard me-2"></i>
              Keyboard Navigation
            </h4>
            <div class="help-shortcuts">
              <div class="shortcut-item">
                <kbd>↑</kbd> <span>Move up through suggestions</span>
              </div>
              <div class="shortcut-item">
                <kbd>↓</kbd> <span>Move down through suggestions</span>
              </div>
              <div class="shortcut-item">
                <kbd>Enter</kbd> <span>Select highlighted suggestion</span>
              </div>
              <div class="shortcut-item">
                <kbd>Esc</kbd> <span>Close suggestions dropdown</span>
              </div>
            </div>
          </div>

          <div class="help-section">
            <h4 class="help-section-title">
              <i class="bi bi-mouse me-2"></i>
              Mouse Navigation
            </h4>
            <ul class="help-list">
              <li>Hover over any suggestion to highlight it</li>
              <li>Click on a suggestion to select it</li>
              <li>Click outside the dropdown to close it</li>
            </ul>
          </div>

          <div class="help-section">
            <h4 class="help-section-title">
              <i class="bi bi-tags me-2"></i>
              Suggestion Types
            </h4>
            <div class="suggestion-types">
              <div class="suggestion-type-example">
                <span class="suggestion-type-badge title">Title</span>
                <span class="suggestion-type-desc">Matches guide section titles</span>
              </div>
              <div class="suggestion-type-example">
                <span class="suggestion-type-badge content">Content</span>
                <span class="suggestion-type-desc">Matches text within guide content</span>
              </div>
            </div>
          </div>

          <div class="help-section">
            <h4 class="help-section-title">
              <i class="bi bi-search me-2"></i>
              Search Tips
            </h4>
            <ul class="help-list">
              <li>Start typing any word to see matching suggestions</li>
              <li>Suggestions are case-insensitive</li>
              <li>Selecting a suggestion will automatically switch to that guide section</li>
              <li>Use the clear button (×) to reset your search</li>
            </ul>
          </div>

          <div class="help-section">
            <h4 class="help-section-title">
              <i class="bi bi-info-circle me-2"></i>
              Example
            </h4>
            <div class="help-example">
              <p class="help-text">
                Try typing <strong>"prayer"</strong> to see suggestions for prayer-related content, or
                <strong>"quran"</strong> for Quran-related guides.
              </p>
            </div>
          </div>
        </div>

        <div class="help-modal-footer">
          <button class="btn btn-primary" @click="showHelpModal = false">
            Got it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
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
    // Stable audio timing
    const playbackStartMs = ref(0);
    const accumulatedMs = ref(0);
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
    // Progress tracker state
    const readingProgress = ref(0);
    const audioProgress = computed(() => {
      if (!totalDuration.value || totalDuration.value === 0) return 0;
      return Math.min(100, Math.max(0, (currentTime.value / totalDuration.value) * 100));
    });
    const contentSectionRef = ref(null);
    // Font size state
    const minFontSize = 1.1;
    const maxFontSize = 2.5;
    const fontSize = ref(1.5); // default for title, content will be fontSize - 0.2
    const showSuggestions = ref(false);
    const highlightedIndex = ref(-1);
    const showHelpModal = ref(false);
    const categoryMenu = ref(null);
    const animFrameId = ref(0);
    // AI Summary state
    const isSummaryLoading = ref(false);
    const summaryText = ref('');
    const showSummary = ref(true);
    const summarySectionRef = ref(null);
    const audioBarVisible = computed(() => isPlaying.value || isPaused.value);

    function increaseFontSize() {
      if (fontSize.value < maxFontSize) fontSize.value += 0.1;
    }
    function decreaseFontSize() {
      if (fontSize.value > minFontSize) fontSize.value -= 0.1;
    }

    // Word count, read time, listen time
    // Preprocess guide data for faster search and metrics
    const normalizedSections = guide.sections.map((s, i) => {
      const contentText = Array.isArray(s.content)
        ? s.content.join(' ')
        : (s.content || '');
      return {
        index: i,
        title: s.title,
        titleL: s.title.toLowerCase(),
        contentText,
        contentL: contentText.toLowerCase(),
      };
    });

    const currentSection = computed(() => {
      if (selectedCategory.value === '' || !guide.sections[selectedCategory.value]) return null;
      return guide.sections[selectedCategory.value];
    });

    const currentContentText = computed(() => {
      if (!currentSection.value) return '';
      return Array.isArray(currentSection.value.content)
        ? currentSection.value.content.join(' ')
        : (currentSection.value.content || '');
    });

    const wordCount = computed(() => {
      if (!currentContentText.value) return 0;
      return currentContentText.value.trim().split(/\s+/).filter(Boolean).length;
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

      nextTick(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        updateReadingProgress();
      });
    });

    watch(selectedCategory, () => {
      nextTick(() => {
        updateReadingProgress();
      });
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animFrameId.value);
    });

    const titleToSection = Object.fromEntries(
      (guide.sections || []).map(s => [s.title, s])
    );

    const categoriesIndex = (() => {
      const idx = {};
      const cats = guide.categories || {};
      Object.keys(cats).forEach(cat => {
        (cats[cat] || []).forEach(t => { idx[t] = cat; });
      });
      return idx;
    })();

    const initializeCategories = () => {
      const categories = new Set();
      guide.sections.forEach(section => {
        const category = getCategoryName(section.title);
        categories.add(category);
      });
      availableCategories.value = Array.from(categories).sort();
    };

    const getCategoryName = (title) => {
      // 1) Prefer explicit primaryType on the section
      const s = titleToSection[title];
      if (s && typeof s.primaryType === 'string' && s.primaryType.length) {
        return s.primaryType;
      }
      // 2) Fall back to first tag if present
      if (s && Array.isArray(s.tags) && s.tags.length) {
        return s.tags[0];
      }
      // 3) Derive from categories mapping
      if (categoriesIndex[title]) {
        return categoriesIndex[title];
      }
      // 4) Legacy heuristic map (kept as a final fallback)
      const legacy = {
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
        'The Five Pillars of Islam': 'Worship',
        'The Importance of Fasting': 'Worship',
        'The Significance of Hajj': 'Worship',
        'The Importance of Dua': 'Worship',
        'The Importance of Dhikr': 'Worship',
        'Islamic Calendar and Festivals': 'Worship',
        'Islamic Ethics and Morality': 'Ethics',
        'The Importance of Good Character': 'Ethics',
        'The Concept of Righteousness': 'Ethics',
        'The Concept of Forgiveness': 'Ethics',
        'The Concept of Mercy': 'Ethics',
        'The Importance of Gratitude': 'Ethics',
        'The Concept of Gratitude': 'Ethics',
        'Social Justice in Islam': 'Social Justice',
        'The Concept of Justice': 'Social Justice',
        'The Islamic Concept of Justice': 'Social Justice',
        'Islam and the Concept of Community': 'Community',
        'Islamic Teachings on Tolerance': 'Community',
        'Islamic Views on Peace': 'Community',
        'Islamic Family Law': 'Family',
        'Islamic Views on Marriage': 'Family',
        'The Role of Women in Islam': 'Family',
        'Islamic Perspective on Wealth': 'Finance',
        'The Role of Islamic Charity': 'Finance',
        'Islamic Views on Financial Transactions': 'Finance',
        'Islamic Views on Health': 'Health',
        'Islamic Education and Knowledge': 'Education',
        'The Importance of Knowledge': 'Education',
        'The Importance of Seeking Knowledge': 'Education',
        'Halal and Haram in Islam': 'Law',
        'Islam and Environmental Stewardship': 'Environment',
        'The Importance of the Quran in Daily Life': 'Daily Life'
      };
      return legacy[title] || 'General';
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

    // Reading progress with cached element and rAF throttle
    const contentCardEl = ref(null);
    function cacheContentCard() {
      const el = contentSectionRef.value;
      contentCardEl.value = el ? el.querySelector('.content-card') : null;
    }
    watch(selectedCategory, () => cacheContentCard());
    nextTick(() => cacheContentCard());

    function updateReadingProgress() {
      const content = contentCardEl.value;
      if (!content) { readingProgress.value = 0; return; }
      const rect = content.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const contentHeight = content.scrollHeight;
      const scrollTop = window.scrollY + (windowHeight - rect.height) / 2 - rect.top;
      const progress = contentHeight > 0
        ? Math.min(100, Math.max(0, (scrollTop / (contentHeight - rect.height)) * 100))
        : 0;
      readingProgress.value = Math.round(progress);
    }

    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateReadingProgress();
          ticking = false;
        });
      }
    }

    // Suggestions computed property
    // Debounced search input
    const debouncedSearchText = ref('');
    let debounceTimer = null;
    watch(searchText, (val) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => { debouncedSearchText.value = val; }, 150);
    });

    const suggestions = computed(() => {
      const q = debouncedSearchText.value.trim().toLowerCase();
      if (!q) return [];
      const results = [];
      for (const s of normalizedSections) {
        if (s.titleL.includes(q)) {
          results.push({ type: 'title', value: s.title, index: s.index });
        } else if (s.contentL.includes(q)) {
          const snippet = s.contentText.slice(0, 100) + (s.contentText.length > 100 ? '...' : '');
          results.push({ type: 'content', value: snippet, index: s.index });
        }
        if (results.length >= 7) break;
      }
      return results;
    });

    function selectSuggestion(suggestion) {
      searchText.value = suggestion.value;
      showSuggestions.value = false;
      selectedCategory.value = suggestion.index;
    }
    function escapeRegex(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function highlightSuggestion(text) {
      if (!searchText.value) return text;
      const regex = new RegExp(`(${escapeRegex(searchText.value)})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    // AI Summary methods
    async function generateSummary() {
      if (selectedCategory.value === '') {
        showErrorAlert.value = true;
        errorMessage.value = 'Please select a guide first';
        hideAlertAfterDelay();
        return;
      }

      isSummaryLoading.value = true;
      const selectedSection = guide.sections[selectedCategory.value];

      try {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const content = Array.isArray(selectedSection.content)
          ? selectedSection.content.join(' ')
          : selectedSection.content;

        // Generate summary using frontend logic
        const summary = generateAISummary(selectedSection.title, content, getCategoryName(selectedSection.title));

        summaryText.value = summary;
        showSummary.value = true;
        showSuccessMessage('AI summary generated successfully!');
        // Auto-scroll to summary section after rendering
        nextTick(() => {
          if (summarySectionRef.value) {
            summarySectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      } catch (error) {
        console.error('Error generating summary:', error);
        hideAlertAfterDelay();
      } finally {
        isSummaryLoading.value = false;
      }
    }

    function generateAISummary(title, content, category) {
      // Tokenize and split sentences
      const sentences = content
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 25);

      if (!sentences.length) return '<p>No summary available.</p>';

      // Build word frequency excluding stopwords
      const stop = new Set(['the', 'and', 'a', 'an', 'is', 'are', 'to', 'of', 'in', 'on', 'for', 'with', 'as', 'by', 'it', 'that', 'this', 'be', 'or', 'from', 'at', 'was', 'were', 'which', 'has', 'have', 'had', 'their', 'its', 'into', 'about', 'also', 'not', 'but', 'can', 'may', 'such', 'like', 'then', 'than']);
      const words = content
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w && !stop.has(w));
      const freq = new Map();
      for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);

      // Category and title terms boost
      const titleTerms = new Set(title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
      const categoryMap = {
        'Theology': ['allah', 'god', 'faith', 'belief', 'divine', 'spiritual', 'creed'],
        'Worship': ['prayer', 'worship', 'fasting', 'hajj', 'dua', 'dhikr', 'salah', 'zakat'],
        'Ethics': ['ethics', 'morality', 'character', 'virtue', 'forgiveness', 'mercy', 'gratitude'],
        'Social Justice': ['justice', 'equality', 'rights', 'community', 'society', 'fairness'],
        'Family': ['family', 'marriage', 'spouse', 'children', 'parents', 'women', 'men'],
        'Finance': ['wealth', 'charity', 'financial', 'money', 'economic', 'business', 'usury'],
        'Health': ['health', 'wellness', 'medical', 'physical', 'mental', 'hygiene'],
        'Education': ['knowledge', 'learning', 'education', 'study', 'wisdom'],
        'Law': ['halal', 'haram', 'law', 'legal', 'permissible', 'forbidden', 'fiqh'],
        'Environment': ['environment', 'nature', 'stewardship', 'earth', 'creation', 'sustainability']
      };
      const catTerms = new Set((categoryMap[category] || []).map(s => s.toLowerCase()));

      // Score sentences: frequency sum + title overlap + category boost + position bonus
      const scored = sentences.map((s, i) => {
        const tokens = s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
        let score = 0;
        for (const t of tokens) {
          if (stop.has(t)) continue;
          score += (freq.get(t) || 0);
          if (titleTerms.has(t)) score += 2; // title overlap
          if (catTerms.has(t)) score += 1.5; // category relevance
        }
        // slight bonus for early sentences
        score += Math.max(0, 2 - i * 0.1);
        return { s, i, score };
      });

      scored.sort((a, b) => b.score - a.score);
      // pick top 6-8 distinct sentences preserving original order
      const top = scored.slice(0, 12).sort((a, b) => a.i - b.i);
      const chosen = [];
      for (const x of top) {
        if (chosen.length >= 7) break;
        // basic diversity: skip if very similar (Jaccard over tokens)
        const xt = new Set(x.s.toLowerCase().split(/\W+/));
        let similar = false;
        for (const y of chosen) {
          const yt = new Set(y.s.toLowerCase().split(/\W+/));
          const inter = new Set([...xt].filter(z => yt.has(z))).size;
          const union = new Set([...xt, ...yt]).size;
          if (union && inter / union > 0.7) { similar = true; break; }
        }
        if (!similar) chosen.push(x);
      }

      // Build sections
      const overview = chosen.slice(0, 2).map(x => x.s).join(' ');
      const bullets = chosen.slice(0, 6).map(x => `<li>${x.s.replace(/^[,\s]+/, '')}</li>`).join('');
      // Extract up to 5 frequent key terms for takeaway
      const topTerms = [...freq.entries()]
        .filter(([w]) => w.length > 3 && !titleTerms.has(w) && !stop.has(w))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([w]) => w)
        .join(', ');

      // Approximate read and listen estimates here for context
      const wc = content.trim().split(/\s+/).filter(Boolean).length;
      const estRead = Math.max(1, Math.ceil(wc / 200));
      const estListen = Math.max(1, Math.ceil(wc / 150));

      const header = `<p><strong>Summary:</strong> Expanded insights from “${title}”.</p>`;
      const overviewHtml = overview ? `<p>${overview}</p>` : '';
      const list = `<p><strong>Key Points:</strong></p><ul>${bullets}</ul>`;
      const terms = `<p><strong>Key Terms:</strong> <em>${topTerms || 'core principles'}</em>.</p>`;
      const meta = `<p class="text-muted"><small>Approx. read: ${estRead} min • listen: ${estListen} min.</small></p>`;
      return header + overviewHtml + list + terms + meta;
    }

    function toggleSummary() {
      showSummary.value = !showSummary.value;
    }

    function closeSummary() {
      summaryText.value = '';
      showSummary.value = false;
    }

    function scrollToSummary() {
      if (summarySectionRef.value) {
        // Try scrollIntoView with smooth behavior
        summarySectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // If a fixed header exists, add an offset (e.g., 80px)
        setTimeout(() => {
          const y = summarySectionRef.value.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 350); // Wait for scrollIntoView to finish
      }
    }

    // Success message with 3-second timer
    function showSuccessMessage(message) {
      alertMessage.value = message;
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
        alertMessage.value = '';
      }, 3000);
    }

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
      // stable audio timing refs
      playbackStartMs,
      accumulatedMs,
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
      fontSize,
      minFontSize,
      maxFontSize,
      increaseFontSize,
      decreaseFontSize,
      readingProgress,
      audioProgress,
      contentSectionRef,
      showSuggestions,
      highlightedIndex,
      suggestions,
      selectSuggestion,
      highlightSuggestion,
      showHelpModal,
      categoryMenu,
      animFrameId,
      // AI Summary
      isSummaryLoading,
      summaryText,
      showSummary,
      generateSummary,
      toggleSummary,
      closeSummary,
      summarySectionRef,
      scrollToSummary,
      showSuccessMessage,
      escapeRegex,
      audioBarVisible,
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
    focusFirstMenuItem() {
      this.$nextTick(() => {
        const menu = this.$refs.categoryMenu;
        if (!menu) return;
        const items = menu.querySelectorAll('[role="menuitem"]');
        if (items && items[0]) items[0].focus();
      });
    },
    moveMenuFocus(delta) {
      const menu = this.$refs.categoryMenu;
      if (!menu) return;
      const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
      if (!items.length) return;
      const activeIndex = items.findIndex(el => el === document.activeElement);
      const nextIndex = activeIndex === -1 ? 0 : (activeIndex + delta + items.length) % items.length;
      const next = items[nextIndex];
      if (next) next.focus();
    },
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
        this.showSuccessMessage('Guide bookmarked successfully!');
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

      // Avoid boundary-based time jumps for stability
      this.utterance.onboundary = null;

      this.utterance.onend = () => {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentTime = 0;
      };

      window.speechSynthesis.speak(this.utterance);
      this.isPlaying = true;
      this.isAudioLoading = false;
      // initialize stable monotonic clock
      this.playbackStartMs = performance.now();
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
        // accumulate elapsed
        this.accumulatedMs += performance.now() - this.playbackStartMs;
      }
    },

    stopPlayback() {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentTime = 0;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      this.accumulatedMs = 0;
      this.playbackStartMs = 0;
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
      // Compute time from monotonic clock for stability
      const now = performance.now();
      const elapsed = this.isPlaying ? (this.accumulatedMs + (now - this.playbackStartMs)) : this.accumulatedMs;
      const seconds = Math.min(this.totalDuration || 0, Math.max(0, elapsed / 1000));
      this.currentTime = seconds;
      if (this.isPlaying && this.currentTime < this.totalDuration) {
        this.animFrameId = requestAnimationFrame(() => this.updateTime());
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
      const regex = new RegExp(`(${this.escapeRegex(this.searchText)})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    shareOnWhatsApp() {
      const selectedSection = this.guide.sections[this.selectedCategory];
      if (!selectedSection) return;

      const title = selectedSection.title;
      const content = Array.isArray(selectedSection.content)
        ? selectedSection.content.join('\n\n')
        : selectedSection.content;
      const text = `*${title}*\n\n${content}\n\n  Shared via Islamic Guides`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      this.showSuccessMessage('Shared successfully!');
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
              .print-title { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; color: var(--primary-color); }
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
      this.showSuccessMessage('Guide printed successfully!');
    },

    toggleSummary() {
      this.showSummary = !this.showSummary;
    },
    closeSummary() {
      this.summaryText = '';
      this.showSummary = false;
    },

    showIslamicGuideAlert(message) {
      this.alertMessage = message;
      this.showAlert = true;
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
      this.alertTimeout = setTimeout(() => {
        this.showAlert = false;
        this.alertTimeout = null;
      }, 3000);
    },
    closeAlert() {
      this.showAlert = false;
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
    },

    showIslamicGuideError(message) {
      this.errorMessage = message;
      this.showErrorAlert = true;
      if (this.errorAlertTimeout) clearTimeout(this.errorAlertTimeout);
      this.errorAlertTimeout = setTimeout(() => {
        this.showErrorAlert = false;
        this.errorAlertTimeout = null;
      }, 4000); // 4 seconds
    },
    closeErrorAlert() {
      this.showErrorAlert = false;
      if (this.errorAlertTimeout) clearTimeout(this.errorAlertTimeout);
      this.errorAlertTimeout = null;
    }
  },
  watch: {
    selectedCategory(newVal) {
      this.stopPlayback();
      this.searchText = '';
      this.isBookmarked = false; // Reset bookmark status when changing guides
      this.summaryText = ''; // Hide summary when changing guides
      this.showSummary = false;
    }
  },
};
</script>

<style scoped>
.card-teal {
  border-radius: 22px;
  border: 1px solid var(--border-color);
  box-shadow: 0 12px 28px rgba(15, 41, 32, 0.08);
  background: var(--bg-color);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.card-teal:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(15, 41, 32, 0.12);
  border-color: rgba(11, 128, 111, 0.3);
}

/* Base Styles */
/* .guide-root {
  --primary-color: #0b7a6a;
  --primary-hover: #085d53;
  --accent-color: #c58a35;
  --teal-400: #2dd4bf;
  --teal-500: #0f766e;
  --teal-600: #0b6f66;
  --teal-700: #0a5d55;
  --ring: rgba(11, 122, 106, 0.25);
  --text-color: #0f1f24;
  --text-light: #4f5f63;
  --bg-color: #fbfaf6;
  --surface-soft: #f2f6f4;
  --border-color: rgba(15, 118, 110, 0.16);
  --card-shadow: 0 18px 36px rgba(11, 58, 48, 0.12);
  font-family: "Inter", Arial, sans-serif;
  color: var(--text-color);
  line-height: 1.7;
  background: transparent;
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: 28px;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: visible;
} */

.guide-root>* {
  position: relative;
  z-index: 1;
}

.guide-root::before,
.guide-root::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  opacity: 0.35;
  pointer-events: none;
  display: none;
}

.guide-root::before {
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(11, 122, 106, 0.22), transparent 70%);
  top: -120px;
  right: -120px;
}

.guide-root::after {
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(197, 138, 53, 0.2), transparent 70%);
  bottom: -140px;
  left: -120px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  line-height: 1.3;
}

.container {
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
}

/* Header */
.header-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.guide-hero {
  padding: 1.6rem 1.75rem;
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.96), rgba(243, 250, 248, 0.92));
  border: 1px solid rgba(15, 118, 110, 0.12);
}

.guide-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 18%, rgba(45, 212, 191, 0.18), transparent 55%),
    radial-gradient(circle at 88% 10%, rgba(197, 138, 53, 0.16), transparent 45%);
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
}

.guide-hero>* {
  position: relative;
  z-index: 1;
}

.guide-hero h2 {
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
  font-size: clamp(2.1rem, 3vw, 3rem);
  color: var(--text-color);
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
}

.guide-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.26em;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--accent-color);
  background: rgba(197, 138, 53, 0.12);
  border: 1px solid rgba(197, 138, 53, 0.26);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}

/* .header-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
} */

.header-description {
  font-size: 1.05rem;
  color: var(--text-light);
  max-width: 660px;
  margin: 0.35rem auto 0;
}

/* Controls */
.controls-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(241, 249, 247, 0.92));
  border: 1px solid rgba(15, 118, 110, 0.18);
  border-radius: 22px;
  padding: 1.35rem 1.5rem;
  box-shadow: var(--card-shadow);
  position: relative;
  overflow: visible;
}

.controls-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 20%, rgba(45, 212, 191, 0.12), transparent 45%);
  opacity: 0.8;
  pointer-events: none;
  border-radius: inherit;
}

.controls-section>* {
  position: relative;
  z-index: 1;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.form-select,
.form-control {
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  border: 1px solid rgba(15, 118, 110, 0.18);
  font-size: 0.98rem;
  background: #fff;
  min-height: 44px;
}

.form-select:focus,
.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem var(--ring);
}

/* Premium dropdown and input visuals */
.dropdown .form-select.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(15, 118, 110, 0.2);
  padding: 0.7rem 2.5rem 0.7rem 1rem;
  font-weight: 600;
  position: relative;
  min-height: 48px;
}

.dropdown .form-select.dropdown-toggle::after {
  border: none;
  content: "▾";
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: var(--primary-color);
}

.dropdown-menu {
  border-radius: 16px;
  border: 1px solid rgba(15, 118, 110, 0.16);
  box-shadow: 0 18px 36px rgba(15, 41, 32, 0.14);
  overflow: hidden;
  background: #fff;
  z-index: 1100;
}

.dropdown-item {
  padding: 0.65rem 0.9rem;
  font-weight: 500;
}

.dropdown-item:active,
.dropdown-item:hover {
  background: rgba(15, 118, 110, 0.08);
}

/* Search pill with inset glow */
.search-pill {
  background: #fff;
  border-radius: 999px;
  border: 1px solid rgba(15, 118, 110, 0.18);
  padding: 0.15rem 0.2rem 0.15rem 0.5rem;
  box-shadow: 0 10px 20px rgba(15, 41, 32, 0.08);
}

.search-input {
  border: none !important;
  background: transparent !important;
  border-radius: 999px !important;
  padding-left: 0.3rem;
  font-size: 0.95rem;
}

.search-input:focus {
  box-shadow: none !important;
}

.search-pill:focus-within {
  outline: none;
  box-shadow: inset 0 0 0 1px rgba(11, 122, 106, 0.35), 0 0 0 4px rgba(11, 122, 106, 0.18);
}

.btn-clear {
  border: 0;
  background: transparent;
  color: var(--primary-color);
  border-radius: 999px;
}

.btn-clear:hover {
  background: rgba(20, 184, 166, 0.08);
}

.controls-section .search-column {
  position: relative;
}

/* Content Card */
.content-card {
  border-radius: 22px;
  border: 1px solid rgba(15, 118, 110, 0.14);
  box-shadow: 0 18px 40px rgba(15, 41, 32, 0.12);
  overflow: hidden;
  transition: transform 0.3s;
  background: linear-gradient(180deg, #ffffff 0%, #f8fcfb 60%, #f2f8f5 100%);
  position: relative;
}

.content-card:hover {
  transform: translateY(-3px);
}

.content-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--primary-color);
  opacity: 0.6;
}

.content-card .card-body {
  position: relative;
  z-index: 1;
}

.content-title {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
}

.content-text {
  font-size: 1.05rem;
  line-height: 1.85;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  letter-spacing: 0.01em;
  margin: 0;
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
}

.selected-content {
  letter-spacing: 0.003em;
  margin-top: 0.6rem;
}

.highlight-word {
  background-color: rgba(15, 118, 110, 0.18);
  color: var(--primary-color);
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
}

mark {
  background-color: rgba(197, 138, 53, 0.25);
  border: 1px solid rgba(197, 138, 53, 0.35);
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
}

/* Buttons */
.btn {
  font-weight: 500;
  transition: all 0.2s;
  border-radius: 8px;
}

/* Premium buttons and outlines (consistent pill aesthetic) */
.btn.btn-premium {
  background: var(--primary-color, #0b7a6a);
  color: #fff;
  border: none;
  border-radius: 24px;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
  box-shadow: 0 10px 20px rgba(15, 118, 110, 0.25);
}

/* Toolbar layout: compact on mobile, spaced on desktop */
.toolbar {
  background: var(--bg-color);
  padding: 0.4rem;
  border: 1px solid var(--border-color);
  border-radius: 999px;
}

.toolbar .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.toolbar .toolbar-icon {
  font-size: 1rem;
}

.toolbar .toolbar-label {
  font-weight: 500;
}

.controls-actions {
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media (max-width: 576px) {
  .toolbar {
    padding: 0.25rem;
  }

  .toolbar .toolbar-label {
    display: none;
  }

  .toolbar .toolbar-icon {
    font-size: 1.05rem;
  }
}

/* Segmented toolbar variant */
.toolbar-segmented {
  border-radius: 999px;
  overflow: hidden;
  padding: 0.2rem;
}

.toolbar-segmented .btn {
  border-radius: 0;
  border: 0 !important;
  padding: 0.35rem 0.7rem;
}

.toolbar-segmented .btn:first-child {
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

.toolbar-segmented .btn:last-child {
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.toolbar-segmented .btn.btn-premium-outline {
  border: 1px solid rgba(20, 184, 166, 0.26) !important;
}

.toolbar-segmented .btn+.btn {
  margin-left: 0;
}

.btn.btn-premium:hover {
  filter: brightness(1.03);
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(15, 118, 110, 0.32);
}

.btn.btn-premium:active {
  transform: translateY(0);
}

.btn.btn-premium-outline {
  background: var(--bg-color, #fff);
  color: var(--primary-color, #0b7a6a);
  border-radius: 24px;
  border: 2px solid rgba(15, 118, 110, 0.3);
  padding: 0.45rem 0.9rem;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
}

.btn.btn-premium-outline:hover {
  background: rgba(15, 118, 110, .06);
  box-shadow: 0 6px 14px rgba(15, 118, 110, .16);
}

.btn.btn-premium-outline:active {
  background: rgba(20, 184, 166, .12);
}

.btn-outline-primary {
  color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

.btn-outline-primary:hover,
.btn-outline-primary:focus {
  background-color: var(--primary-color) !important;
  color: #fff !important;
}

/* Success outline buttons: use darker green for contrast */
.btn-outline-success {
  color: #1e7e34;
  border-color: #1e7e34;
}

.btn-outline-success:hover {
  background-color: #1e7e34;
  color: #fff;
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
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
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

.audio-btn:hover,
.audio-btn:focus {
  background: rgba(0, 105, 92, 0.12);
  color: var(--primary-color);
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
  background: rgba(255, 77, 79, 0.08);
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
  background: var(--primary-color);
  border-radius: 2px;
  transition: width 0.05s linear;
  will-change: width;
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
  accent-color: var(--primary-color);
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
  background: #0b5d4b;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 191, 166, 0.18);
  cursor: pointer;
}

.audio-volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0b5d4b;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 191, 166, 0.18);
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

  .guide-root {
    padding: 2rem 1.25rem;
    border-radius: 22px;
  }

  .guide-hero {
    padding: 1.35rem 1.25rem;
  }

  .header-title {
    font-size: 1.75rem;
  }

  .header-description {
    font-size: 1rem;
  }

  .controls-actions {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
    gap: 0.35rem;
  }

  .controls-actions::-webkit-scrollbar {
    height: 6px;
  }

  .controls-actions::-webkit-scrollbar-thumb {
    background: rgba(15, 118, 110, 0.2);
    border-radius: 999px;
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

  .player-info,
  .player-volume {
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
  .guide-root {
    padding: 1.5rem 1rem;
  }

  .header-title {
    font-size: 1.5rem;
  }

  .guide-hero {
    padding: 1.2rem 1rem;
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

  .form-label {
    font-size: 0.88rem;
  }

  .dropdown .form-select.dropdown-toggle {
    padding: 0.6rem 2.3rem 0.6rem 0.9rem;
  }

  .autocomplete-suggestions {
    max-height: 220px;
  }
}

/* Ensure content not hidden behind fixed audio bar */
.pad-for-audio {
  padding-bottom: 110px;
  /* approximate player height */
}

@media (max-width: 768px) {
  .pad-for-audio {
    padding-bottom: 140px;
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

  .audio-meta,
  .audio-right {
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

  .audio-player-row.bottom>* {
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

  .audio-player-row.top,
  .audio-meta,
  .audio-title,
  .audio-subtitle {
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

  .audio-player-row.bottom>* {
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
  background: #0f766e !important;
  color: #fff !important;
  border-color: #0f766e;
}

.badge.bg-success {
  background: #15803d !important;
  color: #fff !important;
  border-color: #15803d;
}

.badge.bg-info {
  background: #0284c7 !important;
  color: #fff !important;
  border-color: #0284c7;
}

.badge.bg-warning {
  background: #d97706 !important;
  color: #fff !important;
  border-color: #d97706;
}

.badge.bg-secondary {
  background: #94a3b8 !important;
  color: #1f2937 !important;
  border-color: #94a3b8;
}

.badge.bg-danger {
  background: #dc2626 !important;
  color: #fff !important;
  border-color: #dc2626;
}

.badge.bg-dark {
  background: #1f2937 !important;
  color: #fff !important;
  border-color: #1f2937;
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
  border: 1px solid rgba(15, 118, 110, 0.16);
  box-shadow: 0 18px 36px rgba(15, 41, 32, 0.14);
  border-radius: 16px;
  max-height: 60vh;
}

.dropdown-item {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid rgba(15, 118, 110, 0.08);
  transition: all 0.2s ease;
  white-space: normal;
}

.dropdown-item:hover {
  background-color: rgba(15, 118, 110, 0.08);
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
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

.category-filters .btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
  background: transparent;
}

.category-filters .btn-outline-primary:hover {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
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

/* Progress Tracker Styles */
.progress-tracker-container {
  position: relative;
  margin-bottom: 0.5rem;
  width: 100%;
}

.progress-bar {
  height: 6px;
  border-radius: 3px;
  background: rgba(15, 118, 110, 0.12);
  position: relative;
  margin-bottom: 2px;
  transition: width 0.1s linear;
  will-change: width;
}

.progress-bar.reading-progress {
  background: linear-gradient(90deg, #0b7a6a, #2dd4bf);
  z-index: 1;
}

.progress-bar.audio-progress {
  background: #0b5f58;
  margin-top: -6px;
  opacity: 0.85;
  z-index: 2;
}

.progress-labels {
  font-size: 0.85rem;
  /* Increase contrast for accessibility (WCAG 2.0 AA) */
  color: #5c6b6f;
  margin-top: 2px;
}

.autocomplete-suggestions {
  position: absolute;
  z-index: 1000;
  background: #fff;
  border: 1px solid rgba(15, 118, 110, 0.16);
  border-radius: 14px;
  box-shadow: 0 18px 36px rgba(15, 41, 32, 0.14);
  width: 100%;
  left: 0;
  right: 0;
  margin-top: 0.2rem;
  list-style: none;
  padding: 0;
  max-height: 260px;
  overflow-y: auto;
}

.autocomplete-suggestions li {
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.autocomplete-suggestions li.highlighted,
.autocomplete-suggestions li:hover {
  background: rgba(15, 118, 110, 0.08);
}

.suggestion-type {
  font-size: 0.75rem;
  /* Improve contrast on light tag background */
  color: #5c6b6f;
  margin-left: 0.5rem;
  background: rgba(15, 118, 110, 0.1);
  border-radius: 8px;
  padding: 0.1rem 0.5rem;
}

@media (max-width: 768px) {
  .autocomplete-suggestions li {
    padding: 0.5rem 0.7rem;
    font-size: 0.95rem;
  }
}

/* Help Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.help-modal {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
}

/* Glassy badges with stronger contrast */
.badge-glass {
  backdrop-filter: saturate(1.15) blur(4px);
  -webkit-backdrop-filter: saturate(1.15) blur(4px);
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-weight: 600;
  letter-spacing: .2px;
}

.badge-glass.bg-primary {
  background: rgba(13, 110, 253, 0.12);
  color: #0d6efd;
  border: 1px solid rgba(13, 110, 253, 0.35);
}

.badge-glass.bg-success {
  background: rgba(25, 135, 84, 0.12);
  color: #198754;
  border: 1px solid rgba(25, 135, 84, 0.35);
}

.badge-glass.bg-info {
  background: rgba(13, 202, 240, 0.14);
  color: #0ca7c7;
  border: 1px solid rgba(13, 202, 240, 0.38);
}

.badge-glass.bg-warning {
  background: rgba(255, 193, 7, 0.16);
  color: #a87300;
  border: 1px solid rgba(255, 193, 7, 0.38);
}

.badge-glass.bg-secondary {
  background: rgba(108, 117, 125, 0.14);
  color: #5c636a;
  border: 1px solid rgba(108, 117, 125, 0.35);
}

.badge-glass.bg-danger {
  background: rgba(220, 53, 69, 0.12);
  color: #c02e3f;
  border: 1px solid rgba(220, 53, 69, 0.35);
}

.badge-glass.bg-dark {
  background: rgba(33, 37, 41, 0.14);
  color: #212529;
  border: 1px solid rgba(33, 37, 41, 0.35);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.help-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e9ecef;
}

.help-modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
}

.help-modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.help-modal-close:hover {
  background: #f8f9fa;
  color: #333;
}

.help-modal-body {
  padding: 1.5rem;
}

.help-section {
  margin-bottom: 2rem;
}

.help-section:last-child {
  margin-bottom: 0;
}

.help-section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.help-text {
  color: #666;
  line-height: 1.7;
  margin-bottom: 0;
  font-size: 0.95rem;
}

.help-shortcuts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.shortcut-item kbd {
  background: #333;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: monospace;
  min-width: 2rem;
  text-align: center;
}

.help-list {
  list-style: none;
  padding: 0;
  margin: 0;
  line-height: 1.6;
}

.help-list li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.15rem;
}

.help-list li::before {
  content: "•";
  color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.suggestion-types {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.suggestion-type-example {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.suggestion-type-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.suggestion-type-badge.title {
  background: #0f766e;
  color: white;
}

.suggestion-type-badge.content {
  background: #15803d;
  color: white;
}

.suggestion-type-desc {
  color: #666;
  font-size: 0.9rem;
}

.help-example {
  background: #f7f5f0;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.help-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
}

/* Responsive Help Modal */
@media (max-width: 768px) {
  .help-modal {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  .help-modal-header {
    padding: 1rem 1rem 0.75rem;
  }

  .help-modal-title {
    font-size: 1.1rem;
  }

  .help-modal-body {
    padding: 1rem;
  }

  .help-section {
    margin-bottom: 1.5rem;
  }

  .help-section-title {
    font-size: 1rem;
  }

  .shortcut-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .suggestion-type-example {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 576px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .help-modal {
    margin: 0.5rem;
  }

  .help-modal-header {
    padding: 0.75rem 0.75rem 0.5rem;
  }

  .help-modal-body {
    padding: 0.75rem;
  }

  .help-modal-footer {
    padding: 0.75rem;
  }
}

/* AI Summary Styles */
.ai-summary-section {
  border-top: 2px solid #e9ecef;
  padding-top: 1.5rem;
}

.summary-header {
  border-bottom: 1px solid #f8f9fa;
  padding-bottom: 0.75rem;
}

.summary-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  align-items: center;
}

.summary-content {
  animation: fadeInUp 0.4s ease-out;
  line-height: 1.65;
  text-align: justify;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-card {
  background: #f2f7f5;
  border: 1px solid rgba(15, 118, 110, 0.24);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 18px rgba(15, 41, 32, 0.08);
}

.summary-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 0;
}

.summary-text p {
  margin-bottom: 1rem;
}

.summary-text p:last-child {
  margin-bottom: 0;
}

.summary-text strong {
  color: var(--primary-color);
  font-weight: 600;
}

.summary-footer {
  font-size: 0.85rem;
  color: #5c6b6f;
  border-top: 1px solid #dee2e6;
}

.summary-footer i {
  color: var(--primary-color);
}

/* Loading animation for summary button */
.btn-outline-info:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-outline-info:disabled i {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Responsive AI Summary */
@media (max-width: 768px) {
  .ai-summary-section {
    padding-top: 1rem;
  }

  .summary-card {
    padding: 1rem;
  }

  .summary-title {
    font-size: 1.1rem;
  }

  .summary-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 576px) {
  .summary-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .summary-card {
    padding: 0.75rem;
  }

  .summary-text {
    font-size: 0.9rem;
  }
}

/* Clean, evenly spaced action rows */
.action-row {
  padding: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  background: transparent;
}

.action-row .btn {
  flex: 0 0 auto;
  white-space: nowrap;
}

.action-row .btn+.btn {
  margin-left: 0;
}

/* Utilities for premium feel */
.round-20 {
  border-radius: 20px;
}

.soft-shadow {
  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.12);
}

.raise-on-hover {
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.raise-on-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px rgba(26, 95, 122, 0.26);
}

.focus-ring {
  outline: none;
}

.focus-ring:focus-visible {
  box-shadow: 0 0 0 4px var(--ring);
}

.animate-in {
  animation: fadeSlideUp 320ms ease both;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Toast stack fixed at top-right */
.toast-stack {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(420px, 90vw);
}

/* Toast look and feel + bootstrap custom hues */
.toast-alert.alert {
  border-radius: 14px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.18);
  padding: 0.75rem 1rem;
}

.alert-success.toast-alert {
  background-color: #e8f7f3;
  color: #0b5d4b;
  border: 1px solid rgba(11, 93, 75, 0.22);
}

.alert-danger.toast-alert {
  background-color: #fdecec;
  color: #7a2020;
  border: 1px solid rgba(122, 32, 32, 0.22);
}

.toast-alert .btn-close {
  filter: none;
  opacity: .6;
}

.toast-alert .btn-close:hover {
  opacity: 1;
}

@keyframes toastSlideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-alert.show {
  animation: toastSlideDown 260ms ease both;
}
</style>
