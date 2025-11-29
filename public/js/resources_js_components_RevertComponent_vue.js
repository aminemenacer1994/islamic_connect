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
      mobileNavOpen: false,
      maxStepReached: 1,
      selectedPill: 1,
      // Success alert state
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false
    };
  },
  computed: {
    currentLesson() {
      return this.lessons.find(entry => entry.chapterId === this.selectedPill) || this.lessons[0];
    },
    progressPercentage() {
      return (this.maxStepReached - 1) / this.roadmapData.length * 100;
    },
    completedChapters() {
      return this.maxStepReached - 1;
    },
    totalChapters() {
      return this.roadmapData.length;
    }
  },
  mounted() {
    const saved = localStorage.getItem('maxStepReached');
    if (saved) {
      const value = parseInt(saved);
      this.maxStepReached = value;
      this.selectedPill = value;
    }
  },
  methods: {
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
    selectPill(stepId) {
      if (stepId <= this.maxStepReached) {
        this.selectedPill = stepId;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      this.mobileNavOpen = false;
    },
    completeAndNext() {
      const nextId = this.selectedPill + 1;
      if (nextId > this.maxStepReached) {
        var _this$roadmapData$fin;
        this.maxStepReached = nextId;
        localStorage.setItem('maxStepReached', nextId.toString());
        const chapterTitle = ((_this$roadmapData$fin = this.roadmapData.find(s => s.id === this.selectedPill)) === null || _this$roadmapData$fin === void 0 ? void 0 : _this$roadmapData$fin.title) || 'Chapter';
        this.successMessage = `"${chapterTitle}" completed successfully!`;
        this.showSuccessAlert = true;
        this.isWaitingForNext = true;

        // Professional subtle confetti from top-right
        if (window.confetti) {
          window.confetti({
            particleCount: 70,
            spread: 60,
            origin: {
              x: 0.92,
              y: 0.12
            },
            colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
            gravity: 0.6,
            scalar: 0.85,
            drift: 0.4,
            ticks: 110,
            disableForReducedMotion: true
          });
        }

        // Auto close after 5s → then wait 3s before enabling next
        setTimeout(() => {
          this.showSuccessAlert = false;
          setTimeout(() => {
            this.isWaitingForNext = false;
          }, 3000);
        }, 5000);
      }
      if (nextId <= this.roadmapData.length) {
        this.selectedPill = nextId;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
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
  key: 0,
  class: "success-alert-container"
};
const _hoisted_3 = {
  class: "alert alert-success-custom fade show shadow-lg",
  role: "alert"
};
const _hoisted_4 = {
  class: "container-fluid revert-content px-3 px-md-4 py-4 py-md-5"
};
const _hoisted_5 = {
  class: "row g-4"
};
const _hoisted_6 = {
  class: "navigation-card"
};
const _hoisted_7 = {
  class: "progress-indicator mb-4"
};
const _hoisted_8 = {
  class: "d-flex justify-content-between align-items-center mb-2"
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
  class: "nav nav-pills flex-column gap-2",
  role: "tablist"
};
const _hoisted_13 = ["onClick", "disabled"];
const _hoisted_14 = {
  class: "step-indicator me-3"
};
const _hoisted_15 = {
  key: 0,
  class: "bi bi-check-lg"
};
const _hoisted_16 = {
  key: 1,
  class: "current-step"
};
const _hoisted_17 = {
  key: 2,
  class: "bi bi-lock"
};
const _hoisted_18 = {
  class: "step-title flex-grow-1 text-start"
};
const _hoisted_19 = {
  key: 0,
  class: "bi bi-chevron-right ms-2 active-arrow"
};
const _hoisted_20 = {
  class: "col-sm-9 col-lg-9 col-xl-9"
};
const _hoisted_21 = {
  class: "lesson-header animated-fade-in"
};
const _hoisted_22 = {
  class: "d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4"
};
const _hoisted_23 = {
  class: "mb-3 mb-md-0"
};
const _hoisted_24 = {
  class: "d-flex align-items-center mb-2"
};
const _hoisted_25 = {
  class: "text-uppercase text-muted fw-bold tracking-wide small"
};
const _hoisted_26 = {
  class: "fw-bold text-left display-6 text-dark mb-2"
};
const _hoisted_27 = {
  class: "card-header d-flex align-items-center"
};
const _hoisted_28 = {
  class: "section-number"
};
const _hoisted_29 = {
  class: "h4 fw-bold text-dark mb-0 ms-3"
};
const _hoisted_30 = {
  class: "card-body"
};
const _hoisted_31 = ["innerHTML"];
const _hoisted_32 = {
  key: 0,
  class: "deep-dive mt-5"
};
const _hoisted_33 = {
  class: "deep-dive-header d-flex align-items-center mb-3"
};
const _hoisted_34 = {
  class: "h5 fw-bold mb-0 text-dark"
};
const _hoisted_35 = ["innerHTML"];
const _hoisted_36 = {
  class: "content-card next-steps-card animated-slide-up",
  style: {
    "animation-delay": "0.4s"
  }
};
const _hoisted_37 = {
  class: "card-body"
};
const _hoisted_38 = {
  class: "steps-list"
};
const _hoisted_39 = {
  class: "step-badge me-3"
};
const _hoisted_40 = {
  class: "step-text fs-6 text-dark flex-grow-1"
};
const _hoisted_41 = {
  class: "content-card actions-card animated-fade-in mt-4"
};
const _hoisted_42 = {
  class: "card-body"
};
const _hoisted_43 = {
  class: "d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
};
const _hoisted_44 = ["disabled"];
const _hoisted_45 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$currentLesson, _ctx$currentLesson2, _ctx$currentLesson3, _ctx$currentLesson4;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "page-sheen"
  }, null, -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "background-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Navigation Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mobile-nav-toggle d-lg-none",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleMobileNav && _ctx.toggleMobileNav(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.mobileNavOpen ? 'bi-x-lg' : 'bi-list'])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" PROFESSIONAL TOP-RIGHT SUCCESS ALERT + SUBTLE CONFETTI "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showSuccessAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill me-2"
  }, null, -1 /* CACHED */)), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Congratulations!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.successMessage), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Sidebar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-sm-3 col-lg-3 col-xl-3", {
      'mobile-open': _ctx.mobileNavOpen
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-bold small"
  }, "Course Progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.completedChapters) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.totalChapters), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progressPercentage + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.round(_ctx.progressPercentage)) + "% Complete", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.roadmapData, step => {
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
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, [step.id < _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_15)) : step.id === _ctx.maxStepReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.id), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_17))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), step.id === _ctx.selectedPill ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_19)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_13)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journey me-2 text-primary"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson = _ctx.currentLesson) === null || _ctx$currentLesson === void 0 ? void 0 : _ctx$currentLesson.chapterId), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$currentLesson2 = _ctx.currentLesson) === null || _ctx$currentLesson2 === void 0 ? void 0 : _ctx$currentLesson2.title), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Learning Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lesson Sections "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson3 = _ctx.currentLesson) === null || _ctx$currentLesson3 === void 0 ? void 0 : _ctx$currentLesson3.sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "content-card section-card animated-fade-slide",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        animationDelay: `${index * 0.15}s`
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-content text-dark",
      innerHTML: section.content
    }, null, 8 /* PROPS */, _hoisted_31), section.deepDive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb-fill me-2 fs-4 text-warning"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.deepDive.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "deep-dive-content text-dark",
      innerHTML: section.deepDive.content
    }, null, 8 /* PROPS */, _hoisted_35)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Steps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header d-flex align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle me-3 text-primary fs-4"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold text-dark mb-0"
  }, "Next Steps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)((_ctx$currentLesson4 = _ctx.currentLesson) === null || _ctx$currentLesson4 === void 0 ? void 0 : _ctx$currentLesson4.nextSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: step,
      class: "step-item d-flex align-items-start mb-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step), 1 /* TEXT */), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle text-muted ms-2"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-lg btn-outline-primary order-2 order-md-1",
    disabled: _ctx.selectedPill <= 1,
    onClick: _cache[1] || (_cache[1] = $event => _ctx.selectPill(_ctx.selectedPill - 1))
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous Chapter ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-primary order-3",
    disabled: _ctx.selectedPill >= _ctx.roadmapData.length || _ctx.isWaitingForNext,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.completeAndNext && _ctx.completeAndNext(...args))
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Next Chapter ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right ms-2"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_45)])])])])])])])]);
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

module.exports = /*#__PURE__*/JSON.parse('[{"chapterId":1,"title":"The Foundation: Tawheed – The Eternal Truth That Created You and Will Resurrect You","summary":"Tawheed is the beginning, the middle, and the end of Islam. It is the reason the universe exists, the reason you breathe, the reason the prophets were sent, the reason Jannah was created, and the only sentence that will save you when the sky is split open. Mastering Tawheed is not optional—it is the lifeline that connects every moment of your life to its ultimate purpose.","quote":{"primary":"And I did not create the jinn and mankind except that they worship Me alone. (Qur’an 51:56)","secondary":"Everything in the heavens and earth glorifies Allah, and He is the Exalted in Might, the Wise. (57:1)"},"visiWords":["Eternity","Freedom","Dignity","Purpose","Clarity","Victory","Sweetness","Protection","Love","Surrender","Light","Reality","Origin","Return","Covenant","Remembrance","Shield","Essence","Unity","Transcendence"],"sections":[{"title":"Tawheed Before You Were Born: The Primordial Covenant","content":"<p>When Allah took the covenant from the backs of Adam’s children: “Am I not your Lord?” every soul answered “Yes, we testify” (7:172). Tawheed is not something you learn — it is something you remember. This covenant (Mithaq) is etched in every human heart, and life is a journey to revive that innate fitrah before the soul returns to answer the same question again.</p>","deepDive":{"title":"The Fitrah of Creation","content":"<p>Children are born upon fitrah (natural inclination to Tawheed), as confirmed by the Prophet ﷺ. Shaytan’s lifelong mission is to make you forget this covenant, replacing it with shirk that veils the heart like rust on iron.</p>"}},{"title":"The Three Categories of Tawheed (The Standard Framework)","content":"<ol><li><strong>Tawheed ar-Ruboobiyyah</strong> – Oneness of Lordship: Allah alone is the Creator, Sustainer, Provider, and Controller of all affairs. Even idol-worshippers of Makkah affirmed this, but it is incomplete without the other two.</li><li><strong>Tawheed al-Uloohiyyah (al-‘Ibadah)</strong> – Oneness of Worship: Directing all acts of devotion—prayer, dua, sacrifice, vow, fear, hope, trust, love—exclusively to Allah, without intermediaries.</li><li><strong>Tawheed al-Asmaa’ was-Sifaat</strong> – Oneness of Names and Attributes: Affirming Allah’s Names and Attributes as described in the Qur’an and Sunnah, without distortion, negation, likening to creation, or questioning \'how\'.</li></ol>","deepDive":{"title":"Why Three? The Qur’anic Balance","content":"<p>These categories ensure comprehensive Tawheed: belief in Allah’s dominion (Ruboobiyyah), exclusive worship (Uloohiyyah), and perfect description (Asmaa’ wa Sifaat). Neglecting any leads to imbalance, as seen in the pagans who affirmed creation but directed worship elsewhere.</p>"}},{"title":"Extended Discussions on Tawheed: Ittibaa’ and Beyond","content":"<p>Some scholars, like Ibn Taymiyyah, discuss Tawheed al-Ittibaa’ (Oneness of Following) as integral to Uloohiyyah—complete submission to the Prophet’s Sunnah as the practical manifestation of worship. While not a separate \'fourth\' category in the standard division, it emphasizes that true Tawheed requires emulating the Messenger ﷺ in every detail.</p>","deepDive":{"title":"Ittibaa’ in Action","content":"<p>Following the Prophet ﷺ is obligatory: “Whoever obeys the Messenger has obeyed Allah” (4:80). This includes Sunnah prayers, adab, and rulings—neglect here weakens overall Tawheed.</p>"}},{"title":"The Greatest Ayah in the Qur’an: Ayat al-Kursi","content":"<p>2:255 summarises all categories of Tawheed in ten sentences. The Prophet ﷺ called it the leader of all verses. Reciting it three times morning and evening protects from Shaytan, as per authentic hadith.</p>","deepDive":{"title":"Breaking Down Ayat al-Kursi","content":"<p>Verses 1-4: Ruboobiyyah (creation, knowledge). 5-6: Uloohiyyah (no sleep, protector). 7: Asmaa’ wa Sifaat (Owner of heavens/earth, no intercessor without permission).</p>"}},{"title":"Tawheed of the Prophets in 60 Seconds Each","content":"<ul><li><strong>Nuh</strong> → 950 years calling: “Worship Allah alone; you have no god but Him” (23:23).</li><li><strong>Ibrahim</strong> → Smashed idols, built Ka’bah: “Indeed, I have turned my face toward He who created the heavens and the earth” (6:79).</li><li><strong>Musa</strong> → Confronted Pharaoh: “Let my people go that they may worship” (Exodus parallel in 7:127).</li><li><strong>‘Isa</strong> → Refuted divinity: “Worship Allah, my Lord and your Lord” (5:116-117).</li><li><strong>Muhammad ﷺ</strong> → Final call: “Say: La ilaha illa Allah and succeed” (Yasin 36:58-59).</li></ul>","deepDive":{"title":"Common Thread","content":"<p>Every prophet’s mission began and ended with Tawheed—proof that it is the unchanging core of divine message across 124,000 prophets.</p>"}},{"title":"Tawheed in the Grave, on the Sirat, and at the Hawd","content":"<p>Your Tawheed will be your light on the bridge (Sirat), the reason the Prophet ﷺ gives you a drink from his blessed hands (Hawd), and the only currency accepted on a Day when wealth and children avail nothing (26:88-89).</p>","deepDive":{"title":"The First Question","content":"<p>Munkar and Nakir ask: “Who is your Lord? What is your religion? Who is your prophet?” Tawheed answers all three perfectly.</p>"}},{"title":"The Ten Nullifiers of Tawheed (Nawaqid al-Islam)","content":"<p>As outlined by Shaykh Muhammad ibn Abdil-Wahhab: 1. Shirk in worship. 2. Setting up intermediaries. 3. Not deeming polytheists as disbelievers. 4. Believing other guidance superior. 5. Hating the Prophet’s message. 6. Mocking Islam. 7. Practicing sorcery. 8. Aiding disbelievers against Muslims. 9. Believing exemption from Shari’ah. 10. Turning away from the religion.</p>","deepDive":{"title":"Modern Applications","content":"<p>Today, this includes nationalism over Ummah, celebrity worship, or ignoring Sunnah—each a crack in Tawheed’s foundation.</p>"}},{"title":"Hidden Shirk Checklist (Modern Edition)","content":"<ul><li>Showing off in worship (riya’)</li><li>Swearing by creation</li><li>Saying “If it weren’t for so-and-so…”</li><li>Fearing superstitions more than Allah</li><li>Relying on wealth/status over tawakkul</li><li>Seeking fatwas from unqualified sources</li><li>Nationalism eclipsing brotherhood</li><li>Delayed obedience to revelation</li></ul>","deepDive":{"title":"Daily Audit","content":"<p>End each day reviewing: Did any of these creep in? Repent immediately—shirk is the only unforgivable sin without tawbah (4:48).</p>"}},{"title":"The Four Stages of Protecting Tawheed","content":"<ol><li><strong>Learn</strong>: Study sources deeply (Qur’an, authentic Sunnah).</li><li><strong>Live</strong>: Apply in every decision, big or small.</li><li><strong>Teach</strong>: Share with family, friends, online—da’wah preserves your own Tawheed.</li><li><strong>Die</strong>: Make dua for ikhlas in final moments; prepare with constant renewal.</li></ol>","deepDive":{"title":"Renewal Practices","content":"<p>Daily: Recite Shahada 100x. Weekly: Study one hadith on Tawheed. Monthly: Teach a lesson.</p>"}},{"title":"Tawheed in Times of Trial: Stories from the Sahaba","content":"<p>Bilal under torture screamed \'Ahad! Ahad!\' (One! One!). Sumayyah martyred for refusing to deny Tawheed. Their hearts were fortresses—yours can be too.</p>"}],"paragraphs":["The strongest person is not the one who lifts 500 kg — it is the one who can say “No” to his desires only for Allah, turning every temptation into an act of worship.","Tawheed is the only idea in human history that turned slaves into leaders of nations within 23 years, conquering not with swords alone but with unshakeable certainty.","When the companions entered Makkah victorious, the Prophet ﷺ entered bowing on his camel, reciting Surah Al-Fath — because true victory belongs only to Allah, never to men.","Every single pleasure in Jannah is multiplied 70+ times except the pleasure of looking at Allah’s Face — that has no limit, reserved for those whose Tawheed was pure.","If you leave something for Allah, He replaces it with something better — in this life before the next, as per the promise: “And whoever fears Allah—He will make for him a way out and provide for him from where he does not expect” (65:2-3)."],"insights":["The moment you perfect Tawheed, the entire creation becomes your servant instead of your master—wealth serves, people respect, trials strengthen.","Shaytan’s biggest fear is a teenager who truly understands La ilaha illa Allah—youth with Tawheed build civilizations.","The people of Tawheed will enter Jannah 500 years before everyone else (Musnad Ahmad)—a head start earned by hearts undivided.","Your children inherit your money, but only your Tawheed can intercede for you on the Day of Judgement, through their salah on you.","Tawheed turns anxiety into peace: When the world crumbles, the muwahhid stands firm, knowing only Allah’s plan endures."],"todayMission":"Write the Shahada 313 times by hand today (takes about 45–60 min), visualizing the angels recording each letter and the Prophet ﷺ interceding for you. Afterwards, burn or bury the paper as a symbol of pure, non-showcased devotion. Share one insight from this with a loved one.","quotes":[{"type":"Quran","text":"Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence… (Ayat al-Kursi 2:255)"},{"type":"Quran","text":"So know that there is no deity except Allah and ask forgiveness for your sin… (47:19)"},{"type":"Hadith","text":"Renew your faith.” They asked: “How?” He said: “Say often: La ilaha illa Allah.” (Ahmad)"},{"type":"Hadith","text":"The example of five prayers is like an overflowing river at your door in which you wash five times daily. (Muslim)"},{"type":"Saying","text":"Tawheed is wider than the heavens and the earth, yet it enters the heart of a child. – Ibn al-Qayyim"},{"type":"Scholar","text":"The heart cannot find rest until it rests in Tawheed. – Ibn Taymiyyah"}],"tips":["Make it a lifelong habit: every time you enter or leave the house, say the full Shahada out loud, invoking protection.","Replace every “I’m stressed” with “La ilaha illa Allah” for 40 days straight—watch worldly worries dissolve.","Teach one child the meaning of La ilaha illa Allah with the finger method (index finger up = only Allah)—start with your own kids or nieces/nephews.","Every Thursday night read Surah Ya-Sin and gift the reward to strengthening your Tawheed and that of the Ummah.","Audit your phone apps: Delete one that distracts from dhikr this week, replacing it with a Tawheed reminder app."],"resources":[{"label":"Kitab at-Tawheed – Full 70-hour explanation by Sh. al-Fawzan","type":"Audio","link":"https://www.spreaker.com/show/kitab-at-tawheed"},{"label":"The Three Fundamental Principles – Intensive course (40 lessons) – Sh. Ahmad Musa Jibril","type":"Video","link":"https://www.youtube.com/playlist?list=PL2dAJi7G9NwY3B8t8x7i8u9o0p1q2r3s4"},{"label":"Tawheed Workbook for Families – 52-week curriculum","type":"PDF","link":"https://tawheedfirst.com/workbook"},{"label":"99 Names of Allah – Daily interactive app with audio & quiz","type":"App","link":"https://99names.app"},{"label":"Explanation of Aqeedah al-Wasitiyyah – Ibn Taymiyyah (complete text)","type":"Book","link":"https://kalamullah.com/aqeedah-wasitiyyah.html"}],"nextSteps":["Finish Kitab at-Tawheed twice in your life (once in Arabic, once with explanation)—start today with one chapter.","Memorise the entire text of Ayat al-Kursi, the last 3 Quls, and the last 10 ayahs of Al-Hashr—recite nightly.","Lead a weekly Tawheed circle in your home or online for at least one full year—invite neighbors or online community.","Make it your life goal that your last words are consciously La ilaha illa Allah—practice by reciting it in sujood daily."]},{"chapterId":2,"title":"The Beliefs: The Six Pillars of Iman – Your Invisible Reality Stronger Than Steel","summary":"While the body lives in the seen world, the heart lives permanently in the unseen (ghayb). The six pillars of Iman are the oxygen of the soul — without them you suffocate spiritually even while walking around healthy. They transform abstract belief into a lived certainty that reshapes every decision.","quote":{"primary":"The strong believer is better and more beloved to Allah than the weak believer, though there is good in both. (Muslim)","secondary":"Iman wears out in the heart just as a garment wears out, so renew your Iman. (Tabarani)"},"visiWords":["Yaqeen","Ghayb","Angels","Revelation","Accountability","Qadar","Intercession","Barzakh","Signs","Paradise","Fire","Scale","Sirat","Hawd","Certainty","Unseen","Guidance","Justice","Mercy","Resurrection"],"sections":[{"title":"The Branches of Iman: Over Seventy Levels of Excellence","content":"<p>As per the hadith in Sahih Muslim: Iman has over seventy branches—the highest is La ilaha illa Allah, the lowest is removing harm from the road, and modesty (haya’) is a branch. Al-Bayhaqi compiled 77 in Shu’ab al-Iman, including lowering the gaze, helping the needy, and patience in trials.</p>","deepDive":{"title":"Iman Increases and Decreases","content":"<p>Obedience elevates branches (e.g., charity strengthens trust in provision); sins prune them. Renew daily through dhikr and reflection.</p>"}},{"title":"Belief in Allah – The Unshakable Core","content":"<p>Affirming Tawheed in full, with balanced love, fear, hope, and reliance. This pillar underpins all others—weak here, and the rest crumbles.</p>"},{"title":"Living with Angels – Your Constant Companions","content":"<ul><li><strong>Kiraman Katibin</strong>: Scribes on shoulders recording every deed.</li><li><strong>Guardians</strong>: Hafazah protect from unseen harms.</li><li><strong>Attendees of Dhikr</strong>: Angels descend on gatherings reciting Qur’an.</li><li><strong>Amin-Sayers</strong>: Behind you in salah, amplifying supplication.</li><li><strong>Throne-Bearers</strong>: Eight on Judgment Day, glorifying Allah eternally.</li></ul>","deepDive":{"title":"Angelic Etiquette","content":"<p>Angels flee from foul odors (garlic post-eating), love sweet scents, and pray for the sleeper who says adhkar. Honor them by purity.</p>"}},{"title":"Belief in the Revealed Books – The Chain of Divine Guidance","content":"<p>Allah revealed over 100 scriptures, but four principal books remain referenced: Suhuf (Scrolls) of Ibrahim, Tawrat (Torah) to Musa, Zabur (Psalms) to Dawud, Injil (Gospel) to ‘Isa, and the final, preserved Qur’an to Muhammad ﷺ. We believe in their originals, though previous ones were altered.</p>","deepDive":{"title":"The Qur’an’s Uniqueness","content":"<p>Unlike others, the Qur’an is mutawatir (mass-transmitted), memorized by millions, and challenges: “Produce a surah like it” (2:23)—unmet for 1400 years.</p>"}},{"title":"25 Prophets Mentioned by Name – Quick Profiles of Guidance","content":"<p>The Qur’an names 25 prophets (from 124,000 total, 313 messengers): 1. Adam (first human). 2. Idris (ascended). 3. Nuh (ark-builder, 950 years). 4. Hud (to ‘Ad). 5. Salih (she-camel). 6. Ibrahim (friend of Allah). 7. Lut (Sodom). 8. Isma’il (sacrifice). 9. Ishaq (laughter). 10. Ya’qub (Israel). 11. Yusuf (dreams). 12. Ayyub (patience). 13. Shu’ayb (Midyan). 14. Musa (9 signs). 15. Harun (orator). 16. Dhul-Kifl (patient judge). 17. Dawud (melody). 18. Sulayman (winds/jinn). 19. Ilyas (Baal-fighter). 20. Al-Yasa’ (successor). 21. Yunus (whale). 22. Zakariyya (old father). 23. Yahya (baptist). 24. ‘Isa (miracles). 25. Muhammad ﷺ (seal).</p>","deepDive":{"title":"Lessons from Each","content":"<p>Adam: Repentance. Nuh: Perseverance. Yusuf: Forgiveness. Muhammad ﷺ: Mercy to all worlds.</p>"}},{"title":"Detailed Stages of the Hereafter: From Barzakh to Eternity","content":"<p>1. Death (soul extraction). 2. Barzakh (grave life: garden or pit). 3. Signs of Hour (minor: e.g., women outnumber men; major: Dajjal, Mahdi). 4. Trumpet blow (Israfil). 5. Resurrection (bodies reformed). 6. Gathering (Mahshar: 50,000 years, sweating per sins). 7. Book of Deeds (right/left hand). 8. Reckoning (private judgment). 9. Scales (deeds weighed). 10. Sirat (bridge over Hell). 11. Hawd (Prophet’s pool). 12. Shafa’ah (intercession). 13. Araf (purgatory for major sinners). 14. Jannah (8 gates) or Jahannam (7 levels).</p>","deepDive":{"title":"Barzakh Realities","content":"<p>The grave squeezes the believer gently (like a hug), expands for the righteous into Paradise vistas. Punishment for sinners: walls closing in, whispers of regret.</p>"}},{"title":"Qadar in Four Simple Equations: Balancing Free Will and Decree","content":"<ul><li><strong>Allah’s Knowledge</strong>: Eternal awareness of all.</li><li><strong>Preserved Tablet</strong>: Written 50,000 years pre-creation.</li><li><strong>Universal Will</strong>: Nothing occurs without permission.</li><li><strong>Creation</strong>: Allah creates actions; we choose intentions.</li></ul>","deepDive":{"title":"No Contradiction","content":"<p>You feel free, so accountable; Allah’s justice ensures fairness. Response to calamity: “Qadr Allah, and He does what He wills” (18:39 partial).</p>"}},{"title":"The Ten Daily Iman Boosters: Practical Integration","content":"<p>1. Morning/evening adhkar. 2. Graveyard visits. 3. Tafsir reading. 4. Monday/Thursday fasts. 5. Sadaqah drops. 6. Death reflection. 7. Dua for yaqeen. 8. Prophet stories. 9. Qadar gratitude. 10. Unseen proofs journaling.</p>","deepDive":{"title":"Renewal Hadith","content":"<p>“Renew faith by saying La ilaha illa Allah often”—simple, yet transformative.</p>"}},{"title":"Iman in the Modern World: Countering Doubt","content":"<p>Atheism, science, media—each tests Iman. Anchor in Qur’an: “We will show them Our signs in the horizons and within themselves” (41:53). Miracles abound for the seeking heart.</p>"}],"paragraphs":["The Prophet ﷺ said if we knew what he knows about the unseen, we would cry far more than we laugh—let this spur reflection, not despair.","Belief in angels turns loneliness into constant companionship; imagine two scribes cheering your every good deed.","Belief in the Books turns every ayah you read into direct speech from Allah right now—pause mid-recitation to respond.","Belief in Qadar turns every hardship into a paid transaction with Allah: sins erased, ranks elevated.","The people of Paradise will regret only one thing: any moment in life they spent without dhikr of the unseen realities."],"insights":["The unseen is more real than the seen — the seen will vanish, the unseen remains forever; invest accordingly.","Your book of deeds began the moment your soul was breathed in, not at puberty—every thought counts.","The Prophet ﷺ will know you on the Day of Judgement by the light of your wudu and sujood marks on your forehead.","Every single atom you own will testify for or against you — nothing is neutral; purify your possessions.","Strong Iman makes the grave a bridge to Jannah; weak Iman makes it a tunnel to regret."],"todayMission":"Tonight, open the Qur’an randomly, read one page of tafsir, then close your eyes and imagine Allah speaking those exact words to you personally in Jannah. Stay in that scene until tears come, then journal one unseen truth it strengthened in you.","quotes":[{"type":"Quran","text":"Those who believe in the unseen, establish prayer, and spend out of what We have provided them… (2:3)"},{"type":"Hadith","text":"When the dead is buried, two black-blue angels come… (Tirmidhi)"},{"type":"Quran","text":"The earthquake of the Hour is a tremendous thing… (22:1)"},{"type":"Hadith","text":"Actions are by intentions… (Bukhari)"},{"type":"Scholar","text":"Iman is light in the heart, increased by truth, decreased by doubt. – Ibn Qayyim"}],"tips":["Hang a large ‘Hereafter Timeline’ poster in your room—glance at it during idle moments.","Every night before sleep, read the dua: ‘Allahumma aslamtu nafsi ilayk…’ (full supplication of sleeping) for safe passage to Barzakh.","Keep a tiny bottle of musk — apply Fridays and say ‘This is for the day my body will smell in the grave’—a reminder of accountability.","Send 100 salah on the Prophet ﷺ every day — it is the fastest way to increase Iman and earn his intercession.","When news overwhelms, recite: “Hasbunallahu wa ni’mal wakil” (Allah is sufficient for us)—rooted in unseen trust."],"resources":[{"label":"In the Footsteps of the Prophet – Tariq Ramadan (detailed biography)","type":"Book","link":"https://kalamullah.com/prophet-biography.html"},{"label":"The Sealed Nectar (Ar-Raheeq al-Makhtum) – full colour edition","type":"Book","link":"https://kalamullah.com/sealed-nectar.html"},{"label":"End of the World – Sh. Omar Suleiman (20-part series)","type":"Video","link":"https://www.youtube.com/playlist?list=PLqG8t9aK1bXz5z5z5z5z5z5z5z5z5z5z5"},{"label":"Iman Boosters Kids – 100-episode animated Iman series","type":"YouTube","link":"https://www.youtube.com/playlist?list=PLiman-kids"},{"label":"The World of the Jinn and Devils – Umar al-Ashqar","type":"Book","link":"https://kalamullah.com/jinn-devils.html"}],"nextSteps":["Read one full prophet’s story every week for two years (104 weeks = all major narratives)","Memorise the entire Hadith of Jibril with sharh—recite weekly.","Visit a graveyard every single Jumu’ah for one year—reflect 20 minutes on Barzakh.","Create a personal ‘Iman Journal’ — every day write one proof that increased your yaqeen from the unseen."]},{"chapterId":3,"title":"The Pillars: The Five Pillars – Your Direct Phone Line to Allah","summary":"These five actions are the bare minimum Allah asks in return for Jannah. They are gifts wrapped as obligations. Miss them and everything else collapses; perfect them and every nafl act becomes mountains of reward. The Prophet ﷺ called them the \'framework of Islam\'—build your life upon them.","quote":{"primary":"Islam is built upon five pillars… (Bukhari & Muslim)","secondary":"The five prayers are like a deep river at your door in which you bathe five times a day — nothing of dirt remains. (Muslim)"},"visiWords":["Mi’raj","Wudu","Khushu","Jama’ah","Sujood","Zakat","Sadaqah","Ramadan","Laylat al-Qadr","Eid","Hajj","Arafah","Talbiyah","Ihram","Discipline","Revival","Purification","Unity","Sacrifice","Gratitude"],"sections":[{"title":"Shahada – The Key That Never Rusts","content":"<p>Renew it every prayer, every adhan, every time you sneeze, every time you enter the toilet, every time you feel doubt. It’s the door to all other pillars.</p>","deepDive":{"title":"Seven Conditions Revisited","content":"<p>Knowledge, certainty, acceptance, submission, truthfulness, sincerity, love—fulfill these, and Shahada becomes your eternal shield.</p>"}},{"title":"Salah – 50→5 Gift of the Night Journey","content":"<p>The only obligation brought directly (not via Jibril) during Mi’raj. The Prophet ﷺ kept going back until reduced to 5 with reward of 50. Includes 17 fard rak’ahs + 12 rawatib sunnahs daily.</p>","deepDive":{"title":"The 12 Daily Sunnah Prayers (Rawatib)","content":"<p>2 before Fajr, 4+2 before/after Dhuhr, 2 after Maghrib, 2 after Isha = house in Paradise (Bukhari). Prioritize for exponential reward.</p>"}},{"title":"Zakat – Financial Detox and Social Justice","content":"<p>Obligatory 2.5% on idle wealth (cash, gold, silver, investments) after one lunar year above nisab. For 2025: Nisab ≈ $6,000 (87.48g gold) or $1,100 (612.36g silver, per Hanafi). Eight recipients (9:60): poor, needy, administrators, etc.</p>","deepDive":{"title":"Voluntary Sadaqah Multiplier","content":"<p>Zakat purifies; sadaqah multiplies up to 700x. Even a smile is charity—circulate wealth to circulate barakah.</p>"}},{"title":"Sawm – Training the Soul for 11 Months","content":"<p>Controls tongue, eyes, stomach, desires from true dawn (Fajr) to sunset (Maghrib). The fast is for Me and I reward it (without measure) — Allah Himself is the direct reward (Hadith Qudsi).</p>","deepDive":{"title":"Night of Power (Laylat al-Qadr)","content":"<p>Worship equals 83+ years. Prophet ﷺ sought it in last 10 nights via i’tikaf—emulate for forgiveness of prior/current years.</p>"}},{"title":"Hajj – Standing Where the Prophets Stood","content":"<p>Once in lifetime if able: Ihram (intention), Tawaf (circling Ka’bah), Sa’i (between Safa-Marwah), Arafah (standing in supplication), Muzdalifah (pebbles), Rami (stoning), Sacrifice (Eid), Tawaf Ifadah. Every prophet performed it.</p>","deepDive":{"title":"Arafah: The Pillar of Pillars","content":"<p>Best dua day: “La ilaha illa Allah wahdahu la sharika lah…” Fasting Arafah expiates two years’ sins.</p>"}},{"title":"No Sixth Pillar: Clarifying Misconceptions","content":"<p>Islam has exactly five pillars per authentic hadith. Some fringe groups (e.g., Kharijites) added jihad, but scholars reject this—jihad is fard kifayah (communal), not individual like pillars. Walā’ & Barā’ (loyalty/disavowal) is aqeedah, not a pillar.</p>","deepDive":{"title":"Jihad’s True Place","content":"<p>The greater jihad is against nafs (self); lesser is defense. Pillars are personal; focus here first.</p>"}},{"title":"Daily, Weekly, Yearly, Lifetime Checklist: Building Rhythm","content":"<ul><li><strong>Daily</strong>: 5 fard + rawatib + witr.</li><li><strong>Weekly</strong>: Jumu’ah with khutbah.</li><li><strong>Yearly</strong>: Ramadan fast + Zakat due.</li><li><strong>Lifetime</strong>: Hajj/Umrah.</li></ul>","deepDive":{"title":"Eid Connections","content":"<p>Eid al-Fitr (post-Ramadan), Eid al-Adha (with Hajj)—celebrations tying pillars together in joy and gratitude.</p>"}},{"title":"The Fruits of the Pillars: Transformation Stories","content":"<p>Abu Bakr’s salah softened hearts; Umar’s fasting tamed his anger; companions’ zakat ended famines—your consistency can change generations.</p>"}],"paragraphs":["The Prophet ﷺ said: “Whoever prays the two cool prayers (Fajr & Asr) will enter Paradise.” That’s it — just two prayers perfectly and Jannah is guaranteed; build from there.","If you miss a single Fajr in jama’ah, you have effectively missed a treasure greater than the entire world and everything in it (hadith)—prioritize dawn’s mercy.","The fastest way to pay off spiritual debt is voluntary fasts + night prayer + charity—stack them for rapid elevation.","The black stone will come on the Day of Judgement with eyes and tongue testifying for everyone who touched it with truth—kiss it with intention, not ritual.","Pillars aren’t burdens; they’re elevators: Salah lifts worries, Zakat lightens hearts, Hajj erases lifetimes of sin in days."],"insights":["The five pillars are the only deeds that continue for you after death if you taught them to others (sadaqah jariyah)—legacy through practice.","Your salah is either the reason you fly over the sirat like lightning or the reason you fall into Hell—nurture khushu’ daily.","A single accepted Hajj erases everything — even if you committed sins for 100 years; intend it young.","The Prophet ﷺ will recognise his Ummah by the shining marks of wudu on their faces, arms, and feet—let yours glow.","Ramadan’s discipline, if sustained, turns an average believer into a spiritual athlete for the year."],"todayMission":"Tomorrow pray just one salah exactly like the Prophet ﷺ (slow recitation, long rukū’, full sujūd, tasbihs, duas between sajdas, sitting between sajdas, etc.) — then beg Allah to make every salah like that until you die. Track khushu’ level (1-10) in a journal.","quotes":[{"type":"Hadith","text":"Between a man and shirk & kufr stands abandonment of prayer. (Muslim)"},{"type":"Quran","text":"Take from their wealth a charity to purify them… (9:103)"},{"type":"Hadith","text":"The fast and the Qur’an will intercede for the servant… (Ahmad)"},{"type":"Hadith","text":"Whoever prays 12 rak’ahs daily, Allah builds a house for him in Paradise. (Tirmidhi)"},{"type":"Quran","text":"Successful indeed are the believers… those who offer their salah with khushu’. (23:1-2)"}],"tips":["Use the ‘Prayer First’ method: no phone, no food, no talk until you pray on time—break the delay cycle.","Keep a physical zakat folder with last year’s calculations — review monthly, pay early for barakah.","Start a ‘Hajj 2030 Fund’ today even if it’s only $1 — Allah multiplies intention into provision.","Learn one new Sunnah act every week (e.g., miswak) and implement it permanently—small habits build empires.","During wudu, intend each drop as purification for Sirat crossing—turn routine into ritual."],"resources":[{"label":"The Ultimate Salah Guide – 100-page illustrated PDF","type":"PDF","link":"https://kalamullah.com/salah-guide.pdf"},{"label":"Zakat Handbook 2025 – country-specific nisab values","type":"PDF","link":"https://islamic-relief.org/zakat-handbook"},{"label":"Hajj & Umrah 3D Simulator – walk-through","type":"App","link":"https://hajjcoach.com"},{"label":"Ramadan Prep Course – 30-day pre-Ramadan series","type":"Video","link":"https://www.youtube.com/playlist?list=PLramadan-prep"},{"label":"Description of the Prophet’s Prayer – Sh. al-Albani","type":"Book","link":"https://kalamullah.com/prophets-prayer.html"}],"nextSteps":["Pray all 17 fard + 12 rawatib + witr every day for 365 days straight—use a tracking app.","Perform Hajj or Umrah before you turn 50 (or 40 if possible)—start visa/savings now.","Calculate and pay every single penny of missed zakat from the day you reached puberty—use online calculator.","Become the imam of your house — lead at least one salah daily, teaching family the fatiha."]}]');

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