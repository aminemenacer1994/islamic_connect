"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_VideoComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      videos: [],
      query: 'mosque',
      loading: false,
      hasMore: true,
      page: 1,
      lastLoadTs: 0,
      filters: ['Islamic', 'islamic animation', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab', 'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture'],
      activeFilter: null,
      perPage: 6,
      totalResults: 0,
      bottomObserver: null,
      videoObserver: null,
      // Smooth loading controls
      maxConcurrentLoads: 1,
      activeLoads: 0,
      loadQueue: [],
      // virtualization
      startIndex: 0,
      endIndex: 0,
      itemsPerRow: 1,
      rowHeight: 560,
      rafId: null
    };
  },
  computed: {
    visibleVideos() {
      return this.videos.slice(this.startIndex, this.endIndex);
    },
    topSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const startRow = Math.floor(this.startIndex / perRow);
      return startRow * this.rowHeight;
    },
    bottomSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const totalRows = Math.ceil((this.videos.length || 0) / perRow);
      const endRow = Math.ceil((this.endIndex || 0) / perRow);
      const remaining = Math.max(0, totalRows - endRow);
      return remaining * this.rowHeight;
    }
  },
  methods: {
    getFilterIcon(filter) {
      const iconMap = {
        'Islamic': 'bi-star-fill',
        'islamic animation': 'bi-play-btn',
        'Calligraphy': 'bi-pen-nib',
        'Quran': 'bi-book',
        'Kaaba': 'bi-box',
        'Mecca': 'bi-geo-alt',
        'Madina': 'bi-geo-alt-fill',
        'Hijab': 'bi-person',
        'Ramadan': 'bi-moon-stars',
        'Eid': 'bi-gift',
        'Arabic Art': 'bi-brush',
        'Islamic Architecture': 'bi-columns'
      };
      return iconMap[filter] || 'bi-image';
    },
    // Virtualization helpers
    computeItemsPerRow() {
      const w = window.innerWidth || 1024;
      this.itemsPerRow = w < 576 ? 1 : 3;
    },
    measureRowHeight() {
      try {
        const el = this.$el.querySelector('.card-video');
        if (el) {
          const h = el.offsetHeight;
          if (h && Math.abs(h - this.rowHeight) > 20) this.rowHeight = h + 20;
        }
      } catch (_) {}
    },
    computeVirtualWindow() {
      this.computeItemsPerRow();
      const total = this.videos.length;
      if (!total) {
        this.startIndex = 0;
        this.endIndex = 0;
        return;
      }
      const perRow = this.itemsPerRow;
      const rowH = this.rowHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const viewportH = window.innerHeight || 800;
      const totalRows = Math.ceil(total / perRow);
      const bufferRows = 1;
      const startRow = Math.max(0, Math.floor(scrollTop / rowH) - bufferRows);
      const endRow = Math.min(totalRows - 1, Math.ceil((scrollTop + viewportH) / rowH) + bufferRows);
      this.startIndex = startRow * perRow;
      this.endIndex = Math.min(total, (endRow + 1) * perRow);
    },
    onScroll() {
      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => {
        this.computeVirtualWindow();
        this.rafId = null;
      });
    },
    onResize() {
      this.computeVirtualWindow();
    },
    togglePlayPause(event) {
      // Support clicks on either the container or the video element itself
      const target = event.currentTarget;
      const video = target.tagName && target.tagName.toLowerCase() === 'video' ? target : target.querySelector('video');
      if (!video) return;
      const idx = this.findVideoIndexByEl(video);
      if (idx !== -1 && !this.videos[idx].loaded) {
        this.videos[idx].loaded = true;
        if (!video.src) video.src = this.videos[idx].url;
      }
      // Pause other videos to reduce CPU
      const others = this.$el.querySelectorAll('video');
      others.forEach(v => {
        if (v !== video && !v.paused) v.pause();
      });
      if (video.paused) {
        // Upgrade to HD on first play if available
        if (idx !== -1) {
          const item = this.videos[idx];
          if (item && item.hdUrl && !item.upgraded) {
            video.src = item.hdUrl;
            item.url = item.hdUrl;
            item.upgraded = true;
          }
        }
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    },
    async fetchVideos(append = false) {
      if (this.loading || !this.hasMore) return;
      this.loading = true;
      const apiKey = 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f';
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(this.query)}&per_page=${this.perPage}&page=${this.page}`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: apiKey
          }
        });
        const data = await response.json();
        const total = data.total_results || 0;
        this.totalResults = total;
        const newItems = (data.videos || []).map(video => {
          var _video$user;
          // Choose a sharper default and keep an HD URL for upgrade on play
          const pick = this.pickBestFile(video.video_files);
          const hdPick = this.pickHighResFile(video.video_files);
          return {
            id: video.id,
            url: pick === null || pick === void 0 ? void 0 : pick.link,
            hdUrl: hdPick === null || hdPick === void 0 ? void 0 : hdPick.link,
            thumbnail: video.image,
            description: ((_video$user = video.user) === null || _video$user === void 0 ? void 0 : _video$user.name) || 'No description',
            loaded: false,
            upgraded: false,
            metadata: {
              width: null,
              height: null,
              duration: null,
              aspectRatio: null
            }
          };
        });
        if (append) {
          this.videos = this.videos.concat(newItems);
        } else {
          this.videos = newItems;
        }

        // Prefer API pagination hints over total_results for reliability
        const hasNext = !!data.next_page;
        this.hasMore = hasNext || newItems.length === this.perPage;
        this.$nextTick(() => {
          this.setupBottomObserver();
          this.measureRowHeight();
          this.computeVirtualWindow();
        });
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        this.loading = false;
      }
    },
    resetAndSearch() {
      this.page = 1;
      this.hasMore = true;
      this.videos = [];
      this.fetchVideos(false);
    },
    loadMore() {
      if (this.loading || !this.hasMore) return;
      const now = Date.now();
      if (now - this.lastLoadTs < 800) return; // throttle
      this.lastLoadTs = now;
      this.page += 1;
      this.fetchVideos(true);
    },
    // Removed hover autoplay to reduce decode spikes

    updateMetadata(event, video) {
      const el = event.target;
      video.metadata.width = el.videoWidth;
      video.metadata.height = el.videoHeight;
      video.metadata.duration = el.duration;
      video.metadata.aspectRatio = el.videoWidth / el.videoHeight;
    },
    applyFilter(filter) {
      this.activeFilter = filter;
      this.query = filter;
      this.resetAndSearch();
    },
    focusPrevFilter(idx) {
      const prev = idx > 0 ? idx - 1 : this.filters.length - 1;
      this.activeFilter = this.filters[prev];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[prev]) buttons[prev].focus();
      });
      this.resetAndSearch();
    },
    focusNextFilter(idx) {
      const next = idx < this.filters.length - 1 ? idx + 1 : 0;
      this.activeFilter = this.filters[next];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[next]) buttons[next].focus();
      });
      this.resetAndSearch();
    },
    // IntersectionObserver for bottom sentinel
    setupBottomObserver() {
      if (this.bottomObserver) {
        this.bottomObserver.disconnect();
      }
      const options = {
        root: null,
        rootMargin: '600px',
        threshold: 0
      };
      this.bottomObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMore();
          }
        });
      }, options);
      if (this.$refs.infiniteScrollSentinel) {
        this.bottomObserver.observe(this.$refs.infiniteScrollSentinel);
      }
    },
    findVideoIndexByEl(el) {
      // Find the index by traversing to the card and reading key via order
      const cards = Array.from(this.$el.querySelectorAll('.card-video'));
      const card = el.closest('.card-video');
      const idx = cards.indexOf(card);
      return idx;
    },
    pickBestFile(files = []) {
      // Prefer a sharper preview (near 1080w) for clarity
      const mp4s = files.filter(f => (f.link || '').includes('.mp4'));
      const sorted = (mp4s.length ? mp4s : files).slice().sort((a, b) => (a.width || 0) - (b.width || 0));
      const target = 1080;
      let best = sorted[0];
      let minDiff = Infinity;
      sorted.forEach(f => {
        const w = f.width || target;
        const diff = Math.abs(w - target);
        if (diff < minDiff) {
          minDiff = diff;
          best = f;
        }
      });
      if (best && best.link) best.link = best.link.replace(/^http:\/\//, 'https://');
      return best || files[0] || null;
    },
    pickHighResFile(files = []) {
      // Highest available MP4 (used on first play)
      const mp4s = files.filter(f => (f.link || '').includes('.mp4'));
      const sorted = (mp4s.length ? mp4s : files).slice().sort((a, b) => (b.width || 0) - (a.width || 0));
      const best = sorted[0] || null;
      if (best && best.link) best.link = best.link.replace(/^http:\/\//, 'https://');
      return best;
    }
  },
  mounted() {
    this.fetchVideos(false); // Load initial set
    this.setupBottomObserver();
    window.addEventListener('scroll', this.onScroll, {
      passive: true
    });
    window.addEventListener('resize', this.onResize, {
      passive: true
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=template&id=26d38626&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=template&id=26d38626&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-5"
};
const _hoisted_2 = {
  class: "row container justify-content-center mb-3"
};
const _hoisted_3 = {
  class: "col-12 col-md-12"
};
const _hoisted_4 = {
  class: "col-12 col-md-11"
};
const _hoisted_5 = {
  class: "mb-4 text-center"
};
const _hoisted_6 = {
  class: "filter-scroll-wrapper position-relative"
};
const _hoisted_7 = {
  class: "filter-scroll d-flex justify-content-start gap-2 px-2 py-2",
  style: {
    "overflow-x": "auto",
    "cursor": "pointer",
    "white-space": "nowrap",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none"
  },
  role: "radiogroup",
  "aria-label": "Filter videos",
  tabindex: "0"
};
const _hoisted_8 = ["aria-checked", "tabindex", "onClick", "onKeydown"];
const _hoisted_9 = {
  key: 0
};
const _hoisted_10 = {
  class: "row g-3"
};
const _hoisted_11 = {
  class: "card d-flex flex-column shadow-sm p-2 w-100 h-100 card-video card-20 card-float glow-card"
};
const _hoisted_12 = ["aria-label"];
const _hoisted_13 = ["src", "poster", "onLoadedmetadata"];
const _hoisted_14 = {
  class: "action-row px-2 pb-2"
};
const _hoisted_15 = ["href"];
const _hoisted_16 = ["href", "download"];
const _hoisted_17 = {
  ref: "infiniteScrollSentinel",
  class: "w-100",
  style: {
    "height": "1px"
  }
};
const _hoisted_18 = {
  key: 1,
  class: "text-center py-3",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_19 = {
  key: 2,
  class: "text-center py-5 text-muted",
  role: "status",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center fw-bold display-5 display-md-4"
  }, "Islamic Animated Videos", -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-dark mb-4",
    style: {
      "font-size": "18px"
    }
  }, " Discover a captivating collection of Islamic animated videos, bringing to life the beauty and spirituality of Islamic culture. From the grandeur of mosques and intricate calligraphy to the serenity of nature and historical landmarks. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    id: "video-gallery-search-label",
    class: "fw-bold text-left pt-2 pb-2 container"
  }, "Search Animated Videos:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "row g-2 align-items-stretch",
    role: "search",
    "aria-labelledby": "video-gallery-search-label",
    onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.resetAndSearch && $options.resetAndSearch(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "video-gallery-search-input",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.query = $event),
    type: "text",
    class: "form-control h-100 rounded-20",
    "aria-label": 'Search Islamic videos',
    placeholder: "Search for Islamic videos..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]])]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12 col-md-1 d-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn w-100 h-100 btn-teal rounded-20",
    type: "submit"
  }, "Search")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Filters "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.filters, (filter, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: filter,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge flex-shrink-0 d-flex align-items-center gap-2 px-3 py-2", {
        'active': $data.activeFilter === filter
      }]),
      role: "radio",
      "aria-checked": String($data.activeFilter === filter),
      tabindex: $data.activeFilter === filter ? 0 : -1,
      type: "button",
      onClick: $event => $options.applyFilter(filter),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.focusPrevFilter(idx), ["prevent"]), ["left"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.focusNextFilter(idx), ["prevent"]), ["right"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.applyFilter(filter), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.applyFilter(filter), ["prevent"]), ["space"])]
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getFilterIcon(filter))
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(filter), 1 /* TEXT */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Video Grid "), $data.videos.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.topSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visibleVideos, (video, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: video.id || $data.startIndex + i,
      class: "col-12 col-sm-6 col-md-6 col-lg-4 mb-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ratio ratio-16x9 pb-2 video-container rounded-20 overflow-hidden video-frame media-frame",
      role: "button",
      onClick: _cache[3] || (_cache[3] = $event => $options.togglePlayPause($event)),
      tabindex: "0",
      "aria-label": 'Video: ' + (video.description || 'Islamic animation') + '. Press Enter to play/pause',
      onKeydown: [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.togglePlayPause($event), ["prevent"]), ["enter"])), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.togglePlayPause($event), ["prevent"]), ["space"]))]
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("video", {
      src: video.loaded ? video.url : '',
      poster: video.thumbnail,
      class: "w-100 mb-2 rounded-20 video-hover",
      controls: "",
      controlslist: "nodownload noplaybackrate",
      loop: "",
      preload: "metadata",
      muted: "",
      playsinline: "",
      onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.togglePlayPause($event), ["stop"])),
      onLoadedmetadata: $event => $options.updateMetadata($event, video)
    }, " Your browser does not support the video tag. ", 40 /* PROPS, NEED_HYDRATION */, _hoisted_13)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_12), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: `https://wa.me/?text=${encodeURIComponent(video.url)}`,
      target: "_blank",
      rel: "noopener noreferrer",
      class: "btn btn-sm w-100 custom-btn btn-action rounded-20 d-flex align-items-center justify-content-center gap-2",
      "aria-label": 'Share video via WhatsApp'
    }, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: video.url,
      download: `video-${video.id}.mp4`,
      class: "btn btn-sm w-100 custom-btn btn-action rounded-20 d-flex align-items-center justify-content-center gap-2",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": 'Download video file'
    }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-download",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Download ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_16)])])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.bottomSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sentinel for infinite scroll "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, null, 512 /* NEED_PATCH */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading indicator "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ms-2"
  }, "Loading videos…", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" No videos fallback "), !$data.loading && $data.videos.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "fs-5"
  }, "No videos found. Try another keyword.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.video-container[data-v-26d38626] {\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;\n}\n.video-container[data-v-26d38626]:focus {\n  outline: 2px solid #0db691;\n  outline-offset: 2px;\n}\n.video-container[data-v-26d38626]:hover {\n  transform: scale(1.05);\n  /* Slight zoom effect on hover */\n  opacity: 0.9;\n  /* Slight fade effect on hover */\n}\n.video-container video[data-v-26d38626] {\n  transition: opacity 0.3s ease-in-out;\n  cursor: pointer;\n}\n.video-container video[data-v-26d38626]:hover {\n  opacity: 1;\n  /* Ensure video stays visible during hover */\n}\n.card-video[data-v-26d38626] {\n  transition: all 0.3s ease;\n}\n.video-hover[data-v-26d38626] {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.card-video video[data-v-26d38626] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n.custom-btn[data-v-26d38626] { background-color: #0db691; color: #fff; padding: 10px; transition: all 0.3s ease; position: relative; overflow: hidden;\n}\n.custom-btn[data-v-26d38626]:hover, .custom-btn[data-v-26d38626]:focus { background-color: #0aa07f; transform: translateY(-2px); color: #fff; outline: 2px solid rgba(13,182,145,.4); outline-offset: 2px; box-shadow: 0 4px 12px rgba(0,0,0,.2);\n}\n.custom-btn[data-v-26d38626]::after { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; background: rgba(255,255,255,.2); border-radius: 50%; transform: translate(-50%,-50%); transition: width .4s ease, height .4s ease;\n}\n.custom-btn[data-v-26d38626]:hover::after { width: 200px; height: 200px;\n}\n.scrollmenu[data-v-26d38626] {\n  white-space: nowrap;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  /* Firefox */\n  scrollbar-color: transparent transparent;\n  /* Firefox */\n}\n.scrollmenu[data-v-26d38626]::-webkit-scrollbar {\n  width: 0px;\n}\n.scrollmenu.scrolling[data-v-26d38626]::-webkit-scrollbar {\n  width: 8px;\n}\n.scrollmenu[data-v-26d38626]::-webkit-scrollbar-thumb {\n  background-color: #888;\n  border-radius: 4px;\n}\n.scrollmenu a[data-v-26d38626] {\n  display: inline-block;\n  text-align: center;\n  text-decoration: none;\n}\n.badge[data-v-26d38626] { background-color: white; color: #000; font-size: 1em; border: 1px solid #0db69175; border-radius: 8px; padding: 8px 12px; transition: all .3s ease;\n}\n.badge.active[data-v-26d38626] { background-color: #0db691; color: #fff; transform: scale(1.05);\n}\n.badge[data-v-26d38626]:hover { background-color: #0aa07f; color: #fff; transform: scale(1.05); box-shadow: 0 2px 8px rgba(0,0,0,.15);\n}\n.shadow-lg[data-v-26d38626] {\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n}\n.hover-shadow[data-v-26d38626]:hover {\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n}\n.filter-scroll[data-v-26d38626]::-webkit-scrollbar {\n  display: none;\n  cursor: pointer;\n}\n.filter-scroll[data-v-26d38626]:focus {\n  outline: 2px solid #0db691;\n  outline-offset: 2px;\n}\n.scroll-fade[data-v-26d38626] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 40px;\n  pointer-events: none;\n  z-index: 1;\n}\n.scroll-fade-left[data-v-26d38626] {\n  left: 0;\n  background: linear-gradient(to right, rgba(255, 255, 255, 0.11), transparent);\n}\n.scroll-fade-right[data-v-26d38626] {\n  right: 0;\n  background: linear-gradient(to left, rgba(255, 255, 255, 0.11), transparent);\n}\n.pagination .page-link[data-v-26d38626] {\n  font-size: 1.1rem;\n}\n.modal-backdrop[data-v-26d38626] {\n  display: none;\n}\n.pointer[data-v-26d38626] {\n  cursor: pointer;\n}\n.ratio[data-v-26d38626] { border-radius: 20px; overflow: hidden;\n}\n.video-frame[data-v-26d38626] { height: 500px;\n}\nvideo[data-v-26d38626] { border-radius: 20px;\n}\n.card[data-v-26d38626] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  content-visibility: auto;\n  contain: content;\n}\n\n/* Shared utilities to match AiComponent */\n.soft-bg[data-v-26d38626] {\n  background:\n    radial-gradient(1200px 600px at 10% -10%, rgba(13, 182, 145, 0.05), transparent 60%),\n    radial-gradient(900px 500px at 110% 10%, rgba(26, 95, 122, 0.05), transparent 60%),\n    radial-gradient(800px 400px at 50% 120%, rgba(13, 182, 145, 0.04), transparent 60%),\n    linear-gradient(180deg, #ffffff, #fafcfc),\n    repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 12px),\n    repeating-linear-gradient(0deg, rgba(0,0,0,0.008) 0, rgba(0,0,0,0.008) 1px, transparent 1px, transparent 12px);\n  background-size: auto, auto, auto, auto, 800px 800px, 800px 800px;\n  background-attachment: scroll, scroll, scroll, scroll, fixed, fixed;\n  position: relative;\n}\n.soft-bg[data-v-26d38626]::before,\n.soft-bg[data-v-26d38626]::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(40px);\n  opacity: 0.35;\n  z-index: 0;\n  animation: floatBlob-26d38626 18s ease-in-out infinite;\n}\n.soft-bg[data-v-26d38626]::before { width: 340px; height: 340px; background: radial-gradient(circle at 30% 30%, rgba(13,182,145,.35), transparent 60%); top: -110px; left: -70px;\n}\n.soft-bg[data-v-26d38626]::after { width: 280px; height: 280px; background: radial-gradient(circle at 70% 70%, rgba(26,95,122,.35), transparent 60%); bottom: -90px; right: -50px; animation-delay: 6s;\n}\n@keyframes floatBlob-26d38626 {\n0%,100% { transform: translateY(0) translateX(0);\n}\n50% { transform: translateY(-14px) translateX(8px);\n}\n}\n.rounded-20[data-v-26d38626] { border-radius: 20px !important;\n}\n.card-20[data-v-26d38626] { border-radius: 20px; overflow: hidden;\n}\n.card-float[data-v-26d38626] { transition: transform .25s ease, box-shadow .25s ease;\n}\n.card-float[data-v-26d38626]:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,.15);\n}\n.glow-card[data-v-26d38626] { background: #fff; border: 1px solid rgba(13,182,145,.18); box-shadow: 0 10px 24px rgba(0,0,0,.08);\n}\n.glow-card[data-v-26d38626]:hover { box-shadow: 0 16px 30px rgba(0,0,0,.12), 0 0 0 3px rgba(13,182,145,.08) inset;\n}\n.btn-teal[data-v-26d38626] { background-color: #0db691; color: #fff; border: none; transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;\n}\n.btn-teal[data-v-26d38626]:hover { background-color: #0aa07f; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.15);\n}\n.action-row[data-v-26d38626] { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch;\n}\n.action-row[data-v-26d38626] { margin-top: 12px;\n}\n.btn-action[data-v-26d38626] { font-size: 18px;\n}\n\n/* Reset default figure/article spacing and enforce column layout */\narticle.card[data-v-26d38626] { margin: 0; display: flex; flex-direction: column;\n}\n@keyframes focusPulse-26d38626 {\n0% { box-shadow: 0 0 0 0 rgba(13,182,145,.45);}\n100% { box-shadow: 0 0 0 8px rgba(13,182,145,0);}\n}\n.btn-action[data-v-26d38626]:focus-visible { outline: none; animation: focusPulse-26d38626 .6s ease;\n}\n@keyframes cardFloat-26d38626 {\n0%,100% { transform: translateY(0);}\n50% { transform: translateY(-3px);}\n}\n.video-frame[data-v-26d38626]:hover { animation: cardFloat-26d38626 3s ease-in-out infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n.card-float[data-v-26d38626], .btn-teal[data-v-26d38626], .btn-action[data-v-26d38626], .video-frame[data-v-26d38626], .soft-bg[data-v-26d38626]::before, .soft-bg[data-v-26d38626]::after { transition: none !important; animation: none !important;\n}\n}\n\n/* Gradient stroke + soft fade for media */\n.media-frame[data-v-26d38626] { position: relative; z-index: 0;\n}\n.media-frame[data-v-26d38626]::before {\n  content: '';\n  position: absolute; inset: 0; border-radius: inherit; padding: 1px;\n  background: linear-gradient(135deg, rgba(13,182,145,.5), rgba(26,95,122,.4));\n  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);\n  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;\n}\n.media-frame[data-v-26d38626]::after {\n  content: '';\n  position: absolute; left: 0; right: 0; bottom: 0; height: 18%;\n  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.18) 100%);\n  height: 22%; opacity: .22; pointer-events: none;\n}\n\n/* Cross-browser fallback when CSS masking isn't supported (e.g., Firefox) */\n@supports not ((-webkit-mask-composite: xor) or (mask-composite: exclude)) {\n.media-frame[data-v-26d38626] { border: 1px solid rgba(13,182,145,.18);\n}\n.media-frame[data-v-26d38626]::before { display: none;\n}\n}\n@supports not (-webkit-mask-composite: xor) {\n.media-frame[data-v-26d38626] { border: 1px solid rgba(13,182,145,.18);\n}\n.media-frame[data-v-26d38626]::before { display: none;\n}\n}\n\n/* Button icon micro-motion */\n.btn-action i[data-v-26d38626] { transition: transform .2s ease;\n}\n.btn-action:hover i[data-v-26d38626] { transform: translateY(-1px);\n}\n\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_style_index_0_id_26d38626_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_style_index_0_id_26d38626_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_style_index_0_id_26d38626_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/VideoComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/VideoComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VideoComponent_vue_vue_type_template_id_26d38626_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoComponent.vue?vue&type=template&id=26d38626&scoped=true */ "./resources/js/components/VideoComponent.vue?vue&type=template&id=26d38626&scoped=true");
/* harmony import */ var _VideoComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoComponent.vue?vue&type=script&lang=js */ "./resources/js/components/VideoComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _VideoComponent_vue_vue_type_style_index_0_id_26d38626_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css */ "./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_VideoComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_VideoComponent_vue_vue_type_template_id_26d38626_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-26d38626"],['__file',"resources/js/components/VideoComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/VideoComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/VideoComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VideoComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_style_index_0_id_26d38626_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=style&index=0&id=26d38626&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/VideoComponent.vue?vue&type=template&id=26d38626&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/VideoComponent.vue?vue&type=template&id=26d38626&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_template_id_26d38626_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoComponent_vue_vue_type_template_id_26d38626_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VideoComponent.vue?vue&type=template&id=26d38626&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VideoComponent.vue?vue&type=template&id=26d38626&scoped=true");


/***/ })

}]);