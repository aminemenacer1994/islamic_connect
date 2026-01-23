"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_QuranPagesComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'QuranPagesComponent',
  data() {
    return {
      currentPage: 1,
      currentPageInput: 1,
      jumpToPageInput: '',
      pageMetadata: null,
      loading: false,
      error: null,
      sidebarCollapsed: false,
      showSwipeTip: true,
      transitionName: 'slide-next',
      // Touch handling
      touchStartX: 0,
      touchEndX: 0,
      minSwipeDistance: 50
    };
  },
  computed: {
    pageRange() {
      // Show pages around current page in sidebar
      const range = [];
      const start = Math.max(1, this.currentPage - 10);
      const end = Math.min(604, this.currentPage + 10);
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    }
  },
  mounted() {
    // Check URL for page parameter
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam);
      if (page >= 1 && page <= 604) {
        this.currentPage = page;
        this.currentPageInput = page;
      }
    }
    this.loadPage(this.currentPage);

    // Keyboard navigation
    window.addEventListener('keydown', this.handleKeyPress);

    // Check if swipe tip was dismissed
    if (localStorage.getItem('quran-pages-swipe-tip-dismissed')) {
      this.showSwipeTip = false;
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  methods: {
    async loadPage(pageNumber) {
      if (pageNumber < 1 || pageNumber > 604) {
        this.error = 'Invalid page number. Please enter a number between 1 and 604.';
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/api/quran-pages/${pageNumber}`);
        this.pageMetadata = response.data;
        this.currentPage = pageNumber;
        this.currentPageInput = pageNumber;

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('page', pageNumber);
        window.history.pushState({}, '', url);
      } catch (err) {
        var _err$response;
        console.error('Error loading page:', err);
        this.error = ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.error) || 'Failed to load page metadata. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    goToPage(pageNumber) {
      if (pageNumber === this.currentPage) return;
      this.transitionName = pageNumber > this.currentPage ? 'slide-next' : 'slide-prev';
      this.loadPage(pageNumber);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.transitionName = 'slide-prev';
        this.loadPage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < 604) {
        this.transitionName = 'slide-next';
        this.loadPage(this.currentPage + 1);
      }
    },
    jumpToPage() {
      const page = parseInt(this.jumpToPageInput);
      if (page >= 1 && page <= 604) {
        this.goToPage(page);
        this.jumpToPageInput = '';
      }
    },
    goToPageFromInput() {
      const page = parseInt(this.currentPageInput);
      if (page >= 1 && page <= 604 && page !== this.currentPage) {
        this.goToPage(page);
      } else {
        this.currentPageInput = this.currentPage;
      }
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    handleKeyPress(e) {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT') return;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextPage();
          break;
        case 'Home':
          e.preventDefault();
          this.goToPage(1);
          break;
        case 'End':
          e.preventDefault();
          this.goToPage(604);
          break;
      }
    },
    // Touch handling for mobile swipe
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchMove(e) {
      // Prevent default to avoid scrolling while swiping
      if (Math.abs(e.changedTouches[0].screenX - this.touchStartX) > 10) {
        e.preventDefault();
      }
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe() {
      const swipeDistance = this.touchEndX - this.touchStartX;
      if (Math.abs(swipeDistance) > this.minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swipe right - previous page
          this.previousPage();
        } else {
          // Swipe left - next page
          this.nextPage();
        }
      }
    },
    dismissSwipeTip() {
      this.showSwipeTip = false;
      localStorage.setItem('quran-pages-swipe-tip-dismissed', 'true');
    },
    shouldShowBismillah(surah) {
      // Show Bismillah for all surahs except Al-Fatiha (1) and At-Tawbah (9)
      // And only show at the beginning of the surah
      if (surah.number === 1 || surah.number === 9) {
        return false;
      }
      // Check if this is the first page of the surah
      if (this.pageMetadata && this.pageMetadata.ayahs && this.pageMetadata.ayahs.length > 0) {
        const firstAyah = this.pageMetadata.ayahs[0];
        return firstAyah.surahNumber === surah.number && firstAyah.numberInSurah === 1;
      }
      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "page-layout"
};
const _hoisted_2 = {
  class: "sidebar-header"
};
const _hoisted_3 = {
  key: 0,
  class: "sidebar-title"
};
const _hoisted_4 = ["title"];
const _hoisted_5 = {
  key: 0,
  class: "sidebar-content"
};
const _hoisted_6 = {
  class: "quick-jump mb-3"
};
const _hoisted_7 = {
  class: "page-list"
};
const _hoisted_8 = ["onClick"];
const _hoisted_9 = {
  class: "page-number"
};
const _hoisted_10 = {
  class: "page-content"
};
const _hoisted_11 = {
  key: 0,
  class: "page-info-bar"
};
const _hoisted_12 = {
  class: "info-item"
};
const _hoisted_13 = {
  key: 0,
  class: "info-item"
};
const _hoisted_14 = {
  key: 1,
  class: "info-item"
};
const _hoisted_15 = {
  class: "navigation-controls desktop-only"
};
const _hoisted_16 = ["disabled"];
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  class: "page-indicator"
};
const _hoisted_19 = ["disabled"];
const _hoisted_20 = ["disabled"];
const _hoisted_21 = {
  key: 0,
  class: "loading-spinner"
};
const _hoisted_22 = {
  class: "mt-3"
};
const _hoisted_23 = {
  key: 1,
  class: "error-message"
};
const _hoisted_24 = {
  class: "page-header-info"
};
const _hoisted_25 = {
  class: "surah-name"
};
const _hoisted_26 = {
  class: "surah-english"
};
const _hoisted_27 = {
  key: 0,
  class: "bismillah"
};
const _hoisted_28 = {
  class: "ayahs-container"
};
const _hoisted_29 = {
  class: "ayah-number"
};
const _hoisted_30 = {
  class: "navigation-controls mobile-only"
};
const _hoisted_31 = ["disabled"];
const _hoisted_32 = {
  class: "page-indicator-mobile"
};
const _hoisted_33 = ["disabled"];
const _hoisted_34 = {
  key: 1,
  class: "swipe-tip alert alert-info"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-pages-container", {
      'sidebar-collapsed': $data.sidebarCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header "), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold text-center mb-4"
  }, "Quran Page Viewer"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-muted mb-4"
  }, "Browse all 604 pages of the Holy Quran")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Layout "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-sidebar", {
      'collapsed': $data.sidebarCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [!$data.sidebarCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h5", _hoisted_3, "Pages")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleSidebar && $options.toggleSidebar(...args)),
    class: "sidebar-toggle-btn",
    title: $data.sidebarCollapsed ? 'Expand' : 'Collapse'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_4)]), !$data.sidebarCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Jump "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Jump to Page", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "form-control",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.jumpToPageInput = $event),
    onKeyup: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.jumpToPage && $options.jumpToPage(...args), ["enter"])),
    min: "1",
    max: "604",
    placeholder: "1-604"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.jumpToPageInput, void 0, {
    number: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[3] || (_cache[3] = (...args) => $options.jumpToPage && $options.jumpToPage(...args)),
    class: "btn btn-primary btn-sm mt-2 w-100"
  }, "Go")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Page List "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.pageRange, page => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: page,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        'active': page === $data.currentPage
      }]),
      onClick: $event => $options.goToPage(page)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, "Page " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(page), 1 /* TEXT */), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-chevron-right"
    }, null, -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Page Info Bar "), $data.pageMetadata ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-book"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Page " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage) + " of 604", 1 /* TEXT */)]), $data.pageMetadata.juz ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-bookmark"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Juz " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pageMetadata.juz), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pageMetadata.surahs && $data.pageMetadata.surahs.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pageMetadata.surahs.map(s => s.englishName).join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Controls (Desktop) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[4] || (_cache[4] = $event => $options.goToPage(1)),
    class: "nav-btn",
    disabled: $data.currentPage === 1,
    title: "First Page"
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-step-backward"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_16), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[5] || (_cache[5] = (...args) => $options.previousPage && $options.previousPage(...args)),
    class: "nav-btn",
    disabled: $data.currentPage === 1,
    title: "Previous Page"
  }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chevron-left"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.currentPageInput = $event),
    onKeyup: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.goToPageFromInput && $options.goToPageFromInput(...args), ["enter"])),
    onBlur: _cache[8] || (_cache[8] = (...args) => $options.goToPageFromInput && $options.goToPageFromInput(...args)),
    class: "page-input",
    min: "1",
    max: "604"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.currentPageInput, void 0, {
    number: true
  }]]), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "page-total"
  }, "/ 604", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[9] || (_cache[9] = (...args) => $options.nextPage && $options.nextPage(...args)),
    class: "nav-btn",
    disabled: $data.currentPage === 604,
    title: "Next Page"
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chevron-right"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[10] || (_cache[10] = $event => $options.goToPage(604)),
    class: "nav-btn",
    disabled: $data.currentPage === 604,
    title: "Last Page"
  }, [...(_cache[27] || (_cache[27] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-step-forward"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Image Viewer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-viewer",
    onTouchstart: _cache[12] || (_cache[12] = (...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    onTouchmove: _cache[13] || (_cache[13] = (...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    onTouchend: _cache[14] || (_cache[14] = (...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args))
  }, [$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, "Loading page " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage) + "...", 1 /* TEXT */)])) : $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[11] || (_cache[11] = $event => $options.loadPage($data.currentPage)),
    class: "btn btn-primary"
  }, "Retry")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: $data.transitionName,
    mode: "out-in"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [!$data.loading && !$data.error && $data.pageMetadata ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: $data.currentPage,
      class: "quran-page-text"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pageMetadata.surahs, surah => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "surah-info",
        key: surah.number
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishNameTranslation), 1 /* TEXT */), $options.shouldShowBismillah(surah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pageMetadata.ayahs, (ayah, index) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: ayah.number,
        class: "ayah-text"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ayah.text) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, "﴿" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ayah.numberInSurah) + "﴾", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index < $data.pageMetadata.ayahs.length - 1 ? ' ' : ''), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"])], 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Navigation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[15] || (_cache[15] = (...args) => $options.previousPage && $options.previousPage(...args)),
    class: "nav-btn mobile-nav",
    disabled: $data.currentPage === 1
  }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chevron-left"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Previous", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage) + " / 604 ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[16] || (_cache[16] = (...args) => $options.nextPage && $options.nextPage(...args)),
    class: "nav-btn mobile-nav",
    disabled: $data.currentPage === 604
  }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Next", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chevron-right"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_33)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Swipe Tip (Mobile) "), $data.showSwipeTip ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "💡 Swipe left or right to navigate between pages", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[17] || (_cache[17] = (...args) => $options.dismissSwipeTip && $options.dismissSwipeTip(...args)),
    class: "btn-close"
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/QuranPagesComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/QuranPagesComponent.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuranPagesComponent_vue_vue_type_template_id_df86244e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true */ "./resources/js/components/QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true");
/* harmony import */ var _QuranPagesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuranPagesComponent.vue?vue&type=script&lang=js */ "./resources/js/components/QuranPagesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _QuranPagesComponent_vue_vue_type_style_index_0_id_df86244e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css */ "./resources/js/components/QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_QuranPagesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_QuranPagesComponent_vue_vue_type_template_id_df86244e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-df86244e"],['__file',"resources/js/components/QuranPagesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/QuranPagesComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/QuranPagesComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranPagesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranPagesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuranPagesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranPagesComponent_vue_vue_type_style_index_0_id_df86244e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=style&index=0&id=df86244e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranPagesComponent_vue_vue_type_template_id_df86244e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranPagesComponent_vue_vue_type_template_id_df86244e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranPagesComponent.vue?vue&type=template&id=df86244e&scoped=true");


/***/ })

}]);