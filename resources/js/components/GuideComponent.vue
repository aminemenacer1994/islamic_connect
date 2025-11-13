<template>
  <div class="guide-root" :class="['container my-4', { 'pad-for-audio': isPlaying || isPaused }]" role="main">
   
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Guides</h2>
    <p class="text-center text-dark mb-4" style="font-size: 18px;">
      Discover insights into the core beliefs, practices, and morals of Islam.
    </p>

    <!-- Controls Section -->
    <section class="controls-section mb-4" style="border: 1px solid var(--primary-color);">
      <div class="row g-3 align-items-center" >
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
              @keydown.down.prevent="focusFirstMenuItem"
            >
              {{ selectedCategory !== '' ? guide.sections[selectedCategory].title : 'Choose a topic...' }}
            </button>
            <transition name="fade-slide">
              <ul class="dropdown-menu w-100" aria-labelledby="category-select" v-if="filteredSections.length" role="menu" ref="categoryMenu" @keydown.down.prevent="moveMenuFocus(1)" @keydown.up.prevent="moveMenuFocus(-1)">
                <li v-for="(section, index) in filteredSections" :key="section.title" role="none">
                  <a 
                    class="dropdown-item d-flex align-items-center justify-content-between" 
                    href="#"
                    role="menuitem"
                    :aria-current="guide.sections.indexOf(section) === selectedCategory ? 'true' : null"
                    @click.prevent="selectedCategory = guide.sections.indexOf(section); showSuccessMessage('Guide selected successfully!')"
                    :tabindex="-1"
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
            <button 
              class="btn btn-sm btn-link text-decoration-none ms-1" 
              @click="showHelpModal = true"
              title="Search Help"
              aria-label="Search help"
            >
              <i class="bi bi-question-circle"></i>
            </button>
          </label>
          <div class="input-group">
          <input
            id="search-input"
            type="text"
            v-model="searchText"
            class="form-control"
              placeholder="Search keywords..."
            aria-label="Search guide content"
            @focus="showSuggestions = true"
            @input="showSuggestions = true; highlightedIndex = -1;"
            @keydown.down.prevent="highlightedIndex = Math.min(highlightedIndex + 1, suggestions.length - 1)"
            @keydown.up.prevent="highlightedIndex = Math.max(highlightedIndex - 1, 0)"
            @keydown.enter.prevent="suggestions[highlightedIndex] && selectSuggestion(suggestions[highlightedIndex])"
            @blur="setTimeout(() => showSuggestions = false, 100)"
          >
            <button v-if="searchText" class="btn btn-outline-secondary" @click="searchText = ''; showSuccessMessage('Search cleared!')">
              <i class="bi bi-x"></i>
              </button>
          </div>
          <!-- Autocomplete Suggestions Dropdown -->
          <ul v-if="showSuggestions && suggestions.length" class="autocomplete-suggestions">
            <li
              v-for="(suggestion, idx) in suggestions"
              :key="idx"
              :class="{ highlighted: idx === highlightedIndex }"
              @mousedown.prevent="selectSuggestion(suggestion); showSuccessMessage('Suggestion selected!')"
              @mouseover="highlightedIndex = idx"
            >
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
      <section 
        v-if="selectedCategory !== '' && guide.sections[selectedCategory]" 
        class="mb-5"
        id="content-section"
        ref="contentSectionRef"
      >
        <!-- Progress Tracker -->
        <div class="progress-tracker-container" v-if="selectedCategory !== '' && guide.sections[selectedCategory]">
          <div class="progress-bar reading-progress" :style="{ width: readingProgress + '%' }" role="progressbar" :aria-valuenow="readingProgress" aria-valuemin="0" aria-valuemax="100" aria-label="Reading progress"></div>
          <div v-if="isPlaying || isPaused" class="progress-bar audio-progress" :style="{ width: audioProgress + '%' }" role="progressbar" :aria-valuenow="audioProgress" aria-valuemin="0" aria-valuemax="100" aria-label="Audio progress"></div>
          <div class="progress-labels d-flex justify-content-between small mt-1">
            <span v-if="isPlaying || isPaused">Listen: {{ Math.round(audioProgress) }}%</span>
          </div>
        </div>
        <div class="content-card card">
          <div class="card-body">
            <!-- Card Header -->
            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
              <div>
                <h2 class="content-title mb-2" :style="{ fontSize: fontSize + 'rem' }">
                  {{ guide.sections[selectedCategory].title }}
                </h2>
                <div class="badge" :class="getBadgeClasses(guide.sections[selectedCategory].title)">
                  {{ getCategoryName(guide.sections[selectedCategory].title) }}
                </div>
                <div v-if="selectedCategory !== '' && guide.sections[selectedCategory]" class="guide-meta mt-2 text-muted small">
                  <span title="Total number of words in this guide section.">Word count: {{ wordCount }}</span>
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
                  <button
                    class="btn btn-sm btn-outline-dark"
                    @click="generateSummary"
                    :disabled="isSummaryLoading"
                    :title="isSummaryLoading ? 'Generating summary...' : 'Generate AI Summary'"
                  >
                    <i class="bi" :class="isSummaryLoading ? 'bi-hourglass-split' : 'bi-robot'"></i>
                    {{ isSummaryLoading ? 'Generating...' : 'AI Summary' }}
                  </button>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    @click="decreaseFontSize"
                    :disabled="fontSize <= minFontSize"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    -
                  </button>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    @click="increaseFontSize"
                    :disabled="fontSize >= maxFontSize"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    +
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
                      <span v-html="getHighlightedText(item)" class="content-text" :style="{ fontSize: fontSize - 0.2 + 'rem' }"></span>
                    </div>
                  </li>
                </transition-group>
              </template>
              <template v-else>
                <div class="content-text" v-html="highlightText(guide.sections[selectedCategory].content)" :style="{ fontSize: fontSize - 0.2 + 'rem' }"></div>
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
                    <button 
                      class="btn btn-sm btn-outline-secondary"
                      @click="toggleSummary"
                      :title="showSummary ? 'Hide Summary' : 'Show Summary'"
                      aria-label="Toggle AI summary visibility"
                    >
                      <i class="bi" :class="showSummary ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                      {{ showSummary ? 'Hide' : 'Show' }}
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      @click="closeSummary"
                      title="Close AI Summary"
                      aria-label="Close AI summary"
                    >
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
        <button type="button" class="btn-close" aria-label="Close alert" @click="closeAlert"></button>
      </div>
    </transition>
    <transition name="fade-slide">
      <div v-if="showErrorAlert" class="alert alert-danger alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999;" role="alert">
        {{ errorMessage }}
        <button type="button" class="btn-close" aria-label="Close error alert" @click="closeErrorAlert"></button>
      </div>
    </transition>

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
              The search feature provides intelligent suggestions as you type, helping you quickly find relevant content in Islamic guides.
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
                Try typing <strong>"prayer"</strong> to see suggestions for prayer-related content, or <strong>"quran"</strong> for Quran-related guides.
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
      const stop = new Set(['the','and','a','an','is','are','to','of','in','on','for','with','as','by','it','that','this','be','or','from','at','was','were','which','has','have','had','their','its','into','about','also','not','but','can','may','such','like','then','than']);
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
        'Theology': ['allah','god','faith','belief','divine','spiritual','creed'],
        'Worship': ['prayer','worship','fasting','hajj','dua','dhikr','salah','zakat'],
        'Ethics': ['ethics','morality','character','virtue','forgiveness','mercy','gratitude'],
        'Social Justice': ['justice','equality','rights','community','society','fairness'],
        'Family': ['family','marriage','spouse','children','parents','women','men'],
        'Finance': ['wealth','charity','financial','money','economic','business','usury'],
        'Health': ['health','wellness','medical','physical','mental','hygiene'],
        'Education': ['knowledge','learning','education','study','wisdom'],
        'Law': ['halal','haram','law','legal','permissible','forbidden','fiqh'],
        'Environment': ['environment','nature','stewardship','earth','creation','sustainability']
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
      const top = scored.slice(0, 12).sort((a,b) => a.i - b.i);
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
        .sort((a,b) => b[1]-a[1])
        .slice(0,5)
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
      const text = `*${title}*\n\n${content}\n\n— Shared via Islamic Guides`;
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
/* Base Styles */
.guide-root {
  /* Darker teal improves contrast on white and as a filled background with white text */
  --primary-color: #00695c;
  --primary-hover: #00564c;
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
  /* Darker gray for AA contrast on light backgrounds */
  color: #495057;
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
  box-shadow: 0 2px 8px rgba(0,191,166,0.18);
  cursor: pointer;
}
.audio-volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0b5d4b;
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

/* Ensure content not hidden behind fixed audio bar */
.pad-for-audio {
  padding-bottom: 110px; /* approximate player height */
}
@media (max-width: 768px) {
  .pad-for-audio { padding-bottom: 140px; }
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
  background: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%) !important;
  color: white !important;
  border-color: #228B22;
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

/* Progress Tracker Styles */
.progress-tracker-container {
  position: relative;
  margin-bottom: 0.5rem;
  width: 100%;
}
.progress-bar {
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  position: relative;
  margin-bottom: 2px;
  transition: width 0.1s linear;
  will-change: width;
}
.progress-bar.reading-progress {
  background: linear-gradient(90deg, var(--primary-color) 0%, #38ef7d 100%);
  z-index: 1;
}
.progress-bar.audio-progress {
  background: linear-gradient(90deg, #228B22 0%, #1a6b1a 100%);
  margin-top: -6px;
  opacity: 0.85;
  z-index: 2;
}
.progress-labels {
  font-size: 0.85rem;
  /* Increase contrast for accessibility (WCAG 2.0 AA) */
  color: #666;
  margin-top: 2px;
}
.autocomplete-suggestions {
  position: absolute;
  z-index: 1000;
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  width: 100%;
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
  background: #f8f9fa;
}
.suggestion-type {
  font-size: 0.75rem;
  /* Improve contrast on light tag background */
  color: #666;
  margin-left: 0.5rem;
  background: #f1f1f1;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.help-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
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
  line-height: 1.6;
  margin-bottom: 0;
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
}

.help-list li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
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
  background: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%);
  color: white;
}

.suggestion-type-badge.content {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.suggestion-type-desc {
  color: #666;
  font-size: 0.9rem;
}

.help-example {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  color: #333;
  display: flex;
  align-items: center;
}

.summary-content {
  animation: fadeInUp 0.4s ease-out;
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid rgb(103, 153, 103);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
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
  color: #6c757d;
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
</style>
