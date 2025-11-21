"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_GuideComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _guides_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../guides.json */ "./resources/js/guides.json");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  setup() {
    const selectedCategory = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const searchText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const isBookmarked = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const isPlaying = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const isPaused = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const isAudioLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const isMuted = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const currentTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const totalDuration = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const volume = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(70);
    const utterance = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    // Stable audio timing
    const playbackStartMs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const accumulatedMs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const currentPlayingContent = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      title: '',
      category: ''
    });
    const fullText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const isAuthenticated = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const userId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const showAlert = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const showErrorAlert = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const alertMessage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const errorMessage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const selectedCategoryFilter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('All');
    const availableCategories = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    // Progress tracker state
    const readingProgress = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const audioProgress = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!totalDuration.value || totalDuration.value === 0) return 0;
      return Math.min(100, Math.max(0, currentTime.value / totalDuration.value * 100));
    });
    const contentSectionRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    // Font size state
    const minFontSize = 1.1;
    const maxFontSize = 2.5;
    const fontSize = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1.5); // default for title, content will be fontSize - 0.2
    const showSuggestions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const highlightedIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(-1);
    const showHelpModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const categoryMenu = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const animFrameId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    // AI Summary state
    const isSummaryLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const summaryText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const showSummary = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    const summarySectionRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const audioBarVisible = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => isPlaying.value || isPaused.value);
    function increaseFontSize() {
      if (fontSize.value < maxFontSize) fontSize.value += 0.1;
    }
    function decreaseFontSize() {
      if (fontSize.value > minFontSize) fontSize.value -= 0.1;
    }

    // Word count, read time, listen time
    // Preprocess guide data for faster search and metrics
    const normalizedSections = _guides_json__WEBPACK_IMPORTED_MODULE_1__.sections.map((s, i) => {
      const contentText = Array.isArray(s.content) ? s.content.join(' ') : s.content || '';
      return {
        index: i,
        title: s.title,
        titleL: s.title.toLowerCase(),
        contentText,
        contentL: contentText.toLowerCase()
      };
    });
    const currentSection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (selectedCategory.value === '' || !_guides_json__WEBPACK_IMPORTED_MODULE_1__.sections[selectedCategory.value]) return null;
      return _guides_json__WEBPACK_IMPORTED_MODULE_1__.sections[selectedCategory.value];
    });
    const currentContentText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!currentSection.value) return '';
      return Array.isArray(currentSection.value.content) ? currentSection.value.content.join(' ') : currentSection.value.content || '';
    });
    const wordCount = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!currentContentText.value) return 0;
      return currentContentText.value.trim().split(/\s+/).filter(Boolean).length;
    });
    const readTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      // 200 words per minute
      return Math.max(1, Math.ceil(wordCount.value / 200));
    });
    const listenTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
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
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      if (typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          // Voice setup if needed
        };
      }

      // Check authentication status
      checkAuthentication();

      // Initialize available categories
      initializeCategories();
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        window.addEventListener('scroll', handleScroll, {
          passive: true
        });
        window.addEventListener('resize', handleScroll, {
          passive: true
        });
        updateReadingProgress();
      });
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(selectedCategory, () => {
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        updateReadingProgress();
      });
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animFrameId.value);
    });
    const titleToSection = Object.fromEntries((_guides_json__WEBPACK_IMPORTED_MODULE_1__.sections || []).map(s => [s.title, s]));
    const categoriesIndex = (() => {
      const idx = {};
      const cats = _guides_json__WEBPACK_IMPORTED_MODULE_1__.categories || {};
      Object.keys(cats).forEach(cat => {
        (cats[cat] || []).forEach(t => {
          idx[t] = cat;
        });
      });
      return idx;
    })();
    const initializeCategories = () => {
      const categories = new Set();
      _guides_json__WEBPACK_IMPORTED_MODULE_1__.sections.forEach(section => {
        const category = getCategoryName(section.title);
        categories.add(category);
      });
      availableCategories.value = Array.from(categories).sort();
    };
    const getCategoryName = title => {
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
    const getBadgeClasses = title => {
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
    const contentCardEl = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    function cacheContentCard() {
      const el = contentSectionRef.value;
      contentCardEl.value = el ? el.querySelector('.content-card') : null;
    }
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(selectedCategory, () => cacheContentCard());
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => cacheContentCard());
    function updateReadingProgress() {
      const content = contentCardEl.value;
      if (!content) {
        readingProgress.value = 0;
        return;
      }
      const rect = content.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const contentHeight = content.scrollHeight;
      const scrollTop = window.scrollY + (windowHeight - rect.height) / 2 - rect.top;
      const progress = contentHeight > 0 ? Math.min(100, Math.max(0, scrollTop / (contentHeight - rect.height) * 100)) : 0;
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
    const debouncedSearchText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    let debounceTimer = null;
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(searchText, val => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        debouncedSearchText.value = val;
      }, 150);
    });
    const suggestions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const q = debouncedSearchText.value.trim().toLowerCase();
      if (!q) return [];
      const results = [];
      for (const s of normalizedSections) {
        if (s.titleL.includes(q)) {
          results.push({
            type: 'title',
            value: s.title,
            index: s.index
          });
        } else if (s.contentL.includes(q)) {
          const snippet = s.contentText.slice(0, 100) + (s.contentText.length > 100 ? '...' : '');
          results.push({
            type: 'content',
            value: snippet,
            index: s.index
          });
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
      const selectedSection = _guides_json__WEBPACK_IMPORTED_MODULE_1__.sections[selectedCategory.value];
      try {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const content = Array.isArray(selectedSection.content) ? selectedSection.content.join(' ') : selectedSection.content;

        // Generate summary using frontend logic
        const summary = generateAISummary(selectedSection.title, content, getCategoryName(selectedSection.title));
        summaryText.value = summary;
        showSummary.value = true;
        showSuccessMessage('AI summary generated successfully!');
        // Auto-scroll to summary section after rendering
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
          if (summarySectionRef.value) {
            summarySectionRef.value.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
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
      const sentences = content.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 25);
      if (!sentences.length) return '<p>No summary available.</p>';

      // Build word frequency excluding stopwords
      const stop = new Set(['the', 'and', 'a', 'an', 'is', 'are', 'to', 'of', 'in', 'on', 'for', 'with', 'as', 'by', 'it', 'that', 'this', 'be', 'or', 'from', 'at', 'was', 'were', 'which', 'has', 'have', 'had', 'their', 'its', 'into', 'about', 'also', 'not', 'but', 'can', 'may', 'such', 'like', 'then', 'than']);
      const words = content.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w && !stop.has(w));
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
          score += freq.get(t) || 0;
          if (titleTerms.has(t)) score += 2; // title overlap
          if (catTerms.has(t)) score += 1.5; // category relevance
        }
        // slight bonus for early sentences
        score += Math.max(0, 2 - i * 0.1);
        return {
          s,
          i,
          score
        };
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
          if (union && inter / union > 0.7) {
            similar = true;
            break;
          }
        }
        if (!similar) chosen.push(x);
      }

      // Build sections
      const overview = chosen.slice(0, 2).map(x => x.s).join(' ');
      const bullets = chosen.slice(0, 6).map(x => `<li>${x.s.replace(/^[,\s]+/, '')}</li>`).join('');
      // Extract up to 5 frequent key terms for takeaway
      const topTerms = [...freq.entries()].filter(([w]) => w.length > 3 && !titleTerms.has(w) && !stop.has(w)).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([w]) => w).join(', ');

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
        summarySectionRef.value.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // If a fixed header exists, add an offset (e.g., 80px)
        setTimeout(() => {
          const y = summarySectionRef.value.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
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
      guide: _guides_json__WEBPACK_IMPORTED_MODULE_1__,
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
      audioBarVisible
    };
  },
  computed: {
    filteredSections() {
      if (this.selectedCategoryFilter === 'All') {
        return this.guide.sections;
      }
      return this.guide.sections.filter(section => this.getCategoryName(section.title) === this.selectedCategoryFilter);
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
      const content = Array.isArray(selectedSection.content) ? selectedSection.content.join('\n\n') : selectedSection.content;
      const formData = {
        title: selectedSection.title,
        content: content,
        category: selectedSection.category || 'Islamic Guide'
      };
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/bookmarks', formData);
        this.isBookmarked = true;
        this.showSuccessMessage('Guide bookmarked successfully!');
      } catch (error) {
        var _error$response;
        console.error('Error bookmarking guide:', error);
        this.showErrorAlert = true;
        this.errorMessage = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to bookmark guide. Please try again.';
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
      const elapsed = this.isPlaying ? this.accumulatedMs + (now - this.playbackStartMs) : this.accumulatedMs;
      const seconds = Math.min(this.totalDuration || 0, Math.max(0, elapsed / 1000));
      this.currentTime = seconds;
      if (this.isPlaying && this.currentTime < this.totalDuration) {
        this.animFrameId = requestAnimationFrame(() => this.updateTime());
      }
    },
    getHighlightedText(item) {
      if (!this.isPlaying) return item;
      const currentWordIndex = Math.floor(this.currentTime / this.estimateWordDuration());
      return item.split(' ').map((word, index) => index === currentWordIndex ? `<span class="highlight-word">${word}</span>` : word).join(' ');
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
      const content = Array.isArray(selectedSection.content) ? selectedSection.content.join('\n\n') : selectedSection.content;
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
      const content = Array.isArray(selectedSection.content) ? `<ul style="padding-left:1.5rem;">${selectedSection.content.map((item, i) => `<li style="margin-bottom:1rem;">${item}</li>`).join('')}</ul>` : `<div>${selectedSection.content}</div>`;
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
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "card-teal controls-section mb-4 round-20 soft-shadow animate-in"
};
const _hoisted_2 = {
  class: "row g-3 align-items-center"
};
const _hoisted_3 = {
  class: "col-md-6"
};
const _hoisted_4 = {
  class: "dropdown"
};
const _hoisted_5 = ["aria-current", "onClick"];
const _hoisted_6 = {
  class: "guide-title"
};
const _hoisted_7 = {
  key: 0,
  class: "col-md-6"
};
const _hoisted_8 = {
  for: "search-input",
  class: "form-label"
};
const _hoisted_9 = {
  class: "input-group search-pill"
};
const _hoisted_10 = {
  key: 0,
  class: "autocomplete-suggestions"
};
const _hoisted_11 = ["onMousedown", "onMouseover"];
const _hoisted_12 = ["innerHTML"];
const _hoisted_13 = {
  key: 0,
  class: "suggestion-type"
};
const _hoisted_14 = {
  key: 1,
  class: "suggestion-type"
};
const _hoisted_15 = {
  key: 0,
  class: "mb-5",
  id: "content-section",
  ref: "contentSectionRef"
};
const _hoisted_16 = {
  key: 0,
  class: "progress-tracker-container"
};
const _hoisted_17 = ["aria-valuenow"];
const _hoisted_18 = ["aria-valuenow"];
const _hoisted_19 = {
  class: "progress-labels d-flex justify-content-between small mt-1"
};
const _hoisted_20 = {
  key: 0
};
const _hoisted_21 = {
  class: "content-card card round-20 soft-shadow animate-in"
};
const _hoisted_22 = {
  class: "card-body"
};
const _hoisted_23 = {
  class: "d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3"
};
const _hoisted_24 = {
  key: 0,
  class: "guide-meta mt-2 text-muted small"
};
const _hoisted_25 = {
  title: "Total number of words in this guide section."
};
const _hoisted_26 = {
  class: "action-row controls-actions toolbar toolbar-premium toolbar-segmented d-flex gap-2 round-20",
  key: "button-group"
};
const _hoisted_27 = ["disabled"];
const _hoisted_28 = ["disabled", "title"];
const _hoisted_29 = {
  class: "toolbar-label"
};
const _hoisted_30 = ["disabled"];
const _hoisted_31 = ["disabled"];
const _hoisted_32 = {
  class: "selected-content"
};
const _hoisted_33 = {
  class: "d-flex align-items-start"
};
const _hoisted_34 = {
  class: "badge bg-primary bg-opacity-10 text-primary me-3 mt-1"
};
const _hoisted_35 = ["innerHTML"];
const _hoisted_36 = ["innerHTML"];
const _hoisted_37 = {
  key: 0,
  class: "ai-summary-section mt-4",
  ref: "summarySectionRef"
};
const _hoisted_38 = {
  class: "summary-header d-flex align-items-center justify-content-between mb-3"
};
const _hoisted_39 = {
  class: "d-flex gap-2"
};
const _hoisted_40 = ["title"];
const _hoisted_41 = {
  key: 0,
  class: "summary-content"
};
const _hoisted_42 = {
  class: "summary-card"
};
const _hoisted_43 = ["innerHTML"];
const _hoisted_44 = {
  key: 0,
  class: "modern-audio-player card-teal w-100"
};
const _hoisted_45 = {
  class: "audio-player-row top"
};
const _hoisted_46 = {
  class: "audio-meta text-start"
};
const _hoisted_47 = {
  class: "audio-title small-title"
};
const _hoisted_48 = {
  class: "audio-subtitle"
};
const _hoisted_49 = {
  class: "audio-player-row bottom"
};
const _hoisted_50 = {
  class: "audio-controls"
};
const _hoisted_51 = {
  class: "audio-progress-wrap"
};
const _hoisted_52 = {
  class: "audio-progress-bar"
};
const _hoisted_53 = {
  class: "audio-right"
};
const _hoisted_54 = {
  class: "help-modal-header"
};
const _hoisted_55 = {
  class: "help-modal-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["guide-root", ['container my-4', {
      'pad-for-audio': $setup.isPlaying || $setup.isPaused
    }]]),
    role: "main"
  }, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center fw-bold display-5 display-md-4"
  }, "Islamic Guides", -1 /* CACHED */)), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-dark mb-4 header-description"
  }, " Discover insights into the core beliefs, practices, and morals of Islam. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Controls Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Category Dropdown "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "category-select",
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-bookmark me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Select a Guide ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "form-select dropdown-toggle",
    type: "button",
    id: "category-select",
    "data-bs-toggle": "dropdown",
    "aria-expanded": "false",
    onKeydown: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.focusFirstMenuItem && $options.focusFirstMenuItem(...args), ["prevent"]), ["down"]))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCategory !== '' ? $setup.guide.sections[$setup.selectedCategory].title : 'Choose a topic...'), 33 /* TEXT, NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade-slide"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$options.filteredSections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", {
      key: 0,
      class: "dropdown-menu w-100",
      "aria-labelledby": "category-select",
      role: "menu",
      ref: "categoryMenu",
      onKeydown: [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.moveMenuFocus(1), ["prevent"]), ["down"])), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.moveMenuFocus(-1), ["prevent"]), ["up"]))]
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredSections, (section, index) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: section.title,
        role: "none"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "dropdown-item d-flex align-items-center justify-content-between",
        href: "#",
        role: "menuitem",
        "aria-current": $setup.guide.sections.indexOf(section) === $setup.selectedCategory ? 'true' : null,
        onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
          $setup.selectedCategory = $setup.guide.sections.indexOf(section);
          $setup.showSuccessMessage('Guide selected successfully!');
        }, ["prevent"]),
        tabindex: -1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge ms-2", $setup.getBadgeClasses(section.title)])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getCategoryName(section.title)), 3 /* TEXT, CLASS */)], 8 /* PROPS */, _hoisted_5)]);
    }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Input "), $setup.selectedCategory !== '' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_8, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search me-2"
  }, null, -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Search Content ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-link text-decoration-none ms-1",
    onClick: _cache[3] || (_cache[3] = $event => $setup.showHelpModal = true),
    title: "Search Help",
    "aria-label": "Search help"
  }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "search-input",
    type: "text",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.searchText = $event),
    class: "form-control search-input",
    placeholder: "Search keywords...",
    "aria-label": "Search guide content",
    onFocus: _cache[5] || (_cache[5] = $event => $setup.showSuggestions = true),
    onInput: _cache[6] || (_cache[6] = $event => {
      $setup.showSuggestions = true;
      $setup.highlightedIndex = -1;
    }),
    onKeydown: [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.highlightedIndex = Math.min($setup.highlightedIndex + 1, $setup.suggestions.length - 1), ["prevent"]), ["down"])), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.highlightedIndex = Math.max($setup.highlightedIndex - 1, 0), ["prevent"]), ["up"])), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.suggestions[$setup.highlightedIndex] && $setup.selectSuggestion($setup.suggestions[$setup.highlightedIndex]), ["prevent"]), ["enter"]))],
    onBlur: _cache[10] || (_cache[10] = $event => _ctx.setTimeout(() => $setup.showSuggestions = false, 100))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.searchText]]), $setup.searchText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn btn-outline-secondary btn-clear",
    onClick: _cache[11] || (_cache[11] = $event => {
      $setup.searchText = '';
      $setup.showSuccessMessage('Search cleared!');
    })
  }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Autocomplete Suggestions Dropdown "), $setup.showSuggestions && $setup.suggestions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.suggestions, (suggestion, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: idx,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        highlighted: idx === $setup.highlightedIndex
      }),
      onMousedown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
        $setup.selectSuggestion(suggestion);
        $setup.showSuccessMessage('Suggestion selected!');
      }, ["prevent"]),
      onMouseover: $event => $setup.highlightedIndex = idx
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: $setup.highlightSuggestion(suggestion.value)
    }, null, 8 /* PROPS */, _hoisted_12), suggestion.type === 'title' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_13, "Title")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_14, "Content"))], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_11);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Content Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade-slide"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.selectedCategory !== '' && $setup.guide.sections[$setup.selectedCategory] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Progress Tracker "), $setup.selectedCategory !== '' && $setup.guide.sections[$setup.selectedCategory] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress-bar reading-progress",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: $setup.readingProgress + '%'
      }),
      role: "progressbar",
      "aria-valuenow": $setup.readingProgress,
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-label": "Reading progress"
    }, null, 12 /* STYLE, PROPS */, _hoisted_17), $setup.isPlaying || $setup.isPaused ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "progress-bar audio-progress",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: $setup.audioProgress + '%'
      }),
      role: "progressbar",
      "aria-valuenow": $setup.audioProgress,
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-label": "Audio progress"
    }, null, 12 /* STYLE, PROPS */, _hoisted_18)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$setup.isPlaying || $setup.isPaused ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_20, "Listen: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($setup.audioProgress)) + "%", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "content-title mb-2",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: $setup.fontSize + 'rem'
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.guide.sections[$setup.selectedCategory].title), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge badge-glass", $setup.getBadgeClasses($setup.guide.sections[$setup.selectedCategory].title)])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getCategoryName($setup.guide.sections[$setup.selectedCategory].title)), 3 /* TEXT, CLASS */), $setup.selectedCategory !== '' && $setup.guide.sections[$setup.selectedCategory] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, "Word count: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.wordCount), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "fade-scale"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-premium-outline focus-ring",
        onClick: _cache[12] || (_cache[12] = (...args) => $options.playCurrentContent && $options.playCurrentContent(...args)),
        disabled: $setup.isAudioLoading
      }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-play-fill toolbar-icon"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "toolbar-label"
      }, "Listen", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_27), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                    class=\"btn btn-sm btn-outline-primary\"\n                    @click=\"bookmarkGuide\"\n                    :disabled=\"!isAuthenticated\"\n                    :title=\"!isAuthenticated ? 'Please login to bookmark' : ''\"\n                    :aria-pressed=\"isBookmarked\"\n                  >\n                    <i :class=\"isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'\"></i>\n                    {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}\n                  </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-premium focus-ring",
        onClick: _cache[13] || (_cache[13] = (...args) => $options.shareOnWhatsApp && $options.shareOnWhatsApp(...args))
      }, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-share toolbar-icon"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "toolbar-label"
      }, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-premium-outline focus-ring",
        onClick: _cache[14] || (_cache[14] = (...args) => $options.printGuide && $options.printGuide(...args))
      }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-printer toolbar-icon"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "toolbar-label"
      }, "Print", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-premium-outline focus-ring",
        onClick: _cache[15] || (_cache[15] = (...args) => $setup.generateSummary && $setup.generateSummary(...args)),
        disabled: $setup.isSummaryLoading,
        title: $setup.isSummaryLoading ? 'Generating summary...' : 'Generate AI Summary'
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi toolbar-icon", $setup.isSummaryLoading ? 'bi-hourglass-split' : 'bi-robot'])
      }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.isSummaryLoading ? 'Generating' : 'AI Summary'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_28), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-premium-outline focus-ring",
        onClick: _cache[16] || (_cache[16] = (...args) => $setup.decreaseFontSize && $setup.decreaseFontSize(...args)),
        disabled: $setup.fontSize <= $setup.minFontSize,
        title: "Decrease font size",
        "aria-label": "Decrease font size"
      }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-dash toolbar-icon"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "toolbar-label"
      }, "A-", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_30), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-premium-outline focus-ring",
        onClick: _cache[17] || (_cache[17] = (...args) => $setup.increaseFontSize && $setup.increaseFontSize(...args)),
        disabled: $setup.fontSize >= $setup.maxFontSize,
        title: "Increase font size",
        "aria-label": "Increase font size"
      }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-plus toolbar-icon"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "toolbar-label"
      }, "A+", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_31)])]),
      _: 1 /* STABLE */
    })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [Array.isArray($setup.guide.sections[$setup.selectedCategory].content) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup, {
      key: 0,
      name: "stagger-fade",
      tag: "ul",
      class: "list-unstyled mb-0"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.guide.sections[$setup.selectedCategory].content, (item, index) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: index,
          class: "mb-3 pb-3 border-bottom"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
          innerHTML: $options.getHighlightedText(item),
          class: "content-text",
          style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
            fontSize: $setup.fontSize - 0.2 + 'rem'
          })
        }, null, 12 /* STYLE, PROPS */, _hoisted_35)])]);
      }), 128 /* KEYED_FRAGMENT */))]),
      _: 1 /* STABLE */
    })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "content-text",
      innerHTML: $options.highlightText($setup.guide.sections[$setup.selectedCategory].content),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: $setup.fontSize - 0.2 + 'rem'
      })
    }, null, 12 /* STYLE, PROPS */, _hoisted_36))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Summary Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "fade-slide",
      onAfterEnter: $setup.scrollToSummary
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.summaryText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
        class: "summary-title mb-0"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-robot me-2 text-info"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" AI Summary ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary",
        onClick: _cache[18] || (_cache[18] = (...args) => $options.toggleSummary && $options.toggleSummary(...args)),
        title: $setup.showSummary ? 'Hide Summary' : 'Show Summary',
        "aria-label": "Toggle AI summary visibility"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $setup.showSummary ? 'bi-chevron-up' : 'bi-chevron-down'])
      }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.showSummary ? 'Hide' : 'Show'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_40), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary",
        onClick: _cache[19] || (_cache[19] = (...args) => $options.closeSummary && $options.closeSummary(...args)),
        title: "Close AI Summary",
        "aria-label": "Close AI summary"
      }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-x-lg"
      }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
        name: "fade-slide"
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.showSummary ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          class: "summary-text",
          innerHTML: $setup.summaryText
        }, null, 8 /* PROPS */, _hoisted_43), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          class: "summary-footer mt-3 pt-3 border-top"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
          class: "text-muted"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          class: "bi bi-info-circle me-1"
        }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" This summary was generated by AI to help you understand the key points of this guide. ")])], -1 /* CACHED */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
        _: 1 /* STABLE */
      })], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["onAfterEnter"])])])], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Audio Player "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "global-audio-player"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.isPlaying || $setup.isPaused ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentPlayingContent.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentPlayingContent.category || 'Recitation'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "audio-btn",
      onClick: _cache[20] || (_cache[20] = (...args) => $options.stopPlayback && $options.stopPlayback(...args)),
      "aria-label": "Rewind"
    }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-backward-fill"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "audio-btn",
      onClick: _cache[21] || (_cache[21] = (...args) => $options.togglePlayPause && $options.togglePlayPause(...args)),
      "aria-label": "Play/Pause"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $setup.isPlaying ? 'bi-pause-fill' : 'bi-play-fill'])
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "audio-btn",
      onClick: _cache[22] || (_cache[22] = (...args) => $options.stopPlayback && $options.stopPlayback(...args)),
      "aria-label": "Forward"
    }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-forward-fill"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "audio-btn",
      onClick: _cache[23] || (_cache[23] = (...args) => $options.stopPlayback && $options.stopPlayback(...args)),
      "aria-label": "Stop"
    }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-stop-fill"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "audio-progress",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: $setup.currentTime / $setup.totalDuration * 100 + '%'
      })
    }, null, 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-volume-up-fill volume-icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "range",
      min: "0",
      max: "100",
      "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => $setup.volume = $event),
      onInput: _cache[25] || (_cache[25] = (...args) => $options.updateVolume && $options.updateVolume(...args)),
      class: "audio-volume-slider",
      "aria-label": "Volume control"
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.volume, void 0, {
      number: true
    }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "audio-btn close-btn",
      onClick: _cache[26] || (_cache[26] = (...args) => $options.stopPlayback && $options.stopPlayback(...args)),
      "aria-label": "Close"
    }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-lg"
    }, null, -1 /* CACHED */)]))])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Alert Messages (Top-right premium toast stack) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"toast-stack\" aria-live=\"polite\" aria-atomic=\"true\">\n      <transition name=\"fade-slide\">\n        <div v-if=\"showAlert\" class=\"alert alert-success alert-dismissible fade show toast-alert\" role=\"alert\">\n          {{ alertMessage }}\n          <button type=\"button\" class=\"btn-close\" aria-label=\"Close alert\" @click=\"closeAlert\"></button>\n        </div>\n      </transition>\n      <transition name=\"fade-slide\">\n        <div v-if=\"showErrorAlert\" class=\"alert alert-danger alert-dismissible fade show toast-alert\" role=\"alert\">\n          {{ errorMessage }}\n          <button type=\"button\" class=\"btn-close\" aria-label=\"Close error alert\" @click=\"closeErrorAlert\"></button>\n        </div>\n      </transition>\n    </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Help Modal "), $setup.showHelpModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "modal-overlay",
    onClick: _cache[30] || (_cache[30] = $event => $setup.showHelpModal = false)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "help-modal",
    onClick: _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "help-modal-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Search Suggestions Guide ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "help-modal-close",
    onClick: _cache[27] || (_cache[27] = $event => $setup.showHelpModal = false),
    "aria-label": "Close help"
  }, [...(_cache[49] || (_cache[49] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))])]), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"help-modal-body\" data-v-6b54700c><div class=\"help-section\" data-v-6b54700c><h4 class=\"help-section-title\" data-v-6b54700c><i class=\"bi bi-lightbulb me-2\" data-v-6b54700c></i> How It Works </h4><p class=\"help-text\" data-v-6b54700c> The search feature provides intelligent suggestions as you type, helping you quickly find relevant content in Islamic guides. </p></div><div class=\"help-section\" data-v-6b54700c><h4 class=\"help-section-title\" data-v-6b54700c><i class=\"bi bi-keyboard me-2\" data-v-6b54700c></i> Keyboard Navigation </h4><div class=\"help-shortcuts\" data-v-6b54700c><div class=\"shortcut-item\" data-v-6b54700c><kbd data-v-6b54700c>↑</kbd> <span data-v-6b54700c>Move up through suggestions</span></div><div class=\"shortcut-item\" data-v-6b54700c><kbd data-v-6b54700c>↓</kbd> <span data-v-6b54700c>Move down through suggestions</span></div><div class=\"shortcut-item\" data-v-6b54700c><kbd data-v-6b54700c>Enter</kbd> <span data-v-6b54700c>Select highlighted suggestion</span></div><div class=\"shortcut-item\" data-v-6b54700c><kbd data-v-6b54700c>Esc</kbd> <span data-v-6b54700c>Close suggestions dropdown</span></div></div></div><div class=\"help-section\" data-v-6b54700c><h4 class=\"help-section-title\" data-v-6b54700c><i class=\"bi bi-mouse me-2\" data-v-6b54700c></i> Mouse Navigation </h4><ul class=\"help-list\" data-v-6b54700c><li data-v-6b54700c>Hover over any suggestion to highlight it</li><li data-v-6b54700c>Click on a suggestion to select it</li><li data-v-6b54700c>Click outside the dropdown to close it</li></ul></div><div class=\"help-section\" data-v-6b54700c><h4 class=\"help-section-title\" data-v-6b54700c><i class=\"bi bi-tags me-2\" data-v-6b54700c></i> Suggestion Types </h4><div class=\"suggestion-types\" data-v-6b54700c><div class=\"suggestion-type-example\" data-v-6b54700c><span class=\"suggestion-type-badge title\" data-v-6b54700c>Title</span><span class=\"suggestion-type-desc\" data-v-6b54700c>Matches guide section titles</span></div><div class=\"suggestion-type-example\" data-v-6b54700c><span class=\"suggestion-type-badge content\" data-v-6b54700c>Content</span><span class=\"suggestion-type-desc\" data-v-6b54700c>Matches text within guide content</span></div></div></div><div class=\"help-section\" data-v-6b54700c><h4 class=\"help-section-title\" data-v-6b54700c><i class=\"bi bi-search me-2\" data-v-6b54700c></i> Search Tips </h4><ul class=\"help-list\" data-v-6b54700c><li data-v-6b54700c>Start typing any word to see matching suggestions</li><li data-v-6b54700c>Suggestions are case-insensitive</li><li data-v-6b54700c>Selecting a suggestion will automatically switch to that guide section</li><li data-v-6b54700c>Use the clear button (×) to reset your search</li></ul></div><div class=\"help-section\" data-v-6b54700c><h4 class=\"help-section-title\" data-v-6b54700c><i class=\"bi bi-info-circle me-2\" data-v-6b54700c></i> Example </h4><div class=\"help-example\" data-v-6b54700c><p class=\"help-text\" data-v-6b54700c> Try typing <strong data-v-6b54700c>&quot;prayer&quot;</strong> to see suggestions for prayer-related content, or <strong data-v-6b54700c>&quot;quran&quot;</strong> for Quran-related guides. </p></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    onClick: _cache[28] || (_cache[28] = $event => $setup.showHelpModal = false)
  }, " Got it! ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.card-teal[data-v-6b54700c] {\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 165, 0);\n  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);\n  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card-teal[data-v-6b54700c]:hover { \n  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12);\n}\n/* Base Styles */\n.guide-root[data-v-6b54700c] {\n  /* Darker teal improves contrast on white and as a filled background with white text */\n  --primary-color: #00695c;\n  --primary-hover: #00564c;\n  --teal-400: #2dd4bf;\n  --teal-500: #14b8a6;\n  --teal-600: #0d9488;\n  --teal-700: #0f766e;\n  --ring: rgba(20, 184, 166, 0.35);\n  --text-color: #333;\n  --text-light: #6c757d;\n  --bg-color: #fff;\n  --border-color: #e9ecef;\n  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n/* Typography */\nbody[data-v-6b54700c] {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n  color: var(--text-color);\n  line-height: 1.6;\n}\nh1[data-v-6b54700c], h2[data-v-6b54700c], h3[data-v-6b54700c], h4[data-v-6b54700c], h5[data-v-6b54700c], h6[data-v-6b54700c] {\n  font-weight: 700;\n  line-height: 1.3;\n}\n/* Header */\n.header-icon[data-v-6b54700c] {\n  font-size: 2.5rem;\n  color: var(--primary-color);\n}\n/* .header-title {\n  font-size: 2rem;\n  font-weight: 800;\n  color: var(--primary-color);\n  margin-bottom: 0.5rem;\n} */\n.header-description[data-v-6b54700c] {\n  font-size: 1.1rem;\n  /* Darker gray for AA contrast on light backgrounds */\n  color: #495057;\n  max-width: 600px;\n  margin: 0 auto;\n}\n/* Controls */\n.controls-section[data-v-6b54700c] {\n  background-color: rgba(0, 191, 166, 0.05);\n  border: 1px solid rgba(0, 191, 166, 0.18);\n  border-radius: 20px;\n  padding: 1.5rem;\n}\n.form-label[data-v-6b54700c] {\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  color: var(--text-color);\n}\n.form-select[data-v-6b54700c], .form-control[data-v-6b54700c] {\n  border-radius: 8px;\n  padding: 0.75rem;\n  border: 1px solid var(--border-color);\n  font-size: 1rem;\n}\n.form-select[data-v-6b54700c]:focus, .form-control[data-v-6b54700c]:focus {\n  border-color: var(--primary-color);\n  box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);\n}\n/* Premium dropdown and input visuals */\n.dropdown .form-select.dropdown-toggle[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: #fff;\n  border-radius: 20px;\n  border: 1px solid rgba(0, 191, 166, 0.18);\n  padding: 0.75rem 1rem;\n}\n.dropdown-menu[data-v-6b54700c] {\n  border-radius: 16px;\n  border: 1px solid rgba(0,0,0,0.04);\n  box-shadow: 0 16px 40px rgba(0,0,0,0.12);\n  overflow: hidden;\n}\n.dropdown-item[data-v-6b54700c] {\n  padding: 0.65rem 0.9rem;\n}\n.dropdown-item[data-v-6b54700c]:active, .dropdown-item[data-v-6b54700c]:hover {\n  background: rgba(20,184,166,0.08);\n}\n/* Search pill with inset glow */\n.search-pill[data-v-6b54700c] {\n  background: #fff;\n  border-radius: 999px;\n  border: 1px solid rgba(0, 191, 166, 0.18);\n  padding: 0.2rem 0.2rem 0.2rem 0.6rem;\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.06);\n}\n.search-input[data-v-6b54700c] {\n  border: none !important;\n  background: transparent !important;\n  border-radius: 999px !important;\n  padding-left: 0.2rem;\n}\n.search-input[data-v-6b54700c]:focus { box-shadow: none !important;\n}\n.search-pill[data-v-6b54700c]:focus-within { outline: none; box-shadow: inset 0 0 0 1px rgba(20,184,166,0.35), 0 0 0 4px rgba(20,184,166,0.18);\n}\n.btn-clear[data-v-6b54700c] { border: 0; background: transparent; color: var(--primary-color); border-radius: 999px;\n}\n.btn-clear[data-v-6b54700c]:hover { background: rgba(20,184,166,0.08);\n}\n/* Content Card */\n.content-card[data-v-6b54700c] {\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--card-shadow);\n  overflow: hidden;\n  transition: transform 0.3s;\n}\n.content-card[data-v-6b54700c]:hover {\n  transform: translateY(-3px);\n}\n.content-title[data-v-6b54700c] {\n  font-size: 1.5rem;\n  margin-bottom: 0.5rem;\n}\n.content-text[data-v-6b54700c] {\n  font-size: 1.1rem;\n  line-height: 1.8;\n}\n.highlight-word[data-v-6b54700c] {\n  background-color: var(--primary-color);\n  color: white;\n  padding: 0.1em 0.3em;\n  border-radius: 0.2em;\n}\nmark[data-v-6b54700c] {\n  background-color: #fff3a3;\n  padding: 0.1em 0.3em;\n  border-radius: 0.2em;\n}\n/* Buttons */\n.btn[data-v-6b54700c] {\n  font-weight: 500;\n  transition: all 0.2s;\n  border-radius: 8px;\n}\n/* Premium buttons and outlines (consistent pill aesthetic) */\n.btn.btn-premium[data-v-6b54700c] {\n  background-image: linear-gradient(135deg, var(--teal-500), var(--teal-700));\n  color: #fff;\n  border: none;\n  border-radius: 24px;\n  min-height: 38px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .4rem;\n  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;\n}\n/* Toolbar layout: compact on mobile, spaced on desktop */\n.toolbar[data-v-6b54700c] {\n  background: #fff;\n  padding: 0.4rem;\n}\n.toolbar .btn[data-v-6b54700c] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.toolbar .toolbar-icon[data-v-6b54700c] { font-size: 1rem;\n}\n.toolbar .toolbar-label[data-v-6b54700c] { font-weight: 500;\n}\n@media (max-width: 576px) {\n.toolbar[data-v-6b54700c] { padding: 0.25rem;\n}\n.toolbar .toolbar-label[data-v-6b54700c] { display: none;\n}\n.toolbar .toolbar-icon[data-v-6b54700c] { font-size: 1.05rem;\n}\n}\n/* Segmented toolbar variant */\n.toolbar-segmented[data-v-6b54700c] { border-radius: 999px; overflow: hidden; padding: 0.2rem;\n}\n.toolbar-segmented .btn[data-v-6b54700c] {\n  border-radius: 0;\n  border: 0 !important;\n  padding: 0.35rem 0.7rem;\n}\n.toolbar-segmented .btn[data-v-6b54700c]:first-child { border-top-left-radius: 999px; border-bottom-left-radius: 999px;\n}\n.toolbar-segmented .btn[data-v-6b54700c]:last-child { border-top-right-radius: 999px; border-bottom-right-radius: 999px;\n}\n.toolbar-segmented .btn.btn-premium-outline[data-v-6b54700c] { border: 1px solid rgba(20,184,166,0.26) !important;\n}\n.toolbar-segmented .btn + .btn[data-v-6b54700c] { margin-left: 0;\n}\n.btn.btn-premium[data-v-6b54700c]:hover { filter: brightness(1.03); transform: translateY(-1px); box-shadow: 0 10px 22px rgba(17, 94, 89, 0.28);\n}\n.btn.btn-premium[data-v-6b54700c]:active { transform: translateY(0);\n}\n.btn.btn-premium-outline[data-v-6b54700c] {\n  background: #fff;\n  color: var(--teal-700);\n  border-radius: 24px;\n  border: 2px solid var(--teal-500);\n  padding: 0.45rem 0.9rem;\n  min-height: 38px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .4rem;\n  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;\n}\n.btn.btn-premium-outline[data-v-6b54700c]:hover { background: rgba(20,184,166,.06); box-shadow: 0 6px 14px rgba(17,94,89,.16);\n}\n.btn.btn-premium-outline[data-v-6b54700c]:active { background: rgba(20,184,166,.12);\n}\n.btn-outline-primary[data-v-6b54700c] {\n  color: var(--primary-color) !important;\n  border-color: var(--primary-color) !important;\n}\n.btn-outline-primary[data-v-6b54700c]:hover,\n.btn-outline-primary[data-v-6b54700c]:focus {\n  background-color: var(--primary-color) !important;\n  color: #fff !important;\n}\n/* Success outline buttons: use darker green for contrast */\n.btn-outline-success[data-v-6b54700c] {\n  color: #1e7e34;\n  border-color: #1e7e34;\n}\n.btn-outline-success[data-v-6b54700c]:hover {\n  background-color: #1e7e34;\n  color: #fff;\n}\n/* Modern Audio Player Styles */\n.modern-audio-player[data-v-6b54700c],\n.modern-audio-player.w-100[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: #232323;\n  color: #fff;\n  border-radius: 0;\n  box-shadow: 0 4px 32px rgba(0,0,0,0.18);\n  padding: 1rem 1.5rem;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  transform: none;\n  width: 100vw;\n  max-width: 100vw;\n  z-index: 2000;\n}\n.audio-meta[data-v-6b54700c] {\n  min-width: 160px;\n  flex: 1 1 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.audio-title[data-v-6b54700c] {\n  font-weight: 700;\n  font-size: 1.15rem;\n  color: #fff;\n  margin-bottom: 0.1rem;\n}\n.small-title[data-v-6b54700c] {\n  font-size: 1rem;\n  text-align: left;\n}\n.audio-meta.text-start[data-v-6b54700c] {\n  text-align: left;\n}\n.audio-subtitle[data-v-6b54700c] {\n  font-size: 0.95rem;\n  color: #bdbdbd;\n  font-weight: 400;\n}\n.audio-controls[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  justify-content: center;\n}\n.audio-btn[data-v-6b54700c] {\n  background: none;\n  border: none;\n  color: #fff;\n  font-size: 1.6rem;\n  padding: 0.5rem 0.7rem;\n  border-radius: 50%;\n  transition: background 0.2s, color 0.2s, transform 0.1s;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.audio-btn[data-v-6b54700c]:hover, .audio-btn[data-v-6b54700c]:focus {\n  background: rgba(0, 105, 92, 0.12);\n  color: var(--primary-color);\n  outline: none;\n  transform: scale(1.08);\n}\n.close-btn[data-v-6b54700c] {\n  margin-left: 0.7rem;\n  font-size: 1.3rem;\n  background: none;\n  color: #bdbdbd;\n}\n.close-btn[data-v-6b54700c]:hover {\n  color: #ff4d4f;\n  background: rgba(255,77,79,0.08);\n}\n.audio-progress-wrap[data-v-6b54700c] {\n  flex: 3 1 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 180px;\n  margin: 0 1.2rem;\n}\n.audio-progress-bar[data-v-6b54700c] {\n  width: 100%;\n  height: 4px;\n  background: #444;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative;\n}\n.audio-progress[data-v-6b54700c] {\n  height: 100%;\n  background: var(--primary-color);\n  border-radius: 2px;\n  transition: width 0.05s linear;\n  will-change: width;\n}\n.audio-right[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  min-width: 180px;\n  flex: 1 1 0;\n  justify-content: flex-end;\n}\n.volume-icon[data-v-6b54700c] {\n  font-size: 1.3rem;\n  color: #bdbdbd;\n}\n.audio-volume-slider[data-v-6b54700c] {\n  width: 120px;\n  accent-color: var(--primary-color);\n  background: transparent;\n  margin: 0 0.5rem;\n  height: 4px;\n}\n.audio-volume-slider[data-v-6b54700c]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #0b5d4b;\n  border: 2px solid #fff;\n  box-shadow: 0 2px 8px rgba(0,191,166,0.18);\n  cursor: pointer;\n}\n.audio-volume-slider[data-v-6b54700c]::-moz-range-thumb {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #0b5d4b;\n  border: 2px solid #fff;\n  box-shadow: 0 2px 8px rgba(0,191,166,0.18);\n  cursor: pointer;\n}\n.audio-volume-slider[data-v-6b54700c]:focus {\n  outline: none;\n}\n/* Transitions */\n.global-audio-player-enter-active[data-v-6b54700c],\n.global-audio-player-leave-active[data-v-6b54700c] {\n  transition: all 0.3s ease;\n}\n.global-audio-player-enter-from[data-v-6b54700c],\n.global-audio-player-leave-to[data-v-6b54700c] {\n  opacity: 0;\n  transform: translateX(-50%) translateY(100%);\n}\n.modern-audio-player.w-100[data-v-6b54700c] {\n  width: 100vw;\n  left: 0;\n  transform: none;\n  border-radius: 0;\n}\n/* Responsive Adjustments */\n@media (max-width: 768px) {\n.container[data-v-6b54700c] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n}\n.header-title[data-v-6b54700c] {\n    font-size: 1.75rem;\n}\n.header-description[data-v-6b54700c] {\n  font-size: 1rem;\n}\n.global-audio-player[data-v-6b54700c] {\n    flex-direction: column;\n    padding: 1rem;\n    width: 100%;\n    border-radius: 0;\n    bottom: 0;\n}\n.player-desktop[data-v-6b54700c] {\n    display: none;\n}\n.player-mobile[data-v-6b54700c] {\n    display: flex;\n}\n.player-section[data-v-6b54700c] {\n    width: 100%;\n    margin-bottom: 0.5rem;\n}\n.player-info[data-v-6b54700c], .player-volume[data-v-6b54700c] {\n    min-width: auto;\n}\n.progress-bar-container[data-v-6b54700c] {\n    max-width: 100%;\n}\n.volume-slider[data-v-6b54700c] {\n    width: 60px;\n}\n}\n@media (max-width: 576px) {\n.header-title[data-v-6b54700c] {\n    font-size: 1.5rem;\n}\n.content-title[data-v-6b54700c] {\n    font-size: 1.3rem;\n}\n.content-text[data-v-6b54700c] {\n    font-size: 1rem;\n}\n.controls-section[data-v-6b54700c] {\n    padding: 1.2rem;\n}\n.btn[data-v-6b54700c] {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.9rem;\n}\n}\n/* Ensure content not hidden behind fixed audio bar */\n.pad-for-audio[data-v-6b54700c] {\n  padding-bottom: 110px; /* approximate player height */\n}\n@media (max-width: 768px) {\n.pad-for-audio[data-v-6b54700c] { padding-bottom: 140px;\n}\n}\n@media (max-width: 900px) {\n.modern-audio-player[data-v-6b54700c] {\n    flex-wrap: wrap;\n    gap: 1rem;\n    padding: 0.7rem 0.5rem;\n    width: 100vw;\n    left: 0;\n    border-radius: 0;\n}\n.audio-meta[data-v-6b54700c], .audio-right[data-v-6b54700c] {\n    min-width: 120px;\n}\n.audio-progress-wrap[data-v-6b54700c] {\n    min-width: 120px;\n    margin: 0 0.5rem;\n}\n}\n@media (min-width: 601px) {\n.audio-player-row.bottom[data-v-6b54700c] {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    justify-content: space-between;\n    \n    flex-wrap: nowrap;\n    /* Prevent overlap */\n}\n.audio-player-row.bottom[data-v-6b54700c] > * {\n    min-width: 0;\n}\n.audio-progress-wrap[data-v-6b54700c] {\n    order: 3;\n    margin: 0 1.2rem;\n    flex: 3 1 0;\n    min-width: 120px;\n    flex-shrink: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.audio-right[data-v-6b54700c] {\n    order: 4;\n    \n    min-width: 140px;\n    flex: 1 1 0;\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n}\n.audio-progress-bar[data-v-6b54700c] {\n    overflow: hidden;\n}\n}\n@media (max-width: 600px) {\n.modern-audio-player[data-v-6b54700c] {\n    flex-direction: column;\n    align-items: stretch;\n    border-radius: 0;\n    left: 0;\n    transform: none;\n    width: 100vw;\n    max-width: 100vw;\n    padding: 0.2rem 0.05rem;\n    border-radius: 0;\n}\n.audio-player-row.top[data-v-6b54700c], .audio-meta[data-v-6b54700c], .audio-title[data-v-6b54700c], .audio-subtitle[data-v-6b54700c] {\n    display: none !important;\n}\n.audio-player-row.bottom[data-v-6b54700c] {\n    display: flex !important;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    justify-content: space-between;\n    \n    flex-wrap: nowrap;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n.audio-player-row.bottom[data-v-6b54700c] > * {\n    min-width: 0;\n}\n.audio-controls[data-v-6b54700c] {\n    order: 1;\n    \n    margin: 0;\n    font-size: 0.95rem;\n    flex: 0 0 auto;\n    display: flex;\n    align-items: center;\n}\n.audio-btn[data-v-6b54700c] {\n    font-size: 0.95rem;\n    padding: 0.18rem 0.22rem;\n}\n.audio-progress-wrap[data-v-6b54700c] {\n    order: 2;\n    margin: 0 0.1rem;\n    flex: 2 1 0;\n    min-width: 0;\n    display: flex;\n    align-items: center;\n}\n.audio-progress-bar[data-v-6b54700c] {\n    height: 3px;\n}\n.audio-right[data-v-6b54700c] {\n    order: 3;\n    \n    min-width: 0;\n    flex: 0 0 auto;\n    font-size: 0.85rem;\n    display: flex;\n    align-items: center;\n}\n.audio-volume-slider[data-v-6b54700c] {\n    width: 60px;\n    height: 2.5px;\n}\n.close-btn[data-v-6b54700c] {\n    font-size: 0.95rem;\n    margin-left: 0.18rem;\n}\n.volume-icon[data-v-6b54700c] {\n    font-size: 0.95rem;\n}\n}\n/* Badge Styles */\n.badge[data-v-6b54700c] {\n  font-weight: 600;\n  padding: 0.5rem 0.75rem;\n  border-radius: 20px;\n  font-size: 0.85rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border: 1px solid transparent;\n  transition: all 0.3s ease;\n}\n.badge[data-v-6b54700c]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n/* Custom Badge Color Schemes */\n.badge.bg-primary[data-v-6b54700c] {\n  background: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%) !important;\n  color: white !important;\n  border-color: #228B22;\n}\n.badge.bg-success[data-v-6b54700c] {\n  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;\n  color: white !important;\n  border-color: #11998e;\n}\n.badge.bg-info[data-v-6b54700c] {\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;\n  color: white !important;\n  border-color: #4facfe;\n}\n.badge.bg-warning[data-v-6b54700c] {\n  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%) !important;\n  color: white !important;\n  border-color: #fa709a;\n}\n.badge.bg-secondary[data-v-6b54700c] {\n  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%) !important;\n  color: #333 !important;\n  border-color: #a8edea;\n}\n.badge.bg-danger[data-v-6b54700c] {\n  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%) !important;\n  color: white !important;\n  border-color: #ff9a9e;\n}\n.badge.bg-dark[data-v-6b54700c] {\n  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;\n  color: white !important;\n  border-color: #2c3e50;\n}\n/* Responsive Badge Adjustments */\n@media (max-width: 768px) {\n.badge[data-v-6b54700c] {\n    font-size: 0.75rem;\n    padding: 0.4rem 0.6rem;\n}\n}\n@media (max-width: 576px) {\n.badge[data-v-6b54700c] {\n    font-size: 0.7rem;\n    padding: 0.35rem 0.5rem;\n}\n}\n/* Dropdown Styles */\n.dropdown-menu[data-v-6b54700c] {\n  max-height: 400px;\n  overflow-y: auto;\n  border: 1px solid #e9ecef;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n}\n.dropdown-item[data-v-6b54700c] {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f8f9fa;\n  transition: all 0.2s ease;\n}\n.dropdown-item[data-v-6b54700c]:hover {\n  background-color: #f8f9fa;\n  transform: translateX(2px);\n}\n.dropdown-item[data-v-6b54700c]:last-child {\n  border-bottom: none;\n}\n.guide-title[data-v-6b54700c] {\n  font-weight: 500;\n  color: #333;\n  flex: 1;\n  margin-right: 0.5rem;\n}\n.dropdown-item .badge[data-v-6b54700c] {\n  font-size: 0.7rem;\n  padding: 0.25rem 0.5rem;\n  flex-shrink: 0;\n}\n/* Custom Scrollbar for Dropdown */\n.dropdown-menu[data-v-6b54700c]::-webkit-scrollbar {\n  width: 6px;\n}\n.dropdown-menu[data-v-6b54700c]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\n.dropdown-menu[data-v-6b54700c]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.dropdown-menu[data-v-6b54700c]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n/* Category Filter Styles */\n.category-filters[data-v-6b54700c] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.category-filters .btn[data-v-6b54700c] {\n  border-radius: 20px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n.category-filters .btn[data-v-6b54700c]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.category-filters .btn-primary[data-v-6b54700c] {\n  background: var(--primary-color);\n  border-color: var(--primary-color);\n  color: #fff;\n}\n.category-filters .btn-outline-primary[data-v-6b54700c] {\n  color: var(--primary-color);\n  border-color: var(--primary-color);\n  background: transparent;\n}\n.category-filters .btn-outline-primary[data-v-6b54700c]:hover {\n  background: var(--primary-color);\n  color: #fff;\n  border-color: var(--primary-color);\n}\n.category-filters .badge[data-v-6b54700c] {\n  font-size: 0.6rem;\n  padding: 0.2rem 0.4rem;\n  border-radius: 10px;\n}\n/* Responsive adjustments for category filters */\n@media (max-width: 768px) {\n.category-filters[data-v-6b54700c] {\n    gap: 0.3rem;\n}\n.category-filters .btn[data-v-6b54700c] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.6rem;\n}\n.category-filters .badge[data-v-6b54700c] {\n    font-size: 0.5rem;\n    padding: 0.15rem 0.3rem;\n}\n}\n/* Animations */\n.fade-slide-enter-active[data-v-6b54700c], .fade-slide-leave-active[data-v-6b54700c] {\n  transition: opacity 0.5s, transform 0.5s;\n}\n.fade-slide-enter-from[data-v-6b54700c], .fade-slide-leave-to[data-v-6b54700c] {\n  opacity: 0;\n  transform: translateY(20px);\n}\n.fade-slide-enter-to[data-v-6b54700c], .fade-slide-leave-from[data-v-6b54700c] {\n  opacity: 1;\n  transform: translateY(0);\n}\n.fade-scale-enter-active[data-v-6b54700c], .fade-scale-leave-active[data-v-6b54700c] {\n  transition: opacity 0.4s, transform 0.4s;\n}\n.fade-scale-enter-from[data-v-6b54700c], .fade-scale-leave-to[data-v-6b54700c] {\n  opacity: 0;\n  transform: scale(0.95);\n}\n.fade-scale-enter-to[data-v-6b54700c], .fade-scale-leave-from[data-v-6b54700c] {\n  opacity: 1;\n  transform: scale(1);\n}\n.stagger-fade-enter-active[data-v-6b54700c] {\n  transition: all 0.5s;\n  transition-delay: var(--stagger-delay, 0ms);\n}\n.stagger-fade-enter-from[data-v-6b54700c] {\n  opacity: 0;\n  transform: translateY(20px);\n}\n.stagger-fade-enter-to[data-v-6b54700c] {\n  opacity: 1;\n  transform: translateY(0);\n}\n.stagger-fade-leave-active[data-v-6b54700c] {\n  transition: opacity 0.3s;\n}\n.stagger-fade-leave-to[data-v-6b54700c] {\n  opacity: 0;\n}\n/* Progress Tracker Styles */\n.progress-tracker-container[data-v-6b54700c] {\n  position: relative;\n  margin-bottom: 0.5rem;\n  width: 100%;\n}\n.progress-bar[data-v-6b54700c] {\n  height: 6px;\n  border-radius: 3px;\n  background: #e0e0e0;\n  position: relative;\n  margin-bottom: 2px;\n  transition: width 0.1s linear;\n  will-change: width;\n}\n.progress-bar.reading-progress[data-v-6b54700c] {\n  background: linear-gradient(90deg, var(--primary-color) 0%, #38ef7d 100%);\n  z-index: 1;\n}\n.progress-bar.audio-progress[data-v-6b54700c] {\n  background: linear-gradient(90deg, #228B22 0%, #1a6b1a 100%);\n  margin-top: -6px;\n  opacity: 0.85;\n  z-index: 2;\n}\n.progress-labels[data-v-6b54700c] {\n  font-size: 0.85rem;\n  /* Increase contrast for accessibility (WCAG 2.0 AA) */\n  color: #666;\n  margin-top: 2px;\n}\n.autocomplete-suggestions[data-v-6b54700c] {\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n  width: 100%;\n  margin-top: 0.2rem;\n  list-style: none;\n  padding: 0;\n  max-height: 260px;\n  overflow-y: auto;\n}\n.autocomplete-suggestions li[data-v-6b54700c] {\n  padding: 0.7rem 1rem;\n  cursor: pointer;\n  transition: background 0.2s;\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n.autocomplete-suggestions li.highlighted[data-v-6b54700c],\n.autocomplete-suggestions li[data-v-6b54700c]:hover {\n  background: #f8f9fa;\n}\n.suggestion-type[data-v-6b54700c] {\n  font-size: 0.75rem;\n  /* Improve contrast on light tag background */\n  color: #666;\n  margin-left: 0.5rem;\n  background: #f1f1f1;\n  border-radius: 8px;\n  padding: 0.1rem 0.5rem;\n}\n@media (max-width: 768px) {\n.autocomplete-suggestions li[data-v-6b54700c] {\n    padding: 0.5rem 0.7rem;\n    font-size: 0.95rem;\n}\n}\n/* Help Modal Styles */\n.modal-overlay[data-v-6b54700c] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  padding: 1rem;\n}\n.help-modal[data-v-6b54700c] {\n  background: white;\n  border-radius: 20px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);\n  max-width: 600px;\n  width: 100%;\n  max-height: 90vh;\n  overflow-y: auto;\n  animation: modalSlideIn-6b54700c 0.3s ease-out;\n}\n/* Glassy badges with stronger contrast */\n.badge-glass[data-v-6b54700c] {\n  backdrop-filter: saturate(1.15) blur(4px);\n  -webkit-backdrop-filter: saturate(1.15) blur(4px);\n  border-radius: 999px;\n  padding: 0.25rem 0.7rem;\n  font-weight: 600;\n  letter-spacing: .2px;\n}\n.badge-glass.bg-primary[data-v-6b54700c] { background: rgba(13,110,253,0.12); color: #0d6efd; border: 1px solid rgba(13,110,253,0.35);\n}\n.badge-glass.bg-success[data-v-6b54700c] { background: rgba(25,135,84,0.12); color: #198754; border: 1px solid rgba(25,135,84,0.35);\n}\n.badge-glass.bg-info[data-v-6b54700c] { background: rgba(13,202,240,0.14); color: #0ca7c7; border: 1px solid rgba(13,202,240,0.38);\n}\n.badge-glass.bg-warning[data-v-6b54700c] { background: rgba(255,193,7,0.16); color: #a87300; border: 1px solid rgba(255,193,7,0.38);\n}\n.badge-glass.bg-secondary[data-v-6b54700c] { background: rgba(108,117,125,0.14); color: #5c636a; border: 1px solid rgba(108,117,125,0.35);\n}\n.badge-glass.bg-danger[data-v-6b54700c] { background: rgba(220,53,69,0.12); color: #c02e3f; border: 1px solid rgba(220,53,69,0.35);\n}\n.badge-glass.bg-dark[data-v-6b54700c] { background: rgba(33,37,41,0.14); color: #212529; border: 1px solid rgba(33,37,41,0.35);\n}\n@keyframes modalSlideIn-6b54700c {\nfrom {\n    opacity: 0;\n    transform: translateY(-20px) scale(0.95);\n}\nto {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n}\n}\n.help-modal-header[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem 1.5rem 1rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.help-modal-title[data-v-6b54700c] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--primary-color);\n}\n.help-modal-close[data-v-6b54700c] {\n  background: none;\n  border: none;\n  font-size: 1.25rem;\n  color: #6c757d;\n  cursor: pointer;\n  padding: 0.25rem;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.help-modal-close[data-v-6b54700c]:hover {\n  background: #f8f9fa;\n  color: #333;\n}\n.help-modal-body[data-v-6b54700c] {\n  padding: 1.5rem;\n}\n.help-section[data-v-6b54700c] {\n  margin-bottom: 2rem;\n}\n.help-section[data-v-6b54700c]:last-child {\n  margin-bottom: 0;\n}\n.help-section-title[data-v-6b54700c] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.75rem;\n  display: flex;\n  align-items: center;\n}\n.help-text[data-v-6b54700c] {\n  color: #666;\n  line-height: 1.6;\n  margin-bottom: 0;\n}\n.help-shortcuts[data-v-6b54700c] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.shortcut-item[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem;\n  background: #f8f9fa;\n  border-radius: 6px;\n}\n.shortcut-item kbd[data-v-6b54700c] {\n  background: #333;\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  font-size: 0.85rem;\n  font-family: monospace;\n  min-width: 2rem;\n  text-align: center;\n}\n.help-list[data-v-6b54700c] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.help-list li[data-v-6b54700c] {\n  padding: 0.5rem 0;\n  color: #666;\n  position: relative;\n  padding-left: 1.5rem;\n}\n.help-list li[data-v-6b54700c]::before {\n  content: \"•\";\n  color: var(--primary-color);\n  font-weight: bold;\n  position: absolute;\n  left: 0;\n}\n.suggestion-types[data-v-6b54700c] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.suggestion-type-example[data-v-6b54700c] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n}\n.suggestion-type-badge[data-v-6b54700c] {\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.suggestion-type-badge.title[data-v-6b54700c] {\n  background: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%);\n  color: white;\n}\n.suggestion-type-badge.content[data-v-6b54700c] {\n  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);\n  color: white;\n}\n.suggestion-type-desc[data-v-6b54700c] {\n  color: #666;\n  font-size: 0.9rem;\n}\n.help-example[data-v-6b54700c] {\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  padding: 1rem;\n  border-radius: 8px;\n  border-left: 4px solid var(--primary-color);\n}\n.help-modal-footer[data-v-6b54700c] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e9ecef;\n  display: flex;\n  justify-content: flex-end;\n}\n/* Responsive Help Modal */\n@media (max-width: 768px) {\n.help-modal[data-v-6b54700c] {\n    margin: 1rem;\n    max-height: calc(100vh - 2rem);\n}\n.help-modal-header[data-v-6b54700c] {\n    padding: 1rem 1rem 0.75rem;\n}\n.help-modal-title[data-v-6b54700c] {\n    font-size: 1.1rem;\n}\n.help-modal-body[data-v-6b54700c] {\n    padding: 1rem;\n}\n.help-section[data-v-6b54700c] {\n    margin-bottom: 1.5rem;\n}\n.help-section-title[data-v-6b54700c] {\n    font-size: 1rem;\n}\n.shortcut-item[data-v-6b54700c] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.suggestion-type-example[data-v-6b54700c] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n}\n@media (max-width: 576px) {\n.modal-overlay[data-v-6b54700c] {\n    padding: 0.5rem;\n}\n.help-modal[data-v-6b54700c] {\n    margin: 0.5rem;\n}\n.help-modal-header[data-v-6b54700c] {\n    padding: 0.75rem 0.75rem 0.5rem;\n}\n.help-modal-body[data-v-6b54700c] {\n    padding: 0.75rem;\n}\n.help-modal-footer[data-v-6b54700c] {\n    padding: 0.75rem;\n}\n}\n/* AI Summary Styles */\n.ai-summary-section[data-v-6b54700c] {\n  border-top: 2px solid #e9ecef;\n  padding-top: 1.5rem;\n}\n.summary-header[data-v-6b54700c] {\n  border-bottom: 1px solid #f8f9fa;\n  padding-bottom: 0.75rem;\n}\n.summary-title[data-v-6b54700c] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #333;\n  display: flex;\n  align-items: center;\n}\n.summary-content[data-v-6b54700c] {\n  animation: fadeInUp-6b54700c 0.4s ease-out;\n}\n@keyframes fadeInUp-6b54700c {\nfrom {\n    opacity: 0;\n    transform: translateY(10px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.summary-card[data-v-6b54700c] {\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border: 2px solid rgb(103, 153, 103);\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.summary-text[data-v-6b54700c] {\n  font-size: 1rem;\n  line-height: 1.7;\n  color: #333;\n  margin-bottom: 0;\n}\n.summary-text p[data-v-6b54700c] {\n  margin-bottom: 1rem;\n}\n.summary-text p[data-v-6b54700c]:last-child {\n  margin-bottom: 0;\n}\n.summary-text strong[data-v-6b54700c] {\n  color: var(--primary-color);\n  font-weight: 600;\n}\n.summary-footer[data-v-6b54700c] {\n  font-size: 0.85rem;\n  color: #6c757d;\n  border-top: 1px solid #dee2e6;\n}\n.summary-footer i[data-v-6b54700c] {\n  color: var(--primary-color);\n}\n/* Loading animation for summary button */\n.btn-outline-info[data-v-6b54700c]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.btn-outline-info:disabled i[data-v-6b54700c] {\n  animation: spin-6b54700c 1s linear infinite;\n}\n@keyframes spin-6b54700c {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n/* Responsive AI Summary */\n@media (max-width: 768px) {\n.ai-summary-section[data-v-6b54700c] {\n    padding-top: 1rem;\n}\n.summary-card[data-v-6b54700c] {\n    padding: 1rem;\n}\n.summary-title[data-v-6b54700c] {\n    font-size: 1.1rem;\n}\n.summary-text[data-v-6b54700c] {\n    font-size: 0.95rem;\n}\n}\n@media (max-width: 576px) {\n.summary-header[data-v-6b54700c] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.summary-card[data-v-6b54700c] {\n    padding: 0.75rem;\n}\n.summary-text[data-v-6b54700c] {\n    font-size: 0.9rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_style_index_0_id_6b54700c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_style_index_0_id_6b54700c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_style_index_0_id_6b54700c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/GuideComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/GuideComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GuideComponent_vue_vue_type_template_id_6b54700c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true */ "./resources/js/components/GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true");
/* harmony import */ var _GuideComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuideComponent.vue?vue&type=script&lang=js */ "./resources/js/components/GuideComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _GuideComponent_vue_vue_type_style_index_0_id_6b54700c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css */ "./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_GuideComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_GuideComponent_vue_vue_type_template_id_6b54700c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-6b54700c"],['__file',"resources/js/components/GuideComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/GuideComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/GuideComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GuideComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_style_index_0_id_6b54700c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=style&index=0&id=6b54700c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_template_id_6b54700c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GuideComponent_vue_vue_type_template_id_6b54700c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/GuideComponent.vue?vue&type=template&id=6b54700c&scoped=true");


/***/ }),

/***/ "./resources/js/guides.json":
/*!**********************************!*\
  !*** ./resources/js/guides.json ***!
  \**********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"sections":[{"title":"Islamic Perspective on Wealth and Charity","content":"Islam views wealth as a trust from Allah and emphasizes moderation in its use. Zakat (obligatory charity) and Sadaqah (voluntary charity) are means to purify wealth and assist the needy. The Quran encourages generosity and condemns hoarding and exploitation. These acts of charity purify one\'s wealth and serve as a way to build a just and compassionate society. Islamic teachings promote economic justice by addressing inequality and ensuring the redistribution of wealth.\\n\\nIn Islamic finance, earning through interest (Riba) is prohibited, and instead, risk-sharing financial models are encouraged. Investments must be ethical and in line with Islamic values, ensuring that wealth circulates fairly in society. This approach fosters a more equitable system where all members of society have the opportunity to thrive.","tags":["Finance","Social Justice","Law","General"],"primaryType":"Finance"},{"title":"Islamic Education and Knowledge","content":"Seeking knowledge is a duty upon every Muslim, as emphasized by the Quran and Hadith. Islamic education encompasses both religious and worldly sciences, aiming to build a balanced character and a society rooted in faith and ethics. The pursuit of knowledge is not limited to religious matters but extends to fields like medicine, astronomy, and law, all of which contribute to societal well-being.\\n\\nHistorically, institutions like Al-Azhar and the Bayt al-Hikma (House of Wisdom) played pivotal roles in advancing knowledge across various disciplines. These institutions were the centers of learning where scholars from all over the world contributed to the intellectual and scientific progress of the time, promoting a harmonious blend of faith and reason."},{"title":"Prophets in Islam: Roles and Missions","content":"Prophets in Islam were chosen to guide humanity and deliver Allah\'s message. Muslims believe in all the prophets from Adam to Muhammad (PBUH), who is considered the final prophet. Their core message was Tawhid — the belief in and worship of Allah alone. The stories of the prophets in the Quran are not merely historical accounts but lessons for the believers, meant to guide them in their moral and spiritual journey.\\n\\nThe Quran recounts their struggles, lessons, and miracles, which serve as a means to inspire faith, morality, and perseverance among believers. Each prophet faced unique challenges, yet all were chosen to lead their communities toward righteousness, emphasizing compassion, justice, and the worship of Allah."},{"title":"Halal and Haram in Islam","content":"Halal (permissible) and Haram (forbidden) form the foundation of Islamic dietary and ethical guidelines. Foods like pork and alcohol are Haram, while Halal foods, such as meat, must be slaughtered according to Islamic rites. These dietary laws are part of a larger ethical framework that guides all aspects of a Muslim\'s life.\\n\\nThe principles of Halal and Haram extend beyond food to business practices, prohibiting interest (Riba), deceit, and dishonesty in trade. These rules aim to maintain spiritual purity and societal well-being, ensuring that Muslims live in harmony with the values of justice, fairness, and accountability."},{"title":"Islamic Family Law: Rights and Responsibilities","content":"Islamic family law emphasizes justice, compassion, and mutual rights. Marriage in Islam is seen as a sacred contract (Nikah) requiring mutual consent and the establishment of a fair and respectful relationship. Both spouses have rights and responsibilities, and their roles within the marriage are designed to ensure harmony and cooperation.\\n\\nThe Quran provides clear guidance on issues such as inheritance, ensuring that wealth is distributed equitably among family members. While divorce is discouraged, it is permitted under certain circumstances with guidelines to ensure fairness and dignity for both parties. The legal framework surrounding family life in Islam is designed to promote strong, loving relationships based on mutual respect and responsibility."},{"title":"Angels in Islam: Beliefs and Functions","content":"In Islam, angels are created from light and serve Allah\'s commands without free will. They perform a variety of tasks, including delivering revelations to the prophets, maintaining the natural order, and recording the deeds of human beings. Among the most well-known angels are Jibril (Gabriel), who delivered the revelations to the prophets, and Mikail (Michael), who is responsible for providing sustenance to the creatures of the world.\\n\\nThe belief in angels reinforces the concept of accountability in Islam. Angels are assigned to record the actions of every individual, and these records will be used on the Day of Judgment. Their roles remind Muslims to remain mindful of their actions and to strive toward righteousness in their daily lives."},{"title":"Islamic Calendar and Festivals","content":"The Islamic (Hijri) calendar is lunar, beginning from the migration (Hijra) of Prophet Muhammad (PBUH) to Medina. This calendar marks the passage of time in a way that connects the Muslim community to the key events in Islamic history. Significant months in the Islamic calendar include Ramadan, the month of fasting, and Dhul-Hijjah, during which the annual pilgrimage (Hajj) takes place.\\n\\nThe Islamic festivals of Eid al-Fitr, which celebrates the end of Ramadan, and Eid al-Adha, which commemorates the willingness of Prophet Ibrahim (AS) to sacrifice his son, are key moments of joy, reflection, and community for Muslims. These festivals not only strengthen spiritual bonds but also foster unity among Muslims around the world."},{"title":"Islamic Philosophy and Theology","content":"Islamic philosophy blends reason and revelation, with scholars such as Al-Farabi, Ibn Sina, and Al-Ghazali exploring complex issues related to metaphysics, ethics, and epistemology. Their work represents an intellectual tradition that seeks to reconcile rational inquiry with faith, emphasizing the importance of knowledge in understanding both the natural and spiritual worlds.\\n\\nKalam (Islamic theology) addresses profound theological questions such as divine attributes, the nature of free will, and the concept of predestination. Different theological schools, including the Ash\'ari and Maturidi schools, offer varying perspectives on these matters, contributing to the rich diversity of thought within Islamic intellectual history."},{"title":"Social Justice in Islam","content":"Social justice is a cornerstone of Islamic teachings, promoting fairness, dignity, and respect for all individuals. The Quran calls for the protection of orphans, the poor, and marginalized groups, urging society to support those in need. This emphasis on social justice is reflected in various aspects of Islamic law and ethics, including the prohibition of economic exploitation, such as interest-based transactions (Riba) and deceitful business practices.\\n\\nThe goal of these teachings is to ensure a just and equitable society where everyone has the opportunity to thrive. Islam teaches that wealth is a trust from Allah and should be used for the welfare of others, creating a society based on mutual support and shared responsibility."},{"title":"Islam and Environmental Stewardship","content":"Islam encourages environmental stewardship through the concepts of Khalifah (stewardship) and Amanah (trust). These concepts emphasize the role of humans as caretakers of the Earth, entrusted by Allah with the responsibility to protect and preserve the natural world. The Quran advocates for sustainable resource use and condemns wastefulness (Israf), urging believers to live in harmony with nature.\\n\\nIslamic teachings also promote specific environmental actions, such as planting trees, conserving water, and treating animals with kindness and respect. These acts are viewed as forms of worship, and Muslims are reminded of their accountability in preserving the planet for future generations. The concept of Mizan (balance) underscores the need for fairness and justice in humanity\'s relationship with nature, ensuring its preservation for the benefit of all."},{"title":"The Concept of Justice in Islam","content":"Justice is a fundamental principle in Islam, which stresses the importance of fairness, equality, and impartiality. The Quran frequently calls for the establishment of justice in all aspects of life, whether in personal relationships, community affairs, or dealings with others. In Islam, justice is not limited to human relations but extends to the environment, animals, and all creation, underlining the sanctity of the world as a whole.\\n\\nIslamic law, or Sharia, places great emphasis on justice by ensuring that each person receives their due rights and responsibilities. This includes not only the protection of individual rights but also the fair distribution of resources and the obligation to assist those who are oppressed. The Prophet Muhammad (PBUH) is reported to have said, \'The best of people are those who are most beneficial to others,\' demonstrating the core Islamic values of justice and equity."},{"title":"The Role of Women in Islam","content":"Islam holds women in high regard, recognizing their essential roles as mothers, daughters, wives, and active members of society. The Quran and Hadith provide clear guidance on the rights and responsibilities of women, ensuring their dignity and protecting their autonomy. Women in Islam have the right to own property, seek education, and participate in public life, including work and political activities.\\n\\nHistorically, Islam empowered women long before many modern societies did. The first wife of Prophet Muhammad (PBUH), Khadijah, was a successful businesswoman, and women were active participants in religious, social, and political life in early Islamic history. While the roles of women have evolved over time, the teachings of Islam continue to emphasize respect, equality, and the importance of education and personal development for women."},{"title":"The Five Pillars of Islam: A Guide to Religious Practices","content":"The Five Pillars of Islam form the foundation of a Muslim\'s faith and practice. They represent the core duties and practices that every Muslim must observe in their lifetime. These pillars are Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).\\n\\nShahada is the declaration of faith, proclaiming that there is no god but Allah and that Muhammad (PBUH) is His messenger. Salah involves performing prayers five times a day, and Zakat requires Muslims to give a portion of their wealth to those in need. Sawm refers to fasting during the month of Ramadan, abstaining from food, drink, and other physical needs from dawn to sunset. Finally, Hajj is a pilgrimage to Mecca that every Muslim must undertake once in their lifetime, if financially and physically able. These pillars serve as a spiritual framework for Muslims to maintain their connection to Allah and the Muslim community."},{"title":"The Concept of Mercy in Islam","content":"Mercy is one of the most central concepts in Islam, reflecting Allah\'s nature and His approach toward creation. The Quran emphasizes that Allah is \'The Most Merciful\' (Ar-Rahman), and this attribute is repeated throughout the Quran and in the daily prayers of Muslims. Mercy is seen as a divine quality that Muslims are encouraged to emulate in their dealings with others.\\n\\nThe Prophet Muhammad (PBUH) was described as a mercy to the world, and his example serves as a guide for Muslims in showing compassion, forgiveness, and kindness to others. Islam teaches that mercy extends to all creatures, including animals and the environment. The practice of showing mercy is not limited to moments of ease but is especially important during times of difficulty, conflict, and hardship."},{"title":"The Islamic Concept of Afterlife and Resurrection","content":"In Islam, the belief in the afterlife is central to a Muslim\'s faith. Muslims believe that life on earth is temporary, and the ultimate goal is to attain a place in Paradise (Jannah) by pleasing Allah through righteous deeds. The Quran describes the Day of Judgment as a time when every soul will be resurrected and held accountable for their actions during their lifetime.\\n\\nOn the Day of Judgment, each individual\'s deeds will be weighed, and they will be judged by Allah. Those who have followed the guidance of Islam will be rewarded with eternal life in Paradise, while those who have rejected faith will face punishment in Hell (Jahannam). This belief in the afterlife serves as a moral compass for Muslims, reminding them of the consequences of their actions and the importance of living a righteous life in accordance with Allah\'s will."},{"title":"Islamic Teachings on Tolerance and Coexistence","content":"Islam is a religion that promotes tolerance, understanding, and peaceful coexistence with others. The Quran teaches that Allah created diversity in humanity, including differences in race, ethnicity, and beliefs, and this diversity should be respected. Muslims are encouraged to live peacefully with others, regardless of their faith or background, and to engage in dialogue with respect and kindness.\\n\\nThe Prophet Muhammad (PBUH) is an exemplary model of tolerance, as he engaged with people of various faiths and cultures, fostering peaceful relations and mutual respect. Islam prohibits violence and oppression against others, emphasizing that all people are equal in the sight of Allah, with righteousness being the true measure of one\'s worth."},{"title":"Islamic Views on Health and Well-Being","content":"Islam places great emphasis on the physical and mental well-being of its followers. The Quran and Hadith highlight the importance of maintaining good health, both as a form of gratitude to Allah and as a means to fulfill one\'s religious duties. The Prophet Muhammad (PBUH) is reported to have said, \'Your body has a right over you,\' reminding Muslims of the importance of caring for their physical health.\\n\\nIslam encourages a balanced diet, regular exercise, and maintaining cleanliness, which are seen as acts of worship. The practice of regular prayer (Salah) also promotes physical activity and mental focus. Additionally, Islam advocates for mental health awareness, emphasizing the importance of emotional well-being and seeking help when needed. The concept of balance (Mizan) is essential in Islam, encouraging believers to maintain a healthy balance between their spiritual, physical, and emotional needs."},{"title":"Islam and the Concept of Community (Ummah)","content":"The concept of Ummah in Islam refers to the global Muslim community, united by faith, shared values, and collective responsibility. Islam teaches that Muslims are not only individuals but part of a larger community that should support and care for each other. The Quran describes the Ummah as a \'just community\' that should promote good and forbid evil, working together to achieve social justice and mutual well-being.\\n\\nThe concept of Ummah also emphasizes the importance of cooperation and unity among Muslims, regardless of their cultural or geographical differences. The Prophet Muhammad (PBUH) encouraged his followers to view each other as brothers and sisters in faith, providing help and support to one another in times of need. This sense of community is reflected in practices such as Zakat, where Muslims are encouraged to give to those less fortunate, and in the daily prayers, where Muslims gather as a community in congregation."},{"title":"The Importance of Dua (Supplication) in Islam","content":"Dua, or supplication, is a vital aspect of a Muslim\'s relationship with Allah. It is a way for Muslims to communicate directly with their Creator, expressing their hopes, fears, gratitude, and requests. The Quran and Hadith emphasize that Allah is always near and ready to answer the prayers of His believers, as long as they approach Him with sincerity and devotion.\\n\\nDua can be made in any language, and it is not limited to formal prayers or ritual supplications. Muslims are encouraged to make dua for themselves, their loved ones, and the entire Muslim Ummah. The Prophet Muhammad (PBUH) taught that dua is a powerful tool for seeking Allah\'s guidance, mercy, and help in times of difficulty. It is a reminder for Muslims that they are dependent on Allah and that He is the ultimate source of all blessings and support."},{"title":"The Concept of Tawhid (Monotheism) in Islam","content":"Tawhid, or the oneness of Allah, is the fundamental concept in Islam. It asserts that Allah is the only true God, with no partners, associates, or children. The concept of Tawhid shapes the Islamic worldview, making it a key principle in Islamic theology and practice. Tawhid emphasizes that all acts of worship, prayers, and devotion must be directed solely to Allah, and any form of polytheism (Shirk) is considered a grave sin in Islam.\\n\\nThe Quran frequently affirms the oneness of Allah, stating that He is the Creator of everything in existence. Belief in Tawhid unites Muslims worldwide, regardless of cultural or ethnic differences, in their shared devotion to the one true God."},{"title":"Islamic Views on Marriage and Family","content":"In Islam, marriage is seen as a sacred contract between a man and a woman, where both partners commit to supporting each other in love, respect, and faith. Marriage is not just a personal choice but a social and spiritual responsibility. The Quran and Hadith offer clear guidelines on how to maintain a healthy, balanced, and respectful relationship between husband and wife.\\n\\nThe family unit is considered the cornerstone of Islamic society, and the responsibility of raising children is viewed as a moral duty. Islam promotes mutual respect, kindness, and understanding in the family, with an emphasis on the rights and duties of each family member. The Prophet Muhammad (PBUH) encouraged treating spouses with compassion and emphasized the importance of maintaining strong family ties."},{"title":"The Importance of Knowledge in Islam","content":"In Islam, seeking knowledge is considered one of the highest forms of worship. The Quran calls upon Muslims to seek knowledge from the cradle to the grave, and the Prophet Muhammad (PBUH) said, \'Seeking knowledge is an obligation upon every Muslim.\' Knowledge is not limited to religious knowledge but includes all fields of study, including science, medicine, history, and literature, as long as they are pursued with a pure intention to benefit humanity.\\n\\nIslam encourages critical thinking, the pursuit of education, and the application of knowledge to improve society. Scholars throughout Islamic history have contributed significantly to various fields, and this tradition continues today. Knowledge is seen as a means to gain a deeper understanding of the world, to draw closer to Allah, and to contribute positively to society."},{"title":"Islamic Ethics and Morality","content":"Islamic ethics and morality are rooted in the teachings of the Quran and the Sunnah (the practices of the Prophet Muhammad, PBUH). These ethical principles govern all aspects of a Muslim\'s life, from personal conduct to social relationships. Muslims are encouraged to uphold values such as honesty, integrity, compassion, and humility.\\n\\nThe concept of \'adab,\' which refers to good manners and etiquette, is an integral part of Islamic ethics. The Quran and Hadith emphasize the importance of treating others with respect, avoiding harmful actions, and striving for justice. The ethical teachings of Islam promote a balance between personal well-being and the well-being of others, encouraging Muslims to act with kindness and fairness in all their dealings."},{"title":"The Role of Islamic Charity (Sadaqah and Zakat)","content":"Charity is a key principle in Islam, where giving to others is seen as an act of worship and a means to purify one\'s wealth. Sadaqah (voluntary charity) and Zakat (obligatory charity) are two forms of giving in Islam. Zakat is one of the Five Pillars of Islam, requiring Muslims to give a portion of their wealth to those in need, typically 2.5% of their savings annually.\\n\\nSadaqah, on the other hand, can be given at any time and in any amount, whether financial, material, or through acts of kindness and service. The Quran emphasizes the importance of charity in purifying the soul and helping to alleviate the suffering of the poor and oppressed. Islamic charity is not limited to financial contributions but extends to actions that benefit others, such as volunteering or offering guidance."},{"title":"The Concept of Righteousness in Islam","content":"Righteousness, or \'Taqwa,\' is a central concept in Islam, referring to living a life in accordance with the teachings of Allah and His Messenger. A righteous person is one who strives to follow the path of piety, sincerity, and integrity, always seeking to please Allah through their actions and intentions.\\n\\nThe Quran describes the righteous as those who believe in Allah, perform good deeds, and avoid sinful behavior. Righteousness is not limited to outward actions but encompasses one\'s internal state, including intentions, thoughts, and feelings. The Prophet Muhammad (PBUH) said, \'The best among you are those who have the best manners and character,\' highlighting the significance of internal righteousness alongside external acts of worship."},{"title":"The Importance of Fasting in Islam","content":"Fasting, or \'Sawm,\' is one of the Five Pillars of Islam and holds great spiritual significance. During the month of Ramadan, Muslims around the world fast from dawn to sunset, refraining from food, drink, and other physical needs as a form of worship and self-discipline. The primary goal of fasting is to attain \'Taqwa\' (God-consciousness) by purifying the soul and gaining empathy for the less fortunate.\\n\\nFasting in Islam is not just about abstaining from food and drink but also from negative thoughts, harmful speech, and sinful actions. The Quran describes fasting as a means of spiritual growth, fostering self-restraint, and increasing awareness of Allah. Beyond Ramadan, Muslims are also encouraged to fast on other days, such as Mondays and Thursdays, as a means of maintaining spiritual discipline throughout the year."},{"title":"The Concept of Forgiveness in Islam","content":"Forgiveness is a key theme in Islam, and it is seen as a divine quality that Muslims should strive to emulate. Allah is described as \'The Most Forgiving\' (Al-Ghafur) in the Quran, and Muslims are encouraged to seek His forgiveness through sincere repentance for their sins.\\n\\nThe Prophet Muhammad (PBUH) emphasized the importance of forgiving others, saying, \'Whoever does not forgive others, Allah will not forgive them.\' Islam teaches that forgiveness is not a sign of weakness but a strength that promotes peace and reconciliation. Muslims are encouraged to forgive those who wrong them, as this leads to spiritual growth and closeness to Allah. The concept of forgiveness extends to both personal and societal levels, fostering harmony and preventing cycles of anger and revenge."},{"title":"Islamic Views on Peace and Conflict Resolution","content":"Islam places great emphasis on peace, both at the individual and societal levels. The Quran repeatedly calls for peace, reconciliation, and the peaceful resolution of conflicts. Muslims are encouraged to seek peaceful solutions to disputes and to avoid aggression or harm to others.\\n\\nThe Prophet Muhammad (PBUH) was a model of peace, and his actions in times of conflict serve as a guide for Muslims today. He promoted peaceful negotiations and treaties and worked to foster peaceful relations between different tribes and communities. Islam teaches that war is only permissible as a last resort and should always be conducted in accordance with ethical principles, including the protection of non-combatants and the prohibition of unnecessary harm."},{"title":"The Significance of Hajj (The Pilgrimage) in Islam","content":"Hajj, the annual pilgrimage to Mecca, is one of the Five Pillars of Islam and is an obligation for Muslims who are physically and financially able to perform it. Hajj represents the ultimate act of submission to Allah and serves as a symbol of unity among Muslims worldwide, as millions gather in Mecca each year to perform the rites together.\\n\\nThe rituals of Hajj, such as Tawaf (circling the Kaaba), standing at Arafat, and throwing pebbles at the symbolic pillars, represent a Muslim\'s devotion to Allah and their commitment to the principles of humility, equality, and worship. Hajj is also a time for reflection, repentance, and seeking Allah\'s forgiveness. It is a transformative experience that strengthens faith and fosters a deep sense of spiritual renewal."},{"title":"The Concept of Prophethood in Islam","content":"In Islam, Prophethood is the divine institution through which Allah sends messengers to guide humanity. The final Prophet, Muhammad (PBUH), is considered the Seal of the Prophets, and his teachings, recorded in the Quran and Hadith, form the foundation of Islamic belief and practice. Muslims believe that Allah sent many prophets before Muhammad (PBUH), including Adam, Noah, Abraham, Moses, and Jesus (PBUH), each bringing a message suited to the time and place of their people.\\n\\nThe role of a prophet is to deliver the message of Allah and to be an example of righteous living. Prophets are considered infallible in delivering the divine message, though they remain human in other aspects of their lives. The concept of prophethood emphasizes the continuity of divine guidance and the importance of following the teachings of the final Prophet to attain success in this life and the Hereafter."},{"title":"Islamic Views on Financial Transactions and Ethics","content":"Islam has detailed guidelines for financial transactions, emphasizing fairness, honesty, and transparency. One of the key principles in Islamic finance is the prohibition of \'riba\' (usury), which is seen as exploitative and unjust. Instead, Islam promotes trade, profit-sharing, and ethical business practices that benefit both parties involved.\\n\\nThe concept of \'Halal\' (permissible) and \'Haram\' (forbidden) also applies to financial dealings, with Muslims encouraged to avoid investments or businesses that involve unethical practices, such as gambling or alcohol. Zakat, the obligatory charity, serves as a means of redistributing wealth to the less fortunate, ensuring that economic prosperity is shared within the community. Islamic finance focuses on fairness, accountability, and social responsibility."},{"title":"The Role of the Quran in Islam","content":"The Quran is the holy book of Islam, considered by Muslims to be the literal word of Allah, revealed to Prophet Muhammad (PBUH) over a period of 23 years. The Quran serves as a comprehensive guide for all aspects of life, offering guidance on worship, ethics, law, and social relations.\\n\\nMuslims believe that the Quran is the final revelation from Allah, confirming and superseding previous scriptures. The Quran emphasizes monotheism, justice, compassion, and righteousness. It is regarded as a timeless and universal message, applicable to all people, regardless of time or place. Muslims recite verses from the Quran during prayers, and its teachings are central to Islamic life and spirituality."},{"title":"The Importance of Gratitude (Shukr) in Islam","content":"Gratitude, or \'Shukr,\' is a central theme in Islam and is considered an essential quality for Muslims. The Quran and Hadith emphasize the importance of thanking Allah for His countless blessings and being grateful for everything in life, both big and small. The Prophet Muhammad (PBUH) taught that gratitude leads to contentment and spiritual fulfillment, as it helps Muslims recognize Allah\'s mercy and generosity.\\n\\nShukr is not only about verbal expressions of thanks but also about using the blessings that Allah has given in a way that pleases Him. Islam encourages Muslims to be grateful by showing kindness to others, being patient in times of hardship, and giving charity to help those in need."},{"title":"The Importance of Tawheed (Monotheism) in Islam","content":"Tawheed, the belief in the oneness of Allah, is the core principle of Islamic theology. It asserts that Allah is the only Creator, Sustainer, and Ruler of the universe. Tawheed is not only a theological concept but also a way of life that permeates every aspect of a Muslim\'s existence. The Quran repeatedly emphasizes the oneness of Allah, stating, \'Say, He is Allah, [Who is] One.\' (Quran 112:1).\\n\\nTawheed ensures that Muslims dedicate their worship solely to Allah, avoiding any form of polytheism or idolatry. This belief fosters humility, unity, and a strong connection with the Creator. It also calls Muslims to reflect on Allah’s attributes, such as His mercy, knowledge, and power, and to live their lives in accordance with His will."},{"title":"The Role of Prophets and Messengers in Islam","content":"In Islam, Prophets (Anbiya) and Messengers (Rasool) are individuals chosen by Allah to guide humanity. They are the bearers of divine revelation, leading their people toward monotheism, righteousness, and justice. The Quran mentions that \'We have sent you [O Muhammad] only as a mercy to the worlds.\' (Quran 21:107).\\n\\nProphet Muhammad (PBUH) is considered the final Messenger, but Muslims believe in all the Prophets who came before him, such as Adam, Noah, Abraham, Moses, and Jesus (peace be upon them). These Prophets taught the same fundamental message: the oneness of Allah and the importance of leading a life based on moral and ethical conduct. Muslims believe that the guidance of the Prophets is a mercy for humanity, and following their example is essential for achieving peace and success in both this world and the Hereafter."},{"title":"The Islamic Concept of Justice (Adl)","content":"Justice (Adl) is a fundamental value in Islam, which is deeply embedded in its teachings. The Quran commands believers to uphold justice, stating, \'Indeed, Allah commands you to uphold justice.\' (Quran 16:90). Justice in Islam encompasses all aspects of life, from interpersonal relations to social, political, and legal systems.\\n\\nMuslims are taught to be just in their actions, dealings, and judgments, regardless of a person\'s race, ethnicity, or status. The Prophet Muhammad (PBUH) emphasized that justice should be the basis of leadership, legal matters, and community relations. Islamic justice seeks to ensure fairness, prevent oppression, and protect the rights of every individual. It also encourages reconciliation and forgiveness, offering a balanced approach to both accountability and mercy."},{"title":"The Concept of Gratitude (Shukr) in Islam","content":"Gratitude (Shukr) is an essential virtue in Islam, emphasizing the acknowledgment of Allah’s blessings and being thankful for His provisions. The Quran states, \'If you are grateful, I will certainly give you more.\' (Quran 14:7). Gratitude in Islam is not just about expressing thanks with words, but also about demonstrating thankfulness through actions, such as fulfilling religious obligations and helping others.\\n\\nShukr involves recognizing that all blessings, whether material or spiritual, come from Allah. It encourages Muslims to maintain a positive attitude, express thankfulness regularly, and share their blessings with others. Gratitude strengthens a Muslim’s relationship with Allah and leads to contentment and peace of mind."},{"title":"The Islamic Concept of the Afterlife (Akhirah)","content":"The concept of the Afterlife (Akhirah) is central to Islamic belief. Muslims believe in life after death and the eventual Day of Judgment, when every soul will be held accountable for their deeds. The Quran states, \'Every soul shall taste death, and you will be fully recompensed on the Day of Resurrection.\' (Quran 3:185).\\n\\nThe Afterlife is a continuation of the soul’s journey, where those who lived righteous lives will be rewarded with eternal paradise (Jannah), and those who disobeyed Allah will face punishment in Hell (Jahannam). The belief in Akhirah encourages Muslims to live a life of piety, justice, and righteousness, with the understanding that their actions in this world will determine their eternal fate."},{"title":"The Significance of the Night of Ascension (Isra and Miraj)","content":"The Night of Ascension (Isra and Miraj) is one of the most significant events in Islamic history. It is the night when Prophet Muhammad (PBUH) was taken from the Kaaba in Mecca to the Al-Aqsa Mosque in Jerusalem, and then ascended to the heavens to stand in the presence of Allah. During this miraculous journey, the Prophet received instructions regarding the number of daily prayers (Salah) that Muslims are to perform.\\n\\nIsra and Miraj symbolize the deep connection between the Prophet and Allah, and it highlights the importance of prayer in the life of a Muslim. The event serves as a reminder of the spiritual elevation that comes with devotion, faith, and submission to Allah."},{"title":"The Importance of the Quran in Daily Life","content":"The Quran is not just a sacred text to be read during special occasions but is meant to be a guide for every aspect of a Muslim\'s daily life. The Quran provides guidance on personal conduct, family relations, social justice, and spirituality. It teaches Muslims to act with kindness, honesty, humility, and justice, reflecting the divine will in their actions.\\n\\nThe Quran encourages reflection, understanding, and action upon its verses. It is recited during prayers and serves as a source of comfort, solace, and guidance. Muslims are encouraged to incorporate its teachings into their daily routines, making the Quran a living guide that shapes their thoughts, behaviors, and interactions with others."},{"title":"The Importance of Good Character in Islam","content":"Good character is a key aspect of a Muslim\'s faith and is highly valued in Islam. The Prophet Muhammad (PBUH) said, \'The best of you are those who have the best manners and character.\' Islam teaches Muslims to act with kindness, patience, humility, and sincerity, and to treat others with respect and fairness.\\n\\nGood character extends beyond the immediate family and community, encompassing dealings with neighbors, colleagues, and even strangers. The Quran and Hadith emphasize that a person’s actions should reflect the teachings of Islam, demonstrating compassion and integrity. A Muslim is encouraged to uphold high standards of character in all aspects of life, as it not only improves personal relationships but also contributes to the overall well-being of society."},{"title":"The Importance of Seeking Knowledge in Islam","content":"Seeking knowledge is a highly regarded activity in Islam, and it is considered a form of worship. The Quran states, \'Say, \'Are those who know equal to those who do not know?\' (Quran 39:9), underscoring the importance of knowledge in Islam.\\n\\nKnowledge is not confined to religious studies but includes all beneficial knowledge that serves to better the individual and society. Islam encourages its followers to acquire both religious and worldly knowledge. The Prophet Muhammad (PBUH) said, \'Seeking knowledge is an obligation upon every Muslim.\' Through knowledge, Muslims can understand their faith, contribute positively to society, and act in ways that align with divine wisdom."},{"title":"The Importance of Dhikr (Remembrance of Allah)","content":"Dhikr, or the remembrance of Allah, is an essential practice in Islam that helps strengthen the bond between the believer and Allah. The Quran reminds Muslims, \'Indeed, in the remembrance of Allah do hearts find rest.\' (Quran 13:28).\\n\\nDhikr can be performed through various forms, such as reciting specific phrases like \'SubhanAllah\' (Glory be to Allah), \'Alhamdulillah\' (All praise is due to Allah), and \'Allahu Akbar\' (Allah is the Greatest). These acts of remembrance are not only an expression of gratitude but also serve as a means of purifying the heart and seeking Allah’s mercy and blessings. Regular Dhikr helps Muslims stay mindful of Allah throughout their daily lives and encourages patience, gratitude, and humility."},{"title":"Islamic Views on Patience and Perseverance","content":"Patience (Sabr) and perseverance are highly valued virtues in Islam, emphasized in the Quran and Hadith as essential qualities for a Muslim. The Quran states, \'Indeed, the patient will be given their reward without account.\' (Quran 39:10). Patience involves enduring difficulties with faith and trust in Allah, while perseverance entails steadfastness in pursuing righteousness.\\n\\nThe Prophet Muhammad (PBUH) taught that patience is a means of attaining Allah’s pleasure and overcoming trials. These qualities are particularly important during times of hardship, loss, or temptation, as they help Muslims maintain their faith and moral integrity. Patience and perseverance are seen as acts of worship that strengthen a Muslim’s relationship with Allah."},{"title":"The Role of Intention (Niyyah) in Islam","content":"In Islam, the intention (Niyyah) behind an action is of utmost importance, as it determines the spiritual value of the deed. The Prophet Muhammad (PBUH) said, \'Actions are judged by intentions, and every person will be rewarded according to what they intended.\' This principle underscores that sincerity and devotion to Allah are essential for any act of worship or good deed.\\n\\nA pure intention transforms even mundane tasks into acts of worship if they are performed for the sake of Allah. Muslims are encouraged to constantly renew their intentions to ensure their actions align with their faith and seek Allah’s pleasure, fostering mindfulness and spiritual awareness in all aspects of life."},{"title":"Islamic Teachings on Humility","content":"Humility is a core value in Islam, reflecting a Muslim’s submission to Allah and recognition of their own limitations. The Quran warns against arrogance, stating, \'And do not walk upon the earth exultantly. Indeed, you will never tear the earth apart, nor will you reach the mountains in height.\' (Quran 17:37). Humility involves modesty, kindness, and respect in dealings with others.\\n\\nThe Prophet Muhammad (PBUH) exemplified humility by living a simple life and treating everyone with fairness and compassion. Muslims are encouraged to avoid pride and self-superiority, recognizing that all blessings come from Allah. Humility strengthens community bonds and fosters a spirit of equality and mutual respect."},{"title":"The Concept of Ihsan (Excellence) in Islam","content":"Ihsan, often translated as excellence or perfection, is the concept of performing every act with the awareness that Allah is watching. The Prophet Muhammad (PBUH) described Ihsan as worshipping Allah as though you see Him, for though you cannot see Him, He sees you. This principle encourages Muslims to strive for excellence in their worship, character, and actions.\\n\\nIhsan involves sincerity, mindfulness, and dedication in all aspects of life, from prayer to interpersonal relationships. It calls Muslims to go beyond the minimum requirements of faith and to seek spiritual and moral excellence, reflecting the beauty of Islam in their behavior and intentions."},{"title":"Islamic Teachings on Compassion","content":"Compassion is a fundamental aspect of Islamic teachings, rooted in the mercy of Allah and exemplified by the Prophet Muhammad (PBUH), who was described as a mercy to the worlds. The Quran states, \'We have not sent you [O Muhammad] except as a mercy to the worlds.\' (Quran 21:107). Compassion in Islam extends to all beings, including family, neighbors, strangers, and even animals.\\n\\nMuslims are encouraged to show kindness and empathy in their interactions, especially toward the vulnerable, such as orphans and the poor. Compassion is expressed through acts of charity, forgiveness, and support, fostering a society built on care and mutual respect."},{"title":"The Importance of Trust (Amanah) in Islam","content":"Trust (Amanah) is a key principle in Islam, emphasizing the responsibility to fulfill obligations and be trustworthy in all dealings. The Quran states, \'Indeed, Allah commands you to render trusts to whom they are due.\' (Quran 4:58). Trust applies to relationships, contracts, and responsibilities, whether personal, professional, or religious.\\n\\nThe Prophet Muhammad (PBUH) was known as Al-Amin (the Trustworthy) even before his prophethood, highlighting the importance of integrity. Muslims are encouraged to uphold trust in all aspects of life, ensuring honesty and reliability in their actions, as this strengthens community bonds and reflects faith in Allah."},{"title":"Islamic Teachings on Moderation","content":"Moderation is a central principle in Islam, promoting balance in all aspects of life, including worship, consumption, and behavior. The Quran states, \'And thus We have made you a just community that you will be witnesses over the people.\' (Quran 2:143). Moderation prevents extremism and excess, encouraging Muslims to live balanced, disciplined lives.\\n\\nThe Prophet Muhammad (PBUH) advocated moderation in eating, spending, and even worship, emphasizing that balance leads to spiritual and physical well-being. Muslims are taught to avoid wastefulness and extravagance, striving for a lifestyle that aligns with the principles of justice and sustainability."},{"title":"The Role of Repentance (Tawbah) in Islam","content":"Repentance (Tawbah) is a vital aspect of Islamic spirituality, allowing Muslims to seek forgiveness from Allah for their sins. The Quran states, \'And whoever repents and does righteousness—indeed, it is those who are the successful.\' (Quran 24:31). Tawbah involves sincere regret, ceasing the sinful act, and resolving to avoid it in the future.\\n\\nThe Prophet Muhammad (PBUH) taught that Allah accepts the repentance of those who turn to Him sincerely, emphasizing His infinite mercy. Repentance is a means of spiritual purification and renewal, helping Muslims maintain a close relationship with Allah and strive for righteousness."},{"title":"Islamic Teachings on Community Service","content":"Community service is highly valued in Islam, as it reflects the principles of compassion, charity, and social responsibility. The Quran encourages Muslims to help others, stating, \'And do good; indeed, Allah loves the doers of good.\' (Quran 2:195). Acts of service, such as volunteering, helping the needy, or improving the community, are considered forms of worship.\\n\\nThe Prophet Muhammad (PBUH) emphasized the importance of serving others, saying, \'The best of people are those who are most beneficial to others.\' Community service strengthens the bonds of the Ummah and promotes social justice, ensuring the well-being of all members of society."},{"title":"The Importance of Unity in Islam","content":"Unity is a core value in Islam, emphasizing the strength and solidarity of the Muslim Ummah. The Quran states, \'And hold firmly to the rope of Allah all together and do not become divided.\' (Quran 3:103). Unity fosters cooperation, mutual support, and collective responsibility among Muslims, regardless of cultural or geographical differences.\\n\\nThe Prophet Muhammad (PBUH) taught that Muslims are like one body, where if one part suffers, the whole body feels the pain. Unity is reflected in practices such as congregational prayers, charity, and collective worship during Hajj, reinforcing the importance of community and shared faith."},{"title":"The Significance of the Night of Power (Laylat al-Qadr)","content":"The Night of Power (Laylat al-Qadr) is one of the holiest nights in Islam, occurring during the last ten nights of Ramadan. The Quran describes it as \'better than a thousand months\' (Quran 97:3), emphasizing its immense spiritual significance. It is believed to be the night when the Quran was first revealed to Prophet Muhammad (PBUH).\\n\\nMuslims seek this night through increased worship, prayer, and recitation of the Quran, as acts performed on this night are multiplied in reward. Laylat al-Qadr is a time for reflection, seeking forgiveness, and drawing closer to Allah, symbolizing the profound connection between the divine and humanity."},{"title":"Islamic Teachings on Respect for Parents","content":"Respect for parents is a fundamental teaching in Islam, emphasized in the Quran and Hadith. The Quran states, \'And your Lord has decreed that you not worship except Him, and to parents, good treatment.\' (Quran 17:23). Muslims are obligated to show kindness, obedience, and gratitude toward their parents, recognizing their sacrifices and role in upbringing.\\n\\nThe Prophet Muhammad (PBUH) taught that paradise lies at the feet of mothers, highlighting the elevated status of parents in Islam. Respect for parents extends beyond obedience to include caring for them in old age and praying for their well-being, fostering strong family bonds and moral responsibility."},{"title":"The Concept of Barakah (Blessing) in Islam","content":"Barakah, or divine blessing, is a central concept in Islam, referring to the spiritual increase and goodness that Allah bestows upon individuals and their actions. The Quran and Hadith encourage Muslims to seek Barakah through acts of worship, charity, and ethical behavior. The Prophet Muhammad (PBUH) emphasized that Barakah can be found in lawful earnings, gratitude, and sincerity.\\n\\nBarakah manifests in various forms, such as increased sustenance, contentment, and success in endeavors. Muslims are encouraged to seek Barakah by starting tasks with the name of Allah, maintaining integrity, and sharing blessings with others, thereby enhancing their spiritual and material lives."},{"title":"Islamic Teachings on Honesty","content":"Honesty is a cornerstone of Islamic ethics, emphasized as a vital characteristic of a Muslim. The Quran states, \'O you who have believed, fear Allah and be with those who are true.\' (Quran 9:119). Honesty encompasses truthfulness in speech, actions, and intentions, and is essential in personal, social, and business interactions.\\n\\nThe Prophet Muhammad (PBUH), known as As-Sadiq (the Truthful), exemplified honesty in all aspects of life. Muslims are encouraged to uphold truthfulness, even when it is difficult, as it fosters trust, strengthens relationships, and aligns with the principles of righteousness and accountability in Islam."},{"title":"The Role of Mosques in Islam","content":"Mosques are central to Islamic life, serving as places of worship, community gathering, and education. The Quran describes mosques as houses of Allah, where His name is glorified (Quran 24:36). They are spaces for performing Salah, seeking knowledge, and fostering unity among Muslims through congregational activities.\\n\\nThe Prophet Muhammad (PBUH) emphasized the importance of mosques, stating that those who frequent them for worship are blessed. Beyond religious functions, mosques historically served as centers for social services, charity distribution, and community decision-making, reinforcing their role as the heart of the Muslim community."},{"title":"Islamic Teachings on Forgiveness of Others","content":"Forgiveness of others is a highly valued virtue in Islam, reflecting Allah’s attribute of mercy. The Quran encourages Muslims to forgive, stating, \'Let them forgive and overlook; do you not wish that Allah should forgive you?\' (Quran 24:22). Forgiving others fosters peace, heals relationships, and promotes spiritual growth.\\n\\nThe Prophet Muhammad (PBUH) demonstrated forgiveness even toward those who wronged him, setting an example for Muslims. Islam teaches that forgiving others, especially in the face of injustice, is a sign of strength and a means to attain Allah’s mercy and reward."},{"title":"The Importance of Time Management in Islam","content":"Time management is highly emphasized in Islam, as time is considered a precious trust from Allah. The Quran states, \'By time, indeed, mankind is in loss, except for those who have believed and done righteous deeds.\' (Quran 103:1-3). Muslims are encouraged to use their time wisely, balancing worship, work, and personal responsibilities.\\n\\nThe Prophet Muhammad (PBUH) taught that time should be spent in productive and meaningful activities, such as seeking knowledge, helping others, and performing acts of worship. Effective time management reflects gratitude for Allah’s blessings and ensures a purposeful and fulfilling life."},{"title":"Islamic Teachings on Kindness to Animals","content":"Islam emphasizes kindness to animals, viewing them as creations of Allah deserving of care and compassion. The Prophet Muhammad (PBUH) taught that showing kindness to animals is a means of earning Allah’s reward, while cruelty is condemned. The Quran mentions animals as signs of Allah’s creation, encouraging their humane treatment.\\n\\nExamples from the Prophet’s life include his teachings on providing food and water to animals and avoiding overburdening them. Muslims are encouraged to treat animals with respect, ensuring their well-being as part of their responsibility as stewards of the Earth."},{"title":"The Concept of Taqwa (God-Consciousness) in Islam","content":"Taqwa, or God-consciousness, is a central concept in Islam, referring to a state of mindfulness and reverence for Allah in all actions. The Quran states, \'O you who have believed, fear Allah as He should be feared and do not die except as Muslims.\' (Quran 3:102). Taqwa involves living with awareness of Allah’s presence, striving for righteousness, and avoiding sin.\\n\\nThe Prophet Muhammad (PBUH) described Taqwa as the foundation of good character and faith. It guides Muslims to make ethical choices, maintain integrity, and seek Allah’s pleasure, fostering a life of purpose and spiritual fulfillment."},{"title":"Islamic Teachings on Generosity","content":"Generosity is a highly valued trait in Islam, reflecting the spirit of compassion and selflessness. The Quran encourages Muslims to give generously, stating, \'The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.\' (Quran 2:261). Generosity includes financial charity, sharing knowledge, and offering time to help others.\\n\\nThe Prophet Muhammad (PBUH) was known for his unparalleled generosity, often giving away his possessions to those in need. Muslims are encouraged to practice generosity as a means of purifying their wealth, strengthening community ties, and earning Allah’s reward."},{"title":"The Importance of Jihad (Striving) in Islam","content":"Jihad, often misunderstood, refers to striving or struggling in the way of Allah. The Quran states, \'And strive for Allah with the striving due to Him.\' (Quran 22:78). Jihad encompasses both the internal struggle against one’s desires (greater jihad) and, when necessary, the external struggle to defend the faith or community (lesser jihad).\\n\\nThe Prophet Muhammad (PBUH) emphasized that the greatest jihad is the struggle against one’s own soul to uphold righteousness. Jihad is guided by strict ethical principles, prioritizing peace, justice, and protection of innocent lives, and is never about aggression or oppression."},{"title":"Islamic Teachings on Respect for Neighbors","content":"Respect for neighbors is a significant teaching in Islam, emphasizing the importance of good relations with those living nearby. The Quran states, \'Worship Allah and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, and the neighbor farther away.\' (Quran 4:36). Neighbors have rights in Islam, including kindness and support.\\n\\nThe Prophet Muhammad (PBUH) said, \'He is not a believer whose neighbor is not safe from his harm.\' Muslims are encouraged to treat neighbors with respect, share resources, and maintain harmonious relationships, fostering a strong and caring community."},{"title":"The Concept of Adab (Etiquette) in Islam","content":"Adab, or proper etiquette, is a fundamental aspect of Islamic teachings, encompassing good manners, respect, and proper conduct in all interactions. The Quran encourages Muslims to speak kindly and act with humility, stating, \'And speak to people good [words].\' (Quran 2:83). Adab applies to speech, behavior, and even personal hygiene.\\n\\nThe Prophet Muhammad (PBUH) was known for his exemplary manners, treating everyone with kindness and respect. Muslims are encouraged to practice Adab in their daily lives, as it reflects their faith and enhances their interactions with others, promoting harmony and mutual respect."},{"title":"Islamic Teachings on Seeking Forgiveness","content":"Seeking forgiveness (Istighfar) is a vital practice in Islam, allowing Muslims to repent and seek Allah’s mercy for their shortcomings. The Quran states, \'And seek forgiveness of Allah. Indeed, Allah is Forgiving and Merciful.\' (Quran 73:20). Istighfar involves acknowledging one’s sins and sincerely asking for Allah’s forgiveness.\\n\\nThe Prophet Muhammad (PBUH) frequently sought forgiveness, teaching that it brings spiritual purification and divine blessings. Muslims are encouraged to make Istighfar a regular part of their lives, as it fosters humility, strengthens faith, and opens the door to Allah’s mercy."},{"title":"The Role of Charity in Building Community","content":"Charity in Islam, through Zakat and Sadaqah, plays a crucial role in building strong, cohesive communities. The Quran emphasizes, \'Take from their wealth a charity by which you purify them.\' (Quran 9:103). Charity ensures the redistribution of resources, supporting the less fortunate and fostering social equity.\\n\\nThe Prophet Muhammad (PBUH) taught that even small acts of charity, such as a smile or kind word, strengthen community bonds. By giving generously, Muslims contribute to a culture of care and mutual support, ensuring the well-being of the Ummah and promoting social harmony."},{"title":"Islamic Teachings on Patience in Adversity","content":"Patience in adversity is a core teaching in Islam, encouraging Muslims to remain steadfast during trials. The Quran states, \'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient.\' (Quran 2:155). Patience in adversity reflects trust in Allah’s plan.\\n\\nThe Prophet Muhammad (PBUH) faced numerous hardships yet remained patient, setting an example for Muslims. This patience involves gratitude during ease and resilience during hardship, helping Muslims grow spiritually and maintain faith in challenging times."},{"title":"The Importance of Sincerity (Ikhlas) in Islam","content":"Sincerity (Ikhlas) is a fundamental principle in Islam, emphasizing that all actions should be performed solely for Allah’s pleasure. The Quran states, \'And they were not commanded except to worship Allah, [being] sincere to Him in religion.\' (Quran 98:5). Sincerity ensures that deeds are free from hypocrisy or seeking worldly gain.\\n\\nThe Prophet Muhammad (PBUH) taught that sincerity is essential for the acceptance of worship. Muslims are encouraged to purify their intentions, ensuring that their actions, whether prayer, charity, or daily tasks, are performed with devotion to Allah, fostering spiritual integrity."},{"title":"Islamic Teachings on Respect for Elders","content":"Respect for elders is a key value in Islam, reflecting gratitude for their wisdom and contributions. The Quran emphasizes kindness toward parents and, by extension, elders, stating, \'And lower to them the wing of humility out of mercy.\' (Quran 17:24). Elders are seen as sources of guidance and blessing in the community.\\n\\nThe Prophet Muhammad (PBUH) taught that respecting elders is a means of earning Allah’s favor. Muslims are encouraged to honor elders through kind treatment, listening to their advice, and ensuring their care, fostering a culture of respect and intergenerational harmony."},{"title":"The Concept of Sabr (Patience) in Worship","content":"Sabr (patience) in worship is a vital aspect of Islamic practice, requiring steadfastness in fulfilling religious obligations. The Quran states, \'Seek help through patience and prayer.\' (Quran 2:45). Patience in worship involves consistency in performing Salah, fasting, and other acts, even when faced with challenges.\\n\\nThe Prophet Muhammad (PBUH) emphasized that patience in worship strengthens faith and brings divine rewards. Muslims are encouraged to maintain their religious duties with dedication, trusting that their efforts, though sometimes difficult, draw them closer to Allah."},{"title":"Islamic Teachings on Environmental Responsibility","content":"Environmental responsibility in Islam is rooted in the concept of stewardship (Khalifah), where humans are entrusted with caring for the Earth. The Quran states, \'It is He who has made you successors upon the earth.\' (Quran 35:39). Muslims are encouraged to protect the environment by avoiding waste and preserving natural resources.\\n\\nThe Prophet Muhammad (PBUH) promoted actions like planting trees and conserving water, teaching that such acts are charitable. Environmental responsibility is seen as a form of worship, reflecting gratitude for Allah’s creation and ensuring sustainability for future generations."},{"title":"Purification and Cleanliness (Taharah) in Islam","content":"Purification (Taharah) is a prerequisite for many acts of worship, emphasizing both physical and spiritual cleanliness. Islam prescribes ablution (Wudu), full ritual bath (Ghusl), and dry ablution (Tayammum) when water is unavailable. These practices cultivate mindfulness and respect for worship.\\n\\nCleanliness extends to personal hygiene, homes, and public spaces. The Prophet Muhammad (PBUH) encouraged trimming nails, oral care with miswak, and maintaining tidy garments. Taharah symbolizes inner purification, preparing the believer to stand before Allah with humility and presence.","tags":["Worship","Law","General"],"primaryType":"Worship"},{"title":"Etiquettes of Seeking Knowledge (Adab al-Ilm)","content":"Seeking knowledge requires etiquette: sincerity of intention, patience, humility, and respect for teachers and peers. Students are encouraged to verify sources, avoid arrogance, and practice what they learn.\\n\\nClassical scholars stressed punctuality, note‑taking, reviewing lessons, and serving the community with acquired knowledge. Adab al‑Ilm ensures that knowledge uplifts character, refines conduct, and benefits society rather than becoming a means of pride or argumentation.","tags":["Education","Theology","General"],"primaryType":"Education"},{"title":"Maqasid al-Shariah (Higher Objectives of Islamic Law)","content":"Maqasid al‑Shariah refers to the higher objectives preserved by Islamic law: religion, life, intellect, lineage, and wealth. These aims guide interpretation and application, ensuring mercy, justice, and public welfare.\\n\\nUnderstanding Maqasid helps balance textual evidence with context, supporting policies and personal decisions that protect rights, prevent harm, and promote benefit. It frames Shariah as principled, purposeful, and compassionate.","tags":["Law","Theology","Social Justice"],"primaryType":"Law"},{"title":"Islamic Manners of Disagreement (Adab al-Ikhtilaf)","content":"Differences of opinion are part of the Islamic scholarly tradition. Adab al‑Ikhtilaf emphasizes assuming good intent, avoiding mockery, citing evidence fairly, and preserving unity despite disagreement.\\n\\nMuslims are encouraged to debate with wisdom, consult experts, and prioritize shared fundamentals. Maintaining respect and avoiding factionalism protects the Ummah’s cohesion while allowing diversity within legitimate bounds.","tags":["Community","Law","General"],"primaryType":"Community"},{"title":"Guardianship of the Orphan (Kafalah) in Islam","content":"Caring for orphans is a noble act with great reward. Islam commands kind treatment, fair financial management of their property, and integration into loving homes through Kafalah (sponsorship/guardianship).\\n\\nThe Prophet (PBUH) promised closeness in Paradise to those who care for orphans. Communities are urged to establish transparent systems for support, education, and protection of orphan rights.","tags":["Social Justice","Law","Family"]},{"title":"Wills and End-of-Life Matters (Wasiyah)","content":"Islam encourages writing a will (Wasiyah), settling debts, and specifying bequests up to one‑third of one’s estate outside fixed shares. Inheritance rules ensure equitable distribution among heirs and prevent disputes.\\n\\nPreparing an ethical will includes spiritual advice, funeral instructions, and encouragement to maintain family ties. Early preparation reflects foresight, gratitude, and responsibility toward one’s dependents.","tags":["Law","Family","General"]},{"title":"Friday Prayer and Khutbah Etiquettes","content":"Jumu’ah is a weekly congregational obligation for eligible men and a recommended act for others. Etiquettes include bathing, wearing clean clothes, arriving early, listening attentively to the sermon, and avoiding distractions like phone use or talking.\\n\\nThe khutbah reminds the community of piety, justice, and current needs. Regular attendance strengthens faith, bonds the community, and renews commitment to righteous action.","tags":["Worship","Community","General"]},{"title":"Sunnah Daily Practices for Spiritual Growth","content":"Daily Sunnah practices include morning and evening adhkar, Duha prayer, reciting Quran, maintaining family ties, and greeting with peace. Integrating small, consistent deeds nurtures a tranquil heart.\\n\\nThe Prophet (PBUH) taught that the most beloved deeds are those done consistently. Building routines around prayer times anchors the day in remembrance and gratitude."},{"title":"Voluntary Night Worship: Tahajjud and Qiyam","content":"Night prayer is a hallmark of spiritual excellence. Praying Tahajjud in the last third of the night, making heartfelt dua, and reflecting on Quranic verses softens the heart and invites forgiveness.\\n\\nEven a short, regular night prayer brings serenity, strengthens resolve, and deepens reliance on Allah, especially during personal trials."},{"title":"Islamic Art and Calligraphy","content":"Islamic art emphasizes beauty, geometry, and harmony, avoiding depictions that may lead to veneration. Calligraphy developed as a revered art form to honor the Quranic text, adorning manuscripts, architecture, and everyday objects.\\n\\nPatterns, arabesques, and calligraphic scripts reflect contemplation, order, and reverence for revelation, expressing spirituality through aesthetic discipline.","tags":["Arts & Culture","Theology","General"],"primaryType":"Arts & Culture"},{"title":"Islamic Architecture and Urban Spaces","content":"From mosques with courtyards and minarets to caravanserais and markets, Islamic architecture prioritizes community, shade, airflow, and modesty. Design elements support worship, learning, and social welfare.\\n\\nUrban planning in Muslim civilizations integrated water management, gardens, and waqf endowments, aligning function and beauty with values of service and sustainability.","tags":["Arts & Culture","Community","Environment"],"primaryType":"Arts & Culture"},{"title":"Rights of Non-Muslims in Islamic Society","content":"Classical jurisprudence protects the lives, property, and worship of non‑Muslims living under Muslim governance. Islam forbids compulsion in religion and commands justice and kind conduct toward neighbors and citizens.\\n\\nFair treatment, security, and access to courts exemplify the Shariah’s commitment to public welfare and social harmony across faith lines.","tags":["Law","Social Justice","Community"]},{"title":"Halal Investing and Modern Finance","content":"Halal investing screens out interest‑based debt, gambling, and unethical industries, favoring asset‑backed, risk‑sharing models. Instruments like Musharakah, Mudarabah, Murabahah, and Sukuk align returns with real economic activity.\\n\\nInvestors are encouraged to purify doubtful gains, diversify prudently, and prioritize long‑term, ethical impact alongside lawful profit.","tags":["Finance","Law","General"],"primaryType":"Finance"},{"title":"Modesty and Dress (Haya) in Islam","content":"Haya is a comprehensive concept of modesty in gaze, speech, behavior, and attire for all genders. Dress guidelines aim for dignity, privacy, and humility while accommodating cultural variation within Islamic parameters.\\n\\nModesty fosters respect, reduces vanity, and centers identity on faith rather than display, contributing to healthy personal and social interactions."},{"title":"Technology and Social Media: An Islamic Lens","content":"Digital tools are blessings when used with intention and restraint. Islam encourages truthfulness, guarding the tongue, avoiding backbiting, and protecting time and privacy online.\\n\\nCurating feeds, limiting distraction, verifying information, and prioritizing in‑person duties help align technology use with taqwa, productivity, and community well‑being.","tags":["Technology","Ethics","General"],"primaryType":"Technology"},{"title":"Halal Travel and Tourism","content":"Halal travel considers lawful food, prayer accessibility, family privacy, and respectful entertainment. Travelers should maintain daily prayers, observe modesty, and uphold honesty across borders.\\n\\nExploring Allah’s earth with gratitude broadens perspective, strengthens cultural understanding, and can renew appreciation for the signs of Allah in diverse peoples and places.","tags":["Travel","Worship","General"],"primaryType":"Travel"},{"title":"Seerah Focus: The Meccan Period","content":"The Meccan years highlight steadfastness under persecution, the call to pure monotheism, and character refinement. Early Muslims modeled patience, integrity, and reliance on Allah despite hardship.\\n\\nLessons include prioritizing creed, building small circles of support, and trusting gradual, principled change over haste."},{"title":"Seerah Focus: The Medinan Period","content":"In Madinah, the Prophet (PBUH) established a just community, drafted covenants, and nurtured brotherhood between migrants and helpers. Governance integrated worship, ethics, and social welfare.\\n\\nKey themes include consultation (Shura), mercy in leadership, preparedness, and treaties—offering enduring guidance for community building today."},{"title":"Marriage Contract (Nikah) Essentials","content":"Nikah is a sacred contract requiring consent of both parties, a dowry (Mahr), witnesses, and clear terms. Islam encourages kindness, transparency, and mutual rights, with dispute mechanisms rooted in fairness.\\n\\nPreparing for marriage includes premarital education, realistic expectations, and commitment to shared worship and communication, strengthening the home as a place of mercy and tranquility.","tags":["Family","Law","General"],"primaryType":"Family"},{"title":"Parenting and Tarbiyah in Islam","content":"Tarbiyah means nurturing faith, character, and skills through love, consistency, and example. Parents teach prayer, Quran, manners, and responsibility, while respecting each child’s temperament and needs.\\n\\nBalanced discipline, dua for children, and creating a prophetic home environment help raise confident believers who benefit society.","tags":["Family","Education","General"],"primaryType":"Family"},{"title":"Zakat: Calculation and Eligible Recipients","content":"Zakat is 2.5% on qualifying savings after one lunar year, with different rules for livestock, crops, and trade goods. Recipients include the poor, needy, and other categories listed in the Quran.\\n\\nAccurate calculation, timely payment, and prioritizing local needs maximize Zakat’s impact, purifying wealth and alleviating hardship.","tags":["Finance","Law","Social Justice"],"primaryType":"Finance"},{"title":"Employee and Employer Rights in Islam","content":"Islam commands fair wages, timely payment, safe conditions, and honest work. Employers must not exploit, and employees must fulfill trusts. Contracts clarify roles and prevent disputes.\\n\\nProphetic guidance stresses dignity, consultation, and justice at work, fostering productive, ethical workplaces rooted in mutual respect.","tags":["Law","Ethics","Social Justice"],"primaryType":"Law"},{"title":"Sulh and Arbitration: Reconciling Disputes","content":"Sulh (amicable settlement) encourages resolving conflicts through dialogue, mediation, and fair compromise without violating clear rights. Arbitration offers a structured, expert-led process when needed.\\n\\nThe goals are restoring relationships, preventing harm, and upholding justice, reflecting Islam’s emphasis on peace and social cohesion.","tags":["Law","Community","General"],"primaryType":"Law"},{"title":"Janazah: Funerals and Bereavement Etiquettes","content":"Islamic funeral rites include washing (Ghusl), shrouding, funeral prayer, and prompt burial with dignity and simplicity. Extravagance and wailing are discouraged; patience and dua are encouraged.\\n\\nVisiting the sick, offering condolences, arranging meals, and settling debts support grieving families while earning communal reward.","tags":["Law","Community","General"],"primaryType":"Law"},{"title":"Waqf (Endowments) and Community Benefit","content":"Waqf dedicates assets for perpetual public good, funding mosques, schools, clinics, and social services. Proper governance ensures transparency, sustainability, and alignment with Shariah.\\n\\nReviving waqf strengthens social safety nets, educational access, and long-term community resilience.","tags":["Social Justice","Community","Finance"],"primaryType":"Social Justice"},{"title":"Ethics of Speech: Ghiba and Namima","content":"Ghiba (backbiting) and Namima (tale-bearing) harm trust and hearts. Islam commands truthfulness, gentle speech, and guarding the tongue from insults, mockery, and spreading rumors.\\n\\nPractices like pausing before posting, verifying news, and making excuses for others protect honor and maintain unity.","tags":["Ethics","Community","Theology"],"primaryType":"Ethics"},{"title":"Youth, Study, and Campus Life","content":"Students balance worship, study excellence, and wholesome friendships. Time management, halal socializing, campus prayer spaces, and involvement in service clubs nurture identity and purpose.\\n\\nSetting boundaries, seeking mentorship, and keeping up with Quran and adhkar protect faith amid pressures.","tags":["Education","Worship","General"],"primaryType":"Education"},{"title":"New Muslims: First Steps and Support","content":"Converts benefit from mentorship, gradual learning, and welcoming communities. Focus on creed, prayer, cleanliness, and halal basics while building supportive friendships and routines.\\n\\nCommunities should provide classes, social inclusion, and practical help, ensuring a gentle, sustainable path of growth.","tags":["Community","Worship","General"],"primaryType":"Community"},{"title":"Halal Careers and Professional Integrity","content":"Choosing lawful income and avoiding harmful industries safeguards faith. Integrity at work includes honesty, fulfilling contracts, avoiding conflicts of interest, and respecting confidentiality.\\n\\nBalancing career with worship—protecting prayer times, observing modesty, and maintaining family obligations—anchors success in devotion.","tags":["Finance","Ethics","General"],"primaryType":"Finance"},{"title":"Hospitality and Guest Rights","content":"Islam encourages generous hospitality: greeting with peace, offering food and comfort, and honoring guests without extravagance. Guests reciprocate by being considerate and brief.\\n\\nHosting strengthens kinship, community bonds, and gratitude—classic prophetic practice that spreads warmth and mercy.","tags":["Community","Ethics","General"],"primaryType":"Community"},{"title":"Coping with Anxiety and Hardship","content":"Faith-informed coping combines dua, prayer, seeking knowledge, healthy routines, and professional help when needed. Islam removes stigma from seeking treatment and encourages supporting one another.\\n\\nReflecting on divine wisdom, practicing gratitude, and serving others cultivate resilience and hope during trials.","tags":["Health","General","Worship"],"primaryType":"Health"},{"title":"Essentials of Salah (Prayer)","content":"Salah is the daily connection to Allah and the pillar that upholds faith. Key elements include intention, purification, covering awrah, proper times, and correct postures with tranquility and presence.\\n\\nMaintaining the five prayers on time, learning the rulings of missed prayers, and improving humility (khushu’) nurtures discipline, gratitude, and spiritual stability."},{"title":"Ramadan: Spiritual Goals and Practices","content":"Ramadan trains the soul through fasting, Quran recitation, charity, and nightly prayers. Set clear intentions, reduce distractions, and prioritize sincere dua and repentance.\\n\\nPlan meals for moderation, maintain rest, and protect time for worship. The month’s purpose is taqwa—carrying its habits beyond Ramadan into everyday life."},{"title":"Zakat al-Fitr: Purpose and Rules","content":"Zakat al‑Fitr purifies the fasting person and supports the needy at Eid. It is due before the Eid prayer, paid in staple food or equivalent, on behalf of each dependent.\\n\\nKnowing local measures, organizing distribution early, and coordinating with trustworthy charities ensure timely benefit and communal joy."},{"title":"Umrah: A Practical Guide","content":"Umrah consists of ihram, tawaf, sa’i, and hair clipping. Prepare by learning the rites, keeping sincere intention, and respecting fellow pilgrims.\\n\\nMaintain patience, avoid disputes, recite talbiyah frequently, and focus on gratitude and dua at each stage for a transformative journey."},{"title":"Ethics of Halal Food and Consumption","content":"Halal consumption includes lawful ingredients, correct slaughter, and avoiding extravagance and waste. Read labels carefully, ask questions, and support transparent, ethical suppliers.\\n\\nModeration at meals, gratitude, and sharing food strengthen health, relationships, and awareness of Allah’s provision."},{"title":"Islamic Finance: Risk‑Sharing Contracts","content":"Islamic finance promotes partnership and asset‑backed trade over interest. Common contracts include Musharakah (equity partnership), Mudarabah (investment partnership), Murabahah (cost‑plus sale), and Ijarah (leasing).\\n\\nUnderstanding risk allocation, disclosures, and real‑economy linkage helps Muslims pursue lawful income and socially beneficial investment."},{"title":"Rights of Relatives (Silat ar‑Rahim)","content":"Maintaining family ties is an obligation. Islam encourages regular contact, gifts, reconciliation, and patient forbearance with relatives—even when difficult—while setting healthy boundaries against harm.\\n\\nHonoring kin strengthens identity, distributes support, and invites divine mercy and increased provision."},{"title":"Sadaqah Jariyah: Ongoing Charity","content":"Ongoing charity benefits a person after death through lasting projects like wells, schools, or knowledge. Even small contributions to sustainable causes can become continuous reward.\\n\\nChoose transparent initiatives, document intentions, and involve family so charitable impact and learning persist across generations."},{"title":"Quran Recitation: Tajwid Basics","content":"Tajwid preserves the precise pronunciation of Quranic letters and rules like noon sakin, meem sakin, and elongations. Learning from qualified teachers ensures accuracy and reverence.\\n\\nConsistent practice, slow recitation with reflection, and memorizing short surahs deepen love for the Quran and enhance prayer."},{"title":"Protective Supplications (Hisn al‑Muslim)","content":"Morning and evening adhkar, travel duas, and prayers for fear, illness, and grief are prophetic remedies for the heart. Memorize essential supplications and recite them with presence.\\n\\nLinking daily moments to remembrance builds resilience, gratitude, and constant reliance upon Allah."},{"title":"Avoiding Riba: Practical Alternatives","content":"To avoid interest, favor savings, partnerships, leasing, and trade‑based structures over conventional loans. Seek scholars’ advice, compare products, and read contracts carefully.\\n\\nLiving within means, delaying unnecessary purchases, and cultivating patience protect faith and financial stability."},{"title":"Marriage Conflict Resolution","content":"Healthy marriages use kind speech, active listening, fair expectations, and early mediation. Islam encourages private reconciliation, involving wise family or neutral experts when needed.\\n\\nCouples should renew intentions, pray together, and set routines for check‑ins, forgiveness, and quality time to rebuild trust and affection."},{"title":"Eid Etiquettes and Celebration","content":"Eid begins with bathing, wearing one’s best modest clothes, eating dates before Eid al‑Fitr prayer, and proclaiming takbirs. Visit family, give gifts, and spread joy without extravagance.\\n\\nRemember the needy, maintain good conduct, and keep celebrations halal and inclusive to strengthen communal bonds."},{"title":"Maintaining Salah at Work","content":"Plan around prayer times, politely request space for prayer, and keep a compact prayer mat and wudu kit. Short breaks and combining prayers when permitted support consistency.\\n\\nProfessionalism, discretion, and clear communication help integrate worship into busy schedules while maintaining good relations at work."},{"title":"Andalusian Legacy: Knowledge and Culture","content":"Muslim Spain nurtured advances in medicine, astronomy, agriculture, and architecture, transmitting knowledge to Europe. Cities like Cordoba and Granada modeled libraries, hospitals, and diverse coexistence.\\n\\nIts legacy encourages seeking knowledge, valuing beauty, and building institutions that serve faith and civilization."},{"title":"Hadith Methodology: An Introduction","content":"Hadith sciences study chains of transmission and text analysis to verify reports. Key areas include isnad evaluation, narrator reliability, and classification (sahih, hasan, daif).\\n\\nLearning basics fosters respect for scholarly rigor and protects against misinformation about the Prophet’s teachings."},{"title":"Aqidah: Names and Attributes of Allah","content":"Affirming Allah’s names and attributes as revealed—without distortion or denial—cultivates love, awe, and trust. Reflecting on meanings like Ar‑Rahman and Al‑Hakim shapes worship and character.\\n\\nStudying creed strengthens clarity about the Creator and anchors devotion in authentic understanding."},{"title":"Signs of the Last Day: Major and Minor","content":"Texts describe minor and major signs preceding the Day of Judgment. Muslims approach these with seriousness, avoiding speculation, and focusing on righteous action and preparedness.\\n\\nThe purpose of these signs is admonition and hope—motivating repentance, consistency in worship, and service to humanity."},{"title":"Ethical Investment Screens and Zakat on Stocks","content":"Muslim investors use financial and shariah screens to avoid riba-heavy firms, gambling, and harmful sectors. Where ownership exists, zakat may be due based on intention and asset type.\\n\\nConsult scholars and use reputable indices to align portfolios with faith while maintaining diversification and prudence.","tags":["Finance","Law","Ethics"],"primaryType":"Finance"},{"title":"Environmental Sunnah: Water and Waste","content":"Prophetic guidance encourages conserving water even at a flowing river, planting trees, and avoiding litter. Small daily habits—shorter ablutions, reusable containers—reflect stewardship (khalifah).\\n\\nCommunities can organize cleanups and tree-planting as sadaqah, linking environmental care to worship and gratitude.","tags":["Environment","Worship","Social Justice"],"primaryType":"Environment"},{"title":"Workplace Fiqh: Leaves, Breaks, and Holidays","content":"Navigating prayer breaks, Ramadan adjustments, Jumu’ah attendance, and Eid leave requires proactive communication and documented policies. Seek reasonable accommodation and propose practical schedules.\\n\\nProfessionalism and transparency build goodwill while safeguarding religious obligations.","tags":["Law","General","Worship"],"primaryType":"Law"},{"title":"Healthy Habits from the Prophetic Diet","content":"The Sunnah highlights moderation, mindful eating, sharing meals, and wholesome foods like dates, barley, and honey. Combine tradition with modern nutrition for balanced, sustainable health.\\n\\nGratitude before and after eating, sitting while drinking, and avoiding waste integrate spirituality with wellbeing.","tags":["Health","General","Ethics"],"primaryType":"Health"},{"title":"Introduction to Usul al‑Fiqh","content":"Usul al‑Fiqh studies sources and methods of deriving rulings—Quran, Sunnah, consensus, analogy, and maxims. Understanding it builds respect for scholarly differences and prudent application.\\n\\nBegin with core texts and guided study to appreciate how law preserves objectives and mercy.","tags":["Theology","Law","Education"],"primaryType":"Theology"},{"title":"Spiritual Retreats: I’tikaf and Seclusion","content":"I’tikaf in the last ten nights of Ramadan focuses on prayer, Quran, and reflection in the mosque. Short personal retreats during the year help renew intention and clarity.\\n\\nMinimize devices, plan essentials, and center the heart on remembrance for lasting benefit.","tags":["Worship","General","Theology"],"primaryType":"Worship"},{"title":"Civic Engagement and Muslim Citizenship","content":"Participate ethically in civic processes: voting where applicable, volunteering, and advocating for justice. Maintain integrity, avoid partisanship excess, and seek shared good.\\n\\nCommunity coalitions on education, poverty, and environment reflect prophetic concern for public welfare.","tags":["Social Justice","Community","Law"],"primaryType":"Social Justice"},{"title":"Digital Privacy and Security for Muslims","content":"Protect personal data, use strong passwords, and verify links. Islam prioritizes safeguarding trust and avoiding harm; privacy settings and consent reflect these values online.\\n\\nAudit app permissions and store sensitive files securely to align tech use with amanah (trust).","tags":["Technology","Ethics","General"],"primaryType":"Technology"}],"categories":{"Worship":["Essentials of Salah (Prayer)","Voluntary Night Worship: Tahajjud and Qiyam","Ramadan: Spiritual Goals and Practices","Zakat al-Fitr: Purpose and Rules","The Significance of Hajj (The Pilgrimage) in Islam","The Importance of Dhikr (Remembrance of Allah)","Purification and Cleanliness (Taharah) in Islam","The Five Pillars of Islam: A Guide to Religious Practices","The Importance of Dua (Supplication) in Islam","The Importance of Fasting in Islam","Quran Recitation: Tajwid Basics","Protective Supplications (Hisn al‑Muslim)","Maintaining Salah at Work","Umrah: A Practical Guide","The Concept of Sabr (Patience) in Worship"],"Family":["Marriage Contract (Nikah) Essentials","Marriage Conflict Resolution","Parenting and Tarbiyah in Islam","Rights of Relatives (Silat ar‑Rahim)","Islamic Family Law: Rights and Responsibilities","Islamic Views on Marriage and Family","Islamic Teachings on Respect for Elders"],"Finance":["Islamic Finance: Risk‑Sharing Contracts","Avoiding Riba: Practical Alternatives","Halal Investing and Modern Finance","Zakat: Calculation and Eligible Recipients","Islamic Perspective on Wealth and Charity","Islamic Views on Financial Transactions and Ethics","The Role of Islamic Charity (Sadaqah and Zakat)","Ethical Investment Screens and Zakat on Stocks"],"Law":["Wills and End-of-Life Matters (Wasiyah)","Employee and Employer Rights in Islam","Sulh and Arbitration: Reconciling Disputes","Rights of Non-Muslims in Islamic Society","Marriage Contract (Nikah) Essentials","Halal and Haram in Islam","Janazah: Funerals and Bereavement Etiquettes","Ethics of Halal Food and Consumption"],"Knowledge":["Hadith Methodology: An Introduction","Etiquettes of Seeking Knowledge (Adab al-Ilm)","Maqasid al-Shariah (Higher Objectives of Islamic Law)","The Role of the Quran in Islam","Islamic Education and Knowledge","The Importance of Knowledge in Islam","The Importance of Seeking Knowledge in Islam"],"Theology":["Aqidah: Names and Attributes of Allah","Maqasid al-Shariah (Higher Objectives of Islamic Law)","The Concept of Taqwa (God-Consciousness) in Islam","The Concept of Ihsan (Excellence) in Islam","The Concept of Tawhid (Monotheism) in Islam","Angels in Islam: Beliefs and Functions","The Concept of Prophethood in Islam","The Islamic Concept of the Afterlife (Akhirah)","The Islamic Concept of Afterlife and Resurrection","The Importance of Gratitude (Shukr) in Islam","The Concept of Gratitude (Shukr) in Islam","The Concept of Righteousness in Islam"],"Community":["Friday Prayer and Khutbah Etiquettes","Waqf (Endowments) and Community Benefit","Rights of Non-Muslims in Islamic Society","The Concept of Adab (Etiquette) in Islam","The Role of Mosques in Islam","Eid Etiquettes and Celebration","Islam and the Concept of Community (Ummah)","Islamic Teachings on Respect for Neighbors","Islamic Teachings on Community Service","The Importance of Unity in Islam"],"Ethics":["Ethics of Speech: Ghiba and Namima","Technology and Social Media: An Islamic Lens","Modesty and Dress (Haya) in Islam","Islamic Teachings on Honesty","Sadaqah Jariyah: Ongoing Charity","Islamic Ethics and Morality","Islamic Teachings on Humility","Islamic Teachings on Compassion","Islamic Teachings on Moderation","The Role of Intention (Niyyah) in Islam"],"Social Justice":["Islamic Teachings on Tolerance and Coexistence","Social Justice in Islam","Waqf (Endowments) and Community Benefit","Zakat: Calculation and Eligible Recipients","Guardianship of the Orphan (Kafalah) in Islam","The Role of Women in Islam","Islamic Views on Peace and Conflict Resolution","The Role of Charity in Building Community"],"Environment":["Islam and Environmental Stewardship","Islamic Teachings on Environmental Responsibility","Islamic Architecture and Urban Spaces","Environmental Sunnah: Water and Waste"],"History":["Seerah Focus: The Meccan Period","Seerah Focus: The Medinan Period","Andalusian Legacy: Knowledge and Culture","Islamic Calendar and Festivals","The Significance of the Night of Ascension (Isra and Miraj)","The Significance of the Night of Power (Laylat al-Qadr)"],"General":["Islamic Education and Knowledge","Islamic Manners of Disagreement (Adab al-Ikhtilaf)","Technology and Social Media: An Islamic Lens","Hospitality and Guest Rights","New Muslims: First Steps and Support","The Importance of Good Character in Islam","Islamic Views on Health and Well-Being","The Importance of Time Management in Islam"],"Technology":["Technology and Social Media: An Islamic Lens"],"Arts & Culture":["Islamic Art and Calligraphy","Islamic Architecture and Urban Spaces","Andalusian Legacy: Knowledge and Culture"],"Education":["Etiquettes of Seeking Knowledge (Adab al-Ilm)","Youth, Study, and Campus Life","Quran Recitation: Tajwid Basics","Islamic Education and Knowledge"],"Health":["Coping with Anxiety and Hardship","Islamic Views on Health and Well-Being"]}}');

/***/ })

}]);