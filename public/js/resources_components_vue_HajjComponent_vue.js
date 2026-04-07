"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_HajjComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/hajj-umrah-content.json */ "./resources/data/hajj-umrah-content.json");



// --- State ---

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'HajjComponent',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    const scrollProgress = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const isScrolled = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const activeSection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('basics');
    const searchQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const showSearchDropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const openFaqIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

    // --- Search Data Index ---
    const searchIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const items = [];

      // Basics
      _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__.basics.cards.forEach(card => {
        items.push({
          category: 'Basics',
          title: card.title,
          section: 'basics'
        });
      });

      // Umrah Steps
      _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__.umrah.steps.forEach((step, idx) => {
        items.push({
          category: 'Umrah',
          title: `Step ${idx + 1}: ${step.title}`,
          section: 'umrah'
        });
      });

      // Hajj Days
      _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__.hajj.days.forEach(day => {
        items.push({
          category: 'Hajj',
          title: day.title,
          section: 'hajj'
        });
      });

      // Do's & Don'ts
      _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__.dosAndDonts.dos.items.forEach(item => {
        items.push({
          category: 'Rules',
          title: `Do: ${item.substring(0, 60)}...`,
          section: 'dosdonts'
        });
      });

      // FAQ
      _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__.faq.items.forEach(faq => {
        items.push({
          category: 'FAQ',
          title: faq.question,
          section: 'resources'
        });
      });
      return items;
    });
    const filteredSearchResults = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const query = searchQuery.value.toLowerCase().trim();
      if (!query) return [];
      return searchIndex.value.filter(item => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)).slice(0, 8);
    });

    // --- Methods ---
    const handleScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      scrollProgress.value = doc.scrollTop / total * 100;
      isScrolled.value = doc.scrollTop > 100;

      // Update active section
      const sections = ['basics', 'umrah', 'hajj', 'dosdonts', 'resources'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            activeSection.value = section;
            break;
          }
        }
      }
    };
    const scrollToSection = id => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        activeSection.value = id;
      }
    };
    const performSearch = () => {
      if (filteredSearchResults.value.length > 0) {
        showSearchDropdown.value = true;
      }
    };
    const navigateToResult = result => {
      scrollToSection(result.section);
      searchQuery.value = '';
      showSearchDropdown.value = false;
    };
    const hideSearchDropdown = () => {
      setTimeout(() => {
        showSearchDropdown.value = false;
      }, 200);
    };
    const toggleFaq = index => {
      openFaqIndex.value = openFaqIndex.value === index ? null : index;
    };

    // --- Lifecycle ---
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    const __returned__ = {
      scrollProgress,
      isScrolled,
      activeSection,
      searchQuery,
      showSearchDropdown,
      openFaqIndex,
      searchIndex,
      filteredSearchResults,
      handleScroll,
      scrollToSection,
      performSearch,
      navigateToResult,
      hideSearchDropdown,
      toggleFaq,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onUnmounted: vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted,
      get content() {
        return _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_1__;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "hajj-guide-premium"
};
const _hoisted_2 = {
  class: "progress-bar"
};
const _hoisted_3 = {
  class: "header-content"
};
const _hoisted_4 = {
  class: "premium-nav"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  class: "hero-premium",
  id: "hero"
};
const _hoisted_7 = {
  class: "hero-content"
};
const _hoisted_8 = {
  class: "hero-actions"
};
const _hoisted_9 = {
  class: "search-premium"
};
const _hoisted_10 = {
  class: "search-container"
};
const _hoisted_11 = {
  class: "search-input-wrapper"
};
const _hoisted_12 = {
  key: 0,
  class: "search-results"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = {
  class: "result-category"
};
const _hoisted_15 = {
  class: "result-title"
};
const _hoisted_16 = {
  class: "section-premium",
  id: "basics"
};
const _hoisted_17 = {
  class: "cards-grid"
};
const _hoisted_18 = {
  class: "card-icon"
};
const _hoisted_19 = {
  class: "card-title"
};
const _hoisted_20 = {
  class: "card-description"
};
const _hoisted_21 = {
  class: "card-note"
};
const _hoisted_22 = {
  class: "note-label"
};
const _hoisted_23 = {
  class: "note-text"
};
const _hoisted_24 = {
  class: "hajj-types-container"
};
const _hoisted_25 = {
  class: "hajj-types-card"
};
const _hoisted_26 = {
  class: "types-header"
};
const _hoisted_27 = {
  class: "types-description"
};
const _hoisted_28 = {
  class: "types-progress"
};
const _hoisted_29 = {
  class: "progress-bar-mini"
};
const _hoisted_30 = {
  class: "progress-label"
};
const _hoisted_31 = {
  class: "types-note"
};
const _hoisted_32 = {
  class: "image-showcase"
};
const _hoisted_33 = {
  class: "image-wrapper"
};
const _hoisted_34 = ["src", "alt"];
const _hoisted_35 = {
  class: "image-caption"
};
const _hoisted_36 = {
  class: "audio-player"
};
const _hoisted_37 = {
  class: "player-header"
};
const _hoisted_38 = {
  class: "player-description"
};
const _hoisted_39 = ["src"];
const _hoisted_40 = {
  class: "section-premium alt-bg",
  id: "umrah"
};
const _hoisted_41 = {
  class: "steps-timeline"
};
const _hoisted_42 = {
  class: "timeline-marker"
};
const _hoisted_43 = {
  class: "marker-number"
};
const _hoisted_44 = {
  key: 0,
  class: "marker-line"
};
const _hoisted_45 = {
  class: "timeline-content"
};
const _hoisted_46 = {
  class: "step-title"
};
const _hoisted_47 = {
  class: "step-description"
};
const _hoisted_48 = {
  class: "step-tip"
};
const _hoisted_49 = ["href"];
const _hoisted_50 = {
  class: "conclusion-card"
};
const _hoisted_51 = {
  class: "section-premium",
  id: "hajj"
};
const _hoisted_52 = {
  class: "hajj-days-grid"
};
const _hoisted_53 = {
  class: "day-header"
};
const _hoisted_54 = {
  class: "day-date"
};
const _hoisted_55 = {
  class: "day-title"
};
const _hoisted_56 = {
  class: "day-description"
};
const _hoisted_57 = {
  key: 0,
  class: "day-reminder"
};
const _hoisted_58 = {
  key: 1,
  class: "day-image"
};
const _hoisted_59 = ["src", "alt"];
const _hoisted_60 = {
  class: "farewell-card"
};
const _hoisted_61 = {
  class: "section-premium alt-bg",
  id: "dosdonts"
};
const _hoisted_62 = {
  class: "rules-grid"
};
const _hoisted_63 = {
  class: "rules-card positive"
};
const _hoisted_64 = {
  class: "rules-header"
};
const _hoisted_65 = {
  class: "rules-list"
};
const _hoisted_66 = {
  class: "rules-card negative"
};
const _hoisted_67 = {
  class: "rules-header"
};
const _hoisted_68 = {
  class: "rules-list"
};
const _hoisted_69 = {
  class: "section-premium",
  id: "resources"
};
const _hoisted_70 = {
  class: "resources-grid"
};
const _hoisted_71 = {
  class: "resource-card"
};
const _hoisted_72 = {
  class: "app-list"
};
const _hoisted_73 = {
  class: "app-info"
};
const _hoisted_74 = {
  class: "app-name"
};
const _hoisted_75 = {
  class: "app-desc"
};
const _hoisted_76 = {
  class: "resource-card"
};
const _hoisted_77 = {
  class: "pdf-list"
};
const _hoisted_78 = ["href"];
const _hoisted_79 = {
  class: "faq-container"
};
const _hoisted_80 = ["onClick"];
const _hoisted_81 = {
  class: "faq-answer"
};
const _hoisted_82 = {
  class: "closing-dua"
};
const _hoisted_83 = {
  class: "dua-content"
};
const _hoisted_84 = {
  class: "closing-message"
};
const _hoisted_85 = {
  class: "premium-footer"
};
const _hoisted_86 = {
  class: "footer-content"
};
const _hoisted_87 = {
  class: "footer-disclaimer"
};
const _hoisted_88 = {
  class: "footer-attribution"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium Progress Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $setup.scrollProgress + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Elegant Sticky Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["premium-header", {
      'scrolled': $setup.isScrolled
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "brand"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "brand-icon"
  }, "🕋"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "brand-name"
  }, "The Sacred Journey")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_4, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.navigation.tabs, tab => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: tab.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-tab", {
        active: $setup.activeSection === tab.id
      }]),
      onClick: $event => $setup.scrollToSection(tab.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(tab.icon)
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tab.label), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_5);
  }), 128 /* KEYED_FRAGMENT */))])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_6, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-overlay"
  }, null, -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-bismillah"
  }, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", -1 /* CACHED */)), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "hero-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Hajj "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-accent"
  }, "&"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "Umrah")], -1 /* CACHED */)), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-subtitle"
  }, " A meticulously crafted, scholar-verified guide to the two most sacred journeys in Islam — designed with reverence, precision, and love. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-primary",
    onClick: _cache[0] || (_cache[0] = $event => $setup.scrollToSection('umrah'))
  }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Begin Umrah Guide ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "btn-arrow"
  }, "→", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-secondary",
    onClick: _cache[1] || (_cache[1] = $event => $setup.scrollToSection('hajj'))
  }, " Explore Hajj ")]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-meta"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-item"
  }, "📚 Scholarly Verified"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-item"
  }, "🌙 Updated 1446 AH"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-item"
  }, "🔒 Privacy First")], -1 /* CACHED */))]), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-scroll-indicator"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "scroll-mouse"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Discover")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "search-icon fas fa-search"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.searchQuery = $event),
    onFocus: _cache[3] || (_cache[3] = $event => $setup.showSearchDropdown = true),
    onBlur: $setup.hideSearchDropdown,
    placeholder: "Search rituals, rulings, days, or questions...",
    class: "search-input"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "search-btn",
    onClick: $setup.performSearch
  }, "Search")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "slide-fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.showSearchDropdown && $setup.filteredSearchResults.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.filteredSearchResults, (result, idx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: idx,
        class: "search-result-item",
        onClick: $event => $setup.navigateToResult(result)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.category), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.title), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_13);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Basics Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_16, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-eyebrow"
  }, "Chapter I"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, "Understanding the Sacred Pilgrimages"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " Foundational knowledge for your spiritual journey — clarity before action. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.basics.cards, (card, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "premium-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(card.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.noteTitle) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.note), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hajj Types "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.hajjTypes.title), 1 /* TEXT */), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "types-badge"
  }, "Recommended", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.hajjTypes.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-fill-mini",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $setup.content.basics.hajjTypes.progress
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.hajjTypes.progress) + " of pilgrims choose this method", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.hajjTypes.note), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Kaaba Image "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.content.basics.image.url,
    alt: $setup.content.basics.image.alt,
    class: "showcase-image"
  }, null, 8 /* PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.image.caption), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Talbiyah Audio "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-headphones-alt"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.audio.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.basics.audio.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("audio", {
    src: $setup.content.basics.audio.src,
    controls: "",
    class: "audio-control"
  }, null, 8 /* PROPS */, _hoisted_39)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Umrah Steps Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_40, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-eyebrow"
  }, "Chapter II"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, "Umrah — A Step-by-Step Journey"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " Four sacred acts that transform the heart — performed with intention and grace. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.umrah.steps, (step, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "timeline-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String(idx + 1).padStart(2, '0')), 1 /* TEXT */), idx < $setup.content.umrah.steps.length - 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-lightbulb"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.tip), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: step.video,
      target: "_blank",
      class: "step-video-link"
    }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-play-circle"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Watch Tutorial ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_49)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Umrah Conclusion "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.umrah.conclusion.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.umrah.conclusion.text), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hajj Days Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_51, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-eyebrow"
  }, "Chapter III"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, "Hajj — The Journey of a Lifetime"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " Day by day through the blessed ten days — from Mina to Muzdalifah to Arafah. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.hajj.days, (day, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "day-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.description), 1 /* TEXT */), day.reminder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-bell"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.reminder), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), day.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: day.image,
      alt: day.title,
      class: "day-img"
    }, null, 8 /* PROPS */, _hoisted_59)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Farewell Tawaf "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "farewell-icon"
  }, "🕋", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.hajj.farewell.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.hajj.farewell.description), 1 /* TEXT */), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "Sahih Muslim 1327", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Do's & Don'ts Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_61, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-eyebrow"
  }, "Chapter IV"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, "Rules & Etiquette in Ihram"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " What honors the sacred state — and what to avoid while in devotion. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Do's "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.dosAndDonts.dos.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_65, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.dosAndDonts.dos.items, (item, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: idx
    }, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Don'ts "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.dosAndDonts.donts.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_68, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.dosAndDonts.donts.items, (item, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: idx
    }, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Resources & FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_69, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-eyebrow"
  }, "Chapter V"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, "Resources & Guidance"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " Trusted tools, scholarly references, and answers to your questions. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Apps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.resources.apps.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.resources.apps.items, (app, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "app-item"
    }, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "app-icon"
    }, "📱", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_75, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" PDFs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.resources.pdfs.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.resources.pdfs.items, (pdf, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: idx,
      href: pdf.link,
      target: "_blank",
      class: "pdf-item"
    }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-file-pdf"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pdf.name), 1 /* TEXT */), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-external-link-alt"
    }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_78);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Accordion "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.faq.title), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.content.faq.items, (faq, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-item", {
        open: $setup.openFaqIndex === idx
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-question",
      onClick: $event => $setup.toggleFaq(idx)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.question), 1 /* TEXT */), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-chevron-down"
    }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_80), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer), 1 /* TEXT */)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Closing Dua "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dua-arabic"
  }, "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ", -1 /* CACHED */)), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "dua-english"
  }, "\"Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.\"", -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dua-reference"
  }, "Surah Al-Baqarah 2:127", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_84, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.closingMessage), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "footer-brand"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "footer-icon"
  }, "🕋"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "The Sacred Journey")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Disclaimer:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.disclaimer.text), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.content.attribution), 1 /* TEXT */)]), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "footer-copy"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "© 1446 AH / 2025 CE — Islamic Connect"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Made with reverence in Nottingham, England 🇬🇧")], -1 /* CACHED */))])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue":
/*!****************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");
/* harmony import */ var _HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-44a8361a"],['__file',"resources/components/vue/HajjComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");


/***/ }),

/***/ "./resources/data/hajj-umrah-content.json":
/*!************************************************!*\
  !*** ./resources/data/hajj-umrah-content.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"disclaimer":{"text":"This guide is for educational purposes only. Always consult a qualified scholar or your local Islamic authority for religious rulings (fatwas). While every effort has been made to ensure accuracy, practices may vary based on different schools of thought (madhab). Perform rituals as taught by the Prophet Muhammad (ﷺ) and verify specific rulings with a trusted scholar before your journey."},"attribution":"Content compiled from verified scholarly sources including: Islamweb (www.islamweb.net), Dar Al-Iftaa Al-Misriyyah (www.dar-alifta.org), Saudi Ministry of Hajj and Umrah (www.haj.gov.sa), and authentic Hadith collections (Bukhari & Muslim). All multimedia used are either public domain, properly licensed, or referenced with original sources. References available upon request.","navigation":{"tabs":[{"id":"basics","label":"📘 Basics","icon":"fas fa-book-open"},{"id":"umrah","label":"🕊️ Umrah Steps","icon":"fas fa-shoe-prints"},{"id":"hajj","label":"⛰️ Hajj Steps","icon":"fas fa-mountain"},{"id":"dosdonts","label":"✅ Do\'s & Don\'ts","icon":"fas fa-check-circle"},{"id":"resources","label":"📱 Resources & FAQ","icon":"fas fa-mobile-alt"}]},"basics":{"cards":[{"title":"What is Umrah?","icon":"fas fa-star-of-life","description":"The \'minor pilgrimage\' — a highly recommended act of worship that can be performed any time of year. It is not obligatory but carries immense reward. Consists of four main rituals: Ihram → Tawaf → Sa\'i → Tahallul.","noteTitle":"Scholarly Note","note":"According to the Hanafi and Shafi\'i schools, Umrah is Sunnah Mu\'akkadah (emphasized Sunnah). According to the Maliki and Hanbali schools, it is obligatory once in a lifetime. (Source: Islamweb Fatwa 84291)"},{"title":"What is Hajj?","icon":"fas fa-mosque","description":"The fifth pillar of Islam. Obligatory once in a lifetime for every sane, adult Muslim who is physically and financially able. Occurs during Shawwal, Dhul-Qi\'dah, and first 10 days of Dhul-Hijjah.","noteTitle":"Quran Reference","note":"Allah says: \'And [due] to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way.\' (Surah Ali \'Imran 3:97)"}],"hajjTypes":{"title":"The Three Types of Hajj","description":"Hajj At-Tamattu\' (Interrupted Pilgrimage) — Perform Umrah first, fully come out of Ihram, then re-enter Ihram for Hajj on the 8th of Dhul-Hijjah. This is the easiest and most recommended method for beginners, as recommended by the Prophet Muhammad (ﷺ) for those who did not bring a sacrificial animal.","progress":"70%","note":"Recommended for beginners · Most common method · What the Prophet ﷺ recommended for most pilgrims (Sahih Bukhari 1519)"},"image":{"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kaaba_Mecca_Saudi_Arabia_2025.jpg/640px-Kaaba_Mecca_Saudi_Arabia_2025.jpg","alt":"The Holy Kaaba in Mecca","caption":"The Holy Kaaba — Qibla of Muslims (Image: Wikimedia Commons, Public Domain)"},"audio":{"title":"Listen: Talbiyah (The Pilgrim\'s Call)","src":"https://www.islamweb.net/audio/talbiyah.mp3","description":"\\"Labbayka Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-ni\'mata laka wal-mulk, la sharika lak.\\" — Recite from the Meeqat until the first Tawaf. (Source: Islamweb Audio Library)"}},"umrah":{"steps":[{"title":"Ihram (Sacred State)","description":"At the Meeqat (designated point), perform Ghusl (full bath), wear white seamless garments (men), make intention for Umrah, and recite the Talbiyah.","tip":"Women can wear any modest clothing that covers properly, but should not wear a face veil (Niqab) or gloves while in Ihram. Perfume is prohibited on body or clothes.","video":"https://www.youtube.com/watch?v=7qVv0hVpGQk"},{"title":"Tawaf","description":"Circle the Kaaba 7 times counter-clockwise, starting at the Black Stone (or its alignment). Each circuit is called a \'Shawt\'.","tip":"Men should perform \'Idtiba\' (right shoulder uncovered) and \'Raml\' (fast walking with small steps) during the first 3 circuits. Make sincere Du\'a between the corners.","video":"https://www.youtube.com/watch?v=Gz5C9B0Mv1g"},{"title":"Sa\'i","description":"Walk between the hills of Safa and Marwah 7 laps (approximately 4.5 km total distance).","tip":"Make abundant Du\'a, especially between the two green light markers where Hajar (AS) ran. Men are encouraged to run between the green lights.","video":"https://www.youtube.com/watch?v=8jHnQwXzL2o"},{"title":"Tahallul","description":"Men shave their head completely (Halq) or trim hair evenly (Qasr). Women cut a fingertip\'s length from their hair.","tip":"Shaving the head is preferred for men (Sunnah) and signifies complete humility. Trimming is also acceptable. This act ends the state of Ihram.","video":"https://www.youtube.com/watch?v=3NqQcWzLq2A"}],"conclusion":{"title":"After Umrah","text":"You are now completely free from Ihram until the days of Hajj (if performing Hajj At-Tamattu\'). All normal activities (including perfume, sewn clothes, marital relations) are permissible again."}},"hajj":{"days":[{"title":"8th Dhul-Hijjah (Tarwiyah Day)","date":"Day 1","description":"Enter into Ihram for Hajj from your place in Mecca. Proceed to Mina before Dhuhr. Stay overnight in Mina. Pray Dhuhr, Asr, Maghrib, and Isha (shortened to 2 rak\'ahs each, but not combined). Spend the night in worship and preparation.","reminder":"Prepare your heart and belongings. This is the official start of Hajj. Ensure you have enough water and supplies for the coming days.","image":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mina_tents.jpg/640px-Mina_tents.jpg"},{"title":"9th Dhul-Hijjah (Day of Arafah)","date":"Most Important Day","description":"Depart Mina after sunrise for the Plain of Arafat. Stand within the boundaries of Arafat until sunset (Wuquf). This is the most critical pillar of Hajj. Make sincere repentance and Du\'a. The Prophet (ﷺ) said: \'Hajj is Arafah.\' After sunset, proceed to Muzdalifah without praying Maghrib.","reminder":"Hajj is not valid without standing at Arafat, even for a moment. The best Du\'a is the one made on the Day of Arafah. (Sunan al-Tirmidhi 3585)","image":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Jabal_al-Rahmah.jpg/640px-Jabal_al-Rahmah.jpg"},{"title":"9th Night: Muzdalifah","date":"Night after Arafah","description":"Arrive in Muzdalifah after sunset. Pray Maghrib and Isha combined (Jam\'a Takhir). Collect 49 or 70 small pebbles for the stoning ritual. Spend the night in worship under the open sky. Sleep is permitted but worship is preferred.","reminder":"Muzdalifah is cold at night. Bring a blanket or sleeping bag. Do not miss Fajr prayer here before departing to Mina.","image":""},{"title":"10th Dhul-Hijjah (Eid al-Adha - Day of Sacrifice)","date":"Day 3 - The Grand Day","description":"Perform the following in order: 1) Stone Jamrat Al-Aqabah (the large pillar) with 7 pebbles. 2) Slaughter a sacrificial animal (Hady) or pay for a voucher. 3) Shave or trim head (Halq or Qasr). 4) Perform Tawaf Al-Ifadah and Sa\'i in Mecca. After Tawaf Al-Ifadah, all restrictions of Ihram are lifted except marital relations.","reminder":"If you cannot afford the sacrifice, fast 3 days during Hajj and 7 days after returning home (total 10 days). (Surah Al-Baqarah 2:196)","image":""},{"title":"11th-12th Dhul-Hijjah (Ayyam Al-Tashreeq)","date":"Days 4-5","description":"Stay in Mina. Stone all three pillars (Small, Middle, Large) with 7 pebbles each, every day, after Dhuhr prayer. The stoning symbolizes rejection of Shaytan and following the footsteps of Prophet Ibrahim (AS).","reminder":"You may leave Mina on the 12th of Dhul-Hijjah before sunset. If you stay until the 13th (the third day of Tashreeq), it is more virtuous. Do not push in crowds; safety is paramount.","image":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Jamarat_Bridge.jpg/640px-Jamarat_Bridge.jpg"}],"farewell":{"title":"Tawaf Al-Wada (Farewell Tawaf)","description":"Before leaving Mecca, perform a final farewell Tawaf of the Kaaba. The Prophet (ﷺ) said: \'None of you should leave until the last of his interaction with the House is the Tawaf.\' (Sahih Muslim 1327). Do not leave without saying goodbye to the House of Allah."}},"dosAndDonts":{"dos":{"title":"✅ Do\'s (Sunnah & Essential Tips)","items":["Make constant Du\'a — there is no specific required supplication for Tawaf; recite any Quran or make personal Du\'a.","Be gentle and patient with others, especially in crowds and during stoning.","Men should perform \'Raml\' (fast walking) in the first 3 circuits of Tawaf and \'Idtiba\' (right shoulder uncovered).","Travel with a knowledgeable scholar or a reputable, licensed Hajj group.","Physically prepare weeks in advance — walk 5-10 km daily to build stamina.","Use tracking devices (like AirTags) on your luggage, shoe bag, and important belongings.","Drink plenty of Zamzam water and stay hydrated.","Respect all pilgrims regardless of nationality, race, or school of thought."]},"donts":{"title":"❌ Don\'ts (Prohibitions in Ihram)","items":["Men: No sewn clothes (shirts, pants, underwear, socks, shoes covering ankles), no covering the head.","Women: No face veil (Niqab) and no gloves. (Hands and face may remain uncovered but modestly).","No cutting hair or nails.","No perfume or scented products on body or clothes (including scented soaps, lotions, deodorants).","No marital relations or acts leading to arousal.","No arguing, fighting, foul language, or raising voices.","No hunting or killing animals (including insects).","No wearing of leather socks (khuffain) unless no other footwear available."]}},"resources":{"apps":{"title":"Essential Mobile Applications","items":[{"name":"Nusuk (Official Saudi App)","description":"Essential for booking Hajj/Umrah permits, prayer times at the Haram, crowd level monitoring, and emergency services."},{"name":"Hajj & Umrah Full Guide","description":"Contains step-by-step rituals, interactive maps, to-do lists, and verified fatwas. Available on iOS and Android."},{"name":"Eatmarna (Permits App)","description":"Required for obtaining time-slotted permits for Umrah and Rawdah visitation in Medina."}]},"pdfs":{"title":"Free Scholarly PDF Guides (Download)","items":[{"name":"Dar Al-Iftaa Al-Misriyyah - Pictorial Hajj Guide","link":"http://www.dar-alifta.org/Books/Hajj1435.pdf"},{"name":"Ministry of Hajj & Umrah - Official English Manual","link":"https://www.haj.gov.sa/en/Pages/default.aspx"},{"name":"\\"A Brief Guide to the Rites of Hajj and Umrah\\" by Shaykh Usaamah Al-Qoosi","link":"#"}]}},"faq":{"title":"Frequently Asked Questions (FAQ)","items":[{"question":"What if a woman gets her period (menstruation) during Hajj?","answer":"A menstruating woman cannot perform Tawaf. She should do all other rites (standing at Arafat, staying in Muzdalifah, stoning the pillars, staying in Mina). She must wait until she is completely pure (after bleeding stops and she performs Ghusl) to perform Tawaf Al-Ifadah. This Tawaf is a pillar of Hajj and must be done. (Source: Islamweb Fatwa 13385)"},{"question":"Can I use scented deodorant or soap while in Ihram?","answer":"Absolutely not. Any perfume or scented product on the body or Ihram garments invalidates that act of worship if done intentionally. Use only unscented, fragrance-free soap, lotion, and deodorant. The prohibition applies even to scented wipes. (Sahih Bukhari & Muslim)"},{"question":"I am elderly or sick. Do I have to walk during Tawaf and Sa\'i?","answer":"No. Wheelchairs are readily available for rent (or free at some locations) at the Haram and in Mina/Arafat. You can perform Tawaf and Sa\'i while seated in a wheelchair. For Sa\'i, the wheelchair path is clearly marked. For those unable to even ride a wheelchair, a proxy can perform Tawaf on their behalf, but this requires a scholarly ruling."},{"question":"Is travel insurance necessary for Hajj or Umrah?","answer":"While not legally mandatory for the visa, it is highly recommended (and some countries require it). Medical emergencies in Saudi Arabia can be extremely expensive. Insurance also covers trip cancellation, lost luggage, and emergency evacuation. Choose a policy specifically covering Hajj/Umrah."},{"question":"Can I perform Hajj on behalf of someone else?","answer":"Yes, if you have already performed Hajj for yourself, you may perform Hajj (or Umrah) on behalf of a deceased person or someone who is physically unable and permanently incapacitated (e.g., chronic illness, extreme old age). The proxy must first perform their own Hajj obligation. (Source: Dar Al-Iftaa)"},{"question":"What is the penalty if I break a prohibition of Ihram?","answer":"It depends on the violation. For wearing sewn clothes or covering head (men), or using perfume, the penalty is either: sacrifice a sheep (Fidyah), or feed 6 poor people, or fast 3 days. For cutting hair/nails, feed one poor person or fast 1 day. For marital relations before the first Tahallul, the Hajj is invalid and must be repeated next year with a sacrifice. Consult a scholar immediately."}]},"closingMessage":"May Allah accept your efforts, forgive your sins, and grant you a blessed and safe journey. Ameen. 🤲"}');

/***/ })

}]);