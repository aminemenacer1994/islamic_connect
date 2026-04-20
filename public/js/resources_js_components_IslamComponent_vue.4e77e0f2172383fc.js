"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_IslamComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/discover-islam-content.json */ "./resources/data/discover-islam-content.json");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DiscoverIslamMobile',
  data() {
    return {
      contentData: _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_0__,
      searchQuery: '',
      searchResults: [],
      openFaq: null
    };
  },
  mounted() {
    // Trigger fade-in animations for mobile
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  },
  methods: {
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },
    filterContent() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }
      const query = this.searchQuery.toLowerCase();
      const results = [];
      let id = 0;
      const sections = [{
        name: 'basics',
        title: 'What is Islam?',
        content: this.contentData.basics.description,
        icon: 'fas fa-star-of-life'
      }, {
        name: 'shahada',
        title: 'The Shahada',
        content: this.contentData.shahada.explanation,
        icon: 'fas fa-certificate'
      }, {
        name: 'allah',
        title: 'Who is Allah?',
        content: this.contentData.allah.description,
        icon: 'fas fa-allah'
      }, {
        name: 'prophet',
        title: 'Prophet Muhammad',
        content: this.contentData.prophet.description,
        icon: 'fas fa-muhammad'
      }, {
        name: 'quran',
        title: 'The Holy Quran',
        content: this.contentData.quran.description,
        icon: 'fas fa-quran'
      }, {
        name: 'salah',
        title: 'Salah',
        content: this.contentData.salah.description,
        icon: 'fas fa-pray'
      }, {
        name: 'zakat',
        title: 'Zakat',
        content: this.contentData.zakat.description,
        icon: 'fas fa-hand-holding-heart'
      }];
      sections.forEach(section => {
        if (section.title.toLowerCase().includes(query) || section.content.toLowerCase().includes(query)) {
          results.push({
            id: id++,
            title: section.title,
            excerpt: section.content.substring(0, 60) + '...',
            sectionId: section.name,
            icon: section.icon
          });
        }
      });
      this.contentData.faqs.forEach((faq, idx) => {
        if (faq.question.toLowerCase().includes(query)) {
          results.push({
            id: id++,
            title: faq.question.substring(0, 40),
            excerpt: faq.answer.substring(0, 60) + '...',
            sectionId: 'faq',
            icon: 'fas fa-question'
          });
        }
      });
      this.searchResults = results;
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        this.searchQuery = '';
        this.searchResults = [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "islam-guide-mobile"
};
const _hoisted_2 = {
  class: "hero-mobile"
};
const _hoisted_3 = {
  class: "container-fluid px-3 px-sm-4"
};
const _hoisted_4 = {
  class: "row justify-content-center"
};
const _hoisted_5 = {
  class: "col-12 text-center"
};
const _hoisted_6 = {
  class: "hero-badge-mobile"
};
const _hoisted_7 = {
  class: "hero-title-mobile"
};
const _hoisted_8 = {
  class: "hero-subtitle-mobile"
};
const _hoisted_9 = {
  class: "search-mobile-wrapper"
};
const _hoisted_10 = {
  class: "search-mobile"
};
const _hoisted_11 = {
  key: 0,
  class: "search-mobile-results"
};
const _hoisted_12 = ["onClick"];
const _hoisted_13 = {
  class: "search-result-info-mobile"
};
const _hoisted_14 = {
  class: "search-result-title-mobile"
};
const _hoisted_15 = {
  class: "search-result-excerpt-mobile"
};
const _hoisted_16 = {
  class: "container-fluid px-3 px-sm-4 px-md-5 main-container-mobile"
};
const _hoisted_17 = {
  class: "disclaimer-mobile"
};
const _hoisted_18 = {
  class: "disclaimer-content-mobile"
};
const _hoisted_19 = {
  class: "section-mobile",
  id: "basics"
};
const _hoisted_20 = {
  class: "section-header-mobile"
};
const _hoisted_21 = {
  class: "section-icon-mobile"
};
const _hoisted_22 = {
  class: "section-subtitle-mobile"
};
const _hoisted_23 = {
  class: "row g-3"
};
const _hoisted_24 = {
  class: "col-12"
};
const _hoisted_25 = {
  class: "card-mobile"
};
const _hoisted_26 = {
  class: "card-header-mobile"
};
const _hoisted_27 = {
  class: "card-body-mobile"
};
const _hoisted_28 = {
  class: "col-12"
};
const _hoisted_29 = {
  class: "card-mobile"
};
const _hoisted_30 = {
  class: "card-header-mobile"
};
const _hoisted_31 = {
  class: "card-body-mobile"
};
const _hoisted_32 = {
  class: "section-mobile",
  id: "shahada"
};
const _hoisted_33 = {
  class: "section-header-mobile"
};
const _hoisted_34 = {
  class: "shahada-mobile"
};
const _hoisted_35 = {
  class: "shahada-content-mobile"
};
const _hoisted_36 = {
  class: "shahada-arabic-mobile"
};
const _hoisted_37 = {
  class: "shahada-transliteration-mobile"
};
const _hoisted_38 = {
  class: "shahada-translation-mobile"
};
const _hoisted_39 = {
  class: "shahada-explanation-mobile"
};
const _hoisted_40 = {
  class: "section-mobile",
  id: "allah"
};
const _hoisted_41 = {
  class: "section-header-mobile"
};
const _hoisted_42 = {
  class: "card-mobile"
};
const _hoisted_43 = {
  class: "card-body-mobile"
};
const _hoisted_44 = {
  class: "lead-text-mobile"
};
const _hoisted_45 = {
  class: "names-grid-mobile"
};
const _hoisted_46 = {
  class: "quran-mobile mt-3"
};
const _hoisted_47 = {
  class: "small"
};
const _hoisted_48 = {
  class: "section-mobile",
  id: "prophet"
};
const _hoisted_49 = {
  class: "section-header-mobile"
};
const _hoisted_50 = {
  class: "card-mobile"
};
const _hoisted_51 = {
  class: "card-body-mobile"
};
const _hoisted_52 = {
  class: "small"
};
const _hoisted_53 = {
  class: "section-mobile",
  id: "quran"
};
const _hoisted_54 = {
  class: "section-header-mobile"
};
const _hoisted_55 = {
  class: "card-mobile"
};
const _hoisted_56 = {
  class: "card-body-mobile"
};
const _hoisted_57 = {
  class: "small"
};
const _hoisted_58 = {
  class: "quran-mobile mt-3"
};
const _hoisted_59 = {
  class: "small"
};
const _hoisted_60 = {
  class: "section-mobile",
  id: "salah"
};
const _hoisted_61 = {
  class: "section-header-mobile"
};
const _hoisted_62 = {
  class: "card-mobile"
};
const _hoisted_63 = {
  class: "card-body-mobile"
};
const _hoisted_64 = {
  class: "small"
};
const _hoisted_65 = {
  class: "table-responsive-mobile mt-3"
};
const _hoisted_66 = {
  class: "table-mobile"
};
const _hoisted_67 = {
  class: "small"
};
const _hoisted_68 = {
  class: "quran-mobile mt-3"
};
const _hoisted_69 = {
  class: "small"
};
const _hoisted_70 = {
  class: "section-mobile",
  id: "zakat"
};
const _hoisted_71 = {
  class: "section-header-mobile"
};
const _hoisted_72 = {
  class: "card-mobile"
};
const _hoisted_73 = {
  class: "card-body-mobile"
};
const _hoisted_74 = {
  class: "small"
};
const _hoisted_75 = {
  class: "row g-2"
};
const _hoisted_76 = {
  class: "list-item-mobile small"
};
const _hoisted_77 = {
  class: "quran-mobile mt-3"
};
const _hoisted_78 = {
  class: "small"
};
const _hoisted_79 = {
  class: "section-mobile",
  id: "sawm"
};
const _hoisted_80 = {
  class: "section-header-mobile"
};
const _hoisted_81 = {
  class: "card-mobile"
};
const _hoisted_82 = {
  class: "card-body-mobile"
};
const _hoisted_83 = {
  class: "small"
};
const _hoisted_84 = {
  class: "quran-mobile mt-3"
};
const _hoisted_85 = {
  class: "small"
};
const _hoisted_86 = {
  class: "section-mobile",
  id: "hajj"
};
const _hoisted_87 = {
  class: "section-header-mobile"
};
const _hoisted_88 = {
  class: "card-mobile"
};
const _hoisted_89 = {
  class: "card-body-mobile"
};
const _hoisted_90 = {
  class: "small"
};
const _hoisted_91 = {
  class: "row g-2"
};
const _hoisted_92 = {
  class: "list-item-mobile small"
};
const _hoisted_93 = {
  class: "quran-mobile mt-3"
};
const _hoisted_94 = {
  class: "small"
};
const _hoisted_95 = {
  class: "section-mobile",
  id: "dosdonts"
};
const _hoisted_96 = {
  class: "row g-3"
};
const _hoisted_97 = {
  class: "col-12"
};
const _hoisted_98 = {
  class: "card-mobile dos-mobile"
};
const _hoisted_99 = {
  class: "card-body-mobile"
};
const _hoisted_100 = {
  class: "col-12"
};
const _hoisted_101 = {
  class: "card-mobile donts-mobile"
};
const _hoisted_102 = {
  class: "card-body-mobile"
};
const _hoisted_103 = {
  class: "section-mobile",
  id: "faq"
};
const _hoisted_104 = {
  class: "faq-mobile-grid"
};
const _hoisted_105 = ["onClick"];
const _hoisted_106 = {
  class: "small fw-semibold"
};
const _hoisted_107 = {
  key: 0,
  class: "faq-mobile-answer small"
};
const _hoisted_108 = {
  class: "section-mobile",
  id: "resources"
};
const _hoisted_109 = {
  class: "row g-3"
};
const _hoisted_110 = {
  class: "col-12"
};
const _hoisted_111 = {
  class: "card-mobile"
};
const _hoisted_112 = {
  class: "card-body-mobile"
};
const _hoisted_113 = {
  class: "small"
};
const _hoisted_114 = {
  class: "small text-muted mb-0"
};
const _hoisted_115 = {
  class: "col-12"
};
const _hoisted_116 = {
  class: "card-mobile"
};
const _hoisted_117 = {
  class: "card-body-mobile"
};
const _hoisted_118 = ["href"];
const _hoisted_119 = {
  class: "closing-mobile"
};
const _hoisted_120 = {
  class: "small"
};
const _hoisted_121 = {
  class: "attribution-mobile"
};
const _hoisted_122 = {
  class: "small"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Hero Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-bg"
  }, null, -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.hero.badge), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_7, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "title-icon-mobile"
  }, "🕌", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.hero.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.hero.subtitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Optimized Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-search search-mobile-icon"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "search-mobile-input",
    placeholder: "Search Islam, pillars, prayers...",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    onInput: _cache[1] || (_cache[1] = (...args) => $options.filterContent && $options.filterContent(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "search-mobile-btn",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.filterContent && $options.filterContent(...args))
  }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-right"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Results Mobile "), $data.searchResults.length > 0 && $data.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.searchResults.slice(0, 5), result => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: result.id,
      class: "search-mobile-result",
      onClick: $event => $options.scrollToSection(result.sectionId)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(result.icon + ' search-result-icon-mobile')
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.excerpt), 1 /* TEXT */)])], 8 /* PROPS */, _hoisted_12);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Stats - Horizontal Scroll "), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-stats-mobile\" data-v-0d93bfcc><div class=\"hero-stat-mobile\" data-v-0d93bfcc><div class=\"hero-stat-circle-mobile\" data-v-0d93bfcc><i class=\"fas fa-star-of-life\" data-v-0d93bfcc></i></div><span data-v-0d93bfcc>6 Pillars</span></div><div class=\"hero-stat-mobile\" data-v-0d93bfcc><div class=\"hero-stat-circle-mobile\" data-v-0d93bfcc><i class=\"fas fa-praying-hands\" data-v-0d93bfcc></i></div><span data-v-0d93bfcc>5 Pillars</span></div><div class=\"hero-stat-mobile\" data-v-0d93bfcc><div class=\"hero-stat-circle-mobile\" data-v-0d93bfcc><i class=\"fas fa-quran\" data-v-0d93bfcc></i></div><span data-v-0d93bfcc>114 Surahs</span></div></div>", 1))])])]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-wave-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1440 120",
    preserveAspectRatio: "none"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    fill: "#FDFBF7",
    d: "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
  })])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Disclaimer Banner Mobile "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt disclaimer-icon-mobile"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Disclaimer:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.disclaimer.text.substring(0, 120)) + "... ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 1: What is Islam? "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.contentData.basics.icon)
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.basics.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.basics.description.substring(0, 100)) + "...", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-star-of-david"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.basics.coreBeliefs.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.basics.coreBeliefs.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item,
      class: "list-item-mobile"
    }, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */)), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ref-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hadith"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reference: Sahih Muslim 8")], -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-praying-hands"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.basics.corePractices.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.basics.corePractices.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item,
      class: "list-item-mobile"
    }, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */)), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ref-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hadith"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reference: Sahih Bukhari 8")], -1 /* CACHED */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Image Stack "), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"image-stack-mobile mt-3\" data-v-0d93bfcc><div class=\"image-stack-item\" data-v-0d93bfcc><img src=\"https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600\" alt=\"Islamic architecture\" class=\"img-mobile\" data-v-0d93bfcc><div class=\"image-stack-overlay\" data-v-0d93bfcc><span data-v-0d93bfcc>Sacred Architecture</span></div></div><div class=\"image-stack-item mt-2\" data-v-0d93bfcc><img src=\"https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600\" alt=\"Quran recitation\" class=\"img-mobile\" data-v-0d93bfcc><div class=\"image-stack-overlay\" data-v-0d93bfcc><span data-v-0d93bfcc>Divine Revelation</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Video "), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrapper-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    width: "100%",
    height: "200",
    src: "https://www.youtube.com/embed/1w2KtO13m_4?rel=0",
    title: "Introduction to Islam",
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen: ""
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-caption-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-play-circle"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Intro to Islam ")])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 2: Shahada "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile bg-green"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-certificate"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.shahada.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.shahada.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.shahada.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.shahada.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.shahada.explanation.substring(0, 150)) + "...", 1 /* TEXT */), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ref-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hadith"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reference: Sahih Muslim 8c")], -1 /* CACHED */))]), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "shahada-image-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Prayer"
  })], -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 3: Allah "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-allah"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.allah.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.allah.description.substring(0, 120)) + "...", 1 /* TEXT */), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3 mb-2"
  }, "Beautiful Names of Allah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.allah.attributes.slice(0, 5), name => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: name,
      class: "name-mobile"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.allah.quranReference.substring(0, 100)) + "...", 1 /* TEXT */)])])]), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-card-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Allah",
    class: "img-mobile-full"
  })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 4: Prophet Muhammad "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-muhammad"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.prophet.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.prophet.description.substring(0, 120)) + "...", 1 /* TEXT */), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3 mb-2"
  }, "Key Teachings", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.prophet.keyTeachings.slice(0, 4), teaching => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: teaching,
      class: "list-item-mobile"
    }, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-star text-gold"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(teaching), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"image-card-mobile mt-3\" data-v-0d93bfcc><img src=\"https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600\" alt=\"Medina Mosque\" class=\"img-mobile-full\" data-v-0d93bfcc></div><div class=\"ref-stack-mobile mt-3\" data-v-0d93bfcc><div class=\"ref-mobile\" data-v-0d93bfcc><i class=\"fas fa-quran\" data-v-0d93bfcc></i><span class=\"small\" data-v-0d93bfcc>Quran 68:4</span></div><div class=\"ref-mobile mt-2\" data-v-0d93bfcc><i class=\"fas fa-hadith\" data-v-0d93bfcc></i><span class=\"small\" data-v-0d93bfcc>Musnad Ahmad</span></div></div>", 2))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 5: Quran "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.quran.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.quran.description.substring(0, 120)) + "...", 1 /* TEXT */), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3 mb-2"
  }, "Facts about the Quran", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.quran.facts.slice(0, 4), fact => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: fact,
      class: "list-item-mobile"
    }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-book-open text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(fact), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.quran.reference.substring(0, 80)) + "...", 1 /* TEXT */)])])]), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-card-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Quran",
    class: "img-mobile-full"
  })], -1 /* CACHED */)), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrapper-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    width: "100%",
    height: "180",
    src: "https://www.youtube.com/embed/YDNT2R5_nbE?rel=0",
    title: "Quran Recitation",
    frameborder: "0",
    allowfullscreen: ""
  })])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 6: Salah "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-pray"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.salah.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.salah.description.substring(0, 100)) + "...", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_66, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Prayer"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Time"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Rak'ahs")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.salah.prayers, prayer => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: prayer.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.time), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.rakahs), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.salah.reference.substring(0, 80)) + "...", 1 /* TEXT */)])])]), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-card-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Praying Muslim",
    class: "img-mobile-full"
  })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 7: Zakat "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hand-holding-heart"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.zakat.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.zakat.description.substring(0, 100)) + "...", 1 /* TEXT */), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3 mb-2 small fw-bold"
  }, "Eligible Recipients", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.zakat.eligibleRecipients.slice(0, 6), recipient => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-6",
      key: recipient
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-users text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(recipient.substring(0, 20)), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.zakat.reference.substring(0, 80)) + "...", 1 /* TEXT */)])])]), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-card-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/6646946/pexels-photo-6646946.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Charity",
    class: "img-mobile-full"
  })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 8: Sawm "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-moon"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.sawm.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_83, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.sawm.description.substring(0, 100)) + "...", 1 /* TEXT */), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3 mb-2 small fw-bold"
  }, "Benefits of Fasting", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.sawm.benefits.slice(0, 4), benefit => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: benefit,
      class: "list-item-mobile small"
    }, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(benefit), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_85, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.sawm.reference.substring(0, 80)) + "...", 1 /* TEXT */)])])]), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-card-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/2804380/pexels-photo-2804380.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Iftar",
    class: "img-mobile-full"
  })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 9: Hajj "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-mosque"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.hajj.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.hajj.description.substring(0, 100)) + "...", 1 /* TEXT */), _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mt-3 mb-2 small fw-bold"
  }, "Key Rituals", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.hajj.keyRituals.slice(0, 4), ritual => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-6",
      key: ritual
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-shoe-prints text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ritual), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.hajj.reference.substring(0, 80)) + "...", 1 /* TEXT */)])])]), _cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-card-mobile mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Kaaba",
    class: "img-mobile-full"
  })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 10: Do's & Don'ts "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_95, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-clipboard-list"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Do's & Don'ts")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-mobile dos-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "small fw-bold"
  }, "Recommended")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.dosAndDonts.dos.slice(0, 6), item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item,
      class: "list-item-mobile small"
    }, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.substring(0, 60)) + "...", 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-mobile donts-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times-circle"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "small fw-bold"
  }, "Prohibited")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.dosAndDonts.donts.slice(0, 6), item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item,
      class: "list-item-mobile small"
    }, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times-circle text-danger"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.substring(0, 60)) + "...", 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 11: FAQ Accordion Mobile "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_103, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-question-circle"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "FAQs")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.faqs.slice(0, 5), (faq, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "faq-mobile-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-mobile-question",
      onClick: $event => $options.toggleFaq(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.openFaq === index ? 'fas fa-minus-circle' : 'fas fa-plus-circle')
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_106, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.question.substring(0, 50)) + "...", 1 /* TEXT */)], 8 /* PROPS */, _hoisted_105), $data.openFaq === index ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer.substring(0, 200)) + "... ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Section 12: Resources "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_108, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-icon-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-mobile-alt"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Resources")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-mobile-alt"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "small"
  }, "Apps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_112, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.appsAndResources.apps, app => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: app.name,
      class: "resource-mobile-item"
    }, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-download text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_113, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.description.substring(0, 50)) + "...", 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-mobile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-globe"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "small"
  }, "Websites")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentData.appsAndResources.websites, site => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: site.name,
      class: "resource-mobile-item"
    }, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-external-link-alt text-green"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: site.url,
      target: "_blank",
      class: "resource-link-mobile small"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(site.name), 9 /* TEXT, PROPS */, _hoisted_118)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Closing Message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-praying-hands"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_120, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.closingMessage), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Attribution "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quote-left"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_122, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.contentData.attribution.substring(0, 150)) + "...", 1 /* TEXT */)])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/data/discover-islam-content.json":
/*!****************************************************!*\
  !*** ./resources/data/discover-islam-content.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"disclaimer":{"text":"This guide is for educational purposes only. All information has been verified from the most trusted Islamic sources: Quran.com (Sahih International translation), Sunnah.com (authentic Hadith collections), Islamweb.net, Dar Al-Iftaa Al-Misriyyah, and Saudi Ministry of Islamic Affairs. Always consult a qualified scholar for specific religious rulings."},"attribution":"Content compiled from: Quran (Sahih International), Sahih Bukhari, Sahih Muslim, al-Muwatta, Sunan al-Tirmidhi, Islamweb (Fatwa Committee), Dar Al-Iftaa Al-Misriyyah. All references are cited inline. Images sourced from Pexels (free for use). Videos from respected educational Islamic YouTube channels.","theme":{"backgroundColor":"#2E9F90","titleColor":"#006D5B","accentColor":"#006D5B","textColor":"#2C3E50","description":"Light teal green background with deep teal titles for a calm, peaceful Islamic aesthetic."},"hero":{"title":"Discover Islam","subtitle":"A complete introduction to the faith of over 2 billion Muslims","badge":"Scholarly Verified","stats":[{"num":"6","label":"Pillars of Faith"},{"num":"5","label":"Pillars of Islam"},{"num":"114","label":"Surahs in Quran"},{"num":"99","label":"Names of Allah"}]},"searchSections":[{"id":"basics","emoji":"☪","title":"What is Islam?","excerpt":"The complete way of life — submission to Allah, covering core beliefs and five pillars."},{"id":"shahada","emoji":"🌙","title":"The Shahada","excerpt":"The declaration of faith — the first and most fundamental pillar."},{"id":"allah","emoji":"✦","title":"Who is Allah?","excerpt":"The One, Unique, Eternal Creator — 99 names, no partners."},{"id":"prophet","emoji":"⭐","title":"Prophet Muhammad ﷺ","excerpt":"The final messenger of Allah, born in Makkah 570 CE."},{"id":"quran","emoji":"📖","title":"The Holy Quran","excerpt":"114 chapters, 6,236 verses — literal word of Allah."},{"id":"salah","emoji":"🕌","title":"Salah — Daily Prayers","excerpt":"Five prayers daily: Fajr, Dhuhr, Asr, Maghrib, Isha."},{"id":"zakat","emoji":"💛","title":"Zakat — Charity","excerpt":"2.5% of savings given to those in need each year."},{"id":"sawm","emoji":"🌙","title":"Sawm — Fasting","excerpt":"Month-long fast during Ramadan, the 9th Islamic month."},{"id":"hajj","emoji":"🕋","title":"Hajj — Pilgrimage","excerpt":"Once-in-a-lifetime journey to Makkah in Dhul Hijjah."},{"id":"afterlife","emoji":"⏳","title":"The Afterlife","excerpt":"Resurrection, Judgement, Jannah and Jahannam."},{"id":"dosdonts","emoji":"📋","title":"Do\'s & Don\'ts","excerpt":"Recommended and prohibited actions in Islamic law."},{"id":"faq","emoji":"❓","title":"FAQ","excerpt":"Common questions answered with scholarly grounding."},{"id":"resources","emoji":"📱","title":"Apps & Resources","excerpt":"Muslim Pro, Quran.com, SeekersGuidance, Yaqeen and more."}],"basics":{"title":"What is Islam?","icon":"fas fa-star-of-life","description":"Islam is the final and complete revelation from Allah (God) to humanity. It means \'submission to the will of Allah\' and is a religion of peace, mercy, and justice.","coreBeliefs":{"title":"The Six Pillars of Iman (Faith)","items":["Belief in Allah (The One and Only God)","Belief in the Angels","Belief in the Revealed Books (Quran as final)","Belief in the Messengers (Muhammad ﷺ as final)","Belief in the Day of Judgment","Belief in Divine Decree (Qadr)"],"reference":"📖 Sahih Muslim 8 — Hadith of Jibril"},"corePractices":{"title":"The Five Pillars of Islam","items":["Shahada (Declaration of Faith)","Salah (Five Daily Prayers)","Zakat (Charity - 2.5% of qualifying savings)","Sawm (Fasting in Ramadan)","Hajj (Pilgrimage to Mecca)"],"reference":"📖 Sahih Bukhari 8 — Pillars of Islam"},"image":"https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=800","video":"https://www.youtube.com/embed/_DhI-yvhsLA"},"shahada":{"title":"The Shahada (Declaration of Faith)","arabic":"أشهد أن لا إله إلا الله وأشهد أن محمدًا رسول الله","transliteration":"Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasul Allah","translation":"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah","explanation":"The Shahada is the gateway into Islam. Uttering it with sincere conviction — understanding that Allah alone deserves worship and that Muhammad ﷺ is His final messenger — makes one a Muslim. It echoes through the Adhan five times daily.","reference":"Sahih Muslim (via Riyad as-Salihin 412) - The Prophet ﷺ said: \'Whoever testifies that there is no god but Allah alone, without partner, and that Muhammad is His servant and Messenger... Allah will forbid the Fire from touching him\' (or admit him to Paradise according to narrations).","image":"https://images.pexels.com/photos/2695984/pexels-photo-2695984.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/ecUX3l5iGYg?rel=0"},"allah":{"title":"Who is Allah?","description":"Allah is the Arabic word for God — the One, Unique, Eternal Creator of all existence. Islam teaches that Allah has no partners, no children, no equals, and is unlike anything in creation.","quranReference":"He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful. — Quran 59:22","image":"https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/YDhs1B9p4yw"},"asmaUlHusna":{"title":"99 Beautiful Names of Allah (Asma ul-Husna)","description":"Allah has 99 Beautiful Names. Learning and calling upon Him by these names is highly recommended. Here is the complete authentic list with meanings:","names":[{"ar":"الرَّحْمَٰن","en":"Ar-Rahman — The Most Gracious"},{"ar":"الرَّحِيم","en":"Ar-Rahim — The Most Merciful"},{"ar":"الْمَلِك","en":"Al-Malik — The King"},{"ar":"الْقُدُّوس","en":"Al-Quddus — The Most Holy"},{"ar":"السَّلَام","en":"As-Salam — The Source of Peace"},{"ar":"الْمُؤْمِن","en":"Al-Mumin — The Guardian of Faith"},{"ar":"الْمُهَيْمِن","en":"Al-Muhaymin — The Protector"},{"ar":"الْعَزِيز","en":"Al-Aziz — The Almighty"},{"ar":"الْجَبَّار","en":"Al-Jabbar — The Compeller"},{"ar":"الْمُتَكَبِّر","en":"Al-Mutakabbir — The Majestic"},{"ar":"الْخَالِق","en":"Al-Khaliq — The Creator"},{"ar":"الْبَارِئ","en":"Al-Bari\' — The Originator"},{"ar":"الْمُصَوِّر","en":"Al-Musawwir — The Fashioner"},{"ar":"الْغَفَّار","en":"Al-Ghaffar — The Forgiving"},{"ar":"الْقَهَّار","en":"Al-Qahhar — The Subduer"},{"ar":"الْوَهَّاب","en":"Al-Wahhab — The Bestower"},{"ar":"الرَّزَّاق","en":"Ar-Razzaq — The Provider"},{"ar":"الْفَتَّاح","en":"Al-Fattah — The Opener"},{"ar":"الْعَلِيم","en":"Al-\'Alim — The All-Knowing"},{"ar":"الْقَابِض","en":"Al-Qabid — The Withholder"},{"ar":"الْبَاسِط","en":"Al-Basit — The Extender"},{"ar":"الْخَافِض","en":"Al-Khafid — The Reducer"},{"ar":"الرَّافِع","en":"Al-Rafi\' — The Exalter"},{"ar":"الْمُعِزّ","en":"Al-Mu\'izz — The Honourer"},{"ar":"الْمُذِلّ","en":"Al-Mudhill — The Humiliator"},{"ar":"السَّمِيع","en":"As-Sami — The All-Hearing"},{"ar":"الْبَصِير","en":"Al-Basir — The All-Seeing"},{"ar":"الْحَكَم","en":"Al-Hakam — The Judge"},{"ar":"الْعَدْل","en":"Al-Adl — The Just"},{"ar":"اللَّطِيف","en":"Al-Latif — The Subtle"},{"ar":"الْخَبِير","en":"Al-Khabir — The Aware"},{"ar":"الْحَلِيم","en":"Al-Halim — The Forbearing"},{"ar":"الْعَظِيم","en":"Al-Azim — The Magnificent"},{"ar":"الْغَفُور","en":"Al-Ghafur — The Forgiving"},{"ar":"الشَّكُور","en":"Ash-Shakur — The Appreciative"},{"ar":"الْعَلِيّ","en":"Al-\'Ali — The Most High"},{"ar":"الْكَبِير","en":"Al-Kabir — The Grand"},{"ar":"الْحَفِيظ","en":"Al-Hafiz — The Preserver"},{"ar":"الْمُقِيت","en":"Al-Muqit — The Sustainer"},{"ar":"الْحَسِيب","en":"Al-Hasib — The Reckoner"},{"ar":"الْجَلِيل","en":"Al-Jalil — The Majestic"},{"ar":"الْكَرِيم","en":"Al-Karim — The Generous"},{"ar":"الرَّقِيب","en":"Ar-Raqib — The Watchful"},{"ar":"الْمُجِيب","en":"Al-Mujib — The Responder"},{"ar":"الْوَاسِع","en":"Al-Wasi — The Vast"},{"ar":"الْحَكِيم","en":"Al-Hakim — The Wise"},{"ar":"الْوَدُود","en":"Al-Wadud — The Loving"},{"ar":"الْمَجِيد","en":"Al-Majid — The Glorious"},{"ar":"الْبَاعِث","en":"Al-Baith — The Resurrector"},{"ar":"الشَّهِيد","en":"Ash-Shahid — The Witness"},{"ar":"الْحَقّ","en":"Al-Haqq — The Truth"},{"ar":"الْوَكِيل","en":"Al-Wakil — The Trustee"},{"ar":"الْقَوِيّ","en":"Al-Qawiyy — The Strong"},{"ar":"الْمَتِين","en":"Al-Matin — The Firm"},{"ar":"الْوَلِيّ","en":"Al-Waliyy — The Protecting Friend"},{"ar":"الْحَمِيد","en":"Al-Hamid — The Praiseworthy"},{"ar":"الْمُحْصِي","en":"Al-Muhsi — The Counter"},{"ar":"الْمُبْدِئ","en":"Al-Mubdi\' — The Originator"},{"ar":"الْمُعِيد","en":"Al-Muid — The Restorer"},{"ar":"الْمُحْيِي","en":"Al-Muhyi — The Giver of Life"},{"ar":"الْمُمِيت","en":"Al-Mumit — The Taker of Life"},{"ar":"الْحَيّ","en":"Al-Hayy — The Ever-Living"},{"ar":"الْقَيُّوم","en":"Al-Qayyum — The Self-Subsisting"},{"ar":"الْوَاجِد","en":"Al-Wajid — The Finder"},{"ar":"الْمَاجِد","en":"Al-Majid — The Noble"},{"ar":"الْوَاحِد","en":"Al-Wahid — The One"},{"ar":"الصَّمَد","en":"As-Samad — The Eternal"},{"ar":"الْقَادِر","en":"Al-Qadir — The Able"},{"ar":"الْمُقْتَدِر","en":"Al-Muqtadir — The Powerful"},{"ar":"الْمُقَدِّم","en":"Al-Muqaddim — The Expediter"},{"ar":"الْمُؤَخِّر","en":"Al-Muakhkhir — The Delayer"},{"ar":"الأَوَّل","en":"Al-Awwal — The First"},{"ar":"الآخِر","en":"Al-Akhir — The Last"},{"ar":"الظَّاهِر","en":"Az-Zahir — The Manifest"},{"ar":"الْبَاطِن","en":"Al-Batin — The Hidden"},{"ar":"الْوَالِي","en":"Al-Wali — The Governor"},{"ar":"الْمُتَعَالِي","en":"Al-Muta\'ali — The Most Exalted"},{"ar":"الْبَرّ","en":"Al-Barr — The Source of Goodness"},{"ar":"التَّوَّاب","en":"At-Tawwab — The Ever-Pardoning"},{"ar":"الْمُنْتَقِم","en":"Al-Muntaqim — The Avenger"},{"ar":"الْعَفُوّ","en":"Al-\'Afuww — The Pardoner"},{"ar":"الرَّؤُوف","en":"Ar-Ra\'uf — The Compassionate"},{"ar":"مَالِكُ الْمُلْك","en":"Malik-ul-Mulk — Master of the Kingdom"},{"ar":"ذُو الْجَلَال","en":"Dhul Jalali — Lord of Majesty"},{"ar":"الْمُقْسِط","en":"Al-Muqsit — The Equitable"},{"ar":"الْجَامِع","en":"Al-Jami\' — The Gatherer"},{"ar":"الْغَنِيّ","en":"Al-Ghani — The Self-Sufficient"},{"ar":"الْمُغْنِي","en":"Al-Mughni — The Enricher"},{"ar":"الْمَانِع","en":"Al-Mani\' — The Preventer"},{"ar":"الضَّارّ","en":"Ad-Darr — The Distresser"},{"ar":"النَّافِع","en":"An-Nafi — The Propitious"},{"ar":"النُّور","en":"An-Nur — The Light"},{"ar":"الْهَادِي","en":"Al-Hadi — The Guide"},{"ar":"الْبَدِيع","en":"Al-Badi\' — The Originator"},{"ar":"الْبَاقِي","en":"Al-Baqi — The Everlasting"},{"ar":"الْوَارِث","en":"Al-Warith — The Inheritor"},{"ar":"الرَّشِيد","en":"Ar-Rashid — The Righteous Teacher"},{"ar":"الصَّبُور","en":"As-Sabur — The Patient"}],"image":"https://images.pexels.com/photos/3832028/pexels-photo-3832028.jpeg?auto=compress&cs=tinysrgb&w=1200"},"prophet":{"title":"Prophet Muhammad ﷺ","description":"Muhammad ibn Abdullah ﷺ was born in Makkah in 570 CE. At 40, he received his first revelation through Angel Jibreel. Over 23 years he conveyed the complete message of Islam. He is the Seal of the Prophets — no messenger will come after him.","keyTeachings":["Monotheism - worship Allah alone without partners","Kindness to family, neighbours, and all creation","Honesty and trustworthiness in all dealings","Justice, equality, and the rights of the poor","Seeking knowledge as a duty upon every Muslim","\\"I was only sent as a mercy to the worlds\\""],"quranReference":"Quran 21:107 — Mercy to the worlds","hadithReference":"Sahih Muslim 2564 — Love for others","image":"https://images.pexels.com/photos/12593672/pexels-photo-12593672.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/GOPiPx5tvB0?rel=0"},"quran":{"title":"The Holy Quran","description":"The Quran is the literal word of Allah (SWT), revealed to Prophet Muhammad ﷺ over 23 years through Angel Jibreel — the primary source of Islamic law, ethics, and spiritual guidance.","facts":["114 Surahs (Chapters)","6,236 Ayaat (Verses)","30 Juz (Parts)","10M+ Huffaz worldwide"],"reference":"This is the Book about which there is no doubt, a guidance for those conscious of Allah. — Quran 2:2","image":"https://images.pexels.com/photos/8522573/pexels-photo-8522573.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/YDNT2R5_nbE?rel=0"},"salah":{"title":"Salah (The Five Daily Prayers)","description":"Salah is the ritual prayer performed five times daily at prescribed times, involving specific postures, Quranic recitations, and remembrance of Allah. Wudu (ritual ablution) must be observed beforehand. Prayer faces the Qiblah — the direction of the Ka\'bah in Makkah.","prayers":[{"name":"Fajr","arabic":"الفجر","time":"Dawn","rakah":2,"sky":"🌤","color":"#e8956d","bg":"#fff5ef"},{"name":"Dhuhr","arabic":"الظهر","time":"Midday","rakah":4,"sky":"☀️","color":"#c49a1a","bg":"#fffbec"},{"name":"Asr","arabic":"العصر","time":"Afternoon","rakah":4,"sky":"🌅","color":"#d47a44","bg":"#fff3e8"},{"name":"Maghrib","arabic":"المغرب","time":"Sunset","rakah":3,"sky":"🌆","color":"#9d60d4","bg":"#f8f0ff"},{"name":"Isha","arabic":"العشاء","time":"Night","rakah":4,"sky":"🌙","color":"#3a5fa8","bg":"#eef3ff"}],"reference":"Maintain with care the [obligatory] prayers and stand before Allah, devoutly obedient. — Quran 2:238","image":"https://images.pexels.com/photos/36211997/pexels-photo-36211997.jpeg"},"zakat":{"title":"Zakat (Charity)","description":"Zakat is the compulsory giving of 2.5% of one\'s total accumulated wealth above the Nisab threshold to eligible recipients — purifying wealth and reducing inequality.","eligibleRecipients":["The poor (Fuqara)","The needy (Masakin)","Zakat administrators","Those to be reconciled","To free captives","Those in debt (Gharimin)","In the cause of Allah","The stranded traveller"],"reference":"Take from their wealth a charity by which you purify them and cause them to increase. — Quran 9:103","image":"https://images.pexels.com/photos/5997945/pexels-photo-5997945.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/27_NFmvwrpM?rel=0"},"sawm":{"title":"Sawm (Fasting in Ramadan)","description":"Muslims abstain from food, drink, smoking, and sexual relations from Fajr (dawn) to Maghrib (sunset) during Ramadan — the 9th month of the Hijri calendar.","benefits":["Spiritual purification and closeness to Allah","Development of self-discipline and gratitude","Empathy for those who suffer from hunger","Laylat al-Qadr — better than 1,000 months","Increased Quran recitation and Tarawih prayers","Community gathering and spiritual renewal"],"reference":"Decreed upon you is fasting as it was decreed upon those before you that you may become righteous. — Quran 2:183","image":"https://images.pexels.com/photos/7956566/pexels-photo-7956566.jpeg?auto=compress&cs=tinysrgb&w=800","video":"https://www.youtube.com/embed/lm6VL54f0os?rel=0"},"hajj":{"title":"Hajj (Pilgrimage)","description":"Obligatory at least once in a lifetime for every adult Muslim who is physically and financially able, Hajj takes place in Dhul Hijjah — the 12th Islamic month.","keyRituals":["Entering Ihram — sacred state of purity","Tawaf — circling the Ka\'bah 7 times","Sa\'i — walking between Safa & Marwa","Standing at Arafat — Day of Arafah","Overnight stay at Muzdalifah","Stoning of the Jamarat"],"reference":"And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way. — Quran 3:97","image":"https://images.pexels.com/photos/35315919/pexels-photo-35315919.jpeg?auto=compress&cs=tinysrgb&w=800","video":"https://www.youtube.com/embed/jd9AVwtyp4Y?rel=0"},"afterlife":{"title":"Belief in the Afterlife","description":"Islam teaches that this worldly life is temporary and that every soul will be resurrected and judged for their deeds on the Day of Judgement (Yawm al-Qiyama).","concepts":[{"icon":"⚰","name":"Barzakh","desc":"The intermediate state in the grave after death."},{"icon":"📯","name":"The Trumpet Blow","desc":"The end of this world — all creation perishes."},{"icon":"🌅","name":"Resurrection","desc":"All souls raised on the plains of Mahshar."},{"icon":"⚖","name":"The Scales","desc":"Deeds weighed on the Mizan with perfect justice."},{"icon":"🌉","name":"Al-Sirat","desc":"The bridge over Hell crossed by all souls."},{"icon":"🌺","name":"Jannah or Jahannam","desc":"Eternal Paradise or Hell based on the reckoning."}],"reference":"Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection. — Quran 3:185","image":"https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/dffncQrws1I?rel=0"},"dosAndDonts":{"dos":["Pray the five daily prayers on time","Recite Bismillah before any action","Greet others with \\"As-salamu alaykum\\"","Be kind and respectful to parents","Give in charity — obligatory and voluntary","Maintain family ties (Silat ar-Rahim)","Seek knowledge throughout life","Eat only Halal food","Maintain ritual purity (Taharah)"],"donts":["Associating partners with Allah (Shirk)","Consuming alcohol, intoxicants, or pork","Riba (interest/usury) in financial dealings","Zina (adultery or fornication)","Stealing, cheating, or dishonest dealings","Backbiting (Gheebah) and slander","Murder or harming innocent people","Arrogance and pride (Kibr)","Breaking family ties without just cause"]},"faqs":[{"question":"How does one become a Muslim?","answer":"To become a Muslim, one must sincerely recite the Shahada with full understanding and conviction."},{"question":"What is the difference between Islam, Iman, and Ihsan?","answer":"Islam refers to the outward actions (the 5 pillars). Iman refers to the inner beliefs (the 6 pillars of faith). Ihsan refers to worshipping Allah as if you see Him, knowing He sees you (Sahih Muslim 8)."},{"question":"Do Muslims worship the same God as other religions?","answer":"Muslims worship Allah — the One and Only God. He has no partners, no children, and no equals (Surah Al-Ikhlas 112:1)."},{"question":"Why do Muslims pray five times a day?","answer":"The five daily prayers were ordained during the Isra and Mi\'raj. They provide spiritual discipline and connection to Allah (Surah Al-Ankabut 29:45)."},{"question":"What is the role of women in Islam?","answer":"Islam elevated women\'s status with rights to inheritance, education, and consent. Men and women are equal in spiritual reward. \'The best of you are those best to their women\' (Sunan al-Tirmidhi 3895)."},{"question":"Are all Muslims Arab?","answer":"No. Only about 20% of Muslims are Arab. The largest Muslim populations are in Indonesia, Pakistan, India, Bangladesh, and Nigeria."}],"appsAndResources":{"apps":[{"icon":"🕌","name":"Muslim Pro","description":"Prayer times, Quran, Qibla, Adhan alerts"},{"icon":"📖","name":"Quran Companion","description":"Memorisation tools, Tajweed, progress tracking"},{"icon":"⭐","name":"Seerah App","description":"Life of the Prophet ﷺ in full detail"},{"icon":"🤖","name":"Tarteel AI","description":"AI-powered Quran recitation correction"},{"icon":"🔔","name":"Athan (Azan)","description":"Prayer times, Quran audio, Dhikr counter"}],"websites":[{"icon":"📚","name":"islamqa.info","url":"https://islamqa.info","description":"Scholarly Q&A — fatawa and rulings"},{"icon":"📜","name":"sunnah.com","url":"https://sunnah.com","description":"Complete Hadith collections online"},{"icon":"📖","name":"quran.com","url":"https://quran.com","description":"Quran with translation and tafsir"},{"icon":"🎓","name":"yaqeeninstitute.org","url":"https://yaqeeninstitute.org","description":"Academic Islamic research papers"},{"icon":"🌿","name":"seekersguidance.org","url":"https://seekersguidance.org","description":"Free Islamic learning courses"}]}}');

/***/ }),

/***/ "./resources/js/components/IslamComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IslamComponent_vue_vue_type_template_id_0d93bfcc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true */ "./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true");
/* harmony import */ var _IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IslamComponent.vue?vue&type=script&lang=js */ "./resources/js/components/IslamComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _IslamComponent_vue_vue_type_style_index_0_id_0d93bfcc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css */ "./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_IslamComponent_vue_vue_type_template_id_0d93bfcc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0d93bfcc"],['__file',"resources/js/components/IslamComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/IslamComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_style_index_0_id_0d93bfcc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_template_id_0d93bfcc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_template_id_0d93bfcc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc&scoped=true");


/***/ })

}]);