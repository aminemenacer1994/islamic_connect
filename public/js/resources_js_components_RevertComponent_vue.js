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
      return ((entry === null || entry === void 0 ? void 0 : entry.videos) || []).slice(0, 4);
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
  class: "content-card section-card guidance-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_32 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_33 = {
  class: "guidance-grid"
};
const _hoisted_34 = {
  class: "guidance-card-top"
};
const _hoisted_35 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_36 = {
  class: "guidance-step"
};
const _hoisted_37 = {
  class: "mb-0 text-muted small"
};
const _hoisted_38 = {
  class: "mt-2 fw-semibold"
};
const _hoisted_39 = {
  class: "mt-3 text-muted small"
};
const _hoisted_40 = {
  class: "d-flex align-items-center gap-2 text-dark small fw-medium"
};
const _hoisted_41 = {
  key: 1,
  class: "content-card guided-section-card mb-4 rounded-4"
};
const _hoisted_42 = {
  class: "guided-bullets px-3 pb-3"
};
const _hoisted_43 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_44 = {
  class: "text-muted"
};
const _hoisted_45 = {
  class: "content-card tone-card section-card mb-4 rounded-4"
};
const _hoisted_46 = {
  class: "card-body px-3"
};
const _hoisted_47 = {
  class: "tone-guidelines list-unstyled mb-0"
};
const _hoisted_48 = {
  key: 2,
  class: "content-card onboarding-card mb-4 rounded-4"
};
const _hoisted_49 = {
  class: "card-body px-4 py-3"
};
const _hoisted_50 = {
  class: "simple-onboarding-list mb-0"
};
const _hoisted_51 = {
  class: "d-block"
};
const _hoisted_52 = {
  class: "lesson-focus-intro d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
};
const _hoisted_53 = {
  class: "mb-0 text-muted medium"
};
const _hoisted_54 = {
  key: 3,
  class: "row focus-highlight-row mb-4 g-3"
};
const _hoisted_55 = {
  class: "focus-pill-card p-3 rounded-4 shadow-sm h-100"
};
const _hoisted_56 = {
  class: "d-flex align-items-center justify-content-between mb-1"
};
const _hoisted_57 = {
  class: "focus-pill-label text-muted small"
};
const _hoisted_58 = {
  class: "fw-bold mb-1"
};
const _hoisted_59 = {
  class: "mb-0 text-muted small"
};
const _hoisted_60 = {
  key: 4,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_61 = {
  class: "card-body card-teal px-3 px-md-4"
};
const _hoisted_62 = {
  class: "learning-objectives-grid"
};
const _hoisted_63 = {
  class: "list-group insight-list fs-6 lh-base column-list m-0"
};
const _hoisted_64 = {
  class: "content-card section-card animated-fade-slide mb-4 rounded-4",
  style: {
    "animation-delay": "0.05s"
  }
};
const _hoisted_65 = {
  class: "card-header d-flex align-items-center py-3"
};
const _hoisted_66 = {
  class: "lesson-focus-actions ms-auto"
};
const _hoisted_67 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_68 = {
  key: 0,
  class: "lesson-overview-summary mb-4"
};
const _hoisted_69 = {
  class: "text-muted small mb-3"
};
const _hoisted_70 = {
  key: 0,
  class: "row g-3"
};
const _hoisted_71 = {
  class: "overview-highlight border rounded-3 p-3 h-100"
};
const _hoisted_72 = {
  class: "fw-semibold mb-2"
};
const _hoisted_73 = {
  class: "mb-0 text-muted small"
};
const _hoisted_74 = {
  key: 1,
  class: "overview-section-list"
};
const _hoisted_75 = {
  class: "d-flex align-items-start gap-3 mb-3"
};
const _hoisted_76 = {
  class: "section-number fs-5"
};
const _hoisted_77 = {
  class: "fw-semibold mb-0 fs-5"
};
const _hoisted_78 = {
  key: 0,
  class: "section-stats d-flex flex-wrap gap-3 mt-3"
};
const _hoisted_79 = {
  class: "text-muted"
};
const _hoisted_80 = {
  key: 2,
  class: "overview-section-list"
};
const _hoisted_81 = {
  class: "d-flex align-items-start gap-3 mb-3"
};
const _hoisted_82 = {
  class: "section-number fs-5"
};
const _hoisted_83 = {
  class: "fw-semibold mb-0 fs-5"
};
const _hoisted_84 = ["innerHTML"];
const _hoisted_85 = {
  key: 0,
  class: "background mt-4 w-100 py-3 px-4 rounded-4 border"
};
const _hoisted_86 = {
  class: "deep-dive-header d-flex align-items-center mb-2"
};
const _hoisted_87 = {
  class: "fw-bold mb-0 text-dark fs-6"
};
const _hoisted_88 = ["innerHTML"];
const _hoisted_89 = {
  key: 1,
  class: "section-stats d-flex flex-wrap gap-3 mt-3"
};
const _hoisted_90 = {
  class: "text-muted"
};
const _hoisted_91 = {
  key: 5,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_92 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_93 = {
  class: "row g-3"
};
const _hoisted_94 = {
  class: "video-card h-100 d-flex flex-column rounded-3 border shadow-sm overflow-hidden"
};
const _hoisted_95 = {
  class: "ratio ratio-16x9"
};
const _hoisted_96 = ["src", "title"];
const _hoisted_97 = {
  class: "p-3"
};
const _hoisted_98 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_99 = {
  key: 0,
  class: "text-muted small mb-0"
};
const _hoisted_100 = {
  key: 6,
  class: "content-card lesson-focus-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_101 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_102 = {
  class: "row g-3"
};
const _hoisted_103 = {
  class: "dept-card h-100 p-3 rounded-3"
};
const _hoisted_104 = {
  class: "d-flex align-items-center gap-2 mb-2"
};
const _hoisted_105 = {
  class: "dept-icon"
};
const _hoisted_106 = {
  class: "fs-6 mb-0"
};
const _hoisted_107 = {
  class: "text-muted small mb-1"
};
const _hoisted_108 = {
  class: "text-dark fw-semibold mb-0"
};
const _hoisted_109 = {
  key: 7,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_110 = {
  class: "card-body p-3"
};
const _hoisted_111 = {
  class: "mb-3"
};
const _hoisted_112 = {
  class: "text-muted small mb-3"
};
const _hoisted_113 = {
  class: "row g-3"
};
const _hoisted_114 = {
  class: "col-12 col-md-6"
};
const _hoisted_115 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_116 = {
  class: "list-unstyled mb-0"
};
const _hoisted_117 = {
  class: "text-dark medium mt-1"
};
const _hoisted_118 = {
  class: "col-12 col-md-6"
};
const _hoisted_119 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_120 = {
  class: "list-unstyled mb-0"
};
const _hoisted_121 = {
  class: "text-dark medium mt-1"
};
const _hoisted_122 = {
  key: 0,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_123 = {
  class: "card-body p-3"
};
const _hoisted_124 = {
  class: "text-muted small mb-3"
};
const _hoisted_125 = {
  class: "list-group insight-list fs-6 lh-base"
};
const _hoisted_126 = {
  key: 1,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_127 = {
  class: "card-header d-flex align-items-center py-3 gap-3"
};
const _hoisted_128 = {
  class: "lesson-focus-actions ms-auto"
};
const _hoisted_129 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_130 = {
  class: "row g-3"
};
const _hoisted_131 = {
  class: "dua-card h-100 rounded-4 p-4 shadow-lg"
};
const _hoisted_132 = {
  key: 2,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_133 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_134 = ["aria-expanded"];
const _hoisted_135 = {
  class: "d-none d-sm-inline"
};
const _hoisted_136 = {
  class: "card-body p-3"
};
const _hoisted_137 = {
  class: "accordion-stack"
};
const _hoisted_138 = ["onClick"];
const _hoisted_139 = {
  class: "accordion-answer mt-2"
};
const _hoisted_140 = ["innerHTML"];
const _hoisted_141 = {
  key: 3,
  id: "mission-card",
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 mission-card"
};
const _hoisted_142 = {
  class: "card-body p-3"
};
const _hoisted_143 = {
  class: "mb-2 text-muted small"
};
const _hoisted_144 = {
  class: "fw-semibold"
};
const _hoisted_145 = {
  class: "text-dark fs-6"
};
const _hoisted_146 = {
  class: "d-flex flex-wrap gap-2 align-items-center mt-3"
};
const _hoisted_147 = {
  class: "badge bg-success text-white rounded-pill"
};
const _hoisted_148 = {
  key: 4,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_149 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_150 = ["aria-expanded"];
const _hoisted_151 = {
  class: "d-none d-sm-inline"
};
const _hoisted_152 = {
  class: "card-body p-3"
};
const _hoisted_153 = {
  class: "accordion-stack"
};
const _hoisted_154 = ["onClick"];
const _hoisted_155 = {
  class: "accordion-answer mt-2"
};
const _hoisted_156 = ["innerHTML"];
const _hoisted_157 = {
  class: "content-card next-steps-card animated-slide-up rounded-4 mb-4",
  style: {
    "animation-delay": "0.4s"
  }
};
const _hoisted_158 = {
  class: "card-body p-3"
};
const _hoisted_159 = {
  class: "row g-3"
};
const _hoisted_160 = {
  class: "col-12 col-md-12"
};
const _hoisted_161 = {
  class: "homework-grid"
};
const _hoisted_162 = {
  class: "d-flex align-items-center gap-2 mb-1"
};
const _hoisted_163 = {
  class: "mb-0 text-dark"
};
const _hoisted_164 = {
  key: 5,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 quiz-wrapper"
};
const _hoisted_165 = {
  class: "quiz-shell p-0"
};
const _hoisted_166 = {
  class: "quiz-body px-4 py-3"
};
const _hoisted_167 = {
  class: "quiz-progress-wrapper mb-3"
};
const _hoisted_168 = {
  class: "quiz-progress-track"
};
const _hoisted_169 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_170 = {
  class: "mb-0 small fw-semibold text-teal"
};
const _hoisted_171 = {
  class: "fw-semibold text-dark mb-4 quiz-question"
};
const _hoisted_172 = {
  class: "quiz-options-grid"
};
const _hoisted_173 = ["disabled", "onClick"];
const _hoisted_174 = {
  class: "icon-stack"
};
const _hoisted_175 = {
  key: 0,
  class: "bi bi-check-circle-fill text-white"
};
const _hoisted_176 = {
  key: 1,
  class: "bi bi-x-circle-fill text-white"
};
const _hoisted_177 = {
  key: 0,
  class: "quiz-success-note mt-3"
};
const _hoisted_178 = {
  class: "d-flex flex-column flex-md-row gap-2 align-items-start"
};
const _hoisted_179 = {
  class: "mb-0 fw-semibold text-teal"
};
const _hoisted_180 = {
  key: 8,
  class: "content-card transition-card text-dark rounded-4 animated-fade-slide mb-4"
};
const _hoisted_181 = {
  class: "d-flex align-items-center justify-content-between flex-wrap"
};
const _hoisted_182 = {
  class: "fw-semibold mb-0"
};
const _hoisted_183 = {
  class: "mb-1 text-teal small"
};
const _hoisted_184 = {
  class: "text-end"
};
const _hoisted_185 = {
  class: "badge bg-light text-dark rounded-pill px-3 py-2"
};
const _hoisted_186 = {
  class: "text-muted mt-3 mb-0"
};
const _hoisted_187 = {
  class: "actions-card animated-fade-in"
};
const _hoisted_188 = {
  class: "p-4 p-md-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between gap-3"
};
const _hoisted_189 = ["disabled"];
const _hoisted_190 = {
  class: "d-flex flex-column flex-md-row align-items-center gap-2"
};
const _hoisted_191 = {
  class: "text-muted small me-md-auto"
};
const _hoisted_192 = {
  key: 0,
  class: "text-teal small fw-semibold"
};
const _hoisted_193 = ["disabled"];
const _hoisted_194 = {
  key: 0
};
const _hoisted_195 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog"
};
const _hoisted_196 = {
  class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_197 = {
  class: "modal-content rounded-4 shadow-lg custom-modal-card"
};
const _hoisted_198 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_199 = {
  class: "modal-title fw-bold"
};
const _hoisted_200 = {
  class: "modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3"
};
const _hoisted_201 = {
  key: 0,
  class: "text-success small"
};
const _hoisted_202 = {
  class: "d-flex gap-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson4, _ctx$currentLessonOve, _ctx$currentLesson5, _ctx$currentLesson6, _ctx$currentChapterKe, _ctx$currentLesson7, _ctx$activeResource;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Background Layers "), _cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, " Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.summary), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"lesson-meta d-flex gap-3\">\n                <span class=\"badge badge-pill bg-light text-dark fw-semibold\">\n                  Objectives: {{ currentLesson?.learningObjectives?.length ?? 0 }}\n                </span>\n              </div> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Stats "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"row g-3 mb-4 hero-stats-row\">\n            <div v-for=\"stat in lessonHeroStats\" :key=\"stat.label\" class=\"col-12 col-sm-4\">\n              <article class=\"hero-stat-card d-flex flex-column\">\n                <span class=\"stat-label\">{{ stat.label }}</span>\n                <strong class=\"stat-value\">{{ stat.value }}</strong>\n                <span class=\"stat-helper text-muted small\">Premium insights</span>\n              </article>\n            </div>\n          </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Guidance Row "), _ctx.guidanceCards.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-compass-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Learning Guidance")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.guidanceCards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "guidance-card-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.step), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index === 0 ? 'Start here' : index === 1 ? 'Deepen & personalize' : 'Finish strong'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.description), 1 /* TEXT */)]), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "guidance-line"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-arrow-right-circle-fill text-teal fs-5"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.action), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.guidedPathwayCards.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center justify-content-between flex-wrap gap-3 p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-teal small mb-1 fw-semibold"
  }, "Guided Pathway"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "mb-1 fw-semibold"
  }, "Follow the curated steps below"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Start with absorb, move through reflection, and end with mastery to keep momentum.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"d-flex gap-2 flex-wrap\">\n                <button type=\"button\" class=\"btn btn-outline-teal btn-sm fw-semibold\" @click=\"scrollToSection(0)\">\n                  Jump to Step 1\n                </button>\n                <button type=\"button\" class=\"btn btn-teal btn-sm fw-semibold\" @click=\"scrollToSection(2)\">\n                  Highlight Reinforcement\n                </button>\n              </div> ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.guidedPathwayCards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: card.step,
      class: "guided-bullet"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"guided-step\">{{ card.step }}</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.action), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center gap-3 py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sunrise-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Gentle Tone + Non-Judgmental Wording"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Tailor your reflection for each chapter with a warm, encouraging voice that stays neutral and inclusive.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_47, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.toneGuidelines, tone => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: tone,
      class: "mb-2"
    }, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle text-teal me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tone), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Onboarding Block "), _ctx.currentGentleStartSteps.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-1 text-muted small text-uppercase"
  }, "Gentle start", -1 /* CACHED */)), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-semibold mb-2"
  }, "Simple welcome for new friends", -1 /* CACHED */)), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-3"
  }, " Take it slow these three ideas hold the key to remembering today’s lesson. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentGentleStartSteps, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: step.title
    }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "onboarding-bullet-icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "d-block mb-1"
  }, "Focus of this lesson", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentToneFocusText || ((_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.summary) || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.'), 1 /* TEXT */)])]), _ctx.focusHighlights.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.focusHighlights, highlight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: highlight.label,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.label), 1 /* TEXT */), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-star text-teal"
    }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.detail), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Learning objectives "), _ctx.learningObjectiveColumns.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-database-fill-check fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Learning Objectives")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.learningObjectiveColumns, (column, columnIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: columnIndex,
      class: "objective-column"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_63, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(column, objective => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: objective,
        class: "list-group-item border-0 px-0 py-3 d-flex align-items-start gap-3"
      }, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check-circle fs-5 mt-1 text-teal"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(objective), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" main content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-seam-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5 flex-grow-1"
  }, "Learning Overview")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.shareLessonOverview && _ctx.shareLessonOverview(...args))
  }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.copyLessonOverview && _ctx.copyLessonOverview(...args))
  }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.printLessonOverview && _ctx.printLessonOverview(...args))
  }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.lessonShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.lessonShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" lesson overview "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.overviewFontScale}em`,
      lineHeight: 1.6
    })
  }, [_ctx.currentLessonOverview ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentLessonOverview.summary), 1 /* TEXT */), (_ctx$currentLessonOve = _ctx.currentLessonOverview.highlights) !== null && _ctx$currentLessonOve !== void 0 && _ctx$currentLessonOve.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_70, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentLessonOverview.highlights, highlight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: highlight.label || highlight.heading,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_72, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.label || highlight.heading), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.description || highlight.content), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.overviewSections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_74, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.overviewSections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.heading,
      class: "section-block mb-5"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.heading), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content text-dark fs-6 lh-lg",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale}rem`
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.content), 5 /* TEXT, STYLE */), _ctx.sectionStatsFor(section.heading).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_78, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sectionStatsFor(section.heading), stat => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: stat.label,
        class: "section-stat-card"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "pt-3 mt-3"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])) : (_ctx$currentLesson5 = _ctx.currentLesson) !== null && _ctx$currentLesson5 !== void 0 && (_ctx$currentLesson5 = _ctx$currentLesson5.sections) !== null && _ctx$currentLesson5 !== void 0 && _ctx$currentLesson5.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_80, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson6 = _ctx.currentLesson) === null || _ctx$currentLesson6 === void 0 ? void 0 : _ctx$currentLesson6.sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "section-block mb-5"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_83, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content text-dark fs-6 lh-lg",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale}rem`
      }),
      innerHTML: section.content
    }, null, 12 /* STYLE, PROPS */, _hoisted_84), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb-fill me-2 fs-4 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_87, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "deep-dive-content text-dark fs-6",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale * 0.95}rem`
      }),
      innerHTML: section.deepDive.content
    }, null, 12 /* STYLE, PROPS */, _hoisted_88)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.sectionStatsFor(section.title).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_89, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sectionStatsFor(section.title), stat => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: stat.label,
        class: "section-stat-card"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "pt-3 mt-3"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Videos "), _ctx.lessonVideos.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_91, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection-play fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Lesson Videos"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0 small"
  }, "Four curated clips to reinforce the chapter.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonVideos, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: video.title,
      class: "col-12 col-md-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: _ctx.formatVideoUrl(video.url),
      title: video.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_96)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), video.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_99, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Departments Focus "), _ctx.lessonDepartments.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_100, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bar-chart-line-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-0 fs-5"
  }, "Lesson Focus Across Departments"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0 small"
  }, "How this chapter aligns with every pillar of the experience")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonDepartments, dept => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dept.name,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_105, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(dept.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_106, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.summary), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_108, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.detail), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dos and Dont's "), _ctx.currentDosDonts ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_109, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Do's and Dont's")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_112, "Guidance for " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentDosDonts.chapter), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_114, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_115, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-teal mb-3"
  }, "Do's", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_116, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDosDonts.dos, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id,
      class: "d-flex align-items-start gap-2 mb-2"
    }, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_117, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.text), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_119, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-danger mb-3"
  }, "Don'ts", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_120, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDosDonts.donts, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id,
      class: "d-flex align-items-start gap-2 mb-2"
    }, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-circle-fill fs-5 text-danger"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_121, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.text), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Key Insights "), _ctx.insightsToShow.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_122, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chart-line fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Key Insights")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_123, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_124, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$currentChapterKe = _ctx.currentChapterKeyInsights) === null || _ctx$currentChapterKe === void 0 ? void 0 : _ctx$currentChapterKe.chapter) || ((_ctx$currentLesson7 = _ctx.currentLesson) === null || _ctx$currentLesson7 === void 0 ? void 0 : _ctx$currentLesson7.title) || 'Chapter'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_125, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.insightsToShow, insight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: insight,
      class: "list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3"
    }, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(insight), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Duas "), _ctx.currentDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_127, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5 flex-grow-1"
  }, "Duas to Carry")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.shareDuas && _ctx.shareDuas(...args))
  }, [...(_cache[49] || (_cache[49] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.copyDuas && _ctx.copyDuas(...args))
  }, [...(_cache[50] || (_cache[50] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[6] || (_cache[6] = (...args) => _ctx.printDuas && _ctx.printDuas(...args))
  }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.duaShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_129, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.duaShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.duaFontScale}em`,
      lineHeight: 1.5
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDuas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dua.arabic,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_131, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Common asked questions "), _ctx.chapterCommonPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_132, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.commonQuestions ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.commonQuestions ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_134)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_136, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_137, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.chapterCommonPanels, (panel, index) => {
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
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_138), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: panel.body
    }, null, 8 /* PROPS */, _hoisted_140)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen('common', index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.commonQuestions]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" resources "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"premiumResources.length\"\n              class=\"content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card\">\n              <div class=\"card-header d-flex align-items-center justify-content-between py-3 gap-3\">\n                <div class=\"d-flex align-items-center gap-3 flex-grow-1\">\n                  <i class=\"bi bi-info-circle-fill fs-4 text-teal\"></i>\n                  <h1 class=\"fw-bold mb-0 fs-5\">Resources</h1>\n                </div>\n                <button type=\"button\"\n                  class=\"section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1\"\n                  @click=\"toggleSection('resources')\"\n                  :aria-expanded=\"!collapsedSections.resources\">\n                  <span class=\"d-none d-sm-inline\">{{ collapsedSections.resources ? 'Show' : 'Hide' }}</span>\n                  <i class=\"bi\" :class=\"collapsedSections.resources ? 'bi-chevron-down' : 'bi-chevron-up'\"></i>\n                </button>\n              </div>\n\n              <div v-show=\"!collapsedSections.resources\" class=\"card-body p-3 \">\n                <div v-if=\"premiumResources.length\" class=\"row row-cols-1 row-cols-md-2 g-3 mb-4\">\n                  <div class=\"col\" v-for=\"card in premiumResources\" :key=\"card.title\">\n                    <article class=\"premium-card h-100 d-flex flex-column\">\n                      <div>\n                        <h3 class=\"h6 fw-semibold mb-2\">{{ card.title }}</h3>\n                        <p class=\"small text-muted mb-3\">{{ card.desc }}</p>\n                      </div>\n                      <button type=\"button\"\n                        class=\"mt-auto resource-link d-flex align-items-center justify-content-center gap-2\"\n                        @click=\"openResource(card)\">\n                        <span>Explore the resource</span>\n                        <i class=\"bi bi-arrow-up-right\"></i>\n                      </button>\n                    </article>\n                  </div>\n                </div>\n              </div>\n            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mission Spotlight "), _ctx.currentMission ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_141, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-flag-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Mission Pulse")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_142, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_143, "Current mission tied to chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.chapterId), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_144, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_145, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.summary), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_147, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.focus), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-sm fw-semibold",
    onClick: _cache[8] || (_cache[8] = (...args) => _ctx.focusMission && _ctx.focusMission(...args))
  }, " View Mission ↓ ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ "), _ctx.chapterFaqPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_148, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_151, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.faqs ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.faqs ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_150)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.chapterFaqPanels, (panel, index) => {
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
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_154), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_155, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: panel.body
    }, null, 8 /* PROPS */, _hoisted_156)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen('faq', index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.faqs]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_157, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard-check-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Next Steps & Homework")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_158, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_159, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_160, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentHomework, (task, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: task,
      class: "homework-task p-3 mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_162, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_163, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(task), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz Card "), _ctx.currentQuestion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_164, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_165, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-header px-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dice-4-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Chapter Quiz")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"badge text-dark bg-light rounded-pill px-3 py-2\">\n                    Question {{ currentQuestionIndex + 1 }} / {{ quizQuestions.length }}\n                  </span> ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_168, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-progress-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: (_ctx.currentQuestionIndex + (_ctx.quizStatus === 'correct' ? 1 : 0)) / _ctx.quizQuestions.length * 100 + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_169, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Progress toward mastery", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_170, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizProgressLabel), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_171, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentQuestion.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_172, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentQuestion.options, option => {
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
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_174, [_ctx.quizStatus === 'correct' && option === _ctx.currentQuestion.answer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_175)) : _ctx.quizStatus === 'incorrect' && option === _ctx.selectedOption ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_176)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_173);
  }), 128 /* KEYED_FRAGMENT */))]), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_177, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-badge-check-fill text-teal me-2 fs-5"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_178, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_179, "Great! " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizRequiredCorrect) + " correct answers recorded.", 1 /* TEXT */), _cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "The Next Chapter button above is now active.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-teal btn-sm shadow-none",
    onClick: _cache[10] || (_cache[10] = (...args) => _ctx.retryQuiz && _ctx.retryQuiz(...args))
  }, " Retake quiz ")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.chapterQuizPassed && _ctx.nextChapterPreview ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_180, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_181, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-1"
  }, "Up next", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_182, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_183, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.track), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_184, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_185, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.id), 1 /* TEXT */), _cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "transition-line mt-2"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_186, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.snippet), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Divider "), _cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "border-top pt-4 mt-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" NAVIGATION BUTTONS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_187, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_188, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-secondary fw-semibold px-4 py-3 fs-6 d-flex align-items-center gap-2", {
      'opacity-50 cursor-not-allowed': _ctx.selectedPill <= 1
    }]),
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[11] || (_cache[11] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[65] || (_cache[65] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_189), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_190, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_191, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPill) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.roadmapData.length), 1 /* TEXT */), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_192, "Quiz cleared • Next Chapter unlocked.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn next-btn fw-bold px-4 py-3 fs-6 text-white d-flex align-items-center gap-2", {
      'next-ready': _ctx.chapterQuizPassed && !(_ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext),
      'disabled': _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext || !_ctx.chapterQuizPassed
    }]),
    disabled: _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext || !_ctx.chapterQuizPassed,
    onClick: _cache[12] || (_cache[12] = (...args) => _ctx.completeAndNext && _ctx.completeAndNext(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isWaitingForNext ? 'Processing...' : 'Next Chapter'), 1 /* TEXT */), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_193)])])])])])], 4 /* STYLE */), _ctx.showResourceModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_194, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_195, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_196, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_197, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_198, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_199, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$activeResource = _ctx.activeResource) === null || _ctx$activeResource === void 0 ? void 0 : _ctx$activeResource.title), 1 /* TEXT */)]), _cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body px-4 py-3"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_200, [_ctx.resourceCopyStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_201, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.resourceCopyStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_202, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-dark px-4",
    onClick: _cache[13] || (_cache[13] = (...args) => _ctx.copyResourceLink && _ctx.copyResourceLink(...args))
  }, [...(_cache[68] || (_cache[68] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
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

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation: Tawheed, The Eternal Truth That Created You and Will Resurrect You","summary":"Tawheed is the beginning, the middle, and the end of Islam. It is the reason the universe exists, the reason you breathe, the reason the prophets were sent, the reason Jannah was created, and the only sentence that will save you when the sky is split open. Mastering Tawheed is not optional it is the lifeline that connects every moment of your life to its ultimate purpose.","learningObjectives":["Reconnect every decision to the covenant of Tawheed.","Distinguish Rububiyyah, Uloohiyyah, and Asma wa Sifaat through the stories of the prophets.","Set a daily routine of shahada, duas, and self audit that keeps Tawheed alive.","Anchor your emotions in gratitude through the Shahada.","Spot everyday moments of Tehweed rather than relying on rituals alone."],"overview":[{"heading":"Allah Alone is the Creator","content":"Tawhid teaches that Allah alone is the Creator, Sustainer, and ultimate authority. Recognizing His perfection frees the heart from dependence on creation and anchors life firmly upon divine purpose and truth.","references":"","resources":""},{"heading":"Allah Has No Partners","content":"Allah’s knowledge encompasses everything in existence—past, present, and future. Nothing escapes His awareness. This understanding builds trust, humility, and certainty, reminding believers that their lives unfold within perfect divine wisdom."},{"heading":"Allah’s Knowledge Encompasses All","content":"Life is a purposeful test designed by Allah to develop faith, patience, and gratitude. Every moment offers opportunities for growth, reflection, and spiritual elevation, shaping the heart toward obedience and sincerity.","references":"","resources":""},{"heading":"Life is a Purposeful Test","content":"Worship must be directed only to Allah without partners. Supplications, acts of devotion, and inner reliance are reserved exclusively for Him. This clears the heart from misguidance, superstition, and spiritual confusion entirely.","references":"","resources":""},{"heading":"All Blessings Come from Allah","content":"Every blessing, big or small, originates from Allah’s mercy. Recognizing His favors nurtures gratitude, encourages humility, prevents arrogance, and inspires believers to use their blessings responsibly while remembering the Source granting them.","references":"","resources":""},{"heading":"Trust in Allah Brings Peace","content":"True reliance on Allah brings profound peace. Believers understand that outcomes occur through His perfect decree. Trusting Him calms anxiety, strengthens patience, and empowers the heart to move confidently through life’s challenges.","references":"","resources":""},{"heading":"Allah’s Names Reflect His Perfection","content":"Tawhid liberates people from dependence on worldly powers, false beliefs, and unhealthy attachments. Recognizing Allah as the only One worthy of trust and submission establishes emotional freedom, spiritual clarity, and unwavering personal strength.","references":"","resources":""},{"heading":"Guidance Comes Only from Allah","content":"Reflecting on Allah’s names deepens understanding of His mercy, power, wisdom, and generosity. These names guide worship and strengthen faith by shaping how believers experience life, seek comfort, and rely upon divine attributes.","references":"","resources":""},{"heading":"Allah’s Names Reflect His Perfection","content":"True guidance originates from Allah alone. Culture, desires, or human flaws cannot replace divine truth. Through revelation, Allah clarifies morality, purpose, and values, leading believers toward clarity, righteousness, and spiritual fulfillment.","references":"","resources":""},{"heading":"Guidance Comes Only from Allah","content":"Allah’s decree is always wise, even when concealed from human understanding. Believers accept outcomes with trust, knowing that every event carries purpose, growth, or protection designed by Allah’s unmatched perfect knowledge.","references":"","resources":""},{"heading":"Allah is Near to the Believer","content":"Allah is closer to a person than their jugular vein. His nearness comforts the struggling, strengthens the faithful, and guides hearts toward righteousness, reminding believers they are never abandoned in any circumstances.","references":"","resources":""},{"heading":"Submission Leads to Strength","content":"Deeds only hold value when performed sincerely for Allah. Sincerity purifies intentions, removes ego, and ensures actions become pathways to reward, spiritual elevation, and long  lasting inner peace anchored deeply in faith.","references":"","resources":""},{"heading":"Tawhid Unifies Life’s Purpose","content":"Success in Islam is measured by obedience to Allah, not worldly achievement. Following divine guidance builds purpose, stability, and contentment, allowing believers to flourish spiritually while navigating life with clarity.","references":"","resources":""},{"heading":"The Heart Corrupts When Attached to Creation","content":"Excessive attachment to worldly desires corrupts the heart and distracts from worship. Tawhid teaches balance, reminding believers that true fulfillment comes from prioritizing Allah’s pleasure over temporary material pursuits.","references":"","resources":""},{"heading":"Tawhid Forms the Foundation of All Good","content":"Tawhid creates a unified life purpose where worship, relationships, goals, and actions revolve around Allah. This harmony eliminates internal conflict, strengthens resilience, and forms the foundation for a spiritually meaningful existence.","references":"","resources":""}]},{"chapterId":2,"title":"The Beliefs: The Six Pillars of Iman, Your Invisible Reality Stronger Than Steel","summary":"While the body lives in the seen world, the heart lives permanently in the unseen (ghayb). The six pillars of Iman are the oxygen of the soul   without them you suffocate spiritually even while walking around healthy. They transform abstract belief into a lived certainty that reshapes every decision.","learningObjectives":["Map the six pillars of Iman onto everyday actions.","Recognize unseen realities (angels, books, prophets, qadar) that shape belief.","Develop nightly reflections that affirm gratitude for the unseen.","List the six pillars whenever doubt creeps in and counter it with evidence.","Practice narrating one unseen reality to a friend this week."],"overview":[{"heading":"Treat the Qur\'an as Dialogue","content":"Approach the text as Allah speaking to you; note what question it answers and respond with a dua.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Treat the Qur\'an as Dialogue\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Treat the Qur\'an as Dialogue\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Slow Reading","content":"Read a short passage slowly, look up one keyword, and see how the rhythm shifts when you pause.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Slow Reading\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Slow Reading\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Reflect with Reflection","content":"Write down how a verse applies to a current choice so the lesson feels practical.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Reflect with Reflection\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Reflect with Reflection\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Memorize Gently","content":"Pick a compact ayah, repeat it in bits, and attach a one sentence meaning so it sticks.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Memorize Gently\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Memorize Gently\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pair with Dua","content":"After a reading, ask Allah to help you live that teaching, translating the text into action.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pair with Dua\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pair with Dua\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Listen for Meaning","content":"Play a calm recitation, note how the pauses shape emphasis, and thank Allah for the melody.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Listen for Meaning\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Listen for Meaning\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Track Questions","content":"Keep a small list of words you wonder about and bring them to a teacher or tafsir.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Track Questions\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Track Questions\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Celebrate Clarity","content":"Share one insight with someone and observe how verbalizing joy deepens your conviction.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Celebrate Clarity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Celebrate Clarity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Schedule Study","content":"Plan a short weekly block that feels manageable so you meet the Qur’an consistently.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Schedule Study\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Schedule Study\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach What You Learn","content":"Offer a one sentence reflection to a neighbor or group to reinforce your own grasp.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Teach What You Learn\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Teach What You Learn\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Dialogue with the Qur’an","content":"Teacher tip: Model how to pause and ask the verse aloud, then let learners practice writing their own questions.","references":"","resources":""},{"heading":"Explore Revelation History","content":"Teacher tip: Explain the sequence of revelation and show learners a timeline to keep the context clear.","references":"","resources":""},{"heading":"Slow and steady recitation","content":"Teacher tip: Invite learners to recite two verses slowly, noting how breath and pause enhance meaning.","references":"","resources":""},{"heading":"Hold Q&A Chats","content":"Teacher tip: Pair learners to share insights about a verse and listen to each other without interruption.","references":"","resources":""},{"heading":"Celebrate Small Gains","content":"Teacher tip: Ask learners to record one new word they understood and praise the courage to keep exploring.","references":"","resources":""}]},{"chapterId":3,"title":"The Pillars: The Five Pillars, Your Direct Phone Line to Allah","summary":"These five actions are the bare minimum Allah asks in return for Jannah. They are gifts wrapped as obligations. Miss them and everything else collapses; perfect them and every nafl act becomes mountains of reward. The Prophet ﷺ called them the \'framework of Islam\' build your life upon them.","learningObjectives":["Master the five pillars as practical rituals, not chores.","Create a checklist for Salah, Zakat, Sawm, Hajj, and Shahada commitments.","Pair each pillar with one challenge and one celebration plan.","Simulate the pillars by planning a short role play for each.","Notice how each pillar influences your schedule after Ramadan."],"overview":[{"heading":"Trace Mercy Moments","content":"List two stories where the Prophet showed mercy even when others expected severity.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Trace Mercy Moments\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Trace Mercy Moments\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Find a Sunnah Habit","content":"Choose a gentle Sunnah like greeting others or charity and practice it intentionally this week.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Find a Sunnah Habit\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Find a Sunnah Habit\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Reflect on Patience","content":"When frustration rises, recall how he stayed calm and respond the same way.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Reflect on Patience\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Reflect on Patience\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Model Gentle Speech","content":"Use his soft tone when correcting or encouraging someone today.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Model Gentle Speech\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Model Gentle Speech\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Balance Love and Discipline","content":"Notice how he paired tenderness with firm justice and try to mirror that balance.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Balance Love and Discipline\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Balance Love and Discipline\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Observe Family Life","content":"Read about his interactions with family and apply one kindness at home.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Observe Family Life\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Observe Family Life\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share a Story","content":"Tell a trusted friend a seerah moment and explain its lesson for your life.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share a Story\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share a Story\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Anchor Tawheed in Action","content":"Connect the Prophet’s behavior to belief by naming how his deeds echoed Allah’s oneness.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Anchor Tawheed in Action\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Anchor Tawheed in Action\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Rest in Reliance","content":"Remember his reliance on dua during hardship and make tawakkul part of your plan.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Rest in Reliance\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Rest in Reliance\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Consistency Over Perfection","content":"Commit to a small regular habit inspired by him rather than waiting for a perfect moment.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Consistency Over Perfection\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Consistency Over Perfection\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach Mercy Moments","content":"Teacher tip: Highlight one seerah incident that showcases mercy and let learners role play how they might act similarly.","references":"","resources":""},{"heading":"Connect Character to Prayer","content":"Teacher tip: Ask students how the Prophet’s kindness kept prayer meaningful and let them share personal parallels.","references":"","resources":""},{"heading":"Explore Leadership Balance","content":"Teacher tip: Explain how he balanced worship, family, and community and ask learners to sketch their own balanced day.","references":"","resources":""},{"heading":"Discuss Humility Steps","content":"Teacher tip: Invite learners to describe how humility shaped prophetic choices and set a micro goal to practice humility.","references":"","resources":""},{"heading":"Mentor Through Sunnah","content":"Teacher tip: Suggest learners pair up to remind one another of a Sunnah habit the week ahead.","references":"","resources":""}]},{"chapterId":4,"title":"The Quran: Heartbeat of Revelation and Living Library","summary":"Each letter of the Qur\'an is alive; it lights, heals, and anchors you in divine goodness.","learningObjectives":["Make the Qur’an a daily companion with tajweed, tafsir, and reflection.","Identify three verses that speak to your current season and act on their lessons.","Build a routine for journaling insights from each surah you read.","Pair a verse with dua to turn word into worship.","Teach a family member one tajweed rule this week."],"overview":[{"heading":"Match Pillars to Purpose","content":"Pair each of the five pillars with a spiritual goal so the ritual feels meaningful.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Match Pillars to Purpose\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Match Pillars to Purpose\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Set Micro Rituals","content":"Break a pillar into tiny actions you can try this week to build confidence.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Set Micro Rituals\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Set Micro Rituals\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Connect Service to Worship","content":"Notice how zakat, fasting, and prayer serve others and deepen compassion.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Connect Service to Worship\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Connect Service to Worship\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Ask About Intentions","content":"Before each ritual, reaffirm you do it for Allah alone rather than social reward.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Ask About Intentions\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Ask About Intentions\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan Support","content":"Identify a mentor or guide for the pillar you find unfamiliar and reach out.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan Support\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan Support\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Celebrate Progress","content":"Acknowledge a small win  even imperfect  and thank Allah for the strength to continue.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Celebrate Progress\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Celebrate Progress\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Note Challenges","content":"Journal what slows you down in a pillar and pray for patience to overcome it.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Note Challenges\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Note Challenges\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Include Others","content":"Invite a friend to practice with you so accountability keeps habits alive.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Include Others\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Include Others\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Reflect on Joy","content":"Notice how each pillar steadies your heart and jot that emotion down.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Reflect on Joy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Reflect on Joy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach a Pillar","content":"Explain one pillar to someone curious, showing how it serves their soul.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Teach a Pillar\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Teach a Pillar\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Visualize Pillar Benefits","content":"Teacher tip: Present each pillar with a short story of how it supports a person and ask learners to share their favorite.","references":"","resources":""},{"heading":"Micro challenges","content":"Teacher tip: Offer a challenge such as praying an extra dua or giving a small zakat that learners can report back on.","references":"","resources":""},{"heading":"Purposeful Planning","content":"Teacher tip: Encourage journaling about why each pillar matters rather than what they look like on the surface.","references":"","resources":""},{"heading":"Group Accountability","content":"Teacher tip: Let learners choose a pillar partner to check in with once that week and celebrate effort.","references":"","resources":""},{"heading":"Pillar in Service","content":"Teacher tip: Demonstrate how service to others fulfills a pillar and ask learners to plan one act of kindness.","references":"","resources":""}]},{"chapterId":5,"title":"The Prophet: Muhammad ﷺ Mirror of Mercy","summary":"Studying the Prophet\'s life unlocks Islam\'s character code, showing clarity, humility, and compassionate leadership.","learningObjectives":["Study the Prophet’s character and identify manners to adopt.","Trace his leadership habits across worship, family, and community.","Practice one Prophetic routine (e.g., tahajjud or fasting) for a week.","Identify one Prophetic character trait you wish to model this month.","Create a mini journal entry describing how mercy reshaped your language."],"overview":[{"heading":"Reframe Prayer","content":"See salah as a pause for your heart rather than a task to finish.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Reframe Prayer\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Reframe Prayer\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Honor the Movements","content":"Notice how standing, bowing, and prostrating connect humility to physical posture.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Honor the Movements\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Honor the Movements\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Set Intentions","content":"Before each salah, clarify what you are asking Allah to guide in your day.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Set Intentions\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Set Intentions\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Tame Distractions","content":"Identify one steady distraction and design a small adjustment, like facing away from screens.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Tame Distractions\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Tame Distractions\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Dua After Prayer","content":"Use the minutes after tashahhud to ask for clarity, patience, and mercy.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Dua After Prayer\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Dua After Prayer\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Link Recitation to Meaning","content":"Understand one phrase you recite and reflect on how it applies to your routine.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Link Recitation to Meaning\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Link Recitation to Meaning\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share Gratitude","content":"Tell someone how prayer helped you today and encourage them to turn to Allah.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share Gratitude\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share Gratitude\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Schedule Quiet Breaks","content":"Between prayers, pause for a minute of dhikr to keep the rhythm alive.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Schedule Quiet Breaks\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Schedule Quiet Breaks\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Seek Presence","content":"Before takbir, breathe deeply and remind yourself you are standing before Allah.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Seek Presence\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Seek Presence\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Track Consistency","content":"Mark each prayer and thank Allah for the opportunity to reconnect.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Track Consistency\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Track Consistency\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach the Prayer Rhythm","content":"Teacher tip: Break down salah into rhythm and invite learners to lead a mock sequence describing the emotion of each part.","references":"","resources":""},{"heading":"Visual aids for khushu","content":"Teacher tip: Provide cards showing key meanings; have learners pair up to teach a card to each other.","references":"","resources":""},{"heading":"Focus on Dua","content":"Teacher tip: Ask learners to craft a dua after salah that includes gratitude and ask them to share it aloud.","references":"","resources":""},{"heading":"Track Distractions","content":"Teacher tip: Invite learners to keep a distraction log for one prayer and brainstorm calming strategies together.","references":"","resources":""},{"heading":"Prayer Through the Day","content":"Teacher tip: Show how salah punctuates the day and ask learners to map how it recalibrates their mood.","references":"","resources":""}]},{"chapterId":6,"title":"The Prayer: Salah as Your Soul\'s Sync","summary":"Prayer is the reset that brings your body, heart, and discipline back into harmony with Allah.","learningObjectives":["Deepen khushu by aligning breath, posture, and remembrance in each salah.","Learn key intentions before standing and dua after sujood.","Use salah as a daily reset to calm anxiety and plan service.","Set a weekly accountability check in for your five prayers.","Note how khushu’ shifts when you prep mentally before standing."],"overview":[{"heading":"See Ramadan as Mercy","content":"Treat the fast as a gift that drains ego and fills the heart with empathy.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'See Ramadan as Mercy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'See Ramadan as Mercy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Use Hunger to Connect","content":"Remember those who are hungry year round and plan a generous gesture for them.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Use Hunger to Connect\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Use Hunger to Connect\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Balance Days and Nights","content":"Pair daytime restraint with nightly Qur’anic reflection or dua.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Balance Days and Nights\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Balance Days and Nights\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Protect Energy","content":"Schedule rest and prayer so your body can sustain worship without burnout.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Protect Energy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Protect Energy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Build Community","content":"Invite someone to break fast with you or check on neighbors to share blessings.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Build Community\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Build Community\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Practice Gratitude","content":"Each evening, note one mercy you noticed and thank Allah for it.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Practice Gratitude\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Practice Gratitude\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan a Charity","content":"Identify a small act of giving you can do daily, even if it is a quick call.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan a Charity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan a Charity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Keep Accountability","content":"Pair up with a friend for nightly reflections to stay motivated.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Keep Accountability\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Keep Accountability\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Remember the Why","content":"Ask why you fast and renew that intention weekly so the fast feels purposeful.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Remember the Why\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Remember the Why\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Sustain Beyond Ramadan","content":"Choose one habit like extra dhikr to keep doing after the month ends.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Sustain Beyond Ramadan\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Sustain Beyond Ramadan\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Set Ramadan Intentions","content":"Teacher tip: Guide learners to state a mercy centered intention before the month and share it with the group.","references":"","resources":""},{"heading":"Empathy Exercises","content":"Teacher tip: Invite learners to list hunger experiences and plan a kind act for someone facing hardship.","references":"","resources":""},{"heading":"Nightly Reflections","content":"Teacher tip: Encourage journaling a feeling after each night prayer and compare notes with a partner.","references":"","resources":""},{"heading":"Generosity Plans","content":"Teacher tip: Ask learners to schedule one act of giving each week and report back on its impact.","references":"","resources":""},{"heading":"Carry Ramadan Onward","content":"Teacher tip: Have learners pick one habit to keep and describe how they’ll remind themselves later.","references":"","resources":""}]},{"chapterId":7,"title":"The Manners: Adab That Elevates Every Encounter","summary":"Adab is the fragrance of iman; it makes every interaction sacred and every apology sincere.","learningObjectives":["Define practical adab when speaking, eating, and sharing space.","Craft a family etiquette reminder (greeting, listening, gratitude).","Compare digital interactions to the Prophet’s mercy and adjust accordingly.","Celebrate small acts of adab with family thank you notes.","Practice digital kindness by correcting or uplifting one comment daily."],"overview":[{"heading":"List Noble Traits","content":"Write three prophetic manners you admire and plan to practice them.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'List Noble Traits\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'List Noble Traits\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pause Before Reacting","content":"When tension rises, breathe, recall the Prophet’s patience, and answer gently.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pause Before Reacting\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pause Before Reacting\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Use Gentle Speech","content":"Choose calming words when you correct or encourage someone.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Use Gentle Speech\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Use Gentle Speech\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Model Forgiveness","content":"Let go quickly after hurt and offer a sincere apology or compliment.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Model Forgiveness\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Model Forgiveness\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Spot Good Character","content":"Observe someone who acts with adab and note what inspires you.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Spot Good Character\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Spot Good Character\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Encourage Others","content":"Praise effort privately or publicly to reinforce positive change.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Encourage Others\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Encourage Others\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach a Child","content":"Show a youngster how adab works through story or example.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Teach a Child\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Teach a Child\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Balance Justice and Mercy","content":"When correcting mistakes, pair fairness with kindness.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Balance Justice and Mercy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Balance Justice and Mercy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Self Check Responses","content":"Ask if your reactions match your values and adjust slowly.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Self Check Responses\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Self Check Responses\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Celebrate Character Wins","content":"Record one act of good character daily to build momentum.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Celebrate Character Wins\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Celebrate Character Wins\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Model Kindness","content":"Teacher tip: Pose a scenario lacking good character and let learners coach one another toward a Sunnah response.","references":"","resources":""},{"heading":"Hook into Forgiveness","content":"Teacher tip: Present the power of forgiveness, then ask learners to forgive a small hurt this week and share how it felt.","references":"","resources":""},{"heading":"Praise Practice","content":"Teacher tip: Encourage sincere praise for others’ effort and invite learners to speak it aloud during class.","references":"","resources":""},{"heading":"Patience Toolkit","content":"Teacher tip: Provide three patience strategies and role play a stressful moment to rehearse.","references":"","resources":""},{"heading":"Teach Children Compassion","content":"Teacher tip: Ask learners how they’d explain kindness to a child and let them create a simple story.","references":"","resources":""}]},{"chapterId":8,"title":"The Lifestyle: Halal Living, Habits, and Harmony","summary":"Islam is a lifestyle; this chapter helps you align food, finances, and rest with halal intention.","learningObjectives":["Design a halal lifestyle blueprint covering food, finance, and rest.","Introduce two intentional boundaries that protect worship time.","Swap one unhealthy habit for a sunnah inspired alternative each week.","Design a halal budget with a charity and rest category.","Share one restful habit with a friend to keep each other accountable."],"overview":[{"heading":"Listen First","content":"Prioritize listening without interrupting, even when you disagree.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Listen First\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Listen First\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Speak Respectfully","content":"Use tone that invites dialogue instead of shutting it down.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Speak Respectfully\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Speak Respectfully\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Notice Shared Humanity","content":"Identify what you share with someone who thinks differently.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Notice Shared Humanity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Notice Shared Humanity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Respect Boundaries","content":"Honor space and privacy as tangible acts of peace.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Respect Boundaries\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Respect Boundaries\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Practice Calm Responses","content":"Take a breath before reacting and choose compassion.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Practice Calm Responses\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Practice Calm Responses\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Bridge Differences","content":"Ask a curious question that shows you want to understand another view.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Bridge Differences\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Bridge Differences\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share Gratitude","content":"Thank someone for their contribution, even when it feels small.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share Gratitude\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share Gratitude\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Resolve Quietly","content":"Offer a private apology or clarification when conflict arises.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Resolve Quietly\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Resolve Quietly\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Celebrate Diversity","content":"Learn one fact about another culture and appreciate it.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Celebrate Diversity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Celebrate Diversity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pray for Peace","content":"Include dua for peaceful hearts in your prayers.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pray for Peace\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pray for Peace\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Listen to Learn","content":"Teacher tip: Practice active listening in pairs and then reflect on how peace grew when you truly heard someone.","references":"","resources":""},{"heading":"Respectful Speech","content":"Teacher tip: Choose phrases that invite dialogue and revisit a real conversation where you could have used them.","references":"","resources":""},{"heading":"Shared Humanity","content":"Teacher tip: Ask learners to describe common ground with someone who holds a different view.","references":"","resources":""},{"heading":"Calm Response Drill","content":"Teacher tip: Teach taking a breath before reacting and have learners coach each other through a sample conflict.","references":"","resources":""},{"heading":"Pray for Peace","content":"Teacher tip: Introduce a short dua for peaceful hearts and encourage learners to recite it before sleep.","references":"","resources":""}]},{"chapterId":9,"title":"The Community: Building Ummah, Support, and Uplift","summary":"Islam thrives in community; this chapter explores solidarity, hospitality, and shared purpose.","learningObjectives":["Build community by hosting, serving, and mentoring with sincerity.","Create a checklist for respectful conflict resolution and mutual aid.","Document one story of service each week to inspire others.","Plan a community service action plan with clear dua goals.","Document how supporting another renewed your own heart."],"overview":[{"heading":"Compare Prophetic Stories","content":"Pick two prophets and note how mercy remained the consistent theme.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Compare Prophetic Stories\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Compare Prophetic Stories\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Apply Their Lessons","content":"Find one trial that mirrors your struggle and draw a response from it.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Apply Their Lessons\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Apply Their Lessons\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Honor Every Messenger","content":"Treat each story as equal in its goal to guide you toward Allah.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Honor Every Messenger\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Honor Every Messenger\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Keep Hope","content":"Remember they persevered despite rejection; let that bolster you.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Keep Hope\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Keep Hope\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pray for Strength","content":"Ask Allah for resilience similar to theirs.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pray for Strength\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pray for Strength\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share a Prophetic Tale","content":"Tell someone a short story and explain what it taught you.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share a Prophetic Tale\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share a Prophetic Tale\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Record Insights","content":"Write one sentence about each prophet’s unique lesson.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Record Insights\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Record Insights\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Connect to Quran","content":"Link the story to the verse that mentions it to internalize the context.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Connect to Quran\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Connect to Quran\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Model Their Behavior","content":"Practice their patience, charity, or courage this week.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Model Their Behavior\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Model Their Behavior\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Trust the Promise","content":"Hold onto Allah’s promise of guidance as each prophet did.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Trust the Promise\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Trust the Promise\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Prophet Parallels","content":"Teacher tip: Pair a prophetic story with a present day struggle and prompt learners to draw lessons.","references":"","resources":""},{"heading":"Hope When Rejected","content":"Teacher tip: Explore prophets who faced rejection and have learners write a tie in to their own life.","references":"","resources":""},{"heading":"Share Gratitude to Prophets","content":"Teacher tip: Invite learners to thank Allah for one prophet and include that in dua.","references":"","resources":""},{"heading":"Record Prophetic Traits","content":"Teacher tip: Have learners list traits from two prophets and plan to practice one of them this week.","references":"","resources":""},{"heading":"Trust the Promise","content":"Teacher tip: Remind learners of Allah’s promise to those who persevere and ask them to keep a hope journal.","references":"","resources":""}]},{"chapterId":10,"title":"The Future: Continuous Growth and Legacy","summary":"This chapter helps you set spiritual goals, document progress, and leave enduring impact.","learningObjectives":["Set spiritual goals for 30/90/365 days and review them weekly.","Plan a legacy project that benefits others beyond your lifetime.","Commit to mentoring or teaching to multiply your impact.","Sketch a 20 year impact vision and add one action for this year.","Pair each goal with a dua to keep hope alive."],"overview":[{"heading":"Understand the Roles","content":"List what a mosque provides prayer, learning, charity and value each.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Understand the Roles\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Understand the Roles\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan a Visit","content":"Imagine or visit a mosque with intention to learn.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan a Visit\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan a Visit\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Observe Customs","content":"Note how people greet each other, queue, and share space.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Observe Customs\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Observe Customs\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"See the Mosque as Home","content":"Think about how you can contribute to hospitality even if not local.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'See the Mosque as Home\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'See the Mosque as Home\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Respect the Space","content":"Practice silence, cleanliness, and modesty whenever in the masjid.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Respect the Space\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Respect the Space\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Participate in Charity","content":"Drop a donation or help with maintenance to feel connected.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Participate in Charity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Participate in Charity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Listen to a Khutbah","content":"Pay attention to one talk and write a takeaway.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Listen to a Khutbah\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Listen to a Khutbah\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share Its Purpose","content":"Explain to someone how mosques support new Muslims.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share Its Purpose\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share Its Purpose\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Bring Others","content":"Invite a friend to see how the mosque feels different than their expectations.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Bring Others\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Bring Others\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pray with Presence","content":"Use mosque visits to focus on meaningful dua or dhikr.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pray with Presence\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pray with Presence\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Visit the Mosque in Mind","content":"Teacher tip: Describe the mosque’s hospitality and ask learners to picture entering it with calm intentions.","references":"","resources":""},{"heading":"Respect the Space","content":"Teacher tip: Emphasize silence, cleanliness, and modesty and have learners pledge one respectful action.","references":"","resources":""},{"heading":"Count the Roles","content":"Teacher tip: List mosque roles (prayer, learning, charity) and assign each learner one responsibility to explore.","references":"","resources":""},{"heading":"Volunteer Hands","content":"Teacher tip: Encourage learners to help with a small task and later share what they learned from serving.","references":"","resources":""},{"heading":"Bring Others Along","content":"Teacher tip: Ask learners how they could invite someone to see the mosque and what to say to make them comfortable.","references":"","resources":""}]},{"chapterId":11,"title":"Hereafter Realities, Death, Resurrection, and Mercy","summary":"The Hereafter pulls the heart toward lasting priorities; remembering death, the grave, and accountability strengthens every moment of obedience.","learningObjectives":["Describe the stages of the soul between death and resurrection.","Balance fear and hope in Allah\'s justice and mercy.","Implement a nightly muhasabah routine.","Identify three forms of ongoing charity (sadaqah jariyah).","Share the message of accountability with one trusted friend."],"overview":[{"heading":"Define Halal Broadly","content":"Include speech, finance, and personal conduct when you think halal.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Define Halal Broadly\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Define Halal Broadly\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Audit Choices","content":"Pick one consumption habit and check it against halal principles.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Audit Choices\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Audit Choices\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan a Swap","content":"Replace a questionable option with a clear halal alternative for a day.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan a Swap\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan a Swap\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Speak with Honesty","content":"Practice truth even when it feels hard to keep trust.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Speak with Honesty\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Speak with Honesty\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Track Media","content":"Notice how content affects your heart and adjust it.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Track Media\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Track Media\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Encourage Halal Business","content":"Support vendors who align with sincerity and explain why it matters.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Encourage Halal Business\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Encourage Halal Business\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Recognize Influence","content":"Surround yourself with people who uplift halal values.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Recognize Influence\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Recognize Influence\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Serve with Integrity","content":"Honor commitments even in small tasks so trust builds steadily.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Serve with Integrity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Serve with Integrity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Protect Relationships","content":"Show respect through punctuality, kindness, and fairness.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Protect Relationships\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Protect Relationships\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pray for Guidance","content":"Ask Allah to guide every choice toward honesty.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pray for Guidance\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pray for Guidance\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Define Halal Everywhere","content":"Teacher tip: Explore how halal applies beyond food, including speech, finance, and behavior.","references":"","resources":""},{"heading":"Audit a Choice","content":"Teacher tip: Have learners pick one habit to audit for alignment and note adjustments.","references":"","resources":""},{"heading":"Plan a Halal Swap","content":"Teacher tip: Challenge learners to replace one questionable option with a halal alternative this week.","references":"","resources":""},{"heading":"Honesty in Tough Moments","content":"Teacher tip: Encourage learners to practice truthfulness when it’s hard and reflect on the outcome.","references":"","resources":""},{"heading":"Guard Relationships","content":"Teacher tip: Emphasize punctuality, kindness, and fairness in relationships and let learners set one specific promise.","references":"","resources":""}]},{"chapterId":12,"title":"Paradise and Hell, Rewards, Warnings and Motivation","summary":"Visualize the eternal abodes so gratitude grows and warnings keep you humble.","learningObjectives":["Recall five Quranic descriptions of Paradise.","Explain how the warnings of Hell aim to correct, not condemn.","Apply hope and fear in a practical dua routine.","Identify three actions that increase the chance of entering Jannah.","Share one lesson about the afterlife that inspired your own focus."],"overview":[{"heading":"Affirm Equal Dignity","content":"State how Islam honors humanity while respecting difference.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Affirm Equal Dignity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Affirm Equal Dignity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Shield Boundaries","content":"Respect limits while staying open to serve with compassion.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Shield Boundaries\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Shield Boundaries\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Support Each Other","content":"Help someone of the opposite gender and stress respect.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Support Each Other\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Support Each Other\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Challenge Stereotypes","content":"Speak kindly when you hear unfair assumptions.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Challenge Stereotypes\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Challenge Stereotypes\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Celebrate Cooperation","content":"Work together on a task that shows shared leadership.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Celebrate Cooperation\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Celebrate Cooperation\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Understand Roles","content":"Describe how complementary responsibilities strengthen families.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Understand Roles\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Understand Roles\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Model Compassion","content":"Respond gently when disagreements arise.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Model Compassion\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Model Compassion\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share a Dua","content":"Pray for equitable treatment of all genders.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share a Dua\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share a Dua\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach the Next Generation","content":"Explain to youth why respect matters between men and women.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Teach the Next Generation\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Teach the Next Generation\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Honor Partnerships","content":"Express gratitude for someone who supports you with humility.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Honor Partnerships\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Honor Partnerships\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Mutual Respect Stories","content":"Teacher tip: Share Qur’anic verses and ask learners how they show respect to each gender in their environment.","references":"","resources":""},{"heading":"Boundary Role Play","content":"Teacher tip: Practice saying ‘no’ kindly and model supportive language for establishing boundaries.","references":"","resources":""},{"heading":"Celebrate Cooperation","content":"Teacher tip: Highlight examples where men and women collaborated and invite learners to design a small joint project.","references":"","resources":""},{"heading":"Teach Youth Respect","content":"Teacher tip: Ask learners to craft a short story or activity to explain respect to children.","references":"","resources":""},{"heading":"Pray for Equity","content":"Teacher tip: Include a shared dua for compassionate treatment of all genders and commit to saying it together.","references":"","resources":""}]},{"chapterId":13,"title":"Dua and Dhikr, Weapons of the Heart","summary":"Remembering Allah and asking Him builds resilience and softens every trial.","learningObjectives":["Memorize five short du\'as with meaning.","Link dhikr phrases to different daily moments.","Explain why dua is both hope and humility.","Build a dua routine you can maintain for a month.","Invite at least one friend to participate in dhikr with you."],"overview":[{"heading":"Clarify the Shahada","content":"Explain the testimony’s meaning and emotional weight to new believers.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Clarify the Shahada\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Clarify the Shahada\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Offer Support","content":"List resources or people who can mentor a new Muslim.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Offer Support\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Offer Support\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Document First Steps","content":"Outline actions after shahada like prayer, Quran, and community.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Document First Steps\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Document First Steps\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Affirm Identity","content":"Encourage pride in the new name while staying humble.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Affirm Identity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Affirm Identity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Normalize Questions","content":"Remind them that doubts and curiosity signal growth.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Normalize Questions\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Normalize Questions\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Invite Duas","content":"Pray together for steadiness and protection.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Invite Duas\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Invite Duas\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach a Dua","content":"Share a short supplication they can memorize.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Teach a Dua\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Teach a Dua\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Connect to Community","content":"Explain how the Ummah lifts newcomers.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Connect to Community\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Connect to Community\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan a Celebration","content":"Mark the shahada with shared food or gratitude notes.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan a Celebration\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan a Celebration\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Track Growth","content":"Journal one lesson learned each week.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Track Growth\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Track Growth\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Clarify the Shahada","content":"Teacher tip: Break down the shahada phrase word by word and invite learners to recite it with feeling.","references":"","resources":""},{"heading":"List First Steps","content":"Teacher tip: Outline new Muslim steps (prayer, Quran, community) and let learners map them on a timeline.","references":"","resources":""},{"heading":"Support Circles","content":"Teacher tip: Match learners to welcome new Muslims, share expectations, and plan check ins.","references":"","resources":""},{"heading":"Normalize Questions","content":"Teacher tip: Create a safe Q&A space where all doubts are welcomed.","references":"","resources":""},{"heading":"Celebrate Courage","content":"Teacher tip: Encourage learners to honor someone who embraced Islam and deliver a short note of thanks.","references":"","resources":""}]},{"chapterId":14,"title":"Family, Marriage, Mercy, Dialogue and Legacy","summary":"Homes rooted in mercy, equity, and collective worship mirror the Prophet’s model.","learningObjectives":["Create a family worship routine with dua and Quran time.","Describe three practices that keep marital mercy alive.","Plan a reconciliation step after a misunderstanding.","List two ways to honor parents within your schedule.","Share a nurture plan for the next generation."],"overview":[{"heading":"Celebrate Gratitude","content":"Share what you are thankful for with others during Eid.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Celebrate Gratitude\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Celebrate Gratitude\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Recall the Stories","content":"Remember prophets who celebrated Eid and why their obedience mattered.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Recall the Stories\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Recall the Stories\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan Charity","content":"Pair celebration with an act of giving or care.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan Charity\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan Charity\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Honor the Prayer","content":"Focus on the Eid prayer’s meaning and community energy.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Honor the Prayer\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Honor the Prayer\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Include Family","content":"Invite someone who might feel alone and make space for them.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Include Family\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Include Family\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Balance Sacrifice and Joy","content":"Remember the qurban narrative while enjoying halal feasting.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Balance Sacrifice and Joy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Balance Sacrifice and Joy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share Traditions","content":"Explain greetings, takbeers, and food so others feel welcome.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share Traditions\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share Traditions\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Teach Children","content":"Show youngsters why Eid matters beyond gifts.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Teach Children\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Teach Children\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Reflect on Mercy","content":"Use festive energy to renew commitments to kindness.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Reflect on Mercy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Reflect on Mercy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Plan Ahead","content":"Prepare logistics so Eid feels calm and purposeful.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Plan Ahead\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Plan Ahead\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share Eid Stories","content":"Teacher tip: Tell Eid al Fitr and Eid al Adha stories and ask learners to identify the underlying values.","references":"","resources":""},{"heading":"Plan Charity Together","content":"Teacher tip: Challenge learners to organize a giving act that pairs celebration with service.","references":"","resources":""},{"heading":"Explain Traditions","content":"Teacher tip: Let learners teach one Eid tradition they love and what it means.","references":"","resources":""},{"heading":"Invite the Isolated","content":"Teacher tip: Brainstorm ways to include someone who might feel alone and commit to one outreach.","references":"","resources":""},{"heading":"Reflect on Joy and Sacrifice","content":"Teacher tip: Ask learners to contrast the joy of Eid with the sacrifice it commemorates and journal the balance.","references":"","resources":""}]},{"chapterId":15,"title":"Purifying the Hearts Softness, Humility and Focus","summary":"A heart free from envy, pride, and doubt responds to Allah with trust and love.","learningObjectives":["Implement a three day muhasabah habit.","Recognize two signs that the heart is hardening.","Apply dhikr to calm stress and restore focus.","Plan a charitable act that softens the heart.","Practice gratitude to counter envy."],"overview":[{"heading":"Visualize the Hereafter","content":"Imagine the stages from the grave to Paradise to motivate deeds.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Visualize the Hereafter\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Visualize the Hereafter\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Prioritize Repentance","content":"Use the scales as reminders to return quickly after mistakes.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Prioritize Repentance\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Prioritize Repentance\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Invest in Kindness","content":"Count good acts each day as eternal investments.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Invest in Kindness\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Invest in Kindness\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Balance Hope and Accountability","content":"Pair hope with responsibility when facing temptation.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Balance Hope and Accountability\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Balance Hope and Accountability\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Share the Reminder","content":"Tell a friend one lesson about the afterlife you gained.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Share the Reminder\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Share the Reminder\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Pray for Mercy","content":"Include dua for forgiveness in every prayer session.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Pray for Mercy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Pray for Mercy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Think Legacy","content":"Note how your choices affect others and plan wisely.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Think Legacy\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Think Legacy\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Study Rewards","content":"Learn descriptions of Paradise so hope stays alive.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Study Rewards\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Study Rewards\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Serve Today","content":"Let awareness of the akhira enhance how you serve now.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Serve Today\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Serve Today\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Thank Allah","content":"Express gratitude for the chance to change before the final breath.  Reflect on a concrete step you can take this week, jot it down, and ask Allah to make it easy so the lesson becomes lived rather than just read. Let the \'Thank Allah\' insight shape an upcoming conversation or plan this week so the learning stays alive beyond the page.  Use the \'Thank Allah\' prompt to ask learners how they would apply it in a real scenario and encourage them to share their responses.","references":"","resources":""},{"heading":"Explain the Akhira Sequence","content":"Teacher tip: Walk through the grave, Sirat, scales, and final dwellings while checking for questions.","references":"","resources":""},{"heading":"Balance Hope and Fear","content":"Teacher tip: Invite learners to list actions that fuel both hope and accountability.","references":"","resources":""},{"heading":"Invest in Kindness","content":"Teacher tip: Challenge learners to do one kind act daily as an investment for the hereafter.","references":"","resources":""},{"heading":"Plan Legacy Steps","content":"Teacher tip: Ask learners to note how their choices affect others and set a wise plan.","references":"","resources":""},{"heading":"Thank Allah for Mercy","content":"Teacher tip: Encourage a nightly gratitude listing focused on Allah’s mercy ahead of the final breath.","references":"","resources":""}]}]');

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

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"videos":[{"title":"The Islamic Foundation UK | An Introduction | 47 Years in less then 2 min!","url":"https://www.youtube.com/watch?v=tWe9uaJ6Jhw","description":"A 1:43 introduction that frames Tawheed as the heartbeat of a lifelong Islamic practice."},{"title":"He asked can you summarize the Quran in two minutes? | Dr. Sabeel Ahmed","url":"https://www.youtube.com/watch?v=-smvSXVHEN0","description":"Dr. Sabeel Ahmed nails the essentials of Qur’anic guidance in a sharp one-minute recap suited for the foundation of faith."},{"title":"2 minutes Da\'wah | By Sheikh Uthman Ibn Farooq","url":"https://www.youtube.com/watch?v=OFDSL-f-vjc","description":"A crisp two-minute da’wah reminder that models how to share the message gently while staying grounded in core Tawheed."},{"title":"How Long, Ya Allah? – A Powerful Ramadan Reminder","url":"https://www.youtube.com/watch?v=4mLFfv477VU","description":"A short reflection on timing, intention, and how the foundation of your faith holds fast across every season."}]},{"chapterId":2,"videos":[{"title":"Six Main Beliefs in Islam | Islam Explained","url":"https://www.youtube.com/watch?v=2cyfeAdnEJI","description":"A 2:38 breakdown of the six pillars of Iman that keeps the unseen realities practical and present."},{"title":"Explaining Islam in less than 2 minutes - Animated","url":"https://www.youtube.com/watch?v=H3v-frDiWrM","description":"An animated sketch capturing both belief in Allah and the supporting truths in under two minutes."},{"title":"Six Pillars of Iman *Sheikh Assim al Hakeem*","url":"https://www.youtube.com/watch?v=md4X2-OColc","description":"Sheikh Assim al Hakeem presents concise reminders about each article of faith so the heart stays settled."},{"title":"The 6 pillars of Iman!!! #faith #inspiration","url":"https://www.youtube.com/watch?v=1Y13LLUSJzo","description":"An energetic 25-second summary that sparks curiosity about every pillar without overwhelming the listener."}]},{"chapterId":3,"videos":[{"title":"LEARN the 5 Pillars of ISLAM with ZAKY","url":"https://www.youtube.com/watch?v=mWJ-tlZdtK4","description":"A two-minute walkthrough keeping the five acts of worship clear and memorable."},{"title":"Muslim Shark - The Pillars of Islam - Kids Song","url":"https://www.youtube.com/watch?v=T3DuAFu2ZoY","description":"A melodic reminder (1:57) emphasizing consistency in the five pillars for everyday practice."},{"title":"The 5 Pillars of Islam | A 1-Minute Reminder","url":"https://www.youtube.com/watch?v=9SgLXMd46MU","description":"A serious-minute recap reinforcing the structure every chapter pilgrim relies on."},{"title":"5 Pillars of Islam | Essential Reminder","url":"https://www.youtube.com/watch?v=hghZPv-DJow","description":"A minute-long exhortation that keeps focus on doing the pillars with devotion, not automation."}]},{"chapterId":4,"videos":[{"title":"One of the scariest verse in the Quran #quran","url":"https://www.youtube.com/watch?v=mb4uokqDjSA","description":"A 0:15 reminder that the Quran’s warnings and mercy keep every interaction with the book reverent."},{"title":"2 minute Beautiful Quran soothing Recitation","url":"https://www.youtube.com/watch?v=8qvh2qdmrhc","description":"A calming two-minute recitation to anchor Quranic presence before study."},{"title":"Listen to the Quran. 2 Minutes.","url":"https://www.youtube.com/watch?v=4RZ9lLj012s","description":"A quick auditory snapshot showing how a short session with the Quran refreshes the heart."},{"title":"Allah\'s Reminder: A Wake-Up Call for Every Muslim","url":"https://www.youtube.com/watch?v=PL3GVpsxv0I","description":"Bilal Asaad’s 2:51 reflection keeps Quranic themes practical for daily routines."}]},{"chapterId":5,"videos":[{"title":"Prophet Muhammad ﷺ - The Best Man","url":"https://www.youtube.com/watch?v=_0qUKcPB3m0","description":"A 2:12 moment that celebrates the Prophet’s character so learners can model it."},{"title":"How Islam Began - In Ten Minutes","url":"https://www.youtube.com/watch?v=PDxKxnVZtgo","description":"A short version (6 minutes clipped to keep under 3) of the early prophetic struggle calibrated for focus."},{"title":"Allah forgives all Sins if you ask for it : Muhammad Hoblos","url":"https://www.youtube.com/watch?v=8GgXQEfUhkk","description":"Hoblos highlights prophetic mercy in 30 seconds to keep the Prophet’s compassion alive."},{"title":"The Day of Judgement is CLOSER than we think","url":"https://www.youtube.com/watch?v=Jm-Y6oe_pS0","description":"A 1:22 reminder rooted in prophetic warnings about the coming day."}]},{"chapterId":6,"videos":[{"title":"Salah 🤍 | Islamic Reminder","url":"https://www.youtube.com/watch?v=JytOdwQFyhY","description":"A 1:16 clip urging gratitude for salah as a daily reset."},{"title":"Did You Pray Today? – A Silent Reminder","url":"https://www.youtube.com/watch?v=z51YGil5aaI","description":"A 0:59 nudge to keep the five prayers timely, thoughtful, and grounded."},{"title":"SALAH IS THE MOST IMPORTANT ❤️","url":"https://www.youtube.com/watch?v=z_0_WBC9tBU","description":"A one-minute emphasis on viewing salah as a gift instead of a chore."},{"title":"Salah is a Gift, Not a Burden","url":"https://www.youtube.com/watch?v=nRZjHPIljjQ","description":"A short reminder framing logs of prayer as mercy, not micromanagement."}]},{"chapterId":7,"videos":[{"title":"🌙 Good Manners – A Reflection of Faith","url":"https://www.youtube.com/watch?v=QUQA1zbAbFM","description":"A 19-second clip linking character refinement to sincere devotion."},{"title":"Good manners from the glorious Quran","url":"https://www.youtube.com/watch?v=JTrQ-z2uptM","description":"Quranic phrases remind us in just over 15 seconds how manners heal community."},{"title":"Powerful Islamic Reminder: Elevate Your Character with Good Manners","url":"https://www.youtube.com/watch?v=utU41spHhDg","description":"An 11-second lens on why manners reflect inner belief."},{"title":"A Gentle Handshake & A Lesson for the Heart","url":"https://www.youtube.com/watch?v=DaYSogohu-4","description":"A quick prompt to soften interactions so adab becomes natural."}]},{"chapterId":8,"videos":[{"title":"This 2-Minute Islamic Reminder Will Change Your Life","url":"https://www.youtube.com/watch?v=yFZMJiBoZEY","description":"Momentum for the lifestyle chapter: build habits that expand beyond rituals."},{"title":"Sometimes in Life, People Change – But Allah Never Does","url":"https://www.youtube.com/watch?v=xNtQT3o7GL0","description":"A 1:56 reflection that reorients daily choices toward steady reliance."},{"title":"Trust Allah for everything","url":"https://www.youtube.com/watch?v=yqix_uu-oVo","description":"Quick clarity on tracing sustainable lifestyle choices back to reliance."},{"title":"Stop overthinking This is explanation of some ayat","url":"https://www.youtube.com/watch?v=W0rqKvom5jE","description":"A short pause to help dissolve comparison traps, keeping halal living calm."}]},{"chapterId":9,"videos":[{"title":"HOW TO CULTIVATE HUMILITY & UNITY IN ISLAMIC COMMUNITY?","url":"https://www.youtube.com/watch?v=am2WTrNWvmU","description":"A 52-second spark on bringing unity back into local circles."},{"title":"The Power of Unity: Believers\' Empathy","url":"https://www.youtube.com/watch?v=DNuaXts6O04","description":"A 54-second narration championing community empathy, not just proximity."},{"title":"Unity is essential - it\'s easy to point fingers at others","url":"https://www.youtube.com/watch?v=AX_c2t9-FeU","description":"A 33-second caution against judgment while strengthening collective care."},{"title":"Power in Muslim Unity   Abdul Aziz Waheed","url":"https://www.youtube.com/watch?v=s_BQRV_dtwY","description":"A 1:51 clip showing how teamwork keeps the community steady."}]},{"chapterId":10,"videos":[{"title":"Don\'t Worry About The Future | Mufti Menk","url":"https://www.youtube.com/watch?v=nlu102SETVU","description":"A 60-second reassurance to stay hopeful while planning like a believer."},{"title":"The reward of your sabr | Mufti Menk","url":"https://www.youtube.com/watch?v=yANBKvnOIsE","description":"A quick reminder (0:24) that future progress mirrors patient constancy."},{"title":"Say this when you feel helpless","url":"https://www.youtube.com/watch?v=wLrmNJQi5G4","description":"A 27-second dua to regain perspective on how Allah writes the future."},{"title":"Don\'t be depressed...#MuftiMenk","url":"https://www.youtube.com/watch?v=Kp2qk0yz0e0","description":"A calm 28-second lift for keeping optimism alive."}]},{"chapterId":11,"videos":[{"title":"SAY THIS ALLAH MAKES THE IMPOSSIBLE POSSIBLE","url":"https://www.youtube.com/watch?v=aTJKFYiPI6M","description":"A 1:55 nudge to remember the transient dunya before the Hereafter."},{"title":"2 things that will take you to heaven - Mufti Menk","url":"https://www.youtube.com/watch?v=rOxnWublroE","description":"A 0:37 reflection highlighting deeds that secure the afterlife."},{"title":"This Hadith Will Change How You See Death","url":"https://www.youtube.com/watch?v=R4oycqtj9GY","description":"A 41-second reminder to invest in the eternal account."},{"title":"Surah Al-Mulk Explained in 2 Minutes","url":"https://www.youtube.com/watch?v=tGCpyK4zw8U","description":"A short explanation linking the beloved surah to real eschatological hope."}]},{"chapterId":12,"videos":[{"title":"When Paradise & Hell Argued | Omar Suleiman","url":"https://www.youtube.com/watch?v=HY5rGsfUpO8","description":"A 52-second insight into why both directions demand steady choices."},{"title":"Heaven or Hell? An Islamic Reminder of the Hereafter","url":"https://www.youtube.com/watch?v=XETAluKKJgg","description":"A 2:24 reminder that juxtaposes Paradise and Hell without fear-mongering."},{"title":"Shocking Truth about Paradise and Hellfire Revealed in Short Video","url":"https://www.youtube.com/watch?v=Id4a2pOVzBo","description":"A 56-second explanation that keeps the chapter’s warnings vivid."},{"title":"A reminder for us humans to stay away from the Hell fire","url":"https://www.youtube.com/watch?v=K4NfyR7HBGc","description":"A 61-second motivator to choose the path that leads toward Eden."}]},{"chapterId":13,"videos":[{"title":"Short reminder: Do you know these powerful words?","url":"https://www.youtube.com/watch?v=qANGm2W7mu0","description":"A 61-second focus on meaningful dua that keeps the heart aligned with the chapter’s theme."},{"title":"Dhikr for acceptance of dua","url":"https://www.youtube.com/watch?v=SPGaAS-5ETo","description":"A 38-second toolkit for pairing dhikr with active dua-making."},{"title":"Daily Dhikr: The Path to Remembering Allah Always","url":"https://www.youtube.com/watch?v=bDPC59hsmrA","description":"A 1:07 nudge to layer routine dhikr across the day."},{"title":"seek help with this powerful dua","url":"https://www.youtube.com/watch?v=HY-m2ygpmjE","description":"A 1:21 call to approach Allah with humble language and consistent dhikr."}]},{"chapterId":14,"videos":[{"title":"It’s NOT Divorce That Destroys Families – It’s Toxic Relationships!","url":"https://www.youtube.com/watch?v=ZUUY2V74Fgc","description":"A 2:56 clip highlighting mercy, patience, and conflict repair."},{"title":"Struggle of being single | Abu Taymiyyah","url":"https://www.youtube.com/watch?v=rMjYsfiX5vo","description":"A 33-second reminder to honor marriage plans without anxiety."},{"title":"People Chase Haram & Ignore Their Spouse","url":"https://www.youtube.com/watch?v=bA2Yl1LlleE","description":"A 22-second breakup warning to center marital care over distraction."},{"title":"Your wife or your family first?","url":"https://www.youtube.com/watch?v=KdG0fmTNibc","description":"A 59-second tension diffusing reflection that encourages thoughtful balance."}]},{"chapterId":15,"videos":[{"title":"3 Things That Purify Your Heart","url":"https://www.youtube.com/watch?v=dWwcCjjyX5A","description":"A quick list of steps that keep the heart soft in just 18 seconds."},{"title":"Ibn al-Qayyim\'s advice on purification of the heart","url":"https://www.youtube.com/watch?v=zAW1LcfjIwI","description":"A 58-second clip quoting Ibn al-Qayyim on how love of Allah replaces hardness."},{"title":"The Fastest Way to Soften Your Heart","url":"https://www.youtube.com/watch?v=SDCBMcz0jl4","description":"A one-minute reminder to combine dhikr and gratitude to keep the heart tender."},{"title":"5 Ways to Purify Your Heart","url":"https://www.youtube.com/watch?v=YDgsPnwG5us","description":"A 19-second checklist for guarding hearts against envy, doubt, and pride."}]}]');

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