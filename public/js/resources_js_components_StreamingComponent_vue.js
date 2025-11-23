"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_StreamingComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.mjs");
/* harmony import */ var _components_streaming_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/streaming.json */ "./resources/js/components/streaming.json");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'LiveChannels',
  data() {
    return {
      showFilters: true,
      showYouTubeModal: false,
      manualQuality: 'auto',
      userCountry: '',
      videoRatio: '16x9',
      selectedLanguage: 'all',
      selectedCategory: 'all',
      selectedTag: 'all',
      searchQuery: '',
      sortBy: 'name-asc',
      isLoading: false,
      streamError: false,
      selectedChannel: null,
      hlsInstance: null,
      isMiniScreen: false,
      isDragging: false,
      initialX: 0,
      initialY: 0,
      currentX: 0,
      currentY: 0,
      // Keyboard navigation state
      focusedIndex: 0,
      gridCols: 1,
      // Infinite scroll state
      visibleCount: 12,
      increaseBy: 8,
      isFetchingMore: false,
      bottomObserver: null,
      // Debounced search input
      debouncedQuery: '',
      searchDebounce: null,
      // Live region message for a11y
      liveMessage: '',
      favorites: [],
      showFavorites: true,
      alertMessage: '',
      channels: _components_streaming_json__WEBPACK_IMPORTED_MODULE_1__,
      geoQualityMap: ['US', 'CA', 'DE', 'SA', 'AE', 'UK', 'FR'],
      compactView: false
    };
  },
  computed: {
    filteredChannels() {
      let filtered = [...this.channels];
      if (this.debouncedQuery) {
        filtered = filtered.filter(channel => channel.name.toLowerCase().includes(this.debouncedQuery.toLowerCase()));
      }
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(channel => channel.category === this.selectedCategory);
      }
      if (this.selectedLanguage !== 'all') {
        filtered = filtered.filter(channel => channel.languages.includes(this.selectedLanguage));
      }
      if (this.selectedTag !== 'all') {
        filtered = filtered.filter(channel => channel.tags.includes(this.selectedTag));
      }
      switch (this.sortBy) {
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'viewers-desc':
          filtered.sort((a, b) => (b.viewers || 0) - (a.viewers || 0));
          break;
        case 'viewers-asc':
          filtered.sort((a, b) => (a.viewers || 0) - (b.viewers || 0));
          break;
      }
      return filtered;
    },
    visibleChannels() {
      return this.filteredChannels.slice(0, this.visibleCount);
    },
    hasMore() {
      return this.visibleCount < this.filteredChannels.length;
    },
    categories() {
      return [...new Set(this.channels.map(channel => channel.category))].sort();
    },
    languages() {
      return [...new Set(this.channels.flatMap(channel => channel.languages))].sort();
    },
    tags() {
      return [...new Set(this.channels.flatMap(channel => channel.tags))].sort();
    }
    // Removed page list computeds in favor of infinite scroll
  },
  watch: {
    alertMessage(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.alertMessage = '';
        }, 3000);
      }
    },
    // Debounce search input to reduce recomputes per keystroke
    searchQuery(newVal) {
      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(() => {
        this.debouncedQuery = newVal || '';
      }, 300);
    },
    filteredChannels() {
      // Reset infinite scroll window on filter/search change
      this.visibleCount = 12;
      this.$nextTick(() => this.setupBottomObserver());
    }
  },
  mounted() {
    // Initialize debounced query
    this.debouncedQuery = this.searchQuery || '';
    // Load persisted filter visibility
    try {
      const v = localStorage.getItem('showFilters');
      if (v !== null) this.showFilters = JSON.parse(v);
    } catch (e) {}
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteChannels') || '[]');
      this.favorites = storedFavorites.filter(fav => this.channels.some(channel => channel.name === fav.name));
      localStorage.setItem('favoriteChannels', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      this.favorites = [];
    }
    fetch('https://ipapi.co/json').then(res => res.json()).then(data => {
      this.userCountry = data.country_code;
    }).catch(() => {
      this.userCountry = '';
    });
    document.addEventListener('keydown', this.handleKeyboard);
    // Responsive columns for keyboard navigation
    this.updateGridCols();
    window.addEventListener('resize', this.updateGridCols);
    this.setupBottomObserver();
  },
  beforeUnmount() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    document.removeEventListener('keydown', this.handleKeyboard);
    window.removeEventListener('resize', this.updateGridCols);
    try {
      this.bottomObserver && this.bottomObserver.disconnect && this.bottomObserver.disconnect();
    } catch (e) {}
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
      try {
        localStorage.setItem('showFilters', JSON.stringify(this.showFilters));
      } catch (e) {}
    },
    focusSearch() {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus();
      }
    },
    updateGridCols() {
      try {
        // Bootstrap breakpoints: sm>=576px has 2 columns in this grid config
        this.gridCols = window.matchMedia('(min-width: 576px)').matches ? 2 : 1;
      } catch (e) {
        this.gridCols = 2;
      }
    },
    onCardFocus(index) {
      this.focusedIndex = index;
    },
    focusCard(index) {
      const items = this.$refs.channelItems || [];
      const el = items[index];
      if (el && typeof el.focus === 'function') {
        el.focus();
      }
      this.focusedIndex = index;
    },
    onCardKeydown(index, event) {
      const key = event.key;
      const cols = this.gridCols;
      const max = this.visibleChannels.length - 1;
      let target = null;
      if (key === 'ArrowRight') {
        target = Math.min(index + 1, max);
      } else if (key === 'ArrowLeft') {
        target = Math.max(index - 1, 0);
      } else if (key === 'ArrowDown') {
        target = Math.min(index + cols, max);
      } else if (key === 'ArrowUp') {
        target = Math.max(index - cols, 0);
      } else if (key === 'f' || key === 'F') {
        // Toggle favorite on focused card
        const channel = this.visibleChannels[index];
        if (channel) this.toggleFavorite(channel);
        event.preventDefault();
        return;
      } else if (key === '/') {
        // Quick focus search
        event.preventDefault();
        this.focusSearch();
        return;
      } else if (key === 'Enter' || key === ' ') {
        // Activate primary action in card (first interactive element)
        const items = this.$refs.channelItems || [];
        const el = items[index];
        if (el) {
          const interactive = el.querySelector('button, a');
          if (interactive && typeof interactive.click === 'function') {
            interactive.click();
          }
        }
        event.preventDefault();
        return;
      }
      if (target !== null && target !== index) {
        event.preventDefault();
        this.focusCard(target);
      }
    },
    setupBottomObserver() {
      if (this.bottomObserver) this.bottomObserver.disconnect();
      const options = {
        root: null,
        rootMargin: '400px',
        threshold: 0
      };
      this.bottomObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (!this.hasMore || this.isFetchingMore) return;
          this.isFetchingMore = true;
          requestAnimationFrame(() => {
            this.visibleCount = Math.min(this.visibleCount + this.increaseBy, this.filteredChannels.length);
            this.isFetchingMore = false;
          });
        });
      }, options);
      if (this.$refs.infiniteScrollSentinel) {
        this.bottomObserver.observe(this.$refs.infiniteScrollSentinel);
      }
    },
    // New WhatsApp Share Methods
    getWhatsAppShareUrl(channel) {
      const channelName = encodeURIComponent(channel.name);
      // Adjust the base URL to your actual channel page URL structure
      const baseUrl = encodeURIComponent(`https://yourwebsite.com/channel/${channel.name}`);
      const message = `Check out ${channelName} on our site! ${baseUrl}`;
      return `https://wa.me/?text=${message}`;
    },
    shareToWhatsApp(channel) {
      const url = this.getWhatsAppShareUrl(channel);
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    toggleFavoritesSection() {
      this.showFavorites = !this.showFavorites;
    },
    toggleFavorite(channel) {
      const wasFavorite = this.isFavorite(channel);
      this.favorites = this.favorites.filter(fav => fav.name !== channel.name);
      if (!wasFavorite) {
        this.favorites.push(channel);
        this.alertMessage = `${channel.name} has been added to favorites.`;
        this.liveMessage = `${channel.name} added to favorites`;
      } else {
        this.alertMessage = `${channel.name} has been removed from favorites.`;
        this.liveMessage = `${channel.name} removed from favorites`;
      }
      try {
        localStorage.setItem('favoriteChannels', JSON.stringify(this.favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    },
    clearFilters() {
      this.searchQuery = '';
      this.selectedCategory = 'all';
      this.selectedLanguage = 'all';
      this.selectedTag = 'all';
      this.sortBy = 'name-asc';
      this.liveMessage = 'All filters cleared';
    },
    playChannel(channel) {
      this.selectedChannel = channel;
      this.streamError = false;
      this.isLoading = true;
      if (channel.streamType === 'youtube_embed') {
        this.showYouTubeModal = true;
        this.isLoading = false;
      } else if (channel.streamType === 'hls') {
        this.playHLSStream(channel);
      } else {
        window.open(channel.youtubeChannel || channel.websiteUrl, '_blank');
        this.isLoading = false;
      }
    },
    playHLSStream(channel) {
      this.$nextTick(() => {
        const video = this.$refs.video;
        if (!video) {
          this.streamError = true;
          this.isLoading = false;
          return;
        }
        if (this.hlsInstance) {
          this.hlsInstance.destroy();
          this.hlsInstance = null;
        }
        video.pause();
        video.removeAttribute('src');
        let source = this.manualQuality === 'sd' ? channel.streamUrlSD : this.manualQuality === 'hd' ? channel.streamUrlHD : this.geoQualityMap.includes(this.userCountry) ? channel.streamUrlHD : channel.streamUrlSD;
        if (hls_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSupported()) {
          this.hlsInstance = new hls_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
            enableWorker: true,
            lowLatencyMode: true,
            capLevelToPlayerSize: true,
            backBufferLength: 30
          });
          this.hlsInstance.loadSource(source);
          this.hlsInstance.attachMedia(video);
          this.hlsInstance.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["default"].Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {
              this.streamError = true;
            });
            this.isLoading = false;
          });
          this.hlsInstance.on(hls_js__WEBPACK_IMPORTED_MODULE_0__["default"].Events.ERROR, (event, data) => {
            if (data.fatal) {
              this.streamError = true;
              this.isLoading = false;
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
          video.play().then(() => {
            this.isLoading = false;
          }).catch(() => {
            this.streamError = true;
            this.isLoading = false;
          });
        } else {
          this.streamError = true;
          this.isLoading = false;
        }
        this.scrollToPlayer();
      });
    },
    updateHLSStream() {
      if (this.selectedChannel && this.selectedChannel.streamType === 'hls') {
        this.playHLSStream(this.selectedChannel);
      }
    },
    closeYouTubeModal() {
      this.showYouTubeModal = false;
      this.selectedChannel = null;
      this.isLoading = false;
    },
    openExternal(url) {
      window.open(url, '_blank');
    },
    handleImageError(event) {
      const channelName = event.target.alt.replace(' thumbnail', '');
      event.target.src = `https://via.placeholder.com/400x200/4B5563/FFFFFF?text=${encodeURIComponent(channelName)}`;
    },
    scrollToPlayer() {
      const el = this.$refs.playerSection;
      if (el && !this.isMiniScreen) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    toggleScreenMode() {
      this.isMiniScreen = !this.isMiniScreen;
      if (!this.isMiniScreen) {
        this.currentX = 0;
        this.currentY = 0;
        if (this.$refs.video) {
          this.$refs.video.style.transform = 'none';
        }
        this.scrollToPlayer();
      }
    },
    startDrag(event) {
      if (this.isMiniScreen) {
        this.isDragging = true;
        this.initialX = event.clientX - this.currentX;
        this.initialY = event.clientY - this.currentY;
      }
    },
    endDrag() {
      this.isDragging = false;
    },
    dragVideo(event) {
      if (this.isDragging && this.isMiniScreen) {
        event.preventDefault();
        this.currentX = event.clientX - this.initialX;
        this.currentY = event.clientY - this.initialY;
        this.$refs.video.parentElement.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
      }
    },
    isFavorite(channel) {
      return this.favorites.some(fav => fav.name === channel.name);
    },
    enterPictureInPicture() {
      const video = this.$refs.video;
      if (document.pictureInPictureEnabled && video) {
        video.requestPictureInPicture().catch(err => {
          console.error('PiP failed:', err);
        });
      }
    },
    handleKeyboard(event) {
      // Global keyboard handler
      if (event.key === 'Escape' && this.showYouTubeModal) {
        this.closeYouTubeModal();
        return;
      }
      // Global shortcut to focus search from anywhere
      if (event.key === '/' && !event.target.closest('input, textarea')) {
        event.preventDefault();
        this.focusSearch();
      }
    },
    debugLink(url, linkType) {
      console.log(`Clicked ${linkType} link: ${url}`);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-5",
  role: "main"
};
const _hoisted_2 = {
  class: "mb-3"
};
const _hoisted_3 = {
  key: 0,
  class: "alert alert-success position-fixed alert-floating",
  role: "alert"
};
const _hoisted_4 = {
  class: "mb-5 p-3 filter-bar",
  "aria-label": "Channel filters",
  role: "region"
};
const _hoisted_5 = {
  class: "filters-header d-flex justify-content-between align-items-center mb-2"
};
const _hoisted_6 = ["aria-expanded"];
const _hoisted_7 = {
  class: "ms-1"
};
const _hoisted_8 = {
  class: "filter-grid text-center text-md-start"
};
const _hoisted_9 = {
  class: "fg-item fg-cat"
};
const _hoisted_10 = ["value"];
const _hoisted_11 = {
  class: "fg-item fg-lang"
};
const _hoisted_12 = ["value"];
const _hoisted_13 = {
  class: "fg-item fg-tag"
};
const _hoisted_14 = ["value"];
const _hoisted_15 = {
  class: "fg-item fg-sort"
};
const _hoisted_16 = {
  class: "fg-item fg-search"
};
const _hoisted_17 = {
  class: "input-group search-capsule"
};
const _hoisted_18 = {
  class: "fg-item fg-clear"
};
const _hoisted_19 = {
  class: "row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mb-2",
  "aria-label": "Channel grid",
  role: "list",
  "aria-labelledby": "all-channels-heading"
};
const _hoisted_20 = ["aria-labelledby", "onFocus", "onKeydown"];
const _hoisted_21 = {
  class: "card-teal shadow-lg"
};
const _hoisted_22 = {
  class: "channel-body body--regular ucard__body"
};
const _hoisted_23 = ["id"];
const _hoisted_24 = {
  class: "description-wrapper small mb-2"
};
const _hoisted_25 = {
  class: "description-text"
};
const _hoisted_26 = {
  class: "container mt-3 d-flex justify-content-between small text-muted meta-row"
};
const _hoisted_27 = {
  class: "mt-3"
};
const _hoisted_28 = {
  class: "badge bg-primary me-1"
};
const _hoisted_29 = {
  class: "card-actions text-center mt-3",
  role: "group",
  "aria-label": "Channel actions"
};
const _hoisted_30 = ["href", "onClick"];
const _hoisted_31 = ["href", "onClick"];
const _hoisted_32 = ["href", "onClick"];
const _hoisted_33 = ["href", "onClick"];
const _hoisted_34 = ["href", "onClick"];
const _hoisted_35 = {
  ref: "infiniteScrollSentinel",
  class: "w-100 sentinel",
  "aria-hidden": "true"
};
const _hoisted_36 = {
  key: 0,
  class: "text-center py-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", _hoisted_1, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-4 fw-bold"
  }, "Channel Guide"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead"
  }, " Discover and explore Islamic channels easily. This feature helps you connect with authentic Islamic content by directing you to each channel’s posts, playlists, and videos on YouTube, you can quickly find and access valuable resources all in one place. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region for polite updates "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "aria-live": "polite",
    role: "status",
    class: "visually-hidden",
    ref: "liveRegion"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.liveMessage), 513 /* TEXT, NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Alert Section (unchanged) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [$data.alertMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.alertMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Filter/Search Section with Min/Max (collapse/expand) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "fw-semibold pt-2 pl-2"
  }, "Filters", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-secondary toggle-filters",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleFilters && $options.toggleFilters(...args)),
    "aria-expanded": $data.showFilters,
    "aria-controls": 'filters-body'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.showFilters ? 'fas fa-chevron-up' : 'fas fa-chevron-down')
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.showFilters ? 'Hide' : 'Show'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_6)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: 'filters-body',
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["filters-body", {
      'is-open': $data.showFilters
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "filterCategory",
    class: "visually-hidden"
  }, "Filter by category", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "filterCategory",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.selectedCategory = $event),
    class: "form-select fancy-field"
  }, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All Categories", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.categories, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: category,
      value: category
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category), 9 /* TEXT, PROPS */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedCategory]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "filterLanguage",
    class: "visually-hidden"
  }, "Filter by language", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "filterLanguage",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.selectedLanguage = $event),
    class: "form-select fancy-field"
  }, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All Languages", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.languages, lang => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: lang,
      value: lang
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lang), 9 /* TEXT, PROPS */, _hoisted_12);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedLanguage]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "filterTag",
    class: "visually-hidden"
  }, "Filter by tag", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "filterTag",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.selectedTag = $event),
    class: "form-select fancy-field"
  }, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All Tags", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.tags, tag => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: tag,
      value: tag
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 9 /* TEXT, PROPS */, _hoisted_14);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedTag]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "sortBy",
    class: "visually-hidden"
  }, "Sort channels", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "sortBy",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.sortBy = $event),
    class: "form-select fancy-field"
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "name-asc"
  }, "Name (A-Z)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "name-desc"
  }, "Name (Z-A)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "viewers-desc"
  }, "Viewers (High to Low)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "viewers-asc"
  }, "Viewers (Low to High)", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortBy]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text bg-white border-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-search"
  })], -1 /* CACHED */)), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "channelSearch",
    class: "visually-hidden"
  }, "Search channels", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    ref: "searchInput",
    id: "channelSearch",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.searchQuery = $event),
    type: "text",
    class: "form-control fancy-field",
    placeholder: "Search channels..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary w-100 clear-btn",
    "aria-label": "Clear all filters",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.clearFilters && $options.clearFilters(...args))
  }, " Clear All Filters ")])])], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section v-if=\"favorites.length > 0\" class=\"mb-5\" aria-label=\"Favorite channels\" role=\"region\"\n      :aria-expanded=\"showFavorites\" :aria-labelledby=\"'favorites-heading'\">\n      <h2 class=\"fw-bold mb-3 d-flex align-items-center\">\n        <h2 aria-label=\"Toggle favorite channels section\" class=\"fw-bold mb-4 d-flex align-items-center\" @click=\"toggleFavoritesSection\" :aria-expanded=\"showFavorites\" aria-controls=\"favorites-panel\" id=\"all-channels-heading\">Favorite Channels ({{ favorites.length }}) <i :class=\"showFavorites ? 'fas fa-chevron-up ms-2' : 'fas fa-chevron-down ms-2'\"></i></h2>  \n      </h2>\n      <div v-if=\"showFavorites\" id=\"favorites-panel\"\n        class=\"row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4\" role=\"list\">\n        <article class=\"col\" v-for=\"(channel, index) in favorites\" :key=\"channel.name\" role=\"listitem\"\n          :aria-labelledby=\"`fav-title-${index}`\">\n          <div class=\"channel-card shadow-lg\">\n            <div class=\"ucard\" :class=\"{'ucard--compact': compactView}\">\n              -- Media/logo removed by request --\n              <button class=\"star-toggle ucard__star\" @click=\"toggleFavorite(channel)\" :aria-pressed=\"isFavorite(channel)\"\n                :aria-label=\"isFavorite(channel) ? 'Remove from favorites' : 'Add to favorites'\">\n                <i :class=\"isFavorite(channel) ? 'fas fa-star' : 'far fa-star'\" class=\"star-icon\"></i>\n              </button>\n              <div class=\"channel-body body--compact ucard__body\">\n              <h5 class=\"fw-bold mb-2\" :id=\"`fav-title-${index}`\">{{ channel.name }}</h5>\n              <div class=\"description-wrapper small mb-2\">\n                <p class=\"description-text\">{{ channel.description }}</p>\n              </div>\n              <div class=\"container mb-2 d-flex justify-content-between small text-muted meta-row\">\n                <span><i class=\"fas fa-users me-1\"></i>{{ channel.viewers || 'N/A' }} Joined</span>\n                <span><i class=\"fas fa-map-marker-alt me-1\"></i>{{ channel.location || 'Not specified' }}</span>\n                <span><i class=\"fas fa-clock me-1\"></i>{{ channel.schedule || 'No schedule' }}</span>\n              </div>\n              <div class=\"mb-2 chips-row\">\n                <span class=\"badge chip me-1\">{{ channel.category }}</span>\n                <span v-for=\"lang in channel.languages\" :key=\"lang\" class=\"badge chip me-1\">{{ lang }}</span>\n                <span v-for=\"tag in channel.tags\" :key=\"tag\" class=\"badge chip me-1\">{{ tag }}</span>\n              </div>\n              <div class=\"card-actions\">\n                <a v-if=\"channel.youtubeChannel\" :href=\"channel.youtubeChannel || '#'\" target=\"_blank\"\n                  rel=\"noopener noreferrer\" class=\"action-link\"\n                  title=\"YouTube Channel\" aria-label=\"Visit YouTube Channel\"\n                  @click=\"debugLink(channel.youtubeChannel, 'YouTube Channel')\">\n                  <i class=\"fab fa-youtube\"></i>\n                  <small>Channel</small>\n                </a>\n                <a v-if=\"channel.playlistUrl\" :href=\"channel.playlistUrl || '#'\" target=\"_blank\"\n                  rel=\"noopener noreferrer\" class=\"action-link\"\n                  title=\"Playlists\" aria-label=\"View Playlists\" @click=\"debugLink(channel.playlistUrl, 'Playlists')\">\n                  <i class=\"fas fa-list-ul\"></i>\n                  <small>Playlists</small>\n                </a>\n                <a v-if=\"channel.websiteUrl\" :href=\"channel.websiteUrl || '#'\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"action-link\"\n                  title=\"Website\" aria-label=\"Visit Website\" @click=\"debugLink(channel.websiteUrl, 'Website')\">\n                  <i class=\"fas fa-link\"></i>\n                  <small>Website</small>\n                </a>\n                <a v-if=\"channel.youtubeChannel\"\n                  :href=\"channel.youtubeChannel ? channel.youtubeChannel + '/videos' : '#'\" target=\"_blank\"\n                  rel=\"noopener noreferrer\" class=\"action-link\"\n                  title=\"Videos\" aria-label=\"View Videos\"\n                  @click=\"debugLink(channel.youtubeChannel + '/videos', 'Videos')\">\n                  <i class=\"fas fa-video\"></i>\n                  <small>Videos</small>\n                </a>\n                <a :href=\"getWhatsAppShareUrl(channel)\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"action-link\"\n                title=\"Videos\" aria-label=\"View Videos\"\n                @click.prevent=\"shareToWhatsApp(channel)\">\n                <i class=\"fas fa-share\"></i>\n                <small>Share</small>\n              </a>\n              </div>\n              </div>\n            </div>\n          </div>\n        </article>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" All Channels Section "), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-4 d-flex align-items-center",
    id: "all-channels-heading"
  }, "All Channels:", -1 /* CACHED */)), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "visually-hidden",
    id: "kbd-help"
  }, "Use arrow keys to move between channels. Press Enter to activate, F to toggle favorite, and slash to focus search.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visibleChannels, (channel, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      class: "col",
      key: channel.name,
      role: "listitem",
      ref_for: true,
      ref: "channelItems",
      tabindex: "0",
      "aria-labelledby": `chan-title-${index}`,
      onFocus: $event => $options.onCardFocus(index),
      onKeydown: $event => $options.onCardKeydown(index, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ucard", {
        'ucard--compact': $data.compactView
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Media/logo removed by request "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button class=\"star-toggle ucard__star\" @click=\"toggleFavorite(channel)\" :aria-pressed=\"isFavorite(channel)\"\n              :aria-label=\"isFavorite(channel) ? 'Remove from favorites' : 'Add to favorites'\">\n              <i :class=\"isFavorite(channel) ? 'fas fa-star' : 'far fa-star'\" class=\"star-icon\"></i>\n            </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "fw-bold mb-2",
      id: `chan-title-${index}`
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(channel.name), 9 /* TEXT, PROPS */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(channel.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-users me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(channel.viewers || 'N/A') + " Joined", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-clock me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(channel.schedule ? channel.schedule : 'No schedule'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-map-marker-alt me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(channel.location || 'Not specified'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(channel.category), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(channel.languages, lang => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: lang,
        class: "badge bg-secondary me-1"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lang), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(channel.tags, tag => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: tag,
        class: "badge bg-info text-dark me-1"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [channel.youtubeChannel ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: 0,
      href: channel.youtubeChannel || '#',
      target: "_blank",
      rel: "noopener noreferrer",
      class: "action-link",
      title: "YouTube Channel",
      "aria-label": "Visit YouTube Channel",
      onClick: $event => $options.debugLink(channel.youtubeChannel, 'YouTube Channel')
    }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fab fa-youtube"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Channel", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_30)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), channel.playlistUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: 1,
      href: channel.playlistUrl || '#',
      target: "_blank",
      rel: "noopener noreferrer",
      class: "action-link",
      title: "Playlists",
      "aria-label": "View Playlists",
      onClick: $event => $options.debugLink(channel.playlistUrl, 'Playlists')
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-list-ul"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Playlists", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_31)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <a v-if=\"channel.playlistUrl\" :href=\"channel.playlistUrl || '#'\" target=\"_blank\" rel=\"noopener noreferrer\"\n                style=\"display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;\"\n                title=\"Playlists\" aria-label=\"View Playlists\" @click=\"debugLink(channel.playlistUrl, 'Playlists')\">\n                <i style=\"font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;\" class=\"fas fa-inbox\"></i>\n                <small style=\"font-size: 0.8rem;\">Posts</small>\n              </a> "), channel.websiteUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: 2,
      href: channel.websiteUrl || '#',
      target: "_blank",
      rel: "noopener noreferrer",
      class: "action-link",
      title: "Website",
      "aria-label": "Visit Website",
      onClick: $event => $options.debugLink(channel.websiteUrl, 'Website')
    }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-link"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Website", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_32)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), channel.youtubeChannel ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: 3,
      href: channel.youtubeChannel ? channel.youtubeChannel + '/videos' : '#',
      target: "_blank",
      rel: "noopener noreferrer",
      class: "action-link",
      title: "Videos",
      "aria-label": "View Videos",
      onClick: $event => $options.debugLink(channel.youtubeChannel + '/videos', 'Videos')
    }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-video"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Videos", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_33)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: $options.getWhatsAppShareUrl(channel),
      target: "_blank",
      rel: "noopener noreferrer",
      class: "action-link",
      title: "Share",
      "aria-label": "Share channel via WhatsApp",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.shareToWhatsApp(channel), ["prevent"])
    }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-share"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_34)])])], 2 /* CLASS */)])], 40 /* PROPS, NEED_HYDRATION */, _hoisted_20);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Infinite Scroll Sentinel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, null, 512 /* NEED_PATCH */), $data.isFetchingMore ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_36, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n[data-v-670f86e6]:root {\n  --teal: #0bb89f;\n  --teal-600: #079e89;\n  --teal-700: #067e6e;\n  --mint-50: #e9fbf6;\n  --mint-100: #d3f7ef;\n  --ink: #0f172a;\n  --muted: #5b6470;\n}\n\n/* Modern filter bar */\n.filter-bar[data-v-670f86e6] {\n  background: linear-gradient(180deg, #ffffff, #f6fffc);\n  border: 1px solid var(--mint-100);\n  border-radius: 20px;\n  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);\n  backdrop-filter: saturate(1.1) blur(6px);\n  animation: barIn-670f86e6 360ms ease-out both;\n}\n@keyframes barIn-670f86e6 {\nfrom {\n    opacity: 0;\n    transform: translateY(-8px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.fancy-field[data-v-670f86e6] {\n  border-radius: 20px !important;\n  border: 1.5px solid #e2e8f0;\n  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.06);\n  transition: box-shadow .16s ease, transform .16s ease, border-color .16s ease;\n}\n.fancy-field[data-v-670f86e6]:focus {\n  border-color: var(--teal);\n  box-shadow: 0 6px 16px rgba(11, 184, 159, .20), 0 0 0 4px rgba(11, 184, 159, .15);\n  transform: translateY(-1px);\n}\n.search-capsule .input-group-text[data-v-670f86e6] {\n  border-radius: 20px 0 0 20px !important;\n}\n.clear-btn[data-v-670f86e6] {\n  border-radius: 20px !important;\n  box-shadow: 0 2px 8px rgba(16, 24, 40, .08);\n  transition: transform .16s, box-shadow .16s;\n}\n.clear-btn[data-v-670f86e6]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 8px 18px rgba(16, 24, 40, .12);\n}\n.clear-btn[data-v-670f86e6]:active {\n  transform: translateY(0);\n}\n.filters-header .toggle-filters[data-v-670f86e6] { border-radius: 20px; padding: 4px 10px;\n}\n.filters-body[data-v-670f86e6] { max-height: 0; overflow: hidden; transition: max-height .25s ease;\n}\n.filters-body.is-open[data-v-670f86e6] { max-height: 1200px;\n}\n.filter-grid[data-v-670f86e6] {\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: 12px;\n  align-items: center;\n}\n.fg-item[data-v-670f86e6] {\n  width: 100%;\n}\n@media (min-width: 992px) {\n\n  /* lg+ */\n.fg-cat[data-v-670f86e6],\n  .fg-lang[data-v-670f86e6],\n  .fg-tag[data-v-670f86e6],\n  .fg-sort[data-v-670f86e6] {\n    grid-column: span 3;\n}\n.fg-search[data-v-670f86e6] {\n    grid-column: span 9;\n}\n.fg-clear[data-v-670f86e6] {\n    grid-column: span 3;\n}\n}\n@media (min-width: 576px) and (max-width: 991.98px) {\n\n  /* sm–md */\n.fg-cat[data-v-670f86e6],\n  .fg-lang[data-v-670f86e6],\n  .fg-tag[data-v-670f86e6],\n  .fg-sort[data-v-670f86e6] {\n    grid-column: span 6;\n}\n.fg-search[data-v-670f86e6] {\n    grid-column: span 8;\n}\n.fg-clear[data-v-670f86e6] {\n    grid-column: span 4;\n}\n}\n@media (max-width: 575.98px) {\n\n  /* xs */\n.filter-grid[data-v-670f86e6] {\n    grid-template-columns: repeat(6, 1fr);\n}\n.fg-cat[data-v-670f86e6],\n  .fg-lang[data-v-670f86e6],\n  .fg-tag[data-v-670f86e6],\n  .fg-sort[data-v-670f86e6] {\n    grid-column: span 6;\n}\n.fg-search[data-v-670f86e6] {\n    grid-column: span 6;\n}\n.fg-clear[data-v-670f86e6] {\n    grid-column: span 6;\n}\n}\n.card-teal[data-v-670f86e6] {\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 166, 0.22);\n  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);\n  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n.card-teal[data-v-670f86e6]:hover { \n  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12);\n}\n\n/* .channel-card {\n  transition: transform 180ms ease, box-shadow 180ms ease;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);\n  border-radius: 20px;\n  border: 2px solid rgba(11, 184, 159, 0.22);\n  animation: cardIn 420ms cubic-bezier(.2, .8, .2, 1) both;\n   Solid background to remove bottom tint \n  background: #ffffff;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-height: 320px;\n  overflow: hidden;\n}\n\n.channel-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);\n} */\n\n/* Reusable Card module */\n.ucard[data-v-670f86e6] {\n  display: flex;\n  gap: 14px;\n  align-items: flex-start;\n  padding: 12px 12px 8px;\n  flex: 1 1 auto;\n}\n.ucard__media[data-v-670f86e6] {\n  width: 72px;\n  aspect-ratio: 1 / 1;\n  border-radius: 12px;\n  overflow: hidden;\n  background: #f8fafc;\n  position: relative;\n  flex: 0 0 auto;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);\n}\n.ucard__img[data-v-670f86e6] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.ucard__star[data-v-670f86e6] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  left: auto;\n  z-index: 2;\n}\n.ucard__body[data-v-670f86e6] {\n  flex: 1 1 auto;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n/* Compact variant */\n.ucard--compact .ucard__media[data-v-670f86e6] {\n  width: 56px;\n  border-radius: 10px;\n}\n.ucard--compact .ucard__body .description-wrapper[data-v-670f86e6] {\n  max-height: none;\n  overflow: visible;\n}\n.ucard--compact .badge[data-v-670f86e6] {\n  font-size: 0.72rem !important;\n  padding: 0.32em 0.6em !important;\n}\n.ucard--compact .card-actions[data-v-670f86e6] {\n  gap: 8px;\n}\n.channel-img[data-v-670f86e6] {\n  width: 100%;\n  height: 250px;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n\n/* Lightweight hover effects without JS handlers */\n.form-control[data-v-670f86e6]:hover,\n.form-select[data-v-670f86e6]:hover,\n.input-group-text[data-v-670f86e6]:hover,\n.btn[data-v-670f86e6]:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n\n/* Link actions under cards */\n.channel-body a[data-v-670f86e6] {\n  transition: transform .16s ease, background-color .16s ease;\n  border-radius: 12px;\n}\n.channel-body a[data-v-670f86e6]:hover {\n  transform: translateY(-2px);\n  background-color: #f6fffc;\n}\n\n/* Decorative subtle glow */\n.channel-card[data-v-670f86e6]::before {\n  content: \"\";\n  position: absolute;\n  inset: -2px;\n  border-radius: 22px;\n  pointer-events: none;\n  background: radial-gradient(120px 80px at 8% 6%, rgba(11, 184, 159, .18), transparent 60%),\n    radial-gradient(160px 100px at 96% 8%, rgba(11, 184, 159, .10), transparent 60%);\n  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);\n  -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);\n  padding: 2px;\n}\n\n/* Shared action grid for favorites and all */\n.card-actions[data-v-670f86e6] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  /* desktop default: single row */\n  gap: 8px;\n  justify-items: center;\n  align-items: end;\n  /* reduce extra whitespace under icons */\n}\n.card-actions .action-link[data-v-670f86e6] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 4px 8px;\n  /* tighter vertical padding */\n  min-width: 60px;\n  text-decoration: none;\n  color: var(--muted);\n  border-radius: 12px;\n  transition: transform .16s ease, background-color .16s ease;\n  text-align: center;\n}\n.card-actions .action-link[data-v-670f86e6]:hover {\n  background-color: var(--mint-50);\n  color: var(--teal-600);\n  transform: translateY(-1px);\n}\n.card-actions .action-link i[data-v-670f86e6] {\n  font-size: .95rem;\n  margin-bottom: 0;\n  line-height: 1;\n  color: currentColor;\n}\n.card-actions .action-link small[data-v-670f86e6] {\n  font-size: 0.8rem;\n  line-height: 1.1;\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  display: block;\n}\n\n/* Denser actions */\n.card-actions[data-v-670f86e6] {\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  padding: .4rem 10px 0;\n  margin-top: auto;\n  width: 100%;\n  min-height: 60px;\n  box-sizing: border-box;\n}\n.card-actions .action-link[data-v-670f86e6] {\n  padding: 6px;\n}\n\n/* Tidy text & meta */\n.channel-body h5[data-v-670f86e6] {\n  margin-bottom: .35rem;\n  letter-spacing: .2px;\n  color: var(--ink);\n}\n.channel-body .description-wrapper[data-v-670f86e6] {\n  color: #475569;\n}\n.meta-row[data-v-670f86e6] {\n  margin-top: .35rem !important;\n  padding-top: .5rem !important;\n  border-top: 1px dashed rgba(0, 0, 0, 0.08);\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, max-content));\n  -moz-column-gap: 16px;\n       column-gap: 16px;\n  row-gap: 6px;\n  align-items: center;\n}\n.meta-row span[data-v-670f86e6] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: #6b7280;\n  white-space: nowrap;\n}\n@media (min-width: 768px) {\n.meta-row[data-v-670f86e6] {\n    grid-template-columns: repeat(3, max-content);\n}\n.meta-row span+span[data-v-670f86e6]::before {\n    content: '•';\n    margin: 0 8px 0 0;\n    color: #cbd5e1;\n}\n}\n.meta-row i[data-v-670f86e6] {\n  color: #94a3b8;\n}\n.card-actions[data-v-670f86e6] {\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  padding-top: .5rem;\n}\n\n/* Image wrapper sizing helpers */\n.img-wrapper--sm[data-v-670f86e6] {\n  width: 20%;\n  height: 50px;\n}\n.img-wrapper--md[data-v-670f86e6] {\n  width: 50px;\n  height: 50px;\n}\n\n/* Star toggle explicit classes (work with generic overrides) */\n.star-toggle[data-v-670f86e6] {\n  background: none;\n  border: 0;\n  backdrop-filter: blur(4px);\n  background: rgba(255, 255, 255, .6);\n  border-radius: 999px;\n  padding: 4px;\n}\n.star-icon[data-v-670f86e6] {\n  color: #ffc107;\n  font-size: 1.6rem;\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .12));\n}\n\n/* Focus-within elevation for keyboard users */\n.channel-card[data-v-670f86e6]:focus-within {\n  box-shadow: 0 0 0 4px rgba(11, 184, 159, .18), 0 14px 30px rgba(0, 0, 0, .16);\n}\n\n/* Underlined link utility for Read More/Less */\n.link-underline[data-v-670f86e6] {\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n\n/* Infinite scroll sentinel */\n.sentinel[data-v-670f86e6] {\n  height: 1px;\n}\n\n/* Floating alert position */\n.alert-floating[data-v-670f86e6] {\n  top: 70px;\n  right: 15px;\n  z-index: 1050;\n  max-width: 400px;\n  margin: 0;\n}\n\n/* Action grid + links (override inline via !important) */\n[role=\"group\"][aria-label=\"Channel actions\"][data-v-670f86e6] {\n  display: grid !important;\n  grid-template-columns: repeat(5, 1fr) !important;\n  /* desktop default: single row */\n  gap: 10px !important;\n  justify-items: center !important;\n  align-items: center !important;\n}\n[role=\"group\"][aria-label=\"Channel actions\"] a[data-v-670f86e6] {\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  padding: 4px 8px !important;\n  min-width: 60px !important;\n  text-decoration: none !important;\n  color: var(--muted) !important;\n  border-radius: 12px !important;\n  transition: transform .16s ease, background-color .16s ease !important;\n  text-align: center !important;\n}\n[role=\"group\"][aria-label=\"Channel actions\"] a[data-v-670f86e6]:hover {\n  background-color: var(--mint-50) !important;\n  color: var(--teal-600) !important;\n  transform: translateY(-1px) !important;\n}\n[role=\"group\"][aria-label=\"Channel actions\"] a i[data-v-670f86e6] {\n  font-size: 1rem !important;\n  margin-bottom: 2px !important;\n  color: currentColor !important;\n}\n[role=\"group\"][aria-label=\"Channel actions\"] a small[data-v-670f86e6] {\n  font-size: 0.78rem !important;\n}\n\n/* Legacy image-wrapper star styles removed in favour of .ucard__star */\n\n/* Body paddings */\n.body--regular[data-v-670f86e6] {\n  padding: 15px !important;\n}\n.body--compact[data-v-670f86e6] {\n  padding: 12px !important;\n}\n\n/* .channel-gradient {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 15%;\n  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);\n} */\n.badge[data-v-670f86e6] {\n  border-radius: 20px !important;\n  padding: 0.45em 0.8em !important;\n  font-weight: 600;\n  font-size: 0.8rem;\n}\n.badge.bg-primary[data-v-670f86e6] {\n  background-color: var(--teal) !important;\n  color: #083a36 !important;\n}\n.badge.bg-secondary[data-v-670f86e6] {\n  background-color: #747e89 !important;\n  color: #fff !important;\n}\n.badge.bg-info[data-v-670f86e6] {\n  background-color: var(--mint-50) !important;\n  color: var(--teal-700) !important;\n}\n\n/* Compact chips */\n.chips-row[data-v-670f86e6] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n}\n.chip[data-v-670f86e6] {\n  background: var(--mint-50) !important;\n  color: var(--teal-700) !important;\n  border-radius: 999px !important;\n  padding: .3em .7em !important;\n  font-weight: 600;\n}\n.chips-row .chip[data-v-670f86e6]:first-child {\n  background: var(--teal) !important;\n  color: #083a36 !important;\n}\n\n/* Description clamp removed: full text shown */\n.clamp-1[data-v-670f86e6] { display: block; overflow: visible;\n}\n\n/* Keep text visible on all sizes; force two-line action layout on xs */\n\n/* Phones: two columns (2 x 3 layout if 6 items) */\n@media (max-width: 575.98px) {\n.card-actions[data-v-670f86e6] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 8px;\n}\n.card-actions .action-link[data-v-670f86e6] {\n    padding: 6px 6px;\n}\n}\n\n/* Tablet: keep two rows (3 + 2) */\n@media (min-width: 768px) and (max-width: 991.98px) {\n.card-actions[data-v-670f86e6] {\n    grid-template-columns: repeat(3, 1fr);\n    min-height: 84px;\n}\n[role=\"group\"][aria-label=\"Channel actions\"][data-v-670f86e6] {\n    grid-template-columns: repeat(3, 1fr) !important;\n}\n}\n\n/* Remove overly strong hover scale from old styles */\n\n/* Pagination Styles */\n.pagination[data-v-670f86e6] {\n  margin-top: 1.5rem;\n}\n.pagination .page-item .page-link[data-v-670f86e6] {\n  border-radius: 8px;\n  margin: 0 4px;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  font-weight: 500;\n  color: #000000;\n  border: 1px solid #000000;\n  transition: all 0.2s ease;\n  min-width: 40px;\n  text-align: center;\n}\n\n/* ===== Responsive layout polish ===== */\n@media (max-width: 575.98px) {\n.card-actions[data-v-670f86e6] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 8px;\n}\n.card-actions .action-link[data-v-670f86e6] {\n    padding: 6px 6px;\n}\n.card-actions .action-link i[data-v-670f86e6] {\n    font-size: 1rem;\n}\n.card-actions .action-link small[data-v-670f86e6] {\n    font-size: 0.78rem;\n}\n.badge[data-v-670f86e6] {\n    font-size: 0.78rem !important;\n    padding: 0.35em 0.7em !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767.98px) {\n.card-actions[data-v-670f86e6] {\n    grid-template-columns: repeat(3, 1fr);\n}\n[role=\"group\"][aria-label=\"Channel actions\"][data-v-670f86e6] {\n    grid-template-columns: repeat(3, 1fr) !important;\n}\n}\n\n/* Motion safety */\n@media (prefers-reduced-motion: reduce) {\n.filter-bar[data-v-670f86e6],\n  .channel-card[data-v-670f86e6],\n  .card-actions .action-link[data-v-670f86e6],\n  [role=\"group\"][aria-label=\"Channel actions\"] a[data-v-670f86e6] {\n    animation: none !important;\n    transition: none !important;\n    transform: none !important;\n}\n}\n.pagination .page-item.active .page-link[data-v-670f86e6] {\n  background-color: #00bfa6;\n  border-color: #00bfa6;\n  color: #ffffff;\n}\n.pagination .page-item:not(.disabled) .page-link[data-v-670f86e6]:hover {\n  background-color: #e6f7f5;\n  border-color: #00bfa6;\n  color: #00bfa6;\n  transform: translateY(-2px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.pagination .page-item.disabled .page-link[data-v-670f86e6] {\n  color: #6c757d;\n  cursor: not-allowed;\n  background-color: #ffffff;\n  border-color: #000000;\n}\n@keyframes pulse-shadow-670f86e6 {\n0% {\n    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);\n}\n50% {\n    box-shadow: 0 8px 24px rgba(255, 0, 0, 0.5);\n}\n100% {\n    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);\n}\n}\n.description-wrapper[data-v-670f86e6] {\n  overflow: hidden;\n  transition: max-height 0.3s ease-in-out;\n  max-height: 6em;\n}\n.description-wrapper.expanded[data-v-670f86e6] {\n  max-height: 23em;\n}\n.description-text[data-v-670f86e6] {\n  margin: 0;\n  display: inline;\n}\n.read-more[data-v-670f86e6] {\n  color: #00695c;\n  /* darker teal for better contrast on light bg */\n  font-size: 0.8rem;\n  text-decoration: none;\n  transition: color 0.2s, text-decoration-color 0.2s;\n}\n.read-more[data-v-670f86e6]:hover,\n.read-more[data-v-670f86e6]:focus,\n.read-more[data-v-670f86e6]:focus-visible {\n  color: #00564d;\n  text-decoration: underline;\n  text-decoration-color: currentColor;\n}\n@media (max-width: 576px) {\n.pagination .page-item .page-link[data-v-670f86e6] {\n    padding: 0.4rem 0.8rem;\n    font-size: 0.9rem;\n    min-width: 32px;\n}\n.description-wrapper[data-v-670f86e6] {\n    max-height: 3em;\n}\n.description-wrapper.expanded[data-v-670f86e6] {\n    max-height: 15em;\n}\n.container[data-v-670f86e6] {\n    padding: 15px;\n}\n.channel-card[data-v-670f86e6] {\n    margin-bottom: 15px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n  /* .channel-img-wrapper {\n    height: 280px;\n  } */\n  /* .favorites-section .channel-img-wrapper {\n    height: 160px;\n  } */\n.channel-body[data-v-670f86e6] {\n    padding: 10px;\n}\n.favorites-section .channel-body[data-v-670f86e6] {\n    padding: 8px;\n}\n.fw-bold.display-4[data-v-670f86e6] {\n    font-size: 1.8rem;\n}\n.lead[data-v-670f86e6] {\n    font-size: 1rem;\n    max-width: 100%;\n}\n.alert[data-v-670f86e6] {\n    max-width: calc(100% - 30px);\n    font-size: 0.9rem;\n    top: 70px;\n    right: 15px;\n}\n.channel-body h5[data-v-670f86e6] {\n    font-size: 1.1rem;\n}\n.favorites-section .channel-body h5[data-v-670f86e6] {\n    font-size: 1rem;\n}\n.channel-body p[data-v-670f86e6],\n  .channel-body .small[data-v-670f86e6] {\n    font-size: 0.85rem;\n}\n.favorites-section .channel-body p[data-v-670f86e6],\n  .favorites-section .channel-body .small[data-v-670f86e6] {\n    font-size: 0.8rem;\n}\n.channel-body .badge[data-v-670f86e6] {\n    font-size: 0.65rem;\n}\n.favorites-section .channel-body .badge[data-v-670f86e6] {\n    font-size: 0.6rem;\n}\n.channel-body a[data-v-670f86e6] {\n    min-width: 50px;\n    padding: 6px;\n    color: #495057 !important;\n    /* improve contrast vs light backgrounds */\n}\n.favorites-section .channel-body a[data-v-670f86e6] {\n    min-width: 45px;\n    padding: 5px;\n}\n.channel-body a i[data-v-670f86e6] {\n    font-size: 1rem;\n    color: #495057 !important;\n    /* sync icon color with text for contrast */\n}\n.favorites-section .channel-body a i[data-v-670f86e6] {\n    font-size: 0.9rem;\n}\n.channel-body a small[data-v-670f86e6] {\n    font-size: 0.7rem;\n    color: inherit;\n    /* inherit the higher-contrast link color */\n}\n.favorites-section .channel-body a small[data-v-670f86e6] {\n    font-size: 0.65rem;\n}\n.bg-light[data-v-670f86e6] {\n    padding: 15px !important;\n}\n.form-control[data-v-670f86e6],\n  .form-select[data-v-670f86e6],\n  .input-group-text[data-v-670f86e6] {\n    font-size: 0.9rem;\n    border-radius: 8px !important;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);\n}\n.form-control[data-v-670f86e6]:hover,\n  .form-select[data-v-670f86e6]:hover,\n  .input-group-text[data-v-670f86e6]:hover {\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n}\ninput.form-control[data-v-670f86e6],\nselect.form-select[data-v-670f86e6] {\n  font-size: 0.9rem;\n}\n\n/* Reduced motion */\n@media (prefers-reduced-motion: reduce) {\n.card[data-v-670f86e6]:hover {\n    transform: none;\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n.btn-primary[data-v-670f86e6]:hover,\n  .btn-outline-danger[data-v-670f86e6]:hover,\n  .btn-outline-secondary[data-v-670f86e6]:hover,\n  .btn-outline-success[data-v-670f86e6]:hover,\n  .btn-outline-primary[data-v-670f86e6]:hover {\n    transform: none;\n}\n.mini-screen[data-v-670f86e6] {\n    transition: none;\n    animation: none;\n}\n.animate__fadeInDown[data-v-670f86e6],\n  .animate__fadeInUp[data-v-670f86e6],\n  .animate__zoomIn[data-v-670f86e6],\n  .animate__shakeX[data-v-670f86e6],\n  .animate__rotate[data-v-670f86e6] {\n    animation: none;\n}\n}\n.channel-body a[data-v-670f86e6] {\n  color: #495057 !important;\n}\n.channel-body a i[data-v-670f86e6] {\n  color: inherit !important;\n}\n.channel-body a small[data-v-670f86e6] {\n  color: inherit;\n}\n.channel-card h5[data-v-670f86e6] {\n  font-size: 1.4rem;\n  /* larger title */\n}\n.channel-card .description[data-v-670f86e6] {\n  font-size: 1rem;\n}\n.channel-card .small-text[data-v-670f86e6] {\n  font-size: 0.95rem;\n}\n.channel-card .btn[data-v-670f86e6] {\n  font-size: 1rem;\n}\n.card h5[data-v-670f86e6] {\n  font-size: 1.25rem;\n  /* slightly larger */\n  font-weight: 700;\n  /* bold, stronger emphasis */\n  color: #212529;\n  /* consistent dark text */\n  margin-bottom: 0.5rem;\n}\n\n/* Card meta info (address, viewers, stream type) */\n.card p[data-v-670f86e6] {\n  font-size: 0.9rem;\n  font-weight: 400;\n  color: #6c757d;\n  /* muted gray */\n  margin-bottom: 0.35rem;\n  line-height: 1.4;\n}\n.card p i[data-v-670f86e6] {\n  font-size: 0.9rem;\n  margin-right: 0.35rem;\n}\n\n/* Emphasis for important numbers */\n.card p span[data-v-670f86e6] {\n  font-weight: 600;\n  color: #212529;\n}\n\n/* Accessibility: ensure outline-secondary has sufficient contrast on bg-light */\n.btn.btn-outline-secondary[data-v-670f86e6] {\n  color: #495057 !important;\n  /* darker than #6c757d for 4.5:1 on #f8f9fa */\n  border-color: #495057 !important;\n}\n.btn.btn-outline-secondary[data-v-670f86e6]:focus,\n.btn.btn-outline-secondary[data-v-670f86e6]:hover {\n  color: #ffffff !important;\n  background-color: #495057 !important;\n  border-color: #495057 !important;\n}\n\n/* Badge styles */\n.badge[data-v-670f86e6] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45em 0.8em;\n  border-radius: 20px;\n}\n.badge.bg-primary[data-v-670f86e6] {\n  background-color: var(--teal) !important;\n  color: #083a36 !important;\n}\n.badge.bg-secondary[data-v-670f86e6] {\n  background-color: #747e89 !important;\n  color: #ffffff !important;\n}\n.badge.bg-info[data-v-670f86e6] {\n  background-color: var(--mint-50) !important;\n  color: var(--teal-700) !important;\n}\n\n/* Buttons inside cards */\n.card .btn[data-v-670f86e6] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  border-radius: 50px;\n  padding: 0.5rem 1rem;\n}\n.card .btn-success[data-v-670f86e6] {\n  background-color: #00bfa6;\n  border-color: #00bfa6;\n}\n.card .btn-success[data-v-670f86e6]:hover {\n  background-color: #009688;\n  border-color: #009688;\n}\n\n/* Card hover enhancement */\n.card[data-v-670f86e6]:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);\n}\n\n/* Subtle reveal for cards when entering viewport */\n.row[aria-label=\"Channel grid\"] [role=\"listitem\"] .channel-card[data-v-670f86e6] {\n  animation: cardIn-670f86e6 420ms cubic-bezier(.2, .8, .2, 1) both;\n}\n@keyframes cardIn-670f86e6 {\nfrom {\n    opacity: 0;\n    transform: translateY(12px) scale(.985);\n}\nto {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_style_index_0_id_670f86e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_style_index_0_id_670f86e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_style_index_0_id_670f86e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/StreamingComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/StreamingComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StreamingComponent_vue_vue_type_template_id_670f86e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true */ "./resources/js/components/StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true");
/* harmony import */ var _StreamingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StreamingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/StreamingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _StreamingComponent_vue_vue_type_style_index_0_id_670f86e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css */ "./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_StreamingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_StreamingComponent_vue_vue_type_template_id_670f86e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-670f86e6"],['__file',"resources/js/components/StreamingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/StreamingComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/StreamingComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StreamingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_style_index_0_id_670f86e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=style&index=0&id=670f86e6&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_template_id_670f86e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StreamingComponent_vue_vue_type_template_id_670f86e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StreamingComponent.vue?vue&type=template&id=670f86e6&scoped=true");


/***/ }),

/***/ "./resources/js/components/streaming.json":
/*!************************************************!*\
  !*** ./resources/js/components/streaming.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"name":"Peace TV English","youtubeChannel":"https://www.youtube.com/@peacetvenglish214","websiteUrl":"https://www.peacetv.tv/en","playlistUrl":"https://www.youtube.com/@peacetvenglish214/playlists","postUrl":"https://www.youtube.com/@peacetvenglish214/playlists","videoUrl":"https://www.youtube.com/@peacetvenglish214/videos","thumbnail":"/images/food.png","description":"24-hours Islamic TV channel broadcasting “Free to Air” state-of-the-art TV Programmes in English and Urdu. The TV programmes feature internationally famous scholars and orators.","languages":["English"],"category":"Educational","tags":["Lectures","Dawah","Zakir Naik"],"streamType":"external","Joined":"7 Aug 2018","schedule":"Daily 8 PM","location":"Bangladesh"},{"name":"One Islam TV","youtubeChannel":"https://www.youtube.com/@OneIslamProductions","websiteUrl":"https://www.oneislam.tv","playlistUrl":"https://www.youtube.com/@OneIslamProductions/playlists","postUrl":"https://www.youtube.com/@OneIslamProductions/posts","thumbnail":"/images/food.png","description":"High-quality Islamic educational content with zero ads, 100% halal programming, and music-free videos.","languages":["English"],"category":"Educational","tags":["Halal","Education","No Ads"],"streamType":"external","Joined":850,"schedule":"24/7","location":"Australia"},{"name":"Madani Channel","youtubeChannel":"https://www.youtube.com/@MadaniChannelOfficial","websiteUrl":"https://www.madanichannel.tv","playlistUrl":"https://www.youtube.com/@MadaniChannelOfficial/playlists","postUrl":"https://www.youtube.com/@MadaniChannelOfficial/posts","thumbnail":"/images/food.png","description":"Popular Pakistani Islamic channel offering diverse Islamic programs, live events, and educational content in Urdu.","languages":["Urdu","Arabic"],"category":"Educational","tags":["Programs","Events","Urdu"],"streamType":"external","Joined":2000,"schedule":"Daily 6 PM","location":"Pakistan"},{"name":"Al Jazeera Mubasher","youtubeChannel":"https://www.youtube.com/@aljazeeramubasher","websiteUrl":"https://mubasher.aljazeera.net","playlistUrl":"https://www.youtube.com/@aljazeeramubasher/playlists","postUrl":"https://www.youtube.com/@aljazeeramubasher/posts","thumbnail":"/images/food.png","description":"Live Arabic news and Islamic programming from Al Jazeera, including daily prayers, religious discussions, and Islamic events.","languages":["Arabic"],"category":"News & Current Affairs","tags":["News","Prayers","Events"],"streamType":"external","Joined":5000,"schedule":"24/7","location":"Qatar"},{"name":"Iqraa TV","youtubeChannel":"https://www.youtube.com/@iqraa","websiteUrl":"https://iqraa.com/","playlistUrl":"https://www.youtube.com/@iqraa/playlists","postUrl":"https://www.youtube.com/@iqraa/posts","thumbnail":"/images/food.png","description":"Leading Arabic Islamic channel offering Quranic recitations, religious programs, and Islamic documentaries.","languages":["Arabic"],"category":"Quran","tags":["Quran","Documentaries","Programs"],"streamType":"external","Joined":1500,"schedule":"Daily 7 AM","location":"SA"},{"name":"Al-Resalah TV","youtubeChannel":"https://www.youtube.com/@alresalahnet","websiteUrl":"https://alresalah.net","playlistUrl":"https://www.youtube.com/@alresalahnet/playlists","postUrl":"https://www.youtube.com/@alresalahnet/podcasts","thumbnail":"/images/food.png","description":"Popular Arabic Islamic channel featuring religious dramas, educational programs, and live Islamic events.","languages":["Arabic"],"category":"Entertainment","tags":["Dramas","Events","Education"],"streamType":"external","Joined":3000,"schedule":"24/7","location":"SA"},{"name":"Mufti Menk","youtubeChannel":"https://www.youtube.com/@muftimenkofficial","websiteUrl":"https://muftimenk.com/","playlistUrl":"https://www.youtube.com/@muftimenkofficial/playlists","postUrl":"https://www.youtube.com/@muftimenkofficial/posts","thumbnail":"/images/food.png","description":"Inspirational Islamic lectures and guidance by Mufti Ismail Menk, covering various aspects of Islamic life.","languages":["English","Arabic"],"category":"Educational","tags":["Lectures","Inspiration","Mufti Menk"],"streamType":"external","Joined":2500,"schedule":"Daily 9 PM","location":"Zimbabwe"},{"name":"Digital Mimbar","youtubeChannel":"https://www.youtube.com/@khalifahklothing","websiteUrl":"https://digitalmimbar.com","playlistUrl":"https://www.youtube.com/@khalifahklothing/playlists","postUrl":"https://www.youtube.com/@khalifahklothing/posts","thumbnail":"/images/food.png","description":"Modern Islamic content platform providing digital Islamic education and spiritual guidance.","languages":["English"],"category":"Educational","tags":["Digital","Education","Guidance"],"streamType":"external","Joined":1100,"schedule":"Weekly","location":"Global"},{"name":"Quran Weekly","youtubeChannel":"https://www.youtube.com/@QuranWeekly","websiteUrl":"https://quranweekly.com","playlistUrl":"https://www.youtube.com/@QuranWeekly/playlists","postUrl":"https://www.youtube.com/@QuranWeekly/podcasts","thumbnail":"/images/food.png","description":"Weekly Quranic reflections and Islamic educational content featuring various Islamic scholars.","languages":["English"],"category":"Quran","tags":["Quran","Reflections","Scholars"],"streamType":"external","Joined":1300,"schedule":"Weekly","location":"USA"},{"name":"The Mad Mamluks","youtubeChannel":"https://www.youtube.com/@TheMadMamluks","websiteUrl":"https://www.themadmamluks.com","playlistUrl":"https://www.youtube.com/@TheMadMamluks/playlists","postUrl":"https://www.youtube.com/@TheMadMamluks/posts","thumbnail":"/images/food.png","description":"Comprehensive Islamic resource providing prayer times, Qibla direction, and Islamic educational content.","languages":["English","Arabic","Urdu"],"category":"Educational","tags":["Prayer Times","Qibla","Education"],"streamType":"external","Joined":1700,"schedule":"24/7","location":"Global"},{"name":"Muslim Central","youtubeChannel":"https://www.youtube.com/@MuslimCentral","websiteUrl":"https://muslimcentral.com","playlistUrl":"https://www.youtube.com/@MuslimCentral/playlists","postUrl":"https://www.youtube.com/@MuslimCentral/posts","thumbnail":"/images/food.png","description":"Comprehensive Islamic audio and video library featuring lectures by renowned Islamic scholars worldwide.","languages":["English"],"category":"Educational","tags":["Lectures","Library","Scholars"],"streamType":"external","Joined":2200,"schedule":"24/7","location":"Global"},{"name":"Merciful Servant","youtubeChannel":"https://www.youtube.com/@TheMercifulServant","websiteUrl":"https://muslimcentral.com","playlistUrl":"https://www.youtube.com/@TheMercifulServant/playlists","postUrl":"https://www.youtube.com/@TheMercifulServant/posts","thumbnail":"/images/food.png","description":"The worlds leading Islamic Channel in English (all Praise is due to Allah) and the muslims who have collectively built this channel with their content and hard work.","languages":["English"],"category":"Educational","tags":["Lectures","Library","Scholars"],"streamType":"external","Joined":2200,"schedule":"24/7","location":"Global"},{"name":"Hi-Tech Islamic Naat","youtubeChannel":"https://www.youtube.com/@hitechislamic","websiteUrl":"https://www.hitechislamic.com","playlistUrl":"https://www.youtube.com/@hitechislamic/playlists","postUrl":"https://www.youtube.com/@hitechislamic/posts","videoUrl":"https://www.youtube.com/@hitechislamic/videos","thumbnail":"/images/food.png","description":"WELCOME to the HI-TECH ISLAMIC channel. The World\'s leading Islamic record label Est. 1989.","languages":["English","Urdu"],"category":"Music","tags":["Naat","Islamic Songs","Record Label"],"streamType":"external","Joined":15200,"schedule":"Daily","location":"Pakistan"},{"name":"Omar & Hana - Islamic Children\'s Song","youtubeChannel":"https://www.youtube.com/@OmarandHanaOfficial","websiteUrl":"https://www.omarhana.com","playlistUrl":"https://www.youtube.com/@OmarandHanaOfficial/playlists","postUrl":"https://www.youtube.com/@OmarandHanaOfficial/posts","videoUrl":"https://www.youtube.com/@OmarandHanaOfficial/videos","thumbnail":"/images/food.png","description":"Join Omar & Hana as they explore and learn about Islam in a fun way through songs!","languages":["English"],"category":"Kids","tags":["Children\'s Songs","Islamic Education","Fun Learning"],"streamType":"external","Joined":7800,"schedule":"Weekly","location":"Malaysia"},{"name":"Popular Islam","youtubeChannel":"https://www.youtube.com/@IslamPopuler","websiteUrl":"","playlistUrl":"https://www.youtube.com/@IslamPopuler/playlists","postUrl":"https://www.youtube.com/@IslamPopuler/posts","videoUrl":"https://www.youtube.com/@IslamPopuler/videos","thumbnail":"/images/food.png","description":"Popular Islamic content and teachings in Indonesian.","languages":["Indonesian"],"category":"Educational","tags":["Islam","Teachings","Indonesian"],"streamType":"external","Joined":10700,"schedule":"24/7","location":"Indonesia"},{"name":"Omar & Hana - Islamic Cartoons for Kids","youtubeChannel":"https://www.youtube.com/@OmarandHana","websiteUrl":"https://www.omarhana.com","playlistUrl":"https://www.youtube.com/@OmarandHana/playlists","postUrl":"https://www.youtube.com/@OmarandHana/posts","videoUrl":"https://www.youtube.com/@OmarandHana/videos","thumbnail":"/images/food.png","description":"Follow the journey of Omar, Hana, their family and friends as they play, learn and teach good Islamic characteristic and moral values through cartoons.","languages":["English"],"category":"Kids","tags":["Cartoons","Moral Values","Islamic Stories"],"streamType":"external","Joined":3700,"schedule":"Weekly","location":"Malaysia"},{"name":"Islamic Teacher Official","youtubeChannel":"https://www.youtube.com/@IslamicTeacherOfficial","websiteUrl":"https://www.islamicteacher.com","playlistUrl":"https://www.youtube.com/@IslamicTeacherOfficial/playlists","postUrl":"https://www.youtube.com/@IslamicTeacherOfficial/posts","videoUrl":"https://www.youtube.com/@IslamicTeacherOfficial/videos","thumbnail":"/images/food.png","description":"Our mission is to equip all Muslim sisters and brothers with Islamic education. Especially Islamic married and social life is our important segment.","languages":["English"],"category":"Educational","tags":["Education","Married Life","Social Life"],"streamType":"external","Joined":9300,"schedule":"Daily","location":"India"},{"name":"WAYOFLIFESQ","youtubeChannel":"https://www.youtube.com/@wayoflifesq","websiteUrl":"","playlistUrl":"https://www.youtube.com/@wayoflifesq/playlists","postUrl":"https://www.youtube.com/@wayoflifesq/posts","videoUrl":"https://www.youtube.com/@wayoflifesq/videos","thumbnail":"/images/food.png","description":"Helping you discover & develop your Islamic Identity. DAILY uploads. Here to help you grow & become the BEST version of yourself.","languages":["English"],"category":"Educational","tags":["Islamic Identity","Personal Growth","Daily Motivation"],"streamType":"external","Joined":2100,"schedule":"Daily","location":"UK"},{"name":"OnePath Network","youtubeChannel":"https://www.youtube.com/@OnePathNetwork","websiteUrl":"https://onepathnetwork.com","playlistUrl":"https://www.youtube.com/@OnePathNetwork/playlists","postUrl":"https://www.youtube.com/@OnePathNetwork/posts","videoUrl":"https://www.youtube.com/@OnePathNetwork/videos","thumbnail":"/images/food.png","description":"OnePath Network is dedicated to elevating the message of Islam with excellence. We produce high quality videos on many aspects of our faith.","languages":["English"],"category":"Educational","tags":["Stories","Muslim Life","Inspiration"],"streamType":"external","Joined":2000,"schedule":"Weekly","location":"Australia"},{"name":"Yaqeen Institute","youtubeChannel":"https://www.youtube.com/@yaqeeninstituteofficial","websiteUrl":"https://yaqeeninstitute.org","playlistUrl":"https://www.youtube.com/@yaqeeninstituteofficial/playlists","postUrl":"https://www.youtube.com/@yaqeeninstituteofficial/posts","videoUrl":"https://www.youtube.com/@yaqeeninstituteofficial/videos","thumbnail":"/images/food.png","description":"We\'re a nonprofit on a mission to pioneer Islamic research in creative, cutting-edge formats tailored to meet people where they are.","languages":["English"],"category":"Educational","tags":["Research","Islamic Studies","Conviction"],"streamType":"external","Joined":2100,"schedule":"Weekly","location":"United States"},{"name":"FreeQuranEducation","youtubeChannel":"https://www.youtube.com/@FreeQuranEducation","websiteUrl":"","playlistUrl":"https://www.youtube.com/@FreeQuranEducation/playlists","postUrl":"https://www.youtube.com/@FreeQuranEducation/posts","videoUrl":"https://www.youtube.com/@FreeQuranEducation/videos","thumbnail":"/images/food.png","description":"We are the world\'s Largest Non Profit Animation and illustration Studio based in Jakarta. Our aim is simple: To make Quranic Education Universal, Free, state of the art and available to every human being with an Internet connection.","languages":["English"],"category":"Quran","tags":["Quran Animation","Education","Free Learning"],"streamType":"external","Joined":2100,"schedule":"24/7","location":"Indonesia"},{"name":"Ali Dawah","youtubeChannel":"https://www.youtube.com/@AliDawah","websiteUrl":"","playlistUrl":"https://www.youtube.com/@AliDawah/playlists","postUrl":"https://www.youtube.com/@AliDawah/posts","videoUrl":"https://www.youtube.com/@AliDawah/videos","thumbnail":"/images/food.png","description":"My videos are created to spread the message of Islam, answering misconceptions and making inspiring content for all to benefit from.","languages":["English"],"category":"Dawah","tags":["Dawah","Misconceptions","Inspiration"],"streamType":"external","Joined":1300,"schedule":"Weekly","location":"UK"},{"name":"Islamic Releases","youtubeChannel":"https://www.youtube.com/@IslamicReleases","websiteUrl":"https://islamicreleases.com","playlistUrl":"https://www.youtube.com/@IslamicReleases/playlists","postUrl":"https://www.youtube.com/@IslamicReleases/posts","videoUrl":"https://www.youtube.com/@IslamicReleases/videos","thumbnail":"/images/food.png","description":"Islamic Releases is working on Islamic Nasheeds, Islamic Music, Islamic Songs, Heart touching poetries and more. These are beautiful and inspiring forms of Islamic art.","languages":["English"],"category":"Music","tags":["Nasheeds","Islamic Music","Poetry"],"streamType":"external","Joined":2600,"schedule":"Daily","location":"Global"},{"name":"Always Islam","youtubeChannel":"https://www.youtube.com/@AlwaysIslam","websiteUrl":"https://www.dawateislami.net","playlistUrl":"https://www.youtube.com/@AlwaysIslam/playlists","postUrl":"https://www.youtube.com/@AlwaysIslam/posts","videoUrl":"https://www.youtube.com/@AlwaysIslam/videos","thumbnail":"/images/food.png","description":"Daily Islamic reminders, stories, and motivational content to strengthen faith.","languages":["English"],"category":"Educational","tags":["Reminders","Stories","Motivation"],"streamType":"external","Joined":657,"schedule":"Daily","location":"United States"},{"name":"Mohammed Hijab","youtubeChannel":"https://www.youtube.com/@MohammedHijab","websiteUrl":"https://mohammedhijab.com","playlistUrl":"https://www.youtube.com/@MohammedHijab/playlists","postUrl":"https://www.youtube.com/@MohammedHijab/posts","videoUrl":"https://www.youtube.com/@MohammedHijab/videos","thumbnail":"/images/food.png","description":"Arguing the case for and educating people about Islam.","languages":["English"],"category":"Dawah","tags":["Debates","Education","Islam"],"streamType":"external","Joined":1300,"schedule":"Weekly","location":"UK"},{"name":"Islam Channel","youtubeChannel":"https://www.youtube.com/@islamchanneltv","websiteUrl":"https://www.islamchannel.tv","playlistUrl":"https://www.youtube.com/@islamchanneltv/playlists","postUrl":"https://www.youtube.com/@islamchanneltv/posts","videoUrl":"https://www.youtube.com/@islamchanneltv/videos","thumbnail":"/images/food.png","description":"World\'s leading Islamic media platform, providing a trusted Muslim perspective since 2004. Discover the world of Islam.","languages":["English"],"category":"News & Current Affairs","tags":["News","Muslim Perspective","Islam"],"streamType":"external","Joined":845000,"schedule":"24/7","location":"UK"},{"name":"We Love Islam","youtubeChannel":"https://www.youtube.com/@WeLoveIslam","websiteUrl":"https://www.weloveislam.in","playlistUrl":"https://www.youtube.com/@WeLoveIslam/playlists","postUrl":"https://www.youtube.com/@WeLoveIslam/posts","videoUrl":"https://www.youtube.com/@WeLoveIslam/videos","thumbnail":"/images/food.png","description":"Sharing high-quality Islamic videos and content to inspire and educate.","languages":["English"],"category":"Educational","tags":["Islamic Videos","Inspiration","Education"],"streamType":"external","Joined":1700000,"schedule":"Weekly","location":"Global"},{"name":"Islamic Guidance","youtubeChannel":"https://www.youtube.com/@IslamicGuidanceOfficial","websiteUrl":"https://www.islamicguidance.co","playlistUrl":"https://www.youtube.com/@IslamicGuidanceOfficial/playlists","postUrl":"https://www.youtube.com/@IslamicGuidanceOfficial/posts","videoUrl":"https://www.youtube.com/@IslamicGuidanceOfficial/videos","thumbnail":"/images/food.png","description":"The purpose of Islamic Guidance channel is to educate the masses with the true identity of Islam.","languages":["English"],"category":"Educational","tags":["Guidance","Islam Identity","Education"],"streamType":"external","Joined":1400000,"schedule":"Daily","location":"Global"},{"name":"Allama Khadim Hussain Rizvi Official","youtubeChannel":"https://www.youtube.com/@AllamaKhadimHussainRizviOfficial","websiteUrl":"https://tlp.org.pk","playlistUrl":"https://www.youtube.com/@AllamaKhadimHussainRizviOfficial/playlists","postUrl":"https://www.youtube.com/@AllamaKhadimHussainRizviOfficial/posts","videoUrl":"https://www.youtube.com/@AllamaKhadimHussainRizviOfficial/videos","thumbnail":"/images/food.png","description":"Official channel featuring lectures and teachings of Allama Khadim Hussain Rizvi.","languages":["Urdu"],"category":"Educational","tags":["Lectures","Urdu","Scholars"],"streamType":"external","Joined":1200000,"schedule":"Weekly","location":"Pakistan"},{"name":"Islamic Digital Studio","youtubeChannel":"https://www.youtube.com/@IslamicDigitalStudio","websiteUrl":"","playlistUrl":"https://www.youtube.com/@IslamicDigitalStudio/playlists","postUrl":"https://www.youtube.com/@IslamicDigitalStudio/posts","videoUrl":"https://www.youtube.com/@IslamicDigitalStudio/videos","thumbnail":"/images/food.png","description":"Creating digital animations and stories for Islamic education.","languages":["English"],"category":"Entertainment","tags":["Animations","Stories","Digital"],"streamType":"external","Joined":838000,"schedule":"Weekly","location":"Global"},{"name":"News of Islam","youtubeChannel":"https://www.youtube.com/@newsofislam","websiteUrl":"","playlistUrl":"https://www.youtube.com/@newsofislam/playlists","postUrl":"https://www.youtube.com/@newsofislam/posts","videoUrl":"https://www.youtube.com/@newsofislam/videos","thumbnail":"/images/food.png","description":"Latest news and updates from the Islamic world.","languages":["English"],"category":"News & Current Affairs","tags":["News","Islam","Updates"],"streamType":"external","Joined":927000,"schedule":"24/7","location":"Global"},{"name":"Paigham TV Official","youtubeChannel":"https://www.youtube.com/@PaighamTVOfficial","websiteUrl":"https://paigham.tv","playlistUrl":"https://www.youtube.com/@PaighamTVOfficial/playlists","postUrl":"https://www.youtube.com/@PaighamTVOfficial/posts","videoUrl":"https://www.youtube.com/@PaighamTVOfficial/videos","thumbnail":"/images/food.png","description":"Islamic programs and teachings in Urdu.","languages":["Urdu"],"category":"Educational","tags":["Programs","Urdu","Teachings"],"streamType":"external","Joined":588000,"schedule":"Daily","location":"Pakistan"},{"name":"Islamic Views","youtubeChannel":"https://www.youtube.com/@IslamicViews","websiteUrl":"","playlistUrl":"https://www.youtube.com/@IslamicViews/playlists","postUrl":"https://www.youtube.com/@IslamicViews/posts","videoUrl":"https://www.youtube.com/@IslamicViews/videos","thumbnail":"/images/food.png","description":"Exploring various Islamic perspectives and opinions.","languages":["English"],"category":"Educational","tags":["Views","Opinions","Islam"],"streamType":"external","Joined":898000,"schedule":"Weekly","location":"Global"},{"name":"The Muhammadan Way Sufi Realities","youtubeChannel":"https://www.youtube.com/@TheMuhammadanWay","websiteUrl":"https://nurmuhammad.com","playlistUrl":"https://www.youtube.com/@TheMuhammadanWay/playlists","postUrl":"https://www.youtube.com/@TheMuhammadanWay/posts","videoUrl":"https://www.youtube.com/@TheMuhammadanWay/videos","thumbnail":"/images/food.png","description":"Sufi teachings and spiritual realities in Islam.","languages":["English"],"category":"Spiritual","tags":["Sufi","Realities","Spiritual"],"streamType":"external","Joined":1700000,"schedule":"Weekly","location":"USA"},{"name":"The Muslim Lantern","youtubeChannel":"https://www.youtube.com/@TheMuslimLantern","websiteUrl":"","playlistUrl":"https://www.youtube.com/@TheMuslimLantern/playlists","postUrl":"https://www.youtube.com/@TheMuslimLantern/posts","videoUrl":"https://www.youtube.com/@TheMuslimLantern/videos","thumbnail":"/images/food.png","description":"Street dawah and discussions on Islam.","languages":["English"],"category":"Dawah","tags":["Dawah","Discussions","Street"],"streamType":"external","Joined":600000,"schedule":"Weekly","location":"UK"},{"name":"Talk Islam","youtubeChannel":"https://www.youtube.com/@TalkIslam","websiteUrl":"https://talkislam.com.au","playlistUrl":"https://www.youtube.com/@TalkIslam/playlists","postUrl":"https://www.youtube.com/@TalkIslam/posts","videoUrl":"https://www.youtube.com/@TalkIslam/videos","thumbnail":"/images/food.png","description":"Engaging talks and reminders about Islam.","languages":["English"],"category":"Educational","tags":["Talks","Reminders","Islam"],"streamType":"external","Joined":1000000,"schedule":"Weekly","location":"Global"},{"name":"The Deen Show","youtubeChannel":"https://www.youtube.com/@TheDeenShow","websiteUrl":"https://www.thedeenshow.com","playlistUrl":"https://www.youtube.com/@TheDeenShow/playlists","postUrl":"https://www.youtube.com/@TheDeenShow/posts","videoUrl":"https://www.youtube.com/@TheDeenShow/videos","thumbnail":"/images/food.png","description":"Popular Islamic talk show featuring interviews with scholars and converts.","languages":["English"],"category":"Educational","tags":["Talk Show","Interviews","Converts"],"streamType":"external","Joined":800000,"schedule":"Weekly","location":"USA"},{"name":"Yasmin Mogahed","youtubeChannel":"https://www.youtube.com/@YasminMogahedQuotes","websiteUrl":"https://www.yasminmogahed.com","playlistUrl":"https://www.youtube.com/@YasminMogahedQuotes/playlists","postUrl":"https://www.youtube.com/@YasminMogahedQuotes/posts","videoUrl":"https://www.youtube.com/@YasminMogahedQuotes/videos","thumbnail":"/images/food.png","description":"Inspirational lectures and quotes by Yasmin Mogahed.","languages":["English"],"category":"Educational","tags":["Inspiration","Quotes","Lectures"],"streamType":"external","Joined":300000,"schedule":"Weekly","location":"USA"},{"name":"Shabir Ally","youtubeChannel":"https://www.youtube.com/@LetTheQuranSpeak","websiteUrl":"https://www.islamicity.org","playlistUrl":"https://www.youtube.com/@LetTheQuranSpeak/playlists","postUrl":"https://www.youtube.com/@LetTheQuranSpeak/posts","videoUrl":"https://www.youtube.com/@LetTheQuranSpeak/videos","thumbnail":"/images/food.png","description":"Q&A sessions and explanations on Islamic topics by Dr. Shabir Ally.","languages":["English"],"category":"Educational","tags":["Q&A","Scholars","Quran"],"streamType":"external","Joined":400000,"schedule":"Weekly","location":"Canada"},{"name":"Nourish TV","youtubeChannel":"https://www.youtube.com/@NourishTV","websiteUrl":"https://nourish.tv","playlistUrl":"https://www.youtube.com/@NourishTV/playlists","postUrl":"https://www.youtube.com/@NourishTV/posts","videoUrl":"https://www.youtube.com/@NourishTV/videos","thumbnail":"/images/food.png","description":"Nourishing the soul with a variety of Islamic lectures.","languages":["English"],"category":"Educational","tags":["Lectures","Soul Nourishment","Islam"],"streamType":"external","Joined":200000,"schedule":"24/7","location":"Global"}]');

/***/ })

}]);