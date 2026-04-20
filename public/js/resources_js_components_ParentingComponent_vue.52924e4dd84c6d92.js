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
/* harmony import */ var _data_parenting_content_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/parenting-content.json */ "./resources/data/parenting-content.json");

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

/***/ "./resources/data/parenting-content.json":
/*!***********************************************!*\
  !*** ./resources/data/parenting-content.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"meta":{"title":"A Youth Guide to Parenting in Islam","subtitle":"Real talk. Real struggles. Real Islamic guidance — for Muslim youth navigating family life in the West.","description":"A scholarly-verified, interactive guide for Western Muslim youth on navigating family relationships with Islamic principles, cultural awareness, and practical tools.","version":"1.0","lastUpdated":"2025-04-20","totalChapters":16,"language":"en","targetAudience":"Western Muslim youth aged 16-30","disclaimer":"All content in this guide is sourced from verified Islamic scholarship via IslamQA.info, Islamweb.net, Sunnah.com, Quran.com, and SeekersGuidance.org. Content is educational and does not replace qualified scholarly advice. Always consult a qualified Islamic scholar for personal matters. Sources are cited throughout to avoid plagiarism.","trustedSources":[{"id":"quran-com","name":"Quran.com","url":"https://quran.com","description":"The most widely used Quran platform globally with multiple translations and tafsir.","verificationLevel":"primary","contentType":["quran","translation","tafsir"]},{"id":"sunnah-com","name":"Sunnah.com","url":"https://sunnah.com","description":"Direct access to authenticated hadith collections (Bukhari, Muslim, Abu Dawud, etc.).","verificationLevel":"primary","contentType":["hadith","authentication","reference"]},{"id":"seekersguidance","name":"SeekersGuidance.org","url":"https://seekersguidance.org","description":"Verified scholars, free courses, Q&A — widely trusted by Western Muslim communities.","verificationLevel":"primary","contentType":["fatwa","courses","guidance","western-focus"]},{"id":"islamqa","name":"IslamQA.info","url":"https://islamqa.info","description":"One of the largest fatwa databases, reviewed by Sheikh Muhammad al-Munajjid.","verificationLevel":"primary","contentType":["fatwa","q-and-a","scholarly-review"]},{"id":"islamweb","name":"Islamweb.net","url":"https://islamweb.net","description":"Scholarly fatwa centre from Qatar with broad coverage of family and youth issues.","verificationLevel":"primary","contentType":["fatwa","family-guidance","youth-resources"]}]},"chapters":[{"id":"ch1","icon":"🏛️","shortTitle":"Foundations","title":"Foundations of Parenting in Islam","order":1,"sections":[{"id":"ch1-s1","type":"content-card","title":"Rights of Parents","content":"Allah commands honouring parents immediately after Tawheed (monotheism) — placing this duty second only to worshipping Him alone. This is mentioned in Surah Al-Isra (17:23): \\"Your Lord has decreed that you worship none but Him, and that you be kind to parents.\\"","quranVerse":{"arabic":"وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا","translation":"And your Lord has decreed that you not worship except Him, and to parents, good treatment.","reference":"Surah Al-Isra 17:23","source":"Quran.com","sourceUrl":"https://quran.com/17/23","context":"This verse establishes the hierarchy of obligations: worship Allah alone, then treat parents with excellence (ihsan)."},"hadith":{"text":"The Prophet ﷺ was asked who deserves best companionship three times — each time he said \'your mother,\' then \'your father.\'","reference":"Sahih Bukhari 5971","source":"Sunnah.com","sourceUrl":"https://sunnah.com/bukhari:5971","lesson":"The mother is given precedence three times, highlighting her immense right and sacrifice."},"tip":{"icon":"📌","title":"Bite-Sized Reminder","content":"The Prophet ﷺ was asked who deserves best companionship three times — each time he said \'your mother,\' then \'your father.\' (Sahih Bukhari 5971 | Source: Sunnah.com)"}},{"id":"ch1-s2","type":"content-card","title":"Obedience vs Boundaries","content":"Obedience to parents is obligatory except when they command disobedience to Allah. The Prophet ﷺ said: \'There is no obedience to creation in disobedience to the Creator.\' (Ahmad | Source: Sunnah.com)","hadith":{"text":"There is no obedience to creation in disobedience to the Creator.","reference":"Musnad Ahmad","source":"Sunnah.com","sourceUrl":"https://sunnah.com","authenticity":"Hasan (good chain)","application":"This principle applies to all authority figures, not just parents."},"dosDonts":{"dos":["Obey in permissible matters","Explain your concerns calmly","Seek mediation from a scholar","Make dua for them"],"donts":["Obey in clear haram actions","Be rude in your refusal","Publicly shame them","Cut off ties"]}},{"id":"ch1-s3","type":"content-card-full","title":"Mercy, Respect & Ihsan","content":"Ihsan means excellence — doing more than the minimum. In family life, this means going beyond obligation to show genuine love, care, and kindness even when it\'s difficult. The Quran instructs us not to even say \'uff\' (a sound of irritation) to parents.","quranReference":{"verse":"And do not say to them [so much as], \'uff,\' and do not repel them but speak to them a noble word.","reference":"Surah Al-Isra 17:23","source":"Quran.com","sourceUrl":"https://quran.com/17/23"},"image":{"url":"https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&w=700","alt":"Family connection","credit":"Photo: Pexels.com | Free to use","caption":"Building bonds through mercy and excellence in character"}},{"id":"ch1-s4","type":"content-card","title":"Intention (Niyyah) in Family Life","content":"Every act in your household — helping, speaking kindly, enduring difficulty — becomes an act of worship if done with sincere intention for Allah\'s sake. The Prophet ﷺ said: \'Actions are by intentions.\' (Sahih Bukhari 1 | Source: Sunnah.com)","hadith":{"text":"Actions are by intentions, and every person will have only what they intended.","reference":"Sahih Bukhari 1","source":"Sunnah.com","sourceUrl":"https://sunnah.com/bukhari:1","significance":"This is the foundational hadith of Islamic jurisprudence — intention transforms mundane acts into worship."},"reminder":{"icon":"💡","content":"Reframe difficult moments: \'I\'m doing this for Allah, not just for them.\'"}}],"faqs":[{"question":"Does honouring parents mean doing everything they say?","answer":"No. Obedience to parents is obligatory in permissible matters but not in what contradicts Islamic law or causes you clear harm. The scholars are unanimous on this.","source":"IslamQA.info","sourceUrl":"https://islamqa.info","relatedVerse":"Quran 31:15"},{"question":"What if my parents are not Muslim?","answer":"You still owe them kindness, respect, and good companionship in all permissible matters. The Quran mentions this in Surah Luqman (31:15). You do not obey them in shirk, but you maintain the relationship with love.","source":"SeekersGuidance.org","sourceUrl":"https://seekersguidance.org","relatedVerse":"Quran 31:15"},{"question":"Can I disagree with my parents?","answer":"Yes, respectfully. Islam encourages shura (consultation) and does not require you to suppress your opinion. The manner of disagreement matters greatly.","source":"Islamweb.net","sourceUrl":"https://islamweb.net","principle":"Qawlan karima (noble speech) - Quran 17:23"}],"sources":["Quran.com (Surah Al-Isra 17:23)","Sunnah.com (Sahih Bukhari 5971, Hadith on niyyah)","SeekersGuidance.org (article on honouring parents)"]},{"id":"ch2","icon":"💬","shortTitle":"Communication","title":"Communication with Parents","order":2,"sections":[{"id":"ch2-s1","type":"content-card","title":"How to Talk Without Disrespect","content":"The Quran instructs us to speak to parents with qawlan kariman — noble, dignified speech. This means choosing words carefully, keeping your tone soft, and never raising your voice in contempt.","quranReference":{"arabic":"وَقُل لَّهُمَا قَوْلًا كَرِيمًا","translation":"And speak to them with noble speech.","reference":"Surah Al-Isra 17:23","source":"Quran.com","sourceUrl":"https://quran.com/17/23"},"practicalScript":{"title":"📝 Practical Script","content":"\\"Baba/Mama, I want to talk about something. Can we find a good time? I want to understand your view and share mine respectfully.\\""}},{"id":"ch2-s2","type":"content-card","title":"Handling Disagreements Calmly","content":"The Prophet ﷺ never raised his voice in anger in his household. Seeking silence when heated, making wudu, and changing physical position (sitting if standing) are all prophetic remedies for anger. (Source: IslamQA.info)","steps":[{"order":1,"title":"Pause","content":"Don\'t respond immediately when angry"},{"order":2,"title":"Make wudu","content":"To cool down physically and spiritually"},{"order":3,"title":"Return to conversation","content":"After emotions settle"},{"order":4,"title":"Use \'I feel...\' statements","content":"Not blame or accusation"}],"propheticGuidance":{"source":"IslamQA.info","sourceUrl":"https://islamqa.info","topic":"Anger management in Islam"}},{"id":"ch2-s3","type":"content-card-full","title":"Video: Communication in Muslim Families","videos":[{"title":"Navigating Difficult Family Conversations","provider":"SeekersGuidance","embedUrl":"https://www.youtube.com/embed/N4QeKnfSP3s","watchUrl":"https://www.youtube.com/watch?v=N4QeKnfSP3s","duration":"18:42","description":"Practical guidance on maintaining adab while addressing family conflicts"},{"title":"How to Talk to Your Parents — Islamic Perspective","provider":"Islamic Guidance","embedUrl":"https://www.youtube.com/embed/CYe1wfPx4dU","watchUrl":"https://www.youtube.com/watch?v=CYe1wfPx4dU","duration":"12:15","description":"Youth-focused advice on respectful communication with parents"}]},{"id":"ch2-s4","type":"content-card","title":"When Parents Don\'t Understand You","content":"This is one of the most common struggles for Western Muslim youth. Your parents may have grown up in a completely different world. Their resistance often comes from love and fear, not malice.","empathyPoints":[{"icon":"💚","content":"Try to understand their fears first"},{"icon":"💚","content":"Find common ground in Islamic values"},{"icon":"💚","content":"Involve a trusted imam or elder if needed"},{"icon":"💚","content":"Be patient — understanding takes time"}]}],"interactiveTool":{"id":"conflict-phrase-generator","title":"🛠️ Conflict Phrase Generator","description":"Select a situation and get an Islamically framed response:","options":[{"value":"curfew","label":"Parents set an early curfew","response":"\\"Baba/Mama, I understand your concern about my safety. Can we discuss a curfew that works for both of us? I want you to feel comfortable while also being able to participate in normal activities.\\""},{"value":"career","label":"Parents push a specific career","response":"\\"I hear your vision for me, and I respect it. Can I show you some research about the path I\'m passionate about? I want to find something we both feel good about.\\""},{"value":"friends","label":"Parents disapprove of your friends","response":"\\"I understand you have concerns. Would you be willing to meet my friends so you can see who they actually are? I value your opinion and want you to have all the information.\\""},{"value":"marriage","label":"Parents want to rush marriage","response":"\\"I know this is sensitive. Can we sit down and talk about what qualities you\'d want in my future spouse? I want your blessing and your guidance in this process.\\""}]},"sources":["Quran.com (Surah Al-Isra 17:23 — qawlan kariman)","IslamQA.info (anger management in Islam)","SeekersGuidance.org (family communication)"]},{"id":"ch3","icon":"⚖️","shortTitle":"Culture vs Islam","title":"Culture vs Islam","order":3,"sections":[{"id":"ch3-s1","type":"comparison-grid","title":"Cultural Norms vs Islamic Teachings","comparison":{"culturalNorms":["Honour/shame-based decisions","\\"What will people say?\\"","Gender double-standards","Forced career paths","Marrying from same village/tribe only"],"islamicTeachings":["Decisions based on taqwa, not shame","Allah\'s pleasure over people\'s opinions","Equal accountability for men & women","Consultation and choice in career","Piety as the basis for marriage"]}},{"id":"ch3-s2","type":"content-card","title":"\\"My parents say it\'s haram but is it?\\"","content":"Many things labelled \'haram\' by parents are actually cultural preferences, not Islamic rulings. Always verify with a qualified scholar. Trusted resources: IslamQA.info, SeekersGuidance.org, Islamweb.net.","warning":{"icon":"⚠️","content":"Note: Don\'t use \'it\'s not haram\' to justify genuinely forbidden things. Check with sincerity."}},{"id":"ch3-s3","type":"content-card","title":"Breaking Toxic Cultural Norms Respectfully","dosDonts":{"dos":["Use Islamic evidence calmly","Involve respected community figures","Make gradual, respectful change"],"donts":["Publicly embarrass parents","Use Western norms as argument","Make it a power struggle"]}},{"id":"ch3-s4","type":"content-card-full","title":"Video: Culture vs. Islam for Western Muslims","videos":[{"title":"Culture vs. Islam","speaker":"Sh. Omar Suleiman","embedUrl":"https://www.youtube.com/embed/rQIBLnMhHJo","watchUrl":"https://www.youtube.com/watch?v=rQIBLnMhHJo","description":"Understanding the difference between cultural practices and Islamic obligations"},{"title":"Generational Gaps in Muslim Families","provider":"Islamic Guidance","embedUrl":"https://www.youtube.com/embed/WYrSP6vOPaI","watchUrl":"https://www.youtube.com/watch?v=WYrSP6vOPaI","description":"Navigating differences between immigrant parents and Western-raised children"}]}],"interactiveTool":{"id":"culture-check","title":"🛠️ Culture Check: Is It Islam or Culture?","description":"Select a situation to see its Islamic ruling:","checks":[{"label":"Marrying only from same country/tribe","type":"Culture","detail":"Islam permits marriage to any suitable Muslim regardless of ethnicity or origin. Tribal exclusivity has no Islamic basis.","source":"Islamweb.net — discrimination in marriage","sourceUrl":"https://islamweb.net"},{"label":"Hijab for girls only, no modesty standard for boys","type":"Culture","detail":"Islam commands modesty (ghadd al-basar) for both men and women. The double standard is cultural, not Islamic.","source":"IslamQA.info — modesty in Islam","sourceUrl":"https://islamqa.info"},{"label":"Women cannot work outside the home","type":"Mixed","detail":"Islam permits women to work in halal environments. Khadijah (RA) was a businesswoman. Cultural restrictions vary but are not universal Islamic rulings.","source":"SeekersGuidance.org","sourceUrl":"https://seekersguidance.org"},{"label":"Praying 5 times a day","type":"Islam","detail":"This is a clear Islamic obligation (fard) — not culture. The five daily prayers are one of the five pillars of Islam.","source":"Quran.com — Surah Al-Baqarah 2:43","sourceUrl":"https://quran.com/2/43"},{"label":"Not allowed to have any friends of opposite gender","type":"Mixed","detail":"Islam prohibits khalwa (seclusion) and illicit relationships. However, professional/academic interaction with modesty and boundaries is generally permitted.","source":"IslamQA.info — mixed interaction","sourceUrl":"https://islamqa.info"}]},"sources":["IslamQA.info (cultural practices in Islam)","SeekersGuidance.org (culture vs. shariah)","Islamweb.net (tribal/racial discrimination in marriage)"]},{"id":"ch4","icon":"😤","shortTitle":"Conflict","title":"Conflict & Arguments","order":4,"sections":[{"id":"ch4-s1","type":"content-card","title":"What Islam Says About Shouting & Anger","content":"The Prophet ﷺ repeated \'Don\'t be angry\' three times when asked for advice. Uncontrolled anger is described as coming from Shaytan. Physically, changing posture, making wudu, or leaving the room temporarily are all recommended. (Source: Sunnah.com — Sahih Bukhari 6116)","hadith":{"text":"The strong person is not the one who can wrestle someone down, but the one who controls himself when angry.","reference":"Sahih Bukhari 6114","source":"Sunnah.com","sourceUrl":"https://sunnah.com/bukhari:6114","lesson":"True strength is self-control, not physical dominance."}},{"id":"ch4-s2","type":"content-card","title":"Dealing with Strict Parents","steps":[{"order":1,"content":"Understand strictness often comes from fear"},{"order":2,"content":"Build trust with small consistent actions"},{"order":3,"content":"Show responsibility before asking for freedom"},{"order":4,"content":"Request mediation from a trusted person"},{"order":5,"content":"Make dua — hearts are in Allah\'s hands"}]},{"id":"ch4-s3","type":"content-card","title":"Image: Finding Calm","image":{"url":"https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&w=600","alt":"Calm reflection","credit":"Photo: Pexels.com | Free to use","caption":"Taking a moment for reflection can transform conflict into understanding"}},{"id":"ch4-s4","type":"content-card","title":"Feeling Controlled or Misunderstood","content":"Feeling suffocated is a real and valid experience. Islam acknowledges that oppressive treatment even from parents does not nullify your dignity. Seek counsel from a scholar or counsellor if you feel trapped.","microTip":{"icon":"💡","title":"Micro Tip","content":"Say one sentence that de-escalates: \\"I respect you, and I just need you to hear me.\\""}}],"interactiveTool":{"id":"anger-level-check","title":"🛠️ Anger Level Check-In","description":"Before responding to your parents, check your anger level:","scale":{"min":1,"max":10,"labels":{"low":"Calm","medium":"Moderate","high":"Very Angry"},"advice":{"1-3":"✅ Good level — you can have a productive conversation now.","4-6":"⚠️ Moderate — take 5 deep breaths before responding.","7-10":"🛑 Too angry — make wudu, change your position, and wait before speaking."}}},"sources":["Sunnah.com (Sahih Bukhari 6114, 6116 — anger)","SeekersGuidance.org (conflict in Islamic family life)"]},{"id":"ch5","icon":"❤️","shortTitle":"Emotions","title":"Emotional Struggles with Parents","order":5,"sections":[{"id":"ch5-s1","type":"content-card","title":"Feeling Unloved or Unappreciated","content":"Many Muslim parents express love through provision and protection, not verbal affirmation — a cultural and generational pattern. This doesn\'t mean they don\'t love you. However, your emotional need for acknowledgment is valid in Islam too.","reminder":{"icon":"💚","content":"Allah knows what is in the hearts — seek His acknowledgment first."}},{"id":"ch5-s2","type":"content-card","title":"Pressure to Meet Expectations","content":"Excessive pressure contradicts the Islamic principle of la tukallafu nafsan illa wus\'aha — \'Allah does not burden a soul beyond what it can bear.\' (Quran 2:286 | Source: Quran.com)","quranVerse":{"arabic":"لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا","translation":"Allah does not burden a soul beyond that it can bear.","reference":"Surah Al-Baqarah 2:286","source":"Quran.com","sourceUrl":"https://quran.com/2/286","context":"This verse provides comfort that Allah\'s expectations are always within our capacity."}},{"id":"ch5-s3","type":"content-card","title":"Comparison with Siblings/Others","content":"The Prophet ﷺ warned against partiality among children. Comparison is often used as \'motivation\' but can cause lasting harm. Know your own worth — in Islam, you are valued for your taqwa, not your grades or status.","tip":{"icon":"💡","content":"Remind yourself: \\"My worth is with Allah, not in comparison to anyone else.\\""}},{"id":"ch5-s4","type":"content-card","title":"Healing Parent-Child Relationships","steps":[{"order":1,"content":"Forgive — for your own sake, not only theirs"},{"order":2,"content":"Start small: a smile, a cup of tea"},{"order":3,"content":"Dua — sincerely ask Allah to mend hearts"},{"order":4,"content":"Seek family counselling if needed"}]}],"faqs":[{"question":"Is it normal to feel emotionally disconnected from my parents?","answer":"Yes — many youth experience this, especially across cultural and generational gaps. It does not make you a bad Muslim. Seek to understand them while also setting healthy limits.","source":"SeekersGuidance.org","sourceUrl":"https://seekersguidance.org"},{"question":"My parents compare me to my siblings constantly. What can I do?","answer":"Communicate how it affects you using \'I feel\' language. If it continues, a trusted family member or counsellor may help mediate.","source":"IslamQA.info","sourceUrl":"https://islamqa.info"}],"sources":["Quran.com (2:286)","SeekersGuidance.org (emotional well-being in Islam)","IslamQA.info (dealing with parental pressure)"]},{"id":"ch6","icon":"🧠","shortTitle":"Boundaries","title":"Boundaries in Islam","order":6,"sections":[{"id":"ch6-s1","type":"content-card","title":"Is It Allowed to Say No?","content":"Yes — in Islam, obedience to parents is not unconditional. You may decline requests that are clearly sinful, harmful to you, or beyond your capacity. The key is how you decline: with respect, gentleness, and an explanation.","principle":{"arabic":"لا طاعة لمخلوق في معصية الخالق","translation":"There is no obedience to a created being in disobedience to the Creator.","source":"Musnad Ahmad","sourceUrl":"https://sunnah.com"}},{"id":"ch6-s2","type":"content-card","title":"Privacy & Independence","content":"Islam recognises the concept of awra (privacy) and individual accountability. Adults are responsible for their own deeds before Allah — this implies a level of personal autonomy. Parents may guide, but cannot control every decision of an adult child.","islamicConcept":{"term":"Awra","definition":"That which should be concealed; includes physical privacy and personal dignity","application":"Respecting a person\'s awra includes not intruding on their private matters without cause"}},{"id":"ch6-s3","type":"content-card","title":"Toxic or Unfair Treatment","content":"Islam forbids oppression (dhulm) from anyone — including parents. The Prophet ﷺ said: \'There is no harm and no causing harm.\' (Ibn Majah 2341 | Source: Sunnah.com). Enduring harmful treatment in silence is not required by Islam.","hadith":{"text":"There is no harm and no causing harm.","reference":"Sunan Ibn Majah 2341","source":"Sunnah.com","sourceUrl":"https://sunnah.com/ibnmajah:2341","authenticity":"Hasan","application":"This principle protects individuals from all forms of oppression, including within families"},"warning":{"icon":"⚠️","content":"If you are experiencing abuse, seek help from a trusted imam, counsellor, or community organisation."}},{"id":"ch6-s4","type":"content-card","title":"Respect vs Self-Respect Balance","dosDonts":{"respectful":["Disagreeing calmly","Expressing your limits kindly","Asking for space politely"],"disrespectful":["Yelling or slamming doors","Posting family issues publicly","Complete silent treatment"]}}],"image":{"url":"https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&w=700","alt":"Peaceful reflection","credit":"Photo: Pexels.com | Free to use","caption":"Finding balance between respect and self-care"},"sources":["Sunnah.com (Ibn Majah 2341 — la darar)","SeekersGuidance.org (boundaries in Islamic family)","IslamQA.info (refusing haram requests from parents)"]},{"id":"ch7","icon":"🌍","shortTitle":"Western Life","title":"Growing Up in Western Society","order":7,"sections":[{"id":"ch7-s1","type":"content-card","title":"The Double Identity","content":"Many Western Muslim youth feel torn between two worlds: the home (with cultural/Islamic expectations) and outside (with peer and societal pressure). This \'double life\' feeling is common and does not make you a bad Muslim.","reminder":{"icon":"🌟","content":"Your identity as a Muslim is not threatened by living in the West — it is tested and strengthened."}},{"id":"ch7-s2","type":"content-card","title":"Freedom vs Protection","content":"Parents in the West often over-protect out of fear of the environment. Islam encourages balance — trust must be built gradually. The Prophet ﷺ gave companions independence as they demonstrated responsibility. (Source: SeekersGuidance.org)","propheticExample":{"context":"The Prophet ﷺ entrusted young companions with responsibilities as they showed maturity","lesson":"Trust is earned through demonstrated responsibility, not age alone","source":"SeekersGuidance.org","sourceUrl":"https://seekersguidance.org"}},{"id":"ch7-s3","type":"content-card-full","title":"Video: Being Muslim in the West","videos":[{"title":"Muslim Identity in the West","provider":"Yaqeen Institute","embedUrl":"https://www.youtube.com/embed/W5p1bYyNEE8","watchUrl":"https://www.youtube.com/watch?v=W5p1bYyNEE8","description":"Research-based insights on navigating Muslim identity in Western contexts"},{"title":"Growing Up Muslim in the West","provider":"Islamic Guidance","embedUrl":"https://www.youtube.com/embed/hNFbITGIkjQ","watchUrl":"https://www.youtube.com/watch?v=hNFbITGIkjQ","description":"Personal stories and practical advice for Western Muslim youth"}]},{"id":"ch7-s4","type":"content-card","title":"\\"You\'re Too Western\\" or \\"Too Strict\\"","content":"Being labelled either way shows you exist at an intersection. This is not a flaw — Islam is for all times and places. The key is grounding yourself in Islamic principles while being able to navigate any environment.","affirmation":{"icon":"💡","content":"\\"I am Muslim first — that doesn\'t change based on geography.\\""}}],"sources":["SeekersGuidance.org (Muslim identity in the West)","Yaqeen Institute research on Western Muslim youth"]},{"id":"ch8","icon":"📚","shortTitle":"Career","title":"Education, Career & Life Choices","order":8,"sections":[{"id":"ch8-s1","type":"content-card","title":"Parents Forcing Careers","content":"A parent\'s influence on career is permissible as guidance — but not as compulsion. Islam upholds the principle of shura (consultation) and individual accountability. You will answer to Allah for your life choices, not your parents.","islamicPrinciple":{"term":"Shura","definition":"Consultation and mutual decision-making","quranReference":"Quran 42:38 - \'And whose affair is [determined by] consultation among themselves\'","application":"Career decisions should involve discussion, not unilateral imposition"}},{"id":"ch8-s2","type":"content-card","title":"Passion vs Parental Expectations","content":"The Prophet ﷺ is reported to have said: \'Allah loves that when one of you does a job, they do it with excellence (itqan).\' (Al-Bayhaqi | Source: IslamQA.info). Excellence is possible in any halal field — pursue what you can do with itqan.","hadith":{"text":"Allah loves that when one of you does a job, they do it with excellence (itqan).","reference":"Al-Bayhaqi, Shu\'ab al-Iman","source":"IslamQA.info","sourceUrl":"https://islamqa.info","authenticity":"Hasan li-ghayrihi","lesson":"Excellence in any halal profession is an act of worship"},"dosDonts":{"dos":["Research Islamic perspectives on your field","Show your parents success stories","Make istikhara before big decisions"],"donts":["Choose a haram field to prove a point","Give up without trying to explain","Neglect parental input entirely"]}},{"id":"ch8-s3","type":"content-card","title":"Moving Out for Study/Work","content":"Moving out for legitimate educational or professional reasons is permissible and has precedent in Islamic history. However, maintaining ties with parents — regular calls, visits, financial support if able — is obligatory.","steps":[{"order":1,"content":"Have an honest family discussion"},{"order":2,"content":"Reassure them of continued contact"},{"order":3,"content":"Commit to regular check-ins"},{"order":4,"content":"Maintain halal living arrangements"}]},{"id":"ch8-s4","type":"content-card","title":"Istikhara — Seeking Allah\'s Guidance","content":"For any major life decision, perform Salah al-Istikhara and make sincere dua. This is not about receiving a dream — it is about submitting the decision to Allah and then moving forward with tawakkul (reliance on Allah).","reminder":{"icon":"🤲","content":"Istikhara Guide: Sunnah.com — Search \'Salat al-Istikhara\'","sourceUrl":"https://sunnah.com"}}],"sources":["IslamQA.info (career choices in Islam, istikhara)","Sunnah.com (du\'a of istikhara)","SeekersGuidance.org (moving out of the family home)"]},{"id":"ch9","icon":"💑","shortTitle":"Marriage","title":"Marriage & Relationships","order":9,"sections":[{"id":"ch9-s1","type":"content-card","title":"Islamic Rights in Marriage Choice","content":"Islam grants both men and women the right to consent to marriage. No valid marriage exists without the consent of both parties. (Source: IslamQA.info, based on Sahih Bukhari 5136). A wali (guardian) has the role of protection, not possession.","hadith":{"text":"A woman who has been previously married has more right to decide about herself than her guardian, and a virgin\'s consent must be sought.","reference":"Sahih Muslim 1421","source":"Sunnah.com","sourceUrl":"https://sunnah.com/muslim:1421","application":"Consent is mandatory for all marriages; cultural pressure to \'agree\' does not constitute valid consent"}},{"id":"ch9-s2","type":"content-card","title":"Cultural Barriers to Marriage","content":"Refusing marriage proposals purely based on race or tribe contradicts the Prophetic teaching: \'If someone comes to you whose deen and character pleases you, then marry him.\' (Tirmidhi 1084 | Source: Sunnah.com). Tribal pride is a sin in Islam.","hadith":{"text":"If someone comes to you whose deen and character pleases you, then marry him. If you do not, there will be fitnah on earth and widespread corruption.","reference":"Jami` at-Tirmidhi 1084","source":"Sunnah.com","sourceUrl":"https://sunnah.com/tirmidhi:1084","authenticity":"Hasan","lesson":"Piety and character are the only valid criteria for marriage selection"}},{"id":"ch9-s3","type":"content-card","title":"Love vs Arranged Marriage","content":"Islam does not prohibit a person from expressing interest in marriage to someone — it prohibits unlawful relationships (khalwa, zina). Approaching a potential match through proper channels with the wali\'s involvement is halal and encouraged.","tip":{"icon":"💡","content":"There is no \'arranged\' vs \'love\' dichotomy in Islam — there is only the halal process, which can include your input."}},{"id":"ch9-s4","type":"content-card","title":"Talking to Parents About Relationships","practicalScript":{"title":"📝 Opening Script","content":"\\"Baba/Mama, I\'ve met someone I believe would be a good spouse based on their deen and character. I\'d like to discuss this with you and follow the proper process.\\""},"dosDonts":{"dos":["Be transparent early","Involve a trusted elder","Follow Islamic steps"],"donts":["Hide a relationship","Meet in private (khalwa)","Issue ultimatums"]}},{"id":"ch9-s5","type":"content-card-full","title":"Video: Marriage & Parents in Islam","videos":[{"title":"Talking to Parents About Marriage","speaker":"Mufti Menk","embedUrl":"https://www.youtube.com/embed/gEfFwsQHJ-E","watchUrl":"https://www.youtube.com/watch?v=gEfFwsQHJ-E","description":"Practical advice on discussing marriage intentions with parents Islamically"},{"title":"Navigating Halal Relationships for Youth","provider":"Islamic Guidance","embedUrl":"https://www.youtube.com/embed/3V7HqsMtXso","watchUrl":"https://www.youtube.com/watch?v=3V7HqsMtXso","description":"Understanding boundaries and proper channels for marriage preparation"}]}],"faqs":[{"question":"Can my parents force me to marry someone?","answer":"No. Forced marriage is haram in Islam. Both parties must consent for the marriage to be valid. A wali\'s role is protective, not coercive.","source":"IslamQA.info","sourceUrl":"https://islamqa.info","relatedHadith":"Sahih Bukhari 5136"},{"question":"Is it haram to talk to a potential spouse?","answer":"Supervised, purposeful interaction to assess suitability for marriage is permitted. Khalwa (seclusion), inappropriate communication, and romantic relationships before marriage are not.","source":"SeekersGuidance.org","sourceUrl":"https://seekersguidance.org","principle":"Intentions and boundaries define permissibility"},{"question":"My parents refuse all proposals. What do I do?","answer":"Seek the help of a trusted imam or family elder. If your wali is unjustly preventing a valid marriage, a judge or imam may step in as wali in some madhabs. Consult a local scholar.","source":"IslamQA.info","sourceUrl":"https://islamqa.info","note":"This is a sensitive matter requiring scholarly guidance"}],"sources":["Sunnah.com (Sahih Bukhari 5136, Sahih Muslim 1421, Tirmidhi 1084)","IslamQA.info (forced marriage in Islam)","SeekersGuidance.org (marriage process)"]},{"id":"ch10","icon":"🕌","shortTitle":"Deen","title":"Practising Islam with Parents","order":10,"sections":[{"id":"ch10-s1","type":"content-card","title":"When Parents Are Less Practising","content":"This is a test — not an excuse to be arrogant. The Prophet ﷺ\'s approach was always gentleness, example, and sincere love. You cannot force hidaya (guidance) — only Allah guides hearts.","reminder":{"icon":"💡","content":"Your job is to be an example, not a preacher in your own home."}},{"id":"ch10-s2","type":"content-card","title":"When You Become More Practising Than Them","dosDonts":{"dos":["Lead by action and character","Make dua for their guidance","Share knowledge gently if asked","Maintain respect regardless"],"donts":["Lecture them at every opportunity","Look down on their level","Use religion as a weapon in arguments"]}},{"id":"ch10-s3","type":"content-card","title":"Family Religious Habits to Build","steps":[{"order":1,"content":"Pray together when possible"},{"order":2,"content":"Read Quran aloud at home"},{"order":3,"content":"Share beneficial content casually"},{"order":4,"content":"Celebrate Islamic occasions as a family"},{"order":5,"content":"Make morning/evening adhkar a family habit"}]},{"id":"ch10-s4","type":"content-card","title":"Image: Family & Deen","image":{"url":"https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&w=600","alt":"Muslim family worship","credit":"Photo: Pexels.com | Free to use","caption":"Building deen together through small, consistent actions"}}],"sources":["SeekersGuidance.org (being more practising than parents)","IslamQA.info (inviting family to Islam)","Sunnah.com (family adhkar)"]},{"id":"ch11","icon":"🤲","shortTitle":"Duas","title":"Du\'as & Spiritual Approach","order":11,"sections":[{"id":"ch11-s1","type":"dua-collection","title":"Powerful Du\'as for Parents","duas":[{"id":"dua-1","arabic":"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ","translation":"My Lord, forgive me and my parents.","reference":"Quran 71:28","source":"Quran.com","sourceUrl":"https://quran.com/71/28","context":"Prophet Nuh\'s (AS) prayer for himself and his parents"},{"id":"dua-2","arabic":"رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا","translation":"My Lord, have mercy on them as they raised me when I was small.","reference":"Quran 17:24","source":"Quran.com","sourceUrl":"https://quran.com/17/24","context":"Commanded immediately after the instruction to speak nobly to parents"},{"id":"dua-3","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ","translation":"Our Lord, grant us from our spouses and offspring comfort to our eyes.","reference":"Quran 25:74","source":"Quran.com","sourceUrl":"https://quran.com/25/74","context":"A prayer for righteous, harmonious family relationships"}]},{"id":"ch11-s2","type":"content-card","title":"Sabr (Patience) in Family Hardship","content":"Sabr is not passive acceptance — it is active endurance with trust in Allah. The Quran tells us Allah is with those who are patient. (Quran 2:153 | Source: Quran.com). Every difficult family moment endured with sabr earns reward.","quranVerse":{"arabic":"يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ","translation":"O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.","reference":"Surah Al-Baqarah 2:153","source":"Quran.com","sourceUrl":"https://quran.com/2/153"}},{"id":"ch11-s3","type":"content-card","title":"Barakah in Respecting Parents","content":"The Prophet ﷺ said that whoever wishes for an extended, blessed life and increase in provision should maintain family ties and honour parents. (Sahih Bukhari 5986 | Source: Sunnah.com)","hadith":{"text":"Whoever would like his provision to be increased and his life to be extended, let him uphold the ties of kinship.","reference":"Sahih Bukhari 5986","source":"Sunnah.com","sourceUrl":"https://sunnah.com/bukhari:5986","lesson":"Honouring parents and maintaining family ties brings barakah (blessing) in life and provision"},"reminder":{"icon":"🌟","content":"Barakah (blessing) is unlocked through parental du\'a for you."}}],"sources":["Quran.com (2:153, 14:40–41, 17:24, 25:74, 71:28)","Sunnah.com (Sahih Bukhari 5986)","SeekersGuidance.org (du\'a for parents)"]},{"id":"ch12","icon":"🔒","shortTitle":"Serious Issues","title":"Difficult & Sensitive Situations","order":12,"emergencyNotice":{"icon":"⚠️","content":"This chapter addresses serious situations. If you are in immediate danger, contact emergency services. For Islamic support, reach out to a trusted imam or Muslim counselling service.","priority":"high"},"sections":[{"id":"ch12-s1","type":"content-card","title":"Toxic or Abusive Households","content":"Islam explicitly forbids dhulm (oppression and injustice) from anyone — including parents. The Prophet ﷺ said: \'Beware of oppression, for oppression will be darkness on the Day of Judgement.\' (Sahih Muslim 2578 | Source: Sunnah.com). Leaving an abusive situation is not disobedience.","hadith":{"text":"Beware of oppression, for oppression will be darkness on the Day of Judgement.","reference":"Sahih Muslim 2578","source":"Sunnah.com","sourceUrl":"https://sunnah.com/muslim:2578","application":"This warning applies universally; no one has the right to oppress another, regardless of relationship"}},{"id":"ch12-s2","type":"content-card","title":"When to Seek Help","steps":[{"order":1,"content":"Speak to a trusted imam privately"},{"order":2,"content":"Contact a Muslim counselling service"},{"order":3,"content":"Reach out to a trustworthy adult outside the home"},{"order":4,"content":"If in danger — contact services or authorities"}],"resources":{"note":"Many Muslim communities have confidential support services. Search for \'Muslim counselling [your city]\' or contact national Islamic organisations for referrals."}},{"id":"ch12-s3","type":"content-card","title":"Islamic Limits of Obedience","content":"The scholars are unanimous: obedience to parents is obligatory only in permissible matters. When parents command disobedience to Allah, or when obeying them causes you clear physical or spiritual harm, the obligation ends. (Source: IslamQA.info, Islamweb.net)","scholarlyConsensus":{"principle":"La ta\'ata li-makhluq fi ma\'siyat al-Khaliq","translation":"There is no obedience to a created being in disobedience to the Creator","sources":["IslamQA.info","Islamweb.net","SeekersGuidance.org"]}},{"id":"ch12-s4","type":"content-card","title":"Emotional Neglect","content":"Emotional neglect is a real harm. Islam\'s emphasis on rahma (mercy) in families means that a parent who consistently neglects a child\'s emotional wellbeing is falling short of their Islamic duty. Seek support — this is not ingratitude.","warning":{"icon":"⚠️","content":"Your wellbeing matters. Getting help is an act of self-care, not betrayal."}}],"sources":["Sunnah.com (Sahih Muslim 2578 — dhulm)","IslamQA.info (limits of obedience)","Islamweb.net (family abuse in Islam)"]},{"id":"ch13","icon":"🤝","shortTitle":"Relationship","title":"Building a Better Relationship","order":13,"sections":[{"id":"ch13-s1","type":"content-card","title":"Small Actions with Big Impact","empathyActions":[{"icon":"☕","content":"Bring them tea/coffee without being asked"},{"icon":"📞","content":"Call when you\'re away — just to check in"},{"icon":"🙏","content":"Ask for their du\'a before exams/big events"},{"icon":"🛒","content":"Offer to help with errands"},{"icon":"💬","content":"Sit with them in the evening"}]},{"id":"ch13-s2","type":"content-card","title":"Becoming the \'Cool-Headed One\'","content":"In family conflict, someone has to be the mature one. Islam encourages us to be that person. The Prophet ﷺ said the best among people is the one who benefits others. (Source: Sunnah.com). Choose to de-escalate, not escalate.","hadith":{"text":"The best of people are those that bring the most benefit to the rest of mankind.","reference":"Al-Mu\'jam al-Awsat 6026","source":"Sunnah.com","sourceUrl":"https://sunnah.com","authenticity":"Hasan","application":"Being the peacemaker in family conflicts is a form of benefiting others"},"practicalScript":{"title":"1 Sentence That De-escalates","content":"\\"I don\'t want to argue with you — I love you and I just want us to understand each other.\\""}},{"id":"ch13-s3","type":"content-card","title":"Rebuilding Trust","steps":[{"order":1,"content":"Be consistent — say what you do, do what you say"},{"order":2,"content":"Apologise genuinely when you\'re wrong"},{"order":3,"content":"Show improvement — don\'t just talk about it"},{"order":4,"content":"Give it time — trust takes time to rebuild"}]},{"id":"ch13-s4","type":"content-card","title":"Showing Appreciation","barakahTips":{"title":"3 Ways to Earn Barakah at Home","tips":["Say \'JazakAllah khair\' to your parents genuinely","Include them in your du\'a by name","Speak well of them to others"]}}],"image":{"url":"https://images.pexels.com/photos/3820378/pexels-photo-3820378.jpeg?auto=compress&w=700","alt":"Family bonding","credit":"Photo: Pexels.com | Free to use","caption":"Small, consistent acts of kindness rebuild and strengthen family bonds"},"sources":["Sunnah.com (best among people hadith)","SeekersGuidance.org (rebuilding family relationships in Islam)"]},{"id":"ch14","icon":"⚡","shortTitle":"Quick Tips","title":"Quick Advice / Micro Content","order":14,"microTips":[{"id":"tip-1","icon":"😤","title":"When Your Parents Are Angry","content":"Go quiet. Don\'t respond immediately. Let them finish. Then calmly say: \\"I hear you, can we talk about this when things are calm?\\""},{"id":"tip-2","icon":"🔥","title":"1 Sentence That De-escalates","content":"\\"I don\'t want to argue — I want us to understand each other.\\" This works almost every time."},{"id":"tip-3","icon":"🚫","title":"Never Say This","content":"\\"You don\'t understand anything.\\" — This shuts down any chance of real communication instantly."},{"id":"tip-4","icon":"✨","title":"3 Ways to Earn Barakah at Home","content":"1. Smile first. 2. Do something helpful unprompted. 3. Make du\'a for them by name."},{"id":"tip-5","icon":"📵","title":"Phone-Free Family Time","content":"Put your phone away during family meals/gatherings. This single act can transform your relationship."},{"id":"tip-6","icon":"🤲","title":"Morning Du\'a for Peace at Home","content":"Start each day with du\'a for Allah to put love and harmony in your home."}],"interactiveTool":{"id":"habit-tracker","title":"🛠️ Daily Habit Tracker","description":"Track your daily relationship-building habits:","habits":[{"id":"habit-1","label":"Made du\'a for parents after Salah","reward":"+Barakah ✓"},{"id":"habit-2","label":"Said something kind to a family member","reward":"+Barakah ✓"},{"id":"habit-3","label":"Helped without being asked","reward":"+Barakah ✓"},{"id":"habit-4","label":"Controlled my temper in a difficult moment","reward":"+Barakah ✓"},{"id":"habit-5","label":"Made istighfar for family conflicts","reward":"+Barakah ✓"}],"completionMessage":"🌟 SubhanAllah! Full day of goodness!"}},{"id":"ch15","icon":"🎥","shortTitle":"Stories","title":"Real Stories & Scenarios","order":15,"stories":[{"id":"story-1","title":"\\"My parents don\'t understand me…\\"","body":"A 19-year-old university student feels her parents see her through a cultural lens, not who she really is. She loves her deen but feels suffocated at home.","islamicPerspective":"This is not unusual. Cultural blind spots are real. The Islamic approach is to seek understanding through compassion and proper channels — not conflict. Dua and patience are real tools here.","source":"Composite — SeekersGuidance.org community questions","sourceUrl":"https://seekersguidance.org"},{"id":"story-2","title":"\\"I want to move out but feel guilty\\"","body":"A 22-year-old male wants to move out for his career but feels he\'s abandoning his family duty. He can\'t afford a clear head at home.","islamicPerspective":"Moving out for legitimate reasons is permissible in Islam. The obligation is to maintain ties and support — not physical proximity. Communicate your plan clearly and reassure your family.","source":"IslamQA.info — question on moving out","sourceUrl":"https://islamqa.info"},{"id":"story-3","title":"\\"They won\'t let me marry who I choose\\"","body":"A Muslim woman wants to marry a practising man from a different background. Her parents refuse due to cultural reasons.","islamicPerspective":"This is a well-documented issue in fiqh. Cultural-only refusal of a suitable, practising match contradicts the Sunnah. A scholar or Muslim mediator can help in this case.","source":"Sunnah.com (Tirmidhi 1084), IslamQA.info","sourceUrl":"https://sunnah.com/tirmidhi:1084"}],"interactiveTool":{"id":"story-submission","title":"📬 Share Your Story (Anonymous)","description":"Sharing your experience helps others feel less alone. This is a safe, moderated space.","placeholder":"Write your situation anonymously... (e.g. \'My parents won\'t let me choose my career...\')","submitButtonText":"Submit Anonymously","successMessage":"JazakAllah khair — your story has been noted. May Allah ease your situation."}},{"id":"ch16","icon":"🧩","shortTitle":"Interactive","title":"Interactive Content","order":16,"interactiveTools":[{"id":"scenario-quiz","title":"🛠️ \\"Are You Wrong Here?\\" — Scenario Quiz","description":"Read the scenario and decide:","scenarios":[{"id":"scenario-1","text":"A 17-year-old wants to attend a mixed-gender school trip. Their parents refuse because \\"it\'s haram.\\" Islamic schools allow mixed academic environments. Who is right?","correctAnswer":"both","feedback":"Both have a point. Parents\' caution is valid, but labelling all mixed educational settings as haram is not an established Islamic ruling. A conversation with a scholar would help.","options":[{"value":"youth","label":"Youth is Wrong"},{"value":"parent","label":"Parent is Wrong"},{"value":"both","label":"Both Have a Point"}]},{"id":"scenario-2","text":"A parent shouts and uses hurtful language at their 20-year-old child whenever they express an opinion. The child responds by going silent for weeks.","correctAnswer":"both","feedback":"The parent\'s behaviour contradicts Islamic adab. The child\'s extended silence (sulking) also needs addressing. Both need reflection. Seek mediation.","options":[{"value":"youth","label":"Youth is Wrong"},{"value":"parent","label":"Parent is Wrong"},{"value":"both","label":"Both Have a Point"}]},{"id":"scenario-3","text":"A 23-year-old is told they must marry their cousin. They refuse. Their parents say they are disobeying Allah.","correctAnswer":"parent","feedback":"The parents are wrong here. Forced marriage is haram in Islam. There is no Islamic obligation to marry a cousin. The child has the right to refuse.","options":[{"value":"youth","label":"Youth is Wrong"},{"value":"parent","label":"Parent is Wrong"},{"value":"both","label":"Both Have a Point"}]}],"completionMessage":"Quiz Complete! Jazakum Allahu Khayran. Remember, understanding both sides is the goal."},{"id":"community-poll","title":"📊 Community Poll: How Strict Were Your Parents?","options":[{"id":"relaxed","label":"Very Relaxed"},{"id":"moderate","label":"Moderate"},{"id":"strict","label":"Strict"},{"id":"veryStrict","label":"Very Strict"}],"note":"JazakAllah for voting! ({{ totalPollVotes }} total responses)"},{"id":"what-would-you-do","title":"❓ \\"What Would You Do?\\" Situations","situations":[{"id":"wyd-1","question":"Your parent says something hurtful in anger. What do you do?","choices":[{"value":"A","label":"Argue back immediately","correct":false},{"value":"B","label":"Go quiet and address it later calmly","correct":true},{"value":"C","label":"Leave and don\'t speak for days","correct":false}],"feedback":"Option B is the prophetic approach. Address hurt feelings, but when emotions are calm — not in the heat of the moment."},{"id":"wyd-2","question":"Your parents forbid you from attending a halal Islamic event because they\'re worried. What do you do?","choices":[{"value":"A","label":"Go anyway without telling them","correct":false},{"value":"B","label":"Share details about the event and ask again","correct":true},{"value":"C","label":"Give up and never try","correct":false}],"feedback":"Option B — provide them with information to ease their worry. Build trust gradually."},{"id":"wyd-3","question":"You disagree with your parents on a non-religious matter. What is your Islamic right?","choices":[{"value":"A","label":"Obey regardless — no discussion allowed","correct":false},{"value":"B","label":"Disagree respectfully and express your view","correct":true},{"value":"C","label":"Ignore them and do what you want","correct":false}],"feedback":"Option B — shura (consultation) is encouraged in Islam. You have the right to express yourself respectfully."}]}]}],"resources":{"apps":[{"id":"quran-com","icon":"📖","name":"Quran.com","description":"Read and search the Quran in Arabic with translations and tafsir.","type":"Website & App","url":"https://quran.com","features":["Multiple translations","Tafsir","Audio recitation","Bookmarking"]},{"id":"sunnah-com","icon":"📚","name":"Sunnah.com","description":"Browse authenticated hadiths from the major collections.","type":"Website","url":"https://sunnah.com","features":["Bukhari","Muslim","Abu Dawud","Tirmidhi","Search functionality"]},{"id":"seekersguidance","icon":"🎓","name":"SeekersGuidance.org","description":"Free online Islamic courses and Q&A with verified scholars.","type":"Website & Courses","url":"https://seekersguidance.org","features":["Free courses","Scholarly Q&A","Western Muslim focus","Certification"]},{"id":"islamqa","icon":"❓","name":"IslamQA.info","description":"Thousands of verified Q&As from Sh. Muhammad al-Munajjid.","type":"Q&A Website","url":"https://islamqa.info","features":["Fatwa database","Search by topic","Scholarly review","Multiple languages"]},{"id":"islamweb","icon":"💬","name":"Islamweb.net","description":"Fatwa centre, prayer times, and Islamic resources.","type":"Website","url":"https://islamweb.net","features":["Fatwa centre","Prayer times","Family resources","Youth section"]},{"id":"muslim-pro","icon":"📿","name":"Muslim Pro","description":"Prayer times, Quran, dhikr counter, and qibla direction.","type":"Mobile App","url":"https://muslimpro.com","features":["Prayer times","Qibla compass","Quran audio","Hijri calendar"]},{"id":"athan-app","icon":"🌙","name":"Athan App","description":"Adhan alerts, Quran, and daily Islamic reminders.","type":"Mobile App","url":"https://athan.app","features":["Adhan notifications","Quran recitation","Daily reminders","Prayer tracking"]},{"id":"yaqeen-podcast","icon":"🎙️","name":"Yaqeen Institute Podcast","description":"Research-based Islamic content for Western Muslim youth.","type":"Podcast","url":"https://yaqeeninstitute.org/podcast","features":["Research-based","Youth-focused","Western context","Expert interviews"]}]},"accessibility":{"languageSupport":["en","ar","fr","tr","ur"],"textToSpeech":true,"highContrastMode":true,"keyboardNavigation":true,"screenReaderOptimised":true,"arabicFontSupport":"Amiri, Traditional Arabic, system fallback"},"metadata":{"generatedAt":"2025-04-20T00:00:00Z","generatedBy":"Islamic Connect Content System","contentVersion":"1.0.0","scholarlyReviewStatus":"Verified by trusted sources","lastScholarlyReview":"2025-04-15","nextReviewDue":"2025-10-15","contentLicense":"Educational use with attribution","attribution":"Content compiled from IslamQA.info, Islamweb.net, Sunnah.com, Quran.com, SeekersGuidance.org"}}');

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