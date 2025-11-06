"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AiComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    cacheLimitOverride: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      downloading: false,
      searchTerm: '',
      selectedImage: null,
      allImages: [],
      images: [],
      // Infinite scroll state
      apiPage: 1,
      perPage: 18,
      hasMore: true,
      isLoadingMore: false,
      lastLoadMoreTs: 0,
      observer: null,
      activeFilter: 'Islamic',
      isModalOpen: false,
      loading: true,
      apiKey: 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f',
      // request controllers and caching to avoid wasted work
      fetchAborter: null,
      loadMoreAborter: null,
      cache: new Map(),
      cacheLimit: 60,
      // virtualization state
      startIndex: 0,
      endIndex: 0,
      itemsPerRow: 1,
      rowHeight: 620,
      rafId: null,
      resizeRafId: null,
      filters: ['Islamic', 'Mosque', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab', 'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture']
    };
  },
  computed: {
    visibleImages() {
      return this.allImages.slice(this.startIndex, this.endIndex);
    },
    topSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const startRow = Math.floor(this.startIndex / perRow);
      return startRow * this.rowHeight;
    },
    bottomSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const totalRows = Math.ceil((this.allImages.length || 0) / perRow);
      const endRow = Math.ceil((this.endIndex || 0) / perRow);
      const remaining = Math.max(0, totalRows - endRow);
      return remaining * this.rowHeight;
    }
  },
  mounted() {
    // set cache limit: prop override > adaptive heuristic
    try {
      this.cacheLimit = this.cacheLimitOverride != null ? this.cacheLimitOverride : this.computeAdaptiveCacheLimit();
    } catch (_) {}
    // compute initial layout once
    this.itemsPerRow = this.computeItemsPerRow();
    this.$nextTick(() => {
      this.measureRowHeight();
      this.computeVirtualWindow();
    });
    this.fetchGallery();
    window.addEventListener('scroll', this.onScroll, {
      passive: true
    });
    window.addEventListener('resize', this.onResize, {
      passive: true
    });
    // listen to network changes if available
    if (navigator && navigator.connection && navigator.connection.addEventListener) {
      try {
        navigator.connection.addEventListener('change', this.onConnectionChange);
      } catch (_) {}
    }
  },
  beforeUnmount() {
    if (this.observer) {
      try {
        this.observer.disconnect();
      } catch (e) {}
      this.observer = null;
    }
    if (this.fetchAborter) {
      try {
        this.fetchAborter.abort();
      } catch (_) {}
    }
    if (this.loadMoreAborter) {
      try {
        this.loadMoreAborter.abort();
      } catch (_) {}
    }
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    if (navigator && navigator.connection && navigator.connection.removeEventListener) {
      try {
        navigator.connection.removeEventListener('change', this.onConnectionChange);
      } catch (_) {}
    }
  },
  methods: {
    computeAdaptiveCacheLimit() {
      const mem = navigator && navigator.deviceMemory ? navigator.deviceMemory : undefined; // in GB
      const conn = navigator && navigator.connection && navigator.connection.effectiveType ? navigator.connection.effectiveType : undefined;
      // Baseline
      let limit = 60;
      // Memory-based tuning
      if (mem !== undefined) {
        if (mem <= 1) limit = 24;else if (mem <= 2) limit = 40;else if (mem >= 8) limit = 120;else if (mem >= 4) limit = 90;
      }
      // Network-based tuning (bias down on slow links)
      if (conn) {
        if (conn === 'slow-2g' || conn === '2g') limit = Math.min(limit, 24);else if (conn === '3g') limit = Math.min(limit, 40);
      }
      // Viewport hint: small screens tend to scroll fewer items
      const vw = window && window.innerWidth ? window.innerWidth : 1024;
      if (vw < 576) limit = Math.min(limit, 48);
      return limit;
    },
    onConnectionChange() {
      // honor explicit override
      if (this.cacheLimitOverride != null) return;
      try {
        this.cacheLimit = this.computeAdaptiveCacheLimit();
      } catch (_) {}
    },
    // Simple LRU cache helpers
    cacheGet(key) {
      if (!this.cache) return undefined;
      const has = this.cache.has(key);
      if (!has) return undefined;
      const value = this.cache.get(key);
      // refresh recency
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    },
    cacheSet(key, value) {
      if (!this.cache) this.cache = new Map();
      if (this.cache.has(key)) this.cache.delete(key);
      this.cache.set(key, value);
      if (this.cache.size > this.cacheLimit) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
    },
    focusPrevFilter(idx) {
      const prev = idx > 0 ? idx - 1 : this.filters.length - 1;
      this.activeFilter = this.filters[prev];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[prev]) buttons[prev].focus();
      });
      this.applyFilter(this.activeFilter);
    },
    focusNextFilter(idx) {
      const next = idx < this.filters.length - 1 ? idx + 1 : 0;
      this.activeFilter = this.filters[next];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[next]) buttons[next].focus();
      });
      this.applyFilter(this.activeFilter);
    },
    async downloadImage(url, filename) {
      this.downloading = true;
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors'
        });
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Unable to download the image. Please try again later.');
      } finally {
        this.downloading = false;
      }
    },
    async fetchGallery() {
      this.loading = true;
      this.allImages = [];
      this.apiPage = 1;
      this.hasMore = true;
      try {
        const query = `Islamic ${this.searchTerm}`.trim();
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${this.perPage}&page=${this.apiPage}`;
        const cacheKey = `${query}:1:${this.perPage}`;
        // abort any in-flight fetch
        if (this.fetchAborter) {
          try {
            this.fetchAborter.abort();
          } catch (_) {}
        }
        this.fetchAborter = new AbortController();
        const cached = this.cacheGet(cacheKey);
        if (cached) {
          this.allImages = cached.photos || [];
          this.hasMore = Boolean(cached.hasMore);
        } else {
          const response = await fetch(url, {
            headers: {
              Authorization: this.apiKey
            },
            signal: this.fetchAborter.signal
          });
          const data = await response.json();
          this.allImages = data.photos || [];
          this.hasMore = Boolean(data.next_page);
          this.cacheSet(cacheKey, {
            photos: this.allImages.slice(),
            hasMore: this.hasMore
          });
        }
        // Ensure observer is set up after first paint
        this.$nextTick(() => {
          if (!this.observer) this.setupObserver();
          this.measureRowHeight();
          this.computeVirtualWindow();
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        this.loading = false;
      }
    },
    setupObserver() {
      const target = this.$refs.loadMoreTrigger;
      if (!target) return;
      this.observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          this.loadMore();
        }
      }, {
        root: null,
        rootMargin: '0px 0px 600px 0px',
        threshold: 0
      });
      this.observer.observe(target);
    },
    async loadMore() {
      if (this.loading || this.isLoadingMore || !this.hasMore) return;
      const now = Date.now();
      if (now - this.lastLoadMoreTs < 800) return; // throttle
      this.lastLoadMoreTs = now;
      this.isLoadingMore = true;
      try {
        const query = `Islamic ${this.searchTerm}`.trim();
        const nextPage = this.apiPage + 1;
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${this.perPage}&page=${nextPage}`;
        const cacheKey = `${query}:${nextPage}:${this.perPage}`;
        // abort any in-flight load-more request
        if (this.loadMoreAborter) {
          try {
            this.loadMoreAborter.abort();
          } catch (_) {}
        }
        this.loadMoreAborter = new AbortController();
        let photos = [];
        let nextHasMore = true;
        const cached = this.cacheGet(cacheKey);
        if (cached) {
          photos = cached.photos || [];
          nextHasMore = Boolean(cached.hasMore);
        } else {
          const response = await fetch(url, {
            headers: {
              Authorization: this.apiKey
            },
            signal: this.loadMoreAborter.signal
          });
          const data = await response.json();
          photos = data.photos || [];
          nextHasMore = Boolean(data.next_page);
          this.cacheSet(cacheKey, {
            photos: photos.slice(),
            hasMore: nextHasMore
          });
        }
        if (photos.length) {
          this.allImages.push(...photos);
          this.apiPage = nextPage;
        }
        this.hasMore = Boolean(nextHasMore);
        this.$nextTick(() => {
          this.measureRowHeight();
          this.computeVirtualWindow();
        });
      } catch (error) {
        console.error('Error loading more images:', error);
      } finally {
        this.isLoadingMore = false;
      }
    },
    // Virtualization helpers
    computeItemsPerRow() {
      const w = window.innerWidth || 1024;
      return w < 576 ? 1 : 3;
    },
    computeVirtualWindow() {
      const total = this.allImages.length;
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
      const bufferRows = 2;
      const startRow = Math.max(0, Math.floor(scrollTop / rowH) - bufferRows);
      const endRow = Math.min(totalRows - 1, Math.ceil((scrollTop + viewportH) / rowH) + bufferRows);
      this.startIndex = startRow * perRow;
      this.endIndex = Math.min(total, (endRow + 1) * perRow);
    },
    measureRowHeight() {
      try {
        const el = this.$el.querySelector('.card');
        if (el) {
          const h = el.offsetHeight;
          if (h && Math.abs(h - this.rowHeight) > 20) this.rowHeight = h + 20; // add small buffer
        }
      } catch (_) {}
    },
    onScroll() {
      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => {
        this.computeVirtualWindow();
        this.rafId = null;
      });
    },
    onResize() {
      if (this.resizeRafId) return;
      this.resizeRafId = requestAnimationFrame(() => {
        const newPerRow = this.computeItemsPerRow();
        if (newPerRow !== this.itemsPerRow) {
          this.itemsPerRow = newPerRow;
          this.measureRowHeight();
        }
        this.computeVirtualWindow();
        this.resizeRafId = null;
      });
    },
    applyFilter(keyword) {
      this.activeFilter = keyword;
      this.searchTerm = keyword;
      this.fetchGallery();
    },
    openModal(image) {
      this.selectedImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    // Pagination removed in favor of infinite scroll
    hoverCard(index) {
      const card = document.querySelectorAll('.card')[index];
      if (card) {
        card.style.transform = 'scale(1.03)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
      }
    },
    leaveCard(index) {
      const card = document.querySelectorAll('.card')[index];
      if (card) {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }
    },
    getFilterIcon(filter) {
      const iconMap = {
        'Islamic': 'bi-star-fill',
        'Mosque': 'bi-building',
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
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "mb-4 text-center"
};
const _hoisted_5 = {
  class: "d-flex text-center overflow-x-auto gap-2 px-1 py-2 filter-scroll",
  role: "radiogroup",
  "aria-label": "Filter images",
  style: {
    "cursor": "pointer",
    "white-space": "nowrap"
  }
};
const _hoisted_6 = ["aria-checked", "tabindex", "onClick", "onKeydown"];
const _hoisted_7 = {
  key: 0,
  class: "text-center my-5",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_8 = {
  key: 1
};
const _hoisted_9 = {
  class: "row g-3"
};
const _hoisted_10 = {
  class: "card d-flex flex-column shadow-sm p-2 w-100 h-100",
  style: {
    "border-radius": "10px",
    "transition": "transform 0.3s ease, box-shadow 0.3s ease",
    "overflow": "hidden"
  }
};
const _hoisted_11 = {
  class: "image-wrapper",
  style: {
    "overflow": "hidden",
    "border-radius": "8px"
  }
};
const _hoisted_12 = ["src", "srcset", "alt", "aria-label", "onClick", "onKeydown"];
const _hoisted_13 = {
  class: "mt-2 text-center",
  style: {
    "padding": "0 10px",
    "font-size": "20px",
    "color": "#444"
  }
};
const _hoisted_14 = {
  class: "d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto px-2 pb-2"
};
const _hoisted_15 = ["href", "aria-label"];
const _hoisted_16 = ["onClick", "aria-label"];
const _hoisted_17 = {
  class: "mt-4 d-flex justify-content-center",
  "aria-live": "polite"
};
const _hoisted_18 = {
  key: 0,
  class: "text-center my-3",
  role: "status"
};
const _hoisted_19 = {
  key: 1,
  class: "text-muted",
  role: "status"
};
const _hoisted_20 = {
  ref: "loadMoreTrigger",
  style: {
    "height": "1px"
  }
};
const _hoisted_21 = {
  class: "modal fade",
  id: "imageModal",
  tabindex: "-1",
  "aria-labelledby": "imageModalLabel",
  "aria-hidden": "true"
};
const _hoisted_22 = {
  class: "modal-dialog modal-dialog-centered modal-lg",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_23 = {
  class: "modal-content"
};
const _hoisted_24 = {
  class: "modal-body"
};
const _hoisted_25 = ["src", "alt"];
const _hoisted_26 = {
  class: "mt-2 text-center",
  style: {
    "padding": "0 5px",
    "font-size": "20px",
    "color": "#444"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Title "), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center fw-bold display-5 display-md-4"
  }, "Islamic Gallery", -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-muted mb-4",
    style: {
      "font-size": "18px"
    }
  }, " Explore beautiful Islamic visuals including majestic mosques, intricate calligraphy, Quranic themes, serene landscapes, timeless architecture, vibrant traditions, cultural festivals, spiritual gatherings, historical sites, daily life, artistic expressions, and more. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    id: "ai-gallery-search-label",
    class: "fw-bold text-left pt-2 pb-2 container"
  }, "Search Images in Gallery:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "input-group",
    onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.fetchGallery && $options.fetchGallery(...args), ["prevent"])),
    role: "search",
    "aria-labelledby": "ai-gallery-search-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "ai-gallery-search-input",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchTerm = $event),
    type: "text",
    class: "form-control",
    "aria-label": 'Search Islamic images',
    placeholder: "Search for Islamic images..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchTerm]]), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn",
    type: "submit",
    style: {
      "background-color": "#0db691",
      "color": "#000"
    }
  }, " Search ", -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Filters "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.filters, (filter, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: filter,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge flex-shrink-0 text-center px-3 py-2 d-flex align-items-center gap-2", {
        'active': $data.activeFilter === filter,
        'bg-light text-dark': $data.activeFilter !== filter
      }]),
      role: "radio",
      "aria-checked": String($data.activeFilter === filter),
      tabindex: $data.activeFilter === filter ? 0 : -1,
      type: "button",
      onClick: $event => $options.applyFilter(filter),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.focusPrevFilter(idx), ["prevent"]), ["left"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.focusNextFilter(idx), ["prevent"]), ["right"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.applyFilter(filter), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.applyFilter(filter), ["prevent"]), ["space"])]
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getFilterIcon(filter))
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(filter), 1 /* TEXT */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_6);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Image Grid "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [...(_cache[4] || (_cache[4] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success mb-3",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "fw-semibold fs-4 text-muted"
  }, "Images loading, please wait...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.topSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visibleImages, (image, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: image.id || $data.startIndex + index,
      class: "col-12 col-sm-4 col-md-4 col-lg-4 d-flex"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("figure", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: image.src.medium,
      srcset: `${image.src.small} 400w, ${image.src.medium} 800w, ${image.src.large} 1200w`,
      sizes: "(max-width: 576px) 100vw, (max-width: 992px) 33vw, 33vw",
      alt: image.alt || 'Islamic image',
      class: "img-fluid image-zoom",
      loading: "lazy",
      decoding: "async",
      fetchpriority: "low",
      style: {
        "height": "480px",
        "object-fit": "cover",
        "transition": "transform 0.3s ease",
        "will-change": "transform"
      },
      "data-bs-toggle": "modal",
      "data-bs-target": "#imageModal",
      tabindex: "0",
      "aria-label": (image.alt || 'Islamic image') + '. Press Enter to enlarge',
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $data.selectedImage = image, ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $data.selectedImage = image, ["stop", "prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $data.selectedImage = image, ["stop", "prevent"]), ["space"])]
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_12)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("figcaption", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(image.alt || 'Islamic Image'), 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "flex-grow-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: `https://wa.me/?text=${encodeURIComponent(image.src.original)}`,
      target: "_blank",
      class: "btn btn-sm w-100 custom-btn d-flex align-items-center justify-content-center gap-2",
      style: {
        "font-size": "18px"
      },
      "aria-label": 'Share image: ' + (image.alt || 'Islamic image') + ' via WhatsApp'
    }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.downloadImage(image.src.original, `image-${image.id}.jpg`), ["prevent"]),
      class: "btn btn-sm w-100 custom-btn d-flex align-items-center justify-content-center gap-2",
      style: {
        "font-size": "18px"
      },
      "aria-label": 'Download image: ' + (image.alt || 'Islamic image')
    }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-download",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)('Download'), -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_16)])])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      height: $options.bottomSpacerHeight + 'px'
    })
  }, null, 4 /* STYLE */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Infinite Scroll Sentinel / Status "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [$data.isLoadingMore ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ms-2"
  }, "Loading more images…", -1 /* CACHED */)]))])) : !$data.hasMore && $data.allImages.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, "No more results")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, null, 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "imageModalLabel",
    class: "modal-title",
    style: {
      "font-size": "24px",
      "font-weight": "bold"
    }
  }, "Islamic Image"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.selectedImage && $data.selectedImage.src ? $data.selectedImage.src.original : '',
    alt: $data.selectedImage && $data.selectedImage.alt ? $data.selectedImage.alt : 'Islamic Image',
    class: "img-fluid mx-auto d-block",
    style: {
      "max-width": "100%",
      "max-height": "80vh",
      "object-fit": "contain",
      "padding": "5px"
    }
  }, null, 8 /* PROPS */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedImage && $data.selectedImage.alt ? $data.selectedImage.alt : 'Islamic Image'), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.text-muted[data-v-300b761a] {\n  /* Increase contrast on light backgrounds (#f5f5f5) to meet WCAG AA */\n  color: #495057 !important; /* Bootstrap gray-700, contrast > 4.5:1 on #f5f5f5 */\n}\n.img-fluid[data-v-300b761a] {\n  width: 100%;\n  height: auto;\n}\n.card[data-v-300b761a] {\n  content-visibility: auto;\n  contain-intrinsic-size: 480px 320px;\n  contain: content;\n}\n.custom-btn[data-v-300b761a] {\n  background-color: #0db691;\n  color: #000; /* Black text for AA contrast on light teal */\n  padding: 10px;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.custom-btn[data-v-300b761a]:hover {\n  background-color: #0aa07f;\n  transform: translateY(-2px);\n  color: #000; /* maintain contrast on hover */\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n.custom-btn[data-v-300b761a]::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  transition: width 0.4s ease, height 0.4s ease;\n}\n.custom-btn[data-v-300b761a]:hover::after {\n  width: 200px;\n  height: 200px;\n}\n.image-zoom[data-v-300b761a]:hover { /* disable heavy hover zoom to reduce paints */\n}\n.scrollmenu[data-v-300b761a] {\n  white-space: nowrap;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: transparent transparent;\n}\n.scrollmenu[data-v-300b761a]::-webkit-scrollbar {\n  width: 0px;\n}\n.scrollmenu.scrolling[data-v-300b761a]::-webkit-scrollbar {\n  width: 8px;\n}\n.scrollmenu[data-v-300b761a]::-webkit-scrollbar-thumb {\n  background-color: #888;\n  border-radius: 4px;\n}\n.scrollmenu a[data-v-300b761a] {\n  display: inline-block;\n  text-align: center;\n  text-decoration: none;\n}\n.badge[data-v-300b761a] {\n  background-color: black;\n  color: #fff; /* ensure high contrast on default black badge */\n  font-size: 1em;\n  border: 1px solid #0db69175;\n  border-radius: 8px;\n  padding: 8px 12px;\n  transition: all 0.3s ease;\n}\n.badge.active[data-v-300b761a] {\n  background-color: #0db691; /* active teal */\n  color: #000; /* black text for AA contrast */\n  transform: scale(1.05);\n}\n.badge[data-v-300b761a]:hover {\n  background-color: #0aa07f;\n  color: #000; /* maintain contrast on hover */\n  transform: scale(1.05);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.shadow-sm[data-v-300b761a] {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.filter-scroll[data-v-300b761a] {\n  scrollbar-color: #17a085 transparent;\n  scrollbar-width: thin;\n}\n.filter-scroll[data-v-300b761a]::-webkit-scrollbar {\n  height: 8px;\n}\n.filter-scroll[data-v-300b761a]::-webkit-scrollbar-thumb {\n  background-color: #17a085;\n  border-radius: 10px;\n}\n.filter-scroll[data-v-300b761a]::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n.pagination .page-link[data-v-300b761a] {\n  font-size: 1.1rem;\n}\n.modal-backdrop[data-v-300b761a] {\n  display: none;\n}\n@keyframes fadeIn-300b761a {\nfrom {\n    opacity: 0;\n    transform: translateY(20px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.animate__fadeIn[data-v-300b761a] {\n  animation: fadeIn-300b761a 0.5s ease-out;\n  animation-fill-mode: backwards;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/AiComponent.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/AiComponent.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=template&id=300b761a&scoped=true */ "./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true");
/* harmony import */ var _AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-300b761a"],['__file',"resources/js/components/AiComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=template&id=300b761a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true");


/***/ })

}]);