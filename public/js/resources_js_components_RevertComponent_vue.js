"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_RevertComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _data_roadmap_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/roadmap.json */ "./resources/js/components/data/roadmap.json");
/* harmony import */ var _data_quizzes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/quizzes.json */ "./resources/js/components/data/quizzes.json");
/* harmony import */ var _data_faqs_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/faqs.json */ "./resources/js/components/data/faqs.json");
/* harmony import */ var _data_commonQuestions_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/commonQuestions.json */ "./resources/js/components/data/commonQuestions.json");
/* harmony import */ var _data_premiumResources_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/premiumResources.json */ "./resources/js/components/data/premiumResources.json");
/* harmony import */ var _data_duas_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/duas.json */ "./resources/js/components/data/duas.json");
/* harmony import */ var _data_homework_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data/homework.json */ "./resources/js/components/data/homework.json");
/* harmony import */ var _data_missions_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data/missions.json */ "./resources/js/components/data/missions.json");
/* harmony import */ var _data_onboarding_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data/onboarding.json */ "./resources/js/components/data/onboarding.json");
/* harmony import */ var _data_chapterDosDonts_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./data/chapterDosDonts.json */ "./resources/js/components/data/chapterDosDonts.json");
/* harmony import */ var _data_keyInsights_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./data/keyInsights.json */ "./resources/js/components/data/keyInsights.json");
/* harmony import */ var _data_chapterGuidance_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./data/chapterGuidance.json */ "./resources/js/components/data/chapterGuidance.json");
/* harmony import */ var _data_chapterToneGuidelines_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./data/chapterToneGuidelines.json */ "./resources/js/components/data/chapterToneGuidelines.json");
/* harmony import */ var _data_chapterToneFocus_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./data/chapterToneFocus.json */ "./resources/js/components/data/chapterToneFocus.json");
/* harmony import */ var _data_chapterGuidedPathway_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./data/chapterGuidedPathway.json */ "./resources/js/components/data/chapterGuidedPathway.json");
/* harmony import */ var _data_chapterGentleStart_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./data/chapterGentleStart.json */ "./resources/js/components/data/chapterGentleStart.json");
/* harmony import */ var _data_chapterSectionStats_json__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./data/chapterSectionStats.json */ "./resources/js/components/data/chapterSectionStats.json");
/* harmony import */ var _data_chapterLessonOverview_json__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./data/chapterLessonOverview.json */ "./resources/js/components/data/chapterLessonOverview.json");
/* harmony import */ var _data_chapterVideos_json__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./data/chapterVideos.json */ "./resources/js/components/data/chapterVideos.json");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




















const normalizeJson = value => {
  if (value && Array.isArray(value)) return value;
  if (value && value.default && Array.isArray(value.default)) return value.default;
  return [];
};

// FULL-SCREEN EPIC CONFETTI
const fullScreenConfetti = () => {
  // Left shower
  window.confetti({
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
    disableForReducedMotion: true
  });

  // Right shower
  window.confetti({
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
    disableForReducedMotion: true
  });

  // Big center explosion
  window.confetti({
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
    disableForReducedMotion: true
  });
};
const FINAL_CHAPTER_ID = 10;
const celebrateFinalChapter = () => {
  if (!window.confetti) return;
  const bursts = [{
    particleCount: 220,
    spread: 200,
    startVelocity: 70,
    scalar: 1.5,
    colors: ['#facc15', '#fb923c', '#f472b6', '#38bdf8', '#22d3ee', '#a855f7']
  }, {
    particleCount: 180,
    spread: 160,
    startVelocity: 50,
    drift: 0.5,
    colors: ['#34d399', '#a5b4fc', '#fcd34d', '#fb7185']
  }, {
    particleCount: 140,
    spread: 190,
    startVelocity: 80,
    scalar: 1.6,
    colors: ['#0ea5e9', '#f97316', '#10b981']
  }];
  bursts.forEach(config => {
    window.confetti(_objectSpread(_objectSpread({}, config), {}, {
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6
      },
      shapes: ['square', 'circle'],
      zIndex: 10000,
      disableForReducedMotion: true
    }));
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'App',
  data() {
    return {
      roadmapData: normalizeJson(_data_roadmap_json__WEBPACK_IMPORTED_MODULE_1__),
      chapterLessons: normalizeJson(_data_chapterLessonOverview_json__WEBPACK_IMPORTED_MODULE_18__),
      faqChapters: normalizeJson(_data_faqs_json__WEBPACK_IMPORTED_MODULE_3__),
      commonQuestionChapters: normalizeJson(_data_commonQuestions_json__WEBPACK_IMPORTED_MODULE_4__),
      premiumResources: normalizeJson(_data_premiumResources_json__WEBPACK_IMPORTED_MODULE_5__),
      quizzes: normalizeJson(_data_quizzes_json__WEBPACK_IMPORTED_MODULE_2__),
      missions: normalizeJson(_data_missions_json__WEBPACK_IMPORTED_MODULE_8__),
      duas: normalizeJson(_data_duas_json__WEBPACK_IMPORTED_MODULE_6__),
      dosDontsChapters: normalizeJson(_data_chapterDosDonts_json__WEBPACK_IMPORTED_MODULE_10__),
      chapterKeyInsights: normalizeJson(_data_keyInsights_json__WEBPACK_IMPORTED_MODULE_11__),
      guidanceTemplates: normalizeJson(_data_chapterGuidance_json__WEBPACK_IMPORTED_MODULE_12__),
      toneGuidelinesByChapter: normalizeJson(_data_chapterToneGuidelines_json__WEBPACK_IMPORTED_MODULE_13__),
      toneFocusEntries: normalizeJson(_data_chapterToneFocus_json__WEBPACK_IMPORTED_MODULE_14__),
      guidedPathways: normalizeJson(_data_chapterGuidedPathway_json__WEBPACK_IMPORTED_MODULE_15__),
      chapterGentleStarts: normalizeJson(_data_chapterGentleStart_json__WEBPACK_IMPORTED_MODULE_16__),
      sectionStatsByChapter: normalizeJson(_data_chapterSectionStats_json__WEBPACK_IMPORTED_MODULE_17__),
      homework: normalizeJson(_data_homework_json__WEBPACK_IMPORTED_MODULE_7__),
      chapterVideos: normalizeJson(_data_chapterVideos_json__WEBPACK_IMPORTED_MODULE_19__),
      lessonMap: {},
      missionMap: {},
      duasMap: {},
      quizMap: {},
      homeworkMap: {},
      chapterQuizPassed: false,
      quizQuestions: [],
      currentQuestionIndex: 0,
      quizStatus: null,
      quizFeedback: '',
      selectedOption: null,
      quizCorrectCount: 0,
      quizRequiredCorrect: 2,
      mobileNavOpen: false,
      maxStepReached: 1,
      selectedPill: 1,
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false,
      faqState: {},
      faqAccordionState: 0,
      commonAccordionState: 0,
      faqStackState: null,
      showResourceModal: false,
      activeResource: null,
      onboarding: normalizeJson(_data_onboarding_json__WEBPACK_IMPORTED_MODULE_9__),
      resourceCopyStatus: '',
      collapsedSections: {
        commonQuestions: false,
        resources: false,
        faqs: false
      },
      confettiPromise: null,
      lessonShareStatus: '',
      duaShareStatus: '',
      overviewFontScale: 1,
      duaFontScale: 1,
      globalFontScale: 1,
      copyAlertMessage: '',
      copyAlertType: 'info',
      showCopyAlert: false,
      copyAlertTimeout: null,
      ttsSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      ttsActiveSection: null,
      currentUtterance: null
    };
  },
  computed: {
    currentLesson() {
      return this.lessonMap[this.selectedPill] || this.chapterLessons[0];
    },
    currentChapterKeyInsights() {
      var _this$currentLesson;
      const chapterId = (_this$currentLesson = this.currentLesson) === null || _this$currentLesson === void 0 ? void 0 : _this$currentLesson.chapterId;
      return this.chapterKeyInsights.find(entry => entry.chapterId === chapterId) || null;
    },
    insightsToShow() {
      var _this$currentChapterK, _this$currentLesson2;
      return (_this$currentChapterK = this.currentChapterKeyInsights) !== null && _this$currentChapterK !== void 0 && (_this$currentChapterK = _this$currentChapterK.keyInsights) !== null && _this$currentChapterK !== void 0 && _this$currentChapterK.length ? this.currentChapterKeyInsights.keyInsights : ((_this$currentLesson2 = this.currentLesson) === null || _this$currentLesson2 === void 0 ? void 0 : _this$currentLesson2.keyInsights) || [];
    },
    currentLessonOverview() {
      return this.chapterLessons.find(entry => entry.chapterId === this.selectedPill) || null;
    },
    overviewSections() {
      var _this$currentLessonOv;
      return ((_this$currentLessonOv = this.currentLessonOverview) === null || _this$currentLessonOv === void 0 ? void 0 : _this$currentLessonOv.overview) || [];
    },
    chapterCommonPanels() {
      const chapter = this.commonQuestionChapters.find(entry => entry.chapterId === this.selectedPill);
      return (chapter === null || chapter === void 0 ? void 0 : chapter.faqs) || [];
    },
    chapterFaqPanels() {
      const chapter = this.faqChapters.find(entry => entry.chapterId === this.selectedPill);
      return (chapter === null || chapter === void 0 ? void 0 : chapter.faqs) || [];
    },
    progressPercentage() {
      return (this.maxStepReached - 1) / this.roadmapData.length * 100;
    },
    completedChapters() {
      return this.maxStepReached - 1;
    },
    totalChapters() {
      return this.roadmapData.length;
    },
    learningObjectiveColumns() {
      var _this$currentLesson3;
      const objectives = ((_this$currentLesson3 = this.currentLesson) === null || _this$currentLesson3 === void 0 ? void 0 : _this$currentLesson3.learningObjectives) || [];
      const chunkSize = 3;
      const columns = [];
      for (let i = 0; i < objectives.length; i += chunkSize) {
        columns.push(objectives.slice(i, i + chunkSize));
      }
      return columns;
    },
    lessonHeroStats() {
      return [{
        label: 'Chapters unlocked',
        value: `${Math.min(this.maxStepReached, this.roadmapData.length) - 1}`
      }, {
        label: 'Resources',
        value: `${this.premiumResources.length}`
      }, {
        label: 'Quizzes available',
        value: `${this.quizzes.length}`
      }];
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
      return this.homeworkMap[this.selectedPill] || [];
    },
    guidanceCards() {
      var _this$currentLesson4, _template$cards, _lesson$sections, _lesson$keyInsights, _lesson$keyInsights2;
      const chapterId = (_this$currentLesson4 = this.currentLesson) === null || _this$currentLesson4 === void 0 ? void 0 : _this$currentLesson4.chapterId;
      const template = this.guidanceTemplates.find(entry => entry.chapterId === chapterId);
      if (template && (_template$cards = template.cards) !== null && _template$cards !== void 0 && _template$cards.length) return template.cards;
      const lesson = this.currentLesson;
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
      if (!this.currentDuas.length) {
        cards[1].description = 'Use the glossary, resources, and mission to keep the lesson alive';
        cards[1].action = 'Pin a phrase that resonated most';
      }
      return cards;
    },
    toneGuidelines() {
      var _this$currentLesson5, _entry$guidelines;
      const chapterId = (_this$currentLesson5 = this.currentLesson) === null || _this$currentLesson5 === void 0 ? void 0 : _this$currentLesson5.chapterId;
      const entry = this.toneGuidelinesByChapter.find(item => item.chapterId === chapterId);
      if (entry !== null && entry !== void 0 && (_entry$guidelines = entry.guidelines) !== null && _entry$guidelines !== void 0 && _entry$guidelines.length) {
        return entry.guidelines;
      }
      return ['Welcoming every background without assumptions', 'Encouraging progress, not perfection', 'Keeping language simple and non-technical', 'Avoiding judgment or cultural generalizations'];
    },
    currentToneFocusText() {
      var _this$currentLesson6;
      const chapterId = (_this$currentLesson6 = this.currentLesson) === null || _this$currentLesson6 === void 0 ? void 0 : _this$currentLesson6.chapterId;
      const entry = this.toneFocusEntries.find(item => item.chapterId === chapterId);
      return (entry === null || entry === void 0 ? void 0 : entry.toneFocus) || '';
    },
    guidedPathwayCards() {
      var _this$currentLesson7;
      const chapterId = (_this$currentLesson7 = this.currentLesson) === null || _this$currentLesson7 === void 0 ? void 0 : _this$currentLesson7.chapterId;
      const entry = this.guidedPathways.find(item => item.chapterId === chapterId);
      return (entry === null || entry === void 0 ? void 0 : entry.pathway) || this.guidanceCards;
    },
    currentGentleStartSteps() {
      var _this$currentLesson8;
      const chapterId = (_this$currentLesson8 = this.currentLesson) === null || _this$currentLesson8 === void 0 ? void 0 : _this$currentLesson8.chapterId;
      const entry = this.chapterGentleStarts.find(item => item.chapterId === chapterId);
      return (entry === null || entry === void 0 ? void 0 : entry.steps) || this.currentOnboardingSteps;
    },
    sectionStatsMap() {
      var _this$currentLesson9;
      const chapterId = (_this$currentLesson9 = this.currentLesson) === null || _this$currentLesson9 === void 0 ? void 0 : _this$currentLesson9.chapterId;
      const entry = this.sectionStatsByChapter.find(item => item.chapterId === chapterId);
      return (entry === null || entry === void 0 ? void 0 : entry.sectionStats) || [];
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
    lessonDepartments() {
      var _this$currentLesson0;
      const sections = ((_this$currentLesson0 = this.currentLesson) === null || _this$currentLesson0 === void 0 ? void 0 : _this$currentLesson0.sections) || [];
      if (!sections.length) return [];
      const icons = ['bi-gem', 'bi-heart', 'bi-lightbulb', 'bi-book', 'bi-graph-up'];
      return sections.slice(0, 3).map((section, index) => {
        var _section$deepDive;
        return {
          name: section.title.split(' ').slice(0, 2).join(' '),
          summary: section.title,
          detail: ((_section$deepDive = section.deepDive) === null || _section$deepDive === void 0 ? void 0 : _section$deepDive.title) || 'Integrated across insights, duas, and missions.',
          icon: icons[index % icons.length]
        };
      });
    },
    currentDosDonts() {
      var _this$currentLesson1;
      const chapterId = (_this$currentLesson1 = this.currentLesson) === null || _this$currentLesson1 === void 0 ? void 0 : _this$currentLesson1.chapterId;
      return this.dosDontsChapters.find(entry => entry.chapterId === chapterId) || null;
    },
    lessonVideos() {
      var _this$currentLesson10;
      const chapterId = (_this$currentLesson10 = this.currentLesson) === null || _this$currentLesson10 === void 0 ? void 0 : _this$currentLesson10.chapterId;
      const entry = this.chapterVideos.find(record => record.chapterId === chapterId);
      return ((entry === null || entry === void 0 ? void 0 : entry.videos) || []).slice(0, 8);
    },
    focusHighlights() {
      var _lesson$sections2, _objectives$, _ref, _lesson$keyInsights$, _lesson$keyInsights3, _lesson$summary;
      const lesson = this.currentLesson || {};
      const objectives = lesson.learningObjectives || [];
      return [{
        label: 'Sections',
        value: `${((_lesson$sections2 = lesson.sections) === null || _lesson$sections2 === void 0 ? void 0 : _lesson$sections2.length) || 0}`,
        detail: 'Read slowly, pause, and replay the explanations.'
      }, {
        label: 'First objective',
        value: (_objectives$ = objectives[0]) !== null && _objectives$ !== void 0 ? _objectives$ : 'Insight',
        detail: 'Let this goal guide your dua and reflection.'
      }, {
        label: 'Tip',
        value: (_ref = (_lesson$keyInsights$ = (_lesson$keyInsights3 = lesson.keyInsights) === null || _lesson$keyInsights3 === void 0 ? void 0 : _lesson$keyInsights3[0]) !== null && _lesson$keyInsights$ !== void 0 ? _lesson$keyInsights$ : (_lesson$summary = lesson.summary) === null || _lesson$summary === void 0 ? void 0 : _lesson$summary.slice(0, 40)) !== null && _ref !== void 0 ? _ref : 'Stay present',
        detail: 'Keep the message close to your heart as you progress.'
      }];
    },
    modalTagline() {
      var _this$activeResource;
      return ((_this$activeResource = this.activeResource) === null || _this$activeResource === void 0 ? void 0 : _this$activeResource.tagline) || 'Study carefully and revisit whenever you need clarity.';
    },
    currentOnboardingSteps() {
      var _this$onboarding$find;
      return ((_this$onboarding$find = this.onboarding.find(o => o.chapterId === this.selectedPill)) === null || _this$onboarding$find === void 0 ? void 0 : _this$onboarding$find.steps) || [];
    }
  },
  watch: {
    selectedPill() {
      this.chapterQuizPassed = false;
      this.resetQuizSet();
      this.scrollToTop();
      this.faqAccordionState = null;
      this.commonAccordionState = null;
    }
  },
  created() {
    this.buildLookupMaps();
  },
  mounted() {
    const saved = localStorage.getItem('maxStepReached');
    if (saved) {
      const value = parseInt(saved, 10);
      this.maxStepReached = value;
      this.selectedPill = value;
    }
    this.resetQuizSet();
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
  },
  methods: {
    ensureConfettiScript() {
      if (this.confettiPromise) return this.confettiPromise;
      if (typeof window === 'undefined') {
        this.confettiPromise = Promise.resolve();
        return this.confettiPromise;
      }
      if (window.confetti) {
        this.confettiPromise = Promise.resolve();
        return this.confettiPromise;
      }
      this.confettiPromise = new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
        script.onload = () => {
          console.log('Confetti loaded & ready!');
          resolve();
        };
        script.onerror = () => resolve();
        document.head.appendChild(script);
      });
      return this.confettiPromise;
    },
    triggerConfetti(isFinalChapter) {
      this.scrollToTop();
      this.ensureConfettiScript().then(() => {
        if (!window.confetti) return;
        if (isFinalChapter) {
          celebrateFinalChapter();
          setTimeout(celebrateFinalChapter, 600);
        } else {
          fullScreenConfetti();
          setTimeout(fullScreenConfetti, 400);
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
    },
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
    selectPill(id) {
      if (id <= this.maxStepReached) {
        this.selectedPill = id;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      this.mobileNavOpen = false;
    },
    toggleFaq(index) {
      var _this$currentLesson11;
      const chapterKey = (_this$currentLesson11 = this.currentLesson) === null || _this$currentLesson11 === void 0 ? void 0 : _this$currentLesson11.chapterId;
      if (!chapterKey) return;
      const current = this.faqState[chapterKey];
      const next = current === index ? null : index;
      this.faqState = _objectSpread(_objectSpread({}, this.faqState), {}, {
        [chapterKey]: next
      });
    },
    isFaqOpen(index) {
      var _this$currentLesson12;
      const chapterKey = (_this$currentLesson12 = this.currentLesson) === null || _this$currentLesson12 === void 0 ? void 0 : _this$currentLesson12.chapterId;
      return this.faqState[chapterKey] === index;
    },
    sectionStatsFor(title) {
      var _this$sectionStatsMap;
      return ((_this$sectionStatsMap = this.sectionStatsMap.find(entry => entry.title === title)) === null || _this$sectionStatsMap === void 0 ? void 0 : _this$sectionStatsMap.stats) || [];
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
    toggleFaqStack(index) {
      this.faqStackState = this.faqStackState === index ? null : index;
    },
    isFaqStackOpen(index) {
      if (this.faqStackState === null) return false;
      return this.faqStackState === index || this.faqStackState === undefined && index === 0;
    },
    toggleSection(sectionKey) {
      this.collapsedSections[sectionKey] = !this.collapsedSections[sectionKey];
    },
    formatVideoUrl(url) {
      if (!url) return '';
      if (url.includes('watch?v=')) {
        return url.replace('watch?v=', 'embed/');
      }
      if (url.includes('youtu.be/')) {
        return url.replace('youtu.be/', 'www.youtube.com/embed/');
      }
      return url;
    },
    completeAndNext() {
      const nextId = this.selectedPill + 1;
      const isFinalChapter = this.selectedPill === FINAL_CHAPTER_ID;
      if (nextId > this.maxStepReached) {
        this.maxStepReached = nextId;
        localStorage.setItem('maxStepReached', nextId.toString());
        const chapter = this.roadmapData.find(c => c.id === this.selectedPill);
        this.successMessage = `"${(chapter === null || chapter === void 0 ? void 0 : chapter.title) || 'Chapter'}" chapter has been completed successfully!`;
        this.showSuccessAlert = true;
        this.isWaitingForNext = true;

        // FULL-SCREEN CONFETTI PARTY!
        this.$nextTick(() => {
          this.triggerConfetti(isFinalChapter);
        });

        // Auto hide toast
        setTimeout(() => {
          this.showSuccessAlert = false;
          setTimeout(() => {
            this.isWaitingForNext = false;
          }, 3000);
        }, 6000);
      }
      if (isFinalChapter) {
        setTimeout(() => {
          this.selectedPill = 1;
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          this.chapterQuizPassed = false;
        }, 900);
      } else if (nextId <= this.roadmapData.length) {
        this.selectedPill = nextId;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        this.chapterQuizPassed = false;
      }
    },
    retryQuiz() {
      this.resetQuizSet();
      this.quizFeedback = '';
      this.quizStatus = null;
      this.selectedOption = null;
    },
    focusMission() {
      const selector = '#mission-card';
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        el.classList.add('pulse-ring');
        setTimeout(() => el.classList.remove('pulse-ring'), 1600);
      }
    },
    openResource(resource) {
      this.activeResource = resource;
      this.showResourceModal = true;
    },
    closeResourceModal() {
      this.showResourceModal = false;
      this.activeResource = null;
    },
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
    scrollToTop() {
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      const lessonSection = document.querySelector('.revert-content section');
      if (lessonSection) {
        lessonSection.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
    copyResourceLink() {
      var _this$activeResource2, _navigator$clipboard;
      const link = (_this$activeResource2 = this.activeResource) === null || _this$activeResource2 === void 0 ? void 0 : _this$activeResource2.link;
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
    getTtsText(section) {
      if (section === 'lesson') {
        return this.getLessonOverviewText();
      }
      if (section === 'duas') {
        return `Duas takeaways: ${this.getDuasText()}`;
      }
      return '';
    },
    startTTS(section) {
      var _window$speechSynthes;
      if (!this.ttsSupported) {
        this.setShareStatus('lesson', 'Text-to-speech unavailable in this browser.');
        return;
      }
      this.stopTTS();
      const text = this.getTtsText(section);
      if (!text) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => {
        this.ttsActiveSection = null;
        this.currentUtterance = null;
      };
      this.currentUtterance = utterance;
      this.ttsActiveSection = section;
      (_window$speechSynthes = window.speechSynthesis) === null || _window$speechSynthes === void 0 || _window$speechSynthes.speak(utterance);
    },
    stopTTS() {
      if (this.currentUtterance) {
        var _window$speechSynthes2;
        (_window$speechSynthes2 = window.speechSynthesis) === null || _window$speechSynthes2 === void 0 || _window$speechSynthes2.cancel();
        this.ttsActiveSection = null;
        this.currentUtterance = null;
      }
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
                border-bottom: 1px solid rgba(15, 23, 42, 0.12);
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
      this.copyAlertType = type;
      this.showCopyAlert = true;
      this.copyAlertTimeout = setTimeout(() => {
        this.showCopyAlert = false;
        this.copyAlertMessage = '';
        this.copyAlertTimeout = null;
      }, 3000);
    },
    getLessonOverviewText() {
      var _lesson$summary2;
      const lesson = this.currentLesson;
      if (!lesson) return '';
      const summary = ((_lesson$summary2 = lesson.summary) === null || _lesson$summary2 === void 0 ? void 0 : _lesson$summary2.trim()) || 'Read slowly, ask questions, and pause between each section.';
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
    getDuasText() {
      if (!this.currentDuas.length) return '';
      return this.currentDuas.map(dua => `${dua.arabic} (${dua.english})`).join('\n');
    },
    shareDuas() {
      var _this$currentLesson13;
      const message = `Duas to carry from ${((_this$currentLesson13 = this.currentLesson) === null || _this$currentLesson13 === void 0 ? void 0 : _this$currentLesson13.title) || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`;
      this.openWhatsappShare(message);
    },
    copyDuas() {
      var _this$currentLesson14;
      const text = `Duas to carry from ${((_this$currentLesson14 = this.currentLesson) === null || _this$currentLesson14 === void 0 ? void 0 : _this$currentLesson14.title) || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`;
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
    shuffleArray(arr) {
      return arr.slice().sort(() => Math.random() - 0.5);
    },
    scrollToSection(index) {
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.guidance-card .guidance-card-item');
        if (cards[index]) {
          cards[index].scrollIntoView({
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
        if (this.quizCorrectCount >= this.quizRequiredCorrect) {
          this.chapterQuizPassed = true;
          this.quizFeedback = 'Nicely done! The Next Chapter button is activated.';
          this.$nextTick(() => {
            this.scrollToNextButton();
          });
        } else {
          this.quizFeedback = `Great! ${this.quizCorrectCount}/${this.quizRequiredCorrect} saved—${this.quizRequiredCorrect - this.quizCorrectCount} to go.`;
          setTimeout(() => {
            this.advanceQuestion();
          }, 700);
        }
      } else {
        this.quizFeedback = 'Not quite, try another option.';
      }
    }
  }
}));

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=template&id=1d764944&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=template&id=1d764944&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "revert-shell position-relative"
};
const _hoisted_2 = {
  key: 0,
  class: "success-alert-container"
};
const _hoisted_3 = {
  class: "alert alert-success-custom fade show shadow-lg",
  role: "alert"
};
const _hoisted_4 = {
  key: 0,
  class: "copy-alert-container"
};
const _hoisted_5 = {
  class: "row g-4"
};
const _hoisted_6 = {
  class: "navigation-card p-3 shadow-sm rounded-4"
};
const _hoisted_7 = {
  class: "progress-indicator mb-4"
};
const _hoisted_8 = {
  class: "d-flex justify-content-between align-items-center mb-1"
};
const _hoisted_9 = {
  class: "text-muted small"
};
const _hoisted_10 = {
  class: "progress-bar-container"
};
const _hoisted_11 = {
  class: "text-muted small mt-2 mb-0"
};
const _hoisted_12 = {
  class: "roadmap-pillset"
};
const _hoisted_13 = ["onClick", "data-locked"];
const _hoisted_14 = {
  class: "dot-wrapper d-flex align-items-center gap-2"
};
const _hoisted_15 = {
  class: "dot-icon-step"
};
const _hoisted_16 = {
  key: 0,
  class: "bi bi-check-lg"
};
const _hoisted_17 = {
  key: 1,
  class: "bi bi-star-fill"
};
const _hoisted_18 = {
  key: 2
};
const _hoisted_19 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_20 = {
  class: "text-muted"
};
const _hoisted_21 = {
  key: 0,
  class: "bi bi-arrow-up-right fs-5 text-teal"
};
const _hoisted_22 = {
  key: 1,
  class: "bi bi-chevron-down fs-5 text-muted"
};
const _hoisted_23 = {
  class: "col-12 col-md-8 col-lg-9"
};
const _hoisted_24 = {
  class: "lesson-header animated-fade-in mb-4"
};
const _hoisted_25 = {
  class: "lesson-hero position-relative overflow-hidden shadow-sm"
};
const _hoisted_26 = {
  class: "lesson-hero-content"
};
const _hoisted_27 = {
  class: "d-flex align-items-center mb-2"
};
const _hoisted_28 = {
  class: "text-uppercase text-white fw-semibold small"
};
const _hoisted_29 = {
  class: "fw-bold text-white text-start text-md-left mb-2"
};
const _hoisted_30 = {
  class: "text-white-50 mb-0"
};
const _hoisted_31 = {
  key: 0,
  class: "content-card guided-section-card mb-4 rounded-4"
};
const _hoisted_32 = {
  class: "guided-bullets px-3 pb-3"
};
const _hoisted_33 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_34 = {
  class: "text-muted"
};
const _hoisted_35 = {
  class: "content-card tone-card section-card mb-4 rounded-4"
};
const _hoisted_36 = {
  class: "card-body px-3"
};
const _hoisted_37 = {
  class: "tone-guidelines list-unstyled mb-0"
};
const _hoisted_38 = {
  key: 1,
  class: "content-card onboarding-card mb-4 rounded-4"
};
const _hoisted_39 = {
  class: "card-body px-4 py-3"
};
const _hoisted_40 = {
  class: "simple-onboarding-list mb-0"
};
const _hoisted_41 = {
  class: "d-block"
};
const _hoisted_42 = {
  class: "lesson-focus-intro d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
};
const _hoisted_43 = {
  class: "mb-0 text-muted medium"
};
const _hoisted_44 = {
  class: "content-card section-card animated-fade-slide mb-4 rounded-4",
  style: {
    "animation-delay": "0.05s"
  }
};
const _hoisted_45 = {
  class: "card-header d-flex align-items-center py-3"
};
const _hoisted_46 = {
  class: "lesson-focus-actions ms-auto"
};
const _hoisted_47 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_48 = {
  key: 0,
  class: "lesson-overview-summary mb-4"
};
const _hoisted_49 = {
  class: "text-muted small mb-3"
};
const _hoisted_50 = {
  key: 0,
  class: "row g-3"
};
const _hoisted_51 = {
  class: "overview-highlight border rounded-3 p-3 h-100"
};
const _hoisted_52 = {
  class: "fw-semibold mb-2"
};
const _hoisted_53 = {
  class: "mb-0 text-muted small"
};
const _hoisted_54 = {
  key: 1,
  class: "overview-section-list"
};
const _hoisted_55 = {
  class: "d-flex align-items-start gap-3 mb-3"
};
const _hoisted_56 = {
  class: "section-number fs-5"
};
const _hoisted_57 = {
  class: "fw-semibold mb-0 fs-5"
};
const _hoisted_58 = {
  key: 0,
  class: "section-stats d-flex flex-wrap gap-3 mt-3"
};
const _hoisted_59 = {
  class: "text-muted"
};
const _hoisted_60 = {
  key: 2,
  class: "overview-section-list"
};
const _hoisted_61 = {
  class: "d-flex align-items-start gap-3 mb-3"
};
const _hoisted_62 = {
  class: "section-number fs-5"
};
const _hoisted_63 = {
  class: "fw-semibold mb-0 fs-5"
};
const _hoisted_64 = ["innerHTML"];
const _hoisted_65 = {
  key: 0,
  class: "background mt-4 w-100 py-3 px-4 rounded-4 border"
};
const _hoisted_66 = {
  class: "deep-dive-header d-flex align-items-center mb-2"
};
const _hoisted_67 = {
  class: "fw-bold mb-0 text-dark fs-6"
};
const _hoisted_68 = ["innerHTML"];
const _hoisted_69 = {
  key: 1,
  class: "section-stats d-flex flex-wrap gap-3 mt-3"
};
const _hoisted_70 = {
  class: "text-muted"
};
const _hoisted_71 = {
  key: 2,
  class: "content-card lesson-focus-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_72 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_73 = {
  class: "row g-3"
};
const _hoisted_74 = {
  class: "dept-card h-100 p-3 rounded-3"
};
const _hoisted_75 = {
  class: "d-flex align-items-center gap-2 mb-2"
};
const _hoisted_76 = {
  class: "dept-icon"
};
const _hoisted_77 = {
  class: "fs-6 mb-0"
};
const _hoisted_78 = {
  class: "text-muted small mb-1"
};
const _hoisted_79 = {
  class: "text-dark fw-semibold mb-0"
};
const _hoisted_80 = {
  key: 3,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_81 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_82 = {
  class: "row g-3"
};
const _hoisted_83 = {
  class: "video-card h-100 d-flex flex-column rounded-3 border shadow-sm overflow-hidden"
};
const _hoisted_84 = {
  class: "ratio ratio-16x9"
};
const _hoisted_85 = ["src", "title"];
const _hoisted_86 = {
  class: "p-3"
};
const _hoisted_87 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_88 = {
  key: 0,
  class: "text-muted small mb-0"
};
const _hoisted_89 = {
  key: 4,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_90 = {
  class: "card-body p-3"
};
const _hoisted_91 = {
  class: "mb-3"
};
const _hoisted_92 = {
  class: "text-muted small mb-3"
};
const _hoisted_93 = {
  class: "row g-3"
};
const _hoisted_94 = {
  class: "col-12 col-md-6"
};
const _hoisted_95 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_96 = {
  class: "list-unstyled mb-0"
};
const _hoisted_97 = {
  class: "text-dark medium mt-1"
};
const _hoisted_98 = {
  class: "col-12 col-md-6"
};
const _hoisted_99 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_100 = {
  class: "list-unstyled mb-0"
};
const _hoisted_101 = {
  class: "text-dark medium mt-1"
};
const _hoisted_102 = {
  key: 0,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_103 = {
  class: "card-body p-3"
};
const _hoisted_104 = {
  class: "text-muted small mb-3"
};
const _hoisted_105 = {
  class: "list-group insight-list fs-6 lh-base"
};
const _hoisted_106 = {
  key: 1,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_107 = {
  class: "card-header d-flex align-items-center py-3 gap-3"
};
const _hoisted_108 = {
  class: "lesson-focus-actions ms-auto"
};
const _hoisted_109 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_110 = {
  class: "row g-3"
};
const _hoisted_111 = {
  class: "dua-card h-100 rounded-4 p-4 shadow-lg"
};
const _hoisted_112 = {
  key: 2,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_113 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_114 = ["aria-expanded"];
const _hoisted_115 = {
  class: "d-none d-sm-inline"
};
const _hoisted_116 = {
  class: "card-body p-3"
};
const _hoisted_117 = {
  class: "accordion-stack"
};
const _hoisted_118 = ["onClick"];
const _hoisted_119 = {
  class: "accordion-answer mt-2"
};
const _hoisted_120 = ["innerHTML"];
const _hoisted_121 = {
  key: 3,
  id: "mission-card",
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 mission-card"
};
const _hoisted_122 = {
  class: "card-body p-3"
};
const _hoisted_123 = {
  class: "mb-2 text-muted small"
};
const _hoisted_124 = {
  class: "fw-semibold"
};
const _hoisted_125 = {
  class: "text-dark fs-6"
};
const _hoisted_126 = {
  class: "d-flex flex-wrap gap-2 align-items-center mt-3"
};
const _hoisted_127 = {
  class: "badge bg-success text-white rounded-pill"
};
const _hoisted_128 = {
  key: 4,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_129 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_130 = ["aria-expanded"];
const _hoisted_131 = {
  class: "d-none d-sm-inline"
};
const _hoisted_132 = {
  class: "card-body p-3"
};
const _hoisted_133 = {
  class: "accordion-stack"
};
const _hoisted_134 = ["onClick"];
const _hoisted_135 = {
  class: "accordion-answer mt-2"
};
const _hoisted_136 = ["innerHTML"];
const _hoisted_137 = {
  class: "content-card next-steps-card animated-slide-up rounded-4 mb-4",
  style: {
    "animation-delay": "0.4s"
  }
};
const _hoisted_138 = {
  class: "card-body p-3"
};
const _hoisted_139 = {
  class: "row g-3"
};
const _hoisted_140 = {
  class: "col-12 col-md-12"
};
const _hoisted_141 = {
  class: "homework-grid"
};
const _hoisted_142 = {
  class: "d-flex align-items-center gap-2 mb-1"
};
const _hoisted_143 = {
  class: "mb-0 text-dark"
};
const _hoisted_144 = {
  key: 5,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 quiz-wrapper"
};
const _hoisted_145 = {
  class: "quiz-shell p-0"
};
const _hoisted_146 = {
  class: "quiz-body px-4 py-3"
};
const _hoisted_147 = {
  class: "quiz-progress-wrapper mb-3"
};
const _hoisted_148 = {
  class: "quiz-progress-track"
};
const _hoisted_149 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_150 = {
  class: "mb-0 small fw-semibold text-teal"
};
const _hoisted_151 = {
  class: "fw-semibold text-dark mb-4 quiz-question"
};
const _hoisted_152 = {
  class: "quiz-options-grid"
};
const _hoisted_153 = ["disabled", "onClick"];
const _hoisted_154 = {
  class: "icon-stack"
};
const _hoisted_155 = {
  key: 0,
  class: "bi bi-check-circle-fill text-white"
};
const _hoisted_156 = {
  key: 1,
  class: "bi bi-x-circle-fill text-white"
};
const _hoisted_157 = {
  key: 0,
  class: "quiz-success-note mt-3"
};
const _hoisted_158 = {
  class: "d-flex flex-column flex-md-row gap-2 align-items-start"
};
const _hoisted_159 = {
  class: "mb-0 fw-semibold text-teal"
};
const _hoisted_160 = {
  key: 5,
  class: "content-card transition-card text-dark rounded-4 animated-fade-slide mb-4"
};
const _hoisted_161 = {
  class: "d-flex align-items-center justify-content-between flex-wrap"
};
const _hoisted_162 = {
  class: "fw-semibold mb-0"
};
const _hoisted_163 = {
  class: "mb-1 text-teal small"
};
const _hoisted_164 = {
  class: "text-end"
};
const _hoisted_165 = {
  class: "badge bg-light text-dark rounded-pill px-3 py-2"
};
const _hoisted_166 = {
  class: "text-muted mt-3 mb-0"
};
const _hoisted_167 = {
  class: "actions-card animated-fade-in"
};
const _hoisted_168 = {
  class: "p-4 p-md-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between gap-3"
};
const _hoisted_169 = ["disabled"];
const _hoisted_170 = {
  class: "d-flex flex-column flex-md-row align-items-center gap-2"
};
const _hoisted_171 = {
  class: "text-muted small me-md-auto"
};
const _hoisted_172 = {
  key: 0,
  class: "text-teal small fw-semibold"
};
const _hoisted_173 = ["disabled"];
const _hoisted_174 = {
  key: 0
};
const _hoisted_175 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog"
};
const _hoisted_176 = {
  class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_177 = {
  class: "modal-content rounded-4 shadow-lg custom-modal-card"
};
const _hoisted_178 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_179 = {
  class: "modal-title fw-bold"
};
const _hoisted_180 = {
  class: "modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3"
};
const _hoisted_181 = {
  key: 0,
  class: "text-success small"
};
const _hoisted_182 = {
  class: "d-flex gap-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson4, _ctx$currentLessonOve, _ctx$currentLesson5, _ctx$currentLesson6, _ctx$currentChapterKe, _ctx$currentLesson7, _ctx$activeResource;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Background Layers "), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "background-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Nav Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "mobile-nav-toggle d-lg-none btn btn-light shadow-sm rounded-circle p-3 position-fixed top-3 start-3 z-3",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.mobileNavOpen ? 'bi-x-lg' : 'bi-list'])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Alert "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showSuccessAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill me-2"
  }, null, -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Congratulations!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.successMessage), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showCopyAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['alert', _ctx.alertClass, 'alert-outline', 'alert-copy-notification']),
    role: "status",
    "aria-live": "polite"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['me-2', _ctx.iconClass])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.copyAlertMessage), 1 /* TEXT */)], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", {
    class: "container-fluid revert-content px-3 px-md-4 py-4 py-md-5",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.globalFontScale}rem`
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SIDEBAR "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-12 col-md-4 col-lg-3", {
      'mobile-open': _ctx.mobileNavOpen
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Progress Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-bold small"
  }, "Course Progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.completedChapters) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.totalChapters), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progressPercentage + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round(_ctx.progressPercentage)) + "% Complete ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation List "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.roadmapData, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: step.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["roadmap-pill d-flex align-items-center justify-content-between", {
        active: _ctx.selectedPill === step.id,
        completed: step.id < _ctx.maxStepReached,
        locked: step.id > _ctx.maxStepReached
      }]),
      onClick: $event => _ctx.selectPill(step.id),
      "data-locked": step.id > _ctx.maxStepReached
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, [step.id < _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_16)) : step.id === _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_17)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.id), 1 /* TEXT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */)])]), step.id === _ctx.selectedPill ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_21)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_22))], 10 /* CLASS, PROPS */, _hoisted_13);
  }), 128 /* KEYED_FRAGMENT */))])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT AREA "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "lesson-hero-gradient"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journey me-2 text-white fs-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, " Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.summary), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"lesson-meta d-flex gap-3\">\n                <span class=\"badge badge-pill bg-light text-dark fw-semibold\">\n                  Objectives: {{ currentLesson?.learningObjectives?.length ?? 0 }}\n                </span>\n              </div> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Stats "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"row g-3 mb-4 hero-stats-row\">\n            <div v-for=\"stat in lessonHeroStats\" :key=\"stat.label\" class=\"col-12 col-sm-4\">\n              <article class=\"hero-stat-card d-flex flex-column\">\n                <span class=\"stat-label\">{{ stat.label }}</span>\n                <strong class=\"stat-value\">{{ stat.value }}</strong>\n                <span class=\"stat-helper text-muted small\">Premium insights</span>\n              </article>\n            </div>\n          </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Guidance Row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"guidanceCards.length\"\n            class=\"content-card section-card guidance-card animated-fade-slide mb-4 rounded-4\">\n            <div class=\"card-header d-flex align-items-center py-3\">\n              <i class=\"bi bi-compass-fill fs-4 me-3 text-teal\"></i>\n              <div>\n                <h2 class=\"fw-bold mb-0 fs-5\">Learning Guidance</h2>\n              </div>\n            </div>\n            <div class=\"card-body px-3 px-md-4\">\n              <div class=\"guidance-grid\">\n                <article v-for=\"(card, index) in guidanceCards\" :key=\"card.title\" class=\"guidance-card-item\">\n                  <div class=\"guidance-card-top\">\n                    <div class=\"d-flex align-items-center gap-2\">\n                      <span class=\"guidance-step\">{{ card.step }}</span>\n                      <p class=\"mb-0 text-muted small\">{{ index === 0 ? 'Start here' : index === 1 ? 'Deepen & personalize' : 'Finish strong' }}</p>\n                    </div>\n                    <h3 class=\"mt-2 fw-semibold\">{{ card.title }}</h3>\n                    <p class=\"mt-3 text-muted small\">{{ card.description }}</p>\n                  </div>\n                  <div class=\"guidance-line\">\n                    <span></span>\n                  </div>\n                  <div class=\"d-flex align-items-center gap-2 text-dark small fw-medium\">\n                    <i class=\"bi bi-arrow-right-circle-fill text-teal fs-5\"></i>\n                    <span>{{ card.action }}</span>\n                  </div>\n                </article>\n              </div>\n            </div>\n          </div> "), _ctx.guidedPathwayCards.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center justify-content-between flex-wrap gap-3 p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-teal small mb-1 fw-semibold"
  }, "Guided Pathway"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "mb-1 fw-semibold"
  }, "Follow the curated steps below"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Start with absorb, move through reflection, and end with mastery to keep momentum.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"d-flex gap-2 flex-wrap\">\n                <button type=\"button\" class=\"btn btn-outline-teal btn-sm fw-semibold\" @click=\"scrollToSection(0)\">\n                  Jump to Step 1\n                </button>\n                <button type=\"button\" class=\"btn btn-teal btn-sm fw-semibold\" @click=\"scrollToSection(2)\">\n                  Highlight Reinforcement\n                </button>\n              </div> ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.guidedPathwayCards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: card.step,
      class: "guided-bullet"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"guided-step\">{{ card.step }}</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.action), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center gap-3 py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sunrise-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Gentle Tone + Non-Judgmental Wording"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Tailor your reflection for each chapter with a warm, encouraging voice that stays neutral and inclusive.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.toneGuidelines, tone => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: tone,
      class: "mb-2"
    }, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle text-teal me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tone), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Onboarding Block "), _ctx.currentGentleStartSteps.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-1 text-muted small text-uppercase"
  }, "Gentle start", -1 /* CACHED */)), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-semibold mb-2"
  }, "Simple welcome for new friends", -1 /* CACHED */)), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-3"
  }, " Take it slow these three ideas hold the key to remembering today’s lesson. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentGentleStartSteps, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: step.title
    }, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "onboarding-bullet-icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "d-block mb-1"
  }, "Focus of this lesson", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentToneFocusText || ((_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.summary) || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"focusHighlights.length\" class=\"row focus-highlight-row mb-4 g-3\">\n            <div v-for=\"highlight in focusHighlights\" :key=\"highlight.label\" class=\"col-12 col-md-4\">\n              <article class=\"focus-pill-card p-3 rounded-4 shadow-sm h-100\">\n                <div class=\"d-flex align-items-center justify-content-between mb-1\">\n                  <span class=\"focus-pill-label text-muted small\">{{ highlight.label }}</span>\n                  <i class=\"bi bi-star text-teal\"></i>\n                </div>\n                <h5 class=\"fw-bold mb-1\">{{ highlight.value }}</h5>\n                <p class=\"mb-0 text-muted small\">{{ highlight.detail }}</p>\n              </article>\n            </div>\n          </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Learning objectives "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"learningObjectiveColumns.length\"\n            class=\"content-card section-card animated-fade-slide mb-4 rounded-4\">\n            <div class=\"card-header d-flex align-items-center py-3\">              \n              <i class=\"bi bi-database-fill-check fs-4 me-3 text-teal\"></i>\n              <h2 class=\"fw-bold mb-0 fs-5\">Learning Objectives</h2>\n            </div>\n\n            <div class=\"card-body card-teal px-3 px-md-4\">\n              <div class=\"learning-objectives-grid\">\n                <div v-for=\"(column, columnIndex) in learningObjectiveColumns\" :key=\"columnIndex\"\n                  class=\"objective-column\">\n                  <ul class=\"list-group insight-list fs-6 lh-base column-list m-0\">\n                    <li v-for=\"objective in column\" :key=\"objective\"\n                      class=\"list-group-item border-0 px-0 py-3 d-flex align-items-start gap-3\">\n                      <i class=\"fas fa-check-circle fs-5 mt-1 text-teal\"></i>\n                      <span>{{ objective }}</span>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" main content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-seam-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5 flex-grow-1"
  }, "Learning Overview")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.shareLessonOverview && _ctx.shareLessonOverview(...args))
  }, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.copyLessonOverview && _ctx.copyLessonOverview(...args))
  }, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.printLessonOverview && _ctx.printLessonOverview(...args))
  }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.lessonShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.lessonShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" lesson overview "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.overviewFontScale}em`,
      lineHeight: 1.6
    })
  }, [_ctx.currentLessonOverview ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentLessonOverview.summary), 1 /* TEXT */), (_ctx$currentLessonOve = _ctx.currentLessonOverview.highlights) !== null && _ctx$currentLessonOve !== void 0 && _ctx$currentLessonOve.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentLessonOverview.highlights, highlight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: highlight.label || highlight.heading,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.label || highlight.heading), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.description || highlight.content), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.overviewSections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.overviewSections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.heading,
      class: "section-block mb-5"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.heading), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content text-dark fs-6 lh-lg",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale}rem`
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.content), 5 /* TEXT, STYLE */), _ctx.sectionStatsFor(section.heading).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sectionStatsFor(section.heading), stat => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: stat.label,
        class: "section-stat-card"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "pt-3 mt-3"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])) : (_ctx$currentLesson5 = _ctx.currentLesson) !== null && _ctx$currentLesson5 !== void 0 && (_ctx$currentLesson5 = _ctx$currentLesson5.sections) !== null && _ctx$currentLesson5 !== void 0 && _ctx$currentLesson5.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson6 = _ctx.currentLesson) === null || _ctx$currentLesson6 === void 0 ? void 0 : _ctx$currentLesson6.sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "section-block mb-5"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content text-dark fs-6 lh-lg",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale}rem`
      }),
      innerHTML: section.content
    }, null, 12 /* STYLE, PROPS */, _hoisted_64), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb-fill me-2 fs-4 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "deep-dive-content text-dark fs-6",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale * 0.95}rem`
      }),
      innerHTML: section.deepDive.content
    }, null, 12 /* STYLE, PROPS */, _hoisted_68)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.sectionStatsFor(section.title).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_69, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sectionStatsFor(section.title), stat => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: stat.label,
        class: "section-stat-card"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_70, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "pt-3 mt-3"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Departments Focus "), _ctx.lessonDepartments.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_71, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bar-chart-line-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-0 fs-5"
  }, "Lesson Focus Across Departments"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0 small"
  }, "How this chapter aligns with every pillar of the experience")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonDepartments, dept => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dept.name,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(dept.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.summary), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.detail), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Revert Stories "), _ctx.lessonVideos.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_80, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection-play fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Revert stories"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0 small"
  }, "Eight personal clips from men and women keeping it straight to the point.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonVideos, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: video.title,
      class: "col-12 col-md-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: _ctx.formatVideoUrl(video.url),
      title: video.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_85)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_87, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), video.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_88, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dos and Dont's "), _ctx.currentDosDonts ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_89, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Do's and Dont's")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_92, "Guidance for " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentDosDonts.chapter), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_95, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-teal mb-3"
  }, "Do's", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_96, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDosDonts.dos, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id,
      class: "d-flex align-items-start gap-2 mb-2"
    }, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.text), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_99, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-danger mb-3"
  }, "Don'ts", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_100, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDosDonts.donts, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id,
      class: "d-flex align-items-start gap-2 mb-2"
    }, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-circle-fill fs-5 text-danger"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.text), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Key Insights "), _ctx.insightsToShow.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_102, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chart-line fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Key Insights")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_104, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$currentChapterKe = _ctx.currentChapterKeyInsights) === null || _ctx$currentChapterKe === void 0 ? void 0 : _ctx$currentChapterKe.chapter) || ((_ctx$currentLesson7 = _ctx.currentLesson) === null || _ctx$currentLesson7 === void 0 ? void 0 : _ctx$currentLesson7.title) || 'Chapter'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_105, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.insightsToShow, insight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: insight,
      class: "list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3"
    }, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(insight), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Duas "), _ctx.currentDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5 flex-grow-1"
  }, "Duas to Carry")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.shareDuas && _ctx.shareDuas(...args))
  }, [...(_cache[43] || (_cache[43] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.copyDuas && _ctx.copyDuas(...args))
  }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[6] || (_cache[6] = (...args) => _ctx.printDuas && _ctx.printDuas(...args))
  }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.duaShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_109, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.duaShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.duaFontScale}em`,
      lineHeight: 1.5
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDuas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dua.arabic,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_111, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "dua-glow"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      dir: "rtl",
      class: "fw-semibold lh-base mb-2 fs-5 text-teal border-bottom border-teal pb-2 text-end",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.duaFontScale * 1.05}rem`
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.arabic), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "mb-0 text-dark",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.duaFontScale}rem`
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.english), 5 /* TEXT, STYLE */)])]);
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Common asked questions "), _ctx.chapterCommonPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_112, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3 flex-grow-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-square-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Common Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1",
    onClick: _cache[7] || (_cache[7] = $event => _ctx.toggleSection('commonQuestions')),
    "aria-expanded": !_ctx.collapsedSections.commonQuestions
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.commonQuestions ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.commonQuestions ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_114)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.chapterCommonPanels, (panel, index) => {
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
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_118), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: panel.body
    }, null, 8 /* PROPS */, _hoisted_120)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen('common', index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.commonQuestions]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" resources "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"premiumResources.length\"\n              class=\"content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card\">\n              <div class=\"card-header d-flex align-items-center justify-content-between py-3 gap-3\">\n                <div class=\"d-flex align-items-center gap-3 flex-grow-1\">\n                  <i class=\"bi bi-info-circle-fill fs-4 text-teal\"></i>\n                  <h1 class=\"fw-bold mb-0 fs-5\">Resources</h1>\n                </div>\n                <button type=\"button\"\n                  class=\"section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1\"\n                  @click=\"toggleSection('resources')\"\n                  :aria-expanded=\"!collapsedSections.resources\">\n                  <span class=\"d-none d-sm-inline\">{{ collapsedSections.resources ? 'Show' : 'Hide' }}</span>\n                  <i class=\"bi\" :class=\"collapsedSections.resources ? 'bi-chevron-down' : 'bi-chevron-up'\"></i>\n                </button>\n              </div>\n\n              <div v-show=\"!collapsedSections.resources\" class=\"card-body p-3 \">\n                <div v-if=\"premiumResources.length\" class=\"row row-cols-1 row-cols-md-2 g-3 mb-4\">\n                  <div class=\"col\" v-for=\"card in premiumResources\" :key=\"card.title\">\n                    <article class=\"premium-card h-100 d-flex flex-column\">\n                      <div>\n                        <h3 class=\"h6 fw-semibold mb-2\">{{ card.title }}</h3>\n                        <p class=\"small text-muted mb-3\">{{ card.desc }}</p>\n                      </div>\n                      <button type=\"button\"\n                        class=\"mt-auto resource-link d-flex align-items-center justify-content-center gap-2\"\n                        @click=\"openResource(card)\">\n                        <span>Explore the resource</span>\n                        <i class=\"bi bi-arrow-up-right\"></i>\n                      </button>\n                    </article>\n                  </div>\n                </div>\n              </div>\n            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mission Spotlight "), _ctx.currentMission ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_121, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-flag-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Mission Pulse")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_122, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_123, "Current mission tied to chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.chapterId), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_124, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_125, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.summary), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_127, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.focus), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-sm fw-semibold",
    onClick: _cache[8] || (_cache[8] = (...args) => _ctx.focusMission && _ctx.focusMission(...args))
  }, " View Mission ↓ ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ "), _ctx.chapterFaqPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3 flex-grow-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Frequently Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1",
    onClick: _cache[9] || (_cache[9] = $event => _ctx.toggleSection('faqs')),
    "aria-expanded": !_ctx.collapsedSections.faqs
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_131, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.faqs ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.faqs ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_130)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_132, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.chapterFaqPanels, (panel, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: panel.id,
      class: "accordion-item-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-question accordion-trigger d-flex justify-content-between align-items-center w-100", {
        expanded: _ctx.isAccordionOpen('faq', index)
      }]),
      onClick: $event => _ctx.toggleAccordion('faq', index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(panel.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAccordionOpen('faq', index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_134), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_135, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: panel.body
    }, null, 8 /* PROPS */, _hoisted_136)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen('faq', index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.faqs]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_137, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard-check-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Next Steps & Homework")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_138, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_140, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_141, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentHomework, (task, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: task,
      class: "homework-task p-3 mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_142, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_143, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(task), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz Card "), _ctx.currentQuestion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_144, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-header px-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dice-4-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Chapter Quiz")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"badge text-dark bg-light rounded-pill px-3 py-2\">\n                    Question {{ currentQuestionIndex + 1 }} / {{ quizQuestions.length }}\n                  </span> ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_147, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_148, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-progress-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: (_ctx.currentQuestionIndex + (_ctx.quizStatus === 'correct' ? 1 : 0)) / _ctx.quizQuestions.length * 100 + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Progress toward mastery", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_150, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizProgressLabel), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_151, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentQuestion.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentQuestion.options, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: option,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn quiz-option text-start d-flex align-items-center justify-content-between", {
        'quiz-option--correct': _ctx.quizStatus === 'correct' && option === _ctx.currentQuestion.answer,
        'quiz-option--incorrect': _ctx.quizStatus === 'incorrect' && option === _ctx.selectedOption,
        'quiz-option--neutral': !(_ctx.quizStatus === 'correct' && option === _ctx.currentQuestion.answer) && !(_ctx.quizStatus === 'incorrect' && option === _ctx.selectedOption)
      }]),
      disabled: _ctx.chapterQuizPassed,
      onClick: $event => _ctx.answerQuiz(option)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_154, [_ctx.quizStatus === 'correct' && option === _ctx.currentQuestion.answer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_155)) : _ctx.quizStatus === 'incorrect' && option === _ctx.selectedOption ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_156)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_153);
  }), 128 /* KEYED_FRAGMENT */))]), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_157, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-badge-check-fill text-teal me-2 fs-5"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_158, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_159, "Great! " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizRequiredCorrect) + " correct answers recorded.", 1 /* TEXT */), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "The Next Chapter button above is now active.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-teal btn-sm shadow-none",
    onClick: _cache[10] || (_cache[10] = (...args) => _ctx.retryQuiz && _ctx.retryQuiz(...args))
  }, " Retake quiz ")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.chapterQuizPassed && _ctx.nextChapterPreview ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_160, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-1"
  }, "Up next", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_162, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_163, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.track), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_164, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_165, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.id), 1 /* TEXT */), _cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "transition-line mt-2"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_166, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.snippet), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Divider "), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "border-top pt-4 mt-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" NAVIGATION BUTTONS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_168, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-secondary fw-semibold px-4 py-3 fs-6 d-flex align-items-center gap-2", {
      'opacity-50 cursor-not-allowed': _ctx.selectedPill <= 1
    }]),
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[11] || (_cache[11] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[59] || (_cache[59] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_169), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_171, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPill) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.roadmapData.length), 1 /* TEXT */), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_172, "Quiz cleared • Next Chapter unlocked.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn next-btn fw-bold px-4 py-3 fs-6 text-white d-flex align-items-center gap-2", {
      'next-ready': _ctx.chapterQuizPassed && !(_ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext),
      'disabled': _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext || !_ctx.chapterQuizPassed
    }]),
    disabled: _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext || !_ctx.chapterQuizPassed,
    onClick: _cache[12] || (_cache[12] = (...args) => _ctx.completeAndNext && _ctx.completeAndNext(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isWaitingForNext ? 'Processing...' : 'Next Chapter'), 1 /* TEXT */), _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_173)])])])])])], 4 /* STYLE */), _ctx.showResourceModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_174, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_175, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_176, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_177, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_178, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_179, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$activeResource = _ctx.activeResource) === null || _ctx$activeResource === void 0 ? void 0 : _ctx$activeResource.title), 1 /* TEXT */)]), _cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body px-4 py-3"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_180, [_ctx.resourceCopyStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_181, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.resourceCopyStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_182, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-dark px-4",
    onClick: _cache[13] || (_cache[13] = (...args) => _ctx.copyResourceLink && _ctx.copyResourceLink(...args))
  }, [...(_cache[62] || (_cache[62] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-link-45deg"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Link ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal px-4",
    onClick: _cache[14] || (_cache[14] = (...args) => _ctx.closeResourceModal && _ctx.closeResourceModal(...args))
  }, " Close ")])])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/* harmony import */ var _RevertComponent_vue_vue_type_template_id_1d764944_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RevertComponent.vue?vue&type=template&id=1d764944&scoped=true */ "./resources/js/components/RevertComponent.vue?vue&type=template&id=1d764944&scoped=true");
/* harmony import */ var _RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RevertComponent.vue?vue&type=script&lang=js */ "./resources/js/components/RevertComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _RevertComponent_vue_vue_type_style_index_0_id_1d764944_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css */ "./resources/js/components/RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_RevertComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RevertComponent_vue_vue_type_template_id_1d764944_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-1d764944"],['__file',"resources/js/components/RevertComponent.vue"]])
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
 

/***/ }),

/***/ "./resources/js/components/RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_style_index_0_id_1d764944_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=style&index=0&id=1d764944&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/RevertComponent.vue?vue&type=template&id=1d764944&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/RevertComponent.vue?vue&type=template&id=1d764944&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_template_id_1d764944_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RevertComponent_vue_vue_type_template_id_1d764944_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RevertComponent.vue?vue&type=template&id=1d764944&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RevertComponent.vue?vue&type=template&id=1d764944&scoped=true");


/***/ }),

/***/ "./resources/js/components/data/chapterDosDonts.json":
/*!***********************************************************!*\
  !*** ./resources/js/components/data/chapterDosDonts.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"chapter":"Islamic Foundation","dos":[{"id":"islamic-foundation-do-1","text":"Recite the shahada with awareness several times each day"},{"id":"islamic-foundation-do-2","text":"Reflect on Allah\'s attributes and how they shape your purpose"},{"id":"islamic-foundation-do-3","text":"Pair a short dua with every new habit you form"},{"id":"islamic-foundation-do-4","text":"Surround yourself with gentle reminders of worship"},{"id":"islamic-foundation-do-5","text":"Share foundational knowledge with someone who is also learning"}],"donts":[{"id":"islamic-foundation-dont-1","text":"Don\'t rush through rituals without understanding their meaning"},{"id":"islamic-foundation-dont-2","text":"Avoid comparing your progress to others\' timelines"},{"id":"islamic-foundation-dont-3","text":"Don\'t let cultural habits eclipse the core creed"},{"id":"islamic-foundation-dont-4","text":"Steer clear of extreme self-judgment after a mistake"},{"id":"islamic-foundation-dont-5","text":"Don\'t neglect consistent dhikr just because you are busy"}]},{"chapterId":2,"chapter":"Islamic Beliefs","dos":[{"id":"islamic-beliefs-do-1","text":"Study each of the six articles and recite them aloud"},{"id":"islamic-beliefs-do-2","text":"Ask questions gently when doubts arise and seek scholars"},{"id":"islamic-beliefs-do-3","text":"Keep a diary noting how belief in Allah influences decisions"},{"id":"islamic-beliefs-do-4","text":"Mention Allah before important choices to build reliance"},{"id":"islamic-beliefs-do-5","text":"Teach the fundamentals to a friend or family member"}],"donts":[{"id":"islamic-beliefs-dont-1","text":"Don\'t ignore the unseen simply because it\'s hard to grasp"},{"id":"islamic-beliefs-dont-2","text":"Avoid listening to unreliable sources that sow confusion"},{"id":"islamic-beliefs-dont-3","text":"Don\'t treat faith as a checklistlet it soften the heart"},{"id":"islamic-beliefs-dont-4","text":"Don\'t isolate yourself when you need supportive company"},{"id":"islamic-beliefs-dont-5","text":"Avoid dismissing divine decree when plans change"}]},{"chapterId":3,"chapter":"Islamic Pillars","dos":[{"id":"islamic-pillars-do-1","text":"Begin each day with intention for the five pillars"},{"id":"islamic-pillars-do-2","text":"Use reminders to step into each prayer window"},{"id":"islamic-pillars-do-3","text":"Build a small charity habit even when funds are tight"},{"id":"islamic-pillars-do-4","text":"Fast a little outside Ramadan to strengthen discipline"},{"id":"islamic-pillars-do-5","text":"Research Hajj basics long before you plan to go"}],"donts":[{"id":"islamic-pillars-dont-1","text":"Don\'t leave prayers to the last minute"},{"id":"islamic-pillars-dont-2","text":"Avoid making pillars a mere routine without heart"},{"id":"islamic-pillars-dont-3","text":"Don\'t skip zakat out of convenienceplan ahead"},{"id":"islamic-pillars-dont-4","text":"Don\'t delay learning the pillar meanings because you feel unready"},{"id":"islamic-pillars-dont-5","text":"Avoid showing off worshipkeep intentions solely for Allah"}]},{"chapterId":4,"chapter":"Islamic Quran","dos":[{"id":"islamic-quran-do-1","text":"Read a short verse with translation every day"},{"id":"islamic-quran-do-2","text":"Listen to recitation to catch proper pronunciation"},{"id":"islamic-quran-do-3","text":"Journal reflections on a verse that moved you"},{"id":"islamic-quran-do-4","text":"Teach a portion of Quran to reinforce your own memory"},{"id":"islamic-quran-do-5","text":"Combine Arabic reading with a reliable tafsir"}],"donts":[{"id":"islamic-quran-dont-1","text":"Don\'t rush through entire pages without stopping to reflect"},{"id":"islamic-quran-dont-2","text":"Avoid ignoring etiquette like wudu or clean space"},{"id":"islamic-quran-dont-3","text":"Don\'t depend solely on transliterationpractice Arabic"},{"id":"islamic-quran-dont-4","text":"Don\'t let distractions steal your Quran time"},{"id":"islamic-quran-dont-5","text":"Avoid skipping revision of memorized verses"}]},{"chapterId":5,"chapter":"Islamic Prophet","dos":[{"id":"islamic-prophet-do-1","text":"Study his seerah in bite-sized chapters"},{"id":"islamic-prophet-do-2","text":"Send salutations whenever his name is mentioned"},{"id":"islamic-prophet-do-3","text":"Model his manners inside your family"},{"id":"islamic-prophet-do-4","text":"Follow his charity examples in your own neighborhood"},{"id":"islamic-prophet-do-5","text":"Ask Allah for love of the Prophet in your dua"}],"donts":[{"id":"islamic-prophet-dont-1","text":"Don\'t reduce his life to mythsstick to authentic sources"},{"id":"islamic-prophet-dont-2","text":"Avoid mocking or dismissing his companions\' struggles"},{"id":"islamic-prophet-dont-3","text":"Don\'t only admire him from afar; embody his mercy"},{"id":"islamic-prophet-dont-4","text":"Don\'t ignore his advice on balancing worship and rest"},{"id":"islamic-prophet-dont-5","text":"Avoid using his words to justify harsh behavior"}]},{"chapterId":6,"chapter":"Islamic Prayers","dos":[{"id":"islamic-prayers-do-1","text":"Plan your day around the five prayer windows"},{"id":"islamic-prayers-do-2","text":"Perfect your wudu with mindfulness"},{"id":"islamic-prayers-do-3","text":"Learn the meaning of what you recite in salah"},{"id":"islamic-prayers-do-4","text":"Add a short sunnah prayer to deepen khushu"},{"id":"islamic-prayers-do-5","text":"Pray in congregation when you can"}],"donts":[{"id":"islamic-prayers-dont-1","text":"Don\'t delay fajr unless absolutely necessary"},{"id":"islamic-prayers-dont-2","text":"Avoid thinking prayer is optional when you miss one"},{"id":"islamic-prayers-dont-3","text":"Don\'t rush through sujud without presence"},{"id":"islamic-prayers-dont-4","text":"Don\'t let fatigue become an excuse to skip a prayer"},{"id":"islamic-prayers-dont-5","text":"Avoid neglecting dua after prayercling to it"}]},{"chapterId":7,"chapter":"Islamic Manners","dos":[{"id":"islamic-manners-do-1","text":"Greet others with sincerity and a smile"},{"id":"islamic-manners-do-2","text":"Listen more than you speak in tense moments"},{"id":"islamic-manners-do-3","text":"Give praise and thanks without exaggeration"},{"id":"islamic-manners-do-4","text":"Forgive quickly when someone seeks repentance"},{"id":"islamic-manners-do-5","text":"Model gentle speech in online and offline spaces"}],"donts":[{"id":"islamic-manners-dont-1","text":"Don\'t raise your voice without necessity"},{"id":"islamic-manners-dont-2","text":"Avoid gossip or spreading rumors"},{"id":"islamic-manners-dont-3","text":"Don\'t respond to rudeness with rudeness"},{"id":"islamic-manners-dont-4","text":"Avoid ignoring elderly family members\' needs"},{"id":"islamic-manners-dont-5","text":"Don\'t let ego prevent you from apologizing"}]},{"chapterId":8,"chapter":"Islamic Lifestyle","dos":[{"id":"islamic-lifestyle-do-1","text":"Choose halal food intentionally and thank Allah"},{"id":"islamic-lifestyle-do-2","text":"Design a bedtime routine rooted in dhikr"},{"id":"islamic-lifestyle-do-3","text":"Keep finances transparent and honest"},{"id":"islamic-lifestyle-do-4","text":"Blend learning with leisure to refresh your heart"},{"id":"islamic-lifestyle-do-5","text":"Use technology to connect with beneficial circles"}],"donts":[{"id":"islamic-lifestyle-dont-1","text":"Don\'t consume media that drains your spirit"},{"id":"islamic-lifestyle-dont-2","text":"Avoid hoarding wealth at the expense of charity"},{"id":"islamic-lifestyle-dont-3","text":"Don\'t rush through mealseat with gratitude"},{"id":"islamic-lifestyle-dont-4","text":"Avoid neglecting physical rest when you need it"},{"id":"islamic-lifestyle-dont-5","text":"Don\'t let trends redefine your modesty"}]},{"chapterId":9,"chapter":"Islamic Community","dos":[{"id":"islamic-community-do-1","text":"Volunteer for mosque events and outreach"},{"id":"islamic-community-do-2","text":"Reach out to newcomers and make introductions"},{"id":"islamic-community-do-3","text":"Share beneficial knowledge during gatherings"},{"id":"islamic-community-do-4","text":"Pray behind knowledgeable imams when possible"},{"id":"islamic-community-do-5","text":"Support neighbors with gifts or kind words"}],"donts":[{"id":"islamic-community-dont-1","text":"Don\'t isolate yourself during key celebrations"},{"id":"islamic-community-dont-2","text":"Avoid judging others for different levels of practice"},{"id":"islamic-community-dont-3","text":"Don\'t withhold help when someone asks"},{"id":"islamic-community-dont-4","text":"Avoid spreading division or unfounded rumors"},{"id":"islamic-community-dont-5","text":"Don\'t ignore the elderly or the disabled in your circle"}]},{"chapterId":10,"chapter":"Islamic Future","dos":[{"id":"islamic-future-do-1","text":"Set spiritual goals rooted in Quranic guidance"},{"id":"islamic-future-do-2","text":"Pair planning with regular dua for success"},{"id":"islamic-future-do-3","text":"Schedule weekly check-ins with a mentor"},{"id":"islamic-future-do-4","text":"Document small victories for motivation"},{"id":"islamic-future-do-5","text":"Invest time in beneficial knowledge for tomorrow"}],"donts":[{"id":"islamic-future-dont-1","text":"Don\'t live only for tomorrow and forget today"},{"id":"islamic-future-dont-2","text":"Avoid planning without taking action"},{"id":"islamic-future-dont-3","text":"Don\'t let disappointment halt your progress"},{"id":"islamic-future-dont-4","text":"Avoid ignoring signs that a path is harmful"},{"id":"islamic-future-dont-5","text":"Don\'t rely solely on luckwork and pray"}]},{"chapterId":11,"chapter":"Islamic Hereafter","dos":[{"id":"islamic-hereafter-do-1","text":"Remember Allah\'s mercy and justice daily"},{"id":"islamic-hereafter-do-2","text":"Perform sincere repentance often"},{"id":"islamic-hereafter-do-3","text":"Give charity with the intention of ongoing reward"},{"id":"islamic-hereafter-do-4","text":"Check your deeds each night before sleeping"},{"id":"islamic-hereafter-do-5","text":"Teach loved ones about accountability gently"}],"donts":[{"id":"islamic-hereafter-dont-1","text":"Don\'t dismiss the grave and Day of Judgment"},{"id":"islamic-hereafter-dont-2","text":"Avoid delaying repentance because of shame"},{"id":"islamic-hereafter-dont-3","text":"Don\'t take your wealth for granted"},{"id":"islamic-hereafter-dont-4","text":"Avoid hoarding deeds without consistency"},{"id":"islamic-hereafter-dont-5","text":"Don\'t let fear freeze you into inaction"}]},{"chapterId":12,"chapter":"Islamic Paradise and Hell","dos":[{"id":"islamic-paradise-and-hell-do-1","text":"Reflect on descriptions of paradise to spark hope"},{"id":"islamic-paradise-and-hell-do-2","text":"Practice gratitude to taste paradise on earth"},{"id":"islamic-paradise-and-hell-do-3","text":"Speak kindly to earn Allah\'s mercy"},{"id":"islamic-paradise-and-hell-do-4","text":"Repent before you sleep each night"},{"id":"islamic-paradise-and-hell-do-5","text":"Share stories of the hereafter with children"}],"donts":[{"id":"islamic-paradise-and-hell-dont-1","text":"Don\'t ignore warnings about sinful paths"},{"id":"islamic-paradise-and-hell-dont-2","text":"Avoid assuming you are guaranteed paradise"},{"id":"islamic-paradise-and-hell-dont-3","text":"Don\'t become hardened toward those who sin"},{"id":"islamic-paradise-and-hell-dont-4","text":"Avoid using fear to portray Allah as distant"},{"id":"islamic-paradise-and-hell-dont-5","text":"Don\'t trivialize the importance of repentance"}]},{"chapterId":13,"chapter":"Islamic Dua Dhkir","dos":[{"id":"islamic-dua-dhkir-do-1","text":"Make short dhikr part of every commute"},{"id":"islamic-dua-dhkir-do-2","text":"Combine dua with praise before asking"},{"id":"islamic-dua-dhkir-do-3","text":"Keep a list of personal needs for dua time"},{"id":"islamic-dua-dhkir-do-4","text":"Recite morning and evening adhkar faithfully"},{"id":"islamic-dua-dhkir-do-5","text":"Use quiet moments to whisper names of Allah"}],"donts":[{"id":"islamic-dua-dhkir-dont-1","text":"Don\'t rush through dua like a to-do list"},{"id":"islamic-dua-dhkir-dont-2","text":"Avoid blaming Allah when dua is delayed"},{"id":"islamic-dua-dhkir-dont-3","text":"Don\'t limit dhikr to crises only"},{"id":"islamic-dua-dhkir-dont-4","text":"Avoid using others\' words without understanding"},{"id":"islamic-dua-dhkir-dont-5","text":"Don\'t forget to thank Allah after answered dua"}]},{"chapterId":14,"chapter":"Islamic Family and Marriage","dos":[{"id":"islamic-family-and-marriage-do-1","text":"Consult with family when making major decisions"},{"id":"islamic-family-and-marriage-do-2","text":"Pray together to build spiritual closeness"},{"id":"islamic-family-and-marriage-do-3","text":"Teach children salah and dua by modeling them"},{"id":"islamic-family-and-marriage-do-4","text":"Speak respectfully even during disagreements"},{"id":"islamic-family-and-marriage-do-5","text":"Celebrate milestones with gratitude as a household"}],"donts":[{"id":"islamic-family-and-marriage-dont-1","text":"Don\'t neglect parents while raising your own family"},{"id":"islamic-family-and-marriage-dont-2","text":"Avoid forcing opinions without listening"},{"id":"islamic-family-and-marriage-dont-3","text":"Don\'t break promises honored in the home"},{"id":"islamic-family-and-marriage-dont-4","text":"Avoid rushing into marriage without istikhara"},{"id":"islamic-family-and-marriage-dont-5","text":"Don\'t allow anger to fester before reconciliation"}]},{"chapterId":15,"chapter":"Islamic Heart","dos":[{"id":"islamic-heart-do-1","text":"Purge envy by celebrating others\' success"},{"id":"islamic-heart-do-2","text":"Practice muhasabah (self-accounting) nightly"},{"id":"islamic-heart-do-3","text":"Trust Allah\'s decree while making wise choices"},{"id":"islamic-heart-do-4","text":"Guard the heart with consistent dhikr"},{"id":"islamic-heart-do-5","text":"Seek knowledge that softens rather than hardens"}],"donts":[{"id":"islamic-heart-dont-1","text":"Don\'t let bitterness take root inside"},{"id":"islamic-heart-dont-2","text":"Avoid clinging to material status for identity"},{"id":"islamic-heart-dont-3","text":"Don\'t remain silent when a kind word is needed"},{"id":"islamic-heart-dont-4","text":"Avoid confusing arrogance for confidence"},{"id":"islamic-heart-dont-5","text":"Don\'t ignore signs of spiritual fatigue"}]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterGentleStart.json":
/*!**************************************************************!*\
  !*** ./resources/js/components/data/chapterGentleStart.json ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Foundation by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":2,"title":"Islamic beliefs","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Beliefs by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":3,"title":"Islamic pillars","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Pillars by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":4,"title":"Islamic quran","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Quran by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":5,"title":"Islamic prophet","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Prophet by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":6,"title":"Islamic prayers","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Prayers by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":7,"title":"Islamic manners","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Manners by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":8,"title":"Islamic lifestyle","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Lifestyle by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":9,"title":"Islamic community","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Community by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":10,"title":"Islamic future","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Future by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":11,"title":"Islamic hereafter","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Hereafter by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":12,"title":"Islamic paradise and hell","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Paradise And Hell by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":13,"title":"Islamic dua dhkir","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Dua Dhkir by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":14,"title":"Islamic family and marriage","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Family And Marriage by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]},{"chapterId":15,"title":"Islamic heart","steps":[{"title":"Greet the lesson","description":"Welcome Islamic Heart by reading its summary with calm attention."},{"title":"Set a soft intention","description":"Ask Allah for clarity, humility, and heart ease before diving deeper."},{"title":"Schedule tiny pauses","description":"Plan brief reflection stops between sections to keep learning gentle."}]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterGuidance.json":
/*!***********************************************************!*\
  !*** ./resources/js/components/data/chapterGuidance.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","cards":[{"step":"01","title":"Anchor Tawheed","description":"Revisit the testimony of faith and map how it touches your decisions today.","action":"Note one area where sincerity must replace habit."},{"step":"02","title":"Circle with Reminders","description":"Schedule a Shahada reminder and a short dua that mentions Allah\'s oneness.","action":"Set a gentle alarm or card to repeat the phrase during the day."},{"step":"03","title":"Share the Foundation","description":"Tell someone a short insight from the chapter and listen to their take.","action":"Record one takeaway to revisit before bed."}]},{"chapterId":2,"title":"Islamic beliefs","cards":[{"step":"01","title":"Map the Articles","description":"Write down the six beliefs and share how each influences your trust in Allah.","action":"Tag one article as the focus for tomorrow\'s dua."},{"step":"02","title":"Practice the Unseen","description":"Speak aloud about how angels or decree helped you this week.","action":"Share the reflection with someone who can keep you accountable."},{"step":"03","title":"Teach the Pillar","description":"Explain the beliefs to a friend or family member and field questions.","action":"Jot your notes and keep them handy for future doubts."}]},{"chapterId":3,"title":"Islamic pillars","cards":[{"step":"01","title":"Live the Pillars","description":"Pick one pillar (prayer, zakat, fasting) to honor and monitor it daily.","action":"Check your compliance and ask Allah for consistency."},{"step":"02","title":"Document the Rhythm","description":"Track each pillar in a simple habit log for three days.","action":"Share the log with a mentor for encouragement."},{"step":"03","title":"Renew Intention","description":"Refresh your niyyah before each act of worship and charity.","action":"Repeat a short dua that acknowledges Allah\'s help."}]},{"chapterId":4,"title":"Islamic quran","cards":[{"step":"01","title":"Slow the Recitation","description":"Read an ayah with translation and write a one-sentence reflection.","action":"Circulate the reflection to someone via voice note or message."},{"step":"02","title":"Explore the Tafsir","description":"Watch or read commentary on the chapter\'s verses.","action":"Note one new lesson and plan to act on it."},{"step":"03","title":"Apply the Message","description":"Perform an action inspired by the Quran verse you studied.","action":"Journal how you felt and what you learned."}]},{"chapterId":5,"title":"Islamic prophet","cards":[{"step":"01","title":"Study His Story","description":"Focus on one Prophet event and extract its moral.","action":"Record your takeaway and imagine living it this week."},{"step":"02","title":"Send Blessings","description":"Recite salawat while picturing the Prophet\'s mercy.","action":"Share why he inspires you with a friend."},{"step":"03","title":"Mirror the Manners","description":"Respond to a tense moment with gentleness and humility.","action":"Reflect on the outcome and thank Allah."}]},{"chapterId":6,"title":"Islamic prayers","cards":[{"step":"01","title":"Structure Salah","description":"Prepare each prayer with intention and awareness.","action":"Describe one distracting thought and replace it with a purpose."},{"step":"02","title":"Slow the Quran in Prayer","description":"Understand a verse you recite and speak it softly.","action":"Write a summary to use again tomorrow."},{"step":"03","title":"Link Sunnah","description":"Add a Sunnah prayer or dua to your routine.","action":"Share the change with a partner and support one another."}]},{"chapterId":7,"title":"Islamic manners","cards":[{"step":"01","title":"Practice Adab","description":"Deliver kind words to someone you usually rush past.","action":"Note how it felt."},{"step":"02","title":"Guard the Tongue","description":"Avoid gossip for a day and fill the space with praise.","action":"Pray for patience and dignity."},{"step":"03","title":"Model Mercy","description":"Actively forgive and let go of a minor annoyance.","action":"Document how it softened your heart."}]},{"chapterId":8,"title":"Islamic lifestyle","cards":[{"step":"01","title":"Design Halal Habits","description":"Audit a routine (food, spending, rest) for halal alignment.","action":"Replace one element with an intentional choice."},{"step":"02","title":"Create Calm Time","description":"Schedule a reflective pause with dhikr midweek.","action":"Share the routine to keep yourself accountable."},{"step":"03","title":"Give Back","description":"Help someone with time or resources aligned with Islamic generosity.","action":"Pray for Allah to accept the kindness."}]},{"chapterId":9,"title":"Islamic community","cards":[{"step":"01","title":"Welcome the Ummah","description":"Connect with someone new or isolated online/offline.","action":"Offer a sincere greeting or helpful link."},{"step":"02","title":"Support Others","description":"Join a study circle or share resources with volunteers.","action":"Pray for your brother/sister and note the unity."},{"step":"03","title":"Resolve Conflict","description":"Monitor your speech during a disagreement to stay calm.","action":"Seek reconciliation if tension lingers."}]},{"chapterId":10,"title":"Islamic future","cards":[{"step":"01","title":"Sharpen Goals","description":"Define a spiritual milestone for the next month.","action":"Pair it with a dua and write it down."},{"step":"02","title":"Review Steps","description":"Schedule a weekly reflection on progress and adjustments.","action":"Share insight or challenge with an accountability partner."},{"step":"03","title":"Lift Others","description":"Encourage someone pursuing growth and pray together.","action":"Record their dua request and commit to revisiting it."}]},{"chapterId":11,"title":"Islamic hereafter","cards":[{"step":"01","title":"Grave Reminder","description":"Write a list of priorities shaped by the Hereafter.","action":"Attach a dua for mercy in Barzakh."},{"step":"02","title":"Balance Hope","description":"Read a warning from the chapter and reply with hope-filled dua.","action":"Share the contrast with a friend to rekindle optimism."},{"step":"03","title":"Sadaqah That Stays","description":"Give charity with a long-term intention.","action":"Plan one charity that continues after you pass away."}]},{"chapterId":12,"title":"Islamic paradise and hell","cards":[{"step":"01","title":"Visualize Paradise","description":"Imagine a Quranic description and thank Allah for it.","action":"Write how it felt and recite the verse daily."},{"step":"02","title":"Heed the Warnings","description":"Meditate on Hell\'s cautionary verses and note actions to avoid.","action":"Ask someone to remind you when temptation returns."},{"step":"03","title":"Supplication & Protection","description":"Make duas for Paradise and refuge from Hell every night.","action":"Share the theme with family to keep hope alive."}]},{"chapterId":13,"title":"Islamic dua dhkir","cards":[{"step":"01","title":"Speak to Allah","description":"Write a dua ranking your needs and praises.","action":"Speak it aloud while picturing Allah listening."},{"step":"02","title":"Embed Dhikr","description":"Attach short dhikr phrases to daily movements.","action":"Track which phrases calm you most."},{"step":"03","title":"Lift Others","description":"Pray for someone close and mention them by name.","action":"Ask them later how they felt."}]},{"chapterId":14,"title":"Islamic family and marriage","cards":[{"step":"01","title":"Family Circle","description":"Host a mini session with dua, gratitude, and sharing.","action":"Document one lesson to keep repeating."},{"step":"02","title":"Mercy & Justice","description":"Acts of kindness and clear boundaries keep harmony.","action":"Plan a simple mercy act for a relative."},{"step":"03","title":"Teach by Example","description":"Model manners instead of just instructing.","action":"Share a story that inspired your behaviour."}]},{"chapterId":15,"title":"Islamic heart","cards":[{"step":"01","title":"Purify the Heart","description":"End the day with muhasabah and dua.","action":"List a flaw to correct tomorrow."},{"step":"02","title":"Stay Soft","description":"Practice dhikr or charity to soften reactions.","action":"Write the emotion you replaced and thank Allah."},{"step":"03","title":"Focus on Trust","description":"Lean on Allah\'s decree when anxiety arises.","action":"Signal a reminder (note or dua) to keep returning to reliance."}]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterGuidedPathway.json":
/*!****************************************************************!*\
  !*** ./resources/js/components/data/chapterGuidedPathway.json ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","pathway":[{"step":"01","title":"Absorb the chapter (Islamic foundation)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic foundation)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic foundation)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":2,"title":"Islamic beliefs","pathway":[{"step":"01","title":"Absorb the chapter (Islamic beliefs)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic beliefs)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic beliefs)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":3,"title":"Islamic pillars","pathway":[{"step":"01","title":"Absorb the chapter (Islamic pillars)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic pillars)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic pillars)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":4,"title":"Islamic quran","pathway":[{"step":"01","title":"Absorb the chapter (Islamic quran)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic quran)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic quran)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":5,"title":"Islamic prophet","pathway":[{"step":"01","title":"Absorb the chapter (Islamic prophet)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic prophet)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic prophet)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":6,"title":"Islamic prayers","pathway":[{"step":"01","title":"Absorb the chapter (Islamic prayers)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic prayers)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic prayers)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":7,"title":"Islamic manners","pathway":[{"step":"01","title":"Absorb the chapter (Islamic manners)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic manners)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic manners)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":8,"title":"Islamic lifestyle","pathway":[{"step":"01","title":"Absorb the chapter (Islamic lifestyle)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic lifestyle)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic lifestyle)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":9,"title":"Islamic community","pathway":[{"step":"01","title":"Absorb the chapter (Islamic community)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic community)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic community)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":10,"title":"Islamic future","pathway":[{"step":"01","title":"Absorb the chapter (Islamic future)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic future)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic future)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":11,"title":"Islamic hereafter","pathway":[{"step":"01","title":"Absorb the chapter (Islamic hereafter)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic hereafter)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic hereafter)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":12,"title":"Islamic paradise and hell","pathway":[{"step":"01","title":"Absorb the chapter (Islamic paradise and hell)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic paradise and hell)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic paradise and hell)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":13,"title":"Islamic dua dhkir","pathway":[{"step":"01","title":"Absorb the chapter (Islamic dua dhkir)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic dua dhkir)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic dua dhkir)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":14,"title":"Islamic family and marriage","pathway":[{"step":"01","title":"Absorb the chapter (Islamic family and marriage)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic family and marriage)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic family and marriage)","action":"Translate the insight into a small habit before tomorrow."}]},{"chapterId":15,"title":"Islamic heart","pathway":[{"step":"01","title":"Absorb the chapter (Islamic heart)","action":"Read the overview and note one central idea you can carry into today."},{"step":"02","title":"Reflect deeply (Islamic heart)","action":"Pair the idea with a dua or journaling moment to give it feeling."},{"step":"03","title":"Act gently (Islamic heart)","action":"Translate the insight into a small habit before tomorrow."}]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterLessonOverview.json":
/*!*****************************************************************!*\
  !*** ./resources/js/components/data/chapterLessonOverview.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation: Tawheed, The Eternal Truth That Created You and Will Resurrect You","summary":"Tawheed is the beginning, the middle, and the end of Islam. It is the reason the universe exists, the reason you breathe, the reason the prophets were sent, the reason Jannah was created, and the only sentence that will save you when the sky is split open. Mastering Tawheed is not optional it is the lifeline that connects every moment of your life to its ultimate purpose.","learningObjectives":["Reconnect every decision to the covenant of Tawheed.","Distinguish Rububiyyah, Uloohiyyah, and Asma wa Sifaat through the stories of the prophets.","Set a daily routine of shahada, duas, and self audit that keeps Tawheed alive.","Anchor your emotions in gratitude through the Shahada.","Spot everyday moments of Tehweed rather than relying on rituals alone."],"overview":[{"heading":"Allah Alone is the Creator","content":"Tawhid teaches that Allah alone is the Creator, Sustainer, and ultimate authority. Recognizing His perfection frees the heart from dependence on creation and anchors life firmly upon divine purpose and truth.","references":"Quran 51:56","resources":"https://quran.com/51/56"},{"heading":"Allah Has No Partners","content":"Allah’s knowledge encompasses everything in existence—past, present, and future. Nothing escapes His awareness. This understanding builds trust, humility, and certainty, reminding believers that their lives unfold within perfect divine wisdom.","references":"Quran 4:171","resources":"https://quran.com/4/171"},{"heading":"Allah’s Knowledge Encompasses All","content":"Life is a purposeful test designed by Allah to develop faith, patience, and gratitude. Every moment offers opportunities for growth, reflection, and spiritual elevation, shaping the heart toward obedience and sincerity.","references":"Quran 2:155-156","resources":"https://quran.com/2/155-156"},{"heading":"Life is a Purposeful Test","content":"Worship must be directed only to Allah without partners. Supplications, acts of devotion, and inner reliance are reserved exclusively for Him. This clears the heart from misguidance, superstition, and spiritual confusion entirely.","references":"Hadith: Sahih Muslim 1","resources":"https://sunnah.com/muslim:1"},{"heading":"All Blessings Come from Allah","content":"Every blessing, big or small, originates from Allah’s mercy. Recognizing His favors nurtures gratitude, encourages humility, prevents arrogance, and inspires believers to use their blessings responsibly while remembering the Source granting them.","references":"Quran 16:18","resources":"https://quran.com/16/18"},{"heading":"Trust in Allah Brings Peace","content":"True reliance on Allah brings profound peace. Believers understand that outcomes occur through His perfect decree. Trusting Him calms anxiety, strengthens patience, and empowers the heart to move confidently through life’s challenges.","references":"Quran 3:159","resources":"https://yaqeeninstitute.org"},{"heading":"Allah’s Names Reflect His Perfection","content":"Tawhid liberates people from dependence on worldly powers, false beliefs, and unhealthy attachments. Recognizing Allah as the only One worthy of trust and submission establishes emotional freedom, spiritual clarity, and unwavering personal strength.","references":"Quran 59:22-24","resources":"https://quran.com/59/22-24"},{"heading":"Guidance Comes Only from Allah","content":"Reflecting on Allah’s names deepens understanding of His mercy, power, wisdom, and generosity. These names guide worship and strengthen faith by shaping how believers experience life, seek comfort, and rely upon divine attributes.","references":"Quran 2:2","resources":"https://quran.com/2/2"}]},{"chapterId":2,"title":"The Beliefs: The Six Pillars of Iman, Your Invisible Reality Stronger Than Steel","summary":"While the body lives in the seen world, the heart lives permanently in the unseen (ghayb). The six pillars of Iman are the oxygen of the soul   without them you suffocate spiritually even while walking around healthy. They transform abstract belief into a lived certainty that reshapes every decision.","learningObjectives":["Map the six pillars of Iman onto everyday actions.","Recognize unseen realities (angels, books, prophets, qadar) that shape belief.","Develop nightly reflections that affirm gratitude for the unseen.","List the six pillars whenever doubt creeps in and counter it with evidence.","Practice narrating one unseen reality to a friend this week."],"overview":[{"heading":"Belief in Allah is the core of all belief","content":"Faith in Allah shapes all understanding, intentions, and actions. Recognizing His oneness, power, and mercy directs the heart to obedience, reliance, and purpose, ensuring all aspects of life are aligned.","references":"Quran 2:163","resources":"https://quran.com/2/163"},{"heading":"Angels are honorable beings who serve Allah without error","content":"Belief in angels reminds the believer that every action is observed. They convey divine messages, record deeds, and enforce commands, strengthening awareness of accountability and the unseen aspects of reality.","references":"Quran 35:1","resources":"https://quran.com/35/1"},{"heading":"Divine books were sent to guide humanity through different eras","content":"Revealed scriptures provide moral clarity, knowledge, and spiritual guidance. Studying them fosters wisdom, righteous behavior, and understanding of Allah’s commands, ensuring humanity receives instructions suitable for each time and context.","references":"Quran 3:3","resources":"https://quran.com/3/3"},{"heading":"Prophets were sent as perfect guides and role models","content":"Prophets exemplify obedience, patience, and moral excellence. Following their teachings ensures guidance, strengthens faith, and demonstrates how belief translates into practical action in daily life and decision-making.","references":"Quran 6:90","resources":"https://quran.com/6/90"},{"heading":"Muhammad ﷺ is the final messenger for all mankind","content":"Belief in the Prophet ﷺ ensures understanding of the complete message. Emulating his character, mercy, and guidance transforms faith into practical ethical behavior and connects believers to Allah’s final revelation.","references":"Quran 33:40","resources":"https://quran.com/33/40"},{"heading":"The Last Day is inevitable and must be prepared for","content":"Believing in the Day of Judgment encourages mindfulness, accountability, and righteous deeds. Awareness of resurrection and divine justice motivates moral conduct, patience, and perseverance throughout life’s trials.","references":"Quran 101:1-3","resources":"https://quran.com/101/1-3"},{"heading":"Divine decree (qadr) encompasses good and bad as part of Allah’s wisdom","content":"Understanding qadr fosters trust, patience, and acceptance. Believers recognize that life’s outcomes are part of Allah’s wisdom, ensuring resilience during hardship and gratitude during ease, anchored in divine knowledge.","references":"Quran 57:22","resources":"https://quran.com/57/22"},{"heading":"Belief in the unseen strengthens trust in Allah","content":"Faith in unseen realities such as angels, destiny, and the afterlife deepens reliance on Allah. It strengthens patience, shapes behavior, and anchors the heart in the certainty of divine truth.","references":"Quran 2:3","resources":"https://quran.com/2/3"},{"heading":"Iman increases with good deeds and decreases with sin","content":"Faith is dynamic: righteous acts elevate it, while sins diminish it. Conscious practice, reflection, and repentance ensure growth, balance, and the continuous strengthening of the believer’s connection with Allah.","references":"Hadith: Sahih Muslim 1","resources":"https://sunnah.com/muslim:1"},{"heading":"Certainty (yaqeen) transforms faith into a lived reality","content":"Deep conviction strengthens action, decision-making, and perseverance. Yaqeen protects the heart from doubt, stabilizes spiritual life, and turns belief into practical guidance that shapes everyday behavior and intentions.","references":"Quran 33:3","resources":"https://quran.com/33/3"},{"heading":"Belief is expressed through actions, not only words","content":"True faith manifests in ethical conduct, compassion, worship, and accountability. Words alone are insufficient; actions demonstrate the sincerity of belief, influencing personal integrity and community trust.","references":"Quran 2:177","resources":"https://quran.com/2/177"},{"heading":"Accountability begins with intention","content":"Every action is measured by its purpose. Sincere intentions transform ordinary deeds into worship, fostering mindfulness, spiritual awareness, and alignment of daily behavior with Allah’s commands.","references":"Hadith: Sahih Bukhari 1","resources":"https://sunnah.com/bukhari:1"},{"heading":"Doubt can be overcome by knowledge and reflection","content":"Uncertainty weakens faith, but learning, reflection, and remembrance of Allah fortify conviction. Engaging the mind and heart ensures clarity, spiritual stability, and confident reliance on divine truth.","references":"Quran 47:17","resources":"https://quran.com/47/17"},{"heading":"True belief manifests in humility and gratitude","content":"Faith is reflected in modesty, thankfulness, and acknowledgment of Allah’s favors. Humility nurtures obedience, while gratitude strengthens joy, contentment, and awareness of divine blessings in everyday life.","references":"Quran 31:18-19","resources":"https://quran.com/31/18-19"},{"heading":"Belief must be renewed and strengthened regularly","content":"Faith requires continuous nourishment through worship, reflection, dhikr, and good deeds. Consistent renewal maintains spiritual vitality, deepens conviction, and ensures the heart remains connected to Allah throughout life.","references":"Hadith: Sahih Muslim 2749","resources":"https://sunnah.com/muslim:2749"}]},{"chapterId":3,"title":"The Pillars: The Five Pillars, Your Direct Phone Line to Allah","summary":"These five actions are the bare minimum Allah asks in return for Jannah. They are gifts wrapped as obligations. Miss them and everything else collapses; perfect them and every nafl act becomes mountains of reward. The Prophet ﷺ called them the \'framework of Islam\' build your life upon them.","learningObjectives":["Master the five pillars as practical rituals, not chores.","Create a checklist for Salah, Zakat, Sawm, Hajj, and Shahada commitments.","Pair each pillar with one challenge and one celebration plan.","Simulate the pillars by planning a short role play for each.","Notice how each pillar influences your schedule after Ramadan."],"overview":[{"heading":"Shahada: Testimony of Faith","content":"Declaring that Allah is One and Muhammad ﷺ is His messenger establishes the foundation of belief. This testimony guides intentions, actions, and devotion, connecting the heart firmly to divine truth.","references":"Quran 47:19","resources":"https://quran.com/47/19"},{"heading":"Salah: Establishing Prayer","content":"Regular prayer strengthens mindfulness, discipline, and connection with Allah. Performing salah attentively cultivates gratitude, patience, and spiritual growth while anchoring daily life in worship and obedience.","references":"Quran 29:45","resources":"https://quran.com/29/45"},{"heading":"Zakat: Obligatory Charity","content":"Giving zakat purifies wealth, helps the needy, and nurtures compassion. It transforms possessions into blessings, reinforces social responsibility, and strengthens the believer’s relationship with Allah through sincere giving.","references":"Quran 9:103","resources":"https://quran.com/9/103"},{"heading":"Sawm: Fasting for Spiritual Growth","content":"Fasting during Ramadan cultivates self-discipline, empathy, and gratitude. It strengthens spiritual awareness, encourages reflection, and enhances connection with Allah through restraint and devotion.","references":"Quran 2:183","resources":"https://quran.com/2/183"},{"heading":"Hajj: Pilgrimage to Allah","content":"The pilgrimage teaches unity, patience, humility, and submission. Participating in Hajj, even spiritually, reinforces devotion, strengthens community bonds, and exemplifies the commitment of the believer to Allah.","references":"Quran 22:27","resources":"https://quran.com/22/27"},{"heading":"Intentionality in Worship","content":"Every pillar should be performed with clear intention. Purifying intentions ensures deeds are accepted, transforms routine acts into worship, and reinforces sincerity in obedience to Allah.","references":"Hadith: Sahih Bukhari 1","resources":"https://sunnah.com/bukhari:1"},{"heading":"Purification Before Prayer","content":"Performing wudu attentively cleanses both body and spirit. Purification prepares the believer for worship, enhances focus, and reminds the heart of the importance of cleanliness and spiritual readiness.","references":"Quran 5:6","resources":"https://quran.com/5/6"},{"heading":"Focus and Khushu in Prayer","content":"Concentration in salah deepens connection with Allah. Removing distractions allows reflection, strengthens devotion, and turns ritual movements into meaningful spiritual engagement.","references":"Quran 23:1-2","resources":"https://quran.com/23/1-2"},{"heading":"Secret Charity","content":"Giving privately purifies intentions, strengthens sincerity, and enhances humility. Hidden acts of generosity demonstrate true compassion and cultivate spiritual reward from Allah alone.","references":"Quran 2:271","resources":"https://quran.com/2/271"},{"heading":"Empathy Through Fasting","content":"Experiencing hunger fosters empathy for the less fortunate. Mindful reflection during fasting nurtures compassion, gratitude, and increased spiritual awareness in everyday life.","references":"Quran 2:185","resources":"https://quran.com/2/185"},{"heading":"Spiritual Transformation Through Pillars","content":"Practicing the pillars consistently shapes character, strengthens faith, and develops discipline. They transform the believer’s heart, aligning intentions, actions, and priorities with Allah’s guidance.","references":"Quran 29:69","resources":"https://quran.com/29/69"},{"heading":"Community and Brotherhood","content":"Pillars unite the ummah through shared devotion, collective worship, and mutual support. Participation fosters social responsibility, empathy, and strengthens the bonds between believers.","references":"Quran 49:10","resources":"https://quran.com/49/10"},{"heading":"Purposeful Worship","content":"Before performing a pillar, remind yourself of its purpose. Awareness transforms obligatory acts into conscious devotion, enhancing spiritual focus and intentionality.","references":"Quran 51:56","resources":"https://quran.com/51/56"},{"heading":"Accountability in Pillars","content":"Regularly review performance of obligatory acts. Correct errors and renew intentions. Accountability strengthens discipline, enhances sincerity, and nurtures a stronger relationship with Allah.","references":"Quran 59:19","resources":"https://quran.com/59/19"},{"heading":"Joy and Contentment in Worship","content":"Experiencing joy in performing pillars increases motivation and devotion. Recognizing blessings and fulfillment in worship encourages consistency and deepens the spiritual connection to Allah.","references":"Quran 13:28","resources":"https://quran.com/13/28"}]},{"chapterId":4,"title":"The Quran: Heartbeat of Revelation and Living Library","summary":"Each letter of the Qur\'an is alive; it lights, heals, and anchors you in divine goodness.","learningObjectives":["Make the Qur’an a daily companion with tajweed, tafsir, and reflection.","Identify three verses that speak to your current season and act on their lessons.","Build a routine for journaling insights from each surah you read.","Pair a verse with dua to turn word into worship.","Teach a family member one tajweed rule this week."],"overview":[{"heading":"The Quran is Allah’s Final Revelation","content":"The Quran provides guidance for all aspects of life. Believers are encouraged to read, reflect, and act upon its teachings to align their hearts and actions with divine wisdom.","references":"Quran 5:48","resources":"https://quran.com/5/48"},{"heading":"The Quran Guides Humanity","content":"Through clear instructions, moral teachings, and stories of past nations, the Quran teaches lessons that foster faith, patience, justice, and ethical conduct for spiritual and worldly success.","references":"Quran 2:2","resources":"https://quran.com/2/2"},{"heading":"The Quran Clarifies Belief","content":"It explains the core principles of Tawhid, prophecy, and the Hereafter, strengthening faith and helping believers understand the purpose of life and the path to pleasing Allah.","references":"Quran 6:19","resources":"https://quran.com/6/19"},{"heading":"The Quran is a Source of Mercy","content":"Reading and reflecting on the Quran brings peace, guidance, and comfort. It reminds believers of Allah’s mercy, encouraging hope, gratitude, and reliance upon Him in all circumstances.","references":"Quran 17:82","resources":"https://quran.com/17/82"},{"heading":"The Quran Requires Reflection","content":"Understanding its meanings strengthens belief. Believers are urged to ponder verses, seek knowledge, and apply lessons practically, transforming reading into action and guidance into daily living.","references":"Quran 47:24","resources":"https://quran.com/47/24"},{"heading":"Recitation Elevates the Heart","content":"Reciting the Quran aloud with focus and reverence nourishes the soul, instills tranquility, and enhances spiritual connection with Allah, making worship more heartfelt and intentional.","references":"Quran 73:4","resources":"https://quran.com/73/4"},{"heading":"The Quran Guides Morality","content":"It teaches ethics, justice, and compassion. Applying these principles in personal conduct fosters integrity, humility, and a harmonious life aligned with divine expectations.","references":"Quran 16:90","resources":"https://quran.com/16/90"},{"heading":"The Quran Encourages Knowledge","content":"Believers are instructed to seek understanding, reflect, and learn. Knowledge nurtures wisdom, strengthens conviction, and enables proper application of divine guidance in all aspects of life.","references":"Quran 20:114","resources":"https://quran.com/20/114"},{"heading":"The Quran Protects from Misguidance","content":"Following its teachings shields believers from false beliefs, moral corruption, and spiritual deviation. Its guidance creates a firm foundation for ethical living and trust in Allah’s commands.","references":"Quran 6:155","resources":"https://quran.com/6/155"},{"heading":"The Quran Promotes Justice","content":"It emphasizes fairness, honesty, and equality. Implementing these principles in daily life nurtures ethical behavior, protects rights, and establishes social harmony in accordance with divine instruction.","references":"Quran 4:58","resources":"https://quran.com/4/58"},{"heading":"The Quran Encourages Patience","content":"Its stories and guidance teach resilience in adversity. Reflecting on divine wisdom strengthens perseverance, hope, and trust in Allah’s plan, fostering spiritual growth and emotional balance.","references":"Quran 2:153","resources":"https://quran.com/2/153"},{"heading":"The Quran Strengthens Faith","content":"Regular study and reflection deepen Iman. Understanding its wisdom and applying lessons encourages moral behavior, ethical decisions, and a heart aligned with Allah’s guidance.","references":"Quran 33:34","resources":"https://quran.com/33/34"},{"heading":"The Quran Encourages Worship","content":"It calls believers to prayer, remembrance, and righteous deeds. Following its commands transforms spiritual devotion into everyday actions, connecting the heart and life to Allah’s pleasure.","references":"Quran 29:45","resources":"https://quran.com/29/45"},{"heading":"The Quran is a Source of Healing","content":"Its words bring comfort, guidance, and reassurance. Reflecting and acting upon them nurtures mental, emotional, and spiritual well-being while strengthening reliance on Allah’s wisdom.","references":"Quran 17:82","resources":"https://quran.com/17/82"},{"heading":"The Quran Must Be Applied","content":"Understanding alone is insufficient; believers must implement its guidance in daily life. Action transforms knowledge into practice, faith into ethics, and devotion into tangible obedience.","references":"Quran 59:18","resources":"https://quran.com/59/18"}]},{"chapterId":5,"title":"The Prophet: Muhammad ﷺ Mirror of Mercy","summary":"Studying the Prophet\'s life unlocks Islam\'s character code, showing clarity, humility, and compassionate leadership.","learningObjectives":["Study the Prophet’s character and identify manners to adopt.","Trace his leadership habits across worship, family, and community.","Practice one Prophetic routine (e.g., tahajjud or fasting) for a week.","Identify one Prophetic character trait you wish to model this month.","Create a mini journal entry describing how mercy reshaped your language."],"overview":[{"heading":"Prophets Are Guides for Humanity","content":"Prophets exemplify obedience, patience, and morality. Following their guidance helps believers navigate life, strengthens faith, and provides clear examples of applying divine teachings in daily choices and actions.","references":"Quran 6:90","resources":"https://quran.com/6/90"},{"heading":"Muhammad ﷺ is the Final Messenger","content":"Belief in Muhammad ﷺ unites Muslims and completes divine revelation. Emulating his character, mercy, and teachings ensures the proper application of faith and strengthens connection with Allah.","references":"Quran 33:40","resources":"https://quran.com/33/40"},{"heading":"Following the Prophet Strengthens Faith","content":"Emulating his behavior, speech, and ethics nurtures personal integrity, deepens understanding of divine guidance, and ensures that belief is reflected in both intention and action.","references":"Quran 33:21","resources":"https://quran.com/33/21"},{"heading":"Prophetic Teachings Are Universal","content":"The Prophet ﷺ taught principles applicable across all times and cultures. Studying his Sunnah equips believers to navigate contemporary challenges while maintaining obedience and moral excellence.","references":"Quran 7:157","resources":"https://quran.com/7/157"},{"heading":"Prophets Bring Clarity to Belief","content":"They provide clear guidance regarding Tawhid, worship, ethics, and accountability. Following them removes confusion, strengthens conviction, and guides practical application of faith in everyday life.","references":"Quran 21:7","resources":"https://quran.com/21/7"},{"heading":"The Prophet’s Mercy","content":"His mercy toward believers and non-believers exemplifies divine compassion. Reflecting on his character nurtures kindness, patience, and ethical behavior in personal and communal life.","references":"Quran 9:128","resources":"https://quran.com/9/128"},{"heading":"Prophets Encourage Justice","content":"They model fairness and integrity, teaching believers to uphold justice in decisions and interactions. Applying these lessons builds ethical communities aligned with Allah’s commands.","references":"Quran 4:105","resources":"https://quran.com/4/105"},{"heading":"Prophets Teach Patience","content":"Their lives demonstrate perseverance during trials. Following their example strengthens resilience, patience, and trust in Allah while encouraging steadfastness in faith.","references":"Quran 16:127","resources":"https://quran.com/16/127"},{"heading":"Prophetic Wisdom Guides Decisions","content":"Studying their guidance helps believers make ethical and informed choices. Wisdom from their lives aligns actions with divine guidance in practical daily situations.","references":"Quran 21:73","resources":"https://quran.com/21/73"},{"heading":"Prophetic Example Inspires Character","content":"His conduct inspires humility, honesty, and compassion. Internalizing these traits transforms personal behavior, strengthens community relations, and elevates spiritual growth.","references":"Hadith: Sahih Muslim 2326","resources":"https://sunnah.com/muslim:2326"},{"heading":"Prophets Teach Worship","content":"They guide proper prayer, supplication, and devotion. Practicing worship according to their teachings ensures sincerity, spiritual connection, and the acceptance of deeds by Allah.","references":"Quran 6:162","resources":"https://quran.com/6/162"},{"heading":"Prophetic Patience in Adversity","content":"Enduring trials with patience models trust in Allah. Applying this approach fosters resilience, emotional stability, and reliance on divine wisdom during difficulties.","references":"Quran 3:186","resources":"https://quran.com/3/186"},{"heading":"Prophetic Justice in Society","content":"His guidance emphasizes fair treatment, protection of rights, and ethical leadership. Following these principles strengthens social cohesion and moral responsibility in communities.","references":"Quran 4:58","resources":"https://quran.com/4/58"},{"heading":"Prophets Teach Gratitude","content":"Acknowledging Allah’s favors mirrors the Prophet’s practice of gratitude. Regular reflection fosters contentment, spiritual growth, and ethical appreciation of divine blessings.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Prophetic Sunnah Guides Conduct","content":"Applying Sunnah in behavior, speech, and worship ensures that belief manifests in action. It bridges knowledge and practice, reinforcing faith and moral excellence.","references":"Hadith: Sahih Bukhari 7","resources":"https://sunnah.com/bukhari:7"}]},{"chapterId":6,"title":"The Prayer: Salah as Your Soul\'s Sync","summary":"Prayer is the reset that brings your body, heart, and discipline back into harmony with Allah.","learningObjectives":["Deepen khushu by aligning breath, posture, and remembrance in each salah.","Learn key intentions before standing and dua after sujood.","Use salah as a daily reset to calm anxiety and plan service.","Set a weekly accountability check in for your five prayers.","Note how khushu’ shifts when you prep mentally before standing."],"overview":[{"heading":"Prayer Connects to Allah","content":"Salah is the link between the believer and Allah, nurturing spiritual awareness, mindfulness, and consistent reflection on divine guidance throughout life.","references":"Quran 29:45","resources":"https://quran.com/29/45"},{"heading":"Five Daily Prayers","content":"Observing the five daily prayers structures time, reinforces discipline, and creates regular opportunities for remembrance, reflection, and connection with Allah.","references":"Quran 11:114","resources":"https://quran.com/11/114"},{"heading":"Prayer Requires Purity","content":"Wudu and cleanliness before prayer prepare the body and heart. Physical purification mirrors spiritual readiness, enhancing focus, sincerity, and connection during worship.","references":"Quran 5:6","resources":"https://quran.com/5/6"},{"heading":"Concentration Strengthens Prayer","content":"Focus (khushu) deepens spiritual connection, increases devotion, and ensures that salah becomes a mindful act rather than a routine ritual.","references":"Quran 23:1-2","resources":"https://quran.com/23/1-2"},{"heading":"Supplication Complements Prayer","content":"Dua within or after salah expresses dependence, gratitude, and humility. It reinforces connection with Allah and the sincerity of worship.","references":"Hadith: Sahih Muslim 2724","resources":"https://sunnah.com/muslim:2724"},{"heading":"Prayer Brings Tranquility","content":"Regular salah calms the heart, reduces stress, and strengthens faith. It instills patience and gratitude, providing spiritual balance throughout daily life.","references":"Quran 20:14","resources":"https://quran.com/20/14"},{"heading":"Consistency is Key","content":"Performing prayers consistently fosters discipline, strengthens routine worship, and reinforces connection with Allah regardless of circumstances or personal challenges.","references":"Quran 2:238","resources":"https://quran.com/2/238"},{"heading":"Prayer Elevates Character","content":"Salah instills patience, humility, and self-discipline. Its regular practice shapes moral behavior, ethical conduct, and spiritual growth in everyday life.","references":"Quran 29:45","resources":"https://quran.com/29/45"},{"heading":"Prayer as Reminder","content":"Each salah reminds believers of accountability, purpose, and divine mercy. Reflection during prayer strengthens awareness and directs choices toward ethical and spiritual growth.","references":"Quran 2:238","resources":"https://quran.com/2/238"},{"heading":"Facing Challenges with Prayer","content":"Regular prayer nurtures resilience and reliance on Allah. During trials, believers find strength, patience, and clarity through mindful worship.","references":"Quran 2:45","resources":"https://quran.com/2/45"},{"heading":"Prayer Inspires Gratitude","content":"Reflection during salah reinforces appreciation for Allah’s blessings. Gratitude expressed through prayer nurtures contentment, humility, and ethical behavior.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Prayer Strengthens Community","content":"Congregational prayers build unity, social bonds, and collective accountability. Observing salah in community nurtures compassion, empathy, and shared devotion.","references":"Quran 9:71","resources":"https://quran.com/9/71"},{"heading":"Salah Enhances Reflection","content":"Moments of worship offer time to contemplate life, purpose, and Allah’s guidance. Reflection strengthens faith, moral awareness, and intentional living.","references":"Quran 23:1-2","resources":"https://quran.com/23/1-2"},{"heading":"Intentions Matter","content":"Prayers are accepted when performed with sincerity. Mindful intentions ensure actions are meaningful, spiritually rewarding, and aligned with divine guidance.","references":"Hadith: Sahih Bukhari 1","resources":"https://sunnah.com/bukhari:1"},{"heading":"Prayer Nourishes the Heart","content":"Salah refreshes the soul, strengthens spiritual resilience, and nurtures emotional balance. Regular engagement fosters closeness to Allah and inner peace.","references":"Quran 30:17-18","resources":"https://quran.com/30/17-18"}]},{"chapterId":7,"title":"The Manners: Adab That Elevates Every Encounter","summary":"Adab is the fragrance of iman; it makes every interaction sacred and every apology sincere.","learningObjectives":["Define practical adab when speaking, eating, and sharing space.","Craft a family etiquette reminder (greeting, listening, gratitude).","Compare digital interactions to the Prophet’s mercy and adjust accordingly.","Celebrate small acts of adab with family thank you notes.","Practice digital kindness by correcting or uplifting one comment daily."],"overview":[{"heading":"Good Character is Central to Faith","content":"Islam emphasizes ethical behavior, kindness, and integrity. Good manners reflect belief, influence community harmony, and strengthen relationships while demonstrating obedience to Allah’s guidance.","references":"Quran 68:4","resources":"https://quran.com/68/4"},{"heading":"Honesty and Truthfulness","content":"Speaking truthfully nurtures trust, strengthens community bonds, and aligns behavior with divine guidance. Honesty is a reflection of sincere faith and moral responsibility.","references":"Quran 33:70","resources":"https://quran.com/33/70"},{"heading":"Respect for Parents","content":"Kindness and obedience to parents earn Allah’s pleasure. Treating parents with care, gratitude, and humility strengthens family bonds and exemplifies ethical conduct.","references":"Quran 17:23","resources":"https://quran.com/17/23"},{"heading":"Politeness in Speech","content":"Gentle and respectful speech fosters understanding, prevents conflict, and reflects the believer’s ethical and spiritual maturity.","references":"Quran 31:18-19","resources":"https://quran.com/31/18-19"},{"heading":"Avoiding Backbiting and Gossip","content":"Speaking ill of others damages trust and soul. Avoiding gossip preserves honor, nurtures community harmony, and aligns behavior with Allah’s commands.","references":"Quran 49:12","resources":"https://quran.com/49/12"},{"heading":"Patience and Tolerance","content":"Exercising patience and tolerance in interactions fosters peace, reduces conflict, and strengthens spiritual resilience.","references":"Quran 16:126","resources":"https://quran.com/16/126"},{"heading":"Generosity and Kindness","content":"Acts of giving and compassion reflect faith, improve community welfare, and strengthen the heart’s connection to Allah.","references":"Quran 2:177","resources":"https://quran.com/2/177"},{"heading":"Humility in Conduct","content":"Humility prevents arrogance and encourages sincere service. A humble heart aligns behavior with Allah’s guidance and promotes social harmony.","references":"Quran 25:63","resources":"https://quran.com/25/63"},{"heading":"Forgiveness and Reconciliation","content":"Forgiving others nurtures inner peace and strengthens bonds. Reconciliation restores trust, fulfills moral duty, and earns Allah’s pleasure.","references":"Quran 42:40","resources":"https://quran.com/42/40"},{"heading":"Respecting Elders and Teachers","content":"Honoring those with knowledge and experience fosters learning, ethical behavior, and communal respect while embodying Islamic moral principles.","references":"Quran 4:36","resources":"https://quran.com/4/36"},{"heading":"Moderation in Behavior","content":"Avoiding extremes ensures ethical balance and harmony. Moderation in speech, actions, and desires strengthens character and spiritual integrity.","references":"Quran 25:67","resources":"https://quran.com/25/67"},{"heading":"Truthful Speech Reflects Faith","content":"Every word should reflect honesty and integrity. Speaking truth builds trust and aligns actions with Islamic values.","references":"Quran 61:2-3","resources":"https://quran.com/61/2-3"},{"heading":"Kindness Toward Neighbors","content":"Good conduct toward neighbors strengthens social cohesion, nurtures compassion, and fulfills religious and ethical duties.","references":"Quran 4:36","resources":"https://quran.com/4/36"},{"heading":"Avoiding Anger and Retaliation","content":"Controlling anger ensures justice, reduces harm, and nurtures patience. Responding ethically strengthens moral character and earns Allah’s pleasure.","references":"Quran 3:134","resources":"https://quran.com/3/134"},{"heading":"Manners Must Be Practiced Consistently","content":"Ethical behavior requires continuous practice in all aspects of life. Consistency reinforces character, faith, and positive influence in society.","references":"Hadith: Sahih Muslim 55","resources":"https://sunnah.com/muslim:55"}]},{"chapterId":8,"title":"The Lifestyle: Halal Living, Habits, and Harmony","summary":"Islam is a lifestyle; this chapter helps you align food, finances, and rest with halal intention.","learningObjectives":["Design a halal lifestyle blueprint covering food, finance, and rest.","Introduce two intentional boundaries that protect worship time.","Swap one unhealthy habit for a sunnah inspired alternative each week.","Design a halal budget with a charity and rest category.","Share one restful habit with a friend to keep each other accountable."],"overview":[{"heading":"A Balanced Life Pleases Allah","content":"Living with moderation in worship, work, and leisure ensures spiritual, mental, and physical well-being, aligning daily habits with divine guidance.","references":"Quran 2:143","resources":"https://quran.com/2/143"},{"heading":"Healthy Habits Are Encouraged","content":"Maintaining hygiene, proper diet, and exercise honors the body Allah entrusted, strengthens resilience, and enables consistent worship.","references":"Hadith: Sahih Bukhari 535","resources":"https://sunnah.com/bukhari:535"},{"heading":"Time Management Is Important","content":"Efficient use of time ensures balance between worship, work, and rest. Proper scheduling nurtures discipline, productivity, and spiritual growth.","references":"Quran 103:1-3","resources":"https://quran.com/103/1-3"},{"heading":"Moderation in Spending","content":"Avoid extravagance and wastefulness. Balanced financial management nurtures gratitude, charity, and sustainable living according to divine guidance.","references":"Quran 17:26-27","resources":"https://quran.com/17/26-27"},{"heading":"Work Ethic Reflects Faith","content":"Honest effort and responsibility in work are forms of worship. Ethical labor benefits self, family, and society while earning Allah’s pleasure.","references":"Hadith: Sahih Bukhari 2075","resources":"https://sunnah.com/bukhari:2075"},{"heading":"Leisure with Purpose","content":"Balanced recreation refreshes the mind and body. Engaging in permissible activities enhances focus, creativity, and spiritual well-being.","references":"Quran 23:1-2","resources":"https://quran.com/23/1-2"},{"heading":"Seeking Knowledge Is a Lifestyle","content":"Continuous learning fosters personal growth, wisdom, and ethical application. Knowledge strengthens faith and enhances community contribution.","references":"Hadith: Sahih Muslim 2699","resources":"https://sunnah.com/muslim:2699"},{"heading":"Family Life Requires Balance","content":"Providing, caring, and nurturing family relationships while maintaining personal worship ensures harmony and fulfills responsibilities according to Islamic principles.","references":"Quran 2:233","resources":"https://quran.com/2/233"},{"heading":"Avoiding Excess in Lifestyle","content":"Overindulgence in food, wealth, or entertainment distracts from worship. Moderation fosters mindfulness, gratitude, and ethical living.","references":"Quran 7:31","resources":"https://quran.com/7/31"},{"heading":"Mindful Consumption","content":"Eating and drinking in moderation sustains health, strengthens spiritual focus, and reflects gratitude to Allah.","references":"Quran 2:172","resources":"https://quran.com/2/172"},{"heading":"Ethical Entertainment","content":"Choose activities that nurture virtue, knowledge, and social cohesion. Ethical recreation enhances personal and community well-being.","references":"Quran 31:19","resources":"https://quran.com/31/19"},{"heading":"Daily Worship Integrates Lifestyle","content":"Incorporating prayer, dhikr, and reflection into daily routines transforms ordinary life into ongoing worship, deepening spiritual connection.","references":"Quran 2:238","resources":"https://quran.com/2/238"},{"heading":"Environment and Stewardship","content":"Caring for the earth and resources reflects obedience to Allah. Responsible stewardship ensures sustainability and benefits the community.","references":"Quran 6:141","resources":"https://quran.com/6/141"},{"heading":"Lifestyle Shapes Character","content":"Daily routines influence spiritual and moral development. Aligning lifestyle with divine guidance ensures ethical behavior and holistic well-being.","references":"Quran 2:286","resources":"https://quran.com/2/286"},{"heading":"Consistency Builds Habits","content":"Regular practice of balanced habits fosters discipline, spiritual growth, and ethical living. Consistency strengthens connection to Allah and personal character.","references":"Hadith: Sahih Bukhari 6512","resources":"https://sunnah.com/bukhari:6512"}]},{"chapterId":9,"title":"The Community: Building Ummah, Support, and Uplift","summary":"Islam thrives in community; this chapter explores solidarity, hospitality, and shared purpose.","learningObjectives":["Build community by hosting, serving, and mentoring with sincerity.","Create a checklist for respectful conflict resolution and mutual aid.","Document one story of service each week to inspire others.","Plan a community service action plan with clear dua goals.","Document how supporting another renewed your own heart."],"overview":[{"heading":"Community Strengthens Faith","content":"Engaging in a righteous community fosters support, accountability, and shared worship. Collective action strengthens faith and promotes ethical behavior among members.","references":"Quran 3:104","resources":"https://quran.com/3/104"},{"heading":"Supporting One Another","content":"Mutual assistance in times of need nurtures compassion, unity, and social responsibility while reflecting divine guidance in action.","references":"Quran 5:2","resources":"https://quran.com/5/2"},{"heading":"Justice in Society","content":"Fair treatment of all community members ensures harmony, prevents conflict, and aligns society with Allah’s principles.","references":"Quran 4:58","resources":"https://quran.com/4/58"},{"heading":"Inclusivity and Brotherhood","content":"Welcoming diversity and fostering equality strengthens social bonds. Unity and brotherhood reflect ethical conduct and divine guidance.","references":"Quran 49:13","resources":"https://quran.com/49/13"},{"heading":"Resolving Conflicts Peacefully","content":"Encouraging dialogue and reconciliation maintains harmony, prevents injustice, and strengthens communal trust in accordance with Islamic principles.","references":"Quran 49:9","resources":"https://quran.com/49/9"},{"heading":"Collective Worship","content":"Praying, fasting, and performing acts of charity together nurtures unity, strengthens faith, and fosters shared responsibility.","references":"Quran 9:71","resources":"https://quran.com/9/71"},{"heading":"Charity Strengthens Community","content":"Giving zakat and sadaqah supports the needy, reduces inequality, and enhances social cohesion, reflecting ethical and spiritual responsibility.","references":"Quran 2:177","resources":"https://quran.com/2/177"},{"heading":"Mentorship and Education","content":"Sharing knowledge and guidance empowers individuals, fosters ethical development, and strengthens community resilience and faith.","references":"Hadith: Sahih Muslim 2699","resources":"https://sunnah.com/muslim:2699"},{"heading":"Respecting Leaders","content":"Honoring just leadership nurtures stability, accountability, and obedience to ethical principles while ensuring communal well-being.","references":"Quran 4:59","resources":"https://quran.com/4/59"},{"heading":"Caring for the Vulnerable","content":"Protecting orphans, the poor, and the marginalized reflects divine mercy and strengthens community bonds.","references":"Quran 2:220","resources":"https://quran.com/2/220"},{"heading":"Promoting Peace and Security","content":"Encouraging lawfulness, justice, and peaceful interactions ensures community safety, stability, and moral integrity.","references":"Quran 5:32","resources":"https://quran.com/5/32"},{"heading":"Collaboration and Cooperation","content":"Working together in permissible endeavors nurtures mutual support, ethical behavior, and collective growth, reflecting shared responsibility to Allah.","references":"Quran 5:2","resources":"https://quran.com/5/2"},{"heading":"Accountability Within the Community","content":"Members should encourage righteous behavior and discourage wrongdoing. Mutual accountability strengthens morality, unity, and shared faith.","references":"Quran 3:104","resources":"https://quran.com/3/104"},{"heading":"Community Celebrations","content":"Shared worship, festivals, and gatherings enhance spiritual bonds, reinforce ethical teachings, and foster joy, gratitude, and unity.","references":"Hadith: Sahih Bukhari 967","resources":"https://sunnah.com/bukhari:967"},{"heading":"Continuous Support","content":"Consistently helping and uplifting members builds resilience, strengthens faith, and ensures that community remains a source of guidance, compassion, and ethical growth.","references":"Quran 2:177","resources":"https://quran.com/2/177"}]},{"chapterId":10,"title":"The Future: Continuous Growth and Legacy","summary":"This chapter helps you set spiritual goals, document progress, and leave enduring impact.","learningObjectives":["Set spiritual goals for 30/90/365 days and review them weekly.","Plan a legacy project that benefits others beyond your lifetime.","Commit to mentoring or teaching to multiply your impact.","Sketch a 20 year impact vision and add one action for this year.","Pair each goal with a dua to keep hope alive."],"overview":[{"heading":"The Future is Known to Allah","content":"Believers understand that only Allah knows what lies ahead. Trusting His wisdom nurtures patience, reduces anxiety, and encourages reliance on divine guidance.","references":"Quran 31:34","resources":"https://quran.com/31/34"},{"heading":"Planning with Reliance","content":"While planning for the future is important, ultimate outcomes rest with Allah. Combining effort with reliance ensures balance, humility, and spiritual mindfulness.","references":"Quran 18:23-24","resources":"https://quran.com/18/23-24"},{"heading":"Avoiding Worry About the Unknown","content":"Trust in Allah alleviates fear and anxiety. Faith in divine decree strengthens resilience and peace while facing uncertainty.","references":"Quran 65:2-3","resources":"https://quran.com/65/2-3"},{"heading":"Preparation Through Good Deeds","content":"Actions in this life shape the future. Ethical behavior, worship, and righteous deeds ensure spiritual and worldly benefits.","references":"Quran 2:110","resources":"https://quran.com/2/110"},{"heading":"Faith Guides Decisions","content":"Belief in Allah’s plan influences choices, ensuring ethical, informed, and purposeful action while trusting in divine wisdom.","references":"Quran 3:159","resources":"https://quran.com/3/159"},{"heading":"Hope Anchors the Heart","content":"Believers remain hopeful in Allah’s mercy and plan. This optimism nurtures perseverance, patience, and resilience in life’s trials.","references":"Quran 39:53","resources":"https://quran.com/39/53"},{"heading":"Actions Determine Outcomes","content":"While the future is known to Allah, human effort shapes results. Sincere action, intention, and planning are rewarded by divine decree.","references":"Quran 3:145","resources":"https://quran.com/3/145"},{"heading":"Rely on Allah, Not Fear","content":"Fear of the future diminishes faith. Reliance on Allah instills courage, patience, and calmness in all circumstances.","references":"Quran 3:173","resources":"https://quran.com/3/173"},{"heading":"Accountability in the Future","content":"Every action will be judged. Awareness of divine accountability motivates ethical conduct and spiritual mindfulness.","references":"Quran 99:7-8","resources":"https://quran.com/99/7-8"},{"heading":"Future Depends on Intention","content":"Sincere intentions influence the impact of actions. Aligning purpose with Allah’s pleasure ensures that efforts are rewarded.","references":"Hadith: Sahih Bukhari 1","resources":"https://sunnah.com/bukhari:1"},{"heading":"Trust in Divine Wisdom","content":"Believers accept outcomes with understanding that Allah’s knowledge surpasses human perception, fostering contentment and resilience.","references":"Quran 2:216","resources":"https://quran.com/2/216"},{"heading":"Patience Shapes the Future","content":"Enduring trials with patience and faith ensures spiritual growth and prepares believers for divine reward in both this life and the Hereafter.","references":"Quran 103:2-3","resources":"https://quran.com/103/2-3"},{"heading":"Optimism Strengthens Action","content":"Positive expectation in Allah’s plan encourages proactive effort, ethical decision-making, and resilience in adversity.","references":"Quran 3:139","resources":"https://quran.com/3/139"},{"heading":"Prayers Influence the Future","content":"Supplication and consistent dhikr invite divine guidance, protection, and blessings, shaping both spiritual and worldly outcomes.","references":"Quran 2:186","resources":"https://quran.com/2/186"},{"heading":"Faith Reduces Anxiety","content":"Belief in Allah’s control over the future fosters calmness, reliance, and contentment, even when facing uncertainty.","references":"Quran 65:3","resources":"https://quran.com/65/3"}]},{"chapterId":11,"title":"Hereafter Realities, Death, Resurrection, and Mercy","summary":"The Hereafter pulls the heart toward lasting priorities; remembering death, the grave, and accountability strengthens every moment of obedience.","learningObjectives":["Describe the stages of the soul between death and resurrection.","Balance fear and hope in Allah\'s justice and mercy.","Implement a nightly muhasabah routine.","Identify three forms of ongoing charity (sadaqah jariyah).","Share the message of accountability with one trusted friend."],"overview":[{"heading":"The Hereafter is Certain","content":"Belief in life after death shapes moral conduct, encourages ethical behavior, and reminds believers that every action has eternal significance.","references":"Quran 3:185","resources":"https://quran.com/3/185"},{"heading":"Preparation Begins Now","content":"Righteous deeds, sincere worship, and ethical behavior prepare for the Hereafter, ensuring spiritual success and divine reward.","references":"Quran 6:132","resources":"https://quran.com/6/132"},{"heading":"Accountability is Inevitable","content":"Every action, word, and intention will be judged. Awareness of accountability motivates ethical living and mindfulness.","references":"Quran 99:7-8","resources":"https://quran.com/99/7-8"},{"heading":"The Hereafter Motivates Patience","content":"Belief in eternal reward encourages perseverance through hardships, strengthening trust in Allah’s wisdom and cultivating spiritual growth.","references":"Quran 31:34","resources":"https://quran.com/31/34"},{"heading":"Justice Will Be Perfect","content":"Allah’s judgment is fair and precise. Belief in divine justice instills hope, discourages wrongdoing, and encourages ethical behavior.","references":"Quran 4:40","resources":"https://quran.com/4/40"},{"heading":"Reward for Good Deeds","content":"Every act of worship, charity, and righteousness is recorded. Believers are assured of recompense in the eternal life.","references":"Quran 2:277","resources":"https://quran.com/2/277"},{"heading":"Consequences of Sin","content":"Wrongdoing carries accountability in the Hereafter. Awareness of consequences encourages repentance, ethical behavior, and spiritual mindfulness.","references":"Quran 99:7-8","resources":"https://quran.com/99/7-8"},{"heading":"Repentance Prepares the Soul","content":"Sincere repentance purifies the heart and protects from punishment. Regular self-reflection aligns actions with Allah’s guidance.","references":"Quran 39:53","resources":"https://quran.com/39/53"},{"heading":"The Hereafter Brings Justice","content":"Divine judgment restores balance, corrects injustice, and ensures that moral accountability is fulfilled perfectly.","references":"Quran 45:22","resources":"https://quran.com/45/22"},{"heading":"Life is a Test","content":"This world is temporary; belief in the Hereafter reminds believers that challenges are trials shaping spiritual growth and divine reward.","references":"Quran 67:2","resources":"https://quran.com/67/2"},{"heading":"The Hereafter Encourages Gratitude","content":"Awareness of eternal consequences fosters appreciation for Allah’s blessings, ethical living, and mindful worship.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Hope Strengthens Action","content":"Belief in Paradise motivates righteous deeds, ethical behavior, and perseverance, ensuring spiritual alignment with Allah’s pleasure.","references":"Quran 3:139","resources":"https://quran.com/3/139"},{"heading":"Fear Prevents Wrongdoing","content":"Belief in divine punishment discourages sins, fosters self-restraint, and aligns life with moral and spiritual guidance.","references":"Quran 67:2","resources":"https://quran.com/67/2"},{"heading":"Life is Temporary","content":"This world is fleeting; the eternal Hereafter defines true success. Focus on ethical behavior and worship ensures spiritual fulfillment.","references":"Quran 57:20","resources":"https://quran.com/57/20"},{"heading":"Continuous Reflection is Key","content":"Regular contemplation of the Hereafter strengthens faith, guides ethical conduct, and ensures preparedness for eternal life.","references":"Quran 59:18","resources":"https://quran.com/59/18"}]},{"chapterId":12,"title":"Paradise and Hell, Rewards, Warnings and Motivation","summary":"Visualize the eternal abodes so gratitude grows and warnings keep you humble.","learningObjectives":["Recall five Quranic descriptions of Paradise.","Explain how the warnings of Hell aim to correct, not condemn.","Apply hope and fear in a practical dua routine.","Identify three actions that increase the chance of entering Jannah.","Share one lesson about the afterlife that inspired your own focus."],"overview":[{"heading":"Paradise is Eternal Reward","content":"Believers who follow Allah’s guidance are promised eternal bliss in Paradise, a place of peace, happiness, and divine pleasure.","references":"Quran 18:107","resources":"https://quran.com/18/107"},{"heading":"Hell is a Consequence of Sin","content":"Those who reject guidance and persist in wrongdoing face punishment. Awareness of Hell encourages ethical behavior and sincere repentance.","references":"Quran 4:56","resources":"https://quran.com/4/56"},{"heading":"Paradise Rewards Faith and Deeds","content":"Good deeds, worship, and sincere intentions lead to Paradise. Belief motivates ethical actions and spiritual mindfulness in daily life.","references":"Quran 2:82","resources":"https://quran.com/2/82"},{"heading":"Hell Warns Against Disobedience","content":"Knowledge of divine punishment deters sins, encourages repentance, and strengthens commitment to ethical and spiritual conduct.","references":"Quran 67:6","resources":"https://quran.com/67/6"},{"heading":"Paradise is a Source of Hope","content":"Aspiration for eternal reward inspires patience, perseverance, and consistent worship, guiding believers toward Allah’s pleasure.","references":"Quran 9:72","resources":"https://quran.com/9/72"},{"heading":"Hell Encourages Mindfulness","content":"Awareness of punishment cultivates vigilance in deeds, honesty, and accountability to Allah in all actions.","references":"Quran 78:21-30","resources":"https://quran.com/78/21-30"},{"heading":"Paradise is Attained Through Mercy","content":"Allah’s mercy enables entry into Paradise. Faith, worship, and sincere intentions invite divine pleasure and eternal reward.","references":"Quran 39:53","resources":"https://quran.com/39/53"},{"heading":"Hell is Just Punishment","content":"Divine justice ensures that wrongdoing is appropriately addressed. Awareness strengthens moral behavior and encourages ethical decision-making.","references":"Quran 99:7-8","resources":"https://quran.com/99/7-8"},{"heading":"Rewards are Proportional to Deeds","content":"Every action, small or large, influences eternal outcome. Ethical conduct and worship ensure reward and closeness to Allah.","references":"Quran 6:160","resources":"https://quran.com/6/160"},{"heading":"Hell is Avoided Through Repentance","content":"Sincere repentance and ethical correction prevent punishment, ensuring spiritual growth and alignment with divine guidance.","references":"Quran 25:70","resources":"https://quran.com/25/70"},{"heading":"Paradise Inspires Ethical Living","content":"Hope for eternal reward motivates righteous deeds, patience, gratitude, and compassionate interactions with others.","references":"Quran 3:133","resources":"https://quran.com/3/133"},{"heading":"Hell Encourages Reflection","content":"Considering consequences of sin strengthens mindfulness, self-restraint, and ethical alignment with Allah’s commands.","references":"Quran 74:26-30","resources":"https://quran.com/74/26-30"},{"heading":"Paradise is Beyond Imagination","content":"Descriptions of eternal bliss inspire devotion and reinforce that ultimate fulfillment comes from Allah, motivating ethical and spiritual perseverance.","references":"Quran 76:12-14","resources":"https://quran.com/76/12-14"},{"heading":"Hell Warns of Neglect","content":"Neglecting guidance leads to punishment. Awareness encourages responsibility, repentance, and continuous effort to align life with divine instruction.","references":"Quran 6:128","resources":"https://quran.com/6/128"},{"heading":"Continuous Effort Ensures Reward","content":"Regular worship, ethical behavior, and sincere intention are keys to Paradise, while avoiding sin prevents Hell, reinforcing accountability in daily life.","references":"Quran 2:277","resources":"https://quran.com/2/277"}]},{"chapterId":13,"title":"Dua and Dhikr, Weapons of the Heart","summary":"Remembering Allah and asking Him builds resilience and softens every trial.","learningObjectives":["Memorize five short du\'as with meaning.","Link dhikr phrases to different daily moments.","Explain why dua is both hope and humility.","Build a dua routine you can maintain for a month.","Invite at least one friend to participate in dhikr with you."],"overview":[{"heading":"Dua Connects the Heart to Allah","content":"Supplication fosters intimate connection with Allah, expressing dependence, gratitude, and humility, while strengthening faith and reliance on divine guidance in daily life.","references":"Quran 2:186","resources":"https://quran.com/2/186"},{"heading":"Dhikr Purifies the Soul","content":"Remembering Allah through dhikr cleanses the heart, reinforces mindfulness, and cultivates spiritual resilience, guiding ethical actions and sustained devotion.","references":"Quran 13:28","resources":"https://quran.com/13/28"},{"heading":"Consistency in Dua is Rewarded","content":"Regular supplication demonstrates sincerity, strengthens faith, and invites Allah’s mercy, guidance, and protection in all aspects of life.","references":"Hadith: Sahih Bukhari 6345","resources":"https://sunnah.com/bukhari:6345"},{"heading":"Sincere Intention Matters","content":"Dua accepted by Allah depends on sincerity. Pure intentions align actions and worship with divine guidance, ensuring spiritual reward.","references":"Hadith: Sahih Muslim 2734","resources":"https://sunnah.com/muslim:2734"},{"heading":"Dhikr Brings Peace","content":"Regular remembrance of Allah alleviates anxiety, calms the heart, and strengthens resilience in facing challenges.","references":"Quran 13:28","resources":"https://quran.com/13/28"},{"heading":"Supplication Reflects Dependence","content":"Dua acknowledges human reliance on Allah’s mercy and guidance, fostering humility, gratitude, and ethical living.","references":"Quran 40:60","resources":"https://quran.com/40/60"},{"heading":"Dhikr Enhances Mindfulness","content":"Remembering Allah in daily life develops awareness, discipline, and spiritual focus, guiding ethical and intentional actions.","references":"Quran 33:41-42","resources":"https://quran.com/33/41-42"},{"heading":"Dua is a Form of Worship","content":"Supplication is an act of obedience. Regular dua nurtures devotion, ethical conduct, and reliance on divine mercy.","references":"Quran 2:186","resources":"https://quran.com/2/186"},{"heading":"Gratitude in Dhikr","content":"Remembering Allah’s favors cultivates thankfulness, ethical behavior, and spiritual contentment.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Repentance Through Dua","content":"Supplication facilitates sincere repentance, purifying the heart and aligning life with divine guidance.","references":"Quran 25:70","resources":"https://quran.com/25/70"},{"heading":"Dhikr Strengthens Faith","content":"Frequent remembrance increases certainty in Allah, enhances moral resolve, and nurtures inner peace.","references":"Quran 33:41-42","resources":"https://quran.com/33/41-42"},{"heading":"Prayers Influence Outcomes","content":"Dua and dhikr invite divine guidance, protection, and blessings, shaping spiritual, ethical, and worldly outcomes.","references":"Quran 2:186","resources":"https://quran.com/2/186"},{"heading":"Dua Encourages Patience","content":"Supplication reinforces endurance during trials, strengthens reliance on Allah, and cultivates resilience.","references":"Quran 2:153","resources":"https://quran.com/2/153"},{"heading":"Dhikr Nurtures Gratitude","content":"Regular remembrance fosters appreciation for Allah’s blessings, ethical conduct, and spiritual mindfulness.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Dua is Accessible Anytime","content":"Supplication can be offered in all circumstances, fostering continuous connection, humility, and reliance on Allah’s mercy and guidance.","references":"Hadith: Sahih Muslim 2724","resources":"https://sunnah.com/muslim:2724"}]},{"chapterId":14,"title":"Family, Marriage, Mercy, Dialogue and Legacy","summary":"Homes rooted in mercy, equity, and collective worship mirror the Prophet’s model.","learningObjectives":["Create a family worship routine with dua and Quran time.","Describe three practices that keep marital mercy alive.","Plan a reconciliation step after a misunderstanding.","List two ways to honor parents within your schedule.","Share a nurture plan for the next generation."],"overview":[{"heading":"Marriage is a Sacred Bond","content":"Marriage fosters companionship, love, and mutual support, reflecting divine guidance and strengthening family and societal cohesion.","references":"Quran 30:21","resources":"https://quran.com/30/21"},{"heading":"Rights and Responsibilities","content":"Spouses must honor mutual rights and responsibilities, fostering harmony, ethical behavior, and fulfillment of divine guidance.","references":"Quran 2:228","resources":"https://quran.com/2/228"},{"heading":"Parenting Requires Wisdom","content":"Raising children with faith, ethics, and love ensures moral development and strengthens familial bonds in line with Allah’s guidance.","references":"Quran 31:14","resources":"https://quran.com/31/14"},{"heading":"Mutual Respect is Essential","content":"Respect between spouses nurtures trust, harmony, and spiritual growth, reflecting Islamic ethical principles.","references":"Quran 4:19","resources":"https://quran.com/4/19"},{"heading":"Family Supports Spiritual Growth","content":"A supportive family fosters worship, ethical behavior, and faith, ensuring guidance and accountability within the household.","references":"Quran 66:6","resources":"https://quran.com/66/6"},{"heading":"Love and Compassion","content":"Mutual affection nurtures emotional well-being, strengthens family bonds, and aligns relationships with Allah’s teachings.","references":"Quran 30:21","resources":"https://quran.com/30/21"},{"heading":"Fairness in Treatment","content":"Equity between family members prevents injustice, strengthens cohesion, and fulfills ethical responsibilities.","references":"Quran 4:3","resources":"https://quran.com/4/3"},{"heading":"Maintaining Family Ties","content":"Regular contact, support, and respect strengthen kinship, build social cohesion, and fulfill divine guidance.","references":"Quran 4:1","resources":"https://quran.com/4/1"},{"heading":"Communication is Key","content":"Open, respectful dialogue nurtures understanding, prevents conflict, and strengthens emotional bonds in the family.","references":"Quran 2:187","resources":"https://quran.com/2/187"},{"heading":"Resolving Conflicts Peacefully","content":"Ethical dispute resolution ensures harmony, models patience, and strengthens marital and familial bonds.","references":"Quran 4:35","resources":"https://quran.com/4/35"},{"heading":"Family Encourages Ethical Conduct","content":"Strong family values nurture honesty, kindness, and responsibility, fostering ethical behavior aligned with divine guidance.","references":"Quran 66:6","resources":"https://quran.com/66/6"},{"heading":"Mutual Support During Trials","content":"Family offers emotional, spiritual, and practical support during challenges, reinforcing faith and resilience.","references":"Quran 2:286","resources":"https://quran.com/2/286"},{"heading":"Balanced Roles Enhance Harmony","content":"Understanding and fulfilling complementary roles ensures equity, respect, and cooperation within the household.","references":"Quran 2:228","resources":"https://quran.com/2/228"},{"heading":"Gratitude Strengthens Relationships","content":"Appreciating family members’ efforts nurtures respect, patience, and love, reflecting ethical and spiritual principles.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Spiritual Leadership at Home","content":"Guiding family in worship and ethical conduct ensures holistic growth, strong bonds, and alignment with Allah’s guidance.","references":"Quran 66:6","resources":"https://quran.com/66/6"}]},{"chapterId":15,"title":"Purifying the Hearts Softness, Humility and Focus","summary":"A heart free from envy, pride, and doubt responds to Allah with trust and love.","learningObjectives":["Implement a three day muhasabah habit.","Recognize two signs that the heart is hardening.","Apply dhikr to calm stress and restore focus.","Plan a charitable act that softens the heart.","Practice gratitude to counter envy."],"overview":[{"heading":"Purity of Heart is Essential","content":"A pure heart nurtures faith, compassion, and ethical behavior. Inner cleanliness ensures sincerity in worship and daily conduct.","references":"Quran 91:9","resources":"https://quran.com/91/9"},{"heading":"Love for Allah","content":"A heart connected to Allah guides actions, strengthens resilience, and cultivates gratitude, humility, and ethical behavior.","references":"Quran 2:165","resources":"https://quran.com/2/165"},{"heading":"Sincerity in Intention","content":"Purity of intent ensures that actions are accepted and that deeds reflect true faith, ethical alignment, and devotion.","references":"Hadith: Sahih Bukhari 1","resources":"https://sunnah.com/bukhari:1"},{"heading":"Patience Cultivates Strength","content":"A patient heart overcomes trials, maintains trust in Allah, and fosters resilience and spiritual growth.","references":"Quran 2:153","resources":"https://quran.com/2/153"},{"heading":"Gratitude Softens the Heart","content":"Thankfulness nurtures humility, contentment, and ethical behavior while deepening spiritual connection with Allah.","references":"Quran 14:7","resources":"https://quran.com/14/7"},{"heading":"Forgiveness Cleanses the Heart","content":"Forgiving others fosters peace, emotional balance, and ethical conduct, reflecting divine mercy.","references":"Quran 24:22","resources":"https://quran.com/24/22"},{"heading":"Repentance Purifies the Heart","content":"Sincere repentance cleanses sins, strengthens faith, and nurtures ethical and spiritual growth.","references":"Quran 39:53","resources":"https://quran.com/39/53"},{"heading":"Trust in Allah Strengthens Heart","content":"Relying on divine guidance nurtures peace, courage, and ethical decision-making in all circumstances.","references":"Quran 3:159","resources":"https://quran.com/3/159"},{"heading":"Humility Shapes the Heart","content":"A humble heart reflects awareness of Allah’s greatness, fostering compassion, ethical behavior, and spiritual mindfulness.","references":"Quran 25:63","resources":"https://quran.com/25/63"},{"heading":"Love for People","content":"A heart filled with compassion nurtures strong relationships, ethical behavior, and communal harmony.","references":"Quran 3:134","resources":"https://quran.com/3/134"},{"heading":"Avoiding Hardness of Heart","content":"Neglecting spiritual and ethical duties hardens the heart. Reflection, worship, and ethical action maintain softness and receptivity.","references":"Quran 57:16","resources":"https://quran.com/57/16"},{"heading":"Hope Strengthens the Heart","content":"Belief in Allah’s mercy and guidance nurtures resilience, ethical conduct, and perseverance in challenges.","references":"Quran 39:53","resources":"https://quran.com/39/53"},{"heading":"Fear Encourages Reflection","content":"Fear of divine displeasure fosters accountability, ethical living, and mindfulness in both worship and everyday actions.","references":"Quran 59:18","resources":"https://quran.com/59/18"},{"heading":"Contentment Purifies the Heart","content":"Being satisfied with Allah’s decree fosters gratitude, patience, and inner peace, guiding ethical and spiritual development.","references":"Quran 13:28","resources":"https://quran.com/13/28"},{"heading":"Continuous Reflection Strengthens Heart","content":"Regular contemplation of faith, deeds, and divine guidance ensures a soft, ethical, and spiritually connected heart.","references":"Quran 59:18","resources":"https://quran.com/59/18"}]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterSectionStats.json":
/*!***************************************************************!*\
  !*** ./resources/js/components/data/chapterSectionStats.json ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"sectionStats":[{"title":"Tawheed Before You Were Born: The Primordial Covenant","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed Before You Were Born: The Primordial Covenant today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"The Three Categories of Tawheed (The Standard Framework)","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Three Categories of Tawheed (The Standard Framework) today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Extended Discussions on Tawheed: Ittibaa’ and Beyond","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Extended Discussions on Tawheed: Ittibaa’ and Beyond today?"},{"label":"Confidence","value":"Confidence 70%"}]},{"title":"The Greatest Ayah in the Qur’an: Ayat al-Kursi","stats":[{"label":"Focus window","value":"18 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Greatest Ayah in the Qur’an: Ayat al-Kursi today?"},{"label":"Confidence","value":"Confidence 75%"}]},{"title":"Tawheed of the Prophets in 60 Seconds Each","stats":[{"label":"Focus window","value":"20 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed of the Prophets in 60 Seconds Each today?"},{"label":"Confidence","value":"Confidence 80%"}]},{"title":"Tawheed in the Grave, on the Sirat, and at the Hawd","stats":[{"label":"Focus window","value":"22 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed in the Grave, on the Sirat, and at the Hawd today?"},{"label":"Confidence","value":"Confidence 85%"}]},{"title":"The Ten Nullifiers of Tawheed (Nawaqid al-Islam)","stats":[{"label":"Focus window","value":"24 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Ten Nullifiers of Tawheed (Nawaqid al-Islam) today?"},{"label":"Confidence","value":"Confidence 90%"}]},{"title":"Hidden Shirk Checklist (Modern Edition)","stats":[{"label":"Focus window","value":"26 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Hidden Shirk Checklist (Modern Edition) today?"},{"label":"Confidence","value":"Confidence 95%"}]},{"title":"The Four Stages of Protecting Tawheed","stats":[{"label":"Focus window","value":"28 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Four Stages of Protecting Tawheed today?"},{"label":"Confidence","value":"Confidence 100%"}]},{"title":"Tawheed in Times of Trial: Stories from the Sahaba","stats":[{"label":"Focus window","value":"30 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tawheed in Times of Trial: Stories from the Sahaba today?"},{"label":"Confidence","value":"Confidence 105%"}]}]},{"chapterId":2,"sectionStats":[{"title":"The Branches of Iman: Over Seventy Levels of Excellence","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Branches of Iman: Over Seventy Levels of Excellence today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Belief in Allah – The Unshakable Core","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Belief in Allah – The Unshakable Core today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Living with Angels – Your Constant Companions","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Living with Angels – Your Constant Companions today?"},{"label":"Confidence","value":"Confidence 70%"}]},{"title":"Belief in the Revealed Books – The Chain of Divine Guidance","stats":[{"label":"Focus window","value":"18 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Belief in the Revealed Books – The Chain of Divine Guidance today?"},{"label":"Confidence","value":"Confidence 75%"}]},{"title":"25 Prophets Mentioned by Name – Quick Profiles of Guidance","stats":[{"label":"Focus window","value":"20 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect 25 Prophets Mentioned by Name – Quick Profiles of Guidance today?"},{"label":"Confidence","value":"Confidence 80%"}]},{"title":"Detailed Stages of the Hereafter: From Barzakh to Eternity","stats":[{"label":"Focus window","value":"22 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Detailed Stages of the Hereafter: From Barzakh to Eternity today?"},{"label":"Confidence","value":"Confidence 85%"}]},{"title":"Qadar in Four Simple Equations: Balancing Free Will and Decree","stats":[{"label":"Focus window","value":"24 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Qadar in Four Simple Equations: Balancing Free Will and Decree today?"},{"label":"Confidence","value":"Confidence 90%"}]},{"title":"The Ten Daily Iman Boosters: Practical Integration","stats":[{"label":"Focus window","value":"26 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Ten Daily Iman Boosters: Practical Integration today?"},{"label":"Confidence","value":"Confidence 95%"}]},{"title":"Iman in the Modern World: Countering Doubt","stats":[{"label":"Focus window","value":"28 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Iman in the Modern World: Countering Doubt today?"},{"label":"Confidence","value":"Confidence 100%"}]}]},{"chapterId":3,"sectionStats":[{"title":"Shahada – The Key That Never Rusts","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Shahada – The Key That Never Rusts today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Salah – 50→5 Gift of the Night Journey","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Salah – 50→5 Gift of the Night Journey today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Zakat – Financial Detox and Social Justice","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Zakat – Financial Detox and Social Justice today?"},{"label":"Confidence","value":"Confidence 70%"}]},{"title":"Sawm – Training the Soul for 11 Months","stats":[{"label":"Focus window","value":"18 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Sawm – Training the Soul for 11 Months today?"},{"label":"Confidence","value":"Confidence 75%"}]},{"title":"Hajj – Standing Where the Prophets Stood","stats":[{"label":"Focus window","value":"20 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Hajj – Standing Where the Prophets Stood today?"},{"label":"Confidence","value":"Confidence 80%"}]},{"title":"No Sixth Pillar: Clarifying Misconceptions","stats":[{"label":"Focus window","value":"22 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect No Sixth Pillar: Clarifying Misconceptions today?"},{"label":"Confidence","value":"Confidence 85%"}]},{"title":"Daily, Weekly, Yearly, Lifetime Checklist: Building Rhythm","stats":[{"label":"Focus window","value":"24 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Daily, Weekly, Yearly, Lifetime Checklist: Building Rhythm today?"},{"label":"Confidence","value":"Confidence 90%"}]},{"title":"The Fruits of the Pillars: Transformation Stories","stats":[{"label":"Focus window","value":"26 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Fruits of the Pillars: Transformation Stories today?"},{"label":"Confidence","value":"Confidence 95%"}]}]},{"chapterId":4,"sectionStats":[{"title":"Tajweed & Presence","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Tajweed & Presence today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Meditative Reflection","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Meditative Reflection today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":5,"sectionStats":[{"title":"Prophetic Communication","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Prophetic Communication today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Balance & Routine","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Balance & Routine today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":6,"sectionStats":[{"title":"Mental Prep","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Mental Prep today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Physical Presence","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Physical Presence today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":7,"sectionStats":[{"title":"Family Adab","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Family Adab today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Digital Etiquette","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Digital Etiquette today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":8,"sectionStats":[{"title":"Halal Nutrition","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Halal Nutrition today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Digital Boundaries","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Digital Boundaries today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":9,"sectionStats":[{"title":"Hosting with Heart","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Hosting with Heart today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Conflict Resolution","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Conflict Resolution today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":10,"sectionStats":[{"title":"Spiritual Goal Setting","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Spiritual Goal Setting today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Legacy Planning","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Legacy Planning today?"},{"label":"Confidence","value":"Confidence 65%"}]}]},{"chapterId":11,"sectionStats":[{"title":"Moments Between This Life and the Next","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Moments Between This Life and the Next today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Judgment Day: Balance Fear and Hope","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Judgment Day: Balance Fear and Hope today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Charity That Continues After Passing","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Charity That Continues After Passing today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":12,"sectionStats":[{"title":"Gardens Below Which Rivers Flow","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Gardens Below Which Rivers Flow today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"The Fire of Hell and Lessons from the Warnings","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect The Fire of Hell and Lessons from the Warnings today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Living with Both Realities","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Living with Both Realities today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":13,"sectionStats":[{"title":"Dua as Conversation","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Dua as Conversation today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Dhikr Between Actions","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Dhikr Between Actions today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Protecting the Heart","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Protecting the Heart today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":14,"sectionStats":[{"title":"Marital Mercy","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Marital Mercy today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Parenting for the Heart","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Parenting for the Heart today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Extended Family Ties","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Extended Family Ties today?"},{"label":"Confidence","value":"Confidence 70%"}]}]},{"chapterId":15,"sectionStats":[{"title":"Detecting Heart Diseases","stats":[{"label":"Focus window","value":"12 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Detecting Heart Diseases today?"},{"label":"Confidence","value":"Confidence 60%"}]},{"title":"Softening Through Dhikr and Charity","stats":[{"label":"Focus window","value":"14 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Softening Through Dhikr and Charity today?"},{"label":"Confidence","value":"Confidence 65%"}]},{"title":"Focus Amid Distractions","stats":[{"label":"Focus window","value":"16 min focus"},{"label":"Reflection prompt","value":"Ask yourself: How does this reflect Focus Amid Distractions today?"},{"label":"Confidence","value":"Confidence 70%"}]}]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterToneFocus.json":
/*!************************************************************!*\
  !*** ./resources/js/components/data/chapterToneFocus.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","toneFocus":"Gentle reminder: reconnect every deed to the testimony of Tawheed and thank yourself for every small sincere stretch. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":2,"title":"Islamic beliefs","toneFocus":"Softly reaffirm belief by noting how unseen realities quietly guide kindness; no need to judge, just observe. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":3,"title":"Islamic pillars","toneFocus":"Describe the pillars as steady companions they keep you grounded without demanding perfection. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":4,"title":"Islamic quran","toneFocus":"Encourage curiosity about the Qur’an by inviting slow reading, reflective pauses, and compassionate self-questioning. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":5,"title":"Islamic prophet","toneFocus":"Share the Prophet’s mercy through storytelling; highlight human softness rather than ideal standards. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":6,"title":"Islamic prayers","toneFocus":"Treat prayer as a calming rhythm; focus on presence over performance and celebrate every moment you return to Allah. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":7,"title":"Islamic manners","toneFocus":"Model kindness first when speaking about manners, acknowledging that everyone slips and starts again with a humble heart. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":8,"title":"Islamic lifestyle","toneFocus":"Position lifestyle shifts as gentle experiments; invite calm breaks and gratitude rather than pressure. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":9,"title":"Islamic community","toneFocus":"Frame community as collective care; encourage reaching out with open palms and expect gradual trust-building. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":10,"title":"Islamic future","toneFocus":"Speak about future planning as hopeful exploration each small goal is a duet with hope and dua. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":11,"title":"Islamic hereafter","toneFocus":"Balance reminders of the Hereafter with Allah’s mercy; encourage reflection through soft questions instead of fear. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":12,"title":"Islamic paradise and hell","toneFocus":"Paint Paradise with inviting hope and describe Hell as a distant warning that simply redirects your compassion. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":13,"title":"Islamic dua dhkir","toneFocus":"Show dua as an ongoing conversation; celebrate even tiny whispers of remembrance and raw honesty. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":14,"title":"Islamic family and marriage","toneFocus":"Describe family work as a shared, compassionate journey small acts of mercy matter more than flawless systems. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."},{"chapterId":15,"title":"Islamic heart","toneFocus":"Talk about the heart like soft soil gentle care, regular self-accounting, and hope bring new blossoms. It invites patience, softens doubts, and champions steady growth. It celebrates resilience and keeps hearts hopeful daily."}]');

/***/ }),

/***/ "./resources/js/components/data/chapterToneGuidelines.json":
/*!*****************************************************************!*\
  !*** ./resources/js/components/data/chapterToneGuidelines.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"Islamic foundation","guidelines":["Talk about Tawheed like a journey that welcomes every question.","Focus on understanding rather than labeling someone\'s progress.","Point to gentle reminders and small acts of sincerity."]},{"chapterId":2,"title":"Islamic beliefs","guidelines":["Describe belief as a living reality, not just doctrine to memorize.","Center conversations on curiosity and humility.","Invite readers to share their doubts safely."]},{"chapterId":3,"title":"Islamic pillars","guidelines":["Let pillars feel like steady rhythm, not rigid tests.","Emphasize momentum over perfection when habits wobble.","Balance accountability with encouragement."]},{"chapterId":4,"title":"Islamic quran","guidelines":["Encourage slow, reflective reading rather than pressured mastery.","Celebrate each verse understood, even if the pace is gentle.","Use everyday language when explaining tajweed or tafsir."]},{"chapterId":5,"title":"Islamic prophet","guidelines":["Highlight mercy and patience from the Prophet\'s life.","Speak to the reader as a companion, not a sermon target.","Invite imitation through small gestures of kindness."]},{"chapterId":6,"title":"Islamic prayers","guidelines":["Frame salah as a lifeline, not a performance grade.","Acknowledge distractions with compassion.","Suggest tiny adjustments that rebuild focus."]},{"chapterId":7,"title":"Islamic manners","guidelines":["Use tone that models adab rather than demanding it.","Call attention to wins in patience instead of pointing out slips.","Appreciate the effort behind gentler speech."]},{"chapterId":8,"title":"Islamic lifestyle","guidelines":["Describe lifestyle shifts as experiments with love for halal living.","Encourage readers to swap one habit lightly instead of overhauling all.","Stay inclusive about rest, play, and self-care."]},{"chapterId":9,"title":"Islamic community","guidelines":["Talk about community through shared care, not competition.","Invite people to try a small act of service without guilt.","Offer questions that spark connection."]},{"chapterId":10,"title":"Islamic future","guidelines":["Use tone that sees future planning as hopeful exploration.","Avoid pressuring readers with unrealistic timelines.","Affirm that consistent tiny goals outpace big leaps."]},{"chapterId":11,"title":"Islamic hereafter","guidelines":["Balance reminders of judgment with Allah\'s mercy in every sentence.","Encourage reflection by asking gentle questions.","Share hope that accountability can be full of tawakkul."]},{"chapterId":12,"title":"Islamic paradise and hell","guidelines":["Highlight paradise with inspiring imagery, not intimidation.","Talk about Hell as a nudge toward kindness, not a threat.","Invite readers to pray for refuge while staying upbeat."]},{"chapterId":13,"title":"Islamic dua dhkir","guidelines":["Let dua discussions feel like warm conversations with Allah.","Celebrate even the shortest remembrance.","Open the door for honest emotions without judgment."]},{"chapterId":14,"title":"Islamic family and marriage","guidelines":["Describe family work as compassionate partnership.","Invite small acts of mercy over perfection in relationships.","Offer gentle wording that keeps dialogue calm."]},{"chapterId":15,"title":"Islamic heart","guidelines":["Position heart work as soft recovery, not harsh correction.","Celebrate humility in the wake of slip-ups.","Encourage gentle self-accounting and return to hope."]}]');

/***/ }),

/***/ "./resources/js/components/data/chapterVideos.json":
/*!*********************************************************!*\
  !*** ./resources/js/components/data/chapterVideos.json ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":2,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":3,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":4,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":5,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":6,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":7,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":8,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":9,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":10,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":11,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":12,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":13,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":14,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]},{"chapterId":15,"videos":[{"title":"British Man Converts To Islam & Becomes Step Dad To 3 Children | Extremely British Muslims","url":"https://www.youtube.com/watch?v=Dao32Ej0uEU","description":"A British father speaks directly about how Islam guided him to care for his blended family."},{"title":"How Golf Balls Led Me to Islam — A Revert Story from New Jersey #newmuslim #converttoislam","url":"https://www.youtube.com/watch?v=X791O1nmNak","description":"A New Jersey man narrates the precise moment a golf conversation shifted his heart toward Islam."},{"title":"My Journey to Islam in 3 Minutes! 2021","url":"https://www.youtube.com/watch?v=Pcx4xwPXY_M","description":"Abdurahman outlines the critical steps that moved him from curiosity to saying the shahada."},{"title":"Why Feminism Lied to Me | My Journey to True Liberation Through Islam #muslimconvertstory","url":"https://www.youtube.com/watch?v=41486X9qWFM","description":"A female revert describes how Islam delivered the clarity and dignity feminism promised but never provided."},{"title":"Convert to Islam Emotional Story : American Girl Convert to Islam | Emotional Shahada Muslim Convert","url":"https://www.youtube.com/watch?v=4K30Ki8ednA","description":"An American sister shares the emotional moment she embraced Islam and whispered the shahada."},{"title":"How She Convert to Islam|| Muslim girl revert story||","url":"https://www.youtube.com/watch?v=mSjBJa7mCko","description":"A young revert tells the exact personal choices that led her toward Islam in under three minutes."},{"title":"Australian Girl Tells her Emotional Story Why She Converted to Islam","url":"https://www.youtube.com/watch?v=IqhFMvTu7Uw","description":"An Australian woman calmly recounts why Islamic teachings spoke to her core needs and values."},{"title":"Three verses removed from Bible||Christian women\'ask why|| Muslim Brooklyn","url":"https://www.youtube.com/watch?v=3sYKQnVV-DM","description":"A Brooklyn-born revert lists the precise verses and questions that pushed her toward Islam."}]}]');

/***/ }),

/***/ "./resources/js/components/data/commonQuestions.json":
/*!***********************************************************!*\
  !*** ./resources/js/components/data/commonQuestions.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"key":"foundation","title":"Islamic foundation","faqs":[{"id":"foundation-1","title":"What does the Islamic foundation chapter cover?","body":"<p>It explains Tawheed, the oneness of Allah, and how every act of worship roots itself in that testimony.</p>"},{"id":"foundation-2","title":"Why is Tawheed considered the foundation of Islamic faith?","body":"<p>Tawheed affirms that Allah alone deserves worship, so every belief, law, and character trait rests on that unity.</p>"},{"id":"foundation-3","title":"How should I keep the foundation alive in everyday decisions?","body":"<p>Anchor intentions in Allah, audit actions for signs of shirk, and repeat the shahada when distractions appear.</p>"},{"id":"foundation-4","title":"What are common mistakes learners make about this chapter?","body":"<p>Treating Tawheed as abstract, idolizing culture, or neglecting accountability; the chapter warns against these errors.</p>"},{"id":"foundation-5","title":"Which practices help strengthen the Islamic foundation?","body":"<p>Daily dhikr, Quran reflection on Allah\'s names, learning seerah highlights, and teaching others keeps the foundation firm.</p>"}]},{"chapterId":2,"key":"beliefs","title":"Islamic beliefs","faqs":[{"id":"beliefs-1","title":"What are the six articles of faith?","body":"<p>Belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree of the good and the bad.</p>"},{"id":"beliefs-2","title":"How can I live more mindful of Allah, angels, and books?","body":"<p>Remember that angels record deeds, treat revelation with reverence, and reserve time for Quran reading and gratitude.</p>"},{"id":"beliefs-3","title":"What role does qadar, divine decree, play in this chapter?","body":"<p>It teaches trust by reminding us that everything happens by Allah\'s will, so we plan while relying on Him and thanking Him in every trial.</p>"},{"id":"beliefs-4","title":"How does belief in prophets connect to other articles?","body":"<p>Prophets bring the books, model submission, and confirm the unseen truths that the chapter lists, making the whole faith coherent.</p>"},{"id":"beliefs-5","title":"How do I strengthen my iman through the beliefs chapter?","body":"<p>Review each article, state them aloud, teach them, and act in ways that reflect trust in Allah\'s knowledge.</p>"}]},{"chapterId":3,"key":"pillars","title":"Islamic pillars","faqs":[{"id":"pillars-1","title":"Why are the five pillars called pillars?","body":"<p>They uphold Muslim life: declaration of faith, prayer, charity, fasting, and pilgrimage form the stable framework.</p>"},{"id":"pillars-2","title":"How should I balance the five pillars with work or school?","body":"<p>Schedule worship, build routines, seek accommodations for prayer, pair zakat with budgeting, and use Ramadan to rehearse.</p>"},{"id":"pillars-3","title":"What is the easiest pillar for beginners to start practicing?","body":"<p>Shahada and salah are immediate; say the testimony, then commit to punctual prayers while learning the others.</p>"},{"id":"pillars-4","title":"How can I keep my intention pure for each pillar?","body":"<p>Remind yourself you do it for Allah, not praise, and repeat a short dua before every act.</p>"},{"id":"pillars-5","title":"What resources does this chapter recommend for mastering the pillars?","body":"<p>Basic guides, mentor-led classes, Quran verses on worship, and sticky-note reminders on goals keep actions consistent.</p>"}]},{"chapterId":4,"key":"quran","title":"Islamic quran","faqs":[{"id":"quran-1","title":"Why is the Quran the heart of this chapter?","body":"<p>It is Allah\'s final revelation, providing law, guidance, and a living connection to Him.</p>"},{"id":"quran-2","title":"How do I begin reading the Quran with meaning?","body":"<p>Start with short surahs, read translation alongside, reflect on a verse a day, and ask Allah for understanding.</p>"},{"id":"quran-3","title":"What etiquette should I observe when handling the Quran?","body":"<p>Be in a clean state, say bismillah, listen attentively, and avoid rushing through the text.</p>"},{"id":"quran-4","title":"How does studying tajweed fit the chapter?","body":"<p>Tajweed preserves beauty; practicing correct pronunciation honors the divine speech and boosts confidence.</p>"},{"id":"quran-5","title":"Which habits keep the Quran close after the chapter?","body":"<p>Memorize small portions, journal reflections, teach others, listen to recitations, and recite before sleeping.</p>"}]},{"chapterId":5,"key":"prophet","title":"Islamic prophet","faqs":[{"id":"prophet-1","title":"What is the focus of the Prophet chapter?","body":"<p>It narrates Muhammad\'s life, teaching mercy, patience, and how to implement the Sunnah today.</p>"},{"id":"prophet-2","title":"Why is following the Prophet example necessary?","body":"<p>He is the best interpreter of the Quran and shows how to worship, treat people, and stay humble.</p>"},{"id":"prophet-3","title":"Which stories does the chapter highlight?","body":"<p>His childhood, migration, compassionate leadership, treatment of enemies, and devotion to repentance are central.</p>"},{"id":"prophet-4","title":"How do I bring his manners into my home?","body":"<p>Practice gentle speech, serve family, forgive quickly, keep evenings with dhikr, and share meals generously.</p>"},{"id":"prophet-5","title":"How should I send blessings upon him as the chapter teaches?","body":"<p>Say sallallahu alayhi wa sallam after his name, learn short salawat phrases, and include him in each dua.</p>"}]},{"chapterId":6,"key":"prayers","title":"Islamic prayers","faqs":[{"id":"prayers-1","title":"How many obligatory prayers are there?","body":"<p>Five daily prayers - Fajr, Dhuhr, Asr, Maghrib, and Isha - each with a specific window of time.</p>"},{"id":"prayers-2","title":"How do I learn wudu and salah correctly?","body":"<p>Follow step-by-step tutorials, pray with an experienced friend, memorize the words, and repeat frequently.</p>"},{"id":"prayers-3","title":"What is khushu and how do I build it?","body":"<p>Khushu is calm focus; slow down, picture standing before Allah, and recite meanings during prayer.</p>"},{"id":"prayers-4","title":"Where do Sunnah prayers fit this chapter?","body":"<p>They supplement obligations, deepen connection, and mirror the Prophet routine in each prayer block.</p>"},{"id":"prayers-5","title":"What if I make mistakes during prayer?","body":"<p>Stay humble, perform sujud sahw when needed, ask Allah for forgiveness, and view mistakes as learning steps.</p>"}]},{"chapterId":7,"key":"manners","title":"Islamic manners","faqs":[{"id":"manners-1","title":"What defines Islamic manners?","body":"<p>Adab - behaving with respect, gentleness, truthfulness, and awareness of others - guides every interaction.</p>"},{"id":"manners-2","title":"How do I manage anger with good manners?","body":"<p>Pause, breathe, lower your voice, whisper a dua, and choose patience instead of a sharp response.</p>"},{"id":"manners-3","title":"How should I greet people?","body":"<p>Offer salam, smile, make eye contact, and mention their name to show care.</p>"},{"id":"manners-4","title":"What does the chapter say about speech?","body":"<p>Speak truthfully, avoid gossip, praise sincerely, and weigh words before sharing.</p>"},{"id":"manners-5","title":"How do I show manners online?","body":"<p>Keep comments kind, avoid heated debates, give the benefit of the doubt, and unplug when things turn toxic.</p>"}]},{"chapterId":8,"key":"lifestyle","title":"Islamic lifestyle","faqs":[{"id":"lifestyle-1","title":"What is an Islamic lifestyle?","body":"<p>It harmonizes diet, finance, leisure, and ethics with halal choices, gratitude, and steady worship.</p>"},{"id":"lifestyle-2","title":"How do I ensure my food and money stay halal?","body":"<p>Check labels, ask vendors, keep clear records, and choose halal providers even when it takes extra effort.</p>"},{"id":"lifestyle-3","title":"How does the chapter explain technology use?","body":"<p>Use it for learning, connection, and good causes while setting screen-time limits and avoiding harmful content.</p>"},{"id":"lifestyle-4","title":"What role does rest and self-care play?","body":"<p>Balanced rest honors the trust Allah gave us; schedule prayer breaks and go to bed early.</p>"},{"id":"lifestyle-5","title":"How do I maintain modesty in lifestyle choices?","body":"<p>Dress modestly, guard your gaze, speak with humility, and distance from environments that encourage excess.</p>"}]},{"chapterId":9,"key":"community","title":"Islamic community","faqs":[{"id":"community-1","title":"What responsibilities do Muslims have toward the Ummah?","body":"<p>Support one another, share knowledge, stand for justice, and help those in need.</p>"},{"id":"community-2","title":"How can I serve my local community?","body":"<p>Volunteer at masjid events, check on neighbors, and share resources like food or skills.</p>"},{"id":"community-3","title":"What does the chapter teach about conflict resolution?","body":"<p>Listen, speak calmly, seek mediation, forgive when possible, and follow Quranic principles.</p>"},{"id":"community-4","title":"How do I include newcomers?","body":"<p>Greet them, introduce them to circles, invite them to study, and show hospitality.</p>"},{"id":"community-5","title":"How can I lead or mentor responsibly?","body":"<p>Model compassion, stay accountable, plan inclusive programs, and keep learning.</p>"}]},{"chapterId":10,"key":"future","title":"Islamic future","faqs":[{"id":"future-1","title":"How does this chapter frame the future?","body":"<p>As a continuous journey of growth, planning, and trusting Allah\'s guidance.</p>"},{"id":"future-2","title":"What steps help me set spiritual goals?","body":"<p>Define measurable acts, schedule reviews, and tie each goal to Quranic reminders.</p>"},{"id":"future-3","title":"How should I handle setbacks in spiritual growth?","body":"<p>Return to dua, revisit your plan, learn from mistakes, and rely on supportive friends.</p>"},{"id":"future-4","title":"What habits protect my future from burnout?","body":"<p>Pace learning, take rest days, celebrate small wins, and keep a gratitude checklist.</p>"},{"id":"future-5","title":"How can I mentor others while pursuing my future?","body":"<p>Share routines, offer encouragement, build accountability pairs, and pray for them.</p>"}]},{"chapterId":11,"key":"hereafter","title":"Islamic hereafter","faqs":[{"id":"hereafter-1","title":"What key realities about the hereafter does the chapter cover?","body":"<p>It explains death, the grave, standing before Allah, and the scales of deeds.</p>"},{"id":"hereafter-2","title":"How should I prepare for the grave?","body":"<p>Live with regular repentance, maintain good deeds, and keep ties with family.</p>"},{"id":"hereafter-3","title":"Why is the Day of Judgment important?","body":"<p>It restores justice, rewards the patient, and reminds us that every deed is recorded.</p>"},{"id":"hereafter-4","title":"How do I balance fear and hope about akhirah?","body":"<p>Fear the consequences of sin, but keep hope in Allah\'s mercy by doing good.</p>"},{"id":"hereafter-5","title":"What role does charity play in the hereafter?","body":"<p>Sadaqah keeps giving after we pass, so the chapter encourages consistent giving.</p>"}]},{"chapterId":12,"key":"paradise","title":"Islamic paradise and hell","faqs":[{"id":"paradise-1","title":"How does the chapter describe paradise?","body":"<p>Gardens beneath which rivers flow, peace, reunions with loved ones, and endless pleasure.</p>"},{"id":"paradise-2","title":"What actions open the doors of paradise?","body":"<p>Faith, prayer, charity, patience, and kindness while avoiding major sins.</p>"},{"id":"paradise-3","title":"How is hell portrayed?","body":"<p>As intense fire, regret, and punishment for rejecting truth or committing injustice.</p>"},{"id":"paradise-4","title":"How do I keep hope without ignoring warnings?","body":"<p>Remember Allah\'s mercy daily and live in obedience to avoid the fire.</p>"},{"id":"paradise-5","title":"What reminders keep paradise and hell relevant?","body":"<p>Visualize them during dua, read verses about them, and let them motivate ethical choices.</p>"}]},{"chapterId":13,"key":"duas","title":"Islamic dua dhkir","faqs":[{"id":"duas-1","title":"Why are dua and dhikr called weapons?","body":"<p>They guard hearts, invite mercy, and counter shaytan whisperings.</p>"},{"id":"duas-2","title":"How do I make dua effectively?","body":"<p>Start with praise, send blessings on the Prophet, ask with humility, and close with aameen.</p>"},{"id":"duas-3","title":"What kinds of dhikr can I do daily?","body":"<p>SubhanAllah, Alhamdulillah, Allahu Akbar, La ilaha illallah, and Ayat al-Kursi repeated with focus.</p>"},{"id":"duas-4","title":"How can I keep dhikr from becoming mechanical?","body":"<p>Think of each phrase, connect to its meaning, and make it part of conversations with Allah.</p>"},{"id":"duas-5","title":"What times are best for dua and dhikr?","body":"<p>After prayers, between adhan and iqamah, during tahajjud, and in the last third of night or on journeys.</p>"}]},{"chapterId":14,"key":"family","title":"Islamic family and marriage","faqs":[{"id":"family-1","title":"What principles guide family life in the chapter?","body":"<p>Love, mercy, respect, communication, and shared worship make the home a sanctuary.</p>"},{"id":"family-2","title":"How do spouses maintain mercy and justice?","body":"<p>Treat each other gently, consult on decisions, divide work fairly, and keep dua together.</p>"},{"id":"family-3","title":"What should I do before marriage?","body":"<p>Perform istikhara, seek halal introductions, discuss values, and involve guardians.</p>"},{"id":"family-4","title":"How does the chapter advise raising children?","body":"<p>Teach Quran, model manners, set routines, and nurture curiosity and gratitude.</p>"},{"id":"family-5","title":"What conflict resolution tips does the chapter offer?","body":"<p>Listen without interrupting, meet with cool heads, involve neutral family, and forgive.</p>"}]},{"chapterId":15,"key":"heart","title":"Islamic heart","faqs":[{"id":"heart-1","title":"What does the chapter say about the heart?","body":"<p>It focuses on purification, removing diseases like envy, pride, and attachment to status.</p>"},{"id":"heart-2","title":"How do I purify my heart from envy?","body":"<p>Celebrate others, count blessings, make dua for them, and remember everything belongs to Allah.</p>"},{"id":"heart-3","title":"What is muhasabah?","body":"<p>Self-accounting: reviewing your day, repenting, and planning improvements before sleep.</p>"},{"id":"heart-4","title":"How do I keep the heart soft toward Allah?","body":"<p>Recite Quran, give charity, help others, and make moments of quiet reflection.</p>"},{"id":"heart-5","title":"How does dhikr guard against spiritual diseases?","body":"<p>Frequent remembrance reinforces humility, reminds you of accountability, and calms the soul.</p>"}]}]');

/***/ }),

/***/ "./resources/js/components/data/duas.json":
/*!************************************************!*\
  !*** ./resources/js/components/data/duas.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"duas":[{"arabic":"رَبِّ زِدْنِي عِلْمًا","english":"My Lord, increase me in knowledge."},{"arabic":"اللَّهُمَّ ثَبِّتْ قُلُوبَنَا عَلَى الْحَقِّ","english":"O Allah, keep our hearts firm on truth."},{"arabic":"اللَّهُمَّ اجْعَلْنَا مِنَ الْمُسْلِمِينَ الْمُتَّقِينَ","english":"O Allah, make us among the righteous Muslims."}]},{"chapterId":2,"duas":[{"arabic":"اللَّهُمَّ ارْزُقْنِي إِيمَانًا عَامِلًا","english":"O Allah, grant me faith that translates into action."},{"arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","english":"Our Lord, do not let our hearts deviate."},{"arabic":"اللَّهُمَّ عَلِّمْنِي مَا يَرْتَفِعُ بِهِ إِيمَانِي","english":"O Allah, teach me what raises my belief."}]},{"chapterId":3,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْنِي مِنَ الْمُقِيمِينَ الصَّلَاةَ","english":"O Allah, make me among those who establish the prayer."},{"arabic":"رَبِّ اجْعَلْ صِيَامِي شُكْرًا لَكَ","english":"My Lord, let my fast be a thank-you to You."},{"arabic":"اللَّهُمَّ اقْبَلْ مِنَّا الصَّدَقَةَ","english":"O Allah, accept charity from us."}]},{"chapterId":4,"duas":[{"arabic":"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ هُدَاكَ","english":"O Allah, open for me the doors of Your guidance."},{"arabic":"رَبِّ زِدْنِي فَهْمًا","english":"My Lord, increase me in understanding."},{"arabic":"اللَّهُمَّ اجْعَلْ لِي الْقُرْآنَ رَحْمَةً وَنُورًا","english":"O Allah, make the Quran a mercy and light for me."}]},{"chapterId":5,"duas":[{"arabic":"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ","english":"O Allah, send blessings upon Muhammad."},{"arabic":"اللَّهُمَّ عَلِّمْنِي سُنَّتَهُ","english":"O Allah, teach me his Sunnah."},{"arabic":"اللَّهُمَّ أَحْيِ قَلْبِي بِهَدْيِهِ","english":"O Allah, revive my heart with his guidance."}]},{"chapterId":6,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْ لِي فِي الصَّلَاةِ خُشُوعًا","english":"O Allah, grant me focus in prayer."},{"arabic":"رَبِّ أَعِنِّي عَلَى أَدَائِهَا","english":"My Lord, help me perform it."},{"arabic":"اللَّهُمَّ اجْعَلْهَا حَبَلًا بَيْنِي وَبَيْنَكَ","english":"O Allah, make it a bond between me and You."}]},{"chapterId":7,"duas":[{"arabic":"اللَّهُمَّ زَيِّنِي بِالأَدَبِ","english":"O Allah, beautify me with good manners."},{"arabic":"رَبِّ أَنْجِنِي مِنْ غَضَبِ صَدْرِي","english":"My Lord, save me from the anger of my chest."},{"arabic":"اللَّهُمَّ اجْعَلْ لِسَانِي لُطْفًا","english":"O Allah, make my speech gentle."}]},{"chapterId":8,"duas":[{"arabic":"اللَّهُمَّ بَارِكْ فِي رِزْقِي","english":"O Allah, bless my provision."},{"arabic":"رَبِّ أَنْقِذْنِي مِنَ الْغَفْلَةِ","english":"My Lord, rescue me from heedlessness."},{"arabic":"اللَّهُمَّ اجْعَلْنِي آخِذًا بِالْحَلالِ","english":"O Allah, make me one who holds to halal."}]},{"chapterId":9,"duas":[{"arabic":"اللَّهُمَّ اجْمَعْنَا عَلَى الْمَحَبَّةِ","english":"O Allah, unite us in love."},{"arabic":"رَبِّ أَصْلِحْ شِيعَتِي","english":"My Lord, reform my community."},{"arabic":"اللَّهُمَّ أَخْرِجْنِي مِنَ الْعُزْلَةِ لِلْخِدْمَةِ","english":"O Allah, move me from isolation into service."}]},{"chapterId":10,"duas":[{"arabic":"رَبِّ إِنِّي أَسْأَلُكَ نُورًا لِطَرِيقِي","english":"My Lord, I ask You for light for my path."},{"arabic":"اللَّهُمَّ اشْدُدْ صُدُورَنَا لِلدَّوَامِ","english":"O Allah, strengthen our chests for steadiness."},{"arabic":"رَبِّ هَبْ لِي قَلْبًا سَلِيمًا لِمَا بَعْدَ","english":"My Lord, grant me a sound heart for what comes next."}]},{"chapterId":11,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْ قَبْرِي رَوْضَةً","english":"O Allah, make my grave a garden."},{"arabic":"رَبِّ أَدْخِلْنِي الْجَنَّةَ مَعَ الْمُتَّقِينَ","english":"My Lord, admit me into Paradise with the righteous."},{"arabic":"اللَّهُمَّ أَعِنِّي عَلَى الذِّكْرِ وَالْعَمَلِ الْجَيِّدِ حَتَّى الْمَوْتِ","english":"O Allah, help me remember You and do good deeds until death."}]},{"chapterId":12,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْنِي مِنْ أَصْحَابِ الْجَنَّةِ","english":"O Allah, make me among the companions of Paradise."},{"arabic":"رَبِّ اجْعَلْ قَلْبِي يَخْشَى النَّارَ","english":"My Lord, make my heart fear the Fire."},{"arabic":"اللَّهُمَّ اجْعَلْ لِي مِنْ أَشْجَارِ الْجَنَّةِ ظِلًّا","english":"O Allah, grant me shade from the trees of Paradise."}]},{"chapterId":13,"duas":[{"arabic":"سُبْحَانَ اللَّهِ","english":"Glory be to Allah."},{"arabic":"الْحَمْدُ لِلَّهِ","english":"All praise is due to Allah."},{"arabic":"اللَّهُ أَكْبَرُ","english":"Allah is the Greatest."}]},{"chapterId":14,"duas":[{"arabic":"رَبِّ أَصْلِحْ بَيْتِي","english":"My Lord, rectify my household."},{"arabic":"اللَّهُمَّ أَلِفْ بَيْنَ قُلُوبِنَا","english":"O Allah, bring hearts together."},{"arabic":"رَبِّ اجْعَلْ ذُرِّيَّتِي مِنَ الصَّالِحِينَ","english":"My Lord, make my offspring among the righteous."}]},{"chapterId":15,"duas":[{"arabic":"اللَّهُمَّ طَهِّرْ قَلْبِي","english":"O Allah, purify my heart."},{"arabic":"رَبِّ اجْعَلْ قَلْبِي مُتَوَجِّهًا إِلَيْكَ","english":"My Lord, make my heart turn to You."},{"arabic":"اللَّهُمَّ اجْعَلْ ذِكْرَكَ نُورًا لِي","english":"O Allah, make Your remembrance a light for me."}]}]');

/***/ }),

/***/ "./resources/js/components/data/faqs.json":
/*!************************************************!*\
  !*** ./resources/js/components/data/faqs.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapter":"Islamic Foundation","faqs":[{"id":"islamic-foundation-1","title":"What is the Islamic foundation?","body":"<p>The Islamic foundation is rooted in belief in Allah, the prophets, the Quran, and the practices that keep you connected to Him every day.</p>"},{"id":"islamic-foundation-2","title":"How do I begin learning the basics of Islam?","body":"<p>Start with the Shahada, learn short duas, read a beginner\'s Quran translation, and ask trusted teachers for guidance in bite-sized steps.</p>"},{"id":"islamic-foundation-3","title":"Why is intention important in Islam?","body":"<p>Because Allah judges deeds by intentions, making a sincere purpose turns routines into acts of worship.</p>"},{"id":"islamic-foundation-4","title":"Which early practices help build a strong foundation?","body":"<p>Regular prayer, brief Quran reflections, consistent charity, and daily dua keep the foundations alive.</p>"},{"id":"islamic-foundation-5","title":"How can I keep the foundation steady when life gets busy?","body":"<p>Set reminders, combine new habits with existing ones, and stay connected to a community that encourages you.</p>"}],"chapterId":1},{"chapter":"Islamic Beliefs","faqs":[{"id":"islamic-beliefs-1","title":"What are the core beliefs of Islam?","body":"<p>The core beliefs include belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree.</p>"},{"id":"islamic-beliefs-2","title":"How does belief in Allah’s oneness affect daily life?","body":"<p>Understanding Tawhid encourages you to turn to Allah alone for help, worship, and trust in every situation.</p>"},{"id":"islamic-beliefs-3","title":"Why do Muslims believe in angels and divine books?","body":"<p>They are part of the unseen that Allah revealed to guide humanity and remind us that we are accountable.</p>"},{"id":"islamic-beliefs-4","title":"What role do prophets play in Islamic belief?","body":"<p>Prophets transmit Allah’s message, model obedience, and teach mercy Muhammad is the final messenger to all people.</p>"},{"id":"islamic-beliefs-5","title":"How can I strengthen my belief when doubts arise?","body":"<p>Study reliable sources, speak to wise mentors, maintain regular worship, and make dua for increased certainty.</p>"}],"chapterId":2},{"chapter":"Islamic Pillars","faqs":[{"id":"islamic-pillars-1","title":"What are the Five Pillars of Islam and why do they matter?","body":"<p>The pillars Shahada, Salah, Zakat, Sawm, and Hajj structure a Muslim\'s life around faith, worship, charity, fasting, and pilgrimage.</p>"},{"id":"islamic-pillars-2","title":"How can I memorize the pillars?","body":"<p>Repeat them aloud, relate each pillar to daily actions, and quiz yourself with friends or a study group.</p>"},{"id":"islamic-pillars-3","title":"Can I make up missed duties from the pillars?","body":"<p>Yes, missed prayers, fasts, or zakat can often be made up with sincere repentance and proper planning.</p>"},{"id":"islamic-pillars-4","title":"How do I balance the pillars with modern schedules?","body":"<p>Use reminders, combine worship with pauses in your day, and keep the intention that every effort is for Allah.</p>"},{"id":"islamic-pillars-5","title":"Are intentions part of fulfilling the pillars?","body":"<p>Absolutely each pillar must be performed with a sincere intention to obey Allah for it to count fully.</p>"}],"chapterId":3},{"chapter":"Islamic Quran","faqs":[{"id":"islamic-quran-1","title":"Should I read the Quran in Arabic or translation?","body":"<p>Prefer Arabic when possible, but use a translation to understand the meaning; both together deepen your connection.</p>"},{"id":"islamic-quran-2","title":"How do I get started with Quran recitation?","body":"<p>Begin with short surahs, learn basic pronunciation, and practice slowly with audio and a teacher if possible.</p>"},{"id":"islamic-quran-3","title":"What is a practical way to reflect on the Quran?","body":"<p>Read a verse, pause to ponder its meaning, write a reflection, and apply it to your life that day.</p>"},{"id":"islamic-quran-4","title":"How do I memorize the Quran when I\'m busy?","body":"<p>Set aside a few minutes daily, repeat small portions, and revise even smaller sections to build consistency.</p>"},{"id":"islamic-quran-5","title":"How can I protect my Quran study from distractions?","body":"<p>Study in a quiet space, disconnect from other screens, and set a gentle timer to honor your commitment.</p>"}],"chapterId":4},{"chapter":"Islamic Prophet","faqs":[{"id":"islamic-prophet-1","title":"Who is the Prophet Muhammad (peace be upon him)?","body":"<p>He is the final messenger of Allah, sent with mercy to teach Islam and exemplify compassionate conduct.</p>"},{"id":"islamic-prophet-2","title":"How can I learn about his life?","body":"<p>Read authentic Seerah books or listen to trustworthy lectures that focus on his character, struggles, and guidance.</p>"},{"id":"islamic-prophet-3","title":"Why do Muslims send blessings upon him?","body":"<p>Because Allah commanded it as a sign of love, and sending blessings brings peace to the heart and rewards.</p>"},{"id":"islamic-prophet-4","title":"What lessons from his life help new Muslims?","body":"<p>His patience, humility, prioritizing justice, and kindness toward others provide a blueprint for daily conduct.</p>"},{"id":"islamic-prophet-5","title":"How do I share his mercy with others?","body":"<p>Show compassion, speak the truth gently, and support others so they experience the same hope he taught.</p>"}],"chapterId":5},{"chapter":"Islamic Prayers","faqs":[{"id":"islamic-prayers-1","title":"How many daily prayers are there?","body":"<p>Muslims pray five times each day to stay connected to Allah and punctuate the day with remembrance.</p>"},{"id":"islamic-prayers-2","title":"What is wudu and why is it required?","body":"<p>Wudu is a ritual purification that prepares your body and mind for direct conversation with Allah.</p>"},{"id":"islamic-prayers-3","title":"What do I do if I miss a prayer?","body":"<p>Make it up as soon as you remember with sincerity, and ask Allah to help you stay punctual going forward.</p>"},{"id":"islamic-prayers-4","title":"How can I stay focused during prayer?","body":"<p>Clear your space, slow down your movements, understand what you are saying, and pray with full intention.</p>"},{"id":"islamic-prayers-5","title":"Can I pray alone when there is no mosque nearby?","body":"<p>Yes, prayer is valid anywhere you have purity, a clean space, and devotion, so carry it with you.</p>"}],"chapterId":6},{"chapter":"Islamic Manners","faqs":[{"id":"islamic-manners-1","title":"What is Islamic etiquette?","body":"<p>It means speaking gently, smiling, respecting elders, keeping promises, and serving others with humility.</p>"},{"id":"islamic-manners-2","title":"How should I greet people?","body":"<p>Say \'As-salamu alaykum\' sincerely, shake hands or offer a kind gesture, and ask about their well-being.</p>"},{"id":"islamic-manners-3","title":"How can I practice patience and gratitude daily?","body":"<p>Count your blessings, pause before reacting, and remind yourself that trials build patience.</p>"},{"id":"islamic-manners-4","title":"What does guarding the tongue and gaze look like?","body":"<p>Speak truthfully, avoid gossip, and steer your eyes toward what is pure and respectful.</p>"},{"id":"islamic-manners-5","title":"How do I balance cultural habits with Islamic behavior?","body":"<p>Keep what aligns with Islamic morals, gently release what doesn\'t, and explain your choices with kindness.</p>"}],"chapterId":7},{"chapter":"Islamic Lifestyle","faqs":[{"id":"islamic-lifestyle-1","title":"What makes a lifestyle Islamic?","body":"<p>An Islamic lifestyle centers on halal food, honest work, regular worship, and compassion for others.</p>"},{"id":"islamic-lifestyle-2","title":"How can I prepare halal meals easily?","body":"<p>Plan meals ahead, buy certified ingredients, and share with friends so you can keep it fun.</p>"},{"id":"islamic-lifestyle-3","title":"Should I avoid certain entertainment?","body":"<p>Choose media that uplifts you, avoids immorality, and strengthens your faith, not weakens it.</p>"},{"id":"islamic-lifestyle-4","title":"How do I maintain modesty in dress and behavior?","body":"<p>Dress in a way that feels comfortable yet modest, lower your gaze, and carry yourself with dignity.</p>"},{"id":"islamic-lifestyle-5","title":"How can I add Sunnah routines to my day?","body":"<p>Start with the Prophet’s habits like drinking water in three sips, greeting others, and saying the short morning dhikr.</p>"}],"chapterId":8},{"chapter":"Islamic Community","faqs":[{"id":"islamic-community-1","title":"Why is community important in Islam?","body":"<p>The ummah reminds us we are not alone, and helping others multiplies rewards.</p>"},{"id":"islamic-community-2","title":"How can I find a supportive Muslim community?","body":"<p>Attend local events, join study circles, and reach out to online groups that match your interests.</p>"},{"id":"islamic-community-3","title":"What if I feel isolated from my community?","body":"<p>Volunteer, invite neighbors for coffee, or start a small circle where you can learn together.</p>"},{"id":"islamic-community-4","title":"How do I build bridges with non-Muslim neighbors?","body":"<p>Share kindness, listen to their stories, and explain your faith through actions more than words.</p>"},{"id":"islamic-community-5","title":"What is my role when someone in the community needs help?","body":"<p>Offer practical support, make dua for them, and encourage others to join you in lifting them up.</p>"}],"chapterId":9},{"chapter":"Islamic Future","faqs":[{"id":"islamic-future-1","title":"What does Islam say about planning for the future?","body":"<p>Islam teaches us to plan responsibly, rely on Allah, and ask for guidance in every decision.</p>"},{"id":"islamic-future-2","title":"How can I set goals guided by Islamic values?","body":"<p>Make goals that benefit your soul, family, and community, then tie them with du\'a and consistent effort.</p>"},{"id":"islamic-future-3","title":"Is it okay to dream big while staying humble?","body":"<p>Yes, Islam encourages excellence when coupled with gratitude and the reminder that Allah controls outcomes.</p>"},{"id":"islamic-future-4","title":"How do I guard against anxiety about tomorrow?","body":"<p>Remember Allah’s mercy, practice dhikr, and break tasks into small steps so you can breathe between plans.</p>"},{"id":"islamic-future-5","title":"How can I leave a positive legacy?","body":"<p>Share beneficial knowledge, instill good habits in others, and support causes that outlive you.</p>"}],"chapterId":10},{"chapter":"Islamic Hereafter","faqs":[{"id":"islamic-hereafter-1","title":"What is the concept of the Hereafter?","body":"<p>The Hereafter includes resurrection, judgment, reward, and consequences based on how we lived.</p>"},{"id":"islamic-hereafter-2","title":"How can I prepare for the Day of Judgment?","body":"<p>Repent sincerely, perform good deeds, and keep your intentions pure for Allah’s pleasure.</p>"},{"id":"islamic-hereafter-3","title":"Why is accountability important?","body":"<p>Knowing that Allah sees every action reminds us to choose kindness and avoid harm.</p>"},{"id":"islamic-hereafter-4","title":"What happens between death and resurrection?","body":"<p>Believers enter Barzakh, a waiting period where the soul experiences comfort or warning until the final day.</p>"},{"id":"islamic-hereafter-5","title":"How does remembrance of the Hereafter change my actions?","body":"<p>It shifts your focus from temporary gains to actions that benefit the soul and others in the long run.</p>"}],"chapterId":11},{"chapter":"Islamic Paradise and Hell","faqs":[{"id":"islamic-paradise-hell-1","title":"What do we know about Paradise and Hell?","body":"<p>The Quran and Sunnah describe Paradise as gardens with rivers, and Hell as a place of purification or punishment for wrongdoing.</p>"},{"id":"islamic-paradise-hell-2","title":"How can I strive for Paradise?","body":"<p>Perform good deeds, seek forgiveness, serve others, and keep your heart soft with gratitude.</p>"},{"id":"islamic-paradise-hell-3","title":"Can Allah forgive any sin?","body":"<p>Yes, Allah forgives all sins when you turn to Him with sincere repentance and resolve not to return.</p>"},{"id":"islamic-paradise-hell-4","title":"What kind of people does the Quran mention as entering Paradise?","body":"<p>Those who are humble, patient, charitable, truthful, and who call others to good with wisdom are promised mercy.</p>"},{"id":"islamic-paradise-hell-5","title":"How do I avoid actions that lead to Hell?","body":"<p>Stay away from major sins, guard your tongue, keep your prayers, and seek Allah’s help when temptation arrives.</p>"}],"chapterId":12},{"chapter":"Islamic Dua Dhkir","faqs":[{"id":"islamic-dua-dhikr-1","title":"What is the difference between dua and dhikr?","body":"<p>Dua is asking Allah for something, while dhikr is remembering Him through phrases of praise and gratitude.</p>"},{"id":"islamic-dua-dhikr-2","title":"When should I make dua and dhikr?","body":"<p>Any time! After prayers, during moments of need, while waking up, or before sleeping Allah loves those who remember Him.</p>"},{"id":"islamic-dua-dhikr-3","title":"How do I memorize a dua?","body":"<p>Repeat it often, write it down, understand its meaning, and attach it to daily moments so it becomes natural.</p>"},{"id":"islamic-dua-dhikr-4","title":"What are short dhikr phrases I can say daily?","body":"<p>Try \'SubhanAllah\', \'Alhamdulillah\', \'Allahu Akbar\', and \'La ilaha illa Allah\' after prayers and during breaks.</p>"},{"id":"islamic-dua-dhikr-5","title":"Can I ask Allah for personal needs while doing dhikr?","body":"<p>Yes, mix praise with personal requests; Allah loves to hear you speak to Him sincerely.</p>"}],"chapterId":13},{"chapter":"Islamic Family and Marriage","faqs":[{"id":"islamic-family-1","title":"What does Islam say about family ties?","body":"<p>Maintaining kinship, honoring parents, and supporting relatives are major sources of blessing.</p>"},{"id":"islamic-family-2","title":"How do I seek a spouse according to Islamic principles?","body":"<p>Look for piety, character, and mutual compatibility while involving family and keeping intentions pure.</p>"},{"id":"islamic-family-3","title":"What are the rights of spouses in Islam?","body":"<p>Mutual respect, clear communication, financial fairness, and emotional support are emphasized in every marriage.</p>"},{"id":"islamic-family-4","title":"How can parents support a new Muslim in marriage?","body":"<p>Encourage learning, allow space for spiritual growth, and remind them that Allah’s mercy covers every step.</p>"},{"id":"islamic-family-5","title":"How do I raise children with Islamic values?","body":"<p>Model kindness, teach dua, read Quran together, and celebrate small victories as families grow.</p>"}],"chapterId":14},{"chapter":"Islamic Heart","faqs":[{"id":"islamic-heart-1","title":"What does it mean to purify the heart?","body":"<p>Purifying the heart means removing envy, hatred, and arrogance while growing sincerity, love, and fear of Allah.</p>"},{"id":"islamic-heart-2","title":"How can I keep my heart soft toward Allah?","body":"<p>Recite Quran, make dua, associate with gentle people, and ponder Allah’s mercy regularly.</p>"},{"id":"islamic-heart-3","title":"What signs show a heart is spiritually healthy?","body":"<p>Patience in trials, gratitude in ease, and humility in success are healthy-heart indicators.</p>"},{"id":"islamic-heart-4","title":"How do I deal with sadness or emptiness in my heart?","body":"<p>Reach out to supportive people, increase dhikr, and remember Allah’s plan is wise even when you feel lost.</p>"},{"id":"islamic-heart-5","title":"What does reliance on Allah look like for the heart?","body":"<p>A heart that trusts Allah accepts what happens, stays hopeful for goodness, and keeps working without despair.</p>"}],"chapterId":15}]');

/***/ }),

/***/ "./resources/js/components/data/homework.json":
/*!****************************************************!*\
  !*** ./resources/js/components/data/homework.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"homework":["Spend 10 minutes reflecting on what Tawheed means for your daily decisions.","Journal three moments when you were tempted to compromise and how Tawheed can anchor you.","Share one insight with a study partner or mentor and ask for their perspective.","Memorize one dua from today\'s lesson and repeat it before sleep."]},{"chapterId":2,"homework":["Recite the Shahada slowly 20 times, contemplating each word.","List five actions you can remove this week that distract from worship.","Listen to a trusted lecture about the Articles of Faith and summarize it.","Practice dua before every salah asking for increased iman."]},{"chapterId":3,"homework":["Track your five daily prayers for seven days in a notebook.","Teach a family member one pillar of prayer this week.","Focus on wudu etiquette before each prayer today.","Read about a sahabi known for prayer and note their discipline."]},{"chapterId":4,"homework":["Review the names of Allah mentioned in the chapter and pick three to memorize.","Write a short reflection on how revelation changes your perspective.","Recite one ayah from the Quran with translation each day.","Visit a recitation circle or watch a tafsir for deeper context."]},{"chapterId":5,"homework":["Pick a hadith about the Prophet ﷺ and journal what it teaches you.","Memorize the short biography of the Prophet from the lesson.","Share a story from the Prophet’s life with someone and ask for their take.","Set a reminder to read one paragraph from the Seerah every evening."]},{"chapterId":6,"homework":["Create a dua list for each prayer time and rotate through it daily.","Record today’s salah start to finish and note improvements.","Pair up with a friend to encourage consistency in prayer.","Compile five reminders that keep you mindful of Allah during the day."]},{"chapterId":7,"homework":["Serve someone in your community with a small act of kindness.","Reflect on gratitude and list three people you can thank this week.","Practice patience when you feel short-tempered and note triggers.","Practice forgiveness and write a dua asking for a soft heart."]},{"chapterId":8,"homework":["Audit your media: delete or limit one thing that pulls you away from focus.","Set a weekly halal goal (e.g., meal prep, call a relative, read).","Plan one intentional moment of silence to reconnect with Allah.","Choose a healthy habit for the body and soul (fasting, charity, etc.)."]},{"chapterId":9,"homework":["Attend a local community event or share a helpful resource.","Reach out to support someone who needs a listening ear.","Organize a short session to practice dua and reminders together.","Volunteer one hour for your neighborhood or mosque."]},{"chapterId":10,"homework":["Plan a personal growth tracker for the next 30 days.","Write a dua asking for consistent growth and review it nightly.","Choose one area (worship, character, knowledge) and set micro-goals.","Reflect on progress each Friday and note lessons learned."]},{"chapterId":11,"homework":["Journal what a reminder of the Hereafter shifts for your priorities.","Perform muhasabah for three nights, noting gratitude and actions to improve.","Give charity with the intention of gaining extended reward after passing.","Share a dua for mercy on the Day of Judgment with someone you trust."]},{"chapterId":12,"homework":["Visualize Paradise while reciting a verse, then jot down how it felt.","Read a Quranic warning of Hell and list three actions you will avoid.","Ask Allah for protection from the Fire after each prayer for one week.","Invite a friend to discuss what motivates you about the hereafter."]},{"chapterId":13,"homework":["Memorize one short dua and explain its meaning to someone else.","Make a daily dhikr plan tied to waking, meals, and sleep.","Record the names of Allah you repeat most and why they matter.","Share a dua with another person and ask them to pray for you."]},{"chapterId":14,"homework":["Host a family circle that includes dua, gratitude, and salah talk.","Write down two ways to show mercy to each household member this week.","Plan an act of service for a relative or parent with sincerity.","Teach a short hadith about kindness to your family."]},{"chapterId":15,"homework":["Perform soft-hearted dhikr for five minutes before bedtime each night.","List one habit to remove pride and replace it with humility.","Do a compassion check: reach out to someone you’ve been distant with.","Write a gratitude letter framed around Allah’s blessings."]}]');

/***/ }),

/***/ "./resources/js/components/data/keyInsights.json":
/*!*******************************************************!*\
  !*** ./resources/js/components/data/keyInsights.json ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"chapter":"The Foundation: Tawheed – The Eternal Truth That Created You and Will Resurrect You","keyInsights":["The foundation supports every future habit.","Small acts of sincerity multiply immensely.","Daily reminders keep the heart soft.","Teach what you learn to lock it in.","Authentic conviction beats temporary motivation."]},{"chapterId":2,"chapter":"The Beliefs: The Six Pillars of Iman – Your Invisible Reality Stronger Than Steel","keyInsights":["The foundation supports every future habit.","Small acts of sincerity multiply immensely.","Daily reminders keep the heart soft.","Teach what you learn to lock it in.","Authentic conviction beats temporary motivation."]},{"chapterId":3,"chapter":"The Pillars: The Five Pillars – Your Direct Phone Line to Allah","keyInsights":["The foundation supports every future habit.","Small acts of sincerity multiply immensely.","Daily reminders keep the heart soft.","Teach what you learn to lock it in.","Authentic conviction beats temporary motivation."]},{"chapterId":4,"chapter":"The Quran: Heartbeat of Revelation and Living Library","keyInsights":["The Quran never grows old; revisit it with fresh eyes.","Reflecting once extends its effect a lifetime.","Tajweed is respect more than a rule.","Action multiplies the reward of every ayah.","Every verse is a dua waiting to be answered."]},{"chapterId":5,"chapter":"The Prophet: Muhammad ﷺ, Mirror of Mercy","keyInsights":["Mercy is the fragrance he left everywhere.","Gentleness wins what force never will.","Rest is part of leadership, not a luxury.","He turned every trial into dua.","Consistency beats a grand but short-lived effort."]},{"chapterId":6,"chapter":"The Prayer: Salah as Your Soul\'s Sync","keyInsights":["Prayer resets what panic steals.","Sujood is the soul\'s favourite posture.","Fajr seeds the day\'s energy.","Consistency breeds courage.","Prayer disciplines time itself."]},{"chapterId":7,"chapter":"The Manners: Adab That Elevates Every Encounter","keyInsights":["Good manners invite Allah\'s mercy.","Gentle speech wins hearts.","Adab is silent da\'wah.","Consistency rewrites culture.","Service humbles the soul."]},{"chapterId":8,"chapter":"The Lifestyle: Halal Living, Habits, and Harmony","keyInsights":["Halal choices shield your heart.","Rest is fuel, not laziness.","Simplicity invites creativity.","Mindful meals raise gratitude.","Discipline invites barakah."]},{"chapterId":9,"chapter":"The Community: Building Ummah, Support, and Uplift","keyInsights":["Shared meals nourish hearts.","Service multiplies iman.","Mentorship keeps wisdom alive.","Compassion is contagious.","Consistency builds trust."]},{"chapterId":10,"chapter":"The Future: Continuous Growth and Legacy","keyInsights":["Consistency compounds like interest.","Legacy is service, not prize.","Vision paired with dua outruns fear.","Documenting progress keeps you accountable.","Hope in Allah outlives discomfort."]},{"chapterId":11,"chapter":"Hereafter Realities Death, Resurrection, and Mercy","keyInsights":["Remembering the grave rewires our priorities toward meaningful actions.","Every deed carries weight on the Day of Judgment; intentions matter more than appearances.","Sadaqah and dua can continue rewarding you after you leave this world.","Hope in Allah\'s mercy keeps the heart from despair even when accountability feels heavy.","Consistent muhasabah is the compass that keeps you on the straight path."]},{"chapterId":12,"chapter":"Paradise and Hell Rewards, Warnings, and Motivation","keyInsights":["Paradise is as real as the hope you nurture in your dua.","Hell serves as a necessary boundary that sharpens your covenant with Allah.","Balance gratitude with caution so hope doesn\'t turn into complacency.","Visual reminders of Jannah and Jahannam make daily choices meaningful.","Supplications requesting Paradise and refuge from fire keep the heart soft."]},{"chapterId":13,"chapter":"Dua and Dhikr, Weapons of the Heart","keyInsights":["Dua strengthens the bond between you and Allah more than any ritual.","Dhikr is a shield that keeps your heart calm during stress.","Combining dua with gratitude invites more blessings.","Consistency builds a vocabulary of surrender and hope.","Sharing dhikr habits multiplies the reward and accountability."]},{"chapterId":14,"chapter":"Family, Marriage, Mercy, Dialogue and Legacy","keyInsights":["Mercy and patience are more foundational than compatibility alone.","Shared dua keeps hearts aligned even during disagreements.","Teaching children manners requires modeling, not just commands.","Family unity flows from dialog, respect, and forgiveness.","Kinship ties are a trust care for them with actionable love."]},{"chapterId":15,"chapter":"Purifying the Heart softness, Humility and Focus","keyInsights":["A purified heart changes every external routine into worship.","Envy and pride fade when you celebrate others and thank Allah.","Self-accounting keeps your focus on the straight path.","Softness comes through consistent dhikr, dua, and service.","Reliance on Allah steadies the heart amid trials."]}]');

/***/ }),

/***/ "./resources/js/components/data/missions.json":
/*!****************************************************!*\
  !*** ./resources/js/components/data/missions.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"1":"Memorize the meaning of the Shahada in your native language.","2":"Look at the sky tonight and reflect on the Creator\'s power.","3":"Learn the names of the 5 daily prayers.","4":"Listen to Surah Al-Fatiha with translation.","5":"Read one story about the Prophet\'s kindness.","6":"Practice the Wudu steps at your sink without water first.","7":"Greet 3 people with \'Assalamu Alaikum\' today.","8":"Check the ingredients of your favorite snack.","9":"Find one local mosque on Google Maps.","10":"Make a list of 3 goals for your next month."}');

/***/ }),

/***/ "./resources/js/components/data/onboarding.json":
/*!******************************************************!*\
  !*** ./resources/js/components/data/onboarding.json ***!
  \******************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"steps":[{"title":"Meet the Foundations","description":"Slowly read each section so the names of Allah, the Shahada, and the meanings sink in."},{"title":"Capture a Dua","description":"Repeat or write down a dua shared in the lesson to keep the words close."},{"title":"Practice the quiz","description":"Answer two questions correctly to prove the lesson is alive in your heart."}]},{"chapterId":2,"steps":[{"title":"Slow the read","description":"Note how each article of faith connects to Allah’s mercy and plan for you."},{"title":"Share a truth","description":"Speak one insight aloud or teach it to someone you trust."},{"title":"Try the quiz","description":"Two right answers mean you’re ready to take the next step."}]},{"chapterId":3,"steps":[{"title":"Feel the rhythm","description":"Track each pillar and imagine how it fits into your daily life."},{"title":"Practice gratitude","description":"Say a short thanks for one pillar as you recite the dua."},{"title":"Answer the quiz","description":"Two correct replies unlock the next chapter."}]},{"chapterId":4,"steps":[{"title":"Embrace revelation","description":"Breathe while you read about the Quran and let its guidance calm you."},{"title":"Write the words","description":"Copy a verse or reminder to keep practicing."},{"title":"Take the quiz","description":"Two right answers show the message is sticking."}]},{"chapterId":5,"steps":[{"title":"Follow the Sunnah","description":"Read the stories of the Prophet ﷺ in the sections provided."},{"title":"Repeat a lesson","description":"Describe one habit you will apply today."},{"title":"Quiz gently","description":"Answer two questions and celebrate the correct choices."}]},{"chapterId":6,"steps":[{"title":"Feel the prayer","description":"Picture yourself in each step of Salah while you read."},{"title":"Soft reminder","description":"Share a dua for ease before the next prayer."},{"title":"Test with care","description":"Two correct quiz answers let you move forward."}]},{"chapterId":7,"steps":[{"title":"Open your heart","description":"Let the manners shine through every paragraph."},{"title":"Speak kindly","description":"Repeat one kind action you will practice."},{"title":"Quiz & move","description":"Answer two questions correctly to unlock the next chapter."}]},{"chapterId":8,"steps":[{"title":"Decide halal","description":"Let each section show you what is pure and peaceful."},{"title":"Make a vow","description":"Choose one small habit to keep halal today."},{"title":"Answer the quiz","description":"Two correct answers mean you understand this lesson."}]},{"chapterId":9,"steps":[{"title":"Remember community","description":"See how support and unity glow across the chapters."},{"title":"Show care","description":"Plan one small way to help someone near you."},{"title":"Quiz joyfully","description":"Two correct replies unlock the next chapter."}]},{"chapterId":10,"steps":[{"title":"Dream forward","description":"Read how continual growth keeps you steady."},{"title":"Set intent","description":"Pick one action that moves you toward the future."},{"title":"Complete the quiz","description":"Two correct answers mean the journey continues."}]}]');

/***/ }),

/***/ "./resources/js/components/data/premiumResources.json":
/*!************************************************************!*\
  !*** ./resources/js/components/data/premiumResources.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"title":"Islamic Resource Library","desc":"A searchable portal of websites, houses of knowledge, and scholarly write-ups.","href":"https://example.com/resource-library"},{"title":"Guided YouTube Series","desc":"Synchronized playlists covering each pillar with tajweed, tafsir, and scenario practice.","href":"https://www.youtube.com/playlist?list=PLpremium"},{"title":"Articles & Reflections","desc":"Monthly essays that turn complex aqeedah topics into relatable stories.","href":"https://example.com/articles"},{"title":"Essential Bookshelf","desc":"Downloadable PDFs and print-ready guides for their most transformative chapters.","href":"https://example.com/bookshelf"}]');

/***/ }),

/***/ "./resources/js/components/data/quizzes.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/quizzes.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"questions":[{"question":"Which statement is the Shahada?","options":["La ilaha illa Allah","Allahu Akbar","Subhan Allah","Bismillah"],"answer":"La ilaha illa Allah"},{"question":"Tawheed al-Rububiyyah affirms which fact about Allah?","options":["His Lordship over creation","His reward","His prophets","His angels"],"answer":"His Lordship over creation"},{"question":"Tawheed al-Uluhiyyah insists that worship belongs to?","options":["Allah alone","Prophets","Saints","Nature"],"answer":"Allah alone"},{"question":"Belief in Allah\'s names and attributes is called?","options":["Tawheed al-Asma wa Sifat","Tawheed al-Rububiyyah","Tawheed al-Uluhiyyah","Shirk"],"answer":"Tawheed al-Asma wa Sifat"},{"question":"Which act contradicts Tawheed?","options":["Worshiping idols","Fasting","Giving charity","Praying on time"],"answer":"Worshiping idols"},{"question":"What does the Arabic word \'shirk\' mean?","options":["Associating partners with Allah","Studying the Quran","Helping parents","Giving charity"],"answer":"Associating partners with Allah"},{"question":"Reciting the Shahada daily helps a believer to?","options":["Keep Allah\'s oneness present","Gain wealth quickly","Avoid talking to others","Win every argument"],"answer":"Keep Allah\'s oneness present"},{"question":"The primordial covenant taught that souls testified to?","options":["Allah\'s oneness","Worldly success","Family ties","Social media fame"],"answer":"Allah\'s oneness"},{"question":"Which habit protects Tawheed in day to day life?","options":["Sincere dua to Allah alone","Gossiping about friends","Ignoring prayer","Competitiveness"],"answer":"Sincere dua to Allah alone"},{"question":"Tawheed urges us to rely on Allah instead of?","options":["Created beings","The Quran","Prophets","Our parents"],"answer":"Created beings"},{"question":"Which Quranic verse begins with a call to remember Allah\'s oneness?","options":["Qul Huwa Allahu Ahad","Al-Fatiha","Yaseen","An-Nas"],"answer":"Qul Huwa Allahu Ahad"},{"question":"To guard Tawheed, Muslims avoid giving divine attributes to?","options":["Human idols","Books","Mosques","Angels"],"answer":"Human idols"},{"question":"Which action shows belief in Allah\'s attributes?","options":["Reciting the Names of Allah","Watching TV","Sleeping late","Eating fast food"],"answer":"Reciting the Names of Allah"},{"question":"Under Tawheed, which description applies only to Allah?","options":["Creator","Teacher","Neighbor","Friend"],"answer":"Creator"},{"question":"What should the intention be before every act of worship to keep Tawheed alive?","options":["For Allah\'s pleasure","To impress people","To gain fame","To compete with others"],"answer":"For Allah\'s pleasure"},{"question":"Which attitude best demonstrates Tawheed when making decisions?","options":["Seeking Allah\'s guidance","Following rumors","Ignoring prayer","Copying friends"],"answer":"Seeking Allah\'s guidance"},{"question":"Tawakkul refers to.","options":["Trusting Allah","Speaking loudly","Showing off","Competing with others"],"answer":"Trusting Allah"},{"question":"Renewing your intention before worship keeps focus on.","options":["Allah","People","Wealth","Entertainment"],"answer":"Allah"},{"question":"To avoid shirk, we should never attribute Allah\'s  to others.","options":["Attributes","Stories","Jobs","Debts"],"answer":"Attributes"},{"question":"When fear arises, Tawheed reminds us to rely on.","options":["Allah","Luck","Popularity","Money"],"answer":"Allah"}]},{"chapterId":2,"questions":[{"question":"Belief in Allah is which article of faith?","options":["First","Second","Third","Fourth"],"answer":"First"},{"question":"Belief in divine decree (Qadar) corresponds to which article?","options":["Second","First","Third","Fifth"],"answer":"Second"},{"question":"Belief in the revealed books is which article?","options":["Third","Fourth","First","Sixth"],"answer":"Third"},{"question":"Belief in prophets is which article?","options":["Fifth","Fourth","Second","Third"],"answer":"Fifth"},{"question":"Belief in angels is which article?","options":["Fourth","First","Second","Third"],"answer":"Fourth"},{"question":"Belief in the Day of Judgment is which article?","options":["Sixth","Fifth","Fourth","Second"],"answer":"Sixth"},{"question":"Which of the following is a revealed book?","options":["Quran","Epic poem","Novel","Myth"],"answer":"Quran"},{"question":"The Quran was revealed to which prophet?","options":["Muhammad (peace be upon him)","Moses","Jesus","Noah"],"answer":"Muhammad (peace be upon him)"},{"question":"Angels are created from what?","options":["Light","Fire","Water","Clay"],"answer":"Light"},{"question":"Divine decree reminds believers that Allah controls every.","options":["Event","Feeling","Emotion","Memory"],"answer":"Event"},{"question":"Prophets came to deliver Allah\'s.","options":["Message","Business plan","Political idea","Movie"],"answer":"Message"},{"question":"Belief in the unseen includes trusting in which of these?","options":["Angels","Computers","Mountains","Buildings"],"answer":"Angels"},{"question":"Which of these books came before the Quran?","options":["Torah","Dictionary","Comic","Novel"],"answer":"Torah"},{"question":"Belief that Allah rewards good deeds gives hope for.","options":["Paradise","Gold","Travel","Fame"],"answer":"Paradise"},{"question":"Belief in Allah means submitting to His.","options":["Will","Hobby","Neighbor","Story"],"answer":"Will"},{"question":"Belief in the unseen includes trusting Allah knows our  before we act.","options":["Intentions","Outfits","Weather","Sports"],"answer":"Intentions"},{"question":"Divine decree encourages patience with  that Allah allows.","options":["Trials","Movies","Gossip","Shopping"],"answer":"Trials"},{"question":"Revealed books keep believers focused on Allah\'s.","options":["Guidance","Wealth","Noise","Fame"],"answer":"Guidance"},{"question":"Prophets came to invite people to.","options":["Allah","Power","Wealth","Sports"],"answer":"Allah"},{"question":"Remembering the Day of Judgment helps guard our.","options":["Actions","Sleeping","Shopping","Screens"],"answer":"Actions"}]},{"chapterId":3,"questions":[{"question":"How many pillars of Islam are there?","options":["Five","Six","Four","Seven"],"answer":"Five"},{"question":"Which pillar is the declaration of faith?","options":["Shahada","Salah","Zakat","Sawm"],"answer":"Shahada"},{"question":"Which pillar is the five daily prayers?","options":["Salah","Zakat","Hajj","Shahada"],"answer":"Salah"},{"question":"Which pillar gives a portion of wealth to the needy?","options":["Zakat","Sawm","Hijrah","Hajj"],"answer":"Zakat"},{"question":"Which pillar involves fasting during Ramadan?","options":["Sawm","Zakat","Salah","Hajj"],"answer":"Sawm"},{"question":"Which pillar is the pilgrimage to Makkah?","options":["Hajj","Shahada","Salah","Zakat"],"answer":"Hajj"},{"question":"Zakat is primarily intended for which group?","options":["The poor and needy","Scholars","Kings","Visitors"],"answer":"The poor and needy"},{"question":"Which pillar may be performed only once if a Muslim is able?","options":["Hajj","Salah","Zakat","Sawm"],"answer":"Hajj"},{"question":"Which Surah is recited in every rak\'ah of prayer?","options":["Al-Fatiha","Yaseen","Al-Kawthar","Al-Ikhlas"],"answer":"Al-Fatiha"},{"question":"The fast of Ramadan begins at what time of day?","options":["Fajr","Dhuhr","Asr","Maghrib"],"answer":"Fajr"},{"question":"Which purification is done before Salah?","options":["Wudu","Ghusl","Qurbani","Zakat"],"answer":"Wudu"},{"question":"The call to prayer is called?","options":["Adhan","Salam","Takbir","Dua"],"answer":"Adhan"},{"question":"Giving zakat purifies a Muslim\'s.","options":["Wealth","Speech","Sleep","Travel"],"answer":"Wealth"},{"question":"Fasting during Ramadan teaches believers.","options":["Self-discipline","Greed","Laziness","Rudeness"],"answer":"Self-discipline"},{"question":"The Shahada names Muhammad (peace be upon him) as what?","options":["Messenger of Allah","King of Arabs","Scribe","Soldier"],"answer":"Messenger of Allah"},{"question":"The day pilgrims stand at Arafat during Hajj is called the Day of.","options":["Arafah","Eid","Ashura","Mawlid"],"answer":"Arafah"},{"question":"Fasting Ramadan helps control  besides hunger.","options":["Anger","Travel","Homework","Noise"],"answer":"Anger"},{"question":"Taraweeh prayers follow the  prayer each Ramadan night.","options":["Isha","Fajr","Dhuhr","Maghrib"],"answer":"Isha"},{"question":"When wealth reaches the nisab, Muslims give.","options":["Zakat","Salah","Sawm","Dua"],"answer":"Zakat"},{"question":"Salah anchors the believer\'s heart to.","options":["Allah","Leaders","Money","Friends"],"answer":"Allah"}]},{"chapterId":4,"questions":[{"question":"The Quran was revealed to whom?","options":["Muhammad (peace be upon him)","Moses","Jesus","Abraham"],"answer":"Muhammad (peace be upon him)"},{"question":"Which angel brought the revelation of the Quran?","options":["Jibril","Mikail","Israfil","Azrael"],"answer":"Jibril"},{"question":"The Quran is described as a book of.","options":["Guidance","Stories only","Songs","History of Europe"],"answer":"Guidance"},{"question":"Which Surah opens the Quran?","options":["Al-Fatiha","Al-Baqarah","An-Nas","Al-Ikhlas"],"answer":"Al-Fatiha"},{"question":"Which Surah begins with the word \'Iqra\' meaning \'Read\'?","options":["Al-Alaq","Al-Kawthar","An-Nas","Al-Masad"],"answer":"Al-Alaq"},{"question":"The Quran was revealed over how many years?","options":["Twenty three","Ten","Forty","Seven"],"answer":"Twenty three"},{"question":"Quranic recitation rules are called __?","options":["Tajweed","Hajj","Salah","Fasting"],"answer":"Tajweed"},{"question":"Reflecting deeply on Allah\'s words is known as ?","options":["Tadabbur","Tawbah","Zakat","Hajj"],"answer":"Tadabbur"},{"question":"The Quran was revealed in which language?","options":["Arabic","English","Persian","Urdu"],"answer":"Arabic"},{"question":"Which Surah is the shortest among these?","options":["Al-Ikhlas","Al-Baqarah","An-Nisa","Yunus"],"answer":"Al-Ikhlas"},{"question":"The Quran calls Allah Ar-Rahman, meaning?","options":["The Most Merciful","The Loud One","The Athlete","The Ruler of Birds"],"answer":"The Most Merciful"},{"question":"The word \'Quran\' literally means?","options":["Recitation","Book cover","Prayer mat","Lamp"],"answer":"Recitation"},{"question":"Who preserved the Quran in writing during the Prophet\'s lifetime?","options":["Scribes","Merchants","Soldiers","Poets"],"answer":"Scribes"},{"question":"The Quran invites believers to call upon Allah using His ?","options":["Names","Food","Movies","Music"],"answer":"Names"},{"question":"The Quran promises mercy to those who do what?","options":["Believe and act","Ignore the message","Take wealth only for self","Hoard food"],"answer":"Believe and act"},{"question":"Which Surah describes Allah as the Light of the heavens and earth?","options":["An-Nur","Al-Fatiha","Yaseen","An-Nas"],"answer":"An-Nur"},{"question":"Who served as the Prophet\'s chief scribe for revelations?","options":["Zayd ibn Thabit","Abu Bakr","Umar","Ali"],"answer":"Zayd ibn Thabit"},{"question":"The Quran was revealed primarily in the month of.","options":["Ramadan","Shawwal","Muharram","Dhul-Hijjah"],"answer":"Ramadan"},{"question":"Believers show reverence before touching the Quran by performing.","options":["Wudu","Sleep","Eating","Shopping"],"answer":"Wudu"},{"question":"The Quran invites us to reflect on the  around us.","options":["Signs in creation","Movies","Jokes","Gossip"],"answer":"Signs in creation"}]},{"chapterId":5,"questions":[{"question":"Muhammad (peace be upon him) is known as the final ?","options":["Prophet","King","Scholar","Trader"],"answer":"Prophet"},{"question":"In which city was Prophet Muhammad born?","options":["Makkah","Medina","Jerusalem","Cairo"],"answer":"Makkah"},{"question":"The migration to Madina is called?","options":["Hijrah","Umrah","Hajj","Zakat"],"answer":"Hijrah"},{"question":"The life story of Prophet Muhammad is known as?","options":["Seerah","Hadith","Tafsir","Fiqh"],"answer":"Seerah"},{"question":"His companions are called?","options":["Sahaba","Mufassir","Qadis","Imams"],"answer":"Sahaba"},{"question":"Which title meant \'the trustworthy\'?","options":["Al-Amin","Al-Kabir","Al-Saud","Al-Wahid"],"answer":"Al-Amin"},{"question":"Where did he receive the first revelation?","options":["Cave of Hira","Cave of Thawr","Mount Sinai","Masjid al-Haram"],"answer":"Cave of Hira"},{"question":"Which mosque did he build first after migrating?","options":["Masjid Quba","Masjid al-Haram","Masjid Nabawi","Masjid al-Aqsa"],"answer":"Masjid Quba"},{"question":"Which battle was the first major victory for the Muslims?","options":["Badr","Uhud","Khandaq","Hunayn"],"answer":"Badr"},{"question":"Prophet Muhammad taught Muslims to be kind to?","options":["Neighbors","Strangers only","Only family","Only leaders"],"answer":"Neighbors"},{"question":"The Farewell Pilgrimage took place in?","options":["Makkah","Medina","Jerusalem","Taif"],"answer":"Makkah"},{"question":"He urged Muslims to speak the truth and keep what?","options":["Promises","Secrets","Wealth","Meals"],"answer":"Promises"},{"question":"Which group did he especially remind Muslims to care for?","options":["Orphans","Celebrities","Kings","Athletes"],"answer":"Orphans"},{"question":"He told the Ummah to hold fast to the rope of?","options":["Allah","Trade","War","Health"],"answer":"Allah"},{"question":"The Quran calls him a mercy to?","options":["The worlds","Only Arabs","Only kings","Only traders"],"answer":"The worlds"},{"question":"Before prophethood, the Prophet ﷺ earned a living as a.","options":["Trader","Farmer","Poet","Soldier"],"answer":"Trader"},{"question":"The Farewell Sermon emphasized justice and rights for.","options":["All people","Only the rich","Only leaders","Only soldiers"],"answer":"All people"},{"question":"Helping orphans is a sign of  in the Prophet\'s teaching.","options":["Mercy","Strength","Silence","Fame"],"answer":"Mercy"},{"question":"The Prophet ﷺ taught that the strong believer is the one who controls.","options":["Anger","Children","Money","Power"],"answer":"Anger"},{"question":"He asked the Ummah to follow the Quran and the.","options":["Sunnah","Laws","Stories","Games"],"answer":"Sunnah"}]},{"chapterId":6,"questions":[{"question":"How many daily prayers (Salah) are obligatory for Muslims?","options":["Five","Four","Three","Six"],"answer":"Five"},{"question":"Which prayer is performed at dawn?","options":["Fajr","Dhuhr","Asr","Maghrib"],"answer":"Fajr"},{"question":"Which prayer is performed after the sun passes its zenith?","options":["Dhuhr","Fajr","Maghrib","Isha"],"answer":"Dhuhr"},{"question":"Which prayer is performed late afternoon before sunset?","options":["Asr","Fajr","Isha","Dhuhr"],"answer":"Asr"},{"question":"Which prayer is performed just after sunset?","options":["Maghrib","Asr","Isha","Fajr"],"answer":"Maghrib"},{"question":"Which prayer is performed after nightfall?","options":["Isha","Fajr","Dhuhr","Maghrib"],"answer":"Isha"},{"question":"Which purification is performed before every Salah?","options":["Wudu","Zakat","Sawm","Hajj"],"answer":"Wudu"},{"question":"The call to prayer is known as?","options":["Adhan","Dua","Fajr","Khutbah"],"answer":"Adhan"},{"question":"Muslims face which city during prayer?","options":["Makkah","Medina","Jerusalem","Cairo"],"answer":"Makkah"},{"question":"Which movement includes bending at the waist while saying \'Subhana Rabbiyal Adheem\'?","options":["Ruku","Sujud","Qiyam","Tashahhud"],"answer":"Ruku"},{"question":"Which movement involves placing the forehead on the ground?","options":["Sujud","Ruku","Qiyam","Takbir"],"answer":"Sujud"},{"question":"Which Surah is recited in every rak\'ah of Salah?","options":["Al-Fatiha","Al-Baqarah","An-Nas","Al-Ikhlas"],"answer":"Al-Fatiha"},{"question":"What does the word \'Salah\' literally mean?","options":["Prayer","Friendship","Wealth","Knowledge"],"answer":"Prayer"},{"question":"The intention made before praying is called?","options":["Niyyah","Sadaqah","Tawbah","Hajj"],"answer":"Niyyah"},{"question":"Prophet Muhammad (peace be upon him) described prayer as what?","options":["Light","Darkness","Noise","Speed"],"answer":"Light"},{"question":"If someone misses a prayer, they should perform a  prayer.","options":["Qada","Jummah","Taraweeh","Eid"],"answer":"Qada"},{"question":"The congregational prayer held on Fridays is called.","options":["Jummah","Eid","Taraweeh","Tahajjud"],"answer":"Jummah"},{"question":"After Salah, Muslims send peace upon.","options":["The Prophet ﷺ","The Quran","The imam","The mosque"],"answer":"The Prophet ﷺ"},{"question":"During Salah, Muslims face the direction of the.","options":["Kaaba in Makkah","Medina","Jerusalem","Cairo"],"answer":"Kaaba in Makkah"},{"question":"The Takbir at the start of Salah begins with.","options":["Allahu Akbar","Alhamdulillah","SubhanAllah","Astaghfirullah"],"answer":"Allahu Akbar"}]},{"chapterId":7,"questions":[{"question":"What does \'Adab\' refer to in Islam?","options":["Good manners","Food","Wealth","Travel"],"answer":"Good manners"},{"question":"Being kind to neighbors is part of showing?","options":["Adab","Hajj","Sawm","Zakat"],"answer":"Adab"},{"question":"Forgiveness is greater than holding on to?","options":["Grudges","Joys","Knowledge","Food"],"answer":"Grudges"},{"question":"The Prophet (peace be upon him) said the best of you are those who are best to their?","options":["Families","Enemies","Animals","Wealth"],"answer":"Families"},{"question":"Listening carefully to others is an act of?","options":["Mercy","Speech","Silence","Prayer"],"answer":"Mercy"},{"question":"Keeping quiet when gossip begins is part of which behavior?","options":["Good manners","Competition","Pride","Sarcasm"],"answer":"Good manners"},{"question":"Which trait builds trust in the community?","options":["Honesty","Hoarding","Judging quickly","Noise"],"answer":"Honesty"},{"question":"A calm response during conflict shows?","options":["Patience","Anger","Haste","Silence"],"answer":"Patience"},{"question":"Which action protects relationships in the Ummah?","options":["Forgiveness","Criticism","Ignore","Dominate"],"answer":"Forgiveness"},{"question":"Which virtue multiplies kindness?","options":["Generosity","Selfishness","Hoarding","Indifference"],"answer":"Generosity"},{"question":"Charity increases which quality in the heart?","options":["Purity","Selfishness","Noise","Pride"],"answer":"Purity"},{"question":"How should Muslims respond when given a gift?","options":["Say \'Jazakallah\'","Remain silent","Refuse","Promise to pay"],"answer":"Say \'Jazakallah\'"},{"question":"Which of the following is not part of good manners?","options":["Gossip","Respect","Kindness","Truthfulness"],"answer":"Gossip"},{"question":"What is the best way to begin a conversation according to Sunnah?","options":["With \'Assalamu Alaikum\'","With a joke","With silence","With a critique"],"answer":"With \'Assalamu Alaikum\'"},{"question":"Greeting each other with \'Assalamu Alaikum\' spreads?","options":["Peace","Fear","Noise","Silence"],"answer":"Peace"},{"question":"Smiling at another Muslim counts as.","options":["Charity","Judgment","Silence","Noise"],"answer":"Charity"},{"question":"Keeping promises reflects  in Islam.","options":["Trustworthiness","Power","Money","Silence"],"answer":"Trustworthiness"},{"question":"When insulted, Muslims are taught to respond with.","options":["Goodness","Anger","Lies","Shouting"],"answer":"Goodness"},{"question":"Listening before speaking shows.","options":["Respect","Dominance","Silence","Fame"],"answer":"Respect"},{"question":"Forgiveness clears the heart of long held.","options":["Grudges","Peace","Joy","Sincerity"],"answer":"Grudges"}]},{"chapterId":8,"questions":[{"question":"What does \'halal\' mean?","options":["Permissible","Forbidden","Obvious","Complicated"],"answer":"Permissible"},{"question":"Which habit is part of a halal lifestyle?","options":["Eating permissible food","Ignoring zakat","Hoarding wealth","Gossiping"],"answer":"Eating permissible food"},{"question":"Islamic lifestyle encourages  in spending.","options":["Moderation","Excess","Waste","Hoarding"],"answer":"Moderation"},{"question":"Rest is considered  that helps worship feel fresh.","options":["Recharge","Waste","Luxury","Punishment"],"answer":"Recharge"},{"question":"Stewardship in Islam means caring for what?","options":["Resources and creation","Enemies","Fame","Chat groups"],"answer":"Resources and creation"},{"question":"Which food is not halal?","options":["Pork","Dates","Fish","Honey"],"answer":"Pork"},{"question":"Halal finance avoids charging.","options":["Interest","Knowledge","Prayers","Charity"],"answer":"Interest"},{"question":"A believer can audit which habits through a halal filter?","options":["Meals and entertainment","Movies only","Sports only","Travel alone"],"answer":"Meals and entertainment"},{"question":"Islamic lifestyle includes giving  to share blessings.","options":["Charity","Secrets","Criticism","Money only to relatives"],"answer":"Charity"},{"question":"Before major purchases, Muslims are reminded to ask if it brings.","options":["Barakah","Noise","Confusion","Chaos"],"answer":"Barakah"},{"question":"Digital detox hours help guard  time.","options":["Worship","Sleep","Exercise","Work"],"answer":"Worship"},{"question":"Islamic lifestyle teaches a healthy relationship with possessions by promoting.","options":["Detachment","Greed","Envy","Attachment"],"answer":"Detachment"},{"question":"Saying \'Alhamdulillah\' strengthens ?","options":["Gratitude","Noise","Anger","Demand"],"answer":"Gratitude"},{"question":"Which act is part of Islamic stewardship?","options":["Sharing resources","Keeping everything secret","Hoards hunger","Spreading rumors"],"answer":"Sharing resources"},{"question":"Contentment in life shows which attitude?","options":["Humility","Pride","Complaint","Indifference"],"answer":"Humility"},{"question":"Stewardship (khilafah) includes protecting the.","options":["Earth","Coins","Computers","Clothes"],"answer":"Earth"},{"question":"A halal lifestyle values purity in.","options":["Food and actions","Movies and gossip","Opinions and rumors","Competition and pride"],"answer":"Food and actions"},{"question":"Screen free time guards the hours dedicated to.","options":["Worship","Shopping","Sleeping","Movies"],"answer":"Worship"},{"question":"Halal entertainment avoids  influences.","options":["Immorality","Learning","Exercise","Prayers"],"answer":"Immorality"},{"question":"Using resources wisely demonstrates.","options":["Responsibility","Greed","Noise","Jealousy"],"answer":"Responsibility"}]},{"chapterId":9,"questions":[{"question":"What does \'Ummah\' mean?","options":["Community","Fasting","Prayer","Pilgrimage"],"answer":"Community"},{"question":"Community care includes helping?","options":["Neighbors","Strangers only","Enemies only","Siblings only"],"answer":"Neighbors"},{"question":"The strength of the Ummah depends on?","options":["Unity","Competition","Isolation","Selfishness"],"answer":"Unity"},{"question":"Jummah prayer strengthens?","options":["Community","Wealth","Pride","Silence"],"answer":"Community"},{"question":"What binds the Ummah together?","options":["Love of Allah","Fear","Division","War"],"answer":"Love of Allah"},{"question":"Supporting others often means giving them?","options":["Time","Criticism","Fear","Isolation"],"answer":"Time"},{"question":"Speaking calmly when conflicts arise protects?","options":["Relationships","Noise","Pride","Silence"],"answer":"Relationships"},{"question":"Sharing guidance builds what?","options":["Support","Greed","Pride","Silence"],"answer":"Support"},{"question":"Charity uplifts which part of people?","options":["Hearts","Tents","Houses","Noise"],"answer":"Hearts"},{"question":"Who should be welcomed into gatherings?","options":["New or marginalized people","Only wealthy people","Only leaders","Only family"],"answer":"New or marginalized people"},{"question":"Conflict resolution in the community starts with?","options":["Listening","Shouting","Ignoring","Arguing"],"answer":"Listening"},{"question":"Consistency in service builds what?","options":["Trust","Fear","Chaos","Silence"],"answer":"Trust"},{"question":"Offering food is a part of which community trait?","options":["Hospitality","Isolation","Division","Silence"],"answer":"Hospitality"},{"question":"Technology can help the Ummah by?","options":["Uniting across oceans","Dividing families","Promoting lies","Spreading fear"],"answer":"Uniting across oceans"},{"question":"A community journal helps track?","options":["Needs","Money only","Secrets","Weather"],"answer":"Needs"},{"question":"Welcoming neighbors shows  to the Ummah.","options":["Hospitality","Grace","Silence","Wealth"],"answer":"Hospitality"},{"question":"Sharing resources uplifts community.","options":["Strength","Fame","Silence","Competition"],"answer":"Strength"},{"question":"Before reacting in conflict, we should first.","options":["Listen","Shout","Leave","Ignore"],"answer":"Listen"},{"question":"Giving charity and dua increase community.","options":["Hope","Noise","Debt","Pressure"],"answer":"Hope"},{"question":"Joint supplication keeps the Ummah.","options":["Unified","Divided","Quiet","Tired"],"answer":"Unified"}]},{"chapterId":10,"questions":[{"question":"Continuous growth is achieved through ?","options":["Consistency","Drama","Isolation","Neglect"],"answer":"Consistency"},{"question":"The future belongs to those who.","options":["Prepare","Wait","Ignore","Criticize"],"answer":"Prepare"},{"question":"Legacy planning includes  for others.","options":["Service","Selfishness","Noise","Hoarding"],"answer":"Service"},{"question":"Documenting progress helps keep us.","options":["Accountable","Confused","Quiet","Passive"],"answer":"Accountable"},{"question":"Mentorship multiplies a believer\'s.","options":["Impact","Expense","Noise","Delay"],"answer":"Impact"},{"question":"Setting spiritual goals should include.","options":["Dua","Gossip","Fear","Silence"],"answer":"Dua"},{"question":"Reviewing goals weekly keeps  fresh.","options":["Focus","Pride","Wealth","Sleep"],"answer":"Focus"},{"question":"Hope in Allah fuels  for the future.","options":["Resilience","Complaint","Argument","Conflict"],"answer":"Resilience"},{"question":"A legacy project can include  that benefits others after you pass.","options":["Sadaqah jariyah","Discounts","Stories","Debt"],"answer":"Sadaqah jariyah"},{"question":"Final success depends on \'s approval.","options":["Allah","Neighbors","Media","Employees"],"answer":"Allah"},{"question":"Reflection and dua help maintain.","options":["Growth","Leisure","Distraction","Fear"],"answer":"Growth"},{"question":"Teaching others preserves  beyond one lifetime.","options":["Knowledge","Noise","Applause","Debt"],"answer":"Knowledge"},{"question":"Which of these pairs should be part of every goal?","options":["One action and a dua","One complaint and a demand","One secret and a rumor","One rumor and a fight"],"answer":"One action and a dua"},{"question":"Writing a letter to your future self helps create a.","options":["Legacy plan","Complaint list","Shopping list","Gossip thread"],"answer":"Legacy plan"},{"question":"The Prophet (peace be upon him) described excellence as.","options":["Ihsan","Noise","Fear","Selfishness"],"answer":"Ihsan"},{"question":"Keeping a progress journal builds.","options":["Accountability","Excuses","Competition","Panic"],"answer":"Accountability"},{"question":"Weekly reviews keep your  sharp.","options":["Focus","Fears","Friends","Fasting"],"answer":"Focus"},{"question":"Mentorship multiplies your.","options":["Impact","Sleep","Plans","Noise"],"answer":"Impact"},{"question":"Pairing goals with dua keeps you close to.","options":["Allah","Stories","Games","Rivals"],"answer":"Allah"},{"question":"Legacy includes leaving ongoing.","options":["Sadaqah","Secrets","Debt","Complaints"],"answer":"Sadaqah"}]},{"chapterId":11,"questions":[{"question":"Belief in the hereafter is part of which article of faith?","options":["Sixth","First","Second","Third"],"answer":"Sixth"},{"question":"After death, the soul enters  until the Day of Judgment.","options":["Barzakh","Jannah","Medina","Cave"],"answer":"Barzakh"},{"question":"Which angels question the deceased in the grave?","options":["Munkar and Nakir","Jibril and Mikail","Israfil and Azrael","Harut and Marut"],"answer":"Munkar and Nakir"},{"question":"The Day of Judgment is called.","options":["Yawm al-Qiyamah","Yawm al-Salat","Yawm al-Jihad","Yawm al-Umrah"],"answer":"Yawm al-Qiyamah"},{"question":"The balance weighing deeds is called.","options":["Mizan","Rukn","Sharh","Mihrab"],"answer":"Mizan"},{"question":"The record of deeds is kept by the ?","options":["Kiraman Katibin","Scribes of the world","Teachers","Judges"],"answer":"Kiraman Katibin"},{"question":"Repentance in Arabic is called.","options":["Tawbah","Zakat","Sadaqah","Hajj"],"answer":"Tawbah"},{"question":"Believing in the afterlife keeps hearts focused on.","options":["Good deeds","Entertainment","Work only","Hate"],"answer":"Good deeds"},{"question":"Fear of Allah\'s mercy is balanced by  on the Day of Judgment.","options":["Hope","Panic","Hate","Jealousy"],"answer":"Hope"},{"question":"Remembering death regularly encourages.","options":["Preparation","Shopping","Slumber","Jealousy"],"answer":"Preparation"},{"question":"Those who deny the hereafter will face ?","options":["Punishment","Fancy meals","Travel","Joy"],"answer":"Punishment"},{"question":"The hereafter is described as either Paradise or.","options":["Hell","Desert","City","Garden"],"answer":"Hell"},{"question":"Seeking Allah\'s mercy and forgiveness is done through.","options":["Dua","Shopping","Sleeping","Arguing"],"answer":"Dua"},{"question":"Which habit supports hope while fearing Allah?","options":["Balanced dua","Laziness","Arguments","Jealousy"],"answer":"Balanced dua"},{"question":"A believer reminds themselves of death to stay.","options":["Humble","Boastful","Angry","Lazy"],"answer":"Humble"},{"question":"Barzakh is the period between death and.","options":["Resurrection","Eid","Ramadan","Hajj"],"answer":"Resurrection"},{"question":"Belief in the hereafter makes us guard our.","options":["Actions","Status","Phones","Money"],"answer":"Actions"},{"question":"Yawm al-Qiyamah is when Allah will  all people.","options":["Judge","Reward","Gift","Ignore"],"answer":"Judge"},{"question":"Maintaining hope and fear keeps the believer\'s  balanced.","options":["Heart","Wallet","Schedule","Temper"],"answer":"Heart"},{"question":"Remembering the grave encourages.","options":["Preparation","Travel","Noise","Games"],"answer":"Preparation"}]},{"chapterId":12,"questions":[{"question":"What is the Arabic name for Paradise?","options":["Jannah","Jahannam","Salah","Sawm"],"answer":"Jannah"},{"question":"What is the Arabic name for Hell?","options":["Jahannam","Jannah","Salah","Quran"],"answer":"Jahannam"},{"question":"Jannah is described as gardens with.","options":["Rivers","Mountains","Deserts","Lakes of oil"],"answer":"Rivers"},{"question":"Jahannam is described as a place of.","options":["Fire","Fruits","Peace","Silence"],"answer":"Fire"},{"question":"Muslims ask Allah for  from the Fire.","options":["Refuge","Fame","Money","Power"],"answer":"Refuge"},{"question":"Who is promised Paradise?","options":["Believers with righteous deeds","Only the rich","Only scholars","Only warriors"],"answer":"Believers with righteous deeds"},{"question":"Which highest level of Paradise is called ?","options":["Firdaws","Kabah","Masjid","Qibla"],"answer":"Firdaws"},{"question":"Seeking forgiveness is a step toward.","options":["Paradise","Sleep","Stress","Conflict"],"answer":"Paradise"},{"question":"Hell is for those who persist in.","options":["Shirk","Charity","Prayer","Helping"],"answer":"Shirk"},{"question":"Asking for Paradise and refuge from Hell is.","options":["A dua the Prophet (peace be upon him) taught","A new habit","A story","A dream"],"answer":"A dua the Prophet (peace be upon him) taught"},{"question":"Charity, prayer, and repentance lighten the path to.","options":["Paradise","Fame","Profit","Noise"],"answer":"Paradise"},{"question":"The Quran describes Hell\'s fuel as ?","options":["People and stones","Water","Flowers","Gold"],"answer":"People and stones"},{"question":"Paradise is filled with what kind of dwellings?","options":["Light filled palaces","Tents","Towers of dust","Metal boxes"],"answer":"Light filled palaces"},{"question":"Which trait helps a believer avoid the Fire?","options":["Sincere repentance","Jealousy","Anger","Silence"],"answer":"Sincere repentance"},{"question":"The Prophet (peace be upon him) asked Muslims to keep asking Allah for  ?","options":["Paradise and refuge from the Fire","More time","Games","Luxury"],"answer":"Paradise and refuge from the Fire"},{"question":"Muslims ask Allah for  in Paradise.","options":["Jannah","Fame","Power","Noise"],"answer":"Jannah"},{"question":"Seeking refuge from the Fire is a hopeful.","options":["Dua","Complaint","Dress","Story"],"answer":"Dua"},{"question":"Paradise promises eternal.","options":["Joy","Debt","Noise","Silence"],"answer":"Joy"},{"question":"The Fire is reserved for those who persist in.","options":["Shirk","Giving","Listening","Loving"],"answer":"Shirk"},{"question":"Staying close to Allah\'s mercy guards against.","options":["The Fire","Rain","Food","Travel"],"answer":"The Fire"}]},{"chapterId":13,"questions":[{"question":"What does \'dhikr\' mean?","options":["Remembrance of Allah","Relaxation","Storytelling","Travel"],"answer":"Remembrance of Allah"},{"question":"Which phrase praises Allah\'s perfection?","options":["SubhanAllah","Hi there","Goodbye","See you"],"answer":"SubhanAllah"},{"question":"Which short dua means \'All praise is due to Allah\'?","options":["Alhamdulillah","Bismillah","Astaghfirullah","Allahu Akbar"],"answer":"Alhamdulillah"},{"question":"Which dua asks Allah for forgiveness?","options":["Astaghfirullah","SubhanAllah","Alhamdulillah","InshaAllah"],"answer":"Astaghfirullah"},{"question":"Which phrase expresses trust by saying there is no might except with Allah?","options":["La hawla wa la quwwata illa billah","Bismillah","Assalamu Alaikum","SubhanAllah"],"answer":"La hawla wa la quwwata illa billah"},{"question":"Remembrance and dua soften the.","options":["Heart","Wallet","Schedule","Food"],"answer":"Heart"},{"question":"Which dua seeks protection from evil?","options":["A\'udhu billahi min ash-shaytan","Alhamdulillah","Astaghfirullah","SubhanAllah"],"answer":"A\'udhu billahi min ash-shaytan"},{"question":"Which dua reminds us Allah is enough for us?","options":["Hasbi Allah","Assalamu Alaikum","Noor","Zikr"],"answer":"Hasbi Allah"},{"question":"Daily dhikr is encouraged most in the  and evening.","options":["Morning","Afternoon","Night only","Midnight"],"answer":"Morning"},{"question":"Which short chapter is often read as part of daily dhikr for protection?","options":["Al-Ikhlas","Al-Baqarah","An-Nisa","Yusuf"],"answer":"Al-Ikhlas"},{"question":"Asking Allah for others in dua shows.","options":["Support","Silence","Pride","Fear"],"answer":"Support"},{"question":"Multiplying dhikr after prayer keeps the  steady.","options":["Heart","Money","Phone","Schedule"],"answer":"Heart"},{"question":"Which phrase means \'Allah is the Greatest\'?","options":["Allahu Akbar","Alhamdulillah","SubhanAllah","Astaghfirullah"],"answer":"Allahu Akbar"},{"question":"Which dua is recited before starting work, meaning \'In the name of Allah\'?","options":["Bismillah","SubhanAllah","Alhamdulillah","Allahu Akbar"],"answer":"Bismillah"},{"question":"Which action keeps the conversation with Allah honest?","options":["Dua about routine matters","Ignoring prayer","Talking behind others","Hoarding wealth"],"answer":"Dua about routine matters"},{"question":"The dua \'Rabbi zidni ilma\' asks Allah for more.","options":["Knowledge","Sleep","Games","Rumors"],"answer":"Knowledge"},{"question":"Saying \'Hasbi Allah\' shows  on Allah.","options":["Reliance","Confusion","Criticism","Fear"],"answer":"Reliance"},{"question":"Praying for others in dua reflects.","options":["Support","Silence","Pride","Fear"],"answer":"Support"},{"question":"Dhikr keeps the heart.","options":["Soft","Tired","Closed","Distracted"],"answer":"Soft"},{"question":"Remembering Allah\'s names brings  to the soul.","options":["Peace","Noise","Stress","Sleep"],"answer":"Peace"}]},{"chapterId":14,"questions":[{"question":"Islamic homes should be built on.","options":["Mercy and justice","Wealth only","Noise","Silence"],"answer":"Mercy and justice"},{"question":"Marriage in Islam is called.","options":["Nikah","Salah","Zakat","Hajj"],"answer":"Nikah"},{"question":"Which surah compares spouses to garments for each other?","options":["Al-Baqarah","Yaseen","Al-Ikhlas","An-Nas"],"answer":"Al-Baqarah"},{"question":"Fairness in sharing duties brings  at home.","options":["Balance","Conflict","Chaos","Jealousy"],"answer":"Balance"},{"question":"Which action helps grow love within the household?","options":["Gratitude","Keeping secrets","Arguing","Ignoring"],"answer":"Gratitude"},{"question":"Parents should treat children with.","options":["Kindness","Anger","Silence","Harshness"],"answer":"Kindness"},{"question":"Children should obey parents as long as it does not lead to.","options":["Disobedience to Allah","Playtime","Learning","Sharing"],"answer":"Disobedience to Allah"},{"question":"Teaching the Quran at home models  for family members.","options":["The Quran and Sunnah","Travel","Games","Movies"],"answer":"The Quran and Sunnah"},{"question":"A peaceful home begins with.","options":["Gentle speech","Scolding","Noise","Isolation"],"answer":"Gentle speech"},{"question":"Planning undistracted time for family shows.","options":["Care","Indifference","Neglect","Rashness"],"answer":"Care"},{"question":"A balanced home includes shared.","options":["Duties","Secrets","Silence","Favors"],"answer":"Duties"},{"question":"Praying together strengthens  at home.","options":["Faith and connection","Debt","Noise","Confusion"],"answer":"Faith and connection"},{"question":"The Prophet (peace be upon him) said the best of you are best to your.","options":["Families","Enemies","Strangers","Pets"],"answer":"Families"},{"question":"Which act protects marriages?","options":["Open communication","Noise","Isolation","Greed"],"answer":"Open communication"},{"question":"Making dua for your household is a form of.","options":["Care","Neglect","Argument","Silence"],"answer":"Care"},{"question":"Sharing duties at home builds.","options":["Balance","Drama","Silence","Chaos"],"answer":"Balance"},{"question":"Raising children requires  and kindness.","options":["Patience","Wealth","Noise","Worry"],"answer":"Patience"},{"question":"Scheduling undistracted family time shows.","options":["Care","Neglect","Anger","Jealousy"],"answer":"Care"},{"question":"Open communication protects.","options":["Marriage","Power","Fame","Wealth"],"answer":"Marriage"},{"question":"Praying together strengthens.","options":["Faith","Conflict","Silence","Stress"],"answer":"Faith"}]},{"chapterId":15,"questions":[{"question":"Purifying the heart removes diseases like.","options":["Envy","Hunger","Sleepiness","Noise"],"answer":"Envy"},{"question":"Dhikr softens the.","options":["Heart","Wallet","Desk","Door"],"answer":"Heart"},{"question":"Self accounting each night is called.","options":["Muhasabah","Zakat","Sadaqah","Hajj"],"answer":"Muhasabah"},{"question":"A heart filled with gratitude stays.","options":["Tender","Angry","Greedy","Silent"],"answer":"Tender"},{"question":"Repentance helps remove  from the heart.","options":["Pride","Water","Sleep","Food"],"answer":"Pride"},{"question":"Which emotion is a heart disease?","options":["Jealousy","Joy","Peace","Gratitude"],"answer":"Jealousy"},{"question":"Compassion keeps the heart.","options":["Soft","Silent","Cold","Loud"],"answer":"Soft"},{"question":"When we notice blameworthy traits we should.","options":["Repent","Hide","Blame others","Forget"],"answer":"Repent"},{"question":"Trusting Allah is known as.","options":["Tawakkul","Hate","Noise","Greed"],"answer":"Tawakkul"},{"question":"Sincerity opposes.","options":["Riyah (showing off)","Kindness","Prayer","Charity"],"answer":"Riyah (showing off)"},{"question":"A heart with constant dhikr shows  to Allah.","options":["Attachment","Detachment","Hate","Falsehood"],"answer":"Attachment"},{"question":"Which practice keeps the heart at peace?","options":["Dua","Shopping","Grumbling","Arguing"],"answer":"Dua"},{"question":"Which emotion should we guard from to protect the heart?","options":["Pride","Debt","Cold","Rain"],"answer":"Pride"},{"question":"Compassion for others comes from a heart filled with.","options":["Love","Silence","Noise","Tension"],"answer":"Love"},{"question":"Turning every action into dua shows  in the heart.","options":["Focus","Confusion","Sleepiness","Noise"],"answer":"Focus"},{"question":"Muhasabah is the habit of.","options":["Self-accounting","Shopping","Sleeping","Ignoring"],"answer":"Self-accounting"},{"question":"Guarding the tongue keeps the  clean.","options":["Heart","Home","Wallet","Phone"],"answer":"Heart"},{"question":"Jealousy is considered a heart.","options":["Disease","Gift","Game","Noise"],"answer":"Disease"},{"question":"Trusting Allah (tawakkul) steadies the.","options":["Heart","Laptop","Bank","Friends"],"answer":"Heart"},{"question":"Dhikr and dua keep the heart.","options":["Soft","Tired","Closed","Angry"],"answer":"Soft"}]}]');

/***/ }),

/***/ "./resources/js/components/data/roadmap.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/roadmap.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"title":"The Foundation","description":"Introduction to Islam & Tawheed","icon":"auto_awesome","color":"emerald","videoUrl":"PDxobYt_9zM"},{"id":2,"title":"The Beliefs","description":"Six Articles of Faith","icon":"psychology","color":"indigo","videoUrl":"Jd6dIqJ6_Zg"},{"id":3,"title":"The Pillars","description":"The Five Acts of Worship","icon":"star","color":"amber","videoUrl":"TpcO0uE1r-w"},{"id":4,"title":"The Quran","description":"Divine Revelation","icon":"menu_book","color":"teal","videoUrl":"1Y72J03fK-Y"},{"id":5,"title":"The Prophet","description":"Life of Muhammad (peace be upon him)","icon":"history_edu","color":"cyan","videoUrl":"sZ3rG-aWzWw"},{"id":6,"title":"The Prayer","description":"Connection (Salah)","icon":"schedule","color":"emerald","videoUrl":"kScrL8m1qMs"},{"id":7,"title":"The Manners","description":"Islamic Etiquette (Adab)","icon":"handshake","color":"rose","videoUrl":"B1J2_1wK6tM"},{"id":8,"title":"The Lifestyle","description":"Halal & Haram","icon":"style","color":"violet","videoUrl":"XJt9r-x1qMs"},{"id":9,"title":"The Community","description":"Ummah & Support","icon":"groups","color":"blue","videoUrl":"lJt9r-x1qMs"},{"id":10,"title":"The Future","description":"Continuous Growth","icon":"trending_up","color":"slate","videoUrl":"yJt9r-x1qMs"},{"id":11,"title":"The Hereafter","description":"Death, Grave & Beyond","icon":"nightlight","color":"zinc","videoUrl":"9s3rG-aWzWw"},{"id":12,"title":"Paradise & Hell","description":"Your Permanent Home","icon":"park","color":"green","videoUrl":"JannahTour"},{"id":13,"title":"Dua & Dhikr","description":"Weapons of the Believer","icon":"favorite","color":"purple","videoUrl":"dua-weapon"},{"id":14,"title":"Family & Marriage","description":"Building a Righteous Home","icon":"family_restroom","color":"pink","videoUrl":"marriage101"},{"id":15,"title":"The Heart","description":"Purification & Spiritual Diseases","icon":"favorite","color":"red","videoUrl":"heartpurification"}]');

/***/ })

}]);