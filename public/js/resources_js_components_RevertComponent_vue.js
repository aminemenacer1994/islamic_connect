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
/* harmony import */ var _data_lessons_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/lessons.json */ "./resources/js/components/data/lessons.json");
/* harmony import */ var _data_quizzes_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/quizzes.json */ "./resources/js/components/data/quizzes.json");
/* harmony import */ var _data_accordionContent_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/accordionContent.json */ "./resources/js/components/data/accordionContent.json");
/* harmony import */ var _data_premiumResources_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/premiumResources.json */ "./resources/js/components/data/premiumResources.json");
/* harmony import */ var _data_duas_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/duas.json */ "./resources/js/components/data/duas.json");
/* harmony import */ var _data_homework_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data/homework.json */ "./resources/js/components/data/homework.json");
/* harmony import */ var _data_missions_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data/missions.json */ "./resources/js/components/data/missions.json");
/* harmony import */ var _data_onboarding_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data/onboarding.json */ "./resources/js/components/data/onboarding.json");
/* harmony import */ var _data_guidance_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./data/guidance.json */ "./resources/js/components/data/guidance.json");
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
      lessons: normalizeJson(_data_lessons_json__WEBPACK_IMPORTED_MODULE_2__),
      accordionChapters: normalizeJson(_data_accordionContent_json__WEBPACK_IMPORTED_MODULE_4__),
      premiumResources: normalizeJson(_data_premiumResources_json__WEBPACK_IMPORTED_MODULE_5__),
      quizzes: normalizeJson(_data_quizzes_json__WEBPACK_IMPORTED_MODULE_3__),
      missions: normalizeJson(_data_missions_json__WEBPACK_IMPORTED_MODULE_8__),
      duas: normalizeJson(_data_duas_json__WEBPACK_IMPORTED_MODULE_6__),
      guidance: normalizeJson(_data_guidance_json__WEBPACK_IMPORTED_MODULE_10__),
      homework: normalizeJson(_data_homework_json__WEBPACK_IMPORTED_MODULE_7__),
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
      accordionState: 0,
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
      return this.lessonMap[this.selectedPill] || this.lessons[0];
    },
    chapterAccordionPanels() {
      const chapter = this.accordionChapters.find(entry => entry.chapterId === this.selectedPill);
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
      var _this$currentLesson;
      const objectives = ((_this$currentLesson = this.currentLesson) === null || _this$currentLesson === void 0 ? void 0 : _this$currentLesson.learningObjectives) || [];
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
      var _lesson$sections, _lesson$keyInsights, _lesson$keyInsights2;
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
      return ['Welcoming every background without assumptions', 'Encouraging progress, not perfection', 'Keeping language simple and non-technical', 'Avoiding judgment or cultural generalizations'];
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
      const lessonPreview = this.lessons.find(l => l.chapterId === nextId);
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
      var _this$currentLesson2;
      const sections = ((_this$currentLesson2 = this.currentLesson) === null || _this$currentLesson2 === void 0 ? void 0 : _this$currentLesson2.sections) || [];
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
    currentGuidance() {
      var _this$currentLesson3;
      const chapterId = (_this$currentLesson3 = this.currentLesson) === null || _this$currentLesson3 === void 0 ? void 0 : _this$currentLesson3.chapterId;
      return this.guidance.find(entry => entry.chapterId === chapterId) || null;
    },
    lessonVideos() {
      var _this$currentLesson4;
      const videos = ((_this$currentLesson4 = this.currentLesson) === null || _this$currentLesson4 === void 0 ? void 0 : _this$currentLesson4.videos) || [];
      return videos.slice(0, 4);
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
      this.accordionState = null;
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
      this.lessonMap = this.lessons.reduce((map, lesson) => {
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
      var _this$currentLesson5;
      const chapterKey = (_this$currentLesson5 = this.currentLesson) === null || _this$currentLesson5 === void 0 ? void 0 : _this$currentLesson5.chapterId;
      if (!chapterKey) return;
      const current = this.faqState[chapterKey];
      const next = current === index ? null : index;
      this.faqState = _objectSpread(_objectSpread({}, this.faqState), {}, {
        [chapterKey]: next
      });
    },
    isFaqOpen(index) {
      var _this$currentLesson6;
      const chapterKey = (_this$currentLesson6 = this.currentLesson) === null || _this$currentLesson6 === void 0 ? void 0 : _this$currentLesson6.chapterId;
      return this.faqState[chapterKey] === index;
    },
    toggleAccordion(index) {
      this.accordionState = this.accordionState === index ? null : index;
    },
    isAccordionOpen(index) {
      if (this.accordionState === null) return false;
      if (typeof this.accordionState === 'number') {
        return this.accordionState === index;
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
      var _this$currentLesson7;
      const message = `Duas to carry from ${((_this$currentLesson7 = this.currentLesson) === null || _this$currentLesson7 === void 0 ? void 0 : _this$currentLesson7.title) || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`;
      this.openWhatsappShare(message);
    },
    copyDuas() {
      var _this$currentLesson8;
      const text = `Duas to carry from ${((_this$currentLesson8 = this.currentLesson) === null || _this$currentLesson8 === void 0 ? void 0 : _this$currentLesson8.title) || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`;
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
  class: "lesson-meta d-flex gap-3"
};
const _hoisted_32 = {
  class: "badge badge-pill bg-light text-dark fw-semibold"
};
const _hoisted_33 = {
  class: "badge badge-pill bg-white text-teal fw-semibold"
};
const _hoisted_34 = {
  class: "row g-3 mb-4 hero-stats-row"
};
const _hoisted_35 = {
  class: "hero-stat-card d-flex flex-column"
};
const _hoisted_36 = {
  class: "stat-label"
};
const _hoisted_37 = {
  class: "stat-value"
};
const _hoisted_38 = {
  key: 0,
  class: "content-card section-card guidance-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_39 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_40 = {
  class: "guidance-grid"
};
const _hoisted_41 = {
  class: "guidance-card-top"
};
const _hoisted_42 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_43 = {
  class: "guidance-step"
};
const _hoisted_44 = {
  class: "mb-0 text-muted small"
};
const _hoisted_45 = {
  class: "mt-2 fw-semibold"
};
const _hoisted_46 = {
  class: "mt-3 text-muted small"
};
const _hoisted_47 = {
  class: "d-flex align-items-center gap-2 text-dark small fw-medium"
};
const _hoisted_48 = {
  key: 1,
  class: "content-card guided-section-card mb-4 rounded-4"
};
const _hoisted_49 = {
  class: "d-flex align-items-center justify-content-between flex-wrap gap-3 p-3"
};
const _hoisted_50 = {
  class: "d-flex gap-2 flex-wrap"
};
const _hoisted_51 = {
  class: "guided-bullets px-3 pb-3"
};
const _hoisted_52 = {
  class: "guided-step"
};
const _hoisted_53 = {
  class: "mb-0 fw-semibold"
};
const _hoisted_54 = {
  class: "text-muted"
};
const _hoisted_55 = {
  class: "content-card tone-card section-card mb-4 rounded-4"
};
const _hoisted_56 = {
  class: "card-body px-3"
};
const _hoisted_57 = {
  class: "tone-guidelines list-unstyled mb-0"
};
const _hoisted_58 = {
  key: 2,
  class: "content-card onboarding-card mb-4 rounded-4"
};
const _hoisted_59 = {
  class: "card-body px-4 py-3"
};
const _hoisted_60 = {
  class: "simple-onboarding-list mb-0"
};
const _hoisted_61 = {
  class: "d-block"
};
const _hoisted_62 = {
  class: "lesson-focus-intro d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
};
const _hoisted_63 = {
  class: "mb-0 text-muted medium"
};
const _hoisted_64 = {
  key: 3,
  class: "row focus-highlight-row mb-4 g-3"
};
const _hoisted_65 = {
  class: "focus-pill-card p-3 rounded-4 shadow-sm h-100"
};
const _hoisted_66 = {
  class: "d-flex align-items-center justify-content-between mb-1"
};
const _hoisted_67 = {
  class: "focus-pill-label text-muted small"
};
const _hoisted_68 = {
  class: "fw-bold mb-1"
};
const _hoisted_69 = {
  class: "mb-0 text-muted small"
};
const _hoisted_70 = {
  key: 4,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_71 = {
  class: "card-body card-teal px-3 px-md-4"
};
const _hoisted_72 = {
  class: "learning-objectives-grid"
};
const _hoisted_73 = {
  class: "list-group insight-list fs-6 lh-base column-list m-0"
};
const _hoisted_74 = {
  class: "content-card section-card animated-fade-slide mb-4 rounded-4",
  style: {
    "animation-delay": "0.05s"
  }
};
const _hoisted_75 = {
  class: "card-header d-flex align-items-center py-3"
};
const _hoisted_76 = {
  class: "lesson-focus-actions ms-auto"
};
const _hoisted_77 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_78 = {
  class: "d-flex align-items-start gap-3 mb-3"
};
const _hoisted_79 = {
  class: "section-number fs-5"
};
const _hoisted_80 = {
  class: "fw-semibold mb-0 fs-5"
};
const _hoisted_81 = ["innerHTML"];
const _hoisted_82 = {
  key: 0,
  class: "background mt-4 w-100 py-3 px-4 rounded-4 border"
};
const _hoisted_83 = {
  class: "deep-dive-header d-flex align-items-center mb-2"
};
const _hoisted_84 = {
  class: "fw-bold mb-0 text-dark fs-6"
};
const _hoisted_85 = ["innerHTML"];
const _hoisted_86 = {
  key: 0,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_87 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_88 = {
  class: "row g-3"
};
const _hoisted_89 = {
  class: "video-card h-100 d-flex flex-column rounded-3 border shadow-sm overflow-hidden"
};
const _hoisted_90 = {
  class: "ratio ratio-16x9"
};
const _hoisted_91 = ["src", "title"];
const _hoisted_92 = {
  class: "p-3"
};
const _hoisted_93 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_94 = {
  key: 0,
  class: "text-muted small mb-0"
};
const _hoisted_95 = {
  key: 1,
  class: "content-card lesson-focus-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_96 = {
  class: "card-body px-3 px-md-4"
};
const _hoisted_97 = {
  class: "row g-3"
};
const _hoisted_98 = {
  class: "dept-card h-100 p-3 rounded-3"
};
const _hoisted_99 = {
  class: "d-flex align-items-center gap-2 mb-2"
};
const _hoisted_100 = {
  class: "dept-icon"
};
const _hoisted_101 = {
  class: "fs-6 mb-0"
};
const _hoisted_102 = {
  class: "text-muted small mb-1"
};
const _hoisted_103 = {
  class: "text-dark fw-semibold mb-0"
};
const _hoisted_104 = {
  key: 2,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_105 = {
  class: "card-body p-3"
};
const _hoisted_106 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_107 = {
  class: "text-muted small mb-3"
};
const _hoisted_108 = {
  class: "row g-3"
};
const _hoisted_109 = {
  class: "col-12 col-md-6"
};
const _hoisted_110 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_111 = {
  class: "list-unstyled mb-0"
};
const _hoisted_112 = {
  class: "text-dark small mt-1"
};
const _hoisted_113 = {
  class: "col-12 col-md-6"
};
const _hoisted_114 = {
  class: "p-3 rounded-3 border h-100"
};
const _hoisted_115 = {
  class: "list-unstyled mb-0"
};
const _hoisted_116 = {
  class: "text-dark small mt-1"
};
const _hoisted_117 = {
  key: 3,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_118 = {
  class: "card-body p-3"
};
const _hoisted_119 = {
  class: "list-group insight-list fs-6 lh-base"
};
const _hoisted_120 = {
  key: 4,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4"
};
const _hoisted_121 = {
  class: "card-header d-flex align-items-center py-3 gap-3"
};
const _hoisted_122 = {
  class: "lesson-focus-actions ms-auto"
};
const _hoisted_123 = {
  key: 0,
  class: "text-success small mb-0 ms-2"
};
const _hoisted_124 = {
  class: "row g-3"
};
const _hoisted_125 = {
  class: "dua-card h-100 rounded-4 p-4 shadow-lg"
};
const _hoisted_126 = {
  key: 5,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_127 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_128 = ["aria-expanded"];
const _hoisted_129 = {
  class: "d-none d-sm-inline"
};
const _hoisted_130 = {
  class: "card-body p-3"
};
const _hoisted_131 = {
  class: "accordion-stack"
};
const _hoisted_132 = ["onClick"];
const _hoisted_133 = {
  class: "accordion-answer mt-2"
};
const _hoisted_134 = ["innerHTML"];
const _hoisted_135 = {
  key: 6,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_136 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_137 = ["aria-expanded"];
const _hoisted_138 = {
  class: "d-none d-sm-inline"
};
const _hoisted_139 = {
  class: "card-body p-3"
};
const _hoisted_140 = {
  key: 0,
  class: "row row-cols-1 row-cols-md-2 g-3 mb-4"
};
const _hoisted_141 = {
  class: "premium-card h-100 d-flex flex-column"
};
const _hoisted_142 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_143 = {
  class: "small text-muted mb-3"
};
const _hoisted_144 = ["onClick"];
const _hoisted_145 = {
  key: 7,
  id: "mission-card",
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 mission-card"
};
const _hoisted_146 = {
  class: "card-body p-3"
};
const _hoisted_147 = {
  class: "mb-2 text-muted small"
};
const _hoisted_148 = {
  class: "fw-semibold"
};
const _hoisted_149 = {
  class: "text-dark fs-6"
};
const _hoisted_150 = {
  class: "d-flex flex-wrap gap-2 align-items-center mt-3"
};
const _hoisted_151 = {
  class: "badge bg-success text-white rounded-pill"
};
const _hoisted_152 = {
  key: 8,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card"
};
const _hoisted_153 = {
  class: "card-header d-flex align-items-center justify-content-between py-3 gap-3"
};
const _hoisted_154 = ["aria-expanded"];
const _hoisted_155 = {
  class: "d-none d-sm-inline"
};
const _hoisted_156 = {
  class: "card-body p-3"
};
const _hoisted_157 = {
  class: "accordion-stack"
};
const _hoisted_158 = ["onClick"];
const _hoisted_159 = {
  class: "accordion-answer mt-2"
};
const _hoisted_160 = ["innerHTML"];
const _hoisted_161 = {
  class: "content-card next-steps-card animated-slide-up rounded-4 mb-4",
  style: {
    "animation-delay": "0.4s"
  }
};
const _hoisted_162 = {
  class: "card-body p-3"
};
const _hoisted_163 = {
  class: "row g-3"
};
const _hoisted_164 = {
  class: "col-12 col-md-12"
};
const _hoisted_165 = {
  class: "homework-grid"
};
const _hoisted_166 = {
  class: "d-flex align-items-center gap-2 mb-1"
};
const _hoisted_167 = {
  class: "mb-0 text-dark"
};
const _hoisted_168 = {
  key: 9,
  class: "content-card section-card animated-fade-slide mb-4 rounded-4 quiz-wrapper"
};
const _hoisted_169 = {
  class: "quiz-shell p-0"
};
const _hoisted_170 = {
  class: "quiz-header px-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
};
const _hoisted_171 = {
  class: "badge text-dark bg-light rounded-pill px-3 py-2"
};
const _hoisted_172 = {
  class: "quiz-body px-4 py-3"
};
const _hoisted_173 = {
  class: "quiz-progress-wrapper mb-3"
};
const _hoisted_174 = {
  class: "quiz-progress-track"
};
const _hoisted_175 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_176 = {
  class: "mb-0 small fw-semibold text-teal"
};
const _hoisted_177 = {
  class: "fw-semibold text-dark mb-4 quiz-question"
};
const _hoisted_178 = {
  class: "quiz-options-grid"
};
const _hoisted_179 = ["disabled", "onClick"];
const _hoisted_180 = {
  class: "icon-stack"
};
const _hoisted_181 = {
  key: 0,
  class: "bi bi-check-circle-fill text-white"
};
const _hoisted_182 = {
  key: 1,
  class: "bi bi-x-circle-fill text-white"
};
const _hoisted_183 = {
  key: 0,
  class: "quiz-success-note mt-3"
};
const _hoisted_184 = {
  class: "d-flex flex-column flex-md-row gap-2 align-items-start"
};
const _hoisted_185 = {
  class: "mb-0 fw-semibold text-teal"
};
const _hoisted_186 = {
  key: 5,
  class: "content-card transition-card text-dark rounded-4 animated-fade-slide mb-4"
};
const _hoisted_187 = {
  class: "d-flex align-items-center justify-content-between flex-wrap"
};
const _hoisted_188 = {
  class: "fw-semibold mb-0"
};
const _hoisted_189 = {
  class: "mb-1 text-teal small"
};
const _hoisted_190 = {
  class: "text-end"
};
const _hoisted_191 = {
  class: "badge bg-light text-dark rounded-pill px-3 py-2"
};
const _hoisted_192 = {
  class: "text-muted mt-3 mb-0"
};
const _hoisted_193 = {
  class: "actions-card animated-fade-in"
};
const _hoisted_194 = {
  class: "p-4 p-md-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between gap-3"
};
const _hoisted_195 = ["disabled"];
const _hoisted_196 = {
  class: "d-flex flex-column flex-md-row align-items-center gap-2"
};
const _hoisted_197 = {
  class: "text-muted small me-md-auto"
};
const _hoisted_198 = {
  key: 0,
  class: "text-teal small fw-semibold"
};
const _hoisted_199 = ["disabled"];
const _hoisted_200 = {
  key: 0
};
const _hoisted_201 = {
  class: "modal fade show d-block custom-modal-scale",
  tabindex: "-1",
  role: "dialog"
};
const _hoisted_202 = {
  class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
};
const _hoisted_203 = {
  class: "modal-content rounded-4 shadow-lg custom-modal-card"
};
const _hoisted_204 = {
  class: "modal-header border-0 pt-4 px-4"
};
const _hoisted_205 = {
  class: "modal-title fw-bold"
};
const _hoisted_206 = {
  class: "modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3"
};
const _hoisted_207 = {
  key: 0,
  class: "text-success small"
};
const _hoisted_208 = {
  class: "d-flex gap-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson$le, _ctx$currentLesson4, _ctx$currentLesson$se, _ctx$currentLesson5, _ctx$currentLesson6, _ctx$currentLesson7, _ctx$currentLesson8, _ctx$currentLesson9, _ctx$activeResource;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Background Layers "), _cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "background-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Nav Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "mobile-nav-toggle d-lg-none btn btn-light shadow-sm rounded-circle p-3 position-fixed top-3 start-3 z-3",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.mobileNavOpen ? 'bi-x-lg' : 'bi-list'])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Alert "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showSuccessAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill me-2"
  }, null, -1 /* CACHED */)), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Congratulations!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.successMessage), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
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
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Progress Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
  }), 128 /* KEYED_FRAGMENT */))])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT AREA "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "lesson-hero-gradient"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journey me-2 text-white fs-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, " Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.summary), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, " Objectives: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson$le = (_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 || (_ctx$currentLesson4 = _ctx$currentLesson4.learningObjectives) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.length) !== null && _ctx$currentLesson$le !== void 0 ? _ctx$currentLesson$le : 0), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson$se = (_ctx$currentLesson5 = _ctx.currentLesson) === null || _ctx$currentLesson5 === void 0 || (_ctx$currentLesson5 = _ctx$currentLesson5.sections) === null || _ctx$currentLesson5 === void 0 ? void 0 : _ctx$currentLesson5.length) !== null && _ctx$currentLesson$se !== void 0 ? _ctx$currentLesson$se : 0) + " Topics ", 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Stats "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonHeroStats, stat => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: stat.label,
      class: "col-12 col-sm-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "stat-helper text-muted small"
    }, "Premium insights", -1 /* CACHED */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Guidance Row "), _ctx.guidanceCards.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-compass-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Learning Guidance")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.guidanceCards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "guidance-card-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.step), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index === 0 ? 'Start here' : index === 1 ? 'Deepen & personalize' : 'Finish strong'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.description), 1 /* TEXT */)]), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "guidance-line"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-arrow-right-circle-fill text-teal fs-5"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.action), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.guidanceCards.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-teal small mb-1 fw-semibold"
  }, "Guided Pathway"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "mb-1 fw-semibold"
  }, "Follow the curated steps below"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Start with absorb, move through reflection, and end with mastery to keep momentum.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-teal btn-sm fw-semibold",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.scrollToSection(0))
  }, " Jump to Step 1 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal btn-sm fw-semibold",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.scrollToSection(2))
  }, " Highlight Reinforcement ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.guidanceCards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: card.step,
      class: "guided-bullet"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.step), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.action), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center gap-3 py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sunrise-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Gentle Tone + Non-Judgmental Wording"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Tailor your reflection for each chapter with a warm, encouraging voice that stays neutral and inclusive.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_57, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.toneGuidelines, tone => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: tone,
      class: "mb-2"
    }, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle text-teal me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tone), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Onboarding Block "), _ctx.currentOnboardingSteps.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-1 text-muted small text-uppercase"
  }, "Gentle start", -1 /* CACHED */)), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-semibold mb-2"
  }, "Simple welcome for new friends", -1 /* CACHED */)), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-3"
  }, " Take it slow these three ideas hold the key to remembering today’s lesson. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_60, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentOnboardingSteps, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: step.title
    }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "onboarding-bullet-icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "d-block mb-1"
  }, "Focus of this lesson", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$currentLesson6 = _ctx.currentLesson) === null || _ctx$currentLesson6 === void 0 ? void 0 : _ctx$currentLesson6.summary) || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.'), 1 /* TEXT */)])]), _ctx.focusHighlights.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.focusHighlights, highlight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: highlight.label,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.label), 1 /* TEXT */), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-star text-teal"
    }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.detail), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Learning objectives "), _ctx.learningObjectiveColumns.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_70, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-database-fill-check fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Learning Objectives")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.learningObjectiveColumns, (column, columnIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: columnIndex,
      class: "objective-column"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_73, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(column, objective => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: objective,
        class: "list-group-item border-0 px-0 py-3 d-flex align-items-start gap-3"
      }, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check-circle fs-5 mt-1 text-teal"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(objective), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ALL SECTIONS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-seam-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5 flex-grow-1"
  }, "Learning Overview")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.shareLessonOverview && _ctx.shareLessonOverview(...args))
  }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.copyLessonOverview && _ctx.copyLessonOverview(...args))
  }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.printLessonOverview && _ctx.printLessonOverview(...args))
  }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.lessonShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.lessonShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.overviewFontScale}em`,
      lineHeight: 1.6
    })
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson7 = _ctx.currentLesson) === null || _ctx$currentLesson7 === void 0 ? void 0 : _ctx$currentLesson7.sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "section-block mb-5"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_80, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content text-dark fs-6 lh-lg",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale}rem`
      }),
      innerHTML: section.content
    }, null, 12 /* STYLE, PROPS */, _hoisted_81), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb-fill me-2 fs-4 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_84, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "deep-dive-content text-dark fs-6",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: `${_ctx.overviewFontScale * 0.95}rem`
      }),
      innerHTML: section.deepDive.content
    }, null, 12 /* STYLE, PROPS */, _hoisted_85)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "pt-3 mt-3"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Videos "), _ctx.lessonVideos.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_86, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection-play fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Lesson Videos"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0 small"
  }, "Four curated clips to reinforce the chapter.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonVideos, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: video.title,
      class: "col-12 col-md-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_89, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: _ctx.formatVideoUrl(video.url),
      title: video.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_91)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_93, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), video.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Departments Focus "), _ctx.lessonDepartments.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_95, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bar-chart-line-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-0 fs-5"
  }, "Lesson Focus Across Departments"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0 small"
  }, "How this chapter aligns with every pillar of the experience")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.lessonDepartments, dept => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dept.name,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(dept.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.summary), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_103, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dept.detail), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Key Insights "), (_ctx$currentLesson8 = _ctx.currentLesson) !== null && _ctx$currentLesson8 !== void 0 && (_ctx$currentLesson8 = _ctx$currentLesson8.keyInsights) !== null && _ctx$currentLesson8 !== void 0 && _ctx$currentLesson8.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_104, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Do's and Dont's")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [_ctx.currentGuidance ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentGuidance.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_110, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-teal mb-3"
  }, "Do's", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_111, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentGuidance.dos, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: `do-${item}`,
      class: "d-flex align-items-start gap-2 mb-2"
    }, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_112, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_114, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold text-danger mb-3"
  }, "Don'ts", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_115, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentGuidance.donts, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: `dont-${item}`,
      class: "d-flex align-items-start gap-2 mb-2"
    }, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-circle-fill fs-5 text-danger"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Key Insights "), (_ctx$currentLesson9 = _ctx.currentLesson) !== null && _ctx$currentLesson9 !== void 0 && (_ctx$currentLesson9 = _ctx$currentLesson9.keyInsights) !== null && _ctx$currentLesson9 !== void 0 && _ctx$currentLesson9.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_117, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chart-line fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Key Insights")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_119, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentLesson.keyInsights, insight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: insight,
      class: "list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3"
    }, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle fs-5 text-teal"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(insight), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Duas "), _ctx.currentDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_120, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5 flex-grow-1"
  }, "Duas to Carry")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_122, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[6] || (_cache[6] = (...args) => _ctx.shareDuas && _ctx.shareDuas(...args))
  }, [...(_cache[53] || (_cache[53] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-whatsapp fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[7] || (_cache[7] = (...args) => _ctx.copyDuas && _ctx.copyDuas(...args))
  }, [...(_cache[54] || (_cache[54] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-action",
    role: "button",
    tabindex: "0",
    onClick: _cache[8] || (_cache[8] = (...args) => _ctx.printDuas && _ctx.printDuas(...args))
  }, [...(_cache[55] || (_cache[55] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer fs-5"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))]), _ctx.duaShareStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_123, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.duaShareStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${_ctx.duaFontScale}em`,
      lineHeight: 1.5
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_124, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentDuas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dua.arabic,
      class: "col-12 col-md-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_125, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Accordion "), _ctx.chapterAccordionPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_127, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3 flex-grow-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-square-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Common Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1",
    onClick: _cache[9] || (_cache[9] = $event => _ctx.toggleSection('commonQuestions')),
    "aria-expanded": !_ctx.collapsedSections.commonQuestions
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_129, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.commonQuestions ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.commonQuestions ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_128)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_131, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.chapterAccordionPanels, (panel, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: panel.id,
      class: "accordion-item-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-question accordion-trigger d-flex justify-content-between align-items-center w-100", {
        expanded: _ctx.isAccordionOpen(index)
      }]),
      onClick: $event => _ctx.toggleAccordion(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(panel.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAccordionOpen(index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_132), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: panel.body
    }, null, 8 /* PROPS */, _hoisted_134)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen(index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.commonQuestions]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" resources "), _ctx.chapterAccordionPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_135, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_136, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3 flex-grow-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Resources")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1",
    onClick: _cache[10] || (_cache[10] = $event => _ctx.toggleSection('resources')),
    "aria-expanded": !_ctx.collapsedSections.resources
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_138, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.resources ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.resources ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_137)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, [_ctx.premiumResources.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_140, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.premiumResources, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: card.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_141, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_142, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_143, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "mt-auto resource-link d-flex align-items-center justify-content-center gap-2",
      onClick: $event => _ctx.openResource(card)
    }, [...(_cache[60] || (_cache[60] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Explore the resource", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-arrow-up-right"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_144)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.resources]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mission Spotlight "), _ctx.currentMission ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_145, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-flag-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Mission Pulse")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_147, "Current mission tied to chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.chapterId), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_148, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_149, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.summary), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_150, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_151, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentMission.focus), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-sm fw-semibold",
    onClick: _cache[11] || (_cache[11] = (...args) => _ctx.focusMission && _ctx.focusMission(...args))
  }, " View Mission ↓ ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ "), _ctx.chapterAccordionPanels.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3 flex-grow-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Frequently Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1",
    onClick: _cache[12] || (_cache[12] = $event => _ctx.toggleSection('faqs')),
    "aria-expanded": !_ctx.collapsedSections.faqs
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_155, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.collapsedSections.faqs ? 'Show' : 'Hide'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.collapsedSections.faqs ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_154)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_156, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_157, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.chapterAccordionPanels, (panel, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: panel.id,
      class: "accordion-item-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-question accordion-trigger d-flex justify-content-between align-items-center w-100", {
        expanded: _ctx.isAccordionOpen(index)
      }]),
      onClick: $event => _ctx.toggleAccordion(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(panel.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAccordionOpen(index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_158), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_159, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: panel.body
    }, null, 8 /* PROPS */, _hoisted_160)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAccordionOpen(index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.collapsedSections.faqs]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center py-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard-check-fill fs-4 me-3 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold mb-0 fs-5"
  }, "Next Steps & Homework")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_162, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_163, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col-12 col-md-6\">\n                  <div class=\"steps-list\">\n                    <div v-for=\"(step, index) in currentLesson?.nextSteps\" :key=\"step\"\n                      class=\"step-item d-flex align-items-start mb-3\">\n                      <span class=\"step-badge me-3 fs-6\">{{ index + 1 }}</span>\n                      <span class=\"step-text fs-6 lh-base flex-grow-1\">{{ step }}</span>\n                      <i class=\"bi bi-check-circle text-muted ms-2 fs-6\"></i>\n                    </div>\n                  </div>\n                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_164, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_165, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentHomework, (task, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: task,
      class: "homework-task p-3 mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_167, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(task), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz Card "), _ctx.currentQuestion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_168, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_169, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dice-4-fill fs-4 text-teal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold mb-0 fs-5"
  }, "Chapter Quiz")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_171, " Question " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentQuestionIndex + 1) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizQuestions.length), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_172, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_173, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_174, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-progress-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: (_ctx.currentQuestionIndex + (_ctx.quizStatus === 'correct' ? 1 : 0)) / _ctx.quizQuestions.length * 100 + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_175, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-0"
  }, "Progress toward mastery", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_176, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizProgressLabel), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_177, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentQuestion.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_178, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentQuestion.options, option => {
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
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_180, [_ctx.quizStatus === 'correct' && option === _ctx.currentQuestion.answer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_181)) : _ctx.quizStatus === 'incorrect' && option === _ctx.selectedOption ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_182)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_179);
  }), 128 /* KEYED_FRAGMENT */))]), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_183, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-badge-check-fill text-teal me-2 fs-5"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_184, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_185, "Great! " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizRequiredCorrect) + " correct answers recorded.", 1 /* TEXT */), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "The Next Chapter button above is now active.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-teal btn-sm shadow-none",
    onClick: _cache[13] || (_cache[13] = (...args) => _ctx.retryQuiz && _ctx.retryQuiz(...args))
  }, " Retake quiz ")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.chapterQuizPassed && _ctx.nextChapterPreview ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_186, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_187, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted small mb-1"
  }, "Up next", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_188, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_189, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.track), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_190, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_191, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.id), 1 /* TEXT */), _cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "transition-line mt-2"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_192, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextChapterPreview.snippet), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Divider "), _cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "border-top pt-4 mt-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" NAVIGATION BUTTONS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_193, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_194, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-secondary fw-semibold px-4 py-3 fs-6 d-flex align-items-center gap-2", {
      'opacity-50 cursor-not-allowed': _ctx.selectedPill <= 1
    }]),
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[14] || (_cache[14] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[70] || (_cache[70] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_195), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_196, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_197, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPill) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.roadmapData.length), 1 /* TEXT */), _ctx.chapterQuizPassed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_198, "Quiz cleared • Next Chapter unlocked.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn next-btn fw-bold px-4 py-3 fs-6 text-white d-flex align-items-center gap-2", {
      'next-ready': _ctx.chapterQuizPassed && !(_ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext),
      'disabled': _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext || !_ctx.chapterQuizPassed
    }]),
    disabled: _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext || !_ctx.chapterQuizPassed,
    onClick: _cache[15] || (_cache[15] = (...args) => _ctx.completeAndNext && _ctx.completeAndNext(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isWaitingForNext ? 'Processing...' : 'Next Chapter'), 1 /* TEXT */), _cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_199)])])])])])], 4 /* STYLE */), _ctx.showResourceModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_200, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-backdrop fade show custom-modal-backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_201, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_202, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_203, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_204, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_205, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$activeResource = _ctx.activeResource) === null || _ctx$activeResource === void 0 ? void 0 : _ctx$activeResource.title), 1 /* TEXT */)]), _cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body px-4 py-3"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_206, [_ctx.resourceCopyStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_207, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.resourceCopyStatus), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_208, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-dark px-4",
    onClick: _cache[16] || (_cache[16] = (...args) => _ctx.copyResourceLink && _ctx.copyResourceLink(...args))
  }, [...(_cache[73] || (_cache[73] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-link-45deg"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Link ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-teal px-4",
    onClick: _cache[17] || (_cache[17] = (...args) => _ctx.closeResourceModal && _ctx.closeResourceModal(...args))
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

/***/ "./resources/js/components/data/accordionContent.json":
/*!************************************************************!*\
  !*** ./resources/js/components/data/accordionContent.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"key":"foundation","title":"Islamic foundation","faqs":[{"id":"foundation-1","title":"Islamic foundation - What does the Islamic foundation chapter cover?","body":"<p>It explains Tawheed, the oneness of Allah, and how every act of worship roots itself in that testimony.</p>"},{"id":"foundation-2","title":"Islamic foundation - Why is Tawheed considered the foundation of Islamic faith?","body":"<p>Tawheed affirms that Allah alone deserves worship, so every belief, law, and character trait rests on that unity.</p>"},{"id":"foundation-3","title":"Islamic foundation - How should I keep the foundation alive in everyday decisions?","body":"<p>Anchor intentions in Allah, audit actions for signs of shirk, and repeat the shahada when distractions appear.</p>"},{"id":"foundation-4","title":"Islamic foundation - What are common mistakes learners make about this chapter?","body":"<p>Treating Tawheed as abstract, idolizing culture, or neglecting accountability; the chapter warns against these errors.</p>"},{"id":"foundation-5","title":"Islamic foundation - Which practices help strengthen the Islamic foundation?","body":"<p>Daily dhikr, Quran reflection on Allah\'s names, learning seerah highlights, and teaching others keeps the foundation firm.</p>"}]},{"chapterId":2,"key":"beliefs","title":"Islamic beliefs","faqs":[{"id":"beliefs-1","title":"Islamic beliefs - What are the six articles of faith?","body":"<p>Belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree of the good and the bad.</p>"},{"id":"beliefs-2","title":"Islamic beliefs - How can I live more mindful of Allah, angels, and books?","body":"<p>Remember that angels record deeds, treat revelation with reverence, and reserve time for Quran reading and gratitude.</p>"},{"id":"beliefs-3","title":"Islamic beliefs - What role does qadar, divine decree, play in this chapter?","body":"<p>It teaches trust by reminding us that everything happens by Allah\'s will, so we plan while relying on Him and thanking Him in every trial.</p>"},{"id":"beliefs-4","title":"Islamic beliefs - How does belief in prophets connect to other articles?","body":"<p>Prophets bring the books, model submission, and confirm the unseen truths that the chapter lists, making the whole faith coherent.</p>"},{"id":"beliefs-5","title":"Islamic beliefs - How do I strengthen my iman through the beliefs chapter?","body":"<p>Review each article, state them aloud, teach them, and act in ways that reflect trust in Allah\'s knowledge.</p>"}]},{"chapterId":3,"key":"pillars","title":"Islamic pillars","faqs":[{"id":"pillars-1","title":"Islamic pillars - Why are the five pillars called pillars?","body":"<p>They uphold Muslim life: declaration of faith, prayer, charity, fasting, and pilgrimage form the stable framework.</p>"},{"id":"pillars-2","title":"Islamic pillars - How should I balance the five pillars with work or school?","body":"<p>Schedule worship, build routines, seek accommodations for prayer, pair zakat with budgeting, and use Ramadan to rehearse.</p>"},{"id":"pillars-3","title":"Islamic pillars - What is the easiest pillar for beginners to start practicing?","body":"<p>Shahada and salah are immediate; say the testimony, then commit to punctual prayers while learning the others.</p>"},{"id":"pillars-4","title":"Islamic pillars - How can I keep my intention pure for each pillar?","body":"<p>Remind yourself you do it for Allah, not praise, and repeat a short dua before every act.</p>"},{"id":"pillars-5","title":"Islamic pillars - What resources does this chapter recommend for mastering the pillars?","body":"<p>Basic guides, mentor-led classes, Quran verses on worship, and sticky-note reminders on goals keep actions consistent.</p>"}]},{"chapterId":4,"key":"quran","title":"Islamic quran","faqs":[{"id":"quran-1","title":"Islamic quran - Why is the Quran the heart of this chapter?","body":"<p>It is Allah\'s final revelation, providing law, guidance, and a living connection to Him.</p>"},{"id":"quran-2","title":"Islamic quran - How do I begin reading the Quran with meaning?","body":"<p>Start with short surahs, read translation alongside, reflect on a verse a day, and ask Allah for understanding.</p>"},{"id":"quran-3","title":"Islamic quran - What etiquette should I observe when handling the Quran?","body":"<p>Be in a clean state, say bismillah, listen attentively, and avoid rushing through the text.</p>"},{"id":"quran-4","title":"Islamic quran - How does studying tajweed fit the chapter?","body":"<p>Tajweed preserves beauty; practicing correct pronunciation honors the divine speech and boosts confidence.</p>"},{"id":"quran-5","title":"Islamic quran - Which habits keep the Quran close after the chapter?","body":"<p>Memorize small portions, journal reflections, teach others, listen to recitations, and recite before sleeping.</p>"}]},{"chapterId":5,"key":"prophet","title":"Islamic prophet","faqs":[{"id":"prophet-1","title":"Islamic prophet - What is the focus of the Prophet chapter?","body":"<p>It narrates Muhammad\'s life, teaching mercy, patience, and how to implement the Sunnah today.</p>"},{"id":"prophet-2","title":"Islamic prophet - Why is following the Prophet example necessary?","body":"<p>He is the best interpreter of the Quran and shows how to worship, treat people, and stay humble.</p>"},{"id":"prophet-3","title":"Islamic prophet - Which stories does the chapter highlight?","body":"<p>His childhood, migration, compassionate leadership, treatment of enemies, and devotion to repentance are central.</p>"},{"id":"prophet-4","title":"Islamic prophet - How do I bring his manners into my home?","body":"<p>Practice gentle speech, serve family, forgive quickly, keep evenings with dhikr, and share meals generously.</p>"},{"id":"prophet-5","title":"Islamic prophet - How should I send blessings upon him as the chapter teaches?","body":"<p>Say sallallahu alayhi wa sallam after his name, learn short salawat phrases, and include him in each dua.</p>"}]},{"chapterId":6,"key":"prayers","title":"Islamic prayers","faqs":[{"id":"prayers-1","title":"Islamic prayers - How many obligatory prayers are there?","body":"<p>Five daily prayers - Fajr, Dhuhr, Asr, Maghrib, and Isha - each with a specific window of time.</p>"},{"id":"prayers-2","title":"Islamic prayers - How do I learn wudu and salah correctly?","body":"<p>Follow step-by-step tutorials, pray with an experienced friend, memorize the words, and repeat frequently.</p>"},{"id":"prayers-3","title":"Islamic prayers - What is khushu and how do I build it?","body":"<p>Khushu is calm focus; slow down, picture standing before Allah, and recite meanings during prayer.</p>"},{"id":"prayers-4","title":"Islamic prayers - Where do Sunnah prayers fit this chapter?","body":"<p>They supplement obligations, deepen connection, and mirror the Prophet routine in each prayer block.</p>"},{"id":"prayers-5","title":"Islamic prayers - What if I make mistakes during prayer?","body":"<p>Stay humble, perform sujud sahw when needed, ask Allah for forgiveness, and view mistakes as learning steps.</p>"}]},{"chapterId":7,"key":"manners","title":"Islamic manners","faqs":[{"id":"manners-1","title":"Islamic manners - What defines Islamic manners?","body":"<p>Adab - behaving with respect, gentleness, truthfulness, and awareness of others - guides every interaction.</p>"},{"id":"manners-2","title":"Islamic manners - How do I manage anger with good manners?","body":"<p>Pause, breathe, lower your voice, whisper a dua, and choose patience instead of a sharp response.</p>"},{"id":"manners-3","title":"Islamic manners - How should I greet people?","body":"<p>Offer salam, smile, make eye contact, and mention their name to show care.</p>"},{"id":"manners-4","title":"Islamic manners - What does the chapter say about speech?","body":"<p>Speak truthfully, avoid gossip, praise sincerely, and weigh words before sharing.</p>"},{"id":"manners-5","title":"Islamic manners - How do I show manners online?","body":"<p>Keep comments kind, avoid heated debates, give the benefit of the doubt, and unplug when things turn toxic.</p>"}]},{"chapterId":8,"key":"lifestyle","title":"Islamic lifestyle","faqs":[{"id":"lifestyle-1","title":"Islamic lifestyle - What is an Islamic lifestyle?","body":"<p>It harmonizes diet, finance, leisure, and ethics with halal choices, gratitude, and steady worship.</p>"},{"id":"lifestyle-2","title":"Islamic lifestyle - How do I ensure my food and money stay halal?","body":"<p>Check labels, ask vendors, keep clear records, and choose halal providers even when it takes extra effort.</p>"},{"id":"lifestyle-3","title":"Islamic lifestyle - How does the chapter explain technology use?","body":"<p>Use it for learning, connection, and good causes while setting screen-time limits and avoiding harmful content.</p>"},{"id":"lifestyle-4","title":"Islamic lifestyle - What role does rest and self-care play?","body":"<p>Balanced rest honors the trust Allah gave us; schedule prayer breaks and go to bed early.</p>"},{"id":"lifestyle-5","title":"Islamic lifestyle - How do I maintain modesty in lifestyle choices?","body":"<p>Dress modestly, guard your gaze, speak with humility, and distance from environments that encourage excess.</p>"}]},{"chapterId":9,"key":"community","title":"Islamic community","faqs":[{"id":"community-1","title":"Islamic community - What responsibilities do Muslims have toward the Ummah?","body":"<p>Support one another, share knowledge, stand for justice, and help those in need.</p>"},{"id":"community-2","title":"Islamic community - How can I serve my local community?","body":"<p>Volunteer at masjid events, check on neighbors, and share resources like food or skills.</p>"},{"id":"community-3","title":"Islamic community - What does the chapter teach about conflict resolution?","body":"<p>Listen, speak calmly, seek mediation, forgive when possible, and follow Quranic principles.</p>"},{"id":"community-4","title":"Islamic community - How do I include newcomers?","body":"<p>Greet them, introduce them to circles, invite them to study, and show hospitality.</p>"},{"id":"community-5","title":"Islamic community - How can I lead or mentor responsibly?","body":"<p>Model compassion, stay accountable, plan inclusive programs, and keep learning.</p>"}]},{"chapterId":10,"key":"future","title":"Islamic future","faqs":[{"id":"future-1","title":"Islamic future - How does this chapter frame the future?","body":"<p>As a continuous journey of growth, planning, and trusting Allah\'s guidance.</p>"},{"id":"future-2","title":"Islamic future - What steps help me set spiritual goals?","body":"<p>Define measurable acts, schedule reviews, and tie each goal to Quranic reminders.</p>"},{"id":"future-3","title":"Islamic future - How should I handle setbacks in spiritual growth?","body":"<p>Return to dua, revisit your plan, learn from mistakes, and rely on supportive friends.</p>"},{"id":"future-4","title":"Islamic future - What habits protect my future from burnout?","body":"<p>Pace learning, take rest days, celebrate small wins, and keep a gratitude checklist.</p>"},{"id":"future-5","title":"Islamic future - How can I mentor others while pursuing my future?","body":"<p>Share routines, offer encouragement, build accountability pairs, and pray for them.</p>"}]},{"chapterId":11,"key":"hereafter","title":"Islamic hereafter","faqs":[{"id":"hereafter-1","title":"Islamic hereafter - What key realities about the hereafter does the chapter cover?","body":"<p>It explains death, the grave, standing before Allah, and the scales of deeds.</p>"},{"id":"hereafter-2","title":"Islamic hereafter - How should I prepare for the grave?","body":"<p>Live with regular repentance, maintain good deeds, and keep ties with family.</p>"},{"id":"hereafter-3","title":"Islamic hereafter - Why is the Day of Judgment important?","body":"<p>It restores justice, rewards the patient, and reminds us that every deed is recorded.</p>"},{"id":"hereafter-4","title":"Islamic hereafter - How do I balance fear and hope about akhirah?","body":"<p>Fear the consequences of sin, but keep hope in Allah\'s mercy by doing good.</p>"},{"id":"hereafter-5","title":"Islamic hereafter - What role does charity play in the hereafter?","body":"<p>Sadaqah keeps giving after we pass, so the chapter encourages consistent giving.</p>"}]},{"chapterId":12,"key":"paradise","title":"Islamic paradise and hell","faqs":[{"id":"paradise-1","title":"Islamic paradise and hell - How does the chapter describe paradise?","body":"<p>Gardens beneath which rivers flow, peace, reunions with loved ones, and endless pleasure.</p>"},{"id":"paradise-2","title":"Islamic paradise and hell - What actions open the doors of paradise?","body":"<p>Faith, prayer, charity, patience, and kindness while avoiding major sins.</p>"},{"id":"paradise-3","title":"Islamic paradise and hell - How is hell portrayed?","body":"<p>As intense fire, regret, and punishment for rejecting truth or committing injustice.</p>"},{"id":"paradise-4","title":"Islamic paradise and hell - How do I keep hope without ignoring warnings?","body":"<p>Remember Allah\'s mercy daily and live in obedience to avoid the fire.</p>"},{"id":"paradise-5","title":"Islamic paradise and hell - What reminders keep paradise and hell relevant?","body":"<p>Visualize them during dua, read verses about them, and let them motivate ethical choices.</p>"}]},{"chapterId":13,"key":"duas","title":"Islamic dua dhkir","faqs":[{"id":"duas-1","title":"Islamic dua dhkir - Why are dua and dhikr called weapons?","body":"<p>They guard hearts, invite mercy, and counter shaytan whisperings.</p>"},{"id":"duas-2","title":"Islamic dua dhkir - How do I make dua effectively?","body":"<p>Start with praise, send blessings on the Prophet, ask with humility, and close with aameen.</p>"},{"id":"duas-3","title":"Islamic dua dhkir - What kinds of dhikr can I do daily?","body":"<p>SubhanAllah, Alhamdulillah, Allahu Akbar, La ilaha illallah, and Ayat al-Kursi repeated with focus.</p>"},{"id":"duas-4","title":"Islamic dua dhkir - How can I keep dhikr from becoming mechanical?","body":"<p>Think of each phrase, connect to its meaning, and make it part of conversations with Allah.</p>"},{"id":"duas-5","title":"Islamic dua dhkir - What times are best for dua and dhikr?","body":"<p>After prayers, between adhan and iqamah, during tahajjud, and in the last third of night or on journeys.</p>"}]},{"chapterId":14,"key":"family","title":"Islamic family and marriage","faqs":[{"id":"family-1","title":"Islamic family and marriage - What principles guide family life in the chapter?","body":"<p>Love, mercy, respect, communication, and shared worship make the home a sanctuary.</p>"},{"id":"family-2","title":"Islamic family and marriage - How do spouses maintain mercy and justice?","body":"<p>Treat each other gently, consult on decisions, divide work fairly, and keep dua together.</p>"},{"id":"family-3","title":"Islamic family and marriage - What should I do before marriage?","body":"<p>Perform istikhara, seek halal introductions, discuss values, and involve guardians.</p>"},{"id":"family-4","title":"Islamic family and marriage - How does the chapter advise raising children?","body":"<p>Teach Quran, model manners, set routines, and nurture curiosity and gratitude.</p>"},{"id":"family-5","title":"Islamic family and marriage - What conflict resolution tips does the chapter offer?","body":"<p>Listen without interrupting, meet with cool heads, involve neutral family, and forgive.</p>"}]},{"chapterId":15,"key":"heart","title":"Islamic heart","faqs":[{"id":"heart-1","title":"Islamic heart - What does the chapter say about the heart?","body":"<p>It focuses on purification, removing diseases like envy, pride, and attachment to status.</p>"},{"id":"heart-2","title":"Islamic heart - How do I purify my heart from envy?","body":"<p>Celebrate others, count blessings, make dua for them, and remember everything belongs to Allah.</p>"},{"id":"heart-3","title":"Islamic heart - What is muhasabah?","body":"<p>Self-accounting: reviewing your day, repenting, and planning improvements before sleep.</p>"},{"id":"heart-4","title":"Islamic heart - How do I keep the heart soft toward Allah?","body":"<p>Recite Quran, give charity, help others, and make moments of quiet reflection.</p>"},{"id":"heart-5","title":"Islamic heart - How does dhikr guard against spiritual diseases?","body":"<p>Frequent remembrance reinforces humility, reminds you of accountability, and calms the soul.</p>"}]}]');

/***/ }),

/***/ "./resources/js/components/data/duas.json":
/*!************************************************!*\
  !*** ./resources/js/components/data/duas.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"duas":[{"arabic":"رَبِّ زِدْنِي عِلْمًا","english":"My Lord, increase me in knowledge."},{"arabic":"اللَّهُمَّ ثَبِّتْ قُلُوبَنَا عَلَى الْحَقِّ","english":"O Allah, keep our hearts firm on truth."},{"arabic":"اللَّهُمَّ اجْعَلْنَا مِنَ الْمُسْلِمِينَ الْمُتَّقِينَ","english":"O Allah, make us among the righteous Muslims."}]},{"chapterId":2,"duas":[{"arabic":"اللَّهُمَّ ارْزُقْنِي إِيمَانًا عَامِلًا","english":"O Allah, grant me faith that translates into action."},{"arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","english":"Our Lord, do not let our hearts deviate."},{"arabic":"اللَّهُمَّ عَلِّمْنِي مَا يَرْتَفِعُ بِهِ إِيمَانِي","english":"O Allah, teach me what raises my belief."}]},{"chapterId":3,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْنِي مِنَ الْمُقِيمِينَ الصَّلَاةَ","english":"O Allah, make me among those who establish the prayer."},{"arabic":"رَبِّ اجْعَلْ صِيَامِي شُكْرًا لَكَ","english":"My Lord, let my fast be a thank-you to You."},{"arabic":"اللَّهُمَّ اقْبَلْ مِنَّا الصَّدَقَةَ","english":"O Allah, accept charity from us."}]},{"chapterId":4,"duas":[{"arabic":"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ هُدَاكَ","english":"O Allah, open for me the doors of Your guidance."},{"arabic":"رَبِّ زِدْنِي فَهْمًا","english":"My Lord, increase me in understanding."},{"arabic":"اللَّهُمَّ اجْعَلْ لِي الْقُرْآنَ رَحْمَةً وَنُورًا","english":"O Allah, make the Quran a mercy and light for me."}]},{"chapterId":5,"duas":[{"arabic":"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ","english":"O Allah, send blessings upon Muhammad."},{"arabic":"اللَّهُمَّ عَلِّمْنِي سُنَّتَهُ","english":"O Allah, teach me his Sunnah."},{"arabic":"اللَّهُمَّ أَحْيِ قَلْبِي بِهَدْيِهِ","english":"O Allah, revive my heart with his guidance."}]},{"chapterId":6,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْ لِي فِي الصَّلَاةِ خُشُوعًا","english":"O Allah, grant me focus in prayer."},{"arabic":"رَبِّ أَعِنِّي عَلَى أَدَائِهَا","english":"My Lord, help me perform it."},{"arabic":"اللَّهُمَّ اجْعَلْهَا حَبَلًا بَيْنِي وَبَيْنَكَ","english":"O Allah, make it a bond between me and You."}]},{"chapterId":7,"duas":[{"arabic":"اللَّهُمَّ زَيِّنِي بِالأَدَبِ","english":"O Allah, beautify me with good manners."},{"arabic":"رَبِّ أَنْجِنِي مِنْ غَضَبِ صَدْرِي","english":"My Lord, save me from the anger of my chest."},{"arabic":"اللَّهُمَّ اجْعَلْ لِسَانِي لُطْفًا","english":"O Allah, make my speech gentle."}]},{"chapterId":8,"duas":[{"arabic":"اللَّهُمَّ بَارِكْ فِي رِزْقِي","english":"O Allah, bless my provision."},{"arabic":"رَبِّ أَنْقِذْنِي مِنَ الْغَفْلَةِ","english":"My Lord, rescue me from heedlessness."},{"arabic":"اللَّهُمَّ اجْعَلْنِي آخِذًا بِالْحَلالِ","english":"O Allah, make me one who holds to halal."}]},{"chapterId":9,"duas":[{"arabic":"اللَّهُمَّ اجْمَعْنَا عَلَى الْمَحَبَّةِ","english":"O Allah, unite us in love."},{"arabic":"رَبِّ أَصْلِحْ شِيعَتِي","english":"My Lord, reform my community."},{"arabic":"اللَّهُمَّ أَخْرِجْنِي مِنَ الْعُزْلَةِ لِلْخِدْمَةِ","english":"O Allah, move me from isolation into service."}]},{"chapterId":10,"duas":[{"arabic":"رَبِّ إِنِّي أَسْأَلُكَ نُورًا لِطَرِيقِي","english":"My Lord, I ask You for light for my path."},{"arabic":"اللَّهُمَّ اشْدُدْ صُدُورَنَا لِلدَّوَامِ","english":"O Allah, strengthen our chests for steadiness."},{"arabic":"رَبِّ هَبْ لِي قَلْبًا سَلِيمًا لِمَا بَعْدَ","english":"My Lord, grant me a sound heart for what comes next."}]},{"chapterId":11,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْ قَبْرِي رَوْضَةً","english":"O Allah, make my grave a garden."},{"arabic":"رَبِّ أَدْخِلْنِي الْجَنَّةَ مَعَ الْمُتَّقِينَ","english":"My Lord, admit me into Paradise with the righteous."},{"arabic":"اللَّهُمَّ أَعِنِّي عَلَى الذِّكْرِ وَالْعَمَلِ الْجَيِّدِ حَتَّى الْمَوْتِ","english":"O Allah, help me remember You and do good deeds until death."}]},{"chapterId":12,"duas":[{"arabic":"اللَّهُمَّ اجْعَلْنِي مِنْ أَصْحَابِ الْجَنَّةِ","english":"O Allah, make me among the companions of Paradise."},{"arabic":"رَبِّ اجْعَلْ قَلْبِي يَخْشَى النَّارَ","english":"My Lord, make my heart fear the Fire."},{"arabic":"اللَّهُمَّ اجْعَلْ لِي مِنْ أَشْجَارِ الْجَنَّةِ ظِلًّا","english":"O Allah, grant me shade from the trees of Paradise."}]},{"chapterId":13,"duas":[{"arabic":"سُبْحَانَ اللَّهِ","english":"Glory be to Allah."},{"arabic":"الْحَمْدُ لِلَّهِ","english":"All praise is due to Allah."},{"arabic":"اللَّهُ أَكْبَرُ","english":"Allah is the Greatest."}]},{"chapterId":14,"duas":[{"arabic":"رَبِّ أَصْلِحْ بَيْتِي","english":"My Lord, rectify my household."},{"arabic":"اللَّهُمَّ أَلِفْ بَيْنَ قُلُوبِنَا","english":"O Allah, bring hearts together."},{"arabic":"رَبِّ اجْعَلْ ذُرِّيَّتِي مِنَ الصَّالِحِينَ","english":"My Lord, make my offspring among the righteous."}]},{"chapterId":15,"duas":[{"arabic":"اللَّهُمَّ طَهِّرْ قَلْبِي","english":"O Allah, purify my heart."},{"arabic":"رَبِّ اجْعَلْ قَلْبِي مُتَوَجِّهًا إِلَيْكَ","english":"My Lord, make my heart turn to You."},{"arabic":"اللَّهُمَّ اجْعَلْ ذِكْرَكَ نُورًا لِي","english":"O Allah, make Your remembrance a light for me."}]}]');

/***/ }),

/***/ "./resources/js/components/data/guidance.json":
/*!****************************************************!*\
  !*** ./resources/js/components/data/guidance.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"description":"Let Tawheed be the filter over every choice—your words, goals, and relationships always trace back to the single testimony.","dos":["Say the full Shahada when doubt surfaces, reminding yourself Allah alone is Lord.","Create a short dhikr routine each morning to renew the primordial covenant.","Teach a child or sibling the meaning of Tawheed, locking it in through repetition.","Audit every intention before action: does it glorify Allah or something else?","Anchor your dua in gratitude for the Oneness that rescues every hardship."],"donts":["Avoid idolizing personalities, objects, or routines that shift focus away from Allah.","Don’t treat Tawheed as abstract theory—practice it in worship and speech.","Stay away from circular doubt; answer it immediately with Qur’an and dua.","Do not downplay the warning of shirk; label subtle compromises clearly.","Never rely on cultural status as proof of belief—always return to the covenant."]},{"chapterId":2,"description":"The six pillars breathe life into the unseen; keep each pillar visible so doubt doesn’t creep in between them.","dos":["Recite the Hadith of Jibril weekly to reinforce what you believe.","Thank Allah for every angel, book, and prophet who supports your iman.","Share one unseen reality (angel, qadar, akhirah) with a friend each week.","Track moments when qadar feels heavy and respond with patience.","Review your testimony to the prophets before starting major plans."],"donts":["Don’t ignore the unseen by only chasing what you can measure.","Avoid reducing belief to emotion—anchor it in knowledge and gratitude.","Do not dismiss the Qur’an as optional; it is the pillar that supports everything else.","Don’t treat qadar as defeat; instead pair it with dua.","Stay away from comparing faith to others; focus on personal growth."]},{"chapterId":3,"description":"The Five Pillars are your daily rhythm—keep them deliberate so worship does not become noise.","dos":["Plan every dawah, zakat calculation, and fasting day with a checklist.","Pray a full salah with focus before rushing into work.","Use Ramadan to rehearse the pillars for the rest of the year.","Give sadaqah immediately after zakat to taste the mercy.","Speak the Shahada aloud every time you begin a new project."],"donts":["Don’t let pride creep into your pillars; keep intention pure.","Avoid skipping pillars because you feel tired—push gently with support.","Don’t treat Hajj/Umrah as a trophy; maintain humility in the days after.","Never show off charity; keep giving quiet and sincere.","Do not rush through salah; stretch moments of sujood and gratitude."]},{"chapterId":4,"description":"The Qur’an is alive—read, reflect, and respond so the words stay warm instead of collecting dust.","dos":["Read a verse slowly, write a one-line reflection, then turn it into dua.","Pair tajweed practice with a translation to keep both beauty and meaning.","Keep a pocket notebook of favorite ayahs and revisit them monthly.","Teach one verse and its lesson to someone else every week.","Recite aloud before sleep to let the Qur’an seep into your dream space."],"donts":["Don’t treat the Qur’an as decoration for the shelf; keep it in your hands.","Avoid mindless recitation—pause to understand what you’re saying.","Never skip Quran time because you feel ‘too busy’; schedule the minutes.","Do not ignore the tafsir; sometimes insight comes from the backstory.","Don’t let the phone replace the mushaf; keep the physical copy nearby."]},{"chapterId":5,"description":"Study the Prophet ﷺ like a mirror—his mercy, routines, and speech show how kindness wins hearts.","dos":["Share one story of the Prophet’s mercy with your circle each day.","Practice his morning or evening routine for a solid week.","Defend his character with calm argumentation when criticism arises.","Bring small acts of service (water, tea, dua) into your home.","Turn every decision back to how he handled a similar moment."],"donts":["Don’t mimic mere culture; follow the Prophet’s timeless manners.","Avoid devaluing hadith—check authenticity before quoting.","Never forget his balance between worship and family time.","Do not treat sirah as a lecture; live it with reverence.","Stay away from extremes when defending him; choose humility."]},{"chapterId":6,"description":"Prayer is the pulse that syncs your rhythm to Allah—protect it with intention and presence.","dos":["Stand five minutes early to breathe and set intention before salah.","Keep a dua sheet beside your prayer mat to personalize each rak’ah.","Attend one congregational prayer weekly to feel the Ummah’s energy.","Record your khushu level and adjust what distracts you.","Stretch out rukū’ and sujūd; let silence speak before moving on."],"donts":["Don’t treat salah as a box to tick; feel each posture.","Avoid scrolling your phone before prayer; guard the mind.","Never skip sunnah prayers thinking fard is enough.","Do not rush through surahs without focus—they’re divine speech.","Don’t ignore late-night duas; they sweeten daytime obligations."]},{"chapterId":7,"description":"Adab amplifies every interaction; let your manners mirror the softness of Prophet ﷺ in every space.","dos":["Greet every person with a smile and salam, even if you’re rushed.","Listen fully before speaking—give the gift of your attention.","Respond to criticism with calm dua for the person who challenged you.","Send a handwritten note of gratitude once a month.","Practice speaking without raising your voice; gentle words strengthen bonds."],"donts":["Don’t gossip; if you wouldn’t say it to their face, keep it silent.","Avoid quick judgments—ask questions instead of assuming.","Never let pride dictate how you treat service staff or family.","Do not interrupt someone mid-sentence; wait patiently.","Stay away from sharp humor that cuts rather than heals."]},{"chapterId":8,"description":"Islamic lifestyle means daily harmony—align your food, finance, and rest with halal intention.","dos":["Plan one halal meal each week and eat with gratitude.","Track screen time and insert dua reminders during breaks.","Maintain a modest budget that includes sadaqah and rest.","Schedule two screen-free hours for family and reflection.","Pack restful pauses into your week to recharge before worship."],"donts":["Don’t chase every trend that drains focus from worship.","Avoid eating impulsively; make meals mindful acts of thanks.","Never justify haram shortcuts for convenience.","Do not let digital noise dictate your bedtime.","Stay away from comparing lifestyles; follow the halal path set for you."]},{"chapterId":9,"description":"Community needs intention—serve, host, and uplift with generous hearts.","dos":["Invite someone new into your home with dua and intentional hospitality.","Share resources (time, money, skills) before you’re ‘ready’—it multiplies barakah.","Listen carefully when conflicts arise and propose solutions calmly.","Plan one mentoring touchpoint with someone younger each month.","Document success stories to motivate the circle forward."],"donts":["Don’t isolate yourself when the Ummah needs you most.","Avoid spreading rumours or half-truths in the name of news.","Never exclude others because they look different—everyone belongs.","Do not hoard resources that could relieve a neighbour’s burden.","Stay away from gossiping about community leaders; lift them instead."]},{"chapterId":10,"description":"Build your future with dua and deliberate legacy—write it down and keep checking in.","dos":["Set spiritual goals for 30/90/365 days and review them weekly.","Document answered duas and progress to celebrate growth.","Mentor someone younger and pass the torch of consistency.","Pair each milestone with a dua to stay humble before Allah.","Prepare a will or sadaqah list that reflects your legacy plans."],"donts":["Don’t procrastinate on goals by waiting for perfect conditions.","Avoid isolating your vision; seek accountability partners.","Never tie legacy to ego; let service be the measure.","Do not fear failure so much that you stop trying.","Stay away from plans that ignore the unseen rewards and akhirah."]}]');

/***/ }),

/***/ "./resources/js/components/data/homework.json":
/*!****************************************************!*\
  !*** ./resources/js/components/data/homework.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"homework":["Spend 10 minutes reflecting on what Tawheed means for your daily decisions.","Journal three moments when you were tempted to compromise and how Tawheed can anchor you.","Share one insight with a study partner or mentor and ask for their perspective.","Memorize one dua from today\'s lesson and repeat it before sleep."]},{"chapterId":2,"homework":["Recite the Shahada slowly 20 times, contemplating each word.","List five actions you can remove this week that distract from worship.","Listen to a trusted lecture about the Articles of Faith and summarize it.","Practice dua before every salah asking for increased iman."]},{"chapterId":3,"homework":["Track your five daily prayers for seven days in a notebook.","Teach a family member one pillar of prayer this week.","Focus on wudu etiquette before each prayer today.","Read about a sahabi known for prayer and note their discipline."]},{"chapterId":4,"homework":["Review the names of Allah mentioned in the chapter and pick three to memorize.","Write a short reflection on how revelation changes your perspective.","Recite one ayah from the Quran with translation each day.","Visit a recitation circle or watch a tafsir for deeper context."]},{"chapterId":5,"homework":["Pick a hadith about the Prophet ﷺ and journal what it teaches you.","Memorize the short biography of the Prophet from the lesson.","Share a story from the Prophet’s life with someone and ask for their take.","Set a reminder to read one paragraph from the Seerah every evening."]},{"chapterId":6,"homework":["Create a dua list for each prayer time and rotate through it daily.","Record today’s salah start to finish and note improvements.","Pair up with a friend to encourage consistency in prayer.","Compile five reminders that keep you mindful of Allah during the day."]},{"chapterId":7,"homework":["Serve someone in your community with a small act of kindness.","Reflect on gratitude and list three people you can thank this week.","Practice patience when you feel short-tempered and note triggers.","Practice forgiveness and write a dua asking for a soft heart."]},{"chapterId":8,"homework":["Audit your media: delete or limit one thing that pulls you away from focus.","Set a weekly halal goal (e.g., meal prep, call a relative, read).","Plan one intentional moment of silence to reconnect with Allah.","Choose a healthy habit for the body and soul (fasting, charity, etc.)."]},{"chapterId":9,"homework":["Attend a local community event or share a helpful resource.","Reach out to support someone who needs a listening ear.","Organize a short session to practice dua and reminders together.","Volunteer one hour for your neighborhood or mosque."]},{"chapterId":10,"homework":["Plan a personal growth tracker for the next 30 days.","Write a dua asking for consistent growth and review it nightly.","Choose one area (worship, character, knowledge) and set micro-goals.","Reflect on progress each Friday and note lessons learned."]}]');

/***/ }),

/***/ "./resources/js/components/data/lessons.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/lessons.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation: Tawheed – The Eternal Truth That Created You and Will Resurrect You","summary":"Tawheed is the beginning, the middle, and the end of Islam. It is the reason the universe exists, the reason you breathe, the reason the prophets were sent, the reason Jannah was created, and the only sentence that will save you when the sky is split open. Mastering Tawheed is not optional—it is the lifeline that connects every moment of your life to its ultimate purpose.","sections":[{"title":"Tawheed Before You Were Born: The Primordial Covenant","content":"<p>When Allah took the covenant from the backs of Adam’s children: “Am I not your Lord?” every soul answered “Yes, we testify” (7:172). Tawheed is not something you learn — it is something you remember. This covenant (Mithaq) is etched in every human heart, and life is a journey to revive that innate fitrah before the soul returns to answer the same question again.</p>","deepDive":{"title":"The Fitrah of Creation","content":"<p>Children are born upon fitrah (natural inclination to Tawheed), as confirmed by the Prophet ﷺ. Shaytan’s lifelong mission is to make you forget this covenant, replacing it with shirk that veils the heart like rust on iron.</p>"}},{"title":"The Three Categories of Tawheed (The Standard Framework)","content":"<ol><li><strong>Tawheed ar-Ruboobiyyah</strong> – Oneness of Lordship: Allah alone is the Creator, Sustainer, Provider, and Controller of all affairs. Even idol-worshippers of Makkah affirmed this, but it is incomplete without the other two.</li><li><strong>Tawheed al-Uloohiyyah (al-‘Ibadah)</strong> – Oneness of Worship: Directing all acts of devotion—prayer, dua, sacrifice, vow, fear, hope, trust, love—exclusively to Allah, without intermediaries.</li><li><strong>Tawheed al-Asmaa’ was-Sifaat</strong> – Oneness of Names and Attributes: Affirming Allah’s Names and Attributes as described in the Qur’an and Sunnah, without distortion, negation, likening to creation, or questioning \'how\'.</li></ol>","deepDive":{"title":"Why Three? The Qur’anic Balance","content":"<p>These categories ensure comprehensive Tawheed: belief in Allah’s dominion (Ruboobiyyah), exclusive worship (Uloohiyyah), and perfect description (Asmaa’ wa Sifaat). Neglecting any leads to imbalance, as seen in the pagans who affirmed creation but directed worship elsewhere.</p>"}},{"title":"Extended Discussions on Tawheed: Ittibaa’ and Beyond","content":"<p>Some scholars, like Ibn Taymiyyah, discuss Tawheed al-Ittibaa’ (Oneness of Following) as integral to Uloohiyyah—complete submission to the Prophet’s Sunnah as the practical manifestation of worship. While not a separate \'fourth\' category in the standard division, it emphasizes that true Tawheed requires emulating the Messenger ﷺ in every detail.</p>","deepDive":{"title":"Ittibaa’ in Action","content":"<p>Following the Prophet ﷺ is obligatory: “Whoever obeys the Messenger has obeyed Allah” (4:80). This includes Sunnah prayers, adab, and rulings—neglect here weakens overall Tawheed.</p>"}},{"title":"The Greatest Ayah in the Qur’an: Ayat al-Kursi","content":"<p>2:255 summarises all categories of Tawheed in ten sentences. The Prophet ﷺ called it the leader of all verses. Reciting it three times morning and evening protects from Shaytan, as per authentic hadith.</p>","deepDive":{"title":"Breaking Down Ayat al-Kursi","content":"<p>Verses 1-4: Ruboobiyyah (creation, knowledge). 5-6: Uloohiyyah (no sleep, protector). 7: Asmaa’ wa Sifaat (Owner of heavens/earth, no intercessor without permission).</p>"}},{"title":"Tawheed of the Prophets in 60 Seconds Each","content":"<ul><li><strong>Nuh</strong> → 950 years calling: “Worship Allah alone; you have no god but Him” (23:23).</li><li><strong>Ibrahim</strong> → Smashed idols, built Ka’bah: “Indeed, I have turned my face toward He who created the heavens and the earth” (6:79).</li><li><strong>Musa</strong> → Confronted Pharaoh: “Let my people go that they may worship” (Exodus parallel in 7:127).</li><li><strong>‘Isa</strong> → Refuted divinity: “Worship Allah, my Lord and your Lord” (5:116-117).</li><li><strong>Muhammad ﷺ</strong> → Final call: “Say: La ilaha illa Allah and succeed” (Yasin 36:58-59).</li></ul>","deepDive":{"title":"Common Thread","content":"<p>Every prophet’s mission began and ended with Tawheed—proof that it is the unchanging core of divine message across 124,000 prophets.</p>"}},{"title":"Tawheed in the Grave, on the Sirat, and at the Hawd","content":"<p>Your Tawheed will be your light on the bridge (Sirat), the reason the Prophet ﷺ gives you a drink from his blessed hands (Hawd), and the only currency accepted on a Day when wealth and children avail nothing (26:88-89).</p>","deepDive":{"title":"The First Question","content":"<p>Munkar and Nakir ask: “Who is your Lord? What is your religion? Who is your prophet?” Tawheed answers all three perfectly.</p>"}},{"title":"The Ten Nullifiers of Tawheed (Nawaqid al-Islam)","content":"<p>As outlined by Shaykh Muhammad ibn Abdil-Wahhab: 1. Shirk in worship. 2. Setting up intermediaries. 3. Not deeming polytheists as disbelievers. 4. Believing other guidance superior. 5. Hating the Prophet’s message. 6. Mocking Islam. 7. Practicing sorcery. 8. Aiding disbelievers against Muslims. 9. Believing exemption from Shari’ah. 10. Turning away from the religion.</p>","deepDive":{"title":"Modern Applications","content":"<p>Today, this includes nationalism over Ummah, celebrity worship, or ignoring Sunnah—each a crack in Tawheed’s foundation.</p>"}},{"title":"Hidden Shirk Checklist (Modern Edition)","content":"<ul><li>Showing off in worship (riya’)</li><li>Swearing by creation</li><li>Saying “If it weren’t for so-and-so…”</li><li>Fearing superstitions more than Allah</li><li>Relying on wealth/status over tawakkul</li><li>Seeking fatwas from unqualified sources</li><li>Nationalism eclipsing brotherhood</li><li>Delayed obedience to revelation</li></ul>","deepDive":{"title":"Daily Audit","content":"<p>End each day reviewing: Did any of these creep in? Repent immediately—shirk is the only unforgivable sin without tawbah (4:48).</p>"}},{"title":"The Four Stages of Protecting Tawheed","content":"<ol><li><strong>Learn</strong>: Study sources deeply (Qur’an, authentic Sunnah).</li><li><strong>Live</strong>: Apply in every decision, big or small.</li><li><strong>Teach</strong>: Share with family, friends, online—da’wah preserves your own Tawheed.</li><li><strong>Die</strong>: Make dua for ikhlas in final moments; prepare with constant renewal.</li></ol>","deepDive":{"title":"Renewal Practices","content":"<p>Daily: Recite Shahada 100x. Weekly: Study one hadith on Tawheed. Monthly: Teach a lesson.</p>"}},{"title":"Tawheed in Times of Trial: Stories from the Sahaba","content":"<p>Bilal under torture screamed \'Ahad! Ahad!\' (One! One!). Sumayyah martyred for refusing to deny Tawheed. Their hearts were fortresses—yours can be too.</p>"}],"paragraphs":["The strongest person is not the one who lifts 500 kg — it is the one who can say “No” to his desires only for Allah, turning every temptation into an act of worship.","Tawheed is the only idea in human history that turned slaves into leaders of nations within 23 years, conquering not with swords alone but with unshakeable certainty.","When the companions entered Makkah victorious, the Prophet ﷺ entered bowing on his camel, reciting Surah Al-Fath — because true victory belongs only to Allah, never to men.","Every single pleasure in Jannah is multiplied 70+ times except the pleasure of looking at Allah’s Face — that has no limit, reserved for those whose Tawheed was pure.","If you leave something for Allah, He replaces it with something better — in this life before the next, as per the promise: “And whoever fears Allah—He will make for him a way out and provide for him from where he does not expect” (65:2-3)."],"insights":["The moment you perfect Tawheed, the entire creation becomes your servant instead of your master—wealth serves, people respect, trials strengthen.","Shaytan’s biggest fear is a teenager who truly understands La ilaha illa Allah—youth with Tawheed build civilizations.","The people of Tawheed will enter Jannah 500 years before everyone else (Musnad Ahmad)—a head start earned by hearts undivided.","Your children inherit your money, but only your Tawheed can intercede for you on the Day of Judgement, through their salah on you.","Tawheed turns anxiety into peace: When the world crumbles, the muwahhid stands firm, knowing only Allah’s plan endures."],"todayMission":"Write the Shahada 313 times by hand today (takes about 45–60 min), visualizing the angels recording each letter and the Prophet ﷺ interceding for you. Afterwards, burn or bury the paper as a symbol of pure, non-showcased devotion. Share one insight from this with a loved one.","quotes":[{"type":"Quran","text":"Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence… (Ayat al-Kursi 2:255)"},{"type":"Quran","text":"So know that there is no deity except Allah and ask forgiveness for your sin… (47:19)"},{"type":"Hadith","text":"Renew your faith.” They asked: “How?” He said: “Say often: La ilaha illa Allah.” (Ahmad)"},{"type":"Hadith","text":"The example of five prayers is like an overflowing river at your door in which you wash five times daily. (Muslim)"},{"type":"Saying","text":"Tawheed is wider than the heavens and the earth, yet it enters the heart of a child. – Ibn al-Qayyim"},{"type":"Scholar","text":"The heart cannot find rest until it rests in Tawheed. – Ibn Taymiyyah"}],"tips":["Make it a lifelong habit: every time you enter or leave the house, say the full Shahada out loud, invoking protection.","Replace every “I’m stressed” with “La ilaha illa Allah” for 40 days straight—watch worldly worries dissolve.","Teach one child the meaning of La ilaha illa Allah with the finger method (index finger up = only Allah)—start with your own kids or nieces/nephews.","Every Thursday night read Surah Ya-Sin and gift the reward to strengthening your Tawheed and that of the Ummah.","Audit your phone apps: Delete one that distracts from dhikr this week, replacing it with a Tawheed reminder app."],"resources":[{"label":"Kitab at-Tawheed – Full 70-hour explanation by Sh. al-Fawzan","type":"Audio","link":"https://www.spreaker.com/show/kitab-at-tawheed"},{"label":"The Three Fundamental Principles – Intensive course (40 lessons) – Sh. Ahmad Musa Jibril","type":"Video","link":"https://www.youtube.com/playlist?list=PL2dAJi7G9NwY3B8t8x7i8u9o0p1q2r3s4"},{"label":"Tawheed Workbook for Families – 52-week curriculum","type":"PDF","link":"https://tawheedfirst.com/workbook"},{"label":"99 Names of Allah – Daily interactive app with audio & quiz","type":"App","link":"https://99names.app"},{"label":"Explanation of Aqeedah al-Wasitiyyah – Ibn Taymiyyah (complete text)","type":"Book","link":"https://kalamullah.com/aqeedah-wasitiyyah.html"}],"nextSteps":["Finish Kitab at-Tawheed twice in your life (once in Arabic, once with explanation)—start today with one chapter.","Memorise the entire text of Ayat al-Kursi, the last 3 Quls, and the last 10 ayahs of Al-Hashr—recite nightly.","Lead a weekly Tawheed circle in your home or online for at least one full year—invite neighbors or online community.","Make it your life goal that your last words are consciously La ilaha illa Allah—practice by reciting it in sujood daily."],"keyInsights":["The foundation supports every future habit.","Small acts of sincerity multiply immensely.","Daily reminders keep the heart soft.","Teach what you learn to lock it in.","Authentic conviction beats temporary motivation."],"learningObjectives":["Reconnect every decision to the covenant of Tawheed.","Distinguish Rububiyyah, Uloohiyyah, and Asma wa Sifaat through the stories of the prophets.","Set a daily routine of shahada, duas, and self-audit that keeps Tawheed alive.","Anchor your emotions in gratitude through the Shahada.","Spot everyday moments of Tehweed rather than relying on rituals alone."],"videos":[{"title":"Covenant of Tawheed","url":"https://www.youtube.com/watch?v=SDPugOuKigQ","description":"Revisiting the primordial contract every soul made to testify that Allah is One."},{"title":"Tawheed Categories Refresher","url":"https://www.youtube.com/watch?v=IAdM65cmL70","description":"A concise breakdown of Rububiyyah, Uloohiyyah, and Asma wa Sifaat."},{"title":"Ittibaa’ & The Prophetic Path","url":"https://www.youtube.com/watch?v=w0_nkIFdpmU","description":"Fulfilling Tawheed through following the Messenger ﷺ."},{"title":"Living Tawheed Daily","url":"https://www.youtube.com/watch?v=wW6pyzhZq4E","description":"Practical reminders to keep your testimony active in every routine."}]},{"chapterId":2,"title":"The Beliefs: The Six Pillars of Iman – Your Invisible Reality Stronger Than Steel","summary":"While the body lives in the seen world, the heart lives permanently in the unseen (ghayb). The six pillars of Iman are the oxygen of the soul — without them you suffocate spiritually even while walking around healthy. They transform abstract belief into a lived certainty that reshapes every decision.","sections":[{"title":"The Branches of Iman: Over Seventy Levels of Excellence","content":"<p>As per the hadith in Sahih Muslim: Iman has over seventy branches—the highest is La ilaha illa Allah, the lowest is removing harm from the road, and modesty (haya’) is a branch. Al-Bayhaqi compiled 77 in Shu’ab al-Iman, including lowering the gaze, helping the needy, and patience in trials.</p>","deepDive":{"title":"Iman Increases and Decreases","content":"<p>Obedience elevates branches (e.g., charity strengthens trust in provision); sins prune them. Renew daily through dhikr and reflection.</p>"}},{"title":"Belief in Allah – The Unshakable Core","content":"<p>Affirming Tawheed in full, with balanced love, fear, hope, and reliance. This pillar underpins all others—weak here, and the rest crumbles.</p>"},{"title":"Living with Angels – Your Constant Companions","content":"<ul><li><strong>Kiraman Katibin</strong>: Scribes on shoulders recording every deed.</li><li><strong>Guardians</strong>: Hafazah protect from unseen harms.</li><li><strong>Attendees of Dhikr</strong>: Angels descend on gatherings reciting Qur’an.</li><li><strong>Amin-Sayers</strong>: Behind you in salah, amplifying supplication.</li><li><strong>Throne-Bearers</strong>: Eight on Judgment Day, glorifying Allah eternally.</li></ul>","deepDive":{"title":"Angelic Etiquette","content":"<p>Angels flee from foul odors (garlic post-eating), love sweet scents, and pray for the sleeper who says adhkar. Honor them by purity.</p>"}},{"title":"Belief in the Revealed Books – The Chain of Divine Guidance","content":"<p>Allah revealed over 100 scriptures, but four principal books remain referenced: Suhuf (Scrolls) of Ibrahim, Tawrat (Torah) to Musa, Zabur (Psalms) to Dawud, Injil (Gospel) to ‘Isa, and the final, preserved Qur’an to Muhammad ﷺ. We believe in their originals, though previous ones were altered.</p>","deepDive":{"title":"The Qur’an’s Uniqueness","content":"<p>Unlike others, the Qur’an is mutawatir (mass-transmitted), memorized by millions, and challenges: “Produce a surah like it” (2:23)—unmet for 1400 years.</p>"}},{"title":"25 Prophets Mentioned by Name – Quick Profiles of Guidance","content":"<p>The Qur’an names 25 prophets (from 124,000 total, 313 messengers): 1. Adam (first human). 2. Idris (ascended). 3. Nuh (ark-builder, 950 years). 4. Hud (to ‘Ad). 5. Salih (she-camel). 6. Ibrahim (friend of Allah). 7. Lut (Sodom). 8. Isma’il (sacrifice). 9. Ishaq (laughter). 10. Ya’qub (Israel). 11. Yusuf (dreams). 12. Ayyub (patience). 13. Shu’ayb (Midyan). 14. Musa (9 signs). 15. Harun (orator). 16. Dhul-Kifl (patient judge). 17. Dawud (melody). 18. Sulayman (winds/jinn). 19. Ilyas (Baal-fighter). 20. Al-Yasa’ (successor). 21. Yunus (whale). 22. Zakariyya (old father). 23. Yahya (baptist). 24. ‘Isa (miracles). 25. Muhammad ﷺ (seal).</p>","deepDive":{"title":"Lessons from Each","content":"<p>Adam: Repentance. Nuh: Perseverance. Yusuf: Forgiveness. Muhammad ﷺ: Mercy to all worlds.</p>"}},{"title":"Detailed Stages of the Hereafter: From Barzakh to Eternity","content":"<p>1. Death (soul extraction). 2. Barzakh (grave life: garden or pit). 3. Signs of Hour (minor: e.g., women outnumber men; major: Dajjal, Mahdi). 4. Trumpet blow (Israfil). 5. Resurrection (bodies reformed). 6. Gathering (Mahshar: 50,000 years, sweating per sins). 7. Book of Deeds (right/left hand). 8. Reckoning (private judgment). 9. Scales (deeds weighed). 10. Sirat (bridge over Hell). 11. Hawd (Prophet’s pool). 12. Shafa’ah (intercession). 13. Araf (purgatory for major sinners). 14. Jannah (8 gates) or Jahannam (7 levels).</p>","deepDive":{"title":"Barzakh Realities","content":"<p>The grave squeezes the believer gently (like a hug), expands for the righteous into Paradise vistas. Punishment for sinners: walls closing in, whispers of regret.</p>"}},{"title":"Qadar in Four Simple Equations: Balancing Free Will and Decree","content":"<ul><li><strong>Allah’s Knowledge</strong>: Eternal awareness of all.</li><li><strong>Preserved Tablet</strong>: Written 50,000 years pre-creation.</li><li><strong>Universal Will</strong>: Nothing occurs without permission.</li><li><strong>Creation</strong>: Allah creates actions; we choose intentions.</li></ul>","deepDive":{"title":"No Contradiction","content":"<p>You feel free, so accountable; Allah’s justice ensures fairness. Response to calamity: “Qadr Allah, and He does what He wills” (18:39 partial).</p>"}},{"title":"The Ten Daily Iman Boosters: Practical Integration","content":"<p>1. Morning/evening adhkar. 2. Graveyard visits. 3. Tafsir reading. 4. Monday/Thursday fasts. 5. Sadaqah drops. 6. Death reflection. 7. Dua for yaqeen. 8. Prophet stories. 9. Qadar gratitude. 10. Unseen proofs journaling.</p>","deepDive":{"title":"Renewal Hadith","content":"<p>“Renew faith by saying La ilaha illa Allah often”—simple, yet transformative.</p>"}},{"title":"Iman in the Modern World: Countering Doubt","content":"<p>Atheism, science, media—each tests Iman. Anchor in Qur’an: “We will show them Our signs in the horizons and within themselves” (41:53). Miracles abound for the seeking heart.</p>"}],"paragraphs":["The Prophet ﷺ said if we knew what he knows about the unseen, we would cry far more than we laugh—let this spur reflection, not despair.","Belief in angels turns loneliness into constant companionship; imagine two scribes cheering your every good deed.","Belief in the Books turns every ayah you read into direct speech from Allah right now—pause mid-recitation to respond.","Belief in Qadar turns every hardship into a paid transaction with Allah: sins erased, ranks elevated.","The people of Paradise will regret only one thing: any moment in life they spent without dhikr of the unseen realities."],"insights":["The unseen is more real than the seen — the seen will vanish, the unseen remains forever; invest accordingly.","Your book of deeds began the moment your soul was breathed in, not at puberty—every thought counts.","The Prophet ﷺ will know you on the Day of Judgement by the light of your wudu and sujood marks on your forehead.","Every single atom you own will testify for or against you — nothing is neutral; purify your possessions.","Strong Iman makes the grave a bridge to Jannah; weak Iman makes it a tunnel to regret."],"todayMission":"Tonight, open the Qur’an randomly, read one page of tafsir, then close your eyes and imagine Allah speaking those exact words to you personally in Jannah. Stay in that scene until tears come, then journal one unseen truth it strengthened in you.","quotes":[{"type":"Quran","text":"Those who believe in the unseen, establish prayer, and spend out of what We have provided them… (2:3)"},{"type":"Hadith","text":"When the dead is buried, two black-blue angels come… (Tirmidhi)"},{"type":"Quran","text":"The earthquake of the Hour is a tremendous thing… (22:1)"},{"type":"Hadith","text":"Actions are by intentions… (Bukhari)"},{"type":"Scholar","text":"Iman is light in the heart, increased by truth, decreased by doubt. – Ibn Qayyim"}],"tips":["Hang a large ‘Hereafter Timeline’ poster in your room—glance at it during idle moments.","Every night before sleep, read the dua: ‘Allahumma aslamtu nafsi ilayk…’ (full supplication of sleeping) for safe passage to Barzakh.","Keep a tiny bottle of musk — apply Fridays and say ‘This is for the day my body will smell in the grave’—a reminder of accountability.","Send 100 salah on the Prophet ﷺ every day — it is the fastest way to increase Iman and earn his intercession.","When news overwhelms, recite: “Hasbunallahu wa ni’mal wakil” (Allah is sufficient for us)—rooted in unseen trust."],"resources":[{"label":"In the Footsteps of the Prophet – Tariq Ramadan (detailed biography)","type":"Book","link":"https://kalamullah.com/prophet-biography.html"},{"label":"The Sealed Nectar (Ar-Raheeq al-Makhtum) – full colour edition","type":"Book","link":"https://kalamullah.com/sealed-nectar.html"},{"label":"End of the World – Sh. Omar Suleiman (20-part series)","type":"Video","link":"https://www.youtube.com/playlist?list=PLqG8t9aK1bXz5z5z5z5z5z5z5z5z5z5z5"},{"label":"Iman Boosters Kids – 100-episode animated Iman series","type":"YouTube","link":"https://www.youtube.com/playlist?list=PLiman-kids"},{"label":"The World of the Jinn and Devils – Umar al-Ashqar","type":"Book","link":"https://kalamullah.com/jinn-devils.html"}],"nextSteps":["Read one full prophet’s story every week for two years (104 weeks = all major narratives)","Memorise the entire Hadith of Jibril with sharh—recite weekly.","Visit a graveyard every single Jumu’ah for one year—reflect 20 minutes on Barzakh.","Create a personal ‘Iman Journal’ — every day write one proof that increased your yaqeen from the unseen."],"keyInsights":["The foundation supports every future habit.","Small acts of sincerity multiply immensely.","Daily reminders keep the heart soft.","Teach what you learn to lock it in.","Authentic conviction beats temporary motivation."],"learningObjectives":["Map the six pillars of Iman onto everyday actions.","Recognize unseen realities (angels, books, prophets, qadar) that shape belief.","Develop nightly reflections that affirm gratitude for the unseen.","List the six pillars whenever doubt creeps in and counter it with evidence.","Practice narrating one unseen reality to a friend this week."],"videos":[{"title":"Six Pillars Overview","url":"https://www.youtube.com/watch?v=pXSd98e4Rns","description":"A sweeping intro that ties the six pillars back to the heart."},{"title":"Living with the Unseen","url":"https://www.youtube.com/watch?v=V32SMnbXEVY","description":"How angels, books, and prophets accompany every believer."},{"title":"Books & Messengers of Iman","url":"https://www.youtube.com/watch?v=rmo4UblVEKg","description":"Understanding the revealed scriptures and the role of every messenger."},{"title":"Qadar, Resurrection, & Accountability","url":"https://www.youtube.com/watch?v=qOP9JFbc54o","description":"Keep destiny and the Day of Judgment close to every decision."}]},{"chapterId":3,"title":"The Pillars: The Five Pillars – Your Direct Phone Line to Allah","summary":"These five actions are the bare minimum Allah asks in return for Jannah. They are gifts wrapped as obligations. Miss them and everything else collapses; perfect them and every nafl act becomes mountains of reward. The Prophet ﷺ called them the \'framework of Islam\'—build your life upon them.","sections":[{"title":"Shahada – The Key That Never Rusts","content":"<p>Renew it every prayer, every adhan, every time you sneeze, every time you enter the toilet, every time you feel doubt. It’s the door to all other pillars.</p>","deepDive":{"title":"Seven Conditions Revisited","content":"<p>Knowledge, certainty, acceptance, submission, truthfulness, sincerity, love—fulfill these, and Shahada becomes your eternal shield.</p>"}},{"title":"Salah – 50→5 Gift of the Night Journey","content":"<p>The only obligation brought directly (not via Jibril) during Mi’raj. The Prophet ﷺ kept going back until reduced to 5 with reward of 50. Includes 17 fard rak’ahs + 12 rawatib sunnahs daily.</p>","deepDive":{"title":"The 12 Daily Sunnah Prayers (Rawatib)","content":"<p>2 before Fajr, 4+2 before/after Dhuhr, 2 after Maghrib, 2 after Isha = house in Paradise (Bukhari). Prioritize for exponential reward.</p>"}},{"title":"Zakat – Financial Detox and Social Justice","content":"<p>Obligatory 2.5% on idle wealth (cash, gold, silver, investments) after one lunar year above nisab. For 2025: Nisab ≈ $6,000 (87.48g gold) or $1,100 (612.36g silver, per Hanafi). Eight recipients (9:60): poor, needy, administrators, etc.</p>","deepDive":{"title":"Voluntary Sadaqah Multiplier","content":"<p>Zakat purifies; sadaqah multiplies up to 700x. Even a smile is charity—circulate wealth to circulate barakah.</p>"}},{"title":"Sawm – Training the Soul for 11 Months","content":"<p>Controls tongue, eyes, stomach, desires from true dawn (Fajr) to sunset (Maghrib). The fast is for Me and I reward it (without measure) — Allah Himself is the direct reward (Hadith Qudsi).</p>","deepDive":{"title":"Night of Power (Laylat al-Qadr)","content":"<p>Worship equals 83+ years. Prophet ﷺ sought it in last 10 nights via i’tikaf—emulate for forgiveness of prior/current years.</p>"}},{"title":"Hajj – Standing Where the Prophets Stood","content":"<p>Once in lifetime if able: Ihram (intention), Tawaf (circling Ka’bah), Sa’i (between Safa-Marwah), Arafah (standing in supplication), Muzdalifah (pebbles), Rami (stoning), Sacrifice (Eid), Tawaf Ifadah. Every prophet performed it.</p>","deepDive":{"title":"Arafah: The Pillar of Pillars","content":"<p>Best dua day: “La ilaha illa Allah wahdahu la sharika lah…” Fasting Arafah expiates two years’ sins.</p>"}},{"title":"No Sixth Pillar: Clarifying Misconceptions","content":"<p>Islam has exactly five pillars per authentic hadith. Some fringe groups (e.g., Kharijites) added jihad, but scholars reject this—jihad is fard kifayah (communal), not individual like pillars. Walā’ & Barā’ (loyalty/disavowal) is aqeedah, not a pillar.</p>","deepDive":{"title":"Jihad’s True Place","content":"<p>The greater jihad is against nafs (self); lesser is defense. Pillars are personal; focus here first.</p>"}},{"title":"Daily, Weekly, Yearly, Lifetime Checklist: Building Rhythm","content":"<ul><li><strong>Daily</strong>: 5 fard + rawatib + witr.</li><li><strong>Weekly</strong>: Jumu’ah with khutbah.</li><li><strong>Yearly</strong>: Ramadan fast + Zakat due.</li><li><strong>Lifetime</strong>: Hajj/Umrah.</li></ul>","deepDive":{"title":"Eid Connections","content":"<p>Eid al-Fitr (post-Ramadan), Eid al-Adha (with Hajj)—celebrations tying pillars together in joy and gratitude.</p>"}},{"title":"The Fruits of the Pillars: Transformation Stories","content":"<p>Abu Bakr’s salah softened hearts; Umar’s fasting tamed his anger; companions’ zakat ended famines—your consistency can change generations.</p>"}],"paragraphs":["The Prophet ﷺ said: “Whoever prays the two cool prayers (Fajr & Asr) will enter Paradise.” That’s it — just two prayers perfectly and Jannah is guaranteed; build from there.","If you miss a single Fajr in jama’ah, you have effectively missed a treasure greater than the entire world and everything in it (hadith)—prioritize dawn’s mercy.","The fastest way to pay off spiritual debt is voluntary fasts + night prayer + charity—stack them for rapid elevation.","The black stone will come on the Day of Judgement with eyes and tongue testifying for everyone who touched it with truth—kiss it with intention, not ritual.","Pillars aren’t burdens; they’re elevators: Salah lifts worries, Zakat lightens hearts, Hajj erases lifetimes of sin in days."],"insights":["The five pillars are the only deeds that continue for you after death if you taught them to others (sadaqah jariyah)—legacy through practice.","Your salah is either the reason you fly over the sirat like lightning or the reason you fall into Hell—nurture khushu’ daily.","A single accepted Hajj erases everything — even if you committed sins for 100 years; intend it young.","The Prophet ﷺ will recognise his Ummah by the shining marks of wudu on their faces, arms, and feet—let yours glow.","Ramadan’s discipline, if sustained, turns an average believer into a spiritual athlete for the year."],"todayMission":"Tomorrow pray just one salah exactly like the Prophet ﷺ (slow recitation, long rukū’, full sujūd, tasbihs, duas between sajdas, sitting between sajdas, etc.) — then beg Allah to make every salah like that until you die. Track khushu’ level (1-10) in a journal.","quotes":[{"type":"Hadith","text":"Between a man and shirk & kufr stands abandonment of prayer. (Muslim)"},{"type":"Quran","text":"Take from their wealth a charity to purify them… (9:103)"},{"type":"Hadith","text":"The fast and the Qur’an will intercede for the servant… (Ahmad)"},{"type":"Hadith","text":"Whoever prays 12 rak’ahs daily, Allah builds a house for him in Paradise. (Tirmidhi)"},{"type":"Quran","text":"Successful indeed are the believers… those who offer their salah with khushu’. (23:1-2)"}],"tips":["Use the ‘Prayer First’ method: no phone, no food, no talk until you pray on time—break the delay cycle.","Keep a physical zakat folder with last year’s calculations — review monthly, pay early for barakah.","Start a ‘Hajj 2030 Fund’ today even if it’s only $1 — Allah multiplies intention into provision.","Learn one new Sunnah act every week (e.g., miswak) and implement it permanently—small habits build empires.","During wudu, intend each drop as purification for Sirat crossing—turn routine into ritual."],"resources":[{"label":"The Ultimate Salah Guide – 100-page illustrated PDF","type":"PDF","link":"https://kalamullah.com/salah-guide.pdf"},{"label":"Zakat Handbook 2025 – country-specific nisab values","type":"PDF","link":"https://islamic-relief.org/zakat-handbook"},{"label":"Hajj & Umrah 3D Simulator – walk-through","type":"App","link":"https://hajjcoach.com"},{"label":"Ramadan Prep Course – 30-day pre-Ramadan series","type":"Video","link":"https://www.youtube.com/playlist?list=PLramadan-prep"},{"label":"Description of the Prophet’s Prayer – Sh. al-Albani","type":"Book","link":"https://kalamullah.com/prophets-prayer.html"}],"nextSteps":["Pray all 17 fard + 12 rawatib + witr every day for 365 days straight—use a tracking app.","Perform Hajj or Umrah before you turn 50 (or 40 if possible)—start visa/savings now.","Calculate and pay every single penny of missed zakat from the day you reached puberty—use online calculator.","Become the imam of your house — lead at least one salah daily, teaching family the fatiha."],"keyInsights":["The foundation supports every future habit.","Small acts of sincerity multiply immensely.","Daily reminders keep the heart soft.","Teach what you learn to lock it in.","Authentic conviction beats temporary motivation."],"learningObjectives":["Master the five pillars as practical rituals, not chores.","Create a checklist for Salah, Zakat, Sawm, Hajj, and Shahada commitments.","Pair each pillar with one challenge and one celebration plan.","Simulate the pillars by planning a short role-play for each.","Notice how each pillar influences your schedule after Ramadan."],"videos":[{"title":"Five Pillars Roadmap","url":"https://www.youtube.com/watch?v=96fLlVqaRq8","description":"A visual guide that anchors every pillar into your day."},{"title":"Salah & The Night Journey","url":"https://www.youtube.com/watch?v=mWJ-tlZdtK4","description":"Connecting the five daily prayers to the Prophet ﷺ’s Mi’raj."},{"title":"Zakat & Sadaqah in Motion","url":"https://www.youtube.com/watch?v=Jb8Yk8LaUoc","description":"Practical steps to purify wealth through giving."},{"title":"Preparing for Hajj","url":"https://www.youtube.com/watch?v=hzM3KN6j7kQ","description":"What to pack spiritually and logistically for the pilgrimage."}]},{"chapterId":4,"title":"The Quran: Heartbeat of Revelation and Living Library","summary":"Each letter of the Qur\'an is alive; it lights, heals, and anchors you in divine goodness.","sections":[{"title":"Tajweed & Presence","content":"<p>Let every letter exit with calm precision. Practice tajweed drills before sleep to smooth your tongue.</p>","deepDive":{"title":"Makharij Reset","content":"<p>Record yourself, compare to a master qari, and adjust the exits gently.</p>"}},{"title":"Meditative Reflection","content":"<p>After reading a verse, pause, ask what Allah wants you to act on, and write one sentence.</p>","deepDive":{"title":"Nightly Notebook","content":"<p>Journal a verse, two emotions it stirred, and a dua inspired by it.</p>"}}],"paragraphs":["The Quran rebuilds your story whenever you return to it.","Even one verse, understood, can rewire your choices.","Acting on a single ayah multiplies its reward exponentially.","Every surah is a chapter of mercy waiting for you.","Reciting with devotion keeps your heart aligned with Allah\'s clock."],"insights":["Consistency in recitation creates a new rhythm in your day.","Reflection converts words into conviction.","Tajweed is the respect due to divine speech.","Pairing translation with recitation unlocks deeper reality.","The Quran is your counsellor, especially on restless nights."],"todayMission":"Read one verse slowly, translate it in your own words aloud, and make a dua based on its lesson.","quotes":[{"type":"Quran","text":"Indeed, this Quran guides to that which is most suitable..."},{"type":"Hadith","text":"The best of you are those who learn the Quran and teach it. (Bukhari)"},{"type":"Scholar","text":"The Quran is a lamp for the heart and a compass for the soul. – Imam Nawawi"}],"tips":["Keep a mushaf beside your bed for quick, reverent recitation.","Set a 10-minute reminder to read and reflect before work.","Practice tajweed with a friend to keep you accountable.","Use sticky notes to summarise each ayah you memorise.","Team up with your family to recite one verse daily."],"resources":[{"label":"Tajweed Essentials Course","type":"Video","link":"https://example.com/tajweed"},{"label":"Tafsir Ibn Kathir (English)","type":"Book","link":"https://example.com/ibn-kathir"},{"label":"Quran Reflection Journal","type":"PDF","link":"https://example.com/quran-journal"}],"nextSteps":["Memorise one surah every month with a partner.","Lead a reflection circle with your household.","Pair a hadith with a verse for 4 weeks.","Record a duas list inspired by Quranic lessons."],"keyInsights":["The Quran never grows old; revisit it with fresh eyes.","Reflecting once extends its effect a lifetime.","Tajweed is respect more than a rule.","Action multiplies the reward of every ayah.","Every verse is a dua waiting to be answered."],"learningObjectives":["Make the Qur’an a daily companion with tajweed, tafsir, and reflection.","Identify three verses that speak to your current season and act on their lessons.","Build a routine for journaling insights from each surah you read.","Pair a verse with dua to turn word into worship.","Teach a family member one tajweed rule this week."],"videos":[{"title":"Quran Heartbeat Reflection","url":"https://www.youtube.com/watch?v=tDmXpaQnr88","description":"Witness how each ayah becomes a heartbeat when read slowly."},{"title":"Quranic Reminder for Daily Life","url":"https://www.youtube.com/watch?v=ErojD3km-5U","description":"The Qur’an as a practical compass for modern decisions."},{"title":"Living Library of Revelation","url":"https://www.youtube.com/watch?v=VSf220Prf-M","description":"Exploring why the Quran stays fresh across generations."},{"title":"Journaling the Ayahs","url":"https://www.youtube.com/watch?v=qLECufmKSYk","description":"Quick prompts to turn reading into ongoing reflection."}]},{"chapterId":5,"title":"The Prophet: Muhammad ﷺ – Mirror of Mercy","summary":"Studying the Prophet\'s life unlocks Islam\'s character code, showing clarity, humility, and compassionate leadership.","sections":[{"title":"Prophetic Communication","content":"<p>He spoke softly, smiled often, and corrected without harshness. Practice this in your next feedback conversation.</p>","deepDive":{"title":"Pause Before Reply","content":"<p>Hold your breath for 3 seconds before responding; let kindness lead.</p>"}},{"title":"Balance & Routine","content":"<p>He divided time between worship, family, and da\'wah. Track your own energy windows similarly.</p>","deepDive":{"title":"Night Prayer Strategy","content":"<p>Start with two rak\'ahs, then extend gradually—intention matters most.</p>"}}],"paragraphs":["Every decision he made referenced the Quran first.","His mercy was magnetic; oppression never gained foothold around him.","He taught that small acts of kindness equal grand achievements.","Family worship was essential to his rhythm.","His life rewrites what real strength looks like."],"insights":["Consistent humility attracts trust.","Listening is leadership; he heard before he dictated.","Slow-paced nights produced powerful dawns.","A kind tone neutralises anger faster than logic.","Small acts repeated daily build legacy."],"todayMission":"Share a short story about the Prophet ﷺ and ask: Which part should I embody this week?","quotes":[{"type":"Hadith","text":"He who does not show mercy to people, Allah will not show mercy to him. (Bukhari)"},{"type":"Quran","text":"There has certainly come to you a Messenger from among yourselves... (9:128)"},{"type":"Scholar","text":"He became the mercy the stars leaned toward. – Imam Nawawi"}],"tips":["Pause before disagreeing; add a phrase of affirmation first.","Write one hadith then practise it for a day.","Bring sunnah snacks to family iftar.","Record lessons after every dua session.","Fast Mondays and Thursdays to join the Prophet\'s cadence."],"resources":[{"label":"The Sealed Nectar","type":"Book","link":"https://kalamullah.com/sealed-nectar.html"},{"label":"Sirah Story Podcast","type":"Podcast","link":"https://example.com/sirah"},{"label":"Prophetic Mercy Course","type":"Course","link":"https://example.com/mercy"}],"nextSteps":["Study one chapter of Sirah per month.","Lead a salaam circle with friends.","Recreate his morning routine for 7 days.","Serve someone quietly each week."],"keyInsights":["Mercy is the fragrance he left everywhere.","Gentleness wins what force never will.","Rest is part of leadership, not a luxury.","He turned every trial into dua.","Consistency beats a grand but short-lived effort."],"learningObjectives":["Study the Prophet’s character and identify manners to adopt.","Trace his leadership habits across worship, family, and community.","Practice one Prophetic routine (e.g., tahajjud or fasting) for a week.","Identify one Prophetic character trait you wish to model this month.","Create a mini journal entry describing how mercy reshaped your language."],"videos":[{"title":"Mercy In Motion","url":"https://www.youtube.com/watch?v=uidCMCZd8BQ","description":"Stories of the Prophet ﷺ showing mercy in tight spots."},{"title":"Prophetic Communication Style","url":"https://www.youtube.com/watch?v=2MMgmxomjIc","description":"How he spoke gently yet firmly with every companion."},{"title":"Balanced Leadership","url":"https://www.youtube.com/watch?v=K0TqP7hbjLM","description":"Practical leadership lessons from the Prophet’s daily schedule."},{"title":"Nightly Mercy Routine","url":"https://www.youtube.com/watch?v=EbQUDqorOUw","description":"How to end each day with praise, dua, and mercy."}]},{"chapterId":6,"title":"The Prayer: Salah as Your Soul\'s Sync","summary":"Prayer is the reset that brings your body, heart, and discipline back into harmony with Allah.","sections":[{"title":"Mental Prep","content":"<p>Pause before you stand. Breathe, feel the ground under your feet, and say ‘Bismillah’. Intention shapes the rest of the prayer.</p>","deepDive":{"title":"Mindful Rhythm","content":"<p>Use your breath to slow down; count ruku’ and sujood to keep pace.</p>"}},{"title":"Physical Presence","content":"<p>Soft elbows, relaxed fingers, eyes focused—make your body a vessel of humility.</p>","deepDive":{"title":"Posture Check","content":"<p>Record your salah once a week to refine the curve of your sujood and the stillness of your sitting.</p>"}}],"paragraphs":["Prayer is the trust you renew at least five times daily.","It anchors days with tranquility even when storms blow.","Every sujood is a dialogue with the Most Merciful.","Protect the middle prayer first; it is the core.","Consistency in salah births resilience."],"insights":["Khushu softens the hardest tasks.","Sujood is the place Allah loves most.","Five daily resets keep you from spiralling.","Prayer builds courage to face injustice.","Fajr is the gateway to blessing your day."],"todayMission":"Pray your next salah with intention, focus on each movement, then note how calm you feel afterwards.","quotes":[{"type":"Quran","text":"Guard strictly the prayers, especially the middle prayer... (Qur\'an 2:238)"},{"type":"Hadith","text":"The prayer is light; do not let it grow dim. (Muslim)"},{"type":"Scholar","text":"Praying with khushu plants trees in your heart. – Imam Nawawi"}],"tips":["Designate a clean corner for salah with a gentle scent.","Use the same dua at the end of every prayer for repeat intention.","Practice wudu with gratitude to feel the water\'s embrace.","Let family hear your adhan to reinforce the habit.","Recite shorter surahs until you build stamina."],"resources":[{"label":"Salah Perfection Workshop","type":"Workshop","link":"https://example.com/salah"},{"label":"Khushu Hour Podcast","type":"Podcast","link":"https://example.com/khushu"},{"label":"Guided Salah Audio","type":"Audio","link":"https://example.com/salah-audio"}],"nextSteps":["Lead a prayer this month.","Record a salah diary for 40 days.","Teach a child one wudu step weekly.","Add a dua for others after every salah."],"keyInsights":["Prayer resets what panic steals.","Sujood is the soul\'s favourite posture.","Fajr seeds the day\'s energy.","Consistency breeds courage.","Prayer disciplines time itself."],"learningObjectives":["Deepen khushu by aligning breath, posture, and remembrance in each salah.","Learn key intentions before standing and dua after sujood.","Use salah as a daily reset to calm anxiety and plan service.","Set a weekly accountability check-in for your five prayers.","Note how khushu’ shifts when you prep mentally before standing."],"videos":[{"title":"Khushu Unlocked","url":"https://www.youtube.com/watch?v=Ou8uFCGhfRw","description":"Step-by-step guidance to deepen concentration in every prayer."},{"title":"Mindful Salah Practice","url":"https://www.youtube.com/watch?v=gUZCREmNX6k","description":"Pair your breath with each movement for presence."},{"title":"Correcting Posture & Pace","url":"https://www.youtube.com/watch?v=J0-j61fwIoU","description":"Small adjustments that keep your body humble in sujood."},{"title":"Calming the Heart Through Prayer","url":"https://www.youtube.com/watch?v=VfCT_g75yEE","description":"Using salah as an emotional reset for anxious days."}]},{"chapterId":7,"title":"The Manners: Adab That Elevates Every Encounter","summary":"Adab is the fragrance of iman; it makes every interaction sacred and every apology sincere.","sections":[{"title":"Family Adab","content":"<p>Serve parents first, speak gently, and ask forgiveness even before you think you need it.</p>","deepDive":{"title":"Daily Devotion","content":"<p>Call a relative weekly, send dua, and share Quranic reminders.</p>"}},{"title":"Digital Etiquette","content":"<p>Keep comments positive, avoid spreading rumours, and share encouragement.</p>","deepDive":{"title":"Filter Time","content":"<p>Create a dua list before scrolling; unfriend anything that drains your heart.</p>"}}],"paragraphs":["Manners build trust faster than talent.","Patience under pressure reveals true adab.","A quiet smile is a tarikah to healing.","Soft speech saves relationships more than strong points.","Adab is the glue that joins hearts across generations."],"insights":["Listening heals faster than lectures.","Adab is quiet da\'wah that never tires.","Softness is strength.","Kindness multiplies returns in the unseen.","Humility invites success."],"todayMission":"Smile warmly at five people, say salam, and pray a dua for them afterwards.","quotes":[{"type":"Hadith","text":"None of you truly believes until he loves for his brother what he loves for himself."},{"type":"Quran","text":"And speak to people good words. (Qur\'an 2:83)"},{"type":"Scholar","text":"Manners are the shortest path to the heart. – Imam Shafi\'i"}],"tips":["Pause before replying to hurtful words.","Always answer with salam when greeted.","Share small gifts to uplift others.","Send handwritten notes to show sincere appreciation.","Learn someone\'s name and repeat it kindly."],"resources":[{"label":"Adab Playlist","type":"Audio","link":"https://example.com/adab"},{"label":"Etiquette Book","type":"Book","link":"https://example.com/etiquette"},{"label":"Humility Workshop","type":"Workshop","link":"https://example.com/humility"}],"nextSteps":["Volunteer to help a neighbour.","Write a respectful letter to a mentor.","Practice silence for one minute when you feel rushed.","Teach a child the manners of home etiquette."],"keyInsights":["Good manners invite Allah\'s mercy.","Gentle speech wins hearts.","Adab is silent da\'wah.","Consistency rewrites culture.","Service humbles the soul."],"learningObjectives":["Define practical adab when speaking, eating, and sharing space.","Craft a family etiquette reminder (greeting, listening, gratitude).","Compare digital interactions to the Prophet’s mercy and adjust accordingly.","Celebrate small acts of adab with family thank-you notes.","Practice digital kindness by correcting or uplifting one comment daily."],"videos":[{"title":"Adab at Home","url":"https://www.youtube.com/watch?v=XT4L1FpnPrU","description":"Refreshing reminders on family etiquette and gentle speech."},{"title":"Adab in Public","url":"https://www.youtube.com/watch?v=aJSz_KrF02Y","description":"How manners build trust in every neighborhood."},{"title":"Digital Etiquette","url":"https://www.youtube.com/watch?v=FfhyMT2k76Q","description":"Keeping compassion online when tempers flare."},{"title":"Humility & Service","url":"https://www.youtube.com/watch?v=rPw9OdPFdCs","description":"Serving others with quiet strength."}]},{"chapterId":8,"title":"The Lifestyle: Halal Living, Habits, and Harmony","summary":"Islam is a lifestyle; this chapter helps you align food, finances, and rest with halal intention.","sections":[{"title":"Halal Nutrition","content":"<p>Plan meals with dates, barley, soups, and water—foods the Prophet ﷺ loved.</p>","deepDive":{"title":"Plate Audit","content":"<p>Reflect on energy after meals; swap heavy carbs for balanced plates.</p>"}},{"title":"Digital Boundaries","content":"<p>Set two screen-free hours each evening to reconnect with family and reflection.</p>","deepDive":{"title":"Notification Audit","content":"<p>Turn off alerts that steal your focus and replace them with adhkar reminders.</p>"}}],"paragraphs":["Lifestyle shaped the companions; discipline kept hearts steady.","Islamic living means enjoying goodness without excess.","Halal wealth removes the weight of guilt.","Rest is recharge that makes worship sustainable.","Intentional living multiplies joy."],"insights":["Boundaries guard joy.","Mindful eating is an act of worship.","Halal finance equals peaceful wealth.","Rest replenishes the heart.","Simpler habits build stronger faith."],"todayMission":"Clear one physical and one digital space, then thank Allah for the blessing it creates.","quotes":[{"type":"Quran","text":"Indeed, Allah loves those who repent and purify themselves. (Qur\'an 2:222)"},{"type":"Hadith","text":"The best of you are those who are best to their families."},{"type":"Scholar","text":"Islamic lifestyle is disciplined joy. – Imam Ghazali"}],"tips":["Read ingredients before eating.","Keep a halal budget each month.","Walk with family weekly for energy.","Pause before purchases and ask, \'Will this bring barakah?\'","Designate gadget-free hours at home."],"resources":[{"label":"Halal Living Blueprint","type":"Guide","link":"https://example.com/halal"},{"label":"Healthy Muslim Meals","type":"Video","link":"https://example.com/healthy"},{"label":"Digital Detox Planner","type":"PDF","link":"https://example.com/detox"}],"nextSteps":["Audit your wardrobe for modesty and donate extras.","Plan weekly meals with sunnah ingredients.","Create a monthly sadaqah bucket.","Set a bedtime routine without screens."],"keyInsights":["Halal choices shield your heart.","Rest is fuel, not laziness.","Simplicity invites creativity.","Mindful meals raise gratitude.","Discipline invites barakah."],"learningObjectives":["Design a halal lifestyle blueprint covering food, finance, and rest.","Introduce two intentional boundaries that protect worship time.","Swap one unhealthy habit for a sunnah-inspired alternative each week.","Design a halal budget with a charity and rest category.","Share one restful habit with a friend to keep each other accountable."],"videos":[{"title":"Halal Living Blueprint","url":"https://www.youtube.com/watch?v=-ZSxXF79r3g","description":"Planning meals, finances, and rest around halal intention."},{"title":"Mindful Meal Prep","url":"https://www.youtube.com/watch?v=8sbAcvsCBf0","description":"Simple routines to cook and eat with gratitude."},{"title":"Screen-Free Boundaries","url":"https://www.youtube.com/watch?v=42w0__IPYX0","description":"Creating digital routines that guard worship time."},{"title":"Lifestyle Reset","url":"https://www.youtube.com/watch?v=2vz5gSU7SCA","description":"Replacing one unhealthy habit with a sunnah-inspired rhythm."}]},{"chapterId":9,"title":"The Community: Building Ummah, Support, and Uplift","summary":"Islam thrives in community; this chapter explores solidarity, hospitality, and shared purpose.","sections":[{"title":"Hosting with Heart","content":"<p>Serve with dignity, keep the setting warm, and open with dhikr.</p>","deepDive":{"title":"Community Rituals","content":"<p>Start gatherings with a dua, highlight needs, close with gratitude.</p>"}},{"title":"Conflict Resolution","content":"<p>Listen, acknowledge feelings, and propose solutions that protect relationships.</p>","deepDive":{"title":"Mutual Respect Pact","content":"<p>Establish norms (phones silent, speak briefly) to keep conversations respectful.</p>"}}],"paragraphs":["Sincere circles create unstoppable momentum.","Mentoring a younger person is ongoing sadaqah.","Charity shows the world hearts still beat for others.","Solidarity draws divine presence to gatherings.","Technology can unite Ummah across oceans."],"insights":["Shared meals heal wounds.","Service multiplies faith.","Listening prevents escalation.","Mentorship sustains knowledge.","Every act of kindness ripples forward."],"todayMission":"Send a heartfelt message to someone who supported you and offer dua or help in return.","quotes":[{"type":"Hadith","text":"Love for your brother what you love for yourself."},{"type":"Quran","text":"Hold firmly to the rope of Allah all together and do not become divided. (3:103)"},{"type":"Scholar","text":"Community is a living body; feed it with sincerity. – Imam Malik"}],"tips":["Start meetings with a dua for the Ummah.","Volunteer even with time if money is scarce.","Invite neighbours for halal coffee.","Share success stories to inspire.","Keep a community journal to track needs."],"resources":[{"label":"Community Builder Blueprint","type":"PDF","link":"https://example.com/community"},{"label":"Ummah Podcast","type":"Podcast","link":"https://example.com/ummah"},{"label":"Mentorship Toolkit","type":"Tool","link":"https://example.com/mentor"}],"nextSteps":["Host a monthly halal meetup.","Partner with a local charity.","Mentor someone under 25.","Write appreciation letters for leaders."],"keyInsights":["Shared meals nourish hearts.","Service multiplies iman.","Mentorship keeps wisdom alive.","Compassion is contagious.","Consistency builds trust."],"learningObjectives":["Build community by hosting, serving, and mentoring with sincerity.","Create a checklist for respectful conflict resolution and mutual aid.","Document one story of service each week to inspire others.","Plan a community service action plan with clear dua goals.","Document how supporting another renewed your own heart."],"videos":[{"title":"Building Ummah Together","url":"https://www.youtube.com/watch?v=X6cTgVx7ydA","description":"How to design gatherings anchored in dua and care."},{"title":"Hosting with Heart","url":"https://www.youtube.com/watch?v=ZgeJ30hn12Q","description":"Practical hospitality tips from Prophetic character."},{"title":"Conflict Resolution & Mercy","url":"https://www.youtube.com/watch?v=9w0LmwoWing","description":"Keeping unity when disagreements arise."},{"title":"Sadaqah in Community","url":"https://www.youtube.com/watch?v=9RXq5z_0YA4","description":"Service projects that multiply the Ummah."}]},{"chapterId":10,"title":"The Future: Continuous Growth and Legacy","summary":"This chapter helps you set spiritual goals, document progress, and leave enduring impact.","sections":[{"title":"Spiritual Goal Setting","content":"<p>List three spiritual aims this quarter; include dua, memorisation, and service.</p>","deepDive":{"title":"Accountability Loop","content":"<p>Share goals with a mentor and review progress monthly.</p>"}},{"title":"Legacy Planning","content":"<p>Design a project (garden, scholarship, book) that benefits others after you depart.</p>","deepDive":{"title":"Impact Blueprint","content":"<p>Sketch intended influence for 5, 10, 20 years and update quarterly.</p>"}}],"paragraphs":["Tomorrow is built today with dua and focus.","Growth keeps you excited for life.","Legacy is service, not ego.","Hope in Allah accelerates resilience.","Prepare to be questioned on every blessing."],"insights":["Spiritual KPIs keep you honest.","Documentation inspires others.","Rest is part of growth.","Learning never stops.","Mentorship multiplies reach."],"todayMission":"Write a letter to your future self describing your legacy and turn it into dua.","quotes":[{"type":"Quran","text":"Whoever does righteous deeds... will enter Paradise. (4:124)"},{"type":"Hadith","text":"Deeds continue after death via ongoing charity, knowledge, or righteous offspring. (Muslim)"},{"type":"Scholar","text":"Vision aligned with action changes societies. – Ibn Khaldun"}],"tips":["Review goals every Friday.","Pray istikhara before major plans.","Document answered duas for motivation.","Mentor youth monthly.","Renew intentions before big projects."],"resources":[{"label":"Legacy Planner Workbook","type":"Workbook","link":"https://example.com/legacy"},{"label":"Future Focus Podcast","type":"Podcast","link":"https://example.com/future"},{"label":"Strategic Dua Guide","type":"PDF","link":"https://example.com/dua"}],"nextSteps":["Set spiritual goals for 30, 90, 365 days.","Start a legacy project that lasts beyond a year.","Mentor at least one person under 25.","Write a will that includes sadaqah jariyah."],"keyInsights":["Consistency compounds like interest.","Legacy is service, not prize.","Vision paired with dua outruns fear.","Documenting progress keeps you accountable.","Hope in Allah outlives discomfort."],"learningObjectives":["Set spiritual goals for 30/90/365 days and review them weekly.","Plan a legacy project that benefits others beyond your lifetime.","Commit to mentoring or teaching to multiply your impact.","Sketch a 20-year impact vision and add one action for this year.","Pair each goal with a dua to keep hope alive."],"videos":[{"title":"Legacy Planning 101","url":"https://www.youtube.com/watch?v=qrHzZOjjc9c","description":"Blueprints for setting spiritual milestones that outlive you."},{"title":"Mentorship That Multiplies","url":"https://www.youtube.com/watch?v=RqZaQ5NeRuU","description":"How mentoring one soul ripples into generations."},{"title":"Documenting Growth","url":"https://www.youtube.com/watch?v=v4F68iecNaE","description":"Tracking goals with gratitude and regular review."},{"title":"Hope, Dua, and Legacy","url":"https://www.youtube.com/watch?v=R5hDKzDyS8w","description":"Pairing every aspiration with Allah through dua."}]}]');

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

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"questions":[{"question":"Which statement is the Shahada?","options":["La ilaha illa Allah","Allahu Akbar","Subhan Allah","Alhamdulillah"],"answer":"La ilaha illa Allah"},{"question":"Tawheed ar-Ruboobiyyah affirms which attribute of Allah?","options":["His names","His creation","His Lordship","His reward"],"answer":"His Lordship"},{"question":"Best descriptor of Tawheed al-Uloohiyyah?","options":["Worship only Allah","Study the Quran","Respect prophets","Give charity"],"answer":"Worship only Allah"},{"question":"How many categories does Tawheed include in this lesson?","options":["One","Two","Three","Four"],"answer":"Three"},{"question":"Which act negates Tawheed?","options":["Prayer","Charity","Worshiping idols","Fasting"],"answer":"Worshiping idols"},{"question":"Complete: La ilaha ...","options":["illa Allah","illallah","ilta Allah","illallahumma"],"answer":"illa Allah"},{"question":"Which dua expresses gratitude for guidance?","options":["Rabbana atina","SubhanAllah","Bismillah","La hawla"],"answer":"Rabbana atina"},{"question":"Who testified to Allah’s oneness in the celestial gathering?","options":["Souls","Angels","Prophets","Jinn"],"answer":"Souls"}]},{"chapterId":2,"questions":[{"question":"Belief in angels is part of which article of faith?","options":["Fourth","Third","Second","First"],"answer":"Fourth"},{"question":"Which article addresses the revelations?","options":["Third","Sixth","Second","Fifth"],"answer":"Third"},{"question":"Belief in prophethood is the...","options":["Fifth article","Second pillar","First article","Fourth command"],"answer":"Fifth article"},{"question":"Recognizing predestination is the...","options":["Second article","Third pillar","First pillar","Fourth article"],"answer":"Second article"},{"question":"What ties all articles of faith together?","options":["Allah’s oneness","Prayer","Fasting","Knowledge"],"answer":"Allah’s oneness"},{"question":"Which of these is not part of the articles?","options":["Belief in prophets","Belief in angels","Belief in the Quran","Belief in saints"],"answer":"Belief in saints"},{"question":"The books include the Quran and...","options":["Torah","Poetry","Myths","Stories"],"answer":"Torah"},{"question":"Who completed the chain of revelation?","options":["Muhammad ﷺ","Moses","Jesus","Noah"],"answer":"Muhammad ﷺ"}]},{"chapterId":3,"questions":[{"question":"How many daily prayers are required?","options":["Five","Four","Six","Seven"],"answer":"Five"},{"question":"Which pillar requires purification before prayer?","options":["Sawm","Zakat","Wudu","Hajj"],"answer":"Wudu"},{"question":"Zakat is given to whom?","options":["Poor","Neighbors","Friends","Leaders"],"answer":"Poor"},{"question":"Hajj is performed in which city?","options":["Makkah","Madina","Jerusalem","Taif"],"answer":"Makkah"},{"question":"Fasting occurs during which month?","options":["Ramadan","Shawwal","Dhul-Hijjah","Rajab"],"answer":"Ramadan"},{"question":"Which call signals prayer time?","options":["Adhan","Iqama","Takbir","Dua"],"answer":"Adhan"},{"question":"How many pillars are there in Islam?","options":["Five","Four","Six","Seven"],"answer":"Five"},{"question":"Which pillar affirms no partners with Allah?","options":["Shahada","Salah","Sawm","Zakat"],"answer":"Shahada"}]},{"chapterId":4,"questions":[{"question":"Which revelation begins with \'Iqra\'?","options":["Al-Alaq","Al-Fatiha","Al-Kawthar","An-Nas"],"answer":"Al-Alaq"},{"question":"The angel who brought revelation is?","options":["Jibril","Mikail","Israfil","Azrael"],"answer":"Jibril"},{"question":"The Quran is described as?","options":["Guidance","Story","Law","Poem"],"answer":"Guidance"},{"question":"Which surah praises Allah for being Merciful?","options":["Al-Fatiha","Al-Ikhlas","Al-Nas","Al-Falaq"],"answer":"Al-Fatiha"},{"question":"Study of the Quran is encouraged for?","options":["Everyone","Only Scholars","Only Men","Only Kings"],"answer":"Everyone"},{"question":"Which of these is part of revelation?","options":["Hadith","Poetry","Stories","Myths"],"answer":"Hadith"},{"question":"The Quran was revealed over?","options":["23 years","10 years","30 years","40 years"],"answer":"23 years"},{"question":"Who preserved the Quran in writing?","options":["Scribes","Teachers","Poets","Kings"],"answer":"Scribes"}]},{"chapterId":5,"questions":[{"question":"The Prophet ﷺ was known for his?","options":["Truthfulness","Wealth","Silence","Feeding"],"answer":"Truthfulness"},{"question":"He migrated to?","options":["Madina","Makkah","Taif","Yathrib"],"answer":"Madina"},{"question":"His life is recorded in the?","options":["Seerah","Bible","Torah","Sutras"],"answer":"Seerah"},{"question":"Which city hosted the Farewell pilgrimage?","options":["Makkah","Madina","Taif","Jerusalem"],"answer":"Makkah"},{"question":"Muhammad ﷺ is the final?","options":["Prophet","King","Scholar","Judge"],"answer":"Prophet"},{"question":"Which attribute best describes the Prophet?","options":["Mercy","Wealth","Power","Silence"],"answer":"Mercy"},{"question":"He taught Muslims to be?","options":["Just","Harsh","Strong","Silent"],"answer":"Just"},{"question":"His companions are known as?","options":["Sahaba","Men","Kings","Scholars"],"answer":"Sahaba"}]},{"chapterId":6,"questions":[{"question":"Fajr prayer occurs at?","options":["Dawn","Noon","Evening","Night"],"answer":"Dawn"},{"question":"Maghrib prayer begins after?","options":["Sunset","Noon","Dawn","Midnight"],"answer":"Sunset"},{"question":"Who said prayer is light?","options":["Prophet ﷺ","Companions","Scholars","Kings"],"answer":"Prophet ﷺ"},{"question":"How many units is Maghrib?","options":["3","4","2","1"],"answer":"3"},{"question":"Prayer includes recitation and?","options":["Bowing","Sleeping","Talking","Eating"],"answer":"Bowing"},{"question":"The first pillar of Islam is?","options":["Shahada","Salah","Zakat","Sawm"],"answer":"Shahada"},{"question":"Which action refreshes Salah?","options":["Wudu","Charity","Fasting","Travel"],"answer":"Wudu"},{"question":"Prayer reminds us of?","options":["Allah","People","Money","Celebrations"],"answer":"Allah"}]},{"chapterId":7,"questions":[{"question":"Good manners toward others are part of?","options":["Adab","Hajj","Sawm","Zakat"],"answer":"Adab"},{"question":"Which habit builds community?","options":["Helping others","Ignoring","Hoarding","Working alone"],"answer":"Helping others"},{"question":"Kindness starts with?","options":["Sincerity","Noise","Money","Power"],"answer":"Sincerity"},{"question":"Forgiveness is greater than?","options":["Grudges","Strength","Power","Wealth"],"answer":"Grudges"},{"question":"Sharing is part of?","options":["Leadership","Hesitation","Silence","Isolation"],"answer":"Leadership"},{"question":"The Prophet ﷺ said: \'The believer is...\'?","options":["Sympathetic","Silent","Strong","Angry"],"answer":"Sympathetic"},{"question":"Community grows through?","options":["Trust","Control","Fear","Debt"],"answer":"Trust"},{"question":"Charity increases?","options":["Purity","Debt","Pride","Noise"],"answer":"Purity"}]},{"chapterId":8,"questions":[{"question":"Living halal requires choosing?","options":["Permissible food","Everything","Money","Power"],"answer":"Permissible food"},{"question":"The lifestyle chapter teaches about?","options":["Halal & Haram","Sports","Politics","Cars"],"answer":"Halal & Haram"},{"question":"Which act keeps you mindful?","options":["Dhikr","Chattings","Silence","Watching"],"answer":"Dhikr"},{"question":"Avoiding haram comes from?","options":["Tawheed","Fear","Money","Popularity"],"answer":"Tawheed"},{"question":"Balance in living is called?","options":["Moderation","Excess","Hoarding","Noise"],"answer":"Moderation"},{"question":"Allah loves who?","options":["Those who suppress anger","Opposers","Wealthy","Strong"],"answer":"Those who suppress anger"},{"question":"Which is a daily habit to stay halal?","options":["Seeking knowledge","Hitting others","Idle talk","Gossip"],"answer":"Seeking knowledge"},{"question":"Freedom comes from?","options":["Submission to Allah","Rebellion","Isolation","Chaos"],"answer":"Submission to Allah"}]},{"chapterId":9,"questions":[{"question":"Community care is expressed through?","options":["Helping neighbors","Ignoring","Yelling","Holding grudges"],"answer":"Helping neighbors"},{"question":"Ummah strength depends on?","options":["Unity","Isolation","Money","Control"],"answer":"Unity"},{"question":"Supporting others means giving?","options":["Time","Fear","Criticism","Silence"],"answer":"Time"},{"question":"Sharing guidance builds?","options":["Support","Greed","Pride","Silence"],"answer":"Support"},{"question":"Jummah prayers strengthen?","options":["Community","Isolation","Fear","Loss"],"answer":"Community"},{"question":"Good words are part of?","options":["Adab","Noise","Silence","Victory"],"answer":"Adab"},{"question":"Charity uplifts?","options":["Hearts","Houses","Noise","Silence"],"answer":"Hearts"},{"question":"What binds the Ummah?","options":["Love of Allah","Debates","Division","Fear"],"answer":"Love of Allah"}]},{"chapterId":10,"questions":[{"question":"Continuous growth is achieved by?","options":["Consistency","Rest","Fear","Isolation"],"answer":"Consistency"},{"question":"The future belongs to those who?","options":["Prepare","Wait","Ignore","Criticize"],"answer":"Prepare"},{"question":"Scholarship requires?","options":["Study","Sleep","Money","Noise"],"answer":"Study"},{"question":"Growth is powered by?","options":["Sincere intention","Laziness","Greed","Complaint"],"answer":"Sincere intention"},{"question":"The Prophet ﷺ described excellence as?","options":["Ihsan","Seo","Zero","Weakness"],"answer":"Ihsan"},{"question":"Planning your day involves?","options":["Goals","Dreams","Fears","Delays"],"answer":"Goals"},{"question":"Knowledge should be shared with?","options":["Family","Enemies","Strangers","Critics"],"answer":"Family"},{"question":"Final success is tied to?","options":["Allah\'s approval","People’s praise","Money","Fame"],"answer":"Allah\'s approval"}]}]');

/***/ }),

/***/ "./resources/js/components/data/roadmap.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/roadmap.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"title":"The Foundation","description":"Introduction to Islam & Tawheed","icon":"auto_awesome","color":"emerald","videoUrl":"PDxobYt_9zM"},{"id":2,"title":"The Beliefs","description":"Six Articles of Faith","icon":"psychology","color":"indigo","videoUrl":"Jd6dIqJ6_Zg"},{"id":3,"title":"The Pillars","description":"The Five Acts of Worship","icon":"star","color":"amber","videoUrl":"TpcO0uE1r-w"},{"id":4,"title":"The Quran","description":"Divine Revelation","icon":"menu_book","color":"teal","videoUrl":"1Y72J03fK-Y"},{"id":5,"title":"The Prophet","description":"Life of Muhammad (peace be upon him)","icon":"history_edu","color":"cyan","videoUrl":"sZ3rG-aWzWw"},{"id":6,"title":"The Prayer","description":"Connection (Salah)","icon":"schedule","color":"emerald","videoUrl":"kScrL8m1qMs"},{"id":7,"title":"The Manners","description":"Islamic Etiquette (Adab)","icon":"handshake","color":"rose","videoUrl":"B1J2_1wK6tM"},{"id":8,"title":"The Lifestyle","description":"Halal & Haram","icon":"style","color":"violet","videoUrl":"XJt9r-x1qMs"},{"id":9,"title":"The Community","description":"Ummah & Support","icon":"groups","color":"blue","videoUrl":"lJt9r-x1qMs"},{"id":10,"title":"The Future","description":"Continuous Growth","icon":"trending_up","color":"slate","videoUrl":"yJt9r-x1qMs"},{"id":11,"title":"The Hereafter","description":"Death, Grave & Beyond","icon":"nightlight","color":"zinc","videoUrl":"9s3rG-aWzWw"},{"id":12,"title":"Paradise & Hell","description":"Your Permanent Home","icon":"park","color":"green","videoUrl":"JannahTour"},{"id":13,"title":"Dua & Dhikr","description":"Weapons of the Believer","icon":"favorite","color":"purple","videoUrl":"dua-weapon"},{"id":14,"title":"Family & Marriage","description":"Building a Righteous Home","icon":"family_restroom","color":"pink","videoUrl":"marriage101"},{"id":15,"title":"The Heart","description":"Purification & Spiritual Diseases","icon":"favorite","color":"red","videoUrl":"heartpurification"}]');

/***/ })

}]);