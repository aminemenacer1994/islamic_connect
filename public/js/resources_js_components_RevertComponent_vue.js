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
/* harmony import */ var _data_glossary_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/glossary.json */ "./resources/js/components/data/glossary.json");
/* harmony import */ var _data_lessons_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/lessons.json */ "./resources/js/components/data/lessons.json");
/* harmony import */ var _data_missions_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/missions.json */ "./resources/js/components/data/missions.json");
/* harmony import */ var _data_quizzes_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/quizzes.json */ "./resources/js/components/data/quizzes.json");






const normalizeJson = value => {
  if (value && Array.isArray(value)) return value;
  if (value && value.default && Array.isArray(value.default)) return value.default;
  return [];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  name: 'App',
  data() {
    return {
      roadmapData: normalizeJson(_data_roadmap_json__WEBPACK_IMPORTED_MODULE_1__),
      glossary: normalizeJson(_data_glossary_json__WEBPACK_IMPORTED_MODULE_2__),
      lessons: normalizeJson(_data_lessons_json__WEBPACK_IMPORTED_MODULE_3__),
      missions: normalizeJson(_data_missions_json__WEBPACK_IMPORTED_MODULE_4__),
      quizzes: normalizeJson(_data_quizzes_json__WEBPACK_IMPORTED_MODULE_5__),
      showCelebration: null,
      mobileNavOpen: false,
      maxStepReached: 1,
      activeStepId: 1,
      selectedPill: 1,
      // Quiz state
      selectedAnswers: {},
      quizSubmitted: false,
      quizCompleted: false,
      quizScore: 0,
      // Revert steps state
      activeRevertStep: 0,
      revertSteps: [{
        title: "Review Key Concepts",
        description: "Go through the main learning points and ensure you understand the core principles.",
        completed: false
      }, {
        title: "Practice Implementation",
        description: "Apply what you've learned in a practical exercise or real-world scenario.",
        completed: false
      }, {
        title: "Test Your Knowledge",
        description: "Complete the quiz to validate your understanding of the material.",
        completed: false
      }, {
        title: "Document Learnings",
        description: "Take notes on key insights and how you can apply them moving forward.",
        completed: false
      }]
    };
  },
  computed: {
    lessonEntries() {
      return this.lessons;
    },
    currentLesson() {
      return this.lessonEntries.find(entry => entry.chapterId === this.selectedPill) || this.lessonEntries[0];
    },
    currentQuiz() {
      return this.quizzes.find(quiz => quiz.chapterId === this.selectedPill) || this.quizzes[0];
    },
    activeStep() {
      return this.roadmapData.find(s => s.id === this.activeStepId) || this.roadmapData[0];
    },
    isCurrentStepCompleted() {
      return this.activeStep.id < this.maxStepReached;
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
    allQuestionsAnswered() {
      var _this$currentQuiz;
      return (_this$currentQuiz = this.currentQuiz) === null || _this$currentQuiz === void 0 || (_this$currentQuiz = _this$currentQuiz.questions) === null || _this$currentQuiz === void 0 ? void 0 : _this$currentQuiz.every((_, index) => this.selectedAnswers[index] !== undefined);
    }
  },
  mounted() {
    const saved = localStorage.getItem('maxStepReached');
    if (saved) {
      const value = parseInt(saved);
      this.maxStepReached = value;
      this.activeStepId = value;
      this.selectedPill = value;
    }
  },
  methods: {
    selectPill(stepId) {
      this.selectedPill = stepId;
      this.handleSelectStep(stepId);
      this.mobileNavOpen = false;
      this.resetQuiz();
    },
    handleSelectStep(stepId) {
      if (stepId <= this.maxStepReached) {
        this.activeStepId = stepId;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      if (stepId > this.maxStepReached) {
        this.maxStepReached = stepId;
      }
    },
    handleStepComplete() {
      var _this$roadmapData$fin;
      const nextStep = this.activeStepId + 1;
      if (nextStep > this.maxStepReached) {
        this.maxStepReached = nextStep;
        localStorage.setItem('maxStepReached', nextStep.toString());
      }
      const title = ((_this$roadmapData$fin = this.roadmapData.find(s => s.id === this.activeStepId)) === null || _this$roadmapData$fin === void 0 ? void 0 : _this$roadmapData$fin.title) || 'Chapter Completed';
      this.showCelebration = title;
      setTimeout(() => {
        this.showCelebration = null;
      }, 4000);
    },
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
    selectAnswer(questionIndex, optionIndex) {
      if (!this.quizSubmitted) {
        this.$set(this.selectedAnswers, questionIndex, optionIndex);
      }
    },
    submitQuiz() {
      this.quizSubmitted = true;
      const totalQuestions = this.currentQuiz.questions.length;
      const correctAnswers = this.currentQuiz.questions.reduce((count, question, index) => {
        const selectedOptionIndex = this.selectedAnswers[index];
        if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].correct) {
          return count + 1;
        }
        return count;
      }, 0);
      this.quizScore = Math.round(correctAnswers / totalQuestions * 100);
      this.quizCompleted = true;
    },
    resetQuiz() {
      this.selectedAnswers = {};
      this.quizSubmitted = false;
      this.quizCompleted = false;
      this.quizScore = 0;
    },
    markStepComplete(stepIndex) {
      this.revertSteps[stepIndex].completed = true;
      if (stepIndex < this.revertSteps.length - 1) {
        this.activeRevertStep = stepIndex + 1;
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
  class: "revert-shell"
};
const _hoisted_2 = {
  class: "container-fluid revert-content px-3 px-md-4 py-4 py-md-5"
};
const _hoisted_3 = {
  class: "row g-4"
};
const _hoisted_4 = {
  class: "navigation-card"
};
const _hoisted_5 = {
  class: "progress-indicator mb-4"
};
const _hoisted_6 = {
  class: "d-flex justify-content-between align-items-center mb-2"
};
const _hoisted_7 = {
  class: "text-muted small"
};
const _hoisted_8 = {
  class: "progress-bar-container"
};
const _hoisted_9 = {
  class: "text-muted small mt-2 mb-0"
};
const _hoisted_10 = {
  class: "nav nav-pills flex-column gap-2",
  role: "tablist"
};
const _hoisted_11 = ["onClick", "disabled"];
const _hoisted_12 = {
  class: "step-indicator me-3"
};
const _hoisted_13 = {
  key: 0,
  class: "bi bi-check-lg"
};
const _hoisted_14 = {
  key: 1,
  class: "current-step"
};
const _hoisted_15 = {
  key: 2,
  class: "bi bi-lock"
};
const _hoisted_16 = {
  class: "step-title flex-grow-1 text-start"
};
const _hoisted_17 = {
  key: 0,
  class: "bi bi-chevron-right ms-2 active-arrow"
};
const _hoisted_18 = {
  class: "col-lg-9 col-xl-10"
};
const _hoisted_19 = {
  class: "content-wrapper"
};
const _hoisted_20 = {
  class: "lesson-header animated-fade-in"
};
const _hoisted_21 = {
  class: "d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4"
};
const _hoisted_22 = {
  class: "mb-3 mb-md-0"
};
const _hoisted_23 = {
  class: "d-flex align-items-center mb-2"
};
const _hoisted_24 = {
  class: "text-uppercase text-muted fw-bold tracking-wide small"
};
const _hoisted_25 = {
  class: "fw-bold display-6 text-dark mb-2"
};
const _hoisted_26 = {
  class: "lead text-muted mb-0"
};
const _hoisted_27 = {
  class: "content-sections"
};
const _hoisted_28 = {
  class: "card-header d-flex align-items-center"
};
const _hoisted_29 = {
  class: "section-number"
};
const _hoisted_30 = {
  class: "h4 fw-bold text-dark mb-0 ms-3"
};
const _hoisted_31 = {
  class: "card-body"
};
const _hoisted_32 = ["innerHTML"];
const _hoisted_33 = {
  key: 0,
  class: "deep-dive mt-4 p-4 rounded-3"
};
const _hoisted_34 = {
  class: "deep-dive-header d-flex align-items-center mb-3"
};
const _hoisted_35 = {
  class: "fw-bold mb-0 text-dark"
};
const _hoisted_36 = ["innerHTML"];
const _hoisted_37 = {
  class: "content-card quiz-card animated-slide-up",
  style: {
    "animation-delay": "0.3s"
  }
};
const _hoisted_38 = {
  class: "card-body"
};
const _hoisted_39 = {
  class: "quiz-content"
};
const _hoisted_40 = {
  key: 0,
  class: "quiz-questions"
};
const _hoisted_41 = {
  class: "fw-bold text-dark mb-3"
};
const _hoisted_42 = {
  class: "options"
};
const _hoisted_43 = ["onClick"];
const _hoisted_44 = {
  class: "option-content"
};
const _hoisted_45 = {
  class: "option-letter"
};
const _hoisted_46 = {
  class: "option-text"
};
const _hoisted_47 = {
  key: 0,
  class: "bi bi-check-lg text-success ms-2"
};
const _hoisted_48 = {
  key: 1,
  class: "bi bi-x-lg text-danger ms-2"
};
const _hoisted_49 = {
  class: "quiz-actions mt-4"
};
const _hoisted_50 = ["disabled"];
const _hoisted_51 = {
  class: "quiz-results text-center py-4"
};
const _hoisted_52 = {
  class: "result-icon mb-3"
};
const _hoisted_53 = {
  class: "text-muted mb-3"
};
const _hoisted_54 = {
  class: "result-message mb-4"
};
const _hoisted_55 = {
  class: "content-card next-steps-card animated-slide-up",
  style: {
    "animation-delay": "0.4s"
  }
};
const _hoisted_56 = {
  class: "card-body"
};
const _hoisted_57 = {
  class: "steps-list"
};
const _hoisted_58 = {
  class: "step-badge me-3"
};
const _hoisted_59 = {
  class: "step-text fs-6 text-dark flex-grow-1"
};
const _hoisted_60 = {
  class: "content-card revert-steps-card animated-slide-up",
  style: {
    "animation-delay": "0.5s"
  }
};
const _hoisted_61 = {
  class: "card-body"
};
const _hoisted_62 = {
  class: "revert-steps"
};
const _hoisted_63 = {
  class: "step-number me-3"
};
const _hoisted_64 = {
  class: "step-content flex-grow-1"
};
const _hoisted_65 = {
  class: "fw-bold text-dark mb-2"
};
const _hoisted_66 = {
  class: "text-muted mb-2 fs-6"
};
const _hoisted_67 = {
  class: "step-actions mt-2"
};
const _hoisted_68 = ["onClick"];
const _hoisted_69 = {
  class: "step-status"
};
const _hoisted_70 = {
  key: 0,
  class: "bi bi-check-circle-fill text-success fs-5"
};
const _hoisted_71 = {
  key: 1,
  class: "bi bi-circle text-muted fs-5"
};
const _hoisted_72 = {
  class: "content-card actions-card animated-fade-in mt-4"
};
const _hoisted_73 = {
  class: "card-body"
};
const _hoisted_74 = {
  class: "d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
};
const _hoisted_75 = ["disabled"];
const _hoisted_76 = {
  class: "d-flex gap-2 order-1 order-md-2 mb-3 mb-md-0"
};
const _hoisted_77 = ["disabled"];
const _hoisted_78 = {
  key: 0,
  class: "celebration-toast"
};
const _hoisted_79 = {
  class: "toast-content"
};
const _hoisted_80 = {
  class: "toast-text"
};
const _hoisted_81 = {
  class: "toast-message"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson4, _ctx$currentQuiz, _ctx$currentLesson5;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "background-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Navigation Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mobile-nav-toggle d-lg-none",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.mobileNavOpen ? 'bi-x-lg' : 'bi-list'])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Sidebar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-lg-3 col-xl-2", {
      'mobile-open': _ctx.mobileNavOpen
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"user-profile mb-4 d-flex align-items-center\" data-v-1d764944><div class=\"avatar me-3\" data-v-1d764944><i class=\"bi bi-person-check\" data-v-1d764944></i></div><div data-v-1d764944><p class=\"mb-0 fw-bold fs-6\" data-v-1d764944>Welcome back!</p><p class=\"mb-0 text-muted small\" data-v-1d764944>Continue your journey</p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-bold small"
  }, "Course Progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.completedChapters) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.totalChapters), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progressPercentage + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round(_ctx.progressPercentage)) + "% Complete", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.roadmapData, step => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: step.id,
      class: "nav-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link text-start d-flex align-items-center w-100", {
        active: _ctx.selectedPill === step.id,
        completed: step.id < _ctx.maxStepReached,
        locked: step.id > _ctx.maxStepReached
      }]),
      onClick: $event => _ctx.selectPill(step.id),
      disabled: step.id > _ctx.maxStepReached
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [step.id < _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_13)) : step.id === _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.id), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_15))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), step.id === _ctx.selectedPill ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_11)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Actions "), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"quick-actions mt-4 pt-3 border-top\" data-v-1d764944><h6 class=\"fw-bold small mb-3\" data-v-1d764944>Quick Actions</h6><div class=\"d-grid gap-2\" data-v-1d764944><button class=\"btn btn-outline-primary btn-sm\" data-v-1d764944><i class=\"bi bi-journal-text me-2\" data-v-1d764944></i>My Notes </button><button class=\"btn btn-outline-primary btn-sm\" data-v-1d764944><i class=\"bi bi-download me-2\" data-v-1d764944></i>Resources </button></div></div>", 1))])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journey me-2 text-primary"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_26, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-quote me-1 text-accent"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.quote), 1 /* TEXT */)])]), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"d-flex align-items-center gap-2\" data-v-1d764944><span class=\"status-badge\" data-v-1d764944><span class=\"status-dot\" data-v-1d764944></span><i class=\"bi bi-clock me-1\" data-v-1d764944></i> In Progress </span><div class=\"btn-group\" data-v-1d764944><button class=\"btn btn-icon\" title=\"Bookmark\" data-v-1d764944><i class=\"bi bi-bookmark\" data-v-1d764944></i></button><button class=\"btn btn-icon\" title=\"Share\" data-v-1d764944><i class=\"bi bi-share\" data-v-1d764944></i></button></div></div>", 1))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Learning Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Sections "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "content-card section-card animated-slide-up",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        animationDelay: `${index * 0.1}s`
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_30, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-file-text me-2 text-primary"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content fs-6 lh-lg text-dark",
      innerHTML: section.content
    }, null, 8 /* PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Deep Dive Section "), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb me-2 fs-5 text-warning"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "deep-dive-content fs-6 lh-lg text-dark",
      innerHTML: section.deepDive.content
    }, null, 8 /* PROPS */, _hoisted_36)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-patch-question me-3 text-primary fs-4"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold text-dark mb-0"
  }, "Knowledge Check")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-intro mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted fs-6 mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Test your understanding with this quick quiz ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [!_ctx.quizCompleted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentQuiz = _ctx.currentQuiz) === null || _ctx$currentQuiz === void 0 ? void 0 : _ctx$currentQuiz.questions, (question, qIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "question mb-4",
      key: qIndex
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(question.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(question.options, (option, oIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: oIndex,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["option-card", {
          'selected': _ctx.selectedAnswers[qIndex] === oIndex,
          'correct': _ctx.quizSubmitted && option.correct,
          'incorrect': _ctx.quizSubmitted && _ctx.selectedAnswers[qIndex] === oIndex && !option.correct
        }]),
        onClick: $event => _ctx.selectAnswer(qIndex, oIndex)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String.fromCharCode(65 + oIndex)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.text), 1 /* TEXT */), _ctx.quizSubmitted && option.correct ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_47)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.quizSubmitted && _ctx.selectedAnswers[qIndex] === oIndex && !option.correct ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_48)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_43);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.submitQuiz && _ctx.submitQuiz(...args)),
    disabled: !_ctx.allQuestionsAnswered
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-send me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Submit Answers ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_50)])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz Results "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi bi-trophy", _ctx.quizScore >= 70 ? 'text-warning' : 'text-secondary'])
  }, null, 2 /* CLASS */)]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "fw-bold text-dark mb-2"
  }, "Quiz Complete!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, "You scored " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizScore) + "%", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fs-6", _ctx.quizScore >= 70 ? 'text-success' : 'text-warning'])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi me-2", _ctx.quizScore >= 70 ? 'bi-emoji-smile' : 'bi-emoji-neutral'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quizScore >= 70 ? 'Great job! You have a solid understanding.' : 'Review the material and try again.'), 1 /* TEXT */)], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-primary",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.resetQuiz && _ctx.resetQuiz(...args))
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Try Again ", -1 /* CACHED */)]))])])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle me-3 text-primary fs-4"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold text-dark mb-0"
  }, "Next Steps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson5 = _ctx.currentLesson) === null || _ctx$currentLesson5 === void 0 ? void 0 : _ctx$currentLesson5.nextSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: step,
      class: "step-item d-flex align-items-start mb-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step), 1 /* TEXT */), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle text-muted ms-2"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Revert Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear me-3 text-primary fs-4"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold text-dark mb-0"
  }, "Implementation Steps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.revertSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["revert-step d-flex align-items-start mb-4 p-3 rounded-3", {
        'active-step': index === _ctx.activeRevertStep
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-primary me-2",
      onClick: $event => _ctx.markStepComplete(index)
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-lg me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Mark Complete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_68), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-secondary"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clock me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Remind Later ")], -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [step.completed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_70)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_71))])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-lg btn-outline-primary order-2 order-md-1",
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[3] || (_cache[3] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_75), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-lg btn-outline-secondary"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-download me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save Progress ")], -1 /* CACHED */)), _ctx.selectedPill === _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn btn-lg btn-success",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.handleStepComplete && _ctx.handleStepComplete(...args))
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Complete Chapter ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-lg btn-primary order-3",
    disabled: _ctx.selectedPill >= _ctx.roadmapData.length,
    onClick: _cache[5] || (_cache[5] = $event => _ctx.selectPill(_ctx.selectedPill + 1))
  }, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Next Chapter ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right ms-2"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_77)])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Celebration Toast "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showCelebration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toast-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trophy-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "toast-title"
  }, "Milestone Reached!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showCelebration), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "toast-close",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.showCelebration = null)
  }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-timer"
  }, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]))]);
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

/***/ "./resources/js/components/data/glossary.json":
/*!****************************************************!*\
  !*** ./resources/js/components/data/glossary.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"1":[{"t":"Tawheed","d":"The Oneness of Allah."},{"t":"Shahada","d":"Testimony of Faith."},{"t":"Sunnah","d":"The way of the Prophet."}],"2":[{"t":"Iman","d":"Faith/Belief."},{"t":"Malaikah","d":"Angels."},{"t":"Qadar","d":"Divine Destiny."}],"3":[{"t":"Salah","d":"Prayer."},{"t":"Zakat","d":"Charity."},{"t":"Sawm","d":"Fasting."},{"t":"Hajj","d":"Pilgrimage."}],"4":[{"t":"Ayah","d":"Verse."},{"t":"Surah","d":"Chapter."},{"t":"Wahi","d":"Revelation."}],"6":[{"t":"Wudu","d":"Ritual ablution."},{"t":"Rakat","d":"Unit of prayer."},{"t":"Qibla","d":"Direction of Makkah."}],"7":[{"t":"Adab","d":"Etiquette/Manners."},{"t":"Salam","d":"Peace (Greeting)."}]}');

/***/ }),

/***/ "./resources/js/components/data/lessons.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/lessons.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation: Tawheed – The Soul of All Existence","summary":"Tawheed is not merely the first pillar or the first article of faith — it is the purpose of creation, the essence of salvation, and the only truth that grants eternal peace in this life and the next.","quote":"And I did not create the jinn and mankind except to worship Me alone. (Qur’an 51:56)","visiWords":["Oneness","Freedom","Purpose","Sincerity","Love","Awe","Reliance","Purity","Eternity","Light"],"sections":[{"title":"The Three Categories of Tawheed (Detailed)","content":"<ol><li><strong>Tawheed ar-Ruboobiyyah</strong> – Recognizing Allah as the sole Creator, Provider, Giver of life and death, and Manager of all affairs.</li><li><strong>Tawheed al-Uloohiyyah (or al-‘Ibadah)</strong> – Directing all acts of worship (prayer, dua, sacrifice, vow, fear, hope, trust, love, seeking help) exclusively to Him.</li><li><strong>Tawheed al-Asmaa’ was-Sifaat</strong> – Affirming every Name and Attribute Allah affirmed for Himself in the Qur’an and authentic Sunnah, without tahreef (distortion), ta’til (negation), takyif (asking how), or tamthil (likening to creation).</li></ol>","deepDive":{"title":"The Greatest Shirk Today","content":"<p>Modern shirk is often subtle: wearing ta’weez for protection, swearing by other than Allah, seeking barakah from graves, loving celebrities more than Allah, or fearing public opinion more than Allah’s displeasure.</p>"}},{"title":"The Seven Conditions of La ilaha illa Allah","content":"<ul><li>Al-‘Ilm (Knowledge of its meaning)</li><li>Al-Yaqeen (Absolute certainty)</li><li>Al-Qabool (Acceptance)</li><li>Al-Inqiyad (Submission)</li><li>As-Sidq (Truthfulness)</li><li>Al-Ikhlas (Sincerity)</li><li>Al-Mahabbah (Love for this statement and hatred for its opposite)</li></ul>","deepDive":{"title":"Test Yourself Daily","content":"<p>Every night ask: Did I fulfil all seven today? If any is weak, renew intention and make dua for strength.</p>"}},{"title":"Tawheed in the Stories of the Prophets","content":"<p>Every prophet opened with the same sentence: “O my people, worship Allah; you have no deity other than Him.” From Nuh (950 years), to Ibrahim smashing the idols, to Musa confronting Pharaoh, to ‘Isa refuting divinity claims, to Muhammad ﷺ in the Ka’bah — the message unchanged.</p>"},{"title":"The Fruits of Tawheed in This Life","content":"<ul><li>Inner peace and zero anxiety about the future</li><li>Courage against tyrants</li><li>Barakah in time and provision</li><li>Protection from Shaytan’s whispers</li><li>Constant sweetness of faith</li></ul>"}],"paragraphs":["Tawheed is the only idea that, once it enters the heart properly, makes all confusion disappear.","A single moment of perfect Tawheed outweighs a thousand years of worship mixed with riya’ (showing off) or minor shirk.","The entire Qur’an is, in reality, a detailed explanation of ‘La ilaha illa Allah’.","When Tawheed is weak, a person becomes enslaved by creation. When Tawheed is strong, even kings cannot enslave him."],"insights":["The greatest gift you can give your children is rock-solid Tawheed before anything else.","Every sin ultimately stems from weak Tawheed.","The people of Paradise will have no regret except moments they spent without remembering Allah.","Tawheed turns hardships into worship and worship into the sweetest experience."],"todayMission":"For the next 24 hours, consciously catch yourself any time you feel excessive fear, love, hope, or reliance on something other than Allah. Immediately say ‘Hasbiyallahu la ilaha illa Huwa’ seven times and feel the shift in your chest.","quotes":[{"type":"Quran","text":"Unquestionably, for Allah is the pure religion. And those who take protectors besides Him [say], \'We only worship them that they may bring us nearer to Allah in position.\' Indeed, Allah will judge between them… (39:3)"},{"type":"Quran","text":"So whoever hopes for the meeting with his Lord – let him do righteous work and not associate anyone in the worship of his Lord. (18:110)"},{"type":"Hadith","text":"Allah said: ‘I am so self-sufficient that I am in no need of having partners. Thus, whoever does an action for someone else’s sake as well as Mine will have that action renounced by Me to him whom he associated with Me.’ (Muslim"},{"type":"Scholar","text":"Tawheed is to single out Allah in intention, love, fear, hope, reverence, and action. – Ibn Taymiyyah"}],"tips":["Start and end every dua with 3× ‘La ilaha illa Allahu wahdahu la shareeka lah…’ (the full first part of the adhan).","Make a ‘Shirk Radar’ list: write down everything you fear or love too much, then actively reduce it.","Read Surah Al-Ikhlas, Al-Kafirun, and the last two ayahs of Al-Baqarah every night before sleep – the Prophet ﷺ promised protection and sufficiency.","When you see something amazing, immediately say ‘MashaAllah la quwwata illa billah’ to connect beauty back to its source."],"resources":[{"label":"Kitab at-Tawheed – Muhammad ibn Abdil-Wahhab (full PDF)","type":"Book","link":"https://kalamullah.com/Books/Kitab%20At-Tawheed.pdf"},{"label":"The Disease and the Cure (major shirk & minor shirk) – Ibn Qayyim","type":"Book","link":"https://kalamullah.com/ibn-qayyim.html"},{"label":"Tawheed First – Sh. Muhammad Aman al-Jami (15-part series)","type":"Video","link":"https://www.youtube.com/playlist?list=PL2dAJi7G9NwZ3bO1l7P3k2oXU5o5g5p5X"},{"label":"Explanation of the Three Fundamental Principles – Sh. Saleh al-Fawzan","type":"Audio","link":"https://www.spreaker.com/show/three-fundamental-principles"}],"nextSteps":["Finish Kitab at-Tawheed in 40 days (one short chapter per day)","Memorize the 99 Names of Allah with meaning over the next year","Create a personal ‘Tawheed Renewal’ routine every Thursday night","Teach the conditions of the Shahada to at least one person this month"]},{"chapterId":2,"title":"The Beliefs: The Six Pillars of Iman – Windows to the Unseen","summary":"These six convictions transform a Muslim from someone who merely ‘believes in God’ into someone who lives surrounded by angels, guided by revelation, walking toward resurrection and accountability every second.","quote":"Righteousness is not that you turn your faces toward the east or the west, but [true] righteousness is [in] one who believes in Allah, the Last Day, the angels, the Book, and the prophets… (Qur’an 2:177)","visiWords":["Ghayb","Certainty","Angels","Revelation","Resurrection","Justice","Hope","Qadar","Mercy"],"sections":[{"title":"Belief in Allah – The Core That Never Changes","content":"<p>Everything we learned in Chapter 1, plus active love (hubb), awe (khashyah), hope (raja’), and fear (khawf) balanced perfectly.</p>"},{"title":"Belief in the Angels – You Are Never Alone","content":"<p>They record deeds, carry the Throne, deliver revelation, take souls, guard us, pray for us, blow the Trumpet, and manage rain, wind, and provision by Allah’s command.</p>","deepDive":{"title":"Angels & Modern Life","content":"<p>Every WhatsApp message, every secret thought, every dollar earned — two angels are writing it in a book you will read on the Day of Judgment.</p>"}},{"title":"Belief in the Books – The Chain of Guidance","content":"<p>Suhuf of Ibrahim, Tawrah, Zabur, Injil, and finally the Qur’an — the only book Allah promised to protect until the Hour.</p>"},{"title":"Belief in the Messengers – The Best of Mankind","content":"<p>All were men, sent to their own people (except Muhammad ﷺ to all mankind and jinn), faced rejection, remained patient, performed miracles by Allah’s leave, and delivered the same core message.</p>","deepDive":{"title":"Seal of Prophets","content":"<p>Muhammad ﷺ is the final brick. To reject him is to reject all previous prophets, because all of them gave glad tidings of him.</p>"}},{"title":"Belief in the Last Day – The Only Inevitable Event","content":"<p>Minor signs (already happening), major signs (Dajjal, Mahdi, ‘Isa ibn Maryam, Ya’juj Ma’juj, sun rising from west), the Trumpet, resurrection naked & barefoot, 50,000-year Day, the Scales, the Sirat sharper than a sword, the Hawd of the Prophet ﷺ, then forever in Jannah or Hell.</p>"},{"title":"Belief in Qadar – The Secret of Contentment","content":"<p>Four ranks: (1) Allah’s eternal knowledge, (2) writing in Lawh Mahfuz 50,000 years before creation, (3) Allah’s universal will (everything happens by His permission), (4) Allah’s creation of every atom and action.</p>","deepDive":{"title":"Free Will & Qadar Are Not Contradictory","content":"<p>You choose with your limited will; Allah creates your choice with His infinite power. You are responsible because you feel you chose freely.</p>"}}],"paragraphs":["Iman increases with obedience and decreases with sin — treat it like a living plant that needs daily water.","The stronger your belief in the unseen, the weaker the temptations of the seen become.","Every prophet was accused of being a liar, madman, or sorcerer — believing in them trains you to stand with truth even when alone.","The Day of Judgment is closer to you right now than your retirement plan."],"insights":["A heart attached to the Last Day is never depressed about this world.","The angels’ recording is the ultimate accountability partner.","When you truly believe in Qadar, complaining disappears.","The Qur’an only truly enters the heart when you believe it is the actual speech of Allah."],"todayMission":"Tonight before sleep, imagine in detail standing in front of Allah on the Day of Judgment holding your book in your right or left hand. Let the scene make you cry, then immediately make two rak’ahs of repentance and renew your six articles of iman out loud.","quotes":[{"type":"Quran","text":"Everyone upon the earth will perish, and there will remain the Face of your Lord, Owner of Majesty and Honor. (55:26-27)"},{"type":"Hadith","text":"You will be with those whom you love. (Bukhari)"},{"type":"Quran","text":"Allah does not wrong a person even by an atom’s weight… (4:40)"},{"type":"Hadith","text":"Be in this world as if you are a stranger or a wayfarer. (Bukhari)"}],"tips":["Read one page of ‘The Minor Resurrection’ by Ibn Rajab every day for a month.","Say when leaving home: ‘Bismillah, tawakkaltu ‘ala Allah…’ – angels reply ‘You are guided, defended, and protected.’","Keep a ‘Signs of the Hour’ note on your phone — add current events that match prophetic descriptions.","When something bad happens, immediately say ‘Qaddarallahu wa ma sha’a fa‘al’ with a smile."],"resources":[{"label":"The World of the Noble Angels – Umar al-Ashqar","type":"Book","link":"https://kalamullah.com/world-of-angels.html"},{"label":"The Minor Resurrection – Ibn Abi Dunya","type":"Book","link":"https://kalamullah.com/minor-resurrection.html"},{"label":"Divine Will and Predestination – Umar al-Ashqar","type":"Book","link":"https://kalamullah.com/divine-will.html"},{"label":"Journey of the Soul Series – Sh. Yasir Qadhi (30+ parts)","type":"Video","link":"https://www.youtube.com/playlist?list=PLQwe2S8TqMJ1LY-6afDkl0e3w5IA1l1fS"}],"nextSteps":["Read the entire ‘Islamic Creed Series’ (8 volumes) by Umar al-Ashqar over one year","Memorize 20 authentic hadiths about the Last Day","Start a monthly charity reminder named ‘For My Grave’","Study one major sign of the Hour in depth every two months"]},{"chapterId":3,"title":"The Pillars: The Five Pillars – Islam in Motion","summary":"The five pillars are the minimal daily, yearly, and lifetime structure that keeps a Muslim connected to Allah and to the Ummah. They are mercy, not burden.","quote":"The five daily prayers, Friday prayer, Ramadan fast, zakat, and Hajj — whoever establishes them has completed his Islam. (Authenticated by al-Albani)","visiWords":["Routine","Connection","Purification","Brotherhood","Sacrifice","Submission","Revival","Barakah"],"sections":[{"title":"Shahada – The Ever-Renewing Covenant","content":"<p>Say it once to enter Islam, then renew it with every prayer, every adhan, every moment of doubt, and with your last breath.</p>"},{"title":"Salah – The Mi’raj of the Believer","content":"<p>Five times a day you leave this world and stand directly in front of Allah. The Prophet ﷺ said: ‘The coolness of my eyes has been placed in prayer.’</p>","deepDive":{"title":"Levels of Prayer","content":"<p>Some pray like a pecking rooster, some are heedless, some are punished by their prayer, some guard it perfectly, and a few reach the level where prayer takes away their sins like leaves falling from a tree in autumn.</p>"}},{"title":"Zakat – Wealth That Never Decreases","content":"<p>2.5% on gold, silver, cash savings, business goods. Nisab ≈ $6,000 today. Paid once a lunar year.</p>"},{"title":"Sawm – Annual Spiritual Detox","content":"<p>30 days of controlling hunger, thirst, and desire from true dawn to sunset, plus guarding tongue and eyes.</p>","deepDive":{"title":"Night of Power","content":"<p>Worship on Laylat al-Qadr is better than 1,000 months (83+ years). The Prophet ﷺ would do i’tikaf the last ten nights seeking it.</p>"}},{"title":"Hajj – The Ultimate Equalizer","content":"<p>2.5–3 million people wearing two simple white cloths, standing together saying the same talbiyah, circling the same House built by Ibrahim (عليه السلام). No VIP tents in true Hajj.</p>"}],"paragraphs":["The Prophet ﷺ said between every two adhans (Fri to Fri, or prayer to prayer) there is expiation for whatever occurred between them — if only if you pray on time.","The first thing we will be asked about is prayer. If it is accepted, the rest of our deeds will be looked at.","A person who gives zakat properly will find his wealth blessed and increasing, even if mathematically it decreased.","Hajj wipes the slate completely clean — you return like the day your mother gave birth to you."],"insights":["Salah is the first deed to go when faith weakens, and the last to remain when everything else is lost.","The poor you give zakat to will come on Judgment Day carrying your wealth on their necks to save you.","Ramadan is training camp; the rest of the year is the real test.","The Ka’bah is the only place on earth where a billionaire and a beggar stand shoulder to shoulder with zero distinction."],"todayMission":"Choose one pillar you are weakest in right now. Make a 40-day plan with tiny, unbreakable daily actions to fix it. Example: if prayer, start with just Fajr on time for 40 days straight — nothing else.","quotes":[{"type":"Quran","text":"Indeed, prayer prohibits immorality and wrongdoing… (29:45)"},{"type":"Hadith","text":"The difference between us and them (hypocrites) is prayer; whoever abandons it has disbelieved. (Tirmidhi)"},{"type":"Hadith","text":"Zakat is the bridge of Islam. (Tabarani)"},{"type":"Quran","text":"And [mention] when We made the House a place of return for the people and a place of security… (2:125)"}],"tips":["Use a physical prayer chart on your wall for 100 days — never break the chain.","Set zakat payment on autopilot the day your lunar year ends.","Keep miswak in every bag and car — Sunnah that revives the mouth and pleases Allah.","Make a ‘Post-Ramadan 6-Shawwal fast plan before Ramadan even starts."],"resources":[{"label":"A Guide to Salah – Sh. Muhammad al-Munajjid","type":"Book","link":"https://kalamullah.com/guide-to-prayer.html"},{"label":"Zakat Calculation Spreadsheet (free)","type":"Tool","link":"https://zakatcalculator.net"},{"label":"Riyad as-Salihin Audio Explanation – Sh. Hussain Abdul Sattar","type":"Audio","link":"https://www.sacredlearning.org"},{"label":"Virtual Hajj 360° Experience","type":"Video","link":"https://www.youtube.com/watch?v=X8WDA2V9Z2M"}],"nextSteps":["Pray all five prayers on time for 40 consecutive days (use a tracking app)","Pay this year’s zakat early (before it’s due) to taste the barakah","Register for an Umrah trip within the next 12–18 months even if you think you can’t afford it — watch Allah open ways","Lead Taraweeh at home at least one night this Ramadan, even if only for family"]}]');

/***/ }),

/***/ "./resources/js/components/data/missions.json":
/*!****************************************************!*\
  !*** ./resources/js/components/data/missions.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"1":"Memorize the meaning of the Shahada in your native language.","2":"Look at the sky tonight and reflect on the Creator\'s power.","3":"Learn the names of the 5 daily prayers.","4":"Listen to Surah Al-Fatiha with translation.","5":"Read one story about the Prophet\'s kindness.","6":"Practice the Wudu steps at your sink without water first.","7":"Greet 3 people with \'Assalamu Alaikum\' today.","8":"Check the ingredients of your favorite snack.","9":"Find one local mosque on Google Maps.","10":"Make a list of 3 goals for your next month."}');

/***/ }),

/***/ "./resources/js/components/data/quizzes.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/quizzes.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"1":[{"id":1,"question":"What is the core meaning of \'Islam\'?","options":["War and Conquest","Peace through Submission to God","Tradition of ancestors"],"correctIndex":1,"explanation":"Islam comes from the root s-l-m, meaning peace acquired by submitting your will to the Creator."},{"id":2,"question":"What is Tawheed?","options":["Belief in the Trinity","Belief in multiple gods","Belief in the absolute Oneness of God"],"correctIndex":2,"explanation":"Tawheed is the foundational concept of Monotheism in Islam—God is One in essence, attributes, and worship."},{"id":3,"question":"What is the Shahada?","options":["A yearly tax","The testimony of faith","A type of prayer"],"correctIndex":1,"explanation":"The Shahada is the declaration: \'There is no god but Allah, and Muhammad is His Messenger\'."}],"2":[{"id":1,"question":"How many Articles of Faith are there?","options":["Five","Six","Seven"],"correctIndex":1,"explanation":"There are six: Belief in Allah, Angels, Books, Prophets, the Last Day, and Destiny."},{"id":2,"question":"Do Muslims believe in Jesus?","options":["No","Yes, as a mighty Prophet","Yes, as God"],"correctIndex":1,"explanation":"Muslims revere Jesus (Isa) as one of the greatest Prophets of God, but not as divine."},{"id":3,"question":"What is Qadar?","options":["Divine Destiny","Charity","Fasting"],"correctIndex":0,"explanation":"Qadar means Divine Decree—trusting that God has knowledge and control over all outcomes."}],"3":[{"id":1,"question":"Which of these is NOT one of the Five Pillars?","options":["Zakat (Charity)","Jihad (Struggle)","Sawm (Fasting)"],"correctIndex":1,"explanation":"While important, Jihad is not one of the Five Pillars. The Pillars are Shahada, Salah, Zakat, Sawm, and Hajj."},{"id":2,"question":"How many times do Muslims pray daily?","options":["Three","Five","Seven"],"correctIndex":1,"explanation":"The obligatory prayers (Salah) are performed five times a day."},{"id":3,"question":"What is Hajj?","options":["Weekly fasting","Pilgrimage to Makkah","Daily Charity"],"correctIndex":1,"explanation":"Hajj is the pilgrimage to Makkah that every Muslim must perform once in their lifetime if able."}],"4":[{"id":1,"question":"Who was the Quran revealed to?","options":["Prophet Moses","Prophet Jesus","Prophet Muhammad ﷺ"],"correctIndex":2,"explanation":"The Quran was revealed to the final Prophet, Muhammad ﷺ."},{"id":2,"question":"What is a \'Surah\'?","options":["A verse","A chapter","A prayer"],"correctIndex":1,"explanation":"A Surah is a chapter of the Quran. There are 114 Surahs."},{"id":3,"question":"Has the Quran been changed over time?","options":["Yes, many times","No, it is preserved","Only slightly"],"correctIndex":1,"explanation":"Muslims believe the Quran is preserved word-for-word in its original Arabic since its revelation."}],"5":[{"id":1,"question":"What was the Prophet Muhammad known as before revelation?","options":["The King","Al-Amin (The Trustworthy)","The Warrior"],"correctIndex":1,"explanation":"He was known for his impeccable character and honesty even by his enemies."},{"id":2,"question":"What is the \'Sunnah\'?","options":["The Quran","The way/example of the Prophet","Islamic Law"],"correctIndex":1,"explanation":"Sunnah refers to the practices, habits, and teachings of the Prophet Muhammad ﷺ."},{"id":3,"question":"Do Muslims worship Muhammad?","options":["Yes","No","Sometimes"],"correctIndex":1,"explanation":"Absolutely not. Muslims worship only Allah. Muhammad ﷺ is His servant and messenger."}],"6":[{"id":1,"question":"What is the first prayer of the day?","options":["Isha","Fajr","Asr"],"correctIndex":1,"explanation":"Fajr is the dawn prayer, performed before sunrise."},{"id":2,"question":"What must you do before praying?","options":["Eat","Perform Wudu (Ablution)","Sleep"],"correctIndex":1,"explanation":"Wudu is the ritual washing required to be in a state of purity for prayer."},{"id":3,"question":"What direction do Muslims face when praying?","options":["East","West","Towards the Kaaba (Makkah)"],"correctIndex":2,"explanation":"Muslims face the Qibla (direction of the Kaaba in Makkah) regardless of where they are in the world."}],"7":[{"id":1,"question":"What did the Prophet say he was sent to perfect?","options":["Architecture","Good Character","Wealth"],"correctIndex":1,"explanation":"\'I was sent only to perfect good character/manners.\'"},{"id":2,"question":"Is smiling considered charity?","options":["Yes","No","Only on Fridays"],"correctIndex":0,"explanation":"The Prophet said, \'Your smile for your brother is charity.\'"},{"id":3,"question":"How should a Muslim treat their parents?","options":["Ignore them","With utmost kindness and respect","Argue with them"],"correctIndex":1,"explanation":"Kindness to parents is one of the highest obligations in Islam, second only to worshipping God."}],"8":[{"id":1,"question":"What does \'Halal\' mean?","options":["Forbidden","Permissible","Spicy"],"correctIndex":1,"explanation":"Halal means lawful or permissible."},{"id":2,"question":"Which of these is Haram (Forbidden)?","options":["Chicken","Water","Alcohol"],"correctIndex":2,"explanation":"Intoxicants like alcohol are strictly forbidden in Islam."},{"id":3,"question":"Why are things made Haram?","options":["To make life hard","To protect us from harm","No reason"],"correctIndex":1,"explanation":"Limits are set by the Creator to protect our physical, spiritual, and social well-being."}],"9":[{"id":1,"question":"What is the \'Ummah\'?","options":["A type of food","The global Muslim community","A prayer"],"correctIndex":1,"explanation":"The Ummah refers to the worldwide community of believers, transcending race and borders."},{"id":2,"question":"Are Muslims allowed to be racist?","options":["Yes","No","Only a little"],"correctIndex":1,"explanation":"Racism is strictly forbidden. The Prophet said no Arab is superior to a non-Arab except by piety."},{"id":3,"question":"Does Islam encourage isolation?","options":["Yes","No, it encourages community","It doesn\'t say"],"correctIndex":1,"explanation":"Islam places great emphasis on community, congregational prayer, and visiting one another."}],"10":[{"id":1,"question":"Does learning end after the Shahada?","options":["Yes","No, it is a lifelong journey","Only for one year"],"correctIndex":1,"explanation":"Seeking knowledge is an obligation for every Muslim from cradle to grave."},{"id":2,"question":"What is \'Dua\'?","options":["Pilgrimage","Supplication/Asking God","Charity"],"correctIndex":1,"explanation":"Dua is the act of calling upon Allah personally to ask for your needs."},{"id":3,"question":"What matters most in deeds?","options":["Size","Consistency","Publicity"],"correctIndex":1,"explanation":"The Prophet said the most beloved deeds to Allah are those that are consistent, even if small."}]}');

/***/ }),

/***/ "./resources/js/components/data/roadmap.json":
/*!***************************************************!*\
  !*** ./resources/js/components/data/roadmap.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"title":"The Foundation","description":"Introduction to Islam & Tawheed","icon":"auto_awesome","color":"emerald","videoUrl":"PDxobYt_9zM"},{"id":2,"title":"The Beliefs","description":"Six Articles of Faith","icon":"psychology","color":"indigo","videoUrl":"Jd6dIqJ6_Zg"},{"id":3,"title":"The Pillars","description":"The Five Acts of Worship","icon":"star","color":"amber","videoUrl":"TpcO0uE1r-w"},{"id":4,"title":"The Quran","description":"Divine Revelation","icon":"menu_book","color":"teal","videoUrl":"1Y72J03fK-Y"},{"id":5,"title":"The Prophet","description":"Life of Muhammad ﷺ","icon":"history_edu","color":"cyan","videoUrl":"sZ3rG-aWzWw"},{"id":6,"title":"The Prayer","description":"Connection (Salah)","icon":"schedule","color":"emerald","videoUrl":"kScrL8m1qMs"},{"id":7,"title":"The Manners","description":"Islamic Etiquette (Adab)","icon":"handshake","color":"rose","videoUrl":"B1J2_1wK6tM"},{"id":8,"title":"The Lifestyle","description":"Halal & Haram","icon":"style","color":"violet","videoUrl":"XJt9r-x1qMs"},{"id":9,"title":"The Community","description":"Ummah & Support","icon":"groups","color":"blue","videoUrl":"lJt9r-x1qMs"},{"id":10,"title":"The Future","description":"Continuous Growth","icon":"trending_up","color":"slate","videoUrl":"yJt9r-x1qMs"}]');

/***/ })

}]);