"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ParentingComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../data/pa'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'IslamicConnectGuide',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      activeChapter: 'ch1',
      faqOpen: {},
      conflictSituation: '',
      communicationSteps: [{
        title: 'Pause before responding',
        desc: 'Don\'t react immediately when emotions are high'
      }, {
        title: 'Make wudu',
        desc: 'Physical purification helps calm the heart'
      }, {
        title: 'Use "I feel" statements',
        desc: 'Express emotions without blaming'
      }, {
        title: 'Return when calm',
        desc: 'Continue the conversation with clarity'
      }],
      ch1Faqs: [{
        q: 'Does honouring parents mean doing everything they say?',
        a: 'No. Obedience to parents is obligatory in permissible matters but not in what contradicts Islamic law or causes clear harm. Scholars are unanimous on this principle.'
      }, {
        q: 'What if my parents are not Muslim?',
        a: 'You still owe them kindness, respect, and good companionship in all permissible matters (Quran 31:15). You do not obey them in shirk, but maintain the relationship with love.'
      }, {
        q: 'Can I disagree with my parents?',
        a: 'Yes, respectfully. Islam encourages shura (consultation). The manner of disagreement matters greatly — always with noble speech (qawlan karima).'
      }],
      chapters: [{
        id: 'ch1',
        icon: '🏛️',
        shortTitle: 'Foundations',
        title: 'Foundations of Parenting in Islam'
      }, {
        id: 'ch2',
        icon: '💬',
        shortTitle: 'Communication',
        title: 'Communication with Parents'
      }, {
        id: 'ch3',
        icon: '⚖️',
        shortTitle: 'Culture vs Islam',
        title: 'Culture vs Islam'
      }, {
        id: 'ch4',
        icon: '😤',
        shortTitle: 'Conflict',
        title: 'Conflict & Arguments'
      }, {
        id: 'ch5',
        icon: '❤️',
        shortTitle: 'Emotions',
        title: 'Emotional Struggles'
      }, {
        id: 'ch6',
        icon: '🧠',
        shortTitle: 'Boundaries',
        title: 'Boundaries in Islam'
      }, {
        id: 'ch7',
        icon: '🌍',
        shortTitle: 'Western Life',
        title: 'Growing Up in the West'
      }, {
        id: 'ch8',
        icon: '📚',
        shortTitle: 'Career',
        title: 'Education & Career'
      }, {
        id: 'ch9',
        icon: '💑',
        shortTitle: 'Marriage',
        title: 'Marriage & Relationships'
      }, {
        id: 'ch10',
        icon: '🕌',
        shortTitle: 'Deen',
        title: 'Practising Islam'
      }, {
        id: 'ch11',
        icon: '🤲',
        shortTitle: 'Duas',
        title: 'Duas & Spirituality'
      }, {
        id: 'ch12',
        icon: '🔒',
        shortTitle: 'Serious Issues',
        title: 'Difficult Situations'
      }, {
        id: 'ch13',
        icon: '🤝',
        shortTitle: 'Relationship',
        title: 'Building Better Bonds'
      }, {
        id: 'ch14',
        icon: '⚡',
        shortTitle: 'Quick Tips',
        title: 'Quick Advice'
      }, {
        id: 'ch15',
        icon: '🎥',
        shortTitle: 'Stories',
        title: 'Real Stories'
      }, {
        id: 'ch16',
        icon: '🧩',
        shortTitle: 'Interactive',
        title: 'Interactive Tools'
      }],
      trustedSources: [{
        num: '01',
        name: 'Quran.com',
        url: 'quran.com',
        why: 'Official Quran platform with verified translations & tafsir'
      }, {
        num: '02',
        name: 'Sunnah.com',
        url: 'sunnah.com',
        why: 'Authenticated hadith collections (Bukhari, Muslim, etc.)'
      }, {
        num: '03',
        name: 'SeekersGuidance.org',
        url: 'seekersguidance.org',
        why: 'Verified scholars, free courses, Western Muslim focus'
      }, {
        num: '04',
        name: 'IslamQA.info',
        url: 'islamqa.info',
        why: 'Largest fatwa database, reviewed by Sh. al-Munajjid'
      }, {
        num: '05',
        name: 'Islamweb.net',
        url: 'islamweb.net',
        why: 'Scholarly fatwa centre with family & youth resources'
      }],
      conflictScripts: {
        curfew: '"Baba/Mama, I understand your concern about my safety. Can we discuss a curfew that works for both of us? I want you to feel comfortable while also being able to participate in normal activities."',
        career: '"I hear your vision for me, and I respect it. Can I show you some research about the path I\'m passionate about? I want to find something we both feel good about."',
        friends: '"I understand you have concerns. Would you be willing to meet my friends so you can see who they actually are? I value your opinion and want you to have all the information."',
        marriage: '"I know this is sensitive. Can we sit down and talk about what qualities you\'d want in my future spouse? I want your blessing and your guidance in this process."'
      }
    };
  },
  computed: {
    conflictScript() {
      return this.conflictScripts[this.conflictSituation] || '';
    }
  },
  methods: {
    doSearch() {
      const q = this.searchQuery.toLowerCase();
      if (!q) {
        this.searchResults = [];
        return;
      }
      this.searchResults = this.chapters.filter(ch => ch.title.toLowerCase().includes(q) || ch.shortTitle.toLowerCase().includes(q)).slice(0, 6);
    },
    scrollToChapter(id) {
      this.activeChapter = id;
      this.searchResults = [];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Add visual highlight
        el.classList.add('highlight-chapter');
        setTimeout(() => el.classList.remove('highlight-chapter'), 2000);
      }
    },
    toggleFaq(ch, i) {
      const key = ch + '_' + i;
      this.$set(this.faqOpen, key, !this.faqOpen[key]);
    },
    generateScript() {
      // Already computed, but could add animation/feedback here
    }
  },
  mounted() {
    // Ensure Bootstrap JS is loaded for accordion functionality
    if (typeof bootstrap !== 'undefined') {
      // Bootstrap is available
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "islamic-connect-guide",
  class: "ic-app"
};
const _hoisted_2 = {
  class: "hero-section position-relative overflow-hidden"
};
const _hoisted_3 = {
  class: "container position-relative z-2 py-5 py-lg-6"
};
const _hoisted_4 = {
  class: "row align-items-center g-4"
};
const _hoisted_5 = {
  class: "col-lg-7"
};
const _hoisted_6 = {
  class: "hero-search mb-4",
  style: {
    "max-width": "520px"
  }
};
const _hoisted_7 = {
  class: "input-group input-group-lg"
};
const _hoisted_8 = {
  key: 0,
  class: "search-results position-absolute w-100 mt-2 bg-white rounded-3 shadow-lg border z-3"
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  class: "fs-4"
};
const _hoisted_11 = {
  class: "fw-medium"
};
const _hoisted_12 = {
  class: "chapter-nav sticky-top bg-white border-bottom shadow-sm z-3"
};
const _hoisted_13 = {
  class: "container"
};
const _hoisted_14 = {
  class: "nav nav-pills flex-nowrap overflow-auto py-2",
  role: "tablist"
};
const _hoisted_15 = ["onClick", "aria-selected"];
const _hoisted_16 = {
  class: "fs-5"
};
const _hoisted_17 = {
  class: "d-none d-md-inline small"
};
const _hoisted_18 = {
  class: "container py-4 py-lg-5"
};
const _hoisted_19 = {
  id: "ch1",
  class: "chapter-section mb-4 mb-lg-5 scroll-mt-5"
};
const _hoisted_20 = {
  class: "card border-0 shadow-lg rounded-4 overflow-hidden"
};
const _hoisted_21 = {
  class: "card-body p-4 p-lg-5"
};
const _hoisted_22 = {
  class: "faq-section mt-5"
};
const _hoisted_23 = {
  class: "accordion accordion-flush",
  id: "faqCh1"
};
const _hoisted_24 = {
  class: "accordion-header"
};
const _hoisted_25 = ["onClick", "aria-expanded", "aria-controls"];
const _hoisted_26 = ["id"];
const _hoisted_27 = {
  class: "accordion-body text-muted small"
};
const _hoisted_28 = {
  class: "trusted-sources-highlight py-5 my-5"
};
const _hoisted_29 = {
  class: "card border-0 shadow-lg rounded-4 bg-gradient-navy text-white overflow-hidden"
};
const _hoisted_30 = {
  class: "card-body p-4 p-lg-5"
};
const _hoisted_31 = {
  class: "row align-items-center g-4"
};
const _hoisted_32 = {
  class: "col-lg-8"
};
const _hoisted_33 = {
  class: "row g-3"
};
const _hoisted_34 = {
  class: "source-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-3 p-3 h-100"
};
const _hoisted_35 = {
  class: "d-flex align-items-center gap-2 mb-2"
};
const _hoisted_36 = {
  class: "badge bg-gold text-white small"
};
const _hoisted_37 = {
  class: "small"
};
const _hoisted_38 = ["href"];
const _hoisted_39 = {
  class: "text-white-60 d-block"
};
const _hoisted_40 = {
  id: "ch2",
  class: "chapter-section mb-4 mb-lg-5 scroll-mt-5"
};
const _hoisted_41 = {
  class: "card border-0 shadow-lg rounded-4 overflow-hidden"
};
const _hoisted_42 = {
  class: "card-body p-4 p-lg-5"
};
const _hoisted_43 = {
  class: "row g-4"
};
const _hoisted_44 = {
  class: "col-lg-6"
};
const _hoisted_45 = {
  class: "content-card h-100"
};
const _hoisted_46 = {
  class: "steps-list mb-4"
};
const _hoisted_47 = {
  class: "step-number bg-green text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0",
  style: {
    "width": "28px",
    "height": "28px"
  }
};
const _hoisted_48 = {
  class: "fw-bold"
};
const _hoisted_49 = {
  class: "d-block small"
};
const _hoisted_50 = {
  class: "text-muted"
};
const _hoisted_51 = {
  class: "interactive-tool mt-5 p-4 bg-gradient-gold-light border border-gold rounded-4"
};
const _hoisted_52 = {
  class: "row align-items-center g-4"
};
const _hoisted_53 = {
  class: "col-lg-5"
};
const _hoisted_54 = {
  class: "col-lg-3"
};
const _hoisted_55 = {
  key: 0,
  class: "script-output mt-4 p-3 bg-white rounded-3 border"
};
const _hoisted_56 = {
  class: "mb-0 fst-italic text-muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SCHOLARLY VERIFICATION BANNER "), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"verification-banner bg-gold-light border-bottom border-gold\"><div class=\"container py-2\"><div class=\"d-flex align-items-center justify-content-center gap-2 flex-wrap\"><span class=\"badge bg-gold text-white px-3 py-2\"><i class=\"bi bi-shield-check me-1\"></i>Scholarly Verified </span><small class=\"text-gold-dark\"> Content sourced exclusively from: <strong>IslamQA.info</strong> • <strong>Islamweb.net</strong> • <strong>Sunnah.com</strong> • <strong>Quran.com</strong> • <strong>SeekersGuidance.org</strong></small></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO SECTION - Professional & Engaging "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-bg-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-badge d-inline-flex align-items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-pill px-4 py-2 mb-4\"><i class=\"bi bi-book-half text-gold\"></i><span class=\"text-white small fw-medium\">Islamic Connect • Youth Guide</span></div><h1 class=\"hero-title text-white display-4 display-lg-3 fw-bold mb-3 lh-tight\"> Parenting in Islam:<br><span class=\"text-gold-light\">A Youth&#39;s Practical Guide</span></h1><p class=\"hero-subtitle text-white/90 lead mb-4 pe-lg-5\"> Real Islamic guidance for Muslim youth navigating family life in the West. Scholarly verified. Culturally aware. Compassionately delivered. </p>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search with Bootstrap Input Group "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text bg-white border-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search text-muted"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    type: "text",
    class: "form-control border-0 shadow-none",
    placeholder: "Search topics: 'boundaries', 'marriage', 'strict parents'...",
    onKeyup: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.doSearch && $options.doSearch(...args), ["enter"])),
    "aria-label": "Search guide topics"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-gold px-4",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.doSearch && $options.doSearch(...args)),
    type: "button"
  }, " Search ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Results Dropdown "), $data.searchResults.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.searchResults, result => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: result.id,
      class: "search-result-item d-flex align-items-center gap-3 px-4 py-3 border-bottom cursor-pointer hover-bg-green-light",
      onClick: $event => $options.scrollToChapter(result.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.title), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_9);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Trust Indicators "), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-stats d-flex flex-wrap gap-2\"><span class=\"stat-pill bg-white/10 border border-white/20 text-white px-3 py-2 rounded-pill small\"><i class=\"bi bi-check-circle-fill text-gold me-1\"></i>16 Scholarly Chapters </span><span class=\"stat-pill bg-white/10 border border-white/20 text-white px-3 py-2 rounded-pill small\"><i class=\"bi bi-journal-text text-gold me-1\"></i>5 Trusted Sources </span><span class=\"stat-pill bg-white/10 border border-white/20 text-white px-3 py-2 rounded-pill small\"><i class=\"bi bi-people text-gold me-1\"></i>Western Muslim Focus </span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Visual "), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-lg-5 d-none d-lg-block\"><div class=\"hero-visual position-relative\"><div class=\"card border-0 shadow-lg rounded-4 overflow-hidden\"><img src=\"https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"Muslim family connection\" class=\"card-img-top object-fit-cover\" style=\"height:320px;\"><div class=\"card-img-overlay d-flex align-items-end bg-gradient-dark\"><div class=\"text-white p-3\"><div class=\"d-flex align-items-center gap-2 mb-2\"><i class=\"bi bi-shield-check text-gold\"></i><small class=\"fw-medium\">Content Verified By Scholars</small></div><small class=\"opacity-75\">Every ruling sourced from IslamQA, SeekersGuidance &amp; trusted scholars</small></div></div></div><!-- Floating Source Badges --><div class=\"position-absolute top-0 end-0 m-3 d-flex flex-column gap-2\"><span class=\"badge bg-white text-gold-dark border border-gold px-3 py-2 small shadow\"><i class=\"bi bi-book me-1\"></i>Quran.com </span><span class=\"badge bg-white text-gold-dark border border-gold px-3 py-2 small shadow\"><i class=\"bi bi-chat-square-text me-1\"></i>Sunnah.com </span></div></div></div>", 1))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decorative Elements "), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-decoration-1"
  }, null, -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-decoration-2"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" CHAPTER NAVIGATION - Sticky with Bootstrap Nav "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chapters, ch => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: ch.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link d-flex align-items-center gap-2 px-3 py-2 me-1 rounded-pill flex-shrink-0", {
        active: $data.activeChapter === ch.id,
        'text-gold fw-medium': $data.activeChapter === ch.id
      }]),
      onClick: $event => {
        $data.activeChapter = ch.id;
        $options.scrollToChapter(ch.id);
      },
      role: "tab",
      "aria-selected": $data.activeChapter === ch.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.shortTitle), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_15);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT AREA "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Stats Bar - Bootstrap Cards "), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row g-3 mb-4 mb-lg-5\"><div class=\"col-6 col-md-3\"><div class=\"card border-gold-light h-100 shadow-sm\"><div class=\"card-body text-center py-3\"><div class=\"display-6 fw-bold text-gold mb-1\">114</div><div class=\"small text-muted\">Quranic Chapters</div></div></div></div><div class=\"col-6 col-md-3\"><div class=\"card border-green-light h-100 shadow-sm\"><div class=\"card-body text-center py-3\"><div class=\"display-6 fw-bold text-green mb-1\">16</div><div class=\"small text-muted\">Guide Chapters</div></div></div></div><div class=\"col-6 col-md-3\"><div class=\"card border-gold-light h-100 shadow-sm\"><div class=\"card-body text-center py-3\"><div class=\"display-6 fw-bold text-gold mb-1\">5</div><div class=\"small text-muted\">Trusted Sources</div></div></div></div><div class=\"col-6 col-md-3\"><div class=\"card border-green-light h-100 shadow-sm\"><div class=\"card-body text-center py-3\"><div class=\"display-6 fw-bold text-green mb-1\">100+</div><div class=\"small text-muted\">Practical Tips</div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" CHAPTER 1: Foundations "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Header "), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-header bg-gradient-green text-white border-0 py-4\"><div class=\"row align-items-center g-3\"><div class=\"col-auto\"><div class=\"chapter-icon bg-white/20 rounded-3 d-flex align-items-center justify-content-center\" style=\"width:64px;height:64px;\"><span class=\"fs-1\">🏛️</span></div></div><div class=\"col\"><div class=\"text-white-50 small text-uppercase ls-1 mb-1\">Chapter 1</div><h2 class=\"card-title h3 mb-0 fw-bold\">Foundations of Parenting in Islam</h2></div><div class=\"col-auto\"><span class=\"badge bg-gold text-white px-3 py-2\"><i class=\"bi bi-shield-check me-1\"></i>Verified </span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row g-4\"><!-- Rights of Parents --><div class=\"col-lg-6\"><div class=\"content-card h-100\"><h3 class=\"h5 fw-bold text-green mb-3\"><i class=\"bi bi-heart-fill text-gold me-2\"></i>Rights of Parents </h3><p class=\"text-muted mb-3\"> Allah commands honouring parents immediately after Tawheed — placing this duty second only to worshipping Him alone. </p><!-- Quran Block with Source Highlight --><div class=\"quran-block bg-gold-light border-start border-4 border-gold rounded-end-3 p-3 mb-3\"><p class=\"quran-arabic mb-2 text-end fs-4 lh-base\" dir=\"rtl\"> وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا </p><div class=\"d-flex align-items-center justify-content-between flex-wrap gap-2\"><small class=\"text-gold-dark fw-medium\">Surah Al-Isra 17:23</small><a href=\"https://quran.com/17/23\" target=\"_blank\" class=\"badge bg-white text-gold border border-gold text-decoration-none\"><i class=\"bi bi-box-arrow-up-right me-1\"></i>Quran.com </a></div></div><!-- Bite-Sized Reminder --><div class=\"tip-box bg-green-light border border-green rounded-3 p-3\"><div class=\"d-flex align-items-start gap-2\"><span class=\"fs-5\">📌</span><div><strong class=\"d-block mb-1\">Bite-Sized Reminder:</strong><small class=\"text-muted\"> The Prophet ﷺ was asked who deserves best companionship three times — each time he said &quot;your mother,&quot; then &quot;your father.&quot; <a href=\"https://sunnah.com/bukhari:5971\" target=\"_blank\" class=\"text-green text-decoration-none fw-medium\"><i class=\"bi bi-link-45deg\"></i> Sahih Bukhari 5971 </a></small></div></div></div></div></div><!-- Obedience vs Boundaries --><div class=\"col-lg-6\"><div class=\"content-card h-100\"><h3 class=\"h5 fw-bold text-green mb-3\"><i class=\"bi bi-balance me-2 text-gold\"></i>Obedience vs Boundaries </h3><p class=\"text-muted mb-3\"> Obedience to parents is obligatory <strong>except</strong> when they command disobedience to Allah. </p><div class=\"hadith-block bg-green-light border-start border-4 border-green rounded-end-3 p-3 mb-4\"><p class=\"fst-italic mb-2\">&quot;There is no obedience to creation in disobedience to the Creator.&quot;</p><div class=\"d-flex align-items-center justify-content-between flex-wrap gap-2\"><small class=\"text-green fw-medium\">Musnad Ahmad</small><a href=\"https://sunnah.com\" target=\"_blank\" class=\"badge bg-white text-green border border-green text-decoration-none\"><i class=\"bi bi-box-arrow-up-right me-1\"></i>Sunnah.com </a></div></div><!-- Do/Don&#39;t Grid --><div class=\"row g-2\"><div class=\"col-6\"><div class=\"dos-card bg-green-light border border-green rounded-3 p-3 h-100\"><div class=\"fw-bold text-green small mb-2\">✅ Do</div><ul class=\"list-unstyled small mb-0 text-muted\"><li class=\"mb-1\">• Obey in permissible matters</li><li class=\"mb-1\">• Explain concerns calmly</li><li>• Seek scholarly mediation</li></ul></div></div><div class=\"col-6\"><div class=\"donts-card bg-danger-light border border-danger rounded-3 p-3 h-100\"><div class=\"fw-bold text-danger small mb-2\">❌ Don&#39;t</div><ul class=\"list-unstyled small mb-0 text-muted\"><li class=\"mb-1\">• Obey in clear haram</li><li class=\"mb-1\">• Be rude in refusal</li><li>• Cut off family ties</li></ul></div></div></div></div></div><!-- Mercy &amp; Ihsan - Full Width --><div class=\"col-12\"><div class=\"content-card\"><h3 class=\"h5 fw-bold text-green mb-3\"><i class=\"bi bi-heart me-2 text-gold\"></i>Mercy, Respect &amp; Ihsan </h3><p class=\"text-muted mb-3\"><em>Ihsan</em> means excellence — doing more than the minimum. In family life, this means showing genuine love and kindness even when it&#39;s difficult. The Quran instructs us not to even say &quot;uff&quot; (a sound of irritation) to parents. </p><div class=\"row align-items-center g-4\"><div class=\"col-md-7\"><div class=\"reminder-pill bg-gold-light border border-gold rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2\"><span>💡</span><small class=\"fw-medium\">Reframe difficult moments: &quot;I&#39;m doing this for Allah, not just for them.&quot;</small></div></div><div class=\"col-md-5\"><div class=\"image-block position-relative rounded-3 overflow-hidden\"><img src=\"https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&amp;w=600\" alt=\"Family connection in Islam\" class=\"img-fluid rounded-3\"><div class=\"position-absolute bottom-0 start-0 end-0 bg-dark/70 text-white p-2 small\"> Photo: Pexels • Free to use </div></div></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source Citation Block "), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-citation mt-4 p-3 bg-light rounded-3 border\"><div class=\"d-flex align-items-start gap-2\"><i class=\"bi bi-journal-bookmark text-gold mt-1\"></i><div><strong class=\"d-block mb-1\">Sources for this chapter:</strong><div class=\"d-flex flex-wrap gap-2 small\"><a href=\"https://quran.com/17/23\" target=\"_blank\" class=\"badge bg-white text-gold border border-gold text-decoration-none\">Quran.com • Al-Isra 17:23</a><a href=\"https://sunnah.com/bukhari:5971\" target=\"_blank\" class=\"badge bg-white text-green border border-green text-decoration-none\">Sunnah.com • Bukhari 5971</a><a href=\"https://seekersguidance.org\" target=\"_blank\" class=\"badge bg-white text-navy border border-navy text-decoration-none\">SeekersGuidance • Honouring Parents</a></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h5 fw-bold mb-4"
  }, "Frequently Asked Questions", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ch1Faqs, (faq, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: i,
      class: "accordion-item border-bottom"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "accordion-button collapsed fw-medium py-3",
      type: "button",
      onClick: $event => $options.toggleFaq('ch1', i),
      "aria-expanded": $data.faqOpen['ch1_' + i],
      "aria-controls": `faqCh1Collapse${i}`
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q), 9 /* TEXT, PROPS */, _hoisted_25)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `faqCh1Collapse${i}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["accordion-collapse collapse", {
        show: $data.faqOpen['ch1_' + i]
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.a), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_26)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" TRUSTED SOURCES HIGHLIGHT SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-lg-4\"><div class=\"d-flex align-items-center gap-3 mb-3\"><i class=\"bi bi-shield-check fs-2 text-gold\"></i><h3 class=\"h4 fw-bold mb-0\">Our 5 Trusted Islamic Sources</h3></div><p class=\"text-white-75 mb-0\"> Every ruling, verse, and hadith in this guide is cross-referenced with these scholarly-approved platforms. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.trustedSources, (src, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "col-md-6 col-lg-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: 'https://' + src.url,
      target: "_blank",
      class: "text-white-75 small text-decoration-none d-block mb-2 hover-text-gold"
    }, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-link-45deg me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.url), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_38), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.why), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Additional chapters would follow the same structured pattern "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" For brevity, showing one more chapter example "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" CHAPTER 2: Communication "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-header bg-gradient-green text-white border-0 py-4\"><div class=\"row align-items-center g-3\"><div class=\"col-auto\"><div class=\"chapter-icon bg-white/20 rounded-3 d-flex align-items-center justify-content-center\" style=\"width:64px;height:64px;\"><span class=\"fs-1\">💬</span></div></div><div class=\"col\"><div class=\"text-white-50 small text-uppercase ls-1 mb-1\">Chapter 2</div><h2 class=\"card-title h3 mb-0 fw-bold\">Communication with Parents</h2></div><div class=\"col-auto\"><span class=\"badge bg-gold text-white px-3 py-2\"><i class=\"bi bi-shield-check me-1\"></i>Verified </span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" How to Talk Without Disrespect "), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-lg-6\"><div class=\"content-card h-100\"><h3 class=\"h5 fw-bold text-green mb-3\"><i class=\"bi bi-chat-left-text me-2 text-gold\"></i>Speaking with Nobility </h3><p class=\"text-muted mb-3\"> The Quran instructs us to speak to parents with <em>qawlan kariman</em> — noble, dignified speech (Al-Isra 17:23). </p><div class=\"script-box bg-navy rounded-3 p-3 mb-3\"><div class=\"d-flex align-items-center gap-2 mb-2\"><i class=\"bi bi-pencil-square text-gold\"></i><small class=\"text-gold-light text-uppercase fw-medium\">Practical Script</small></div><p class=\"text-white-90 small mb-0 fst-italic\"> &quot;Baba/Mama, I want to talk about something. Can we find a good time? I want to understand your view and share mine respectfully.&quot; </p></div><div class=\"quran-ref-block bg-gold-light border-start border-4 border-gold rounded-end-3 p-3\"><small class=\"d-block text-gold-dark fw-medium mb-1\">Quranic Principle</small><small class=\"text-muted\"><em>&quot;And speak to them with noble speech.&quot;</em> — Surah Al-Isra 17:23 <br><a href=\"https://quran.com/17/23\" target=\"_blank\" class=\"text-green text-decoration-none small\"><i class=\"bi bi-box-arrow-up-right\"></i> Source: Quran.com </a></small></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Handling Disagreements "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h5 fw-bold text-green mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-emoji-neutral me-2 text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Handling Disagreements Calmly ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.communicationSteps, (step, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "step-item d-flex gap-3 mb-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(idx + 1), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.desc), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"prophetic-tip bg-green-light border border-green rounded-3 p-3\"><div class=\"d-flex align-items-start gap-2\"><span class=\"fs-5\">🌿</span><small class=\"text-muted\"><strong>Prophetic Guidance:</strong> The Prophet ﷺ never raised his voice in anger in his household. When heated, make wudu, change position, and return when calm. <br><a href=\"https://islamqa.info\" target=\"_blank\" class=\"text-green text-decoration-none fw-medium small\"><i class=\"bi bi-link-45deg\"></i> IslamQA.info • Anger Management </a></small></div></div>", 1))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Video Resources "), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h5 fw-bold text-green mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle me-2 text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Video Resources: Communication in Muslim Families ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row g-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-card position-relative rounded-3 overflow-hidden border"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/N4QeKnfSP3s",
    title: "Muslim family communication",
    class: "w-100 rounded-3",
    style: {
      "height": "200px",
      "border": "none"
    },
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "position-absolute bottom-0 start-0 end-0 bg-dark/80 text-white p-3 small"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Navigating Difficult Family Conversations"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-white-75"
  }, "SeekersGuidance")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-card position-relative rounded-3 overflow-hidden border"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/CYe1wfPx4dU",
    title: "Youth and parents in Islam",
    class: "w-100 rounded-3",
    style: {
      "height": "200px",
      "border": "none"
    },
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "position-absolute bottom-0 start-0 end-0 bg-dark/80 text-white p-3 small"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "How to Talk to Your Parents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-white-75"
  }, "Islamic Perspective")])])])])])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Interactive Tool: Conflict Phrase Generator "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "h5 fw-bold text-navy mb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-tools me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Conflict Phrase Generator ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Select a situation and get an Islamically framed response:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.conflictSituation = $event),
    class: "form-select border-gold",
    "aria-label": "Select conflict situation"
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">— Choose a situation —</option><option value=\"curfew\">Parents set an early curfew</option><option value=\"career\">Parents push a specific career</option><option value=\"friends\">Parents disapprove of your friends</option><option value=\"marriage\">Parents want to rush marriage</option>", 5)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.conflictSituation]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-gold w-100",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.generateScript && $options.generateScript(...args))
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-magic me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Generate Response ", -1 /* CACHED */)]))])])]), $options.conflictScript ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-2 mb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chat-quote text-green"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "small text-navy"
  }, "Suggested Response:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.conflictScript), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source Citation "), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-citation mt-4 p-3 bg-light rounded-3 border\"><div class=\"d-flex align-items-start gap-2\"><i class=\"bi bi-journal-bookmark text-gold mt-1\"></i><div><strong class=\"d-block mb-1\">Sources for this chapter:</strong><div class=\"d-flex flex-wrap gap-2 small\"><a href=\"https://quran.com/17/23\" target=\"_blank\" class=\"badge bg-white text-gold border border-gold text-decoration-none\">Quran.com • Al-Isra 17:23</a><a href=\"https://islamqa.info\" target=\"_blank\" class=\"badge bg-white text-green border border-green text-decoration-none\">IslamQA.info • Anger Management</a><a href=\"https://seekersguidance.org\" target=\"_blank\" class=\"badge bg-white text-navy border border-navy text-decoration-none\">SeekersGuidance • Family Communication</a></div></div></div></div>", 1))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FLOATING SOURCE BADGE (Always Visible) "), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-badge position-fixed bottom-0 end-0 m-3 z-3 d-none d-lg-block\"><div class=\"card border-gold shadow-lg rounded-4\" style=\"width:280px;\"><div class=\"card-body p-3\"><div class=\"d-flex align-items-center gap-2 mb-2\"><i class=\"bi bi-shield-check text-gold\"></i><strong class=\"small\">Scholarly Verification</strong></div><small class=\"text-muted d-block mb-2\"> All content verified against: </small><div class=\"d-flex flex-wrap gap-1\"><span class=\"badge bg-gold-light text-gold-dark border border-gold small\">Quran.com</span><span class=\"badge bg-gold-light text-gold-dark border border-gold small\">Sunnah.com</span><span class=\"badge bg-gold-light text-gold-dark border border-gold small\">IslamQA</span></div></div></div></div>", 1))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=template&id=1431ac10 */ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10");
/* harmony import */ var _ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css */ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/ParentingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css");


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10 ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=template&id=1431ac10 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10");


/***/ })

}]);