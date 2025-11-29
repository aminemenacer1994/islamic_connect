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
  class: "col-sm-9 col-lg-9 col-xl-9"
};
const _hoisted_19 = {
  class: "lesson-header animated-fade-in"
};
const _hoisted_20 = {
  class: "d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4"
};
const _hoisted_21 = {
  class: "mb-3 mb-md-0"
};
const _hoisted_22 = {
  class: "d-flex align-items-center mb-2"
};
const _hoisted_23 = {
  class: "text-uppercase text-muted fw-bold tracking-wide small"
};
const _hoisted_24 = {
  class: "fw-bold text-left display-6 text-dark mb-2"
};
const _hoisted_25 = {
  class: "card-header d-flex align-items-center"
};
const _hoisted_26 = {
  class: "section-number"
};
const _hoisted_27 = {
  class: "h4 fw-bold text-dark mb-0 ms-3"
};
const _hoisted_28 = {
  class: "card-body"
};
const _hoisted_29 = ["innerHTML"];
const _hoisted_30 = {
  key: 0,
  class: "deep-dive mt-4 p-4 rounded-3"
};
const _hoisted_31 = {
  class: "deep-dive-header d-flex align-items-center mb-3"
};
const _hoisted_32 = {
  class: "fw-bold mb-0 text-dark"
};
const _hoisted_33 = ["innerHTML"];
const _hoisted_34 = {
  class: "content-card next-steps-card animated-slide-up",
  style: {
    "animation-delay": "0.4s"
  }
};
const _hoisted_35 = {
  class: "card-body"
};
const _hoisted_36 = {
  class: "steps-list"
};
const _hoisted_37 = {
  class: "step-badge me-3"
};
const _hoisted_38 = {
  class: "step-text fs-6 text-dark flex-grow-1"
};
const _hoisted_39 = {
  class: "content-card actions-card animated-fade-in mt-4"
};
const _hoisted_40 = {
  class: "card-body"
};
const _hoisted_41 = {
  class: "d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
};
const _hoisted_42 = ["disabled"];
const _hoisted_43 = ["disabled"];
const _hoisted_44 = {
  key: 0,
  class: "celebration-toast"
};
const _hoisted_45 = {
  class: "toast-content"
};
const _hoisted_46 = {
  class: "toast-text"
};
const _hoisted_47 = {
  class: "toast-message"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson4;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "background-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Navigation Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mobile-nav-toggle d-lg-none",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.mobileNavOpen ? 'bi-x-lg' : 'bi-list'])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Sidebar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-sm-3 col-lg-3 col-xl-3", {
      'mobile-open': _ctx.mobileNavOpen
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
  }), 128 /* KEYED_FRAGMENT */))])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journey me-2 text-primary"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Learning Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Sections "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "content-card section-card animated-slide-up",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        animationDelay: `${index * 0.1}s`
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content fs-6 lh-lg text-dark",
      innerHTML: section.content
    }, null, 8 /* PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Deep Dive Section "), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb me-2 fs-5 text-warning"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "deep-dive-content fs-6 lh-lg text-dark",
      innerHTML: section.deepDive.content
    }, null, 8 /* PROPS */, _hoisted_33)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"content-card quiz-card animated-slide-up\" style=\"animation-delay: 0.3s\">\n                <div class=\"card-header d-flex align-items-center\">\n                  <i class=\"bi bi-patch-question me-3 text-primary fs-4\"></i>\n                  <h3 class=\"h4 fw-bold text-dark mb-0\">Knowledge Check</h3>\n                </div>\n                <div class=\"card-body\">\n                  <div class=\"quiz-intro mb-4\">\n                    <p class=\"text-muted fs-6 mb-0\">\n                      <i class=\"bi bi-info-circle me-2\"></i>\n                      Test your understanding with this quick quiz\n                    </p>\n                  </div>\n                  \n                  <div class=\"quiz-content\">\n                    <div v-if=\"!quizCompleted\" class=\"quiz-questions\">\n                      <div class=\"question mb-4\" v-for=\"(question, qIndex) in currentQuiz?.questions\" :key=\"qIndex\">\n                        <h5 class=\"fw-bold text-dark mb-3\">{{ question.question }}</h5>\n                        <div class=\"options\">\n                          <div v-for=\"(option, oIndex) in question.options\" :key=\"oIndex\" \n                               class=\"option-card\" \n                               :class=\"{ \n                                 'selected': selectedAnswers[qIndex] === oIndex,\n                                 'correct': quizSubmitted && option.correct,\n                                 'incorrect': quizSubmitted && selectedAnswers[qIndex] === oIndex && !option.correct\n                               }\"\n                               @click=\"selectAnswer(qIndex, oIndex)\">\n                            <div class=\"option-content\">\n                              <span class=\"option-letter\">{{ String.fromCharCode(65 + oIndex) }}</span>\n                              <span class=\"option-text\">{{ option.text }}</span>\n                              <i v-if=\"quizSubmitted && option.correct\" class=\"bi bi-check-lg text-success ms-2\"></i>\n                              <i v-if=\"quizSubmitted && selectedAnswers[qIndex] === oIndex && !option.correct\" \n                                 class=\"bi bi-x-lg text-danger ms-2\"></i>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      \n                      <div class=\"quiz-actions mt-4\">\n                        <button class=\"btn btn-primary\" @click=\"submitQuiz\" :disabled=\"!allQuestionsAnswered\">\n                          <i class=\"bi bi-send me-2\"></i>\n                          Submit Answers\n                        </button>\n                      </div>\n                    </div>\n                    \n                    -- Quiz Results --\n                    <div v-else class=\"quiz-results text-center py-4\">\n                      <div class=\"result-icon mb-3\">\n                        <i class=\"bi bi-trophy\" :class=\"quizScore >= 70 ? 'text-warning' : 'text-secondary'\"></i>\n                      </div>\n                      <h4 class=\"fw-bold text-dark mb-2\">Quiz Complete!</h4>\n                      <p class=\"text-muted mb-3\">You scored {{ quizScore }}%</p>\n                      <div class=\"result-message mb-4\">\n                        <p class=\"fs-6\" :class=\"quizScore >= 70 ? 'text-success' : 'text-warning'\">\n                          <i class=\"bi me-2\" :class=\"quizScore >= 70 ? 'bi-emoji-smile' : 'bi-emoji-neutral'\"></i>\n                          {{ quizScore >= 70 ? 'Great job! You have a solid understanding.' : 'Review the material and try again.' }}\n                        </p>\n                      </div>\n                      <button class=\"btn btn-outline-primary\" @click=\"resetQuiz\">\n                        <i class=\"bi bi-arrow-repeat me-2\"></i>\n                        Try Again\n                      </button>\n                    </div>\n                  </div>\n                </div>\n              </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle me-3 text-primary fs-4"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold text-dark mb-0"
  }, "Next Steps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.nextSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: step,
      class: "step-item d-flex align-items-start mb-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step), 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle text-muted ms-2"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-lg btn-outline-primary order-2 order-md-1",
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[1] || (_cache[1] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-primary order-3",
    disabled: _ctx.selectedPill >= _ctx.roadmapData.length,
    onClick: _cache[2] || (_cache[2] = $event => _ctx.selectPill(_ctx.selectedPill + 1))
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Next Chapter ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right ms-2"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_43)])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Celebration Toast "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showCelebration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toast-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trophy-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "toast-title"
  }, "Milestone Reached!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showCelebration), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "toast-close",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.showCelebration = null)
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))])]), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"<h1 style=\'font-size:28px; color:#1a365d; margin-bottom:20px;\'>Chapter 1 • The Foundation: Tawheed</h1>","summary":"<p style=\'font-size:18px; line-height:1.9; color:#2d3748; margin-bottom:30px;\'>Tawheed is the beginning, the middle and the end of Islam. It is the reason the universe exists, the reason you breathe, the reason every prophet was sent, and the only sentence that will save you when the sky splits open.</p>","quote":{"primary":"<p style=\'font-size:24px; font-style:italic; color:#553c9a; line-height:1.8; margin:30px 0;\'>“And I did not create jinn and mankind except that they worship Me alone.”<br><span style=\'font-size:16px; color:#718096;\'>(Qur’an 51:56)</span></p>","secondary":"<p style=\'font-size:18px; color:#4a5568;\'>“Everything in the heavens and earth glorifies Allah…” (57:1)</p>"},"visiWords":["Eternity","Freedom","Purpose","Sincerity","Love","Victory","Light","Covenant","Remembrance","Shield","Unity"],"sections":[{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>1. The Primordial Covenant – You Already Said “Yes”</h2>","content":"<p style=\'font-size:17px; line-height:2; margin-bottom:20px;\'>“Am I not your Lord?” They said: “Yes, we testify!” (7:172)</p><p style=\'font-size:17px; line-height:2;\'>Every soul testified to Allah’s Oneness before birth. Life is simply remembering what you already know.</p>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>2. The Three Categories of Tawheed (Universally Accepted Division)</h2>","content":"<div style=\'font-size:17px; line-height:2.2; background:#f7fafc; padding:20px; border-radius:12px; margin:25px 0;\'><ul style=\'list-style:none; padding-left:0;\'><li>✔ <strong>Tawheed ar-Ruboobiyyah</strong> → Allah alone is Creator, Sustainer, Owner</li><li>✔ <strong>Tawheed al-Uloohiyyah (Ibadah)</strong> → All worship belongs only to Allah</li><li>✔ <strong>Tawheed al-Asmaa’ was-Sifaat</strong> → Affirm Names & Attributes exactly as revealed</li></ul></div>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>3. The Greatest Verse: Ayat al-Kursi (2:255)</h2>","content":"<p style=\'font-size:18px; line-height:2; background:#edf2f7; padding:20px; border-left:6px solid #553c9a; margin:25px 0;\'>Recite it 3 times after every salah and before sleep → protected from Shaytan until next salah (Sahih al-Bukhari).</p>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>4. Every Prophet’s Core Message</h2>","content":"<table style=\'width:100%; font-size:17px; line-height:2; border-collapse:collapse; margin:25px 0;\'><tr style=\'background:#edf2f7;\'><th style=\'padding:12px; text-align:left;\'>Prophet</th><th style=\'padding:12px; text-align:left;\'>Core Call</th></tr><tr><td>Nūḥ (950 years)</td><td>“Worship Allah alone”</td></tr><tr style=\'background:#edf2f7;\'><td>Ibrāhīm</td><td>Smashed idols, built Kaʿbah</td></tr><tr><td>Mūsā</td><td>“Let my people go – to worship”</td></tr><tr style=\'background:#edf2f7;\'><td>ʿĪsā</td><td>“Worship Allah, my Lord and your Lord”</td></tr><tr><td>Muḥammad ﷺ</td><td>“Say Lā ilāha illallāh and succeed”</td></tr></table>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>5. Hidden Shirk Checklist (2025 Edition)</h2>","content":"<ul style=\'font-size:17px; line-height:2.1; list-style:decimal; padding-left:30px; margin:25px 0;\'><li>Riyāʾ (showing off in worship)</li><li>Swearing by creation (“I swear by my mother…”)</li><li>Saying “If it weren’t for X…” instead of “By Allah’s will”</li><li>Fearing evil eye or jinn more than Allah</li><li>Relying on job, visa, or medicine more than tawakkul</li></ul>"}],"paragraphs":["<p style=\'font-size:17px; line-height:2.1; margin:25px 0;\'>The strongest person is not the one who lifts 500 kg — it is the one who can say “No” to his desires only for Allah.</p>","<p style=\'font-size:17px; line-height:2.1; margin:25px 0;\'>Tawheed turned barefoot slaves into leaders of empires in 23 years.</p>","<p style=\'font-size:17px; line-height:2.1; margin:25px 0;\'>If you leave something for Allah, He replaces it with something far better — in this life before the next.</p>"],"insights":["<p style=\'font-size:17px; line-height:2; background:#feebc8; padding:15px; border-radius:8px; margin:15px 0;\'>Perfect Tawheed = creation becomes your servant instead of your master</p>","<p style=\'font-size:17px; line-height:2; background:#feebc8; padding:15px; border-radius:8px; margin:15px 0;\'>Shayṭān’s greatest fear = a teenager who truly understands Lā ilāha illallāh</p>","<p style=\'font-size:17px; line-height:2; background:#feebc8; padding:15px; border-radius:8px; margin:15px 0;\'>People of pure Tawheed enter Jannah 500 years earlier (Musnad Ahmad)</p>"],"todayMission":"<div style=\'background:#edf2f7; padding:20px; border-radius:12px; padding:25px; margin:30px 0;\'><p style=\'font-size:19px; color:#1a365d; font-weight:bold;\'>Today’s Mission</p><p style=\'font-size:18px; line-height:1.9;\'>Hand-write the full Shahada 313 times (≈45–60 min).<br>Feel the angels recording every letter.<br>Burn or bury the paper afterwards – pure sincerity, no showing off.</p></div>","quotes":[{"type":"Qurʾān","text":"<p style=\'font-size:21px; color:#553c9a; line-height:2;\'>“Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence…”<br><span style=\'font-size:16px;\'>(Ayat al-Kursi)</span></p>"},{"type":"Ḥadīth","text":"<p style=\'font-size:18px;\'>“Whoever’s last words are Lā ilāha illallāh will enter Paradise.” (Abū Dāwūd)</p>"}],"tips":["Enter or leave home → say full Shahada out loud","Replace “I’m stressed” with “Lā ilāha illallāh” for 40 days","Teach one child using the index-finger method","Thursday night → Surah Yā-Sīn → gift reward to your Tawheed"],"resources":[{"label":"Kitāb at-Tawḥīd – Sh. al-Fawzān (70-hour audio)","type":"Audio"},{"label":"The Three Fundamental Principles – 40-lesson video course","type":"Video"},{"label":"99 Names of Allah – Daily App","type":"App"}],"nextSteps":["Finish Kitāb at-Tawḥīd twice in your lifetime","Memorise Ayat al-Kursi + 3 Quls + last 10 of Al-Ḥashr","Start weekly family Tawheed circle","Die upon Lā ilāha illallāh (practice in every sujūd)"]},{"chapterId":2,"title":"<h1 style=\'font-size:28px; color:#1a365d; margin-bottom:20px;\'>Chapter 2 • The Six Pillars of Iman</h1>","summary":"<p style=\'font-size:18px; line-height:1.9; color:#2d3748; margin-bottom:30px;\'>These six beliefs are the oxygen of the heart. Strengthen them and the unseen becomes more real than the seen.</p>","sections":[{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>1. Belief in Allah → Complete Tawheed</h2>","content":"<p style=\'font-size:17px; line-height:2;\'>All three categories from Chapter 1 + balanced love, fear, hope, reliance.</p>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>2. Belief in the Angels → Your Constant Companions</h2>","content":"<ul style=\'font-size:17px; line-height:2.2; columns:2; margin:25px 0;\'><li>Kirāman Kātibīn (scribes)</li><li>Ḥafaẓah (protectors)</li><li>Angels who say Āmīn in prayer</li><li>Attendees of dhikr circles</li><li>Throne-bearers (8 on Judgment Day)</li></ul>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>3. Belief in the Books → Final is the Qur’an</h2>","content":"<p style=\'font-size:17px; line-height:2;\'>Original Torah, Zabūr, Injīl + the Qur’an → the only book Allah guarantees to protect forever.</p>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>4. Belief in the Messengers → 25 Named in Qur’an</h2>","content":"<div style=\'columns:3; font-size:16px; line-height:2; margin:25px 0;\'><strong>Adam • Idrīs • Nūḥ<br>Hūd • Ṣāliḥ • Ibrāhīm<br>Lūṭ • Ismāʿīl • Isḥāq<br>Yaʿqūb • Yūsuf • Ayyūb<br>Shuʿayb • Mūsā • Hārūn<br>Dhul-Kifl • Dāwūd • Sulaymān<br>Ilyās • Al-Yasaʿ • Yūnus<br>Zakariyyā • Yaḥyā • ʿĪsā • Muḥammad ﷺ</strong></div>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>5. Belief in the Last Day → Full Timeline</h2>","content":"<ol style=\'font-size:17px; line-height:2.3; margin:25px 0;\'><li>Death & Barzakh</li><li>Minor & Major Signs</li><li>Trumpet of Isrāfīl</li><li>Resurrection</li><li>Gathering & 50,000-year Day</li><li>Book (right or left hand)</li><li>Scales</li><li>Sīrāṭ (bridge over Hell)</li><li>Ḥawḍ of the Prophet ﷺ</li><li>Intercession & Eternal Home</li></ol>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>6. Belief in Qadar → Four Levels</h2>","content":"<ul style=\'font-size:17px; line-height:2.2; margin:25px 0;\'><li>Allah’s eternal knowledge</li><li>Writing in Lawḥ Maḥfūẓ</li><li>Allah’s universal will</li><li>Allah’s creation of every action</ul><p style=\'font-size:17px; margin-top:15px;\'>You choose freely → Allah creates your choice → You are rewarded/punished → Perfect justice.</p>"}],"todayMission":"<div style=\'background:#fef5e7; padding:25px; border-radius:12px; margin:30px 0;\'><p style=\'font-size:19px; color:#744210; font-weight:bold;\'>Tonight’s Mission</p><p style=\'font-size:18px; line-height:1.9;\'>Sit in complete darkness. Imagine every stage of the Hereafter happening now. Let yourself cry, then pray 2 rakʿahs of tawbah and declare the six pillars out loud.</p></div>"},{"chapterId":3,"title":"<h1 style=\'font-size:28px; color:#1a365d; margin-bottom:20px;\'>Chapter 3 • The Five Pillars of Islam</h1>","summary":"<p style=\'font-size:18px; line-height:1.9; color:#2d3748; margin-bottom:30px;\'>These five actions are the absolute minimum Allah asks in exchange for Paradise. They are gifts disguised as duties.</p>","sections":[{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>1. Shahada → The Ever-Renewing Key</h2>","content":"<p style=\'font-size:17px; line-height:2;\'>Say it once to enter Islam → renew it with every prayer, every adhan, every breath.</p>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>2. Salah → 50 → 5 Gift of Miʿrāj</h2>","content":"<ul style=\'font-size:17px; line-height:2.2; margin:25px 0;\'><li>17 farḍ rakʿahs daily</li><li>+12 rawātib sunnah = house in Jannah (Bukhari)</li><li>First deed asked about on Judgment Day</li><li>Prayer with khushūʿ erases sins like autumn leaves</li></ul>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>3. Zakat → 2.5% That Actually Increases Wealth</h2>","content":"<p style=\'font-size:17px; line-height:2; margin:25px 0;\'>Nisāb 2025 ≈ $6,000 (gold) or $1,100 (silver). Pay yearly on savings, gold, business stock. Even half a date in charity can save from Hellfire.</p>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>4. Sawm Ramadan → Annual Soul Reboot</h2>","content":"<ul style=\'font-size:17px; line-height:2.2; margin:25px 0;\'><li>Devils chained</li><li>Gates of Jannah opened</li><li>Laylat al-Qadr > 83 years of worship</li><li>Allah says: “The fast is for Me and I reward it” (Ḥadīth Qudsī)</li></ul>"},{"title":"<h2 style=\'font-size:22px; color:#2b6cb0; margin-top:35px;\'>5. Hajj → Once-in-a-Lifetime Rebirth</h2>","content":"<p style=\'font-size:17px; line-height:2; margin:25px 0;\'>Return sinless like the day your mother bore you (Bukhari). Best day for dua = Day of ʿArafah.</p>"}],"todayMission":"<div style=\'background:#f0fff4; padding:25px; border-radius:12px; margin:30px 0;\'><p style=\'font-size:19px; color:#22543d; font-weight:bold;\'>Tomorrow’s Mission</p><p style=\'font-size:18px; line-height:1.9;\'>Pray just ONE ṣalāh exactly like the Prophet ﷺ – slow, perfect, full khushūʿ. Then beg Allah to make every prayer like that until you die.</p></div>","nextSteps":["Pray all 17 farḍ + 12 rawātib daily for one full year","Start Hajj/Umrah savings today (even $1)","Calculate and pay every missed zakat since puberty","Become the regular imam of your household"]}]');

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