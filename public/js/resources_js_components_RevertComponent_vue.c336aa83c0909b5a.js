"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_RevertComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RevertComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RevertComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RevertComponentLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RevertComponentLogic.js */ "./resources/components/vue/RevertComponentLogic.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_RevertComponentLogic_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/LessonHeader.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/LessonHeader.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'LessonHeader',
  props: {
    chapterId: {
      type: [Number, String],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    progressPercentage: {
      type: Number,
      default: 0
    },
    completedChapters: {
      type: Number,
      default: 0
    },
    totalChapters: {
      type: Number,
      default: 0
    },
    maxStepReached: {
      type: Number,
      default: 1
    }
  },
  emits: ['open-help']
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/QuizSection.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/QuizSection.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'QuizSection',
  props: {
    sectionStyle: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: true
    },
    isSectionFontMin: {
      type: Boolean,
      default: false
    },
    isSectionFontMax: {
      type: Boolean,
      default: false
    },
    currentQuestion: {
      type: Object,
      default: null
    },
    chapterQuizPassed: {
      type: Boolean,
      default: false
    },
    quizQuestions: {
      type: Array,
      default: () => []
    },
    currentQuestionIndex: {
      type: Number,
      default: 0
    },
    quizStatus: {
      type: String,
      default: null
    },
    selectedOption: {
      type: String,
      default: null
    },
    quizFeedback: {
      type: String,
      default: ''
    },
    quizProgressLabel: {
      type: String,
      default: ''
    },
    quizStageLabel: {
      type: String,
      default: ''
    },
    motivationalMessage: {
      type: String,
      default: ''
    },
    motivationalHint: {
      type: String,
      default: ''
    },
    currentQuizSectionTitle: {
      type: String,
      default: ''
    },
    quizMomentumPercent: {
      type: Number,
      default: 0
    },
    quizHintExplanation: {
      type: String,
      default: ''
    },
    quizHintSectionId: {
      type: String,
      default: ''
    },
    quizRequiredCorrect: {
      type: Number,
      default: 2
    }
  },
  emits: ['decrease-font', 'increase-font', 'toggle-visibility', 'answer', 'retry', 'jump']
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/ResourcePanel.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/ResourcePanel.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ResourcePanel',
  props: {
    sectionStyle: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: true
    },
    isSectionFontMin: {
      type: Boolean,
      default: false
    },
    isSectionFontMax: {
      type: Boolean,
      default: false
    },
    resourceSectionsWithKeys: {
      type: Array,
      default: () => []
    },
    currentChapterResourcesLayout: {
      type: Object,
      default: null
    },
    globalSearchActive: {
      type: Boolean,
      default: false
    },
    resourceSearchTerm: {
      type: String,
      default: ''
    },
    highlightResourceText: {
      type: Function,
      required: true
    },
    isSectionVisible: {
      type: Function,
      required: true
    },
    toggleSectionVisibility: {
      type: Function,
      required: true
    },
    resourceEntryParts: {
      type: Function,
      required: true
    },
    formatResourceReferenceEntry: {
      type: Function,
      required: true
    },
    formatResourceEntry: {
      type: Function,
      required: true
    },
    copyResourceEntry: {
      type: Function,
      required: true
    }
  },
  emits: ['decrease-font', 'increase-font', 'toggle-visibility'],
  computed: {
    visibleResourceSections() {
      const sections = Array.isArray(this.resourceSectionsWithKeys) ? this.resourceSectionsWithKeys : [];
      if (this.globalSearchActive) return sections;
      return sections.slice(0, 1).map(section => _objectSpread(_objectSpread({}, section), {}, {
        items: (Array.isArray(section.items) ? section.items : []).slice(0, 2).map(item => _objectSpread(_objectSpread({}, item), {}, {
          entries: (Array.isArray(item.entries) ? item.entries : []).slice(0, 3)
        }))
      }));
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/VideoGallery.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/VideoGallery.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'VideoGallery',
  props: {
    sectionStyle: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: true
    },
    isSectionFontMin: {
      type: Boolean,
      default: false
    },
    isSectionFontMax: {
      type: Boolean,
      default: false
    },
    videos: {
      type: Array,
      default: () => []
    },
    isPlayingVideo: {
      type: Function,
      required: true
    },
    isVideoPreviewing: {
      type: Function,
      required: true
    },
    thumbnailStyle: {
      type: Function,
      required: true
    },
    formatVideoUrl: {
      type: Function,
      required: true
    },
    shouldAutoplayVideo: {
      type: Function,
      required: true
    },
    handleVideoCardClick: {
      type: Function,
      required: true
    },
    handleVideoCardTouch: {
      type: Function,
      required: true
    },
    startPreview: {
      type: Function,
      required: true
    },
    stopPreview: {
      type: Function,
      required: true
    },
    videoTags: {
      type: Function,
      required: true
    }
  },
  emits: ['decrease-font', 'increase-font', 'toggle-visibility', 'open-modal']
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_RevertComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_RevertComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/RevertComponent.vue */ "./resources/components/vue/RevertComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RevertComponent.vue?vue&type=template&id=5a42cae2":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RevertComponent.vue?vue&type=template&id=5a42cae2 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  ref: "confettiCanvas",
  class: "confetti-canvas",
  "aria-hidden": "true"
};
const _hoisted_2 = ["aria-label", "aria-expanded"];
const _hoisted_3 = {
  key: 0,
  class: "success-alert-container"
};
const _hoisted_4 = {
  class: "alert alert-success-custom fade show shadow-lg",
  role: "alert"
};
const _hoisted_5 = {
  key: 0,
  class: "copy-alert-container"
};
const _hoisted_6 = {
  key: 1,
  class: "alert alert-danger revert-error-alert d-flex align-items-start gap-2",
  role: "alert",
  "aria-live": "assertive"
};
const _hoisted_7 = {
  class: "flex-grow-1"
};
const _hoisted_8 = {
  class: "small mt-1"
};
const _hoisted_9 = {
  class: "row g-3 revert-study-grid"
};
const _hoisted_10 = {
  class: "col-12 col-lg-3 mobile-nav-frame"
};
const _hoisted_11 = {
  class: "progress-indicator mb-3"
};
const _hoisted_12 = {
  class: "d-flex justify-content-between align-items-center mb-1"
};
const _hoisted_13 = {
  class: "text-muted small"
};
const _hoisted_14 = {
  class: "progress-bar-container"
};
const _hoisted_15 = {
  class: "text-muted small mb-0"
};
const _hoisted_16 = {
  class: "roadmap-header d-flex align-items-center justify-content-between mt-4 mb-2"
};
const _hoisted_17 = {
  class: "text-muted small"
};
const _hoisted_18 = {
  class: "roadmap-pillset"
};
const _hoisted_19 = ["data-locked", "disabled", "aria-disabled", "tabindex", "onClick"];
const _hoisted_20 = {
  class: "dot-wrapper d-flex align-items-center gap-2"
};
const _hoisted_21 = {
  class: "dot-icon-step"
};
const _hoisted_22 = {
  key: 0,
  class: "bi bi-check-lg"
};
const _hoisted_23 = {
  key: 1,
  class: "bi bi-star-fill"
};
const _hoisted_24 = {
  key: 2
};
const _hoisted_25 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_26 = {
  class: "text-muted d-block"
};
const _hoisted_27 = {
  key: 0,
  class: "bi bi-arrow-up-right fs-5 text-teal"
};
const _hoisted_28 = {
  key: 1,
  class: "bi bi-chevron-down fs-5 text-muted"
};
const _hoisted_29 = {
  class: "col-12 col-lg-9 lesson-pane"
};
const _hoisted_30 = {
  class: "mobile-chapter-select d-lg-none"
};
const _hoisted_31 = {
  class: "mobile-chapter-select-pill d-flex align-items-center gap-2"
};
const _hoisted_32 = ["value"];
const _hoisted_33 = ["value", "disabled"];
const _hoisted_34 = {
  class: "study-command-bar",
  "aria-label": "Study sections"
};
const _hoisted_35 = {
  class: "study-command-context"
};
const _hoisted_36 = {
  class: "study-command-kicker"
};
const _hoisted_37 = {
  class: "study-command-links"
};
const _hoisted_38 = {
  class: "card-header d-flex align-items-center justify-content-between gap-3 py-3"
};
const _hoisted_39 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_40 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Focus of this lesson font size"
};
const _hoisted_41 = ["disabled"];
const _hoisted_42 = ["disabled"];
const _hoisted_43 = ["aria-expanded", "aria-label"];
const _hoisted_44 = {
  class: "card-body px-4 py-3"
};
const _hoisted_45 = {
  class: "text-muted medium mb-3"
};
const _hoisted_46 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-3"
};
const _hoisted_47 = {
  class: "d-flex align-items-center gap-3 flex-grow-1 min-width-0"
};
const _hoisted_48 = {
  class: "d-flex flex-column"
};
const _hoisted_49 = {
  key: 0,
  class: "section-header-meta"
};
const _hoisted_50 = {
  class: "section-meta-pill"
};
const _hoisted_51 = {
  class: "section-meta-pill"
};
const _hoisted_52 = {
  class: "overview-actions d-flex align-items-center gap-2 flex-wrap"
};
const _hoisted_53 = {
  class: "lesson-focus-actions"
};
const _hoisted_54 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_55 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_56 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Learning paths font size"
};
const _hoisted_57 = ["disabled"];
const _hoisted_58 = ["disabled"];
const _hoisted_59 = ["aria-expanded", "aria-label"];
const _hoisted_60 = {
  key: 0,
  class: "lesson-overview-summary"
};
const _hoisted_61 = {
  key: 0,
  class: "row g-3"
};
const _hoisted_62 = {
  class: "overview-highlight border rounded-3 p-3 h-100"
};
const _hoisted_63 = {
  class: "fw-semibold mb-2"
};
const _hoisted_64 = {
  class: "mb-0 text-muted small"
};
const _hoisted_65 = {
  key: 1,
  class: "overview-section-list"
};
const _hoisted_66 = ["id"];
const _hoisted_67 = {
  class: "section-header align-items-start gap-3 mb-3"
};
const _hoisted_68 = {
  class: "section-number fs-5"
};
const _hoisted_69 = {
  class: "section-heading-actions flex-grow-1 d-flex align-items-center justify-content-between gap-3 flex-wrap"
};
const _hoisted_70 = {
  class: "fw-semibold mb-0 fs-5 text-truncate"
};
const _hoisted_71 = ["onClick", "aria-expanded", "aria-controls", "aria-label"];
const _hoisted_72 = ["id"];
const _hoisted_73 = ["innerHTML"];
const _hoisted_74 = {
  class: "mt-3 small text-muted"
};
const _hoisted_75 = {
  key: 0,
  class: "mb-1"
};
const _hoisted_76 = {
  class: "text-dark"
};
const _hoisted_77 = {
  key: 1,
  class: "mb-0"
};
const _hoisted_78 = ["href"];
const _hoisted_79 = {
  key: 0,
  class: "section-stats d-flex flex-wrap gap-3 mt-3"
};
const _hoisted_80 = {
  class: "text-muted"
};
const _hoisted_81 = {
  key: 2,
  class: "overview-section-list"
};
const _hoisted_82 = ["id"];
const _hoisted_83 = {
  class: "section-header align-items-start gap-3 mb-3"
};
const _hoisted_84 = {
  class: "section-number fs-5"
};
const _hoisted_85 = {
  class: "section-heading-actions flex-grow-1 d-flex align-items-center justify-content-between gap-3 flex-wrap"
};
const _hoisted_86 = {
  class: "fw-semibold mb-0 fs-5 text-truncate"
};
const _hoisted_87 = ["onClick", "aria-expanded", "aria-controls", "aria-label"];
const _hoisted_88 = ["id"];
const _hoisted_89 = ["innerHTML"];
const _hoisted_90 = {
  class: "mt-3 medium text-muted"
};
const _hoisted_91 = {
  key: 0,
  class: "mb-1"
};
const _hoisted_92 = {
  class: "text-dark"
};
const _hoisted_93 = {
  key: 1,
  class: "mb-0"
};
const _hoisted_94 = ["href"];
const _hoisted_95 = {
  key: 0,
  class: "background mt-4 w-100 py-3 px-4 rounded-4 border"
};
const _hoisted_96 = {
  class: "deep-dive-header d-flex align-items-center mb-2"
};
const _hoisted_97 = {
  class: "fw-bold mb-0 text-dark fs-6"
};
const _hoisted_98 = ["innerHTML"];
const _hoisted_99 = {
  key: 1,
  class: "section-stats d-flex flex-wrap gap-3 mt-3"
};
const _hoisted_100 = {
  class: "text-muted"
};
const _hoisted_101 = {
  class: "guided-pathway-header p-3"
};
const _hoisted_102 = {
  class: "guided-pathway-header-top d-flex align-items-start justify-content-between flex-wrap gap-3"
};
const _hoisted_103 = {
  class: "section-font-controls guided-pathway-controls",
  role: "group",
  "aria-label": "Guided pathway font size"
};
const _hoisted_104 = ["disabled"];
const _hoisted_105 = ["disabled"];
const _hoisted_106 = ["aria-expanded", "aria-label"];
const _hoisted_107 = {
  id: "pathway-clips-section",
  class: "animated-fade-slide mb-4 rounded-4"
};
const _hoisted_108 = {
  class: "card-body px-3"
};
const _hoisted_109 = {
  class: "row g-3"
};
const _hoisted_110 = ["onMouseenter", "onClick"];
const _hoisted_111 = {
  key: 0,
  class: "clip-thumbnail ratio ratio-16x9"
};
const _hoisted_112 = ["src", "title"];
const _hoisted_113 = {
  class: "p-3"
};
const _hoisted_114 = {
  class: "h6 fw-semibold mb-1"
};
const _hoisted_115 = {
  class: "text-muted small mb-2"
};
const _hoisted_116 = {
  key: 0,
  class: "video-card-tags mb-2"
};
const _hoisted_117 = {
  key: 1,
  class: "clip-duration text-muted small mb-0"
};
const _hoisted_118 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-3 px-3 px-md-3"
};
const _hoisted_119 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_120 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Share with a friend font size"
};
const _hoisted_121 = ["disabled"];
const _hoisted_122 = ["disabled"];
const _hoisted_123 = ["aria-expanded", "aria-label"];
const _hoisted_124 = {
  class: "card-body px-3 px-md-3 py-3"
};
const _hoisted_125 = {
  class: "d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3"
};
const _hoisted_126 = {
  class: "flex-grow-1"
};
const _hoisted_127 = {
  key: 0,
  class: "text-success small mt-2 mb-0",
  "aria-live": "polite",
  role: "status"
};
const _hoisted_128 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_129 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-3 px-3 px-md-3"
};
const _hoisted_130 = {
  class: "d-flex align-items-center gap-3 flex-grow-1 min-width-0"
};
const _hoisted_131 = {
  class: "d-flex flex-column"
};
const _hoisted_132 = {
  key: 0,
  class: "section-header-meta"
};
const _hoisted_133 = {
  class: "section-meta-pill"
};
const _hoisted_134 = {
  class: "section-meta-pill"
};
const _hoisted_135 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_136 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Dos and donts font size"
};
const _hoisted_137 = ["disabled"];
const _hoisted_138 = ["disabled"];
const _hoisted_139 = ["aria-expanded", "aria-label"];
const _hoisted_140 = {
  class: "card-body px-3 px-md-3 py-3"
};
const _hoisted_141 = {
  class: "mb-3"
};
const _hoisted_142 = {
  class: "text-muted small mb-3"
};
const _hoisted_143 = {
  class: "row g-3"
};
const _hoisted_144 = {
  class: "col-12 col-md-6"
};
const _hoisted_145 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_146 = {
  class: "list-unstyled mb-0"
};
const _hoisted_147 = ["innerHTML"];
const _hoisted_148 = {
  class: "col-12 col-md-6"
};
const _hoisted_149 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_150 = {
  class: "list-unstyled mb-0"
};
const _hoisted_151 = ["innerHTML"];
const _hoisted_152 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap mt-3 py-3"
};
const _hoisted_153 = {
  class: "d-flex align-items-center gap-3 flex-grow-1 min-width-0"
};
const _hoisted_154 = {
  class: "flex-grow-1"
};
const _hoisted_155 = {
  key: 0,
  class: "section-header-meta"
};
const _hoisted_156 = {
  class: "section-meta-pill"
};
const _hoisted_157 = {
  class: "section-meta-pill"
};
const _hoisted_158 = {
  class: "lesson-focus-actions"
};
const _hoisted_159 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_160 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_161 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Duas font size"
};
const _hoisted_162 = ["disabled"];
const _hoisted_163 = ["disabled"];
const _hoisted_164 = ["aria-expanded", "aria-label"];
const _hoisted_165 = {
  class: "row g-3"
};
const _hoisted_166 = {
  class: "dua-card h-100 rounded-4 p-4 shadow-lg"
};
const _hoisted_167 = ["innerHTML"];
const _hoisted_168 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3 flex-wrap"
};
const _hoisted_169 = {
  class: "d-flex align-items-center gap-3 flex-grow-1"
};
const _hoisted_170 = {
  class: "d-flex flex-column"
};
const _hoisted_171 = {
  key: 0,
  class: "section-header-meta"
};
const _hoisted_172 = {
  class: "section-meta-pill"
};
const _hoisted_173 = {
  class: "section-meta-pill"
};
const _hoisted_174 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_175 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Key insights font size"
};
const _hoisted_176 = ["disabled"];
const _hoisted_177 = ["disabled"];
const _hoisted_178 = ["aria-expanded", "aria-label"];
const _hoisted_179 = {
  class: "card-body px-3 px-md-4 py-4"
};
const _hoisted_180 = {
  class: "insight-grid-wrapper"
};
const _hoisted_181 = {
  class: "insight-grid"
};
const _hoisted_182 = {
  class: "insight-card-header"
};
const _hoisted_183 = {
  class: "insight-number"
};
const _hoisted_184 = ["innerHTML"];
const _hoisted_185 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap mt-3 py-3"
};
const _hoisted_186 = {
  class: "lesson-focus-actions"
};
const _hoisted_187 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_188 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_189 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Share and uplift font size"
};
const _hoisted_190 = ["disabled"];
const _hoisted_191 = ["disabled"];
const _hoisted_192 = ["aria-expanded", "aria-label"];
const _hoisted_193 = {
  class: "row align-items-center gy-3"
};
const _hoisted_194 = {
  class: "col-md-6"
};
const _hoisted_195 = {
  class: "share-actions d-flex flex-wrap align-items-center"
};
const _hoisted_196 = {
  key: 0,
  class: "text-success small mt-2 mb-0 mt-sm-0"
};
const _hoisted_197 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-2 position-relative"
};
const _hoisted_198 = {
  class: "d-flex align-items-center gap-3 flex-grow-1 min-width-0"
};
const _hoisted_199 = {
  class: "card-header-icon",
  "aria-hidden": "true"
};
const _hoisted_200 = {
  class: "fw-bold mb-1"
};
const _hoisted_201 = {
  class: "text-muted small mb-0"
};
const _hoisted_202 = {
  class: "section-font-controls ms-auto",
  role: "group",
  "aria-label": "Chapter tool font size"
};
const _hoisted_203 = ["disabled"];
const _hoisted_204 = ["disabled"];
const _hoisted_205 = ["aria-label"];
const _hoisted_206 = {
  class: "card-body px-2 px-md-3 py-3"
};
const _hoisted_207 = {
  class: "chapter-tool-scroll"
};
const _hoisted_208 = {
  class: "chapter-tool-zoom"
};
const _hoisted_209 = {
  key: 1,
  class: "chapter-tool-fallback text-center"
};
const _hoisted_210 = {
  class: "text-center text-muted py-5"
};
const _hoisted_211 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-3"
};
const _hoisted_212 = {
  class: "d-flex align-items-start gap-3 flex-grow-1 min-width-0"
};
const _hoisted_213 = {
  key: 0,
  class: "section-header-meta"
};
const _hoisted_214 = {
  class: "section-meta-pill"
};
const _hoisted_215 = {
  class: "section-meta-pill"
};
const _hoisted_216 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_217 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Common questions font size"
};
const _hoisted_218 = ["disabled"];
const _hoisted_219 = ["disabled"];
const _hoisted_220 = ["aria-expanded", "aria-label"];
const _hoisted_221 = {
  class: "common-questions-body"
};
const _hoisted_222 = {
  class: "accordion-stack"
};
const _hoisted_223 = ["onClick"];
const _hoisted_224 = {
  class: "accordion-answer mt-2"
};
const _hoisted_225 = ["innerHTML"];
const _hoisted_226 = {
  key: 0,
  class: "text-center mt-3"
};
const _hoisted_227 = {
  class: "card-header d-flex align-items-center justify-content-between gap-3 py-3"
};
const _hoisted_228 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_229 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Motivation font size"
};
const _hoisted_230 = ["disabled"];
const _hoisted_231 = ["disabled"];
const _hoisted_232 = ["aria-expanded", "aria-label"];
const _hoisted_233 = {
  class: "px-3 px-md-4 py-4"
};
const _hoisted_234 = {
  class: "d-flex flex-column gap-2"
};
const _hoisted_235 = {
  class: "text-muted medium mb-0"
};
const _hoisted_236 = {
  class: "text-teal fs-6"
};
const _hoisted_237 = {
  class: "actions-card"
};
const _hoisted_238 = {
  class: "p-4 p-md-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between gap-3"
};
const _hoisted_239 = ["disabled"];
const _hoisted_240 = {
  class: "d-flex flex-column flex-md-row align-items-center gap-2"
};
const _hoisted_241 = {
  class: "text-muted small me-md-auto"
};
const _hoisted_242 = {
  key: 0,
  class: "text-teal small fw-semibold"
};
const _hoisted_243 = ["disabled"];
const _hoisted_244 = {
  key: 0
};
const _hoisted_245 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_246 = {
  class: "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_247 = {
  ref: "searchInfoModalContent",
  class: "modal-content rounded-4 shadow-lg custom-modal-card search-info-modal"
};
const _hoisted_248 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_249 = {
  class: "modal-footer border-top px-4 py-3"
};
const _hoisted_250 = {
  key: 1
};
const _hoisted_251 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_252 = {
  class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_253 = {
  ref: "resourceModalContent",
  class: "modal-content rounded-4 shadow-lg custom-modal-card"
};
const _hoisted_254 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_255 = {
  class: "modal-title fw-bold"
};
const _hoisted_256 = {
  class: "modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3"
};
const _hoisted_257 = {
  key: 0,
  class: "text-success small"
};
const _hoisted_258 = {
  class: "d-flex gap-2"
};
const _hoisted_259 = {
  key: 2
};
const _hoisted_260 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_261 = {
  class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_262 = {
  ref: "videoModalContent",
  class: "modal-content rounded-4 shadow-lg custom-modal-card"
};
const _hoisted_263 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_264 = ["aria-pressed", "aria-label"];
const _hoisted_265 = {
  class: "d-none d-sm-inline"
};
const _hoisted_266 = {
  class: "modal-body px-4 py-3"
};
const _hoisted_267 = {
  key: 0,
  class: "mb-3 video-modal-filters"
};
const _hoisted_268 = {
  class: "filter-grid"
};
const _hoisted_269 = {
  class: "filter-column"
};
const _hoisted_270 = {
  class: "filter-column"
};
const _hoisted_271 = ["value"];
const _hoisted_272 = {
  class: "filter-column"
};
const _hoisted_273 = ["value"];
const _hoisted_274 = {
  class: "filter-column"
};
const _hoisted_275 = ["value"];
const _hoisted_276 = {
  key: 0,
  class: "filter-empty text-muted small mt-2 mb-0"
};
const _hoisted_277 = {
  class: "row g-3 video-grid-row modal-video-grid"
};
const _hoisted_278 = ["onMouseenter", "onClick", "onTouchstart"];
const _hoisted_279 = {
  class: "video-card-media"
};
const _hoisted_280 = ["src", "title"];
const _hoisted_281 = {
  class: "video-feature-overlay"
};
const _hoisted_282 = {
  class: "video-feature-text"
};
const _hoisted_283 = {
  class: "video-feature-title"
};
const _hoisted_284 = {
  key: 0,
  class: "video-feature-subtitle"
};
const _hoisted_285 = {
  key: 1,
  class: "video-feature-duration"
};
const _hoisted_286 = {
  class: "video-card-caption px-3 py-2"
};
const _hoisted_287 = {
  key: 0,
  class: "video-card-tags mb-0"
};
const _hoisted_288 = {
  class: "modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3"
};
const _hoisted_289 = {
  class: "d-flex gap-2 ms-auto"
};
const _hoisted_290 = {
  key: 3
};
const _hoisted_291 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_292 = {
  class: "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_293 = {
  ref: "helpModalContent",
  class: "modal-content rounded-4 shadow-lg custom-modal-card"
};
const _hoisted_294 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_295 = {
  class: "modal-body px-4 pb-4"
};
const _hoisted_296 = {
  class: "guide-step-index"
};
const _hoisted_297 = {
  class: "fw-semibold mb-1"
};
const _hoisted_298 = {
  class: "text-muted mb-0"
};
const _hoisted_299 = {
  class: "modal-footer border-0 px-4 pb-4 pt-2"
};
const _hoisted_300 = {
  key: 4
};
const _hoisted_301 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_302 = {
  class: "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_303 = {
  ref: "completionModalContent",
  class: "modal-content rounded-4 shadow-lg custom-modal-card completion-modal-card"
};
const _hoisted_304 = {
  class: "modal-header completion-modal-header px-4 pt-4 pb-3"
};
const _hoisted_305 = {
  class: "modal-body completion-modal-body px-4 pb-4 pt-0"
};
const _hoisted_306 = {
  class: "completion-options"
};
const _hoisted_307 = {
  class: "completion-option"
};
const _hoisted_308 = ["href"];
const _hoisted_309 = {
  class: "completion-option"
};
const _hoisted_310 = ["href"];
const _hoisted_311 = {
  class: "completion-option"
};
const _hoisted_312 = ["href"];
const _hoisted_313 = {
  class: "completion-option"
};
const _hoisted_314 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson4, _ctx$currentLesson5, _ctx$currentLessonOve, _ctx$activeResource;
  const _component_LessonHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("LessonHeader");
  const _component_VideoGallery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("VideoGallery");
  const _component_ResourcePanel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ResourcePanel");
  const _component_QuizSection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("QuizSection");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["revert-shell position-relative", {
      'reduce-motion': _ctx.reduceMotionEnabled,
      'mobile-nav-open': _ctx.mobileNavOpen
    }])
  }, [_cache[183] || (_cache[183] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "skip-link",
    href: "#revert-main-content"
  }, "Skip to main content", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_1, null, 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Background Layers "), _cache[184] || (_cache[184] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[185] || (_cache[185] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "background-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Nav Toggle (only visible in small screens) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    ref: "mobileNavToggle",
    class: "mobile-nav-toggle d-lg-none btn btn-light shadow-sm rounded-circle p-3 position-fixed top-3 start-3 z-3",
    "aria-label": _ctx.mobileNavOpen ? 'Close chapter navigation' : 'Open chapter navigation',
    "aria-expanded": _ctx.mobileNavOpen ? 'true' : 'false',
    "aria-controls": "revert-navigation",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.mobileNavOpen ? 'bi-x-lg' : 'bi-list'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_2), _ctx.mobileNavOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "mobile-nav-backdrop",
    role: "presentation",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Alert "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showSuccessAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill me-2"
  }, null, -1 /* CACHED */)), _cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Congratulations!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.successMessage), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showCopyAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['alert', _ctx.alertClass, 'alert-outline', 'alert-copy-notification']),
    role: "status",
    "aria-live": "polite"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['me-2', _ctx.iconClass])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.copyAlertMessage), 1 /* TEXT */)], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), _ctx.uiErrorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [_cache[92] || (_cache[92] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-exclamation-triangle-fill mt-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Something went wrong.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.uiErrorMessage), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Dismiss error",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.uiErrorMessage = '')
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", {
    id: "revert-main-content",
    tabindex: "-1",
    class: "container-fluid revert-content px-3 px-md-4 py-4 py-md-5",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.globalFontScale}rem`
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SIDEBAR (chapter progress + roadmap navigation) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["navigation-card p-3 shadow-sm rounded-4", {
      'mobile-open': _ctx.mobileNavOpen
    }]),
    id: "revert-navigation",
    role: "navigation",
    "aria-label": "Chapter navigation"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Progress Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[93] || (_cache[93] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-bold small"
  }, "Course Progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.completedChapters) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.totalChapters), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progressPercentage + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round(_ctx.progressPercentage)) + "% Complete ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[94] || (_cache[94] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-semibold small"
  }, "Navigate the chapters", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.completedChapters) + " done", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation List "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.roadmapData, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: step.id,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["roadmap-pill d-flex align-items-center justify-content-between", {
        active: _ctx.selectedPill === step.id,
        completed: step.id < _ctx.maxStepReached,
        locked: step.id > _ctx.maxStepReached
      }]),
      "data-locked": step.id > _ctx.maxStepReached,
      disabled: step.id > _ctx.maxStepReached,
      "aria-disabled": step.id > _ctx.maxStepReached,
      tabindex: step.id > _ctx.maxStepReached ? -1 : 0,
      onClick: $event => _ctx.handleRoadmapPillClick(step, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, [step.id < _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_22)) : step.id === _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_23)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.id), 1 /* TEXT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["status-chip mt-1", {
        completed: step.id < _ctx.maxStepReached,
        current: step.id === _ctx.maxStepReached,
        locked: step.id > _ctx.maxStepReached
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.stepStatusLabel(step)), 3 /* TEXT, CLASS */)])]), step.id === _ctx.selectedPill ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_27)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_28))], 10 /* CLASS, PROPS */, _hoisted_19);
  }), 128 /* KEYED_FRAGMENT */))])], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT AREA (lesson overview + resources) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[96] || (_cache[96] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label small text-muted fw-semibold",
    for: "mobile-chapter-picker"
  }, " Choose a chapter ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-compass-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "mobile-chapter-picker",
    class: "form-select",
    value: _ctx.selectedPill,
    "aria-label": "Select chapter",
    onChange: _cache[3] || (_cache[3] = $event => _ctx.selectPill($event.target.value))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.roadmapData, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: step.id,
      value: step.id,
      disabled: step.id > _ctx.maxStepReached
    }, " Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.id) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.stepStatusLabel(step)) + ") ", 9 /* TEXT, PROPS */, _hoisted_33);
  }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_32)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_LessonHeader, {
    "chapter-id": (_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId,
    title: (_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title,
    summary: (_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.summary,
    "progress-percentage": _ctx.progressPercentage,
    "completed-chapters": _ctx.completedChapters,
    "total-chapters": _ctx.totalChapters,
    "max-step-reached": _ctx.maxStepReached,
    onOpenHelp: _ctx.openHelpModal
  }, null, 8 /* PROPS */, ["chapter-id", "title", "summary", "progress-percentage", "completed-chapters", "total-chapters", "max-step-reached", "onOpenHelp"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPill), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.title) || 'Revert Journey'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "study-command-link",
    onClick: _cache[4] || (_cache[4] = $event => _ctx.jumpToContentSection('lesson-focus-section'))
  }, [...(_cache[97] || (_cache[97] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-brightness-high-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Focus", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "study-command-link",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.jumpToContentSection('learning-paths-section'))
  }, [...(_cache[98] || (_cache[98] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Learn", -1 /* CACHED */)]))]), _ctx.currentDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "study-command-link",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.jumpToContentSection('duas-section'))
  }, [...(_cache[99] || (_cache[99] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Duas", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "study-command-link",
    onClick: _cache[7] || (_cache[7] = $event => _ctx.jumpToContentSection('revert-stories-section'))
  }, [...(_cache[100] || (_cache[100] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Stories", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "study-command-link study-command-link--primary",
    onClick: _cache[8] || (_cache[8] = $event => _ctx.jumpToContentSection('chapter-quiz-section'))
  }, [...(_cache[101] || (_cache[101] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-check",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Quiz", -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Focus of the lesson "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "lesson-focus-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg quiz-card section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('lessonFocus'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-center gap-3\"><span class=\"card-header-icon\"><i class=\"bi bi-brightness-high-fill\"></i></span><div><h3 class=\"fw-bold mb-0\">Focus of This Lesson</h3><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> The chapter’s main idea.</span><span><strong>Purpose:</strong> Give you a soft starting point.</span><span><strong>Aim:</strong> Know what to focus on first.</span><span><strong>Result:</strong> You read with calm direction.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('lessonFocus'),
    onClick: _cache[9] || (_cache[9] = $event => _ctx.decreaseSectionFont('lessonFocus')),
    "aria-label": "Decrease focus section font size"
  }, " A- ", 8 /* PROPS */, _hoisted_41), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('lessonFocus'),
    onClick: _cache[10] || (_cache[10] = $event => _ctx.increaseSectionFont('lessonFocus')),
    "aria-label": "Increase focus section font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[11] || (_cache[11] = $event => _ctx.toggleCardVisibility('lessonFocus')),
    "aria-expanded": _ctx.isCardVisible('lessonFocus'),
    "aria-label": _ctx.isCardVisible('lessonFocus') ? 'Collapse focus summary' : 'Expand focus summary'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('lessonFocus') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_43)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentToneFocusText || ((_ctx$currentLesson5 = _ctx.currentLesson) === null || _ctx$currentLesson5 === void 0 ? void 0 : _ctx$currentLesson5.summary) || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.'), 1 /* TEXT */)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('lessonFocus')]])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" main content (learning overview, highlights, sections) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "learning-paths-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([_ctx.sectionFontStyle('learningPaths'), {
      animationDelay: '0.05s'
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "card-header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-seam-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-0"
  }, "Learning Paths", -1 /* CACHED */)), _cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-explainer section-explainer--compact"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "What:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" The full chapter broken into steps.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Purpose:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Make the topic easier to absorb.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Aim:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Move from basics to confidence.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Result:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" You leave with practical understanding.")])], -1 /* CACHED */)), _ctx.learningPathsMeta.wordCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.learningPathsMeta.wordCount) + " words", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.learningPathsMeta.readTime) + " min read", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[12] || (_cache[12] = (...args) => _ctx.shareLessonOverview && _ctx.shareLessonOverview(...args))
  }, [...(_cache[106] || (_cache[106] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[13] || (_cache[13] = (...args) => _ctx.copyLessonOverview && _ctx.copyLessonOverview(...args))
  }, [...(_cache[107] || (_cache[107] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[14] || (_cache[14] = (...args) => _ctx.printLessonOverview && _ctx.printLessonOverview(...args))
  }, [...(_cache[108] || (_cache[108] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.lessonShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.lessonShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('learningPaths'),
    onClick: _cache[15] || (_cache[15] = $event => _ctx.decreaseSectionFont('learningPaths')),
    "aria-label": "Decrease learning paths font size"
  }, " A- ", 8 /* PROPS */, _hoisted_57), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('learningPaths'),
    onClick: _cache[16] || (_cache[16] = $event => _ctx.increaseSectionFont('learningPaths')),
    "aria-label": "Increase learning paths font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_58), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[17] || (_cache[17] = $event => _ctx.toggleCardVisibility('learningOverview')),
    "aria-expanded": _ctx.isCardVisible('learningOverview'),
    "aria-label": _ctx.isCardVisible('learningOverview') ? 'Collapse learning overview' : 'Expand learning overview'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('learningOverview') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_59)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" lesson overview "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.overviewFontScale}em`,
      lineHeight: 1.6
    })
  }, [_ctx.currentLessonOverview ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [(_ctx$currentLessonOve = _ctx.currentLessonOverview.highlights) !== null && _ctx$currentLessonOve !== void 0 && _ctx$currentLessonOve.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_61, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentLessonOverview.highlights, highlight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: highlight.label || highlight.heading,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.label || highlight.heading), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.description || highlight.content), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.overviewSectionsWithKeys.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.overviewSectionsWithKeys, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.toggleKey,
      id: `section-${_ctx.selectedPill}-${index}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["section-block mb-5", {
        'section-collapsed': !_ctx.isSectionVisible(section.toggleKey)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_70, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.heading), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["section-toggle-btn", {
        collapsed: !_ctx.isSectionVisible(section.toggleKey)
      }]),
      onClick: $event => _ctx.toggleSectionVisibility(section.toggleKey),
      "aria-expanded": _ctx.isSectionVisible(section.toggleKey),
      "aria-controls": `section-content-${section.toggleKey}`,
      "aria-label": _ctx.isSectionVisible(section.toggleKey) ? 'Collapse section' : 'Expand section'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isSectionVisible(section.toggleKey) ? 'bi-dash-lg' : 'bi-plus-lg'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_71)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "section-collapse",
      appear: ""
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.isSectionVisible(section.toggleKey) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        id: `section-content-${section.toggleKey}`,
        class: "section-content-wrapper"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "section-content text-dark fs-6 lh-lg",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          fontSize: `${_ctx.overviewFontScale}em`
        }),
        innerHTML: _ctx.formatOverviewContent(section.content)
      }, null, 12 /* STYLE, PROPS */, _hoisted_73), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [section.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_75, [_cache[109] || (_cache[109] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
        class: "me-2"
      }, "Reference:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_76, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.references), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), section.resources ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_77, [_cache[110] || (_cache[110] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
        class: "me-2"
      }, "Resource:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        href: section.resources,
        target: "_blank",
        rel: "noreferrer",
        class: "text-teal"
      }, "View source", 8 /* PROPS */, _hoisted_78)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.sectionStatsFor(section.heading).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_79, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sectionStatsFor(section.heading), stat => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: stat.label,
          class: "section-stat-card"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_80, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[111] || (_cache[111] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "pt-3 mt-3"
      }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_72)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)], 10 /* CLASS, PROPS */, _hoisted_66);
  }), 128 /* KEYED_FRAGMENT */))])) : _ctx.lessonSectionsWithKeys.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_81, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonSectionsWithKeys, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.toggleKey,
      id: `section-${_ctx.selectedPill}-${index}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["section-block mb-5", {
        'section-collapsed': !_ctx.isSectionVisible(section.toggleKey)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_86, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["section-toggle-btn", {
        collapsed: !_ctx.isSectionVisible(section.toggleKey)
      }]),
      onClick: $event => _ctx.toggleSectionVisibility(section.toggleKey),
      "aria-expanded": _ctx.isSectionVisible(section.toggleKey),
      "aria-controls": `section-content-${section.toggleKey}`,
      "aria-label": _ctx.isSectionVisible(section.toggleKey) ? 'Collapse section' : 'Expand section'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isSectionVisible(section.toggleKey) ? 'bi-dash-lg' : 'bi-plus-lg'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_87)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "section-collapse",
      appear: ""
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.isSectionVisible(section.toggleKey) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        id: `section-content-${section.toggleKey}`,
        class: "section-content-wrapper"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "section-content text-dark fs-6 lh-lg",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          fontSize: `${_ctx.overviewFontScale}em`
        }),
        innerHTML: _ctx.formatOverviewContent(section.content)
      }, null, 12 /* STYLE, PROPS */, _hoisted_89), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [section.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_91, [_cache[112] || (_cache[112] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
        class: "me-2"
      }, "Reference:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.references), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), section.resources ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_93, [_cache[113] || (_cache[113] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
        class: "me-2"
      }, "Resource:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        href: section.resources,
        target: "_blank",
        rel: "noreferrer",
        class: "text-teal"
      }, "View source", 8 /* PROPS */, _hoisted_94)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [_cache[114] || (_cache[114] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-lightbulb-fill me-2 fs-4 text-teal"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "deep-dive-content text-dark fs-6",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          fontSize: `${_ctx.overviewFontScale * 0.95}em`
        }),
        innerHTML: section.deepDive.content
      }, null, 12 /* STYLE, PROPS */, _hoisted_98)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.sectionStatsFor(section.title).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_99, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sectionStatsFor(section.title), stat => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: stat.label,
          class: "section-stat-card"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[115] || (_cache[115] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "pt-3 mt-3"
      }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_88)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)], 10 /* CLASS, PROPS */, _hoisted_82);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('learningOverview')]])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Guided pathway clips and action cards "), _ctx.pathwayClips.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    id: "guided-pathway-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('guidedPathway'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [_cache[116] || (_cache[116] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-start gap-3 flex-grow-1 min-width-0\"><span class=\"card-header-icon\"><i class=\"bi bi-controller\"></i></span><div class=\"guided-pathway-heading-text flex-grow-1 min-width-0\"><p class=\"text-teal small mb-1 fw-bold\">Guided Pathway</p><h3 class=\"mb-0 fs-4 fw-bold\">Short clips to carry the lesson forward</h3><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> Carefully selected video support.</span><span><strong>Purpose:</strong> Add warmth and real examples.</span><span><strong>Aim:</strong> Reinforce the chapter visually.</span><span><strong>Result:</strong> The lesson feels easier to remember.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('guidedPathway'),
    onClick: _cache[18] || (_cache[18] = $event => _ctx.decreaseSectionFont('guidedPathway')),
    "aria-label": "Decrease guided pathway font size"
  }, " A- ", 8 /* PROPS */, _hoisted_104), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('guidedPathway'),
    onClick: _cache[19] || (_cache[19] = $event => _ctx.increaseSectionFont('guidedPathway')),
    "aria-label": "Increase guided pathway font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_105), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn ms-auto",
    onClick: _cache[20] || (_cache[20] = $event => _ctx.toggleCardVisibility('pathwayClips')),
    "aria-expanded": _ctx.isCardVisible('pathwayClips'),
    "aria-label": _ctx.isCardVisible('pathwayClips') ? 'Collapse pathway clips' : 'Expand pathway clips'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('pathwayClips') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_106)])]), _cache[117] || (_cache[117] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0 w-100 guided-pathway-desc"
  }, " Pair a quick clip with your streak to keep the learning playful. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [_cache[119] || (_cache[119] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-header d-flex align-items-center gap-3\"><span class=\"card-header-icon\"><i class=\"bi bi-film\"></i></span><div><h2 class=\"fw-bold mb-0 fs-5\">Pathway Clips</h2><p class=\"text-muted small mb-0\">Short visual cues to keep each insight gripping.</p><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> Quick clips for this chapter.</span><span><strong>Purpose:</strong> Keep learning light.</span><span><strong>Aim:</strong> Review without overwhelm.</span><span><strong>Result:</strong> Key points stick faster.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.pathwayClips, clip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: clip.title,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      class: "clip-card h-100 rounded-4 border shadow-sm",
      onMouseenter: $event => _ctx.startPreview(clip),
      onMouseleave: _cache[21] || (_cache[21] = (...args) => _ctx.stopPreview && _ctx.stopPreview(...args)),
      onClick: $event => _ctx.playClip(clip)
    }, [_ctx.isClipPlaying(clip) || _ctx.isClipPreviewing(clip) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: _ctx.formatVideoUrl(clip.url, _ctx.shouldAutoplayVideo(), _ctx.isClipPreviewing(clip)),
      title: clip.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_112)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "clip-thumbnail ratio ratio-16x9",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.thumbnailStyle(clip))
    }, [...(_cache[118] || (_cache[118] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "clip-overlay d-flex align-items-end justify-content-start p-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "clip-label badge bg-white text-dark"
    }, "Clip")], -1 /* CACHED */)]))], 4 /* STYLE */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(clip.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(clip.description || 'Visual recap of today’s insight.'), 1 /* TEXT */), _ctx.videoTags(clip, 'Pathway Clip').length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_116, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.videoTags(clip, 'Pathway Clip'), tag => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: tag,
        class: "video-tag-badge"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), clip.duration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_117, "Duration: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(clip.duration), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 40 /* PROPS, NEED_HYDRATION */, _hoisted_110)]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('pathwayClips')]])])], 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Share with a friend "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "share-friend-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-share-friend",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('shareFriend'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [_cache[120] || (_cache[120] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-start gap-3 flex-grow-1 min-width-0\"><span class=\"card-header-icon\"><i class=\"bi bi-share-fill\"></i></span><div><h3 class=\"fw-bold mb-1\">Share With a Friend or Family Member</h3><p class=\"text-muted mb-0 medium\"> Share this lesson’s insights, dua reminders, and revert-story clips so a friend can walk through the same content. </p><div class=\"section-explainer\"><span><strong>What:</strong> A gentle way to pass the lesson on.</span><span><strong>Purpose:</strong> Turn learning into benefit for others.</span><span><strong>Aim:</strong> Make sharing simple and respectful.</span><span><strong>Result:</strong> Someone else can begin from the same place.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_120, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('shareFriend'),
    onClick: _cache[22] || (_cache[22] = $event => _ctx.decreaseSectionFont('shareFriend')),
    "aria-label": "Decrease share with a friend font size"
  }, " A- ", 8 /* PROPS */, _hoisted_121), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('shareFriend'),
    onClick: _cache[23] || (_cache[23] = $event => _ctx.increaseSectionFont('shareFriend')),
    "aria-label": "Increase share with a friend font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_122), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[24] || (_cache[24] = $event => _ctx.toggleCardVisibility('shareFriend')),
    "aria-expanded": _ctx.isCardVisible('shareFriend'),
    "aria-label": _ctx.isCardVisible('shareFriend') ? 'Collapse sharing' : 'Expand sharing'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('shareFriend') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_123)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_124, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_125, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_126, [_ctx.shareFriendStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_127, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.shareFriendStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[121] || (_cache[121] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden",
    "aria-hidden": "false"
  }, " Feel free to share every insight, dua, and revert story on this page. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-teal fw-semibold",
    onClick: _cache[25] || (_cache[25] = (...args) => _ctx.copyShareLink && _ctx.copyShareLink(...args))
  }, [...(_cache[122] || (_cache[122] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard mr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy link ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal fw-semibold",
    onClick: _cache[26] || (_cache[26] = $event => _ctx.openWhatsappShare(_ctx.getShareLink()))
  }, [...(_cache[123] || (_cache[123] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp mr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share with WhatsApp ", -1 /* CACHED */)]))])])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('shareFriend')]])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" do's and don't "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "dos-donts-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('dosDonts'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [_cache[125] || (_cache[125] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "card-header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-shield-fill-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_131, [_cache[124] || (_cache[124] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-0"
  }, "Do's and Don'ts", -1 /* CACHED */)), _ctx.dosDontsMeta.wordCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_132, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_133, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.dosDontsMeta.wordCount) + " words", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_134, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.dosDontsMeta.readTime) + " min read", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_135, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_136, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('dosDonts'),
    onClick: _cache[27] || (_cache[27] = $event => _ctx.decreaseSectionFont('dosDonts')),
    "aria-label": "Decrease dos and donts font size"
  }, " A- ", 8 /* PROPS */, _hoisted_137), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('dosDonts'),
    onClick: _cache[28] || (_cache[28] = $event => _ctx.increaseSectionFont('dosDonts')),
    "aria-label": "Increase dos and donts font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_138), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[29] || (_cache[29] = $event => _ctx.toggleCardVisibility('dosDonts')),
    "aria-expanded": _ctx.isCardVisible('dosDonts'),
    "aria-label": _ctx.isCardVisible('dosDonts') ? 'Collapse Doʼs and Donʼts' : 'Expand Doʼs and Donʼts'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('dosDonts') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_139)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_140, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_141, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_142, "Guidance for " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentDosDonts.chapter), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_143, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_144, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_145, [_cache[127] || (_cache[127] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-dark mb-3"
  }, "Do's", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_146, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDosDonts.dos, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id,
      class: "d-flex align-items-center gap-2 mb-2"
    }, [_cache[126] || (_cache[126] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-dark medium mt-1",
      innerHTML: _ctx.formatReferenceText(item.text)
    }, null, 8 /* PROPS */, _hoisted_147)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_148, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_149, [_cache[129] || (_cache[129] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-dark mb-3"
  }, "Don'ts", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_150, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDosDonts.donts, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id,
      class: "d-flex align-items-center gap-2 mb-2"
    }, [_cache[128] || (_cache[128] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-circle-fill fs-5 text-muted"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-dark medium mt-1",
      innerHTML: _ctx.formatReferenceText(item.text)
    }, null, 8 /* PROPS */, _hoisted_151)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('dosDonts')]])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" dua to carry "), _ctx.currentDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    id: "duas-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('duas'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [_cache[131] || (_cache[131] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "card-header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_154, [_cache[130] || (_cache[130] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-1"
  }, "Duas to Carry", -1 /* CACHED */)), _ctx.duasMeta.wordCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_155, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_156, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.duasMeta.wordCount) + " words", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_157, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.duasMeta.readTime) + " min read", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_158, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[30] || (_cache[30] = (...args) => _ctx.shareDuas && _ctx.shareDuas(...args))
  }, [...(_cache[132] || (_cache[132] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[31] || (_cache[31] = (...args) => _ctx.copyDuas && _ctx.copyDuas(...args))
  }, [...(_cache[133] || (_cache[133] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[32] || (_cache[32] = (...args) => _ctx.printDuas && _ctx.printDuas(...args))
  }, [...(_cache[134] || (_cache[134] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.duaShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_159, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.duaShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_160, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('duas'),
    onClick: _cache[33] || (_cache[33] = $event => _ctx.decreaseSectionFont('duas')),
    "aria-label": "Decrease duas font size"
  }, " A- ", 8 /* PROPS */, _hoisted_162), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('duas'),
    onClick: _cache[34] || (_cache[34] = $event => _ctx.increaseSectionFont('duas')),
    "aria-label": "Increase duas font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_163), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[35] || (_cache[35] = $event => _ctx.toggleCardVisibility('duas')),
    "aria-expanded": _ctx.isCardVisible('duas'),
    "aria-label": _ctx.isCardVisible('duas') ? 'Collapse duas' : 'Expand duas'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('duas') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_164)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.duaFontScale}em`,
      lineHeight: 1.5
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_165, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDuas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dua.arabic,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_166, [_cache[135] || (_cache[135] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "dua-glow"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "mb-0 text-dark text-center pb-3",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.duaFontScale}rem`
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.title), 1 /* TEXT */)], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      dir: "rtl",
      class: "fw-semibold lh-base mb-2 fs-5 text-teal border-bottom pb-2 text-end",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.duaFontScale * 1.05}rem`
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.arabic), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "mb-0 text-dark",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.duaFontScale}rem`
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.english), 5 /* TEXT, STYLE */), dua.reference ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: 0,
      class: "mb-0 text-muted pt-2",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.duaFontScale}rem`
      }),
      innerHTML: _ctx.formatReferenceText(dua.reference)
    }, null, 12 /* STYLE, PROPS */, _hoisted_167)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('duas')]])], 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_VideoGallery, {
    "section-style": _ctx.sectionFontStyle('revertStories'),
    visible: _ctx.isCardVisible('revertStories'),
    "is-section-font-min": _ctx.isSectionFontMin('revertStories'),
    "is-section-font-max": _ctx.isSectionFontMax('revertStories'),
    videos: _ctx.revertStoriesPreview,
    "is-playing-video": _ctx.isPlayingVideo,
    "is-video-previewing": _ctx.isVideoPreviewing,
    "thumbnail-style": _ctx.thumbnailStyle,
    "format-video-url": _ctx.formatVideoUrl,
    "should-autoplay-video": _ctx.shouldAutoplayVideo,
    "handle-video-card-click": _ctx.handleVideoCardClick,
    "handle-video-card-touch": _ctx.handleVideoCardTouch,
    "start-preview": _ctx.startPreview,
    "stop-preview": _ctx.stopPreview,
    "video-tags": _ctx.videoTags,
    onDecreaseFont: _cache[36] || (_cache[36] = $event => _ctx.decreaseSectionFont('revertStories')),
    onIncreaseFont: _cache[37] || (_cache[37] = $event => _ctx.increaseSectionFont('revertStories')),
    onToggleVisibility: _cache[38] || (_cache[38] = $event => _ctx.toggleCardVisibility('revertStories')),
    onOpenModal: _cache[39] || (_cache[39] = $event => _ctx.showVideoModal = true)
  }, null, 8 /* PROPS */, ["section-style", "visible", "is-section-font-min", "is-section-font-max", "videos", "is-playing-video", "is-video-previewing", "thumbnail-style", "format-video-url", "should-autoplay-video", "handle-video-card-click", "handle-video-card-touch", "start-preview", "stop-preview", "video-tags"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" key insights "), _ctx.secondarySectionsReady && _ctx.insightsToShow.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 2,
    id: "key-insights-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('keyInsights'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_168, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_169, [_cache[137] || (_cache[137] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "card-header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lightbulb-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [_cache[136] || (_cache[136] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h3 class=\"fw-bold mb-1\">Key Insights</h3><p class=\"text-muted small mb-0\">Anchor the lesson with these quick takeaways.</p><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> The most important takeaways.</span><span><strong>Purpose:</strong> Help you revise quickly.</span><span><strong>Aim:</strong> Keep the heart of the lesson clear.</span><span><strong>Result:</strong> You remember what matters most.</span></div>", 3)), _ctx.keyInsightsMeta.wordCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_171, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_172, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.keyInsightsMeta.wordCount) + " words", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_173, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.keyInsightsMeta.readTime) + " min read", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_174, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_175, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('keyInsights'),
    onClick: _cache[40] || (_cache[40] = $event => _ctx.decreaseSectionFont('keyInsights')),
    "aria-label": "Decrease key insights font size"
  }, " A- ", 8 /* PROPS */, _hoisted_176), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('keyInsights'),
    onClick: _cache[41] || (_cache[41] = $event => _ctx.increaseSectionFont('keyInsights')),
    "aria-label": "Increase key insights font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_177), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[42] || (_cache[42] = $event => _ctx.toggleCardVisibility('keyInsights')),
    "aria-expanded": _ctx.isCardVisible('keyInsights'),
    "aria-label": _ctx.isCardVisible('keyInsights') ? 'Collapse key insights' : 'Expand key insights'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('keyInsights') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_178)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_179, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_180, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_181, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.insightsToShow, (insight, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `${insight}-${index}`,
      class: "insight-card"
    }, [_cache[138] || (_cache[138] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "insight-card-accent",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_182, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_183, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "insight-card-text mb-0",
      innerHTML: _ctx.formatReferenceText(insight)
    }, null, 8 /* PROPS */, _hoisted_184)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('keyInsights')]])], 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" share and uplift "),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" common asked questions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" chapter-specific tool "), _ctx.chapterTool ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 4,
    id: "chapter-tool-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg chapter-tool-card section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('chapterTool'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_197, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_198, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_199, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.chapterTool.icon || 'bi bi-tools')
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_200, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.chapterTool.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_201, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.chapterTool.description), 1 /* TEXT */), _cache[146] || (_cache[146] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-explainer section-explainer--compact"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "What:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" An interactive helper for this chapter.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Purpose:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Turn knowledge into action.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Aim:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Practise the topic gently.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Result:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" You apply what you learned.")])], -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_202, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('chapterTool'),
    onClick: _cache[51] || (_cache[51] = $event => _ctx.decreaseSectionFont('chapterTool')),
    "aria-label": "Decrease chapter tool font size"
  }, " A- ", 8 /* PROPS */, _hoisted_203), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('chapterTool'),
    onClick: _cache[52] || (_cache[52] = $event => _ctx.increaseSectionFont('chapterTool')),
    "aria-label": "Increase chapter tool font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_204), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "chapter-tool-open",
    onClick: _cache[53] || (_cache[53] = (...args) => _ctx.openChapterToolNewTab && _ctx.openChapterToolNewTab(...args)),
    "aria-label": `Open ${_ctx.chapterTool.title} in a new tab`
  }, [...(_cache[147] || (_cache[147] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-arrow-up-right fs-4"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_205)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_206, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-tool-content",
    onClick: _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"])),
    onMousedown: _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"])),
    onTouchstart: _cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"])),
    onKeydown: _cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_207, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_208, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Suspense, null, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.chapterToolComponent ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)((0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent)(_ctx.chapterToolComponent), {
      key: 0,
      class: "chapter-tool-embed"
    })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_209, [...(_cache[148] || (_cache[148] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "text-muted mb-3"
    }, "Unable to load this tool right now.", -1 /* CACHED */)]))]))]),
    fallback: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_210, " Loading " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.chapterTool.title) + "… ", 1 /* TEXT */)]),
    _: 1 /* STABLE */
  }))])])], 32 /* NEED_HYDRATION */)])], 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "common-questions-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.sectionFontStyle('commonQuestions'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_211, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_212, [_cache[150] || (_cache[150] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "card-header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[149] || (_cache[149] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h3 class=\"fw-bold mb-1\">Commonly Asked Questions</h3><p class=\"text-muted small mb-0\">Short answers for this chapter.</p><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> Questions people often ask.</span><span><strong>Purpose:</strong> Clear doubts without pressure.</span><span><strong>Aim:</strong> Give simple answers in context.</span><span><strong>Result:</strong> You move forward with more clarity.</span></div>", 3)), _ctx.commonQuestionsMeta.wordCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_213, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_214, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.commonQuestionsMeta.wordCount) + " words", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_215, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.commonQuestionsMeta.readTime) + " min read", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_216, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_217, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMin('commonQuestions'),
    onClick: _cache[58] || (_cache[58] = $event => _ctx.decreaseSectionFont('commonQuestions')),
    "aria-label": "Decrease common questions font size"
  }, " A- ", 8 /* PROPS */, _hoisted_218), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: _ctx.isSectionFontMax('commonQuestions'),
    onClick: _cache[59] || (_cache[59] = $event => _ctx.increaseSectionFont('commonQuestions')),
    "aria-label": "Increase common questions font size"
  }, " A+ ", 8 /* PROPS */, _hoisted_219), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    onClick: _cache[60] || (_cache[60] = $event => _ctx.toggleCardVisibility('commonQuestions')),
    "aria-expanded": _ctx.isCardVisible('commonQuestions'),
    "aria-label": _ctx.isCardVisible('commonQuestions') ? 'Collapse FAQs' : 'Expand FAQs'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isCardVisible('commonQuestions') ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_220)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_221, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_222, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visibleCommonPanels, (panel, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: panel.id,
      class: "accordion-item-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-question accordion-trigger d-flex justify-content-between align-items-center w-100", {
        expanded: _ctx.isAccordionOpen('common', index)
      }]),
      onClick: $event => _ctx.toggleAccordion('common', index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(panel.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAccordionOpen('common', index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_223), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_224, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: _ctx.formatReferenceHtml(panel.body)
    }, null, 8 /* PROPS */, _hoisted_225)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen('common', index)]])]);
  }), 128 /* KEYED_FRAGMENT */))]), _ctx.commonFaqHasMore ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_226, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-link text-teal",
    onClick: _cache[61] || (_cache[61] = $event => _ctx.expandFaq('common'))
  }, " Show " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.chapterCommonPanels.length - _ctx.commonFaqDisplayLimit) + " more ", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isCardVisible('commonQuestions')]])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" motivation "),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" resources "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ResourcePanel, {
    "section-style": _ctx.sectionFontStyle('resources'),
    visible: _ctx.isCardVisible('resources'),
    "is-section-font-min": _ctx.isSectionFontMin('resources'),
    "is-section-font-max": _ctx.isSectionFontMax('resources'),
    "resource-sections-with-keys": _ctx.resourceSectionsWithKeys,
    "current-chapter-resources-layout": _ctx.currentChapterResourcesLayout,
    "global-search-active": false,
    "resource-search-term": '',
    "highlight-resource-text": _ctx.highlightResourceText,
    "is-section-visible": _ctx.isSectionVisible,
    "toggle-section-visibility": _ctx.toggleSectionVisibility,
    "resource-entry-parts": _ctx.resourceEntryParts,
    "format-resource-reference-entry": _ctx.formatResourceReferenceEntry,
    "format-resource-entry": _ctx.formatResourceEntry,
    "copy-resource-entry": _ctx.copyResourceEntry,
    onDecreaseFont: _cache[65] || (_cache[65] = $event => _ctx.decreaseSectionFont('resources')),
    onIncreaseFont: _cache[66] || (_cache[66] = $event => _ctx.increaseSectionFont('resources')),
    onToggleVisibility: _cache[67] || (_cache[67] = $event => _ctx.toggleCardVisibility('resources'))
  }, null, 8 /* PROPS */, ["section-style", "visible", "is-section-font-min", "is-section-font-max", "resource-sections-with-keys", "current-chapter-resources-layout", "highlight-resource-text", "is-section-visible", "toggle-section-visibility", "resource-entry-parts", "format-resource-reference-entry", "format-resource-entry", "copy-resource-entry"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" quiz "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_QuizSection, {
    "section-style": _ctx.sectionFontStyle('chapterQuiz'),
    visible: _ctx.isCardVisible('chapterQuiz'),
    "is-section-font-min": _ctx.isSectionFontMin('chapterQuiz'),
    "is-section-font-max": _ctx.isSectionFontMax('chapterQuiz'),
    "current-question": _ctx.currentQuestion,
    "chapter-quiz-passed": _ctx.chapterQuizPassed,
    "quiz-questions": _ctx.quizQuestions,
    "current-question-index": _ctx.currentQuestionIndex,
    "quiz-status": _ctx.quizStatus,
    "selected-option": _ctx.selectedOption,
    "quiz-feedback": _ctx.quizFeedback,
    "quiz-progress-label": _ctx.quizProgressLabel,
    "quiz-stage-label": _ctx.quizStageLabel,
    "motivational-message": _ctx.motivationalMessage,
    "motivational-hint": _ctx.motivationalHint,
    "current-quiz-section-title": _ctx.currentQuizSectionTitle,
    "quiz-momentum-percent": _ctx.quizMomentumPercent,
    "quiz-hint-explanation": _ctx.quizHintExplanation,
    "quiz-hint-section-id": _ctx.quizHintSectionId,
    "quiz-required-correct": _ctx.quizRequiredCorrect,
    onDecreaseFont: _cache[68] || (_cache[68] = $event => _ctx.decreaseSectionFont('chapterQuiz')),
    onIncreaseFont: _cache[69] || (_cache[69] = $event => _ctx.increaseSectionFont('chapterQuiz')),
    onToggleVisibility: _cache[70] || (_cache[70] = $event => _ctx.toggleCardVisibility('chapterQuiz')),
    onAnswer: _ctx.answerQuiz,
    onRetry: _ctx.retryQuiz,
    onJump: _ctx.scrollToSection
  }, null, 8 /* PROPS */, ["section-style", "visible", "is-section-font-min", "is-section-font-max", "current-question", "chapter-quiz-passed", "quiz-questions", "current-question-index", "quiz-status", "selected-option", "quiz-feedback", "quiz-progress-label", "quiz-stage-label", "motivational-message", "motivational-hint", "current-quiz-section-title", "quiz-momentum-percent", "quiz-hint-explanation", "quiz-hint-section-id", "quiz-required-correct", "onAnswer", "onRetry", "onJump"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" NAVIGATION BUTTONS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_237, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_238, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-secondary fw-semibold px-4 py-3 fs-6 d-flex align-items-center gap-2", {
      'opacity-50 cursor-not-allowed': _ctx.selectedPill <= 1
    }]),
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[71] || (_cache[71] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[152] || (_cache[152] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_239), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_240, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_241, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPill) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.roadmapData.length), 1 /* TEXT */), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_242, "Quiz cleared • Next Chapter unlocked.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn next-btn fw-bold px-4 py-3 fs-6 text-white d-flex align-items-center gap-2", {
      'next-ready': _ctx.chapterQuizPassed && !_ctx.isWaitingForNext,
      'disabled': _ctx.isWaitingForNext || !_ctx.chapterQuizPassed
    }]),
    disabled: _ctx.isWaitingForNext || !_ctx.chapterQuizPassed,
    onClick: _cache[72] || (_cache[72] = (...args) => _ctx.completeAndNext && _ctx.completeAndNext(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isWaitingForNext ? 'Processing...' : 'Next Chapter'), 1 /* TEXT */), _cache[153] || (_cache[153] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_243)])])])])])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "scroll-fab",
    appear: ""
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.showScrollFab ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      class: "scroll-top-fab d-flex align-items-center justify-content-center shadow",
      type: "button",
      "aria-label": "Scroll to top",
      onClick: _cache[73] || (_cache[73] = (...args) => _ctx.scrollToTop && _ctx.scrollToTop(...args))
    }, [...(_cache[154] || (_cache[154] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-arrow-up-short fs-1 text-white"
    }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showSearchInfoModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_244, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop",
    onClick: _cache[74] || (_cache[74] = (...args) => _ctx.closeSearchInfoModal && _ctx.closeSearchInfoModal(...args))
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_245, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_246, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_247, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_248, [_cache[155] || (_cache[155] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title fw-bold"
  }, "About global search", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close",
    onClick: _cache[75] || (_cache[75] = (...args) => _ctx.closeSearchInfoModal && _ctx.closeSearchInfoModal(...args))
  })]), _cache[156] || (_cache[156] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body px-4 py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "search-info-lead"
  }, " Global search scans the entire chapter so you can find a concept, reference, or story in seconds. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "search-info-list"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "search-info-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "search-info-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stack search-info-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Search coverage ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "search-info-card-text"
  }, " Lesson summaries, learning paths, key insights, duas, stories, resources, and questions. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "search-info-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "search-info-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-quote search-info-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Phrase matching ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "search-info-card-text"
  }, " Use quotes for exact phrases, like \"tawheed foundation\". ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "search-info-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "search-info-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filter search-info-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Category filter ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "search-info-card-text"
  }, " Narrow results by category without leaving the search panel. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "search-info-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "search-info-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-send-fill search-info-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Jump to results ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "search-info-card-text"
  }, " Click any result to jump directly to that section on the page. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "search-info-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "search-info-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pencil-fill search-info-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Highlighting ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "search-info-card-text"
  }, " Colored highlights show exactly where your terms appear. ")])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_249, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal px-4",
    onClick: _cache[76] || (_cache[76] = (...args) => _ctx.closeSearchInfoModal && _ctx.closeSearchInfoModal(...args))
  }, " Got it ")])], 512 /* NEED_PATCH */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showResourceModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_250, [_cache[159] || (_cache[159] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_251, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_252, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_253, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_254, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_255, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$activeResource = _ctx.activeResource) === null || _ctx$activeResource === void 0 ? void 0 : _ctx$activeResource.title), 1 /* TEXT */)]), _cache[158] || (_cache[158] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body px-4 py-3"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_256, [_ctx.resourceCopyStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_257, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.resourceCopyStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_258, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-dark px-4",
    onClick: _cache[77] || (_cache[77] = (...args) => _ctx.copyResourceLink && _ctx.copyResourceLink(...args))
  }, [...(_cache[157] || (_cache[157] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-link-45deg"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Link ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal px-4",
    onClick: _cache[78] || (_cache[78] = (...args) => _ctx.closeResourceModal && _ctx.closeResourceModal(...args))
  }, " Close ")])])], 512 /* NEED_PATCH */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showVideoModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_259, [_cache[166] || (_cache[166] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_260, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_261, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_262, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_263, [_cache[160] || (_cache[160] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title fw-bold"
  }, "All Revert Stories", -1 /* CACHED */)), _ctx.hasStoryFilters ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-sm btn-outline-dark ms-auto d-flex align-items-center gap-2",
    onClick: _cache[79] || (_cache[79] = (...args) => _ctx.toggleVideoFilters && _ctx.toggleVideoFilters(...args)),
    "aria-pressed": _ctx.showVideoFilters,
    "aria-label": _ctx.showVideoFilters ? 'Hide story filters' : 'Show story filters'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.showVideoFilters ? 'bi-eye-slash' : 'bi-eye'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_265, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showVideoFilters ? 'Hide filters' : 'Show filters'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_264)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_266, [_ctx.hasStoryFilters ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_267, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_268, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_269, [_cache[161] || (_cache[161] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "filter-label"
  }, "Search stories", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control form-control-sm",
    placeholder: "Search by title or theme",
    "onUpdate:modelValue": _cache[80] || (_cache[80] = $event => _ctx.videoSearchTerm = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.videoSearchTerm]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_270, [_cache[162] || (_cache[162] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "filter-label"
  }, "Duration", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select form-select-sm",
    "onUpdate:modelValue": _cache[81] || (_cache[81] = $event => _ctx.videoDurationFilter = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.durationFilters, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_271);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.videoDurationFilter]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_272, [_cache[163] || (_cache[163] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "filter-label"
  }, "Gender", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select form-select-sm",
    "onUpdate:modelValue": _cache[82] || (_cache[82] = $event => _ctx.videoGenderFilter = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.genderFilters, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_273);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.videoGenderFilter]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_274, [_cache[164] || (_cache[164] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "filter-label"
  }, "Background", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select form-select-sm",
    "onUpdate:modelValue": _cache[83] || (_cache[83] = $event => _ctx.videoBackgroundFilter = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.backgroundFilterOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_275);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.videoBackgroundFilter]])])]), !_ctx.filteredRevertStories.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_276, " No stories match those filters yet. Try resetting or broadening your search. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showVideoFilters]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_277, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredRevertStories, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 'modal-' + video.title,
      class: "col-12 col-md-6"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      class: "video-card shadow-sm overflow-hidden h-100",
      onMouseenter: $event => _ctx.startPreview(video),
      onMouseleave: _cache[84] || (_cache[84] = (...args) => _ctx.stopPreview && _ctx.stopPreview(...args)),
      onClick: $event => _ctx.handleVideoCardClick(video),
      onTouchstart: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.handleVideoCardTouch(video), ["stop", "prevent"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_279, [_ctx.isPlayingVideo(video) || _ctx.isVideoPreviewing(video) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "video-feature",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.thumbnailStyle(video))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: _ctx.formatVideoUrl(video.url, _ctx.isPlayingVideo(video) || _ctx.shouldAutoplayVideo(), _ctx.isVideoPreviewing(video) || !_ctx.shouldAutoplayVideo() && _ctx.isPlayingVideo(video)),
      title: video.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_280)], 4 /* STYLE */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "video-feature",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.thumbnailStyle(video))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_281, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_282, [_cache[165] || (_cache[165] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "video-feature-label"
    }, "Revert story", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_283, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), video.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_284, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), video.duration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_285, "Duration: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.duration), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 4 /* STYLE */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_286, [_ctx.videoTags(video).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_287, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.videoTags(video), tag => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: tag + '-modal',
        class: "video-tag-badge"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 40 /* PROPS, NEED_HYDRATION */, _hoisted_278)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_288, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_289, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-dark px-4",
    onClick: _cache[85] || (_cache[85] = (...args) => _ctx.closeVideoModal && _ctx.closeVideoModal(...args))
  }, " Close ")])])], 512 /* NEED_PATCH */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showHelpModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_290, [_cache[168] || (_cache[168] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_291, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_292, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_293, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_294, [_cache[167] || (_cache[167] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title fw-bold mb-1"
  }, "Reverts Corner Guide"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "A quick walkthrough of how this page keeps your reflections grounded.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close guide",
    onClick: _cache[86] || (_cache[86] = (...args) => _ctx.closeHelpModal && _ctx.closeHelpModal(...args))
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_295, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.helpGuideSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: step.title,
      class: "guide-step-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_296, "Step " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_297, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_298, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_299, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal px-4",
    onClick: _cache[87] || (_cache[87] = (...args) => _ctx.closeHelpModal && _ctx.closeHelpModal(...args))
  }, "Got it")])], 512 /* NEED_PATCH */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showCompletionModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_300, [_cache[182] || (_cache[182] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_301, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_302, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_303, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_304, [_cache[169] || (_cache[169] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "completion-header-left"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "completion-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-star-and-crescent completion-header-icon"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-label mb-1"
  }, "Milestone"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title fw-bold mb-0"
  }, "Beginner Path Complete")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close",
    onClick: _cache[88] || (_cache[88] = (...args) => _ctx.closeCompletionModal && _ctx.closeCompletionModal(...args))
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_305, [_cache[178] || (_cache[178] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-lead mb-2"
  }, "Alhamdulillah, you've completed the Beginner path (15 chapters).", -1 /* CACHED */)), _cache[179] || (_cache[179] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-note mb-3"
  }, " May Allah bless your effort, increase your knowledge, and keep your heart steady. When you are ready, choose the option that feels right to unlock the next stages. No pressure, your intention matters. ", -1 /* CACHED */)), _cache[180] || (_cache[180] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "completion-divider"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_306, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_307, [_cache[171] || (_cache[171] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "completion-option-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-title d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-layer-group completion-option-icon"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Unlock Intermediate (15 chapters) ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-desc"
  }, " One-time £0.80 to open the Intermediate level and continue your journey. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: _ctx.intermediateUnlockStripeUrl,
    class: "btn completion-primary-btn d-inline-flex align-items-center gap-2",
    target: "_blank",
    rel: "noopener"
  }, [...(_cache[170] || (_cache[170] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-unlock"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Unlock Intermediate • £0.80 ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_308)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_309, [_cache[173] || (_cache[173] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "completion-option-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-title d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-crown completion-option-icon"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Unlock Intermediate + Advanced ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-desc"
  }, " One-time £1.30 to unlock both 15-chapter sections together. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: _ctx.intermediateAdvancedBundleStripeUrl,
    class: "btn completion-secondary-btn d-inline-flex align-items-center gap-2",
    target: "_blank",
    rel: "noopener"
  }, [...(_cache[172] || (_cache[172] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-unlock"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Unlock Both • £1.30 ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_310)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_311, [_cache[175] || (_cache[175] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "completion-option-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-title d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-wallet completion-option-icon"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pay what you can ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-desc"
  }, " If those amounts are not easy today, choose any amount. Allah knows your intention. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: _ctx.nextPhaseFlexibleStripeUrl,
    class: "btn completion-secondary-btn d-inline-flex align-items-center gap-2",
    target: "_blank",
    rel: "noopener"
  }, [...(_cache[174] || (_cache[174] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-coins"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Choose an amount ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_312)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_313, [_cache[177] || (_cache[177] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "completion-option-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-title d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-heart completion-option-icon"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Give a donation ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-option-desc"
  }, " Support the work with sadaqah so more learners can benefit. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: _ctx.donationStripeUrl,
    class: "btn completion-ghost-btn d-inline-flex align-items-center gap-2",
    target: "_blank",
    rel: "noopener"
  }, [...(_cache[176] || (_cache[176] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hand-holding-heart"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Give a donation ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_314)])]), _cache[181] || (_cache[181] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "completion-footnote mb-0"
  }, "Secure checkout via Stripe. May Allah reward your sincerity.", -1 /* CACHED */))])], 512 /* NEED_PATCH */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]))], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/LessonHeader.vue?vue&type=template&id=ceb3c5f4":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/LessonHeader.vue?vue&type=template&id=ceb3c5f4 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "lesson-overview-section",
  class: "lesson-header animated-fade-in mb-4"
};
const _hoisted_2 = {
  class: "lesson-hero position-relative overflow-hidden shadow-sm"
};
const _hoisted_3 = {
  class: "lesson-hero-content"
};
const _hoisted_4 = {
  class: "d-flex align-items-center mb-2"
};
const _hoisted_5 = {
  class: "text-uppercase text-white fw-bold small"
};
const _hoisted_6 = {
  class: "fw-bold text-white text-start text-md-left mb-2"
};
const _hoisted_7 = {
  class: "row g-0"
};
const _hoisted_8 = {
  class: "col-12 w-100"
};
const _hoisted_9 = {
  class: "text-white-50 mb-0"
};
const _hoisted_10 = {
  class: "lesson-hero-meta mt-3"
};
const _hoisted_11 = {
  class: "hero-meta-chip"
};
const _hoisted_12 = {
  class: "hero-meta-chip"
};
const _hoisted_13 = {
  class: "hero-meta-chip"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "lesson-hero-gradient"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journey me-2 text-white fs-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_5, " Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.title || 'Revert Journey'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.summary || 'Build your path chapter by chapter with guided lessons and practical support.'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-graph-up-arrow"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round($props.progressPercentage)) + "% complete ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check2-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.completedChapters) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.totalChapters) + " chapters done ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stars"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Current unlock: Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.maxStepReached), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "lesson-help-button",
    "aria-label": "Open Reverts Corner guide",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('open-help'))
  }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle-fill fs-4"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Open guide", -1 /* CACHED */)]))])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/QuizSection.vue?vue&type=template&id=9061a582":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/QuizSection.vue?vue&type=template&id=9061a582 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-3"
};
const _hoisted_2 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_3 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Chapter quiz font size"
};
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["aria-expanded", "aria-label"];
const _hoisted_7 = {
  key: 0
};
const _hoisted_8 = {
  class: "quiz-body px-4 py-3"
};
const _hoisted_9 = {
  class: "quiz-progress-wrapper mb-3"
};
const _hoisted_10 = {
  class: "quiz-progress-track"
};
const _hoisted_11 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_12 = {
  class: "mb-0 small fw-semibold text-teal"
};
const _hoisted_13 = {
  class: "quiz-motivation-panel mb-3 shadow-sm rounded-4"
};
const _hoisted_14 = {
  class: "d-flex align-items-start gap-3 flex-grow-1 min-width-0"
};
const _hoisted_15 = {
  class: "flex-grow-1"
};
const _hoisted_16 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_17 = {
  class: "text-muted small mb-0"
};
const _hoisted_18 = {
  class: "quiz-stage-pill mt-2"
};
const _hoisted_19 = {
  class: "quiz-focus-panel mb-3"
};
const _hoisted_20 = {
  class: "quiz-focus-detail"
};
const _hoisted_21 = {
  class: "fw-semibold mb-0"
};
const _hoisted_22 = {
  class: "quiz-momentum"
};
const _hoisted_23 = {
  class: "d-flex align-items-center gap-2 mb-2"
};
const _hoisted_24 = {
  class: "quiz-momentum-value"
};
const _hoisted_25 = {
  class: "quiz-momentum-bar"
};
const _hoisted_26 = {
  class: "fw-semibold text-dark mb-2 quiz-question"
};
const _hoisted_27 = {
  class: "quiz-options-grid"
};
const _hoisted_28 = ["disabled", "aria-pressed", "onClick"];
const _hoisted_29 = {
  class: "icon-stack"
};
const _hoisted_30 = {
  key: 0,
  class: "bi bi-check-circle-fill text-dark"
};
const _hoisted_31 = {
  key: 1,
  class: "bi bi-x-circle-fill text-dark"
};
const _hoisted_32 = {
  class: "d-flex align-items-start gap-2"
};
const _hoisted_33 = {
  class: "quiz-feedback-icon"
};
const _hoisted_34 = {
  key: 0,
  class: "bi bi-stars"
};
const _hoisted_35 = {
  key: 1,
  class: "bi bi-arrow-repeat"
};
const _hoisted_36 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_37 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_38 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_39 = {
  key: 1,
  class: "quiz-explanation-card mt-3"
};
const _hoisted_40 = {
  class: "right-answer-pill text-muted"
};
const _hoisted_41 = {
  class: "text-dark fw-bold mt-2"
};
const _hoisted_42 = {
  class: "pt-2 text-muted"
};
const _hoisted_43 = {
  class: "mb-0"
};
const _hoisted_44 = {
  class: "quiz-explanation-footer mt-3"
};
const _hoisted_45 = {
  key: 0,
  class: "quiz-success-note mt-3"
};
const _hoisted_46 = {
  class: "d-flex flex-column flex-md-row gap-2 align-items-start"
};
const _hoisted_47 = {
  class: "mb-0 fw-semibold text-teal"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    id: "chapter-quiz-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-quiz",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($props.sectionStyle)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-start gap-3 flex-grow-1 min-width-0\"><span class=\"card-header-icon\"><i class=\"bi bi-journal-check\"></i></span><div><h3 class=\"fw-bold mb-1\">Chapter Quiz</h3><p class=\"text-muted small mb-0\">Attempt the curated quiz to move to the next chapter.</p><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> A short check of understanding.</span><span><strong>Purpose:</strong> Help you notice what is clear.</span><span><strong>Aim:</strong> Build confidence before continuing.</span><span><strong>Result:</strong> You unlock the next step with certainty.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: $props.isSectionFontMin,
    "aria-label": "Decrease chapter quiz font size",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('decrease-font'))
  }, " A- ", 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: $props.isSectionFontMax,
    "aria-label": "Increase chapter quiz font size",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('increase-font'))
  }, " A+ ", 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    "aria-expanded": $props.visible,
    "aria-label": $props.visible ? 'Collapse chapter quiz' : 'Expand chapter quiz',
    onClick: _cache[2] || (_cache[2] = $event => _ctx.$emit('toggle-visibility'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $props.visible ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_6)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$props.currentQuestion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-progress-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: ($props.currentQuestionIndex + ($props.quizStatus === 'correct' ? 1 : 0)) / $props.quizQuestions.length * 100 + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Progress toward mastery", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.quizProgressLabel), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-motivation-icon d-flex align-items-center justify-content-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lightning-charge-fill fs-5"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.motivationalMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.motivationalHint), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.quizStageLabel), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-1 text-uppercase"
  }, "Section focus", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.currentQuizSectionTitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted small text-uppercase"
  }, "Momentum", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.quizMomentumPercent) + "%", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: `${$props.quizMomentumPercent}%`
    })
  }, null, 4 /* STYLE */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.currentQuestion.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.currentQuestion.options, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: option,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn quiz-option text-start d-flex align-items-center justify-content-between", {
        'quiz-option--correct': $props.quizStatus === 'correct' && option === $props.currentQuestion.answer,
        'quiz-option--incorrect': $props.quizStatus === 'incorrect' && option === $props.selectedOption,
        'quiz-option--neutral': !($props.quizStatus === 'correct' && option === $props.currentQuestion.answer) && !($props.quizStatus === 'incorrect' && option === $props.selectedOption),
        'quiz-option--selected': $props.selectedOption === option && $props.quizStatus !== 'correct'
      }]),
      disabled: $props.chapterQuizPassed || $props.quizStatus === 'correct',
      "aria-pressed": $props.selectedOption === option,
      onClick: $event => _ctx.$emit('answer', option)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [$props.quizStatus === 'correct' && option === $props.currentQuestion.answer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_30)) : $props.quizStatus === 'incorrect' && option === $props.selectedOption ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_31)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_28);
  }), 128 /* KEYED_FRAGMENT */))]), $props.quizStatus && $props.quizFeedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quiz-feedback-panel mt-3", {
      'quiz-feedback-panel--correct': $props.quizStatus === 'correct',
      'quiz-feedback-panel--incorrect': $props.quizStatus === 'incorrect'
    }]),
    role: "status",
    "aria-live": "polite"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_33, [$props.quizStatus === 'correct' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_34)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_35))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.quizFeedback), 1 /* TEXT */), $props.quizStatus === 'correct' && !$props.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_37, " Next question loading... ")) : $props.quizStatus === 'incorrect' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_38, " Try another choice or review the explanation below. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.quizStatus === 'incorrect' && $props.quizHintExplanation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_39, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-explanation-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lightbulb-fill fs-5 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 fw-semibold mb-3 fs-6"
  }, "Explanation")])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, "Answer is: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.currentQuestion.answer), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.quizHintExplanation), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [$props.quizHintSectionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-sm btn-explanation-link",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.$emit('jump', $props.quizHintSectionId))
  }, " Jump to the related lesson section ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $props.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-badge-check-fill text-teal me-2 fs-5"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, "Great! " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.quizRequiredCorrect) + " correct answers recorded.", 1 /* TEXT */), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "The Next Chapter button above is now active.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-teal btn-sm shadow-none",
    onClick: _cache[4] || (_cache[4] = $event => _ctx.$emit('retry'))
  }, " Retake quiz ")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $props.visible]])], 4 /* STYLE */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/ResourcePanel.vue?vue&type=template&id=08c75776":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/ResourcePanel.vue?vue&type=template&id=08c75776 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "card-header d-flex align-items-center justify-content-between gap-3 py-3"
};
const _hoisted_2 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_3 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Resources font size"
};
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["aria-expanded", "aria-label"];
const _hoisted_7 = {
  class: "resources-body"
};
const _hoisted_8 = {
  class: "resources-intro"
};
const _hoisted_9 = {
  class: "resources-intro-text"
};
const _hoisted_10 = {
  key: 0,
  class: "resource-filter-note mb-0"
};
const _hoisted_11 = {
  class: "resource-filter-term"
};
const _hoisted_12 = {
  key: 0,
  class: "resource-grid"
};
const _hoisted_13 = {
  class: "resource-section-header"
};
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = ["aria-expanded", "aria-controls", "aria-label", "onClick"];
const _hoisted_16 = ["id"];
const _hoisted_17 = ["innerHTML"];
const _hoisted_18 = {
  class: "list-unstyled mb-0 resource-entry-list"
};
const _hoisted_19 = {
  class: "resource-entry-body"
};
const _hoisted_20 = ["innerHTML"];
const _hoisted_21 = ["innerHTML"];
const _hoisted_22 = {
  class: "resource-entry-actions"
};
const _hoisted_23 = ["title", "aria-label", "onClick"];
const _hoisted_24 = {
  key: 1,
  class: "resource-empty-state text-muted small"
};
const _hoisted_25 = {
  key: 2,
  class: "resource-empty-state text-muted small"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    id: "resources-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography resources-shell",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($props.sectionStyle)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-center gap-3\"><span class=\"card-header-icon\"><i class=\"bi bi-book\"></i></span><div><h3 class=\"fw-bold mb-0\">Foundational References</h3><p class=\"resources-header-subtitle mb-0\">Only the essentials for quick review.</p><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> Core proofs and trusted references.</span><span><strong>Purpose:</strong> Keep the chapter grounded.</span><span><strong>Aim:</strong> Make review easy after reading.</span><span><strong>Result:</strong> You know where each point comes from.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: $props.isSectionFontMin,
    "aria-label": "Decrease resources font size",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('decrease-font'))
  }, " A- ", 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: $props.isSectionFontMax,
    "aria-label": "Increase resources font size",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('increase-font'))
  }, " A+ ", 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    "aria-expanded": $props.visible,
    "aria-label": $props.visible ? 'Collapse resources' : 'Expand resources',
    onClick: _cache[2] || (_cache[2] = $event => _ctx.$emit('toggle-visibility'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $props.visible ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_6)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "resource-lead mb-0"
  }, "A short, prioritised reference list for this chapter.", -1 /* CACHED */)), $props.globalSearchActive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_10, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Showing matches for \"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.resourceSearchTerm), 1 /* TEXT */), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("\". ", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "resource-entry-hint text-muted small mb-0"
  }, " The list is intentionally compact so it stays scannable. ", -1 /* CACHED */))])]), $props.resourceSectionsWithKeys.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visibleResourceSections, (section, sectionIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.toggleKey,
      class: "resource-section-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "resource-section-title",
      innerHTML: $props.highlightResourceText(section.displayTitle || section.title)
    }, null, 8 /* PROPS */, _hoisted_14), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["section-toggle-btn", {
        collapsed: !$props.isSectionVisible(section.toggleKey)
      }]),
      "aria-expanded": $props.isSectionVisible(section.toggleKey),
      "aria-controls": `resource-section-${section.toggleKey}`,
      "aria-label": $props.isSectionVisible(section.toggleKey) ? 'Collapse resource section' : 'Expand resource section',
      onClick: $event => $props.toggleSectionVisibility(section.toggleKey)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $props.isSectionVisible(section.toggleKey) ? 'bi-dash-lg' : 'bi-plus-lg'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_15)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "section-collapse",
      appear: ""
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$props.isSectionVisible(section.toggleKey) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        id: `resource-section-${section.toggleKey}`
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, (item, itemIndex) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: `${section.title}-${sectionIndex}-${itemIndex}`,
          class: "resource-group"
        }, [item.label ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
          key: 0,
          class: "resource-group-label",
          innerHTML: $props.highlightResourceText(item.label)
        }, null, 8 /* PROPS */, _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_18, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.entries, (entry, entryIndex) => {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
            key: `${section.title}-${sectionIndex}-${itemIndex}-${entryIndex}`,
            class: "resource-entry"
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$props.resourceEntryParts(entry).reference ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
            key: 0,
            class: "resource-entry-reference",
            innerHTML: $props.formatResourceReferenceEntry($props.resourceEntryParts(entry).reference)
          }, null, 8 /* PROPS */, _hoisted_20)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.resourceEntryParts(entry).detail ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
            key: 1,
            class: "resource-entry-detail",
            innerHTML: $props.formatResourceEntry($props.resourceEntryParts(entry).detail, item.label)
          }, null, 8 /* PROPS */, _hoisted_21)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            class: "resource-entry-copy-btn",
            title: `Copy reference for ${item.label || section.title || 'resource'}`,
            "aria-label": `Copy reference for ${item.label || section.title || 'resource'}`,
            onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $props.copyResourceEntry(entry), ["stop"])
          }, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
            class: "bi bi-clipboard"
          }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
            class: "visually-hidden"
          }, "Copy reference", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_23)])]);
        }), 128 /* KEYED_FRAGMENT */))])]);
      }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_16)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : $props.currentChapterResourcesLayout ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_24, " No resources match this search yet. Try different keywords or reset filters. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_25, " Resources for this chapter are being prepared. "))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $props.visible]])], 4 /* STYLE */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/VideoGallery.vue?vue&type=template&id=f6142710":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/VideoGallery.vue?vue&type=template&id=f6142710 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "card-header d-flex align-items-center gap-3 flex-wrap py-3"
};
const _hoisted_2 = {
  class: "section-control-stack ms-auto"
};
const _hoisted_3 = {
  class: "section-font-controls",
  role: "group",
  "aria-label": "Revert stories font size"
};
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["aria-expanded", "aria-label"];
const _hoisted_7 = {
  class: "card-body px-4 py-3"
};
const _hoisted_8 = {
  class: "row g-3 video-grid-row"
};
const _hoisted_9 = ["onMouseenter", "onClick", "onTouchstart"];
const _hoisted_10 = {
  class: "video-card-media"
};
const _hoisted_11 = ["src", "title"];
const _hoisted_12 = {
  class: "video-feature-overlay"
};
const _hoisted_13 = {
  class: "video-feature-text"
};
const _hoisted_14 = {
  class: "video-feature-title"
};
const _hoisted_15 = {
  key: 0,
  class: "video-feature-subtitle"
};
const _hoisted_16 = {
  key: 1,
  class: "video-feature-duration"
};
const _hoisted_17 = {
  class: "video-card-caption px-3 py-2"
};
const _hoisted_18 = {
  class: "h6 fw-semibold mb-1 text-dark"
};
const _hoisted_19 = {
  key: 0,
  class: "video-card-tags mb-2"
};
const _hoisted_20 = {
  key: 1,
  class: "text-muted small mb-1"
};
const _hoisted_21 = {
  key: 2,
  class: "video-card-duration text-muted small mb-0"
};
const _hoisted_22 = {
  class: "d-flex justify-content-end mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    id: "revert-stories-section",
    class: "content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($props.sectionStyle)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-start gap-3 flex-grow-1 min-width-0\"><span class=\"card-header-icon\"><i class=\"bi bi-people-fill\"></i></span><div><h3 class=\"fw-bold mb-1\">Revert Stories</h3><p class=\"text-muted small mb-0\">Short journeys from our community, handpicked for this chapter.</p><div class=\"section-explainer section-explainer--compact\"><span><strong>What:</strong> Real conversion stories.</span><span><strong>Purpose:</strong> Bring human warmth to the lesson.</span><span><strong>Aim:</strong> Show that questions and growth are normal.</span><span><strong>Result:</strong> You feel less alone on the path.</span></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: $props.isSectionFontMin,
    "aria-label": "Decrease revert stories font size",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('decrease-font'))
  }, " A- ", 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-font-btn",
    disabled: $props.isSectionFontMax,
    "aria-label": "Increase revert stories font size",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('increase-font'))
  }, " A+ ", 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn card-toggle-btn",
    "aria-expanded": $props.visible,
    "aria-label": $props.visible ? 'Collapse revert stories' : 'Expand revert stories',
    onClick: _cache[2] || (_cache[2] = $event => _ctx.$emit('toggle-visibility'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $props.visible ? 'bi-dash-lg' : 'bi-plus-lg'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_6)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.videos, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: video.title,
      class: "col-12 col-md-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      class: "video-card shadow-sm overflow-hidden h-100",
      onMouseenter: $event => $props.startPreview(video),
      onMouseleave: _cache[3] || (_cache[3] = $event => $props.stopPreview()),
      onClick: $event => $props.handleVideoCardClick(video),
      onTouchstart: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $props.handleVideoCardTouch(video), ["stop"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [$props.isPlayingVideo(video) || $props.isVideoPreviewing(video) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "video-feature",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($props.thumbnailStyle(video))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: $props.formatVideoUrl(video.url, $props.isPlayingVideo(video) || $props.shouldAutoplayVideo(), $props.isVideoPreviewing(video) || !$props.shouldAutoplayVideo() && $props.isPlayingVideo(video)),
      title: video.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_11)], 4 /* STYLE */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "video-feature",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($props.thumbnailStyle(video))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "video-feature-label"
    }, "Revert story", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), video.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), video.duration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_16, "Duration: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.duration), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 4 /* STYLE */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), $props.videoTags(video).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.videoTags(video), tag => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: tag,
        class: "video-tag-badge"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), video.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), video.duration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_21, "Duration: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.duration), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 40 /* PROPS, NEED_HYDRATION */, _hoisted_9)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-see-more",
    onClick: _cache[4] || (_cache[4] = $event => _ctx.$emit('open-modal'))
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" See more videos ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-arrow-up-right"
  }, null, -1 /* CACHED */)]))])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $props.visible]])], 4 /* STYLE */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./resources/components/vue/RevertComponent.css?vue&type=style&index=0&lang=css&external":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./resources/components/vue/RevertComponent.css?vue&type=style&index=0&lang=css&external ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/RevertComponent.css?vue&type=style&index=0&lang=css&external":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/RevertComponent.css?vue&type=style&index=0&lang=css&external ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_RevertComponent_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./RevertComponent.css?vue&type=style&index=0&lang=css&external */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./resources/components/vue/RevertComponent.css?vue&type=style&index=0&lang=css&external");


/***/ }),

/***/ "./resources/components/vue/RevertComponent.vue":
/*!******************************************************!*\
  !*** ./resources/components/vue/RevertComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RevertComponent_vue_vue_type_template_id_5a42cae2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RevertComponent.vue?vue&type=template&id=5a42cae2 */ "./resources/components/vue/RevertComponent.vue?vue&type=template&id=5a42cae2");
/* harmony import */ var _RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RevertComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/RevertComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _RevertComponent_css_vue_type_style_index_0_lang_css_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RevertComponent.css?vue&type=style&index=0&lang=css&external */ "./resources/components/vue/RevertComponent.css?vue&type=style&index=0&lang=css&external");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RevertComponent_vue_vue_type_template_id_5a42cae2__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/RevertComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/RevertComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/components/vue/RevertComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevertComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RevertComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/RevertComponent.vue?vue&type=template&id=5a42cae2":
/*!************************************************************************************!*\
  !*** ./resources/components/vue/RevertComponent.vue?vue&type=template&id=5a42cae2 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_template_id_5a42cae2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_template_id_5a42cae2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevertComponent.vue?vue&type=template&id=5a42cae2 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RevertComponent.vue?vue&type=template&id=5a42cae2");


/***/ }),

/***/ "./resources/components/vue/RevertComponentLogic.js":
/*!**********************************************************!*\
  !*** ./resources/components/vue/RevertComponentLogic.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _data_roadmap_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/roadmap.json */ "./resources/components/vue/data/roadmap.json");
/* harmony import */ var _data_quizzes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/quizzes.json */ "./resources/components/vue/data/quizzes.json");
/* harmony import */ var _data_faqs_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/faqs.json */ "./resources/components/vue/data/faqs.json");
/* harmony import */ var _data_commonQuestions_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/commonQuestions.json */ "./resources/components/vue/data/commonQuestions.json");
/* harmony import */ var _data_premiumResources_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/premiumResources.json */ "./resources/components/vue/data/premiumResources.json");
/* harmony import */ var _data_duas_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/duas.json */ "./resources/components/vue/data/duas.json");
/* harmony import */ var _data_homework_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data/homework.json */ "./resources/components/vue/data/homework.json");
/* harmony import */ var _data_missions_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data/missions.json */ "./resources/components/vue/data/missions.json");
/* harmony import */ var _data_onboarding_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data/onboarding.json */ "./resources/components/vue/data/onboarding.json");
/* harmony import */ var _data_chapterDosDonts_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./data/chapterDosDonts.json */ "./resources/components/vue/data/chapterDosDonts.json");
/* harmony import */ var _data_keyInsights_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./data/keyInsights.json */ "./resources/components/vue/data/keyInsights.json");
/* harmony import */ var _data_chapterGuidance_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./data/chapterGuidance.json */ "./resources/components/vue/data/chapterGuidance.json");
/* harmony import */ var _data_chapterToneFocus_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./data/chapterToneFocus.json */ "./resources/components/vue/data/chapterToneFocus.json");
/* harmony import */ var _data_chapterGuidedPathway_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./data/chapterGuidedPathway.json */ "./resources/components/vue/data/chapterGuidedPathway.json");
/* harmony import */ var _data_chapterGentleStart_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./data/chapterGentleStart.json */ "./resources/components/vue/data/chapterGentleStart.json");
/* harmony import */ var _data_chapterSectionStats_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./data/chapterSectionStats.json */ "./resources/components/vue/data/chapterSectionStats.json");
/* harmony import */ var _data_chapterLessonOverview_json__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./data/chapterLessonOverview.json */ "./resources/components/vue/data/chapterLessonOverview.json");
/* harmony import */ var _data_chapterResources_json__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./data/chapterResources.json */ "./resources/components/vue/data/chapterResources.json");
/* harmony import */ var _data_nextStepPrompts_json__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./data/nextStepPrompts.json */ "./resources/components/vue/data/nextStepPrompts.json");
/* harmony import */ var _data_chapterPlanGuides_json__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./data/chapterPlanGuides.json */ "./resources/components/vue/data/chapterPlanGuides.json");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var _revert_LessonHeader_vue__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./revert/LessonHeader.vue */ "./resources/components/vue/revert/LessonHeader.vue");
/* harmony import */ var _revert_QuizSection_vue__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./revert/QuizSection.vue */ "./resources/components/vue/revert/QuizSection.vue");
/* harmony import */ var _revert_ResourcePanel_vue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./revert/ResourcePanel.vue */ "./resources/components/vue/revert/ResourcePanel.vue");
/* harmony import */ var _revert_VideoGallery_vue__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./revert/VideoGallery.vue */ "./resources/components/vue/revert/VideoGallery.vue");
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
const _excluded = ["loader"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


























const normalizeJson = value => {
  if (value && Array.isArray(value)) return value;
  if (value && value.default && Array.isArray(value.default)) return value.default;
  return [];
};
const VIDEO_ACCENT_PAIRS = [{
  primary: '#0f766e',
  secondary: '#5eead4'
}, {
  primary: '#1d4ed8',
  secondary: '#a5b4fc'
}, {
  primary: '#0f766e',
  secondary: '#d6a34a'
}, {
  primary: '#1e3a8a',
  secondary: '#3b82f6'
}, {
  primary: '#047857',
  secondary: '#34d399'
}, {
  primary: '#4c1d95',
  secondary: '#c084fc'
}];
const VIDEO_TAG_RULES = [{
  tag: 'Family Struggle',
  keywords: ['family', 'parent', 'parents', 'mother', 'father', 'children', 'kids', 'sister', 'brother', 'pressure', 'shame']
}, {
  tag: 'Ex-Christian',
  keywords: ['christian', 'jesus', 'bible', 'church', 'catholic', 'protestant', 'faith', 'christianity']
}, {
  tag: 'Funny',
  keywords: ['funny', 'comedy', 'comedian', 'laugh', 'humor', 'stand up', 'stand-up']
}, {
  tag: 'Quick Win',
  keywords: ['quick', 'short', 'minutes', '2 minutes', '3 minutes', 'mini', 'fast', 'brief', '90 seconds']
}, {
  tag: 'Community',
  keywords: ['community', 'tribe', 'friends', 'circle', 'mosque', 'support']
}, {
  tag: 'Faith Journey',
  keywords: ['revert', 'convert', 'conversion', 'shahada', 'journey to islam', 'found islam', 'embraced islam']
}, {
  tag: 'Inspiration',
  keywords: ['inspiring', 'hope', 'resilience', 'strength', 'courage', 'powerful']
}];
const MIN_STORIES_FOR_FILTERS = 20;
const DURATION_FILTERS = [{
  value: 'all',
  label: 'All durations'
}, {
  value: 'short',
  label: 'Short (< 2.5 min)'
}, {
  value: 'medium',
  label: 'Medium (2.5 - 4 min)'
}, {
  value: 'long',
  label: 'Long (> 4 min)'
}];
const GENDER_FILTERS = [{
  value: 'all',
  label: 'All genders'
}, {
  value: 'female',
  label: 'Female stories'
}, {
  value: 'male',
  label: 'Male stories'
}, {
  value: 'other',
  label: 'Other'
}];
const SECTION_FONT_MIN = 0.8;
const SECTION_FONT_MAX = 1.6;
const DEFAULT_OVERVIEW_FONT_SCALE = 1.08;
const DEFAULT_DUA_FONT_SCALE = 1.05;
const DEFAULT_GLOBAL_FONT_SCALE = 1.08;
const DEFAULT_SECTION_FONT_SCALE = 1.05;
const BACKGROUND_TAG_PRIORITY = ['Ex-Christian', 'Family Struggle', 'Faith Journey', 'Inspiration', 'Community', 'Funny', 'Quick Win'];
const FEMALE_KEYWORDS = ['she', 'her', 'woman', 'women', 'sister', 'mom', 'mother', 'girl', 'lady', 'daughter', 'female'];
const MALE_KEYWORDS = ['he', 'his', 'man', 'men', 'brother', 'dad', 'father', 'boy', 'guy', 'husband', 'male'];
const RESOURCE_SECTION_TITLES = ['Primary Sources'];
const HIDDEN_RESOURCE_SECTION_TITLES = new Set(['classical texts', 'modern resources']);
const RESOURCE_SECTION_TITLE_LABELS = {
  'Primary Sources': 'Foundational References'
};
const RESOURCE_HIGHLIGHT_CLASSES = ['highlight-0', 'highlight-1', 'highlight-2', 'highlight-3', 'highlight-4', 'highlight-5'];
const GLOBAL_SEARCH_SECTIONS = [{
  key: 'Lesson Overview',
  label: 'Lesson Overview',
  id: 'lesson-overview-section'
}, {
  key: 'Focus of This Lesson',
  label: 'Focus of This Lesson',
  id: 'lesson-focus-section'
}, {
  key: 'Learning Paths',
  label: 'Learning Paths',
  id: 'learning-paths-section'
}, {
  key: 'Guided Pathway',
  label: 'Guided Pathway',
  id: 'guided-pathway-section'
}, {
  key: "Do's and Don'ts",
  label: "Do's and Don'ts",
  id: 'dos-donts-section'
}, {
  key: 'Duas',
  label: 'Duas to Carry',
  id: 'duas-section'
}, {
  key: 'Revert Stories',
  label: 'Revert Stories',
  id: 'revert-stories-section'
}, {
  key: 'Key Insights',
  label: 'Key Insights',
  id: 'key-insights-section'
}, {
  key: 'Common Questions',
  label: 'Common Questions',
  id: 'common-questions-section'
}, {
  key: 'Resources',
  label: 'References & Resources',
  id: 'resources-section'
}];
const GLOBAL_SEARCH_SECTION_ID_MAP = GLOBAL_SEARCH_SECTIONS.reduce((map, entry) => {
  map[entry.key] = entry.id;
  return map;
}, {});
const GLOBAL_SEARCH_SECTION_ICONS = {
  'Lesson Overview': 'bi-journal-text',
  'Focus of This Lesson': 'bi-brightness-high-fill',
  'Learning Paths': 'bi-box-seam-fill',
  'Guided Pathway': 'bi-controller',
  "Do's and Don'ts": 'bi-shield-fill-check',
  'Duas': 'bi-bookmark-star-fill',
  'Revert Stories': 'bi-people-fill',
  'Key Insights': 'bi-lightbulb-fill',
  'Common Questions': 'bi-question-circle-fill',
  'Resources': 'bi-book'
};
const DEFAULT_DAILY_CHALLENGES = [{
  id: 'insight-note',
  title: 'Challenge one',
  description: '* Morning: Recite "Lā ilāha illallāh" 100 times with reflection. Noon: Learn one Name of Allāh and reflect on it throughout the day.'
}, {
  id: 'share-moment',
  title: 'Challenge two',
  description: 'Afternoon: Spot 3 signs of Allāhs Lordship around you. Evening: Purify one intention before an act of worship.'
}, {
  id: 'routine-tie',
  title: 'Challenge three',
  description: 'Night: Recite Ayat al-Kursī (2:255) before sleep – the greatest āyah on Tawheed.'
}];
const createChapterToolEntry = _ref => {
  let {
      loader
    } = _ref,
    config = _objectWithoutProperties(_ref, _excluded);
  let loadPromise;
  const loadModule = () => {
    if (!loadPromise) {
      loadPromise = loader();
    }
    return loadPromise;
  };
  return _objectSpread(_objectSpread({}, config), {}, {
    component: (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent)({
      loader: loadModule,
      suspensible: true
    }),
    preload: loadModule
  });
};
const CHAPTER_TOOL_MAP = {
  4: createChapterToolEntry({
    title: 'Surah Explorer',
    description: 'Search the Qur’an text and recitations without leaving the chapter.',
    icon: 'bi-menu-book',
    loader: () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_components_vue_SuratComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./SuratComponent.vue */ "./resources/components/vue/SuratComponent.vue")),
    route: '/surat'
  }),
  5: createChapterToolEntry({
    title: 'Seerah Timeline',
    description: 'Trace the Prophet ﷺ’s story while the lessons stay anchored.',
    icon: 'bi-people-fill',
    loader: () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_components_vue_MissionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./MissionComponent.vue */ "./resources/components/vue/MissionComponent.vue")),
    route: '/mission'
  }),
  6: createChapterToolEntry({
    title: 'Prayer Calendar',
    description: 'Review the upcoming Salah schedule and special nights.',
    icon: 'bi-calendar3',
    loader: () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_components_vue_CalendarComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./CalendarComponent.vue */ "./resources/components/vue/CalendarComponent.vue")),
    route: '/calendar'
  }),
  7: createChapterToolEntry({
    title: 'Dua & Dhikr Suite',
    description: 'Access curated duas and reminders while studying the Dua chapter.',
    icon: 'bi-heart',
    loader: () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_components_vue_DuaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./DuaComponent.vue */ "./resources/components/vue/DuaComponent.vue")),
    route: '/dua'
  })
};
const CONFETTI_EXCLUDED_CHAPTERS = new Set([9]);
const shouldCelebrateChapter = chapterId => {
  if (chapterId == null) return true;
  return !CONFETTI_EXCLUDED_CHAPTERS.has(chapterId);
};
const videoTagCache = new WeakMap();
const videoGenderCache = new WeakMap();
const videoDurationCache = new WeakMap();
const videoUrlIdCache = new Map();
const resourceEntrySplitCache = new Map();
const REVERTS_GUIDE_STEPS = [{
  title: 'Start with the roadmap',
  description: 'Scan the pills to understand the chapter flow completed lessons glow teal, the next gate glows gold, and locked chapters are gently dimmed.',
  actions: ['Tap the chapter you want to revisit to refresh context before diving back in.', 'Use the completion badges to remind yourself how much you have already accomplished.'],
  notes: 'Remember: unlocking a new chapter is simply a matter of feeling ready; the progress bar keeps you honest with milestones.'
}, {
  title: 'Refine your tone & pace',
  description: 'The right column curates tone cues, guided prompts, and next-step reminders so every repetition feels intentionally paced.',
  actions: ['Set your breathing with the tone prompt and note whether you need space to pause or a rhythm to steady.', 'Bookmark any reflection that resonates so it surfaces in your next gentle review.'],
  notes: 'Switch between “slow listen” and “active reflection” modes to keep the experience varied.'
}, {
  title: 'Use layered lesson insights',
  description: 'Each lesson contains an overview, highlight capsules, family-friendly dos/don’ts, and guided pathways that map practice to real life.',
  actions: ['Open the highlight cards to see the “why” behind each concept.', 'Pin a key insight to keep it visible while you work through exercises or mission prompts.'],
  notes: 'Look for the encouragement badges these spotlight resilient reverts and remind you that struggle is part of the story.'
}, {
  title: 'Tap into the sharing & media toolkit',
  description: 'Play short revert stories, copy or share summaries, and keep the reflections alive with dua cards and guided clips.',
  actions: ['Use the share buttons to send a single lesson card or the entire overview to a friend or mentor.', 'Queue the guided clips as a “reset” track when you need a calming pause mid-study.'],
  notes: 'The copy action also captures the tone you selected, so teammates understand how you want to be supported.'
}, {
  title: 'Capture progress and reflect',
  description: 'Mark steps complete, celebrate confetti milestones, and document what you learned to keep the momentum going.',
  actions: ['Use the gentle-start toggles to confirm that each soft landing moment has been honored.', 'When you finish a chapter, share what moved you in the reflection modal to lock it into memory.'],
  notes: 'Confetti triggers are subtle; the real celebration is the new insight you can carry forward.'
}];
const TROUBLESHOOTING_GUIDES = [{
  title: 'Chapters are locked',
  description: 'The next lessons open up once you finish the quiz for this chapter.',
  steps: ['Choose at least two correct answers before you leave the quiz.', 'Wait a few seconds so the Next Chapter button can turn on.', 'Still locked? Refresh the page and go through the chapter again.']
}, {
  title: 'Reflections not saving',
  description: 'Your thoughts stay right here so you can return to them anytime.',
  steps: ['Type your reflection before you tap Save.', 'Switch to regular browsing (not private) so the note can stay.', 'Want a fresh start? Tap “Create new note” and save again.']
}, {
  title: 'Video or clips won’t play',
  description: 'Videos might wait for you to let the page know you are ready.',
  steps: ['Tap anywhere on the page so it knows you are there.', 'Turn off high-contrast or reduced motion settings while the clip plays.', 'If it still freezes, refresh the page and try again.']
}];
const getConfettiScale = () => {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1400) return 0.55;
  if (window.innerWidth >= 1024) return 0.7;
  return 1;
};
const scaleConfettiConfig = config => {
  const scale = getConfettiScale();
  if (scale === 1) return config;
  return _objectSpread(_objectSpread({}, config), {}, {
    particleCount: Math.max(12, Math.round(config.particleCount * scale)),
    spread: Math.max(50, config.spread * (0.8 + scale / 1.25)),
    startVelocity: Math.max(40, config.startVelocity * (0.8 + scale / 2))
  });
};

// FULL-SCREEN EPIC CONFETTI
const fullScreenConfetti = confettiFn => {
  if (!confettiFn) return;

  // Left shower
  confettiFn(scaleConfettiConfig({
    particleCount: 100,
    spread: 80,
    origin: {
      x: 0,
      y: 0.6
    },
    drift: 1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }));

  // Right shower
  confettiFn(scaleConfettiConfig({
    particleCount: 100,
    spread: 80,
    origin: {
      x: 1,
      y: 0.6
    },
    drift: -1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }));

  // Big center explosion
  confettiFn(scaleConfettiConfig({
    particleCount: 150,
    spread: 120,
    origin: {
      x: 0.5,
      y: 0.5
    },
    startVelocity: 60,
    scalar: 1.4,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5', '#ffffff'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }));
};
const FINAL_CHAPTER_ID = _data_roadmap_json__WEBPACK_IMPORTED_MODULE_1__.length;
const BEGINNER_COMPLETION_CHAPTER_ID = 15;
const INTERMEDIATE_UNLOCK_AMOUNT_MINOR = 80;
const INTERMEDIATE_ADVANCED_BUNDLE_AMOUNT_MINOR = 130;
const DEFAULT_STRIPE_DONATE_URL = 'https://donate.stripe.com/6oE5kY84oc3q7fy145';
const celebrateFinalChapter = confettiFn => {
  if (!confettiFn) return;
  const bursts = [{
    particleCount: 220,
    spread: 200,
    startVelocity: 70,
    scalar: 1.5,
    colors: ['#facc15', '#d6a34a', '#34d399', '#38bdf8', '#22d3ee', '#a5b4fc']
  }, {
    particleCount: 180,
    spread: 160,
    startVelocity: 50,
    drift: 0.5,
    colors: ['#34d399', '#a5b4fc', '#fcd34d', '#5eead4']
  }, {
    particleCount: 140,
    spread: 190,
    startVelocity: 80,
    scalar: 1.6,
    colors: ['#0ea5e9', '#d6a34a', '#10b981']
  }];
  bursts.forEach(config => {
    confettiFn(scaleConfettiConfig(_objectSpread(_objectSpread({}, config), {}, {
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      },
      shapes: ['square', 'circle'],
      zIndex: 10000,
      disableForReducedMotion: false
    })));
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'App',
  components: {
    LessonHeader: _revert_LessonHeader_vue__WEBPACK_IMPORTED_MODULE_22__["default"],
    QuizSection: _revert_QuizSection_vue__WEBPACK_IMPORTED_MODULE_23__["default"],
    ResourcePanel: _revert_ResourcePanel_vue__WEBPACK_IMPORTED_MODULE_24__["default"],
    VideoGallery: _revert_VideoGallery_vue__WEBPACK_IMPORTED_MODULE_25__["default"]
  },
  data() {
    return {
      roadmapData: normalizeJson(_data_roadmap_json__WEBPACK_IMPORTED_MODULE_1__),
      chapterLessons: normalizeJson(_data_chapterLessonOverview_json__WEBPACK_IMPORTED_MODULE_17__),
      chapterResources: normalizeJson(_data_chapterResources_json__WEBPACK_IMPORTED_MODULE_18__),
      faqChapters: normalizeJson(_data_faqs_json__WEBPACK_IMPORTED_MODULE_3__),
      commonQuestionChapters: normalizeJson(_data_commonQuestions_json__WEBPACK_IMPORTED_MODULE_4__),
      premiumResources: normalizeJson(_data_premiumResources_json__WEBPACK_IMPORTED_MODULE_5__),
      quizzes: normalizeJson(_data_quizzes_json__WEBPACK_IMPORTED_MODULE_2__),
      missions: normalizeJson(_data_missions_json__WEBPACK_IMPORTED_MODULE_8__),
      duas: normalizeJson(_data_duas_json__WEBPACK_IMPORTED_MODULE_6__),
      dosDontsChapters: normalizeJson(_data_chapterDosDonts_json__WEBPACK_IMPORTED_MODULE_10__),
      chapterKeyInsights: normalizeJson(_data_keyInsights_json__WEBPACK_IMPORTED_MODULE_11__),
      guidanceTemplates: normalizeJson(_data_chapterGuidance_json__WEBPACK_IMPORTED_MODULE_12__),
      toneFocusEntries: normalizeJson(_data_chapterToneFocus_json__WEBPACK_IMPORTED_MODULE_13__),
      guidedPathways: normalizeJson(_data_chapterGuidedPathway_json__WEBPACK_IMPORTED_MODULE_14__),
      chapterGentleStarts: normalizeJson(_data_chapterGentleStart_json__WEBPACK_IMPORTED_MODULE_15__),
      sectionStatsByChapter: normalizeJson(_data_chapterSectionStats_json__WEBPACK_IMPORTED_MODULE_16__),
      chapterPlanGuides: normalizeJson(_data_chapterPlanGuides_json__WEBPACK_IMPORTED_MODULE_20__),
      flexiblePlanTracks: [],
      flexibleChapterNotes: [],
      homework: normalizeJson(_data_homework_json__WEBPACK_IMPORTED_MODULE_7__),
      dailyMicroChallenges: {},
      flexibleTracksRequest: null,
      flexibleNotesRequest: null,
      dailyChallengesRequest: null,
      chapterVideos: [],
      chapterVideoMap: {},
      lessonMap: {},
      missionMap: {},
      duasMap: {},
      quizMap: {},
      homeworkMap: {},
      chapterResourcesMap: {},
      chapterKeyInsightsMap: {},
      toneFocusMap: {},
      guidedPathwayMap: {},
      gentleStartMap: {},
      sectionStatsMapByChapter: {},
      chapterPlanMap: {},
      dosDontsMap: {},
      faqChapterMap: {},
      commonQuestionChapterMap: {},
      homeworkCache: {},
      homeworkSliceCache: {},
      chapterQuizPassed: false,
      quizQuestions: [],
      currentQuestionIndex: 0,
      quizStatus: null,
      quizFeedback: '',
      selectedOption: null,
      quizCorrectCount: 0,
      quizRequiredCorrect: 2,
      mobileNavOpen: false,
      mobileNavFocusOrigin: null,
      maxStepReached: 1,
      selectedPill: 1,
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false,
      faqAccordionState: 0,
      commonAccordionState: 0,
      showResourceModal: false,
      activeResource: null,
      showVideoModal: false,
      showHelpModal: false,
      showSearchInfoModal: false,
      showCompletionModal: false,
      nextPhaseAmountMinor: 199,
      helpGuideSteps: REVERTS_GUIDE_STEPS,
      shareFriendStatus: '',
      offlineActionStatus: '',
      onboarding: normalizeJson(_data_onboarding_json__WEBPACK_IMPORTED_MODULE_9__),
      resourceCopyStatus: '',
      resourceSearchTerm: '',
      resourceSearchMode: 'any',
      globalSearchCategory: 'all',
      confettiPromise: null,
      confettiLauncher: null,
      lessonShareStatus: '',
      duaShareStatus: '',
      overviewFontScale: DEFAULT_OVERVIEW_FONT_SCALE,
      duaFontScale: DEFAULT_DUA_FONT_SCALE,
      globalFontScale: DEFAULT_GLOBAL_FONT_SCALE,
      fontScaleSessionId: '',
      sectionFontScales: {
        globalSearch: DEFAULT_SECTION_FONT_SCALE,
        lessonFocus: DEFAULT_SECTION_FONT_SCALE,
        learningPaths: DEFAULT_SECTION_FONT_SCALE,
        guidedPathway: DEFAULT_SECTION_FONT_SCALE,
        shareFriend: DEFAULT_SECTION_FONT_SCALE,
        dosDonts: DEFAULT_SECTION_FONT_SCALE,
        duas: DEFAULT_SECTION_FONT_SCALE,
        revertStories: DEFAULT_SECTION_FONT_SCALE,
        keyInsights: DEFAULT_SECTION_FONT_SCALE,
        shareUplift: DEFAULT_SECTION_FONT_SCALE,
        chapterTool: DEFAULT_SECTION_FONT_SCALE,
        commonQuestions: DEFAULT_SECTION_FONT_SCALE,
        motivation: DEFAULT_SECTION_FONT_SCALE,
        resources: DEFAULT_SECTION_FONT_SCALE,
        chapterQuiz: DEFAULT_SECTION_FONT_SCALE
      },
      lessonOverviewRead: {},
      curatedHighlightCompletion: {},
      sectionVisibility: {},
      cardVisibility: {},
      copyAlertMessage: '',
      copyAlertType: 'info',
      showCopyAlert: false,
      uiErrorMessage: '',
      activeSectionJumpId: '',
      copyAlertTimeout: null,
      lastIncorrectExplanation: null,
      activeVideoId: null,
      secondarySectionsReady: false,
      guidanceCardCache: {},
      lessonDepartmentsCache: {},
      homeworkVisibleCount: 4,
      faqDisplayLimit: 4,
      commonFaqDisplayLimit: 5,
      reduceMotionEnabled: false,
      motionMediaQuery: null,
      motionMediaListener: null,
      previewDesktopMediaQuery: null,
      previewDesktopListener: null,
      previewAutoplayEnabled: false,
      currentStreakDays: 0,
      lastStreakDateKey: '',
      dailyChallengeStatus: {},
      dailyChallengeDate: '',
      confettiEnabled: false,
      clipPlayerId: null,
      previewVideoId: null,
      gentleStepCompletion: {},
      videoSearchTerm: '',
      videoDurationFilter: 'all',
      videoGenderFilter: 'all',
      progressSyncHandler: null,
      videoBackgroundFilter: 'all',
      durationFilters: DURATION_FILTERS,
      showScrollFab: false,
      genderFilters: GENDER_FILTERS,
      showVideoFilters: true,
      viewMode: 'serene',
      viewModeOptions: [{
        value: 'serene',
        label: 'Serene',
        icon: 'bi-water'
      }, {
        value: 'focus',
        label: 'Focus',
        icon: 'bi-bullseye'
      }, {
        value: 'contrast',
        label: 'Contrast',
        icon: 'bi-circle-half'
      }],
      reflectionNotes: {},
      reflectionInput: '',
      reflectionStatus: '',
      successAlertTimeout: null,
      troubleshootingGuides: TROUBLESHOOTING_GUIDES,
      sessionId: '',
      sessionReturning: false,
      previousSessionChapter: null,
      sessionBannerVisible: false,
      touchPlaybackTriggered: false,
      touchPlaybackTimer: null,
      scrollTopRetryTimer: null,
      scrollListenerTarget: null,
      modalFocusTrapHandler: null,
      lastFocusedElement: null,
      scrollSafetyObserver: null
    };
  },
  computed: {
    currentLesson() {
      return this.lessonMap[this.selectedPill] || this.chapterLessons[0];
    },
    currentChapterKeyInsights() {
      var _this$currentLesson;
      const chapterId = (_this$currentLesson = this.currentLesson) === null || _this$currentLesson === void 0 ? void 0 : _this$currentLesson.chapterId;
      return chapterId == null ? null : this.chapterKeyInsightsMap[chapterId] || null;
    },
    insightsToShow() {
      var _this$currentChapterK, _this$currentLesson2;
      return (_this$currentChapterK = this.currentChapterKeyInsights) !== null && _this$currentChapterK !== void 0 && (_this$currentChapterK = _this$currentChapterK.keyInsights) !== null && _this$currentChapterK !== void 0 && _this$currentChapterK.length ? this.currentChapterKeyInsights.keyInsights : ((_this$currentLesson2 = this.currentLesson) === null || _this$currentLesson2 === void 0 ? void 0 : _this$currentLesson2.keyInsights) || [];
    },
    currentLessonOverview() {
      const chapterId = this.normalizeChapterId();
      if (chapterId == null) return null;
      return this.lessonMap[chapterId] || null;
    },
    currentChapterResources() {
      var _this$selectedPill, _this$currentLesson3;
      const chapterId = (_this$selectedPill = this.selectedPill) !== null && _this$selectedPill !== void 0 ? _this$selectedPill : (_this$currentLesson3 = this.currentLesson) === null || _this$currentLesson3 === void 0 ? void 0 : _this$currentLesson3.chapterId;
      if (chapterId == null) return null;
      return this.chapterResourcesMap[chapterId] || null;
    },
    currentChapterResourcesLayout() {
      const base = this.currentChapterResources;
      if (!base) return null;
      const sections = Array.isArray(base.sections) ? base.sections : [];
      const visibleSections = sections.filter(section => {
        const normalizedTitle = String((section === null || section === void 0 ? void 0 : section.title) || '').trim().toLowerCase();
        return !HIDDEN_RESOURCE_SECTION_TITLES.has(normalizedTitle);
      });
      const sectionMap = new Map(visibleSections.map(section => [section.title, section]));
      const normalizedSections = [...visibleSections];
      RESOURCE_SECTION_TITLES.forEach(title => {
        if (sectionMap.has(title)) return;
        normalizedSections.push({
          title,
          items: [{
            label: 'Coming soon',
            entries: ['Resources for this section will be added soon.']
          }]
        });
      });
      return _objectSpread(_objectSpread({}, base), {}, {
        sections: normalizedSections
      });
    },
    resourceSearchTokens() {
      return this.tokenizeSearchTerm(this.resourceSearchTerm);
    },
    resourceSearchTokensNormalized() {
      return this.resourceSearchTokens.map(token => token.toLowerCase());
    },
    resourceSearchTokensWithClasses() {
      return this.resourceSearchTokens.map((token, index) => ({
        token,
        className: RESOURCE_HIGHLIGHT_CLASSES[index % RESOURCE_HIGHLIGHT_CLASSES.length]
      }));
    },
    resourceHighlightConfig() {
      if (!this.resourceSearchTokensWithClasses.length) {
        return {
          regex: null,
          tokenMap: new Map()
        };
      }
      const tokenMap = new Map();
      this.resourceSearchTokensWithClasses.forEach(({
        token,
        className
      }) => {
        const key = token.toLowerCase();
        if (!tokenMap.has(key)) {
          tokenMap.set(key, className);
        }
      });
      const sortedTokens = [...this.resourceSearchTokensWithClasses].sort((a, b) => b.token.length - a.token.length);
      const pattern = sortedTokens.map(tokenConfig => this.escapeRegExp(tokenConfig.token)).join('|');
      return {
        regex: pattern ? new RegExp(pattern, 'gi') : null,
        tokenMap
      };
    },
    filteredChapterResourcesLayout() {
      const base = this.currentChapterResourcesLayout;
      if (!base) return null;
      const tokens = this.resourceSearchTokensNormalized;
      const hasSearch = tokens.length > 0;
      const matchesTokens = value => this.matchesSearchTokens(value);
      if (!hasSearch) return base;
      const filteredSections = base.sections.reduce((sections, section) => {
        const sectionTitleMatch = matchesTokens(section.title);
        const items = (section.items || []).reduce((itemsAcc, item) => {
          const entries = Array.isArray(item.entries) ? item.entries : [];
          const labelMatch = matchesTokens(item.label);
          let nextEntries = entries;
          if (!sectionTitleMatch && !labelMatch) {
            nextEntries = entries.filter(entry => matchesTokens(entry));
          }
          if (nextEntries.length) {
            itemsAcc.push(_objectSpread(_objectSpread({}, item), {}, {
              entries: nextEntries
            }));
          }
          return itemsAcc;
        }, []);
        if (items.length) {
          sections.push(_objectSpread(_objectSpread({}, section), {}, {
            items
          }));
        }
        return sections;
      }, []);
      return _objectSpread(_objectSpread({}, base), {}, {
        sections: filteredSections
      });
    },
    resourceSectionsWithKeys() {
      const layout = this.filteredChapterResourcesLayout;
      if (!layout) return [];
      const sections = Array.isArray(layout.sections) ? layout.sections : [];
      return sections.map((section, index) => _objectSpread(_objectSpread({}, section), {}, {
        displayTitle: RESOURCE_SECTION_TITLE_LABELS[section.title] || section.title,
        toggleKey: this.sectionToggleId('resource', section, index)
      }));
    },
    globalSearchActive() {
      return this.resourceSearchTokensNormalized.length > 0;
    },
    globalSearchResults() {
      var _this$currentLesson4, _this$currentLesson5, _this$currentLessonOv, _dosDonts$dos, _dosDonts$donts, _resourceLayout$secti;
      if (!this.globalSearchActive) return [];
      const results = [];
      const pushResult = entry => {
        const result = this.buildSearchResult(entry);
        if (result) results.push(result);
      };
      pushResult({
        section: 'Lesson Overview',
        title: ((_this$currentLesson4 = this.currentLesson) === null || _this$currentLesson4 === void 0 ? void 0 : _this$currentLesson4.title) || '',
        body: ((_this$currentLesson5 = this.currentLesson) === null || _this$currentLesson5 === void 0 ? void 0 : _this$currentLesson5.summary) || ''
      });
      if (this.currentToneFocusText) {
        pushResult({
          section: 'Focus of This Lesson',
          title: 'Focus of This Lesson',
          body: this.currentToneFocusText
        });
      }
      const highlights = ((_this$currentLessonOv = this.currentLessonOverview) === null || _this$currentLessonOv === void 0 ? void 0 : _this$currentLessonOv.highlights) || [];
      highlights.forEach(highlight => {
        pushResult({
          section: 'Learning Paths',
          title: highlight.label || highlight.heading || '',
          body: highlight.description || highlight.content || ''
        });
      });
      const overviewSections = this.overviewSectionsWithKeys;
      if (overviewSections.length) {
        overviewSections.forEach(section => {
          pushResult({
            section: 'Learning Paths',
            title: section.heading || '',
            body: section.content || '',
            meta: section.references || ''
          });
          if (section.resources) {
            pushResult({
              section: 'Learning Paths',
              title: section.heading || '',
              body: section.resources || '',
              meta: 'Resource link'
            });
          }
        });
      } else {
        this.lessonSectionsWithKeys.forEach(section => {
          pushResult({
            section: 'Learning Paths',
            title: section.title || '',
            body: section.content || '',
            meta: section.references || ''
          });
          if (section.deepDive) {
            pushResult({
              section: 'Learning Paths',
              title: section.deepDive.title || section.title || '',
              body: section.deepDive.content || '',
              meta: 'Deep dive'
            });
          }
          if (section.resources) {
            pushResult({
              section: 'Learning Paths',
              title: section.title || '',
              body: section.resources || '',
              meta: 'Resource link'
            });
          }
        });
      }
      this.pathwayClips.forEach(clip => {
        pushResult({
          section: 'Guided Pathway',
          title: clip.title || '',
          body: clip.description || clip.summary || ''
        });
      });
      const dosDonts = this.currentDosDonts;
      if (dosDonts !== null && dosDonts !== void 0 && (_dosDonts$dos = dosDonts.dos) !== null && _dosDonts$dos !== void 0 && _dosDonts$dos.length) {
        dosDonts.dos.forEach(item => {
          pushResult({
            section: "Do's and Don'ts",
            title: dosDonts.chapter || '',
            body: item.text || ''
          });
        });
      }
      if (dosDonts !== null && dosDonts !== void 0 && (_dosDonts$donts = dosDonts.donts) !== null && _dosDonts$donts !== void 0 && _dosDonts$donts.length) {
        dosDonts.donts.forEach(item => {
          pushResult({
            section: "Do's and Don'ts",
            title: dosDonts.chapter || '',
            body: item.text || ''
          });
        });
      }
      this.currentDuas.forEach(dua => {
        pushResult({
          section: 'Duas',
          title: dua.title || '',
          body: `${dua.english || ''} ${dua.arabic || ''} ${dua.reference || ''}`.trim()
        });
      });
      this.insightsToShow.forEach(insight => {
        pushResult({
          section: 'Key Insights',
          body: insight || ''
        });
      });
      this.revertStories.forEach(video => {
        pushResult({
          section: 'Revert Stories',
          title: video.title || '',
          body: `${video.description || ''} ${video.duration || ''}`.trim()
        });
      });
      this.chapterCommonPanels.forEach(panel => {
        pushResult({
          section: 'Common Questions',
          title: panel.title || '',
          body: panel.body || ''
        });
      });
      const resourceLayout = this.currentChapterResourcesLayout;
      if (resourceLayout !== null && resourceLayout !== void 0 && (_resourceLayout$secti = resourceLayout.sections) !== null && _resourceLayout$secti !== void 0 && _resourceLayout$secti.length) {
        resourceLayout.sections.forEach(section => {
          const items = section.items || [];
          items.forEach(item => {
            const entries = Array.isArray(item.entries) ? item.entries : [];
            const label = item.label || section.title || '';
            entries.forEach(entry => {
              pushResult({
                section: 'Resources',
                title: label,
                body: entry || '',
                meta: section.title || ''
              });
            });
          });
        });
      }
      return results;
    },
    globalSearchResultsBySection() {
      const grouped = new Map();
      this.globalSearchResults.forEach(result => {
        if (!grouped.has(result.section)) {
          grouped.set(result.section, []);
        }
        grouped.get(result.section).push(result);
      });
      return GLOBAL_SEARCH_SECTIONS.reduce((ordered, section) => {
        const results = grouped.get(section.key);
        if (results !== null && results !== void 0 && results.length) {
          ordered.push({
            section: section.key,
            results
          });
        }
        return ordered;
      }, []);
    },
    globalSearchCategoryOptions() {
      const counts = new Map();
      this.globalSearchResultsBySection.forEach(group => {
        counts.set(group.section, group.results.length);
      });
      return GLOBAL_SEARCH_SECTIONS.map(section => {
        const count = counts.get(section.key) || 0;
        const labelSuffix = this.globalSearchActive ? ` (${count})` : '';
        return {
          value: section.key,
          label: `${section.label}${labelSuffix}`,
          count
        };
      });
    },
    globalSearchResultsFilteredByCategory() {
      if (this.globalSearchCategory === 'all') return this.globalSearchResultsBySection;
      const group = this.globalSearchResultsBySection.find(entry => entry.section === this.globalSearchCategory);
      return group ? [group] : [];
    },
    globalSearchResultsCount() {
      return this.globalSearchResultsFilteredByCategory.reduce((total, group) => total + group.results.length, 0);
    },
    globalSearchSectionsCount() {
      return this.globalSearchResultsFilteredByCategory.length;
    },
    sectionJumpLinks() {
      return [{
        id: 'global-search-section',
        label: 'Global Search',
        icon: 'bi-search'
      }, {
        id: 'lesson-focus-section',
        label: 'Focus of Lesson',
        icon: 'bi-brightness-high-fill'
      }, {
        id: 'learning-paths-section',
        label: 'Learning Paths',
        icon: 'bi-box-seam-fill'
      }, {
        id: 'guided-pathway-section',
        label: 'Guided Pathway',
        icon: 'bi-controller',
        visible: this.pathwayClips.length > 0
      }, {
        id: 'share-friend-section',
        label: 'Share With Friends',
        icon: 'bi-share-fill'
      }, {
        id: 'dos-donts-section',
        label: "Do's and Don'ts",
        icon: 'bi-shield-fill-check'
      }, {
        id: 'duas-section',
        label: 'Duas to Carry',
        icon: 'bi-bookmark-star-fill',
        visible: this.currentDuas.length > 0
      }, {
        id: 'revert-stories-section',
        label: 'Revert Stories',
        icon: 'bi-people-fill'
      }, {
        id: 'key-insights-section',
        label: 'Key Insights',
        icon: 'bi-lightbulb-fill',
        visible: this.secondarySectionsReady && this.insightsToShow.length > 0
      }, {
        id: 'chapter-tool-section',
        label: 'Chapter Tool',
        icon: 'bi-tools',
        visible: Boolean(this.chapterTool)
      }, {
        id: 'common-questions-section',
        label: 'Common Questions',
        icon: 'bi-question-circle-fill'
      }, {
        id: 'resources-section',
        label: 'References',
        icon: 'bi-book'
      }, {
        id: 'chapter-quiz-section',
        label: 'Chapter Quiz',
        icon: 'bi-journal-check'
      }].filter(link => link.visible !== false);
    },
    currentChapterPlans() {
      var _this$currentLesson6;
      const chapterId = (_this$currentLesson6 = this.currentLesson) === null || _this$currentLesson6 === void 0 ? void 0 : _this$currentLesson6.chapterId;
      const entry = chapterId == null ? null : this.chapterPlanMap[chapterId];
      return (entry === null || entry === void 0 ? void 0 : entry.plans) || [];
    },
    isCurrentLessonOverviewRead() {
      var _this$currentLesson7;
      const chapterId = (_this$currentLesson7 = this.currentLesson) === null || _this$currentLesson7 === void 0 ? void 0 : _this$currentLesson7.chapterId;
      return Boolean(chapterId && this.lessonOverviewRead[chapterId]);
    },
    overviewSections() {
      var _this$currentLessonOv2;
      return ((_this$currentLessonOv2 = this.currentLessonOverview) === null || _this$currentLessonOv2 === void 0 ? void 0 : _this$currentLessonOv2.overview) || [];
    },
    overviewSectionsWithKeys() {
      return this.overviewSections.map((section, index) => _objectSpread(_objectSpread({}, section), {}, {
        toggleKey: this.sectionToggleId('overview', section, index)
      }));
    },
    lessonSectionsWithKeys() {
      var _this$currentLesson8;
      const sections = ((_this$currentLesson8 = this.currentLesson) === null || _this$currentLesson8 === void 0 ? void 0 : _this$currentLesson8.sections) || [];
      return sections.map((section, index) => _objectSpread(_objectSpread({}, section), {}, {
        toggleKey: this.sectionToggleId('lesson', section, index)
      }));
    },
    learningPathsMeta() {
      var _this$currentLessonOv3;
      const highlightChunks = (((_this$currentLessonOv3 = this.currentLessonOverview) === null || _this$currentLessonOv3 === void 0 ? void 0 : _this$currentLessonOv3.highlights) || []).flatMap(highlight => [highlight.label || highlight.heading || '', highlight.description || highlight.content || '']);
      const sections = this.overviewSectionsWithKeys.length ? this.overviewSectionsWithKeys : this.lessonSectionsWithKeys;
      const sectionChunks = sections.reduce((chunks, section) => {
        var _section$deepDive;
        if (section.heading || section.title) chunks.push(section.heading || section.title);
        if (section.content) chunks.push(section.content);
        if (section.references) chunks.push(section.references);
        if ((_section$deepDive = section.deepDive) !== null && _section$deepDive !== void 0 && _section$deepDive.content) chunks.push(section.deepDive.content);
        return chunks;
      }, []);
      return this.buildSectionMeta([...highlightChunks, ...sectionChunks]);
    },
    dosDontsMeta() {
      var _this$currentDosDonts, _this$currentDosDonts2;
      const dos = ((_this$currentDosDonts = this.currentDosDonts) === null || _this$currentDosDonts === void 0 ? void 0 : _this$currentDosDonts.dos) || [];
      const donts = ((_this$currentDosDonts2 = this.currentDosDonts) === null || _this$currentDosDonts2 === void 0 ? void 0 : _this$currentDosDonts2.donts) || [];
      const chunks = [...dos.map(item => item.text || ''), ...donts.map(item => item.text || '')];
      return this.buildSectionMeta(chunks);
    },
    duasMeta() {
      const chunks = (this.currentDuas || []).flatMap(dua => [dua.title, dua.arabic, dua.english, dua.reference]);
      return this.buildSectionMeta(chunks);
    },
    keyInsightsMeta() {
      return this.buildSectionMeta(this.insightsToShow || []);
    },
    commonQuestionsMeta() {
      const chunks = this.chapterCommonPanels.flatMap(panel => [panel.title, panel.body]);
      return this.buildSectionMeta(chunks);
    },
    quizHintExplanation() {
      var _this$lastIncorrectEx, _this$currentQuestion;
      return ((_this$lastIncorrectEx = this.lastIncorrectExplanation) === null || _this$lastIncorrectEx === void 0 ? void 0 : _this$lastIncorrectEx.text) || ((_this$currentQuestion = this.currentQuestion) === null || _this$currentQuestion === void 0 ? void 0 : _this$currentQuestion.explanation) || '';
    },
    quizHintSectionId() {
      var _this$lastIncorrectEx2, _question$sectionInde, _this$currentLesson9;
      if ((_this$lastIncorrectEx2 = this.lastIncorrectExplanation) !== null && _this$lastIncorrectEx2 !== void 0 && _this$lastIncorrectEx2.sectionId) {
        return this.lastIncorrectExplanation.sectionId;
      }
      const question = this.currentQuestion;
      if (!question) return '';
      const sectionIndex = (_question$sectionInde = question.sectionIndex) !== null && _question$sectionInde !== void 0 ? _question$sectionInde : 0;
      const section = (_this$currentLesson9 = this.currentLesson) === null || _this$currentLesson9 === void 0 || (_this$currentLesson9 = _this$currentLesson9.sections) === null || _this$currentLesson9 === void 0 ? void 0 : _this$currentLesson9[sectionIndex];
      return section ? `section-${this.selectedPill}-${sectionIndex}` : '';
    },
    chapterCommonPanels() {
      const chapterId = this.normalizeChapterId();
      if (chapterId == null) return [];
      const chapter = this.commonQuestionChapterMap[chapterId];
      return (chapter === null || chapter === void 0 ? void 0 : chapter.faqs) || [];
    },
    chapterFaqPanels() {
      const chapterId = this.normalizeChapterId();
      if (chapterId == null) return [];
      const chapter = this.faqChapterMap[chapterId];
      return (chapter === null || chapter === void 0 ? void 0 : chapter.faqs) || [];
    },
    progressPercentage() {
      return (this.maxStepReached - 1) / this.roadmapData.length * 100;
    },
    dailyChallenges() {
      var _this$currentLesson0;
      this.ensureDailyMicroChallengesLoaded();
      const chapterId = (_this$currentLesson0 = this.currentLesson) === null || _this$currentLesson0 === void 0 ? void 0 : _this$currentLesson0.chapterId;
      const prompts = this.dailyMicroChallenges[chapterId] || DEFAULT_DAILY_CHALLENGES;
      return prompts.map(prompt => {
        const key = this.dailyChallengeStorageKey(prompt.id, chapterId);
        return _objectSpread(_objectSpread({}, prompt), {}, {
          storageKey: key,
          completed: Boolean(this.dailyChallengeStatus[key])
        });
      });
    },
    dailyChallengeProgressPercent() {
      const total = this.dailyChallenges.length;
      if (!total) return 0;
      const completed = this.dailyChallenges.filter(challenge => challenge.completed).length;
      return Math.round(completed / total * 100);
    },
    dailyChallengeCompletionLabel() {
      const total = this.dailyChallenges.length;
      if (!total) return 'Micro-challenges are loading';
      const completed = this.dailyChallenges.filter(challenge => challenge.completed).length;
      if (completed === total) return 'All challenges marked complete today';
      return `${completed}/${total} completed`;
    },
    dailyChallengeCompletionCount() {
      return this.dailyChallenges.filter(challenge => challenge.completed).length;
    },
    currentReflectionNote() {
      var _this$currentLesson1;
      const chapterId = (_this$currentLesson1 = this.currentLesson) === null || _this$currentLesson1 === void 0 ? void 0 : _this$currentLesson1.chapterId;
      return chapterId ? this.reflectionNotes[chapterId] || '' : '';
    },
    completedChapters() {
      return this.maxStepReached - 1;
    },
    totalChapters() {
      return this.roadmapData.length;
    },
    currentMission() {
      return this.missionMap[this.selectedPill] || this.missions[0];
    },
    currentDuas() {
      return this.duasMap[this.selectedPill] || [];
    },
    currentQuizData() {
      return this.quizMap[this.selectedPill] || [];
    },
    currentQuestion() {
      return this.quizQuestions[this.currentQuestionIndex];
    },
    currentHomework() {
      return this.getHomeworkContentForChapter(this.selectedPill);
    },
    visibleHomework() {
      return this.getVisibleHomeworkForChapter(this.selectedPill, this.homeworkVisibleCount);
    },
    homeworkMoreAvailable() {
      return this.currentHomework.length > this.homeworkVisibleCount;
    },
    visibleFaqPanels() {
      return this.chapterFaqPanels.slice(0, this.faqDisplayLimit);
    },
    visibleCommonPanels() {
      return this.chapterCommonPanels.slice(0, this.commonFaqDisplayLimit);
    },
    faqHasMore() {
      return this.chapterFaqPanels.length > this.faqDisplayLimit;
    },
    commonFaqHasMore() {
      return this.chapterCommonPanels.length > this.commonFaqDisplayLimit;
    },
    chapterTool() {
      return CHAPTER_TOOL_MAP[this.selectedPill] || null;
    },
    chapterToolComponent() {
      var _this$chapterTool;
      return ((_this$chapterTool = this.chapterTool) === null || _this$chapterTool === void 0 ? void 0 : _this$chapterTool.component) || null;
    },
    guidanceCards() {
      var _this$currentLesson10;
      const chapterId = (_this$currentLesson10 = this.currentLesson) === null || _this$currentLesson10 === void 0 ? void 0 : _this$currentLesson10.chapterId;
      if (!chapterId) return [];
      if (!this.guidanceCardCache[chapterId]) {
        this.guidanceCardCache[chapterId] = this.generateGuidanceCards(chapterId);
      }
      return this.guidanceCardCache[chapterId];
    },
    currentToneFocusText() {
      var _this$currentLesson11;
      const chapterId = (_this$currentLesson11 = this.currentLesson) === null || _this$currentLesson11 === void 0 ? void 0 : _this$currentLesson11.chapterId;
      const entry = chapterId == null ? null : this.toneFocusMap[chapterId];
      return (entry === null || entry === void 0 ? void 0 : entry.toneFocus) || '';
    },
    guidedPathwayCards() {
      var _this$currentLesson12;
      const chapterId = (_this$currentLesson12 = this.currentLesson) === null || _this$currentLesson12 === void 0 ? void 0 : _this$currentLesson12.chapterId;
      const entry = chapterId == null ? null : this.guidedPathwayMap[chapterId];
      return (entry === null || entry === void 0 ? void 0 : entry.pathway) || this.guidanceCards;
    },
    currentFlexibleTracks() {
      var _this$currentLesson13, _this$flexiblePlanTra;
      this.ensureFlexiblePlanTracksLoaded();
      const chapterId = (_this$currentLesson13 = this.currentLesson) === null || _this$currentLesson13 === void 0 ? void 0 : _this$currentLesson13.chapterId;
      return ((_this$flexiblePlanTra = this.flexiblePlanTracks.find(entry => entry.chapterId === chapterId)) === null || _this$flexiblePlanTra === void 0 ? void 0 : _this$flexiblePlanTra.tracks) || [];
    },
    currentFlexibleNote() {
      var _this$currentLesson14;
      this.ensureFlexibleChapterNotesLoaded();
      const chapterId = (_this$currentLesson14 = this.currentLesson) === null || _this$currentLesson14 === void 0 ? void 0 : _this$currentLesson14.chapterId;
      return this.flexibleChapterNotes.find(item => item.chapterId === chapterId) || null;
    },
    currentGentleStartSteps() {
      var _this$currentLesson15;
      const chapterId = (_this$currentLesson15 = this.currentLesson) === null || _this$currentLesson15 === void 0 ? void 0 : _this$currentLesson15.chapterId;
      const entry = chapterId == null ? null : this.gentleStartMap[chapterId];
      return (entry === null || entry === void 0 ? void 0 : entry.steps) || this.currentOnboardingSteps;
    },
    gentleStartProgress() {
      const steps = this.currentGentleStartSteps || [];
      const total = steps.length;
      if (!total) return {
        total: 0,
        completed: 0,
        percent: 0
      };
      const completed = steps.reduce((count, _, index) => count + (this.isGentleStepCompleted(index) ? 1 : 0), 0);
      const percent = total ? Math.round(completed / total * 100) : 0;
      return {
        total,
        completed,
        percent
      };
    },
    sectionStatsMap() {
      var _this$currentLesson16;
      const chapterId = (_this$currentLesson16 = this.currentLesson) === null || _this$currentLesson16 === void 0 ? void 0 : _this$currentLesson16.chapterId;
      const entry = chapterId == null ? null : this.sectionStatsMapByChapter[chapterId];
      return (entry === null || entry === void 0 ? void 0 : entry.sectionStats) || [];
    },
    motivationalMessage() {
      return this.chapterQuizPassed ? `Chapter ${this.selectedPill} cleared your growing understanding is inviting others to join.` : `You're working through Chapter ${this.selectedPill}. Stay curious, every insight builds momentum.`;
    },
    motivationalHint() {
      return this.chapterQuizPassed ? 'Celebrate the milestone, then absorb the next lesson with the same warmth.' : 'Take a few deep breaths, revisit a favorite dua, and keep exploring.';
    },
    alertClass() {
      return this.copyAlertType === 'success' ? 'alert-success' : this.copyAlertType === 'danger' ? 'alert-danger' : 'alert-info';
    },
    iconClass() {
      return this.copyAlertType === 'danger' ? 'bi bi-exclamation-triangle-fill text-danger' : 'bi bi-clipboard-check-fill text-teal';
    },
    nextChapterPreview() {
      const nextId = this.selectedPill + 1;
      if (nextId > this.roadmapData.length) return null;
      const nextChapter = this.roadmapData.find(c => c.id === nextId);
      if (!nextChapter) return null;
      const lessonPreview = this.chapterLessons.find(l => l.chapterId === nextId);
      return {
        id: nextChapter.id,
        title: (lessonPreview === null || lessonPreview === void 0 ? void 0 : lessonPreview.title) || nextChapter.title,
        track: nextChapter.description,
        snippet: (lessonPreview === null || lessonPreview === void 0 ? void 0 : lessonPreview.summary) || nextChapter.description
      };
    },
    quizProgressLabel() {
      return `${this.quizCorrectCount}/${this.quizRequiredCorrect} correct answers`;
    },
    quizStageLabel() {
      if (!this.currentQuestion) return 'Quiz ready';
      return `Question ${this.currentQuestionIndex + 1} / ${this.quizQuestions.length}`;
    },
    quizMomentumPercent() {
      const total = this.quizQuestions.length;
      if (!total) return 0;
      const stageValue = this.currentQuestionIndex + (this.quizStatus === 'correct' ? 1 : 0);
      return Math.min(100, Math.round(stageValue / total * 100));
    },
    currentQuizSectionTitle() {
      var _question$sectionInde2, _this$currentLesson17, _this$currentLesson18;
      const question = this.currentQuestion;
      if (!question) return 'Guided insights';
      const sectionIndex = (_question$sectionInde2 = question.sectionIndex) !== null && _question$sectionInde2 !== void 0 ? _question$sectionInde2 : 0;
      const section = (_this$currentLesson17 = this.currentLesson) === null || _this$currentLesson17 === void 0 || (_this$currentLesson17 = _this$currentLesson17.sections) === null || _this$currentLesson17 === void 0 ? void 0 : _this$currentLesson17[sectionIndex];
      return (section === null || section === void 0 ? void 0 : section.title) || (section === null || section === void 0 ? void 0 : section.heading) || ((_this$currentLesson18 = this.currentLesson) === null || _this$currentLesson18 === void 0 ? void 0 : _this$currentLesson18.title) || 'Guided insights';
    },
    lessonDepartments() {
      var _this$currentLesson19;
      const chapterId = (_this$currentLesson19 = this.currentLesson) === null || _this$currentLesson19 === void 0 ? void 0 : _this$currentLesson19.chapterId;
      if (!chapterId) return [];
      if (!this.lessonDepartmentsCache[chapterId]) {
        this.lessonDepartmentsCache[chapterId] = this.generateLessonDepartments(chapterId);
      }
      return this.lessonDepartmentsCache[chapterId];
    },
    currentDosDonts() {
      var _this$currentLesson20;
      const chapterId = (_this$currentLesson20 = this.currentLesson) === null || _this$currentLesson20 === void 0 ? void 0 : _this$currentLesson20.chapterId;
      return chapterId == null ? null : this.dosDontsMap[chapterId] || null;
    },
    chapterVideoEntry() {
      var _this$currentLesson21;
      const chapterId = (_this$currentLesson21 = this.currentLesson) === null || _this$currentLesson21 === void 0 ? void 0 : _this$currentLesson21.chapterId;
      return this.chapterVideoMap[chapterId] || null;
    },
    revertStories() {
      var _this$chapterVideoEnt, _this$chapterVideoEnt2;
      return ((_this$chapterVideoEnt = this.chapterVideoEntry) === null || _this$chapterVideoEnt === void 0 ? void 0 : _this$chapterVideoEnt.revertStories) || ((_this$chapterVideoEnt2 = this.chapterVideoEntry) === null || _this$chapterVideoEnt2 === void 0 ? void 0 : _this$chapterVideoEnt2.videos) || [];
    },
    hasStoryFilters() {
      return this.revertStories.length >= MIN_STORIES_FOR_FILTERS;
    },
    filteredRevertStories() {
      const stories = this.revertStories || [];
      const term = this.videoSearchTerm.trim().toLowerCase();
      return stories.filter(video => {
        const text = `${video.title || ''} ${video.description || ''}`.toLowerCase();
        if (term && !text.includes(term)) return false;
        if (this.videoDurationFilter !== 'all') {
          const seconds = this.getVideoDurationSeconds(video);
          if (seconds <= 0) return false;
          if (this.videoDurationFilter === 'short' && seconds >= 150) return false;
          if (this.videoDurationFilter === 'medium' && (seconds < 150 || seconds > 240)) return false;
          if (this.videoDurationFilter === 'long' && seconds <= 240) return false;
        }
        if (this.videoGenderFilter !== 'all') {
          const gender = this.deriveVideoGender(video);
          if (gender !== this.videoGenderFilter) return false;
        }
        if (this.videoBackgroundFilter !== 'all') {
          const tags = this.videoTags(video);
          if (!tags.includes(this.videoBackgroundFilter)) return false;
        }
        return true;
      });
    },
    backgroundFilterOptions() {
      const tags = new Set();
      this.revertStories.forEach(video => {
        this.videoTags(video).forEach(tag => {
          if (tag) tags.add(tag);
        });
      });
      const orderedTags = Array.from(tags).sort((a, b) => {
        const aIndex = BACKGROUND_TAG_PRIORITY.indexOf(a);
        const bIndex = BACKGROUND_TAG_PRIORITY.indexOf(b);
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
      return [{
        value: 'all',
        label: 'All backgrounds'
      }, ...orderedTags.map(tag => ({
        value: tag,
        label: tag
      }))];
    },
    revertStoriesPreview() {
      return this.revertStories.slice(0, 4);
    },
    pathwayClips() {
      var _this$chapterVideoEnt3;
      return ((_this$chapterVideoEnt3 = this.chapterVideoEntry) === null || _this$chapterVideoEnt3 === void 0 ? void 0 : _this$chapterVideoEnt3.pathwayClips) || [];
    },
    currentOnboardingSteps() {
      var _this$onboarding$find;
      const chapterId = this.normalizeChapterId();
      if (chapterId == null) return [];
      return ((_this$onboarding$find = this.onboarding.find(o => o.chapterId === chapterId)) === null || _this$onboarding$find === void 0 ? void 0 : _this$onboarding$find.steps) || [];
    },
    nextPhaseFlexibleStripeUrl() {
      const envUrl = typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_NEXT_PHASE_FLEX_URL ? process.env.MIX_STRIPE_NEXT_PHASE_FLEX_URL : null;
      const donateUrl = typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_DONATE_URL ? process.env.MIX_STRIPE_DONATE_URL : null;
      const appConfigUrl = typeof window !== 'undefined' && window.appConfig && window.appConfig.stripeNextPhaseFlexibleUrl ? window.appConfig.stripeNextPhaseFlexibleUrl : null;
      if (envUrl) return envUrl;
      if (appConfigUrl) return appConfigUrl;
      if (donateUrl) return donateUrl;
      return DEFAULT_STRIPE_DONATE_URL;
    },
    nextPhaseStripeUrl() {
      const envUrl = typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_NEXT_PHASE_URL ? process.env.MIX_STRIPE_NEXT_PHASE_URL : null;
      const appConfigUrl = typeof window !== 'undefined' && window.appConfig && window.appConfig.stripeNextPhaseUrl ? window.appConfig.stripeNextPhaseUrl : null;
      if (envUrl) return envUrl;
      if (appConfigUrl) return appConfigUrl;
      return `${DEFAULT_STRIPE_DONATE_URL}?amount=${this.nextPhaseAmountMinor}`;
    },
    donationStripeBaseUrl() {
      const envUrl = typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_DONATE_URL ? process.env.MIX_STRIPE_DONATE_URL : null;
      const appConfigUrl = typeof window !== 'undefined' && window.appConfig && window.appConfig.stripeDonateUrl ? window.appConfig.stripeDonateUrl : null;
      return envUrl || appConfigUrl || DEFAULT_STRIPE_DONATE_URL;
    },
    intermediateUnlockStripeUrl() {
      return this.stripeAmountUrl(INTERMEDIATE_UNLOCK_AMOUNT_MINOR);
    },
    intermediateAdvancedBundleStripeUrl() {
      return this.stripeAmountUrl(INTERMEDIATE_ADVANCED_BUNDLE_AMOUNT_MINOR);
    },
    donationStripeUrl() {
      return this.donationStripeBaseUrl;
    },
    isAnyModalOpen() {
      return Boolean(this.showSearchInfoModal || this.showResourceModal || this.showVideoModal || this.showHelpModal || this.showCompletionModal);
    }
  },
  watch: {
    mobileNavOpen(open) {
      this.syncMobileNavScrollLock(open);
    },
    selectedPill() {
      // Reload the chapter experience whenever navigation moves to another pill.
      this.chapterQuizPassed = false;
      this.resetQuizSet();
      this.faqAccordionState = null;
      this.commonAccordionState = null;
      this.activeVideoId = null;
      this.homeworkVisibleCount = 4;
      this.faqDisplayLimit = 4;
      this.commonFaqDisplayLimit = 5;
      this.activeSectionJumpId = '';
      this.sectionVisibility = {};
      this.cardVisibility = {};
      this.prepareSecondarySections();
      this.syncReflectionInput();
      this.scheduleChapterToolPreload(this.selectedPill);
      this.scheduleChapterToolPreload(this.selectedPill + 1);
      this.$nextTick(() => {
        this.scrollToTop();
        this.scheduleScrollTopRetry();
      });
    },
    chapterQuizPassed(newVal, oldVal) {
      // Celebrate quiz completion with confetti if global settings allow it.
      if (!this.confettiEnabled) return;
      if (newVal && !oldVal) {
        this.launchMicroConfetti();
      }
    },
    // Celebrate finishing the curated micro-challenges for the day.
    dailyChallengeCompletionCount(newVal, oldVal) {
      if (!this.confettiEnabled) return;
      const total = this.dailyChallenges.length;
      if (total > 0 && newVal === total && (!oldVal || oldVal < total)) {
        this.launchMicroConfetti();
      }
    },
    // Reward streak milestones to keep the momentum visually engaging.
    currentStreakDays(newVal, oldVal) {
      if (!this.confettiEnabled) return;
      if (newVal >= 3 && (oldVal || 0) < 3) {
        this.launchMicroConfetti();
      }
    },
    isAnyModalOpen(open) {
      if (open) {
        this.activateModalFocusTrap();
      } else {
        this.deactivateModalFocusTrap();
      }
    },
    showVideoModal(newVal) {
      if (newVal) {
        this.resetVideoFilters();
        this.showVideoFilters = true;
      }
    },
    resourceSearchTerm() {
      this.syncGlobalSearchCategory();
    },
    globalSearchResultsBySection() {
      this.syncGlobalSearchCategory();
    },
    lessonOverviewRead: {
      handler(value) {
        if (typeof window === 'undefined') return;
        try {
          localStorage.setItem('lessonOverviewRead', JSON.stringify(value || {}));
        } catch (err) {
          console.error('Unable to persist lesson overview read state', err);
        }
      },
      deep: true
    },
    curatedHighlightCompletion: {
      handler(value) {
        if (typeof window === 'undefined') return;
        try {
          localStorage.setItem('curatedHighlightCompletion', JSON.stringify(value || {}));
        } catch (err) {
          console.error('Unable to persist curated highlight state', err);
        }
      },
      deep: true
    },
    overviewFontScale() {
      this.persistFontScalePreferences();
    },
    duaFontScale() {
      this.persistFontScalePreferences();
    },
    globalFontScale() {
      this.persistFontScalePreferences();
    },
    sectionFontScales: {
      handler() {
        this.persistFontScalePreferences();
      },
      deep: true
    }
  },
  created() {
    this.buildLookupMaps();
    this.loadChapterVideos();
  },
  mounted() {
    this.initializeFontScaleSession();
    this.syncMobileNavScrollLock(false);
    const saved = localStorage.getItem('maxStepReached');
    if (saved) {
      const value = parseInt(saved, 10);
      const clamped = Number.isFinite(value) ? Math.min(Math.max(1, value), FINAL_CHAPTER_ID) : 1;
      this.maxStepReached = clamped;
      this.selectedPill = clamped;
    }
    this.resetQuizSet();
    this.syncStreakFromStorage();
    this.syncDailyChallenges();
    this.loadGentleStepCompletion();
    this.loadReflectionNotes();
    this.loadViewModePreference();
    this.loadLessonOverviewRead();
    this.loadCuratedHighlightCompletion();
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    this.scrollToTop({
      behavior: 'auto'
    });
    this.prepareSecondarySections();
    this.ensureConfettiScript();
    this.initializeMotionPreference();
    this.initializePreviewAutoplayPreference();
    this.scheduleChapterToolPreload(this.selectedPill);
    this.scheduleChapterToolPreload(this.selectedPill + 1);
    this.bindProgressSync();
    this.bindScrollSafetyObserver();
    window.addEventListener('keydown', this.handleGlobalKeydown);
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
    this.$nextTick(() => {
      this.confettiEnabled = true;
      this.bindScrollListeners();
      this.updateScrollFab();
    });
  },
  errorCaptured(error, _instance, info) {
    this.reportAsyncError(error, info || 'render update');
    return false;
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleGlobalKeydown);
    }
    this.syncMobileNavScrollLock(false);
    this.restoreMobileNavFocusOrigin();
    this.teardownScrollSafetyObserver();
    this.unbindScrollListeners();
    this.teardownMotionPreference();
    this.teardownPreviewAutoplayPreference();
    this.teardownProgressSync();
    this.deactivateModalFocusTrap();
    if (this.scrollTopRetryTimer) {
      clearTimeout(this.scrollTopRetryTimer);
      this.scrollTopRetryTimer = null;
    }
    if (this.touchPlaybackTimer) {
      clearTimeout(this.touchPlaybackTimer);
      this.touchPlaybackTimer = null;
    }
  },
  methods: {
    reportAsyncError(error, context = 'complete this action') {
      const normalizedContext = String(context || 'complete this action').replace(/\.$/, '');
      this.uiErrorMessage = `Unable to ${normalizedContext}. Please try again.`;
      console.error(`[RevertComponent] ${normalizedContext}`, error);
    },
    getActiveModalContent() {
      if (this.showCompletionModal) return this.$refs.completionModalContent;
      if (this.showHelpModal) return this.$refs.helpModalContent;
      if (this.showVideoModal) return this.$refs.videoModalContent;
      if (this.showResourceModal) return this.$refs.resourceModalContent;
      if (this.showSearchInfoModal) return this.$refs.searchInfoModalContent;
      return null;
    },
    getFocusableElements(root) {
      if (!root || typeof root.querySelectorAll !== 'function') return [];
      const selector = ['a[href]', 'button:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(',');
      return Array.from(root.querySelectorAll(selector)).filter(el => {
        if (!(el instanceof HTMLElement)) return false;
        if (el.getAttribute('aria-hidden') === 'true') return false;
        return el.offsetParent !== null;
      });
    },
    closeActiveModal() {
      if (this.showCompletionModal) return this.closeCompletionModal();
      if (this.showHelpModal) return this.closeHelpModal();
      if (this.showVideoModal) return this.closeVideoModal();
      if (this.showResourceModal) return this.closeResourceModal();
      if (this.showSearchInfoModal) return this.closeSearchInfoModal();
    },
    handleModalFocusTrapKeydown(event) {
      if (!this.isAnyModalOpen || !event) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeActiveModal();
        return;
      }
      if (event.key !== 'Tab') return;
      const modalRoot = this.getActiveModalContent();
      if (!modalRoot) return;
      const focusables = this.getFocusableElements(modalRoot);
      if (!focusables.length) {
        event.preventDefault();
        modalRoot.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }
      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    activateModalFocusTrap() {
      if (typeof document === 'undefined') return;
      if (this.modalFocusTrapHandler) return;
      this.lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      this.modalFocusTrapHandler = event => this.handleModalFocusTrapKeydown(event);
      document.addEventListener('keydown', this.modalFocusTrapHandler);
      this.$nextTick(() => {
        const modalRoot = this.getActiveModalContent();
        if (!modalRoot) return;
        if (!modalRoot.hasAttribute('tabindex')) {
          modalRoot.setAttribute('tabindex', '-1');
        }
        const focusables = this.getFocusableElements(modalRoot);
        const target = focusables[0] || modalRoot;
        if (target && typeof target.focus === 'function') {
          target.focus();
        }
      });
    },
    deactivateModalFocusTrap() {
      if (typeof document === 'undefined') return;
      if (this.modalFocusTrapHandler) {
        document.removeEventListener('keydown', this.modalFocusTrapHandler);
        this.modalFocusTrapHandler = null;
      }
      if (this.lastFocusedElement && document.contains(this.lastFocusedElement)) {
        this.lastFocusedElement.focus();
      }
      this.lastFocusedElement = null;
    },
    initializeFontScaleSession() {
      if (typeof window === 'undefined') return;
      this.fontScaleSessionId = this.ensureFontScaleSessionId();
      this.loadFontScalePreferences();
    },
    ensureFontScaleSessionId() {
      if (this.fontScaleSessionId) return this.fontScaleSessionId;
      if (typeof window === 'undefined') return 'server';
      const sessionKey = 'icFontScaleSessionId';
      let sessionId = localStorage.getItem(sessionKey);
      if (!sessionId) {
        sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem(sessionKey, sessionId);
      }
      this.fontScaleSessionId = sessionId;
      return sessionId;
    },
    fontScaleStorageKey() {
      const sessionId = this.ensureFontScaleSessionId();
      return `icFontScales:${sessionId}`;
    },
    loadFontScalePreferences() {
      if (typeof window === 'undefined') return;
      const key = this.fontScaleStorageKey();
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        const stored = JSON.parse(raw);
        const overview = Number(stored === null || stored === void 0 ? void 0 : stored.overviewFontScale);
        const dua = Number(stored === null || stored === void 0 ? void 0 : stored.duaFontScale);
        const global = Number(stored === null || stored === void 0 ? void 0 : stored.globalFontScale);
        if (Number.isFinite(overview)) {
          this.overviewFontScale = Math.min(1.6, Math.max(0.8, overview));
        }
        if (Number.isFinite(dua)) {
          this.duaFontScale = Math.min(1.6, Math.max(0.8, dua));
        }
        if (Number.isFinite(global)) {
          this.globalFontScale = Math.min(1.3, Math.max(0.85, global));
        }
        if (stored !== null && stored !== void 0 && stored.sectionFontScales && typeof stored.sectionFontScales === 'object') {
          const next = _objectSpread({}, this.sectionFontScales);
          Object.entries(stored.sectionFontScales).forEach(([key, value]) => {
            if (!(key in next)) return;
            const numeric = Number(value);
            if (!Number.isFinite(numeric)) return;
            next[key] = Math.min(SECTION_FONT_MAX, Math.max(SECTION_FONT_MIN, numeric));
          });
          this.sectionFontScales = next;
        }
        const isNearLegacyDefault = value => !Number.isFinite(value) || Math.abs(value - 1) < 0.001;
        const storedSectionValues = stored !== null && stored !== void 0 && stored.sectionFontScales && typeof stored.sectionFontScales === 'object' ? Object.values(stored.sectionFontScales).map(Number).filter(Number.isFinite) : [];
        const sectionsAreLegacyDefault = !storedSectionValues.length || storedSectionValues.every(value => Math.abs(value - 1) < 0.001);
        const shouldUpgradeLegacyDefaults = isNearLegacyDefault(overview) && isNearLegacyDefault(dua) && isNearLegacyDefault(global) && sectionsAreLegacyDefault;
        if (shouldUpgradeLegacyDefaults) {
          this.overviewFontScale = DEFAULT_OVERVIEW_FONT_SCALE;
          this.duaFontScale = DEFAULT_DUA_FONT_SCALE;
          this.globalFontScale = DEFAULT_GLOBAL_FONT_SCALE;
          this.sectionFontScales = Object.keys(this.sectionFontScales).reduce((acc, key) => {
            acc[key] = DEFAULT_SECTION_FONT_SCALE;
            return acc;
          }, {});
        }
      } catch (err) {
        console.error('Unable to restore font scale preferences', err);
      }
    },
    persistFontScalePreferences() {
      if (typeof window === 'undefined') return;
      try {
        const key = this.fontScaleStorageKey();
        const payload = {
          overviewFontScale: this.overviewFontScale,
          duaFontScale: this.duaFontScale,
          globalFontScale: this.globalFontScale,
          sectionFontScales: this.sectionFontScales
        };
        localStorage.setItem(key, JSON.stringify(payload));
      } catch (err) {
        console.error('Unable to persist font scale preferences', err);
      }
    },
    ensureConfettiScript() {
      if (this.confettiPromise) return this.confettiPromise;
      if (typeof window === 'undefined') {
        this.confettiPromise = Promise.resolve();
        return this.confettiPromise;
      }
      if (window.confetti) {
        this.setupConfettiLauncher();
        this.confettiPromise = Promise.resolve();
        return this.confettiPromise;
      }
      this.confettiPromise = new Promise(resolve => {
        // Injects the confetti bundle on demand so we only pay for it when needed.
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
        script.onload = () => {
          console.log('Confetti loaded & ready!');
          this.setupConfettiLauncher();
          resolve();
        };
        script.onerror = () => resolve();
        document.head.appendChild(script);
      });
      return this.confettiPromise;
    },
    launchMicroConfetti() {
      var _this$currentLesson22;
      // Skip celebration when the user prefers reduced motion.
      if (this.reduceMotionEnabled) return;
      const chapterId = (_this$currentLesson22 = this.currentLesson) === null || _this$currentLesson22 === void 0 ? void 0 : _this$currentLesson22.chapterId;
      if (!shouldCelebrateChapter(chapterId)) return;
      this.ensureConfettiScript().then(() => {
        this.setupConfettiLauncher();
        const confettiFn = this.confettiLauncher || window.confetti;
        if (!confettiFn) return;
        fullScreenConfetti(confettiFn);
      });
    },
    preloadChapterTool(chapterId) {
      const tool = CHAPTER_TOOL_MAP[chapterId];
      if (!(tool !== null && tool !== void 0 && tool.preload)) return;
      tool.preload().catch(() => {});
    },
    scheduleChapterToolPreload(chapterId) {
      if (!chapterId) return;
      const run = () => this.preloadChapterTool(chapterId);
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(run, {
          timeout: 1000
        });
      } else {
        setTimeout(run, 150);
      }
    },
    resolveScrollContainer() {
      if (typeof window === 'undefined' || typeof document === 'undefined') return null;
      const lessonPane = document.querySelector('.lesson-pane');
      if (lessonPane) {
        const overflowY = window.getComputedStyle(lessonPane).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') {
          return lessonPane;
        }
      }
      return window;
    },
    bindScrollListeners() {
      if (typeof window === 'undefined') return;
      const nextTarget = this.resolveScrollContainer();
      if (!nextTarget || this.scrollListenerTarget === nextTarget) return;
      this.unbindScrollListeners();
      this.scrollListenerTarget = nextTarget;
      if (nextTarget === window) {
        window.addEventListener('scroll', this.updateScrollFab, {
          passive: true
        });
        return;
      }
      if (typeof nextTarget.addEventListener === 'function') {
        nextTarget.addEventListener('scroll', this.updateScrollFab, {
          passive: true
        });
      }
    },
    unbindScrollListeners() {
      if (this.scrollListenerTarget && this.scrollListenerTarget !== window) {
        if (typeof this.scrollListenerTarget.removeEventListener === 'function') {
          this.scrollListenerTarget.removeEventListener('scroll', this.updateScrollFab);
        }
      }
      window.removeEventListener('scroll', this.updateScrollFab);
      this.scrollListenerTarget = null;
    },
    updateScrollFab() {
      if (typeof window === 'undefined') {
        this.showScrollFab = false;
        return;
      }
      const scrollTarget = this.resolveScrollContainer();
      if (!scrollTarget) {
        this.showScrollFab = false;
        return;
      }
      const doc = document.documentElement;
      const scrollableHeight = scrollTarget === window ? doc.scrollHeight - window.innerHeight : scrollTarget.scrollHeight - scrollTarget.clientHeight;
      if (scrollableHeight <= 0) {
        this.showScrollFab = false;
        return;
      }
      const scrollTop = scrollTarget === window ? window.scrollY : scrollTarget.scrollTop;
      this.showScrollFab = scrollTop / scrollableHeight > 1 / 6;
    },
    /**
     * Resets the scroll position again after the initial navigation to cooperate with any
     * late DOM changes (e.g., accordion expansion or video loading) that might push the
     * viewport downward.
     */
    scheduleScrollTopRetry(delay = 220) {
      if (typeof window === 'undefined') return;
      if (this.scrollTopRetryTimer) {
        clearTimeout(this.scrollTopRetryTimer);
      }
      this.scrollTopRetryTimer = window.setTimeout(() => {
        this.scrollToTop({
          behavior: 'auto'
        });
        this.scrollTopRetryTimer = null;
      }, delay);
    },
    initializeMotionPreference() {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return;
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = event => {
        this.reduceMotionEnabled = event.matches;
      };
      this.motionMediaQuery = query;
      this.motionMediaListener = handler;
      this.reduceMotionEnabled = query.matches;
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', handler);
      } else if (typeof query.addListener === 'function') {
        query.addListener(handler);
      }
    },
    initializePreviewAutoplayPreference() {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return;
      const query = window.matchMedia('(min-width: 992px)');
      const handler = event => {
        if (event.matches && this.mobileNavOpen) {
          this.mobileNavOpen = false;
        } else {
          this.syncMobileNavScrollLock();
        }
        this.previewAutoplayEnabled = event.matches;
        this.bindScrollListeners();
        this.updateScrollFab();
      };
      this.previewDesktopMediaQuery = query;
      this.previewDesktopListener = handler;
      this.previewAutoplayEnabled = query.matches;
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', handler);
      } else if (typeof query.addListener === 'function') {
        query.addListener(handler);
      }
    },
    bindProgressSync() {
      if (typeof window === 'undefined') return;
      if (this.progressSyncHandler) return;
      this.progressSyncHandler = event => {
        if (!event || event.storageArea !== localStorage) return;
        if (event.key === 'maxStepReached') {
          const next = Number.parseInt(event.newValue, 10);
          if (!Number.isFinite(next) || next <= 0 || next === this.maxStepReached) return;
          this.maxStepReached = next;
          if (this.selectedPill > next) {
            this.selectedPill = next;
          }
        }
      };
      window.addEventListener('storage', this.progressSyncHandler);
    },
    teardownMotionPreference() {
      if (!this.motionMediaQuery || !this.motionMediaListener) return;
      if (typeof this.motionMediaQuery.removeEventListener === 'function') {
        this.motionMediaQuery.removeEventListener('change', this.motionMediaListener);
      } else if (typeof this.motionMediaQuery.removeListener === 'function') {
        this.motionMediaQuery.removeListener(this.motionMediaListener);
      }
      this.motionMediaQuery = null;
      this.motionMediaListener = null;
    },
    teardownPreviewAutoplayPreference() {
      if (!this.previewDesktopMediaQuery || !this.previewDesktopListener) return;
      if (typeof this.previewDesktopMediaQuery.removeEventListener === 'function') {
        this.previewDesktopMediaQuery.removeEventListener('change', this.previewDesktopListener);
      } else if (typeof this.previewDesktopMediaQuery.removeListener === 'function') {
        this.previewDesktopMediaQuery.removeListener(this.previewDesktopListener);
      }
      this.previewDesktopMediaQuery = null;
      this.previewDesktopListener = null;
    },
    teardownProgressSync() {
      if (typeof window === 'undefined' || !this.progressSyncHandler) return;
      window.removeEventListener('storage', this.progressSyncHandler);
      this.progressSyncHandler = null;
    },
    setupConfettiLauncher() {
      if (this.confettiLauncher) return;
      if (typeof window === 'undefined' || !window.confetti) return;
      const canvas = this.$refs.confettiCanvas;
      if (!canvas) return;
      this.confettiLauncher = window.confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: false
      });
    },
    triggerConfetti(isFinalChapter, options = {}) {
      var _ref2, _this$currentLesson23;
      const {
        skipScroll = false,
        celebrationChapterId = null
      } = options;
      const chapterId = (_ref2 = celebrationChapterId !== null && celebrationChapterId !== void 0 ? celebrationChapterId : (_this$currentLesson23 = this.currentLesson) === null || _this$currentLesson23 === void 0 ? void 0 : _this$currentLesson23.chapterId) !== null && _ref2 !== void 0 ? _ref2 : this.selectedPill;
      if (!shouldCelebrateChapter(chapterId)) return;
      if (!skipScroll) {
        this.scrollToTop();
      }
      this.ensureConfettiScript().then(() => {
        this.setupConfettiLauncher();
        const confettiFn = this.confettiLauncher || window.confetti;
        if (!confettiFn) return;
        if (isFinalChapter) {
          celebrateFinalChapter(confettiFn);
          setTimeout(() => celebrateFinalChapter(confettiFn), 600);
        } else {
          fullScreenConfetti(confettiFn);
          setTimeout(() => fullScreenConfetti(confettiFn), 400);
        }
      });
    },
    buildLookupMaps() {
      this.lessonMap = this.chapterLessons.reduce((map, lesson) => {
        if ((lesson === null || lesson === void 0 ? void 0 : lesson.chapterId) != null) map[lesson.chapterId] = lesson;
        return map;
      }, {});
      this.missionMap = this.missions.reduce((map, mission) => {
        if ((mission === null || mission === void 0 ? void 0 : mission.chapterId) != null) map[mission.chapterId] = mission;
        return map;
      }, {});
      this.duasMap = this.duas.reduce((map, dua) => {
        if ((dua === null || dua === void 0 ? void 0 : dua.chapterId) != null) map[dua.chapterId] = dua.duas || [];
        return map;
      }, {});
      this.quizMap = this.quizzes.reduce((map, quiz) => {
        if ((quiz === null || quiz === void 0 ? void 0 : quiz.chapterId) != null) map[quiz.chapterId] = quiz.questions || [];
        return map;
      }, {});
      this.homeworkMap = this.homework.reduce((map, task) => {
        if ((task === null || task === void 0 ? void 0 : task.chapterId) != null) map[task.chapterId] = task.homework || [];
        return map;
      }, {});
      this.chapterResourcesMap = this.chapterResources.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.chapterKeyInsightsMap = this.chapterKeyInsights.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.toneFocusMap = this.toneFocusEntries.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.guidedPathwayMap = this.guidedPathways.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.gentleStartMap = this.chapterGentleStarts.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.sectionStatsMapByChapter = this.sectionStatsByChapter.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.chapterPlanMap = this.chapterPlanGuides.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.dosDontsMap = this.dosDontsChapters.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.faqChapterMap = this.faqChapters.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.commonQuestionChapterMap = this.commonQuestionChapters.reduce((map, entry) => {
        if ((entry === null || entry === void 0 ? void 0 : entry.chapterId) != null) map[entry.chapterId] = entry;
        return map;
      }, {});
      this.resetHomeworkCache();
    },
    // Lazy-loads chapter videos to avoid bloating the initial bundle.
    async loadChapterVideos() {
      try {
        const module = await __webpack_require__.e(/*! import() */ "resources_components_vue_data_chapterVideos_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./data/chapterVideos.json */ "./resources/components/vue/data/chapterVideos.json", 19));
        const chapters = normalizeJson(module);
        this.chapterVideos = chapters;
        this.chapterVideoMap = chapters.reduce((map, record) => {
          if ((record === null || record === void 0 ? void 0 : record.chapterId) != null) {
            map[record.chapterId] = record;
          }
          return map;
        }, {});
      } catch (error) {
        this.reportAsyncError(error, 'load chapter videos');
      }
    },
    // Cache homework slices per chapter to avoid recomputing on repeated renders.
    resetHomeworkCache() {
      this.homeworkCache = {};
      this.homeworkSliceCache = {};
    },
    getHomeworkContentForChapter(chapterId) {
      if (!chapterId) return [];
      if (!this.homeworkCache[chapterId]) {
        this.homeworkCache[chapterId] = this.homeworkMap[chapterId] || [];
      }
      return this.homeworkCache[chapterId];
    },
    getVisibleHomeworkForChapter(chapterId, visibleCount) {
      const tasks = this.getHomeworkContentForChapter(chapterId);
      if (!visibleCount || visibleCount >= tasks.length) {
        return tasks;
      }
      if (!this.homeworkSliceCache[chapterId]) {
        this.homeworkSliceCache[chapterId] = {};
      }
      const sliceCache = this.homeworkSliceCache[chapterId];
      if (!sliceCache[visibleCount]) {
        sliceCache[visibleCount] = tasks.slice(0, visibleCount);
      }
      return sliceCache[visibleCount];
    },
    // Lazy-load additional chapter resources only when the user opens those cards.
    ensureFlexiblePlanTracksLoaded() {
      if (this.flexibleTracksRequest) return this.flexibleTracksRequest;
      this.flexibleTracksRequest = __webpack_require__.e(/*! import() */ "resources_components_vue_date_flexiblePlanTracks_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./date/flexiblePlanTracks.json */ "./resources/components/vue/date/flexiblePlanTracks.json", 19)).then(module => {
        this.flexiblePlanTracks = normalizeJson(module);
      }).catch(error => {
        this.reportAsyncError(error, 'load flexible plan tracks');
      });
      return this.flexibleTracksRequest;
    },
    ensureFlexibleChapterNotesLoaded() {
      if (this.flexibleNotesRequest) return this.flexibleNotesRequest;
      this.flexibleNotesRequest = __webpack_require__.e(/*! import() */ "resources_components_vue_date_flexibleChapterNotes_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./date/flexibleChapterNotes.json */ "./resources/components/vue/date/flexibleChapterNotes.json", 19)).then(module => {
        this.flexibleChapterNotes = normalizeJson(module);
      }).catch(error => {
        this.reportAsyncError(error, 'load flexible chapter notes');
      });
      return this.flexibleNotesRequest;
    },
    ensureDailyMicroChallengesLoaded() {
      if (this.dailyChallengesRequest) return this.dailyChallengesRequest;
      this.dailyChallengesRequest = __webpack_require__.e(/*! import() */ "resources_components_vue_date_dailyMicroChallenges_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ./date/dailyMicroChallenges.json */ "./resources/components/vue/date/dailyMicroChallenges.json", 19)).then(module => {
        this.dailyMicroChallenges = (module === null || module === void 0 ? void 0 : module.default) || module || {};
      }).catch(error => {
        this.reportAsyncError(error, 'load daily micro challenges');
      });
      return this.dailyChallengesRequest;
    },
    updateStreakRecord() {
      if (typeof window === 'undefined') return;
      const todayKey = this.getTodayDateKey();
      if (!todayKey) return;
      let nextStreak = 1;
      if (this.lastStreakDateKey === todayKey && this.currentStreakDays > 0) {
        nextStreak = this.currentStreakDays;
      } else if (this.lastStreakDateKey) {
        const today = new Date(todayKey);
        const last = new Date(this.lastStreakDateKey);
        const diffDays = Math.round((today - last) / (24 * 60 * 60 * 1000));
        if (diffDays === 1) {
          nextStreak = Math.max(this.currentStreakDays, 1) + 1;
        } else {
          nextStreak = 1;
        }
      } else if (this.currentStreakDays > 0) {
        nextStreak = this.currentStreakDays + 1;
      }
      this.currentStreakDays = Math.max(1, nextStreak);
      this.lastStreakDateKey = todayKey;
      localStorage.setItem('streakDays', this.currentStreakDays.toString());
      localStorage.setItem('lastStreakDate', todayKey);
    },
    getTodayDateKey() {
      if (typeof window === 'undefined') return '';
      return new Date().toISOString().split('T')[0];
    },
    syncStreakFromStorage() {
      if (typeof window === 'undefined') return;
      const stored = Number(localStorage.getItem('streakDays') || 0);
      this.currentStreakDays = Number.isFinite(stored) ? stored : 0;
      this.lastStreakDateKey = localStorage.getItem('lastStreakDate') || '';
    },
    syncDailyChallenges() {
      if (typeof window === 'undefined') return;
      const todayKey = this.getTodayDateKey();
      const storedDate = localStorage.getItem('dailyChallengeDate') || '';
      if (storedDate !== todayKey) {
        this.dailyChallengeStatus = {};
        this.dailyChallengeDate = todayKey;
        localStorage.setItem('dailyChallengeDate', todayKey);
        localStorage.setItem('dailyChallengeStatus', JSON.stringify({}));
        return;
      }
      let storedStatus = {};
      try {
        storedStatus = JSON.parse(localStorage.getItem('dailyChallengeStatus') || '{}');
      } catch (_unused) {
        storedStatus = {};
      }
      this.dailyChallengeStatus = storedStatus;
      this.dailyChallengeDate = storedDate || todayKey;
    },
    toggleChallenge(storageKey) {
      if (typeof window === 'undefined') return;
      const todayKey = this.getTodayDateKey();
      if (this.dailyChallengeDate !== todayKey) {
        this.dailyChallengeStatus = {};
      }
      const nextValue = !this.dailyChallengeStatus[storageKey];
      this.dailyChallengeStatus = _objectSpread(_objectSpread({}, this.dailyChallengeStatus), {}, {
        [storageKey]: nextValue
      });
      this.dailyChallengeDate = todayKey;
      localStorage.setItem('dailyChallengeStatus', JSON.stringify(this.dailyChallengeStatus));
      localStorage.setItem('dailyChallengeDate', todayKey);
    },
    dailyChallengeStorageKey(promptId, chapterId = (_this$currentLesson24 => (_this$currentLesson24 = this.currentLesson) === null || _this$currentLesson24 === void 0 ? void 0 : _this$currentLesson24.chapterId)()) {
      if (chapterId == null) return promptId;
      return `${chapterId}-${promptId}`;
    },
    gentleStepCompletionKey(chapterId, stepIndex) {
      if (chapterId == null) return null;
      return `gentle-${chapterId}-${stepIndex}`;
    },
    isGentleStepCompleted(stepIndex) {
      var _this$currentLesson25;
      const chapterId = (_this$currentLesson25 = this.currentLesson) === null || _this$currentLesson25 === void 0 ? void 0 : _this$currentLesson25.chapterId;
      const key = this.gentleStepCompletionKey(chapterId, stepIndex);
      return Boolean(key && this.gentleStepCompletion[key]);
    },
    toggleGentleStepCompletion(stepIndex) {
      var _this$currentLesson26;
      const chapterId = (_this$currentLesson26 = this.currentLesson) === null || _this$currentLesson26 === void 0 ? void 0 : _this$currentLesson26.chapterId;
      const key = this.gentleStepCompletionKey(chapterId, stepIndex);
      if (!key) return;
      const nextValue = !this.gentleStepCompletion[key];
      this.gentleStepCompletion = _objectSpread(_objectSpread({}, this.gentleStepCompletion), {}, {
        [key]: nextValue
      });
      this.persistGentleStepCompletion();
    },
    persistGentleStepCompletion() {
      if (typeof window === 'undefined') return;
      localStorage.setItem('gentleStepCompletion', JSON.stringify(this.gentleStepCompletion));
    },
    loadGentleStepCompletion() {
      if (typeof window === 'undefined') return;
      try {
        const stored = JSON.parse(localStorage.getItem('gentleStepCompletion') || '{}');
        this.gentleStepCompletion = stored;
      } catch (_unused2) {
        this.gentleStepCompletion = {};
      }
    },
    loadReflectionNotes() {
      if (typeof window === 'undefined') return;
      try {
        const stored = JSON.parse(localStorage.getItem('reflectionNotes') || '{}');
        this.reflectionNotes = stored;
      } catch (_unused3) {
        this.reflectionNotes = {};
      }
      this.syncReflectionInput();
    },
    loadLessonOverviewRead() {
      if (typeof window === 'undefined') return;
      try {
        const stored = JSON.parse(localStorage.getItem('lessonOverviewRead') || '{}');
        this.lessonOverviewRead = stored;
      } catch (_unused4) {
        this.lessonOverviewRead = {};
      }
    },
    loadCuratedHighlightCompletion() {
      if (typeof window === 'undefined') return;
      try {
        const stored = JSON.parse(localStorage.getItem('curatedHighlightCompletion') || '{}');
        this.curatedHighlightCompletion = stored;
      } catch (_unused5) {
        this.curatedHighlightCompletion = {};
      }
    },
    syncReflectionInput() {
      var _this$currentLesson27;
      const chapterId = (_this$currentLesson27 = this.currentLesson) === null || _this$currentLesson27 === void 0 ? void 0 : _this$currentLesson27.chapterId;
      if (!chapterId) {
        this.reflectionInput = '';
        return;
      }
      this.reflectionInput = this.reflectionNotes[chapterId] || '';
    },
    createNewReflectionNote() {
      this.reflectionInput = '';
      this.reflectionStatus = 'Create a fresh note';
      setTimeout(() => {
        this.reflectionStatus = '';
      }, 2200);
    },
    clearReflectionNote() {
      this.reflectionInput = '';
      this.saveReflectionNote();
    },
    saveReflectionNote() {
      var _this$currentLesson28;
      const chapterId = (_this$currentLesson28 = this.currentLesson) === null || _this$currentLesson28 === void 0 ? void 0 : _this$currentLesson28.chapterId;
      if (!chapterId) return;
      const text = this.reflectionInput.trim();
      const nextNotes = _objectSpread({}, this.reflectionNotes);
      if (text) {
        nextNotes[chapterId] = text;
      } else {
        delete nextNotes[chapterId];
      }
      this.reflectionNotes = nextNotes;
      if (typeof window !== 'undefined') {
        localStorage.setItem('reflectionNotes', JSON.stringify(nextNotes));
      }
      this.reflectionStatus = text ? 'Saved for this chapter' : 'Reflection cleared';
      setTimeout(() => {
        this.reflectionStatus = '';
      }, 2800);
    },
    prepareSecondarySections() {
      this.secondarySectionsReady = false;
      if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
        window.requestAnimationFrame(() => {
          this.secondarySectionsReady = true;
        });
      } else {
        this.secondarySectionsReady = true;
      }
    },
    loadMoreHomework() {
      if (!this.currentHomework.length) return;
      this.homeworkVisibleCount = Math.min(this.currentHomework.length, this.homeworkVisibleCount + 4);
    },
    expandFaq(section) {
      if (section === 'common') {
        this.commonFaqDisplayLimit = this.chapterCommonPanels.length;
      } else {
        this.faqDisplayLimit = this.chapterFaqPanels.length;
      }
    },
    generateGuidanceCards(chapterId) {
      var _template$cards, _lesson$sections, _lesson$keyInsights, _lesson$keyInsights2;
      const template = this.guidanceTemplates.find(entry => entry.chapterId === chapterId);
      if (template !== null && template !== void 0 && (_template$cards = template.cards) !== null && _template$cards !== void 0 && _template$cards.length) return template.cards;
      const lesson = this.lessonMap[chapterId];
      if (!lesson) return [];
      const cards = [{
        step: '01',
        title: 'Absorb the Story',
        description: `Read through ${((_lesson$sections = lesson.sections) === null || _lesson$sections === void 0 ? void 0 : _lesson$sections.length) || 0} featured sections and soak in the core ideas`,
        action: 'Bookmark key paragraphs and jot down a quick insight'
      }, {
        step: '02',
        title: 'Internalize Duas & Insights',
        description: (_lesson$keyInsights = lesson.keyInsights) !== null && _lesson$keyInsights !== void 0 && _lesson$keyInsights.length ? `Let the ${lesson.keyInsights.length} insights guide your practice` : 'Use the duas to keep the message close to your heart',
        action: (_lesson$keyInsights2 = lesson.keyInsights) !== null && _lesson$keyInsights2 !== void 0 && _lesson$keyInsights2.length ? 'Recite aloud and note how each insight applies today' : 'Practice the duas before sleep'
      }, {
        step: '03',
        title: 'Take the Quiz',
        description: 'Answer one vibrant question to unlock the next chapter and prove mastery',
        action: 'Choose the right option then scroll to “Next Chapter”'
      }];
      const hasDuas = (this.duasMap[chapterId] || []).length > 0;
      if (!hasDuas) {
        cards[1].description = 'Use the glossary, resources, and mission to keep the lesson alive';
        cards[1].action = 'Pin a phrase that resonated most';
      }
      return cards;
    },
    generateLessonDepartments(chapterId) {
      const lesson = this.lessonMap[chapterId];
      if (!lesson) return [];
      const sections = lesson.sections || [];
      if (!sections.length) return [];
      const icons = ['bi-gem', 'bi-heart', 'bi-lightbulb', 'bi-book', 'bi-graph-up'];
      return sections.slice(0, 3).map((section, index) => {
        var _section$deepDive2;
        return {
          name: section.title.split(' ').slice(0, 2).join(' '),
          summary: section.title,
          detail: ((_section$deepDive2 = section.deepDive) === null || _section$deepDive2 === void 0 ? void 0 : _section$deepDive2.title) || 'Integrated across insights, duas, and missions.',
          icon: icons[index % icons.length]
        };
      });
    },
    normalizeChapterId(value = this.selectedPill) {
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : null;
    },
    handleGlobalKeydown(event) {
      if (!event || event.key !== 'Escape') return;
      if (!this.mobileNavOpen || this.isAnyModalOpen) return;
      event.preventDefault();
      this.mobileNavOpen = false;
    },
    captureMobileNavFocusOrigin() {
      if (typeof document === 'undefined') return;
      const activeEl = document.activeElement;
      this.mobileNavFocusOrigin = activeEl instanceof HTMLElement ? activeEl : null;
    },
    restoreMobileNavFocusOrigin() {
      if (!this.mobileNavFocusOrigin || typeof document === 'undefined') {
        this.mobileNavFocusOrigin = null;
        return;
      }
      if (document.contains(this.mobileNavFocusOrigin) && typeof this.mobileNavFocusOrigin.focus === 'function') {
        this.mobileNavFocusOrigin.focus();
      }
      this.mobileNavFocusOrigin = null;
    },
    focusFirstMobileNavControl() {
      var _this$$el, _this$$el$querySelect;
      if (typeof document === 'undefined' || typeof window === 'undefined') return;
      if (!this.mobileNavOpen || window.innerWidth >= 992) return;
      const nav = (_this$$el = this.$el) === null || _this$$el === void 0 || (_this$$el$querySelect = _this$$el.querySelector) === null || _this$$el$querySelect === void 0 ? void 0 : _this$$el$querySelect.call(_this$$el, '#revert-navigation');
      if (!nav || typeof nav.querySelector !== 'function') return;
      const firstFocusable = nav.querySelector('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (firstFocusable instanceof HTMLElement && typeof firstFocusable.focus === 'function') {
        firstFocusable.focus();
      }
    },
    enforceRevertScrollSafety() {
      if (typeof document === 'undefined') return;
      const body = document.body;
      const html = document.documentElement;
      if (!body || !html) return;
      body.classList.remove('modal-open', 'sidebar-open');
      if (!this.mobileNavOpen) {
        body.classList.remove('revert-mobile-nav-lock');
        html.classList.remove('revert-mobile-nav-lock');
      }
      if (!this.mobileNavOpen && body.style.overflow === 'hidden') {
        body.style.overflow = '';
      }
      if (body.style.paddingRight) {
        body.style.paddingRight = '';
      }
      if (!this.mobileNavOpen && html.style.overflow === 'hidden') {
        html.style.overflow = '';
      }
      const sidebarEl = document.getElementById('tablet-sidebar');
      if (sidebarEl !== null && sidebarEl !== void 0 && sidebarEl.classList.contains('active')) {
        sidebarEl.classList.remove('active');
      }
      const sidebarBackdrop = document.getElementById('sidebar-backdrop');
      if (sidebarBackdrop !== null && sidebarBackdrop !== void 0 && sidebarBackdrop.classList.contains('active')) {
        sidebarBackdrop.classList.remove('active');
      }
    },
    bindScrollSafetyObserver() {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      this.enforceRevertScrollSafety();
    },
    teardownScrollSafetyObserver() {
      if (!this.scrollSafetyObserver) return;
      this.scrollSafetyObserver.disconnect();
      this.scrollSafetyObserver = null;
    },
    syncMobileNavScrollLock(shouldOpen = this.mobileNavOpen) {
      if (typeof document === 'undefined' || typeof window === 'undefined') return;
      this.enforceRevertScrollSafety();
      document.body.classList.toggle('revert-mobile-nav-lock', Boolean(shouldOpen));
      document.documentElement.classList.toggle('revert-mobile-nav-lock', Boolean(shouldOpen));
    },
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
    handleRoadmapPillClick(step, event) {
      const chapterId = Number(step === null || step === void 0 ? void 0 : step.id);
      if (!Number.isFinite(chapterId)) return;
      if (chapterId > this.maxStepReached) {
        var _event$preventDefault, _event$stopPropagatio;
        event === null || event === void 0 || (_event$preventDefault = event.preventDefault) === null || _event$preventDefault === void 0 || _event$preventDefault.call(event);
        event === null || event === void 0 || (_event$stopPropagatio = event.stopPropagation) === null || _event$stopPropagatio === void 0 || _event$stopPropagatio.call(event);
        return;
      }
      this.selectPill(chapterId);
    },
    selectPill(id) {
      const chapterId = Number(id);
      if (!Number.isFinite(chapterId)) return;
      if (chapterId > this.maxStepReached) return;
      this.selectedPill = chapterId;
      this.scrollToTop();
      this.mobileNavOpen = false;
    },
    jumpToContentSection(sectionId) {
      const targetId = String(sectionId || '').trim();
      if (!targetId) return;
      this.activeSectionJumpId = targetId;
      this.mobileNavOpen = false;
      this.$nextTick(() => {
        this.scrollToSectionId(targetId);
      });
    },
    openChapterToolNewTab() {
      const tool = this.chapterTool;
      if (!(tool !== null && tool !== void 0 && tool.route) || typeof window === 'undefined') return;
      window.open(tool.route, '_blank', 'noopener,noreferrer');
    },
    stepStatusLabel(step) {
      if (step.id < this.maxStepReached) return 'Completed';
      if (step.id === this.maxStepReached) return 'In progress';
      return 'Locked';
    },
    loadViewModePreference() {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem('revertViewMode');
      const allowed = this.viewModeOptions.map(option => option.value);
      if (allowed.includes(stored)) {
        this.viewMode = stored;
      }
    },
    setViewMode(mode) {
      const allowed = this.viewModeOptions.map(option => option.value);
      if (!allowed.includes(mode)) return;
      this.viewMode = mode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('revertViewMode', mode);
      }
    },
    expandAllCards() {
      this.cardVisibility = {};
      this.sectionVisibility = {};
      this.triggerCopyAlert('All sections expanded.', 'success');
    },
    collapseSupportingCards() {
      this.cardVisibility = {
        guidedPathway: false,
        shareFriend: false,
        revertStories: false,
        shareUplift: false,
        resources: false,
        motivation: false
      };
      this.triggerCopyAlert('Focus mode applied to supporting sections.', 'info');
    },
    sectionStatsFor(title) {
      var _this$sectionStatsMap;
      return ((_this$sectionStatsMap = this.sectionStatsMap.find(entry => entry.title === title)) === null || _this$sectionStatsMap === void 0 ? void 0 : _this$sectionStatsMap.stats) || [];
    },
    sectionToggleId(prefix = 'section', section = {}, index = 0) {
      const heading = (section === null || section === void 0 ? void 0 : section.heading) || (section === null || section === void 0 ? void 0 : section.title) || `section-${index + 1}`;
      const label = `${heading}`.toLowerCase();
      const slug = label.trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
      const suffix = slug || index;
      return `${prefix}-${this.selectedPill}-${suffix}`;
    },
    isSectionVisible(sectionKey) {
      if (!sectionKey) return true;
      if (Object.prototype.hasOwnProperty.call(this.sectionVisibility, sectionKey)) {
        return Boolean(this.sectionVisibility[sectionKey]);
      }
      return true;
    },
    toggleSectionVisibility(sectionKey) {
      if (!sectionKey) return;
      const currentlyVisible = this.isSectionVisible(sectionKey);
      this.sectionVisibility = _objectSpread(_objectSpread({}, this.sectionVisibility), {}, {
        [sectionKey]: !currentlyVisible
      });
    },
    isCardVisible(cardKey) {
      if (!cardKey) return true;
      if (Object.prototype.hasOwnProperty.call(this.cardVisibility, cardKey)) {
        return Boolean(this.cardVisibility[cardKey]);
      }
      return true;
    },
    toggleCardVisibility(cardKey) {
      if (!cardKey) return;
      const currentlyVisible = this.isCardVisible(cardKey);
      this.cardVisibility = _objectSpread(_objectSpread({}, this.cardVisibility), {}, {
        [cardKey]: !currentlyVisible
      });
    },
    toggleVideoFilters() {
      this.showVideoFilters = !this.showVideoFilters;
    },
    toggleLessonOverviewRead() {
      var _this$currentLesson29;
      const chapterId = (_this$currentLesson29 = this.currentLesson) === null || _this$currentLesson29 === void 0 ? void 0 : _this$currentLesson29.chapterId;
      if (!chapterId) return;
      const nextValue = !Boolean(this.lessonOverviewRead[chapterId]);
      this.lessonOverviewRead = _objectSpread(_objectSpread({}, this.lessonOverviewRead), {}, {
        [chapterId]: nextValue
      });
      const message = nextValue ? 'Lesson overview marked as read.' : 'Lesson overview unmarked.';
      this.showSuccessFeedback(message, {
        duration: 4000
      });
    },
    toggleCuratedHighlightCompletion(planId, index, planTitle = '', totalHighlights = 0) {
      if (!planId || index == null) return;
      const key = `${planId}-${index}`;
      const nextState = _objectSpread(_objectSpread({}, this.curatedHighlightCompletion), {}, {
        [key]: !Boolean(this.curatedHighlightCompletion[key])
      });
      const completed = Boolean(nextState[key]);
      this.curatedHighlightCompletion = nextState;
      if (!completed || totalHighlights <= 0) return;
      const allComplete = Array.from({
        length: totalHighlights
      }, (_, idx) => Boolean(nextState[`${planId}-${idx}`])).every(Boolean);
      if (allComplete) {
        const title = planTitle || 'plan';
        this.showSuccessFeedback(`Congratulations! "${title}" is complete.`, {
          duration: 5000,
          confetti: true,
          skipScroll: true
        });
      }
    },
    isCuratedHighlightCompleted(planId, index) {
      if (!planId || index == null) return false;
      const key = `${planId}-${index}`;
      return Boolean(this.curatedHighlightCompletion[key]);
    },
    showSuccessFeedback(message = '', options = {}) {
      const {
        duration = 4000,
        confetti = false,
        skipScroll = false
      } = options;
      this.successMessage = message;
      this.showSuccessAlert = true;
      if (this.successAlertTimeout) {
        clearTimeout(this.successAlertTimeout);
        this.successAlertTimeout = null;
      }
      if (confetti) {
        this.$nextTick(() => this.triggerConfetti(false, {
          skipScroll
        }));
      }
      this.successAlertTimeout = setTimeout(() => {
        this.showSuccessAlert = false;
        this.successAlertTimeout = null;
      }, duration);
    },
    toggleAccordion(section, index) {
      const stateKey = section === 'faq' ? 'faqAccordionState' : 'commonAccordionState';
      this[stateKey] = this[stateKey] === index ? null : index;
    },
    isAccordionOpen(section, index) {
      const stateKey = section === 'faq' ? 'faqAccordionState' : 'commonAccordionState';
      const state = this[stateKey];
      if (state === null) return false;
      if (typeof state === 'number') {
        return state === index;
      }
      return index === 0;
    },
    formatVideoUrl(url, autoplay = false, muted = false) {
      if (!url) return '';
      let embedUrl = url;
      if (url.includes('watch?v=')) {
        embedUrl = url.replace('watch?v=', 'embed/');
      } else if (url.includes('youtu.be/')) {
        embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
      }
      const [base, query = ''] = embedUrl.split('?');
      const params = new URLSearchParams(query);
      params.set('rel', '0');
      params.set('modestbranding', '1');
      params.set('playsinline', '1');
      if (autoplay) {
        params.set('autoplay', '1');
      }
      if (muted) {
        params.set('mute', '1');
      }
      return `${base}?${params.toString()}`;
    },
    formatOverviewContent(content = '') {
      if (!content) return '';
      const text = String(content);
      const linked = this.linkifyOverviewContent(text);
      const withLineBreaks = linked.replace(/\n/g, '<br>');
      const hasReferences = text.includes('\n\nReferences:');
      const withReferenceLabel = withLineBreaks.replace(/\bReferences:/g, '<strong>References:</strong>');
      if (!hasReferences) return withReferenceLabel;
      return `<strong>Main Section:</strong><br>${withReferenceLabel}`;
    },
    formatReferenceText(text = '') {
      if (!text) return '';
      return this.escapeHtml(String(text));
    },
    formatReferenceHtml(html = '') {
      if (!html) return '';
      return this.stripAnchorTags(String(html));
    },
    stripAnchorTags(html = '') {
      if (!html) return '';
      return String(html).replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '$1');
    },
    linkifyQuranReferences(html = '') {
      if (!html) return '';
      return html.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
        if (tag) return tag;
        return this.linkifyQuranEntry(text);
      });
    },
    escapeHtml(value = '') {
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    escapeRegExp(value = '') {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    tokenizeSearchTerm(term = '') {
      const tokens = [];
      const input = String(term);
      const regex = /"([^"]+)"|(\S+)/g;
      let match;
      while ((match = regex.exec(input)) !== null) {
        const token = (match[1] || match[2] || '').trim();
        if (!token) continue;
        if (tokens.some(existing => existing.toLowerCase() === token.toLowerCase())) continue;
        tokens.push(token);
      }
      return tokens;
    },
    clearResourceSearch() {
      this.resourceSearchTerm = '';
    },
    syncGlobalSearchCategory() {
      const exists = GLOBAL_SEARCH_SECTIONS.some(section => section.key === this.globalSearchCategory);
      if (!exists) this.globalSearchCategory = 'all';
    },
    matchesSearchTokens(value = '') {
      const tokens = this.resourceSearchTokensNormalized;
      if (!tokens.length) return false;
      const haystack = String(value).toLowerCase();
      if (!haystack) return false;
      if (this.resourceSearchMode === 'all') {
        return tokens.every(token => haystack.includes(token));
      }
      return tokens.some(token => haystack.includes(token));
    },
    stripHtml(value = '') {
      return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    },
    countWordsFromChunks(chunks = []) {
      const text = chunks.flatMap(chunk => Array.isArray(chunk) ? chunk : [chunk]).filter(Boolean).map(chunk => this.stripHtml(chunk)).filter(Boolean).join(' ');
      if (!text) return 0;
      return text.split(/\s+/).filter(Boolean).length;
    },
    buildSectionMeta(chunks = []) {
      const wordCount = this.countWordsFromChunks(chunks);
      const readTime = wordCount ? Math.max(1, Math.ceil(wordCount / 200)) : 0;
      return {
        wordCount,
        readTime
      };
    },
    buildSearchResult({
      section = '',
      title = '',
      body = '',
      meta = ''
    }) {
      const cleanTitle = this.stripHtml(title);
      const cleanBody = this.stripHtml(body);
      const combined = `${cleanTitle} ${cleanBody}`.trim();
      if (!this.matchesSearchTokens(combined)) return null;
      return {
        section,
        title: cleanTitle ? this.shortenReference(cleanTitle, 90) : '',
        snippet: cleanBody ? this.shortenReference(cleanBody, 180) : ''
      };
    },
    normalizeCollectionName(value = '') {
      return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    },
    hadithCollectionSlug(label = '') {
      const normalized = this.normalizeCollectionName(label);
      if (normalized.includes('bukhari')) return 'bukhari';
      if (normalized.includes('muslim')) return 'muslim';
      if (normalized.includes('abu dawud') || normalized.includes('abudawud')) return 'abudawud';
      if (normalized.includes('tirmidhi')) return 'tirmidhi';
      if (normalized.includes('ibn majah')) return 'ibnmajah';
      if (normalized.includes('adab')) return 'adab';
      if (normalized.includes('ahmad')) return 'ahmad';
      return '';
    },
    linkifyQuranEntry(text = '') {
      const regex = /(\d+):(\d+(?:-\d+)?)/g;
      let result = '';
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        result += this.escapeHtml(text.slice(lastIndex, match.index));
        const surah = match[1];
        const ayah = match[2];
        const href = `https://quran.com/${surah}/${ayah}`;
        result += `<a href="${href}" target="_blank" rel="noreferrer">${this.escapeHtml(match[0])}</a>`;
        lastIndex = match.index + match[0].length;
      }
      result += this.escapeHtml(text.slice(lastIndex));
      return result;
    },
    linkifyHadithEntry(text = '') {
      const parts = String(text).split(':');
      if (parts.length < 2) return this.escapeHtml(text);
      const collection = parts.shift().trim();
      const remainder = parts.join(':');
      const slug = this.hadithCollectionSlug(collection);
      const referenceRegex = /(\d+[a-z]?)/gi;
      let result = `${this.escapeHtml(collection)}:`;
      let lastIndex = 0;
      let match;
      while ((match = referenceRegex.exec(remainder)) !== null) {
        result += this.escapeHtml(remainder.slice(lastIndex, match.index));
        const ref = match[1];
        const href = slug ? `https://sunnah.com/${slug}:${ref}` : `https://sunnah.com/search?q=${encodeURIComponent(`${collection} ${ref}`)}`;
        result += `<a href="${href}" target="_blank" rel="noreferrer">${this.escapeHtml(ref)}</a>`;
        lastIndex = match.index + match[0].length;
      }
      result += this.escapeHtml(remainder.slice(lastIndex));
      return result;
    },
    linkifyHadithReferences(html = '') {
      if (!html) return '';
      return html.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
        if (tag) return tag;
        return this.linkifyHadithText(text);
      });
    },
    linkifyHadithText(text = '') {
      const collectionPattern = "(?:Ṣaḥīḥ|Sahih|Sunan|Jāmiʿ|Jamiʿ|Jami'|Musnad|Al-Adab|Adab)\\s+[A-Za-z\\u00C0-\\u024F\\u1E00-\\u1EFFʿʾāīūḍṣḥṭḤṢĀĪŪ\\- ]{1,50}";
      const hadithRegex = new RegExp(`(^|[\\s(])(${collectionPattern})\\s*:?\\s*(\\d+[a-z]?(?:\\s*,\\s*\\d+[a-z]?)*)`, 'gi');
      let linked = text.replace(hadithRegex, (match, boundary, collection, refs) => {
        const slug = this.hadithCollectionSlug(collection);
        const linkedRefs = refs.split(',').map(rawRef => {
          const ref = rawRef.trim();
          if (!ref) return '';
          const href = slug ? `https://sunnah.com/${slug}:${ref}` : `https://sunnah.com/search?q=${encodeURIComponent(`${collection} ${ref}`)}`;
          return `<a href="${href}" target="_blank" rel="noreferrer">${ref}</a>`;
        }).filter(Boolean).join(', ');
        return `${boundary}${collection} ${linkedRefs}`;
      });
      const phraseRegex = new RegExp(`\\b(${collectionPattern})\\s*\\(([^)]+)\\)`, 'gi');
      linked = linked.replace(phraseRegex, (match, collection, phrase) => {
        const href = `https://sunnah.com/search?q=${encodeURIComponent(`${collection} ${phrase}`)}`;
        return `${collection} (<a href="${href}" target="_blank" rel="noreferrer">${phrase}</a>)`;
      });
      return linked;
    },
    linkifyOverviewContent(text = '') {
      if (!text) return '';
      return this.escapeHtml(text);
    },
    highlightResourceHtml(html = '') {
      if (!html) return '';
      const {
        regex,
        tokenMap
      } = this.resourceHighlightConfig;
      if (!regex) return html;
      return html.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
        if (tag) return tag;
        return text.replace(regex, value => {
          const className = tokenMap.get(value.toLowerCase()) || RESOURCE_HIGHLIGHT_CLASSES[0];
          return `<mark class="resource-highlight ${className}">${value}</mark>`;
        });
      });
    },
    highlightResourceText(text = '') {
      if (!text) return '';
      const escaped = this.escapeHtml(text);
      return this.highlightResourceHtml(escaped);
    },
    formatResourceEntry(entry = '', label = '') {
      const text = String(entry || '');
      if (!text) return '';
      const normalizedLabel = String(label || '').toLowerCase();
      if (normalizedLabel.includes("qur")) {
        return this.highlightResourceHtml(this.linkifyQuranEntry(text));
      }
      if (normalizedLabel.includes('hadith')) {
        return this.highlightResourceHtml(this.linkifyHadithText(text));
      }
      return this.highlightResourceHtml(this.escapeHtml(text));
    },
    formatResourceReferenceEntry(entry = '') {
      const text = String(entry || '');
      if (!text) return '';
      return this.highlightResourceHtml(this.escapeHtml(text));
    },
    splitResourceEntryText(entry = '') {
      const raw = String(entry || '').trim();
      if (!raw) return {
        reference: '',
        detail: ''
      };
      if (resourceEntrySplitCache.has(raw)) {
        return resourceEntrySplitCache.get(raw);
      }
      const separators = [' - ', ' – ', ' — '];
      for (const sep of separators) {
        const index = raw.indexOf(sep);
        if (index > -1) {
          const reference = raw.slice(0, index).trim() || raw;
          const detail = raw.slice(index + sep.length).trim();
          if (detail) {
            const payload = {
              reference,
              detail
            };
            resourceEntrySplitCache.set(raw, payload);
            return payload;
          }
        }
      }
      const colonIndex = raw.indexOf(': ');
      if (colonIndex > 0) {
        const before = raw.slice(0, colonIndex).trim();
        const after = raw.slice(colonIndex + 2).trim();
        if (after && !before.toLowerCase().startsWith('http')) {
          const payload = {
            reference: before,
            detail: after
          };
          resourceEntrySplitCache.set(raw, payload);
          return payload;
        }
      }
      const fallback = {
        reference: raw,
        detail: ''
      };
      resourceEntrySplitCache.set(raw, fallback);
      return fallback;
    },
    resourceEntryParts(entry) {
      return this.splitResourceEntryText(entry);
    },
    shortenReference(reference, maxLength = 140) {
      if (!reference) return '';
      const text = String(reference).replace(/\s+/g, ' ').trim();
      if (text.length <= maxLength) return text;
      return `${text.slice(0, maxLength).trim()}...`;
    },
    shouldAutoplayVideo() {
      return !this.reduceMotionEnabled;
    },
    startPreview(video) {
      if (this.isPlayingVideo(video) || this.isClipPlaying(video)) return;
      const id = this.getVideoId(video === null || video === void 0 ? void 0 : video.url);
      if (!id) return;
      this.previewVideoId = id;
    },
    stopPreview() {
      this.previewVideoId = null;
    },
    playVideo(video) {
      const id = this.getVideoId(video === null || video === void 0 ? void 0 : video.url);
      if (!id) return;
      this.stopPreview();
      this.clipPlayerId = null;
      this.activeVideoId = this.activeVideoId === id ? null : id;
    },
    playClip(clip) {
      const id = this.getVideoId(clip === null || clip === void 0 ? void 0 : clip.url);
      if (!id) return;
      this.stopPreview();
      this.activeVideoId = null;
      this.clipPlayerId = this.clipPlayerId === id ? null : id;
    },
    handleVideoCardClick(video) {
      if (this.touchPlaybackTriggered) {
        this.touchPlaybackTriggered = false;
        if (this.touchPlaybackTimer) {
          clearTimeout(this.touchPlaybackTimer);
          this.touchPlaybackTimer = null;
        }
        return;
      }
      this.playVideo(video);
    },
    handleVideoCardTouch(video) {
      if (this.touchPlaybackTimer) {
        clearTimeout(this.touchPlaybackTimer);
      }
      this.touchPlaybackTriggered = true;
      this.playVideo(video);
      const timerTarget = typeof window !== 'undefined' ? window : globalThis;
      this.touchPlaybackTimer = timerTarget.setTimeout(() => {
        this.touchPlaybackTriggered = false;
        this.touchPlaybackTimer = null;
      }, 800);
    },
    isClipPlaying(clip) {
      const id = this.getVideoId(clip === null || clip === void 0 ? void 0 : clip.url);
      return Boolean(id && this.clipPlayerId === id);
    },
    isClipPreviewing(clip) {
      const id = this.getVideoId(clip === null || clip === void 0 ? void 0 : clip.url);
      return Boolean(id && this.previewVideoId === id && this.clipPlayerId !== id);
    },
    isVideoPreviewing(video) {
      const id = this.getVideoId(video === null || video === void 0 ? void 0 : video.url);
      return Boolean(id && this.previewVideoId === id && this.activeVideoId !== id && this.clipPlayerId !== id);
    },
    isPlayingVideo(video) {
      const id = this.getVideoId(video === null || video === void 0 ? void 0 : video.url);
      return Boolean(id && this.activeVideoId === id);
    },
    getVideoId(url) {
      if (!url) return null;
      const normalizedUrl = url.trim();
      if (!normalizedUrl) return null;
      if (videoUrlIdCache.has(normalizedUrl)) {
        return videoUrlIdCache.get(normalizedUrl);
      }
      const match = normalizedUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      const id = match ? match[1] : null;
      videoUrlIdCache.set(normalizedUrl, id);
      return id;
    },
    youTubeThumbnailUrls(video) {
      const videoId = this.getVideoId(video === null || video === void 0 ? void 0 : video.url);
      if (!videoId) return [];
      return [`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`];
    },
    thumbnailStyle(video) {
      const thumbnails = this.youTubeThumbnailUrls(video);
      const baseStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
      if (thumbnails.length) {
        const overlay = 'linear-gradient(180deg, rgba(5, 150, 105, 0.25), rgba(5, 23, 42, 0))';
        return _objectSpread(_objectSpread({}, baseStyle), {}, {
          backgroundImage: [overlay, ...thumbnails.map(url => `url(${url})`)].join(', ')
        });
      }
      const accent = this.videoAccentPair(video);
      return _objectSpread(_objectSpread({}, baseStyle), {}, {
        backgroundImage: `linear-gradient(145deg, ${accent.primary}, ${accent.secondary}), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%)`
      });
    },
    videoAccentPair(video) {
      const palette = VIDEO_ACCENT_PAIRS;
      const index = this.hashString(video === null || video === void 0 ? void 0 : video.title) % palette.length;
      return palette[index];
    },
    hashString(value) {
      if (!value) return 0;
      let hash = 0;
      for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    },
    videoTags(video, fallbackTag = 'Revert Story') {
      if (!video) return [];
      if (videoTagCache.has(video)) return videoTagCache.get(video);
      const explicitTags = (video.tags || []).filter(Boolean);
      if (explicitTags.length) {
        videoTagCache.set(video, explicitTags);
        return explicitTags;
      }
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase();
      const matches = [];
      const seen = new Set();
      for (const rule of VIDEO_TAG_RULES) {
        if (matches.length >= 2) break;
        if (seen.has(rule.tag)) continue;
        const keywordFound = rule.keywords.some(keyword => text.includes(keyword));
        if (keywordFound) {
          matches.push(rule.tag);
          seen.add(rule.tag);
        }
      }
      const resolved = matches.length ? matches : [fallbackTag];
      videoTagCache.set(video, resolved);
      return resolved;
    },
    parseDurationInSeconds(duration) {
      if (!duration) return 0;
      const cleaned = `${duration}`.replace(/[^\d:]/g, '').trim();
      if (!cleaned) return 0;
      const parts = cleaned.split(':').map(segment => Number(segment.trim()));
      if (parts.some(part => Number.isNaN(part))) return 0;
      return parts.reduce((total, part) => total * 60 + part, 0);
    },
    getVideoDurationSeconds(video) {
      if (!video) return 0;
      if (videoDurationCache.has(video)) return videoDurationCache.get(video);
      const seconds = this.parseDurationInSeconds(video.duration);
      videoDurationCache.set(video, seconds);
      return seconds;
    },
    deriveVideoGender(video) {
      if (!video) return 'other';
      if (videoGenderCache.has(video)) return videoGenderCache.get(video);
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase();
      let gender = 'other';
      if (FEMALE_KEYWORDS.some(keyword => text.includes(keyword))) {
        gender = 'female';
      } else if (MALE_KEYWORDS.some(keyword => text.includes(keyword))) {
        gender = 'male';
      }
      videoGenderCache.set(video, gender);
      return gender;
    },
    completeAndNext() {
      const nextId = this.selectedPill + 1;
      const isFinalChapter = this.selectedPill === FINAL_CHAPTER_ID;
      const shouldShowCompletionModal = this.selectedPill === BEGINNER_COMPLETION_CHAPTER_ID;
      if (nextId > this.maxStepReached) {
        const updatedMax = Math.min(nextId, FINAL_CHAPTER_ID);
        this.maxStepReached = updatedMax;
        localStorage.setItem('maxStepReached', updatedMax.toString());
        this.updateStreakRecord();
        const chapter = this.roadmapData.find(c => c.id === this.selectedPill);
        this.successMessage = isFinalChapter ? `You’ve completed the final chapter, “${(chapter === null || chapter === void 0 ? void 0 : chapter.title) || 'Chapter'}”! Keep practicing the insights and share them with others.` : `"${(chapter === null || chapter === void 0 ? void 0 : chapter.title) || 'Chapter'}" chapter has been completed successfully!`;
        this.showSuccessAlert = true;
        this.isWaitingForNext = true;

        // FULL-SCREEN CONFETTI PARTY!
        const celebratingChapterId = this.selectedPill;
        this.$nextTick(() => {
          this.triggerConfetti(isFinalChapter, {
            celebrationChapterId: celebratingChapterId
          });
        });

        // Auto hide toast
        setTimeout(() => {
          this.showSuccessAlert = false;
          setTimeout(() => {
            this.isWaitingForNext = false;
          }, 3000);
        }, 6000);
      }
      if (shouldShowCompletionModal) {
        this.showCompletionModal = true;
      }
      if (isFinalChapter) {
        setTimeout(() => {
          this.selectedPill = 1;
          this.chapterQuizPassed = false;
        }, 900);
      } else if (nextId <= this.roadmapData.length) {
        this.selectedPill = nextId;
        this.chapterQuizPassed = false;
      }
    },
    retryQuiz() {
      this.resetQuizSet();
      this.quizFeedback = '';
      this.quizStatus = null;
      this.selectedOption = null;
    },
    openResource(resource) {
      this.activeResource = resource;
      this.showResourceModal = true;
    },
    closeResourceModal() {
      this.showResourceModal = false;
      this.activeResource = null;
    },
    closeVideoModal() {
      this.showVideoModal = false;
    },
    resetVideoFilters() {
      this.videoSearchTerm = '';
      this.videoDurationFilter = 'all';
      this.videoGenderFilter = 'all';
      this.videoBackgroundFilter = 'all';
    },
    openHelpModal() {
      this.showHelpModal = true;
    },
    closeHelpModal() {
      this.showHelpModal = false;
    },
    openSearchInfoModal() {
      this.showSearchInfoModal = true;
    },
    closeSearchInfoModal() {
      this.showSearchInfoModal = false;
    },
    closeCompletionModal() {
      this.showCompletionModal = false;
    },
    stripeAmountUrl(amountMinor) {
      const baseUrl = this.donationStripeBaseUrl;
      if (!baseUrl) return '';
      const joiner = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${joiner}amount=${amountMinor}`;
    },
    // Randomizes the quiz payload so each attempt feels fresh.
    resetQuizSet() {
      const base = this.currentQuizData.map(question => _objectSpread(_objectSpread({}, question), {}, {
        options: this.shuffleArray(question.options || [])
      }));
      this.quizQuestions = this.shuffleArray(base);
      this.currentQuestionIndex = 0;
      this.quizStatus = null;
      this.quizFeedback = '';
      this.quizCorrectCount = 0;
      this.chapterQuizPassed = false;
    },
    advanceQuestion() {
      if (!this.quizQuestions.length) return;
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.quizQuestions.length;
      this.quizStatus = null;
      this.selectedOption = null;
      this.lastIncorrectExplanation = null;
    },
    scrollToNextButton() {
      const nextBtn = document.querySelector('.next-btn');
      if (nextBtn) {
        nextBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    },
    globalSearchSectionId(sectionKey) {
      return GLOBAL_SEARCH_SECTION_ID_MAP[sectionKey] || '';
    },
    globalSearchSectionIcon(sectionKey) {
      return GLOBAL_SEARCH_SECTION_ICONS[sectionKey] || 'bi-bookmark';
    },
    scrollToGlobalSearchSection(sectionKey) {
      const sectionId = this.globalSearchSectionId(sectionKey);
      if (!sectionId) return;
      this.jumpToContentSection(sectionId);
    },
    scrollToSectionId(sectionId) {
      if (!sectionId || typeof document === 'undefined') return;
      const target = document.getElementById(sectionId);
      if (!target) return;
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    scrollToTop({
      behavior = 'smooth'
    } = {}) {
      if (typeof window === 'undefined') return;
      const scrollTarget = this.resolveScrollContainer();
      if (scrollTarget && scrollTarget !== window && typeof scrollTarget.scrollTo === 'function') {
        scrollTarget.scrollTo({
          top: 0,
          behavior
        });
        return;
      }
      window.scrollTo({
        top: 0,
        behavior
      });
    },
    copyResourceLink() {
      var _this$activeResource, _navigator$clipboard;
      const link = (_this$activeResource = this.activeResource) === null || _this$activeResource === void 0 ? void 0 : _this$activeResource.link;
      if (!link) return;
      (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 || _navigator$clipboard.writeText(link).then(() => {
        this.resourceCopyStatus = 'Link copied!';
        this.triggerCopyAlert('Resource link copied!', 'success');
        setTimeout(() => {
          this.resourceCopyStatus = '';
        }, 2500);
      }).catch(() => {
        this.resourceCopyStatus = 'Unable to copy; please use your browser.';
        setTimeout(() => {
          this.resourceCopyStatus = '';
        }, 4000);
      });
    },
    copyResourceEntry(entry) {
      const text = String(entry || '').trim();
      if (!text) return;
      this.copyTextToClipboard(text).then(() => {
        this.triggerCopyAlert('Reference copied!', 'success');
      }).catch(() => {
        this.triggerCopyAlert('Unable to copy reference.', 'danger');
      });
    },
    getShareLink() {
      if (typeof window === 'undefined') return '';
      return `${window.location.origin}${window.location.pathname}`;
    },
    openWhatsappShare(text) {
      if (!text) return;
      if (typeof window === 'undefined') return;
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(shareUrl, '_blank');
    },
    getPrintableDocument(title, body) {
      const now = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      const duaItems = body.split('\n').filter(Boolean).map(line => {
        const matches = line.match(/(.+)\s\((.+)\)$/);
        if (matches) {
          return `<div class="dua-card"><strong>${matches[1]}</strong><span class="english">(${matches[2]})</span></div>`;
        }
        return `<div class="dua-card">${line}</div>`;
      }).join('');
      return `
        <html>
          <head>
            <title>${title}</title>
            <style>
              :root {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                color: #0f172a;
              }
              body {
                margin: 0;
                padding: 24px;
                background: #f8fafc;
              }
              header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid rgba(38, 41, 46, 0.12);
                padding-bottom: 0.5rem;
              }
              header h1 {
                margin: 0;
                font-size: 1.6rem;
              }
              .date-label {
                font-size: 0.9rem;
                color: #475467;
              }
              .dua-list {
                list-style: none;
                padding: 0;
                margin: 0;
                line-height: 1.6;
                font-size: 1.05rem;
              }
              .dua-card {
                margin-bottom: 1rem;
              }
              .dua-card span.english {
                display: block;
                color: #475467;
                font-size: 0.95rem;
              }
              .footer-note {
                margin-top: 2rem;
                font-size: 0.85rem;
                color: #94a3b8;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>${title}</h1>
              <div class="date-label">${now}</div>
            </header>
            <div class="dua-list">
              ${duaItems}
            </div>
            <p class="footer-note">Content from Islamic Connect · www.islamic-connect.com</p>
          </body>
        </html>
      `;
    },
    printContent(title, body) {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      const html = this.getPrintableDocument(title, body);
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
    changeScale(target, delta, min, max) {
      this[target] = Math.min(max, Math.max(min, this[target] + delta));
    },
    sectionFontScale(key) {
      var _this$sectionFontScal;
      return (_this$sectionFontScal = this.sectionFontScales[key]) !== null && _this$sectionFontScal !== void 0 ? _this$sectionFontScal : DEFAULT_SECTION_FONT_SCALE;
    },
    sectionFontStyle(key) {
      const scale = this.sectionFontScale(key);
      return {
        '--section-scale': scale,
        '--section-font-size': `${scale}rem`
      };
    },
    adjustSectionFontScale(key, delta) {
      const current = this.sectionFontScale(key);
      const next = Math.min(SECTION_FONT_MAX, Math.max(SECTION_FONT_MIN, current + delta));
      this.sectionFontScales = _objectSpread(_objectSpread({}, this.sectionFontScales), {}, {
        [key]: next
      });
    },
    increaseSectionFont(key) {
      this.adjustSectionFontScale(key, 0.1);
    },
    decreaseSectionFont(key) {
      this.adjustSectionFontScale(key, -0.1);
    },
    isSectionFontMin(key) {
      return this.sectionFontScale(key) <= SECTION_FONT_MIN + 0.001;
    },
    isSectionFontMax(key) {
      return this.sectionFontScale(key) >= SECTION_FONT_MAX - 0.001;
    },
    increaseOverviewFontSize() {
      this.changeScale('overviewFontScale', 0.1, 0.8, 1.6);
    },
    decreaseOverviewFontSize() {
      this.changeScale('overviewFontScale', -0.1, 0.8, 1.6);
    },
    increaseDuaFontSize() {
      this.changeScale('duaFontScale', 0.1, 0.8, 1.6);
    },
    decreaseDuaFontSize() {
      this.changeScale('duaFontScale', -0.1, 0.8, 1.6);
    },
    increaseGlobalFont() {
      this.globalFontScale = Math.min(1.3, this.globalFontScale + 0.05);
    },
    decreaseGlobalFont() {
      this.globalFontScale = Math.max(0.85, this.globalFontScale - 0.05);
    },
    setShareStatus(type, message) {
      if (type === 'lesson') {
        this.lessonShareStatus = message;
        setTimeout(() => {
          this.lessonShareStatus = '';
        }, 3000);
      } else if (type === 'dua') {
        this.duaShareStatus = message;
        setTimeout(() => {
          this.duaShareStatus = '';
        }, 3000);
      }
    },
    copyTextToClipboard(text) {
      var _navigator$clipboard2;
      if (!text || typeof document === 'undefined') return Promise.reject();
      if ((_navigator$clipboard2 = navigator.clipboard) !== null && _navigator$clipboard2 !== void 0 && _navigator$clipboard2.writeText) {
        return navigator.clipboard.writeText(text);
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful ? Promise.resolve() : Promise.reject();
    },
    triggerCopyAlert(message, type = 'info') {
      if (this.copyAlertTimeout) {
        clearTimeout(this.copyAlertTimeout);
      }
      this.copyAlertMessage = message;
      this.copyAlertType = type === 'danger' ? 'info' : type;
      this.showCopyAlert = true;
      this.copyAlertTimeout = setTimeout(() => {
        this.showCopyAlert = false;
        this.copyAlertMessage = '';
        this.copyAlertTimeout = null;
      }, 3000);
    },
    getLessonOverviewText() {
      var _lesson$summary;
      const lesson = this.currentLesson;
      if (!lesson) return '';
      const summary = ((_lesson$summary = lesson.summary) === null || _lesson$summary === void 0 ? void 0 : _lesson$summary.trim()) || 'Read slowly, ask questions, and pause between each section.';
      return `Lesson Overview: ${lesson.title}\n${summary}\nExplore more on Islamic Connect: ${this.getShareLink()}`;
    },
    shareLessonOverview() {
      this.openWhatsappShare(this.getLessonOverviewText());
    },
    copyLessonOverview() {
      const text = this.getLessonOverviewText();
      this.copyTextToClipboard(text).then(() => {
        this.setShareStatus('lesson', 'Lesson overview copied!');
        this.triggerCopyAlert('Lesson overview copied!', 'success');
      }).catch(() => {
        this.setShareStatus('lesson', 'Unable to copy.');
      });
    },
    printLessonOverview() {
      this.printContent('Lesson Overview', this.getLessonOverviewText());
    },
    getCurrentChapterStudyText() {
      const lesson = this.currentLesson || {};
      const title = lesson.title || `Chapter ${this.selectedPill || ''}`.trim() || 'Revert study chapter';
      const summary = lesson.summary || 'Read slowly and return to what benefits your heart.';
      const sections = this.overviewSectionsWithKeys.length ? this.overviewSectionsWithKeys : this.lessonSectionsWithKeys;
      const sectionText = sections.slice(0, 5).map((section, index) => {
        const heading = section.heading || section.title || `Section ${index + 1}`;
        const content = String(section.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return `${index + 1}. ${heading}\n${content}`;
      }).join('\n\n');
      const refs = (this.resourceSectionsWithKeys || []).slice(0, 1).flatMap(section => (section.items || []).slice(0, 2)).flatMap(item => (item.entries || []).slice(0, 3)).join('\n');
      return [title, '', summary, '', sectionText, refs ? `\nFoundational References\n${refs}` : '', `\nIslamic Connect: ${this.getShareLink()}`].filter(Boolean).join('\n');
    },
    currentChapterSlug() {
      var _this$currentLesson30;
      return (((_this$currentLesson30 = this.currentLesson) === null || _this$currentLesson30 === void 0 ? void 0 : _this$currentLesson30.title) || `chapter-${this.selectedPill || 'study'}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'revert-study';
    },
    downloadCurrentChapterPdf() {
      try {
        var _this$currentLesson31, _this$currentLesson32;
        const doc = new jspdf__WEBPACK_IMPORTED_MODULE_21__.jsPDF({
          unit: 'pt',
          format: 'letter'
        });
        const margin = 44;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let cursorY = 52;
        const addText = (text, fontSize = 11, fontStyle = 'normal', gap = 10) => {
          if (!text) return;
          doc.setFont('helvetica', fontStyle);
          doc.setFontSize(fontSize);
          const lines = doc.splitTextToSize(String(text), pageWidth - margin * 2);
          const lineHeight = fontSize + 4;
          const needed = lines.length * lineHeight;
          if (cursorY + needed > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
          }
          doc.text(lines, margin, cursorY);
          cursorY += needed + gap;
        };
        addText(((_this$currentLesson31 = this.currentLesson) === null || _this$currentLesson31 === void 0 ? void 0 : _this$currentLesson31.title) || 'Revert Study Chapter', 18, 'bold', 14);
        addText(((_this$currentLesson32 = this.currentLesson) === null || _this$currentLesson32 === void 0 ? void 0 : _this$currentLesson32.summary) || '', 11, 'normal', 16);
        const sections = this.overviewSectionsWithKeys.length ? this.overviewSectionsWithKeys : this.lessonSectionsWithKeys;
        sections.slice(0, 5).forEach((section, index) => {
          addText(`${index + 1}. ${section.heading || section.title || 'Section'}`, 13, 'bold', 6);
          addText(String(section.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(), 10, 'normal', 12);
        });
        const refs = (this.resourceSectionsWithKeys || []).slice(0, 1).flatMap(section => (section.items || []).slice(0, 2)).flatMap(item => (item.entries || []).slice(0, 3));
        if (refs.length) {
          addText('Foundational References', 13, 'bold', 6);
          refs.forEach(ref => addText(`- ${ref}`, 9, 'normal', 5));
        }
        doc.save(`${this.currentChapterSlug()}.pdf`);
        this.offlineActionStatus = 'PDF downloaded.';
        this.triggerCopyAlert('PDF downloaded.', 'success');
        setTimeout(() => {
          this.offlineActionStatus = '';
        }, 3000);
      } catch (error) {
        this.reportAsyncError(error, 'download this chapter PDF');
        this.offlineActionStatus = 'Unable to download right now.';
        setTimeout(() => {
          this.offlineActionStatus = '';
        }, 4000);
      }
    },
    saveCurrentChapterOffline() {
      try {
        var _this$currentLesson33, _this$currentLesson34;
        const payload = {
          chapterId: ((_this$currentLesson33 = this.currentLesson) === null || _this$currentLesson33 === void 0 ? void 0 : _this$currentLesson33.chapterId) || this.selectedPill,
          title: ((_this$currentLesson34 = this.currentLesson) === null || _this$currentLesson34 === void 0 ? void 0 : _this$currentLesson34.title) || 'Revert study chapter',
          savedAt: new Date().toISOString(),
          text: this.getCurrentChapterStudyText()
        };
        localStorage.setItem('revertOfflineChapter', JSON.stringify(payload));
        this.offlineActionStatus = 'Saved for offline reading on this device.';
        this.triggerCopyAlert('Saved for offline reading.', 'success');
        setTimeout(() => {
          this.offlineActionStatus = '';
        }, 3200);
      } catch (error) {
        this.reportAsyncError(error, 'save this chapter offline');
        this.offlineActionStatus = 'Unable to save offline right now.';
        setTimeout(() => {
          this.offlineActionStatus = '';
        }, 4000);
      }
    },
    getDuasText() {
      if (!this.currentDuas.length) return '';
      return this.currentDuas.map(dua => `${dua.arabic} (${dua.english})`).join('\n');
    },
    shareDuas() {
      var _this$currentLesson35;
      const message = `Duas to carry from ${((_this$currentLesson35 = this.currentLesson) === null || _this$currentLesson35 === void 0 ? void 0 : _this$currentLesson35.title) || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`;
      this.openWhatsappShare(message);
    },
    copyDuas() {
      var _this$currentLesson36;
      const text = `Duas to carry from ${((_this$currentLesson36 = this.currentLesson) === null || _this$currentLesson36 === void 0 ? void 0 : _this$currentLesson36.title) || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`;
      this.copyTextToClipboard(text).then(() => {
        this.setShareStatus('dua', 'Duas copied to clipboard!');
        this.triggerCopyAlert('Duas copied to clipboard!', 'success');
      }).catch(() => {
        this.setShareStatus('dua', 'Unable to copy.');
      });
    },
    printDuas() {
      const text = this.getDuasText();
      this.printContent('Duas to Carry', text);
    },
    copyShareLink() {
      const link = this.getShareLink();
      if (!link) return;
      this.copyTextToClipboard(link).then(() => {
        this.shareFriendStatus = 'Link copied! Send it so a friend can join.';
        this.triggerCopyAlert('Lesson link copied!', 'success');
        setTimeout(() => {
          this.shareFriendStatus = '';
        }, 3000);
      }).catch(() => {
        this.shareFriendStatus = 'Unable to copy; please use your browser directly.';
        setTimeout(() => {
          this.shareFriendStatus = '';
        }, 4000);
      });
    },
    formatPlanMessage(plan) {
      var _this$currentLesson37, _plan$highlights;
      const chapterTitle = ((_this$currentLesson37 = this.currentLesson) === null || _this$currentLesson37 === void 0 ? void 0 : _this$currentLesson37.title) || 'this chapter';
      const highlights = ((_plan$highlights = plan.highlights) === null || _plan$highlights === void 0 ? void 0 : _plan$highlights.map((item, index) => `${index + 1}. ${item}`).join('\n')) || '';
      return `${plan.title} (${plan.duration}) for ${chapterTitle}\n${plan.description}\n\nHighlights:\n${highlights}`;
    },
    sharePlan(plan) {
      const message = this.formatPlanMessage(plan);
      this.openWhatsappShare(message);
    },
    copyPlan(plan) {
      const message = this.formatPlanMessage(plan);
      this.copyTextToClipboard(message).then(() => {
        this.triggerCopyAlert('Plan copied to clipboard!', 'success');
      }).catch(() => {
        this.triggerCopyAlert('Unable to copy the plan.', 'danger');
      });
    },
    executePlanPrint(plan) {
      var _this$currentLesson38;
      const title = `${plan.title} • ${((_this$currentLesson38 = this.currentLesson) === null || _this$currentLesson38 === void 0 ? void 0 : _this$currentLesson38.title) || 'Chapter'}`;
      const body = this.formatPlanMessage(plan);
      this.printContent(title, body);
    },
    printPlan(plan) {
      this.executePlanPrint(plan);
    },
    downloadPlanAsPdf(plan) {
      try {
        var _this$currentLesson39, _plan$highlights2, _this$currentLesson40;
        const doc = new jspdf__WEBPACK_IMPORTED_MODULE_21__.jsPDF({
          unit: 'pt',
          format: 'letter'
        });
        const margin = 40;
        const pageHeight = doc.internal.pageSize.getHeight();
        let cursorY = 50;
        const addText = (text, fontSize = 12, fontStyle = 'normal') => {
          doc.setFontSize(fontSize);
          doc.setFont('helvetica', fontStyle);
          const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin * 2);
          const lineHeight = fontSize + 4;
          const heightNeeded = lines.length * lineHeight;
          if (cursorY + heightNeeded > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
          }
          doc.text(lines, margin, cursorY);
          cursorY += heightNeeded + 12;
        };
        const titleText = `${plan.title} • ${((_this$currentLesson39 = this.currentLesson) === null || _this$currentLesson39 === void 0 ? void 0 : _this$currentLesson39.title) || 'Chapter'}`;
        addText(titleText, 18, 'bold');
        addText(plan.description, 12, 'normal');
        (_plan$highlights2 = plan.highlights) === null || _plan$highlights2 === void 0 || _plan$highlights2.forEach((line, index) => {
          const text = `${index + 1}. ${line}`;
          addText(text, 11, 'normal');
        });
        const slug = (((_this$currentLesson40 = this.currentLesson) === null || _this$currentLesson40 === void 0 ? void 0 : _this$currentLesson40.title) || 'chapter').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
        doc.save(`${plan.planId}-${slug || 'plan'}.pdf`);
      } catch (error) {
        this.reportAsyncError(error, 'create the PDF');
        this.triggerCopyAlert('Unable to download the plan right now.', 'danger');
      }
    },
    shuffleArray(arr) {
      return arr.slice().sort(() => Math.random() - 0.5);
    },
    scrollToSection(target) {
      this.$nextTick(() => {
        if (typeof target === 'string') {
          this.activeSectionJumpId = target;
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            return;
          }
          this.scrollToTop();
          return;
        }
        const cards = document.querySelectorAll('.guidance-card .guidance-card-item');
        if (cards[target]) {
          cards[target].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } else {
          this.scrollToTop();
        }
      });
    },
    answerQuiz(option) {
      const question = this.currentQuestion;
      if (!question) return;
      const correct = option === question.answer;
      this.quizStatus = correct ? 'correct' : 'incorrect';
      this.selectedOption = option;
      if (correct) {
        this.quizCorrectCount++;
        this.lastIncorrectExplanation = null;
        if (this.quizCorrectCount >= this.quizRequiredCorrect) {
          this.chapterQuizPassed = true;
          this.quizFeedback = 'Nicely done! The Next Chapter button is activated.';
          this.$nextTick(() => {
            this.scrollToNextButton();
          });
        } else {
          this.quizFeedback = `Great! ${this.quizCorrectCount}/${this.quizRequiredCorrect} saved ${this.quizRequiredCorrect - this.quizCorrectCount} to go.`;
          setTimeout(() => {
            this.advanceQuestion();
          }, 700);
        }
      } else {
        var _question$sectionInde3, _this$currentLesson41;
        this.quizFeedback = 'Not quite, try another option.';
        const sectionIndex = (_question$sectionInde3 = question.sectionIndex) !== null && _question$sectionInde3 !== void 0 ? _question$sectionInde3 : 0;
        const section = (_this$currentLesson41 = this.currentLesson) === null || _this$currentLesson41 === void 0 || (_this$currentLesson41 = _this$currentLesson41.sections) === null || _this$currentLesson41 === void 0 ? void 0 : _this$currentLesson41[sectionIndex];
        const sectionId = section ? `section-${this.selectedPill}-${sectionIndex}` : '';
        const explanation = question.explanation || '';
        if (explanation) {
          this.lastIncorrectExplanation = {
            text: explanation,
            sectionId
          };
        } else {
          this.lastIncorrectExplanation = null;
        }
      }
    }
  }
}));

/***/ }),

/***/ "./resources/components/vue/data/chapterDosDonts.json":
/*!************************************************************!*\
  !*** ./resources/components/vue/data/chapterDosDonts.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"chapter":"Islamic Foundation","dos":[{"id":"islamic-foundation-do-1","text":"Begin learning with Tawheed it is the first obligation upon every human."},{"id":"islamic-foundation-do-2","text":"Understand Tawheed in its three categories."},{"id":"islamic-foundation-do-3","text":"Purify your intentions for Allāh alone in all acts of worship."},{"id":"islamic-foundation-do-4","text":"Learn the correct Names and Attributes of Allāh as revealed."},{"id":"islamic-foundation-do-5","text":"Teach Tawheed to your family with wisdom."}],"donts":[{"id":"islamic-foundation-dont-1","text":"Don\'t associate any partner with Allāh in worship this is Shirk."},{"id":"islamic-foundation-dont-2","text":"Don\'t compare Allāh to His creation in His Attributes."},{"id":"islamic-foundation-dont-3","text":"Don\'t seek help, protection, or blessings from other than Allāh."},{"id":"islamic-foundation-dont-4","text":"Don\'t make intermediaries between yourself and Allāh."},{"id":"islamic-foundation-dont-5","text":"Don\'t neglect learning Tawheed while focusing only on secondary matters."}]},{"chapterId":2,"chapter":"Islamic Beliefs","dos":[{"id":"islamic-beliefs-do-1","text":"Internalize that true Īmān increases with obedience and decreases with sin."},{"id":"islamic-beliefs-do-2","text":"Reflect on the names and attributes of Allāh to strengthen your first pillar of faith."},{"id":"islamic-beliefs-do-3","text":"Send prayers (ṣalāh) upon the Prophet ﷺ daily, affirming belief in messengers."},{"id":"islamic-beliefs-do-4","text":"Remember death and the Hereafter frequently to align your actions."},{"id":"islamic-beliefs-do-5","text":"Trust in Allāh’s decree while taking the lawful means (asbāb) for your affairs."}],"donts":[{"id":"islamic-beliefs-dont-1","text":"Don\'t deny any part of the six articles of faith; doing so nullifies Īmān."},{"id":"islamic-beliefs-dont-2","text":"Don\'t speak about the how of Allāh’s attributes (e.g., How is His Hand?); affirm them without distortion."},{"id":"islamic-beliefs-dont-3","text":"Don\'t disrespect any prophet or angel; they are all honoured servants of Allāh."},{"id":"islamic-beliefs-dont-4","text":"Don\'t fall into despair or anxiety by misunderstanding Divine Decree; it includes both good and bad as a test."},{"id":"islamic-beliefs-dont-5","text":"Don\'t  neglect the worldly life out of belief in the Hereafter; Islam commands balance."}]},{"chapterId":3,"chapter":"Islamic Pillars","dos":[{"id":"islamic-pillars-do-1","text":"Learn the conditions and integrals (arkān) of each pillar."},{"id":"islamic-pillars-do-2","text":"Perform ṣalāh with congregation (jamā\'ah) when possible."},{"id":"islamic-pillars-do-3","text":"Calculate zakāh accurately and give it promptly."},{"id":"islamic-pillars-do-4","text":"Protect your fast from vain speech and arguments."},{"id":"islamic-pillars-do-5","text":"Sincerely intend to perform Hajj when capable."}],"donts":[{"id":"islamic-pillars-dont-1","text":"Don\'t delay prayers beyond their prescribed times without valid excuse."},{"id":"islamic-pillars-dont-2","text":"Don\'t treat zakāh as a mere tax; give with the intention of purification."},{"id":"islamic-pillars-dont-3","text":"Don\'t break your fast intentionally without a Shar\'ī excuse."},{"id":"islamic-pillars-dont-4","text":"Don\'t perform Hajj with harām (unlawful) money."},{"id":"islamic-pillars-dont-5","text":"Don\'t neglect the inner dimensions; avoid praying without humility or fasting without restraint."}]},{"chapterId":4,"chapter":"Islamic Quran","dos":[{"id":"islamic-quran-do-1","text":"Seek refuge from Shayṭān and begin with Bismillāh before recitation."},{"id":"islamic-quran-do-2","text":"Strive to understand the meaning, even if just one verse a day."},{"id":"islamic-quran-do-3","text":"Maintain ritual purity (Wuḍūʾ) when touching the physical Muṣḥaf."},{"id":"islamic-quran-do-4","text":"Listen attentively and be silent when the Qur\'an is recited. \\"So when the Qur\'an is recited, then listen to it and pay attention that you may receive mercy.\\" (Al-Aʿrāf 7:204)"},{"id":"islamic-quran-do-5","text":"Let the Qur\'an guide your decisions, character, and worldview."}],"donts":[{"id":"islamic-quran-dont-1","text":"Don\'t touch the Muṣḥaf without Wuḍūʾ. \\"None should touch it except the purified.\\" (Al-Wāqiʿah 56:79 - interpreted by scholars as physical purity)."},{"id":"islamic-quran-dont-2","text":"Don\'t recite it in impure places like bathrooms."},{"id":"islamic-quran-dont-3","text":"Don\'t argue or be prideful with the Qur\'an; its purpose is guidance, not dispute."},{"id":"islamic-quran-dont-4","text":"Don\'t neglect its memorization and revision if you have memorized any part. The Prophet ﷺ said it escapes the heart faster than a tied camel. (Ṣaḥīḥ al-Bukhārī 5032)"},{"id":"islamic-quran-dont-5","text":"Don\'t interpret it based on personal opinion; refer to the explanations of the Prophet ﷺ, his companions, and trusted scholars."}]},{"chapterId":5,"chapter":"Islamic Prophet","dos":[{"id":"islamic-prophet-do-1","text":"Believe in his prophethood firmly and follow his Sunnah meticulously."},{"id":"islamic-prophet-do-2","text":"Send prayers (Ṣalāt) and peace (Salām) upon him whenever he is mentioned. \\"Indeed, Allah and His angels send blessings upon the Prophet. O you who believe, send blessings upon him and greet him with peace.\\" (Al-Ahzab 33:56)"},{"id":"islamic-prophet-do-3","text":"Love him more than yourself, your family, and your wealth. The Prophet ﷺ said: \\"None of you truly believes until I am more beloved to him than his children, his parents, and all people.\\" (Sahih al-Bukhari 15)"},{"id":"islamic-prophet-do-4","text":"Study his Seerah to understand how to implement Islam in daily life."},{"id":"islamic-prophet-do-5","text":"Defend his honor and respond to slanders with wisdom and correct knowledge."}],"donts":[{"id":"islamic-prophet-dont-1","text":"Avoid exceeding proper bounds in praising him; he is a human servant of Allah, not divine."},{"id":"islamic-prophet-dont-2","text":"Avoid depicting him in images or drawings, as this can lead to exaggeration and is prohibited."},{"id":"islamic-prophet-dont-3","text":"Verify any teaching or practice attributed to him before following it."},{"id":"islamic-prophet-dont-4","text":"Avoid innovating in matters of religion claiming it honors him; the best honor is following his authentic Sunnah."},{"id":"islamic-prophet-dont-5","text":"Never prioritize cultural customs over his clear teachings and example."}]},{"chapterId":6,"chapter":"Islamic Prayers","dos":[{"id":"islamic-prayers-do-1","text":"Perform wudu properly and calmly; it prepares you for prayer and removes sins. (Quran 5:6; Sahih Muslim 244)"},{"id":"islamic-prayers-do-2","text":"Pray in the mosque in congregation (for men) when possible; it carries multiplied reward. (Sahih al-Bukhari 645)"},{"id":"islamic-prayers-do-3","text":"Understand the meanings of what you recite, especially Surah al-Fatiha; it is required in every rak\'ah. (Sahih Muslim 395)"},{"id":"islamic-prayers-do-4","text":"Make du\'a in prostration; ask for both worldly and Hereafter needs. (Sahih Muslim 482)"},{"id":"islamic-prayers-do-5","text":"Observe the Sunnah and nawafil prayers; they complete deficiencies in the obligatory prayers. (Sunan at-Tirmidhi 413)"}],"donts":[{"id":"islamic-prayers-dont-1","text":"Don\'t rush through prayer; the Prophet forbade pecking like a crow. (Sunan Abi Dawud 862)"},{"id":"islamic-prayers-dont-2","text":"Don\'t look around during prayer; keep your gaze at the place of prostration to protect khushu. (Sunan Abi Dawud 909)"},{"id":"islamic-prayers-dont-3","text":"Don\'t precede the Imam in movements; follow him closely. (Sahih Muslim 414)"},{"id":"islamic-prayers-dont-4","text":"Don\'t pray while needing to relieve yourself; wait until you are calm and focused. (Sahih Muslim 560)"},{"id":"islamic-prayers-dont-5","text":"Don\'t neglect the tashahhud and salat upon the Prophet; they complete the prayer. (Sahih al-Bukhari 831; Quran 33:56)"}]},{"chapterId":7,"chapter":"Islamic Dua Dhikr","dos":[{"id":"islamic-dua-dhkir-do-1","text":"Make duʿāʾ with humility, hope, and fear, lowering your voice between a whisper and speaking aloud."},{"id":"islamic-dua-dhkir-do-2","text":"Face the Qiblah if possible when making duʿāʾ, as the Prophet ﷺ did during important supplications. (Ṣaḥīḥ al-Bukhārī 3995)"},{"id":"islamic-dua-dhkir-do-3","text":"Use the comprehensive duʿāʾs taught by the Prophet ﷺ, such as: \\"Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ʿadhāban-nār.\\" (Al-Baqarah 2:201)"},{"id":"islamic-dua-dhkir-do-4","text":"Persist in your duʿāʾ and do not say \\"I prayed but wasn\'t answered.\\" The response is guaranteed in one of the three ways mentioned."},{"id":"islamic-dua-dhkir-do-5","text":"Make duʿāʾ for other believers in their absence, as the angels say \\"Āmīn, and for you the same.\\" (Ṣaḥīḥ Muslim 2732)"}],"donts":[{"id":"islamic-dua-dhkir-dont-1","text":"Don\'t be impatient or give up on duʿāʾ. The Prophet ﷺ said: \\"The duʿāʾ of any one of you will be answered so long as he is not impatient and says, \'I made duʿāʾ but it was not answered.\'\\" (Ṣaḥīḥ al-Bukhārī 6340)"},{"id":"islamic-dua-dhkir-dont-2","text":"Don\'t wish for hardship to strike just so you can make duʿāʾ. Ask for well-being."},{"id":"islamic-dua-dhkir-dont-3","text":"Don\'t supplicate for something sinful or for severing family ties."},{"id":"islamic-dua-dhkir-dont-4","text":"Don\'t neglect dhikr in gatherings. The Prophet ﷺ warned that a gathering without dhikr of Allah is a cause for regret on Judgment Day. (Sunan Abī Dāwūd 4855)"},{"id":"islamic-dua-dhkir-dont-5","text":"Don\'t use fabricated or weak duʿāʾs. Stick to what is verified in the Qur\'an and authentic Sunnah."}]},{"chapterId":8,"chapter":"Islamic Heart","dos":[{"id":"islamic-heart-do-1","text":"Start each day with morning adhkār and end with evening adhkār for protection."},{"id":"islamic-heart-do-2","text":"Regularly recite Sūrah al-Falaq & an-Nās to cure jealousy and evil eye."},{"id":"islamic-heart-do-3","text":"Keep company with the righteous they reflect purity onto your heart."},{"id":"islamic-heart-do-4","text":"Perform voluntary night prayer (Tahajjud) it illuminates the heart."},{"id":"islamic-heart-do-5","text":"Give regular charity secretly it extinguishes Allah’s anger and purifies wealth."}],"donts":[{"id":"islamic-heart-dont-1","text":"Don\'t let a day pass without seeking forgiveness (Istighfār 100 times)."},{"id":"islamic-heart-dont-2","text":"Don\'t backbite or listen to gossip it blackens the heart."},{"id":"islamic-heart-dont-3","text":"Don\'t harbor hatred for more than three days; reconcile immediately."},{"id":"islamic-heart-dont-4","text":"Don\'t let worldly pursuits distract you from the five daily prayers."},{"id":"islamic-heart-dont-5","text":"Don\'t envy others; say \\"Mā shāʾ Allāh\\" and make duʿāʾ for them and yourself."}]},{"chapterId":9,"chapter":"Islamic Manners","dos":[{"id":"islamic-manners-do-1","text":"Say Bismillāh before every action (eating, drinking, entering home)."},{"id":"islamic-manners-do-2","text":"Use the right hand for eating, drinking, giving, and taking."},{"id":"islamic-manners-do-3","text":"Ask permission three times before entering (Qur\'an 24:27-28)."},{"id":"islamic-manners-do-4","text":"Visit the sick it\'s a right of one Muslim over another."},{"id":"islamic-manners-do-5","text":"Cover sneezes and say Alḥamdulillāh; others should reply Yarḥamuk Allāh."}],"donts":[{"id":"islamic-manners-dont-1","text":"Don\'t yawn without covering your mouth (it\'s from Shayṭān)."},{"id":"islamic-manners-dont-2","text":"Don\'t backbite or listen to gossip it\'s like eating a brother\'s flesh."},{"id":"islamic-manners-dont-3","text":"Don\'t interrupt others while speaking."},{"id":"islamic-manners-dont-4","text":"Don\'t waste food or water even during ablution."},{"id":"islamic-manners-dont-5","text":"Don\'t laugh excessively it deadens the heart."}]},{"chapterId":10,"chapter":"Islamic Lifestyle","dos":[{"id":"islamic-lifestyle-do-1","text":"Do research the source of your income, food, and investments to ensure purity."},{"id":"islamic-lifestyle-do-2","text":"Do learn basic fiqh of transactions to avoid Riba (interest) and Gharar (uncertainty)."},{"id":"islamic-lifestyle-do-3","text":"Do prioritize Halal-certified products where available and financially feasible."},{"id":"islamic-lifestyle-do-4","text":"Do say Bismillāh before eating; if forgotten, say Bismillāhi awwalahu wa ākhirahu."},{"id":"islamic-lifestyle-do-5","text":"Do ask knowledgeable scholars about doubtful matters specific to your context."}],"donts":[{"id":"islamic-lifestyle-dont-1","text":"Don\'t assume all \\"natural\\" or \\"vegetarian\\" products are automatically Halal check for alcohol-based flavors or animal-derived enzymes."},{"id":"islamic-lifestyle-dont-2","text":"Don\'t engage in speculative trading, gambling-like apps, or ambiguous business partnerships."},{"id":"islamic-lifestyle-dont-3","text":"Don\'t consume food from places that serve alcohol/pork unless certain of separate preparation."},{"id":"islamic-lifestyle-dont-4","text":"Don\'t neglect the spiritual aspect pray to Allah for provision of Halal and protection from Haram."},{"id":"islamic-lifestyle-dont-5","text":"Don\'t be extreme; follow the principle: \\"When in doubt, leave it out,\\" but don\'t create unnecessary hardship."}]},{"chapterId":11,"chapter":"Islamic Family and Marriage","dos":[{"id":"islamic-family-and-marriage-do-1","text":"Do pray in congregation at the masjid; it is 27 times more rewarding and strengthens community bonds."},{"id":"islamic-family-and-marriage-do-2","text":"Do visit the sick, attend funerals, and help resolve disputes between Muslims."},{"id":"islamic-family-and-marriage-do-3","text":"Do support local Muslim businesses, charities, and Islamic schools with your wealth and time."},{"id":"islamic-family-and-marriage-do-4","text":"Do make du\'a for your brothers and sisters in their absence; the angels say \\"Amin, and for you the same.\\""},{"id":"islamic-family-and-marriage-do-5","text":"Do learn about and respectfully engage with the diversity within the Ummah, including different madhahib, cultures, and converts."}],"donts":[{"id":"islamic-family-and-marriage-dont-1","text":"Don\'t boycott a Muslim for more than three days over worldly matters; hasten to reconcile."},{"id":"islamic-family-and-marriage-dont-2","text":"Don\'t backbite, spy, or spread rumors; these destroy community trust."},{"id":"islamic-family-and-marriage-dont-3","text":"Don\'t prioritize ethnic, national, or political identity over Islamic brotherhood."},{"id":"islamic-family-and-marriage-dont-4","text":"Don\'t neglect new Muslims or strangers; welcome and integrate them into the community."},{"id":"islamic-family-and-marriage-dont-5","text":"Don\'t abandon community work because of minor disagreements; strive for unity in essentials."}]},{"chapterId":12,"chapter":"Islamic Community","dos":[{"id":"islamic-community-do-1","text":"Volunteer for mosque events and outreach"},{"id":"islamic-community-do-2","text":"Reach out to newcomers and make introductions"},{"id":"islamic-community-do-3","text":"Share beneficial knowledge during gatherings"},{"id":"islamic-community-do-4","text":"Pray behind knowledgeable imams when possible"},{"id":"islamic-community-do-5","text":"Support neighbors with gifts or kind words"}],"donts":[{"id":"islamic-community-dont-1","text":"Don\'t isolate yourself during key celebrations"},{"id":"islamic-community-dont-2","text":"Avoid judging others for different levels of practice"},{"id":"islamic-community-dont-3","text":"Don\'t withhold help when someone asks"},{"id":"islamic-community-dont-4","text":"Avoid spreading division or unfounded rumors"},{"id":"islamic-community-dont-5","text":"Don\'t ignore the elderly or the disabled in your circle"}]},{"chapterId":13,"chapter":"Islamic Future","dos":[{"id":"islamic-future-do-1","text":"Do establish non-negotiable daily worship: the five prayers, morning/evening adhkar, and Quran recitation. (Quran 20:14; Quran 33:41-42; Sahih al-Bukhari 5027)"},{"id":"islamic-future-do-2","text":"Do set realistic spiritual goals: memorize one new dua each week, attend one weekly class, increase charity gradually. Allah does not burden a soul beyond its capacity. (Quran 2:286)"},{"id":"islamic-future-do-3","text":"Do regularly audit your intentions (niyyah) - ensure actions are for Allah alone, not for showing off. (Quran 98:5; Sahih al-Bukhari 1)"},{"id":"islamic-future-do-4","text":"Do maintain a growth journal noting spiritual insights, struggles, and progress in obedience; Allah commands self-review. (Quran 59:18)"},{"id":"islamic-future-do-5","text":"Do seek righteous companions who encourage your growth and hold you accountable gently. The Prophet (peace be upon him) said: \'A person is upon the religion of his close friend, so look to whom you befriend.\' (Jami at-Tirmidhi 2378)"}],"donts":[{"id":"islamic-future-dont-1","text":"Don\'t compare your spiritual journey to others - everyone has unique tests and blessings from Allah. (Quran 4:32)"},{"id":"islamic-future-dont-2","text":"Don\'t abandon good deeds completely if you miss a day; resume immediately without excessive guilt. The Prophet (peace be upon him) said: \'The most beloved deeds to Allah are those that are consistent, even if small.\' (Sahih al-Bukhari 6465)"},{"id":"islamic-future-dont-3","text":"Don\'t neglect physical health - a sound body supports worship. The Prophet (peace be upon him) said: \'Your body has a right over you.\' (Sahih al-Bukhari 5199)"},{"id":"islamic-future-dont-4","text":"Don\'t despair of Allah\'s mercy during setbacks; His forgiveness encompasses all sins. (Quran 39:53)"},{"id":"islamic-future-dont-5","text":"Don\'t postpone repentance - death may come suddenly, and tomorrow is not guaranteed. (Quran 66:8; Jami at-Tirmidhi 3537)"}]},{"chapterId":14,"chapter":"Islamic Hereafter","dos":[{"id":"islamic-hereafter-do-1","text":"Do frequently remember death and prepare for it through righteous deeds and sincere repentance. (Sunan at-Tirmidhi 2307; Quran At-Tahrim 66:8)"},{"id":"islamic-hereafter-do-2","text":"Do recite Surah al-Mulk every night; it intercedes for its reciter and protects from the punishment of the grave. (Quran Al-Mulk 67:1-30; Sunan at-Tirmidhi 2891)"},{"id":"islamic-hereafter-do-3","text":"Do regularly seek refuge from the punishment of the grave, Hellfire, and the trials of life and death. (Sahih Muslim 588)"},{"id":"islamic-hereafter-do-4","text":"Do visit graveyards to remember the Hereafter and make dua for the deceased. (Sahih Muslim 977)"},{"id":"islamic-hereafter-do-5","text":"Do prioritize acts that continue to benefit you after death (sadaqah jariyah, beneficial knowledge, righteous children). (Sahih Muslim 1631)"}],"donts":[{"id":"islamic-hereafter-dont-1","text":"Don\'t wish for death due to hardship; rather, ask Allah for a good life and a good death. (Sahih al-Bukhari 5671)"},{"id":"islamic-hereafter-dont-2","text":"Don\'t neglect the rights of the deceased: washing, shrouding, praying over, and burying them properly. (Sahih al-Bukhari 1253; Sahih Muslim 947)"},{"id":"islamic-hereafter-dont-3","text":"Don\'t despair of Allah\'s mercy even after major sins; sincere repentance is accepted. (Quran Az-Zumar 39:53)"},{"id":"islamic-hereafter-dont-4","text":"Don\'t engage in excessive mourning or wailing; death is a return to Allah, and patience is rewarded. (Quran Al-Baqarah 2:156; Sahih al-Bukhari 1294)"},{"id":"islamic-hereafter-dont-5","text":"Don\'t assume you\'ll have time later to repent; death may come suddenly. (Quran Al-Munafiqun 63:10; Sahih Muslim 2703)"}]},{"chapterId":15,"chapter":"Islamic Paradise and Hell","dos":[{"id":"islamic-paradise-and-hell-do-1","text":"Do ask Allah for Al-Firdaws, the highest level of Paradise, in every du\'a. (Sahih al-Bukhari 2790)"},{"id":"islamic-paradise-and-hell-do-2","text":"Do remember Hell frequently to motivate yourself to avoid sins and increase in good deeds. (Quran At-Tahrim 66:6)"},{"id":"islamic-paradise-and-hell-do-3","text":"Do perform deeds that lead to Paradise: testifying La ilaha illallah, being kind to parents, and guarding the five daily prayers. (Sahih Muslim 26; Jami at-Tirmidhi 1900; Sunan Abi Dawud 425)"},{"id":"islamic-paradise-and-hell-do-4","text":"Do teach your family about Paradise and Hell; Allah commands us to protect our families and the Prophet ﷺ taught children directly. (Quran At-Tahrim 66:6; Sunan Abi Dawud 495)"},{"id":"islamic-paradise-and-hell-do-5","text":"Do seek refuge from Hell at least three times daily and include it in morning and evening adhkar. (Sunan at-Tirmidhi 2572)"}],"donts":[{"id":"islamic-paradise-and-hell-dont-1","text":"Don\'t despair of entering Paradise if you\'re a believer; Allah\'s mercy is vast, and sincere repentance erases sins. (Quran Az-Zumar 39:53; Sahih al-Bukhari 3194)"},{"id":"islamic-paradise-and-hell-dont-2","text":"Don\'t feel secure from Hell while committing sins; Allah may punish whom He wills. (Quran Al-A\'raf 7:99)"},{"id":"islamic-paradise-and-hell-dont-3","text":"Don\'t make fun of or joke about Hell; it is a grave reality, not a subject for humor. (Quran At-Tawbah 9:65-66)"},{"id":"islamic-paradise-and-hell-dont-4","text":"Don\'t delay repentance thinking you\'ll enter Paradise regardless; deeds determine levels. (Quran At-Tahrim 66:8; Sahih Muslim 2703)"},{"id":"islamic-paradise-and-hell-dont-5","text":"Don\'t neglect the rights of others; injustice may lead to your good deeds being taken on Judgment Day. (Sahih Muslim 2581)"}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterGentleStart.json":
/*!***************************************************************!*\
  !*** ./resources/components/vue/data/chapterGentleStart.json ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Foundation by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":2,"title":"Islamic beliefs","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Beliefs by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":3,"title":"Islamic pillars","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Pillars by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":4,"title":"Islamic quran","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Quran by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":5,"title":"Islamic prophet","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Prophet by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":6,"title":"Islamic prayers","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Prayers by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":7,"title":"Islamic dua dhikr","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Dua Dhikr by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":8,"title":"Islamic heart","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Heart by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":9,"title":"Islamic manners","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Manners by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":10,"title":"Islamic lifestyle","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Lifestyle by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":11,"title":"Islamic family and marriage","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Family And Marriage by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":12,"title":"Islamic community","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Community by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":13,"title":"Islamic future","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Future by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":14,"title":"Islamic hereafter","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Hereafter by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":15,"title":"Islamic paradise and hell","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Paradise And Hell by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterGuidance.json":
/*!************************************************************!*\
  !*** ./resources/components/vue/data/chapterGuidance.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","cards":[{"step":"01","title":"Anchor Tawheed","description":"Revisit the testimony of faith and map how it touches your decisions today.","action":"Note one area where sincerity must replace habit."},{"step":"02","title":"Circle with Reminders","description":"Schedule a Shahada reminder and a short dua that mentions Allah\'s oneness.","action":"Set a gentle alarm or card to repeat the phrase during the day."},{"step":"03","title":"Share the Foundation","description":"Tell someone a short insight from the chapter and listen to their take.","action":"Record one takeaway to revisit before bed."}]},{"chapterId":2,"title":"Islamic beliefs","cards":[{"step":"01","title":"Map the Articles","description":"Write down the six beliefs and share how each influences your trust in Allah.","action":"Tag one article as the focus for tomorrow\'s dua."},{"step":"02","title":"Practice the Unseen","description":"Speak aloud about how angels or decree helped you this week.","action":"Share the reflection with someone who can keep you accountable."},{"step":"03","title":"Teach the Pillar","description":"Explain the beliefs to a friend or family member and field questions.","action":"Jot your notes and keep them handy for future doubts."}]},{"chapterId":3,"title":"Islamic pillars","cards":[{"step":"01","title":"Live the Pillars","description":"Pick one pillar (prayer, zakat, fasting) to honor and monitor it daily.","action":"Check your compliance and ask Allah for consistency."},{"step":"02","title":"Document the Rhythm","description":"Track each pillar in a simple habit log for three days.","action":"Share the log with a mentor for encouragement."},{"step":"03","title":"Renew Intention","description":"Refresh your niyyah before each act of worship and charity.","action":"Repeat a short dua that acknowledges Allah\'s help."}]},{"chapterId":4,"title":"Islamic quran","cards":[{"step":"01","title":"Slow the Recitation","description":"Read an ayah with translation and write a one-sentence reflection.","action":"Circulate the reflection to someone via voice note or message."},{"step":"02","title":"Explore the Tafsir","description":"Watch or read commentary on the chapter\'s verses.","action":"Note one new lesson and plan to act on it."},{"step":"03","title":"Apply the Message","description":"Perform an action inspired by the Quran verse you studied.","action":"Journal how you felt and what you learned."}]},{"chapterId":5,"title":"Islamic prophet","cards":[{"step":"01","title":"Study His Story","description":"Focus on one Prophet event and extract its moral.","action":"Record your takeaway and imagine living it this week."},{"step":"02","title":"Send Blessings","description":"Recite salawat while picturing the Prophet\'s mercy.","action":"Share why he inspires you with a friend."},{"step":"03","title":"Mirror the Manners","description":"Respond to a tense moment with gentleness and humility.","action":"Reflect on the outcome and thank Allah."}]},{"chapterId":6,"title":"Islamic prayers","cards":[{"step":"01","title":"Structure Salah","description":"Prepare each prayer with intention and awareness.","action":"Describe one distracting thought and replace it with a purpose."},{"step":"02","title":"Slow the Quran in Prayer","description":"Understand a verse you recite and speak it softly.","action":"Write a summary to use again tomorrow."},{"step":"03","title":"Link Sunnah","description":"Add a Sunnah prayer or dua to your routine.","action":"Share the change with a partner and support one another."}]},{"chapterId":7,"title":"Islamic dua dhikr","cards":[{"step":"01","title":"Speak to Allah","description":"Write a dua ranking your needs and praises.","action":"Speak it aloud while picturing Allah listening."},{"step":"02","title":"Embed Dhikr","description":"Attach short dhikr phrases to daily movements.","action":"Track which phrases calm you most."},{"step":"03","title":"Lift Others","description":"Pray for someone close and mention them by name.","action":"Ask them later how they felt."}]},{"chapterId":8,"title":"Islamic heart","cards":[{"step":"01","title":"Purify the Heart","description":"End the day with muhasabah and dua.","action":"List a flaw to correct tomorrow."},{"step":"02","title":"Stay Soft","description":"Practice dhikr or charity to soften reactions.","action":"Write the emotion you replaced and thank Allah."},{"step":"03","title":"Focus on Trust","description":"Lean on Allah\'s decree when anxiety arises.","action":"Signal a reminder (note or dua) to keep returning to reliance."}]},{"chapterId":9,"title":"Islamic manners","cards":[{"step":"01","title":"Practice Adab","description":"Deliver kind words to someone you usually rush past.","action":"Note how it felt."},{"step":"02","title":"Guard the Tongue","description":"Avoid gossip for a day and fill the space with praise.","action":"Pray for patience and dignity."},{"step":"03","title":"Model Mercy","description":"Actively forgive and let go of a minor annoyance.","action":"Document how it softened your heart."}]},{"chapterId":10,"title":"Islamic lifestyle","cards":[{"step":"01","title":"Design Halal Habits","description":"Audit a routine (food, spending, rest) for halal alignment.","action":"Replace one element with an intentional choice."},{"step":"02","title":"Create Calm Time","description":"Schedule a reflective pause with dhikr midweek.","action":"Share the routine to keep yourself accountable."},{"step":"03","title":"Give Back","description":"Help someone with time or resources aligned with Islamic generosity.","action":"Pray for Allah to accept the kindness."}]},{"chapterId":11,"title":"Islamic family and marriage","cards":[{"step":"01","title":"Family Circle","description":"Host a mini session with dua, gratitude, and sharing.","action":"Document one lesson to keep repeating."},{"step":"02","title":"Mercy & Justice","description":"Acts of kindness and clear boundaries keep harmony.","action":"Plan a simple mercy act for a relative."},{"step":"03","title":"Teach by Example","description":"Model manners instead of just instructing.","action":"Share a story that inspired your behaviour."}]},{"chapterId":12,"title":"Islamic community","cards":[{"step":"01","title":"Welcome the Ummah","description":"Connect with someone new or isolated online/offline.","action":"Offer a sincere greeting or helpful link."},{"step":"02","title":"Support Others","description":"Join a study circle or share resources with volunteers.","action":"Pray for your brother/sister and note the unity."},{"step":"03","title":"Resolve Conflict","description":"Monitor your speech during a disagreement to stay calm.","action":"Seek reconciliation if tension lingers."}]},{"chapterId":13,"title":"Islamic future","cards":[{"step":"01","title":"Sharpen Goals","description":"Define a spiritual milestone for the next month.","action":"Pair it with a dua and write it down."},{"step":"02","title":"Review Steps","description":"Schedule a weekly reflection on progress and adjustments.","action":"Share insight or challenge with an accountability partner."},{"step":"03","title":"Lift Others","description":"Encourage someone pursuing growth and pray together.","action":"Record their dua request and commit to revisiting it."}]},{"chapterId":14,"title":"Islamic hereafter","cards":[{"step":"01","title":"Grave Reminder","description":"Write a list of priorities shaped by the Hereafter.","action":"Attach a dua for mercy in Barzakh."},{"step":"02","title":"Balance Hope","description":"Read a warning from the chapter and reply with hope-filled dua.","action":"Share the contrast with a friend to rekindle optimism."},{"step":"03","title":"Sadaqah That Stays","description":"Give charity with a long-term intention.","action":"Plan one charity that continues after you pass away."}]},{"chapterId":15,"title":"Islamic paradise and hell","cards":[{"step":"01","title":"Visualize Paradise","description":"Imagine a Quranic description and thank Allah for it.","action":"Write how it felt and recite the verse daily."},{"step":"02","title":"Heed the Warnings","description":"Meditate on Hell\'s cautionary verses and note actions to avoid.","action":"Ask someone to remind you when temptation returns."},{"step":"03","title":"Supplication & Protection","description":"Make duas for Paradise and refuge from Hell every night.","action":"Share the theme with family to keep hope alive."}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterGuidedPathway.json":
/*!*****************************************************************!*\
  !*** ./resources/components/vue/data/chapterGuidedPathway.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","pathway":[{"step":"01","title":"Absorb the chapter (Islamic foundation)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic foundation)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic foundation)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":2,"title":"Islamic beliefs","pathway":[{"step":"01","title":"Absorb the chapter (Islamic beliefs)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic beliefs)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic beliefs)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":3,"title":"Islamic pillars","pathway":[{"step":"01","title":"Absorb the chapter (Islamic pillars)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic pillars)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic pillars)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":4,"title":"Islamic quran","pathway":[{"step":"01","title":"Absorb the chapter (Islamic quran)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic quran)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic quran)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":5,"title":"Islamic prophet","pathway":[{"step":"01","title":"Absorb the chapter (Islamic prophet)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic prophet)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic prophet)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":6,"title":"Islamic prayers","pathway":[{"step":"01","title":"Absorb the chapter (Islamic prayers)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic prayers)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic prayers)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":7,"title":"Islamic dua dhikr","pathway":[{"step":"01","title":"Absorb the chapter (Islamic dua dhikr)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic dua dhikr)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic dua dhikr)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":8,"title":"Islamic heart","pathway":[{"step":"01","title":"Absorb the chapter (Islamic heart)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic heart)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic heart)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":9,"title":"Islamic manners","pathway":[{"step":"01","title":"Absorb the chapter (Islamic manners)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic manners)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic manners)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":10,"title":"Islamic lifestyle","pathway":[{"step":"01","title":"Absorb the chapter (Islamic lifestyle)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic lifestyle)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic lifestyle)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":11,"title":"Islamic family and marriage","pathway":[{"step":"01","title":"Absorb the chapter (Islamic family and marriage)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic family and marriage)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic family and marriage)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":12,"title":"Islamic community","pathway":[{"step":"01","title":"Absorb the chapter (Islamic community)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic community)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic community)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":13,"title":"Islamic future","pathway":[{"step":"01","title":"Absorb the chapter (Islamic future)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic future)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic future)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":14,"title":"Islamic hereafter","pathway":[{"step":"01","title":"Absorb the chapter (Islamic hereafter)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic hereafter)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic hereafter)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":15,"title":"Islamic paradise and hell","pathway":[{"step":"01","title":"Absorb the chapter (Islamic paradise and hell)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic paradise and hell)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic paradise and hell)","action":"Translate the insight into a small habit before tomorrow."}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterLessonOverview.json":
/*!******************************************************************!*\
  !*** ./resources/components/vue/data/chapterLessonOverview.json ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation (Tawheed) ","summary":"Islam is not a new religion but the primordial faith of submission to the One True God (Allāh), revived through the final Prophet Muhammad ﷺ. The essence of this submission is Tawheed the absolute Oneness of God in His Lordship, His Names and Attributes, and His right to be worshipped alone. ","overview":[{"heading":"Tawheed: Absolute Oneness","content":"Tawheed means declaring Allah\'s absolute oneness in all aspects. Qur\'anic \\"Say: He is Allah, the One.\\" (Al Ikhlas 112:1) Reference: \\"Kitab al Tawheed\\" by Ibn Khuzaymah.\\n\\nReferences:\\nQuran Al-Ikhlāṣ 112:1; Kitab al Tawheed by Ibn Khuzaymah; Hadith: Sahih Bukhari (The right of Allah upon His servants is that they worship Him and associate nothing with Him)","resources":"https://quran.com/112/1"},{"heading":"Tawheed Has Three Essential Categories","content":"It has three essential categories that cannot be separated: Tawheed al Rububiyyah (Lordship), Tawheed al Asma wa al Sifat (Names and Attributes), and Tawheed al \'Ibadah (Worship). Reference: \\"Al Qawa\'id al Arba\'\\" by Muhammad ibn \'Abd al Wahhab.\\n\\nReferences:\\nAl Qawa\'id al Arba\' by Muhammad ibn \'Abd al Wahhab; Hadith: Sahih Muslim (Whoever dies knowing that there is no god but Allah will enter Paradise)"},{"heading":"Tawheed al Rububiyyah (Lordship)","content":"Oneness in Lordship: Allah alone creates, provides, and controls. Qur\'anic \\"Allah is the Creator of all things, and He is Disposer of all affairs.\\" (Az Zumar 39:62) Reference: \\"Al Qawa\'id al Arba\'\\" by Muhammad ibn \'Abd al Wahhab.\\n\\nReferences:\\nQuran Az-Zumar 39:62; Al Qawa\'id al Arba\' by Muhammad ibn \'Abd al Wahhab; Hadith: Sahih Bukhari (The right of Allah upon His servants is that they worship Him and associate nothing with Him)","resources":"https://quran.com/39/62"},{"heading":"Tawheed al Asma wa al Sifat (Names and Attributes)","content":"Oneness in Names and Attributes as revealed, without distortion. Qur\'anic \\"There is nothing like unto Him...\\" (Ash Shura 42:11) Reference: \\"Al \'Aqidah al Wasitiyyah\\" by Ibn Taymiyyah.\\n\\nReferences:\\nQuran Ash-Shūrā 42:11; Al \'Aqidah al Wasitiyyah by Ibn Taymiyyah; Hadith: Sahih Bukhari (Allah has ninety-nine names; whoever learns them will enter Paradise)","resources":"https://quran.com/42/11"},{"heading":"Tawheed al \'Ibadah (Worship)","content":"Oneness in worship: directing all acts to Allah alone. Qur\'anic \\"Worship Allah and associate none with Him...\\" (An Nisa\' 4:36) Reference: \\"Kashf al Shubuhat\\" by Muhammad ibn \'Abd al Wahhab.\\n\\nReferences:\\nQuran An-Nisāʾ 4:36; Kashf al Shubuhat by Muhammad ibn \'Abd al Wahhab; Hadith: Sahih Bukhari (The most beloved deeds to Allah are those done regularly, even if small)","resources":"https://quran.com/4/36"},{"heading":"Iman: Six Pillars of Faith","content":"Iman has six pillars including belief in Allah and the Last Day. \\"It is to believe in Allah, His Angels, His Books, His Messengers, the Last Day, and Divine Decree...\\" (Sahih Muslim 8a) Reference: \\"Sharh Usul al Iman\\" by Ibn \'Uthaymin.\\n\\nReferences:\\nHadith: Sahih Muslim 8a (Hadith Jibril); Sharh Usul al Iman by Ibn \'Uthaymin","resources":"https://sunnah.com/muslim:8a"},{"heading":"Ihsan: Worship as if You See Him","content":"Ihsan is worshipping Allah as if you see Him, knowing He sees you. \\"To worship Allah as if you see Him...\\" (Sahih al Bukhari 50) Reference: \\"Ihya\' \'Ulum al Din\\" by Al Ghazali.\\n\\nReferences:\\nHadith: Sahih al Bukhari 50 (Hadith Jibril); Ihya\' \'Ulum al Din by Al Ghazali","resources":"https://sunnah.com/bukhari:50"},{"heading":"Shirk: Associating Partners with Allah","content":"Shirk is associating partners with Allah and is the only unforgivable sin if unrepented. \\"Indeed, Allah does not forgive association with Him...\\" (An Nisa\' 4:48) Reference: \\"Al Sawa\'iq al Mursalah\\" by Ibn al Qayyim.\\n\\nReferences:\\nQuran An-Nisāʾ 4:48; Al Sawa\'iq al Mursalah by Ibn al Qayyim; Hadith: Sahih Muslim (Whoever meets Allah associating anything with Him will enter the Fire)","resources":"https://quran.com/4/48"},{"heading":"Shahadah Conditions","content":"The Shahadah (\\"La ilaha illallah\\") has seven conditions for validity derived from the Qur\'an and Sunnah: knowledge, certainty, acceptance, and more. Reference: \\"Sharh Usul al Iman\\" by Ibn Baz, p. 45.\\n\\nReferences:\\nSharh Usul al Iman by Ibn Baz, p. 45; Hadith: Sahih Bukhari (Whoever says La ilaha illallah sincerely from his heart will enter Paradise)"},{"heading":"Tawheed Message of All Prophets","content":"Tawheed was the first message of all Prophets from Nuh to Muhammad ﷺ. \\"We sent every Messenger with the revelation: \'Worship Allah and avoid false gods...\'\\" (An Nahl 16:36) Reference: \\"Tariq al Hijratayn\\" by Ibn al Qayyim.\\n\\nReferences:\\nQuran An-Naḥl 16:36; Tariq al Hijratayn by Ibn al Qayyim; Hadith: Sahih Bukhari (The prophets are brothers; their religion is one)","resources":"https://quran.com/16/36"},{"heading":"Rejecting Tawheed Nullifies Deeds","content":"Rejecting Tawheed invalidates deeds regardless of outward form. \\"If they had associated others with Allah, all they did would have been nullified.\\" (Al An\'am 6:88) Reference: \\"Majmu\' al Fatawa\\" by Ibn Taymiyyah, vol. 1, p. 98.\\n\\nReferences:\\nQuran Al-Anʿām 6:88; Majmu\' al Fatawa by Ibn Taymiyyah, vol. 1, p. 98; Hadith: Sahih Muslim (Whoever meets Allah associating anything with Him will enter the Fire)","resources":"https://quran.com/6/88"}]},{"chapterId":2,"title":"The Beliefs: The Six Pillars of Iman","summary":"The Islamic creed (ʿAqīdah) is built upon six fundamental articles of faith (Arkān al-Īmān). These beliefs form the foundation of a Muslim’s worldview and are derived from the definitive texts of the Qur’ān and the authentic Sunnah. ","overview":[{"heading":"Belief in Allāh (Allāh سُبْحَانَهُ وَتَعَالَى)","content":"To affirm Allāh’s Oneness (Tawḥīd) in His Lordship, His Names and Attributes, and His right to worship, as described in the Qur’ān and Sunnah without distortion. Key \\"Allāh - there is no deity except Him, the Ever-Living, the Sustainer of existence.\\" (Āli ʿImrān 3:2) Resource: Kitāb al-Tawḥīd by Shaykh al-Islām Muḥammad ibn ʿAbd al-Wahhāb.\\n\\nReferences:\\nQuran Āl ʿImrān 3:2; Hadith: Sahih Bukhari (The right of Allah upon His servants is that they worship Him and associate nothing with Him)","resources":"https://quran.com/3/2"},{"heading":"Belief in the Angels (Al-Malāʾikah)","content":"To believe in the angels as honored servants of Allāh, created from light, who never disobey Him and execute His commands precisely. Key \\"The Messenger believes in what was revealed to him from his Lord, and the believers. All believe in Allāh, His angels, His books, and His messengers...\\" (Al-Baqarah 2:285) Resource: Badʾ al-Khalq (Chapter on Creation) in Ṣaḥīḥ al-Bukhārī.\\n\\nReferences:\\nQuran Al-Baqarah 2:285; Hadith: Sahih Muslim (The angels were created from light)","resources":"https://quran.com/2/285"},{"heading":"Belief in the Revealed Books (Al-Kutub)","content":"To believe that Allāh revealed divine scriptures to His messengers as guidance, including the Qur’ān (the final, preserved book), the Torah, the Gospel, and the Psalms. Key \\"And We have revealed to you, [O Muḥammad], the Book in truth, confirming that which preceded it of the Scripture...\\" (Al-Māʾidah 5:48) Resource: Al-ʿAqīdah al-Ṭaḥāwiyyah (Articles 7-8).\\n\\nReferences:\\nQuran Al-Māʾidah 5:48; Hadith: Sahih Muslim (I left among you the Book of Allah)","resources":"https://quran.com/5/48"},{"heading":"Belief in the Messengers (Al-Rusul)","content":"To believe that Allāh sent prophets and messengers to every nation, beginning with Ādam and ending with Muḥammad ﷺ, all calling to Tawḥīd. We believe in all of them without distinction. Key \\"And We certainly sent into every nation a messenger, [saying], \'Worship Allāh and avoid false deities...\'\\" (Al-Naḥl 16:36) Resource: Qaṣaṣ al-Anbiyāʾ (Stories of the Prophets) by Ibn Kathīr.\\n\\nReferences:\\nQuran An-Naḥl 16:36; Hadith: Sahih Bukhari (The prophets are brothers; their religion is one)","resources":"https://quran.com/16/36"},{"heading":"Belief in the Last Day (Al-Yawm al-Ākhir)","content":"To believe in everything that will occur after death: the trial of the grave, the Resurrection, the Reckoning, the Scale, the Bridge (Ṣirāṭ), Paradise, and Hellfire. Key \\"And those who believe in the Hereafter believe in it, and they are maintaining their prayers.\\" (Al-Anʿām 6:92) Resource: Kitāb al-Jannah wa al-Nār (Book of Paradise and Hell) in Ṣaḥīḥ al-Bukhārī.\\n\\nReferences:\\nQuran Al-Anʿām 6:92; Hadith: Sahih Bukhari (Whoever believes in Allah and the Last Day, let him speak good or remain silent)","resources":"https://quran.com/6/92"},{"heading":"Belief in Divine Decree (Al-Qaḍāʾ wal-Qadar)","content":"To believe that Allāh has preordained all things with His prior knowledge and wisdom. This encompasses belief in His all-encompassing knowledge, His recording of all decrees, His will, and His creation of everything. Key \\"Indeed, all things We created with predestination.\\" (Al-Qamar 54:49) Resource: Sharḥ al-ʿAqīdah al-Ṭaḥāwiyyah by Ibn Abī al-ʿIzz al-Ḥanafī.\\n\\nReferences:\\nQuran Al-Qamar 54:49; Hadith: Sahih Muslim (Allah wrote the decrees of creation before creating the heavens and the earth)","resources":"https://quran.com/54/49"}]},{"chapterId":3,"title":"The Pillars: The Five Pillars","summary":"The Pillars of Islam (Arkān al-Islām) are the fundamental acts of worship that constitute the foundation of a Muslim\'s faith and practice.","overview":[{"heading":"Shahādah (The Testimony of Faith)","content":"Sincere declaration and belief that \\"Lā ilāha illallāh, Muhammadur Rasūlullāh.\\" Quranic \\"Allah witnesses that there is no deity except Him, and [so do] the angels and those of knowledge   [that He is] maintaining [creation] in justice.\\" (Ali \'Imran 3:18) Hadith The Prophet ﷺ said, \\"Whoever dies knowing that there is no god but Allah will enter Paradise.\\" (Sahih Muslim 26)\\n\\nReferences:\\nQuran Āl ʿImrān 3:18; Hadith: Sahih Muslim 26 (Whoever dies knowing that there is no god but Allah will enter Paradise)","resources":"https://quran.com/3/18"},{"heading":"Ṣalāh (The Prayer)","content":"Performing the five obligatory prayers daily at their prescribed times. Quranic \\"Indeed, prayer has been decreed upon the believers a decree of specified times.\\" (An Nisa\' 4:103) Hadith The Prophet ﷺ said, \\"Between a man and shirk and kufr is the abandonment of prayer.\\" (Sahih Muslim 82)\\n\\nReferences:\\nQuran An-Nisāʾ 4:103; Hadith: Sahih Muslim 82 (Between a man and shirk is abandoning prayer)","resources":"https://quran.com/4/103"},{"heading":"Zakāh (Obligatory Almsgiving)","content":"Purifying wealth by giving 2.5% of saved wealth annually to specified recipients. Quranic \\"Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase.\\" (At Tawbah 9:103) Hadith The Prophet ﷺ said, \\"Islam is built upon five...,\\" including zakah.\\n\\nReferences:\\nQuran At-Tawbah 9:103; Hadith: Sahih Bukhari (Islam is built on five)","resources":"https://quran.com/9/103"},{"heading":"Ṣawm (Fasting Ramadan)","content":"Abstaining from food, drink, and marital relations from dawn to sunset during Ramadan. Quranic \\"O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.\\" (Al Baqarah 2:183) Hadith Included in the five pillar hadith.\\n\\nReferences:\\nQuran Al-Baqarah 2:183; Hadith: Sahih Bukhari (Islam is built on five)","resources":"https://quran.com/2/183"},{"heading":"Hajj (Pilgrimage to Makkah)","content":"Performing pilgrimage to the Ka\'bah once in a lifetime if able. Quranic \\"And [due] to Allah from the people is a pilgrimage to the House   for whoever is able to find thereto a way.\\" (Ali \'Imran 3:97) Hadith Included in the five pillar hadith.\\n\\nReferences:\\nQuran Āl ʿImrān 3:97; Hadith: Sahih Bukhari (Islam is built on five)","resources":"https://quran.com/3/97"}]},{"chapterId":4,"title":"The Quran: Final Revelation and Living Guidance","summary":"The Qur’an is the eternal, literal Speech of Allah (ﷲ), revealed to the Prophet Muhammad ﷺ through the Angel Jibrīl (Gabriel). ","overview":[{"heading":"The Quran is Allah’s Final Revelation","content":"The Quran provides guidance for all aspects of life. Believers are encouraged to read, reflect, and act upon its teachings to align their hearts and actions with divine wisdom.\\n\\nReferences:\\nQuran Al-Māʾidah 5:48; Quran Al-Māʾidah 5:3; Quran Al-Ḥijr 15:9; Hadith: Sahih Muslim (The best speech is the Book of Allah)","resources":"https://quran.com/5/48"},{"heading":"The Quran Guides Humanity","content":"Through clear instructions, moral teachings, and stories of past nations, the Quran teaches lessons that foster faith, patience, justice, and ethical conduct for spiritual and worldly success.\\n\\nReferences:\\nQuran Al-Baqarah 2:2; Quran Al-Isrāʾ 17:9; Quran Ibrāhīm 14:1; Hadith: Sahih Bukhari (Convey from me, even if one verse)","resources":"https://quran.com/2/2"},{"heading":"The Quran Clarifies Belief","content":"It explains the core principles of Tawhid, prophecy, and the Hereafter, strengthening faith and helping believers understand the purpose of life and the path to pleasing Allah.\\n\\nReferences:\\nQuran Al-Anʿām 6:19; Quran An-Naḥl 16:89; Quran Az-Zumar 39:28; Hadith: Sahih Muslim (I left among you the Book of Allah; hold to it and you will not go astray)","resources":"https://quran.com/6/19"},{"heading":"The Quran is a Source of Mercy","content":"Reading and reflecting on the Quran brings peace, guidance, and comfort. It reminds believers of Allah’s mercy, encouraging hope, gratitude, and reliance upon Him in all circumstances.\\n\\nReferences:\\nQuran Al-Isrāʾ 17:82; Quran Yūnus 10:57; Quran Al-Aʿrāf 7:52; Hadith: Sahih Muslim (People who gather to recite the Book of Allah are covered by mercy)","resources":"https://quran.com/17/82"},{"heading":"The Quran Requires Reflection","content":"Understanding its meanings strengthens belief. Believers are urged to ponder verses, seek knowledge, and apply lessons practically, transforming reading into action and guidance into daily living.\\n\\nReferences:\\nQuran Muḥammad 47:24; Quran Ṣād 38:29; Quran An-Nisāʾ 4:82; Hadith: Sahih Bukhari (The one proficient in the Quran is with the noble, righteous scribes)","resources":"https://quran.com/47/24"},{"heading":"Recitation Elevates the Heart","content":"Reciting the Quran aloud with focus and reverence nourishes the soul, instills tranquility, and enhances spiritual connection with Allah, making worship more heartfelt and intentional.\\n\\nReferences:\\nQuran Al-Muzzammil 73:4; Quran Al-Isrāʾ 17:106; Quran Az-Zumar 39:23; Hadith: Sahih Bukhari (Beautify the Quran with your voices)","resources":"https://quran.com/73/4"},{"heading":"The Quran Guides Morality","content":"It teaches ethics, justice, and compassion. Applying these principles in personal conduct fosters integrity, humility, and a harmonious life aligned with divine expectations.\\n\\nReferences:\\nQuran An-Naḥl 16:90; Quran Al-Māʾidah 5:8; Quran Al-Aʿrāf 7:199; Hadith: Sahih Muslim (His character was the Quran)","resources":"https://quran.com/16/90"},{"heading":"The Quran Encourages Knowledge","content":"Believers are instructed to seek understanding, reflect, and learn. Knowledge nurtures wisdom, strengthens conviction, and enables proper application of divine guidance in all aspects of life.\\n\\nReferences:\\nQuran Ṭā Hā 20:114; Quran Az-Zumar 39:9; Quran Al-Mujādilah 58:11; Hadith: Sahih Bukhari (The best of you are those who learn the Quran and teach it)","resources":"https://quran.com/20/114"},{"heading":"The Quran Protects from Misguidance","content":"Following its teachings shields believers from false beliefs, moral corruption, and spiritual deviation. Its guidance creates a firm foundation for ethical living and trust in Allah’s commands.\\n\\nReferences:\\nQuran Al-Anʿām 6:155; Quran Al-Baqarah 2:185; Quran Al-Aʿrāf 7:3; Hadith: Sahih Muslim (The devil flees a house where Surah Al-Baqarah is recited)","resources":"https://quran.com/6/155"},{"heading":"The Quran Promotes Justice","content":"It emphasizes fairness, honesty, and equality. Implementing these principles in daily life nurtures ethical behavior, protects rights, and establishes social harmony in accordance with divine instruction.\\n\\nReferences:\\nQuran An-Nisāʾ 4:58; Quran Al-Māʾidah 5:8; Quran Al-Ḥadīd 57:25; Hadith: Sahih Muslim (Beware of injustice, for injustice will be darkness on the Day of Resurrection)","resources":"https://quran.com/4/58"},{"heading":"The Quran Encourages Patience","content":"Its stories and guidance teach resilience in adversity. Reflecting on divine wisdom strengthens perseverance, hope, and trust in Allah’s plan, fostering spiritual growth and emotional balance.\\n\\nReferences:\\nQuran Al-Baqarah 2:153; Quran Āl ʿImrān 3:200; Quran Az-Zumar 39:10; Hadith: Sahih Muslim (Amazing is the affair of the believer; if harmed, he is patient)","resources":"https://quran.com/2/153"},{"heading":"The Quran Strengthens Faith","content":"Regular study and reflection deepen Iman. Understanding its wisdom and applying lessons encourages moral behavior, ethical decisions, and a heart aligned with Allah’s guidance.\\n\\nReferences:\\nQuran Al-Aḥzāb 33:34; Quran Al-Anfāl 8:2; Quran Al-Fatḥ 48:4; Hadith: Sahih Bukhari (Faith has more than seventy branches)","resources":"https://quran.com/33/34"},{"heading":"The Quran Encourages Worship","content":"It calls believers to prayer, remembrance, and righteous deeds. Following its commands transforms spiritual devotion into everyday actions, connecting the heart and life to Allah’s pleasure.\\n\\nReferences:\\nQuran Al-ʿAnkabūt 29:45; Quran Adh-Dhāriyāt 51:56; Quran Ṭā Hā 20:14; Hadith: Sahih Muslim (Between a man and shirk is abandoning prayer)","resources":"https://quran.com/29/45"},{"heading":"The Quran is a Source of Healing","content":"Its words bring comfort, guidance, and reassurance. Reflecting and acting upon them nurtures mental, emotional, and spiritual well being while strengthening reliance on Allah’s wisdom.\\n\\nReferences:\\nQuran Al-Isrāʾ 17:82; Quran Yūnus 10:57; Quran Fuṣṣilat 41:44; Hadith: Sahih Bukhari (Al-Fatihah was used as ruqyah and approved by the Prophet)","resources":"https://quran.com/17/82"},{"heading":"The Quran Must Be Applied","content":"Understanding alone is insufficient; believers must implement its guidance in daily life. Action transforms knowledge into practice, faith into ethics, and devotion into tangible obedience.\\n\\nReferences:\\nQuran Al-Ḥashr 59:18; Quran Al-Baqarah 2:44; Quran Aṣ-Ṣaff 61:2-3; Hadith: Sahih Muslim (The Quran is proof for you or against you)","resources":"https://quran.com/59/18"}]},{"chapterId":5,"title":"The Prophet Muhammad ﷺ (Life and Legacy)","summary":"The Prophet Muhammad ﷺ is the final Messenger of Allah, sent as a mercy to all worlds (*Al-Anbiya 21:107*). His life (Seerah) embodies the Qur\'an and provides the best example (Uswatun Hasanah) of faith, character, and leadership for believers (Al-Ahzab 33:21).","overview":[{"heading":"Final Prophet Sent to All Humanity","content":"Muhammad ﷺ is the Seal of the Prophets, and his message is for all people. The Qur\'an also records that the jinn heard the message, underscoring its universality.\\n\\nReferences:\\nQuran Al-Aḥzāb 33:40; Quran Al-Aʿrāf 7:158; Quran Al-Jinn 72:1; Seerah: Ar-Raheeq al-Makhtum (The Sealed Nectar)","resources":"https://quran.com/33/40, https://quran.com/7/158, https://quran.com/72/1"},{"heading":"First Revelation in the Cave of Hira","content":"The first revelation came through Jibril with the command \\"Read\\" (Iqra), marking the beginning of prophethood, traditionally dated to 610 CE when he was about forty.\\n\\nReferences:\\nHadith: Sahih al-Bukhari 4953; Seerah: The Life of the Prophet by Ibn Kathir (abridged)","resources":"https://sunnah.com/bukhari:4953"},{"heading":"Preached Tawhid in Makkah for 13 Years","content":"He called people to worship Allah alone for about thirteen years in Makkah, enduring persecution, boycott, and the loss of close supporters.\\n\\nReferences:\\nQuran Al-Ḥijr 15:94; Seerah: Sirat Ibn Hisham","resources":"https://quran.com/15/94"},{"heading":"Hijrah to Madinah - Turning Point","content":"The migration (Hijrah) in 622 CE marked a decisive turning point and later became the starting point of the Islamic calendar.\\n\\nReferences:\\nQuran An-Naḥl 16:110; Seerah: When the Moon Split by Safiur Rahman al-Mubarakpuri","resources":"https://quran.com/16/110"},{"heading":"Established the Islamic State in Madinah","content":"He built the Masjid, established brotherhood (mu\'akhah) between the Muhajirun and Ansar, and enacted the Constitution of Madinah.\\n\\nReferences:\\nSeerah: Constitution of Madinah; Madinan Society at the Time of the Prophet by Akram Diya al-Umari"},{"heading":"Defensive Battles by Divine Permission","content":"After permission to fight was granted to those wronged, battles such as Badr, Uhud, and the Trench were fought in defense against aggression.\\n\\nReferences:\\nQuran Al-Ḥajj 22:39; Quran Al-Baqarah 2:190; Seerah: The Noble Life of the Prophet by Ali Muhammad as-Sallabi","resources":"https://quran.com/22/39, https://quran.com/2/190"},{"heading":"Conquest of Makkah with Mercy","content":"In 8 AH he entered Makkah and granted a general amnesty, emphasizing mercy over vengeance.\\n\\nReferences:\\nSeerah: Conquest of Makkah accounts in major seerah works"},{"heading":"Farewell Sermon and Completion of the Religion","content":"During the Farewell Pilgrimage, he emphasized rights, equality, and accountability, and the verse announcing the perfection of the religion was revealed.\\n\\nReferences:\\nQuran Al-Māʾidah 5:3; Seerah: Farewell Pilgrimage accounts in hadith and seerah works","resources":"https://quran.com/5/3"},{"heading":"Passed Away in Madinah","content":"He passed away in 11 AH (632 CE) in the home of Aisha (RA) after completing his mission, leaving the Qur\'an and Sunnah as the community\'s guidance.\\n\\nReferences:\\nHadith: Sahih al-Bukhari 4440; Seerah: accounts of his passing in Madinah","resources":"https://sunnah.com/bukhari:4440"},{"heading":"His Character Was the Living Qur\'an","content":"Aisha (RA) described his character as the Qur\'an itself, reflecting truthfulness, trustworthiness, mercy, patience, humility, and justice.\\n\\nReferences:\\nHadith: Sahih Muslim 746a; Quran Al-Qalam 68:4; Shama\'il al-Muhammadiyyah by al-Tirmidhi","resources":"https://sunnah.com/muslim:746a, https://quran.com/68/4"}]},{"chapterId":6,"title":"The Prayer: Ṣalāh (The Connection)","summary":"Ṣalāh (the ritual prayer) is the cornerstone of Islam, the direct link between the servant and Allah, and the first matter we will be questioned about on Judgment Day. It is the pillar of religion whoever establishes it, establishes religion; whoever destroys it, destroys religion.","overview":[{"heading":"Ṣalāh is the Second Pillar and First Deed Accounted For","content":"Ṣalāh distinguishes Islam from disbelief and is the first matter judged on the Day of Judgment. If it is accepted, the rest of the deeds are accepted; if rejected, the rest are rejected.\\n\\nReferences:\\nṢaḥīḥ al-Jāmiʿ 2573\\nResource: Ṣifah Ṣalāt an-Nabī by Al-Albānī - The Prophet\'s Prayer Described."},{"heading":"Ṣalāh is a Direct Connection with Allah","content":"During ṣalāh, the worshipper stands before Allah, conversing through recitation, bowing, prostration, and supplication. It is the miʿrāj of the believer.\\n\\nReferences:\\nṢaḥīḥ al-Bukhārī 405\\nResource: Al-Kalim aṭ-Ṭayyib by Ibn Taymiyyah."},{"heading":"Five Daily Prayers Were Prescribed on the Night Journey","content":"The five daily prayers were prescribed during al-Isrāʾ wal-Miʿrāj. They were reduced from fifty to five while retaining the reward of fifty.\\n\\nReferences:\\nṢaḥīḥ al-Bukhārī 349\\nResource: Fatḥ al-Bārī by Ibn Ḥajar."},{"heading":"Each Prayer Has a Fixed Time (Mawāqīt)","content":"Prayer times follow the sun: Fajr (dawn), Ẓuhr (midday), ʿAṣr (afternoon), Maghrib (sunset), and ʿIshāʾ (night). Delaying beyond its time without excuse is a major sin.\\n\\nReferences:\\nQuran 4:103\\nResource: Al-Mawāqīt by Ibn Qudāmah."},{"heading":"Congregational Prayer Multiplies the Reward","content":"Ṣalāh al-Jamāʿah is twenty-seven times superior to praying alone and strengthens community bonds.\\n\\nReferences:\\nṢaḥīḥ al-Bukhārī 619\\nResource: Aḥkām al-Jamāʿah wal-Imāmah by Ibn Taymiyyah."},{"heading":"Al-Fātiḥah is Required in Every Rakʿah","content":"Al-Fātiḥah is the essence of the Qur\'an and the core of ṣalāh. Without it, the prayer is incomplete.\\n\\nReferences:\\nṢaḥīḥ Muslim 395\\nResource: Tafsīr Sūrat al-Fātiḥah by Ibn Kathīr."},{"heading":"Sujūd is the Closest Point to Allah","content":"In prostration, the servant is closest to Allah, making it the prime time to increase duʿāʾ.\\n\\nReferences:\\nṢaḥīḥ Muslim 482\\nResource: Al-Adhkār by An-Nawawī."},{"heading":"Prayer Prevents Immorality and Wrongdoing","content":"Mindful, consistent ṣalāh cultivates taqwā that deters sin and injustice.\\n\\nReferences:\\nQuran 29:45\\nResource: Iḥyāʾ ʿUlūm ad-Dīn by Al-Ghazālī."},{"heading":"Khushūʿ is the Spirit of Prayer","content":"Presence of heart gives ṣalāh its life. It requires preparation, understanding of recitation, and minimizing distractions.\\n\\nReferences:\\nQuran 23:1-2\\nResource: Al-Khushūʿ fī aṣ-Ṣalāh by Ibn Rajab al-Ḥanbalī."},{"heading":"Making Up Missed Prayers is Obligatory","content":"Missed prayers due to sleep or forgetfulness must be made up immediately upon remembering. Intentionally abandoning prayer is a grave matter.\\n\\nReferences:\\nṢaḥīḥ Muslim 684\\nResource: Fatāwā al-Ṣalāh by Ibn Bāz."}]},{"chapterId":7,"title":"Duʿāʾ and Dhikr","summary":"Duʿāʾ (supplication) and Dhikr (remembrance) are the core of worship and the direct connection between the servant and Allah. They are the most beloved acts to Allah and the means to attain His mercy, blessings, and protection.","overview":[{"heading":"Duʿāʾ is the Essence of Worship","content":"Supplication is an act of worship that demonstrates the servant\'s utter dependence upon and need for Allah.\\n\\nReferences:\\n\'Your Lord says: Call upon Me; I will respond to you...\' (Ghāfir 40:60) Resource: Al-Duʿāʾ by Imam At-Ṭabarānī."},{"heading":"Dhikr Revives the Heart & Earns Rewards","content":"Remembering Allah frequently with the tongue and heart removes heedlessness, brings tranquility, and earns immense rewards.\\n\\nReferences:\\n\'Those who believe and whose hearts find peace in the remembrance of Allah. Surely in the remembrance of Allah do hearts find peace.\' (Ar-Raʿd 13:28) Resource: Al-Kalim aṭ-Ṭayyib by Ibn Taymiyyah."},{"heading":"Duʿāʾ is Accepted in Three Ways","content":"Allah either grants what you asked, averts an equivalent harm, or stores its reward for the Hereafter.\\n\\nReferences:\\nThe Prophet ﷺ said: \'No Muslim supplicates with a duʿāʾ that does not involve sin or severing kinship, but Allah gives him one of three things: He either answers it quickly, stores it for him in the Hereafter, or averts an equivalent evil from him.\' (Musnad Aḥmad 11133 - Ṣaḥīḥ) Resource: Fatḥ al-Bārī (Commentary on Ṣaḥīḥ al-Bukhārī) by Ibn Ḥajar."},{"heading":"Best Times for Duʿāʾ Include Sujūd & Last Third of Night","content":"Certain times and situations are most conducive for acceptance, such as during prostration, between Adhān and Iqāmah, and while traveling.\\n\\nReferences:\\nThe Prophet ﷺ said: \'The closest a servant is to his Lord is when he is in prostration, so increase supplication (then).\' (Ṣaḥīḥ Muslim 482) Resource: Al-Adhkār by Imam An-Nawawī (Chapter on Times for Duʿāʾ)."},{"heading":"Key Daily Adhkār are Prescribed for Morning & Evening","content":"Specific, verified remembrances protect the believer, earn thousands of rewards, and are a fortress against Shayṭān.\\n\\nReferences:\\nThe Prophet ﷺ said: \'Whoever says in the morning and evening: Ḥasbunallāhu wa niʿmal-Wakīl (Allah is sufficient for us, and He is the best Disposer of affairs) seven times, Allah will suffice him for what concerns him.\' (Sunan Abī Dāwūd 5081 - Ḥasan) Resource: Ḥiṣn al-Muslim (Fortress of the Muslim) by Dr. Saʿīd al-Qaḥṭānī."},{"heading":"Begin with Allah\'s Praise & Ṣalāh upon the Prophet ﷺ","content":"The proper etiquette of duʿāʾ includes starting by praising Allah and sending blessings upon the Prophet Muhammad ﷺ.\\n\\nReferences:\\nThe Prophet ﷺ heard a man supplicating without praising Allah or sending Ṣalāh upon him, so he said: \'This man rushed.\' Then he taught: \'When one of you supplicates, let him begin by praising Allah and glorifying Him, then send Ṣalāh upon the Prophet ﷺ, then supplicate as he wishes.\' (Sunan At-Tirmidhi 3477 - Ḥasan) Resource: ʿUddat as-Ṣābirīn by Ibn al-Qayyim."},{"heading":"Duʿāʾ Requires Sincerity, Certainty, & Avoiding Haram Sustenance","content":"For duʿāʾ to be accepted, one must have a sincere heart, be certain of the response, and ensure their food, drink, and clothing are lawful.\\n\\nReferences:\\nThe Prophet ﷺ mentioned a disheveled traveler raising his hands to the sky saying \'O Lord, O Lord!\' while his food, drink, and clothing were from Ḥarām sources, \'So how can his duʿāʾ be answered?\' (Ṣaḥīḥ Muslim 1015) Resource: Al-Duʿāʾ wa Atharuhu fī Dafʿ al-Balāʾ by Ibn Rajab al-Ḥanbalī."},{"heading":"Primary Sources (Qur\'an & Hadith)","content":"Core Qur\'anic verses and authenticated narrations that ground duʿāʾ and dhikr practice.\\n\\nReferences:\\nQur\'anic Verses Cited: Al-Baqarah 2:152 - \'Remember Me; I will remember you.\'; Al-Baqarah 2:201 - \'Our Lord, give us in this world good and in the Hereafter good...\'; Al-Baqarah 2:216 - \'And it may be that you dislike a thing which is good for you...\'; Ar-Raʿd 13:28 - \'Those who believe and whose hearts find peace in the remembrance of Allah...\'; Ghāfir 40:60 - \'Your Lord says: Call upon Me; I will respond to you...\'; Al-Ḥujurāt 49:6 - \'O you who have believed, if there comes to you a disobedient one with information, investigate...\'."},{"heading":"Classical Texts & Commentaries","content":"Core compilations and scholarly commentaries for deeper study of duʿāʾ and dhikr."}]},{"chapterId":8,"title":"The Heart: Purification & Spiritual Diseases","summary":"The heart (qalb) in Islam is the spiritual center of human existence the seat of faith, intention, and moral consciousness. Its purification (tazkiyah) is the ultimate purpose of revelation.","overview":[{"heading":"The Heart is the Seat of Faith & Accountability","content":"Allah judges by what is in hearts, not mere outward actions.\\n\\nReferences:\\n\\"Allah does not look at your appearances or wealth, but at your hearts and deeds.\\" (Ṣaḥīḥ Muslim 2564). Resource: Iḥyāʾ ʿUlūm ad-Dīn (Revival of Religious Sciences) by Al-Ghazālī Book on Heart Diseases."},{"heading":"Spiritual Diseases Corrupt the Heart","content":"Hypocrisy (nifāq), arrogance (kibr), envy (ḥasad), and heedlessness (ghaflah) are fatal diseases.\\n\\nReferences:\\n\\"In their hearts is disease, so Allah has increased their disease...\\" (Al-Baqarah 2:10). Resource: ʿUddat aṣ-Ṣābirīn (Provisions for the Patient) by Ibn al-Qayyim Chapter on Envy."},{"heading":"Purification Requires Knowledge & Action","content":"One must first learn the diseases, then actively combat them through worship and character refinement.\\n\\nReferences:\\n\\"He has certainly succeeded who purifies it, and he has certainly failed who corrupts it.\\" (Ash-Shams 91:9-10). Resource: Mukhtaṣar Minhāj al-Qāṣidīn (Abridgement of The Path of the Seekers) by Ibn Qudāmah."},{"heading":"Arrogance (Kibr) is Rejecting Truth & Despising People","content":"The root of Iblīs’s sin, it prevents entry to Paradise.\\n\\nReferences:\\n\\"Whoever has an atom\'s weight of arrogance in his heart will not enter Paradise.\\" (Ṣaḥīḥ Muslim 91). Resource: Kitāb al-Kabāʾir (The Major Sins) by Adh-Dhahabī Chapter on Arrogance."},{"heading":"Envy (Ḥasad) Consumes Good Deeds","content":"It means wishing for Allah’s blessings to be removed from others.\\n\\nReferences:\\n\\"Beware of envy, for it consumes good deeds as fire consumes wood.\\" (Sunan Abī Dāwūd 4903 Ḥasan). Resource: Al-Fawāʾid (Points of Benefit) by Ibn al-Qayyim Section on Heart Maladies."},{"heading":"Showing Off (Riyāʾ) Nullifies Worship","content":"Seeking praise for worship instead of Allah’s pleasure.\\n\\nReferences:\\n\\"The slightest amount of showing off is shirk (polytheism).\\" (Sunan Ibn Mājah 3989 Ṣaḥīḥ). Resource: Kashf al-Khafāʾ (Unveiling the Hidden) by Al-ʿAjlūnī Entry on Riyāʾ."},{"heading":"Love of the World is the Root of All Faults","content":"Excessive attachment to dunyā weakens the heart’s connection to Allah.\\n\\nReferences:\\n\\"The love of this world is the root of every sin.\\" (Al-Muʿjam al-Awsaṭ 6066 Ḥasan). Resource: Al-Zuhd (Asceticism) by Imām Aḥmad Collection on Detachment."},{"heading":"Cures Include: Repentance, Dhikr, Qur’an, Good Company","content":"Specific remedies for each disease from Prophetic guidance.\\n\\nReferences:\\n\\"Hearts rust as iron rusts. Their polish is the remembrance (dhikr) of Allah.\\" (Shuʿab al-Īmān 1596 Ḥasan). Resource: Al-Wābil aṣ-Ṣayyib (The Gentle Rain) by Ibn al-Qayyim On Dhikr’s Effects."},{"heading":"The Sound Heart is Free from Shirk, Hatred & Envy","content":"It submits solely to Allah and wishes good for all Muslims.\\n\\nReferences:\\n\\"The Muslim is the one from whose tongue and hand Muslims are safe.\\" (Ṣaḥīḥ al-Bukhārī 10). Resource: Madārij as-Sālikīn (Stations of the Seekers) by Ibn al-Qayyim Grades of Heart Soundness."},{"heading":"Constant Self-Accounting (Muḥāsabah) is Necessary","content":"Regularly checking one’s intentions and actions.\\n\\nReferences:\\nUmar ibn al-Khaṭṭāb said: \\"Hold yourselves accountable before you are held accountable.\\" (Ḥilyat al-Awliyāʾ 1/52). Resource: Al-Ḥisbah fī al-Islām (Accountability in Islam) by Ibn Taymiyyah."}]},{"chapterId":9,"title":"The Manners: Islamic Etiquette (Adab)","summary":"Islamic manners (Adab) are not mere social etiquette but an integral part of faith (Īmān), encompassing how we interact with Allah, His creation, and ourselves.","overview":[{"heading":"Good Character Completes Faith","content":"The most beloved to Allah are those with best manners.\\n\\nReferences:\\n\\"The most perfect believer in faith is he who is best in character.\\" (Sunan at-Tirmidhī 1162 – Ṣaḥīḥ). Resource: Al-Adab al-Mufrad by Imām al-Bukhārī – Comprehensive manners collection."},{"heading":"Begin with Salām (Peace Greeting)","content":"Spreading peace is a means to Paradise and increases love.\\n\\nReferences:\\n\\"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I inform you of something which will make you love one another? Spread Salām among yourselves.\\" (Ṣaḥīḥ Muslim 54). Resource: Riyāḍ aṣ-Ṣāliḥīn by Imām al-Nawawī – Chapter on Salām."},{"heading":"Lower Your Voice & Speak Kindly","content":"A believer\'s speech is always measured, gentle, and truthful.\\n\\nReferences:\\n\\"And be moderate in your pace and lower your voice; indeed, the most disagreeable of sounds is the voice of donkeys.\\" (Luqmān 31:19). Resource: Al-Adhkar by Imām al-Nawawī – Chapter on Speech Manners."},{"heading":"Show Mercy to Earn Allah’s Mercy","content":"Mercy encompasses all creation humans, animals, and the environment.\\n\\nReferences:\\n\\"Those who are merciful will be shown mercy by the Most Merciful. Be merciful to those on earth, and the One in heaven will have mercy upon you.\\" (Sunan at-Tirmidhī 1924 – Ṣaḥīḥ). Resource: Al-Kabā\'ir by Adh-Dhahabī – Sections on cruelty."},{"heading":"Practice Modesty in Dress & Gaze","content":"Modesty (ḥayāʾ) is a branch of faith that beautifies conduct.\\n\\nReferences:\\n\\"Modesty brings nothing but good.\\" (Ṣaḥīḥ al-Bukhārī 6117). Resource: Ḥijāb al-Mar\'ah al-Muslimah by Al-Albānī – On Islamic dress code."},{"heading":"Honor Parents Absolutely","content":"After Allah, parents have the greatest right over a person.\\n\\nReferences:\\n\\"And your Lord has decreed that you worship none but Him, and be kind to parents...\\" (Al-Isrāʾ 17:23). Resource: Birr al-Wālidayn by Ibn al-Jawzī – Book on honoring parents."},{"heading":"Rights of Neighbors are Sacred","content":"The neighbor\'s right is so emphasized that the Prophet ﷺ thought they might inherit.\\n\\nReferences:\\n\\"Jibrīl kept recommending the neighbor to me until I thought he would make him an heir.\\" (Ṣaḥīḥ al-Bukhārī 6015). Resource: Al-Adab al-Mufrad – Chapters on neighborly rights."},{"heading":"Control Anger & Forgive Others","content":"True strength lies in self-control during anger, not in physical power.\\n\\nReferences:\\n\\"The strong is not the one who overcomes people by his strength, but the strong is the one who controls himself while in anger.\\" (Ṣaḥīḥ al-Bukhārī 6114). Resource: ʿUddat aṣ-Ṣābirīn by Ibn al-Qayyim – Chapter on Patience."},{"heading":"Honesty in All Transactions","content":"Truthfulness leads to righteousness and Paradise.\\n\\nReferences:\\n\\"Truthfulness leads to righteousness, and righteousness leads to Paradise.\\" (Ṣaḥīḥ al-Bukhārī 6094). Resource: Al-Bayʿ wal-Shirāʾ by Ibn ʿUthaymīn – On business ethics."},{"heading":"Respect for Elders & Kindness to Young","content":"A society is balanced when elders are respected and young are shown mercy.\\n\\nReferences:\\n\\"He is not of us who does not have mercy on our young nor honor our elders.\\" (Sunan at-Tirmidhī 1919 – Ḥasan). Resource: Al-Ādāb ash-Sharʿiyyah by Ibn Mufliḥ – Comprehensive manners text."}]},{"chapterId":10,"title":"The Lifestyle: Halal & Haram","summary":"The Islamic lifestyle is built upon the foundational principle of distinguishing between the lawful (Halal) and unlawful (Haram) a divine filter through which Muslims evaluate all actions, consumption, and transactions.","overview":[{"heading":"Only Allah Has the Right to Declare Halal or Haram","content":"Humans cannot prohibit what Allah has made lawful, nor permit what He has forbidden. This right belongs exclusively to Allah, as He is the Creator and Legislator.\\n\\nReferences:\\n\\"Do not say concerning what your tongues falsely describe, \'This is lawful and this is forbidden,\' to invent lies against Allah...\\" (An-Naḥl 16:116) Resource: Al-Ḥalāl wal-Ḥarām fil-Islām by Dr. Yūsuf al-Qaraḍāwī – Chapter on Theological Basis."},{"heading":"The Default State of All Things is Permissibility (Al-Ibāḥah al-Aṣliyyah)","content":"Except where definitive evidence establishes prohibition, everything is permissible. This principle applies to food, drinks, transactions, and worldly matters.\\n\\nReferences:\\n\\"He has explained to you what He has forbidden for you...\\" (Al-Anʿām 6:119) Resource: Al-Muṣṭalaḥāt al-Arbaʿah by Ibn ʿUthaymīn – Explanation of \\"Halal, Haram, Makrūh, Mandūb.\\""},{"heading":"Prohibitions Are Few & Clear; Permissibilities Are Vast","content":"Islam is not a religion of restrictions but of channeling freedom within divine boundaries. The core prohibitions are known and limited.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"What Allah has made lawful in His Book is Halal, and what He has forbidden is Haram, and what He remained silent about is pardoned.\\" (Sunan Ibn Mājah 3367 – Ḥasan) Resource: Al-Ashbāh wan-Naẓāʾir by As-Suyūṭī – Principles of Islamic Jurisprudence."},{"heading":"Haram Includes Both the Substance and Means to It","content":"It is not only forbidden to consume Haram (like alcohol) but also to sell, transport, serve, or benefit from its trade. The means to Haram are also Haram.\\n\\nReferences:\\n\\"Allah has cursed alcohol, its drinker, its server, its seller, its buyer...\\" (Sunan Abī Dāwūd 3674 – Ṣaḥīḥ) Resource: Al-Qawāʿid al-Fiqhiyyah by As-Saʿdī – Legal maxim: \\"Whatever leads to Haram is itself Haram.\\""},{"heading":"Lawful Food Must Meet Two Criteria: Permissible Source & Proper Slaughter","content":"Animals must be from Halal species and slaughtered according to Islamic rite (Tasmiyyah - mentioning Allah\'s name, cutting throat, windpipe, and blood vessels).\\n\\nReferences:\\n\\"Eat of that over which the name of Allah has been mentioned, if you are believers in His verses.\\" (Al-Anʿām 6:118) Resource: Fiqh al-Ṭaʿām wal-Ashribah by ʿAbdullah al-Faqīh – Detailed rulings on food."},{"heading":"All Financial Transactions Are Prohibited Unless Proven Permissible","content":"Unlike general matters, financial dealings require evidence of permissibility due to prevalence of fraud and injustice. The default is prohibition until proven Halal.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The sale is invalid if accompanied by uncertainty (Gharar).\\" (Ṣaḥīḥ Muslim 1513) Resource: Al-Buyūʿ al-Muḥarramah fil-Islām by Ṣāliḥ al-Fawzān – Forbidden transactions."},{"heading":"Major Prohibitions Include: Alcohol, Pork, Carnivorous Animals, Blood, Idolatry, Riba (Interest), Gambling, Fortune-Telling, Adultery, & Usurpation","content":"These are explicitly forbidden in the Qur\'an and Hadith and have severe spiritual, health, and social consequences.\\n\\nReferences:\\n\\"He has only forbidden you dead animals, blood, the flesh of swine, and that which has been dedicated to other than Allah.\\" (Al-Baqarah 2:173) Resource: Al-Kabāʾir by Adh-Dhahabī – The Major Sins."},{"heading":"Necessity (Ḍarūrah) Permits the Prohibited Within Strict Limits","content":"In genuine, life-threatening necessity, prohibited things become temporarily permissible, but only to the extent needed to remove the necessity.\\n\\nReferences:\\n\\"But whoever is forced by severe hunger with no inclination to sin – then indeed, Allah is Forgiving and Merciful.\\" (Al-Māʾidah 5:3) Resource: Qawāʿid al-Aḥkām by Al-ʿIzz ibn ʿAbd as-Salām – Rules of necessity."},{"heading":"Doubtful Matters Should Be Avoided to Protect One\'s Faith & Honor","content":"When uncertain, the pious approach is to leave what causes doubt for what causes no doubt. This safeguards one\'s religion and conscience.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Leave that which makes you doubt for that which does not make you doubt.\\" (Sunan at-Tirmidhī 2518 – Ṣaḥīḥ) Resource: Iʿlām al-Muwaqqiʿīn by Ibn al-Qayyim – Chapter on precaution."},{"heading":"Haram Consumption Affects Worship & Duʿāʾ Acceptance","content":"Consuming unlawful food, drink, or wealth prevents one\'s worship from being accepted and blocks the response to supplications.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Allah is pure and accepts only what is pure.\\" (Ṣaḥīḥ Muslim 1015) Resource: Al-Duʿāʾ by Ibn Abī Dunyā – Conditions for acceptance."}]},{"chapterId":11,"title":"Family & Marriage: Continuous Growth","summary":"The family is the cornerstone of Islamic society, and marriage (nikāḥ) is a sacred covenant (mīthāq ghalīẓ) ordained by Allah for spiritual growth, emotional fulfillment, and the establishment of righteous generations. ","overview":[{"heading":"Marriage is Half of Faith & Completion of Religion","content":"Marriage protects chastity, fulfills natural desires lawfully, and completes one\'s faith. It is a Prophetic Sunnah strongly recommended for those able.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"O young people! Whoever among you can afford marriage, let him marry, for it lowers the gaze and guards chastity...\\" (Ṣaḥīḥ al-Bukhārī 5065) Resource: Ādāb al-Zawāj (Etiquettes of Marriage) by ʿAbdullah al-Jibrīn.","resources":"https://sunnah.com/bukhari:5065"},{"heading":"The Spousal Relationship is Based on Mutual Mercy (Rahmah) & Tranquility (Sakīnah)","content":"Allah describes spouses as garments for one another providing protection, comfort, and covering. The marital bond is meant for psychological and spiritual peace.\\n\\nReferences:\\n\\"They are clothing for you and you are clothing for them...\\" (Al-Baqarah 2:187) Resource: The Muslim Family by Dr. Muḥammad Al-Hashimi.","resources":"https://quran.com/2/187"},{"heading":"The Husband is the Guardian (Qawwām) Responsible for Provision & Protection","content":"This leadership is based on responsibility, not superiority. The husband must maintain his family with kindness, consultation (shūrā), and fairness.\\n\\nReferences:\\n\\"Men are in charge of women by what Allah has given one over the other and what they spend from their wealth...\\" (An-Nisāʾ 4:34) Resource: Qawwāmah: The Framework of Male Guardianship by Dr. Jasser Auda.","resources":"https://quran.com/4/34"},{"heading":"The Wife Has the Right to Kind Treatment, Financial Support, & Intimate Companionship","content":"Her rights are sacred and detailed in the Qur\'an and Sunnah. Discharging them is an act of worship for the husband.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The best of you is he who is best to his wife, and I am the best of you to my wives.\\" (Sunan Ibn Mājah 1977 – Ṣaḥīḥ) Resource: Huqūq al-Zawjayn (Rights of Spouses) by Ṣāliḥ al-Fawzān.","resources":"https://sunnah.com/ibnmajah:1977"},{"heading":"Choosing a Spouse Should Prioritize Piety (Dīn) & Good Character","content":"Wealth, beauty, and lineage are secondary considerations. A righteous spouse is the key to a blessed home and successful upbringing of children.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"A woman is married for four things: her wealth, lineage, beauty, and religion. Choose the religious woman, lest your hands be rubbed with dust!\\" (Ṣaḥīḥ al-Bukhārī 5090) Resource: Al-Akhṭāʾ al-Shāʾiʿah fī Ṭalab al-Zawj (Common Mistakes in Seeking Marriage) by ʿAbd al-ʿAzīz al-Nāṣir.","resources":"https://sunnah.com/bukhari:5090"},{"heading":"Children Are a Trust (Amānah) & Must Be Raised With Love, Islamic Education, & Good Example","content":"Parents will be held accountable for their upbringing. The first words a child should hear are the call to prayer (adhān) in their ears.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Every one of you is a shepherd and is responsible for his flock...\\" (Ṣaḥīḥ al-Bukhārī 893) Resource: Tarbiyat al-Awlād fī al-Islām (Raising Children in Islam) by Dr. ʿAbdullah Nāṣiḥ ʿUlwān.","resources":"https://sunnah.com/bukhari:893"},{"heading":"Maintaining Kinship Ties (Ṣilat al-Raḥim) is Obligatory & Brings Blessings","content":"This includes parents, siblings, and extended family. Severing ties is a major sin that brings Allah\'s curse and withholds blessings.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Whoever believes in Allah and the Last Day, let him maintain the bonds of kinship.\\" (Ṣaḥīḥ al-Bukhārī 6138) Resource: Birr al-Wālidayn wa Ṣilat al-Arḥām by Ibn al-Jawzī.","resources":"https://sunnah.com/bukhari:6138"},{"heading":"Conflict Resolution Follows the Sequence: Private Advice → Mediation → Arbitration","content":"Disputes should be resolved with wisdom, patience, and seeking intervention from righteous family members if needed.\\n\\nReferences:\\n\\"If you fear a breach between them, appoint an arbiter from his family and an arbiter from her family...\\" (An-Nisāʾ 4:35) Resource: Al-Iṣlāḥ bayn al-Zawjayn (Reconciliation Between Spouses) by Dr. Ṣāliḥ al-Ghāmidī.","resources":"https://quran.com/4/35"},{"heading":"Divorce is Permitted But the Most Hated Permissible Act to Allah","content":"It is a last resort after all reconciliation efforts fail. The procedure must follow Islamic guidelines to minimize harm.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The most hateful permissible thing to Allah is divorce.\\" (Sunan Abī Dāwūd 2178 – Ḥasan) Resource: Aḥkām al-Ṭalāq (Rulings of Divorce) by Ibn ʿUthaymīn.","resources":"https://sunnah.com/abudawud:2178"},{"heading":"The Family Home Should Be a Place of Remembrance (Dhikr), Prayer, & Mercy","content":"Angels enter homes where Allah is remembered and blessings descend. The home should be a sanctuary from worldly fitnah.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The example of a home in which Allah is remembered and a home in which Allah is not remembered is like the living and the dead.\\" (Ṣaḥīḥ Muslim 779) Resource: Kayfa Takūn Usrah Saʿīdah (How to Have a Happy Family) by Dr. ʿĀʾid al-Qarnī.","resources":"https://sunnah.com/muslim:779"}]},{"chapterId":12,"title":"The Community: Ummah & Support","summary":"The Muslim Ummah is a single spiritual body bound by faith, mutual responsibility, and divine brotherhood. It transcends race, nationality, and language, united under the banner of Lā ilāha illallāh.","overview":[{"heading":"The Ummah is One Spiritual Body Under Allah\'s Lordship","content":"Muslims worldwide form a single nation united by Tawheed, the Qur\'an, and following Prophet Muhammad ﷺ. This unity is a divine blessing and a collective responsibility.\\n\\nReferences:\\n\\"Indeed, this Ummah of yours is one Ummah, and I am your Lord, so worship Me.\\" (Al-Anbiyāʾ 21:92)\\nResource: Minhāj al-Muslim by Abū Bakr al-Jazā\'irī – Book of Brotherhood and Social Conduct.","resources":"https://quran.com/21/92"},{"heading":"Faith-Based Brotherhood Overrides All Worldly Loyalties","content":"The bond of Īmān is stronger than ties of blood, ethnicity, or nationality. A Muslim must love for their brother what they love for themselves.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"None of you truly believes until he loves for his brother what he loves for himself.\\" (Ṣaḥīḥ al-Bukhārī 13)\\nResource: Al-Adab al-Mufrad by Imām al-Bukhārī – Chapter: The Believer\'s Love for His Brother.","resources":"https://sunnah.com/bukhari:13"},{"heading":"Muslims Have Six Fundamental Rights Over Each Other","content":"When you meet a Muslim, greet them; when invited, accept; when they seek advice, give sincere counsel; when they sneeze, respond; when sick, visit; when they die, attend the funeral.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The rights of one Muslim over another are six...\\" (Ṣaḥīḥ Muslim 2162)\\nResource: Riyāḍ aṣ-Ṣāliḥīn by Imām al-Nawawī – Chapter on the Rights of Muslims.","resources":"https://sunnah.com/muslim:2162"},{"heading":"The Community Must Protect Its Vulnerable: Orphans, Widows, and the Needy","content":"Caring for the vulnerable is a collective obligation. The Prophet ﷺ promised Paradise to those who care for orphans.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"I and the caretaker of an orphan will be in Paradise like these two,\\" and he held up his index and middle fingers together. (Ṣaḥīḥ al-Bukhārī 6005)\\nResource: Al-Birr wa ṣ-Ṣilah by Ibn al-Jawzī – On Righteousness and Maintaining Ties.","resources":"https://sunnah.com/bukhari:6005"},{"heading":"The Masjid is the Spiritual and Social Heart of the Community","content":"It is a center for worship, education, consultation, and social cohesion. Building and maintaining masājid carries continuous reward.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.\\" (Ṣaḥīḥ al-Bukhārī 450)\\nResource: Aḥkām al-Masājid by Ibn al-\'Arabī – The Rulings Pertaining to Mosques.","resources":"https://sunnah.com/bukhari:450"},{"heading":"Enjoining Good and Forbidding Evil Preserves the Community","content":"This collective duty maintains the Ummah\'s moral integrity and requires wisdom, knowledge, and patience.\\n\\nReferences:\\n\\"You are the best community ever raised for humanity you enjoin good, forbid evil, and believe in Allah...\\" (Āli ʿImrān 3:110)\\nResource: Al-Amr bil-Ma\'rūf wan-Nahy \'an al-Munkar by Ibn Taymiyyah.","resources":"https://quran.com/3/110"},{"heading":"Reconciliation Between Believers is Highly Rewarded","content":"Making peace between Muslims is better than many voluntary acts of worship. Spreading discord is a major sin.\\n\\nReferences:\\n\\"There is no good in most of their secret talks, except one who enjoins charity, kindness, or reconciliation between people...\\" (An-Nisā\' 4:114)\\nResource: Al-Iṣlāḥ bayna al-Muslimīn (Reconciliation Between Muslims) – Scholarly treatises.","resources":"https://quran.com/4/114"},{"heading":"Diversity in the Ummah is a Sign of Allah\'s Wisdom","content":"Differences in legal schools, cultures, and languages are a mercy when managed with mutual respect and adherence to core creed.\\n\\nReferences:\\n\\"O humanity, indeed We created you from a male and a female, and made you into peoples and tribes so that you may know one another...\\" (Al-Ḥujurāt 49:13)\\nResource: Al-Insāf fī Bayān Asbāb al-Ikhtilāf by Al-Ṭaḥāwī – On Reasons for Scholarly Differences.","resources":"https://quran.com/49/13"},{"heading":"Supporting the Oppressed is an Obligation","content":"Muslims must stand against injustice everywhere. Failing to help the oppressed when able incurs responsibility.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Help your brother, whether he is an oppressor or oppressed.\\" A companion asked: \\"Messenger of Allah, I help him when oppressed, but how do I help him when he is an oppressor?\\" He replied: \\"By preventing him from oppressing others.\\" (Ṣaḥīḥ al-Bukhārī 2444)\\nResource: Al-Jihād wal-Qiṭāl by Dr. Ṣalāḥ al-Ṣāwī – On the Categories of Struggle.","resources":"https://sunnah.com/bukhari:2444"},{"heading":"Loving for Allah\'s Sake is the Highest Brotherhood","content":"Relationships based on faith are blessed and endure. On Judgment Day, those who loved for Allah will receive His special shade.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"On the Day of Resurrection, Allah will announce: \'Where are those who loved each other for the sake of My glory? Today I shall shade them in My shade when there is no shade but Mine.\'\\" (Ṣaḥīḥ Muslim 2566)\\nResource: Iḥyā\' ʿUlūm ad-Dīn by Al-Ghazālī – Book on the Etiquettes of Companionship.","resources":"https://sunnah.com/muslim:2566"}]},{"chapterId":13,"title":"The Future: Continuous Growth","summary":"The believer\'s journey is one of perpetual growth and spiritual ascent, from the first declaration of faith until meeting Allah. This continuous development (tazkiyyah an-nafs) and steadfastness (istigāmah) are the essence of a successful Islamic life.","overview":[{"heading":"Spiritual Growth is Obligatory Until Death","content":"Purification of the soul (tazkiyyah) is a lifelong obligation that increases faith and draws one closer to Allah. The believer should be in a better state today than yesterday.\\n\\nReferences:\\n\\"O you who have believed, fear Allah and believe in His Messenger; He will grant you a double portion of His mercy and make for you a light by which you will walk...\\" (Al-Ḥadīd 57:28)\\nResource: Madārij as-Sālikīn by Ibn al-Qayyim – The Stations of the Spiritual Seekers.","resources":"https://quran.com/57/28"},{"heading":"Steadfastness (Istiqāmah) is Superior to Extraordinary Acts","content":"Consistency in moderate worship is better than intense but sporadic devotion that leads to burnout. The most beloved deeds to Allah are the most regular.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The most beloved deed to Allah is the most regular and constant even if it were little.\\" (Ṣaḥīḥ al-Bukhārī 6464)\\nResource: Riyāḍ aṣ-Ṣāliḥīn by Imām al-Nawawī – Chapter on Consistency.","resources":"https://sunnah.com/bukhari:6464"},{"heading":"Knowledge Precedes Action and Increases It","content":"Seeking beneficial knowledge is the foundation of growth. Without knowledge, actions may be invalid or misdirected. The pursuit of knowledge is worship.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Whoever Allah wishes good for, He gives him understanding of the religion.\\" (Ṣaḥīḥ al-Bukhārī 71)\\nResource: Fatḥ al-Bārī by Ibn Ḥajar – Commentary on the Book of Knowledge.","resources":"https://sunnah.com/bukhari:71"},{"heading":"Balance Between Worldly Endeavors and Hereafter Preparation","content":"Islam encourages excellence in both worlds. Work for this life as if you will live forever, and work for the Hereafter as if you will die tomorrow.\\n\\nReferences:\\n\\"Seek the Hereafter through what Allah has given you, and do not neglect your share of this world...\\" (Al-Qaṣaṣ 28:77)\\nResource: Al-Mustaqṣā fī Fadl al-ʿIlm wa Ahluh by Al-Ghazālī – On Balancing Knowledge and Action.","resources":"https://quran.com/28/77"},{"heading":"Repentance (Tawbah) is the Continuous Door to Growth","content":"The believer constantly falls and rises through sincere repentance. Allah loves those who frequently repent and purify themselves.\\n\\nReferences:\\n\\"Indeed, Allah loves those who are constantly repentant and loves those who purify themselves.\\" (Al-Baqarah 2:222)\\nResource: Al-Tawwābūn by Ibn al-Qayyim – On the Virtues of Repentance.","resources":"https://quran.com/2/222"},{"heading":"Spiritual Setbacks are Tests, Not Failures","content":"Times of laxity or stagnation are tests from Allah. The believer responds by increasing in supplication, reflection, and returning to the basics of faith.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Faith wears out in the heart of any one of you as clothes wear out, so ask Allah to renew faith in your hearts.\\" (Musnad Aḥmad 8604 – Ḥasan)\\nResource: ʿUddat aṣ-Ṣābirīn by Ibn al-Qayyim – Provisions for the Patient.","resources":"https://sunnah.com/ahmad:8604"},{"heading":"Good Companionship Accelerates Spiritual Growth","content":"The company of the righteous inspires good deeds and protects from misguidance. A person is upon the religion of their close friends.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"A person is upon the religion of their close friend, so let one of you look at whom they befriend.\\" (Sunan at-Tirmidhī 2378 – Ḥasan)\\nResource: Al-ʿIlal by Imām Aḥmad – On Virtues of Righteous Companionship.","resources":"https://sunnah.com/tirmidhi:2378"},{"heading":"Planning for Both Short-Term and Eternal Future is Sunnah","content":"The Prophet ﷺ taught strategic planning for worldly matters while constantly preparing for the Hereafter through righteous deeds.\\n\\nReferences:\\n\\"And prepare against them whatever you are able of power...\\" (Al-Anfāl 8:60) and \\"And take provision, for indeed, the best provision is righteousness.\\" (Al-Baqarah 2:197)\\nResource: Al-Hisbah fī al-Islām by Ibn Taymiyyah – On Planning and Accountability.","resources":"https://quran.com/8/60, https://quran.com/2/197"},{"heading":"Death Remembrance is the Ultimate Motivator for Growth","content":"Frequent remembrance of death softens the heart, detaches from worldly illusions, and spurs one toward righteous deeds.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Remember often the destroyer of pleasures: death.\\" (Sunan at-Tirmidhī 2307 – Ṣaḥīḥ)\\nResource: Al-Tadhkirāt al-Qurṭubī by Al-Qurṭubī – Reminders of Death and the Hereafter.","resources":"https://sunnah.com/tirmidhi:2307"},{"heading":"The Ultimate Success is Allah\'s Pleasure and Paradise","content":"All worldly achievements are temporary. The true success is attaining Allah\'s pleasure and eternal Paradise through righteous deeds and sound faith.\\n\\nReferences:\\n\\"Indeed, the successful are the believers... their reward with their Lord is Gardens of eternity beneath which rivers flow...\\" (Al-Bayyinah 98:7-8)\\nResource: Ḥadī al-Arwāḥ by Ibn al-Qayyim – The Journey of the Souls to the Hereafter.","resources":"https://quran.com/98/7-8"}]},{"chapterId":14,"title":"The Hereafter: Death, Grave & Beyond","summary":"The reality of death, the intermediate world of the grave (Barzakh), and the eternal life of the Hereafter (Ākhirah) form the foundational belief that defines a Muslim’s purpose and actions.","overview":[{"heading":"Death is Predestined & Its Timing is Known Only to Allah","content":"Every soul will taste death at its appointed time which cannot be delayed or hastened. Death severs all worldly connections and deeds.\\n\\nReferences:\\n\\"No soul knows what it will earn tomorrow, and no soul knows in what land it will die. Indeed, Allah is Knowing and Aware.\\" (Quran Luqmān 31:34)\\nResource: Kitāb al-Raqā\'iq by Ibn al-Mubārak – Chapter on Remembering Death."},{"heading":"The Soul is Taken by the Angel of Death & Returns to its Lord","content":"The righteous soul is taken gently and greeted with good news, while the wicked soul is seized painfully. The soul then begins its journey in Barzakh.\\n\\nReferences:\\n\\"Say: \'The Angel of Death, who is entrusted with you, will take your souls. Then to your Lord you will be returned.\'\\" (Quran As-Sajdah 32:11)\\nResource: Aḥwāl al-Qiyāmah by Dr. \'Umar al-Ashqar – The States of the Day of Judgment."},{"heading":"The Grave is Either a Garden from Paradise or a Pit from Hell","content":"Based on one\'s deeds, the grave becomes a place of comfort or torment. The deceased hears footsteps, knows their visitors, and experiences reward or punishment.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The grave is either a garden from the gardens of Paradise, or a pit from the pits of Hell.\\" (Sunan at-Tirmidhī 2461 – Ṣaḥīḥ)\\nResource: Al-Tadhkirah fī Aḥwāl al-Mawtā wa Umūr al-Ākhirah by Al-Qurṭubī."},{"heading":"Two Angels Question the Deceased in the Grave About Faith","content":"Munkar and Nakīr question every person about their Lord, religion, and prophet. The believer answers correctly, while the disbeliever or hypocrite fails.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"When the deceased is buried, two black-blue angels come to him... they ask him: \'Who is your Lord? What is your religion? Who is this man sent among you?\'\\" (Sunan Abī Dāwūd 4753 – Ṣaḥīḥ)\\nResource: \'Aqīdat Ahl as-Sunnah fī Ṣifat al-Malā\'ikah by Ṣāliḥ al-Fawzān."},{"heading":"The Trumpet Will be Blown Twice: Destruction & Resurrection","content":"The first blast will cause everything to perish. The second blast will raise all creation from Adam to the last person for judgment.\\n\\nReferences:\\n\\"And the Horn will be blown, and whoever is in the heavens and whoever is on the earth will fall dead except whom Allah wills. Then it will be blown again, and at once they will be standing, looking on.\\" (Quran Az-Zumar 39:68)\\nResource: Al-Nihāyah fī al-Fitan wal-Malāḥim by Ibn Kathīr – The End Times."},{"heading":"Humanity Will be Gathered Barefoot, Naked & Uncircumcised","content":"All people will be resurrected in their original state. They will stand for 50,000 years of this world\'s time awaiting judgment, sweating according to their sins.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"You will be gathered barefoot, naked, and uncircumcised... The first to be clothed will be Ibrāhīm.\\" (Ṣaḥīḥ al-Bukhārī 3349)\\nResource: Ṣifat al-Mahshar by Ibn al-Qayyim – Description of the Gathering."},{"heading":"The Scales Will be Set Up & Deeds Weighed with Absolute Justice","content":"Every atom\'s weight of good and evil will be accounted for. The scrolls of deeds will be given in the right hand (believers) or left hand/behind the back (disbelievers).\\n\\nReferences:\\n\\"And We place the scales of justice for the Day of Resurrection, so no soul will be treated unjustly at all. And if there is even the weight of a mustard seed, We will bring it forth.\\" (Quran Al-Anbiyā\' 21:47)\\nResource: Al-Yawm al-Ākhir by Dr. \'Umar al-Ashqar – The Final Day."},{"heading":"The Ṣirāṭ (Bridge) Over Hell is Sharper than a Sword & Thinner than Hair","content":"All must cross it; believers will cross according to their deeds\' speed, while disbelievers and sinners will fall into Hell.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"The Ṣirāṭ will be set up over Hell. I and my Ummah will be the first to cross it.\\" (Ṣaḥīḥ al-Bukhārī 6573)\\nResource: Ḥadī al-Arwāḥ by Ibn al-Qayyim – The Soul\'s Journey."},{"heading":"Intercession (Shafā\'ah) is Granted by Allah to Prophets, Angels & Believers","content":"The Greatest Intercession by Prophet Muhammad ﷺ will hasten the Reckoning. Believers will intercede for family and friends who deserve Paradise.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"My intercession is for those of my Ummah who committed major sins.\\" (Sunan at-Tirmidhī 2435 – Ḥasan)\\nResource: Al-Ṣafā\'ah \'inda Ahl as-Sunnah by Muḥammad al-Khumayyis."},{"heading":"Paradise & Hell are Real, Eternal Creations","content":"Paradise has what no eye has seen, no ear has heard, and no heart has imagined. Hell is a place of indescribable torment for disbelievers and sinful Muslims.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Allah said: \'I have prepared for My righteous slaves what no eye has seen, no ear has heard, and no human heart has ever perceived.\'\\" (Ṣaḥīḥ al-Bukhārī 3244)\\nResource: Ṣifat al-Jannah wan-Nār by Ibn Kathīr – Description of Paradise and Hell."}]},{"chapterId":15,"title":"Paradise & Hell: Your Permanent Home","summary":"Paradise (Al-Jannah) and Hell (An-Nār) are the two eternal, physical abodes that await every soul after the Day of Judgment. They are not metaphorical states but actual creations of Allah, currently existing, where bodies and souls will experience unimaginable pleasure or unspeakable torment for eternity.","overview":[{"heading":"Paradise and Hell Currently Exist & Are Eternal Creations","content":"Both were created by Allah before humanity and will never cease to exist. Paradise is above the heavens, while Hell is in the lowest depths.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"When Allah created Paradise and Hell, He sent Jibrīl to Paradise saying: \'Look at it and at what I have prepared for its inhabitants.\'\\" (Ṣaḥīḥ Muslim 2842)\\nResource: Ṣifat al-Jannah wan-Nār by Ibn Kathīr – Descriptions of Paradise and Hell."},{"heading":"Paradise Has Eight Gates & Hell Has Seven Gates & Depths","content":"Each gate of Paradise is named for a specific type of good deed. Hell\'s levels descend in severity, with the deepest for hypocrites.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Paradise has eight gates, and Hell has seven gates.\\" (Ṣaḥīḥ al-Bukhārī 3257)\\nResource: Al-Tadhkirah fī Aḥwāl al-Mawtā by Al-Qurṭubī – Chapter on the Abodes of the Hereafter."},{"heading":"Paradise Contains What No Eye Has Seen, No Ear Has Heard","content":"Its pleasures surpass all worldly imagination. Every delight is eternal, pure, and free from any negative consequences.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"Allah said: \'I have prepared for My righteous slaves what no eye has seen, no ear has heard, and no human heart has ever perceived.\'\\" (Ṣaḥīḥ al-Bukhārī 3244)\\nResource: Ḥadī al-Arwāḥ by Ibn al-Qayyim – The Soul\'s Journey to the Abode of Bliss."},{"heading":"Hell-Fire is 70 Times Hotter Than Earthly Fire & Its Fuel is People & Stones","content":"Its heat, torment, and duration are incomparable to anything in this world. Disbelievers will have boiling water, pus, and chains of specific lengths.\\n\\nReferences:\\n\\"O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones...\\" (Quran At-Taḥrīm 66:6)\\nResource: Al-Nār: Ṣifatuhā wa Ahluha by Dr. \'Umar al-Ashqar – Hell: Its Description and Inhabitants."},{"heading":"The Highest Level of Paradise is Al-Firdaws, Below the Throne of Allah","content":"The peak of Paradise is directly beneath Allah\'s Throne (\'Arsh). Whoever asks Allah for it will receive it.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"When you ask Allah for Paradise, ask for Al-Firdaws, for it is the highest part of Paradise, in the middle of Paradise, and from it spring the rivers of Paradise.\\" (Ṣaḥīḥ al-Bukhārī 2790)\\nResource: Fatḥ al-Bārī by Ibn Ḥajar – Commentary on the ḥadīth of Al-Firdaws."},{"heading":"Believers Will See Allah in Paradise – The Greatest Bliss","content":"This vision will be a reality for the people of Paradise, bringing indescribable joy and satisfaction beyond all other pleasures.\\n\\nReferences:\\n\\"For those who do good is the best reward and an increase.\\" (Quran Yūnus 10:26)\\nThe Prophet ﷺ explained \\"an increase\\" as \\"looking at the Face of Allah.\\" (Ṣaḥīḥ Muslim 181)\\nResource: Al-Ru\'yah by Ibn Khuzaymah – The Vision of Allah in the Hereafter."},{"heading":"Sinners Among Muslims May Enter Hell Temporarily Then Be Rescued","content":"Those who died believing in Tawḥīd but with major sins may be punished in Hell, then removed by Allah\'s mercy and the intercession of Prophet Muhammad ﷺ.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"My intercession is for those of my Ummah who committed major sins.\\" (Sunan at-Tirmidhī 2435 – Ḥasan)\\nResource: Al-Ṣafā\'ah by Ibn Taymiyyah – On Intercession."},{"heading":"Disbelievers Will Remain in Hell Forever Without Escape","content":"Those who died rejecting Tawḥīd or associating partners with Allah will abide in Hell eternally; their punishment never decreases.\\n\\nReferences:\\n\\"Indeed, those who disbelieve and commit wrong never will Allah forgive them, nor will He guide them to a path except the path of Hell, wherein they will abide forever.\\" (Quran An-Nisāʾ 4:168-169)\\nResource: \'Aqīdat Ahl as-Sunnah fī al-Qaḍā\' wal-Qadar – Creed regarding Divine Decree and eternal punishment."},{"heading":"Paradise Has Rivers of Water, Milk, Honey & Wine That Doesn\'t Intoxicate","content":"Its blessings are pure, abundant, and freely available. The wine of Paradise causes no headache or loss of reason.\\n\\nReferences:\\n\\"The description of Paradise promised to the righteous: therein are rivers of water unaltered, rivers of milk whose taste never changes, rivers of wine delicious to those who drink...\\" (Quran Muḥammad 47:15)\\nResource: Tafsīr Ibn Kathīr – Commentary on the verses describing Paradise."},{"heading":"People of Paradise Will Never Experience Boredom, Fatigue, or Death","content":"Paradise is perpetual bliss without any negative feelings. Its inhabitants will remain youthful forever at the age of 33.\\n\\nReferences:\\nThe Prophet ﷺ said: \\"It will be proclaimed to the people of Paradise: \'You will be healthy and never fall ill; you will live and never die; you will be youthful and never grow old; you will be in bliss and never experience misery.\'\\" (Ṣaḥīḥ Muslim 2837)\\nResource: Ṣifat al-Jannah by Ibn Abī ad-Dunyā – Descriptions of Paradise."}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterPlanGuides.json":
/*!**************************************************************!*\
  !*** ./resources/components/vue/data/chapterPlanGuides.json ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"chapterTitle":"The Foundation","plans":[{"planId":"7-day","title":"7-Day Week Plan","duration":"7 days","description":"Use this week to revisit the heart of Tawheed and let its clarity breathe through your days.","highlights":["Day 1-3: Pin a card of the six articles near your mirror and read one aloud each morning, Dedicate an afternoon to exploring the angels  note which angelic attribute inspires you most, Call a trusted guide to share one new insight about Qadar that surprised you this week.","Day 4-6: Track a simple decision each night and label the articles of faith that influenced it, Close the week with a dua that weaves together belief, patience, and trust in Allah’s plan, Read the story of Prophet Ibrāhīm\'s search for truth (Qur\'an 6:76-79).","Day 7: Self-audit: What/who do you love, fear, and hope in most?"]},{"planId":"14-day","title":"14-Day Journey","duration":"14 days","description":"Across two weeks, weave Tawheed into your rhythm with gentle check-ins and family reminders.","highlights":["Week 1 Focus: Understanding Islam vs. Īmān vs. Iḥsān. Study the Ḥadīth of Jibrīl (Bukhari 50). Memorize the 6 pillars of Īmān.","Week 2 Focus: Avoiding Shirk in daily life. Learn 5 major and 5 minor forms of Shirk. Purify one daily habit of showing off (Riyā\')"]},{"planId":"30-day","title":"30-Day Immersion","duration":"30 days","description":"Let thirty days of The Foundation make Tawheed feel second nature in every routine.","highlights":["Week 1-2: Deep study of Tawheed al-Rubūbiyyah – recognize Allāh\'s control in every aspect of life.","Week 3: Deep study of Tawheed al-Asmā\' waṣ-Ṣifāt – learn 30 Names with proofs.","Week 4: Deep study of Tawheed al-‘Ibādah – audit all acts of worship for sincerity."]}]},{"chapterId":2,"chapterTitle":"The Beliefs","plans":[{"planId":"7-day","title":"7-Day Week Plan","duration":"7 days","description":"Use this week to ground yourself in the six articles of faith through quick, vivid reminders.","highlights":["Day 1-3: Study one category of Tawḥīd, Learn the names/duties of 5 key angels, Read about the Qur’ān’s preservation.","Day 4-6: Learn the names of 5 mentioned in the Qur’ān, Study the signs of the Hour (minor signs), Understand its four levels.","Day 7: Review – Recite the Ḥadīth of Jibrīl from memory."]},{"planId":"14-day","title":"14-Day Plan","duration":"14 days","description":"Stretch your trust in the six articles over two weeks by journaling and sharing stories.","highlights":["Week 1 (Pillars 1-3): Daily: Read one relevant āyah + its tafsīr. Focus on internalizing each belief.","Week 2 (Pillars 4-6): Daily: Read one relevant ḥadīth. Focus on practical implications in daily life."]},{"planId":"30-day","title":"30-Day Formation","duration":"30 days","description":"Let thirty days of The Beliefs turn the six pillars of creed into steady, lived trust.","highlights":["Week 1-2: Knowledge. Complete a short online course on Islamic Belief.","Week 3: Reflection. Keep a journal: How did each pillar affect your decisions/thoughts today?","Week 4: Application. Share one insight about the six beliefs with a family member or friend."]}]},{"chapterId":3,"chapterTitle":"The Pillars","plans":[{"planId":"7-day","title":"Seven-Day Check-In","duration":"7 days","description":"Let seven days of The Pillars reinforce your daily acts of worship with tiny checkpoints.","highlights":["Day 1-3: Memorize shahādah in Arabic with meaning, Learn wuḍū’ (ablution) steps correctly, Pray one farḍ prayer on time with focus.","Day 4-6: Calculate your net worth for future zakāh, Read about Ramadan virtues (Bukhari 1901), Study the story of Prophet Ibrāhīm (Hajj connection).","Day 7: Reflect: Which pillar needs most attention?"]},{"planId":"14-day","title":"14-Day Reflection","duration":"14 days","description":"Frame two weeks around The Pillars by rotating through rituals and reflective prompts.","highlights":["Week 1: Pray each prayer within 10 minutes of its time, Conditions of prayer (Takbīrat al-Iḥrām to Salām).","Week 2: Give small charity (even a date), Study eight recipients of zakāh (9:60), Watch virtual Hajj tour (Makkah 360°)"]},{"planId":"30-day","title":"30-Day Rhythm","duration":"30 days","description":"Build a thirty-day practice where The Pillars anchor your habit loops.","highlights":["Week 1-2: Perfect your prayers (posture, concentration, timeliness).","Week 3: Purify wealth (clear debts, calculate zakāh, give regularly).","Week 4: Spiritual fasting (fast Mondays/Thursdays or 13th-15th lunar days)."]}]},{"chapterId":4,"chapterTitle":"The Quran","plans":[{"planId":"7-day","title":"7-Day Foundation Plan","duration":"7 days","description":"Build a steady Qur\'an rhythm in one week with focused recitation, study, and reflection.","highlights":["Day 1: Learn/Perfect Sūrah Al-Fātiḥah with meaning.","Day 2: Read the Tafsīr of the last 10 verses of Sūrah Al-Kahf.","Day 3: Memorize one short āyah about Tawḥīd.","Day 4: Listen to a moving recitation (e.g., Sūrah Ar-Raḥmān).","Day 5: Practice proper Tajwīd of one rule (e.g., Noon Sākinah).","Day 6: Reflect: Which Qur\'anic command can you apply today?","Day 7: Revise all you learned this week."]},{"planId":"14-day","title":"14-Day Deep Dive","duration":"14 days","description":"Sustain daily Qur\'an connection while moving from recitation to deeper understanding.","highlights":["Week 1: Connection. Recite 1-2 pages daily after Fajr with focus, even if you don\'t fully understand.","Week 2: Understanding. Choose one short Sūrah (e.g., Sūrah Al-ʿAṣr) and study its tafsīr in detail."]},{"planId":"30-day","title":"30-Day Transformation Plan","duration":"30 days","description":"Shape a month-long Qur\'an practice with habit formation, comprehension, and character work.","highlights":["Week 1-2: Habit Formation. Commit to 10-15 minutes of daily recitation at a fixed time.","Week 3: Comprehension. Start a short tafsīr book (e.g., A Summary of the Qur\'an by Towards Eternity).","Week 4: Implementation. Identify 3 character traits from the Qur\'an to work on (e.g., patience, truthfulness, gratitude)."]}]},{"chapterId":5,"chapterTitle":"The Prophet","plans":[{"planId":"7-day","title":"7-Day Starter Plan","duration":"7 days","description":"Begin a focused week of seerah study that traces key moments and lessons from the Prophet’s ﷺ life.","highlights":["Day 1-2: His character before prophethood (Al-Ameen, the Trustworthy).","Day 3-4: The first revelation and early preaching in Mecca.","Day 5: The Hijrah (Migration) to Madinah.","Day 6: Key lessons from the Treaty of Hudaybiyyah.","Day 7: His farewell sermon and final advice."]},{"planId":"14-day","title":"14-Day Deep Dive Plan","duration":"14 days","description":"Continue the starter plan and deepen your study with family life, leadership, and compassion.","highlights":["Day 1-7: Follow the 7-day plan.","Day 8-9: His treatment of family and children.","Day 10-11: His humility and lifestyle as a leader.","Day 12-13: His compassion for animals, neighbors, and non-Muslims.","Day 14: Compile key lessons for personal implementation."]},{"planId":"30-day","title":"30-Day Comprehensive Plan","duration":"30 days","description":"Build on the 14-day plan with extended study and a personal implementation roadmap.","highlights":["Days 1-14: Follow the 14-day plan.","Weeks 3 & 4: Study one major event/battle per day (Badr, Uhud, Khandaq, Conquest of Mecca). Focus on the lessons and ethics over just the history.","Final Days: Read a summarized biography (e.g., \\"Muhammad: His Life Based on the Earliest Sources\\" by M. Lings) and list 10 personal changes to make."]}]},{"chapterId":6,"chapterTitle":"The Prayer","plans":[{"planId":"7-day","title":"7-Day Rhythm","duration":"7 days","description":"Anchor your days this week around Salah, letting each prayer become a mindful stop.","highlights":["Before each prayer, spend thirty seconds to breathe, settle your eyes, and set an intention.","Check your wudu routine midweek  keep it calm and consistent.","After Asr, note how the prayer steadied your energy.","Play a gentle call to prayer, then reflect on its cadence with gratitude.","End the week by reciting a short dua that celebrates the closeness Salah creates."]},{"planId":"14-day","title":"14-Day Discipline","duration":"14 days","description":"Over two weeks, make Salah a steady rhythm by pairing it with reflection rituals.","highlights":["Alternate between quiet contemplation and expressive thankfulness after each prayer.","Let clean prayer space remind you of the sanctity of stillness.","Invite a family member into a mini dialogue about what Salah awakens.","Use day 10 to note how Salah calmed a worry or restored focus.","Record a voice reminder of one new dhikr you are holding onto."]},{"planId":"30-day","title":"30-Day Foundation","duration":"30 days","description":"Turn Salah into a monthly guide, weaving discipline and humility into the five prayers.","highlights":["Week 1: Assign a focus word to each prayer (e.g., gratitude for Fajr, patience for Dhuhr).","Weeks 2-3: Layer short walking meditations before Salah to signal a shift in mood.","Week 4: Capture how consistent call to prayer reinforced your daily boundaries.","Practice a weekly dhikr circle, sharing favorite phrases with close friends.","Close the month by thanking Allah for the rhythm that anchors your day."]}]},{"chapterId":7,"chapterTitle":"The Future","plans":[{"planId":"7-day","title":"7-Day Vision","duration":"7 days","description":"Build a week of future-forward dua and intentional planning with meaningful steps.","highlights":["Anchor a morning vision: what future God-pleasing step can you take today?","Thread a vision board detail into a short dua for guidance.","Share a commitment track note with someone who keeps you aligned.","Journal how mentorship touchpoints shaped a decision this week.","End the week by thanking Allah for steady progress and charting the next focus."]},{"planId":"14-day","title":"14-Day Futures","duration":"14 days","description":"Let two weeks of future planning include measurable goals, dua, and reflective checkpoints.","highlights":["Alternate days between plotting actionable goals and writing gratitude for unfolding blessings.","Let your vision board influence a nightly dua of trust.","Invite a mentor into a check-in about your commitment track.","Pause on day 12 to review what shifted after mentorship feedback.","Record a recap of how future planning made you feel grounded."]},{"planId":"30-day","title":"30-Day Roadmap","duration":"30 days","description":"Let thirty days of future planning create a sustainable roadmap filled with prayer and purpose.","highlights":["Week 1: Draft a simple plan with quarterly milestones and dua markers.","Weeks 2-3: Layer accountability meetings, journaling what mentors helped you see.","Week 4: Capture how long-term dua shaped one real choice.","Treat every Sunday as a future reflection walk, noting how planning eased anxiety.","Close the month with a heartfelt dua for clarity, resilience, and right timing."]}]},{"chapterId":8,"chapterTitle":"Paradise & Hell","plans":[{"planId":"7-day","title":"7-Day Balance","duration":"7 days","description":"Use seven days to let paradise dreams and hellfire warnings sharpen your gratitude.","highlights":["Begin the week listing deeds that point toward paradise dreams.","Thread hellfire warnings into a short dua that keeps you honest about choices.","Share intentional fasting prep tips with someone before sunset.","Journal how restraint aligned with hope for paradise.","Close the week by naming legacy prayers you want to leave for others."]},{"planId":"14-day","title":"14-Day Contrast","duration":"14 days","description":"Over two weeks, hold paradise dreams close while staying aware of hellfire reminders.","highlights":["Alternate reflecting on blessings with reminders about accountability.","Let hellfire warnings nudge more deliberate dua before each meal.","Invite a friend into intentional fasting prep conversations.","Pause on day 13 to reflect on how legacy prayers shaped your choices.","Record a voice note celebrating the small wins that edged you toward paradise."]},{"planId":"30-day","title":"30-Day Horizon","duration":"30 days","description":"Let thirty days of Paradise & Hell keep your heart balanced between hope and awe.","highlights":["Week 1: Outline a daily dua that circles paradise dreams and steady habits.","Weeks 2-3: Layer hellfire reminders and honesty checks into evening reflections.","Week 4: Capture a story about intentional fasting prep and spiritual clarity.","Resolve a weekly kindness challenge that offers hope to someone who needs it.","Treat a quiet walk as time to honor legacy prayers and note how they shifted your pace."]}]},{"chapterId":9,"chapterTitle":"Dua & Dhikr","plans":[{"planId":"7-day","title":"7-Day Remembrance","duration":"7 days","description":"Lean into Dua & Dhikr for a week of heartfelt whispers and gratitude lists.","highlights":["Start each dawn with five minutes of dhikr centered on gratitude.","Compile a list of blessed supplications you can replay before major decisions.","Share one dua with a loved one, explaining why it moves you.","Spend a lunchtime reflecting on which dhikr gave you calm this week.","End the week by writing a brief thank-you note that mirrors your favorite dua."]},{"planId":"14-day","title":"14-Day Flow","duration":"14 days","description":"Stretch Dua & Dhikr over two weeks, mixing quiet recitation with joyful reminders.","highlights":["Alternate days between exploring new dhikr phrases and journaling how they feel.","Let evening gratitude lists include at least one supplication you memorized.","Invite a friend into a quick audio chat about which duas uplift you most.","Pause on day 10 to breathe through a dhikr loop focused on Divine mercy.","Record a voice note that vocalizes your favorite dua and replay it on tougher days."]},{"planId":"30-day","title":"30-Day Remembrance","duration":"30 days","description":"Build a thirty-day Dua & Dhikr habit so remembrance becomes second nature.","highlights":["Week 1: Craft a dua journal and leave daily ink footprints of how each supplication lands.","Weeks 2-3: Layer short dhikr loops during breaks  SubhanAllah, Alhamdulillah, Allahu Akbar.","Week 3: Share a story about a dua answered or a dhikr that calmed you.","Week 4: Treat one evening to a gratitude list that weaves in your most repeated supplications.","Wrap the month with a simple dua asking Allah to keep your tongue soft in remembrance."]}]},{"chapterId":10,"chapterTitle":"The Heart","plans":[{"planId":"7-day","title":"7-Day Heart Cleanse","duration":"7 days","description":"Focus this week on purifying the heart with intentional pauses and honesty.","highlights":["Begin each day with a silent inventory: what emotion needs releasing?","Carry a small intention card reminding you to let go of grudges before noon.","Invite someone into a conversation about intentional purification and listen more than speak.","Use your evening reflection to ask: did my heart align with my actions today?","Close the week with a dua that seeks sincerity and gentle accountability."]},{"planId":"14-day","title":"14-Day Gentle Reset","duration":"14 days","description":"Build two weeks of heart hygiene where grateful pauses replace autopilot moods.","highlights":["Alternate between journaling about mercy and writing one kindness you can extend tomorrow.","Let intentional purification remind you to release one resentment each week.","Invite a mentor into a check-in about your emotional tempo mid-plan.","Pause on day 10 to record how nightly reflections reshaped your narrative.","Schedule a short walk where you repeat a gentle mantra centered on healing."]},{"planId":"30-day","title":"30-Day Purification","duration":"30 days","description":"Turn thirty days into a purification journey that keeps your heart soft and responsive.","highlights":["Week 1: Establish morning gratitude, midday silence, evening honesty with self.","Weeks 2-3: Layer routines that replace resentment with service-oriented actions.","Week 4: Capture a story about intentional purification during a quiet sit-down.","Treat Sunday walks as time to pray for clarity, jotting two insights afterward.","End the month asking Allah to guard your heart from what distracts and dulls it."]}]},{"chapterId":11,"chapterTitle":"The Hereafter","plans":[{"planId":"7-day","title":"7-Day Eternity","duration":"7 days","description":"Warm up to the Hereafter lens with brief rituals that keep eternity in view.","highlights":["Dedicate morning silence to imagining the Hereafter as a steady horizon.","Thread grave reminders into an evening dua, asking for preparedness.","Share a soulful pause with someone about afterlife hope notes.","Reflect on how small kind deeds today tie into your legacy log.","End the week by listing three hopes you have for the Hereafter and naming steps toward them."]},{"planId":"14-day","title":"14-Day Silence","duration":"14 days","description":"Lift your heart over two weeks with reminders of the soul’s long path beyond this life.","highlights":["Alternate between reading about the Hereafter and writing how it reframes priorities.","Use grave reminders to slow your pace before big decisions.","Invite someone to discuss soulful pauses and gratitude.","Pause on day 11 to record how kind deeds log keeps you humble.","Record a dua focused on steady hope."]},{"planId":"30-day","title":"30-Day Hereafter","duration":"30 days","description":"Let thirty days of The Hereafter deepen your hope, remembrance, and purposeful living.","highlights":["Week 1: Begin each day with a reminder of Allah’s mercy for the next life.","Weeks 2-3: Layer reflective journaling on soulful pauses and gratitude.","Week 4: Capture a story about a moment the Hereafter lens calmed your panic.","Make weekly walks times to ponder kind deeds log and ripple effects.","Close the month with a dua asking Allah to ease the transition between this life and the next."]}]},{"chapterId":12,"chapterTitle":"The Manners","plans":[{"planId":"7-day","title":"7-Day Etiquette","duration":"7 days","description":"Spend a week polishing Islamic etiquette through humble gestures and kind speech.","highlights":["Set a daily goal to start a conversation with a gentle greeting.","Carry kindness cards reminding you to share food or gratitude with someone new.","During a midday break, practice active listening without interrupting.","Capture how family respect shaped a decision at dinner tonight.","End the week by sharing a sincere compliment rooted in Islamic adab."]},{"planId":"14-day","title":"14-Day Etiquette","duration":"14 days","description":"Double the good manners by reflecting on etiquette, generosity, and grace for two weeks.","highlights":["Alternate between reading an etiquette story and practicing that gesture.","Let gentle greetings thread through your messages and quick calls throughout the day.","Invite someone to recount a time hospitality softened a hard moment.","Pause on day 11 to note how family respect and humility amplified your patience.","Record a short voice clip documenting when grace ruled a tense encounter."]},{"planId":"30-day","title":"30-Day Decorum","duration":"30 days","description":"Let Islamic etiquette shape a thirty-day demeanor upgrade  patient, generous, respectful.","highlights":["Week 1: Draft a reminder to balance honesty with kindness in every interaction.","Weeks 2-3: Layer hospitality acts, like offering tea or a listening ear, into weekend routines.","Week 3 check-in: notice how polite speech steadied a tense encounter.","Share a story about sharing food restoring warmth between neighbors.","Close the month thanking Allah for the manners that keep hearts connected."]}]},{"chapterId":13,"chapterTitle":"The Lifestyle","plans":[{"planId":"7-day","title":"7-Day Choices","duration":"7 days","description":"Use this week to test halal habits around eating, earning, and peaceful boundaries.","highlights":["Plan a halal-heavy meal and savor the ethical choices behind each bite.","Thread intentional consumption reminders into a short dua before shopping.","Share a note about ethical investing with someone curious about fasting finances.","Journal how gratitude for food kept waste low during a busy day.","Celebrate one conscious purchase that aligned with your values."]},{"planId":"14-day","title":"14-Day Rhythm","duration":"14 days","description":"Frame two weeks around mindful spending, eating, and restful pauses.","highlights":["Alternate days between planning purposeful meals and reflecting on ethical choices.","Let intentional consumption guide a conversation about gratitude with your household.","Invite a loved one to review your financial boundaries and celebrate responsible steps.","Pause on day 12 to note how halal choices grounded you when temptation surfaced.","Record a voice note summarizing new rhythms you want to keep."]},{"planId":"30-day","title":"30-Day Integrity","duration":"30 days","description":"Let thirty days of The Lifestyle shape a narrative of halal confidence and gratitude.","highlights":["Week 1: Create a boundary chart for sleep, food, and spending.","Weeks 2-3: Layer grateful dhikr with each meal, thanking Allah for halal options.","Week 4: Capture a story about intentional consumption that shifted your pace before Ramadan.","Steer one weekend toward community sharing, like donating time or food.","Wrap the month with a dua asking Allah to keep your lifestyle purposeful."]}]},{"chapterId":14,"chapterTitle":"Family & Marriage","plans":[{"planId":"7-day","title":"7-Day Circle","duration":"7 days","description":"Focus a week on deepening family conversations and honoring marriage goals with gentle actions.","highlights":["Schedule a fifteen-minute intentional chat with a family member about daily hopes.","Thread household rituals into your dua, asking Allah to bless the connections.","Share one idea for marriage goals or parenting pauses during dinner.","Journal how community service during the week strengthened your family bond.","Celebrate listening fully with a small handwritten note or sweet act."]},{"planId":"14-day","title":"14-Day Family","duration":"14 days","description":"Make family conversations steady, respectful, and future-focused.","highlights":["Alternate days between checking in with parents and planning a marriage goal.","Let household rituals  shared meals, morning du’a  be intentional connectors.","Invite someone to co-create a parenting pause idea (tech-free hour, guided dua).","Pause on day 11 to note how community service seeded gratitude in your home.","Record how listening more opened warm doors."]},{"planId":"30-day","title":"30-Day Home","duration":"30 days","description":"Let thirty days of Family & Marriage bring purposeful space, grounded rituals, and patience.","highlights":["Week 1: Build a simple routine of daily gratitude with your household.","Weeks 2-3: Layer family service  prepping a meal or volunteering.","Week 4: Capture a story about marriage goals you are pursuing together.","Use walks to discuss long-term dreams and recount kind deeds.","Close the month with a dua asking Allah to bless your home and soften your hearts."]}]},{"chapterId":15,"chapterTitle":"The Community","plans":[{"planId":"7-day","title":"7-Day Ummah","duration":"7 days","description":"Use this week to uplift your Ummah with small but steady actions.","highlights":["Offer a neighbor a warm greeting and a small act of kindness each day.","Thread neighborly kindness into a short dua for those in need.","Share a story about a sadaqah plan and invite someone to participate.","Journal how community stories shaped your gratitude tonight.","Plan a volunteer promise  drop off food, call an elder, or send a message."]},{"planId":"14-day","title":"14-Day Support","duration":"14 days","description":"Half a month devoted to Ummah support, good company, and shared care.","highlights":["Alternate between reading uplifting community stories and offering your time.","Let neighborly kindness be the theme of one evening dua.","Invite someone to check in about ongoing sadaqah plans.","Pause on day 13 to log how community story-sharing uplifted you.","Record how you stepped into a volunteer promise."]},{"planId":"30-day","title":"30-Day Ummah","duration":"30 days","description":"Let thirty days of The Community thread kindness, sadaqah, and hospitality into your calendar.","highlights":["Week 1: Map a micro-volunteer plan that fits your schedule.","Weeks 2-3: Layer neighborhood check-ins and small prayer gatherings.","Week 3 reflection: note how small acts of kindness created ripples.","Share a story about a sadaqah plan and how it felt.","Round out the month with a dua for unity, peace, and strong support."]}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterResources.json":
/*!*************************************************************!*\
  !*** ./resources/components/vue/data/chapterResources.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation (Islam & Tawheed)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Āl ʿImrān 3:19 - The true religion with Allah is Islam.","Muḥammad 47:19 - Know there is no deity but Allah; seek forgiveness for yourself and believers.","Az-Zumar 39:62 - Allah is the Creator of all things and Disposer of affairs.","Ash-Shūrā 42:11 - Nothing is like Him; He is the All-Hearing, All-Seeing.","An-Nisāʾ 4:36 - Worship Allah alone and show excellence to parents, relatives, orphans, and the needy.","Adh-Dhāriyāt 51:56 - Jinn and mankind were created only to worship Allah.","Al-Aʿrāf 7:180 - To Allah belong the best names; call upon Him by them."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 3435, 50, 1 - These hadiths emphasize sincerity, faith, and affirming Tawheed.","Ṣaḥīḥ Muslim: 26, 8a, 16 - These hadiths define Islam, iman, and the foundations of belief.","Sunan Abī Dāwūd: 1522 - This hadith teaches asking Allah for guidance and steadfastness.","Jāmiʿ at-Tirmidhī: 3522 - This hadith encourages supplication for sound faith and certainty."]}]},{"title":"Classical Texts","items":[{"entries":["Tafsīr Ibn Kathīr (Vol. 2, p. 32)","Kitāb at-Tawḥīd - Muhammad ibn ʿAbd al-Wahhāb","Al-ʿAqīdah al-Ṭaḥāwiyyah (with commentary)","Al-ʿAqīdah al-Wāsiṭiyyah - Ibn Taymiyyah","Kashf al-Shubuhāt - Muhammad ibn ʿAbd al-Wahhāb","Al-Qawāʿid al-Arbaʿ - Muhammad ibn ʿAbd al-Wahhāb","Sharḥ Uṣūl al-Īmān - Ibn ʿUthaymīn","Majmūʿ al-Fatāwā - Ibn Taymiyyah (Vol. 1, p. 98)","Madārij al-Sālikīn - Ibn al-Qayyim","ʿUddat al-Ṣābirīn - Ibn al-Qayyim","Iḥyāʾ ʿUlūm al-Dīn - Al-Ghazālī","Ṭarīq al-Hijratayn - Ibn al-Qayyim"]}]},{"title":"Modern Resources","items":[{"label":"Apps","entries":["99 Names of Allāh"]},{"label":"Courses","entries":["SeekersGuidance - Introduction to Islamic Belief"]},{"label":"Books","entries":["Al-Uṣūl al-Thalāthah (with commentary)"]}]}]},{"chapterId":2,"title":"The Beliefs (Six Articles of Faith)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Al-Baqarah 2:285 - The Messenger and believers affirm Allah, His angels, books, and messengers.","Āl ʿImrān 3:2 - Allah, there is no deity except Him, the Ever-Living, Sustainer.","An-Naḥl 16:36 - Every nation received a messenger: worship Allah and avoid false gods.","Al-Māʾidah 5:48 - The Qur\'an confirms previous scripture and is a criterion; judge by what Allah revealed.","Al-Anʿām 6:92 - This blessed Book confirms earlier revelation; believers in the Hereafter keep prayer.","Al-Qamar 54:49 - Allah created all things with divine decree.","Al-Anʿām 6:164 - No soul bears the burden of another.","Al-Anʿām 6:88 - Shirk would nullify the deeds of the prophets."]},{"label":"Hadith","entries":["Ṣaḥīḥ Muslim: 8a, 155, 2647 - These hadiths outline the pillars of iman, the return of Isa, and divine decree.","Ṣaḥīḥ al-Bukhārī: 50, 6365, 6774 - These hadiths reinforce core belief, reliance on Allah, and accountability.","Jāmiʿ at-Tirmidhī: 3522 - This hadith encourages asking Allah for guidance and firmness in faith."]}]},{"title":"Classical Texts","items":[{"entries":["Al-ʿAqīdah al-Ṭaḥāwiyyah (Articles 7-8)","Sharḥ al-ʿAqīdah al-Ṭaḥāwiyyah - Ibn Abī al-ʿIzz al-Ḥanafī","Lumʿat al-Iʿtiqād - Ibn Qudāmah al-Maqdisī","Kitāb al-Īmān - Ibn Taymiyyah","Badʾ al-Khalq (Chapter in Ṣaḥīḥ al-Bukhārī)","Kitāb al-Jannah wa al-Nār (Book in Ṣaḥīḥ al-Bukhārī)","Sharḥ Uṣūl al-Īmān - Ibn ʿUthaymīn","Al-Farq bayn al-Īmān wal-Islām - Various scholars"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["Sharḥ Uṣūl al-Īmān - Ibn Bāz (p. 45)"]},{"label":"Courses","entries":["Islamic Online University - Creed course"]},{"label":"Platforms","entries":["Understand Quran Academy"]}]}]},{"chapterId":3,"title":"The Pillars of Islam","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Shahādah: Āl ʿImrān 3:18, Muḥammad 47:19 - The testimony affirms Allah\'s oneness and calls to know Him. ","Ṣalāh: Al-Baqarah 2:43, Al-ʿAnkabūt 29:45, An-Nisāʾ 4:103, Al-Isrāʾ 17:78 - Prayer establishes remembrance and steady devotion.   ","Zakāh: Al-Baqarah 2:110, At-Tawbah 9:60, At-Tawbah 9:103 - Zakah purifies wealth and supports those entitled to it.  ","Ṣawm: Al-Baqarah 2:183-185 - Fasting is prescribed to cultivate taqwa.","Hajj: Āl ʿImrān 3:97, Al-Ḥajj 22:27-28 - Pilgrimage is a duty for those able and full of remembrance. "]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 8, 1, 3370, 3435, 5032, 6345 - These hadiths outline the pillars of Islam and core acts of worship.","Ṣaḥīḥ Muslim: 16, 82, 804, 746, 483, 588, 592 - These hadiths describe prayer, Qur\'an recitation, and worship discipline.","Sunan Abī Dāwūd: 5081, 5088 - These hadiths teach daily adhkar that support worship.","Sunan Ibn Mājah: 251 - This hadith highlights foundational obligations of Islam.","Sunan at-Tirmidhī: 2926 - This hadith highlights the virtues of Qur\'an recitation."]}]},{"title":"Classical Texts","items":[{"entries":["Al-Umm - Imām al-Shāfiʿī","Al-Mughnī - Ibn Qudāmah","Iḥyāʾ ʿUlūm al-Dīn - Al-Ghazālī","Fatḥ al-Bārī - Ibn Ḥajar al-ʿAsqalānī (Commentary on Bukhārī)","ʿUmdat al-Aḥkām - ʿAbd al-Ghanī al-Maqdisī","Bulūgh al-Marām - Ibn Ḥajar al-ʿAsqalānī","Al-Majmūʿ - Imām al-Nawawī","Al-Fiqh al-Islāmī wa Adillatuh - Dr. Wahbah al-Zuḥaylī"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["The Five Pillars of Islam - Musharraf Hussain","Islam: Beliefs and Teachings - Ghulam Sarwar","Fiqh as-Sunnah - Sayyid Sābiq"]},{"label":"Fatwa Portals","entries":["IslamQA.info","Dar al-Ifta al-Misriyyah"]},{"label":"Apps","entries":["Prayer Times","Zakah Calculator","Dhikr & Du\'ā"]},{"label":"Tools","entries":["Noorani Qaida (Tajwīd)","Ḥiṣn al-Muslim app"]}]}]},{"chapterId":4,"title":"The Qur\'an (Divine Revelation)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Al-Wāqiʿah 56:80 - A revelation from the Lord of the worlds.","Al-Furqān 25:32 - The Qur\'an was sent down in stages to strengthen the heart.","Al-Ḥijr 15:9 - Allah revealed the Reminder and will preserve it.","Al-Baqarah 2:23 - A challenge to produce a surah like the Qur\'an.","Al-Baqarah 2:2 - The Book with no doubt, guidance for the God-conscious.","Al-Isrāʾ 17:82 - The Qur\'an is healing and mercy for believers.","Al-Baqarah 2:285-286 - Closing verses affirm faith and that Allah does not burden beyond capacity.","Ṣād 38:29 - A blessed Book for reflection and taking heed.","Al-Aʿrāf 7:204 - Listen attentively when the Qur\'an is recited to receive mercy.","An-Naḥl 16:98 - Seek refuge with Allah before reciting the Qur\'an.","Al-Muzzammil 73:4 - Recite the Qur\'an with measured recitation."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 4953, 5032, 6347, 6774, 4440 - These hadiths describe revelation, Qur\'an learning, and its centrality.","Ṣaḥīḥ Muslim: 746, 804, 483, 588 - These hadiths emphasize prayer, Qur\'an recitation, and remembrance.","Sunan Abī Dāwūd: 1468, 4855 - These hadiths instruct on Qur\'an etiquette and recitation.","Sunan Ibn Mājah: 251 - This hadith highlights the importance of learning the Qur\'an.","Jāmiʿ at-Tirmidhī: 2910, 2926 - These hadiths describe the rewards of reciting the Qur\'an.","Musnad Aḥmad: 11133 - This hadith encourages devotion to the Qur\'an."]}]},{"title":"Classical Texts","items":[{"entries":["Al-Itqān fī ʿUlūm al-Qurʾān - Jalāl al-Dīn al-Suyūṭī","Iʿjāz al-Qurʾān - Abū Bakr al-Bāqillānī","At-Tibyān fī Ādāb Ḥamalat al-Qurʾān - Imām al-Nawawī","Muqaddimah al-Jazariyyah (Tajwīd)","Tafsīr al-Ṭabarī - Muḥammad ibn Jarīr al-Ṭabarī","Tafsīr al-Qurʾān al-ʿAẓīm (Tafsīr Ibn Kathīr)","Tafsīr al-Saʿdī - ʿAbd al-Raḥmān al-Saʿdī","Al-Burhān fī ʿUlūm al-Qurʾān - Badr al-Dīn al-Zarkashī"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["An Introduction to the Sciences of the Qur\'an - Al-ʿAṣr Publications","The History of the Qur\'anic Text - Dr. Muṣṭafā al-Aʿẓamī","A Summary of the Qur\'an - Towards Eternity"]},{"label":"Apps","entries":["Quran Companion","Tajweed Quran","Memorize Quran"]},{"label":"Recitation Platforms","entries":["Quranic Audio","Islamweb.net recitations"]}]}]},{"chapterId":5,"title":"The Prophet (Life of Muhammad ﷺ)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Al-Aḥzāb 33:21 - The Messenger is an excellent example to follow.","Al-Aḥzāb 33:40 - Muhammad is the Messenger of Allah and the seal of the prophets.","Al-Ḥijr 15:94 - Proclaim what you are commanded and turn away from the polytheists.","An-Naḥl 16:110 - After trials and emigration, Allah is forgiving and merciful to those who strive.","Al-Ḥajj 22:39 - Permission to fight is granted to those who were wronged.","Al-Māʾidah 5:3 - Religion perfected and Islam chosen for you.","Al-Anbiyāʾ 21:107 - Muhammad was sent as mercy to the worlds.","Al-Aḥzāb 33:56 - Allah and His angels send blessings on the Prophet; believers should do so."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 4953, 614, 15, 689, 4440, 3370, 6774, 831 - These hadiths portray the Prophet\'s character, worship, and leadership.","Ṣaḥīḥ Muslim: 746, 476, 482, 487, 402, 770, 2732 - These hadiths capture the Prophet\'s mercy, devotion, and conduct.","Sunan Abī Dāwūd: 775, 1425, 1501 - These hadiths describe prophetic prayer and supplication.","Sunan Ibn Mājah: 897 - This hadith highlights love and reverence for the Prophet.","Jāmiʿ at-Tirmidhī: 3477 - This hadith emphasizes trusting the Prophet\'s guidance.","Musnad Aḥmad: 13964 - This hadith highlights the Prophet\'s noble character."]}]},{"title":"Classical Texts","items":[{"entries":["Sīrat Ibn Hishām (abridgement of Ibn Isḥāq\'s Sīrah)","Al-Bidāyah wa al-Nihāyah - Ibn Kathīr (Seerah sections)","Al-Sīrah al-Nabawiyyah - Ibn Kathīr","Shamāʾil al-Muḥammadiyyah - Imām al-Tirmidhī","Zād al-Maʿād - Ibn al-Qayyim (Prophet\'s guidance)","Dalāʾil al-Nubuwwah - Al-Bayhaqī","Al-Rawḍ al-Anf - Al-Suhaylī"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["The Sealed Nectar (Ar-Raḥīq al-Makhtūm) - Ṣafī al-Raḥmān al-Mubārakpūrī","Muhammad: His Life Based on the Earliest Sources - Martin Lings","When the Moon Split - Ṣafī al-Raḥmān al-Mubārakpūrī","The Noble Life of the Prophet - Dr. ʿAlī Muḥammad al-Ṣallābī","Madinan Society at the Time of the Prophet - Dr. Akram Ḍiyāʾ al-ʿUmarī"]},{"label":"Documentaries","entries":["The Life of Muhammad ﷺ (BBC)","Muhammad: The Last Prophet (animated)"]}]}]},{"chapterId":6,"title":"The Prayer (Salah)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Quran 4:103 - Prayer is prescribed at fixed times for believers.","Quran 29:45 - Prayer restrains immorality, and remembrance of Allah is greatest.","Quran 23:1-2 - Successful believers are humble and focused in prayer.","Quran 2:238 - Guard the prayers, especially the middle prayer.","Quran 20:14 - Establish prayer for the remembrance of Allah.","Quran 17:78-79 - Establish prayer from sun decline to night and the dawn recitation, and pray at night.","Quran 11:114 - Establish prayer at the day\'s ends; good deeds remove misdeeds."]},{"label":"Hadith","entries":["Sahih al-Bukhari: 405, 349, 619, 5096, 7571, 528, 5787 - Narrations on prayer practice, virtues, and the cleansing effect of salah.","Sahih Muslim: 82, 395, 482, 684, 592, 487, 251 - Narrations on recitation in prayer, supplication in prostration, making up missed prayers, and post-prayer dhikr.","Sunan Abi Dawud: 775, 567, 860 - Narrations on opening supplications, mosque attendance, and prayer etiquette.","Sunan at-Tirmidhi: 213, 2416 - Narrations on the weight of prayer in accountability and its virtues.","Sahih al-Jami: 2573, 3874 - Narrations emphasizing that prayer is the first deed judged and a core measure of faith."]}]},{"title":"Classical Texts","items":[{"entries":["Sifah Salat an-Nabi - Al-Albani (The Prophet\'s Prayer Described)","Al-Mughni - Ibn Qudamah (Detailed fiqh of prayer)","Fath al-Bari - Ibn Hajar (Commentary on Bukhari\'s Book of Prayer)","Al-Adhkar - An-Nawawi (Supplications in prayer)","Al-Khushu fi as-Salah - Ibn Rajab al-Hanbali","Ihya Ulum ad-Din - Al-Ghazali (Book on prayer\'s inner dimensions)","Al-Umdah fi al-Fiqh - Ibn Qudamah (Prayer section)"]}]},{"title":"Modern Instructional Works","items":[{"entries":["A Guide to Salah - Muhammad Taqi al-Din al-Hilali","The Prayer of the Prophet - Dr. Salih al-Fawzan","Khushu in Salah - Dr. al-Qari","Fortress of the Muslim - Sa\'id al-Qahtani (Prayer section)"]}]},{"title":"Websites for Verification","items":[{"entries":["IslamQA (search: prayer rulings, khushu, congregation, missed prayers)","SeekersGuidance (courses: Fiqh of Prayer, Spiritual Dimensions of Worship)","Sunnah.com (Sahih al-Bukhari - Book of Prayer)"]}]}]},{"chapterId":7,"title":"Dua & Dhikr","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Al-Baqarah 2:152 - Remember Me; I will remember you; be grateful.","Ghāfir 40:60 - Call upon Me; I will respond; arrogance in worship is condemned.","Ar-Raʿd 13:28 - Hearts find peace in the remembrance of Allah.","Al-Baqarah 2:201 - Our Lord, grant good in this world and the Hereafter."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 6407, 6340, 3995, 3370, 6110, 6389 - These hadiths encourage constant dhikr and heartfelt dua.","Ṣaḥīḥ Muslim: 483, 592, 1015, 2732, 476, 482, 487 - These hadiths guide remembrance, repentance, and reliance on Allah.","Sunan Abī Dāwūd: 5081, 5088, 4855, 1501 - These hadiths cover morning and evening adhkar.","Sunan Ibn Mājah: 3871, 897 - These hadiths encourage frequent supplication and remembrance.","Jāmiʿ at-Tirmidhī: 3372, 3477, 3383 - These hadiths describe the virtue and power of dua.","Musnad Aḥmad: 11133 - This hadith encourages remembrance and gratitude to Allah."]}]},{"title":"Classical Texts","items":[{"entries":["Al-Adhkār - Imām al-Nawawī","Al-Kalim al-Ṭayyib - Ibn Taymiyyah","Al-Duʿāʾ - Imām al-Ṭabarānī","Al-Duʿāʾ wa Atharuhu fī Dafʿ al-Balāʾ - Ibn Rajab al-Ḥanbalī","Fatḥ al-Bārī - Ibn Ḥajar (Commentary on Duʿāʾ chapters)","ʿUddat al-Ṣābirīn wa Dhakhīrat al-Shākirīn - Ibn al-Qayyim"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["Fortress of the Muslim (Ḥiṣn al-Muslim) - Dr. Saʿīd al-Qaḥṭānī","The Value of Time - Shaykh ʿAbd al-Fattāḥ Abū Ghuddah","Sifat Ṣalāt al-Nabī - Shaykh al-Albānī (prayer duʿāʾs)"]},{"label":"Apps","entries":["Hisn al-Muslim (Fortress of the Muslim app)","Daily Duas","Dhikr & Dua"]}]}]},{"chapterId":8,"title":"The Heart (Purification & Spiritual Diseases)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Ash-Shuʿarāʾ 26:88-89 - Only a sound heart will benefit on the Day of Judgment.","Al-Baqarah 2:10 - Hearts can be diseased by hypocrisy and sin.","Ash-Shams 91:9-10 - Success is for the one who purifies the soul.","Al-Baqarah 2:74 - Hearts can harden like stones when heedless.","Al-Ḥujurāt 49:12 - Avoid suspicion, spying, and backbiting.","At-Takāthur 102:1-2 - Rivalry for worldly increase distracts until the grave.","Al-Humazah 104:1-3 - Woe to the slanderer who hoards and counts wealth."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 10, 5590, 6110, 6407 - These hadiths warn against heart diseases and stress sincerity.","Ṣaḥīḥ Muslim: 91, 2564, 2708, 2722 - These hadiths emphasize humility, inner reform, and guarding the heart.","Sunan Abī Dāwūd: 4903 - This hadith warns against harmful speech and character.","Sunan at-Tirmidhī: 3591 - This hadith seeks refuge from corrupt character and desires.","Sunan Ibn Mājah: 3989 - This hadith warns about diseases of the heart.","Shuʿab al-Īmān: 1596 - This report encourages softening the heart through remembrance.","Al-Muʿjam al-Awsaṭ: 6066 - This report urges purification of the heart and intentions."]}]},{"title":"Classical Texts","items":[{"entries":["Iḥyāʾ ʿUlūm ad-Dīn – Al-Ghazālī (Books 3 & 4 on Heart Diseases)","Madārij as-Sālikīn – Ibn al-Qayyim (3 volumes on spiritual stations)","ʿUddat aṣ-Ṣābirīn wa Dhakhīrat ash-Shākirīn – Ibn al-Qayyim","Al-Fawāʾid – Ibn al-Qayyim","Al-Wābil aṣ-Ṣayyib – Ibn al-Qayyim","Kitāb al-Kabāʾir – Adh-Dhahabī","Al-Zuhd – Imām Aḥmad ibn Ḥanbal","Ḥilyat al-Awliyāʾ – Abū Nuʿaym al-Aṣbahānī (Biographies of the Pious)","Kashf al-Khafāʾ – Al-ʿAjlūnī"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["Purification of the Heart – Hamza Yusuf (Translation and commentary of Imam al-Mawlud\'s poem)","Don\'t Be Sad – ʿĀʾid al-Qarnī","Reclaim Your Heart – Yasmin Mogahed"]},{"label":"Scholars to Study","entries":["Sh. ʿAbd al-Razzāq al-Badr (Lectures on Heart Softening)","Sh. Muḥammad al-Munajjid (Articles on Spiritual Diseases)","Sh. Omar Suleiman (Series on Heart Matters)"]}]}]},{"chapterId":9,"title":"The Manners (Adab)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Luqmān 31:19 - Be modest in walking and lower the voice.","Al-Isrāʾ 17:23 - Worship Allah alone and honor parents.","An-Nūr 24:27-28 - Ask permission and greet before entering homes.","Al-Muʾminūn 23:96 - Repel evil with what is better.","Al-Anfāl 8:46 - Obey Allah and do not dispute to keep strength.","Al-Ḥujurāt 49:11-12 - No mocking, suspicion, or backbiting among believers."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 6015, 6114, 6117, 6094, 6115, 6229 - These hadiths teach good manners, speech, and honoring others.","Ṣaḥīḥ Muslim: 54, 2162, 2593, 2624 - These hadiths emphasize greetings, kindness, and avoiding harm.","Sunan at-Tirmidhī: 1162, 1924, 1919, 3591 - These hadiths encourage gentleness, family respect, and character.","Sunan Abī Dāwūd: 5096, 4905 - These hadiths cover daily etiquette and respectful conduct.","Al-Adab al-Mufrad: 273, 112, 115 - These hadiths highlight honoring parents and social manners.","Musnad Aḥmad: 12330 - This hadith stresses good character and kindness."]}]},{"title":"Classical Texts","items":[{"entries":["Al-Adab al-Mufrad – Imām al-Bukhārī (Foundation of manners compilation)","Riyāḍ aṣ-Ṣāliḥīn – Imām al-Nawawī (Chapters on daily conduct)","Al-Ādāb ash-Sharʿiyyah – Ibn Mufliḥ al-Ḥanbalī (3 volumes on Islamic etiquette)","Al-Kāfī fī Fiqh Ahl al-Madīnah – Ibn ʿAbd al-Barr (Includes manners sections)","ʿUddat aṣ-Ṣābirīn wa Dhakhīrat ash-Shākirīn – Ibn al-Qayyim","Iḥyāʾ ʿUlūm ad-Dīn – Al-Ghazālī (Book 2: Etiquettes of Daily Life)","Al-Adhkār – Imām al-Nawawī (Manners of remembrance)"]}]},{"title":"Specialized Books","items":[{"entries":["Birr al-Wālidayn – Ibn al-Jawzī (Honoring Parents)","Ḥijāb al-Mar\'ah al-Muslimah – Al-Albānī (Women\'s Dress)","Al-Bayʿ wal-Shirāʾ – Ibn ʿUthaymīn (Business Ethics)","Al-Kabā\'ir – Adh-Dhahabī (Major Sins to Avoid)","Mukhtaṣar Minhāj al-Qāṣidīn – Ibn Qudāmah (Abridged Path of Seekers)"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["Islamic Manners – ʿAbd al-Fattāḥ Abū Ghuddah","The Ideal Muslim – Dr. Muhammad Ali al-Hashimi","Don\'t Be Sad – ʿĀʾid al-Qarnī (Includes social conduct)"]},{"label":"Scholars\' Lectures","entries":["Sh. ʿAbd al-Razzāq al-Badr (Series on Riyāḍ aṣ-Ṣāliḥīn)","Sh. Muhammad al-Munajjid (Articles on daily adab)","Sh. Omar Suleiman (Friday sermons on character)"]}]}]},{"chapterId":10,"title":"The Lifestyle (Halal Living)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Al-Baqarah 2:168 - Eat lawful and good; do not follow Satan.","An-Naḥl 16:116 - Do not falsely declare what is halal or haram.","Al-Anʿām 6:119 - Eat what Allah\'s name is mentioned over and avoid the forbidden.","Al-Baqarah 2:173 - Forbidden foods are listed with exceptions for necessity.","Al-Māʾidah 5:3 - Prohibited foods and completion of the religion.","Al-Baqarah 2:275-279 - Riba is forbidden and must be abandoned.","Al-Māʾidah 5:90-91 - Intoxicants and gambling are abominations to avoid.","Al-Anʿām 6:118 - Eat of what Allah\'s name is mentioned over."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 2051, 6367, 2083, 5496 - These hadiths address lawful earnings, trade ethics, and food.","Ṣaḥīḥ Muslim: 1015, 1513, 1581 - These hadiths discuss charity, transactions, and moderation.","Sunan Abī Dāwūd: 3674, 3767 - These hadiths cover food etiquette and lawful consumption.","Sunan at-Tirmidhī: 2518, 1205 - These hadiths encourage lawful conduct and moderation.","Sunan Ibn Mājah: 3367, 3833 - These hadiths discuss lawful provision and food."]}]},{"title":"Classical Texts","items":[{"entries":["Al-Ḥalāl wal-Ḥarām fil-Islām – Dr. Yūsuf al-Qaraḍāwī (Modern classic)","Al-Mughnī – Ibn Qudāmah (Detailed fiqh rulings)","Al-Kabāʾir – Adh-Dhahabī (Major sins including consumption)","Iʿlām al-Muwaqqiʿīn – Ibn al-Qayyim (Principles of jurisprudence)","Al-Ashbāh wan-Naẓāʾir – As-Suyūṭī (Legal maxims)","Al-Qawāʿid al-Fiqhiyyah – As-Saʿdī (Fiqh principles)","Qawāʿid al-Aḥkām – Al-ʿIzz ibn ʿAbd as-Salām (Rules of necessity)"]}]},{"title":"Specialized Books","items":[{"entries":["Fiqh al-Ṭaʿām wal-Ashribah – ʿAbdullah al-Faqīh (Food & drink rulings)","Al-Buyūʿ al-Muḥarramah fil-Islām – Ṣāliḥ al-Fawzān (Forbidden transactions)","Fatāwā al-Luʾluʾ wal-Marjān fīmā Aḥalla Allāh wa Ḥarram – Compiled rulings","Al-Muʿāmalāt al-Māliyyah al-Muʿāṣirah – Contemporary financial issues"]}]},{"title":"Modern Resources","items":[{"label":"Scholars\' Works","entries":["Sh. Ṣāliḥ al-Fawzān (Lectures on transactions)","Sh. Muḥammad al-Munajjid (Articles on modern issues)","Sh. Waleed Basyouni (Contemporary fiqh)"]},{"label":"Practical Guides","entries":["Halal & Healthy – Product guidebook","The Muslim Consumer – Magazine/publication"]}]}]},{"chapterId":11,"title":"Family & Marriage: Building a Righteous Home","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Ar-Rūm 30:21 - Marriage brings tranquility, love, and mercy.","Al-Baqarah 2:187 - Spouses are garments for one another.","An-Nisāʾ 4:34 - Responsibilities and care within marriage.","An-Nisāʾ 4:3 - Justice is required when marrying multiple wives.","An-Nisāʾ 4:35 - Arbitration is urged to reconcile spouses.","Al-Furqān 25:74 - A du\'a for righteous spouses and offspring.","Al-Anfāl 8:63 - Allah unites hearts in affection.","At-Taḥrīm 66:6 - Protect yourselves and families from the Fire."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī: 5065, 5090, 893, 6138, 2442, 5185 - These hadiths outline marriage rights, family duties, and mercy.","Ṣaḥīḥ Muslim: 779, 1468, 2629, 2658 - These hadiths emphasize kindness, responsibility, and family harmony.","Sunan at-Tirmidhī: 3895, 1162 - These hadiths encourage honoring parents and good spouses.","Sunan Abī Dāwūd: 2178, 5074, 4919 - These hadiths describe marital rights and family care.","Sunan Ibn Mājah: 1977, 1847 - These hadiths support marriage, family bonds, and good endings."]}]},{"title":"Classical Texts","items":[{"entries":["ʿUddat al-Ṣābirīn – Ibn al-Qayyim (Includes chapters on marital patience)","Al-Adab al-Mufrad – Imām al-Bukhārī (Chapters on family manners)","Riyāḍ al-Ṣāliḥīn – Imām al-Nawawī (Books on family rights)","Fatḥ al-Bārī – Ibn Ḥajar (Commentary on relevant ḥadīths)","Al-Mughnī – Ibn Qudāmah (Detailed fiqh of marriage and family)","Al-Ḥāwī al-Kabīr – Al-Māwardī (Fiqh rulings on family law)"]}]},{"title":"Specialized Books","items":[{"entries":["Ādāb al-Zawāj – ʿAbdullah al-Jibrīn","Tarbiyat al-Awlād fī al-Islām – Dr. ʿAbdullah Nāṣiḥ ʿUlwān (3 volumes)","Huqūq al-Zawjayn – Ṣāliḥ al-Fawzān","Al-Iṣlāḥ bayn al-Zawjayn – Dr. Ṣāliḥ al-Ghāmidī","Birr al-Wālidayn wa Ṣilat al-Arḥām – Ibn al-Jawzī","Aḥkām al-Ṭalāq – Ibn ʿUthaymīn","Al-Akhṭāʾ al-Shāʾiʿah fī Ṭalab al-Zawj – ʿAbd al-ʿAzīz al-Nāṣir"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["The Muslim Family – Dr. Muḥammad Al-Hashimi","Islamic Marriage – Dr. Ekram & Dr. Mohamed Rida Bashir","Before You Tie the Knot – Sh. Omar Suleiman","Reclaim Your Heart – Yasmin Mogahed (includes chapters on relationships)"]},{"label":"Scholars\' Lectures","entries":["Sh. Yāsir Qāḍī (Series on Paradise Lies at the Feet of Your Mother)","Dr. Haifā Younis (Islamic family and marriage counseling)","Sh. Abdul Nasir Jangda (Fiqh of family life)"]}]}]},{"chapterId":12,"title":"The Community (Ummah & Support)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Al-Anbiya 21:92 - Believers are one community worshiping one Lord.","Al Imran 3:103 - Hold firmly to Allah\'s rope and avoid division.","Al Imran 3:110 - The best nation enjoins good and forbids evil.","An-Nisa 4:114 - Private counsel is best for charity and reconciliation.","Al-Hujurat 49:13 - Peoples are created to know one another; honor is by taqwa.","Al-Hashr 59:10 - Pray for believers and remove rancor from hearts.","An-Nisa 4:75 - Stand up for the oppressed and vulnerable.","At-Tawbah 9:71 - Believing men and women are allies of one another.","Al-Anfal 8:46 - Obedience and unity preserve strength."]},{"label":"Hadith","entries":["Sahih al-Bukhari: 6011 - This hadith highlights mercy and helping fellow Muslims.","Sahih al-Bukhari: 13 - This hadith ties faith to loving good for others.","Sahih al-Bukhari: 450 - This hadith stresses community care and shared responsibility.","Sahih al-Bukhari: 2444 - This hadith warns against oppression and taking rights.","Sahih al-Bukhari: 6005 - This hadith encourages maintaining family and community bonds.","Sahih al-Bukhari: 6237 - This hadith promotes good manners and respect in society.","Sahih al-Bukhari: 2442 - This hadith emphasizes settling grievances and restoring rights.","Sahih Muslim: 2162 - This hadith teaches spreading salam and greetings of peace.","Sahih Muslim: 2566 - This hadith forbids harming, shaming, or abandoning believers.","Sahih Muslim: 2586 - This hadith calls to mutual support and sincerity between Muslims.","Sunan Abi Dawud: 3052 - This hadith emphasizes communal obligations and public welfare.","Sunan Abi Dawud: 4919 - This hadith urges honoring family ties and community respect.","Sunan Abi Dawud: 4892 - This hadith promotes gentle speech and ethical conduct.","Sunan at-Tirmidhi: 1927 - This hadith highlights kindness to people and relatives.","Al-Adab al-Mufrad - multiple hadiths on brotherhood and community rights"]}]},{"title":"Classical Texts","items":[{"label":"Core Works","entries":["Minhaj al-Muslim - Abu Bakr al-Jaza\'iri (Book of Brotherhood)","Riyad as-Salihin - Imam al-Nawawi (Chapters 35-39: Brotherhood, Kindness, Consultation)","Al-Adab al-Mufrad - Imam al-Bukhari","Ihya\' \'Ulum ad-Din - Al-Ghazali (Etiquettes of Companionship and Community Life)","Al-Birr wa as-Silah - Ibn al-Jawzi","Al-Amr bil-Ma\'ruf wan-Nahy \'an al-Munkar - Ibn Taymiyyah","Al-Sulh (Reconciliation) chapters in Al-Mughni (Ibn Qudamah) and Al-Umm (Al-Shafi\'i)"]}]},{"title":"Specialized Books","items":[{"label":"Focused Studies","entries":["The Constitution of Madinah - Translated studies by Dr. Muhammad Hamidullah","Al-Wala\' wal-Bara\' fil-Islam - Muhammad Saeed al-Qahtani","Fatawa al-\'Aqidah wal-Manhaj - Ibn \'Uthaymin (Includes community issues and unity)","Al-Jami\' li-Ahkam al-Qur\'an - Al-Qurtubi (Tafsir on community verses)"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["The Ideal Muslim Society - Dr. Muhammad Al-Hashimi","Building a Muslim Community - Dr. Ejaz Akram","Purification of the Heart - includes chapters on community diseases like envy and hatred"]},{"label":"Scholars\' Lecture Series","entries":["Sh. \'Abd al-Razzaq al-Badr (series on Riyad as-Salihin)","Sh. Omar Suleiman (Friday sermons and community building series)","Dr. Ingrid Mattson (community development in Western contexts)"]}]}]},{"chapterId":13,"title":"The Future (Growth & Legacy)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Ash-Shams 91:7-10 - Success comes from purifying the soul.","Al-Hadid 57:28 - Taqwa brings double mercy and guidance.","Al-Baqarah 2:222 - Allah loves those who repent and purify.","Al-Qasas 28:77 - Seek the Hereafter and do good without neglecting the world.","Al-Anfal 8:60 - Prepare strength for future challenges.","Al-Baqarah 2:197 - The best provision is taqwa.","Al-Bayyina 98:7-8 - Believers who do good are promised Gardens.","Al-Kahf 18:110 - Sincere deeds must be for Allah alone.","Az-Zumar 39:53 - Do not despair of Allah\'s mercy."]},{"label":"Hadith","entries":["Sahih al-Bukhari: 6464, 71, 5199, 6307, 6405 - These hadiths encourage consistent deeds, accountability, and preparing for the future.","Sahih Muslim: 782, 2750, 2675 - These hadiths emphasize repentance, hope, and perseverance.","Sunan at-Tirmidhi: 3522, 2378, 2307 - These hadiths encourage righteous companionship and remembrance of death.","Sunan Ibn Majah: 251, 4101 - These hadiths call to prepare for the Hereafter with good deeds.","Musnad Ahmad: 8604, 17330 - These hadiths stress steadfastness and long-term growth.","Al-Sahihah by Al-Albani: 1847 - This report highlights seeking a good ending in faith."]}]},{"title":"Classical Texts","items":[{"entries":["Madarij as-Salikin - Ibn al-Qayyim (3 volumes on spiritual stations)","Ihya\' \'Ulum ad-Din - Al-Ghazali (The Revival of Religious Sciences)","\'Uddat as-Sabirin wa Dhakhirat ash-Shakirin - Ibn al-Qayyim","Al-Tawwabun - Ibn al-Qayyim","Riyad as-Salihin - Imam al-Nawawi (Comprehensive chapters on consistent deeds)","Fath al-Bari - Ibn Hajar (Commentary on Bukhari, Book of Knowledge)","Al-Tadhkirah - Al-Qurtubi (Reminders of Death and the Afterlife)","Hadi al-Arwah - Ibn al-Qayyim (The Soul\'s Journey)"]}]},{"title":"Specialized Books","items":[{"entries":["Al-\'Ilal - Imam Ahmad (On righteous companionship)","Al-Hisbah fi al-Islam - Ibn Taymiyyah (On planning and societal accountability)","Al-Mustaqsa fi Fadl al-\'Ilm wa Ahluh - Al-Ghazali (On knowledge and its people)","Mukhtasar Minhaj al-Qasidin - Ibn Qudamah (Abridgement of the Path of Seekers)","Al-Fawa\'id - Ibn al-Qayyim (Points of Benefit for spiritual growth)"]}]},{"title":"Modern Resources","items":[{"label":"Books","entries":["Don\'t Be Sad - \'Aid al-Qarni (On optimism and growth through trials)","Reclaim Your Heart - Yasmin Mogahed (On spiritual purification in modern times)","The Productive Muslim - Mohammed Faris (On balancing worldly and spiritual productivity)","Purification of the Heart - Hamza Yusuf (Translation and commentary of Imam al-Mawlud\'s poem)"]},{"label":"Websites","entries":["IslamQA.info (Search: consistency, repentance, spiritual growth, despair)","SeekersGuidance.org (Courses: Purification of the Heart, Lives of the Saints, Path to Allah)","Yaqeen Institute (Research: Purpose, Resilience, Islamic Psychology)"]},{"label":"Scholars\' Lecture Series","entries":["Sh. \'Abd al-Razzaq al-Badr (On Riyad as-Salihin and spiritual cultivation)","Sh. Omar Suleiman (Series on The Path to Allah and Heartwork)","Dr. Akram Nadwi (On biographies of scholars and their spiritual journeys)"]}]}]},{"chapterId":14,"title":"The Hereafter (Death & Resurrection)","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Āl ʿImrān 3:185 - Every soul will taste death and be repaid in full.","Luqmān 31:34 - Only Allah knows the Hour and where each soul will die.","As-Sajdah 32:11 - The Angel of Death takes souls and returns them to their Lord.","Az-Zumar 39:68 - The trumpet will be blown, bringing death and resurrection.","Al-Anbiyāʾ 21:47 - The scales of justice will be set with no injustice.","Qāf 50:19 - The agony of death brings the truth of the end.","Al-Wāqiʿah 56:60 - Allah has decreed death among all people.","Al-Qiyāmah 75:26-30 - The soul reaches the collarbone and returns to its Lord.","Al-Infiṭār 82:1-5 - The sky splits and graves are overturned at Judgment.","Az-Zalzalah 99:1-8 - The earthquake reveals every deed, small or large."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī 3349 - This hadith describes resurrection and the gathering after death.","Ṣaḥīḥ al-Bukhārī 3244 - This hadith describes Paradise as beyond human imagination.","Ṣaḥīḥ al-Bukhārī 6573 - This hadith mentions the Sirat and the first crossing of the Ummah.","Ṣaḥīḥ al-Bukhārī 1386 - This hadith warns about punishment or blessing in the grave.","Ṣaḥīḥ al-Bukhārī 4739 - This hadith mentions the trumpet and events of the Last Day.","Ṣaḥīḥ al-Bukhārī 1374 - This hadith encourages seeking refuge from the punishment of the grave.","Ṣaḥīḥ al-Bukhārī 6368 - This hadith teaches supplication for a good ending and protection.","Ṣaḥīḥ Muslim 588 - This hadith teaches a dua seeking refuge from the grave and Hellfire.","Ṣaḥīḥ Muslim 975 - This hadith teaches greeting and supplicating for the deceased at graves.","Ṣaḥīḥ Muslim 2870 - This hadith describes the trial and questioning in the grave.","Ṣaḥīḥ Muslim 5118 - This hadith urges patience and proper conduct at death.","Ṣaḥīḥ Muslim 5215 - This hadith warns against lamentation and harm at funerals.","Ṣaḥīḥ Muslim 2865 - This hadith mentions reward or punishment in the barzakh.","Sunan at-Tirmidhī 2461 - This hadith states the grave is a garden or a pit.","Sunan at-Tirmidhī 2435 - This hadith explains intercession for major sins.","Sunan at-Tirmidhī 1079 - This hadith encourages attending funerals and remembering death.","Sunan Abī Dāwūd 4753 - This hadith details the questions of Munkar and Nakir.","Sunan Abī Dāwūd 3221 - This hadith permits visiting graves for reminders and dua.","Sunan Ibn Mājah 4267 - This hadith urges remembering death and preparing with good deeds.","Sunan Ibn Mājah 1449 - This hadith encourages praying for the deceased and following the funeral."]}]},{"title":"Classical Texts","items":[{"entries":["Al-Tadhkirah fī Aḥwāl al-Mawtā wa Umūr al-Ākhirah – Al-Qurṭubī (Comprehensive classical text)","Kitāb al-Raqā\'iq – Ibn al-Mubārak (On softening the heart)","Ḥadī al-Arwāḥ ilā Bilād al-Afrāḥ – Ibn al-Qayyim (The soul\'s journey)","Al-Nihāyah fī al-Fitan wal-Malāḥim – Ibn Kathīr (End times)","Ṣifat al-Jannah wan-Nār – Ibn Kathīr (Paradise and Hell)","\'Aqīdat Ahl as-Sunnah fī Ṣifat al-Malā\'ikah – Ṣāliḥ al-Fawzān","Al-Ṣafā\'ah \'inda Ahl as-Sunnah – Muḥammad al-Khumayyis"]}]},{"title":"Modern Academic Works","items":[{"entries":["Aḥwāl al-Qiyāmah – Dr. \'Umar al-Ashqar (The States of the Day of Judgment)","Al-Yawm al-Ākhir – Dr. \'Umar al-Ashqar (The Final Day)","The Day of Resurrection – Dr. al-Ashqar (English translation available)","Islamic Beliefs: A Brief Introduction – Dr. al-Ashqar"]}]},{"title":"Practical Guides","items":[{"entries":["Funeral Rulings in Islam – Ṣāliḥ al-Fawzān","The Journey of the Soul – Sh. Omar Suleiman (Lecture series)","Preparing for the Day of Judgment – Sh. Abdul Nasir Jangda","The Grave: Punishment and Blessings – Sh. Yasir Qadhi"]}]},{"title":"Websites for Verification","items":[{"entries":["IslamQA.info (Search: grave punishment, barzakh, resurrection, intercession)","SeekersGuidance.org (Courses: The Hereafter, Funeral Rites)","Yaqeen Institute (Research: Death in Islam, Eschatology)"]}]}]},{"chapterId":15,"title":"Paradise & Hell: Rewards and Warnings","sections":[{"title":"Primary Sources","items":[{"label":"Qur\'an","entries":["Āl ʿImrān 3:133 - Race to forgiveness and a Paradise as wide as the heavens and earth.","Āl ʿImrān 3:131 - Fear the Fire prepared for those who disbelieve.","At-Taḥrīm 66:6 - Protect yourselves and your families from the Fire.","Yūnus 10:26 - For those who do good is the best reward and more.","An-Nisāʾ 4:168-169 - Disbelievers will abide in Hell forever.","Muḥammad 47:15 - Paradise has rivers of water, milk, honey, and wine.","Al-Baqarah 2:201 - Ask for good in this life and protection from the Fire.","At-Tawbah 9:72 - Allah promises believing men and women gardens beneath rivers.","Az-Zumar 39:73 - Those who feared Allah are led to Paradise in groups.","Az-Zumar 39:71 - Disbelievers are driven to Hell in groups."]},{"label":"Hadith","entries":["Ṣaḥīḥ al-Bukhārī 3244 - This hadith describes Paradise beyond human imagination.","Ṣaḥīḥ al-Bukhārī 3257 - This hadith mentions Paradise\'s gates and Hell\'s gates.","Ṣaḥīḥ al-Bukhārī 2790 - This hadith urges asking Allah for Al-Firdaws.","Ṣaḥīḥ al-Bukhārī 6573 - This hadith describes the Sirat over Hell for the Ummah.","Ṣaḥīḥ al-Bukhārī 7437 - This hadith affirms the believers\' vision of Allah in Paradise.","Ṣaḥīḥ Muslim 2842 - This hadith describes the creation of Paradise and Hell.","Ṣaḥīḥ Muslim 181 - This hadith explains the \\"increase\\" as seeing Allah.","Ṣaḥīḥ Muslim 2837 - This hadith announces eternal health, youth, and bliss in Paradise.","Ṣaḥīḥ Muslim 2849 - This hadith describes gatherings and delights within Paradise.","Ṣaḥīḥ Muslim 2851 - This hadith describes the lowest people of Paradise and their reward.","Sunan at-Tirmidhī 2435 - This hadith explains intercession for major sins.","Sunan at-Tirmidhī 2528 - This hadith encourages asking for Paradise and seeking refuge from Hell.","Sunan Ibn Mājah 3846 - This hadith teaches a dua for Paradise and protection from Hell.","Sunan Ibn Mājah 4331 - This hadith warns about Hell and its punishment.","Musnad Aḥmad 12699 - This hadith highlights Allah\'s mercy and Paradise for believers."]}]},{"title":"Classical Texts","items":[{"entries":["Ṣifat al-Jannah wan-Nār – Ibn Kathīr (Descriptions of Paradise and Hell)","Al-Tadhkirah fī Aḥwāl al-Mawtā wa Umūr al-Ākhirah – Al-Qurṭubī","Ḥadī al-Arwāḥ ilā Bilād al-Afrāḥ – Ibn al-Qayyim (The soul\'s journey)","Ṣifat al-Jannah – Ibn Abī ad-Dunyā","Al-Ru\'yah – Ibn Khuzaymah (The vision of Allah)","Al-Ṣafā\'ah – Ibn Taymiyyah (Intercession)","Fatḥ al-Bārī – Ibn Ḥajar (Commentary on Bukhārī)"]}]},{"title":"Modern Academic Works","items":[{"entries":["Al-Jannah wan-Nār – Dr. \'Umar al-Ashqar (Paradise and Hell)","Al-Nār: Ṣifatuhā wa Ahluha – Dr. \'Umar al-Ashqar","The Day of Resurrection – Dr. \'Umar al-Ashqar (Includes chapters on abodes)","Islamic Beliefs About Paradise & Hell – Muḥammad Ibn Ibrāhīm al-Ḥamad"]}]},{"title":"Practical Guides","items":[{"entries":["The Path to Paradise – Imam al-Nawawi\'s 40 Hadith (Several about Paradise)","Riyāḍ al-Ṣāliḥīn – Chapter: \\"The Excellence of Remembering Paradise and Hell\\"","Fortress of the Muslim – Du\'a section for Paradise and protection from Hell"]}]},{"title":"Websites for Verification","items":[{"entries":["IslamQA.info (Search: Paradise description, Hell punishment, eternal abode)","SeekersGuidance.org (Courses: The Hereafter, Creed of Ahl al-Sunnah)","Yaqeen Institute (Research: Eschatology, Divine Justice)"]}]},{"title":"Key Concepts for Study","items":[{"entries":["Al-Khulūd – Eternity in the Hereafter","Al-\'Adhāb wal-Na\'īm – Punishment and bliss","Al-Darajāt wal-Darakāt – Levels and degrees in Paradise and Hell","Al-Wa\'du wal-Wa\'īd – Allah\'s promise and threat","Al-\'Ibrah wal-I\'tibār – Taking lesson and reflection"]}]}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterSectionStats.json":
/*!****************************************************************!*\
  !*** ./resources/components/vue/data/chapterSectionStats.json ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"sectionStats":[{"title":"Tawheed Before You Were Born: The Primordial Covenant","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed Before You Were Born: The Primordial Covenant today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"The Three Categories of Tawheed (The Standard Framework)","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Three Categories of Tawheed (The Standard Framework) today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Extended Discussions on Tawheed: Ittibaa’ and Beyond","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Extended Discussions on Tawheed: Ittibaa’ and Beyond today?"},{"label":"Confidence","value":"Confidence 70%"}]},{"title":"The Greatest Ayah in the Qur’an: Ayat al-Kursi","stats":[{"label":"Focus window","value":"18 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Greatest Ayah in the Qur’an: Ayat al-Kursi today?"},{"label":"Confidence","value":"Confidence 75%"}]},{"title":"Tawheed of the Prophets in 60 Seconds Each","stats":[{"label":"Focus window","value":"20 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed of the Prophets in 60 Seconds Each today?"},{"label":"Confidence","value":"Confidence 80%"}]},{"title":"Tawheed in the Grave, on the Sirat, and at the Hawd","stats":[{"label":"Focus window","value":"22 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed in the Grave, on the Sirat, and at the Hawd today?"},{"label":"Confidence","value":"Confidence 85%"}]},{"title":"The Ten Nullifiers of Tawheed (Nawaqid al-Islam)","stats":[{"label":"Focus window","value":"24 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Ten Nullifiers of Tawheed (Nawaqid al-Islam) today?"},{"label":"Confidence","value":"Confidence 90%"}]},{"title":"Hidden Shirk Checklist (Modern Edition)","stats":[{"label":"Focus window","value":"26 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Hidden Shirk Checklist (Modern Edition) today?"},{"label":"Confidence","value":"Confidence 95%"}]},{"title":"The Four Stages of Protecting Tawheed","stats":[{"label":"Focus window","value":"28 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Four Stages of Protecting Tawheed today?"},{"label":"Confidence","value":"Confidence 100%"}]},{"title":"Tawheed in Times of Trial: Stories from the Sahaba","stats":[{"label":"Focus window","value":"30 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed in Times of Trial: Stories from the Sahaba today?"},{"label":"Confidence","value":"Confidence 105%"}]}]},{"chapterId":2,"sectionStats":[{"title":"The Branches of Iman: Over Seventy Levels of Excellence","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Branches of Iman: Over Seventy Levels of Excellence today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Belief in Allah – The Unshakable Core","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Belief in Allah – The Unshakable Core today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Living with Angels – Your Constant Companions","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Living with Angels – Your Constant Companions today?"},{"label":"Confidence","value":"Confidence 70%"}]},{"title":"Belief in the Revealed Books – The Chain of Divine Guidance","stats":[{"label":"Focus window","value":"18 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Belief in the Revealed Books – The Chain of Divine Guidance today?"},{"label":"Confidence","value":"Confidence 75%"}]},{"title":"25 Prophets Mentioned by Name – Quick Profiles of Guidance","stats":[{"label":"Focus window","value":"20 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect 25 Prophets Mentioned by Name – Quick Profiles of Guidance today?"},{"label":"Confidence","value":"Confidence 80%"}]},{"title":"Detailed Stages of the Hereafter: From Barzakh to Eternity","stats":[{"label":"Focus window","value":"22 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Detailed Stages of the Hereafter: From Barzakh to Eternity today?"},{"label":"Confidence","value":"Confidence 85%"}]},{"title":"Qadar in Four Simple Equations: Balancing Free Will and Decree","stats":[{"label":"Focus window","value":"24 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Qadar in Four Simple Equations: Balancing Free Will and Decree today?"},{"label":"Confidence","value":"Confidence 90%"}]},{"title":"The Ten Daily Iman Boosters: Practical Integration","stats":[{"label":"Focus window","value":"26 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Ten Daily Iman Boosters: Practical Integration today?"},{"label":"Confidence","value":"Confidence 95%"}]},{"title":"Iman in the Modern World: Countering Doubt","stats":[{"label":"Focus window","value":"28 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Iman in the Modern World: Countering Doubt today?"},{"label":"Confidence","value":"Confidence 100%"}]}]},{"chapterId":3,"sectionStats":[{"title":"Shahada – The Key That Never Rusts","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Shahada – The Key That Never Rusts today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Salah – 50→5 Gift of the Night Journey","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Salah – 50→5 Gift of the Night Journey today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Zakat – Financial Detox and Social Justice","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Zakat – Financial Detox and Social Justice today?"},{"label":"Confidence","value":"Confidence 70%"}]},{"title":"Sawm – Training the Soul for 11 Months","stats":[{"label":"Focus window","value":"18 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Sawm – Training the Soul for 11 Months today?"},{"label":"Confidence","value":"Confidence 75%"}]},{"title":"Hajj – Standing Where the Prophets Stood","stats":[{"label":"Focus window","value":"20 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Hajj – Standing Where the Prophets Stood today?"},{"label":"Confidence","value":"Confidence 80%"}]},{"title":"No Sixth Pillar: Clarifying Misconceptions","stats":[{"label":"Focus window","value":"22 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect No Sixth Pillar: Clarifying Misconceptions today?"},{"label":"Confidence","value":"Confidence 85%"}]},{"title":"Daily, Weekly, Yearly, Lifetime Checklist: Building Rhythm","stats":[{"label":"Focus window","value":"24 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Daily, Weekly, Yearly, Lifetime Checklist: Building Rhythm today?"},{"label":"Confidence","value":"Confidence 90%"}]},{"title":"The Fruits of the Pillars: Transformation Stories","stats":[{"label":"Focus window","value":"26 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Fruits of the Pillars: Transformation Stories today?"},{"label":"Confidence","value":"Confidence 95%"}]}]},{"chapterId":4,"sectionStats":[{"title":"Tajweed & Presence","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tajweed & Presence today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Meditative Reflection","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Meditative Reflection today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":5,"sectionStats":[{"title":"Prophetic Communication","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Prophetic Communication today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Balance & Routine","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Balance & Routine today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":6,"sectionStats":[{"title":"Mental Prep","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Mental Prep today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Physical Presence","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Physical Presence today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":7,"sectionStats":[{"title":"Dua as Conversation","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Dua as Conversation today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Dhikr Between Actions","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Dhikr Between Actions today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Protecting the Heart","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Protecting the Heart today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":8,"sectionStats":[{"title":"Detecting Heart Diseases","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Detecting Heart Diseases today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Softening Through Dhikr and Charity","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Softening Through Dhikr and Charity today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Focus Amid Distractions","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Focus Amid Distractions today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":9,"sectionStats":[{"title":"Family Adab","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Family Adab today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Digital Etiquette","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Digital Etiquette today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":10,"sectionStats":[{"title":"Halal Nutrition","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Halal Nutrition today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Digital Boundaries","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Digital Boundaries today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":11,"sectionStats":[{"title":"Marital Mercy","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Marital Mercy today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Parenting for the Heart","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Parenting for the Heart today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Extended Family Ties","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Extended Family Ties today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":12,"sectionStats":[{"title":"Hosting with Heart","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Hosting with Heart today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Conflict Resolution","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Conflict Resolution today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":13,"sectionStats":[{"title":"Spiritual Goal Setting","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Spiritual Goal Setting today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Legacy Planning","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Legacy Planning today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":14,"sectionStats":[{"title":"Moments Between This Life and the Next","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Moments Between This Life and the Next today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Judgment Day: Balance Fear and Hope","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Judgment Day: Balance Fear and Hope today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Charity That Continues After Passing","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Charity That Continues After Passing today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":15,"sectionStats":[{"title":"Gardens Below Which Rivers Flow","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Gardens Below Which Rivers Flow today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"The Fire of Hell and Lessons from the Warnings","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Fire of Hell and Lessons from the Warnings today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Living with Both Realities","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Living with Both Realities today?"},{"label":"Confidence","value":"Confidence 70%"}]}]}]');

/***/ }),

/***/ "./resources/components/vue/data/chapterToneFocus.json":
/*!*************************************************************!*\
  !*** ./resources/components/vue/data/chapterToneFocus.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","toneFocus":"To understand the meaning of Islam, its core principle of Tawheed, and the fundamental distinction between Tawheed (Islamic monotheism) and Shirk (associating partners with Allāh). "},{"chapterId":2,"title":"Islamic beliefs","toneFocus":"To understand the six articles of faith in detail, with their proofs, implications, and how they shape a Muslim’s heart and actions."},{"chapterId":3,"title":"Islamic pillars","toneFocus":"To understand the spiritual, moral, and practical significance of each pillar through authentic Qur’anic āyāt, verified aḥādīth, and classical scholarship."},{"chapterId":4,"title":"Islamic quran","toneFocus":"To understand the nature, purpose, and proper approach to the Qur’an as the verbatim Word of Allah, and to learn the essential etiquette required for its recitation, study, and implementation."},{"chapterId":5,"title":"Islamic prophet","toneFocus":"To understand the key phases of the Prophet\'s ﷺ life, his impeccable character, and our obligations towards him as the final Messenger."},{"chapterId":6,"title":"Islamic prayers","toneFocus":"To understand the profound spiritual, physical, and social significance of Ṣalāh, learn its proper performance with presence of heart (khushūʿ), and address common challenges in maintaining this essential pillar."},{"chapterId":7,"title":"Islamic dua dhikr","toneFocus":"To understand the immense importance, proper etiquettes, and authentic forms of Duʿāʾ and Dhikr, and to establish them as a daily spiritual practice."},{"chapterId":8,"title":"Islamic heart","toneFocus":"To understand the nature of spiritual heart diseases, their cures from the Qur’an and Sunnah, and practical steps for purification (tazkiyat an-nafs)."},{"chapterId":9,"title":"Islamic manners","toneFocus":"To learn the comprehensive Islamic etiquette derived from the Qur’an and Sunnah, covering personal conduct, social interactions, and spiritual decorum."},{"chapterId":10,"title":"Islamic lifestyle","toneFocus":"To understand the comprehensive Islamic framework of Halal and Haram its sources, principles, and practical applications in daily life and to develop the consciousness (taqwā) needed to navigate grey areas."},{"chapterId":11,"title":"Islamic family and marriage","toneFocus":"To understand the comprehensive Islamic framework for building and sustaining healthy, God-conscious families through the lifelong journey of marriage, parenting, and familial relationships."},{"chapterId":12,"title":"Islamic community","toneFocus":"To understand the rights, responsibilities, and practical manifestations of Islamic brotherhood (ukhuwwah) within the global Ummah and local community, and to learn how to build and contribute to a supportive Muslim society."},{"chapterId":13,"title":"Islamic future","toneFocus":"To understand the Islamic framework for lifelong spiritual development, maintaining consistency in worship, and preparing for the eternal future in the Hereafter while excelling in this worldly life."},{"chapterId":14,"title":"Islamic hereafter","toneFocus":"To understand the Islamic beliefs about death, the grave, Resurrection, Judgment, and the eternal abodes of Paradise and Hell, based on definitive texts from the Qur\'an and authentic Sunnah."},{"chapterId":15,"title":"Islamic paradise and hell","toneFocus":"To understand the definitive Islamic descriptions of Paradise and Hell their nature, inhabitants, conditions for entry, and the profound implications these eternal realities should have on our present lives."}]');

/***/ }),

/***/ "./resources/components/vue/data/commonQuestions.json":
/*!************************************************************!*\
  !*** ./resources/components/vue/data/commonQuestions.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"key":"foundation","title":"Islamic foundation","faqs":[{"id":"foundation-1","title":"What does the Islamic foundation chapter cover?","body":"<p>It explains Tawheed, the oneness of Allah, and how every act of worship roots itself in that testimony.</p>"},{"id":"foundation-2","title":"Why is Tawheed considered the foundation of Islamic faith?","body":"<p>Tawheed affirms that Allah alone deserves worship, so every belief, law, and character trait rests on that unity.</p>"},{"id":"foundation-3","title":"How should I keep the foundation alive in everyday decisions?","body":"<p>Anchor intentions in Allah, audit actions for signs of shirk, and repeat the shahada when distractions appear.</p>"},{"id":"foundation-4","title":"What are common mistakes learners make about this chapter?","body":"<p>Treating Tawheed as abstract, idolizing culture, or neglecting accountability; the chapter warns against these errors.</p>"},{"id":"foundation-5","title":"Which practices help strengthen the Islamic foundation?","body":"<p>Daily dhikr, Quran reflection on Allah\'s names, learning seerah highlights, and teaching others keeps the foundation firm.</p>"}]},{"chapterId":2,"key":"beliefs","title":"Islamic beliefs","faqs":[{"id":"beliefs-1","title":"Do we believe in original sin?","body":"<p>No. In Islam, every child is born upon the natural disposition (Fiṭrah) of Islām. No one bears the sin of another. \\"And no bearer of burdens will bear the burden of another...\\" (Al-Anʿām 6:164)</p>"},{"id":"beliefs-2","title":"Why believe in previous books if they are corrupted?","body":"<p>We believe they were originally true revelations from Allāh. We believe in what remains of truth in them but follow only the final, preserved Qur’ān as our law. \\"And We have revealed to you the Book in truth, confirming that which preceded it...\\" (Al-Māʾidah 5:48)</p>"},{"id":"beliefs-3","title":"Does belief in Qadar mean we shouldn’t make effort or plan?","body":"<p>No. Belief in Qadar means taking lawful means (asbāb) while trusting the outcome to Allāh. The Prophet ﷺ said, \\"Take measures, for everyone is facilitated for what he has been created.\\" (Ṣaḥīḥ Muslim 2647)</p>"},{"id":"beliefs-4","title":"Are angels and jinn the same?","body":"<p>No. Angels are created from light, always obey Allāh, and have no free will like humans. Jinn are created from smokeless fire, have free will, and can be believers or disbelievers.</p>"},{"id":"beliefs-5","title":"Do Muslims believe Jesus will return?","body":"<p>Yes. Part of believing in the Last Day is believing ʿĪsā (Jesus) ibn Maryam will descend before the Day of Judgment, break the cross, kill the false Messiah (Dajjāl), and rule by Islamic law. (Ṣaḥīḥ Muslim 155)</p>"}]},{"chapterId":3,"key":"pillars","title":"Islamic pillars","faqs":[{"id":"pillars-1","title":"Is someone who doesn\'t pray still Muslim?","body":"<p>Abandoning prayer is a major sin (kabīrah) and some scholars consider it disbelief (kufr) if done out of denial or negligence. The consensus is that it nullifies one\'s Islam if denied as obligatory. (Majmū\' al-Fatāwā, Ibn Taymiyyah)</p>"},{"id":"pillars-2","title":"Can I give zakāh to non-Muslim relatives?","body":"<p>Zakāh is specifically for Muslims in eight categories (9:60). However, you may give voluntary charity (ṣadaqah) to non-Muslim relatives to maintain family ties. (Fatāwā al-Lajnah al-Dā’imah)</p>"},{"id":"pillars-3","title":"What breaks a fast besides eating/drinking?","body":"<p>Intentional eating/drinking, sexual intercourse, vomiting deliberately, menstruation, and injections for nourishment break the fast. Unintentional acts or injections for medication are debated. (Al-Mughnī, Ibn Qudāmah)</p>"},{"id":"pillars-4","title":"Is Hajj valid if done with a loan?","body":"<p>Yes, if one is capable of repaying it. Ability (istitā\'ah) includes financial and physical capacity. (Fatāwā Ibn Bāz)</p>"},{"id":"pillars-5","title":"Can women perform Hajj without a mahram?","body":"<p>The majority of scholars say a woman must be accompanied by a mahram for Hajj. Some contemporary scholars permit group travel with trustworthy women under strict conditions. (Sharḥ Ṣaḥīḥ Muslim, An-Nawawī)</p>"}]},{"chapterId":4,"key":"quran","title":"Islamic quran","faqs":[{"id":"quran-1","title":"Is the Arabic Qur\'an translated or interpreted in other languages?","body":"<p>The translation of the meanings (tarjamah maʿānī) is a human interpretation to convey sense, but it is not the Qur\'an itself. The only Qur\'an is the Arabic revelation. Prayer must be performed in Arabic.</p>"},{"id":"quran-2","title":"Can women recite Qur\'an during menstruation?","body":"<p>Yes, they can recite from memory without touching the Muṣḥaf, according to the majority of scholars. They are only prohibited from praying and fasting during this time.</p>"},{"id":"quran-3","title":"What is the difference between the Qur\'an and Hadith Qudsī?","body":"<p>Hadith Qudsī is Allah\'s meaning conveyed in the Prophet\'s ﷺ words. The Qur\'an is Allah\'s exact wording (Lafẓ) and meaning, a miracle in itself, and recited in prayer.</p>"},{"id":"quran-4","title":"How do we know the order of chapters is divine?","body":"<p>The Prophet ﷺ arranged the verses within chapters by divine instruction, and he approved the general arrangement of chapters as compiled by the Companions under divine guidance.</p>"},{"id":"quran-5","title":"Is it mandatory to read with a specific melody (Murattal/Tajwīd)?","body":"<p>Tajwīd (correct pronunciation) is obligatory to avoid changing meaning. Beautiful melodic recitation (Tartīl) is recommended but not required. \\"And recite the Qur\'an with measured recitation.\\" (Al-Muzzammil 73:4)</p>"}]},{"chapterId":5,"key":"prophet","title":"Islamic prophet","faqs":[{"id":"prophet-1","title":"Why did he have multiple wives?","body":"<p>His marriages after Khadijah\'s death had legislative, social, and community purposes: teaching rulings, honoring widows of companions, strengthening alliances, and setting examples. They were not pursued for mere personal desire.</p>"},{"id":"prophet-2","title":"Did he perform miracles?","body":"<p>Yes, by Allah\'s permission, such as the splitting of the moon, water flowing from his fingers, and the Night Journey (Al-Isra\' wal-Mi\'raj). His greatest, continuous miracle is the Qur\'an.</p>"},{"id":"prophet-3","title":"How do we know his life is accurately recorded?","body":"<p>Through the rigorous historical and chain-of-transmission (Isnad) methodology of the hadith scholars, who verified reports with named narrators and documented reliability.</p>"},{"id":"prophet-4","title":"Should we celebrate his birthday (Mawlid)?","body":"<p>This is an issue of scholarly difference. The core principle is that acts of worship require proof from the Qur\'an and Sunnah, and the best way to honor him is by following his authentic Sunnah.</p>"},{"id":"prophet-5","title":"Is it obligatory to love him?","body":"<p>Yes. Loving the Prophet ﷺ more than all of creation is part of complete faith (iman), as stated in the authentic hadith in Sahih al-Bukhari (15).</p>"}]},{"chapterId":6,"key":"prayers","title":"Islamic prayers","faqs":[{"id":"prayers-1","title":"What if I don\'t know Arabic? Can I pray in my language?","body":"<p>The recitation in salah is in Arabic as revealed; start by memorizing al-Fatiha and short surahs with their meanings. You may make personal du\'a in your own language during prostration. (Quran 12:2; Sahih Muslim 395; Sahih Muslim 482)</p>"},{"id":"prayers-2","title":"Can women pray at the mosque?","body":"<p>Yes. Women are permitted to pray in the mosque, though praying at home is better for them. (Sunan Abi Dawud 567)</p>"},{"id":"prayers-3","title":"How do I deal with constant distractions (waswas) during prayer?","body":"<p>Seek refuge in Allah, focus on the meanings of recitation, and keep your gaze at the place of prostration. Remember you are conversing with your Lord. (Quran 7:200; Sahih al-Bukhari 405)</p>"},{"id":"prayers-4","title":"What if I join congregational prayer late?","body":"<p>Say the opening takbir standing, follow the Imam immediately, and complete what you missed after he finishes. Prayer has fixed times, and the Imam is appointed to be followed. (Quran 4:103; Sahih Muslim 414)</p>"},{"id":"prayers-5","title":"Are there valid excuses for shortening or combining prayers?","body":"<p>Yes. Travelers may shorten the four-rak\'ah prayers to two, and combining is a concession during travel and genuine hardship. Consult a scholar for your situation. (Quran 4:101; Sahih Muslim 704)</p>"}]},{"chapterId":7,"key":"duas","title":"Islamic dua dhikr","faqs":[{"id":"duas-1","title":"How do I know if my heart is diseased?","body":"<p>Signs include hardness during Qur’an recitation, lack of tears in prayer, enjoying sins, finding obedience burdensome, and holding grudges. \\"Then your hearts became hardened after that...\\" (Al-Baqarah 2:74)</p>"},{"id":"duas-2","title":"Is feeling jealous a major sin?","body":"<p>The initial feeling (khaṭir) is not sinful if you reject it. It becomes sinful when you dwell on it, act upon it, or wish harm upon others.</p>"},{"id":"duas-3","title":"Can music and films really affect the heart?","body":"<p>Yes, they promote heedlessness, normalize sin, and weaken spiritual sensitivity. The Prophet ﷺ said: \\"There will be people from my Ummah who will permit fornication, silk, alcohol, and musical instruments.\\" (Ṣaḥīḥ al-Bukhārī 5590)</p>"},{"id":"duas-4","title":"How to cure a hard heart?","body":"<p>1. Increase in prostration (prayer). 2. Cry in private seeking Allah. 3. Visit the righteous sick and graveyards. 4. Remember death frequently. 5. Recite Qur’an with reflection.</p>"},{"id":"duas-5","title":"Does depression mean my faith is weak?","body":"<p>No. Depression can be a psychological or medical condition requiring treatment. The Prophets experienced deep sadness. Seek both spiritual cures (prayer, duʿāʾ) and professional help; Islam encourages both.</p>"}]},{"chapterId":8,"key":"heart","title":"Islamic heart","faqs":[{"id":"heart-1","title":"What does the chapter say about the heart?","body":"<p>It focuses on purification, removing diseases like envy, pride, and attachment to status.</p>"},{"id":"heart-2","title":"How do I purify my heart from envy?","body":"<p>Celebrate others, count blessings, make dua for them, and remember everything belongs to Allah.</p>"},{"id":"heart-3","title":"What is muhasabah?","body":"<p>Self-accounting: reviewing your day, repenting, and planning improvements before sleep.</p>"},{"id":"heart-4","title":"How do I keep the heart soft toward Allah?","body":"<p>Recite Quran, give charity, help others, and make moments of quiet reflection.</p>"},{"id":"heart-5","title":"How does dhikr guard against spiritual diseases?","body":"<p>Frequent remembrance reinforces humility, reminds you of accountability, and calms the soul.</p>"}]},{"chapterId":9,"key":"manners","title":"Islamic manners","faqs":[{"id":"manners-1","title":"Is it mandatory to wear traditional Islamic dress?","body":"<p>The obligation is modesty covering (ḥijāb) for women and covering from navel to knee for men. Styles vary by culture but must meet Islamic requirements of looseness, opacity, and dignity.</p>"},{"id":"manners-2","title":"How to deal with rude non-Muslims while maintaining adab?","body":"<p>Respond with better words and patience. The Prophet ﷺ endured worse in Makkah. &quot;Repel evil with what is better...&quot; (Al-Muʾminūn 23:96)</p>"},{"id":"manners-3","title":"Is joking permissible in Islam?","body":"<p>Yes, but within limits: no lies, no hurting feelings, no mockery of religion, and not excessive. The Prophet ﷺ joked but only spoke truth.</p>"},{"id":"manners-4","title":"What are the manners of disagreement among Muslims?","body":"<p>1. Maintain good intentions. 2. Stick to evidence. 3. Respect scholars. 4. Avoid accusations. 5. Don\'t publicize disputes. &quot;And do not dispute and thus lose courage...&quot; (Al-Anfāl 8:46)</p>"},{"id":"manners-5","title":"How to practice adab in the digital age?","body":"<p>Apply the same principles: don\'t spread rumors, verify before sharing, avoid vulgar language, respect others\' privacy, and use time productively.</p>"}]},{"chapterId":10,"key":"lifestyle","title":"Islamic lifestyle","faqs":[{"id":"lifestyle-1","title":"Are vaccines with pork-derived ingredients permissible?","body":"<p>Yes, under necessity and lack of Halal alternatives, based on the principle: &quot;Necessities permit prohibitions.&quot; (Al-Māʾidah 5:3) The medicinal benefit outweighs the prohibition, and it\'s not consumed for nutrition. (Islamic Fiqh Council ruling)</p>"},{"id":"lifestyle-2","title":"Is cryptocurrency Halal?","body":"<p>It depends on the type and usage. Currencies like Bitcoin used as speculative assets (high volatility, no intrinsic value) are often considered Haram due to Gharar (excessive uncertainty). Those used as stable mediums of exchange may be permissible after scholarly evaluation. (Diverse scholarly opinions; consult specialists)</p>"},{"id":"lifestyle-3","title":"Can I work in a bank that deals with interest?","body":"<p>Working in departments directly involved in interest transactions (loans, treasury) is prohibited. Support roles (IT, security, cleaning) where one doesn\'t facilitate interest may be permissible with conditions, but seeking completely Halal employment is superior. (Permanent Committee for Research and Fatāwā, Saudi Arabia)</p>"},{"id":"lifestyle-4","title":"Is gelatin from non-Zabīḥah animals always Haram?","body":"<p>Most scholars consider it Haram as it derives from pork or improperly slaughtered animals. However, some permit gelatin if it undergoes complete chemical transformation (istihālah). The precautionary approach is to avoid it when possible. (Differing opinions among schools)</p>"},{"id":"lifestyle-5","title":"What if my parents insist I give them money from my interest-based salary?","body":"<p>You cannot give them Haram money. Explain gently that you want to give them pure wealth. Seek alternative Halal income to support them. Obedience to parents stops at disobeying Allah. &quot;But if they endeavor to make you associate with Me what you have no knowledge of, do not obey them...&quot; (Luqmān 31:15)</p>"}]},{"chapterId":11,"key":"family","title":"Islamic family and marriage","faqs":[{"id":"family-1","title":"What if my spouse doesn\'t pray? Can I force them?","body":"<p>You cannot force them physically. Your duty is to advise with wisdom, beautiful preaching, and gentle reminders. Continue fulfilling their rights. If they persistently abandon prayer, scholars differ on whether this nullifies the marriage; consult a local scholar for your specific case.</p>"},{"id":"family-2","title":"Is polygyny mandatory or recommended?","body":"<p>It is permissible under strict conditions of justice, not mandatory or generally recommended. The Qur\'an says: \\"Then marry those that please you of women, two, three, or four. But if you fear you will not be just, then one...\\" (An-Nisāʾ 4:3). Most scholars say emotional justice is nearly impossible, hence the preference for monogamy.</p>"},{"id":"family-3","title":"How to handle interfering in-laws?","body":"<p>With patience and wisdom. Set polite boundaries while maintaining respect. The spouse should handle their own parents. The Prophet ﷺ said: \\"The best of you is he who is best to his family.\\" This includes managing extended family relations wisely.</p>"},{"id":"family-4","title":"Can a wife work outside the home?","body":"<p>Yes, with the husband\'s permission and conditions: 1) It doesn\'t neglect her primary responsibilities to home and children. 2) The work is Islamically permissible. 3) Proper hijab and gender interaction guidelines are observed. 4) Her earnings are her own property unless she chooses to contribute.</p>"},{"id":"family-5","title":"What about infertility or choosing not to have children?","body":"<p>Infertility is a test; seek treatment Islamically (avoid IVF with donor eggs/sperm). Adoption is encouraged but with Islamic guidelines (child retains biological lineage, non-mahram rules apply after puberty). Choosing not to have children without valid reason is discouraged as it contradicts the objectives of marriage.</p>"}]},{"chapterId":12,"key":"community","title":"Islamic community","faqs":[{"id":"community-1","title":"How do we deal with major differences without splitting the community?","body":"<p>Follow the principle established by scholars: &quot;Cooperate in matters of agreement, and excuse one another in matters of legitimate difference.&quot; Maintain brotherhood, debate with proper etiquette (adab), and avoid declaring others beyond the pale for non-creedal issues. Diversity in jurisprudence (fiqh) is a mercy.</p>"},{"id":"community-2","title":"Is it obligatory to live in a Muslim-majority country or community?","body":"<p>No, but it is highly recommended (mandūb) for ease of practice and community support. Muslims in minority settings have a great reward for preserving their faith and can be a powerful means of da\'wah. The Prophet ﷺ praised those who remain steadfast in difficulty.</p>"},{"id":"community-3","title":"What is our responsibility towards non-Muslims in our society?","body":"<p>Be just, kind, and honest neighbors and citizens. Invite them to Islam with wisdom and beautiful preaching, and oppose injustice against them. The Prophet ﷺ said: &quot;Whoever wrongs a non-Muslim under covenant (dhimmī), or burdens them beyond their capacity, I will be his opponent on the Day of Judgment.&quot; (<a href=\\"https://sunnah.com/abudawud:3052\\" target=\\"_blank\\" rel=\\"noopener\\">Sunan Abī Dāwūd 3052</a>)</p>"},{"id":"community-4","title":"How can we practically help oppressed Muslims in other countries?","body":"<p>Start with what you can sustain: sincere du\'a, supporting reliable charities, truthful awareness, lawful advocacy, and effective boycotts when feasible.</p><ol><li>Make sincere du\'a for them.</li><li>Donate to reliable, trustworthy charities working directly on the ground.</li><li>Raise awareness truthfully without sensationalism.</li><li>Engage in lawful political advocacy.</li><li>Boycott companies directly supporting oppression if it is effective and feasible.</li></ol><p>&quot;And what is [the matter] with you that you fight not in the cause of Allah and for the oppressed among men, women, and children...&quot; (<a href=\\"https://quran.com/4/75\\" target=\\"_blank\\" rel=\\"noopener\\">An-Nisā\' 4:75</a>)</p>"},{"id":"community-5","title":"How do we revive community spirit in individualistic, secular societies?","body":"<p>Start with your family and local masjid: establish regular gatherings, study circles, joint iftārs (in Ramadan), and visitation schedules. The Prophet ﷺ said: &quot;Shall I inform you of something better than the status of fasting, prayer, and charity? Making peace between people, for verily, discord is the shaver (destroyer).&quot; (<a href=\\"https://sunnah.com/abudawud:4919\\" target=\\"_blank\\" rel=\\"noopener\\">Sunan Abī Dāwūd 4919</a>) Prioritize reconciliation and collective activities.</p>"}]},{"chapterId":13,"key":"future","title":"Islamic future","faqs":[{"id":"future-1","title":"How do I maintain consistency when I feel spiritually dry or unmotivated?","body":"<p>This is normal; even the Companions experienced fluctuations. Hold to the obligatory acts and remember that Allah does not burden a soul beyond its capacity. (Qur\'an 2:286)</p><ol><li>Force yourself to perform the obligatory acts.</li><li>Reduce voluntary acts but do not abandon all of them; keep small, consistent deeds. (Sahih al-Bukhari 6465)</li><li>Increase supplication for motivation and firmness. (Qur\'an 40:60)</li><li>Read or listen to inspiring Islamic reminders.</li><li>Remember that with hardship comes ease, so persevere. (Qur\'an 94:5-6)</li></ol>"},{"id":"future-2","title":"Is it permissible to have worldly ambitions (career, education, wealth) alongside spiritual goals?","body":"<p>Yes, with conditions. Seek the Hereafter without forgetting your share of this world and make your intention for Allah. (Qur\'an 28:77; Sahih al-Bukhari 1)</p><ol><li>The intention is to serve Allah through these means by providing for family, benefiting society, and strengthening Muslims. (Sahih al-Bukhari 1)</li><li>They do not lead to neglecting obligatory worship. (Qur\'an 63:9)</li><li>They are acquired through halal means. (Qur\'an 2:172)</li><li>Remain detached inwardly and ready to lose it all for Allah\'s sake. (Qur\'an 57:20)</li></ol>"},{"id":"future-3","title":"How can I measure my spiritual growth?","body":"<p>Measure by internal signs, not just external acts. Allah looks at hearts and deeds. (Sahih Muslim 2564)</p><ol><li>Increased love for worship and decreased difficulty in performing it. (Qur\'an 8:2)</li><li>Quicker repentance after sins. (Qur\'an 66:8)</li><li>Increased concern for the Hereafter over worldly matters. (Qur\'an 87:16-17)</li><li>Greater humility and decreased arrogance. (Qur\'an 53:32)</li><li>Enhanced love for fellow Muslims and desire to benefit them. (Qur\'an 49:10)</li></ol>"},{"id":"future-4","title":"What if I keep repeating the same sins despite wanting to grow?","body":"<p>Do not despair; Allah\'s mercy is vast and He loves repentance. (Qur\'an 39:53; Jami\' at-Tirmidhi 2499)</p><ol><li>Do not despair, and keep returning to repentance.</li><li>Analyze triggers and create avoidance strategies.</li><li>Increase specific good deeds that counter that sin. (Jami\' at-Tirmidhi 1987)</li><li>Seek righteous company that discourages the sin. (Jami\' at-Tirmidhi 2378)</li><li>Make sincere du\'a every day for protection. (Qur\'an 40:60)</li></ol>"},{"id":"future-5","title":"How should I prepare for the future (retirement, old age) Islamically?","body":"<p>Plan responsibly while investing in what lasts beyond you. (Qur\'an 59:18; Sahih Muslim 1631)</p><ol><li>Save halal wealth for future needs without hoarding or extravagance. (Qur\'an 17:29)</li><li>Invest in continuous sadaqah jariyah like a well, Islamic education, or a beneficial book. (Sahih Muslim 1631)</li><li>Strengthen your relationship with Allah and increase worship as long as life continues. (Qur\'an 15:99)</li><li>Nurture righteous children who will pray for you after your death. (Sahih Muslim 1631)</li></ol>"}]},{"chapterId":14,"key":"hereafter","title":"Islamic hereafter","faqs":[{"id":"hereafter-1","title":"What happens to children, the mentally disabled, and people who never heard Islam?","body":"<p>Children and those without mental capacity are not accountable in this life; the pen is lifted from the child until maturity and from the one who lacks reason. (Sunan Abi Dawud 4403) Allah does not punish a people until the message reaches them clearly. (Quran Al-Isra 17:15) Scholars mention a test on the Day of Judgment for those who never received the message. (Musnad Ahmad 16345)</p>"},{"id":"hereafter-2","title":"Do we see or communicate with deceased family members?","body":"<p>Believing families will be reunited in Paradise by Allah\'s mercy. (Quran At-Tur 52:21) The Prophet taught visiting graves and greeting the inhabitants, which reminds us of the Hereafter. (Sahih Muslim 975) Dreams can occur by Allah\'s permission, but they are not a reliable channel for rulings or guidance. (Sahih al-Bukhari 6989)</p>"},{"id":"hereafter-3","title":"Is cremation permissible in Islam?","body":"<p>No. Islam honors the body, and the Sunnah is to bury the deceased intact, returning them to the earth. (Quran Ta-Ha 20:55) The Prophet said breaking the bone of the dead is like breaking it while alive, so mutilation is forbidden. (Sunan Abi Dawud 3207)</p>"},{"id":"hereafter-4","title":"What about near-death experiences (seeing light, tunnels, etc.)?","body":"<p>Islam does not treat near-death experiences as reliable descriptions of the Hereafter. The true experience begins after the soul fully departs and enters barzakh. (Quran Al-Mu\'minun 23:99-100; Quran As-Sajdah 32:11) The Prophet noted that when the soul is taken, the eyes follow it, indicating a real separation from the body. (Sahih Muslim 920)</p>"},{"id":"hereafter-5","title":"Can we know someone\'s fate after death (Paradise or Hell)?","body":"<p>We do not declare individuals in Paradise or Hell except those named in the Qur\'an or authentic hadith, such as the ten promised Paradise. (Sunan at-Tirmidhi 3747) Allah alone knows hearts, and we are warned against claiming purity. (Quran An-Najm 53:32) For deceased Muslims, we make dua for mercy and forgiveness. (Quran Al-Hashr 59:10)</p>"}]},{"chapterId":15,"key":"paradise","title":"Islamic paradise and hell","faqs":[{"id":"paradise-1","title":"Will people in Paradise get married?","body":"<p>Yes, believing men will have purified spouses (ḥūr al-ʿīn), and believing spouses from this world will be reunited and beautified beyond imagination. There will be pure marital relations without any negative consequences.</p>"},{"id":"paradise-2","title":"Can a Muslim who committed major sins like murder enter Paradise?","body":"<p>Yes, if they died believing in Tawḥīd and without associating partners with Allah. They may be punished in Hell for a time but will eventually enter Paradise by Allah\'s mercy or the Prophet\'s intercession, unless the sin involved wrongdoing against others which wasn\'t resolved.</p>"},{"id":"paradise-3","title":"Are the descriptions of Paradise literal?","body":"<p>Yes, according to Ahl al-Sunnah, they are literal but beyond our current comprehension. We believe in them without asking \\"how\\" (bilā kayf), as our limited senses cannot grasp their true nature.</p>"},{"id":"paradise-4","title":"What about people who never heard about Islam?","body":"<p>They will be tested on the Day of Judgment. Those who followed the natural disposition (fiṭrah) to worship One God and lived morally may enter Paradise by Allah\'s mercy. Those who rejected clear signs in creation may be held accountable.</p>"},{"id":"paradise-5","title":"Will children who die young go to Paradise?","body":"<p>Yes, all children who die before puberty automatically enter Paradise. The Prophet ﷺ said they will be in Paradise serving its inhabitants. Muslim parents will be reunited with them.</p>"}]}]');

/***/ }),

/***/ "./resources/components/vue/data/duas.json":
/*!*************************************************!*\
  !*** ./resources/components/vue/data/duas.json ***!
  \*************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"duas":[{"title":"The Greatest Du\'ā of Tawheed:","arabic":"لَا إِلٰهَ إِلَّا اللهُ","english":"There is no god worthy of worship except Allāh.","reference":"The Prophet ﷺ said this is the best remembrance. (Ṣaḥīḥ al-Bukhārī 3435)"},{"title":"Du\'ā for Firmness in Faith:","arabic":"يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ","english":"O Changer of hearts, make my heart firm upon Your religion.","reference":"Reported by Umm Salamah, the Prophet ﷺ recited this often. (Jāmi\' at-Tirmidhī 3522 - Ṣaḥīḥ)"},{"title":"Du\'ā for Guidance to Truth:","arabic":"اهْدِنِي لِمَا اخْتُلِفَ فِيهِ مِنَ الْحَقِّ","english":"Guide me to the truth in matters where people differ.","reference":"The Prophet ﷺ taught this du\'ā. (Ṣaḥīḥ Muslim 770)"}]},{"chapterId":2,"duas":[{"title":"Du\'ā for Firmness in Īmān & Islam","arabic":"يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ","english":"O Changer of the hearts, make my heart firm upon Your religion.","reference":"The Prophet ﷺ said this often. (Jāmiʿ al-Tirmidhī 3522 - Ḥasan)"},{"title":"Du\'ā upon Hearing Good News (Affirming al-Qadar)","arabic":"الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ","english":"All praise is for Allāh, by whose favour good deeds are completed.","reference":"The Prophet ﷺ taught this when something pleased him. (Ṣaḥīḥ al-Bukhārī, Al-Adab al-Mufrad 783)"},{"title":"Du\'ā for Protection from Punishment in the Grave (Belief in the Hereafter)","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ","english":"O Allāh, I seek refuge in You from the punishment of the grave.","reference":"Reference: The Prophet ﷺ taught this in multiple aḥādīth. (Ṣaḥīḥ al-Bukhārī 6365)"}]},{"chapterId":3,"duas":[{"title":"For Steadfastness in Shahādah","arabic":"رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ","english":"My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.","reference":"(Ibrāhīm 14:40)"},{"title":"Upon Completing Ṣalāh","arabic":"اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ","english":"O Allah, help me to remember You, thank You, and worship You in the best manner.","reference":"(Sunan Abī Dāwūd 1522 - Ḥasan)"},{"title":"For Acceptance of Worship","arabic":"تَقَبَّلَ اللَّهُ مِنَّا وَمِنكُمْ","english":"May Allah accept [this worship] from us and from you.","reference":"(Commonly said during Eid, based on the practice of the Companions)"}]},{"chapterId":4,"duas":[{"title":"Du\'ā Before Recitation","arabic":"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ","english":"I seek refuge in Allah from the accursed Shayṭān.","reference":"Commanded by Allah: \\"So when you recite the Qur\'an, seek refuge in Allah from Shayṭān, the expelled.\\" (An-Naḥl 16:98)"},{"title":"Du\'ā for Understanding & Benefit","arabic":"اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي","english":"O Allah, benefit me with what You have taught me, and teach me that which will benefit me.","reference":"Reported from the Prophet ﷺ as a comprehensive knowledge du\'ā. (Sunan Ibn Mājah 251)"},{"title":"Du\'ā Upon Hearing an Āyah about Mercy or Punishment","arabic":"يَتَعَوَّذُ مِنَ العَذَابِ وَيَسْأَلُ مِنَ الرَّحْمَةِ","english":"He would seek refuge from the punishment and ask for the mercy.","reference":"The Prophet ﷺ would do this during recitation. (Ṣaḥīḥ al-Bukhārī 6347)"}]},{"chapterId":5,"duas":[{"title":"Du\'a of Seeking Intercession","arabic":"اللَّهُمَّ فَشَفِّعْهُ فِيَّ","english":"O Allah, accept his intercession for me.","reference":"Part of the supplication taught by the Prophet ﷺ to the blind man. (Jami\' at-Tirmidhi 3578)"},{"title":"Du\'a When Hearing the Adhan","arabic":"اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ","english":"O Allah, Lord of this perfect call and established prayer, grant Muhammad the means and the virtue, and raise him to the praised station that You promised him.","reference":"The Prophet ﷺ said whoever says this will earn his intercession. (Sahih al-Bukhari 614)"},{"title":"General Salat upon the Prophet ﷺ","arabic":"صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ","english":"May Allah send blessings and peace upon him.","reference":"The minimal form fulfilling the command to send blessings upon the Prophet ﷺ. (Al-Ahzab 33:56)"}]},{"chapterId":6,"duas":[{"title":"Duʿāʾ of Seeking Intercession","arabic":"اللَّهُمَّ شَفِّعْ فِيَّ مُحَمَّدًا","english":"O Allah, allow Muhammad to intercede for me.","reference":"Part of a longer duʿāʾ taught by the Prophet ﷺ for the Day of Judgment. (Musnad Aḥmad 13964 - Ṣaḥīḥ)"},{"title":"Duʿāʾ When Hearing the Call to Prayer (Adhān)","arabic":"اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ","english":"O Allah, Lord of this perfect call and established prayer, grant Muhammad the means [of intercession] and superiority, and raise him to the praised station that You promised him.","reference":"The Prophet ﷺ said whoever says this will earn his intercession. (Ṣaḥīḥ al-Bukhārī 614)"},{"title":"General Ṣalāh upon the Prophet ﷺ","arabic":"صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ","english":"May Allah send blessings and peace upon him.","reference":"The minimal form complying with the divine command in Sūrah Al-Aḥzāb 33:56."}]},{"chapterId":7,"duas":[{"title":"Opening Du\'a Before Prayer","arabic":"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ","english":"Glory be to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty. There is no god but You.","reference":"Sunan Abi Dawud 775 (Sahih)"},{"title":"Du\'a During Prostration","arabic":"سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ","english":"The Most Glorious, the Most Holy, Lord of the angels and the Spirit (Jibril).","reference":"Sahih Muslim 487"},{"title":"Dhikr After Taslim","arabic":"أَسْتَغْفِرُ اللهَ (ثَلَاثًا)، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ","english":"I seek Allah\'s forgiveness (three times). O Allah, You are As-Salam, and from You is peace. Blessed are You, O Possessor of Majesty and Honor.","reference":"Sahih Muslim 591"}]},{"chapterId":8,"duas":[{"title":"For a Sound Heart","arabic":"اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا","english":"O Allah, grant my soul its piety and purify it, for You are the best to purify it. You are its Guardian and Master.","reference":"Ṣaḥīḥ Muslim 2722"},{"title":"Against Envy & Evil Eye","arabic":"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ","english":"I seek refuge in the perfect words of Allah from the evil of what He has created.","reference":"Ṣaḥīḥ Muslim 2708"},{"title":"For Protection from Hypocrisy","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ","english":"O Allah, I seek refuge in You from evil character, evil actions, and evil desires.","reference":"Sunan at-Tirmidhī 3591 – Ḥasan"}]},{"chapterId":9,"duas":[{"title":"For Excellent Character","arabic":"اللَّهُمَّ أَحْسَنْتَ خَلْقِي فَأَحْسِنْ خُلُقِي","english":"O Allah, as You have made my appearance beautiful, make my character beautiful.","reference":"Musnad Aḥmad 12330 – Ḥasan"},{"title":"When Entering a Home","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا","english":"O Allah, I ask You for the best of entry and the best of exit. In Allah\'s name we enter and in Allah\'s name we exit, and in Allah our Lord we place our trust.","reference":"Sunan Abī Dāwūd 5096 – Ṣaḥīḥ"},{"title":"For Protection from Bad Character","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ","english":"O Allah, I seek refuge in You from evil character, evil actions, and evil desires.","reference":"Sunan at-Tirmidhī 3591 – Ḥasan"}]},{"chapterId":10,"duas":[{"title":"For Provision of Halal","arabic":"اللَّهُمَّ ارْزُقْنَا رِزْقًا حَلَالًا طَيِّبًا وَاسِعًا","english":"O Allah, provide us with lawful, good, and abundant provision.","reference":"Based on the general duʿāʾ for good provision in Sunan Ibn Mājah 3833."},{"title":"When Forgetting to Say Bismillāh Before Eating","arabic":"بِسْمِ اللهِ أَوَّلَهُ وَآخِرَهُ","english":"In the name of Allah at its beginning and its end.","reference":"The Prophet ﷺ taught this when he forgot to begin with Bismillāh. (Sunan Abī Dāwūd 3767 – Ṣaḥīḥ)"},{"title":"For Protection from Haram Earnings","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَأْثَمِ وَالْمَغْرَمِ","english":"O Allah, I seek refuge in You from laziness, old age, sin, and debt.","reference":"Ṣaḥīḥ al-Bukhārī 6367 (Debt often leads to Haram means)."}]},{"chapterId":11,"duas":[{"title":"For a Righteous Spouse & Offspring","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا","english":"Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous.","reference":"Qur\'an, Al-Furqān 25:74."},{"title":"For Protection of Family","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي","english":"O Allah, I ask You for forgiveness and well-being in this world and the Hereafter. O Allah, I ask You for forgiveness and well-being in my religion, my worldly affairs, my family, and my wealth.","reference":"Sunan Abī Dāwūd 5074 – Ṣaḥīḥ."},{"title":"For Marital Harmony","arabic":"اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا","english":"O Allah, bring our hearts together and reconcile between us.","reference":"Inspired by the general duʿāʾ for reconciliation in Qur\'an (Al-Anfāl 8:63) and Prophetic practice."}]},{"chapterId":12,"duas":[{"title":"For Unity & Forgiveness Within the Ummah","arabic":"رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ","english":"Our Lord, forgive us and our brothers who preceded us in faith, and do not place in our hearts any resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.","reference":"Qur\'an, Al-Ḥashr 59:10."},{"title":"For Protection from Trials Affecting the Community","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ","english":"O Allah, I seek refuge in You from the trials of life and death.","reference":"Ṣaḥīḥ al-Bukhārī 6368."},{"title":"When Seeing a Muslim Brother/Sister After Time","arabic":"أَحْيَاكَ اللَّهُ وَأَحْيَانَا","english":"May Allah give you life and give us life.","reference":"Al-Adab al-Mufrad."}]},{"chapterId":13,"duas":[{"title":"For Steadfastness and Guidance","arabic":"يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ","english":"O Turner of hearts, make my heart steadfast upon Your religion.","reference":"The Prophet ﷺ recited this frequently. (Sunan at-Tirmidhi 3522 - Hasan)"},{"title":"For Beneficial Knowledge and Growth","arabic":"اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا","english":"O Allah, benefit me with what You have taught me, teach me what will benefit me, and increase me in knowledge.","reference":"Reported from the Prophet ﷺ as a comprehensive du\'a for knowledge. (Sunan Ibn Majah 251)"},{"title":"For a Good Ending (Husn al-Khatimah)","arabic":"اللَّهُمَّ اجْعَلْ خَيْرَ عُمْرِي آخِرَهُ وَخَيْرَ عَمَلِي خَوَاتِمَهُ وَخَيْرَ أَيَّامِي يَوْمَ أَلْقَاكَ","english":"O Allah, make the best of my life its end, the best of my deeds their concluding ones, and the best of my days the day I meet You.","reference":"Authentic du\'a from the Sunnah. (Al-Sahihah 1847)"}]},{"chapterId":14,"duas":[{"title":"For Protection from the Punishment of the Grave","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ جَهَنَّمَ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ","english":"O Allah, I seek refuge in You from the punishment of the grave, from the punishment of Hellfire, from the trials of life and death, and from the evil of the trial of the False Messiah.","reference":"Sahih Muslim 588."},{"title":"When Visiting Graveyards","arabic":"السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ","english":"Peace be upon you, O inhabitants of the graves, from among the believers and Muslims. Indeed, we will, if Allah wills, join you. We ask Allah for well-being for us and for you.","reference":"Sahih Muslim 975."},{"title":"For a Good Ending (Husn al-Khatimah)","arabic":"اللَّهُمَّ اخْتِمْ لَنَا بِحُسْنِ الْخَاتِمَةِ، وَلَا تَخْتِمْ عَلَيْنَا بِسُوءِ الْخَاتِمَةِ","english":"O Allah, seal our lives with a good ending, and do not seal our lives with an evil ending.","reference":"Quran Al Imran 3:8; Sahih al-Bukhari 6607."}]},{"chapterId":15,"duas":[{"title":"For Paradise & Protection from Hell","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","english":"Our Lord, give us in this world good and in the Hereafter good, and protect us from the punishment of the Fire.","reference":"Quran Al-Baqarah 2:201."},{"title":"For the Highest Level of Paradise","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ، وَأَعُوذُ بِكَ مِنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ","english":"O Allah, I ask You for Paradise and whatever brings me closer to it in speech or action. And I seek refuge in You from Hell and whatever brings me closer to it in speech or action.","reference":"Sunan Ibn Majah 3846 – Sahih."},{"title":"When Fearing One\'s Sins","arabic":"اللَّهُمَّ اجْعَلْنِي فِي الدُّنْيَا عَلَى الْحَقِّ، وَفِي الْآخِرَةِ عَلَى الْحَقِّ، وَاجْعَلْنِي مِنْ أَهْلِ السَّعَادَةِ فِي الدُّنْيَا وَالْآخِرَةِ","english":"O Allah, make me uphold the truth in this world and the Hereafter, and make me among the people of happiness in this world and the Hereafter.","reference":"Based on the Prophet\'s teaching to seek guidance in both worlds."}]}]');

/***/ }),

/***/ "./resources/components/vue/data/faqs.json":
/*!*************************************************!*\
  !*** ./resources/components/vue/data/faqs.json ***!
  \*************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapter":"Islamic Foundation","faqs":[{"id":"islamic-foundation-1","title":"What is the Islamic foundation?","body":"<p>The Islamic foundation is rooted in belief in Allah, the prophets, the Quran, and the practices that keep you connected to Him every day.</p>"},{"id":"islamic-foundation-2","title":"How do I begin learning the basics of Islam?","body":"<p>Start with the Shahada, learn short duas, read a beginner\'s Quran translation, and ask trusted teachers for guidance in bite-sized steps.</p>"},{"id":"islamic-foundation-3","title":"Why is intention important in Islam?","body":"<p>Because Allah judges deeds by intentions, making a sincere purpose turns routines into acts of worship.</p>"},{"id":"islamic-foundation-4","title":"Which early practices help build a strong foundation?","body":"<p>Regular prayer, brief Quran reflections, consistent charity, and daily dua keep the foundations alive.</p>"},{"id":"islamic-foundation-5","title":"How can I keep the foundation steady when life gets busy?","body":"<p>Set reminders, combine new habits with existing ones, and stay connected to a community that encourages you.</p>"}],"chapterId":1},{"chapter":"Islamic Beliefs","faqs":[{"id":"islamic-beliefs-1","title":"What are the core beliefs of Islam?","body":"<p>The core beliefs include belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree.</p>"},{"id":"islamic-beliefs-2","title":"How does belief in Allah’s oneness affect daily life?","body":"<p>Understanding Tawhid encourages you to turn to Allah alone for help, worship, and trust in every situation.</p>"},{"id":"islamic-beliefs-3","title":"Why do Muslims believe in angels and divine books?","body":"<p>They are part of the unseen that Allah revealed to guide humanity and remind us that we are accountable.</p>"},{"id":"islamic-beliefs-4","title":"What role do prophets play in Islamic belief?","body":"<p>Prophets transmit Allah’s message, model obedience, and teach mercy Muhammad is the final messenger to all people.</p>"},{"id":"islamic-beliefs-5","title":"How can I strengthen my belief when doubts arise?","body":"<p>Study reliable sources, speak to wise mentors, maintain regular worship, and make dua for increased certainty.</p>"}],"chapterId":2},{"chapter":"Islamic Pillars","faqs":[{"id":"islamic-pillars-1","title":"What are the Five Pillars of Islam and why do they matter?","body":"<p>The pillars Shahada, Salah, Zakat, Sawm, and Hajj structure a Muslim\'s life around faith, worship, charity, fasting, and pilgrimage.</p>"},{"id":"islamic-pillars-2","title":"How can I memorize the pillars?","body":"<p>Repeat them aloud, relate each pillar to daily actions, and quiz yourself with friends or a study group.</p>"},{"id":"islamic-pillars-3","title":"Can I make up missed duties from the pillars?","body":"<p>Yes, missed prayers, fasts, or zakat can often be made up with sincere repentance and proper planning.</p>"},{"id":"islamic-pillars-4","title":"How do I balance the pillars with modern schedules?","body":"<p>Use reminders, combine worship with pauses in your day, and keep the intention that every effort is for Allah.</p>"},{"id":"islamic-pillars-5","title":"Are intentions part of fulfilling the pillars?","body":"<p>Absolutely each pillar must be performed with a sincere intention to obey Allah for it to count fully.</p>"}],"chapterId":3},{"chapter":"Islamic Quran","faqs":[{"id":"islamic-quran-1","title":"Should I read the Quran in Arabic or translation?","body":"<p>Prefer Arabic when possible, but use a translation to understand the meaning; both together deepen your connection.</p>"},{"id":"islamic-quran-2","title":"How do I get started with Quran recitation?","body":"<p>Begin with short surahs, learn basic pronunciation, and practice slowly with audio and a teacher if possible.</p>"},{"id":"islamic-quran-3","title":"What is a practical way to reflect on the Quran?","body":"<p>Read a verse, pause to ponder its meaning, write a reflection, and apply it to your life that day.</p>"},{"id":"islamic-quran-4","title":"How do I memorize the Quran when I\'m busy?","body":"<p>Set aside a few minutes daily, repeat small portions, and revise even smaller sections to build consistency.</p>"},{"id":"islamic-quran-5","title":"How can I protect my Quran study from distractions?","body":"<p>Study in a quiet space, disconnect from other screens, and set a gentle timer to honor your commitment.</p>"}],"chapterId":4},{"chapter":"Islamic Prophet","faqs":[{"id":"islamic-prophet-1","title":"Who is the Prophet Muhammad (peace be upon him)?","body":"<p>He is the final messenger of Allah, sent with mercy to teach Islam and exemplify compassionate conduct.</p>"},{"id":"islamic-prophet-2","title":"How can I learn about his life?","body":"<p>Read authentic Seerah books or listen to trustworthy lectures that focus on his character, struggles, and guidance.</p>"},{"id":"islamic-prophet-3","title":"Why do Muslims send blessings upon him?","body":"<p>Because Allah commanded it as a sign of love, and sending blessings brings peace to the heart and rewards.</p>"},{"id":"islamic-prophet-4","title":"What lessons from his life help new Muslims?","body":"<p>His patience, humility, prioritizing justice, and kindness toward others provide a blueprint for daily conduct.</p>"},{"id":"islamic-prophet-5","title":"How do I share his mercy with others?","body":"<p>Show compassion, speak the truth gently, and support others so they experience the same hope he taught.</p>"}],"chapterId":5},{"chapter":"Islamic Prayers","faqs":[{"id":"islamic-prayers-1","title":"How many daily prayers are there?","body":"<p>Muslims pray five times each day to stay connected to Allah and punctuate the day with remembrance.</p>"},{"id":"islamic-prayers-2","title":"What is wudu and why is it required?","body":"<p>Wudu is a ritual purification that prepares your body and mind for direct conversation with Allah.</p>"},{"id":"islamic-prayers-3","title":"What do I do if I miss a prayer?","body":"<p>Make it up as soon as you remember with sincerity, and ask Allah to help you stay punctual going forward.</p>"},{"id":"islamic-prayers-4","title":"How can I stay focused during prayer?","body":"<p>Clear your space, slow down your movements, understand what you are saying, and pray with full intention.</p>"},{"id":"islamic-prayers-5","title":"Can I pray alone when there is no mosque nearby?","body":"<p>Yes, prayer is valid anywhere you have purity, a clean space, and devotion, so carry it with you.</p>"}],"chapterId":6},{"chapter":"Islamic Dua Dhikr","faqs":[{"id":"islamic-dua-dhikr-1","title":"What is the difference between dua and dhikr?","body":"<p>Dua is asking Allah for something, while dhikr is remembering Him through phrases of praise and gratitude.</p>"},{"id":"islamic-dua-dhikr-2","title":"When should I make dua and dhikr?","body":"<p>Any time! After prayers, during moments of need, while waking up, or before sleeping Allah loves those who remember Him.</p>"},{"id":"islamic-dua-dhikr-3","title":"How do I memorize a dua?","body":"<p>Repeat it often, write it down, understand its meaning, and attach it to daily moments so it becomes natural.</p>"},{"id":"islamic-dua-dhikr-4","title":"What are short dhikr phrases I can say daily?","body":"<p>Try \'SubhanAllah\', \'Alhamdulillah\', \'Allahu Akbar\', and \'La ilaha illa Allah\' after prayers and during breaks.</p>"},{"id":"islamic-dua-dhikr-5","title":"Can I ask Allah for personal needs while doing dhikr?","body":"<p>Yes, mix praise with personal requests; Allah loves to hear you speak to Him sincerely.</p>"}],"chapterId":7},{"chapter":"Islamic Heart","faqs":[{"id":"islamic-heart-1","title":"What does it mean to purify the heart?","body":"<p>Purifying the heart means removing envy, hatred, and arrogance while growing sincerity, love, and fear of Allah.</p>"},{"id":"islamic-heart-2","title":"How can I keep my heart soft toward Allah?","body":"<p>Recite Quran, make dua, associate with gentle people, and ponder Allah’s mercy regularly.</p>"},{"id":"islamic-heart-3","title":"What signs show a heart is spiritually healthy?","body":"<p>Patience in trials, gratitude in ease, and humility in success are healthy-heart indicators.</p>"},{"id":"islamic-heart-4","title":"How do I deal with sadness or emptiness in my heart?","body":"<p>Reach out to supportive people, increase dhikr, and remember Allah’s plan is wise even when you feel lost.</p>"},{"id":"islamic-heart-5","title":"What does reliance on Allah look like for the heart?","body":"<p>A heart that trusts Allah accepts what happens, stays hopeful for goodness, and keeps working without despair.</p>"}],"chapterId":8},{"chapter":"Islamic Manners","faqs":[{"id":"islamic-manners-1","title":"What is Islamic etiquette?","body":"<p>It means speaking gently, smiling, respecting elders, keeping promises, and serving others with humility.</p>"},{"id":"islamic-manners-2","title":"How should I greet people?","body":"<p>Say \'As-salamu alaykum\' sincerely, shake hands or offer a kind gesture, and ask about their well-being.</p>"},{"id":"islamic-manners-3","title":"How can I practice patience and gratitude daily?","body":"<p>Count your blessings, pause before reacting, and remind yourself that trials build patience.</p>"},{"id":"islamic-manners-4","title":"What does guarding the tongue and gaze look like?","body":"<p>Speak truthfully, avoid gossip, and steer your eyes toward what is pure and respectful.</p>"},{"id":"islamic-manners-5","title":"How do I balance cultural habits with Islamic behavior?","body":"<p>Keep what aligns with Islamic morals, gently release what doesn\'t, and explain your choices with kindness.</p>"}],"chapterId":9},{"chapter":"Islamic Lifestyle","faqs":[{"id":"islamic-lifestyle-1","title":"What makes a lifestyle Islamic?","body":"<p>An Islamic lifestyle centers on halal food, honest work, regular worship, and compassion for others.</p>"},{"id":"islamic-lifestyle-2","title":"How can I prepare halal meals easily?","body":"<p>Plan meals ahead, buy certified ingredients, and share with friends so you can keep it fun.</p>"},{"id":"islamic-lifestyle-3","title":"Should I avoid certain entertainment?","body":"<p>Choose media that uplifts you, avoids immorality, and strengthens your faith, not weakens it.</p>"},{"id":"islamic-lifestyle-4","title":"How do I maintain modesty in dress and behavior?","body":"<p>Dress in a way that feels comfortable yet modest, lower your gaze, and carry yourself with dignity.</p>"},{"id":"islamic-lifestyle-5","title":"How can I add Sunnah routines to my day?","body":"<p>Start with the Prophet’s habits like drinking water in three sips, greeting others, and saying the short morning dhikr.</p>"}],"chapterId":10},{"chapter":"Islamic Family and Marriage","faqs":[{"id":"islamic-family-1","title":"What does Islam say about family ties?","body":"<p>Maintaining kinship, honoring parents, and supporting relatives are major sources of blessing.</p>"},{"id":"islamic-family-2","title":"How do I seek a spouse according to Islamic principles?","body":"<p>Look for piety, character, and mutual compatibility while involving family and keeping intentions pure.</p>"},{"id":"islamic-family-3","title":"What are the rights of spouses in Islam?","body":"<p>Mutual respect, clear communication, financial fairness, and emotional support are emphasized in every marriage.</p>"},{"id":"islamic-family-4","title":"How can parents support a new Muslim in marriage?","body":"<p>Encourage learning, allow space for spiritual growth, and remind them that Allah’s mercy covers every step.</p>"},{"id":"islamic-family-5","title":"How do I raise children with Islamic values?","body":"<p>Model kindness, teach dua, read Quran together, and celebrate small victories as families grow.</p>"}],"chapterId":11},{"chapter":"Islamic Community","faqs":[{"id":"islamic-community-1","title":"Why is community important in Islam?","body":"<p>The ummah reminds us we are not alone, and helping others multiplies rewards.</p>"},{"id":"islamic-community-2","title":"How can I find a supportive Muslim community?","body":"<p>Attend local events, join study circles, and reach out to online groups that match your interests.</p>"},{"id":"islamic-community-3","title":"What if I feel isolated from my community?","body":"<p>Volunteer, invite neighbors for coffee, or start a small circle where you can learn together.</p>"},{"id":"islamic-community-4","title":"How do I build bridges with non-Muslim neighbors?","body":"<p>Share kindness, listen to their stories, and explain your faith through actions more than words.</p>"},{"id":"islamic-community-5","title":"What is my role when someone in the community needs help?","body":"<p>Offer practical support, make dua for them, and encourage others to join you in lifting them up.</p>"}],"chapterId":12},{"chapter":"Islamic Future","faqs":[{"id":"islamic-future-1","title":"What does Islam say about planning for the future?","body":"<p>Islam teaches us to plan responsibly, rely on Allah, and ask for guidance in every decision.</p>"},{"id":"islamic-future-2","title":"How can I set goals guided by Islamic values?","body":"<p>Make goals that benefit your soul, family, and community, then tie them with du\'a and consistent effort.</p>"},{"id":"islamic-future-3","title":"Is it okay to dream big while staying humble?","body":"<p>Yes, Islam encourages excellence when coupled with gratitude and the reminder that Allah controls outcomes.</p>"},{"id":"islamic-future-4","title":"How do I guard against anxiety about tomorrow?","body":"<p>Remember Allah’s mercy, practice dhikr, and break tasks into small steps so you can breathe between plans.</p>"},{"id":"islamic-future-5","title":"How can I leave a positive legacy?","body":"<p>Share beneficial knowledge, instill good habits in others, and support causes that outlive you.</p>"}],"chapterId":13},{"chapter":"Islamic Hereafter","faqs":[{"id":"islamic-hereafter-1","title":"What is the concept of the Hereafter?","body":"<p>The Hereafter includes resurrection, judgment, reward, and consequences based on how we lived.</p>"},{"id":"islamic-hereafter-2","title":"How can I prepare for the Day of Judgment?","body":"<p>Repent sincerely, perform good deeds, and keep your intentions pure for Allah’s pleasure.</p>"},{"id":"islamic-hereafter-3","title":"Why is accountability important?","body":"<p>Knowing that Allah sees every action reminds us to choose kindness and avoid harm.</p>"},{"id":"islamic-hereafter-4","title":"What happens between death and resurrection?","body":"<p>Believers enter Barzakh, a waiting period where the soul experiences comfort or warning until the final day.</p>"},{"id":"islamic-hereafter-5","title":"How does remembrance of the Hereafter change my actions?","body":"<p>It shifts your focus from temporary gains to actions that benefit the soul and others in the long run.</p>"}],"chapterId":14},{"chapter":"Islamic Paradise and Hell","faqs":[{"id":"islamic-paradise-hell-1","title":"What do we know about Paradise and Hell?","body":"<p>The Quran and Sunnah describe Paradise as gardens with rivers, and Hell as a place of purification or punishment for wrongdoing.</p>"},{"id":"islamic-paradise-hell-2","title":"How can I strive for Paradise?","body":"<p>Perform good deeds, seek forgiveness, serve others, and keep your heart soft with gratitude.</p>"},{"id":"islamic-paradise-hell-3","title":"Can Allah forgive any sin?","body":"<p>Yes, Allah forgives all sins when you turn to Him with sincere repentance and resolve not to return.</p>"},{"id":"islamic-paradise-hell-4","title":"What kind of people does the Quran mention as entering Paradise?","body":"<p>Those who are humble, patient, charitable, truthful, and who call others to good with wisdom are promised mercy.</p>"},{"id":"islamic-paradise-hell-5","title":"How do I avoid actions that lead to Hell?","body":"<p>Stay away from major sins, guard your tongue, keep your prayers, and seek Allah’s help when temptation arrives.</p>"}],"chapterId":15}]');

/***/ }),

/***/ "./resources/components/vue/data/homework.json":
/*!*****************************************************!*\
  !*** ./resources/components/vue/data/homework.json ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"homework":["Spend 10 minutes reflecting on what Tawheed means for your daily decisions.","Journal three moments when you were tempted to compromise and how Tawheed can anchor you.","Share one insight with a study partner or mentor and ask for their perspective.","Memorize one dua from today\'s lesson and repeat it before sleep."]},{"chapterId":2,"homework":["Recite the Shahada slowly 20 times, contemplating each word.","List five actions you can remove this week that distract from worship.","Listen to a trusted lecture about the Articles of Faith and summarize it.","Practice dua before every salah asking for increased iman."]},{"chapterId":3,"homework":["Track your five daily prayers for seven days in a notebook.","Teach a family member one pillar of prayer this week.","Focus on wudu etiquette before each prayer today.","Read about a sahabi known for prayer and note their discipline."]},{"chapterId":4,"homework":["Review the names of Allah mentioned in the chapter and pick three to memorize.","Write a short reflection on how revelation changes your perspective.","Recite one ayah from the Quran with translation each day.","Visit a recitation circle or watch a tafsir for deeper context."]},{"chapterId":5,"homework":["Pick a hadith about the Prophet ﷺ and journal what it teaches you.","Memorize the short biography of the Prophet from the lesson.","Share a story from the Prophet’s life with someone and ask for their take.","Set a reminder to read one paragraph from the Seerah every evening."]},{"chapterId":6,"homework":["Create a dua list for each prayer time and rotate through it daily.","Record today’s salah start to finish and note improvements.","Pair up with a friend to encourage consistency in prayer.","Compile five reminders that keep you mindful of Allah during the day."]},{"chapterId":7,"homework":["Memorize one short dua and explain its meaning to someone else.","Make a daily dhikr plan tied to waking, meals, and sleep.","Record the names of Allah you repeat most and why they matter.","Share a dua with another person and ask them to pray for you."]},{"chapterId":8,"homework":["Perform soft-hearted dhikr for five minutes before bedtime each night.","List one habit to remove pride and replace it with humility.","Do a compassion check: reach out to someone you’ve been distant with.","Write a gratitude letter framed around Allah’s blessings."]},{"chapterId":9,"homework":["Serve someone in your community with a small act of kindness.","Reflect on gratitude and list three people you can thank this week.","Practice patience when you feel short-tempered and note triggers.","Practice forgiveness and write a dua asking for a soft heart."]},{"chapterId":10,"homework":["Audit your media: delete or limit one thing that pulls you away from focus.","Set a weekly halal goal (e.g., meal prep, call a relative, read).","Plan one intentional moment of silence to reconnect with Allah.","Choose a healthy habit for the body and soul (fasting, charity, etc.)."]},{"chapterId":11,"homework":["Host a family circle that includes dua, gratitude, and salah talk.","Write down two ways to show mercy to each household member this week.","Plan an act of service for a relative or parent with sincerity.","Teach a short hadith about kindness to your family."]},{"chapterId":12,"homework":["Attend a local community event or share a helpful resource.","Reach out to support someone who needs a listening ear.","Organize a short session to practice dua and reminders together.","Volunteer one hour for your neighborhood or mosque."]},{"chapterId":13,"homework":["Plan a personal growth tracker for the next 30 days.","Write a dua asking for consistent growth and review it nightly.","Choose one area (worship, character, knowledge) and set micro-goals.","Reflect on progress each Friday and note lessons learned."]},{"chapterId":14,"homework":["Journal what a reminder of the Hereafter shifts for your priorities.","Perform muhasabah for three nights, noting gratitude and actions to improve.","Give charity with the intention of gaining extended reward after passing.","Share a dua for mercy on the Day of Judgment with someone you trust."]},{"chapterId":15,"homework":["Visualize Paradise while reciting a verse, then jot down how it felt.","Read a Quranic warning of Hell and list three actions you will avoid.","Ask Allah for protection from the Fire after each prayer for one week.","Invite a friend to discuss what motivates you about the hereafter."]}]');

/***/ }),

/***/ "./resources/components/vue/data/keyInsights.json":
/*!********************************************************!*\
  !*** ./resources/components/vue/data/keyInsights.json ***!
  \********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"chapter":"The Foundation: Tawheed – The Eternal Truth That Created You and Will Resurrect You","keyInsights":["Ibn Taymiyyah: Tawheed is the purpose of creation, \'I did not create jinn and mankind except to worship Me. (Adh-Dhāriyāt 51:56)\'","Imam al-Bukhārī: Began his Ṣaḥīḥ with The Book of Revelation followed by The Book of Faith – showing priority of creed.","Muhammad ibn \'Abd al-Wahhāb: Wrote Kitāb at-Tawheed as first text – the foundation before all other sciences.","Imam al-Ghazālī: True knowledge begins with knowing Allāh – this is the noblest knowledge.","Contemporary Scholars: Many misconceptions arise from not understanding Tawheed properly before delving into other aspects of Islam."]},{"chapterId":2,"chapter":"The Beliefs: The Six Pillars of Iman – Your Invisible Reality Stronger Than Steel","keyInsights":["The Relationship: Īmān (belief in the heart) is the root, Islām (outward submission) is the branch, and Iḥsān (spiritual excellence) is the fruit.","Gradual Revelation: The articles of faith were revealed in Makkah, focusing on purifying belief, while most laws were revealed later in Madīnah.","A Complete Worldview: These beliefs answer life’s core questions: Who is our Creator? Why are we here? What happens after death?","Source of Tranquillity: Belief in al-Qadar brings immense peace, as a Muslim knows nothing happens except by Allāh’s will and wisdom.","Motivation for Action: Belief in the Last Day and accountability is the primary driver for righteousness and avoiding evil."]},{"chapterId":3,"chapter":"The Pillars: The Five Pillars – Your Direct Phone Line to Allah","keyInsights":["Imam al-Ghazālī: The pillars train the body, wealth, time, and soul each purifying a different aspect of human existence.","Ibn al-Qayyim: Shahādah is the root, ṣalāh is the connection, zakāh is purification, ṣawm is spiritual training, Hajj is the ultimate congregation.","Imam Nawawī: The order in the ḥadīth indicates priority faith first, then bodily worship, then financial, then annual, then once-in-a-lifetime.","Ibn Taymiyyah: The pillars collectively establish both individual piety (‘ubūdiyyah) and communal justice (‘adl).","Contemporary Scholars: These pillars are divinely prescribed psychological and social systems for human flourishing, not mere rituals."]},{"chapterId":4,"chapter":"The Quran: Heartbeat of Revelation and Living Library","keyInsights":["A Direct Connection: Reciting the Qur\'an is speaking to Allah, and listening to it is Allah speaking to you. The Prophet ﷺ said: \\"Whoever is occupied with the Qur\'an and My remembrance from asking Me, I will give him the best of what I give to those who ask.\\" (Jāmiʿ at-Tirmidhī 2926 - Ḥasan)","Intercession on Judgment Day: The Qur\'an will intercede for its companions (those who recited and acted upon it). (Ṣaḥīḥ Muslim 804)","Healing for the Heart: Ibn al-Qayyim stated that the Qur\'an is the complete healing for all diseases of the heart doubt, hypocrisy, and misguidance.","Ten Rewards per Letter: The Prophet ﷺ said: \\"Whoever recites a letter from the Book of Allah, he will be credited with a good deed, and a good deed gets a ten-fold reward...\\" (Jāmiʿ at-Tirmidhī 2910)","Source of Tranquillity: The true sweetness of faith is found in loving the Qur\'an and finding peace in its recitation and remembrance."]},{"chapterId":5,"chapter":"The Prophet: Muhammad ﷺ, Mirror of Mercy","keyInsights":["A Mercy to All: He was sent as a mercy to the worlds (Al-Anbiya 21:107).","The Walking Qur\'an: Aishah (RA) described his character as the Qur\'an (Sahih Muslim 746a).","Patience Personified: His roughly thirteen years in Makkah teach perseverance in faith amid mockery, isolation, and harm.","Leadership in Madinah: He built a community grounded in worship, justice, consultation, and compassion.","Legacy of Guidance: He left the Qur\'an and his Sunnah as the primary sources of guidance for the Ummah."]},{"chapterId":6,"chapter":"The Prayer: Salah as Your Soul\'s Sync","keyInsights":["Ibn al-Qayyim: Salah is both a physical and spiritual journey: the body moves while the heart rises in remembrance, gratitude, and submission. (Quran 29:45; Sahih al-Bukhari 405)","Al-Ghazali: The five prayers are like a river flowing past your door five times daily, washing away sins regularly. (Sahih al-Bukhari 528)","Ibn Taymiyyah: The essence of salah is servitude (ubudiyyah); every movement teaches humility before the Creator. (Quran 51:56)","Contemporary scholars: In the digital age, protecting prayer times from notifications and work demands is a new form of discipline. (Quran 4:103; Sahih al-Bukhari 552)","Islamic psychology: The structured, mindful movements of salah reduce stress and increase focus, echoing the tranquility of remembrance. (Quran 13:28)"]},{"chapterId":7,"chapter":"Dua and Dhikr, Weapons of the Heart","keyInsights":["Direct Connection: Dhikr and Duʿāʾ are not mere rituals; they are intimate conversations with Allah that nurture the soul\'s relationship with its Creator.","Weapon of the Believer: The Prophet ﷺ called duʿāʾ \\"the weapon of the believer\\" (Al-Muʿjam al-Awsaṭ 6190 - Ḥasan). It is your primary tool against difficulties.","Protection & Provision: Consistent morning/evening adhkār act as a spiritual fortress. They are not just for reward but for real-world protection and provision.","Gratitude in Disguise: When Allah delays a response to your duʿāʾ, it is a form of His care. He knows the right time and what is truly best for you.","The Best Dhikr: The best form of dhikr, after the Qur\'an, is \\"Lā ilāha illallāh\\" (There is no god but Allah). (Sunan At-Tirmidhi 3383)"]},{"chapterId":8,"chapter":"Purifying the Heart: Softness, Humility, and Focus","keyInsights":["Ibn al-Qayyim: The heart is like a fortress; shayṭān besieges it, and only constant dhikr is its guard.","Al-Ghazālī: Diseases begin with a whisper (waswasa), become a   (khāṭir), then a desire (shahwah), then resolve (ʿazm), then action.","Ibn Taymiyyah: The greatest jihad is fighting one’s own soul (nafs) to obey Allah.","Ibn Rajab al-Ḥanbalī: The purified heart recognizes blessings in trials and remains grateful.","Contemporary Scholars: Social media often accelerates heart diseases envy, showing off, and wasting time."]},{"chapterId":9,"chapter":"The Manners: Adab That Elevates Every Encounter","keyInsights":["Imam al-Ghazālī: Manners precede knowledge, as a container must be clean before filling it with water.","Ibn al-Qayyim: Character is the fruit of knowledge if it doesn\'t improve your manners, your knowledge is deficient.","Al-Nawawī: The comprehensive book Riyāḍ aṣ-Ṣāliḥīn arranges hadith by manners to show Islam as a complete way of life.","Contemporary Scholars: Modern social media requires revived adab think before posting, avoid arguments, and protect privacy.","Islamic Psychology: Good manners directly contribute to mental health by reducing conflict and building positive relationships."]},{"chapterId":10,"chapter":"The Lifestyle: Halal Living, Habits, and Harmony","keyInsights":["Ibn al-Qayyim: The body nourished by Haram becomes inclined to disobedience; the heart darkens, and supplications are hindered.","Al-Ghazālī: Seeking Halal is an act of worship equal to jihad when done to protect one\'s faith and family from impurity.","Modern Scholars: Globalization requires increased diligence check ingredients, cross-contamination risks, and ethical sourcing (e.g., fair trade).","Economic Principle: Islamic finance isn\'t just interest-free; it promotes risk-sharing, asset-backing, and social justice.","Spiritual Impact: Consuming Halal increases Barakah (blessing) in time, health, and wealth less becomes sufficient."]},{"chapterId":11,"chapter":"Family, Marriage, Mercy, Dialogue, and Legacy","keyInsights":["Ibn al-Qayyim: The family is a small kingdom its success depends on justice, consultation, and mutual fulfillment of rights.","Al-Ghazālī: Marital intimacy is not merely physical; its spiritual dimension transforms it into an act of worship that earns reward.","Modern Psychologists: Islamic family principles (clear roles, conflict resolution, extended family support) correlate with lower divorce rates and better mental health.","Contemporary Scholars: The crisis of modern family life stems from abandoning Islamic guidelines while adopting individualistic, secular models.","Islamic History: The Prophet\'s ﷺ household demonstrated perfect balance justice among wives, tenderness with children, and respect for family ties."]},{"chapterId":12,"chapter":"The Community: Building Ummah, Support, and Uplift","keyInsights":["Ibn Taymiyyah: The strength of the Ummah lies in its unity upon the Qur\'an and Sunnah; division is a punishment from Allah.","Al-Ghazālī: Brotherhood has three levels: general (all humans), specific (all Muslims), and special (righteous companions who love for Allah\'s sake).","Ibn al-Qayyim: The health of the community is diagnosed by its practice of enjoining good and forbidding evil; silence in the face of wrong is a disease.","Modern Scholars: Social media can fracture the Ummah through polemics or unite it through shared causes; intention and Islamic etiquette (adab) are key.","Islamic History: The Constitution of Madinah established the first multi-faith community under Islamic rule with guaranteed rights for all, setting the model for pluralistic societies."]},{"chapterId":13,"chapter":"The Future: Continuous Growth and Legacy","keyInsights":["Ibn al-Qayyim: Spiritual growth is not linear; it has peaks and valleys. The key is never to stop moving forward, even with small steps. (Qur\'an 94:5-6; Sahih al-Bukhari 6465)","Al-Ghazali: The soul is like a fertile land - if not cultivated with good deeds, weeds of sin will overgrow it. Continuous cultivation is essential. (Qur\'an 91:9-10; Sahih Muslim 2722)","Ibn Taymiyyah: The most dangerous enemy to growth is self-satisfaction (\'ujb) - being pleased with one\'s own deeds and looking down on others. (Qur\'an 53:32; Sahih Muslim 91a)","Contemporary Scholars: In the digital age, continuous growth requires intentional detachment from distractions and curated consumption of beneficial content. (Qur\'an 23:3; Jami\' at-Tirmidhi 2317)","Islamic Psychology: Spiritual practices (prayer, gratitude, dhikr) rewire the brain for resilience, purpose, and contentment - validating their psychological benefits. (Qur\'an 13:28; Sahih Muslim 2700a)"]},{"chapterId":14,"chapter":"Hereafter Realities: Death, Resurrection, and Mercy","keyInsights":["Ibn al-Qayyim: The purpose of life is to prepare for the Hereafter. Whoever neglects this preparation is like a traveler without provisions. (Quran Al-Hashr 59:18; Sahih al-Bukhari 6416)","Al-Ghazali: The greatest loss is arriving at the Day of Judgment empty-handed, having traded eternal pleasure for temporary desires. (Quran Al Imran 3:185; Sunan at-Tirmidhi 2459)","Ibn Taymiyyah: The believer\'s relationship with death is unique; they prepare for it as if dying tomorrow, yet work for this life as if living forever. (Quran Al-Hadid 57:20; Sahih al-Bukhari 6416)","Contemporary Scholars: Modern distractions make Hereafter awareness more difficult but also more essential. (Quran Al-Mu\'minun 23:3; Sahih al-Bukhari 6412)","Islamic Psychology: Regular remembrance of death (dhikr al-mawt) reduces anxiety about worldly matters and increases purpose-driven living. (Quran Ar-Ra\'d 13:28; Sunan at-Tirmidhi 2307)"]},{"chapterId":15,"chapter":"Paradise and Hell: Rewards, Warnings, and Motivation","keyInsights":["Ibn al-Qayyim: The delights of Paradise are entirely new creations of bliss beyond current human comprehension. (Quran 32:17; Sahih al-Bukhari 3244)","Al-Ghazali: Fear of Hell should match one\'s sins and hope for Paradise should match one\'s good deeds, keeping balance between warning and mercy. (Quran 15:49-50; Sahih Muslim 2877)","Ibn Taymiyyah: The eternal nature of Hell for disbelievers is a consequence of divine justice for persistent rejection. (Quran 4:168-169; Quran 33:64-65; Sahih al-Bukhari 6545)","Modern Scholarship: Contemporary distractions weaken Hereafter awareness, so consistent reminders of Paradise and Hell are more necessary than ever. (Quran 59:18; Sunan at-Tirmidhi 2307)","Islamic Psychology: Regular contemplation of Paradise nurtures optimism and purpose, while remembrance of Hell strengthens moral restraint. (Quran 13:28; Sahih Muslim 2822)"]}]');

/***/ }),

/***/ "./resources/components/vue/data/missions.json":
/*!*****************************************************!*\
  !*** ./resources/components/vue/data/missions.json ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"1":"Memorize the meaning of the Shahada in your native language.","2":"Look at the sky tonight and reflect on the Creator\'s power.","3":"Learn the names of the 5 daily prayers.","4":"Listen to Surah Al-Fatiha with translation.","5":"Read one story about the Prophet\'s kindness.","6":"Practice the Wudu steps at your sink without water first.","7":"Greet 3 people with \'Assalamu Alaikum\' today.","8":"Check the ingredients of your favorite snack.","9":"Find one local mosque on Google Maps.","10":"Make a list of 3 goals for your next month."}');

/***/ }),

/***/ "./resources/components/vue/data/nextStepPrompts.json":
/*!************************************************************!*\
  !*** ./resources/components/vue/data/nextStepPrompts.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"streakThreshold":7,"quizPassed":true,"title":"Lean into the streak","description":"Seven days of consistency unlocked. Review today’s dua and share a short reflection so the learning sticks.","actionLabel":"Share reflection","actionLinkType":"share","note":"Sharing keeps the streak joyful and invites others."},{"streakThreshold":3,"quizPassed":true,"title":"Keep the momentum","description":"You aced the quiz—pair the insight with the primary dua on today’s chapter and repeat it aloud.","actionLabel":"Repeat dua","actionLinkType":"repeat","note":"Weight the insight with a bit of vocal repetition for recall."},{"streakThreshold":0,"quizPassed":false,"title":"Revisit & try again","description":"Circle back to the most confusing section, simmer on the example, then take the quiz again to turn doubt into mastery.","actionLabel":"Review section","actionLinkType":"review","note":"Pausing before retrying keeps the streak honest and empowers the next attempt."}]');

/***/ }),

/***/ "./resources/components/vue/data/onboarding.json":
/*!*******************************************************!*\
  !*** ./resources/components/vue/data/onboarding.json ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"steps":[{"title":"Meet the Foundations","description":"Slowly read each section so the names of Allah, the Shahada, and the meanings sink in."},{"title":"Capture a Dua","description":"Repeat or write down a dua shared in the lesson to keep the words close."},{"title":"Practice the quiz","description":"Answer two questions correctly to prove the lesson is alive in your heart."}]},{"chapterId":2,"steps":[{"title":"Slow the read","description":"Note how each article of faith connects to Allah’s mercy and plan for you."},{"title":"Share a truth","description":"Speak one insight aloud or teach it to someone you trust."},{"title":"Try the quiz","description":"Two right answers mean you’re ready to take the next step."}]},{"chapterId":3,"steps":[{"title":"Feel the rhythm","description":"Track each pillar and imagine how it fits into your daily life."},{"title":"Practice gratitude","description":"Say a short thanks for one pillar as you recite the dua."},{"title":"Answer the quiz","description":"Two correct replies unlock the next chapter."}]},{"chapterId":4,"steps":[{"title":"Embrace revelation","description":"Breathe while you read about the Quran and let its guidance calm you."},{"title":"Write the words","description":"Copy a verse or reminder to keep practicing."},{"title":"Take the quiz","description":"Two right answers show the message is sticking."}]},{"chapterId":5,"steps":[{"title":"Follow the Sunnah","description":"Read the stories of the Prophet ﷺ in the sections provided."},{"title":"Repeat a lesson","description":"Describe one habit you will apply today."},{"title":"Quiz gently","description":"Answer two questions and celebrate the correct choices."}]},{"chapterId":6,"steps":[{"title":"Feel the prayer","description":"Picture yourself in each step of Salah while you read."},{"title":"Soft reminder","description":"Share a dua for ease before the next prayer."},{"title":"Test with care","description":"Two correct quiz answers let you move forward."}]},{"chapterId":9,"steps":[{"title":"Open your heart","description":"Let the manners shine through every paragraph."},{"title":"Speak kindly","description":"Repeat one kind action you will practice."},{"title":"Quiz & move","description":"Answer two questions correctly to unlock the next chapter."}]},{"chapterId":10,"steps":[{"title":"Decide halal","description":"Let each section show you what is pure and peaceful."},{"title":"Make a vow","description":"Choose one small habit to keep halal today."},{"title":"Answer the quiz","description":"Two correct answers mean you understand this lesson."}]},{"chapterId":12,"steps":[{"title":"Remember community","description":"See how support and unity glow across the chapters."},{"title":"Show care","description":"Plan one small way to help someone near you."},{"title":"Quiz joyfully","description":"Two correct replies unlock the next chapter."}]},{"chapterId":13,"steps":[{"title":"Dream forward","description":"Read how continual growth keeps you steady."},{"title":"Set intent","description":"Pick one action that moves you toward the future."},{"title":"Complete the quiz","description":"Two correct answers mean the journey continues."}]}]');

/***/ }),

/***/ "./resources/components/vue/data/premiumResources.json":
/*!*************************************************************!*\
  !*** ./resources/components/vue/data/premiumResources.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"title":"Islamic Resource Library","desc":"A searchable portal of websites, houses of knowledge, and scholarly write-ups.","href":"https://example.com/resource-library"},{"title":"Guided YouTube Series","desc":"Synchronized playlists covering each pillar with tajweed, tafsir, and scenario practice.","href":"https://www.youtube.com/playlist?list=PLpremium"},{"title":"Articles & Reflections","desc":"Monthly essays that turn complex aqeedah topics into relatable stories.","href":"https://example.com/articles"},{"title":"Essential Bookshelf","desc":"Downloadable PDFs and print-ready guides for their most transformative chapters.","href":"https://example.com/bookshelf"}]');

/***/ }),

/***/ "./resources/components/vue/data/quizzes.json":
/*!****************************************************!*\
  !*** ./resources/components/vue/data/quizzes.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"questions":[{"question":"Which statement is the Shahada?","options":["La ilaha illa Allah","Allahu Akbar","Subhan Allah","Bismillah"],"answer":"La ilaha illa Allah","explanation":"Which statement is the Shahada. The phrase \'La ilaha illa Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Tawheed al-Rububiyyah affirms which fact about Allah?","options":["His Lordship over creation","His reward","His prophets","His angels"],"answer":"His Lordship over creation","explanation":"Tawheed al-Rububiyyah affirms which fact about Allah. The phrase \'His Lordship over creation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Tawheed al-Uluhiyyah insists that worship belongs to?","options":["Allah alone","Prophets","Saints","Nature"],"answer":"Allah alone","explanation":"Tawheed al-Uluhiyyah insists that worship belongs to. The phrase \'Allah alone\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Belief in Allah\'s names and attributes is called?","options":["Tawheed al-Asma wa Sifat","Tawheed al-Rububiyyah","Tawheed al-Uluhiyyah","Shirk"],"answer":"Tawheed al-Asma wa Sifat","explanation":"Belief in Allah\'s names and attributes is called. The phrase \'Tawheed al-Asma wa Sifat\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Which act contradicts Tawheed?","options":["Worshiping idols","Fasting","Giving charity","Praying on time"],"answer":"Worshiping idols","explanation":"Which act contradicts Tawheed. The phrase \'Worshiping idols\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"What does the Arabic word \'shirk\' mean?","options":["Associating partners with Allah","Studying the Quran","Helping parents","Giving charity"],"answer":"Associating partners with Allah","explanation":"What does the Arabic word \'shirk\' mean. The phrase \'Associating partners with Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Reciting the Shahada daily helps a believer to?","options":["Keep Allah\'s oneness present","Gain wealth quickly","Avoid talking to others","Win every argument"],"answer":"Keep Allah\'s oneness present","explanation":"Reciting the Shahada daily helps a believer to. The phrase \'Keep Allah\'s oneness present\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"The primordial covenant taught that souls testified to?","options":["Allah\'s oneness","Worldly success","Family ties","Social media fame"],"answer":"Allah\'s oneness","explanation":"The primordial covenant taught that souls testified to. The phrase \'Allah\'s oneness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Which habit protects Tawheed in day to day life?","options":["Sincere dua to Allah alone","Gossiping about friends","Ignoring prayer","Competitiveness"],"answer":"Sincere dua to Allah alone","explanation":"Which habit protects Tawheed in day to day life. The phrase \'Sincere dua to Allah alone\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Tawheed urges us to rely on Allah instead of?","options":["Created beings","The Quran","Prophets","Our parents"],"answer":"Created beings","explanation":"Tawheed urges us to rely on Allah instead of. The phrase \'Created beings\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Which Quranic verse begins with a call to remember Allah\'s oneness?","options":["Qul Huwa Allahu Ahad","Al-Fatiha","Yaseen","An-Nas"],"answer":"Qul Huwa Allahu Ahad","explanation":"Which Quranic verse begins with a call to remember Allah\'s oneness. The phrase \'Qul Huwa Allahu Ahad\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"To guard Tawheed, Muslims avoid giving divine attributes to?","options":["Human idols","Books","Mosques","Angels"],"answer":"Human idols","explanation":"To guard Tawheed, Muslims avoid giving divine attributes to. The phrase \'Human idols\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which action shows belief in Allah\'s attributes?","options":["Reciting the Names of Allah","Watching TV","Sleeping late","Eating fast food"],"answer":"Reciting the Names of Allah","explanation":"Which action shows belief in Allah\'s attributes. The phrase \'Reciting the Names of Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Under Tawheed, which description applies only to Allah?","options":["Creator","Teacher","Neighbor","Friend"],"answer":"Creator","explanation":"Under Tawheed, which description applies only to Allah. The phrase \'Creator\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"What should the intention be before every act of worship to keep Tawheed alive?","options":["For Allah\'s pleasure","To impress people","To gain fame","To compete with others"],"answer":"For Allah\'s pleasure","explanation":"What should the intention be before every act of worship to keep Tawheed alive. The phrase \'For Allah\'s pleasure\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Which attitude best demonstrates Tawheed when making decisions?","options":["Seeking Allah\'s guidance","Following rumors","Ignoring prayer","Copying friends"],"answer":"Seeking Allah\'s guidance","explanation":"Which attitude best demonstrates Tawheed when making decisions. The phrase \'Seeking Allah\'s guidance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Tawakkul refers to.","options":["Trusting Allah","Speaking loudly","Showing off","Competing with others"],"answer":"Trusting Allah","explanation":"Tawakkul refers to. The phrase \'Trusting Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Renewing your intention before worship keeps focus on.","options":["Allah","People","Wealth","Entertainment"],"answer":"Allah","explanation":"Renewing your intention before worship keeps focus on. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"To avoid shirk, we should never attribute Allah\'s  to others.","options":["Attributes","Stories","Jobs","Debts"],"answer":"Attributes","explanation":"To avoid shirk, we should never attribute Allah\'s  to others. The phrase \'Attributes\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"When fear arises, Tawheed reminds us to rely on.","options":["Allah","Luck","Popularity","Money"],"answer":"Allah","explanation":"When fear arises, Tawheed reminds us to rely on. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":2,"questions":[{"question":"Belief in Allah is which article of faith?","options":["First","Second","Third","Fourth"],"answer":"First","explanation":"Belief in Allah is which article of faith. The phrase \'First\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Belief in divine decree (Qadar) corresponds to which article?","options":["Second","First","Third","Fifth"],"answer":"Second","explanation":"Belief in divine decree (Qadar) corresponds to which article. The phrase \'Second\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Belief in the revealed books is which article?","options":["Third","Fourth","First","Sixth"],"answer":"Third","explanation":"Belief in the revealed books is which article. The phrase \'Third\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Belief in prophets is which article?","options":["Fifth","Fourth","Second","Third"],"answer":"Fifth","explanation":"Belief in prophets is which article. The phrase \'Fifth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Belief in angels is which article?","options":["Fourth","First","Second","Third"],"answer":"Fourth","explanation":"Belief in angels is which article. The phrase \'Fourth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Belief in the Day of Judgment is which article?","options":["Sixth","Fifth","Fourth","Second"],"answer":"Sixth","explanation":"Belief in the Day of Judgment is which article. The phrase \'Sixth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Which of the following is a revealed book?","options":["Quran","Epic poem","Novel","Myth"],"answer":"Quran","explanation":"Which of the following is a revealed book. The phrase \'Quran\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"The Quran was revealed to which prophet?","options":["Muhammad (peace be upon him)","Moses","Jesus","Noah"],"answer":"Muhammad (peace be upon him)","explanation":"The Quran was revealed to which prophet. The phrase \'Muhammad (peace be upon him)\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Angels are created from what?","options":["Light","Fire","Water","Clay"],"answer":"Light","explanation":"Angels are created from what. The phrase \'Light\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Divine decree reminds believers that Allah controls every.","options":["Event","Feeling","Emotion","Memory"],"answer":"Event","explanation":"Divine decree reminds believers that Allah controls every. The phrase \'Event\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Prophets came to deliver Allah\'s.","options":["Message","Business plan","Political idea","Movie"],"answer":"Message","explanation":"Prophets came to deliver Allah\'s. The phrase \'Message\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Belief in the unseen includes trusting in which of these?","options":["Angels","Computers","Mountains","Buildings"],"answer":"Angels","explanation":"Belief in the unseen includes trusting in which of these. The phrase \'Angels\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which of these books came before the Quran?","options":["Torah","Dictionary","Comic","Novel"],"answer":"Torah","explanation":"Which of these books came before the Quran. The phrase \'Torah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Belief that Allah rewards good deeds gives hope for.","options":["Paradise","Gold","Travel","Fame"],"answer":"Paradise","explanation":"Belief that Allah rewards good deeds gives hope for. The phrase \'Paradise\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Belief in Allah means submitting to His.","options":["Will","Hobby","Neighbor","Story"],"answer":"Will","explanation":"Belief in Allah means submitting to His. The phrase \'Will\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Belief in the unseen includes trusting Allah knows our  before we act.","options":["Intentions","Outfits","Weather","Sports"],"answer":"Intentions","explanation":"Belief in the unseen includes trusting Allah knows our  before we act. The phrase \'Intentions\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Divine decree encourages patience with  that Allah allows.","options":["Trials","Movies","Gossip","Shopping"],"answer":"Trials","explanation":"Divine decree encourages patience with  that Allah allows. The phrase \'Trials\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Revealed books keep believers focused on Allah\'s.","options":["Guidance","Wealth","Noise","Fame"],"answer":"Guidance","explanation":"Revealed books keep believers focused on Allah\'s. The phrase \'Guidance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Prophets came to invite people to.","options":["Allah","Power","Wealth","Sports"],"answer":"Allah","explanation":"Prophets came to invite people to. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Remembering the Day of Judgment helps guard our.","options":["Actions","Sleeping","Shopping","Screens"],"answer":"Actions","explanation":"Remembering the Day of Judgment helps guard our. The phrase \'Actions\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":3,"questions":[{"question":"How many pillars of Islam are there?","options":["Five","Six","Four","Seven"],"answer":"Five","explanation":"How many pillars of Islam are there. The phrase \'Five\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Which pillar is the declaration of faith?","options":["Shahada","Salah","Zakat","Sawm"],"answer":"Shahada","explanation":"Which pillar is the declaration of faith. The phrase \'Shahada\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Which pillar is the five daily prayers?","options":["Salah","Zakat","Hajj","Shahada"],"answer":"Salah","explanation":"Which pillar is the five daily prayers. The phrase \'Salah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Which pillar gives a portion of wealth to the needy?","options":["Zakat","Sawm","Hijrah","Hajj"],"answer":"Zakat","explanation":"Which pillar gives a portion of wealth to the needy. The phrase \'Zakat\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Which pillar involves fasting during Ramadan?","options":["Sawm","Zakat","Salah","Hajj"],"answer":"Sawm","explanation":"Which pillar involves fasting during Ramadan. The phrase \'Sawm\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Which pillar is the pilgrimage to Makkah?","options":["Hajj","Shahada","Salah","Zakat"],"answer":"Hajj","explanation":"Which pillar is the pilgrimage to Makkah. The phrase \'Hajj\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Zakat is primarily intended for which group?","options":["The poor and needy","Scholars","Kings","Visitors"],"answer":"The poor and needy","explanation":"Zakat is primarily intended for which group. The phrase \'The poor and needy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Which pillar may be performed only once if a Muslim is able?","options":["Hajj","Salah","Zakat","Sawm"],"answer":"Hajj","explanation":"Which pillar may be performed only once if a Muslim is able. The phrase \'Hajj\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Which Surah is recited in every rak\'ah of prayer?","options":["Al-Fatiha","Yaseen","Al-Kawthar","Al-Ikhlas"],"answer":"Al-Fatiha","explanation":"Which Surah is recited in every rak\'ah of prayer. The phrase \'Al-Fatiha\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"The fast of Ramadan begins at what time of day?","options":["Fajr","Dhuhr","Asr","Maghrib"],"answer":"Fajr","explanation":"The fast of Ramadan begins at what time of day. The phrase \'Fajr\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Which purification is done before Salah?","options":["Wudu","Ghusl","Qurbani","Zakat"],"answer":"Wudu","explanation":"Which purification is done before Salah. The phrase \'Wudu\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"The call to prayer is called?","options":["Adhan","Salam","Takbir","Dua"],"answer":"Adhan","explanation":"The call to prayer is called. The phrase \'Adhan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Giving zakat purifies a Muslim\'s.","options":["Wealth","Speech","Sleep","Travel"],"answer":"Wealth","explanation":"Giving zakat purifies a Muslim\'s. The phrase \'Wealth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Fasting during Ramadan teaches believers.","options":["Self-discipline","Greed","Laziness","Rudeness"],"answer":"Self-discipline","explanation":"Fasting during Ramadan teaches believers. The phrase \'Self-discipline\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"The Shahada names Muhammad (peace be upon him) as what?","options":["Messenger of Allah","King of Arabs","Scribe","Soldier"],"answer":"Messenger of Allah","explanation":"The Shahada names Muhammad (peace be upon him) as what. The phrase \'Messenger of Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"The day pilgrims stand at Arafat during Hajj is called the Day of.","options":["Arafah","Eid","Ashura","Mawlid"],"answer":"Arafah","explanation":"The day pilgrims stand at Arafat during Hajj is called the Day of. The phrase \'Arafah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Fasting Ramadan helps control  besides hunger.","options":["Anger","Travel","Homework","Noise"],"answer":"Anger","explanation":"Fasting Ramadan helps control  besides hunger. The phrase \'Anger\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Taraweeh prayers follow the  prayer each Ramadan night.","options":["Isha","Fajr","Dhuhr","Maghrib"],"answer":"Isha","explanation":"Taraweeh prayers follow the  prayer each Ramadan night. The phrase \'Isha\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"When wealth reaches the nisab, Muslims give.","options":["Zakat","Salah","Sawm","Dua"],"answer":"Zakat","explanation":"When wealth reaches the nisab, Muslims give. The phrase \'Zakat\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Salah anchors the believer\'s heart to.","options":["Allah","Leaders","Money","Friends"],"answer":"Allah","explanation":"Salah anchors the believer\'s heart to. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":4,"questions":[{"question":"The Quran was revealed to whom?","options":["Muhammad (peace be upon him)","Moses","Jesus","Abraham"],"answer":"Muhammad (peace be upon him)","explanation":"The Quran was revealed to whom. The phrase \'Muhammad (peace be upon him)\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Which angel brought the revelation of the Quran?","options":["Jibril","Mikail","Israfil","Azrael"],"answer":"Jibril","explanation":"Which angel brought the revelation of the Quran. The phrase \'Jibril\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"The Quran is described as a book of.","options":["Guidance","Stories only","Songs","History of Europe"],"answer":"Guidance","explanation":"The Quran is described as a book of. The phrase \'Guidance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Which Surah opens the Quran?","options":["Al-Fatiha","Al-Baqarah","An-Nas","Al-Ikhlas"],"answer":"Al-Fatiha","explanation":"Which Surah opens the Quran. The phrase \'Al-Fatiha\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Which Surah begins with the word \'Iqra\' meaning \'Read\'?","options":["Al-Alaq","Al-Kawthar","An-Nas","Al-Masad"],"answer":"Al-Alaq","explanation":"Which Surah begins with the word \'Iqra\' meaning \'Read\'. The phrase \'Al-Alaq\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"The Quran was revealed over how many years?","options":["Twenty three","Ten","Forty","Seven"],"answer":"Twenty three","explanation":"The Quran was revealed over how many years. The phrase \'Twenty three\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Quranic recitation rules are called ?","options":["Tajweed","Hajj","Salah","Fasting"],"answer":"Tajweed","explanation":"Quranic recitation rules are called. The phrase \'Tajweed\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Reflecting deeply on Allah\'s words is known as ?","options":["Tadabbur","Tawbah","Zakat","Hajj"],"answer":"Tadabbur","explanation":"Reflecting deeply on Allah\'s words is known as . The phrase \'Tadabbur\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"The Quran was revealed in which language?","options":["Arabic","English","Persian","Urdu"],"answer":"Arabic","explanation":"The Quran was revealed in which language. The phrase \'Arabic\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Which Surah is the shortest among these?","options":["Al-Ikhlas","Al-Baqarah","An-Nisa","Yunus"],"answer":"Al-Ikhlas","explanation":"Which Surah is the shortest among these. The phrase \'Al-Ikhlas\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"The Quran calls Allah Ar-Rahman, meaning?","options":["The Most Merciful","The Loud One","The Athlete","The Ruler of Birds"],"answer":"The Most Merciful","explanation":"The Quran calls Allah Ar-Rahman, meaning. The phrase \'The Most Merciful\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"The word \'Quran\' literally means?","options":["Recitation","Book cover","Prayer mat","Lamp"],"answer":"Recitation","explanation":"The word \'Quran\' literally means. The phrase \'Recitation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Who preserved the Quran in writing during the Prophet\'s lifetime?","options":["Scribes","Merchants","Soldiers","Poets"],"answer":"Scribes","explanation":"Who preserved the Quran in writing during the Prophet\'s lifetime. The phrase \'Scribes\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"The Quran invites believers to call upon Allah using His ?","options":["Names","Food","Movies","Music"],"answer":"Names","explanation":"The Quran invites believers to call upon Allah using His . The phrase \'Names\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"The Quran promises mercy to those who do what?","options":["Believe and act","Ignore the message","Take wealth only for self","Hoard food"],"answer":"Believe and act","explanation":"The Quran promises mercy to those who do what. The phrase \'Believe and act\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Which Surah describes Allah as the Light of the heavens and earth?","options":["An-Nur","Al-Fatiha","Yaseen","An-Nas"],"answer":"An-Nur","explanation":"Which Surah describes Allah as the Light of the heavens and earth. The phrase \'An-Nur\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Who served as the Prophet\'s chief scribe for revelations?","options":["Zayd ibn Thabit","Abu Bakr","Umar","Ali"],"answer":"Zayd ibn Thabit","explanation":"Who served as the Prophet\'s chief scribe for revelations. The phrase \'Zayd ibn Thabit\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"The Quran was revealed primarily in the month of.","options":["Ramadan","Shawwal","Muharram","Dhul-Hijjah"],"answer":"Ramadan","explanation":"The Quran was revealed primarily in the month of. The phrase \'Ramadan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Believers show reverence before touching the Quran by performing.","options":["Wudu","Sleep","Eating","Shopping"],"answer":"Wudu","explanation":"Believers show reverence before touching the Quran by performing. The phrase \'Wudu\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"The Quran invites us to reflect on the  around us.","options":["Signs in creation","Movies","Jokes","Gossip"],"answer":"Signs in creation","explanation":"The Quran invites us to reflect on the  around us. The phrase \'Signs in creation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":5,"questions":[{"question":"Muhammad (peace be upon him) is known as the final ?","options":["Prophet","King","Scholar","Trader"],"answer":"Prophet","explanation":"Muhammad (peace be upon him) is known as the final . The phrase \'Prophet\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"In which city was Prophet Muhammad born?","options":["Makkah","Medina","Jerusalem","Cairo"],"answer":"Makkah","explanation":"In which city was Prophet Muhammad born. The phrase \'Makkah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"The migration to Madina is called?","options":["Hijrah","Umrah","Hajj","Zakat"],"answer":"Hijrah","explanation":"The migration to Madina is called. The phrase \'Hijrah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"The life story of Prophet Muhammad is known as?","options":["Seerah","Hadith","Tafsir","Fiqh"],"answer":"Seerah","explanation":"The life story of Prophet Muhammad is known as. The phrase \'Seerah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"His companions are called?","options":["Sahaba","Mufassir","Qadis","Imams"],"answer":"Sahaba","explanation":"His companions are called. The phrase \'Sahaba\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Which title meant \'the trustworthy\'?","options":["Al-Amin","Al-Kabir","Al-Saud","Al-Wahid"],"answer":"Al-Amin","explanation":"Which title meant \'the trustworthy\'. The phrase \'Al-Amin\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Where did he receive the first revelation?","options":["Cave of Hira","Cave of Thawr","Mount Sinai","Masjid al-Haram"],"answer":"Cave of Hira","explanation":"Where did he receive the first revelation. The phrase \'Cave of Hira\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Which mosque did he build first after migrating?","options":["Masjid Quba","Masjid al-Haram","Masjid Nabawi","Masjid al-Aqsa"],"answer":"Masjid Quba","explanation":"Which mosque did he build first after migrating. The phrase \'Masjid Quba\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Which battle was the first major victory for the Muslims?","options":["Badr","Uhud","Khandaq","Hunayn"],"answer":"Badr","explanation":"Which battle was the first major victory for the Muslims. The phrase \'Badr\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Prophet Muhammad taught Muslims to be kind to?","options":["Neighbors","Strangers only","Only family","Only leaders"],"answer":"Neighbors","explanation":"Prophet Muhammad taught Muslims to be kind to. The phrase \'Neighbors\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"The Farewell Pilgrimage took place in?","options":["Makkah","Medina","Jerusalem","Taif"],"answer":"Makkah","explanation":"The Farewell Pilgrimage took place in. The phrase \'Makkah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"He urged Muslims to speak the truth and keep what?","options":["Promises","Secrets","Wealth","Meals"],"answer":"Promises","explanation":"He urged Muslims to speak the truth and keep what. The phrase \'Promises\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which group did he especially remind Muslims to care for?","options":["Orphans","Celebrities","Kings","Athletes"],"answer":"Orphans","explanation":"Which group did he especially remind Muslims to care for. The phrase \'Orphans\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"He told the Ummah to hold fast to the rope of?","options":["Allah","Trade","War","Health"],"answer":"Allah","explanation":"He told the Ummah to hold fast to the rope of. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"The Quran calls him a mercy to?","options":["The worlds","Only Arabs","Only kings","Only traders"],"answer":"The worlds","explanation":"The Quran calls him a mercy to. The phrase \'The worlds\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Before prophethood, the Prophet ﷺ earned a living as a.","options":["Trader","Farmer","Poet","Soldier"],"answer":"Trader","explanation":"Before prophethood, the Prophet ﷺ earned a living as a. The phrase \'Trader\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"The Farewell Sermon emphasized justice and rights for.","options":["All people","Only the rich","Only leaders","Only soldiers"],"answer":"All people","explanation":"The Farewell Sermon emphasized justice and rights for. The phrase \'All people\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Helping orphans is a sign of  in the Prophet\'s teaching.","options":["Mercy","Strength","Silence","Fame"],"answer":"Mercy","explanation":"Helping orphans is a sign of  in the Prophet\'s teaching. The phrase \'Mercy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"The Prophet ﷺ taught that the strong believer is the one who controls.","options":["Anger","Children","Money","Power"],"answer":"Anger","explanation":"The Prophet ﷺ taught that the strong believer is the one who controls. The phrase \'Anger\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"He asked the Ummah to follow the Quran and the.","options":["Sunnah","Laws","Stories","Games"],"answer":"Sunnah","explanation":"He asked the Ummah to follow the Quran and the. The phrase \'Sunnah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":6,"questions":[{"question":"What does fasting aim to build?","options":["Empathy and mercy","Selfishness","A vacation","Sleep"],"answer":"Empathy and mercy","explanation":"What does fasting aim to build. The phrase \'Empathy and mercy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":20},{"question":"How many daily prayers (Salah) are obligatory for Muslims?","options":["Five","Four","Three","Six"],"answer":"Five","explanation":"How many daily prayers (Salah) are obligatory for Muslims. The phrase \'Five\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Which prayer is performed at dawn?","options":["Fajr","Dhuhr","Asr","Maghrib"],"answer":"Fajr","explanation":"Which prayer is performed at dawn. The phrase \'Fajr\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Which prayer is performed after the sun passes its zenith?","options":["Dhuhr","Fajr","Maghrib","Isha"],"answer":"Dhuhr","explanation":"Which prayer is performed after the sun passes its zenith. The phrase \'Dhuhr\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Which prayer is performed late afternoon before sunset?","options":["Asr","Fajr","Isha","Dhuhr"],"answer":"Asr","explanation":"Which prayer is performed late afternoon before sunset. The phrase \'Asr\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Which prayer is performed just after sunset?","options":["Maghrib","Asr","Isha","Fajr"],"answer":"Maghrib","explanation":"Which prayer is performed just after sunset. The phrase \'Maghrib\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Which prayer is performed after nightfall?","options":["Isha","Fajr","Dhuhr","Maghrib"],"answer":"Isha","explanation":"Which prayer is performed after nightfall. The phrase \'Isha\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Which purification is performed before every Salah?","options":["Wudu","Zakat","Sawm","Hajj"],"answer":"Wudu","explanation":"Which purification is performed before every Salah. The phrase \'Wudu\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"The call to prayer is known as?","options":["Adhan","Dua","Fajr","Khutbah"],"answer":"Adhan","explanation":"The call to prayer is known as. The phrase \'Adhan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Muslims face which city during prayer?","options":["Makkah","Medina","Jerusalem","Cairo"],"answer":"Makkah","explanation":"Muslims face which city during prayer. The phrase \'Makkah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Which movement includes bending at the waist while saying \'Subhana Rabbiyal Adheem\'?","options":["Ruku","Sujud","Qiyam","Tashahhud"],"answer":"Ruku","explanation":"Which movement includes bending at the waist while saying \'Subhana Rabbiyal Adheem\'. The phrase \'Ruku\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Which movement involves placing the forehead on the ground?","options":["Sujud","Ruku","Qiyam","Takbir"],"answer":"Sujud","explanation":"Which movement involves placing the forehead on the ground. The phrase \'Sujud\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Which Surah is recited in every rak\'ah of Salah?","options":["Al-Fatiha","Al-Baqarah","An-Nas","Al-Ikhlas"],"answer":"Al-Fatiha","explanation":"Which Surah is recited in every rak\'ah of Salah. The phrase \'Al-Fatiha\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"What does the word \'Salah\' literally mean?","options":["Prayer","Friendship","Wealth","Knowledge"],"answer":"Prayer","explanation":"What does the word \'Salah\' literally mean. The phrase \'Prayer\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"The intention made before praying is called?","options":["Niyyah","Sadaqah","Tawbah","Hajj"],"answer":"Niyyah","explanation":"The intention made before praying is called. The phrase \'Niyyah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Prophet Muhammad (peace be upon him) described prayer as what?","options":["Light","Darkness","Noise","Speed"],"answer":"Light","explanation":"Prophet Muhammad (peace be upon him) described prayer as what. The phrase \'Light\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"If someone misses a prayer, they should perform a  prayer.","options":["Qada","Jummah","Taraweeh","Eid"],"answer":"Qada","explanation":"If someone misses a prayer, they should perform a  prayer. The phrase \'Qada\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"The congregational prayer held on Fridays is called.","options":["Jummah","Eid","Taraweeh","Tahajjud"],"answer":"Jummah","explanation":"The congregational prayer held on Fridays is called. The phrase \'Jummah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"After Salah, Muslims send peace upon.","options":["The Prophet ﷺ","The Quran","The imam","The mosque"],"answer":"The Prophet ﷺ","explanation":"After Salah, Muslims send peace upon. The phrase \'The Prophet ﷺ\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"During Salah, Muslims face the direction of the.","options":["Kaaba in Makkah","Medina","Jerusalem","Cairo"],"answer":"Kaaba in Makkah","explanation":"During Salah, Muslims face the direction of the. The phrase \'Kaaba in Makkah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"The Takbir at the start of Salah begins with.","options":["Allahu Akbar","Alhamdulillah","SubhanAllah","Astaghfirullah"],"answer":"Allahu Akbar","explanation":"The Takbir at the start of Salah begins with. The phrase \'Allahu Akbar\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":7,"questions":[{"question":"What does \'dhikr\' mean?","options":["Remembrance of Allah","Relaxation","Storytelling","Travel"],"answer":"Remembrance of Allah","explanation":"What does \'dhikr\' mean. The phrase \'Remembrance of Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Which phrase praises Allah\'s perfection?","options":["SubhanAllah","Hi there","Goodbye","See you"],"answer":"SubhanAllah","explanation":"Which phrase praises Allah\'s perfection. The phrase \'SubhanAllah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Which short dua means \'All praise is due to Allah\'?","options":["Alhamdulillah","Bismillah","Astaghfirullah","Allahu Akbar"],"answer":"Alhamdulillah","explanation":"Which short dua means \'All praise is due to Allah\'. The phrase \'Alhamdulillah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Which dua asks Allah for forgiveness?","options":["Astaghfirullah","SubhanAllah","Alhamdulillah","InshaAllah"],"answer":"Astaghfirullah","explanation":"Which dua asks Allah for forgiveness. The phrase \'Astaghfirullah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Which phrase expresses trust by saying there is no might except with Allah?","options":["La hawla wa la quwwata illa billah","Bismillah","Assalamu Alaikum","SubhanAllah"],"answer":"La hawla wa la quwwata illa billah","explanation":"Which phrase expresses trust by saying there is no might except with Allah. The phrase \'La hawla wa la quwwata illa billah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Remembrance and dua soften the.","options":["Heart","Wallet","Schedule","Food"],"answer":"Heart","explanation":"Remembrance and dua soften the. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Which dua seeks protection from evil?","options":["A\'udhu billahi min ash-shaytan","Alhamdulillah","Astaghfirullah","SubhanAllah"],"answer":"A\'udhu billahi min ash-shaytan","explanation":"Which dua seeks protection from evil. The phrase \'A\'udhu billahi min ash-shaytan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Which dua reminds us Allah is enough for us?","options":["Hasbi Allah","Assalamu Alaikum","Noor","Zikr"],"answer":"Hasbi Allah","explanation":"Which dua reminds us Allah is enough for us. The phrase \'Hasbi Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Daily dhikr is encouraged most in the  and evening.","options":["Morning","Afternoon","Night only","Midnight"],"answer":"Morning","explanation":"Daily dhikr is encouraged most in the  and evening. The phrase \'Morning\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Which short chapter is often read as part of daily dhikr for protection?","options":["Al-Ikhlas","Al-Baqarah","An-Nisa","Yusuf"],"answer":"Al-Ikhlas","explanation":"Which short chapter is often read as part of daily dhikr for protection. The phrase \'Al-Ikhlas\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Asking Allah for others in dua shows.","options":["Support","Silence","Pride","Fear"],"answer":"Support","explanation":"Asking Allah for others in dua shows. The phrase \'Support\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Multiplying dhikr after prayer keeps the  steady.","options":["Heart","Money","Phone","Schedule"],"answer":"Heart","explanation":"Multiplying dhikr after prayer keeps the  steady. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which phrase means \'Allah is the Greatest\'?","options":["Allahu Akbar","Alhamdulillah","SubhanAllah","Astaghfirullah"],"answer":"Allahu Akbar","explanation":"Which phrase means \'Allah is the Greatest\'. The phrase \'Allahu Akbar\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Which dua is recited before starting work, meaning \'In the name of Allah\'?","options":["Bismillah","SubhanAllah","Alhamdulillah","Allahu Akbar"],"answer":"Bismillah","explanation":"Which dua is recited before starting work, meaning \'In the name of Allah\'. The phrase \'Bismillah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Which action keeps the conversation with Allah honest?","options":["Dua about routine matters","Ignoring prayer","Talking behind others","Hoarding wealth"],"answer":"Dua about routine matters","explanation":"Which action keeps the conversation with Allah honest. The phrase \'Dua about routine matters\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"The dua \'Rabbi zidni ilma\' asks Allah for more.","options":["Knowledge","Sleep","Games","Rumors"],"answer":"Knowledge","explanation":"The dua \'Rabbi zidni ilma\' asks Allah for more. The phrase \'Knowledge\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Saying \'Hasbi Allah\' shows  on Allah.","options":["Reliance","Confusion","Criticism","Fear"],"answer":"Reliance","explanation":"Saying \'Hasbi Allah\' shows  on Allah. The phrase \'Reliance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Praying for others in dua reflects.","options":["Support","Silence","Pride","Fear"],"answer":"Support","explanation":"Praying for others in dua reflects. The phrase \'Support\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Dhikr keeps the heart.","options":["Soft","Tired","Closed","Distracted"],"answer":"Soft","explanation":"Dhikr keeps the heart. The phrase \'Soft\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Remembering Allah\'s names brings  to the soul.","options":["Peace","Noise","Stress","Sleep"],"answer":"Peace","explanation":"Remembering Allah\'s names brings  to the soul. The phrase \'Peace\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":8,"questions":[{"question":"Purifying the heart removes diseases like.","options":["Envy","Hunger","Sleepiness","Noise"],"answer":"Envy","explanation":"Purifying the heart removes diseases like. The phrase \'Envy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Dhikr softens the.","options":["Heart","Wallet","Desk","Door"],"answer":"Heart","explanation":"Dhikr softens the. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Self accounting each night is called.","options":["Muhasabah","Zakat","Sadaqah","Hajj"],"answer":"Muhasabah","explanation":"Self accounting each night is called. The phrase \'Muhasabah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"A heart filled with gratitude stays.","options":["Tender","Angry","Greedy","Silent"],"answer":"Tender","explanation":"A heart filled with gratitude stays. The phrase \'Tender\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Repentance helps remove  from the heart.","options":["Pride","Water","Sleep","Food"],"answer":"Pride","explanation":"Repentance helps remove  from the heart. The phrase \'Pride\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Which emotion is a heart disease?","options":["Jealousy","Joy","Peace","Gratitude"],"answer":"Jealousy","explanation":"Which emotion is a heart disease. The phrase \'Jealousy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Compassion keeps the heart.","options":["Soft","Silent","Cold","Loud"],"answer":"Soft","explanation":"Compassion keeps the heart. The phrase \'Soft\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"When we notice blameworthy traits we should.","options":["Repent","Hide","Blame others","Forget"],"answer":"Repent","explanation":"When we notice blameworthy traits we should. The phrase \'Repent\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Trusting Allah is known as.","options":["Tawakkul","Hate","Noise","Greed"],"answer":"Tawakkul","explanation":"Trusting Allah is known as. The phrase \'Tawakkul\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Sincerity opposes.","options":["Riyah (showing off)","Kindness","Prayer","Charity"],"answer":"Riyah (showing off)","explanation":"Sincerity opposes. The phrase \'Riyah (showing off)\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"A heart with constant dhikr shows  to Allah.","options":["Attachment","Detachment","Hate","Falsehood"],"answer":"Attachment","explanation":"A heart with constant dhikr shows  to Allah. The phrase \'Attachment\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Which practice keeps the heart at peace?","options":["Dua","Shopping","Grumbling","Arguing"],"answer":"Dua","explanation":"Which practice keeps the heart at peace. The phrase \'Dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which emotion should we guard from to protect the heart?","options":["Pride","Debt","Cold","Rain"],"answer":"Pride","explanation":"Which emotion should we guard from to protect the heart. The phrase \'Pride\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Compassion for others comes from a heart filled with.","options":["Love","Silence","Noise","Tension"],"answer":"Love","explanation":"Compassion for others comes from a heart filled with. The phrase \'Love\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Turning every action into dua shows  in the heart.","options":["Focus","Confusion","Sleepiness","Noise"],"answer":"Focus","explanation":"Turning every action into dua shows  in the heart. The phrase \'Focus\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Muhasabah is the habit of.","options":["Self-accounting","Shopping","Sleeping","Ignoring"],"answer":"Self-accounting","explanation":"Muhasabah is the habit of. The phrase \'Self-accounting\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Guarding the tongue keeps the  clean.","options":["Heart","Home","Wallet","Phone"],"answer":"Heart","explanation":"Guarding the tongue keeps the  clean. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Jealousy is considered a heart.","options":["Disease","Gift","Game","Noise"],"answer":"Disease","explanation":"Jealousy is considered a heart. The phrase \'Disease\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Trusting Allah (tawakkul) steadies the.","options":["Heart","Laptop","Bank","Friends"],"answer":"Heart","explanation":"Trusting Allah (tawakkul) steadies the. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Dhikr and dua keep the heart.","options":["Soft","Tired","Closed","Angry"],"answer":"Soft","explanation":"Dhikr and dua keep the heart. The phrase \'Soft\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19},{"question":"Which habit acts as a check-up for the heart?","options":["Self-accounting (muhasabah)","Ignoring emotions","Criticizing others","Replaying news"],"answer":"Self-accounting (muhasabah)","explanation":"Which habit acts as a check-up for the heart. The phrase \'Self-accounting (muhasabah)\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":20},{"question":"Keeping good company helps the heart stay.","options":["Pure","Worried","Fickle","Distant"],"answer":"Pure","explanation":"Keeping good company helps the heart stay. The phrase \'Pure\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":21},{"question":"Which reminder guards against envy?","options":["Gratitude for Allah\'s blessings","Comparing achievements","Focusing on flaws","Silence only"],"answer":"Gratitude for Allah\'s blessings","explanation":"Which reminder guards against envy. The phrase \'Gratitude for Allah\'s blessings\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":22},{"question":"Listening to the Quran soothes the.","options":["Heart","Feet","Wallet","Shoes"],"answer":"Heart","explanation":"Listening to the Quran soothes the. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":23},{"question":"Which emotion fades when the heart trusts Allah?","options":["Fear","Sleep","Hunger","Noise"],"answer":"Fear","explanation":"Which emotion fades when the heart trusts Allah. The phrase \'Fear\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":24},{"question":"Patience in trials keeps the heart.","options":["Calm","Angry","Restless","Confused"],"answer":"Calm","explanation":"Patience in trials keeps the heart. The phrase \'Calm\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":25},{"question":"Which action helps the heart forgive?","options":["Remembering Allah\'s mercy","Holding grudges","Seeking revenge","Avoiding others"],"answer":"Remembering Allah\'s mercy","explanation":"Which action helps the heart forgive. The phrase \'Remembering Allah\'s mercy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":26},{"question":"Dua keeps the heart connected to.","options":["Allah","Entertainment","Busyness","Silence"],"answer":"Allah","explanation":"Dua keeps the heart connected to. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":27},{"question":"What builds the heart’s resilience?","options":["Consistent worship","Ignoring teachings","Complain often","Sleep late"],"answer":"Consistent worship","explanation":"What builds the heart’s resilience. The phrase \'Consistent worship\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":28},{"question":"Which love softens the heart?","options":["Love for Allah","Love for gossip","Love for worry","Love for comfort"],"answer":"Love for Allah","explanation":"Which love softens the heart. The phrase \'Love for Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":29},{"question":"A jealous heart needs to remember?","options":["Allah gives what He wills","Others deserve failure","We compare wins","Silence is power"],"answer":"Allah gives what He wills","explanation":"A jealous heart needs to remember. The phrase \'Allah gives what He wills\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":30},{"question":"Gentle speech keeps the heart.","options":["Soft","Closed","Busy","Heavy"],"answer":"Soft","explanation":"Gentle speech keeps the heart. The phrase \'Soft\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":31},{"question":"Charity protects the heart from becoming.","options":["Hard","Warm","Content","Quiet"],"answer":"Hard","explanation":"Charity protects the heart from becoming. The phrase \'Hard\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":32},{"question":"What wakes the heart each morning?","options":["Morning dua and gratitude","Scrolling feeds","Rushing out","Skipping reflection"],"answer":"Morning dua and gratitude","explanation":"What wakes the heart each morning. The phrase \'Morning dua and gratitude\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":33},{"question":"Which reminder calms a racing heart?","options":["Allah’s presence","Loud music","Rushing tasks","Action without thought"],"answer":"Allah’s presence","explanation":"Which reminder calms a racing heart. The phrase \'Allah’s presence\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":34},{"question":"What keeps the heart humble?","options":["Seeing one’s own faults","Boasting","Comparing greatness","Avoiding lessons"],"answer":"Seeing one’s own faults","explanation":"What keeps the heart humble. The phrase \'Seeing one’s own faults\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":35},{"question":"Sincerity (ikhlas) protects the heart from?","options":["Riyah (showing off)","Softness","Dua","Kindness"],"answer":"Riyah (showing off)","explanation":"Sincerity (ikhlas) protects the heart from. The phrase \'Riyah (showing off)\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":36},{"question":"Which practice opens the heart before sleep?","options":["Reciting Quran and dua","Watching videos","Overeating","Complaining"],"answer":"Reciting Quran and dua","explanation":"Which practice opens the heart before sleep. The phrase \'Reciting Quran and dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":37},{"question":"Being grateful to parents shapes a.","options":["Generous heart","Reserved heart","Closed heart","Silent heart"],"answer":"Generous heart","explanation":"Being grateful to parents shapes a. The phrase \'Generous heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":38},{"question":"Which content weakens the heart?","options":["Hateful speech","Soft recitation","Gentle reminders","Kind quotes"],"answer":"Hateful speech","explanation":"Which content weakens the heart. The phrase \'Hateful speech\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":39},{"question":"Mindful silence gives the heart room to.","options":["Listen to Allah","Judge others","Worry more","Rush tasks"],"answer":"Listen to Allah","explanation":"Mindful silence gives the heart room to. The phrase \'Listen to Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":40},{"question":"Patience with hardship keeps the heart.","options":["Strong","Lean","Soft","Busy"],"answer":"Strong","explanation":"Patience with hardship keeps the heart. The phrase \'Strong\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":41},{"question":"Which emotion reflects a healthy heart?","options":["Mercy","Envy","Pride","Hopelessness"],"answer":"Mercy","explanation":"Which emotion reflects a healthy heart. The phrase \'Mercy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":42},{"question":"Dhikr of Allah in the heart is also called.","options":["Remembrance","Drama","Reminder","Noise"],"answer":"Remembrance","explanation":"Dhikr of Allah in the heart is also called. The phrase \'Remembrance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":43},{"question":"A grateful heart responds to success with.","options":["Thankfulness","Jealousy","Boasting","Ignoring others"],"answer":"Thankfulness","explanation":"A grateful heart responds to success with. The phrase \'Thankfulness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":44},{"question":"What softens the heart toward others?","options":["Compassion","Criticism","Isolation","Judgment"],"answer":"Compassion","explanation":"What softens the heart toward others. The phrase \'Compassion\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":45},{"question":"Keeping the heart focused avoids feeling.","options":["Lost","Calm","Centered","Soft"],"answer":"Lost","explanation":"Keeping the heart focused avoids feeling. The phrase \'Lost\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":46},{"question":"Which practice brings the heart relief during stress?","options":["Turning to dua and patience","Ignoring problems","Holding grudges","Overworking"],"answer":"Turning to dua and patience","explanation":"Which practice brings the heart relief during stress. The phrase \'Turning to dua and patience\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":47},{"question":"An open heart seeks to spread.","options":["Kindness","Rumors","Fear","Doubt"],"answer":"Kindness","explanation":"An open heart seeks to spread. The phrase \'Kindness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":48}]},{"chapterId":9,"questions":[{"question":"What does \'Adab\' refer to in Islam?","options":["Good manners","Food","Wealth","Travel"],"answer":"Good manners","explanation":"What does \'Adab\' refer to in Islam. The phrase \'Good manners\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Being kind to neighbors is part of showing?","options":["Adab","Hajj","Sawm","Zakat"],"answer":"Adab","explanation":"Being kind to neighbors is part of showing. The phrase \'Adab\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Forgiveness is greater than holding on to?","options":["Grudges","Joys","Knowledge","Food"],"answer":"Grudges","explanation":"Forgiveness is greater than holding on to. The phrase \'Grudges\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"The Prophet (peace be upon him) said the best of you are those who are best to their?","options":["Families","Enemies","Animals","Wealth"],"answer":"Families","explanation":"The Prophet (peace be upon him) said the best of you are those who are best to their. The phrase \'Families\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Listening carefully to others is an act of?","options":["Mercy","Speech","Silence","Prayer"],"answer":"Mercy","explanation":"Listening carefully to others is an act of. The phrase \'Mercy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Keeping quiet when gossip begins is part of which behavior?","options":["Good manners","Competition","Pride","Sarcasm"],"answer":"Good manners","explanation":"Keeping quiet when gossip begins is part of which behavior. The phrase \'Good manners\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Which trait builds trust in the community?","options":["Honesty","Hoarding","Judging quickly","Noise"],"answer":"Honesty","explanation":"Which trait builds trust in the community. The phrase \'Honesty\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"A calm response during conflict shows?","options":["Patience","Anger","Haste","Silence"],"answer":"Patience","explanation":"A calm response during conflict shows. The phrase \'Patience\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Which action protects relationships in the Ummah?","options":["Forgiveness","Criticism","Ignore","Dominate"],"answer":"Forgiveness","explanation":"Which action protects relationships in the Ummah. The phrase \'Forgiveness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Which virtue multiplies kindness?","options":["Generosity","Selfishness","Hoarding","Indifference"],"answer":"Generosity","explanation":"Which virtue multiplies kindness. The phrase \'Generosity\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Charity increases which quality in the heart?","options":["Purity","Selfishness","Noise","Pride"],"answer":"Purity","explanation":"Charity increases which quality in the heart. The phrase \'Purity\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"How should Muslims respond when given a gift?","options":["Say \'Jazakallah\'","Remain silent","Refuse","Promise to pay"],"answer":"Say \'Jazakallah\'","explanation":"How should Muslims respond when given a gift. The phrase \'Say \'Jazakallah\'\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which of the following is not part of good manners?","options":["Gossip","Respect","Kindness","Truthfulness"],"answer":"Gossip","explanation":"Which of the following is not part of good manners. The phrase \'Gossip\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"What is the best way to begin a conversation according to Sunnah?","options":["With \'Assalamu Alaikum\'","With a joke","With silence","With a critique"],"answer":"With \'Assalamu Alaikum\'","explanation":"What is the best way to begin a conversation according to Sunnah. The phrase \'With \'Assalamu Alaikum\'\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Greeting each other with \'Assalamu Alaikum\' spreads?","options":["Peace","Fear","Noise","Silence"],"answer":"Peace","explanation":"Greeting each other with \'Assalamu Alaikum\' spreads. The phrase \'Peace\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Smiling at another Muslim counts as.","options":["Charity","Judgment","Silence","Noise"],"answer":"Charity","explanation":"Smiling at another Muslim counts as. The phrase \'Charity\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Keeping promises reflects  in Islam.","options":["Trustworthiness","Power","Money","Silence"],"answer":"Trustworthiness","explanation":"Keeping promises reflects  in Islam. The phrase \'Trustworthiness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"When insulted, Muslims are taught to respond with.","options":["Goodness","Anger","Lies","Shouting"],"answer":"Goodness","explanation":"When insulted, Muslims are taught to respond with. The phrase \'Goodness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Listening before speaking shows.","options":["Respect","Dominance","Silence","Fame"],"answer":"Respect","explanation":"Listening before speaking shows. The phrase \'Respect\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Forgiveness clears the heart of long held.","options":["Grudges","Peace","Joy","Sincerity"],"answer":"Grudges","explanation":"Forgiveness clears the heart of long held. The phrase \'Grudges\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":10,"questions":[{"question":"What does \'halal\' mean?","options":["Permissible","Forbidden","Obvious","Complicated"],"answer":"Permissible","explanation":"What does \'halal\' mean. The phrase \'Permissible\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Which habit is part of a halal lifestyle?","options":["Eating permissible food","Ignoring zakat","Hoarding wealth","Gossiping"],"answer":"Eating permissible food","explanation":"Which habit is part of a halal lifestyle. The phrase \'Eating permissible food\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Islamic lifestyle encourages  in spending.","options":["Moderation","Excess","Waste","Hoarding"],"answer":"Moderation","explanation":"Islamic lifestyle encourages  in spending. The phrase \'Moderation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Rest is considered  that helps worship feel fresh.","options":["Recharge","Waste","Luxury","Punishment"],"answer":"Recharge","explanation":"Rest is considered  that helps worship feel fresh. The phrase \'Recharge\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Stewardship in Islam means caring for what?","options":["Resources and creation","Enemies","Fame","Chat groups"],"answer":"Resources and creation","explanation":"Stewardship in Islam means caring for what. The phrase \'Resources and creation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Which food is not halal?","options":["Pork","Dates","Fish","Honey"],"answer":"Pork","explanation":"Which food is not halal. The phrase \'Pork\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Halal finance avoids charging.","options":["Interest","Knowledge","Prayers","Charity"],"answer":"Interest","explanation":"Halal finance avoids charging. The phrase \'Interest\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"A believer can audit which habits through a halal filter?","options":["Meals and entertainment","Movies only","Sports only","Travel alone"],"answer":"Meals and entertainment","explanation":"A believer can audit which habits through a halal filter. The phrase \'Meals and entertainment\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Islamic lifestyle includes giving  to share blessings.","options":["Charity","Secrets","Criticism","Money only to relatives"],"answer":"Charity","explanation":"Islamic lifestyle includes giving  to share blessings. The phrase \'Charity\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Before major purchases, Muslims are reminded to ask if it brings.","options":["Barakah","Noise","Confusion","Chaos"],"answer":"Barakah","explanation":"Before major purchases, Muslims are reminded to ask if it brings. The phrase \'Barakah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Digital detox hours help guard  time.","options":["Worship","Sleep","Exercise","Work"],"answer":"Worship","explanation":"Digital detox hours help guard  time. The phrase \'Worship\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Islamic lifestyle teaches a healthy relationship with possessions by promoting.","options":["Detachment","Greed","Envy","Attachment"],"answer":"Detachment","explanation":"Islamic lifestyle teaches a healthy relationship with possessions by promoting. The phrase \'Detachment\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Saying \'Alhamdulillah\' strengthens ?","options":["Gratitude","Noise","Anger","Demand"],"answer":"Gratitude","explanation":"Saying \'Alhamdulillah\' strengthens . The phrase \'Gratitude\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Which act is part of Islamic stewardship?","options":["Sharing resources","Keeping everything secret","Hoards hunger","Spreading rumors"],"answer":"Sharing resources","explanation":"Which act is part of Islamic stewardship. The phrase \'Sharing resources\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Contentment in life shows which attitude?","options":["Humility","Pride","Complaint","Indifference"],"answer":"Humility","explanation":"Contentment in life shows which attitude. The phrase \'Humility\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Stewardship (khilafah) includes protecting the.","options":["Earth","Coins","Computers","Clothes"],"answer":"Earth","explanation":"Stewardship (khilafah) includes protecting the. The phrase \'Earth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"A halal lifestyle values purity in.","options":["Food and actions","Movies and gossip","Opinions and rumors","Competition and pride"],"answer":"Food and actions","explanation":"A halal lifestyle values purity in. The phrase \'Food and actions\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Screen free time guards the hours dedicated to.","options":["Worship","Shopping","Sleeping","Movies"],"answer":"Worship","explanation":"Screen free time guards the hours dedicated to. The phrase \'Worship\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Halal entertainment avoids  influences.","options":["Immorality","Learning","Exercise","Prayers"],"answer":"Immorality","explanation":"Halal entertainment avoids  influences. The phrase \'Immorality\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Using resources wisely demonstrates.","options":["Responsibility","Greed","Noise","Jealousy"],"answer":"Responsibility","explanation":"Using resources wisely demonstrates. The phrase \'Responsibility\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":11,"questions":[{"question":"Islamic homes should be built on.","options":["Mercy and justice","Wealth only","Noise","Silence"],"answer":"Mercy and justice","explanation":"Islamic homes should be built on. The phrase \'Mercy and justice\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Marriage in Islam is called.","options":["Nikah","Salah","Zakat","Hajj"],"answer":"Nikah","explanation":"Marriage in Islam is called. The phrase \'Nikah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Which surah compares spouses to garments for each other?","options":["Al-Baqarah","Yaseen","Al-Ikhlas","An-Nas"],"answer":"Al-Baqarah","explanation":"Which surah compares spouses to garments for each other. The phrase \'Al-Baqarah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Fairness in sharing duties brings  at home.","options":["Balance","Conflict","Chaos","Jealousy"],"answer":"Balance","explanation":"Fairness in sharing duties brings  at home. The phrase \'Balance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Which action helps grow love within the household?","options":["Gratitude","Keeping secrets","Arguing","Ignoring"],"answer":"Gratitude","explanation":"Which action helps grow love within the household. The phrase \'Gratitude\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Parents should treat children with.","options":["Kindness","Anger","Silence","Harshness"],"answer":"Kindness","explanation":"Parents should treat children with. The phrase \'Kindness\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Children should obey parents as long as it does not lead to.","options":["Disobedience to Allah","Playtime","Learning","Sharing"],"answer":"Disobedience to Allah","explanation":"Children should obey parents as long as it does not lead to. The phrase \'Disobedience to Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Teaching the Quran at home models  for family members.","options":["The Quran and Sunnah","Travel","Games","Movies"],"answer":"The Quran and Sunnah","explanation":"Teaching the Quran at home models  for family members. The phrase \'The Quran and Sunnah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"A peaceful home begins with.","options":["Gentle speech","Scolding","Noise","Isolation"],"answer":"Gentle speech","explanation":"A peaceful home begins with. The phrase \'Gentle speech\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Planning undistracted time for family shows.","options":["Care","Indifference","Neglect","Rashness"],"answer":"Care","explanation":"Planning undistracted time for family shows. The phrase \'Care\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"A balanced home includes shared.","options":["Duties","Secrets","Silence","Favors"],"answer":"Duties","explanation":"A balanced home includes shared. The phrase \'Duties\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Praying together strengthens  at home.","options":["Faith and connection","Debt","Noise","Confusion"],"answer":"Faith and connection","explanation":"Praying together strengthens  at home. The phrase \'Faith and connection\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"The Prophet (peace be upon him) said the best of you are best to your.","options":["Families","Enemies","Strangers","Pets"],"answer":"Families","explanation":"The Prophet (peace be upon him) said the best of you are best to your. The phrase \'Families\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Which act protects marriages?","options":["Open communication","Noise","Isolation","Greed"],"answer":"Open communication","explanation":"Which act protects marriages. The phrase \'Open communication\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"Making dua for your household is a form of.","options":["Care","Neglect","Argument","Silence"],"answer":"Care","explanation":"Making dua for your household is a form of. The phrase \'Care\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Sharing duties at home builds.","options":["Balance","Drama","Silence","Chaos"],"answer":"Balance","explanation":"Sharing duties at home builds. The phrase \'Balance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Raising children requires  and kindness.","options":["Patience","Wealth","Noise","Worry"],"answer":"Patience","explanation":"Raising children requires  and kindness. The phrase \'Patience\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Scheduling undistracted family time shows.","options":["Care","Neglect","Anger","Jealousy"],"answer":"Care","explanation":"Scheduling undistracted family time shows. The phrase \'Care\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Open communication protects.","options":["Marriage","Power","Fame","Wealth"],"answer":"Marriage","explanation":"Open communication protects. The phrase \'Marriage\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Praying together strengthens.","options":["Faith","Conflict","Silence","Stress"],"answer":"Faith","explanation":"Praying together strengthens. The phrase \'Faith\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":12,"questions":[{"question":"What does \'Ummah\' mean?","options":["Community","Fasting","Prayer","Pilgrimage"],"answer":"Community","explanation":"What does \'Ummah\' mean. The phrase \'Community\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"Community care includes helping?","options":["Neighbors","Strangers only","Enemies only","Siblings only"],"answer":"Neighbors","explanation":"Community care includes helping. The phrase \'Neighbors\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"The strength of the Ummah depends on?","options":["Unity","Competition","Isolation","Selfishness"],"answer":"Unity","explanation":"The strength of the Ummah depends on. The phrase \'Unity\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Jummah prayer strengthens?","options":["Community","Wealth","Pride","Silence"],"answer":"Community","explanation":"Jummah prayer strengthens. The phrase \'Community\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"What binds the Ummah together?","options":["Love of Allah","Fear","Division","War"],"answer":"Love of Allah","explanation":"What binds the Ummah together. The phrase \'Love of Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Supporting others often means giving them?","options":["Time","Criticism","Fear","Isolation"],"answer":"Time","explanation":"Supporting others often means giving them. The phrase \'Time\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Speaking calmly when conflicts arise protects?","options":["Relationships","Noise","Pride","Silence"],"answer":"Relationships","explanation":"Speaking calmly when conflicts arise protects. The phrase \'Relationships\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Sharing guidance builds what?","options":["Support","Greed","Pride","Silence"],"answer":"Support","explanation":"Sharing guidance builds what. The phrase \'Support\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Charity uplifts which part of people?","options":["Hearts","Tents","Houses","Noise"],"answer":"Hearts","explanation":"Charity uplifts which part of people. The phrase \'Hearts\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Who should be welcomed into gatherings?","options":["New or marginalized people","Only wealthy people","Only leaders","Only family"],"answer":"New or marginalized people","explanation":"Who should be welcomed into gatherings. The phrase \'New or marginalized people\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Conflict resolution in the community starts with?","options":["Listening","Shouting","Ignoring","Arguing"],"answer":"Listening","explanation":"Conflict resolution in the community starts with. The phrase \'Listening\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Consistency in service builds what?","options":["Trust","Fear","Chaos","Silence"],"answer":"Trust","explanation":"Consistency in service builds what. The phrase \'Trust\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Offering food is a part of which community trait?","options":["Hospitality","Isolation","Division","Silence"],"answer":"Hospitality","explanation":"Offering food is a part of which community trait. The phrase \'Hospitality\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Technology can help the Ummah by?","options":["Uniting across oceans","Dividing families","Promoting lies","Spreading fear"],"answer":"Uniting across oceans","explanation":"Technology can help the Ummah by. The phrase \'Uniting across oceans\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"A community journal helps track?","options":["Needs","Money only","Secrets","Weather"],"answer":"Needs","explanation":"A community journal helps track. The phrase \'Needs\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Welcoming neighbors shows  to the Ummah.","options":["Hospitality","Grace","Silence","Wealth"],"answer":"Hospitality","explanation":"Welcoming neighbors shows  to the Ummah. The phrase \'Hospitality\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Sharing resources uplifts community.","options":["Strength","Fame","Silence","Competition"],"answer":"Strength","explanation":"Sharing resources uplifts community. The phrase \'Strength\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Before reacting in conflict, we should first.","options":["Listen","Shout","Leave","Ignore"],"answer":"Listen","explanation":"Before reacting in conflict, we should first. The phrase \'Listen\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Giving charity and dua increase community.","options":["Hope","Noise","Debt","Pressure"],"answer":"Hope","explanation":"Giving charity and dua increase community. The phrase \'Hope\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Joint supplication keeps the Ummah.","options":["Unified","Divided","Quiet","Tired"],"answer":"Unified","explanation":"Joint supplication keeps the Ummah. The phrase \'Unified\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":13,"questions":[{"question":"Continuous growth is achieved through ?","options":["Consistency","Drama","Isolation","Neglect"],"answer":"Consistency","explanation":"Continuous growth is achieved through . The phrase \'Consistency\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"The future belongs to those who.","options":["Prepare","Wait","Ignore","Criticize"],"answer":"Prepare","explanation":"The future belongs to those who. The phrase \'Prepare\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Legacy planning includes  for others.","options":["Service","Selfishness","Noise","Hoarding"],"answer":"Service","explanation":"Legacy planning includes  for others. The phrase \'Service\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Documenting progress helps keep us.","options":["Accountable","Confused","Quiet","Passive"],"answer":"Accountable","explanation":"Documenting progress helps keep us. The phrase \'Accountable\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Mentorship multiplies a believer\'s.","options":["Impact","Expense","Noise","Delay"],"answer":"Impact","explanation":"Mentorship multiplies a believer\'s. The phrase \'Impact\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Setting spiritual goals should include.","options":["Dua","Gossip","Fear","Silence"],"answer":"Dua","explanation":"Setting spiritual goals should include. The phrase \'Dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Reviewing goals weekly keeps  fresh.","options":["Focus","Pride","Wealth","Sleep"],"answer":"Focus","explanation":"Reviewing goals weekly keeps  fresh. The phrase \'Focus\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Hope in Allah fuels  for the future.","options":["Resilience","Complaint","Argument","Conflict"],"answer":"Resilience","explanation":"Hope in Allah fuels  for the future. The phrase \'Resilience\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"A legacy project can include  that benefits others after you pass.","options":["Sadaqah jariyah","Discounts","Stories","Debt"],"answer":"Sadaqah jariyah","explanation":"A legacy project can include  that benefits others after you pass. The phrase \'Sadaqah jariyah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Final success depends on \'s approval.","options":["Allah","Neighbors","Media","Employees"],"answer":"Allah","explanation":"Final success depends on \'s approval. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Reflection and dua help maintain.","options":["Growth","Leisure","Distraction","Fear"],"answer":"Growth","explanation":"Reflection and dua help maintain. The phrase \'Growth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"Teaching others preserves  beyond one lifetime.","options":["Knowledge","Noise","Applause","Debt"],"answer":"Knowledge","explanation":"Teaching others preserves  beyond one lifetime. The phrase \'Knowledge\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Which of these pairs should be part of every goal?","options":["One action and a dua","One complaint and a demand","One secret and a rumor","One rumor and a fight"],"answer":"One action and a dua","explanation":"Which of these pairs should be part of every goal. The phrase \'One action and a dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Writing a letter to your future self helps create a.","options":["Legacy plan","Complaint list","Shopping list","Gossip thread"],"answer":"Legacy plan","explanation":"Writing a letter to your future self helps create a. The phrase \'Legacy plan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"The Prophet (peace be upon him) described excellence as.","options":["Ihsan","Noise","Fear","Selfishness"],"answer":"Ihsan","explanation":"The Prophet (peace be upon him) described excellence as. The phrase \'Ihsan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Keeping a progress journal builds.","options":["Accountability","Excuses","Competition","Panic"],"answer":"Accountability","explanation":"Keeping a progress journal builds. The phrase \'Accountability\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Weekly reviews keep your  sharp.","options":["Focus","Fears","Friends","Fasting"],"answer":"Focus","explanation":"Weekly reviews keep your  sharp. The phrase \'Focus\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Mentorship multiplies your.","options":["Impact","Sleep","Plans","Noise"],"answer":"Impact","explanation":"Mentorship multiplies your. The phrase \'Impact\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Pairing goals with dua keeps you close to.","options":["Allah","Stories","Games","Rivals"],"answer":"Allah","explanation":"Pairing goals with dua keeps you close to. The phrase \'Allah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Legacy includes leaving ongoing.","options":["Sadaqah","Secrets","Debt","Complaints"],"answer":"Sadaqah","explanation":"Legacy includes leaving ongoing. The phrase \'Sadaqah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":14,"questions":[{"question":"Belief in the hereafter is part of which article of faith?","options":["Sixth","First","Second","Third"],"answer":"Sixth","explanation":"Belief in the hereafter is part of which article of faith. The phrase \'Sixth\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"After death, the soul enters  until the Day of Judgment.","options":["Barzakh","Jannah","Medina","Cave"],"answer":"Barzakh","explanation":"After death, the soul enters  until the Day of Judgment. The phrase \'Barzakh\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Which angels question the deceased in the grave?","options":["Munkar and Nakir","Jibril and Mikail","Israfil and Azrael","Harut and Marut"],"answer":"Munkar and Nakir","explanation":"Which angels question the deceased in the grave. The phrase \'Munkar and Nakir\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"The Day of Judgment is called.","options":["Yawm al-Qiyamah","Yawm al-Salat","Yawm al-Jihad","Yawm al-Umrah"],"answer":"Yawm al-Qiyamah","explanation":"The Day of Judgment is called. The phrase \'Yawm al-Qiyamah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"The balance weighing deeds is called.","options":["Mizan","Rukn","Sharh","Mihrab"],"answer":"Mizan","explanation":"The balance weighing deeds is called. The phrase \'Mizan\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"The record of deeds is kept by the ?","options":["Kiraman Katibin","Scribes of the world","Teachers","Judges"],"answer":"Kiraman Katibin","explanation":"The record of deeds is kept by the . The phrase \'Kiraman Katibin\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Repentance in Arabic is called.","options":["Tawbah","Zakat","Sadaqah","Hajj"],"answer":"Tawbah","explanation":"Repentance in Arabic is called. The phrase \'Tawbah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Believing in the afterlife keeps hearts focused on.","options":["Good deeds","Entertainment","Work only","Hate"],"answer":"Good deeds","explanation":"Believing in the afterlife keeps hearts focused on. The phrase \'Good deeds\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Fear of Allah\'s mercy is balanced by  on the Day of Judgment.","options":["Hope","Panic","Hate","Jealousy"],"answer":"Hope","explanation":"Fear of Allah\'s mercy is balanced by  on the Day of Judgment. The phrase \'Hope\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Remembering death regularly encourages.","options":["Preparation","Shopping","Slumber","Jealousy"],"answer":"Preparation","explanation":"Remembering death regularly encourages. The phrase \'Preparation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Those who deny the hereafter will face ?","options":["Punishment","Fancy meals","Travel","Joy"],"answer":"Punishment","explanation":"Those who deny the hereafter will face . The phrase \'Punishment\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"The hereafter is described as either Paradise or.","options":["Hell","Desert","City","Garden"],"answer":"Hell","explanation":"The hereafter is described as either Paradise or. The phrase \'Hell\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Seeking Allah\'s mercy and forgiveness is done through.","options":["Dua","Shopping","Sleeping","Arguing"],"answer":"Dua","explanation":"Seeking Allah\'s mercy and forgiveness is done through. The phrase \'Dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Which habit supports hope while fearing Allah?","options":["Balanced dua","Laziness","Arguments","Jealousy"],"answer":"Balanced dua","explanation":"Which habit supports hope while fearing Allah. The phrase \'Balanced dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"A believer reminds themselves of death to stay.","options":["Humble","Boastful","Angry","Lazy"],"answer":"Humble","explanation":"A believer reminds themselves of death to stay. The phrase \'Humble\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Barzakh is the period between death and.","options":["Resurrection","Eid","Ramadan","Hajj"],"answer":"Resurrection","explanation":"Barzakh is the period between death and. The phrase \'Resurrection\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Belief in the hereafter makes us guard our.","options":["Actions","Status","Phones","Money"],"answer":"Actions","explanation":"Belief in the hereafter makes us guard our. The phrase \'Actions\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Yawm al-Qiyamah is when Allah will  all people.","options":["Judge","Reward","Gift","Ignore"],"answer":"Judge","explanation":"Yawm al-Qiyamah is when Allah will  all people. The phrase \'Judge\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"Maintaining hope and fear keeps the believer\'s  balanced.","options":["Heart","Wallet","Schedule","Temper"],"answer":"Heart","explanation":"Maintaining hope and fear keeps the believer\'s  balanced. The phrase \'Heart\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Remembering the grave encourages.","options":["Preparation","Travel","Noise","Games"],"answer":"Preparation","explanation":"Remembering the grave encourages. The phrase \'Preparation\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]},{"chapterId":15,"questions":[{"question":"What is the Arabic name for Paradise?","options":["Jannah","Jahannam","Salah","Sawm"],"answer":"Jannah","explanation":"What is the Arabic name for Paradise. The phrase \'Jannah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":0},{"question":"What is the Arabic name for Hell?","options":["Jahannam","Jannah","Salah","Quran"],"answer":"Jahannam","explanation":"What is the Arabic name for Hell. The phrase \'Jahannam\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":1},{"question":"Jannah is described as gardens with.","options":["Rivers","Mountains","Deserts","Lakes of oil"],"answer":"Rivers","explanation":"Jannah is described as gardens with. The phrase \'Rivers\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":2},{"question":"Jahannam is described as a place of.","options":["Fire","Fruits","Peace","Silence"],"answer":"Fire","explanation":"Jahannam is described as a place of. The phrase \'Fire\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":3},{"question":"Muslims ask Allah for  from the Fire.","options":["Refuge","Fame","Money","Power"],"answer":"Refuge","explanation":"Muslims ask Allah for  from the Fire. The phrase \'Refuge\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":4},{"question":"Who is promised Paradise?","options":["Believers with righteous deeds","Only the rich","Only scholars","Only warriors"],"answer":"Believers with righteous deeds","explanation":"Who is promised Paradise. The phrase \'Believers with righteous deeds\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":5},{"question":"Which highest level of Paradise is called ?","options":["Firdaws","Kabah","Masjid","Qibla"],"answer":"Firdaws","explanation":"Which highest level of Paradise is called . The phrase \'Firdaws\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":6},{"question":"Seeking forgiveness is a step toward.","options":["Paradise","Sleep","Stress","Conflict"],"answer":"Paradise","explanation":"Seeking forgiveness is a step toward. The phrase \'Paradise\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":7},{"question":"Hell is for those who persist in.","options":["Shirk","Charity","Prayer","Helping"],"answer":"Shirk","explanation":"Hell is for those who persist in. The phrase \'Shirk\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":8},{"question":"Asking for Paradise and refuge from Hell is.","options":["A dua the Prophet (peace be upon him) taught","A new habit","A story","A dream"],"answer":"A dua the Prophet (peace be upon him) taught","explanation":"Asking for Paradise and refuge from Hell is. The phrase \'A dua the Prophet (peace be upon him) taught\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":9},{"question":"Charity, prayer, and repentance lighten the path to.","options":["Paradise","Fame","Profit","Noise"],"answer":"Paradise","explanation":"Charity, prayer, and repentance lighten the path to. The phrase \'Paradise\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":10},{"question":"The Quran describes Hell\'s fuel as ?","options":["People and stones","Water","Flowers","Gold"],"answer":"People and stones","explanation":"The Quran describes Hell\'s fuel as . The phrase \'People and stones\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":11},{"question":"Paradise is filled with what kind of dwellings?","options":["Light filled palaces","Tents","Towers of dust","Metal boxes"],"answer":"Light filled palaces","explanation":"Paradise is filled with what kind of dwellings. The phrase \'Light filled palaces\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":12},{"question":"Which trait helps a believer avoid the Fire?","options":["Sincere repentance","Jealousy","Anger","Silence"],"answer":"Sincere repentance","explanation":"Which trait helps a believer avoid the Fire. The phrase \'Sincere repentance\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":13},{"question":"The Prophet (peace be upon him) asked Muslims to keep asking Allah for  ?","options":["Paradise and refuge from the Fire","More time","Games","Luxury"],"answer":"Paradise and refuge from the Fire","explanation":"The Prophet (peace be upon him) asked Muslims to keep asking Allah for  . The phrase \'Paradise and refuge from the Fire\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":14},{"question":"Muslims ask Allah for  in Paradise.","options":["Jannah","Fame","Power","Noise"],"answer":"Jannah","explanation":"Muslims ask Allah for  in Paradise. The phrase \'Jannah\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":15},{"question":"Seeking refuge from the Fire is a hopeful.","options":["Dua","Complaint","Dress","Story"],"answer":"Dua","explanation":"Seeking refuge from the Fire is a hopeful. The phrase \'Dua\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":16},{"question":"Paradise promises eternal.","options":["Joy","Debt","Noise","Silence"],"answer":"Joy","explanation":"Paradise promises eternal. The phrase \'Joy\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":17},{"question":"The Fire is reserved for those who persist in.","options":["Shirk","Giving","Listening","Loving"],"answer":"Shirk","explanation":"The Fire is reserved for those who persist in. The phrase \'Shirk\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":18},{"question":"Staying close to Allah\'s mercy guards against.","options":["The Fire","Rain","Food","Travel"],"answer":"The Fire","explanation":"Staying close to Allah\'s mercy guards against. The phrase \'The Fire\' captures the concept being asked it is the wording that matches the prompt exactly and matches the lesson focus.","sectionIndex":19}]}]');

/***/ }),

/***/ "./resources/components/vue/data/roadmap.json":
/*!****************************************************!*\
  !*** ./resources/components/vue/data/roadmap.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"title":"The Foundation","description":"Introduction to Islam & Tawheed","icon":"auto_awesome","color":"emerald","videoUrl":"PDxobYt_9zM"},{"id":2,"title":"The Beliefs","description":"Six Articles of Faith","icon":"psychology","color":"indigo","videoUrl":"Jd6dIqJ6_Zg"},{"id":3,"title":"The Pillars","description":"The Five Acts of Worship","icon":"star","color":"amber","videoUrl":"TpcO0uE1r-w"},{"id":4,"title":"The Quran","description":"Divine Revelation","icon":"menu_book","color":"teal","videoUrl":"1Y72J03fK-Y"},{"id":5,"title":"The Prophet","description":"Life of Muhammad (peace be upon him)","icon":"history_edu","color":"cyan","videoUrl":"sZ3rG-aWzWw"},{"id":6,"title":"The Prayer","description":"Connection (Salah)","icon":"schedule","color":"emerald","videoUrl":"kScrL8m1qMs"},{"id":7,"title":"Dua & Dhikr","description":"Weapons of the Believer","icon":"favorite","color":"purple","videoUrl":"dua-weapon"},{"id":8,"title":"The Heart","description":"Purification & Spiritual Diseases","icon":"favorite","color":"teal","videoUrl":"heartpurification"},{"id":9,"title":"The Manners","description":"Islamic Etiquette (Adab)","icon":"handshake","color":"amber","videoUrl":"B1J2_1wK6tM"},{"id":10,"title":"The Lifestyle","description":"Halal & Haram","icon":"style","color":"violet","videoUrl":"XJt9r-x1qMs"},{"id":11,"title":"Family & Marriage","description":"Building a Righteous Home","icon":"family_restroom","color":"emerald","videoUrl":"marriage101"},{"id":12,"title":"The Community","description":"Ummah & Support","icon":"groups","color":"blue","videoUrl":"lJt9r-x1qMs"},{"id":13,"title":"The Future","description":"Continuous Growth","icon":"trending_up","color":"slate","videoUrl":"yJt9r-x1qMs"},{"id":14,"title":"The Hereafter","description":"Death, Grave & Beyond","icon":"nightlight","color":"zinc","videoUrl":"9s3rG-aWzWw"},{"id":15,"title":"Paradise & Hell","description":"Your Permanent Home","icon":"park","color":"green","videoUrl":"JannahTour"}]');

/***/ }),

/***/ "./resources/components/vue/revert/LessonHeader.vue":
/*!**********************************************************!*\
  !*** ./resources/components/vue/revert/LessonHeader.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LessonHeader_vue_vue_type_template_id_ceb3c5f4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LessonHeader.vue?vue&type=template&id=ceb3c5f4 */ "./resources/components/vue/revert/LessonHeader.vue?vue&type=template&id=ceb3c5f4");
/* harmony import */ var _LessonHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LessonHeader.vue?vue&type=script&lang=js */ "./resources/components/vue/revert/LessonHeader.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_LessonHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_LessonHeader_vue_vue_type_template_id_ceb3c5f4__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/revert/LessonHeader.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/revert/LessonHeader.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/components/vue/revert/LessonHeader.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LessonHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LessonHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LessonHeader.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/LessonHeader.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/revert/LessonHeader.vue?vue&type=template&id=ceb3c5f4":
/*!****************************************************************************************!*\
  !*** ./resources/components/vue/revert/LessonHeader.vue?vue&type=template&id=ceb3c5f4 ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LessonHeader_vue_vue_type_template_id_ceb3c5f4__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LessonHeader_vue_vue_type_template_id_ceb3c5f4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LessonHeader.vue?vue&type=template&id=ceb3c5f4 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/LessonHeader.vue?vue&type=template&id=ceb3c5f4");


/***/ }),

/***/ "./resources/components/vue/revert/QuizSection.vue":
/*!*********************************************************!*\
  !*** ./resources/components/vue/revert/QuizSection.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuizSection_vue_vue_type_template_id_9061a582__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuizSection.vue?vue&type=template&id=9061a582 */ "./resources/components/vue/revert/QuizSection.vue?vue&type=template&id=9061a582");
/* harmony import */ var _QuizSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuizSection.vue?vue&type=script&lang=js */ "./resources/components/vue/revert/QuizSection.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_QuizSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_QuizSection_vue_vue_type_template_id_9061a582__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/revert/QuizSection.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/revert/QuizSection.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/components/vue/revert/QuizSection.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuizSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuizSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuizSection.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/QuizSection.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/revert/QuizSection.vue?vue&type=template&id=9061a582":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/revert/QuizSection.vue?vue&type=template&id=9061a582 ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuizSection_vue_vue_type_template_id_9061a582__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuizSection_vue_vue_type_template_id_9061a582__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuizSection.vue?vue&type=template&id=9061a582 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/QuizSection.vue?vue&type=template&id=9061a582");


/***/ }),

/***/ "./resources/components/vue/revert/ResourcePanel.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/revert/ResourcePanel.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ResourcePanel_vue_vue_type_template_id_08c75776__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourcePanel.vue?vue&type=template&id=08c75776 */ "./resources/components/vue/revert/ResourcePanel.vue?vue&type=template&id=08c75776");
/* harmony import */ var _ResourcePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourcePanel.vue?vue&type=script&lang=js */ "./resources/components/vue/revert/ResourcePanel.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ResourcePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ResourcePanel_vue_vue_type_template_id_08c75776__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/revert/ResourcePanel.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/revert/ResourcePanel.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/revert/ResourcePanel.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcePanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ResourcePanel.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/ResourcePanel.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/revert/ResourcePanel.vue?vue&type=template&id=08c75776":
/*!*****************************************************************************************!*\
  !*** ./resources/components/vue/revert/ResourcePanel.vue?vue&type=template&id=08c75776 ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcePanel_vue_vue_type_template_id_08c75776__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcePanel_vue_vue_type_template_id_08c75776__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ResourcePanel.vue?vue&type=template&id=08c75776 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/ResourcePanel.vue?vue&type=template&id=08c75776");


/***/ }),

/***/ "./resources/components/vue/revert/VideoGallery.vue":
/*!**********************************************************!*\
  !*** ./resources/components/vue/revert/VideoGallery.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VideoGallery_vue_vue_type_template_id_f6142710__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoGallery.vue?vue&type=template&id=f6142710 */ "./resources/components/vue/revert/VideoGallery.vue?vue&type=template&id=f6142710");
/* harmony import */ var _VideoGallery_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoGallery.vue?vue&type=script&lang=js */ "./resources/components/vue/revert/VideoGallery.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_VideoGallery_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_VideoGallery_vue_vue_type_template_id_f6142710__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/revert/VideoGallery.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/revert/VideoGallery.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/components/vue/revert/VideoGallery.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoGallery_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoGallery_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VideoGallery.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/VideoGallery.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/revert/VideoGallery.vue?vue&type=template&id=f6142710":
/*!****************************************************************************************!*\
  !*** ./resources/components/vue/revert/VideoGallery.vue?vue&type=template&id=f6142710 ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoGallery_vue_vue_type_template_id_f6142710__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VideoGallery_vue_vue_type_template_id_f6142710__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VideoGallery.vue?vue&type=template&id=f6142710 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/revert/VideoGallery.vue?vue&type=template&id=f6142710");


/***/ }),

/***/ "./resources/js/components/RevertComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/RevertComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RevertComponent.vue?vue&type=script&lang=js */ "./resources/js/components/RevertComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/RevertComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/RevertComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/RevertComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevertComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);